// PELIOHJAIN: TALOUDEN VAIHE 1 (Pelikoodari 27.9.2026; web PR #3394, js/main.js TURVA_KEY,
// js/ui.js naytaMatkanLoppu). Pelilogiikka on Peli/Matka.cs:ssä ja Peli/Talous.cs:ssä; tämä
// osa kytkee sen silmukkaan ja antaa Natiivi-UI:lle:
//   Rahatilanne(tilanne, otsikko, ala)  — rahat loppuivat / kassa selvisi / pelaaja putosi (toast, Pulu)
//   MatkaPaattyi(MatkanLoppu)           — rahat loppuivat eikä kassa noussut: loppukortti (kerran per matka)
//   TurvaTallennusOn, JatkaTurvasta()   — loppukortin "Jatka viimeisestä tallennuksesta"
// Kassarivi luetaan suoraan matkasta: Matka.PaivakuluNyt(), KassaRiittaa(), RahattomuuttaJaljella().
//
// TURVATALLENNUS: viimeisin tallennus, jossa kenenkään rahat eivät ole lopussa (Pelitila.Rahattomuutta
// epätosi), tiedostoon tallennus-turva.json. Uusi peli ja muistien tyhjennys korvaavat/poistavat sen.
using System;
using System.IO;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        static string TurvaPolku => Path.Combine(Documents, "tallennus-turva.json");

        /// <summary>
        /// Vuorossa olevan pelaajan rahatilanne muuttui (Matka.Rahatilanne): tilanne on
        /// 'peli.vararikko.varoitus', 'peli.vararikko.selvisi' tai 'peli.vararikko.loppu'
        /// (moninpeli). Otsikko näkyy myös tapahtumarivillä (Tapahtui "rahat").
        /// </summary>
        public event Action<string, string, string> Rahatilanne;

        /// <summary>Rahat loppuivat ja matka päättyi (Tila.MatkaPaattyi): loppukortti. Kerran per matka.</summary>
        public event Action<MatkanLoppu> MatkaPaattyi;

        /// <summary>Päättyneen matkan tiedot (pelaaja, kaupungin nimi, päivä) tai null.</summary>
        public MatkanLoppu MatkanLoppu => matka?.Tila.MatkaPaattyi;

        /// <summary>Onko turvatallennus olemassa (loppukortin Jatka-napin näkyvyys).</summary>
        public bool TurvaTallennusOn => File.Exists(TurvaPolku);

        bool loppuIlmoitettu;
        string paivakuluSyy;

        void KytkeTalous(Matka m)
        {
            loppuIlmoitettu = m.Tila.MatkaPaattyi != null;
            paivakuluSyy = null;
            m.Rahatilanne += (p, tilanne, otsikko, ala) =>
            {
                if (m != matka) return;
                try { Rahatilanne?.Invoke(tilanne, otsikko, ala); } catch (Exception e) { Debug.LogException(e); }
            };
            // Kukkaroleiman syy (web say-rivi "Yö kaupungissa X: ruoka a £, majoitus b £").
            m.PaivakuluVeloitettiin += (p, k, maksettu) =>
            {
                if (m != matka || p != m.Tila.Pelaaja) return;
                var paikka = k.Matkalla ? "Yö matkalla"
                    : "Yö kaupungissa " + (p.Sijainti.Kaupungissa && m.Verkko.Kaupungit.TryGetValue(p.Sijainti.Kaupunki, out var c) ? c.Nimi : "");
                paivakuluSyy = paikka.Trim() + ": " + (k.Majoitus > 0 ? $"ruoka {k.Ruoka} £, majoitus {k.Majoitus} £" : $"ruoka {k.Ruoka} £");
            };
        }

        /// <summary>Tallennuksen jälkeen: kelvollinen tila (ei rahattomuutta) talteen turvatallennukseksi.</summary>
        void TallennaTurva(string json)
        {
            if (matka == null || matka.Tila.Vaihe == Vaihe.Ohi || matka.Tila.Rahattomuutta) return;
            try { PeliApu.KirjoitaAtomisesti(TurvaPolku, json); }
            catch (Exception e) { Debug.LogError("MATKAKIRJA peli: turvatallennus epäonnistui: " + e.Message); }
        }

        void IlmoitaMatkanLoppu()
        {
            var loppu = matka?.Tila.MatkaPaattyi;
            if (loppu == null || loppuIlmoitettu) return;
            loppuIlmoitettu = true;
            Debug.Log($"MATKAKIRJA peli: rahat loppuivat, matka päättyi (päivä {loppu.Paiva}, {loppu.Kaupunki ?? "matkalla"})");
            try { MatkaPaattyi?.Invoke(loppu); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>
        /// Loppukortin "Jatka viimeisestä tallennuksesta" (web jatkaTurvasta): viimeisin tallennus,
        /// jossa rahat olivat kunnossa, jatkuu ja korvaa päättyneen matkan. Palauttaa virheen tai null.
        /// </summary>
        public string JatkaTurvasta()
        {
            using var _ = Ajoita("jatkaTurvasta");
            if (verkko == null) return "sisältö ei ole vielä latautunut";
            if (Tila != SilmukanTila.Aloitus && Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (!File.Exists(TurvaPolku)) return "turvatallennusta ei ole";
            Matka m;
            try
            {
                m = Laattamaarat != null
                    ? Matka.Lataa(verkko, File.ReadAllText(TurvaPolku), Laattamaarat)
                    : Matka.Lataa(verkko, File.ReadAllText(TurvaPolku));
                if (m.Tila.Vaihe == Vaihe.Ohi || m.Tila.Rahattomuutta) return "turvatallennus ei kelpaa";
                if (PeliApu.Koordinaatti(verkko, m.Tila.Pelaaja.Sijainti) == null) return "turvatallennuksen sijainti ei ole laudalla";
            }
            catch (Exception e) { return "turvatallennus ei kelpaa: " + e.Message; }
            if (LehtiAuki) SuljeLehti();
            PeruLykkays();
            kysymysNakyma?.Piilota();
            KysymysTila = null;
            jatkettava = null;
            matka = m;
            JatkaMatkaa();
            Tallenna();
            Debug.Log("MATKAKIRJA peli: jatketaan turvatallennuksesta, " + PeliApu.TilaTeksti(verkko, m.Tila));
            return null;
        }
    }
}
