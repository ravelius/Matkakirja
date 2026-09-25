using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit.Maat;

namespace Matkakirja
{
    /// <summary>
    /// MAAKUNNAT MAITTAIN (MaaKartta.maakohtainen; puhdas, testit Kartta-testit/Testit/MaakuntajakoTestit.cs).
    ///
    /// Sisältöpaketin skeema 1.42 laajensi kokoelman maakuntarajat 8 Euroopan maasta 138 maahan (2 546 aluetta,
    /// 42 487 kaarta, 8,3 Mt). Webissä maakunnat ovat maakohtainen kerros (js/pallomaakunnat.js asetaMaa, kutsu
    /// js/pallolauta/lauta.js:5098 maakunnat?.asetaMaa(linssiPaalla() ? null : korostusIso)): vain pelaajan maan
    /// alueet. Natiivissa sama: aineisto jäsennetään kerran (<see cref="Lue"/>) maittain, ja maan vaihtuessa
    /// tunnuskartta rasteroidaan vain sen maan alueista maan omaan rajaukseen (<see cref="Rajaa"/>, <see cref="Rasteroi"/>)
    /// ja rajajanat otetaan vain maan kaarista (<see cref="Janat"/>).
    ///
    /// Maa = tunnuksen etuliite ("FRA:Bretagne" → FRA). Kaaret eivät kerro maata: kaari kuuluu niille maille, joiden
    /// renkaissa on sama jana (renkaat on rakennettu samoista kaarista, pyöristys 1e-3°); maiden välinen raja kuuluu
    /// molemmille. Rappeutuneet saarenpalat (renkaassa alle 3 eri pistettä) jäävät kohdistamatta.
    ///
    /// RAJAUS: renkaat ryhmitellään rypäiksi (laatikoiden väli enintään <see cref="RypasVali"/>°, pituus kiertää
    /// ±180°:n yli). Lähtörypäs on pelaajan pisteen rypäs (enintään <see cref="LahinRypas"/>° päässä), muuten suurin.
    /// Muut rypäät otetaan mukaan painon mukaan, jos teksel ei karkene: Ranskan emämaa + Korsika pysyy 1,2 km:n
    /// tekselissä ilman merentakaisia (Cayennessa Guyana on oma rypäänsä), Yhdysvallat ilman Alaskaa ja Havaijia
    /// (Anchoragessa, Nomessa ja Sitkassa Alaska, Havaijilla Havaiji). Venäjä kattaa 19°…192° (Kaliningrad mukana,
    /// itäraja yli päivämäärärajan). Teksel on vähintään <c>tekseliAste</c> ja kasvaa niin, että kartta mahtuu
    /// budjettiin (4096²: Venäjä 8192×1980 ja 2,3 km, Kanada 1,7 km, muut enintään 1,3 km).
    ///
    /// Kestot Macilla (Kartta-testit, MAAKUNTARAJAT): MiniJson 0,3 s (puu noin 80 Mt, lyhytikäinen), maittain 0,1–0,15 s
    /// (jää muistiin noin 11 Mt), yhden maan rajaus + rasterointi + janat 1–25 ms.
    /// </summary>
    public sealed class Maakuntajako
    {
        /// <summary>Renkaat samaan rypääseen, kun laatikoiden väli on enintään tämä (asteina).</summary>
        public const double RypasVali = 4.0;
        /// <summary>Pelaajan piste valitsee rypään enintään tämän päästä (asteina); kauempana suurin rypäs.</summary>
        public const double LahinRypas = 10.0;
        /// <summary>Rajauksen reunus asteina (pienempi kuin RypasVali, joten pois jääneet rypäät eivät osu rajaukseen).</summary>
        public const double Reunus = 0.5;
        /// <summary>
        /// Rypäs otetaan mukaan, jos teksel karkenee enintään tällä kertoimella lähtörypään tekselistä: Kaliningrad
        /// Venäjään (×1,02), mutta Antillit Ranskaan (×1,2) ja Alaska Yhdysvaltoihin vain, kun pelaaja on siellä.
        /// </summary>
        public const double KarkeneeEnintaan = 1.1;
        /// <summary>Tunnuskartan arvot 1–255 (R8).</summary>
        public const int AluetaEnintaan = 255;

        public sealed class Rengas
        {
            public Maa Alue;
            public (double Lon, double Lat)[] Pisteet;
            /// <summary>Laatikko; W normalisoitu välille [-180, 180), E = W + leveys (voi olla yli 180).</summary>
            public double W, E, S, N;
            /// <summary>Pinta-ala neliöasteina × cos(leveys).</summary>
            public double Paino;
        }

        public sealed class Rypas
        {
            public readonly List<Rengas> Renkaat = new List<Rengas>();
            public double W, E, S, N, Paino;
        }

        public sealed class MaanAlueet
        {
            public string Iso3, Nimi;
            public readonly List<Maa> Alueet = new List<Maa>();
            public readonly List<(double Lon, double Lat)[]> Kaaret = new List<(double Lon, double Lat)[]>();
            public readonly List<Rypas> Rypaat = new List<Rypas>();
        }

        /// <summary>Yhden maan tunnuskartan rajaus ja alueet (indeksi = järjestys + 1).</summary>
        public sealed class Rajaus
        {
            public string Iso3;
            public double Lon0, Lat1, LonVali, LatVali, Teksel;
            public int W, H;
            /// <summary>Alueiden kopiot vain rajaukseen otetuin renkain (osumatesti ja rasterointi), tunnuksen mukaan.</summary>
            public List<Maa> Alueet;
            public int Rypaita, RypaitaPois, AlueitaPois;
            /// <summary>Lähtörypään indeksi maan rypäslistassa (MaaKartta vertaa, vaihtuuko rajaus).</summary>
            public int Lahto;

            /// <summary>Onko piste rajauksen sisällä (pituus kiertää).</summary>
            public bool Sisalla(double lon, double lat)
            {
                if (lat > Lat1 || lat < Lat1 - LatVali) return false;
                double d = lon - Lon0;
                d -= 360.0 * Math.Floor(d / 360.0);
                return d <= LonVali;
            }
        }

        public readonly Dictionary<string, MaanAlueet> Maat = new Dictionary<string, MaanAlueet>(StringComparer.Ordinal);
        public int Kaaria, KohdistamattomatKaaret, AlueitaYhteensa;
        /// <summary>Suurin alueiden määrä yhdessä maassa ja sen maa (yli 255 → varoitus, katkaisu Rajaa-vaiheessa).</summary>
        public int AlueitaEnintaan;
        public string AlueitaEnintaanMaa;

        public MaanAlueet Hae(string iso3) => iso3 != null && Maat.TryGetValue(iso3, out var m) ? m : null;

        public static string MaaTunnuksesta(string id)
        {
            if (id == null) return null;
            int i = id.IndexOf(':');
            return i < 0 ? id : id.Substring(0, i);
        }

        // ---- Jäsennys ----

        static double Luku(object x)
        {
            if (x is double d) return d;
            if (x is Dictionary<string, object> o && o.TryGetValue("$luku", out var s) && s is string t)
                return double.Parse(t, CultureInfo.InvariantCulture);
            return double.NaN;
        }

        /// <summary>Koko kokoelma (MiniJsonin puu) maittain. Taustasäikeessä (Macilla noin 0,1 s 8,3 Mt:n aineistolla).</summary>
        public static Maakuntajako Lue(object juuri)
        {
            var j = new Maakuntajako();
            var aineisto = MaatAineisto.LueRajat(juuri);
            var ob = juuri as Dictionary<string, object>;
            var nimet = new Dictionary<string, string>(StringComparer.Ordinal);
            if (ob != null && ob.TryGetValue("maat", out var mt) && mt is List<object> ml)
                foreach (var o in ml)
                    if (o is Dictionary<string, object> d && d.TryGetValue("iso3", out var i) && i is string iso)
                        nimet[iso] = d.TryGetValue("nimi", out var n) ? n as string : null;

            foreach (var a in aineisto.Maat.Values)
            {
                string iso = MaaTunnuksesta(a.Id);
                if (!j.Maat.TryGetValue(iso, out var m))
                    j.Maat[iso] = m = new MaanAlueet { Iso3 = iso, Nimi = nimet.TryGetValue(iso, out var n) ? n : null };
                m.Alueet.Add(a);
                j.AlueitaYhteensa++;
            }
            var maaLista = new List<MaanAlueet>(j.Maat.Values);
            foreach (var m in maaLista)
            {
                m.Alueet.Sort((x, y) => string.CompareOrdinal(x.Id, y.Id));
                if (m.Alueet.Count > j.AlueitaEnintaan) { j.AlueitaEnintaan = m.Alueet.Count; j.AlueitaEnintaanMaa = m.Iso3; }
                Ryhmittele(m);
            }

            // Kaaret maittain: jana → maat (enintään kaksi: raja on kahden alueen välissä).
            var janat = new Dictionary<(long, long), int>();
            for (int mi = 0; mi < maaLista.Count; mi++)
                foreach (var a in maaLista[mi].Alueet)
                    foreach (var r in a.Renkaat)
                        for (int i = 0; i < r.Length; i++)
                        {
                            var k = JanaAvain(r[i], r[(i + 1) % r.Length]);
                            if (k.Item1 == k.Item2) continue;
                            janat.TryGetValue(k, out int v);
                            int c1 = v & 0xffff, c2 = v >> 16;
                            if (c1 == mi + 1 || c2 == mi + 1) continue;
                            janat[k] = c1 == 0 ? mi + 1 : c2 == 0 ? v | ((mi + 1) << 16) : v;
                        }
            if (ob != null && ob.TryGetValue("kaaret", out var ko) && ko is List<object> kaaret)
                foreach (var k in kaaret)
                {
                    if (!(k is List<object> pl) || pl.Count < 2) continue;
                    var pisteet = new List<(double Lon, double Lat)>(pl.Count);
                    foreach (var p in pl)
                        if (p is List<object> l && l.Count >= 2)
                        {
                            double lon = Luku(l[0]), lat = Luku(l[1]);
                            if (!double.IsNaN(lon) && !double.IsNaN(lat)) pisteet.Add((lon, lat));
                        }
                    if (pisteet.Count < 2) continue;
                    j.Kaaria++;
                    int v = 0;
                    for (int i = 0; i + 1 < pisteet.Count && v == 0; i++) janat.TryGetValue(JanaAvain(pisteet[i], pisteet[i + 1]), out v);
                    if (v == 0) { j.KohdistamattomatKaaret++; continue; }
                    var taulu = pisteet.ToArray();
                    maaLista[(v & 0xffff) - 1].Kaaret.Add(taulu);
                    if ((v >> 16) != 0) maaLista[(v >> 16) - 1].Kaaret.Add(taulu);
                }
            return j;
        }

        static long PisteAvain((double Lon, double Lat) p) =>
            ((long)(Math.Round(p.Lon * 1000.0) + (1 << 20)) << 21) | (long)(Math.Round(p.Lat * 1000.0) + (1 << 20));

        static (long, long) JanaAvain((double Lon, double Lat) a, (double Lon, double Lat) b)
        {
            long x = PisteAvain(a), y = PisteAvain(b);
            return x <= y ? (x, y) : (y, x);
        }

        // ---- Rypäät ----

        /// <summary>Renkaan pituudet avattuna (peräkkäiset pisteet alle 180° toisistaan).</summary>
        static void Avaa((double Lon, double Lat)[] r, double[] lon)
        {
            double edellinen = r[0].Lon;
            for (int i = 0; i < r.Length; i++)
            {
                double l = r[i].Lon;
                while (l - edellinen > 180) l -= 360;
                while (l - edellinen < -180) l += 360;
                lon[i] = edellinen = l;
            }
        }

        static double Normalisoi(double lon) => lon - 360.0 * Math.Floor((lon + 180.0) / 360.0);

        static void Ryhmittele(MaanAlueet m)
        {
            var renkaat = new List<Rengas>();
            foreach (var a in m.Alueet)
                foreach (var r in a.Renkaat)
                {
                    var lon = new double[r.Length];
                    Avaa(r, lon);
                    double w = double.MaxValue, e = double.MinValue, s = double.MaxValue, n = double.MinValue, ala = 0;
                    for (int i = 0, k = r.Length - 1; i < r.Length; k = i++)
                    {
                        w = Math.Min(w, lon[i]); e = Math.Max(e, lon[i]);
                        s = Math.Min(s, r[i].Lat); n = Math.Max(n, r[i].Lat);
                        ala += lon[k] * r[i].Lat - lon[i] * r[k].Lat;
                    }
                    double nw = Normalisoi(w);
                    renkaat.Add(new Rengas
                    {
                        Alue = a, Pisteet = r, W = nw, E = nw + (e - w), S = s, N = n,
                        Paino = Math.Abs(ala / 2) * Math.Cos((s + n) / 2 * Math.PI / 180.0),
                    });
                }
            // Yksinkertainen kytkentä (union-find); renkaita on enintään muutama sata maata kohti.
            var vanhempi = new int[renkaat.Count];
            for (int i = 0; i < vanhempi.Length; i++) vanhempi[i] = i;
            int Juuri(int i) { while (vanhempi[i] != i) i = vanhempi[i] = vanhempi[vanhempi[i]]; return i; }
            for (int i = 0; i < renkaat.Count; i++)
                for (int k = i + 1; k < renkaat.Count; k++)
                {
                    var a = renkaat[i]; var b = renkaat[k];
                    double dLat = Math.Max(0, Math.Max(a.S - b.N, b.S - a.N));
                    if (dLat > RypasVali || LonVali(a.W, a.E, b.W, b.E) > RypasVali) continue;
                    int ja = Juuri(i), jb = Juuri(k);
                    if (ja != jb) vanhempi[ja] = jb;
                }
            var rypaat = new Dictionary<int, Rypas>();
            for (int i = 0; i < renkaat.Count; i++)
            {
                int jr = Juuri(i);
                if (!rypaat.TryGetValue(jr, out var ry)) { rypaat[jr] = ry = new Rypas(); m.Rypaat.Add(ry); }
                ry.Renkaat.Add(renkaat[i]);
            }
            foreach (var ry in m.Rypaat)
            {
                var valit = new List<(double W, double E)>();
                ry.S = double.MaxValue; ry.N = double.MinValue;
                foreach (var r in ry.Renkaat)
                {
                    valit.Add((r.W, r.E));
                    ry.S = Math.Min(ry.S, r.S); ry.N = Math.Max(ry.N, r.N); ry.Paino += r.Paino;
                }
                (ry.W, ry.E) = Kansi(valit);
            }
            // Suurin ensin (lähtörypäs ilman pistettä, mukaan otto painon mukaan).
            m.Rypaat.Sort((x, y) => y.Paino.CompareTo(x.Paino));
        }

        /// <summary>Kahden pituusvälin väli asteina (0, jos limittäin), ±360° kierto huomioiden.</summary>
        public static double LonVali(double aW, double aE, double bW, double bE)
        {
            double paras = double.MaxValue;
            for (int k = -1; k <= 1; k++)
            {
                double w = bW + 360.0 * k, e = bE + 360.0 * k;
                paras = Math.Min(paras, Math.Max(0, Math.Max(w - aE, aW - e)));
            }
            return paras;
        }

        /// <summary>
        /// Pienin pituusväli, joka kattaa kaikki välit (W normalisoitu [-180, 180), E - W &lt;= 360). Kansi alkaa
        /// suurimman aukon jälkeen, joten päivämäärärajan ylittävä maa (RUS, FJI) saa E &gt; 180.
        /// </summary>
        public static (double W, double E) Kansi(List<(double W, double E)> valit)
        {
            if (valit.Count == 0) return (0, 0);
            var v = new List<(double W, double E)>(valit.Count);
            foreach (var (w, e) in valit)
            {
                if (e - w >= 360) return (-180, 180);
                double nw = Normalisoi(w);
                v.Add((nw, nw + (e - w)));
            }
            v.Sort((a, b) => a.W.CompareTo(b.W));
            var lohkot = new List<(double W, double E)>();
            foreach (var x in v)
            {
                if (lohkot.Count > 0 && x.W <= lohkot[lohkot.Count - 1].E)
                {
                    var l = lohkot[lohkot.Count - 1];
                    lohkot[lohkot.Count - 1] = (l.W, Math.Max(l.E, x.E));
                }
                else lohkot.Add(x);
            }
            // Viimeinen lohko voi jatkua ±180°:n yli ensimmäisten päälle.
            while (lohkot.Count > 1 && lohkot[lohkot.Count - 1].E - 360 >= lohkot[0].W)
            {
                var l = lohkot[lohkot.Count - 1];
                lohkot[lohkot.Count - 1] = (l.W, Math.Max(l.E, lohkot[0].E + 360));
                lohkot.RemoveAt(0);
            }
            int n = lohkot.Count;
            double paras = lohkot[0].W + 360 - lohkot[n - 1].E;
            int i = n - 1;
            for (int k = 0; k + 1 < n; k++)
            {
                double aukko = lohkot[k + 1].W - lohkot[k].E;
                if (aukko > paras) { paras = aukko; i = k; }
            }
            if (paras <= 0) return (-180, 180);
            if (i == n - 1) return (lohkot[0].W, lohkot[n - 1].E);
            return (lohkot[i + 1].W, lohkot[i].E + 360);
        }

        /// <summary>Pisteen etäisyys rypääseen asteina (lähin rengaslaatikko; 0 = laatikon sisällä).</summary>
        public static double Etaisyys(Rypas r, double lat, double lon)
        {
            double paras = double.MaxValue;
            foreach (var x in r.Renkaat)
            {
                double dLat = Math.Max(0, Math.Max(x.S - lat, lat - x.N));
                double dLon = LonVali(x.W, x.E, lon, lon);
                paras = Math.Min(paras, Math.Max(dLat, dLon));
                if (paras == 0) break;
            }
            return paras;
        }

        /// <summary>Lähtörypään indeksi: pelaajan pisteen rypäs (enintään LahinRypas° päässä), muuten suurin (0).</summary>
        public static int LahtoRypas(MaanAlueet m, double? lat, double? lon)
        {
            if (m == null || m.Rypaat.Count == 0) return -1;
            if (lat == null || lon == null || double.IsNaN(lat.Value) || double.IsNaN(lon.Value)) return 0;
            int paras = 0;
            double parasD = double.MaxValue;
            for (int i = 0; i < m.Rypaat.Count; i++)
            {
                double d = Etaisyys(m.Rypaat[i], lat.Value, lon.Value);
                if (d < parasD) { parasD = d; paras = i; }
            }
            return parasD <= LahinRypas ? paras : 0;
        }

        /// <summary>Tekselin koko asteina: tavoite, budjetti (tekseliä yhteensä) ja suurin sivu.</summary>
        public static double Teksel(double lonVali, double latVali, double tavoite, long budjetti, int sivu) =>
            Math.Max(tavoite, Math.Max(Math.Sqrt(lonVali * latVali / budjetti), Math.Max(lonVali, latVali) / sivu));

        static (double W, double E, double S, double N) Laatikko(List<Rypas> rypaat)
        {
            var valit = new List<(double W, double E)>();
            double s = double.MaxValue, n = double.MinValue;
            foreach (var r in rypaat) { valit.Add((r.W, r.E)); s = Math.Min(s, r.S); n = Math.Max(n, r.N); }
            var (w, e) = Kansi(valit);
            return (w, e, s, n);
        }

        static void Mitat((double W, double E, double S, double N) l, out double lonV, out double latV)
        {
            lonV = Math.Min(360, l.E - l.W + 2 * Reunus);
            latV = Math.Min(90, l.N + Reunus) - Math.Max(-90, l.S - Reunus);
        }

        /// <summary>
        /// Maan tunnuskartan rajaus (null, jos maata ei ole). Piste (pelaajan nappula) valitsee lähtörypään;
        /// tavoite = teksel asteina, budjetti = tekseliä enintään, sivu = tekstuurin suurin sivu.
        /// </summary>
        public Rajaus Rajaa(string iso3, double? lat, double? lon, double tavoite, long budjetti, int sivu)
        {
            var m = Hae(iso3);
            int lahto = LahtoRypas(m, lat, lon);
            if (lahto < 0) return null;
            var mukana = new List<Rypas> { m.Rypaat[lahto] };
            var laatikko = Laatikko(mukana);
            Mitat(laatikko, out double lv, out double bv);
            double teksel = Teksel(lv, bv, tavoite, budjetti, sivu), lahtoTeksel = teksel;
            for (int i = 0; i < m.Rypaat.Count; i++)
            {
                if (i == lahto) continue;
                mukana.Add(m.Rypaat[i]);
                var l2 = Laatikko(mukana);
                Mitat(l2, out double lv2, out double bv2);
                double t2 = Teksel(lv2, bv2, tavoite, budjetti, sivu);
                if (t2 <= lahtoTeksel * KarkeneeEnintaan) { laatikko = l2; teksel = Math.Max(teksel, t2); }
                else mukana.RemoveAt(mukana.Count - 1);
            }
            Mitat(laatikko, out lv, out bv);
            var r = new Rajaus
            {
                Iso3 = iso3, Teksel = teksel, Lahto = lahto,
                Rypaita = mukana.Count, RypaitaPois = m.Rypaat.Count - mukana.Count,
                W = Math.Max(1, (int)Math.Ceiling(lv / teksel - 1e-9)),
                H = Math.Max(1, (int)Math.Ceiling(bv / teksel - 1e-9)),
            };
            if (lv >= 360) { r.Lon0 = -180; r.W = Math.Max(1, (int)Math.Round(360 / teksel)); r.LonVali = 360; }
            else { r.Lon0 = laatikko.W - Reunus; r.LonVali = r.W * teksel; }
            r.Lat1 = Math.Min(90, laatikko.N + Reunus);
            r.LatVali = r.H * teksel;

            // Alueet vain mukana olevin renkain (kopiot: osumatesti ei osu pois jääneisiin saariin).
            var renkaat = new Dictionary<Maa, List<(double Lon, double Lat)[]>>();
            foreach (var ry in mukana)
                foreach (var x in ry.Renkaat)
                {
                    if (!renkaat.TryGetValue(x.Alue, out var l)) renkaat[x.Alue] = l = new List<(double Lon, double Lat)[]>();
                    l.Add(x.Pisteet);
                }
            r.Alueet = new List<Maa>();
            foreach (var a in m.Alueet)
            {
                if (!renkaat.TryGetValue(a, out var l)) continue;
                var k = new Maa
                {
                    Id = a.Id, Iso2 = a.Iso2, Nimi = a.Nimi, Renkaat = l,
                    KeskusLat = a.KeskusLat, KeskusLon = a.KeskusLon, NimiPallolle = a.NimiPallolle,
                    W = double.MaxValue, E = double.MinValue, S = double.MaxValue, N = double.MinValue,
                };
                foreach (var rengas in l)
                    foreach (var p in rengas)
                    { k.W = Math.Min(k.W, p.Lon); k.E = Math.Max(k.E, p.Lon); k.S = Math.Min(k.S, p.Lat); k.N = Math.Max(k.N, p.Lat); }
                r.Alueet.Add(k);
            }
            if (r.Alueet.Count > AluetaEnintaan)
            {
                r.AlueitaPois = r.Alueet.Count - AluetaEnintaan;
                r.Alueet.RemoveRange(AluetaEnintaan, r.AlueitaPois);
            }
            return r;
        }

        // ---- Rasterointi ja janat ----

        /// <summary>
        /// Tunnuskartta (rivi 0 pohjoisin, arvo = alueen indeksi + 1) parillisuussäännöllä kuten MaaKartta.Rasteroi.
        /// Renkaat siirretään ±360° rajauksen puolelle (Venäjän itäosa 180° → -170° näkyy välillä 180…190).
        /// </summary>
        public static byte[] Rasteroi(Rajaus rj)
        {
            int w = rj.W, h = rj.H;
            var kartta = new byte[w * h];
            var rivit = new List<float>[h];
            double sx = w / rj.LonVali, sy = h / rj.LatVali;
            for (int m = 0; m < rj.Alueet.Count; m++)
            {
                byte arvo = (byte)(m + 1);
                int yMin = h, yMax = -1;
                foreach (var rengas in rj.Alueet[m].Renkaat)
                {
                    var lon = new double[rengas.Length];
                    Avaa(rengas, lon);
                    double pienin = double.MaxValue;
                    foreach (var l in lon) pienin = Math.Min(pienin, l);
                    // Renkaan länsireuna välille [Lon0 - Reunus, Lon0 + 360 - Reunus).
                    double siirto = -360.0 * Math.Floor((pienin - rj.Lon0 + Reunus) / 360.0);
                    for (int i = 0; i < rengas.Length; i++)
                    {
                        int k = (i + 1) % rengas.Length;
                        double x0 = (lon[i] + siirto - rj.Lon0) * sx, y0 = (rj.Lat1 - rengas[i].Lat) * sy;
                        double x1 = (lon[k] + siirto - rj.Lon0) * sx, y1 = (rj.Lat1 - rengas[k].Lat) * sy;
                        if (y0 == y1) continue;
                        double ya = Math.Min(y0, y1), yb = Math.Max(y0, y1);
                        int r0 = Math.Max(0, (int)Math.Ceiling(ya - 0.5));
                        int r1 = Math.Min(h - 1, (int)Math.Ceiling(yb - 0.5) - 1);
                        for (int r = r0; r <= r1; r++)
                        {
                            double yc = r + 0.5;
                            double x = x0 + (yc - y0) * (x1 - x0) / (y1 - y0);
                            (rivit[r] ??= new List<float>()).Add((float)x);
                            if (r < yMin) yMin = r;
                            if (r > yMax) yMax = r;
                        }
                    }
                }
                for (int r = yMin; r <= yMax; r++)
                {
                    var l = rivit[r];
                    if (l == null || l.Count < 2) { l?.Clear(); continue; }
                    l.Sort();
                    int rivi = r * w;
                    for (int i = 0; i + 1 < l.Count; i += 2)
                    {
                        int xa = Math.Max(0, (int)Math.Ceiling(l[i] - 0.5)), xb = Math.Min(w - 1, (int)Math.Ceiling(l[i + 1] - 0.5) - 1);
                        for (int x = xa; x <= xb; x++) kartta[rivi + x] = arvo;
                    }
                    l.Clear();
                }
            }
            return kartta;
        }

        /// <summary>Maan kaarien janat rajauksen sisältä (molemmat päät sisällä), asteina.</summary>
        public List<((double Lon, double Lat) A, (double Lon, double Lat) B)> Janat(Rajaus rj)
        {
            var ulos = new List<((double Lon, double Lat), (double Lon, double Lat))>();
            var m = Hae(rj?.Iso3);
            if (m == null) return ulos;
            foreach (var k in m.Kaaret)
            {
                bool edellinen = rj.Sisalla(k[0].Lon, k[0].Lat);
                for (int i = 1; i < k.Length; i++)
                {
                    bool sisalla = rj.Sisalla(k[i].Lon, k[i].Lat);
                    if (sisalla && edellinen) ulos.Add((k[i - 1], k[i]));
                    edellinen = sisalla;
                }
            }
            return ulos;
        }
    }
}
