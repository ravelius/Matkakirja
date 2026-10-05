// Omistajan TF 144 -palaute (juna 146): kun kertoja tarjoaa vaihtoehdot, se odottaa pelaajan valintaa — kysymyksessä ja
// vaihtoehdollisella pysähdyksellä. Vain Esittele kaupunki -kierros (OpasKohde.Kierros) jatkaa itse.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasOdotusTestit
    {
        static OpasKohde K(string id, double lat, double lon, bool kierros = false, params string[] vaihtoehdot) =>
            new OpasKohde { Id = id, Nimi = id, Lat = lat, Lon = lon, KokoM = 60, KestoS = 5, Kierros = kierros, Vaihtoehdot = vaihtoehdot.Length > 0 ? vaihtoehdot : null };

        static (OpasSilmukka s, List<(int n, string t)> p) Uusi()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int, string)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            return (s, p);
        }

        static void Aja(OpasSilmukka s, double sekuntia) { for (int i = 0; i < sekuntia * 10; i++) { s.AaniLoppui(); s.Paivita(0.1, _ => 5); } }

        [Testi] static void KysymysOdottaaValintaaEikaHaeOletusta()
        {
            var (s, p) = Uusi();
            s.Vastaus(p[^1].n, new OpasKohde { Id = "q", Nimi = "q", Kysymys = true, Vaihtoehdot = new[] { "Esittele kaupunki", "Näytä jotain modernia" } });
            Aja(s, 30);
            Oleta.Tosi(s.OdottaaVastausta, "odottaa yhä 30 s:n jälkeen");
            Oleta.Sama(1, p.Count, "ei oletusvaihtoehdon esihakua");
            s.Toive("Näytä jotain modernia");
            Oleta.Sama(2, p.Count);
            Oleta.Sama("Näytä jotain modernia", p[^1].t);
        }

        [Testi] static void VaihtoehdollinenPysahdysOdottaaValintaa()
        {
            var (s, p) = Uusi();
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700, false, "Miksi?", "Seuraava"));
            Aja(s, 60);
            Oleta.Tosi(s.Vaihe != OpasVaihe.Lentaa && s.Nykyinen?.Id == "A", $"jäi A:han ({s.Vaihe}, {s.Nykyinen?.Id})");
            Oleta.Sama(1, p.Count, "ei esihakua vaihtoehdollisella pysähdyksellä");
            s.Toive("Seuraava");
            s.Vastaus(p[^1].n, K("B", 55.6800, 12.5900));
            Aja(s, 2);
            Oleta.Sama("B", s.Nykyinen?.Id, "valinta vie eteenpäin");
        }

        [Testi] static void TaukoPysayttaaLennonJaKierron()
        {
            var (s, p) = Uusi();
            s.Vastaus(p[^1].n, K("A", 55.6900, 12.6000));
            for (int i = 0; i < 20; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(OpasVaihe.Lentaa, s.Vaihe);
            s.Tauolla = true;
            var ennen = s.Asento; double aika = s.VaiheAika;
            for (int i = 0; i < 300; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Asento.Lat == ennen.Lat && s.Asento.Suuntima == ennen.Suuntima && s.VaiheAika == aika, "tauolla ei liiku");
            s.Tauolla = false;
            for (int i = 0; i < 400 && s.Vaihe == OpasVaihe.Lentaa; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama("A", s.Nykyinen?.Id); Oleta.Tosi(s.Vaihe != OpasVaihe.Lentaa, "jatkuu tauon jälkeen");
        }

        [Testi] static void TakytLuetaan()
        {
            var t = OpasTaky.Lue((Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(
                "{\"paiva\":\"2026-10-06\",\"kohteet\":[{\"id\":\"Q1\",\"nimi\":\"Canal Grande\",\"koukku\":\"Kaupunki vedellä.\",\"kaupunki\":\"Venetsia\",\"maa\":\"IT\",\"lat\":45.43,\"lon\":12.33,\"kuva\":{\"url\":\"u\"}},"
                + "{\"nimi\":\"rikki\",\"lat\":95,\"lon\":0}]}"));
            Oleta.Sama(1, t.Count); Oleta.Tosi(t[0].Iso2 == "IT" && t[0].Kaupunki == "Venetsia" && t[0].KuvaUrl == "u");
        }

        [Testi] static void KierrosJatkaaItse()
        {
            var (s, p) = Uusi();
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700, true, "Miksi?"));
            for (int i = 0; i < 600 && p.Count < 2; i++) { s.AaniLoppui(); s.Paivita(0.1, _ => 5); }
            Oleta.Sama(2, p.Count, "kierroksella esihaku");
            s.Vastaus(p[^1].n, K("B", 55.6800, 12.5900, true));
            Aja(s, 30);
            Oleta.Sama("B", s.Nykyinen?.Id, "kierros jatkaa itse");
        }
    }
}
