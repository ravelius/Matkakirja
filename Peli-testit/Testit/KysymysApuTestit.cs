// Kysymysnäkymän datan (Scripts/Peli/KysymysApu.cs) testit oikealla
// sisältöpaketilla: laattakaupungin kysymys Pariisista, vihje, 50:50,
// oikea vastaus kääntää laatan ja löytörivi, aika loppui, JSON ja
// encodeURIComponent. ./kaanna.sh KysymysApu
using System;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class KysymysApuTestit
    {
        /// <summary>Uusi peli laatoilla ja kysymysmoottorilla; pelaaja siirretään kohtaamattomaan laattakaupunkiin vuoron alkuun.</summary>
        static (Matka M, Kysely K, Loyto[] L) Laattakaupungissa(long siemen = 12345)
        {
            var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            var k = new Kysely(m, KyselyTestit.Data);
            var loyto = new Loyto[1];
            m.Loysi += (p, l) => loyto[0] = l;
            m.AloitaVuoro();
            var kaupunki = m.Laatat.Laatat.Keys.First(c => KyselyTestit.Data.Kaupungeittain.ContainsKey(c) && k.KaariTarina(c) == null);
            m.Tila.Pelaaja.Sijainti = Sijainti.KaupungissaSijainti(kaupunki);
            m.Tila.Pelaaja.Raha = 500;
            return (m, k, loyto);
        }

        [Testi] static void AvoinKysymysNakymaksi()
        {
            var (m, k, _) = Laattakaupungissa();
            var tulos = k.Tutki();
            Oleta.Tosi(tulos.Ok, tulos.Virhe);
            var q = m.Tila.Kysely.Kysymys;
            var d = KysymysApu.Nakyma(k, q);
            Oleta.Tosi(d.Otsikko.StartsWith(m.Verkko.Kaupungit[q.Kaupunki].Nimi + " · "), d.Otsikko);
            Oleta.Sama(q.Vaihtoehdot.Count, d.Vaihtoehdot.Count, "vaihtoehdot");
            Oleta.Tosi(!d.Vastattu, "ei vastattu");
            Oleta.Sama(q.Laji == KysymysMuoto.Pulma ? (int?)null : KysymysVakiot.Sekunnit, d.Sekunnit, "aikaraja");
            Oleta.Sama(!string.IsNullOrEmpty(q.Vihje), d.VihjeTarjolla, "vihjenappi");
            Oleta.Sama(q.Vaihtoehdot.Count >= 4, d.PuolitusTarjolla, "50:50-nappi");
            Oleta.Sama(500, d.Raha, "raha");
            Oleta.Tosi(d.Kehys == null || char.IsUpper(d.Kehys[0]), "kehys isolla");
        }

        [Testi] static void VihjePuolitusJaOikeaVastaus()
        {
            // Etsi siemen, jolla laattakaupungin (ei kohtaamista) kysymys on visa, jossa on vihje ja 4 vaihtoehtoa.
            for (long s = 1; s < 200; s++)
            {
                var (m, k, loyto) = Laattakaupungissa(s);
                if (!k.Tutki().Ok) continue;
                var q = m.Tila.Kysely.Kysymys;
                if (q.Laji != KysymysMuoto.Visa || q.Kaari || q.Vihje == null || q.Vaihtoehdot.Count < 4) continue;

                Oleta.Tosi(k.Vihje().Ok, "vihje");
                Oleta.Tosi(k.Puolita().Ok, "50:50");
                var d = KysymysApu.Nakyma(k, q);
                Oleta.Sama(q.Vihje, d.Vihje, "ostettu vihje näkyy");
                Oleta.Tosi(!d.VihjeTarjolla && !d.PuolitusTarjolla, "napit pois käytön jälkeen");
                Oleta.Sama(2, d.Piilotetut.Count, "kaksi piiloon");
                Oleta.Sama(500 - KysymysVakiot.VihjeHinta - KysymysVakiot.PuolitusHinta, d.Raha, "hinnat");

                Oleta.Tosi(k.Vastaa(q.Oikea).Ok, "vastaus");
                d = KysymysApu.Nakyma(k, q, loyto[0]);
                Oleta.Tosi(d.Vastattu && d.Oikein && !d.AikaLoppui, "oikein");
                Oleta.Sama(q.Oikea, d.Valittu, "valittu");
                Oleta.Tosi(loyto[0] != null, "laatta kääntyi");
                Oleta.Sama(KysymysApu.LoytoTeksti(loyto[0]), d.Loyto?.Split('\n')[0], "löytörivi");
                Oleta.Sama(q.Fakta, d.Fakta, "fakta");
                var json = KysymysApu.Json(d, 0);
                Oleta.Tosi(json.StartsWith("{\"laji\":\"Visa\"") && json.Contains("\"oikein\":true") && json.EndsWith("}"), json);
                MiniJson.Jasenna(json);
                return;
            }
            throw new Exception("ei sopivaa siementä");
        }

        [Testi] static void AikaLoppuiVaarin()
        {
            var (m, k, loyto) = Laattakaupungissa();
            Oleta.Tosi(k.Tutki().Ok, "tutki");
            var q = m.Tila.Kysely.Kysymys;
            if (q.Laji == KysymysMuoto.Pulma) return;
            Oleta.Tosi(k.AikaLoppui().Ok, "aika");
            var d = KysymysApu.Nakyma(k, q, loyto[0]);
            Oleta.Tosi(d.Vastattu && !d.Oikein && d.AikaLoppui && d.Valittu == -1, "aika loppui");
            Oleta.Tosi(loyto[0] == null, "laatta ei kääntynyt");
            Oleta.Tosi(k.Sulje().Ok, "sulje");
            Oleta.Tosi(m.Tila.Vaihe != Vaihe.Kysymys, "vaihe vaihtui");
        }

        [Testi] static void LoytoTekstit()
        {
            Oleta.Sama(null, KysymysApu.LoytoTeksti(null));
            Oleta.Sama("Laatan alta lehahti pöllö!", KysymysApu.LoytoTeksti(new Loyto { Pollo = true }));
            Oleta.Sama("Laatan alla odotti ryöstäjä!", KysymysApu.LoytoTeksti(new Loyto { Tyyppi = "robber", Kaksintaistelu = true }));
            Oleta.Sama("Löysit: Kätketty matka-arkku · +640 £", KysymysApu.LoytoTeksti(new Loyto { Tyyppi = "isoAarre", RahaLisays = 640 }));
            Oleta.Sama("Laatta oli tyhjä.", KysymysApu.LoytoTeksti(new Loyto { Tyyppi = "empty" }));
        }

        [Testi] static void CommonsOsoiteKuinEncodeURIComponent()
        {
            Oleta.Sama("https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20C%C3%B4te%20d'Ivoire.svg?width=320",
                KysymysApu.CommonsUrl("Flag of Côte d'Ivoire.svg", 320));
        }
        [Testi] static void KaksintaisteluNakymaksi()
        {
            var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(7), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            new Kysely(m, KyselyTestit.Data);
            var rosvo = new Kaksintaistelu(m, Kaksintaistelut.LueKansiosta(KultaisetApu.Paketti));
            m.AloitaVuoro();
            m.Tila.Pelaaja.Raha = 300;
            Oleta.Tosi(rosvo.Aloita().Ok, "aloita");
            var d = KysymysApu.Kaksintaistelu(rosvo);
            Oleta.Sama(KysymysLaji.Kaksintaistelu, d.Laji);
            Oleta.Sama("Rosvon kaksintaistelu — Fogg", d.Otsikko);
            Oleta.Sama(8, d.Vaihtoehdot.Count, "8 vaihtoehtoa");
            Oleta.Sama("Helpotus (rosvo vie 150 £)", d.PuolitusTeksti);
            Oleta.Tosi(d.PuolitusTarjolla && !d.PuolitusHarmaa && !d.VihjeTarjolla, "napit");
            Oleta.Sama((int?)KaksintaisteluVakiot.Sekunnit, d.Sekunnit);

            Oleta.Tosi(rosvo.Helpotus().Ok, "helpotus");
            d = KysymysApu.Kaksintaistelu(rosvo);
            Oleta.Sama(4, d.Piilotetut.Count, "neljä pois");
            Oleta.Sama("Rosvo on vienyt 150 puntaa.", d.Huomautus);
            Oleta.Sama(150, d.Raha);

            var a = rosvo.Avoin;
            int vaara = Enumerable.Range(0, 8).First(i => i != a.Oikea && !a.Piilotetut.Contains(i));
            Oleta.Tosi(rosvo.Vastaa(vaara).Ok, "vastaa");
            d = KysymysApu.Kaksintaistelu(rosvo);
            Oleta.Tosi(d.Vastattu && !d.Oikein && !d.PuolitusTarjolla, "väärin");
            Oleta.Sama($"Rosvo vei rahat — oikea vastaus oli \"{a.Vaihtoehdot[a.Oikea]}\".", d.Loyto);
            Oleta.Sama(0, m.Tila.Pelaaja.Raha);
            MiniJson.Jasenna(KysymysApu.Json(d, 0));
        }

        [Testi] static void TapahtumakorttiNakymaksi()
        {
            var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(3), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            var k = new Kysely(m, KyselyTestit.Data);
            var tap = Tapahtumat.Kytke(k, Tapahtumadata.LueKansiosta(KultaisetApu.Paketti));
            m.AloitaVuoro();
            Oleta.Tosi(tap.Avaa("pariisi").Ok, "avaa");
            var d = KysymysApu.Tapahtumakortti(m, m.Tila.Tapahtumakortti);
            Oleta.Sama(KysymysLaji.Tapahtumakortti, d.Laji);
            Oleta.Sama("Pariisi · tapahtuma", d.Otsikko);
            Oleta.Sama(m.Tila.Tapahtumakortti.Teksti, d.Kysymys);
            Oleta.Tosi(d.Vastattu && d.Vaihtoehdot.Count == 0 && d.Sekunnit == null, "vain Jatka");
            Oleta.Tosi(tap.Sulje().Ok, "sulje");
            Oleta.Tosi(m.Tila.Vaihe != Vaihe.Tapahtuma, "kiinni");
        }
        [Testi] static void PulmaNakymaksi()
        {
            var data = Pulmadata.LueKansiosta(KultaisetApu.Paketti);
            Oleta.Tosi(data.Pulmat.Count > 0, "pulmia");
            int nahty = 0;
            foreach (var pm in data.Pulmat)
            {
                if (!KultaisetApu.Verkko.Kaupungit.ContainsKey(pm.Kaupunki)) continue;
                var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(11), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
                var k = new Kysely(m, KyselyTestit.Data);
                Pulmat.Kytke(k, data);
                m.AloitaVuoro();
                m.Tila.Pelaaja.Sijainti = Sijainti.KaupungissaSijainti(pm.Kaupunki);
                m.ArvioiEsivalinta();
                if (k.KaariTarina(pm.Kaupunki) != null) continue;
                var r = k.Tutki();
                Oleta.Tosi(r.Ok, pm.Id + ": " + r.Virhe);
                var q = m.Tila.Kysely.Kysymys;
                Oleta.Sama(KysymysMuoto.Pulma, q.Laji, pm.Id);
                var d = KysymysApu.Nakyma(k, q);
                Oleta.Sama(KysymysLaji.Pulma, d.Laji);
                Oleta.Sama(q.PulmaId, d.PulmaId);
                Oleta.Tosi(d.Otsikko.Contains(q.PulmaTiedot.Otsikko ?? "pulma"), d.Otsikko);
                Oleta.Sama(q.Vaihtoehdot.Count, d.Vaihtoehdot.Count);
                if (q.PulmaTiedot.Kuvat != null) Oleta.Sama(q.Vaihtoehdot.Count, d.VaihtoehtoKuvat.Count, "kuvat");
                MiniJson.Jasenna(KysymysApu.Json(d, 0));
                nahty++;
            }
            Oleta.Tosi(nahty > 0, "ainakin yksi pulma avattiin");
        }
        [Testi] static void LippukysymysKokoelmanOsoitteella()
        {
            var liput = Kysymysdata.LueLiput(System.IO.File.ReadAllText(System.IO.Path.Combine(KultaisetApu.Paketti, "lippumaat.json")));
            Oleta.Sama(135, liput.Count, "lippumaat (koepaketti v4)");
            Oleta.Sama("ITA", liput[0].Iso);
            var (m, k, _) = Laattakaupungissa();
            k.Liput = liput;
            Oleta.Tosi(k.Tutki(false, KysymysMuoto.Lippu).Ok, "lippukysymys");
            var q = m.Tila.Kysely.Kysymys;
            Oleta.Sama(KysymysMuoto.Lippu, q.Laji);
            var osoitteet = new System.Collections.Generic.Dictionary<string, string> { [q.LippuTiedosto] = "https://esim.invalid/lippu.png" };
            Oleta.Sama("https://esim.invalid/lippu.png", KysymysApu.Nakyma(k, q, osoitteet: osoitteet).KuvaUrl);
            Oleta.Tosi(KysymysApu.Nakyma(k, q).KuvaUrl.StartsWith("https://commons.wikimedia.org/"), "Commons-vara");
        }
        [Testi] static void KohtaamisenRepliikitJaUusiYritys()
        {
            var ko = new Kohtaamiset();
            ko.LueKohtaamiset(System.IO.File.ReadAllText(System.IO.Path.Combine(KultaisetApu.Paketti, "kohtaamiset.json")));
            var x = ko.Kaupunki("lontoo");
            Oleta.Tosi(x != null && x.Tervehdys != null && x.Vaarin != null, "lontoo");
            var q = new AvoinKysymys { Kaupunki = "lontoo", Laji = KysymysMuoto.Visa };
            var d = new KysymysNaytto();
            Oleta.Tosi(KysymysApu.LisaaKohtaaminen(d, q, ko, false), "tervehdys näytettiin");
            Oleta.Sama(x.Tervehdys, d.Tervehdys);
            d = new KysymysNaytto();
            Oleta.Tosi(!KysymysApu.LisaaKohtaaminen(d, q, ko, true) && d.Tervehdys == null, "kerran");
            q.Valittu = 1; q.OikeinVastattu = false; q.Kaari = true;
            d = new KysymysNaytto();
            KysymysApu.LisaaKohtaaminen(d, q, ko, true);
            Oleta.Sama(x.Vaarin, d.Repliikki);
            Oleta.Tosi(!d.RepliikkiLoyto && d.Loyto == KysymysApu.UusiYritysOhje, "uusi yritys");
            q.AarreLukittui = true;
            d = new KysymysNaytto();
            KysymysApu.LisaaKohtaaminen(d, q, ko, true);
            Oleta.Sama(null, d.Loyto, "lukittu: ei lupausta");
            var kuva = new AvoinKysymys { Kaupunki = "lontoo", Laji = KysymysMuoto.Kuva };
            d = new KysymysNaytto();
            Oleta.Tosi(!KysymysApu.LisaaKohtaaminen(d, kuva, ko, false) && d.Tervehdys == null, "vain visa");
        }
    }
}
