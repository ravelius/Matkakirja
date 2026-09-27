using System;
using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// LENTO V3: ESILATAUSKÄYTÄVÄ JA KONEEN KORKEUS MAASTON YLLÄ (Natiiviseppä 27.9.2026; speksi
    /// docs/raportit/lento-v3-speksi.md kohdat 2 ja 5). Puhdas laskenta ilman UnityEngineä (Kartta-testit/LennonV3KaytavaTestit):
    ///   - <see cref="Laatat"/>: lennon laatat 60 näytteestä koneen reitiltä (LennonV3.ReitinKohta, KoneenOsuus) speksin
    ///     "käytännössä"-säännöllä: pohja ja maasto Z6 ±2, Z7 ±2 ja Z8 ±1 koko osuudelta sekä Z9 ±1 alun 0–5 s:n ja lopun
    ///     13–15 s:n kohdalla (lähikuva ja lasku). Järjestys on aikajärjestys (alun 5 s ensin, merkitty Alku = tosi), näytteen
    ///     sisällä karkein taso ensin. Pohja on Web Mercator XYZ (y pohjoisesta), maasto quantized-mesh TMS (2^(z+1) × 2^z,
    ///     y etelästä; MaastoLaatat.Laatta). Ateena: noin 110 pohja- ja 100 maastolaattaa (speksi: 116 + 108, ~2,2 Mt).
    ///   - <see cref="Lisakorkeus"/> ja <see cref="KoneenKorkeus"/>: kone vähintään 2 km liioitellun maaston yllä
    ///     (ennakoiva maksimisuodin ±8 km ja pehmennys), laskussa pyörät kohteen maahan.
    /// </summary>
    public static class LennonV3Kaytava
    {
        /// <summary>Näytteitä kamerareitiltä (speksi: 60).</summary>
        public const int Naytteita = 60;
        /// <summary>Alun lähikuva (s): nämä laatat ensin, ja leikkaus odottaa niitä kokonaan.</summary>
        public const double AlkuS = 5.0;
        /// <summary>Lopun lähestyminen ja lasku (s): Z9 myös täältä.</summary>
        public const double LoppuS = 13.0;

        /// <summary>Käytävän laatta: maasto (TMS) vai pohja (XYZ), taso ja paikka, ja kuuluuko alun 5 s:iin.</summary>
        public readonly struct Laatta
        {
            public readonly bool Maasto, Alku;
            public readonly int Z, X, Y;
            public Laatta(bool maasto, int z, int x, int y, bool alku) { Maasto = maasto; Z = z; X = x; Y = y; Alku = alku; }
            public override string ToString() => $"{(Maasto ? "maasto" : "pohja")} {Z}/{X}/{Y}{(Alku ? " alku" : "")}";
        }

        /// <summary>(taso, säde) koko osuudelta ja alun/lopun lähikuvista.</summary>
        static readonly (int z, int sade)[] Koko = { (6, 2), (7, 2), (8, 1) };
        static readonly (int z, int sade)[] Lahi = { (9, 1) };

        /// <summary>
        /// Käytävän laatat reitiltä (LennonV3.Reitti). Kukin laatta kerran, ensimmäisen tarvitsevan näytteen kohdalla, joten
        /// alun 5 s:n laatat ovat listan alussa.
        /// </summary>
        public static List<Laatta> Laatat(List<(double Lat, double Lon)> reitti)
        {
            var tulos = new List<Laatta>();
            if (reitti == null || reitti.Count < 2) return tulos;
            var pit = LennonV3.Pituudet(reitti);
            var nahty = new HashSet<long>();
            for (int i = 0; i < Naytteita; i++)
            {
                double t = LennonV3.KestoS * i / (Naytteita - 1);
                bool alku = t <= AlkuS;
                var q = LennonV3.ReitinKohta(reitti, pit, LennonV3.KoneenOsuus(t));
                foreach (var (z, sade) in Koko) Lisaa(tulos, nahty, q.Lat, q.Lon, z, sade, alku);
                if (alku || t >= LoppuS)
                    foreach (var (z, sade) in Lahi) Lisaa(tulos, nahty, q.Lat, q.Lon, z, sade, alku);
            }
            return tulos;
        }

        /// <summary>
        /// Aloitusnäytön esilämmitykseen (speksi kohta 5: aloituskohteiden alun 5 s): käytävän alun tarkat tasot Z8–Z9.
        /// Karkeat Z6–Z7 jätetään lennon alkuun (suuria, osin valintanäkymän välimuistissa), jotta 18 kohdetta pysyy
        /// muutamassa megatavussa.
        /// </summary>
        public static List<Laatta> Esilammitettavat(List<Laatta> kaytava)
        {
            var tulos = new List<Laatta>();
            if (kaytava == null) return tulos;
            foreach (var l in kaytava) if (l.Alku && l.Z >= 8) tulos.Add(l);
            return tulos;
        }

        internal static void Lisaa(List<Laatta> tulos, HashSet<long> nahty, double lat, double lon, int z, int sade, bool alku)
        {
            // Pohja (Web Mercator XYZ).
            int n = 1 << z;
            var (px, py) = Mercator(z, lat, lon);
            for (int dy = -sade; dy <= sade; dy++)
            {
                int y = py + dy;
                if (y < 0 || y >= n) continue;
                for (int dx = -sade; dx <= sade; dx++)
                {
                    int x = ((px + dx) % n + n) % n;
                    if (nahty.Add(Avain(false, z, x, y))) tulos.Add(new Laatta(false, z, x, y, alku));
                }
            }
            // Maasto (TMS, maantieteellinen 2^(z+1) × 2^z).
            int nx = 2 << z, ny = 1 << z;
            var (mx, my) = MaastoLaatat.Laatta(z, lat, lon);
            for (int dy = -sade; dy <= sade; dy++)
            {
                int y = my + dy;
                if (y < 0 || y >= ny) continue;
                for (int dx = -sade; dx <= sade; dx++)
                {
                    int x = ((mx + dx) % nx + nx) % nx;
                    if (nahty.Add(Avain(true, z, x, y))) tulos.Add(new Laatta(true, z, x, y, alku));
                }
            }
        }

        static long Avain(bool maasto, int z, int x, int y) => ((long)(maasto ? 1 : 0) << 62) | ((long)z << 56) | ((long)x << 28) | (long)y;

        /// <summary>Web Mercator XYZ -laatta pisteelle (y = 0 pohjoisessa).</summary>
        public static (int x, int y) Mercator(int z, double lat, double lon)
        {
            int n = 1 << z;
            double la = Math.Max(-85.0, Math.Min(85.0, lat)) * Math.PI / 180.0;
            int x = (int)Math.Floor((lon + 180.0) / 360.0 * n);
            int y = (int)Math.Floor((1.0 - Math.Log(Math.Tan(la) + 1.0 / Math.Cos(la)) / Math.PI) / 2.0 * n);
            return (((x % n) + n) % n, Math.Max(0, Math.Min(n - 1, y)));
        }

        // ---- Koneen korkeus maaston yllä (speksi kohta 2) ----

        /// <summary>Vähimmäisvara liioitellun maaston yllä (m), ennakoivan maksimisuotimen ikkuna (±m) ja pehmennys (±m).</summary>
        public const double MaastoVaraM = 2000.0, IkkunaM = 8000.0, PehmennysM = 15000.0;

        /// <summary>
        /// Lisäkorkeus (m) matkakorkeuden (LennonV3.MatkaKorkeusM) päälle reitin tasavälisissä näytteissä (osuus 0–1):
        /// max(0, max(maasto ±8 km) + 2 km − 3,5 km), maksimisuodatettuna vielä pehmennyksen verran ja sitten
        /// liukuvalla keskiarvolla pehmennettynä, joten kone nousee harjanteen yli ennakoiden eikä lisä jää vaatimuksen alle.
        /// maastoM = liioiteltu korkeus (KorkeusKerroin.Sovita) näytteissä, NaN = puuttuva näyte (ohitetaan).
        /// </summary>
        public static double[] Lisakorkeus(double[] maastoM, double reittiM)
        {
            int n = maastoM?.Length ?? 0;
            var tulos = new double[Math.Max(n, 1)];
            if (n < 2 || !(reittiM > 0)) return tulos;
            double vali = reittiM / (n - 1);
            int w = (int)Math.Ceiling(IkkunaM / vali), p = (int)Math.Ceiling(PehmennysM / vali);
            var tarve = new double[n];
            for (int i = 0; i < n; i++)
            {
                double m = double.NegativeInfinity;
                for (int j = Math.Max(0, i - w); j <= Math.Min(n - 1, i + w); j++)
                    if (!double.IsNaN(maastoM[j])) m = Math.Max(m, maastoM[j]);
                tarve[i] = double.IsNegativeInfinity(m) ? 0.0 : Math.Max(0.0, m + MaastoVaraM - LennonV3.MatkaKorkeusM);
            }
            var leve = new double[n];
            for (int i = 0; i < n; i++)
            {
                double m = 0;
                for (int j = Math.Max(0, i - p); j <= Math.Min(n - 1, i + p); j++) m = Math.Max(m, tarve[j]);
                leve[i] = m;
            }
            for (int i = 0; i < n; i++)
            {
                double s = 0; int k = 0;
                for (int j = Math.Max(0, i - p); j <= Math.Min(n - 1, i + p); j++) { s += leve[j]; k++; }
                tulos[i] = Math.Max(tarve[i], s / k);
            }
            return tulos;
        }

        /// <summary>Lisäkorkeus reitin osuudessa u (lineaarinen interpolaatio <see cref="Lisakorkeus"/>-näytteistä).</summary>
        public static double LisaOsuudessa(double[] lisa, double u)
        {
            if (lisa == null || lisa.Length == 0) return 0.0;
            if (lisa.Length == 1) return lisa[0];
            double x = Math.Max(0.0, Math.Min(1.0, u)) * (lisa.Length - 1);
            int i = Math.Min(lisa.Length - 2, (int)x);
            return lisa[i] + (lisa[i + 1] - lisa[i]) * (x - i);
        }

        /// <summary>
        /// Koneen korkeus ellipsoidista (m) hetkellä t: LennonV3.KoneenKorkeusM (3,5 km, liuku 11,5 s:sta, kosketus 14,3 s)
        /// + maaston lisä (<paramref name="lisa"/> tässä osuudessa), joka laskussa vaihtuu pehmeästi kohteen maan
        /// korkeuteen (<paramref name="maaKohteessa"/>, liioiteltu), joten pyörät osuvat kaupungin maahan.
        /// </summary>
        public static double KoneenKorkeus(double t, double lisa, double maaKohteessa)
        {
            double w = Pehmea((t - LennonV3.LaskuAlkaaS) / (LennonV3.KosketusS - LennonV3.LaskuAlkaaS));
            return LennonV3.KoneenKorkeusM(t) + lisa + (Math.Max(0.0, maaKohteessa) - lisa) * w;
        }

        static double Pehmea(double x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * x * (x * (x * 6 - 15) + 10); }

        // ---- Odotus ennen leikkausta (speksi kohta 5) ----

        /// <summary>Odotuksen vähimmäisaika, katto alun ollessa valmis ja ehdoton katto (s); käytävän kynnys.</summary>
        public const double OdotusVahintaanS = 0.5, OdotusKattoS = 6.0, OdotusEhdotonS = 10.0, KaytavaKynnys = 0.96;

        /// <summary>
        /// Leikkaako odotus nyt: vähintään 0,5 s, ja joko käytävä ≥ 96 % ja alun 5 s valmis, alku valmis ja 6 s kulunut, tai
        /// 10 s kulunut (puuttuva laatta pehmeänä karkeammasta tasosta). Syy lokiin: "valmis", "katto", "ehdoton" tai null.
        /// Offline-tilassa puuttuvat laatat epäonnistuvat heti (Esilataus.Osuus laskee ne käsitellyiksi), joten peli ei jumitu.
        /// </summary>
        public static string Leikkaa(double kulunutS, double kaytava, double alku)
        {
            if (kulunutS < OdotusVahintaanS) return null;
            bool alkuValmis = alku >= 0.9999;
            if (alkuValmis && kaytava >= KaytavaKynnys) return "valmis";
            if (alkuValmis && kulunutS >= OdotusKattoS) return "katto";
            if (kulunutS >= OdotusEhdotonS) return "ehdoton";
            return null;
        }
    }
}
