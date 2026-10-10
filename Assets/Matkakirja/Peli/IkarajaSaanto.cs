// IKÄRAJAN SÄÄNNÖT (omistaja 10.10.2026, Raamattu ALLE 18 KURATOITU; Päätoimittajan linja 10.10. 11.5x): puhdas logiikka
// UI/Ikaraja.cs:lle, testit Peli-testit/Testit/IkarajaTestit.cs. PlayerPrefs-arvo matkakirja-aikuinen:
//   "1" = aikuinen, "0" = alle 18, "?" = kysytty, ei vastattu (Ei nyt: kuratoitu, peli ei kysy uudelleen itse), puuttuu = ei kysytty.
// Vastauksen jälkeen vain tiukempaan suuntaan (aikuinen → alle 18), ei alle 18 → aikuinen (vain kehittäjän nollaus).
namespace Matkakirja.Peli
{
    public static class IkarajaSaanto
    {
        public const int Taysi = 18;
        public const string ArvoAikuinen = "1", ArvoAlle18 = "0", ArvoEiVastattu = "?";

        /// <summary>Aikuinen jos pienin mahdollinen ikä tänä vuonna on vähintään 18 (syntymäpäivä voi olla vielä edessä).</summary>
        public static bool OnAikuinen(int syntymavuosi, int nyt) => nyt - syntymavuosi - 1 >= Taysi;

        /// <summary>Tallennettu arvo: aikuinen (true), alle 18 (false), ei vastattu tai ei kysytty (null).</summary>
        public static bool? Lue(string arvo) => arvo == ArvoAikuinen ? true : arvo == ArvoAlle18 ? false : (bool?)null;

        /// <summary>Kysytty kerran (vastaus tai Ei nyt): peli ei kysy enää itse; Asetuksista voi vastata myöhemmin.</summary>
        public static bool Kysytty(string arvo) => arvo == ArvoAikuinen || arvo == ArvoAlle18 || arvo == ArvoEiVastattu;

        /// <summary>Uusi tila vastauksesta: alle 18 pysyy alle 18:na; muuten vastauksen mukaan (aikuinen → alle 18 sallittu).</summary>
        public static bool Uusi(bool? nyt, bool vastausAikuinen) => nyt != false && vastausAikuinen;

        /// <summary>Voiko Asetuksista vielä vaihtaa: alle 18 on tiukin, joten sitä ei voi muuttaa.</summary>
        public static bool VoiVaihtaa(bool? nyt) => nyt != false;
    }
}
