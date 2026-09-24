using System.Collections;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// VÄRITASO (omistajan build 5 -löydös 2, web on oletus): webissä vain pelaajan nykyinen maa näkyy
    /// pohjan omin värein, ja muut maat ja meri haalistuvat kermaan (#faf4d6, peitto 0,85, maan reuna
    /// häivytetty). Karttaseppä polttaa saman hunnun Mercator-sarjaksi maittain
    /// (julisteet/pallo/vari/&lt;versio&gt;/&lt;ISO&gt;/{z}/{x}/{y}.webp, Z5–Z9, 256 px RGBA; alue ja tasot
    /// &lt;ISO&gt;/laatat.json). Maan sisällä laatta on lähes läpinäkyvä, joten 23a-pohja näkyy siinä.
    ///
    /// Yksi CesiumUrlTemplateRasterOverlay pohjan päällä (materialKey "2"), osoite vaihdetaan maan
    /// vaihtuessa (NostoKerros.NykyinenMaa tai nappulan lähimmän kaupungin maa; matkalla ei vaihdu). Alueen ulkopuoliset laatat
    /// laattapalvelin täyttää itse samalla kermalla ilman verkkoa (Laattapalvelin.VariAlue), koska
    /// sarjassa on vain alueen laatat. Maa ilman sarjaa → ei kerrosta (web: väritaso ei sammuta karttaa).
    ///
    /// Linssit käyttävät Cesiumin raster-paikkoja 1 ja 2 (KarttaKerrokset.LisaaRasteri): linssin
    /// kerroksen ajaksi väritaso väistyy (Linssit), ja tyhjän arkin linssit piilottavat sen pohjan mukana.
    /// </summary>
    public class Varitaso : MonoBehaviour
    {
        /// <summary>Karttasepän kierros k2: alueen ulkopuoli ja puuttuvat lähdelaatat täytenä kermana.</summary>
        public const string Versio = "2026-09-14b-tasoitus-k2";
        public const string Kansio = "julisteet/pallo/vari/" + Versio + "/";
        /// <summary>Cesiumin raster-paikka (pohja 0, linssit 1 ja 2).</summary>
        public const string MateriaaliAvain = "2";

        public Cesium3DTileset pallo;

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
        int tasoMin = 5, tasoMax = 9;
        Coroutine haku;

        [System.Serializable] class Alue { public double lon0, lon1, lat0, lat1; }
        [System.Serializable] class Tieto { public Alue alue; }
        [System.Serializable] class Tasot { public int min, max; }
        [System.Serializable] class Luettelo { public Tieto varitaso; public Tasot tasot; }

        float seuraava;

        void Update()
        {
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
                Laattapalvelin.VariAlue(Kansio + maa + "/", a.lon0, a.lat0, a.lon1, a.lat1);
            }
            ladattu = maa;
            Maa = maa;
            Luo();
            Debug.Log($"MATKAKIRJA väritaso: {maa} (z{tasoMin}–{tasoMax})");
        }

        void Luo()
        {
            Poista();
            if (ladattu == null || linssit || piilossa || pallo == null) return;
            kerros = pallo.gameObject.AddComponent<CesiumUrlTemplateRasterOverlay>();
            kerros.materialKey = MateriaaliAvain;
            // Slippy-rivi 0 on pohjoisin, Cesiumin {y} eteläisin (kuten pohjassa).
            kerros.templateUrl = Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + Kansio + ladattu + "/{z}/{x}/{reverseY}.webp");
            kerros.projection = CesiumUrlTemplateRasterOverlayProjection.WebMercator;
            kerros.minimumLevel = tasoMin;
            kerros.maximumLevel = tasoMax;
            kerros.tileWidth = 256;
            kerros.tileHeight = 256;
        }

        void Poista()
        {
            if (kerros == null) return;
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
