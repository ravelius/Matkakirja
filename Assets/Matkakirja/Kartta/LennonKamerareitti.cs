using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Matkakirja
{
    /// <summary>
    /// LENNON KAMERAREITTI NÄYTTEINÄ (löydös 120, omistaja build 14: "kamera pomppii liian villisti eri paikkoihin").
    /// Puhdas mittari: kameran silmä ja katsesuunta näytteinä → nopeus (m/s), kulmanopeus (°/s) ja hyppymerkinnät.
    /// HYPPY = sijainnin muutos yhdessä näytteessä on yli <see cref="HyppyKerroin"/> × ympäröivien (edellinen ja seuraava)
    /// keskiarvo; KULMAHYPPY sama katsesuunnan kulmamuutokselle. Lähteet:
    ///   * <see cref="Suunnitelma"/>: LennonAikajana pallomallilla (PalloKierto.Aseta ja Nappula.Lento ilman maastoa),
    ///     Kartta-testit (LennonKamerareittiTestit) ja ./kaanna.sh TulostaKamerareitti;
    ///   * Nappula: oikea kamera 0,1 s:n välein (komento "kamerareitti paalle"), raportti lokiin lennon lopussa.
    /// </summary>
    public static class LennonKamerareitti
    {
        const double R = 6371000.0;
        /// <summary>Hyppyraja: näytteen muutos yli 3 × ympäröivien keskiarvo (Fable 25.9., löydös 120).</summary>
        public const double HyppyKerroin = 3.0;
        /// <summary>Alle tämän (m tai °) näytteen muutosta ei tulkita hypyksi (kamera lähes paikallaan).</summary>
        public const double HyppyLattiaM = 1.0, HyppyLattiaAste = 0.05;

        /// <summary>Kameran näyte: aika (s), silmä (m, mikä tahansa kiinteä kehys) ja katseen yksikkövektori.</summary>
        public struct Nayte
        {
            public double T, X, Y, Z, KX, KY, KZ;
            public Nayte(double t, double x, double y, double z, double kx, double ky, double kz)
            {
                double k = Math.Sqrt(kx * kx + ky * ky + kz * kz);
                if (k <= 0) k = 1;
                T = t; X = x; Y = y; Z = z; KX = kx / k; KY = ky / k; KZ = kz / k;
            }
        }

        /// <summary>Analysoitu näyte: nopeus ja kulmanopeus edellisestä näytteestä, hyppymerkinnät.</summary>
        public struct Rivi
        {
            public double T, Siirto, Kulma, NopeusMs, KulmanopeusAs;
            public bool Hyppy, KulmaHyppy;
        }

        static double Kulma(in Nayte a, in Nayte b)
        {
            double d = a.KX * b.KX + a.KY * b.KY + a.KZ * b.KZ;
            return Math.Acos(Math.Max(-1, Math.Min(1, d))) * 180.0 / Math.PI;
        }

        /// <summary>
        /// Piikit: indeksit i, joissa |arvo[i]| &gt; kerroin × ympäröivien (i − 1, i + 1) keskiarvo ja yli lattian.
        /// Päätenäytteillä vertailu yhteen naapuriin.
        /// </summary>
        public static bool Piikki(IReadOnlyList<double> arvot, int i, double kerroin, double lattia)
        {
            double x = Math.Abs(arvot[i]);
            if (x <= lattia) return false;
            double s = 0; int n = 0;
            if (i > 0) { s += Math.Abs(arvot[i - 1]); n++; }
            if (i < arvot.Count - 1) { s += Math.Abs(arvot[i + 1]); n++; }
            return n > 0 && x > kerroin * s / n;
        }

        /// <summary>Näytteet riveiksi: ensimmäinen rivi on levossa (siirto 0), hypyt merkitään <see cref="Piikki"/>llä.</summary>
        public static Rivi[] Analysoi(IReadOnlyList<Nayte> n)
        {
            var r = new Rivi[n.Count];
            if (n.Count == 0) return r;
            var siirto = new double[n.Count];
            var kulma = new double[n.Count];
            r[0].T = n[0].T;
            for (int i = 1; i < n.Count; i++)
            {
                double dx = n[i].X - n[i - 1].X, dy = n[i].Y - n[i - 1].Y, dz = n[i].Z - n[i - 1].Z;
                double dt = Math.Max(1e-9, n[i].T - n[i - 1].T);
                siirto[i] = Math.Sqrt(dx * dx + dy * dy + dz * dz);
                kulma[i] = Kulma(n[i - 1], n[i]);
                r[i].T = n[i].T;
                r[i].Siirto = siirto[i];
                r[i].Kulma = kulma[i];
                r[i].NopeusMs = siirto[i] / dt;
                r[i].KulmanopeusAs = kulma[i] / dt;
            }
            // Ensimmäinen siirto (indeksi 1) verrataan vain seuraavaan: alkulepo (0) ei ole naapuri.
            var s1 = new ArraySegmentList(siirto, 1);
            var k1 = new ArraySegmentList(kulma, 1);
            for (int i = 1; i < n.Count; i++)
            {
                r[i].Hyppy = Piikki(s1, i - 1, HyppyKerroin, HyppyLattiaM);
                r[i].KulmaHyppy = Piikki(k1, i - 1, HyppyKerroin, HyppyLattiaAste);
            }
            return r;
        }

        /// <summary>Kevyt näkymä taulukon loppuosaan (IReadOnlyList ilman kopiota).</summary>
        sealed class ArraySegmentList : IReadOnlyList<double>
        {
            readonly double[] a; readonly int alku;
            public ArraySegmentList(double[] a, int alku) { this.a = a; this.alku = alku; }
            public double this[int i] => a[alku + i];
            public int Count => Math.Max(0, a.Length - alku);
            public IEnumerator<double> GetEnumerator() { for (int i = 0; i < Count; i++) yield return this[i]; }
            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
        }

        /// <summary>Raportti lokiin: rivi per näyte (t, nopeus, kulmanopeus, merkinnät) ja yhteenveto hypyistä.</summary>
        public static string Raportti(IReadOnlyList<Rivi> r, string otsikko)
        {
            var c = CultureInfo.InvariantCulture;
            var sb = new StringBuilder();
            int hypyt = 0, kulmahypyt = 0;
            sb.Append("MATKAKIRJA kamerareitti ").Append(otsikko).Append(": t s | nopeus m/s | kulmanopeus °/s | merkintä\n");
            foreach (var x in r)
            {
                if (x.Hyppy) hypyt++;
                if (x.KulmaHyppy) kulmahypyt++;
                sb.Append(string.Format(c, "  {0,5:0.00} {1,12:0} {2,8:0.0}", x.T, x.NopeusMs, x.KulmanopeusAs));
                if (x.Hyppy) sb.Append("  HYPPY");
                if (x.KulmaHyppy) sb.Append("  KULMAHYPPY");
                sb.Append('\n');
            }
            sb.Append(string.Format(c, "  hyppyjä {0}, kulmahyppyjä {1} ({2} näytettä)", hypyt, kulmahypyt, r.Count));
            return sb.ToString();
        }

        // ---- Suunnitelma pallomallilla (PalloKierto.Aseta, Nappula.Lento; ei maastoa eikä lennon pohjaa) ----

        /// <summary>Kameran lähtöasento (Nappula: kameran nykyinen asento ennen lentoa).</summary>
        public struct Alku
        {
            public double Lat, Lon, Korkeus, Kallistus, Suunta;
            public Alku(double lat, double lon, double korkeus, double kallistus, double suunta)
            { Lat = lat; Lon = lon; Korkeus = korkeus; Kallistus = kallistus; Suunta = suunta; }
        }

        /// <summary>Aloituslennon tyypillinen lähtö: valintanäkymän pallo (Eurooppa keskellä, pohjoinen ylös).</summary>
        public static readonly Alku Valintanakyma = new Alku(45.0, 10.0, 12_000_000.0, 0.0, 0.0);

        /// <summary>Lento kuten Nappula.Lento rakentaa sen (vaihejako, avaimet, lentosuunta, koneen paikka).</summary>
        public sealed class Lento
        {
            public double Lat0, Lon0, Lat1, Lon1, ReittiM, Huippu, SaapumisKorkeus, SaapumisLat, SaapumisLon;
            public LennonAikajana.Jako Jako;
            public LennonAikajana.Avain[] Avaimet;
            /// <summary>Aloituslennon kamerareitti (löydös 120); muilla lennoilla null (Avaimet).</summary>
            public LennonAikajana.AloitusReitti Reitti;
            public bool Aloitus;
            public Alku Alku;

            /// <summary>Koneen reittiosuus: aloituslennolla reitin oma eteneminen (löydös 120 v2), muuten KoneenOsuus.</summary>
            public double P(double t) => Reitti != null ? Reitti.KoneenOsuus(t) : LennonAikajana.KoneenOsuus(t, Jako);
            public double Suunta(double t) => Suuntima(Lat0, Lon0, Lat1, Lon1, P(t));
            public (double e, double k, double s, double kohde, double kone) Arvo(double t) =>
                Reitti != null ? Reitti.Arvo(t) : LennonAikajana.Arvo(Avaimet, t, Suunta(t));
        }

        /// <summary>
        /// Lennon rakennus: aloitus = aloituslennon kamerareitti (JaaAloitus, LaskeAloitus), muuten Jaa(kesto). Aloituslennon
        /// lähtö on avaus (katse Lontoossa, AloitusReitti.Avaus), kuten Nappula asettaa sen mustan verhon alla; annettu alku
        /// korvaa sen (AsetaAlku). Saapumisnäkymän keskipiste oletuksena kohdekaupunki (Saapumisnakyma.LaskeRuudulle antaa
        /// oikean ruudun mukaan).
        /// </summary>
        public static Lento Tee(double lat0, double lon0, double lat1, double lon1, string kohdeId, bool aloitus, Alku? alku = null,
            double? kestoS = null, double saapumisKorkeus = 1_200_000.0, double? saapumisLat = null, double? saapumisLon = null)
        {
            var l = new Lento { Lat0 = lat0, Lon0 = lon0, Lat1 = lat1, Lon1 = lon1, Aloitus = aloitus, Alku = alku ?? Valintanakyma,
                SaapumisKorkeus = saapumisKorkeus, SaapumisLat = saapumisLat ?? lat1, SaapumisLon = saapumisLon ?? lon1 };
            l.ReittiM = LennonAikajana.ReittiM(lat0, lon0, lat1, lon1);
            l.Huippu = Math.Min(900000.0, l.ReittiM * 0.12);
            l.Jako = aloitus ? LennonAikajana.JaaAloitus(kestoS ?? LennonAikajana.AloituslennonKestoS)
                             : LennonAikajana.Jaa(kestoS ?? LennonAikajana.Kesto(l.ReittiM));
            var maisema = kohdeId != null && LennonAikajana.Kaupungit.TryGetValue(kohdeId, out var k) ? k : LennonAikajana.EiMaisemaa;
            if (aloitus)
            {
                l.Reitti = LennonAikajana.LaskeAloitus(l.ReittiM, saapumisKorkeus, maisema, l.Jako, p => Suuntima(lat0, lon0, lat1, lon1, p));
                var av = l.Reitti.Avaus;
                l.Alku = alku ?? new Alku(lat0, lon0, av.etaisyys, av.kallistus, av.suunta);
                l.Reitti.AsetaAlku(l.Alku.Korkeus, l.Alku.Kallistus, l.Alku.Suunta);
                return l;
            }
            l.Avaimet = LennonAikajana.Laske(l.ReittiM, saapumisKorkeus, maisema, l.Jako, l.Suunta);
            l.Avaimet[0] = new LennonAikajana.Avain
            {
                Osuus = 0, Kohde = -1, SuuntaAbs = true, Etaisyys = l.Alku.Korkeus, Kallistus = l.Alku.Kallistus, Suunta = l.Alku.Suunta,
            };
            return l;
        }

        /// <summary>Kameran silmä, katsepiste (ECEF-pallo, m) ja koneen paikka ja korkeus hetkellä t (0–1).</summary>
        public static (double[] silma, double[] kohde, double[] kone, double koneKorkeus) Kuva(Lento l, double t)
        {
            var k = Kamera(l, t);
            return (k.silma, k.kohde, k.kone, k.koneKorkeus);
        }

        /// <summary>Kuten <see cref="Kuva"/> ja lisäksi kameran yläsuunta (PalloKierto.LaskeAsento: eteen·cos k + ylös·sin k).</summary>
        public static (double[] silma, double[] kohde, double[] ylos, double[] kone, double koneKorkeus) Kamera(Lento l, double t)
        {
            var j = l.Jako;
            double p = l.P(t);
            var q = Isoympyra(l.Lat0, l.Lon0, l.Lat1, l.Lon1, p);
            double h = LennonAikajana.KoneenKorkeus(p, l.Huippu,
                LennonAikajana.KoneenMinimi(t, j, l.Aloitus ? LennonAikajana.AloituksenNousu : 1.0));
            var a = l.Arvo(t);
            double klat, klon, katse;
            if (a.kohde < 0)
            {
                double s = a.kohde + 1;
                klat = l.Alku.Lat + (q.lat - l.Alku.Lat) * s;
                klon = l.Alku.Lon + Kiedo180(q.lon - l.Alku.Lon) * s;
                katse = h * s;
            }
            else if (a.kohde <= 1)
            {
                klat = q.lat + (l.Lat1 - q.lat) * a.kohde;
                klon = q.lon + Kiedo180(l.Lon1 - q.lon) * a.kohde;
                katse = h * (1 - a.kohde);
            }
            else
            {
                double s = a.kohde - 1;
                klat = l.Lat1 + (l.SaapumisLat - l.Lat1) * s;
                klon = l.Lon1 + Kiedo180(l.SaapumisLon - l.Lon1) * s;
                katse = 0;
            }
            var ylos = Yks(klat, klon);
            var kohde = Kerro(ylos, R + katse);
            var napa = new[] { 0.0, 0.0, 1.0 };
            var pohjoinen = Yksikko(Miinus(napa, Kerro(ylos, Piste(napa, ylos))));
            var ita = Yksikko(Risti(pohjoinen, ylos));
            double b = a.s * Math.PI / 180, k = Math.Max(0, Math.Min(85, a.k)) * Math.PI / 180;
            var eteen = Plus(Kerro(pohjoinen, Math.Cos(b)), Kerro(ita, Math.Sin(b)));
            var suunta = Miinus(Kerro(ylos, Math.Cos(k)), Kerro(eteen, Math.Sin(k)));
            var silma = Plus(kohde, Kerro(suunta, Math.Max(100.0, a.e)));
            var kone = Kerro(Yks(q.lat, q.lon), R + h);
            var kameranYlos = Plus(Kerro(eteen, Math.Cos(k)), Kerro(ylos, Math.Sin(k)));
            return (silma, kohde, kameranYlos, kone, h);
        }

        /// <summary>Pinnan piste (lat, lon, korkeus m) ECEF-pallona (m).</summary>
        public static double[] Piste(double lat, double lon, double korkeus = 0) => Kerro(Yks(lat, lon), R + korkeus);

        /// <summary>
        /// Pisteen paikka ruudulla hetkellä t (PalloKierto.Projisoi pallomallilla): x oikealle ja y ylös, −1…1 = ruudun
        /// reunat. fov = pystykuvakulma (°, Camera.fieldOfView), kuvasuhde = leveys / korkeus. false = kameran takana.
        /// </summary>
        public static bool Ruudulla(Lento l, double t, double[] piste, double fov, double kuvasuhde, out double x, out double y)
        {
            var (silma, kohde, yl, _, _) = Kamera(l, t);
            return Projisoi(silma, kohde, yl, piste, fov, kuvasuhde, out x, out y);
        }

        /// <summary>Projektio kameralle (silmä, katsepiste, yläsuunta): x, y −1…1 ruudun reunoilla.</summary>
        public static bool Projisoi(double[] silma, double[] kohde, double[] yl, double[] piste, double fov, double kuvasuhde,
            out double x, out double y)
        {
            x = y = 0;
            var eteen = Yksikko(Miinus(kohde, silma));
            var ylos = Yksikko(Miinus(yl, Kerro(eteen, Piste(yl, eteen))));
            var oikea = Risti(eteen, ylos);
            var d = Miinus(piste, silma);
            double z = Piste(d, eteen);
            if (!(z > 1e-6 * Math.Sqrt(Piste(d, d)))) return false;
            double tanY = Math.Tan(fov * Math.PI / 360.0);
            x = Piste(d, oikea) / (z * tanY * kuvasuhde);
            y = Piste(d, ylos) / (z * tanY);
            return true;
        }

        /// <summary>Kamerareitti näytteinä dt sekunnin välein (t = 0 … kesto).</summary>
        public static Nayte[] Suunnitelma(Lento l, double dt)
        {
            double T = l.Jako.KestoS;
            int n = (int)Math.Round(T / dt);
            var r = new Nayte[n + 1];
            for (int i = 0; i <= n; i++)
            {
                double t = Math.Min(1.0, i * dt / T);
                var (silma, kohde, _, _) = Kuva(l, t);
                r[i] = new Nayte(i * dt, silma[0], silma[1], silma[2], kohde[0] - silma[0], kohde[1] - silma[1], kohde[2] - silma[2]);
            }
            return r;
        }

        // ---- Pallogeometria (kuten Nappula: ReittiGeometria.Isoympyra ja Suuntima) ----

        static double[] Yks(double lat, double lon)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            return new[] { Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f) };
        }

        public static (double lat, double lon) Isoympyra(double lat0, double lon0, double lat1, double lon1, double p)
        {
            var a = Yks(lat0, lon0);
            var b = Yks(lat1, lon1);
            double w = Math.Acos(Math.Max(-1, Math.Min(1, Piste(a, b))));
            var q = w < 1e-12 ? a : Plus(Kerro(a, Math.Sin((1 - p) * w) / Math.Sin(w)), Kerro(b, Math.Sin(p * w) / Math.Sin(w)));
            return (Math.Asin(Math.Max(-1, Math.Min(1, q[2]))) * 180 / Math.PI, Math.Atan2(q[1], q[0]) * 180 / Math.PI);
        }

        /// <summary>Kuten Nappula.Suuntima: koneen suuntima asteina reitin kohdassa p.</summary>
        public static double Suuntima(double lat0, double lon0, double lat1, double lon1, double p)
        {
            double pa = Math.Min(p, 0.995), pb = pa + 0.005;
            var a = Isoympyra(lat0, lon0, lat1, lon1, pa);
            var b = Isoympyra(lat0, lon0, lat1, lon1, pb);
            double r = Math.PI / 180, f1 = a.lat * r, f2 = b.lat * r, dl = (b.lon - a.lon) * r;
            double y = Math.Sin(dl) * Math.Cos(f2);
            double x = Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl);
            return Math.Atan2(y, x) * 180 / Math.PI;
        }

        static double Kiedo180(double a) => ((a % 360.0) + 540.0) % 360.0 - 180.0;
        static double Piste(double[] a, double[] b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        static double[] Kerro(double[] a, double k) => new[] { a[0] * k, a[1] * k, a[2] * k };
        static double[] Plus(double[] a, double[] b) => new[] { a[0] + b[0], a[1] + b[1], a[2] + b[2] };
        static double[] Miinus(double[] a, double[] b) => new[] { a[0] - b[0], a[1] - b[1], a[2] - b[2] };
        static double[] Risti(double[] a, double[] b) =>
            new[] { a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] };
        static double[] Yksikko(double[] a) { double k = Math.Sqrt(Piste(a, a)); return Kerro(a, 1 / k); }
    }
}
