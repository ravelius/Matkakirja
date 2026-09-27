using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koriste 2: purjelaiva (parkki). Keula- ja isomastossa kolme raakapurjetta päällekkäin, mesaanissa kahveli-
    /// isopurje (spankeri) ja keulapuomilla kaksi halkaisijaa; tumma runko, puukansi, vaalea kajuutta ja terrakotta viiri
    /// (ainoa aksentti). Kulkee rannikon suuntaisesti sivutuulessa (tuuli laivan vasemmalta), kallistuu 4° suojan puolelle,
    /// ja purjeet pullistuvat puuskissa; vanavesi kertoo liikkeen jo pysäytyskuvassa. Ylhäältä purjeet näkyvät vinoina
    /// valkoisina kaarina (brassattu 25°, vatsa eteen ja suojan puolelle), joten laiva tunnistuu myös suoraan ylhäältä.
    /// Harvinainen (noin 1/10): kova puuska keskellä matkaa, laiva kallistuu 11°, purjeet pullistuvat täysin, keulaan nousee
    /// leveä kuohu ja roiskeita. +z eteen (keula), +y ylös, meren pinta y = 0.
    /// Lapset: 0–1 raakapurjepinot (keula- ja isomasto), 2 keulakuohu, 3–5 roiskeet.
    /// </summary>
    public static class MeriPurjelaiva
    {
        public const string Nimi = "purjelaiva";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri" };
        /// <summary>Runko keulapuomeineen 0,155 yksikköä → noin 43 pt (sama mittakaava kuin siipiratashöyryllä, purjeet leveämmät).</summary>
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(913, 40f, 60f, 40f, 120f);
        public const int Lapsia = 2, Lapsia2 = 1, Lapsia3 = 3;

        static readonly Color RunkoVari = new Color(0.21f, 0.18f, 0.15f), KansiVari = MalliVarit.Hex(0x735e47);
        static readonly Color Puu = new Color(0.30f, 0.25f, 0.19f);
        /// <summary>Purjekangas kylmän valkoisena (kuten valaan suihku), jotta se erottuu vaaleasta merestä myös varjon
        /// puolelta; PurjeSauma on spankerin alaosan ja halkaisijoiden toisen tahkon hieman tummempi kangas.</summary>
        static readonly Color Purje = new Color(0.97f, 0.98f, 1f), PurjeSauma = new Color(0.92f, 0.935f, 0.96f);

        const float KeulaZ = 0.037f, IsoZ = -0.001f, MesaaniZ = -0.033f;
        /// <summary>Raakapurjeiden brassauskulma sivutuulessa (raakapuut kääntyvät, tuulen puoleinen nokka eteen).</summary>
        const float Brassi = 25f;

        /// <summary>Kannen korkeus kohdassa z: kaareva kansilinja (keula ja perä koholla).</summary>
        static float KansiY(float z) { float q = (z - 0.004f) / 0.064f; return 0.011f + 0.0042f * q * q; }

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Mallit ----

        /// <summary>Runko, mastot, keulapuomi, halkaisijat, spankeri, viiri ja vanavesi (Kelvinin kiila, perän vana ja keulan aallot).</summary>
        public static Mesh Roottori()
        {
            var r = new MalliRakenne();
            Runko(r);
            r.Tanko(new Vector3(0f, KansiY(KeulaZ), KeulaZ), new Vector3(0f, 0.090f, KeulaZ - 0.002f), 0.0012f, Puu);
            r.Tanko(new Vector3(0f, KansiY(IsoZ), IsoZ), new Vector3(0f, 0.097f, IsoZ - 0.002f), 0.0013f, Puu);
            r.Tanko(new Vector3(0f, KansiY(MesaaniZ), MesaaniZ), new Vector3(0f, 0.077f, MesaaniZ - 0.002f), 0.0011f, Puu);
            r.Tanko(new Vector3(0f, KansiY(0.060f) + 0.0004f, 0.058f), new Vector3(0f, 0.0235f, 0.099f), 0.0011f, Puu);   // keulapuomi

            // Halkaisijat: nurkka keulapuomilla, huippu keulamastossa, kulma suojan puolelle (+x) ja vatsa suojaan.
            Halkaisija(r, new Vector3(0f, 0.0232f, 0.097f), new Vector3(0f, 0.082f, KeulaZ + 0.001f), new Vector3(0.019f, 0.026f, 0.060f));
            Halkaisija(r, new Vector3(0f, 0.0204f, 0.083f), new Vector3(0f, 0.068f, KeulaZ + 0.002f), new Vector3(0.016f, 0.023f, 0.052f));

            // Spankeri: puomi ja kahveli kääntyneinä 28° suojan puolelle, vatsa suojaan; 2 × 2 tahkoa.
            float g = 28f * Mathf.Deg2Rad;
            var taakse = new Vector3(Mathf.Sin(g), 0f, -Mathf.Cos(g));
            var suoja = new Vector3(Mathf.Cos(g), 0f, Mathf.Sin(g));
            var halssi = new Vector3(0f, 0.020f, MesaaniZ - 0.002f);
            var kurki = new Vector3(0f, 0.062f, MesaaniZ - 0.003f);
            var skooti = halssi + taakse * 0.034f + Vector3.up * 0.001f;
            var huippu = kurki + taakse * 0.027f + Vector3.up * 0.010f;
            var p = new Vector3[3, 3];
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++)
                {
                    float u = i * 0.5f, v = j * 0.5f;   // u: etuliike → takaliike, v: ala → ylä
                    var q = Vector3.Lerp(Vector3.Lerp(halssi, skooti, u), Vector3.Lerp(kurki, huippu, u), v);
                    p[i, j] = q + suoja * (0.015f * Mathf.Sin(Mathf.PI * u) * (1f - 0.35f * v) + 0.002f * u);
                }
            for (int i = 0; i < 2; i++)
                for (int j = 0; j < 2; j++)
                    r.Nelio(p[i, j], p[i + 1, j], p[i + 1, j + 1], p[i, j + 1], j == 0 ? Purje : PurjeSauma);

            // Kansirakennus (kajuutta) ison- ja mesaanimaston välissä: vaalea suorakulmio, joka näkyy ylhäältä purjeiden takaa.
            r.Laatikko(new Vector3(0f, KansiY(-0.017f) + 0.003f, -0.017f), new Vector3(0.0065f, 0.003f, 0.008f), MalliVarit.Valo);

            // Viiri isomaston huipussa suojan puolelle: pitkä kapeneva (kolme kolmiota, hieman aaltoileva), jotta ainoa
            // värikorostus erottuu myös puhelimen koossa.
            Vector3 ylaK = new Vector3(0f, 0.0985f, IsoZ - 0.002f), alaK = new Vector3(0f, 0.0905f, IsoZ - 0.002f);
            Vector3 ylaV = new Vector3(0.017f, 0.0955f, IsoZ - 0.006f), alaV = new Vector3(0.017f, 0.0905f, IsoZ - 0.006f);
            var karki = new Vector3(0.037f, 0.0915f, IsoZ - 0.009f);
            r.Kolmio(ylaK, alaK, alaV, MalliVarit.TerrakottaHimmea);
            r.Kolmio(ylaK, alaV, ylaV, MalliVarit.TerrakottaHimmea);
            r.Kolmio(ylaV, alaV, karki, MalliVarit.TerrakottaHimmea);

            // Vanavesi: Kelvinin kiila perän olkapäistä, perän vana ja keulan aallot, kaikki häipyvinä vaahtonauhoina.
            const float y = 0.0012f;
            float kiila = 19.5f * Mathf.Deg2Rad, keula = 34f * Mathf.Deg2Rad;
            for (int k = 0; k < 2; k++)
            {
                float puoli = k == 0 ? -1f : 1f;
                MeriGeometria.Nauha(r, new Vector3(0.012f * puoli, y, -0.050f), new Vector3(Mathf.Sin(kiila) * puoli, 0f, -Mathf.Cos(kiila)), 0.17f, 0.005f, 0.014f, 0.5f, 0f, 3);
                MeriGeometria.Nauha(r, new Vector3(0.003f * puoli, y, 0.063f), new Vector3(Mathf.Sin(keula) * puoli, 0f, -Mathf.Cos(keula)), 0.05f, 0.004f, 0.008f, 0.55f, 0.05f, 1);
            }
            MeriGeometria.Nauha(r, new Vector3(0f, y, -0.054f), Vector3.back, 0.10f, 0.016f, 0.03f, 0.32f, 0f, 2);
            return r.Mesh("Meri: purjelaiva");
        }

        /// <summary>Runko: kaareva kansi (tumma puu) ja kyljet, jotka levenevät vesirajaa kohti, joten ylhäältä kannen ympärillä
        /// näkyy tumma reunus (kuten siipiratashöyryn rungossa). Ääriviiva myötäpäivään ylhäältä: keulavarsi, oikea kylki, peräpeili, vasen kylki.</summary>
        static void Runko(MalliRakenne r)
        {
            var kylki = new[] { new Vector2(0.0085f, 0.057f), new Vector2(0.016f, 0.040f), new Vector2(0.0198f, 0.016f),
                new Vector2(0.0198f, -0.016f), new Vector2(0.0172f, -0.040f), new Vector2(0.012f, -0.056f) };
            int m = 1 + 2 * kylki.Length;
            var kansi = new Vector3[m];
            var vesi = new Vector3[m];
            kansi[0] = new Vector3(0f, KansiY(0.068f), 0.068f);
            vesi[0] = new Vector3(0f, 0f, 0.062f);
            for (int i = 0; i < kylki.Length; i++)
            {
                var k = kylki[i];
                kansi[1 + i] = new Vector3(k.x, KansiY(k.y), k.y);
                kansi[m - 1 - i] = new Vector3(-k.x, KansiY(k.y), k.y);
                vesi[1 + i] = new Vector3(k.x + 0.0028f, 0f, k.y * 0.93f);
                vesi[m - 1 - i] = new Vector3(-k.x - 0.0028f, 0f, k.y * 0.93f);
            }
            for (int i = 0; i < m; i++) { int j = (i + 1) % m; r.Nelio(vesi[i], vesi[j], kansi[j], kansi[i], RunkoVari); }
            for (int i = 1; i < m - 1; i++) r.Kolmio(kansi[0], kansi[i], kansi[i + 1], KansiVari);
        }

        /// <summary>Halkaisija: kolmio (nurkka, huippu, kulma), jonka keskikohta pullistuu suojan puolelle (kaksi tahkoa).</summary>
        static void Halkaisija(MalliRakenne r, Vector3 nurkka, Vector3 huippu, Vector3 kulma)
        {
            var vatsa = Vector3.Lerp(nurkka, huippu, 0.45f) + new Vector3(0.008f, 0f, -0.004f);
            r.Kolmio(nurkka, vatsa, kulma, Purje);
            r.Kolmio(vatsa, huippu, kulma, PurjeSauma);
        }

        /// <summary>
        /// Raakapurjepino (lapsi): alapurje, märssypurje ja prammipurje (raakapuut jätetty pois: puhelimen koossa ne tekivät
        /// takiloinnista tikapuut). Origo maston tyvessä kannen tasolla, raakapuut x-suunnassa ja vatsa +z-suuntaan, joten
        /// Animoi kääntää pinon brassauskulmaan ja pullistaa purjeet z-skaalalla. Kukin purje on sivulta D-kaari (vatsa
        /// syvin puolivälissä, jalus hieman edessä), joten sivulta näkyy tyynymäinen pino ja ylhäältä purjeen yläpuolisko
        /// valkoisena sirppinä.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            // (raakapuun korkeus, jalustan korkeus, puolileveys ylhäällä, puolileveys alhaalla, vatsan syvyys)
            var purjeet = new[] { (0.037f, 0.012f, 0.035f, 0.039f, 0.030f), (0.060f, 0.039f, 0.029f, 0.034f, 0.026f), (0.079f, 0.062f, 0.022f, 0.027f, 0.021f) };
            var p = new Vector3[5, 3];
            foreach (var (yYla, yAla, lYla, lAla, syvyys) in purjeet)
            {
                for (int i = 0; i < 5; i++)
                    for (int j = 0; j < 3; j++)
                    {
                        float u = i / 2f - 1f, v = j / 2f;   // u: −1…1 poikki, v: 0 raakapuu … 1 jalusta
                        float x = u * Mathf.Lerp(lYla, lAla, v);
                        float vatsa = syvyys * (j == 0 ? 0f : j == 1 ? 1f : 0.55f) * Mathf.Pow(Mathf.Max(0f, 1f - u * u), 0.7f);
                        p[i, j] = new Vector3(x, Mathf.Lerp(yYla, yAla, v), vatsa);
                    }
                for (int i = 0; i < 4; i++)
                    for (int j = 0; j < 2; j++)
                        r.Nelio(p[i, j], p[i + 1, j], p[i + 1, j + 1], p[i, j + 1], Purje);
            }
            return r.Mesh("Meri: raakapurjeet");
        }

        /// <summary>Keulakuohu (lapsi, origo keulavarren vesirajassa, pysyy vaakasuorassa kallistuksesta riippumatta): leveät
        /// kuohuviikset, suojan puolen kylkeä pitkin juokseva vaahto ja tyyny keulan edessä. Näkyy puuskassa (skaala 0–1).</summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            float a = 45f * Mathf.Deg2Rad;
            for (int k = 0; k < 2; k++)
            {
                float puoli = k == 0 ? -1f : 1f;
                MeriGeometria.Nauha(r, new Vector3(0.006f * puoli, 0f, -0.004f), new Vector3(Mathf.Sin(a) * puoli, 0f, -Mathf.Cos(a)), 0.09f, 0.01f, 0.022f, 1f, 0.1f, 2);
            }
            MeriGeometria.Nauha(r, new Vector3(0.018f, 0f, -0.008f), new Vector3(0.12f, 0f, -1f), 0.09f, 0.009f, 0.006f, 0.85f, 0f, 2);
            Color tyyny = MeriGeometria.Vaahto; tyyny.a = 0.95f;
            r.Kolmio(new Vector3(-0.014f, 0f, -0.008f), new Vector3(0f, 0f, 0.012f), new Vector3(0.014f, 0f, -0.008f), tyyny);
            return r.Mesh("Meri: keulakuohu");
        }

        /// <summary>Roiske: valkoinen oktaedri (säde 0,006), skaalataan iän mukaan.</summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            r.Nuppi(Vector3.zero, 0.006f, new Color(0.99f, 0.99f, 0.97f));
            return r.Mesh("Meri: roiske");
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Puuskat näytöksessä n hetkellä s: voimakkuus 0–1 ja puuskien tuoma lisämatka (s) sekä koko näytöksen lisämatka.
        /// Kolme paikkaa matkalla (18 %, 46 %, 74 % ± 5 %), joista kukin puhaltaa 80 %:n todennäköisyydellä (voima 0,2–0,35);
        /// harvinaisessa keskimmäinen on kova puuska (voima 1, pidempi). Nousu 1,6–2,2 s, lasku 3–4 s, ei nykäyksiä.
        /// </summary>
        static (float puuska, float lisa, float lisaYht) Puuskat(int n, float s, float pituus, bool harv)
        {
            float puuska = 0f, lisa = 0f, yht = 0f;
            for (int i = 0; i < 3; i++)
            {
                bool iso = harv && i == 1;
                float voima = iso ? 1f : Aikataulu.Arvo(n, 10 + i) < 0.8f ? 0.2f + 0.15f * Aikataulu.Arvo(n, 13 + i) : 0f;
                if (voima <= 0f) continue;
                float alku = pituus * (0.13f + 0.28f * i + 0.1f * Aikataulu.Arvo(n, 16 + i));
                float nousu = iso ? 2.2f : 1.6f, pito = iso ? 4.5f : 1.5f + 1.5f * Aikataulu.Arvo(n, 19 + i), lasku = iso ? 4f : 3f;
                float kesto = nousu + pito + lasku;
                puuska = Mathf.Max(puuska, voima * Pehmea((s - alku) / nousu) * (1f - Pehmea((s - alku - nousu - pito) / lasku)));
                // Lisävauhti enintään noin +20 % (Pehmean derivaatta 1,875 × 0,11).
                float e = 0.11f * voima * kesto;
                lisa += e * Pehmea((s - alku) / kesto);
                yht += e;
            }
            return (puuska, lisa, yht);
        }

        /// <summary>
        /// Purjelaivan näytös: matka rannikon suuntaisesti (z ±0,34) loivaa kaarta merellä (x −0,03…−0,10), pohjoiseen tai
        /// etelään jaksosta. Kallistus 4° suojan puolelle + puuskissa lisää (tavallinen 5,5–6,5°, harvinainen 11°), keinunta
        /// ±0,8° ja nyökkäys ±0,6°; puuskassa vauhti kasvaa hetkeksi (enintään +20 %) ja purjeet pullistuvat (z-skaala
        /// 0,86 → 1,18, kovassa 1,34). Keulakuohu ja roiskeet vain puuskassa; vanavesi on rungon mallissa.
        /// </summary>
        public static void Animoi(Transform laiva, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            var (puuska, lisa, lisaYht) = Puuskat(n, s, pituus, harv);

            float v = (s + lisa) / (pituus + lisaYht), w = pohjoiseen ? 2f * v - 1f : 1f - 2f * v;
            float x0 = 0.03f + 0.025f * Aikataulu.Arvo(n, 4), kaari = 0.02f + 0.025f * Aikataulu.Arvo(n, 5);
            laiva.localPosition = new Vector3(-x0 - kaari * (1f - w * w), 0f, 0.34f * w);
            var suunta = new Vector3(2f * kaari * w, 0f, 0.34f).normalized * (pohjoiseen ? 1f : -1f);
            float vaihe = Aikataulu.Arvo(n, 6) * 10f;
            float kallistus = 4f + 7f * puuska + 0.8f * Mathf.Sin((t + vaihe) * 1.3f);
            float nyokkays = 0.6f * Mathf.Sin((t + vaihe) * 1.7f) + 1.2f * puuska * puuska * Mathf.Sin((t + vaihe) * 2.6f);
            // Suojan puoli on +x: negatiivinen z-kierto kallistaa maston oikealle.
            var kallistus3 = Quaternion.Euler(nyokkays, 0f, -kallistus);
            laiva.localRotation = Quaternion.LookRotation(suunta, Vector3.up) * kallistus3;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;

            // Raakapurjeet: brassattuina, vatsa hengittää hieman ja pullistuu puuskassa.
            float pullistus = 0.86f + 0.9f * Mathf.Min(puuska, 0.35f) + 0.25f * Mathf.Max(0f, puuska - 0.35f);
            var brassi = Quaternion.Euler(0f, Brassi, 0f);
            for (int k = 0; k < 2; k++)
            {
                float z = k == 0 ? KeulaZ : IsoZ, koko = k == 0 ? 0.92f : 1f;
                float hengitys = 0.03f * Mathf.Sin(t * 2.1f + k * 1.7f);
                lapset[k].localPosition = new Vector3(0f, KansiY(z), z);
                lapset[k].localRotation = brassi;
                lapset[k].localScale = new Vector3(koko, koko, koko * (pullistus + hengitys));
            }

            // Keulakuohu kovassa puuskassa (tavallisessa vain aavistus), roiskeet vain kovassa.
            float kuohu = Pehmea((puuska - 0.2f) / 0.6f);
            var kuohuLapsi = lapset[Lapsia];
            // Kuohu pysyy vedenpinnassa: kallistus kumotaan (kuten vanavedellä olisi, jos se ei kulkisi rungon mukana).
            var suoraan = Quaternion.Inverse(kallistus3);
            kuohuLapsi.localPosition = suoraan * new Vector3(0f, 0.0014f, 0.064f);
            kuohuLapsi.localRotation = suoraan;
            kuohuLapsi.localScale = kuohu > 0.001f ? Vector3.one * (kuohu * (1f + 0.06f * Mathf.Sin(t * 5.3f))) : Vector3.zero;
            float roiske = Pehmea((puuska - 0.6f) / 0.3f);
            for (int k = 0; k < Lapsia3; k++)
            {
                var pallo = lapset[Lapsia + Lapsia2 + k];
                float ika = Mathf.Repeat(t / 0.85f + k / (float)Lapsia3, 1f);
                pallo.localPosition = new Vector3(0.008f + 0.03f * ika, 0.004f + 0.024f * Mathf.Sin(Mathf.PI * ika), 0.068f + 0.008f * ika - 0.02f * ika * ika);
                pallo.localScale = roiske > 0.001f ? Vector3.one * (roiske * Mathf.Sin(Mathf.PI * ika) * (0.7f + 0.8f * ika)) : Vector3.zero;
            }
        }
    }
}
