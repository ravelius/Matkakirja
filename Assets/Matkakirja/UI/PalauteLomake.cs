// PALAUTE JA EHDOTUKSET (Natiivi-UI): webin ui.js palauteKentat / lisaaEhdotusOsio /
// naytaPalauteKulmasta / periaatePalaute ja js/ehdotukset.js ehdotusOsio natiivina.
//
// Webin kulku (origin/main 24.9.2026):
//   hampurilainen "ehdota sisältöä" (#palaute-kulma) → dialogi "Kerro mitä huomasit":
//     palauteKentat(tilanne). PALAUTE_LOMAKE on webissä tyhjä, joten vapaata palauteviestiä,
//     sähköpostikenttää ja "Lähetä palautetta" -nappia EI näytetä (omistajan päätös 18.8.2026:
//     ehdotuskanava on ainoa palautetie) — lomake on suoraan lisaaEhdotusOsio:
//       1. retkikuntaOsio  (natiivissa päävalikon RETKIKUNTA-paikassa, UI/Sahke/SahkeNakyma)
//       2. ehdotusosio: johdanto, kuvat (≤ 3), juttuidea, "Ehdotus kohdistuu sivulle: …",
//          tarkennus, nimimerkki, krediittirasti, sähköposti + seloste, lisenssivakuutus
//          (näkyy, kun kuvia on valittu), pro-hakurasti + i, "Lähetä ehdotus", tilarivi
//       3. väkänen "Vinkkaa paikasta kuvalla" (Kuvavinkki.cs)
//       4. väkänen "Olen jo pro-tuottaja — kirjaudu" (ProOsio.cs)
//     "Takaisin peliin" sulkee; napautus taustaan sulkee.
//   Periaatteet ("Oppiminen on hauskaa") → periaatePalaute: väliotsikko "Palaute ja mukaan",
//     kaksi kappaletta ja sama palauteKentat('') GitHub-linkin jälkeen, ennen oikeusriviä.
//
// Tilanne (web palauteTilanne): "Maailman aarrekartta · Kaupunki", ja ehdotuksen sivuun
// (ehdotusSivu) perään auki olevan lehden sivun nimi.
// Lähetys: Palautekanava (worker, reitit, natiivin tunniste, 403-huomio).
// Tyylit: Matkakirja.uss "palaute ja ehdotukset" (web .periaate-kentta, -rasti, -nimio, -huomio).
using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class PalauteLomake
    {
        /// <summary>Web palauteTilanne: lauta ja kaupunki selkokielellä (näkyy pelaajalle).</summary>
        public static string Tilanne()
        {
            var osat = new List<string>();
            var o = PeliOhjain.Instanssi;
            if (o?.Matka != null)
            {
                osat.Add("Maailman aarrekartta");
                var s = o.Matka.Tila.Pelaaja.Sijainti;
                if (s.Kaupungissa && UiSisalto.Kaupunki(s.Kaupunki)?.Nimi is string nimi) osat.Add(nimi);
            }
            return string.Join(" · ", osat);
        }

        /// <summary>Web ehdotusSivu: tilanne (tai nykytila) ja auki olevan lehden sivu.</summary>
        public static string EhdotusSivu(string tilanne)
        {
            var osat = new List<string>();
            string t = string.IsNullOrEmpty(tilanne) ? Tilanne() : tilanne;
            if (!string.IsNullOrEmpty(t)) osat.Add(t);
            string sivu = UiNakymat.Olemassa ? UiNakymat.Hae().Lehti?.AukiSivunNimi : null;
            if (!string.IsNullOrEmpty(sivu)) osat.Add(sivu);
            return string.Join(" · ", osat);
        }

        /// <summary>Lomakkeen osat (testikomento vierittää ja avaa väkäsiä).</summary>
        public sealed class Osat
        {
            public VisualElement Ehdotus;
            public Vakalohko Kuvavinkki, Pro;
        }

        /// <summary>
        /// Web palauteKentat(tilanne), kun PALAUTE_LOMAKE on tyhjä: ehdotusosio, kuvavinkki ja
        /// pro-kirjautuminen. kerros = lomakkeen UI-kerros (minipopup avautuu samaan kerrokseen).
        /// </summary>
        public static Osat Kentat(VisualElement isa, string tilanne, int kerros)
        {
            string sivu = EhdotusSivu(tilanne);
            return new Osat
            {
                Ehdotus = EhdotusOsio(isa, sivu, kerros),
                Kuvavinkki = Kuvavinkki.Osio(isa, sivu),
                Pro = ProOsio.Rakenna(isa),
            };
        }

        /// <summary>Web periaatePalaute: periaateikkunan palautelohko.</summary>
        public static VisualElement PeriaateLohko(VisualElement isa, int kerros)
        {
            var lohko = Rakenne.El("mk-palaute", isa, PickingMode.Ignore);
            Lomake.Valiotsikko(lohko, "Palaute ja mukaan").AddToClassList("mk-palaute__valiotsikko--alku");
            Lomake.Teksti(lohko, "Jos tämä peli kiinnostaa, lähetä palautetta. "
                + "Voit myös osallistua pelin kehittämiseen — sisältöä, kuvia, "
                + "kysymyksiä tai koodia.");
            Lomake.Teksti(lohko, "Valikossa on nappi \"ehdota sisältöä\". Sitä "
                + "napauttamalla voit lähettää palautetta juuri siitä kohdasta, "
                + "jossa olet — kätevää etenkin, jos jokin näyttää menneen vikaan.");
            Kentat(lohko, "", kerros);
            return lohko;
        }

        /// <summary>Web ehdotusOsio + proHakuRasti ennen lähetysnappia.</summary>
        static VisualElement EhdotusOsio(VisualElement isa, string sivu, int kerros)
        {
            var lohko = Rakenne.El("mk-palaute__osio", isa, PickingMode.Ignore);
            Lomake.Teksti(lohko, "Näitkö matkallasi kuvan tai aiheen, joka kuuluisi "
                + "johonkin pelin lehteen? Lähetä se tästä. Tiimi käy ehdotuksesi läpi "
                + "ja kaikki hyvät ja sopivat muutokset lisätään peliin. Mikäli haluat "
                + "lisätä peliin enemmän sisältöä, voit hakea pro-sisällöntuottaja "
                + "statusta.");
            var kuvat = new Kuvavalinta(lohko, $"Kuvat (enintään {Palautekanava.Kuvia})", Palautekanava.Kuvia, Palautekanava.EhdotuksenSivu);
            var teksti = Lomake.Kentta(lohko, "Juttuidea tai kuvateksti — mistä kuva on ja miksi se sopisi lehteen?", Kenttalaji.Monirivi);
            Lomake.Huomio(lohko, !string.IsNullOrEmpty(sivu)
                ? "Ehdotus kohdistuu sivulle: " + sivu
                : "Ehdotus kohdistuu koko peliin (et ole juuri nyt lehdessä).");
            var tarkenne = Lomake.Kentta(lohko, "Tarkennus: mille sivulle tai osastolle? (vapaaehtoinen)");
            var nimimerkki = Lomake.Kentta(lohko, "Nimi tai nimimerkki (vapaaehtoinen)");
            var krediitti = new Rasti(lohko, "Nimeni saa näkyä pelin krediiteissä");
            var posti = Lomake.Kentta(lohko, "Sähköposti (vapaaehtoinen)", Kenttalaji.Sahkoposti);
            Lomake.Huomio(lohko, "Sähköposti on vain ilmoitusta varten — sitä ei julkaista eikä käytetä mihinkään muuhun.");
            var lisenssi = new Rasti(lohko, "Kuva on ottamani tai minulla on oikeus antaa se peliin, ja se saa julkaista "
                + "pelissä tekijän nimellä (CC BY -henkisesti).");
            lisenssi.Nayta(false);
            var proHaku = ProOsio.HakuRasti(lohko, kerros);
            Button nappi = null;
            Label huomio = null;
            kuvat.Muuttui += () => lisenssi.Nayta(kuvat.Valitut.Count > 0);

            nappi = Lomake.Laheta(lohko, "Lähetä ehdotus", () =>
            {
                string idea = teksti.value.Trim();
                if (kuvat.Valitut.Count == 0 && idea.Length == 0)
                {
                    huomio.text = "Kirjoita juttuidea tai valitse kuva.";
                    teksti.Focus();
                    return;
                }
                // Hakemus kulkee ehdotuksen tekstin etuliitteenä ja vaatii sähköpostin.
                if (proHaku.Arvo && posti.value.Trim().Length == 0)
                {
                    huomio.text = "Jätä sähköpostisi, jotta pro-hakemukseesi voi vastata.";
                    posti.Focus();
                    return;
                }
                if (kuvat.Valitut.Count > 0 && !lisenssi.Arvo)
                {
                    huomio.text = "Vahvista vielä, että kuvan saa julkaista.";
                    return;
                }
                nappi.SetEnabled(false);
                huomio.text = "Lähetetään…";
                var kentat = new List<(string, string)>
                {
                    ("laji", ""),
                    ("teksti", (proHaku.Arvo ? "[Pro-hakemus] " : "") + idea),
                    ("sivu", sivu ?? ""),
                    ("tarkenne", tarkenne.value.Trim()),
                    ("nimimerkki", nimimerkki.value.Trim()),
                    ("sahkoposti", posti.value.Trim()),
                    ("saaKrediitteihin", krediitti.Arvo ? "on" : ""),
                    ("lisenssivakuutus", lisenssi.Arvo ? "on" : ""),
                };
                Palautekanava.Postita("/laheta", kentat, kuvat.Liitteet("kuvat"), t =>
                {
                    if (!t.Ok)
                    {
                        nappi.SetEnabled(true);
                        huomio.text = Palautekanava.Virheviesti(t);
                        return;
                    }
                    teksti.value = "";
                    tarkenne.value = "";
                    kuvat.Tyhjenna();
                    lisenssi.Nayta(false);
                    Lomake.Nimi(nappi, "Lähetetty");
                    // Palkkiosta kerrotaan vasta onnistumisen jälkeen (päätoimittaja 18.8.2026).
                    huomio.text = "Kiitos! Ehdotus on perillä. Jos ehdotuksesi päätyy "
                        + "lehteen, saat palkkioksi pelirahaa — jätä sähköpostisi niin kuulet siitä.";
                });
            });
            huomio = Lomake.Huomio(lohko, "");
            return lohko;
        }
    }

    /// <summary>
    /// "Kerro mitä huomasit" (web naytaPalauteKulmasta, .palaute-lappu): pergamenttikortti
    /// himmennyksen päällä, lomake vierittyy, "Takaisin peliin" alhaalla. Lomake rakennetaan
    /// joka avauksella uudelleen, jotta tilanne ja lehden sivu ovat ajan tasalla (web luo
    /// dialogin joka kerta).
    /// </summary>
    public sealed class PalauteIkkuna
    {
        readonly VisualElement himmennys;
        readonly ScrollView vieritys;
        PalauteLomake.Osat osat;

        public bool Auki { get; private set; }

        public PalauteIkkuna(UiKerros kerros)
        {
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            var kortti = new Kortti("mk-tietoja mk-palaute-ikkuna");
            himmennys.Add(kortti);
            var otsikko = Rakenne.Teksti("Kerro mitä huomasit", "mk-kortti__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-tietoja__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            var takaisin = Rakenne.Nappi("Takaisin peliin", "mk-nappi--haamu", Sulje, napit);
            Kirjasimet.Aseta(takaisin, Kirjasin.KoneLihava);
        }

        /// <summary>Avaa lomakkeen. kohta (testikomento): ehdotus | kuvavinkki | pro vierittää sinne.</summary>
        public void Avaa(string kohta = null)
        {
            if (!Auki)
            {
                Auki = true;
                Aanet.PulunTehoste("paper");
                vieritys.Clear();
                osat = PalauteLomake.Kentat(vieritys, PalauteLomake.Tilanne(), UiKerros.Valikot);
                vieritys.scrollOffset = Vector2.zero;
                // Web avaa lomakkeen showModalilla top-layeriin, auki olevan lehden päälle: valikkokerros
                // nousee lehden (ja lehden ajaksi nostetun pulun) yläpuolelle lomakkeen ajaksi.
                UiKerros.Hae().AsetaJarjestys(UiKerros.Valikot, UiKerros.Traileri + 4);
                Rakenne.Nayta(himmennys, true, 320);
                SyoteLukko.Esta(this);
            }
            VisualElement kohde = null;
            switch (kohta)
            {
                case "ehdotus": kohde = osat.Ehdotus; break;
                case "kuvavinkki": osat.Kuvavinkki.Avaa(); kohde = osat.Kuvavinkki.Lohko; break;
                case "pro": osat.Pro.Avaa(); kohde = osat.Pro.Lohko; break;
            }
            if (kohde != null) Rakenne.Vierita(vieritys, kohde, 350);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
            UiKerros.Hae().Juuri(UiKerros.Valikot).focusController?.focusedElement?.Blur();
            // Kerros palaa paikalleen vasta häivytyksen jälkeen, ettei lomake putoa lehden alle kesken häivytyksen.
            himmennys.schedule.Execute(() => { if (!Auki) UiKerros.Hae().AsetaJarjestys(UiKerros.Valikot, UiKerros.Valikot); }).StartingIn(260);
        }
    }

    // --- lomakkeen rakennuspalat (pergamentilla) --------------------------------------------

    public enum Kenttalaji { Rivi, Monirivi, Sahkoposti, Osoite }

    /// <summary>Lomakkeen palat: web .periaate-teksti, -valiotsikko, -nimio, -huomio, -kentta, -laheta, details.</summary>
    public static class Lomake
    {
        public static Label Teksti(VisualElement isa, string teksti)
        {
            var l = Rakenne.Teksti(teksti, "mk-palaute__teksti", isa);
            Kirjasimet.Aseta(l, Kirjasin.Luku);
            return l;
        }

        public static Label Valiotsikko(VisualElement isa, string teksti)
        {
            var l = Rakenne.Teksti(teksti.ToUpperInvariant(), "mk-palaute__valiotsikko", isa);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            return l;
        }

        public static Label Nimio(VisualElement isa, string teksti)
        {
            var l = Rakenne.Teksti(teksti, "mk-palaute__nimio", isa);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            return l;
        }

        public static Label Huomio(VisualElement isa, string teksti)
        {
            var l = Rakenne.Teksti(teksti, "mk-palaute__huomio", isa);
            Kirjasimet.Aseta(l, Kirjasin.Luku);
            return l;
        }

        public static TextField Kentta(VisualElement isa, string vihje, Kenttalaji laji = Kenttalaji.Rivi, int katto = 0)
        {
            var k = new TextField { multiline = laji == Kenttalaji.Monirivi };
            if (katto > 0) k.maxLength = katto;
            k.AddToClassList("mk-palaute__kentta");
            if (laji == Kenttalaji.Monirivi) k.AddToClassList("mk-palaute__kentta--iso");
            k.textEdition.placeholder = vihje;
            Rakenne.VapautaNappaimistonSulkeutuessa(k);
            k.keyboardType = laji == Kenttalaji.Sahkoposti ? TouchScreenKeyboardType.EmailAddress
                : laji == Kenttalaji.Osoite ? TouchScreenKeyboardType.URL : TouchScreenKeyboardType.Default;
            Kirjasimet.Aseta(k, Kirjasin.Kone);
            isa.Add(k);
            return k;
        }

        /// <summary>Lähetysnappi (web button.primary.periaate-laheta: koko leveys, kulta).</summary>
        public static Button Laheta(VisualElement isa, string teksti, Action painettu)
        {
            var b = Rakenne.Nappi(teksti, "mk-nappi--kulta mk-palaute__laheta", painettu, isa);
            Rakenne.Tausta(b, Kuviot.Kulta);
            Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
            return b;
        }

        /// <summary>Toissijainen nappi paperilla (web .pro-ulos).</summary>
        public static Button Toissijainen(VisualElement isa, string teksti, Action painettu)
        {
            var b = Rakenne.Nappi(teksti, "mk-palaute__toissijainen", painettu, isa);
            Kirjasimet.Aseta(b, Kirjasin.Kone);
            return b;
        }

        public static void Nimi(Button b, string teksti)
        {
            var l = b.Q<Label>(className: "mk-nappi__teksti");
            if (l != null) l.text = teksti;
        }

        /// <summary>Web select: valinta listasta (DropdownField), indeksi = vaihtoehdon järjestys.</summary>
        public static DropdownField Valinta(VisualElement isa, List<string> nimet, int oletus = 0)
        {
            var d = new DropdownField(nimet, oletus);
            d.AddToClassList("mk-palaute__valinta");
            Kirjasimet.Aseta(d, Kirjasin.Kone);
            isa.Add(d);
            return d;
        }

        /// <summary>
        /// Web details/summary: väkänen ja versaaliotsikko, sisältö piilossa. rakenna ajetaan
        /// ensimmäisellä avauksella (web kuvavinkkiOsio) tai heti (heti = true).
        /// </summary>
        public static Vakalohko Vakanen(VisualElement isa, string otsikko, Action<VisualElement> rakenna, bool heti = false)
            => new Vakalohko(isa, otsikko, rakenna, heti);
    }

    /// <summary>Taitettava osio (web details.periaate-ehdotus).</summary>
    public sealed class Vakalohko
    {
        public readonly VisualElement Lohko, Sisus;
        readonly Button nappi;
        readonly Action<VisualElement> rakenna;
        bool rakennettu;

        public bool Auki => nappi.ClassListContains("mk-auki");

        public Vakalohko(VisualElement isa, string otsikko, Action<VisualElement> rakenna, bool heti)
        {
            this.rakenna = rakenna;
            Lohko = Rakenne.El("mk-palaute__osio", isa, PickingMode.Ignore);
            nappi = Rakenne.Nappi(null, "mk-palaute__vakanappi", () => Aseta(!Auki), Lohko);
            Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-palaute__vakanen", nappi), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko.ToUpperInvariant(), "mk-palaute__vakaotsikko", nappi), Kirjasin.Kone);
            Sisus = Rakenne.El("mk-palaute__vakasisus", Lohko, PickingMode.Ignore);
            Sisus.style.display = DisplayStyle.None;
            if (heti) Rakenna();
        }

        public void Avaa() => Aseta(true);

        void Aseta(bool auki)
        {
            nappi.EnableInClassList("mk-auki", auki);
            Sisus.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (auki) Rakenna();
        }

        void Rakenna()
        {
            if (rakennettu) return;
            rakennettu = true;
            rakenna?.Invoke(Sisus);
        }
    }

    /// <summary>Rasti ja teksti (web label.periaate-rasti + checkbox): napautus koko riviin vaihtaa.</summary>
    public sealed class Rasti : VisualElement
    {
        bool arvo;
        public event Action<bool> Muuttui;

        public Rasti(VisualElement isa, string teksti, string luokka = null)
        {
            AddToClassList("mk-palaute__rasti");
            Rakenne.Luokat(this, luokka);
            var ruutu = Rakenne.El("mk-palaute__ruutu", this, PickingMode.Ignore);
            Rakenne.El("mk-palaute__ruksi", ruutu, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-palaute__rastiteksti", this), Kirjasin.Kone);
            this.AddManipulator(new Clickable(() => Arvo = !arvo));
            isa?.Add(this);
        }

        public bool Arvo
        {
            get => arvo;
            set
            {
                if (arvo == value) return;
                arvo = value;
                EnableInClassList("mk-valittu", arvo);
                Muuttui?.Invoke(arvo);
            }
        }

        public void Nayta(bool nakyy) => style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
    }

    /// <summary>
    /// Kuvien valinta (web input[type=file] + skaalaaEhdotusKuva): nimiö, nappi ja tilarivi
    /// ("n kuvaa valmiina (x Mt)."). Valinta kulkee Palautekanava.Kuvanvalitsimen kautta.
    /// </summary>
    public sealed class Kuvavalinta
    {
        public readonly List<Liitekuva> Valitut = new List<Liitekuva>();
        public readonly Label Tieto;
        public event Action Muuttui;
        readonly int enintaan, sivu;
        readonly bool yksi;

        public Kuvavalinta(VisualElement isa, string nimio, int enintaan, int sivu)
        {
            this.enintaan = enintaan;
            this.sivu = sivu;
            yksi = enintaan == 1;
            Lomake.Nimio(isa, nimio);
            var nappi = Rakenne.Nappi(yksi ? "Valitse kuva" : "Valitse kuvat", "mk-palaute__kuvanappi", Valitse, isa);
            Kirjasimet.Aseta(nappi, Kirjasin.Kone);
            Tieto = Lomake.Huomio(isa, "");
        }

        void Valitse()
        {
            // Pelikoodarin Scripts/Peli/Kuvanvalitsin.cs asettaa Palautekanava.Kuvanvalitsin iOS-laitteella;
            // editorissa ja ilman liitännäistä kuvia ei voi valita.
            if (Palautekanava.Kuvanvalitsin == null)
            {
                Tieto.text = "Kuvan valinta ei vielä toimi tässä sovelluksessa.";
                return;
            }
            Palautekanava.Kuvanvalitsin(enintaan, sivu, kuvat => UiKerros.PaaSaikeessa(() => Aseta(kuvat)));
        }

        void Aseta(List<Liitekuva> kuvat)
        {
            // Peruttu valinta (tai latausvirhe, jonka syy on lokissa "MATKAKIRJA kuvat:") ei muuta mitään:
            // webin tiedostokenttä ei saa change-tapahtumaa perumisesta, joten aiemmat kuvat jäävät voimaan.
            if (kuvat == null || kuvat.Count == 0) return;
            Valitut.Clear();
            if (kuvat.Count > enintaan)
                Tieto.text = $"Valitse enintään {enintaan} kuvaa.";
            else
            {
                long tavut = 0;
                foreach (var k in kuvat) { if (k?.Tavut == null) continue; Valitut.Add(k); tavut += k.Tavut.Length; }
                string megat = (tavut / (1024.0 * 1024.0)).ToString("0.0", CultureInfo.InvariantCulture);
                Tieto.text = yksi ? $"Kuva valmiina ({megat} Mt)." : $"{Valitut.Count} kuvaa valmiina ({megat} Mt).";
            }
            Muuttui?.Invoke();
        }

        public void Tyhjenna()
        {
            Valitut.Clear();
            Tieto.text = "";
            Muuttui?.Invoke();
        }

        /// <summary>Kuvat lomakekenttinä samalla nimellä (web lomake.append(nimi, kuva)).</summary>
        public List<(string, Liitekuva)> Liitteet(string nimi)
        {
            var l = new List<(string, Liitekuva)>();
            foreach (var k in Valitut) l.Add((nimi, k));
            return l;
        }
    }
}
