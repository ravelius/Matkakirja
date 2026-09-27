// PELIOHJAIN: PELISTREAK (talous 5b, omistaja 27.9.2026; web js/ui.js run() ja js/game.js
// kirjaaPelipaiva). Pelilogiikka on Peli/Pelistreak.cs:ssä ja Matka.KirjaaPelipaiva:ssa; tämä
// osa antaa laitteen paikallisen päivän ja kytkee tuloksen Natiivi-UI:lle:
//   Pelistreak(pituus, otsikko, ala) — palkittu pelipäivä (toast; web tilanne 'peli.streak',
//                                      icon 'kukkaro'): "Kolmas päivä peräkkäin matkalla", "+20 £"
//   PelistreakNyt                    — pelaajan putki (Paiva, Pituus) tai null (esim. kassarivi)
// Kukkaroleiman syy (RahaMuuttui) on putken otsikko, ellei teolla ole omaa punta-riviä.
//
// KIRJAUS: web kirjaa jokaisen onnistuneen run()-teon jälkeen (ei lähtövalinnassa). Natiivissa ei
// ole yhtä keskitettyä tekopolkua, joten kirjaus on tekojen omissa onnistumispoluissa juuri ennen
// Tallenna():a: Matkusta (liike, siirto, lento), Heitto (HeitaJaValitse), Meri-valinta, Odota,
// Tutki, EtsiKatko, KysymysTeko (vastaus, vihje, 50:50) ja KauppaTeko (lehti, pulu, sähke,
// mannerlento). Tekijä otetaan ennen tekoa (web: vuoro voi vaihtua teon aikana).
using System;
using System.Globalization;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Pelipäiväputki palkitsi (Matka.Pelistreak): (pituus, otsikko, ala), esim.
        /// (7, "Seitsemäs päivä peräkkäin matkalla", "+50 £ ja viikkobonus +100 £").
        /// Vain kun palkkio &gt; 0 (päivät 1–2 eivät ilmoita). Lokirivi tulee tapahtumariville.
        /// </summary>
        public event Action<int, string, string> Pelistreak;

        /// <summary>Vuorossa olevan pelaajan pelipäiväputki (Paiva 'yyyy-MM-dd', Pituus) tai null.</summary>
        public StreakTila PelistreakNyt => matka?.Tila.Pelaaja.Streak;

        /// <summary>
        /// Putken palkkio, jota kukkaroleima EI näytä (web: pelistreak on yksi 'rahat'-toast, ei stamp-leimaa;
        /// Natiivi-UI 27.9.: kupla + leima olivat kaksi ilmoitusta samasta asiasta). IlmoitaRaha vähentää sen muutoksesta.
        /// </summary>
        int streakPalkkio;
        /// <summary>Viimeisin putken lokirivi: ei kelpaa teon omaksi punta-riviksi (IlmoitaRaha).</summary>
        string streakRivi;

        void KytkePelistreak(Matka m)
        {
            streakPalkkio = 0;
            streakRivi = null;
            m.Pelistreak += (p, pituus, otsikko, ala) =>
            {
                if (m != matka) return;
                if (p == m.Tila.Pelaaja) streakPalkkio += Streak.Palkkio(pituus);
                streakRivi = Streak.Lokirivi(pituus);
                Debug.Log($"MATKAKIRJA peli: pelistreak {pituus} päivää, {ala}");
                try { Pelistreak?.Invoke(pituus, otsikko, ala); } catch (Exception e) { Debug.LogException(e); }
            };
        }

        /// <summary>Laitteen paikallinen päivä muodossa yyyy-MM-dd (web getFullYear/getMonth/getDate).</summary>
        static string TamaPaiva() => DateTime.Now.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);

        /// <summary>
        /// Onnistuneen teon jälkeen (ennen Tallenna): päivän ensimmäinen teko kirjaa pelipäivän.
        /// Tekijä on otettu ennen tekoa. Sama päivä, pudonnut pelaaja ja päättynyt peli eivät tee mitään.
        /// </summary>
        void KirjaaPelipaiva(Pelaaja tekija)
        {
            if (matka == null || tekija == null) return;
            try { matka.KirjaaPelipaiva(TamaPaiva(), tekija); }
            catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>
        /// Testikomento 'koetila pelipaiva yyyy-MM-dd': kirjaa pelipäivän annetulla päivällä
        /// (toastin ja kukkaroleiman koe laitteella ilman kellon siirtoa). Palauttaa virheen tai null.
        /// </summary>
        public string KoetilaPelipaiva(string paivays)
        {
            if (matka == null) return "peli ei ole valmis";
            if (!Streak.Kelpaa(paivays)) return "käyttö: koetila pelipaiva yyyy-MM-dd";
            tapahtumat.Clear();
            var r = matka.KirjaaPelipaiva(paivays, matka.Tila.Pelaaja);
            Tallenna();
            if (tapahtumat.Count > 0) Viesti(string.Join(" · ", tapahtumat));
            PaivitaNakyma();
            Debug.Log(r.HasValue ? $"MATKAKIRJA peli: koetila pelipäivä {paivays}: putki {r.Value.Pituus}, +{r.Value.Palkkio}"
                : $"MATKAKIRJA peli: koetila pelipäivä {paivays}: ei kirjausta");
            return r.HasValue ? null : "ei kirjausta (sama päivä, pudonnut tai peli ohi)";
        }
    }
}
