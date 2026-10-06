// PÖLLÖN TESTITUNNUS (Pelikoodari 5.10. 23.1x, Päätoimittaja; juna 146): kehittäjän simuajoissa x-matkakirja-testitunnus ohittaa
// per-IP-päivärajan (oppaan minuuttiraja 120). Arvo tulee VAIN ajonaikaisesta ympäristömuuttujasta POLLO_TESTITUNNUS
// (simctl launch: SIMCTL_CHILD_POLLO_TESTITUNNUS); ei käännökseen, ei repoon, ei lokiin. TF- ja App Store -käännöksissä
// muuttujaa ei ole, joten otsaketta ei lähetetä; App Store -käännöksessä luku on lisäksi pois käännöksestä.
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class PolloTestitunnus
    {
        public const string Otsake = "x-matkakirja-testitunnus";
        static string arvo;
        static bool luettu;

        /// <summary>true, jos tunnus on ympäristössä (lokiin vain tämä tieto, ei arvoa).</summary>
        public static bool Asetettu => !string.IsNullOrEmpty(Arvo);

        static string Arvo
        {
            get
            {
#if MATKAKIRJA_APPSTORE
                return null;
#else
                if (!luettu) { luettu = true; try { arvo = System.Environment.GetEnvironmentVariable("POLLO_TESTITUNNUS"); } catch { arvo = null; } }
                return arvo;
#endif
            }
        }

        /// <summary>Lisää otsakkeen Pöllö-pyyntöön, jos tunnus on asetettu.</summary>
        public static void Lisaa(UnityWebRequest r)
        {
            var a = Arvo;
            if (r != null && !string.IsNullOrEmpty(a)) r.SetRequestHeader(Otsake, a);
        }
    }
}
