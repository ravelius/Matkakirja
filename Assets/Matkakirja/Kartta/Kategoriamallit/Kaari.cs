using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI KAARI (historia), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// HISTORIA: raunioitunut kivikaari (merkki-historia.png oikeana 3D-esineenä). Kaksi pilaria (jalka, kolme runkokiveä ja
        /// kapiteeli), korotettu puoliympyräkaari seitsemästä kaarikivestä, jonka oikea yläosa on sortunut (yksi kivi pudonnut
        /// maahan kaaren alle, viereinen lohjennut), raunioröykkiö oikean pilarin juurella ja pari irtokiveä; halkeamat
        /// etupinnalla. Leveys noin 0,95, korkeus 0,82, syvyys 0,15 (jalat 0,19). LOD1 (≤ 200, tasot 2–3): yksi runkokivi pilaria kohden, kolme raunion kiveä, ilman halkeamia, murua, irtokiviä ja ydintä.
        /// </summary>
        static void KaariKivet(Rakentaja r, bool lod1)
        {
            const float d = 0.072f;                              // puolisyvyys (ohut kuten kuvamerkissä: etumuoto hallitsee)
            float[] pilarit = { -0.34f, 0.2f };                  // pilarien keskipisteet (x)
            const float pl = 0.1f;                               // pilarin puolileveys
            const float jalka = 0.05f, kapiteeli = 0.31f, kaariAlku = 0.35f, kaariKeski = 0.46f;
            float cx = (pilarit[0] + pl + pilarit[1] - pl) * 0.5f, ri = (pilarit[1] - pl - (pilarit[0] + pl)) * 0.5f, ro = ri + 0.17f;
            var c = new Vector3(cx, kaariKeski, 0f);

            // Musteytimet (saumat): 0,02 kivipintojen sisällä, joten ne näkyvät vain kivien väleistä.
            const float sis = 0.02f;
            if (!lod1)
            {
                foreach (float px in pilarit) KsYdin(r, new Vector3(px, kaariAlku * 0.5f, 0f), new Vector3(pl - sis, kaariAlku * 0.5f - 0.01f, d - sis));
                foreach (float kx in new[] { cx - (ri + ro) * 0.5f, cx + (ri + ro) * 0.5f })
                    KsYdin(r, new Vector3(kx, (kapiteeli + kaariKeski) * 0.5f, 0f), new Vector3((ro - ri) * 0.5f - sis, (kaariKeski - kapiteeli) * 0.5f, d - sis));
            }

            // Pilarit: jalka (leveämpi), kolme runkokiveä (hieman epäsäännölliset), kapiteeli (leveämpi).
            for (int i = 0; i < pilarit.Length; i++)
            {
                float px = pilarit[i];
                KsLohko(r, new Vector3(px, jalka * 0.5f, 0f), new Vector3(pl + 0.028f, jalka * 0.5f + KsSauma * 0.5f, d + 0.022f), KsPohja, 0f, 0f, true);
                float[] y = lod1 ? new[] { jalka, kapiteeli } : new[] { jalka, 0.14f, 0.225f, kapiteeli };
                for (int k = 0; k + 1 < y.Length; k++)
                {
                    float w = pl + (k == 1 ? -0.006f : 0.004f) * (i == 0 ? 1 : -1);
                    var sivu = (k % 2 == 0 ? 0.004f : -0.004f) * (i == 0 ? 1 : -1);
                    KsLohko(r, new Vector3(px + sivu, (y[k] + y[k + 1]) * 0.5f, 0f), new Vector3(w, (y[k + 1] - y[k]) * 0.5f, d), (k + i) % 3 == 0 ? KsKivi2 : k == 1 ? KsKivi3 : KsKivi);
                }
                KsLohko(r, new Vector3(px, (kapiteeli + kaariAlku) * 0.5f, 0f), new Vector3(pl + 0.022f, (kaariAlku - kapiteeli) * 0.5f + KsSauma * 0.5f, d + 0.016f), KsPohja);
                // Korotettu kaaren kylki kapiteelin päällä (kaariAlku → kaariKeski).
                float kx = i == 0 ? cx - (ri + ro) * 0.5f : cx + (ri + ro) * 0.5f;
                KsLohko(r, new Vector3(kx, (kaariAlku + kaariKeski) * 0.5f, 0f), new Vector3((ro - ri) * 0.5f, (kaariKeski - kaariAlku) * 0.5f, d), KsKivi3);
            }

            // Kaarikivet: 7 kiveä π → 0 (vasemmalta oikealle). Kivi 5 (oikealla lakikiven vieressä) on pudonnut, kivi 6 lohjennut.
            const int n = 7;
            for (int k = 0; k < n; k++)
            {
                float a0 = Mathf.PI * (1f - k / (float)n), a1 = Mathf.PI * (1f - (k + 1) / (float)n);
                if (k == 4) continue;
                float ulko = ro + (k == 3 ? 0.02f : k % 2 == 0 ? 0.0f : -0.012f);
                if (k == 5) { a0 -= 0.12f; ulko = ri + 0.1f; }        // lohjennut: kapeampi ja matalampi
                // Ydin kiven alkusaumassa (kulma a0, säteen suuntainen laatikko), jotta sauma näkyy tummana.
                if (!lod1 && k > 0 && k != 5 && k != 6)
                {
                    float rr = (ri + Mathf.Min(ulko, ro)) * 0.5f;
                    KsYdin(r, c + new Vector3(Mathf.Cos(a0), Mathf.Sin(a0), 0f) * rr, new Vector3((ro - ri) * 0.5f - sis, 0.02f, d - sis), a0 * Mathf.Rad2Deg);
                }
                KsKaarikivi(r, c, ri, ulko, a0, a1, d, k == 3 ? KsKivi3 : k % 2 == 0 ? KsKivi : KsKivi2);
            }
            // Lohjenneen reunan murut lakikiven oikealla puolella.
            if (!lod1) KsLohko(r, c + new Vector3(Mathf.Cos(Mathf.PI * 3f / 7f) * (ro + 0.005f), Mathf.Sin(Mathf.PI * 3f / 7f) * (ro + 0.005f), 0f) + new Vector3(0.035f, -0.03f, 0f),
                new Vector3(0.025f, 0.02f, d * 0.8f), KsRaunio, 20f, -25f);

            // Raunioröykkiö oikean pilarin oikealla puolella (porrastettu, kivet hieman vinossa).
            float rx = pilarit[1] + pl;
            var rauniot = new (float x0, float x1, float y0, float y1, float kierto, float kallistus)[]
            {
                (0.0f, 0.1f, 0.0f, 0.075f, 3f, 0f), (0.1f, 0.19f, 0.0f, 0.065f, -3f, 2f),
                (0.0f, 0.11f, 0.075f, 0.145f, -2f, -1f), (0.11f, 0.165f, 0.065f, 0.115f, 4f, 4f),
                (0.0f, 0.085f, 0.145f, 0.205f, 3f, -2f), (0.0f, 0.05f, 0.205f, 0.255f, -3f, 3f),
            };
            if (!lod1) KsYdin(r, new Vector3(rx + 0.06f, 0.1f, 0f), new Vector3(0.045f, 0.085f, 0.066f - 0.008f - sis));
            for (int i = 0; i < (lod1 ? 3 : rauniot.Length); i++)
            {
                var (x0, x1, y0, y1, kierto, kallistus) = rauniot[i];
                KsLohko(r, new Vector3(rx + (x0 + x1) * 0.5f, (y0 + y1) * 0.5f, 0.005f * (i % 3 - 1)), new Vector3((x1 - x0) * 0.5f, (y1 - y0) * 0.5f, 0.066f - 0.008f * (i % 2)),
                    i % 2 == 0 ? KsRaunio : KsKivi2, kierto, kallistus, y0 == 0f);
            }

            if (lod1) return;
            // Pudonnut kaarikivi kaaren alla (sortuman kohdalla) ja irtokiviä.
            KsLohko(r, new Vector3(cx + 0.1f, 0.024f, -0.02f), new Vector3(0.055f, 0.024f, 0.05f), KsRaunio, 28f, 0f, true);
            KsLohko(r, new Vector3(0.47f, 0.02f, -0.09f), new Vector3(0.03f, 0.02f, 0.026f), KsKivi2, -20f, 0f, true);
            KsLohko(r, new Vector3(-0.12f, 0.016f, -0.15f), new Vector3(0.024f, 0.016f, 0.022f), KsRaunio, 35f, 0f, true);

            // Halkeamat etupinnalla (−Z), kuten kuvamerkissä.
            float z = -d - 0.0012f;
            KsHalkeama(r, z, new Vector2(pilarit[0] - 0.05f, 0.1f), new Vector2(pilarit[0] - 0.01f, 0.07f));
            KsHalkeama(r, z, new Vector2(pilarit[0] + 0.02f, 0.2f), new Vector2(pilarit[0] + 0.06f, 0.17f));
            KsHalkeama(r, z, new Vector2(pilarit[1] - 0.04f, 0.26f), new Vector2(pilarit[1] + 0.01f, 0.24f));
            KsHalkeama(r, z, new Vector2(cx - 0.27f, 0.62f), new Vector2(cx - 0.23f, 0.58f));
        }

        static Mesh KaariRunko() { var r = new Rakentaja(); KaariKivet(r, false); return r.Verkko("kategoria-Kaari"); }
        static Mesh KaariLod1() { var r = new Rakentaja(); KaariKivet(r, true); return r.Verkko("kategoria-Kaari-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaKaari3D(bool lod1 = false) => lod1 ? KaariLod1() : KaariRunko();

        static readonly bool kaariMalli = RekisteroiKategoria(Kategoriasymboli.Kaari, new Erikoismalli { Runko = KaariRunko, Lod1 = KaariLod1 });
    }
}
