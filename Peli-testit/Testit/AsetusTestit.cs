// Asetukset datana (Peli/Asetus.cs, Natiiviseppä 5.10.2026): koodin arvo on aina oletus, asetukset.json ohittaa vain
// oikean tyyppisen arvon; vanha paketti (ei tiedostoa), rikkinäinen JSON ja liian uusi skeema palauttavat oletukset.
using Matkakirja.Peli.Pelit;

namespace Matkakirja.Peli.Testit
{
    static class AsetusTestit
    {
        [Testi] static void IlmanTiedostoaKaikkiOletuksia()
        {
            Asetus.Lue(null, "testi");
            Oleta.Sama(0.14, AaniVakiot.MaisemanVoima);
            Oleta.Sama(1800, AaniVakiot.HaivytysMs);
            Oleta.Sama("Tavli", Peliluettelo.Tavli.Nimi);
            Oleta.Tosi(Asetus.Lahde.StartsWith("oletukset"), Asetus.Lahde);
        }

        [Testi] static void ArvoOhittaaJaPalautuu()
        {
            Asetus.Lue("{\"skeema\":1,\"versio\":\"t1\",\"aanet\":{\"MaisemanVoima\":0.2,\"HaivytysMs\":900},"
                + "\"pelit\":{\"tavli\":{\"Nimi\":\"Tavli X\"},\"laudat\":{\"kafeneio\":{\"Nimi\":\"Kahvila\"}}},"
                + "\"tekstit\":{\"tavli\":{\"valinta\":{\"otsikko\":\"Pelataanko?\"}}}}", "testi");
            Oleta.Sama(0.2, AaniVakiot.MaisemanVoima);
            Oleta.Sama(900, AaniVakiot.HaivytysMs);
            Oleta.Sama("Tavli X", Peliluettelo.Tavli.Nimi);
            Oleta.Sama("Kahvila", Peliluettelo.Tavli.Laudat[0].Nimi);
            Oleta.Sama("Pelataanko?", Asetus.T("tavli.valinta.otsikko", "Pelataanko tavlia?"));
            Oleta.Sama(0.28, AaniVakiot.EtusivunVoima, "puuttuva avain = oletus");
            Asetus.Lue(null, "vanha paketti");
            Oleta.Sama(0.14, AaniVakiot.MaisemanVoima, "vanha paketti palauttaa oletuksen");
            Oleta.Sama("Kafeneio 1873", Peliluettelo.Tavli.Laudat[0].Nimi);
        }

        [Testi] static void VaaraTyyppiJaRikkinainenOvatOletuksia()
        {
            Asetus.Lue("{\"aanet\":{\"MaisemanVoima\":\"kova\",\"HaivytysMs\":1.5},\"pelit\":{\"tavli\":{\"Nimi\":7}}}", "testi");
            Oleta.Sama(0.14, AaniVakiot.MaisemanVoima);
            Oleta.Sama(1800, AaniVakiot.HaivytysMs, "desimaali ei kelpaa kokonaisluvuksi");
            Oleta.Sama("Tavli", Peliluettelo.Tavli.Nimi);
            Oleta.Tosi(Asetus.Lue("{\"aanet\":", "testi") != null, "rikkinäinen JSON");
            Oleta.Sama(0.14, AaniVakiot.MaisemanVoima);
            Oleta.Tosi(Asetus.Lue("{\"skeema\":2,\"aanet\":{\"MaisemanVoima\":0.5}}", "testi") != null, "uudempi skeema");
            Oleta.Sama(0.14, AaniVakiot.MaisemanVoima);
            Asetus.Tyhjenna();
        }
    }
}
