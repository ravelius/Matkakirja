using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MEREN KORISTE, LAATUTASO (omistaja 27.9.2026 klo 13.0x: "Nuo voisi tehdä korkeammalla laadulla"; speksi
    /// docs/raportit/meri-laatu-speksi-20260927.md): nykyaikainen Itämeren auto- ja matkustajalautta (AIKA-sääntö: kartta elää
    /// nykyajassa, vain ilme on vanha) MeriMalli-varjostimelle. Pitkä tumma runko laipioituvalla keulalla ja leveällä
    /// peräpeilillä, paperinvaaleat kansirakennukset neljänä kerroksena (perässä porrastetut terassit), komentosilta
    /// tummalla ikkunanauhalla ja siltasiivillä, pelastusveneet taaveteissa sivukäytävän syvennyksessä, kalteva soikea
    /// savupiippu punaisella raidalla (ainoa korostus) ja mustalla hatulla, masto tutkineen, keulavisiirin sauma, perän
    /// autokansiovi ja avoin peräkansi sekä kaiteet terasseilla. +z eteen (keula), +y ylös, meren pinta y = 0,
    /// 1 yksikkö = KokoPt pistettä.
    /// Lapset: 0 toinen lautta (sama malli, vain harvinaisessa), 1–7 lautan savupallot, 8–14 toisen lautan savupallot,
    /// 15–16 lautan ja 17–18 toisen sumutorven höyrypallot, 19–20 vanavedet (lautta, toinen; pysyvät vaakasuorassa).
    /// </summary>
    public static class MeriLautta
    {
        public const string Nimi = "lautta";
        public static readonly string[] Meret = { "itameri", "valimeri", "pohjanmeri" };
        /// <summary>Runko 0,17 yksikköä → noin 48 pt (sama mittakaava kuin merilaivalla ja purjelaivalla).</summary>
        public const float KokoPt = 280f;
        /// <summary>Sama siemen ja samat näytösten kestot kuin vanhalla lautalla.</summary>
        public static readonly MeriAikataulu Aikataulu = new MeriAikataulu(919, 30f, 45f, 60f, 150f);
        const int Savuja = 7;
        const int Torvia = 2;
        public const int Lapsia = 1, Lapsia2 = 2 * Savuja + 2 * Torvia, Lapsia3 = 2;

        // ---- Mitat (mallin yksiköissä) ----

        /// <summary>Ääriviivan raja: piippu (puolimitta 0,006) saa ääriviivan, köydet, kaiteet ja tutka eivät.</summary>
        const float ReunaMinimi = 0.0045f;
        const float ZKeula = 0.0865f, ZPera = -0.0835f, ZvKeula = 0.0785f, ZvPera = -0.0818f;
        const float Leveys = 0.0148f, YKansi = 0.0105f, ZOlka = 0.016f, ZPeraOlka = -0.066f, Kaide = 0.0013f;
        /// <summary>Kerrosten yläpinnat: T1 autokannen yllä (hytit), T2 salongit, T3 komentosilta, T4 tutkakansi.</summary>
        const float Y1 = 0.0165f, Y2 = 0.0225f, Y3 = 0.0285f, Y4 = 0.0330f;
        const float ZT1a = -0.068f, ZT1k = 0.053f, ZT2a = -0.058f, ZT2k = 0.049f, ZT3a = -0.046f, ZT3k = 0.044f, ZT4a = -0.004f, ZT4k = 0.034f;
        /// <summary>Pelastusveneiden syvennys T2:ssa (sivukäytävä): z-väli ja seinän puolileveys.</summary>
        const float ZLovi0 = -0.030f, ZLovi1 = 0.015f, XLovi = 0.0104f, XVene = 0.0134f;
        const float ZPiippu = -0.030f, YPiippuYla = 0.0495f, PiippuA = 0.0060f, PiippuB = 0.0037f, PiippuKallistus = 10f;
        const float ZMasto = 0.026f, YMastoYla = 0.0535f;
        const float RSavu = 0.0040f;
        /// <summary>Kaistojen väli ohituksessa (keskilinjasta keskilinjaan), kuten vanhassa lautassa.</summary>
        const float Kaistavali = 0.062f;

        // ---- Värit: vain B-seepiaramppi (alfa 0) ja pelin punainen (alfa 1) ----

        static Color Rampi(float s) => MeriRakentaja.Rampi(s);
        static readonly Color RunkoVari = Rampi(0.45f), KaideYla = Rampi(1.9f), KaideSisa = Rampi(1.5f), KansiVari = Rampi(1.3f);
        static readonly Color Seina = Rampi(1.9f), SeinaLovi = Rampi(1.55f), Ikkuna = Rampi(0.3f), SiltaLasi = Rampi(0.14f);
        static readonly Color Katto1 = Rampi(1.45f), Katto2 = Rampi(1.6f), Katto3 = Rampi(1.88f), Katto4 = Rampi(2f);
        static readonly Color PiippuVari = Rampi(1.78f), PiippuHattu = Rampi(0.12f), PiippuSuu = Rampi(0.05f);
        static readonly Color MastoVari = Rampi(0.45f), Tutka = Rampi(0.3f), KaideVari = Rampi(0.4f);
        static readonly Color Vene = Rampi(1.9f), VeneKatto = Rampi(1.62f), Taavetti = Rampi(0.5f);
        static readonly Color Visiiri = Rampi(1.7f), Peraovi = Rampi(1.8f), Pilli = Rampi(1.6f), Aallonmurtaja = Rampi(1.85f), Vinssi = Rampi(0.55f);
        /// <summary>Savun rampin kohdat: vaalea pakokaasu ja höyry 1,9, tummempi kupu 1,35.</summary>
        const float SavuVaalea = 1.9f, SavuTumma = 1.35f;

        static float Pehmea(float x) => MeriGeometria.Pehmea(x);

        // ---- Rungon muoto ----

        /// <summary>Kansilinja: suora, keulassa nousu 0,0024 (kokka).</summary>
        static float Kansi(float z)
        {
            float q = Mathf.Clamp01((z - 0.030f) / (ZKeula - 0.030f));
            return YKansi + 0.0024f * q * q;
        }

        /// <summary>Kannen puolileveys: pitkä suora keskiosa, terävä keula (ogiivi) ja leveä, hieman kapeneva peräpeili.</summary>
        static float Puolileveys(float z)
        {
            if (z > ZOlka)
            {
                float t = Mathf.Clamp01((z - ZOlka) / (ZKeula - ZOlka));
                return Leveys * Mathf.Pow(Mathf.Max(0f, 1f - Mathf.Pow(t, 1.9f)), 0.58f);
            }
            if (z < ZPeraOlka)
            {
                float t = Mathf.Clamp01((ZPeraOlka - z) / (ZPeraOlka - ZPera));
                return Leveys * (1f - 0.08f * t * t);
            }
            return Leveys;
        }

        static float KansiZ(float g) => Mathf.Lerp(ZPera, ZKeula, g);

        /// <summary>Kyljen piste: g 0 perä … 1 keula, v 0 vesiraja … 1 kannen reuna. Keula kallistuu eteen ja laipioituu
        /// (vesiraja kapeampi, kylki levenee ylöspäin), keskiosa ja perä ovat pystykylkiset.</summary>
        static Vector3 Kylki(float g, float v, float puoli)
        {
            float zd = KansiZ(g), zw = Mathf.Lerp(ZvPera, ZvKeula, g);
            float bd = Puolileveys(zd);
            float bw = bd * Mathf.Lerp(1f, 0.70f, Mathf.SmoothStep(0f, 1f, (g - 0.62f) / 0.38f));
            float z = Mathf.Lerp(zw, zd, v);
            float x = Mathf.Lerp(bw, bd, Mathf.Pow(v, 1.5f));
            return new Vector3(puoli * x, Kansi(zd) * v, z);
        }

        /// <summary>Asemat (g): tiheämpi keulassa, jossa muoto kaartuu; keskiosa yhtenä tasona.</summary>
        static readonly float[] Asemat = { 0f, 0.012f, 0.06f, 0.1f, 0.585f, 0.66f, 0.75f, 0.82f, 0.88f, 0.93f, 0.97f, 1f };
        static readonly float[] AsematKauko = { 0f, 0.1f, 0.585f, 0.75f, 0.88f, 0.96f, 1f };
        const float GKeulakansi = 0.75f, GPerakansi = 0.1f;

        // ---- Mallit ----

        public static Mesh Roottori() => Rakenna(false, "lautta");

        /// <summary>Kaukotaso (≤ 800 kolmiota): sama siluetti harvemmin jaoin, ilman kaiteita, taavetteja ja pieniä varusteita.</summary>
        public static Mesh RoottoriKauko() => Rakenna(true, "lautta-kauko");

        /// <summary>Toinen lautta (lapsi 0): sisaralus, sama malli (näkyy vain harvinaisessa ohituksessa).</summary>
        public static Mesh Lapsi() => Rakenna(false, "lautta-toinen");

        static Mesh Rakenna(bool kauko, string nimi)
        {
            var r = new MeriRakentaja(ReunaMinimi);
            Runko(r, kauko);
            Kerrokset(r, kauko);
            Pelastusveneet(r, kauko);
            Piippu(r, kauko);
            Masto(r, kauko);
            return r.Verkko(nimi);
        }

        /// <summary>
        /// Runko yhtenä osana: tummat kyljet (keskiosa yhtenä tasona), peräpeili autokansiovineen, keulakansi ja peräkansi
        /// parrasvarustuksineen (vaalea reunalista), keulavisiirin sauma vaaleana viivana ja aallonmurtaja keulakannella.
        /// </summary>
        static void Runko(MeriRakentaja r, bool kauko)
        {
            var g = kauko ? AsematKauko : Asemat;
            r.AloitaOsa();
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var ulos = new Vector3(p, 0f, 0f);
                for (int i = 0; i + 1 < g.Length; i++)
                {
                    // Laipio vain keulassa (g > 0,62): siellä kaksi vyötä, muualla kylki on pystytaso.
                    bool kaksi = !kauko && g[i + 1] > 0.62f;
                    if (kaksi)
                    {
                        r.NelioUlos(Kylki(g[i], 0f, p), Kylki(g[i + 1], 0f, p), Kylki(g[i + 1], 0.5f, p), Kylki(g[i], 0.5f, p), ulos, RunkoVari);
                        r.NelioUlos(Kylki(g[i], 0.5f, p), Kylki(g[i + 1], 0.5f, p), Kylki(g[i + 1], 1f, p), Kylki(g[i], 1f, p), ulos, RunkoVari);
                    }
                    else r.NelioUlos(Kylki(g[i], 0f, p), Kylki(g[i + 1], 0f, p), Kylki(g[i + 1], 1f, p), Kylki(g[i], 1f, p), ulos, RunkoVari);
                }
            }
            // Peräpeili (hieman kalteva) ja autokansiovi vaaleampana paneelina.
            r.NelioUlos(Kylki(0f, 0f, -1f), Kylki(0f, 0f, 1f), Kylki(0f, 1f, 1f), Kylki(0f, 1f, -1f), Vector3.back, RunkoVari);
            {
                float yk = Kansi(ZPera);
                Vector3 Ovi(float x, float y) => new Vector3(x, y, Mathf.Lerp(ZvPera, ZPera, y / yk) - 0.00022f);
                r.NelioUlos(Ovi(-0.0068f, 0.0024f), Ovi(0.0068f, 0.0024f), Ovi(0.0068f, 0.0097f), Ovi(-0.0068f, 0.0097f), Vector3.back, Peraovi);
            }
            // Keulakansi ja peräkansi parrasvarustuksineen; välissä vaalea reunalista kannen reunassa T1:n seinän alle
            // (kaiverrettu kansilinja, ja rungon ja kansirakennuksen väliin ei jää rakoa).
            for (int i = 0; i + 1 < g.Length; i++)
            {
                if (g[i] >= GKeulakansi - 1e-4f || g[i + 1] <= GPerakansi + 1e-4f) Parras(r, g[i], g[i + 1], kauko);
                else
                    for (int k = 0; k < 2; k++)
                    {
                        float p = k == 0 ? 1f : -1f;
                        Vector3 k0 = Kylki(g[i], 1f, p), k1 = Kylki(g[i + 1], 1f, p), sisaan = new Vector3(-p * 0.0012f, 0f, 0f);
                        r.NelioUlos(k0, k1, k1 + sisaan, k0 + sisaan, Vector3.up, KaideYla);
                    }
            }
            // Peräkaide peräpeilin yläreunaan (ulko, reunalista, sisä).
            {
                Vector3 a = Kylki(0f, 1f, -1f), b = Kylki(0f, 1f, 1f), yl = new Vector3(0f, Kaide, 0f), sis = new Vector3(0f, 0f, 0.0006f);
                r.NelioUlos(a, b, b + yl, a + yl, Vector3.back, RunkoVari);
                r.NelioUlos(a + yl, b + yl, b + yl + sis, a + yl + sis, Vector3.up, KaideYla);
                if (!kauko) r.NelioUlos(a + sis, b + sis, b + yl + sis, a + yl + sis, Vector3.forward, KaideSisa);
            }
            if (!kauko)
            {
                // Keulavisiirin sauma: keulavarresta vinosti taakse ja ylös kannen reunaan (vaalea viiva tummassa kyljessä).
                for (int k = 0; k < 2; k++)
                {
                    float p = k == 0 ? 1f : -1f;
                    var o = new Vector3(p * 0.00035f, 0f, 0f);
                    Vector3 a = Kylki(1f, 0.46f, p) + new Vector3(0f, 0f, 0.0004f), b = Kylki(0.955f, 0.74f, p) + o, c = Kylki(0.905f, 0.985f, p) + o;
                    r.Tanko(a, b, 0.0008f, 0.0008f, 3, Visiiri, false);
                    r.Tanko(b, c, 0.0008f, 0.0008f, 3, Visiiri, false);
                }
                // Aallonmurtaja keulakannella: matala V-seinä.
                float zm = 0.058f, zk = 0.0645f, xm = Puolileveys(zm) - 0.0012f, ym = Kansi(zm), hk = 0.0016f;
                Vector3 v0 = new Vector3(-xm, ym, zm), v1 = new Vector3(0f, Kansi(zk), zk), v2 = new Vector3(xm, ym, zm), h = new Vector3(0f, hk, 0f);
                r.Kalvo(v0, v1, v1 + h, v0 + h, Aallonmurtaja);
                r.Kalvo(v1, v2, v2 + h, v1 + h, Aallonmurtaja);
                // Kiinnitysvinssit aallonmurtajan edessä.
                for (int k = 0; k < 2; k++)
                    r.Laatikko(new Vector3((k == 0 ? 1f : -1f) * 0.0036f, Kansi(0.0712f), 0.0712f), new Vector3(0.0024f, 0.0013f, 0.0030f), Vinssi, Vinssi);
            }
            r.LopetaOsa();
        }

        /// <summary>Parrasvarustus ja kansi asemien g0…g1 välillä: ulkopinta kyljen jatkona (tumma), vaalea reunalista,
        /// sisäpinta ja kansi (harjattu keskilinjaan).</summary>
        static void Parras(MeriRakentaja r, float g0, float g1, bool kauko)
        {
            var yl = new Vector3(0f, Kaide, 0f);
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var ulos = new Vector3(p, 0f, 0f);
                Vector3 k0 = Kylki(g0, 1f, p), k1 = Kylki(g1, 1f, p);
                float s0 = Mathf.Max(0f, Mathf.Abs(k0.x) - 0.0006f), s1 = Mathf.Max(0f, Mathf.Abs(k1.x) - 0.0006f);
                Vector3 i0 = new Vector3(p * s0, k0.y, k0.z), i1 = new Vector3(p * s1, k1.y, k1.z);
                r.NelioUlos(k0, k1, k1 + yl, k0 + yl, ulos, RunkoVari);
                r.NelioUlos(k0 + yl, k1 + yl, i1 + yl, i0 + yl, Vector3.up, KaideYla);
                if (!kauko) r.NelioUlos(i0, i1, i1 + yl, i0 + yl, -ulos, KaideSisa);
            }
            Vector3 a0 = Kylki(g0, 1f, 1f), a1 = Kylki(g1, 1f, 1f);
            float t0 = Mathf.Max(0f, a0.x - 0.0006f), t1 = Mathf.Max(0f, a1.x - 0.0006f);
            Vector3 o0 = new Vector3(t0, a0.y, a0.z), o1 = new Vector3(t1, a1.y, a1.z), v0 = new Vector3(-t0, a0.y, a0.z), v1 = new Vector3(-t1, a1.y, a1.z);
            Vector3 m0 = new Vector3(0f, a0.y + 0.0003f, a0.z), m1 = new Vector3(0f, a1.y + 0.0003f, a1.z);
            r.NelioUlos(v0, m0, m1, v1, Vector3.up, KansiVari);
            r.NelioUlos(m0, o0, o1, m1, Vector3.up, KansiVari);
        }

        // ---- Kansirakennukset ----

        /// <summary>Kerroksen puolileveys kohdassa z: enintään w ja rungon ääriviivan sisällä (sisennys).</summary>
        static float KerrosLeveys(float z, float w, float sisennys) => Mathf.Min(w, Puolileveys(z) - sisennys);

        /// <summary>
        /// Kerroksen pohja vastapäivään ylhäältä: peränurkat zA:ssa, kyljet rungon ääriviivaa pitkin ja keulassa elliptinen
        /// kaari kärkeen zF. Sivun tyyppi (sivu i → i + 1): 0 kylki, 1 keula, 2 perä.
        /// </summary>
        static void Pohja(float zA, float zF, float w, float kaari, float sisennys, int jaot, List<Vector2> p, List<int> tp)
        {
            p.Clear(); tp.Clear();
            float zS = zF - kaari;
            var zt = new List<float> { zA };
            foreach (float z in new[] { ZPeraOlka, ZOlka })
                if (z > zA + 0.002f && z < zS - 0.002f) zt.Add(z);
            zt.Add(zS);
            float xs = KerrosLeveys(zS, w, sisennys);
            for (int i = 0; i < zt.Count; i++) { p.Add(new Vector2(KerrosLeveys(zt[i], w, sisennys), zt[i])); tp.Add(i + 1 < zt.Count ? 0 : 1); }
            for (int i = 1; i <= jaot; i++)
            {
                float a = 0.5f * Mathf.PI * i / jaot;
                p.Add(new Vector2(xs * Mathf.Cos(a), zS + kaari * Mathf.Sin(a))); tp.Add(1);
            }
            for (int i = jaot - 1; i >= 1; i--)
            {
                float a = 0.5f * Mathf.PI * i / jaot;
                p.Add(new Vector2(-xs * Mathf.Cos(a), zS + kaari * Mathf.Sin(a))); tp.Add(1);
            }
            for (int i = zt.Count - 1; i >= 0; i--) { p.Add(new Vector2(-KerrosLeveys(zt[i], w, sisennys), zt[i])); tp.Add(i > 0 ? 0 : 2); }
        }

        /// <summary>Suorakulmainen pohja x ±w, z0…z1 vastapäivään; sivujen tyypit (oikea kylki, keula, vasen kylki, perä).</summary>
        static void Suorakulmio(float w, float z0, float z1, int oikea, int keula, int vasen, int pera, List<Vector2> p, List<int> tp)
        {
            p.Clear(); tp.Clear();
            p.Add(new Vector2(w, z0)); tp.Add(oikea);
            p.Add(new Vector2(w, z1)); tp.Add(keula);
            p.Add(new Vector2(-w, z1)); tp.Add(vasen);
            p.Add(new Vector2(-w, z0)); tp.Add(pera);
        }

        /// <summary>
        /// Kupera kerros pohjasta: seinät (tyyppi −1 = ei seinää, 3 = seinä ilman ikkunoita), katto viuhkana ja ikkunanauhat
        /// seinän ulkopuolella: kyljissä ja perässä (jos peraKaista) korkeuksilla sa…sb, keulassa ka…kb omalla värillään.
        /// </summary>
        static void Blokki(MeriRakentaja r, List<Vector2> p, List<int> tp, float y0, float y1, Color seina, Color katto,
            float sa, float sb, Color sivuVari, float ka, float kb, Color keulaVari, bool peraKaista)
        {
            int n = p.Count;
            var kp = Vector2.zero;
            for (int i = 0; i < n; i++) kp = kp + p[i];
            kp = kp * (1f / n);
            var keski = new Vector3(kp.x, y1, kp.y);
            for (int i = 0; i < n; i++)
            {
                Vector2 a = p[i], b = p[(i + 1) % n];
                var d = b - a;
                var nrm = new Vector3(d.y, 0f, -d.x).normalized;
                Vector3 a0 = new Vector3(a.x, y0, a.y), b0 = new Vector3(b.x, y0, b.y), a1 = new Vector3(a.x, y1, a.y), b1 = new Vector3(b.x, y1, b.y);
                if (tp[i] >= 0) r.NelioUlos(a0, b0, b1, a1, nrm, seina);
                r.KolmioUlos(keski, a1, b1, Vector3.up, katto);
                float c0 = 0f, c1 = 0f; var cv = seina;
                if (tp[i] == 0 || (tp[i] == 2 && peraKaista)) { c0 = sa; c1 = sb; cv = sivuVari; }
                else if (tp[i] == 1) { c0 = ka; c1 = kb; cv = keulaVari; }
                if (c1 > c0)
                {
                    var o = nrm * 0.00018f;
                    float h0 = Mathf.Lerp(y0, y1, c0), h1 = Mathf.Lerp(y0, y1, c1);
                    r.NelioUlos(new Vector3(a.x, h0, a.y) + o, new Vector3(b.x, h0, b.y) + o, new Vector3(b.x, h1, b.y) + o, new Vector3(a.x, h1, a.y) + o, nrm, cv);
                }
            }
        }

        /// <summary>Kaide: vaalea kolmisivuinen tanko (säde 0,0008 ≈ 0,45 pt) kannen reunan yllä, osa kerroksen ääriviivaa.</summary>
        static void KaideViiva(MeriRakentaja r, Vector3 a, Vector3 b) => r.Tanko(a, b, 0.0008f, 0.0008f, 3, KaideVari, false);

        /// <summary>
        /// Kansirakennukset neljänä kerroksena, kukin omana osanaan (oma ääriviiva): T1 rungon levyinen hyttikerros
        /// autokannen yllä, T2 salongit (keskellä syvennys pelastusveneille, sivukäytävä T1:n katolla), T3 komentosilta
        /// siltasiipineen ja tummalla ikkunanauhalla, T4 tutkakansi. Perässä terassit porrastuvat alas, keulassa kerrokset
        /// kaartuvat ja porrastuvat taakse.
        /// </summary>
        static void Kerrokset(MeriRakentaja r, bool kauko)
        {
            int jaot = kauko ? 2 : 3;
            var p = new List<Vector2>(); var tp = new List<int>();
            const float sa = 0.28f, sb = 0.76f;

            // T1: hyttikerros rungon reunaan asti; perässä kaide terassin reunalla, kyljissä kaide sivukäytävällä.
            r.AloitaOsa();
            Pohja(ZT1a, ZT1k, Leveys, 0.009f, 0.0003f, jaot, p, tp);
            Blokki(r, p, tp, YKansi - 0.0004f, Y1, Seina, Katto1, sa, sb, Ikkuna, sa, sb, Ikkuna, true);
            if (!kauko)
            {
                float w = KerrosLeveys(ZT1a, Leveys, 0.0003f) - 0.0005f, y = Y1 + 0.0011f;
                KaideViiva(r, new Vector3(-w, y, ZT1a + 0.0005f), new Vector3(w, y, ZT1a + 0.0005f));
                for (int k = 0; k < 2; k++)
                {
                    float x = (k == 0 ? 1f : -1f) * (Leveys - 0.0009f);
                    KaideViiva(r, new Vector3(x, y, ZLovi0), new Vector3(x, y, ZLovi1));
                }
            }
            r.LopetaOsa();

            // T2: kolme lohkoa (keula, syvennys, perä), jotta syvennys jää katon alle.
            r.AloitaOsa();
            Pohja(ZLovi1, ZT2k, 0.0142f, 0.008f, 0.0006f, jaot, p, tp);
            tp[tp.Count - 1] = 3;
            Blokki(r, p, tp, Y1 - 0.0002f, Y2, Seina, Katto2, sa, sb, Ikkuna, sa, sb, Ikkuna, false);
            Suorakulmio(XLovi, ZLovi0, ZLovi1, 0, -1, 0, -1, p, tp);
            Blokki(r, p, tp, Y1 - 0.0002f, Y2, SeinaLovi, Katto2, sa, sb, Ikkuna, 0f, 0f, Ikkuna, false);
            Suorakulmio(0.0142f, ZT2a, ZLovi0, 0, 3, 0, 2, p, tp);
            Blokki(r, p, tp, Y1 - 0.0002f, Y2, Seina, Katto2, sa, sb, Ikkuna, 0f, 0f, Ikkuna, true);
            if (!kauko)
            {
                float y = Y2 + 0.0011f, x2 = 0.0137f;
                KaideViiva(r, new Vector3(-x2, y, ZT2a + 0.0005f), new Vector3(x2, y, ZT2a + 0.0005f));
                for (int k = 0; k < 2; k++)
                {
                    float x = (k == 0 ? 1f : -1f) * x2;
                    KaideViiva(r, new Vector3(x, y, ZT2a + 0.0005f), new Vector3(x, y, ZLovi0));
                    KaideViiva(r, new Vector3(x, y, ZLovi1), new Vector3(x, y, 0.038f));
                }
            }
            r.LopetaOsa();

            // T3: komentosilta; keulakaaressa tumma korkea ikkunanauha, siltasiivet koko leveydeltä.
            r.AloitaOsa();
            Pohja(ZT3a, ZT3k, 0.0132f, 0.007f, 0.0012f, jaot, p, tp);
            Blokki(r, p, tp, Y2 - 0.0002f, Y3, Seina, Katto3, sa, sb, Ikkuna, 0.20f, 0.90f, SiltaLasi, true);
            if (!kauko)
            {
                // Aurinkokannen kaiteet: perä ja kyljet T4:n takana.
                float y = Y3 + 0.0011f, w = 0.0132f - 0.0005f;
                KaideViiva(r, new Vector3(-w, y, ZT3a + 0.0005f), new Vector3(w, y, ZT3a + 0.0005f));
                for (int k = 0; k < 2; k++)
                {
                    float x = (k == 0 ? 1f : -1f) * w;
                    KaideViiva(r, new Vector3(x, y, ZT3a + 0.0005f), new Vector3(x, y, ZT4a));
                }
            }
            r.LopetaOsa();
            // Siltasiivet omana osanaan (ulottuvat kyljen yli, ääriviiva kehystää T-muodon ylhäältä).
            r.AloitaOsa();
            {
                const float zs = 0.0352f, sz = 0.0048f, xs = 0.0166f, ys0 = Y3 - 0.0040f;
                r.Laatikko(new Vector3(0f, ys0, zs), new Vector3(2f * xs, Y3 - ys0, sz), Seina, Katto3);
                // Siipien etuikkunat (keskiosa jää T3:n sisään).
                float zf = zs + 0.5f * sz + 0.00018f, h0 = ys0 + 0.0009f, h1 = Y3 - 0.0007f;
                for (int k = 0; k < 2; k++)
                {
                    float q = k == 0 ? 1f : -1f;
                    r.NelioUlos(new Vector3(q * 0.0105f, h0, zf), new Vector3(q * xs, h0, zf), new Vector3(q * xs, h1, zf), new Vector3(q * 0.0105f, h1, zf), Vector3.forward, SiltaLasi);
                }
            }
            r.LopetaOsa();

            // T4: tutkakansi sillan takana.
            r.AloitaOsa();
            Pohja(ZT4a, ZT4k, 0.0085f, 0.006f, 0f, jaot, p, tp);
            Blokki(r, p, tp, Y3 - 0.0002f, Y4, Seina, Katto4, 0.30f, 0.74f, Ikkuna, 0.30f, 0.74f, Ikkuna, false);
            r.LopetaOsa();
        }

        /// <summary>Pelastusveneet (3 kummallakin kyljellä) T2:n syvennyksessä T3:n räystään alla, taaveteissa.</summary>
        static void Pelastusveneet(MeriRakentaja r, bool kauko)
        {
            foreach (float zb in new[] { -0.0215f, -0.0065f, 0.0085f })
                for (int k = 0; k < 2; k++) VeneTaaveteissa(r, k == 0 ? 1f : -1f, zb, kauko);
        }

        /// <summary>Umpipelastusvene: kuusikulmainen pohja (terävät päät), vaaleat kyljet ja kupera kate; taavetit
        /// syvennyksen seinältä veneen päälle.</summary>
        static void VeneTaaveteissa(MeriRakentaja r, float p, float zb, bool kauko)
        {
            const float L = 0.0058f, B = 0.0016f, ya = Y1 + 0.0014f, yy = Y1 + 0.0038f;
            float xc = p * XVene;
            var pts = new[] { new Vector2(xc + B, zb - 0.62f * L), new Vector2(xc + B, zb + 0.62f * L), new Vector2(xc, zb + L),
                new Vector2(xc - B, zb + 0.62f * L), new Vector2(xc - B, zb - 0.62f * L), new Vector2(xc, zb - L) };
            var huippu = new Vector3(xc, yy + 0.0007f, zb);
            r.AloitaOsa();
            for (int i = 0; i < 6; i++)
            {
                Vector2 a = pts[i], b = pts[(i + 1) % 6];
                var d = b - a;
                var nrm = new Vector3(d.y, 0f, -d.x).normalized;
                Vector3 a0 = new Vector3(a.x, ya, a.y), b0 = new Vector3(b.x, ya, b.y), a1 = new Vector3(a.x, yy, a.y), b1 = new Vector3(b.x, yy, b.y);
                r.NelioUlos(a0, b0, b1, a1, nrm, Vene);
                r.KolmioUlos(huippu, a1, b1, Vector3.up, VeneKatto);
            }
            r.LopetaOsa();
            if (kauko) return;
            foreach (float dz in new[] { -0.0036f, 0.0036f })
            {
                var tyvi = new Vector3(p * (XLovi + 0.0004f), Y1 + 0.0004f, zb + dz);
                var karki = new Vector3(xc + p * 0.0008f, yy + 0.0012f, zb + dz);
                r.Tanko(tyvi, karki, 0.0008f, 0.0008f, 3, Taavetti, false);
            }
        }

        // ---- Savupiippu ja masto ----

        /// <summary>Piipun akselin piste korkeudella y (kallistus taaksepäin).</summary>
        static Vector3 PiippuKeski(float y)
        {
            float kal = Mathf.Sin(PiippuKallistus * Mathf.Deg2Rad) / Mathf.Cos(PiippuKallistus * Mathf.Deg2Rad);
            return new Vector3(0f, y, ZPiippu - (y - Y3) * kal);
        }

        /// <summary>Piipun poikkileikkauksen mittakaava korkeudella y (kapenee ylöspäin 8 %).</summary>
        static float Kapenee(float y) => 1f - 0.08f * Mathf.Clamp01((y - Y3) / (YPiippuYla - Y3));

        /// <summary>Savun lähtöpiste (piipun suu) ja sumutorven pää roottorin avaruudessa (laskettu kerran).</summary>
        static readonly Vector3 PiipunSuu = PiippuKeski(YPiippuYla + 0.0010f);
        static readonly Vector3 MastonTyvi = new Vector3(0f, Y4 - 0.0002f, ZMasto), MastonHuippu = new Vector3(0f, YMastoYla, ZMasto - 0.0018f);
        static Vector3 MastoPiste(float y) => Vector3.Lerp(MastonTyvi, MastonHuippu, (y - MastonTyvi.y) / (MastonHuippu.y - MastonTyvi.y));
        static readonly Vector3 TorvenPaa = MastoPiste(0.0468f) + new Vector3(0f, 0.0004f, 0.0024f);

        /// <summary>
        /// Savupiippu omana osanaan (oma ääriviiva): soikea (0,012 × 0,0074), kalteva 10° taakse, vaalea runko, leveä punainen
        /// raita (ainoa korostus), ohut vaalea väli ja musta hattu; suu tummana ylhäältä. Edessä sumutorvi.
        /// </summary>
        static void Piippu(MeriRakentaja r, bool kauko)
        {
            int n = kauko ? 8 : 10;
            float[] ys = { Y3 - 0.0003f, 0.0393f, 0.0455f, 0.0467f, YPiippuYla };
            var cs = new[] { PiippuVari, MeriRakentaja.Punainen, PiippuVari, PiippuHattu };
            r.AloitaOsa();
            for (int j = 0; j + 1 < ys.Length; j++)
            {
                Vector3 c0 = PiippuKeski(ys[j]), c1 = PiippuKeski(ys[j + 1]);
                float s0 = Kapenee(ys[j]), s1 = Kapenee(ys[j + 1]);
                for (int i = 0; i < n; i++)
                {
                    float a0 = 2f * Mathf.PI * i / n, a1 = 2f * Mathf.PI * (i + 1) / n, am = 0.5f * (a0 + a1);
                    Vector3 d0 = new Vector3(PiippuB * Mathf.Sin(a0), 0f, PiippuA * Mathf.Cos(a0)), d1 = new Vector3(PiippuB * Mathf.Sin(a1), 0f, PiippuA * Mathf.Cos(a1));
                    var ulos = new Vector3(Mathf.Sin(am) / PiippuB, 0f, Mathf.Cos(am) / PiippuA);
                    r.NelioUlos(c0 + d0 * s0, c0 + d1 * s0, c1 + d1 * s1, c1 + d0 * s1, ulos, cs[j]);
                }
            }
            var ct = PiippuKeski(YPiippuYla);
            float st = Kapenee(YPiippuYla);
            for (int i = 0; i < n; i++)
            {
                float a0 = 2f * Mathf.PI * i / n, a1 = 2f * Mathf.PI * (i + 1) / n;
                Vector3 d0 = new Vector3(PiippuB * Mathf.Sin(a0), 0f, PiippuA * Mathf.Cos(a0)), d1 = new Vector3(PiippuB * Mathf.Sin(a1), 0f, PiippuA * Mathf.Cos(a1));
                r.KolmioUlos(ct + new Vector3(0f, -0.0004f, 0f), ct + d0 * st, ct + d1 * st, Vector3.up, PiippuSuu);
            }
            r.LopetaOsa();
            // Piipun juurella matala kotelo aurinkokannella.
            r.Laatikko(new Vector3(0f, Y3 - 0.0002f, ZPiippu - 0.0012f), new Vector3(0.0104f, 0.0022f, 0.0168f), Seina, Katto2);
        }

        /// <summary>Masto tutkakannella: kalteva tanko, raakapuu kahtena puolikkaana (ei ääriviivaa), vinoon kääntynyt
        /// tutka-antenni ja sumutorvi maston etupuolella (höyrypallot lähtevät sen päästä harvinaisessa tervehdyksessä).</summary>
        static void Masto(MeriRakentaja r, bool kauko)
        {
            r.Tanko(MastonTyvi, MastonHuippu, 0.0010f, 0.0008f, 4, MastoVari, true);
            var raaka = MastoPiste(0.0497f);
            if (!kauko)
            {
                r.Tanko(raaka + new Vector3(-0.0050f, 0f, 0f), raaka, 0.0008f, 0.0008f, 3, MastoVari, false);
                r.Tanko(raaka, raaka + new Vector3(0.0050f, 0f, 0f), 0.0008f, 0.0008f, 3, MastoVari, false);
                r.Tanko(MastoPiste(0.0468f) + new Vector3(0f, 0f, 0.0008f), TorvenPaa, 0.0008f, 0.0010f, 3, Pilli, false);
            }
            KiertoLaatikko(r, MastoPiste(0.0432f) + new Vector3(0f, 0f, 0.0017f), 0.0074f, 0.0008f, 0.0011f, 32f, Tutka);
        }

        /// <summary>Pystyakselin ympäri kulmaan a (°) kääntynyt laatikko: pohjan keskipiste p, leveys lx, korkeus ly, syvyys lz;
        /// sivut ja katto.</summary>
        static void KiertoLaatikko(MeriRakentaja r, Vector3 p, float lx, float ly, float lz, float a, Color vari)
        {
            float c = Mathf.Cos(a * Mathf.Deg2Rad), s = Mathf.Sin(a * Mathf.Deg2Rad);
            var ex = new Vector3(c, 0f, -s) * (0.5f * lx); var ez = new Vector3(s, 0f, c) * (0.5f * lz); var h = new Vector3(0f, ly, 0f);
            Vector3 a0 = p - ex - ez, b0 = p + ex - ez, c0 = p + ex + ez, d0 = p - ex + ez;
            r.AloitaOsa();
            r.NelioUlos(a0, b0, b0 + h, a0 + h, -ez, vari);
            r.NelioUlos(b0, c0, c0 + h, b0 + h, ex, vari);
            r.NelioUlos(c0, d0, d0 + h, c0 + h, ez, vari);
            r.NelioUlos(d0, a0, a0 + h, d0 + h, -ex, vari);
            r.NelioUlos(a0 + h, b0 + h, c0 + h, d0 + h, Vector3.up, vari);
            r.LopetaOsa();
        }

        // ---- Lapset: savupallo ja vanavesi ----

        /// <summary>
        /// Savu- ja höyrypallo (lapset 1–16): kuhmurainen pallo (oktaedri kerran jaettuna, 32 tahkoa), yläkupu tummempi
        /// (ramppi 1,35) ja alapuoli vaalea (1,9). Animoi kääntää kuvun ylös tummalle pakokaasulle ja alas vaalealle
        /// savulle ja sumutorven höyrylle. Ei ääriviivaa (pieni osa, raja 1).
        /// </summary>
        public static Mesh Lapsi2()
        {
            var r = new MeriRakentaja(1f);
            var k = new[] { Vector3.up, Vector3.forward, Vector3.right, Vector3.back, Vector3.left, -Vector3.up };
            for (int i = 0; i < 4; i++)
            {
                var s0 = k[1 + i]; var s1 = k[1 + (i + 1) % 4];
                SavuTahko(r, k[0], s1, s0); SavuTahko(r, k[5], s0, s1);
            }
            return r.Verkko("lautta-savu");
        }

        static void SavuTahko(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d)
        {
            Vector3 ab = (a + b).normalized, bd = (b + d).normalized, da = (d + a).normalized;
            SavuKolmio(r, a, ab, da); SavuKolmio(r, ab, b, bd); SavuKolmio(r, da, bd, d); SavuKolmio(r, ab, bd, da);
        }

        /// <summary>Kärjen paikka: suunta × säde, jota kuhmu muuttaa suunnan mukaan (sama suunta → sama kärki, ei rakoja).</summary>
        static Vector3 Kuhmu(Vector3 s)
        {
            float k = 1f + 0.07f * Mathf.Sin(7.3f * s.x + 3.1f * s.y + 0.7f) * Mathf.Cos(5.7f * s.z - 2.3f * s.y) + 0.03f * Mathf.Sin(11f * s.z + 4f * s.x);
            return s * (RSavu * k);
        }

        static void SavuKolmio(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d)
        {
            var keski = (a + b + d).normalized;
            float kupu = Mathf.SmoothStep(0f, 1f, (keski.y + 0.25f) / 0.8f);
            r.KolmioUlos(Kuhmu(a), Kuhmu(b), Kuhmu(d), keski, Rampi(Mathf.Lerp(SavuVaalea, SavuTumma, kupu)));
        }

        /// <summary>
        /// Vanavesi (lapset 17–18, vesikerros, pysyy vaakasuorassa ja hengittää leveydeltään): pehmeä varjo, vesirajan
        /// vaahto, Kelvinin kiila (±19,5°) sulkaharjoineen ja poikittaiset aallot, potkurivirta kahtena kirkkaana virtana,
        /// jotka yhtyvät leveäksi pitkäksi vanaksi (pyörteitä), perän kuohu ja keulakuohu viiksineen. Kolmiot osoittavat ylös
        /// ja on järjestetty alimmasta ylimpään (vesi kirjoittaa syvyyden).
        /// </summary>
        public static Mesh Lapsi3()
        {
            var r = new MeriRakentaja();
            r.Vesi = true;
            var vaahto = MeriRakentaja.Vaahto;
            // 1. Varjo rungon alla (keskellä: Animoi ei tiedä maailman ilmansuuntia).
            r.Soikio(new Vector3(0f, 0.0002f, -0.002f), 0.0215f, 0.095f, MeriRakentaja.VarjoVari, 0.16f, 0f, 18);
            // 2. Vesirajan vaahto kylkiä pitkin (kirkkaampi keulassa).
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                Juova(r, q => Kylki(Mathf.Lerp(0.955f, 0.01f, q), 0f, p) + new Vector3(p * 0.0010f, 0.0006f, 0f),
                    q => Mathf.Lerp(0.0030f, 0.0020f, q), q => Mathf.Lerp(0.62f, 0.24f, q), vaahto, 7);
            }
            // 3. Kelvinin kiila: haarat keulan olkapäiltä ±19,5° ja ulkoreunan sulkaharjat.
            float kiila = 19.5f * Mathf.Deg2Rad;
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                var alku = new Vector3(p * 0.0075f, 0.0009f, 0.058f);
                var suunta = new Vector3(p * Mathf.Sin(kiila), 0f, -Mathf.Cos(kiila));
                Juova(r, q => alku + suunta * (0.050f + 0.24f * q), q => Mathf.Lerp(0.0023f, 0.0042f, q),
                    q => 0.55f * Mathf.Clamp01(0.3f + 5f * q) * Mathf.Pow(1f - q, 1.25f), vaahto, 8);
                float h = (19.5f + 33f) * Mathf.Deg2Rad;
                var harja = new Vector3(p * Mathf.Sin(h), 0f, -Mathf.Cos(h));
                const int harjoja = 5;
                for (int i = 0; i < harjoja; i++)
                {
                    float q = (i + 0.6f) / (harjoja + 0.4f);
                    var kanta = alku + suunta * (0.050f + 0.24f * q) + new Vector3(0f, 0.0001f, 0f);
                    float pit = 0.008f + 0.009f * q, alfa = 0.4f * Mathf.Pow(1f - q, 1.2f);
                    Juova(r, t => kanta + harja * (pit * t), t => 0.0024f * (1f - 0.6f * t), t => alfa * (1f - t), vaahto, 1);
                }
            }
            // 4. Poikittaiset aallot kiilan sisällä perän takana.
            for (int i = 0; i < 2; i++)
            {
                float z = -0.105f - 0.038f * i, lev = 0.55f * (0.0075f + (0.058f - z) * Mathf.Sin(kiila) / Mathf.Cos(kiila)), alfa = 0.26f - 0.09f * i;
                Juova(r, q => { float x = Mathf.Lerp(-lev, lev, q); return new Vector3(x, 0.0010f, z + 0.3f * x * x / lev); },
                    q => 0.0022f, q => alfa * Mathf.Sin(Mathf.PI * q), vaahto, 6);
            }
            // 5. Potkurivirta: kaksi kirkasta virtaa peräpeilistä, jotka yhtyvät leveäksi vanaksi, ja pyörteitä.
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f;
                Juova(r, q => new Vector3(p * (0.0058f - 0.0046f * q), 0.0011f, -0.0812f - 0.050f * q), q => Mathf.Lerp(0.0075f, 0.013f, q),
                    q => Mathf.Lerp(0.72f, 0.45f, q), vaahto, 3);
            }
            Juova(r, q => new Vector3(0.0025f * Mathf.Sin(9f * q) * q, 0.00115f, -0.118f - 0.20f * q), q => Mathf.Lerp(0.019f, 0.05f, q),
                q => 0.42f * Mathf.Pow(1f - q, 1.5f), vaahto, 7);
            foreach (var (x, z, a) in new[] { (0.0045f, -0.152f, 0.34f), (-0.0035f, -0.192f, 0.28f), (0.0040f, -0.238f, 0.2f) })
                r.Soikio(new Vector3(x, 0.0012f, z), 0.0065f, 0.0095f, vaahto, a, 0f, 6);
            // 6. Perän kuohu peräpeilin takana.
            r.Soikio(new Vector3(0f, 0.0013f, -0.0875f), 0.0125f, 0.0085f, vaahto, 0.88f, 0.25f, 10);
            // 7. Keulakuohu: sirppi keulavarren ympärillä ja viikset kyljille.
            const int n = 6;
            var kk = new Vector3(0f, 0.0012f, 0.0768f);
            for (int i = 0; i < n; i++)
            {
                float a0 = Mathf.Lerp(-1.75f, 1.75f, i / (float)n), a1 = Mathf.Lerp(-1.75f, 1.75f, (i + 1) / (float)n);
                Vector3 s0 = kk + new Vector3(Mathf.Sin(a0) * 0.0040f, 0f, Mathf.Cos(a0) * 0.0072f), s1 = kk + new Vector3(Mathf.Sin(a1) * 0.0040f, 0f, Mathf.Cos(a1) * 0.0072f);
                Vector3 u0 = kk + new Vector3(Mathf.Sin(a0) * 0.0080f, 0f, Mathf.Cos(a0) * 0.0122f), u1 = kk + new Vector3(Mathf.Sin(a1) * 0.0080f, 0f, Mathf.Cos(a1) * 0.0122f);
                float r0 = 0.82f - 0.25f * Mathf.Abs(a0) / 1.75f, r1 = 0.82f - 0.25f * Mathf.Abs(a1) / 1.75f;
                NelioVesi(r, s0, s1, u1, u0, MeriRakentaja.Alfa(vaahto, r0), MeriRakentaja.Alfa(vaahto, r1), MeriRakentaja.Alfa(vaahto, 0f), MeriRakentaja.Alfa(vaahto, 0f));
            }
            for (int k = 0; k < 2; k++)
            {
                float p = k == 0 ? 1f : -1f, a = 36f * Mathf.Deg2Rad;
                var alku = new Vector3(p * 0.0052f, 0.0012f, 0.0725f);
                var suunta = new Vector3(p * Mathf.Sin(a), 0f, -Mathf.Cos(a));
                Juova(r, q => alku + suunta * (0.045f * q), q => Mathf.Lerp(0.0028f, 0.0062f, q), q => Mathf.Lerp(0.74f, 0f, q), vaahto, 3);
            }
            r.Vesi = false;
            return r.Verkko("lautta-vanavesi");
        }

        /// <summary>Vesikerroksen nauha käyrää pitkin: keskilinja, leveys ja alfa parametrin q ∈ [0, 1] funktioina.</summary>
        static void Juova(MeriRakentaja r, System.Func<float, Vector3> kaari, System.Func<float, float> leveys, System.Func<float, float> alfa, Color vari, int jaot)
        {
            for (int i = 0; i < jaot; i++)
            {
                float q0 = i / (float)jaot, q1 = (i + 1) / (float)jaot;
                Vector3 p0 = kaari(q0), p1 = kaari(q1);
                Vector3 s0 = Sivu(kaari, q0) * (0.5f * leveys(q0)), s1 = Sivu(kaari, q1) * (0.5f * leveys(q1));
                Color c0 = MeriRakentaja.Alfa(vari, alfa(q0)), c1 = MeriRakentaja.Alfa(vari, alfa(q1));
                NelioVesi(r, p0 - s0, p0 + s0, p1 + s1, p1 - s1, c0, c0, c1, c1);
            }
        }

        /// <summary>Käyrän vaakasuora sivuvektori (yksikkö) kohdassa q.</summary>
        static Vector3 Sivu(System.Func<float, Vector3> kaari, float q)
        {
            var t = kaari(Mathf.Min(1f, q + 0.01f)) - kaari(Mathf.Max(0f, q - 0.01f));
            t.y = 0f;
            return Vector3.Cross(Vector3.up, t).normalized;
        }

        /// <summary>Vesinelikulmio, jonka kolmiot osoittavat aina ylös (järjestys käännetään tarvittaessa).</summary>
        static void NelioVesi(MeriRakentaja r, Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color ca, Color cb, Color cd, Color ce)
        {
            if (Vector3.Cross(b - a, d - a).y + Vector3.Cross(d - a, e - a).y >= 0f) r.NelioVarit(a, b, d, e, ca, cb, cd, ce);
            else r.NelioVarit(a, e, d, b, ca, ce, cd, cb);
        }

        // ---- Näytös ----

        public static float Nakyy(float t)
        {
            var (_, s, pituus) = Aikataulu.Kohta(t);
            return s < 0f ? 0f : Pehmea(s / 2.5f) * Pehmea((pituus - s) / 2.5f);
        }

        /// <summary>Keinunta (kallistus ja nyökkäys) siemenestä: kaksi taajuutta kummassakin, lautalle ja toiselle omat
        /// vaiheet, jaksot ja voimakkuudet; lisä = ohituksen vana-aallon kallistus.</summary>
        static Quaternion Keinunta(int n, float s, int kumpi, float lisa)
        {
            int k = 20 + 6 * kumpi;
            float vaihe = Aikataulu.Arvo(n, k) * 20f;
            float kJakso = 6.5f + 3f * Aikataulu.Arvo(n, k + 1), nJakso = 4.2f + 1.8f * Aikataulu.Arvo(n, k + 2);
            float kAmp = 0.5f + 0.5f * Aikataulu.Arvo(n, k + 3), nAmp = 0.22f + 0.2f * Aikataulu.Arvo(n, k + 4);
            float kk = (s + vaihe) * 2f * Mathf.PI / kJakso, nk = (s + vaihe) * 2f * Mathf.PI / nJakso;
            float kallistus = kAmp * (Mathf.Sin(kk) + 0.3f * Mathf.Sin(1.87f * kk + 1.3f)) + lisa;
            float nyokkays = nAmp * (Mathf.Sin(nk) + 0.25f * Mathf.Sin(2.3f * nk + 0.4f));
            return Quaternion.Euler(nyokkays, 0f, kallistus);
        }

        /// <summary>Toisen lautan vana-aalto osuu (dt s osumasta): vaimeneva kallistus ±1,6°.</summary>
        static float Aalto(float dt) => dt <= 0f ? 0f : 1.6f * Pehmea(dt / 0.35f) * Mathf.Pow(0.5f, dt / 1.6f) * Mathf.Sin(dt * 2f * Mathf.PI / 2.3f);

        /// <summary>Pakokaasun purkaukset (0–1): kaksi mahdollista kohtaa näytöksessä (kumpikin 60 %), nousu 0,8 s, pito
        /// 1–2,5 s, lasku 2 s (koneen kuorma vaihtuu: tummempaa ja isompaa savua).</summary>
        static float Purkaus(int n, int kumpi, float s, float pituus)
        {
            float p = 0f;
            for (int i = 0; i < 2; i++)
            {
                int k = 60 + 8 * kumpi + 3 * i;
                if (Aikataulu.Arvo(n, k) > 0.6f) continue;
                float alku = pituus * (0.12f + 0.42f * i + 0.3f * Aikataulu.Arvo(n, k + 1));
                float pito = 1f + 1.5f * Aikataulu.Arvo(n, k + 2);
                p = Mathf.Max(p, Pehmea((s - alku) / 0.8f) * (1f - Pehmea((s - alku - 0.8f - pito) / 2f)));
            }
            return p;
        }

        /// <summary>
        /// Lautan näytös: sama reitti kuin vanhalla lautalla (suora kaista rannikon suuntaisesti, z ±0,35, kulma ±2,5°,
        /// x −0,05…−0,095, pohjoiseen tai etelään jaksosta, häivytys 2,5 s). Keinunta siemenestä, savu piipusta (tahti, koko,
        /// tummuus ja tuuli näytöksittäin, purkaukset), vanavesi hengittää. Harvinainen (noin 1/10): sisaralus tulee vastaan
        /// viereistä kaistaa (0,062, kumpikin pitää oikeaa laitaa) omalla keinunnallaan ja savullaan, ohitus keskellä näytöstä;
        /// lautat tervehtivät sumutorvella (lautta ensin, toinen vastaa: valkoinen höyrypallo torvesta) ja keinahtavat
        /// toistensa vana-aallossa. Ei allokaatioita. Nopeus ei vaikuta suoraan (aika kulkee jo yksilön nopeuden mukaan).
        /// </summary>
        public static void Animoi(Transform lautta, Transform[] lapset, float t, float nopeus)
        {
            var (n, s, pituus) = Aikataulu.Kohta(t);
            s = Mathf.Clamp(s, 0f, pituus);
            bool harv = Aikataulu.Harvinainen(n);
            bool pohjoiseen = Aikataulu.Arvo(n, 3) < 0.5f;
            float w = 2f * s / pituus - 1f;
            // Oikeanpuoleinen liikenne: pohjoiseen kulkeva maan puolella (idempänä), etelään kulkeva meren puolella.
            float kaista = harv
                ? (pohjoiseen ? -0.042f - 0.006f * Aikataulu.Arvo(n, 4) : -0.042f - Kaistavali - 0.006f * Aikataulu.Arvo(n, 4))
                : -0.05f - 0.045f * Aikataulu.Arvo(n, 4);
            float kulma = (Aikataulu.Arvo(n, 5) - 0.5f) * 5f * Mathf.Deg2Rad;
            var linja = new Vector3(Mathf.Sin(kulma), 0f, Mathf.Cos(kulma));
            var sivu = new Vector3(Mathf.Cos(kulma), 0f, -Mathf.Sin(kulma));
            float suunta = pohjoiseen ? 1f : -1f;
            var paikka = sivu * kaista + linja * (0.35f * w * suunta);
            var kulku = Quaternion.LookRotation(linja * suunta, Vector3.up);
            // Ohituksen vana-aalto osuu kumpaankin noin 0,086 näytöksestä ohituksen jälkeen (kiila 19,5°, kaista 0,062).
            float osuma = pituus * 0.586f;
            var keinu = Keinunta(n, s, 0, harv ? Aalto(s - osuma) : 0f);
            var rot = kulku * keinu;
            lautta.localPosition = paikka;
            lautta.localRotation = rot;
            lautta.localScale = Vector3.one;
            if (lapset == null || lapset.Length < Lapsia + Lapsia2 + Lapsia3) return;
            var kaanto = Quaternion.Inverse(rot);

            // Tuuli juuren avaruudessa (sama molemmille lautoille), suunta ja voima näytöksittäin; lautan nopeus reitistä.
            float tk = Aikataulu.Arvo(n, 12) * 2f * Mathf.PI, tv = 0.003f + 0.009f * Aikataulu.Arvo(n, 13);
            var tuuli = new Vector3(Mathf.Cos(tk) * tv, 0f, Mathf.Sin(tk) * tv);
            var vauhti = linja * (suunta * 0.7f / pituus);

            Vana(lapset[Lapsia + Lapsia2], Vector3.zero, Quaternion.Inverse(keinu), n, s, 0);
            Savu(lapset, Lapsia, n, s, pituus, 0, kaanto, paikka, paikka, kulku, keinu, tuuli - vauhti);

            var toinen = lapset[0];
            var vanaB = lapset[Lapsia + Lapsia2 + 1];
            if (!harv)
            {
                toinen.localScale = Vector3.zero; vanaB.localScale = Vector3.zero;
                for (int k = 0; k < Savuja + 2 * Torvia; k++) lapset[Lapsia + Savuja + k].localScale = Vector3.zero;
                return;
            }

            // Toinen lautta vastakkaiseen suuntaan viereisellä kaistalla (oikealla puolellaan), ohitus keskellä näytöstä.
            var paikkaB = sivu * (kaista + (pohjoiseen ? -Kaistavali : Kaistavali)) - linja * (0.35f * w * suunta);
            var kulkuB = Quaternion.LookRotation(-linja * suunta, Vector3.up);
            var keinuB = Keinunta(n, s, 1, Aalto(s - osuma - 0.4f));
            // Lapsi on lautan alla: paikka ja asento lautan omassa avaruudessa.
            var lokB = kaanto * (paikkaB - paikka);
            toinen.localPosition = lokB;
            toinen.localRotation = kaanto * (kulkuB * keinuB);
            toinen.localScale = Vector3.one;
            // Toisen vanavesi hieman ylempänä, ettei se jää lautan vanan alle (vesi kirjoittaa syvyyden).
            Vana(vanaB, kaanto * (paikkaB - paikka + new Vector3(0f, 0.0004f, 0f)), kaanto * kulkuB, n, s, 1);
            Savu(lapset, Lapsia + Savuja, n, s, pituus, 1, kaanto, paikka, paikkaB, kulkuB, keinuB, tuuli + vauhti);

            // Tervehdys: lautta soittaa pitkän äänen ennen ohitusta, toinen vastaa.
            float sA = pituus * 0.5f - 3.2f, sB = sA + 2.2f;
            int t0 = Lapsia + 2 * Savuja;
            for (int j = 0; j < Torvia; j++)
            {
                Torvi(lapset[t0 + j], s - sA - 0.55f * j, 1.9f - 0.55f * j, j, kaanto, paikka, paikka, kulku, keinu, tuuli - vauhti);
                Torvi(lapset[t0 + Torvia + j], s - sB - 0.5f * j, 1.5f - 0.5f * j, j, kaanto, paikka, paikkaB, kulkuB, keinuB, tuuli + vauhti);
            }
        }

        /// <summary>Vanavesi lautan alle vaakasuoraan; hengittää leveydeltään ±4 % (pituus ±1,5 %, ettei kuohu irtoa rungosta).</summary>
        static void Vana(Transform vana, Vector3 paikkaLok, Quaternion rotLok, int n, float s, int kumpi)
        {
            float h = Mathf.Sin(s * 2f * Mathf.PI / (4.6f + 2f * Aikataulu.Arvo(n, 70 + kumpi)) + 6.3f * Aikataulu.Arvo(n, 72 + kumpi));
            vana.localPosition = paikkaLok;
            vana.localRotation = rotLok;
            vana.localScale = new Vector3(1f + 0.04f * h, 1f, 1f + 0.015f * h);
        }

        /// <summary>
        /// Pakokaasu (Savuja palloa): uusi pallo tahdin välein, elinikä = pallot × tahti; näytöksittäin tahti, koko ja
        /// tummuus, purkauksissa tummempaa ja isompaa. Pallo lähtee piipun suusta lautan vauhdissa ja jää ilmavirtaan
        /// (suhteellinen tuuli ilma = tuuli − lautan nopeus, juuren avaruudessa): nousee ensin tiheänä ja taipuu sitten.
        /// </summary>
        static void Savu(Transform[] lapset, int alku, int n, float s, float pituus, int kumpi, Quaternion kaanto, Vector3 paikka,
            Vector3 origo, Quaternion kulku, Quaternion keinu, Vector3 ilma)
        {
            int k0 = 40 + 8 * kumpi;
            float tahti = 0.40f + 0.22f * Aikataulu.Arvo(n, k0), ika = Savuja * tahti;
            float koko = 0.8f + 0.35f * Aikataulu.Arvo(n, k0 + 1), tummuus = 0.05f + 0.35f * Aikataulu.Arvo(n, k0 + 2);
            var suu = PiipunSuu;
            var suuNyt = keinu * suu;
            int siemen = 919 + 7 * n + kumpi;
            for (int k = 0; k < Savuja; k++)
            {
                var pallo = lapset[alku + k];
                float x = s / ika + k / (float)Savuja;
                int kierros = (int)x;
                float a = x - kierros, syntyi = s - a * ika;
                int id = kierros * Savuja - k;
                float oma = MeriGeometria.Arpa(siemen, id, 0), oma2 = MeriGeometria.Arpa(siemen, id, 1), oma3 = MeriGeometria.Arpa(siemen, id, 2);
                float purkaus = Purkaus(n, kumpi, syntyi, pituus);
                float aa = Mathf.Clamp01(a * (0.88f + 0.24f * oma3)), b = 1f - aa;
                float tau = aa * ika;
                float ajo = tau * tau / (tau + 0.6f);
                float nousu = (0.010f + 0.005f * oma2) * (1f - b * b * b) * (1f + 0.3f * purkaus) + 0.003f * aa;
                var p = origo + kulku * Vector3.Lerp(suuNyt, suu, Pehmea(a * 3f)) + ilma * ajo
                    + new Vector3(0.005f * (oma - 0.5f) * aa, nousu, 0.005f * (oma2 - 0.5f) * aa);
                pallo.localPosition = kaanto * (p - paikka);
                float sk = koko * (1f + 0.35f * purkaus) * (0.5f + 1.25f * Mathf.Pow(aa, 0.6f)) * (0.8f + 0.4f * oma)
                    * Pehmea(a / 0.06f) * Pehmea((1f - a) / 0.25f);
                pallo.localScale = new Vector3(sk, 0.64f * sk, sk);
                // Tumma kupu ylhäällä tummalla savulla elämän alkupuoliskolla, sitten kupu kääntyy alas ja pallo vaalenee.
                float tumma = Mathf.Clamp01(tummuus + 0.4f * purkaus + 0.2f * (oma2 - 0.5f));
                float kupu = 180f * (1f - tumma * (1f - Pehmea((a - 0.4f) / 0.5f)));
                pallo.localRotation = kaanto * Quaternion.Euler(kupu, 360f * oma2 + 50f * a, 25f * (oma3 - 0.5f));
            }
        }

        /// <summary>Sumutorven höyrypallo: kasvaa torven päässä äänen ajan (kesto), nousee ja jää sitten ilmavirtaan ja
        /// hajoaa 1,8 s:ssa. Vaalea puoli ylös (kupu alas).</summary>
        static void Torvi(Transform pallo, float ts, float kesto, int j, Quaternion kaanto, Vector3 paikka, Vector3 origo, Quaternion kulku,
            Quaternion keinu, Vector3 ilma)
        {
            const float hajoaa = 1.8f;
            if (ts < 0f || ts > kesto + hajoaa) { pallo.localScale = Vector3.zero; return; }
            float kasvu = Pehmea(ts / 0.35f), haipyy = Pehmea((kesto + hajoaa - ts) / 1.3f);
            float tau = Mathf.Max(0f, ts - 0.7f * kesto);
            // Ensimmäinen pallo on suihku torven edessä ja nousee pilveksi, toinen pullistuu sen alle.
            var p = origo + kulku * (keinu * TorvenPaa + new Vector3(0f, 0f, 0.0022f * Pehmea(ts / 0.5f) * (1f - 0.5f * j))) + ilma * (tau * tau / (tau + 0.5f))
                + new Vector3(0f, 0.0015f + (0.0095f - 0.005f * j) * Pehmea(ts / 1.4f) + 0.0015f * ts, 0f);
            pallo.localPosition = kaanto * (p - paikka);
            float sk = (1.75f - 0.45f * j + 0.55f * Pehmea(ts / (kesto + 0.3f))) * kasvu * haipyy;
            pallo.localScale = new Vector3(sk, 0.95f * sk, sk);
            pallo.localRotation = kaanto * Quaternion.Euler(180f, 40f + 30f * ts + 70f * j, 12f);
        }
    }
}
