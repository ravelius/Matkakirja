// Siltalauseet (juna 146): JSON, ei toistoa istunnossa, vararyhmä, sirun ryhmä, workerin ryhmäkentät ja lennon alku.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasSiltaTestit
    {
        const string Json = "{\"versio\":1,\"ryhmat\":{\"kuittaus\":[{\"id\":\"kuittaus-01\",\"teksti\":\"Hyvä valinta.\",\"kesto_s\":1.4,\"url\":\"https://x/k1.mp3\"},"
            + "{\"id\":\"kuittaus-02\",\"teksti\":\"Lähdetään.\",\"kesto_s\":1.2,\"url\":\"https://x/k2.mp3\"}],"
            + "\"ruoka\":[{\"id\":\"ruoka-01\",\"teksti\":\"Nälkä?\",\"kesto_s\":1.0,\"url\":\"https://x/r1.mp3\"}],"
            + "\"odotus\":[{\"id\":\"odotus-01\",\"teksti\":\"Hetki.\",\"kesto_s\":1.0,\"url\":\"https://x/o1.mp3\"},{\"id\":\"rikki\"}]}}";

        static OpasSiltalauseet L() => OpasSiltalauseet.Lue((Dictionary<string, object>)MiniJson.Jasenna(Json), 7);

        [Testi] static void LuetaanJaVirheellinenOhitetaan()
        {
            var s = L();
            Oleta.Sama(4, s.Maara, "rivi ilman urlia ohitetaan");
            Oleta.Tosi(OpasSiltalauseet.Lue((Dictionary<string, object>)MiniJson.Jasenna("{\"versio\":1}")) == null);
        }

        [Testi] static void EiToistoaJaVararyhma()
        {
            var s = L();
            Oleta.Sama("ruoka-01", s.Valitse("ruoka").Id);
            var toinen = s.Valitse("ruoka");
            Oleta.Tosi(toinen != null && toinen.Ryhma == "kuittaus", "ruoka käytetty → kuittaus");
            var kolmas = s.Valitse("kuittaus");
            Oleta.Tosi(kolmas != null && kolmas.Id != toinen.Id, "ei samaa kahdesti");
            Oleta.Tosi(s.Valitse("kuittaus") == null, "kaikki käytetty");
            Oleta.Tosi(s.Valitse("tuntematon") == null);
            Oleta.Tosi(L().Valitse("odotus", null, l => false) == null, "ei ladattuja");
        }

        [Testi] static void SirunRyhmaJaVapaaToive()
        {
            var v = new[] { "Kerro lisää", "Missä syödään?" };
            var r = new[] { "syventava", "ruoka" };
            Oleta.Sama("ruoka", OpasSiltalauseet.RyhmaToiveelle(" missä syödään? ", v, r));
            Oleta.Sama("kuittaus", OpasSiltalauseet.RyhmaToiveelle("näytä Nyhavn", v, r));
            Oleta.Sama("kuittaus", OpasSiltalauseet.RyhmaToiveelle("Kerro lisää", v, null));
        }

        [Testi] static void WorkerinRyhmakentatJaLennonAlku()
        {
            var k = OpasKohde.Lue((Dictionary<string, object>)MiniJson.Jasenna(
                "{\"nimi\":\"N\",\"lat\":55.68,\"lon\":12.59,\"vaihtoehdot\":[\"a\",\"b\"],\"vaihtoehtojen_ryhmat\":[\"syventava\",\"ruoka\"],\"toiveen_ryhma\":\"vesi\"}"));
            Oleta.Tosi(k.VaihtoehtojenRyhmat != null && k.VaihtoehtojenRyhmat.Length == 2 && k.VaihtoehtojenRyhmat[1] == "ruoka" && k.ToiveenRyhma == "vesi");
            // Automaattinen lento: toiveesta = false; toiveen jälkeinen lento: true.
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var pyynnot = new List<int>(); var lennot = new List<bool>();
            s.Pyyda += (n, t) => pyynnot.Add(n);
            s.LentoAlkaa += (kk, m, t) => lennot.Add(t);
            s.Aloita("x");
            s.Vastaus(pyynnot[^1], new OpasKohde { Id = "a", Nimi = "a", Lat = 55.676, Lon = 12.570, KokoM = 60, KestoS = 5 });
            s.Paivita(0.1, _ => 5);
            s.Toive("näytä b");
            s.Vastaus(pyynnot[^1], new OpasKohde { Id = "b", Nimi = "b", Lat = 55.680, Lon = 12.590, KokoM = 60, KestoS = 5 });
            for (int i = 0; i < 600 && lennot.Count < 2; i++) { s.AaniLoppui(); s.Paivita(0.1, _ => 5); }
            Oleta.Sama(2, lennot.Count);
            Oleta.Tosi(!lennot[0] && lennot[1], $"lennot {string.Join(",", lennot)}");
        }
        // Juna 150 (omistaja 6.10. 14.3x): lause tilanteen mukaan, näennäisryhmillä ei vararyhmää.
        const string Json2 = "{\"versio\":1,\"ryhmat\":{"
            + "\"kuittaus\":[{\"id\":\"k1\",\"teksti\":\"Tiedän juuri oikean paikan.\",\"url\":\"u1\"},{\"id\":\"k2\",\"teksti\":\"Hyvä valinta, lähdetään.\",\"url\":\"u2\"}],"
            + "\"syventava\":[{\"id\":\"s1\",\"teksti\":\"Pysähdytään hetkeksi tähän.\",\"url\":\"u3\"},{\"id\":\"s2\",\"teksti\":\"Hyvä kysymys.\",\"url\":\"u4\"}],"
            + "\"odotus\":[{\"id\":\"o1\",\"teksti\":\"Melkein perillä.\",\"url\":\"u5\"},{\"id\":\"o2\",\"teksti\":\"Hetkinen, katson karttaa.\",\"url\":\"u6\"}]}}";

        [Testi] static void LauseTilanteenMukaan()
        {
            for (int siemen = 1; siemen < 20; siemen++)
            {
                var s = OpasSiltalauseet.Lue((Dictionary<string, object>)MiniJson.Jasenna(Json2), siemen);
                Oleta.Sama("s2", s.Valitse(OpasSiltalauseet.Kysymys)?.Id, "kysymykseen vain kysymyslause");
                Oleta.Tosi(s.Valitse(OpasSiltalauseet.Kysymys) == null, "ei vararyhmää (ei kuittausta kysymykseen)");
                Oleta.Sama("k2", s.Valitse(OpasSiltalauseet.Valinta)?.Id, "listavalintaan ei 'Tiedän juuri oikean paikan'");
                Oleta.Tosi(s.Valitse(OpasSiltalauseet.Valinta) == null);
                Oleta.Sama("o2", s.Valitse(OpasSiltalauseet.OdotusPaikalla)?.Id, "paikallaan ei 'Melkein perillä'");
            }
        }

        [Testi] static void KysymysTunnistetaan()
        {
            foreach (var k in new[] { "Kuka asuu linnassa?", "mikä tuo torni on", "Kerro Kaarlensillasta", "Onko täällä museoita", "miksi" })
                Oleta.Tosi(OpasSiltalauseet.OnKysymys(k), k);
            foreach (var k in new[] { "Vie minut Pariisiin", "Näytä Kaarlensilta", "Mikaelinkirkko", "", "Kertausta" })
                Oleta.Tosi(!OpasSiltalauseet.OnKysymys(k), k);
        }
    }
}
