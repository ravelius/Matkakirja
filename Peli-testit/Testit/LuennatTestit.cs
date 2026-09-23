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
        [Testi] static void ReaktiotJaNiidenAjat()
        {
            var l = new Luennat();
            l.LueLuennat(@"{""alkiot"":[{""id"":""matkakirja:pariisi"",""kaupunki"":""pariisi"",""url"":""https://x/p.mp3"",
              ""teksti"":""0123456789ANKKURI0123456789TOINEN890123456789"",""kesto"":30,
              ""reaktiot"":[{""id"":""p.r2"",""ankkuri"":""TOINEN"",""tarkoitus"":""epailee"",""voimakkuus"":0.4,""siirtyma"":0.5},
                           {""id"":""p.r1"",""ankkuri"":""ANKKURI"",""tarkoitus"":""vakavoituu"",""voimakkuus"":0.5,""siirtyma"":0},
                           {""id"":""p.r3"",""ankkuri"":""puuttuu"",""tarkoitus"":""x"",""voimakkuus"":0.3}],
              ""reaktioHetket"":null}]}");
            var p = l.Luento("pariisi");
            Oleta.Sama(3, p.Reaktiot.Count);
            var ajat = p.ReaktioAjat(30);
            Oleta.Sama(2, ajat.Count, "löytymätön ankkuri pois");
            Oleta.Sama("p.r1", ajat[0].Reaktio.Id, "aikajärjestys");
            Oleta.Tosi(System.Math.Abs(ajat[0].AikaS - 10.0 / 45 * 30) < 1e-9, "suhteellinen paikka");
            Oleta.Tosi(System.Math.Abs(ajat[1].AikaS - (27.0 / 45 * 30 + 0.5)) < 1e-9, "siirtymä");
            l.LueLuennat(@"{""alkiot"":[{""id"":""matkakirja:rooma"",""kaupunki"":""rooma"",""url"":""https://x/r.mp3"",""teksti"":""abc"",
              ""reaktiot"":[{""id"":""r.r1"",""ankkuri"":""zzz"",""tarkoitus"":""myotailee"",""voimakkuus"":0.35}],""reaktioHetket"":{""r.r1"":1250}}]}");
            var r = l.Luento("rooma").ReaktioAjat(10);
            Oleta.Tosi(r.Count == 1 && System.Math.Abs(r[0].AikaS - 1.25) < 1e-9, "kohdistettu hetki voittaa");
        }
    }
}
