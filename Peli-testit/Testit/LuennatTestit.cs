// Isoisän luentojen valinta (Scripts/Peli/Luennat.cs): saapumispuheet
// paketista (Kultaiset/paketti/saapumispuheet.json, sisalto/1/v2), tuleva
// luennat-kokoelma käsin tehdyllä näytteellä, kerran-säännöt. ./kaanna.sh Luennat
using System.IO;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class LuennatTestit
    {
        [Testi] static void SaapumispuheetPaketista()
        {
            var l = new Luennat();
            l.LueSaapumispuheet(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "saapumispuheet.json")));
            Oleta.Sama(45, l.Saapumispuheita);
            var p = l.Saapumispuhe("pariisi");
            Oleta.Tosi(p != null && p.Url.StartsWith("https://media.matkakirja.app/audio/") && p.Url.EndsWith(".mp3"), p?.Url);
            Oleta.Tosi(p.Teksti.StartsWith("Pariisi"), p.Teksti);
            Oleta.Tosi(p.Kesto > 0, "kesto");
            Oleta.Sama(null, l.Saapumispuhe("kairo"), "vain Eurooppa");
            Oleta.Tosi(l.Saapumispuhe("pariisi") != null, "joka saapumisella");
        }

        [Testi] static void LuennatKokoelmaJaKerranSaannot()
        {
            var l = new Luennat();
            Oleta.Sama(Luennat.OletusIntro.Url, l.Intro.Url);
            Oleta.Sama("https://media.matkakirja.app/audio/puhe-lento-alku.mp3?v=2", l.OtaLentoAlku().Url);
            Oleta.Sama(null, l.OtaLentoAlku(), "lento kerran istunnossa");
            l.LueLuennat(@"{""alkiot"":[
              {""id"":""pariisi"",""kaupunki"":""pariisi"",""data"":{""kaupunki"":""pariisi"",""url"":""https://media.matkakirja.app/audio/p.mp3"",""teksti"":""Tuileries…"",""paikkarivi"":""Pariisi, lokakuussa 1873."",""kesto"":41.5}},
              {""id"":""intro"",""data"":{""id"":""intro"",""url"":""https://media.matkakirja.app/audio/intro-puhe.mp3?v=3""}},
              {""id"":""rikki"",""kaupunki"":""rooma"",""data"":{""kaupunki"":""rooma""}}]}");
            Oleta.Sama(1, l.Luentoja, "url puuttuu → ohitetaan");
            Oleta.Sama("https://media.matkakirja.app/audio/intro-puhe.mp3?v=3", l.Intro.Url, "intro korvautuu");
            var p = l.OtaLuento("pariisi");
            Oleta.Sama("Pariisi, lokakuussa 1873.", p.Paikkarivi);
            Oleta.Sama(41.5, p.Kesto.Value);
            Oleta.Sama(null, l.OtaLuento("pariisi"), "kerran per kaupunki");
            Oleta.Tosi(l.Luento("pariisi") != null, "kaiutinnappi ehdoitta");
            Oleta.Sama(null, l.OtaLuento("rooma"));
        }
    }
}
