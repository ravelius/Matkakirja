// HISTORIAMOOTTORI (Siirtoseppä 7.10.2026): tietokerroksen kortit — huoneittain avautuvat, loppukortit, jo avatut, numero merkkijonona.
using System;
using System.Linq;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class TietokerrosTestit
    {
        const string Json = "{\"versio\": 1, \"kortit\": [" +
            "{\"id\": \"kyronsalmi\", \"numero\": \"1\", \"otsikko\": \"Kyrönsalmi\", \"lyhyt\": \"Kyrönsalmi\", \"teksti\": \"t\", \"avautuu\": {\"tyyppi\": \"huone\", \"huoneet\": [1]}}," +
            "{\"id\": \"keittio\", \"numero\": 4, \"otsikko\": \"Keittiö ja ruoka\", \"teksti\": \"t\", \"avautuu\": {\"tyyppi\": \"huone\", \"huoneet\": [3]}}," +
            "{\"id\": \"piha\", \"numero\": 3, \"otsikko\": \"Pikkupiha\", \"lyhyt\": \"Perustamistaulu\", \"teksti\": \"t\", \"avautuu\": {\"tyyppi\": \"huone\", \"huoneet\": [3]}}," +
            "{\"id\": \"keksittya\", \"numero\": 12, \"otsikko\": \"Mikä oli keksittyä?\", \"teksti\": \"t\", \"avautuu\": {\"tyyppi\": \"loppu\"}}]}";

        [Testi] static void HuoneetJaLoppu()
        {
            var t = Tietokerros.Lue(Json);
            Oleta.Sama(4, t.Kortit.Count);
            Oleta.Sama("piha", t.Kortit[1].Id);   // numerojärjestys (3 ennen 4)
            Oleta.Sama("Keittiö ja ruoka", t.Kortit.First(k => k.Id == "keittio").Lyhyt);   // lyhyt puuttuu → otsikko
            var h3 = t.Huone(3);
            Oleta.Tosi(h3.Count == 2 && h3[0].Id == "piha", "huone 3 avaa kaksi korttia järjestyksessä");
            Oleta.Sama(0, t.Huone(3).Count);   // ei uudelleen
            Oleta.Sama(0, t.Huone(5).Count);
            var l = t.Loppu();
            Oleta.Tosi(l.Count == 2 && l.Any(k => k.Id == "keksittya") && l.Any(k => k.Id == "kyronsalmi"), "loppu avaa loput");
        }

        [Testi] static void JoAvatutSailyvat()
        {
            var t = Tietokerros.Lue(Json, new[] { "kyronsalmi" });
            Oleta.Tosi(t.Auki("kyronsalmi") && t.Huone(1).Count == 0, "tallennettu avattu ei avaudu uudelleen");
            Oleta.Sama(0, Tietokerros.Lue("rikki").Kortit.Count);
        }
    }
}
