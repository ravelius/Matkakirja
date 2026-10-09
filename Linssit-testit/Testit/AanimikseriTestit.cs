// Äänimikseri ja äänirekisteri (omistaja 9.10.2026 klo 09.5x; Pelikoodarin skeema 1): kontekstit, perus × ryhmä × ääni,
// oma → yhteinen → 1, workerin muoto ja tallennusrunko.
using System.Linq;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class AanimikseriTestit
    {
        static bool Lahes(float a, float b) => System.Math.Abs(a - b) < 0.001f;

        [Testi] static void PerustasotJaKontekstit()
        {
            var m = new Aanimikseri();
            Oleta.Tosi(Lahes(m.Ryhma("pallo", "puhe"), 0.9f) && Lahes(m.Ryhma("pallo", "musiikki"), 0.35f) && Lahes(m.Ryhma("pallo", "tehosteet"), 1f), "perus");
            m.Aseta(Aanimikseri.RyhmaAvain("pallo", "tehosteet"), 0.5f);
            Oleta.Tosi(Lahes(m.Ryhma("pallo", "tehosteet"), 0.5f) && Lahes(m.Ryhma("linna", "tehosteet"), 1f), "konteksteittain");
            m.AsetaNyt("pallo");
            Oleta.Tosi(Lahes(m.Kerroin("tehosteet"), 0.5f), "nykyinen konteksti");
            m.AsetaNyt("linna");
            Oleta.Tosi(Lahes(m.Kerroin("tehosteet"), 1f), "vaihto");
            m.Aseta(Aanimikseri.RyhmaAvain("linna", "musiikki"), 2f);
            Oleta.Tosi(Lahes(m.Kerroin("musiikki"), 0.7f), "kerroin perustason päälle (0,35 × 2)");
            m.Aseta(Aanimikseri.RyhmaAvain("linna", "puhe"), 4f);
            Oleta.Tosi(Lahes(m.Kerroin("puhe"), 1f), "rajattu 1:een");
        }

        [Testi] static void RyhmaKertaaAani()
        {
            var m = new Aanimikseri();
            m.AsetaNyt("pallo");
            m.Aseta(Aanimikseri.RyhmaAvain("pallo", "maisema"), 0.8f);
            m.Aseta(Aanimikseri.AaniAvain("pallo", "lokit"), 0.5f);
            Oleta.Tosi(Lahes(m.Kerroin("maisema", "lokit"), 0.4f) && Lahes(m.Kerroin("maisema", "kyyhkyt"), 0.8f), "0,8 × 0,5 ja 0,8 × 1");
        }

        const string Worker = "{\"versio\":3,\"skeema\":1,\"paivitetty\":\"2026-10-09\",\"tasot\":{\"pallo\":{\"ryhmat\":{\"tehosteet\":0.7},\"aanet\":{\"lokit\":0.4}},\"linna\":{\"ryhmat\":{\"puhe\":1.5}}}}";

        [Testi] static void OmaYhteinenPerus()
        {
            var m = new Aanimikseri();
            Oleta.Tosi(m.LueYhteiset(Worker), "luettu");
            Oleta.Tosi(m.YhteisetVersio == 3 && Lahes(m.RyhmaKerroin("pallo", "tehosteet"), 0.7f) && Lahes(m.AaniKerroin("pallo", "lokit"), 0.4f)
                && Lahes(m.RyhmaKerroin("linna", "puhe"), 1.5f) && Lahes(m.RyhmaKerroin("iss", "puhe"), 1f), "yhteiset");
            m.Aseta("pallo|tehosteet", 0.2f);
            Oleta.Tosi(Lahes(m.RyhmaKerroin("pallo", "tehosteet"), 0.2f) && m.OnOma("pallo|tehosteet") && m.OmiaMuutoksia("pallo") == 1, "oma voittaa");
            m.Aseta("pallo|tehosteet", 0.7f);
            Oleta.Tosi(!m.OnOma("pallo|tehosteet"), "sama kuin yhteinen → ei omaa");
            m.Aseta("linna|puhe", 0.5f);
            m.PalautaYhteiset("linna");
            Oleta.Tosi(Lahes(m.RyhmaKerroin("linna", "puhe"), 1.5f), "palautus yhteiseen");
            Oleta.Tosi(!m.LueYhteiset("{ei") && m.YhteisetVersio == 3, "rikki → ennallaan");
            Oleta.Tosi(m.LueYhteiset("{\"versio\":0,\"tasot\":{}}") && Lahes(m.RyhmaKerroin("pallo", "tehosteet"), 1f), "tyhjä → kaikki 1");
        }

        [Testi] static void TallennusRunko()
        {
            var m = new Aanimikseri();
            m.LueYhteiset(Worker);
            m.Aseta("pallo#lokit", 0.5f);
            m.Aseta("pallo|maisema", 0.25f);
            m.Aseta("iss|tehosteet", 0.1f);   // toinen konteksti: ei mukaan pallon tallennukseen
            var j = m.TallennusJson("pallo");
            Oleta.Tosi(j.Contains("\"pohjaVersio\":3"), j);
            var toinen = new Aanimikseri();
            Oleta.Tosi(toinen.LueYhteiset(j.Replace("{\"tasot\"", "{\"versio\":4,\"tasot\"")), j);
            Oleta.Tosi(Lahes(toinen.RyhmaKerroin("pallo", "maisema"), 0.25f) && Lahes(toinen.AaniKerroin("pallo", "lokit"), 0.5f)
                && Lahes(toinen.RyhmaKerroin("pallo", "tehosteet"), 0.7f) && Lahes(toinen.RyhmaKerroin("linna", "puhe"), 1.5f)
                && Lahes(toinen.RyhmaKerroin("iss", "tehosteet"), 1f), "pallo omat + muiden yhteiset, ei issin omia: " + j);
            m.Tallennettu("pallo", 4);
            Oleta.Tosi(m.YhteisetVersio == 4 && m.OmiaMuutoksia("pallo") == 0 && Lahes(m.AaniKerroin("pallo", "lokit"), 0.5f) && m.OmiaMuutoksia("iss") == 1, "tallennettu");
            var kolmas = new Aanimikseri();
            kolmas.LueOmat(m.OmatTalteen());
            Oleta.Tosi(Lahes(kolmas.RyhmaKerroin("iss", "tehosteet"), 0.1f) && kolmas.OmatTalteen() == m.OmatTalteen(), m.OmatTalteen());
        }

        [Testi] static void Rekisteri()
        {
            var m = new Aanimikseri();
            m.Rekisteroi("pallo", "maisema", "lokit", "Lokkiparvi", "seagulls_01", "seagulls_02");
            m.Rekisteroi("pallo", "maisema", "kyyhkyt", "Kyyhkyt");
            m.Rekisteroi("linna", "tehosteet", "ovi", null);
            var l = m.AanetRyhmassa("pallo", "maisema");
            Oleta.Tosi(l.Count == 2 && l[0].Id == "kyyhkyt" && l[1].Nimi == "Lokkiparvi", string.Join(",", l.Select(x => x.Id)));
            Oleta.Tosi(m.AanetRyhmassa("linna", "tehosteet")[0].Nimi == "ovi" && m.AanetRyhmassa("iss", "puhe").Count == 0, "nimi oletuksena id");
            Oleta.Tosi(m.Rekisteroity("seagulls_02") && m.Rekisteroity("ovi") && !m.Rekisteroity("tuntematon"), "klipit");
            Oleta.Tosi(m.RekisteroityjaAania == 3, "määrä");
        }
    }
}
