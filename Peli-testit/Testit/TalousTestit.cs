// Talouden vaihe 1 (Peli/Talous.cs, Matka.VeloitaPaivakulut, TarkistaRahattomuus,
// PaataMatka, Odota): yksikkötestit pienellä verkolla. Koko pelin kultaiset jäljet
// (matka-, kysymys-, peli- ja pulmajälki) vertaavat samaa webin js/game.js:ää askel
// askeleelta; nämä testit kattavat reunat, joita jäljet eivät välttämättä osu
// (selviäminen, moninpelin pudotus, tallennus). ./kaanna.sh Talous
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Peli.Testit
{
    public static class TalousTestit
    {
        /// <summary>Pieni verkko maineen: ala = GBR (kallis), bee = IND (edullinen), cee ja saari ilman maata (keski).</summary>
        static Matka Uusi(string alku, int raha)
        {
            var v = ValeVerkko.Pieni();
            v.Kaupungit["ala"].Maa = "GBR";
            v.Kaupungit["bee"].Maa = "IND";
            var m = Matka.Luo(v, new Satunnainen(1), "Fogg", alku);
            m.Tila.Pelaaja.Raha = raha;
            m.AloitaVuoro();
            return m;
        }

        /// <summary>Odottaa (tai muuten päättää vuoron) kunnes kierroslaskuri on annettu tai peli ohi.</summary>
        static void OdotaKierrokseen(Matka m, int vuoroLaskuri)
        {
            while (m.Tila.VuoroLaskuri < vuoroLaskuri && m.Tila.Vaihe != Vaihe.Ohi)
            {
                if (m.Kulkutavat().Contains(Kulkutapa.Odota)) Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Odota).Ok, "odota");
                else m.PaataVuoro();
            }
        }

        [Testi] static void PaivakuluHintatasonMukaan()
        {
            // Web Math.round(8 × k) + Math.round(12 × k): 12 / 20 / 32 £.
            var m = Uusi("ala", 1000);
            var p = m.Tila.Pelaaja;
            var k = m.PaivakuluNyt();
            Oleta.Sama(Hintataso.Kallis, k.Taso);
            Oleta.Sama(13, k.Ruoka); Oleta.Sama(19, k.Majoitus); Oleta.Sama(32, k.Yhteensa);
            p.Sijainti = Sijainti.KaupungissaSijainti("bee");
            k = m.PaivakuluNyt();
            Oleta.Sama(Hintataso.Edullinen, k.Taso);
            Oleta.Sama(5, k.Ruoka); Oleta.Sama(7, k.Majoitus); Oleta.Sama(12, k.Yhteensa);
            p.Sijainti = Sijainti.KaupungissaSijainti("cee");
            Oleta.Sama(20, m.PaivakuluNyt().Yhteensa, "maaton kaupunki on keskitasoa");
            // Reitillä vain ruoka, reitin A-pään hintatasolla (web edgeById.get(edge).a).
            p.Sijainti = Sijainti.ReitillaSijainti("ala|bee", 1);
            k = m.PaivakuluNyt();
            Oleta.Tosi(k.Matkalla && k.Majoitus == 0, "yö kulkuneuvossa");
            Oleta.Sama(13, k.Yhteensa, "ala on reitin A-pää");
            p.Sijainti = Sijainti.KaupungissaSijainti("cee");
            Oleta.Sama(50, m.KassaRiittaa(), "1000 / 20");
            p.Rasti = 100;
            Oleta.Sama(45, m.KassaRiittaa(), "rästi vähennetään");
            // Paketin kaupunkien maat = web pack.map.cityCountry.
            Oleta.Sama(Hintataso.Kallis, new Matka(KultaisetApu.Verkko, new Satunnainen(1)).HintatasoKaupungissa("lontoo"));
            Oleta.Sama(Hintataso.Keski, Talous.MaanTaso(null));
            Oleta.Sama(Hintataso.Keski, Talous.MaanTaso("ESP"));
        }

        [Testi] static void PaivakuluVeloitetaanVuorokaudenVaihtuessa()
        {
            // Saari ilman laivarahaa: vain Odota. Päivä vaihtuu kierroksella 5 (4 vuoroa × 6 h).
            var m = Uusi("saari", 90);
            var rahat = new List<string>();
            m.Rahatilanne += (p, tilanne, _, __) => rahat.Add(tilanne);
            OdotaKierrokseen(m, 4);
            Oleta.Sama(90, m.Tila.Pelaaja.Raha, "päivä 1 ei maksa");
            OdotaKierrokseen(m, 5);
            Oleta.Sama(2, m.Tila.Paiva());
            Oleta.Sama(70, m.Tila.Pelaaja.Raha, "keskitaso 20");
            Oleta.Tosi(m.Tila.Pelaaja.Rahaton == null && rahat.Count == 0, "rahat riittivät");
            // Bussi ei kuluta aikaa eikä siksi veloita.
            var b = Uusi("bee", 200);
            Oleta.Tosi(b.PeruKulkutapa().Ok && b.Bussi("cee").Ok, "bussi");
            Oleta.Sama(150, b.Tila.Pelaaja.Raha);
        }

        [Testi] static void RahattomuusPaattaaMatkanKahdessaVuorokaudessa()
        {
            var m = Uusi("saari", 10);
            var tapahtumat = new List<string>();
            var rahat = new List<string>();
            m.Tapahtui += (laji, teksti) => tapahtumat.Add(laji + ":" + teksti);
            m.Rahatilanne += (p, tilanne, otsikko, ala) => rahat.Add(tilanne);
            var pl = m.Tila.Pelaaja;
            OdotaKierrokseen(m, 5);
            Oleta.Sama(0, pl.Raha, "maksettiin mitä oli");
            Oleta.Sama(10, pl.Rasti, "loput rästiin");
            Oleta.Tosi(pl.Rahaton != null && pl.Rahaton.AlkuVuoro == 5 && pl.Rahaton.Paiva == 2, "varoitus alkoi");
            Oleta.Sama("peli.vararikko.varoitus", string.Join(",", rahat));
            Oleta.Tosi(tapahtumat.Contains("rahat:Rahat lopussa — kaksi päivää aikaa"), string.Join("|", tapahtumat));
            Oleta.Sama(2, m.RahattomuuttaJaljella(), "kaksi vuorokautta");
            OdotaKierrokseen(m, 9);
            Oleta.Sama(30, pl.Rasti, "toinen päivä rästiin, varoitus ei ala uudelleen");
            Oleta.Sama(1, rahat.Count);
            Oleta.Sama(1, m.RahattomuuttaJaljella());
            OdotaKierrokseen(m, 12);
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe, "vielä matkalla");
            Oleta.Sama(1, m.RahattomuuttaJaljella(), "ceil(1 / 4)");
            OdotaKierrokseen(m, 13);
            Oleta.Sama(Vaihe.Ohi, m.Tila.Vaihe, "matka päättyi");
            Oleta.Tosi(pl.Pudonnut, "pudonnut");
            Oleta.Tosi(m.Tila.MatkaPaattyi != null && m.Tila.MatkaPaattyi.Pelaaja == 0
                && m.Tila.MatkaPaattyi.Kaupunki == "SAARI" && m.Tila.MatkaPaattyi.Paiva == 4, "loppukortin tiedot");
            Oleta.Sama(50, pl.Rasti, "päivän 4 kulu veloitettiin ennen loppua (web endTurn → beginTurn)");
            Oleta.Tosi(m.Tila.ViimeinenMatkalla == null, "yksinpelissä ei voittajaa");
            Oleta.Tosi(!m.ValitseKulkutapa(Kulkutapa.Odota).Ok, "ohi: ei tekoja");
            Oleta.Sama(1, rahat.Count, "yksinpelin loppu näkyy tilasta, ei tapahtumana");
        }

        [Testi] static void KassaSelviaaJaRastiMaksetaan()
        {
            var m = Uusi("saari", 10);
            var rahat = new List<string>();
            m.Rahatilanne += (p, tilanne, _, __) => rahat.Add(tilanne);
            var pl = m.Tila.Pelaaja;
            OdotaKierrokseen(m, 5);
            Oleta.Tosi(pl.Rahaton != null, "varoitus");
            // Rästi 10 + päiväkulu 20 = 30: 29 ei riitä, 30 riittää.
            pl.Raha = 29;
            OdotaKierrokseen(m, 6);
            Oleta.Tosi(pl.Rahaton != null && pl.Raha == 29, "ei vielä");
            pl.Raha = 30;
            OdotaKierrokseen(m, 7);
            Oleta.Tosi(pl.Rahaton == null && pl.Rasti == 0, "selvisi");
            Oleta.Sama(20, pl.Raha, "rästi maksettiin, päiväkulu vasta vuorokauden vaihtuessa");
            Oleta.Sama("peli.vararikko.varoitus,peli.vararikko.selvisi", string.Join(",", rahat));
            Oleta.Sama(null, m.RahattomuuttaJaljella());
            OdotaKierrokseen(m, 20);
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe, "uusi varoitus alkaa alusta");
            Oleta.Tosi(pl.Rahaton != null && pl.Rahaton.AlkuVuoro == 13, "toinen varoitus päivänä 4");
        }

        [Testi] static void MoninpelissaPudonnutOhitetaanJaViimeinenVoittaa()
        {
            var v = ValeVerkko.Pieni();
            var m = Matka.Luo(v, new Satunnainen(1), "Aino", "cee");
            var t = m.Tila;
            t.Pelaajat[0].Raha = 0;
            t.Pelaajat.Add(new Pelaaja { Id = 1, Nimi = "Bea", Aloitus = "cee", Sijainti = Sijainti.KaupungissaSijainti("cee"), Raha = 30 });
            t.Pelaajat.Add(new Pelaaja { Id = 2, Nimi = "Cai", Aloitus = "cee", Sijainti = Sijainti.KaupungissaSijainti("cee"), Raha = 1000 });
            var rahat = new List<string>();
            m.Rahatilanne += (p, tilanne, otsikko, _) => rahat.Add(p.Nimi + ":" + tilanne);
            m.AloitaVuoro();
            // Kaikki vuorot päättyvät suoraan (PaataVuoro = web endTurn); kierros kasvaa, kun vuoro palaa Ainolle.
            while (t.VuoroLaskuri < 13) m.PaataVuoro();
            // Aino: varoitus kierroksella 5 → pudotus kierroksella 13. Bea: 30 → 10 → rästi kierroksella 9.
            Oleta.Tosi(t.Pelaajat[0].Pudonnut, "Aino putosi");
            Oleta.Sama(1, t.Vuorossa, "pudonneen vuoro ohitettiin");
            Oleta.Tosi(t.Vaihe != Vaihe.Ohi, "kaksi jäljellä");
            Oleta.Sama("Aino:peli.vararikko.varoitus,Bea:peli.vararikko.varoitus,Aino:peli.vararikko.loppu", string.Join(",", rahat));
            Oleta.Sama(1000 - 20 * 3, t.Pelaajat[2].Raha, "Cai maksoi päivät 2–4");
            Oleta.Sama(0, t.Pelaajat[0].Raha, "pudonnut ei enää maksa: rästi jäätyi");
            int ainonRasti = t.Pelaajat[0].Rasti;
            while (t.Vaihe != Vaihe.Ohi && t.VuoroLaskuri < 30) m.PaataVuoro();
            Oleta.Sama(Vaihe.Ohi, t.Vaihe);
            Oleta.Sama(17, t.VuoroLaskuri, "Bea putosi kierroksella 9 + 8");
            Oleta.Tosi(t.Pelaajat[1].Pudonnut, "Bea putosi");
            Oleta.Sama(ainonRasti, t.Pelaajat[0].Rasti, "pudonneelta ei veloiteta");
            Oleta.Tosi(t.ViimeinenMatkalla == t.Pelaajat[2], "Cai jäi viimeisenä matkalle");
            Oleta.Tosi(t.MatkaPaattyi == null, "moninpelin loppu ei ole matkan loppukortti");
        }

        [Testi] static void TalousKulkeeTallennuksessaJaVanhaLatautuu()
        {
            var m = Uusi("saari", 10);
            OdotaKierrokseen(m, 5);
            var json = m.Tallenna();
            Oleta.Tosi(json.Contains("\"rasti\":10") && json.Contains("\"rahaton\":{\"alkuVuoro\":5,\"paiva\":2}")
                && json.Contains("\"pudonnut\":false") && json.Contains("\"matkaPaattyi\":null"), json);
            var l = Matka.Lataa(m.Verkko, json);
            Oleta.Sama(json, l.Tallenna(), "sama teksti");
            Oleta.Tosi(l.Tila.Pelaaja.Rahaton.AlkuVuoro == 5 && l.Tila.Pelaaja.Rasti == 10, "varoitus säilyi");
            OdotaKierrokseen(l, 13);
            Oleta.Sama(Vaihe.Ohi, l.Tila.Vaihe);
            var loppu = l.Tallenna();
            Oleta.Tosi(loppu.Contains("\"matkaPaattyi\":{\"pelaaja\":0,\"kaupunki\":\"SAARI\",\"paiva\":4}") && loppu.Contains("\"pudonnut\":true"), loppu);
            var l2 = Matka.Lataa(m.Verkko, loppu);
            Oleta.Sama(loppu, l2.Tallenna());
            Oleta.Tosi(l2.Tila.Rahattomuutta && l2.Tila.MatkaPaattyi.Paiva == 4, "loppu säilyi");
            // Versio 5 (ennen talouden vaihetta 1): ei talouskenttiä → ei velkaa eikä varoitusta.
            var v5 = Regex.Replace(json, ",\"(rasti|rahaton|pudonnut|matkaPaattyi)\":(\\{[^}]*\\}|[^,}]*)", "")
                .Replace("\"versio\":" + Pelitila.TallennusVersio, "\"versio\":5");
            Oleta.Tosi(!v5.Contains("rasti") && !v5.Contains("rahaton"), v5);
            var vanha = Matka.Lataa(m.Verkko, v5);
            Oleta.Sama(5, vanha.Tila.LuettuVersio);
            Oleta.Tosi(vanha.Tila.Pelaaja.Rahaton == null && vanha.Tila.Pelaaja.Rasti == 0 && !vanha.Tila.Pelaaja.Pudonnut
                && vanha.Tila.MatkaPaattyi == null && !vanha.Tila.Rahattomuutta, "oletukset");
        }

        /// <summary>
        /// Hintatasotaulu = webin js/packs/hintatasot.js. Web-tiedosto luetaan polusta
        /// WEBJS (oletus pelikoodarin checkout); jos sitä ei ole, testi ohitetaan.
        /// </summary>
        [Testi] static void HintatasotVastaavatWebinTaulua()
        {
            var js = Environment.GetEnvironmentVariable("WEBJS") ?? "/Users/Shared/Claude/Matkakirja-pelikoodari/js";
            var polku = Path.Combine(js, "packs", "hintatasot.js");
            if (!File.Exists(polku)) { Console.WriteLine("  (" + polku + " puuttuu, ohitetaan)"); return; }
            var web = new Dictionary<string, Hintataso>();
            foreach (Match x in Regex.Matches(File.ReadAllText(polku), "([A-Z]{3}): '(edullinen|keski|kallis)'"))
                web[x.Groups[1].Value] = x.Groups[2].Value == "kallis" ? Hintataso.Kallis
                    : x.Groups[2].Value == "edullinen" ? Hintataso.Edullinen : Hintataso.Keski;
            Oleta.Tosi(web.Count > 50, "web-taulun rivejä " + web.Count);
            Oleta.Sama(web.Count, Talous.Hintatasot.Count, "maita");
            foreach (var kv in web) Oleta.Sama(kv.Value, Talous.MaanTaso(kv.Key), kv.Key);
        }
    }
}
