using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koriste 4: nykyaikainen autolautta (AIKA-sääntö: kartta elää nykyajassa, vain ilme on vanha). Pitkä tumma runko,
    /// kaksi vaaleaa kansirakennusta tummin ikkunanauhoin, terrakotta savupiippu perässä ja perälippu. Kulkee tasaista
    /// vauhtia suoraan rannikon suuntaan, ja pitkä valkoinen vanavesi (potkurivirta ja Kelvinin kiila) kertoo liikkeen jo
    /// pysäytyskuvassa. Harvinainen (noin 1/10): vastaan tulee toinen lautta, ja ne ohittavat toisensa keskellä matkaa
    /// oikeanpuoleisen liikenteen mukaan (vasen kylki vasenta vasten). +z eteen (keula), +y ylös, meren pinta y = 0.
    /// Lapset: 0 toinen lautta (sama malli, vain harvinaisessa), 1–2 perälippu kummallekin.
    /// </summary>
    public static class MeriLautta
    {
        public const string Nimi = "lautta";
        public static readonly string[] Meret = { "itameri", "valimeri", "pohjanmeri" };
        /// <summary>Runko 0,165 yksikköä → noin 46 pt (sama mittakaava kuin siipiratashöyryllä ja purjelaivalla).</summary>
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(919, 30f, 45f, 60f, 150f);
        public const int Lapsia = 1, Lapsia2 = 2;

        static readonly Color RunkoVari = MalliVarit.Hex(0x39414a), Ikkuna = MalliVarit.Hex(0x2f363f);
        static readonly Color Seina = MalliVarit.Valo, Kansi = Color.Lerp(MalliVarit.Valo, new Color(1f, 1f, 1f), 0.35f);
        static readonly Color KansiRunko = MalliVarit.Hex(0x6d6a63);

        /// <summary>Lipputangon tyvi perässä (lipun lapsen origo).</summary>
        static readonly Vector3 Lipputanko = new Vector3(0f, 0.0203f, -0.0785f);
        /// <summary>Kaistojen väli ohituksessa (keskilinjasta keskilinjaan).</summary>
        const float Kaistavali = 0.062f;

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Mallit ----

        /// <summary>Lautta: runko, kaksi kansirakennusta ikkunanauhoin, savupiippu ja vanavesi (sama malli toiselle lautalle).</summary>
        public static Mesh Roottori()
        {
            var r = new MalliRakenne();
            // Runko: terävä keula, suora kylki ja leveä peräpeili; vesiraja hieman kantta leveämpi (tumma reunus ylhäältä).
            var kylki = new[] { new Vector2(0.0085f, 0.068f), new Vector2(0.0145f, 0.050f), new Vector2(0.017f, 0.028f),
                new Vector2(0.017f, -0.068f), new Vector2(0.0155f, -0.0825f) };
            const float yK = 0.0085f;
            int m = 1 + 2 * kylki.Length;
            var kansi = new Vector3[m];
            var vesi = new Vector3[m];
            kansi[0] = new Vector3(0f, yK + 0.001f, 0.0835f);
            vesi[0] = new Vector3(0f, 0f, 0.080f);
            for (int i = 0; i < kylki.Length; i++)
            {
                var k = kylki[i];
                float y = yK + (k.y > 0.03f ? 0.001f * (k.y - 0.03f) / 0.0535f : 0f);
                kansi[1 + i] = new Vector3(k.x, y, k.y);
                kansi[m - 1 - i] = new Vector3(-k.x, y, k.y);
                vesi[1 + i] = new Vector3(k.x + 0.0022f, 0f, k.y * 0.985f);
                vesi[m - 1 - i] = new Vector3(-k.x - 0.0022f, 0f, k.y * 0.985f);
            }
            for (int i = 0; i < m; i++) { int j = (i + 1) % m; r.Nelio(vesi[i], vesi[j], kansi[j], kansi[i], RunkoVari); }
            for (int i = 1; i < m - 1; i++) r.Kolmio(kansi[0], kansi[i], kansi[i + 1], KansiRunko);

            // Kansirakennukset: alempi pitkä (autokansi ja matkustajakannet) ja ylempi lyhyempi komentosiltoineen, kummassakin
            // tumma ikkunanauha; korkeus kuin oikealla lautalla (ylin kansi noin 0,18 × pituus), jotta sivulta näkyy kerrostalo.
            Kansirakennus(r, -0.081f, 0.038f, 0.0156f, yK, 0.0205f, 0.012f, 0.5f, 0.78f);
            Kansirakennus(r, -0.060f, 0.025f, 0.0122f, 0.0205f, 0.0292f, 0.010f, 0.38f, 0.78f);

            // Savupiippu perässä (terrakotta, ainoa aksentti lipun kanssa).
            r.Laatikko(new Vector3(0f, 0.0345f, -0.047f), new Vector3(0.0054f, 0.0055f, 0.0088f), MalliVarit.TerrakottaHimmea);

            // Vanavesi: pitkä potkurivirta (kaksi nauhaa, jotka yhtyvät), Kelvinin kiila ja keulan aallot.
            const float yv = 0.0012f;
            float kiila = 19.5f * Mathf.Deg2Rad, keula = 32f * Mathf.Deg2Rad;
            for (int k = 0; k < 2; k++)
            {
                float puoli = k == 0 ? -1f : 1f;
                MeriGeometria.Nauha(r, new Vector3(0.016f * puoli, yv, -0.07f), new Vector3(Mathf.Sin(kiila) * puoli, 0f, -Mathf.Cos(kiila)), 0.2f, 0.005f, 0.016f, 0.5f, 0f, 3);
                MeriGeometria.Nauha(r, new Vector3(0.004f * puoli, yv, 0.08f), new Vector3(Mathf.Sin(keula) * puoli, 0f, -Mathf.Cos(keula)), 0.05f, 0.004f, 0.009f, 0.6f, 0.05f, 1);
                MeriGeometria.Nauha(r, new Vector3(0.0065f * puoli, yv + 0.0002f, -0.083f), new Vector3(-0.035f * puoli, 0f, -1f), 0.1f, 0.009f, 0.016f, 0.8f, 0.3f, 2);
            }
            MeriGeometria.Nauha(r, new Vector3(0f, yv + 0.0001f, -0.18f), Vector3.back, 0.2f, 0.028f, 0.05f, 0.45f, 0f, 3);
            return r.Mesh("Meri: lautta");
        }

        /// <summary>
        /// Kansirakennus z0…z1 (keula z1:ssä loivana V:nä), puolileveys b, korkeus y0…y1: vaaleat seinät, tumma ikkunanauha
        /// korkeuksilla i0…i1 (osuus seinästä) kyljissä ja edessä hieman seinän ulkopuolella, ja vaalea kattokansi.
        /// </summary>
        static void Kansirakennus(MalliRakenne r, float z0, float z1, float b, float y0, float y1, float keulaV, float i0, float i1)
        {
            Vector3 ta = new Vector3(-b, 0f, z0), tb = new Vector3(b, 0f, z0), eb = new Vector3(b, 0f, z1 - keulaV), ea = new Vector3(-b, 0f, z1 - keulaV);
            var karki = new Vector3(0f, 0f, z1);
            Vector3 ala = new Vector3(0f, y0, 0f), yla = new Vector3(0f, y1, 0f);
            r.Nelio(tb + ala, ta + ala, ta + yla, tb + yla, Seina);          // perä
            r.Nelio(ta + ala, ea + ala, ea + yla, ta + yla, Seina);          // vasen kylki
            r.Nelio(eb + ala, tb + ala, tb + yla, eb + yla, Seina);          // oikea kylki
            r.Nelio(ea + ala, karki + ala, karki + yla, ea + yla, Seina);    // keula vasen
            r.Nelio(karki + ala, eb + ala, eb + yla, karki + yla, Seina);    // keula oikea
            r.Kolmio(ta + yla, ea + yla, karki + yla, Kansi);
            r.Kolmio(ta + yla, karki + yla, tb + yla, Kansi);
            r.Kolmio(tb + yla, karki + yla, eb + yla, Kansi);
            // Ikkunanauha 0,0003 seinän ulkopuolella (kyljet ja V-keulan kummankin tahkon normaalin suuntaan).
            Vector3 a0 = new Vector3(0f, Mathf.Lerp(y0, y1, i0), 0f), a1 = new Vector3(0f, Mathf.Lerp(y0, y1, i1), 0f);
            const float o = 0.0003f;
            var ox = new Vector3(o, 0f, 0f);
            var nv = new Vector3(-keulaV, 0f, b).normalized * o;
            var no = new Vector3(keulaV, 0f, b).normalized * o;
            r.Nelio(ta - ox + a0, ea - ox + a0, ea - ox + a1, ta - ox + a1, Ikkuna);
            r.Nelio(eb + ox + a0, tb + ox + a0, tb + ox + a1, eb + ox + a1, Ikkuna);
            r.Nelio(ea + nv + a0, karki + nv + a0, karki + nv + a1, ea + nv + a1, Ikkuna);
            r.Nelio(karki + no + a0, eb + no + a0, eb + no + a1, karki + no + a1, Ikkuna);
        }

        /// <summary>Toinen lautta: sama malli (näkyy vain harvinaisessa ohituksessa).</summary>
        public static Mesh Lapsi() => Roottori();

        /// <summary>Perälippu tangossa (origo tangon tyvessä): tumma tanko ja terrakotta lippu kahtena liehuvana osana, +x:n suuntaan.</summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            r.Nelio(new Vector3(-0.0005f, 0f, 0f), new Vector3(0.0005f, 0f, 0f), new Vector3(0.0005f, 0.012f, 0f), new Vector3(-0.0005f, 0.012f, 0f), RunkoVari);
            Vector3 a0 = new Vector3(0f, 0.0065f, 0f), a1 = new Vector3(0f, 0.0118f, 0f);
            Vector3 b0 = new Vector3(0.0065f, 0.0063f, 0.0012f), b1 = new Vector3(0.0065f, 0.0116f, 0.0012f);
            Vector3 c0 = new Vector3(0.0125f, 0.0066f, -0.0006f), c1 = new Vector3(0.0125f, 0.0114f, -0.0006f);
            r.Nelio(a0, b0, b1, a1, MalliVarit.Terrakotta);
            r.Nelio(b0, c0, c1, b1, MalliVarit.TerrakottaHimmea);
            return r.Mesh("Meri: perälippu");
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Lautan näytös: tasainen matka suoraa kaistaa rannikon suuntaisesti (z ±0,35, kulma rannikkoon ±2,5°, x −0,03…−0,11)
        /// pohjoiseen tai etelään jaksosta, vakaa keinunta (kallistus ±0,7°, nyökkäys ±0,35°) ja perälippu liehuu.
        /// Harvinaisessa toinen lautta tulee vastaan 0,062:n päässä (kumpikin pitää oikeaa laitaa) ja ohitus on keskellä
        /// näytöstä. Huom. toinen lautta on roottorin lapsi, joten liioitellun perspektiivin kallistus (KallistaVainRoottori)
        /// kiertää sitä ensimmäisen lautan ympäri; kaukana (näytöksen alussa ja lopussa) se voi nousta tai painua pinnasta.
        /// </summary>
        public static void Animoi(Transform lautta, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            float w = 2f * s / pituus - 1f;
            // Oikeanpuoleinen liikenne: pohjoiseen kulkeva maan puolella (idempänä), etelään kulkeva meren puolella.
            float kaista = harv
                ? (pohjoiseen ? -0.042f - 0.006f * Aikataulu.Arvo(n, 4) : -0.042f - Kaistavali - 0.006f * Aikataulu.Arvo(n, 4))
                : -0.05f - 0.045f * Aikataulu.Arvo(n, 4);
            float kulma = (Aikataulu.Arvo(n, 5) - 0.5f) * 5f * Mathf.Deg2Rad;
            var linja = new Vector3(Mathf.Sin(kulma), 0f, Mathf.Cos(kulma));
            var sivu = new Vector3(Mathf.Cos(kulma), 0f, -Mathf.Sin(kulma));
            float suunta = pohjoiseen ? 1f : -1f;
            var paikka = sivu * kaista + linja * (0.35f * w * suunta);
            float vaihe = Aikataulu.Arvo(n, 6) * 10f;
            var kulku = Quaternion.LookRotation(linja * suunta, Vector3.up);
            var rot = kulku * Quaternion.Euler(0.35f * Mathf.Sin((t + vaihe) * 1.1f), 0f, 0.7f * Mathf.Sin((t + vaihe) * 0.8f));
            lautta.localPosition = paikka;
            lautta.localRotation = rot;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2) return;

            var toinen = lapset[0];
            var lippuB = lapset[2];
            Lippu(lapset[1], Vector3.zero, Quaternion.identity, t, 0f);
            if (!harv) { toinen.localScale = Vector3.zero; lippuB.localScale = Vector3.zero; return; }

            // Toinen lautta vastakkaiseen suuntaan viereisellä kaistalla (oikealla puolellaan), ohitus keskellä näytöstä.
            var paikkaB = sivu * (kaista + (pohjoiseen ? -Kaistavali : Kaistavali)) - linja * (0.35f * w * suunta);
            var rotB = Quaternion.LookRotation(-linja * suunta, Vector3.up)
                * Quaternion.Euler(0.35f * Mathf.Sin((t + vaihe) * 1.3f + 2f), 0f, 0.7f * Mathf.Sin((t + vaihe) * 0.9f + 1f));
            // Lapsi on lautan alla: paikka ja asento lautan omassa avaruudessa.
            var kaanto = Quaternion.Inverse(rot);
            var lokaaliB = kaanto * (paikkaB - paikka);
            var lokaaliRotB = kaanto * rotB;
            toinen.localPosition = lokaaliB;
            toinen.localRotation = lokaaliRotB;
            toinen.localScale = Vector3.one;
            Lippu(lippuB, lokaaliB, lokaaliRotB, t, 1.7f);
        }

        /// <summary>Perälippu lautan (paikka, asento) perässä: liehuu taakse, heilahtelee ja lepattaa.</summary>
        static void Lippu(Transform lippu, Vector3 paikka, Quaternion asento, float t, float vaihe)
        {
            float heilunta = 14f * Mathf.Sin(t * 4.3f + vaihe) + 6f * Mathf.Sin(t * 7.9f + 2f * vaihe);
            lippu.localPosition = paikka + asento * Lipputanko;
            // Lippu osoittaa mallissa +x:ään; +90° y-kierto kääntää sen taakse (−z).
            lippu.localRotation = asento * Quaternion.Euler(0f, 90f + heilunta, 0f);
            lippu.localScale = new Vector3(0.92f + 0.08f * Mathf.Sin(t * 11f + vaihe), 1f, 1f);
        }
    }
}
