using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI KIEKKO (kaupungit), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// KAUPUNKI: matala kiekko (kartan piste oikeana esineenä) kuin lyöty raha: suora kylki, viistetty ja korotettu
        /// reunarengas, matala kenttä, kaiverrettu sisärengas (V-ura) ja kaiverrettu keskipiste (kartan kaupunkimerkki ⊙),
        /// joten ylhäältä, kallistettuna ja sivulta näkyy sama merkki. Halkaisija 0,6, korkeus 0,08, yksi ääriviivaosa.
        /// LOD1: harvempi kierros, kaiverrukset tasaisina värinauhoina.
        /// </summary>
        static void KiekkoOsat(Rakentaja r, bool lod1)
        {
            r.AloitaOsa();
            if (lod1)
                KiSorvi(r, new[] { (0.3f, 0f), (0.3f, 0.05f), (0.266f, 0.08f), (0.236f, 0.058f), (0.15f, 0.056f), (0.118f, 0.056f), (0.058f, 0.056f), (0f, 0.056f) }, 14,
                    new[] { KiKylki, KiReuna, KiReunaSisa, KiKentta, KiKaiverrus, KiKentta, KiKaiverrus });
            else
                KiSorvi(r, new[]
                {
                    (0.3f, 0f), (0.3f, 0.048f), (0.285f, 0.072f), (0.262f, 0.08f), (0.24f, 0.062f), (0.152f, 0.056f),
                    (0.146f, 0.046f), (0.124f, 0.046f), (0.118f, 0.056f), (0.062f, 0.058f), (0.052f, 0.046f), (0f, 0.044f),
                }, 24, new[] { KiKylki, KiReuna, KiReuna, KiReunaSisa, KiKentta, KiKaiverrus, KiKaiverrus, KiKaiverrus, KiKentta, KiKaiverrus, KiKaiverrus });
            r.LopetaOsa();
        }

        /// <summary>Sorvattu kiekko: profiili (säde, korkeus) kiertää alhaalta ulkokautta ylös ja kohti akselia (tahkon
        /// ulkonormaali profiilin tangentista (dy, −dr)), n sektoria täytenä kierroksena, väri nauhoittain.</summary>
        static void KiSorvi(Rakentaja r, (float s, float y)[] pr, int n, Color[] varit)
        {
            for (int j = 0; j + 1 < pr.Length; j++)
            {
                float dr = pr[j + 1].s - pr[j].s, dy = pr[j + 1].y - pr[j].y;
                var vari = varit[Mathf.Min(j, varit.Length - 1)];
                for (int i = 0; i < n; i++)
                {
                    float b0 = i * Mathf.PI * 2f / n, b1 = (i + 1) * Mathf.PI * 2f / n, bm = (b0 + b1) * 0.5f;
                    Vector3 P(float b, int k) => new Vector3(Mathf.Cos(b) * pr[k].s, pr[k].y, Mathf.Sin(b) * pr[k].s);
                    r.NelioUlos(P(b0, j), P(b1, j), P(b1, j + 1), P(b0, j + 1), new Vector3(Mathf.Cos(bm) * dy, -dr, Mathf.Sin(bm) * dy), vari);
                }
            }
        }

        static readonly Color KiKylki = Ramppi(0xcfb993), KiReuna = Ramppi(0xf2e9d4), KiReunaSisa = Ramppi(0xdccaa6);
        static readonly Color KiKentta = Ramppi(0xe6d8b8), KiKaiverrus = Ramppi(0x6b5237);

        static Mesh KiekkoRunko() { var r = new Rakentaja(); KiekkoOsat(r, false); return r.Verkko("kategoria-Kiekko"); }
        static Mesh KiekkoLod1() { var r = new Rakentaja(); KiekkoOsat(r, true); return r.Verkko("kategoria-Kiekko-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaKiekko3D(bool lod1 = false) => lod1 ? KiekkoLod1() : KiekkoRunko();

        static readonly bool kiekkoMalli = RekisteroiKategoria(Kategoriasymboli.Kiekko, new Erikoismalli { Runko = KiekkoRunko, Lod1 = KiekkoLod1 });
    }
}
