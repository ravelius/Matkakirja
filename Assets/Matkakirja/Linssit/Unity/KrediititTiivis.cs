// KREDIITIT (Googlen Map Tiles -policy; omistaja 6.10. 12.2x, Päätoimittaja tarkisti ehdot): Google Maps -logo vasemmassa alakulmassa
// 16 dp muuttamattomana, sen alla datalähteet yhdellä pienellä rivillä aina näkyvissä (napautus rivittää koko listan). Cesium ion -logo
// vain linssin latautuessa ja ☰ Tietoja ja lähteet -kohdasta.
//
// TOTEUTUS: Cesium for Unity rakentaa krediittipuun uudelleen aina krediittien muuttuessa (OnScreenCredits/PopupCredits.Clear), joten
// tämä kutsutaan joka kehys kaupunkinäkymän ajan: OnScreenCreditsin tekstit (datantuottajat, erottimet) siirretään logon alle omaan
// riviinsä. Logot (kuvaelementit) jäävät paikalleen muuttamattomina; sisältöä ei muuteta eikä poisteta. Pakettiin (com.cesium.unity)
// ei kosketa.
using System.Collections;
using System.Linq;
using System.Reflection;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class KrediititTiivis
    {
        /// <summary>Logojen korkeus (pt; Googlen policy vähintään 16 dp), tyhjä logon sivuilla ja yllä (10 dp) ja alla (5 dp).</summary>
        public const float LogoPt = 16f, TyhjaSivuPt = 10f, TyhjaAlaPt = 5f;

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

        static VisualElement lahteet;

        // OMISTAJA 6.10. 12.2x (Päätoimittaja tarkisti Googlen ehdot: logoa ei muuteta eikä tehdä läpinäkyväksi, kartan päällä
        // outlined-versio, korkeus vähintään 16 dp, datalähteet sellaisinaan ja aina näkyvissä): Google-logo vasempaan alakulmaan 16 dp,
        // sen alle datalähteet yhdellä pienimmällä luettavalla rivillä (kevein paino, vaalea, ei alleviivausta); napautus näyttää
        // koko listan rivitettynä, jos rivi katkeaa. Cesium ion -logo vilahtaa vasemmassa alakulmassa vain linssin latautuessa
        // (avaus: AvausLatautuu, Siirrytään: CesiumNakyviin) ja ☰ Tietoja ja lähteet -kohdasta (NaytaKaikki).
        static float kaikkiAsti = -1f, cesiumAsti = -1f;
        /// <summary>Cesium ion -logo näkyvissä (Siirrytään-ruutu asettaa).</summary>
        public static bool CesiumNakyviin;
        /// <summary>Linssin avauslataus käynnissä (sovitin asettaa): Cesium ion -logo näkyy.</summary>
        public static bool AvausLatautuu;
        public const float KaikkiS = 6f;
        /// <summary>Datalähderivin kirjainkoko (pt): pienin luettava.</summary>
        public const float RiviPt = 9f;

        /// <summary>☰ Tietoja ja lähteet: koko lista rivitettynä ja Cesium ion -logo hetkeksi.</summary>
        /// <summary>Koko lista auki (oppaan sirut eivät nouse sen yläpuolelle).</summary>
        public static bool KaikkiAuki => Time.unscaledTime < kaikkiAsti;

        public static void NaytaKaikki() { kaikkiAsti = Time.unscaledTime + KaikkiS; cesiumAsti = kaikkiAsti; }

        /// <summary>
        /// Cesium ion -logo tunnistetaan krediittilistasta (simu 6.10.: kuvasuhde ei erota, ion 138×28 ja Google 98×18): Cesium for Unity
        /// rakentaa OnScreenCreditsin kuvat CesiumCreditSystem.images[imageId]:stä, ja ion-krediitin linkissä on "cesium.com". Jäsenet
        /// ovat paketissa internal, joten heijastuksella; pakettiin ei kosketa.
        /// </summary>
        static Texture IonLogo(CesiumCreditSystem cs)
        {
            try
            {
                const BindingFlags L = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
                if (!(cs.GetType().GetProperty("onScreenCredits", L)?.GetValue(cs) is IList krediitit)) return null;
                if (!(cs.GetType().GetProperty("images", L)?.GetValue(cs) is IList kuvat)) return null;
                foreach (var k in krediitit)
                {
                    if (k == null || !(k.GetType().GetProperty("components", L)?.GetValue(k) is IList osat)) continue;
                    foreach (var o in osat)
                    {
                        if (o == null) continue;
                        var t = o.GetType();
                        var linkki = t.GetProperty("link", L)?.GetValue(o) as string;
                        if (linkki == null || !linkki.Contains("cesium.com")) continue;
                        if (t.GetProperty("imageId", L)?.GetValue(o) is int id && id >= 0 && id < kuvat.Count) return kuvat[id] as Texture;
                    }
                }
            }
            catch (System.Exception e) { if (!ionVirhe) { ionVirhe = true; Debug.LogWarning("MATKAKIRJA krediitit: ion-logon tunnistus: " + e.GetType().Name); } }
            return null;
        }
        static bool ionVirhe;
        /// <summary>Viimeksi tunnistettu Cesium ion -logo (Siirrytään-ruutu piirtää sen itse mustan ruudun päälle).</summary>
        public static Texture IonLogoKuva { get; private set; }

        /// <summary>Testi: logot ja niiden tunnistus.</summary>
        public static string Kuvaus()
        {
            var cs = CesiumCreditSystem.GetDefaultCreditSystem();
            var on = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement?.Q("OnScreenCredits") : null;
            if (on == null) return "krediitit: ei ruutukrediittejä";
            var ion = IonLogo(cs);
            var osat = on.Children().Select(c =>
            {
                var t = c.style.backgroundImage.value.texture;
                if (t != null) return $"kuva {t.width}×{t.height} ({(t == ion ? "Cesium ion" : "Google")}, {(c.resolvedStyle.display == DisplayStyle.None ? "piilossa" : "näkyy")}, {c.worldBound.width:0}×{c.worldBound.height:0})";
                return c is Label l ? $"\"{l.text}\"" : c.name;
            });
            return "krediitit: " + string.Join(" | ", osat) + (lahteet != null ? $" | lähteet {lahteet.childCount} kpl, {(Time.unscaledTime < kaikkiAsti ? "kaikki" : "rivi")}, {lahteet.worldBound.width:0}×{lahteet.worldBound.height:0}" : "");
        }

        /// <summary>Kerran kehyksessä kaupunkinäkymän ajan (paalla = näkymä auki).</summary>
        public static void Paivita(bool paalla)
        {
            var cs = CesiumCreditSystem.GetDefaultCreditSystem();
            var juuri = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement : null;
            var on = juuri?.Q("OnScreenCredits");
            if (on == null) return;
            if (!paalla)
            {
                if (osm != null && osm.parent != null) osm.RemoveFromHierarchy();
                return;
            }
            float pt = YksikkoaPerPt(juuri);
            on.style.flexDirection = FlexDirection.Column;
            on.style.alignItems = Align.FlexStart;
            on.style.paddingTop = TyhjaSivuPt * pt; on.style.paddingBottom = TyhjaAlaPt * pt; on.style.paddingLeft = TyhjaSivuPt * pt;
            if (lahteet == null)
            {
                lahteet = new VisualElement { name = "MatkakirjaDatalahteet", pickingMode = PickingMode.Position };
                lahteet.style.flexDirection = FlexDirection.Row;
                lahteet.style.alignItems = Align.Center;
                lahteet.style.overflow = Overflow.Hidden;
                lahteet.AddManipulator(new Clickable(() => kaikkiAsti = Time.unscaledTime < kaikkiAsti ? -1f : Time.unscaledTime + KaikkiS));
            }
            // Cesium rakentaa puun uudelleen krediittien muuttuessa: rivi takaisin logon alle ja uudet tekstit riviin.
            if (lahteet.parent != on) { lahteet.RemoveFromHierarchy(); on.Add(lahteet); }
            var ion = IonLogo(cs);
            if (ion != null) IonLogoKuva = ion;
            bool cesium = CesiumNakyviin || AvausLatautuu || Time.unscaledTime < cesiumAsti;
            foreach (var lapsi in on.Children().ToList())
            {
                if (lapsi == lahteet) continue;
                // Kuvalogot jäävät muuttamattomina: koko policyn rajoihin (kuvasuhde säilyy, terävä, ei kutistumista).
                var kuva = lapsi.style.backgroundImage.value.texture;
                if (!(lapsi is Label) && kuva != null && kuva.height > 0)
                {
                    bool nayta = kuva != ion || cesium;
                    lapsi.style.display = nayta ? DisplayStyle.Flex : DisplayStyle.None;
                    if (!nayta) continue;
                    float h = LogoPt * pt;
                    lapsi.style.height = h; lapsi.style.width = h * kuva.width / kuva.height;
                    lapsi.style.flexShrink = 0;
                    lapsi.style.unityBackgroundScaleMode = ScaleMode.ScaleToFit;
                    lapsi.style.marginBottom = 2 * pt;
                    if (kuva.filterMode != FilterMode.Bilinear) kuva.filterMode = FilterMode.Bilinear;
                    continue;
                }
                if (!(lapsi is Label l)) continue;
                if (l.text != null && l.text.Contains("Data Attribution")) { l.style.display = DisplayStyle.None; continue; }
                l.RemoveFromHierarchy();
                lahteet.Add(Riviin(l));
            }
            if (OsmNakyvissa) { osm ??= Riviin(new Label(OsmTeksti) { name = "MatkakirjaOsm" }); if (osm.parent != lahteet) { osm.RemoveFromHierarchy(); lahteet.Add(osm); } }
            else if (osm != null && osm.parent != null) osm.RemoveFromHierarchy();
            // Yksi rivi ruudun levyisenä (katkeaa reunaan); napautus rivittää koko listan.
            bool kaikki = Time.unscaledTime < kaikkiAsti;
            lahteet.style.flexWrap = kaikki ? Wrap.Wrap : Wrap.NoWrap;
            lahteet.style.maxWidth = juuri.worldBound.width - 2 * TyhjaSivuPt * pt;
            var ws = kaikki ? WhiteSpace.Normal : WhiteSpace.NoWrap;
            foreach (var t in lahteet.Query<Label>().ToList())
            {
                if (Mathf.Abs(t.resolvedStyle.fontSize - RiviPt * pt) > 0.5f) t.style.fontSize = RiviPt * pt;
                if (t.style.whiteSpace != ws) { t.style.whiteSpace = ws; t.style.flexShrink = kaikki ? 1 : 0; }
            }
        }

        /// <summary>Lähdeteksti riviin: kevein moderni, vaalea, ei alleviivausta; napautus riville (koko lista), ei Cesiumin linkkeihin.</summary>
        static Label Riviin(Label t)
        {
            t.pickingMode = PickingMode.Ignore;
            if (t.text != null && t.text.Contains("<u>")) t.text = t.text.Replace("<u>", "").Replace("</u>", "");
            t.style.flexShrink = 0;
            t.style.color = (Color)Tyylikirja.Harmaa.Muste;
            t.style.marginTop = 0; t.style.marginBottom = 0;
            return Kirjasimet.Aseta(t, Kirjasin.ModerniKevyt);
        }
    }
}
