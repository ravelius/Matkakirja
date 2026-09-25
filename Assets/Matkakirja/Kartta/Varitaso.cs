using System;
using System.Collections;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// VÄRITASO eli kermahuntu (omistajan löydökset 2 ja 22, web js/laattakerma-shader.js): pelaajan nykyinen
    /// maa näkyy pohjan omin värein, muiden maiden MAA saa kerman (#faf4d6) peitolla 0,80 texelin maasäännöllä
    /// a = smoothstep(36, 52, (R − B)·255) — meri jää pohjan väriin, ja naapurimaiden nimet ja relief näkyvät
    /// läpi. Karttaseppä laskee hunnun 23a-pohjasta Mercator-sarjoiksi (Z5–Z8, RGBA webp):
    ///   julisteet/pallo/kerma/&lt;versio&gt;/&lt;ISO&gt;/…   maan alue, oma maa reikänä (alue &lt;ISO&gt;/laatat.json)
    ///   julisteet/pallo/kerma/&lt;versio&gt;/_maailma/… sama sääntö ilman reikää alueen ulkopuolelle
    /// Laattapalvelin ohjaa alueen ulkopuoliset pyynnöt maailman sarjaan (Laattapalvelin.VariAlue); tasot Z0–Z4
    /// ovat läpinäkyviä (web: ei huntua maailmanäkymässä).
    ///
    /// Yksi CesiumUrlTemplateRasterOverlay pohjan päällä (materialKey "2"), osoite vaihdetaan maan
    /// vaihtuessa (NostoKerros.NykyinenMaa tai nappulan lähimmän kaupungin maa; matkalla ei vaihdu).
    /// Maa ilman sarjaa → ei kerrosta (web: väritaso ei sammuta karttaa).
    ///
    /// Linssit käyttävät Cesiumin raster-paikkoja 1 ja 2 (KarttaKerrokset.LisaaRasteri): linssin
    /// kerroksen ajaksi väritaso väistyy (Linssit), ja tyhjän arkin linssit piilottavat sen pohjan mukana.
    ///
    /// LÖYDÖS 128 (omistaja 25.9.2026 klo 22.3x, build 16 → 17): "Kermahuntu peittää nyt liikaa muita maita → peittoa
    /// alas", kuvapari, omistaja valitsee. Peitto on poltettu sarjaan; Karttaseppä polttaa vaihtoehdot p060 ja p045, ja
    /// sarja vaihdetaan ajossa (<see cref="AsetaVersio"/>, komento "vari sarja p080|p060|p045|oletus"). Natiivi ei säädä
    /// peittoa itse (Kermasarja).
    /// </summary>
    public class Varitaso : MonoBehaviour
    {
        /// <summary>Karttasepän kermasarja pohjasta, peitto 0,80 (löydös 22); löydös 128:n valinta vaihdetaan Kermasarja.Oletukseen.</summary>
        // 25.9.: sarja pohjasta 2026-09-25-pohja-20260925 (build 14:n pohja; 23a-sarjan maski ei osunut uuteen rantaan).
        public const string OletusVersio = Kermasarja.Oletus;
        /// <summary>Käytössä oleva sarja (löydös 128: vaihdettava ajossa, komento "vari sarja").</summary>
        public static string Versio { get; private set; } = OletusVersio;
        public static string Kansio => "julisteet/pallo/kerma/" + Versio + "/";
        /// <summary>Sarjan poltettu peitto (napakalottien kerma seuraa sitä).</summary>
        public static float Peitto => Kermasarja.Peitto(Versio);

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaSarja() => Versio = OletusVersio;

        /// <summary>
        /// Vaihtaa kermasarjan (löydös 128, komento "vari sarja p060"): luettelo ja kerros haetaan uudesta kansiosta
        /// seuraavalla päivityksellä. null tai "oletus" = <see cref="OletusVersio"/>.
        /// </summary>
        public static void AsetaVersio(string nimi)
        {
            string v = Kermasarja.Nimi(nimi);
            if (v == Versio) return;
            Versio = v;
            foreach (var t in FindObjectsByType<Varitaso>(FindObjectsSortMode.None)) t.Uudelleen();
            Debug.Log($"MATKAKIRJA väritaso: sarja {v} (peitto {Peitto:0.00})");
        }
        /// <summary>Alin huntutaso: sitä kauempana ei huntua (web kermaPaalla 0 maailmanäkymässä).</summary>
        public const int AlinTaso = 5;
        /// <summary>
        /// Alin käytetty huntutaso. Kotimaan korostus (Linssisepän kierros 3 rivi 39 ja omistajan build 13 -lista 25.9.):
        /// webin kerma on päällä kaikilla zoomeilla, joten Euroopan näkymässäkin muut maat ovat pergamenttia ja reliefi
        /// näkyy vain kotimaassa → Z3 (ämpärissä Z3–Z8, _maailma kattaa alueen ulkopuolen). Ennen Z5 (Fable 24.9.).
        /// Komento "vari alin &lt;z&gt;" vertailuun.
        /// </summary>
        public static int AlinKaytetty = 3;
        /// <summary>Cesiumin raster-paikka (pohja 0, linssit 1 ja 2).</summary>
        public const string MateriaaliAvain = "2";

        public Cesium3DTileset pallo;
        /// <summary>
        /// Huntu kartalle (löydös 22, linja A klo 12.2x: webin kermasääntö muiden maiden maalle). false = komponentti
        /// vain seuraa nykyistä maata (Kohde/Maa ääriviivalle) eikä lisää raster-kerrosta.
        /// </summary>
        public bool huntu = true;

        /// <summary>Maa (ISO3), jonka väritaso on nyt kartalla, tai null.</summary>
        public string Maa { get; private set; }
        /// <summary>Pakotettu maa testaukseen (Komennot: vari &lt;ISO&gt;), null = pelaajan maa.</summary>
        public string Pakotettu { get; set; }
        /// <summary>
        /// Maa, jonka väritasoa nyt tavoitellaan (pakotettu tai pelaajan; matkalla edellinen), myös
        /// ennen kuin sarja on ladattu tai jos maalla ei ole sarjaa. Maaraja seuraa tätä: webissä
        /// korostuskehä ja väritaso lukevat saman maan (js/pallolauta/lauta.js korostusIso).
        /// </summary>
        public string Kohde => haluttu;

        CesiumUrlTemplateRasterOverlay kerros;
        string haluttu, ladattu;
        bool linssit, piilossa, pelikerroksetPois;
        int tasoMin = AlinKaytetty, tasoMax = 8;
        Coroutine haku;

        [System.Serializable] class Alue { public double lon0, lon1, lat0, lat1; }
        [System.Serializable] class Tieto { public Alue alue; }
        [System.Serializable] class Tasot { public int min, max; }
        [System.Serializable] class Luettelo { public Tieto varitaso; public Tasot tasot; }

        float seuraava;

        [Tooltip("Kameran korkeus (m), jonka yläpuolella huntu on pois (web: ei huntua maailmanäkymässä). Kaukana Cesium\n" +
                 "sekoittaa huntutasojen alimman tason ja sitä karkeammat (läpinäkyvät) laatat, jolloin huntu näkyi\n" +
                 "suorakulmioina (Laitetestaaja 24.9., Espanja–Sahara, f6de924). Paluu 85 %:ssa (hystereesi).")]
        public double kaukoKorkeus = 15_000_000.0;
        PalloKierto kierto;
        bool kaukana;

        void Update()
        {
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto != null)
            {
                bool k = kaukana ? kierto.korkeus > kaukoKorkeus * 0.85 : kierto.korkeus > kaukoKorkeus;
                if (k != kaukana) { kaukana = k; if (k) Poista(); else Luo(); }
                // Fablen päätös 24.9.: huntu häivytetään koko näkymän zoomin funktiona, ei laattakohtaisesti; zoom on
                // näkymän KAUKAISIMMAN maapisteen taso (ylälaita tai horisontti). Kotimaan korostus 25.9.: häivytys
                // alimman käytetyn tason alle (AlinKaytetty − 0,5 … + 0,5; Z3:lla 2,5…3,5, ennen 4,5…5,5).
                if (kerros != null)
                {
                    float z = NakymanAlinTaso();
                    float t = Mathf.Clamp01((z - (AlinKaytetty - 0.5f)) / 1.0f);
                    Alfa(t * t * (3f - 2f * t));
                }
            }
            string maa = Pakotettu;
            if (string.IsNullOrEmpty(maa))
            {
                // Web: väritason maa vaihtuu saapuessa, ei matkalla ohitettujen kaupunkien mukaan.
                var k = KarttaKerrokset.Instanssi;
                if (k != null && k.nappula != null && k.nappula.Liikkeessa) return;
                if (Time.unscaledTime < seuraava) return;
                seuraava = Time.unscaledTime + 0.5f;
                maa = PelaajanMaa(k) ?? haluttu;
            }
            if (maa == haluttu) return;
            haluttu = maa;
            if (haku != null) StopCoroutine(haku);
            haku = StartCoroutine(Vaihda(maa));
        }

        /// <summary>Nostokerroksen maa, tai sama sääntö suoraan: nappulan lähimmän kaupungin maa.</summary>
        static string PelaajanMaa(KarttaKerrokset k)
        {
            var nk = NostoKerros.Instanssi;
            if (nk != null && !string.IsNullOrEmpty(nk.NykyinenMaa)) return nk.NykyinenMaa;
            if (k == null || k.nappula == null || k.merkit == null || !k.nappula.Nakyy) return null;
            string id = k.merkit.LahinId(k.nappula.Lat, k.nappula.Lon, 0.3);
            return id != null ? k.merkit.KaupunginMaa(id) : null;
        }

        IEnumerator Vaihda(string maa)
        {
            if (string.IsNullOrEmpty(maa)) { Poista(); ladattu = null; Maa = null; yield break; }
            if (!huntu) { Poista(); ladattu = null; Maa = maa; yield break; }
            string url = Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + Kansio + maa + "/laatat.json");
            using (var r = UnityWebRequest.Get(url))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success)
                {
                    // Maa ilman sarjaa (esim. RUS, ISL tai Euroopan ulkopuolella): pelkkä pohja.
                    Poista();
                    ladattu = null;
                    Maa = null;
                    Debug.Log($"MATKAKIRJA väritaso: {maa} ei sarjaa ({r.responseCode})");
                    yield break;
                }
                Luettelo l = null;
                try { l = JsonUtility.FromJson<Luettelo>(r.downloadHandler.text); } catch { }
                var a = l?.varitaso?.alue;
                if (a == null) { Poista(); ladattu = null; Maa = null; yield break; }
                if (l.tasot != null && l.tasot.max > 0) { tasoMin = Math.Max(l.tasot.min, AlinKaytetty); tasoMax = l.tasot.max; }
                Laattapalvelin.VariAlue(Kansio + maa + "/", a.lon0, a.lat0, a.lon1, a.lat1, Kansio + "_maailma/", tasoMin);
            }
            ladattu = maa;
            Maa = maa;
            Luo();
            Debug.Log($"MATKAKIRJA väritaso: {maa} (z{tasoMin}–{tasoMax})");
        }

        void Luo()
        {
            Poista();
            if (ladattu == null || linssit || piilossa || pelikerroksetPois || kaukana || pallo == null) return;
            // Slippy-rivi 0 on pohjoisin, Cesiumin {y} eteläisin (kuten pohjassa). Taso 0 alkaen: kaukonäkymän laatat
            // ovat laattapalvelimen läpinäkyviä (ei 1024 laatan pyyntöä tasolla 5). Kierrätyksestä (KarttaKerrokset.UusiKerros).
            kerros = KarttaKerrokset.UusiKerros(pallo.gameObject, MateriaaliAvain,
                Laattapalvelin.Ampari + Kansio + ladattu + "/{z}/{x}/{reverseY}.webp",
                CesiumUrlTemplateRasterOverlayProjection.WebMercator, 0, tasoMax);
            Navat(true);
            PallonLepo.Valmistui("väritaso");
        }

        /// <summary>Napakalotit samaan kermaan kuin laatat (kalotti piirtyy laattojen päälle).</summary>
        static void Navat(bool kerma) => KarttaKerrokset.Instanssi?.napakannet?.Kerma(kerma);

        static readonly int AlfaId = Shader.PropertyToID("_overlayAlfa_" + MateriaaliAvain);
        float alfaNyt = -1f;

        /// <summary>Raster-paikan 2 alfa tileset-varjostimessa (Shaders/Cesium/MatkakirjaTileset, globaali).</summary>
        void Alfa(float a)
        {
            if (Mathf.Abs(a - alfaNyt) < 0.004f) return;
            alfaNyt = a;
            Shader.SetGlobalFloat(AlfaId, a);
        }

        /// <summary>
        /// Näkymän kaukaisimman maapisteen laattataso (Web Mercator): ruudun yläkulmien ja -keskikohdan säteet palloa
        /// vasten, osumaton säde = horisontti. Taso, jolla 256 px:n laatan pikseli ≈ näytön pikseli siellä.
        /// </summary>
        float NakymanAlinTaso()
        {
            var kam = kierto.GetComponent<Camera>();
            var g = kierto.georeferenssi;
            if (kam == null || g == null) return 20f;
            Vector3 keskus = g.transform.TransformPoint((Vector3)(float3)g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
            const double R = 6_371_000.0;
            // Kaksoistarkkuus: float-neliöt (~4e13) hukkaisivat matalan korkeuden horisontin.
            double3 oc = (double3)(float3)(kam.transform.position - keskus);
            double oc2 = math.dot(oc, oc);
            double horisontti = Math.Sqrt(Math.Max(0.0, oc2 - R * R));
            double kauimmas = 0;
            foreach (var vx in new[] { 0f, 0.5f, 1f })
            {
                var sade = kam.ViewportPointToRay(new Vector3(vx, 1f, 0f));
                double3 suunta = (double3)(float3)sade.direction;
                double b = math.dot(oc, suunta), c = oc2 - R * R, d = b * b - c;
                double osuma = d >= 0 ? -b - Math.Sqrt(d) : horisontti;
                if (osuma < 0) osuma = horisontti;
                kauimmas = Math.Max(kauimmas, osuma);
            }
            double mpp = 2.0 * kauimmas * Math.Tan(kam.fieldOfView * 0.5 * Math.PI / 180.0) / Math.Max(1, Screen.height);
            double lev = Math.Cos(kierto.leveys * Math.PI / 180.0);
            return (float)Math.Log(2.0 * Math.PI * R * Math.Max(0.2, lev) / (256.0 * Math.Max(1e-3, mpp)), 2.0);
        }

        void Poista()
        {
            Alfa(1f);
            alfaNyt = -1f;
            if (kerros == null) return;
            Navat(false);
            // Pois Cesiumista heti (OnDisable), jotta linssi saa paikan 2 samassa kehyksessä; komponentti kierrätykseen.
            KarttaKerrokset.VapautaKerros(kerros);
            kerros = null;
            PallonLepo.Valmistui("väritaso");
        }

        /// <summary>Luettelo ja kerros uudelleen seuraavassa Updatessa (esim. AlinKaytetty muuttui).</summary>
        public void Uudelleen() => haluttu = null;

        /// <summary>Linssin raster-kerros kartalla: väritaso väistyy (Cesiumissa kolme paikkaa).</summary>
        public void Linssit(bool paalla)
        {
            if (paalla == linssit) return;
            linssit = paalla;
            if (paalla) Poista(); else Luo();
        }

        /// <summary>
        /// Linssi piilottaa pelikerrokset (LinssiOhjain.Pelikerrokset, Linssiseppä 24.9., löydös 43): huntu pois koko
        /// linssin ajaksi, kuten webissä (js/pallolauta/lauta.js: "KERMA POIS MYÖS LINSSIN AJAKSI"; radiossa omistajan
        /// päätös: kaikki maat ilman huntua). Oma lippu, jotta pohjan näkyvyys ("laatat") ei palauta huntua kesken linssin.
        /// </summary>
        public void Pelikerrokset(bool nakyvissa)
        {
            if (nakyvissa != pelikerroksetPois) return;
            pelikerroksetPois = !nakyvissa;
            if (pelikerroksetPois) Poista(); else Luo();
        }

        /// <summary>Näkyvyys pohjan mukana (KarttaKerrokset.Nakyvyys "laatat" / "varitaso").</summary>
        public void Nakyvat(bool nakyy)
        {
            if (nakyy != piilossa) return;
            piilossa = !nakyy;
            if (piilossa) Poista(); else Luo();
        }
    }
}
