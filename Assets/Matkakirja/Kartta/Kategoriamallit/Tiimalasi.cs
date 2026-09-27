using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI TIIMALASI (historian hetket), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// HISTORIAN HETKI: tiimalasi (merkki-hetki.png oikeana 3D-esineenä). Sorvatut puulaipiot (pyöristetty reuna ja kaulus
        /// lasia vasten), neljä sorvattua pylvästä vinosti (joka suunnasta kaksi lasin molemmin puolin kuten kuvamerkissä), kaksi
        /// lasikupua vaaleana paperina ja seepiahiekka: ylhäällä suppilona vyötärön yllä, alhaalla kekona, välissä ohut juova.
        /// Lasi on sisäpinta, jonka lähempi puolisko karsiutuu, joten hiekka näkyy lasin läpi mistä suunnasta tahansa.
        /// Yläkannessa matala nuppi ja musteella kaiverrettu tiimalasimerkki, joten merkki tunnistuu myös suoraan ylhäältä
        /// (pelkkä pyöreä kansi sekoittuisi kaupungin kiekkoon). Halkaisija 0,54, korkeus 0,83, ei jalustaa (alalaipio on maassa).
        /// LOD1: suorat laipiot, nelisärmäiset suorat pylväät, harvempi lasi ja hiekka, ei nuppia eikä juovaa.
        /// </summary>
        static void TiimalasiOsat(Rakentaja r, bool lod1)
        {
            int n = lod1 ? 8 : 12;
            var o = Vector3.zero;
            const float tayS = Mathf.PI * 2f;
            // Laipioiden monikulmion kärki osuu pylvään kohdalle (45°), joten pylväs ei pistä laipion reunan yli.
            float k0 = lod1 ? 0f : Mathf.PI / 12f;
            // Alalaipio (pyöristetty laatta ja kaulus) ja pylväät yhtenä ääriviivaosana: pylväiden ääriviiva kasvaa laipion
            // mitoilla eikä pistä ylhäältä katsottuna laipion ääriviivan yli.
            r.AloitaOsa();
            if (lod1) TiSorvi(r, o, new[] { (TiLaatta, 0f), (TiLaatta, 0.06f), (0f, 0.06f) }, n, k0, k0 + tayS, new[] { TiPuu, TiPuuVaalea });
            else TiSorvi(r, o, new[] { (TiLaatta - 0.012f, 0f), (TiLaatta, 0.026f), (TiLaatta - 0.018f, 0.056f), (TiKaulus, 0.056f), (TiKaulus, TiLasiAla), (0f, TiLasiAla) },
                n, k0, k0 + tayS, new[] { TiPuu, TiPuu, TiPuuVaalea, TiPuuTumma, TiPuuVaalea });
            // Pylväät: neljä vinosti, joten edestä, takaa ja sivulta näkyy kuvamerkin tapaan kaksi pylvästä lasin molemmin puolin.
            var pylvas = lod1
                ? new[] { (0.022f, 0.056f), (0.022f, 0.742f) }
                : new[] { (0.022f, 0.056f), (0.011f, 0.14f), (0.018f, 0.33f), (0.024f, 0.4f), (0.018f, 0.47f), (0.011f, 0.66f), (0.022f, 0.742f) };
            for (int i = 0; i < 4; i++)
            {
                float a = Mathf.PI * (0.25f + 0.5f * i);
                TiSorvi(r, new Vector3(Mathf.Cos(a) * TiPylvasSade, 0f, Mathf.Sin(a) * TiPylvasSade), pylvas, lod1 ? 4 : 5, a, a + tayS, new[] { TiPuu });
            }
            r.LopetaOsa();
            // Ylälaipio: kaulus, laatta ja kansi (yksi ääriviivaosa), kannessa nuppi ja kaiverrus. Laatan alapintaa ei tehdä:
            // kamera on aina mallin horisontin yläpuolella (kallistus enintään 55°), joten alaspäin katsova pinta ei näy.
            r.AloitaOsa();
            if (lod1) TiSorvi(r, o, new[] { (TiLaatta, TiLasiYla), (TiLaatta, TiKansi), (0f, TiKansi) }, n, k0, k0 + tayS, new[] { TiPuu, TiPuuVaalea });
            else
            {
                TiSorvi(r, o, new[] { (TiKaulus, TiLasiYla), (TiKaulus, 0.742f) }, n, k0, k0 + tayS, new[] { TiPuuTumma });
                TiSorvi(r, o, new[] { (TiLaatta - 0.018f, 0.742f), (TiLaatta, 0.77f), (TiLaatta - 0.012f, TiKansi), (0f, TiKansi) }, n, k0, k0 + tayS, new[] { TiPuu, TiPuu, TiPuuVaalea });
                TiSorvi(r, o, new[] { (0.034f, TiKansi), (0.03f, TiKansi + 0.014f), (0.018f, TiKansi + 0.026f), (0f, TiKansi + 0.03f) }, 6, 0f, tayS, new[] { TiPuu, TiPuuVaalea });
            }
            r.LopetaOsa();
            TiKaiverrus(r, TiKansi + 0.0015f, lod1);

            // Lasi: koko kupu sisäpintana (normaali akselia kohti). Takapintojen karsinta poistaa katsojaa lähemmän puoliskon,
            // joten mistä suunnasta tahansa katsotaan kupujen sisään ja hiekka näkyy lasin läpi.
            int nl = lod1 ? 8 : 12;
            var lasi = lod1
                ? new[] { (0.125f, TiLasiAla), (0.148f, 0.16f), (0.017f, TiVyotaro), (0.148f, 0.64f), (0.125f, TiLasiYla) }
                : TiLasiProfiili;
            r.AloitaOsa();
            TiSorvi(r, o, lasi, nl, 0f, tayS, new[] { TiLasi }, true);
            // Hiekka (hieman lasin sisäpuolella): alakeko (kylki ja kartio) ja yläsuppilo vyötärön yllä (kylki ja kuoppa).
            var keko = lod1 ? new[] { (0.122f, TiLasiAla), (0.136f, 0.13f) } : new[] { (0.122f, TiLasiAla), (0.145f, 0.13f) };
            TiSorvi(r, o, keko, nl, 0f, tayS, new[] { TiHiekka });
            TiSorvi(r, o, new[] { keko[1], (0f, TiKeko) }, nl, 0f, tayS, new[] { TiHiekkaVaalea });
            var suppilo = lod1 ? new[] { (0.016f, TiVyotaro), (0.053f, 0.47f) } : new[] { (0.016f, TiVyotaro), (0.068f, 0.47f) };
            TiSorvi(r, o, suppilo, nl, 0f, tayS, new[] { TiHiekka });
            TiSorvi(r, o, new[] { suppilo[1], (0f, 0.45f) }, nl, 0f, tayS, new[] { TiHiekkaVaalea });
            r.LopetaOsa();
            if (!lod1) TiSorvi(r, o, new[] { (0.0055f, TiKeko - 0.01f), (0.0055f, TiVyotaro), (0f, TiVyotaro) }, 4, 0f, tayS, new[] { TiHiekka });
        }

        /// <summary>Laatan säde, kauluksen säde, pylväiden etäisyys akselista; lasin ala- ja yläreuna (kauluksissa), vyötärö,
        /// keon huippu ja kannen korkeus.</summary>
        const float TiLaatta = 0.27f, TiKaulus = 0.185f, TiPylvasSade = 0.245f;
        const float TiLasiAla = 0.078f, TiLasiYla = 0.722f, TiVyotaro = 0.4f, TiKeko = 0.245f, TiKansi = 0.8f;

        /// <summary>Kupujen profiili alhaalta ylös: pullea alaosa, kapeneva vyötärö ja peilikuvana yläkupu.</summary>
        static readonly (float, float)[] TiLasiProfiili =
        {
            (0.125f, TiLasiAla), (0.148f, 0.13f), (0.138f, 0.225f), (0.07f, 0.33f), (0.017f, TiVyotaro),
            (0.07f, 0.47f), (0.138f, 0.575f), (0.148f, 0.67f), (0.125f, TiLasiYla),
        };

        /// <summary>Kannen kaiverrus (muste): pieni tiimalasi, jonka kärjet kohtaavat nupin kohdalla ja jonka laipiot ovat
        /// poikkiviivoina, pitkittäin kohti +Z:aa (ylhäältä katsottuna pystyssä). Korkeudella y hieman kannen yllä.</summary>
        static void TiKaiverrus(Rakentaja r, float y, bool lod1)
        {
            const float pituus = 0.14f, leveys = 0.078f, vyo = 0.026f, viiva = 0.014f;
            foreach (float s in new[] { 1f, -1f })
            {
                r.KolmioUlos(new Vector3(0f, y, s * vyo), new Vector3(-leveys, y, s * pituus), new Vector3(leveys, y, s * pituus), Vector3.up, TiMuste);
                if (lod1) continue;
                float z0 = s * (pituus + 0.01f), z1 = s * (pituus + 0.01f + viiva);
                r.NelioUlos(new Vector3(-leveys - 0.02f, y, z0), new Vector3(leveys + 0.02f, y, z0), new Vector3(leveys + 0.02f, y, z1), new Vector3(-leveys - 0.02f, y, z1), Vector3.up, TiMuste);
            }
        }

        /// <summary>
        /// Sorvattu pinta: profiili (säde, korkeus) kiertää kappaleen alhaalta ulkokautta ylös ja kohti akselia, joten tahkon
        /// ulkonormaali saadaan profiilin tangentista (dy, −dr); akselille päättyvä profiili sulkee kannen kolmioina. Kulmat
        /// a0…a1 (rad, 0 = +X, π/2 = +Z taakse), n sektoria, väri nauhoittain (viimeinen toistuu); sisään = normaali akselia
        /// kohti (lasin sisäpinta).
        /// </summary>
        static void TiSorvi(Rakentaja r, Vector3 akseli, (float s, float y)[] pr, int n, float a0, float a1, Color[] varit, bool sisaan = false)
        {
            for (int j = 0; j + 1 < pr.Length; j++)
            {
                float dr = pr[j + 1].s - pr[j].s, dy = pr[j + 1].y - pr[j].y;
                var vari = varit[Mathf.Min(j, varit.Length - 1)];
                for (int i = 0; i < n; i++)
                {
                    float b0 = a0 + (a1 - a0) * i / n, b1 = a0 + (a1 - a0) * (i + 1) / n, bm = (b0 + b1) * 0.5f;
                    Vector3 P(float b, int k) => akseli + new Vector3(Mathf.Cos(b) * pr[k].s, pr[k].y, Mathf.Sin(b) * pr[k].s);
                    var ulos = new Vector3(Mathf.Cos(bm) * dy, -dr, Mathf.Sin(bm) * dy);
                    r.NelioUlos(P(b0, j), P(b1, j), P(b1, j + 1), P(b0, j + 1), sisaan ? -ulos : ulos, vari);
                }
            }
        }

        static readonly Color TiPuu = Ramppi(0xc4a47a), TiPuuVaalea = Ramppi(0xd8c29c), TiPuuTumma = Ramppi(0x9c7c52), TiMuste = Ramppi(0x4a3a28);
        static readonly Color TiLasi = Ramppi(0xf7f2e6), TiHiekka = Ramppi(0xa8845a), TiHiekkaVaalea = Ramppi(0xbf9c6c);

        static Mesh TiimalasiRunko() { var r = new Rakentaja(); TiimalasiOsat(r, false); return r.Verkko("kategoria-Tiimalasi"); }
        static Mesh TiimalasiLod1() { var r = new Rakentaja(); TiimalasiOsat(r, true); return r.Verkko("kategoria-Tiimalasi-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaTiimalasi3D(bool lod1 = false) => lod1 ? TiimalasiLod1() : TiimalasiRunko();

        static readonly bool tiimalasiMalli = RekisteroiKategoria(Kategoriasymboli.Tiimalasi, new Erikoismalli { Runko = TiimalasiRunko, Lod1 = TiimalasiLod1, Lahi = TiimalasiLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x Fablen kautta; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama tiimalasi lähizoomiin (kartan kerroin ≥ 4, korvaa LOD0:n). Sama siluetti, mittasuhteet, värit ja
        /// sommitelma kuin LOD0:ssa (sorvatut laipiot kauluksineen, neljä sorvattua pylvästä vinosti, lasikuvut sisäpintana,
        /// hiekka suppilona ja kekona ohuen juovan välissä, kannen nuppi ja kaiverrus), mutta 2 622 kolmiota (LOD0 744,
        /// noin 3,5 ×) lähikuvan yksityiskohtiin: laipioiden reunat pyöristettyinä sorvauslistoina, pylväissä
        /// helmirenkaat molemmissa päissä ja pullistuva keskikohta, sileämmät kuvut ja hiekka (keko koveraksi, suppilon
        /// kuoppa), sorvattu nuppi kaulasta, kannessa kaiverrettu rengas ja pylväiden tappien päät, lasissa kaiverruksen
        /// tapaan suippenevat kiiltojuovat kupujen etuvasemmalla puolella. Kaiverrustyyli ennallaan: seepiarampin värit
        /// (Ramppi) ja ääriviivaosat kuten LOD0:ssa (alalaipio pylväineen, ylälaipio nuppeineen, lasi hiekkoineen; juova ja
        /// tappien päät ilman). Apurit (TiimalasiLahi-alkuiset) ovat tässä tiedostossa; sorvaus ja kannen kaiverrus
        /// käyttävät LOD0:n TiSorvia ja TiKaiverrusta.
        /// </summary>
        static void TiimalasiLahiOsat(Rakentaja r)
        {
            const int n = 20;
            var o = Vector3.zero;
            const float tayS = Mathf.PI * 2f;
            // Monikulmion kärki pylvään kohdalla (45°), kuten LOD0:ssa.
            float k0 = Mathf.PI / 4f - 2f * tayS / n;

            // Alalaipio: pyöristetty pullea reuna (sorvauslista), yläpinta, kaulus ja kauluksen pyöristetty yläsärmä; pylväät
            // samaan ääriviivaosaan kuten LOD0:ssa.
            r.AloitaOsa();
            // Reunan säteet 0,985 ×: 20-kulmion leveys vastaa LOD0:n 12-kulmion leveyttä (sama rajaus ja maavarjo).
            TiSorvi(r, o, new[]
            {
                (0.2525f, 0f), (0.262f, 0.007f), (0.2665f, 0.019f), (0.2655f, 0.031f), (0.2585f, 0.043f), (0.2515f, 0.051f), (0.245f, 0.056f),
                (0.192f, 0.056f), (0.187f, 0.06f), (0.185f, 0.074f), (0.181f, 0.078f), (0f, TiLasiAla),
            }, n, k0, k0 + tayS, new[] { TiPuu, TiPuu, TiPuu, TiPuu, TiPuu, TiPuu, TiPuuVaalea, TiPuuTumma, TiPuuTumma, TiPuuVaalea });
            // Pylväät: jalkalaatta, helmirengas, kapea kaula, pullistuva keskikohta ja sama peilattuna ylös.
            var pylvas = new[]
            {
                (0.022f, 0.056f), (0.022f, 0.066f), (0.0165f, 0.072f), (0.019f, 0.08f), (0.0125f, 0.09f), (0.0115f, 0.14f), (0.0215f, 0.36f),
                (0.0245f, 0.4f), (0.0215f, 0.44f), (0.0115f, 0.66f), (0.0125f, 0.708f), (0.019f, 0.718f), (0.0165f, 0.726f), (0.022f, 0.732f), (0.022f, 0.742f),
            };
            for (int i = 0; i < 4; i++)
            {
                float a = Mathf.PI * (0.25f + 0.5f * i);
                TiSorvi(r, new Vector3(Mathf.Cos(a) * TiPylvasSade, 0f, Mathf.Sin(a) * TiPylvasSade), pylvas, 6, a, a + tayS, new[] { TiPuu });
            }
            r.LopetaOsa();

            // Ylälaipio: kaulus, pyöristetty reuna, kansi kaiverrettuine renkaineen ja sorvattu nuppi (yksi ääriviivaosa).
            r.AloitaOsa();
            TiSorvi(r, o, new[] { (0.181f, TiLasiYla), (0.185f, 0.726f), (0.185f, 0.742f) }, n, k0, k0 + tayS, new[] { TiPuuTumma });
            TiSorvi(r, o, new[]
            {
                (0.245f, 0.742f), (0.2515f, 0.747f), (0.2585f, 0.755f), (0.2655f, 0.767f), (0.2665f, 0.779f), (0.262f, 0.791f), (0.2545f, 0.798f), (0.2495f, TiKansi),
                (0.227f, TiKansi), (0.222f, TiKansi), (0.037f, TiKansi),
            }, n, k0, k0 + tayS, new[] { TiPuu, TiPuu, TiPuu, TiPuu, TiPuu, TiPuu, TiPuuVaalea, TiPuuVaalea, TiMuste, TiPuuVaalea });
            TiSorvi(r, o, new[]
            {
                (0.037f, TiKansi), (0.037f, TiKansi + 0.004f), (0.032f, TiKansi + 0.009f), (0.029f, TiKansi + 0.013f), (0.031f, TiKansi + 0.018f),
                (0.026f, TiKansi + 0.024f), (0.016f, TiKansi + 0.0285f), (0f, TiKansi + 0.03f),
            }, 10, 0f, tayS, new[] { TiPuu, TiPuu, TiPuuTumma, TiPuu, TiPuuVaalea });
            r.LopetaOsa();
            TiKaiverrus(r, TiKansi + 0.0015f, false);
            // Pylväiden tappien päät kannessa (pienet musteen kuusikulmiot pylväiden kohdalla).
            for (int i = 0; i < 4; i++)
            {
                float a = Mathf.PI * (0.25f + 0.5f * i);
                // Hieman pylvään akselin sisäpuolella, jotta pää pysyy kannen tasaisella osalla (reuna pyöristyy 0,2495:stä).
                var k = new Vector3(Mathf.Cos(a) * (TiPylvasSade - 0.002f), TiKansi + 0.0015f, Mathf.Sin(a) * (TiPylvasSade - 0.002f));
                for (int j = 0; j < 6; j++)
                {
                    float b0 = a + j * Mathf.PI / 3f, b1 = a + (j + 1) * Mathf.PI / 3f;
                    r.KolmioUlos(k, k + new Vector3(Mathf.Cos(b0), 0f, Mathf.Sin(b0)) * 0.006f, k + new Vector3(Mathf.Cos(b1), 0f, Mathf.Sin(b1)) * 0.006f, Vector3.up, TiMuste);
                }
            }

            // Lasi (sisäpinta kuten LOD0:ssa), hiekka ja kiiltojuovat yhtenä ääriviivaosana.
            const int nl = 16;
            r.AloitaOsa();
            TiSorvi(r, o, TiimalasiLahiLasi, nl, 0f, tayS, new[] { TiLasi }, true);
            // Hiekka lasin sisäpuolella: keon kylki ja kovera kartio, suppilon kylki ja kuoppa.
            TiSorvi(r, o, new[] { (0.122f, TiLasiAla), (0.136f, 0.098f), (0.144f, 0.13f) }, nl, 0f, tayS, new[] { TiHiekka });
            TiSorvi(r, o, new[] { (0.144f, 0.13f), (0.09f, 0.156f), (0.045f, 0.19f), (0.015f, 0.229f), (0f, TiKeko) }, nl, 0f, tayS, new[] { TiHiekkaVaalea });
            TiSorvi(r, o, new[] { (0.016f, TiVyotaro), (0.0335f, 0.43f), (0.066f, 0.468f) }, nl, 0f, tayS, new[] { TiHiekka });
            TiSorvi(r, o, new[] { (0.066f, 0.468f), (0.04f, 0.461f), (0f, 0.451f) }, nl, 0f, tayS, new[] { TiHiekkaVaalea });
            // Kiiltojuovat: kapeat, päistä suippenevat vaaleat sirpit lasin ulkopinnalla kupujen etuvasemmalla puolella
            // hiekan yläpuolella (kuten kaiverruksen valo lasissa).
            float ak = -0.66f * Mathf.PI;
            TiimalasiLahiKiilto(r, new[] { (0.1478f, 0.15f), (0.1455f, 0.185f), (0.1389f, 0.225f), (0.1238f, 0.26f) }, ak, new[] { 0f, 0.055f, 0.05f, 0f });
            TiimalasiLahiKiilto(r, new[] { (0.1036f, 0.51f), (0.1255f, 0.54f), (0.1386f, 0.572f), (0.1449f, 0.605f) }, ak, new[] { 0f, 0.045f, 0.045f, 0f });
            r.LopetaOsa();
            TiSorvi(r, o, new[] { (0.0048f, TiKeko - 0.012f), (0.0048f, TiVyotaro), (0f, TiVyotaro) }, 6, 0f, tayS, new[] { TiHiekka });
        }

        /// <summary>Lähitason kupujen profiili alhaalta ylös (sileämpi kuin TiLasiProfiili, samat ääripisteet).</summary>
        static readonly (float, float)[] TiimalasiLahiLasi =
        {
            (0.125f, TiLasiAla), (0.139f, 0.096f), (0.147f, 0.12f), (0.148f, 0.145f), (0.144f, 0.19f), (0.133f, 0.237f), (0.11f, 0.28f),
            (0.07f, 0.33f), (0.037f, 0.368f), (0.017f, TiVyotaro), (0.037f, 0.432f), (0.07f, 0.47f), (0.11f, 0.52f), (0.133f, 0.563f),
            (0.144f, 0.61f), (0.148f, 0.655f), (0.147f, 0.68f), (0.139f, 0.704f), (0.125f, TiLasiYla),
        };

        /// <summary>Lasin kiilto (vaalein ramppisävy).</summary>
        static readonly Color TiLasiKiilto = Ramppi(0xfdfbf6);

        /// <summary>Kiiltojuova lasin ulkopinnalla: profiilin pisteet (säde, korkeus) hieman lasin ulkopuolella, keskikulma a ja
        /// kulmaleveys pisteittäin (0 = suippo pää), etupuoli ulospäin.</summary>
        static void TiimalasiLahiKiilto(Rakentaja r, (float s, float y)[] pr, float a, float[] w)
        {
            Vector3 P(int k, float b) => new Vector3(Mathf.Cos(b) * (pr[k].s + 0.001f), pr[k].y, Mathf.Sin(b) * (pr[k].s + 0.001f));
            var ulos = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
            for (int k = 0; k + 1 < pr.Length; k++)
            {
                Vector3 A = P(k, a - w[k]), B = P(k, a + w[k]), C = P(k + 1, a + w[k + 1]), D = P(k + 1, a - w[k + 1]);
                if (w[k] <= 0f) r.KolmioUlos(A, C, D, ulos, TiLasiKiilto);
                else if (w[k + 1] <= 0f) r.KolmioUlos(A, B, C, ulos, TiLasiKiilto);
                else r.NelioUlos(A, B, C, D, ulos, TiLasiKiilto);
            }
        }

        static Mesh TiimalasiLahi() { var r = new Rakentaja(); TiimalasiLahiOsat(r); return r.Verkko("kategoria-Tiimalasi-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaTiimalasi3DLahi() => TiimalasiLahi();
    }
}
