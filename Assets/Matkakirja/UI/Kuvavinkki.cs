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
// Kuvanvalinta: Palautekanava.Kuvanvalitsin (iOS-liitännäinen puuttuu vielä).
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
        public static readonly (string Arvo, string Nimi)[] Kayttoluvat =
        {
            ("sellaisenaan", "Kuvaa saa käyttää pelissä sellaisenaan"),
            ("taustatieto", "Vain taustatiedoksi kohteesta — kuvaa ei julkaista"),
        };

        /// <summary>Web kuvavinkkiOsio: väkänen, lomake rakennetaan vasta avattaessa (pro-tarkistus on verkkopyyntö).</summary>
        public static Vakalohko Osio(VisualElement isa, string sivu) =>
            Lomake.Vakanen(isa, "Vinkkaa paikasta kuvalla", s => Rakenna(s, sivu: sivu));

        /// <summary>Web avaaKuvapalaute: sama lomake minipopupissa havainnekuvan tunnuksella.</summary>
        public static Minipopup AvaaKuvapalaute(string kuvatunnus, string kuvalahde, string sivu, int kerros = UiKerros.Valikot) =>
            Minipopup.Avaa("Lähetä palautetta tästä kuvasta", s => Rakenna(s, kuvatunnus, kuvalahde, sivu), "mk-kuvapalaute", kerros);

        /// <summary>Web kuvavinkkiLomake: ilman kuvatunnusta paikkavinkki, sen kanssa kuvapalaute.</summary>
        public static VisualElement Rakenna(VisualElement isa, string kuvatunnus = "", string kuvalahde = "", string sivu = "", Action onnistui = null)
        {
            bool palaute = !string.IsNullOrEmpty(kuvatunnus);
            var lohko = Rakenne.El("mk-palaute__kuvavinkki", isa, PickingMode.Ignore);

            Lomake.Teksti(lohko, palaute
                ? "Kerro, mikä kuvassa on pielessä — tai lähetä oma valokuvasi "
                  + "kohteesta. Molemmat auttavat: teksti kertoo mitä korjata, kuva "
                  + "näyttää sen."
                : "Näitkö paikan, joka kuuluisi peliin? Muistolaatta, patsas, "
                  + "rakennus tai näkymä — lähetä kuva ja kerro, missä se on. "
                  + "Tiimi käy vinkit läpi.");
            if (palaute && !string.IsNullOrEmpty(kuvalahde))
                Lomake.Huomio(lohko, "Palaute koskee kuvaa: " + kuvalahde).AddToClassList("mk-palaute__kursiivi");

            var kuvat = new Kuvavalinta(lohko, palaute
                ? $"Oma valokuvasi kohteesta (vapaaehtoinen, enintään {Palautekanava.Kuvia})"
                : $"Kuva paikasta (enintään {Palautekanava.Kuvia})", Palautekanava.Kuvia, Palautekanava.KuvavinkinSivu);
            var paikka = Lomake.Kentta(lohko, palaute
                ? "Paikka tai kaupunki (vapaaehtoinen)"
                : "Paikka ja kaupunki — esim. \"Ritavuoren muistolaatta, Helsinki\"");
            var teksti = Lomake.Kentta(lohko, palaute
                ? "Mikä kuvassa ei vastaa todellisuutta?"
                : "Mikä paikka tämä on ja miksi se kiinnostaisi? (vapaaehtoinen)", Kenttalaji.Monirivi);

            // OIKEUDET: molemmat pakollisia, kun kuvia on mukana.
            var oikeudet = Rakenne.El("mk-palaute__oikeudet", lohko, PickingMode.Ignore);
            Lomake.Valiotsikko(oikeudet, "Kuvan oikeudet").AddToClassList("mk-palaute__valiotsikko--alku");
            var oma = new Rasti(oikeudet, "Kuva on itse ottamani ja omistan siihen oikeudet.");
            Lomake.Nimio(oikeudet, "Käyttölupa");
            // Tyhjä ensimmäisenä, jotta valinta on oikeasti valinta (web "Valitse…").
            var luvat = new List<string> { "Valitse…" };
            foreach (var l in Kayttoluvat) luvat.Add(l.Nimi);
            var lupa = Lomake.Valinta(oikeudet, luvat, 0);
            oikeudet.style.display = palaute ? DisplayStyle.None : DisplayStyle.Flex;
            string LupaArvo() => lupa.index > 0 ? Kayttoluvat[lupa.index - 1].Arvo : "";

            var nimimerkki = Lomake.Kentta(lohko, "Nimi tai nimimerkki (vapaaehtoinen)");
            var krediitti = new Rasti(lohko, "Nimeni saa näkyä pelin krediiteissä");
            var posti = Lomake.Kentta(lohko, "Sähköposti (vapaaehtoinen)", Kenttalaji.Sahkoposti);
            Lomake.Huomio(lohko, "Sähköposti on vain ilmoitusta varten — sitä ei julkaista eikä "
                + "käytetä mihinkään muuhun.");
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
                    proRivi.text = $"Lähetät pro-tuottajana: {(nimi.Length > 0 ? nimi : mp)}. Kuva merkitään pro-lähteeksi.";
                    if (posti.value.Length == 0) posti.value = mp;
                    if (nimimerkki.value.Length == 0 && nimi.Length > 0) nimimerkki.value = nimi;
                });
            }

            kuvat.Muuttui += () =>
            {
                if (kuvat.Valitut.Count > 0) oikeudet.style.display = DisplayStyle.Flex;
                else if (palaute) oikeudet.style.display = DisplayStyle.None;
            };

            nappi = Lomake.Laheta(lohko, palaute ? "Lähetä palaute" : "Lähetä vinkki", () =>
            {
                // Puutteet lomakkeen järjestyksessä ylhäältä alas.
                bool onKuvia = kuvat.Valitut.Count > 0;
                if (!onKuvia && !palaute) { huomio.text = "Valitse kuva paikasta, josta haluat vinkata."; return; }
                if (palaute && !onKuvia && teksti.value.Trim().Length == 0) { huomio.text = "Kirjoita palaute tai liitä kuva."; teksti.Focus(); return; }
                if (!palaute && paikka.value.Trim().Length == 0) { huomio.text = "Kerro, missä paikka on."; paikka.Focus(); return; }
                if (onKuvia && !oma.Arvo) { huomio.text = "Vahvista vielä, että kuva on itse ottamasi ja omistat oikeudet."; return; }
                if (onKuvia && LupaArvo().Length == 0) { huomio.text = "Valitse, saako kuvaa käyttää pelissä vai onko se vain taustatietoa."; return; }

                nappi.SetEnabled(false);
                huomio.text = "Lähetetään…";
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
                    Lomake.Nimi(nappi, "Lähetetty");
                    huomio.text = palaute
                        ? "Kiitos! Palaute on perillä ja se luetaan. Jos kuva on pielessä, se korjataan."
                        : "Kiitos! Vinkki on perillä. Tiimi käy sen läpi — jätä sähköpostisi, "
                          + "niin kuulet jos paikka päätyy peliin.";
                    onnistui?.Invoke();
                });
            });
            huomio = Lomake.Huomio(lohko, "");
            return lohko;
        }
    }
}
