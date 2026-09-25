// TEKIJÄTIEDOT JA LÄHTEET (Natiivi-UI): webin #lahteet-dialog (ui.js avaaLahteet, js/lahteet.js)
// natiivina. Avataan logosta ja päävalikosta. Pergamenttikortti himmennyksen päällä, sisältö
// vierittyy, "Sulje" oikealla (webin .dialog-actions).
//
// Webin järjestys: nimikilpi (logo tummalla laatalla), englanninkielinen nimi kursiivilla,
// copyright lihavoituna, tekijä, apu, ehdot, johdanto; "LÄHTEET JA AINEISTOT" katkoviivan alla,
// kolmansien osapuolten kappale; ryhmät (otsikko, kursiivijohdanto, rivit: nimi lihavoituna,
// tekijä, lisenssi tai "Lisenssi epäselvä" ruskealla kursiivilla, huom); lopetus "N aineistoa. …".
// Sisältö paketin moduulista moduulit/js/lahteet.json (PELI, LAHTEET) ensimmäisellä avauksella.
//
// Natiivin omat aineistot (webissä ei ole): pakollinen karttalähteiden attribuutio (Copernicus-DEM,
// Cesium; Natiivisepän KarttaKerrokset.Tekijatiedot, koska Cesiumin oma ruutukrediitti on
// piilotettu UI:n alta), DC-3-malli ja fontit omana ryhmänään webin ryhmien perässä, ja
// versiorivi lopussa. Ilman pakettia (ei verkkoa, vanha paketti) näkyvät vain nämä ja lyhyt vara.
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Tietoja
    {
        const string Moduuli = "moduulit/js/lahteet.json";

        readonly VisualElement himmennys, sisus;
        bool rakennettu, haussa;
        public bool Auki { get; private set; }

        public Tietoja(UiKerros kerros)
        {
            var juuri = kerros.Juuri(UiKerros.Valikot);
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });

            var kortti = new Kortti("mk-tietoja");
            himmennys.Add(kortti);
            // Nimikilpi: sama logo kuin yläpalkissa isompana tummalla laatalla (web .lahteet-nimikilpi).
            var kilpi = Rakenne.El("mk-tietoja__kilpi", kortti.Sisus, PickingMode.Ignore);
            var logo = Rakenne.El("mk-tietoja__logo", kilpi, PickingMode.Ignore);
            var logoKuva = Resources.Load<Texture2D>("MatkakirjaUI/logo");
            if (logoKuva != null) logo.style.backgroundImage = new StyleBackground(logoKuva);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);
            sisus = vieritys.contentContainer;

            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var sulje = Rakenne.Nappi("Sulje", "mk-nappi--kulta", Sulje, napit);
            Rakenne.Tausta(sulje, Kuviot.Kulta);
            Kirjasimet.Aseta(sulje, Kirjasin.KoneLihava);
        }

        public void Avaa()
        {
            if (!rakennettu && !haussa) UiKerros.Hae().StartCoroutine(Rakenna());
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 320);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
        }

        // --- sisältö -------------------------------------------------------------------------

        struct Rivi { public string Nimi, Tekija, Lisenssi, Huom; public bool EiLisenssia; }

        /// <summary>Webin tapaan vasta ensimmäisellä avauksella; epäonnistunut haku yritetään seuraavalla.</summary>
        IEnumerator Rakenna()
        {
            haussa = true;
            string json = null;
            yield return Sisalto.HaePaketista(Moduuli, t => json = t, true);
            haussa = false;
            Dictionary<string, object> peli = null;
            List<object> ryhmat = null;
            if (json != null)
            {
                try
                {
                    var e = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Jasenna(json)), "exportit"));
                    peli = Rakenne.Olio(Arvo(e, "PELI"));
                    ryhmat = Rakenne.Lista(Arvo(e, "LAHTEET"));
                }
                catch (System.FormatException) { /* rikkinäinen moduuli = vara */ }
            }
            sisus.Clear();
            if (peli != null)
            {
                Kappale(Teksti(peli, "englanniksi"), "mk-tietoja__alaotsikko");
                Kappale(Teksti(peli, "copyright"), "mk-tietoja__copyright");
                foreach (var k in new[] { "tekija", "apu", "ehdot", "johdanto" }) Kappale(Teksti(peli, k), null);
                var h = Rakenne.Teksti("LÄHTEET JA AINEISTOT", "mk-tietoja__otsikko", sisus);
                Kirjasimet.Aseta(h, Kirjasin.KoneLihava);
                Kappale(Teksti(peli, "kolmannet"), null);
            }
            else
            {
                Kappale("Matkakirja ja unohdettu aarre", "mk-tietoja__copyright");
                Kappale("Suomenkielinen seikkailupeli nuoren Foggin matkasta isoisän vuoden 1873 matkapäiväkirjan jäljillä. "
                    + "Valokuvat, julisteet ja liput ovat Wikimedia Commonsista (vapaat lisenssit); tekijä ja lisenssi näkyvät "
                    + "kunkin kuvan yhteydessä.", null);
            }
            int aineistoja = 0;
            if (ryhmat != null)
                foreach (var r in ryhmat)
                {
                    var ryhma = Rakenne.Olio(r);
                    if (ryhma == null) continue;
                    var rivit = new List<Rivi>();
                    foreach (var x in Rakenne.Lista(MiniJson.Kentta(ryhma, "rivit")) ?? new List<object>())
                    {
                        var o = Rakenne.Olio(x);
                        if (o == null || Teksti(o, "nimi") == null) continue;
                        rivit.Add(new Rivi { Nimi = Teksti(o, "nimi"), Tekija = Teksti(o, "tekija"), Lisenssi = Teksti(o, "lisenssi"), Huom = Teksti(o, "huom") });
                    }
                    aineistoja += rivit.Count;
                    Ryhma(Teksti(ryhma, "otsikko"), Teksti(ryhma, "johdanto"), rivit);
                }
            Ryhma("Sovelluksen kartta, malli ja fontit", "Natiivisovelluksen omat aineistot.", new List<Rivi>
            {
                new Rivi { Nimi = "Maasto ja pallo", Tekija = KarttaKerrokset.Tekijatiedot, EiLisenssia = true },
                // Lennon pinta satelliittiin (Natiiviseppä build 10, Fable: EOX:n täysi muoto, s2/laatat.json attribuutioEox).
                new Rivi { Nimi = "Lennon pinta", Tekija = "NASA Earth Observatory (Blue Marble Next Generation)", EiLisenssia = true },
                // Radiolinssin yövalot (Karttasepän sarja yovalot/2026-09-25, VIIRS, public domain; RadioMastot.YovaloUrl).
                new Rivi { Nimi = "Radion yövalot", Tekija = "NASA Earth Observatory (Black Marble)", EiLisenssia = true },
                new Rivi { Nimi = "Lennon pinta, pilvetön",Tekija = "EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 & 2017)", EiLisenssia = true },
                new Rivi { Nimi = "Lentokone (DC-3-tyyppinen potkurikone)", Tekija = "Pelin oma malli", Lisenssi = "CC0 (public domain)" },
                new Rivi { Nimi = "EB Garamond (varafontti)", Tekija = "Georg Duffner ja Octavio Pardo", Lisenssi = "SIL Open Font License 1.1",
                    Huom = "American Typewriter, Iowan Old Style ja Snell Roundhand ovat iOS:n järjestelmäfontteja." },
            });
            if (aineistoja > 0)
                Kappale(aineistoja + " aineistoa. Yksittäisen valokuvan, äänitteen ja väitteen oma lähde näkyy siinä kohdassa "
                    + "peliä, jossa se esitetään.", "mk-tietoja__lopetus");
            Kappale("Sovellus " + Application.version + (UiNakymat.SisaltoVersio != null ? " · sisältö " + UiNakymat.SisaltoVersio : ""),
                "mk-tietoja__lopetus");
            rakennettu = peli != null;
        }

        /// <summary>Viennin export: arvo suoraan tai { arvo } -kääreessä (kuten ui-tekstit).</summary>
        static object Arvo(Dictionary<string, object> exportit, string nimi)
        {
            var x = MiniJson.Kentta(exportit, nimi);
            if (Rakenne.Olio(x) is Dictionary<string, object> o && o.ContainsKey("arvo")) return o["arvo"];
            return x;
        }

        static string Teksti(Dictionary<string, object> o, string avain)
        {
            string s = MiniJson.Teksti(o, avain);
            return string.IsNullOrWhiteSpace(s) ? null : s;
        }

        void Kappale(string teksti, string luokka)
        {
            if (teksti == null) return;
            var l = Rakenne.Teksti(teksti, "mk-kortti__teksti mk-tietoja__kappale" + (luokka != null ? " " + luokka : ""), sisus);
            if (luokka == "mk-tietoja__copyright") Kirjasimet.Aseta(l, Kirjasin.LukuLihava);
        }

        void Ryhma(string otsikko, string johdanto, List<Rivi> rivit)
        {
            if (otsikko != null) Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-tietoja__ryhma", sisus), Kirjasin.LukuLihava);
            if (johdanto != null) Rakenne.Teksti(johdanto, "mk-tietoja__johdanto", sisus);
            foreach (var r in rivit)
            {
                var li = Rakenne.El("mk-tietoja__rivi", sisus, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(r.Nimi, "mk-tietoja__nimi", li), Kirjasin.LukuLihava);
                if (r.Tekija != null) Rakenne.Teksti(r.Tekija, "mk-tietoja__tekija", li);
                // Kirjaamaton lisenssi näkyy eikä jää pois (web: tyhjä luettaisiin "ei ehtoja").
                if (!r.EiLisenssia)
                    Rakenne.Teksti(r.Lisenssi ?? "Lisenssi epäselvä",
                        "mk-tietoja__lisenssi" + (r.Lisenssi == null ? " mk-tietoja__lisenssi--epaselva" : ""), li);
                if (r.Huom != null) Rakenne.Teksti(r.Huom, "mk-tietoja__huom", li);
            }
        }
    }
}
