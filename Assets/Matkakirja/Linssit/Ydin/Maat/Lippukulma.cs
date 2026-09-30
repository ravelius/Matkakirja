// LIPPUTANGON PAIKKA MAAN OIKEASSA YLÄKULMASSA (omistaja 29.9.2026 klo 23.2x Päätoimittajan kautta, iPad-kuva Italiasta, jossa
// lippu oli Puglian keskellä: "Lippu pitää olla aina maan oik. yläkulmassa. Muuten se näkyy huonosti kun koko maa on
// näytöllä."). Korvaa Karttasepän lippuankkureiden itäisimmän viidenneksen säännön (tools/tee-lippuankkurit.mjs, löydös 161):
//   1. mantere = maan suurin rengas (maarajat.json), sen reiät mukana (enklaavit kuten San Marino); saaret eivät kelpaa;
//   2. piste on vähintään SisamaastaKm rannasta ja rajasta (pienessä maassa puolet syvimmästä), etäisyyskenttä rasterina
//      kuten generaattorissa (chamfer, rivikohtainen x-mitta);
//   3. ehdoista valitaan lähin mantereen rajalaatikon koilliskulmaa laatikkoon suhteutettuna (u = itä 0…1, v = pohjoinen 0…1,
//      pisteet (1 − u)² + (1 − v)²), jolloin sama sääntö toimii pitkässä Norjassa ja leveässä Ranskassa;
//   4. pelin kaupungeista vähintään KohteistaKm, jos sellainen piste on enintään KohteenVara huonompi kuin paras.
// Puhdas C#, testit Linssit-testit/Testit/LippukulmaTestit.cs; Natiivi-UI:n Kartuscha kutsuu (varalla vanha ankkuritiedosto).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Maat
{
    public static class Lippukulma
    {
        public const double SisamaastaKm = 15, KohteistaKm = 25, KohteenVara = 0.03;
        const double Rad = Math.PI / 180;

        /// <summary>Paikka (lat, lon) tai null, jos maalla ei ole renkaita. <paramref name="kohteet"/> = pelin kaupungit (lat, lon).
        /// <paramref name="kelpaa"/> (valinnainen) rajaa ehdokkaat, esim. näkyvissä yläpaneelin alla (Kartuscha 30.9.2026); jos mikään
        /// ehdokas ei kelpaa, tulos on null.</summary>
        public static (double Lat, double Lon)? Laske(Maa maa, IEnumerable<(double Lat, double Lon)> kohteet = null,
            Func<double, double, bool> kelpaa = null)
        {
            if (maa?.Renkaat == null || maa.Renkaat.Count == 0) return null;
            var manner = Suurin(maa.Renkaat);
            if (manner == null) return null;
            double w = double.MaxValue, e = double.MinValue, s = double.MaxValue, n = double.MinValue;
            foreach (var (lon, lat) in manner) { w = Math.Min(w, lon); e = Math.Max(e, lon); s = Math.Min(s, lat); n = Math.Max(n, lat); }
            // Reiät: renkaat, jotka ovat mantereen sisällä (parillisuussääntö poistaa ne maasta).
            var renkaat = new List<(double Lon, double Lat)[]> { manner };
            foreach (var r in maa.Renkaat)
                if (r != manner && r.Length > 2 && r[0].Lon > w && r[0].Lon < e && r[0].Lat > s && r[0].Lat < n && Sisalla(manner, r[0].Lon, r[0].Lat))
                    renkaat.Add(r);

            double solu = Math.Max(0.01, Math.Max(e - w, n - s) / 300);
            double w0 = w - solu, n0 = n + solu;
            int W = (int)Math.Ceiling((e - w) / solu) + 3, H = (int)Math.Ceiling((n - s) / solu) + 3;
            var d = Etaisyys(renkaat, w0, n0, solu, W, H);

            double syvin = 0;
            for (int i = 0; i < d.Length; i++) syvin = Math.Max(syvin, d[i]);
            if (syvin <= 0) return (maa.KeskusLat, maa.KeskusLon);
            double kynnys = Math.Min(SisamaastaKm, 0.5 * syvin);

            var ehdot = new List<(double Pisteet, double Lat, double Lon)>();
            for (int r = 0; r < H; r++)
                for (int c = 0; c < W; c++)
                {
                    if (d[r * W + c] < kynnys) continue;
                    double lon = w0 + (c + 0.5) * solu, lat = n0 - (r + 0.5) * solu;
                    double u = (lon - w) / Math.Max(1e-9, e - w), v = (lat - s) / Math.Max(1e-9, n - s);
                    ehdot.Add(((1 - u) * (1 - u) + (1 - v) * (1 - v), lat, lon));
                }
            ehdot.Sort((a, b) => a.Pisteet.CompareTo(b.Pisteet));
            if (kelpaa != null)
            {
                // Laiska suodatus: ensimmäinen kelpaava ja sen jälkeen vain kaupunkivaran sisällä olevat (ennuste on kallis).
                var suodatetut = new List<(double Pisteet, double Lat, double Lon)>();
                double raja = double.MaxValue;
                foreach (var ed in ehdot)
                {
                    if (ed.Pisteet > raja) break;
                    if (!kelpaa(ed.Lat, ((ed.Lon % 360) + 540) % 360 - 180)) continue;
                    if (suodatetut.Count == 0) raja = ed.Pisteet + KohteenVara;
                    suodatetut.Add(ed);
                }
                if (suodatetut.Count == 0) return null;
                ehdot = suodatetut;
            }
            var paras = ehdot[0];
            var lista = new List<(double Lat, double Lon)>();
            if (kohteet != null) foreach (var k in kohteet) if (!double.IsNaN(k.Lat) && !double.IsNaN(k.Lon)) lista.Add(k);
            if (lista.Count > 0)
                foreach (var ehto in ehdot)
                {
                    if (ehto.Pisteet > paras.Pisteet + KohteenVara) break;
                    bool vapaa = true;
                    foreach (var k in lista) if (Km(ehto.Lat, ehto.Lon, k.Lat, k.Lon) < KohteistaKm) { vapaa = false; break; }
                    if (vapaa) { paras = ehto; break; }
                }
            double lo = ((paras.Lon % 360) + 540) % 360 - 180;
            return (Math.Round(paras.Lat, 4), Math.Round(lo, 4));
        }

        static (double Lon, double Lat)[] Suurin(List<(double Lon, double Lat)[]> renkaat)
        {
            (double Lon, double Lat)[] paras = null;
            double ala = -1;
            foreach (var r in renkaat)
            {
                if (r == null || r.Length < 3) continue;
                double lat0 = 0;
                foreach (var p in r) lat0 += p.Lat;
                double kx = Math.Cos(lat0 / r.Length * Rad), a = 0;
                for (int i = 0, j = r.Length - 1; i < r.Length; j = i++) a += (r[j].Lon - r[i].Lon) * kx * (r[j].Lat + r[i].Lat);
                a = Math.Abs(a);
                if (a > ala) { ala = a; paras = r; }
            }
            return paras;
        }

        static bool Sisalla((double Lon, double Lat)[] r, double lon, double lat)
        {
            bool s = false;
            for (int i = 0, j = r.Length - 1; i < r.Length; j = i++)
                if ((r[i].Lat > lat) != (r[j].Lat > lat) && lon < r[j].Lon + (lat - r[j].Lat) / (r[i].Lat - r[j].Lat) * (r[i].Lon - r[j].Lon)) s = !s;
            return s;
        }

        /// <summary>Etäisyys reunaan km jokaiselle solulle (0 ulkona): parillisuusrasteri ja kaksivaiheinen chamfer.</summary>
        static double[] Etaisyys(List<(double Lon, double Lat)[]> renkaat, double w0, double n0, double solu, int W, int H)
        {
            var d = new double[W * H];
            var xs = new List<double>();
            for (int r = 0; r < H; r++)
            {
                double lat = n0 - (r + 0.5) * solu;
                xs.Clear();
                foreach (var g in renkaat)
                    for (int i = 0, j = g.Length - 1; i < g.Length; j = i++)
                        if ((g[j].Lat > lat) != (g[i].Lat > lat))
                            xs.Add(g[j].Lon + (lat - g[j].Lat) / (g[i].Lat - g[j].Lat) * (g[i].Lon - g[j].Lon));
                xs.Sort();
                for (int k = 0; k + 1 < xs.Count; k += 2)
                {
                    int c0 = Math.Max(0, (int)Math.Ceiling((xs[k] - w0) / solu - 0.5)), c1 = Math.Min(W - 1, (int)Math.Floor((xs[k + 1] - w0) / solu - 0.5));
                    for (int c = c0; c <= c1; c++) d[r * W + c] = 1e9;
                }
            }
            double dy = solu * 110.57;
            for (int pass = 0; pass < 2; pass++)
            {
                int askel = pass == 0 ? 1 : -1;
                for (int r = pass == 0 ? 0 : H - 1; r >= 0 && r < H; r += askel)
                {
                    double dx = solu * 111.32 * Math.Cos((n0 - (r + 0.5) * solu) * Rad), dd = Math.Sqrt(dx * dx + dy * dy);
                    for (int c = pass == 0 ? 0 : W - 1; c >= 0 && c < W; c += askel)
                    {
                        int i = r * W + c;
                        if (d[i] == 0) continue;
                        double v = d[i];
                        int rr = r - askel;
                        v = Math.Min(v, Arvo(d, W, H, r, c - askel) + dx);
                        v = Math.Min(v, Arvo(d, W, H, rr, c) + dy);
                        v = Math.Min(v, Arvo(d, W, H, rr, c - 1) + dd);
                        v = Math.Min(v, Arvo(d, W, H, rr, c + 1) + dd);
                        d[i] = v;
                    }
                }
            }
            return d;
        }

        static double Arvo(double[] d, int W, int H, int r, int c) => r < 0 || c < 0 || r >= H || c >= W ? 0 : d[r * W + c];

        static double Km(double lat1, double lon1, double lat2, double lon2)
        {
            double h = Math.Pow(Math.Sin((lat2 - lat1) * Rad / 2), 2)
                       + Math.Cos(lat1 * Rad) * Math.Cos(lat2 * Rad) * Math.Pow(Math.Sin((lon2 - lon1) * Rad / 2), 2);
            return 2 * 6371 * Math.Asin(Math.Sqrt(h));
        }
    }
}
