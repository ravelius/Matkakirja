// Kielitaulu (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys): haku, varakieli, muotoilu ja natiivin fi.json.
using System.Linq;

namespace Matkakirja.Linssit.Testit
{
    public static class KielitauluTestit
    {
        const string Fi = "{\"kieli\":\"fi\",\"tekstit\":{\"a.tervehdys\":\"Hei\",\"a.nimi\":\"Hei {0}!\",\"a.vain-fi\":\"Vain suomeksi\"}}";
        const string En = "{\"kieli\":\"en\",\"tekstit\":{\"a.tervehdys\":\"Hello\",\"a.nimi\":\"Hello {0}!\"}}";

        [Testi] static void HakuJaMuotoilu()
        {
            var fi = Kielitaulu.Lue(Fi);
            Oleta.Tosi(fi != null && fi.Kieli == "fi" && fi.Maara == 3, "luettu");
            Oleta.Tosi(fi.T("a.tervehdys") == "Hei", fi.T("a.tervehdys"));
            Oleta.Tosi(fi.T("a.nimi", null, "Fogg") == "Hei Fogg!", fi.T("a.nimi", null, "Fogg"));
        }

        [Testi] static void PuuttuvaKaannosSuomeksiJaPuuttuvaAvainNakyy()
        {
            Kielitaulu fi = Kielitaulu.Lue(Fi), en = Kielitaulu.Lue(En);
            Oleta.Tosi(en.T("a.nimi", fi, "Fogg") == "Hello Fogg!", "englanti");
            Oleta.Tosi(en.T("a.vain-fi", fi) == "Vain suomeksi", "puuttuva käännös → suomi");
            Oleta.Tosi(en.T("ei.ole", fi) == "ei.ole", "puuttuva avain → avain");
        }

        [Testi] static void RikkiOlevaTauluJaMuotoilu()
        {
            Oleta.Tosi(Kielitaulu.Lue("{ei json") == null && Kielitaulu.Lue("{\"kieli\":\"fi\"}") == null, "väärä muoto → null");
            var t = Kielitaulu.Lue("{\"tekstit\":{\"x\":\"{0} ja {1\"}}");
            Oleta.Tosi(t.T("x", null, "a") == "{0} ja {1", "rikkinäinen muotoilu → teksti sellaisenaan");
        }

        [Testi] static void NatiivinSuomenTaulu()
        {
            var fi = Kielitaulu.Lue(System.IO.File.ReadAllText("../Assets/Matkakirja/UI/Resources/Kieli/fi.json"));
            Oleta.Tosi(fi != null && fi.Kieli == "fi" && fi.Maara >= 100, $"fi.json: {fi?.Maara}");
            var tyhjat = fi.Avaimet.Where(a => string.IsNullOrWhiteSpace(fi.T(a))).ToList();
            Oleta.Tosi(tyhjat.Count == 0, "tyhjät tekstit: " + string.Join(", ", tyhjat));
            Oleta.Tosi(fi.Avaimet.All(a => System.Text.RegularExpressions.Regex.IsMatch(a, @"^[a-z]+(\.[a-z0-9\-]+)+$")), "avainmuoto");
        }
    }
}
