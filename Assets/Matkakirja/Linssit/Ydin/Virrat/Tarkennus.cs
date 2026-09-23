// KENTÄT PIIRTORESOLUUTIOON (web js/aikajana-virrat-laskenta.js
// tarkennaKentat; hionta 6.9.2026, ruutureunat).
//
// Webissä tämä on kalvon varapolku (`?virrat=kalvo`); oletuksena vanat.
// Natiivissa sama tulos kelpaa tekstuurin lähteeksi: jokainen
// `kerroin`-kertaisen kalvon pikseli saa arvonsa neljän lähimmän ruudun
// bilineaarisena sekoituksena (saapumisaika, maapeitolla painotettu
// peitto, kaksi vahvinta virtaa ja niiden sekoitus, meri, retki ja vanha).
// Tulos on TIIVIS: vain pikselit, joilla on jokin kerros.
//
// Float32-välitaulukot (painot, meriPainot, osuus, w4) pyöristetään
// floatiksi samoissa kohdissa kuin webin Float32Array; aritmetiikka on
// doubleina kuten JS:ssä.
using System;

namespace Matkakirja.Linssit.Virrat
{
    public sealed class TarkkaKentta
    {
        public int Leveys, Korkeus, Koko;
        /// <summary>Kalvon pikselin indeksi (rivi × Leveys + sarake).</summary>
        public int[] Indeksi;
        public float[] Aika;
        public byte[] Paino;
        public sbyte[] Virta, Virta2;
        /// <summary>Toisen virran osuus 0…255.</summary>
        public byte[] Sekoitus;
        public float[] Meri;
        public byte[] MeriPaino;
        public sbyte[] MeriVirta;
        /// <summary>null, jos kentissä ei ole retkeä.</summary>
        public float[] Retki;
        public byte[] RetkiPaino;
        /// <summary>null, jos kentissä ei ole vanhaa väestöä.</summary>
        public byte[] Vanha;
    }

    public static class Tarkennus
    {
        public const int Piirtokerroin = 2;

        /// <summary>JS Uint8Array-kirjoitus pyöristetystä luvusta (0…255, NaN → 0).</summary>
        static byte Tavu(double x)
        {
            if (double.IsNaN(x) || double.IsInfinity(x)) return 0;
            return unchecked((byte)(long)x);
        }

        public static TarkkaKentta TarkennaKentat(Kentat kentat, byte[] maa, byte[] peitto = null,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus, int kerroin = Piirtokerroin)
        {
            var aika = kentat.Aika;
            var virta = kentat.Virta;
            var meri = kentat.Meri;
            var meriVirta = kentat.MeriVirta;
            var retki = kentat.Retki;
            var vanha = kentat.Vanha;
            var W2 = leveys * kerroin;
            var H2 = korkeus * kerroin;
            var tila = 1 << 18;
            var n = 0;
            var ind = new int[tila];
            var tA = new float[tila];
            var tP = new byte[tila];
            var tV = new sbyte[tila];
            var tV2 = new sbyte[tila];
            var tS = new byte[tila];
            var tM = new float[tila];
            var tMP = new byte[tila];
            var tMV = new sbyte[tila];
            var tR = new float[tila];
            var tRP = new byte[tila];
            var tVa = new byte[tila];
            var painot = new float[16]; // virtapainot (enintään 16 virtaa)
            var meriPainot = new float[16];
            var osuus = new float[leveys * korkeus];
            for (var i = 0; i < osuus.Length; i += 1) osuus[i] = peitto != null ? (float)(peitto[i] / 9.0) : (maa[i] != 0 ? 1f : 0f);
            var i4 = new int[4];
            var w4 = new float[4];
            for (var v = 0; v < H2; v += 1)
            {
                var y = (v + 0.5) / kerroin - 0.5;
                var r0 = (int)Math.Floor(y);
                var fy = y - r0;
                var rA = Math.Max(0, Math.Min(korkeus - 1, r0));
                var rB = Math.Max(0, Math.Min(korkeus - 1, r0 + 1));
                for (var u = 0; u < W2; u += 1)
                {
                    var x = (u + 0.5) / kerroin - 0.5;
                    var c0 = (int)Math.Floor(x);
                    var fx = x - c0;
                    var cA = (c0 + leveys) % leveys;
                    var cB = (c0 + 1 + leveys) % leveys;
                    i4[0] = rA * leveys + cA;
                    i4[1] = rA * leveys + cB;
                    i4[2] = rB * leveys + cA;
                    i4[3] = rB * leveys + cB;
                    w4[0] = (float)((1 - fx) * (1 - fy));
                    w4[1] = (float)(fx * (1 - fy));
                    w4[2] = (float)((1 - fx) * fy);
                    w4[3] = (float)(fx * fy);
                    double paino = 0, summa = 0, retkiPaino = 0, retkiSumma = 0, vanhaPaino = 0, meriPaino = 0, meriSumma = 0;
                    Array.Clear(painot, 0, 16);
                    Array.Clear(meriPainot, 0, 16);
                    for (var k = 0; k < 4; k += 1)
                    {
                        var i = i4[k];
                        double w = w4[k];
                        var q = w * osuus[i];
                        double a = aika[i];
                        if (a > 0 && virta[i] >= 0 && q > 0)
                        {
                            paino += q;
                            summa += q * a;
                            painot[virta[i]] = (float)(painot[virta[i]] + q);
                        }
                        if (retki != null && retki[i] > 0 && q > 0)
                        {
                            retkiPaino += q;
                            retkiSumma += q * retki[i];
                        }
                        if (vanha != null && vanha[i] > 0) vanhaPaino += q * vanha[i];
                        double m = meri[i];
                        if (m > 0 && meriVirta[i] >= 0)
                        {
                            meriPaino += w;
                            meriSumma += w * m;
                            meriPainot[meriVirta[i]] = (float)(meriPainot[meriVirta[i]] + w);
                        }
                    }
                    if (paino <= 0 && retkiPaino <= 0 && vanhaPaino <= 0 && meriPaino <= 0) continue;
                    int v1 = -1, v2 = -1;
                    double p1 = 0, p2 = 0;
                    if (paino > 0)
                    {
                        for (var k = 0; k < painot.Length; k += 1)
                        {
                            double pk = painot[k];
                            if (pk > p1) { v2 = v1; p2 = p1; v1 = k; p1 = pk; }
                            else if (pk > p2) { v2 = k; p2 = pk; }
                        }
                    }
                    var mv = -1;
                    double mp = 0;
                    if (meriPaino > 0)
                    {
                        for (var k = 0; k < meriPainot.Length; k += 1) if (meriPainot[k] > mp) { mp = meriPainot[k]; mv = k; }
                    }
                    if (n >= tila)
                    {
                        tila *= 2;
                        Array.Resize(ref ind, tila);
                        Array.Resize(ref tA, tila);
                        Array.Resize(ref tP, tila);
                        Array.Resize(ref tV, tila);
                        Array.Resize(ref tV2, tila);
                        Array.Resize(ref tS, tila);
                        Array.Resize(ref tM, tila);
                        Array.Resize(ref tMP, tila);
                        Array.Resize(ref tMV, tila);
                        Array.Resize(ref tR, tila);
                        Array.Resize(ref tRP, tila);
                        Array.Resize(ref tVa, tila);
                    }
                    ind[n] = v * W2 + u;
                    tA[n] = paino > 0 ? (float)(summa / paino) : 0f;
                    tP[n] = Tavu(JsLuvut.Round(Math.Min(1, paino) * 255));
                    tV[n] = (sbyte)v1;
                    tV2[n] = (sbyte)v2;
                    tS[n] = v2 >= 0 ? Tavu(JsLuvut.Round(255 * (p2 / (p1 + p2)))) : (byte)0;
                    tM[n] = meriPaino > 0 ? (float)(meriSumma / meriPaino) : 0f;
                    tMP[n] = Tavu(JsLuvut.Round(Math.Min(1, meriPaino) * 255));
                    tMV[n] = (sbyte)mv;
                    tR[n] = retkiPaino > 0 ? (float)(retkiSumma / retkiPaino) : 0f;
                    tRP[n] = Tavu(JsLuvut.Round(Math.Min(1, retkiPaino) * 255));
                    tVa[n] = Tavu(JsLuvut.Round(Math.Min(1, vanhaPaino) * 255));
                    n += 1;
                }
            }
            T[] Leikkaa<T>(T[] t) { var u = new T[n]; Array.Copy(t, u, n); return u; }
            return new TarkkaKentta
            {
                Leveys = W2,
                Korkeus = H2,
                Koko = W2 * H2,
                Indeksi = Leikkaa(ind),
                Aika = Leikkaa(tA),
                Paino = Leikkaa(tP),
                Virta = Leikkaa(tV),
                Virta2 = Leikkaa(tV2),
                Sekoitus = Leikkaa(tS),
                Meri = Leikkaa(tM),
                MeriPaino = Leikkaa(tMP),
                MeriVirta = Leikkaa(tMV),
                Retki = retki != null ? Leikkaa(tR) : null,
                RetkiPaino = retki != null ? Leikkaa(tRP) : null,
                Vanha = vanha != null ? Leikkaa(tVa) : null,
            };
        }
    }
}
