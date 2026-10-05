// ISS-KAMERA: laukaisun työstö ilman Unityä. Kuvasuunnitelman soluista Web Mercator -laattajoukko z6-juuriin rajattuna
// (AstronauttiKerroksen pinta: taso = z − 6, x' = x − X0·2^t, y' = y − Y0·2^t, KarttaKerrokset.RasterinJako), maamaski
// saman kuvan SCL:stä (vesiluokka 6, karkein taso ~320 m, sumennus ~8 km → pilvien rantavyöhyke) ja laatan piirto:
// S2 (Uudelleenprojisointi) + pilvet (Pilvikentta 32 × 32 -hilassa, bilineaarisesti ylös; pilvet ovat ≥ 500 m:n piirteitä).
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class KuvanTyosto
    {
        public const int JuuriZ = 6, MaksimiZ = 14;
        public readonly KuvaData Data = new KuvaData();
        public IKuvanPilvet Pilvet;
        /// <summary>
        /// GIBS-pilvet: valkoinen S2-pinta (jäätikkö, suola, lumi kuvassa) ei saa pilveä päälleen, koska GIBS:n maski ei erota
        /// lunta pilvestä (esiselvitys 5.10.: Alpit). Pinnan valkoisuus samalla kaavalla kuin GibsPilvet.MaskiAlfa.
        /// </summary>
        public bool PintaRajaaPilvet;
        /// <summary>Kameran paikka ECEF (m); pilvipeitto kasvaa etäisyyden mukaan (null = kerroin 1).</summary>
        public (double x, double y, double z)? Kamera;
        /// <summary>
        /// Maan ja meren kylläinen sininen kaukana (Päätoimittaja 1.10. 20.3x omistajan Cupola-mallikuvasta: "maa ja meri syvän
        /// kylläisen sinisiä, ei maitomaisia; valkoiset pysyvät valkoisina"): pohjan värit siirtyvät sinistä kohti ennen pilviä,
        /// paino etäisyydestä kuten pilvien kaukokentät (peittoK 1 → 1,85). Ilmakehän utu lisää valoa myös pilviin, tämä ei. 0 = pois.
        /// </summary>
        public double MaanSini;
        /// <summary>
        /// Auringon suunta ECEF-yksikkövektorina (null = ei yötä): yöpuolella pilvikentät häivytetään (aurinko −8° … −3°), koska
        /// yökuoren tummennus jätti valkoiset kentät harmaiksi läiskiksi (kiertoratanousu 1.10.: ISS:n yökuvissa pilvet ovat tummia).
        /// </summary>
        public (double x, double y, double z)? AurinkoEcef;

        /// <summary>
        /// Pilvipeiton kerroin etäisyydestä (omistaja 1.10. 19.5x Cupola-mallikuvasta: "pilvikenttiä horisonttiin asti, valkoisen ja
        /// syvän sinisen kontrasti suuri"; lähialueen litteät läiskät harvemmiksi): ≤ 600 km 0,5 … ≥ 1 600 km 1,85. Jatkuva
        /// funktio paikasta, joten tasojen ja laattojen rajoille ei tule saumaa.
        /// </summary>
        double PeittoK(double lat, double lon)
        {
            if (Kamera == null) return 1;
            var p = Kuvasuunnitelma.Ecef(lat, lon); var c = Kamera.Value;
            double d = Math.Sqrt((p.x - c.x) * (p.x - c.x) + (p.y - c.y) * (p.y - c.y) + (p.z - c.z) * (p.z - c.z)) / 1000;
            return Math.Max(0.5, Math.Min(1.85, 0.5 + (d - 600) / 1000 * 1.35));
        }
        /// <summary>z6-juurijako: vasen yläkulma (X0, Y0), koko Rx × Ry, ja rajaus asteina (W, S, E, N).</summary>
        public int X0, Y0, Rx, Ry;
        public double W, S, E, N;
        /// <summary>Piirrettävät laatat (z, x, y), juurista tarkimpaan.</summary>
        public readonly SortedSet<(int z, int x, int y)> Laatat = new SortedSet<(int, int, int)>();
        readonly List<(S2Ruutu ruutu, CogOtsake otsake, float[] maa, int koko)> maamaskit = new List<(S2Ruutu, CogOtsake, float[], int)>();

        static int Zoom(double metria, double lat)
        {
            double z = Math.Log(2 * Math.PI * 6378137 * Math.Cos(lat * Math.PI / 180) / (256 * Math.Max(1, metria)), 2);
            return Math.Max(JuuriZ, Math.Min(MaksimiZ, (int)Math.Ceiling(z - 1e-9)));
        }

        static (int x, int y) Laatta(int z, double lat, double lon)
        {
            double n = 1 << z, la = Math.Max(-85, Math.Min(85, lat)) * Math.PI / 180;
            int x = (int)Math.Floor((lon + 180) / 360 * n), y = (int)Math.Floor((1 - Math.Log(Math.Tan(la) + 1 / Math.Cos(la)) / Math.PI) / 2 * n);
            return (Math.Max(0, Math.Min((int)n - 1, x)), Math.Max(0, Math.Min((int)n - 1, y)));
        }

        static double LaatanLat(int z, int y) => Math.Atan(Math.Sinh(Math.PI * (1 - 2.0 * y / (1 << z)))) * 180 / Math.PI;

        /// <summary>
        /// Laattajoukko näytteistä: jokainen solu tasollaan (pikselikoko ≤ solun maapikseli) ja yksi taso tarkemmin, jotta
        /// Cesiumin tasovalinta ei pyydä puuttuvaa laattaa; esivanhemmat juureen asti. Juurijako kattaa kaikki solut.
        /// </summary>
        public void Suunnittele(List<Nayte> naytteet)
        {
            Laatat.Clear();
            int xmin = int.MaxValue, xmax = int.MinValue, ymin = int.MaxValue, ymax = int.MinValue;
            foreach (var n in naytteet)
            {
                int z = Math.Min(MaksimiZ, Zoom(n.MetriaPikseli, n.Lat) + 1);
                var (x0, y0) = Laatta(z, n.LatMax, n.LonMin); var (x1, y1) = Laatta(z, n.LatMin, n.LonMax);
                for (int x = x0; x <= x1; x++)
                    for (int y = y0; y <= y1; y++)
                        for (int zz = z, xx = x, yy = y; zz >= JuuriZ; zz--, xx >>= 1, yy >>= 1) if (!Laatat.Add((zz, xx, yy))) break;
            }
            foreach (var (z, x, y) in Laatat)
                if (z == JuuriZ) { xmin = Math.Min(xmin, x); xmax = Math.Max(xmax, x); ymin = Math.Min(ymin, y); ymax = Math.Max(ymax, y); }
            if (xmin > xmax) { Rx = Ry = 0; return; }
            X0 = xmin; Y0 = ymin; Rx = xmax - xmin + 1; Ry = ymax - ymin + 1;
            // Juurijaon ulkopuolelle jäävät tasot kuuluvat silti juureen (esivanhempi on aina juurijoukossa).
            W = X0 * 360.0 / (1 << JuuriZ) - 180; E = (X0 + Rx) * 360.0 / (1 << JuuriZ) - 180;
            N = LaatanLat(JuuriZ, Y0); S = LaatanLat(JuuriZ, Y0 + Ry);
            // Täysi neliöpuu (laitekoe 5: Cesium piirtää myös isälaattoja; isä, jolta puuttui lapsia, projisoitiin hakematta
            // jääneestä datasta → tummia kaistoja): kaikki juuret ja jokaisen laatan sisarukset, jolloin jokainen isä kootaan
            // neljästä lapsestaan ja sisarukset saavat oman datansa lehtinä.
            nakyvat = new HashSet<(int, int, int)>(Laatat);
            for (int x = X0; x < X0 + Rx; x++) for (int y = Y0; y < Y0 + Ry; y++) Laatat.Add((JuuriZ, x, y));
            foreach (var (z, x, y) in Laatat.ToList())
                if (z > JuuriZ) { int bx = x & ~1, by = y & ~1; Laatat.Add((z, bx, by)); Laatat.Add((z, bx + 1, by)); Laatat.Add((z, bx, by + 1)); Laatat.Add((z, bx + 1, by + 1)); }
        }

        /// <summary>Lehtilaatat: joukon laatat, joilla ei ole lapsia joukossa (niiden data haetaan, isät kootaan lapsista).</summary>
        public List<(int z, int x, int y)> Lehdet()
        {
            var r = new List<(int, int, int)>();
            foreach (var (z, x, y) in Laatat)
                if (!Laatat.Contains((z + 1, 2 * x, 2 * y)) && !Laatat.Contains((z + 1, 2 * x + 1, 2 * y))
                    && !Laatat.Contains((z + 1, 2 * x, 2 * y + 1)) && !Laatat.Contains((z + 1, 2 * x + 1, 2 * y + 1))) r.Add((z, x, y));
            return r;
        }

        /// <summary>
        /// COG-laatat ruudulle lehtilaattojen alueesta (laitekoe 2, 1.10.: solupohjainen haku jätti Mercator-laattojen reunoille
        /// aukkoja → tummat kaistat): jokainen lehti tasolla, jonka pikseli ≤ lehden pikseli, rajaus 9 reunapisteestä.
        /// </summary>
        /// <summary>
        /// Datan säästö (Päätoimittaja 1.10.: 50 mm ~40 Mt): TasoKerroin kertoo lehden pikselikoon ennen COG-tason valintaa
        /// (lehti on Cesiumin varalta yhtä tasoa tarkempi kuin näkymä vaatii, joten 2 = näkymän oma tarkkuus), ja Ensisijainen
        /// hakee lehden vain ruudusta, joka kattaa sen kokonaan (S2-ruudut menevät ~10 km päällekkäin; reunalehdet kaikista).
        /// </summary>
        public double TasoKerroin = 1;
        public bool Ensisijainen;

        /// <summary>
        /// Kattaako ruutu lehden kokonaan: lehden 9 reunapistettä ruudun UTM-neliön sisällä (otsakkeen origo ja koko) 500 m:n
        /// marginaalilla. Indeksin bbox on neliön lat/lon-kehys ja todellista laajempi (koostetesti 1.10.: aukkoja 0,66–1,5 %).
        /// </summary>
        static bool Kattaa(S2Ruutu ru, CogOtsake o, int z, int x, int y)
        {
            double koko = o.Tasot[0].Leveys * o.PikseliM, m = 500;
            for (int i = 0; i <= 2; i++) for (int j = 0; j <= 2; j++)
            {
                var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 128, j * 128);
                var (e, n) = Utm.Eteen(la, lo, ru.Vyohyke);
                if (e < o.Ita0 + m || e > o.Ita0 + koko - m || n > o.Pohjoinen0 - m || n < o.Pohjoinen0 - koko + m) return false;
            }
            return true;
        }

        /// <summary>Näkymän laatat ennen sisarusten täydennystä: näille näkymän tarkkuus, sisaruksille karkein taso (tasotesti 1.10.:
        /// sisarukset täydellä tarkkuudella +56 Mt, ilman dataa isätasot täyttöä).</summary>
        HashSet<(int, int, int)> nakyvat;

        /// <summary>
        /// Näkymän lehdet, joissa jonkin ruudun SCL näyttää pilveä tai pilven varjoa (8 × 8 näytettä per lehti): niille haetaan
        /// varakuva (valinta 1), jonka pikselit täyttävät maskatut kohdat.
        /// </summary>
        /// <summary>
        /// Näkyvät lehdet, joissa ensisijaisen ruudun neliön sisällä on dataton kohta (kahden radan välinen kiila; simu 284afecc:
        /// Sahara ja Amazonia, BMNG näkyi kiilana): varakuva (toinen päivä tai rata) haetaan näille kuten pilvisille.
        /// </summary>
        public HashSet<(int z, int x, int y)> DatattomatLehdet()
        {
            var r = new HashSet<(int, int, int)>();
            foreach (var (z, x, y) in Lehdet())
            {
                if (nakyvat != null && !nakyvat.Contains((z, x, y))) continue;
                double m = Uudelleenprojisointi.PikseliM(z, Uudelleenprojisointi.Pikseli(z, x, y, 128, 128).lat);
                bool aukko = false;
                for (int i = 0; i < 8 && !aukko; i++) for (int j = 0; j < 8 && !aukko; j++)
                {
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 32 + 16, j * 32 + 16);
                    bool neliossa = false;
                    foreach (var (ru, _) in Data.Ruudut)
                        if (ru.Valinta == 0 && lo >= ru.W && lo <= ru.E && la >= ru.S && la <= ru.N) { neliossa = true; break; }
                    if (neliossa && !Uudelleenprojisointi.Nayte(Data, la, lo, m, out _, out _, out _)) aukko = true;
                }
                if (aukko) r.Add((z, x, y));
            }
            return r;
        }

        public HashSet<(int z, int x, int y)> PilvisetLehdet()
        {
            var r = new HashSet<(int, int, int)>();
            foreach (var (z, x, y) in Lehdet())
            {
                if (nakyvat != null && !nakyvat.Contains((z, x, y))) continue;
                double m = Uudelleenprojisointi.PikseliM(z, Uudelleenprojisointi.Pikseli(z, x, y, 128, 128).lat);
                bool pilvi = false;
                for (int i = 0; i < 8 && !pilvi; i++) for (int j = 0; j < 8 && !pilvi; j++)
                {
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 32 + 16, j * 32 + 16);
                    foreach (var (ru, o) in Data.Ruudut)
                    {
                        if (ru.Valinta > 0 || lo < ru.W || lo > ru.E || la < ru.S || la > ru.N) continue;
                        var (e, n) = Utm.Eteen(la, lo, ru.Vyohyke);
                        if (Data.Pilvinen(ru.Tunnus, ru.Vyohyke, e, n, m)) { pilvi = true; break; }
                    }
                }
                if (pilvi) r.Add((z, x, y));
            }
            return r;
        }

        public HashSet<(int taso, int tx, int ty)> HaettavatLaatat(S2Ruutu ru, CogOtsake o, Func<(int z, int x, int y), bool> suodin = null)
        {
            var r = new HashSet<(int, int, int)>(); int v = ru.Vyohyke;
            foreach (var (z, x, y) in Lehdet())
            {
                if (suodin != null && !suodin((z, x, y))) continue;
                bool sisarus = nakyvat != null && !nakyvat.Contains((z, x, y));   // näkymän ulkopuolinen sisarus: vain karkein taso
                var (n0, w0) = Uudelleenprojisointi.Pikseli(z, x, y, 0, 0); var (s0, e0) = Uudelleenprojisointi.Pikseli(z, x, y, 256, 256);
                if (e0 < ru.W || w0 > ru.E || n0 < ru.S || s0 > ru.N) continue;
                if (Mosaiikki != null && MosaiikinLaatta(z, x, y) && Mosaiikki(z, x, y) != null) continue;   // kaukoalue mosaiikista (haettu)
                if (Ensisijainen && ru.Valinta == 0)   // varakuva haetaan aina suodatetuille lehdille
                {
                    // Ensimmäinen ruutu (Data.Ruudut-järjestys), joka kattaa lehden kokonaan, ottaa sen; muut ohittavat.
                    S2Ruutu oma = null;
                    // Vain aukoton valinta (nodata ≤ 0,5 %) voi ottaa lehden yksin (laitekoe 3: rataleveyden reunan aukot jäivät
                    // täytöksi, kun ensisijaisella ruudulla oli nodataa).
                    foreach (var (r2, o2) in Data.Ruudut) if (r2.Valinta == 0 && r2.Nodata <= 0.5 && Kattaa(r2, o2, z, x, y)) { oma = r2; break; }
                    if (oma != null && oma != ru) continue;
                }
                int taso = sisarus ? o.Tasot.Count - 1 : o.TasoResoluutiolle(Uudelleenprojisointi.PikseliM(z, (n0 + s0) / 2) * TasoKerroin);
                var t = o.Tasot[taso]; double pm = o.TasonPikseliM(taso);
                double xmin = double.MaxValue, xmax = double.MinValue, ymin = double.MaxValue, ymax = double.MinValue;
                for (int i = 0; i <= 2; i++) for (int j = 0; j <= 2; j++)
                {
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 128, j * 128);
                    var (e, no) = Utm.Eteen(la, lo, v);
                    double px = (e - o.Ita0) / pm, py = (o.Pohjoinen0 - no) / pm;
                    xmin = Math.Min(xmin, px - 2); xmax = Math.Max(xmax, px + 2); ymin = Math.Min(ymin, py - 2); ymax = Math.Max(ymax, py + 2);
                }
                int tx0 = Math.Max(0, (int)Math.Floor(xmin / t.LaattaL)), tx1 = Math.Min(t.LaattojaX - 1, (int)Math.Floor(xmax / t.LaattaL));
                int ty0 = Math.Max(0, (int)Math.Floor(ymin / t.LaattaK)), ty1 = Math.Min(t.LaattojaY - 1, (int)Math.Floor(ymax / t.LaattaK));
                for (int tx = tx0; tx <= tx1; tx++) for (int ty = ty0; ty <= ty1; ty++) r.Add((taso, tx, ty));
            }
            return r;
        }

        /// <summary>
        /// Koko laattajoukko tasoittain tarkimmasta juureen: lehti piirretään datasta (Piirra), isä kootaan lapsistaan, avomeri
        /// (ei S2-dataa) täytetään merivärillä. kirjoita(laatta, rgba) kutsutaan rinnakkain säikeistä; edistyminen laattoina.
        /// </summary>
        public void PiirraKaikki(Action<(int z, int x, int y), byte[]> kirjoita, int ytimia, byte[] meri, Action<int> edistyminen = null)
        {
            var nelj = new System.Collections.Concurrent.ConcurrentDictionary<(int, int, int), byte[]>();
            int tehty = 0;
            foreach (var taso in Laatat.GroupBy(l => l.z).OrderByDescending(g => g.Key))
            {
                var seuraavat = new System.Collections.Concurrent.ConcurrentDictionary<(int, int, int), byte[]>();
                System.Threading.Tasks.Parallel.ForEach(taso, new System.Threading.Tasks.ParallelOptions { MaxDegreeOfParallelism = Math.Max(1, ytimia) }, l =>
                {
                    var rgba = new byte[256 * 256 * 4];
                    var lapset = new byte[4][]; bool kaikki = true;
                    for (int k = 0; k < 4; k++) if (!nelj.TryGetValue((l.z + 1, 2 * l.x + k % 2, 2 * l.y + k / 2), out lapset[k])) kaikki = false;
                    if (kaikki) Kokoa(lapset, rgba);
                    else
                    {
                        Piirra(l.z, l.x, l.y, rgba);
                        for (int k = 0; k < 4; k++) if (lapset[k] != null)
                        {
                            int ox = (k % 2) * 128, oy = (k / 2) * 128;
                            for (int y = 0; y < 128; y++) Buffer.BlockCopy(lapset[k], y * 512, rgba, ((oy + y) * 256 + ox) * 4, 512);
                        }
                    }
                    TaytaMeri(l.z, l.x, l.y, rgba, meri);
                    seuraavat[l] = Puolita(rgba);
                    kirjoita(l, rgba);
                    edistyminen?.Invoke(System.Threading.Interlocked.Increment(ref tehty));
                });
                nelj = seuraavat;
            }
        }

        /// <summary>
        /// Maa vai meri (lat, lon) S2-datattomalle pikselille; null = kaikki datattomat merta (entinen). Maailmakamera (simu
        /// d753d794): rataleveyden reunan datattomat kiilat maalla täyttyivät merenvärillä (sininen kiila Saharassa ja Amazoniassa);
        /// maalla pikseli jää läpinäkyväksi, jolloin alla oleva BMNG näkyy. Kutsutaan rinnakkain (lukufunktio).
        /// </summary>
        public Func<double, double, bool> Maalla;
        const int MaaRuudukko = 16;

        /// <summary>Datattomat (alfa 0) pikselit: meri → merenväri (alfa 254), maa (Maalla) → läpinäkyvä.</summary>
        internal void TaytaMeri(int z, int x, int y, byte[] rgba, byte[] meri)
        {
            bool[] maa = null;
            List<int> aukko = null, meriPikselit = null;
            for (int i = 0; i < rgba.Length; i += 4)
            {
                if (rgba[i + 3] != 0) continue;
                if (Maalla != null)
                {
                    if (maa == null)
                    {
                        maa = new bool[MaaRuudukko * MaaRuudukko];
                        for (int cy = 0; cy < MaaRuudukko; cy++)
                            for (int cx = 0; cx < MaaRuudukko; cx++)
                            {
                                var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, (cx + 0.5) * 256.0 / MaaRuudukko, (cy + 0.5) * 256.0 / MaaRuudukko);
                                maa[cy * MaaRuudukko + cx] = Maalla(la, lo);
                            }
                    }
                    int px = (i / 4) % 256, py = (i / 4) / 256;
                    if (maa[(py * MaaRuudukko / 256) * MaaRuudukko + px * MaaRuudukko / 256]) { (aukko ??= new List<int>()).Add(i / 4); continue; }
                }
                (meriPikselit ??= new List<int>()).Add(i / 4);
            }
            // Ensin maan aukot todellisesta datasta (ei merenvärin täytöstä), sitten meri.
            if (aukko != null) Taydenna(rgba, aukko);
            if (meriPikselit != null)
                foreach (int k in meriPikselit) { int i = k * 4; rgba[i] = meri[0]; rgba[i + 1] = meri[1]; rgba[i + 2] = meri[2]; rgba[i + 3] = 254; }
        }

        /// <summary>
        /// Maan datattomat pikselit (radan välinen kiila) täytetään laatan omasta datasta reunoilta sisäänpäin (diffuusio: naapurien
        /// keskiarvo kierros kerrallaan, enintään TaydennysKierroksia). Simu e9f59947 -laattavedos: Amazonian kiila oli läpinäkyvä,
        /// eikä yksikään varakuva (sama rata) peittänyt sitä; alta näkyvä BMNG oli tumma kiila. Laatta, jossa ei ole dataa, jää
        /// läpinäkyväksi.
        /// </summary>
        public const int TaydennysKierroksia = 256;

        static void Taydenna(byte[] rgba, List<int> aukko)
        {
            var jono = aukko;
            var paivitys = new List<(int i, byte r, byte g, byte b)>();
            for (int k = 0; k < TaydennysKierroksia && jono.Count > 0; k++)
            {
                var seuraava = new List<int>(); paivitys.Clear();
                foreach (int i in jono)
                {
                    int px = i % 256, py = i / 256, n = 0, sr = 0, sg = 0, sb = 0;
                    for (int dy = -1; dy <= 1; dy++)
                        for (int dx = -1; dx <= 1; dx++)
                        {
                            int qx = px + dx, qy = py + dy;
                            if ((dx == 0 && dy == 0) || qx < 0 || qy < 0 || qx > 255 || qy > 255) continue;
                            int o = (qy * 256 + qx) * 4;
                            if (rgba[o + 3] == 0) continue;
                            sr += rgba[o]; sg += rgba[o + 1]; sb += rgba[o + 2]; n++;
                        }
                    if (n > 0) paivitys.Add((i, (byte)(sr / n), (byte)(sg / n), (byte)(sb / n))); else seuraava.Add(i);
                }
                if (paivitys.Count == 0) break;
                foreach (var (i, r, g, b) in paivitys) { int o = i * 4; rgba[o] = r; rgba[o + 1] = g; rgba[o + 2] = b; rgba[o + 3] = 255; }
                jono = seuraava;
            }
        }

        /// <summary>RGBA 256² → neljännes 128² (2 × 2 -keskiarvo) isälaatan koontiin.</summary>
        public static byte[] Puolita(byte[] rgba)
        {
            var o = new byte[128 * 128 * 4];
            for (int y = 0; y < 128; y++) for (int x = 0; x < 128; x++) for (int c = 0; c < 4; c++)
            {
                int a = ((2 * y) * 256 + 2 * x) * 4 + c;
                o[(y * 128 + x) * 4 + c] = (byte)((rgba[a] + rgba[a + 4] + rgba[a + 1024] + rgba[a + 1028] + 2) / 4);
            }
            return o;
        }

        /// <summary>Isälaatta neljästä neljänneksestä (järjestys: vasen ylä, oikea ylä, vasen ala, oikea ala).</summary>
        public static void Kokoa(byte[][] nelj, byte[] rgba)
        {
            for (int k = 0; k < 4; k++)
            {
                int ox = (k % 2) * 128, oy = (k / 2) * 128;
                for (int y = 0; y < 128; y++) Buffer.BlockCopy(nelj[k], y * 128 * 4, rgba, ((oy + y) * 256 + ox) * 4, 128 * 4);
            }
        }

        /// <summary>Laatan tiedostopolku rajatussa jaossa: "{t}/{x'}/{y'}" (Cesiumin {z}/{x}/{reverseY} ei käytössä: y pohjoisesta).</summary>
        public string Polku(int z, int x, int y)
        {
            int t = z - JuuriZ, k = 1 << t;
            return $"{t}/{x - X0 * k}/{y - Y0 * k}";
        }

        /// <summary>Maamaski ruudulle SCL:n karkeimmasta tasosta (puretut laatat, 1 kanava): vesi (6) = 0, muu = 1, sumennus ~8 km.</summary>
        public void LisaaMaamaski(S2Ruutu ruutu, CogOtsake scl, Func<int, int, byte[]> laatta)
        {
            int taso = scl.Tasot.Count - 1; var t = scl.Tasot[taso]; int koko = t.Leveys;
            var maa = new float[koko * koko];
            for (int y = 0; y < koko; y++)
                for (int x = 0; x < koko; x++)
                {
                    var l = laatta(x / t.LaattaL, y / t.LaattaK);
                    byte c = l == null ? (byte)0 : l[(y % t.LaattaK) * t.LaattaL + x % t.LaattaL];
                    maa[y * koko + x] = c == 6 ? 0f : 1f;
                }
            int sade = Math.Max(1, (int)Math.Round(8000 / scl.TasonPikseliM(taso)));
            for (int k = 0; k < 2; k++) { Laatikko(maa, koko, sade, true); Laatikko(maa, koko, sade, false); }
            maamaskit.Add((ruutu, scl, maa, koko));
        }

        static void Laatikko(float[] a, int n, int r, bool vaaka)
        {
            var rivi = new float[n];
            for (int j = 0; j < n; j++)
            {
                double s = 0; int c = 0;
                for (int i = -r; i <= r; i++) { int q = Math.Max(0, Math.Min(n - 1, i)); s += vaaka ? a[j * n + q] : a[q * n + j]; c++; }
                for (int i = 0; i < n; i++)
                {
                    rivi[i] = (float)(s / c);
                    int pois = Math.Max(0, Math.Min(n - 1, i - r)), tulee = Math.Max(0, Math.Min(n - 1, i + r + 1));
                    s += (vaaka ? a[j * n + tulee] : a[tulee * n + j]) - (vaaka ? a[j * n + pois] : a[pois * n + j]);
                }
                for (int i = 0; i < n; i++) { if (vaaka) a[j * n + i] = rivi[i]; else a[i * n + j] = rivi[i]; }
            }
        }

        /// <summary>Maa-osuus pisteessä: ensimmäinen maamaski, jonka ruutu kattaa pisteen; muualla 0 (avomeri, ei S2-ruutua).</summary>
        public double MaaOsuus(double lat, double lon)
        {
            foreach (var (ru, o, maa, koko) in maamaskit)
            {
                if (lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                var (e, n) = Utm.Eteen(lat, lon, ru.Vyohyke);
                double pm = o.TasonPikseliM(o.Tasot.Count - 1);
                int x = (int)((e - o.Ita0) / pm), y = (int)((o.Pohjoinen0 - n) / pm);
                if (x < 0 || y < 0 || x >= koko || y >= koko) continue;
                return maa[y * koko + x];
            }
            return maamaskit.Count == 0 ? 1 : 0;
        }

        /// <summary>Piirtää laatan RGBA:ksi: S2 ja pilvet. Palauttaa peittävät pikselit (0 = ei kirjoiteta).</summary>
        /// <summary>
        /// S2-MOSAIIKKI KAUKOALUEELLE (Päätoimittaja 1.10.: 50 mm ~40 Mt; COG:lla ≥ 100 Mt): Karttasepän s2-eurooppa/v1 on samaa
        /// Web Mercator -jakoa (z6–z10, ~76 m 60° N:ssa, sama sävytys kuin tci_lut), joten lehti z ≤ 10 on suoraan mosaiikin
        /// laatta. Rajattu jako: taso = z − 6, x' = x − 27·2^t, y' = y − 13·2^t (AstronauttiKerros.S2Juuri). Mosaiikki palauttaa
        /// puretun RGBA:n tai null (ei haettu / alueen ulkopuolella → COG).
        /// </summary>
        public Func<int, int, int, byte[]> Mosaiikki;
        public const int MosaiikkiMaxZ = 11, MosaiikkiX0 = 27, MosaiikkiY0 = 13, MosaiikkiKoko = 13;

        /// <summary>
        /// Kuuluuko lehti mosaiikille (z ≤ 11 ja mosaiikin 13 × 13 z6-lohkon sisällä). z11-lehti tehdään z10-isän neljänneksestä
        /// 2 × suurennettuna: lehti on Cesiumin varalta tasoa tarkempi kuin näkymä vaatii (laitekoe 5: 50 mm:n z11-lehdet COG:sta
        /// 193 Mt → mosaiikista ~10 Mt).
        /// </summary>
        public static bool MosaiikinLaatta(int z, int x, int y)
        {
            if (z > MosaiikkiMaxZ || z < JuuriZ) return false;
            if (Euroopassa(z, x, y)) return true;
            // Maailman mosaiikki (S2-maailma v2, juna 145): z11-lehti z10-isästä kuten Euroopassa.
            var m = Maailma;
            return m != null && (z > 10 ? m.Onko(10, x >> 1, y >> 1) : m.Onko(z, x, y));
        }

        /// <summary>Euroopan mosaiikin 13 × 13 z6-lohkossa (s2-eurooppa/{Laattapalvelin.S2EuroopanVersio}).</summary>
        public static bool Euroopassa(int z, int x, int y)
        {
            if (z < JuuriZ) return false;
            int k = 1 << (z - JuuriZ), bx = x / k, by = y / k;
            return bx >= MosaiikkiX0 && bx < MosaiikkiX0 + MosaiikkiKoko && by >= MosaiikkiY0 && by < MosaiikkiY0 + MosaiikkiKoko;
        }

        /// <summary>S2-maailma v2:n saatavuus (laatat.json; null = vain Eurooppa kuten ennen, myös hakuvirheessä).</summary>
        public static volatile S2MaailmaLaatat Maailma;

        /// <summary>Lähdelaatan (z ≤ 10) täysi osoite: Euroopassa v1:n rajattu jako, muualla maailman v2.</summary>
        public static string MosaiikinOsoite(string euroopanJuuri, int z, int x, int y)
            => Euroopassa(z, x, y) ? euroopanJuuri + MosaiikinPolku(z, x, y)
             : $"{(Maailma != null && Maailma.Korjattu(z, x, y) ? S2MaailmaLaatat.KorjausJuuri : S2MaailmaLaatat.Juuri)}{z}/{x}/{y}.jpg";

        /// <summary>Mosaiikin suhteellinen polku "{t}/{x'}/{y'}.jpg".</summary>
        public static string MosaiikinPolku(int z, int x, int y)
        {
            int t = z - JuuriZ, k = 1 << t;
            return $"{t}/{x - MosaiikkiX0 * k}/{y - MosaiikkiY0 * k}.jpg";
        }

        /// <summary>
        /// Pilvet valmiin laatan päälle pikseleittäin (kuvauspaikat, Päätoimittaja 5.10.: GIBS-pilvet myös Helsinkiin): sama
        /// sekoitus kuin Piirra (varjo pohjaan, pilvi 246 · kirkkaus lämpimällä sävyllä). pintaRajaa: valkoinen pinta ei saa pilveä.
        /// </summary>
        public static void PiirraPilvet(IKuvanPilvet pilvet, int z, int x, int y, byte[] rgba, bool pintaRajaa)
        {
            var (laK, _) = Uudelleenprojisointi.Pikseli(z, x, y, 128, 128);
            double pm = Uudelleenprojisointi.PikseliM(z, laK);
            for (int py = 0; py < 256; py++)
                for (int px = 0; px < 256; px++)
                {
                    int o = (py * 256 + px) * 4;
                    if (rgba[o + 3] == 0) continue;
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, px + 0.5, py + 0.5);
                    var (a, k, v) = pilvet.Nayte(la, lo);
                    if (a <= 0.002 && v <= 0.002) continue;
                    if (a > 0.002) (a, k) = pilvet.Lahi(la, lo, 1, pm);   // terävä reuna ja aurinkopuoli
                    if (pintaRajaa) { double pv = GibsPilvet.MaskiAlfa(rgba[o], rgba[o + 1], rgba[o + 2]); a *= 1 - pv; v *= 1 - pv; }
                    for (int c = 0; c < 3; c++)
                    {
                        double pohja = rgba[o + c] * (1 - v), pilvi = 246 * k * (c == 0 ? 1 : c == 1 ? 0.975 : 0.94);
                        rgba[o + c] = (byte)Math.Min(255, pohja * (1 - a) + pilvi * a + 0.5);
                    }
                }
        }

        public int Piirra(int z, int x, int y, byte[] rgba)
        {
            var m = Mosaiikki != null && MosaiikinLaatta(z, x, y) ? Mosaiikki(z, x, y) : null;
            int peitto;
            if (m != null) { Buffer.BlockCopy(m, 0, rgba, 0, 256 * 256 * 4); peitto = 256 * 256; }
            else peitto = Uudelleenprojisointi.Laatta(Data, z, x, y, rgba);
            if (Pilvet == null) return peitto;
            const int G = 32; var a = new float[(G + 1) * (G + 1)]; var kk = new float[a.Length]; var v = new float[a.Length]; var sv = new float[a.Length];
            for (int j = 0; j <= G; j++)
                for (int i = 0; i <= G; i++)
                {
                    var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, i * 256.0 / G, j * 256.0 / G);
                    double pK = PeittoK(la, lo);
                    var (pa, pk, pv) = Pilvet.Nayte(la, lo, pK);
                    int q = j * (G + 1) + i; a[q] = (float)pa; kk[q] = (float)pk; v[q] = (float)pv;
                    double t = Math.Max(0, Math.Min(1, (pK - 1.0) / 0.85)); sv[q] = (float)(MaanSini * t * t * (3 - 2 * t));
                    if (AurinkoEcef is var (sx, sy, sz))
                    {
                        double fl = la * Math.PI / 180, ll = lo * Math.PI / 180;
                        double sinK = Math.Cos(fl) * Math.Cos(ll) * sx + Math.Cos(fl) * Math.Sin(ll) * sy + Math.Sin(fl) * sz;
                        double yo = Math.Max(0, Math.Min(1, (sinK + 0.139) / 0.087)); yo = yo * yo * (3 - 2 * yo);   // −8° … −3°
                        a[q] *= (float)yo; v[q] *= (float)yo;
                    }
                }
            var (laK, _) = Uudelleenprojisointi.Pikseli(z, x, y, 128, 128);
            double pm = Uudelleenprojisointi.PikseliM(z, laK);
            bool lahi = pm <= 40 || Pilvet is GibsPilvet;   // 400 mm ja GIBS-pilvet: reunat pikselikohtaisesti
            float haivytys = 1f;
            for (int py = 0; py < 256; py++)
                for (int px = 0; px < 256; px++)
                {
                    int o = (py * 256 + px) * 4;
                    if (rgba[o + 3] == 0) continue;   // ei S2-dataa: alempi kerros näkyy, pilviä ei (avomeri)
                    float gx = px * G / 256f, gy = py * G / 256f; int ix = Math.Min(G - 1, (int)gx), iy = Math.Min(G - 1, (int)gy);
                    float tx = gx - ix, ty = gy - iy;
                    float H(float[] f) { int q = iy * (G + 1) + ix; return (f[q] * (1 - tx) + f[q + 1] * tx) * (1 - ty) + (f[q + G + 1] * (1 - tx) + f[q + G + 2] * tx) * ty; }
                    float al, ki, va = H(v) * haivytys;
                    if (lahi) { var (la, lo) = Uudelleenprojisointi.Pikseli(z, x, y, px + 0.5, py + 0.5); var (pa, pk) = Pilvet.Lahi(la, lo, PeittoK(la, lo), pm); al = (float)pa; ki = (float)pk; }
                    else { al = H(a); ki = H(kk); }
                    al *= haivytys;
                    if (PintaRajaaPilvet && al > 0) { double pv = GibsPilvet.MaskiAlfa(rgba[o], rgba[o + 1], rgba[o + 2]); al *= (float)(1 - pv); va *= (float)(1 - pv); }
                    float si = MaanSini > 0 ? Math.Min(1f, H(sv)) : 0f;
                    if (si > 0)
                    {
                        // syvä sininen: punainen ja vihreä vaimenevat, sininen nousee pohjan kirkkauden mukaan (tummat pinnat tummansinisiksi)
                        float r0 = rgba[o], g0 = rgba[o + 1], b0 = rgba[o + 2], lum = 0.3f * r0 + 0.55f * g0 + 0.15f * b0;
                        rgba[o] = (byte)(r0 * (1 - 0.55f * si) + 0.5f);
                        rgba[o + 1] = (byte)(g0 * (1 - 0.30f * si) + 0.5f);
                        rgba[o + 2] = (byte)Math.Min(255f, b0 * (1 - 0.2f * si) + (lum * 0.9f + 18f) * si + 0.5f);
                    }
                    for (int c = 0; c < 3; c++)
                    {
                        float pohja = rgba[o + c] * (1 - va), pilvi = 246f * ki * (c == 0 ? 1f : c == 1 ? 0.975f : 0.94f);
                        rgba[o + c] = (byte)Math.Min(255, pohja * (1 - al) + pilvi * al + 0.5f);
                    }
                }
            return peitto;
        }
    }
}
