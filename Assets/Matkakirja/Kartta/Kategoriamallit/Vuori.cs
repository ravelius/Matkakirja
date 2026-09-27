using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI VUORI (luonto: vuori), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// LUONTO: VUORI (merkki-vuori.png oikeana 3D-esineenä). Terävä päähuippu hieman keskeltä taaksepäin, neljä harjannetta
        /// (pitkät itään ja länteen kuten kuvamerkin rinteet, lyhyemmät eteen ja taakse), oikean harjanteen sivuhuippu, kurut
        /// harjanteiden välissä tummempina ja rosoinen lumiraja (lumi vaalein, varjopuoli hieman tummempi). Juuri maassa
        /// epäsäännöllisenä soikiona (0,9 × 0,6), korkeus 0,72, ei jalustaa. Ylhäältä: tähtimäinen harjanne- ja lumikuvio, kallistettuna
        /// kuvamerkin siluetti. Yksi ääriviivaosa. LOD1: harvempi verkko.
        /// </summary>
        static void VuoriRinteet(Rakentaja r, bool lod1)
        {
            int n = lod1 ? 12 : 26, m = lod1 ? 3 : 7;
            var huippu = new Vector3(0.02f, 0.72f, 0.03f);
            // Harjanteet: suunta (rad, 0 = itä, π/2 = pohjoinen/taakse), voimakkuus ja leveys.
            var harjanteet = new (float a, float voima, float leveys)[]
            {
                (0.05f, 0.55f, 0.32f), (Mathf.PI + 0.08f, 0.5f, 0.3f), (-Mathf.PI * 0.5f + 0.25f, 0.35f, 0.26f), (Mathf.PI * 0.5f - 0.2f, 0.3f, 0.28f),
                (-0.55f, 0.18f, 0.2f), (Mathf.PI + 0.6f, 0.16f, 0.2f),
            };
            float Harjanne(float a)
            {
                float h = 0f;
                foreach (var (ha, voima, lev) in harjanteet)
                {
                    float da = Mathf.Abs(Mathf.DeltaAngle(a * Mathf.Rad2Deg, ha * Mathf.Rad2Deg)) * Mathf.Deg2Rad;
                    h += voima * Mathf.Exp(-(da / lev) * (da / lev));
                }
                return h;
            }
            var p = new Vector3[m + 1, n];
            var harj = new float[n];
            for (int i = 0; i < n; i++)
            {
                float a = i * Mathf.PI * 2f / n;
                harj[i] = Harjanne(a);
                // Pohjan säde: soikio, harjanteiden kohdalla pidempi, ja rosoa.
                float R = 1f / Mathf.Sqrt(Mathf.Pow(Mathf.Cos(a) / 0.45f, 2f) + Mathf.Pow(Mathf.Sin(a) / 0.3f, 2f));
                R *= 0.86f + 0.3f * harj[i] + 0.05f * KvKohina(i, 7);
                for (int j = 0; j <= m; j++)
                {
                    float rr = j / (float)m;
                    if (j == 0) { p[j, i] = huippu; continue; }
                    // Korkeus: kupera laskeva profiili, harjanteet pysyvät korkeampina keskivälillä, rosoa.
                    // Kovera profiili (terävä huippu, loiveneva juuri); harjanteet veitsenteräksi, kurut syvemmiksi.
                    float h = huippu.y * Mathf.Pow(1f - rr, 1.9f) * (1f + 0.9f * harj[i] * Mathf.Sin(Mathf.PI * Mathf.Pow(rr, 0.8f)) - 0.18f * (1f - Mathf.Min(1f, harj[i] * 3f)) * Mathf.Sin(Mathf.PI * rr));
                    // Rosoinen harjanne: harjanteilla kohina on isompi (hammasmainen siluetti kuten kuvamerkissä).
                    h += (0.025f + 0.05f * harj[i]) * KvKohina(i * 31 + j, 3) * Mathf.Sin(Mathf.PI * rr);
                    // Sivuhuippu itäisellä (oikealla) harjanteella.
                    float dI = Mathf.Abs(Mathf.DeltaAngle(a * Mathf.Rad2Deg, 5f)) * Mathf.Deg2Rad;
                    h += 0.2f * Mathf.Exp(-(dI / 0.18f) * (dI / 0.18f)) * Mathf.Exp(-Mathf.Pow((rr - 0.42f) / 0.1f, 2f));
                    // Länsiharjanteen pienempi kyhmy (kuvamerkin vasen rinne).
                    float dL = Mathf.Abs(Mathf.DeltaAngle(a * Mathf.Rad2Deg, 185f)) * Mathf.Deg2Rad;
                    h += 0.09f * Mathf.Exp(-(dL / 0.18f) * (dL / 0.18f)) * Mathf.Exp(-Mathf.Pow((rr - 0.6f) / 0.1f, 2f));
                    if (j == m) h = 0f;
                    // Säteen tihennys huipun ympärille (terävä kärki): paikka rr^1,15, korkeus yllä rr:stä.
                    float x = huippu.x + Mathf.Cos(a) * R * Mathf.Pow(rr, 1.15f), z = huippu.z + Mathf.Sin(a) * R * Mathf.Pow(rr, 1.15f);
                    p[j, i] = new Vector3(x, Mathf.Max(0f, h), z);
                }
            }
            var keski = new Vector3(huippu.x, huippu.y * 0.2f, huippu.z);
            Color Vari(float korkeus, int i)
            {
                // Lumiraja rosoisena: 0,62–0,74 huipun korkeudesta harjanteen ja kohinan mukaan.
                float raja = huippu.y * (0.7f - 0.1f * harj[i] + 0.06f * KvKohina(i, 11));
                if (korkeus > raja) return harj[i] > 0.3f ? KvLumi : KvLumiVarjo;
                return harj[i] > 0.35f ? KvHarjanne : harj[i] > 0.15f ? KvRinne : KvKuru;
            }
            r.AloitaOsa();
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                for (int j = 0; j < m; j++)
                {
                    float kork = (p[j, i].y + p[j + 1, i].y + p[j, q].y + p[j + 1, q].y) * 0.25f;
                    var c = Vari(kork, harj[i] >= harj[q] ? i : q);
                    if (j == 0) r.KolmioKeskelta(p[0, i], p[1, i], p[1, q], keski, c);
                    else r.NelioKeskelta(p[j, i], p[j + 1, i], p[j + 1, q], p[j, q], keski, c);
                }
            }
            r.LopetaOsa();
        }

        static Mesh VuoriRunko() { var r = new Rakentaja(); VuoriRinteet(r, false); return r.Verkko("kategoria-Vuori"); }
        static Mesh VuoriLod1() { var r = new Rakentaja(); VuoriRinteet(r, true); return r.Verkko("kategoria-Vuori-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaVuori3D(bool lod1 = false) => lod1 ? VuoriLod1() : VuoriRunko();

        static readonly bool vuoriMalli = RekisteroiKategoria(Kategoriasymboli.Vuori, new Erikoismalli { Runko = VuoriRunko, Lod1 = VuoriLod1 });
    }
}
