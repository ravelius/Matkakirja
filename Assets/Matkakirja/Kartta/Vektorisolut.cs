using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja
{
    /// <summary>
    /// VEKTORISOLUT (löydös 46, E1 rannikko): webin pallovektorien puhtaat osat C#:na, testit
    /// Kartta-testit/Testit/VektorisolutTestit.cs. Lähde: pelin repo js/pallovektorit.js (origin/main 24.9.2026) ja
    /// js/pallolaatat.js lepokerroksenAlue. Aineisto on sama kuin webissä, ämpärissä
    /// julisteet/pallo/vektorit/&lt;versio&gt;/ (Karttasepän tools/tee-pallovektorit.mjs):
    ///   luettelo.json  { versio, lodit [0,1; 0,03; 0,008; 0,004; 0], solu 10, lajit: { rannikko: { tasot: [
    ///                    { k, tol, solu (360 = koko maailma yhtenä tiedostona), tiedostot: { "s_r": { tavua, … } } } ] } } }
    ///   &lt;laji&gt;/l&lt;k&gt;/&lt;s&gt;_&lt;r&gt;.bin  viivoja peräkkäin: int32 n, int32 lon·1e4, int32 lat·1e4, (n − 1) × (int16 dlon,
    ///                    int16 dlat) 1e-4°-yksikköinä, little-endian (webin puraDelta).
    ///   KORKEUDELLINEN MUOTO (E2, Karttasepän tuleva rajasarja; luettelossa "korkeus": true lajille tai tasolle):
    ///                    int32 n, int32 lon·1e4, int32 lat·1e4, int16 h0, (n − 1) × (int16 dlon, int16 dlat, int16 h), h
    ///                    ABSOLUUTTISENA metreinä ellipsoidista (maaston DEM, ei delta). Ilman lippua h = 0.
    /// Solun avain s_r: s = floor((lon + 180) / solu), r = floor((90 − lat) / solu) (webin vektorisoluAvain).
    ///
    /// Tason valinta (webin vektoritaso): matalin taso, jonka toleranssi × tiheys ≤ 0,5 laitepikseliä; tiheys on
    /// laitepikseliä leveysastetta kohti ruudun keskellä (sama mitta kuin Maarajalla). Harvennusporras (webin
    /// harvennusPorras) harventaa ladattua solua Douglas–Peuckerilla, kun porras on aineiston omaa toleranssia karkeampi.
    ///
    /// Nauha (Rajaviiva-varjostin, kuten Maaraja.TeeTaulukot): jana = 4 kärkeä, kärjessä oma paikka, janan toinen pää,
    /// puoli (±1, 0) ja lisä (matka viivaa pitkin metreinä katkoviivalle, oma h, toisen pään h korkeuskertoimelle).
    /// Kärki on lomitettuna 11 floatina: paikka xyz, toinen xyz, puoli xy, lisä xyz. Pitkät janat jaetaan
    /// <see cref="JananEnimmaispituus"/>-palasiin (web VEKTORIT_JANAN_ENIMMAISPITUUS_AST), jottei jänne painu maaston alle
    /// nyt kun viiva on syvyystestissä.
    /// </summary>
    public static class Vektorisolut
    {
        /// <summary>Tason valinnan tavoitetarkkuus laitepikseleinä (web VEKTORIT_TERAVYYS_PX).</summary>
        public const double Teravyys = 0.5;
        /// <summary>Harvennuksen suurin poikkeama ruudulla laitepikseleinä (web VEKTORIT_HARVENNUS_PX).</summary>
        public const double HarvennusPx = 0.6;
        /// <summary>Harvennuksen portaat asteina (web VEKTORIT_HARVENNUS_PORTAAT).</summary>
        public static readonly double[] HarvennusPortaat = { 0.05, 0.012, 0.003, 0.0008, 0 };
        /// <summary>Janan enimmäispituus asteina (web VEKTORIT_JANAN_ENIMMAISPITUUS_AST).</summary>
        public const double JananEnimmaispituus = 0.1;
        /// <summary>Näkyvän alueen reunus asteina (web VEKTORIT_VARA_AST).</summary>
        public const double Vara = 1.0;
        /// <summary>Floatteja kärkeä kohti nauhassa (paikka 3, toinen 3, puoli 2, lisä 3).</summary>
        public const int KarjenFloatit = 11;

        // ---- Peitto lineaarisessa väriavaruudessa ----

        /// <summary>Web RANTA_MUSTE #5a4330 sRGB 0–1.</summary>
        public static readonly double[] RantaMuste = { 0x5a / 255.0, 0x43 / 255.0, 0x30 / 255.0 };
        /// <summary>Web RANTA_PEITTO.</summary>
        public const double RantaPeitto = 0.58;
        /// <summary>Web RAJA_MUSTE #6b5539 (paletin --raja-muste; kaikkien rajojen muste 14.9.2026 alkaen) sRGB 0–1.</summary>
        public static readonly double[] RajaMuste = { 0x6b / 255.0, 0x55 / 255.0, 0x39 / 255.0 };
        /// <summary>Web RAJA_PEITTO.</summary>
        public const double RajaPeitto = 0.34;
        /// <summary>
        /// Rajan katkoviiva metreinä: web RAJA_KATKO_YKS [0,011; 0,022] pallon yksikköinä, pallon säde 100 yksikköä =
        /// 6 371 km → piste 700,8 m, väli 1 401,6 m (poltettu raja 1,5 R piste ja 3 R väli, R ≈ 1 px z7:llä).
        /// </summary>
        public const double RajaKatkoM = 0.011 / 100.0 * 6371000.0, RajaValiM = 0.022 / 100.0 * 6371000.0;
        /// <summary>Rajat piirretään vasta tästä tiheydestä (web VEKTORIT_RAJAT_PX_ASTE, laitepikseliä/aste).</summary>
        public const double RajatTiheys = 30;

        /// <summary>
        /// Webin sRGB-sekoituksen peitto natiivin lineaariseen sekoitukseen (NimiLadonta.LineaarinenAlfa): rantaviiva on
        /// maan ja meren rajalla, joten keskiarvo maan ja meren tyypillisellä pohjalla (NimiLadonta.PohjaMaa/-Meri).
        /// Ilman korjausta sama 0,58 näkyy natiivissa vaaleampana kuin webissä.
        /// </summary>
        public static double LineaarinenPeitto(double[] vari, double peitto) =>
            0.5 * (NimiLadonta.LineaarinenAlfa(vari, peitto, NimiLadonta.PohjaMaa)
                   + NimiLadonta.LineaarinenAlfa(vari, peitto, NimiLadonta.PohjaMeri));

        // ---- Luettelo ----

        public sealed class Taso
        {
            public int K;
            public double Tol;
            public double Solu;
            public HashSet<string> Tiedostot = new HashSet<string>(StringComparer.Ordinal);
            public long Tavuja;
            public long Pisteita;
            /// <summary>Solut korkeudellisessa muodossa (dlon, dlat, h); ks. luokan kuvaus.</summary>
            public bool Korkeus;
        }

        public sealed class Luettelo
        {
            public string Versio;
            public double[] Lodit = new double[0];
            public double Solu = 10;
            public Dictionary<string, List<Taso>> Lajit = new Dictionary<string, List<Taso>>(StringComparer.Ordinal);

            public Taso Tasolle(string laji, int k) =>
                Lajit.TryGetValue(laji, out var t) && k >= 0 && k < t.Count ? t[k] : null;
        }

        /// <summary>luettelo.json → <see cref="Luettelo"/> (MiniJson; ajetaan taustasäikeessä). null, jos rakenne puuttuu.</summary>
        public static Luettelo LueLuettelo(string json)
        {
            if (!(MiniJson.Jasenna(json) is Dictionary<string, object> juuri)) return null;
            var l = new Luettelo { Versio = MiniJson.Teksti(juuri, "versio"), Solu = MiniJson.Luku(juuri, "solu") ?? 10 };
            if (MiniJson.Kentta(juuri, "lodit") is List<object> lodit)
            {
                l.Lodit = new double[lodit.Count];
                for (int i = 0; i < lodit.Count; i++) l.Lodit[i] = lodit[i] is double d ? d : 0;
            }
            if (!(MiniJson.Kentta(juuri, "lajit") is Dictionary<string, object> lajit) || l.Lodit.Length == 0) return null;
            foreach (var laji in lajit)
            {
                var tasot = new List<Taso>();
                bool lajiKorkeus = laji.Value is Dictionary<string, object> lk && MiniJson.Totuus(lk, "korkeus");
                if (laji.Value is Dictionary<string, object> lo && MiniJson.Kentta(lo, "tasot") is List<object> tl)
                    foreach (var o in tl)
                    {
                        if (!(o is Dictionary<string, object> t)) continue;
                        var taso = new Taso
                        {
                            K = (int)(MiniJson.Luku(t, "k") ?? tasot.Count),
                            Tol = MiniJson.Luku(t, "tol") ?? 0,
                            Solu = MiniJson.Luku(t, "solu") ?? l.Solu,
                            Pisteita = (long)(MiniJson.Luku(t, "pisteita") ?? 0),
                            Korkeus = lajiKorkeus || MiniJson.Totuus(t, "korkeus"),
                        };
                        if (MiniJson.Kentta(t, "tiedostot") is Dictionary<string, object> tied)
                            foreach (var f in tied)
                            {
                                taso.Tiedostot.Add(f.Key);
                                if (f.Value is Dictionary<string, object> fo) taso.Tavuja += (long)(MiniJson.Luku(fo, "tavua") ?? 0);
                            }
                        tasot.Add(taso);
                    }
                tasot.Sort((a, b) => a.K.CompareTo(b.K));
                l.Lajit[laji.Key] = tasot;
            }
            return l;
        }

        /// <summary>Solun tiedoston polku versiokansion alla: &lt;laji&gt;/l&lt;k&gt;/&lt;avain&gt;.bin.</summary>
        public static string SolunPolku(string laji, int k, string avain) => $"{laji}/l{k}/{avain}.bin";

        // ---- Purku ----

        /// <summary>
        /// Solun tiedosto viivoiksi (webin puraDelta): viiva = float[] lomitettuna lon, lat, h (askel 3; h = 0 ilman
        /// korkeutta). <paramref name="korkeus"/> = korkeudellinen muoto (luettelon "korkeus"). Vajaa tai rikki mennyt
        /// tiedosto luetaan siihen asti, mikä on ehjää.
        /// </summary>
        public static List<float[]> Pura(byte[] b, bool korkeus = false)
        {
            var viivat = new List<float[]>();
            if (b == null) return viivat;
            int otsake = korkeus ? 14 : 12, pala = korkeus ? 6 : 4;
            int o = 0;
            while (o + otsake <= b.Length)
            {
                int n = BitConverter.ToInt32(b, o);
                if (n < 2 || o + otsake + (long)(n - 1) * pala > b.Length) break;
                o += 4;
                int x = BitConverter.ToInt32(b, o), y = BitConverter.ToInt32(b, o + 4);
                o += 8;
                var v = new float[n * Askel];
                v[0] = (float)(x / 1e4); v[1] = (float)(y / 1e4);
                if (korkeus) { v[2] = BitConverter.ToInt16(b, o); o += 2; }
                for (int k = 1; k < n; k++)
                {
                    x += BitConverter.ToInt16(b, o);
                    y += BitConverter.ToInt16(b, o + 2);
                    v[Askel * k] = (float)(x / 1e4); v[Askel * k + 1] = (float)(y / 1e4);
                    if (korkeus) v[Askel * k + 2] = BitConverter.ToInt16(b, o + 4);
                    o += pala;
                }
                viivat.Add(v);
            }
            return viivat;
        }

        /// <summary>Viivan floatit pistettä kohti: lon, lat, h.</summary>
        public const int Askel = 3;

        // ---- Valinnat ----

        /// <summary>Webin vektoritaso: matalin taso, jonka toleranssi × tiheys ≤ teravyys; muuten syvin.</summary>
        public static int ValitseTaso(double[] lodit, double tiheys, double teravyys = Teravyys)
        {
            if (lodit == null || lodit.Length == 0) return 0;
            for (int k = 0; k < lodit.Length; k++) if (lodit[k] * tiheys <= teravyys) return k;
            return lodit.Length - 1;
        }

        /// <summary>Webin harvennusPorras: karkein porras, joka pysyy px laitepikselin sisällä; 0 = ei harvennusta.</summary>
        public static double HarvennusPorras(double tiheys, double px = HarvennusPx)
        {
            if (!(tiheys > 0)) return 0;
            double kate = px / tiheys;
            foreach (var p in HarvennusPortaat) if (p <= kate) return p;
            return 0;
        }

        /// <summary>Solulle käytettävä porras (web rakenna): porras vain, jos se on aineiston toleranssia karkeampi.</summary>
        public static double SolunPorras(double porras, double tasonTol) => porras > tasonTol ? porras : 0;

        /// <summary>Webin vektorisoluAvain.</summary>
        public static string SoluAvain(double lon, double lat, double solu)
        {
            int sarakkeita = (int)Math.Ceiling(360 / solu), riveja = (int)Math.Ceiling(180 / solu);
            int s = Math.Min((int)Math.Floor((lon + 180) / solu), sarakkeita - 1);
            int r = Math.Min((int)Math.Floor((90 - lat) / solu), riveja - 1);
            return s + "_" + r;
        }

        /// <summary>Näkyvä alue: pituuspiirit aukikierrettyinä keskipituuspiirin ympärille (lon1 &gt; lon0).</summary>
        public struct Alue
        {
            public double Lat0, Lat1, Lon0, Lon1;
            public int Naytteita;
        }

        /// <summary>
        /// Webin lepokerroksenAlue: näytteet (lon, lat) → laatikko, pituudet aukikierrettynä keskipituuspiirin ympärille,
        /// reunus <paramref name="vara"/> asteina. false, jos yksikään näyte ei osunut.
        /// </summary>
        public static bool AlueNaytteista(IEnumerable<(double Lon, double Lat)> naytteet, double keskiLon, out Alue alue, double vara = Vara)
        {
            double lat0 = double.PositiveInfinity, lat1 = double.NegativeInfinity, lon0 = double.PositiveInfinity, lon1 = double.NegativeInfinity;
            int n = 0;
            foreach (var p in naytteet)
            {
                if (double.IsNaN(p.Lat) || double.IsNaN(p.Lon) || double.IsInfinity(p.Lat) || double.IsInfinity(p.Lon)) continue;
                double d = ((p.Lon - keskiLon + 540) % 360 + 360) % 360 - 180;
                lat0 = Math.Min(lat0, p.Lat); lat1 = Math.Max(lat1, p.Lat);
                lon0 = Math.Min(lon0, d); lon1 = Math.Max(lon1, d);
                n++;
            }
            alue = default;
            if (n == 0) return false;
            lat0 = Math.Max(-90, lat0 - vara);
            lat1 = Math.Min(90, lat1 + vara);
            if (!(lat1 > lat0)) return false;
            lon0 -= vara; lon1 += vara;
            if (lon1 - lon0 >= 360) { lon0 = -180; lon1 = 180; keskiLon = 0; }
            alue = new Alue { Lat0 = lat0, Lat1 = lat1, Lon0 = keskiLon + lon0, Lon1 = keskiLon + lon1, Naytteita = n };
            return true;
        }

        /// <summary>Webin vektorisolut: alueen solujen avaimet (solu ≥ 360 → "0_0").</summary>
        public static List<string> Solut(Alue alue, double solu)
        {
            var ulos = new List<string>();
            if (!(solu > 0)) return ulos;
            if (solu >= 360) { ulos.Add("0_0"); return ulos; }
            int sarakkeita = (int)Math.Ceiling(360 / solu), riveja = (int)Math.Ceiling(180 / solu);
            int Rivi(double lat) => Math.Max(0, Math.Min(riveja - 1, (int)Math.Floor((90 - lat) / solu)));
            int r0 = Rivi(Math.Min(90, alue.Lat1)), r1 = Rivi(Math.Max(-90, alue.Lat0));
            int s0 = (int)Math.Floor((alue.Lon0 + 180) / solu);
            int leveys = Math.Min(sarakkeita, (int)Math.Floor((alue.Lon1 + 180) / solu) - s0 + 1);
            var nahty = new HashSet<string>(StringComparer.Ordinal);
            for (int r = r0; r <= r1; r++)
                for (int i = 0; i < leveys; i++)
                {
                    int s = ((s0 + i) % sarakkeita + sarakkeita) % sarakkeita;
                    string avain = s + "_" + r;
                    if (nahty.Add(avain)) ulos.Add(avain);
                }
            return ulos;
        }

        /// <summary>Web Mercator -laatan (XYZ, rivi 0 pohjoisessa) rajat asteina: (länsi, etelä, itä, pohjoinen).</summary>
        public static (double W, double S, double E, double N) MercatorLaatta(int z, int x, int y)
        {
            double n = 1 << z;
            double Lat(double yy) => Math.Atan(Math.Sinh(Math.PI * (1 - 2 * yy / n))) * 180 / Math.PI;
            return (x / n * 360 - 180, Lat(y + 1), (x + 1) / n * 360 - 180, Lat(y));
        }

        // ---- Harvennus ----

        /// <summary>Webin harvennaViiva: Douglas–Peucker asteissa, pituusaste × cos(lat) (keskipisteen leveys). Askel 3.</summary>
        public static float[] Harvenna(float[] v, double tol)
        {
            const int A = Askel;
            int n = v == null ? 0 : v.Length / A;
            if (!(tol > 0) || n < 3) return v;
            double kx = Math.Max(0.05, Math.Cos(v[A * (n >> 1) + 1] * Math.PI / 180));
            var pida = new bool[n];
            pida[0] = pida[n - 1] = true;
            var pino = new Stack<(int, int)>();
            pino.Push((0, n - 1));
            double t2 = tol * tol;
            int pidetty = 2;
            while (pino.Count > 0)
            {
                var (a, b) = pino.Pop();
                if (b - a < 2) continue;
                double ax = v[A * a] * kx, ay = v[A * a + 1];
                double dx = v[A * b] * kx - ax, dy = v[A * b + 1] - ay;
                double l2 = dx * dx + dy * dy;
                int paras = -1; double parasD = -1;
                for (int i = a + 1; i < b; i++)
                {
                    double px = v[A * i] * kx, py = v[A * i + 1], d;
                    if (l2 == 0) d = (px - ax) * (px - ax) + (py - ay) * (py - ay);
                    else
                    {
                        double t = Math.Max(0, Math.Min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
                        double ex = px - (ax + t * dx), ey = py - (ay + t * dy);
                        d = ex * ex + ey * ey;
                    }
                    if (d > parasD) { parasD = d; paras = i; }
                }
                if (parasD > t2) { pida[paras] = true; pidetty++; pino.Push((a, paras)); pino.Push((paras, b)); }
            }
            var ulos = new float[pidetty * A];
            int j = 0;
            for (int i = 0; i < n; i++)
                if (pida[i]) { ulos[j++] = v[A * i]; ulos[j++] = v[A * i + 1]; ulos[j++] = v[A * i + 2]; }
            return ulos;
        }

        // ---- Nauha ----

        /// <summary>Nauhaverkon taulukot: kärjet lomitettuna (11 floatia), kolmiot, rajat (paikallinen koordinaatisto).</summary>
        public sealed class Nauha
        {
            public int Janoja, Pisteita;
            public float[] Karjet;
            public int[] Kolmiot;
            public float MinX, MinY, MinZ, MaxX, MaxY, MaxZ;
        }

        /// <summary>WGS84 (sama kuin CesiumWgs84Ellipsoid): lon/lat/korkeus → ECEF.</summary>
        public static void Ecef(double lon, double lat, double h, out double x, out double y, out double z)
        {
            const double a = 6378137.0, f = 1.0 / 298.257223563, e2 = f * (2.0 - f);
            double fi = lat * Math.PI / 180, la = lon * Math.PI / 180;
            double sf = Math.Sin(fi), cf = Math.Cos(fi);
            double n = a / Math.Sqrt(1.0 - e2 * sf * sf);
            x = (n + h) * cf * Math.Cos(la);
            y = (n + h) * cf * Math.Sin(la);
            z = (n * (1.0 - e2) + h) * sf;
        }

        /// <summary>Janan palojen määrä: pituus asteina (pituusaste × cos lat) / enimmäispituus, vähintään 1.</summary>
        public static int Paloja(double lon0, double lat0, double lon1, double lat1, double enimmais = JananEnimmaispituus)
        {
            if (!(enimmais > 0)) return 1;
            double dLon = lon1 - lon0;
            if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
            double kx = Math.Cos((lat0 + lat1) * 0.5 * Math.PI / 180);
            double pituus = Math.Sqrt(dLon * kx * dLon * kx + (lat1 - lat0) * (lat1 - lat0));
            return Math.Max(1, (int)Math.Ceiling(pituus / enimmais));
        }

        /// <summary>
        /// Viivat (askel 3: lon, lat, h) nauhaksi Rajaviiva-varjostimelle. <paramref name="porras"/> &gt; 0 harventaa ensin
        /// (webin rakenna). <paramref name="m"/> = ECEF → paikallinen, rivi kerrallaan (m[r * 4 + c], kuten double4x4:n
        /// rivit), eli georeferenssin ecefToLocalMatrix. Puolen y on 0 (ei päätyjatketta eikä rengassuodatinta, kuten
        /// aluerajoilla). Paikka on korkeudella h (maaston todellinen korkeus; varjostin lisää korkeuskertoimen osuuden
        /// max(h, 0)·(k − 1) kuten tileset); palat interpoloivat h:n lineaarisesti. Matka kasvaa viivaa pitkin (metreinä,
        /// ECEF-jänteinä) ja alkaa jokaisen viivan alussa nollasta.
        /// </summary>
        public static Nauha TeeNauha(List<float[]> viivat, double porras, double[] m, double enimmais = JananEnimmaispituus)
        {
            const int A = Askel;
            var harvat = new List<float[]>(viivat?.Count ?? 0);
            int janoja = 0, pisteita = 0;
            if (viivat != null)
                foreach (var v0 in viivat)
                {
                    var v = porras > 0 ? Harvenna(v0, porras) : v0;
                    int n = v == null ? 0 : v.Length / A;
                    if (n < 2) continue;
                    harvat.Add(v);
                    pisteita += n;
                    for (int k = 1; k < n; k++) janoja += Paloja(v[A * k - A], v[A * k - A + 1], v[A * k], v[A * k + 1], enimmais);
                }
            var nauha = new Nauha
            {
                Janoja = janoja, Pisteita = pisteita,
                Karjet = new float[janoja * 4 * KarjenFloatit], Kolmiot = new int[janoja * 6],
                MinX = float.MaxValue, MinY = float.MaxValue, MinZ = float.MaxValue,
                MaxX = float.MinValue, MaxY = float.MinValue, MaxZ = float.MinValue,
            };
            if (janoja == 0) { nauha.MinX = nauha.MinY = nauha.MinZ = nauha.MaxX = nauha.MaxY = nauha.MaxZ = 0; return nauha; }
            void Paikka(double lon, double lat, double h, out double ex, out double ey, out double ez, out float px, out float py, out float pz)
            {
                Ecef(lon, lat, h, out ex, out ey, out ez);
                px = (float)(m[0] * ex + m[1] * ey + m[2] * ez + m[3]);
                py = (float)(m[4] * ex + m[5] * ey + m[6] * ez + m[7]);
                pz = (float)(m[8] * ex + m[9] * ey + m[10] * ez + m[11]);
            }
            var k8 = nauha.Karjet;
            var kol = nauha.Kolmiot;
            int j = 0;
            void Karki(int v, float ax, float ay, float az, float bx, float by, float bz, float puoli, float matka, float h, float hToinen)
            {
                int o = v * KarjenFloatit;
                k8[o] = ax; k8[o + 1] = ay; k8[o + 2] = az;
                k8[o + 3] = bx; k8[o + 4] = by; k8[o + 5] = bz;
                k8[o + 6] = puoli; k8[o + 7] = 0;
                k8[o + 8] = matka; k8[o + 9] = h; k8[o + 10] = hToinen;
            }
            void Laajenna(float x, float y, float z)
            {
                if (x < nauha.MinX) nauha.MinX = x;
                if (x > nauha.MaxX) nauha.MaxX = x;
                if (y < nauha.MinY) nauha.MinY = y;
                if (y > nauha.MaxY) nauha.MaxY = y;
                if (z < nauha.MinZ) nauha.MinZ = z;
                if (z > nauha.MaxZ) nauha.MaxZ = z;
            }
            foreach (var v in harvat)
            {
                int n = v.Length / A;
                double matka = 0;
                float ha = v[2];
                Paikka(v[0], v[1], ha, out double eax, out double eay, out double eaz, out float ax, out float ay, out float az);
                Laajenna(ax, ay, az);
                for (int k = 1; k < n; k++)
                {
                    double lon0 = v[A * k - A], lat0 = v[A * k - A + 1], lon1 = v[A * k], lat1 = v[A * k + 1];
                    double h0 = v[A * k - A + 2], h1 = v[A * k + 2];
                    int paloja = Paloja(lon0, lat0, lon1, lat1, enimmais);
                    double dLon = lon1 - lon0;
                    if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
                    double dLat = lat1 - lat0;
                    for (int p = 1; p <= paloja; p++)
                    {
                        double t = (double)p / paloja;
                        float hb = (float)(h0 + (h1 - h0) * t);
                        Paikka(p == paloja ? lon1 : lon0 + dLon * t, p == paloja ? lat1 : lat0 + dLat * t, hb,
                            out double ebx, out double eby, out double ebz, out float bx, out float by, out float bz);
                        double pituus = Math.Sqrt((ebx - eax) * (ebx - eax) + (eby - eay) * (eby - eay) + (ebz - eaz) * (ebz - eaz));
                        float ma = (float)matka, mb = (float)(matka + pituus);
                        // b-pään kärjille sama suunta kuin a-päälle: toinen = b + (b − a) (Maaraja.TeeTaulukot), h samoin.
                        float cx = 2 * bx - ax, cy = 2 * by - ay, cz = 2 * bz - az, hc = 2 * hb - ha;
                        int v4 = j * 4;
                        Karki(v4, ax, ay, az, bx, by, bz, -1, ma, ha, hb);
                        Karki(v4 + 1, ax, ay, az, bx, by, bz, 1, ma, ha, hb);
                        Karki(v4 + 2, bx, by, bz, cx, cy, cz, -1, mb, hb, hc);
                        Karki(v4 + 3, bx, by, bz, cx, cy, cz, 1, mb, hb, hc);
                        int tt = j * 6;
                        kol[tt] = v4; kol[tt + 1] = v4 + 1; kol[tt + 2] = v4 + 2;
                        kol[tt + 3] = v4 + 1; kol[tt + 4] = v4 + 3; kol[tt + 5] = v4 + 2;
                        Laajenna(bx, by, bz);
                        ax = bx; ay = by; az = bz; ha = hb;
                        eax = ebx; eay = eby; eaz = ebz;
                        matka += pituus;
                        j++;
                    }
                }
            }
            return nauha;
        }
    }
}
