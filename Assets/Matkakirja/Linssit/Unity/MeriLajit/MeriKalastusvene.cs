using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koriste 3: kalastusvene. Pieni peräpeilillinen puuvene (tumma salvianvihreä runko, puukansi, vaalea
    /// ohjaamo tummalla katolla ja masto) keinuu paikallaan, ja verkon terrakotanväriset kohot (ainoa aksentti) nousevat
    /// yksi kerrallaan laidan yli kannelle kasaan käsivedon tahdissa; vene kallistuu vetopuolelle ja siirtyy vähän verkkoa
    /// kohti. Lokki kaartelee paikalle ja istahtaa ohjaamon katolle. Harvinainen (noin 1/10): iso saalis, kolme lokkia lisää kaartelee verkon
    /// yllä ja syöksyy vuorotellen veteen (roiskeet). +z eteen (keula), +y ylös, meren pinta y = 0.
    /// Lapset: 0–5 kohot, 6–9 lokit (6 laskeutuu katolle, 7–9 syöksyvät), 10 roiske (syöksyt 1,3 s:n välein, yksi kerrallaan).
    /// </summary>
    public static class MeriKalastusvene
    {
        public const string Nimi = "kalastusvene";
        public static readonly string[] Meret = { "itameri", "pohjanmeri", "valimeri" };
        /// <summary>Vene 0,1 yksikköä → 30 pt (hieman pienempi kuin laivat, kuten kokoero on merelläkin).</summary>
        public const float KokoPt = 300f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(917, 20f, 30f, 30f, 90f);
        public const int Lapsia = 6, Lapsia2 = 4, Lapsia3 = 1;

        static readonly Color RunkoVari = MalliVarit.Hex(0x3f5752), KansiVari = MalliVarit.Hex(0x8f7a5a);
        static readonly Color KattoVari = MalliVarit.Hex(0x4a625c), Puu = new Color(0.30f, 0.25f, 0.19f);
        static readonly Color LokkiValko = new Color(0.98f, 0.98f, 0.96f), LokkiSiipi = new Color(0.86f, 0.87f, 0.87f),
            LokkiKarki = new Color(0.22f, 0.22f, 0.22f);

        /// <summary>Verkon kohojen väli (verkon suunnassa) ja ensimmäisen kohon etäisyys vetokohdasta näytöksen alussa.</summary>
        const float Vali = 0.02f, Ensimmainen = 0.012f;
        /// <summary>Ohjaamon katon keskipiste (lokin istumapaikka).</summary>
        static readonly Vector3 Katto = new Vector3(0f, 0.0214f, -0.02f);

        static float KansiY(float z) { float q = z / 0.05f; return 0.0075f + 0.003f * q * q; }
        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Mallit ----

        /// <summary>Runko peräpeilillä, puukansi, ohjaamo, masto ja pehmeä vaahtorengas (vene seisoo, ei vanavettä).</summary>
        public static Mesh Roottori()
        {
            var r = new MalliRakenne();
            // Ääriviiva kannen tasolla: keula, oikea kylki, peräpeili, vasen kylki. Vesiraja on hieman kantta leveämpi, joten
            // ylhäältä kannen ympärillä näkyy tumma reunus (kuten laivoilla).
            var kylki = new[] { new Vector2(0.0095f, 0.034f), new Vector2(0.0158f, 0.010f), new Vector2(0.0152f, -0.020f), new Vector2(0.0098f, -0.045f) };
            int m = 1 + 2 * kylki.Length;
            var kansi = new Vector3[m];
            var vesi = new Vector3[m];
            kansi[0] = new Vector3(0f, KansiY(0.05f), 0.05f);
            vesi[0] = new Vector3(0f, 0f, 0.047f);
            for (int i = 0; i < kylki.Length; i++)
            {
                var k = kylki[i];
                kansi[1 + i] = new Vector3(k.x, KansiY(k.y), k.y);
                kansi[m - 1 - i] = new Vector3(-k.x, KansiY(k.y), k.y);
                vesi[1 + i] = new Vector3(k.x + 0.0022f, 0f, k.y * 0.96f);
                vesi[m - 1 - i] = new Vector3(-k.x - 0.0022f, 0f, k.y * 0.96f);
            }
            for (int i = 0; i < m; i++) { int j = (i + 1) % m; r.Nelio(vesi[i], vesi[j], kansi[j], kansi[i], RunkoVari); }
            for (int i = 1; i < m - 1; i++) r.Kolmio(kansi[0], kansi[i], kansi[i + 1], KansiVari);

            // Ohjaamo perässä: vaaleat seinät (etuseinä ikkunoineen tummempi) ja räystäällinen tumma katto.
            float y0 = KansiY(-0.02f) - 0.0005f, y1 = 0.0205f;
            Vector3 a = new Vector3(-0.0085f, 0f, -0.0295f), b = new Vector3(0.0085f, 0f, -0.0295f);
            Vector3 c = new Vector3(0.0085f, 0f, -0.0105f), d = new Vector3(-0.0085f, 0f, -0.0105f);
            Vector3 ala = new Vector3(0f, y0, 0f), yla = new Vector3(0f, y1, 0f);
            Color ikkunat = Color.Lerp(MalliVarit.Valo, MalliVarit.Varjo, 0.45f);
            r.Nelio(d + ala, c + ala, c + yla, d + yla, ikkunat);              // etuseinä
            r.Nelio(b + ala, a + ala, a + yla, b + yla, MalliVarit.Valo);     // takaseinä
            r.Nelio(a + ala, d + ala, d + yla, a + yla, MalliVarit.Valo);     // vasen
            r.Nelio(c + ala, b + ala, b + yla, c + yla, MalliVarit.Valo);     // oikea
            r.Nelio(new Vector3(-0.0102f, Katto.y, -0.031f), new Vector3(-0.0102f, Katto.y, -0.0088f),
                new Vector3(0.0102f, Katto.y, -0.0088f), new Vector3(0.0102f, Katto.y, -0.031f), KattoVari);

            // Masto keulakannella (ei viiriä: ylhäältä se sulautui kohokasaan; aksentti on kohoissa).
            r.Tanko(new Vector3(0f, KansiY(0.014f), 0.014f), new Vector3(0f, 0.047f, 0.013f), 0.0011f, Puu);

            // Vaahtorengas: vene keinuu paikallaan, joten rungon ympärillä on vain pehmeä häipyvä kehä.
            const int sektoreita = 8;
            Color sisa = MeriGeometria.Vaahto, ulko = MeriGeometria.Vaahto; sisa.a = 0.4f; ulko.a = 0f;
            for (int i = 0; i < sektoreita; i++)
            {
                float a0 = i * Mathf.PI * 2f / sektoreita, a1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                Vector3 s0 = new Vector3(Mathf.Cos(a0) * 0.02f, 0.0012f, Mathf.Sin(a0) * 0.054f), s1 = new Vector3(Mathf.Cos(a1) * 0.02f, 0.0012f, Mathf.Sin(a1) * 0.054f);
                Vector3 u0 = new Vector3(Mathf.Cos(a0) * 0.036f, 0.0012f, Mathf.Sin(a0) * 0.072f), u1 = new Vector3(Mathf.Cos(a1) * 0.036f, 0.0012f, Mathf.Sin(a1) * 0.072f);
                r.NelioVarit(s0, u0, u1, s1, sisa, ulko, ulko, sisa);
            }
            return r.Mesh("Meri: kalastusvene");
        }

        /// <summary>Verkon koho: matala terrakotanvärinen pyramidi (vedenpinnan yläpuoli), neljä kolmiota.</summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            var huippu = new Vector3(0f, 0.0042f, 0f);
            const float s = 0.0042f;
            Vector3 p0 = new Vector3(s, 0f, 0f), p1 = new Vector3(0f, 0f, s), p2 = new Vector3(-s, 0f, 0f), p3 = new Vector3(0f, 0f, -s);
            r.Kolmio(huippu, p0, p3, MalliVarit.Terrakotta);
            r.Kolmio(huippu, p1, p0, MalliVarit.Terrakotta);
            r.Kolmio(huippu, p2, p1, MalliVarit.TerrakottaHimmea);
            r.Kolmio(huippu, p3, p2, MalliVarit.TerrakottaHimmea);
            return r.Mesh("Meri: verkon koho");
        }

        /// <summary>
        /// Lokki ylhäältä tunnistettavana: valkoinen vartalo, vaaleanharmaat siivet loivassa M-muodossa ja tummat kärjet
        /// (siipiväli 0,034 → noin 10 pt). Siivenisku on y-skaalan vaihtelu (−1…1 kääntää M:n), laskeutunut lokki on
        /// x-skaalalla kokoon taitettu.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            r.Kolmio(new Vector3(0f, 0.0006f, 0.0075f), new Vector3(0.0022f, 0.0004f, 0f), new Vector3(-0.0022f, 0.0004f, 0f), LokkiValko);
            r.Kolmio(new Vector3(0.0022f, 0.0004f, 0f), new Vector3(0f, 0.0003f, -0.0075f), new Vector3(-0.0022f, 0.0004f, 0f), LokkiValko);
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? -1f : 1f;
                Vector3 tyviE = new Vector3(0.0015f * p, 0.0004f, 0.0026f), tyviT = new Vector3(0.0015f * p, 0.0004f, -0.0022f);
                Vector3 kyynarE = new Vector3(0.0085f * p, 0.0028f, 0.0018f), kyynarT = new Vector3(0.0085f * p, 0.0028f, -0.0034f);
                Vector3 karki = new Vector3(0.017f * p, 0.0008f, -0.0052f);
                if (p < 0) { r.Nelio(tyviE, tyviT, kyynarT, kyynarE, LokkiSiipi); r.Kolmio(kyynarE, kyynarT, karki, LokkiKarki); }
                else { r.Nelio(tyviT, tyviE, kyynarE, kyynarT, LokkiSiipi); r.Kolmio(kyynarT, kyynarE, karki, LokkiKarki); }
            }
            return r.Mesh("Meri: lokki");
        }

        /// <summary>Syöksyn roiske: matala vaahtorengas ja neljä ylös ja ulos sojottavaa vaahtopiikkiä (kruunu), skaalataan 0 → 1 → 0.</summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            Color v = MeriGeometria.Vaahto, reuna = MeriGeometria.Vaahto; reuna.a = 0f;
            for (int i = 0; i < 4; i++)
            {
                float a = i * Mathf.PI * 0.5f + 0.4f, a1 = a + Mathf.PI * 0.5f;
                Vector3 u = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)), u1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)), sivu = new Vector3(-u.z, 0f, u.x);
                r.Kolmio(u * 0.004f - sivu * 0.003f, u * 0.004f + sivu * 0.003f, u * 0.012f + Vector3.up * 0.013f, v);
                r.NelioVarit(u * 0.005f, u * 0.016f, u1 * 0.016f, u1 * 0.005f, v, reuna, reuna, v);
            }
            return r.Mesh("Meri: roiske");
        }

        /// <summary>Nostetun kohon paikka kannella: pieni kasa vetopuolella maston ja ohjaamon välissä.</summary>
        static Vector3 Kasa(int k, float puoli)
        {
            float z = 0.003f - 0.0048f * (k / 2) + 0.0012f * (k % 2);
            return new Vector3(puoli * (0.0035f + 0.0052f * (k % 2)), KansiY(z) + 0.0022f, z);
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Kalastusveneen näytös (nosto): vene on paikallaan merellä (x −0,05…−0,085, z ±0,12 jaksosta), keula rannikon
        /// suuntaan ±30°; verkko lähtee merenpuoleiselta laidalta. Keinunta (kallistus ±2,5°, nyökkäys ±1,2°) ja nosto
        /// vetopuolelle 2° vedon aikana; vene siirtyy verkkoa kohti 0,02. Verkko vedetään käsivetona (tahti 2,4 s, alku- ja
        /// loppuhidastus), ja kukin koho nousee kaarena laidan yli kannelle kasaan. Lokki saapuu 18 %:ssa kierteenä ja
        /// istahtaa katolle 55 %:ssa; harvinaisessa kolme lokkia kaartelee verkon yllä 30 %:sta alkaen ja syöksyy veteen
        /// vuorotellen 55 %:sta alkaen 1,3 s:n välein.
        /// </summary>
        public static void Animoi(Transform vene, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            // Verkko merelle päin: pohjoiseen katsovalla veneellä vasemmalla (−x), etelään katsovalla oikealla.
            float puoli = pohjoiseen ? -1f : 1f;
            float suunta = (pohjoiseen ? 0f : 180f) + (Aikataulu.Arvo(n, 4) - 0.5f) * 60f;

            // Veto: käsivedon tahti (aikavääntö, joka pysyy nousevana) ja pehmeä alku ja loppu.
            float vetoAlku = 2f, vetoLoppu = pituus - 4.5f;
            float u = Mathf.Clamp01((s - vetoAlku) / (vetoLoppu - vetoAlku));
            float vedot = Mathf.Max(3f, (int)((vetoLoppu - vetoAlku) / 2.4f + 0.5f));
            float ur = u - 0.6f * Mathf.Sin(2f * Mathf.PI * vedot * u) / (2f * Mathf.PI * vedot);
            float veto = Pehmea(ur) * ((Lapsia - 1) * Vali + Ensimmainen + 0.012f);
            float vetaa = Mathf.Sin(Mathf.PI * Mathf.Clamp01(u * 1.15f - 0.05f));

            // Verkon suunta ja vetokohta veneen tasossa (ilman keinuntaa).
            var suuntaVerkko = new Vector3(0.8f * puoli, 0f, 0.6f);
            var vetokohta = new Vector3(0.0175f * puoli, 0f, 0.004f);
            var ohjaus = Quaternion.Euler(0f, suunta + 3f * Mathf.Sin(t * 0.37f + n), 0f);
            float x0 = 0.05f + 0.035f * Aikataulu.Arvo(n, 5), z0 = (Aikataulu.Arvo(n, 6) - 0.5f) * 0.24f;
            var siirto = ohjaus * suuntaVerkko * (0.02f * Pehmea(u));
            float nousu = 0.0006f * Mathf.Sin(t * 1.45f);
            vene.localPosition = new Vector3(-x0, nousu, z0) + siirto;
            float vaihe = Aikataulu.Arvo(n, 7) * 10f;
            var keinunta = Quaternion.Euler(1.2f * Mathf.Sin((t + vaihe) * 1.25f), 0f,
                -(2.5f * Mathf.Sin((t + vaihe) * 1.6f) + 2f * vetaa) * puoli);
            vene.localRotation = ohjaus * keinunta;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var suoraan = Quaternion.Inverse(keinunta);
            var pinta = new Vector3(0f, -nousu, 0f);

            // Kohot: vedessä verkon linjalla (keinuvat omaan tahtiinsa, veneen keinunta kumottu), vetokohdassa laidan yli kasaan.
            for (int k = 0; k < Lapsia; k++)
            {
                float etaisyys = Ensimmainen + k * Vali - veto;
                Vector3 p;
                float koko = 1f;
                if (etaisyys > 0f) p = vetokohta + suuntaVerkko * etaisyys + new Vector3(0f, 0.0006f * Mathf.Sin(t * 2.1f + 1.3f * k), 0f);
                else
                {
                    // Laidan yli kannelle kasaan (verkko tulee veneeseen): kaari vetokohdasta kasan paikalle.
                    float nosto = Pehmea(-etaisyys / 0.012f);
                    var kasa = Kasa(k, puoli);
                    p = Vector3.Lerp(vetokohta, kasa, nosto) + new Vector3(0f, 0.009f * Mathf.Sin(Mathf.PI * nosto), 0f);
                    if (nosto >= 1f)
                    {
                        // Kannella koho keinuu veneen mukana.
                        lapset[k].localPosition = kasa;
                        lapset[k].localRotation = Quaternion.Euler(0f, 37f * k, 0f);
                        lapset[k].localScale = Vector3.one * 0.85f;
                        continue;
                    }
                    koko = Mathf.Lerp(1f, 0.85f, nosto);
                }
                var koho = lapset[k];
                koho.localPosition = suoraan * (p + pinta);
                koho.localRotation = etaisyys > 0f ? suoraan : suoraan * Quaternion.Euler(0f, 37f * k * Pehmea(-etaisyys / 0.012f), 0f);
                koho.localScale = Vector3.one * koko;
            }

            // Lokit ja roiske.
            var katto = Katto;
            float laskeutuu = 0.55f * pituus;
            LaskeutuvaLokki(lapset[Lapsia], suoraan, pinta, katto, s, 0.18f * pituus, laskeutuu, Aikataulu.Arvo(n, 8));
            var saalis = vetokohta + suuntaVerkko * 0.03f;
            var roiske = lapset[Lapsia + Lapsia2];
            roiske.localScale = Vector3.zero;
            for (int k = 1; k < Lapsia2; k++)
            {
                var lokki = lapset[Lapsia + k];
                if (!harv) { lokki.localScale = Vector3.zero; continue; }
                SyoksyvaLokki(lokki, suoraan, pinta, saalis, k, s, pituus);
                // Roiske osumahetkestä: kasvaa 0,25 s ja painuu 0,6 s:ssa (syöksyt eivät mene päällekkäin).
                float r = s - SyoksyAlku(k, pituus) - 0.7f;
                if (r < 0f || r > 0.85f) continue;
                float rk = r < 0.25f ? Pehmea(r / 0.25f) : 1f - Pehmea((r - 0.25f) / 0.6f);
                roiske.localPosition = suoraan * (Osuma(saalis, k) + pinta);
                roiske.localRotation = suoraan;
                roiske.localScale = rk > 0.001f ? new Vector3(1f, 0.6f + 0.4f * rk, 1f) * rk : Vector3.zero;
            }
        }

        /// <summary>
        /// Lokki kaartaa kierteenä alas veneen ympäri (säde 0,12 → 0,04), liitää katolle ja taittaa siivet. Kaikki vaihdot
        /// ovat jatkuvia: kosketuksessa suunta on liu'un suunta, ja paikka siirtyy veneen keinuvaan tasoon liu'un lopussa.
        /// </summary>
        static void LaskeutuvaLokki(Transform lokki, Quaternion suoraan, Vector3 pinta, Vector3 katto, float s, float alku, float laskeutuu, float arpa)
        {
            if (s < alku) { lokki.localScale = Vector3.zero; return; }
            float liuku = laskeutuu - 1.8f;
            float kaarre = Mathf.Min(s, liuku);
            float w = Pehmea((kaarre - alku) / (liuku - alku));
            float kulma = arpa * 6.3f + (kaarre - alku) * 0.9f;
            float sade = Mathf.Lerp(0.12f, 0.042f, w), korkeus = Mathf.Lerp(0.058f, 0.036f, w);
            var kierre = katto + new Vector3(Mathf.Cos(kulma) * sade, korkeus - katto.y, Mathf.Sin(kulma) * sade);
            var eteen = new Vector3(-Mathf.Sin(kulma), 0f, Mathf.Cos(kulma));
            var kattoon = katto - kierre; kattoon.y = 0f; kattoon = kattoon.normalized;
            float koko = Pehmea((s - alku) / 0.7f);
            // Liito: siivet loivassa M:ssä, joka hengittää hitaasti; iskusarjat sekoittuvat siihen pehmeästi (ei nykäyksiä).
            float liito = 0.75f + 0.25f * Mathf.Cos((s - alku) * 2.1f);
            if (s < liuku)
            {
                // Saapuessa siiveniskuja 1,5 s, sitten liito.
                float isku = Mathf.Lerp(Mathf.Cos((s - alku) * 17f), liito, Pehmea((s - alku - 1.1f) / 0.5f));
                Aseta(lokki, suoraan, kierre + pinta, eteen, 18f, isku, 1f, koko);
                return;
            }
            if (s < laskeutuu)
            {
                float v = Pehmea((s - liuku) / 1.8f);
                var p = Vector3.Lerp(kierre, katto, v) + Vector3.up * (0.012f * Mathf.Sin(Mathf.PI * v));
                // Loppuliu'ussa siivet jarruttavat nopeina iskuina ja asettuvat suoriksi juuri ennen kosketusta.
                float jarru = Pehmea((v - 0.45f) / 0.15f) * (1f - Pehmea((v - 0.8f) / 0.2f));
                float isku = Mathf.Lerp(Mathf.Lerp(liito, 1f, v), Mathf.Cos((s - liuku) * 22f), jarru);
                Aseta(lokki, suoraan, p + pinta, Vector3.Lerp(eteen, kattoon, Pehmea(v * 2f)), 18f * (1f - v), isku, 1f, 1f);
                lokki.localPosition = Vector3.Lerp(lokki.localPosition, p, Pehmea((v - 0.6f) / 0.4f));
                return;
            }
            // Istuu katolla liu'un suuntaan: siivet taittuvat 0,4 s:ssa, keinuu veneen mukana ja kääntyy hetken päästä.
            float taitto = Pehmea((s - laskeutuu) / 0.4f);
            float kaanto = Mathf.Atan2(kattoon.x, kattoon.z) * Mathf.Rad2Deg + (arpa < 0.5f ? 35f : -35f) * Pehmea((s - laskeutuu - 3f) / 0.6f);
            lokki.localPosition = katto;
            lokki.localRotation = Quaternion.Euler(0f, kaanto, 0f);
            lokki.localScale = new Vector3(Mathf.Lerp(1f, 0.3f, taitto), Mathf.Lerp(1f, 0.25f, taitto), Mathf.Lerp(1f, 0.85f, taitto));
        }

        /// <summary>Syöksyn alku (lokki k = 1–3): 55 %:ssa näytöksestä ja sitten 1,3 s:n välein; osuma veteen 0,7 s myöhemmin.</summary>
        static float SyoksyAlku(int k, float pituus) => 0.55f * pituus + 1.3f * (k - 1);
        static Vector3 Osuma(Vector3 saalis, int k) => saalis + new Vector3(0.006f * (k - 2), 0f, 0.005f * (k - 2));

        /// <summary>
        /// Harvinaisen saaliin lokki k (1–3): ilmestyy kaartelemaan verkon ylle, syöksyy veteen (0,7 s), kääntyy pinnalla
        /// (0,3 s) ja nousee takaisin kaarteluun (1,3 s); suunta, kallistus ja siivet vaihtuvat pehmeästi vaiheesta toiseen.
        /// </summary>
        static void SyoksyvaLokki(Transform lokki, Quaternion suoraan, Vector3 pinta, Vector3 saalis, int k, float s, float pituus)
        {
            float alku = 0.3f * pituus + 0.7f * k, syoksy = SyoksyAlku(k, pituus);
            if (s < alku) { lokki.localScale = Vector3.zero; return; }
            float kierto = k % 2 == 0 ? -1f : 1f;
            float kulma = k * 2.1f + (s - alku) * 1.1f * kierto;
            float sade = 0.045f + 0.012f * k;
            var kaari = saalis + new Vector3(Mathf.Cos(kulma) * sade, 0.06f + 0.008f * k, Mathf.Sin(kulma) * sade);
            var eteen = new Vector3(-Mathf.Sin(kulma), 0f, Mathf.Cos(kulma)) * kierto;
            var osuma = Osuma(saalis, k);
            var alas = osuma - kaari; alas.y = 0f; alas = alas.normalized;
            float koko = Pehmea((s - alku) / 0.7f);
            // Kaartelu: liito, johon iskusarjat sekoittuvat pehmeästi.
            float iskuK = Mathf.Lerp(0.8f, Mathf.Cos((s - alku) * 16f), Pehmea((Mathf.Sin((s + k) * 0.8f) - 0.3f) / 0.4f));
            float d = s - syoksy;
            if (d < 0f || d > 2.3f) { Aseta(lokki, suoraan, kaari + pinta, eteen, 20f * kierto, iskuK, 1f, koko); return; }
            if (d < 0.7f)
            {
                // Syöksy: kääntyy kohteeseen, siivet puoliksi kiinni, jyrkkä kaari veteen.
                float v = d / 0.7f, kaanto = Pehmea(v * 3f);
                var p = Vector3.Lerp(kaari, osuma, v * v) + Vector3.up * (0.01f * Mathf.Sin(Mathf.PI * v));
                Aseta(lokki, suoraan, p + pinta, Vector3.Lerp(eteen, alas, kaanto), 20f * kierto * (1f - kaanto),
                    Mathf.Lerp(iskuK, 0.6f, kaanto), Mathf.Lerp(1f, 0.45f, Pehmea(v * 2f)), 1f);
                return;
            }
            if (d < 1f)
            {
                // Pinnalla: kääntyy ympäri lähteäkseen takaisin ylös.
                float suuntaKulma = Mathf.Atan2(alas.x, alas.z) + Mathf.PI * Pehmea((d - 0.7f) / 0.3f);
                Aseta(lokki, suoraan, osuma + pinta, new Vector3(Mathf.Sin(suuntaKulma), 0f, Mathf.Cos(suuntaKulma)), 0f, 0.6f, 0.45f, 1f);
                return;
            }
            // Nousu takaisin kaarteluun nopein iskuin, jotka asettuvat kaartelun siivenlyönteihin.
            float u = Pehmea((d - 1f) / 1.3f);
            float isku = Mathf.Lerp(Mathf.Lerp(0.6f, Mathf.Cos((d - 1f) * 19f), Pehmea((d - 1f) / 0.15f)), iskuK, Pehmea((d - 1.9f) / 0.4f));
            Aseta(lokki, suoraan, Vector3.Lerp(osuma, kaari, u) + pinta, Vector3.Lerp(-alas, eteen, u), 20f * kierto * u, isku,
                Mathf.Lerp(0.45f, 1f, Pehmea((d - 1f) / 0.4f)), 1f);
        }

        /// <summary>Lentävän lokin asento veneen tasossa (keinunta kumottu): suunta, kallistus kaarteessa, siiven y-skaala (isku) ja x-skaala (taitto).</summary>
        static void Aseta(Transform lokki, Quaternion suoraan, Vector3 p, Vector3 eteen, float kallistus, float isku, float taitto, float koko)
        {
            eteen.y = 0f;
            if (eteen.sqrMagnitude < 1e-8f) eteen = Vector3.forward;
            lokki.localPosition = suoraan * p;
            lokki.localRotation = suoraan * Quaternion.LookRotation(eteen, Vector3.up) * Quaternion.Euler(0f, 0f, kallistus);
            lokki.localScale = koko > 0.001f ? new Vector3(taitto * koko, isku * koko, koko) : Vector3.zero;
        }
    }
}
