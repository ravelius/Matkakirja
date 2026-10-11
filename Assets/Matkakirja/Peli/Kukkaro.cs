// KUKKARON PALAUTE (omistaja 11.10.2026, juna 182): matkakulujen kertymä ja syyrivi. Puhdas logiikka
// (ei UnityEngineä, käännetään myös Peli-testeissä); PeliOhjain.Raha.cs kytkee sen RahaMuuttui-tapahtumaan.
//
// Monen päivän matkalla (pelaaja reitillä, ei kaupungissa) päiväkulut eivät näy päivä kerrallaan: ne
// kertyvät tänne ja näkyvät yhtenä päivityksenä, kun pelaaja on taas kaupungissa ("Matkakulut, 3 yötä:
// ruoka £30, majoitus £20"). Yhden yön kulu pitää vanhan rivinsä ("Yö kaupungissa Pariisi: ruoka £10 …").
// Matkakulun infoteksti näkyy 5 s (Leima), muut rahaleimat oletusajan.
//
// YKSI ILMOITUS (omistaja 11.10.2026: "ettei tule tuplakortteja"): rahan muutoksesta kertoo vain kukkaroleima.
// Lipun rivi ("Bussimatka −£5") ja päiväkulu samasta tallennuksesta yhdistyvät samaan leimaan (Yhdista), eikä
// rahariviä näytetä enää tilarivillä (IlmanRaharivia). Ennen lippu näkyi kahdesti ja päiväkulu jäi pois.
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Peli
{
    public sealed class Kulukertyma
    {
        public int Muutos { get; private set; }
        public int Ruoka { get; private set; }
        public int Majoitus { get; private set; }
        public int Oita { get; private set; }
        /// <summary>Viimeisimmän yön oma rivi ("Yö matkalla: ruoka £10").</summary>
        public string Viimeisin { get; private set; }

        /// <summary>Reitillä kertyneet muut raharivit (laivalippu), kukin kerran; näkyvät yhteenvedon edellä.</summary>
        public List<string> Rivit { get; } = new List<string>();

        public bool Tyhja => Oita == 0 && Muutos == 0 && Rivit.Count == 0;

        public void Rivi(string rivi) { if (!string.IsNullOrEmpty(rivi) && !Rivit.Contains(rivi)) Rivit.Add(rivi); }

        /// <summary>Yksi päiväkulu (Matka.PaivakuluVeloitettiin).</summary>
        public void Yo(int ruoka, int majoitus, string rivi)
        {
            Ruoka += ruoka;
            Majoitus += majoitus;
            Oita++;
            Viimeisin = rivi;
        }

        /// <summary>Kassan muutos, joka jää odottamaan kaupunkiin saapumista.</summary>
        public void Kerry(int muutos) => Muutos += muutos;

        /// <summary>Syyrivi kertymästä: yksi yö = sen oma rivi, useampi = yhteenveto; null ilman öitä.</summary>
        public string Syy()
        {
            if (Oita == 0) return null;
            if (Oita == 1) return Viimeisin;
            return $"Matkakulut, {Oita} yötä: ruoka £{Ruoka}" + (Majoitus > 0 ? $", majoitus £{Majoitus}" : "");
        }

        public void Tyhjenna()
        {
            Muutos = Ruoka = Majoitus = Oita = 0;
            Viimeisin = null;
            Rivit.Clear();
        }

        /// <summary>Onko rahaleiman syy matkakulu: päiväkulu, yhteenveto tai lippu (infoteksti 5 s).</summary>
        public static bool OnMatkakulu(string syy) =>
            syy != null && (syy.StartsWith("Yö ", System.StringComparison.Ordinal) || syy.Contains(" · Yö ")
                            || syy.StartsWith("Matkakulut", System.StringComparison.Ordinal) || syy.Contains("matka −£"));

        /// <summary>Tapahtumarivi, joka kuuluu kukkaroleimaan (punnat), ei tilariville; pelistreak on oma kuplansa.</summary>
        public static bool OnRaharivi(string rivi, string streakRivi = null) =>
            rivi != null && rivi.Contains("£") && rivi != streakRivi;

        /// <summary>Tilarivin teksti ilman rahariviä (ne näkyvät kukkaroleimassa); null, jos mitään ei jää.</summary>
        public static string IlmanRaharivia(IEnumerable<string> rivit, string streakRivi = null)
        {
            var jaa = rivit.Where(r => !string.IsNullOrEmpty(r) && !OnRaharivi(r, streakRivi)).ToList();
            return jaa.Count > 0 ? string.Join(" · ", jaa) : null;
        }

        /// <summary>
        /// Kukkaroleiman syy yhdestä tallennuksesta: teon oma syy, lippurivit ja matkakulu yhdeksi riviksi (" · "),
        /// kukin kerran; null, jos mitään ei ole.
        /// </summary>
        public static string Yhdista(string tekoSyy, IEnumerable<string> raharivit, string kulu)
        {
            var osat = new List<string>();
            void Lisaa(string s) { if (!string.IsNullOrEmpty(s) && !osat.Contains(s)) osat.Add(s); }
            Lisaa(tekoSyy);
            foreach (var r in raharivit) Lisaa(r);
            Lisaa(kulu);
            return osat.Count > 0 ? string.Join(" · ", osat) : null;
        }

        /// <summary>Matkakulun infotekstin kesto (omistaja 11.10.2026: 5 s).</summary>
        public const int MatkakulunNakyvyysMs = 5000;
    }
}
