// IHMISEN MATKA VÄRIVIRTOINA — RUUDUN TILA, VÄRI JA KAMERAN PAINOPISTE
// (web js/aikajana-virrat-laskenta.js osiot "tila", "väri", "painopiste").
//
// Rintaman leveys on kymmenesosa kellon lukemasta, vähintään 600 v
// (omistajan päätös 3); peittävyys nousee pehmeästi ennen saapumista.
// Väri liukuu vanhan alueen ja rintaman sävyn välillä painon w mukaan;
// Amerikkojen koko alue vaihtaa sävyä kellon mukaan (päätökset 1 ja 11).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Ruudun tila kellon hetkellä: paino w (1 rintamalla, 0 vanhalla alueella) ja peittävyys.</summary>
    public readonly struct RuudunTila
    {
        public readonly double W;
        public readonly double Peitto;
        public RuudunTila(double w, double peitto) { W = w; Peitto = peitto; }
    }

    /// <summary>Väri 0…255-kanavina (liu'ussa murtolukuja, kuten webissä).</summary>
    public readonly struct Rgb
    {
        public readonly double R, G, B;
        public Rgb(double r, double g, double b) { R = r; G = g; B = b; }
        public override string ToString() => $"[{R}, {G}, {B}]";
    }

    /// <summary>Virran sävyt hetkellä: vanhan alueen ja rintaman väri.</summary>
    public readonly struct VirranSavy
    {
        public readonly Rgb Vanha, Rintama;
        public VirranSavy(Rgb vanha, Rgb rintama) { Vanha = vanha; Rintama = rintama; }
    }

    /// <summary>Virran rintaman painopiste kameralle.</summary>
    public sealed class Painopiste
    {
        public int Virta;
        public double Paino, Lat, Lon;
        /// <summary>Tasaisen kiekon kulmasäde asteina.</summary>
        public double Hajonta;
    }

    public static class VirranTilat
    {
        public const double RintamanOsuus = 0.1;
        public const double RintamanMinV = 600;
        public const double NousunOsuus = 0.05;
        public const double NousunMinV = 300;

        /// <summary>Rintaman leveys vuosina: max(600, 0,1 · nyt).</summary>
        public static double RintamanLeveys(double nyt) => Math.Max(RintamanMinV, RintamanOsuus * nyt);

        static double Smoothstep(double x)
        {
            var t = Math.Max(0, Math.Min(1, x));
            return t * t * (3 - 2 * t);
        }

        /// <summary>
        /// Ruudun tila kellon hetkellä `nyt` (vuosia sitten); `aika` on ruudun
        /// saapumisaika (0 = ei). `askelittain` (reduced motion) jättää nousun pois.
        /// </summary>
        public static RuudunTila Tila(double aika, double nyt, bool askelittain = false)
        {
            if (!(aika > 0)) return new RuudunTila(0, 0);
            var ika = aika - nyt; // vuosia saapumisesta; negatiivinen = tulossa
            if (ika < 0)
            {
                if (askelittain) return new RuudunTila(0, 0);
                var nousu = Math.Max(NousunMinV, NousunOsuus * nyt);
                return new RuudunTila(1, Smoothstep(1 + ika / nousu));
            }
            var leveys = RintamanLeveys(nyt);
            return new RuudunTila(Math.Max(0, 1 - ika / leveys), 1);
        }

        /// <summary>'#rrggbb' → kanavat 0…255 (risuaita saa puuttua).</summary>
        public static Rgb HeksaRgb(string heksa)
        {
            var h = heksa.Replace("#", "");
            int Kanava(int alku) => int.Parse(h.Substring(alku, 2), NumberStyles.HexNumber, CultureInfo.InvariantCulture);
            return new Rgb(Kanava(0), Kanava(2), Kanava(4));
        }

        static double Lerp(double a, double b, double t) => a + (b - a) * t;

        /// <summary>
        /// Virran väri hetkellä `aika` (vuosia sitten). `Liuku` siirtää
        /// molempia sävyjä kellon mukaan askeleelta toiselle.
        /// </summary>
        public static VirranSavy Vari(VirranVari vari, double aika = 0)
        {
            var liuku = vari.Liuku;
            if (liuku == null || liuku.Length == 0 || !(aika > 0))
                return new VirranSavy(HeksaRgb(vari.Vanha), HeksaRgb(vari.Rintama));
            // Askeleet laskevassa aikajärjestyksessä (vanhin ensin).
            if (aika >= liuku[0].Aika) return new VirranSavy(HeksaRgb(liuku[0].Vanha), HeksaRgb(liuku[0].Rintama));
            var viimeinen = liuku[liuku.Length - 1];
            if (aika <= viimeinen.Aika) return new VirranSavy(HeksaRgb(viimeinen.Vanha), HeksaRgb(viimeinen.Rintama));
            for (var k = 0; k + 1 < liuku.Length; k += 1)
            {
                var a = liuku[k];
                var b = liuku[k + 1];
                if (aika <= a.Aika && aika >= b.Aika)
                {
                    var t = (a.Aika - aika) / (a.Aika - b.Aika);
                    var va = HeksaRgb(a.Vanha);
                    var vb = HeksaRgb(b.Vanha);
                    var ra = HeksaRgb(a.Rintama);
                    var rb = HeksaRgb(b.Rintama);
                    return new VirranSavy(
                        new Rgb(Lerp(va.R, vb.R, t), Lerp(va.G, vb.G, t), Lerp(va.B, vb.B, t)),
                        new Rgb(Lerp(ra.R, rb.R, t), Lerp(ra.G, rb.G, t), Lerp(ra.B, rb.B, t)));
                }
            }
            return new VirranSavy(HeksaRgb(vari.Vanha), HeksaRgb(vari.Rintama));
        }

        /// <summary>
        /// Virtojen rintamien painopisteet kameralle hetkellä `nyt`: 3D-
        /// yksikkövektoreiden painotettu keskiarvo (antimeridiaani ei riko),
        /// paino (1 − ikä/leveys) · cos φ. Vain virrat, joilla on rintamaa,
        /// suurin paino ensin (vakaa järjestys kuten JS:n sort).
        /// </summary>
        public static List<Painopiste> RintamienPainopisteet(float[] aika, sbyte[] virta, double nyt,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus, ICollection<int> ohita = null)
        {
            var rintama = RintamanLeveys(nyt);
            const int Virtoja = 128;
            var sx = new double[Virtoja];
            var sy = new double[Virtoja];
            var sz = new double[Virtoja];
            var sp = new double[Virtoja];
            var nahty = new bool[Virtoja];
            var jarjestys = new List<int>(); // Map-olion lisäysjärjestys
            for (var i = 0; i < aika.Length; i += 1)
            {
                double a = aika[i];
                if (!(a > 0)) continue;
                int v = virta[i];
                if (v < 0 || (ohita != null && ohita.Contains(v))) continue;
                var ika = a - nyt;
                if (ika < 0 || ika > rintama) continue;
                var r = i / leveys;
                var c = i - r * leveys;
                var lat = Ruudukko.RivinLat(r) * Ruudukko.Rad;
                var lon = Ruudukko.SarakkeenLon(c) * Ruudukko.Rad;
                var cosLat = JsLuvut.Cos(lat);
                var paino = (1 - ika / rintama) * cosLat;
                if (!nahty[v]) { nahty[v] = true; jarjestys.Add(v); }
                sx[v] += paino * cosLat * JsLuvut.Cos(lon);
                sy[v] += paino * cosLat * JsLuvut.Sin(lon);
                sz[v] += paino * JsLuvut.Sin(lat);
                sp[v] += paino;
            }
            var ulos = new List<Painopiste>();
            foreach (var v in jarjestys)
            {
                if (!(sp[v] > 0)) continue;
                var x = sx[v] / sp[v];
                var y = sy[v] / sp[v];
                var z = sz[v] / sp[v];
                var R = Math.Min(1, JsLuvut.Hypot(x, y, z));
                var lat = Math.Atan2(z, JsLuvut.Hypot(x, y)) / Ruudukko.Rad;
                var lon = Math.Atan2(y, x) / Ruudukko.Rad;
                // Tasaisen kiekon kulmasäde θ: R̄ = (1 + cos θ) / 2 → θ = acos(2R̄ − 1).
                var hajonta = Math.Acos(Math.Max(-1, Math.Min(1, 2 * R - 1))) / Ruudukko.Rad;
                ulos.Add(new Painopiste { Virta = v, Paino = sp[v], Lat = lat, Lon = lon, Hajonta = hajonta });
            }
            return ulos.OrderByDescending((p) => p.Paino).ToList();
        }

        /// <summary>Kameran näkyvä leveys asteina hajonnasta: clamp(2,6·hajonta + 12, 28, 100).</summary>
        public static double KameranLeveysAsteina(double hajonta) => Math.Max(28, Math.Min(100, 2.6 * hajonta + 12));
    }
}
