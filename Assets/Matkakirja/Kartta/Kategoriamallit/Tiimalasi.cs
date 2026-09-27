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

        static readonly bool tiimalasiMalli = RekisteroiKategoria(Kategoriasymboli.Tiimalasi, new Erikoismalli { Runko = TiimalasiRunko, Lod1 = TiimalasiLod1 });
    }
}
