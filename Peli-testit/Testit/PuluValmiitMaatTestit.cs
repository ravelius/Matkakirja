// Pulun valmiit vastaukset maittain (PT 10.10.2026): Kreikan, Saksan, Italian, Romanian, Espanjan ja Alankomaiden paketit sellaisinaan ämpäristä
// (pulu/vastaukset/v1/<ISO3>.json = haarojen pulu-<maa>-pilvi-b paketit, tavu tavulta) natiivin lataajalla (Peli/PuluValmiit.cs).
// Linkit tarkistetaan kuten PuluChat näyttää ne (Kasitelinkit: KasiteKuvio, aihe ennen |-merkkiä, enintään 12 per vastaus,
// napautus kysyy "Kerro lisää: <aihe>" samassa kohdassa). Kohteet: Kultaiset/pulu-kohdat-v633.tsv = sisältöpaketin v633
// karttavalot (kohde:<id>) ja täkynostot (nosto:<id>) maineen, koska nostokortti hakee paketin nosto.Iso-maan mukaan.
// ./kaanna.sh PuluValmiitMaat
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Peli.Testit
{
    public static class PuluValmiitMaatTestit
    {
        static readonly Regex KasiteKuvio = new Regex(@"\[\[([^\[\]\n]{1,60})\]\]");   // = PuluChat.KasiteKuvio
        const int KasitteidenKatto = 12;                                                  // = PuluChat.KasitteidenKatto

        static string Lue(string tiedosto) => File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", tiedosto));

        static Dictionary<string, string> kohteet;
        static Dictionary<string, string> Kohteet => kohteet ??= Lue("pulu-kohdat-v633.tsv").Split('\n')
            .Where(r => r.Length > 0 && r[0] != '#').Select(r => r.Split('\t')).ToDictionary(r => r[0], r => r[1].Trim());

        /// <summary>Käsitelinkkien aiheet niin kuin chat ne linkittää (linkID ilman lainausmerkkejä).</summary>
        static IEnumerable<string> Linkit(string teksti) => KasiteKuvio.Matches(teksti).Cast<Match>()
            .Select(m => m.Groups[1].Value.Trim()).Where(k => k.Length > 0)
            .Select(k => { int p = k.IndexOf('|'); string a = (p < 0 ? k : k.Substring(0, p)).Trim(); return (a.Length > 0 ? a : k.Substring(p + 1).Split('|')[^1].Trim()).Replace("\"", ""); })
            .Take(KasitteidenKatto);

        static readonly HashSet<string> PurettujenJaanteet = new HashSet<string>
        {
            "nosto:pariisin-vuosisadat / michel chasles'lle",                                        // FRA (linkki nyt [[Chasles]])
            "kohde:kreetanmeri / iraklion", "kohde:knossos / iraklionista",                         // GRC (raportti: tarkistimen "Irak")
            "kohde:cordoban-moskeijakatedraali / mekkaa",                                            // ESP
            "kohde:hahmotelma-hoorn / itä-intian kauppakomppanian", "kohde:hahmotelma-nuenen / perunansyöjät",
            "kohde:hahmotelma-enkhuizen / itä-intian merikaupan",                                     // NLD
        };

        // TUNNETUT VIAT (raportoitu NUI:lle ja PT:lle 10.10.2026 klo 01.1x): jatkosiru näyttää tekstin sellaisenaan (PuluChat.Sirut),
        // joten [[…]] näkyisi pelaajalle hakasulkeina. Poista rivi, kun paketti tai lataaja on korjattu (testi kertoo, jos rivi vanhenee).
        static readonly HashSet<string> TunnetutRikkinaisetJatkot = new HashSet<string>
        {
            "kohde:hahmotelma-saint-cloud / Millaisia [[Ranskan]] puutarhoja 1600-luvulla suunniteltiin?",   // FRA
            "kohde:hahmotelma-retezat / Mitä [[kultakotka]] syö Retezatissa?",                              // ROU
            "kohde:hahmotelma-ceahlau / Mitä [[uhanalaiset lajit]] tarkoittavat?",                          // ROU
        };

        static void Maa(string maa, int kohtia, int kysymyksia, int lisaa)
        {
            string json = Lue("pulu-" + maa.ToLowerInvariant() + ".json");
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var p = PuluValmiit.Lue(json);
            System.Console.WriteLine($"      {maa}: jäsennys {json.Length / 1024} kt {kello.ElapsedMilliseconds} ms (Mac)");
            Oleta.Tosi(p != null, maa + " paketti");
            Oleta.Sama(maa, p.Maa);
            Oleta.Sama(kohtia, p.Kohdat.Count, maa + " kohtia");
            Oleta.Sama(kysymyksia, p.Kohdat.Values.Sum(k => k.Kysymykset.Count), maa + " kysymysvastauksia");
            Oleta.Sama(lisaa, p.Kohdat.Values.Sum(k => k.Lisaa.Count), maa + " Kerro lisää -vastauksia");
            // Paketin oma laskuri = luettu määrä (mikään vastaus ei pudonnut jäsennyksessä).
            var juuri = (Dictionary<string, object>)MiniJson.Jasenna(json);
            Oleta.Sama(System.Convert.ToInt32(MiniJson.Kentta(juuri, "vastauksia")), p.Vastauksia, maa + " vastauksia-kenttä");

            int linkkeja = 0, toisenTason = 0, toisenTasonValmiit = 0, jatkoja = 0, jatkoValmiiseen = 0;
            foreach (var (id, k) in p.Kohdat.Select(x => (x.Key, x.Value)))
            {
                // Kohde on pelissä ja saman maan kortissa (muuten nostokortti hakisi toisen maan paketin eikä vastaus näkyisi).
                Oleta.Tosi(Kohteet.TryGetValue(id, out var kohteenMaa), maa + ": kohde puuttuu sisällöstä: " + id);
                Oleta.Sama(maa, kohteenMaa, id + " kortin maa");
                Oleta.Sama(5, k.Kysymykset.Count, id + " kysymyksiä");
                var kysymykset = new HashSet<string>(k.Kysymykset.Select(v => v.Kysymys));
                foreach (var (v, taso1) in k.Kysymykset.Select(v => (v, true)).Concat(k.Lisaa.Values.Select(v => (v, false))))
                {
                    string missa = id + " / " + v.Kysymys;
                    Oleta.Tosi(v.Teksti.Length > 80, missa + ": vastaus lyhyt tai tyhjä");
                    // Katkennut merkintä näkyisi pelaajalle hakasulkeina tai söisi tekstiä.
                    Oleta.Sama(Regex.Matches(v.Teksti, @"\[\[").Count, Regex.Matches(v.Teksti, @"\]\]").Count, missa + ": [[ ]] parittomat");
                    Oleta.Tosi(Regex.Matches(v.Teksti, @"\[\[").Count == KasiteKuvio.Matches(v.Teksti).Count, missa + ": linkki ei osu kuvioon (yli 60 merkkiä tai rivinvaihto)");
                    Oleta.Tosi(KasiteKuvio.Matches(v.Teksti).Count <= KasitteidenKatto, missa + ": yli 12 linkkiä");
                    foreach (string a in Linkit(v.Teksti))
                    {
                        bool valmis = p.Vastaa(id, PuluValmiit.KerroLisaaAlku + a) != null;
                        if (taso1) { linkkeja++; Oleta.Tosi(valmis, missa + ": linkillä ei valmista vastausta: " + a); }
                        else { toisenTason++; if (valmis) toisenTasonValmiit++; }
                    }
                    // Jatkot: kaksi napautettavaa kysymystä, ehjiä (ei linkkimerkintöjä, kysymysmerkki lopussa, mahtuvat siruun).
                    Oleta.Sama(2, v.Jatkot.Count, missa + ": jatkoja");
                    foreach (string j in v.Jatkot)
                    {
                        jatkoja++;
                        bool ehja = j.Length >= 8 && j.Length <= 70 && j.EndsWith("?") && !j.Contains("[[") && !j.Contains("]]");
                        if (TunnetutRikkinaisetJatkot.Contains(id + " / " + j)) { tunnetut.Add(id + " / " + j); Oleta.Tosi(!ehja, "tunnettu vika korjattu, poista listalta: " + j); }
                        else Oleta.Tosi(ehja, missa + ": jatko rikki: " + j);
                        Oleta.Tosi(j != v.Kysymys, missa + ": jatko = sama kysymys");
                        if (kysymykset.Contains(j)) jatkoValmiiseen++;
                    }
                }
                // Jokaiselle Kerro lisää -vastaukselle on linkki jostain kohdan kysymysvastauksesta (muuten se on saavuttamaton).
                // Sallitut = pistokoekorjauksissa puretut linkit, joiden vastaus jäi pakettiin (haitaton, vain turha data).
                var linkatut = new HashSet<string>(k.Kysymykset.SelectMany(v => Linkit(v.Teksti)).Select(PuluValmiit.Avain));
                foreach (var l in k.Lisaa.Keys.Where(l => !linkatut.Contains(l)))
                    Oleta.Tosi(PurettujenJaanteet.Contains(id + " / " + l), id + ": saavuttamaton Kerro lisää: " + l);
            }
            System.Console.WriteLine($"      {maa}: linkit {linkkeja} (kaikki valmiita), 2. tason linkit {toisenTason} (valmiita {toisenTasonValmiit}, muut livenä), " +
                $"jatkot {jatkoja} (valmiiseen kysymykseen {jatkoValmiiseen}, muut livenä)");
        }

        static readonly HashSet<string> tunnetut = new HashSet<string>();

        [Testi] static void RanskanPaketti() => Maa("FRA", 59, 295, 654);
        [Testi] static void KreikanPaketti() => Maa("GRC", 78, 390, 930);
        [Testi] static void SaksanPaketti() => Maa("DEU", 65, 325, 796);
        [Testi] static void ItalianPaketti() => Maa("ITA", 63, 315, 763);
        [Testi] static void RomanianPaketti() => Maa("ROU", 56, 280, 657);
        [Testi] static void EspanjanPaketti() => Maa("ESP", 56, 280, 599);
        [Testi] static void AlankomaidenPaketti() => Maa("NLD", 54, 270, 620);

        // Ämpärin hakemisto: kaikki seitsemän maata, ja versio = paketin luontiaika minuutteina (UTC), joten laite hakee juuri tämän paketin.
        [Testi] static void HakemistoKaikkiMaat()
        {
            var h = PuluValmiit.LueHakemisto(Lue("pulu-maat.json"));
            Oleta.Tosi(h != null, "hakemisto");
            Oleta.Sama("DEU,ESP,FRA,GRC,ITA,NLD,ROU", string.Join(",", h.Keys.OrderBy(x => x, System.StringComparer.Ordinal)));
            foreach (string maa in new[] { "GRC", "DEU", "ITA", "FRA", "ROU", "ESP", "NLD" })
            {
                var juuri = (Dictionary<string, object>)MiniJson.Jasenna(Lue("pulu-" + maa.ToLowerInvariant() + ".json"));
                string luotu = MiniJson.Teksti(juuri, "luotu");
                Oleta.Sama(Regex.Replace(luotu.Substring(0, 16), "[^0-9]", ""), h[maa], maa + " versio = luotu");
            }
        }
    }
}
