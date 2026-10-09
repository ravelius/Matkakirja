// Pulun valmiit vastaukset (Peli/PuluValmiit.cs): Ranskan pilottipaketti (Kultaiset/pulu-fra-pilotti.json = Pariisin 10 kohtaa × 5,
// Sonnet effort low, tools/pulu-esigenerointi/koosta.mjs) ja käsin tehty linkkitaso. ./kaanna.sh PuluValmiit
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class PuluValmiitTestit
    {
        static PuluValmiit Pilotti => PuluValmiit.Lue(File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "pulu-fra-pilotti.json")));

        [Testi] static void RanskanPakettiLuetaan()
        {
            var p = Pilotti;
            Oleta.Tosi(p != null, "paketti");
            Oleta.Sama("FRA", p.Maa);
            Oleta.Sama(10, p.Kohdat.Count);
            Oleta.Tosi(p.Kohdat.Values.All(k => k.Kysymykset.Count == 5), "5 kysymystä per kohta");
            Oleta.Tosi(p.Kohdat.Values.SelectMany(k => k.Kysymykset).All(v => v.Jatkot.Count == 2 && v.Teksti.Contains("[[")), "2 jatkoa ja käsitteet");
            Oleta.Sama(50, p.Vastauksia);
        }

        [Testi] static void ValmisKysymysJaTuntematon()
        {
            var p = Pilotti;
            var v = p.Vastaa("nosto:lustig-eiffel", "  Miten Eiffel-tornin romukauppa saatiin kuulostamaan uskottavalta? ");
            Oleta.Tosi(v != null && v.Teksti.Length > 100, "valmis vastaus (trim)");
            Oleta.Sama(null, p.Vastaa("nosto:lustig-eiffel", "Mikä on Pariisin väkiluku?"), "vapaa kysymys → live");
            Oleta.Sama(null, p.Vastaa("kohde:eiole", "Miten Eiffel-tornin romukauppa saatiin kuulostamaan uskottavalta?"), "tuntematon kohta");
            Oleta.Sama(null, p.Vastaa(null, "x"), "ei kohtaa");
        }

        [Testi] static void KerroLisaaLinkkitaso()
        {
            var p = PuluValmiit.Lue(@"{""$skeema"":""matkakirja-pulu-vastaukset/1"",""maa"":""FRA"",""kohdat"":{""kohde:bastilji"":{
              ""kysymykset"":[{""kysymys"":""Miksi Bastiljista tuli vertauskuva?"",""vastaus"":""[[Ludvig XVI]] ja [[Bastilji]]."",""jatkot"":[""A?"",""B?""]}],
              ""lisaa"":{""ludvig xvi"":{""kasite"":""Ludvig XVI"",""vastaus"":""Kuningas."",""jatkot"":[""C?"",""D?""]}}}}}");
            Oleta.Sama("Ludvig XVI", PuluValmiit.KerroLisaa("Kerro lisää: Ludvig XVI"));
            Oleta.Sama(null, PuluValmiit.KerroLisaa("Kerro lisää:"), "tyhjä käsite");
            Oleta.Sama("Kuningas.", p.Vastaa("kohde:bastilji", "Kerro lisää: ludvig  XVI")?.Teksti, "avain pienillä, välit siistitty");
            Oleta.Tosi(p.OnLisaa("kohde:bastilji", "Ludvig XVI"), "linkki on");
            Oleta.Tosi(!p.OnLisaa("kohde:bastilji", "Bastilji"), "linkkiä ei ole (ei 2. tasoa)");
            Oleta.Sama(null, p.Vastaa("kohde:bastilji", "Kerro lisää: Bastilji"), "ei valmista → live kehittäjälle");
            Oleta.Sama(2, p.Vastaa("kohde:bastilji", "Kerro lisää: Ludvig XVI").Jatkot.Count);
        }

        // Ranskan paketti (pulu-ranska-pilvi caea0c2cd: pilviajo Sonnet effort low + Sisältökirjurin pistokoekorjaukset): 59 × 5 + linkit 654.
        [Testi] static void RanskanKokoPaketti()
        {
            string json = File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "pulu-fra.json"));
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var p = PuluValmiit.Lue(json);
            long ms = kello.ElapsedMilliseconds;
            System.Console.WriteLine($"      jäsennys {json.Length / 1024} kt: {ms} ms (Mac)");
            Oleta.Tosi(p != null, "paketti");
            Oleta.Sama(59, p.Kohdat.Count);
            Oleta.Sama(949, p.Vastauksia);   // 295 + 654 (Sisältökirjurin korjaus caea0c2cd)
            Oleta.Tosi(p.Kohdat.Values.All(k => k.Kysymykset.Count == 5), "5 kysymystä per kohta");
            // Jokainen kysymysvastauksen [[käsite]] avaa valmiin Kerro lisää -vastauksen (linkkitaso kattava).
            var kuvio = new System.Text.RegularExpressions.Regex(@"\[\[([^\[\]\n]{1,60})\]\]");
            int linkkeja = 0;
            foreach (var (id, k) in p.Kohdat.Select(x => (x.Key, x.Value)))
                foreach (var v in k.Kysymykset)
                    foreach (System.Text.RegularExpressions.Match m in kuvio.Matches(v.Teksti))
                    {
                        string kasite = m.Groups[1].Value.Split('|')[0].Trim();
                        linkkeja++;
                        Oleta.Tosi(p.Vastaa(id, PuluValmiit.KerroLisaaAlku + kasite) != null, id + " / " + kasite);
                    }
            Oleta.Tosi(linkkeja > 700, "linkkejä " + linkkeja);
            Oleta.Tosi(p.Kohdat.Values.SelectMany(k => k.Kysymykset.Concat(k.Lisaa.Values)).All(v => v.Jatkot.Count == 2 && v.Jatkot.All(j => j.Length <= 70)), "jatkot");
        }

        [Testi] static void HakemistoJaRikkinaiset()
        {
            var h = PuluValmiit.LueHakemisto(@"{""maat"":{""fra"":""1"",""ITA"":2}}");
            Oleta.Sama("1", h["FRA"]);
            Oleta.Sama("2", h["ITA"]);
            Oleta.Sama(null, PuluValmiit.LueHakemisto("ei json"));
            Oleta.Sama(null, PuluValmiit.Lue(@"{""$skeema"":""muu"",""kohdat"":{}}"), "väärä skeema");
            Oleta.Sama(null, PuluValmiit.Lue(""));
            var p = PuluValmiit.Lue(@"{""$skeema"":""matkakirja-pulu-vastaukset/1"",""kohdat"":{""k"":{""kysymykset"":[{""kysymys"":""Q?"",""vastaus"":""""}]}}}");
            Oleta.Sama(0, p.Kohdat.Count, "tyhjä vastaus ohitetaan, kohta ilman vastauksia pois");
        }
    }
}
