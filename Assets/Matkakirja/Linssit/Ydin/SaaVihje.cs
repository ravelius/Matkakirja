// SÄÄTILAN ENSIKERRAN VIHJE (omistaja 8.10.2026 klo 09.2x: "Kun pelaaja pelaa ensimmäistä kertaa kuumailmapalloa, niin sääsymbooliin
// voisi tulla viiden sekunnin ajaksi pieni puhekupla … seuraavilla kerroilla tätä selitekuplaa ei enää tulisi … noin 15 sekunnin
// kuluttua, kun kuumailmapallo on ollut käynnissä"). Puhdas ajastus: UI (OpasValikko) kertoo pallon alun ja kysyy joka ruudulla,
// näkyykö vihje; Nahty tallennetaan laitteelle (PlayerPrefs), jolloin vihje ei tule enää. Ei LIVEn ollessa päällä eikä esteen aikana
// (valikko auki); este siirtää näyttöä, kunnes se poistuu.
namespace Matkakirja.Linssit
{
    public sealed class SaaVihje
    {
        public const double ViiveS = 15, NakyyS = 5;

        /// <summary>Vihje on näytetty tai suljettu kerran (pysyvä lippu laitteelle).</summary>
        public bool Nahty { get; private set; }
        double? alku, naytonAlku;

        public SaaVihje(bool nahty) { Nahty = nahty; }

        /// <summary>Pallo käynnistyi (opas auki) hetkellä t; uusi käynnistys aloittaa viiveen alusta, jos vihjettä ei ole vielä nähty.</summary>
        public void Alkoi(double t) { alku = t; naytonAlku = null; }

        /// <summary>Pallo suljettiin ennen vihjettä: odotus loppuu (seuraava käynnistys aloittaa alusta).</summary>
        public void Loppui() { alku = null; if (naytonAlku.HasValue) naytonAlku = null; }

        /// <summary>Napautus kuplaan tai ☾-nappiin: vihje pois eikä tule enää.</summary>
        public void Suljettu() { Nahty = true; naytonAlku = null; alku = null; }

        /// <summary>Näkyykö vihje hetkellä t. LIVE päällä → ei koskaan (merkitään nähdyksi); este → odottaa.</summary>
        public bool Nakyy(double t, bool live, bool este)
        {
            if (naytonAlku.HasValue)
            {
                if (t - naytonAlku.Value < NakyyS && !live) return true;
                naytonAlku = null; alku = null; return false;
            }
            if (Nahty || !alku.HasValue) return false;
            if (live) { Nahty = true; alku = null; return false; }
            if (este || t - alku.Value < ViiveS) return false;
            Nahty = true; naytonAlku = t;
            return true;
        }
    }
}
