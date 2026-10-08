// KREDIITIT (Googlen Map Tiles -policy; omistaja 6.10. 12.2x, Päätoimittaja tarkisti ehdot): Google Maps -logo vasemmassa alakulmassa
// 16 dp muuttamattomana, sen alla datalähteet yhdellä pienellä rivillä aina näkyvissä (napautus rivittää koko listan). Cesium ion -logo
// vain linssin latautuessa ja ☰ Tietoja ja lähteet -kohdasta.
//
// TOTEUTUS: Cesium for Unity rakentaa krediittipuun uudelleen aina krediittien muuttuessa (OnScreenCredits/PopupCredits.Clear), joten
// tämä kutsutaan joka kehys kaupunkinäkymän ajan: OnScreenCreditsin tekstit (datantuottajat, erottimet) siirretään logon alle omaan
// riviinsä. Logot (kuvaelementit) jäävät paikalleen muuttamattomina; sisältöä ei muuteta eikä poisteta. Pakettiin (com.cesium.unity)
// ei kosketa.
using System.Collections;
using System.Collections.Generic;
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

        static VisualElement lahteet, lista;
        static Label tiivis;
        // OMAT 3D-MALLIT (LS1 7.10. 00.4x, Gizan pyramidit Googlen tiilien päällä): oma tekijärivi Matkakirja.Linssit.CesiumOmatMallit
        // .Tekijat erillään Googlen riveistä (Googlen ehdot: ei Google-logon eikä Googlen rivien päällä eikä niiden joukossa), omana
        // rivinään lähderivin alla samalla rivipohjalla (Riviin). Piilossa, kun omia malleja ei ole ruudulla (Tekijat null).
        static Label omaTekija;
        static int tiivisAvain = -1;

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
        /// <summary>Opas piirtää ion-logon avauslatauksessa itse valikkonsa päälle; Cesiumin oma silloin piiloon.</summary>
        public static bool IonOmaPiirto;
        public const float KaikkiS = 6f;
        /// <summary>Datalähderivin kirjainkoko (pt; omistaja 6.10. 12.4x "pienemmällä fontilla": 9 → 7).</summary>
        public const float RiviPt = 7f;
        /// <summary>Lähderivin näkyvä leveys osuutena ruudun leveydestä (omistaja 6.10. 13.2x).</summary>
        public const float RiviOsuus = 0.40f;

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
        static Texture2D googleLogo;
        static bool googleHaettu;
        /// <summary>Googlen virallinen Google Maps -logo, ääriviivallinen versio kartan päälle (null = ei pakettia).</summary>
        static Texture2D GoogleLogo
        {
            get
            {
                if (!googleHaettu) { googleHaettu = true; googleLogo = Resources.Load<Texture2D>("Krediitit/GoogleMaps_Logo_WithDarkOutline_4x"); }
                return googleLogo;
            }
        }
        /// <summary>Viimeksi tunnistettu Cesium ion -logo (Siirrytään-ruutu piirtää sen itse mustan ruudun päälle).</summary>
        public static Texture IonLogoKuva { get; private set; }
        /// <summary>Googlen logon yläreuna osuutena ruudun korkeudesta alhaalta (oppaan oma ion-logo sen yläpuolelle); 0 = ei tiedossa.</summary>
        public static float GoogleYlaOsuus { get; private set; }

        /// <summary>Testi: logot ja niiden tunnistus.</summary>
        /// <summary>
        /// Testi (Päätoimittaja 6.10. 20.2x): oma lähderivi vastaa Cesiumin krediittipuuta täsmälleen (kaikki tarjoajat samassa
        /// järjestyksessä; OSM lisäksi, kun se on päällä) ja Google-logo on näkyvissä, kun Cesiumilla on Google-kuva.
        /// </summary>
        public static string Vertaa()
        {
            var cs = CesiumCreditSystem.GetDefaultCreditSystem();
            var on = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement?.Q("OnScreenCredits") : null;
            if (on == null || lista == null) return "vertailu: ei krediittejä";
            var ion = IonLogo(cs);
            var odotettu = new List<string>(); bool google = false;
            foreach (var c in on.Children())
            {
                var t = c.style.backgroundImage.value.texture;
                if (!(c is Label) && t != null && t.height > 0) { if (t != ion) google = true; continue; }
                if (c is Label l && !string.IsNullOrWhiteSpace(l.text) && !l.text.Contains("Data Attribution")) odotettu.Add(l.text.Replace("<u>", "").Replace("</u>", ""));
            }
            if (OsmNakyvissa) odotettu.Add(OsmTeksti);
            var omat = lista.Children().OfType<Label>().Select(x => x.text).ToList();
            bool sama = omat.SequenceEqual(odotettu) && tiivis.text == string.Join(" ", odotettu);
            bool logo = !google || googleEl.resolvedStyle.display != DisplayStyle.None;
            return $"vertailu: {(sama && logo ? "OK" : "ERO")} – Cesium {odotettu.Count} tekstiä, omat {omat.Count}, Google-kuva {(google ? "on" : "ei")}, oma logo {(googleEl.resolvedStyle.display != DisplayStyle.None ? "näkyy" : "piilossa")}"
                   + (sama ? "" : $" | ero: [{string.Join(" ¦ ", odotettu.Except(omat))}] vs [{string.Join(" ¦ ", omat.Except(odotettu))}]");
        }

        public static string Kuvaus()
        {
            if (oma == null) return "krediitit: ei vielä rakennettu";
            string L(VisualElement e, string n) => e.resolvedStyle.display == DisplayStyle.None ? n + " piilossa" : $"{n} näkyy {e.worldBound.width:0}×{e.worldBound.height:0}";
            return $"krediitit (omat): {L(googleEl, "Google")} | {L(ionEl, "Cesium ion")} | lähteet {lista?.childCount} kpl, {(Time.unscaledTime < kaikkiAsti ? "kaikki" : "rivi")}, {lahteet.worldBound.width:0}×{lahteet.worldBound.height:0}"
                   + (omaTekija != null && omaTekija.resolvedStyle.display != DisplayStyle.None ? $" | omat mallit \"{omaTekija.text}\" {omaTekija.worldBound.xMin:0},{omaTekija.worldBound.yMin:0} {omaTekija.worldBound.width:0}×{omaTekija.worldBound.height:0}" : " | omat mallit ei");
        }

        /// <summary>Kerran kehyksessä kaupunkinäkymän ajan (paalla = näkymä auki).</summary>
        // OMAT KOPIOT (omistaja 6.10. 19.4x: "räpsyy matkaoppaan päällä … Google Maps -teksti … ja sen alla oleva pitkä tekstirivi"):
        // Cesium rakentaa OnScreenCreditsin uudelleen krediittien muuttuessa, ja uudet elementit piirtyivät yhden ruudun omassa
        // koossaan ennen tätä käsittelyä. Nyt Cesiumin puu on aina piilossa, ja logo, ion-logo ja lähderivi ovat omia elementtejä,
        // jotka päivitetään vain, kun sisältö oikeasti muuttuu (avain); leveys on kiinteä ja rivi leikataan.
        static VisualElement oma, googleEl, ionEl;
        static string sisaltoAvain;
        static readonly List<string> tekstit = new List<string>();

        /// <summary>Kerran kehyksessä kaupunkinäkymän ajan (paalla = näkymä auki).</summary>
        public static void Paivita(bool paalla)
        {
            var cs = CesiumCreditSystem.GetDefaultCreditSystem();
            var juuri = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement : null;
            var on = juuri?.Q("OnScreenCredits");
            if (on == null) return;
            // Cesiumin oma ruutukrediittipuu ei piirry koskaan (ei edes uudelleenrakennuksen ruudulla).
            if (on.style.display != DisplayStyle.None) on.style.display = DisplayStyle.None;
            if (oma == null)
            {
                oma = new VisualElement { name = "MatkakirjaKrediitit", pickingMode = PickingMode.Ignore };
                oma.style.position = Position.Absolute;
                oma.style.flexDirection = FlexDirection.Column;
                oma.style.alignItems = Align.FlexStart;
                ionEl = new VisualElement { name = "MatkakirjaIon", pickingMode = PickingMode.Ignore };
                googleEl = new VisualElement { name = "MatkakirjaGoogle", pickingMode = PickingMode.Ignore };
                foreach (var e in new[] { ionEl, googleEl }) { e.style.unityBackgroundScaleMode = ScaleMode.ScaleToFit; e.style.flexShrink = 0; oma.Add(e); }
                lahteet = new VisualElement { name = "MatkakirjaDatalahteet", pickingMode = PickingMode.Position };
                tiivis = Riviin(new Label { name = "MatkakirjaLahdeRivi" });
                tiivis.style.whiteSpace = WhiteSpace.NoWrap;
                tiivis.style.overflow = Overflow.Hidden;
                tiivis.style.textOverflow = TextOverflow.Ellipsis;
                lahteet.Add(tiivis);
                lista = new VisualElement { name = "MatkakirjaLahdeLista", pickingMode = PickingMode.Ignore };
                lista.style.flexDirection = FlexDirection.Row;
                lista.style.flexWrap = Wrap.Wrap;
                // Koko lista luettavaksi kartan päällä: tumma himmennyspohja (tyylikirjan Himmennys.Tumma).
                lista.style.backgroundColor = (Color)Tyylikirja.Himmennys.Tumma;
                lista.style.paddingLeft = lista.style.paddingRight = lista.style.paddingTop = lista.style.paddingBottom = 4;
                lista.style.borderTopLeftRadius = lista.style.borderTopRightRadius = lista.style.borderBottomLeftRadius = lista.style.borderBottomRightRadius = 4;
                lista.style.alignItems = Align.Center;
                lahteet.Add(lista);
                lahteet.AddManipulator(new Clickable(() => kaikkiAsti = Time.unscaledTime < kaikkiAsti ? -1f : Time.unscaledTime + KaikkiS));
                oma.Add(lahteet);
                omaTekija = Riviin(new Label { name = "MatkakirjaOmatMallit" });
                omaTekija.style.whiteSpace = WhiteSpace.NoWrap;
                omaTekija.style.display = DisplayStyle.None;
                oma.Add(omaTekija);
            }
            if (oma.parent != juuri) { oma.RemoveFromHierarchy(); juuri.Add(oma); }
            var nd = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            if (oma.style.display != nd) oma.style.display = nd;
            if (!paalla) return;
            float pt = YksikkoaPerPt(juuri);
            oma.style.left = TyhjaSivuPt * pt; oma.style.bottom = TyhjaAlaPt * pt;

            // Sisältö Cesiumin piilotetusta puusta: kuvat (Google / ion) ja tekstit; päivitys vain avaimen muuttuessa.
            var ion = IonLogo(cs);
            if (ion != null) IonLogoKuva = ion;
            Texture google = null;
            tekstit.Clear();
            foreach (var c in on.Children())
            {
                var t = c.style.backgroundImage.value.texture;
                if (!(c is Label) && t != null && t.height > 0) { if (t != ion) google = t; continue; }
                if (c is Label l && !string.IsNullOrWhiteSpace(l.text) && !l.text.Contains("Data Attribution"))
                    tekstit.Add(l.text.Replace("<u>", "").Replace("</u>", ""));
            }
            if (OsmNakyvissa) tekstit.Add(OsmTeksti);
            string avain = (google != null ? "G" : "-") + string.Join("\n", tekstit);
            if (avain != sisaltoAvain)
            {
                sisaltoAvain = avain;
                lista.Clear();
                foreach (var t in tekstit) lista.Add(Riviin(new Label(t)));
                tiivis.text = string.Join(" ", tekstit);
            }
            // Logot: Googlen virallinen ääriviivallinen logo (Resources/Krediitit/LAHTEET.md) tai Cesiumin oma; 16 dp, kuvasuhde.
            var gk = google != null ? (Texture)GoogleLogo ?? google : null;
            AsetaLogo(googleEl, gk, pt);
            bool cesium = CesiumNakyviin || (AvausLatautuu && !IonOmaPiirto) || Time.unscaledTime < cesiumAsti;
            AsetaLogo(ionEl, cesium ? ion : null, pt);
            if (googleEl.worldBound.height > 0 && juuri.worldBound.height > 0)
                GoogleYlaOsuus = 1f - googleEl.worldBound.yMin / juuri.worldBound.height;

            // Yksi rivi kiinteällä leveydellä (~40 % ruudusta), leikataan "…":llä; napautus näyttää listan rivitettynä.
            bool kaikki = Time.unscaledTime < kaikkiAsti;
            float lev = juuri.worldBound.width - 2 * TyhjaSivuPt * pt;
            float rivi = Mathf.Min(lev, juuri.worldBound.width * RiviOsuus);
            if (Mathf.Abs(tiivis.resolvedStyle.width - rivi) > 0.5f) tiivis.style.width = rivi;
            if (Mathf.Abs(lista.resolvedStyle.width - lev) > 0.5f) lista.style.width = lev;
            var td = kaikki ? DisplayStyle.None : DisplayStyle.Flex;
            if (tiivis.style.display != td) { tiivis.style.display = td; lista.style.display = kaikki ? DisplayStyle.Flex : DisplayStyle.None; }
            foreach (var t in lahteet.Query<Label>().ToList())
                if (Mathf.Abs(t.resolvedStyle.fontSize - RiviPt * pt) > 0.5f) t.style.fontSize = RiviPt * pt;

            // Oma tekijärivi Googlen rivien alle, erilleen niistä (väli 2 dp kuten logon alla).
            string omat = Matkakirja.Linssit.CesiumOmatMallit.Tekijat;
            // Oma vesipinta (LS2 8.10., ODbL vaatii näkyvän nimeämisen): veden tekijärivi samalle omalle riville, Googlen rivien ulkopuolelle.
            string vesi = KaupunkiVesi.KrediittiNyt;
            if (!string.IsNullOrEmpty(vesi)) omat = string.IsNullOrEmpty(omat) ? vesi : omat + " · " + vesi;
            var od = string.IsNullOrEmpty(omat) ? DisplayStyle.None : DisplayStyle.Flex;
            if (omaTekija.style.display != od) omaTekija.style.display = od;
            if (od == DisplayStyle.Flex)
            {
                if (omaTekija.text != omat) omaTekija.text = omat;
                if (Mathf.Abs(omaTekija.resolvedStyle.fontSize - RiviPt * pt) > 0.5f) omaTekija.style.fontSize = RiviPt * pt;
                omaTekija.style.marginTop = 2 * pt;
            }
        }

        static void AsetaLogo(VisualElement e, Texture t, float pt)
        {
            if (t == null || t.height <= 0) { if (e.style.display != DisplayStyle.None) e.style.display = DisplayStyle.None; return; }
            if (e.style.display != DisplayStyle.Flex) e.style.display = DisplayStyle.Flex;
            if (e.style.backgroundImage.value.texture != t) e.style.backgroundImage = new StyleBackground(t as Texture2D);
            float h = LogoPt * pt;
            e.style.height = h; e.style.width = h * t.width / t.height;
            e.style.marginBottom = 2 * pt;
            if (t.filterMode != FilterMode.Bilinear) t.filterMode = FilterMode.Bilinear;
        }

        /// <summary>Lähdeteksti riviin: kevein moderni, vaalea, ei alleviivausta; napautus riville (koko lista), ei Cesiumin linkkeihin.</summary>
        static Label Riviin(Label t)
        {
            t.pickingMode = PickingMode.Ignore;
            t.style.whiteSpace = WhiteSpace.Normal;
            if (t.text != null && t.text.Contains("<u>")) t.text = t.text.Replace("<u>", "").Replace("</u>", "");
            t.style.flexShrink = 0;
            t.style.color = (Color)Tyylikirja.Harmaa.Muste;
            t.style.marginTop = 0; t.style.marginBottom = 0;
            return Kirjasimet.Aseta(t, Kirjasin.ModerniKevyt);
        }
    }
}
