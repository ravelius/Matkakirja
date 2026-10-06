// ISS-KAMERA: puretut Sentinel-2-COG-laatat (UTM) → Web Mercator -laatta (z, x, y), jonka AstronauttiKerroksen pinta
// (paikka 2, rajattu jako) piirtää kuten Helsingin esimerkkikuvan laatat. Näin laukaisun kuva saa saman ilmakehän,
// sävytyksen, filmin ja siluetin kuin livenäkymä; vain pinnan data vaihtuu 10–160 m:n S2:ksi.
//
//   taso      laatan pikselikoko (m) valitsee COG-tason; puuttuva laatta → seuraava karkeampi haettu taso
//   nayte     bilineaarinen, TCI-tavu → Karttasepän tci_lut (mosaiikin sävytys)
//   nodata    TCI 0,0,0 = ei dataa → seuraava ruutu (päällekkäiset S2-ruudut), lopulta läpinäkyvä (alfa 0)
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.IssKamera
{
    /// <summary>
    /// Laukaisun data: ruutujen otsakkeet ja laatat. Laatat ovat joko valmiiksi purettuina (Laatat, RGB LaattaL × LaattaK × 3)
    /// tai pakattuina (Pakatut), jolloin ne puretaan tarvittaessa rajattuun välimuistiin (laitekoe 1.10.: 50 mm:n kuvassa 877
    /// laattaa = ~0,7 Gt purettuna, ~80 Mt pakattuina). Säieturvallinen piirrolle rinnakkain.
    /// </summary>
    public sealed class KuvaData
    {
        public readonly List<(S2Ruutu ruutu, CogOtsake otsake)> Ruudut = new List<(S2Ruutu, CogOtsake)>();
        public readonly Dictionary<(string tunnus, int taso, int tx, int ty), byte[]> Laatat = new Dictionary<(string, int, int, int), byte[]>();
        public readonly System.Collections.Concurrent.ConcurrentDictionary<(string tunnus, int taso, int tx, int ty), (CogTaso taso, byte[] pakattu)> Pakatut =
            new System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), (CogTaso, byte[])>();
        /// <summary>Purettujen välimuistin katto tavuina (ylitys tyhjentää välimuistin; käytössä olevat taulukot säilyvät kutsujilla).</summary>
        public long Valimuistikatto = 200L * 1024 * 1024;
        readonly System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), byte[]> purettu =
            new System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), byte[]>();
        long purettuTavut;
        /// <summary>TCI-tavu → näyttötavu (256 arvoa); null = sellaisenaan.</summary>
        public byte[] Lut;
        /// <summary>
        /// SCL-otsakkeet ruuduittain (tunnus → otsake); SCL-laatat Pakatut-taulussa avaimella ("&lt;tunnus&gt;|scl", taso, tx, ty).
        /// Pilvimaski (Päätoimittaja 1.10.: S2:n omat kumpupilvet maahan painettuina läikkinä): luokat 3 (pilven varjo), 8, 9
        /// (pilvi) ja 10 (ohut cirrus) ohitetaan, jolloin pikseli tulee seuraavasta ruudusta tai varakuvasta.
        /// </summary>
        public readonly Dictionary<string, CogOtsake> Scl = new Dictionary<string, CogOtsake>();

        /// <summary>
        /// Vesipikselien tasoitus merenväriin (0 = pois): Ateenan julisteessa (8648c410) eri päivien S2-ruutujen meri (aallokko,
        /// kiilto, sameus) erottui suorina ruuturajoina. SCL-luokan 6 (vesi) pikseli sekoitetaan Meri-väriin (TCI ennen lutia).
        /// </summary>
        public double VesiTasoitus;
        public byte[] Meri = { 14, 22, 30 };
        /// <summary>
        /// Lopullinen merenväri ruudun lutin jälkeen (null = lut(Meri)). Simu f7310e55 (Kanaria): s2-eurooppa/v1-mosaiikin avomeri
        /// on kiinteä (48,64,85), COG:n meri lutin läpi (57,72,84) → suora sauma mosaiikin eteläreunassa (31,95° N). Vesipikselin
        /// poikkeama säilyy lutin kautta: ulos = MeriUlos + lut(Meri + poikkeama) − lut(Meri).
        /// </summary>
        public byte[] MeriUlos;
        /// <summary>
        /// Maa-osuus pisteessä (KuvanTyosto.MaaOsuus, SCL-maamaski ~8 km:n sumennuksella); null = poikkeama kaikkialla. Simu 55448455
        /// (Kanaria v2c): avomeren COG-vedessä aallokko ja kiilto jäivät 25 %:n poikkeamana, ja tasaisen mosaiikkimeren rajalle tuli
        /// pystyraja. Poikkeama jää vain rannikolle (maa-osuus 0,02 → 0,15), avomeri on merenväri kuten mosaiikissa.
        /// </summary>
        public Func<double, double, double> MaaLahella;

        /// <summary>Onko UTM-pisteessä (e, n) ruudun SCL:n mukaan pilvi tai pilven varjo (ei haettu → ei).</summary>
        public bool Pilvinen(string tunnus, int vyohyke, double e, double n, double metria)
        {
            byte c = SclLuokka(tunnus, e, n, metria);
            return c == 3 || c == 8 || c == 9 || c == 10;
        }

        /// <summary>SCL-luokka UTM-pisteessä (e, n); 255 = ei haettu.</summary>
        public byte SclLuokka(string tunnus, double e, double n, double metria)
        {
            if (!Scl.TryGetValue(tunnus, out var o)) return 255;
            int taso = o.TasoResoluutiolle(metria);
            var t = o.Tasot[taso]; double pm = o.TasonPikseliM(taso);
            int x = (int)((e - o.Ita0) / pm), y = (int)((o.Pohjoinen0 - n) / pm);
            if (x < 0 || y < 0 || x >= t.Leveys || y >= t.Korkeus) return 255;
            for (int tt = taso; tt < o.Tasot.Count; tt++)
            {
                var tn = o.Tasot[tt]; double pn = o.TasonPikseliM(tt);
                int xx = (int)((e - o.Ita0) / pn), yy = (int)((o.Pohjoinen0 - n) / pn);
                var l = Hae((tunnus + "|scl", tt, xx / tn.LaattaL, yy / tn.LaattaK));
                if (l == null) continue;
                return l[(yy % tn.LaattaK) * tn.LaattaL + xx % tn.LaattaL];
            }
            return 255;
        }

        /// <summary>Kaikki laatat ja välimuisti pois (kuvan työstön jälkeen; iPad-mittaus 2.10.).</summary>
        public void Vapauta()
        {
            Laatat.Clear(); Pakatut.Clear(); purettu.Clear(); System.Threading.Interlocked.Exchange(ref purettuTavut, 0);
        }

        /// <summary>Onko puretussa laatassa nodataa (radan reunan syövytys tarkistaa kehän vain näiden lähellä).</summary>
        public readonly System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), bool> NodataLaatat =
            new System.Collections.Concurrent.ConcurrentDictionary<(string, int, int, int), bool>();

        /// <summary>Purettu laatta tai null (ei haettu).</summary>
        public byte[] Hae((string tunnus, int taso, int tx, int ty) avain)
        {
            if (Laatat.TryGetValue(avain, out var l)) return l;
            if (purettu.TryGetValue(avain, out l)) return l;
            if (!Pakatut.TryGetValue(avain, out var p)) return null;
            l = CogOtsake.PuraLaatta(p.taso, p.pakattu);
            if (System.Threading.Interlocked.Add(ref purettuTavut, l.Length) > Valimuistikatto)
            {
                purettu.Clear(); System.Threading.Interlocked.Exchange(ref purettuTavut, l.Length);
            }
            purettu[avain] = l;
            return l;
        }
    }

    public static class Uudelleenprojisointi
    {
        const double R = 6378137.0;

        /// <summary>Web Mercator -laatan pikselin keskipisteen leveys ja pituus.</summary>
        public static (double lat, double lon) Pikseli(int z, int x, int y, double px, double py)
        {
            double n = 256.0 * (1 << z), gx = x * 256.0 + px, gy = y * 256.0 + py;
            double lon = gx / n * 360 - 180;
            double lat = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * gy / n))) * 180 / Math.PI;
            return (lat, lon);
        }

        /// <summary>Laatan pikselin koko maassa (m) leveydellä lat.</summary>
        public static double PikseliM(int z, double lat) => 2 * Math.PI * R / (256.0 * (1 << z)) * Math.Cos(lat * Math.PI / 180);

        /// <summary>
        /// Piirtää laatan RGBA-tavuiksi (256 × 256 × 4, rivi 0 = pohjoinen). Palauttaa peittävien pikselien määrän
        /// (0 = laatalle ei dataa, kutsuja voi jättää tiedoston kirjoittamatta).
        /// </summary>
        public static int Laatta(KuvaData d, int z, int x, int y, byte[] ulos)
        {
            if (ulos.Length < 256 * 256 * 4) throw new ArgumentException("ulos");
            Array.Clear(ulos, 0, 256 * 256 * 4);
            var (lat0, _) = Pikseli(z, x, y, 128, 128);
            double m = PikseliM(z, lat0);
            int peitto = 0;
            for (int py = 0; py < 256; py++)
                for (int px = 0; px < 256; px++)
                {
                    var (lat, lon) = Pikseli(z, x, y, px + 0.5, py + 0.5);
                    if (!Nayte(d, lat, lon, m, out byte r, out byte g, out byte b)) continue;
                    int i = (py * 256 + px) * 4;
                    if (d.Lut != null) { r = d.Lut[r]; g = d.Lut[g]; b = d.Lut[b]; }
                    ulos[i] = r; ulos[i + 1] = g; ulos[i + 2] = b; ulos[i + 3] = 255; peitto++;
                }
            return peitto;
        }

        /// <summary>S2-ruutujen limitys (109,8 km ruutu, 100 km ruudukko): saumasekoituksen ramppi ruudun reunasta.</summary>
        public const double SaumaM = 9800;

        /// <summary>Bilineaarinen näyte ensimmäisestä ruudusta, jolla on dataa pisteessä (karkein riittävä haettu taso).</summary>
        public static bool Nayte(KuvaData d, double lat, double lon, double metria, out byte r, out byte g, out byte b)
        {
            // Tarkin haettu taso voittaa: tasot tarkimmasta karkeimpaan, jokaisella kaikki ruudut järjestyksessä (laitekoe 4:
            // ruutu kerrallaan -silmukka otti edellisen ruudun karkean tason toisen lehden haun jäljiltä → laatan muotoisia
            // eri tarkkuuden ja eri päivän kaistoja). Nodata (0,0,0) → seuraava ruutu samalla tasolla. Päällekkäiset ruudut
            // sekoitetaan reunalla painoin (saumapehmennys, eri päivien kuvat).
            r = g = b = 0;
            int lkm = d.Ruudut.Count, tasoja = 0;
            for (int k = 0; k < lkm; k++) tasoja = Math.Max(tasoja, d.Ruudut[k].otsake.Tasot.Count);
            int alku = int.MaxValue;
            for (int k = 0; k < lkm; k++)
            {
                var (ru, o) = d.Ruudut[k];
                if (lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                alku = Math.Min(alku, o.TasoResoluutiolle(metria));
            }
            if (alku == int.MaxValue) return false;
            (double e, double n)[] utm = null;
            double sr = 0, sg = 0, sb = 0, summa = 0;
            for (int taso = alku; taso < tasoja; taso++)
            {
                int valinnat = int.MaxValue;   // pienin valinta, jolla tällä tasolla on jo dataa
                for (int k = 0; k < lkm; k++)
                {
                    var (ru, o) = d.Ruudut[k];
                    if (ru.Valinta > valinnat) continue;   // varakuva vain, kun paremmalla valinnalla ei ole dataa
                    if (taso >= o.Tasot.Count || lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) continue;
                    utm ??= new (double, double)[lkm];
                    if (utm[k].e == 0 && utm[k].n == 0) utm[k] = Utm.Eteen(lat, lon, ru.Vyohyke);
                    var (e, n) = utm[k];
                    double pm = o.TasonPikseliM(taso);
                    double fx = (e - o.Ita0) / pm - 0.5, fy = (o.Pohjoinen0 - n) / pm - 0.5;
                    var t = o.Tasot[taso];
                    if (fx < 0 || fy < 0 || fx >= t.Leveys - 1 || fy >= t.Korkeus - 1) continue;   // ruudun ulkopuolella
                    int ix = (int)fx, iy = (int)fy; double ax = fx - ix, ay = fy - iy;
                    if (!Pikselit(d, ru.Tunnus, t, taso, ix, iy, out var p00, out var p10, out var p01, out var p11)) continue;   // ei haettu
                    if (Musta(p00) || Musta(p10) || Musta(p01) || Musta(p11)) continue;   // nodata (myös reunapikseli)
                    if (ru.Nodata > 0 && RadanReunalla(d, ru.Tunnus, t, taso, ix, iy)) continue;   // yleiskuvatason tumma reunapikseli
                    byte luokka = d.SclLuokka(ru.Tunnus, e, n, pm);
                    if (luokka == 3 || luokka == 8 || luokka == 9 || luokka == 10) continue;   // S2:n oma pilvi tai sen varjo → seuraava / varakuva
                    double cr = (p00.r * (1 - ax) + p10.r * ax) * (1 - ay) + (p01.r * (1 - ax) + p11.r * ax) * ay;
                    double cg = (p00.g * (1 - ax) + p10.g * ax) * (1 - ay) + (p01.g * (1 - ax) + p11.g * ax) * ay;
                    double cb = (p00.b * (1 - ax) + p10.b * ax) * (1 - ay) + (p01.b * (1 - ax) + p11.b * ax) * ay;
                    if (ru.Vahvistus != null) { cr *= ru.Vahvistus[0]; cg *= ru.Vahvistus[1]; cb *= ru.Vahvistus[2]; }
                    if (ru.Siirto != null) { cr += ru.Siirto[0]; cg += ru.Siirto[1]; cb += ru.Siirto[2]; }
                    cr = Math.Max(0, cr - ru.UsvaR); cg = Math.Max(0, cg - ru.UsvaG); cb = Math.Max(0, cb - ru.UsvaB);
                    bool vesi = luokka == 6 && d.VesiTasoitus > 0;
                    if (vesi)
                    {
                        // Ruudun oma vesitaso (TasaaVesi) merenväriin, vain poikkeama siitä jää; ilman vesitasoa poikkeama merenväristä.
                        double w = d.VesiTasoitus;
                        double vr = d.Meri[0], vg = d.Meri[1], vb = d.Meri[2];
                        if (ru.VesiTaso != null)
                        {
                            vr = Math.Max(0, ru.VesiTasoPisteessa(0, e, n) - ru.UsvaR); vg = Math.Max(0, ru.VesiTasoPisteessa(1, e, n) - ru.UsvaG);
                            vb = Math.Max(0, ru.VesiTasoPisteessa(2, e, n) - ru.UsvaB);
                        }
                        double jaa = 1 - w;
                        if (d.MaaLahella != null) { double mo = d.MaaLahella(lat, lon), tm = Math.Max(0, Math.Min(1, (mo - 0.02) / 0.13)); jaa *= tm * tm * (3 - 2 * tm); }
                        cr = Math.Max(0, d.Meri[0] + (cr - vr) * jaa); cg = Math.Max(0, d.Meri[1] + (cg - vg) * jaa); cb = Math.Max(0, d.Meri[2] + (cb - vb) * jaa);
                    }
                    // Maailman indeksi: ruudun alueen oma lut ennen saumasekoitusta (Laatta ei silloin sovella KuvaData.Lutia).
                    if (ru.Lut != null)
                    {
                        cr = Lutilla(ru.Lut, cr); cg = Lutilla(ru.Lut, cg); cb = Lutilla(ru.Lut, cb);
                        if (vesi && d.MeriUlos != null)
                        {
                            cr += d.MeriUlos[0] - Lutilla(ru.Lut, d.Meri[0]); cg += d.MeriUlos[1] - Lutilla(ru.Lut, d.Meri[1]); cb += d.MeriUlos[2] - Lutilla(ru.Lut, d.Meri[2]);
                            cr = Math.Max(0, cr); cg = Math.Max(0, cg); cb = Math.Max(0, cb);
                        }
                    }
                    // Saumapehmennys: ristihäivytys koko S2-limityksen (SaumaM) yli, paino kasvaa ruudun UTM-reunasta sisään.
                    // Simu d26351c2 (Coloradon suisto): 4 km:n rampilla ja "ensimmäinen voittaa" -säännöllä 2022- ja 2023-kuvien
                    // limityskaista näkyi vuoroveden tasankojen poikki vaaleana suorareunaisena kaistana.
                    double koko = o.Tasot[0].Leveys * o.PikseliM;
                    double reuna = Math.Min(Math.Min(e - o.Ita0, o.Ita0 + koko - e), Math.Min(o.Pohjoinen0 - n, n - (o.Pohjoinen0 - koko)));
                    double paino = Math.Max(0.02, Math.Min(1, reuna / SaumaM));
                    sr += cr * paino; sg += cg * paino; sb += cb * paino; summa += paino;
                    valinnat = Math.Min(valinnat, ru.Valinta);
                }
                if (summa > 0) break;   // tällä tasolla dataa: ei karkeampaa
            }
            if (summa <= 0) return false;
            r = (byte)Math.Min(255, Math.Round(sr / summa)); g = (byte)Math.Min(255, Math.Round(sg / summa)); b = (byte)Math.Min(255, Math.Round(sb / summa));
            return true;
        }

        /// <summary>
        /// USVATASOITUS limityksistä (simu d753d794 Amazonia: eri päivien ruudut sameina lohkoina; simu 26f1141e Coloradon suisto:
        /// tummimman prosentin vertailu luki 11RQQ:n meren "usvattomaksi" ja tummensi naapurit −40:llä → 11RQQ:n maa vaaleana
        /// kaistana). Ruutuparit verrataan SAMAAN maahan: parin bbox-leikkauksen ruudukossa kummankin oma arvo (tarkin haettu taso,
        /// nodata, pilvi, varjo ja vesi pois), mediaanierotus kanavittain. Erotuksista ruutukohtaiset siirrot painotetulla
        /// pienimmällä neliösummalla, pienin siirto 0 (vähiten usvaa) ja enintään MaxUsva. Ruutu ilman vertailuparia jää ennalleen.
        /// Palauttaa (tunnus, vähennys) kirjausta varten.
        /// </summary>
        public static List<(string tunnus, double r, double g, double b)> TasaaUsva(KuvaData d, int ruudukko = 48, int vahintaan = 150)
        {
            int n = d.Ruudut.Count;
            var parit = new List<(int a, int b, double w, double r, double g, double bl)>();
            for (int a = 0; a < n; a++)
                for (int b = a + 1; b < n; b++)
                {
                    var (ra, oa) = d.Ruudut[a]; var (rb, ob) = d.Ruudut[b];
                    if (oa == null || ob == null) continue;
                    double w = Math.Max(ra.W, rb.W), e = Math.Min(ra.E, rb.E), s = Math.Max(ra.S, rb.S), no = Math.Min(ra.N, rb.N);
                    if (w >= e || s >= no) continue;
                    var dr = new List<double>(); var dg = new List<double>(); var db = new List<double>();
                    for (int i = 0; i < ruudukko; i++)
                        for (int j = 0; j < ruudukko; j++)
                        {
                            double la = s + (no - s) * (i + 0.5) / ruudukko, lo = w + (e - w) * (j + 0.5) / ruudukko;
                            if (!RuudunArvo(d, a, la, lo, out var pa) || !RuudunArvo(d, b, la, lo, out var pb)) continue;
                            dr.Add(pa.r - pb.r); dg.Add(pa.g - pb.g); db.Add(pa.b - pb.b);
                        }
                    if (dr.Count < vahintaan) continue;
                    parit.Add((a, b, dr.Count, Mediaani(dr), Mediaani(dg), Mediaani(db)));
                }
            var tulos = new List<(string, double, double, double)>();
            if (parit.Count == 0) return tulos;
            var mukana = new bool[n];
            foreach (var p in parit) { mukana[p.a] = true; mukana[p.b] = true; }
            var siirto = new double[3][];
            for (int c = 0; c < 3; c++)
            {
                // Gauss–Seidel: siirto[a] − siirto[b] ≈ erotus(a − b), parin paino = yhteisten näytteiden määrä.
                var o = new double[n];
                for (int kierros = 0; kierros < 400; kierros++)
                    for (int k = 0; k < n; k++)
                    {
                        if (!mukana[k]) continue;
                        double sw = 0, sx = 0;
                        foreach (var p in parit)
                        {
                            double ero = c == 0 ? p.r : c == 1 ? p.g : p.bl;
                            if (p.a == k) { sw += p.w; sx += p.w * (o[p.b] + ero); }
                            else if (p.b == k) { sw += p.w; sx += p.w * (o[p.a] - ero); }
                        }
                        if (sw > 0) o[k] = sx / sw;
                    }
                // Yhtenäinen osa kerrallaan ei ole tarpeen: pienin mukana oleva siirto 0 (erilliset osat saavat saman nollakohdan).
                double min = double.MaxValue;
                for (int k = 0; k < n; k++) if (mukana[k]) min = Math.Min(min, o[k]);
                for (int k = 0; k < n; k++) o[k] = mukana[k] ? Math.Min(MaxUsva, o[k] - min) : 0;
                siirto[c] = o;
            }
            for (int k = 0; k < n; k++)
            {
                if (!mukana[k]) continue;
                var ru = d.Ruudut[k].ruutu;
                ru.UsvaR = siirto[0][k]; ru.UsvaG = siirto[1][k]; ru.UsvaB = siirto[2][k];
                tulos.Add((ru.Tunnus, ru.UsvaR, ru.UsvaG, ru.UsvaB));
            }
            return tulos;
        }

        /// <summary>
        /// VESITASO ruuduittain (simu 10c31692 Kanaria 28SCA: avomerellä suorat saumat). Kaikki meri on SCL:ssä vettä (6), mutta
        /// auringon heijastuksen päivinä (28SBA 2025-06-13, 28SCB 2023-06-27) meren mediaani on 40–50 yksikköä kirkkaampi kuin
        /// 13.8.2023 ruuduissa, ja 0,75:n tasoitus merenväriin jätti erosta neljänneksen suoriksi saumoiksi. Ruudun oman meren
        /// mediaani (ruudukko bbox:n yli, tarkin haettu taso) tasoitetaan merenväriin, ja vain poikkeama siitä (rannikon matala
        /// vesi, heijastuksen loiva liuku) jää VesiTasoitus-painolla. Ruutu, jolla on alle `vahintaan` vesinäytettä, jää ennalleen.
        /// </summary>
        public static List<(string tunnus, double r, double g, double b)> TasaaVesi(KuvaData d, int ruudukko = 48, int vahintaan = 150)
        {
            var tulos = new List<(string, double, double, double)>();
            for (int k = 0; k < d.Ruudut.Count; k++)
            {
                var (ru, o) = d.Ruudut[k];
                ru.VesiTaso = null; ru.VesiKalte = null;
                if (o == null) continue;
                var vr = new List<double>(); var vg = new List<double>(); var vb = new List<double>();
                var ve = new List<double>(); var vn = new List<double>();
                // Tiheämpi otanta, jos ruudusta on haettu vain kulma (simu d9221669 Kanaria: 28SCB:n sunglint-meri jäi
                // vesitasotta, koska 48 × 48 -ruudukkoon osui alle 150 haettua vesinäytettä → kirkas suorareunainen kiila).
                foreach (int n in new[] { ruudukko, ruudukko * 4 })
                {
                    vr.Clear(); vg.Clear(); vb.Clear(); ve.Clear(); vn.Clear();
                    for (int i = 0; i < n; i++)
                        for (int j = 0; j < n; j++)
                        {
                            double la = ru.S + (ru.N - ru.S) * (i + 0.5) / n, lo = ru.W + (ru.E - ru.W) * (j + 0.5) / n;
                            if (!RuudunArvo(d, k, la, lo, out var p, vesi: true)) continue;
                            vr.Add(p.r); vg.Add(p.g); vb.Add(p.b);
                            var (pe, pn) = Utm.Eteen(la, lo, ru.Vyohyke); ve.Add(pe); vn.Add(pn);
                        }
                    if (vr.Count >= vahintaan) break;
                }
                if (vr.Count < vahintaan) continue;
                ru.VesiTaso = new[] { Mediaani(new List<double>(vr)), Mediaani(new List<double>(vg)), Mediaani(new List<double>(vb)) };
                SovitaVesitaso(ru, ve, vn, vr, vg, vb);
                tulos.Add((ru.Tunnus, ru.VesiTaso[0], ru.VesiTaso[1], ru.VesiTaso[2]));
            }
            return tulos;
        }

        /// <summary>
        /// Vesitaso tasona (simu 025565c2 Kanaria: 28SBA:n sunglint kirkastuu ruudun sisällä itään 66 → 132; mediaanin jälkeen
        /// 25 %:n jäännös jätti +10 tavun portaan suoralle ruuturajalle). Pienin neliösumma v = a + gE·(e − e0) + gN·(n − n0)
        /// kanavittain, kahdesti: toisella kierroksella pois näytteet, joiden jäännös > 3σ (MAD; matala rannikkovesi, kiilto).
        /// Ilman kunnollista hajontaa (kapea kaista) jää mediaani.
        /// </summary>
        static void SovitaVesitaso(S2Ruutu ru, List<double> ve, List<double> vn, List<double> vr, List<double> vg, List<double> vb)
        {
            int m = ve.Count;
            double e0 = 0, n0 = 0;
            for (int i = 0; i < m; i++) { e0 += ve[i]; n0 += vn[i]; }
            e0 /= m; n0 /= m;
            var mukana = new bool[m]; for (int i = 0; i < m; i++) mukana[i] = true;
            var kanavat = new[] { vr, vg, vb };
            double[] a = null, gE = null, gN = null;
            for (int kierros = 0; kierros < 2; kierros++)
            {
                double s1 = 0, se = 0, sn = 0, see = 0, snn = 0, sen = 0;
                for (int i = 0; i < m; i++)
                {
                    if (!mukana[i]) continue;
                    double de = ve[i] - e0, dn = vn[i] - n0;
                    s1++; se += de; sn += dn; see += de * de; snn += dn * dn; sen += de * dn;
                }
                double det = s1 * (see * snn - sen * sen) - se * (se * snn - sen * sn) + sn * (se * sen - see * sn);
                if (s1 < 30 || Math.Abs(det) < 1e-6 * Math.Max(1, s1 * see * snn)) return;   // kapea kaista: mediaani
                a = new double[3]; gE = new double[3]; gN = new double[3];
                for (int c = 0; c < 3; c++)
                {
                    double y = 0, ye = 0, yn = 0;
                    for (int i = 0; i < m; i++)
                    {
                        if (!mukana[i]) continue;
                        double v = kanavat[c][i], de = ve[i] - e0, dn = vn[i] - n0;
                        y += v; ye += v * de; yn += v * dn;
                    }
                    // Cramer: [[s1, se, sn], [se, see, sen], [sn, sen, snn]] · [a, gE, gN] = [y, ye, yn]
                    a[c] = (y * (see * snn - sen * sen) - se * (ye * snn - sen * yn) + sn * (ye * sen - see * yn)) / det;
                    gE[c] = (s1 * (ye * snn - sen * yn) - y * (se * snn - sen * sn) + sn * (se * yn - ye * sn)) / det;
                    gN[c] = (s1 * (see * yn - ye * sen) - se * (se * yn - ye * sn) + y * (se * sen - see * sn)) / det;
                }
                if (kierros == 1) break;
                var jaannos = new List<double>(m);
                var j = new double[m];
                for (int i = 0; i < m; i++)
                {
                    double de = ve[i] - e0, dn = vn[i] - n0, summa = 0;
                    for (int c = 0; c < 3; c++) summa += Math.Abs(kanavat[c][i] - (a[c] + gE[c] * de + gN[c] * dn));
                    j[i] = summa; jaannos.Add(summa);
                }
                double raja = Math.Max(6, 3 * 1.4826 * Mediaani(jaannos));
                for (int i = 0; i < m; i++) mukana[i] = j[i] <= raja;
            }
            ru.VesiTaso = a; ru.VesiKalte = new[] { gE[0], gE[1], gE[2], gN[0], gN[1], gN[2] }; ru.VesiE0 = e0; ru.VesiN0 = n0;
        }

        static double Mediaani(List<double> x) { x.Sort(); return x.Count % 2 == 1 ? x[x.Count / 2] : (x[x.Count / 2 - 1] + x[x.Count / 2]) / 2; }

        /// <summary>
        /// Ruudun k oma arvo pisteessä tarkimmalta haetulta tasolta (ei lutia, ei usvaa); nodata, pilvi, varjo ja vesi → false.
        /// vesi: vain vesi (SCL 6) kelpaa.
        /// </summary>
        static bool RuudunArvo(KuvaData d, int k, double lat, double lon, out (double r, double g, double b) p, bool vesi = false)
        {
            p = default;
            var (ru, o) = d.Ruudut[k];
            if (lon < ru.W || lon > ru.E || lat < ru.S || lat > ru.N) return false;
            var (e, n) = Utm.Eteen(lat, lon, ru.Vyohyke);
            for (int taso = 0; taso < o.Tasot.Count; taso++)
            {
                double pm = o.TasonPikseliM(taso);
                double fx = (e - o.Ita0) / pm - 0.5, fy = (o.Pohjoinen0 - n) / pm - 0.5;
                var t = o.Tasot[taso];
                if (fx < 0 || fy < 0 || fx >= t.Leveys - 1 || fy >= t.Korkeus - 1) return false;
                int ix = (int)fx, iy = (int)fy;
                if (!Pikselit(d, ru.Tunnus, t, taso, ix, iy, out var p00, out var p10, out var p01, out var p11)) continue;   // ei haettu tällä tasolla
                if (Musta(p00) || Musta(p10) || Musta(p01) || Musta(p11)) return false;
                byte luokka = d.SclLuokka(ru.Tunnus, e, n, pm);
                if (vesi ? luokka != 6 : luokka == 3 || luokka == 6 || luokka == 8 || luokka == 9 || luokka == 10) return false;
                p = ((p00.r + p10.r + p01.r + p11.r) / 4.0, (p00.g + p10.g + p01.g + p11.g) / 4.0, (p00.b + p10.b + p01.b + p11.b) / 4.0);
                if (ru.Vahvistus != null) p = (p.r * ru.Vahvistus[0], p.g * ru.Vahvistus[1], p.b * ru.Vahvistus[2]);
                if (ru.Siirto != null) p = (p.r + ru.Siirto[0], p.g + ru.Siirto[1], p.b + ru.Siirto[2]);
                return true;
            }
            return false;
        }

        public const double MaxUsva = 40;

        /// <summary>Lut murtoarvolle (lineaarinen väli kahden tavun välillä).</summary>
        static double Lutilla(byte[] lut, double v)
        {
            v = Math.Max(0, Math.Min(255, v)); int i = (int)v; double a = v - i;
            return i >= 255 ? lut[255] : lut[i] * (1 - a) + lut[i + 1] * a;
        }

        /// <summary>
        /// Nodata: TCI:n nodata on 0, mutta JPEG-pakattu COG jättää rataleveyden reunaan lähes mustia pikseleitä (simu e3f98b5b:
        /// kahden radan välinen kiila piirtyi datana ja usva teki siitä tummansinisen kiilan Saharaan ja Amazoniaan). Tumminkin
        /// todellinen pinta (syvä vesi, varjo) on TCI:ssä selvästi yli NodataRajan.
        /// </summary>
        static bool Musta((byte r, byte g, byte b) p) => p.r <= NodataRaja && p.g <= NodataRaja && p.b <= NodataRaja;
        public const byte NodataRaja = 6;
        /// <summary>
        /// Radan reunan syövytys (simu 10c31692 Sahara 32RNN: ohut tumma pisteviiva radan reunassa). COG on häviötön, ja taso 0
        /// on reunalta terävä, mutta yleiskuvatasot keskiarvoistavat reunapikselin nodatan kanssa: 40 m:n tasolla 1 pikseli
        /// (mediaani 68 % taustan kirkkaudesta), 80 m:n tasolla 1–2 (40 % ja 93 %). Ne ovat yli NodataRajan, joten niitä ei
        /// tunnisteta mustiksi. Jos 2 pikselin kehällä 2 × 2 -näytteen ympärillä (tason omassa resoluutiossa) on nodataa,
        /// pikseli ohitetaan, ja seuraava ruutu tai varakuva täyttää. Vain ruuduille, joilla on nodataa (indeksin nodata > 0).
        /// </summary>
        static bool RadanReunalla(KuvaData d, string tunnus, CogTaso t, int taso, int ix, int iy)
        {
            int x0 = Math.Max(0, ix - 2), y0 = Math.Max(0, iy - 2), x1 = Math.Min(t.Leveys - 1, ix + 3), y1 = Math.Min(t.Korkeus - 1, iy + 3);
            bool lahella = false;
            for (int ty = y0 / t.LaattaK; ty <= y1 / t.LaattaK && !lahella; ty++)
                for (int tx = x0 / t.LaattaL; tx <= x1 / t.LaattaL && !lahella; tx++)
                    lahella = LaatassaNodataa(d, tunnus, taso, tx, ty);
            if (!lahella) return false;
            for (int j = -2; j <= 3; j++)
                for (int i = -2; i <= 3; i++)
                {
                    if (i > -2 && i < 3 && j > -2 && j < 3) continue;   // vain kehä (etäisyys 2 näytteen 2 × 2 -lohkosta)
                    int x = ix + i, y = iy + j;
                    if (x < 0 || y < 0 || x >= t.Leveys || y >= t.Korkeus) continue;
                    if (Lue(d, tunnus, t, taso, x, y, out var p) && Musta(p)) return true;
                }
            return false;
        }

        static bool LaatassaNodataa(KuvaData d, string tunnus, int taso, int tx, int ty)
        {
            var avain = (tunnus, taso, tx, ty);
            if (d.NodataLaatat.TryGetValue(avain, out bool on)) return on;
            var l = d.Hae(avain);
            if (l == null) return false;   // ei haettu: ei lippua välimuistiin
            for (int i = 0; i + 2 < l.Length && !on; i += 3) on = l[i] <= NodataRaja && l[i + 1] <= NodataRaja && l[i + 2] <= NodataRaja;
            d.NodataLaatat[avain] = on;
            return on;
        }

        static byte Seka(byte a, byte b, byte c, byte d, double ax, double ay)
            => (byte)Math.Round((a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + d * ax) * ay);

        static bool Pikselit(KuvaData d, string tunnus, CogTaso t, int taso, int ix, int iy,
            out (byte r, byte g, byte b) p00, out (byte r, byte g, byte b) p10, out (byte r, byte g, byte b) p01, out (byte r, byte g, byte b) p11)
        {
            p00 = p10 = p01 = p11 = default;
            bool ok = Lue(d, tunnus, t, taso, ix, iy, out p00) & Lue(d, tunnus, t, taso, ix + 1, iy, out p10)
                    & Lue(d, tunnus, t, taso, ix, iy + 1, out p01) & Lue(d, tunnus, t, taso, ix + 1, iy + 1, out p11);
            return ok;
        }

        static bool Lue(KuvaData d, string tunnus, CogTaso t, int taso, int x, int y, out (byte r, byte g, byte b) p)
        {
            p = default;
            var l = d.Hae((tunnus, taso, x / t.LaattaL, y / t.LaattaK));
            if (l == null) return false;
            int i = ((y % t.LaattaK) * t.LaattaL + x % t.LaattaL) * 3;
            p = (l[i], l[i + 1], l[i + 2]);
            return true;
        }
    }
}
