using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Meren koristeet, laji 7: lokkiparvi (kaikki meret). Viisi lokkia kaartelee väljänä parvena samaan suuntaan omilla
    /// soikeilla kierroksillaan (säde rannikon suuntaan 0,08–0,11, merelle 0,045–0,065, kierros 5–6,6 s, korkeus 0,04–0,09),
    /// räpyttelee välillä ja liitää kallistuen kaarteeseen; varjo pinnalla kertoo korkeuden. Lopuksi lokit irtoavat
    /// vuorollaan kierrokselta ja liitävät loivasti alas väljään lauttaan parven keskelle, nostavat siivet laskeutuessaan
    /// (pieni vaahtorengas), taittavat ne selälleen ja kelluvat keinuen nokka tuuleen. Näytös 12–20 s, tauko 40–120 s.
    /// Harvinainen (noin 1/10): lokit syöksyvät vuorotellen kalaan siivet taakse vedettyinä, roiske nousee, lokki katoaa
    /// hetkeksi pinnan alle ja pulpahtaa kellumaan. Juuri pysyy parven keskellä.
    /// Lapset: 0–4 rungot varjoineen, 5–9 siivet, 10–14 roiskeet.
    /// </summary>
    public static class MeriLokit
    {
        public const string Nimi = "lokit";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri", "itameri", "jaameri" };
        /// <summary>Lokin siipiväli 0,047 yksikköä → noin 12 pt ja parvi kierroksillaan noin 0,25 × 0,15 → 60 × 40 pt (valaan mittakaava).</summary>
        public const float KokoPt = 250f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(929, 12f, 20f, 40f, 120f);
        public const int Lapsia = 5, Lapsia2 = 5, Lapsia3 = 5;

        /// <summary>Kylmä valkoinen runko, harmaa selkä ja siivet, tummat siivenkärjet (harmaalokki); ei aksenttia.</summary>
        static readonly Color Valkoinen = new Color(0.96f, 0.96f, 0.94f, 1f), Harmaa = MalliVarit.Hex(0x99a09d), Karki = MalliVarit.Hex(0x363c3c);
        static readonly Color Roiskevari = new Color(0.99f, 1f, 1f, 1f);

        // Liito alas, siipien taitto, syöksy, pinnan alla ja kelluvan kääntyminen tuuleen (s); roiskeen ja renkaan elinaika.
        const float Liito = 1.8f, Taitto = 0.35f, Syoksy = 0.5f, Pinnalla = 0.55f, Kaanto = 1.6f;
        const float RoiskeIka = 0.55f, RengasIka = 0.7f;
        /// <summary>Laskeutumispaikat parven keskeltä (väljä lautta, lokit eivät osu päällekkäin; ±0,008 jaksosta).</summary>
        static readonly float[] LauttaX = { -0.026f, 0.012f, -0.03f, 0.018f, -0.012f }, LauttaZ = { 0.05f, 0.018f, -0.012f, -0.036f, -0.066f };
        /// <summary>Rungon korkeus siipien tyven yläpuolella (siiven olka 0,0012), jotta valkoinen runko peittää tyven.</summary>
        const float RunkoYlla = 0.0018f, VarjoY = 0.0004f;

        public static Mesh Roottori() => HoyryGeometria.Joki();

        /// <summary>
        /// Runko ja varjo (6 kolmiota) samassa verkossa: litteä valkoinen vinoneliörunko (2) pää edellä korkeudella y = 1 ja
        /// pehmeä varjo (4) pinnalla (y = 0, tumma keskeltä alfa 0,2, häipyy reunoille). Animaatio skaalaa y:n
        /// lentokorkeudeksi, joten varjo pysyy pinnalla lokin alla ja kelluvalla lokilla siitä tulee tumma reunus. Lokki on
        /// runko ja siivet yhteensä 8 kolmiota. Origo pinnalla, +z eteen.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MalliRakenne();
            Color keski = MalliVarit.Hex(0x4e4a3c), reuna = keski;
            keski.a = 0.2f; reuna.a = 0f;
            Vector3[] k = { new Vector3(0.017f, 0f, -0.003f), new Vector3(0f, 0f, 0.008f), new Vector3(-0.017f, 0f, -0.003f), new Vector3(0f, 0f, -0.009f) };
            for (int i = 0; i < 4; i++) Ylos(r, Vector3.zero, k[i], k[(i + 1) % 4], keski, reuna, reuna);
            Vector3 paa = new Vector3(0f, 1f, 0.0135f), pyrsto = new Vector3(0f, 1f, -0.0115f);
            Vector3 olkaO = new Vector3(0.0045f, 1f, 0.001f), olkaV = new Vector3(-0.0045f, 1f, 0.001f);
            Ylos(r, paa, olkaO, olkaV, Valkoinen, Valkoinen, Valkoinen);
            Ylos(r, olkaV, olkaO, pyrsto, Valkoinen, Valkoinen, Valkoinen);
            return r.Mesh("Meri: lokin runko ja varjo");
        }

        /// <summary>
        /// Siivet (6 kolmiota) M-muotoisina: kyynärvarsi nousee olalta ranteeseen ja käsisiipi laskee taaksepäin tummaan
        /// kärkeen (kärkiväri). Siipiväli 0,047. Räpyttely skaalaa y:tä (M kääntyy V:ksi ja alas), taitto x:ää.
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MalliRakenne();
            foreach (float puoli in new[] { -1f, 1f })
            {
                Vector3 olkaE = new Vector3(0.0022f * puoli, 0.0012f, 0.0045f), olkaT = new Vector3(0.0022f * puoli, 0.0012f, -0.0045f);
                Vector3 ranneE = new Vector3(0.0125f * puoli, 0.0048f, 0.0040f), ranneT = new Vector3(0.0118f * puoli, 0.0048f, -0.0052f);
                Vector3 karki = new Vector3(0.0235f * puoli, 0.0012f, -0.0105f);
                Ylos(r, olkaE, ranneE, ranneT, Harmaa, Harmaa, Harmaa);
                Ylos(r, olkaE, ranneT, olkaT, Harmaa, Harmaa, Harmaa);
                Ylos(r, ranneE, karki, ranneT, Harmaa, Karki, Color.Lerp(Harmaa, Karki, 0.35f));
            }
            return r.Mesh("Meri: lokin siivet");
        }

        /// <summary>Roiske (6 kolmiota): kuuden piikin kruunu; syöksyssä korkea, laskeutumisessa litteä vaahtorengas.</summary>
        public static Mesh Lapsi3()
        {
            var r = new MalliRakenne();
            Color piikki = Roiskevari; piikki.a = 0.95f;
            for (int i = 0; i < 6; i++)
            {
                float a = (i + 0.5f) * Mathf.PI / 3f, d = 0.34f;
                Vector3 b0 = new Vector3(Mathf.Cos(a - d) * 0.006f, 0.0005f, Mathf.Sin(a - d) * 0.006f);
                Vector3 b1 = new Vector3(Mathf.Cos(a + d) * 0.006f, 0.0005f, Mathf.Sin(a + d) * 0.006f);
                Vector3 kk = new Vector3(Mathf.Cos(a) * 0.0115f, 0.011f, Mathf.Sin(a) * 0.0115f);
                r.Kolmio(b0, kk, b1, piikki);
            }
            return r.Mesh("Meri: lokin roiske");
        }

        /// <summary>Kolmio kärkikohtaisin värein, normaali ylös (siivet, runko, varjo).</summary>
        static void Ylos(MalliRakenne r, Vector3 a, Vector3 b, Vector3 c, Color ca, Color cb, Color cc)
        {
            var n = Vector3.Cross(b - a, c - a).normalized;
            if (n.y < 0f) { var v = b; b = c; c = v; var cv = cb; cb = cc; cc = cv; n = -n; }
            int k = r.P.Count;
            r.P.Add(a); r.P.Add(b); r.P.Add(c);
            r.N.Add(n); r.N.Add(n); r.N.Add(n);
            r.C.Add(ca); r.C.Add(cb); r.C.Add(cc);
            r.T.Add(k); r.T.Add(k + 1); r.T.Add(k + 2);
        }

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : MeriGeometria.Pehmea(s / 1.5f) * MeriGeometria.Pehmea((pituus - s) / 1.5f);
        }

        /// <summary>
        /// Näytös: kierros jatkuu, kunnes lokin liito alas alkaa (laskeutumiset 0,75 s välein, viimeinen 2,6 s ennen loppua)
        /// tai harvinaisessa syöksy (42 %:n kohdalta alkaen 0,6 s välein). Liito jatkaa kierroksen tangentista kaarena omalle
        /// paikalleen väljään lauttaan ja laskeutuu pehmeästi (kuutio); kelluva lokki taittaa siivet selälleen, kääntyy
        /// tuuleen ja keinuu. Syöksy: nokka alas 70°, siivet taakse, roiske, 0,55 s pinnan alla ja pulpahdus kellumaan
        /// pienen renkaan keskelle.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            roottori.localPosition = new Vector3(-0.09f + (Aikataulu.Arvo(n, 3) - 0.5f) * 0.01f, 0f, (Aikataulu.Arvo(n, 4) - 0.5f) * 0.1f);
            roottori.localRotation = Quaternion.identity;
            float kierros = Aikataulu.Arvo(n, 5) < 0.5f ? 1f : -1f;
            float tuuli = (Aikataulu.Arvo(n, 6) < 0.5f ? 0f : 180f) + (Aikataulu.Arvo(n, 7) - 0.5f) * 50f;

            for (int g = 0; g < Lapsia; g++)
            {
                var runko = lapset[g];
                var siivet = lapset[Lapsia + g];
                var roiske = lapset[Lapsia + Lapsia2 + g];
                // Irtoaminen kierrokselta: syöksyn alku tai laskeutumisliidon alku, kun lokki suuntaa kohti lautan paikkaa.
                float irti = harv ? 0.42f * pituus + g * 0.6f + (Aikataulu.Arvo(n, 70 + g) - 0.5f) * 0.3f
                    : Irrotus(n, g, pituus, kierros);
                float kesto = harv ? Syoksy : Liito;
                var p0 = Lento(n, g, Mathf.Min(s, irti), kierros);
                var v0 = (Lento(n, g, Mathf.Min(s, irti) + 0.04f, kierros) - p0) / 0.04f;
                float suunta0 = Mathf.Atan2(v0.x, v0.z) * Mathf.Rad2Deg;
                var eteen = new Vector3(v0.x, 0f, v0.z);
                float vauhti = eteen.magnitude;
                eteen = vauhti > 1e-5f ? eteen / vauhti : Vector3.forward;
                // Laskeutumisliito: Hermiten kaari kierroksen tangentista lautan paikkaan (lopputangentti 0), suunta kaaren
                // tangentista; kelluva lokki kääntyy siitä tuuleen.
                var alku = new Vector3(p0.x, 0f, p0.z);
                var kohde = harv ? p0 : Lautta(n, Paikka[g]);
                var alkuTangentti = eteen * (vauhti * Liito);

                Vector3 p; float kulku = suunta0, nyokkays = 0f, kallistus = 0f, siipiY = 1f, siipiX = 1f, siipiZ = 1f;
                bool piilossa = false; float taitettu = 0f;
                // Räpyttelyjaksot ja liito vuorotellen; liito alas ja syöksy häivyttävät räpyttelyn pehmeästi pois.
                float rapyta = MeriGeometria.Pehmea(Mathf.Sin(s * 0.9f + g * 1.7f) * 2.5f + 0.3f);
                float lepatus = Mathf.Lerp(1f, 0.45f + 1.35f * Mathf.Sin(s * 14.5f + g * 2f), rapyta);
                float rIka = -1f, rKoko = 0f, rLitteys = 1f; Vector3 rPaikka = Vector3.zero;
                if (s < irti)
                {
                    // Kierros: kallistus kaarteeseen.
                    p = p0;
                    kallistus = kierros * 24f;
                    siipiY = lepatus;
                }
                else if (s < irti + kesto)
                {
                    float u = (s - irti) / kesto;
                    if (!harv)
                    {
                        // Liito alas lautan paikkaan: korkeus kuutiona (pehmeä kosketus), siivet nousevat V:ksi.
                        p = LiitoPiste(alku, alkuTangentti, kohde, u);
                        p.y = p0.y * (1f - 3f * u * u + 2f * u * u * u);
                        kulku = LiitoSuunta(alku, alkuTangentti, kohde, u);
                        kallistus = kierros * 24f * (1f - MeriGeometria.Pehmea(u / 0.3f));
                        nyokkays = -3f * MeriGeometria.Pehmea(u / 0.2f) + 14f * MeriGeometria.Pehmea((u - 0.6f) / 0.4f);
                        siipiY = Mathf.Lerp(lepatus, 1f, MeriGeometria.Pehmea(u / 0.25f)) + 0.7f * MeriGeometria.Pehmea((u - 0.55f) / 0.45f);
                    }
                    else
                    {
                        // Syöksy: lyhyt eteneminen, kiihtyvä pudotus, nokka alas ja siivet taakse.
                        p = p0 + eteen * (0.035f * u);
                        p.y = p0.y * (1f - u * u);
                        kallistus = kierros * 24f * (1f - MeriGeometria.Pehmea(u / 0.25f));
                        nyokkays = -70f * MeriGeometria.Pehmea(u / 0.35f);
                        siipiX = 1f - 0.55f * MeriGeometria.Pehmea(u / 0.4f);
                        siipiY = Mathf.Lerp(lepatus, 0.5f, MeriGeometria.Pehmea(u / 0.4f));
                    }
                }
                else
                {
                    // Pinnalla: laskeutumispaikka (syöksyssä pinnan alla hetki ja pulpahdus hieman edempänä).
                    var loppu = harv ? p0 + eteen * 0.047f : kohde;
                    float laskeutui = harv ? suunta0 : LiitoSuunta(alku, alkuTangentti, kohde, 1f);
                    float pinnalla = s - irti - kesto - (harv ? Pinnalla : 0f);
                    piilossa = pinnalla < 0f;
                    p = new Vector3(loppu.x, 0.0006f * Mathf.Sin(s * 2.1f + g * 1.3f), loppu.z);
                    kulku = laskeutui + (Mathf.Repeat(tuuli - laskeutui + 180f, 360f) - 180f) * MeriGeometria.Pehmea(pinnalla / Kaanto);
                    float keinunta = 2.5f * Mathf.Sin(s * 2.1f + g * 1.3f - 0.8f);
                    // Taitettu: siivet kapeiksi selän päälle (runko näkyy päänä ja pyrstönä), lokki lyhyempi.
                    float taitto = MeriGeometria.Pehmea(pinnalla / Taitto);
                    taitettu = taitto;
                    nyokkays = Mathf.Lerp(harv ? 0f : 11f, keinunta, taitto);
                    siipiX = Mathf.Lerp(harv ? 0.45f : 1f, 0.34f, taitto);
                    siipiY = Mathf.Lerp(harv ? 0.5f : 1.7f, 0.4f, taitto);
                    siipiZ = Mathf.Lerp(1f, 0.85f, taitto);
                    // Roiske syöksyssä (iso kruunu), pulpahdus ja laskeutuminen (litteä rengas).
                    float isku = s - irti - kesto;
                    if (harv && isku < RoiskeIka) { rIka = isku / RoiskeIka; rKoko = 1.35f; rLitteys = 1f; rPaikka = p0 + eteen * 0.035f; }
                    else if (pinnalla >= 0f && pinnalla < RengasIka) { rIka = pinnalla / RengasIka; rKoko = harv ? 0.75f : 0.65f; rLitteys = 0.3f; rPaikka = loppu; }
                }

                if (piilossa) { runko.localScale = Vector3.zero; siivet.localScale = Vector3.zero; }
                else
                {
                    // Runko ja varjo: varjo pinnalla, runko lentokorkeudella (y-skaala); kelluvalla varjosta tulee reunus.
                    float koko = 1f - 0.15f * taitettu;
                    runko.localPosition = new Vector3(p.x, VarjoY, p.z);
                    runko.localRotation = Quaternion.Euler(0f, kulku, 0f);
                    runko.localScale = new Vector3(koko, Mathf.Max(0.0006f, p.y) + RunkoYlla, koko);
                    siivet.localPosition = p + new Vector3(0f, 0.0024f * taitettu, 0f);
                    siivet.localRotation = Quaternion.Euler(0f, kulku, 0f) * Quaternion.Euler(-nyokkays, 0f, kallistus);
                    siivet.localScale = new Vector3(siipiX, siipiY, siipiZ);
                }
                if (rIka >= 0f)
                {
                    float levea = rKoko * (0.6f + 0.7f * MeriGeometria.Pehmea(rIka / 0.45f)) * (1f - MeriGeometria.Pehmea((rIka - 0.55f) / 0.45f));
                    float nousu = rKoko * rLitteys * MeriGeometria.Pehmea(rIka / 0.15f) * (1f - MeriGeometria.Pehmea((rIka - 0.25f) / 0.75f));
                    roiske.localPosition = new Vector3(rPaikka.x, 0f, rPaikka.z);
                    roiske.localRotation = Quaternion.Euler(0f, 25f * g + 20f * rIka, 0f);
                    roiske.localScale = levea > 0.01f ? new Vector3(levea, Mathf.Max(0.05f, nousu), levea) : Vector3.zero;
                }
                else roiske.localScale = Vector3.zero;
            }
        }

        /// <summary>Lautan paikka j (juuren avaruudessa, ±0,008 jaksosta).</summary>
        static Vector3 Lautta(int n, int j) => new Vector3(LauttaX[j] + (Aikataulu.Arvo(n, 80 + j) - 0.5f) * 0.016f, 0f,
            LauttaZ[j] + (Aikataulu.Arvo(n, 85 + j) - 0.5f) * 0.016f);

        static int irtoN = -1;
        static float irtoPituus, parasSumma;
        static readonly float[] Irto = new float[Lapsia];
        static readonly int[] Paikka = new int[Lapsia], Kokeilu = new int[Lapsia];
        static readonly bool[] Varattu = new bool[Lapsia];
        static readonly float[,] PariArvo = new float[Lapsia, Lapsia], PariAika = new float[Lapsia, Lapsia];

        /// <summary>
        /// Laskeutumisliidon alku ja lautan paikka lokille g: kullekin lokin ja paikan parille haetaan irtoamishetki
        /// (nimellisesti 0,75 s välein, viimeinen kosketus 2,6 s ennen loppua; 2,5 s aiemmin … 0,4 s myöhemmin), jolloin
        /// suora hidastuva liito päättyisi lähimmäs paikkaa, ja paikat jaetaan niin, että liidot taipuvat yhteensä vähiten
        /// (kaikki 120 järjestystä), joten mikään lokki ei käänny jyrkästi. Lasketaan kerran näytöstä kohden (ei allokaatiota).
        /// </summary>
        static float Irrotus(int n, int g, float pituus, float kierros)
        {
            if (n != irtoN || pituus != irtoPituus)
            {
                irtoN = n; irtoPituus = pituus;
                for (int k = 0; k < Lapsia; k++)
                {
                    float nimellinen = pituus - 2.6f - (Lapsia - 1 - k) * 0.75f - Liito;
                    for (int j = 0; j < Lapsia; j++) { PariArvo[k, j] = -1e9f; PariAika[k, j] = nimellinen; }
                    for (float d = -0.4f; d <= 2.5f; d += 0.05f)
                    {
                        float ti = nimellinen - d;
                        // Luonteva laskeutumispaikka: suora hidastuva liito päättyy kolmanneksen päähän alkutangentista.
                        var a = Lento(n, k, ti, kierros);
                        var v = (Lento(n, k, ti + 0.04f, kierros) - a) / 0.04f;
                        var luonteva = new Vector3(a.x + v.x * Liito / 3f, 0f, a.z + v.z * Liito / 3f);
                        for (int j = 0; j < Lapsia; j++)
                        {
                            float arvo = -(Lautta(n, j) - luonteva).magnitude - 0.004f * Mathf.Abs(d);
                            if (arvo > PariArvo[k, j]) { PariArvo[k, j] = arvo; PariAika[k, j] = ti; }
                        }
                    }
                }
                parasSumma = -1e9f;
                for (int j = 0; j < Lapsia; j++) Varattu[j] = false;
                Jaa(0, 0f);
                for (int k = 0; k < Lapsia; k++) Irto[k] = PariAika[k, Paikka[k]];
            }
            return Irto[g];
        }

        /// <summary>Paikkojen jako lokeille k… (rekursio vapaiden paikkojen yli; paras summa talteen).</summary>
        static void Jaa(int k, float summa)
        {
            if (k == Lapsia)
            {
                if (summa > parasSumma) { parasSumma = summa; for (int i = 0; i < Lapsia; i++) Paikka[i] = Kokeilu[i]; }
                return;
            }
            for (int j = 0; j < Lapsia; j++)
            {
                if (Varattu[j]) continue;
                Varattu[j] = true; Kokeilu[k] = j;
                Jaa(k + 1, summa + PariArvo[k, j]);
                Varattu[j] = false;
            }
        }

        /// <summary>Laskeutumisliidon piste: Hermiten kaari alusta (tangentti) kohteeseen (lopputangentti 0), u 0–1.</summary>
        static Vector3 LiitoPiste(Vector3 alku, Vector3 alkuTangentti, Vector3 kohde, float u)
        {
            u = Mathf.Clamp01(u);
            return alku * (2f * u * u * u - 3f * u * u + 1f) + alkuTangentti * (u * u * u - 2f * u * u + u) + kohde * (3f * u * u - 2f * u * u * u);
        }

        /// <summary>
        /// Laskeutumisliidon suunta (astetta) kaaren keskierotuksesta (ikkuna 0,15): alussa kierroksen suunta, ja 0,6:n
        /// jälkeen suunta pysyy, kun vauhti on jo pieni (kaaren loppu voisi koukata, kun tangentti häviää kosketuksessa).
        /// </summary>
        static float LiitoSuunta(Vector3 alku, Vector3 alkuTangentti, Vector3 kohde, float u)
        {
            u = Mathf.Min(u, 0.6f);
            var d = LiitoPiste(alku, alkuTangentti, kohde, u + 0.075f) - LiitoPiste(alku, alkuTangentti, kohde, u - 0.075f);
            return Mathf.Atan2(d.x, d.z) * Mathf.Rad2Deg;
        }

        /// <summary>
        /// Lokin paikka kierroksella hetkellä s (juuren avaruudessa): oma keskipiste, säde (vaihtelee ±10 %, rannikon
        /// suuntaan 1,75-kertainen), kierrosaika ja vaihe jaksosta; korkeus aaltoilee hitaasti. Kaikki kiertävät samaan
        /// suuntaan (kierros ±1).
        /// </summary>
        static Vector3 Lento(int n, int g, float s, float kierros)
        {
            // Soikea kierros rannikon suuntaan (z) venytettynä, jotta parvi pysyy merellä (x −0,16…−0,02).
            float sade = (0.045f + 0.02f * Aikataulu.Arvo(n, 10 + g)) * (1f + 0.1f * Mathf.Sin(s * 0.6f + g * 1.1f));
            float aika = 5f + 1.6f * Aikataulu.Arvo(n, 20 + g);
            float kulma = g * 1.2566f + Aikataulu.Arvo(n, 30 + g) * 0.8f + kierros * 2f * Mathf.PI * s / aika;
            float cx = (Aikataulu.Arvo(n, 40 + g) - 0.5f) * 0.02f, cz = (Aikataulu.Arvo(n, 50 + g) - 0.5f) * 0.06f;
            float h = 0.05f + 0.028f * Aikataulu.Arvo(n, 60 + g) + 0.012f * Mathf.Sin(s * 0.8f + g * 2f);
            return new Vector3(cx + sade * Mathf.Cos(kulma), h, cz + 1.75f * sade * Mathf.Sin(kulma));
        }
    }
}
