// MEREN KORISTEIDEN LAATUTASO: JÄÄVUORI (Jäämeri ja Pohjois-Atlantti). Speksi docs/raportit/meri-laatu-speksi-20260927.md
// (Linssiseppä 27.9.2026; omistaja: "Nuo voisi tehdä korkeammalla laadulla"). Korvaa vanhan MeriJaavuoren (MalliRakenne,
// kylmät harmaansiniset sävyt, 80 kolmiota): sama aikataulu (siemen 937, näytös 30–60 s, tauko 60–150 s), sama ajelehtiminen
// ja kääntyminen sekä harvinaisen lohkeaman idea; verkot MeriRakentajalla MeriMalli-varjostimelle.
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// JÄÄVUORI (piikki- ja telakkajäävuori) jääkiteistä: kukin kide on epäsäännöllisen pistepilven kupera kuori, jonka isot
    /// tahkot on taltattu (jaettu vinosti ja painettu), joten pinnat ovat murtopintoja eivätkä vaakavöitä. Luoteessa
    /// ylätasanne (lumilaki 0,05–0,063) ja sen kulmassa pääpiikki (0,157) kaksoishuippuineen (0,128), edessä kaakossa
    /// alaterassi (0,021) toisine piikkeineen (0,1), koillisessa matala oinas (0,01) ja terassin länsireunalla ulospäin nojaava
    /// seraakki (0,081). Laet paperinvalkoisia (ramppi 2,0), seinämät rampissa (varjopuoli seepia), mustat railot (yksi
    /// seraakin juurella = lohkeaman ennusmerkki), sulamisvesijuovat ja aallon kovertama tumma lovi vesirajassa. Ympärillä
    /// vaalea vedenalainen jalka ja pehmeä varjo (vesikerros), vesirajassa hengittävä vaahtorengas ja kolme kelluvaa kimpaletta.
    /// Kerros lepää vain tauolla: näytös häivytetään sisään 2,5 s, jäävuori ajelehtii 0,1 rannikon suuntaan ja kääntyy 8°,
    /// nousee ja keinuu hitaasti (iso jäävuori: kallistus ≤ 3°, jaksot 6–9 s), 0–2 isompaa mainingia siemenestä; kimpaleet
    /// keinuvat ja ajelehtivat omissa vaiheissaan, rengas hengittää. Harvinainen (noin 1/10, ei koskaan ensimmäinen näytös):
    /// seraakki natisee, kaatuu saranansa (terassin reuna) ympäri ulospäin ja putoaa mereen, paperipalloroiske ja laajeneva
    /// vaahtorengas, pala pulpahtaa kellumaan uutena kimpaleena ja ajelehtii erilleen; keventynyt jäävuori heilahtaa ja asettuu.
    ///
    /// Rakenne (mallin avaruus: +y ylös, meren pinta y = 0, 1 yksikkö = 280 pt; vesiraja noin 0,14 × 0,17 ≈ 40 × 46 pt):
    ///   Roottori  jäävuori, vain kiinteää jäätä (ei vesikerrosta: keinuva roottori nostaisi sen laidan lasten vesikerrosten
    ///             päälle). Kaukotaso samat kiteet taltaamatta ja ilman tarroja. Animoi: ajelehtiminen, kääntyminen, nousu ja
    ///             keinunta (kallistus ≤ 3°, nyökkäys ≤ 1,8°; roottorin skaala aina 1, joten lapsia ei kompensoida).
    ///   Lapsi     (4) kimpale (growler): kolme kelluvaa (0–2) ja lohkeamasta syntyvä (3, näkyy vain harvinaisessa iskun
    ///             jälkeen); kukin omassa vesipisteessään, vaahtokaulus ja jalka omassa verkossa.
    ///   Lapsi2    (1) lohkeava seraakki jäävuoren koordinaateissa (origo = roottorin origo, joten kiinni ollessaan se pysyy
    ///             terassilla myös liioitellussa perspektiivissä); kaatuu, putoaa ja katoaa roiskeeseen.
    ///   Lapsi3    (2) vesi ja vaahto: jäävuoren vesirajan muotoinen pehmeä varjo, vedenalainen jalka ja vaahtorengas
    ///             (vesikerros) sekä roiskekruunu (seitsemän paperipalloa). 0 = jäävuoren vesikerros origossa vaakatasossa (keinunta
    ///             kumottu) VesiY:n korkeudella kimpaleiden vesikerrosten yläpuolella, hengittää xz-skaalalla, kruunu litistettynä
    ///             (y 0,03) jäävuoren alle piiloon; 1 = roiske: pienennetty vesikerros laajenee, kruunu nousee y-skaalalla ja
    ///             painuu vaahdoksi uuden kimpaleen ympärille.
    /// Värit vain rampista (Rampi, kärjen alfa 0) ja vesikerroksen Vaahto/VarjoVari; ei korostusta. Animoi ei allokoi.
    /// </summary>
    public static class MeriJaavuori
    {
        public const string Nimi = "jaavuori";
        public static readonly string[] Meret = { "jaameri", "atlantti" };
        /// <summary>Vesiraja noin 0,14 × 0,17 → 40 × 46 pt, pääpiikki 0,157; jalka ja kimpaleet mukana noin 75 pt.</summary>
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(937, 30f, 60f, 60f, 150f);
        const int Kelluvia = 3;
        public const int Lapsia = Kelluvia + 1, Lapsia2 = 1, Lapsia3 = 2;

        static Color R(float s) => MeriRakentaja.Rampi(s);
        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        static float Ulos(float x) { x = Mathf.Clamp01(x); float y = 1f - x; return 1f - y * y * y; }

        // =====================================================================================================================
        // Mitat: kiteet
        // =====================================================================================================================

        /// <summary>Kiteen pisterengas: määrä, kulmasiirto (°), korkeus, kutistus vesirajan säteestä, hajonnat, keskipisteen
        /// siirto, jyrkän kyljen suunta (°) ja voimakkuus (0 = tasainen kutistus, 1 = kylki pysyy pystynä) sekä kallistus
        /// (korkeuden kulmakerroin luoteeseen).</summary>
        struct Rengas
        {
            public int N; public float Kulma0, Y, F, HajR, HajY, Dx, Dz, JyrkkaKulma, Jyrkka, Kallistus;
            public Rengas(int n, float kulma0, float y, float f, float hajR = 0.06f, float hajY = 0.003f, float dx = 0f, float dz = 0f,
                float jyrkkaKulma = 0f, float jyrkka = 0f, float kallistus = 0f)
            {
                N = n; Kulma0 = kulma0; Y = y; F = f; HajR = hajR; HajY = hajY; Dx = dx; Dz = dz; JyrkkaKulma = jyrkkaKulma; Jyrkka = jyrkka;
                Kallistus = kallistus;
            }
        }

        static readonly Vector3 KallistusSuunta = new Vector3(-0.7071f, 0f, 0.7071f);

        static Vector3 V(float x, float y, float z) => new Vector3(x, y, z);

        /// <summary>Ylätasanne (runko, luoteinen puolisko): seinämät vesirajasta, lumilaki 0,05–0,063 nousee luoteeseen.</summary>
        static readonly Vector3 KeskiP = V(-0.010f, 0f, 0.010f);
        static readonly Vector3[] PohjaP =
        {
            V(0.048f, 0f, 0.018f), V(0.030f, 0f, 0.050f), V(-0.004f, 0f, 0.070f), V(-0.036f, 0f, 0.067f), V(-0.061f, 0f, 0.040f),
            V(-0.068f, 0f, 0.006f), V(-0.050f, 0f, -0.030f), V(-0.012f, 0f, -0.050f), V(0.020f, 0f, -0.036f), V(0.040f, 0f, -0.012f),
        };
        static readonly Rengas[] RenkaatP =
        {
            new Rengas(18, 5f, 0.016f, 0.995f, hajR: 0.05f, hajY: 0.004f, kallistus: 0.03f),
            new Rengas(16, 13f, 0.036f, 0.98f, hajR: 0.05f, hajY: 0.005f, kallistus: 0.08f),
            new Rengas(0, -2f, 0.054f, 0.955f, hajR: 0.03f, hajY: 0.002f, kallistus: 0.12f),
            new Rengas(9, 20f, 0.053f, 0.9f, hajR: 0.06f, hajY: 0.003f, kallistus: 0.12f),
            new Rengas(6, 40f, 0.058f, 0.55f, hajR: 0.3f, hajY: 0.003f, kallistus: 0.12f),
            new Rengas(3, 0f, 0.060f, 0.2f, hajR: 0.5f, hajY: 0.002f, kallistus: 0.12f),
        };

        /// <summary>Alaterassi (kaakkoinen puolisko, edessä): matala lumilaki 0,021, seinämävyö vesirajasta.</summary>
        static readonly Vector3 KeskiT = V(0.028f, 0f, -0.040f);
        static readonly Vector3[] PohjaT =
        {
            V(0.070f, 0f, -0.030f), V(0.062f, 0f, 0.002f), V(0.040f, 0f, 0.012f), V(0.010f, 0f, -0.020f),
            V(-0.018f, 0f, -0.050f), V(-0.010f, 0f, -0.072f), V(0.018f, 0f, -0.088f), V(0.050f, 0f, -0.078f),
        };
        static readonly Rengas[] RenkaatT =
        {
            new Rengas(14, 8f, 0.011f, 0.99f, hajR: 0.05f, hajY: 0.003f, kallistus: 0.03f),
            new Rengas(0, 2f, 0.020f, 0.97f, hajR: 0.03f, hajY: 0.0015f, kallistus: 0.05f),
            new Rengas(7, 25f, 0.0195f, 0.9f, hajR: 0.06f, hajY: 0.002f, kallistus: 0.05f),
            new Rengas(4, 20f, 0.023f, 0.45f, hajR: 0.3f, hajY: 0.0015f, kallistus: 0.05f),
        };

        /// <summary>Matala oinas (vedenalaisen jalan kohouma) tasanteen koillispuolella: 0,01 vesirajasta.</summary>
        static readonly Vector3 KeskiL = V(0.052f, 0f, 0.042f);
        static readonly Vector3[] PohjaL = { V(0.070f, 0f, 0.030f), V(0.068f, 0f, 0.052f), V(0.046f, 0f, 0.066f), V(0.030f, 0f, 0.050f), V(0.040f, 0f, 0.022f) };
        static readonly Rengas[] RenkaatL =
        {
            new Rengas(0, 3f, 0.009f, 0.94f, hajR: 0.04f, hajY: 0.0015f),
            new Rengas(3, 30f, 0.011f, 0.5f, hajR: 0.3f, hajY: 0.001f),
        };

        /// <summary>Pääpiikki tasanteen luoteiskulmassa: luoteiskylki nousee suoraan merestä (tasannetta 0,01 ulompana).</summary>
        static readonly Vector3 KeskiA = V(-0.036f, 0f, 0.040f);
        static readonly Vector3[] PohjaA =
        {
            V(-0.008f, 0f, 0.052f), V(-0.020f, 0f, 0.074f), V(-0.046f, 0f, 0.077f), V(-0.068f, 0f, 0.054f),
            V(-0.072f, 0f, 0.026f), V(-0.052f, 0f, 0.006f), V(-0.022f, 0f, 0.012f),
        };
        static readonly Rengas[] RenkaatA =
        {
            new Rengas(0, 4f, 0.036f, 0.975f, hajR: 0.03f, hajY: 0.004f),
            new Rengas(6, 25f, 0.070f, 0.84f, hajY: 0.005f, dx: -0.001f, dz: 0.002f, jyrkkaKulma: 135f, jyrkka: 0.6f),
            new Rengas(5, 60f, 0.102f, 0.56f, hajY: 0.005f, dx: -0.003f, dz: 0.004f, jyrkkaKulma: 135f, jyrkka: 0.4f),
            new Rengas(4, 15f, 0.129f, 0.28f, hajY: 0.004f, dx: -0.005f, dz: 0.007f),
        };
        static readonly Vector3[] HuiputA = { V(-0.044f, 0.157f, 0.050f), V(-0.030f, 0.145f, 0.042f) };

        /// <summary>Kaksoispiikki pääpiikin lounaiskyljessä (lovi harjalinjaan): juuri tasanteen sisällä.</summary>
        static readonly Vector3 KeskiA2 = V(-0.046f, 0.04f, 0.016f);
        static readonly Vector3[] PohjaA2 = { V(-0.030f, 0.04f, 0.018f), V(-0.040f, 0.04f, 0.032f), V(-0.060f, 0.04f, 0.028f), V(-0.062f, 0.04f, 0.006f), V(-0.044f, 0.04f, -0.002f) };
        static readonly Rengas[] RenkaatA2 = { new Rengas(5, 20f, 0.082f, 0.78f, hajY: 0.004f), new Rengas(3, 50f, 0.108f, 0.42f, hajY: 0.003f, dx: -0.002f, dz: 0.001f) };
        static readonly Vector3[] HuiputA2 = { V(-0.049f, 0.128f, 0.017f) };

        /// <summary>Toinen piikki terassilla (telakan vastapari); juuri terassin sisällä (y 0,014).</summary>
        static readonly Vector3 KeskiB = V(0.046f, 0.014f, -0.034f);
        static readonly Vector3[] PohjaB =
        {
            V(0.068f, 0.014f, -0.034f), V(0.0565f, 0.014f, -0.0158f), V(0.0345f, 0.014f, -0.0176f), V(0.0241f, 0.014f, -0.0359f),
            V(0.0359f, 0.014f, -0.0558f), V(0.0592f, 0.014f, -0.0528f),
        };
        static readonly Rengas[] RenkaatB =
        {
            new Rengas(5, 30f, 0.052f, 0.85f, hajY: 0.004f),
            new Rengas(4, 10f, 0.076f, 0.5f, hajY: 0.004f, dx: 0.002f, dz: -0.002f, jyrkkaKulma: 330f, jyrkka: 0.5f),
        };
        static readonly Vector3[] HuiputB = { V(0.050f, 0.100f, -0.038f), V(0.043f, 0.093f, -0.030f) };

        /// <summary>Lohkeava pilari (seraakki) terassin länsireunalla: ulkopinta seinämävyön linjassa (seinämän suunta
        /// LaattaKulma, reunan keskikohta LaattaReuna), puolileveys, paksuus, juuren korkeus (sarana = ulkopinnan alareuna
        /// terassin reunalla), korkeus juuresta, ulkoneminen seinämästä ja kallistus ulospäin (osuus korkeudesta).</summary>
        const float LaattaKulma = 200f, LaattaLeveys = 0.010f, LaattaPaksuus = 0.014f, LaattaJuuri = 0.021f, LaattaKorkeus = 0.060f,
            LaattaUlkona = 0.0025f, LaattaNojaa = 0.08f;
        static readonly Vector3 LaattaReuna = V(-0.014f, 0f, -0.061f);
        static Vector3 LaattaO => new Vector3(Mathf.Cos(LaattaKulma * Mathf.Deg2Rad), 0f, Mathf.Sin(LaattaKulma * Mathf.Deg2Rad));
        static Vector3 LaattaT => new Vector3(-Mathf.Sin(LaattaKulma * Mathf.Deg2Rad), 0f, Mathf.Cos(LaattaKulma * Mathf.Deg2Rad));

        /// <summary>Jäävuoren vaakasuoran vesikerroksen (Lapsi3, 0) korkeus: kimpaleiden vesikerrosten (0,0003 + nousu ja keinunta)
        /// yläpuolella.</summary>
        const float VesiY = 0.0045f;
        /// <summary>Jään sävy: tahkot ovat rampin yläpäässä, joten varjo syntyy vain muodosta (varjopuoli seepia).</summary>
        const float Jaa = 2f, LoviSavy = 0.42f, RailoSavy = 0.15f, JuovaSavy = 1.72f;

        // =====================================================================================================================
        // Rakennusapurit (vain verkkojen rakennuksessa; allokoivat vapaasti)
        // =====================================================================================================================

        /// <summary>Kiinteät tahkot rakentajaan ja muistiin (tarrojen projisointi pinnalle).</summary>
        sealed class Kirja
        {
            public readonly MeriRakentaja R;
            public List<Vector3> T = new List<Vector3>();
            int laskuri;
            public Kirja(MeriRakentaja r) { R = r; }

            /// <summary>Kiinteä kolmio, etupuoli suuntaan ulos. Jään sävy: lumilaki puhtaan valkoinen, muut tahkot pienellä
            /// tahkokohtaisella vaihtelulla (särmät erottuvat), ellei sävyä annettu.</summary>
            public void Tahko(Vector3 a, Vector3 b, Vector3 d, Vector3 ulos, float savy = -1f)
            {
                var n = Vector3.Cross(b - a, d - a);
                if (n.sqrMagnitude < 1e-18f) return;
                if (Vector3.Dot(n, ulos) < 0f) n = -n;
                n.Normalize();
                float h = MeriGeometria.Arpa(937, laskuri++, 50);
                if (savy < 0f) savy = n.y > 0.85f ? Jaa : Jaa - 0.08f * h;
                R.KolmioUlos(a, b, d, ulos, MeriRakentaja.Rampi(savy));
                T.Add(a); T.Add(b); T.Add(d);
            }
        }

        static Vector3 Kulmasta(Vector3 c, float kulma, float sade) =>
            c + new Vector3(Mathf.Cos(kulma * Mathf.Deg2Rad) * sade, 0f, Mathf.Sin(kulma * Mathf.Deg2Rad) * sade);

        static Vector3[] Keha(Vector3 c, float[] kulma, float[] sade)
        {
            var p = new Vector3[kulma.Length];
            for (int i = 0; i < p.Length; i++) p[i] = Kulmasta(c, kulma[i], sade[i]);
            return p;
        }

        /// <summary>Säde pisteestä o suuntaan (kulma rad) monikulmioiden ulkoreunaan (0, jos ei osu).</summary>
        static float Ulottuma(Vector3 o, float kulma, Vector3[][] monikulmiot)
        {
            float dx = Mathf.Cos(kulma), dz = Mathf.Sin(kulma), paras = 0f;
            foreach (var p in monikulmiot)
                for (int i = 0; i < p.Length; i++)
                {
                    float ax = p[i].x - o.x, az = p[i].z - o.z, bx = p[(i + 1) % p.Length].x - o.x, bz = p[(i + 1) % p.Length].z - o.z;
                    float ex = bx - ax, ez = bz - az, nim = dx * ez - dz * ex;
                    if (Mathf.Abs(nim) < 1e-12f) continue;
                    float t = (ax * ez - az * ex) / nim, u = (ax * dz - az * dx) / nim;
                    if (t > 0f && u >= 0f && u <= 1f) paras = Mathf.Max(paras, t);
                }
            return paras;
        }

        /// <summary>Kiteen pistepilvi: pohjamonikulmio (vesiraja y = 0 tai toisen kiteen sisällä oleva juuri) ja renkaat: N > 0
        /// = N pistettä tasavälein (kulma ja säde hajotettuina), N = 0 = pohjan kulmat (terävät nurkat säilyvät, Kulma0 =
        /// kierre); säde pohjan säteestä kerrottuna (jyrkkä kylki pysyy lähellä pohjaa), lopuksi huiput.</summary>
        static List<Vector3> Pisteet(Vector3 c, Vector3[] pohja, Rengas[] renkaat, Vector3[] huiput, int siemen)
        {
            var mk = new[] { pohja };
            var p = new List<Vector3>(pohja);
            for (int L = 0; L < renkaat.Length; L++)
            {
                var r = renkaat[L];
                int n = r.N > 0 ? r.N : pohja.Length;
                for (int i = 0; i < n; i++)
                {
                    float a = r.N > 0 ? r.Kulma0 + 360f * (i + 0.4f * (MeriGeometria.Arpa(siemen, L * 32 + i, 1) - 0.5f)) / r.N
                        : Mathf.Atan2(pohja[i].z - c.z, pohja[i].x - c.x) * Mathf.Rad2Deg + r.Kulma0;
                    float ar = a * Mathf.Deg2Rad;
                    float jyrkka = Mathf.Max(0f, Mathf.Cos((a - r.JyrkkaKulma) * Mathf.Deg2Rad));
                    float f = (r.F + (1f - r.F) * r.Jyrkka * jyrkka * jyrkka) * (1f + r.HajR * (MeriGeometria.Arpa(siemen, L * 32 + i, 2) - 0.5f));
                    float d = Ulottuma(c, ar, mk) * f;
                    float x = c.x + r.Dx + Mathf.Cos(ar) * d, z = c.z + r.Dz + Mathf.Sin(ar) * d;
                    float y = r.Y + r.Kallistus * ((x - c.x) * KallistusSuunta.x + (z - c.z) * KallistusSuunta.z)
                        + r.HajY * (2f * MeriGeometria.Arpa(siemen, L * 32 + i, 3) - 1f);
                    p.Add(new Vector3(x, y, z));
                }
            }
            if (huiput != null) p.AddRange(huiput);
            return p;
        }

        /// <summary>Kupera kuori (inkrementaalinen, pienille pistejoukoille): kolmiot pisteindekseinä, normaali
        /// (b − a) × (c − a) ulospäin.</summary>
        static List<int> Kuori(List<Vector3> p)
        {
            int n = p.Count, a = 0, b = 0, c = 0, d = 0;
            float paras = 0f;
            for (int i = 1; i < n; i++) { float e = (p[i] - p[a]).sqrMagnitude; if (e > paras) { paras = e; b = i; } }
            paras = 0f;
            for (int i = 0; i < n; i++) { float e = Vector3.Cross(p[b] - p[a], p[i] - p[a]).sqrMagnitude; if (e > paras) { paras = e; c = i; } }
            paras = 0f;
            var n0 = Vector3.Cross(p[b] - p[a], p[c] - p[a]);
            for (int i = 0; i < n; i++) { float e = Mathf.Abs(Vector3.Dot(n0, p[i] - p[a])); if (e > paras) { paras = e; d = i; } }
            var f = new List<int>();
            var sisa = (p[a] + p[b] + p[c] + p[d]) * 0.25f;
            void Lisaa(int x, int y, int z)
            {
                if (Vector3.Dot(Vector3.Cross(p[y] - p[x], p[z] - p[x]), sisa - p[x]) > 0f) { f.Add(x); f.Add(z); f.Add(y); }
                else { f.Add(x); f.Add(y); f.Add(z); }
            }
            Lisaa(a, b, c); Lisaa(a, b, d); Lisaa(a, c, d); Lisaa(b, c, d);
            var nakyvat = new List<int>(); var reunat = new List<(int, int)>();
            for (int i = 0; i < n; i++)
            {
                if (i == a || i == b || i == c || i == d) continue;
                nakyvat.Clear();
                for (int t = 0; t < f.Count; t += 3)
                {
                    var nn = Vector3.Cross(p[f[t + 1]] - p[f[t]], p[f[t + 2]] - p[f[t]]);
                    float m = nn.magnitude;
                    if (m > 1e-14f && Vector3.Dot(nn, p[i] - p[f[t]]) / m > 1e-6f) nakyvat.Add(t);
                }
                if (nakyvat.Count == 0) continue;
                reunat.Clear();
                foreach (int t in nakyvat) { reunat.Add((f[t], f[t + 1])); reunat.Add((f[t + 1], f[t + 2])); reunat.Add((f[t + 2], f[t])); }
                for (int q = nakyvat.Count - 1; q >= 0; q--) f.RemoveRange(nakyvat[q], 3);
                foreach (var e in reunat)
                    if (!reunat.Contains((e.Item2, e.Item1))) { f.Add(e.Item1); f.Add(e.Item2); f.Add(i); }
            }
            return f;
        }

        /// <summary>Jääkide: pistepilven kupera kuori yhtenä ääriviivaosana. Isot tahkot taltataan: tahko jaetaan
        /// painopisteestään kolmeen, ja painopiste siirtyy normaalin suunnassa (−0,5…+0,5 × taltta × tahkon koko), isoimmat
        /// kahdesti; uudet kärjet ovat tahkon sisällä, joten saumoihin ei synny rakoja, ja ääriviiva pysyy ennallaan. Pohja
        /// (alaspäin) jätetään pois, ellei pyydetä (lohkeava pilari: murtopinta näkyy kaatuessa). Palauttaa kiteen kolmiot
        /// (tarrojen projisointiin).</summary>
        static List<Vector3> Kide(Kirja k, List<Vector3> p, bool pohja = false, float taltta = 0f)
        {
            var f = Kuori(p);
            k.T = new List<Vector3>();
            k.R.AloitaOsa();
            int laskuri = 0;
            void Taltta(Vector3 a, Vector3 b, Vector3 d, Vector3 n, int syvyys)
            {
                float koko = Mathf.Sqrt(0.5f * Vector3.Cross(b - a, d - a).magnitude);
                if (syvyys <= 0 || koko < 0.007f) { k.Tahko(a, b, d, n); return; }
                // Jakopiste satunnaisesti tahkon sisällä (painot 0,15–0,7), jottei synny säännöllisiä tähtiä.
                float h = MeriGeometria.Arpa(941, laskuri, 5) - 0.5f;
                float wa = 0.15f + 0.55f * MeriGeometria.Arpa(941, laskuri, 6), wb = 0.15f + 0.55f * MeriGeometria.Arpa(941, laskuri, 7);
                float wd = 0.15f + 0.55f * MeriGeometria.Arpa(941, laskuri++, 8), ws = wa + wb + wd;
                var c = (a * wa + b * wb + d * wd) / ws + n * (taltta * koko * h);
                Taltta(a, b, c, n, syvyys - 1); Taltta(b, d, c, n, syvyys - 1); Taltta(d, a, c, n, syvyys - 1);
            }
            for (int t = 0; t < f.Count; t += 3)
            {
                Vector3 a = p[f[t]], b = p[f[t + 1]], d = p[f[t + 2]];
                var n = Vector3.Cross(b - a, d - a);
                if (n.sqrMagnitude < 1e-16f) continue;
                n.Normalize();
                if (n.y < -0.6f) { if (pohja) k.Tahko(a, b, d, n, 1.9f); continue; }
                float koko = Mathf.Sqrt(0.5f * Vector3.Cross(b - a, d - a).magnitude);
                Taltta(a, b, d, n, taltta <= 0f || n.y > 0.8f ? 0 : koko > 0.026f ? 2 : 1);
            }
            k.R.LopetaOsa();
            return k.T;
        }

        static float[] Ulottumat(int m, Vector3[][] monikulmiot)
        {
            var r = new float[m + 1];
            for (int i = 0; i < m; i++) r[i] = Ulottuma(Vector3.zero, i * Mathf.PI * 2f / m, monikulmiot) + 0.0004f;
            r[m] = r[0];
            return r;
        }

        static Vector3 Sektori(int i, int m, float sade, float y)
        {
            float k = i * Mathf.PI * 2f / m;
            return new Vector3(Mathf.Cos(k) * sade, y, Mathf.Sin(k) * sade);
        }

        /// <summary>Vesikerroksen kaistat ulottuman ympäri: reuna b on säteellä kerroin[b] × ulottuma + lisa[b], alfa[b].</summary>
        static void Kaistat(MeriRakentaja r, float[] ulottuma, int m, float y, Color vari, float[] kerroin, float[] lisa, float[] alfa)
        {
            for (int i = 0; i < m; i++)
                for (int b = 0; b < kerroin.Length - 1; b++)
                {
                    float r0 = ulottuma[i], r1 = ulottuma[i + 1];
                    Vector3 a0 = Sektori(i, m, r0 * kerroin[b] + lisa[b], y), a1 = Sektori(i + 1, m, r1 * kerroin[b] + lisa[b], y);
                    Vector3 b0 = Sektori(i, m, r0 * kerroin[b + 1] + lisa[b + 1], y), b1 = Sektori(i + 1, m, r1 * kerroin[b + 1] + lisa[b + 1], y);
                    Color c0 = MeriRakentaja.Alfa(vari, alfa[b]), c1 = MeriRakentaja.Alfa(vari, alfa[b + 1]);
                    r.NelioVarit(a0, a1, b1, b0, c0, c0, c1, c1);
                }
        }

        /// <summary>Säde (Möller–Trumbore) kolmioihin: lähin osuma ja sen normaali säteen suuntaa vastaan.</summary>
        static bool Osuma(List<Vector3> t, Vector3 o, Vector3 d, out Vector3 p, out Vector3 n)
        {
            float paras = float.MaxValue; p = o; n = Vector3.up; bool osui = false;
            for (int i = 0; i < t.Count; i += 3)
            {
                Vector3 a = t[i], e1 = t[i + 1] - a, e2 = t[i + 2] - a, h = Vector3.Cross(d, e2);
                float det = Vector3.Dot(e1, h);
                if (Mathf.Abs(det) < 1e-14f) continue;
                float inv = 1f / det; var s = o - a;
                float u = Vector3.Dot(s, h) * inv; if (u < 0f || u > 1f) continue;
                var q = Vector3.Cross(s, e1);
                float v = Vector3.Dot(d, q) * inv; if (v < 0f || u + v > 1f) continue;
                float tt = Vector3.Dot(e2, q) * inv; if (tt <= 0f || tt >= paras) continue;
                paras = tt; osui = true; p = o + d * tt;
                var nn = Vector3.Cross(e1, e2).normalized;
                n = Vector3.Dot(nn, d) > 0f ? -nn : nn;
            }
            return osui;
        }

        /// <summary>Tarra pinnalla (railo, juova): näytepisteet ja normaalit → nauha 0,0007 pinnan yläpuolella; jokainen pätkä on
        /// oma pieni osa (ei ääriviivaa). Leveys voi kaventua (l0 → l1).</summary>
        static void Nauha(MeriRakentaja r, List<Vector3> p, List<Vector3> nn, float l0, float l1, float savy)
        {
            for (int i = 0; i < p.Count - 1; i++)
            {
                var t = p[i + 1] - p[i];
                if (t.sqrMagnitude < 1e-12f) continue;
                float q0 = i / (float)(p.Count - 1), q1 = (i + 1) / (float)(p.Count - 1);
                var s0 = Vector3.Cross(nn[i], t).normalized * (0.5f * Mathf.Lerp(l0, l1, q0));
                var s1 = Vector3.Cross(nn[i + 1], t).normalized * (0.5f * Mathf.Lerp(l0, l1, q1));
                Vector3 a = p[i] + nn[i] * 0.0007f, b = p[i + 1] + nn[i + 1] * 0.0007f;
                r.NelioUlos(a - s0, a + s0, b + s1, b - s1, nn[i] + nn[i + 1], R(savy));
            }
        }

        /// <summary>Railo laella: reitti (x, z) projisoidaan ylhäältä pinnalle 0,002 välein.</summary>
        static void Railo(MeriRakentaja r, List<Vector3> pinta, Vector3[] reitti, float leveys, float savy)
        {
            var p = new List<Vector3>(); var nn = new List<Vector3>();
            for (int s = 0; s < reitti.Length - 1; s++)
            {
                var a = reitti[s]; var b = reitti[s + 1];
                int m = 1 + (int)((b - a).magnitude / 0.002f);
                for (int q = 0; q < m + (s == reitti.Length - 2 ? 1 : 0); q++)
                {
                    var x = Vector3.Lerp(a, b, q / (float)m);
                    if (Osuma(pinta, new Vector3(x.x, 1f, x.z), -Vector3.up, out var h, out var hn)) { p.Add(h); nn.Add(hn); }
                }
            }
            Nauha(r, p, nn, leveys, leveys, savy);
        }

        /// <summary>Juova seinämällä: kulmassa (°) kiteen keskeltä, korkeudelta y0 alas y1:een, projisoitu vaakasuoraan
        /// seinämään; leveys kapenee alaspäin.</summary>
        static void Juova(MeriRakentaja r, List<Vector3> pinta, Vector3 c, float kulma, float y0, float y1, float l0, float l1, float savy)
        {
            var p = new List<Vector3>(); var nn = new List<Vector3>();
            var d = new Vector3(Mathf.Cos(kulma * Mathf.Deg2Rad), 0f, Mathf.Sin(kulma * Mathf.Deg2Rad));
            int m = 1 + (int)((y0 - y1) / 0.003f);
            for (int q = 0; q <= m; q++)
            {
                float y = Mathf.Lerp(y0, y1, q / (float)m);
                var o = new Vector3(c.x, y, c.z) + d * 0.3f;
                if (Osuma(pinta, o, -d, out var h, out var hn)) { p.Add(h); nn.Add(hn); }
            }
            Nauha(r, p, nn, l0, l1, savy);
        }

        /// <summary>Aallon kovertama lovi: tumma vyö kiteen juurella (0,0012–0,0048 vesirajasta) koko vesirajan ympäri
        /// projisoituna kiteen pintaan; toisen kiteen sisään jäävä osa jää piiloon.</summary>
        static void Lovi(MeriRakentaja r, List<Vector3> pinta, Vector3 c, Vector3[] pohja)
        {
            var mk = new[] { pohja };
            const int m = 28;
            Vector3 ala0 = Vector3.zero, yla0 = Vector3.zero, na0 = Vector3.zero, ny0 = Vector3.zero; bool edellinen = false;
            for (int i = 0; i <= m; i++)
            {
                float k = i * Mathf.PI * 2f / m;
                var d = new Vector3(Mathf.Cos(k), 0f, Mathf.Sin(k));
                float sade = Ulottuma(c, k, mk) + 0.05f;
                bool ok = Osuma(pinta, new Vector3(c.x, 0.0012f, c.z) + d * sade, -d, out var ala, out var na)
                    & Osuma(pinta, new Vector3(c.x, 0.0048f, c.z) + d * sade, -d, out var yla, out var ny);
                if (ok && edellinen)
                    r.NelioUlos(ala0 + na0 * 0.0006f, ala + na * 0.0006f, yla + ny * 0.0006f, yla0 + ny0 * 0.0006f, na + na0, R(LoviSavy));
                ala0 = ala; yla0 = yla; na0 = na; ny0 = ny; edellinen = ok;
            }
        }

        // =====================================================================================================================
        // Roottori: jäävuori
        // =====================================================================================================================

        public static Mesh Roottori() => Vuori(false);

        /// <summary>Kaukotaso (≤ 800, nyt 259): samat kiteet taltaamatta ja ilman tarroja (railot, juovat, lovi).</summary>
        public static Mesh RoottoriKauko() => Vuori(true);

        static Vector3[][] Pohjat() => new[] { PohjaP, PohjaT, PohjaA, PohjaL };

        static Mesh Vuori(bool kauko)
        {
            var r = new MeriRakentaja();
            var k = new Kirja(r);
            float ta = kauko ? 0f : 0.34f;
            var pp = Kide(k, Pisteet(KeskiP, PohjaP, RenkaatP, null, 20), taltta: ta);
            var te = Kide(k, Pisteet(KeskiT, PohjaT, RenkaatT, null, 21), taltta: ta);
            var a = Kide(k, Pisteet(KeskiA, PohjaA, RenkaatA, HuiputA, 22), taltta: ta);
            var l = Kide(k, Pisteet(KeskiL, PohjaL, RenkaatL, null, 25), taltta: ta);
            Kide(k, Pisteet(KeskiA2, PohjaA2, RenkaatA2, HuiputA2, 26), taltta: ta);
            Kide(k, Pisteet(KeskiB, PohjaB, RenkaatB, HuiputB, 23), taltta: ta);
            if (!kauko)
            {
                Lovi(r, pp, KeskiP, PohjaP); Lovi(r, te, KeskiT, PohjaT); Lovi(r, a, KeskiA, PohjaA); Lovi(r, l, KeskiL, PohjaL);
                // Railot: murtolinja pilarin juurella terassilla (lohkeaman ennusmerkki), railot tasanteen ja terassin poikki.
                var o = LaattaO; var tt = LaattaT;
                var juuri = LaattaReuna + o * (LaattaUlkona - LaattaPaksuus - 0.0015f);
                Railo(r, te, new[] { juuri - tt * (LaattaLeveys + 0.004f), juuri + o * 0.001f, juuri + tt * (LaattaLeveys + 0.005f) }, 0.0024f, RailoSavy);
                Railo(r, pp, new[] { V(0.036f, 0f, 0.042f), V(0.022f, 0f, 0.028f), V(0.016f, 0f, 0.01f), V(0.002f, 0f, 0.002f), V(-0.004f, 0f, -0.014f),
                    V(-0.016f, 0f, -0.036f) }, 0.0022f, RailoSavy);
                Railo(r, pp, new[] { V(-0.057f, 0f, 0.004f), V(-0.049f, 0f, -0.012f), V(-0.04f, 0f, -0.019f), V(-0.03f, 0f, -0.031f), V(-0.018f, 0f, -0.035f) }, 0.002f, RailoSavy);
                Railo(r, te, new[] { V(0.02f, 0f, -0.074f), V(0.026f, 0f, -0.062f), V(0.022f, 0f, -0.05f) }, 0.002f, RailoSavy);
                // Sulamisvesijuovat pääpiikin ja tasanteen seinämissä (hieman tummempia, kapenevat alaspäin).
                foreach (float kulma in new[] { 60f, 180f, 300f })
                    Juova(r, a, KeskiA, kulma, 0.11f, 0.065f, 0.002f, 0.0016f, JuovaSavy);
                foreach (float kulma in new[] { 25f, 70f })
                    Juova(r, pp, KeskiP, kulma, 0.05f, 0.012f, 0.002f, 0.0016f, JuovaSavy);
            }
            return r.Verkko(kauko ? "jäävuori kauko" : "jäävuori");
        }

        // =====================================================================================================================
        // Lapsi: kimpale
        // =====================================================================================================================

        static readonly float[] KimpaleKulma = { 0f, 50f, 105f, 150f, 200f, 250f, 305f };
        static readonly float[] KimpaleSade = { 0.0125f, 0.010f, 0.0085f, 0.011f, 0.0125f, 0.0095f, 0.0105f };
        static readonly Rengas[] RenkaatKimpale = { new Rengas(0, 6f, 0.004f, 0.92f, hajY: 0.0008f), new Rengas(3, 60f, 0.0064f, 0.55f, hajY: 0.0008f) };

        /// <summary>Kimpale (growler): matala särmikäs jääkide (säde noin 0,012, harja 0,0105), ympärillä vaahtokaulus ja vaalea
        /// jalka (vesikerros ensin, ääriviivan ulkopuolella). Origo vesirajassa keskellä.</summary>
        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja();
            var c = Vector3.zero;
            var pohja = Keha(c, KimpaleKulma, KimpaleSade);
            for (int i = 0; i < pohja.Length; i++) pohja[i].x *= 1.15f;
            const int m = 10;
            var ulottuma = Ulottumat(m, new[] { pohja });
            r.Vesi = true;
            Kaistat(r, ulottuma, m, 0.0001f, MeriRakentaja.Vaahto, new[] { 1f, 1.9f }, new[] { 0.0045f, 0f }, new[] { 0.26f, 0f });
            Kaistat(r, ulottuma, m, 0.0003f, MeriRakentaja.Vaahto, new[] { 1f, 1f, 1f }, new[] { 0.0045f, 0.0062f, 0.011f }, new[] { 0f, 0.55f, 0f });
            r.Vesi = false;
            var k = new Kirja(r);
            Kide(k, Pisteet(c, pohja, RenkaatKimpale, new[] { V(-0.003f, 0.0078f, 0.001f), V(0.004f, 0.0072f, -0.0015f) }, 31));
            return r.Verkko("jäävuori: kimpale");
        }

        // =====================================================================================================================
        // Lapsi2: lohkeava pilari
        // =====================================================================================================================

        /// <summary>Pilarin piste: s säteittäin olan reunasta (0 = seinämän linja, + ulos), t sivuttain, h korkeus juuresta;
        /// pilari nojaa ulospäin.</summary>
        static Vector3 LaattaPiste(float s, float t, float h) =>
            LaattaReuna + LaattaO * (s + h * LaattaNojaa) + LaattaT * t + new Vector3(0f, LaattaJuuri + h, 0f);

        /// <summary>
        /// Lohkeava pilari jäävuoren koordinaateissa: olan länsireunalla seisova jääsirpale (0,024 × 0,015, 0,062 olan reunasta
        /// eli noin 0,096 merestä), ulkopinta olan seinämän linjassa 0,0025 ulkona ja nojaa ulospäin; juuri upotettu olan sisään,
        /// vino murtokärki. Kupera kuori kuten muutkin kiteet; murtopinta pohjassa näkyy kaatuessa. Yksi ääriviivaosa.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja();
            var k = new Kirja(r);
            float w = LaattaLeveys, h = LaattaKorkeus, u = LaattaUlkona, si = LaattaUlkona - LaattaPaksuus;
            var p = new List<Vector3>
            {
                LaattaPiste(u, -w, -0.008f), LaattaPiste(u, w, -0.008f), LaattaPiste(si, w * 0.95f, -0.008f), LaattaPiste(si + 0.001f, -w * 0.9f, -0.008f),
                LaattaPiste(u + 0.0015f, -w * 1.02f, h * 0.42f), LaattaPiste(u + 0.0005f, w * 0.96f, h * 0.55f),
                LaattaPiste(si - 0.001f, w * 0.85f, h * 0.5f), LaattaPiste(si, -w * 0.9f, h * 0.38f),
                LaattaPiste(u + 0.001f, -w * 0.7f, h * 0.8f), LaattaPiste(u - 0.001f, w * 0.72f, h * 0.9f),
                LaattaPiste(si + 0.002f, w * 0.6f, h * 0.95f), LaattaPiste(si + 0.001f, -w * 0.55f, h * 0.84f),
                LaattaPiste((u + si) * 0.5f + 0.001f, w * 0.25f, h), LaattaPiste((u + si) * 0.5f - 0.001f, -w * 0.3f, h * 0.93f),
            };
            Kide(k, p, true);
            return r.Verkko("jäävuori: lohkeava pilari");
        }

        // =====================================================================================================================
        // Lapsi3: vaahtorengas ja roiskekruunu
        // =====================================================================================================================

        /// <summary>Roiskekruunun pallot (pituus, korkeus, poikittain, säde) jäävuoren pitkän akselin suunnassa (KruunuKulma):
        /// mittakaavassa 1 ja litistettynä (y 0,03) ne mahtuvat jäävuoren vesirajan sisään piiloon (akselilla ulottuma noin
        /// 0,087), roiskeena (xz 0,16–0,5) ne ovat pudonneen pilarin pituinen vesiseinä.</summary>
        static readonly float[] Kruunu = { 0f, 0.088f, 0f, 0.025f, 0.026f, 0.07f, 0.016f, 0.023f, -0.027f, 0.068f, -0.014f, 0.023f,
            0.048f, 0.046f, -0.012f, 0.02f, -0.05f, 0.044f, 0.012f, 0.02f, 0.012f, 0.036f, -0.024f, 0.018f, -0.014f, 0.032f, 0.024f, 0.018f };
        const float KruunuKulma = -50f;

        /// <summary>
        /// Vesi ja vaahto: jäävuoren vesirajan muotoiset kaistat (vesikerros y 0–0,0002): pehmeä varjo (muste 0,18 → 0 1,8 ×
        /// ulottumaan), vedenalainen jalka (vaahto 0,42 → 0 1,7 × ulottumaan) ja vaahtorengas (0,0105 ulkona kirkkain 0,62, 0,025
        /// ulkona häipynyt; sisäreunat ääriviivan ulkopuolella) sekä roiskekruunu seitsemästä paperipallosta (ramppi 1,95).
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja();
            const int m = 20;
            var ulottuma = Ulottumat(m, Pohjat());
            // Vesikerros (vaakasuorassa lapsessa, ei roottorissa: roottorin keinunta nostaisi sen laidan lasten vesikerrosten
            // päälle, ja syvyystesti leikkaisi ne): pehmeä varjo (muste), vedenalainen jalka (vaahto, alkaa ääriviivan
            // ulkopuolelta) ja vaahtorengas; kukin kerros edellisen yläpuolella.
            r.Vesi = true;
            Kaistat(r, ulottuma, m, 0f, MeriRakentaja.VarjoVari, new[] { 0.8f, 1f, 1.8f }, new[] { 0f, 0f, 0f }, new[] { 0.18f, 0.17f, 0f });
            // Sisäreunat 0,007 vesirajasta: kerros on VesiY:n korkeudella, joten 35°:ssa se siirtyy ruudulla jäävuoren juurta kohti;
            // näin vaahto alkaa ääriviivan (1,2 pt ≈ 0,0043) ulkopuolelta eikä haalista mustetta.
            Kaistat(r, ulottuma, m, 0.0001f, MeriRakentaja.Vaahto, new[] { 1f, 1f, 1.32f, 1.7f }, new[] { 0.007f, 0.012f, 0f, 0f },
                new[] { 0f, 0.42f, 0.3f, 0f });
            Kaistat(r, ulottuma, m, 0.0002f, MeriRakentaja.Vaahto, new[] { 1f, 1f, 1f, 1f }, new[] { 0.0072f, 0.0105f, 0.016f, 0.025f },
                new[] { 0f, 0.62f, 0.3f, 0f });
            r.Vesi = false;
            float kc = Mathf.Cos(KruunuKulma * Mathf.Deg2Rad), ks = Mathf.Sin(KruunuKulma * Mathf.Deg2Rad);
            for (int i = 0; i < Kruunu.Length; i += 4)
                r.Pallo(new Vector3(Kruunu[i] * kc - Kruunu[i + 2] * ks, Kruunu[i + 1], Kruunu[i] * ks + Kruunu[i + 2] * kc), Kruunu[i + 3], R(1.95f), 1);
            return r.Verkko("jäävuori: vaahto");
        }

        // =====================================================================================================================
        // Näytös
        // =====================================================================================================================

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>Kelluvien kimpaleiden suunnat (°) jäävuoren keskeltä, väli vesirajasta ja koot (x, y, z); paikat lasketaan
        /// kerran vesirajan ulottumasta (ei päällekkäin jäävuoren eikä lohkeaman roiskeen kanssa).</summary>
        static readonly float[] KelluvaKulma = { 28f, 112f, 305f }, KelluvaVali = { 0.03f, 0.046f, 0.026f };
        static readonly Vector3[] KelluvaKoko = { new Vector3(1.05f, 1f, 0.9f), new Vector3(0.74f, 0.8f, 0.82f), new Vector3(0.58f, 0.75f, 0.66f) };
        static readonly Vector3[] KelluvaPaikka = KelluvatPaikat();

        static Vector3[] KelluvatPaikat()
        {
            var pohjat = Pohjat();
            var p = new Vector3[Kelluvia];
            for (int i = 0; i < Kelluvia; i++)
            {
                float k = KelluvaKulma[i] * Mathf.Deg2Rad;
                float d = Ulottuma(Vector3.zero, k, pohjat) + KelluvaVali[i] + 0.012f * KelluvaKoko[i].x;
                p[i] = new Vector3(Mathf.Cos(k) * d, 0f, Mathf.Sin(k) * d);
            }
            return p;
        }

        // Lohkeaman vaiheet (s): natina ennen kaatumista, kaatuminen saranan ympäri, putoaminen mereen, laatan katoaminen roiskeeseen.
        const float LohkeamaKohta = 0.42f, Natina = 0.9f, Kaatuu = 0.75f, Putoaa = 0.32f, Katoaa = 0.22f;

        /// <summary>Isot mainingit (0–1): kaksi mahdollista paikkaa näytöksessä, kumpikin 60 %:n todennäköisyydellä.</summary>
        static float Maininki(int n, float s, float pituus)
        {
            float m = 0f;
            for (int i = 0; i < 2; i++)
            {
                if (Aikataulu.Arvo(n, 20 + i) > 0.6f) continue;
                float c = pituus * (0.15f + 0.4f * i + 0.3f * Aikataulu.Arvo(n, 22 + i));
                m = Mathf.Max(m, Pehmea((s - c + 3f) / 3f) * (1f - Pehmea((s - c - 2f) / 4f)));
            }
            return m;
        }

        /// <summary>Lapsen paikka ja asento jäävuoren vaakakehyksessä (vesipinnalla, keinunta kumottu).</summary>
        static void Aseta(Transform l, Quaternion suoraan, Vector3 nosto, Vector3 p, Quaternion q, Vector3 koko)
        {
            l.localPosition = suoraan * (p - nosto);
            l.localRotation = suoraan * q;
            l.localScale = koko;
        }

        static void Piilota(Transform l) { l.localPosition = Vector3.zero; l.localRotation = Quaternion.identity; l.localScale = Vector3.zero; }

        /// <summary>
        /// Näytös: juuri ajelehtii 0,1 rannikon suuntaan ja hieman merelle, jäävuori kääntyy 8° (asento jaksosta ±35°, pilari
        /// merelle päin) kuten ennen. Nousu (±0,0018–0,0026, 6,2–7,8 s), kallistus ja nyökkäys siemenestä, isoissa mainingeissa
        /// enemmän. Vaahtorengas pysyy vaakasuorassa vesipinnalla ja hengittää (laajenee jäävuoren painuessa). Kimpaleet keinuvat
        /// omissa vaiheissaan ja ajelehtivat hitaasti. Harvinainen: lohkeama 42 %:n kohdalla.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (roottori == null) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            float suunta = Aikataulu.Arvo(n, 3) < 0.5f ? 1f : -1f, u = s / pituus;
            float jalkeen = harv ? s - LohkeamaKohta * pituus : -1000f;   // aika kaatumisen alusta
            float isku = jalkeen - Kaatuu - Putoaa;                        // aika veteen iskusta
            float heilahdus = isku > 0f ? 1f - Pehmea(isku / 8f) : 0f, kevennys = isku > 0f ? Pehmea(isku / 3f) : 0f;

            // Aallokko: jaksot ja vaiheet näytöksestä, isot mainingit.
            float mai = Maininki(n, s, pituus);
            float w1 = 6.2832f / (6.2f + 1.6f * Aikataulu.Arvo(n, 6)), w2 = 6.2832f / (7.4f + 1.8f * Aikataulu.Arvo(n, 7));
            float w3 = 6.2832f / (6.4f + 1.4f * Aikataulu.Arvo(n, 8)), w4 = 6.2832f / (3.3f + 0.9f * Aikataulu.Arvo(n, 9));
            float f1 = 6.2832f * Aikataulu.Arvo(n, 10), f2 = 6.2832f * Aikataulu.Arvo(n, 11), f3 = 6.2832f * Aikataulu.Arvo(n, 12);
            float ampY = 0.0011f + 0.0005f * Aikataulu.Arvo(n, 13);
            float by = ampY * (1f + 0.5f * mai) * Mathf.Sin(w1 * s + f1) + 0.0003f * Mathf.Sin(2.3f * w1 * s + f2) + 0.0012f * kevennys;
            // Kallistus ja nyökkäys rajattu (enintään 3° ja 1,8°): iso jäävuori keinuu vähän, ja laidan painuma (0,13 × sin 3,5° +
            // nousu ≈ 0,0095) pysyy kartan pinnan yläpuolella (ElavatElementit nostaa juuren 0,01 maan yllä).
            float kallistus = Mathf.Clamp((0.8f + 0.6f * Aikataulu.Arvo(n, 14)) * (1f + 0.4f * mai) * Mathf.Sin(w2 * s + f2)
                + 2.4f * heilahdus * Mathf.Sin(isku * 3.1f) - 0.8f * kevennys, -3f, 3f);
            float nyokkays = Mathf.Clamp((0.6f + 0.5f * Aikataulu.Arvo(n, 15)) * Mathf.Sin(w3 * s + f3) + 1f * heilahdus * Mathf.Sin(isku * 2.3f + 1f), -1.8f, 1.8f);
            var keinu = Quaternion.Euler(nyokkays, 0f, kallistus);
            roottori.localPosition = new Vector3(-0.09f + (Aikataulu.Arvo(n, 4) - 0.5f) * 0.02f - 0.01f * u, by, suunta * 0.1f * (u - 0.5f));
            roottori.localRotation = Quaternion.Euler(0f, (Aikataulu.Arvo(n, 5) - 0.5f) * 70f + suunta * 8f * u, 0f) * keinu;
            roottori.localScale = Vector3.one;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var suoraan = Quaternion.Inverse(keinu);
            var nosto = new Vector3(0f, by, 0f);

            // Kelluvat kimpaleet: oma nousu, keinunta ja hidas ajelehtiminen (suunta ja matka näytöksestä).
            for (int i = 0; i < Kelluvia; i++)
            {
                float a1 = Aikataulu.Arvo(n, 30 + i), a2 = Aikataulu.Arvo(n, 33 + i), a3 = Aikataulu.Arvo(n, 36 + i);
                float kw = 6.2832f / (2.9f + 1.5f * a1), kv = 6.2832f * a2;
                float kulma = (a3 - 0.5f) * 24f * Mathf.Deg2Rad, kc = Mathf.Cos(kulma), ks = Mathf.Sin(kulma);
                var p0 = KelluvaPaikka[i];
                var p = new Vector3(p0.x * kc - p0.z * ks, 0f, p0.x * ks + p0.z * kc) * (0.96f + 0.1f * a1);
                float ajo = (0.004f + 0.009f * a2) * u, ak = 6.2832f * a3;
                p += new Vector3(Mathf.Cos(ak) * ajo, 0.001f * (1f + 0.5f * mai) * Mathf.Sin(kw * s + kv), Mathf.Sin(ak) * ajo);
                var q = Quaternion.Euler(0f, 360f * a1 + (a2 - 0.5f) * 24f * u, 0f)
                    * Quaternion.Euler((4f + 3f * a3) * (1f + 0.3f * mai) * Mathf.Sin(kw * s + kv + 1.2f), 0f,
                        (4.5f + 3f * a2) * (1f + 0.3f * mai) * Mathf.Sin(kw * 0.83f * s + kv + 0.4f));
                Aseta(lapset[i], suoraan, nosto, p, q, KelluvaKoko[i]);
            }

            // Lohkeama: pilari kiinni (roottorin kehyksessä sellaisenaan), natina, kaatuminen saranan ympäri, putoaminen, katoaminen.
            var pilari = lapset[Lapsia];
            var uusi = lapset[Kelluvia];
            var rengas = lapset[Lapsia + Lapsia2];
            var roiske = lapset[Lapsia + Lapsia2 + 1];
            var o = LaattaO; var tt = LaattaT;
            var sarana = LaattaReuna + o * LaattaUlkona + new Vector3(0f, LaattaJuuri, 0f);
            // Pilarin keskipiste ja veteen osumakohta (kaatunut pilari makaa ulospäin, keskipiste pinnan tasalla).
            var keski = LaattaPiste(LaattaUlkona - LaattaPaksuus * 0.5f, 0f, LaattaKorkeus * 0.45f);
            var osuma = LaattaReuna + o * (LaattaUlkona + LaattaKorkeus * 0.5f + 0.004f);
            if (jalkeen < 0f)
            {
                float nat = jalkeen > -Natina ? 1.4f * Mathf.Sin(jalkeen * 37f) * Pehmea((jalkeen + Natina) / Natina) : 0f;
                var qn = Quaternion.AngleAxis(nat, -tt);
                pilari.localPosition = sarana - qn * sarana;
                pilari.localRotation = qn;
                pilari.localScale = Vector3.one;
                Piilota(uusi); Piilota(roiske);
            }
            else
            {
                // Kaatuminen: kulma kiihtyy 0 → 82° saranan pysyessä; sitten putoaminen: keskipiste liukuu veteen ja kulma 82 → 100°.
                Quaternion qk; Vector3 kp;
                if (jalkeen < Kaatuu)
                {
                    float tau = jalkeen / Kaatuu;
                    qk = Quaternion.AngleAxis(82f * tau * tau, -tt);
                    kp = sarana + qk * (keski - sarana);
                }
                else
                {
                    var q82 = Quaternion.AngleAxis(82f, -tt);
                    var lahto = sarana + q82 * (keski - sarana);
                    float f = Mathf.Clamp01((jalkeen - Kaatuu) / Putoaa);
                    qk = Quaternion.AngleAxis(82f + 18f * f + (isku > 0f ? 5f * Mathf.Sin(isku * 9f) * (1f - Pehmea(isku / 0.4f)) : 0f), -tt);
                    kp = Vector3.Lerp(lahto, osuma, f);
                    kp.y = Mathf.Lerp(lahto.y, osuma.y - 0.004f, f * f);
                }
                float kk = isku > 0f ? 1f - Pehmea(isku / Katoaa) : 1f;
                if (kk > 0.01f)
                {
                    pilari.localPosition = kp - qk * (keski * kk);
                    pilari.localRotation = qk;
                    pilari.localScale = new Vector3(kk, kk, kk);
                }
                else Piilota(pilari);
                if (isku > 0f)
                {
                    // Uusi kimpale pulpahtaa roiskeesta, keinuu voimakkaasti ja ajelehtii ulospäin.
                    float nousu = Pehmea((isku - 0.3f) / 0.8f), vaim = 1f - Pehmea(isku / 6f);
                    var p = osuma + o * (0.03f * Pehmea(isku / 18f)) + tt * (0.01f * Pehmea(isku / 25f));
                    p.y = -0.008f + 0.008f * nousu + 0.0025f * vaim * Mathf.Sin(isku * 5.5f) + 0.0006f * Mathf.Sin(s * 1.9f);
                    float kulmaO = -Mathf.Atan2(o.z, o.x) * Mathf.Rad2Deg;
                    var q = Quaternion.Euler(0f, kulmaO + 18f * Pehmea(isku / 20f), 0f)
                        * Quaternion.Euler(9f * vaim * Mathf.Sin(isku * 4.1f), 0f, 12f * vaim * Mathf.Sin(isku * 3.3f + 0.5f) + 2f * Mathf.Sin(s * 1.3f));
                    float kasvu = Pehmea((isku - 0.25f) / 0.4f);
                    if (kasvu > 0.01f) Aseta(uusi, suoraan, nosto, p, q, new Vector3(1.85f, 0.95f, 1.15f) * (0.6f + 0.4f * kasvu));
                    else Piilota(uusi);
                    // Roiske: rengas laajenee, kruunu nousee ja painuu vaahdoksi.
                    // Kruunun akseli (KruunuKulma) käännetään pilarin suuntaan: vesiseinä pilarin pituudelta.
                    float voima = 0.85f + 0.3f * Aikataulu.Arvo(n, 16);
                    float lev = 0.2f + 0.22f * Ulos(isku / 1.4f) + 0.08f * Pehmea((isku - 1.4f) / 12f);
                    float kor = voima * 0.5f * Ulos(isku / 0.3f) * (1f - Pehmea((isku - 0.35f) / 1.2f));
                    var qr = Quaternion.Euler(0f, KruunuKulma - LaattaKulma + 12f * (Aikataulu.Arvo(n, 17) - 0.5f), 0f);
                    Aseta(roiske, suoraan, nosto, new Vector3(osuma.x, 0.007f, osuma.z), qr, new Vector3(lev, Mathf.Max(0.03f, kor), lev));
                }
                else { Piilota(uusi); Piilota(roiske); }
            }

            // Jäävuoren vesikerros (varjo, jalka ja vaahtorengas): vaakasuorassa, VesiY vesirajan yläpuolella (kimpaleiden
            // vesikerrosten päällä, jotta se piirtyy niiden jälkeen syvyystestin läpi), hengittää (laajenee jäävuoren painuessa).
            float hengitys = Mathf.Clamp(1f - 0.034f * by / ampY * (1f + 0.4f * mai) + 0.016f * Mathf.Sin(w4 * s + f3), 0.955f, 1.055f);
            Aseta(rengas, suoraan, nosto, new Vector3(0f, VesiY, 0f), Quaternion.identity, new Vector3(hengitys, 0.03f, hengitys));
        }
    }
}
