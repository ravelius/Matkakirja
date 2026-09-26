using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KATEGORIASYMBOLIT RELIEFEINÄ (omistajan korjaus 26.9.2026 klo 21.5x, sitova; esitys
    /// docs/raportit/arkkityypit-paletti-animaatio-20260926.md §1, §2 ja §4): 3D-nostot ovat NOSTOT-paneelin kategoriasymbolit
    /// kolmiulotteisina, samat joka maassa, eivät rakennusarkkityyppejä eivätkä liiku. Kartoitus: KategoriaKartoitus.
    ///
    /// MUOTO: kuvamerkin (assets/nostotyypit/merkki-*.png) siluetti jäljitettynä (proto-3d/lokit/kategoriat-reliefi/skriptit/
    /// jaljita.py: alfa → reuna → Douglas–Peucker), pursotettu <see cref="ReliefiPaksuus"/> paksuiseksi ja viistetyllä
    /// yläreunalla. Reliefi MAKAA vaakatasossa kasvot ylöspäin ("pöydälle nostettu kuvamerkki"): suoraan ylhäältä näkyy
    /// kuvamerkin oma siluetti, ja liioiteltu perspektiivi näyttää paksuuden ruudun reunoilla. Kuvamerkin ylös = mallin +Z;
    /// Symbolimallit kääntää +Z:n ruudun ylös-suuntaan (<see cref="KategoriaRuutuYlos"/>), joten merkki on pystyssä myös
    /// kartan kierrossa kuten 2D-merkki. Yksityiskohdat ovat matalia kohokerroksia ja seepiaviivoja, ei tekstuureja.
    ///
    /// PALETTI (§1, hyväksytty 21.4x): paperi #efe4cc, seepia #8a6a44, muste #3b2f22. Kärkien alfa 0 = varjostimen
    /// seepiaramppi (kärkiväri → valoisuus → ramppi paperi → seepia → muste, kiinteä kuvamerkin valo vasemmalta ylhäältä,
    /// Symbolimalli.shader kohta 8). Arkkityypit ja erikoismallit (alfa 1) käyttävät entistä kaavaa.
    ///
    /// KOLMIOBUDJETTI: LOD0 ≤ <see cref="SymLod0Katto"/>, LOD1 ≤ <see cref="SymLod1Katto"/>. Tässä erässä rakennettu vain
    /// Kaari (historia) ja Vuori (luonto: vuori); muut kategoriat piirretään toistaiseksi arkkityyppinä
    /// (<see cref="SymboliRakennettu"/>).
    /// </summary>
    public sealed partial class Symbolimallit
    {
        public const int SymLod0Katto = 250, SymLod1Katto = 120;
        /// <summary>Reliefin paksuus mallin yksiköissä (leveys ~1, esitys §4).</summary>
        public const float ReliefiPaksuus = 0.15f;
        /// <summary>Viisteen leveys ja korkeus (45°) mallin yksiköissä.</summary>
        public const float ReliefiViiste = 0.025f;
        /// <summary>Seepiaviivojen nosto kasvon yläpuolelle (ei z-taistelua) ja leveys mallin yksiköissä.</summary>
        const float ViivaNosto = 0.012f, ViivaLeveys = 0.022f;

        static readonly Color SymPaperi = Hex(0xefe4cc), SymSeepia = Hex(0x8a6a44), SymMuste = Hex(0x3b2f22);
        /// <summary>Reliefin kylki: paperin ja seepian välissä, ramppi tummentaa varjon puolen seepiaksi.</summary>
        static readonly Color SymKylki = Color.Lerp(SymPaperi, SymSeepia, 0.35f);
        /// <summary>Kohokerroksen pudotusvarjo kaakkoon (valo luoteesta kuten kuvamerkissä): seepiapinta kerroksen alla
        /// tämän verran siirrettynä, joten paperinvaalea kerros erottuu paperin värisestä kasvosta myös suoraan ylhäältä.</summary>
        static readonly Vector3 KerrosVarjo = new Vector3(0.012f, 0f, -0.02f);

        /// <summary>Kategoriasymbolit käytössä (komento `symbolit kategoriat 1|0`, oletus 1; A/B-vertailu arkkityyppeihin).</summary>
        public static bool Kategoriat = true;
        /// <summary>Kategoriasymbolin +Z ruudun ylös-suuntaan (oletus) vai pohjoiseen (komento `symbolit kategoriat ruutu|pohjoinen`).</summary>
        public static bool KategoriaRuutuYlos = true;

        static void NollaaKategoriat() { Kategoriat = true; KategoriaRuutuYlos = true; }

        /// <summary>Onko symbolin reliefi tehty (tämä erä: Kaari ja Vuori). Muut kategoriat pysyvät arkkityyppeinä.</summary>
        public static bool SymboliRakennettu(Kategoriasymboli s) => s == Kategoriasymboli.Kaari || s == Kategoriasymboli.Vuori;

        static readonly Mesh[,] symVerkot = new Mesh[KategoriaKartoitus.Lukumaara, 2];
        static readonly int[,] symKolmiot = new int[KategoriaKartoitus.Lukumaara, 2];

        /// <summary>Kategoriasymbolin verkko (lod 0 tai 1), rakennetaan ensimmäisellä käytöllä; null, jos ei rakennettu.</summary>
        public static Mesh SymbolinVerkko(Kategoriasymboli s, int lod)
        {
            if (!SymboliRakennettu(s)) return null;
            lod = lod <= 0 ? 0 : 1;
            var m = symVerkot[(int)s, lod];
            if (m != null) return m;
            var r = new Rakentaja();
            if (s == Kategoriasymboli.Kaari) SKaari(r, lod == 1);
            else SVuori(r, lod == 1);
            if (r.Kolmioita > (lod == 0 ? SymLod0Katto : SymLod1Katto))
                Debug.LogWarning($"MATKAKIRJA symbolimallit: kategoriasymboli {s} LOD{lod} {r.Kolmioita} kolmiota yli budjetin");
            symKolmiot[(int)s, lod] = r.Kolmioita;
            return symVerkot[(int)s, lod] = r.Verkko("kategoria-" + s + (lod == 0 ? "" : "-lod1"));
        }

        /// <summary>Kategoriasymbolin kolmiot (lod 0 tai 1); 0, jos ei rakennettu.</summary>
        public static int SymbolinKolmiot(Kategoriasymboli s, int lod)
        {
            if (SymbolinVerkko(s, lod) == null) return 0;
            return symKolmiot[(int)s, lod <= 0 ? 0 : 1];
        }

        // ---- Mallin indeksi: arkkityypit 0..A−1, kategoriasymbolit A..A+K−1 (tasojen 2–3 erät, tila) ----

        const int MalliLukumaara = ArkkityyppiKartoitus.Lukumaara + KategoriaKartoitus.Lukumaara;

        /// <summary>Piirretäänkö noston malli kategoriasymbolina: symboli rakennettu ja käytössä, erikoismalli voittaa aina.</summary>
        static bool KayttaaSymbolia(Tieto t) =>
            Kategoriat && t != null && t.Erikois == null && t.Symboli.HasValue && SymboliRakennettu(t.Symboli.Value);

        static int MalliIndeksi(Tieto t) => KayttaaSymbolia(t) ? ArkkityyppiKartoitus.Lukumaara + (int)t.Symboli.Value : (int)t.Tyyppi;

        static Mesh MallinVerkko(int i, int lod) => i < ArkkityyppiKartoitus.Lukumaara
            ? ArkkityypinVerkko((Arkkityyppi)i, lod)
            : SymbolinVerkko((Kategoriasymboli)(i - ArkkityyppiKartoitus.Lukumaara), lod);

        static int MallinKolmiot(int i, int lod) => i < ArkkityyppiKartoitus.Lukumaara
            ? ArkkityypinKolmiot((Arkkityyppi)i, lod)
            : SymbolinKolmiot((Kategoriasymboli)(i - ArkkityyppiKartoitus.Lukumaara), lod);

        static string MallinNimi(int i) => i < ArkkityyppiKartoitus.Lukumaara
            ? ((Arkkityyppi)i).ToString()
            : "symboli:" + (Kategoriasymboli)(i - ArkkityyppiKartoitus.Lukumaara);

        // ---- Siluetit (jaljita.py; x itä, z pohjoinen = kuvan ylös, leveys 1, keskitetty; vastapäivään ylhäältä) ----

        /// <summary>merkki-historia.png, 34 kärkeä (tila ulko: kaaren aukko ulottuu pohjaan, U-muoto).</summary>
        static readonly float[] KaariLod0 =
        {
            0.489f, -0.359f, 0.451f, -0.317f, 0.458f, -0.256f, 0.393f, -0.212f, 0.386f, -0.139f, 0.318f, -0.087f,
            0.263f, -0.082f, 0.297f, 0.057f, 0.234f, 0.186f, 0.126f, 0.243f, 0.112f, 0.293f, 0.017f, 0.322f,
            0.043f, 0.383f, 0.026f, 0.420f, -0.062f, 0.438f, -0.205f, 0.397f, -0.348f, 0.281f, -0.444f, 0.029f,
            -0.425f, -0.124f, -0.445f, -0.333f, -0.497f, -0.430f, -0.261f, -0.438f, -0.191f, -0.408f, -0.236f, -0.263f,
            -0.236f, -0.025f, -0.210f, 0.013f, -0.235f, 0.109f, -0.172f, 0.195f, -0.082f, 0.239f, 0.045f, 0.202f,
            0.112f, 0.089f, 0.122f, -0.323f, 0.089f, -0.430f, 0.493f, -0.425f,
        };

        /// <summary>merkki-historia.png, 18 kärkeä.</summary>
        static readonly float[] KaariLod1 =
        {
            0.386f, -0.139f, 0.263f, -0.082f, 0.297f, 0.057f, 0.234f, 0.186f, 0.017f, 0.322f, 0.026f, 0.420f,
            -0.205f, 0.397f, -0.348f, 0.281f, -0.444f, 0.029f, -0.445f, -0.333f, -0.497f, -0.430f, -0.191f, -0.408f,
            -0.235f, 0.109f, -0.082f, 0.239f, 0.045f, 0.202f, 0.112f, 0.089f, 0.089f, -0.430f, 0.493f, -0.425f,
        };

        /// <summary>merkki-vuori.png, 22 kärkeä (tila ylaverho: ylin verho ja suora pohja; kuvamerkissä jalkojen väli on
        /// läpinäkyvä, reliefissä täysi vuori).</summary>
        static readonly float[] VuoriLod0 =
        {
            0.500f, -0.250f, 0.495f, -0.240f, 0.455f, -0.220f, 0.385f, -0.150f, 0.335f, -0.080f, 0.285f, -0.070f,
            0.195f, 0.050f, 0.185f, 0.040f, 0.155f, 0.040f, 0.125f, 0.110f, 0.025f, 0.240f, 0.005f, 0.250f,
            -0.035f, 0.180f, -0.105f, 0.120f, -0.145f, 0.050f, -0.175f, 0.020f, -0.215f, 0.020f, -0.295f, -0.080f,
            -0.325f, -0.080f, -0.365f, -0.140f, -0.495f, -0.240f, -0.500f, -0.250f,
        };

        /// <summary>merkki-vuori.png, 12 kärkeä.</summary>
        static readonly float[] VuoriLod1 =
        {
            0.500f, -0.250f, 0.495f, -0.240f, 0.335f, -0.080f, 0.285f, -0.070f, 0.195f, 0.050f, 0.155f, 0.040f,
            0.005f, 0.250f, -0.175f, 0.020f, -0.215f, 0.020f, -0.295f, -0.080f, -0.495f, -0.240f, -0.500f, -0.250f,
        };

        // ---- Symbolit (k = LOD1) ----

        /// <summary>Kaaren keskipiste ja kaarikivien säteet (siluetista: aukon sisäsäde ~0,18, ulkosäde ~0,375).</summary>
        static readonly Vector3 KaariKeski = new Vector3(-0.06f, 0f, 0.06f);

        /// <summary>
        /// Historia: raunioitunut kaari. Reliefi paperina; kaarikivien saumat seepiaviivoina säteittäin, pilarien
        /// kivirivit ja jalustan sauma, katkenneen pilarin kivikasa erotettuna pystysaumalla ja kahdella rivillä, ja
        /// kapiteelit matalina kohokerroksina (kevyt seepia, kyljet seepiaa).
        /// </summary>
        static void SKaari(Rakentaja r, bool k)
        {
            float y = ReliefiPaksuus;
            var q = r.Reliefi(k ? KaariLod1 : KaariLod0, 0f, ReliefiPaksuus, ReliefiViiste, SymPaperi, SymKylki);
            // Kaarikivien saumat (katkennut oikea yläosa ilman saumoja).
            float[] kulmat = k ? new[] { 150f, 105f, 20f } : new[] { 168f, 140f, 110f, 82f, 22f };
            foreach (float a in kulmat)
            {
                var d = new Vector3(Mathf.Cos(a * Mathf.Deg2Rad), 0f, Mathf.Sin(a * Mathf.Deg2Rad));
                r.Viiva(q, KaariKeski + d * 0.17f, KaariKeski + d * 0.42f, y + ViivaNosto, ViivaLeveys, SymSeepia);
            }
            // Katkenneen pilarin ja kivikasan raja (pysty) ja kapiteelit.
            r.Viiva(q, V(0.263f, 0, -0.09f), V(0.263f, 0, -0.44f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            float[] vasenKap = { -0.43f, -0.02f, -0.24f, -0.02f, -0.24f, 0.035f, -0.43f, 0.035f };
            float[] oikeaKap = { 0.13f, -0.03f, 0.27f, -0.03f, 0.27f, 0.025f, 0.13f, 0.025f };
            if (k)
            {
                r.Viiva(q, V(-0.46f, 0, 0.008f), V(-0.22f, 0, 0.008f), y + ViivaNosto, 0.045f, SymSeepia);
                r.Viiva(q, V(0.12f, 0, -0.002f), V(0.28f, 0, -0.002f), y + ViivaNosto, 0.045f, SymSeepia);
                return;
            }
            // Kapiteelin varjo sen alareunassa (valo luoteesta): seepiaviiva, jolloin paperinvaalea kapiteeli erottuu ylhäältä.
            r.Viiva(q, V(-0.46f, 0, -0.032f), V(-0.22f, 0, -0.032f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            r.Viiva(q, V(0.12f, 0, -0.042f), V(0.28f, 0, -0.042f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            r.Kohokerros(q, vasenKap, y + ViivaNosto, 0.025f, SymPaperi, SymSeepia);
            r.Kohokerros(q, oikeaKap, y + ViivaNosto, 0.025f, SymPaperi, SymSeepia);
            // Pilarien kivirivit ja jalustan sauma.
            foreach (float z in new[] { -0.13f, -0.25f, -0.36f })
            {
                r.Viiva(q, V(-0.47f, 0, z), V(-0.2f, 0, z), y + ViivaNosto, ViivaLeveys, SymSeepia);
                r.Viiva(q, V(0.1f, 0, z + 0.01f), V(0.255f, 0, z + 0.01f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            }
            // Kivikasan rivit ja limittäiset pystysaumat (kivet, ei pilarin jatke).
            r.Viiva(q, V(0.27f, 0, -0.2f), V(0.44f, 0, -0.2f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            r.Viiva(q, V(0.27f, 0, -0.31f), V(0.47f, 0, -0.31f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            r.Viiva(q, V(0.35f, 0, -0.2f), V(0.35f, 0, -0.31f), y + ViivaNosto, ViivaLeveys, SymSeepia);
            r.Viiva(q, V(0.39f, 0, -0.31f), V(0.39f, 0, -0.44f), y + ViivaNosto, ViivaLeveys, SymSeepia);
        }

        /// <summary>
        /// Luonto: vuori. Reliefi paperina; itärinne (kuvamerkin varjopuoli) seepiana matalana pintana harjanteelta alas,
        /// kaksi seepiavetoa olkapäillä ja lumihuippu paperinvaaleana kohokerroksena (LOD1: pintana).
        /// </summary>
        static void SVuori(Rakentaja r, bool k)
        {
            float y = ReliefiPaksuus;
            var q = r.Reliefi(k ? VuoriLod1 : VuoriLod0, 0f, ReliefiPaksuus, ReliefiViiste, SymPaperi, SymKylki);
            // Itärinne (kuvamerkin varjopuoli): huipulta oikeaa reunaa olkapäälle ja pääharjannetta takaisin; reunan kärjet
            // annetaan siluetilta, Tasopinta vetää ne yläkasvon sisään.
            r.Tasopinta(q, new[] { 0.005f, 0.25f, 0.125f, 0.11f, 0.155f, 0.04f, 0.195f, 0.05f, 0.06f, -0.06f, 0.015f, -0.17f, -0.01f, 0.1f },
                y + ViivaNosto, SymSeepia);
            if (!k)
            {
                r.Tasopinta(q, new[] { -0.155f, 0.005f, -0.125f, -0.13f, -0.145f, -0.13f }, y + ViivaNosto, SymSeepia);
                r.Tasopinta(q, new[] { 0.29f, -0.1f, 0.35f, -0.205f, 0.315f, -0.205f }, y + ViivaNosto, SymSeepia);
            }
            float[] lumi = { 0.005f, 0.198f, -0.035f, 0.15f, -0.07f, 0.1f, -0.05f, 0.112f, -0.025f, 0.09f, 0.005f, 0.12f, 0.03f, 0.095f,
                             0.05f, 0.125f, 0.075f, 0.118f };
            r.Varjo(q, lumi, KerrosVarjo, y + ViivaNosto * 1.5f, SymSeepia);
            if (k) r.Tasopinta(q, lumi, y + ViivaNosto * 2f, SymPaperi);
            else r.Kohokerros(q, lumi, y + ViivaNosto * 2f, 0.03f, SymPaperi, SymSeepia);
        }

        /// <summary>
        /// Reliefin rakentajan apurit (kärkien alfa 0 = varjostimen seepiaramppi; UV1 = ääriviivan suunta siluetin
        /// kärjen viisteen suuntaisena, ks. Symbolimalli.shader kohta 6).
        /// </summary>
        sealed partial class Rakentaja
        {
            /// <summary>Viisteen ja ääriviivan kulmakerroin enintään (terävät kärjet: vuoren juuret).</summary>
            const float MiterRaja = 2.2f;

            /// <summary>
            /// Pursotettu reliefi: monikulmio XZ-tasossa (x0, z0, x1, z1 …; yksinkertainen, kovera sallittu), pohja y0,
            /// paksuus, viistetty yläreuna (viiste = vaaka- ja pystymitta; kapeissa kohdissa viistettä pienennetään, kunnes
            /// yläkasvon kolmiointi pysyy ehjänä). Kyljet kylkivärillä, viiste ja yläkasvo kasvovärillä. Palauttaa yläkasvon
            /// monikulmion (kohokerrosten ja viivojen rajaukseen). Kolmioita 5n − 2 (n = kärjet).
            /// </summary>
            public Vector3[] Reliefi(float[] xz, float y0, float paksuus, float viiste, Color kasvo, Color kylki)
            {
                var p = Monikulmio(xz);
                int n = p.Length;
                var m = Kulmat(p);
                var kolm = Korvat(p);
                // Viisteen sisäreuna: kärki siirtyy kulman suuntaan; kolmiointi käytetään sellaisenaan, joten viistettä
                // pienennetään, jos jokin kolmio kääntyisi (kapea kohta).
                Vector3[] q = null;
                for (int yritys = 0; yritys < 4 && viiste > 0f; yritys++, viiste *= 0.5f)
                {
                    q = new Vector3[n];
                    for (int i = 0; i < n; i++) q[i] = p[i] - m[i] * viiste;
                    bool ehja = true;
                    for (int j = 0; j < kolm.Count && ehja; j += 3) ehja = Risti(q[kolm[j]], q[kolm[j + 1]], q[kolm[j + 2]]) > 1e-7f;
                    if (ehja) break;
                    q = null;
                }
                float vy = q != null ? viiste : 0f;
                if (q == null) q = p;
                float yb = y0 + paksuus - vy, yt = y0 + paksuus;
                var ylos = Vector3.up;
                for (int i = 0; i < n; i++)
                {
                    int j = (i + 1) % n;
                    var ulos = new Vector3(p[j].z - p[i].z, 0f, p[i].x - p[j].x);   // vastapäivään: ulkonormaali oikealla
                    Vector2 ui = new Vector2(m[i].x, m[i].z), uj = new Vector2(m[j].x, m[j].z);
                    Vector3 a0 = p[i] + ylos * y0, a1 = p[j] + ylos * y0, b0 = p[i] + ylos * yb, b1 = p[j] + ylos * yb;
                    KolmioU(a0, a1, b1, ui, uj, uj, kylki, ulos);
                    KolmioU(a0, b1, b0, ui, uj, ui, kylki, ulos);
                    if (vy > 0f)
                    {
                        Vector3 c0 = q[i] + ylos * yt, c1 = q[j] + ylos * yt;
                        var viisto = ulos.normalized + ylos;
                        KolmioU(b0, b1, c1, ui, uj, uj, kasvo, viisto);
                        KolmioU(b0, c1, c0, ui, uj, ui, kasvo, viisto);
                    }
                }
                for (int j = 0; j < kolm.Count; j += 3)
                {
                    int a = kolm[j], b = kolm[j + 1], d = kolm[j + 2];
                    KolmioU(q[a] + ylos * yt, q[b] + ylos * yt, q[d] + ylos * yt,
                        new Vector2(m[a].x, m[a].z), new Vector2(m[b].x, m[b].z), new Vector2(m[d].x, m[d].z), kasvo, ylos);
                }
                return q;
            }

            /// <summary>Matala kohokerros reliefin kasvolla (kapiteeli, lumihuippu): monikulmio xz, pohja y0, korkeus h;
            /// ei viistettä eikä ääriviivaa. Kärjet, jotka olisivat yläkasvon <paramref name="kasvo"/> ulkopuolella, siirretään
            /// sen sisään.</summary>
            public void Kohokerros(Vector3[] kasvo, float[] xz, float y0, float h, Color yla, Color kylki)
            {
                var p = Monikulmio(xz);
                for (int i = 0; i < p.Length; i++) p[i] = Sisaan(kasvo, p[i], 0.008f);
                int n = p.Length;
                var nolla = Vector2.zero;
                for (int i = 0; i < n; i++)
                {
                    int j = (i + 1) % n;
                    var ulos = new Vector3(p[j].z - p[i].z, 0f, p[i].x - p[j].x);
                    Vector3 a0 = p[i] + Vector3.up * y0, a1 = p[j] + Vector3.up * y0, b0 = a0 + Vector3.up * h, b1 = a1 + Vector3.up * h;
                    KolmioU(a0, a1, b1, nolla, nolla, nolla, kylki, ulos);
                    KolmioU(a0, b1, b0, nolla, nolla, nolla, kylki, ulos);
                }
                Tasopinta(p, y0 + h, yla);
            }

            /// <summary>Kohokerroksen pudotusvarjo: sama monikulmio siirrettynä (siirto) tasaisena pintana korkeudella y.</summary>
            public void Varjo(Vector3[] kasvo, float[] xz, Vector3 siirto, float y, Color vari)
            {
                var s = (float[])xz.Clone();
                for (int i = 0; i + 1 < s.Length; i += 2) { s[i] += siirto.x; s[i + 1] += siirto.z; }
                Tasopinta(kasvo, s, y, vari);
            }

            /// <summary>Tasainen pinta (varjokiila, LOD1:n lumihuippu) korkeudella y; kärjet siirretään kasvon sisään.</summary>
            public void Tasopinta(Vector3[] kasvo, float[] xz, float y, Color vari)
            {
                var p = Monikulmio(xz);
                for (int i = 0; i < p.Length; i++) p[i] = Sisaan(kasvo, p[i], 0.008f);
                Tasopinta(p, y, vari);
            }

            void Tasopinta(Vector3[] p, float y, Color vari)
            {
                var kolm = Korvat(p);
                var nolla = Vector2.zero;
                for (int j = 0; j < kolm.Count; j += 3)
                    KolmioU(p[kolm[j]] + Vector3.up * y, p[kolm[j + 1]] + Vector3.up * y, p[kolm[j + 2]] + Vector3.up * y, nolla, nolla, nolla, vari, Vector3.up);
            }

            /// <summary>
            /// Seepiaviiva (sauma) kasvolla: jana a → b korkeudella y ja leveydellä w, rajattuna kasvon sisään vähintään
            /// puolen leveyden päähän reunasta (pisin yhtenäinen osa). 2 kolmiota.
            /// </summary>
            public void Viiva(Vector3[] kasvo, Vector3 a, Vector3 b, float y, float w, Color vari)
            {
                const int N = 40;
                float vara = w * 0.5f + 0.006f;
                int paras0 = -1, paras1 = -1, alku = -1;
                for (int i = 0; i <= N + 1; i++)
                {
                    bool sisalla = i <= N && Sisalla(kasvo, Vector3.Lerp(a, b, (float)i / N), vara);
                    if (sisalla && alku < 0) alku = i;
                    if (!sisalla && alku >= 0)
                    {
                        if (i - 1 - alku > paras1 - paras0) { paras0 = alku; paras1 = i - 1; }
                        alku = -1;
                    }
                }
                if (paras0 < 0 || paras1 - paras0 < 2) return;
                Vector3 p0 = Vector3.Lerp(a, b, (float)paras0 / N), p1 = Vector3.Lerp(a, b, (float)paras1 / N);
                var s = p1 - p0; s.y = 0f;
                var sivu = new Vector3(-s.z, 0f, s.x).normalized * (w * 0.5f);
                p0.y = p1.y = y;
                var nolla = Vector2.zero;
                KolmioU(p0 - sivu, p1 - sivu, p1 + sivu, nolla, nolla, nolla, vari, Vector3.up);
                KolmioU(p0 - sivu, p1 + sivu, p0 + sivu, nolla, nolla, nolla, vari, Vector3.up);
            }

            /// <summary>Kolmio omalla ääriviivan suunnalla (UV1) ja seepiarampin merkillä (kärjen alfa 0); etupuoli
            /// suuntaan ulos. Ei osa-kirjanpitoa (Alku/Loppu): reliefin UV1 on siluetin kärjen oma suunta.</summary>
            void KolmioU(Vector3 a, Vector3 b, Vector3 d, Vector2 ua, Vector2 ub, Vector2 ud, Color vari, Vector3 ulos)
            {
                var normaali = Vector3.Cross(b - a, d - a);
                if (normaali.sqrMagnitude < 1e-12f) return;
                if (Vector3.Dot(normaali, ulos) < 0f) { (b, d) = (d, b); (ub, ud) = (ud, ub); normaali = -normaali; }
                normaali.Normalize();
                int i = v.Count;
                var lin = vari.linear;
                lin.a = 0f;
                v.Add(a); v.Add(b); v.Add(d);
                n.Add(normaali); n.Add(normaali); n.Add(normaali);
                c.Add(lin); c.Add(lin); c.Add(lin);
                u.Add(ua); u.Add(ub); u.Add(ud);
                t.Add(i); t.Add(i + 1); t.Add(i + 2);
            }

            // ---- Tasogeometria (XZ, y = 0) ----

            /// <summary>Taulukko → kärjet vastapäivään ylhäältä katsottuna (+X itä, +Z pohjoinen).</summary>
            static Vector3[] Monikulmio(float[] xz)
            {
                var p = new Vector3[xz.Length / 2];
                for (int i = 0; i < p.Length; i++) p[i] = new Vector3(xz[2 * i], 0f, xz[2 * i + 1]);
                float ala = 0f;
                for (int i = 0; i < p.Length; i++) { var a = p[i]; var b = p[(i + 1) % p.Length]; ala += a.x * b.z - b.x * a.z; }
                if (ala < 0f) System.Array.Reverse(p);
                return p;
            }

            /// <summary>2D-ristitulo (b − a) × (d − a) XZ-tasossa; positiivinen = vastapäivään.</summary>
            static float Risti(Vector3 a, Vector3 b, Vector3 d) => (b.x - a.x) * (d.z - a.z) - (b.z - a.z) * (d.x - a.x);

            /// <summary>Kärkien ulospäiset kulmasuunnat (viereisten särmien ulkonormaalien puolittaja pituudella 1 / cos(puolikulma),
            /// enintään <see cref="MiterRaja"/>): siirto viiste · m pitää viisteen leveyden vakiona kummallakin särmällä.</summary>
            static Vector3[] Kulmat(Vector3[] p)
            {
                int n = p.Length;
                var m = new Vector3[n];
                for (int i = 0; i < n; i++)
                {
                    Vector3 a = p[(i + n - 1) % n], b = p[i], d = p[(i + 1) % n];
                    var n0 = new Vector3(b.z - a.z, 0f, a.x - b.x).normalized;
                    var n1 = new Vector3(d.z - b.z, 0f, b.x - d.x).normalized;
                    var s = n0 + n1;
                    if (s.sqrMagnitude < 1e-8f) { m[i] = n1; continue; }
                    s.Normalize();
                    float cos = Vector3.Dot(s, n1);
                    m[i] = s * Mathf.Min(MiterRaja, 1f / Mathf.Max(1e-3f, cos));
                }
                return m;
            }

            /// <summary>Korvien leikkaus (ear clipping) vastapäivään kiertävälle yksinkertaiselle monikulmiolle: kolmiot
            /// indekseinä (vastapäivään). Kovera sallittu; rappeutuneessa tapauksessa leikataan väkisin, ettei silmukka jumitu.</summary>
            static List<int> Korvat(Vector3[] p)
            {
                var idx = new List<int>(p.Length);
                for (int i = 0; i < p.Length; i++) idx.Add(i);
                var tulos = new List<int>((p.Length - 2) * 3);
                while (idx.Count > 3)
                {
                    int c = idx.Count, korva = -1;
                    for (int i = 0; i < c && korva < 0; i++)
                    {
                        int a = idx[(i + c - 1) % c], b = idx[i], d = idx[(i + 1) % c];
                        if (Risti(p[a], p[b], p[d]) <= 1e-9f) continue;
                        bool tyhja = true;
                        for (int j = 0; j < c && tyhja; j++)
                        {
                            int e = idx[j];
                            if (e == a || e == b || e == d) continue;
                            tyhja = !KolmiossaPiste(p[e], p[a], p[b], p[d]);
                        }
                        if (tyhja) korva = i;
                    }
                    if (korva < 0) korva = 0;
                    tulos.Add(idx[(korva + c - 1) % c]); tulos.Add(idx[korva]); tulos.Add(idx[(korva + 1) % c]);
                    idx.RemoveAt(korva);
                }
                tulos.Add(idx[0]); tulos.Add(idx[1]); tulos.Add(idx[2]);
                return tulos;
            }

            static bool KolmiossaPiste(Vector3 x, Vector3 a, Vector3 b, Vector3 d) =>
                Risti(a, b, x) >= 0f && Risti(b, d, x) >= 0f && Risti(d, a, x) >= 0f;

            /// <summary>Onko piste monikulmion sisällä vähintään etäisyyden vara päässä reunasta.</summary>
            static bool Sisalla(Vector3[] p, Vector3 x, float vara)
            {
                bool sisalla = false;
                for (int i = 0, j = p.Length - 1; i < p.Length; j = i++)
                {
                    if ((p[i].z > x.z) != (p[j].z > x.z) && x.x < (p[j].x - p[i].x) * (x.z - p[i].z) / (p[j].z - p[i].z) + p[i].x)
                        sisalla = !sisalla;
                    if (Etaisyys(x, p[j], p[i]) < vara) return false;
                }
                return sisalla;
            }

            static float Etaisyys(Vector3 x, Vector3 a, Vector3 b)
            {
                var ab = b - a; ab.y = 0f;
                var ax = x - a; ax.y = 0f;
                float t = Mathf.Clamp01(Vector3.Dot(ax, ab) / Mathf.Max(1e-9f, ab.sqrMagnitude));
                var e = ax - ab * t;
                return Mathf.Sqrt(e.x * e.x + e.z * e.z);
            }

            /// <summary>Piste monikulmion sisään (vähintään vara reunasta): ulkopuolinen piste siirretään lähimmän särmän
            /// kautta sisäänpäin; kohokerrosten kärjet pysyvät yläkasvolla.</summary>
            static Vector3 Sisaan(Vector3[] p, Vector3 x, float vara)
            {
                if (Sisalla(p, x, vara)) return x;
                var keski = Vector3.zero;
                foreach (var a in p) keski += a;
                keski /= p.Length;
                // Puolitushaku janalla x → lähin sisäpiste suunnassa kohti kasvon painopistettä.
                for (int i = 1; i <= 20; i++)
                {
                    var y = Vector3.Lerp(x, keski, i / 20f);
                    if (Sisalla(p, y, vara)) return y;
                }
                return x;
            }
        }
    }
}
