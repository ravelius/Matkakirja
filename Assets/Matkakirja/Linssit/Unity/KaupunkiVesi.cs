// KAUPUNGIN OMA VESIPINTA (Linssiseppä 2, 8.10.2026; omistaja 20.2x valitsi B: oma vesipinta Googlen laattojen päälle, ei maskia
// Googlen varjostimeen). Karttasepän aineisto: <juuri><kohde>-6m.json/.bytes (lähellä) ja -16m (kaukana, LOD), ENU kohteen origossa
// (ellipsoidikorkeus 0). Paikka CesiumGlobeAnchorilla origoon (paikalliset akselit itä, ylös, pohjoinen), palat 1 km² kameran ympäriltä:
// lähi alle LahiM 6 m:n verkosta, kauka LahiM–KaukoM 16 m:n verkosta, päivitys kameran siirryttyä yli PaivitysM. Varjostin VesiPinta.
// Juuri: VesiJuuri (oletus ämpärin vesi/), kehitysajossa Documents/kaupunki-vesi.txt (ensimmäinen rivi, myös file://). Kohteet
// <juuri>index.json:sta (id, lat, lon, sade_km), origo aineiston jsonista (Karttaseppä 8.10.: LS1:n pallo-37-keskipiste). Krediitti
// (OSM ODbL + ESA WorldCover CC BY 4.0) jsonista Lähteet-näkymään. Kytkin "ilmakeha"-asetuksen rinnalle: "vesi 0|1" (oletus pois).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit.Ilmakeha;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiVesi
    {
        /// <summary>Asetuksen pakotus "vesi 0|1"; null = oletus: päällä OletusKohteissa (omistaja 21.1x: Tukholman elävä vesi).</summary>
        public static bool? Pakotettu;
        public static string[] OletusKohteet = { "tukholma", "pariisi" };   // kehityskaupungit (omistaja 20.4x); Pariisi index-v2:sta
        public static string VesiJuuri = "https://media.matkakirja.app/vesi/";
        public const float LahiM = 3000f, KaukoM = 20000f, PaivitysM = 400f;
        public static float NostoM = 0.4f;
        /// <summary>Asetus "vesinosto" annettu: jsonin nosto_m_suositus ei ohita sitä (LS1:n katselmointi).</summary>
        public static bool NostoAsetettu;
        static bool nostoIndeksista;
        /// <summary>Uusia paloja enintään näin monta kehyksessä (ei nykäystä pallon lennossa; LS1:n katselmointi).</summary>
        public const int PalojaKehyksessa = 4;   // 9.10.: 2 jätti lähipaloja puuttumaan vielä 15 s:n kohdalla (Googlen vesi näkyi terävinä monikulmioina)
        readonly Queue<(bool, int)> jono = new Queue<(bool, int)>();
        /// <summary>Veden juuri (paikalliset akselit itä, ylös, pohjoinen; m), null ennen latausta (LS1:n veneet).</summary>
        public Transform Juuri => juuri != null ? juuri.transform : null;

        readonly Action<string> kirjaa;
        GameObject juuri; Material mat; int kerros;
        VesiVerkko lahi, kauka; string krediitti;
        readonly Dictionary<(bool, int), GameObject> palat = new Dictionary<(bool, int), GameObject>();
        Vector3 edellinen = new Vector3(float.NaN, 0, 0);
        int avaus;

        public KaupunkiVesi(Action<string> kirjaa) { this.kirjaa = kirjaa; }
        public string Krediitti => krediitti;
        /// <summary>Veden tekijärivi ruudulle, kun vesi on ladattu (KrediititTiivis: oma rivi Googlen rivien ulkopuolella; ODbL).</summary>
        public static string KrediittiNyt { get; private set; }
        /// <summary>Vettä piirretään (KaupunkiIlmakeha pitää taivaan arvot ajan tasalla veden heijastukselle, vaikka ilmakehä olisi pois).</summary>
        public static bool Nakyvissa;

        // VANAT (PT 9.10., omistaja TF 168): LS1:n ElavaKaupunki kutsuu joka kehys jokaiselle näkyvälle veneelle; VesiPinta piirtää
        // kameraa lähimmät 16 (Ydin VesiVanat: kiila, keskivana, keula-aalto; vanhentuneet 0,5 s:n jälkeen pois).
        static readonly VesiVanat vanat = new VesiVanat();
        static readonly Vector4[] vanaA = new Vector4[VesiVanat.VanojaMax], vanaB = new Vector4[VesiVanat.VanojaMax];
        static readonly int IdVana = Shader.PropertyToID("_VesiVana"), IdVanaB = Shader.PropertyToID("_VesiVanaB"), IdVanaMaara = Shader.PropertyToID("_VesiVanaMaara");
        /// <summary>Vene i: paikka ja kulkusuunta maailmassa (xz), nopeus m/s, veneen pituus m.</summary>
        public static void Vana(int i, Vector3 paikka, Vector2 suunta, float nopeusMs, float pituusM) =>
            vanat.Aseta(i, paikka.x, paikka.z, suunta.x, suunta.y, nopeusMs, pituusM, Time.time);

        static void LahetaVanat(Camera kamera)
        {
            var p = kamera.transform.position; var l = vanat.Valitse(p.x, p.z, Time.time);
            for (int i = 0; i < l.Count; i++)
            {
                vanaA[i] = new Vector4((float)l[i].X, (float)l[i].Z, (float)l[i].Dx, (float)l[i].Dz);
                vanaB[i] = new Vector4((float)l[i].Nopeus, (float)l[i].Pituus, 0f, 0f);
            }
            Shader.SetGlobalVectorArray(IdVana, vanaA); Shader.SetGlobalVectorArray(IdVanaB, vanaB); Shader.SetGlobalFloat(IdVanaMaara, l.Count);
        }

        public void Avaa(Transform vanhempi, double lat, double lon, int kerros)
        {
            Sulje();
            Debug.Log($"MATKAKIRJA kaupunki: vesi avaus {lat:F4},{lon:F4}, pakotettu {(Pakotettu?.ToString() ?? "-")}, juuri {JuuriUrl()}");
            if (Pakotettu == false || vanhempi == null) return;
            this.kerros = kerros; vanhempi0 = vanhempi;
            int tama = ++avaus;
            if (LinssiOhjain.Instanssi == null) { Debug.Log("MATKAKIRJA kaupunki: vesi: ei korutiinin isäntää (LinssiOhjain)"); return; }
            LinssiOhjain.Instanssi.StartCoroutine(Lataa(JuuriUrl(), lat, lon, tama));
        }
        Transform vanhempi0;

        static string JuuriUrl()
        {
            try
            {
                var p = System.IO.Path.Combine(Application.persistentDataPath, "kaupunki-vesi.txt");
                if (System.IO.File.Exists(p)) { var r = System.IO.File.ReadAllLines(p).FirstOrDefault(x => !string.IsNullOrWhiteSpace(x))?.Trim(); if (!string.IsNullOrEmpty(r)) return r.EndsWith("/") ? r : r + "/"; }
            }
            catch (Exception) { }
            return VesiJuuri;
        }

        IEnumerator Lataa(string juuriUrl, double lat, double lon, int tama)
        {
            // Kohde indexistä: lähin, jonka säteellä kaupunki on.
            // index-v2.json (Tukholma + Pariisi; Karttaseppä 8.10.: uudet kohteet uuteen versioon, vanha ei ylikirjoitu), varana index.json.
            string k = null, tiedosto = null; string indeksi = null; nostoIndeksista = false;
            foreach (var nimi in new[] { "index-v3.json", "index-v2.json", "index.json" })   // v3: kohdekohtainen nosto_m (Karttaseppä 8.10.)
            {
                using var r0 = UnityWebRequest.Get(juuriUrl + nimi);
                r0.timeout = 15; yield return r0.SendWebRequest();
                if (r0.result == UnityWebRequest.Result.Success) { indeksi = r0.downloadHandler.text; break; }
            }
            {
                bool ok = indeksi != null;
                if (ok)
                {
                    foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(indeksi)), "kohteet")).Select(MiniJson.Objekti))
                        if (Etaisyys(MiniJson.Luku(o, "lat") ?? 0, MiniJson.Luku(o, "lon") ?? 0, lat, lon) < (MiniJson.Luku(o, "sade_km") ?? 0) * 1000)
                        {
                            k = MiniJson.Teksti(o, "id");
                            tiedosto = MiniJson.Teksti(o, "tiedosto");   // index-v3: uusi aineisto omalla nimellä (ämpäriä ei ylikirjoiteta)
                            if (!NostoAsetettu && MiniJson.Luku(o, "nosto_m") is double nk) { NostoM = (float)nk; nostoIndeksista = true; }
                            break;
                        }
                }
                else kirjaa?.Invoke("kaupunki: vesi: index-v2.json / index.json ei latautunut");
            }
            Debug.Log($"MATKAKIRJA kaupunki: vesi indeksi {(indeksi != null ? "ok" : "PUUTTUU")}, kohde {k ?? "-"}");
            if (k == null || tama != avaus || Pakotettu == null && Array.IndexOf(OletusKohteet, k) < 0) yield break;
            string pohja = juuriUrl + (string.IsNullOrEmpty(tiedosto) ? k : tiedosto);
            VesiVerkko l = null, ka = null; (double Lat, double Lon)? origo = null;
            foreach (var (ruutu, lahiTaso) in new[] { ("6m", true), ("16m", false) })
            {
                string json = null; byte[] tavut = null;
                using (var r = UnityWebRequest.Get($"{pohja}-{ruutu}.json")) { r.timeout = 20; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) json = r.downloadHandler.text; }
                using (var r = UnityWebRequest.Get($"{pohja}-{ruutu}.bytes")) { r.timeout = 60; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) tavut = r.downloadHandler.data; }
                if (tama != avaus) yield break;
                if (json == null || tavut == null) { Debug.Log($"MATKAKIRJA kaupunki: vesi {pohja}-{ruutu} ei latautunut"); continue; }
                var v = Jasenna(json, tavut, out var o);
                origo ??= o;
                if (lahiTaso) l = v; else ka = v;
            }
            if (origo == null || vanhempi0 == null) yield break;
            juuri = new GameObject("Kaupunki vesi " + k) { layer = kerros };
            juuri.transform.SetParent(vanhempi0, false);
            var ankkuri = juuri.AddComponent<CesiumGlobeAnchor>();
            ankkuri.adjustOrientationForGlobeWhenMoving = true;
            ankkuri.longitudeLatitudeHeight = new double3(origo.Value.Lon, origo.Value.Lat, 0);   // ellipsoidikorkeus 0 (aineiston ENU)
            ankkuri.rotationEastUpNorth = quaternion.identity;
            var sh = Shader.Find("Matkakirja/Linssit/VesiPinta");
            if (sh != null) mat = new Material(sh) { name = "KaupunkiVesi" };
            lahi = l; kauka = ka;
            KrediittiNyt = string.IsNullOrEmpty(krediitti) ? "Vesi: © OpenStreetMap contributors, ESA WorldCover" : krediitti;
            Debug.Log($"MATKAKIRJA kaupunki: vesi ladattu ({lahi?.Palat.Length ?? 0} lähi- ja {kauka?.Palat.Length ?? 0} kaukopalaa, nosto {NostoM:F1} m)");
        }

        VesiVerkko Jasenna(string json, byte[] tavut, out (double Lat, double Lon)? origo)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var oj = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "origo"));
            origo = oj != null && MiniJson.Luku(oj, "lat") is double la && MiniJson.Luku(oj, "lon") is double lo ? (la, lo) : ((double, double)?)null;
            krediitti = MiniJson.Teksti(j, "krediitti");
            if (!NostoAsetettu && !nostoIndeksista && MiniJson.Luku(j, "nosto_m_suositus") is double n) NostoM = (float)n;
            var palat = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "palat")).Select(MiniJson.Objekti).Select(p =>
            {
                double[] L(string k) => MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(p, k)).Select(Convert.ToDouble).ToArray();
                var ka = L("karjet"); var ix = L("indeksit"); var b = L("bbox");
                return new VesiVerkko.Pala { K0 = (int)ka[0], Kn = (int)ka[1], I0 = (int)ix[0], In = (int)ix[1], MinE = b[0], MinN = b[1], MinU = b[2], MaxE = b[3], MaxN = b[4], MaxU = b[5] };
            }).ToArray();
            return new VesiVerkko(tavut, (int)(MiniJson.Luku(j, "karkia") ?? 0), (int)(MiniJson.Luku(j, "indekseja") ?? 0), palat);
        }

        /// <summary>Joka kehys (CesiumKaupunki): palat kameran ympäriltä, kun kamera on siirtynyt yli PaivitysM.</summary>
        public void Paivita(Camera kamera)
        {
            if (juuri == null || kamera == null || (lahi == null && kauka == null)) return;
            // Asetus "vesi 0" kesken näkymän: vesi piiloon (ei mustaa pintaa; kuvapari 8.10.).
            bool nakyy = Pakotettu != false;
            if (juuri.activeSelf != nakyy) juuri.SetActive(nakyy);
            if (!nakyy) return;
            Nakyvissa = true;
            LahetaVanat(kamera);
            for (int n = 0; n < PalojaKehyksessa && jono.Count > 0; n++)
            {
                var h = jono.Dequeue();
                if (!palat.ContainsKey(h)) palat[h] = LuoPala(h.Item1 ? lahi : kauka, h.Item2, h.Item1);
            }
            var p = juuri.transform.InverseTransformPoint(kamera.transform.position);   // paikallinen: x itä, y ylös, z pohjoinen (m)
            if (!float.IsNaN(edellinen.x) && (p - edellinen).sqrMagnitude < PaivitysM * PaivitysM) return;
            edellinen = p;
            var halutut = new HashSet<(bool, int)>();
            if (lahi != null) foreach (var i in lahi.Valitse(p.x, p.z, 0, LahiM)) halutut.Add((true, i));
            if (kauka != null) foreach (var i in kauka.Valitse(p.x, p.z, lahi != null ? LahiM : 0, KaukoM)) halutut.Add((false, i));
            foreach (var kv in palat.Where(kv => !halutut.Contains(kv.Key)).ToList()) { UnityEngine.Object.Destroy(kv.Value.GetComponent<MeshFilter>().sharedMesh); UnityEngine.Object.Destroy(kv.Value); palat.Remove(kv.Key); }
            // Uudet jonoon lähimmästä alkaen (luodaan PalojaKehyksessa kehyksessä); vanha jono hylätään.
            jono.Clear();
            foreach (var h in halutut.Where(h => !palat.ContainsKey(h)).OrderBy(h => (h.Item1 ? lahi : kauka).Etaisyys(h.Item2, p.x, p.z))) jono.Enqueue(h);
        }

        GameObject LuoPala(VesiVerkko v, int i, bool lahiTaso)
        {
            var paikat = new List<(float X, float Y, float Z)>(); var ranta = new List<float>(); var kolmiot = new List<int>();
            v.Unityyn(i, NostoM, paikat, ranta, kolmiot);
            var m = new Mesh { name = $"Vesi {(lahiTaso ? "6m" : "16m")} {i}", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            m.SetVertices(paikat.Select(x => new Vector3(x.X, x.Y, x.Z)).ToList());
            m.SetUVs(0, ranta.Select(d => new Vector2(d, 0)).ToList());
            m.SetTriangles(kolmiot, 0); m.RecalculateBounds();
            var go = new GameObject(m.name) { layer = kerros };
            go.transform.SetParent(juuri.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = m;
            var mr = go.AddComponent<MeshRenderer>(); mr.sharedMaterial = mat;
            mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; mr.receiveShadows = false;
            return go;
        }

        public void Sulje()
        {
            avaus++;
            foreach (var g in palat.Values) if (g != null) { UnityEngine.Object.Destroy(g.GetComponent<MeshFilter>().sharedMesh); UnityEngine.Object.Destroy(g); }
            palat.Clear(); jono.Clear();
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            if (mat != null) UnityEngine.Object.Destroy(mat);
            juuri = null; mat = null; lahi = kauka = null; edellinen = new Vector3(float.NaN, 0, 0); KrediittiNyt = null; Nakyvissa = false;
        }

        /// <summary>Vesipinnan korkeus juuren paikallisessa kehyksessä (x itä, z pohjoinen → y, nosto mukana); false = ei vettä (LS1:n veneet).</summary>
        public bool VedenKorkeus(float x, float z, out float y)
        {
            y = 0;
            var v = lahi ?? kauka; if (v == null) return false;
            if (!v.Korkeus(x, z, out var u) && !(kauka != null && v != kauka && kauka.Korkeus(x, z, out u))) return false;
            y = (float)u + NostoM; return true;
        }

        static double Etaisyys(double la1, double lo1, double la2, double lo2)
        {
            const double R = 6371000, A = Math.PI / 180;
            double x = (lo2 - lo1) * A * Math.Cos((la1 + la2) * 0.5 * A), y = (la2 - la1) * A;
            return R * Math.Sqrt(x * x + y * y);
        }
    }
}
