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
    }
}
