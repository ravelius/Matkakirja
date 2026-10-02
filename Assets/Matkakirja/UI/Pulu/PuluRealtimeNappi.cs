// PULUN ÄÄNIKESKUSTELUN KOENAPPI chatissa (Pelikoodari 28.9.2026; web js/pollo.js rakennaSyote .pollo-realtime-koe,
// vaihdaRealtime, puluRealtimeKoeNakyvissa, REALTIME_NAPPI_TEKSTIT).
//
// Erillinen luokka, jotta PuluChat.cs:ään tulee vain kolme kutsua (rakennus, avaus, sulku): Natiivi-UI muokkaa
// samaa tiedostoa rinnakkaisissa haaroissa. Nappi on syötteessä sanelun tilarivin jälkeen ja ennen kirjoitusriviä
// kuten webissä, ja näkyy VAIN kehittäjätilassa pöllön kehittäjäkoodin kanssa (worker vaatii koodin reitille;
// webissä ehto on kehittäjätila + välityspalvelin, natiivissa palvelin on aina). Pelaajan Pulu on edelleen chat.
//
// Keskustelu itse: Scripts/Peli/PuluRealtime.cs. Tekstitykset chattiin kuten webissä: pelaajan kupla "…"
// vuoron päättyessä ja kuultu teksti sen tilalle, Pulun transkripti paloina omaan kuplaansa, virheet rivinä.
using System;
using Matkakirja.Peli;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PuluRealtimeNappi
    {
        /// <summary>Chatin nappi (kehittäjäkomento pulu realtime käyttää samaa polkua, jos chat on rakennettu).</summary>
        public static PuluRealtimeNappi Nykyinen { get; private set; }

        /// <summary>Web puluRealtimeKoeNakyvissa: kehittäjätila ja pöllön kehittäjäkoodi.</summary>
        public static bool Nakyvissa => Asetukset.Kehittaja && !string.IsNullOrEmpty(Asetukset.PolloKoodi);

        readonly Button nappi;
        readonly Label teksti;
        readonly Func<string, string, Label> viesti;
        readonly Func<string> konteksti;
        readonly Action lopetaSanelu;
        Label kayttajaKupla, puluKupla;

        /// <param name="isa">chatin syöte (sanelun tilarivin jälkeen)</param>
        /// <param name="viesti">PuluChat.Viesti(luokka, teksti): kupla virtaan ja vieritys</param>
        /// <param name="konteksti">PuluChat.Konteksti(): sama pelin konteksti kuin chatissa (web this.konteksti())</param>
        /// <param name="lopetaSanelu">PuluChat.LopetaSanelu (web vaihdaRealtime: sanelu pois ensin)</param>
        /// <param name="isa">Chatin alarivi (näppäimistön ja mikrofonin rinnalla, omistaja 2.10.2026 klo 13.53; web #3849).</param>
        public PuluRealtimeNappi(VisualElement isa, Func<string, string, Label> viesti, Func<string> konteksti, Action lopetaSanelu)
        {
            this.viesti = viesti;
            this.konteksti = konteksti;
            this.lopetaSanelu = lopetaSanelu;
            nappi = Rakenne.Nappi(PuluRealtimeLogiikka.NappiTeksti(RealtimeTila.Valmis), "mk-chat__nappula mk-chat__realtime", Vaihda, isa);
            teksti = nappi.Q<Label>(className: "mk-nappi__teksti");
            var rt = PuluRealtime.Hae();
            rt.TilaMuuttui += Merkitse;
            rt.KayttajaAlku += () =>
            {
                // Kupla paikalleen heti vuoron päättyessä (tekstitys tulee vasta Pulun vastauksen alettua).
                kayttajaKupla = viesti("mk-chat__pelaaja", "…");
                puluKupla = null;
            };
            rt.Kayttaja += t =>
            {
                if (string.IsNullOrEmpty(t)) return;
                if (kayttajaKupla != null) kayttajaKupla.text = t;
                else viesti("mk-chat__pelaaja", t);
                kayttajaKupla = null;
            };
            rt.PuluPala += pala =>
            {
                if (puluKupla == null) puluKupla = viesti("mk-chat__livia", "");
                puluKupla.text += pala;
            };
            rt.PuluValmis += () => puluKupla = null;
            rt.Virhe += v => viesti("mk-chat__livia mk-chat__realtime-virhe", v);
            Asetukset.Muuttui += _ => PaivitaNakyvyys();
            Nykyinen = this;
            Merkitse(rt.Tila);
        }

        /// <summary>Näkyvyys tarkistetaan myös avatessa (web avaa: realtimeNappi.hidden). Käynnissä oleva näkyy aina.</summary>
        public void PaivitaNakyvyys()
        {
            bool nayta = Nakyvissa || (PuluRealtime.Instanssi?.Kaynnissa ?? false);
            nappi.style.display = nayta ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Napin vipu (web vaihdaRealtime): käynnissä → lopeta; muuten sanelu ja luenta pois ja aloitus.</summary>
        public void Vaihda()
        {
            var rt = PuluRealtime.Hae();
            if (rt.Kaynnissa) { rt.Lopeta(); return; }
            lopetaSanelu?.Invoke();
            kayttajaKupla = puluKupla = null;
            rt.Aloita(konteksti?.Invoke() ?? "");
        }

        /// <summary>Chatin sulkeutuessa (web sulje: this.realtime?.lopeta()).</summary>
        public void Lopeta() => PuluRealtime.Instanssi?.Lopeta();

        void Merkitse(RealtimeTila tila)
        {
            teksti.text = PuluRealtimeLogiikka.NappiTeksti(tila);
            nappi.EnableInClassList("mk-chat__realtime--paalla", tila != RealtimeTila.Valmis);
            if (tila == RealtimeTila.Valmis) kayttajaKupla = puluKupla = null;
            PaivitaNakyvyys();
        }
    }
}
