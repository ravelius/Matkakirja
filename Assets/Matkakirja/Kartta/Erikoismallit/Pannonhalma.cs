using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI PANNONHALMAN ARKKILUOSTARI (Pannonhalmi Főapátság; speksi docs/raportit/erikoismallit/pannonhalma.md,
    /// omistaja valitsi elämänidean A 27.9.2026 klo 18.4x). Nosto kohde:pannonhalma, Unkari, 47,5526 N 17,759 E, taso 1.
    /// Tunnistus sekunnissa: korkea klassistinen torni (vaalea neliörunko kolmine kaikuaukkoineen ja kellotauluineen, pyöreä
    /// 12 pylvään rumpu, attika ja kuparinvihreä kupoli kaksoisristeineen) pyöreän metsäisen kukkulan laella, sen vasemmalla
    /// kirjasto päätykolmioineen ja pienine kattolyhtyineen, oikealla pitkä vaalea julkisivurivi tummin katoin ja iso
    /// gimnázium; tornin edessä terassi ja kaareva tukimuuri kaarineen. Kellokerroksessa näkyy pronssinen kello.
    /// Mittakaava: vaakasuunnassa 1,0 ≈ 260 m (luostari noin 0,72 leveä), kukkula madallettu noin puoleen (laki 0,20) ja
    /// juuri tiivistetty (rinne todellista jyrkempi); rakennukset liioiteltu noin 1,6-kertaisiksi (siipien harja noin 0,31–0,34,
    /// tornin risti 0,543). Tornin runko on levennetty 0,08:aan (todellinen noin 0,046) samassa suhteessa kuin korkeus, joten
    /// tornin mittasuhteet säilyvät ja pyöreä pää luetaan 40 pt:ssä. Laki on puistoa (vaaleampi vihreä), terassi kiveystä ja
    /// tukimuuri valokuvien tapaan julkisivuja tummempaa kiveä.
    /// SUUNTA TYYLITELTY: klassinen näkymä on lounaasta (kirjasto vasemmalla, sitten torni, oikealla siivet ja gimnázium).
    /// Kallistettu kamera katsoo etelästä, joten malli on käännetty 45° vastapäivään: todellinen luode on mallin vasemmalla
    /// (−X), kaakko oikealla (+X) ja koillinen takana (+Z); basilika kulkee tornista oikealle taakse (45°).
    /// Pohjan rajat x −0,5…0,5 ja z −0,4…0,4, juuri kukkulan keskellä maassa, ei pohjalevyä.
    /// Liikkuvat osat:
    ///   h&lt;a&gt;&lt;g&gt;o / h&lt;a&gt;&lt;g&gt;v   hanhiaurat: aura a (0: 9 paikkaa, 1: 7 paikkaa), hanhi g, oikea (o) ja vasen (v) puolisko
    ///                   (siipi ja puolet rungosta), joten siivet räpyttävät pelkällä kierrolla (Transform), pivot PhHanhiPivot
    ///   kello0, kello1  pronssikellot etukaikuaukossa ja itäsivun aukossa (pivot kannattimessa, heilahdus aukon tasossa)
    ///   aani0–2         äänirenkaat laajenevat kellokerroksesta (harvinainen ja napautus)
    ///   valot           yöllä julkisivujen ja tornin rungon lämmin hehku (pivot julkisivurivin juuressa)
    ///   valot1          yöllä pylväsrummun ja attikan hehku (pivot rummun keskellä, syttyy paikallaan)
    ///   valot2          yöllä kirjaston ikkunat (pivot kirjaston julkisivun keskellä)
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Kukkulan laki (luostarin pihataso).</summary>
        const float PhTaso = 0.2f;
        /// <summary>Tornin akseli (x, z) ja neliörungon puolileveys (0,08 leveä: todellinen suhde korkeus/leveys noin 4,6 säilyy,
        /// kun korkeus on liioiteltu 1,6-kertaiseksi). Sama torni liikeytimessä (PannonhalmaLiike.TorniX/Z).</summary>
        const float PhTx = -0.12f, PhTz = -0.145f, PhTp = 0.04f;
        /// <summary>Tornin kerrokset: neliörungon yläreuna, reunuslista, pylväsrumpu, palkisto, attika ja kupoli (risti 0,03 kupolin
        /// yllä, huippu 0,546). Suhteet valokuvasta: neliörunko 55 %, rumpu 17 %, attika 6 %, kupoli 11 %, risti 9 %.</summary>
        const float PhT1 = 0.388f, PhReunusH = 0.009f, PhR0 = PhT1 + PhReunusH, PhR1 = 0.448f, PhPalkkiH = 0.011f, PhA0 = PhR1 + PhPalkkiH,
            PhA1 = 0.479f, PhK1 = 0.516f;
        /// <summary>Pylväsrummun säteet: pylväiden kehä, pylväs, sisälieriö, palkisto, attika ja kupolin tyvi.</summary>
        const float PhPylvasKeha = 0.035f, PhPylvas = 0.0046f, PhSisaSade = 0.024f, PhPalkkiSade = 0.042f, PhAttikaSade = 0.028f, PhKupoliSade = 0.031f;
        /// <summary>Kaikuaukot (kellokerros): keskikorkeus, korkeus, leveys ja väli; kellotaulu aukkojen yllä.</summary>
        const float PhAukkoY = 0.33f, PhAukkoH = 0.044f, PhAukkoW = 0.015f, PhAukkoVali = 0.023f, PhKelloTauluY = 0.37f;

        /// <summary>Kirjasto (vasemmalla, julkisivu ja päätykolmio etelään): keskipiste, leveys, syvyys ja räystäs pihatasosta;
        /// seinät alkavat rinteen puolella alempaa (todellisuudessa kirjastossa on rinteeseen kerros lisää).</summary>
        const float PhKx = -0.29f, PhKz = -0.15f, PhKl = 0.14f, PhKs = 0.11f, PhKh = 0.1f;
        /// <summary>Julkisivurivin siivet (keskipiste x, z, leveys X, syvyys Z, räystäs): linkkisiipi kirjaston ja tornin välissä,
        /// matala siipi tornin oikealla, päärakennus (päätykolmio etelään) ja siipi sen oikealla.</summary>
        const float PhLinkX = -0.19f, PhLinkZ = -0.14f, PhLinkL = 0.06f, PhLinkS = 0.07f, PhLinkH = 0.075f;
        const float PhMatX = -0.05f, PhMatZ = -0.145f, PhMatL = 0.06f, PhMatS = 0.06f, PhMatH = 0.075f;
        const float PhPaaX = 0.035f, PhPaaZ = -0.13f, PhPaaL = 0.11f, PhPaaS = 0.1f, PhPaaH = 0.095f;
        const float PhOikX = 0.1275f, PhOikZ = -0.12f, PhOikL = 0.075f, PhOikS = 0.07f, PhOikH = 0.085f;
        /// <summary>Gimnázium (oikealla edessä): etukappaleen rajat ja korkeus.</summary>
        const float PhGx0 = 0.165f, PhGx1 = 0.35f, PhGz0 = -0.22f, PhGz1 = -0.09f, PhGh = 0.105f;
        /// <summary>Rinteen puolelle ulottuvien rakennusten seinien alareuna (piiloon rinteen sisään).</summary>
        const float PhPerusta = 0.1f;

        // ---- Paletti (Em-seepiaramppi; aksentiton kuten Kinderdijk, kupolin kuparinvihreä on materiaaliväri) ----
        /// <summary>Tukimuuri harmaanruskeaa kiveä (valokuvissa tummempi kuin julkisivut, joten vaalea rivi erottuu sen päällä);
        /// laki puistona ja puutarhoina (metsärinnettä vaaleampi vihreä), terassi kiveystä.</summary>
        static readonly Color PhValkoinen = Hex(0xf3ebd6), PhKivi = Hex(0xe2d8bd), PhSisus = Hex(0x9c8a6a), PhMuuri = Hex(0xa99a7a),
            PhMuuriKaari = Hex(0x6f5f47), PhPiha = Hex(0xa3a677), PhTerassi = Hex(0xbfb091), PhMetsa = Hex(0x7c885a), PhPuu = Hex(0x5f6e45), PhKupari = Hex(0x86a08a),
            PhKattoTumma = Hex(0x62503a), PhViini = Hex(0xb3ad76), PhViiniRivi = Hex(0x7c7a4c), PhHanhi = Hex(0x6f6557), PhHanhiSiipi = Hex(0xb2aa99),
            PhHanhiTumma = Hex(0x4f463c), PhHanhiVatsa = Hex(0x8f8676), PhHehkuKivi = Hex(0xf4d898);

        /// <summary>Lähitason sävyt rungon paletista (ominaisuuksina, koska Em-paletti on toisessa tiedostossa: staattisten kenttien
        /// alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color PhLhPuuVaalea => Color.Lerp(PhPuu, PhMetsa, 0.4f);
        static Color PhLhMuuriKehys => Color.Lerp(PhMuuri, PhKivi, 0.55f);
        static Color PhLhKaytava => Color.Lerp(PhTerassi, PhKivi, 0.45f);
        static Color PhLhSauma => Color.Lerp(PhTerassi, EmSeepia, 0.35f);
        static Color PhLhRaystasVari => Color.Lerp(PhValkoinen, EmSeepia, 0.45f);
        static Color PhLhSale => Color.Lerp(EmSeepia, EmMuste, 0.25f);
        static Color PhLhKylkiluu => Color.Lerp(PhKupari, PhValkoinen, 0.3f);
        static Color PhLhKapiteeli => Color.Lerp(PhKivi, EmSeepia, 0.45f);
        static Color PhLhMosaiikki => Color.Lerp(EmKulta, EmSeepia, 0.45f);
        static Color PhLhReliefi => Color.Lerp(PhValkoinen, EmSeepia, 0.18f);
        static Color PhLhTolppa => Color.Lerp(EmSeepia, EmMuste, 0.4f);
        static Color PhLhKattoKaista => Color.Lerp(EmKatto, EmKiviVaalea, 0.42f);

        // ---- Kukkula ----

        const int PhKarkia = 20;

        /// <summary>
        /// Kukkulan laen reuna (rengas 0, y = PhTaso) vastapäivään ylhäältä katsottuna oikealta alkaen. Etureunassa kärjet 13–17
        /// ovat tukimuurin harja: kaareva muuri kirjaston oikeasta kulmasta gimnáziumin vasempaan kulmaan terassin edessä.
        /// </summary>
        static readonly Vector2[] PhHarja =
        {
            new Vector2(0.405f, -0.04f), new Vector2(0.39f, 0.06f), new Vector2(0.34f, 0.14f), new Vector2(0.25f, 0.195f),
            new Vector2(0.12f, 0.215f), new Vector2(0f, 0.22f), new Vector2(-0.13f, 0.21f), new Vector2(-0.25f, 0.175f),
            new Vector2(-0.34f, 0.115f), new Vector2(-0.39f, 0.035f), new Vector2(-0.41f, -0.055f), new Vector2(-0.39f, -0.145f),
            new Vector2(-0.33f, -0.225f), new Vector2(-0.225f, -0.245f), new Vector2(-0.11f, -0.263f), new Vector2(0.01f, -0.268f),
            new Vector2(0.12f, -0.26f), new Vector2(0.2f, -0.25f), new Vector2(0.3f, -0.245f), new Vector2(0.375f, -0.155f),
        };

        /// <summary>Kukkulan juuri (rengas 3, y = 0) samoilla kärjillä: pyöristetty soikio 1,0 × 0,8.</summary>
        static readonly Vector2[] PhJuuri =
        {
            new Vector2(0.5f, -0.03f), new Vector2(0.49f, 0.12f), new Vector2(0.44f, 0.24f), new Vector2(0.33f, 0.33f),
            new Vector2(0.17f, 0.385f), new Vector2(0f, 0.4f), new Vector2(-0.17f, 0.385f), new Vector2(-0.33f, 0.33f),
            new Vector2(-0.44f, 0.24f), new Vector2(-0.49f, 0.12f), new Vector2(-0.5f, -0.02f), new Vector2(-0.48f, -0.155f),
            new Vector2(-0.42f, -0.27f), new Vector2(-0.29f, -0.355f), new Vector2(-0.135f, -0.395f), new Vector2(0.01f, -0.4f),
            new Vector2(0.155f, -0.39f), new Vector2(0.28f, -0.35f), new Vector2(0.39f, -0.285f), new Vector2(0.465f, -0.17f),
        };

        /// <summary>Tukimuurin kärjet (13–17): rinteen ylin vyö on pystysuora muuri.</summary>
        static bool PhMuuriKarki(int i) { i = ((i % PhKarkia) + PhKarkia) % PhKarkia; return i >= 13 && i <= 17; }
        /// <summary>Reuna i → i + 1 on tukimuuria.</summary>
        static bool PhMuuriReuna(int i) => PhMuuriKarki(i) && PhMuuriKarki(i + 1);

        /// <summary>Rinteen profiili: (vaakaosuus laelta juurelle, korkeusosuus) renkaille 0 (laki) … 3 (juuri). Laji 0 = pyöreä
        /// metsärinne (loiva olka, jyrkkä kylki), laji 1 = tukimuuri (pystysuora ylin vyö, sitten metsärinne).</summary>
        static readonly float[,] PhProfiiliF = { { 0f, 0.28f, 0.64f, 1f }, { 0f, 0.015f, 0.45f, 1f } };
        static readonly float[,] PhProfiiliH = { { 1f, 0.8f, 0.38f, 0f }, { 1f, 0.6f, 0.28f, 0f } };

        /// <summary>Rinteen piste: kärki i (0–19), rengas j (0 laki … 3 juuri).</summary>
        static Vector3 PhRinne(int i, int j)
        {
            i = ((i % PhKarkia) + PhKarkia) % PhKarkia;
            int laji = PhMuuriKarki(i) ? 1 : 0;
            float f = PhProfiiliF[laji, j], h = PhProfiiliH[laji, j];
            Vector2 a = PhHarja[i], b = PhJuuri[i];
            return new Vector3(Mathf.Lerp(a.x, b.x, f), PhTaso * h, Mathf.Lerp(a.y, b.y, f));
        }

        /// <summary>Rinteen piste liukuluvuilla: kärkien i ja i + 1 välissä osuudella s, renkaiden j ja j + 1 välissä osuudella t.</summary>
        static Vector3 PhRinnePiste(int i, float s, int j, float t)
        {
            var a = Vector3.Lerp(PhRinne(i, j), PhRinne(i, j + 1), t);
            var b = Vector3.Lerp(PhRinne(i + 1, j), PhRinne(i + 1, j + 1), t);
            return Vector3.Lerp(a, b, s);
        }

        /// <summary>Laen reunan ulkonormaali kärkien i → i + 1 välillä (vaakasuora).</summary>
        static Vector3 PhUlos(int i)
        {
            Vector2 a = PhHarja[((i % PhKarkia) + PhKarkia) % PhKarkia], b = PhHarja[(((i + 1) % PhKarkia) + PhKarkia) % PhKarkia];
            return new Vector3(b.y - a.y, 0f, -(b.x - a.x)).normalized;
        }

        /// <summary>Piste tukimuurin pinnalla reunalla i (osuus s) korkeudella y (muurin pinta laelta renkaaseen 1).</summary>
        static Vector3 PhMuurinPinta(int i, float s, float y)
        {
            float f = Mathf.Clamp01((PhTaso - y) / (PhTaso * (1f - PhProfiiliH[1, 1])));
            var a = Vector3.Lerp(PhRinne(i, 0), PhRinne(i, 1), f);
            var b = Vector3.Lerp(PhRinne(i + 1, 0), PhRinne(i + 1, 1), f);
            var p = Vector3.Lerp(a, b, s);
            return new Vector3(p.x, y, p.z);
        }

        /// <summary>Kukkula yhtenä ääriviivaosana (viiva kiertää juuren): kolme rinnevyötä (ylin etureunassa tukimuurin
        /// pinta), laki viuhkana. 20 × 6 + 20 = 140 kolmiota.</summary>
        static void PhKukkula(Rakentaja r)
        {
            r.AloitaOsa();
            for (int i = 0; i < PhKarkia; i++)
            {
                int q = (i + 1) % PhKarkia;
                var ulos = PhUlos(i) + Vector3.up * 0.4f;
                for (int j = 0; j < 3; j++)
                {
                    var vari = j == 0 && PhMuuriReuna(i) ? PhMuuri : PhMetsa;
                    r.NelioUlos(PhRinne(i, j), PhRinne(q, j), PhRinne(q, j + 1), PhRinne(i, j + 1), j == 0 && PhMuuriReuna(i) ? PhUlos(i) : ulos, vari);
                }
            }
            var keski = new Vector3(-0.02f, PhTaso, 0f);
            for (int i = 0; i < PhKarkia; i++) r.KolmioUlos(keski, PhRinne(i, 0), PhRinne(i + 1, 0), Vector3.up, PhPiha);
            r.LopetaOsa();
        }

        /// <summary>Metsän puut rinteellä (kärki i, osuus s, vyö j, osuus t, koko): etu- ja sivurinteillä tiheämmin (kamera),
        /// takana harvemmin (näkyvät ylhäältä). Viinitarhan kohdalla (reuna 16, alin vyö) ei puita.</summary>
        static readonly (int i, float s, int j, float t, float koko)[] PhMetsanPuut =
        {
            (10, 0.3f, 1, 0.5f, 0.95f), (10, 0.75f, 2, 0.12f, 1f), (11, 0.35f, 1, 0.45f, 1f), (11, 0.8f, 2, 0.4f, 0.9f),
            (12, 0.25f, 1, 0.55f, 1.05f), (12, 0.7f, 2, 0.25f, 1f), (13, 0.3f, 1, 0.5f, 0.95f), (13, 0.75f, 2, 0.45f, 1.1f),
            (14, 0.2f, 2, 0.2f, 1f), (14, 0.6f, 1, 0.55f, 0.9f), (14, 0.85f, 2, 0.5f, 1.05f), (15, 0.35f, 1, 0.45f, 1f),
            (15, 0.7f, 2, 0.3f, 0.95f), (16, 0.2f, 1, 0.5f, 1.05f), (17, 0.3f, 1, 0.45f, 1f), (17, 0.75f, 2, 0.4f, 0.95f),
            (18, 0.35f, 1, 0.5f, 1.05f), (18, 0.8f, 2, 0.3f, 0.9f), (19, 0.4f, 1, 0.45f, 1f), (19, 0.8f, 2, 0.3f, 1f),
            (0, 0.45f, 1, 0.5f, 0.95f), (1, 0.5f, 2, 0.3f, 1f),
            (2, 0.4f, 1, 0.5f, 1f), (3, 0.5f, 2, 0.4f, 1.05f), (4, 0.35f, 1, 0.5f, 0.95f), (5, 0.6f, 2, 0.35f, 1f),
            (6, 0.4f, 1, 0.45f, 1.05f), (7, 0.55f, 2, 0.4f, 0.95f), (8, 0.4f, 1, 0.5f, 1f), (9, 0.5f, 2, 0.2f, 1f),
        };

        /// <summary>Pihojen puut laella (x, z, koko): kirjaston takana, basilikan pohjoispuolella ja ristikäytävän pihalla.</summary>
        static readonly Vector3[] PhPihanPuut =
        {
            new Vector3(-0.32f, -0.04f, 1f), new Vector3(-0.25f, 0.05f, 1.1f), new Vector3(-0.17f, 0.12f, 0.95f),
            new Vector3(-0.07f, 0.16f, 0.9f), new Vector3(0.1f, -0.01f, 0.85f), new Vector3(0.14f, 0.035f, 0.8f),
            new Vector3(-0.34f, 0.06f, 0.9f), new Vector3(-0.29f, 0.13f, 1f), new Vector3(0.05f, 0.18f, 0.95f), new Vector3(0.29f, 0.12f, 0.9f),
        };

        /// <summary>Lähitason lisäpuut rinteellä (20 pienempää puuta rungon puiden väleissä; ei viinitarhan kohdalla).</summary>
        static readonly (int i, float s, int j, float t, float koko)[] PhLhLisapuut =
        {
            (10, 0.55f, 1, 0.3f, 0.75f), (11, 0.1f, 2, 0.5f, 0.8f), (11, 0.6f, 1, 0.75f, 0.7f), (12, 0.5f, 2, 0.6f, 0.8f),
            (12, 0.9f, 1, 0.3f, 0.7f), (13, 0.55f, 2, 0.15f, 0.75f), (14, 0.4f, 2, 0.6f, 0.8f), (14, 0.05f, 1, 0.4f, 0.7f),
            (15, 0.5f, 1, 0.75f, 0.75f), (15, 0.9f, 2, 0.55f, 0.8f), (16, 0.55f, 1, 0.3f, 0.7f), (17, 0.5f, 2, 0.65f, 0.8f),
            (17, 0.1f, 1, 0.6f, 0.7f), (18, 0.6f, 1, 0.2f, 0.75f), (18, 0.2f, 2, 0.6f, 0.8f), (19, 0.15f, 2, 0.4f, 0.7f),
            (0, 0.8f, 2, 0.35f, 0.75f), (2, 0.8f, 2, 0.3f, 0.8f), (5, 0.1f, 1, 0.5f, 0.75f), (8, 0.8f, 2, 0.4f, 0.8f),
            (1, 0.15f, 1, 0.45f, 0.7f), (3, 0.1f, 1, 0.5f, 0.75f), (4, 0.8f, 2, 0.45f, 0.8f), (6, 0.85f, 2, 0.35f, 0.75f),
            (7, 0.2f, 1, 0.55f, 0.7f), (9, 0.15f, 1, 0.45f, 0.75f), (9, 0.85f, 1, 0.6f, 0.7f), (13, 0.95f, 1, 0.55f, 0.7f),
            (16, 0.9f, 1, 0.6f, 0.7f), (19, 0.6f, 1, 0.75f, 0.75f),
            (11, 0.85f, 2, 0.3f, 0.7f), (12, 0.25f, 1, 0.8f, 0.7f), (14, 0.7f, 2, 0.35f, 0.75f), (15, 0.25f, 2, 0.75f, 0.7f),
            (17, 0.85f, 1, 0.35f, 0.7f), (18, 0.95f, 2, 0.45f, 0.75f), (0, 0.15f, 2, 0.3f, 0.7f), (1, 0.8f, 1, 0.3f, 0.75f),
            (3, 0.75f, 1, 0.4f, 0.7f), (7, 0.85f, 1, 0.3f, 0.75f),
        };

        /// <summary>Lähitason lisäpuut laella (puutarhat ja pihat, x, z, koko).</summary>
        static readonly Vector3[] PhLhPihanLisapuut =
        {
            new Vector3(-0.36f, 0.0f, 0.75f), new Vector3(-0.21f, 0.09f, 0.8f), new Vector3(-0.12f, 0.19f, 0.75f),
            new Vector3(0.0f, 0.2f, 0.7f), new Vector3(0.2f, 0.17f, 0.75f), new Vector3(0.36f, 0.06f, 0.7f),
        };

        /// <summary>Puut: rungossa viisikulmaiset kartiot, lähitasolla samat puut kuusikulmaisina (sama koko ja paikka) ja
        /// 20 pienempää vaaleampaa puuta lisää.</summary>
        static void PhPuut(Rakentaja r, bool lahi)
        {
            int sivuja = lahi ? 6 : 5;
            foreach (var (i, s, j, t, koko) in PhMetsanPuut)
                r.Kartio(PhRinnePiste(i, s, j, t) - Vector3.up * 0.012f, 0.028f * koko, 0.058f * koko, sivuja, PhPuu);
            foreach (var p in PhPihanPuut)
                r.Kartio(new Vector3(p.x, PhTaso - 0.004f, p.y), 0.024f * p.z, 0.05f * p.z, sivuja, PhPuu);
            if (!lahi) return;
            foreach (var (i, s, j, t, koko) in PhLhLisapuut)
                r.Kartio(PhRinnePiste(i, s, j, t) - Vector3.up * 0.01f, 0.028f * koko, 0.058f * koko, 6, PhLhPuuVaalea);
            foreach (var p in PhLhPihanLisapuut)
                r.Kartio(new Vector3(p.x, PhTaso - 0.004f, p.y), 0.024f * p.z, 0.05f * p.z, 6, PhLhPuuVaalea);
        }

        // ---- Tukimuuri ja terassi ----

        /// <summary>
        /// Tukimuuri omana ääriviivaosanaan: muurin pinta on kukkulan ylin vyö kärjillä 13–17, ja sen harjalla kulkee kaide
        /// (ulkopinta ja kansi), joten terassin reuna erottuu viivana. Rungossa kaaret sokeina holveina (sisäviivat); lähitasolla
        /// kymmenen kaarta syvennyksinä (vaalea kehys ja tumma syvennys) ja lesenat kaarten välissä.
        /// </summary>
        static void PhTukimuuri(Rakentaja r, bool lahi)
        {
            const float h = 0.008f, paksuus = 0.006f;
            var up = Vector3.up * h;
            r.AloitaOsa();
            for (int i = 13; i < 17; i++)
            {
                var u = PhUlos(i);
                Vector3 a = PhRinne(i, 0), b = PhRinne(i + 1, 0);
                r.NelioUlos(a, b, b + up, a + up, u, PhMuuri);
                r.NelioUlos(a + up, b + up, b + up - u * paksuus, a + up - u * paksuus, Vector3.up, PhKivi);
            }
            r.LopetaOsa();
            if (!lahi)
            {
                for (int i = 13; i < 17; i++)
                    foreach (float s in new[] { 0.3f, 0.7f })
                        r.Laatta(PhMuurinPinta(i, s, 0.152f), PhUlos(i), 0.016f, 0.042f, PhMuuriKaari);
                return;
            }
            int[] kpl = { 3, 3, 2, 2 };
            for (int k = 0; k < 4; k++)
            {
                int i = 13 + k;
                var u = PhUlos(i);
                for (int m = 0; m < kpl[k]; m++)
                {
                    float s = (m + 0.5f) / kpl[k];
                    var p = PhMuurinPinta(i, s, 0.156f);
                    r.Holvi(p, u, 0.021f, 0.05f, PhLhMuuriKehys);
                    r.Holvi(p + u * 0.0008f, u, 0.0155f, 0.045f, PhMuuriKaari);
                    if (m > 0) r.Laatta(PhMuurinPinta(i, (float)m / kpl[k], 0.16f), u, 0.005f, 0.068f, PhLhMuuriKehys);
                }
            }
        }

        /// <summary>Terassi tornin ja päärakennuksen edessä: tukimuurin harjalta julkisivuriviin (0,0006 laen yllä). 8 kolmiota;
        /// lähitasolla vaaleampi käytävä tornin ovelta muurille ja kaksi kiveyksen saumaa.</summary>
        static void PhTerassiLaatta(Rakentaja r, bool lahi)
        {
            const float y = PhTaso + 0.0006f;
            float[] taka = { PhKz - PhKs * 0.5f, PhLinkZ - PhLinkS * 0.5f, PhPaaZ - PhPaaS * 0.5f, PhOikZ - PhOikS * 0.5f, PhGz0 };
            for (int k = 0; k < 4; k++)
            {
                Vector3 a = PhRinne(13 + k, 0), b = PhRinne(14 + k, 0);
                a.y = y; b.y = y;
                var c = new Vector3(b.x, y, taka[k + 1]); var d = new Vector3(a.x, y, taka[k]);
                r.NelioUlos(a, b, c, d, Vector3.up, PhTerassi);
            }
            if (!lahi) return;
            float y2 = y + 0.0004f, etu = PhTz - PhTp - 0.012f, muuri = -0.255f;
            r.NelioUlos(new Vector3(PhTx - 0.011f, y2, muuri), new Vector3(PhTx + 0.011f, y2, muuri), new Vector3(PhTx + 0.011f, y2, etu),
                new Vector3(PhTx - 0.011f, y2, etu), Vector3.up, PhLhKaytava);
            foreach (float z in new[] { -0.215f, -0.238f })
                r.NelioUlos(new Vector3(-0.205f, y2, z - 0.0009f), new Vector3(0.11f, y2, z - 0.0009f), new Vector3(0.11f, y2, z + 0.0009f),
                    new Vector3(-0.205f, y2, z + 0.0009f), Vector3.up, PhLhSauma);
        }

        // ---- Rakennusten apurit ----

        /// <summary>Neljä seinää ilman kattoa ja pohjaa: keskipohja p, leveys lx (X), syvyys lz (Z), korkeus h. 8 kolmiota.</summary>
        static void PhSeinat(Rakentaja r, Vector3 p, float lx, float lz, float h, Color vari)
        {
            float x = lx * 0.5f, z = lz * 0.5f;
            Vector3 A = p + new Vector3(-x, 0f, -z), B = p + new Vector3(x, 0f, -z), C = p + new Vector3(x, 0f, z), D = p + new Vector3(-x, 0f, z);
            var up = Vector3.up * h;
            var k = p + up * 0.5f;
            r.NelioKeskelta(A, B, B + up, A + up, k, vari);
            r.NelioKeskelta(B, C, C + up, B + up, k, vari);
            r.NelioKeskelta(C, D, D + up, C + up, k, vari);
            r.NelioKeskelta(D, A, A + up, D + up, k, vari);
        }

        /// <summary>Lonkkakatto: räystään keskikohta p, pituus lx (X), syvyys lz (Z) ja korkeus h; harja X-suunnassa. 6 kolmiota.</summary>
        static void PhLonkka(Rakentaja r, Vector3 p, float lx, float lz, float h, Color katto)
        {
            float x = lx * 0.5f, z = lz * 0.5f, hx = Mathf.Max(0f, x - z);
            Vector3 A = p + new Vector3(-x, 0f, -z), B = p + new Vector3(x, 0f, -z), C = p + new Vector3(x, 0f, z), D = p + new Vector3(-x, 0f, z);
            Vector3 H1 = p + new Vector3(-hx, h, 0f), H2 = p + new Vector3(hx, h, 0f), k = p + Vector3.up * (h * 0.3f);
            r.NelioKeskelta(A, B, H2, H1, k, katto);
            r.NelioKeskelta(C, D, H1, H2, k, katto);
            r.KolmioKeskelta(D, A, H1, k, katto);
            r.KolmioKeskelta(B, C, H2, k, katto);
        }

        /// <summary>Pystysuora särmiö ilman kansia (pylväs, jonka päälle tulee palkisto): pohja p, säde, korkeus, sivut; kulma =
        /// ensimmäisen kärjen suunta (rad). 2 × sivuja kolmiota.</summary>
        static void PhSarmio(Rakentaja r, Vector3 p, float sade, float h, int sivuja, Color vari, float kulma)
        {
            var up = Vector3.up * h;
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = kulma + i * Mathf.PI * 2f / sivuja, a1 = a0 + Mathf.PI * 2f / sivuja;
                Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * sade, d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * sade;
                r.NelioUlos(p + d0, p + d1, p + d1 + up, p + d0 + up, d0 + d1, vari);
            }
        }

        /// <summary>Kupolin profiili (säteen ja korkeuden osuudet renkaittain): hieman korotettu kuten Pannonhalman kupoli.</summary>
        static readonly float[] PhKupoliR = { 1f, 0.87f, 0.52f, 0f }, PhKupoliY = { 0f, 0.46f, 0.84f, 1f };

        /// <summary>Kupoli: tyven keskipiste p, säde ja korkeus, sivut. 5 × sivuja kolmiota.</summary>
        static void PhKupoliMuoto(Rakentaja r, Vector3 p, float sade, float h, int sivuja, Color vari)
        {
            var keski = p + Vector3.up * (h * 0.35f);
            for (int j = 0; j < 2; j++)
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1));
                    r.NelioKeskelta(p + d0 * (sade * PhKupoliR[j]) + Vector3.up * (h * PhKupoliY[j]), p + d1 * (sade * PhKupoliR[j]) + Vector3.up * (h * PhKupoliY[j]),
                        p + d1 * (sade * PhKupoliR[j + 1]) + Vector3.up * (h * PhKupoliY[j + 1]), p + d0 * (sade * PhKupoliR[j + 1]) + Vector3.up * (h * PhKupoliY[j + 1]),
                        keski, vari);
                }
            var huippu = p + Vector3.up * h;
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                r.KolmioKeskelta(p + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * (sade * PhKupoliR[2]) + Vector3.up * (h * PhKupoliY[2]),
                    p + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * (sade * PhKupoliR[2]) + Vector3.up * (h * PhKupoliY[2]), huippu, keski, vari);
            }
        }

        /// <summary>Lähitason kupolin kylkiluut: kahdeksan vaaleampaa kaistaletta kupolin kärkiviivoilla (0,0008 pinnan yllä,
        /// kapenevat huippuun). 40 kolmiota.</summary>
        static void PhLhKylkiluut(Rakentaja r, Vector3 p, float sade, float h)
        {
            const float lev = 0.0013f, nosto = 0.0008f;
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI / 4f;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var t = new Vector3(-Mathf.Sin(a), 0f, Mathf.Cos(a));
                for (int j = 0; j < 3; j++)
                {
                    Vector3 p0 = p + d * (sade * PhKupoliR[j]) + Vector3.up * (h * PhKupoliY[j]), p1 = p + d * (sade * PhKupoliR[j + 1]) + Vector3.up * (h * PhKupoliY[j + 1]);
                    var seg = p1 - p0;
                    var n = Vector3.Cross(t, seg).normalized;
                    if (Vector3.Dot(n, d) + n.y < 0f) n = -n;
                    float w0 = lev * (1f - j / 3f), w1 = lev * (1f - (j + 1) / 3f);
                    if (j < 2) r.NelioUlos(p0 - t * w0 + n * nosto, p0 + t * w0 + n * nosto, p1 + t * w1 + n * nosto, p1 - t * w1 + n * nosto, n, PhLhKylkiluu);
                    else r.KolmioUlos(p0 - t * w0 + n * nosto, p0 + t * w0 + n * nosto, p1 + n * nosto, n, PhLhKylkiluu);
                }
            }
        }

        /// <summary>Kiekko pystypinnalle (kellotaulu): keskipiste p pinnan edessä, normaali, säde, n sektoria.</summary>
        static void PhTaulu(Rakentaja r, Vector3 p, Vector3 ulos, float sade, int n, Color vari)
        {
            var t = Vector3.Cross(Vector3.up, ulos).normalized;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                r.KolmioUlos(p, p + t * (Mathf.Cos(a0) * sade) + Vector3.up * (Mathf.Sin(a0) * sade),
                    p + t * (Mathf.Cos(a1) * sade) + Vector3.up * (Mathf.Sin(a1) * sade), ulos, vari);
            }
        }

        /// <summary>Lähitason kellotaulu: tumma taulu (kuten rungossa), vaaleat viisarit (kello noin 12.10) ja halutessa vaalea kehä.
        /// 12 kolmiota, kehän kanssa 28.</summary>
        static void PhLhKello(Rakentaja r, Vector3 p, Vector3 ulos, float sade, bool kehys)
        {
            var n = new Vector3(ulos.x, 0f, ulos.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            if (kehys)
                for (int i = 0; i < 8; i++)
                {
                    float a0 = i * Mathf.PI / 4f, a1 = (i + 1) * Mathf.PI / 4f;
                    Vector3 s0 = t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0), s1 = t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1);
                    r.NelioUlos(p + s0 * sade, p + s1 * sade, p + s1 * (sade * 1.28f), p + s0 * (sade * 1.28f), n, PhValkoinen);
                }
            PhTaulu(r, p, n, sade, 8, EmMuste);
            var q = p + n * 0.0005f;
            r.NelioUlos(q - t * 0.0006f, q + t * 0.0006f, q + t * 0.0006f + Vector3.up * (sade * 0.85f), q - t * 0.0006f + Vector3.up * (sade * 0.85f), n, PhValkoinen);
            var v = (t * 0.87f + Vector3.up * 0.5f).normalized;
            var w = Vector3.Cross(n, v).normalized * 0.0006f;
            r.NelioUlos(q - w, q + w, q + w + v * (sade * 0.6f), q - w + v * (sade * 0.6f), n, PhValkoinen);
        }

        /// <summary>Ikkunarivit pystypinnalla: pinnan keskipiste c (alareuna pihatasossa), normaali, rivien korkeudet ja
        /// ikkunoiden vaakasiirrot pinnan suunnassa (Laatta 0,0015 pinnan edessä, yövalon hehkun edessä).</summary>
        static void PhIkkunat(Rakentaja r, Vector3 c, Vector3 ulos, float[] rivit, float[] siirrot, float w = 0.0085f, float h = 0.013f)
        {
            var t = Vector3.Cross(Vector3.up, ulos).normalized;
            foreach (float y in rivit)
                foreach (float x in siirrot)
                    r.Laatta(c + t * x + Vector3.up * y, ulos, w, h, EmMuste);
        }

        /// <summary>Lähitason räystäsvarjo: kapea tumma kaista julkisivun yläreunassa katon alla (c = seinän yläreunan keskikohta).</summary>
        static void PhLhRaystas(Rakentaja r, Vector3 c, Vector3 ulos, float leveys) => r.Laatta(c - Vector3.up * 0.002f, ulos, leveys, 0.004f, PhLhRaystasVari);

        /// <summary>Lähitason räystäskaistat ja harjalista Talo-katolle (samat pisteet kuin Rakentaja.Talo): kummankin lappeen alin
        /// 18 % vaaleampana kaistana ja kapea vaalea lista harjalla, 0,0006 lappeen yllä. 10 kolmiota.</summary>
        static void PhLhTaloKaistat(Rakentaja r, Vector3 p, float suunta, float leveys, float syvyys, float h, float harja)
        {
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta)) * (leveys * 0.5f);
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta)) * (syvyys * 0.5f);
            var up = Vector3.up * h;
            Vector3 A = p - ex - ez + up, B = p + ex - ez + up, C = p + ex + ez + up, D = p - ex + ez + up;
            Vector3 H1 = p - ex + up + Vector3.up * harja, H2 = p + ex + up + Vector3.up * harja;
            PhLhLapeKaista(r, A, B, H2, H1);
            PhLhLapeKaista(r, D, C, H2, H1);
            var hs = ez.normalized * 0.0016f;
            var y = Vector3.up * 0.0007f;
            r.NelioUlos(H1 - hs + y, H2 - hs + y, H2 + hs + y, H1 + hs + y, Vector3.up, PhLhKattoKaista);
        }

        /// <summary>Lappeen räystäskaista: räystäslinja r0 → r1 ja harjan pisteet h1 (r1:n yllä) ja h0; alin 18 % kaistana
        /// 0,0006 lappeen yllä.</summary>
        static void PhLhLapeKaista(Rakentaja r, Vector3 r0, Vector3 r1, Vector3 h1, Vector3 h0)
        {
            var n = Vector3.Cross(r1 - r0, h0 - r0).normalized;
            if (n.y < 0f) n = -n;
            var o = n * 0.0006f;
            r.NelioUlos(r0 + o, r1 + o, Vector3.Lerp(r1, h1, 0.18f) + o, Vector3.Lerp(r0, h0, 0.18f) + o, n, PhLhKattoKaista);
        }

        /// <summary>Lähitason räystäskaistat lonkkakatolle (samat pisteet kuin PhLonkka): neljä lapetta. 8 kolmiota.</summary>
        static void PhLhLonkkaKaistat(Rakentaja r, Vector3 p, float lx, float lz, float h)
        {
            float x = lx * 0.5f, z = lz * 0.5f, hx = Mathf.Max(0f, x - z);
            Vector3 A = p + new Vector3(-x, 0f, -z), B = p + new Vector3(x, 0f, -z), C = p + new Vector3(x, 0f, z), D = p + new Vector3(-x, 0f, z);
            Vector3 H1 = p + new Vector3(-hx, h, 0f), H2 = p + new Vector3(hx, h, 0f);
            PhLhLapeKaista(r, A, B, H2, H1);
            PhLhLapeKaista(r, C, D, H1, H2);
            PhLhLapeKaista(r, D, A, H1, H1);
            PhLhLapeKaista(r, B, C, H2, H2);
        }

        /// <summary>Lähitason savupiippu (etelä-, itä- ja länsipinta sekä tumma kansi): pohja p katon sisällä, leveys ja korkeus. 8 kolmiota.</summary>
        static void PhLhPiippu(Rakentaja r, Vector3 p, float w, float h)
        {
            float x = w * 0.5f;
            Vector3 A = p + new Vector3(-x, 0f, -x), B = p + new Vector3(x, 0f, -x), C = p + new Vector3(x, 0f, x), D = p + new Vector3(-x, 0f, x);
            var up = Vector3.up * h;
            r.NelioUlos(A, B, B + up, A + up, Vector3.back, PhValkoinen);
            r.NelioUlos(B, C, C + up, B + up, Vector3.right, PhValkoinen);
            r.NelioUlos(D, A, A + up, D + up, Vector3.left, PhValkoinen);
            r.NelioUlos(A + up, B + up, C + up, D + up, Vector3.up, EmMuste);
        }

        /// <summary>
        /// Lähitason kattoikkuna lappeella: p = etuseinän alareunan keskikohta lappeen pinnassa, n = etuseinän suunta (lappeen
        /// alamäki), k = lappeen nousu vaakamatkaa kohden, leveys, seinän ja päädyn korkeus: etuseinä ja päätykolmio, kyljet,
        /// harjakatto ja tumma ikkuna. 12 kolmiota.
        /// </summary>
        static void PhLhKattoikkuna(Rakentaja r, Vector3 p, Vector3 n, float k, float lev, float hs, float hp, Color katto)
        {
            n = new Vector3(n.x, 0f, n.z).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            var d = -n;
            float w = lev * 0.5f, ze = hs / k, zh = (hs + hp) / k;
            Vector3 A = p - t * w, B = p + t * w, A1 = A + Vector3.up * hs, B1 = B + Vector3.up * hs, H = p + Vector3.up * (hs + hp);
            var keski = p + Vector3.up * (hs * 0.5f) + d * (ze * 0.5f);
            r.NelioUlos(A, B, B1, A1, n, PhValkoinen);
            r.KolmioUlos(A1, B1, H, n, PhValkoinen);
            r.KolmioKeskelta(A, A1, A1 + d * ze, keski, PhValkoinen);
            r.KolmioKeskelta(B, B1, B1 + d * ze, keski, PhValkoinen);
            var o = n * 0.002f;
            r.NelioKeskelta(A1 + o - t * 0.0012f, H + o, H + d * zh, A1 + d * ze - t * 0.0012f, keski, katto);
            r.NelioKeskelta(B1 + o + t * 0.0012f, H + o, H + d * zh, B1 + d * ze + t * 0.0012f, keski, katto);
            var q = p + n * 0.0006f;
            r.NelioUlos(q - t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.2f), q + t * (w * 0.5f) + Vector3.up * (hs * 0.85f),
                q - t * (w * 0.5f) + Vector3.up * (hs * 0.85f), n, EmMuste);
        }

        // ---- Torni ----

        static readonly Vector3 PhTorniPohja = new Vector3(PhTx, PhTaso, PhTz);

        /// <summary>
        /// Klassistinen torni yhtenä ääriviivaosana: vaalea neliörunko ja reunuslista, 12 pylvään rumpu tumman sisälieriön
        /// ympärillä (pylväiden välit luetaan tummina viivoina), palkisto, attika, kuparinvihreä kupoli, nuppi ja kaksoisristi.
        /// Pinnoilla (sisäviivat): kolme kaikuaukkoa ja kellotaulu etelässä, kaksi aukkoa idässä ja lännessä, ovi tornin juurella.
        /// Lähitasolla sama siluetti: pylväät kuusikulmaisina, kapiteelinauha ja jalustarengas, kaide palkistolla, kupolin kylkiluut
        /// ja nuppi; pinnoilla kaikuaukkojen säleiköt, kellotaulut viisareineen (edessä vaalea kehä), nurkkalesenat kapiteeleineen,
        /// vyölista, pyöreä ikkuna, mosaiikki, ovi kehyksineen ja portaat sekä attikan ja sisälieriön ikkunat.
        /// </summary>
        static void PhTorni(Rakentaja r, bool lahi)
        {
            var c = PhTorniPohja;
            var up = Vector3.up;
            r.AloitaOsa();
            PhSeinat(r, c, PhTp * 2f, PhTp * 2f, PhT1 - PhTaso, PhKivi);
            r.Laatikko(c + up * (PhT1 - PhTaso), new Vector3(PhTp * 2f + 0.009f, PhReunusH, PhTp * 2f + 0.009f), PhKivi, PhKivi);
            for (int k = 0; k < 12; k++)
            {
                float a = k * Mathf.PI * 2f / 12f + Mathf.PI / 12f;
                var p = c + new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a)) * PhPylvasKeha + up * (PhR0 - PhTaso);
                if (lahi) PhSarmio(r, p, PhPylvas * 0.86f, PhR1 - PhR0, 6, PhValkoinen, a);
                else PhSarmio(r, p, PhPylvas, PhR1 - PhR0, 3, PhValkoinen, a + Mathf.PI / 3f);
            }
            r.Vaippa(c + up * (PhR0 - PhTaso), PhSisaSade, PhSisaSade, PhR1 - PhR0, 8, PhSisus);
            if (lahi)
            {
                r.Vaippa(c + up * (PhR1 - PhTaso - 0.0055f), PhPylvasKeha - 0.0042f, PhPylvasKeha + 0.0046f, 0.0055f, 12, PhValkoinen, Mathf.PI / 12f);
                r.Vaippa(c + up * (PhR0 - PhTaso), PhPylvasKeha + 0.0046f, PhPylvasKeha + 0.0046f, 0.003f, 12, PhKivi, Mathf.PI / 12f);
            }
            r.Vaippa(c + up * (PhR1 - PhTaso), PhPalkkiSade, PhPalkkiSade, PhPalkkiH, 8, PhValkoinen);
            r.Kiekko(c + up * (PhA0 - PhTaso), PhPalkkiSade, PhPalkkiSade, 8, PhKivi);
            if (lahi) r.Vaippa(c + up * (PhA0 - PhTaso), PhPalkkiSade - 0.0025f, PhPalkkiSade - 0.0025f, 0.005f, 8, PhValkoinen);
            r.Vaippa(c + up * (PhA0 - PhTaso), PhAttikaSade, PhAttikaSade, PhA1 - PhA0, 8, PhValkoinen);
            PhKupoliMuoto(r, c + up * (PhA1 - PhTaso), PhKupoliSade, PhK1 - PhA1, 8, PhKupari);
            if (lahi) PhLhKylkiluut(r, c + up * (PhA1 - PhTaso), PhKupoliSade, PhK1 - PhA1);
            // Nuppi ja kaksoisristi (ristin pinnat etelään, kamera katsoo aina etelästä).
            var n = c + up * (PhK1 - PhTaso);
            if (lahi) r.Timantti(n + up * 0.0035f, 0.0042f, 0.0042f, PhKupari, 6);
            else r.Kartio(n - up * 0.001f, 0.004f, 0.007f, 4, PhKupari);
            var z = Vector3.back * 0.0005f;
            PhRistinPala(r, n + z + up * 0.012f, 0.0013f, 0.012f);
            PhRistinPala(r, n + z + up * 0.019f, 0.0065f, 0.0012f);
            PhRistinPala(r, n + z + up * 0.0255f, 0.0045f, 0.0012f);
            r.LopetaOsa();
            // Kaikuaukot, kellotaulu ja ovi.
            float etu = PhTz - PhTp;
            var e = Vector3.back;
            foreach (float dx in new[] { -PhAukkoVali, 0f, PhAukkoVali })
            {
                r.Holvi(new Vector3(PhTx + dx, PhAukkoY, etu), e, PhAukkoW, PhAukkoH, EmMuste);
                if (lahi) PhLhSaleikko(r, new Vector3(PhTx + dx, PhAukkoY, etu), e, PhAukkoW);
            }
            foreach (float s in new[] { -1f, 1f })
                foreach (float dz in new[] { -0.013f, 0.013f })
                {
                    var u = new Vector3(s, 0f, 0f);
                    r.Holvi(new Vector3(PhTx + s * PhTp, PhAukkoY, PhTz + dz), u, 0.013f, PhAukkoH, EmMuste);
                    if (lahi) PhLhSaleikko(r, new Vector3(PhTx + s * PhTp, PhAukkoY, PhTz + dz), u, 0.013f);
                }
            if (!lahi)
            {
                PhTaulu(r, new Vector3(PhTx, PhKelloTauluY, etu - 0.0015f), e, 0.0075f, 6, EmMuste);
                r.Holvi(new Vector3(PhTx, PhTaso + 0.019f, etu), e, 0.018f, 0.038f, EmMuste);
                return;
            }
            PhLhKello(r, new Vector3(PhTx, PhKelloTauluY, etu - 0.0015f), e, 0.0075f, true);
            foreach (float s in new[] { -1f, 1f })
                PhLhKello(r, new Vector3(PhTx + s * (PhTp + 0.0015f), PhKelloTauluY, PhTz), new Vector3(s, 0f, 0f), 0.0068f, false);
            // Ovi kehyksineen ja portaat, mosaiikki, pyöreä ikkuna ja vyölista.
            r.Holvi(new Vector3(PhTx, PhTaso + 0.021f, etu), e, 0.025f, 0.043f, PhValkoinen);
            r.Holvi(new Vector3(PhTx, PhTaso + 0.019f, etu - 0.0008f), e, 0.018f, 0.038f, EmMuste);
            r.NelioUlos(new Vector3(PhTx - 0.02f, PhTaso + 0.004f, etu - 0.012f), new Vector3(PhTx + 0.02f, PhTaso + 0.004f, etu - 0.012f),
                new Vector3(PhTx + 0.02f, PhTaso + 0.004f, etu), new Vector3(PhTx - 0.02f, PhTaso + 0.004f, etu), up, PhKivi);
            r.NelioUlos(new Vector3(PhTx - 0.02f, PhTaso, etu - 0.012f), new Vector3(PhTx + 0.02f, PhTaso, etu - 0.012f),
                new Vector3(PhTx + 0.02f, PhTaso + 0.004f, etu - 0.012f), new Vector3(PhTx - 0.02f, PhTaso + 0.004f, etu - 0.012f), e, PhLhSauma);
            r.Laatta(new Vector3(PhTx, PhTaso + 0.056f, etu), e, 0.038f, 0.016f, PhLhMosaiikki);
            PhTaulu(r, new Vector3(PhTx, PhTaso + 0.083f, etu - 0.0015f), e, 0.0062f, 8, EmMuste);
            foreach (var (u, t0) in new[] { (e, 0f), (Vector3.left, 1f), (Vector3.right, 1f) })
            {
                var pinta = c + u * PhTp + Vector3.up * 0.103f;
                r.Laatta(pinta, u, PhTp * 2f, 0.004f, PhValkoinen);
            }
            // Nurkkalesenat (etupinnalla kapiteelit) ja sivupintojen etukulmien lesenat.
            foreach (float s in new[] { -1f, 1f })
            {
                r.Laatta(new Vector3(PhTx + s * (PhTp - 0.004f), (PhTaso + PhT1) * 0.5f, etu), e, 0.008f, PhT1 - PhTaso - 0.004f, PhValkoinen);
                r.Laatta(new Vector3(PhTx + s * (PhTp - 0.004f), PhT1 - 0.006f, etu - 0.0007f), e, 0.011f, 0.007f, PhLhKapiteeli);
                r.Laatta(new Vector3(PhTx + s * PhTp, (PhTaso + PhT1) * 0.5f, PhTz - PhTp + 0.004f), new Vector3(s, 0f, 0f), 0.008f, PhT1 - PhTaso - 0.004f, PhValkoinen);
                r.Laatta(new Vector3(PhTx + s * (PhTp + 0.0007f), PhT1 - 0.006f, PhTz - PhTp + 0.004f), new Vector3(s, 0f, 0f), 0.011f, 0.007f, PhLhKapiteeli);
            }
            // Sivupintojen ikkunat kellokerroksen alla.
            foreach (float s in new[] { -1f, 1f })
                foreach (float y in new[] { 0.062f, 0.13f })
                    r.Laatta(new Vector3(PhTx + s * PhTp, PhTaso + y, PhTz - 0.008f), new Vector3(s, 0f, 0f), 0.008f, 0.016f, EmMuste);
            // Attikan ja sisälieriön ikkunat etelän puoleisilla tahkoilla (kahdeksankulmion tahkot 22,5° välein).
            foreach (float aste in new[] { 247.5f, 292.5f, 202.5f, 337.5f })
            {
                float a = aste * Mathf.PI / 180f;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                r.Laatta(c + d * (PhAttikaSade * 0.924f) + up * ((PhA0 + PhA1) * 0.5f - PhTaso), d, 0.006f, 0.011f, EmMuste);
                r.Laatta(c + d * (PhSisaSade * 0.924f) + up * ((PhR0 + PhR1) * 0.5f - PhTaso), d, 0.006f, 0.02f, EmMuste);
            }
        }

        /// <summary>Ristin pala: keskipiste, puolileveys ja puolikorkeus; pinta etelään (−Z).</summary>
        static void PhRistinPala(Rakentaja r, Vector3 k, float pw, float ph)
        {
            r.NelioUlos(k + new Vector3(-pw, -ph, 0f), k + new Vector3(pw, -ph, 0f), k + new Vector3(pw, ph, 0f), k + new Vector3(-pw, ph, 0f), Vector3.back, EmMuste);
        }

        /// <summary>Lähitason kaikuaukon säleikkö: kolme puista säleriviä aukon alaosassa (aukon holvin edessä, kellon takana).</summary>
        static void PhLhSaleikko(Rakentaja r, Vector3 p, Vector3 ulos, float leveys)
        {
            for (int k = 0; k < 3; k++)
                r.Laatta(p + ulos * 0.0008f + Vector3.up * (-PhAukkoH * 0.3f + k * PhAukkoH * 0.2f), ulos, leveys * 0.86f, 0.0028f, PhLhSale);
        }

        // ---- Kirjasto ----

        /// <summary>
        /// Kirjasto (Packh 1824–32) omana ääriviivaosanaan: vaalea kaksikerroksinen runko (seinät jatkuvat rinteen puolelle),
        /// matala tumma lonkkakatto, etujulkisivun päätykolmio (portiikki) ja katolla neliömäinen lyhty (ovaalisalin valo).
        /// Ikkunarivit etujulkisivussa päätykolmion molemmin puolin. Lähitasolla portiikin neljä pilasteria, päätykolmion reliefi,
        /// portiikin ikkunat ja ovi, räystäsvarjo ja lyhdyn ikkunat.
        /// </summary>
        static void PhKirjasto(Rakentaja r, bool lahi)
        {
            var up = Vector3.up;
            var c = new Vector3(PhKx, PhPerusta, PhKz);
            float h = PhTaso + PhKh - PhPerusta, etu = PhKz - PhKs * 0.5f;
            r.AloitaOsa();
            PhSeinat(r, c, PhKl, PhKs, h, PhValkoinen);
            var e = new Vector3(PhKx, PhTaso + PhKh, PhKz);
            PhLonkka(r, e, PhKl + 0.008f, PhKs + 0.008f, 0.026f, PhKattoTumma);
            PhPaatykolmio(r, new Vector3(PhKx, PhTaso + PhKh, etu - 0.004f), 0.09f, 0.03f, 0.045f, PhValkoinen, PhKattoTumma);
            var l = e + up * 0.018f;
            PhSeinat(r, l, 0.036f, 0.036f, 0.022f, PhValkoinen);
            r.Pyramidi(l + up * 0.022f, 0.042f, 0.042f, 0.016f, PhKattoTumma);
            r.LopetaOsa();
            var ek = Vector3.back;
            PhIkkunat(r, new Vector3(PhKx, PhTaso, etu), ek, new[] { 0.03f, 0.066f }, new[] { -0.056f, -0.038f, 0.038f, 0.056f });
            if (!lahi) return;
            // Portiikki: neljä pilasteria päätykolmion alla, niiden välissä korkeat ikkunat ja keskellä ovi; reliefi kolmiossa.
            foreach (float x in new[] { -0.036f, -0.012f, 0.012f, 0.036f })
            {
                var p = new Vector3(PhKx + x, PhTaso, etu - 0.004f);
                PhLhPilasteri(r, p, 0.0065f, PhKh - 0.003f, 0.004f);
            }
            foreach (float x in new[] { -0.024f, 0.024f })
                PhIkkunat(r, new Vector3(PhKx + x, PhTaso, etu), ek, new[] { 0.034f, 0.07f }, new[] { 0f }, 0.009f, 0.018f);
            r.Holvi(new Vector3(PhKx, PhTaso + 0.02f, etu), ek, 0.012f, 0.032f, EmMuste);
            r.Laatta(new Vector3(PhKx, PhTaso + 0.088f, etu), ek, 0.07f, 0.004f, PhLhRaystasVari);
            var k = new Vector3(PhKx, PhTaso + PhKh + 0.0035f, etu - 0.0045f);
            r.KolmioUlos(k + new Vector3(-0.032f, 0f, 0f), k + new Vector3(0.032f, 0f, 0f), k + new Vector3(0f, 0.018f, 0f), ek, PhLhReliefi);
            PhLhRaystas(r, new Vector3(PhKx - 0.057f, PhTaso + PhKh, etu), ek, 0.026f);
            PhLhRaystas(r, new Vector3(PhKx + 0.057f, PhTaso + PhKh, etu), ek, 0.026f);
            foreach (var u in new[] { ek, Vector3.left, Vector3.right })
                r.Laatta(l + u * 0.018f + up * 0.012f, u, 0.012f, 0.011f, EmMuste);
            PhLhLonkkaKaistat(r, e, PhKl + 0.008f, PhKs + 0.008f, 0.026f);
            // Länsipääty (klassinen lounaisnäkymä): kaksi ikkunariviä.
            PhIkkunat(r, new Vector3(PhKx - PhKl * 0.5f, PhTaso, PhKz), Vector3.left, new[] { 0.03f, 0.066f }, new[] { -0.036f, -0.012f, 0.012f, 0.036f });
            PhLhPiippu(r, new Vector3(PhKx - 0.045f, PhTaso + PhKh + 0.012f, PhKz + 0.02f), 0.007f, 0.013f);
            PhLhPiippu(r, new Vector3(PhKx + 0.045f, PhTaso + PhKh + 0.012f, PhKz + 0.02f), 0.007f, 0.013f);
        }

        /// <summary>Lähitason pilasteri: etupinta ja kyljet (kapea pystylaatikko seinän edessä, ei kantta): pohjan keskikohta p
        /// (etupinnan tasossa), leveys, korkeus ja ulkonema. 6 kolmiota.</summary>
        static void PhLhPilasteri(Rakentaja r, Vector3 p, float w, float h, float syv)
        {
            var t = Vector3.right * (w * 0.5f);
            var d = Vector3.forward * syv;
            var up = Vector3.up * h;
            r.NelioUlos(p - t, p + t, p + t + up, p - t + up, Vector3.back, PhValkoinen);
            r.NelioUlos(p + t, p + t + d, p + t + d + up, p + t + up, Vector3.right, PhValkoinen);
            r.NelioUlos(p - t + d, p - t, p - t + up, p - t + d + up, Vector3.left, PhValkoinen);
        }

        /// <summary>Päätykolmio (portiikki) seinän edessä: räystäslinjan keskikohta p (etureuna), leveys, korkeus ja syvyys
        /// taaksepäin; etukolmio, kaksi lapetta ja takakolmio. 6 kolmiota.</summary>
        static void PhPaatykolmio(Rakentaja r, Vector3 p, float leveys, float korkeus, float syvyys, Color seina, Color katto)
        {
            var t = Vector3.right * (leveys * 0.5f);
            var d = Vector3.forward * syvyys;
            Vector3 A = p - t, B = p + t, T = p + Vector3.up * korkeus;
            var k = p + d * 0.5f + Vector3.up * (korkeus * 0.3f);
            r.KolmioUlos(A, B, T, Vector3.back, seina);
            r.KolmioUlos(A + d, B + d, T + d, Vector3.forward, seina);
            r.NelioKeskelta(A, T, T + d, A + d, k, katto);
            r.NelioKeskelta(T, B, B + d, T + d, k, katto);
        }

        // ---- Siivet, basilika ja gimnázium ----

        /// <summary>
        /// Luostarisiivet (kukin oma ääriviivaosansa, Talo): linkkisiipi kirjaston ja tornin välissä, matala siipi tornin
        /// oikealla, päärakennus päätykolmio etelään (portiikki), siipi sen oikealla sekä ristikäytävän taka- ja itäsiipi.
        /// Etujulkisivuissa kaksi ikkunariviä. Lähitasolla ikkunoita enemmän, räystäsvarjot, päärakennuksen päätykolmion pyöreä
        /// ikkuna ja ovi, savupiiput sekä kattoikkunat takasiiven etulappeella.
        /// </summary>
        static void PhSiivet(Rakentaja r, bool lahi)
        {
            var kat = EmKatto;
            var e = Vector3.back;
            r.Talo(new Vector3(PhLinkX, PhTaso, PhLinkZ), 0f, PhLinkL, PhLinkS, PhLinkH, 0.033f, PhValkoinen, kat);
            r.Talo(new Vector3(PhMatX, PhTaso, PhMatZ), 0f, PhMatL, PhMatS, PhMatH, 0.03f, PhValkoinen, kat);
            r.Talo(new Vector3(PhPaaX, PhTaso, PhPaaZ), Mathf.PI * 0.5f, PhPaaS, PhPaaL, PhPaaH, 0.042f, PhValkoinen, kat);
            r.Talo(new Vector3(PhOikX, PhTaso, PhOikZ), 0f, PhOikL, PhOikS, PhOikH, 0.034f, PhValkoinen, kat);
            r.Talo(new Vector3(0.1325f, PhTaso, 0.1f), 0f, 0.205f, 0.06f, 0.068f, 0.028f, PhValkoinen, kat);
            r.Talo(new Vector3(0.205f, PhTaso, 0f), Mathf.PI * 0.5f, 0.14f, 0.06f, 0.068f, 0.028f, PhValkoinen, kat);
            Vector3 linkki = new Vector3(PhLinkX, PhTaso, PhLinkZ - PhLinkS * 0.5f), mat = new Vector3(PhMatX, PhTaso, PhMatZ - PhMatS * 0.5f),
                paa = new Vector3(PhPaaX, PhTaso, PhPaaZ - PhPaaS * 0.5f), oik = new Vector3(PhOikX, PhTaso, PhOikZ - PhOikS * 0.5f);
            if (!lahi)
            {
                PhIkkunat(r, linkki, e, new[] { 0.024f, 0.054f }, new[] { -0.013f, 0.013f });
                PhIkkunat(r, mat, e, new[] { 0.024f, 0.054f }, new[] { -0.013f, 0.013f });
                PhIkkunat(r, paa, e, new[] { 0.028f, 0.062f }, new[] { -0.03f, 0f, 0.03f });
                PhIkkunat(r, oik, e, new[] { 0.026f, 0.058f }, new[] { -0.017f, 0.017f });
                return;
            }
            PhIkkunat(r, linkki, e, new[] { 0.024f, 0.054f }, new[] { -0.018f, 0f, 0.018f }, 0.0075f, 0.012f);
            PhIkkunat(r, mat, e, new[] { 0.024f, 0.054f }, new[] { -0.018f, 0f, 0.018f }, 0.0075f, 0.012f);
            PhIkkunat(r, paa, e, new[] { 0.028f, 0.062f }, new[] { -0.03f, 0.03f });
            PhIkkunat(r, paa, e, new[] { 0.062f }, new[] { 0f });
            r.Holvi(paa + Vector3.up * 0.017f, e, 0.013f, 0.03f, EmMuste);
            PhTaulu(r, paa + Vector3.up * (PhPaaH + 0.016f) - Vector3.forward * 0.0015f, e, 0.0065f, 8, EmMuste);
            PhIkkunat(r, oik, e, new[] { 0.026f, 0.058f }, new[] { -0.024f, 0f, 0.024f }, 0.0075f, 0.012f);
            PhIkkunat(r, new Vector3(0.1325f, PhTaso, 0.07f), e, new[] { 0.022f, 0.048f }, new[] { -0.081f, -0.054f, -0.027f, 0f, 0.027f, 0.054f, 0.081f }, 0.0075f, 0.011f);
            PhIkkunat(r, new Vector3(0.205f, PhTaso, -0.07f), e, new[] { 0.022f, 0.048f }, new[] { -0.012f, 0.012f }, 0.0075f, 0.011f);
            PhLhRaystas(r, linkki + Vector3.up * PhLinkH, e, PhLinkL);
            PhLhRaystas(r, mat + Vector3.up * PhMatH, e, PhMatL);
            PhLhRaystas(r, oik + Vector3.up * PhOikH, e, PhOikL);
            PhLhRaystas(r, new Vector3(0.1325f, PhTaso + 0.068f, 0.07f), e, 0.205f);
            PhLhTaloKaistat(r, new Vector3(PhLinkX, PhTaso, PhLinkZ), 0f, PhLinkL, PhLinkS, PhLinkH, 0.033f);
            PhLhTaloKaistat(r, new Vector3(PhMatX, PhTaso, PhMatZ), 0f, PhMatL, PhMatS, PhMatH, 0.03f);
            PhLhTaloKaistat(r, new Vector3(PhPaaX, PhTaso, PhPaaZ), Mathf.PI * 0.5f, PhPaaS, PhPaaL, PhPaaH, 0.042f);
            PhLhTaloKaistat(r, new Vector3(PhOikX, PhTaso, PhOikZ), 0f, PhOikL, PhOikS, PhOikH, 0.034f);
            PhLhTaloKaistat(r, new Vector3(0.1325f, PhTaso, 0.1f), 0f, 0.205f, 0.06f, 0.068f, 0.028f);
            PhLhTaloKaistat(r, new Vector3(0.205f, PhTaso, 0f), Mathf.PI * 0.5f, 0.14f, 0.06f, 0.068f, 0.028f);
            // Vyölistat kerrosten välissä (päärakennus ja oikea siipi).
            r.Laatta(paa + Vector3.up * 0.045f, e, PhPaaL - 0.004f, 0.0025f, PhLhRaystasVari);
            r.Laatta(oik + Vector3.up * 0.042f, e, PhOikL - 0.004f, 0.0025f, PhLhRaystasVari);
            // Savupiiput harjojen tuntumassa (latvat harjan tasolla, joten siluetti ei kasva) ja kattoikkunat takasiivellä.
            PhLhPiippu(r, new Vector3(PhLinkX - 0.012f, PhTaso + PhLinkH + 0.012f, PhLinkZ + 0.006f), 0.007f, 0.019f);
            PhLhPiippu(r, new Vector3(PhMatX + 0.015f, PhTaso + PhMatH + 0.01f, PhMatZ + 0.004f), 0.007f, 0.018f);
            PhLhPiippu(r, new Vector3(PhOikX - 0.02f, PhTaso + PhOikH + 0.012f, PhOikZ + 0.006f), 0.007f, 0.02f);
            PhLhPiippu(r, new Vector3(0.07f, PhTaso + 0.068f + 0.01f, 0.1f + 0.004f), 0.007f, 0.016f);
            PhLhPiippu(r, new Vector3(0.19f, PhTaso + 0.068f + 0.01f, 0.1f + 0.004f), 0.007f, 0.016f);
            // Päärakennuksen päätykolmion reliefi ja kattoikkunat itä- ja länsilappeella; itälappeella ja päätykolmiossa lisää.
            var pk = paa + Vector3.up * (PhPaaH + 0.004f) - Vector3.forward * 0.0008f;
            r.KolmioUlos(pk + new Vector3(-0.04f, 0f, 0f), pk + new Vector3(0.04f, 0f, 0f), pk + new Vector3(0f, 0.029f, 0f), e, PhLhReliefi);
            float kp = 0.042f / (PhPaaL * 0.5f);
            foreach (float sx in new[] { -1f, 1f })
                PhLhKattoikkuna(r, new Vector3(PhPaaX + sx * PhPaaL * 0.5f * 0.7f, PhTaso + PhPaaH + 0.042f * 0.3f, PhPaaZ + 0.012f), new Vector3(sx, 0f, 0f),
                    kp, 0.014f, 0.01f, 0.008f, kat);
            float kk = 0.028f / 0.03f;
            foreach (float x in new[] { 0.06f, 0.1325f, 0.205f })
                PhLhKattoikkuna(r, new Vector3(x, PhTaso + 0.068f + 0.028f * 0.3f, 0.1f - 0.03f * 0.7f), e, kk, 0.013f, 0.009f, 0.007f, kat);
        }

        /// <summary>Basilikan akseli: tornin takaseinän keskeltä oikealle taakse (45°), pituus ja leveys.</summary>
        static readonly Vector3 PhBasilikaAlku = new Vector3(PhTx, PhTaso, PhTz + PhTp);
        static readonly Vector3 PhBasilikaSuunta = new Vector3(0.7071068f, 0f, 0.7071068f);
        const float PhBasilikaL = 0.19f, PhBasilikaW = 0.085f, PhBasilikaH = 0.1f, PhBasilikaHarja = 0.055f;

        /// <summary>Basilika (1200-luku, tornin takana) omana ääriviivaosanaan: korkea kivinen laiva jyrkin katoin ja
        /// itäpäässä monikulmainen kuori kartiomaisin katoin. Lähitasolla kaakkoisseinän tukipilarit, suippokaari-ikkunat ja
        /// kuorin ikkunat.</summary>
        static void PhBasilika(Rakentaja r, bool lahi)
        {
            var u = PhBasilikaSuunta;
            var keski = PhBasilikaAlku + u * (PhBasilikaL * 0.5f);
            r.AloitaOsa();
            r.Talo(keski, Mathf.PI * 0.25f, PhBasilikaL, PhBasilikaW, PhBasilikaH, PhBasilikaHarja, PhKivi, EmKatto);
            var k = PhBasilikaAlku + u * PhBasilikaL;
            var s = Vector3.Cross(Vector3.up, u);
            float rk = PhBasilikaW * 0.42f, hk = PhBasilikaH * 0.85f;
            var reuna = new Vector3[5];
            for (int i = 0; i < 5; i++)
            {
                float a = -Mathf.PI * 0.5f + i * Mathf.PI / 4f;
                reuna[i] = k + (u * Mathf.Cos(a) + s * Mathf.Sin(a)) * rk;
            }
            var up = Vector3.up * hk;
            var kk = k + up * 0.5f;
            var harja = k + Vector3.up * (hk + PhBasilikaHarja * 0.8f);
            for (int i = 0; i < 4; i++)
            {
                r.NelioKeskelta(reuna[i], reuna[i + 1], reuna[i + 1] + up, reuna[i] + up, kk, PhKivi);
                r.KolmioKeskelta(reuna[i] + up, reuna[i + 1] + up, harja, kk, EmKatto);
            }
            r.LopetaOsa();
            if (!lahi) return;
            PhLhTaloKaistat(r, keski, Mathf.PI * 0.25f, PhBasilikaL, PhBasilikaW, PhBasilikaH, PhBasilikaHarja);
            // Kaakkoisseinä (s osoittaa kaakkoon, kameraa kohti): tukipilarit ja suippokaari-ikkunat niiden välissä.
            var seina = PhBasilikaAlku + s * (PhBasilikaW * 0.5f);
            foreach (float f in new[] { 0.45f, 0.65f, 0.85f })
            {
                var p = seina + u * (PhBasilikaL * f);
                PhLhTukipilari(r, p, s, u, 0.007f, PhBasilikaH * 0.8f, 0.008f);
            }
            foreach (float f in new[] { 0.55f, 0.75f, 0.95f })
                r.Holvi(seina + u * (PhBasilikaL * f) + Vector3.up * (PhBasilikaH * 0.55f), s, 0.011f, 0.042f, EmMuste);
            for (int i = 1; i < 4; i++)
            {
                var m = (reuna[i] + reuna[i + 1]) * 0.5f;
                var n = (m - k); n.y = 0f;
                if (Vector3.Dot(n.normalized, Vector3.back) < -0.2f) continue;
                r.Holvi(m + Vector3.up * (hk * 0.55f), n, 0.009f, 0.034f, EmMuste);
            }
        }

        /// <summary>Lähitason tukipilari seinän edessä: pohjan keskikohta p seinässä, ulos (seinän normaali), pitkin (seinän suunta),
        /// leveys, korkeus ja ulkonema; etupinta, kyljet ja viisto kansi. 8 kolmiota.</summary>
        static void PhLhTukipilari(Rakentaja r, Vector3 p, Vector3 ulos, Vector3 pitkin, float w, float h, float syv)
        {
            ulos = ulos.normalized; pitkin = pitkin.normalized;
            Vector3 a = p - pitkin * (w * 0.5f), b = p + pitkin * (w * 0.5f), o = ulos * syv, y = Vector3.up * h, y2 = Vector3.up * (h + syv);
            r.NelioUlos(a + o, b + o, b + o + y, a + o + y, ulos, PhKivi);
            r.NelioUlos(b, b + o, b + o + y, b + y2, pitkin, PhKivi);
            r.NelioUlos(a + o, a, a + y2, a + o + y, -pitkin, PhKivi);
            r.NelioUlos(a + o + y, b + o + y, b + y2, a + y2, ulos + Vector3.up, PhKivi);
        }

        /// <summary>Gimnázium (oikealla edessä, noin 101 × 58 m) yhtenä ääriviivaosana: iso etukappale lonkkakatoin (seinät
        /// jatkuvat rinteen puolelle) ja pohjoiseen jatkuva siipi; etujulkisivussa kaksi ikkunariviä. Lähitasolla pohjakerroksen
        /// kaaret, kolme ikkunariviä, räystäsvarjo ja kattoikkunat etulappeella.</summary>
        static void PhGimnazium(Rakentaja r, bool lahi)
        {
            float cx = (PhGx0 + PhGx1) * 0.5f, cz = (PhGz0 + PhGz1) * 0.5f, lx = PhGx1 - PhGx0, lz = PhGz1 - PhGz0;
            r.AloitaOsa();
            PhSeinat(r, new Vector3(cx, PhPerusta, cz), lx, lz, PhTaso + PhGh - PhPerusta, PhValkoinen);
            PhLonkka(r, new Vector3(cx, PhTaso + PhGh, cz), lx + 0.008f, lz + 0.008f, 0.042f, EmKatto);
            r.Talo(new Vector3(0.3075f, PhTaso, -0.025f), Mathf.PI * 0.5f, 0.12f, 0.085f, 0.09f, 0.034f, PhValkoinen, EmKatto);
            r.LopetaOsa();
            var etu = new Vector3(cx, PhTaso, PhGz0);
            var e = Vector3.back;
            if (!lahi)
            {
                PhIkkunat(r, etu, e, new[] { 0.03f, 0.066f }, new[] { -0.07f, -0.035f, 0f, 0.035f, 0.07f });
                return;
            }
            foreach (float x in new[] { -0.075f, -0.045f, -0.015f, 0.015f, 0.045f, 0.075f })
                r.Holvi(etu + new Vector3(x, 0.012f, 0f), e, 0.016f, 0.022f, EmMuste);
            PhIkkunat(r, etu, e, new[] { 0.04f, 0.063f, 0.086f }, new[] { -0.075f, -0.045f, -0.015f, 0.015f, 0.045f, 0.075f }, 0.0075f, 0.012f);
            PhLhRaystas(r, etu + Vector3.up * PhGh, e, lx);
            r.Laatta(etu + Vector3.up * 0.027f, e, lx - 0.004f, 0.0025f, PhLhRaystasVari);
            PhLhLonkkaKaistat(r, new Vector3(cx, PhTaso + PhGh, cz), lx + 0.008f, lz + 0.008f, 0.042f);
            PhLhTaloKaistat(r, new Vector3(0.3075f, PhTaso, -0.025f), Mathf.PI * 0.5f, 0.12f, 0.085f, 0.09f, 0.034f);
            // Itäpääty (näkyy kaakosta): etukappaleen ja siiven ikkunarivit.
            PhIkkunat(r, new Vector3(PhGx1, PhTaso, cz), Vector3.right, new[] { 0.04f, 0.063f, 0.086f }, new[] { -0.04f, 0f, 0.04f }, 0.0075f, 0.012f);
            PhIkkunat(r, new Vector3(0.35f, PhTaso, -0.025f + 0.03f), Vector3.right, new[] { 0.03f, 0.06f }, new[] { -0.02f, 0.02f }, 0.0075f, 0.012f);
            PhLhPiippu(r, new Vector3(cx - 0.06f, PhTaso + PhGh + 0.028f, cz - 0.018f), 0.008f, 0.014f);
            PhLhPiippu(r, new Vector3(cx + 0.06f, PhTaso + PhGh + 0.028f, cz - 0.018f), 0.008f, 0.014f);
            // Siiven itälappeen kattoikkunat.
            foreach (float z in new[] { -0.04f, 0.005f })
                PhLhKattoikkuna(r, new Vector3(0.3075f + 0.0425f * 0.7f, PhTaso + 0.09f + 0.034f * 0.3f, z), Vector3.right, 0.034f / 0.0425f, 0.013f, 0.009f, 0.007f, EmKatto);
            float k = 0.042f / ((lz + 0.008f) * 0.5f);
            foreach (float x in new[] { -0.05f, 0f, 0.05f })
                PhLhKattoikkuna(r, new Vector3(cx + x, PhTaso + PhGh + 0.042f * 0.3f, PhGz0 - 0.004f + (lz + 0.008f) * 0.5f * 0.3f), e, k, 0.014f, 0.01f, 0.008f, EmKatto);
        }

        /// <summary>Lähitason ristikäytävän katot: matalat pulpettikatot takasiiven eteläseinällä ja itäsiiven länsiseinällä
        /// pihan puolella, ja kaaret niiden alla (ei ääriviivaa).</summary>
        static void PhLhRistikaytava(Rakentaja r)
        {
            var kat = EmKatto;
            // Takasiiven edustalla (seinä z 0,07): katto seinältä 0,034 → 0,022 ja 0,018 ulos.
            Vector3 a0 = new Vector3(0.035f, PhTaso + 0.034f, 0.07f), a1 = new Vector3(0.17f, PhTaso + 0.034f, 0.07f);
            Vector3 b0 = new Vector3(0.035f, PhTaso + 0.022f, 0.052f), b1 = new Vector3(0.17f, PhTaso + 0.022f, 0.052f);
            r.NelioUlos(a0, a1, b1, b0, Vector3.up + Vector3.back, kat);
            r.NelioUlos(b0, b1, new Vector3(0.17f, PhTaso, 0.052f), new Vector3(0.035f, PhTaso, 0.052f), Vector3.back, PhValkoinen);
            foreach (float x in new[] { 0.055f, 0.085f, 0.115f, 0.145f })
                r.Laatta(new Vector3(x, PhTaso + 0.009f, 0.052f), Vector3.back, 0.014f, 0.016f, PhSisus);
            // Itäsiiven edustalla (seinä x 0,175).
            Vector3 c0 = new Vector3(0.175f, PhTaso + 0.034f, -0.03f), c1 = new Vector3(0.175f, PhTaso + 0.034f, 0.052f);
            Vector3 d0 = new Vector3(0.157f, PhTaso + 0.022f, -0.03f), d1 = new Vector3(0.157f, PhTaso + 0.022f, 0.052f);
            r.NelioUlos(c0, c1, d1, d0, Vector3.up + Vector3.left, kat);
            r.NelioUlos(d0, d1, new Vector3(0.157f, PhTaso, 0.052f), new Vector3(0.157f, PhTaso, -0.03f), Vector3.left, PhValkoinen);
        }

        /// <summary>Porttitorni tukimuurin vasemmassa päässä (terassin sisäänkäynti, pieni, ei ääriviivaa): muurikiveä, julkisivu
        /// muurin pinnan tasossa, matala pyramidikatto terassin yllä ja portin kaari muurin juurella. 17 kolmiota; lähitasolla
        /// kaaren vaalea kehys, ikkuna ja räystäslista.</summary>
        static void PhPortti(Rakentaja r, bool lahi)
        {
            var u = PhUlos(13);
            var p = PhMuurinPinta(13, 0.1f, 0.13f) - u * 0.014f;
            float h = PhTaso + 0.03f - 0.13f;
            PhSeinat(r, p, 0.03f, 0.028f, h, PhMuuri);
            r.Pyramidi(p + Vector3.up * h, 0.036f, 0.034f, 0.02f, EmKatto);
            var kaari = PhMuurinPinta(13, 0.1f, 0.152f) + u * 0.0005f;
            if (lahi) r.Holvi(kaari - u * 0.0004f, u, 0.019f, 0.039f, PhLhMuuriKehys);
            r.Holvi(kaari, u, 0.014f, 0.034f, EmMuste);
            if (!lahi) return;
            r.Laatta(PhMuurinPinta(13, 0.1f, PhTaso + 0.014f) + u * 0.0005f, u, 0.008f, 0.011f, EmMuste);
            r.Laatta(PhMuurinPinta(13, 0.1f, PhTaso + 0.028f) + u * 0.0005f, u, 0.03f, 0.003f, PhLhMuuriKehys);
        }

        /// <summary>Viinitarha etuoikealla alarinteellä (reuna 16, alin vyö): vaalea maa ja kolme tummaa riviä rinnettä alas
        /// (ei ääriviivaa). 8 kolmiota; lähitasolla kuusi kapeampaa riviä ja tolpat rivien päissä.</summary>
        static void PhViinitarha(Rakentaja r, bool lahi)
        {
            const int i = 16;
            var n = Vector3.up * 0.0015f;
            var ulos = PhUlos(i) + Vector3.up;
            Vector3 P(float s, float t) => PhRinnePiste(i, s, 2, t);
            r.NelioUlos(P(0.12f, 0.12f) + n, P(0.88f, 0.12f) + n, P(0.88f, 0.88f) + n, P(0.12f, 0.88f) + n, ulos, PhViini);
            int rivit = lahi ? 6 : 3;
            float vali = 0.76f / rivit, lev = lahi ? 0.045f : 0.07f;
            for (int k = 0; k < rivit; k++)
            {
                float s0 = 0.12f + vali * (k + 0.5f) - lev * 0.5f, s1 = s0 + lev;
                r.NelioUlos(P(s0, 0.18f) + n * 2f, P(s1, 0.18f) + n * 2f, P(s1, 0.82f) + n * 2f, P(s0, 0.82f) + n * 2f, ulos, PhViiniRivi);
                if (!lahi) continue;
                foreach (float t in new[] { 0.16f, 0.84f })
                {
                    var q = P((s0 + s1) * 0.5f, t);
                    r.NelioUlos(q + new Vector3(-0.0008f, 0f, 0f), q + new Vector3(0.0008f, 0f, 0f), q + new Vector3(0.0008f, 0.009f, 0f),
                        q + new Vector3(-0.0008f, 0.009f, 0f), Vector3.back, PhLhTolppa);
                }
            }
        }

        static void PhRakenna(Rakentaja r, bool lahi)
        {
            PhKukkula(r);
            PhPuut(r, lahi);
            PhTukimuuri(r, lahi);
            PhTerassiLaatta(r, lahi);
            PhTorni(r, lahi);
            PhKirjasto(r, lahi);
            PhSiivet(r, lahi);
            PhBasilika(r, lahi);
            PhGimnazium(r, lahi);
            PhPortti(r, lahi);
            PhViinitarha(r, lahi);
            if (lahi) PhLhRistikaytava(r);
        }

        static Mesh PannonhalmaRunko()
        {
            var r = new Rakentaja();
            PhRakenna(r, false);
            return r.Verkko("Pannonhalma");
        }

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (kukkula, torni, kirjasto, jokainen siipi, basilika, gimnázium ja tukimuuri) ja osien pivotit kuin rungossa; lisäkolmiot
        /// lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; hanhet, kellot, äänirenkaat ja valot pysyvät ennallaan:
        /// kaikuaukot ja kellokerros ovat samoilla paikoilla (säleiköt kellon takana), ja julkisivut ovat paikallaan, joten
        /// yövalon hehku jää ikkunoiden taakse (kirjaston ikkunavalot rungon ikkunoiden edessä).
        ///   torni      pylväät kuusikulmaisina, kapiteelinauha, jalustarengas, kaide, kupolin kylkiluut ja nuppi; säleiköt,
        ///              kellotaulut viisareineen, nurkkalesenat, vyölista, pyöreä ikkuna, mosaiikki, ovi, portaat, rummun ikkunat
        ///   kirjasto   portiikin pilasterit, ikkunat ja ovi, päätykolmion reliefi, räystäsvarjot ja lyhdyn ikkunat
        ///   siivet     lisää ikkunoita, päärakennuksen ovi ja pyöreä päätyikkuna, räystäsvarjot, savupiiput ja kattoikkunat
        ///   muut       tukimuurin kymmenen kaarta syvennyksinä ja lesenat, gimnáziumin pohjakerroksen kaaret ja kattoikkunat,
        ///              basilikan tukipilarit ja ikkunat, ristikäytävän katot, porttitornin yksityiskohdat, viiniköynnösrivit
        ///              tolppineen, terassin käytävä ja saumat sekä 20 puuta lisää
        /// </summary>
        static Mesh PannonhalmaLahi()
        {
            var r = new Rakentaja();
            PhRakenna(r, true);
            return r.Verkko("Pannonhalma-lahi");
        }

        // ---- Liikkuvat osat ----

        /// <summary>Hanhien yhteinen pivot (mallin avaruudessa); liikeydin antaa hanhen paikan tämän suhteen
        /// (PannonhalmaLiike.PivotX/Y/Z).</summary>
        static readonly Vector3 PhHanhiPivot = new Vector3(0f, 0.65f, 0f);

        /// <summary>
        /// Hanhen puolikas (nokka +Z, oikea siipi +X, selkäranka Z-akselilla origossa): puolet kaulasta ja rungosta sekä
        /// kaksipuolinen, taaksepäin pyyhkäisevä siipi. Liikeydin kiertää oikeaa puoliskoa selkärangan ympäri kulmalla
        /// kallistus + räpytys ja vasenta kallistus − räpytys, joten siivet nousevat ja laskevat yhdessä. Siipiväli 0,052
        /// (noin yhdeksänkertainen kuten Hohensalzburgin kyyhkyt; speksin 0,035 jäi 40–60 pt:ssä muutaman pikselin pisteiksi).
        /// Siiven yläpinta vaaleanharmaa (merihanhen vaalea kyynärsiipi näkyy ylhäältä), runko tummempi ja kaula tumma, joten
        /// hanhi erottuu sekä tummista katoista ja metsästä että vaaleasta kartasta. 4 kolmiota.
        /// </summary>
        static Mesh PhHanhiPuolikas(bool oikea)
        {
            var r = new Rakentaja();
            float s = oikea ? 1f : -1f;
            Vector3 nokka = new Vector3(0f, 0f, 0.0188f), kaula = new Vector3(0f, 0f, 0.0052f), pyrsto = new Vector3(0f, 0f, -0.0127f);
            Vector3 paa = new Vector3(s * 0.002f, -0.0008f, 0.0112f), olka = new Vector3(s * 0.0053f, -0.0018f, 0.0008f);
            r.KolmioUlos(nokka, kaula, paa, Vector3.up, PhHanhiTumma);
            r.KolmioUlos(kaula, pyrsto, olka, Vector3.up, PhHanhi);
            Vector3 w0 = new Vector3(s * 0.0032f, -0.0013f, 0.0068f), w1 = new Vector3(s * 0.0032f, -0.0013f, -0.0057f), karki = new Vector3(s * 0.026f, -0.0013f, -0.0078f);
            r.KolmioUlos(w0, karki, w1, Vector3.up, PhHanhiSiipi);
            r.KolmioUlos(w0, w1, karki, -Vector3.up, PhHanhiVatsa);
            return r.Verkko(oikea ? "Pannonhalma-hanhi-oikea" : "Pannonhalma-hanhi-vasen");
        }

        static Mesh PannonhalmaHanhiOikea() => PhHanhiPuolikas(true);
        static Mesh PannonhalmaHanhiVasen() => PhHanhiPuolikas(false);

        /// <summary>Kellon pivot etukaikuaukon kannattimessa (keskimmäinen aukko, 0,004 pinnan edessä) ja itäsivun etummaisessa
        /// aukossa.</summary>
        static readonly Vector3 PhKello0Pivot = new Vector3(PhTx, PhAukkoY + PhAukkoH * 0.5f - 0.006f, PhTz - PhTp - 0.004f);
        static readonly Vector3 PhKello1Pivot = new Vector3(PhTx + PhTp + 0.004f, PhAukkoY + PhAukkoH * 0.5f - 0.006f, PhTz - 0.013f);

        /// <summary>Pronssikello (pivot kannattimessa, kello roikkuu alaspäin): kahdeksankulmainen, alaspäin levenevä vaippa; suu
        /// 0,015 eli noin kaksinkertaiseksi liioiteltu. 16 kolmiota.</summary>
        static Mesh PannonhalmaKello()
        {
            var r = new Rakentaja();
            r.Vaippa(new Vector3(0f, -0.0165f, 0f), 0.0075f, 0.0028f, 0.0155f, 8, EmKulta);
            return r.Verkko("Pannonhalma-kello");
        }

        /// <summary>Äänirenkaiden lähtöpiste: tornin akseli kellokerroksen korkeudella.</summary>
        static readonly Vector3 PhAaniPivot = new Vector3(PhTx, PhAukkoY, PhTz);

        /// <summary>Äänirengas: ohut vaakarengas (säde 0,28, leveys 0,008, pivot keskellä), jonka liikeydin laajentaa
        /// kellokerroksesta. Ei ääriviivaryhmää: ääriviiva molemmin puolin teki lähikuvaan paksun tumman renkaan (sama linja kuin
        /// merihirviön roiskeissa, Fable 27.9.2026), joten rengas on yksi ohut seepiaviiva kuin kaiverruksessa.</summary>
        static Mesh PannonhalmaAani()
        {
            var r = new Rakentaja();
            const int n = 16;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                Vector3 s0 = new Vector3(Mathf.Cos(a0) * 0.272f, 0f, Mathf.Sin(a0) * 0.272f), s1 = new Vector3(Mathf.Cos(a1) * 0.272f, 0f, Mathf.Sin(a1) * 0.272f);
                Vector3 u0 = new Vector3(Mathf.Cos(a0) * 0.28f, 0f, Mathf.Sin(a0) * 0.28f), u1 = new Vector3(Mathf.Cos(a1) * 0.28f, 0f, Mathf.Sin(a1) * 0.28f);
                r.NelioUlos(s0, u0, u1, s1, Vector3.up, EmSeepia);
            }
            return r.Verkko("Pannonhalma-aani");
        }

        /// <summary>Julkisivuvalojen pivot julkisivurivin juuressa (keskellä).</summary>
        static readonly Vector3 PhValoPivot = new Vector3(0.05f, PhTaso, -0.18f);
        /// <summary>Hehkun etäisyys pinnasta: 0,0008 (Laatta lisää 0,0015), eli ikkunoiden (0,0015) takana.</summary>
        const float PhValoTaakse = 0.0007f;

        /// <summary>
        /// Yövalot (pivot julkisivurivin juuressa): etujulkisivujen ja tornin rungon lämmin hehku ikkunoiden takana, joten
        /// ikkunat näkyvät tummina valaistussa julkisivussa. Valaisematon, ei bloomia.
        /// </summary>
        static Mesh PannonhalmaValot()
        {
            var r = new Rakentaja();
            var o = PhValoPivot;
            var e = Vector3.back;
            void Pinta(Vector3 keski, Vector3 n, float w, float h) => r.Laatta(keski - n * PhValoTaakse - o, n, w, h, EmIkkunavalo);
            Pinta(new Vector3(PhLinkX, PhTaso + 0.04f, PhLinkZ - PhLinkS * 0.5f), e, PhLinkL - 0.006f, 0.07f);
            Pinta(new Vector3(PhMatX, PhTaso + 0.04f, PhMatZ - PhMatS * 0.5f), e, PhMatL - 0.006f, 0.07f);
            Pinta(new Vector3(PhPaaX, PhTaso + 0.047f, PhPaaZ - PhPaaS * 0.5f), e, PhPaaL - 0.01f, 0.086f);
            Pinta(new Vector3(PhOikX, PhTaso + 0.043f, PhOikZ - PhOikS * 0.5f), e, PhOikL - 0.006f, 0.078f);
            Pinta(new Vector3((PhGx0 + PhGx1) * 0.5f, PhTaso + 0.05f, PhGz0), e, PhGx1 - PhGx0 - 0.012f, 0.092f);
            Pinta(new Vector3(PhTx, (PhTaso + PhT1) * 0.5f, PhTz - PhTp), e, PhTp * 2f - 0.008f, PhT1 - PhTaso - 0.012f);
            Pinta(new Vector3(PhTx - PhTp, PhTaso + 0.14f, PhTz), Vector3.left, PhTp * 2f - 0.008f, 0.1f);
            Pinta(new Vector3(PhTx + PhTp, PhTaso + 0.14f, PhTz), Vector3.right, PhTp * 2f - 0.008f, 0.1f);
            return r.Verkko("Pannonhalma-valot");
        }

        /// <summary>Pylväsrummun hehkun pivot rummun keskellä tornin akselilla.</summary>
        static readonly Vector3 PhRumpuPivot = new Vector3(PhTx, (PhR0 + PhR1) * 0.5f, PhTz);

        /// <summary>Yövalo pylväsrummussa ja kupolin tyvellä (pivot rummun keskellä): lämmin nauha sisälieriön edessä pylväiden
        /// välissä (lyhty) ja attikan ympärillä; syttyy paikallaan. 32 kolmiota.</summary>
        static Mesh PannonhalmaValotRumpu()
        {
            var r = new Rakentaja();
            var o = PhRumpuPivot;
            // Kahdeksankulmaiset nauhat samoissa kulmissa kuin sisälieriö ja attika, 0,0025 ja 0,0007 niiden pinnan edessä.
            var p = new Vector3(PhTx, PhR0 + 0.003f, PhTz) - o;
            r.Vaippa(p, PhSisaSade + 0.0027f, PhSisaSade + 0.0027f, PhR1 - PhR0 - 0.006f, 8, PhHehkuKivi);
            var q = new Vector3(PhTx, PhA0 + 0.003f, PhTz) - o;
            r.Vaippa(q, PhAttikaSade + 0.0008f, PhAttikaSade + 0.0008f, PhA1 - PhA0 - 0.006f, 8, EmIkkunavalo);
            return r.Verkko("Pannonhalma-valot-rumpu");
        }

        /// <summary>Kirjaston ikkunavalojen pivot kirjaston julkisivun keskellä.</summary>
        static readonly Vector3 PhKirjastoValoPivot = new Vector3(PhKx, PhTaso + 0.05f, PhKz - PhKs * 0.5f);

        /// <summary>Yövalo kirjaston ikkunoissa (pivot julkisivun keskellä): ikkunoiden edessä, joten ikkunat hehkuvat.</summary>
        static Mesh PannonhalmaValotKirjasto()
        {
            var r = new Rakentaja();
            var o = PhKirjastoValoPivot;
            float etu = PhKz - PhKs * 0.5f - 0.001f;
            foreach (float y in new[] { 0.03f, 0.066f })
                foreach (float x in new[] { -0.056f, -0.038f, 0.038f, 0.056f })
                    r.Laatta(new Vector3(PhKx + x, PhTaso + y, etu) - o, Vector3.back, 0.0095f, 0.0145f, EmIkkunavalo);
            return r.Verkko("Pannonhalma-valot-kirjasto");
        }

        /// <summary>Hanhiaurojen paikkamäärät (sama kuin PannonhalmaLiike.Paikkoja).</summary>
        static readonly int[] PhAuranPaikat = { 9, 7 };

        static LiikkuvaOsaMaaritys[] PannonhalmaOsat()
        {
            int n = 0;
            foreach (int p in PhAuranPaikat) n += 2 * p;
            var osat = new LiikkuvaOsaMaaritys[n + 8];
            int k = 0;
            for (int a = 0; a < PhAuranPaikat.Length; a++)
                for (int g = 0; g < PhAuranPaikat[a]; g++)
                {
                    string nimi = "h" + (char)('0' + a) + (char)('0' + g);
                    osat[k++] = new LiikkuvaOsaMaaritys { Nimi = nimi + "o", Verkko = PannonhalmaHanhiOikea, Pivot = PhHanhiPivot, Liike = Liike.Liuku,
                        Akseli = Vector3.forward, KayS = 10f, TaukoS = 40f };
                    osat[k++] = new LiikkuvaOsaMaaritys { Nimi = nimi + "v", Verkko = PannonhalmaHanhiVasen, Pivot = PhHanhiPivot, Liike = Liike.Liuku,
                        Akseli = Vector3.forward, KayS = 10f, TaukoS = 40f };
                }
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "kello0", Verkko = PannonhalmaKello, Pivot = PhKello0Pivot, Liike = Liike.Keinunta,
                Akseli = Vector3.forward, Laajuus = 35f };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "kello1", Verkko = PannonhalmaKello, Pivot = PhKello1Pivot, Liike = Liike.Keinunta,
                Akseli = Vector3.right, Laajuus = 35f };
            for (int i = 0; i < 3; i++)
                osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "aani" + i, Verkko = PannonhalmaAani, Pivot = PhAaniPivot, Liike = Liike.Aalto, Akseli = Vector3.up };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = PannonhalmaValot, Pivot = PhValoPivot, Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "valot1", Verkko = PannonhalmaValotRumpu, Pivot = PhRumpuPivot, Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "valot2", Verkko = PannonhalmaValotKirjasto, Pivot = PhKirjastoValoPivot, Liike = Liike.Valahdys };
            return osat;
        }

        static readonly bool pannonhalma = Rekisteroi("pannonhalma",
            new Erikoismalli { Runko = PannonhalmaRunko, Osat = PannonhalmaOsat, Lahi = PannonhalmaLahi, Kolmiot0 = 1209, KokoKerroin = 1.5f });
    }
}
