// HISTORIAMOOTTORI: PULUN ENSIVIHJE LAITURILLA (Linssiseppä 2, 8.10.2026; omistajan Olavinlinna-palaute (6) "epäselvää, mitä laiturilla
// pitää tehdä", Siirtoseppä/PT): ensimmäisellä kerralla Pulu lentää kohti vesiportin porttia (ovi:vesiportti-loppu), kun portinvartijan
// riita alkaa tai OdotusS laiturille nousun jälkeen. Raamatun vihjeperiaate: ei tekstiä, vain Pulun lento ja ääni (taso 2). Vaarassa
// odotetaan; jos pelaaja löytää portin itse (alle LoydettyM) tai poistuu laiturilta, vihjettä ei anneta. Kerran pelin aikana.
namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class LaituriVihje
    {
        public const double OdotusS = 15, LoydettyM = 3;
        public const string Kohde = "ovi:vesiportti-loppu";
        double aika = -1; bool riita;
        /// <summary>Vihje annettu tai tarpeeton (portti löytyi, laiturilta poistuttu): ei enää koskaan.</summary>
        public bool Valmis { get; private set; }
        public bool Annettu { get; private set; }

        /// <summary>Portinvartijan riita alkoi (SeikkailuVartijat.RiitaAlkoi).</summary>
        public void RiitaAlkoi() { if (aika >= 0) riita = true; }

        /// <summary>Kehys. laiturilla = pelaaja laiturin tai vesiportin osassa (ulkoalue, vesiportti) ennen porttia; porttiinM = vaakaetäisyys
        /// porttiin. Palauttaa true kerran: Pulu lentää nyt kohti porttia.</summary>
        public bool Paivita(double dt, bool laiturilla, double porttiinM, bool vaara)
        {
            if (Valmis) return false;
            if (aika < 0) { if (laiturilla) aika = 0; return false; }   // laiturille nousu
            if (!laiturilla || porttiinM < LoydettyM) { Valmis = true; return false; }
            aika += dt;
            if ((riita || aika >= OdotusS) && !vaara) { Valmis = Annettu = true; return true; }
            return false;
        }
    }
}
