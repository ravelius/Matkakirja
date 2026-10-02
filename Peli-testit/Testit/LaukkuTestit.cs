// Matkalaukun data (Scripts/Peli/Laukku.cs) oikealla sisältöpaketilla: kukkaro,
// tietäjätaso, tilastot, Aarnin luettelo, tavarat ja julisteet kuten webin
// renderProgress / renderAarteet / renderFinds / renderJulisteet.
using System;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    static class LaukkuTestit
    {
        static Aarrenimet nimet;
        static Aarrenimet Nimet
        {
            get
            {
                if (nimet != null) return nimet;
                nimet = new Aarrenimet();
                nimet.LueLaatat(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "laatat-v9.json")));
                nimet.LuePaikallisaarteet(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "paikallisaarteet.json")));
                return nimet;
            }
        }

        static Kauppasisalto Julisteet => Kauppasisalto.Lue(null, File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "julisteet.json")));

        static Matka UusiPeli() =>
            Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(9L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);

        [Testi] static void UusiLaukkuOnTyhja()
        {
            var m0 = UusiPeli();
            var d = Laukku.Rakenna(m0, Nimet, Julisteet);
            Oleta.Sama("Pariisi", d.Sijainti);
            Oleta.Sama("£" + Vakiot.AloitusRaha, d.Kukkaro);
            Oleta.Sama(1, d.Tietaja.Taso);
            Oleta.Tosi(d.Tietaja.SeuraavaRaja > 0 && d.Tietaja.SeuraavaNimi != null, "seuraava taso");
            Oleta.Sama("https://matkakirja.app/assets/tietaja/taso-01.jpg", d.Tietaja.AvatarUrl);
            Oleta.Sama(7, d.AarninLuettelo.Count, "seitsemän mannerta");
            Oleta.Sama(7, d.Kateissa);
            Oleta.Tosi(d.AarninLuettelo.All(a => a.Id == "aarni:" + a.Manner && a.Nimi != null), "vakaat tunnukset");
            Oleta.Sama("Avatut aarteet|0 / 7", d.Tilastot[0].Otsikko + "|" + d.Tilastot[0].Arvo);
            Oleta.Sama("Käydyt kaupungit", d.Tilastot[1].Otsikko);
            Oleta.Sama(m0.Tila.Pelaaja.Kaydyt.Count + " / " + KultaisetApu.Verkko.Kaupungit.Count, d.Tilastot[1].Arvo, "käydyt pelitilasta");
            Oleta.Sama("Käydyt maat", d.Tilastot[2].Otsikko);
            Oleta.Tosi(d.Tilastot.All(t => t.Otsikko != "Tieto tästä laudasta"), "ei tietoprosenttia ennen kysymyksiä");
            Oleta.Sama(0, d.Tavarat.Count);
            Oleta.Sama("Laukku on vielä tyhjä.", d.TavaratTyhja);
            Oleta.Sama("Ei vielä matkalöytöjä.", Laukku.Rakenna(UusiPeli(), Nimet, Julisteet, true).TavaratTyhja);
            Oleta.Sama(0, d.Julisteet.Count);
            Oleta.Tosi(d.JulisteitaKaikkiaan >= 4, "julisteita paketissa");
        }

        [Testi] static void LoydotJaJulisteetNakyvat()
        {
            var m = UusiPeli();
            var tahti = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.Paaaarre && m.Laatat.MannerOf(kv.Key) == "europe").Key;
            m.KaannaLaatta(tahti);
            var p = m.Tila.Pelaaja;
            // Kaksi samaa pientä aarretta samasta maasta ryhmittyy (web "×2").
            p.Loydot.Add(Laattatyypit.PieniAarre); p.LoytoMantereet.Add("europe"); p.LoytoMaat.Add("FIN");
            p.Loydot.Add(Laattatyypit.PieniAarre); p.LoytoMantereet.Add("europe"); p.LoytoMaat.Add("FIN");
            p.Loydot.Add("empty"); p.LoytoMantereet.Add("europe"); p.LoytoMaat.Add("FIN");
            var kaupat = new Kaupat(m);
            var avaimet = Julisteet.Julisteet.Keys.Take(4).ToList();
            foreach (var a in avaimet) kaupat.MyonnaJuliste(a);

            var d = Laukku.Rakenna(m, Nimet, Julisteet);
            var eurooppa = d.AarninLuettelo.Single(a => a.Manner == "europe");
            Oleta.Tosi(eurooppa.Loydetty, "Euroopan aarre löytyi");
            Oleta.Sama(6, d.Kateissa);
            Oleta.Sama("1 / 7", d.Tilastot[0].Arvo);
            Oleta.Sama(Laattatyypit.Paaaarre, d.Tavarat[0].Tyyppi, "pääaarre ensin");
            Oleta.Sama(eurooppa.Nimi, d.Tavarat[0].Nimi);
            var pieni = d.Tavarat.Single(t => t.Tyyppi == Laattatyypit.PieniAarre);
            Oleta.Sama(2, pieni.Maara);
            Oleta.Sama(Nimet.Hae(Laattatyypit.PieniAarre, "europe", "FIN").Nimi + " ×2", pieni.Teksti, "maan oma nimi");
            Oleta.Sama("tavara:pieniAarre:europe:FIN", pieni.Id);
            Oleta.Sama(2, d.Tavarat.Count, "pöllön tyhjä ei ole tavara");
            Oleta.Tosi(d.Raha > Vakiot.AloitusRaha, "pääaarteen palkkio kukkarossa");

            Oleta.Sama(string.Join(",", avaimet), string.Join(",", d.Julisteet.Select(j => j.Avain)), "voittojärjestys");
            Oleta.Sama(string.Join(",", avaimet.Skip(1).Reverse()), string.Join(",", d.ViimeisimmatJulisteet.Select(j => j.Avain)), "kolme uusinta, uusin ensin");
            Oleta.Tosi(d.Julisteet.All(j => j.Url.StartsWith(Laukku.JulisteJuuri, StringComparison.Ordinal)), "julisteiden osoitteet");

            // Voittojärjestys säilyy tallennuksen yli (web [...julisteet]).
            var l = Matka.Lataa(KultaisetApu.Verkko, m.Tallenna());
            Oleta.Sama(string.Join(",", avaimet), string.Join(",", l.Tila.Kaupat.Julisteet), "järjestys tallennuksen yli");
        }

        [Testi] static void ReitillaLahempiKaupunki()
        {
            var v = KultaisetApu.Verkko;
            var r = v.Reitit.Values.First(x => x.Askeleet >= 4);
            Oleta.Sama("matkalla — " + PeliApu.KaupunginNimi(v, r.A), Laukku.SijaintiNimi(v, Sijainti.ReitillaSijainti(r.Id, 1)));
            Oleta.Sama("matkalla — " + PeliApu.KaupunginNimi(v, r.B), Laukku.SijaintiNimi(v, Sijainti.ReitillaSijainti(r.Id, r.Askeleet - 1)));
        }

        [Testi] static void MatkanYhteenvetoKutenWeb()
        {
            var m = UusiPeli();
            var yv = MatkanYhteenveto.Laske(m, Laukku.Rakenna(m, Nimet));
            Oleta.Sama(1, yv.Paivat);
            Oleta.Sama(7, yv.AarteitaKaikkiaan);
            Oleta.Tosi(!yv.KaikkiLoytyi, "ei vielä");
            Oleta.Sama($"Matkakirja: 1 päivä, {yv.Kaupungit} kaupunki{(yv.Kaupungit == 1 ? "" : "a")}, yksikään unohdettu aarre ei vielä löytynyt.", yv.Teksti);
            foreach (var manner in Nimet.Mantereet)
            {
                var tahti = m.Laatat.Laatat.FirstOrDefault(kv => kv.Value == Laattatyypit.Paaaarre && m.Laatat.MannerOf(kv.Key) == manner).Key;
                if (tahti != null) m.KaannaLaatta(tahti);
            }
            yv = MatkanYhteenveto.Laske(m, Laukku.Rakenna(m, Nimet));
            Oleta.Tosi(yv.KaikkiLoytyi, "kaikki seitsemän");
            Oleta.Tosi(yv.Teksti.EndsWith(", 7 unohdettua aarretta löytyi.", StringComparison.Ordinal), yv.Teksti);
        }

        [Testi] static void JsonOnJasennettavissa()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(Laukku.Json(Laukku.Rakenna(UusiPeli(), Nimet, Julisteet))));
            Oleta.Sama("£" + Vakiot.AloitusRaha, MiniJson.Teksti(o, "kukkaro"));
            Oleta.Sama(7.0, MiniJson.Luku(o, "kateissa"));
            Oleta.Sama("null", Laukku.Json(null));
        }
    }
}
