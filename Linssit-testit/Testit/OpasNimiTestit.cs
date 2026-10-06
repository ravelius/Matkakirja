// Maiden ja kaupunkien nimet äänenä (juna 146): yhdistelmä ensin, muuten nimi + jatko oikeassa järjestyksessä, ei toistoa.
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasNimiTestit
    {
        const string Nimet = "{\"versio\":1,\"maat\":{\"DK\":{\"id\":\"maa-DK\",\"teksti\":\"Tanska.\",\"url\":\"u/maa-DK.mp3\"},\"SE\":{\"id\":\"maa-SE\",\"teksti\":\"Ruotsi.\",\"url\":\"u/maa-SE.mp3\"}},"
            + "\"kaupungit\":[{\"iso\":\"DK\",\"nimi\":\"Kööpenhamina\",\"paakaupunki\":true,\"id\":\"k-DK\",\"url\":\"u/k-DK.mp3\"},"
            + "{\"iso\":\"IL\",\"nimi\":\"Jerusalem\",\"paakaupunki\":false,\"id\":\"k-IL-j\",\"url\":\"u/k-IL-j.mp3\"},{\"iso\":\"PS\",\"nimi\":\"Jerusalem\",\"paakaupunki\":false,\"id\":\"k-PS-j\",\"url\":\"u/k-PS-j.mp3\"}],"
            + "\"jatkot\":{\"maa\":[{\"id\":\"jm1\",\"teksti\":\"hieno valinta.\",\"url\":\"u/jm1.mp3\",\"paikka\":\"alku\"}],"
            + "\"kaupunki\":[{\"id\":\"jk2\",\"teksti\":\"Seuraavana\",\"url\":\"u/jk2.mp3\",\"paikka\":\"loppu\"}]}}";
        const string Maat = "{\"maat\":{\"DK\":{\"maa\":[{\"id\":\"DK-maa-01\",\"teksti\":\"Seuraavana Tanska.\",\"url\":\"u/DK-maa-01.mp3\"}],"
            + "\"pk\":[{\"id\":\"DK-pk-01\",\"teksti\":\"Kööpenhamina, Tanskan pääkaupunki.\",\"url\":\"u/DK-pk-01.mp3\"}]}}}";

        static OpasNimiaanet L() => OpasNimiaanet.Lue((Dictionary<string, object>)MiniJson.Jasenna(Nimet), (Dictionary<string, object>)MiniJson.Jasenna(Maat), 3);

        [Testi] static void YhdistelmaEnsinSittenNimiJaJatko()
        {
            var a = L();
            var eka = a.Maalle("DK");
            Oleta.Tosi(eka.Length == 1 && eka[0].Id == "DK-maa-01", "valmis yhdistelmä");
            var toka = a.Maalle("dk");
            Oleta.Tosi(toka.Length == 2 && toka[0].Id == "maa-DK" && toka[1].Id == "jm1", "yhdistelmä käytetty → nimi + alku-jatko");
            var kolmas = a.Maalle("DK");
            Oleta.Tosi(kolmas.Length == 1 && kolmas[0].Id == "maa-DK", "jatkot käytetty → pelkkä nimi");
            Oleta.Sama(0, a.Maalle("XX").Length);
        }

        [Testi] static void KaupunkiPaakaupunkiJaLoppuJatko()
        {
            var a = L();
            var pk = a.Kaupungille(null, " kööpenhamina ");
            Oleta.Tosi(pk.Length == 1 && pk[0].Id == "DK-pk-01", "pääkaupungin yhdistelmä");
            var j = a.Kaupungille("PS", "Jerusalem");
            Oleta.Tosi(j.Length == 2 && j[0].Id == "jk2" && j[1].Id == "k-PS-j", "loppu-jatko ensin, ISO ratkaisee samannimisen");
            Oleta.Sama(0, a.Kaupungille("FI", "Jerusalem").Length);
        }
    }
}
