using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasYksityiskohdatTestit
    {
        const string Paketti = "[{\"kohde_id\":\"avaus\",\"tekstilaji\":\"avaus\",\"ankkuri\":\"vaalealta kiviviuhkalta\",\"kuvateksti\":\"Kalkkikivi\","
            + "\"media_url\":\"https://media.matkakirja.app/esittely/pariisi-v1/kuvat/a.jpg\",\"paketti_leveys\":1280,\"paketti_korkeus\":853},"
            + "{\"kohde_id\":\"Q243\",\"tekstilaji\":\"teksti\",\"ankkuri\":\"huipun antennit\",\"media_url\":\"https://x/b.jpg\"},"
            + "{\"kohde_id\":\"Q243\",\"tekstilaji\":\"teksti\",\"ankkuri\":\"langaton lennätin\",\"media_url\":\"https://x/c.jpg\"},"
            + "{\"kohde_id\":\"Q243\",\"tekstilaji\":\"teksti\",\"ankkuri\":\"ensimmäisen kerroksen parvekkeen\",\"media_url\":\"https://x/d.jpg\"},"
            + "{\"kohde_id\":\"Q243\",\"ankkuri\":\"ei tekstissä\",\"media_url\":\"https://x/e.jpg\"},{\"kohde_id\":\"Q1\"},{\"ankkuri\":\"x\"}]";
        const string Avaus = "Tervetuloa Pariisiin. Ylhäältä kaupunki näyttää vaalealta kiviviuhkalta, jonka keskellä Seine kiemurtelee.";
        const string Eiffel = "Torni oli määrä purkaa vuonna 1909, mutta langaton lennätin pelasti sen: huipun antennit osoittautuivat "
            + "niin hyödyllisiksi, että rautatorni sai jäädä. Gustave Eiffel kaiverrutti torniin nimet. Nimet näkyvät yhä tornin kyljissä "
            + "ensimmäisen kerroksen parvekkeen alla.";

        static List<OpasYksityiskohdat.Kuva> K() => OpasYksityiskohdat.Lue(Matkakirja.Peli.MiniJson.Jasenna(Paketti));

        [Testi] static void LukuJaPolut()
        {
            var k = K();
            Oleta.Sama(5, k.Count, "puutteelliset pois");
            Oleta.Sama(1280, k[0].Leveys); Oleta.Sama("Kalkkikivi", k[0].Kuvateksti);
            var p = OpasYksityiskohdat.LuePolut(Matkakirja.Peli.MiniJson.Jasenna(
                "{\"yksityiskohdat_polut\":{\"pariisi\":\"/esittely/pariisi-v2/pariisi-yksityiskohdat.json\",\"paha\":\"../x.json\"}}"));
            Oleta.Sama("esittely/pariisi-v2/pariisi-yksityiskohdat.json", p["Pariisi"], "id kirjainkoosta riippumatta, alku-/ pois");
            Oleta.Tosi(!p.ContainsKey("paha"), ".. ohitetaan");
            Oleta.Sama(0, OpasYksityiskohdat.LuePolut(Matkakirja.Peli.MiniJson.Jasenna("{\"tiet\":[]}")).Count, "kenttä puuttuu");
        }

        [Testi] static void AnkkuriLoytyyValimerkeista()
        {
            Oleta.Sama(Avaus.IndexOf("vaalealta"), OpasYksityiskohdat.Etsi(Avaus, "Vaalealta  kiviviuhkalta"), "koko ja välit");
            Oleta.Sama(Eiffel.IndexOf("langaton"), OpasYksityiskohdat.Etsi(Eiffel, "langaton lennätin"));
            Oleta.Sama(-1, OpasYksityiskohdat.Etsi(Eiffel, "ei tekstissä"));
            Oleta.Sama(Eiffel.IndexOf("sen: huipun"), OpasYksityiskohdat.Etsi(Eiffel, "sen huipun"), "välimerkki tekstissä ohitetaan");
        }

        [Testi] static void VarapolkuOsuudestaJaVali()
        {
            var a = OpasYksityiskohdat.Ajoita(K(), "Q243", Eiffel, 30.0);
            // langaton ~ 0,16 × 30 = 4,8 s; huipun antennit ~ 0,25 × 30 = 7,6 s (alle ValiS edellisestä → pois); parveke ~ 0,9 × 30 = 27 s.
            Oleta.Sama(2, a.Count, "lähekkäinen pois, ei-tekstissä pois");
            Oleta.Sama("https://x/c.jpg", a[0].Kuva.Url);
            Oleta.Tosi(System.Math.Abs(a[0].AikaS - 30.0 * Eiffel.IndexOf("langaton") / Eiffel.Length) < 1e-9, "osuus × kesto");
            Oleta.Sama("https://x/d.jpg", a[1].Kuva.Url);
            Oleta.Sama(0, OpasYksityiskohdat.Ajoita(K(), "Q243", Eiffel, 0).Count, "ei kestoa");
            Oleta.Sama(1, OpasYksityiskohdat.Ajoita(K(), "avaus", Avaus, 18.9).Count, "avaus");
        }

        [Testi] static void SanaAjatVoittavat()
        {
            int m = Eiffel.IndexOf("langaton"), h = Eiffel.IndexOf("huipun"), p = Eiffel.IndexOf("ensimmäisen");
            var ajat = OpasYksityiskohdat.LueAjat(Matkakirja.Peli.MiniJson.Jasenna(
                "{\"versio\":1,\"sanat\":[[0,0.0,0.3],[" + m + ",2.0,2.5],[" + h + ",9.0,9.4],[" + p + ",20.0,20.6]]}"));
            Oleta.Sama(4, ajat.Count);
            var a = OpasYksityiskohdat.Ajoita(K(), "Q243", Eiffel, 30.0, ajat);
            Oleta.Sama(3, a.Count, "sana-ajoilla kaikki kolme ≥ 5 s välein");
            Oleta.Tosi(a[0].AikaS == 2.0 && a[1].AikaS == 9.0 && a[2].AikaS == 20.0, "ankkurin sanan alku");
            Oleta.Sama(2, OpasYksityiskohdat.Ajoita(K(), "Q243", Eiffel, 21.0, ajat).Count, "loppuvara: 20 s > 21 − 1,5 pois");
        }
    
        [Testi] static void HavainnekuvaMerkitaan()
        {
            var l = OpasYksityiskohdat.Lue(Matkakirja.Peli.MiniJson.Jasenna("[{\"kohde_id\":\"Q1\",\"ankkuri\":\"a\",\"media_url\":\"u\",\"havainnekuva\":true},"
                + "{\"kohde_id\":\"Q1\",\"ankkuri\":\"b\",\"media_url\":\"u\",\"tekija\":\"besopha\",\"lisenssi\":\"CC BY 2.0\"}]"));
            Oleta.Tosi(l[0].Havainnekuva && !l[1].Havainnekuva, "puuttuva = false");
            Oleta.Sama("Havainnekuva", OpasYksityiskohdat.Tekijarivi(l[0]));
            Oleta.Sama("Kuva: besopha, CC BY 2.0", OpasYksityiskohdat.Tekijarivi(l[1]));
        }
    
        [Testi] static void LukuaikaAanettomalle()
        {
            Oleta.Sama(6.0, KierrosLento.LukuKesto("Lyhyt."), "vähintään 6 s");
            Oleta.Sama(20.0, KierrosLento.LukuKesto(new string('a', 280)), "14 merkkiä/s");
            Oleta.Sama(6.0, KierrosLento.LukuKesto(null));
            var a = OpasYksityiskohdat.Ajoita(K(), "Q243", Eiffel, KierrosLento.LukuKesto(Eiffel));
            Oleta.Tosi(a.Count >= 2, "kuvat ajoittuvat lukuajasta");
        }
    }
}
