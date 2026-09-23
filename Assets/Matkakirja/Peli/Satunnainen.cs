// Siemenellinen satunnaisgeneraattori: mulberry32 bittitäsmällisesti kuten
// verkkopelin js/game.js:
//
//   let a = seed >>> 0;
//   a = (a + 0x6d2b79f5) >>> 0;
//   let t = Math.imul(a ^ (a >>> 15), 1 | a);
//   t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
//   return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
//
// Math.imul = 32-bittinen kertolasku, jonka tulos katkaistaan 32 bittiin;
// uint-kertolasku unchecked-tilassa antaa samat bitit. Välisumma
// t + imul(...) voi JS:ssä ylittää 32 bittiä, mutta seuraava ^ katkaisee sen
// (ToInt32), joten uint-ylivuoto on sama asia.
//
// Kutsuja vastaa webin rngCalls-laskuria ja Kelaa(n) tallennuksen latausta
// (uusi lähde siemenestä, n kutsua eteenpäin).
using System;

namespace Matkakirja.Peli
{
    public sealed class Satunnainen
    {
        public uint Siemen { get; }
        /// <summary>Montako arvoa on otettu siemenestä lähtien (web rngCalls).</summary>
        public long Kutsuja { get; private set; }
        uint a;

        public Satunnainen(long siemen) : this(unchecked((uint)siemen)) { }

        /// <summary>Siemen JS-lukuna (esim. tallennuksesta): sama kuin seed >>> 0 (ToUint32).</summary>
        public Satunnainen(double siemen) : this(JsToUint32(siemen)) { }

        Satunnainen(uint siemen)
        {
            Siemen = siemen;
            a = siemen;
        }

        /// <summary>Seuraava arvo väliltä [0, 1).</summary>
        public double Seuraava()
        {
            Kutsuja++;
            unchecked
            {
                a += 0x6d2b79f5u;
                uint t = (a ^ (a >> 15)) * (1u | a);
                t = (t + (t ^ (t >> 7)) * (61u | t)) ^ t;
                return (t ^ (t >> 14)) / 4294967296.0;
            }
        }

        /// <summary>
        /// Palauttaa tilan siemeneen ja ottaa n arvoa, jolloin Kutsuja = n
        /// (web: tallennuksen lataus toistaa rngCalls kutsua).
        /// </summary>
        public void Kelaa(long n)
        {
            if (n < 0) throw new ArgumentOutOfRangeException(nameof(n));
            a = Siemen;
            Kutsuja = 0;
            for (long i = 0; i < n; i++) Seuraava();
        }

        /// <summary>ECMAScript ToUint32: NaN/ääretön → 0, muuten katkaisu ja modulo 2^32.</summary>
        public static uint JsToUint32(double x)
        {
            if (double.IsNaN(x) || double.IsInfinity(x)) return 0;
            double t = Math.Truncate(x);
            double m = t % 4294967296.0;
            if (m < 0) m += 4294967296.0;
            return (uint)m;
        }
    }
}
