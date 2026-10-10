// PRO-SISÄLLÖNTUOTTAJAT (Natiivi-UI): webin js/ehdotukset.js proHakuRasti, proOsio,
// proNakyma ja proMateriaaliLohko natiivina.
//
//   Ehdotusosiossa ennen "Lähetä ehdotus": rasti "Haluan hakea pro-sisällöntuottajaksi" ja
//   i-nappi → minipopup "Pro-sisällöntuottaja" (hakemus kulkee ehdotuksen tekstin
//   etuliitteenä "[Pro-hakemus] " ja vaatii sähköpostin).
//   Lomakkeen pohjalla väkänen "Olen jo pro-tuottaja — kirjaudu": sähköposti + koodi,
//   "Kirjaudu" (POST /pro-tarkista). Muistissa oleva pari (PlayerPrefs matkakirja-pro-tunnus)
//   kokeillaan hiljaa ensimmäisellä avauksella; epäonnistunut pari unohdetaan.
//   Kirjautuneena: tervehdys, tilarivi, omistajan viesti, "Lähetä materiaalia" (kuvat ≤ 3,
//   video, KONTEKSTI paikka/aihe/fakta, OIKEUDET rasti/lisenssi/nimeämisrivi, "Lähetä
//   materiaali" → POST /laheta koodin kanssa), väkänen "Oma tekijäsivu — kuva, esittely ja
//   linkit" ("Lähetä profiili" → POST /pro-profiili) ja "Unohda tunnukseni tältä laitteelta".
// Kuvat: Palautekanava.Kuvanvalitsin (Pelikoodarin iOS-kuvanvalitsin); video-linkki toimii ilman.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class ProOsio
    {
        /// <summary>Lisenssit: sama suljettu lista kuin workerissa (MATERIAALIN_LISENSSIT).</summary>
        public static (string Arvo, string Nimi)[] Lisenssit => new[]
        {
            ("matkakirja", Kieli.T("ui.pro.lisenssi-matkakirja")),
            ("cc-by-4.0", "CC BY 4.0"),   // kieli: ei (lisenssin oikea nimi)
            ("cc-by-sa-4.0", "CC BY-SA 4.0"),   // kieli: ei (lisenssin oikea nimi)
        };

        const int Linkkeja = 3, EsittelyKatto = 600, FaktaKatto = 500, NimeamisriviKatto = 200;

        static string Seloste => Kieli.T("ui.pro.seloste");

        /// <summary>Web proHakuRasti: rasti + i (minipopup lomakkeen kerrokseen).</summary>
        public static Rasti HakuRasti(VisualElement isa, int kerros)
        {
            var rivi = Rakenne.El("mk-palaute__prorivi", isa, PickingMode.Ignore);
            var rasti = new Rasti(rivi, Kieli.T("ui.pro.haku-rasti"), "mk-palaute__rasti--pro");
            var i = Rakenne.Nappi("i", "mk-seloste-nappi mk-palaute__seloste", () => Minipopup.AvaaTeksti(Kieli.T("ui.pro.popup-otsikko"), Seloste, kerros), rivi);
            i.tooltip = Kieli.T("ui.pro.mika-on");
            Kirjasimet.Aseta(i, Kirjasin.Kone);
            return rasti;
        }

        /// <summary>Web proOsio: kirjautuminen väkäsen takana.</summary>
        public static Vakalohko Rakenna(VisualElement isa) =>
            Lomake.Vakanen(isa, Kieli.T("ui.pro.olen-jo-pro"), Kirjautuminen);

        static void Kirjautuminen(VisualElement sisus)
        {
            var lohko = Rakenne.El("mk-palaute__kirjautuminen", sisus, PickingMode.Ignore);
            var posti = Lomake.Kentta(lohko, Kieli.T("ui.pro.sahkoposti"), Kenttalaji.Sahkoposti);
            var koodi = Lomake.Kentta(lohko, Kieli.T("ui.pro.koodi"));
            Button nappi = null;
            Label huomio = null;

            void Avaa(string p, string k, bool hiljaa, Action<bool> valmis)
            {
                Palautekanava.TarkistaPro(p, k, t =>
                {
                    if (t.Ok)
                    {
                        Palautekanava.AsetaProTunnus(p, k);
                        sisus.Clear();
                        Nakyma(sisus, p, k, t.Data ?? new Dictionary<string, object>());
                        valmis?.Invoke(true);
                        return;
                    }
                    // Muistin pari on voinut vanhentua: unohdetaan, mutta ei säikäytetä pelaajaa.
                    Palautekanava.AsetaProTunnus(null, null);
                    if (!hiljaa) huomio.text = t.Estetty ? Palautekanava.EiNatiivissa : t.Verkoton ? Kieli.T("ui.pro.yhteytta-ei-saatu") : t.Virhe;
                    valmis?.Invoke(false);
                });
            }

            nappi = Lomake.Laheta(lohko, Kieli.T("ui.pro.kirjaudu"), () =>
            {
                string p = posti.value.Trim(), k = koodi.value.Trim();
                if (p.Length == 0 || k.Length == 0) { huomio.text = Kieli.T("ui.pro.kirjoita-posti-koodi"); return; }
                nappi.SetEnabled(false);
                huomio.text = Kieli.T("ui.pro.tarkistetaan");
                Avaa(p, k, false, ok => { if (!ok) nappi.SetEnabled(true); });
            });
            huomio = Lomake.Huomio(lohko, "");

            // Muistissa oleva pari avaa näkymän suoraan ensimmäisellä avauksella.
            if (Palautekanava.ProTunnus() is (string mp, string mk)) Avaa(mp, mk, true, null);
        }

        static string TilaTeksti(string tila) => tila switch
        {
            "odottaa" => Kieli.T("ui.pro.tila-odottaa"),
            "julkaistu" => Kieli.T("ui.pro.tila-julkaistu"),
            "hylatty" => Kieli.T("ui.pro.tila-hylatty"),
            _ => Kieli.T("ui.pro.tila-ei-lahetetty"),
        };

        /// <summary>Web proNakyma: kirjautuneen tuottajan näkymä.</summary>
        static void Nakyma(VisualElement isa, string sahkoposti, string koodi, Dictionary<string, object> tiedot)
        {
            string nimi = MiniJson.Teksti(tiedot, "nimi") ?? "";
            var profiiliTiedot = MiniJson.Kentta(tiedot, "profiili") as Dictionary<string, object>;
            var lohko = Rakenne.El("mk-palaute__pronakyma", isa, PickingMode.Ignore);

            Lomake.Teksti(lohko, Kieli.T("ui.pro.tervehdys", nimi.Length > 0 ? nimi : sahkoposti));
            var tila = Lomake.Huomio(lohko, TilaTeksti(MiniJson.Teksti(tiedot, "tila")));
            if (MiniJson.Teksti(tiedot, "kommentti") is string kommentti && kommentti.Length > 0)
                Lomake.Huomio(lohko, Kieli.T("ui.pro.omistajan-viesti", kommentti));

            // Materiaali ensin, tekijäsivu väkäsen takana (omistaja 25.8.2026).
            var materiaaliNappi = Materiaali(lohko, sahkoposti, koodi, nimi);

            Button profiiliNappi = null;
            Lomake.Vakanen(lohko, Kieli.T("ui.pro.tekijasivu-vakanen"),
                s => profiiliNappi = Profiili(s, sahkoposti, koodi, profiiliTiedot, tila), heti: true);

            Lomake.Toissijainen(lohko, Kieli.T("ui.pro.unohda-tunnukseni"), () =>
            {
                Palautekanava.AsetaProTunnus(null, null);
                // Viesti tilariville: profiili on väkäsen takana, eikä sen kuittaus näkyisi.
                tila.text = Kieli.T("ui.pro.tunnukset-unohdettu");
                profiiliNappi?.SetEnabled(false);
                materiaaliNappi.SetEnabled(false);
            });
        }

        /// <summary>Web proMateriaaliLohko. Palauttaa lähetysnapin ("Unohda" poistaa sen käytöstä).</summary>
        static Button Materiaali(VisualElement isa, string sahkoposti, string koodi, string tekija)
        {
            var lohko = Rakenne.El("mk-palaute__osio", isa, PickingMode.Ignore);
            Lomake.Valiotsikko(lohko, Kieli.T("ui.pro.laheta-materiaalia")).AddToClassList("mk-palaute__valiotsikko--alku");
            Lomake.Teksti(lohko, Kieli.T("ui.pro.materiaali-ohje"));

            var kuvat = new Kuvavalinta(lohko, Kieli.T("ui.pro.kuvat", Palautekanava.Kuvia), Palautekanava.Kuvia, Palautekanava.ProMateriaalinSivu);
            // Huomio kuvanapin ja tilarivin väliin kuten webissä (kuvaNimio, huomio, kuvaTieto).
            var ohje = Lomake.Huomio(null, Kieli.T("ui.pro.kuva-ohje", Palautekanava.ProMateriaalinSivu));
            lohko.Insert(lohko.IndexOf(kuvat.Tieto), ohje);
            var video = Lomake.Kentta(lohko, Kieli.T("ui.pro.video-osoite"), Kenttalaji.Osoite);

            Lomake.Valiotsikko(lohko, Kieli.T("ui.pro.konteksti"));
            var paikka = Lomake.Kentta(lohko, Kieli.T("ui.pro.paikka"));
            var aihe = Lomake.Kentta(lohko, Kieli.T("ui.pro.aihe"));
            var fakta = Lomake.Kentta(lohko, Kieli.T("ui.pro.fakta"), Kenttalaji.Monirivi, FaktaKatto);

            Lomake.Valiotsikko(lohko, Kieli.T("ui.pro.oikeudet"));
            var oikeudet = new Rasti(lohko, Kieli.T("ui.pro.oikeudet-rasti"));
            Lomake.Nimio(lohko, Kieli.T("ui.kuvanakyma.lisenssi"));
            var nimet = new List<string>();
            foreach (var l in Lisenssit) nimet.Add(l.Nimi);
            var lisenssi = Lomake.Valinta(lohko, nimet, 0);
            var nimeaminen = Lomake.Kentta(lohko, Kieli.T("ui.pro.nimeamisrivi"), Kenttalaji.Rivi, NimeamisriviKatto);
            // Valmis ehdotus tuottajan omasta nimestä: rivin saa yhä muuttaa.
            if (tekija.Length > 0) nimeaminen.value = Kieli.T("ui.pro.kuva-tekija", tekija);

            Button nappi = null;
            Label huomio = null;
            nappi = Lomake.Laheta(lohko, Kieli.T("ui.pro.laheta-materiaali"), () =>
            {
                // Puutteet lomakkeen järjestyksessä ylhäältä alas.
                void Puute(string viesti, Focusable kentta) { huomio.text = viesti; kentta?.Focus(); }
                if (kuvat.Valitut.Count == 0 && video.value.Trim().Length == 0) { Puute(Kieli.T("ui.pro.puute-kuva"), video); return; }
                if (paikka.value.Trim().Length == 0) { Puute(Kieli.T("ui.pro.puute-paikka"), paikka); return; }
                if (aihe.value.Trim().Length == 0) { Puute(Kieli.T("ui.pro.puute-aihe"), aihe); return; }
                if (fakta.value.Trim().Length == 0) { Puute(Kieli.T("ui.pro.puute-fakta"), fakta); return; }
                if (!oikeudet.Arvo) { Puute(Kieli.T("ui.pro.puute-oikeudet"), null); return; }
                if (nimeaminen.value.Trim().Length == 0) { Puute(Kieli.T("ui.pro.puute-nimeamisrivi"), nimeaminen); return; }

                string lis = Lisenssit[Mathf.Clamp(lisenssi.index, 0, Lisenssit.Length - 1)].Arvo;
                nappi.SetEnabled(false);
                huomio.text = Kieli.T("ui.sahke.lahetetaan");
                var kentat = new List<(string, string)>
                {
                    ("teksti", MateriaaliTeksti(tekija, paikka.value.Trim(), aihe.value.Trim(), fakta.value.Trim(), nimeaminen.value.Trim(), lis, video.value.Trim())),
                    ("sivu", "Pro-materiaali"),
                    ("sahkoposti", sahkoposti),
                    ("koodi", koodi),
                    // Nimimerkki on tuottajan nimi; nimeämisrivi kulkee omana kenttänään.
                    ("nimimerkki", tekija),
                    ("saaKrediitteihin", "on"),
                    ("oikeudet", "on"),
                    ("lisenssi", lis),
                    ("nimeamisrivi", nimeaminen.value.Trim()),
                    ("paikka", paikka.value.Trim()),
                    ("aihe", aihe.value.Trim()),
                    ("fakta", fakta.value.Trim()),
                    ("video", video.value.Trim()),
                };
                Palautekanava.Postita("/laheta", kentat, kuvat.Liitteet("kuvat"), t =>
                {
                    nappi.SetEnabled(true);
                    if (!t.Ok) { huomio.text = Palautekanava.Virheviesti(t, false); return; }
                    kuvat.Tyhjenna();
                    video.value = "";
                    paikka.value = "";
                    aihe.value = "";
                    fakta.value = "";
                    huomio.text = Kieli.T("ui.pro.kiitos-materiaali");
                });
            });
            huomio = Lomake.Huomio(lohko, "");
            return nappi;
        }

        /// <summary>Web proMateriaaliTeksti: julkaisutiedot myös tekstin alkuun rakenteisena lohkona.</summary>
        static string MateriaaliTeksti(string tekija, string paikka, string aihe, string fakta, string nimeamisrivi, string lisenssi, string video)
        {
            string nimi = lisenssi;
            foreach (var l in Lisenssit) if (l.Arvo == lisenssi) nimi = l.Nimi;
            var rivit = new List<string>
            {
                "[Pro-materiaali" + (tekija.Length > 0 ? " · " + tekija : "") + "]",
                "Paikka: " + paikka,
                "Aihe: " + aihe,
                "Fakta: " + fakta,
                "Nimeäminen: " + nimeamisrivi,
                "Lisenssi: " + nimi,
            };
            if (video.Length > 0) rivit.Add("Video: " + video);
            return string.Join("\n", rivit);
        }

        /// <summary>Web proNakyma: tekijäsivun lohko (omakuva, esittely, linkit). Palauttaa lähetysnapin.</summary>
        static Button Profiili(VisualElement isa, string sahkoposti, string koodi, Dictionary<string, object> profiili, Label tila)
        {
            var kuva = new Kuvavalinta(isa, Kieli.T("ui.pro.oma-kuva"), 1, Palautekanava.ProKuvanSivu);
            if (MiniJson.Kentta(profiili, "kuva") != null) kuva.Tieto.text = Kieli.T("ui.pro.kuva-tallessa");

            var esittely = Lomake.Kentta(isa, Kieli.T("ui.pro.esittely", EsittelyKatto), Kenttalaji.Monirivi, EsittelyKatto);
            esittely.value = MiniJson.Teksti(profiili, "esittely") ?? "";

            Lomake.Huomio(isa, Kieli.T("ui.pro.linkit-ohje", Linkkeja));
            var vanhat = MiniJson.Kentta(profiili, "linkit") as List<object>;
            var linkit = new List<TextField>();
            for (int i = 0; i < Linkkeja; i++)
            {
                var k = Lomake.Kentta(isa, i == 0 ? "https://omatsivut.fi" : Kieli.T("ui.pro.lisalinkki"), Kenttalaji.Osoite);   // kieli: ei (esimerkki-URL)
                if (vanhat != null && i < vanhat.Count) k.value = MiniJson.Teksti(vanhat[i] as Dictionary<string, object>, "url") ?? "";
                linkit.Add(k);
            }

            Button nappi = null;
            Label huomio = null;
            nappi = Lomake.Laheta(isa, Kieli.T("ui.pro.laheta-profiili"), () =>
            {
                if (esittely.value.Trim().Length == 0) { huomio.text = Kieli.T("ui.pro.kirjoita-esittely"); esittely.Focus(); return; }
                nappi.SetEnabled(false);
                huomio.text = Kieli.T("ui.sahke.lahetetaan");
                var kentat = new List<(string, string)>
                {
                    ("sahkoposti", sahkoposti),
                    ("koodi", koodi),
                    ("esittely", esittely.value.Trim()),
                };
                foreach (var k in linkit) if (k.value.Trim().Length > 0) kentat.Add(("linkit", k.value.Trim()));
                Palautekanava.Postita("/pro-profiili", kentat, kuva.Liitteet("kuva"), t =>
                {
                    nappi.SetEnabled(true);
                    if (!t.Ok) { huomio.text = Palautekanava.Virheviesti(t, false); return; }
                    kuva.Tyhjenna();
                    tila.text = TilaTeksti("odottaa");
                    huomio.text = MiniJson.Teksti(t.Data, "viesti")
                        ?? Kieli.T("ui.pro.profiili-odottaa-viesti");
                });
            });
            huomio = Lomake.Huomio(isa, "");
            return nappi;
        }
    }
}
