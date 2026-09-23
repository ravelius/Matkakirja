// Ihmisen matkan aineisto Siirtosepän sisältöpaketista (kultaiset/paketti/,
// koepaketti /Users/Shared/Claude/sisalto-koe/v2) ja kertomusmanifestista.
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class AineistoTestit
    {
        static object Lue(string nimi) => MiniJson.Jasenna(File.ReadAllText(
            Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi)));

        static IhmisenMatkaAineisto Aineisto() =>
            IhmisenMatkaAineisto.Lue(Lue("paketti/ihmisen-matka-data.json"), Lue("paketti/ihmisen-matka-kertomus.json"));

        [Testi] static void PaikatJaKertomusPaketista()
        {
            var a = Aineisto();
            Oleta.Sama(20, a.Paikat.Count);
            Oleta.Sama(20, a.Lisanostot.Count);
            Oleta.Sama(21, a.Kertomus.Count);
            var j = a.Paikat.First(p => p.Tunnus == "jebel-irhoud");
            Oleta.Sama(31.855, j.Lat);
            Oleta.Sama(300000.0, j.VuosiaSitten);
            Oleta.Sama("https://media.matkakirja.app/aikajana/ihmisen-matka/jebel-irhoud.jpg", j.Kuva);
            Oleta.Tosi(j.Esine.Contains("esineet-20260907"), j.Esine);
            Oleta.Sama(3, j.Kysymykset.Count);
            // Jokaisella kertomuksen kohteella on paikka.
            foreach (var k in a.Kertomus.Where(k => k.Kohde != null))
                Oleta.Tosi(a.Kohteet.ContainsKey(k.Kohde), "kohde puuttuu: " + k.Kohde);
            var toba = a.Lisanostot.First(p => p.Tunnus == "toba");
            Oleta.Sama("paavirta", toba.Virta);
            Oleta.Sama(IhmisenMatkaAineisto.KuvaJuuri + "/nosto/toba.jpg", toba.Kuva);
        }

        [Testi] static void KertomusVastaaWebinVientia()
        {
            var a = Aineisto();
            var web = EsitysAjoTestitApu.WebinKertomus();
            Oleta.Sama(string.Join(",", web.Select(k => k.Id)), string.Join(",", a.Kertomus.Select(k => k.Id)));
            for (int i = 0; i < web.Count; i++)
            {
                Oleta.Sama(web[i].Vaihe, a.Kertomus[i].Vaihe, web[i].Id);
                Oleta.Sama(web[i].Kohde, a.Kertomus[i].Kohde, web[i].Id);
                Oleta.Sama(web[i].Alue, a.Kertomus[i].Alue, web[i].Id);
                Oleta.Sama(web[i].Vuosia, a.Kertomus[i].Vuosia, web[i].Id);
                Oleta.Sama(web[i].Teksti, a.Kertomus[i].Teksti, web[i].Id);
                Oleta.Sama(web[i].Pulu, a.Kertomus[i].Pulu, web[i].Id);
                Oleta.Sama(string.Join(",", web[i].Hiljaiset), string.Join(",", a.Kertomus[i].Hiljaiset), web[i].Id);
            }
        }

        [Testi] static void ManifestiJaAanite()
        {
            var m = Lue("kertomus-manifesti.json");
            var leimat = IhmisenMatkaAineisto.LueManifesti(m);
            Oleta.Sama(21, leimat.Count);
            Oleta.Sama(12200.0, leimat["avaus"].Kesto);
            Oleta.Sama(0.0, leimat["avaus"].Lauseet[0] - 0, "lauseet jakson alusta");
            Oleta.Tosi(leimat["avaus"].Sanat.Any(s => s.sana.StartsWith("Afrik")));
            Oleta.Sama("https://media.matkakirja.app/aikajana/ihmisen-matka/puhe/ihmisen-matka-kertomus.mp3",
                IhmisenMatkaAineisto.ManifestinAanite(m, "https://media.matkakirja.app/aikajana/ihmisen-matka/puhe/"));
        }
    }
}
