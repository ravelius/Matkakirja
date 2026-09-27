using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI HOHENSALZBURG (speksi docs/raportit/erikoismallit/hohensalzburg.md, elämänidea hyväksytty 27.9. klo 07.5x).
    /// Tunnistus sekunnissa: pitkä valkoinen linnoitus metsäisen ja kallioisen Festungsbergin laella; keskellä korkein massa,
    /// Hoher Stock tummine lonkkakattoineen ja pyöreine kellotorneineen, oikealla hoikka Reckturm, vasemmalla tumma
    /// Kuenburgin bastioni ja Bürgermeisterturm; Georgskirchen vihreä kattoratsastaja; punainen FestungsBahn suoralla
    /// radallaan rinteessä vanhankaupungin katoilta linnaan.
    /// Mitat: linnoitus 250 × 150 m (OSM-pohjapiirros), Festungsberg noin 100 m vanhankaupungin yläpuolella, FestungsBahn
    /// 198,5 m (nousu 96,6 m). Mittakaava 1,0 ≈ 285 m (linnoitus 0,88 pitkä); syvyys tiivistetty 0,7-kertaiseksi (0,37), jotta
    /// linnoitus näyttää pitkältä; vuoren juuri on tiivistetty noin puoleen, joten rinteet ovat todellista jyrkemmät (laki 0,24);
    /// rakennukset noin kaksinkertaisiksi liioiteltuja (Hoher Stock 0,17 + katto 0,08, harja 0,49), jotta ne luetaan 60 pt:ssä.
    /// SUUNTA TYYLITELTY: klassinen näkymä on pohjoisesta (vanhakaupunki ja Salzach), mutta kallistettu kamera katsoo etelästä.
    /// Malli on siksi käännetty 180° pystyakselin ympäri: todellinen pohjoisjulkisivu, köysirata ja vanhakaupunki ovat mallin
    /// etelä- (−Z) puolella, todellinen itä (Kuenburg, Nonnberg) vasemmalla (−X) ja länsi (Reckturm, Mönchsberg) oikealla (+X).
    /// Kallistettu kamera näkee näin saman pitkän siluetin kuin kaupungista katsottuna.
    /// Liikkuvat osat:
    ///   vaunu       punainen FestungsBahn-vaunu nousee ja laskee suoraa rataa (perusliike, lähestyttäessä lähtee)
    ///   aani0–2     Salzburger Stier: laajenevat äänirenkaat Hoher Stockin yllä (harvinainen ja napautus)
    ///   parvi       kyyhkyparvi pyrähtää Hoher Stockilta lentoon härän mylviessä
    ///   valot       yöllä linnoituksen lämmin valaistus (julkisivut ja muurien harjat)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Vuoren laki (linnoituksen pihataso).</summary>
        const float HsTaso = 0.24f;

        /// <summary>
        /// Linnoituksen reuna vuoren laella (x, z) vastapäivään ylhäältä katsottuna, oikeasta kärjestä alkaen. Muodot
        /// OpenStreetMapin pohjapiirroksesta (käännetty 180°): 0–1 Hasengrabenbastei, 2 Georgsbastei, 4 Bernhard von Rohrin
        /// bastioni (takakärki), 8 Großes Zeughaus, 10 Bürgermeisterturm, 10–12 Kuenburgin bastioni, 13 Krautturm,
        /// 15 FestungsBahnin vuoriasema. Monikulmio on tähtimäinen pisteestä (−0,15; 0), josta laki kolmioidaan.
        /// </summary>
        static readonly Vector2[] HsHarja =
        {
            new Vector2(0.430f, 0.0425f), new Vector2(0.410f, 0.140f), new Vector2(0.300f, 0.211f), new Vector2(0.160f, 0.200f),
            new Vector2(0.060f, 0.230f), new Vector2(-0.030f, 0.196f), new Vector2(-0.170f, 0.170f), new Vector2(-0.320f, 0.095f),
            new Vector2(-0.440f, 0.0425f), new Vector2(-0.450f, -0.040f), new Vector2(-0.400f, -0.1375f), new Vector2(-0.300f, -0.100f),
            new Vector2(-0.120f, -0.0925f), new Vector2(-0.090f, -0.040f), new Vector2(0.150f, -0.0325f), new Vector2(0.340f, -0.040f),
        };

        /// <summary>Vuoren juuri (y = 0) samoilla kärjillä: oikealla harjanne jatkuu kohti Mönchsbergiä, edessä (−Z) juurella
        /// vanhakaupunki ja kärjessä 15 FestungsBahnin laaksoasema.</summary>
        static readonly Vector2[] HsJuuri =
        {
            new Vector2(0.500f, 0.060f), new Vector2(0.490f, 0.210f), new Vector2(0.350f, 0.300f), new Vector2(0.170f, 0.290f),
            new Vector2(0.060f, 0.320f), new Vector2(-0.050f, 0.295f), new Vector2(-0.220f, 0.270f), new Vector2(-0.400f, 0.170f),
            new Vector2(-0.500f, 0.050f), new Vector2(-0.500f, -0.090f), new Vector2(-0.470f, -0.280f), new Vector2(-0.320f, -0.270f),
            new Vector2(-0.120f, -0.270f), new Vector2(0.050f, -0.270f), new Vector2(0.200f, -0.290f), new Vector2(0.390f, -0.370f),
        };

        /// <summary>Rinteen profiili kärjittäin: 0 kallio (jyrkkä kallioseinä linnan alla, sitten metsärinne), 1 bastioni
        /// (pystysuora muuri), 2 köysirata (suora, jotta rata myötäilee rinnettä), 3 harjanne (loiva, kohti Mönchsbergiä).</summary>
        static readonly int[] HsProfiiliLaji = { 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2 };

        /// <summary>Profiilit: (vaakaosuus harjalta juurelle, korkeusosuus) renkaille 0 (harja) … 3 (juuri).</summary>
        static readonly float[,] HsProfiiliF = { { 0f, 0.1f, 0.48f, 1f }, { 0f, 0.02f, 0.45f, 1f }, { 0f, 0.3f, 0.7f, 1f }, { 0f, 0.3f, 0.65f, 1f } };
        static readonly float[,] HsProfiiliH = { { 1f, 0.66f, 0.26f, 0f }, { 1f, 0.62f, 0.24f, 0f }, { 1f, 0.7f, 0.3f, 0f }, { 1f, 0.8f, 0.42f, 0f } };

        static readonly Color HsMetsa = Hex(0x7c885a), HsPuu = Hex(0x5f6e45), HsKallio = Hex(0x8d806a), HsMuuri = Hex(0x978870),
            HsPiha = Hex(0xe2d8bd), HsValkoinen = Hex(0xf3ebd6), HsKupari = Hex(0x86a08a);
        /// <summary>Hoher Stockin katto hieman muita tummempi (liuskekivi), jotta keskimmäinen massa erottuu ylhäältäkin.</summary>
        static readonly Color HsKattoTumma = Hex(0x62503a);
        /// <summary>Aksentti: FestungsBahnin punainen (--sym-historia #a05c3f punaisemmaksi, jotta vaunu erottuu 60 pt:ssä).</summary>
        static readonly Color HsPunainen = Hex(0xb4503c);

        /// <summary>Köysiradan laaksoasema (juuren kärki 15) ja vuoriasema (harjan kärki 15) rinteen pinnassa.</summary>
        static Vector3 HsRataAla => new Vector3(HsJuuri[15].x, 0f, HsJuuri[15].y);
        static Vector3 HsRataYla => new Vector3(HsHarja[15].x, HsTaso, HsHarja[15].y);
        /// <summary>Radan pinta rinteen yläpuolella ja vaunun pituus vaakatasossa.</summary>
        const float HsRataPaksuus = 0.006f, HsVaunuPituus = 0.06f;

        /// <summary>Vaunun matka laaksoasemalta vuoriasemalle (vaunun yläpää harjalla). Sama vakio liikeytimessä
        /// (HohensalzburgLiike.MatkaX/Y/Z): muuta molemmat, jos rata siirtyy.</summary>
        static Vector3 HsVaununMatka
        {
            get
            {
                var d = HsRataYla - HsRataAla;
                float vaaka = new Vector3(d.x, 0f, d.z).magnitude;
                return d * (1f - HsVaunuPituus / vaaka);
            }
        }

        /// <summary>Rinteen piste: kärki i (0–15), rengas j (0 harja … 3 juuri).</summary>
        static Vector3 HsRinne(int i, int j)
        {
            int n = HsHarja.Length;
            i = ((i % n) + n) % n;
            int laji = HsProfiiliLaji[i];
            float f = HsProfiiliF[laji, j], h = HsProfiiliH[laji, j];
            // Kallioseinän alareuna vaihtelee kärjittäin (ei tasaista sokkelia); rata ja bastionit suorina.
            if (j == 1 && laji != 1 && laji != 2) h += HsKallioVaihtelu[i];
            Vector2 c = HsHarja[i], g = HsJuuri[i];
            return new Vector3(Mathf.Lerp(c.x, g.x, f), HsTaso * h, Mathf.Lerp(c.y, g.y, f));
        }

        /// <summary>Kallioseinän alareunan korkeusvaihtelu kärjittäin (osuus lakikorkeudesta).</summary>
        static readonly float[] HsKallioVaihtelu = { 0f, 0.03f, 0.05f, -0.04f, 0.03f, -0.05f, 0.04f, 0f, -0.03f, 0.05f, 0f, 0f, 0f, -0.06f, 0.04f, 0f };

        /// <summary>Rinteen piste liukuluvuilla (puut): kärkien i ja i + 1 välissä osuudella s, renkaiden j ja j + 1 välissä osuudella t.</summary>
        static Vector3 HsRinnePiste(int i, float s, int j, float t)
        {
            var a = Vector3.Lerp(HsRinne(i, j), HsRinne(i, j + 1), t);
            var b = Vector3.Lerp(HsRinne(i + 1, j), HsRinne(i + 1, j + 1), t);
            return Vector3.Lerp(a, b, s);
        }

        /// <summary>Harjan reunan ulkonormaali kärkien i → i + 1 välillä (monikulmio vastapäivään).</summary>
        static Vector3 HsUlos(int i)
        {
            int n = HsHarja.Length;
            Vector2 a = HsHarja[i % n], b = HsHarja[(i + 1) % n];
            return new Vector3(b.y - a.y, 0f, -(b.x - a.x)).normalized;
        }

        /// <summary>Piste harjan reunalla kärkien i ja i + 1 välissä (osuus s), sisennettynä.</summary>
        static Vector3 HsReuna(int i, float s, float sisaan = 0f, float y = HsTaso)
        {
            int n = HsHarja.Length;
            Vector2 a = HsHarja[i % n], b = HsHarja[(i + 1) % n];
            return new Vector3(Mathf.Lerp(a.x, b.x, s), y, Mathf.Lerp(a.y, b.y, s)) - HsUlos(i) * sisaan;
        }

        static bool HsBastioni(int i) => HsProfiiliLaji[i % HsHarja.Length] == 1 && HsProfiiliLaji[(i + 1) % HsHarja.Length] == 1;

        /// <summary>Vuori: kolme rinnevyötä (kallio tai bastionimuuri harjan alla, kaksi metsävyötä) ja laki, yksi ääriviivaosa.</summary>
        static void HsVuori(Rakentaja r)
        {
            int n = HsHarja.Length;
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                var ulos = HsUlos(i) + Vector3.up * 0.4f;
                for (int j = 0; j < 3; j++)
                {
                    var vari = j == 0 ? (HsBastioni(i) ? HsMuuri : HsKallio) : HsMetsa;
                    r.NelioUlos(HsRinne(i, j), HsRinne(q, j), HsRinne(q, j + 1), HsRinne(i, j + 1), ulos, vari);
                }
            }
            // Laki (pihataso) viuhkana pisteestä, josta monikulmio näkyy tähtimäisenä (Kuenburgin bastionin pullistuma).
            var keski = new Vector3(-0.15f, HsTaso, 0f);
            for (int i = 0; i < n; i++)
                r.KolmioUlos(keski, HsRinne(i, 0), HsRinne(i + 1, 0), Vector3.up, HsPiha);
            r.LopetaOsa();
        }

        /// <summary>Lonkkakatto: räystään keskikohta p, koko (pituus x, korkeus y, syvyys z); harja X-suunnassa, 6 kolmiota.</summary>
        static void HsLonkka(Rakentaja r, Vector3 p, Vector3 koko, Color katto)
        {
            float x = koko.x * 0.5f, z = koko.z * 0.5f, hx = Mathf.Max(0f, x - z);
            Vector3 A = p + new Vector3(-x, 0f, -z), B = p + new Vector3(x, 0f, -z), C = p + new Vector3(x, 0f, z), D = p + new Vector3(-x, 0f, z);
            Vector3 H1 = p + new Vector3(-hx, koko.y, 0f), H2 = p + new Vector3(hx, koko.y, 0f), k = p + Vector3.up * (koko.y * 0.3f);
            r.NelioKeskelta(A, B, H2, H1, k, katto);
            r.NelioKeskelta(C, D, H1, H2, k, katto);
            r.KolmioKeskelta(D, A, H1, k, katto);
            r.KolmioKeskelta(B, C, H2, k, katto);
        }

        /// <summary>Pyöreä torni kartiokatolla: pohja p, säde, vaipan korkeus, katon korkeus (0 = tasakatto). Oma ääriviivaosa.</summary>
        static void HsTorni(Rakentaja r, Vector3 p, float sade, float h, float katto, Color seina, Color kattovari, int sivuja = 8)
        {
            r.AloitaOsa();
            r.Vaippa(p, sade, sade, h, sivuja, seina, Mathf.PI / sivuja);
            if (katto > 0f) r.Kartio(p + Vector3.up * h, sade * 1.15f, katto, sivuja, kattovari);
            else r.Kiekko(p + Vector3.up * h, sade, sade, sivuja, HsPiha);
            r.LopetaOsa();
        }

        static Mesh HohensalzburgRunko()
        {
            var r = new Rakentaja();
            HsVuori(r);
            // Metsä: puuryhmiä rinteen metsävyöhykkeillä (ei radan eikä vanhankaupungin kohdalla).
            (int i, float s, int j, float t, float koko)[] puut =
            {
                (1, 0.5f, 1, 0.55f, 1f), (2, 0.4f, 1, 0.35f, 1f), (3, 0.6f, 1, 0.6f, 1.1f), (5, 0.3f, 1, 0.5f, 1f), (6, 0.6f, 1, 0.3f, 0.9f),
                (7, 0.4f, 1, 0.55f, 1f), (8, 0.5f, 1, 0.35f, 1.1f), (9, 0.6f, 1, 0.5f, 1f), (10, 0.5f, 1, 0.5f, 0.9f),
                (11, 0.2f, 1, 0.3f, 0.85f), (11, 0.55f, 1, 0.5f, 1.1f), (11, 0.85f, 2, 0.1f, 0.9f), (12, 0.35f, 1, 0.55f, 1f),
                (12, 0.7f, 1, 0.25f, 0.8f), (12, 0.15f, 2, 0.25f, 0.9f), (13, 0.5f, 1, 0.4f, 1.15f), (13, 0.2f, 2, 0.15f, 0.85f),
                (13, 0.85f, 1, 0.7f, 0.95f), (14, 0.3f, 1, 0.5f, 1f),
                (0, 0.75f, 2, 0.25f, 0.9f), (2, 0.7f, 2, 0.35f, 0.85f), (4, 0.3f, 2, 0.3f, 0.95f), (5, 0.8f, 2, 0.4f, 0.85f),
                (6, 0.25f, 2, 0.45f, 0.9f), (7, 0.8f, 2, 0.3f, 0.95f), (9, 0.2f, 2, 0.35f, 0.85f), (10, 0.3f, 2, 0.5f, 0.9f),
            };
            foreach (var (i, s, j, t, koko) in puut)
                r.Kartio(HsRinnePiste(i, s, j, t) - Vector3.up * 0.012f, 0.03f * koko, 0.06f * koko, 7, HsPuu);

            // Muurirengas: valkoinen kurtiini edessä ikkunariveineen, tummat bastionit, matalammat muurit sivuilla ja takana.
            r.AloitaOsa();
            for (int i = 0; i < HsHarja.Length; i++)
            {
                bool bastioni = HsBastioni(i);
                float h = HsMuurinKorkeus(i);
                var a = HsReuna(i, 0f, 0.006f, HsTaso - 0.045f); var b = HsReuna(i, 1f, 0.006f, HsTaso - 0.045f);
                r.Seina(a, b, h + 0.045f, 0.022f, bastioni ? HsMuuri : HsValkoinen, bastioni ? HsMuuri : HsValkoinen);
            }
            r.LopetaOsa();
            // Kurtiinin ikkunarivi (pohjoisjulkisivun pienet kaari-ikkunat, tässä kameraa kohti).
            for (int k = 0; k < 3; k++)
                r.Laatta(HsReuna(12, (k + 0.5f) / 3f, -0.005f, HsTaso + 0.065f), HsUlos(12), 0.011f, 0.016f, EmMuste);

            // Hoher Stock: korkein massa etureunalla, tumma lonkkakatto; ikkunarivit kameraa kohti.
            var hs = new Vector3(0.07f, HsTaso, 0.035f);
            const float hsL = 0.2f, hsS = 0.13f, hsH = 0.17f;
            r.AloitaOsa();
            r.Laatikko(hs, new Vector3(hsL, hsH, hsS), HsValkoinen, HsValkoinen);
            HsLonkka(r, hs + Vector3.up * hsH, new Vector3(hsL + 0.012f, 0.08f, hsS + 0.012f), HsKattoTumma);
            r.LopetaOsa();
            for (int rivi = 0; rivi < 2; rivi++)
                for (int k = 0; k < 5; k++)
                    r.Laatta(hs + new Vector3(-0.072f + k * 0.036f, 0.085f + rivi * 0.045f, -hsS * 0.5f), Vector3.back, 0.01f, 0.016f, EmMuste);
            // Glockenturm Hoher Stockin etuoikealla (pyöreä, suippo kupu) ja pyöreä tasakattoinen Kuchlturm sen takana.
            HsTorni(r, new Vector3(0.175f, HsTaso, -0.022f), 0.03f, 0.19f, 0.06f, HsValkoinen, EmKatto);
            HsTorni(r, new Vector3(-0.05f, HsTaso, 0.115f), 0.028f, 0.165f, 0f, HsValkoinen, EmKatto);
            // Reckturm oikealla: hoikka neliötorni ja matala kypärä.
            r.AloitaOsa();
            r.Laatikko(new Vector3(0.35f, HsTaso, 0.08f), new Vector3(0.05f, 0.2f, 0.05f), HsValkoinen, HsValkoinen);
            r.PyramidiRaystas(new Vector3(0.35f, HsTaso + 0.2f, 0.08f), 0.06f, 0.06f, 0.035f, EmKatto, EmKiviVaalea);
            r.LopetaOsa();
            // Georgskirche Burghofin pohjoisreunalla ja sen vihreä kattoratsastaja; Krautturm (Salzburger Stier) muurilla.
            var gk = new Vector3(-0.2f, HsTaso, -0.05f);
            r.AloitaOsa();
            r.Laatikko(gk, new Vector3(0.085f, 0.06f, 0.042f), HsValkoinen, HsValkoinen);
            r.HarjaRaystas(gk + Vector3.up * 0.06f, new Vector3(0.089f, 0.032f, 0.046f), true, EmKatto, EmKiviVaalea, HsValkoinen);
            r.LopetaOsa();
            r.Kartio(gk + new Vector3(0.022f, 0.085f, 0f), 0.011f, 0.09f, 6, HsKupari);
            HsTorni(r, new Vector3(-0.1f, HsTaso, -0.055f), 0.02f, 0.095f, 0.04f, HsValkoinen, EmKatto);
            // Bürgermeisterturm etuvasemmalla bastionin kulmassa.
            HsTorni(r, new Vector3(-0.385f, HsTaso, -0.118f), 0.026f, 0.095f, 0.055f, HsValkoinen, EmKatto);

            // Siivet reunoilla (tiheä valkoinen massa, tummat katot): länsisiipi edessä oikealla, Hasengrabenin varasto, eteläsiipi
            // kahtena osana takana, Großes Zeughaus ja itäpää vasemmalla.
            r.Talo(new Vector3(0.255f, HsTaso, -0.004f), 0f, 0.12f, 0.062f, 0.085f, 0.035f, HsValkoinen, EmKatto);
            r.Talo(new Vector3(0.325f, HsTaso, 0.145f), 2.4f, 0.13f, 0.06f, 0.065f, 0.032f, HsValkoinen, EmKatto);
            r.Talo(new Vector3(0.18f, HsTaso, 0.17f), -0.08f, 0.22f, 0.065f, 0.07f, 0.034f, HsValkoinen, EmKatto);
            r.Talo(new Vector3(-0.07f, HsTaso, 0.155f), 0.2f, 0.26f, 0.07f, 0.07f, 0.034f, HsValkoinen, EmKatto);
            r.Talo(new Vector3(-0.3f, HsTaso, 0.075f), 0.45f, 0.22f, 0.075f, 0.08f, 0.036f, HsValkoinen, EmKatto);
            r.Talo(new Vector3(-0.405f, HsTaso, -0.015f), 1.5f, 0.11f, 0.06f, 0.065f, 0.03f, HsValkoinen, EmKatto);
            // Salzmagazin Hasengrabenin pihalla Reckturmin vieressä.
            r.Talo(new Vector3(0.255f, HsTaso, 0.09f), Mathf.PI * 0.5f, 0.1f, 0.06f, 0.07f, 0.03f, HsValkoinen, EmKatto);
            // Burghofin reuna: Kaplanstöckl ja Schulhaus Hoher Stockin vieressä.
            r.Talo(new Vector3(-0.08f, HsTaso, 0.045f), Mathf.PI * 0.5f, 0.1f, 0.06f, 0.08f, 0.032f, HsValkoinen, EmKatto);

            // FestungsBahn: suora rata rinteessä laaksoasemalta vuoriasemalle ja asemarakennukset.
            HsRata(r);
            r.Talo(HsRataAla + new Vector3(0.012f, 0f, -0.03f), 1.42f, 0.06f, 0.045f, 0.035f, 0.02f, HsValkoinen, EmKatto);
            r.Talo(HsRataYla + new Vector3(0.005f, 0f, 0.03f), 1.42f, 0.06f, 0.05f, 0.075f, 0.025f, HsValkoinen, EmKatto);

            // Vihje vanhastakaupungista: rivi pieniä taloja laaksoaseman vasemmalla puolella vuoren juurella (ilman ääriviivaa).
            for (int k = 0; k < 3; k++)
                r.Talo(new Vector3(0.315f - k * 0.062f, 0f, -0.33f + k * 0.01f), 0f, 0.055f, 0.04f, 0.032f, 0.022f, HsValkoinen, EmKatto);
            return r.Verkko("Hohensalzburg");
        }

        // ---- LÄHITASO (omistaja 27.9. klo 09.0x Fablen kautta: kolmas taso lähizoomiin, rajapinta Natiivisepältä 1.0.29) ----

        /// <summary>Lähitason sävyt rungon paletista: kallion reunuksen alla oleva jyrkkä kaista, kiskot, ratapölkyt ja
        /// pienemmät puut. Ominaisuuksina, koska Em-paletti on toisessa tiedostossa (staattisten kenttien alustusjärjestys
        /// osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color HsLhKallioTumma => Color.Lerp(HsKallio, EmMuste, 0.16f);
        static Color HsLhKisko => Color.Lerp(EmSeepia, EmKiviVaalea, 0.55f);
        static Color HsLhPolkky => Color.Lerp(EmSeepia, EmMuste, 0.2f);
        static Color HsLhPuuVaalea => Color.Lerp(HsPuu, HsMetsa, 0.45f);
        /// <summary>Muurit, joiden harjalla on sakarat (bastionien 10–11 kaiteessa on tykkiaukot).</summary>
        static readonly int[] HsLhSakaraMuurit = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15 };

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti (rajat samat kuin rungossa), mittasuhteet,
        /// värit, ääriviivaosat (vuori, muurirengas, Hoher Stock, jokainen torni, kirkko, siivet ja rata) ja osien pivotit kuin
        /// rungossa, noin 2,6 × kolmiot (2 184) lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; vaunu, äänirenkaat, parvi ja
        /// valot pysyvät ennallaan: ikkunat ovat valaistuilla julkisivuilla hehkun edessä (tummat myös yöllä), sakarat nousevat
        /// muurien harjahehkun läpi, ja vaunu kulkee kiskojen ja pölkkyjen päällä (ne jäävät sen rungon sisään).
        ///   vuori     kalliovyössä muurien alla kaksi reunusta (kerrostumat: loiva vaalea ja jyrkkä tumma kaista vuorotellen),
        ///             metsässä 16 pienempää puuta rungon 27:n lisäksi
        ///   muurit    sakarat ja muurikäytävä harjalla (paitsi bastionissa), Kuenburgin bastionin kordoni ja tykkiaukot,
        ///             kurtiinin kaksi ikkunariviä, ampumaraot etumuureissa
        ///   linna     Hoher Stockin kolme ikkunariviä, kolme kattolyhtyä ja savupiiput etulappeella (harjan alapuolella);
        ///             torneissa ikkunat, kellokerroksen aukot ja räystäskaistat, Kuchlturmin sakarat, Reckturmin kattolyhty;
        ///             Georgskirchen kaari-ikkunat; siipien ikkunarivit, kattolyhdyt ja savupiiput
        ///   rata      kiskot ja ratapölkyt, asemien portit ja ikkunat; vanhankaupungin talojen ikkunat, ovet ja savupiiput
        /// </summary>
        static Mesh HohensalzburgLahi()
        {
            var r = new Rakentaja();
            HsLhVuori(r);
            // Metsä: rungon puut samoilla paikoilla ja lähitasolle pienempiä puita rinteen aukkoihin (ei radan eikä vanhankaupungin
            // kohdalla).
            (int i, float s, int j, float t, float koko)[] puut =
            {
                (1, 0.5f, 1, 0.55f, 1f), (2, 0.4f, 1, 0.35f, 1f), (3, 0.6f, 1, 0.6f, 1.1f), (5, 0.3f, 1, 0.5f, 1f), (6, 0.6f, 1, 0.3f, 0.9f),
                (7, 0.4f, 1, 0.55f, 1f), (8, 0.5f, 1, 0.35f, 1.1f), (9, 0.6f, 1, 0.5f, 1f), (10, 0.5f, 1, 0.5f, 0.9f),
                (11, 0.2f, 1, 0.3f, 0.85f), (11, 0.55f, 1, 0.5f, 1.1f), (11, 0.85f, 2, 0.1f, 0.9f), (12, 0.35f, 1, 0.55f, 1f),
                (12, 0.7f, 1, 0.25f, 0.8f), (12, 0.15f, 2, 0.25f, 0.9f), (13, 0.5f, 1, 0.4f, 1.15f), (13, 0.2f, 2, 0.15f, 0.85f),
                (13, 0.85f, 1, 0.7f, 0.95f), (14, 0.3f, 1, 0.5f, 1f),
                (0, 0.75f, 2, 0.25f, 0.9f), (2, 0.7f, 2, 0.35f, 0.85f), (4, 0.3f, 2, 0.3f, 0.95f), (5, 0.8f, 2, 0.4f, 0.85f),
                (6, 0.25f, 2, 0.45f, 0.9f), (7, 0.8f, 2, 0.3f, 0.95f), (9, 0.2f, 2, 0.35f, 0.85f), (10, 0.3f, 2, 0.5f, 0.9f),
            };
            foreach (var (i, s, j, t, koko) in puut)
                r.Kartio(HsRinnePiste(i, s, j, t) - Vector3.up * 0.012f, 0.03f * koko, 0.06f * koko, 7, HsPuu);
            (int i, float s, int j, float t, float koko)[] pienet =
            {
                (13, 0.35f, 2, 0.45f, 0.7f), (13, 0.65f, 2, 0.3f, 0.65f), (13, 0.3f, 1, 0.75f, 0.6f), (13, 0.7f, 1, 0.2f, 0.6f),
                (12, 0.55f, 2, 0.5f, 0.7f), (12, 0.1f, 1, 0.8f, 0.6f), (11, 0.35f, 2, 0.45f, 0.65f), (11, 0.05f, 2, 0.6f, 0.7f),
                (11, 0.75f, 1, 0.75f, 0.6f), (14, 0.15f, 2, 0.3f, 0.65f), (14, 0.55f, 1, 0.25f, 0.6f), (10, 0.8f, 1, 0.3f, 0.65f),
                (10, 0.75f, 2, 0.35f, 0.7f), (9, 0.35f, 1, 0.8f, 0.6f), (0, 0.4f, 1, 0.55f, 0.65f), (8, 0.3f, 2, 0.15f, 0.7f),
            };
            foreach (var (i, s, j, t, koko) in pienet)
                r.Kartio(HsRinnePiste(i, s, j, t) - Vector3.up * 0.008f, 0.03f * koko, 0.06f * koko, 6, HsLhPuuVaalea);

            // Muurirengas kuten rungossa; sakarat harjan ulkoreunalla (muurikäytävä jää niiden taakse) ja Kuenburgin bastionin
            // kordoni samassa ääriviivaosassa.
            r.AloitaOsa();
            for (int i = 0; i < HsHarja.Length; i++)
            {
                bool bastioni = HsBastioni(i);
                float h = HsMuurinKorkeus(i);
                var a = HsReuna(i, 0f, 0.006f, HsTaso - 0.045f); var b = HsReuna(i, 1f, 0.006f, HsTaso - 0.045f);
                r.Seina(a, b, h + 0.045f, 0.022f, bastioni ? HsMuuri : HsValkoinen, bastioni ? HsMuuri : HsValkoinen);
                if (Array.IndexOf(HsLhSakaraMuurit, i) >= 0) HsLhSakarat(r, i, 0.009f, 0.022f);
                if (bastioni)
                {
                    var u = HsUlos(i) * 0.002f;
                    Vector3 k0 = HsReuna(i, 0f, -0.005f, HsTaso - 0.003f) + u, k1 = HsReuna(i, 1f, -0.005f, HsTaso - 0.003f) + u, ky = Vector3.up * 0.005f;
                    r.NelioUlos(k0, k1, k1 + ky, k0 + ky, HsUlos(i), EmKiviVaalea);
                    r.NelioUlos(k0 + ky, k1 + ky, k1 + ky - u, k0 + ky - u, Vector3.up, EmKiviVaalea);
                }
            }
            r.LopetaOsa();
            // Bastionin kaiteen tykkiaukot, kurtiinin kaksi ikkunariviä (ylempi rungon paikoilla) ja etumuurien ampumaraot.
            foreach (int i in new[] { 10, 11 })
            {
                int kpl = i == 10 ? 3 : 5;
                for (int k = 0; k < kpl; k++)
                    r.Laatta(HsReuna(i, (k + 0.5f) / kpl, -0.005f, HsTaso + HsMuurinKorkeus(i) - 0.005f), HsUlos(i), 0.009f, 0.01f, EmMuste);
            }
            for (int k = 0; k < 3; k++)
            {
                r.Laatta(HsReuna(12, (k + 0.5f) / 3f, -0.005f, HsTaso + 0.065f), HsUlos(12), 0.011f, 0.016f, EmMuste);
                r.Laatta(HsReuna(12, (k + 0.5f) / 3f, -0.005f, HsTaso + 0.028f), HsUlos(12), 0.008f, 0.012f, EmMuste);
            }
            foreach (var (i, kpl) in new[] { (13, 4), (14, 3), (15, 2), (9, 2), (0, 2), (8, 2) })
                for (int k = 0; k < kpl; k++)
                    r.Laatta(HsReuna(i, (k + 0.5f) / kpl, -0.005f, HsTaso + HsMuurinKorkeus(i) * 0.45f), HsUlos(i), 0.0045f, 0.014f, EmMuste);

            // Hoher Stock: rungon massa ja lonkkakatto, etulappeella kolme kattolyhtyä samassa ääriviivaosassa; kolme ikkunariviä
            // kameraa kohti (hehkun edessä) ja kaksi savupiippua harjan tuntumassa.
            var hs = new Vector3(0.07f, HsTaso, 0.035f);
            const float hsL = 0.2f, hsS = 0.13f, hsH = 0.17f;
            r.AloitaOsa();
            r.Laatikko(hs, new Vector3(hsL, hsH, hsS), HsValkoinen, HsValkoinen);
            HsLonkka(r, hs + Vector3.up * hsH, new Vector3(hsL + 0.012f, 0.08f, hsS + 0.012f), HsKattoTumma);
            {
                float syv = (hsS + 0.012f) * 0.5f, k = 0.08f / syv, f = 0.3f;
                foreach (float dx in new[] { -0.045f, 0f, 0.045f })
                    HsLhKattolyhty(r, hs + new Vector3(dx, hsH + 0.08f * f, -syv * (1f - f)), Vector3.back, k, 0.02f, 0.017f, 0.009f, HsValkoinen, HsKattoTumma);
            }
            r.LopetaOsa();
            for (int rivi = 0; rivi < 3; rivi++)
                for (int k = 0; k < 7; k++)
                    r.Laatta(hs + new Vector3(-0.081f + k * 0.027f, 0.08f + rivi * 0.033f, -hsS * 0.5f), Vector3.back, 0.009f, 0.014f, EmMuste);
            // Savupiiput etulappeella harjan alapuolella (latvat harjan tasoa alempana, joten siluetti ei kasva).
            foreach (float dx in new[] { -0.03f, 0.03f })
                r.Laatikko(hs + new Vector3(dx, hsH + 0.08f * 0.6f - 0.008f, -0.071f * 0.4f), new Vector3(0.009f, 0.034f, 0.009f), HsValkoinen, EmMuste);

            // Tornit: rungon mitat, kartiokatoissa räystäskaista, ikkunat kameran puoleisilla tahkoilla; Kuchlturmin harjalla sakarat.
            HsLhTorni(r, new Vector3(0.175f, HsTaso, -0.022f), 0.03f, 0.19f, 0.06f, new[] { 0.055f, 0.1f }, 0.16f);
            HsLhTorni(r, new Vector3(-0.05f, HsTaso, 0.115f), 0.028f, 0.165f, 0f, new[] { 0.07f, 0.115f }, 0f);
            // Reckturm: rungon torni ja kypärä, etelässä neljä ikkunaa päällekkäin (hehkun edessä) ja kattolyhty kypärässä.
            var rt = new Vector3(0.35f, HsTaso, 0.08f);
            r.AloitaOsa();
            r.Laatikko(rt, new Vector3(0.05f, 0.2f, 0.05f), HsValkoinen, HsValkoinen);
            r.PyramidiRaystas(rt + Vector3.up * 0.2f, 0.06f, 0.06f, 0.035f, EmKatto, EmKiviVaalea);
            r.LopetaOsa();
            foreach (float y in new[] { 0.045f, 0.085f, 0.125f, 0.165f })
                r.Laatta(rt + new Vector3(0f, y, -0.025f - 0.001f), Vector3.back, 0.009f, 0.016f, EmMuste);
            HsLhKattolyhty(r, rt + new Vector3(0f, 0.2f + 0.035f * 0.3f, -0.03f * 0.7f), Vector3.back, 0.035f / 0.03f, 0.012f, 0.009f, 0.006f,
                HsValkoinen, EmKatto);

            // Georgskirche: rungon kirkko ja kattoratsastaja, etelässä kolme kaari-ikkunaa (hehkun edessä).
            var gk = new Vector3(-0.2f, HsTaso, -0.05f);
            r.AloitaOsa();
            r.Laatikko(gk, new Vector3(0.085f, 0.06f, 0.042f), HsValkoinen, HsValkoinen);
            r.HarjaRaystas(gk + Vector3.up * 0.06f, new Vector3(0.089f, 0.032f, 0.046f), true, EmKatto, EmKiviVaalea, HsValkoinen);
            r.LopetaOsa();
            r.Kartio(gk + new Vector3(0.022f, 0.085f, 0f), 0.011f, 0.09f, 6, HsKupari);
            foreach (float dx in new[] { -0.026f, 0f, 0.026f })
                r.Holvi(gk + new Vector3(dx, 0.033f, -0.021f - 0.001f), Vector3.back, 0.009f, 0.028f, EmMuste);
            HsLhTorni(r, new Vector3(-0.1f, HsTaso, -0.055f), 0.02f, 0.095f, 0.04f, new[] { 0.045f }, 0.075f);
            HsLhTorni(r, new Vector3(-0.385f, HsTaso, -0.118f), 0.026f, 0.095f, 0.055f, new[] { 0.035f }, 0.07f);

            // Siivet: rungon talot, kameraan päin kääntyvissä seinissä ikkunarivit, etulappeilla kattolyhtyjä ja savupiippuja.
            HsLhSiipi(r, new Vector3(0.255f, HsTaso, -0.004f), 0f, 0.12f, 0.062f, 0.085f, 0.035f, new[] { 0.074f }, 4, 2, 0);
            HsLhSiipi(r, new Vector3(0.325f, HsTaso, 0.145f), 2.4f, 0.13f, 0.06f, 0.065f, 0.032f, new[] { 0.028f, 0.05f }, 4, 0, 1);
            HsLhSiipi(r, new Vector3(0.18f, HsTaso, 0.17f), -0.08f, 0.22f, 0.065f, 0.07f, 0.034f, new[] { 0.03f, 0.053f }, 6, 0, 1);
            HsLhSiipi(r, new Vector3(-0.07f, HsTaso, 0.155f), 0.2f, 0.26f, 0.07f, 0.07f, 0.034f, new[] { 0.053f }, 7, 2, 0);
            HsLhSiipi(r, new Vector3(-0.3f, HsTaso, 0.075f), 0.45f, 0.22f, 0.075f, 0.08f, 0.036f, new[] { 0.032f, 0.058f }, 6, 3, 2);
            HsLhSiipi(r, new Vector3(-0.405f, HsTaso, -0.015f), 1.5f, 0.11f, 0.06f, 0.065f, 0.03f, new[] { 0.025f, 0.047f }, 2, 0, 0);
            HsLhSiipi(r, new Vector3(0.255f, HsTaso, 0.09f), Mathf.PI * 0.5f, 0.1f, 0.06f, 0.07f, 0.03f, new[] { 0.052f }, 2, 0, 0);
            HsLhSiipi(r, new Vector3(-0.08f, HsTaso, 0.045f), Mathf.PI * 0.5f, 0.1f, 0.06f, 0.08f, 0.032f, new[] { 0.03f, 0.058f }, 2, 0, 0);

            // FestungsBahn: rata kiskoineen ja pölkkyineen, asemat portteineen ja ikkunoineen.
            HsLhRata(r);
            var ala = HsRataAla + new Vector3(0.012f, 0f, -0.03f);
            r.Talo(ala, 1.42f, 0.06f, 0.045f, 0.035f, 0.02f, HsValkoinen, EmKatto);
            var yla = HsRataYla + new Vector3(0.005f, 0f, 0.03f);
            r.Talo(yla, 1.42f, 0.06f, 0.05f, 0.075f, 0.025f, HsValkoinen, EmKatto);
            var ex = new Vector3(Mathf.Cos(1.42f), 0f, Mathf.Sin(1.42f));
            r.Holvi(ala - ex * 0.03f + Vector3.up * 0.0125f, -ex, 0.014f, 0.025f, EmMuste);
            r.Holvi(yla - ex * 0.03f + Vector3.up * 0.016f, -ex, 0.026f, 0.032f, EmMuste);
            var sy = Vector3.Cross(Vector3.up, -ex);
            foreach (float s in new[] { -1f, 1f })
                r.Laatta(yla - ex * 0.03f + sy * (s * 0.013f) + Vector3.up * 0.052f, -ex, 0.007f, 0.012f, EmMuste);
            r.Laatta(yla - ex * 0.03f + Vector3.up * 0.083f, -ex, 0.007f, 0.01f, EmMuste);

            // Vihje vanhastakaupungista: rungon kolme taloa, julkisivuissa ikkunat ja ovi, harjalla savupiippu (ei ääriviivaa).
            for (int k = 0; k < 3; k++)
            {
                var p = new Vector3(0.315f - k * 0.062f, 0f, -0.33f + k * 0.01f);
                r.Talo(p, 0f, 0.055f, 0.04f, 0.032f, 0.022f, HsValkoinen, EmKatto);
                var z = Vector3.back * 0.02f;
                foreach (float dx in new[] { -0.014f, 0.014f })
                    r.Laatta(p + z + new Vector3(dx, 0.022f, 0f), Vector3.back, 0.007f, 0.008f, EmMuste);
                r.Laatta(p + z + new Vector3(k % 2 == 0 ? -0.004f : 0.004f, 0.0075f, 0f), Vector3.back, 0.008f, 0.014f, EmMuste);
                r.Laatikko(p + new Vector3(k % 2 == 0 ? 0.013f : -0.013f, 0.032f + 0.022f * 0.4f, 0.008f), new Vector3(0.007f, 0.022f * 0.6f + 0.008f, 0.007f),
                    HsValkoinen, EmMuste);
            }
            return r.Verkko("Hohensalzburg-lahi");
        }

        /// <summary>
        /// Lähitason vuori: rungon kolme rinnevyötä, laki ja kärjet samoina (sama ääriviivaosa); kalliovyön näkyvässä alaosassa
        /// (muurit peittävät yläosan) kaksi reunusta kuten Mont-Saint-Michelin kerrostumissa: välirenkaat noin 57 %:n (ulos),
        /// 69 %:n (takaisin vyön linjalle) ja 81 %:n (ulos) kohdalla, korkeudet ja työnnöt kärjittäin vaihtelevia (bastionien ja
        /// radan kärjissä ei työntöä, joten muuri ja rata pysyvät suorina). Reunuksen yllä kaista viettää loivemmin ja
        /// valaistuu, alla se on jyrkkä ja tummempi. 16 × 8 + 16 × 4 + 16 = 208 kolmiota (rungossa 112).
        /// </summary>
        static void HsLhVuori(Rakentaja r)
        {
            int n = HsHarja.Length;
            var sat = new System.Random(1502);
            var f = new float[3, n]; var tyonto = new float[3, n];
            for (int i = 0; i < n; i++)
            {
                int laji = HsProfiiliLaji[i];
                bool suora = laji == 1 || laji == 2;
                for (int k = 0; k < 3; k++)
                {
                    f[k, i] = 0.57f + 0.12f * k + 0.05f * ((float)sat.NextDouble() - 0.5f);
                    tyonto[k, i] = suora || k == 1 ? 0f : 0.0045f + 0.0045f * (float)sat.NextDouble();
                }
            }
            // Vyön pisteet ylhäältä alas: harja, reunus 1, linja, reunus 2, rengas 1.
            Vector3 Taso(int i, int k)
            {
                i = ((i % n) + n) % n;
                if (k == 0) return HsRinne(i, 0);
                if (k == 4) return HsRinne(i, 1);
                var p = Vector3.Lerp(HsRinne(i, 0), HsRinne(i, 1), f[k - 1, i]);
                var u = HsUlos(i) + HsUlos((i + n - 1) % n); u.y = 0f;
                return p + u.normalized * tyonto[k - 1, i];
            }
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                var ulos = HsUlos(i) + Vector3.up * 0.4f;
                bool bastioni = HsBastioni(i);
                for (int k = 0; k < 4; k++)
                    r.NelioUlos(Taso(i, k), Taso(q, k), Taso(q, k + 1), Taso(i, k + 1), ulos, bastioni ? HsMuuri : k % 2 == 0 ? HsKallio : HsLhKallioTumma);
                for (int j = 1; j < 3; j++)
                    r.NelioUlos(HsRinne(i, j), HsRinne(q, j), HsRinne(q, j + 1), HsRinne(i, j + 1), ulos, HsMetsa);
            }
            var keski = new Vector3(-0.15f, HsTaso, 0f);
            for (int i = 0; i < n; i++)
                r.KolmioUlos(keski, HsRinne(i, 0), HsRinne(i + 1, 0), Vector3.up, HsPiha);
            r.LopetaOsa();
        }

        /// <summary>
        /// Muurin i sakarat harjan ulkoreunalla: ulkopinta muurin ulkopinnan tasossa (0,005 reunan ulkopuolella), paksuus 0,0065,
        /// korkeus 0,009 (Mont-Saint-Michelin mitat), väli noin <paramref name="vali"/>. Pinnat, jotka eivät voi kääntyä etelästä
        /// katsovaan kameraan, jätetään pois: ulkopinta etelään ja sivuille päin olevissa muureissa, sisäpinta pohjoisen ja sivujen
        /// muureissa, kansi aina ja päätypinta vinoissa muureissa etelän puolelta. 4–8 kolmiota sakaralta.
        /// </summary>
        static void HsLhSakarat(Rakentaja r, int i, float leveys, float vali)
        {
            float h = HsMuurinKorkeus(i);
            var u = HsUlos(i);
            Vector3 a = HsReuna(i, 0f, -0.005f, HsTaso + h), b = HsReuna(i, 1f, -0.005f, HsTaso + h);
            float pituus = (b - a).magnitude;
            var t = (b - a) / pituus;
            int kpl = Mathf.Max(2, (int)(pituus / vali + 0.5f));
            Vector3 kork = Vector3.up * 0.009f, sisa = -u * 0.0065f;
            bool ulko = u.z < 0.3f, sisaPinta = u.z > -0.3f;
            for (int k = 0; k < kpl; k++)
            {
                var c = a + t * (pituus * (k + 0.5f) / kpl);
                Vector3 o0 = c - t * (leveys * 0.5f), o1 = c + t * (leveys * 0.5f), s0 = o0 + sisa, s1 = o1 + sisa;
                if (ulko) r.NelioUlos(o0, o1, o1 + kork, o0 + kork, u, HsValkoinen);
                if (sisaPinta) r.NelioUlos(s0, s1, s1 + kork, s0 + kork, -u, HsValkoinen);
                r.NelioUlos(s0 + kork, s1 + kork, o1 + kork, o0 + kork, Vector3.up, HsValkoinen);
                if (t.z > 0.3f) r.NelioUlos(o0, s0, s0 + kork, o0 + kork, -t, HsValkoinen);
                else if (t.z < -0.3f) r.NelioUlos(o1, s1, s1 + kork, o1 + kork, t, HsValkoinen);
            }
        }

        /// <summary>
        /// Lähitason pyöreä torni (rungossa HsTorni): sama vaippa ja katto samana ääriviivaosana, kartiokatossa räystäskaista
        /// (EmKiviVaalea kuten Reckturmin kypärässä); tasakattoisessa (katto 0) harjalla sakarat jokaisella tahkolla. Ikkunat
        /// kameran puoleisilla tahkoilla (etelä, lounas ja kaakko) korkeuksilla <paramref name="ikkunat"/> ja ylimpänä
        /// kellokerroksen aukot myös idässä ja lännessä (korkeus <paramref name="aukot"/>, 0 = ei).
        /// </summary>
        static void HsLhTorni(Rakentaja r, Vector3 p, float sade, float h, float katto, float[] ikkunat, float aukot)
        {
            const int sivuja = 8;
            r.AloitaOsa();
            r.Vaippa(p, sade, sade, h, sivuja, HsValkoinen, Mathf.PI / sivuja);
            if (katto > 0f) r.KartioRaystas(p + Vector3.up * h, sade * 1.15f, katto, sivuja, EmKatto, EmKiviVaalea);
            else
            {
                r.Kiekko(p + Vector3.up * h, sade, sade, sivuja, HsPiha);
                float ap = sade * Mathf.Cos(Mathf.PI / sivuja), w = sade * Mathf.Sin(Mathf.PI / sivuja) * 0.55f;
                var kork = Vector3.up * 0.009f;
                for (int k = 0; k < sivuja; k++)
                {
                    float a = k * Mathf.PI * 2f / sivuja;
                    var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                    var t = Vector3.Cross(Vector3.up, n);
                    Vector3 o = p + n * ap + Vector3.up * h, s = o - n * 0.006f;
                    if (n.z < 0.3f) r.NelioUlos(o - t * w, o + t * w, o + t * w + kork, o - t * w + kork, n, HsValkoinen);
                    if (n.z > -0.3f) r.NelioUlos(s - t * w, s + t * w, s + t * w + kork, s - t * w + kork, -n, HsValkoinen);
                    r.NelioUlos(s - t * w + kork, s + t * w + kork, o + t * w + kork, o - t * w + kork, Vector3.up, HsValkoinen);
                }
            }
            r.LopetaOsa();
            float apot = sade * Mathf.Cos(Mathf.PI / sivuja);
            foreach (float aste in new[] { 270f, 225f, 315f, 180f, 0f })
            {
                float a = aste * Mathf.PI / 180f;
                var n = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                bool sivu = aste == 180f || aste == 0f;
                if (!sivu)
                    foreach (float y in ikkunat)
                        r.Laatta(p + n * apot + Vector3.up * y, n, sade * 0.26f, sade * 0.42f, EmMuste);
                if (aukot > 0f) r.Holvi(p + n * apot + Vector3.up * aukot, n, sade * 0.3f, sade * 0.62f, EmMuste);
            }
        }

        /// <summary>
        /// Kattolyhty (päätyikkuna) lappeella: p = etuseinän alareunan keskikohta lappeen pinnassa, n = etuseinän suunta
        /// (vaakasuora, lappeen alamäki), k = lappeen nousu vaakamatkaa kohden, leveys, seinän ja päädyn korkeus. Etuseinä ja
        /// päätykolmio, kyljet, harjakatto pienellä räystäällä ja tumma ikkuna. 12 kolmiota.
        /// </summary>
        static void HsLhKattolyhty(Rakentaja r, Vector3 p, Vector3 n, float k, float lev, float hs, float hp, Color seina, Color katto)
        {
            n = new Vector3(n.x, 0f, n.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            var d = -n;
            float w = lev * 0.5f, ze = hs / k, zh = (hs + hp) / k;
            Vector3 A = p - t * w, B = p + t * w, A1 = A + Vector3.up * hs, B1 = B + Vector3.up * hs, H = p + Vector3.up * (hs + hp);
            var keski = p + Vector3.up * (hs * 0.5f) + d * (ze * 0.5f);
            r.NelioUlos(A, B, B1, A1, n, seina);
            r.KolmioUlos(A1, B1, H, n, seina);
            r.KolmioKeskelta(A, A1, A1 + d * ze, keski, seina);
            r.KolmioKeskelta(B, B1, B1 + d * ze, keski, seina);
            var o = n * 0.0025f;
            r.NelioKeskelta(A1 + o - t * 0.0015f, H + o, H + d * zh, A1 + d * ze - t * 0.0015f, keski, katto);
            r.NelioKeskelta(B1 + o + t * 0.0015f, H + o, H + d * zh, B1 + d * ze + t * 0.0015f, keski, katto);
            var q = p + n * 0.0006f;
            r.NelioUlos(q - t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.85f),
                q - t * (w * 0.5f) + Vector3.up * (hs * 0.85f), n, EmMuste);
        }

        /// <summary>
        /// Lähitason siipi: rungon talo (Talo, oma ääriviivaosa) ja kameraan (etelään) päin kääntyvässä seinässä ikkunarivit
        /// korkeuksilla <paramref name="rivit"/> (pitkässä seinässä, tai päädyssä, jos pitkät seinät katsovat itään ja länteen).
        /// Ikkunat ovat 0,0025 seinän edessä eli yövalon hehkun (0,0015) edessä. Pitkän seinän puolella etulappeella
        /// kattolyhtyjä ja savupiippuja (harjan tuntumassa).
        /// </summary>
        static void HsLhSiipi(Rakentaja r, Vector3 p, float suunta, float leveys, float syvyys, float h, float harja, float[] rivit, int ikkunoita,
            int lyhtyja, int piippuja)
        {
            r.Talo(p, suunta, leveys, syvyys, h, harja, HsValkoinen, EmKatto);
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            bool paaty = Mathf.Abs(Mathf.Cos(suunta)) < 0.35f;
            if (paaty)
            {
                // Pitkät seinät itään ja länteen: ikkunat etelään kääntyvässä päädyssä ja yksi päätykolmiossa.
                var n = Mathf.Sin(suunta) > 0f ? -ex : ex;
                var c = p + n * (leveys * 0.5f + 0.001f);
                var s = Vector3.Cross(Vector3.up, n);
                foreach (float y in rivit)
                    for (int k = 0; k < ikkunoita; k++)
                        r.Laatta(c + s * (syvyys * (-0.25f + 0.5f * k / Mathf.Max(1, ikkunoita - 1))) + Vector3.up * y, n, 0.008f, 0.012f, EmMuste);
                r.Laatta(c + Vector3.up * (h + harja * 0.38f), n, 0.007f, 0.01f, EmMuste);
                return;
            }
            var m = Mathf.Cos(suunta) > 0f ? -ez : ez;   // etelään kääntyvän pitkän seinän ulkonormaali
            var sc = p + m * (syvyys * 0.5f + 0.001f);
            foreach (float y in rivit)
                for (int k = 0; k < ikkunoita; k++)
                    r.Laatta(sc + ex * (leveys * (-0.4f + 0.8f * (k + 0.5f) / ikkunoita)) + Vector3.up * y, m, 0.008f, 0.013f, EmMuste);
            float kk = harja / (syvyys * 0.5f);
            for (int k = 0; k < lyhtyja; k++)
            {
                float f = 0.3f, x = leveys * (-0.3f + 0.6f * (k + 0.5f) / lyhtyja);
                HsLhKattolyhty(r, p + ex * x + m * (syvyys * 0.5f * (1f - f)) + Vector3.up * (h + harja * f), m, kk, 0.016f, 0.014f, 0.008f,
                    HsValkoinen, EmKatto);
            }
            for (int k = 0; k < piippuja; k++)
            {
                float f = 0.78f, x = leveys * (k == 0 ? 0.28f : -0.28f);
                var q = p + ex * x + m * (syvyys * 0.5f * (1f - f)) + Vector3.up * (h + harja * f - 0.008f);
                r.Laatikko(q, new Vector3(0.008f, harja * (1f - f) + 0.02f, 0.008f), HsValkoinen, EmMuste);
            }
        }

        /// <summary>Lähitason rata: rungon laatta (yläpinta ja sivut) ja sen päällä kaksi vaaleaa kiskoa samana ääriviivaosana;
        /// pölkyt pieninä osina (ei ääriviivaa). Kiskot ja pölkyt ovat alle 0,0005 radan pinnan yllä, joten vaunun runko peittää
        /// ne sen kulkiessa.</summary>
        static void HsLhRata(Rakentaja r)
        {
            Vector3 a = HsRataAla, b = HsRataYla;
            var suunta = b - a; suunta.y = 0f;
            var sivu = Vector3.Cross(Vector3.up, suunta).normalized;
            var y = Vector3.up * HsRataPaksuus;
            r.AloitaOsa();
            r.NelioUlos(a - sivu * 0.016f + y, b - sivu * 0.016f + y, b + sivu * 0.016f + y, a + sivu * 0.016f + y, Vector3.up, EmMuste);
            r.NelioUlos(a - sivu * 0.016f, b - sivu * 0.016f, b - sivu * 0.016f + y, a - sivu * 0.016f + y, -sivu, EmSeepia);
            r.NelioUlos(a + sivu * 0.016f, b + sivu * 0.016f, b + sivu * 0.016f + y, a + sivu * 0.016f + y, sivu, EmSeepia);
            var yk = Vector3.up * (HsRataPaksuus + 0.0004f);
            foreach (float s in new[] { -0.0085f, 0.0085f })
                r.NelioUlos(a + sivu * (s - 0.0014f) + yk, b + sivu * (s - 0.0014f) + yk, b + sivu * (s + 0.0014f) + yk, a + sivu * (s + 0.0014f) + yk,
                    Vector3.up, HsLhKisko);
            r.LopetaOsa();
            const int polkkyja = 24;
            var pitkin = (b - a).normalized * 0.0024f;
            for (int k = 0; k < polkkyja; k++)
            {
                var c = Vector3.Lerp(a, b, (k + 0.5f) / polkkyja) + Vector3.up * (HsRataPaksuus + 0.0002f);
                r.NelioUlos(c - sivu * 0.0125f - pitkin, c + sivu * 0.0125f - pitkin, c + sivu * 0.0125f + pitkin, c - sivu * 0.0125f + pitkin, Vector3.up, HsLhPolkky);
            }
        }

        /// <summary>Köysiradan rata: tumma laatta rinteen pinnalla (yläpinta ja sivut) laaksoasemalta vuoriasemalle. Rinne on
        /// radan kohdalla suora (profiili 2), joten laatta myötäilee sitä; mitään ei jää maan (y 0) alle.</summary>
        static void HsRata(Rakentaja r)
        {
            Vector3 a = HsRataAla, b = HsRataYla;
            var suunta = b - a; suunta.y = 0f;
            var sivu = Vector3.Cross(Vector3.up, suunta).normalized * 0.016f;
            var y = Vector3.up * HsRataPaksuus;
            r.AloitaOsa();
            r.NelioUlos(a - sivu + y, b - sivu + y, b + sivu + y, a + sivu + y, Vector3.up, EmMuste);
            r.NelioUlos(a - sivu, b - sivu, b - sivu + y, a - sivu + y, -sivu, EmSeepia);
            r.NelioUlos(a + sivu, b + sivu, b + sivu + y, a + sivu + y, sivu, EmSeepia);
            r.LopetaOsa();
        }

        /// <summary>
        /// FestungsBahnin vaunu (pivot laaksoasemalla radan pinnassa): punainen, radan suuntainen suunnikas (päädyt pystyssä,
        /// katto ja pohja radan kaltevuudessa) ja tumma ikkunanauha kummallakin kyljellä. Noin kolminkertaiseksi liioiteltu.
        /// </summary>
        static Mesh HohensalzburgVaunu()
        {
            var r = new Rakentaja();
            var d = HsRataYla - HsRataAla;
            var u = new Vector3(d.x, 0f, d.z);
            float vaaka = u.magnitude, kalt = d.y / vaaka;
            u = u / vaaka;
            var v = Vector3.Cross(Vector3.up, u) * 0.017f;
            const float korkeus = 0.03f;
            Vector3 P(float t, float s, float k) => u * t + Vector3.up * (t * kalt + k) + v * s;
            Vector3 A0 = P(0f, -1f, 0f), A1 = P(HsVaunuPituus, -1f, 0f), A2 = P(HsVaunuPituus, -1f, korkeus), A3 = P(0f, -1f, korkeus);
            Vector3 B0 = P(0f, 1f, 0f), B1 = P(HsVaunuPituus, 1f, 0f), B2 = P(HsVaunuPituus, 1f, korkeus), B3 = P(0f, 1f, korkeus);
            var keski = P(HsVaunuPituus * 0.5f, 0f, korkeus * 0.5f);
            r.AloitaOsa();
            r.NelioKeskelta(A0, A1, A2, A3, keski, HsPunainen);
            r.NelioKeskelta(B0, B1, B2, B3, keski, HsPunainen);
            r.NelioKeskelta(A0, B0, B3, A3, keski, HsPunainen);
            r.NelioKeskelta(A1, B1, B2, A2, keski, HsPunainen);
            r.NelioKeskelta(A3, A2, B2, B3, keski, HsPunainen);
            r.NelioKeskelta(A0, A1, B1, B0, keski, HsPunainen);
            // Ikkunanauha kyljissä (hieman kyljen ulkopuolella).
            foreach (float s in new[] { -1.04f, 1.04f })
                r.NelioUlos(P(0.006f, s, korkeus * 0.45f), P(HsVaunuPituus - 0.006f, s, korkeus * 0.45f), P(HsVaunuPituus - 0.006f, s, korkeus * 0.82f),
                    P(0.006f, s, korkeus * 0.82f), v * s, EmMuste);
            r.LopetaOsa();
            return r.Verkko("Hohensalzburg-vaunu");
        }

        /// <summary>Salzburger Stierin äänirengas: ohut vaakarengas (säde 0,3, pivot keskellä), jonka animaatio laajentaa
        /// Hoher Stockin katolta ulospäin.</summary>
        static Mesh HohensalzburgAani()
        {
            var r = new Rakentaja();
            r.Rengas(0f, (0f, 0f, 0.282f, 0.282f), (0f, 0f, 0.3f, 0.3f), 20, EmSeepia);
            return r.Verkko("Hohensalzburg-aani");
        }

        /// <summary>Kyyhkyparvi: kuusi harmaata kyyhkyä väljässä renkaassa (pivot Hoher Stockin katolla), siivet V-kulmassa. Linnut
        /// katsovat myötäpäivään (ylhäältä), koska animaation positiivinen kierto Y:n ympäri kiertää parvea myötäpäivään.</summary>
        static Mesh HohensalzburgParvi()
        {
            var r = new Rakentaja();
            for (int i = 0; i < 6; i++)
            {
                float a = i * Mathf.PI * 2f / 6f + (i % 2) * 0.35f;
                float sade = 0.07f + 0.04f * ((i * 5) % 3) / 2f;
                var p = new Vector3(Mathf.Cos(a) * sade, 0.03f * ((i * 7) % 3), Mathf.Sin(a) * sade);
                var eteen = new Vector3(Mathf.Sin(a), 0f, -Mathf.Cos(a));
                var sivu = Vector3.Cross(Vector3.up, eteen);
                Vector3 nokka = p + eteen * 0.014f, pyrsto = p - eteen * 0.011f;
                r.KalvoKolmio(nokka, pyrsto, p + sivu * 0.026f + Vector3.up * 0.01f - eteen * 0.007f, HsKyyhky);
                r.KalvoKolmio(nokka, pyrsto, p - sivu * 0.026f + Vector3.up * 0.01f - eteen * 0.007f, HsKyyhky);
            }
            return r.Verkko("Hohensalzburg-parvi");
        }

        /// <summary>Kyyhkyn harmaa (erottuu sekä valkoisesta linnasta että kartasta).</summary>
        static readonly Color HsKyyhky = Hex(0x938d84);

        /// <summary>Äänirenkaiden ja parven lähtöpiste Hoher Stockin katon harjalla.</summary>
        static readonly Vector3 HsKatto = new Vector3(0.07f, HsTaso + 0.17f + 0.085f, 0.035f);
        static readonly Vector3 HsValoPivot = new Vector3(0f, HsTaso, 0.04f);

        /// <summary>Muurin korkeus pihatason yläpuolella reunalla i: etukurtiini (12) korkein, Hoher Stockin ja länsisiiven edessä
        /// (13–14) matalampi, jotta julkisivut näkyvät sen yli; bastionien kaide matala.</summary>
        /// <summary>Julkisivuhehkun etäisyys muurin harjaviivasta: muurin ulkopinta on 0,005 harjan ulkopuolella, ja hehku jää
        /// 0,0008 pinnan eteen, eli ikkunoiden (Laatta 0,0015) taakse, joten ikkunat näkyvät valaistussa julkisivussa tummina.</summary>
        const float HsValoEtaisyys = 0.005f - 0.0007f;

        static float HsMuurinKorkeus(int i) => i == 12 ? 0.1f : i == 13 ? 0.055f : i == 14 ? 0.065f : HsBastioni(i) ? 0.03f : 0.06f;

        /// <summary>
        /// Yövalot (pivot linnan keskellä): kaupungin puolen (−Z) julkisivut valaistaan kuten todellisuudessa (muurit, Hoher
        /// Stock, tornit ja kirkko), ja muurien harjat hehkuvat, jotta valaistu linna erottuu myös ylhäältä. Valaisematon, ei bloomia.
        /// </summary>
        static Mesh HohensalzburgValot()
        {
            var r = new Rakentaja();
            var o = HsValoPivot;
            for (int i = 0; i < HsHarja.Length; i++)
            {
                float h = HsMuurinKorkeus(i);
                var a = HsReuna(i, 0.05f, 0.006f, HsTaso + h + 0.002f) - o; var b = HsReuna(i, 0.95f, 0.006f, HsTaso + h + 0.002f) - o;
                var n = HsUlos(i) * 0.009f;
                r.NelioUlos(a - n, b - n, b + n, a + n, Vector3.up, EmIkkunavalo);
                // Julkisivu kaupungin puolella (edessä ja sivuilla: reunat 9–15 ja 0).
                if (i >= 9 || i == 0)
                {
                    float pituus = (HsReuna(i, 1f) - HsReuna(i, 0f)).magnitude;
                    r.Laatta(HsReuna(i, 0.5f, -HsValoEtaisyys, HsTaso + 0.005f + (h - 0.015f) * 0.5f) - o, HsUlos(i), pituus * 0.88f, h - 0.015f, EmIkkunavalo);
                }
            }
            // Hoher Stock (ikkunat jäävät hehkun eteen), Glockenturm, länsisiipi, Reckturm ja Georgskirche kameraa kohti.
            r.Laatta(new Vector3(0.07f, HsTaso + 0.095f, 0.035f - 0.065f + 0.0007f) - o, Vector3.back, 0.18f, 0.13f, EmIkkunavalo);
            r.Laatta(new Vector3(0.175f, HsTaso + 0.11f, -0.022f - 0.03f) - o, Vector3.back, 0.04f, 0.15f, EmIkkunavalo);
            r.Laatta(new Vector3(0.255f, HsTaso + 0.045f, -0.004f - 0.031f) - o, Vector3.back, 0.11f, 0.07f, EmIkkunavalo);
            r.Laatta(new Vector3(0.35f, HsTaso + 0.11f, 0.08f - 0.025f) - o, Vector3.back, 0.044f, 0.16f, EmIkkunavalo);
            r.Laatta(new Vector3(-0.2f, HsTaso + 0.032f, -0.05f - 0.021f) - o, Vector3.back, 0.078f, 0.05f, EmIkkunavalo);
            return r.Verkko("Hohensalzburg-valot");
        }

        static LiikkuvaOsaMaaritys[] HohensalzburgOsat()
        {
            var matka = HsVaununMatka;
            return new[]
            {
                new LiikkuvaOsaMaaritys { Nimi = "vaunu", Verkko = HohensalzburgVaunu, Pivot = HsRataAla + Vector3.up * HsRataPaksuus, Liike = Liike.Liuku,
                    Akseli = matka.normalized, Laajuus = matka.magnitude, KayS = 14f, TaukoS = 30f },
                new LiikkuvaOsaMaaritys { Nimi = "aani0", Verkko = HohensalzburgAani, Pivot = HsKatto, Liike = Liike.Aalto, Akseli = Vector3.up },
                new LiikkuvaOsaMaaritys { Nimi = "aani1", Verkko = HohensalzburgAani, Pivot = HsKatto, Liike = Liike.Aalto, Akseli = Vector3.up },
                new LiikkuvaOsaMaaritys { Nimi = "aani2", Verkko = HohensalzburgAani, Pivot = HsKatto, Liike = Liike.Aalto, Akseli = Vector3.up },
                new LiikkuvaOsaMaaritys { Nimi = "parvi", Verkko = HohensalzburgParvi, Pivot = HsKatto, Liike = Liike.Kierto, Akseli = Vector3.up,
                    Nopeus = 0.15f },
                new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = HohensalzburgValot, Pivot = HsValoPivot, Liike = Liike.Valahdys },
            };
        }

        static readonly bool hohensalzburg = Rekisteroi("hohensalzburg",
            new Erikoismalli { Runko = HohensalzburgRunko, Osat = HohensalzburgOsat, Lahi = HohensalzburgLahi, Kolmiot0 = 1053, KokoKerroin = 1.5f });
    }
}
