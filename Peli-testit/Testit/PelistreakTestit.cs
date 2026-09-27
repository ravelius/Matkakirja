// Pelistreak (Peli/Pelistreak.cs, Matka.KirjaaPelipaiva): webin tests/rules.test.mjs
// 'pelistreak'-testit C#:lla sekä säännön reunat (kuukauden ja karkausvuoden vaihde,
// kelvoton päivä) ja tallennusversio 6 → 7. Päivä annetaan aina ulkoa, joten kultaiset
// jäljet eivät kirjaa pelipäiviä. ./kaanna.sh Pelistreak
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class PelistreakTestit
    {
        static Matka Uusi(int raha = 400)
        {
            var m = Matka.Luo(ValeVerkko.Pieni(), new Satunnainen(1), "Fogg", "ala");
            m.Tila.Pelaaja.Raha = raha;
            m.AloitaVuoro();
            return m;
        }

        [Testi] static void PerakkaisetPaivatPalkitaanJaValiinJaanytNollaa()
        {
            // Web: 'pelistreak: peräkkäiset pelipäivät palkitaan, väliin jäänyt päivä nollaa'.
            var m = Uusi();
            var p = m.Tila.Pelaaja;
            int alku = p.Raha;
            var toastit = new List<(int Pituus, string Otsikko, string Ala)>();
            var rahat = new List<string>();
            m.Pelistreak += (pp, pituus, otsikko, ala) => toastit.Add((pituus, otsikko, ala));
            m.Tapahtui += (laji, teksti) => { if (laji == "rahat") rahat.Add(teksti); };
            var paivat = new[] { "2026-09-27", "2026-09-28", "2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04" };
            var palkkiot = paivat.Select(d => m.KirjaaPelipaiva(d)?.Palkkio).ToArray();
            Oleta.Sama("0,0,20,20,20,20,150,30", string.Join(",", palkkiot));
            Oleta.Sama(alku + 260, p.Raha);
            Oleta.Tosi(m.KirjaaPelipaiva("2026-10-04") == null, "sama päivä ei palkitse uudelleen");
            Oleta.Sama(alku + 260, p.Raha);
            Oleta.Sama(((int, int)?)(1, 0), m.KirjaaPelipaiva("2026-10-07"), "kaksi väliin jäänyttä päivää nollaa");
            Oleta.Sama("30,130,130", string.Join(",", new[] { 13, 14, 21 }.Select(Streak.Palkkio)));
            Oleta.Sama(6, toastit.Count, "päivät 1–2 eivät ilmoita, eikä nollattu päivä");
            Oleta.Sama("Kolmas päivä peräkkäin matkalla", toastit[0].Otsikko);
            Oleta.Sama("+20 £", toastit[0].Ala);
            Oleta.Sama(7, toastit[4].Pituus);
            Oleta.Sama("+50 £ ja viikkobonus +100 £", toastit[4].Ala);
            Oleta.Sama("14. päivä peräkkäin matkalla", Streak.Otsikko(14));
            // Lokirivit (web say).
            Oleta.Sama(6, rahat.Count);
            Oleta.Sama("Kolmas päivä peräkkäin matkalla: +20 puntaa.", rahat[0]);
            Oleta.Sama("Seitsemäs päivä peräkkäin matkalla: +50 puntaa ja viikkobonus +100 puntaa.", rahat[4]);
            Oleta.Sama("Kahdeksas päivä peräkkäin matkalla: +30 puntaa.", rahat[5]);
            Oleta.Sama("14. päivä peräkkäin matkalla: +30 puntaa ja viikkobonus +100 puntaa.", Streak.Lokirivi(14));
        }

        [Testi] static void PudonnutJaPaattynytEivatKirjaaJaLaskuriKulkeeTallennuksessa()
        {
            // Web: 'pelistreak: botti, pudonnut ja päättynyt peli eivät kirjaa, laskuri kulkee tallennuksessa'
            // (natiivissa ei ole bottia: tekoälypelaaja on poistettu, A3).
            var m = Uusi();
            var p = m.Tila.Pelaaja;
            m.KirjaaPelipaiva("2026-09-27");
            m.KirjaaPelipaiva("2026-09-28");
            var json = m.Tallenna();
            Oleta.Tosi(json.Contains("\"streak\":{\"paiva\":\"2026-09-28\",\"pituus\":2}"), json);
            var ladattu = Matka.Lataa(m.Verkko, json);
            Oleta.Sama("2026-09-28", ladattu.Tila.Pelaaja.Streak.Paiva);
            Oleta.Sama(2, ladattu.Tila.Pelaaja.Streak.Pituus);
            Oleta.Sama(json, ladattu.Tallenna(), "sama teksti");
            Oleta.Sama(20, ladattu.KirjaaPelipaiva("2026-09-29").Value.Palkkio);
            p.Pudonnut = true;
            Oleta.Tosi(m.KirjaaPelipaiva("2026-09-29") == null, "pudonnut");
            p.Pudonnut = false;
            m.Tila.Vaihe = Vaihe.Ohi;
            Oleta.Tosi(m.KirjaaPelipaiva("2026-09-29") == null, "peli ohi");
            Oleta.Sama("2026-09-28", p.Streak.Paiva, "ei kirjausta");
        }

        [Testi] static void PalkkiotaulukkoJaOtsikot()
        {
            // Päivät 1–2: 0; 3–6: 20; 7.: 50 + 100; 8+: 30 ja joka 7. päivä +100.
            var odotettu = new[] { 0, 0, 20, 20, 20, 20, 150, 30, 30, 30, 30, 30, 30, 130, 30, 30, 30, 30, 30, 30, 130, 30 };
            for (int i = 0; i < odotettu.Length; i++) Oleta.Sama(odotettu[i], Streak.Palkkio(i + 1), "päivä " + (i + 1));
            var e7 = Streak.Erittely(7);
            Oleta.Tosi(e7.Paiva == 50 && e7.Viikko == 100, "7. päivä erittely");
            var e28 = Streak.Erittely(28);
            Oleta.Tosi(e28.Paiva == 30 && e28.Viikko == 100, "28. päivä erittely");
            Oleta.Sama("Ensimmäinen päivä peräkkäin matkalla", Streak.Otsikko(1));
            Oleta.Sama("Kymmenes päivä peräkkäin matkalla", Streak.Otsikko(10));
            Oleta.Sama("11. päivä peräkkäin matkalla", Streak.Otsikko(11));
            Oleta.Sama("+30 £", Streak.Ala(8));
        }

        [Testi] static void KuukaudenJaVuodenVaihdeJatkaaJaKelvotonPaivaEiKirjaa()
        {
            var m = Uusi();
            foreach (var d in new[] { "2027-12-30", "2027-12-31", "2028-01-01" }) m.KirjaaPelipaiva(d);
            Oleta.Sama(3, m.Tila.Pelaaja.Streak.Pituus, "vuoden vaihde");
            var k = Uusi();
            foreach (var d in new[] { "2028-02-27", "2028-02-28", "2028-02-29", "2028-03-01" }) k.KirjaaPelipaiva(d);
            Oleta.Sama(4, k.Tila.Pelaaja.Streak.Pituus, "karkauspäivä");
            var n = Uusi();
            n.KirjaaPelipaiva("2027-02-28");
            Oleta.Sama(2, n.KirjaaPelipaiva("2027-03-01").Value.Pituus, "helmikuun vaihde tavallisena vuonna");
            int raha = n.Tila.Pelaaja.Raha;
            foreach (var huono in new[] { null, "", "2027-3-02", "2027-02-30", "02.03.2027", "2027-03-02T00:00" })
                Oleta.Tosi(n.KirjaaPelipaiva(huono) == null, "kelvoton " + huono);
            Oleta.Sama("2027-03-01", n.Tila.Pelaaja.Streak.Paiva);
            Oleta.Sama(raha, n.Tila.Pelaaja.Raha);
            // Taaksepäin siirretty kello aloittaa uuden putken (web: vain eilisen jatko kasvattaa).
            Oleta.Sama(1, n.KirjaaPelipaiva("2027-02-27").Value.Pituus);
        }

        [Testi] static void Versio6NouseeVersioon7IlmanPutkea()
        {
            Oleta.Sama(7, Pelitila.TallennusVersio);
            var m = Uusi();
            var json = m.Tallenna();
            // Ilman kirjausta kenttää ei kirjoiteta (web JSON: p.streak puuttuu) — kultaiset eivät muutu.
            Oleta.Tosi(!json.Contains("streak"), json);
            var v6 = json.Replace("\"versio\":" + Pelitila.TallennusVersio, "\"versio\":6");
            Oleta.Tosi(v6.Contains("\"versio\":6"), v6);
            var vanha = Matka.Lataa(m.Verkko, v6);
            Oleta.Sama(6, vanha.Tila.LuettuVersio);
            Oleta.Tosi(vanha.Tila.Pelaaja.Streak == null, "vanhassa ei putkea");
            Oleta.Sama(json, vanha.Tallenna(), "seuraava tallennus on nykyversio samoin tiedoin");
            Oleta.Sama(((int, int)?)(1, 0), vanha.KirjaaPelipaiva("2026-09-27"), "putki alkaa 1:stä");
            // Rikkinäinen streak-kenttä ei kaada latausta: putki puuttuu.
            var rikki = vanha.Tallenna().Replace("\"paiva\":\"2026-09-27\"", "\"paiva\":\"eilen\"");
            Oleta.Tosi(rikki.Contains("\"streak\":{\"paiva\":\"eilen\""), rikki);
            Oleta.Tosi(Matka.Lataa(m.Verkko, rikki).Tila.Pelaaja.Streak == null, "kelvoton päivä ohitetaan");
        }

        [Testi] static void ArmopaivaYksiIkkunassaToinenNollaa()
        {
            // Web: 'pelistreak: armopäivä — yksi väliin jäänyt päivä 7 päivän ikkunassa ei katkaise, toinen nollaa'.
            var m = Uusi();
            (int, int)? K(string d) => m.KirjaaPelipaiva(d);
            K("2026-09-01"); K("2026-09-02"); K("2026-09-03");
            Oleta.Sama(((int, int)?)(4, 20), K("2026-09-05"), "4.9. armopäivä, pituus ei kasva sillä");
            Oleta.Sama("2026-09-04", m.Tila.Pelaaja.Streak.Armo);
            K("2026-09-06"); K("2026-09-07");
            Oleta.Sama(((int, int)?)(1, 0), K("2026-09-09"), "toinen väliin jäänyt päivä samassa ikkunassa nollaa");
            K("2026-09-10");
            Oleta.Sama(((int, int)?)(1, 0), K("2026-09-13"), "kaksi peräkkäistä väliin jäänyttä nollaa");
            K("2026-09-14");
            Oleta.Sama(3, K("2026-09-16")?.Item1 ?? 0);
            foreach (var d in new[] { "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-20", "2026-09-21", "2026-09-22" }) K(d);
            Oleta.Sama(10, K("2026-09-24")?.Item1 ?? 0, "armopäivä 23.9. on 8 päivää edellisestä");
            Oleta.Sama("2026-09-23", m.Tila.Pelaaja.Streak.Armo);
            // Armo kulkee tallennuksessa.
            var ladattu = Matka.Lataa(m.Verkko, m.Tallenna());
            Oleta.Sama("2026-09-23", ladattu.Tila.Pelaaja.Streak.Armo);
            Oleta.Sama(10, ladattu.Tila.Pelaaja.Streak.Pituus);
        }
    }
}
