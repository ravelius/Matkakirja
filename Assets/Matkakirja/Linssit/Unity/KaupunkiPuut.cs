// KAUPUNKIEN PUUT KORTTEINA (Linssiseppä 10.10.2026; Päätoimittaja 18.5x, juna 181): kaupunkinäkymän (pallo ja opas, CesiumKaupunki +
// Googlen 3D-laatat) puut Karttasepän puudatasta (puut-20261010: OSM natural=tree + Meta & WRI Canopy Height Maps; Pariisi 506 000,
// Tukholma 1,05 milj.). Ydin Elava/PuuRuudukko (jäsennys, ruutuvalinta, näkymäkartio, LOD), varjostin Varjostimet/KaupunkiPuu.
// DATA: ämpäri kartta/puut/v1/puut-<id>.bytes (4,1 / 8,4 Mt; tyokalut/kaupunki_puut_paketti.py) → laitteen välimuisti
// persistentDataPath/kuvat/kaupunkipuut/v1 kerran; sitten tiedostosta luetaan vain kameran lähiruudut (250 m) FileStreamilla. Resources
// ei käy: TextAsset pitäisi koko 8,4 Mt:n tiedoston muistissa (jetsam-historia Pariisissa).
// PAIKKA: CesiumGlobeAnchor Karttasepän origoon kuten ElavaKaupunki (x itä, y ylös, z pohjoinen, m); puun tyvi maanpinnasta (DTM),
// sen ulkopuolella pintamallista (DSM) Ydin PuuRuudukko.MaaPinnasta (25 näytettä, toiseksi pienin; 11.10., iPad-ajo 181: vanha 4 näytteen
// kehä jätti latvuksia ilmaan). Näytteet suoraan mallin ENU:sta (OmaKorkeus.KorkeusEnu): Karttasepän puut ja korkeusruudukot käyttävät
// samaa ENU-kaavaa ja origoa, joten lat/lon-kierros (111 132 m/° ≠ Mr) ja KorkeusId-haku jäävät pois.
// Ruudut ladataan vasta, kun maanpinta on ratkennut (kuten katuliikenne), enintään PuitaKehyksessa puuta kehyksessä.
// PIIRTO: GPU-instanssit GraphicsBufferissa (16 t / puu), Graphics.RenderPrimitives kahdesti: lähipuut (< LahiM) latvus + runko
// (12 kärkeä), kaukopuut (< KaukoM) pelkkä latvus (6 kärkeä); kauempana ei mitään (Googlen laatat riittävät; häivytys reunalla).
// Ruudut näkymäkartiosta (ruudun laatikko), lista rakennetaan uudelleen vain kun kamera liikkuu (> 2 m tai > 1°) tai ruutuja tulee.
// TUPLAPUUT (PT: Googlen sulaneet puut eivät saa näkyä korttipuiden alla): latvus on kameraan päin kääntyvä kortti, joka on
// Peitto × latvuksen kokoinen ja siirretty latvuksen säteen verran kameraa kohti (näytön koko korjattu): kortti on aina Googlen
// puumöykyn (sama latvus, sama korkeus) edessä ja peittää sen siluetin joka suunnasta. Googlen laattoihin ei kosketa (Map Tiles:
// geometria ja kuva ennallaan; maski laattavarjostimessa vaatisi geometrian muutoksen tai jättäisi reiän möykyn alle).
// GOOGLEN PUUT ENSIN (PT 11.10., Tukholma t07: latvusmallin arviot ovat Googlen puita matalampia ja leveämpiä → tupla): kaupungeissa,
// joilla PuuRuudukko.Kaupungit.GooglenPuut (Tukholma), ilmasta nähdyt puut (PuuRuudukko.GooglellaPuu) ohitetaan jo latauksessa;
// komento `opas puut tupla 0|1|auto` pakottaa (auki oleva kaupunki ladataan uudelleen).
// KYTKIN: asetus "elava.Puut" (oletus 1), komento `opas puut 0|1|tila` (heti), `opas puut lahi|kauko|peitto N`, `opas puut tupla 0|1|auto`.
// MUISTIPORTTI (Natiiviseppä): rivi "MATKAKIRJA kaupunki: puut muisti <id>: CPU x Mt, GPU y Mt, puita z" komennolla `opas puut tila` ja
// kun ruutujono tyhjenee (ensimmäinen kerta kaupungissa, sitten kun puiden määrä muuttuu > 10 %, enintään 5 s:n välein).
// MUISTI (iPad Pro 13, tavoite < 15 Mt): ruututaulu 16 kt, ladatut ruudut (KaukoM + 250 m) ≤ ~75 000 puuta × 16 t ≈ 1,2 Mt,
// koottu lista ja GPU-puskuri (LahiMax + KaukoMax) × 16 t = 1,1 Mt kumpikin → ≈ 3,5 Mt; tiedosto levyllä (ei muistissa).
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using CesiumForUnity;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Elava;
using Matkakirja.Linssit.Kierros;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiPuut : MonoBehaviour
    {
        /// <summary>Komennon pakotus (null = asetus elava.Puut, oletus päällä).</summary>
        public static bool? Pakko;
        public static bool Paalla => Pakko ?? Matkakirja.Peli.Asetus.Luku("elava.Puut", 1) != 0;
        /// <summary>LOD-rajat (m kamerasta) ja latvuskortin koko latvukseen nähden (Googlen möykyn peitto).</summary>
        public static float LahiM = 400f, KaukoM = 2500f, Peitto = 1.15f;
        /// <summary>Googlen puut ensin -pakotus (null = kaupungin oletus PuuRuudukko.Kaupungit.GooglenPuut).</summary>
        public static bool? TuplaPakko;
        public const int LahiMax = 20000, KaukoMax = 50000, PuitaKehyksessa = 4000;
        public const float PoistoVaraM = 600f;
        public static KaupunkiPuut Nykyinen { get; private set; }
        /// <summary>Lähteet-näkymään (OpasValikko), kun puut ovat näkyvissä; null = ei riviä.</summary>
        public static string Krediitti => Nykyinen != null && Nykyinen.ruudukko != null ? PuuRuudukko.Krediitti : null;
        static CesiumKaupunki viimeKaupunki;

        [StructLayout(LayoutKind.Sequential)]
        struct PuuGpu { public float X, Y, Z; public uint Koodi; }
        sealed class Ruutu { public PuuGpu[] Puut; public float MinY, MaxY; }

        string id; double lat0, lon0; long tavua; bool googlenPuut;
        bool OhitaGooglen => TuplaPakko ?? googlenPuut;
        PuuRuudukko ruudukko; FileStream tiedosto; string tila = "ei aloitettu";
        readonly Dictionary<int, Ruutu> ladatut = new Dictionary<int, Ruutu>();
        readonly List<int> halutut = new List<int>(), poistettavat = new List<int>();
        int keskiI = int.MinValue, keskiJ = int.MinValue, jonoKohta, ladattuPuita, ilmanMaata, dsmPuita, googlenOhitettu, muistiPuita = -1;
        float muistiAika = -100f;
        OmaKorkeus maaMalli, pintaMalli; bool maaEnu, pintaEnu; Func<double, double, double> pintaNayte;
        byte[] lukuPuskuri = new byte[0]; PuuRuudukko.Puu[] puraPuskuri = new PuuRuudukko.Puu[0];
        PuuGpu[] valmis; GraphicsBuffer puskuri; int lahia, kaukoja;
        Material mat; MaterialPropertyBlock lahiMp, kaukoMp;
        Vector3 viimeC, viimeF; float viimeFov; bool likainen = true, dtm;
        Camera kamera;
        readonly float[] tasot = new float[24]; readonly Plane[] tasoT = new Plane[6];
        static readonly int IdPuut = Shader.PropertyToID("_Puut"), IdMatriisi = Shader.PropertyToID("_PuuMatriisi"), IdKamera = Shader.PropertyToID("_PuuKamera"),
            IdOikea = Shader.PropertyToID("_PuuOikea"), IdYlos = Shader.PropertyToID("_PuuYlos"), IdParam = Shader.PropertyToID("_PuuParam"),
            IdAlku = Shader.PropertyToID("_PuuAlku"), IdTapa = Shader.PropertyToID("_PuuTapa");

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            CesiumKaupunki.Avattu -= Avaa; CesiumKaupunki.Avattu += Avaa;
            CesiumKaupunki.Suljettu -= Sulje; CesiumKaupunki.Suljettu += Sulje;
            RenderPipelineManager.beginCameraRendering -= KameraAlkaa; RenderPipelineManager.beginCameraRendering += KameraAlkaa;
        }

        static void Sulje(CesiumKaupunki k)
        {
            if (Nykyinen != null) Destroy(Nykyinen.gameObject);
            Nykyinen = null;
            if (k != null && k == viimeKaupunki) viimeKaupunki = null;
        }

        static void Avaa(CesiumKaupunki k)
        {
            if (Nykyinen != null) Destroy(Nykyinen.gameObject);
            Nykyinen = null; viimeKaupunki = k;
            var gr = k?.Georef;
            if (!Paalla || gr == null) return;
            int i = Array.FindIndex(PuuRuudukko.Kaupungit, p => Matkakirja.Linssit.Kierros.KierrosLento.EtaisyysM(p.Lat, p.Lon, gr.latitude, gr.longitude) < 20000);
            if (i < 0) return;
            var kk = PuuRuudukko.Kaupungit[i];
            var go = new GameObject("Kaupunkipuut " + kk.Id) { layer = CesiumKaupunki.Kerros };
            go.transform.SetParent(gr.transform, false);
            var ankkuri = go.AddComponent<CesiumGlobeAnchor>();
            ankkuri.adjustOrientationForGlobeWhenMoving = true;
            ankkuri.longitudeLatitudeHeight = new double3(kk.Lon, kk.Lat, 0);
            ankkuri.rotationEastUpNorth = quaternion.identity;
            var p2 = go.AddComponent<KaupunkiPuut>();
            p2.id = kk.Id; p2.lat0 = kk.Lat; p2.lon0 = kk.Lon; p2.tavua = kk.Tavua; p2.googlenPuut = kk.GooglenPuut;
            Nykyinen = p2;
            p2.StartCoroutine(p2.Lataa());
        }

        /// <summary>Komento `opas puut 0|1`: heti voimaan (auki olevassa kaupungissa).</summary>
        public static void Aseta(bool paalla)
        {
            Pakko = paalla;
            if (!paalla) { if (Nykyinen != null) Destroy(Nykyinen.gameObject); Nykyinen = null; }
            else if (Nykyinen == null && viimeKaupunki != null) Avaa(viimeKaupunki);
        }

        /// <summary>Komento `opas puut tupla 0|1|auto`: Googlen puut ensin pakotettuna (null = kaupungin oletus); auki oleva kaupunki uudelleen.</summary>
        public static void AsetaTupla(bool? ohita)
        {
            TuplaPakko = ohita;
            if (Nykyinen != null && viimeKaupunki != null) Avaa(viimeKaupunki);
        }

        IEnumerator Lataa()
        {
            float t0 = Time.realtimeSinceStartup;
            string polku = Path.Combine(Application.persistentDataPath, "kuvat", "kaupunkipuut", "v1", "puut-" + id + ".bytes");
            bool valimuisti = File.Exists(polku) && new FileInfo(polku).Length == tavua;
            if (!valimuisti)
            {
                tila = "ladataan ämpäristä";
                string osa = polku + ".osa";
                string vika = null;
                try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); if (File.Exists(osa)) File.Delete(osa); }
                catch (Exception e) { vika = "välimuisti " + e.Message; }
                if (vika != null) { tila = vika; Debug.Log("MATKAKIRJA kaupunki: puut " + id + ": " + tila); yield break; }
                using (var r = new UnityWebRequest(PuuRuudukko.Juuri + "puut-" + id + ".bytes", "GET") { downloadHandler = new DownloadHandlerFile(osa) { removeFileOnAbort = true }, timeout = 90 })
                {
                    r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                    yield return r.SendWebRequest();
                    if (r.result != UnityWebRequest.Result.Success) { tila = $"ämpäri {r.responseCode} {r.error}"; Debug.Log("MATKAKIRJA kaupunki: puut " + id + ": " + tila); yield break; }
                }
                try
                {
                    if (new FileInfo(osa).Length != tavua) throw new IOException($"koko {new FileInfo(osa).Length} ≠ {tavua}");
                    if (File.Exists(polku)) File.Delete(polku);
                    File.Move(osa, polku);
                }
                catch (Exception e) { vika = "lataus " + e.Message; }
                if (vika != null) { tila = vika; Debug.Log("MATKAKIRJA kaupunki: puut " + id + ": " + tila); yield break; }
            }
            try
            {
                tiedosto = new FileStream(polku, FileMode.Open, FileAccess.Read, FileShare.Read, 4096);
                var o = new byte[PuuRuudukko.OtsakeTavua];
                Lue(o, o.Length);
                var a = new byte[PuuRuudukko.OtsakeTavua + PuuRuudukko.TauluTavua(o)];
                tiedosto.Position = 0; Lue(a, a.Length);
                var rr = PuuRuudukko.Lue(a);
                if (rr.TiedostonKoko != tiedosto.Length) throw new FormatException($"tiedosto {tiedosto.Length} t, otsakkeen mukaan {rr.TiedostonKoko} t");
                ruudukko = rr;
                tila = "valmis";
                Debug.Log($"MATKAKIRJA kaupunki: puut {id}: {rr.Puita} puuta {rr.RuutujaX}×{rr.RuutujaY} ruudussa ({(valimuisti ? "välimuisti" : "ämpäri")}) {Time.realtimeSinceStartup - t0:F1} s:ssa");
            }
            catch (Exception e)
            {
                tila = "virhe " + e.Message;
                Debug.Log("MATKAKIRJA kaupunki: puut " + id + ": " + tila);
                tiedosto?.Dispose(); tiedosto = null;
                try { File.Delete(polku); } catch (Exception) { }   // seuraava avaus hakee uudelleen
            }
        }

        void Lue(byte[] b, int n)
        {
            int luettu = 0, k;
            while (luettu < n && (k = tiedosto.Read(b, luettu, n - luettu)) > 0) luettu += k;
            if (luettu < n) throw new EndOfStreamException($"{luettu}/{n} t");
        }

        void OnDestroy()
        {
            if (Nykyinen == this) Nykyinen = null;
            tiedosto?.Dispose(); tiedosto = null;
            puskuri?.Release(); puskuri = null;
            if (mat != null) Destroy(mat);
            ladatut.Clear(); valmis = null;
        }

        bool LuoMateriaali()
        {
            var sh = Resources.Load<Shader>("Varjostimet/KaupunkiPuu");
            if (sh == null || !sh.isSupported) { tila = "varjostin " + (sh == null ? "puuttuu" : "EI tuettu"); enabled = false; Debug.Log("MATKAKIRJA kaupunki: puut: " + tila); return false; }
            mat = new Material(sh) { name = "Kaupunkipuut" };
            lahiMp = new MaterialPropertyBlock(); kaukoMp = new MaterialPropertyBlock();
            return true;
        }

        /// <summary>Korkeusmallit tälle kehykselle: suoraan ENU:sta, kun mallin origo on puiden origo (Karttasepän sama ENU-kaava).</summary>
        void Mallit()
        {
            maaMalli = OpasSovitin.MaanpintaMalli(lat0, lon0); pintaMalli = OpasSovitin.PintaMalli(lat0, lon0);
            maaEnu = maaMalli != null && SamaOrigo(maaMalli); pintaEnu = pintaMalli != null && SamaOrigo(pintaMalli);
            pintaNayte ??= (x, z) => Nayte(pintaMalli, pintaEnu, x, z);
        }
        bool SamaOrigo(OmaKorkeus m) => Math.Abs(m.Lat0 - lat0) < 1e-6 && Math.Abs(m.Lon0 - lon0) < 1e-6;
        double Nayte(OmaKorkeus m, bool enu, double x, double z) => m == null ? double.NaN : enu ? m.KorkeusEnu(x, z)
            : m.Korkeus(lat0 + z / 111132.0, lon0 + x / (111320.0 * Math.Cos(lat0 * Math.PI / 180)));

        /// <summary>Maan korkeus paikallisessa ENU:ssa (ellipsoidi → kaarevuuden lasku d²/2R kuten ElavaKaupunki): maanpinta (DTM) pisteessä,
        /// sen ulkopuolella pintamallista (DSM) PuuRuudukko.MaaPinnasta (dsm = true). NaN = korkeusmalli ei muistissa.</summary>
        double Maa(double x, double z, float latvusM, out bool dsm)
        {
            double h = Nayte(maaMalli, maaEnu, x, z);
            dsm = double.IsNaN(h);
            if (dsm) h = PuuRuudukko.MaaPinnasta(pintaNayte, x, z, latvusM);
            return double.IsNaN(h) ? h : h - (x * x + z * z) / (2 * 6371000.0);
        }

        void LataaRuutuja()
        {
            int budjetti = PuitaKehyksessa;
            Mallit();
            dtm = maaMalli != null;
            bool ohita = OhitaGooglen;
            while (jonoKohta < halutut.Count && budjetti > 0)
            {
                int r = halutut[jonoKohta++];
                if (ladatut.ContainsKey(r)) continue;
                int n = ruudukko.Maara(r);
                if (lukuPuskuri.Length < n * PuuRuudukko.PuuTavua) lukuPuskuri = new byte[Mathf.NextPowerOfTwo(n * PuuRuudukko.PuuTavua)];
                if (puraPuskuri.Length < n) puraPuskuri = new PuuRuudukko.Puu[Mathf.NextPowerOfTwo(n)];
                try { tiedosto.Position = ruudukko.Siirto(r); Lue(lukuPuskuri, n * PuuRuudukko.PuuTavua); }
                catch (Exception e) { tila = "luku " + e.Message; Debug.Log("MATKAKIRJA kaupunki: puut: " + tila); enabled = false; return; }
                PuuRuudukko.Pura(lukuPuskuri, 0, n, puraPuskuri);
                var puut = new PuuGpu[n]; int m = 0, kulu = n / 4; float ala = float.MaxValue, yla = float.MinValue;
                for (int k = 0; k < n; k++)
                {
                    var p = puraPuskuri[k];
                    if (ohita && PuuRuudukko.GooglellaPuu(p)) { googlenOhitettu++; continue; }
                    double maa = Maa(p.X, p.Z, p.LatvusM, out bool dsm);
                    kulu += dsm ? 5 : 1;   // DSM: 25 näytettä; luku ja purku n / 4 (ohitetut Googlen puut eivät ole ilmaisia)
                    if (double.IsNaN(maa)) { ilmanMaata++; continue; }
                    if (dsm) dsmPuita++;
                    uint koodi = PuuRuudukko.Koodi(p);
                    puut[m++] = new PuuGpu { X = p.X, Y = (float)maa, Z = p.Z, Koodi = koodi };
                    ala = Mathf.Min(ala, (float)maa); yla = Mathf.Max(yla, (float)maa + PuuRuudukko.KoodiKorkeus(koodi));
                }
                if (m < n) Array.Resize(ref puut, m);
                ladatut[r] = new Ruutu { Puut = puut, MinY = m > 0 ? ala : 0f, MaxY = m > 0 ? yla : 0f };
                ladattuPuita += m; budjetti -= Math.Max(1, kulu); likainen = true;
            }
        }

        void LateUpdate()
        {
            if (ruudukko == null) return;
            if (mat == null && !LuoMateriaali()) return;
            if (kamera == null || !kamera.isActiveAndEnabled) kamera = Camera.main;
            if (kamera == null) return;
            if (ElavaKaupunki.Nykyinen == null) ElavaKaupunki.AsetaValo(transform);   // elävä kaupunki pois: sama valo itse
            Vector3 c = transform.InverseTransformPoint(kamera.transform.position);
            int ci = Mathf.FloorToInt((float)((c.x - ruudukko.X0) / ruudukko.RuutuM)), cj = Mathf.FloorToInt((float)((c.z - ruudukko.Z0) / ruudukko.RuutuM));
            if (ci != keskiI || cj != keskiJ)
            {
                keskiI = ci; keskiJ = cj;
                ruudukko.Ruudut(c.x, c.z, KaukoM + ruudukko.RuutuM, halutut);
                jonoKohta = 0;
                poistettavat.Clear();
                foreach (var kv in ladatut) if (ruudukko.Etaisyys(kv.Key, c.x, c.z) > KaukoM + PoistoVaraM) poistettavat.Add(kv.Key);
                foreach (int r in poistettavat) { ladattuPuita -= ladatut[r].Puut.Length; ladatut.Remove(r); }
                likainen = true;
            }
            if (jonoKohta < halutut.Count && OpasSovitin.MaanpintaValmis(lat0, lon0)) LataaRuutuja();
            // Muistiportti: jono tyhjä (lataus valmis tälle näkymälle) → rivi ensimmäisellä kerralla ja kun määrä muuttuu > 10 % (≥ 5 s välein).
            if (jonoKohta >= halutut.Count && halutut.Count > 0 && Time.realtimeSinceStartup - muistiAika > 5f
                && (muistiPuita < 0 || Math.Abs(ladattuPuita - muistiPuita) > 0.1 * Math.Max(1, muistiPuita)))
                KirjaaMuisti();
            Vector3 f = transform.InverseTransformDirection(kamera.transform.forward).normalized;
            if (likainen || (c - viimeC).sqrMagnitude > 4f || Vector3.Dot(f, viimeF) < 0.99985f || Mathf.Abs(kamera.fieldOfView - viimeFov) > 0.2f)
                Rakenna(c, f);
            Piirra();
        }

        void Rakenna(Vector3 c, Vector3 f)
        {
            likainen = false; viimeC = c; viimeF = f; viimeFov = kamera.fieldOfView;
            GeometryUtility.CalculateFrustumPlanes(kamera.projectionMatrix * kamera.worldToCameraMatrix * transform.localToWorldMatrix, tasoT);
            for (int i = 0; i < 6; i++) { var n = tasoT[i].normal; float s = 1f / Mathf.Max(1e-6f, n.magnitude); tasot[i * 4] = n.x * s; tasot[i * 4 + 1] = n.y * s; tasot[i * 4 + 2] = n.z * s; tasot[i * 4 + 3] = tasoT[i].distance * s; }
            valmis ??= new PuuGpu[LahiMax + KaukoMax];
            lahia = 0; kaukoja = 0;
            float lahi2 = LahiM * LahiM, kauko2 = KaukoM * KaukoM;
            foreach (int r in halutut)
            {
                if (!ladatut.TryGetValue(r, out var ru) || ru.Puut.Length == 0) continue;
                if (ruudukko.Etaisyys(r, c.x, c.z) > KaukoM) continue;
                var a = ruudukko.Alue(r);
                if (!PuuRuudukko.Nakyvissa(tasot, a.X0, ru.MinY, a.Z0, a.X1, ru.MaxY, a.Z1, 30)) continue;   // vara: latvus ruudun reunan yli
                var pp = ru.Puut;
                for (int k = 0; k < pp.Length; k++)
                {
                    float dx = pp[k].X - c.x, dy = pp[k].Y - c.y, dz = pp[k].Z - c.z, d2 = dx * dx + dy * dy + dz * dz;
                    if (d2 < lahi2) { if (lahia < LahiMax) valmis[lahia++] = pp[k]; }
                    else if (d2 < kauko2 && kaukoja < KaukoMax) valmis[LahiMax + kaukoja++] = pp[k];
                }
            }
            if (kaukoja > 0 && lahia < LahiMax) Array.Copy(valmis, LahiMax, valmis, lahia, kaukoja);
            if (lahia + kaukoja == 0) return;
            puskuri ??= new GraphicsBuffer(GraphicsBuffer.Target.Structured, LahiMax + KaukoMax, Marshal.SizeOf<PuuGpu>());
            puskuri.SetData(valmis, 0, 0, lahia + kaukoja);
        }

        void Piirra()
        {
            if (lahia + kaukoja == 0 || puskuri == null) return;
            mat.SetBuffer(IdPuut, puskuri);
            mat.SetMatrix(IdMatriisi, transform.localToWorldMatrix);
            mat.SetVector(IdParam, new Vector4(LahiM, KaukoM, Peitto, 0f));
            AsetaKamera(mat, transform, kamera);
            float s = transform.lossyScale.x;
            var rp = new RenderParams(mat)
            {
                worldBounds = new Bounds(kamera.transform.position, Vector3.one * (2f * (KaukoM + 100f) * s)),
                layer = gameObject.layer, shadowCastingMode = ShadowCastingMode.Off, receiveShadows = false, matProps = lahiMp
            };
            lahiMp.SetFloat(IdAlku, 0f); lahiMp.SetFloat(IdTapa, 0f);
            if (lahia > 0) Graphics.RenderPrimitives(rp, MeshTopology.Triangles, lahia * 12, 1);
            kaukoMp.SetFloat(IdAlku, lahia); kaukoMp.SetFloat(IdTapa, 1f);
            rp.matProps = kaukoMp;
            if (kaukoja > 0) Graphics.RenderPrimitives(rp, MeshTopology.Triangles, kaukoja * 6, 1);
        }

        /// <summary>Kortit kääntyvät piirtävään kameraan: kameran paikka ja akselit puiden paikalliseen ENU:hun (metreinä).</summary>
        static void AsetaKamera(Material m, Transform t, Camera k)
        {
            var c = t.InverseTransformPoint(k.transform.position);
            m.SetVector(IdKamera, new Vector4(c.x, c.y, c.z, 0f));
            var o = t.InverseTransformDirection(k.transform.right).normalized; var y = t.InverseTransformDirection(k.transform.up).normalized;
            m.SetVector(IdOikea, new Vector4(o.x, o.y, o.z, 0f)); m.SetVector(IdYlos, new Vector4(y.x, y.y, y.z, 0f));
        }

        static void KameraAlkaa(ScriptableRenderContext _, Camera k)
        {
            var n = Nykyinen;
            if (n == null || n.mat == null || k == null || (k.cullingMask & (1 << CesiumKaupunki.Kerros)) == 0) return;
            AsetaKamera(n.mat, n.transform, k);
        }

        (long cpu, long gpu) Muisti()
        {
            long cpu = (long)ladattuPuita * 16 + (valmis?.Length ?? 0) * 16L + (ruudukko != null ? (ruudukko.Ruutuja + 1) * 4L : 0)
                + lukuPuskuri.Length + puraPuskuri.Length * 20L + 4096;
            long gpu = puskuri != null ? (long)puskuri.count * puskuri.stride : 0;
            return (cpu, gpu);
        }

        static string Mt(long t) => (t / 1048576.0).ToString("F1", System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',');

        /// <summary>Muistiportin rivi (Natiiviseppä): "MATKAKIRJA kaupunki: puut muisti &lt;id&gt;: CPU x Mt, GPU y Mt, puita z" (pilkku desimaalina,
        /// laitteen kielestä riippumatta). Komento `opas puut tila` ja latauksen valmistuminen (LateUpdate).</summary>
        public static void KirjaaMuisti()
        {
            var n = Nykyinen;
            if (n == null) return;
            var (cpu, gpu) = n.Muisti();
            n.muistiAika = Time.realtimeSinceStartup; n.muistiPuita = n.ladattuPuita;
            Debug.Log($"MATKAKIRJA kaupunki: puut muisti {n.id}: CPU {Mt(cpu)} Mt, GPU {Mt(gpu)} Mt, puita {n.ladattuPuita}");
        }

        /// <summary>Diagnoosi (`opas puut tila`): tiedosto, ruudut, instanssit ja muisti.</summary>
        public static string Tila()
        {
            var n = Nykyinen;
            if (n == null) return $"puut: {(Paalla ? "ei auki" : "pois")} (lähi {LahiM:F0} m, kauko {KaukoM:F0} m, peitto {Peitto:F2}, Googlen puut ensin {(TuplaPakko is bool tp ? (tp ? "1" : "0") : "kaupungin mukaan")})";
            var (cpu, gpu) = n.Muisti();
            return $"puut {n.id}: {n.tila}, ruutuja {n.ladatut.Count}/{n.halutut.Count} (jono {n.jonoKohta}), puita muistissa {n.ladattuPuita}" +
                $"{(n.ilmanMaata > 0 ? $" (ilman maata ohitettu {n.ilmanMaata})" : "")}, piirretään lähi {n.lahia}/{LahiMax} + kauko {n.kaukoja}/{KaukoMax}, " +
                $"muisti CPU {Mt(cpu)} Mt + GPU {Mt(gpu)} Mt, maa {(n.dtm ? "DTM" : "ei DTM:ää")} (DSM-kehältä {n.dsmPuita} puuta), " +
                $"Googlen puut ensin {(n.OhitaGooglen ? $"päällä (ohitettu {n.googlenOhitettu})" : "pois")}{(TuplaPakko.HasValue ? " pakotettu" : "")}, lähi {LahiM:F0} m, kauko {KaukoM:F0} m, peitto {Peitto:F2}";
        }
    }
}
