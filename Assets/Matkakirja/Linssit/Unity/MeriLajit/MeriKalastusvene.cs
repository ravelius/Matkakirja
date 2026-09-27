using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MEREN KORISTE: KALASTUSVENE uudella laatutasolla (omistaja 27.9.2026: "Nuo voisi tehdä korkeammalla laadulla"; speksi
    /// docs/raportit/meri-laatu-speksi-20260927.md, erä 1 hyväksytty). Korvaa vanhan MeriKalastusveneen samalla nimellä,
    /// merillä, koolla ja aikataululla (siemen 917, näytös 20–30 s, tauko 30–90 s).
    ///
    /// Pieni pohjoismainen puinen verkkovene (kaksoiskeula, limisaumattu runko tummana rampissa, vaalea vyölauta ja paperinen
    /// reunalista kaarevalla kansilinjalla), ohjaamo perän puolella tummalla katolla, keulamasto punaisella viirillä ja
    /// mesaanissa kaareva parkittu tukipurje. Oikealla laidalla ohjaamon edessä verkkorulla: verkko nousee vedestä rullan
    /// yli ammeeseen, kalastaja (punainen öljytakki ja sydvesti) vetää, ja kalalaatikot ovat vasemmalla laidalla.
    /// Vesikerros (verkon alussa): pehmeä varjo, vesirajan vaahto, keulakuohu, pieni Kelvinin kiila (vene ryömii verkkoa
    /// pitkin), perän vana sekä verkon kohdalla väreet ja veden alla näkyvä verkon varjo.
    ///
    /// Roottorin origo on lokin istumapaikan alla (ohjaamon katon oikea etukulma), koska ElavatElementit pitää lapsen
    /// vesipisteen (x, z) kallistamattomana (LapsetOmaanPisteeseen): katolle laskeutunut lokki on tarkalleen origossa eikä irtoa
    /// katolta liioitellussa perspektiivissä. Kohot ja renkaat (Lapsi2, Lapsi3) on rakennettu VARREN päähän (0, −Varsi, 0):
    /// rungon lähellä niiden kääntöpiste on roottorin y-akselilla (Ripusta, λ = 0), joten ne ovat jäykästi kiinni rungossa
    /// kallistuksessakin (kohot nousevat rullalle ja putoavat ammeeseen kallistuksen mukana), ja kauempana kääntöpiste on
    /// suoraan kohteen yläpuolella (λ = 1), jolloin ne käyttäytyvät kuten tavalliset lapset omissa vesipisteissään.
    ///
    /// Lapset:
    ///   Lapsi  (5)  lokki: pitkät kapeat siivet mustin kärjin, ääriviiva 0,48 pt (verkko rakennetaan 2,5-kertaisena ja
    ///               skaalataan pienemmäksi). Siivenisku on y-skaala 1 → 0 ja siivet alas 180°:n kierrolla pituusakselin ympäri
    ///               (litteänä hetkenä), joten skaala ei ole koskaan negatiivinen. 0 laskeutuu katolle, 1 kaartelee ja syöksähtää
    ///               verkon yllä, 2–4 harvinaisen syöksyjät.
    ///   Lapsi2 (12) pallo (tumma kupu, vaalea alapuoli): 0–7 verkon kohot (jatkuva virta vedestä rullan yli ammeeseen), 8 kala
    ///               (venytetty pallo lokin nokassa), 9–11 syöksyn roiskeet (käännettynä, vaalea puoli ylös).
    ///   Lapsi3 (6)  väreen rengas (vesikerros): 0–3 verkosta tippuvien pisaroiden väreet, 4–5 syöksyjen renkaat.
    /// +z eteen (keula), +y ylös, meren pinta y = 0; 1 yksikkö = KokoPt pistettä; runko 0,100 yksikköä ≈ 30 pt.
    /// </summary>
    public static class MeriKalastusvene
    {
        public const string Nimi = "kalastusvene";
        public static readonly string[] Meret = { "itameri", "pohjanmeri", "valimeri" };
        /// <summary>Vene 0,1 yksikköä → 30 pt (hieman pienempi kuin laivat, kuten kokoero on merelläkin).</summary>
        public const float KokoPt = 300f;
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(917, 20f, 30f, 30f, 90f);

        const int Lokkeja = 5, Kohoja = 8, Kala = Kohoja, Roiskeita = 3, Palloja = Kohoja + 1 + Roiskeita;
        const int Tippoja = 4, Renkaita = Tippoja + 2;
        public const int Lapsia = Lokkeja, Lapsia2 = Palloja, Lapsia3 = Renkaita;

        // ---- Mitat (runkokoordinaatit: keskilinja x = 0, vesiraja y = 0, rungon puoliväli z = 0; verkkoon M() = h − Origo) ----

        const float ReunaMinimi = 0.006f;
        const float ZKeula = 0.050f, ZPera = -0.050f, ZvKeula = 0.043f, ZvPera = -0.045f;
        const float Leveys = 0.0158f, ZLeveinta = -0.003f, ZMatalin = -0.013f, KansiKeski = 0.0105f, Parras = 0.0034f;
        /// <summary>Pallon ja renkaan varsi: kohde on verkossa kohdassa (0, −Varsi, 0) (katso Ripusta).</summary>
        const float Varsi = 0.14f;
        /// <summary>Lokin verkko rakennetaan tällä kertoimella ja skaalataan takaisin: ääriviiva 1,2 pt / 2,5 = 0,48 pt.</summary>
        const float LokkiRakenne = 2.5f;

        // ---- Värit: vain B-seepiaramppi (alfa 0) ja pelin punainen (alfa 1) ----

        static Color Rampi(float s) => MeriRakentaja.Rampi(s);
        static readonly Color KylkiVari = Rampi(0.46f), LimiVari = Rampi(1.62f), VyoVari = Rampi(1.42f), ReunaVari = Rampi(1.94f),
            KaideSisa = Rampi(1.60f), KansiVari = Rampi(1.50f), PaaVari = Rampi(0.42f);
        static readonly Color SeinaVari = Rampi(1.88f), KattoVari = Rampi(1.00f), KattoReuna = Rampi(0.68f), IkkunaVari = Rampi(0.30f),
            OviVari = Rampi(1.05f), PiippuVari = Rampi(0.28f);
        static readonly Color MastoVari = Rampi(0.62f), PuomiVari = Rampi(0.72f), KoysiVari = Rampi(0.38f), PurjeVari = Rampi(1.78f);
        static readonly Color RullaVari = Rampi(0.36f), VerkkoVari = Rampi(1.12f), AmmeVari = Rampi(0.85f), AmmeSisa = Rampi(1.18f),
            AmmeReuna = Rampi(1.55f), KasaVari = Rampi(0.92f), KasaKoho = Rampi(0.38f);
        static readonly Color LaatikkoVari = Rampi(1.62f), LaatikkoReuna = Rampi(1.22f), SaalisVari = Rampi(1.96f);
        static readonly Color HousuVari = Rampi(0.30f), NaamaVari = Rampi(1.42f);
        static readonly Color LokkiVartalo = Rampi(2.0f), LokkiSiipi = Rampi(1.35f), LokkiKarki = Rampi(0.10f), NokkaVari = Rampi(1.55f);
        static readonly Color PalloYla = Rampi(0.45f), PalloAla = Rampi(1.95f);

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Rungon muoto ----

        /// <summary>Kansilinjan (parrasreunan) korkeus: matalin hieman perään päin puolivälistä, keula nousee enemmän kuin perä.</summary>
        static float Kansi(float z)
        {
            if (z >= ZMatalin) { float q = (z - ZMatalin) / (ZKeula - ZMatalin); return KansiKeski + 0.0085f * q * q; }
            float p = (ZMatalin - z) / (ZMatalin - ZPera);
            return KansiKeski + 0.0048f * p * p;
        }

        /// <summary>Parrasreunan puolileveys: kaksoiskeula (spissgatter), keula terävämpi ja kanoottiperä täyteläisempi.</summary>
        static float Puolileveys(float z)
        {
            if (z >= ZLeveinta)
            {
                float t = Mathf.Clamp01((z - ZLeveinta) / (ZKeula - ZLeveinta));
                return Leveys * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(t, 1.9f)), 0.70f);
            }
            float p = Mathf.Clamp01((ZLeveinta - z) / (ZLeveinta - ZPera));
            return Leveys * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(p, 2.1f)), 0.60f);
        }

        /// <summary>Kannen korkeus kohdassa (x, z): parras-sisäpinnan alareuna ja keskilinjan kaari 0,0004.</summary>
        static float KansiTaso(float z, float x)
        {
            float s = Mathf.Max(1e-4f, Puolileveys(z) - 0.0011f);
            return Kansi(z) - Parras + 0.0004f * Mathf.Min(1f, s / 0.004f) * Mathf.Max(0f, 1f - Mathf.Abs(x) / s);
        }

        /// <summary>Asemien jako: tiheämpi päissä, joissa muoto kaartuu.</summary>
        static float Asema(float u) => u - 0.5f * Mathf.Sin(2f * Mathf.PI * u) / (2f * Mathf.PI);
        static float KansiZ(float u) => Mathf.Lerp(ZPera, ZKeula, Asema(u));

        /// <summary>Kyljen piste: u 0 perä … 1 keula, v 0 vesiraja … 1 parrasreuna; ulos = limisauman siirto ulospäin.
        /// Keula- ja peräpuu kallistuvat ulospäin (v^1,5), kylki leviää ylöspäin ja on hieman kupera.</summary>
        static Vector3 KylkiPiste(float u, float v, float puoli, float ulos)
        {
            float g = Asema(u);
            float zd = Mathf.Lerp(ZPera, ZKeula, g), zw = Mathf.Lerp(ZvPera, ZvKeula, g);
            float z = zw + (zd - zw) * Mathf.Pow(v, 1.5f);
            float bd = Puolileveys(zd), k = bd / Leveys;
            float x = Mathf.Lerp(0.84f * bd, bd, Mathf.Pow(v, 0.7f)) + (0.0005f * Mathf.Sin(Mathf.PI * v) + ulos) * k;
            return new Vector3(puoli * x, Kansi(zd) * v, z);
        }

        /// <summary>Limisauman vyöt (lautakerrokset) vesirajasta parrasreunaan: ylin on vaalea vyölauta.</summary>
        static readonly float[] Vyot = { 0f, 0.27f, 0.52f, 0.765f, 1f };
        static readonly float[] VyotKauko = { 0f, 0.52f, 1f };
        /// <summary>Limisauma: vyön alareuna on alemman vyön yläreunan ulkopuolella; sauman kohdalla vaalea viiva (laudan reuna
        /// valossa), joka erottuu myös varjon puolen tummasta kyljestä.</summary>
        const float Limitys = 0.00045f, LimiOsuus = 0.17f;

        static Vector3 Vyo(float[] vyot, float u, int k, float f, float puoli) =>
            KylkiPiste(u, Mathf.Lerp(vyot[k], vyot[k + 1], f), puoli, k > 0 ? Limitys * (1f - f) : 0f);

        // ---- Kiinteät paikat (runkokoordinaatit) ----

        /// <summary>Lokin istumapaikka ohjaamon katon oikeassa etukulmassa; roottorin origo on sen alla (vesipinnassa).</summary>
        static readonly Vector3 Istuin = new Vector3(0.0072f, 0.0200f, -0.0003f);
        static readonly Vector3 Origo = new Vector3(Istuin.x, 0f, Istuin.z);
        static Vector3 M(Vector3 h) => h - Origo;
        static Vector3 M(float x, float y, float z) => new Vector3(x - Origo.x, y, z - Origo.z);

        const float OhjZ0 = -0.0205f, OhjZ1 = 0.0005f, OhjX = 0.0080f, OhjY1 = 0.0192f, KattoYli = 0.0012f, KattoPaksu = 0.0007f;

        const float ZRulla = 0.012f, RullaSade = 0.0010f;
        /// <summary>Verkkorulla oikean laidan reunalistalla ohjaamon edessä.</summary>
        static readonly Vector3 Rulla = new Vector3(Puolileveys(ZRulla) - 0.0002f, Kansi(ZRulla) + 0.0005f + 0.0013f, ZRulla);
        /// <summary>Verkon suunta vedessä rullalta (56° keulasta oikealle) ja sen kohtisuora.</summary>
        static readonly Vector3 VerkkoSuunta = new Vector3(0.829f, 0f, 0.559f), VerkkoSivu = new Vector3(-0.559f, 0f, 0.829f);
        /// <summary>Verkko menee veteen tällä vaakaetäisyydellä rullasta (piste Pinta0).</summary>
        const float TVesi = 0.0080f;
        static readonly Vector3 Pinta0 = new Vector3(Rulla.x + 0.829f * TVesi, 0f, Rulla.z + 0.559f * TVesi);
        /// <summary>Verkkoamme (pohjan keskipiste) rullan sisäpuolella.</summary>
        static readonly Vector3 Amme = new Vector3(0.0048f, KansiTaso(0.0168f, 0.0048f) - 0.0002f, 0.0168f);
        const float AmmeKorkeus = 0.0036f, AmmeSade = 0.0040f;
        /// <summary>Kalastajan jalat, katse rullaa kohti ja nojaus eteen.</summary>
        static readonly Vector3 Kalastaja = new Vector3(0.0100f, KansiTaso(0.0068f, 0.0100f) - 0.0001f, 0.0068f);
        const float KalastajaSuunta = 41f, KalastajaNoja = 18f;
        const float ZKeulamasto = 0.030f, ZMesaani = -0.036f;

        // ---- Mallit ----

        public static Mesh Roottori() => Rakenna(false);

        /// <summary>Kaukotaso (≤ 800 kolmiota): sama siluetti harvemmin jaoin, ilman limisaumoja, köysiä ja pieniä varusteita.</summary>
        public static Mesh RoottoriKauko() => Rakenna(true);

        static Mesh Rakenna(bool kauko)
        {
            var r = new MeriRakentaja(ReunaMinimi);
            Vesikerros(r, kauko);
            Runko(r, kauko);
            Ohjaamo(r, kauko);
            Mastot(r, kauko);
            Pyydys(r, kauko);
            if (!kauko) Varusteet(r);
            KalastajaHahmo(r, kauko);
            return r.Verkko(kauko ? "kalastusvene-kauko" : "kalastusvene");
        }

        /// <summary>
        /// Vesikerros roottorin alkuun (piirtyy ennen runkoa, kaikki kolmiot ylöspäin): pehmeä varjo, verkon varjo veden alla,
        /// Kelvinin kiila ±19,5° (vene ryömii hitaasti verkkoa pitkin, joten kiila on pieni ja haalea), poikittaiset aallot,
        /// perän vana, vesirajan vaahto, keulakuohu ja verkon kohdalla kaksi väreen rengasta.
        /// </summary>
        static void Vesikerros(MeriRakentaja r, bool kauko)
        {
            r.Vesi = true;
            var vaahto = MeriRakentaja.Vaahto;
            var varjo = MeriRakentaja.VarjoVari;
            // 1. Varjo rungon alla (keskellä: Animoi ei tiedä maailman ilmansuuntia).
            r.Soikio(M(0.0012f, 0.0002f, -0.002f), 0.025f, 0.063f, varjo, 0.17f, 0f, kauko ? 12 : 20);
            // 2. Verkon varjo veden alla: tumma juova verkon suuntaan, häipyy.
            if (!kauko)
                Juova(r, q => M(Pinta0 + VerkkoSuunta * (0.001f + 0.034f * q) + new Vector3(0f, 0.0003f, 0f)),
                    q => Mathf.Lerp(0.0028f, 0.0014f, q), q => 0.14f * (1f - q) * (1f - q), varjo, 4);
            // 3. Kelvinin kiila keulan olkapäiltä.
            float kiila = 19.5f * Mathf.Deg2Rad;
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var alku = new Vector3(p * 0.0055f, 0.0007f, 0.034f);
                var suunta = new Vector3(p * Mathf.Sin(kiila), 0f, -Mathf.Cos(kiila));
                Juova(r, q => M(alku + suunta * (0.014f + 0.068f * q)), q => Mathf.Lerp(0.0017f, 0.0028f, q),
                    q => 0.40f * Mathf.Clamp01(0.3f + 4f * q) * Mathf.Pow(1f - q, 1.3f), vaahto, kauko ? 3 : 7);
                if (kauko) continue;
                float h = (19.5f + 33f) * Mathf.Deg2Rad;
                var harja = new Vector3(p * Mathf.Sin(h), 0f, -Mathf.Cos(h));
                for (int i = 0; i < 4; i++)
                {
                    float q = (i + 0.6f) / 4.4f;
                    var kanta = alku + suunta * (0.014f + 0.068f * q) + new Vector3(0f, 0.0001f, 0f);
                    float pit = 0.005f + 0.005f * q, alfa = 0.3f * Mathf.Pow(1f - q, 1.2f);
                    Juova(r, x => M(kanta + harja * (pit * x)), x => 0.0019f * (1f - 0.6f * x), x => alfa * (1f - x), vaahto, 2);
                }
            }
            // 4. Poikittaiset aallot perän takana ja perän vana.
            if (!kauko)
                for (int i = 0; i < 2; i++)
                {
                    float z = -0.057f - 0.016f * i, lev = 0.5f * (0.0055f + (0.034f - z) * Mathf.Sin(kiila) / Mathf.Cos(kiila)), alfa = 0.2f - 0.07f * i;
                    Juova(r, q => { float x = Mathf.Lerp(-lev, lev, q); return M(x, 0.0008f, z + 0.3f * x * x / lev); },
                        q => 0.0017f, q => alfa * Mathf.Sin(Mathf.PI * q), vaahto, 6);
                }
            Juova(r, q => M(0f, 0.0009f, -0.046f - 0.045f * q), q => Mathf.Lerp(0.004f, 0.010f, q), q => 0.36f * (1f - q) * (1f - q), vaahto, kauko ? 2 : 5);
            // 5. Vesirajan vaahto kylkiä pitkin (kirkkaampi keulassa).
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                Juova(r, q => { var w = KylkiPiste(Mathf.Lerp(0.93f, 0.07f, q), 0f, p, 0f); return M(w.x + p * 0.0009f, 0.0010f, w.z); },
                    q => Mathf.Lerp(0.0024f, 0.0015f, q), q => Mathf.Lerp(0.5f, 0.14f, q), vaahto, kauko ? 4 : 9);
            }
            // 6. Keulakuohu: sirppi keulapuun ympärillä ja viikset kyljille.
            var kk = new Vector3(0f, 0.0011f, ZvKeula - 0.0005f);
            int n = kauko ? 4 : 6;
            for (int i = 0; i < n; i++)
            {
                float a0 = Mathf.Lerp(-1.7f, 1.7f, i / (float)n), a1 = Mathf.Lerp(-1.7f, 1.7f, (i + 1) / (float)n);
                Vector3 s0 = kk + new Vector3(Mathf.Sin(a0) * 0.0030f, 0f, Mathf.Cos(a0) * 0.0045f), s1 = kk + new Vector3(Mathf.Sin(a1) * 0.0030f, 0f, Mathf.Cos(a1) * 0.0045f);
                Vector3 u0 = kk + new Vector3(Mathf.Sin(a0) * 0.0062f, 0f, Mathf.Cos(a0) * 0.0085f), u1 = kk + new Vector3(Mathf.Sin(a1) * 0.0062f, 0f, Mathf.Cos(a1) * 0.0085f);
                float r0 = 0.65f - 0.2f * Mathf.Abs(a0) / 1.7f, r1 = 0.65f - 0.2f * Mathf.Abs(a1) / 1.7f;
                NelioVesi(r, M(s0), M(s1), M(u1), M(u0), MeriRakentaja.Alfa(vaahto, r0), MeriRakentaja.Alfa(vaahto, r1), MeriRakentaja.Alfa(vaahto, 0f), MeriRakentaja.Alfa(vaahto, 0f));
            }
            if (!kauko)
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f, a = 30f * Mathf.Deg2Rad;
                    var alku = new Vector3(p * 0.0040f, 0.0012f, 0.038f);
                    var suunta = new Vector3(p * Mathf.Sin(a), 0f, -Mathf.Cos(a));
                    Juova(r, q => M(alku + suunta * (0.022f * q)), q => Mathf.Lerp(0.0022f, 0.0045f, q), q => Mathf.Lerp(0.55f, 0f, q), vaahto, 3);
                }
            // 7. Verkon kohdalla väreet (kaksi rengasta, vaaleat harjat).
            if (!kauko)
            {
                Harja(r, M(Pinta0 + new Vector3(0f, 0.0012f, 0f)), 0.0034f, 0.0010f, vaahto, 0.34f, 10);
                Harja(r, M(Pinta0 + new Vector3(0f, 0.0012f, 0f)), 0.0064f, 0.0011f, vaahto, 0.18f, 12);
            }
            r.Vesi = false;
        }

        /// <summary>
        /// Runko yhtenä ääriviivaosana: limisaumaiset kyljet (neljä vyötä, saumoissa vaalea viiva, ylin vyölauta vaalea),
        /// paperinen reunalista, parrasvarustuksen sisäpinta ja kaareva kansi. Keula- ja peräpuun päät omina pieninä tankoina.
        /// </summary>
        static void Runko(MeriRakentaja r, bool kauko)
        {
            int nu = kauko ? 10 : 16;
            var vyot = kauko ? VyotKauko : Vyot;
            int nv = vyot.Length - 1;
            r.AloitaOsa();
            for (int s = 0; s < 2; s++)
            {
                float p = s == 0 ? 1f : -1f;
                var ulos = new Vector3(p, 0f, 0f);
                for (int i = 0; i < nu; i++)
                {
                    float u0 = i / (float)nu, u1 = (i + 1) / (float)nu;
                    for (int k = 0; k < nv; k++)
                    {
                        bool limi = !kauko && k < nv - 1;
                        float f1 = limi ? 1f - LimiOsuus : 1f;
                        var vari = k == nv - 1 ? VyoVari : KylkiVari;
                        r.NelioUlos(M(Vyo(vyot, u0, k, 0f, p)), M(Vyo(vyot, u1, k, 0f, p)), M(Vyo(vyot, u1, k, f1, p)), M(Vyo(vyot, u0, k, f1, p)), ulos, vari);
                        if (limi)
                            r.NelioUlos(M(Vyo(vyot, u0, k, f1, p)), M(Vyo(vyot, u1, k, f1, p)), M(Vyo(vyot, u1, k, 1f, p)), M(Vyo(vyot, u0, k, 1f, p)), ulos, LimiVari);
                    }
                    // Reunalista (paperi) ja parrasvarustuksen sisäpinta.
                    float z0 = KansiZ(u0), z1 = KansiZ(u1);
                    Vector3 k0 = KylkiPiste(u0, 1f, p, 0f), k1 = KylkiPiste(u1, 1f, p, 0f);
                    float c0 = Puolileveys(z0) / Leveys, c1 = Puolileveys(z1) / Leveys;
                    Vector3 o0 = k0 + new Vector3(0.0003f * p * c0, 0.0005f, 0f), o1 = k1 + new Vector3(0.0003f * p * c1, 0.0005f, 0f);
                    float s0 = Mathf.Max(0f, Mathf.Abs(k0.x) - 0.0011f), s1 = Mathf.Max(0f, Mathf.Abs(k1.x) - 0.0011f);
                    Vector3 i0 = new Vector3(p * s0, k0.y + 0.0005f, z0), i1 = new Vector3(p * s1, k1.y + 0.0005f, z1);
                    Vector3 d0 = new Vector3(p * s0, k0.y - Parras, z0), d1 = new Vector3(p * s1, k1.y - Parras, z1);
                    r.NelioUlos(M(k0), M(k1), M(o1), M(o0), ulos, ReunaVari);
                    r.NelioUlos(M(o0), M(o1), M(i1), M(i0), Vector3.up, ReunaVari);
                    r.NelioUlos(M(i0), M(i1), M(d1), M(d0), -ulos, KaideSisa);
                }
            }
            // Kansi: keskilinja hieman koholla, reunat parrasvarustuksen sisäpinnan alareunassa.
            for (int i = 0; i < nu; i++)
            {
                float u0 = i / (float)nu, u1 = (i + 1) / (float)nu;
                float z0 = KansiZ(u0), z1 = KansiZ(u1);
                Vector3 k0 = KylkiPiste(u0, 1f, 1f, 0f), k1 = KylkiPiste(u1, 1f, 1f, 0f);
                float s0 = Mathf.Max(0f, k0.x - 0.0011f), s1 = Mathf.Max(0f, k1.x - 0.0011f);
                float y0 = k0.y - Parras, y1 = k1.y - Parras;
                Vector3 a0 = new Vector3(-s0, y0, z0), a1 = new Vector3(-s1, y1, z1), b0 = new Vector3(s0, y0, z0), b1 = new Vector3(s1, y1, z1);
                Vector3 m0 = new Vector3(0f, y0 + 0.0004f * Mathf.Min(1f, s0 / 0.004f), z0), m1 = new Vector3(0f, y1 + 0.0004f * Mathf.Min(1f, s1 / 0.004f), z1);
                r.NelioUlos(M(a0), M(m0), M(m1), M(a1), Vector3.up, KansiVari);
                r.NelioUlos(M(m0), M(b0), M(b1), M(m1), Vector3.up, KansiVari);
            }
            r.LopetaOsa();
            if (kauko) return;
            // Keula- ja peräpuun päät nousevat hieman parrasreunan yli.
            r.Tanko(M(0f, Kansi(ZKeula) - 0.0025f, ZKeula - 0.0002f), M(0f, Kansi(ZKeula) + 0.0020f, ZKeula + 0.0007f), 0.0007f, 0.0006f, 4, PaaVari, true);
            r.Tanko(M(0f, Kansi(ZPera) - 0.0025f, ZPera + 0.0002f), M(0f, Kansi(ZPera) + 0.0016f, ZPera - 0.0006f), 0.0007f, 0.0006f, 4, PaaVari, true);
        }

        /// <summary>Katon yläpinnan korkeus kohdassa x (harja keskilinjalla 0,0005 koholla).</summary>
        static float KattoY(float x) => OhjY1 + KattoPaksu + 0.0005f * Mathf.Max(0f, 1f - Mathf.Abs(x) / (OhjX + KattoYli));

        /// <summary>
        /// Ohjaamo perän puolella yhtenä ääriviivaosana: vaaleat seinät, edessä kolme ja kyljissä kaksi tummaa ikkunaa, takana ovi,
        /// tumma loiva harjakatto räystäineen (lokin istumapaikka oikeassa etukulmassa) ja kamiinan piippu.
        /// </summary>
        static void Ohjaamo(MeriRakentaja r, bool kauko)
        {
            float y0 = Mathf.Min(KansiTaso(OhjZ0, OhjX), KansiTaso(OhjZ1, OhjX)) - 0.0004f, y1 = OhjY1;
            r.AloitaOsa();
            Vector3 a = M(-OhjX, y0, OhjZ0), b = M(OhjX, y0, OhjZ0), c = M(OhjX, y0, OhjZ1), d = M(-OhjX, y0, OhjZ1);
            var ylos = new Vector3(0f, y1 - y0, 0f);
            r.NelioUlos(d, c, c + ylos, d + ylos, Vector3.forward, SeinaVari);
            r.NelioUlos(b, a, a + ylos, b + ylos, Vector3.back, SeinaVari);
            r.NelioUlos(c, b, b + ylos, c + ylos, Vector3.right, SeinaVari);
            r.NelioUlos(a, d, d + ylos, a + ylos, Vector3.left, SeinaVari);
            if (!kauko)
            {
                const float e = 0.0001f;
                for (int i = -1; i <= 1; i++)
                {
                    float x = 0.0052f * i;
                    r.NelioUlos(M(x - 0.0018f, 0.0142f, OhjZ1 + e), M(x + 0.0018f, 0.0142f, OhjZ1 + e), M(x + 0.0018f, 0.0176f, OhjZ1 + e), M(x - 0.0018f, 0.0176f, OhjZ1 + e), Vector3.forward, IkkunaVari);
                }
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f, x = p * (OhjX + e);
                    foreach (float zc in new[] { -0.0058f, -0.0142f })
                        r.NelioUlos(M(x, 0.0142f, zc - 0.0026f), M(x, 0.0142f, zc + 0.0026f), M(x, 0.0174f, zc + 0.0026f), M(x, 0.0174f, zc - 0.0026f), new Vector3(p, 0f, 0f), IkkunaVari);
                }
                r.NelioUlos(M(-0.0021f, y0 + 0.0006f, OhjZ0 - e), M(0.0021f, y0 + 0.0006f, OhjZ0 - e), M(0.0021f, 0.0168f, OhjZ0 - e), M(-0.0021f, 0.0168f, OhjZ0 - e), Vector3.back, OviVari);
            }
            // Katto: räystäät ja loiva harja.
            float xk = OhjX + KattoYli, z0 = OhjZ0 - KattoYli, z1 = OhjZ1 + KattoYli, yk = OhjY1 + KattoPaksu;
            Vector3 v0 = M(-xk, y1, z0), v1 = M(xk, y1, z0), v2 = M(xk, y1, z1), v3 = M(-xk, y1, z1);
            Vector3 t0 = M(-xk, yk, z0), t1 = M(xk, yk, z0), t2 = M(xk, yk, z1), t3 = M(-xk, yk, z1);
            Vector3 h0 = M(0f, KattoY(0f), z0), h1 = M(0f, KattoY(0f), z1);
            r.NelioUlos(v3, v2, t2, t3, Vector3.forward, KattoReuna);
            r.NelioUlos(v1, v0, t0, t1, Vector3.back, KattoReuna);
            r.NelioUlos(v2, v1, t1, t2, Vector3.right, KattoReuna);
            r.NelioUlos(v0, v3, t3, t0, Vector3.left, KattoReuna);
            r.NelioUlos(t0, h0, h1, t3, Vector3.up, KattoVari);
            r.NelioUlos(h0, t1, t2, h1, Vector3.up, KattoVari);
            r.KolmioUlos(t3, h1, t2, Vector3.forward, KattoReuna);
            r.KolmioUlos(t0, t1, h0, Vector3.back, KattoReuna);
            r.LopetaOsa();
            if (!kauko)
                r.Tanko(M(-0.0045f, KattoY(-0.0045f) - 0.0003f, -0.0150f), M(-0.0045f, KattoY(-0.0045f) + 0.0042f, -0.0152f), 0.00065f, 0.0006f, 5, PiippuVari, true);
        }

        /// <summary>Maston piste korkeudella y (keulamasto hieman taaksepäin kallellaan).</summary>
        static Vector3 MastoPiste(float z, float y, float kallistus) => new Vector3(0f, y, z - (y - KansiTaso(z, 0f)) * kallistus);

        /// <summary>
        /// Keulamasto punaisella viirillä, etuharus keulapuuhun ja vantit; mesaani vantteineen, puomi ja peräpuomi (boomkin)
        /// sekä kaareva parkittu tukipurje (vatsa vasemmalle, verkko on oikealla) tummalla takaliikillä. Köydet
        /// kolmisivuisina tankoina paloina ääriviivarajan alle (säde 0,0008); jokainen pää on mastossa, kaiteella tai puussa.
        /// </summary>
        static void Mastot(MeriRakentaja r, bool kauko)
        {
            int sivuja = kauko ? 4 : 5;
            const float kk = 0.03f, km = 0.02f;
            var km0 = MastoPiste(ZKeulamasto, KansiTaso(ZKeulamasto, 0f) - 0.0003f, kk);
            var kmHuippu = MastoPiste(ZKeulamasto, 0.062f, kk);
            r.Tanko(M(km0), M(kmHuippu), 0.0011f, 0.0007f, sivuja, MastoVari, true);
            // Viiri liehuu taakse ja hieman oikealle (kaksi aaltoa).
            var y0 = kmHuippu + new Vector3(0f, -0.0006f, -0.0003f);
            var a0 = y0 + new Vector3(0f, -0.0024f, 0.0002f);
            var y1 = y0 + new Vector3(0.0008f, 0.0002f, -0.0045f);
            var a1 = a0 + new Vector3(0.0008f, 0.0006f, -0.0040f);
            var karki = y0 + new Vector3(0.0004f, -0.0008f, -0.0088f);
            r.AloitaOsa();
            r.Kalvo(M(y0), M(y1), M(a1), M(a0), MeriRakentaja.Punainen);
            if (!kauko) r.KalvoKolmio(M(y1), M(karki), M(a1), MeriRakentaja.Punainen);
            r.LopetaOsa();

            var mm0 = MastoPiste(ZMesaani, KansiTaso(ZMesaani, 0f) - 0.0003f, km);
            var mmHuippu = MastoPiste(ZMesaani, 0.047f, km);
            r.Tanko(M(mm0), M(mmHuippu), 0.0009f, 0.0006f, sivuja, MastoVari, true);
            // Mesaanin puomi ja peräpuomi.
            var puomiTyvi = MastoPiste(ZMesaani, 0.0140f, km) + new Vector3(0f, 0f, -0.0008f);
            var puomiPaa = new Vector3(0f, 0.0148f, -0.0590f);
            Pala(r, puomiTyvi, puomiPaa, 0.0007f, 0.0006f, kauko ? 3 : 4, PuomiVari);
            if (!kauko)
                Pala(r, new Vector3(0f, Kansi(ZPera) + 0.0004f, ZPera + 0.0006f), new Vector3(0f, 0.0132f, -0.0604f), 0.0006f, 0.0006f, 3, PuomiVari);
            // Tukipurje: kolmio (halssi mastossa, huippu maston latvassa, kulma puomin päässä), vatsa vasemmalle.
            var halssi = MastoPiste(ZMesaani, 0.0152f, km) + new Vector3(0f, 0f, -0.0010f);
            var huippu = MastoPiste(ZMesaani, 0.0452f, km) + new Vector3(0f, 0f, -0.0008f);
            var kulma = puomiPaa + new Vector3(0f, 0.0008f, 0.0006f);
            // Kaksi pystykaistaa omina osinaan (kaistan a-väli jalkaliikistä takaliikkiin, sama z molemmissa, koska etuliike on
            // maston suuntainen), kumpikin vaakasuunnassa alle 0,012 eikä saa ääriviivaa: pystysuoran kalvon vaakasuunnassa
            // kasvatettu ääriviiva näkyisi purjeen takana harmaana laattana. Muoto erottuu rampista ja tummasta takaliikistä.
            const float syvyys = 0.0021f;
            int np = kauko ? 1 : 2;
            for (int kaista = 0; kaista < 2; kaista++)
            {
                float aa = 0.5f * kaista;
                r.Pinta((u, v) =>
                    {
                        float a = aa + 0.5f * u;
                        var ala = halssi + (kulma - halssi) * a;
                        var yla = huippu + (kulma - huippu) * a;
                        var p = Vector3.Lerp(ala, yla, v);
                        float vatsa = Mathf.Sin(Mathf.PI * Mathf.Pow(Mathf.Clamp01(a), 0.8f)) * Mathf.Pow(Mathf.Max(0f, Mathf.Sin(Mathf.PI * (0.1f + 0.8f * v))), 0.8f) * (1f - 0.5f * v * a);
                        return M(p + new Vector3(-syvyys * vatsa, 0f, 0f));
                    },
                    np, kauko ? 2 : 4, (u, v) => PurjeVari, true);
            }
            if (kauko) return;
            // Takaliike (purjeen takareuna) tummana köytenä huipusta kulmaan.
            Pala(r, huippu + new Vector3(0f, -0.0004f, -0.0002f), kulma + new Vector3(0f, 0.0003f, 0.0002f), 0.0008f, 0.0008f, 3, KoysiVari);

            // Köydet.
            const float rk = 0.0008f;
            Pala(r, MastoPiste(ZKeulamasto, 0.0595f, kk), new Vector3(0f, Kansi(ZKeula) + 0.0014f, ZKeula - 0.0003f), rk, rk, 3, KoysiVari);
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                const float zv = 0.0265f, zm = -0.0395f;
                Pala(r, MastoPiste(ZKeulamasto, 0.052f, kk), new Vector3(p * (Puolileveys(zv) + 0.0001f), Kansi(zv) + 0.0005f, zv), rk, rk, 3, KoysiVari);
                Pala(r, MastoPiste(ZMesaani, 0.0425f, km), new Vector3(p * (Puolileveys(zm) + 0.0001f), Kansi(zm) + 0.0005f, zm), rk, rk, 3, KoysiVari);
            }
        }

        /// <summary>
        /// Pyydykset: verkkorulla haarukoineen oikealla reunalistalla, verkko nousee vedestä rullalle (pystysuora kiertyvä
        /// verkkokolmio, yläreunassa tumma kohoköysi) ja laskee rullalta ammeeseen, verkkoamme puusta (kasa ja kohoja päällä) ja
        /// kolme kalalaatikkoa vasemmalla.
        /// </summary>
        static void Pyydys(MeriRakentaja r, bool kauko)
        {
            // Rulla: akseli reunalistan suuntaan.
            var akseli = new Vector3(-0.08f, 0f, 1f).normalized * 0.0023f;
            r.Tanko(M(Rulla - akseli), M(Rulla + akseli), RullaSade, RullaSade, kauko ? 4 : 6, RullaVari, true);
            if (!kauko)
                for (int k = 0; k < 2; k++)
                {
                    var paa = Rulla + akseli * (k == 0 ? -1.2f : 1.2f);
                    r.Tanko(M(paa - new Vector3(0f, 0.0017f, 0f)), M(paa + new Vector3(0f, 0.0004f, 0f)), 0.0005f, 0.0005f, 3, RullaVari, true);
                }
            // Verkko nousee vedestä rullalle pystysuorana kolmiona: yläreuna on kohoköysi (rullalta verkon vesikohtaan Pinta0,
            // tumma köysi), alareuna painoköysi (rullalta jyrkästi veteen rungon vieressä). Märkä verkko vaaleampana. Painoköysi
            // kiertyy sivulle (verkko kiertyy noustessaan), joten kolmio näkyy myös verkon suunnasta katsottuna.
            int nj = kauko ? 1 : 3;
            var pohja = new Vector3(Rulla.x, 0.0002f, Rulla.z) + VerkkoSuunta * 0.0030f - VerkkoSivu * 0.0030f;
            for (int i = 0; i < nj; i++)
            {
                float f0 = i / (float)nj, f1 = (i + 1) / (float)nj;
                Vector3 y0 = NousuPiste(f0) - new Vector3(0f, 0.0004f, 0f), y1 = NousuPiste(f1) - new Vector3(0f, 0.0004f, 0f);
                var ylin = NousuPiste(0f) - new Vector3(0f, 0.0006f, 0f);
                Vector3 a0 = Vector3.Lerp(ylin, pohja, f0) - VerkkoSivu * (0.0012f * Mathf.Sin(Mathf.PI * f0)), a1 = Vector3.Lerp(ylin, pohja, f1) - VerkkoSivu * (0.0012f * Mathf.Sin(Mathf.PI * f1));
                r.Kalvo(M(y0), M(y1), M(a1), M(a0), VerkkoVari);
            }
            if (!kauko)
                for (int i = 0; i < 2; i++)
                    Pala(r, NousuPiste(0.5f * i), NousuPiste(0.5f * i + 0.5f), 0.0008f, 0.0008f, 3, KoysiVari);
            // Verkko rullalta ammeeseen (kaari).
            var alku = Rulla + VerkkoSuunta * (-0.6f * RullaSade) + new Vector3(0f, 0.8f * RullaSade, 0f);
            var loppu = Amme + new Vector3(0.0012f, AmmeKorkeus + 0.0010f, -0.0006f);
            var sivu = Vector3.Cross(Vector3.up, loppu - alku).normalized;
            int na = kauko ? 1 : 3;
            for (int i = 0; i < na; i++)
            {
                float f0 = i / (float)na, f1 = (i + 1) / (float)na;
                Vector3 p0 = Vector3.Lerp(alku, loppu, f0) + new Vector3(0f, 0.0010f * Mathf.Sin(Mathf.PI * f0), 0f);
                Vector3 p1 = Vector3.Lerp(alku, loppu, f1) + new Vector3(0f, 0.0010f * Mathf.Sin(Mathf.PI * f1), 0f);
                r.Kalvo(M(p0 - sivu * 0.0011f), M(p1 - sivu * 0.0013f), M(p1 + sivu * 0.0013f), M(p0 + sivu * 0.0011f), VerkkoVari);
            }
            // Amme: ulkopinta, sisäpinta, reuna ja verkkokasa.
            int n = kauko ? 6 : 8;
            for (int i = 0; i < n; i++)
            {
                float k0 = i * 2f * Mathf.PI / n, k1 = (i + 1) * 2f * Mathf.PI / n, km = 0.5f * (k0 + k1);
                Vector3 s0 = new Vector3(Mathf.Cos(k0), 0f, Mathf.Sin(k0)), s1 = new Vector3(Mathf.Cos(k1), 0f, Mathf.Sin(k1)), sm = new Vector3(Mathf.Cos(km), 0f, Mathf.Sin(km));
                Vector3 pa0 = Amme + s0 * (0.92f * AmmeSade), pa1 = Amme + s1 * (0.92f * AmmeSade);
                Vector3 ra0 = Amme + s0 * AmmeSade + new Vector3(0f, AmmeKorkeus, 0f), ra1 = Amme + s1 * AmmeSade + new Vector3(0f, AmmeKorkeus, 0f);
                Vector3 ri0 = Amme + s0 * (AmmeSade - 0.0005f) + new Vector3(0f, AmmeKorkeus, 0f), ri1 = Amme + s1 * (AmmeSade - 0.0005f) + new Vector3(0f, AmmeKorkeus, 0f);
                r.NelioUlos(M(pa0), M(pa1), M(ra1), M(ra0), sm, AmmeVari);
                r.NelioUlos(M(ra0), M(ra1), M(ri1), M(ri0), Vector3.up, AmmeReuna);
                if (!kauko)
                {
                    Vector3 ia0 = Amme + s0 * (AmmeSade - 0.0005f) + new Vector3(0f, 0.0018f, 0f), ia1 = Amme + s1 * (AmmeSade - 0.0005f) + new Vector3(0f, 0.0018f, 0f);
                    r.NelioUlos(M(ri0), M(ri1), M(ia1), M(ia0), -sm, AmmeSisa);
                }
            }
            // Verkkokasa: kupera, epätasainen keko ammeen reunan yläpuolelle.
            var kasa = Amme + new Vector3(0f, AmmeKorkeus - 0.0008f, 0f);
            r.Pinta((u, v) =>
                {
                    float k = u * 2f * Mathf.PI, rr = (AmmeSade - 0.0004f) * (1f - v) * (1f + 0.08f * Mathf.Sin(3f * k + 1f) * (1f - v));
                    return M(kasa + new Vector3(Mathf.Cos(k) * rr, 0.0024f * Mathf.Pow(Mathf.Sin(0.5f * Mathf.PI * v), 0.7f) + 0.0004f * Mathf.Sin(5f * k) * v * (1f - v), Mathf.Sin(k) * rr));
                },
                kauko ? 5 : 8, kauko ? 1 : 2, (u, v) => KasaVari, false, (u, v) => Vector3.up);
            if (!kauko)
                for (int i = 0; i < 3; i++)
                {
                    float k = 1.1f + 2.1f * i;
                    r.Pallo(M(kasa + new Vector3(Mathf.Cos(k) * 0.0018f, 0.0020f - 0.0003f * i, Mathf.Sin(k) * 0.0018f)), 0.00095f, KasaKoho, 0);
                }
            // Kalalaatikot vasemmalla laidalla: puulaatikot, saalis vaaleana keskellä.
            Laatikko(r, new Vector3(-0.0068f, KansiTaso(0.0185f, -0.0068f) - 0.0002f, 0.0185f), new Vector3(0.0068f, 0.0032f, 0.0050f), kauko);
            if (kauko) return;
            Laatikko(r, new Vector3(-0.0062f, KansiTaso(0.0248f, -0.0062f) - 0.0002f, 0.0248f), new Vector3(0.0064f, 0.0032f, 0.0048f), false);
            Laatikko(r, new Vector3(-0.0060f, KansiTaso(0.0248f, -0.0062f) + 0.0030f, 0.0246f), new Vector3(0.0062f, 0.0030f, 0.0046f), false);
        }

        static void Laatikko(MeriRakentaja r, Vector3 p, Vector3 koko, bool kauko)
        {
            r.Laatikko(M(p), koko, LaatikkoVari, LaatikkoReuna);
            if (kauko) return;
            float y = p.y + koko.y + 0.00006f, x = 0.5f * koko.x - 0.0006f, z = 0.5f * koko.z - 0.0006f;
            r.NelioUlos(M(p.x - x, y, p.z - z), M(p.x + x, y, p.z - z), M(p.x + x, y, p.z + z), M(p.x - x, y, p.z + z), Vector3.up, SaalisVari);
        }

        /// <summary>
        /// Kannen varusteet lähikuvaan (ei kaukotasossa): keulakannella ankkurivinssi (jalusta ja rumpu), peräkannella
        /// kalaruuman luukku vaalealla kannella ja ohjaamon vasemmassa seinässä punainen pelastusrengas ikkunoiden välissä.
        /// </summary>
        static void Varusteet(MeriRakentaja r)
        {
            const float zv = 0.040f;
            float yv = KansiTaso(zv, 0f) - 0.0002f;
            r.Laatikko(M(0f, yv, zv), new Vector3(0.0036f, 0.0014f, 0.0026f), Rampi(0.55f), Rampi(0.8f));
            r.Tanko(M(-0.0021f, yv + 0.0024f, zv), M(0.0021f, yv + 0.0024f, zv), 0.0010f, 0.0010f, 6, Rampi(0.34f), true);
            const float zl = -0.0281f;
            float yl = KansiTaso(zl, 0f) - 0.0002f;
            r.Laatikko(M(0f, yl, zl), new Vector3(0.0070f, 0.0017f, 0.0056f), Rampi(1.0f), Rampi(1.62f));
            // Pelastusrengas: litteä rengas (8 lohkoa) seinän pinnassa, punainen.
            var c = new Vector3(-OhjX - 0.00015f, 0.0151f, -0.0100f);
            const int n = 8;
            for (int i = 0; i < n; i++)
            {
                float k0 = i * 2f * Mathf.PI / n, k1 = (i + 1) * 2f * Mathf.PI / n;
                Vector3 d0 = new Vector3(0f, Mathf.Sin(k0), Mathf.Cos(k0)), d1 = new Vector3(0f, Mathf.Sin(k1), Mathf.Cos(k1));
                r.NelioUlos(M(c + d0 * 0.0009f), M(c + d1 * 0.0009f), M(c + d1 * 0.0016f), M(c + d0 * 0.0016f), Vector3.left, MeriRakentaja.Punainen);
            }
        }

        /// <summary>Verkon yläreuna vedestä rullalle: f 0 rullan päällä … 1 vedessä (Pinta0), loiva painuma.</summary>
        static Vector3 NousuPiste(float f)
        {
            var a = Rulla + VerkkoSuunta * (0.6f * RullaSade) + new Vector3(0f, 0.8f * RullaSade, 0f);
            var e = Pinta0 + new Vector3(0f, 0.0003f, 0f);
            var p = Vector3.Lerp(a, e, f);
            p.y = a.y * Mathf.Pow(Mathf.Max(0f, 1f - f), 0.85f) + e.y * f;
            return p;
        }

        /// <summary>
        /// Kalastaja rullan ääressä (ei ääriviivaa: osat ovat pieniä): tummat housut ja saappaat, punainen öljytakki, kädet
        /// ojennettuina verkkoon rullan yllä, kasvot ja punainen sydvesti; nojaa 18° eteen rullaa kohti.
        /// </summary>
        static void KalastajaHahmo(MeriRakentaja r, bool kauko)
        {
            var asento = Quaternion.Euler(KalastajaNoja, KalastajaSuunta, 0f);
            const float koko = 1.12f;
            System.Func<Vector3, Vector3> H = l => M(Kalastaja + asento * (l * koko));
            var pun = MeriRakentaja.Punainen;
            Kappale(r, H, new Vector3(-0.0011f, 0f, -0.0007f), new Vector3(0.0011f, 0.0058f, 0.0007f), HousuVari, HousuVari);
            Kappale(r, H, new Vector3(-0.0015f, 0.0054f, -0.0010f), new Vector3(0.0015f, 0.0104f, 0.0010f), pun, pun);
            if (kauko)
            {
                Kappale(r, H, new Vector3(-0.0009f, 0.0104f, -0.0009f), new Vector3(0.0009f, 0.0124f, 0.0009f), NaamaVari, pun);
                return;
            }
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                r.Tanko(H(new Vector3(p * 0.0016f, 0.0098f, 0.0002f)), H(new Vector3(p * 0.0009f, 0.0074f, 0.0046f)), 0.00055f * koko, 0.0005f * koko, 4, pun, true);
            }
            r.Pallo(H(new Vector3(0f, 0.0115f, 0.0003f)), 0.0010f * koko, NaamaVari, 0);
            // Sydvesti: lieri ja kupu.
            var lieri = new Vector3(0f, 0.0122f, 0.0000f);
            const int n = 8;
            for (int i = 0; i < n; i++)
            {
                float k0 = i * 2f * Mathf.PI / n, k1 = (i + 1) * 2f * Mathf.PI / n;
                Vector3 s0 = new Vector3(Mathf.Cos(k0), 0f, Mathf.Sin(k0)), s1 = new Vector3(Mathf.Cos(k1), 0f, Mathf.Sin(k1));
                float taka0 = s0.z < 0f ? 1.25f : 1f, taka1 = s1.z < 0f ? 1.25f : 1f;
                r.KolmioUlos(H(lieri + s0 * (0.0018f * taka0) + new Vector3(0f, -0.0003f * taka0, 0f)), H(lieri + s1 * (0.0018f * taka1) + new Vector3(0f, -0.0003f * taka1, 0f)),
                    H(lieri + new Vector3(0f, 0.0004f, 0f)), asento * Vector3.up, pun);
                r.KolmioUlos(H(lieri + s0 * 0.0010f + new Vector3(0f, 0.0002f, 0f)), H(lieri + s1 * 0.0010f + new Vector3(0f, 0.0002f, 0f)),
                    H(lieri + new Vector3(0f, 0.0014f, 0f)), asento * (s0 + s1 + Vector3.up), pun);
            }
        }

        /// <summary>Suunnattu laatikko: kulmat paikallisessa avaruudessa (min, max) muunnoksella H; sivut ja katto.</summary>
        static void Kappale(MeriRakentaja r, System.Func<Vector3, Vector3> H, Vector3 a, Vector3 b, Color sivu, Color katto)
        {
            var c = 0.5f * (a + b);
            Vector3 p000 = new Vector3(a.x, a.y, a.z), p100 = new Vector3(b.x, a.y, a.z), p110 = new Vector3(b.x, a.y, b.z), p010 = new Vector3(a.x, a.y, b.z);
            var up = new Vector3(0f, b.y - a.y, 0f);
            var keski = H(c);
            void Seina(Vector3 q0, Vector3 q1, Color v) => r.NelioUlos(H(q0), H(q1), H(q1 + up), H(q0 + up), H(0.5f * (q0 + q1) + 0.5f * up) - keski, v);
            r.AloitaOsa();
            Seina(p000, p100, sivu); Seina(p100, p110, sivu); Seina(p110, p010, sivu); Seina(p010, p000, sivu);
            r.NelioUlos(H(p000 + up), H(p100 + up), H(p110 + up), H(p010 + up), H(c + up) - keski, katto);
            r.LopetaOsa();
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
                r.Tanko(M(a + d * q0), M(a + d * q1), Mathf.Lerp(r0, r1, q0), Mathf.Lerp(r0, r1, q1), sivuja, vari, false);
            }
        }

        /// <summary>Vesikerroksen nauha käyrää pitkin (käyrä valmiiksi verkon koordinaateissa).</summary>
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

        static Vector3 Sivu(System.Func<float, Vector3> kaari, float q)
        {
            var t = kaari(Mathf.Min(1f, q + 0.01f)) - kaari(Mathf.Max(0f, q - 0.01f));
            t.y = 0f;
            return Vector3.Cross(Vector3.up, t).normalized;
        }

        /// <summary>Vesinelikulmio, jonka kolmiot osoittavat aina ylös.</summary>
        static void NelioVesi(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color ca, Color cb, Color cd, Color ce)
        {
            if (Vector3.Cross(b - a, d - a).y + Vector3.Cross(d - a, e - a).y >= 0f) r.NelioVarit(a, b, d, e, ca, cb, cd, ce);
            else r.NelioVarit(a, e, d, b, ca, ce, cd, cb);
        }

        /// <summary>Vesikerroksen rengas: vaalea harja säteellä rKeski, häipyy molemmin puolin leveyden matkalla; harjan
        /// peitto ja säde vaihtelevat kehällä (ei tasaista "valintarengasta").</summary>
        static void Harja(MeriRakentaja r, Vector3 c, float rKeski, float leveys, Color vari, float a, int n)
        {
            for (int i = 0; i < n; i++)
            {
                float k0 = i * 2f * Mathf.PI / n, k1 = (i + 1) * 2f * Mathf.PI / n;
                float r0 = rKeski * (1f + 0.05f * Mathf.Sin(3f * k0 + 0.7f)), r1 = rKeski * (1f + 0.05f * Mathf.Sin(3f * k1 + 0.7f));
                Vector3 d0 = new Vector3(Mathf.Cos(k0), 0f, Mathf.Sin(k0)), d1 = new Vector3(Mathf.Cos(k1), 0f, Mathf.Sin(k1));
                Color c0 = MeriRakentaja.Alfa(vari, 0f);
                Color m0 = MeriRakentaja.Alfa(vari, a * (0.7f + 0.3f * Mathf.Sin(2f * k0 + 1.3f))), m1 = MeriRakentaja.Alfa(vari, a * (0.7f + 0.3f * Mathf.Sin(2f * k1 + 1.3f)));
                NelioVesi(r, c + d0 * (r0 - leveys), c + d1 * (r1 - leveys), c + d1 * r1, c + d0 * r0, c0, c0, m1, m0);
                NelioVesi(r, c + d0 * r0, c + d1 * r1, c + d1 * (r1 + leveys), c + d0 * (r0 + leveys), m0, m1, c0, c0);
            }
        }

        // ---- Lapset ----

        /// <summary>
        /// Lokki (Lapsi): valkoinen suippo vartalo (vinoneliön poikkileikkaus) ja pyrstöviuhka, harmaat pitkät kapeat siivet
        /// loivassa M-muodossa (kyynär- ja rannenivel koholla, käsisiipi taaksepäin), mustat kärjet. Rakennetaan 2,5-kertaisena
        /// (Animoi skaalaa takaisin), joten vartalon ja kummankin siiven ääriviiva on 0,48 pt. Siipiväli 0,034 ≈ 10 pt.
        /// </summary>
        public static Mesh Lapsi()
        {
            var r = new MeriRakentaja(ReunaMinimi);
            const float K = LokkiRakenne;
            float[] z = { -0.0036f, -0.0016f, 0.0006f, 0.0024f, 0.0036f, 0.0046f };
            float[] w = { 0.0007f, 0.0013f, 0.0012f, 0.0008f, 0.0009f, 0.00035f };
            float[] h = { 0.0006f, 0.0013f, 0.0013f, 0.0009f, 0.0010f, 0.00035f };
            float[] y = { 0.0000f, 0.0000f, 0.0001f, 0.0004f, 0.0006f, 0.0005f };
            var kulmat = new[] { new Vector2(0f, 1f), new Vector2(1f, 0f), new Vector2(0f, -1f), new Vector2(-1f, 0f) };
            r.AloitaOsa();
            for (int i = 0; i + 1 < z.Length; i++)
                for (int j = 0; j < 4; j++)
                {
                    var c0 = kulmat[j]; var c1 = kulmat[(j + 1) % 4];
                    Vector3 a = new Vector3(c0.x * w[i], y[i] + c0.y * h[i], z[i]) * K, b = new Vector3(c0.x * w[i + 1], y[i + 1] + c0.y * h[i + 1], z[i + 1]) * K;
                    Vector3 d = new Vector3(c1.x * w[i + 1], y[i + 1] + c1.y * h[i + 1], z[i + 1]) * K, e = new Vector3(c1.x * w[i], y[i] + c1.y * h[i], z[i]) * K;
                    r.NelioUlos(a, b, d, e, new Vector3(c0.x + c1.x, c0.y + c1.y, 0f), i == 4 ? NokkaVari : LokkiVartalo);
                }
            // Nokan kärki ja takapään kansi.
            var karki = new Vector3(0f, 0.0004f, 0.0058f) * K;
            for (int j = 0; j < 4; j++)
            {
                var c0 = kulmat[j]; var c1 = kulmat[(j + 1) % 4];
                r.KolmioUlos(new Vector3(c0.x * w[5], y[5] + c0.y * h[5], z[5]) * K, new Vector3(c1.x * w[5], y[5] + c1.y * h[5], z[5]) * K, karki,
                    new Vector3(c0.x + c1.x, c0.y + c1.y, 1f), NokkaVari);
            }
            // Pyrstö: kaksipuolinen viuhka takapään kanteen.
            r.Kalvo(new Vector3(-0.0007f, 0.0001f, -0.0034f) * K, new Vector3(0.0007f, 0.0001f, -0.0034f) * K,
                new Vector3(0.0014f, 0.0002f, -0.0064f) * K, new Vector3(-0.0014f, 0.0002f, -0.0064f) * K, LokkiVartalo);
            r.LopetaOsa();
            // Siivet: olkapää, kyynärnivel, ranne, käsisiiven puoliväli ja kärki (etureuna, takareuna).
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                Vector3 V(float x, float yy, float zz) => new Vector3(p * x, yy, zz) * K;
                Vector3 oE = V(0.0010f, 0.0004f, 0.0012f), oT = V(0.0010f, 0.0004f, -0.0024f);
                Vector3 kE = V(0.0046f, 0.0036f, 0.0012f), kT = V(0.0046f, 0.0036f, -0.0027f);
                Vector3 rE = V(0.0080f, 0.0060f, 0.0007f), rT = V(0.0080f, 0.0060f, -0.0024f);
                Vector3 hE = V(0.0116f, 0.0063f, -0.0007f), hT = V(0.0116f, 0.0063f, -0.0032f);
                Vector3 kr = V(0.0168f, 0.0050f, -0.0052f);
                r.AloitaOsa();
                r.Kalvo(oE, kE, kT, oT, LokkiSiipi);
                r.Kalvo(kE, rE, rT, kT, LokkiSiipi);
                r.Kalvo(rE, hE, hT, rT, LokkiSiipi);
                r.KalvoKolmio(hE, kr, hT, LokkiKarki);
                r.LopetaOsa();
            }
            return r.Verkko("kalastusvene-lokki");
        }

        /// <summary>
        /// Pallo (Lapsi2): kerran jaettu oktaedri (32 tahkoa), yläpuolisko tumma (koho, kalan selkä) ja alapuolisko vaalea
        /// (roiske, kun pallo käännetään). Rakennettu varren päähän (0, −Varsi, 0): katso Ripusta. Ei ääriviivaa (pieni).
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja(ReunaMinimi);
            var c = new Vector3(0f, -Varsi, 0f);
            const float R = 0.0020f;
            var kulmat = new[] { Vector3.up, Vector3.forward, Vector3.right, Vector3.back, Vector3.left, -Vector3.up };
            r.AloitaOsa();
            for (int i = 0; i < 4; i++)
            {
                var s0 = kulmat[1 + i]; var s1 = kulmat[1 + (i + 1) % 4];
                for (int k = 0; k < 2; k++)
                {
                    Vector3 a = k == 0 ? kulmat[0] : kulmat[5], b = k == 0 ? s1 : s0, d = k == 0 ? s0 : s1;
                    var ab = (a + b).normalized; var bd = (b + d).normalized; var da = (d + a).normalized;
                    PalloKolmio(r, c, R, a, ab, da); PalloKolmio(r, c, R, ab, b, bd); PalloKolmio(r, c, R, da, bd, d); PalloKolmio(r, c, R, ab, bd, da);
                }
            }
            r.LopetaOsa();
            return r.Verkko("kalastusvene-pallo");
        }

        static void PalloKolmio(MeriRakentaja r, Vector3 c, float R, Vector3 a, Vector3 b, Vector3 d)
        {
            var m = a + b + d;
            r.KolmioUlos(c + a * R, c + b * R, c + d * R, m, m.y > 0f ? PalloYla : PalloAla);
        }

        /// <summary>Väreen rengas (Lapsi3, vesikerros): vaalea harja säteellä 0,0086, häipyy 0,0072–0,0100; varren päässä.</summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            Harja(r, new Vector3(0f, -Varsi, 0f), 0.0088f, 0.0011f, MeriRakentaja.Vaahto, 0.55f, 14);
            r.Vesi = false;
            return r.Verkko("kalastusvene-rengas");
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        static float Arvo(int n, int k) => Aikataulu.Arvo(n, k);
        static float Arpa(int n, int i, int k) => MeriGeometria.Arpa(917 + n, i, k);
        static int KattoInt(float x) { int i = (int)x; return x > i ? i + 1 : i; }

        /// <summary>∫ₐˢ smoothstep((σ − a) / L) dσ.</summary>
        static float Liuku(float s, float a, float L)
        {
            if (s <= a) return 0f;
            float x = (s - a) / L;
            if (x >= 1f) return 0.5f * L + (s - a - L);
            return L * (x * x * x - 0.5f * x * x * x * x);
        }

        /// <summary>∫ₐˢ sin²(π(σ − a) / D) dσ (tauko, jonka aikana veto pysähtyy hetkeksi).</summary>
        static float TaukoInt(float s, float a, float D)
        {
            if (s <= a) return 0f;
            if (s >= a + D) return 0.5f * D;
            float x = s - a;
            return 0.5f * x - D / (4f * Mathf.PI) * Mathf.Sin(2f * Mathf.PI * x / D);
        }

        /// <summary>
        /// Vetoaika τ(s) = ∫ vetoa(σ) dσ ja vetoa(s) ∈ [0, 1]: veto alkaa 1,0 s:sta (1,2 s:n pehmeä alku), hiipuu 3,4 s ennen loppua,
        /// ja kaksi taukoa (kumpikin 80 %:ssa näytöksistä, 1,2–2,5 s) keskellä, kun kalastaja irrottaa kalan verkosta.
        /// </summary>
        static float VetoAika(int n, float s, float pituus, out float vetoa)
        {
            const float a0 = 1.0f, L0 = 1.2f, L1 = 1.6f;
            float b = pituus - 3.4f;
            float tau = Liuku(s, a0, L0) - Liuku(s, b, L1);
            float nyt = Mathf.SmoothStep(0f, 1f, (s - a0) / L0) - Mathf.SmoothStep(0f, 1f, (s - b) / L1);
            for (int i = 0; i < 2; i++)
            {
                if (Arvo(n, 16 + i) > 0.8f) continue;
                float a = pituus * (0.26f + 0.3f * i) + 1.5f * Arvo(n, 18 + i), D = 1.2f + 1.3f * Arvo(n, 20 + i);
                tau -= TaukoInt(s, a, D);
                if (s > a && s < a + D) { float w = Mathf.Sin(Mathf.PI * (s - a) / D); nyt -= w * w; }
            }
            vetoa = Mathf.Clamp01(nyt);
            return tau;
        }

        /// <summary>Kohojen väli verkossa, ensimmäisen kohon paikka näytöksen alussa ja polun loppu ammeessa (etäisyys rullasta).</summary>
        const float Vali = 0.0150f, TEka = 0.0035f, TAmme = -0.0120f;

        static float KohoT(int n, int j, float veto) => TEka + j * Vali + (Arpa(n, j, 5) - 0.5f) * 0.3f * Vali - veto;

        /// <summary>Verkon piste vedessä vaakaetäisyydellä t rullalta (runkokoordinaatit): kevyt kaari siemenestä.</summary>
        static Vector3 VerkkoVedessa(float t, float kaari)
        {
            float q = Mathf.Max(0f, t - TVesi);
            return new Vector3(Rulla.x, 0f, Rulla.z) + VerkkoSuunta * t + VerkkoSivu * (kaari * q * q);
        }

        /// <summary>Vaakatason (maailman) piste h (runkokoordinaatit ilman keinuntaa) roottorin avaruuteen.</summary>
        static Vector3 Taso(Quaternion suoraan, float nousu, Vector3 h) => suoraan * (h - new Vector3(0f, nousu, 0f)) - Origo;

        /// <summary>
        /// Varren päähän rakennetun lapsen (pallo, rengas; verkossa kohdassa (0, −Varsi, 0)) asetus: kohteen keskipiste m roottorin
        /// avaruudessa, pystyssä roottorin avaruudessa, kierto oman pystyakselin ympäri (kulma °) ja skaala sk. λ = 0: kääntöpiste
        /// roottorin y-akselilla, joten lapsi on jäykästi kiinni rungossa myös ElavatElementitin kallistuksessa (varsi kallistuu
        /// kohdetta kohti enintään noin 10°); λ = 1: kääntöpiste suoraan kohteen yläpuolella (tavallinen lapsi omassa
        /// vesipisteessään). kaanna: pallo ylösalaisin (vaalea puoli ylös), vain λ = 1.
        /// </summary>
        static void Ripusta(Transform c, Vector3 m, float lambda, float kulma, Vector3 sk, bool kaanna)
        {
            float varsi = Varsi * sk.y;
            if (kaanna)
            {
                c.localPosition = new Vector3(m.x, m.y - varsi, m.z);
                c.localRotation = Quaternion.Euler(180f, kulma, 0f);
                c.localScale = sk;
                return;
            }
            float hx = (1f - lambda) * m.x, hz = (1f - lambda) * m.z;
            float hd = Mathf.Sqrt(hx * hx + hz * hz);
            if (hd > 0.5f * varsi) { float k = 0.5f * varsi / hd; hx *= k; hz *= k; hd = 0.5f * varsi; }
            float vy = Mathf.Sqrt(varsi * varsi - hd * hd);
            float beta = Mathf.Atan2(hx, hz) * Mathf.Rad2Deg, alfa = -Mathf.Atan2(hd, vy) * Mathf.Rad2Deg;
            c.localPosition = new Vector3(m.x - hx, m.y + vy, m.z - hz);
            c.localRotation = Quaternion.Euler(0f, beta, 0f) * Quaternion.Euler(alfa, 0f, 0f) * Quaternion.Euler(0f, kulma - beta, 0f);
            c.localScale = sk;
        }

        static void Piilota(Transform c) { c.localScale = Vector3.zero; c.localPosition = Vector3.zero; c.localRotation = Quaternion.identity; }

        /// <summary>
        /// Siivenisku h ∈ [−1, 1] (1 siivet ylhäällä, −1 alhaalla): liito-asento `liito` ja siemenestä 2,4 s:n jaksoittain
        /// 2–5 iskun sarja 3,0–4,4 Hz satunnaisessa kohdassa (joka neljäs jakso pelkkää liitoa); `pakko` 0–1 sekoittaa
        /// jatkuvan iskun taajuudella `taajuus` (lähtö, jarrutus). Sarjat alkavat ja päättyvät siivet ylhäällä, sekoitus pehmeä.
        /// </summary>
        static float Isku(int n, int g, float s, float liito, float pakko, float taajuus)
        {
            const float L = 2.4f;
            float h = liito;
            int seg = (int)(s / L);
            for (int d = -1; d <= 0; d++)
            {
                int sg = seg + d;
                if (sg < 0) continue;
                float r1 = Arpa(n, sg, 60 + g), r2 = Arpa(n, sg, 70 + g), r3 = Arpa(n, sg, 80 + g);
                if (r3 < 0.25f) continue;
                float f = 3.0f + 1.4f * r2;
                int iskuja = 2 + (int)(r1 * 3.99f);
                float b0 = sg * L + 0.15f + 1.1f * r3, kesto = iskuja / f;
                float e = Pehmea((s - b0) / 0.12f) * Pehmea((b0 + kesto - s) / 0.12f);
                if (e > 0f) h = Mathf.Lerp(h, Mathf.Cos(2f * Mathf.PI * f * (s - b0)), e);
            }
            if (pakko > 0f) h = Mathf.Lerp(h, Mathf.Cos(2f * Mathf.PI * taajuus * s), pakko);
            return h;
        }

        /// <summary>Lentävän lokin asetus: paikka ja kierto roottorin avaruudessa, siivenisku h (y-skaala |h|, alas 180°:n
        /// kierrolla pituusakselin ympäri, x-skaala lyhenee ääriasennoissa), taitto (x-skaala) ja koko.</summary>
        static void LokkiAseta(Transform c, Vector3 m, Quaternion q, float isku, float taitto, float koko)
        {
            if (koko < 0.001f) { Piilota(c); return; }
            c.localPosition = m;
            c.localRotation = isku < 0f ? q * Quaternion.Euler(0f, 0f, 180f) : q;
            float k = koko / LokkiRakenne, a = Mathf.Abs(isku);
            // Siiven ääriasennoissa (±40°) kärkiväli lyhenee ylhäältä katsottuna: isku näkyy myös pystykuvassa.
            c.localScale = new Vector3(taitto * (1f - 0.2f * a * Mathf.Sqrt(a)) * k, Mathf.Max(0.06f, a) * k, k);
        }

        /// <summary>Lokin kierto roottorin avaruudessa: suunta eteen (vaakatasossa), nokka alas nyok (°) ja kallistus (°).</summary>
        static Quaternion LokkiSuunta(Quaternion suoraan, Vector3 eteen, float nyok, float kallistus)
        {
            eteen.y = 0f;
            if (eteen.sqrMagnitude < 1e-10f) eteen = Vector3.forward;
            return suoraan * Quaternion.LookRotation(eteen, Vector3.up) * Quaternion.Euler(nyok, 0f, kallistus);
        }

        /// <summary>
        /// Näytös: vene on merellä (x −0,05…−0,085, z ±0,12 jaksosta) keula rannikon suuntaan etelään ±30° (verkko on aina
        /// oikealla eli merelle päin) ja ryömii hitaasti eteenpäin verkkoa pitkin. Keinunta siemenestä kahdella taajuudella,
        /// vedon aikana kallistus oikealle vetopuolelle ja keula painuu (käsivedon tahti näkyy). Verkkoa vedetään rullan yli:
        /// kohot tulevat vedestä virtana, nousevat rullalle ja putoavat ammeeseen, tippuvat pisarat tekevät väreitä; kaksi
        /// taukoa, kun kalastaja irrottaa kalaa. Lokki 1 kaartelee verkon yllä ja syöksähtää kahdesti pinnan tuntumaan, lokki 0
        /// saapuu kierteenä ja laskeutuu ohjaamon katolle (joskus lähtee lopussa). Harvinainen (noin 1/10): iso saalis, kolme
        /// lokkia lisää kaartelee verkon yllä ja syöksyy vuorotellen veteen (renkaat ja roiskeet), ja yksi nousee kala nokassa.
        /// Ei allokaatioita.
        /// </summary>
        public static void Animoi(Transform roottori, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            float u = s / pituus;

            // Suunta ja paikka: keula rannikon suuntaan etelään ±30°, verkko oikealla merelle päin.
            float suunta = 180f + (Arvo(n, 4) - 0.5f) * 60f + 3f * Mathf.Sin(t * 0.37f + n);
            var ohjaus = Quaternion.Euler(0f, suunta, 0f);
            float x0 = 0.05f + 0.035f * Arvo(n, 5), z0 = (Arvo(n, 6) - 0.5f) * 0.24f;
            float tau = VetoAika(n, s, pituus, out float vetoa);
            float tahti = 1.0f + 0.35f * Arvo(n, 15);
            float pulssi = 1f - 0.45f * Mathf.Cos(2f * Mathf.PI * tau / tahti);
            float matka = tau - 0.45f * tahti / (2f * Mathf.PI) * Mathf.Sin(2f * Mathf.PI * tau / tahti);
            float veto = (0.0034f + 0.0012f * Arvo(n, 11)) * matka;
            float vetaa = vetoa * pulssi;
            float ryomi = (0.0009f + 0.0005f * Arvo(n, 10)) * s;
            var paikka = new Vector3(-x0, 0f, z0) + ohjaus * new Vector3(0.004f * Pehmea(u), 0f, ryomi);

            // Keinunta: kaksi taajuutta, vedon aikana kallistus oikealle (+x alas) ja keula painuu.
            float vaihe = Arvo(n, 7) * 20f;
            float jakso = 3.8f + 1.4f * Arvo(n, 8), kulma = (s + vaihe) * 2f * Mathf.PI / jakso;
            float kallistus = (1.1f + 1.0f * Arvo(n, 12)) * (Mathf.Sin(kulma) + 0.35f * Mathf.Sin(1.73f * kulma + 1.3f)) + (1.4f + 1.0f * Arvo(n, 9)) * vetaa;
            float nyokkays = (0.45f + 0.4f * Arvo(n, 13)) * Mathf.Sin((s + vaihe) * 2f * Mathf.PI / (2.7f + 0.8f * Arvo(n, 14))) + 0.45f * vetaa;
            var keinunta = Quaternion.Euler(nyokkays, 0f, -kallistus);
            float nousu = 0.0005f * Mathf.Sin(s * 1.45f + vaihe) + 0.00025f * Mathf.Sin(s * 2.6f + 1f);
            var kierto = ohjaus * keinunta;
            roottori.localRotation = kierto;
            roottori.localPosition = paikka + new Vector3(0f, nousu, 0f) + kierto * Origo;
            roottori.localScale = Vector3.one;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var suoraan = Quaternion.Inverse(keinunta);

            // Kohot: jatkuva virta (lapsi k kantaa kohoja j = k + 8m), vedessä vaakatasossa, rungon lähellä jäykästi.
            float kaari = (Arvo(n, 23) - 0.5f) * 1.2f;
            for (int k = 0; k < Kohoja; k++)
            {
                int m = KattoInt(((veto + TAmme - TEka) / Vali - k) / Kohoja);
                if (m < 0) m = 0;
                int j = k + Kohoja * m;
                float tj = KohoT(n, j, veto);
                if (tj < TAmme) { j += Kohoja; tj = KohoT(n, j, veto); }
                KohoAseta(lapset[Lapsia + k], n, j, tj, s, kaari, suoraan, nousu);
            }

            // Tippuvat pisarat: väreet rungon ja verkon vesikohdan välissä vedon aikana (0,84 s:n kierto, neljä vaiheistettuna).
            for (int i = 0; i < Tippoja; i++)
            {
                var c = lapset[Lapsia + Lapsia2 + i];
                const float P = 0.84f, ika = 0.62f;
                float x = s / P + i / (float)Tippoja;
                int kierros = (int)x;
                float a = (x - kierros) * P;
                VetoAika(n, s - a, pituus, out float vb);
                if (a > ika || vb < 0.2f) { Piilota(c); continue; }
                float o1 = Arpa(n, kierros * Tippoja + i, 40), o2 = Arpa(n, kierros * Tippoja + i, 41);
                var h = new Vector3(Rulla.x, 0.0018f, Rulla.z) + VerkkoSuunta * (0.0022f + 0.0058f * o2) + VerkkoSivu * ((o1 - 0.5f) * 0.0024f);
                float w = a / ika, sk = (0.18f + 0.38f * (1f - (1f - w) * (1f - w))) * (0.7f + 0.3f * vb) * (0.8f + 0.4f * o1);
                Ripusta(c, h - Origo, 0f, 0f, new Vector3(sk, 1f, sk), false);
            }

            // Lokit.
            Laskeutuja(lapset[0], n, s, pituus, suoraan, nousu);
            Metsastaja(lapset[1], n, s, pituus, suoraan, nousu, kaari);
            var saalis = VerkkoVedessa(0.058f + 0.022f * Arvo(n, 40), kaari) + VerkkoSivu * (0.012f * (Arvo(n, 41) - 0.5f));
            int kalastaja = (int)(Arvo(n, 42) * 2.999f);
            var kala = lapset[Lapsia + Kala];
            Piilota(kala);
            for (int i = 0; i < Roiskeita; i++) Piilota(lapset[Lapsia + Kohoja + 1 + i]);
            for (int i = 0; i < 2; i++) Piilota(lapset[Lapsia + Lapsia2 + Tippoja + i]);
            for (int i = 0; i < 3; i++)
            {
                var lokki = lapset[2 + i];
                if (!harv) { Piilota(lokki); continue; }
                Syoksyja(lokki, kala, n, i, i == kalastaja, s, pituus, saalis, suoraan, nousu);
                // Osuma: rengas ja roiskeet 1,5 s / 0,8 s osumasta.
                float osumasta = s - SyoksyAlku(i, pituus) - 0.7f;
                var osuma = Osuma(saalis, i);
                if (osumasta >= 0f && osumasta < 1.5f)
                {
                    float w = osumasta / 1.5f, sk = 0.4f + 1.5f * (1f - (1f - w) * (1f - w));
                    Ripusta(lapset[Lapsia + Lapsia2 + Tippoja + (i % 2)], Taso(suoraan, nousu, osuma + new Vector3(0f, 0.0016f, 0f)), 1f, 40f * i + 25f, new Vector3(sk, 1f, 0.84f * sk), false);
                }
                if (osumasta >= 0f && osumasta < 0.8f)
                    for (int p = 0; p < Roiskeita; p++)
                    {
                        // 0: pystysuihku osumakohdassa (venytetty pallo), 1–2: sivuille lentävät pisarapilvet.
                        float kk = 2.4f * p + 1.3f * i + 0.6f, rr = p == 0 ? 0f : 0.0026f + 0.0062f * osumasta;
                        float nousuR = p == 0 ? 0.0042f : 0.0034f + 0.0016f * p;
                        var ph = osuma + new Vector3(Mathf.Cos(kk) * rr, nousuR * Mathf.Sin(Mathf.PI * osumasta / 0.8f) + 0.0006f, Mathf.Sin(kk) * rr);
                        float sk = (p == 0 ? 1.3f : 1.45f - 0.2f * p) * Pehmea(osumasta / 0.07f) * (1f - Pehmea((osumasta - 0.35f) / 0.45f));
                        if (sk < 0.02f) continue;
                        var skaala = p == 0 ? new Vector3(0.75f * sk, 2.1f * sk * (1f - 0.5f * osumasta), 0.75f * sk) : new Vector3(sk, 0.8f * sk, sk);
                        Ripusta(lapset[Lapsia + Kohoja + 1 + p], Taso(suoraan, nousu, ph), 1f, 70f * p, skaala, true);
                    }
            }
        }

        /// <summary>Kohon asetus etäisyydellä tj rullasta: vedessä (keinunta kumottu, keinuu omaan tahtiinsa), verkon mukana
        /// rullalle ja rullalta ammeeseen, jossa se painuu kasaan; kaukana päässä kasvaa näkyviin.</summary>
        static void KohoAseta(Transform c, int n, int j, float tj, float s, float kaari, Quaternion suoraan, float nousu)
        {
            float kaukana = TAmme + Kohoja * Vali;
            float koko = Pehmea((kaukana - 0.004f - tj) / 0.014f);
            float bob = 0.00045f * Mathf.Sin(2.3f * s + 1.7f * j) + 0.0002f * Mathf.Sin(3.7f * s + 0.9f * j);
            Vector3 m;
            if (tj >= TVesi)
            {
                float vedessa = Pehmea((tj - TVesi) / 0.010f);
                var h = VerkkoVedessa(tj, kaari) + VerkkoSivu * ((Arpa(n, j, 6) - 0.5f) * 0.0014f * vedessa) + new Vector3(0f, 0.0006f + bob, 0f);
                m = Vector3.Lerp(h - Origo, Taso(suoraan, nousu, h), vedessa);
            }
            else if (tj >= 0f)
            {
                float f = tj / TVesi;
                var p = NousuPiste(f);
                p.y += Mathf.Lerp(0.0015f, 0.0003f + bob, f * f);
                m = p - Origo;
            }
            else
            {
                float w = Mathf.Clamp01(tj / TAmme);
                var a = NousuPiste(0f) + new Vector3(0f, 0.0015f, 0f);
                var b = Amme + new Vector3(0.0004f, AmmeKorkeus + 0.0018f, 0.0002f);
                m = Vector3.Lerp(a, b, Pehmea(w)) + new Vector3(0f, 0.0038f * Mathf.Sin(Mathf.PI * w), 0f) - Origo;
                koko *= 1f - Pehmea((w - 0.55f) / 0.45f);
            }
            if (koko < 0.02f) { Piilota(c); return; }
            float d = Mathf.Sqrt(m.x * m.x + m.z * m.z);
            Ripusta(c, m, Pehmea((d - 0.024f) / 0.018f), 47f * j, new Vector3(koko, 0.68f * koko, koko), false);
        }

        /// <summary>
        /// Lokki 0: saapuu kierteenä (säde 0,14 → 0,045, korkeus 0,072 → 0,040) iskien ensin, liitää, laskeutuu jarruttaen
        /// katon kulmaan (roottorin origo: jäykkä myös kallistuksessa) ja taittaa siivet; istuessa kääntyilee. Kolmasosassa
        /// näytöksistä lähtee lopussa.
        /// </summary>
        static void Laskeutuja(Transform c, int n, float s, float pituus, Quaternion suoraan, float nousu)
        {
            float alku = pituus * (0.12f + 0.1f * Arvo(n, 24)), laskeutuu = pituus * (0.46f + 0.12f * Arvo(n, 25));
            if (s < alku) { Piilota(c); return; }
            float koko = 0.95f + 0.1f * Arvo(n, 26);
            float liuku = laskeutuu - 1.9f;
            float kierto = Arvo(n, 27) < 0.5f ? 1f : -1f;
            var istuin = Istuin + new Vector3(0f, 0.0012f, 0f);
            float kaarre = Mathf.Min(s, liuku);
            float w = Pehmea((kaarre - alku) / (liuku - alku));
            float kulma = 6.3f * Arvo(n, 28) + (kaarre - alku) * 0.85f * kierto;
            float sade = Mathf.Lerp(0.14f, 0.045f, w), korkeus = Mathf.Lerp(0.072f, 0.040f, w);
            var kierre = new Vector3(istuin.x + Mathf.Cos(kulma) * sade, korkeus, istuin.z + Mathf.Sin(kulma) * sade);
            var eteen = new Vector3(-Mathf.Sin(kulma), 0f, Mathf.Cos(kulma)) * kierto;
            float liito = 0.22f + 0.06f * Mathf.Sin(0.9f * s);
            float kasvu = Pehmea((s - alku) / 0.7f) * koko;
            if (s < liuku)
            {
                float saapuu = 1f - Pehmea((s - alku - 1.3f) / 0.5f);
                float isku = Isku(n, 0, s, liito, saapuu, 4.0f);
                LokkiAseta(c, Taso(suoraan, nousu, kierre), LokkiSuunta(suoraan, eteen, 0f, 17f * kierto), isku, 1f, kasvu);
                return;
            }
            var kattoon = istuin - kierre; kattoon.y = 0f; kattoon = kattoon.normalized;
            if (s < laskeutuu)
            {
                float v = Pehmea((s - liuku) / 1.9f);
                var p = Vector3.Lerp(kierre, istuin, v) + new Vector3(0f, 0.009f * Mathf.Sin(Mathf.PI * v), 0f);
                float jarru = Pehmea((v - 0.45f) / 0.15f) * (1f - Pehmea((v - 0.86f) / 0.12f));
                float isku = Mathf.Lerp(Mathf.Lerp(liito, 0.85f, v), Mathf.Cos(2f * Mathf.PI * 3.6f * (s - liuku)), jarru);
                float jaykka = Pehmea((v - 0.5f) / 0.5f);
                var m = Vector3.Lerp(Taso(suoraan, nousu, p), p - Origo, jaykka);
                var q = LokkiSuunta(suoraan, Vector3.Lerp(eteen, kattoon, Pehmea(v * 2f)), -14f * Mathf.Sin(Mathf.PI * v * 0.9f), 17f * kierto * (1f - v));
                LokkiAseta(c, m, q, isku, 1f, koko);
                return;
            }
            // Istuu katolla (origossa): siivet taittuvat 0,45 s:ssa, kääntyilee; kolmasosassa näytöksistä lähtee lopussa.
            float lahtee = Arvo(n, 29) < 0.33f ? pituus - 4.2f : 1e9f;
            float taitto = Pehmea((s - laskeutuu) / 0.45f) * (1f - Pehmea((s - lahtee) / 0.35f));
            float suunta0 = Mathf.Atan2(kattoon.x, kattoon.z) * Mathf.Rad2Deg;
            float kaanto = suunta0 + 40f * (Arvo(n, 30) < 0.5f ? 1f : -1f) * Pehmea((s - laskeutuu - 2.5f) / 0.5f)
                - 70f * Pehmea((s - laskeutuu - 6.5f) / 0.6f) * (Arvo(n, 30) < 0.5f ? 1f : -1f);
            if (s < lahtee)
            {
                // Taitettu lokki: siipiväli (x) ei voi kaventua ilman että vartalo kapenee, joten lokki kiertyy 90° pituusakselinsa
                // ympäri siipiä taittaessaan: vartalon leveys tulee y-skaalasta, oikea siipi jää selkään lyhyeksi harmaaksi
                // evämäiseksi taitokseksi ja vasen painuu katon sisään (piiloon). Taitto 0,45 s näyttää siiven nostolta ja
                // laskulta.
                c.localPosition = istuin - Origo + new Vector3(0f, 0.0003f * taitto, 0f);
                c.localRotation = Quaternion.Euler(0f, kaanto, 0f) * Quaternion.Euler(-8f * taitto, 0f, 90f * taitto);
                float k = koko / LokkiRakenne;
                c.localScale = new Vector3(Mathf.Lerp(0.9f, 0.25f, taitto) * k, Mathf.Lerp(0.9f, 0.62f, taitto) * k, Mathf.Lerp(1f, 0.92f, taitto) * k);
                return;
            }
            // Lähtö: iskien ylös ja pois (vasemmalle eteen).
            float l = s - lahtee;
            var pois = Quaternion.Euler(0f, kaanto - 30f, 0f) * Vector3.forward;
            var lp = istuin + pois * (0.022f * l * l + 0.012f * l) + new Vector3(0f, 0.012f * l, 0f);
            var lm = Vector3.Lerp(lp - Origo, Taso(suoraan, nousu, lp), Pehmea(l / 1.2f));
            // Poistuu näkyvistä noin 0,2 yksikön päässä (ei lennä kauas kartan yli).
            LokkiAseta(c, lm, LokkiSuunta(suoraan, pois, -12f * Pehmea(l / 0.5f), 0f), Mathf.Cos(2f * Mathf.PI * 4.2f * l), Mathf.Lerp(0.3f, 1f, Pehmea(l / 0.3f)),
                koko * (1f - Pehmea((l - 2.4f) / 0.8f)));
        }

        /// <summary>
        /// Lokki 1: kaartelee verkon yllä (keskus verkon suunnassa 0,035–0,06 rullasta, säde 0,045–0,065, suunta ja vauhti
        /// siemenestä), korkeus aaltoilee; kahdesti näytöksessä syöksähtää pinnan tuntumaan kohojen yllä ja nousee iskien.
        /// </summary>
        static void Metsastaja(Transform c, int n, float s, float pituus, Quaternion suoraan, float nousu, float kaari)
        {
            float kierto = Arvo(n, 31) < 0.5f ? 1f : -1f;
            var keski = VerkkoVedessa(0.035f + 0.025f * Arvo(n, 32), kaari);
            float rho0 = 0.045f + 0.02f * Arvo(n, 33);
            float om = kierto * (0.55f + 0.2f * Arvo(n, 34));
            float phi = 6.28f * Arvo(n, 35) + om * s;
            float syoksy = 0f, dy = 0f, nousuIsku = 0f;
            for (int i = 0; i < 2; i++)
            {
                float a = pituus * (0.2f + 0.42f * i + 0.1f * Arvo(n, 36 + i)), D = 2.8f;
                if (s <= a || s >= a + D) continue;
                float x = (s - a) / D, sn = Mathf.Sin(Mathf.PI * x);
                syoksy = sn * sn;
                dy = -0.040f * 2f * sn * Mathf.Cos(Mathf.PI * x) * Mathf.PI / D;
                nousuIsku = Pehmea((x - 0.5f) / 0.08f) * (1f - Pehmea((x - 0.85f) / 0.1f));
            }
            float rho = rho0 * (1f - 0.35f * syoksy);
            float korkeus = 0.050f + 0.008f * Mathf.Sin(0.45f * s + 2f * Arvo(n, 38)) - 0.040f * syoksy;
            var h = keski + new Vector3(Mathf.Cos(phi) * rho, korkeus, Mathf.Sin(phi) * rho);
            var eteen = new Vector3(-Mathf.Sin(phi), 0f, Mathf.Cos(phi)) * kierto;
            float vaakaNopeus = Mathf.Abs(om) * rho;
            float nyok = Mathf.Atan2(-dy, vaakaNopeus) * Mathf.Rad2Deg * 0.8f;
            float isku = Isku(n, 1, s, 0.24f + 0.06f * Mathf.Sin(0.3f * s), nousuIsku, 4.3f);
            float koko = (0.95f + 0.1f * Arvo(n, 39)) * Pehmea(s / 0.6f + 0.5f);
            LokkiAseta(c, Taso(suoraan, nousu, h), LokkiSuunta(suoraan, eteen, nyok, kierto * (15f + 16f * syoksy)), isku, 1f, koko);
        }

        /// <summary>Syöksy i (0–2): 55 %:ssa näytöksestä ja sitten 1,3 s:n välein; osuma veteen 0,7 s myöhemmin.</summary>
        static float SyoksyAlku(int i, float pituus) => 0.55f * pituus + 1.3f * i;
        static Vector3 Osuma(Vector3 saalis, int i) => saalis + new Vector3(0.006f * (i - 1), 0.0012f, 0.005f * (i - 1));

        /// <summary>
        /// Harvinaisen saaliin lokki i (0–2): lentää kaukaa kaartelemaan verkon ylle, syöksyy veteen (0,7 s, siivet puoliksi kiinni),
        /// kelluu pinnalla (0,3 s) ja nousee takaisin kaarteluun (1,3 s); kalastaja-lokki nousee kala nokassa ja lentää pois.
        /// </summary>
        static void Syoksyja(Transform lokki, Transform kala, int n, int i, bool saaKalan, float s, float pituus, Vector3 saalis,
            Quaternion suoraan, float nousu)
        {
            float alku = 0.3f * pituus + 0.7f * i, syoksy = SyoksyAlku(i, pituus);
            if (s < alku) { Piilota(lokki); return; }
            float kierto = i % 2 == 0 ? 1f : -1f;
            float kulma = i * 2.1f + (s - alku) * 1.1f * kierto;
            float sade = 0.040f + 0.011f * i;
            var kaari = saalis + new Vector3(Mathf.Cos(kulma) * sade, 0.058f + 0.008f * i, Mathf.Sin(kulma) * sade);
            var eteen = new Vector3(-Mathf.Sin(kulma), 0f, Mathf.Cos(kulma)) * kierto;
            var osuma = Osuma(saalis, i);
            var alas = osuma - kaari; alas.y = 0f; alas = alas.normalized;
            float koko = Pehmea((s - alku) / 0.4f) * (0.92f + 0.05f * i);
            float iskuK = Isku(n, 2 + i, s, 0.24f, 0f, 4f);
            float d = s - syoksy;
            if (d < 0f || (!saaKalan && d > 2.3f))
            {
                // Saapuu kaukaa (0,2 saaliin takaa ja ylempää) kaarteluun 2,4 s:ssa iskien, ei ilmesty tyhjästä verkon ylle.
                float tulo = Pehmea((s - alku) / 2.4f);
                if (tulo < 1f)
                {
                    float kk = 1.9f + 2.2f * i;
                    var kaukaa = saalis + new Vector3(Mathf.Cos(kk) * 0.2f, 0.095f, Mathf.Sin(kk) * 0.2f);
                    var p = Vector3.Lerp(kaukaa, kaari, tulo);
                    var suuntaan = Vector3.Lerp(kaari - kaukaa, eteen * 0.1f, Pehmea((tulo - 0.5f) / 0.5f));
                    float isku = Mathf.Lerp(Mathf.Cos(2f * Mathf.PI * 3.6f * (s - alku)), iskuK, Pehmea((tulo - 0.55f) / 0.4f));
                    LokkiAseta(lokki, Taso(suoraan, nousu, p), LokkiSuunta(suoraan, suuntaan, 0f, 19f * kierto * tulo), isku, 1f, koko);
                    return;
                }
                LokkiAseta(lokki, Taso(suoraan, nousu, kaari), LokkiSuunta(suoraan, eteen, 0f, 19f * kierto), iskuK, 1f, koko);
                return;
            }
            if (d < 0.7f)
            {
                float v = d / 0.7f, kaanto = Pehmea(v * 3f);
                var p = Vector3.Lerp(kaari, osuma + new Vector3(0f, 0.0015f, 0f), v * v) + new Vector3(0f, 0.01f * Mathf.Sin(Mathf.PI * v), 0f);
                LokkiAseta(lokki, Taso(suoraan, nousu, p), LokkiSuunta(suoraan, Vector3.Lerp(eteen, alas, kaanto), 50f * Pehmea((v - 0.3f) / 0.5f), 19f * kierto * (1f - kaanto)),
                    Mathf.Lerp(iskuK, 0.55f, kaanto), Mathf.Lerp(1f, 0.45f, Pehmea(v * 2f)), koko);
                return;
            }
            if (d < 1f)
            {
                float kk = Mathf.Atan2(alas.x, alas.z) + Mathf.PI * Pehmea((d - 0.7f) / 0.3f);
                var ee = new Vector3(Mathf.Sin(kk), 0f, Mathf.Cos(kk));
                var pinnalla = osuma + new Vector3(0f, 0.0010f, 0f);
                LokkiAseta(lokki, Taso(suoraan, nousu, pinnalla), LokkiSuunta(suoraan, ee, 0f, 0f), 0.55f, 0.5f, koko);
                if (saaKalan) KalaAseta(kala, pinnalla + ee * (0.0062f * koko) + new Vector3(0f, -0.0006f, 0f), ee, s, suoraan, nousu, 1f);
                return;
            }
            float l = d - 1f;
            if (!saaKalan)
            {
                float uu = Pehmea(l / 1.3f);
                float isku = Mathf.Lerp(Mathf.Lerp(0.55f, Mathf.Cos(2f * Mathf.PI * 3.2f * l), Pehmea(l / 0.15f)), iskuK, Pehmea((l - 0.9f) / 0.4f));
                LokkiAseta(lokki, Taso(suoraan, nousu, Vector3.Lerp(osuma, kaari, uu)), LokkiSuunta(suoraan, Vector3.Lerp(-alas, eteen, uu), -10f * (1f - uu), 19f * kierto * uu),
                    isku, Mathf.Lerp(0.5f, 1f, Pehmea(l / 0.4f)), koko);
                return;
            }
            // Kala nokassa: nousee iskien ja lentää pois ulommas merelle ja ylös.
            float kkL = Mathf.Atan2(alas.x, alas.z) + Mathf.PI;
            var pois = new Vector3(Mathf.Sin(kkL), 0f, Mathf.Cos(kkL));
            var lp = osuma + pois * (0.028f * l + 0.004f * l * l) + new Vector3(0f, Mathf.Min(0.022f * l - 0.0015f * l * l, 0.06f), 0f);
            lp.y = Mathf.Max(lp.y, 0.001f);
            float vei = Mathf.Cos(2f * Mathf.PI * 3.4f * l);
            // Poistuu näkyvistä noin 0,2 yksikön päässä kala nokassa.
            float poistuu = 1f - Pehmea((l - 3.4f) / 0.8f);
            if (poistuu <= 0.001f) { Piilota(lokki); return; }
            LokkiAseta(lokki, Taso(suoraan, nousu, lp), LokkiSuunta(suoraan, pois, -14f * (1f - Pehmea(l / 1.2f)), 0f), vei, Mathf.Lerp(0.5f, 1f, Pehmea(l / 0.4f)), koko * poistuu);
            KalaAseta(kala, lp + pois * (0.0068f * koko * poistuu) + new Vector3(0f, -0.0019f * poistuu, 0f), pois, s, suoraan, nousu, poistuu);
        }

        /// <summary>Kala (pallo venytettynä ja käännettynä: hopeinen, vaalea puoli ylös) lokin nokassa poikittain: sätkii.</summary>
        static void KalaAseta(Transform kala, Vector3 h, Vector3 suunta, float s, Quaternion suoraan, float nousu, float koko)
        {
            if (koko < 0.02f) { Piilota(kala); return; }
            float k = Mathf.Atan2(suunta.x, suunta.z) * Mathf.Rad2Deg + 90f + 14f * Mathf.Sin(19f * s);
            Ripusta(kala, Taso(suoraan, nousu, h), 1f, k, new Vector3(0.46f, 0.40f, 2.3f) * koko, true);
        }
    }
}
