// POHJAN KAUPUNKITASO Z10 (Natiiviseppä 27.9.2026): offline.jsonin kaupunkiRasteri-joukko (skeema 1.51), pohjan polun
// jäsennys, vanhemman polku ja neljänneksen suurennus (Kartta/KaupunkiRasteri.cs).
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KaupunkiRasteriTestit
    {
        const string Pohja = "julisteet/pallo/laatat/2026-09-26-pohja-20260926/";

        static Dictionary<string, object> Json(string s) => (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(s);

        [Testi]
        static void JoukkoRivijuoksuista()
        {
            KaupunkiRasteri.Nollaa();
            Oleta.Sama(null, KaupunkiRasteri.Onko(10, 579, 395), "ennen lukua tuntematon");
            int n = KaupunkiRasteri.Lue(Json("{\"lahteet\":{\"rasteri\":{\"maxzoom\":9,\"kaupunkiRasteri\":{\"tasot\":[10]}}}," +
                "\"maat\":{\"GRC\":{\"rasteri\":{\"9\":[[1,2,3,4]]},\"kaupunkiRasteri\":{\"10\":[[578,395,580,395],[579,396,579,396]]}}," +
                "\"FIN\":{\"rasteri\":{}}}}"));
            Oleta.Sama(4, n, "3 + 1 laattaa");
            Oleta.Sama(true, KaupunkiRasteri.Onko(10, 579, 395));
            Oleta.Sama(true, KaupunkiRasteri.Onko(10, 579, 396));
            Oleta.Sama(false, KaupunkiRasteri.Onko(10, 540, 444), "Sahara ei poltettu");
            Oleta.Sama(false, KaupunkiRasteri.Onko(9, 289, 197), "rasteri-kenttää ei lueta joukkoon");
            KaupunkiRasteri.Nollaa();
        }

        [Testi]
        static void VanhaPakettiTuntematon()
        {
            KaupunkiRasteri.Nollaa();
            Oleta.Sama(0, KaupunkiRasteri.Lue(Json("{\"lahteet\":{\"rasteri\":{\"maxzoom\":9}},\"maat\":{\"GRC\":{\"rasteri\":{\"9\":[[1,2,3,4]]}}}}")));
            Oleta.Sama(false, KaupunkiRasteri.Tunnettu);
            Oleta.Sama(null, KaupunkiRasteri.Onko(10, 1, 1));
        }

        [Testi]
        static void PolkuJaVanhempi()
        {
            Oleta.Tosi(KaupunkiRasteri.Jasenna(Pohja + "10/579/395.jpg", Pohja, out int z, out int x, out int y), "jäsennys");
            Oleta.Sama((10, 579, 395), (z, x, y));
            Oleta.Tosi(!KaupunkiRasteri.Jasenna("julisteet/pallo/laatat/muu/10/1/1.jpg", Pohja, out _, out _, out _), "muu sarja");
            Oleta.Tosi(!KaupunkiRasteri.Jasenna(Pohja + "10/1.jpg", Pohja, out _, out _, out _), "vajaa polku");
            string v = KaupunkiRasteri.Vanhempi(Pohja + "10/579/395.jpg", Pohja, 10, 579, 395, out int qx, out int qy);
            Oleta.Sama(Pohja + "9/289/197.jpg", v);
            Oleta.Sama((1, 1), (qx, qy), "pariton x = oikea, pariton y = alempi (XYZ)");
        }

        [Testi]
        static void NeljanneksenSuurennus()
        {
            // 4×4-lähde, rivi 0 alhaalla: ylempi vasen neljännes (qx 0, qy 0) = rivit 2–3, sarakkeet 0–1, arvo 200; muut 10.
            const int k = 4;
            var rgb = new byte[k * k * 3];
            for (int j = 0; j < k; j++)
                for (int i = 0; i < k; i++)
                    for (int c = 0; c < 3; c++) rgb[(j * k + i) * 3 + c] = (byte)(j >= 2 && i < 2 ? 200 : 10);
            var u = KaupunkiRasteri.Suurenna(rgb, k, 0, 0);
            foreach (var b in u) Oleta.Sama((byte)200, b, "ylempi vasen neljännes kokonaan");
            var a = KaupunkiRasteri.Suurenna(rgb, k, 1, 1);
            foreach (var b in a) Oleta.Sama((byte)10, b, "alempi oikea neljännes");
        }
    }
}
