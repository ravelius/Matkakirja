// ISS-kamera koko maailmaan (omistaja 4.10.2026, loki #3936): Karttasepän maailma.json ja alueindeksien yhdistäminen etusijassa.
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    public static class S2MaailmaTestit
    {
        const string Luettelo = @"{""juuri"": ""https://media.matkakirja.app/linssit/astronautin-kamera/s2-indeksi/v1/"", ""merkinta"": ""Contains modified Copernicus Sentinel data"",
            ""etusija"": [""eurooppa"", ""pohjois-afrikka-lahi-ita"", ""amerikka"", ""aasia-australia"", ""tropiikki""],
            ""alueet"": {
              ""eurooppa"": {""tiedosto"": ""indeksi.json"", ""bbox"": [-28, 32, 45, 72], ""ruutuja"": 2900},
              ""pohjois-afrikka-lahi-ita"": {""tiedosto"": ""indeksi-pohjois-afrikka-lahi-ita.json"", ""bbox"": [-20, 12, 65, 38], ""ruutuja"": 3000},
              ""amerikka"": {""tiedosto"": ""indeksi-amerikka.json"", ""bbox"": [-170, -56, -30, 72], ""ruutuja"": 5000},
              ""aasia-australia"": {""tiedosto"": ""indeksi-aasia-australia.json"", ""bbox"": [60, -45, 180, 72], ""ruutuja"": 7000},
              ""tropiikki"": {""tiedosto"": ""indeksi-tropiikki.json"", ""bbox"": [-180, -24, 180, 24], ""ruutuja"": 7692}}}";

        static S2Indeksi Ix(byte lut0, params (string mgrs, double w, double s, double e, double n)[] ruudut)
        {
            var j = "{\"versio\":\"t\",\"tci_lut\":[" + string.Join(",", Enumerable.Range(0, 256).Select(i => i == 0 ? lut0 : i)) + "],\"ruudut\":{"
                + string.Join(",", ruudut.Select(r => $"\"{r.mgrs}\":{{\"bbox\":[{r.w},{r.s},{r.e},{r.n}],\"valinnat\":[{{\"id\":\"x\",\"tci\":\"https://x/{r.mgrs}.tif\"}}]}}")) + "}}";
            return S2Indeksi.Jasenna(j.Replace(",", ", "));
        }

        [Testi] static void LuetteloJaOsoitteet()
        {
            var m = S2Maailma.Jasenna(Luettelo);
            Oleta.Sama(5, m.Alueet.Count);
            Oleta.Sama("eurooppa", m.Etusija[0]);
            Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-indeksi/v1/indeksi-amerikka.json", m.Osoitteeksi("amerikka"));
        }

        [Testi] static void NakymanAlueetEtusijassa()
        {
            var m = S2Maailma.Jasenna(Luettelo);
            Oleta.Sama("eurooppa", string.Join(" ", m.Nakymassa(20, 58, 26, 62)), "Helsinki");
            Oleta.Sama("pohjois-afrikka-lahi-ita tropiikki", string.Join(" ", m.Nakymassa(5, 20, 12, 26)), "Sahara: P-Afrikka ennen tropiikkia");
            Oleta.Sama("amerikka tropiikki", string.Join(" ", m.Nakymassa(-62, -5, -58, -1)), "Amazonia");
            Oleta.Sama("aasia-australia tropiikki", string.Join(" ", m.Nakymassa(170, -20, -175, -10)), "vaihtopäivän yli (w > e)");
            Oleta.Tosi(m.Nakymassa(-40, -70, -20, -60).Count == 0, "Etelämanner: ei aluetta");
        }

        [Testi] static void KarttasepanTestiluetteloBboxit()
        {
            // Karttasepän muoto 4.10. (maailma-testi-4-aluetta.json): "bboxit", aasia-australia kahtena osana päivämäärärajan yli.
            const string j = @"{""etusija"": [""eurooppa"", ""amerikka"", ""aasia-australia""], ""alueet"": {
              ""eurooppa"": {""tiedosto"": ""indeksi.json"", ""bboxit"": [[-30.9, 31.5, 48.4, 73.0]]},
              ""amerikka"": {""tiedosto"": ""indeksi-amerikka.json"", ""bboxit"": [[-180.0, -57.8, -38.9, 73.0]]},
              ""aasia-australia"": {""tiedosto"": ""indeksi-aasia-australia.json"", ""bboxit"": [[-0.07, -56.0, 180, 73.0], [-180, -41.6, -4.03, 71.2]]}}}";
            var m = S2Maailma.Jasenna(j, "https://x/");
            Oleta.Sama(2, m.Alueet["aasia-australia"].Rajaukset.Count);
            Oleta.Sama("aasia-australia", string.Join(" ", m.Nakymassa(130, -26, 132, -24)), "Uluru");
            Oleta.Sama("amerikka aasia-australia", string.Join(" ", m.Nakymassa(-160, 20, -155, 22)), "Havaiji: kumpikin");
            Oleta.Sama("https://x/indeksi.json", m.Osoitteeksi("eurooppa"));
        }

        [Testi] static void YhdistaEtusijaJaLut()
        {
            var eu = Ix(11, ("33UXP", 15, 50, 16, 51), ("31TFJ", 4, 43, 5, 44));
            var af = Ix(22, ("31TFJ", 4, 43, 5, 44), ("32RNP", 9, 30, 10, 31));
            var y = S2Indeksi.Yhdista(new[] { ("eurooppa", eu), ("pohjois-afrikka-lahi-ita", af) });
            Oleta.Sama(3, y.Ruudut.Count);
            Oleta.Sama("eurooppa", y.Ruudut["31TFJ"].Alue, "rajan ruutu etusijan mukaan");
            Oleta.Sama((byte)11, y.Ruudut["31TFJ"].Lut[0]);
            Oleta.Sama((byte)22, y.Ruudut["32RNP"].Lut[0], "alueen oma lut");
            Oleta.Tosi(y.Lut == null, "yhdistetyn yhteinen lut pois (ruuduittain)");
            Oleta.Sama((byte)22, y.Ruudut["32RNP"].Ruutu(0).Lut[0], "kuvasuunnitelman ruutu kantaa lutin");
        }
    }
}
