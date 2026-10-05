// Lautapelien kohtaaminen ja kirjaus (Peli/Pelit/Peliluettelo.cs, Pelitila versio 9): pelin maat vain Euroopasta,
// kohtaaminen kyselyn tehtävänä vasta muiden tehtävien jälkeen (Kysely.PeliOdottaa/AvaaPeli, Natiivi.KysymysApu.TehtavaNappi),
// pelattu peli ei toistu kohtaamisena, Laukun Pelit-lista ja tallennus 8 → 9. ./kaanna.sh Pelit
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli.Pelit;

namespace Matkakirja.Peli.Testit
{
    public static class PelitTestit
    {
        static Reittiverkko Verkko() => new Reittiverkko(
            new List<Kaupunki>
            {
                new Kaupunki { Id = "berliini", Nimi = "Berliini", Maa = "DEU", Manner = "europe" },
                new Kaupunki { Id = "lontoo", Nimi = "Lontoo", Maa = "GBR", Manner = "europe" },
                new Kaupunki { Id = "bermuda", Nimi = "Bermuda", Maa = "GBR", Manner = "northamerica" },
                new Kaupunki { Id = "pariisi", Nimi = "Pariisi", Maa = "FRA", Manner = "europe" },
                new Kaupunki { Id = "ateena", Nimi = "Ateena", Maa = "GRC", Manner = "europe" },
            },
            new List<Reitti>
            {
                new Reitti { Id = "berliini|lontoo", A = "berliini", B = "lontoo", Laji = ReitinLaji.Maa, Askeleet = 1 },
                new Reitti { Id = "lontoo|pariisi", A = "lontoo", B = "pariisi", Laji = ReitinLaji.Maa, Askeleet = 1 },
                new Reitti { Id = "lontoo|bermuda", A = "lontoo", B = "bermuda", Laji = ReitinLaji.Meri, Askeleet = 2 },
                new Reitti { Id = "pariisi|ateena", A = "pariisi", B = "ateena", Laji = ReitinLaji.Maa, Askeleet = 3 },
            });

        static (Matka, Kysely) Uusi(string alku)
        {
            var m = Matka.Luo(Verkko(), new Satunnainen(3), "Fogg", alku);
            var ky = new Kysely(m, new Kysymysdata());
            m.AloitaVuoro();
            return (m, ky);
        }

        [Testi] static void YksiPeliYksiKoti()
        {
            // Omistaja 1.10. klo 21.0x: Mylly kohtaamisena vain Berliinissä (ei muita pelikatalogin maita).
            var v = Verkko();
            Oleta.Sama("Saksa / Mühle", Kuvaus(v, "berliini"));
            Oleta.Sama("-", Kuvaus(v, "lontoo"), "Iso-Britannian lisäys peruttu");
            Oleta.Sama("-", Kuvaus(v, "bermuda"));
            Oleta.Sama("-", Kuvaus(v, "pariisi"));
            // Tavli (5.10.2026): vain Ateenassa.
            Oleta.Sama("Kreikka / Τάβλι", Kuvaus(v, "ateena"));
        }

        [Testi] static void TavlinKohtaaminenAteenassa()
        {
            var (m, ky) = Uusi("ateena");
            Peliluettelo.Kytke(ky, (p, maa, k) => { });
            Oleta.Sama("Pelaa tavlia", Natiivi.KysymysApu.TehtavaNappi(ky, "ateena")?.Teksti, "Tavlin tehtävänappi");
            Pelikehys.Kirjaa(m, new PeliTulos { PeliId = "tavli", Nimi = "Tavli", Vastustaja = Vastustaja.BottiHelppo, Voittaja = 0, Siirtoja = 25 }, PelinTalous.Minipeli);
            Oleta.Sama((string)null, Natiivi.KysymysApu.TehtavaNappi(ky, "ateena")?.Teksti, "pelattu: ei enää kohtaamista");
            Oleta.Sama("kafeneio", string.Join(",", m.Tila.Pelaaja.Pelit.Single().Laudat), "ensimmäinen voitto: kafeneion lauta esineeksi");
        }

        static string Kuvaus(Reittiverkko v, string id) =>
            Peliluettelo.Kaupungille(v.Kaupungit[id]) is (PeliKuvaus p, PeliMaa m) ? m.MaanNimi + " / " + m.PaikallinenNimi : "-";

        [Testi] static void KohtaaminenOnKyselynTehtavaJaAvaaPelin()
        {
            var (m, ky) = Uusi("berliini");
            (PeliKuvaus Peli, PeliMaa Maa, Kaupunki K)? avattu = null;
            Peliluettelo.Kytke(ky, (p, maa, k) => avattu = (p, maa, k));
            Oleta.Tosi(ky.TehtavaTarjolla(m.Tila.Pelaaja), "pelin kaupungissa tehtävä tarjolla");
            Oleta.Sama("Pelaa myllyä", Natiivi.KysymysApu.TehtavaNappi(ky, "berliini")?.Teksti, "nykyinen tehtävänappi, uusi teksti");
            m.Tila.Vaihe = Vaihe.Toiminta; // kuten KyselyTestit: vuoron toimintavaihe
            var t = ky.Tutki();
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Tosi(avattu.HasValue && avattu.Value.Maa.MaanNimi == "Saksa" && avattu.Value.K.Nimi == "Berliini", "avaa pelin maassa");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe, "peli ei avaa kysymystä");
        }

        [Testi] static void PelattuPeliEiToistuKohtaamisena()
        {
            var (m, ky) = Uusi("berliini");
            Peliluettelo.Kytke(ky, (p, maa, k) => { });
            Pelikehys.Kirjaa(m, new PeliTulos { PeliId = "mylly", Nimi = "Mylly", Vastustaja = Vastustaja.Kaveri, Voittaja = 1, Siirtoja = 30, Paiva = "2026-10-01" }, PelinTalous.Minipeli);
            Oleta.Tosi(!ky.TehtavaTarjolla(m.Tila.Pelaaja), "pelattu: ei enää kohtaamista");
            Oleta.Sama((string)null, Natiivi.KysymysApu.TehtavaNappi(ky, "berliini")?.Teksti);
            Oleta.Sama(1, m.Tila.Pelaaja.Pelit.Single().Pelattu);
            Oleta.Sama(0, m.Tila.Pelaaja.Pelit.Single().Voitot, "kaveripeli ei ole bottivoitto");
            Pelikehys.Kirjaa(m, new PeliTulos { PeliId = "mylly", Nimi = "Mylly", Vastustaja = Vastustaja.BottiHelppo, Voittaja = 0, Siirtoja = 40 }, PelinTalous.Minipeli);
            Oleta.Sama("2/1", $"{m.Tila.Pelaaja.Pelit.Single().Pelattu}/{m.Tila.Pelaaja.Pelit.Single().Voitot}");
        }

        [Testi] static void EiPelinMaassaEiKohtaamista()
        {
            var (m, ky) = Uusi("pariisi");
            Peliluettelo.Kytke(ky, (p, maa, k) => { });
            Oleta.Tosi(!ky.TehtavaTarjolla(m.Tila.Pelaaja), "Ranska ei ole myllyn maa");
        }

        [Testi] static void TallennusVersio9JaVanhaIlmanPelejä()
        {
            Oleta.Sama(9, Pelitila.TallennusVersio);
            var (m, _) = Uusi("berliini");
            Oleta.Tosi(!m.Tallenna().Contains("\"pelit\""), "tyhjää ei kirjoiteta");
            Peliluettelo.Kirjaa(m.Tila.Pelaaja, "mylly", Vastustaja.BottiNormaali, true);
            var json = m.Tallenna();
            const string Pelit = "\"pelit\":[{\"id\":\"mylly\",\"pelattu\":1,\"voitot\":1,\"laudat\":[\"majatalo\",\"luostari\"]}]";
            Oleta.Tosi(json.Contains(Pelit), "kirjoitettu");
            var l = Matka.Lataa(Verkko(), json);
            Oleta.Sama("mylly 1/1 majatalo+luostari", string.Join(",", l.Tila.Pelaaja.Pelit.Select(g => $"{g.Id} {g.Pelattu}/{g.Voitot} {string.Join("+", g.Laudat)}")), "luettu takaisin");
            // Migraatio 8 → 9: versio 8 ilman pelit-kenttää latautuu, Pelit tyhjä.
            var vanha = Matka.Lataa(Verkko(), json.Replace("," + Pelit, "")
                .Replace("\"versio\":" + Pelitila.TallennusVersio, "\"versio\":8"));
            Oleta.Sama(0, vanha.Tila.Pelaaja.Pelit.Count, "8 → 9: pelit tyhjä");
            Oleta.Tosi(vanha.Tallenna().Contains("\"versio\":9"), "tallentuu versiona 9");
        }

        [Testi] static void LaudatAnsaitaanVoitoillaBottiaVastaan()
        {
            var (m, _) = Uusi("berliini");
            var p = m.Tila.Pelaaja;
            var mylly = Peliluettelo.Mylly;
            string Kaytossa() => string.Join(",", mylly.Laudat.Where(x => Peliluettelo.Kaytossa(p, mylly, x)).Select(x => x.Id));
            Oleta.Sama("majatalo", Kaytossa(), "majatalo heti");
            Oleta.Sama("", string.Join(",", Peliluettelo.Kirjaa(p, "mylly", Vastustaja.Kaveri, true).Select(x => x.Id)), "kaveripeli ei avaa");
            Oleta.Sama("", string.Join(",", Peliluettelo.Kirjaa(p, "mylly", Vastustaja.BottiVaikea, false).Select(x => x.Id)), "häviö ei avaa");
            Oleta.Sama("majatalo", string.Join(",", Peliluettelo.Kirjaa(p, "mylly", Vastustaja.BottiHelppo, true).Select(x => x.Id)), "ensimmäinen voitto: majatalo esineeksi");
            Oleta.Sama("luostari", string.Join(",", Peliluettelo.Kirjaa(p, "mylly", Vastustaja.BottiNormaali, true).Select(x => x.Id)));
            Oleta.Sama("majatalo,luostari", Kaytossa());
            Oleta.Sama("viikinkilaiva", string.Join(",", Peliluettelo.Kirjaa(p, "mylly", Vastustaja.BottiVaikea, true).Select(x => x.Id)));
            Oleta.Sama("", string.Join(",", Peliluettelo.Kirjaa(p, "mylly", Vastustaja.BottiVaikea, true).Select(x => x.Id)), "kerran");
            Oleta.Sama("majatalo,luostari,viikinkilaiva", Kaytossa());
            // Vaikean voitto ensimmäisenä avaa myös helpommat.
            var (m2, _) = Uusi("berliini");
            Oleta.Sama("majatalo,luostari,viikinkilaiva", string.Join(",", Peliluettelo.Kirjaa(m2.Tila.Pelaaja, "mylly", Vastustaja.BottiVaikea, true).Select(x => x.Id)));
        }

        [Testi] static void LaukkuListaaPelatut()
        {
            var (m, _) = Uusi("berliini");
            Oleta.Sama(0, Natiivi.Laukku.Rakenna(m, null, null).Pelit.Count);
            Peliluettelo.Kirjaa(m.Tila.Pelaaja, "mylly", Vastustaja.BottiHelppo, false);
            Peliluettelo.Kirjaa(m.Tila.Pelaaja, "mylly", Vastustaja.BottiHelppo, true);
            var rivit = Natiivi.Laukku.Rakenna(m, null, null).Pelit;
            Oleta.Sama("Mylly: Pelattu 2 kertaa · voittoja bottia vastaan 1", rivit[0].Nimi + ": " + rivit[0].Selite);
            Oleta.Sama("mylly:majatalo Majatalon myllylauta (voitit isännältä)", rivit[1].Id + " " + rivit[1].Nimi, "ansaittu lauta esineenä");
            Oleta.Sama(2, rivit.Count);
        }
    }
}
