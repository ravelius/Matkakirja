// KREDIITIT KAPEALLA RUUDULLA (Päätoimittaja 5.10. 19.5x, Googlen Map Tiles -policy): "If it's infeasible to display data attributions
// in full due to viewport size constraints, consider adding a hover-over or clickable UI element labeled 'Data sources', which opens within
// the map window." Pakollista: Google Maps -logo aina näkyvissä (ja Cesium ionin logo). Kapealla ruudulla (iPhone) alareunaan jää yksi
// rivi: kuvalogot + "Data sources", joka avaa koko luettelon kartan päälle (Cesiumin oma PopupCredits-paneeli). Leveällä ruudulla
// (iPad) Cesiumin oma asettelu ennallaan.
//
// TOTEUTUS: Cesium for Unity rakentaa krediittipuun uudelleen aina krediittien muuttuessa (OnScreenCredits/PopupCredits.Clear), joten
// tämä kutsutaan joka kehys kaupunkinäkymän ajan: OnScreenCreditsin tekstit (datantuottajat, erottimet, ion-teksti) siirretään
// PopupCreditsin alkuun ja tilalle lisätään "Data sources" -nappi. Logot (kuvaelementit) jäävät paikalleen muuttamattomina; sisältöä ei
// muuteta eikä poisteta, vain siirretään napin taakse. Pakettiin (com.cesium.unity) ei kosketa.
using System.Linq;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class KrediititTiivis
    {
        /// <summary>Ruudun leveys tuumina, jonka alle krediitit tiivistetään (iPhone vaaka ~5,7", iPad 10"+).</summary>
        public const float KapeaTuumaa = 7.5f;
        public const string NapinTeksti = "Data sources";
        /// <summary>Logojen korkeus (pt; Googlen policy 16–19 dp, simu 5.10.: ~23 pt liian suuri), tyhjä logon sivuilla ja yllä (10 dp)
        /// ja alla (5 dp), sekä "Data sources" -napin kirjainkoko (pt) — Päätoimittaja 5.10. 20.5x.</summary>
        public const float LogoPt = 16f, TyhjaSivuPt = 10f, TyhjaAlaPt = 5f, NappiPt = 11.5f, PopupPt = 11f;

        /// <summary>Paneelin yksikköä per iOS-piste: ruudun pikselit / paneelin korkeus ja pikseliä per piste dpi:stä (iPhone 3, iPad 2).</summary>
        static float YksikkoaPerPt(VisualElement juuri)
        {
            float ph = juuri.worldBound.height;
            if (ph <= 0 || Screen.height <= 0) return 1f;
            float pxPerYks = Screen.height / ph;
            float pxPerPt = Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 160f)) : 2f;
            return pxPerPt / pxPerYks;
        }

        /// <summary>
        /// OSM-PERÄINEN DATA NÄKYVISSÄ (omistaja 5.10. 22.3x "lisää Nominatim", juna 146): oppaan korostusviivan reittipisteet
        /// tulevat Pöllön workerista Nominatimista (OpenStreetMap). ODbL vaatii tekijätiedon: "© OpenStreetMap contributors"
        /// lisätään Cesiumin krediittien joukkoon (kapealla ruudulla Data sources -listaan, leveällä ruutukrediittien perään).
        /// </summary>
        public static bool OsmNakyvissa;
        public const string OsmTeksti = "© OpenStreetMap contributors";
        static Label osm;

        static Label nappi;
        static VisualElement lahteet;

        // OMISTAJA 6.10. 12.1x (Päätoimittaja tarkisti ehdot): Google Maps -logo aina vasemmassa alakulmassa 16 dp, terävänä ja
        // ehjänä, 10 dp vapaata; datalähderivi logon viereen pienellä noin 3 s pysähdykseen saavuttaessa, sitten pieneksi
        // "Data sources" -napiksi (napautus näyttää rivin). Cesium ion -logo pois päänäkymästä: näkyy vain Siirrytään- ja
        // avausruudulla sekä ☰ Tietoja ja lähteet -rivistä (CesiumNakyviin / NaytaKaikki).
        static float riviAsti = -1f, cesiumAsti = -1f;
        /// <summary>Cesium ion -logo näkyvissä (Siirrytään- ja avausruutu asettavat).</summary>
        public static bool CesiumNakyviin;
        public const float RiviS = 3f, KaikkiS = 6f;

        /// <summary>Datalähderivi logon viereen sekunneiksi (pysähdykseen saavuttaessa; napin napautus).</summary>
        public static void NaytaRivi(float s = RiviS) { riviAsti = Mathf.Max(riviAsti, Time.unscaledTime + s); }

        /// <summary>☰ Tietoja ja lähteet: rivi ja Cesium ion -logo näkyviin hetkeksi.</summary>
        public static void NaytaKaikki() { NaytaRivi(KaikkiS); cesiumAsti = Time.unscaledTime + KaikkiS; }

        /// <summary>
        /// Cesium ion -logo tunnistetaan kuvasuhteesta: Google Maps -logo on leveä (noin 5,5:1), ion-logo kapeampi. Testi `ui krediitit`
        /// listaa logot kokoineen tunnistuksen todentamiseksi.
        /// </summary>
        public const float CesiumSuhdeMax = 4.5f;
        static bool OnCesium(Texture t) => t != null && t.height > 0 && (float)t.width / t.height < CesiumSuhdeMax;

        /// <summary>Testi: logot ja niiden tunnistus.</summary>
        public static string Kuvaus()
        {
            var cs = CesiumCreditSystem.GetDefaultCreditSystem();
            var on = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement?.Q("OnScreenCredits") : null;
            if (on == null) return "krediitit: ei ruutukrediittejä";
            var osat = on.Children().Select(c =>
            {
                var t = c.style.backgroundImage.value.texture;
                if (t != null) return $"kuva {t.width}×{t.height} ({(OnCesium(t) ? "Cesium" : "Google")}, {(c.resolvedStyle.display == DisplayStyle.None ? "piilossa" : "näkyy")}, {c.worldBound.width:0}×{c.worldBound.height:0})";
                return c is Label l ? $"\"{l.text}\"" : c.name;
            });
            return "krediitit: " + string.Join(" | ", osat) + $", rivi {(Time.unscaledTime < riviAsti ? "auki" : "kiinni")}";
        }

        /// <summary>Kapea ruutu (iPhone): leveys tuumina dpi:stä; ilman dpi:tä pikseleistä.</summary>
        public static bool Kapea => Screen.dpi > 0 ? Screen.width / Screen.dpi < KapeaTuumaa : Screen.width < 1400;

        /// <summary>Kerran kehyksessä kaupunkinäkymän ajan (paalla = näkymä auki).</summary>
        public static void Paivita(bool paalla)
        {
            var cs = CesiumCreditSystem.GetDefaultCreditSystem();
            var juuri = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement : null;
            var on = juuri?.Q("OnScreenCredits");
            var pop = juuri?.Q("PopupCredits");
            if (on == null || pop == null) return;
            // OSM-tekijätieto: luodaan kerran, sijoitetaan joka kehys (Cesium rakentaa puun uudelleen krediittien muuttuessa).
            if (paalla && OsmNakyvissa)
            {
                osm ??= new Label(OsmTeksti) { name = "MatkakirjaOsm", pickingMode = PickingMode.Ignore };
                var kohde = Kapea ? (lahteet != null && lahteet.parent == pop ? lahteet : pop) : on;
                if (osm.parent != kohde) { osm.RemoveFromHierarchy(); kohde.Add(osm); }
            }
            else if (osm != null && osm.parent != null) osm.RemoveFromHierarchy();
            if (!paalla || !Kapea)
            {
                if (nappi != null && nappi.parent != null) nappi.RemoveFromHierarchy();
                return;
            }
            float pt = YksikkoaPerPt(juuri);
            on.style.paddingTop = TyhjaSivuPt * pt; on.style.paddingBottom = TyhjaAlaPt * pt; on.style.paddingLeft = TyhjaSivuPt * pt;
            foreach (var lapsi in on.Children().ToList())
            {
                // Kuvalogot jäävät paikalleen; vain koko policyn rajoihin (kuvasuhde säilyy) ja tyhjä sivuille.
                var kuva = lapsi.style.backgroundImage.value.texture;
                if (!(lapsi is Label) && kuva != null && kuva.height > 0)
                {
                    if (OnCesium(kuva))
                    {
                        bool nayta = CesiumNakyviin || Time.unscaledTime < cesiumAsti;
                        lapsi.style.display = nayta ? DisplayStyle.Flex : DisplayStyle.None;
                        if (!nayta) continue;
                    }
                    // Terävä ja ehjä (omistaja: "leikkautuu oikeasta reunasta ja näyttää hieman epäterävälle"): koko suhteessa
                    // kuvaan, ei kutistumista rivissä, kuvasuhde säilyy (scale-to-fit), suodatus kuvan omasta tarkkuudesta.
                    float h = LogoPt * pt;
                    lapsi.style.height = h; lapsi.style.width = h * kuva.width / kuva.height;
                    lapsi.style.flexShrink = 0;
                    lapsi.style.unityBackgroundScaleMode = ScaleMode.ScaleToFit;
                    lapsi.style.marginRight = TyhjaSivuPt * pt;
                    if (kuva.filterMode != FilterMode.Bilinear) kuva.filterMode = FilterMode.Bilinear;
                    continue;
                }
                if (lapsi == nappi || lapsi == osm || !(lapsi is Label l)) continue;
                if (l.text != null && l.text.Contains("Data Attribution")) { l.style.display = DisplayStyle.None; continue; }
                if (lahteet == null || lahteet.parent != pop)
                {
                    lahteet = new VisualElement { name = "MatkakirjaDatalahteet", pickingMode = PickingMode.Ignore };
                    lahteet.style.flexDirection = FlexDirection.Row;
                    lahteet.style.flexWrap = Wrap.Wrap;
                    lahteet.style.alignItems = Align.Center;
                    lahteet.style.marginBottom = 6;
                    pop.Insert(0, lahteet);
                }
                l.RemoveFromHierarchy();
                lahteet.Add(l);
            }
            if (nappi == null)
            {
                nappi = new Label("<u>" + NapinTeksti + "</u>") { name = "MatkakirjaDatalahteetNappi" };
                nappi.style.marginLeft = 8;
                nappi.pickingMode = PickingMode.Position;
                nappi.AddManipulator(new Clickable(() => NaytaRivi(KaikkiS)));
            }
            nappi.style.fontSize = NappiPt * pt;
            // Rivi auki: lähteet logon viereen pienellä (nappi piiloon); muuten lähteet ponnahduspaneeliin ja nappi näkyviin.
            bool rivi = Time.unscaledTime < riviAsti;
            if (lahteet != null)
            {
                var minne = rivi ? on : pop;
                if (lahteet.parent != minne) { lahteet.RemoveFromHierarchy(); if (rivi) minne.Add(lahteet); else minne.Insert(0, lahteet); }
                lahteet.style.marginBottom = rivi ? 0 : 6;
                foreach (var t in lahteet.Query<Label>().ToList()) t.style.fontSize = PopupPt * pt;
            }
            if (rivi) { if (nappi.parent != null) nappi.RemoveFromHierarchy(); }
            else if (nappi.parent != on) on.Add(nappi);
            // POPUPIN KIRJASINKOKO (LS1 junan 146 video 6.10.: Data sources -paneelin tekijätiedot hyvin suurella kirjasimella, peitti
            // puolet ruudusta): Cesiumin paneeli on eri mittakaavassa kuin pelin UI, joten paneelin tekstit samaan pt-kokoon kuin nappi.
            if (pop.resolvedStyle.display == DisplayStyle.Flex)
                foreach (var t in pop.Query<Label>().ToList())
                    if (Mathf.Abs(t.resolvedStyle.fontSize - PopupPt * pt) > 0.5f) t.style.fontSize = PopupPt * pt;
        }
    }
}
