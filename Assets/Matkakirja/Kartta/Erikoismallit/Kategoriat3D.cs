using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KATEGORIASYMBOLIT OIKEINA 3D-ESINEINÄ (omistaja 27.9.2026 klo 00.3x Fablen kautta: reliefit hylätty — "pitää olla yhtä
    /// hyvät kuin 2D mutta oikeita 3D-elementtejä; ota oppia lipputangosta"; Mallinseppä tekee, Natiiviseppä antaa rajapinnan
    /// ja varjostimen). Kuvamerkin (assets/nostotyypit/merkki-*.png) ilme ja yksityiskohtien taso, aito geometria
    /// (LOD0 ≤ 300–600 kolmiota), luettava ylhäältä ja kallistettuna, ei jalustaa (maavarjo), ei animaatiota.
    /// Paletti (docs/raportit/arkkityypit-paletti-animaatio-20260926.md §1): paperi #efe4cc, seepia #8a6a44, muste #3b2f22.
    /// KIVET JA SAUMAT: kivet ovat erillisiä kappaleita pienin välein, ja niiden takana on musteen värinen ydin, joten saumat
    /// näkyvät tummina viivoina kuten kuvamerkin musteviivat (≈ 1,5 % mallin leveydestä) — myös kallistetusta kulmasta, missä
    /// ääriviiva ei ulotu kivien väleihin. Jokainen kivi on oma ääriviivaosansa.
    /// Mallin avaruus: +Y ylös, −Z katsojaan päin (Symbolimallit kääntää +Z:n ruudun ylös-suuntaan), leveys noin 1, juuri maassa.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color KsKivi = Hex(0xefe4cc), KsKivi2 = Hex(0xe8dbbf), KsKivi3 = Hex(0xf4ecda), KsRaunio = Hex(0xdccdab);
        static readonly Color KsPohja = Hex(0xe3d4b2), KsMuste = Hex(0x3b2f22), KsSeepia = Hex(0x8a6a44);
        /// <summary>Sauman leveys (mallin yksiköissä): kuvamerkin musteviiva ≈ 2 px 128:sta.</summary>
        const float KsSauma = 0.022f;

        /// <summary>Kivi: laatikko keskipisteestä p puolikoolla h, kierto y-akselin ympäri (°) ja kallistus z:n ympäri (°);
        /// sauma kutistaa kiven joka suunnasta puolella saumasta. Pohja jätetään pois, jos kivi on maassa. Oma ääriviivaosa.</summary>
        static void KsLohko(Rakentaja r, Vector3 p, Vector3 h, Color vari, float kiertoY = 0f, float kallistusZ = 0f, bool maassa = false, float sauma = KsSauma)
        {
            var q = Quaternion.Euler(0f, kiertoY, kallistusZ);
            float s = sauma * 0.5f;
            var e = new Vector3(Mathf.Max(0.002f, h.x - s), Mathf.Max(0.002f, h.y - s), Mathf.Max(0.002f, h.z - s));
            Vector3 K(float x, float y, float z) => p + q * new Vector3(x * e.x, y * e.y, z * e.z);
            r.AloitaOsa();
            // Sivut ja katto (pohja vain ilmassa olevalle kivelle).
            r.NelioKeskelta(K(-1, -1, -1), K(1, -1, -1), K(1, 1, -1), K(-1, 1, -1), p, vari);
            r.NelioKeskelta(K(-1, -1, 1), K(1, -1, 1), K(1, 1, 1), K(-1, 1, 1), p, vari);
            r.NelioKeskelta(K(-1, -1, -1), K(-1, -1, 1), K(-1, 1, 1), K(-1, 1, -1), p, vari);
            r.NelioKeskelta(K(1, -1, -1), K(1, -1, 1), K(1, 1, 1), K(1, 1, -1), p, vari);
            r.NelioKeskelta(K(-1, 1, -1), K(1, 1, -1), K(1, 1, 1), K(-1, 1, 1), p, vari);
            if (!maassa) r.NelioKeskelta(K(-1, -1, -1), K(1, -1, -1), K(1, -1, 1), K(-1, -1, 1), p, vari);
            r.LopetaOsa();
        }

        /// <summary>Kaarikivi (kiila): keskipiste c, säteet r0–r1, kulmat a0–a1 (rad, 0 = oikea, π = vasen), syvyys ±d. Oma osa.</summary>
        static void KsKaarikivi(Rakentaja r, Vector3 c, float r0, float r1, float a0, float a1, float d, Color vari)
        {
            float s = KsSauma * 0.5f;
            // Sauma kulmasuunnassa (säteellä r) ja säteen suunnassa.
            float da = s / Mathf.Max(0.05f, (r0 + r1) * 0.5f);
            // Kavennus kiven keskustaa kohti (kulmat voivat kulkea kumpaan suuntaan tahansa).
            float suunta = a1 > a0 ? 1f : -1f;
            a0 += suunta * da; a1 -= suunta * da; r0 += s; r1 -= s; d -= s;
            Vector3 P(float a, float rr, float z) => c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, z);
            var k = c + new Vector3(Mathf.Cos((a0 + a1) * 0.5f), Mathf.Sin((a0 + a1) * 0.5f), 0f) * ((r0 + r1) * 0.5f);
            r.AloitaOsa();
            foreach (float z in new[] { -d, d })
                r.NelioKeskelta(P(a0, r0, z), P(a1, r0, z), P(a1, r1, z), P(a0, r1, z), k, vari);
            r.NelioKeskelta(P(a0, r0, -d), P(a1, r0, -d), P(a1, r0, d), P(a0, r0, d), k, vari);   // sisäkaari
            r.NelioKeskelta(P(a0, r1, -d), P(a1, r1, -d), P(a1, r1, d), P(a0, r1, d), k, vari);   // ulkokaari
            r.NelioKeskelta(P(a0, r0, -d), P(a0, r1, -d), P(a0, r1, d), P(a0, r0, d), k, vari);   // saumapinnat
            r.NelioKeskelta(P(a1, r0, -d), P(a1, r1, -d), P(a1, r1, d), P(a1, r0, d), k, vari);
            r.LopetaOsa();
        }

        /// <summary>Musteydin: kivien SISÄLLÄ oleva tumma täyte (sisennetty kivipinnoista), joka näkyy vain saumoista; kierto z:n
        /// ympäri (°) kaaren saumoille. Ei omaa ääriviivaa.</summary>
        static void KsYdin(Rakentaja r, Vector3 p, Vector3 h, float kiertoZ = 0f)
        {
            var q = Quaternion.Euler(0f, 0f, kiertoZ);
            Vector3 K(float x, float y, float z) => p + q * new Vector3(x * h.x, y * h.y, z * h.z);
            r.NelioKeskelta(K(-1, -1, -1), K(1, -1, -1), K(1, 1, -1), K(-1, 1, -1), p, KsMuste);
            r.NelioKeskelta(K(-1, -1, 1), K(1, -1, 1), K(1, 1, 1), K(-1, 1, 1), p, KsMuste);
            r.NelioKeskelta(K(-1, -1, -1), K(-1, -1, 1), K(-1, 1, 1), K(-1, 1, -1), p, KsMuste);
            r.NelioKeskelta(K(1, -1, -1), K(1, -1, 1), K(1, 1, 1), K(1, 1, -1), p, KsMuste);
            r.NelioKeskelta(K(-1, 1, -1), K(1, 1, -1), K(1, 1, 1), K(-1, 1, 1), p, KsMuste);
        }

        /// <summary>Halkeama: ohut musteviiva kiven etupinnalla (−Z), pisteestä a pisteeseen b (x, y), syvyys z.</summary>
        static void KsHalkeama(Rakentaja r, float z, Vector2 a, Vector2 b, float leveys = 0.008f)
        {
            var d = (b - a).normalized; var n = new Vector2(-d.y, d.x) * (leveys * 0.5f);
            Vector3 V(Vector2 p) => new Vector3(p.x, p.y, z);
            r.NelioUlos(V(a - n), V(b - n), V(b + n), V(a + n), Vector3.back, KsMuste);
        }

        /// <summary>
        /// HISTORIA: raunioitunut kivikaari (merkki-historia.png oikeana 3D-esineenä). Kaksi pilaria (jalka, kolme runkokiveä ja
        /// kapiteeli), korotettu puoliympyräkaari seitsemästä kaarikivestä, jonka oikea yläosa on sortunut (yksi kivi pudonnut
        /// maahan kaaren alle, viereinen lohjennut), raunioröykkiö oikean pilarin juurella ja pari irtokiveä; halkeamat
        /// etupinnalla. Leveys noin 0,95, korkeus 0,82, syvyys 0,15 (jalat 0,19). LOD1: ilman halkeamia, irtokiviä ja ydintä.
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
                float[] y = { jalka, 0.14f, 0.225f, kapiteeli };
                for (int k = 0; k < 3; k++)
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
            KsLohko(r, c + new Vector3(Mathf.Cos(Mathf.PI * 3f / 7f) * (ro + 0.005f), Mathf.Sin(Mathf.PI * 3f / 7f) * (ro + 0.005f), 0f) + new Vector3(0.035f, -0.03f, 0f),
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
            for (int i = 0; i < rauniot.Length; i++)
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

        /// <summary>Kaaren verkko esikatseluun ja rajapintaan (Natiiviseppä kytkee SymbolinVerkkoon).</summary>
        public static Mesh KategoriaKaari3D(bool lod1 = false)
        {
            var r = new Rakentaja();
            KaariKivet(r, lod1);
            return r.Verkko("kategoria3d-Kaari" + (lod1 ? "-lod1" : ""));
        }

        static readonly Color KvLumi = Hex(0xf8f4ea), KvLumiVarjo = Hex(0xe6e0d2), KvHarjanne = Hex(0xeadcbd), KvRinne = Hex(0xcfb88e), KvKuru = Hex(0xa98a5c);

        /// <summary>Toistettava kohina −1…1 (kokonaisluvuista, ei allokaatioita).</summary>
        static float KvKohina(int a, int b)
        {
            unchecked
            {
                uint h = (uint)a * 0x9E3779B1u ^ (uint)b * 0x85EBCA77u ^ 0xC2B2AE3Du;
                h ^= h >> 16; h *= 0x7FEB352Du; h ^= h >> 15; h *= 0x846CA68Bu; h ^= h >> 16;
                return (h & 0xFFFF) / 32767.5f - 1f;
            }
        }

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

        public static Mesh KategoriaVuori3D(bool lod1 = false)
        {
            var r = new Rakentaja();
            VuoriRinteet(r, lod1);
            return r.Verkko("kategoria3d-Vuori" + (lod1 ? "-lod1" : ""));
        }
    }
}
