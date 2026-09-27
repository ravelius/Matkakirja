using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koriste 9: majakkalaiva ankkurissa (Pohjanmeri ja Itämeri, kuten Elbe 1 tai Kemi). Punainen runko (ainoa
    /// aksentti), valkoinen kansirakennus, keskimaston huipulla lyhty (ylhäältä keltainen kuusikulmio) ja takamastossa musta
    /// päivämerkkipallo ja pieni ratsastuspurje.
    /// Laiva keinuu ankkurissa keula virtaa vasten (keulakuohu ja perän pyörre kertovat virrasta jo pysäytyskuvassa), ja
    /// lyhdyn keila kiertää vedenpinnalla valaisemattomana, läpikuultavana sektorina (ei bloomia). Harvinainen (noin 1/10):
    /// sumutorvi, kaksi törähdystä, joissa keila venyy ja kirkastuu, lyhty leimahtaa ja torvesta nousee höyrypilvi.
    /// +z keulaan, +y ylös, meren pinta y = 0; origo keskimaston tyvessä vesirajassa.
    /// Lapset: 0 keila, 1 lyhdyn leimahdus, 2–3 torven höyrypilvet.
    /// </summary>
    public static class MeriMajakkalaiva
    {
        public const string Nimi = "majakkalaiva";
        public static readonly string[] Meret = { "pohjanmeri", "itameri" };
        /// <summary>Runko 0,125 yksikköä → noin 35 pt (sama mittakaava kuin siipiratashöyryllä).</summary>
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(942, 60f, 180f, 20f, 60f);
        public const int Lapsia = 1, Lapsia2 = 1, Lapsia3 = 2;

        static readonly Color Punainen = MalliVarit.Hex(0xa9483a);
        static readonly Color KansiVari = MalliVarit.Hex(0x8c4236), Valkoinen = new Color(0.95f, 0.93f, 0.88f);
        static readonly Color Puu = new Color(0.25f, 0.21f, 0.17f), Pallo = MalliVarit.Hex(0x2a2622);
        static readonly Color Lasi = new Color(1f, 0.95f, 0.7f), Purje = MalliVarit.Hex(0xd9cbb0);
        /// <summary>Keila lämpimän vaaleana ja läpikuultavana; kärkialfa häipyy reunoille ja kärkeen.</summary>
        static readonly Color KeilaVari = new Color(1f, 0.96f, 0.76f, 0.9f);
        /// <summary>Höyry kylmän valkoisena kuten valaan suihku, jotta se erottuu vaaleasta merestä.</summary>
        static readonly Color Hoyry = new Color(0.99f, 1f, 1f);

        const float KeulaZ = 0.062f, PeraZ = -0.061f;
        const float LyhtyAla = 0.043f, LyhtyYla = 0.054f, LyhtyR = 0.0085f;
        /// <summary>Keilan pituus (noin 56 pt), korkeus vedenpinnan yllä ja kierroksen kesto.</summary>
        const float KeilaPituus = 0.2f, KeilaY = 0.003f, KierrosS = 9.5f;

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);
        /// <summary>Kannen korkeus kohdassa z: loiva kansilinja (keula koholla).</summary>
        static float KansiY(float z) { float q = (z + 0.004f) / 0.066f; return 0.011f + 0.004f * q * q; }

        // ---- Mallit ----

        /// <summary>Runko, kansirakennus, keskimasto lyhtyineen, takamasto palloineen ja purjeineen sekä keulakuohu ja perän pyörre.</summary>
        public static Mesh Roottori()
        {
            var r = new MalliRakenne();
            Runko(r);
            Kaappi(r, new Vector3(0f, 0.0165f, -0.026f), new Vector3(0.0085f, 0.0055f, 0.012f), Valkoinen);   // kansirakennus
            // Keskimasto ja lyhty sen huipulla: valaistu lasi ja kansi näkyvät ylhäältä keltaisena kuusikulmiona, pieni tumma huppu.
            Masto(r, 0f, KansiY(0f) - 0.001f, LyhtyAla + 0.001f, 0.0015f);
            r.Vaippa(LyhtyAla, LyhtyR, LyhtyYla, LyhtyR, Lasi, Lasi, 6);
            r.Kansi(LyhtyYla, LyhtyR, Lasi, 6);
            Katto(r, LyhtyYla, 0.0035f, LyhtyYla + 0.0045f, Pallo);
            // Takamasto: päivämerkkipallo huipussa ja ratsastuspurje (pitää keulan tuulta vasten).
            Masto(r, -0.05f, KansiY(-0.05f), 0.042f, 0.001f);
            r.Nuppi(new Vector3(0f, 0.045f, -0.05f), 0.0042f, Pallo);
            r.Kolmio(new Vector3(0f, 0.039f, -0.0505f), new Vector3(0f, 0.016f, -0.0505f), new Vector3(0f, 0.017f, -0.07f), Purje);

            // Virta ohittaa ankkurissa olevan laivan: keulakuohu ja perän pyörre häipyvinä vaahtonauhoina.
            const float y = 0.0012f;
            float keula = 36f * Mathf.Deg2Rad;
            foreach (float puoli in new[] { -1f, 1f })
                MeriGeometria.Nauha(r, new Vector3(0.003f * puoli, y, KeulaZ - 0.004f), new Vector3(Mathf.Sin(keula) * puoli, 0f, -Mathf.Cos(keula)), 0.045f, 0.004f, 0.009f, 0.55f, 0.05f, 1);
            MeriGeometria.Nauha(r, new Vector3(0f, y, PeraZ + 0.002f), Vector3.back, 0.075f, 0.016f, 0.026f, 0.34f, 0f, 2);
            return r.Mesh("Meri: majakkalaiva");
        }

        /// <summary>
        /// Runko: kyljet levenevät vesirajaa kohti, joten ylhäältä kannen ympärillä näkyy punainen reunus. Kansi on poikittaisina
        /// kaistoina asemittain (katkot kansirakennuksen etu- ja takareunassa), joten jokainen tahko on paikallinen.
        /// </summary>
        static void Runko(MalliRakenne r)
        {
            // Asemat keulasta perään: (z, puolileveys kannen tasolla); keulan kärki erikseen, perässä peräpeili.
            var asemat = new[] { new Vector2(0.043f, 0.0105f), new Vector2(0.014f, 0.015f), new Vector2(-0.014f, 0.015f),
                new Vector2(-0.038f, 0.0138f), new Vector2(PeraZ, 0.0068f) };
            int n = asemat.Length, m = 1 + 2 * n;
            var kansi = new Vector3[m];
            var vesi = new Vector3[m];
            kansi[0] = new Vector3(0f, KansiY(KeulaZ), KeulaZ);
            vesi[0] = new Vector3(0f, 0f, KeulaZ - 0.005f);
            for (int i = 0; i < n; i++)
            {
                float z = asemat[i].x, x = asemat[i].y, xv = x * 1.2f + 0.001f;
                kansi[1 + i] = new Vector3(x, KansiY(z), z);
                kansi[m - 1 - i] = new Vector3(-x, KansiY(z), z);
                vesi[1 + i] = new Vector3(xv, 0f, z * 0.97f);
                vesi[m - 1 - i] = new Vector3(-xv, 0f, z * 0.97f);
            }
            for (int i = 0; i < m; i++) { int j = (i + 1) % m; r.Nelio(vesi[i], vesi[j], kansi[j], kansi[i], Punainen); }
            r.Kolmio(kansi[0], kansi[1], kansi[m - 1], KansiVari);
            for (int i = 1; i < n; i++) r.Nelio(kansi[i], kansi[i + 1], kansi[m - 1 - i], kansi[m - i], KansiVari);
        }

        /// <summary>Laatikko ilman pohjaa (10 kolmiota): kansirakennus.</summary>
        static void Kaappi(MalliRakenne r, Vector3 k, Vector3 h, Color v)
        {
            Vector3 x = new(h.x, 0, 0), y = new(0, h.y, 0), z = new(0, 0, h.z);
            r.Nelio(k - x - y + z, k + x - y + z, k + x + y + z, k - x + y + z, v);
            r.Nelio(k + x - y - z, k - x - y - z, k - x + y - z, k + x + y - z, v);
            r.Nelio(k - x - y - z, k - x - y + z, k - x + y + z, k - x + y - z, v);
            r.Nelio(k + x - y + z, k + x - y - z, k + x + y - z, k + x + y + z, v);
            r.Nelio(k - x + y + z, k + x + y + z, k + x + y - z, k - x + y - z, v);
        }

        /// <summary>Masto kahtena ristikkäisenä tasona (4 kolmiota; ylhäältä näkymätön viiva, sivulta tumma tanko).</summary>
        static void Masto(MalliRakenne r, float z, float y0, float y1, float paksuus)
        {
            r.Nelio(new Vector3(-paksuus, y0, z), new Vector3(paksuus, y0, z), new Vector3(paksuus, y1, z), new Vector3(-paksuus, y1, z), Puu);
            r.Nelio(new Vector3(0f, y0, z - paksuus), new Vector3(0f, y0, z + paksuus), new Vector3(0f, y1, z + paksuus), new Vector3(0f, y1, z - paksuus), Puu);
        }

        /// <summary>Lyhdyn kartiokatto kuusikulmaisena (6 kolmiota).</summary>
        static void Katto(MalliRakenne r, float y0, float sade, float y1, Color v)
        {
            var huippu = new Vector3(0f, y1, 0f);
            for (int i = 0; i < 6; i++)
            {
                float a0 = i * Mathf.PI / 3f + Mathf.PI / 6f, a1 = (i + 1) * Mathf.PI / 3f + Mathf.PI / 6f;
                r.Kolmio(huippu, new Vector3(Mathf.Cos(a1) * sade, y0, Mathf.Sin(a1) * sade), new Vector3(Mathf.Cos(a0) * sade, y0, Mathf.Sin(a0) * sade), v);
            }
        }

        /// <summary>Kolmio kärkikohtaisin värein (keilan alfa häipyy).</summary>
        static void KolmioVarit(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Color ca, Color cb, Color cc)
        {
            var n = Vector3.Cross(b - a, c - a).normalized;
            int k = r.P.Count;
            r.P.Add(a); r.P.Add(b); r.P.Add(c);
            r.N.Add(n); r.N.Add(n); r.N.Add(n);
            r.C.Add(ca); r.C.Add(cb); r.C.Add(cc);
            r.T.Add(k); r.T.Add(k + 1); r.T.Add(k + 2);
        }

        /// <summary>
        /// Keila (lapsi): vaakasuora sektori vedenpinnalla (maston tyven alla, joten runko peittää kärjen syvyystestissä), kärki
        /// origossa ja suunta +z, puolikulma 16°, pituus 0,2. Alfa on suurin lyhdyn alla ja häipyy kärkeä ja reunoja kohti,
        /// joten keila näkyy pehmeänä valokiilana (4 × 4 tahkoa).
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            float[] sade = { 0f, 0.08f, 0.3f, 0.62f, 1f }, aSade = { 1f, 1f, 0.8f, 0.45f, 0f };
            float[] sivu = { -1f, -0.45f, 0f, 0.45f, 1f }, aSivu = { 0.15f, 0.85f, 1f, 0.85f, 0.15f };
            float puoli = 16f * Mathf.Deg2Rad;
            var p = new Vector3[5, 5];
            var c = new Color[5, 5];
            for (int i = 0; i < 5; i++)
                for (int j = 0; j < 5; j++)
                {
                    float a = sivu[j] * puoli, rr = sade[i] * KeilaPituus;
                    p[i, j] = new Vector3(Mathf.Sin(a) * rr, 0f, Mathf.Cos(a) * rr);
                    c[i, j] = KeilaVari;
                    c[i, j].a = KeilaVari.a * aSade[i] * (i == 0 ? 1f : aSivu[j]);
                }
            for (int j = 0; j < 4; j++)
            {
                KolmioVarit(r, p[0, j], p[1, j], p[1, j + 1], c[0, j], c[1, j], c[1, j + 1]);
                for (int i = 1; i < 4; i++)
                    r.NelioVarit(p[i, j], p[i + 1, j], p[i + 1, j + 1], p[i, j + 1], c[i, j], c[i + 1, j], c[i + 1, j + 1], c[i, j + 1]);
            }
            return r.Mesh("Meri: majakkalaivan keila");
        }

        /// <summary>
        /// Lyhdyn leimahdus (lapsi): läpinäkymätön nelisakarainen valotähti kolmessa tasossa (vaaka ja kaksi pystyä), joten
        /// se näkyy tähtenä sekä ylhäältä että sivulta; origo lyhdyn keskellä, skaalataan törähdyksen mukaan.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            var vari = new Color(1f, 0.97f, 0.78f);
            const float pit = 0.024f, tyvi = 0.005f;
            for (int taso = 0; taso < 3; taso++)
                for (int k = 0; k < 4; k++)
                {
                    float a = k * Mathf.PI / 2f;
                    // Sakara tason kahdella akselilla: vaakataso (x, z), pystytasot (x, y) ja (z, y).
                    Vector3 u = taso == 0 ? new Vector3(1f, 0f, 0f) : taso == 1 ? new Vector3(1f, 0f, 0f) : new Vector3(0f, 0f, 1f);
                    Vector3 w = taso == 0 ? new Vector3(0f, 0f, 1f) : new Vector3(0f, 1f, 0f);
                    Vector3 suunta = u * Mathf.Cos(a) + w * Mathf.Sin(a), sivu = u * -Mathf.Sin(a) + w * Mathf.Cos(a);
                    r.Kolmio(sivu * tyvi, suunta * pit, sivu * -tyvi, vari);
                }
            return r.Mesh("Meri: lyhdyn leimahdus");
        }

        /// <summary>Torven höyrypilvi (lapsi): vaalea oktaedri, skaalataan iän mukaan.</summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            r.Nuppi(Vector3.zero, 0.011f, Hoyry);
            return r.Mesh("Meri: sumutorven höyry");
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Sumutorven törähdys hetkellä s (harvinainen näytös): aika viimeisimmän törähdyksen alusta tai −1. Kaksi törähdystä
        /// 3,2 s:n välein, pari toistuu 36 s:n välein 12–18 s:sta alkaen, kunhan pari mahtuu ennen lyhdyn sammumista.
        /// </summary>
        static float Torahdys(int n, float s, float pituus)
        {
            float p0 = 12f + 6f * Aikataulu.Arvo(n, 7);
            if (s < p0) return -1f;
            float pari = p0 + 36f * (int)((s - p0) / 36f);
            if (pari + 3.2f + 3f > pituus - 5f) return -1f;
            float u = s - pari;
            return u >= 3.2f ? u - 3.2f : u;
        }

        /// <summary>
        /// Majakkalaivan näytös: laiva ankkurissa merellä (x −0,065…−0,105), keula virtaa vasten pohjoiseen tai etelään
        /// (±15° jaksosta), ja se kiertyy hitaasti ankkurin ympäri (±6°, 47 s). Keinunta: kallistus ±3°, nyökkäys ±1,1° ja
        /// nousu. Lyhty syttyy näytöksen alussa (keila kasvaa 2,5 s) ja sammuu lopussa; keila kiertää 9,5 s:ssa ja pysyy
        /// vaakasuorassa keinunnasta riippumatta. Sumutorvi (harvinainen): keila venyy ja levenee, lyhty leimahtaa ja kaksi
        /// höyrypilveä nousee torvesta.
        /// </summary>
        public static void Animoi(Transform laiva, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            float x0 = -0.065f - 0.04f * Aikataulu.Arvo(n, 4);
            float suunta = (Aikataulu.Arvo(n, 3) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 5) - 0.5f) * 30f;
            float v = t + Aikataulu.Arvo(n, 6) * 20f;

            // Kiertyminen ankkurin ympäri: keula pysyy ankkurin luona ja perä heilahtaa.
            var kierto = Quaternion.Euler(0f, suunta + 6f * Mathf.Sin(v * 0.134f), 0f);
            float kallistus = 2.4f * Mathf.Sin(v * 1.23f) + 0.7f * Mathf.Sin(v * 2.9f + 1f);
            float nyokkays = 1.1f * Mathf.Sin(v * 1.61f + 2f);
            float nousu = 0.0006f * Mathf.Sin(v * 1.37f);
            var asento = kierto * Quaternion.Euler(nyokkays, 0f, kallistus);
            var keula = new Vector3(0f, 0f, KeulaZ);
            var ankkuri = new Vector3(x0, 0f, 0f) + Quaternion.Euler(0f, suunta, 0f) * keula;
            laiva.localPosition = ankkuri - kierto * keula + new Vector3(0f, nousu, 0f);
            laiva.localRotation = asento;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;

            // Törähdys: nousu 0,45 s, pito ja lasku 1 s (ei välähdystä).
            float u = harv ? Torahdys(n, s, pituus) : -1f;
            float leimahdus = u < 0f ? 0f : Pehmea(u / 0.45f) * (1f - Pehmea((u - 0.9f) / 1f));

            // Keila: lyhty syttyy ja sammuu, kierto vaakatasossa (keinunnan kumoava asento), törähdyksessä pidempi ja leveämpi.
            float valo = Pehmea((s - 1f) / 2.5f) * Pehmea((pituus - 1.5f - s) / 2.5f);
            var tasoon = Quaternion.Inverse(asento);
            var keila = lapset[0];
            keila.localPosition = tasoon * new Vector3(0f, KeilaY - nousu, 0f);
            keila.localRotation = tasoon * Quaternion.Euler(0f, Mathf.Repeat(v * 360f / KierrosS, 360f), 0f);
            keila.localScale = valo > 0.001f ? new Vector3(valo * (1f + 0.35f * leimahdus), 1f, valo * (1f + 0.6f * leimahdus)) : Vector3.zero;

            // Lyhdyn leimahdus.
            var hehku = lapset[1];
            hehku.localPosition = new Vector3(0f, (LyhtyAla + LyhtyYla) * 0.5f, 0f);
            hehku.localRotation = Quaternion.identity;
            hehku.localScale = leimahdus > 0.001f ? Vector3.one * leimahdus : Vector3.zero;

            // Höyrypilvet torvesta (kansirakennuksen katolla maston takana) ylös, taakse ja tuulen alle sivulle, jotta ne
            // erottuvat rungosta myös ylhäältä; elinikä 2 s, toinen 0,35 s myöhemmin.
            for (int k = 0; k < Lapsia3; k++)
            {
                var pilvi = lapset[Lapsia + Lapsia2 + k];
                float ika = u < 0f ? -1f : (u - 0.35f * k) / 2f;
                if (ika <= 0f || ika >= 1f) { pilvi.localScale = Vector3.zero; continue; }
                pilvi.localPosition = new Vector3(0.004f + 0.03f * ika, 0.026f + 0.03f * Pehmea(ika * 1.4f), -0.014f - 0.022f * ika);
                pilvi.localRotation = Quaternion.identity;
                pilvi.localScale = Vector3.one * (Mathf.Pow(Mathf.Sin(Mathf.PI * ika), 0.6f) * (0.55f + 0.9f * ika) * (1f - 0.2f * k));
            }
        }
    }
}
