// Laattatekstuurien pienennys (proto 9.10., Natiiviseppä): mip-valinta, kopion mitat ja tavuarvio.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class LaattaPienennysTestit
    {
        [Testi] static void MipKetju()
        {
            Oleta.Sama(11, LaattaPienennys.MipTasoja(1024, 1024));
            Oleta.Sama(11, LaattaPienennys.MipTasoja(1024, 512));
            Oleta.Sama(1, LaattaPienennys.MipTasoja(1, 1));
            Oleta.Sama(10, LaattaPienennys.MipTasoja(600, 300), "ei kahden potenssi");
        }

        [Testi] static void TasoPoisEiPienenna()
        {
            Oleta.Sama(0, LaattaPienennys.Valitse(1024, 1024, 11, 0).Ohita);
            Oleta.Sama(0, LaattaPienennys.Valitse(1024, 1024, 11, -1).Ohita);
        }

        [Testi] static void PuolikasJaNeljannes()
        {
            var p = LaattaPienennys.Valitse(1024, 1024, 11, 1);
            Oleta.Sama((1, 512, 512, 10), p);
            var n = LaattaPienennys.Valitse(1024, 1024, 11, 2);
            Oleta.Sama((2, 256, 256, 9), n);
            Oleta.Sama(2, LaattaPienennys.Valitse(1024, 1024, 11, 5).Ohita, "taso rajataan MaksimiTasoon");
            // Ei kahden potenssi: kopion mip i = lähteen mip i + k (CopyTexturen mitat täsmäävät).
            var e = LaattaPienennys.Valitse(600, 300, 10, 1);
            Oleta.Sama((1, 300, 150, 9), e);
            for (int i = 0; i < e.Mipit; i++)
                Oleta.Tosi(LaattaPienennys.Mip(e.Leveys, i) == LaattaPienennys.Mip(600, i + 1) && LaattaPienennys.Mip(e.Korkeus, i) == LaattaPienennys.Mip(300, i + 1), "mip " + i);
        }

        [Testi] static void IlmanMippejaTaiPieniEiPienenna()
        {
            Oleta.Sama(0, LaattaPienennys.Valitse(1024, 1024, 1, 2).Ohita, "ei mippejä → CopyTexture ei voi pienentää");
            Oleta.Sama(1, LaattaPienennys.Valitse(1024, 1024, 2, 2).Ohita, "vain yksi mip lisää");
            Oleta.Sama(1, LaattaPienennys.Valitse(128, 128, 8, 2).Ohita, "64 px on raja");
            Oleta.Sama(0, LaattaPienennys.Valitse(64, 64, 7, 2).Ohita);
            // Vajaa lähdeketju (KTX2): kopion mipit = lähde − k.
            Oleta.Sama((1, 512, 512, 3), LaattaPienennys.Valitse(1024, 1024, 4, 1));
        }

        [Testi] static void Tavuarvio()
        {
            // 1024² RGBA8 + mipit ≈ 5,59 Mt (mitattu laitteella ~5,3 Mt/laatta).
            long taysi = LaattaPienennys.Tavut(1024, 1024, 11, 4);
            Oleta.Sama(5592404L, taysi);
            Oleta.Sama(4194304L, LaattaPienennys.Tavut(1024, 1024, 1, 4), "ilman mippejä");
            long puoli = LaattaPienennys.Tavut(512, 512, 10, 4), nelj = LaattaPienennys.Tavut(256, 256, 9, 4);
            Oleta.Tosi(System.Math.Abs(taysi / (double)puoli - 4) < 0.01, "puolikas = ¼");
            Oleta.Tosi(System.Math.Abs(taysi / (double)nelj - 16) < 0.05, "neljännes = 1/16");
            // ASTC 4×4 (16 t/lohko): 1 t/px; pienet mipit vievät kokonaisen lohkon.
            Oleta.Sama(16L, LaattaPienennys.Tavut(1, 1, 1, 4, 4, 16));
            Oleta.Sama(1048576L, LaattaPienennys.Tavut(1024, 1024, 1, 4, 4, 16));
        }

        [Testi] static void Rivi()
        {
            var r = LaattaPienennys.Rivi(1, 200, 190, 300L << 20, 1100L << 20, 400, 3);
            Oleta.Tosi(r.StartsWith("laattatekstuurit taso 1: 200 kpl (190 pienennetty), nyt 300 Mt, ilman pienennystä 1100 Mt, säästö 800 Mt"), r);
        }
    }
}
