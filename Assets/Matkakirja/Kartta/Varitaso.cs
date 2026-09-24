using System.Collections;
using CesiumForUnity;
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
    /// </summary>
    public class Varitaso : MonoBehaviour
    {
        /// <summary>Karttasepän kermasarja 23a-pohjasta, peitto 0,80 (löydös 22).</summary>
        public const string Versio = "2026-09-23a-p080";
        public const string Kansio = "julisteet/pallo/kerma/" + Versio + "/";
        /// <summary>Alin huntutaso: sitä kauempana ei huntua (web kermaPaalla 0 maailmanäkymässä).</summary>
        public const int AlinTaso = 5;
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
        bool linssit, piilossa;
        int tasoMin = AlinTaso, tasoMax = 8;
        Coroutine haku;

        [System.Serializable] class Alue { public double lon0, lon1, lat0, lat1; }
        [System.Serializable] class Tieto { public Alue alue; }
        [System.Serializable] class Tasot { public int min, max; }
        [System.Serializable] class Luettelo { public Tieto varitaso; public Tasot tasot; }

        float seuraava;

        [Tooltip("Kameran korkeus (m), jonka yläpuolella huntu on pois (web: ei huntua maailmanäkymässä). Kaukana Cesium\n" +
                 "sekoittaa huntutasojen alimman tason ja sitä karkeammat (läpinäkyvät) laatat, jolloin huntu näkyi\n" +
                 "suorakulmioina (Laitetestaaja 24.9., Espanja–Sahara, f6de924). Paluu 85 %:ssa (hystereesi).")]
        public double kaukoKorkeus = 6_000_000.0;
        PalloKierto kierto;
        bool kaukana;

        void Update()
        {
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto != null)
            {
                bool k = kaukana ? kierto.korkeus > kaukoKorkeus * 0.85 : kierto.korkeus > kaukoKorkeus;
                if (k != kaukana) { kaukana = k; if (k) Poista(); else Luo(); }
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
                if (l.tasot != null && l.tasot.max > 0) { tasoMin = l.tasot.min; tasoMax = l.tasot.max; }
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
            if (ladattu == null || linssit || piilossa || kaukana || pallo == null) return;
            kerros = pallo.gameObject.AddComponent<CesiumUrlTemplateRasterOverlay>();
            kerros.materialKey = MateriaaliAvain;
            // Slippy-rivi 0 on pohjoisin, Cesiumin {y} eteläisin (kuten pohjassa).
            kerros.templateUrl = Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + Kansio + ladattu + "/{z}/{x}/{reverseY}.webp");
            kerros.projection = CesiumUrlTemplateRasterOverlayProjection.WebMercator;
            // Taso 0 alkaen: kaukonäkymän laatat ovat laattapalvelimen läpinäkyviä (ei 1024 laatan pyyntöä tasolla 5).
            kerros.minimumLevel = 0;
            kerros.maximumLevel = tasoMax;
            kerros.tileWidth = 256;
            kerros.tileHeight = 256;
            Navat(true);
        }

        /// <summary>Napakalotit samaan kermaan kuin laatat (kalotti piirtyy laattojen päälle).</summary>
        static void Navat(bool kerma) => KarttaKerrokset.Instanssi?.napakannet?.Kerma(kerma);

        void Poista()
        {
            if (kerros == null) return;
            Navat(false);
            // Pois Cesiumista heti (OnDisable), jotta linssi saa paikan 2 samassa kehyksessä.
            kerros.enabled = false;
            Destroy(kerros);
            kerros = null;
        }

        /// <summary>Linssin raster-kerros kartalla: väritaso väistyy (Cesiumissa kolme paikkaa).</summary>
        public void Linssit(bool paalla)
        {
            if (paalla == linssit) return;
            linssit = paalla;
            if (paalla) Poista(); else Luo();
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
