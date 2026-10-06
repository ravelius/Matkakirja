// ISS-KAMERA: PÄIVÄN TODELLISET PILVET NASA GIBS:STÄ (Päätoimittaja 5.10.2026, omistajan päätös 15.5x "aina selkein 7 päivästä").
// Pinta on Sentinel-2 (10 m, pilvetön); pilvet maskina GIBS:n CorrectedReflectance_TrueColor-kuvista (epsg3857, z9 ≈ 300 m/px).
// Esiselvitys: proto-3d/lokit/linssiseppa2-gibs-esiselvitys-20261005/YHTEENVETO.md.
//
//   maski     s = min(R,G,B) − 2·max(0, R − B) − 0,3·(max − min); alfa = smoothstep(110 → 170, s)
//             (lämpimän sävyn rangaistus: hiekka ja mutajoki eivät ole pilveä)
//   nodata    max(R,G,B) ≤ 1 (ratavälit, tyhjä ruutu) ja 2 px:n laajennus (JPEG-särö reunalla)
//   päivä     pikseleittäin ketju SNPP → NOAA-20 → Terra → Aqua (ensimmäinen, jolla dataa); selkein = pienin keskialfa
//             päivistä, joilla dataa ≥ 80 % kuva-alasta (muuten kaikista)
//   pysyvä    alfa − 0,9 · min(alfa yli päivien): joka päivä valkoinen on pintaa (lumi, jää, suola), ei pilveä
//   varjo     maski auringosta poispäin pilven korkeudelta 1,2–1,8 km (kuten Pilvikentta)
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.IssKamera
{
    /// <summary>Kuvan pilvet: alfa, kirkkaus ja maan varjo pisteessä (Pilvikentta tai GibsPilvet).</summary>
    public interface IKuvanPilvet
    {
        (double alfa, double kirkkaus, double varjo) Nayte(double lat, double lon, double peittoK = 1);
        /// <summary>Pikselikohtainen reuna; pikseliM = kuvan laatan pikselin koko (kohina ei saa olla sitä hienompaa), 0 = ei rajaa.</summary>
        (double alfa, double kirkkaus) Lahi(double lat, double lon, double peittoK = 1, double pikseliM = 0);
    }

    public sealed class GibsPilvet : IKuvanPilvet
    {
        /// <summary>GIBS GoogleMapsCompatible_Level9: suurin taso 9, ruutu 256 px.</summary>
        public const int Z = 9, Ruutu = 256;
        /// <summary>Haun järjestys (aukkojen paikkaus): VIIRS ensin (ei ratavälejä alle 60°), MODIS viimeisenä.</summary>
        public static readonly string[] Kerrokset =
        {
            "VIIRS_SNPP_CorrectedReflectance_TrueColor", "VIIRS_NOAA20_CorrectedReflectance_TrueColor",
            "MODIS_Terra_CorrectedReflectance_TrueColor", "MODIS_Aqua_CorrectedReflectance_TrueColor",
        };
        public const string Merkinta = "NASA EOSDIS GIBS";

        public static string Osoite(string kerros, DateTime paiva, int taso, int tx, int ty)
            => $"https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{kerros}/default/{paiva:yyyy-MM-dd}/GoogleMapsCompatible_Level9/{taso}/{ty}/{tx}.jpg";

        /// <summary>
        /// Taso, jolla alue (lat/lon-rajat) on enintään maxPx leveä (50 mm:n laaja kuva ei hae satoja ruutuja; 400 mm → z9).
        /// </summary>
        public static int TasoAlueelle(double w, double s, double e, double n, int maxPx = 1024)
        {
            for (int z = Z; z > 3; z--)
            {
                var (x0, y0) = Pikseli(n, w, z); var (x1, y1) = Pikseli(s, e, z);
                if (Math.Max(x1 - x0, y1 - y0) <= maxPx) return z;
            }
            return 3;
        }

        /// <summary>Alueen vasen ylänurkka ja koko z9-pikseleinä (globaali Web Mercator, y alaspäin).</summary>
        public readonly int X0, Y0, W, H, Taso;
        /// <summary>Pilven alfa ja kirkkaus 0…255 (W × H).</summary>
        public readonly byte[] Alfa, Kirkkaus;
        public double AurinkoAz = 180, AurinkoKorkeus = 45, VarjonVoima = 0.5;
        /// <summary>Lähikuvan reunarakenne (400 mm): kohina Pilvikentästä; null = maskin pehmeä reuna.</summary>
        public Pilvikentta Yksityiskohta;
        /// <summary>Valittu päivä ja sen keskialfa (lokiin).</summary>
        public DateTime Paiva; public double Peitto;
        /// <summary>
        /// Lähialueen tarkempi taso samalta päivältä (juliste 6.10.: laajan kuvan alue ulottuu horisonttiin → z5–z6, ja lähialueen
        /// pilvet olivat Helsingissä litteitä harmaita laattoja ja Manauksessa kuutiomaisia möykkyjä). Alueen sisällä näyte
        /// tulee tästä, reunalla (8 % leveydestä) sekoitus.
        /// </summary>
        public GibsPilvet Tarkka;

        /// <summary>Aseta aurinko ja reunarakenne myös tarkalle tasolle.</summary>
        public void Aseta(double aurinkoAz, double aurinkoKorkeus, Pilvikentta yksityiskohta)
        {
            AurinkoAz = aurinkoAz; AurinkoKorkeus = aurinkoKorkeus; Yksityiskohta = yksityiskohta;
            Tarkka?.Aseta(aurinkoAz, aurinkoKorkeus, yksityiskohta);
        }

        /// <summary>Paino 0…1: kuinka syvällä pisteen tason pikseli on alueen sisällä (reunavyöhyke 8 % koosta).</summary>
        public double Sisalla(double lat, double lon)
        {
            var (gx, gy) = Pikseli(lat, lon, Taso);
            double rx = Math.Min(gx - X0, X0 + W - gx) / Math.Max(1.0, 0.08 * W), ry = Math.Min(gy - Y0, Y0 + H - gy) / Math.Max(1.0, 0.08 * H);
            return Askel(0, 1, Math.Min(rx, ry));
        }

        public GibsPilvet(int x0, int y0, int w, int h, byte[] alfa, byte[] kirkkaus, int taso = Z)
        { X0 = x0; Y0 = y0; W = w; H = h; Alfa = alfa; Kirkkaus = kirkkaus; Taso = taso; }

        /// <summary>Globaali pikseli (Web Mercator, taso z) pisteelle.</summary>
        public static (double x, double y) Pikseli(double lat, double lon, int z = Z)
        {
            double n = Ruutu * (double)(1 << z), la = Math.Max(-85.05, Math.Min(85.05, lat)) * Math.PI / 180;
            return ((lon + 180) / 360 * n, (1 - Math.Log(Math.Tan(la) + 1 / Math.Cos(la)) / Math.PI) / 2 * n);
        }

        /// <summary>z9-pikselin koko metreinä leveydellä lat.</summary>
        public static double PikseliM(double lat, int z = Z) => 2 * Math.PI * 6378137 * Math.Cos(lat * Math.PI / 180) / (Ruutu * (double)(1 << z));

        /// <summary>Pilvialfa (0…1) GIBS:n TrueColor-pikselistä.</summary>
        public static double MaskiAlfa(byte r, byte g, byte b)
        {
            int mn = Math.Min(r, Math.Min(g, b)), mx = Math.Max(r, Math.Max(g, b));
            double s = mn - 2.0 * Math.Max(0, r - b) - 0.3 * (mx - mn);
            // Leveämpi siirtymä (Päätoimittaja 6.10.: ohuet reunat läpikuultaviksi, ei kynnysmaskia).
            return Askel(90, 195, s);
        }

        /// <summary>
        /// Selkein päivä: paivat[d][k] = kerroksen k (Kerrokset-järjestys) RGB-mosaiikki (W × H × 3) tai null (ei haettu / ei
        /// dataa). Palauttaa pilvet tai null, jos millään päivällä ei ole dataa.
        /// </summary>
        /// <param name="painoAlue">Selkeimmän päivän valinta vain tältä alueelta (pikseleinä tämän ruudukon sisällä, x0 y0 x1 y1):
        /// laajan kuvan lähialue (Päätoimittaja 6.10.: Helsingin ja Suomenlahden pitää näkyä).</param>
        public static GibsPilvet Kokoa(int x0, int y0, int w, int h, IReadOnlyList<(DateTime paiva, byte[][] kerrokset)> paivat, int taso = Z,
            DateTime? pakotettu = null, (int x0, int y0, int x1, int y1)? painoAlue = null)
        {
            int n = w * h, D = paivat.Count;
            var alfat = new float[D][]; var kirk = new byte[D][]; var osuus = new double[D]; var keski = new double[D];
            for (int d = 0; d < D; d++)
            {
                var kk = paivat[d].kerrokset;
                var kelvot = new bool[kk.Length][];
                for (int k = 0; k < kk.Length; k++) if (kk[k] != null) kelvot[k] = Kelvot(kk[k], w, h);
                var a = new float[n]; var b = new byte[n]; int ok = 0, okP = 0; double summa = 0, summaP = 0;
                for (int i = 0; i < n; i++)
                {
                    a[i] = -1;
                    for (int k = 0; k < kk.Length; k++)
                    {
                        if (kk[k] == null || !kelvot[k][i]) continue;
                        byte r = kk[k][i * 3], g = kk[k][i * 3 + 1], bl = kk[k][i * 3 + 2];
                        a[i] = (float)MaskiAlfa(r, g, bl);
                        // Sävy GIBS:n omasta kirkkaudesta laajemmalla alueella (0,55…1): pilven sisälle tekstuuri (Päätoimittaja 6.10.).
                        b[i] = (byte)Math.Round(255 * Math.Max(0.55, Math.Min(1.0, 0.55 + 0.45 * ((0.3 * r + 0.55 * g + 0.15 * bl) - 120) / 120)));
                        break;
                    }
                    if (a[i] >= 0)
                    {
                        ok++; summa += a[i];
                        if (painoAlue is (int, int, int, int) pa) { int px = i % w, py = i / w; if (px >= pa.x0 && px < pa.x1 && py >= pa.y0 && py < pa.y1) { okP++; summaP += a[i]; } }
                    }
                }
                alfat[d] = a; kirk[d] = b; osuus[d] = (double)ok / n;
                keski[d] = okP > 0 ? summaP / okP : ok > 0 ? summa / ok : 1;
            }
            int paras = -1;
            for (int pass = 0; pass < 2 && paras < 0; pass++)
                for (int d = 0; d < D; d++)
                    if (osuus[d] > 0 && (pass == 1 || osuus[d] >= 0.8) && (paras < 0 || keski[d] < keski[paras])) paras = d;
            // Tarkka lähialue: sama päivä kuin karkealla tasolla (pilvien muoto jatkuu saumattomasti).
            if (pakotettu != null)
            {
                paras = -1;
                for (int d = 0; d < D; d++) if (paivat[d].paiva == pakotettu.Value && osuus[d] > 0) paras = d;
            }
            if (paras < 0) return null;
            // Pysyvä valkoinen (lumi, jää, suola): pienin alfa niistä päivistä, joilla pikselissä dataa (vähintään 3 päivää).
            var alfa = new byte[n]; double s2 = 0;
            for (int i = 0; i < n; i++)
            {
                float mn = float.MaxValue; int lkm = 0;
                for (int d = 0; d < D; d++) if (alfat[d][i] >= 0) { mn = Math.Min(mn, alfat[d][i]); lkm++; }
                double v = Math.Max(0, alfat[paras][i]);
                if (lkm >= 3) v = Math.Max(0, v - 0.9 * mn);
                alfa[i] = (byte)Math.Round(255 * v); s2 += v;
            }
            // Kirkkaus kolmesti sumennettuna (esikatselu Helsinki: VIIRS-kuvan juovat näkyivät pilvikannessa vaakaraitoina).
            // Kirkkaus kahdesti sumennettuna (VIIRS-juovat pois, sisäinen tekstuuri jää; ennen kolmesti → tasavalkoinen).
            return new GibsPilvet(x0, y0, w, h, Sumenna(Sumenna(alfa, w, h), w, h), Sumenna(Sumenna(kirk[paras], w, h), w, h), taso) { Paiva = paivat[paras].paiva, Peitto = s2 / n };
        }

        /// <summary>Kelvot pikselit: max(R,G,B) > 1, ja nodatasta vähintään 3 px (JPEG-särö ratavälin reunalla).</summary>
        static bool[] Kelvot(byte[] rgb, int w, int h)
        {
            var musta = new bool[w * h];
            for (int i = 0; i < w * h; i++) musta[i] = Math.Max(rgb[i * 3], Math.Max(rgb[i * 3 + 1], rgb[i * 3 + 2])) <= 1;
            var r = new bool[w * h];
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                {
                    bool ok = true;
                    for (int j = -2; j <= 2 && ok; j++)
                        for (int i = -2; i <= 2 && ok; i++)
                        {
                            int xx = x + i, yy = y + j;
                            if (xx >= 0 && yy >= 0 && xx < w && yy < h && musta[yy * w + xx]) ok = false;
                        }
                    r[y * w + x] = ok;
                }
            return r;
        }

        /// <summary>3 × 3 binomisumennus (≈ Gauss 0,8 px): JPEG-porras pois maskin reunasta.</summary>
        static byte[] Sumenna(byte[] a, int w, int h)
        {
            var r = new byte[a.Length];
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                {
                    int s = 0, p = 0;
                    for (int j = -1; j <= 1; j++)
                        for (int i = -1; i <= 1; i++)
                        {
                            int xx = Math.Max(0, Math.Min(w - 1, x + i)), yy = Math.Max(0, Math.Min(h - 1, y + j));
                            int k = (i == 0 ? 2 : 1) * (j == 0 ? 2 : 1); s += a[yy * w + xx] * k; p += k;
                        }
                    r[y * w + x] = (byte)((s + p / 2) / p);
                }
            return r;
        }

        double Arvo(byte[] f, double gx, double gy)
        {
            double fx = gx - X0 - 0.5, fy = gy - Y0 - 0.5;
            if (fx < -0.5 || fy < -0.5 || fx > W - 0.5 || fy > H - 0.5) return 0;   // alueen ulkopuolella ei pilveä
            fx = Math.Max(0, Math.Min(W - 1.001, fx)); fy = Math.Max(0, Math.Min(H - 1.001, fy));
            int ix = (int)fx, iy = (int)fy; double tx = fx - ix, ty = fy - iy;
            int i = iy * W + ix;
            int i10 = Math.Min(ix + 1, W - 1) + iy * W, i01 = ix + Math.Min(iy + 1, H - 1) * W, i11 = Math.Min(ix + 1, W - 1) + Math.Min(iy + 1, H - 1) * W;
            return ((f[i] * (1 - tx) + f[i10] * tx) * (1 - ty) + (f[i01] * (1 - tx) + f[i11] * tx) * ty) / 255.0;
        }

        public (double alfa, double kirkkaus, double varjo) Nayte(double lat, double lon, double peittoK = 1)
        {
            double p = Tarkka != null ? Tarkka.Sisalla(lat, lon) : 0;
            if (p >= 1) return Tarkka.Nayte(lat, lon, peittoK);
            var r = OmaNayte(lat, lon);
            if (p <= 0) return r;
            var t = Tarkka.Nayte(lat, lon, peittoK);
            return (r.alfa + (t.alfa - r.alfa) * p, r.kirkkaus + (t.kirkkaus - r.kirkkaus) * p, r.varjo + (t.varjo - r.varjo) * p);
        }

        (double alfa, double kirkkaus, double varjo) OmaNayte(double lat, double lon)
        {
            var (gx, gy) = Pikseli(lat, lon, Taso);
            double alfa = Arvo(Alfa, gx, gy), kirkkaus = Math.Max(0.70, Arvo(Kirkkaus, gx, gy));
            // Varjo: pilvi auringon suunnassa korkeudelta 1,2–1,8 km (z9-pikseleinä; y kasvaa etelään).
            double pm = PikseliM(lat, Taso), az = AurinkoAz * Math.PI / 180, tanEl = Math.Tan(Math.Max(3, AurinkoKorkeus) * Math.PI / 180);
            double varjo = 0;
            for (int i = 0; i < 4; i++)
            {
                double L = (1200 + i * 200) / tanEl / pm;
                varjo = Math.Max(varjo, Arvo(Alfa, gx + Math.Sin(az) * L, gy - Math.Cos(az) * L));
            }
            return (alfa, kirkkaus, varjo * VarjonVoima);
        }

        public (double alfa, double kirkkaus) Lahi(double lat, double lon, double peittoK = 1, double pikseliM = 0)
        {
            double p = Tarkka != null ? Tarkka.Sisalla(lat, lon) : 0;
            if (p >= 1) return Tarkka.Lahi(lat, lon, peittoK, pikseliM);
            var r = OmaLahi(lat, lon, pikseliM);
            if (p <= 0) return r;
            var t = Tarkka.Lahi(lat, lon, peittoK, pikseliM);
            return (r.alfa + (t.alfa - r.alfa) * p, r.kirkkaus + (t.kirkkaus - r.kirkkaus) * p);
        }

        (double alfa, double kirkkaus) OmaLahi(double lat, double lon, double pikseliM)
        {
            var (gx, gy) = Pikseli(lat, lon, Taso);
            double a = Arvo(Alfa, gx, gy), k = Math.Max(0.55, Arvo(Kirkkaus, gx, gy));
            if (a <= 0.01) return (a, k);
            // Laaja kuva (kuvan pikseli > 100 m; juliste 65fe6316: litteät terävärajaiset läntit): ei fraktaaliterävöintiä, vaan
            // pehmeä alfa GIBS-tiheydestä ja sävy auringon suunnasta koko pilven alalla (aurinkoa kohti kirkkaampi, varjopuoli tummempi).
            if (pikseliM > 100)
            {
                double azL = AurinkoAz * Math.PI / 180;
                double kohtiL = Arvo(Alfa, gx + Math.Sin(azL) * 1.5, gy - Math.Cos(azL) * 1.5);
                double valoL = Math.Max(-0.14, Math.Min(0.06, -0.7 * (kohtiL - a)));
                // Sulkareuna (Päätoimittaja 6.10.: keskiosan pilvet teräväreunaisia): alfa viiden näytteen keskiarvona ±0,8 px.
                double ka = (a + Arvo(Alfa, gx + 0.8, gy) + Arvo(Alfa, gx - 0.8, gy) + Arvo(Alfa, gx, gy + 0.8) + Arvo(Alfa, gx, gy - 0.8)) / 5;
                return (Askel(0.0, 1.0, ka) * (0.7 + 0.3 * ka), Math.Max(0.5, Math.Min(1.0, k * (0.93 + 0.07 * a) + valoL)));
            }
            if (Yksityiskohta == null) return (a, k);
            // GIBS-maski (~150–300 m/px) on kuvassa sumea möykky (simu 8eea083c Amazonia): reuna terävöitetään fraktaalikohinalla,
            // jonka asteikko seuraa maskin pikseliä (kumpupilven kukkakaalireuna), ja aurinkoa kohti oleva puoli on kirkkaampi.
            double m = PikseliM(lat, Taso); var y = Yksityiskohta;
            // Kohinan asteikko ≥ 2,5 kuvan pikseliä (esikatselu Helsinki z11: 23 m:n kohina 38 m:n pikseleissä laskostui vaakaraidoiksi).
            double p = pikseliM * 2.5, s1 = Math.Max(m, p), s2 = Math.Max(m * 0.4, p), s3 = Math.Max(m * 0.15, p);
            double n1 = y.KohinaPisteessa(lat, lon, s1, 41), n2 = s2 < s1 ? y.KohinaPisteessa(lat, lon, s2, 42) : 0, n3 = s3 < s2 ? y.KohinaPisteessa(lat, lon, s3, 43) : 0;
            // Kohina vain reuna-alueella (4a(1 − a)): ydin pysyy umpinaisena (esikatselu: reikiä pilven sisällä).
            double reuna = Math.Min(1, 4 * a * (1 - a) * 1.6) * (1 - Askel(0.75, 0.97, a));
            double d = a + reuna * (0.30 * n1 + 0.15 * n2 + 0.06 * n3);
            double alfa = Askel(0.32, 0.62, d) * (0.6 + 0.4 * Askel(0.15, 0.6, a));   // ohut reuna-alue jää osittaiseksi
            double az = AurinkoAz * Math.PI / 180;
            double kohti = Arvo(Alfa, gx + Math.Sin(az) * 1.5, gy - Math.Cos(az) * 1.5);
            // Tiheys kasvaa aurinkoa kohti → varjopuoli.
            // (esikatselu Helsinki z10: 60 m:n kirkkauskohina rakeisti pilvikannen → vain maskin 3 × asteikko)
            // Derivaatta vain reunalla; ei kirkkauskohinaa (esikatselu Helsinki: umpipilveen tuli vaakaraitoja), pinnanmuoto
            // tulee GIBS:n omasta kirkkaudesta.
            double valo = reuna * Math.Max(-0.10, Math.Min(0.05, -0.5 * (kohti - a)));
            return (alfa, Math.Max(0.66, Math.Min(1.0, k + valo)));
        }

        static double Askel(double a, double b, double x) { double t = Math.Max(0, Math.Min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
    }
}
