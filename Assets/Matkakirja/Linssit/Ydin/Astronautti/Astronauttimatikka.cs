// ASTRONAUTIN KAMERAN PUHTAAT KAAVAT (web js/linssit/satelliitti-avaruus.js
// radanPiste, issPaikka, issKaari, avausKorkeus, halkaisijaRuudulla, zoomirajat;
// astro-sumu.js pilvienPeitto, sumunPeitto; satelliitti-nimiot.js ladoNimiot;
// satelliitti.js parasHavainto, oletusIndeksi; js/pallolauta/kamera.js
// kokoPallonKorkeus).
//
// Korkeudet ovat PALLON SÄTEINÄ kuten Globe.gl:ssä (0,06 = 6 % säteestä pinnan
// yläpuolella); sovitin kertoo ne maapallon säteellä metreiksi.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Astronautti
{
    /// <summary>Nimiön kylki pisteeseen nähden (satelliitti-nimiot.js KYLJET, PIILO).</summary>
    public enum Kylki { Ala, Yla, Oikea, Vasen, Piilo }

    /// <summary>Suorakulmio ruutupisteinä (vasen yläkulma, leveys, korkeus).</summary>
    public readonly struct Laatikko2
    {
        public readonly double X, Y, W, H;
        public Laatikko2(double x, double y, double w, double h) { X = x; Y = y; W = w; H = h; }
    }

    /// <summary>Ladottava nimiö: pisteen keskipiste ruudulla ja nimen koko.</summary>
    public readonly struct NimionKohde
    {
        public readonly string Id;
        public readonly double X, Y, W, H;
        public NimionKohde(string id, double x, double y, double w, double h) { Id = id; X = x; Y = y; W = w; H = h; }
    }

    public static class Astronauttimatikka
    {
        public const double IssInklinaatio = 51.6;
        public const double IssKorkeus = 0.06;           // pallon säteinä
        public const double IssKierrosS = 75;            // nopeutettu (oikea 92 min)
        public const double IssSolmunKiertoS = 900;
        public const int IssKaarenPisteita = 240;
        public const double AvauksenMarginaali = 0.08;
        public const double AvausajonLoppu = 0.72;
        public const double AvauszoominKestoMs = 5000;
        public const double PyorimistaAstettaS = 0.16;
        public const double AvaruudenFov = 50;
        public const double NimienKynnys = 0.25;
        public const double NimienKynnysPois = 0.29;
        public const double ZoominLahin = 0.084, ZoominPohja = 0.1, ZoominKauin = 1.3;
        public const double ReliefinSaturaatio = 0.8;
        public const double PilvienSade = 1.01, PilvienPeittoHuippu = 0.9, PilvienKiertoAstettaMin = 0.5;
        public const double PilvienTaysi = 0.65, PilvienNolla = 0.25;
        public const double SumunKauko = 1.3, SumunKaukoPeitto = 0.15, SumunKeski = 0.6, SumunKeskiPeitto = 0.62, SumunLahi = 0.22;
        public const double NimionVali = 11, NimioidenRako = 2, YtimenEste = 6, LadonnanValiMs = 120;
        public const double OsumaSadePx = 44;

        const double R = Math.PI / 180;

        public static LatLon RadanPiste(double u, double solmu = 0, double inklinaatio = IssInklinaatio)
        {
            double i = inklinaatio * R, a = (double.IsNaN(u) ? 0 : u) * R;
            double lat = Math.Asin(Math.Sin(i) * Math.Sin(a)) / R;
            double lng = (double.IsNaN(solmu) ? 0 : solmu) + Math.Atan2(Math.Cos(i) * Math.Sin(a), Math.Cos(a)) / R;
            lng = ((lng + 180) % 360 + 360) % 360 - 180;
            return new LatLon(lat, lng);
        }

        public static LatLon IssPaikka(double t) => RadanPiste(360 * t / IssKierrosS, -360 * t / IssSolmunKiertoS);

        public static List<LatLon> IssKaari(double t, int maara = IssKaarenPisteita)
        {
            double solmu = -360 * t / IssSolmunKiertoS;
            int n = Math.Max(8, maara);
            var ulos = new List<LatLon>(n + 1);
            for (int k = 0; k <= n; k++) ulos.Add(RadanPiste(360.0 * k / n, solmu));
            return ulos;
        }

        /// <summary>Korkeus (säteinä), jolla koko pallo mahtuu ruudun kapeampaan sivuun (fov pystykulma).</summary>
        public static double KokoPallonKorkeus(double leveys, double korkeus, double fov, double marginaali, double varalla)
        {
            if (!(korkeus > 0) || !(leveys > 0)) return varalla;
            double m = Math.Max(0, Math.Min(0.6, marginaali));
            double mahtuu = Math.Min(leveys, korkeus) * (1 - m);
            double tanA = mahtuu / korkeus * Math.Tan(fov / 2 * R);
            double sinA = tanA / Math.Sqrt(1 + tanA * tanA);
            if (!(sinA > 0)) return varalla;
            return 1 / sinA - 1;
        }

        /// <summary>Avauksen korkeus (säteinä): koko pallo ruutuun marginaalilla 0,08, fov 50°; varalla PALLO_KORKEUS_MAX.</summary>
        public static double AvausKorkeus(double leveys, double korkeus, double varalla = 2.5) =>
            KokoPallonKorkeus(leveys, korkeus, AvaruudenFov, AvauksenMarginaali, varalla);

        /// <summary>Lepokorkeus avauszoomin jälkeen.</summary>
        public static double LepoKorkeus(double avaus) => avaus * AvausajonLoppu;

        /// <summary>Pallon halkaisija ruutupisteinä korkeudelta alt (säteinä); korkeus = ruudun korkeus.</summary>
        public static double HalkaisijaRuudulla(double alt, double ruudunKorkeus, double fov = AvaruudenFov)
        {
            double d = 1 + Math.Max(0, alt);
            if (!(ruudunKorkeus > 0) || !(d > 1)) return 0;
            double a = Math.Asin(Math.Min(1, 1 / d));
            return ruudunKorkeus * Math.Tan(a) / Math.Tan(fov / 2 * R);
        }

        public static (double min, double max) Zoomirajat(double alt)
        {
            double a = Math.Max(0.05, double.IsNaN(alt) ? 0.05 : alt);
            double min = Math.Max(ZoominPohja, a * ZoominLahin);
            double max = a * ZoominKauin;
            return (Math.Min(min, max * 0.95), max);
        }

        /// <summary>Kuutiollinen ease-in-out avauszoomille (web avausPehmennys).</summary>
        public static double AvausPehmennys(double t)
        {
            double x = Math.Max(0, Math.Min(1, t));
            return x < 0.5 ? 4 * x * x * x : 1 - Math.Pow(-2 * x + 2, 3) / 2;
        }

        /// <summary>Nimet näkyvät (hystereesi): näkyvä pysyy, kunnes korkeus ylittää pois-kynnyksen.</summary>
        public static bool NimetNakyvat(double korkeus, double avaus, bool nyt) =>
            nyt ? korkeus < NimienKynnysPois * avaus : korkeus < NimienKynnys * avaus;

        public static double PilvienPeitto(double korkeus, double avaus)
        {
            if (!(avaus > 0) || !double.IsFinite(korkeus)) return 0;
            double s = korkeus / avaus;
            if (s >= PilvienTaysi) return PilvienPeittoHuippu;
            if (s <= PilvienNolla) return 0;
            double t = (s - PilvienNolla) / (PilvienTaysi - PilvienNolla);
            return PilvienPeittoHuippu * (t * t * (3 - 2 * t));
        }

        public static double SumunPeitto(double korkeus, double avaus)
        {
            if (!(avaus > 0) || !double.IsFinite(korkeus)) return 0;
            double s = korkeus / avaus;
            if (s >= SumunKauko) return SumunKaukoPeitto;
            if (s <= SumunLahi) return 0;
            if (s >= SumunKeski) return Liuku(s, SumunKeski, SumunKauko, SumunKeskiPeitto, SumunKaukoPeitto);
            return Liuku(s, SumunLahi, SumunKeski, 0, SumunKeskiPeitto);
        }

        static double Liuku(double x, double x0, double x1, double a, double b)
        {
            if (x1 == x0) return a;
            double t = Math.Max(0, Math.Min(1, (x - x0) / (x1 - x0)));
            return a + (b - a) * t;
        }

        // ── Nimiöt ────────────────────────────────────────────────────────

        static readonly Kylki[] Kyljet = { Kylki.Ala, Kylki.Yla, Kylki.Oikea, Kylki.Vasen };

        public static Laatikko2 NimionLaatikko(NimionKohde k, Kylki kylki)
        {
            double v = NimionVali;
            switch (kylki)
            {
                case Kylki.Yla: return new Laatikko2(k.X - k.W / 2, k.Y - v - k.H, k.W, k.H);
                case Kylki.Oikea: return new Laatikko2(k.X + v, k.Y - k.H / 2, k.W, k.H);
                case Kylki.Vasen: return new Laatikko2(k.X - v - k.W, k.Y - k.H / 2, k.W, k.H);
                default: return new Laatikko2(k.X - k.W / 2, k.Y + v, k.W, k.H);
            }
        }

        public static bool Leikkaa(Laatikko2 a, Laatikko2 b, double rako = 0) =>
            a.X < b.X + b.W + rako && b.X < a.X + a.W + rako && a.Y < b.Y + b.H + rako && b.Y < a.Y + a.H + rako;

        /// <summary>
        /// Nimiöiden ladonta: kyljet ala → ylä → oikea → vasen (edellinen kylki ensin),
        /// ei päällekkäin ladottujen kanssa (rako 2) eikä muiden pisteiden ytimien (6×6)
        /// päällä; muuten piiloon. Järjestys = aineiston järjestys.
        /// </summary>
        public static Dictionary<string, Kylki> LadoNimiot(IReadOnlyList<NimionKohde> kohteet,
            IReadOnlyDictionary<string, Kylki> edelliset = null, double rako = NimioidenRako)
        {
            var tulos = new Dictionary<string, Kylki>();
            var ladotut = new List<Laatikko2>();
            var ytimet = new List<(string id, Laatikko2 l)>();
            foreach (var k in kohteet)
                ytimet.Add((k.Id, new Laatikko2(k.X - YtimenEste / 2, k.Y - YtimenEste / 2, YtimenEste, YtimenEste)));
            foreach (var k in kohteet)
            {
                var jarjestys = new List<Kylki>();
                if (edelliset != null && edelliset.TryGetValue(k.Id, out var aiempi) && aiempi != Kylki.Piilo) jarjestys.Add(aiempi);
                foreach (var x in Kyljet) if (!jarjestys.Contains(x)) jarjestys.Add(x);
                var valittu = Kylki.Piilo;
                foreach (var kylki in jarjestys)
                {
                    var l = NimionLaatikko(k, kylki);
                    bool este = false;
                    foreach (var m in ladotut) if (Leikkaa(l, m, rako)) { este = true; break; }
                    if (!este) foreach (var y in ytimet) if (y.id != k.Id && Leikkaa(l, y.l)) { este = true; break; }
                    if (este) continue;
                    valittu = kylki;
                    ladotut.Add(l);
                    break;
                }
                tulos[k.Id] = valittu;
            }
            return tulos;
        }
    }
}
