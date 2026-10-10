// LAATTATEKSTUURIEN PIENENNYS, PUHDAS LOGIIKKA (Natiiviseppä 9.10.2026, juna 174 -selvitys; PROTO, oletus pois): Googlen
// 3D-laattojen perusvärikuvat (~1024², RGBA8 + mipit ≈ 5,3 Mt/laatta) pienennetään GPU:lla ohittamalla ylimmät mipit
// (Unity: LaattaTekstuurit, Graphics.CopyTexture). Taso 0 = pois, 1 = puolikas (¼ tavuista), 2 = neljännes (1⁄16).
// Moottoriton: mip- ja kokovalinta sekä tavuarvio (lohkokoko: pakkaamaton = 1×1 lohko × tavua/pikseli).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class LaattaPienennys
    {
        public const int MaksimiTaso = 2;
        /// <summary>Pienempää ei tehdä (pitkä sivu, px): pienet kuvat säästävät vähän ja sumenevat heti.</summary>
        public const int MinKoko = 64;

        /// <summary>Täysi mip-ketju koolle (1024² → 11).</summary>
        public static int MipTasoja(int leveys, int korkeus)
        {
            int m = Math.Max(1, Math.Max(leveys, korkeus)), n = 1;
            while (m > 1) { m >>= 1; n++; }
            return n;
        }

        /// <summary>Mipin koko tasolla i (vähintään 1).</summary>
        public static int Mip(int koko, int i) => Math.Max(1, koko >> i);

        /// <summary>
        /// Montako ylintä mippiä ohitetaan ja kopion mitat. Ohita 0 = ei pienennystä (taso 0, ei mippejä, tai tulos alle MinKoko).
        /// Kopion mipit = lähteen mipit − Ohita, enintään kopion täysi ketju.
        /// </summary>
        public static (int Ohita, int Leveys, int Korkeus, int Mipit) Valitse(int leveys, int korkeus, int mipit, int taso)
        {
            int k = Math.Min(Math.Max(0, taso), MaksimiTaso);
            k = Math.Min(k, Math.Max(0, mipit - 1));   // lähteessä oltava mip k
            while (k > 0 && Math.Max(Mip(leveys, k), Mip(korkeus, k)) < MinKoko) k--;
            if (k <= 0 || leveys <= 0 || korkeus <= 0) return (0, leveys, korkeus, mipit);
            int l = Mip(leveys, k), h = Mip(korkeus, k);
            return (k, l, h, Math.Min(mipit - k, MipTasoja(l, h)));
        }

        /// <summary>Tekstuurin tavut mipeineen: lohkot (lohkoL × lohkoK px, lohkoTavut tavua) mip-tasoittain.</summary>
        public static long Tavut(int leveys, int korkeus, int mipit, int lohkoL, int lohkoK, int lohkoTavut)
        {
            if (leveys <= 0 || korkeus <= 0 || lohkoTavut <= 0) return 0;
            lohkoL = Math.Max(1, lohkoL); lohkoK = Math.Max(1, lohkoK);
            long s = 0;
            for (int i = 0; i < Math.Max(1, mipit); i++)
                s += (long)((Mip(leveys, i) + lohkoL - 1) / lohkoL) * ((Mip(korkeus, i) + lohkoK - 1) / lohkoK) * lohkoTavut;
            return s;
        }

        /// <summary>Pakkaamaton (tavua pikselille, esim. RGBA8 = 4).</summary>
        public static long Tavut(int leveys, int korkeus, int mipit, int tavuaPikselille) => Tavut(leveys, korkeus, mipit, 1, 1, tavuaPikselille);

        /// <summary>Diagnostiikkarivi (MATKAKIRJA kaupunki: laattatekstuurit …).</summary>
        public static string Rivi(int taso, int kpl, int pienennetty, long nyt, long ilman, int luotu, int ohitettu) =>
            $"laattatekstuurit taso {taso}: {kpl} kpl ({pienennetty} pienennetty), nyt {nyt >> 20} Mt, ilman pienennystä {ilman >> 20} Mt, " +
            $"säästö {(ilman - nyt) >> 20} Mt; kopioita luotu {luotu}, ohitettu {ohitettu}";
    }
}
