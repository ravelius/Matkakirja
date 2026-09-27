using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MEREN KORISTE, LAATUTASO (omistaja 27.9.2026 klo 13.0x: "Nuo voisi tehdä korkeammalla laadulla"; speksi
    /// docs/raportit/meri-laatu-speksi-20260927.md): merilaiva eli 1870-luvun rannikon siipiratashöyry MeriMalli-varjostimelle.
    /// Pitkä musta runko kansilinjan kaarella ja klipperikeulalla, puoliympyrän muotoiset vaaleat ratakotelot sädekoristeineen
    /// (ratas näkyy kotelon alta), korkea kalteva piippu yhdellä punaisella raidalla (ainoa korostus perän lipun lisäksi),
    /// kaksi mastoa reivattuine kahvelipurjeineen, vantit ja haruksen köydet, salonki, konehuone, silta kotelolta kotelolle
    /// ja pelastusveneet taaveteissa. +z eteen (keula), +y ylös, meren pinta y = 0, 1 yksikkö = KokoPt pistettä.
    /// Lapset: 0 siipirattaat yhteisellä akselilla, 1–12 savupallot, 13–15 vihellyksen höyrypallot, 16 vanavesi (pysyy
    /// vaakasuorassa, ei keinu rungon mukana).
    /// </summary>
    public static class MeriLaiva
    {
        public const string Nimi = "merilaiva";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri", "itameri" };
        /// <summary>Runko keulapuomeineen noin 0,17 yksikköä → noin 47 pt (runko 0,15 → 42 pt).</summary>
        public const float KokoPt = 280f;
        /// <summary>Sama siemen ja samat näytösten kestot kuin vanhalla siipiratashöyryllä.</summary>
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(907, 25f, 40f, 30f, 90f);
        const int Savuja = 12, Hoyryja = 3;
        public const int Lapsia = 1, Lapsia2 = Savuja + Hoyryja, Lapsia3 = 1;

        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Ääriviivan raja: tätä pienempi osa (puolileveys) jää ilman ääriviivaa. Köydet ja puomit rakennetaan
        /// paloina, joiden vaakamitta jää rajan alle, joten ohut osa ei saa 1,2 pt:n musteviivaa ympärilleen.</summary>
        const float ReunaMinimi = 0.007f;
        const float ZKeula = 0.0765f, ZPera = -0.0735f, ZvKeula = 0.0655f, ZvPera = -0.0645f;
        const float Leveys = 0.0115f, KansiKeski = 0.0105f, ZMatalin = -0.012f, Kaide = 0.0022f;
        const float ZRatas = 0.004f, YAkseli = 0.0125f, RKotelo = 0.0145f, XKoteloSisa = 0.0102f, XKoteloUlko = 0.0205f;
        const float RRatas = 0.0114f, XRatas = 0.0155f, LRatas = 0.0070f;
        const float ZPiippu = -0.0055f, YPiippuAla = 0.0140f, YPiippuYla = 0.0650f, RPiippu = 0.0042f, PiippuKallistus = 7f;
        const float ZKeulamasto = 0.041f, ZIsomasto = -0.037f, MastoKallistus = 4f;
        const float RSavu = 0.0062f;
        /// <summary>Keulapuomi keulavarren päästä eteen ja hieman ylös (pituus noin 0,02 = 13 % rungosta): keulaharus päättyy
        /// tarkalleen nokkaan ja vesipuomivantti (bobstay) nokasta keulavarteen vesirajan lähelle.</summary>
        static readonly Vector3 KeulapuomiTyvi = new Vector3(0f, 0.0185f, 0.0745f), KeulapuomiNokka = new Vector3(0f, 0.0237f, 0.094f);

        // ---- Värit: vain B-seepiaramppi (alfa 0) ja pelin punainen (alfa 1) ----

        static Color Rampi(float s) => MeriRakentaja.Rampi(s);
        static readonly Color RunkoVari = Rampi(0.5f), KaideUlko = Rampi(1.75f), KaideYla = Rampi(1.92f), KaideSisa = Rampi(1.55f), KansiVari = Rampi(1.35f);
        static readonly Color Kotelo = Rampi(1.88f), KoteloKylki = Rampi(1.85f), KoteloKoriste = Rampi(0.55f);
        static readonly Color TaloSeina = Rampi(1.75f), TaloKatto = Rampi(1.95f), Ikkuna = Rampi(0.4f), Lasi = Rampi(1.1f);
        static readonly Color PiippuVari = Rampi(0.3f), PiippuHattu = Rampi(0.12f), Messinki = Rampi(1.55f);
        static readonly Color MastoVari = Rampi(0.7f), PuomiVari = Rampi(0.75f), PurjeVari = Rampi(2f), Reivi = Rampi(1.7f);
        static readonly Color Koysi = Rampi(0.4f), Vene = Rampi(1.82f), VenePeite = Rampi(1.4f), Taavetti = Rampi(0.6f);
        static readonly Color SiltaVari = Rampi(1.6f), KeulapuomiVari = Rampi(0.5f);
        static readonly Color Lapa = Rampi(1.05f), Keha = Rampi(1.7f), Napa = Rampi(0.45f);
        /// <summary>Savun rampin kohdat: vaalea savu ja höyry 1,9, hiilisavun kupu 1,3 (väri rampista, ei sekoitusta sRGB:nä).</summary>
        const float SavuVaalea = 1.9f, SavuTumma = 1.3f;

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Rungon muoto ----

        /// <summary>Kansilinjan korkeus kohdassa z: matalin hieman keskeltä perään, keula nousee enemmän kuin perä.</summary>
        static float Kansi(float z)
        {
            if (z >= ZMatalin) { float q = (z - ZMatalin) / (ZKeula - ZMatalin); return KansiKeski + 0.0062f * q * q; }
            float p = (ZMatalin - z) / (ZMatalin - ZPera);
            return KansiKeski + 0.0032f * p * p;
        }

        /// <summary>Kannen puolileveys kohdassa z: terävä klipperikeula ja pyöreä peräpeili.</summary>
        static float Puolileveys(float z)
        {
            if (z > 0.010f)
            {
                float t = Mathf.Clamp01((z - 0.010f) / (ZKeula - 0.010f));
                return Leveys * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(t, 1.8f)), 0.62f);
            }
            if (z < -0.026f)
            {
                float t = Mathf.Clamp01((-0.026f - z) / (-0.026f - ZPera));
                return Leveys * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(t, 2.4f)), 0.45f);
            }
            return Leveys;
        }

        /// <summary>Asemien jako: tiheämpi keulassa ja perässä, joissa muoto kaartuu.</summary>
        static float Asema(float u) => u - 0.55f * Mathf.Sin(2f * Mathf.PI * u) / (2f * Mathf.PI);

        /// <summary>Kyljen piste: u 0 perä … 1 keula, v 0 vesiraja … 1 kannen reuna. Keulavarsi kaartuu ylhäältä eteen
        /// (klipperikeula), perä ulkonee pyöreänä (peräpeili); kylki hieman kupera.</summary>
        static Vector3 Kylki(float u, float v, float puoli)
        {
            float g = Asema(u);
            float zd = Mathf.Lerp(ZPera, ZKeula, g), zw = Mathf.Lerp(ZvPera, ZvKeula, g);
            float bd = Puolileveys(zd), bw = 0.9f * bd;
            float e = Mathf.Lerp(0.55f, 1.7f, Mathf.SmoothStep(0f, 1f, (g - 0.3f) / 0.4f));
            float z = zw + (zd - zw) * Mathf.Pow(v, e);
            float x = Mathf.Lerp(bw, bd, v) + 0.0007f * Mathf.Sin(Mathf.PI * v) * bd / Leveys;
            return new Vector3(puoli * x, Kansi(zd) * v, z);
        }

        /// <summary>Kannen reunan kohta z asemalla u (sama jako kuin kyljessä).</summary>
        static float KansiZ(float u) => Mathf.Lerp(ZPera, ZKeula, Asema(u));

        // ---- Mallit ----

        public static Mesh Roottori() => Rakenna(false);

        /// <summary>Kaukotaso (≤ 800 kolmiota): sama siluetti harvemmin jaoin, ilman köysiä, ikkunoita ja pieniä varusteita.</summary>
        public static Mesh RoottoriKauko() => Rakenna(true);

        static Mesh Rakenna(bool kauko)
        {
            var r = new MeriRakentaja(ReunaMinimi);
            Runko(r, kauko);
            for (int k = 0; k < 2; k++) Ratakotelo(r, k == 0 ? 1f : -1f, kauko);
            Talot(r, kauko);
            Piippu(r, kauko);
            Mastot(r, kauko);
            if (!kauko) Koydet(r);
            for (int k = 0; k < 2; k++) Pelastusvene(r, k == 0 ? 1f : -1f, kauko);
            Lippu(r, kauko);
            return r.Verkko(kauko ? "merilaiva-kauko" : "merilaiva");
        }

        /// <summary>Runko yhtenä osana (yksi ääriviiva): kyljet, parrasvarustus (ulko- ja sisäpinta, vaalea reunalista) ja
        /// kansi. Kylki on musta, reunalista paperia, joten kansilinjan kaari piirtyy vaaleana viivana.</summary>
        static void Runko(MeriRakentaja r, bool kauko)
        {
            int nu = kauko ? 11 : 18;
            float[] vt = kauko ? new[] { 0f, 0.55f, 1f } : new[] { 0f, 0.36f, 0.7f, 1f };
            r.AloitaOsa();
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var ulos = new Vector3(p, 0f, 0f);
                for (int i = 0; i < nu; i++)
                {
                    float u0 = i / (float)nu, u1 = (i + 1) / (float)nu;
                    for (int j = 0; j + 1 < vt.Length; j++)
                        r.NelioUlos(Kylki(u0, vt[j], p), Kylki(u1, vt[j], p), Kylki(u1, vt[j + 1], p), Kylki(u0, vt[j + 1], p), ulos, RunkoVari);
                    // Parrasvarustus: ulkopinta kyljen jatkona, vaalea reunalista päällä ja vaalea sisäpinta.
                    float z0 = KansiZ(u0), z1 = KansiZ(u1);
                    Vector3 k0 = Kylki(u0, 1f, p), k1 = Kylki(u1, 1f, p);
                    float h0 = KaideKorkeus(z0), h1 = KaideKorkeus(z1);
                    Vector3 y0 = k0 + new Vector3(0.0002f * p * Puolileveys(z0) / Leveys, h0, 0f), y1 = k1 + new Vector3(0.0002f * p * Puolileveys(z1) / Leveys, h1, 0f);
                    float s0 = Mathf.Max(0f, Mathf.Abs(k0.x) - 0.0007f), s1 = Mathf.Max(0f, Mathf.Abs(k1.x) - 0.0007f);
                    Vector3 i0 = new Vector3(p * s0, k0.y + h0, z0), i1 = new Vector3(p * s1, k1.y + h1, z1);
                    Vector3 d0 = new Vector3(p * s0, k0.y, z0), d1 = new Vector3(p * s1, k1.y, z1);
                    r.NelioUlos(k0, k1, y1, y0, ulos, KaideUlko);
                    r.NelioUlos(y0, y1, i1, i0, Vector3.up, KaideYla);
                    if (!kauko) r.NelioUlos(i0, i1, d1, d0, -ulos, KaideSisa);
                }
            }
            // Kansi: puukansi kaarevana (keskilinja hieman koholla), reunat parrasvarustuksen sisäpinnalla.
            for (int i = 0; i < nu; i++)
            {
                float u0 = i / (float)nu, u1 = (i + 1) / (float)nu;
                float z0 = KansiZ(u0), z1 = KansiZ(u1);
                Vector3 k0 = Kylki(u0, 1f, 1f), k1 = Kylki(u1, 1f, 1f);
                float s0 = Mathf.Max(0f, k0.x - 0.0007f), s1 = Mathf.Max(0f, k1.x - 0.0007f);
                Vector3 o0 = new Vector3(s0, k0.y, z0), o1 = new Vector3(s1, k1.y, z1);
                Vector3 v0 = new Vector3(-s0, k0.y, z0), v1 = new Vector3(-s1, k1.y, z1);
                Vector3 m0 = new Vector3(0f, k0.y + 0.0005f * s0 / Leveys, z0), m1 = new Vector3(0f, k1.y + 0.0005f * s1 / Leveys, z1);
                r.NelioUlos(v0, m0, m1, v1, Vector3.up, KansiVari);
                r.NelioUlos(m0, o0, o1, m1, Vector3.up, KansiVari);
            }
            r.LopetaOsa();
        }

        /// <summary>Parrasvarustuksen korkeus: keulassa korkeampi (kokka), muuten 0,0022.</summary>
        static float KaideKorkeus(float z) => Kaide + 0.0012f * Mathf.Clamp01((z - 0.045f) / 0.03f);

        /// <summary>
        /// Ratakotelo yhtenä osana: puoliympyrän muotoinen kaareva katto ja kyljet akselin ympärillä (akselilla y 0,0125,
        /// säde 0,0145), ulkokyljessä klassinen sädekoriste (tumma napa ja viisi sädettä). Kotelo peittää rattaan
        /// yläpuoliskon; alapuolisko (lapsi 0) näkyy kotelon alta vesirajaan asti.
        /// </summary>
        static void Ratakotelo(MeriRakentaja r, float p, bool kauko)
        {
            int n = kauko ? 7 : 12;
            var ulos = new Vector3(p, 0f, 0f);
            var xs = new Vector3(p * XKoteloSisa, YAkseli, ZRatas);
            var xu = new Vector3(p * XKoteloUlko, YAkseli, ZRatas);
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                float a0 = Mathf.PI * i / n, a1 = Mathf.PI * (i + 1) / n, am = 0.5f * (a0 + a1);
                var d0 = new Vector3(0f, Mathf.Sin(a0), Mathf.Cos(a0)) * RKotelo;
                var d1 = new Vector3(0f, Mathf.Sin(a1), Mathf.Cos(a1)) * RKotelo;
                r.NelioUlos(xs + d0, xu + d0, xu + d1, xs + d1, new Vector3(0f, Mathf.Sin(am), Mathf.Cos(am)), Kotelo);
                r.KolmioUlos(xu, xu + d0, xu + d1, ulos, KoteloKylki);
                r.KolmioUlos(xs, xs + d0, xs + d1, -ulos, KoteloKylki);
            }
            if (!kauko)
            {
                // Sädekoriste: tumma napa (puolikiekko) ja viisi kapeaa sädettä hieman kyljen ulkopuolella.
                var pinta = xu + ulos * 0.00012f;
                const int napa = 6;
                for (int i = 0; i < napa; i++)
                {
                    float a0 = Mathf.PI * i / napa, a1 = Mathf.PI * (i + 1) / napa;
                    r.KolmioUlos(pinta, pinta + new Vector3(0f, Mathf.Sin(a0), Mathf.Cos(a0)) * (0.27f * RKotelo),
                        pinta + new Vector3(0f, Mathf.Sin(a1), Mathf.Cos(a1)) * (0.27f * RKotelo), ulos, KoteloKoriste);
                }
                for (int i = 1; i <= 5; i++)
                {
                    float a = Mathf.PI * i / 6f;
                    var d = new Vector3(0f, Mathf.Sin(a), Mathf.Cos(a));
                    var sivu = new Vector3(0f, -d.z, d.y) * 0.00055f;
                    r.NelioUlos(pinta + d * (0.36f * RKotelo) - sivu, pinta + d * (0.36f * RKotelo) + sivu,
                        pinta + d * (0.86f * RKotelo) + sivu * 1.5f, pinta + d * (0.86f * RKotelo) - sivu * 1.5f, ulos, KoteloKoriste);
                }
            }
            r.LopetaOsa();
        }

        /// <summary>Salonki perässä (ikkunarivi ja kattoikkuna), konehuoneen kuilu kotelojen välissä, keulan pieni
        /// kansirakennus ja silta kotelolta kotelolle (kapea lankku ja kaide paloina, jotta ääriviiva ei paksunna sitä).</summary>
        static void Talot(MeriRakentaja r, bool kauko)
        {
            Talo(r, -0.034f, 0.036f, 0.0146f, 0.0054f, kauko ? 0 : 6, kauko);
            Talo(r, 0.0025f, 0.024f, 0.0120f, 0.0040f, 0, kauko);
            Talo(r, 0.0245f, 0.012f, 0.0100f, 0.0046f, kauko ? 0 : 2, kauko);
            if (kauko) return;
            // Kattoikkuna salongin katolla (lasi tummempana).
            float yk = Mathf.Min(Kansi(-0.052f), Kansi(-0.016f)) - 0.0003f + 0.0054f;
            r.Laatikko(new Vector3(0f, yk, -0.036f), new Vector3(0.0052f, 0.0013f, 0.012f), TaloSeina, Lasi);
            // Silta ratakoteloiden katolta toiselle: lankku ja etukaide paloina.
            float ys = YAkseli + RKotelo;
            for (int i = 0; i < 4; i++)
            {
                float x0 = Mathf.Lerp(-XKoteloUlko, XKoteloUlko, i / 4f), x1 = Mathf.Lerp(-XKoteloUlko, XKoteloUlko, (i + 1) / 4f);
                r.Laatikko(new Vector3(0.5f * (x0 + x1), ys - 0.0002f, ZRatas), new Vector3(x1 - x0, 0.0008f, 0.0036f), SiltaVari, SiltaVari);
                r.Tanko(new Vector3(x0, ys + 0.0026f, ZRatas + 0.0016f), new Vector3(x1, ys + 0.0026f, ZRatas + 0.0016f), 0.00045f, 0.00045f, 3, Taavetti, false);
            }
            foreach (float x in new[] { -0.018f, -0.006f, 0.006f, 0.018f })
                r.Tanko(new Vector3(x, ys, ZRatas + 0.0016f), new Vector3(x, ys + 0.0027f, ZRatas + 0.0016f), 0.0004f, 0.0004f, 3, Taavetti, false);
        }

        /// <summary>Kansirakennus: laatikko kannen kaaren alimman kohdan tasolta, vaaleat seinät ja katto, ikkunat kyljissä.</summary>
        static void Talo(MeriRakentaja r, float z, float pituus, float leveys, float korkeus, int ikkunoita, bool kauko)
        {
            float y = Mathf.Min(Kansi(z - 0.5f * pituus), Kansi(z + 0.5f * pituus)) - 0.0003f;
            r.AloitaOsa();
            r.Laatikko(new Vector3(0f, y, z), new Vector3(leveys, korkeus, pituus), TaloSeina, TaloKatto);
            for (int k = 0; k < 2 && ikkunoita > 0; k++)
            {
                float p = k == 0 ? 1f : -1f, x = p * (0.5f * leveys + 0.0001f);
                for (int i = 0; i < ikkunoita; i++)
                {
                    float zc = z + (i + 0.5f - 0.5f * ikkunoita) * (pituus - 0.004f) / ikkunoita;
                    float w = 0.36f * (pituus - 0.004f) / ikkunoita, y0 = y + 0.36f * korkeus, y1 = y + 0.72f * korkeus;
                    r.NelioUlos(new Vector3(x, y0, zc - w), new Vector3(x, y0, zc + w), new Vector3(x, y1, zc + w), new Vector3(x, y1, zc - w),
                        new Vector3(p, 0f, 0f), Ikkuna);
                }
            }
            r.LopetaOsa();
        }

        /// <summary>Piipun akselin piste korkeudella y (kallistus taaksepäin).</summary>
        static Vector3 PiippuPiste(float y)
        {
            float kal = Mathf.Sin(PiippuKallistus * Mathf.Deg2Rad) / Mathf.Cos(PiippuKallistus * Mathf.Deg2Rad);
            return new Vector3(0f, y, ZPiippu - (y - YPiippuAla) * kal);
        }

        /// <summary>Savun lähtöpiste (piipun suu) ja vihellyspillin pää roottorin avaruudessa (laskettu kerran).</summary>
        static readonly Vector3 PiipunSuu = PiippuPiste(YPiippuYla + 0.0012f);
        static readonly Vector3 PillinPaa = PiippuPiste(0.0585f) + new Vector3(0f, 0f, RPiippu + 0.0012f);

        /// <summary>
        /// Piippu: musta, kalteva, yksi punainen raita yläosassa ja tumma levennetty hattu (suu tummana ylhäältä). Paloina,
        /// joiden vaakamitta jää ääriviivarajan alle (piippu on tumma jo itsessään). Edessä messinkinen vihellyspilli ja
        /// takana ohut hukkahöyryputki.
        /// </summary>
        static void Piippu(MeriRakentaja r, bool kauko)
        {
            int sivuja = kauko ? 6 : 10;
            float[] y = { YPiippuAla, 0.031f, 0.0485f, 0.0545f, 0.0625f };
            for (int i = 0; i + 1 < y.Length; i++)
                r.Tanko(PiippuPiste(y[i]), PiippuPiste(y[i + 1]), RPiippu, RPiippu, sivuja, i == 2 ? MeriRakentaja.Punainen : PiippuVari, false);
            r.Tanko(PiippuPiste(0.0625f), PiippuPiste(YPiippuYla), RPiippu * 1.1f, RPiippu * 1.12f, sivuja, PiippuHattu, true);
            if (kauko) return;
            var pilli = PiippuPiste(0.050f) + new Vector3(0f, 0f, RPiippu + 0.0011f);
            r.Tanko(pilli, PillinPaa, 0.0007f, 0.0007f, 4, Messinki, true);
            r.Tanko(PiippuPiste(0.030f) + new Vector3(0f, 0f, -RPiippu - 0.0009f), PiippuPiste(0.0655f) + new Vector3(0f, 0f, -RPiippu - 0.0009f),
                0.0006f, 0.0006f, 3, Messinki, true);
        }

        static Vector3 MastoPiste(float zTyvi, float y)
        {
            float kal = Mathf.Sin(MastoKallistus * Mathf.Deg2Rad) / Mathf.Cos(MastoKallistus * Mathf.Deg2Rad);
            return new Vector3(0f, y, zTyvi - (y - Kansi(zTyvi)) * kal);
        }

        /// <summary>Kallistuksen (el) ja käännön (sv, suojan puolelle +x) suunta taaksepäin.</summary>
        static Vector3 Taakse(float el, float sv)
        {
            float e = el * Mathf.Deg2Rad, s = sv * Mathf.Deg2Rad;
            return new Vector3(Mathf.Sin(s) * Mathf.Cos(e), Mathf.Sin(e), -Mathf.Cos(s) * Mathf.Cos(e));
        }

        /// <summary>
        /// Mastot, kahvelit, puomit ja purjeet: kummassakin mastossa reivattu kahvelipurje (alaosa käärittynä puomille).
        /// Purjeet ovat kaarevia molempiin suuntiin (vatsa suojan puolelle +x, syvin kohta 40 %:ssa leveydestä ja keskellä
        /// korkeutta), joten kangas varjostuu ylä- ja alapuoliskoltaan eri sävyin eikä näytä levyltä, ja kiertyvät ylöspäin
        /// enemmän suojaan, joten ne näkyvät ylhäältäkin kapeina kaarina. Keulapuomi klipperikeulasta.
        /// </summary>
        static void Mastot(MeriRakentaja r, bool kauko)
        {
            int sivuja = kauko ? 4 : 5;
            r.Tanko(MastoPiste(ZKeulamasto, Kansi(ZKeulamasto)), MastoPiste(ZKeulamasto, 0.097f), 0.00125f, 0.0008f, sivuja, MastoVari, true);
            r.Tanko(MastoPiste(ZIsomasto, Kansi(ZIsomasto)), MastoPiste(ZIsomasto, 0.090f), 0.00125f, 0.0008f, sivuja, MastoVari, true);
            // Keulapuomi selvästi näkyvänä puomina (säde 0,0014 → 0,0011, tumma ramppi 0,5), jotta keulaharus ei pääty tyhjään.
            Pala(r, KeulapuomiTyvi, KeulapuomiNokka, 0.0014f, 0.0011f, kauko ? 4 : 5, KeulapuomiVari);

            // Keulapurje ja isopurje reivattuina (alaosa käärittynä puomille vaaleana rullana): siipiratashöyryn purjeet ovat
            // apupurjeita, joten ne ovat pienet ja piippu ja ratakotelot hallitsevat siluettia.
            Kahveli(r, ZKeulamasto, 0.0245f, 0.062f, 0.025f, 30f, 20f, 0.028f, 4f, 14f, 0.005f, 0.0056f, kauko);
            Kahveli(r, ZIsomasto, 0.0235f, 0.058f, 0.026f, 27f, 22f, 0.031f, 3f, 15f, 0.0062f, 0.0054f, kauko);
        }

        /// <summary>Kahvelipurje puomeineen: halssi puomin korkeudella, kurki kahvelin kiinnityksessä; kahveli ja puomi
        /// kääntyvät suojan puolelle (kahveli enemmän, joten purje kiertyy), purjeen alareuna reivin verran puomin yläpuolella.</summary>
        static void Kahveli(MeriRakentaja r, float zMasto, float yPuomi, float yKurki, float kahveli, float kNousu, float kKaanto,
            float puomi, float pNousu, float pKaanto, float reivi, float syvyys, bool kauko)
        {
            var tack = MastoPiste(zMasto, yPuomi);
            var kurki = MastoPiste(zMasto, yKurki);
            var huippu = kurki + Taakse(kNousu, kKaanto) * kahveli;
            var kulma = tack + Taakse(pNousu, pKaanto) * puomi;
            var nosto = new Vector3(0f, reivi, 0f);
            Purje(r, tack + nosto, kurki, huippu, kulma + nosto, syvyys, kauko);
            int sivuja = kauko ? 3 : 4;
            Pala(r, kurki, huippu, 0.0007f, 0.0006f, sivuja, PuomiVari);
            Pala(r, tack, kulma, 0.0007f, 0.0006f, sivuja, PuomiVari);
            if (!kauko && reivi > 0f)
                Pala(r, tack + new Vector3(0f, 0.0015f, -0.002f), kulma + new Vector3(0f, 0.0015f, 0.001f), 0.0013f, 0.0011f, 4, Reivi);
        }

        /// <summary>Kahvelipurje: kaareva kangas (Pinta, kaksipuolinen) nurkista halssi, kurki, huippu ja skuutti.</summary>
        static void Purje(MeriRakentaja r, Vector3 tack, Vector3 kurki, Vector3 huippu, Vector3 kulma, float syvyys, bool kauko)
        {
            var nl = Vector3.Cross(kurki - tack, kulma - tack).normalized;
            if (nl.x < 0f) nl = -nl;
            r.Pinta((u, v) => Vector3.Lerp(Vector3.Lerp(tack, kulma, u), Vector3.Lerp(kurki, huippu, u), v)
                    + nl * (syvyys * Mathf.Sin(Mathf.PI * Mathf.Pow(u, 0.8f)) * Mathf.Pow(Mathf.Sin(Mathf.PI * (0.12f + 0.76f * v)), 0.8f)),
                kauko ? 2 : 4, kauko ? 2 : 4, (u, v) => PurjeVari, true);
        }

        /// <summary>Ohut tanko (puomi, köysi) paloina, joiden vaakamitta jää ääriviivarajan alle.</summary>
        static void Pala(MeriRakentaja r, Vector3 a, Vector3 b, float r0, float r1, int sivuja, Color vari)
        {
            var d = b - a;
            float vaaka = Mathf.Sqrt(d.x * d.x + d.z * d.z), pala = 2f * ReunaMinimi - 2.6f * Mathf.Max(r0, r1);
            int n = 1 + (int)(vaaka / pala);
            for (int i = 0; i < n; i++)
            {
                float q0 = i / (float)n, q1 = (i + 1) / (float)n;
                r.Tanko(a + d * q0, a + d * q1, Mathf.Lerp(r0, r1, q0), Mathf.Lerp(r0, r1, q1), sivuja, vari, false);
            }
        }

        /// <summary>Kannen reunan kiinnityspiste (parrasvarustuksen yläreuna) kohdassa z.</summary>
        static Vector3 Reuna(float z, float puoli) => new Vector3(puoli * (Puolileveys(z) + 0.0002f), Kansi(z) + KaideKorkeus(z), z);

        /// <summary>
        /// Seisova köysistö kolmisivuisina tankoina (säde 0,001 → noin 0,45 pt, laitteella MSAA pois), tumma ramppi, ei
        /// ääriviivaa: vantit kaksi kummallekin puolelle kumpaankin mastoon, keulaharus tarkalleen keulapuomin nokkaan ja
        /// vesipuomivantti nokasta keulavarteen, välistaagi mastosta mastoon piipun yli, perävantit peräkaiteelle ja piipun
        /// harukset. Jokainen köysi päättyy mastoon, kaiteelle tai puomin nokkaan (ei tyhjään eikä rungon ulkopuolelle).
        /// </summary>
        static void Koydet(MeriRakentaja r)
        {
            const float rk = 0.001f;
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var keula = MastoPiste(ZKeulamasto, 0.080f);
                Pala(r, keula, Reuna(ZKeulamasto - 0.004f, p), rk, rk, 3, Koysi);
                Pala(r, keula, Reuna(ZKeulamasto - 0.010f, p), rk, rk, 3, Koysi);
                var iso = MastoPiste(ZIsomasto, 0.074f);
                Pala(r, iso, Reuna(ZIsomasto - 0.004f, p), rk, rk, 3, Koysi);
                Pala(r, iso, Reuna(ZIsomasto - 0.010f, p), rk, rk, 3, Koysi);
                Pala(r, MastoPiste(ZIsomasto, 0.086f), Reuna(-0.067f, p), rk, rk, 3, Koysi);
                Pala(r, PiippuPiste(0.047f), Reuna(ZPiippu - 0.013f, p), rk * 0.9f, rk * 0.9f, 3, Koysi);
            }
            Pala(r, MastoPiste(ZKeulamasto, 0.093f), KeulapuomiNokka, rk, rk, 3, Koysi);
            Pala(r, KeulapuomiNokka - new Vector3(0f, 0.0008f, 0f), new Vector3(0f, 0.004f, 0.0665f), rk * 0.9f, rk * 0.9f, 3, Koysi);
            Pala(r, MastoPiste(ZKeulamasto, 0.091f), MastoPiste(ZIsomasto, 0.086f), rk, rk, 3, Koysi);
        }

        /// <summary>Pelastusvene taaveteissa kotelon takana laidan ulkopuolella: vaalea kaksikeulainen runko ja tummempi peite.
        /// Pituus 0,013 (puolimitta alle ääriviivarajan, joten pieni vene ei saa paksua viivaa).</summary>
        static void Pelastusvene(MeriRakentaja r, float p, bool kauko)
        {
            const float zc = -0.031f, L = 0.013f, B = 0.0024f, D = 0.002f;
            float yc = Kansi(zc) + 0.0048f, xc = p * 0.0148f;
            int n = kauko ? 2 : 4;
            for (int i = 0; i < n; i++)
            {
                float s0 = -1f + 2f * i / n, s1 = -1f + 2f * (i + 1) / n;
                float b0 = B * Mathf.Pow(Mathf.Max(0f, 1f - s0 * s0), 0.55f), b1 = B * Mathf.Pow(Mathf.Max(0f, 1f - s1 * s1), 0.55f);
                for (int k = 0; k < 2; k++)
                {
                    float q = k == 0 ? 1f : -1f;
                    Vector3 g0 = new Vector3(xc + q * b0, yc, zc + 0.5f * L * s0), g1 = new Vector3(xc + q * b1, yc, zc + 0.5f * L * s1);
                    Vector3 k0 = new Vector3(xc + q * 0.35f * b0, yc - D, zc + 0.44f * L * s0), k1 = new Vector3(xc + q * 0.35f * b1, yc - D, zc + 0.44f * L * s1);
                    r.NelioUlos(k0, k1, g1, g0, new Vector3(q, -0.3f, 0f), Vene);
                }
                // Peite: harjakatto keskilinjaan.
                Vector3 h0 = new Vector3(xc, yc + 0.0006f * Mathf.Max(0f, 1f - s0 * s0), zc + 0.5f * L * s0), h1 = new Vector3(xc, yc + 0.0006f * Mathf.Max(0f, 1f - s1 * s1), zc + 0.5f * L * s1);
                r.NelioUlos(new Vector3(xc + b0, yc, zc + 0.5f * L * s0), new Vector3(xc + b1, yc, zc + 0.5f * L * s1), h1, h0, Vector3.up, VenePeite);
                r.NelioUlos(h0, h1, new Vector3(xc - b1, yc, zc + 0.5f * L * s1), new Vector3(xc - b0, yc, zc + 0.5f * L * s0), Vector3.up, VenePeite);
            }
            if (kauko) return;
            // Taavetit: kannelta ylös ja kaarena veneen päälle.
            foreach (float dz in new[] { -0.0042f, 0.0042f })
            {
                var tyvi = Reuna(zc + dz, p) + new Vector3(-p * 0.0008f, -0.001f, 0f);
                var polvi = new Vector3(p * (Puolileveys(zc + dz) + 0.0006f), yc + 0.0042f, zc + dz);
                var karki = new Vector3(xc, yc + 0.0036f, zc + dz);
                r.Tanko(tyvi, polvi, 0.0006f, 0.0006f, 3, Taavetti, false);
                r.Tanko(polvi, karki, 0.0006f, 0.0006f, 3, Taavetti, false);
            }
        }

        /// <summary>Punainen lippu perän lipputangossa (tanko seisoo peräkaiteella rungon sisällä), liehuu taakse ja hieman
        /// suojan puolelle (kaksi aaltoa).</summary>
        static void Lippu(MeriRakentaja r, bool kauko)
        {
            var tyvi = new Vector3(0f, Kansi(ZPera) + Kaide - 0.0015f, -0.0722f);
            var paa = new Vector3(0f, 0.0305f, -0.0733f);
            r.Tanko(tyvi, paa, 0.0006f, 0.0005f, 3, MastoVari, false);
            Vector3 y0 = paa + new Vector3(0f, -0.0003f, 0f), a0 = paa + new Vector3(0f, -0.0058f, 0.0004f);
            Vector3 y1 = y0 + new Vector3(0.0012f, 0.0002f, -0.0045f), a1 = a0 + new Vector3(0.0012f, 0.0002f, -0.0045f);
            Vector3 y2 = y0 + new Vector3(0.0008f, -0.0003f, -0.0088f), a2 = a0 + new Vector3(0.0008f, 0.0002f, -0.0086f);
            r.AloitaOsa();
            r.Kalvo(y0, y1, a1, a0, MeriRakentaja.Punainen);
            if (!kauko) r.Kalvo(y1, y2, a2, a1, MeriRakentaja.Punainen);
            r.LopetaOsa();
        }

        /// <summary>
        /// Siipirattaat (lapsi 0) yhteisellä akselilla: origo akselilla, kierto x-akselin ympäri. Kummassakin kahdeksan
        /// lapaa (akselin suuntaiset laudat), vaalea kehä ja puolat ulkopinnalla sekä tumma napa. Ei ääriviivaa: pyörivän
        /// osan vaakasuunnassa kasvatettu ääriviiva kääntyisi rattaan mukana.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja(1f);
            for (int k = 0; k < 2; k++) Ratas(r, k == 0 ? 1f : -1f);
            return r.Verkko("merilaiva-rattaat");
        }

        static void Ratas(MeriRakentaja r, float p)
        {
            var ulos = new Vector3(p, 0f, 0f);
            var xs = new Vector3(p * (XRatas - 0.5f * LRatas), 0f, 0f);
            var xu = new Vector3(p * (XRatas + 0.5f * LRatas), 0f, 0f);
            var pinta = xu + ulos * 0.0001f;
            const int lapoja = 8, kaaria = 12;
            for (int i = 0; i < lapoja; i++)
            {
                float a = (i + 0.5f) * 2f * Mathf.PI / lapoja;
                var d = new Vector3(0f, Mathf.Sin(a), Mathf.Cos(a));
                r.Kalvo(xs + d * (0.62f * RRatas), xu + d * (0.62f * RRatas), xu + d * RRatas, xs + d * RRatas, Lapa);
                var sivu = new Vector3(0f, -d.z, d.y) * 0.0004f;
                r.NelioUlos(pinta + d * (0.14f * RRatas) - sivu, pinta + d * (0.14f * RRatas) + sivu, pinta + d * (0.88f * RRatas) + sivu, pinta + d * (0.88f * RRatas) - sivu, ulos, Keha);
            }
            for (int i = 0; i < kaaria; i++)
            {
                float a0 = i * 2f * Mathf.PI / kaaria, a1 = (i + 1) * 2f * Mathf.PI / kaaria;
                var d0 = new Vector3(0f, Mathf.Sin(a0), Mathf.Cos(a0)); var d1 = new Vector3(0f, Mathf.Sin(a1), Mathf.Cos(a1));
                r.NelioUlos(pinta + d0 * (0.84f * RRatas), pinta + d1 * (0.84f * RRatas), pinta + d1 * (0.97f * RRatas), pinta + d0 * (0.97f * RRatas), ulos, Keha);
            }
            for (int i = 0; i < 6; i++)
            {
                float a0 = i * Mathf.PI / 3f, a1 = (i + 1) * Mathf.PI / 3f;
                r.KolmioUlos(pinta + ulos * 0.00005f, pinta + ulos * 0.00005f + new Vector3(0f, Mathf.Sin(a0), Mathf.Cos(a0)) * (0.16f * RRatas),
                    pinta + ulos * 0.00005f + new Vector3(0f, Mathf.Sin(a1), Mathf.Cos(a1)) * (0.16f * RRatas), ulos, Napa);
            }
        }

        /// <summary>
        /// Savu- ja höyrypallo (lapset 1–15): hieman kuhmurainen pallo (triakisikosaedri, 60 tahkoa), jonka yläkupu on
        /// tummempaa savua (ramppi 1,3, liukuma yläpuoliskolla) ja alapuoli vaaleaa (1,9). Animoi kääntää kuvun ylös
        /// hiilisavulle ja alas vaalealle savulle tai höyrylle, joten tummuus vaihtelee näytöksittäin ja pallo vaalenee
        /// hajotessaan ilman omaa verkkoa. Ei ääriviivaa (savu erottuu varjostuksellaan).
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja(1f);
            // Triakisikosaedri (60 tahkoa): ikosaedrin jokaisen tahkon keskipiste nostetaan pallon pinnalle, joten pallo on
            // lähes pyöreä (ei kiven särmiä) ja kolmioita on vähemmän kuin kerran jaetussa ikosaedrissa (80).
            const float f = 1.618034f;
            var k = new[] { new Vector3(-1, f, 0), new Vector3(1, f, 0), new Vector3(-1, -f, 0), new Vector3(1, -f, 0),
                new Vector3(0, -1, f), new Vector3(0, 1, f), new Vector3(0, -1, -f), new Vector3(0, 1, -f),
                new Vector3(f, 0, -1), new Vector3(f, 0, 1), new Vector3(-f, 0, -1), new Vector3(-f, 0, 1) };
            var t = new[] { 0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
                3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1 };
            for (int i = 0; i < t.Length; i += 3)
            {
                Vector3 a = k[t[i]].normalized, b = k[t[i + 1]].normalized, d = k[t[i + 2]].normalized, m = (a + b + d).normalized;
                SavuKolmio(r, a, b, m); SavuKolmio(r, b, d, m); SavuKolmio(r, d, a, m);
            }
            return r.Verkko("merilaiva-savu");
        }

        /// <summary>Kärjen paikka: suunta × säde, jota kuhmu muuttaa ±18 % suunnan mukaan (sama suunta → sama kärki).</summary>
        static Vector3 Kuhmu(Vector3 s)
        {
            float k = 1f + 0.13f * Mathf.Sin(7.3f * s.x + 3.1f * s.y + 0.7f) * Mathf.Cos(5.7f * s.z - 2.3f * s.y) + 0.05f * Mathf.Sin(11f * s.z + 4f * s.x);
            return s * (RSavu * k);
        }

        static void SavuKolmio(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d)
        {
            var keski = (a + b + d).normalized;
            float kupu = Mathf.SmoothStep(0f, 1f, (keski.y + 0.25f) / 0.8f);
            r.KolmioUlos(Kuhmu(a), Kuhmu(b), Kuhmu(d), keski, Rampi(Mathf.Lerp(SavuVaalea, SavuTumma, kupu)));
        }

        /// <summary>
        /// Vanavesi (lapsi 16, vesikerros, pysyy vaakasuorassa ja hengittää hieman): pehmeä varjo rungon alla, vesirajan
        /// vaahtoreunus, keulakuohu sirppinä ja viiksinä, rattaiden kuohu kotelojen kohdalla ja vaahtojuovat taakse, perän
        /// vana, Kelvinin kiila (±19,5°) sulkamaisina vinoina harjoina ja poikittaiset aallot kiilan sisällä. Kaikki kolmiot
        /// osoittavat ylös (MeriMalli karsii takapinnat); varjo ensin, vaahto sen päälle.
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            var vaahto = MeriRakentaja.Vaahto;
            // 1. Varjo rungon alla (keskellä, koska Animoi ei tiedä maailman ilmansuuntia: juuri on kierretty rannikon suuntaan).
            r.Soikio(new Vector3(0f, 0.0002f, -0.002f), 0.029f, 0.094f, MeriRakentaja.VarjoVari, 0.17f, 0f, 20);
            // 2. Vesirajan vaahtoreunus kylkiä pitkin (kirkkaampi keulassa).
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                Juova(r, q => { float z = Mathf.Lerp(0.062f, -0.058f, q); return new Vector3(p * (0.9f * Puolileveys(z * 1.12f) + 0.0011f), 0.0006f, z); },
                    q => Mathf.Lerp(0.0028f, 0.0018f, q), q => Mathf.Lerp(0.55f, 0.18f, q), vaahto, 10);
            }
            // 3. Rattaiden kuohu: kirkas soikio kotelon kohdalla ja vaahtojuova taakse, joka kaartuu perän vanaan.
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                r.Soikio(new Vector3(p * 0.0165f, 0.0007f, ZRatas - 0.003f), 0.0062f, 0.0118f, vaahto, 0.78f, 0f, 12);
                Juova(r, q => new Vector3(p * (0.0172f - 0.006f * q * q), 0.0008f, ZRatas - 0.010f - 0.092f * q),
                    q => Mathf.Lerp(0.0085f, 0.013f, q), q => 0.6f * Mathf.Pow(1f - q, 1.5f), vaahto, 6);
            }
            // 4. Perän vana keskellä.
            Juova(r, q => new Vector3(0f, 0.0009f, -0.062f - 0.105f * q), q => Mathf.Lerp(0.008f, 0.021f, q), q => 0.48f * (1f - q) * (1f - q), vaahto, 6);
            // 5. Kelvinin kiila: haarat keulan olkapäiltä ±19,5°, näkyvät kotelojen kohdalta taakse yhtenäisenä ohuena
            //    viivana (pelikoossa selvä V), ja ulkoreunalla lyhyet vinot harjat (sulka, kaiverrusilme lähikuvassa).
            float kiila = 19.5f * Mathf.Deg2Rad;
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var alku = new Vector3(p * 0.007f, 0.0010f, 0.052f);
                var suunta = new Vector3(p * Mathf.Sin(kiila), 0f, -Mathf.Cos(kiila));
                Juova(r, q => alku + suunta * (0.048f + 0.165f * q), q => Mathf.Lerp(0.0021f, 0.0034f, q),
                    q => 0.5f * Mathf.Clamp01(0.35f + 5f * q) * Mathf.Pow(1f - q, 1.3f), vaahto, 8);
                float h = (19.5f + 33f) * Mathf.Deg2Rad;
                var harja = new Vector3(p * Mathf.Sin(h), 0f, -Mathf.Cos(h));
                const int harjoja = 6;
                for (int i = 0; i < harjoja; i++)
                {
                    float q = (i + 0.6f) / (harjoja + 0.4f);
                    var kanta = alku + suunta * (0.048f + 0.165f * q) + new Vector3(0f, 0.0001f, 0f);
                    float pit = 0.007f + 0.007f * q, alfa = 0.4f * Mathf.Pow(1f - q, 1.2f);
                    Juova(r, t => kanta + harja * (pit * t), t => 0.0022f * (1f - 0.6f * t), t => alfa * (1f - t), vaahto, 2);
                }
            }
            // 6. Poikittaiset aallot: kaksi lyhyttä kaarta heti perän takana, kaartuvat haaroja kohti eteen.
            for (int i = 0; i < 2; i++)
            {
                float z = -0.084f - 0.03f * i, lev = 0.55f * (0.007f + (0.052f - z) * Mathf.Sin(kiila) / Mathf.Cos(kiila)), alfa = 0.24f - 0.08f * i;
                Juova(r, q => { float x = Mathf.Lerp(-lev, lev, q); return new Vector3(x, 0.0010f, z + 0.3f * x * x / lev); },
                    q => 0.002f, q => alfa * Mathf.Sin(Mathf.PI * q), vaahto, 8);
            }
            // 7. Keulakuohu: sirppi keulavarren ympärillä ja viikset kyljille.
            const int n = 8;
            var kk = new Vector3(0f, 0.0011f, 0.0605f);
            for (int i = 0; i < n; i++)
            {
                float a0 = Mathf.Lerp(-1.75f, 1.75f, i / (float)n), a1 = Mathf.Lerp(-1.75f, 1.75f, (i + 1) / (float)n);
                Vector3 s0 = kk + new Vector3(Mathf.Sin(a0) * 0.0045f, 0f, Mathf.Cos(a0) * 0.0085f), s1 = kk + new Vector3(Mathf.Sin(a1) * 0.0045f, 0f, Mathf.Cos(a1) * 0.0085f);
                Vector3 u0 = kk + new Vector3(Mathf.Sin(a0) * 0.0085f, 0f, Mathf.Cos(a0) * 0.0135f), u1 = kk + new Vector3(Mathf.Sin(a1) * 0.0085f, 0f, Mathf.Cos(a1) * 0.0135f);
                float r0 = 0.8f - 0.25f * Mathf.Abs(a0) / 1.75f, r1 = 0.8f - 0.25f * Mathf.Abs(a1) / 1.75f;
                NelioVesi(r, s0, s1, u1, u0, MeriRakentaja.Alfa(vaahto, r0), MeriRakentaja.Alfa(vaahto, r1), MeriRakentaja.Alfa(vaahto, 0f), MeriRakentaja.Alfa(vaahto, 0f));
            }
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f, a = 34f * Mathf.Deg2Rad;
                var alku = new Vector3(p * 0.006f, 0.0012f, 0.058f);
                var suunta = new Vector3(p * Mathf.Sin(a), 0f, -Mathf.Cos(a));
                Juova(r, q => alku + suunta * (0.04f * q), q => Mathf.Lerp(0.0025f, 0.0055f, q), q => Mathf.Lerp(0.7f, 0f, q), vaahto, 3);
            }
            r.Vesi = false;
            return r.Verkko("merilaiva-vanavesi");
        }

        /// <summary>Vesikerroksen nauha käyrää pitkin: keskilinja, leveys ja alfa parametrin q ∈ [0, 1] funktioina.</summary>
        static void Juova(MeriRakentaja r, System.Func<float, Vector3> kaari, System.Func<float, float> leveys, System.Func<float, float> alfa, Color vari, int jaot)
        {
            for (int i = 0; i < jaot; i++)
            {
                float q0 = i / (float)jaot, q1 = (i + 1) / (float)jaot;
                Vector3 p0 = kaari(q0), p1 = kaari(q1);
                Vector3 s0 = Sivu(kaari, q0) * (0.5f * leveys(q0)), s1 = Sivu(kaari, q1) * (0.5f * leveys(q1));
                Color c0 = MeriRakentaja.Alfa(vari, alfa(q0)), c1 = MeriRakentaja.Alfa(vari, alfa(q1));
                NelioVesi(r, p0 - s0, p0 + s0, p1 + s1, p1 - s1, c0, c0, c1, c1);
            }
        }

        /// <summary>Käyrän vaakasuora sivuvektori (yksikkö) kohdassa q.</summary>
        static Vector3 Sivu(System.Func<float, Vector3> kaari, float q)
        {
            var t = kaari(Mathf.Min(1f, q + 0.01f)) - kaari(Mathf.Max(0f, q - 0.01f));
            t.y = 0f;
            return Vector3.Cross(Vector3.up, t).normalized;
        }

        /// <summary>Vesinelikulmio, jonka kolmiot osoittavat aina ylös (järjestys käännetään tarvittaessa).</summary>
        static void NelioVesi(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color ca, Color cb, Color cd, Color ce)
        {
            if (Vector3.Cross(b - a, d - a).y + Vector3.Cross(d - a, e - a).y >= 0f) r.NelioVarit(a, b, d, e, ca, cb, cd, ce);
            else r.NelioVarit(a, e, d, b, ca, ce, cd, cb);
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>Puuskat (0–1): kaksi mahdollista paikkaa näytöksessä, kumpikin 55 %:n todennäköisyydellä; nousu 1,4 s,
        /// pito 1–2,8 s, lasku 2,8 s.</summary>
        static float Puuska(int n, float s, float pituus)
        {
            float p = 0f;
            for (int i = 0; i < 2; i++)
            {
                if (Aikataulu.Arvo(n, 20 + i) > 0.55f) continue;
                float alku = pituus * (0.16f + 0.42f * i + 0.2f * Aikataulu.Arvo(n, 22 + i));
                float voima = 0.6f + 0.4f * Aikataulu.Arvo(n, 24 + i), pito = 1f + 1.8f * Aikataulu.Arvo(n, 26 + i);
                p = Mathf.Max(p, voima * Pehmea((s - alku) / 1.4f) * (1f - Pehmea((s - alku - 1.4f - pito) / 2.8f)));
            }
            return p;
        }

        /// <summary>
        /// Näytös: sama reitti kuin vanhalla laivalla (rannikon suuntainen kaari z ±0,35, merelle päin −x 0,05–0,09 keskeltä,
        /// pohjoiseen tai etelään jaksosta, häivytys 2,5 s). Keinunta siemenestä kahdella taajuudella ja puuskissa enemmän
        /// (kallistus suojan puolelle), rattaat pyörivät kuljetun matkan mukaan (luisto 25 %), savu piipusta (tahti, koko,
        /// tummuus ja sivutuuli näytöksittäin), vanavesi hengittää. Harvinainen (noin 1/10): vihellys keskellä matkaa, iso
        /// höyrypilvi pillistä ja savun tauko. Ei allokaatioita. Nopeus ei vaikuta suoraan: aika kulkee jo yksilön nopeuden
        /// mukaan (ElavatElementit.AikaEteen).
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            float q = s / pituus;
            float v = pohjoiseen ? q : 1f - q, w = 2f * v - 1f;
            float kaari = 0.05f + 0.04f * Aikataulu.Arvo(n, 4);
            roottori.localPosition = new Vector3(-kaari * (1f - w * w), 0f, 0.35f * w);
            var suunta = new Vector3(4f * kaari * w, 0f, 0.7f).normalized * (pohjoiseen ? 1f : -1f);

            // Keinunta: kaksi taajuutta (ei tasaista toistoa), puuskassa voimakkaampi ja kallistus suojan puolelle (+x alas).
            float puuska = Puuska(n, s, pituus);
            float vaihe = Aikataulu.Arvo(n, 5) * 20f;
            float jakso = 4.4f + 1.6f * Aikataulu.Arvo(n, 7), kulma = (s + vaihe) * 2f * Mathf.PI / jakso;
            float kallistus = (1.3f + 1.1f * Aikataulu.Arvo(n, 6)) * (1f + 0.6f * puuska) * (Mathf.Sin(kulma) + 0.35f * Mathf.Sin(1.73f * kulma + 1.3f))
                + 2.4f * puuska;
            float nyokkays = (0.4f + 0.35f * Aikataulu.Arvo(n, 8)) * Mathf.Sin((s + vaihe) * 2f * Mathf.PI / (3.1f + 0.9f * Aikataulu.Arvo(n, 9)));
            var keinunta = Quaternion.Euler(nyokkays, 0f, -kallistus);
            roottori.localRotation = Quaternion.LookRotation(suunta, Vector3.up) * keinunta;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var suoraan = Quaternion.Inverse(keinunta);

            // Siipirattaat: kuljettu matka / säde, luisto 25 %.
            var rattaat = lapset[0];
            rattaat.localPosition = new Vector3(0f, YAkseli, ZRatas);
            rattaat.localRotation = Quaternion.Euler(q * 0.7f / RRatas * 1.25f * Mathf.Rad2Deg, 0f, 0f);
            rattaat.localScale = Vector3.one;

            // Savu: uusi pallo tahdin välein, elinikä = pallot × tahti; näytöksittäin tahti, koko, tummuus ja sivutuuli.
            float tahti = 0.36f + 0.24f * Aikataulu.Arvo(n, 13), ika = Savuja * tahti;
            float koko = 0.72f + 0.28f * Aikataulu.Arvo(n, 14), tummuus = Aikataulu.Arvo(n, 15), tuuli = 0.55f + 0.45f * Aikataulu.Arvo(n, 16);
            float vAlku = pituus * (0.4f + 0.14f * Aikataulu.Arvo(n, 17)), vKesto = 3.4f;
            var suu = PiipunSuu;
            var suuNyt = keinunta * suu;
            for (int k = 0; k < Savuja; k++)
            {
                var pallo = lapset[Lapsia + k];
                float x = s / ika + k / (float)Savuja;
                int kierros = (int)x;
                float a = x - kierros, syntyi = s - a * ika;
                int id = kierros * Savuja - k;
                // Vihellyksen aikana piippu ei savua: sinä aikana syntyvät pallot jäävät pois (aukko kulkee savussa taakse).
                if (harv && syntyi > vAlku - 0.3f && syntyi < vAlku + vKesto) { pallo.localScale = Vector3.zero; continue; }
                float oma = MeriGeometria.Arpa(907 + n, id, 0), oma2 = MeriGeometria.Arpa(907 + n, id, 1), oma3 = MeriGeometria.Arpa(907 + n, id, 2);
                // Pallon oma vauhti ±12 %, joten välit eivät ole tasaiset. Savu lähtee piipusta laivan vauhdissa ja kuumana:
                // se nousee ensin tiheänä pylväänä (nousu nopein alussa) ja taipuu vasta sitten taakse ja suojaan (ajautuma
                // kiihtyy iän mukana), joten piipun päällä pallot ovat tiheässä ja hajoavat loppua kohti.
                float aa = Mathf.Clamp01(a * (0.88f + 0.24f * oma3)), b = 1f - aa;
                float nousu = ((0.022f + 0.008f * oma2) * (1f - b * b * b) + 0.007f * aa) * (1f - 0.45f * puuska);
                float ajo = Mathf.Pow(aa, 1.4f);
                var p = Vector3.Lerp(suuNyt, suu, Pehmea(a * 3f)) + new Vector3(
                    tuuli * (0.045f + 0.02f * puuska) * ajo + 0.012f * (oma - 0.5f) * aa,
                    nousu + 0.004f * (oma3 - 0.5f) * aa,
                    -(0.078f + 0.02f * puuska) * ajo + 0.006f * (oma2 - 0.5f) * aa);
                pallo.localPosition = suoraan * p;
                float sk = koko * (0.55f + 1.45f * Mathf.Pow(aa, 0.6f)) * (0.8f + 0.4f * oma) * Pehmea(a / 0.06f) * Pehmea((1f - a) / 0.22f);
                pallo.localScale = new Vector3(sk, 0.8f * sk, sk);
                // Tumma kupu ylhäällä hiilisavulla (näytöksen tummuus, pallokohtainen vaihtelu ±0,15) elämän alkupuoliskon ajan,
                // sitten kupu kääntyy alas ja pallo vaalenee hajotessaan.
                float kupu = 180f * (1f - Mathf.Clamp01(tummuus + 0.3f * (oma2 - 0.5f)) * (1f - Pehmea((a - 0.45f) / 0.5f)));
                pallo.localRotation = suoraan * Quaternion.Euler(kupu, 360f * oma2 + 60f * a, 25f * (oma3 - 0.5f));
            }

            // Vihellys (harvinainen): kolme höyrypalloa pillistä porrastettuna pylvääksi: alin on nopea suihku pillin päällä,
            // keskimmäinen pullistuu sen yläpuolelle ja ylin iso pilvi ajautuu taakse ja suojaan; vihellyksen jälkeen hajoavat.
            var pilli = keinunta * PillinPaa;
            for (int j = 0; j < Hoyryja; j++)
            {
                var pallo = lapset[Lapsia + Savuja + j];
                float ts = s - vAlku - 0.3f * j;
                if (!harv || ts < 0f || ts > vKesto + 1.8f) { pallo.localScale = Vector3.zero; continue; }
                float kasvu = Pehmea(ts / (0.35f + 0.15f * j)), haipyy = Pehmea((vKesto + 1.8f - ts) / 1.4f);
                float nousu = (0.009f + 0.011f * j) * Pehmea(ts / (0.5f + 0.3f * j)) + 0.0025f * ts;
                var p = pilli + new Vector3(tuuli * (0.002f + 0.003f * j) * ts + 0.003f * (j - 1),
                    0.002f + nousu, -(0.002f + 0.004f * j) * ts - 0.0025f * j);
                pallo.localPosition = suoraan * p;
                float sk = (1.4f + 0.5f * j) * kasvu * haipyy;
                pallo.localScale = new Vector3(sk, 0.88f * sk, sk);
                pallo.localRotation = suoraan * Quaternion.Euler(180f + 25f * j, 110f * j + 15f * ts, 10f * j);
            }

            // Vanavesi: vaakasuorassa (keinunta kumotaan) ja hengittää hieman (pituus ±7 %, leveys ±4 %).
            var vana = lapset[Lapsia + Lapsia2];
            float h = Mathf.Sin(s * 2f * Mathf.PI / (4.5f + 2f * Aikataulu.Arvo(n, 12)) + vaihe);
            vana.localPosition = Vector3.zero;
            vana.localRotation = suoraan;
            vana.localScale = new Vector3(1f + 0.04f * h, 1f, 1f + 0.07f * h);
        }
    }
}
