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
        /// <summary>Kärkialfa 0 = Symbolimalli-varjostimen seepiaramppi (paperi → seepia → muste valoisuuden mukaan), kuten
        /// 2D-kuvamerkin kaiverrus; alfa 1 näyttäisi kärkivärin sellaisenaan (laitteella harmahtava, 27.9. klo 01.2x).</summary>
        static Color Ramppi(int rgb) { var c = Hex(rgb); c.a = 0f; return c; }
        static readonly Color KsKivi = Ramppi(0xefe4cc), KsKivi2 = Ramppi(0xe8dbbf), KsKivi3 = Ramppi(0xf4ecda), KsRaunio = Ramppi(0xdccdab);
        static readonly Color KsPohja = Ramppi(0xe3d4b2), KsMuste = Ramppi(0x3b2f22), KsSeepia = Ramppi(0x8a6a44);
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

        static readonly Color KvLumi = Ramppi(0xf8f4ea), KvLumiVarjo = Ramppi(0xe6e0d2), KvHarjanne = Ramppi(0xeadcbd), KvRinne = Ramppi(0xcfb88e), KvKuru = Ramppi(0xa98a5c);

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

    }
}
