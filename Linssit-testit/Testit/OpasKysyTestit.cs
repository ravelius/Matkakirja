// Omistajan tilaus 6.10. 11.57 / 12.0x (juna 148): Kysy, Liiku, kaupunkikierros, keskustelu ja siirto ilman lentoa kaupungin ulkopuolelle.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasKysyTestit
    {
        static OpasKohde K(string id, double lat, double lon, params string[] vaihtoehdot) =>
            new OpasKohde { Id = id, Nimi = id, Lat = lat, Lon = lon, KokoM = 60, KestoS = 5, Vaihtoehdot = vaihtoehdot.Length > 0 ? vaihtoehdot : null };

        static (OpasSilmukka s, List<(int n, string t)> p, List<string> puhe) Pysahdyksella()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>(); var puhe = new List<string>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.AlkaaPuhua += k => puhe.Add(k.Id);
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700, "Kysy", "Liiku"));
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            return (s, p, puhe);
        }

        [Testi] static void KysyVastausLuetaanSallivasti()
        {
            OpasKysyVastaus L(string j) => OpasKysyVastaus.Lue((Dictionary<string, object>)MiniJson.Jasenna(j));
            var a = L("{\"vastaus\":{\"teksti\":\"Koska…\",\"aani\":\"https://x/a.mp3\",\"kesto_s\":6},\"jatkokysymykset\":[\"Entä?\",\"Miksi?\"],\"toiminto\":null}");
            Oleta.Tosi(a.Teksti == "Koska…" && a.Aani != null && a.KestoS == 6 && a.Jatkokysymykset.Length == 2 && a.Toiminto == OpasToiminto.Ei);
            var b = L("{\"teksti\":\"Lennetään.\",\"toiminto\":{\"tyyppi\":\"siirry\",\"nimi\":\"Nyhavn\",\"lat\":55.6797,\"lon\":12.5906}}");
            Oleta.Tosi(b.Toiminto == OpasToiminto.Siirry && b.ToimintoNimi == "Nyhavn" && Math.Abs(b.ToimintoLat - 55.6797) < 1e-9);
            var c = L("{\"vastaus\":\"Kierros alkaa.\",\"toiminto\":\"kierros\"}");
            Oleta.Tosi(c.Teksti == "Kierros alkaa." && c.Toiminto == OpasToiminto.Kierros);
            var d = L("{\"toiminto\":{\"tyyppi\":\"kohde\",\"id\":\"Q1\"}}");
            Oleta.Tosi(d.Toiminto == OpasToiminto.Kohde && d.ToimintoId == "Q1");
            Oleta.Tosi(L("{}") == null);
            var y = OpasKysyVastaus.Yhdista(new[] { "Entä?", "Miksi?" }, new[] { "Miksi?", "Milloin?", "Kuka?" });
            Oleta.Tosi(y.Length == 4 && y[0] == "Entä?" && y[2] == "Milloin?");
        }

        [Testi] static void KysymyksetLuetaan()
        {
            var k = OpasKohde.Lue((Dictionary<string, object>)MiniJson.Jasenna("{\"nimi\":\"N\",\"lat\":55.68,\"lon\":12.59,\"kysymykset\":[\"Miksi?\",\" \",\"Milloin?\"]}"));
            Oleta.Tosi(k.Kysymykset != null && k.Kysymykset.Length == 2 && k.Kysymykset[1] == "Milloin?");
        }

        [Testi] static void KysyVastaaSamassaPaikassa()
        {
            var (s, p, puhe) = Pysahdyksella();
            s.Esita(new OpasKohde { Id = "vastaus", Nimi = "A", Lat = 55.6760, Lon = 12.5700, Teksti = "Koska…", KestoS = 4 });
            for (int i = 0; i < 20; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama("vastaus", s.Nykyinen?.Id); Oleta.Sama(OpasVaihe.Puhuu, s.Vaihe, "ei lentoa");
            Oleta.Tosi(puhe.Contains("vastaus"), "vastaus kerrotaan");
        }

        [Testi] static void LiikuLentaaHetiJaKerrontaKunPysahdysTulee()
        {
            var (s, p, puhe) = Pysahdyksella();
            s.Liiku("Nyhavn", 55.6798, 12.5912);
            Oleta.Sama("Nyhavn", p[^1].t); Oleta.Tosi(s.PyynnonSijainti.HasValue);
            Oleta.Sama(OpasVaihe.Lentaa, s.Vaihe, "lento alkaa heti ennen vastausta");
            s.Vastaus(p[^1].n, K("Nyhavn", 55.6797, 12.5906));
            for (int i = 0; i < 300 && s.Nykyinen?.Id != "Nyhavn" || i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama("Nyhavn", s.Nykyinen?.Id); Oleta.Tosi(puhe.Contains("Nyhavn"));
            Oleta.Tosi(KierrosLento.EtaisyysM(s.Asento.Lat, s.Asento.Lon, 55.6797, 12.5906) < 2500);
        }

        [Testi] static void KaupunkikierrosKayJononLapiJaKeskeytyy()
        {
            var (s, p, puhe) = Pysahdyksella();
            var jono = new List<(string, double, double)> { ("T1", 55.6761, 12.5683), ("T2", 55.6753, 12.5703), ("T3", 55.6814, 12.5758) };
            s.AloitaKierros(jono);
            Oleta.Tosi(s.KierrosKaynnissa); Oleta.Sama("T1", p[^1].t); Oleta.Sama((1, 3), s.KierrosTieto);
            for (int kohde = 1; kohde <= 3; kohde++)
            {
                s.Vastaus(p[^1].n, K("T" + kohde, jono[kohde - 1].Item2, jono[kohde - 1].Item3, "Kysy"));   // vaihtoehdot: kierros jatkaa silti
                for (int i = 0; i < 600 && !(s.Nykyinen?.Id == "T" + kohde && s.Vaihe == OpasVaihe.Puhuu); i++) { s.AaniLoppui(); s.Paivita(0.1, _ => 5); }
                Oleta.Sama("T" + kohde, s.Nykyinen?.Id, "kierroksen kohde " + kohde);
                if (kohde < 3) Oleta.Sama("T" + (kohde + 1), p[^1].t, "seuraava esihaettu");
            }
            int ennen = p.Count;
            for (int i = 0; i < 100; i++) { s.AaniLoppui(); s.Paivita(0.1, _ => 5); }
            Oleta.Tosi(!s.KierrosKaynnissa, "jono loppui"); Oleta.Sama(ennen, p.Count, "ei pyyntöä jonon jälkeen");
            s.AloitaKierros(jono);
            s.Toive("Jotain muuta");
            Oleta.Tosi(!s.KierrosKaynnissa, "pelaajan toiminto keskeyttää kierroksen");
        }

        [Testi] static void KaukaisiinSiirrytaanIlmanLentoaJaKertojaOdottaaLatausta()
        {
            var (s, p, puhe) = Pysahdyksella();
            double edistys = 0.2; double siirtoLat = double.NaN;
            s.LatausEdistys = () => edistys;
            s.SiirtoAlkaa += (la, lo) => siirtoLat = la;
            s.Esita(K("Colosseum", 41.8902, 12.4922));   // Rooma ~1 530 km
            for (int i = 0; i < 6; i++) s.Paivita(0.1, _ => 5);   // tauko puheen jälkeen (TaukoS)
            Oleta.Tosi(s.Siirtymassa, "siirto, ei lentoa"); Oleta.Sama("Colosseum", s.SiirtoNimi);
            Oleta.Tosi(Math.Abs(siirtoLat - 41.8902) < 1e-6, "origo siirretään heti");
            Oleta.Tosi(KierrosLento.EtaisyysM(s.Asento.Lat, s.Asento.Lon, 41.8902, 12.4922) < 3000, "kamera kohteessa heti (ruudun alla)");
            int puheita = puhe.Count;
            for (int i = 0; i < 50; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Siirtymassa && Math.Abs(s.SiirtoEdistys - 0.2) < 1e-9, "odottaa latausta");
            Oleta.Sama(puheita, puhe.Count, "kertoja ei ala ennen näkymää");
            edistys = 0.97;
            for (int i = 0; i < 5; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(!s.Siirtymassa && s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen?.Id == "Colosseum", "näkymä auki, kertoja alkaa");
            Oleta.Tosi(puhe.Contains("Colosseum"));
        }

        [Testi] static void KaupunginSisallaLennetaan()
        {
            var (s, p, puhe) = Pysahdyksella();
            s.Esita(K("Kastellet", 55.6916, 12.5936));
            for (int i = 0; i < 6; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(!s.Siirtymassa && s.Vaihe == OpasVaihe.Lentaa, "alle 30 km: lento");
        }
    }
}
