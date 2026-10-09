// OLAVINLINNAN ALUN VALINTA (Päätoimittaja 9.10.2026, juna 171; Siirtosepän hyväksytty suunnitelma): Pelit › Olavinlinna → nimiruudun
// jälkeen kaksi korttia KORTTI-pohjan tummalla variantilla (videopeli, Raamattu #4243): "Pelaa: kesäyö 1499" ja "Linnan historia
// (noin 3 min)". Historian lopussa sama pohja yhdellä kortilla "Pelaa". Valinta muistetaan: kun kortit on kerran nähty ja valittu,
// seuraavalla kerralla suoraan peliin (Nahty); historia avautuu silloin ☰-valikosta. Leveällä ruudulla kortit vierekkäin, kapealla
// allekkain; koko kortti on napautettava, ja siinä on pohjan nappi (Pelaa = kulta, Historia = TOIMINTO). Ei taustan napautusta
// eikä Esciä: valinta on pakollinen. Ajoitus ja historian toisto Siirtosepän (Historiajana).
//   ui olavinlinna alku | loppu | nollaa | tila
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class OlavinlinnaAlku
    {
        const string NahtyAvain = "olavinlinna.alku.nahty";
        static VisualElement himmennys, rivi;
        static Kortti pelaaKortti, historiaKortti;
        static Action pelaa, historia;
        static string viimeisin = "-";

        /// <summary>Pelaaja on jo valinnut kerran: seuraavalla kerralla suoraan peliin.</summary>
        public static bool Nahty
        {
            get { try { return PlayerPrefs.GetInt(NahtyAvain, 0) == 1; } catch { return false; } }
            private set { try { PlayerPrefs.SetInt(NahtyAvain, value ? 1 : 0); PlayerPrefs.Save(); } catch { } }
        }

        public static bool Auki { get; private set; }

        /// <summary>Alun valinta: kunPelaa tai kunHistoria kutsutaan valinnan jälkeen (kortit sulkeutuvat ensin).</summary>
        public static void Kysy(Action kunPelaa, Action kunHistoria) => Nayta(kunPelaa, kunHistoria);

        /// <summary>Historian loppu: yksi kortti "Pelaa".</summary>
        public static void HistoriaLoppui(Action kunPelaa) => Nayta(kunPelaa, null);

        static void Nayta(Action kunPelaa, Action kunHistoria)
        {
            Rakenna();
            pelaa = kunPelaa; historia = kunHistoria;
            historiaKortti.style.display = kunHistoria != null ? DisplayStyle.Flex : DisplayStyle.None;
            Auki = true;
            viimeisin = kunHistoria != null ? "valinta" : "historian loppu";
            Asettele();
            Rakenne.Nayta(himmennys, true, 250);
            SyoteLukko.Esta(himmennys);
            Debug.Log("MATKAKIRJA olavinlinna-alku: " + viimeisin);
        }

        static void Valitse(bool peli)
        {
            if (!Auki) return;
            var a = peli ? pelaa : historia;
            if (a == null) return;
            Auki = false;
            pelaa = historia = null;
            Nahty = true;
            viimeisin = peli ? "pelaa" : "historia";
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(himmennys);
            Debug.Log("MATKAKIRJA olavinlinna-alku: valittu " + viimeisin);
            a();
        }

        static void Rakenna()
        {
            if (himmennys != null && himmennys.panel != null) return;
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", UiKerros.Hae().Juuri(UiKerros.Pelidialogit));
            himmennys.style.display = DisplayStyle.None;
            rivi = Rakenne.El(null, himmennys, PickingMode.Ignore);
            rivi.style.alignItems = Align.Center;
            rivi.style.justifyContent = Justify.Center;
            rivi.style.width = Length.Percent(100);
            pelaaKortti = KorttiValinta(Kieli.T("ui.alku.olavinlinna"), Kieli.T("ui.alku.pelaa-kesayo-1499"), Kieli.T("ui.alku.pelaa"), "mk-nappi--kulta", () => Valitse(true));
            historiaKortti = KorttiValinta(Kieli.T("ui.alku.olavinlinna"), Kieli.T("ui.alku.linnan-historia-noin-3-min"), Kieli.T("ui.alku.historia"), "mk-nappi--toiminto", () => Valitse(false));
            himmennys.RegisterCallback<GeometryChangedEvent>(_ => Asettele());
        }

        /// <summary>KORTTI-pohjan tumma kortti: kapiteeli, otsikko ja yksi nappi; koko kortti napautettava.</summary>
        static Kortti KorttiValinta(string kapiteeli, string otsikko, string nappi, string nappiLuokka, Action valitse)
        {
            var k = new Kortti("mk-alkuvalinta", pohja: true);
            k.AddToClassList("mk-kortti-kehys--tumma");   // KORTTI-pohjan tumma variantti (videopeli, omistaja 8.10. "A", Raamattu #4243)
            rivi.Add(k);
            Kirjasimet.Aseta(Rakenne.Teksti(kapiteeli, "mk-kortti__kapiteeli", k.Sisus), Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-kortti__otsikko", k.Sisus), Tyylikirja.Kirjain.Otsikko);
            var napit = Rakenne.El("mk-kortti__napit", k.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi(nappi, nappiLuokka, valitse, napit), Kirjasin.KoneLihava);
            k.Sisus.tooltip = otsikko;
            k.Sisus.RegisterCallback<ClickEvent>(_ => valitse());
            return k;
        }

        /// <summary>Leveällä ruudulla (kaksi korttia + väli mahtuu) vierekkäin, muuten allekkain.</summary>
        static void Asettele()
        {
            if (rivi == null) return;
            float w = himmennys.layout.width;
            bool vierekkain = historiaKortti.style.display != DisplayStyle.None && !float.IsNaN(w)
                && w >= 2f * Tyylikirja.Leveys.Kortti + 3f * Tyylikirja.Vali.L;
            var suunta = vierekkain ? FlexDirection.Row : FlexDirection.Column;
            if (rivi.style.flexDirection != suunta) rivi.style.flexDirection = suunta;
            foreach (var k in new[] { pelaaKortti, historiaKortti })
            {
                k.style.marginLeft = k.style.marginRight = vierekkain ? Tyylikirja.Vali.S : 0f;
                k.style.marginTop = k.style.marginBottom = vierekkain ? 0f : Tyylikirja.Vali.S;
            }
        }

        /// <summary>Testi `ui olavinlinna alku|loppu|nollaa|tila`.</summary>
        public static string Testi(string komento)
        {
            switch (komento)
            {
                case "alku": Kysy(() => Debug.Log("MATKAKIRJA olavinlinna-alku: testi pelaa"), () => Debug.Log("MATKAKIRJA olavinlinna-alku: testi historia")); break;
                case "loppu": HistoriaLoppui(() => Debug.Log("MATKAKIRJA olavinlinna-alku: testi pelaa")); break;
                case "nollaa": Nahty = false; break;
                case "sulje": if (Auki) { Auki = false; Rakenne.Nayta(himmennys, false, 250); SyoteLukko.Vapauta(himmennys); } break;
            }
            string Laatikko(Kortti k) => k == null ? "-" : $"{k.worldBound.xMin:0},{k.worldBound.yMin:0} {k.worldBound.width:0}×{k.worldBound.height:0}";
            return $"olavinlinna-alku {(Auki ? "auki" : "kiinni")} ({viimeisin}), nähty {Nahty}, pelaa @ {Laatikko(pelaaKortti)}, historia @ "
                 + $"{(historiaKortti != null && historiaKortti.style.display != DisplayStyle.None ? Laatikko(historiaKortti) : "piilossa")}";
        }
    }
}
