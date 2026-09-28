// SIMULOIDUN AJAN KEHYSKELLO (ISS-kyydin nopeutus 1×–1000×, web iss-rata.js SIMUKELLO): IssNyt.Simu lukee seinäkellon kerran
// kehyksessä. Nopeutettuna 1 ms:n ero kutsujen välillä on 1000×:llä sekunti simuloitua aikaa (ISS liikkuu 7,7 km), joten
// kaikki kerrokset (rata, kamera, aurinko, yökuori, kaari, taivas) saavat saman hetken, ja kehysten välinen askel tulee
// Unityn kehysajasta (tasainen liike myös 1000×:llä). Seinäkelloon tahdistetaan, jos ero kasvaa yli 0,25 s (sovellus
// taustalla, laitteen uni). Muut säikeet saavat seinäkellon sellaisenaan.
using System;
using System.Threading;
using Matkakirja.Linssit.Iss;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Kehyskello
    {
        const double TahdistusS = 0.25;
        static int kehys = -1, paaSaie = -1;
        static double ankkuriT;
        static DateTime ankkuriUtc, kehyksenUtc;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void Kytke()
        {
            paaSaie = Thread.CurrentThread.ManagedThreadId;
            kehys = -1;
            ankkuriUtc = default;
            IssNyt.Simu = new Simukello(Utc);
        }

        /// <summary>Tämän kehyksen UTC-hetki: sama kaikille kutsujille kehyksen aikana.</summary>
        public static DateTime Utc()
        {
            if (Thread.CurrentThread.ManagedThreadId != paaSaie) return DateTime.UtcNow;
            int f = Time.frameCount;
            if (f == kehys) return kehyksenUtc;
            kehys = f;
            var nyt = DateTime.UtcNow;
            double t = Time.unscaledTimeAsDouble;
            var arvio = ankkuriUtc == default ? nyt : ankkuriUtc.AddTicks((long)((t - ankkuriT) * TimeSpan.TicksPerSecond));
            if (ankkuriUtc == default || Math.Abs((nyt - arvio).TotalSeconds) > TahdistusS)
            {
                ankkuriUtc = nyt;
                ankkuriT = t;
                arvio = nyt;
            }
            return kehyksenUtc = arvio;
        }
    }
}
