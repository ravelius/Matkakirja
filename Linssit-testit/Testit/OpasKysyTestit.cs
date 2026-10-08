using System.Linq;
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
            // #4107: kaupunki + kohde → kaupunki toiminnon kentistä, kohde alikentästä.
            var e = L("{\"teksti\":\"Lennetään Venetsiaan.\",\"toiminto\":{\"tyyppi\":\"kaupunki\",\"nimi\":\"Venetsia\",\"id\":\"venetsia\",\"lat\":45.4371,\"lon\":12.3326,\"kohde\":{\"nimi\":\"Pyhän Markuksen basilika\",\"lat\":45.4345,\"lon\":12.3397}}}");
            Oleta.Tosi(e.Toiminto == OpasToiminto.Kaupunki && e.ToimintoNimi == "Venetsia" && Math.Abs(e.ToimintoLat - 45.4371) < 1e-9, "kaupunki ei korvaudu kohteella");
            Oleta.Tosi(e.KohdeNimi == "Pyhän Markuksen basilika" && Math.Abs(e.KohdeLon - 12.3397) < 1e-9);
            var g = L("{\"toiminto\":{\"tyyppi\":\"kaupunki\",\"nimi\":\"Venetsia\",\"lat\":45.4371,\"lon\":12.3326,\"kohde_nimi\":\"Pyhän Markuksen basilika\",\"kohde_lat\":45.4345,\"kohde_lon\":12.3397}}");
            Oleta.Tosi(g.ToimintoNimi == "Venetsia" && g.KohdeNimi == "Pyhän Markuksen basilika" && Math.Abs(g.KohdeLat - 45.4345) < 1e-9, "litteä muoto");
            var f = L("{\"toiminto\":{\"tyyppi\":\"kaupunki\",\"nimi\":\"Praha\",\"lat\":50.08,\"lon\":14.42}}");
            Oleta.Tosi(f.ToimintoNimi == "Praha" && f.KohdeNimi == null && double.IsNaN(f.KohdeLat));
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
            Oleta.Tosi(!puhe.Contains("Colosseum"), "avaustauko: kertoja ei vielä (2,3 s: latausikkuna häipyy 1,1 s + 1,2 s)");
            for (int i = 0; i < 25; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(!s.Siirtymassa && s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen?.Id == "Colosseum", "näkymä auki, kertoja alkaa");
            Oleta.Tosi(puhe.Contains("Colosseum"));
        }

        // #4107 (Pelikoodari 7.10.): "vie minut Pyhän Markuksen kirkkoon" Kööpenhaminasta → siirto suoraan basilikaan, ei yleiskuvaan.
        [Testi] static void KaupunginVaihtoSuoraanKohteeseen()
        {
            var (s, p, puhe) = Pysahdyksella();
            double siirtoLat = double.NaN;
            s.SiirtoAlkaa += (la, lo) => siirtoLat = la;
            int pyyntoja = p.Count;
            s.VaihdaPaikkaKohteeseen("Pyhän Markuksen basilika", 45.4345, 12.3397);
            Oleta.Tosi(s.Siirtymassa, "siirto (yli 30 km)"); Oleta.Sama("Pyhän Markuksen basilika", s.SiirtoNimi);
            Oleta.Tosi(Math.Abs(siirtoLat - 45.4345) < 1e-6, "origo kohteeseen");
            Oleta.Tosi(p.Count > pyyntoja && p[^1].t == "Pyhän Markuksen basilika", "workerin pysähdys kohteesta");
            Oleta.Tosi(s.PyynnonSijainti is (double la, double lo) && Math.Abs(la - 45.4345) < 1e-9, "pyynnön sijainti kohde");
            var (s2, p2, _) = Pysahdyksella();
            s2.Sallitut = new List<OpasSallitut.Kaupunki> { new OpasSallitut.Kaupunki { Id = "koopenhamina", Nimi = "Kööpenhamina", Lat = 55.6761, Lon = 12.5683, RM = 5000 } };
            s2.VaihdaPaikkaKohteeseen("Pyhän Markuksen basilika", 45.4345, 12.3397);
            Oleta.Tosi(!s2.Siirtymassa && s2.Torjuntoja == 1, "sallitun ulkopuolella torjutaan");
        }

        // Simu 7.10. 07.08: basilikan kuvakortti jäi Varsovan yleiskuvaan (Nykyinen jäi edelliseen kaupunkiin).
        [Testi] static void KaupunginVaihtoUnohtaaEdellisenKohteen()
        {
            var (s, p, _) = Pysahdyksella();
            Oleta.Sama("A", s.Nykyinen?.Id);
            s.LatausEdistys = () => 1;
            s.VaihdaPaikka(52.231, 21.013, "Varsova");
            Oleta.Tosi(s.Nykyinen == null, "edellinen kohde ei ole enää nykyinen");
            for (int i = 0; i < 400 && s.Vaihe == OpasVaihe.Lentaa; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Odottaa && s.Nykyinen == null, "yleiskuva ilman vanhaa kohdetta");
            var (s2, _, _) = Pysahdyksella();
            s2.VaihdaPaikkaKohteeseen("Pyhän Markuksen basilika", 45.4345, 12.3397);
            Oleta.Tosi(s2.Nykyinen == null, "kohteeseen siirryttäessä sama");
        }

        // Omistaja 7.10. 10.3x "yksi esitys + Kerro lisää": kierroksella Kerro lisää keskeyttää, pyytää pitkän tekstin, JATKA seuraavasta.
        [Testi] static void KerroLisaaKierroksella()
        {
            var (s, p, _) = Pysahdyksella();
            s.AloitaKierros(new List<(string, double, double)> { ("K1", 55.6761, 12.5683), ("K2", 55.6800, 12.5800), ("K3", 55.6850, 12.5900) });
            Oleta.Tosi(s.KierrosKaynnissa);
            int n = p.Count;
            Oleta.Tosi(s.KerroLisaa());
            Oleta.Tosi(s.KierrosKeskeytetty && !s.KierrosKaynnissa && s.PitkaPyynto, "keskeytetty ja pitkä pyyntö");
            Oleta.Tosi(p.Count > n && p[^1].t.Contains("kerro lisää"), "toive kerro lisää");
            Oleta.Tosi(s.JatkaKierrosta() && s.KierrosKaynnissa, "jatko");
        }

        // Omistaja 7.10. 12.4x: esityksen avaus ja opastus ensin, ei workerin kaupunkikysymystä niiden päälle.
        [Testi] static void EsityksenAvausPysayttaaPyynnot()
        {
            var (s, p, _) = Pysahdyksella();
            s.PyynnotSeis = true;
            int n = p.Count;
            s.VaihdaPaikka(48.8566, 2.3522, "Pariisi");
            for (int i = 0; i < 100; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(n, p.Count, "ei pyyntöjä avauksen aikana");
            s.AloitaKierros(new List<(string, double, double)> { ("Notre-Dame", 48.853, 2.3499), ("Louvre", 48.8606, 2.3376) });
            Oleta.Tosi(!s.PyynnotSeis && p.Count > n, "kierros purkaa ja pyytää");
        }

        [Testi] static void KaupunginSisallaLennetaan()
        {
            var (s, p, puhe) = Pysahdyksella();
            s.Esita(K("Kastellet", 55.6916, 12.5936));
            for (int i = 0; i < 6; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(!s.Siirtymassa && s.Vaihe == OpasVaihe.Lentaa, "alle 30 km: lento");
        }
        // Simu 6.10. 12.42 (juna 148): Prahan linna aukesi kermana — kehys 45 m:n arviolla, maa ~290 m, kamera mäen sisällä.
        [Testi] static void SiirtoOdottaaMaanKorkeuttaJaKehystaaSenMukaan()
        {
            var (s, p, puhe) = Pysahdyksella();
            double maa = double.NaN; int pyyntoja = 0;
            s.MaaPisteessa = (la, lo) => maa;
            s.MaaTarvitaan += (la, lo) => pyyntoja++;
            double edistys = 1.0;
            s.LatausEdistys = () => edistys;
            s.Esita(K("Prahan linna", 50.0900, 14.4000));
            for (int i = 0; i < 6; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(s.Siirtymassa, "siirto alkoi"); Oleta.Sama(1, pyyntoja, "maan näyte pyydetään kerran");
            for (int i = 0; i < 40; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(s.Siirtymassa && s.KehysArviolla, "laatat valmiit, mutta maa arviolla: näkymä ei aukea");
            Oleta.Tosi(s.SiirtoEdistys <= OpasSilmukka.SiirtoMaatonEdistys + 1e-9, "palkki ei täyty ennen näytettä");
            Oleta.Sama(0, puhe.Count(x => x == "Prahan linna"), "kertoja odottaa");
            maa = 290;
            s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(s.Siirtymassa, "korjatun kehyksen laatoille hetki");
            for (int i = 0; i < 35; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(!s.Siirtymassa && s.Vaihe == OpasVaihe.Puhuu, "näkymä auki näytteen jälkeen");
            Oleta.Tosi(s.NykyinenKehys.MaaM == 290 && s.Asento.KatseKorkeusM > 200, $"kehys oikealla maalla (katse {s.Asento.KatseKorkeusM:F0} m)");
        }

        [Testi] static void SiirtoAukeaaArviollaJosNaytettaEiTule()
        {
            var (s, p, puhe) = Pysahdyksella();
            s.MaaPisteessa = (la, lo) => double.NaN;
            s.LatausEdistys = () => 1.0;
            s.Esita(K("Prahan linna", 50.0900, 14.4000));
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Puhuu, "SiirtoMaxS:n jälkeen näkymä aukeaa arviolla (ei jumia)");
        }

        [Testi] static void LennonKehysLiukuuNaytteenMaalle()
        {
            var (s, p, puhe) = Pysahdyksella();
            double maa = double.NaN;
            s.MaaPisteessa = (la, lo) => maa;
            s.Liiku("Kastellet", 55.6916, 12.5936);
            for (int i = 0; i < 10; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa && s.KehysArviolla, "lento arviolla");
            maa = 120;
            var edella = s.Asento; double suurin = 0;
            for (int i = 0; i < 400 && s.Vaihe == OpasVaihe.Lentaa; i++)
            {
                s.Paivita(0.05, _ => double.NaN);
                suurin = Math.Max(suurin, Math.Abs(s.Asento.KatseKorkeusM - edella.KatseKorkeusM));
                edella = s.Asento;
            }
            Oleta.Tosi(!s.KehysArviolla, "kehys korjattu");
            Oleta.Tosi(suurin < 10, $"ei hyppyä (suurin askel {suurin:F1} m)");
            Oleta.Tosi(s.NykyinenKehys != null && s.NykyinenKehys.MaaM == 120, "perillä näytteen maa");
        }
        // Avaus ilman karttaa (omistaja 6.10. 14.2x): ensimmäinen valinta siirtoruudun kautta matkasta riippumatta.
        [Testi] static void PakotettuSiirtoLahellakin()
        {
            var s = new OpasSilmukka(OpasSilmukka.Avauskuva(55.68, 12.57));
            s.Pyyda += (n, t) => { };
            s.LatausEdistys = () => 0.2;
            s.PakotaSiirto = true;
            s.Liiku("Rundetaarn", 55.6814, 12.5757);   // ~0,5 km
            Oleta.Tosi(s.Siirtymassa && s.SiirtoNimi == "Rundetaarn", "lähelläkin siirtoruutu");
            Oleta.Tosi(!s.PakotaSiirto, "lippu kuluu");
            var k = new OpasSilmukka(OpasSilmukka.Avauskuva(55.68, 12.57));
            k.Pyyda += (n, t) => { };
            k.PakotaSiirto = true;
            k.VaihdaPaikka(55.6761, 12.5683, "Kööpenhamina");
            Oleta.Tosi(k.Siirtymassa, "kaupungin valinta samassa kaupungissa: siirtoruutu");
        }
        // Omistaja TF 149 "lukijan teksti jää kesken": seuraava lento vasta LoppuTaukoS äänen lopun jälkeen, ei kesken äänen.
        [Testi] static void LentoVastaAanenJaTauonJalkeen()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            s.Vastaus(p[^1].n, K("B", 55.6800, 12.5900));   // esihaku saapuneelle
            for (int i = 0; i < 100; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen?.Id == "A", "ääni soi: ei lähdetä, vaikka seuraava on valmis");
            s.AaniLoppui();
            for (int i = 0; i < 8; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Puhuu, $"alle 1 s äänen lopusta: odotetaan ({s.Vaihe} {s.Nykyinen?.Id})");
            for (int i = 0; i < 4; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa && s.Nykyinen?.Id == "B", "tauon jälkeen lento");
        }
        // Omistaja TF 149 (Päätoimittaja 16.3x): kysymys keskeyttää kierroksen, JATKA jatkaa keskeytyneestä, ■ lopettaa.
        static (OpasSilmukka s, List<(int n, string t)> p, List<string> puhe, int hiljennyksia) KierroksellaT1Puhuu()
        {
            var (s, p, puhe) = Pysahdyksella();
            var jono = new List<(string, double, double)> { ("T1", 55.6761, 12.5683), ("T2", 55.6753, 12.5703), ("T3", 55.6814, 12.5758) };
            s.AloitaKierros(jono);
            s.Vastaus(p[^1].n, K("T1", 55.6761, 12.5683));
            for (int i = 0; i < 600 && !(s.Nykyinen?.Id == "T1" && s.Vaihe == OpasVaihe.Puhuu); i++) s.Paivita(0.1, _ => 5);
            return (s, p, puhe, 0);
        }

        [Testi] static void KysymysKeskeyttaaJaJatkaJatkaa()
        {
            var (s, p, puhe, _) = KierroksellaT1Puhuu();
            int hiljennyksia = 0; s.Hiljenna += () => hiljennyksia++;
            Oleta.Sama("T2", p[^1].t, "T2 esihaussa");
            Oleta.Tosi(s.KeskeytaKierros(), "keskeytys");
            Oleta.Tosi(s.KierrosKeskeytetty && !s.KierrosKaynnissa && hiljennyksia == 1, "kertoja vaikeni");
            int pyyntoja = p.Count;
            var vastaus = K("kysy-1", s.NykyinenKehys.Lat, s.NykyinenKehys.Lon);
            s.Esita(vastaus);
            for (int i = 0; i < 50; i++) { s.Paivita(0.1, _ => 5); if (s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen == vastaus) s.AaniLoppui(); }
            Oleta.Sama(pyyntoja, p.Count, "keskeytettynä ei omia pyyntöjä vastauksen jälkeen");
            Oleta.Tosi(s.KierrosKeskeytetty, "keskeytys säilyy kysymysten yli");
            Oleta.Tosi(s.JatkaKierrosta() && s.KierrosKaynnissa && !s.KierrosKeskeytetty, "jatkuu");
            for (int i = 0; i < 300 && !(s.Nykyinen?.Id == "T1" && s.Vaihe == OpasVaihe.Puhuu); i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Nykyinen?.Id == "T1" && puhe.FindAll(x => x == "T1").Count == 2, "kesken jäänyt T1 luetaan alusta");
            Oleta.Sama("T2", p[^1].t, "T2 pyydetään uudelleen");
        }

        [Testi] static void KaupunkitilanJatkoOdottaaVastauksenLoppuun()
        {
            // TF 166 (omistaja 8.10. 18.0x): kierros keskeytetty kysymykseen, opas odottanut 4 s, vastaus juuri Esita → ei jatkoa.
            var (s, _, _, _) = KierroksellaT1Puhuu();
            Oleta.Tosi(s.KeskeytaKierros(), "keskeytys");
            for (int i = 0; i < 42; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Vaihe == OpasVaihe.Odottaa && s.VaiheAika > 2, $"odottaa vastausta ({s.Vaihe}, {s.VaiheAika:F1} s)");
            s.Esita(K("kysy-1", s.NykyinenKehys.Lat, s.NykyinenKehys.Lon));
            Oleta.Tosi(!OpasSilmukka.JatkoVastauksenJalkeen(s.KierrosKeskeytetty, s.Vaihe, s.VaiheAika, 2, false, s.Seuraava != null, false), "Esita juuri tehty → ei jatkoa samassa ruudussa");
            Oleta.Tosi(!OpasSilmukka.JatkoVastauksenJalkeen(true, OpasVaihe.Odottaa, 4.2, 2, false, true, true), "vastaus odottaa esitystä ja kysymys odottaa");
            Oleta.Tosi(!OpasSilmukka.JatkoVastauksenJalkeen(true, OpasVaihe.Odottaa, 4.2, 2, false, false, true), "kysymyksen odotus käynnissä (vastaus ei alkanut)");
            Oleta.Tosi(!OpasSilmukka.JatkoVastauksenJalkeen(true, OpasVaihe.Puhuu, 9, 2, true, false, false), "vastaus soi");
            Oleta.Tosi(!OpasSilmukka.JatkoVastauksenJalkeen(true, OpasVaihe.Odottaa, 1, 2, false, false, false), "tauko vastauksen jälkeen kesken");
            Oleta.Tosi(OpasSilmukka.JatkoVastauksenJalkeen(true, OpasVaihe.Odottaa, 2.5, 2, false, false, false), "vastaus kuultu → jatko");
        }

        [Testi] static void LoppuunLuetunJalkeenJatketaanSeuraavaan()
        {
            var (s, p, puhe, _) = KierroksellaT1Puhuu();
            s.AaniLoppui();
            s.KeskeytaKierros();
            s.JatkaKierrosta();
            Oleta.Sama("T2", p[^1].t, "luettu loppuun → seuraava");
        }

        [Testi] static void LopetaKierrosVapaaTila()
        {
            var (s, p, puhe, _) = KierroksellaT1Puhuu();
            s.LopetaKierros();
            Oleta.Tosi(s.VapaaTila && !s.KierrosKaynnissa && !s.KierrosKeskeytetty, "vapaa tila");
            int n = p.Count;
            for (int i = 0; i < 100; i++) { s.AaniLoppui(); s.Paivita(0.1, _ => 5); }
            Oleta.Sama(n, p.Count, "ei omia pyyntöjä vapaassa tilassa");
            Oleta.Tosi(!s.JatkaKierrosta(), "lopetettua ei jatketa");
            s.Liiku("Rundetaarn", 55.6814, 12.5757);
            Oleta.Tosi(!s.VapaaTila, "pelaajan valinta päättää vapaan tilan");
        }

        // ---- OMISTAJA TF 152 (Sydney): Kysy-vastaus katkesi, koska heti perään tehty esihaku palautti kysymyksen ----

        [Testi] static void KysyVastausEiTeeEsihakuaPuheenAikana()
        {
            var (s, p, puhe) = Pysahdyksella();
            var kysyt = new List<string>(); s.Kysyy += k => kysyt.Add(k.Teksti);
            int pyyntoja = p.Count;
            var vastaus = new OpasKohde { Id = "kysy-1", Nimi = "A", Lat = 55.6760, Lon = 12.5700, Teksti = "Utzon.", KestoS = 22 };
            s.Esita(vastaus);   // katkaisee A:n kerronnan (pelaajan kysymys), ei omaa vastaustaan
            int hiljennyksia = 0; s.Hiljenna += () => hiljennyksia++;
            for (int i = 0; i < 200; i++) s.Paivita(0.1, _ => 5);   // 20 s vastausta, ääni soi yhä
            Oleta.Sama("kysy-1", s.Nykyinen?.Id); Oleta.Sama(OpasVaihe.Puhuu, s.Vaihe);
            Oleta.Sama(pyyntoja, p.Count, "ei seuraava-kutsua vastauksen aikana");
            Oleta.Sama(0, hiljennyksia, "vastausta ei katkaista");
            s.AaniLoppui();
            for (int i = 0; i < 5; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(pyyntoja, p.Count, "ei ennen lopputaukoa");
            for (int i = 0; i < 10; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(pyyntoja + 1, p.Count, "esihaku vastauksen jälkeen");
            s.Vastaus(p[^1].n, new OpasKohde { Kysymys = true, Teksti = "Mitä haluaisit nähdä?", Vaihtoehdot = new[] { "a", "b" } });
            Oleta.Sama(1, kysyt.Count, "kysymys vasta vastauksen jälkeen");
            Oleta.Sama(0, hiljennyksia);
        }

        [Testi] static void KysymysOdottaaPuheenLoppuun()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>(); s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));   // ei vaihtoehtoja: esihaku lähtee saapuessa
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(2, p.Count, "esihaku saapuessa");
            int hiljennyksia = 0; s.Hiljenna += () => hiljennyksia++;
            var kysyt = new List<string>(); s.Kysyy += k => kysyt.Add(k.Teksti);
            s.Vastaus(p[^1].n, new OpasKohde { Kysymys = true, Teksti = "Minne haluaisit?", Vaihtoehdot = new[] { "a", "b" } });
            Oleta.Tosi(kysyt.Count == 0 && s.KysymysOdottaaPuhetta, "kysymys odottaa puheen loppua");
            for (int i = 0; i < 50; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(0, kysyt.Count); Oleta.Sama(0, hiljennyksia);
            s.AaniLoppui();
            for (int i = 0; i < 15; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(1, kysyt.Count, "kysymys puheen jälkeen");
            Oleta.Tosi(s.OdottaaVastausta && !s.KysymysOdottaaPuhetta);
        }

        [Testi] static void KysymysOdottaaSiirtymanLoppuun()
        {
            // Omistaja TF 162: linssi → Pariisi, workerin kysymys soi latausruudun aikana.
            var (s, p, puhe) = Pysahdyksella();
            double edistys = 0.2;
            s.LatausEdistys = () => edistys;
            int ennen = p.Count;
            s.PakotaSiirto = true;
            s.VaihdaPaikka(48.861, 2.351, "Pariisi");   // kaupungin valinta linssin valikosta
            for (int i = 0; i < 6; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Siirtymassa && p.Count > ennen, $"siirtymä käynnissä ja pyyntö lähti ({s.Siirtymassa}, {p.Count - ennen})");
            var kysyt = new List<string>(); s.Kysyy += k => kysyt.Add(k.Teksti);
            s.Vastaus(p[^1].n, new OpasKohde { Kysymys = true, Teksti = "Mitä haluaisit nähdä?", Vaihtoehdot = new[] { "a", "b" } });
            for (int i = 0; i < 30; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(kysyt.Count == 0 && s.KysymysOdottaaPuhetta, $"ei kysymystä latausruudun aikana ({kysyt.Count}, {s.KysymysOdottaaPuhetta}, p {p.Count}, {s.Vaihe}, siirto {s.Siirtymassa})");
            edistys = 1.0;
            for (int i = 0; i < 40 && s.Siirtymassa; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(!s.Siirtymassa, "siirtymä ohi");
            Oleta.Sama(0, kysyt.Count, "ei samalla ruudulla, jolla siirto päättyi (latausikkuna vielä näkyy)");
            for (int i = 0; i < (int)(OpasSilmukka.AvausTaukoS / 0.1) - 1; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(0, kysyt.Count, "avaustauko ennen kysymystä kuten kertojalla");
            for (int i = 0; i < 400 && kysyt.Count == 0; i++) { s.Paivita(0.1, _ => 5); if (s.Vaihe == OpasVaihe.Puhuu) s.AaniLoppui(); }
            Oleta.Sama(1, kysyt.Count, "kysymys siirtymän (ja puheen) jälkeen");
        }

        [Testi] static void KaupunkitilanAvausPuolivaliinKohtiEnsimmaistaKohdetta()
        {
            // Omistaja TF 162 (Rooma kartan pallosta) / Päätoimittaja 22.4x: avausnäkymä 1,1 km / 50°, katse kohti ensimmäistä
            // kohdetta (alakolmannes); kohde tuntematon → sama kehys keskustaan.
            var (s, p, puhe) = Pysahdyksella();
            s.LatausEdistys = () => 0.2;
            s.AvausEtaisyysOhitus = 1100; s.AvausKallistusOhitus = 50;
            s.PakotaSiirto = true;
            s.VaihdaPaikka(41.8933, 12.4829, "Rooma");
            for (int i = 0; i < 5; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Siirtymassa && Math.Abs(s.Asento.EtaisyysM - 1100) < 1 && Math.Abs(s.Asento.Kallistus - 50) < 1e-6, $"keskustan kehys 1,1 km / 50° ({s.Asento})");
            Oleta.Tosi(KierrosLento.EtaisyysM(s.Asento.Lat, s.Asento.Lon, 41.8933, 12.4829) < 5, "keskusta, kun kohde ei tiedossa");
            Oleta.Tosi(s.KohdistaAvausKohteeseen("Colosseum", 41.8902, 12.4922), "kohdistus siirtoruudun aikana");
            Oleta.Tosi(Math.Abs(s.Asento.EtaisyysM - 1100) < 1 && Math.Abs(s.Asento.Kallistus - 50) < 1e-6, $"etäisyys ja kallistus ennallaan ({s.Asento})");
            double d = KierrosLento.EtaisyysM(s.Asento.Lat, s.Asento.Lon, 41.8902, 12.4922);
            Oleta.Tosi(Math.Abs(d - OpasSilmukka.AvausKatseEteenOsuus * 1100) < 10, $"katsepiste kohteen takana ({d:F0} m)");
            double suunta = OpasSilmukka.Suunta(41.8902, 12.4922, s.Asento.Lat, s.Asento.Lon);
            Oleta.Tosi(Math.Abs(KierrosLento.Kiedo(suunta - s.Asento.Suuntima)) < 2, $"katsesuunnassa ({suunta:F0}° vs {s.Asento.Suuntima:F0}°)");
            s.LatausEdistys = () => 1.0;
            for (int i = 0; i < 60 && s.Siirtymassa; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(!s.Siirtymassa && !s.KohdistaAvausKohteeseen("Pantheon", 41.8986, 12.4769), "siirron jälkeen ei kohdisteta");
        }

        [Testi] static void ValmiinEsittelynKaupungissaEiReitinMiettimista()
        {
            // Omistaja TF 163 (Pariisi): "miksi lukija sanoo että mietin sopivan reitin? eikö se pitäisi olla jo valmiiksi mietittynä?"
            Oleta.Sama(OpasSiltalauseet.OdotusValmis, OpasSiltalauseet.ValmiillaReitilla(OpasSiltalauseet.Odotus));
            Oleta.Sama(null, OpasSiltalauseet.ValmiillaReitilla(OpasSiltalauseet.OdotusPaikalla), "paikallaan ei odotuslausetta");
            Oleta.Sama(OpasSiltalauseet.Kierros, OpasSiltalauseet.ValmiillaReitilla(OpasSiltalauseet.Kierros), "muut ryhmät ennallaan");
            var (ryhma, ehto) = OpasSiltalauseet.Rajaus(OpasSiltalauseet.OdotusValmis);
            Oleta.Sama(OpasSiltalauseet.Odotus, ryhma);
            foreach (var t in new[] { "Hetkinen, katson karttaa.", "Etsin meille parhaan reitin.", "Hetki vain, tarkistan suunnan." })
                Oleta.Tosi(!ehto(new Siltalause { Teksti = t }), "reitin miettiminen pois: " + t);
            foreach (var t in OpasSiltalauseet.LennonOdotukset) Oleta.Tosi(ehto(new Siltalause { Teksti = t }), "lennon odotus sallittu: " + t);
        }

        [Testi] static void KiertoHiipuuLennonAlussaSKayrana()
        {
            // Omistaja 23.4x: "kaikki kiihdytykset S-käyriä mukaillen": pysähdyksen kierto (0,9°/s) ei pysähdy kerralla lennon alkaessa,
            // vaan kääntönopeus muuttuu jatkuvasti; pallo: suunta kääntyy etenemisen mukana.
            OpasSilmukka.PalloLento = true;
            try
            {
                var (s, p, puhe) = Pysahdyksella();
                for (int i = 0; i < 100; i++) s.Paivita(0.05, _ => 5);   // kierto täydessä nopeudessa
                s.AaniLoppui();
                double ed = s.Asento.Suuntima, edNopeus = double.NaN, hyppy = 0, nopeusEnnen = 0;
                bool lento = false; int lentoAskeleita = 0;
                s.Esita(K("B", 55.6790, 12.5750));
                for (int i = 0; i < 400 && lentoAskeleita < 80; i++)
                {
                    s.Paivita(0.05, _ => 5);
                    double nopeus = KierrosLento.Kiedo(s.Asento.Suuntima - ed) / 0.05; ed = s.Asento.Suuntima;
                    if (s.Vaihe == OpasVaihe.Lentaa) { lento = true; lentoAskeleita++; } else if (!lento) nopeusEnnen = nopeus;
                    if (!double.IsNaN(edNopeus) && (lento || s.Vaihe == OpasVaihe.Lentaa)) hyppy = Math.Max(hyppy, Math.Abs(nopeus - edNopeus));
                    edNopeus = nopeus;
                }
                Oleta.Tosi(lento, "lento alkoi");
                // Omistaja 8.10.: pallon pysähdys ei kierrä kohteen ympäri (lipuminen kohti seuraavaa) → kääntö ennen lentoa pieni.
                Oleta.Tosi(Math.Abs(nopeusEnnen) < 1.0, $"kääntö ennen lentoa {nopeusEnnen:F2}°/s (ei kiertoa)");
                Oleta.Tosi(hyppy < 0.3, $"kääntönopeus muuttuu jatkuvasti lennon alussa (suurin hyppy {hyppy:F2}°/s / 50 ms)");
            }
            finally { OpasSilmukka.PalloLento = false; }
        }

        [Testi] static void KierronHiipuminenJatkuva()
        {
            double w = OpasKuvaus.KiertoAsteS, r = OpasKuvaus.KiertoAlkuS;
            Oleta.Tosi(Math.Abs(OpasKuvaus.KierronHiipuminen(w, 0) + w * r / 2) < 1e-9, "alussa −nopeus·R/2 (lähtöasento siirretty +nopeus·R/2)");
            Oleta.Tosi(Math.Abs(OpasKuvaus.KierronHiipuminen(w, r)) < 1e-9 && Math.Abs(OpasKuvaus.KierronHiipuminen(w, 2 * r)) < 1e-9, "R:n jälkeen 0");
            double d0 = (OpasKuvaus.KierronHiipuminen(w, 0.001) - OpasKuvaus.KierronHiipuminen(w, 0)) / 0.001;
            double d1 = (OpasKuvaus.KierronHiipuminen(w, r) - OpasKuvaus.KierronHiipuminen(w, r - 0.001)) / 0.001;
            Oleta.Tosi(Math.Abs(d0 - w) < 0.01 && Math.Abs(d1) < 0.01, $"nopeus alussa {d0:F3} (= kierto), lopussa {d1:F3} (= 0)");
        }

        [Testi] static void PelaajanToimintaHylkaaLykatynKysymyksen()
        {
            var (s, p, puhe) = Pysahdyksella();
            var kysyt = new List<string>(); s.Kysyy += k => kysyt.Add(k.Teksti);
            s.Vastaus(p[^1].n, new OpasKohde { Kysymys = true, Teksti = "Minne?", Vaihtoehdot = new[] { "a" } });
            s.Toive("Nyhavn");
            s.AaniLoppui();
            for (int i = 0; i < 30; i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama(0, kysyt.Count, "toive ohittaa vanhan kysymyksen");
        }

        [Testi] static void PyynnonPaikkaOnValittuKaupunkiKunnesKameraPerilla()
        {
            var kpn = new Kuvakulma(55.679, 12.576, 2200, 55, 40, 45);
            var sydney = (-33.8688, 151.2093);
            var (lat, lon) = OpasSilmukka.PyynnonPaikka(kpn, sydney);
            Oleta.Tosi(Math.Abs(lat + 33.8688) < 1e-9 && Math.Abs(lon - 151.2093) < 1e-9, "kamera Kööpenhaminassa → Sydneyn keskusta");
            var oopperatalo = new Kuvakulma(-33.8568, 151.2153, 800, 55, 40, 45);
            (lat, lon) = OpasSilmukka.PyynnonPaikka(oopperatalo, sydney);
            Oleta.Tosi(Math.Abs(lat + 33.8568) < 1e-9, "kamera Sydneyssä → kameran paikka");
            (lat, lon) = OpasSilmukka.PyynnonPaikka(kpn, (55.6761, 12.5683));
            Oleta.Tosi(Math.Abs(lat - 55.679) < 1e-9, "Kööpenhamina valittuna → kamera");
        }

        [Testi] static void PcmAlkupuskuriMitatustaNopeudesta()
        {
            // Nopea virta (tavallinen, 1,5–3,5 ×): alku 1 s kuten ennen.
            Oleta.Sama(1.0, OpasPcmPuskuri.Tarvitaan(15, OpasPcmPuskuri.Nopeus(1.0, 0.4)));
            Oleta.Sama(1.0, OpasPcmPuskuri.Tarvitaan(30, 2.0));
            // Simu 6.10. 20.38 Sydney: 15 s ääntä 18,5 s:ssa (0,81 ×) → noin 4,4 s; ei katkoa (B ≥ T(1 − r)).
            double b = OpasPcmPuskuri.Tarvitaan(15, 15 / 18.5);
            Oleta.Tosi(b >= 15 * (1 - 15 / 18.5) && b < 5, $"hidas virta {b:F2} s");
            Oleta.Sama(OpasPcmPuskuri.MaxS, OpasPcmPuskuri.Tarvitaan(60, 0.5), "yläraja");
            Oleta.Sama(1.0, OpasPcmPuskuri.Tarvitaan(0, 0.5), "kesto tuntematon");
            Oleta.Tosi(OpasPcmPuskuri.Tarvitaan(3, 0.2) <= 3, "ei yli keston");
        }

        // ---- SEURAAVA-NAPPI JA ESILATAUS (omistaja 6.10. 23.3x, juna 156) ----

        [Testi] static void SeuraavaOhittaaKierroksenKohteen()
        {
            var (s, p, puhe, _) = KierroksellaT1Puhuu();
            int hiljennyksia = 0; s.Hiljenna += () => hiljennyksia++;
            Oleta.Sama("T2", p[^1].t, "T2 pyynnössä");
            Oleta.Tosi(s.OdotettuPaikka != null, "jonon paikka tunnetaan ennen vastausta");
            Oleta.Tosi(s.Esilataus(_ => 5) != null, "esilataus jonon paikasta");
            Oleta.Tosi(s.OhitaKohde(), "ohitettiin");
            Oleta.Sama(1, hiljennyksia, "T1 vaikeni");
            s.Vastaus(p[^1].n, K("T2", 55.6786, 12.5790));
            for (int i = 0; i < 300 && !(s.Nykyinen?.Id == "T2" && s.Vaihe == OpasVaihe.Puhuu); i++) s.Paivita(0.1, _ => 5);
            Oleta.Sama("T2", s.Nykyinen?.Id, "lensi T2:een heti vastauksen tultua");
        }

        [Testi] static void SeuraavaVapaastaTilastaPyytaaOppaanKohteen()
        {
            var (s, p, puhe, _) = KierroksellaT1Puhuu();
            s.LopetaKierros();
            int n = p.Count;
            Oleta.Tosi(s.OhitaKohde() && !s.VapaaTila, "vapaa tila päättyi");
            Oleta.Sama(n + 1, p.Count, "uusi pyyntö");
        }
    }
}
