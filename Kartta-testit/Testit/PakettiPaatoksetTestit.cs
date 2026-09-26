// Sisältöpaketin taustapäivitys (Kartta/PakettiPaatokset.cs, Siirtoseppä). Oikea paketti:
// PAKETTI_KOE=<versiokansio, jossa hakemisto.json ja osoitin.json> ./kaanna.sh PakettiPaatokset
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class PakettiPaatoksetTestit
    {
        const string A = "559aead08264d5795d3909718cdd05abd49572e84fe55590eef31a88a08fdffd"; // sha256("A")
        const string B = "df7e70e5021544f4834bbee64a9e3789febc4be81470df629cad6ddb03320a5c"; // sha256("B")

        static PakettiPaatokset.Rivi R(string polku, string sha) => new PakettiPaatokset.Rivi { Polku = polku, Sha256 = sha, Tavuja = 1 };

        [Testi]
        static void TiivisteSamaKuinJulkaisussa()
        {
            // node: sha256("kokoelmat/b.json\t" + B + "\nkokoelmat/ä.json\t" + A + "\nmanifest.json\t" + A + "\n"), JS:n sort-järjestys.
            var rivit = new[] { R("manifest.json", A), R("kokoelmat/ä.json", A), R("kokoelmat/b.json", B) };
            Oleta.Sama("ecc15ffa14ee891c48498d0e934037f9537ea3c7309dea38ad3413136e8577b8", PakettiPaatokset.PaketinTiiviste(rivit));
            Oleta.Sama(A, PakettiPaatokset.Sha256(Encoding.UTF8.GetBytes("A")));
        }

        [Testi]
        static void OsoitinJaTasoittain()
        {
            var o = PakettiPaatokset.LueOsoitin("{\"versio\":108,\"polku\":\"sisalto/1/v108/\",\"sha256\":\"x\",\"skeemaversio\":\"1.46\","
                + "\"minSovellus\":{\"ios\":2,\"web\":null},\"hakemisto\":{\"polku\":\"hakemisto.json\",\"sha256\":\"h\",\"tavuja\":80237},"
                + "\"tavuja\":110,\"siirto\":22,\"tasoittain\":{\"ios\":{\"1\":107,\"2\":108}}}");
            Oleta.Sama(108, o.Versio);
            Oleta.Sama("h", o.HakemistoSha256);
            Oleta.Sama(107, PakettiPaatokset.KohdeVersio(o, 1), "vanha taso jää viimeiseen kelpaavaan");
            Oleta.Sama(108, PakettiPaatokset.KohdeVersio(o, 2));
            Oleta.Sama(108, PakettiPaatokset.KohdeVersio(o, 3), "tasoa ei kartassa, minSovellus ≤ taso");
            var vanha = PakettiPaatokset.LueOsoitin("{\"versio\":121,\"polku\":\"sisalto/1/v121/\",\"sha256\":\"x\",\"minSovellus\":{\"ios\":1,\"web\":null}}");
            Oleta.Sama(121, PakettiPaatokset.KohdeVersio(vanha, 1), "osoitin ennen vaihetta 1");
            Oleta.Sama(0, PakettiPaatokset.KohdeVersio(PakettiPaatokset.LueOsoitin("{\"versio\":5,\"polku\":\"sisalto/1/v5/\",\"minSovellus\":{\"ios\":3}}"), 1));
            Oleta.Sama("sisalto/1/v106/", PakettiPaatokset.VersionPolku("sisalto/1/v107/", 106));
            Oleta.Sama(107, PakettiPaatokset.VersioPolusta("/var/x/sisalto/1/v107"));
        }

        [Testi]
        static void HakemistonTarkistus()
        {
            var json = "{\"$skeema\":\"matkakirja-vienti/hakemisto\",\"tiedostot\":[{\"polku\":\"kokoelmat/b.json\",\"sha256\":\"" + B + "\",\"tavuja\":1,\"siirto\":5},"
                + "{\"polku\":\"kokoelmat/ä.json\",\"sha256\":\"" + A + "\",\"tavuja\":1,\"siirto\":5},{\"polku\":\"manifest.json\",\"sha256\":\"" + A + "\",\"tavuja\":1,\"siirto\":5}]}\n";
            var tavut = Encoding.UTF8.GetBytes(json);
            var o = new PakettiPaatokset.Osoitin { Versio = 1, Polku = "sisalto/1/v1/", HakemistoSha256 = PakettiPaatokset.Sha256(tavut),
                Sha256 = "ecc15ffa14ee891c48498d0e934037f9537ea3c7309dea38ad3413136e8577b8" };
            Oleta.Sama(null, PakettiPaatokset.TarkistaHakemisto(o, tavut, out var rivit));
            Oleta.Sama(3, rivit.Count);
            Oleta.Sama(2, PakettiPaatokset.Puuttuvat(rivit, _ => false).Count, "sama sha kerran");
            Oleta.Sama(1, PakettiPaatokset.Puuttuvat(rivit, sha => sha == A).Count);
            tavut[tavut.Length - 2] = (byte)' ';
            Oleta.Tosi(PakettiPaatokset.TarkistaHakemisto(o, tavut, out _) != null, "muutettu hakemisto hylätään");
            o.HakemistoSha256 = null;
            Oleta.Tosi(PakettiPaatokset.TarkistaHakemisto(o, tavut, out _) != null, "ei hakemistoa osoittimessa");
        }

        [Testi]
        static void KayttoonottoJaPalautus()
        {
            var valmiit = new HashSet<int> { 105, 106 };
            Oleta.Sama(106, PakettiPaatokset.ValitseKaytto(106, 105, valmiit), "kohde valmis");
            Oleta.Sama(105, PakettiPaatokset.ValitseKaytto(107, 105, valmiit), "kohde kesken: käytössä oleva jatkaa");
            Oleta.Sama(105, PakettiPaatokset.ValitseKaytto(105, 106, valmiit), "palautus ilman latausta");
            Oleta.Sama(0, PakettiPaatokset.ValitseKaytto(104, 106, valmiit), "palautus versioon, jota ei ole: laiska tila");
            Oleta.Sama(0, PakettiPaatokset.ValitseKaytto(107, 0, new HashSet<int>()), "ensimmäinen käynnistys");
            Oleta.Sama(106, PakettiPaatokset.ValitseKaytto(0, 106, valmiit), "ei sopivaa kohdetta: käytössä oleva");
        }

        [Testi]
        static void SiivousViittauksin()
        {
            var s = PakettiPaatokset.Sailytettavat(106, new[] { 103, 105, 106 }, new[] { 104, 107 });
            Oleta.Sama("105,106,107", string.Join(",", s.OrderBy(v => v)));
            var h105 = new[] { R("a", A) }; var h106 = new[] { R("a", A), R("b", B) };
            var orvot = PakettiPaatokset.Orvot(new[] { A, B, "c" }, new[] { h105, h106 });
            Oleta.Sama("c", string.Join(",", orvot));
            Oleta.Sama(2, PakettiPaatokset.Sailytettavat(0, new[] { 1 }, new[] { 2 }).Count, "ilman käytössä olevaa ei poisteta mitään");
        }

        [Testi]
        static void OikeaPaketti()
        {
            string kansio = Environment.GetEnvironmentVariable("PAKETTI_KOE");
            if (string.IsNullOrEmpty(kansio)) { Console.WriteLine("      (PAKETTI_KOE puuttuu, ohitetaan)"); return; }
            var o = PakettiPaatokset.LueOsoitin(File.ReadAllText(Path.Combine(kansio, "osoitin.json")));
            var t0 = DateTime.UtcNow;
            string virhe = PakettiPaatokset.TarkistaHakemisto(o, File.ReadAllBytes(Path.Combine(kansio, "hakemisto.json")), out var rivit);
            Oleta.Sama(null, virhe);
            Console.WriteLine($"      v{o.Versio}: {rivit.Count} tiedostoa, tarkistus {(DateTime.UtcNow - t0).TotalMilliseconds:0} ms");
            foreach (var r in rivit.Take(40))
            {
                string p = Path.Combine(kansio, r.Polku);
                using (var f = File.OpenRead(p)) Oleta.Sama(r.Sha256, PakettiPaatokset.Sha256(f), r.Polku);
            }
        }
    }
}
