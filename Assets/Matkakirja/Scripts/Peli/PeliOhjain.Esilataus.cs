// PeliOhjain.Esilataus — pelilogiikan esilataukset (Raamattu ESILATAUSPOLITIIKKA; suunnitelma
// docs/raportit/esilataaja-suunnitelma-20260925.md, Pelikoodari):
//   kohta 3 (erä 2)  SaapuminenTiedossa: aloituslennon ja matkan alussa kohdekaupungin saapumistarpeet (taso SeuraavaRuutu)
//   kohta 4 (erä 3)  Esilataaja.Joutilas kaupungissa: tämän kaupungin puheet ja nostojen kuvat (TamaKaupunki), sitten
//                    nopalla saavutettavien kaupunkien saapumistarpeet (Kohdekaupungit) ja viimeisenä niiden nostodata (Muu)
//   kohta 5 (erä 3)  SiirtoKohteetMuuttui: näkyvien kohdekaupunkien saapumistarpeet heti (Kohdekaupungit)
// PeliOhjain lataa puheet; UI (UiNakymat) kuvat ja nostodatan KaupunkiEnnakoitu- ja JoutilasKaupungissa-tapahtumista.
// Kohdat 4–5 seis virransäästössä ja kuumana (Esilataaja.Seis).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Joutilaana ennakoitavien kaupunkien enimmäismäärä (lähimmät ensin).</summary>
        public const int EnnakoitaviaEnintaan = 8;

        /// <summary>
        /// Kohdekaupunki tiedetään (aloituslennon tai matkan alku): ESILATAUSPOLITIIKKA kohta 3 (Esilataaja erä 2) —
        /// kaikki saapumisen tarpeet ladataan lennon/matkan aikana. PeliOhjain esilataa puheet; UI (UiNakymat) kuvat
        /// ja nostodatan.
        /// </summary>
        public event Action<string> SaapuminenTiedossa;

        /// <summary>
        /// Kaupunkiin voi päätyä pian (kohta 5: siirtokohde näkyy kartalla; kohta 4: nopan päässä joutilaana):
        /// saapumistarpeet annetulla tasolla (Kohdekaupungit), kaupungin nostodata tasolla Muu (UiNakymat).
        /// </summary>
        public event Action<string, Taso> KaupunkiEnnakoitu;

        /// <summary>Kohta 4: pelaaja on kaupungissa ja joutilas (Esilataaja.Joutilas); UI esilataa nostojen kuvat.</summary>
        public event Action<string> JoutilasKaupungissa;

        void EsilataaSaapuminen(string kaupunki)
        {
            if (string.IsNullOrEmpty(kaupunki)) return;
            EsilataaPuheet(kaupunki, Taso.SeuraavaRuutu);
            try { SaapuminenTiedossa?.Invoke(kaupunki); } catch (Exception e) { Debug.LogException(e); }
        }

        void EsilataaPuheet(string kaupunki, Taso taso)
        {
            if (luennat == null || puhe == null) return;
            puhe.Esilataa(luennat.Saapumispuhe(kaupunki)?.Url, taso);
            puhe.Esilataa(luennat.Luento(kaupunki)?.Url, taso);
        }

        /// <summary>Kohdat 4–5: kaupungin saapumistarpeet taustalla (ei, jos Esilataaja.Seis).</summary>
        void EnnakoiKaupunki(string kaupunki, Taso taso)
        {
            if (string.IsNullOrEmpty(kaupunki) || Esilataaja.Seis) return;
            Esilataaja.KirjaaEnnakointi();
            EsilataaPuheet(kaupunki, taso);
            try { KaupunkiEnnakoitu?.Invoke(kaupunki, taso); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Kohta 5: siirtokohteet näkyvät → kohdekaupunkien saapumistarpeet heti.</summary>
        void EnnakoiSiirtoKohteet(IReadOnlyList<SiirtoKohde> kohteet)
        {
            if (kohteet == null || kohteet.Count == 0 || Esilataaja.Seis) return;
            var kaupungit = kohteet.Where(k => k.Kaupunki != null).Select(k => k.Kaupunki).Distinct().ToList();
            if (kaupungit.Count == 0) return;
            Debug.Log("MATKAKIRJA peli: ennakointi (siirtokohteet) " + string.Join(", ", kaupungit));
            foreach (var k in kaupungit) EnnakoiKaupunki(k, Taso.Kohdekaupungit);
        }

        /// <summary>
        /// Kohta 4: Esilataaja.Joutilas. Vain kaupungissa matkan aikana (ei lennolla, siirrossa eikä aloitusnäkymässä):
        /// tämän kaupungin puheet ja nostojen kuvat, sitten nopan päässä olevat kaupungit.
        /// </summary>
        void Joutilaana()
        {
            if (matka == null || !Kaytossa || AloituslentoKaynnissa || Tila == SilmukanTila.Matkalla) return;
            var sijainti = matka.Tila.Pelaaja.Sijainti;
            if (!sijainti.Kaupungissa) return;
            string tama = sijainti.Kaupunki;
            EsilataaPuheet(tama, Taso.TamaKaupunki);
            try { JoutilasKaupungissa?.Invoke(tama); } catch (Exception e) { Debug.LogException(e); }
            var lahella = NopanPaassa(matka);
            if (lahella.Count > 0) Debug.Log($"MATKAKIRJA peli: joutilas {tama}, ennakoidaan {string.Join(", ", lahella)}");
            foreach (var k in lahella) EnnakoiKaupunki(k, Taso.Kohdekaupungit);
        }

        /// <summary>
        /// Nopalla (1–6) maitse tai meritse saavutettavat kaupungit sekä bussikohteet, lähimmät ensin
        /// (enintään <see cref="EnnakoitaviaEnintaan"/>). Reittiverkko.Siirrot kirjaa kaupungit polun matkalta, joten
        /// silmäluku 6 kattaa myös pienemmät.
        /// </summary>
        public static List<string> NopanPaassa(Matka m)
        {
            var p = m.Tila.Pelaaja;
            var etaisyys = new Dictionary<string, int>();
            void Lisaa(string k, int askeleet)
            {
                if (k == null || (p.Sijainti.Kaupungissa && k == p.Sijainti.Kaupunki)) return;
                if (!etaisyys.TryGetValue(k, out var e) || askeleet < e) etaisyys[k] = askeleet;
            }
            foreach (var tapa in new[] { Kulkutapa.Maa, Kulkutapa.Meri })
                foreach (var s in m.Verkko.Siirrot(p.Sijainti, 6, tapa).Values)
                    if (s.Kohde.Kaupungissa) Lisaa(s.Kohde.Kaupunki, s.Polku?.Count ?? 0);
            foreach (var k in m.BussiKohteet(p)) Lisaa(k, 1);
            return etaisyys.OrderBy(kv => kv.Value).ThenBy(kv => kv.Key, StringComparer.Ordinal)
                .Take(EnnakoitaviaEnintaan).Select(kv => kv.Key).ToList();
        }
    }
}
