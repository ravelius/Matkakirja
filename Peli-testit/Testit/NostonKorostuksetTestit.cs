// Nostokortin korostetut sanat Pulun valmiisiin vastauksiin (PT 10.10.2026, Pelikoodarin löydös Nostokortti.cs:873): korostuksen
// napautus kysyy PuluValmiit.KerroLisaaKysymys(perus), ja valmis vastaus löytyy kohdan lisaa-taulusta, kun käsite on siellä.
// Valmiisiin on generoitu vain vastausten [[linkit]] (Pelikoodari), joten osa korostuksista osuu ja loput menevät liveen:
// GRC 29/92, DEU 10/61, ITA 17/66 (kohdat paketissa). Vanha muoto "Kerro lisää: X (kohteessa Y)" ei osunut yhteenkään.
// Kultaiset: pulu-<maa>.json = ämpärin paketit (sama kuin PuluValmiitMaatTestit), pulu-korostukset-v633.tsv = sisältöpaketin v633
// fokuskohteiden, maastokohteiden ja hahmotelmien korostukset (perus-osa) kohdittain.
// ./kaanna.sh NostonKorostukset
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class NostonKorostuksetTestit
    {
        static string Lue(string tiedosto) => File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", tiedosto));

        static void Maa(string maa, int paketissa, int osuu)
        {
            var p = PuluValmiit.Lue(Lue("pulu-" + maa.ToLowerInvariant() + ".json"));
            Oleta.Tosi(p != null, maa + " paketti");
            var rivit = Lue("pulu-korostukset-v633.tsv").Split('\n').Where(r => r.Length > 0 && r[0] != '#').Select(r => r.Split('\t'))
                .Where(r => r.Length == 3 && r[1] == maa && p.Kohdat.ContainsKey(r[0])).ToList();
            int uusi = rivit.Count(r => p.Vastaa(r[0], PuluValmiit.KerroLisaaKysymys(r[2])) != null);
            int vanha = rivit.Count(r => p.Vastaa(r[0], $"Kerro lisää: {r[2]} (kohteessa X)") != null);
            System.Console.WriteLine($"      {maa}: korostuksia paketin kohdissa {rivit.Count}, valmis vastaus {uusi} (vanhalla muodolla {vanha}), muut livenä");
            Oleta.Sama(paketissa, rivit.Count, maa + " korostuksia paketin kohdissa");
            Oleta.Sama(osuu, uusi, maa + " korostuksia valmiilla vastauksella");
            Oleta.Sama(0, vanha, maa + " vanha kysymysmuoto osui");
            // Jokainen osuma on sama vastaus, jonka chatin käsitelinkki samalle käsitteelle avaisi.
            foreach (var r in rivit.Where(r => p.OnLisaa(r[0], r[2])))
                Oleta.Tosi(p.Vastaa(r[0], PuluValmiit.KerroLisaaKysymys(r[2])) != null, r[0] + " / " + r[2]);
        }

        [Testi] static void KreikanKorostukset() => Maa("GRC", 92, 29);
        [Testi] static void SaksanKorostukset() => Maa("DEU", 61, 10);
        [Testi] static void ItalianKorostukset() => Maa("ITA", 66, 17);

        // Jatkokysymysten [[ ]] puretaan lukuvaiheessa (PuluValmiit.PuraLinkit): siru ja liveen lähtevä kysymys ovat puhtaita.
        [Testi] static void JatkojenLinkitPuretaan()
        {
            Oleta.Sama("Mitä kultakotka syö?", PuluValmiit.PuraLinkit("Mitä [[kultakotka]] syö?"));
            Oleta.Sama("Millaisia Ranskan puutarhoja?", PuluValmiit.PuraLinkit("Millaisia [[Ranska|Ranskan]] puutarhoja?"));
            var tunnetut = new[]
            {
                ("FRA", "kohde:hahmotelma-saint-cloud", "Millaisia Ranskan puutarhoja 1600-luvulla suunniteltiin?"),
                ("ROU", "kohde:hahmotelma-retezat", "Mitä kultakotka syö Retezatissa?"),
                ("ROU", "kohde:hahmotelma-ceahlau", "Mitä uhanalaiset lajit tarkoittavat?"),
            };
            foreach (var (maa, kohta, puhdas) in tunnetut)
            {
                var p = PuluValmiit.Lue(Lue("pulu-" + maa.ToLowerInvariant() + ".json"));
                Oleta.Tosi(p != null && p.Kohdat.ContainsKey(kohta), maa + " " + kohta);
                var jatkot = p.Kohdat[kohta].Kysymykset.Concat(p.Kohdat[kohta].Lisaa.Values).SelectMany(v => v.Jatkot).ToList();
                Oleta.Tosi(jatkot.Contains(puhdas), kohta + ": puhdas jatko puuttuu: " + puhdas);
            }
            // Kaikissa paketeissa: yksikään jatko ei sisällä merkintöjä.
            foreach (string maa in new[] { "FRA", "GRC", "DEU", "ITA", "ROU" })
            {
                var p = PuluValmiit.Lue(Lue("pulu-" + maa.ToLowerInvariant() + ".json"));
                foreach (var k in p.Kohdat)
                    foreach (var v in k.Value.Kysymykset.Concat(k.Value.Lisaa.Values))
                        foreach (string j in v.Jatkot)
                            Oleta.Tosi(!j.Contains("[[") && !j.Contains("]]") && !j.Contains("|"), maa + " " + k.Key + ": jatkossa merkintä: " + j);
            }
        }

        [Testi] static void KysymysPurkautuuKasitteeksi()
        {
            Oleta.Sama("Bysantti", PuluValmiit.KerroLisaa(PuluValmiit.KerroLisaaKysymys(" Bysantti ")));
            Oleta.Sama("bysantti", PuluValmiit.Avain(PuluValmiit.KerroLisaa(PuluValmiit.KerroLisaaKysymys("Bysantti"))));
        }
    }
}
