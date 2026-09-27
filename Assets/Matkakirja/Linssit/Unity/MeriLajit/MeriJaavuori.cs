using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koristeet, laji 8: jäävuori (Jäämeri ja Pohjois-Atlantti). Kaksihuippuinen särmikäs jäävuori ajelehtii hitaasti
    /// rannikon suuntaan ja kääntyy vähän, keinuu ja nyökkää (jaksot 6–8 s); pinnan alla näkyy vaalea läpikuultava jalka
    /// ("jäävuoren huippu") ja vesirajassa pehmeä vaahtorengas, vieressä kaksi pientä jäälauttaa. Kerros lepää vain tauolla,
    /// joten jäävuorikin on näytös: häivytys sisään 2,5 s, ajelehtii 30–60 s, häivytys ulos; tauko 60–150 s. Harvinainen
    /// (noin 1/10): läntisen olan pieni huippu natisee, kaatuu ulospäin ja putoaa mereen (roiske), kelluu kyljellään
    /// keinuen ja ajelehtii erilleen vaahtorenkaan keskellä; jäävuori heilahtaa keventyneenä ja asettuu.
    /// Lapset: 0 jäävuori, 1 lohkeava huippu, 2 roiske (lohkeaman jälkeen palan vaahtorengas).
    /// </summary>
    public static class MeriJaavuori
    {
        public const string Nimi = "jaavuori";
        public static readonly string[] Meret = { "jaameri", "atlantti" };
        /// <summary>Jäävuori vesirajassa 0,12 × 0,17 → noin 35 × 48 pt, huippu 0,13 (jalka ja rengas mukana noin 65 pt).</summary>
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(937, 30f, 60f, 60f, 150f);
        public const int Lapsia = 1, Lapsia2 = 1, Lapsia3 = 1;

        /// <summary>
        /// Kylmät vaaleat sävyt: lumivalkoinen laki, vaalean sinertävät seinät, vesirajan sinisempi vyö ja turkoosinharmaa
        /// jalka (kylmä sävy on lajin ainoa aksentti).
        /// </summary>
        static readonly Color Laki = new Color(0.96f, 0.97f, 0.96f, 1f), LakiVarjo = MalliVarit.Hex(0xe4eef0), Seina = MalliVarit.Hex(0xcfe6ec),
            SeinaVarjo = MalliVarit.Hex(0xbcdbe3), Vyo = MalliVarit.Hex(0xa2c6cf), Jalka = MalliVarit.Hex(0x5f9ea3);
        static readonly Color Roiskevari = new Color(0.99f, 1f, 1f, 1f);

        /// <summary>Vesirajan kymmenkulmio (x, z) ja olan korkeus kullekin kulmalle; olka on vesirajasta sisennetty.</summary>
        static readonly float[] VesiX = { 0.058f, 0.050f, 0.012f, -0.030f, -0.056f, -0.066f, -0.046f, -0.006f, 0.034f, 0.040f };
        static readonly float[] VesiZ = { 0.012f, 0.060f, 0.090f, 0.078f, 0.036f, -0.010f, -0.056f, -0.082f, -0.070f, -0.030f };
        static readonly float[] Sisennys = { 0.9f, 0.86f, 0.92f, 0.84f, 0.9f, 0.88f, 0.86f, 0.92f, 0.86f, 0.9f };
        static readonly float[] OlkaY = { 0.030f, 0.036f, 0.026f, 0.040f, 0.030f, 0.028f, 0.034f, 0.024f, 0.032f, 0.038f };
        /// <summary>Kaksi huippua (A:lla harjanne) ja niiden välinen satula (grönlantilainen "telakka"-jäävuori).</summary>
        static readonly Vector3 HuippuA = new Vector3(-0.022f, 0.13f, 0.04f), HarjaA = new Vector3(-0.008f, 0.104f, 0.022f),
            HuippuB = new Vector3(0.024f, 0.092f, -0.038f), Satula = new Vector3(0.006f, 0.046f, -0.004f);
        /// <summary>Lohkeavan huipun kiinnityskohta lännen olalla (−x on merelle päin) ja sen kallistus ulospäin.</summary>
        static readonly Vector3 Kiinni = new Vector3(-0.054f, 0.024f, -0.006f);
        static readonly Quaternion KiinniAsento = Quaternion.Euler(4f, 25f, 15f);
        /// <summary>Kallistumisen sarana: palan ulkoreuna (palan avaruudessa), jonka ympäri se kaatuu ulospäin (−x).</summary>
        static readonly Vector3 Sarana = new Vector3(-0.016f, 0f, 0f);

        // Lohkeaman vaiheet (s): natina, kaatuminen, putoaminen, sukellus ja pulpahdus; ajelehtimisen matka.
        const float Natina = 0.6f, Kaatuu = 0.7f, Putoaa = 0.35f, Pulpahdus = 0.9f, Ajelehtii = 0.045f;

        public static Mesh Roottori() => HoyryGeometria.Joki();

        /// <summary>
        /// Jäävuori (80 kolmiota): pinnan alla vaalea läpikuultava jalka (alfa 0,34 → 0 ulkoreunaan, 1,4 × vesiraja),
        /// vaahtorengas vesirajasta ulos häipyen, kaksi pientä jäälauttaa ja särmikäs kappale: vesirajasta sisennetylle olalle
        /// jyrkät seinät (kolmiot erikseen, joten särmät välkkyvät) ja olalta kaksi huippua, joiden välissä satula.
        /// Origo vesirajassa keskellä, +y ylös.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            const int N = 10;
            // Jalka pinnan alla: rengas vesirajalta 1,6-kertaiseksi, hieman länteen (−x) venytettynä.
            Color jalka = Jalka, jalkaUlko = Jalka; jalka.a = 0.34f; jalkaUlko.a = 0f;
            for (int i = 0; i < N; i++)
            {
                int j = (i + 1) % N;
                r.NelioVarit(Vesi(i, 1f, -0.003f), Vesi(i, 1.4f, -0.003f) + new Vector3(-0.008f, 0f, 0f),
                    Vesi(j, 1.4f, -0.003f) + new Vector3(-0.008f, 0f, 0f), Vesi(j, 1f, -0.003f), jalka, jalkaUlko, jalkaUlko, jalka);
            }
            // Vaahtorengas: sisäreuna vaahtoa, ulkoreuna häipyy (kuten valaan rengas).
            Color sisa = MeriGeometria.Vaahto, ulko = MeriGeometria.Vaahto; sisa.a = 0.55f; ulko.a = 0f;
            for (int i = 0; i < N; i++)
            {
                int j = (i + 1) % N;
                r.NelioVarit(Vesi(i, 1f, 0.0012f), Vesi(i, 1.2f, 0.0012f), Vesi(j, 1.2f, 0.0012f), Vesi(j, 1f, 0.0012f), sisa, ulko, ulko, sisa);
            }
            // Kaksi pientä jäälauttaa vieressä.
            Color lautta = Laki; lautta.a = 0.95f;
            Lautta(r, new Vector3(-0.098f, 0.0016f, 0.058f), 0.011f, 20f, lautta);
            Lautta(r, new Vector3(0.036f, 0.0016f, -0.104f), 0.008f, -35f, lautta);
            // Seinät vesirajalta olalle ja olalta huipuille; kukin kolmio ulospäin omalla normaalillaan.
            var w = new Vector3[N]; var m = new Vector3[N];
            for (int i = 0; i < N; i++) { w[i] = Vesi(i, 1f, 0f); m[i] = Vesi(i, Sisennys[i], OlkaY[i]); }
            for (int i = 0; i < N; i++)
            {
                int j = (i + 1) % N;
                Ulos(r, w[i], w[j], m[j], i % 2 == 0 ? Vyo : SeinaVarjo);
                Ulos(r, w[i], m[j], m[i], i % 2 == 0 ? SeinaVarjo : Seina);
            }
            // Laki: huippu A harjanteineen (olat 2–6), huippu B (olat 7–1) ja satula niiden välissä.
            for (int i = 2; i <= 4; i++) Laella(r, m[i], m[i + 1], HuippuA, i);
            Laella(r, m[5], m[6], HarjaA, 1); Laella(r, m[5], HarjaA, HuippuA, 0); Laella(r, m[2], HuippuA, HarjaA, 1);
            for (int i = 7; i <= 10; i++) Laella(r, m[i % N], m[(i + 1) % N], HuippuB, i);
            Laella(r, m[6], m[7], Satula, 0); Laella(r, m[6], Satula, HarjaA, 0); Laella(r, m[7], HuippuB, Satula, 1);
            Laella(r, m[1], m[2], Satula, 0); Laella(r, m[2], HarjaA, Satula, 0); Laella(r, m[1], Satula, HuippuB, 1);
            return r.Mesh("Meri: jäävuori");
        }

        /// <summary>Lohkeava huippu (8 kolmiota): viisikulmainen pohja (säde 0,015), kärki 0,056 ylhäällä; origo pohjan keskellä.</summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            var p = new Vector3[5];
            float[] sade = { 0.016f, 0.013f, 0.017f, 0.014f, 0.015f };
            for (int i = 0; i < 5; i++)
            {
                float a = i * Mathf.PI * 2f / 5f + 0.3f;
                p[i] = new Vector3(Mathf.Cos(a) * sade[i], 0f, Mathf.Sin(a) * sade[i]);
            }
            var karki = new Vector3(-0.004f, 0.056f, -0.002f);
            for (int i = 0; i < 5; i++) Ulos(r, p[i], p[(i + 1) % 5], karki, i % 2 == 0 ? Laki : Seina, new Vector3(0f, 0.008f, 0f));
            // Pohja on lohkeamispinta: kirkkaan valkoinen, kun pala kelluu kyljellään.
            r.Kolmio(p[0], p[1], p[2], Laki); r.Kolmio(p[0], p[2], p[3], Laki); r.Kolmio(p[0], p[3], p[4], Laki);
            return r.Mesh("Meri: jäävuoren lohkeava huippu");
        }

        /// <summary>
        /// Roiske (12 kolmiota): vaahtolätäkkö ja kuuden kehän suuntaisen terälehden kruunu; lohkeaman jälkeen litteänä
        /// vaahtorenkaana kelluvan palan ympärillä.
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            Color keski = Roiskevari, reuna = MeriGeometria.Vaahto, piikki = Roiskevari;
            keski.a = 0.8f; reuna.a = 0.2f; piikki.a = 0.95f;
            const int sivuja = 6;
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                r.NelioVarit(new Vector3(Mathf.Cos(a0) * 0.009f, 0.001f, Mathf.Sin(a0) * 0.009f), new Vector3(Mathf.Cos(a0) * 0.02f, 0.001f, Mathf.Sin(a0) * 0.02f),
                    new Vector3(Mathf.Cos(a1) * 0.02f, 0.001f, Mathf.Sin(a1) * 0.02f), new Vector3(Mathf.Cos(a1) * 0.009f, 0.001f, Mathf.Sin(a1) * 0.009f),
                    keski, reuna, reuna, keski);
            }
            // Kruunun terälehdet kehän suuntaisina: litistettyinä ne muodostavat ohuen kuusikulmaisen renkaan.
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja, a = (a0 + a1) * 0.5f;
                Vector3 b0 = new Vector3(Mathf.Cos(a0) * 0.016f, 0.0005f, Mathf.Sin(a0) * 0.016f);
                Vector3 b1 = new Vector3(Mathf.Cos(a1) * 0.016f, 0.0005f, Mathf.Sin(a1) * 0.016f);
                Vector3 kk = new Vector3(Mathf.Cos(a) * 0.021f, 0.02f, Mathf.Sin(a) * 0.021f);
                r.Kolmio(b0, kk, b1, piikki);
            }
            return r.Mesh("Meri: jäävuoren roiske");
        }

        /// <summary>Vesirajan kulma i kerrottuna (sisennys tai jalan laajennus) korkeudella y.</summary>
        static Vector3 Vesi(int i, float k, float y) => new Vector3(VesiX[i] * k, y, VesiZ[i] * k);

        /// <summary>Pieni jäälautta: litteä epäsäännöllinen nelikulmio (2 kolmiota) pinnalla.</summary>
        static void Lautta(MalliRakenne r, Vector3 k, float koko, float kulma, Color v)
        {
            var q = Quaternion.Euler(0f, kulma, 0f);
            Vector3 a = k + q * new Vector3(-koko, 0f, -0.6f * koko), b = k + q * new Vector3(0.8f * koko, 0f, -0.8f * koko);
            Vector3 c = k + q * new Vector3(koko * 1.1f, 0f, 0.5f * koko), d = k + q * new Vector3(-0.5f * koko, 0f, 0.9f * koko);
            r.NelioVarit(a, d, c, b, v, v, v, v);
        }

        /// <summary>Laen kolmio: lumivalkoinen, joka toinen hieman sinertävä (särmät erottuvat); valaistus varjostaa sivut.</summary>
        static void Laella(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, int k) => Ulos(r, a, b, c, k % 2 == 0 ? Laki : LakiVarjo);

        /// <summary>Kolmio ulospäin: normaali poispäin vertailupisteestä (oletuksena jäävuoren keskeltä pinnan alta).</summary>
        static void Ulos(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Color v, Vector3? keskus = null)
        {
            var n = Vector3.Cross(b - a, c - a);
            var o = (a + b + c) / 3f - (keskus ?? new Vector3(0f, -0.04f, 0f));
            if (Vector3.Dot(n, o) < 0f) r.Kolmio(a, c, b, v); else r.Kolmio(a, b, c, v);
        }

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : MeriGeometria.Pehmea(s / 2.5f) * MeriGeometria.Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Näytös: juuri ajelehtii 0,1 yksikköä rannikon suuntaan (suunta jaksosta) ja hieman merelle, ja jäävuori kääntyy
        /// 8°; asento jaksosta (±35°, jotta lohkeava olka on merelle päin). Keinunta: nousu ±0,0025 (6,5 s), kallistus ±2,2°
        /// (8,3 s) ja nyökkäys ±1,6° (7,1 s). Harvinainen: lohkeama 42 %:n kohdalla (natina, kaatuminen saranan ympäri,
        /// putoaminen, roiske, pulpahdus kyljelleen), pala ajelehtii 0,045 ulospäin ja rannikon suuntaan, ja jäävuori
        /// heilahtaa 8 s.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            float suunta = Aikataulu.Arvo(n, 3) < 0.5f ? 1f : -1f, u = s / pituus;
            roottori.localPosition = new Vector3(-0.09f + (Aikataulu.Arvo(n, 4) - 0.5f) * 0.02f - 0.01f * u, 0f, suunta * 0.1f * (u - 0.5f));
            roottori.localRotation = Quaternion.Euler(0f, (Aikataulu.Arvo(n, 5) - 0.5f) * 70f + suunta * 8f * u, 0f);

            var vuori = lapset[0];
            var pala = lapset[Lapsia];
            var roiske = lapset[Lapsia + Lapsia2];
            float jalkeen = harv ? s - 0.42f * pituus : -1000f;
            float isku = jalkeen - Kaatuu - Putoaa;   // aika palan osumasta veteen
            // Keinunta; lohkeaman jälkeen keventynyt jäävuori heilahtaa (vaimeneva 8 s) ja kallistuu läntinen olka ylös.
            float heilahdus = isku > 0f ? (1f - MeriGeometria.Pehmea(isku / 8f)) : 0f;
            float kevennys = isku > 0f ? MeriGeometria.Pehmea(isku / 3f) : 0f;
            float by = 0.0025f * Mathf.Sin(s * 0.967f) + 0.0015f * kevennys;
            float kallistus = 2.2f * Mathf.Sin(s * 0.757f + 1f) + 5f * heilahdus * Mathf.Sin(isku * 3.1f) - 2f * kevennys;
            float nyokkays = 1.6f * Mathf.Sin(s * 0.885f + 0.4f) + 1.5f * heilahdus * Mathf.Sin(isku * 2.3f + 1f);
            var asento = Quaternion.Euler(nyokkays, 0f, kallistus);
            var paikka = new Vector3(0f, by, 0f);
            vuori.localPosition = paikka;
            vuori.localRotation = asento;
            vuori.localScale = Vector3.one;

            // Lohkeava huippu: kiinni olalla (natina viimeiset 0,6 s), kaatuu saranan ympäri ulospäin, putoaa ja kelluu.
            var kiinni = paikka + asento * Kiinni;
            var kiinniAsento = asento * KiinniAsento;
            roiske.localScale = Vector3.zero;
            if (jalkeen < 0f)
            {
                float nat = jalkeen > -Natina ? 1.5f * Mathf.Sin(jalkeen * 31f) * MeriGeometria.Pehmea((jalkeen + Natina) / Natina) : 0f;
                pala.localPosition = kiinni;
                pala.localRotation = kiinniAsento * Quaternion.Euler(0f, 0f, nat);
                pala.localScale = Vector3.one;
                return;
            }
            // Kaatuminen: kulma kasvaa kiihtyen 0 → 80° (sarana pysyy paikallaan), sitten putoaminen veteen 110°:een.
            Vector3 p; Quaternion q;
            if (jalkeen < Kaatuu)
            {
                float k = jalkeen / Kaatuu;
                var kaato = Quaternion.Euler(0f, 0f, 80f * k * k);
                q = kiinniAsento * kaato;
                p = kiinni + kiinniAsento * (Sarana - kaato * Sarana);
            }
            else
            {
                // Lähtökohta (kaatumisen loppu) ja veteenosumakohta ulompana; pudotus painovoimalla.
                var kaato = Quaternion.Euler(0f, 0f, 80f);
                var lahto = kiinni + kiinniAsento * (Sarana - kaato * Sarana);
                var ulos = asento * (KiinniAsento * new Vector3(-1f, 0f, 0f));
                var osuma = new Vector3(Kiinni.x - 0.03f, 0f, Kiinni.z) + new Vector3(ulos.x, 0f, ulos.z) * 0.01f;
                var suuntaUlos = new Vector3(-0.6f, 0f, 0.8f * suunta);
                if (isku < 0f)
                {
                    float k = (jalkeen - Kaatuu) / Putoaa;
                    p = Vector3.Lerp(lahto, osuma, k);
                    p.y = Mathf.Lerp(lahto.y, -0.01f, k * k);
                    q = asento * Quaternion.Euler(4f * (1f - k), 25f, 95f + 15f * k);
                }
                else
                {
                    // Pinnalla: pulpahdus (pohja −0,01 → 0 yliheilahtaen), kyljellään kelluen keinuu ja ajelehtii ulospäin.
                    float nousu = MeriGeometria.Pehmea(isku / Pulpahdus);
                    float keinu = 6f * (1f - MeriGeometria.Pehmea(isku / 5f)) * Mathf.Sin(isku * 4.2f) + 2f * Mathf.Sin(s * 1.3f);
                    p = osuma + suuntaUlos * (Ajelehtii * MeriGeometria.Pehmea(isku / 14f));
                    p.y = -0.01f + 0.01f * nousu + 0.003f * (1f - nousu) * Mathf.Sin(isku * 7f) + 0.0012f * Mathf.Sin(s * 1.7f);
                    q = Quaternion.Euler(0f, 25f + 20f * MeriGeometria.Pehmea(isku / 20f), Mathf.Lerp(110f, 96f, nousu) + keinu);
                    // Roiske: kruunu 0,8 s, sitten litteä vaahtorengas palan ympärillä.
                    float ika = isku / 0.8f;
                    if (ika < 1f)
                    {
                        float levea = Mathf.Lerp(1.4f * (0.6f + 0.7f * MeriGeometria.Pehmea(ika / 0.45f)), 1.1f, MeriGeometria.Pehmea((ika - 0.6f) / 0.4f));
                        float korkea = 1.4f * MeriGeometria.Pehmea(ika / 0.15f) * (1f - MeriGeometria.Pehmea((ika - 0.25f) / 0.75f));
                        roiske.localScale = new Vector3(levea, Mathf.Max(0.12f, korkea), levea);
                    }
                    else roiske.localScale = new Vector3(1.1f, 0.12f, 1.1f);
                    roiske.localPosition = new Vector3(p.x, 0f, p.z);
                    roiske.localRotation = Quaternion.Euler(0f, 15f + 10f * isku, 0f);
                }
            }
            pala.localPosition = p;
            pala.localRotation = q;
            pala.localScale = Vector3.one;
        }
    }
}
