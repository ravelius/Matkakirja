// Fokustehtävät, vihreä aarrepiste ja lehden tehtävänappi (Scripts/Peli/Fokus.cs,
// KysymysApu.TehtavaNappi): webin js/fokustehtavat.js, js/fokusvirta.js ja ui.js tehtavaNapinTila.
using System;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    static class FokusTestit
    {
        // Pariisi: kohtaaminen, piste ja kaksi lehtitehtävää (aarre + juliste). Lontoo: vain juliste.
        const string Json = @"{""alkiot"":[
 {""id"":""pariisi"",""data"":{""kohtaaminen"":{""hahmo"":""X""},""kohtaamispiste"":{""nimi"":""Louvre"",""laudat"":{""maailmankartta"":{""x"":6000.5,""y"":1500.25}}},
   ""lehtitehtavat"":[{""id"":""aarre"",""palkinto"":""piste""},{""id"":""juliste"",""palkinto"":""juliste""}]}},
 {""id"":""lontoo"",""data"":{""lehtitehtavat"":[{""id"":""juliste"",""palkinto"":""juliste""}]}}]}";

        static Matka PeliJossaLaattaPariisissa(out Kaupat ka)
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(9L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            if (!m.LaattaTassa("pariisi")) throw new Exception("testi olettaa laatan Pariisissa (siemen 9)");
            ka = new Kaupat(m);
            return m;
        }

        [Testi] static void AvaajatJaPisteKutenWeb()
        {
            var f = Fokusdata.Lue(Json);
            Oleta.Sama(2, f.Kaupunkeja);
            Oleta.Sama("fokus:aarre", string.Join(",", f.Avaajat("pariisi")), "juliste ei avaa aarretta");
            f.Kulttuurivisa = k => k == "pariisi";
            Oleta.Sama("fokus:aarre,fokus:kulttuurivisa", string.Join(",", f.Avaajat("pariisi")), "kulttuurivisa kohtaamiskaupungissa");
            Oleta.Sama(0, f.Avaajat("lontoo").Count);

            var m = PeliJossaLaattaPariisissa(out var ka);
            var p = f.Piste(ka);
            Oleta.Tosi(p != null && p.Lukittu && p.Teko == Fokusdata.Lukkolappu, "lukittu piste ennen avausta");
            Oleta.Sama("Louvre", p.Nimi);
            Oleta.Tosi(p.X == 6000.5 && p.Y == 1500.25, "laudan piste");
            Oleta.Tosi(!f.AarreAuki(ka, "pariisi"), "aarre ei auki");

            // Väärä vastaus ei avaa; oikea avaa (MinitehtavatOikein).
            ka.Minitehtava("pariisi", "fokus:kulttuurivisa", false);
            Oleta.Tosi(!f.AarreAvattu(ka, "pariisi") && !f.AarreVastattu(ka, "pariisi"), "yksi väärin ei ole umpikuja");
            ka.Minitehtava("pariisi", "fokus:aarre", true);
            Oleta.Tosi(f.AarreAvattu(ka, "pariisi") && f.AarreVastattu(ka, "pariisi"), "avattu");
            p = f.Piste(ka);
            Oleta.Tosi(!p.Lukittu && p.Teko == "tapaa paikallinen", "piste auki");

            // Laatta käännetty → piste sammuu, aarre "auki".
            m.KaannaLaatta("pariisi");
            Oleta.Tosi(f.Piste(ka) == null && f.AarreAuki(ka, "pariisi"), "laatan jälkeen ei pistettä");
        }

        [Testi] static void PullaJaNostotehtavatAvaavatPisteen()
        {
            var f = Fokusdata.Lue(Json);
            PeliJossaLaattaPariisissa(out var ka);
            Oleta.Tosi(ka.PullaVinkki("pariisi").Ok, "pulla");
            Oleta.Tosi(f.AarreAvattu(ka, "pariisi"), "pulla avaa (web fokusAarreAvattu)");

            PeliJossaLaattaPariisissa(out var kb);
            kb.KirjaaNostotehtava();
            Oleta.Tosi(f.Piste(kb).Lukittu, "yksi nosto ei riitä");
            kb.KirjaaNostotehtava();
            Oleta.Tosi(!f.Piste(kb).Lukittu && !f.AarreAvattu(kb, "pariisi"), "kaksi nostoa avaa pisteen, ei aarteen jälkeä");
        }

        [Testi] static void TehtavaNappiKutenWeb()
        {
            var m = PeliJossaLaattaPariisissa(out _);
            var ky = new Kysely(m, KyselyTestit.Data);
            m.AloitaVuoro();
            // Laatta kaupungissa, ei kaarta: "Etsi kätkö".
            var n = KysymysApu.TehtavaNappi(ky, "pariisi");
            // Pariisi on kaarikaupunki, jos testipaketissa on sen kohtaaminen: silloin kohtaaminen ratkaisee.
            string odotettu = ky.KaariTarina("pariisi") != null ? "Tapaa " + KyselyTestit.Data.Kaaret["pariisi"].Nimi : "Etsi kätkö";
            Oleta.Tosi(n.HasValue && n.Value.Teksti == odotettu && !n.Value.Pois, $"laatta: {odotettu}, saatu {n?.Teksti}");
            // Kaarikaupunki: "Tapaa {nimi}" ennen yritystä, "Viimeinen mahdollisuus tavata" yrityksen jälkeen.
            // Nappi koskee pelaajan kaupunkia (web tokenHere): pelaaja kaarikaupunkiin, jossa ei ole laattaa.
            var kaari = KyselyTestit.Data.Kaaret.Keys.First(k => KyselyTestit.Data.Kaaret[k].Nimi != null && k != "pariisi");
            var nimi = KyselyTestit.Data.Kaaret[kaari].Nimi;
            m.Tila.Pelaaja.Sijainti = Sijainti.KaupungissaSijainti(kaari);
            if (m.LaattaTassa(kaari)) m.KaannaLaatta(kaari);
            Oleta.Sama("Tapaa " + nimi, KysymysApu.TehtavaNappi(ky, kaari).Value.Teksti);
            m.Tila.Kysely.KaariYritykset[kaari] = new KaariYritys { Yritykset = 1 };
            Oleta.Sama("Viimeinen mahdollisuus tavata", KysymysApu.TehtavaNappi(ky, kaari).Value.Teksti);
            m.Tila.Kysely.KaariYritykset[kaari] = new KaariYritys { Yritykset = 1, Onnistui = true };
            var tapasi = KysymysApu.TehtavaNappi(ky, kaari).Value;
            Oleta.Tosi(tapasi.Pois && tapasi.Teksti == "Tapaa " + nimi, "tavattu: harmaa");
            m.Tila.Kysely.KaariYritykset[kaari] = new KaariYritys { Yritykset = KysymysVakiot.KaariYritykset };
            var ohi = KysymysApu.TehtavaNappi(ky, kaari).Value;
            Oleta.Tosi(ohi.Pois && ohi.Teksti == nimi + " ei tavattavissa", "yritykset käytetty: " + ohi.Teksti);
            // Oma nappi kohtaamisista voittaa.
            var ko = new Kohtaamiset();
            ko.Kaupungit[kaari] = new Kohtaaminen { Nappi = "Tapaa kirjakauppias" };
            m.Tila.Kysely.KaariYritykset.Remove(kaari);
            Oleta.Sama("Tapaa kirjakauppias", KysymysApu.TehtavaNappi(ky, kaari, ko).Value.Teksti);
        }
    }
}
