// PELIOHJAIN: MATKAREITTIEN VALINTA (liikkumisen pariteetti B1, B2, B8, B9, B11; löydökset 57 ja 60; web js/ui.js
// matkaSessioKesken ja matkareittienValinta ~7820–7980, piirto js/pallolauta/reitit.js aseta('peli', …)).
//
// Web päättää yhdestä paikasta, mitkä maa- ja merireitit kartalla näkyvät:
//   - Liiku-liuskan avaus aloittaa MATKASESSION nykyisestä kaupungista: kaikki sen naapurireitit näkyvät heti (B1).
//   - Heiton jälkeen (vaihe 'move') näkyvät vain ne kaaret, joita pitkin tällä heitolla voi edetä (B2, kantamanKaaret).
//   - Siirron ajan reitit piirretään LÄHTÖPAIKASTA, vaikka pelaaja on jo siirretty (B8, siirtoKaynnissa).
//   - Reitin varrella pysähtynyt nappula pitää kaarensa näkyvissä (B11, kesken).
//   - Saapuminen toiseen kaupunkiin tai peruutus (liuska kiinni, ei heittoa eikä siirtoa) päättää session, ja reitit
//     häipyvät heti nappulan laskeuduttua (B9 / löydös 60).
// Natiivissa reitit piirsi vain KaupunkiMerkkien napautus (edellinen napautettu kaupunki → nykyinen, ei koskaan pois).
// Sääntö on nyt täällä, ja piirto kulkee yhden koukun kautta (Natiiviseppä: Reitit pelitilassa). Lentonäkymän kaaret
// ovat erikseen (Lentokaaret; LENNON ESITYS on hyväksytty poikkeama, B25).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Piirto (Natiiviseppä, Reitit pelitilassa): näytettävät maa- ja merireitit tunnuksina "a|b"; tyhjä lista =
        /// kaikki pelin reitit pois (häivytys 250 ms kuten web pathTransitionDuration). Kutsutaan vain muutoksessa.
        /// </summary>
        public static Action<IReadOnlyList<string>> MatkareititMuuttuivat;

        /// <summary>Viimeksi valitut reitit (testikomento 'tila', pariteettiajo).</summary>
        public IReadOnlyList<string> Matkareitit => matkareitit;

        /// <summary>
        /// Liiku-liuska auki (Natiivi-UI asettaa; web liukuAuki). Avaus aloittaa matkasession nykyisestä kaupungista.
        /// </summary>
        public bool LiukuAuki
        {
            get => liukuAuki;
            set
            {
                if (liukuAuki == value) return;
                liukuAuki = value;
                if (value && matka != null) matkaSessio = PelaajanKaupunki;
                PaivitaMatkareitit();
            }
        }

        bool liukuAuki;
        string matkaSessio;
        /// <summary>Siirron lähtöpaikka animaation ajan (web siirtoKaynnissa).</summary>
        Sijainti? siirtoLahto;
        IReadOnlyList<string> matkareitit = Array.Empty<string>();
        string matkareittiAvain = "";

        /// <summary>Web matkaSessioKesken: jatkuuko matka (sessio samasta kaupungista ja liuska, heitto tai siirto auki).</summary>
        bool MatkaSessioKesken(string kaupunki)
        {
            if (siirtoLahto.HasValue) return true;
            if (matkaSessio == null) return false;
            if (kaupunki == null) return true;
            if (kaupunki != matkaSessio) { matkaSessio = null; return false; }
            var t = matka.Tila;
            bool auki = liukuAuki || Tila == SilmukanTila.Dialogi
                        || t.Vaihe == Vaihe.Siirto || (t.Vaihe == Vaihe.Heitto && !t.AutoMatka);
            if (!auki) matkaSessio = null;
            return auki;
        }

        /// <summary>Web matkareittienValinta (ilman lentoja): reittitunnukset ja avain.</summary>
        IReadOnlyList<string> ValitseMatkareitit(out string avain)
        {
            avain = "";
            if (matka == null || !Kaytossa) return Array.Empty<string>();
            var t = matka.Tila;
            var paikka = siirtoLahto ?? t.Pelaaja.Sijainti;
            string kaupunki = paikka.Kaupungissa ? paikka.Kaupunki : null;
            bool vaiheessa = t.Vaihe == Vaihe.Heitto || t.Vaihe == Vaihe.Siirto;
            bool matkalla = MatkaSessioKesken(kaupunki);
            bool naytetaan = matkalla || liukuAuki || vaiheessa;
            string kesken = kaupunki == null && !paikka.Kaupungissa ? paikka.Reitti : null;
            IReadOnlyList<string> tunnukset;
            if (kaupunki != null)
                tunnukset = matkalla ? (KantamanKaaret() ?? verkko.Naapurireitit(kaupunki)) : Array.Empty<string>();
            else
                tunnukset = kesken != null ? new[] { kesken } : Array.Empty<string>();
            if (!naytetaan || tunnukset.Count == 0) return Array.Empty<string>();
            avain = (kaupunki ?? kesken) + ":" + (siirtoLahto.HasValue ? "siirto" : t.Vaihe.ToString()) + ":" + t.Noppa + "/" + tunnukset.Count;
            return tunnukset;
        }

        /// <summary>Web kantamanKaaret: vaiheessa Siirto kaikkien siirtopolkujen kaarten unioni.</summary>
        IReadOnlyList<string> KantamanKaaret()
        {
            var t = matka.Tila;
            if (t.Vaihe != Vaihe.Siirto || t.Siirrot == null || t.Siirrot.Count == 0) return null;
            var kaaret = new List<string>();
            foreach (var s in t.Siirrot.Values)
                foreach (var askel in s.Polku ?? Enumerable.Empty<Sijainti>())
                    if (!askel.Kaupungissa && askel.Reitti != null && !kaaret.Contains(askel.Reitti)) kaaret.Add(askel.Reitti);
            return kaaret.Count > 0 ? kaaret : null;
        }

        /// <summary>
        /// Kytkee reittien piirron ja pisteet Natiivisepän Reitteihin ja KaupunkiMerkkeihin (natiiviseppa/reitit-b13):
        /// pelitilassa kaupungin napautus ei enää koske reitteihin, vaan ne tulevat vain tästä säännöstä.
        /// </summary>
        void KytkeReitit()
        {
            var rt = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.reitit : null;
            if (merkit != null) merkit.PeliOhjaaReitit = true;
            if (rt == null) return;
            MatkareititMuuttuivat = ids => rt.NaytaPeli(ids);
            PeliApu.ReittiPiste = rt.ReittiPiste;
        }

        /// <summary>Lentolistan tarjotut kohteet (web tarjotutLennot), kun lentokaaret ovat näkyvissä.</summary>
        List<string> lentoKohteet;
        string peliSuodatinAvain;

        /// <summary>
        /// Web lauta.js pelinKaupunkirajaus (liikkumisen pariteetti D15): tavallisessa pelissä näkyvät ja ovat
        /// napautettavissa vain pelaajan maan kaupungit, oma kaupunki, nopan siirtokohteet (vaihe Siirto) ja tarjotut
        /// lentokohteet. Ei rajausta lennolla, reitillä (maa tuntematon) eikä kehittäjän maailmanäkymässä.
        /// </summary>
        void PaivitaPeliSuodatin()
        {
            if (merkit == null || matka == null) return;
            var t = matka.Tila;
            string oma = PelaajanKaupunki;
            string iso = oma != null && verkko.Kaupungit.TryGetValue(oma, out var ok) ? ok.Maa : null;
            bool vapaa = !Kaytossa || Tila == SilmukanTila.Matkalla || AloituslentoKaynnissa || Paavalikko.Maailma || iso == null;
            var kohteet = new List<string>();
            if (!vapaa)
            {
                if (t.Vaihe == Vaihe.Siirto) foreach (var k in siirtoKohteet) if (k.Kaupunki != null) kohteet.Add(k.Kaupunki);
                if (lentoKohteet != null) kohteet.AddRange(lentoKohteet);
            }
            string avain = vapaa ? "" : iso + "|" + oma + "|" + string.Join(",", kohteet);
            if (avain == peliSuodatinAvain) return;
            peliSuodatinAvain = avain;
            if (vapaa) { merkit.PeliSuodatin(null); return; }
            var joukko = new HashSet<string>(kohteet) { oma };
            foreach (var kv in verkko.Kaupungit) if (kv.Value.Maa == iso) joukko.Add(kv.Key);
            merkit.PeliSuodatin(joukko);
        }

        /// <summary>Päivittää reitit, jos valinta muuttui (PaivitaNakyma, saapuminen, liuska, siirron alku).</summary>
        void PaivitaMatkareitit()
        {
            PaivitaPeliSuodatin();
            var uudet = ValitseMatkareitit(out var avain);
            if (avain == matkareittiAvain) return;
            matkareittiAvain = avain;
            matkareitit = uudet;
            Debug.Log("MATKAKIRJA peli: matkareitit [" + string.Join(", ", uudet) + "]" + (avain.Length > 0 ? " (" + avain + ")" : ""));
            try { MatkareititMuuttuivat?.Invoke(uudet); } catch (Exception e) { Debug.LogException(e); }
        }
    }
}
