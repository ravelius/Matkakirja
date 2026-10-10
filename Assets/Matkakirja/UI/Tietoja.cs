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
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Tietoja
    {
        const string Moduuli = "moduulit/js/lahteet.json";

        readonly VisualElement himmennys, sisus;
        readonly ScrollView vieritys;
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
            // Omistaja 29.9.2026: "niiden tietojen yläreunassa olisi nappi, mistä pääsisi pelin tilannesivulle, missä on ne
            // linssit ja kehityksen yhteenveto" (web projekti.html; natiivissa selaimeen).
            var tilanne = Rakenne.Nappi(Kieli.T("ui.tietoja.tilannesivu"), "mk-nappi--haamu mk-tietoja__tilanne",
                () => Application.OpenURL(Laukku.SivustoJuuri + "projekti.html"), kortti.Sisus);
            Kirjasimet.Aseta(tilanne, Kirjasin.KoneLihava);
            tilanne.tooltip = Kieli.T("ui.tietoja.tilannesivu-tooltip");
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);
            sisus = vieritys.contentContainer;
            this.vieritys = vieritys;

            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var sulje = Rakenne.Nappi(Kieli.T("ui.tietoja.sulje"), "mk-nappi--kulta", Sulje, napit);
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

        /// <summary>lahteet.json:n webin aikaiset kaikukuvarivit ("Valokuvat ja kuvitus"), jotka natiivissa korvaa Ajattelijat-osio.</summary>
        const string KaikukuvaEtuliite = "Ajattelijat-linssin kaikukuvat";

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
                // Nimetön kävijälaskuri (Kaynti.cs): web PELI.yksityisyys, vanhemmassa paketissa koodin vara.
                Kappale(Teksti(peli, "yksityisyys") ?? Kaynti.Tekijatietorivi, null);
                var h = Rakenne.Teksti(Kieli.T("ui.tietoja.lahteet-ja-aineistot"), "mk-tietoja__otsikko", sisus);
                Kirjasimet.Aseta(h, Kirjasin.KoneLihava);
                Kappale(Teksti(peli, "kolmannet"), null);
            }
            else
            {
                Kappale(Kieli.T("ui.tietoja.vara-otsikko"), "mk-tietoja__copyright");
                Kappale(Kieli.T("ui.tietoja.vara-teksti"), null);
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
                        // Kaikukuvat ovat natiivissa vain Ajattelijat-osiossa (kuvalahteet[]); webin aikaiset rivit pois, ettei sama
                        // kuva näy kahdesti (Päätoimittaja 4.10.2026). Ajattelijoiden äänet ja musiikki jäävät tänne.
                        if (Teksti(o, "nimi").StartsWith(KaikukuvaEtuliite, System.StringComparison.Ordinal)) continue;
                        rivit.Add(new Rivi { Nimi = Teksti(o, "nimi"), Tekija = Teksti(o, "tekija"), Lisenssi = Teksti(o, "lisenssi"), Huom = Teksti(o, "huom") });
                    }
                    aineistoja += rivit.Count;
                    Ryhma(Teksti(ryhma, "otsikko"), Teksti(ryhma, "johdanto"), rivit);
                }
            // AJATTELIJAT (Päätoimittaja 4.10.2026: kaikukuvien CC BY-SA -nimeäminen, oraakkeli ja uhri): ajattelijoiden omista
            // tiedostoista (Resources/Ajattelijat/*.json, kuvalahteet[]; vanha kaiku.nimeaminen varalla), joten uusi kuva näkyy
            // täällä ilman erillistä listaa.
            var ajattelijat = AjattelijoidenLahteet();
            if (ajattelijat.Count > 0)
            {
                aineistoja += ajattelijat.Count;
                Ryhma(Kieli.T("ui.ajattelija.kapiteeli"), Kieli.T("ui.tietoja.ajattelijat-johdanto"), ajattelijat);
            }
            Ryhma(Kieli.T("ui.tietoja.sovellus-ryhma"), Kieli.T("ui.tietoja.sovellus-johdanto"), new List<Rivi>
            {
                new Rivi { Nimi = Kieli.T("ui.tietoja.maasto-ja-pallo"), Tekija = KarttaKerrokset.Tekijatiedot, EiLisenssia = true },
                // Lennon pinta satelliittiin (Natiiviseppä build 10, Fable: EOX:n täysi muoto, s2/laatat.json attribuutioEox).
                new Rivi { Nimi = Kieli.T("ui.tietoja.lennon-pinta"), Tekija = "NASA Earth Observatory (Blue Marble Next Generation)", EiLisenssia = true },   // kieli: ei (tekijän ja aineiston oikea nimi)
                // Radiolinssin yövalot (Karttasepän sarja yovalot/2026-09-25, VIIRS, public domain; RadioMastot.YovaloUrl).
                new Rivi { Nimi = Kieli.T("ui.tietoja.radion-yovalot"), Tekija = "NASA Earth Observatory (Black Marble)", EiLisenssia = true },   // kieli: ei (tekijän ja aineiston oikea nimi)
                // Cupolan ääni: NASA:n radio ja sisätilahumina poistuivat käytöstä 3.10.2026 (omistaja: rätinä pois); humina v2 on pelin oma
                // generoitu ääni, joten rivi poistettiin (CupolaAani.cs).
                new Rivi { Nimi = Kieli.T("ui.tietoja.lennon-pinta-pilveton"),Tekija = "EOxCloudless https://cloudless.eox.at by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 & 2017)", EiLisenssia = true },   // kieli: ei (tekijän ja aineiston oikea nimi)
                new Rivi { Nimi = Kieli.T("ui.tietoja.lentokone"), Tekija = Kieli.T("ui.tietoja.pelin-oma-malli"), Lisenssi = "CC0 (public domain)" },   // kieli: ei (lisenssin nimi)
                // Myllyn naksahdukset (Siirtoseppä 2.10.2026, omistajan OK): Resources/Pelit/Mylly/mylly-asetus|poisto.wav.
                new Rivi { Nimi = Kieli.T("ui.tietoja.myllyn-aanet"), Tekija = "Kenney (kenney.nl), Impact Sounds", Lisenssi = "CC0 (public domain)" },   // kieli: ei (lisenssin nimi)
                // ISS-kytkinpaneelin painetut otsikot ja legendat (Linnanrakentajan Cycles-renderit 30.9., Päätoimittaja).
                new Rivi { Nimi = Kieli.T("ui.tietoja.barlow"), Tekija = "© 2017 The Barlow Project Authors (github.com/jpt/barlow)",   // kieli: ei (tekijänoikeusmerkintä)
                    Lisenssi = "SIL Open Font License 1.1" },
                new Rivi { Nimi = Kieli.T("ui.tietoja.garamond"), Tekija = Kieli.T("ui.tietoja.garamond-tekijat"), Lisenssi = "SIL Open Font License 1.1",
                    Huom = Kieli.T("ui.tietoja.fontit-huom") },
            });
            if (aineistoja > 0)
                Kappale(Kieli.T("ui.tietoja.aineistoa", aineistoja), "mk-tietoja__lopetus");
            Kappale(Kieli.T(UiNakymat.SisaltoVersio != null ? "ui.tietoja.versio-sisalto" : "ui.tietoja.versio", Application.version, UiNakymat.SisaltoVersio),
                "mk-tietoja__lopetus");
            rakennettu = peli != null;
        }

        /// <summary>
        /// Ajattelijoiden kuvien lähteet (Linssiseppä 2:n muoto 4.10.2026): juuren "kuvalahteet": [{ kuva, kohde, teos, tekija, lisenssi,
        /// lahde, nimea? }]; ilman sitä vanha kaiku.nimeaminen ("Tekijä, lisenssi, lähde") yhtenä rivinä. *-atlas-tiedostot ohitetaan.
        /// Rivi: ajattelija: kohde, teos · tekijä, lisenssi, lähde huomautuksena.
        /// </summary>
        static List<Rivi> AjattelijoidenLahteet()
        {
            var rivit = new List<Rivi>();
            foreach (var t in Resources.LoadAll<TextAsset>("Ajattelijat").OrderBy(t => t.name))
            {
                if (t.name.EndsWith("-atlas", System.StringComparison.Ordinal)) continue;
                Dictionary<string, object> d;
                try { d = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(t.text)); }
                catch (System.Exception) { continue; }
                if (d == null) continue;
                string ajattelija = Teksti(d, "nimi") ?? t.name;
                var lahteet = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, "kuvalahteet"));
                foreach (var x in lahteet)
                {
                    if (MiniJson.ObjektiTaiNull(x) is not Dictionary<string, object> l) continue;
                    string kohde = Teksti(l, "kohde"), teos = Teksti(l, "teos"), tekija = Teksti(l, "tekija");
                    // nimea: lisenssin vaatima nimeämisrivi (CC BY / BY-SA, esim. "Davide Mauro, CC BY-SA 4.0, Wikimedia Commons")
                    // sellaisenaan ensimmäisenä huomautusrivinä, lähde sen alla (Linssiseppä 2, 4.10.2026).
                    string nimea = Teksti(l, "nimea"), lahde = Teksti(l, "lahde");
                    rivit.Add(new Rivi
                    {
                        // Kohde sisältää jo ajattelijan nimen ("Sokrates: jumalankuva", "Marcus: uhri"): ei toista kertaa.
                        Nimi = kohde == null ? ajattelija : kohde.Contains(": ") ? kohde : ajattelija + ": " + kohde,
                        Tekija = teos != null && tekija != null ? teos + " · " + tekija : teos ?? tekija,
                        Lisenssi = Teksti(l, "lisenssi"),
                        Huom = nimea != null && lahde != null ? nimea + "\n" + lahde : nimea ?? lahde,
                    });
                }
                if (lahteet.Count == 0 && MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "kaiku")) is Dictionary<string, object> k
                    && Teksti(k, "nimeaminen") is string n)
                    rivit.Add(new Rivi { Nimi = ajattelija, Tekija = n, EiLisenssia = true });
            }
            return rivit;
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

        /// <summary>Testikomento ui tietoja &lt;osio&gt;: auki ja vieritys ryhmän otsikkoon heti, kun sisältö on rakennettu.</summary>
        public void AvaaOsioon(string osio)
        {
            Avaa();
            float alku = Time.unscaledTime;
            IVisualElementScheduledItem ajo = null;
            ajo = sisus.schedule.Execute(() =>
            {
                var o = sisus.Query<Label>(className: "mk-tietoja__ryhma").Where(l => l.text.ToLowerInvariant().StartsWith(osio.ToLowerInvariant())).First();
                if (o != null && o.layout.height > 0) { vieritys.scrollOffset = new Vector2(0f, o.layout.y); ajo.Pause(); }   // otsikko yläreunaan
                else if (Time.unscaledTime - alku > 8f) ajo.Pause();
            }).Every(200);
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
                    Rakenne.Teksti(r.Lisenssi ?? Kieli.T("ui.tietoja.lisenssi-epaselva"),
                        "mk-tietoja__lisenssi" + (r.Lisenssi == null ? " mk-tietoja__lisenssi--epaselva" : ""), li);
                if (r.Huom != null) Rakenne.Teksti(r.Huom, "mk-tietoja__huom", li);
            }
        }
    }
}
