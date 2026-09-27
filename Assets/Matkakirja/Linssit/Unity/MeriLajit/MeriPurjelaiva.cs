using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MEREN KORISTE: PURJELAIVA (parkki) uudella laatutasolla (omistaja 27.9.2026: "Nuo voisi tehdä korkeammalla laadulla";
    /// speksi docs/raportit/meri-laatu-speksi-20260927.md). Korvaa vanhan MeriPurjelaivan samalla nimellä, aikataululla
    /// (siemen 913), reitillä ja puuskilla; verkot MeriRakentajalla MeriMalli-varjostimelle (ramppi, viiri korostuksena).
    ///
    /// Siluetti: kolme mastoa; keula- ja isomastossa neljä raakapurjetta päällekkäin (alapurje, märssy, prammi, bramsegeli),
    /// kaarevina (vatsa eteen ja suojan puolelle, syvimmillään 35 % alas) ja brassattuina 30° kierteellä −5/0/+5/+10°
    /// (alapurje 25°, bramsegeli 40°): ylhäältä purjeet näkyvät ristikkäisenä viuhkana vaaleita kaaria. Mesaanissa
    /// kahvelipurje puomeineen, keulapuomilla ja halkaisijapuomilla kolme porrastettua halkaisijaa. Seisova köysistö
    /// (ala- ja märssyvantit, päästagit, halkaisijastagit, vesipuomin köydet) ohuina kolmisivuisina tankoina ilman
    /// ääriviivaa, jokainen pää kiinni rungossa, mastossa, tasanteella tai puomissa. Runko: kaareva kansilinja, kalteva
    /// keulavarsi, pyöreä peräkaari, tumma kylki ja paperinen tykkiporttiraita maalattuine portteineen, vaalea kansi,
    /// kansirakennus, peräkajuutta ja luukut. Ainoa korostus on punainen viiri isomaston huipussa. Vesikerros verkkojen
    /// alussa: pehmeä varjo, Kelvinin kiila (±19,5°), poikittaiset aallot ja perän vana.
    /// Ääriviiva (1,2 pt) rungolle ja purjeille (raakapurjepino yhtenä osana, jottei jokaisen purjeen alle jää tummaa
    /// haamua); köydet ja puut pätkitään ääriviivarajan alle.
    ///
    /// Lapset (ElavatElementitin LapsetOmaanPisteeseen pitää lapsen vesipisteen (x, z) kallistamattomana, joten kaikki
    /// lapset ovat roottorin origossa x = z = 0 eivätkä irtoa laivasta liioitellussa perspektiivissä):
    ///   0 isomaston raakapurjeet (isomasto on origossa): brassi, vatsa z-skaalalla (puuskat, harvinaisessa täysi) ja
    ///     lepatus (tyvenessä eniten);
    ///   1 keulakuohu (vesikerros ensin), halkaisijat, kahvelipurje ja viiri: täyttyminen ja lepatus x-skaalalla (liikit
    ///     ja kuohu keskilinjan molemmin puolin), kuohu hengittää keulan painuessa;
    ///   2 roiskeet (vesikerros): vaakatasossa (keinunta kumottu), x-skaala = määrä (0 = ei näy), y-skaala = nousu.
    /// Keulamaston raakapurjeet ovat roottorissa keskimääräisellä vatsalla (keulamasto ei ole origossa).
    /// +z eteen (keula), +y ylös, meren pinta y = 0; 1 yksikkö = KokoPt pistettä; laiva puomeineen 0,168 yksikköä ≈ 47 pt.
    /// </summary>
    public static class MeriPurjelaiva
    {
        public const string Nimi = "purjelaiva";
        public static readonly string[] Meret = { "valimeri", "atlantti", "pohjanmeri" };
        public const float KokoPt = 280f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(913, 40f, 60f, 40f, 120f);
        public const int Lapsia = 1, Lapsia2 = 1, Lapsia3 = 1;

        // ---- Mitat ----

        /// <summary>Mastojen paikat (isomasto origossa, jotta sen purjelapsi pysyy kiinni liioitellussa perspektiivissä).</summary>
        const float KeulaZ = 0.036f, IsoZ = 0f, MesaaniZ = -0.034f;
        /// <summary>Keulamaston takila isomastoon verrattuna.</summary>
        const float KeulaKoko = 0.94f;
        /// <summary>Raakapuiden brassaus sivutuulessa (tuuli vasemmalta): tuulen puoleinen nokka eteen, vatsa suojaan (+x).</summary>
        const float Brassi = 30f;
        /// <summary>Mastojen kaltevuus taaksepäin (°), perää kohti kasvava.</summary>
        const float KalteusKeula = 1.5f, KalteusIso = 2f, KalteusMesaani = 2.5f;
        /// <summary>Isomaston korkeudet kannesta: märssy (tasanne), märssytangon latva, prammitangon latva ja huippu.</summary>
        const float MarsY = 0.0335f, MarssyLatvaY = 0.0565f, PrammiLatvaY = 0.0725f, HuippuY = 0.0955f;
        /// <summary>Mesaanin korkeudet kannesta: kahvelin kita, märssy ja huippu.</summary>
        const float MesKitaY = 0.037f, MesMarsY = 0.040f, MesHuippuY = 0.066f;
        /// <summary>Ääriviivan raja: osa, jonka vaakasuora puolileveys on tätä pienempi, ei saa ääriviivaa. Köydet ja puut
        /// pätkitään tämän alle (pitkän köyden ääriviiva venyisi kaksoisviivaksi), purjeet ja runko saavat viivan.</summary>
        const float ReunaRaja = 0.010f;
        /// <summary>Köyden säde (≥ 0,0008; kolmisivuinen tanko ≈ 1,1–1,2 px leveä pelikoossa, MSAA pois).</summary>
        const float KoysiSade = 0.00085f;
        /// <summary>Raakapuut ovat maston etupuolella.</summary>
        const float RaakaZ = 0.0018f;

        // ---- Värit: vain ramppi (tila 0) ja viirin punainen (tila 1) ----

        static readonly Color Purje = MeriRakentaja.Rampi(2f);
        static readonly Color Kylki = MeriRakentaja.Rampi(0.45f), Vyo = MeriRakentaja.Rampi(0.35f), Raita = MeriRakentaja.Rampi(1.95f);
        static readonly Color Portti = MeriRakentaja.Rampi(0.2f), Kansi = MeriRakentaja.Rampi(1.25f), Varppeet = MeriRakentaja.Rampi(1.75f);
        static readonly Color Talo = MeriRakentaja.Rampi(1.85f), TaloKatto = MeriRakentaja.Rampi(1.95f), Luukku = MeriRakentaja.Rampi(0.5f);
        static readonly Color MastoVari = MeriRakentaja.Rampi(0.7f), Puu = MeriRakentaja.Rampi(0.4f), Koysivari = MeriRakentaja.Rampi(0.5f);
        static readonly Color Viirivari = MeriRakentaja.Punainen;

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        /// <summary>Kupu sin(πu)^p välillä 0–1 (sin(π) on liukulukuna hieman negatiivinen: Pow antaisi NaN).</summary>
        static float Kupu(float u, float p) => Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * u)), p);

        /// <summary>Kannen korkeus kohdassa z: kaareva kansilinja (keula ja perä koholla).</summary>
        static float KansiY(float z) { float q = (z - 0.002f) / 0.064f; return 0.0098f + 0.0034f * q * q; }
        static float KaideY(float z) => KansiY(z) + 0.0022f;

        /// <summary>Rungon puolileveys kaiteen tasolla: suippo keula (ogiivi) ja pyöreään peräkaareen kapeneva perä.</summary>
        static float Puoli(float z)
        {
            const float B = 0.0145f, zMax = 0.004f, zKeula = 0.066f, zPera = -0.060f;
            if (z >= zMax)
            {
                float q = Mathf.Clamp01((z - zMax) / (zKeula - zMax));
                return B * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(q, 2.2f)), 0.62f);
            }
            float p = Mathf.Clamp01((zMax - z) / (zMax - zPera));
            return B * (1f - 0.40f * Mathf.Pow(p, 2.4f));
        }

        /// <summary>Maston piste korkeudella h kannesta (masto kallistuu taaksepäin).</summary>
        static Vector3 Masto(float z, float kalteus, float h) => new Vector3(0f, KansiY(z) + h, z - h * Mathf.Sin(kalteus * Mathf.Deg2Rad));

        // ---- Mallit ----

        public static Mesh Roottori() => Rakenna(false);

        /// <summary>Kaukotaso (≤ 800 kolmiota): sama siluetti karkeammin, köysistä vain vantit ja päästagit.</summary>
        public static Mesh RoottoriKauko() => Rakenna(true);

        static Mesh Rakenna(bool kauko)
        {
            var r = new MeriRakentaja(ReunaRaja);
            Vesikerros(r, kauko);
            Runko(r, kauko);
            Kansirakenteet(r, kauko);
            Mastot(r, kauko);
            Keulapuomi(r, kauko);
            Raakapurjeet(r, new Vector3(0f, KansiY(KeulaZ), KeulaZ),
                Quaternion.AngleAxis(-KalteusKeula, Vector3.right) * Quaternion.AngleAxis(Brassi, Vector3.up), KeulaKoko, kauko);
            Koydet(r, kauko);
            return r.Verkko(kauko ? "purjelaiva-kauko" : "purjelaiva");
        }

        /// <summary>Isomaston raakapurjeet (lapsi 0): origo maston tyvessä kannella, raakapuut x-suunnassa ja vatsa +z:aan
        /// ennen brassausta; Animoi kallistaa pinon maston mukaan, brassaa ja skaalaa vatsaa z-suunnassa.</summary>
        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja(ReunaRaja);
            Raakapurjeet(r, Vector3.zero, Quaternion.identity, 1f, false);
            return r.Verkko("purjelaiva-raakapurjeet");
        }

        /// <summary>Keulakuohu (vesikerros ensin), halkaisijat, kahvelipurje puomeineen ja viiri (lapsi 1) roottorin
        /// avaruudessa: liikit, nostimet ja kuohu ovat keskilinjan molemmin puolin, joten x-skaala täyttää purjeet suojan
        /// puolelle ja leventää kuohua irrottamatta mitään stageista, mastoista tai rungosta.</summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja(ReunaRaja);
            r.Vesi = true;
            Keulakuohu(r);
            r.Vesi = false;
            Halkaisijat(r);
            Kahvelipurje(r);
            Viiri(r);
            return r.Verkko("purjelaiva-kahvelit");
        }

        /// <summary>Roiskeet (lapsi 2, vesikerros) roottorin avaruudessa: kiekot keulan ympärillä; Animoi skaalaa x:llä
        /// määrää (0 = ei roisketta: kiekot litistyvät viivoiksi) ja y:llä nousua.</summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja(ReunaRaja);
            r.Vesi = true;
            Roiskeet(r);
            r.Vesi = false;
            return r.Verkko("purjelaiva-roiskeet");
        }

        // ---- Vesikerros ----

        /// <summary>Vesikolmio ylöspäin käännettynä, jotta se piirtyy varjostimen Cull-tilasta riippumatta.</summary>
        static void VesiKolmio(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d, Color ca, Color cb, Color cd)
        {
            if (Vector3.Cross(b - a, d - a).y < 0f) r.KolmioVarit(a, d, b, ca, cd, cb);
            else r.KolmioVarit(a, b, d, ca, cb, cd);
        }

        static void VesiNelio(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color ca, Color cb, Color cd, Color ce)
        {
            VesiKolmio(r, a, b, d, ca, cb, cd);
            VesiKolmio(r, a, d, e, ca, cd, ce);
        }

        static Vector3 Sivu(Vector3[] p, int i)
        {
            var t = p[Mathf.Min(i + 1, p.Length - 1)] - p[Mathf.Max(i - 1, 0)];
            return Vector3.Cross(Vector3.up, t).normalized;
        }

        /// <summary>Pehmeäreunainen vaahtonauha pisteketjua pitkin: keskiviivalla alfa, reunoilla 0 (reunat eivät porrastu,
        /// kun MSAA on pois).</summary>
        static void VesiNauha(MeriRakentaja r, Vector3[] p, float[] leveys, float[] alfa, Color vari)
        {
            for (int i = 0; i + 1 < p.Length; i++)
            {
                Vector3 s0 = Sivu(p, i) * (leveys[i] * 0.5f), s1 = Sivu(p, i + 1) * (leveys[i + 1] * 0.5f);
                Color k0 = MeriRakentaja.Alfa(vari, alfa[i]), k1 = MeriRakentaja.Alfa(vari, alfa[i + 1]), nolla = MeriRakentaja.Alfa(vari, 0f);
                VesiNelio(r, p[i] - s0, p[i], p[i + 1], p[i + 1] - s1, nolla, k0, k1, nolla);
                VesiNelio(r, p[i], p[i] + s0, p[i + 1] + s1, p[i + 1], k0, nolla, nolla, k1);
            }
        }

        /// <summary>
        /// Vesikerros roottorin alkuun: pehmeä varjo (alfa 0,17 → 0, hieman suojan puolelle ja perään, jonne laiva kallistuu;
        /// Animoi ei tiedä kartan ilmansuuntia, joten "kaakko" on laivan omassa avaruudessa), Kelvinin kiila perän olkapäistä
        /// ±19,5°, kaksi poikittaista aaltoa kiilan sisällä ja perän pyörteinen vana. Kaikki häipyvät taaksepäin.
        /// </summary>
        static void Vesikerros(MeriRakentaja r, bool kauko)
        {
            r.Vesi = true;
            var varjo = MeriRakentaja.VarjoVari;
            var vaahto = MeriRakentaja.Vaahto;
            const float y = 0.0010f;
            r.Soikio(new Vector3(0.0035f, 0.0003f, -0.004f), 0.024f, 0.074f, varjo, 0.17f, 0f, kauko ? 12 : 20);
            float kiila = 19.5f * Mathf.Deg2Rad;
            int n = kauko ? 3 : 5;
            for (int k = 0; k < 2; k++)
            {
                float puoli = k == 0 ? -1f : 1f;
                var alku = new Vector3(0.0105f * puoli, y, -0.050f);
                var suunta = new Vector3(Mathf.Sin(kiila) * puoli, 0f, -Mathf.Cos(kiila));
                var p = new Vector3[n]; var l = new float[n]; var a = new float[n];
                for (int i = 0; i < n; i++)
                {
                    float q = i / (n - 1f);
                    p[i] = alku + suunta * (0.15f * q);
                    l[i] = Mathf.Lerp(0.004f, 0.016f, q);
                    a[i] = 0.62f * (1f - q) * (1f - q * 0.3f);
                }
                VesiNauha(r, p, l, a, vaahto);
            }
            // Perän vana: leveä ja himmeä, häipyy nopeasti.
            VesiNauha(r, new[] { new Vector3(0f, y, -0.056f), new Vector3(0f, y, -0.090f), new Vector3(0f, y, -0.140f) },
                new[] { 0.012f, 0.020f, 0.026f }, new[] { 0.42f, 0.22f, 0f }, vaahto);
            if (kauko) { r.Vesi = false; return; }
            // Poikittaiset aallot: kaaret kiilan sisällä (kovera laivaan päin), päissä himmeämmät.
            for (int j = 0; j < 2; j++)
            {
                float z0 = -0.090f - 0.045f * j, puoliLeveys = (0.0105f + Mathf.Sin(kiila) / Mathf.Cos(kiila) * (-z0 - 0.050f)) * 0.92f;
                var p = new Vector3[5]; var l = new float[5]; var a = new float[5];
                for (int i = 0; i < 5; i++)
                {
                    float u = i / 4f * 2f - 1f;
                    p[i] = new Vector3(u * puoliLeveys, y, z0 + 0.012f * u * u);
                    l[i] = 0.0035f;
                    a[i] = (j == 0 ? 0.30f : 0.20f) * (1f - 0.55f * u * u);
                }
                VesiNauha(r, p, l, a, vaahto);
            }
            r.Vesi = false;
        }

        // ---- Runko ----

        static readonly float[] Asemat = { 0.060f, 0.052f, 0.042f, 0.030f, 0.016f, 0f, -0.016f, -0.030f, -0.042f, -0.052f, -0.060f };
        static readonly float[] AsematKauko = { 0.056f, 0.040f, 0.016f, -0.016f, -0.042f, -0.060f };
        const float KeulaKarkiZ = 0.066f, PeraPullistus = 0.0035f;

        /// <summary>Rungon ääriviiva ylhäältä kaiteen tasolla (x, z): keulan kärki, oikea kylki keulasta perään, peräkaari
        /// ja vasen kylki perästä keulaan (myötäpäivään ylhäältä katsottuna).</summary>
        static Vector2[] Silmukka(bool kauko, out int asemia, out int kaaria)
        {
            var a = kauko ? AsematKauko : Asemat;
            asemia = a.Length; kaaria = kauko ? 1 : 3;
            var p = new Vector2[1 + 2 * asemia + kaaria];
            int k = 0;
            p[k++] = new Vector2(0f, KeulaKarkiZ);
            for (int i = 0; i < asemia; i++) p[k++] = new Vector2(Puoli(a[i]), a[i]);
            float xs = Puoli(a[asemia - 1]), zs = a[asemia - 1];
            for (int i = 1; i <= kaaria; i++) { float q = Mathf.PI * i / (kaaria + 1); p[k++] = new Vector2(xs * Mathf.Cos(q), zs - PeraPullistus * Mathf.Sin(q)); }
            for (int i = asemia - 1; i >= 0; i--) p[k++] = new Vector2(-Puoli(a[i]), a[i]);
            return p;
        }

        /// <summary>
        /// Runko yhtenä ääriviivaosana: kyljet (kaide → valurima → raita → vesiraja, kylki kallistuu sisään ylöspäin, joten
        /// raita katsoo hieman ylös), varppeiden sisäpinta ja kansi. Tykkiporttiraita paperina tummassa kyljessä ja portit
        /// erillisinä pieninä neliöinä raidan päällä (ei ääriviivaa).
        /// </summary>
        static void Runko(MeriRakentaja r, bool kauko)
        {
            var p = Silmukka(kauko, out int asemia, out int kaaria);
            int m = p.Length;
            var reuna = new Vector3[m]; var karki = new Vector3[m];
            for (int i = 0; i < m; i++) { var e = p[(i + 1) % m] - p[i]; reuna[i] = new Vector3(-e.y, 0f, e.x).normalized; }
            for (int i = 0; i < m; i++) karki[i] = (reuna[(i + m - 1) % m] + reuna[i]).normalized;
            var r0 = new Vector3[m]; var r1 = new Vector3[m]; var r2 = new Vector3[m]; var r3 = new Vector3[m]; var kansi = new Vector3[m];
            for (int i = 0; i < m; i++)
            {
                float x = p[i].x, z = p[i].y, yk = KaideY(z);
                r0[i] = new Vector3(x, yk, z);
                r1[i] = r0[i] + karki[i] * 0.0003f - Vector3.up * 0.0010f;
                r2[i] = r0[i] + karki[i] * 0.0010f - Vector3.up * 0.0048f;
                r3[i] = new Vector3(x * 0.965f, -0.0004f, z * 0.905f);
                kansi[i] = new Vector3(x, KansiY(z), z) - karki[i] * 0.0009f;
            }
            r.AloitaOsa();
            for (int i = 0; i < m; i++)
            {
                int j = (i + 1) % m;
                var ulos = reuna[i];
                if (kauko) r.NelioUlos(r0[i], r0[j], r2[j], r2[i], ulos, Raita);
                else
                {
                    r.NelioUlos(r0[i], r0[j], r1[j], r1[i], ulos, Vyo);
                    r.NelioUlos(r1[i], r1[j], r2[j], r2[i], ulos, Raita);
                }
                r.NelioUlos(r2[i], r2[j], r3[j], r3[i], ulos, Kylki);
                // Varppeiden sisäpinta (kaiteelta kannelle), näkyy ylhäältä vaaleana reunuksena.
                r.NelioUlos(r0[i], r0[j], kansi[j], kansi[i], Vector3.up - ulos, Varppeet);
            }
            // Kansi: kaistat asemittain, keulan kärki kolmiona ja peräkaari viuhkana.
            int vasen(int i) => m - i;   // oikean aseman i (1..asemia) peilipari vasemmalla
            r.KolmioUlos(kansi[0], kansi[1], kansi[vasen(1)], Vector3.up, Kansi);
            for (int i = 1; i < asemia; i++) r.NelioUlos(kansi[i], kansi[i + 1], kansi[vasen(i + 1)], kansi[vasen(i)], Vector3.up, Kansi);
            var keski = (kansi[asemia] + kansi[asemia + kaaria + 1]) * 0.5f;
            for (int i = asemia; i <= asemia + kaaria; i++) r.KolmioUlos(keski, kansi[i], kansi[i + 1], Vector3.up, Kansi);
            r.LopetaOsa();
            if (kauko) return;
            // Maalatut tykkiportit raidan päällä molemmin puolin.
            for (int k = 0; k < 2; k++)
            {
                float s = k == 0 ? 1f : -1f;
                for (int i = 0; i < 9; i++)
                {
                    float z = -0.044f + 0.011f * i, z0 = z - 0.0021f, z1 = z + 0.0021f;
                    float yk = KaideY(z), y0 = yk - 0.0039f, y1 = yk - 0.0019f;
                    float x0 = s * (Puoli(z0) + 0.0009f), x1 = s * (Puoli(z1) + 0.0009f);
                    r.NelioUlos(new Vector3(x0, y0, z0), new Vector3(x1, y0, z1), new Vector3(x1, y1, z1), new Vector3(x0, y1, z0), new Vector3(s, 0f, 0f), Portti);
                }
            }
        }

        /// <summary>Kansirakennus keula- ja isomaston välissä, peräkajuutta ja kaksi luukkua (pieniä: ei ääriviivaa).</summary>
        static void Kansirakenteet(MeriRakentaja r, bool kauko)
        {
            r.Laatikko(new Vector3(0f, KansiY(0.018f), 0.018f), new Vector3(0.011f, 0.0042f, 0.013f), Talo, TaloKatto);
            r.Laatikko(new Vector3(0f, KansiY(-0.049f), -0.049f), new Vector3(0.0135f, 0.0034f, 0.011f), Talo, Kansi);
            if (kauko) return;
            r.Laatikko(new Vector3(0f, KansiY(0.050f), 0.050f), new Vector3(0.0062f, 0.0011f, 0.0062f), Luukku, Luukku);
            r.Laatikko(new Vector3(0f, KansiY(-0.017f), -0.017f), new Vector3(0.0068f, 0.0011f, 0.0085f), Luukku, Luukku);
        }

        // ---- Mastot, puut ja köysistö ----

        static void Mastot(MeriRakentaja r, bool kauko)
        {
            int sivut = kauko ? 3 : 5;
            for (int k = 0; k < 2; k++)
            {
                float z = k == 0 ? KeulaZ : IsoZ, kal = k == 0 ? KalteusKeula : KalteusIso, s = k == 0 ? KeulaKoko : 1f;
                r.Tanko(Masto(z, kal, 0f), Masto(z, kal, (MarsY + 0.003f) * s), 0.0014f, 0.0012f, sivut, MastoVari);
                r.Tanko(Masto(z, kal, MarsY * s - 0.002f), Masto(z, kal, MarssyLatvaY * s + 0.002f), 0.0010f, 0.0008f, sivut, MastoVari);
                r.Tanko(Masto(z, kal, MarssyLatvaY * s - 0.002f), Masto(z, kal, HuippuY * s), 0.0007f, 0.0005f, sivut, MastoVari);
                if (kauko) continue;
                // Märssy (tasanne) ja saalingit tummina viivoina.
                r.Laatikko(Masto(z, kal, MarsY * s) + new Vector3(0f, 0f, -0.0006f), new Vector3(0.0078f * s, 0.0006f, 0.0056f * s), Puu, Puu);
                r.Laatikko(Masto(z, kal, MarssyLatvaY * s), new Vector3(0.0070f * s, 0.0004f, 0.0012f), Puu, Puu);
            }
            r.Tanko(Masto(MesaaniZ, KalteusMesaani, 0f), Masto(MesaaniZ, KalteusMesaani, MesMarsY + 0.003f), 0.0012f, 0.0010f, sivut, MastoVari);
            r.Tanko(Masto(MesaaniZ, KalteusMesaani, MesMarsY - 0.002f), Masto(MesaaniZ, KalteusMesaani, MesHuippuY), 0.0008f, 0.0005f, sivut, MastoVari);
            if (!kauko) r.Laatikko(Masto(MesaaniZ, KalteusMesaani, MesMarsY), new Vector3(0.0060f, 0.0005f, 0.0045f), Puu, Puu);
        }

        static readonly Vector3 PuomiKansi = new Vector3(0f, 0.0148f, 0.062f), PuomiNokka = new Vector3(0f, 0.0218f, 0.094f);
        static readonly Vector3 HalkaisijaTyvi = new Vector3(0f, 0.0206f, 0.088f), HalkaisijaNokka = new Vector3(0f, 0.0250f, 0.1050f);
        static Vector3 J1 => Vector3.Lerp(HalkaisijaTyvi, HalkaisijaNokka, 0.62f);

        /// <summary>Tanko pätkinä ääriviivarajan alle (puomit ja köydet ovat ohuita: ääriviiva vain venyttäisi ne).</summary>
        static void Patkat(MeriRakentaja r, Vector3 a, Vector3 b, float r0, float r1, int sivut, Color vari, bool paat)
        {
            float vaaka = Mathf.Max(Mathf.Abs(b.x - a.x), Mathf.Abs(b.z - a.z));
            int n = 1 + (int)(vaaka / (1.8f * ReunaRaja));
            for (int i = 0; i < n; i++)
            {
                float q0 = i / (float)n, q1 = (i + 1f) / n;
                r.Tanko(Vector3.Lerp(a, b, q0), Vector3.Lerp(a, b, q1), Mathf.Lerp(r0, r1, q0), Mathf.Lerp(r0, r1, q1), sivut, vari, paat);
            }
        }

        static void Koysi(MeriRakentaja r, Vector3 a, Vector3 b) => Patkat(r, a, b, KoysiSade, KoysiSade, 3, Koysivari, false);

        /// <summary>Keulapuomi, halkaisijapuomi ja vesipuomi (martingaali) köysineen.</summary>
        static void Keulapuomi(MeriRakentaja r, bool kauko)
        {
            Patkat(r, PuomiKansi, PuomiNokka, 0.0013f, 0.0011f, kauko ? 3 : 5, MastoVari, true);
            Patkat(r, HalkaisijaTyvi, HalkaisijaNokka, 0.0009f, 0.0006f, kauko ? 3 : 4, MastoVari, true);
            if (kauko) return;
            var vesipuomi = new Vector3(0f, 0.0140f, 0.0915f);
            r.Tanko(PuomiNokka + new Vector3(0f, -0.0010f, -0.0010f), vesipuomi, 0.0005f, 0.0005f, 3, Puu);
            Koysi(r, HalkaisijaNokka, vesipuomi);
            Koysi(r, vesipuomi, new Vector3(0f, 0.0075f, 0.0622f));   // vesipuomin perääntuki keulavarteen
            Koysi(r, PuomiNokka + new Vector3(0f, -0.0008f, -0.0020f), new Vector3(0f, 0.0015f, 0.0600f));   // vesitaaki
        }

        /// <summary>
        /// Seisova köysistö: alavantit (keula ja iso 2 + 2, mesaani 1 + 1), märssyvantit tasanteen reunalta, päästagit
        /// mastolta mastolle ja keulapuomille sekä halkaisijastagit (perääntuet jätetty pois: ne ristikoivat purjeet).
        /// Kaukotasossa alavantit, päästagit ja halkaisijastagit (halkaisijat lapsessa tarvitsevat stagit).
        /// </summary>
        static void Koydet(MeriRakentaja r, bool kauko)
        {
            for (int k = 0; k < 3; k++)
            {
                float z = k == 0 ? KeulaZ : k == 1 ? IsoZ : MesaaniZ, kal = k == 0 ? KalteusKeula : k == 1 ? KalteusIso : KalteusMesaani;
                float s = k == 0 ? KeulaKoko : 1f;
                float mars = k == 2 ? MesMarsY : MarsY * s;
                var ylos = Masto(z, kal, mars - 0.0008f);
                for (int puoli = -1; puoli <= 1; puoli += 2)
                {
                    int vantteja = k == 2 || kauko ? 1 : 2;
                    for (int v = 0; v < vantteja; v++)
                    {
                        float zc = z - 0.003f - 0.0055f * v;
                        Koysi(r, new Vector3(puoli * (Puoli(zc) + 0.0005f), KaideY(zc) - 0.0015f, zc), ylos + new Vector3(puoli * 0.0011f, 0f, 0f));
                    }
                    if (kauko) continue;
                    // Märssyvantit tasanteen reunalta latvaan.
                    var latva = k == 2 ? Masto(z, kal, MesHuippuY - 0.006f) : Masto(z, kal, MarssyLatvaY * s - 0.001f);
                    float reuna = k == 2 ? 0.0027f : 0.0035f * s;   // tasanteen reunalta (ei tyhjästä)
                    Koysi(r, Masto(z, kal, mars + 0.0004f) + new Vector3(puoli * reuna, 0f, -0.0006f), latva + new Vector3(puoli * 0.0006f, 0f, 0f));
                }
            }
            // Päästagit: keulamastolta keulapuomille, isomastolta keulamastolle, mesaanilta isomastolle.
            Koysi(r, Masto(KeulaZ, KalteusKeula, MarsY * KeulaKoko), new Vector3(0f, 0.0172f, 0.071f));
            Koysi(r, Masto(IsoZ, KalteusIso, MarsY), Masto(KeulaZ, KalteusKeula, 0.004f));
            Koysi(r, Masto(MesaaniZ, KalteusMesaani, MesMarsY), Masto(IsoZ, KalteusIso, 0.016f));
            Koysi(r, StagiF2, PuomiNokka);
            Koysi(r, StagiF3, J1);
            Koysi(r, StagiF4, HalkaisijaNokka);
            if (kauko) return;
            // Märssy-, pramm- ja bramstagit sekä halkaisijastagit (halkaisijat ovat näillä).
            Koysi(r, Masto(IsoZ, KalteusIso, MarssyLatvaY), Masto(KeulaZ, KalteusKeula, MarsY * KeulaKoko + 0.001f));
            Koysi(r, Masto(IsoZ, KalteusIso, PrammiLatvaY), Masto(KeulaZ, KalteusKeula, MarssyLatvaY * KeulaKoko));
            Koysi(r, Masto(IsoZ, KalteusIso, HuippuY - 0.008f), Masto(KeulaZ, KalteusKeula, PrammiLatvaY * KeulaKoko));
            Koysi(r, Masto(MesaaniZ, KalteusMesaani, MesHuippuY - 0.002f), Masto(IsoZ, KalteusIso, MarsY + 0.001f));
        }

        static Vector3 StagiF2 => Masto(KeulaZ, KalteusKeula, MarssyLatvaY * KeulaKoko);
        static Vector3 StagiF3 => Masto(KeulaZ, KalteusKeula, PrammiLatvaY * KeulaKoko);
        static Vector3 StagiF4 => Masto(KeulaZ, KalteusKeula, (HuippuY - 0.008f) * KeulaKoko);

        // ---- Purjeet ----

        /// <summary>Raakapurjeet isomastossa (kannesta, ennen brassausta): yläraa'an korkeus, jaluksen korkeus, puolileveys
        /// ylhäällä ja alhaalla, vatsan syvyys ja kierre (°). Märssyn jalus on alapurjeen raa'alla jne.</summary>
        static readonly float[,] Purjeet =
        {
            { 0.0300f, 0.0075f, 0.0335f, 0.0325f, 0.0130f, -5f },   // alapurje
            { 0.0520f, 0.0300f, 0.0285f, 0.0320f, 0.0123f, 0f },   // märssypurje
            { 0.0685f, 0.0520f, 0.0225f, 0.0275f, 0.0096f, 5f },   // prammipurje
            { 0.0815f, 0.0685f, 0.0170f, 0.0215f, 0.0074f, 10f },   // bramsegeli
        };

        /// <summary>
        /// Raakapurjepino: neljä kaarevaa purjetta (kaksipuoliset kalvot) ja raakapuut. Purjeen vatsa on poikki suunnassa
        /// syvin keskellä ja pystysuunnassa 35 % alas (raa'an ja jaluksen linjalla suora), joten purjeen yläosa katsoo eteen ja
        /// ylös ja alaosa taakse ja ylös: valo luoteesta ja kamera etelästä näkevät pystypinnan aina varjopuolelta, joten vain
        /// jyrkästi kaartuvat kaistat nousevat paperiksi, ja pinossa vuorottelevat valo- ja varjokaistat kuin kaiverruksessa.
        /// Paikallinen piste p muunnetaan kohteeseen: tyvi + asento · kierre · (koko · p).
        /// </summary>
        static void Raakapurjeet(MeriRakentaja r, Vector3 tyvi, Quaternion asento, float koko, bool kauko)
        {
            int nu = kauko ? 3 : 6, nv = kauko ? 2 : 4;
            // Purjeet yhtenä ääriviivaosana: yksi viiva koko pinon ympäri (osittain piirretty viiva teki jokaisen purjeen
            // alle tumman haamun), raakapuut erikseen pätkinä.
            r.AloitaOsa();
            for (int k = 0; k < 4; k++)
            {
                float yY = Purjeet[k, 0], yA = Purjeet[k, 1], lY = Purjeet[k, 2], lA = Purjeet[k, 3], d = Purjeet[k, 4];
                var q = asento * Quaternion.AngleAxis(Purjeet[k, 5], Vector3.up);
                Vector3 Paikka(float u, float v)
                {
                    float x = (2f * u - 1f) * Mathf.Lerp(lY, lA, v), y = Mathf.Lerp(yY, yA, v);
                    // Pystyprofiili: vatsa syvimmillään 35 % alas (v^0,66 vie puolivälin sinne), joten yläosa kaartuu jyrkästi
                    // eteen ja ylös ja alaosa loivemmin takaisin; molemmat kaistat näkyvät 55°:n kamerasta vaaleina.
                    float poikki = Kupu(u, 0.8f), pysty = Kupu(Mathf.Pow(v, 0.66f), 0.85f);
                    return tyvi + q * (new Vector3(x, y, RaakaZ + d * (0.2f + 0.8f * poikki) * pysty) * koko);
                }
                r.Pinta(Paikka, nu, nv, (u, v) => Purje, true);
            }
            r.LopetaOsa();
            for (int k = 0; k < 4; k++)
            {
                float yY = Purjeet[k, 0], lY = Purjeet[k, 2];
                var q = asento * Quaternion.AngleAxis(Purjeet[k, 5], Vector3.up);
                // Raakapuu (tumma, kapenee nokkiin), pätkinä ettei ääriviiva venytä sitä.
                float l = lY + 0.0018f;
                var keski = tyvi + q * (new Vector3(0f, yY + 0.0006f, RaakaZ) * koko);
                for (int puoli = -1; puoli <= 1; puoli += 2)
                    Patkat(r, keski, tyvi + q * (new Vector3(puoli * l, yY + 0.0006f, RaakaZ) * koko), 0.0008f * koko, 0.00055f * koko, kauko ? 3 : 4, Puu, false);
            }
        }

        /// <summary>Halkaisija: kolmio (halssi, nokka stagilla, kulma suojan puolella), vatsa suojaan keskeltä syvin.</summary>
        static void Halkaisija(MeriRakentaja r, Vector3 halssi, Vector3 nokka, Vector3 kulma, float syvyys)
        {
            var n = Vector3.Cross(nokka - halssi, kulma - halssi).normalized;
            if (n.x < 0f) n = -n;
            r.Pinta((u, v) => Vector3.Lerp(Vector3.Lerp(halssi, nokka, u), kulma, v) + n * (syvyys * Mathf.Sin(Mathf.PI * u) * Mathf.Sin(Mathf.PI * v)),
                4, 2, (u, v) => Purje, true);
        }

        static void Halkaisijat(MeriRakentaja r)
        {
            // Keulamärssystaakipurje (sisin), sisähalkaisija ja ulkohalkaisija; kulmat porrastetusti ylemmäs ja suojaan.
            // Porrastettu viuhka: nokat stageilla z 0,060/0,068/0,077 ja kulmat 0,052/0,061/0,070, joten jättöliikit ovat
            // noin 0,009:n välein ja kolme kolmiota erottuvat sivulta omine ääriviivoineen (yhtenä osana ne sulautuivat).
            Halkaisija(r, Vector3.Lerp(PuomiNokka, StagiF2, 0.05f), Vector3.Lerp(PuomiNokka, StagiF2, 0.572f), new Vector3(0.0040f, 0.0215f, 0.052f), 0.0032f);
            Halkaisija(r, Vector3.Lerp(J1, StagiF3, 0.03f), Vector3.Lerp(J1, StagiF3, 0.474f), new Vector3(0.0065f, 0.0235f, 0.061f), 0.0034f);
            Halkaisija(r, Vector3.Lerp(HalkaisijaNokka, StagiF4, 0.03f), Vector3.Lerp(HalkaisijaNokka, StagiF4, 0.394f), new Vector3(0.0090f, 0.0260f, 0.070f), 0.0036f);
        }

        /// <summary>Mesaanin kahvelipurje (spankeri): puomi ja kahveli kääntyneinä suojan puolelle, vatsa suojaan; puomin
        /// nostoköysi mastosta puomin nokkaan (samassa lapsessa, jotta se seuraa puomia).</summary>
        static void Kahvelipurje(MeriRakentaja r)
        {
            float gb = 18f * Mathf.Deg2Rad, gg = 24f * Mathf.Deg2Rad, eb = 3f * Mathf.Deg2Rad, eg = 38f * Mathf.Deg2Rad;
            var puomiKita = Masto(MesaaniZ, KalteusMesaani, 0.009f) + new Vector3(0f, 0f, -0.0012f);
            var kahveliKita = Masto(MesaaniZ, KalteusMesaani, MesKitaY) + new Vector3(0f, 0f, -0.0012f);
            var puomiNokka = puomiKita + new Vector3(Mathf.Sin(gb) * Mathf.Cos(eb), Mathf.Sin(eb), -Mathf.Cos(gb) * Mathf.Cos(eb)) * 0.032f;
            var kahveliNokka = kahveliKita + new Vector3(Mathf.Sin(gg) * Mathf.Cos(eg), Mathf.Sin(eg), -Mathf.Cos(gg) * Mathf.Cos(eg)) * 0.0235f;
            Patkat(r, puomiKita, puomiNokka, 0.0008f, 0.0006f, 4, Puu, true);
            Patkat(r, kahveliKita, kahveliNokka, 0.0007f, 0.0005f, 4, Puu, true);
            Koysi(r, Masto(MesaaniZ, KalteusMesaani, MesMarsY + 0.002f), puomiNokka);
            Vector3 halssi = puomiKita + Vector3.up * 0.0008f, kulma = puomiNokka + Vector3.up * 0.0008f;
            Vector3 kurki = kahveliKita - Vector3.up * 0.0006f, huippu = kahveliNokka - Vector3.up * 0.0005f;
            var n = Vector3.Cross(kulma - halssi, kurki - halssi).normalized;
            if (n.x < 0f) n = -n;
            r.Pinta((u, v) => Vector3.Lerp(Vector3.Lerp(halssi, kulma, u), Vector3.Lerp(kurki, huippu, u), v)
                + n * (0.0055f * Kupu(u, 0.8f) * Kupu(v, 0.8f)), 5, 3, (u, v) => Purje, true);
        }

        /// <summary>Viiri (ainoa korostus, alle 1 % alasta): pitkä kapeneva punainen nauha isomaston huipusta suojaan ja taakse,
        /// aaltoileva. Pätkät ovat lyhyitä, joten ääriviiva ei peitä sitä.</summary>
        static void Viiri(MeriRakentaja r)
        {
            var huippu = Masto(IsoZ, KalteusIso, HuippuY) - Vector3.up * 0.0003f;
            var suunta = new Vector3(0.74f, -0.10f, -0.66f).normalized;
            var sivu = Vector3.Cross(Vector3.up, suunta).normalized;
            const float pituus = 0.032f, leveys = 0.0044f;
            const int n = 4;
            // Kaksi ristikkäistä nauhaa samalla keskiviivalla (riippuva ja makaava), joten viiri näkyy yhtenäisenä joka
            // suunnasta: yksi syrjittäin nähty nauha hajosi pelikoossa punaisiksi pisteiksi.
            for (int nauha = 0; nauha < 2; nauha++)
            {
                var poikki = nauha == 0 ? Vector3.up : sivu;
                for (int i = 0; i < n; i++)
                {
                    float a = i / (float)n, b = (i + 1f) / n;
                    Vector3 pa = huippu + suunta * (pituus * a) + Aalto(a, sivu), pb = huippu + suunta * (pituus * b) + Aalto(b, sivu);
                    Vector3 la = poikki * (0.5f * leveys * (1f - a)), lb = poikki * (0.5f * leveys * (1f - b));
                    if (i < n - 1) r.Kalvo(pa - la, pb - lb, pb + lb, pa + la, Viirivari);
                    else r.KalvoKolmio(pa - la, pb, pa + la, Viirivari);
                }
            }
        }

        /// <summary>Viirin aalto: pysty- ja sivuaalto kasvavat häntää kohti.</summary>
        static Vector3 Aalto(float a, Vector3 sivu) => Vector3.up * (0.0010f * a * Mathf.Sin(a * 7f)) + sivu * (0.0012f * a * Mathf.Sin(a * 6f + 1f));

        // ---- Keulakuohu ----

        /// <summary>Vesirajan piste rungon kyljellä kaiteen asemalta z (sama muunnos kuin rungon vesirajarivissä).</summary>
        static Vector3 Vesiraja(float z, float puoli, float ulos) => new Vector3(puoli * (Puoli(z) * 0.965f + ulos), 0f, z * 0.905f);

        /// <summary>
        /// Keulakuohu (lapsen 1 vesikerros): vaalea sirppi keulavarren ympärillä ja kylkiä pitkin, viikset ±36° ulospäin ja
        /// tyyny keulan edessä. Lapsen x-skaala (purjeiden täyttyminen) leventää kuohua puuskassa ja kaventaa tyvenessä.
        /// </summary>
        static void Keulakuohu(MeriRakentaja r)
        {
            var vaahto = MeriRakentaja.Vaahto;
            const float y = 0.0013f;
            float[] zs = { 0.066f, 0.062f, 0.056f, 0.047f, 0.036f, 0.024f };
            for (int k = 0; k < 2; k++)
            {
                float s = k == 0 ? 1f : -1f;
                var p = new Vector3[zs.Length]; var l = new float[zs.Length]; var a = new float[zs.Length];
                for (int i = 0; i < zs.Length; i++)
                {
                    float q = i / (zs.Length - 1f);
                    p[i] = Vesiraja(zs[i], s, 0.0012f + 0.0020f * q) + Vector3.up * y;
                    l[i] = Mathf.Lerp(0.0030f, 0.0050f, q);
                    a[i] = Mathf.Lerp(0.95f, 0.10f, q * q);
                }
                VesiNauha(r, p, l, a, vaahto);
                // Viikset: keulan olkapäästä ulos ja taakse.
                var alku = Vesiraja(0.050f, s, 0.0025f) + Vector3.up * y;
                var suunta = new Vector3(s * Mathf.Sin(36f * Mathf.Deg2Rad), 0f, -Mathf.Cos(36f * Mathf.Deg2Rad));
                VesiNauha(r, new[] { alku, alku + suunta * 0.018f, alku + suunta * 0.040f }, new[] { 0.0030f, 0.0045f, 0.0060f },
                    new[] { 0.60f, 0.35f, 0f }, vaahto);
            }
            r.Soikio(new Vector3(0f, y, 0.0625f), 0.0055f, 0.0045f, vaahto, 0.85f, 0f, 10);
        }

        /// <summary>
        /// Roiskeet keulan ympärillä (enimmäkseen suojan puolen keulassa, joka painuu kallistuksessa): pehmeät vaahtokiekot
        /// porrastetuilla korkeuksilla 0,005–0,036. Kiekot ovat vaakatasossa, joten x-skaala 0 litistää ne näkymättömiksi
        /// viivoiksi keskilinjalle ja y-skaala nostaa niitä.
        /// </summary>
        static void Roiskeet(MeriRakentaja r)
        {
            // (x, y, z, säde, alfa): suojan puolen keulassa isoimmat ja ylimmät, tuulen puolella pienempi.
            float[,] k =
            {
                { 0.0080f, 0.0050f, 0.0650f, 0.0110f, 0.95f },
                { 0.0180f, 0.0110f, 0.0590f, 0.0130f, 0.95f },
                { 0.0040f, 0.0150f, 0.0720f, 0.0105f, 0.92f },
                { 0.0280f, 0.0180f, 0.0520f, 0.0120f, 0.85f },
                { 0.0140f, 0.0240f, 0.0660f, 0.0125f, 0.80f },
                { 0.0300f, 0.0290f, 0.0590f, 0.0110f, 0.62f },
                { 0.0180f, 0.0360f, 0.0700f, 0.0100f, 0.50f },
                { -0.0090f, 0.0080f, 0.0630f, 0.0090f, 0.88f },
                { -0.0170f, 0.0150f, 0.0580f, 0.0085f, 0.65f },
                { 0.0000f, 0.0220f, 0.0760f, 0.0090f, 0.60f },
            };
            for (int i = 0; i < k.GetLength(0); i++) Pilvi(r, new Vector3(k[i, 0], k[i, 1], k[i, 2]), k[i, 3], k[i, 4]);
        }

        /// <summary>Vaahtopilvi: peittävä ydin 55 %:iin säteestä ja pehmeä reuna (pelkkä häivytys keskeltä reunaan jäi
        /// vaalealla merellä näkymättömäksi).</summary>
        static void Pilvi(MeriRakentaja r, Vector3 p, float sade, float alfa)
        {
            var vaahto = MeriRakentaja.Vaahto;
            r.Soikio(p, sade * 0.55f, sade * 0.47f, vaahto, alfa, alfa, 8);
            r.Rengas(p, sade * 0.55f, sade * 0.47f, sade, sade * 0.85f, vaahto, alfa, 0f, 8);
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>
        /// Puuskat näytöksessä n hetkellä s (vanhan purjelaivan kaava sellaisenaan): voimakkuus 0–1, puuskien lisämatka ja
        /// koko näytöksen lisämatka. Kolme paikkaa matkalla (18 %, 46 %, 74 % ± 5 %), kukin 80 %:n todennäköisyydellä
        /// (voima 0,2–0,35); harvinaisessa keskimmäinen on kova puuska (voima 1, pidempi).
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
                float e = 0.11f * voima * kesto;
                lisa += e * Pehmea((s - alku) / kesto);
                yht += e;
            }
            return (puuska, lisa, yht);
        }

        /// <summary>Tyven (noin 45 %:ssa tavallisista näytöksistä kerran, 3,5–6,5 s): kallistus oikenee, purjeet veltostuvat
        /// ja lepattavat enemmän. Harvinaisessa ei tyventä.</summary>
        static float Tyven(int n, float s, float pituus, bool harv)
        {
            if (harv || Aikataulu.Arvo(n, 25) > 0.45f) return 0f;
            float alku = pituus * (0.25f + 0.5f * Aikataulu.Arvo(n, 26)), kesto = 3.5f + 3f * Aikataulu.Arvo(n, 27);
            return Pehmea((s - alku) / 1.8f) * (1f - Pehmea((s - alku - 1.8f - kesto) / 2.2f));
        }

        /// <summary>
        /// Näytös: matka rannikon suuntaisesti (z ±0,34) loivaa kaarta merellä (x −0,03…−0,10), pohjoiseen tai etelään
        /// jaksosta, puuskissa vauhti kasvaa hetkeksi (enintään +20 %). Kallistus 4° suojaan + puuskat (tavallinen
        /// 5,5–6,5°, harvinainen 11°) − tyven 2°, keinunta kahdella tahdilla (toinen siemenestä), nyökkäys ja ruorin
        /// pieni heilunta. Lapset: isomaston purjeiden vatsa 0,7–1,33 ja lepatus (tyvenessä eniten, täydessä puuskassa ei),
        /// halkaisijoiden ja kahvelipurjeen täyttyminen x-skaalalla (0,7–1,34) ja kuohun hengitys, roiskeet pienessä
        /// puuskassa hieman ja kovassa suurina aina, kun keula iskee aaltoon. Ei allokaatioita (mitattu 0 tavua / 10 000
        /// kutsua), noin 2 µs/kutsu.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            var (puuska, lisa, lisaYht) = Puuskat(n, s, pituus, harv);
            float tyven = Tyven(n, s, pituus, harv);

            float v = (s + lisa) / (pituus + lisaYht), w = pohjoiseen ? 2f * v - 1f : 1f - 2f * v;
            float x0 = 0.03f + 0.025f * Aikataulu.Arvo(n, 4), kaari = 0.02f + 0.025f * Aikataulu.Arvo(n, 5);
            roottori.localPosition = new Vector3(-x0 - kaari * (1f - w * w), 0f, 0.34f * w);
            var suunta = new Vector3(2f * kaari * w, 0f, 0.34f).normalized * (pohjoiseen ? 1f : -1f);
            float tt = t + 10f * Aikataulu.Arvo(n, 6), aalto = 0.45f + 0.25f * Aikataulu.Arvo(n, 7);
            float kallistus = 4f + 7f * puuska - 2f * tyven + 0.8f * Mathf.Sin(tt * 1.3f) + 0.45f * Mathf.Sin(tt * aalto + 2f);
            float nyokkays = 0.6f * Mathf.Sin(tt * 1.7f) + 0.3f * Mathf.Sin(tt * 1.13f + 1f) + 1.2f * puuska * puuska * Mathf.Sin(tt * 2.6f);
            float ruori = 0.7f * Mathf.Sin(tt * 0.31f + 0.5f);
            // Suojan puoli on +x: negatiivinen z-kierto kallistaa mastot oikealle; positiivinen x-kierto painaa keulaa.
            var keinunta = Quaternion.Euler(nyokkays, 0f, -kallistus);
            roottori.localRotation = Quaternion.LookRotation(suunta, Vector3.up) * Quaternion.AngleAxis(ruori, Vector3.up) * keinunta;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;

            // 0: isomaston raakapurjeet maston tyvessä (origossa): brassi, vatsa ja lepatus.
            float lepatus = (0.45f + 0.8f * tyven) * (1f - 0.75f * puuska);
            float vatsa = 0.92f + 0.5f * Mathf.Min(puuska, 0.35f) + 0.35f * Mathf.Max(0f, puuska - 0.35f) - 0.22f * tyven
                + lepatus * (0.05f * Mathf.Sin(tt * 3.3f) + 0.03f * Mathf.Sin(tt * 7.9f + 1.1f));
            var iso = lapset[0];
            iso.localPosition = new Vector3(0f, KansiY(IsoZ), IsoZ);
            iso.localRotation = Quaternion.AngleAxis(-KalteusIso, Vector3.right) * Quaternion.AngleAxis(Brassi + 1.2f * lepatus * Mathf.Sin(tt * 2.3f + 0.4f), Vector3.up);
            iso.localScale = new Vector3(1f, 1f, vatsa);

            // 1: keulakuohu, halkaisijat, kahvelipurje ja viiri: täyttyminen suojan puolelle, lepatus ja keulan hengitys
            // (kuohu levenee, kun keula painuu nyökkäyksessä).
            float painuu = Mathf.Max(0f, Mathf.Sin(tt * 1.7f));
            var etu = lapset[Lapsia];
            etu.localPosition = Vector3.zero;
            etu.localRotation = Quaternion.identity;
            float tayte = 0.97f + 0.34f * puuska - 0.14f * tyven + 0.05f * painuu
                + lepatus * (0.06f * Mathf.Sin(tt * 2.7f + 0.7f) + 0.025f * Mathf.Sin(tt * 5.3f));
            etu.localScale = new Vector3(tayte, 1f, 1f);

            // 2: roiskeet vaakatasossa (keinunta kumottu): tavallisessa puuskassa pieni, kovassa suuri roiske aina, kun
            // keula iskee aaltoon (nyökkäyksen puuskatahti 2,6).
            var roiske = lapset[Lapsia + Lapsia2];
            roiske.localPosition = Vector3.zero;
            roiske.localRotation = Quaternion.Inverse(keinunta);
            float isku = Mathf.Max(0f, Mathf.Sin(tt * 2.6f)), kova = Pehmea((puuska - 0.6f) / 0.3f);
            float maara = Mathf.Max(0.35f * Pehmea((puuska - 0.18f) / 0.12f) * painuu * painuu, kova * (0.45f + 0.55f * isku));
            roiske.localScale = maara > 0.001f ? new Vector3(maara, 0.25f + 0.75f * Mathf.Max(isku, 1f - kova), 1f) : Vector3.zero;
        }
    }
}
