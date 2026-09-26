// LAATTOJEN OSUMA-% (build 22, ESILATAUSPOLITIIKKA kohdat 2–3; Natiivisepän kanssa sovittu 26.9.2026): laatat omana
// rivinään, jotta niiden satojen pyyntöjen määrä ei hukuta sisällön (kortit, kuvat, puheet) osuma-%:ia EsilataajaMittarissa.
// Laattapalvelin kutsuu tätä taustasäikeestä, joten kaikki lukitaan. Luokat kuten EsilataajaMittarissa:
//   osuma   = näkyvä laatta löytyi välimuistista, ja se tuli sinne tämän istunnon esilatauksesta,
//   levyllä = löytyi paketista, offline-kansiosta tai aiemman istunnon välimuistista (ei kerro esilataajasta),
//   huti    = näkyvä laatta haettiin verkosta.
using System.Collections.Generic;
using System.Text;

namespace Matkakirja
{
    public static class LaattaOsumat
    {
        static readonly object lukko = new object();
        static readonly HashSet<string> esiladatut = new HashSet<string>();
        static int osumia, levylla, huteja, esiladattuja;

        /// <summary>Esilataus haki laatan verkosta ja tallensi sen välimuistiin.</summary>
        public static void Esiladattu(string polku)
        {
            lock (lukko) { if (esiladatut.Add(polku)) esiladattuja++; }
        }

        /// <summary>Näkyvä laatta löytyi levyltä; <paramref name="valimuisti"/> = välimuistista (voi olla esilatauksen tuoma).</summary>
        public static void Levylta(string polku, bool valimuisti)
        {
            lock (lukko) { if (valimuisti && esiladatut.Contains(polku)) osumia++; else levylla++; }
        }

        /// <summary>Näkyvä laatta haettiin verkosta.</summary>
        public static void Verkosta() { lock (lukko) huteja++; }

        public static void Nollaa() { lock (lukko) { esiladatut.Clear(); osumia = levylla = huteja = esiladattuja = 0; } }

        /// <summary>Laskurit nollaan; tieto esiladatuista säilyy (kuten EsilataajaMittari.NollaaSummat).</summary>
        public static void NollaaSummat() { lock (lukko) { osumia = levylla = huteja = 0; } }

        /// <summary>Osuma-% (osumat / (osumat + hudit)), −1 kun näkyviä verkkoa tarvinneita pyyntöjä ei ollut.</summary>
        public static int Prosentti(int o, int h) => o + h == 0 ? -1 : (int)System.Math.Round(100.0 * o / (o + h));

        public static string Json()
        {
            lock (lukko)
                return new StringBuilder().Append("{\"osumia\":").Append(osumia).Append(",\"huteja\":").Append(huteja)
                    .Append(",\"levylla\":").Append(levylla).Append(",\"esiladattuja\":").Append(esiladattuja)
                    .Append(",\"pros\":").Append(Prosentti(osumia, huteja)).Append('}').ToString();
        }

        public static string Rivi()
        {
            lock (lukko)
            {
                int p = Prosentti(osumia, huteja);
                return $"laatat osuma {osumia}/{osumia + huteja} {(p < 0 ? "–" : p + " %")} (levyllä {levylla}, esiladattuja {esiladattuja})";
            }
        }
    }
}
