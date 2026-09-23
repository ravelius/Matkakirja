// Tallennuksen versiopolku (Peli/Pelitila.cs): nykyversio 4, vanhemmat nousevat
// latauksessa, uudempi pysäyttää latauksen omalla poikkeuksellaan (PeliOhjain
// säilyttää tiedoston eikä korvaa sitä).
using System;

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

        [Testi] static void NykyversioOnNeljaJaAlkaaTallennuksen()
        {
            Oleta.Sama(4, Pelitila.TallennusVersio);
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
