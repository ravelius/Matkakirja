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
        public static readonly (string Arvo, string Nimi)[] Lisenssit =
        {
            ("matkakirja", "Vain Matkakirja-käyttö (peli ja sen julisteet)"),
            ("cc-by-4.0", "CC BY 4.0"),
            ("cc-by-sa-4.0", "CC BY-SA 4.0"),
        };

        const int Linkkeja = 3, EsittelyKatto = 600, FaktaKatto = 500, NimeamisriviKatto = 200;

        const string Seloste = "Omistaja kutsuu peliin ammattilaisia — valokuvaajia ja "
            + "tutkijoita. Kutsutut saavat koodin, jolla pääsee rakentamaan "
            + "oman tekijäsivun: kuva, esittely ja linkit omille sivuille. "
            + "Tekijäsivu avautuu pelaajalle kuviesi lähderiviltä, eli nimesi "
            + "kulkee jokaisen kuvasi mukana.";

        /// <summary>Web proHakuRasti: rasti + i (minipopup lomakkeen kerrokseen).</summary>
        public static Rasti HakuRasti(VisualElement isa, int kerros)
        {
            var rivi = Rakenne.El("mk-palaute__prorivi", isa, PickingMode.Ignore);
            var rasti = new Rasti(rivi, "Haluan hakea pro-sisällöntuottajaksi", "mk-palaute__rasti--pro");
            var i = Rakenne.Nappi("i", "mk-seloste-nappi mk-palaute__seloste", () => Minipopup.AvaaTeksti("Pro-sisällöntuottaja", Seloste, kerros), rivi);
            i.tooltip = "Mikä on pro-sisällöntuottaja?";
            Kirjasimet.Aseta(i, Kirjasin.Kone);
            return rasti;
        }

        /// <summary>Web proOsio: kirjautuminen väkäsen takana.</summary>
        public static Vakalohko Rakenna(VisualElement isa) =>
            Lomake.Vakanen(isa, "Olen jo pro-tuottaja — kirjaudu", Kirjautuminen);

        static void Kirjautuminen(VisualElement sisus)
        {
            var lohko = Rakenne.El("mk-palaute__kirjautuminen", sisus, PickingMode.Ignore);
            var posti = Lomake.Kentta(lohko, "Sähköposti", Kenttalaji.Sahkoposti);
            var koodi = Lomake.Kentta(lohko, "Koodi (8 merkkiä)");
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
                    if (!hiljaa) huomio.text = t.Estetty ? Palautekanava.EiNatiivissa : t.Verkoton ? "Lähetys ei onnistunut: yhteyttä ei saatu." : t.Virhe;
                    valmis?.Invoke(false);
                });
            }

            nappi = Lomake.Laheta(lohko, "Kirjaudu", () =>
            {
                string p = posti.value.Trim(), k = koodi.value.Trim();
                if (p.Length == 0 || k.Length == 0) { huomio.text = "Kirjoita sähköposti ja koodi."; return; }
                nappi.SetEnabled(false);
                huomio.text = "Tarkistetaan…";
                Avaa(p, k, false, ok => { if (!ok) nappi.SetEnabled(true); });
            });
            huomio = Lomake.Huomio(lohko, "");

            // Muistissa oleva pari avaa näkymän suoraan ensimmäisellä avauksella.
            if (Palautekanava.ProTunnus() is (string mp, string mk)) Avaa(mp, mk, true, null);
        }

        static string TilaTeksti(string tila) => tila switch
        {
            "odottaa" => "Profiili odottaa julkaisua.",
            "julkaistu" => "Tekijäsivusi on julkaistu pelissä.",
            "hylatty" => "Profiilia ei julkaistu — voit lähettää uuden.",
            _ => "Et ole vielä lähettänyt profiilia.",
        };

        /// <summary>Web proNakyma: kirjautuneen tuottajan näkymä.</summary>
        static void Nakyma(VisualElement isa, string sahkoposti, string koodi, Dictionary<string, object> tiedot)
        {
            string nimi = MiniJson.Teksti(tiedot, "nimi") ?? "";
            var profiiliTiedot = MiniJson.Kentta(tiedot, "profiili") as Dictionary<string, object>;
            var lohko = Rakenne.El("mk-palaute__pronakyma", isa, PickingMode.Ignore);

            Lomake.Teksti(lohko, $"Hei {(nimi.Length > 0 ? nimi : sahkoposti)}! Täältä lähetät materiaalia "
                + "lehtiin, ja täältä hoidat oman tekijäsivusi — se näkyy pelaajalle "
                + "kuviesi lähderiviltä.");
            var tila = Lomake.Huomio(lohko, TilaTeksti(MiniJson.Teksti(tiedot, "tila")));
            if (MiniJson.Teksti(tiedot, "kommentti") is string kommentti && kommentti.Length > 0)
                Lomake.Huomio(lohko, "Omistajan viesti: " + kommentti);

            // Materiaali ensin, tekijäsivu väkäsen takana (omistaja 25.8.2026).
            var materiaaliNappi = Materiaali(lohko, sahkoposti, koodi, nimi);

            Button profiiliNappi = null;
            Lomake.Vakanen(lohko, "Oma tekijäsivu — kuva, esittely ja linkit",
                s => profiiliNappi = Profiili(s, sahkoposti, koodi, profiiliTiedot, tila), heti: true);

            Lomake.Toissijainen(lohko, "Unohda tunnukseni tältä laitteelta", () =>
            {
                Palautekanava.AsetaProTunnus(null, null);
                // Viesti tilariville: profiili on väkäsen takana, eikä sen kuittaus näkyisi.
                tila.text = "Tunnukset unohdettu. Avaa osio uudelleen ja kirjaudu koodillasi.";
                profiiliNappi?.SetEnabled(false);
                materiaaliNappi.SetEnabled(false);
            });
        }

        /// <summary>Web proMateriaaliLohko. Palauttaa lähetysnapin ("Unohda" poistaa sen käytöstä).</summary>
        static Button Materiaali(VisualElement isa, string sahkoposti, string koodi, string tekija)
        {
            var lohko = Rakenne.El("mk-palaute__osio", isa, PickingMode.Ignore);
            Lomake.Valiotsikko(lohko, "Lähetä materiaalia").AddToClassList("mk-palaute__valiotsikko--alku");
            Lomake.Teksti(lohko, "Kuva tai video lehteen. Täytä myös oikeudet ja konteksti — "
                + "niistä kirjoitetaan kuvan lähderivi ja täkyn lunastusteksti.");

            var kuvat = new Kuvavalinta(lohko, $"Kuvat (enintään {Palautekanava.Kuvia})", Palautekanava.Kuvia, Palautekanava.ProMateriaalinSivu);
            // Huomio kuvanapin ja tilarivin väliin kuten webissä (kuvaNimio, huomio, kuvaTieto).
            var ohje = Lomake.Huomio(null, $"Vaakakuvat vähintään {Palautekanava.ProMateriaalinSivu} px pitkältä sivulta; "
                + "lähetys pienentää suuremmat siihen mittaan. Video: linkki riittää.");
            lohko.Insert(lohko.IndexOf(kuvat.Tieto), ohje);
            var video = Lomake.Kentta(lohko, "Videon osoite (vapaaehtoinen)", Kenttalaji.Osoite);

            Lomake.Valiotsikko(lohko, "Konteksti");
            var paikka = Lomake.Kentta(lohko, "Paikka: missä kuvattu?");
            var aihe = Lomake.Kentta(lohko, "Aihe: mikä eläin tai kohde?");
            var fakta = Lomake.Kentta(lohko, "Fakta (1–2 virkettä): mitä kuvassa tapahtuu tai miksi se on kiinnostava?", Kenttalaji.Monirivi, FaktaKatto);

            Lomake.Valiotsikko(lohko, "Oikeudet");
            var oikeudet = new Rasti(lohko, "Myönnän Matkakirjalle oikeuden käyttää materiaalia pelissä ja sen julisteissa.");
            Lomake.Nimio(lohko, "Lisenssi");
            var nimet = new List<string>();
            foreach (var l in Lisenssit) nimet.Add(l.Nimi);
            var lisenssi = Lomake.Valinta(lohko, nimet, 0);
            var nimeaminen = Lomake.Kentta(lohko, "Nimeämisrivi, esim. \"Kuva: Maija Meikäläinen\"", Kenttalaji.Rivi, NimeamisriviKatto);
            // Valmis ehdotus tuottajan omasta nimestä: rivin saa yhä muuttaa.
            if (tekija.Length > 0) nimeaminen.value = "Kuva: " + tekija;

            Button nappi = null;
            Label huomio = null;
            nappi = Lomake.Laheta(lohko, "Lähetä materiaali", () =>
            {
                // Puutteet lomakkeen järjestyksessä ylhäältä alas.
                void Puute(string viesti, Focusable kentta) { huomio.text = viesti; kentta?.Focus(); }
                if (kuvat.Valitut.Count == 0 && video.value.Trim().Length == 0) { Puute("Valitse kuva tai anna videon osoite.", video); return; }
                if (paikka.value.Trim().Length == 0) { Puute("Kerro, missä materiaali on kuvattu.", paikka); return; }
                if (aihe.value.Trim().Length == 0) { Puute("Kerro, mikä eläin tai kohde on aiheena.", aihe); return; }
                if (fakta.value.Trim().Length == 0) { Puute("Kirjoita 1–2 virkkeen fakta.", fakta); return; }
                if (!oikeudet.Arvo) { Puute("Myönnä vielä käyttöoikeus materiaaliin.", null); return; }
                if (nimeaminen.value.Trim().Length == 0) { Puute("Kirjoita nimeämisrivi — se päätyy kuvan lähderiville.", nimeaminen); return; }

                string lis = Lisenssit[Mathf.Clamp(lisenssi.index, 0, Lisenssit.Length - 1)].Arvo;
                nappi.SetEnabled(false);
                huomio.text = "Lähetetään…";
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
                    huomio.text = "Kiitos! Materiaali on perillä ja odottaa omistajan "
                        + "arviota. Oikeudet ja nimeämisrivi tallennettiin lähetyksen mukana.";
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
            var kuva = new Kuvavalinta(isa, "Oma kuva (1 kpl)", 1, Palautekanava.ProKuvanSivu);
            if (MiniJson.Kentta(profiili, "kuva") != null) kuva.Tieto.text = "Kuva on tallessa. Uusi valinta korvaa sen.";

            var esittely = Lomake.Kentta(isa, $"Lyhyt esittely (enintään {EsittelyKatto} merkkiä)", Kenttalaji.Monirivi, EsittelyKatto);
            esittely.value = MiniJson.Teksti(profiili, "esittely") ?? "";

            Lomake.Huomio(isa, $"Linkit omille sivuillesi (enintään {Linkkeja}, http- tai https-osoite).");
            var vanhat = MiniJson.Kentta(profiili, "linkit") as List<object>;
            var linkit = new List<TextField>();
            for (int i = 0; i < Linkkeja; i++)
            {
                var k = Lomake.Kentta(isa, i == 0 ? "https://omatsivut.fi" : "Lisälinkki (vapaaehtoinen)", Kenttalaji.Osoite);
                if (vanhat != null && i < vanhat.Count) k.value = MiniJson.Teksti(vanhat[i] as Dictionary<string, object>, "url") ?? "";
                linkit.Add(k);
            }

            Button nappi = null;
            Label huomio = null;
            nappi = Lomake.Laheta(isa, "Lähetä profiili", () =>
            {
                if (esittely.value.Trim().Length == 0) { huomio.text = "Kirjoita lyhyt esittely."; esittely.Focus(); return; }
                nappi.SetEnabled(false);
                huomio.text = "Lähetetään…";
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
                        ?? "Profiili odottaa julkaisua — saat krediitin kun ensimmäinen kuvasi julkaistaan lehdessä.";
                });
            });
            huomio = Lomake.Huomio(isa, "");
            return nappi;
        }
    }
}
