// Koko pelin testit (erä 3): Matka + Kysely + Kokemus + Laattamaailma yhtenä
// kokonaisuutena kuten verkkopelin Game. Kultainen jälki Kultaiset/pelijalki.json
// (Kultaiset/tee-pelijalki.mjs): laatat jaetaan konstruktorissa, kysymykset
// kääntävät laattoja (rahat, tähdet, tietäjäpisteet, ennätys, löytöpaikat),
// ja kohtaamiset lukitsevat kätköjä.
// Käsikirjoitus on KyselyKasikirjoitus (sama kuin skriptissä).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class PeliTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "pelijalki.json"))));

        static List<Dictionary<string, object>> Ajot =>
            MiniJson.Taulukko(MiniJson.Kentta(Jalki, "jaljet")).Select(MiniJson.Objekti).ToList();

        /// <summary>FNV-1a 32 bittiä UTF-16-yksiköistä (skriptin tiiviste()).</summary>
        static string Tiiviste(string s)
        {
            uint h = 0x811c9dc5;
            foreach (char c in s) { h ^= c; h = unchecked(h * 0x01000193); }
            return h.ToString("x8");
        }

        static string Kartta(IEnumerable<KeyValuePair<string, string>> k) => string.Join(";", k.Select(p => p.Key + "=" + p.Value));
        static string N(string s) => s ?? "null";

        /// <summary>C#-tila samoin kentin kuin skriptin tila().</summary>
        static Dictionary<string, object> Rivi(string teko, Kysely ky)
        {
            var m = ky.Matka;
            var t = m.Tila;
            var p = t.Pelaaja;
            var q = t.Kysely.Kysymys;
            int n = p.Loydot.Count;
            return new Dictionary<string, object>
            {
                ["teko"] = teko,
                ["vaihe"] = KyselyTestit.Web(t.Vaihe),
                ["sijainti"] = p.Sijainti.Avain,
                ["raha"] = p.Raha,
                ["die"] = t.Noppa,
                ["turnCount"] = t.VuoroLaskuri,
                ["rngCalls"] = m.Satunnainen.Kutsuja,
                ["travelMode"] = t.Kulkutapa.HasValue ? MatkaTestit.Web(t.Kulkutapa.Value) : null,
                ["autoTravel"] = t.AutoMatka,
                ["kaydyt"] = p.Kaydyt.Count,
                ["tavat"] = m.Kulkutavat().Select(MatkaTestit.Web).Cast<object>().ToList(),
                ["xp"] = p.Xp,
                ["taso"] = Kokemus.TasoPisteille(p.Xp).Taso,
                ["nousut"] = ky.Kokemus.OtaNousut().Select(x => (object)x.Taso).ToList(),
                ["quizAsked"] = p.Kysytty,
                ["quizCorrect"] = p.Oikein,
                ["kaytetyt"] = t.Kysely.Kaytetyt.Count,
                ["lastForm"] = t.Kysely.ViimeMuoto.HasValue ? KyselyTestit.Web(t.Kysely.ViimeMuoto.Value) : null,
                ["lukot"] = t.Kysely.AarreLukot.OrderBy(x => x, StringComparer.Ordinal).Cast<object>().ToList(),
                ["quiz"] = q == null ? null : new Dictionary<string, object>
                {
                    ["kind"] = KyselyTestit.Web(q.Laji), ["cityId"] = q.Kaupunki, ["hard"] = q.Vaikea, ["kaari"] = q.Kaari,
                    ["explore"] = q.Tutkimus, ["question"] = q.Kysymys, ["options"] = q.Vaihtoehdot.Cast<object>().ToList(),
                    ["correct"] = q.Oikea, ["hidden"] = q.Piilotetut.Cast<object>().ToList(), ["chosen"] = q.Valittu,
                    ["right"] = q.OikeinVastattu, ["aarreLukittui"] = q.AarreLukittui, ["found"] = q.Loyto,
                },
                ["laatat"] = m.Laatat.Laatat.Count,
                ["laattaTiiviste"] = Tiiviste(Kartta(m.Laatat.Laatat)),
                ["kaannetyt"] = m.Laatat.Kaannetyt.Count,
                ["tahdet"] = p.Paaaarteet,
                ["starsFound"] = m.Laatat.PaaaarteetLoydetty.Select(kv => (object)(kv.Key + "=" + kv.Value)).ToList(),
                ["loydot"] = n,
                ["viimeLoyto"] = n == 0 ? null : $"{p.Loydot[n - 1]}@{N(p.LoytoMantereet[n - 1])}/{N(p.LoytoMaat[n - 1])}",
                ["arvo"] = m.ViimeLoyto?.Arvo,
                ["polloLoydetty"] = t.PolloLoydetty,
                ["recordNoted"] = t.EnnatysKirjattu,
                ["recordDay"] = t.EnnatysPaiva,
            };
        }

        static Laattamaarat Maarat(Dictionary<string, object> ajo) =>
            MiniJson.Totuus(ajo, "koe")
                ? new Laattamaarat(MiniJson.Taulukko(ajo["maarat"]).Select(x =>
                {
                    var l = MiniJson.Taulukko(x);
                    return new KeyValuePair<string, int>((string)l[0], (int)(double)l[1]);
                }))
                : KultaisetApu.Laattamaarat;

        /// <summary>
        /// Toistaa yhden ajon ja vertaa joka askelen. tallennaVali > 0: joka
        /// tallennaVali:nnen teon jälkeen peli tallennetaan ja ladataan.
        /// vikaan muuttaa uutta peliä ennen ensimmäistä vuoroa (vartijatesti).
        /// </summary>
        static int ToistaAjo(Dictionary<string, object> ajo, int tallennaVali, Action<Matka> vikaan = null)
        {
            var siemen = (long)(double)MiniJson.Kentta(ajo, "seed");
            var alku = MiniJson.Teksti(ajo, "start");
            var askeleet = MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Select(MiniJson.Objekti).ToList();
            int vuorot = (int)MiniJson.Luku(Jalki, "vuorot").Value;
            int maxTeot = (int)MiniJson.Luku(Jalki, "maxTeot").Value;
            var nimi = $"siemen {siemen} {alku}";

            Kysely Kytke(Matka mm)
            {
                var k = new Kysely(mm, KyselyTestit.Data);
                if (MiniJson.Totuus(ajo, "liput")) k.Liput = KyselyTestit.Liput;
                if (MiniJson.Totuus(ajo, "kuvat"))
                    k.AsetaKuvat(MiniJson.Taulukko(MiniJson.Kentta(Jalki, "kuvat")).Cast<string>());
                return k;
            }

            var rng = new Satunnainen(siemen);
            var m = Matka.Luo(KultaisetApu.Verkko, rng, "Fogg", alku, Maarat(ajo), MiniJson.Totuus(ajo, "pollo"));
            Oleta.Sama((long)MiniJson.Luku(ajo, "rngAlussa").Value, rng.Kutsuja, nimi + ": jaon kulutus");
            Oleta.Sama(string.Join(";", MiniJson.Taulukko(ajo["laatat"]).Cast<List<object>>().Select(l => l[0] + "=" + l[1])),
                Kartta(m.Laatat.Laatat), nimi + ": laattakartta");
            if (MiniJson.Teksti(ajo, "taso") == "easy") m.Tila.Pelaaja.Taso = Vaikeustaso.Helppo;
            var ky = Kytke(m);
            vikaan?.Invoke(m);
            m.AloitaVuoro();

            int i = 0;
            void Vertaa(string teko)
            {
                if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                var odotettu = askeleet[i];
                var saatu = Rivi(teko, ky);
                var eroja = saatu.Keys.Union(odotettu.Keys)
                    .Where(key => KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key)) != KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null))
                    .Select(key => $"\n  {key}: web {KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key))}\n  {new string(' ', key.Length)}  C#  {KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null)}")
                    .ToList();
                if (eroja.Count > 0) throw new Exception($"{nimi} askel {i} ({MiniJson.Teksti(odotettu, "teko")}):{string.Concat(eroja)}");
                i++;
            }
            Vertaa("alku");
            if (MiniJson.Luku(ajo, "raha") is double raha)
            {
                m.Tila.Pelaaja.Raha = (int)raha;
                m.Tila.Vaihe = Vaihe.Toiminta;
                m.AloitaVuoro();
                Vertaa("raha:" + (int)raha);
            }
            var kk = new KyselyKasikirjoitus();
            for (int n = 0; n < maxTeot && m.Tila.VuoroLaskuri <= vuorot && m.Tila.Vaihe != Vaihe.Ohi; n++)
            {
                m.ViimeLoyto = null;   // web viimeAarre nollataan ennen tekoa (istunnon viesti)
                Vertaa(kk.Seuraava(ky));
                if (tallennaVali > 0 && (n + 1) % tallennaVali == 0)
                {
                    var json = m.Tallenna();
                    m = Matka.Lataa(KultaisetApu.Verkko, json);
                    Oleta.Sama(json, m.Tallenna(), nimi + ": tallennus pysyy samana latauksen yli");
                    ky = Kytke(m);
                }
            }
            Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");

            // Lopputila kokonaan: Map-järjestykset ja löytölistat.
            var loppu = MiniJson.Objekti(ajo["lopuksi"]);
            string Parit(object o) => string.Join(";", MiniJson.Taulukko(o).Cast<List<object>>().Select(l => l[0] + "=" + l[1]));
            string Lista(object o) => string.Join(";", MiniJson.Taulukko(o).Select(x => (string)x ?? "null"));
            var p = m.Tila.Pelaaja;
            Oleta.Sama(Parit(loppu["laatat"]), Kartta(m.Laatat.Laatat), nimi + ": laatat lopuksi");
            Oleta.Sama(Parit(loppu["revealed"]), Kartta(m.Laatat.Kaannetyt), nimi + ": revealed");
            Oleta.Sama(Parit(loppu["starsFound"]), Kartta(m.Laatat.PaaaarteetLoydetty), nimi + ": starsFound");
            Oleta.Sama(Lista(loppu["finds"]), string.Join(";", p.Loydot), nimi + ": finds");
            Oleta.Sama(Lista(loppu["findManner"]), string.Join(";", p.LoytoMantereet.Select(N)), nimi + ": findManner");
            Oleta.Sama(Lista(loppu["findMaa"]), string.Join(";", p.LoytoMaat.Select(N)), nimi + ": findMaa");
            return i;
        }

        [Testi] static void KultainenPelijalki()
        {
            int yht = 0;
            Oleta.Tosi(Ajot.Count >= 8, "ajoja");
            foreach (var ajo in Ajot) yht += ToistaAjo(ajo, 0);
            Oleta.Tosi(yht > 2000, "askelia " + yht);
            var loydot = Ajot.SelectMany(a => MiniJson.Taulukko(MiniJson.Objekti(a["lopuksi"])["finds"]).Cast<string>()).ToList();
            foreach (var laji in new[] { "star", "mannerAarre", "isoAarre", "pieniAarre", "empty" })
                Oleta.Tosi(loydot.Contains(laji), "jäljestä puuttuu löytö " + laji);
        }

        [Testi] static void KultainenPelijalkiTallennuksenYli()
        {
            // Väli 7 ja 3 osuvat avoimiin kysymyksiin, löytöjen jälkeen ja reitin varrelle.
            foreach (var ajo in Ajot) ToistaAjo(ajo, 7);
            foreach (var ajo in Ajot) ToistaAjo(ajo, 3);
        }

        [Testi] static void KultainenPelijalkiKaatuuVirheeseen()
        {
            // Vartija: pöllö pois päältä pöllöajossa ja ennätys valmiiksi kirjattuna
            // tähtiajoissa muuttavat löytöjä ja pisteitä, joten jäljen pitää kaatua.
            int kaatui = 0, yritti = 0;
            foreach (var ajo in Ajot)
            {
                Action<Matka> vika = null;
                if (MiniJson.Totuus(ajo, "pollo")) vika = m => m.Tila.PolloAarteena = false;
                else if (MiniJson.Taulukko(MiniJson.Objekti(ajo["lopuksi"])["finds"]).Contains("star")) vika = m => m.Tila.EnnatysKirjattu = true;
                if (vika == null) continue;
                yritti++;
                try { ToistaAjo(ajo, 0, vika); }
                catch (Exception) { kaatui++; }
            }
            Oleta.Tosi(yritti >= 2, "vartija-ajoja " + yritti);
            Oleta.Sama(yritti, kaatui, "jokaisen virheellisen ajon pitää kaatua");
        }

        // --- yksikkötestit --------------------------------------------------------

        static Matka UusiPeli(long siemen = 3, string alku = "pariisi") =>
            Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", alku, KultaisetApu.Laattamaarat);

        [Testi] static void LuontiJakaaLaatat()
        {
            var m = UusiPeli();
            Oleta.Sama(KultaisetApu.Verkko.KaupunkiLista.Count, m.Laatat.Laatat.Count, "laatta joka kaupungissa");
            Oleta.Sama(279L, m.Satunnainen.Kutsuja, "jaon kulutus maailmankartalla");
            Oleta.Tosi(m.LaattaTassa("pariisi") && m.LaattaKaupungissa() == "pariisi", "aloituskaupungissakin laatta");
            // Pankin apu (needsAid) poistui talouden vaiheessa 1: rahaton pelaaja ei saa rahaa vuoron alussa.
            m.Tila.Pelaaja.Raha = 0;
            m.Tila.Vaihe = Vaihe.Toiminta;
            m.AloitaVuoro();
            Oleta.Sama(0, m.Tila.Pelaaja.Raha, "ei pankkiapua");
        }

        [Testi] static void LoytoKirjataanPelaajalle()
        {
            var m = UusiPeli();
            var p = m.Tila.Pelaaja;
            var tahti = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.Paaaarre).Key;
            var pieni = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.PieniAarre).Key;
            var loydetyt = new List<string>();
            m.Loysi += (_, l) => loydetyt.Add(l.Tyyppi);

            var l1 = m.KaannaLaatta(pieni);
            Oleta.Sama(Vakiot.AloitusRaha + l1.Arvo, p.Raha, "pieni aarre rahaksi");
            Oleta.Tosi(l1.Arvo >= 100 && l1.Arvo <= 250, "arvo väliltä");
            Oleta.Sama(0, p.Xp, "paikallisaarre ei anna pisteitä");

            var l2 = m.KaannaLaatta(tahti);
            Oleta.Sama(1, p.Paaaarteet);
            Oleta.Sama(Vakiot.AloitusRaha + l1.Arvo + LaattaVakiot.PaaaarrePalkkio, p.Raha, "vaelluksessa pääaarre maksaa");
            Oleta.Sama(Kokemus.Paaaarre + Kokemus.Ennatys, p.Xp, "pääaarre + ennätys päivänä 1");
            Oleta.Sama(1, m.Tila.EnnatysPaiva);
            Oleta.Sama(m.Laatat.MannerOf(tahti), m.Laatat.PaaaarteetLoydetty.Keys.Single());
            Oleta.Sama("pieniAarre,star", string.Join(",", p.Loydot));
            Oleta.Sama("pieniAarre,star", string.Join(",", loydetyt));
            Oleta.Sama(KultaisetApu.Verkko.Kaupungit[tahti].Manner, p.LoytoMantereet[1]);
            Oleta.Sama(null, m.KaannaLaatta(tahti), "käännetty laatta ei käänny uudelleen");
            Oleta.Tosi(!m.LaattaTassa(tahti), "laatta poissa");
        }

        [Testi] static void EnnatysVainKerranJaVainAjoissa()
        {
            var m = UusiPeli();
            m.Tila.VuoroLaskuri = 4 * LaattaVakiot.EnnatysPaivat + 1;   // päivä 81
            Oleta.Sama(81, m.Tila.Paiva());
            var tahdet = m.Laatat.Laatat.Where(kv => kv.Value == Laattatyypit.Paaaarre).Select(kv => kv.Key).ToList();
            m.KaannaLaatta(tahdet[0]);
            Oleta.Sama(Kokemus.Paaaarre, m.Tila.Pelaaja.Xp, "myöhästynyt ennätys ei anna bonusta");
            Oleta.Tosi(m.Tila.EnnatysKirjattu && m.Tila.EnnatysPaiva == null, "kirjattu ilman merkintää");
            m.Tila.VuoroLaskuri = 1;
            m.KaannaLaatta(tahdet[1]);
            Oleta.Sama(2 * Kokemus.Paaaarre, m.Tila.Pelaaja.Xp, "noteRecord kerran pelissä");
        }

        [Testi] static void PolloKorvaaEnsimmaisenLaatan()
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(3L), "Fogg", "pariisi", KultaisetApu.Laattamaarat, polloAarteena: true);
            Oleta.Tosi(!m.Tila.PolloLoydetty, "pöllö piilossa");
            var pieni = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.PieniAarre).Key;
            var l = m.KaannaLaatta(pieni);
            Oleta.Sama("pollo", l.WebTulos);
            Oleta.Sama(Vakiot.AloitusRaha, m.Tila.Pelaaja.Raha, "pöllö ei tuo rahaa");
            Oleta.Tosi(m.Tila.PolloLoydetty && m.OtaPolloPaljastus() && !m.OtaPolloPaljastus(), "paljastus kerran");
            Oleta.Sama("empty", m.Laatat.Kaannetyt.Hae(pieni));
            var toinen = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.PieniAarre).Key;
            Oleta.Sama("pieniAarre", m.KaannaLaatta(toinen).WebTulos, "toinen laatta tavallinen");
            // Oletuksena (web POLLO_ON_AARRE = false) pöllö on löytynyt alusta.
            Oleta.Tosi(UusiPeli().Tila.PolloLoydetty, "oletus");
        }

        [Testi] static void LaattamaailmaKulkeeTallennuksessaJarjestyksineen()
        {
            var m = UusiPeli(9);
            var tahti = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.Paaaarre).Key;
            m.KaannaLaatta(tahti);
            m.LukitseLaatta(m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.MannerAarre).Key);
            var json = m.Tallenna();
            Oleta.Tosi(json.Contains("\"versio\":6") && json.Contains("\"laattamaailma\":{"), "versio 6");
            var l = Matka.Lataa(KultaisetApu.Verkko, json);
            Oleta.Sama(json, l.Tallenna());
            Oleta.Sama(Kartta(m.Laatat.Laatat), Kartta(l.Laatat.Laatat), "Map-järjestys");
            Oleta.Sama(Kartta(m.Laatat.Kaannetyt), Kartta(l.Laatat.Kaannetyt));
            Oleta.Sama(Kartta(m.Laatat.PaaaarteetLoydetty), Kartta(l.Laatat.PaaaarteetLoydetty));
            Oleta.Sama(m.Laatat.MannerOf(tahti), l.Laatat.MannerOf(tahti), "mantereet verkosta");
            Oleta.Sama(string.Join(",", m.Tila.Pelaaja.Loydot), string.Join(",", l.Tila.Pelaaja.Loydot));
            Oleta.Sama(1, l.Tila.Pelaaja.Paaaarteet);
            Oleta.Tosi(l.Tila.EnnatysKirjattu && l.Tila.EnnatysPaiva == 1, "ennätys");
        }

        [Testi] static void VanhaTallennusSaaLaatatLatauksessa()
        {
            // Versio 2 (erä 2, ei laattoja): laatat jaetaan pelin omalla satunnaisuudella
            // tallennuksen kohdasta; lukittu kaupunki menettää laattansa.
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(21L), "Fogg", "pariisi");
            var ky = new Kysely(m, KyselyTestit.Data);
            m.ValitseKulkutapa(Kulkutapa.Maa);
            m.Heita();
            m.Tila.Kysely.AarreLukot.Add("lontoo");
            var v2 = m.Tallenna().Replace("\"versio\":6", "\"versio\":2");
            Oleta.Tosi(v2.Contains("\"laattamaailma\":null"), "peli ilman laattoja");
            long ennen = m.Satunnainen.Kutsuja;

            var ilman = Matka.Lataa(KultaisetApu.Verkko, v2);
            Oleta.Tosi(ilman.Laatat == null, "ilman määriä laatat jäävät pois");

            var a = Matka.Lataa(KultaisetApu.Verkko, v2, KultaisetApu.Laattamaarat);
            var b = Matka.Lataa(KultaisetApu.Verkko, v2, KultaisetApu.Laattamaarat);
            Oleta.Sama(Kartta(a.Laatat.Laatat), Kartta(b.Laatat.Laatat), "sama tallennus → sama jako");
            Oleta.Sama(KultaisetApu.Verkko.KaupunkiLista.Count - 1, a.Laatat.Laatat.Count, "lukittu pois");
            Oleta.Tosi(!a.LaattaTassa("lontoo"), "lontoo lukossa");
            Oleta.Tosi(a.Satunnainen.Kutsuja >= ennen + 279, "jako kulutti pelin satunnaisuutta");
            Oleta.Sama(Vaihe.Siirto, a.Tila.Vaihe, "vaihe säilyi");
            var v3 = a.Tallenna();
            Oleta.Tosi(v3.Contains("\"versio\":6"), "seuraava tallennus on nykyversio 6");
            Oleta.Sama(v3, Matka.Lataa(KultaisetApu.Verkko, v3, KultaisetApu.Laattamaarat).Tallenna(), "laatallinen tallennus ei jaa uudelleen");
        }

        [Testi] static void KokemusNostaaYhdenTasonKerrallaanKuinWeb()
        {
            var m = UusiPeli();
            var p = m.Tila.Pelaaja;
            m.Kokemus.Anna(p, 500);   // ylittää rajat 150 ja 400
            Oleta.Sama("2", string.Join(",", m.Kokemus.OtaNousut().Select(t => t.Taso)), "web tarkistaTietajataso palaa ensimmäisestä");
            Oleta.Sama(3, Kokemus.TasoPisteille(p.Xp).Taso, "taso silti oikein");
        }
    }
}
