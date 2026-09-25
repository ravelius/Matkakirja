// ALUENIMET JA MERINIMET PALLOLLA: puhtaat osat (ei UnityEngineä; Kartta-testit/NimiLadontaTestit.cs).
//
// Löydös 38 (natiivista puuttuvat paikannimet), Karttasepän ehdotus b ja Natiivisepän päätökset 24.9.2026:
//  - Webin poltettu nimiötaso (maakunnat, nykyalueet, meret) ja pohjalaattojen valtameret piirretään natiivissa
//    elävinä, mutta PAINETTUINA MAAHAN kuten webin laatoissa: teksti on tasossa pallon pinnalla, sen koko on
//    rivin korkeus_m ja leveys_m, kulma rivin kulma, ja rivi näkyy vain omilla pallotasoillaan.
//  - Paikat ovat webin nimiötason väistön jälkeiset ankkurit tasoittain (Siirtosepän kokoelma aluenimet, skeema
//    1.37). Natiivi ei siirrä nimiä: väistö ruudulla vain PIILOTTAA alemman prioriteetin nimen.
//  - Yhteinen ruututörmäys (Ruutuvaraukset): kaupunki > nosto > maakunta/nykyalue > meri > valtameri.
//    KaupunkiMerkit varaa ensin, Nimikerros lisää nostojen laatikot ja sitten omat nimensä.
//
// TASOT: webin pyramidin taso z vastaa 30 · 2^(z−4) pikseliä asteelle (z4 = 30, z8 = 480; Karttasepän
// raportti natiivi-nimet-ehdotus-20260924.md b3), ja pallotaso (Mercator Z) = z + 1. Natiivin kamera:
// pisteitä asteelle = ruudun korkeus pisteinä / (2 · h · tan(fov/2)) · metriä asteelle.
//
// KOOT: korkeus_m on kirjasinkoko (em) metreinä Millerin pystymittakaavassa ja leveys_m koko nimen leveys
// harvennuksineen (mitattu: VÄLIMERI z4 14 px → 44 430 m = 14 / 30 · 111 195 · cos(0,8 · 38,88°)). Koska
// leveys on Millerin vaakamittakaavassa, nimi on korkeilla leveyksillä kapeampi kuin luonnostaan, kuten
// webin pallolla, jolle Miller-laatat on projisoitu.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja
{
    /// <summary>Kaksoistarkka 3-vektori (ECEF-laskut ilman Unity.Mathematicsia).</summary>
    public readonly struct V3
    {
        public readonly double X, Y, Z;
        public V3(double x, double y, double z) { X = x; Y = y; Z = z; }
        public static V3 operator +(V3 a, V3 b) => new V3(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
        public static V3 operator -(V3 a, V3 b) => new V3(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
        public static V3 operator *(V3 a, double k) => new V3(a.X * k, a.Y * k, a.Z * k);
        public static V3 operator -(V3 a) => new V3(-a.X, -a.Y, -a.Z);
        public double Pistetulo(V3 b) => X * b.X + Y * b.Y + Z * b.Z;
        public double Pituus => Math.Sqrt(X * X + Y * Y + Z * Z);
        public V3 Ristitulo(V3 b) => new V3(Y * b.Z - Z * b.Y, Z * b.X - X * b.Z, X * b.Y - Y * b.X);
        public override string ToString() => string.Format(CultureInfo.InvariantCulture, "({0:0.###}, {1:0.###}, {2:0.###})", X, Y, Z);
    }

    /// <summary>Akselien suuntainen laatikko ruudulla (pikseleinä, y ylös kuten Input).</summary>
    public readonly struct Ruutulaatikko
    {
        public readonly float X0, Y0, X1, Y1;
        public Ruutulaatikko(float x0, float y0, float x1, float y1) { X0 = x0; Y0 = y0; X1 = x1; Y1 = y1; }
        public static Ruutulaatikko Alue(float x, float y, float leveys, float korkeus) => new Ruutulaatikko(x, y, x + leveys, y + korkeus);
        public float Leveys => X1 - X0;
        public float Korkeus => Y1 - Y0;
        /// <summary>Leikkaavatko avoimina alueina (reunojen kosketus ei ole osuma, kuten Unityn Rect.Overlaps).</summary>
        public bool Leikkaa(Ruutulaatikko b) => X0 < b.X1 && b.X0 < X1 && Y0 < b.Y1 && b.Y0 < Y1;
        public Ruutulaatikko Laajenna(float d) => new Ruutulaatikko(X0 - d, Y0 - d, X1 + d, Y1 + d);
        public override string ToString() => string.Format(CultureInfo.InvariantCulture, "[{0:0.#}, {1:0.#} – {2:0.#}, {3:0.#}]", X0, Y0, X1, Y1);
    }

    /// <summary>
    /// YHTEINEN RUUTUTÖRMÄYS (kaupungit, nostot, aluenimet): kehyksen varatut laatikot ruutuhilassa. Ensimmäinen
    /// kirjoittaja tyhjentää kehyksen alussa (<see cref="Aloita"/>); myöhemmät lisäävät samaan. Hila (oletus 64 px)
    /// pitää osumatestin halpana satojen nimien kanssa.
    /// </summary>
    public sealed class Ruutuvaraukset
    {
        readonly float solu;
        readonly List<Ruutulaatikko> laatikot = new List<Ruutulaatikko>();
        readonly Dictionary<long, List<int>> hila = new Dictionary<long, List<int>>();
        readonly Stack<List<int>> vapaat = new Stack<List<int>>();
        readonly List<int> suuret = new List<int>();

        public Ruutuvaraukset(float soluPx = 64f) { solu = Math.Max(8f, soluPx); }

        /// <summary>Kehys, jolle varaukset on tehty (kirjoittajat tarkistavat, onko tämä jo aloitettu).</summary>
        public int Kehys { get; private set; } = -1;
        public int Maara => laatikot.Count;
        public IReadOnlyList<Ruutulaatikko> Laatikot => laatikot;

        /// <summary>Tyhjentää varaukset uudelle kehykselle.</summary>
        public void Aloita(int kehys)
        {
            Kehys = kehys;
            laatikot.Clear();
            suuret.Clear();
            foreach (var l in hila.Values) { l.Clear(); vapaat.Push(l); }
            hila.Clear();
        }

        /// <summary>Aloittaa kehyksen vain, jos sitä ei ole vielä aloitettu (toinen kirjoittaja).</summary>
        public void Varmista(int kehys) { if (Kehys != kehys) Aloita(kehys); }

        static long Avain(int x, int y) => ((long)x << 32) ^ (uint)y;

        public bool Osuu(Ruutulaatikko a) => Osuu(a, false, default);

        /// <summary>Osuuko varauksiin muuten kuin täsmälleen laatikon <paramref name="ohita"/> kohdalta (kaupungin oma piste).</summary>
        public bool OsuuPaitsi(Ruutulaatikko a, Ruutulaatikko ohita) => Osuu(a, true, ohita);

        static bool Sama(Ruutulaatikko a, Ruutulaatikko b) => a.X0 == b.X0 && a.Y0 == b.Y0 && a.X1 == b.X1 && a.Y1 == b.Y1;

        bool Osuu(Ruutulaatikko a, bool ohitetaan, Ruutulaatikko ohita)
        {
            bool Estaa(Ruutulaatikko b) => a.Leikkaa(b) && !(ohitetaan && Sama(b, ohita));
            int x0 = (int)Math.Floor(a.X0 / solu), x1 = (int)Math.Floor(a.X1 / solu);
            int y0 = (int)Math.Floor(a.Y0 / solu), y1 = (int)Math.Floor(a.Y1 / solu);
            // Hyvin suuri laatikko (valtameri lähellä): suora läpikäynti on halvempi kuin sadat solut.
            if ((long)(x1 - x0 + 1) * (y1 - y0 + 1) > laatikot.Count)
            {
                foreach (var b in laatikot) if (Estaa(b)) return true;
                return false;
            }
            foreach (int i in suuret) if (Estaa(laatikot[i])) return true;
            for (int x = x0; x <= x1; x++)
                for (int y = y0; y <= y1; y++)
                    if (hila.TryGetValue(Avain(x, y), out var l))
                        foreach (int i in l) if (Estaa(laatikot[i])) return true;
            return false;
        }

        public void Varaa(Ruutulaatikko a)
        {
            int i = laatikot.Count;
            laatikot.Add(a);
            int x0 = (int)Math.Floor(a.X0 / solu), x1 = (int)Math.Floor(a.X1 / solu);
            int y0 = (int)Math.Floor(a.Y0 / solu), y1 = (int)Math.Floor(a.Y1 / solu);
            // Hyvin suuri laatikko (esim. lähellä kuvattu valtameri) ei täytä hilaa: se tarkistetaan aina suoraan.
            if ((long)(x1 - x0 + 1) * (y1 - y0 + 1) > 1024) { suuret.Add(i); return; }
            for (int x = x0; x <= x1; x++)
                for (int y = y0; y <= y1; y++)
                {
                    long k = Avain(x, y);
                    if (!hila.TryGetValue(k, out var l)) hila[k] = l = vapaat.Count > 0 ? vapaat.Pop() : new List<int>();
                    l.Add(i);
                }
        }

        /// <summary>Varaa, jos ei osu aiempiin; palauttaa, mahtuiko.</summary>
        public bool YritaVarata(Ruutulaatikko a)
        {
            if (Osuu(a)) return false;
            Varaa(a);
            return true;
        }
    }

    /// <summary>Rivin tyyli (juuren tyylit-taulukko).</summary>
    public sealed class Nimityyli
    {
        public string Avain;
        public bool Versaali = true, Kursiivi;
        public double HarvennusEm = 0.32;
        /// <summary>Pienkapiteelin kerroin (nykyalue 0,78) tai 0 = ei pienkapiteelia.</summary>
        public double Pienkapiteeli;
        /// <summary>Väri 0–1 (r, g, b, a) tai null = rivin muste värit-taulukosta.</summary>
        public double[] Vari;
        public Dictionary<string, double[]> Varit = new Dictionary<string, double[]>();
        /// <summary>Kirjainkorkeus pikseleinä pyramidin tasoittain (vain merinimet.json-varareitille).</summary>
        public Dictionary<int, double> KootPx = new Dictionary<int, double>();
        /// <summary>Aaltomerkki nimen alla (meri): null = ei aaltoa.</summary>
        public Aaltomerkki Aalto;
    }

    /// <summary>Webin piirraAaltomerkki: kolmen jakson aalto nimen alla.</summary>
    public sealed class Aaltomerkki
    {
        /// <summary>Aallon keskiviiva nimen keskilinjan alapuolella × kirjainkorkeus.</summary>
        public double AlaEm = 0.95;
        /// <summary>Aallon leveys × nimen leveys.</summary>
        public double LeveysOsuus = 0.5;
        public int Jaksot = 3;
        /// <summary>Neliöllisen Bézierin ohjauspiste ± osuus puolijaksosta (ylös ensin).</summary>
        public double OhjausOsuus = 0.55;
    }

    /// <summary>Yhden tason paikka ja koko.</summary>
    public readonly struct Nimipaikka
    {
        public readonly double Lon, Lat, KorkeusM, LeveysM;
        public Nimipaikka(double lon, double lat, double korkeusM, double leveysM) { Lon = lon; Lat = lat; KorkeusM = korkeusM; LeveysM = leveysM; }
    }

    /// <summary>Alue-, meri- tai valtamerinimi.</summary>
    public sealed class Aluenimi
    {
        public string Id, Teksti, Luokka, Tyyli, Iso, Muste;
        public double Kulma;
        /// <summary>Pallotasot (Mercator Z) nousevasti; paikka jokaiselle.</summary>
        public int[] Tasot;
        public Dictionary<int, Nimipaikka> Paikat = new Dictionary<int, Nimipaikka>();
        /// <summary>Väistön porras: 2 maakunta/nykyalue, 3 meri, 4 valtameri (0 kaupunki, 1 nosto ovat muiden).</summary>
        public int Porras;
        /// <summary>Luettu merinimet.json-varareitiltä (vanha paketti).</summary>
        public bool Varareitti;
    }

    /// <summary>Kokoelmat aluenimet (skeema 1.37) ja merinimet (1.36) luettuina.</summary>
    public sealed class Nimisto
    {
        public readonly List<Aluenimi> Nimet = new List<Aluenimi>();
        public readonly Dictionary<string, Nimityyli> Tyylit = new Dictionary<string, Nimityyli>();
        /// <summary>Ohitetut rivit ja syyt (vartija ja loki).</summary>
        public readonly List<string> Ohitetut = new List<string>();
        public int Aluenimia, Merinimia;
        /// <summary>Suurin pallotaso koko aineistossa (tätä syvemmällä näytetään tämän tason nimet suurennettuina).</summary>
        public int YlinTaso;

        public Nimityyli Tyyli(Aluenimi n) =>
            n.Tyyli != null && Tyylit.TryGetValue(n.Tyyli, out var t) ? t : Tyylit.TryGetValue(n.Luokka ?? "", out t) ? t : null;

        /// <summary>
        /// Lukee aluenimet ja (varareittinä) merinimet. Kumpi tahansa voi olla null (vanha paketti). Meri, joka on
        /// molemmissa samalla tunnuksella, otetaan aluenimistä (paikat tasoittain webin väistön jälkeen): VÄLIMERI
        /// ei piirry kahdesti. Rikkinäinen rivi ohitetaan (Ohitetut), rikkinäinen JSON heittää.
        /// </summary>
        public static Nimisto Lue(string aluenimet, string merinimet)
        {
            var n = new Nimisto();
            var tunnukset = new HashSet<string>();
            if (aluenimet != null)
            {
                var juuri = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(aluenimet));
                if (MiniJson.Kentta(juuri, "tyylit") is Dictionary<string, object> tyylit)
                    foreach (var p in tyylit)
                        if (p.Value is Dictionary<string, object> t) n.Tyylit[p.Key] = LueTyyli(p.Key, t);
                foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "alkiot")))
                {
                    if (!(o is Dictionary<string, object> a)) continue;
                    var r = LueAluenimi(a, out string syy);
                    if (r == null) { n.Ohitetut.Add($"aluenimet {MiniJson.Teksti(a, "id") ?? "?"}: {syy}"); continue; }
                    if (!tunnukset.Add(r.Id)) { n.Ohitetut.Add($"aluenimet {r.Id}: kaksoistunnus"); continue; }
                    n.Nimet.Add(r);
                    n.Aluenimia++;
                }
            }
            if (merinimet != null)
            {
                var juuri = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(merinimet));
                var tyyli = MiniJson.Kentta(juuri, "tyyli") as Dictionary<string, object>;
                if (!n.Tyylit.ContainsKey("meri")) n.Tyylit["meri"] = LueMerityyli(tyyli);
                var merityyli = n.Tyylit["meri"];
                if (merityyli.KootPx.Count == 0) merityyli.KootPx = LueMerityyli(tyyli).KootPx;
                foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "alkiot")))
                {
                    if (!(o is Dictionary<string, object> a)) continue;
                    string id = MiniJson.Teksti(a, "id");
                    if (id != null && tunnukset.Contains(id)) continue; // aluenimet voittaa
                    var r = LueMerinimi(a, merityyli, out string syy);
                    if (r == null) { n.Ohitetut.Add($"merinimet {id ?? "?"}: {syy}"); continue; }
                    tunnukset.Add(r.Id);
                    n.Nimet.Add(r);
                    n.Merinimia++;
                }
            }
            foreach (var r in n.Nimet)
                foreach (int t in r.Tasot) n.YlinTaso = Math.Max(n.YlinTaso, t);
            return n;
        }

        static Nimityyli LueTyyli(string avain, Dictionary<string, object> t)
        {
            var y = new Nimityyli
            {
                Avain = avain,
                Versaali = MiniJson.Totuus(t, "versaali", true),
                Kursiivi = MiniJson.Totuus(t, "kursiivi"),
                HarvennusEm = MiniJson.Luku(t, "harvennus_em") ?? MiniJson.Luku(t, "harvennusEm") ?? 0.32,
                Pienkapiteeli = MiniJson.Luku(t, "pienkapiteeli") ?? 0,
                Vari = NimiLadonta.Rgba(MiniJson.Teksti(t, "vari")),
            };
            if (MiniJson.Kentta(t, "varit") is Dictionary<string, object> varit)
                foreach (var p in varit)
                    if (NimiLadonta.Rgba(p.Value as string) is double[] v) y.Varit[p.Key] = v;
            y.KootPx = LueKoot(MiniJson.Kentta(t, "koot_px") ?? MiniJson.Kentta(t, "kirjainkorkeusPx"));
            if (MiniJson.Kentta(t, "aaltomerkki") is Dictionary<string, object> aa) y.Aalto = LueAalto(aa);
            return y;
        }

        static Nimityyli LueMerityyli(Dictionary<string, object> t)
        {
            var y = t != null ? LueTyyli("meri", t) : new Nimityyli { Avain = "meri" };
            y.Vari ??= NimiLadonta.Rgba("rgba(58, 66, 84, 0.62)");
            y.Aalto ??= new Aaltomerkki();
            if (y.KootPx.Count == 0)
                y.KootPx = new Dictionary<int, double> { [4] = 14, [5] = 18, [6] = 24, [7] = 34, [8] = 46 };
            return y;
        }

        static Dictionary<int, double> LueKoot(object o)
        {
            var d = new Dictionary<int, double>();
            if (o is Dictionary<string, object> k)
                foreach (var p in k)
                    if (int.TryParse(p.Key, NumberStyles.Integer, CultureInfo.InvariantCulture, out int z) && p.Value is double v) d[z] = v;
            return d;
        }

        static Aaltomerkki LueAalto(Dictionary<string, object> a) => new Aaltomerkki
        {
            // aluenimet: alla_em, leveys_osuus, kaaria; merinimet: alaMuutos, leveysOsuus, jaksot, ohjausOsuus.
            AlaEm = MiniJson.Luku(a, "alla_em") ?? MiniJson.Luku(a, "alaMuutos") ?? 0.95,
            LeveysOsuus = MiniJson.Luku(a, "leveys_osuus") ?? MiniJson.Luku(a, "leveysOsuus") ?? 0.5,
            Jaksot = (int)(MiniJson.Luku(a, "kaaria") ?? MiniJson.Luku(a, "jaksot") ?? 3),
            OhjausOsuus = MiniJson.Luku(a, "ohjausOsuus") ?? 0.55,
        };

        static Aluenimi LueAluenimi(Dictionary<string, object> a, out string syy)
        {
            syy = null;
            string id = MiniJson.Teksti(a, "id"), teksti = MiniJson.Teksti(a, "teksti"), luokka = MiniJson.Teksti(a, "luokka");
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(teksti)) { syy = "id tai teksti puuttuu"; return null; }
            int porras = NimiLadonta.Porras(luokka);
            if (porras < 0) { syy = "tuntematon luokka " + (luokka ?? "null"); return null; }
            var tasot = LueTasot(MiniJson.Kentta(a, "pallotasot"));
            if (tasot.Length == 0) { syy = "pallotasot puuttuu"; return null; }
            var r = new Aluenimi
            {
                Id = id, Teksti = teksti, Luokka = luokka, Tyyli = MiniJson.Teksti(a, "tyyli") ?? luokka,
                Iso = MiniJson.Teksti(a, "iso"), Muste = MiniJson.Teksti(a, "muste"),
                Kulma = MiniJson.Luku(a, "kulma") ?? 0, Tasot = tasot, Porras = porras,
            };
            if (MiniJson.Kentta(a, "paikat") is Dictionary<string, object> paikat)
            {
                // paikat tasoittain pyramidin z:n mukaan: pallotaso = z + 1.
                foreach (var p in paikat)
                {
                    if (!int.TryParse(p.Key, NumberStyles.Integer, CultureInfo.InvariantCulture, out int z) || !(p.Value is Dictionary<string, object> q)) continue;
                    double? lon = MiniJson.Luku(q, "lon"), lat = MiniJson.Luku(q, "lat"), k = MiniJson.Luku(q, "korkeus_m");
                    if (lon == null || lat == null || k == null || k <= 0) continue;
                    double l = MiniJson.Luku(q, "leveys_m") ?? NimiLadonta.LeveysArvio(teksti, k.Value, 0.32, lat.Value);
                    r.Paikat[z + 1] = new Nimipaikka(lon.Value, lat.Value, k.Value, l);
                }
            }
            else
            {
                // Valtameri: yksi paikka ja korkeus kaikille tasoille, leveys arvioidaan (pohjalaattojen kaluste).
                double? lon = MiniJson.Luku(a, "lon"), lat = MiniJson.Luku(a, "lat"), k = MiniJson.Luku(a, "korkeus_m");
                if (lon != null && lat != null && k != null && k > 0)
                {
                    double l = MiniJson.Luku(a, "leveys_m") ?? NimiLadonta.LeveysArvio(teksti, k.Value, 0.34, lat.Value);
                    foreach (int t in tasot) r.Paikat[t] = new Nimipaikka(lon.Value, lat.Value, k.Value, l);
                }
            }
            var puuttuu = new List<int>();
            foreach (int t in tasot) if (!r.Paikat.ContainsKey(t)) puuttuu.Add(t);
            if (puuttuu.Count == tasot.Length) { syy = "paikat puuttuvat"; return null; }
            if (puuttuu.Count > 0) r.Tasot = Array.FindAll(tasot, t => r.Paikat.ContainsKey(t));
            return r;
        }

        static Aluenimi LueMerinimi(Dictionary<string, object> a, Nimityyli tyyli, out string syy)
        {
            syy = null;
            string id = MiniJson.Teksti(a, "id"), teksti = MiniJson.Teksti(a, "nimi") ?? MiniJson.Teksti(a, "teksti");
            double? lon = MiniJson.Luku(a, "lon"), lat = MiniJson.Luku(a, "lat");
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(teksti) || lon == null || lat == null) { syy = "id, nimi tai paikka puuttuu"; return null; }
            var pyramidi = LueTasot(MiniJson.Kentta(a, "tasot"));
            var r = new Aluenimi
            {
                Id = id, Teksti = teksti, Luokka = "meri", Tyyli = "meri", Kulma = MiniJson.Luku(a, "kulma") ?? 0,
                Porras = NimiLadonta.Porras("meri"), Varareitti = true,
            };
            var tasot = new List<int>();
            foreach (int z in pyramidi)
            {
                if (!tyyli.KootPx.TryGetValue(z, out double px)) continue;
                double k = NimiLadonta.KorkeusMetreina(px, z, lat.Value);
                r.Paikat[z + 1] = new Nimipaikka(lon.Value, lat.Value, k, NimiLadonta.LeveysArvio(teksti, k, tyyli.HarvennusEm, lat.Value));
                tasot.Add(z + 1);
            }
            if (tasot.Count == 0) { syy = "ei tasoja, joille on kirjainkorkeus"; return null; }
            r.Tasot = tasot.ToArray();
            return r;
        }

        static int[] LueTasot(object o)
        {
            var l = new List<int>();
            foreach (var t in MiniJson.TaulukkoTaiTyhja(o)) if (t is double d) l.Add((int)d);
            l.Sort();
            return l.ToArray();
        }
    }

    public static class NimiLadonta
    {
        /// <summary>Metriä asteelle (R = 6 371 km; tällä aineiston korkeus_m on laskettu).</summary>
        public const double MetriaAsteelle = 111194.93;
        /// <summary>Pyramidin z4: pikseliä asteelle.</summary>
        public const double PikseliaAsteelleZ4 = 30.0;
        /// <summary>Pyramidin taso z = pallotaso − 1.</summary>
        public const int PallotasoEro = 1;

        /// <summary>Väistön porras luokasta: 2 maakunta/nykyalue, 3 meri, 4 valtameri; tuntematon −1.</summary>
        public static int Porras(string luokka) => luokka switch
        {
            "maakunta" => 2, "maakunta-pieni" => 2, "nykyalue" => 2, "nykyalue-pieni" => 2,
            "meri" => 3, "valtameri" => 4, _ => -1,
        };

        /// <summary>Kaupunkien ja nostojen portaat samassa asteikossa (ne varaavat ennen aluenimiä).</summary>
        public const int PorrasKaupunki = 0, PorrasNosto = 1;

        /// <summary>
        /// Kirjasinkoko metreinä pyramidin tasolla z (Millerin pystymittakaava): px / (30 · 2^(z−4)) · m/° · cos(0,8 φ).
        /// Varareitti merinimet.json:lle, jossa korkeus_m puuttuu.
        /// </summary>
        public static double KorkeusMetreina(double px, int z, double lat) =>
            px / (PikseliaAsteelleZ4 * Math.Pow(2, z - 4)) * MetriaAsteelle * Math.Cos(0.8 * lat * Math.PI / 180.0);

        /// <summary>
        /// Nimen leveyden arvio (kun leveys_m puuttuu): 0,64 em merkkiä kohti + harvennus, Millerin vaakakerroin
        /// cos φ / cos 0,8 φ. Mitattu aluenimistä: VÄLIMERI, ITÄMERI ja POHJANMERI osuvat 3–6 %:n sisään.
        /// </summary>
        public static double LeveysArvio(string teksti, double korkeusM, double harvennusEm, double lat)
        {
            int n = (teksti ?? "").Length;
            double f = Math.Cos(lat * Math.PI / 180.0) / Math.Max(0.05, Math.Cos(0.8 * lat * Math.PI / 180.0));
            return korkeusM * n * (0.64 + harvennusEm) * f;
        }

        // ---- TASOVALINTA -------------------------------------------------------------------------------------

        /// <summary>
        /// Jatkuva pallotaso (Mercator Z) kamerasta: pisteitä asteelle = ruudun korkeus pisteinä / (2 h tan(fov/2))
        /// · m/°, pyramidin z = 4 + log2(pt/° / 30), pallotaso = z + 1.
        /// </summary>
        public static double JatkuvaTaso(double korkeusM, double fovPystyAst, double ruutuKorkeusPt)
        {
            double h = Math.Max(1.0, korkeusM);
            double nakyvaM = 2.0 * h * Math.Tan(fovPystyAst * 0.5 * Math.PI / 180.0);
            double ptAsteelle = ruutuKorkeusPt / nakyvaM * MetriaAsteelle;
            return 4.0 + Math.Log(Math.Max(1e-9, ptAsteelle / PikseliaAsteelleZ4), 2.0) + PallotasoEro;
        }

        /// <summary>
        /// Kokonainen taso jatkuvasta: floor(jatkuva + siirto). Siirto 0,6 = taso Z valitaan välillä [Z − 0,6, Z + 0,4),
        /// jolloin teksti on 0,66–1,32 × webin nimelliskoko (lähin natiivin näkymä 3,6° on noin Z 8,5 → taso 9,
        /// webin tarkin nimiötaso). Hystereesi: edellinen taso pysyy, kunnes jatkuva on yli hystereesin verran
        /// sen välin ulkopuolella (ei välkettä rajalla nipistyksessä).
        /// </summary>
        public static int ValitseTaso(double jatkuva, int edellinen, double siirto = 0.6, double hystereesi = 0.12)
        {
            int uusi = (int)Math.Floor(jatkuva + siirto);
            if (edellinen >= 0 && uusi != edellinen)
            {
                double ala = edellinen - siirto - hystereesi, yla = edellinen + 1 - siirto + hystereesi;
                if (jatkuva >= ala && jatkuva < yla) return edellinen;
            }
            return Math.Max(0, uusi);
        }

        /// <summary>
        /// Rivin taso valitulla pallotasolla: sama taso, jos rivillä on se; syvemmällä kuin aineiston ylin taso
        /// rivin ylin taso, jos se on aineiston ylin (webin ylizoomi); muuten −1 (ei näy).
        /// </summary>
        public static int RivinTaso(int[] tasot, int valittu, int ylinTaso)
        {
            if (tasot == null || tasot.Length == 0) return -1;
            if (Array.IndexOf(tasot, valittu) >= 0) return valittu;
            int ylin = tasot[tasot.Length - 1];
            if (valittu > ylinTaso && ylin == ylinTaso) return ylin;
            return -1;
        }

        /// <summary>Tekstin mittakaava webin nimelliskokoon verrattuna: 2^(jatkuva − taso).</summary>
        public static double Mittakaava(double jatkuva, int taso) => Math.Pow(2.0, jatkuva - taso);

        // ---- KALLISTUS ---------------------------------------------------------------------------------------

        /// <summary>
        /// Peittävyys katselukulman mukaan (kulma pinnan normaalista kameraan, asteina): 1 alle alku, 0 yli loppu,
        /// smoothstep välissä. Päätös: pinnalle painetut nimet häivytetään yli noin 70°:n (65–75°).
        /// </summary>
        public static double KallistusPeitto(double kulmaAst, double alku = 65.0, double loppu = 75.0)
        {
            if (kulmaAst <= alku) return 1.0;
            if (kulmaAst >= loppu) return 0.0;
            double t = (kulmaAst - alku) / (loppu - alku);
            return 1.0 - t * t * (3.0 - 2.0 * t);
        }

        // ---- TASOON PAINAMINEN -------------------------------------------------------------------------------

        const double WgsA = 6378137.0, WgsE2 = 6.69437999014e-3;

        /// <summary>WGS84 → ECEF (metrit).</summary>
        public static V3 Ecef(double lat, double lon, double h = 0)
        {
            double f = lat * Math.PI / 180.0, l = lon * Math.PI / 180.0;
            double sf = Math.Sin(f), cf = Math.Cos(f);
            double n = WgsA / Math.Sqrt(1.0 - WgsE2 * sf * sf);
            return new V3((n + h) * cf * Math.Cos(l), (n + h) * cf * Math.Sin(l), (n * (1.0 - WgsE2) + h) * sf);
        }

        /// <summary>
        /// Paikallinen taso pinnalla: Ita, Pohjoinen, Ylos (geodeettinen normaali) ja tekstin akselit: Oikea
        /// (lukusuunta) ja Pysty (kirjainten yläsuunta). Kulma asteina myötäpäivään kartalla (0 = vaaka itään,
        /// 90 = ylhäältä alas, kirjainten yläpää itään).
        /// </summary>
        public readonly struct Taso
        {
            public readonly V3 Keski, Ita, Pohjoinen, Ylos, Oikea, Pysty;
            public Taso(V3 keski, V3 ita, V3 pohjoinen, V3 ylos, V3 oikea, V3 pysty)
            { Keski = keski; Ita = ita; Pohjoinen = pohjoinen; Ylos = ylos; Oikea = oikea; Pysty = pysty; }
            /// <summary>Tason piste tekstin koordinaateista (x oikealle, y ylös, metreinä).</summary>
            public V3 Piste(double x, double y) => Keski + Oikea * x + Pysty * y;
        }

        public static Taso PinnanTaso(double lat, double lon, double kulmaAst, double h = 0)
        {
            double f = lat * Math.PI / 180.0, l = lon * Math.PI / 180.0, k = kulmaAst * Math.PI / 180.0;
            var ita = new V3(-Math.Sin(l), Math.Cos(l), 0);
            var pohjoinen = new V3(-Math.Sin(f) * Math.Cos(l), -Math.Sin(f) * Math.Sin(l), Math.Cos(f));
            var ylos = new V3(Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f));
            var oikea = ita * Math.Cos(k) - pohjoinen * Math.Sin(k);
            var pysty = ita * Math.Sin(k) + pohjoinen * Math.Cos(k);
            return new Taso(Ecef(lat, lon, h), ita, pohjoinen, ylos, oikea, pysty);
        }

        /// <summary>
        /// Nimen ala tekstin koordinaateissa (metreinä, keskipiste origossa): leveys_m × korkeus_m; aaltomerkillinen
        /// meri ulottuu alas aallon alle (0,95 em + ohjauspisteen korkeus + viiva).
        /// </summary>
        public static (double X0, double Y0, double X1, double Y1) NimenAla(double leveysM, double korkeusM, Aaltomerkki aalto)
        {
            double y0 = -0.5 * korkeusM;
            if (aalto != null)
            {
                double w = leveysM * aalto.LeveysOsuus, a = w / Math.Max(1, 2 * aalto.Jaksot);
                y0 = Math.Min(y0, -aalto.AlaEm * korkeusM - 0.5 * aalto.OhjausOsuus * a - 0.05 * korkeusM);
            }
            return (-0.5 * leveysM, y0, 0.5 * leveysM, 0.5 * korkeusM);
        }

        /// <summary>
        /// Aaltomerkin murtoviiva tekstin koordinaateissa (metreinä): webin piirraAaltomerkki, keskellä
        /// AlaEm × korkeus nimen keskilinjan alapuolella, leveys LeveysOsuus × nimen leveys, 2 × Jaksot
        /// neliöllistä Bézieriä (puolijakso a = w / (2 · jaksot), ohjauspiste ± OhjausOsuus · a, ylös ensin).
        /// </summary>
        public static List<(double X, double Y)> Aaltoviiva(double leveysM, double korkeusM, Aaltomerkki aalto, int naytteita = 6)
        {
            var ulos = new List<(double, double)>();
            if (aalto == null || aalto.Jaksot <= 0) return ulos;
            double w = leveysM * aalto.LeveysOsuus;
            int puolet = 2 * aalto.Jaksot;
            double a = w / puolet, y = -aalto.AlaEm * korkeusM, x0 = -0.5 * w;
            ulos.Add((x0, y));
            for (int p = 0; p < puolet; p++)
            {
                double ax = x0 + p * a, cx = ax + 0.5 * a, bx = ax + a;
                double cy = y + (p % 2 == 0 ? 1 : -1) * aalto.OhjausOsuus * a;
                for (int i = 1; i <= naytteita; i++)
                {
                    double t = (double)i / naytteita, u = 1 - t;
                    ulos.Add((u * u * ax + 2 * u * t * cx + t * t * bx, u * u * y + 2 * u * t * cy + t * t * y));
                }
            }
            return ulos;
        }

        /// <summary>
        /// Aallon viivan paksuus ruutupisteinä: webin max(0,8, nimen leveys px / 120) nimelliskoossa (leveys px =
        /// leveys_m / korkeus_m × kirjainkorkeus px) kerrottuna tekstin mittakaavalla.
        /// </summary>
        public static double AallonPaksuus(double leveysM, double korkeusM, double korkeusPx, double mittakaava) =>
            Math.Max(0.8, korkeusM > 0 ? leveysM / korkeusM * korkeusPx / 120.0 : 0.8) * mittakaava;

        /// <summary>
        /// Lukusuunta ruudulla: nimi käännetään 180°, kun sen lukusuunta ruudulla osoittaa vasemmalle (pallon
        /// suunta noin 180°), jotta nimi ei ole ylösalaisin. Hystereesi ± ~10°: kääntö yli 100°:n, palautus alle 80°:n.
        /// </summary>
        public static bool Kaannetty(bool edellinen, double ruutuDx, double ruutuDy)
        {
            double p = Math.Sqrt(ruutuDx * ruutuDx + ruutuDy * ruutuDy);
            if (p < 1e-9) return edellinen;
            double c = ruutuDx / p;
            return edellinen ? c < 0.17 : c < -0.17;
        }

        // ---- VÄISTÖ ------------------------------------------------------------------------------------------

        /// <summary>Väistön ehdokas: laatikko ruudulla ja järjestysavaimet.</summary>
        public struct Ehdokas
        {
            public int Indeksi;
            public int Porras;
            /// <summary>Näkyi edellisessä ladonnassa: voittaa saman portaan uudet (ei välkettä panoroinnissa).</summary>
            public bool Edellinen;
            /// <summary>Suurempi ensin saman portaan sisällä (kirjasinkoko).</summary>
            public double Koko;
            public Ruutulaatikko Laatikko;
        }

        /// <summary>
        /// VÄISTÖN SÄÄNNÖT: porras nousevasti (kaupunki 0 ja nosto 1 on varattu jo ennen, maakunta/nykyalue 2,
        /// meri 3, valtameri 4), saman portaan sisällä edellisessä ladonnassa näkynyt ensin, sitten suurempi koko,
        /// sitten indeksi (vakaa). Ruudun ulkopuolinen laatikko ohitetaan varaamatta. Nimi näytetään, jos sen laatikko
        /// (vara mukana) ei leikkaa yhtään varattua; muuten se piilotetaan paikallaan (ei siirtoa: webin väistö on jo
        /// paikoissa). Palauttaa näytettävien indeksit järjestyksessä.
        /// </summary>
        public static void Lado(List<Ehdokas> ehdokkaat, Ruutuvaraukset varaukset, Ruutulaatikko ruutu, float vara, List<int> tulos)
        {
            tulos.Clear();
            ehdokkaat.Sort(Vertaa);
            foreach (var e in ehdokkaat)
            {
                if (!e.Laatikko.Leikkaa(ruutu)) continue;
                if (varaukset.YritaVarata(e.Laatikko.Laajenna(vara))) tulos.Add(e.Indeksi);
            }
        }

        static int Vertaa(Ehdokas a, Ehdokas b)
        {
            if (a.Porras != b.Porras) return a.Porras.CompareTo(b.Porras);
            if (a.Edellinen != b.Edellinen) return a.Edellinen ? -1 : 1;
            if (a.Koko != b.Koko) return b.Koko.CompareTo(a.Koko);
            return a.Indeksi.CompareTo(b.Indeksi);
        }

        /// <summary>
        /// Kaupungin ehdokas ladonnassa (KaupunkiMerkit): piste ja nimiö ruudulla. Kaikki pikseleinä, y ylös.
        /// Jos <see cref="Leveys"/> &gt; 0, nimi etsii paikkansa webin ehdokaskehästä (<see cref="NimenPaikat"/>);
        /// muuten (ja pakollisella nimellä) <see cref="Nimio"/> on kiinteä laatikko.
        /// </summary>
        public struct KaupunkiEhdokas
        {
            public Ruutulaatikko Piste, Nimio;
            /// <summary>Nimi näkyy väistöstä riippumatta (valittava kaupunki).</summary>
            public bool Pakko;
            /// <summary>Nimiöt ylipäätään sallittu (kerros "nimiot" tai linssinimet); false = vain piste.</summary>
            public bool Sallittu;
            /// <summary>Pisteen paikka ruudulla.</summary>
            public float X, Y;
            /// <summary>Tekstin piirretty leveys ja korkeus (laatikon ydin, ilman rakoa).</summary>
            public float Leveys, Korkeus;
            /// <summary>Kirjasinkoko pikseleinä (webin kork = 1,15 × koko).</summary>
            public float Kirjain;
            /// <summary>Sivuehdokkaiden etäisyys pisteen keskeltä (webin d).</summary>
            public float Sivu;
            /// <summary>Lukittu paikka (web js/pallolauta/nimet.js LUKKO): kylki ei vaihdu vedossa eikä zoomissa.</summary>
            public bool Lukittu;
            public NimenPaikka Lukko;
            /// <summary>Laudan oma asettelu (Sisalto.Kaupunki la/lx/ly), jos <see cref="OnOma"/>; ks. <see cref="OmaPaikka"/>.</summary>
            public bool OnOma;
            public NimenPaikka Oma;
        }

        /// <summary>
        /// Laudan oma asettelu ehdokkaaksi (web: dx = lx · 11/13 · k, perusviiva dy = ly · 11/13 · k, ank = la).
        /// Muunnos tekstin keskipisteeksi y ylös kuten muissa ehdokkaissa: Dy = 0,35 · kork − ly · 11/13.
        /// false, jos la puuttuu.
        /// </summary>
        public static bool OmaPaikka(string la, float lx, float ly, float kirjain, float kerroin, out NimenPaikka paikka)
        {
            paikka = default;
            if (string.IsNullOrEmpty(la)) return false;
            var ank = la == "end" ? NimenAnkkuri.Loppu : la == "middle" ? NimenAnkkuri.Keski : NimenAnkkuri.Alku;
            float s = 11f / 13f * kerroin;
            paikka = new NimenPaikka(lx * s, 0.35f * kirjain * 1.15f - ly * s, ank);
            return true;
        }

        /// <summary>Nimen ankkuri kuten webin text-anchor: start = alkaa x:stä, end = päättyy x:ään, middle = keskellä.</summary>
        public enum NimenAnkkuri : byte { Alku, Loppu, Keski }

        /// <summary>Nimen paikka pisteen suhteen: Dx ankkurin x, Dy tekstin pystykeskipiste (pikseleinä, y ylös).</summary>
        public struct NimenPaikka
        {
            public float Dx, Dy;
            public NimenAnkkuri Ank;
            public NimenPaikka(float dx, float dy, NimenAnkkuri ank) { Dx = dx; Dy = dy; Ank = ank; }
            public override string ToString() => string.Format(CultureInfo.InvariantCulture, "({0:0.#}, {1:0.#} {2})", Dx, Dy, Ank);
        }

        /// <summary>Rako merkin (pelimerkkipinon) reunan ja nimiön välissä, pisteinä (web karttanimet.js NIMION_RAKO).</summary>
        public const float NimionRako = 3f;
        /// <summary>Kartografin kehän etäisyydet pisteinä (web KAUPUNGIN_KEHA [7, 13]).</summary>
        public static readonly float[] KaupunginKeha = { 7f, 13f };
        /// <summary>Pelimerkin varauksen lisävara pisteinä (web js/pallolauta/nimet.js PELIMERKIN_VARA_PX).</summary>
        public const float PelimerkinVara = 4f;
        /// <summary>Laatikon rako tekstin ympärillä pisteinä (vaaka, pysty).</summary>
        public const float NimenRakoX = 2f, NimenRakoY = 2f;

        /// <summary>
        /// KAUPUNGIN NIMEN EHDOKKAAT (web js/karttanimet.js sijoitaKaupunginNimi) järjestyksessä: (laudan oma
        /// asettelu lisätään kutsujassa eteen, <see cref="OmaPaikka"/>) pelimerkkipinon väistökehä, jos piste on
        /// pinon sisällä (ylös, oikealle, vasemmalle, alas — omistaja 2.9.2026 "ensisijaisesti ylös"), sitten neljä
        /// tavanomaista paikkaa (oikea, vasen, ylä, ala) ja kartografin kehä kahdeksaan suuntaan kahdella
        /// etäisyydellä. Web mittaa perusviivasta y alas; tässä Dy on tekstin keskipiste y ylös, ja muunnos on
        /// keskipiste = perusviiva − 0,35 × kork (webin oikea paikka dy = 0,35 × kork on pisteen korkeudella).
        /// pino = pinon laatikko pisteen suhteen (null = ei pinoa), kerroin = pikseliä pisteelle.
        /// </summary>
        public static void NimenPaikat(float kirjain, float sivu, Ruutulaatikko? pino, float kerroin, List<NimenPaikka> ulos)
        {
            ulos.Clear();
            float kork = kirjain * 1.15f, rako = NimionRako * kerroin, d = sivu;
            if (pino is Ruutulaatikko p)
            {
                // Web: ylös dy = pino.y0 − y − 0,42k − rako, oikea/vasen pinon kyljestä rako + 1, alas pino.y1 + 0,62k + rako.
                ulos.Add(new NimenPaikka(0, p.Y1 + 0.77f * kork + rako, NimenAnkkuri.Keski));
                ulos.Add(new NimenPaikka(p.X1 + rako + kerroin, 0, NimenAnkkuri.Alku));
                ulos.Add(new NimenPaikka(p.X0 - rako - kerroin, 0, NimenAnkkuri.Loppu));
                ulos.Add(new NimenPaikka(0, p.Y0 - 0.27f * kork - rako, NimenAnkkuri.Keski));
            }
            // Tavanomaiset: web dy 0,35k / −0,75k / 1,35k perusviivasta.
            ulos.Add(new NimenPaikka(d, 0, NimenAnkkuri.Alku));
            ulos.Add(new NimenPaikka(-d, 0, NimenAnkkuri.Loppu));
            ulos.Add(new NimenPaikka(0, 1.1f * kork, NimenAnkkuri.Keski));
            ulos.Add(new NimenPaikka(0, -1.0f * kork, NimenAnkkuri.Keski));
            foreach (float perus in KaupunginKeha)
            {
                float pituus = perus * kerroin, vino = pituus * 0.7f;
                ulos.Add(new NimenPaikka(d + pituus, 0, NimenAnkkuri.Alku));
                ulos.Add(new NimenPaikka(-(d + pituus), 0, NimenAnkkuri.Loppu));
                ulos.Add(new NimenPaikka(0, 1.1f * kork + pituus, NimenAnkkuri.Keski));
                ulos.Add(new NimenPaikka(0, -1.0f * kork - pituus, NimenAnkkuri.Keski));
                ulos.Add(new NimenPaikka(d + vino, vino, NimenAnkkuri.Alku));
                ulos.Add(new NimenPaikka(d + vino, -vino, NimenAnkkuri.Alku));
                ulos.Add(new NimenPaikka(-(d + vino), vino, NimenAnkkuri.Loppu));
                ulos.Add(new NimenPaikka(-(d + vino), -vino, NimenAnkkuri.Loppu));
            }
        }

        /// <summary>Nimen laatikko ruudulla: teksti leveys × korkeus paikassa, rako ympärillä.</summary>
        public static Ruutulaatikko NimenLaatikko(float x, float y, NimenPaikka p, float leveys, float korkeus, float kerroin)
        {
            float ax = x + p.Dx;
            float x0 = p.Ank == NimenAnkkuri.Alku ? ax : p.Ank == NimenAnkkuri.Loppu ? ax - leveys : ax - leveys * 0.5f;
            float cy = y + p.Dy, rx = NimenRakoX * kerroin, ry = NimenRakoY * kerroin;
            return new Ruutulaatikko(x0 - rx, cy - korkeus * 0.5f - ry, x0 + leveys + rx, cy + korkeus * 0.5f + ry);
        }

        /// <summary>
        /// KAUPUNKIEN LADONTA (löydös 50 vaihe 2, web js/karttanimet.js ladoRuutunimet): varauksissa on jo nostojen
        /// ikonit; ensin varataan KAIKKIEN kaupunkien pisteet (pelimerkit pysyvät paikallaan), sitten nimiöt
        /// järjestyksessä. Nimiö näytetään, jos se ei osu mihinkään varattuun paitsi omaan pisteeseensä (nimiö alkaa
        /// pisteen keskeltä); pakollinen näytetään aina. Näytetty nimiö varataan. naytetaan[i] = ehdokkaan i nimiö.
        /// </summary>
        public static void LadoKaupungit(List<KaupunkiEhdokas> ehdokkaat, Ruutuvaraukset varaukset, List<bool> naytetaan)
        {
            naytetaan.Clear();
            foreach (var e in ehdokkaat) varaukset.Varaa(e.Piste);
            foreach (var e in ehdokkaat)
            {
                bool nakyy = e.Pakko || (e.Sallittu && !varaukset.OsuuPaitsi(e.Nimio, e.Piste));
                if (nakyy) varaukset.Varaa(e.Nimio);
                naytetaan.Add(nakyy);
            }
        }

        /// <summary>
        /// KAUPUNKIEN LADONTA EHDOKASKEHÄLLÄ (web js/karttanimet.js ladoRuutunimet + js/pallolauta/nimet.js LUKKO):
        /// 1) pelimerkkien pinot (<paramref name="pinot"/>, jo laajennettuina) ja kaikkien kaupunkien pisteet
        /// varataan ensin; 2) nimet järjestyksessä: pakollinen kiinteään laatikkoonsa; lukittu vain lukittuun
        /// paikkaansa (se ei vaihda kylkeä: jos paikka on varattu, nimi on tämän kehyksen piilossa); muut ottavat
        /// ensimmäisen vapaan ehdokkaan (<see cref="NimenPaikat"/>), joka mahtuu ruutuun (web RUUDUN ULKOPUOLI ON
        /// ESTE; lukittu saa leikkautua). Tulos: naytetaan[i] ja paikat[i] (uusi lukko, jos näytetään ehdokkaasta).
        /// </summary>
        public static void LadoKaupungit(List<KaupunkiEhdokas> ehdokkaat, IReadOnlyList<Ruutulaatikko> pinot, Ruutulaatikko ruutu,
                                         float kerroin, Ruutuvaraukset varaukset, List<bool> naytetaan, List<NimenPaikka> paikat)
        {
            naytetaan.Clear();
            paikat.Clear();
            if (pinot != null) foreach (var r in pinot) varaukset.Varaa(r);
            foreach (var e in ehdokkaat) varaukset.Varaa(e.Piste);
            float sieto = kerroin;
            var sisalla = new Ruutulaatikko(ruutu.X0 - sieto, ruutu.Y0 - sieto, ruutu.X1 + sieto, ruutu.Y1 + sieto);
            foreach (var e in ehdokkaat)
            {
                var paikka = e.Lukko;
                bool nakyy;
                if (e.Pakko) nakyy = true;
                else if (!e.Sallittu) nakyy = false;
                else if (e.Leveys <= 0) nakyy = !varaukset.OsuuPaitsi(e.Nimio, e.Piste);
                else if (e.Lukittu) nakyy = !varaukset.OsuuPaitsi(NimenLaatikko(e.X, e.Y, e.Lukko, e.Leveys, e.Korkeus, kerroin), e.Piste);
                else
                {
                    nakyy = false;
                    Ruutulaatikko? pino = null;
                    if (pinot != null)
                        foreach (var r in pinot)
                        {
                            if (e.X < r.X0 || e.X > r.X1 || e.Y < r.Y0 || e.Y > r.Y1) continue;
                            var s = new Ruutulaatikko(r.X0 - e.X, r.Y0 - e.Y, r.X1 - e.X, r.Y1 - e.Y);
                            pino = pino is Ruutulaatikko q ? new Ruutulaatikko(Math.Min(q.X0, s.X0), Math.Min(q.Y0, s.Y0), Math.Max(q.X1, s.X1), Math.Max(q.Y1, s.Y1)) : s;
                        }
                    NimenPaikat(e.Kirjain, e.Sivu, pino, kerroin, ehdokasPaikat);
                    if (e.OnOma) ehdokasPaikat.Insert(0, e.Oma);
                    foreach (var p in ehdokasPaikat)
                    {
                        var l = NimenLaatikko(e.X, e.Y, p, e.Leveys, e.Korkeus, kerroin);
                        if (l.X0 < sisalla.X0 || l.Y0 < sisalla.Y0 || l.X1 > sisalla.X1 || l.Y1 > sisalla.Y1) continue;
                        if (varaukset.OsuuPaitsi(l, e.Piste)) continue;
                        paikka = p;
                        nakyy = true;
                        break;
                    }
                }
                if (nakyy)
                    varaukset.Varaa(e.Pakko || e.Leveys <= 0 ? e.Nimio : NimenLaatikko(e.X, e.Y, paikka, e.Leveys, e.Korkeus, kerroin));
                naytetaan.Add(nakyy);
                paikat.Add(paikka);
            }
        }

        static readonly List<NimenPaikka> ehdokasPaikat = new List<NimenPaikka>();

        /// <summary>
        /// Noston merkki ja nimiö ruudulla (Natiivi-UI:n NostotKartalla.Laatikko samoin mitoin): symboli 20 × 20 pt
        /// pisteen ympärillä, nimiö oikealla 0,55 em/merkki (11 pt, tärkeillä 13,5 pt). x, y pikseleinä, kerroin
        /// = pikseliä pisteelle. EI OLE NIMIEN VARAUS (löydös 50 vaihe 2): nimet väistävät vain noston ikonia
        /// (<see cref="NostonIkonilaatikko"/>); lappu väistää nimiä jälkeenpäin sovittelussa.
        /// </summary>
        public static Ruutulaatikko NostonLaatikko(float x, float y, string nimio, int tarkeys, float kerroin)
        {
            float koko = tarkeys >= 2 ? 13.5f : 11f;
            float leveys = 12f + (string.IsNullOrEmpty(nimio) ? 0f : 2f + nimio.Length * koko * 0.55f);
            return new Ruutulaatikko(x - 10f * kerroin, y - 10f * kerroin, x + leveys * kerroin, y + 10f * kerroin);
        }

        // ---- NOSTON IKONI (löydös 50 vaihe 2) ----------------------------------------------------------------
        //
        // WEB (js/pallolauta/nostot.js:3835–3880, KIINTEÄ MUSTE ON NIMILADONNAN VARAUS, LIIKKUVA EI): nimiladonta
        // väistää elävästä nostosta vain IKONIN (nostonLaatikko / aihemerkinLaatikko nimio:false), koska ikoni on
        // kiinni karttapisteessään. Nimiöllisen noston LAPPU ei ole varaus: se väistää nimiä jälkeenpäin
        // (nostot.sovittele levossa, natiivissa Natiivi-UI:n NostotKartalla.Sovita). Poltettujen nostojen koko
        // muste on webissä varaus, mutta natiivissa nostoja ei polteta laattoihin, joten vastinetta ei ole.
        // Mitoitus on sama kuin Natiivi-UI:n NostotKartalla.Hae (web nostot.js:633 ja fokusnosto-symbolit.js):
        //   mitta = min(katto(k) / 11, 8,5/11 × k × oma), oma 11,5/8,5 kaupungeilla, 1,3 tasolla 1, muuten 1;
        //   katto(k) = 16 px kertoimeen 2, log2-lineaarisesti 22 px:iin kertoimessa 4 (k = NostoKerros.ZoomKerroin);
        //   ikoniruudun puolikas = 7,4 × mitta, tason 1 kuvamerkillä × 1,6.

        /// <summary>Aiheet, joilla on kuvamerkki (webin KARTTASELITE_MERKIT, Natiivi-UI NostoMerkit.Jarjestys Kuvat).</summary>
        public static readonly HashSet<string> KuvamerkinAiheet = new HashSet<string> { "historia", "luonto", "kulttuuri", "kauppa" };

        /// <summary>
        /// Noston ikoniruudun puolikas ruutupisteinä (ilman nimiötä): Natiivi-UI:n Merkki.Ruutu × Merkki.Mitta.
        /// zoomKerroin = NostoKerros.ZoomKerroin. Ryhmämerkit (koelippu Aihemerkit) mitoitetaan kuin yksittäiset.
        /// </summary>
        public static float NostonIkoninPuolikas(int taso, string aihe, float zoomKerroin)
        {
            bool kaupunki = aihe == "kaupungit", taso1 = taso == 1;
            float oma = kaupunki ? 11.5f / 8.5f : taso1 ? 1.3f : 1f;
            float k = zoomKerroin;
            float katto = k <= 2f ? 16f : k >= 4f ? 22f : 16f + 6f * (float)Math.Log(k / 2.0, 2.0);
            float mitta = Math.Min(katto / 11f, 8.5f / 11f * k * oma);
            bool kuvamerkki = taso1 && aihe != null && KuvamerkinAiheet.Contains(aihe);
            return 7.4f * (kuvamerkki ? 1.6f : 1f) * mitta;
        }

        /// <summary>
        /// Noston IKONI ruudulla ilman nimiötä (webin nostonLaatikko nimio:false): neliö pisteen ympärillä. x, y
        /// pikseleinä (origo vasen alakulma, kuten NostoKerros.Nosto.Ruutu), kerroin = pikseliä pisteelle.
        /// </summary>
        public static Ruutulaatikko NostonIkonilaatikko(float x, float y, int taso, string aihe, float zoomKerroin, float kerroin)
        {
            float p = NostonIkoninPuolikas(taso, aihe, zoomKerroin) * kerroin;
            return new Ruutulaatikko(x - p, y - p, x + p, y + p);
        }

        /// <summary>
        /// LADOTTUJEN NIMIEN LAATIKOT (webin nimet.laatikot() -vastine): yhteisen varauslistan kaupunkiosuus
        /// [<paramref name="alku"/>, <paramref name="loppu"/>) (KaupunkiMerkit: pisteet ja nimiöt; alussa olevat
        /// nostoikonit ohitetaan) ja näytettäväksi ladottujen aluenimien laatikot ilman väistön varaa.
        /// <paramref name="ladotut"/> on <see cref="Lado"/>n tulos samasta (jo järjestetystä) ehdokaslistasta, joten
        /// se on ehdokkaiden järjestyksessä.
        /// </summary>
        public static void NimienLaatikot(IReadOnlyList<Ruutulaatikko> varaukset, int alku, int loppu, List<Ehdokas> ehdokkaat,
            List<int> ladotut, List<Ruutulaatikko> ulos)
        {
            ulos.Clear();
            int n = Math.Min(loppu, varaukset.Count);
            for (int i = Math.Max(0, alku); i < n; i++) ulos.Add(varaukset[i]);
            int j = 0;
            foreach (var e in ehdokkaat)
            {
                if (j >= ladotut.Count) break;
                if (e.Indeksi != ladotut[j]) continue;
                ulos.Add(e.Laatikko);
                j++;
            }
        }

        /// <summary>Ovatko laatikkolistat samat (järjestys mukaan, tarkka vertailu).</summary>
        public static bool Samat(IReadOnlyList<Ruutulaatikko> a, IReadOnlyList<Ruutulaatikko> b)
        {
            if (a.Count != b.Count) return false;
            for (int i = 0; i < a.Count; i++)
            {
                var x = a[i];
                var y = b[i];
                if (x.X0 != y.X0 || x.Y0 != y.Y0 || x.X1 != y.X1 || x.Y1 != y.Y1) return false;
            }
            return true;
        }

        // ---- TYYLI -------------------------------------------------------------------------------------------

        /// <summary>"rgba(58, 66, 84, 0.62)" tai "#rrggbb" → [r, g, b, a] 0–1; muu → null.</summary>
        public static double[] Rgba(string css)
        {
            if (string.IsNullOrEmpty(css)) return null;
            css = css.Trim();
            if (css.StartsWith("#") && (css.Length == 7 || css.Length == 9))
            {
                double H(int i) => int.Parse(css.Substring(i, 2), NumberStyles.HexNumber, CultureInfo.InvariantCulture) / 255.0;
                return new[] { H(1), H(3), H(5), css.Length == 9 ? H(7) : 1.0 };
            }
            int a = css.IndexOf('('), b = css.LastIndexOf(')');
            if (a < 0 || b <= a) return null;
            var osat = css.Substring(a + 1, b - a - 1).Split(',');
            if (osat.Length < 3) return null;
            var v = new double[4];
            for (int i = 0; i < 3; i++)
                if (!double.TryParse(osat[i].Trim(), NumberStyles.Float, CultureInfo.InvariantCulture, out v[i])) return null; else v[i] /= 255.0;
            v[3] = 1.0;
            if (osat.Length > 3 && !double.TryParse(osat[3].Trim(), NumberStyles.Float, CultureInfo.InvariantCulture, out v[3])) return null;
            return v;
        }

        /// <summary>Rivin väri: tyylin vari, muuten tyylin varit[muste] (nykyalueet), muuten ruoste.</summary>
        public static double[] Vari(Nimityyli t, string muste)
        {
            if (t == null) return new[] { 70 / 255.0, 48 / 255.0, 29 / 255.0, 0.58 };
            if (t.Vari != null) return t.Vari;
            if (muste != null && t.Varit.TryGetValue(muste, out var v)) return v;
            if (t.Varit.TryGetValue("ruoste", out v)) return v;
            foreach (var x in t.Varit.Values) return x;
            return new[] { 70 / 255.0, 48 / 255.0, 29 / 255.0, 0.58 };
        }

        // ---- LINEAARINEN SEKOITUS (webin sRGB-sekoituksen vastine) ----------------------------------------------
        //
        // Projekti on lineaarisessa väriavaruudessa, joten GPU sekoittaa alfan lineaarisilla arvoilla, kun selain
        // sekoittaa sRGB-arvoilla: sama rgba näyttää natiivissa vaaleammalta (Natiivi-UI mittasi UITK:ssa
        // rgba(33,29,24,.82) → 117 eikä 58). Korjaus säilyttää värin c ja vaihtaa alfan niin, että lineaarinen
        // sekoitus tyypillisellä pohjalla B antaa saman luminanssin kuin webin sRGB-sekoitus:
        //   a' = (Y(B) − Y(a·c + (1−a)·B)) / (Y(B) − Y(c)),  rajattuna välille [a, 1],
        // missä sekoitus a·c + (1−a)·B lasketaan sRGB-arvoilla kanavittain ja Y = 0,2126 R + 0,7152 G + 0,0722 B
        // lineaarisista (sRGB → lineaarinen) kanavista.
        // B mitattu pohjasarjan 2026-09-23a laatoista Z6–Z7 (kuvan mediaani, 24.9.2026):
        //   maa  #f0e1ab (240, 225, 171): Ranska, Saksa, Puola (Espanja #eac787 jätetty pois, kuiva ja tumma),
        //   meri #d4cdba (212, 205, 186): Välimeri, Biskaja, Pohjanmeri, Itämeri.
        // Maakunnat ja nykyalueet lasketaan maan pohjalla, meret ja valtameret meren pohjalla.

        /// <summary>Tyypillinen maan pohja (sRGB 0–1), mitattu pohjasarjan 23a laatoista.</summary>
        public static readonly double[] PohjaMaa = { 240 / 255.0, 225 / 255.0, 171 / 255.0 };
        /// <summary>Tyypillinen meren pohja (sRGB 0–1), mitattu pohjasarjan 23a laatoista.</summary>
        public static readonly double[] PohjaMeri = { 212 / 255.0, 205 / 255.0, 186 / 255.0 };

        /// <summary>sRGB-kanava (0–1) → lineaarinen.</summary>
        public static double Lineaarinen(double c) => c <= 0.04045 ? c / 12.92 : Math.Pow((c + 0.055) / 1.055, 2.4);

        /// <summary>Luminanssi sRGB-väristä (0–1) lineaarisilla kanavilla.</summary>
        public static double Luminanssi(double r, double g, double b) =>
            0.2126 * Lineaarinen(r) + 0.7152 * Lineaarinen(g) + 0.0722 * Lineaarinen(b);

        /// <summary>
        /// Alfa a', jolla lineaarinen sekoitus värillä c pohjalla B vastaa webin sRGB-sekoitusta alfalla a
        /// (kaava yllä); rajattu välille [a, 1]. c ja pohja sRGB 0–1 (c:n neljäs alkio ohitetaan).
        /// </summary>
        public static double LineaarinenAlfa(double[] c, double a, double[] pohja)
        {
            if (c == null || pohja == null || a <= 0 || a >= 1) return a;
            double yb = Luminanssi(pohja[0], pohja[1], pohja[2]);
            double yc = Luminanssi(c[0], c[1], c[2]);
            if (Math.Abs(yb - yc) < 1e-6) return a;
            double ym = Luminanssi(a * c[0] + (1 - a) * pohja[0], a * c[1] + (1 - a) * pohja[1], a * c[2] + (1 - a) * pohja[2]);
            double uusi = (yb - ym) / (yb - yc);
            return Math.Min(1.0, Math.Max(a, uusi));
        }

        /// <summary>Luokan tyypillinen pohja: meri ja valtameri meren päällä, muut maan.</summary>
        public static double[] Pohja(string luokka) => luokka == "meri" || luokka == "valtameri" ? PohjaMeri : PohjaMaa;

        /// <summary>
        /// TextMeshPron rich text rivin tekstistä: versaali ja pienkapiteeli (nykyalue: alkuperäiset isot kirjaimet
        /// täysikokoisina, pienet versaaleina kertoimella, esim. "Grand Est" → G&lt;size=78%&gt;RAND&lt;/size&gt; E…).
        /// </summary>
        public static string Muotoile(string teksti, bool versaali, double pienkapiteeli)
        {
            if (string.IsNullOrEmpty(teksti)) return "";
            if (pienkapiteeli <= 0 || pienkapiteeli >= 1) return versaali ? teksti.ToUpperInvariant() : teksti;
            string koko = "<size=" + Math.Round(pienkapiteeli * 100).ToString(CultureInfo.InvariantCulture) + "%>";
            var sb = new StringBuilder(teksti.Length + 32);
            bool pieni = false;
            foreach (char c in teksti)
            {
                bool p = char.IsLower(c);
                if (p != pieni) { sb.Append(p ? koko : "</size>"); pieni = p; }
                sb.Append(p ? char.ToUpperInvariant(c) : c);
            }
            if (pieni) sb.Append("</size>");
            return sb.ToString();
        }
    }
}
