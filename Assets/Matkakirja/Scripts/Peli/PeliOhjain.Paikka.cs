// PELIOHJAIN: PAIKASTA LÄHTEMINEN JA OHITUS VAIENTAVAT PUHEEN (liikkumisen pariteetti A7 ja C14, löydökset 53 ja 54;
// web js/ui.js vaiennaPaikanPuhe ja js/fokusvirta.js ohitaSaapumisluenta) sekä kehittäjän maailmahyppy (D4–D5, löydös 58;
// web lauta.js napautaKaupunki → ui.js doKehittajaSiirto → game.js actionKehittajaSiirto).
//
// Web (omistaja 8.9.2026): heitto, kävely ja maailmahyppy vaientavat LÄHTÖHETKELLÄ sekä kertojan (haivytaLuenta) että
// pulun kaupunkipuheen ajastimineen (vaiennaLivianKaupunkipuhe) ja tyhjentävät pulun kuplat (polloKuplatPois), jotta
// edellisen kaupungin puhe ei jatku seuraavassa. Ohita asettaa ohituslipun ENSIN ja vaientaa samat: lippu estää pulun
// kommentin ja välihuudon myöhemminkin. Natiivissa kertojan pysäytys laukaisee LuentoLoppui-tapahtuman, josta pulun
// kommentti alkoi (Saapumisesitys) — nyt LuentoOhitettu kertoo, ettei kommenttia tule, ja PaikanPuheVaiennettu
// pyytää UI:ta vaientamaan pulun ja tyhjentämään kuplat (Natiivi-UI). Lippu nollautuu seuraavassa saapumisessa.
using System;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>Pulun puhe ja kuplat pois (Natiivi-UI: Livian ääni, kaupunkiajastimet, kuplapino häivytyksellä).</summary>
        public event Action PaikanPuheVaiennettu;

        /// <summary>Web luennanOhitus: kertoja ohitettiin tai paikasta lähdettiin; pulun kommenttia ei aloiteta.</summary>
        public bool LuentoOhitettu { get; private set; }

        /// <summary>Web vaiennaPaikanPuhe: kertoja häipyy, pulu vaikenee ja kuplat lähtevät (heitto, siirto, hyppy).</summary>
        void VaiennaPaikanPuhe(string syy = "lähtö")
        {
            LuentoOhitettu = true;
            PeruLykkays();
            // Löydös 162: Ohita tai paikasta lähtö päättää kesken olevan saapumisluennan (ennen puheen pysäytystä,
            // jotta syy on ohita/lähtö eikä loppu).
            SaapumisluentaVaiennettu(syy);
            if (soivaLuento != null || odottavaLuento != null) { odottavaLuento = null; puhe?.Pysayta(0.3f); }
            try { PaikanPuheVaiennettu?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>
        /// Kehittäjän maailmanäkymä (Paavalikko.Maailma): kaupungin napautus siirtää pelaajan suoraan kaupunkiin, jos se
        /// ei ole oma kaupunki eikä nopan siirtokohde (web lauta.js maailmahyppy). Saapuminen kulkee tavallista reittiä
        /// (Perilla: kamera uuden maan saapumisnäkymään 1,4 s, traileri, luento); päivä, raha ja noppa ennallaan.
        /// </summary>
        bool MaailmaHyppy(string kaupunki)
        {
            if (!Paavalikko.Maailma || matka == null || kaupunki == null) return false;
            if (kaupunki == PelaajanKaupunki || SiirtoAvain(kaupunki) != null) return false;
            VaiennaPaikanPuhe();
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            PiilotaKortti();
            var r = matka.KehittajaSiirto(kaupunki);
            if (!r.Ok) { Virhe(r.Virhe); return true; }
            Tavoite = null;
            Tallenna();
            Debug.Log("MATKAKIRJA peli: maailmahyppy → " + kaupunki);
            saapumisKaupunki = kaupunki;
            Tila = SilmukanTila.Matkalla;
            Perilla(false);
            return true;
        }
    }
}
