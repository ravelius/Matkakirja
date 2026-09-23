// Tallennuksen versiopolku (Peli/Pelitila.cs): nykyversio 4, vanhemmat nousevat
// latauksessa, uudempi pysäyttää latauksen omalla poikkeuksellaan (PeliOhjain
// säilyttää tiedoston eikä korvaa sitä).
using System;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    static class TallennusTestit
    {
        static string Nyky => "\"versio\":" + Pelitila.TallennusVersio;

        static Matka PelattuPeli()
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(5L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            new Kysely(m, KyselyTestit.Data);
            new Kaupat(m).Kulttuuri("pariisi", true);
            m.ValitseKulkutapa(Kulkutapa.Maa);
            m.Heita();
            return m;
        }

        [Testi] static void NykyversioOnViisiJaAlkaaTallennuksen()
        {
            Oleta.Sama(5, Pelitila.TallennusVersio);
            Oleta.Tosi(PelattuPeli().Tallenna().StartsWith("{" + Nyky + ",", StringComparison.Ordinal), "versio ensimmäisenä");
        }

        [Testi] static void Versio3NouseeNykyversioonSamoinKentin()
        {
            var json = PelattuPeli().Tallenna();
            var v3 = json.Replace(Nyky, "\"versio\":3");
            var l = Matka.Lataa(KultaisetApu.Verkko, v3, KultaisetApu.Laattamaarat);
            Oleta.Sama(3, l.Tila.LuettuVersio, "luettu versio kirjattu");
            Oleta.Sama(json, l.Tallenna(), "seuraava tallennus on nykyversio samoin tiedoin");
        }

        [Testi] static void UudempiVersioHeittaaOmanPoikkeuksen()
        {
            var uusi = PelattuPeli().Tallenna().Replace(Nyky, "\"versio\":" + (Pelitila.TallennusVersio + 1));
            try
            {
                Matka.Lataa(KultaisetApu.Verkko, uusi);
                throw new Exception("uudempi tallennus latautui");
            }
            catch (UudempiTallennus e) { Oleta.Sama(Pelitila.TallennusVersio + 1, e.Versio); }
        }

        [Testi] static void RosvoPoistettuPaketistaJaTallennuksesta()
        {
            // Rosvolaatat on poistettu pelistä (Raamattu 25.8.2026): paketin robber-määrä ohitetaan.
            var maarat = Laattamaarat.Lue("{\"counts\":{\"star\":7,\"robber\":12,\"mannerAarre\":7,\"empty\":3,\"pieniAarre\":20}}");
            Oleta.Sama("star,mannerAarre,pieniAarre", string.Join(",", maarat.Maarat.Select(m => m.Key)));
            Oleta.Sama("robber,empty", string.Join(",", maarat.Ohitetut));
            try { new Laattamaarat().Lisaa("robber", 1); throw new Exception("robber hyväksyttiin"); }
            catch (ArgumentException) { }

            // Vanha tallennus: auki jäänyt kaksintaistelu ja kääntämätön rosvolaatta.
            var m = PelattuPeli();
            var json = m.Tallenna();
            var kaupunki = m.Laatat.Laatat.First().Key;
            var vanha = json.Replace("\"vaihe\":\"" + m.Tila.Vaihe + "\"", "\"vaihe\":\"Kaksintaistelu\"")
                .Replace("\"polloAarteena\":", "\"kaksintaistelu\":true,\"avoinKaksintaistelu\":{\"q\":\"x\"},\"polloAarteena\":")
                .Replace("[\"" + kaupunki + "\",\"" + m.Laatat.Laatat[kaupunki] + "\"]", "[\"" + kaupunki + "\",\"robber\"]");
            Oleta.Tosi(vanha.Contains("\"robber\"") && vanha.Contains("Kaksintaistelu"), "vanha muoto rakennettu");
            var l = Matka.Lataa(KultaisetApu.Verkko, vanha);
            Oleta.Sama(Vaihe.Toiminta, l.Tila.Vaihe, "kaksintaistelu → Toiminta");
            Oleta.Tosi(!l.LaattaTassa(kaupunki), "rosvolaatta katosi");
            Oleta.Tosi(!l.Tallenna().Contains("aksintaistelu") && !l.Tallenna().Contains("robber"), "ei jälkiä tallennuksessa");
        }

        [Testi] static void PuuttuvaVersioOnRikki()
        {
            var ilman = PelattuPeli().Tallenna().Replace(Nyky + ",", "");
            try
            {
                Pelitila.FromJson(ilman);
                throw new Exception("versioton tallennus latautui");
            }
            catch (UudempiTallennus) { throw new Exception("versioton ei ole uudempi"); }
            catch (FormatException) { }
        }
    }
}
