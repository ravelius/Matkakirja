// LIVIAN PIIRTOPRIMITIIVIT (Natiivi-UI, 23.9.2026).
//
// Webin Livia on SVG-merkkijono, joka rakennetaan joka ruudussa uudelleen
// (innerHTML); juuri se nyki kartan zoomissa. Natiivissa asennosta kootaan
// ruudun primitiivilista (Kokoaja): polku, täyttö- ja viivaväri, viivan
// paksuus, peittävyys ja SVG-ryhmien sisäkkäisistä transformeista koottu
// 2D-affiinimatriisi (Affiini, SVG:n translate/rotate/scale/matrix-semantiikka).
// Kiinteät polut jäsennetään kerran (SvgPolku.Jasenna muistaa merkkijonon) ja
// liike tulee matriiseista; vain aidosti muuttuva geometria (silmäluomet,
// nokan ammotus, jalat, sivu, …) kirjoitetaan suoraan komentoina Dyn-listaan
// ilman merkkijonoja. Listat kierrätetään: koonti ei varaa muistia per ruutu.
//
// Poikkeamat SVG:stä (dokumentoitu tarkoituksella):
//  - Ryhmän peittävyys kerrotaan jokaisen lapsen väriin (SVG:ssä ryhmä
//    sommitellaan kerran). Ero näkyy vain, kun saman ryhmän osat menevät
//    päällekkäin puoliläpinäkyvinä (siiven ristihäive).
//  - clip-path (silmät): ellipsiin rajaus tehdään geometrisesti
//    Sutherland–Hodgman-leikkauksella (ellipsi on kupera), joten luomi,
//    pupilli ja iiris rajautuvat silmään tarkasti kuten webissä.
//  - mask (pullan puraisut, mustat ympyrät): täytöstä vähennetään ympyrä
//    (Weiler–Atherton ympyrälle; kokonaan sisään jäävä ympyrä = reikä) ja
//    viivoista jätetään pois ympyrän sisään jäävät palat.
//  - Säteittäinen liukuväri (maavarjo) = sisäkkäiset ellipsit portaittaisella
//    peittävyydellä.
//  - Viivan paksuus skaalautuu matriisin determinantin neliöjuurella
//    (epätasainen skaalaus ei venytä viivaa suuntakohtaisesti).
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>SVG:n matrix(a b c d e f): x' = a·x + c·y + e, y' = b·x + d·y + f.</summary>
    internal readonly struct Affiini
    {
        public readonly float A, B, C, D, E, F;
        public Affiini(float a, float b, float c, float d, float e, float f) { A = a; B = b; C = c; D = d; E = e; F = f; }

        public static readonly Affiini Yksikko = new Affiini(1, 0, 0, 1, 0, 0);

        /// <summary>m · n: n sovelletaan ensin (SVG:n transform-listan järjestys).</summary>
        public static Affiini operator *(in Affiini m, in Affiini n) => new Affiini(
            m.A * n.A + m.C * n.B, m.B * n.A + m.D * n.B,
            m.A * n.C + m.C * n.D, m.B * n.C + m.D * n.D,
            m.A * n.E + m.C * n.F + m.E, m.B * n.E + m.D * n.F + m.F);

        public Affiini Siirra(float x, float y) => new Affiini(A, B, C, D, A * x + C * y + E, B * x + D * y + F);
        public Affiini Skaalaa(float sx, float sy) => new Affiini(A * sx, B * sx, C * sy, D * sy, E, F);
        public Affiini Skaalaa(float s) => Skaalaa(s, s);

        public Affiini Kierra(float asteet)
        {
            float r = asteet * Mathf.Deg2Rad, c = Mathf.Cos(r), s = Mathf.Sin(r);
            return this * new Affiini(c, s, -s, c, 0, 0);
        }

        /// <summary>SVG:n rotate(a cx cy).</summary>
        public Affiini Kierra(float asteet, float cx, float cy) => Siirra(cx, cy).Kierra(asteet).Siirra(-cx, -cy);

        public Vector2 Kuvaa(Vector2 p) => new Vector2(A * p.x + C * p.y + E, B * p.x + D * p.y + F);
        public float Determinantti => A * D - B * C;
        public float Mittakaava => Mathf.Sqrt(Mathf.Abs(A * D - B * C));
    }

    /// <summary>Yksi piirrettävä polku.</summary>
    internal struct LiviaOsa
    {
        /// <summary>Kiinteä polku; null = Dyn[Alku .. Alku+Maara).</summary>
        public SvgPolku Polku;
        public int Alku, Maara;
        public Affiini M;
        /// <summary>Täyttö ja viiva; alfa 0 = ei.</summary>
        public Color Tayte, Viiva;
        public float Leveys;
        public bool Pyorea;
        /// <summary>Rajausellipsin indeksi (Leikkeet), −1 = ei rajausta.</summary>
        public int Leike;
        /// <summary>Puraisumaskin ympyrät Maskit[MaskiAlku ..], 0 = ei maskia.</summary>
        public int MaskiAlku, MaskiMaara;
    }

    /// <summary>Primitiivilistan koonti SVG:n ryhmäpinolla.</summary>
    internal sealed class Kokoaja
    {
        public readonly List<LiviaOsa> Osat = new List<LiviaOsa>(160);
        public readonly List<SvgPolku.Komento> Dyn = new List<SvgPolku.Komento>(512);
        /// <summary>Rajausellipsit (cx, cy, rx, ry) samassa koordinaatistossa kuin rajattava polku.</summary>
        public readonly List<Vector4> Leikkeet = new List<Vector4>(8);
        /// <summary>Puraisumaskien ympyrät (cx, cy, r) maskattavan polun koordinaatistossa.</summary>
        public readonly List<Vector3> Maskit = new List<Vector3>(8);

        readonly Affiini[] pino = new Affiini[32];
        readonly float[] alfaPino = new float[32];
        int syvyys;
        public Affiini Nyt = Affiini.Yksikko;
        public float Alfa = 1;
        int leike = -1, dynAlku, maskiAlku, maskiMaara;
        Vector2 kyna, alkuPiste;

        public void Tyhjenna()
        {
            Osat.Clear(); Dyn.Clear(); Leikkeet.Clear(); Maskit.Clear();
            syvyys = 0; Nyt = Affiini.Yksikko; Alfa = 1; leike = -1; maskiMaara = 0;
        }

        // --- ryhmät ----------------------------------------------------------------

        /// <summary>&lt;g transform="…" opacity="…"&gt;</summary>
        public void Ryhma(in Affiini paikallinen, float alfa = 1)
        {
            pino[syvyys] = Nyt; alfaPino[syvyys] = Alfa; syvyys++;
            Nyt = Nyt * paikallinen;
            Alfa *= Mathf.Clamp01(alfa);
        }

        public void Ryhma(float alfa) => Ryhma(Affiini.Yksikko, alfa);

        public void Loppu()
        {
            syvyys--;
            Nyt = pino[syvyys]; Alfa = alfaPino[syvyys];
        }

        /// <summary>clip-path: seuraavat täytöt rajataan ellipsiin (nykyisessä koordinaatistossa).</summary>
        public void Rajaa(float cx, float cy, float rx, float ry)
        {
            Leikkeet.Add(new Vector4(cx, cy, rx, ry));
            leike = Leikkeet.Count - 1;
        }

        public void RajausLoppu() => leike = -1;

        /// <summary>SVG-maski, jossa mustat ympyrät valkoisella: seuraavista osista puraistaan ympyrät pois.</summary>
        public void MaskiAlkaa() { maskiAlku = Maskit.Count; maskiMaara = 0; }
        public void Puraisu(float cx, float cy, float r) { Maskit.Add(new Vector3(cx, cy, r)); maskiMaara++; }
        public void MaskiLoppu() => maskiMaara = 0;

        static Color Kerro(Color c, float a) { c.a *= a; return c; }

        void Lisaa(SvgPolku polku, int alku, int maara, Color tayte, Color viiva, float leveys, bool pyorea)
        {
            if (Alfa <= 0.001f) return;
            Osat.Add(new LiviaOsa
            {
                Polku = polku, Alku = alku, Maara = maara, M = Nyt,
                Tayte = Kerro(tayte, Alfa), Viiva = Kerro(viiva, Alfa), Leveys = leveys, Pyorea = pyorea, Leike = leike,
                MaskiAlku = maskiAlku, MaskiMaara = maskiMaara,
            });
        }

        // --- kiinteät polut (jäsennetään kerran) -------------------------------------

        public void Tayta(string d, Color c) => Lisaa(SvgPolku.Jasenna(d), 0, 0, c, default, 0, false);
        public void Viiva(string d, Color c, float leveys, bool pyorea = true) => Lisaa(SvgPolku.Jasenna(d), 0, 0, default, c, leveys, pyorea);
        public void TaytaJaViiva(string d, Color tayte, Color viiva, float leveys, bool pyorea = false) => Lisaa(SvgPolku.Jasenna(d), 0, 0, tayte, viiva, leveys, pyorea);

        /// <summary>Kiinteä polku siirrettynä (webin polut, joissa vain alkupiste muuttuu: M x y + suhteelliset).</summary>
        public void TaytaKohtaan(string d, float x, float y, Color c)
        {
            Ryhma(Affiini.Yksikko.Siirra(x, y));
            Tayta(d, c);
            Loppu();
        }

        public void ViivaKohtaan(string d, float x, float y, Color c, float leveys, bool pyorea = true)
        {
            Ryhma(Affiini.Yksikko.Siirra(x, y));
            Viiva(d, c, leveys, pyorea);
            Loppu();
        }

        // --- muuttuva geometria --------------------------------------------------------

        public void Alku() { dynAlku = Dyn.Count; }
        public void M(float x, float y) { kyna = alkuPiste = new Vector2(x, y); Dyn.Add(new SvgPolku.Komento(SvgPolku.Laji.Siirry, kyna)); }
        public void L(float x, float y) { kyna = new Vector2(x, y); Dyn.Add(new SvgPolku.Komento(SvgPolku.Laji.Viiva, kyna)); }
        /// <summary>Suhteellinen l.</summary>
        public void Lr(float dx, float dy) => L(kyna.x + dx, kyna.y + dy);
        /// <summary>Suhteellinen m.</summary>
        public void Mr(float dx, float dy) => M(kyna.x + dx, kyna.y + dy);

        public void C(float x1, float y1, float x2, float y2, float x, float y)
        {
            Dyn.Add(new SvgPolku.Komento(SvgPolku.Laji.Kaari3, new Vector2(x1, y1), new Vector2(x2, y2), new Vector2(x, y)));
            kyna = new Vector2(x, y);
        }

        /// <summary>Q neliöllisenä Bézierinä (muunnetaan kuutiolliseksi kuten SvgPolku).</summary>
        public void Q(float qx, float qy, float x, float y)
        {
            var q = new Vector2(qx, qy); var e = new Vector2(x, y);
            var a = kyna + 2f / 3f * (q - kyna); var b = e + 2f / 3f * (q - e);
            Dyn.Add(new SvgPolku.Komento(SvgPolku.Laji.Kaari3, a, b, e));
            kyna = e;
        }

        public void Qr(float dqx, float dqy, float dx, float dy) => Q(kyna.x + dqx, kyna.y + dqy, kyna.x + dx, kyna.y + dy);

        public void Z() { Dyn.Add(new SvgPolku.Komento(SvgPolku.Laji.Sulje)); kyna = alkuPiste; }

        /// <summary>Ellipsi neljänä kuutiollisena kaarena (lineaarinen cx, cy, rx, ry:n suhteen).</summary>
        public void Ellipsi(float cx, float cy, float rx, float ry)
        {
            const float K = 0.5522848f;
            float kx = rx * K, ky = ry * K;
            M(cx + rx, cy);
            C(cx + rx, cy + ky, cx + kx, cy + ry, cx, cy + ry);
            C(cx - kx, cy + ry, cx - rx, cy + ky, cx - rx, cy);
            C(cx - rx, cy - ky, cx - kx, cy - ry, cx, cy - ry);
            C(cx + kx, cy - ry, cx + rx, cy - ky, cx + rx, cy);
            Z();
        }

        public void TaytaDyn(Color c) => Lisaa(null, dynAlku, Dyn.Count - dynAlku, c, default, 0, false);
        public void ViivaDyn(Color c, float leveys, bool pyorea = true) => Lisaa(null, dynAlku, Dyn.Count - dynAlku, default, c, leveys, pyorea);
        public void TaytaJaViivaDyn(Color tayte, Color viiva, float leveys, bool pyorea = false) => Lisaa(null, dynAlku, Dyn.Count - dynAlku, tayte, viiva, leveys, pyorea);

        public void TaytaEllipsi(float cx, float cy, float rx, float ry, Color c) { Alku(); Ellipsi(cx, cy, rx, ry); TaytaDyn(c); }

        /// <summary>
        /// Säteittäinen maavarjo (webin radialGradient: .58 → .32 @ 55 % → 0)
        /// sisäkkäisinä ellipseinä: rengas j saa peittävyyden, jolla kertynyt
        /// peittävyys vastaa liukuväriä renkaan keskisäteellä.
        /// </summary>
        public void Varjo(float cx, float cy, float rx, float ry, Color vari, float peitto)
        {
            const int Renkaat = 8;
            float edellinen = 0;
            for (int j = 0; j < Renkaat; j++)
            {
                float t = (Renkaat - j - .5f) / Renkaat;
                float g = t < .55f ? Mathf.Lerp(.58f, .32f, t / .55f) : Mathf.Lerp(.32f, 0f, (t - .55f) / .45f);
                float tavoite = g * peitto;
                float a = 1 - (1 - tavoite) / Mathf.Max(1e-4f, 1 - edellinen);
                edellinen = tavoite;
                if (a <= 0.002f) continue;
                float r = (float)(Renkaat - j) / Renkaat;
                var c = vari; c.a = a;
                TaytaEllipsi(cx, cy, rx * r, ry * r, c);
            }
        }

        // --- värit -------------------------------------------------------------------

        /// <summary>"#rrggbb" → Color (sRGB kuten USS-värit).</summary>
        public static Color Vari(string hex, float alfa = 1)
        {
            int Hex(char c) => c <= '9' ? c - '0' : (c | 0x20) - 'a' + 10;
            int i = hex[0] == '#' ? 1 : 0;
            float K(int k) => (Hex(hex[i + k]) * 16 + Hex(hex[i + k + 1])) / 255f;
            return new Color(K(0), K(2), K(4), alfa);
        }
    }

    /// <summary>Kokoajan primitiivien piirto Painter2D:llä.</summary>
    internal static class LiviaMaalari
    {
        const int KaariPaloja = 10;
        const float ViivaPala = 2f;
        static readonly List<Vector2> monikulmio = new List<Vector2>(256), tulos = new List<Vector2>(256);
        static readonly List<int> aliAlut = new List<int>(8), tulosAlut = new List<int>(8);
        static readonly List<bool> suljetut = new List<bool>(8);
        static readonly List<Vector2> leikattu = new List<Vector2>(256), vali = new List<Vector2>(256), rajaus = new List<Vector2>(40);
        static readonly List<Vector2> puraistu = new List<Vector2>(256);
        static readonly List<int> puraistuAlut = new List<int>(8);
        static readonly List<Vector3> reiat = new List<Vector3>(4), ulostulot = new List<Vector3>(8);
        static bool[] kaytetty = new bool[256];

        /// <summary>Piirtää osat [alku, loppu) näkymämatriisilla (viewBox → elementti).</summary>
        public static void Piirra(Painter2D p, Kokoaja k, int alku, int loppu, in Affiini nakyma)
        {
            p.lineJoin = LineJoin.Miter;
            p.miterLimit = 4;
            for (int i = alku; i < loppu && i < k.Osat.Count; i++)
            {
                var o = k.Osat[i];
                bool tayta = o.Tayte.a > 0.002f, viiva = o.Viiva.a > 0.002f && o.Leveys > 0;
                if (!tayta && !viiva) continue;
                var m = nakyma * o.M;
                if (o.Leike >= 0 || o.MaskiMaara > 0)
                {
                    if (tayta)
                    {
                        Monikulmiot(k, o, tulos, tulosAlut);
                        p.fillColor = o.Tayte;
                        if (Polut(p, tulos, tulosAlut, true, m)) p.Fill(o.MaskiMaara > 0 ? FillRule.OddEven : FillRule.NonZero);
                    }
                    if (viiva && o.MaskiMaara > 0)
                    {
                        Viivat(k, o, tulos, tulosAlut);
                        AsetaViiva(p, o, m);
                        if (Polut(p, tulos, tulosAlut, false, m)) p.Stroke();
                    }
                    continue;
                }
                p.BeginPath();
                bool tyhja = o.Polku != null
                    ? Polku(p, o.Polku.Komennot, 0, o.Polku.Komennot.Count, m)
                    : Polku(p, k.Dyn, o.Alku, o.Maara, m);
                if (tyhja) continue;
                if (tayta)
                {
                    p.fillColor = o.Tayte;
                    p.Fill(FillRule.NonZero);
                }
                if (viiva)
                {
                    AsetaViiva(p, o, m);
                    p.Stroke();
                }
            }
        }

        static void AsetaViiva(Painter2D p, in LiviaOsa o, in Affiini m)
        {
            p.strokeColor = o.Viiva;
            p.lineWidth = Mathf.Max(0.35f, o.Leveys * m.Mittakaava);
            p.lineCap = o.Pyorea ? LineCap.Round : LineCap.Butt;
        }

        static bool Polku(Painter2D p, List<SvgPolku.Komento> komennot, int alku, int maara, in Affiini m)
        {
            bool tyhja = true;
            for (int i = alku; i < alku + maara; i++)
            {
                var c = komennot[i];
                switch (c.Laji)
                {
                    case SvgPolku.Laji.Siirry: p.MoveTo(m.Kuvaa(c.A)); break;
                    case SvgPolku.Laji.Viiva: p.LineTo(m.Kuvaa(c.A)); tyhja = false; break;
                    case SvgPolku.Laji.Kaari3: p.BezierCurveTo(m.Kuvaa(c.A), m.Kuvaa(c.B), m.Kuvaa(c.C)); tyhja = false; break;
                    case SvgPolku.Laji.Sulje: p.ClosePath(); break;
                }
            }
            return tyhja;
        }

        static bool Polut(Painter2D p, List<Vector2> pisteet, List<int> alut, bool suljettu, in Affiini m)
        {
            p.BeginPath();
            bool jotain = false;
            for (int a = 0; a < alut.Count; a++)
            {
                int loppu = a + 1 < alut.Count ? alut[a + 1] : pisteet.Count;
                if (loppu - alut[a] < 2) continue;
                p.MoveTo(m.Kuvaa(pisteet[alut[a]]));
                for (int i = alut[a] + 1; i < loppu; i++) p.LineTo(m.Kuvaa(pisteet[i]));
                if (suljettu) p.ClosePath();
                jotain = true;
            }
            return jotain;
        }

        /// <summary>Polku osapolkuina (monikulmio, aliAlut, suljetut) paikallisessa koordinaatistossa.</summary>
        static void Tasoita(Kokoaja k, in LiviaOsa o)
        {
            monikulmio.Clear(); aliAlut.Clear(); suljetut.Clear();
            List<SvgPolku.Komento> lista; int alku, maara;
            if (o.Polku != null) { lista = o.Polku.Komennot; alku = 0; maara = lista.Count; }
            else { lista = k.Dyn; alku = o.Alku; maara = o.Maara; }
            Vector2 nyt = default, aloitus = default;
            bool pilko = o.MaskiMaara > 0; // maskissa pitkätkin suorat pilkotaan, jotta ympyrä osuu väliin
            for (int i = alku; i < alku + maara; i++)
            {
                var c = lista[i];
                switch (c.Laji)
                {
                    case SvgPolku.Laji.Siirry:
                        aliAlut.Add(monikulmio.Count); suljetut.Add(false);
                        nyt = aloitus = c.A; monikulmio.Add(nyt);
                        break;
                    case SvgPolku.Laji.Viiva:
                        if (pilko)
                        {
                            int n = Mathf.Max(1, Mathf.CeilToInt(Vector2.Distance(nyt, c.A) / ViivaPala));
                            for (int s = 1; s < n; s++) monikulmio.Add(Vector2.Lerp(nyt, c.A, (float)s / n));
                        }
                        nyt = c.A; monikulmio.Add(nyt);
                        break;
                    case SvgPolku.Laji.Kaari3:
                        for (int s = 1; s <= KaariPaloja; s++)
                        {
                            float t = (float)s / KaariPaloja, u = 1 - t;
                            monikulmio.Add(u * u * u * nyt + 3 * u * u * t * c.A + 3 * u * t * t * c.B + t * t * t * c.C);
                        }
                        nyt = c.C;
                        break;
                    case SvgPolku.Laji.Sulje:
                        if (suljetut.Count > 0) suljetut[suljetut.Count - 1] = true;
                        if (pilko && monikulmio.Count > 0)
                        {
                            int n = Mathf.Max(1, Mathf.CeilToInt(Vector2.Distance(nyt, aloitus) / ViivaPala));
                            for (int s = 1; s < n; s++) monikulmio.Add(Vector2.Lerp(nyt, aloitus, (float)s / n));
                        }
                        nyt = aloitus;
                        break;
                }
            }
        }

        /// <summary>
        /// Täytön monikulmiot rajauksen (clip-path-ellipsi) ja puraisumaskin
        /// (mustat ympyrät) jälkeen, paikallisessa koordinaatistossa.
        /// </summary>
        public static void Monikulmiot(Kokoaja k, in LiviaOsa o, List<Vector2> ulos, List<int> alut)
        {
            ulos.Clear(); alut.Clear();
            Tasoita(k, o);
            if (aliAlut.Count == 0) return;
            if (o.Leike >= 0)
            {
                var e = k.Leikkeet[o.Leike];
                rajaus.Clear();
                const int Kulmia = 36;
                for (int i = 0; i < Kulmia; i++)
                {
                    float a = i * 2 * Mathf.PI / Kulmia;
                    rajaus.Add(new Vector2(e.x + e.z * Mathf.Cos(a), e.y + e.w * Mathf.Sin(a)));
                }
            }
            for (int a = 0; a < aliAlut.Count; a++)
            {
                int loppu = a + 1 < aliAlut.Count ? aliAlut[a + 1] : monikulmio.Count;
                leikattu.Clear();
                for (int i = aliAlut[a]; i < loppu; i++) leikattu.Add(monikulmio[i]);
                if (o.Leike >= 0) Leikkaa(leikattu, rajaus);
                if (leikattu.Count < 3) continue;
                alut.Add(ulos.Count);
                ulos.AddRange(leikattu);
            }
            // Puraisut ympyrä kerrallaan kaikille (mahdollisesti jo jakautuneille) monikulmioille.
            reiat.Clear();
            for (int m = 0; m < o.MaskiMaara && alut.Count > 0; m++)
            {
                var c = k.Maskit[o.MaskiAlku + m];
                puraistu.Clear(); puraistuAlut.Clear();
                for (int a = 0; a < alut.Count; a++)
                {
                    int loppu = a + 1 < alut.Count ? alut[a + 1] : ulos.Count;
                    leikattu.Clear();
                    for (int i = alut[a]; i < loppu; i++) leikattu.Add(ulos[i]);
                    if (Puraise(leikattu, c, puraistu, puraistuAlut)) reiat.Add(c);
                }
                ulos.Clear(); ulos.AddRange(puraistu);
                alut.Clear(); alut.AddRange(puraistuAlut);
            }
            // Kokonaan muodon sisään jäävä ympyrä on reikä (täyttö parillisuussäännöllä).
            foreach (var c in reiat)
            {
                alut.Add(ulos.Count);
                for (int i = 0; i < 36; i++)
                {
                    float kulma = i * 2 * Mathf.PI / 36;
                    ulos.Add(new Vector2(c.x + c.z * Mathf.Cos(kulma), c.y + c.z * Mathf.Sin(kulma)));
                }
            }
        }

        /// <summary>Viivan osat, jotka jäävät puraisumaskin ulkopuolelle (avoimina murtoviivoina).</summary>
        public static void Viivat(Kokoaja k, in LiviaOsa o, List<Vector2> ulos, List<int> alut)
        {
            ulos.Clear(); alut.Clear();
            Tasoita(k, o);
            for (int a = 0; a < aliAlut.Count; a++)
            {
                int alku = aliAlut[a], loppu = a + 1 < aliAlut.Count ? aliAlut[a + 1] : monikulmio.Count;
                int n = loppu - alku + (suljetut[a] ? 1 : 0);
                bool auki = false;
                for (int i = 1; i < n; i++)
                {
                    Vector2 p0 = monikulmio[alku + (i - 1) % (loppu - alku)], p1 = monikulmio[alku + i % (loppu - alku)];
                    bool nakyy = !Maskissa(k, o, (p0 + p1) * 0.5f);
                    if (nakyy && !auki) { alut.Add(ulos.Count); ulos.Add(p0); auki = true; }
                    if (nakyy) ulos.Add(p1); else auki = false;
                }
            }
        }

        static bool Maskissa(Kokoaja k, in LiviaOsa o, Vector2 p)
        {
            for (int m = 0; m < o.MaskiMaara; m++)
            {
                var c = k.Maskit[o.MaskiAlku + m];
                if ((p - new Vector2(c.x, c.y)).sqrMagnitude < c.z * c.z) return true;
            }
            return false;
        }

        /// <summary>
        /// Monikulmio miinus ympyrä (webin mask: musta ympyrä valkoisella),
        /// Weiler–Atherton ympyrälle: kuljetaan monikulmion reunaa ympyrän
        /// ulkopuolella; sisääntulon kohdalla jatketaan ympyrän kaarta sitä
        /// suuntaa, joka on muodon sisällä, seuraavaan ulostuloon. Tulos voi
        /// jakautua useaksi monikulmioksi (lisätään ulos/alut-listoihin).
        /// </summary>
        /// <returns>true, kun ympyrä jää kokonaan muodon sisään (reikä lisätään erikseen).</returns>
        static bool Puraise(List<Vector2> kohde, Vector3 ympyra, List<Vector2> ulos, List<int> alut)
        {
            var c = new Vector2(ympyra.x, ympyra.y);
            float r = ympyra.z, r2 = r * r;
            int n = kohde.Count, sisalla = 0;
            for (int i = 0; i < n; i++) if ((kohde[i] - c).sqrMagnitude < r2) sisalla++;
            if (sisalla == n) return false; // koko muoto syöty
            if (sisalla == 0)
            {
                alut.Add(ulos.Count); ulos.AddRange(kohde);
                return Sisalla(kohde, c);
            }
            // Ulostulot: reunan indeksi, piste ja kulma.
            ulostulot.Clear();
            for (int i = 0; i < n; i++)
            {
                Vector2 p0 = kohde[i], p1 = kohde[(i + 1) % n];
                if ((p0 - c).sqrMagnitude < r2 && (p1 - c).sqrMagnitude >= r2)
                {
                    var x = Leikkaus(p0, p1, c, r, false);
                    ulostulot.Add(new Vector3(i, Mathf.Atan2(x.y - c.y, x.x - c.x), 0));
                }
            }
            if (kaytetty.Length < n) kaytetty = new bool[Mathf.NextPowerOfTwo(n)];
            System.Array.Clear(kaytetty, 0, n);
            for (int alku = 0; alku < n; alku++)
            {
                if (kaytetty[alku] || (kohde[alku] - c).sqrMagnitude < r2) continue;
                int polyAlku = ulos.Count, nyt = alku, turva = 0;
                while (turva++ < n * 4)
                {
                    kaytetty[nyt] = true;
                    ulos.Add(kohde[nyt]);
                    int seur = (nyt + 1) % n;
                    if ((kohde[seur] - c).sqrMagnitude < r2)
                    {
                        // Sisääntulo: kaari muodon sisäpuolta seuraavaan ulostuloon.
                        var e = Leikkaus(kohde[nyt], kohde[seur], c, r, true);
                        float ae = Mathf.Atan2(e.y - c.y, e.x - c.x), dk = Mathf.Max(0.01f, 0.05f / r);
                        float suunta = Sisalla(kohde, c + new Vector2(Mathf.Cos(ae + dk), Mathf.Sin(ae + dk)) * r) ? 1 : -1;
                        int paras = -1; float lyhin = float.MaxValue;
                        for (int j = 0; j < ulostulot.Count; j++)
                        {
                            float d = (ulostulot[j].y - ae) * suunta;
                            while (d <= 1e-4f) d += 2 * Mathf.PI;
                            while (d > 2 * Mathf.PI + 1e-4f) d -= 2 * Mathf.PI;
                            if (d < lyhin) { lyhin = d; paras = j; }
                        }
                        if (paras < 0) break;
                        int reuna = (int)ulostulot[paras].x;
                        var x = Leikkaus(kohde[reuna], kohde[(reuna + 1) % n], c, r, false);
                        ulos.Add(e);
                        int palat = Mathf.Max(1, Mathf.CeilToInt(lyhin / (Mathf.PI / 18)));
                        for (int i = 1; i < palat; i++)
                        {
                            float kulma = ae + suunta * lyhin * i / palat;
                            ulos.Add(c + new Vector2(Mathf.Cos(kulma), Mathf.Sin(kulma)) * r);
                        }
                        ulos.Add(x);
                        seur = (reuna + 1) % n;
                    }
                    if (seur == alku || kaytetty[seur]) break;
                    nyt = seur;
                }
                if (ulos.Count - polyAlku >= 3) alut.Add(polyAlku);
                else ulos.RemoveRange(polyAlku, ulos.Count - polyAlku);
            }
            return false;
        }

        /// <summary>Janan ja ympyrän leikkauspiste (sisään = ensimmäinen, ulos = jälkimmäinen juuri).</summary>
        static Vector2 Leikkaus(Vector2 p0, Vector2 p1, Vector2 c, float r, bool sisaan)
        {
            Vector2 d = p1 - p0, f = p0 - c;
            float a = Vector2.Dot(d, d), b = 2 * Vector2.Dot(d, f), cc = Vector2.Dot(f, f) - r * r;
            float disk = Mathf.Sqrt(Mathf.Max(0, b * b - 4 * a * cc));
            float t = a < 1e-9f ? 0 : (sisaan ? -b - disk : -b + disk) / (2 * a);
            return p0 + d * Mathf.Clamp01(t);
        }

        /// <summary>Parillisuussääntö: onko piste monikulmion sisällä.</summary>
        static bool Sisalla(List<Vector2> m, Vector2 p)
        {
            bool sisalla = false;
            for (int i = 0, j = m.Count - 1; i < m.Count; j = i++)
            {
                Vector2 a = m[i], b = m[j];
                if ((a.y > p.y) != (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) sisalla = !sisalla;
            }
            return sisalla;
        }

        /// <summary>Sutherland–Hodgman: kohde (paikallaan) leikataan kuperaan rajaukseen.</summary>
        static void Leikkaa(List<Vector2> kohde, List<Vector2> raja)
        {
            for (int r = 0; r < raja.Count && kohde.Count > 0; r++)
            {
                Vector2 a = raja[r], b = raja[(r + 1) % raja.Count], ab = b - a;
                vali.Clear();
                vali.AddRange(kohde);
                kohde.Clear();
                Vector2 edellinen = vali[vali.Count - 1];
                float ed = ab.x * (edellinen.y - a.y) - ab.y * (edellinen.x - a.x);
                for (int i = 0; i < vali.Count; i++)
                {
                    Vector2 piste = vali[i];
                    float d = ab.x * (piste.y - a.y) - ab.y * (piste.x - a.x);
                    if (d >= 0)
                    {
                        if (ed < 0) kohde.Add(Vali(edellinen, piste, ed, d));
                        kohde.Add(piste);
                    }
                    else if (ed >= 0) kohde.Add(Vali(edellinen, piste, ed, d));
                    edellinen = piste; ed = d;
                }
            }
        }

        static Vector2 Vali(Vector2 p0, Vector2 p1, float d0, float d1) => p0 + (p1 - p0) * (d0 / (d0 - d1));
    }
}
