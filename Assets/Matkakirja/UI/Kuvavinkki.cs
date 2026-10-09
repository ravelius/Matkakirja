// KUVAVINKKI (Natiivi-UI): webin js/kuvavinkki.js natiivina — "Vinkkaa paikasta kuvalla"
// palautelomakkeen väkäsen takana ja sama lomake havainnekuvan palautteena (kuvatunnus).
//
//   johdanto · [kuvatunnus: "Palaute koskee kuvaa: …"] · kuvat (≤ 3) · paikka · vapaa teksti ·
//   KUVAN OIKEUDET (rasti "Kuva on itse ottamani…" + käyttölupa: Valitse… | sellaisenaan |
//   taustatieto; palautteessa piilossa, kunnes kuva on valittu) · nimimerkki · krediittirasti ·
//   sähköposti + seloste · [pro-tilarivi] · "Lähetä vinkki" / "Lähetä palaute" · tilarivi
//
// Lähetys: POST /kuvavinkki (Palautekanava.Postita). Pakollisuus kuten webissä ja workerissa:
// vinkki vaatii kuvan ja paikan; kuvan kanssa oikeusrasti ja käyttölupa. Pro-tuottajan
// muistissa oleva tunnus tarkistetaan kerran lomaketta rakennettaessa (/pro-tarkista), ja
// koodi kulkee mukana; epäonnistunut tarkistus = tavallinen pelaajan vinkki.
// Kuvanvalinta: Palautekanava.Kuvanvalitsin (Pelikoodarin iOS-kuvanvalitsin).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Kuvavinkki
    {
        /// <summary>Käyttöluvat: sama suljettu lista kuin workerissa (KAYTTOLUVAT).</summary>
        public static (string Arvo, string Nimi)[] Kayttoluvat => new (string Arvo, string Nimi)[]
        {
            ("sellaisenaan", Kieli.T("ui.kuvavinkki.kayttolupa-sellaisenaan")),
            ("taustatieto", Kieli.T("ui.kuvavinkki.kayttolupa-taustatieto")),
        };

        /// <summary>Web kuvavinkkiOsio: väkänen, lomake rakennetaan vasta avattaessa (pro-tarkistus on verkkopyyntö).</summary>
        public static Vakalohko Osio(VisualElement isa, string sivu) =>
            Lomake.Vakanen(isa, Kieli.T("ui.kuvavinkki.vinkkaa"), s => Rakenna(s, sivu: sivu));

        /// <summary>Web avaaKuvapalaute: sama lomake minipopupissa havainnekuvan tunnuksella.</summary>
        public static Minipopup AvaaKuvapalaute(string kuvatunnus, string kuvalahde, string sivu, int kerros = UiKerros.Valikot) =>
            Minipopup.Avaa(Kieli.T("ui.kuvavinkki.palaute-otsikko"), s => Rakenna(s, kuvatunnus, kuvalahde, sivu), "mk-kuvapalaute", kerros);

        /// <summary>Web kuvavinkkiLomake: ilman kuvatunnusta paikkavinkki, sen kanssa kuvapalaute.</summary>
        public static VisualElement Rakenna(VisualElement isa, string kuvatunnus = "", string kuvalahde = "", string sivu = "", Action onnistui = null)
        {
            bool palaute = !string.IsNullOrEmpty(kuvatunnus);
            var lohko = Rakenne.El("mk-palaute__kuvavinkki", isa, PickingMode.Ignore);

            Lomake.Teksti(lohko, palaute
                ? Kieli.T("ui.kuvavinkki.johdanto-palaute")
                : Kieli.T("ui.kuvavinkki.johdanto-vinkki"));
            if (palaute && !string.IsNullOrEmpty(kuvalahde))
                Lomake.Huomio(lohko, Kieli.T("ui.kuvavinkki.palaute-koskee", kuvalahde)).AddToClassList("mk-palaute__kursiivi");

            var kuvat = new Kuvavalinta(lohko, palaute
                ? Kieli.T("ui.kuvavinkki.oma-kuva-palaute", Palautekanava.Kuvia)
                : Kieli.T("ui.kuvavinkki.kuva-paikasta", Palautekanava.Kuvia), Palautekanava.Kuvia, Palautekanava.KuvavinkinSivu);
            var paikka = Lomake.Kentta(lohko, palaute
                ? Kieli.T("ui.kuvavinkki.paikka-palaute")
                : Kieli.T("ui.kuvavinkki.paikka-vinkki"));
            var teksti = Lomake.Kentta(lohko, palaute
                ? Kieli.T("ui.kuvavinkki.teksti-palaute")
                : Kieli.T("ui.kuvavinkki.teksti-vinkki"), Kenttalaji.Monirivi);

            // OIKEUDET: molemmat pakollisia, kun kuvia on mukana.
            var oikeudet = Rakenne.El("mk-palaute__oikeudet", lohko, PickingMode.Ignore);
            Lomake.Valiotsikko(oikeudet, Kieli.T("ui.kuvavinkki.oikeudet")).AddToClassList("mk-palaute__valiotsikko--alku");
            var oma = new Rasti(oikeudet, Kieli.T("ui.kuvavinkki.oma-kuva-rasti"));
            Lomake.Nimio(oikeudet, Kieli.T("ui.kuvavinkki.kayttolupa"));
            // Tyhjä ensimmäisenä, jotta valinta on oikeasti valinta (web "Valitse…").
            var luvat = new List<string> { Kieli.T("ui.kuvavinkki.valitse") };
            foreach (var l in Kayttoluvat) luvat.Add(l.Nimi);
            var lupa = Lomake.Valinta(oikeudet, luvat, 0);
            oikeudet.style.display = palaute ? DisplayStyle.None : DisplayStyle.Flex;
            string LupaArvo() => lupa.index > 0 ? Kayttoluvat[lupa.index - 1].Arvo : "";

            var nimimerkki = Lomake.Kentta(lohko, Kieli.T("ui.palaute.nimimerkki"));
            var krediitti = new Rasti(lohko, Kieli.T("ui.palaute.krediitti"));
            var posti = Lomake.Kentta(lohko, Kieli.T("ui.palaute.sahkoposti"), Kenttalaji.Sahkoposti);
            Lomake.Huomio(lohko, Kieli.T("ui.palaute.sahkoposti-seloste"));
            var proRivi = Lomake.Huomio(lohko, "");
            proRivi.style.display = DisplayStyle.None;

            Button nappi = null;
            Label huomio = null;

            // PRO-RIKASTUS: muistissa oleva pari tarkistetaan kerran; epäonnistuminen = tavallinen vinkki.
            string proKoodi = null;
            var muistissa = Palautekanava.ProTunnus();
            if (muistissa is (string mp, string mk))
            {
                Palautekanava.TarkistaPro(mp, mk, t =>
                {
                    if (!t.Ok) return;
                    if (lohko.panel == null && !palaute) return;
                    string nimi = MiniJson.Teksti(t.Data, "nimi") ?? "";
                    proKoodi = mk;
                    proRivi.style.display = DisplayStyle.Flex;
                    proRivi.text = Kieli.T("ui.kuvavinkki.pro-rivi", nimi.Length > 0 ? nimi : mp);
                    if (posti.value.Length == 0) posti.value = mp;
                    if (nimimerkki.value.Length == 0 && nimi.Length > 0) nimimerkki.value = nimi;
                });
            }

            kuvat.Muuttui += () =>
            {
                if (kuvat.Valitut.Count > 0) oikeudet.style.display = DisplayStyle.Flex;
                else if (palaute) oikeudet.style.display = DisplayStyle.None;
            };

            nappi = Lomake.Laheta(lohko, Kieli.T(palaute ? "ui.kuvavinkki.laheta-palaute" : "ui.kuvavinkki.laheta-vinkki"), () =>
            {
                // Puutteet lomakkeen järjestyksessä ylhäältä alas.
                bool onKuvia = kuvat.Valitut.Count > 0;
                if (!onKuvia && !palaute) { huomio.text = Kieli.T("ui.kuvavinkki.puute-kuva"); return; }
                if (palaute && !onKuvia && teksti.value.Trim().Length == 0) { huomio.text = Kieli.T("ui.kuvavinkki.puute-palaute"); teksti.Focus(); return; }
                if (!palaute && paikka.value.Trim().Length == 0) { huomio.text = Kieli.T("ui.kuvavinkki.puute-paikka"); paikka.Focus(); return; }
                if (onKuvia && !oma.Arvo) { huomio.text = Kieli.T("ui.kuvavinkki.puute-oikeudet"); return; }
                if (onKuvia && LupaArvo().Length == 0) { huomio.text = Kieli.T("ui.kuvavinkki.puute-lupa"); return; }

                nappi.SetEnabled(false);
                huomio.text = Kieli.T("ui.pulu.lahetetaan");
                var lahde = new List<string>();
                if (!string.IsNullOrEmpty(kuvalahde)) lahde.Add(kuvalahde);
                if (!string.IsNullOrEmpty(sivu)) lahde.Add(sivu);
                var kentat = new List<(string, string)>
                {
                    ("paikka", paikka.value.Trim()),
                    ("teksti", teksti.value.Trim()),
                    ("nimimerkki", nimimerkki.value.Trim()),
                    ("sahkoposti", posti.value.Trim()),
                    ("saaKrediitteihin", krediitti.Arvo ? "on" : ""),
                    ("omakuva", oma.Arvo ? "on" : ""),
                    ("kayttolupa", LupaArvo()),
                    ("kuvatunnus", kuvatunnus ?? ""),
                    // Lähderivi ja pelin näkymä samassa kentässä (työhuone näkee yhdellä silmäyksellä).
                    ("kuvalahde", string.Join(" · ", lahde)),
                    ("koodi", proKoodi ?? ""),
                };
                Palautekanava.Postita("/kuvavinkki", kentat, kuvat.Liitteet("kuvat"), t =>
                {
                    if (!t.Ok)
                    {
                        nappi.SetEnabled(true);
                        huomio.text = Palautekanava.Virheviesti(t);
                        return;
                    }
                    kuvat.Tyhjenna();
                    paikka.value = "";
                    teksti.value = "";
                    oma.Arvo = false;
                    lupa.index = 0;
                    if (palaute) oikeudet.style.display = DisplayStyle.None;
                    Lomake.Nimi(nappi, Kieli.T("ui.palaute.lahetetty"));
                    huomio.text = palaute
                        ? Kieli.T("ui.kuvavinkki.kiitos-palaute")
                        : Kieli.T("ui.kuvavinkki.kiitos-vinkki");
                    onnistui?.Invoke();
                });
            });
            huomio = Lomake.Huomio(lohko, "");
            return lohko;
        }
    }
}
