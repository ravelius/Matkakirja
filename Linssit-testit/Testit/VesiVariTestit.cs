// MITATTU VEDEN VÄRI (Linssiseppä 2, 10.10.2026): Karttasepän vesivari-kaudet.json (kultainen kopio, vari-v1) kaupungin vesistön ja
// kauden mukaan; Tukholman meri tunnistetaan kärjen korkeudesta maan kaarevuus korjattuna.
using System;
using System.IO;
using Matkakirja.Linssit.Ilmakeha;

namespace Matkakirja.Linssit.Testit
{
    public static class VesiVariTestit
    {
        static string Json() => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "vesivari-kaudet-v1.json"));

        [Testi] static void VedetJaKaudet()
        {
            foreach (var (k, w) in new[] { ("pariisi", "Seine"), ("tukholma", "Saltsjön"), ("tukholma", "Mälaren") })
                foreach (var kausi in new[] { "talvi", "kevat", "kesa", "syksy" })
                {
                    var v = VesiVari.Hae(Json(), k, w, kausi);
                    Oleta.Tosi(v.HasValue, $"{k}/{w}/{kausi}");
                    Oleta.Tosi(v.Value.SG >= 0 && v.Value.SG < 0.1 && v.Value.SameusFnu >= 0, $"{k}/{w}/{kausi}: {v.Value}");
                }
            Oleta.Tosi(VesiVari.Hae(Json(), "rooma", "Tiber", "kesa") == null, "ei Roomaa");
            Oleta.Tosi(VesiVari.Vedet("pariisi")[1] == "Seine" && VesiVari.Vedet("tukholma")[1] == "Mälaren" && VesiVari.Vedet("rooma") == null, "vesistöt");
        }

        [Testi] static void MeriKorkeudesta()
        {
            Oleta.Sama(0f, VesiVari.Tunniste("tukholma", -200, -150, 23.0), "Strömmen meri");
            Oleta.Sama(1f, VesiVari.Tunniste("tukholma", -1000, -1000, 23.64), "Mälaren +0,64 m");
            // 10 km:n päässä kaarevuus laskee pinnan ~7,8 m: meri tunnistetaan silti.
            Oleta.Sama(0f, VesiVari.Tunniste("tukholma", 10000, 0, 23.0 - 1e8 / (2 * VesiVari.MaanSadeM)), "meri 10 km:ssä");
            Oleta.Sama(0f, VesiVari.Tunniste("pariisi", 0, 0, 40), "Pariisissa aina 0");
            // Peking (vesialueet-peking.json, ENU Taihedianista): vallihauta ja Jinshui 0, Beihai ja Zhongnanhai 1.
            Oleta.Tosi(VesiVari.Vedet("peking")[0] == "vallihauta" && VesiVari.Vedet("peking")[1] == "Beihai", "Pekingin vesistöt");
            Oleta.Sama(0f, VesiVari.Tunniste("peking", 420, 67, 35.8), "vallihauta itä");
            Oleta.Sama(0f, VesiVari.Tunniste("peking", -460, 600, 35.8), "vallihauta NW-kulma");
            Oleta.Sama(0f, VesiVari.Tunniste("peking", 0, -1000, 37), "Jinshui");
            Oleta.Sama(1f, VesiVari.Tunniste("peking", -800, 67, 34.8), "Zhongnanhai");
            Oleta.Sama(1f, VesiVari.Tunniste("peking", -460, 1200, 34.8), "Beihai itäranta");
        }
    }
}
