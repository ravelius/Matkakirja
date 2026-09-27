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
            new Erikoismalli { Runko = HohensalzburgRunko, Osat = HohensalzburgOsat, Kolmiot0 = 1053, KokoKerroin = 1.5f });
    }
}
