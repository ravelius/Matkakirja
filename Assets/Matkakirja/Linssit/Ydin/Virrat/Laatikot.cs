// IHMISEN MATKA VÄRIVIRTOINA — KOHINA JA LAATIKOT
// (web js/aikajana-virrat-laskenta.js, osiot "kohina" ja "laatikot").
//
// Laatikko on { lat: [etelä, pohjoinen], lon: [länsi, itä] }; pituusväli saa
// ylittää antimeridiaanin. Reuna rosoitetaan deterministisellä
// arvokohinalla (omistajan päätös 13), jonka hajautus on toistettu
// bittitarkasti: JS:n `| 0`, `>>> 0` ja Math.imul ovat tässä
// int/uint-aritmetiikkaa (unchecked).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Portin luisukaista: leveys asteina ja viive kaistan ulkolaidalla.</summary>
    public readonly struct PortinLuisu
    {
        public readonly double Leveys;
        public readonly double Vuodet;
        public PortinLuisu(double leveys, double vuodet) { Leveys = leveys; Vuodet = vuodet; }
    }

    public static class Laatikot
    {
        /// <summary>Luisukaistan oletusleveys (astetta) ja viive osuutena avautumisajasta.</summary>
        public const double PortinLuisuAste = 1.5;
        public const double PortinLuisuOsuus = 0.75;

        static readonly double[] KokoLat = { -90, 90 };
        static readonly double[] KokoLon = { -180, 180 };

        /* ------------------------------------------------------------ kohina */

        /// <summary>
        /// Deterministinen arvokohina ruudulle (−1…1): hajautus `hila`-asteen
        /// hilan solmuihin ja pehmeä interpolointi. Sama siemen antaa aina
        /// saman reunan.
        /// </summary>
        public static double Kohina(double lat, double lon, int siemen = 1, double hila = 4)
        {
            var x = (lon + 180) / hila;
            var y = (90 - lat) / hila;
            var x0 = Math.Floor(x);
            var y0 = Math.Floor(y);
            var fx = x - x0;
            var fy = y - y0;
            var ix = (long)x0;
            var iy = (long)y0;
            var a = Hajautus(ix, iy, siemen);
            var b = Hajautus(ix + 1, iy, siemen);
            var c = Hajautus(ix, iy + 1, siemen);
            var d = Hajautus(ix + 1, iy + 1, siemen);
            var ux = fx * fx * (3 - 2 * fx);
            var uy = fy * fy * (3 - 2 * fy);
            return (a * (1 - ux) + b * ux) * (1 - uy) + (c * (1 - ux) + d * ux) * uy;
        }

        static double Hajautus(long ix, long iy, int siemen)
        {
            unchecked
            {
                // (ix·374761393 + iy·668265263 + siemen·1442695041) | 0: tarkka kokonaisluku → ToInt32.
                var n = (int)(ix * 374761393L + iy * 668265263L + siemen * 1442695041L);
                n = (n ^ (int)((uint)n >> 13)) * 1274126177;
                n ^= (int)((uint)n >> 16);
                return (n & 0xffff) / (double)0x7fff - 1;
            }
        }

        /* ------------------------------------------------------------ laatikot */

        static double[] LatVali(Laatikko l) => l.Lat ?? KokoLat;

        /// <summary>Onko piste laatikossa; `reuna` (asteina) rosoittaa rajan ±reuna astetta.</summary>
        public static bool Laatikossa(double lat, double lon, Laatikko laatikko, double reuna = 0, int siemen = 1)
        {
            var siirto = reuna != 0 && !double.IsNaN(reuna) ? reuna * Kohina(lat, lon, siemen, 3) : 0;
            var latv = LatVali(laatikko);
            if (lat < latv[0] + siirto || lat > latv[1] + siirto) return false;
            if (laatikko.Lon == null) return true;
            var l = Ruudukko.KierraLon(lon);
            var w = Ruudukko.KierraLon(laatikko.Lon[0] + siirto);
            var e = Ruudukko.KierraLon(laatikko.Lon[1] + siirto);
            if (w <= e) return l >= w && l <= e;
            return l >= w || l <= e;
        }

        /// <summary>
        /// Pisteen syvyys laatikossa asteina: positiivinen sisällä (etäisyys
        /// lähimpään reunaan), negatiivinen ulkona. Raja rosoitetaan samalla
        /// kohinalla kuin Laatikossa(). Pituussuunta skaalataan cos φ:llä.
        /// </summary>
        public static double LaatikonSyvyys(double lat, double lon, Laatikko laatikko, double reuna = 0, int siemen = 1)
        {
            var siirto = reuna != 0 && !double.IsNaN(reuna) ? reuna * Kohina(lat, lon, siemen, 3) : 0;
            var latv = LatVali(laatikko);
            var syvyys = Math.Min(lat - (latv[0] + siirto), (latv[1] + siirto) - lat);
            var lonv = laatikko.Lon ?? KokoLon;
            var lansi = lonv[0];
            var leveys = lonv[1] - lansi;
            while (leveys < 0) leveys += 360;
            // Koko kierroksen laatikko ei rajaa pituussuunnassa.
            if (laatikko.Lon != null && leveys < 360)
            {
                var dl = Ruudukko.KierraLon(lon) - Ruudukko.KierraLon(lansi + siirto);
                while (dl < 0) dl += 360;
                while (dl >= 360) dl -= 360;
                var dLon = dl <= leveys ? Math.Min(dl, leveys - dl) : -Math.Min(dl - leveys, 360 - dl);
                syvyys = Math.Min(syvyys, dLon * Math.Max(0.2, JsLuvut.Cos(lat * Ruudukko.Rad)));
            }
            return syvyys;
        }

        /// <summary>Portin luisukaista; null, jos aineistossa `luisu: null` (terävä portti).</summary>
        public static PortinLuisu? Luisu(Portti portti)
        {
            if (portti.LuisuPois) return null;
            return new PortinLuisu(
                portti.Luisu?.Leveys ?? PortinLuisuAste,
                portti.Luisu?.Vuodet ?? portti.Avautuu * PortinLuisuOsuus);
        }

        /// <summary>Suurin syvyys laatikkolistassa (unioni); tyhjä lista → −∞.</summary>
        public static double LaatikoidenSyvyys(double lat, double lon, IReadOnlyList<Laatikko> laatikot, double reuna = 0, int siemen = 1)
        {
            var paras = double.NegativeInfinity;
            for (var k = 0; k < laatikot.Count; k += 1)
            {
                var s = LaatikonSyvyys(lat, lon, laatikot[k], reuna, siemen);
                if (s > paras) paras = s;
            }
            return paras;
        }

        /// <summary>Rivit, joilla jokin laatikko `vara` asteella laajennettuna voi osua.</summary>
        internal static (int r0, int r1) LaatikoidenRivit(IReadOnlyList<Laatikko> laatikot, double vara, int korkeus)
        {
            double etela = 90, pohjoinen = -90;
            foreach (var l in laatikot)
            {
                etela = Math.Min(etela, (l.Lat?[0] ?? -90) - vara);
                pohjoinen = Math.Max(pohjoinen, (l.Lat?[1] ?? 90) + vara);
            }
            return ((int)Math.Max(0, Math.Floor((90 - pohjoinen) / Ruudukko.Aste)),
                (int)Math.Min(korkeus - 1, Math.Floor((90 - etela) / Ruudukko.Aste)));
        }

        /// <summary>
        /// Pehmeä laatikkomaski: paino 0…1 syvyyden mukaan `pehmeys` asteen
        /// kaistalla rajan molemmin puolin (vanhan väestön alue).
        /// </summary>
        public static float[] LaatikkoPehmea(IReadOnlyList<Laatikko> laatikot, double reuna = 0, int siemen = 1, double pehmeys = 2,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus, byte[] maa = null)
        {
            var ulos = new float[leveys * korkeus];
            if (laatikot == null || laatikot.Count == 0) return ulos;
            var (r0, r1) = LaatikoidenRivit(laatikot, reuna + pehmeys, korkeus);
            for (var r = r0; r <= r1; r += 1)
            {
                var lat = Ruudukko.RivinLat(r);
                for (var c = 0; c < leveys; c += 1)
                {
                    var i = r * leveys + c;
                    if (maa != null && maa[i] == 0) continue;
                    var lon = Ruudukko.SarakkeenLon(c);
                    var s = LaatikoidenSyvyys(lat, lon, laatikot, reuna, siemen);
                    var w = 0.5 + s / pehmeys;
                    if (w > 0) ulos[i] = (float)Math.Min(1, w);
                }
            }
            return ulos;
        }

        /// <summary>
        /// Ruudukon maski laatikkolistasta (rosoreunalla), 1 = jossakin
        /// laatikossa. Kohina lasketaan vain reunakaistalla: laatikko
        /// kutistettuna ratkaisee selvästi sisällä, laajennettuna ulkona.
        /// </summary>
        public static byte[] LaatikkoMaski(IReadOnlyList<Laatikko> laatikot, double reuna = 0, int siemen = 1,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus, byte[] maa = null)
        {
            var ulos = new byte[leveys * korkeus];
            if (laatikot == null || laatikot.Count == 0) return ulos;
            var n = laatikot.Count;
            var sisemmat = new Laatikko[n];
            var ulommat = new Laatikko[n];
            for (var k = 0; k < n; k += 1)
            {
                sisemmat[k] = Siirra(laatikot[k], reuna);
                ulommat[k] = Siirra(laatikot[k], -reuna);
            }
            var rosoinen = reuna != 0 && !double.IsNaN(reuna);
            var ehdokkaat = new int[n];
            for (var r = 0; r < korkeus; r += 1)
            {
                var lat = Ruudukko.RivinLat(r);
                // Rivin ulkopuoliset laatikot karsitaan kerran, ei ruuduittain.
                var m = 0;
                for (var k = 0; k < n; k += 1)
                {
                    var lv = ulommat[k].Lat;
                    if (lat >= lv[0] && lat <= lv[1]) ehdokkaat[m++] = k;
                }
                if (m == 0) continue;
                for (var c = 0; c < leveys; c += 1)
                {
                    var i = r * leveys + c;
                    if (maa != null && maa[i] == 0) continue;
                    var lon = Ruudukko.SarakkeenLon(c);
                    for (var e = 0; e < m; e += 1)
                    {
                        var k = ehdokkaat[e];
                        if (!Laatikossa(lat, lon, ulommat[k])) continue;
                        if (!rosoinen || Laatikossa(lat, lon, sisemmat[k]) || Laatikossa(lat, lon, laatikot[k], reuna, siemen))
                        {
                            ulos[i] = 1;
                            break;
                        }
                    }
                }
            }
            return ulos;
        }

        static Laatikko Siirra(Laatikko l, double d) => new Laatikko
        {
            Lat = new[] { (l.Lat?[0] ?? -90) + d, (l.Lat?[1] ?? 90) - d },
            Lon = l.Lon != null ? new[] { l.Lon[0] + d, l.Lon[1] - d } : null,
        };
    }
}
