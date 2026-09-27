using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// POHJAN KAUPUNKITASO Z10 (Fablen tilaus 27.9.2026, Karttasepän pallo-Z10-poltto, Siirtosepän #3395 skeema 1.51):
    /// pohjasarjassa (2026-09-26-pohja-20260926) Z0–Z9 kattavat koko maailman, mutta Z10 on poltettu vain kaupunkien ±1°:n
    /// laatikoihin (13 856 laattaa). offline.json kertoo joukon: lahteet.rasteri.kaupunkiRasteri.tasot [10] ja
    /// maat.&lt;ISO&gt;.kaupunkiRasteri["10"] = rivijuoksut [x0, y, x1, y] (XYZ, rivi 0 pohjoisessa, kuten pohjan polut).
    /// Vanhat buildit eivät lue kaupunkiRasteri-avainta (Siirtosepälle kuitattu 27.9. klo 17.0x).
    ///
    /// Laattapalvelin kysyy <see cref="Onko"/>: tunnetulla joukolla puuttuva Z10-laatta tehdään heti Z9-vanhemmasta
    /// (ei verkkohakua eikä 404:ää), tuntemattomalla (offline.json ei vielä luettu tai vanha paketti) haetaan verkosta ja
    /// epäonnistuessa tehdään samoin. Puhdas laskenta (Kartta-testit/KaupunkiRasteriTestit).
    /// </summary>
    public static class KaupunkiRasteri
    {
        /// <summary>Pohjan syvin taso tällä erällä (pohjakerroksen maximumLevel, kun <see cref="Paalla"/>).</summary>
        public const int Taso = 10;

        /// <summary>Kehittäjälippu A/B-vertailuun (komento `pohja z10 0|1`): pois = pohja Z0–Z9 kuten ennen.</summary>
        public static bool Paalla = true;

        static readonly HashSet<long> laatat = new HashSet<long>();
        static readonly object lukko = new object();

        /// <summary>Joukko luettu offline.jsonista (false = tuntematon: haetaan verkosta ja tehdään vanhemmasta vain virheessä).</summary>
        public static bool Tunnettu { get; private set; }

        /// <summary>Joukon koko (loki).</summary>
        public static int Maara { get { lock (lukko) return laatat.Count; } }

        static long Avain(int z, int x, int y) => ((long)z << 58) | ((long)x << 29) | (uint)y;

        /// <summary>Tyhjennys (testit ja uusi paketti).</summary>
        public static void Nollaa() { lock (lukko) { laatat.Clear(); Tunnettu = false; } }

        /// <summary>
        /// Lukee offline.jsonin juuren: lahteet.rasteri.kaupunkiRasteri.tasot ja jokaisen maan kaupunkiRasteri-rivijuoksut.
        /// Palauttaa luettujen laattojen määrän; 0 ja Tunnettu = false, jos avainta ei ole (vanha paketti).
        /// </summary>
        public static int Lue(Dictionary<string, object> juuri)
        {
            if (juuri == null) return 0;
            if (!(juuri.TryGetValue("lahteet", out var la) && la is Dictionary<string, object> lahteet &&
                  lahteet.TryGetValue("rasteri", out var lr) && lr is Dictionary<string, object> rasteri &&
                  rasteri.TryGetValue("kaupunkiRasteri", out var kr) && kr is Dictionary<string, object>))
                return 0;
            int n = 0;
            lock (lukko)
            {
                laatat.Clear();
                if (juuri.TryGetValue("maat", out var m) && m is Dictionary<string, object> maat)
                    foreach (var p in maat)
                        if (p.Value is Dictionary<string, object> md && md.TryGetValue("kaupunkiRasteri", out var k) &&
                            k is Dictionary<string, object> tasot)
                            n += LisaaTasot(tasot);
                Tunnettu = true;
            }
            return n;
        }

        /// <summary>Tasot → rivijuoksut: {"10": [[x0,y0,x1,y1], …]} tai yksi väli [x0,y0,x1,y1].</summary>
        static int LisaaTasot(Dictionary<string, object> tasot)
        {
            int n = 0;
            foreach (var t in tasot)
            {
                if (!int.TryParse(t.Key, out int z) || !(t.Value is List<object> l) || l.Count == 0) continue;
                var valit = new List<List<object>>();
                if (l[0] is List<object>) { foreach (var v in l) if (v is List<object> vl) valit.Add(vl); }
                else valit.Add(l);
                foreach (var v in valit)
                {
                    if (v.Count < 4 || !(v[0] is double a) || !(v[1] is double b) || !(v[2] is double c) || !(v[3] is double d)) continue;
                    for (int x = (int)a; x <= (int)c; x++)
                        for (int y = (int)b; y <= (int)d; y++)
                            if (laatat.Add(Avain(z, x, y))) n++;
                }
            }
            return n;
        }

        /// <summary>Onko pohjan laatta z/x/y poltettu: true/false, kun joukko on tunnettu; null, jos ei tiedetä.</summary>
        public static bool? Onko(int z, int x, int y)
        {
            if (!Tunnettu) return null;
            lock (lukko) return laatat.Contains(Avain(z, x, y));
        }

        /// <summary>
        /// Pohjan polun jäsennys: "&lt;PohjaPolku&gt;z/x/y.jpg" → (z, x, y). false, jos polku ei ole pohjan laatta.
        /// </summary>
        public static bool Jasenna(string polku, string pohjaPolku, out int z, out int x, out int y)
        {
            z = x = y = 0;
            if (polku == null || pohjaPolku == null || !polku.StartsWith(pohjaPolku, System.StringComparison.Ordinal)) return false;
            var osat = polku.Substring(pohjaPolku.Length).Split('/');
            if (osat.Length != 3) return false;
            int piste = osat[2].IndexOf('.');
            return int.TryParse(osat[0], out z) && int.TryParse(osat[1], out x)
                   && int.TryParse(piste < 0 ? osat[2] : osat[2].Substring(0, piste), out y);
        }

        /// <summary>
        /// Vanhemman polku ja neljännes: lapsi (z, x, y) → vanhempi (z−1, x/2, y/2). qx 0 = vasen, 1 = oikea; qy 0 = ylempi
        /// (XYZ: parillinen rivi on pohjoisempi), 1 = alempi.
        /// </summary>
        public static string Vanhempi(string polku, string pohjaPolku, int z, int x, int y, out int qx, out int qy)
        {
            qx = x & 1; qy = y & 1;
            string paate = polku.Substring(polku.LastIndexOf('.'));
            return pohjaPolku + (z - 1) + "/" + (x >> 1) + "/" + (y >> 1) + paate;
        }

        /// <summary>
        /// Neljänneksen suurennus (bilineaarinen) koko laatan kokoon. Pikselit Unityn järjestyksessä (rivi 0 alhaalla):
        /// ylempi neljännes (qy 0) on rivit koko/2…koko−1. RGB24-tavut 3 per pikseli.
        /// </summary>
        public static byte[] Suurenna(byte[] rgb, int koko, int qx, int qy)
        {
            int puoli = koko / 2, x0 = qx * puoli, y0 = qy == 0 ? puoli : 0;
            var ulos = new byte[koko * koko * 3];
            for (int j = 0; j < koko; j++)
            {
                // Pikselin keskipiste lähteessä: (j + 0.5) / 2 − 0.5, rajattuna neljänneksen reunoihin (ei vuoda naapuriin).
                double sy = (j + 0.5) * 0.5 - 0.5;
                if (sy < 0) sy = 0; if (sy > puoli - 1) sy = puoli - 1;
                int ya = (int)sy, yb = ya + 1 < puoli ? ya + 1 : ya;
                double fy = sy - ya;
                for (int i = 0; i < koko; i++)
                {
                    double sx = (i + 0.5) * 0.5 - 0.5;
                    if (sx < 0) sx = 0; if (sx > puoli - 1) sx = puoli - 1;
                    int xa = (int)sx, xb = xa + 1 < puoli ? xa + 1 : xa;
                    double fx = sx - xa;
                    int o = (j * koko + i) * 3;
                    for (int c = 0; c < 3; c++)
                    {
                        double p00 = rgb[((y0 + ya) * koko + x0 + xa) * 3 + c], p10 = rgb[((y0 + ya) * koko + x0 + xb) * 3 + c];
                        double p01 = rgb[((y0 + yb) * koko + x0 + xa) * 3 + c], p11 = rgb[((y0 + yb) * koko + x0 + xb) * 3 + c];
                        double v = (p00 * (1 - fx) + p10 * fx) * (1 - fy) + (p01 * (1 - fx) + p11 * fx) * fy;
                        ulos[o + c] = (byte)(v + 0.5);
                    }
                }
            }
            return ulos;
        }
    }
}
