// KAUPUNGIN OMA VESIPINTA (Linssiseppä 2, 8.10.2026; omistaja 20.2x valitsi B: oma vesipinta Googlen laattojen päälle, ei maskia
// Googlen varjostimeen). Karttasepän aineisto: <juuri><kohde>-6m.json/.bytes (lähellä) ja -16m (kaukana, LOD), ENU kohteen origossa
// (ellipsoidikorkeus 0). Paikka CesiumGlobeAnchorilla origoon (paikalliset akselit itä, ylös, pohjoinen), palat 1 km² kameran ympäriltä:
// lähi alle LahiM 6 m:n verkosta, kauka LahiM–KaukoM 16 m:n verkosta, päivitys kameran siirryttyä yli PaivitysM. Varjostin VesiPinta.
// Juuri: VesiJuuri (oletus ämpärin vesi/), kehitysajossa Documents/kaupunki-vesi.txt (ensimmäinen rivi, myös file://). Krediitti
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
        public static bool Paalla;
        public static string VesiJuuri = "https://media.matkakirja.app/vesi/";
        public const float LahiM = 3000f, KaukoM = 20000f, PaivitysM = 400f;
        public static float NostoM = 0.4f;
        /// <summary>Kohteet (id, lat, lon, säde km): aineistot, jotka Karttaseppä on tehnyt; Eurooppa ensin.</summary>
        public static readonly (string Id, double Lat, double Lon, double SadeKm)[] Kohteet = { ("tukholma", 59.3293, 18.0686, 15) };

        readonly Action<string> kirjaa;
        GameObject juuri; Material mat; int kerros;
        VesiVerkko lahi, kauka; string krediitti;
        readonly Dictionary<(bool, int), GameObject> palat = new Dictionary<(bool, int), GameObject>();
        Vector3 edellinen = new Vector3(float.NaN, 0, 0);
        int avaus;

        public KaupunkiVesi(Action<string> kirjaa) { this.kirjaa = kirjaa; }
        public string Krediitti => krediitti;

        public void Avaa(Transform vanhempi, double lat, double lon, int kerros)
        {
            Sulje();
            if (!Paalla || vanhempi == null) return;
            var k = Kohteet.Where(x => Etaisyys(x.Lat, x.Lon, lat, lon) < x.SadeKm * 1000).Select(x => x.Id).FirstOrDefault();
            if (k == null) return;
            this.kerros = kerros;
            var juuriUrl = Juuri();
            var x0 = Kohteet.First(x => x.Id == k);
            juuri = new GameObject("Kaupunki vesi " + k) { layer = kerros };
            juuri.transform.SetParent(vanhempi, false);
            var ankkuri = juuri.AddComponent<CesiumGlobeAnchor>();
            ankkuri.adjustOrientationForGlobeWhenMoving = true;
            ankkuri.longitudeLatitudeHeight = new double3(x0.Lon, x0.Lat, 0);
            ankkuri.rotationEastUpNorth = quaternion.identity;
            var sh = Shader.Find("Matkakirja/Linssit/VesiPinta");
            if (sh != null) mat = new Material(sh) { name = "KaupunkiVesi" };
            int tama = ++avaus;
            LinssiOhjain.Instanssi?.StartCoroutine(Lataa(juuriUrl + k, tama));
        }

        static string Juuri()
        {
            try
            {
                var p = System.IO.Path.Combine(Application.persistentDataPath, "kaupunki-vesi.txt");
                if (System.IO.File.Exists(p)) { var r = System.IO.File.ReadAllLines(p).FirstOrDefault(x => !string.IsNullOrWhiteSpace(x))?.Trim(); if (!string.IsNullOrEmpty(r)) return r.EndsWith("/") ? r : r + "/"; }
            }
            catch (Exception) { }
            return VesiJuuri;
        }

        IEnumerator Lataa(string pohja, int tama)
        {
            VesiVerkko l = null, ka = null;
            foreach (var (ruutu, lahiTaso) in new[] { ("6m", true), ("16m", false) })
            {
                string json = null; byte[] tavut = null;
                using (var r = UnityWebRequest.Get($"{pohja}-{ruutu}.json")) { r.timeout = 20; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) json = r.downloadHandler.text; }
                using (var r = UnityWebRequest.Get($"{pohja}-{ruutu}.bytes")) { r.timeout = 60; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) tavut = r.downloadHandler.data; }
                if (tama != avaus) yield break;
                if (json == null || tavut == null) { kirjaa?.Invoke($"kaupunki: vesi {pohja}-{ruutu} ei latautunut"); continue; }
                var v = Jasenna(json, tavut);
                if (lahiTaso) l = v; else ka = v;
            }
            lahi = l; kauka = ka;
            kirjaa?.Invoke($"kaupunki: vesi ladattu ({lahi?.Palat.Length ?? 0} lähi- ja {kauka?.Palat.Length ?? 0} kaukopalaa, nosto {NostoM:F1} m)");
        }

        VesiVerkko Jasenna(string json, byte[] tavut)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            krediitti = MiniJson.Teksti(j, "krediitti");
            if (MiniJson.Luku(j, "nosto_m_suositus") is double n) NostoM = (float)n;
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
            var p = juuri.transform.InverseTransformPoint(kamera.transform.position);   // paikallinen: x itä, y ylös, z pohjoinen (m)
            if (!float.IsNaN(edellinen.x) && (p - edellinen).sqrMagnitude < PaivitysM * PaivitysM) return;
            edellinen = p;
            var halutut = new HashSet<(bool, int)>();
            if (lahi != null) foreach (var i in lahi.Valitse(p.x, p.z, 0, LahiM)) halutut.Add((true, i));
            if (kauka != null) foreach (var i in kauka.Valitse(p.x, p.z, lahi != null ? LahiM : 0, KaukoM)) halutut.Add((false, i));
            foreach (var kv in palat.Where(kv => !halutut.Contains(kv.Key)).ToList()) { UnityEngine.Object.Destroy(kv.Value.GetComponent<MeshFilter>().sharedMesh); UnityEngine.Object.Destroy(kv.Value); palat.Remove(kv.Key); }
            foreach (var h in halutut) if (!palat.ContainsKey(h)) palat[h] = LuoPala(h.Item1 ? lahi : kauka, h.Item2, h.Item1);
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
            palat.Clear();
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            if (mat != null) UnityEngine.Object.Destroy(mat);
            juuri = null; mat = null; lahi = kauka = null; edellinen = new Vector3(float.NaN, 0, 0);
        }

        static double Etaisyys(double la1, double lo1, double la2, double lo2)
        {
            const double R = 6371000, A = Math.PI / 180;
            double x = (lo2 - lo1) * A * Math.Cos((la1 + la2) * 0.5 * A), y = (la2 - la1) * A;
            return R * Math.Sqrt(x * x + y * y);
        }
    }
}
