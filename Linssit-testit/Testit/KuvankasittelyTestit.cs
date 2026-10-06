// ISS-kuvan kehitys (omistaja 6.10.: sinisemmäksi ja enemmän wow-efektiä): sinisyys ei sinerrä harmaata, paikallinen kontrasti
// voimistaa reunaa, hehku vain kirkkaimpiin kohtiin.
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class KuvankasittelyTestit
    {
        static byte[] Tasainen(int w, int h, byte r, byte g, byte b)
        {
            var k = new byte[w * h * 4];
            for (int i = 0; i < w * h; i++) { k[i * 4] = r; k[i * 4 + 1] = g; k[i * 4 + 2] = b; k[i * 4 + 3] = 255; }
            return k;
        }

        [Testi]
        static void SinisyysVainSinisiin()
        {
            var meri = Tasainen(1, 1, 40, 70, 110); Kuvankasittely.Sinisyys(meri, 0.45f);
            Oleta.Tosi(meri[2] == 110 && meri[0] < 40, $"meri kylläisemmäksi, kirkkaus säilyy: {meri[0]},{meri[1]},{meri[2]}");
            var pilvi = Tasainen(1, 1, 235, 236, 240); Kuvankasittely.Sinisyys(pilvi, 0.45f);
            Oleta.Tosi(pilvi[0] >= 233 && pilvi[2] == 240, $"pilvi ei sinerry: {pilvi[0]},{pilvi[1]},{pilvi[2]}");
            var metsa = Tasainen(1, 1, 50, 80, 45); Kuvankasittely.Sinisyys(metsa, 0.45f);
            Oleta.Sama((byte)50, metsa[0], "vihreä ennallaan");
        }

        [Testi]
        static void PaikallinenKontrastiVoimistaaReunaa()
        {
            int w = 40, h = 10; var k = Tasainen(w, h, 100, 100, 100);
            for (int y = 0; y < h; y++) for (int x = 20; x < w; x++) { int o = (y * w + x) * 4; k[o] = k[o + 1] = k[o + 2] = 140; }
            Kuvankasittely.PaikallinenKontrasti(k, w, h, 4, 0.45f);
            int v = (5 * w + 18) * 4, o2 = (5 * w + 21) * 4;
            Oleta.Tosi(k[v] < 100 && k[o2] > 140, $"tumma puoli tummemmaksi ({k[v]}), vaalea vaaleammaksi ({k[o2]})");
            Oleta.Sama((byte)100, k[(5 * w + 2) * 4], "kaukana reunasta ennallaan");
        }

        [Testi]
        static void HehkuVainKirkkaimpaan()
        {
            int w = 30, h = 30; var k = Tasainen(w, h, 60, 80, 110);
            int c = (15 * w + 15) * 4; k[c] = k[c + 1] = k[c + 2] = 255;
            Kuvankasittely.Hehku(k, w, h, 232, 2, 0.35f);
            Oleta.Tosi(k[(15 * w + 17) * 4] > 60, "kimalluksen viereen hehku");
            Oleta.Sama((byte)60, k[(2 * w + 2) * 4], "kaukana ei hehkua");
        }

        [Testi]
        static void ValojenKattoSailyttaaSavyn()
        {
            var k = Tasainen(1, 1, 180, 230, 255); Kuvankasittely.ValojenKatto(k);
            Oleta.Tosi(k[2] < 250 && k[2] > 225, $"kirkkain alle katon: {k[2]}");
            Oleta.Tosi(k[0] < k[1] && k[1] < k[2], $"sininen sävy säilyy: {k[0]},{k[1]},{k[2]}");
            var t = Tasainen(1, 1, 60, 90, 150); Kuvankasittely.ValojenKatto(t);
            Oleta.Sama((byte)150, t[2], "tummat ennallaan");
        }

        [Testi]
        static void HaloGradienttiHorisontinYlla()
        {
            // 2160 × 200, horisontti rivillä 150 (ylhäältä), rivit ylhäältä alas; taivas musta, maa harmaa.
            int w = 2160, h = 200; var k = Tasainen(w, h, 0, 0, 0);
            for (int y = 150; y < h; y++) for (int x = 0; x < w; x++) { int o = (y * w + x) * 4; k[o] = k[o + 1] = k[o + 2] = 200; }
            var raja = new float[w]; for (int x = 0; x < w; x++) raja[x] = 150;
            Kuvankasittely.Halo(k, w, h, raja, false);
            int Px(int y) => (y * w + 1000) * 4;
            Oleta.Tosi(k[Px(149) + 2] > 240 && k[Px(149)] > 180, $"ydin vaalea syaani: {k[Px(149)]},{k[Px(149) + 1]},{k[Px(149) + 2]}");
            Oleta.Tosi(k[Px(135) + 2] > k[Px(135)] + 100, $"sininen ylempänä: {k[Px(135)]},{k[Px(135) + 2]}");
            Oleta.Tosi(k[Px(80)] < 5 && k[Px(80) + 2] < 5, "musta 70 px yllä");
            Oleta.Tosi(k[Px(160)] < 200, "maan reuna himmenee");
            Oleta.Sama((byte)200, k[Px(190)], "syvemmällä maa ennallaan");
        }
    }
}
