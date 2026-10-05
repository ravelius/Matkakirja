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
        public const float LogoPt = 18f, TyhjaSivuPt = 10f, TyhjaAlaPt = 5f, NappiPt = 11.5f;

        /// <summary>Paneelin yksikköä per iOS-piste: ruudun pikselit / paneelin korkeus ja pikseliä per piste dpi:stä (iPhone 3, iPad 2).</summary>
        static float YksikkoaPerPt(VisualElement juuri)
        {
            float ph = juuri.worldBound.height;
            if (ph <= 0 || Screen.height <= 0) return 1f;
            float pxPerYks = Screen.height / ph;
            float pxPerPt = Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 160f)) : 2f;
            return pxPerPt / pxPerYks;
        }

        static Label nappi;
        static VisualElement lahteet;

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
                    float h = LogoPt * pt;
                    lapsi.style.height = h; lapsi.style.width = h * kuva.width / kuva.height;
                    lapsi.style.marginRight = TyhjaSivuPt * pt;
                    continue;
                }
                if (lapsi == nappi || !(lapsi is Label l)) continue;
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
                nappi.AddManipulator(new Clickable(() =>
                {
                    var p = nappi.panel?.visualTree.Q("PopupCredits");
                    if (p != null) p.style.display = p.style.display == DisplayStyle.Flex ? DisplayStyle.None : DisplayStyle.Flex;
                }));
            }
            nappi.style.fontSize = NappiPt * pt;
            if (nappi.parent != on) on.Add(nappi);
        }
    }
}
