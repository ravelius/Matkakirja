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

        static readonly bool kiekkoMalli = RekisteroiKategoria(Kategoriasymboli.Kiekko, new Erikoismalli { Runko = KiekkoRunko, Lod1 = KiekkoLod1, Lahi = KiekkoLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama lyöty raha lähizoomiin (korvaa LOD0:n vain lähellä, enintään kolme lähintä). Sama siluetti,
        /// mittasuhteet, värit ja sommitelma kuin LOD0:ssa (suora kylki, viistetty ja korotettu reunarengas, matala kenttä,
        /// kaiverrettu sisärengas ja keskipiste ⊙; halkaisija 0,6, korkeus 0,08, samat rajat), mutta 2 160 kolmiota (LOD0 504,
        /// noin 4,3 ×) lähikuvan yksityiskohtiin: 48 sektoria (pyöreä ääriviiva), rahan kylki pystyuritettuna (48 V-uraa),
        /// reunarenkaan särmät viistetty (ulkoviiste, valoviiste, harja ja sisäviiste erikseen), helminauha (48 matalaa
        /// kuusitahoista helmeä) reunan juurella kentällä sekä sisärenkaan ja keskipisteen kaiverrusten huulet viistetty.
        /// Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi). Yksi ääriviivaosa kuten LOD0.
        /// </summary>
        static void KiekkoLahiOsat(Rakentaja r)
        {
            const int n = 48;
            const float R = 0.3f, kylki = 0.046f;
            float db = Mathf.PI * 2f / n;
            r.AloitaOsa();
            // Kylki: jokainen sektori on jänne, jonka keskellä V-ura (20 % jänteestä, syvyys 0,0045); pohja maata vasten.
            for (int i = 0; i < n; i++)
            {
                float b0 = i * db, b1 = (i + 1) * db, bm = (b0 + b1) * 0.5f;
                var ulos = new Vector3(Mathf.Cos(bm), 0f, Mathf.Sin(bm));
                Vector3 A = new Vector3(Mathf.Cos(b0) * R, 0f, Mathf.Sin(b0) * R), E = new Vector3(Mathf.Cos(b1) * R, 0f, Mathf.Sin(b1) * R);
                Vector3 B = Vector3.Lerp(A, E, 0.4f), C = Vector3.Lerp(A, E, 0.5f) - ulos * 0.0045f, D = Vector3.Lerp(A, E, 0.6f);
                var ylos = Vector3.up * kylki;
                var kulku = new[] { A, B, C, D, E };
                for (int k = 0; k < 4; k++)
                {
                    var a = kulku[k]; var b = kulku[k + 1];
                    var nt = Vector3.Cross(Vector3.up, b - a);
                    if (Vector3.Dot(nt, ulos) < 0f) nt = -nt;
                    r.NelioUlos(a, b, b + ylos, a + ylos, nt, KiKylki);
                }
            }
            // Sorvattu profiili kyljen yläreunasta keskelle: ulkoviiste, valoviiste, harja, sisäviiste, sisärinne, kenttä,
            // sisärengas (huuli, seinä, pohja, seinä, huuli), sisäkenttä ja keskipiste (huuli, seinä, pohja).
            KiSorvi(r, new[]
            {
                (R, kylki), (0.2865f, 0.0705f), (0.2815f, 0.0768f), (0.2635f, 0.08f), (0.259f, 0.0787f), (0.2425f, 0.0645f),
                (0.2385f, 0.0618f), (0.1575f, 0.0566f), (0.152f, 0.0551f), (0.145f, 0.0468f), (0.125f, 0.0468f), (0.1188f, 0.0548f),
                (0.114f, 0.0563f), (0.065f, 0.058f), (0.06f, 0.0564f), (0.053f, 0.0462f), (0f, 0.044f),
            }, n, new[]
            {
                KiReuna, KiReuna, KiReuna, KiReuna, KiReunaSisa, KiReunaSisa, KiKentta, KiKentta, KiKaiverrus, KiKaiverrus,
                KiKaiverrus, KiKentta, KiKentta, KiKentta, KiKaiverrus, KiKaiverrus,
            });
            // Helminauha: matalat kuusikulmaiset helmet kentällä reunan juurella (kentän korkeus säteellä 0,2255).
            const float hr = 0.2255f, hs = 0.0088f, hk = 0.0075f;
            float y0 = Mathf.Lerp(0.0618f, 0.0566f, (0.2385f - hr) / (0.2385f - 0.1575f)) - 0.001f;
            for (int i = 0; i < n; i++)
            {
                float b = (i + 0.5f) * db;
                var c = new Vector3(Mathf.Cos(b) * hr, y0, Mathf.Sin(b) * hr);
                var karki = c + Vector3.up * (hk + 0.001f);
                for (int k = 0; k < 6; k++)
                {
                    float a0 = b + k * Mathf.PI / 3f, a1 = b + (k + 1) * Mathf.PI / 3f;
                    r.KolmioKeskelta(c + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * hs, c + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * hs, karki, c, KiReuna);
                }
            }
            r.LopetaOsa();
        }

        static Mesh KiekkoLahi() { var r = new Rakentaja(); KiekkoLahiOsat(r); return r.Verkko("kategoria-Kiekko-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaKiekko3DLahi() => KiekkoLahi();
    }
}
