// Rosvon kaksintaistelun (Peli/Kaksintaistelu.cs) testit: kultainen jälki
// Kultaiset/kaksintaistelujalki.json (Kultaiset/tee-kaksintaistelujalki.mjs):
// koko peli koelaudalla, jolla on 220 ryöstäjää, kysymysten käsikirjoitus
// KyselyKasikirjoitus ja kaksintaistelun oma käsikirjoitus (jäljen "kulku"),
// joka käy läpi oikein, väärin, aika loppui, helpotukset, rahan puutteen,
// virheteot ja vastaamatta sulkemisen. Toistetaan myös tallentaen ja
// ladaten eri väleillä (1 = jokaisen teon jälkeen, myös kesken kaksintaistelun).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class KaksintaisteluTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "kaksintaistelujalki.json"))));

        static List<Dictionary<string, object>> Ajot =>
            MiniJson.Taulukko(MiniJson.Kentta(Jalki, "jaljet")).Select(MiniJson.Objekti).ToList();

        static Kaksintaistelut data;
        internal static Kaksintaistelut Data => data ??= Kaksintaistelut.LueKansiosta(KultaisetApu.Paketti);

        static string Web(Vaihe v) => v == Vaihe.Kaksintaistelu ? "duel" : KyselyTestit.Web(v);

        static Laattamaarat Maarat => new Laattamaarat(MiniJson.Taulukko(Jalki["maarat"]).Select(x =>
        {
            var l = MiniJson.Taulukko(x);
            return new KeyValuePair<string, int>((string)l[0], (int)(double)l[1]);
        }));

        static List<List<string>> Kulku => MiniJson.Taulukko(Jalki["kulku"])
            .Select(k => MiniJson.Taulukko(k).Cast<string>().ToList()).ToList();

        /// <summary>C#-tila samoin kentin kuin skriptin tila().</summary>
        static Dictionary<string, object> Rivi(string teko, string virhe, Matka m)
        {
            var t = m.Tila;
            var p = t.Pelaaja;
            var q = t.Kysely.Kysymys;
            var d = t.Kaksintaistelu;
            return new Dictionary<string, object>
            {
                ["teko"] = teko,
                ["virhe"] = virhe,
                ["vaihe"] = Web(t.Vaihe),
                ["sijainti"] = p.Sijainti.Avain,
                ["raha"] = p.Raha,
                ["die"] = t.Noppa,
                ["turnCount"] = t.VuoroLaskuri,
                ["rngCalls"] = m.Satunnainen.Kutsuja,
                ["travelMode"] = t.Kulkutapa.HasValue ? MatkaTestit.Web(t.Kulkutapa.Value) : null,
                ["tavat"] = m.Kulkutavat().Select(MatkaTestit.Web).Cast<object>().ToList(),
                ["xp"] = p.Xp,
                ["quizAsked"] = p.Kysytty,
                ["quizCorrect"] = p.Oikein,
                ["kaytetyt"] = t.Kysely.Kaytetyt.Count,
                ["laatat"] = m.Laatat.Laatat.Count,
                ["loydot"] = p.Loydot.Count,
                ["quiz"] = q == null ? null : new Dictionary<string, object>
                {
                    ["question"] = q.Kysymys, ["correct"] = q.Oikea, ["chosen"] = q.Valittu, ["found"] = q.Loyto,
                },
                ["duelArmed"] = t.KaksintaisteluOdottaa,
                ["duel"] = d == null ? null : new Dictionary<string, object>
                {
                    ["question"] = d.Kysymys, ["fact"] = d.Fakta, ["source"] = d.Lahteet.Cast<object>().ToList(),
                    ["options"] = d.Vaihtoehdot.Cast<object>().ToList(), ["correct"] = d.Oikea,
                    ["hidden"] = d.Piilotetut.Cast<object>().ToList(), ["reliefs"] = d.Helpotukset, ["taken"] = d.Viety,
                    ["chosen"] = d.Valittu, ["right"] = d.OikeinVastattu, ["timedOut"] = d.AikaLoppui,
                    ["seconds"] = d.Sekunnit, ["prize"] = d.Saalis,
                },
            };
        }

        /// <summary>Kaksintaistelun käsikirjoitus (skriptin vaihe 'duel'): palauttaa teon nimen ja virheen.</summary>
        static (string Teko, string Virhe) KaksintaisteluTeko(Kaksintaistelu kt, string merkki)
        {
            var d = kt.Avoin;
            bool odotaVirhe = merkki.EndsWith("!");
            var mm = odotaVirhe ? merkki.Substring(0, merkki.Length - 1) : merkki;
            string teko;
            TekoTulos tulos;
            if (mm.StartsWith("raha:"))
            {
                kt.Matka.Tila.Pelaaja.Raha = int.Parse(mm.Substring(5));
                teko = mm; tulos = TekoTulos.Onnistui();
            }
            else if (mm == "oikein" || mm == "uudelleen") { teko = "duel:" + d.Oikea; tulos = kt.Vastaa(d.Oikea); }
            else if (mm == "vaarin")
            {
                int i = Enumerable.Range(0, d.Vaihtoehdot.Count).First(j => j != d.Oikea && !d.Piilotetut.Contains(j));
                teko = "duel:" + i; tulos = kt.Vastaa(i);
            }
            else if (mm == "piilotettu") { teko = "duel:" + d.Piilotetut[0]; tulos = kt.Vastaa(d.Piilotetut[0]); }
            else if (mm == "helpotus") { teko = "relief"; tulos = kt.Helpotus(); }
            else if (mm == "aika") { teko = "duelTimeout"; tulos = kt.AikaLoppui(); }
            else if (mm == "sulje") { teko = "closeDuel"; tulos = kt.Sulje(); }
            else throw new Exception("tuntematon merkki " + merkki);
            if (odotaVirhe == tulos.Ok) throw new Exception($"{merkki}: odotettiin {(odotaVirhe ? "virhettä" : "onnistumista")}");
            return (odotaVirhe ? teko + "!" : teko, tulos.Ok ? null : tulos.Virhe);
        }

        /// <summary>
        /// Toistaa yhden ajon ja vertaa joka askelen. tallennaVali > 0: joka
        /// tallennaVali:nnen teon jälkeen peli tallennetaan ja ladataan, ja
        /// Kysely sekä Kaksintaistelu luodaan uudelleen. data = kokoelma (vartijatesti).
        /// Palauttaa (askeleet, kaksintaistelut, Alkoi-tapahtumat).
        /// </summary>
        static (int Askeleet, int Kaksintaisteluja, int Alkoi) ToistaAjo(Dictionary<string, object> ajo, int tallennaVali, Kaksintaistelut kokoelma = null)
        {
            kokoelma ??= Data;
            var siemen = (long)(double)MiniJson.Kentta(ajo, "seed");
            var alku = MiniJson.Teksti(ajo, "start");
            var askeleet = MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Select(MiniJson.Objekti).ToList();
            int vuorot = (int)MiniJson.Luku(Jalki, "vuorot").Value;
            int maxTeot = (int)MiniJson.Luku(Jalki, "maxTeot").Value;
            var kulku = Kulku;
            var nimi = $"siemen {siemen} {alku} (väli {tallennaVali})";
            int alkoi = 0;

            Kaksintaistelu kt = null;
            Kysely Kytke(Matka mm)
            {
                var k = new Kysely(mm, KyselyTestit.Data);
                if (MiniJson.Totuus(ajo, "liput")) k.Liput = KyselyTestit.Liput;
                if (MiniJson.Totuus(ajo, "kuvat"))
                    k.AsetaKuvat(MiniJson.Taulukko(MiniJson.Kentta(Jalki, "kuvat")).Cast<string>());
                kt = new Kaksintaistelu(mm, kokoelma);
                kt.Alkoi += (_, __) => alkoi++;
                return k;
            }

            var rng = new Satunnainen(siemen);
            var m = Matka.Luo(KultaisetApu.Verkko, rng, "Fogg", alku, Maarat);
            Oleta.Sama((long)MiniJson.Luku(ajo, "rngAlussa").Value, rng.Kutsuja, nimi + ": jaon kulutus");
            Oleta.Sama(string.Join(";", MiniJson.Taulukko(ajo["laatat"]).Cast<List<object>>().Select(l => l[0] + "=" + l[1])),
                string.Join(";", m.Laatat.Laatat.Select(kv => kv.Key + "=" + kv.Value)), nimi + ": laattakartta");
            if (MiniJson.Teksti(ajo, "taso") == "easy") m.Tila.Pelaaja.Taso = Vaikeustaso.Helppo;
            var ky = Kytke(m);
            m.AloitaVuoro();

            int i = 0;
            void Vertaa(string teko, string virhe = null)
            {
                if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                var odotettu = askeleet[i];
                var saatu = Rivi(teko, virhe, m);
                var eroja = saatu.Keys.Union(odotettu.Keys)
                    .Where(key => KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key)) != KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null))
                    .Select(key => $"\n  {key}: web {KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key))}\n  {new string(' ', key.Length)}  C#  {KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null)}")
                    .ToList();
                if (eroja.Count > 0) throw new Exception($"{nimi} askel {i} ({MiniJson.Teksti(odotettu, "teko")}):{string.Concat(eroja)}");
                i++;
            }
            Vertaa("alku");
            if (MiniJson.Luku(ajo, "kaytetyt") is double kaytetyt)
            {
                foreach (var q in kokoelma.Kysymykset.Take((int)kaytetyt)) m.Tila.Kysely.Kaytetyt.Add(q.Q);
                Vertaa("kaytetyt:" + (int)kaytetyt);
            }
            if (MiniJson.Luku(ajo, "raha") is double raha)
            {
                m.Tila.Pelaaja.Raha = (int)raha;
                m.Tila.Vaihe = Vaihe.Toiminta;
                m.AloitaVuoro();
                Vertaa("raha:" + (int)raha);
            }
            var kk = new KyselyKasikirjoitus();
            int d = -1, kohta = 0;
            for (int n = 0; n < maxTeot && m.Tila.VuoroLaskuri <= vuorot; n++)
            {
                if (m.Tila.Vaihe == Vaihe.Kaksintaistelu)
                {
                    var lista = kulku[d % kulku.Count];
                    if (kohta >= lista.Count) throw new Exception(nimi + ": kaksintaistelun käsikirjoitus loppui");
                    var (teko, virhe) = KaksintaisteluTeko(kt, lista[kohta++]);
                    Vertaa(teko, virhe);
                }
                else
                {
                    var teko = kk.Seuraava(ky);
                    if (teko == "close" && m.Tila.Vaihe == Vaihe.Kaksintaistelu) { d++; kohta = 0; }
                    Vertaa(teko);
                }
                if (tallennaVali > 0 && (n + 1) % tallennaVali == 0)
                {
                    var json = m.Tallenna();
                    m = Matka.Lataa(KultaisetApu.Verkko, json);
                    Oleta.Sama(json, m.Tallenna(), nimi + ": tallennus pysyy samana latauksen yli");
                    ky = Kytke(m);
                }
            }
            Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");
            Oleta.Sama((int)MiniJson.Luku(ajo, "kaksintaisteluja").Value, d + 1, nimi + ": kaksintaisteluja");
            return (i, d + 1, alkoi);
        }

        [Testi] static void KokoelmaLuetaanPaketista()
        {
            Oleta.Sama(42, Data.Kysymykset.Count, "kokoelman koko (sisalto/1/v2)");
            Oleta.Tosi(Data.Kysymykset.All(q => q.Vaihtoehdot.Count == 8 && q.Oikea >= 0 && q.Oikea < 8), "8 vaihtoehtoa ja oikea");
            Oleta.Tosi(Data.Kysymykset.Any(q => q.Lahteet.Count > 0), "lähteet mukana");
            Oleta.Tosi(Data.Kysymykset.All(q => q.Fakta != null), "fakta");
        }

        [Testi] static void KultainenKaksintaistelujalki()
        {
            int askelia = 0, kaksintaisteluja = 0;
            foreach (var ajo in Ajot)
            {
                var (a, k, alkoi) = ToistaAjo(ajo, 0);
                askelia += a; kaksintaisteluja += k;
                Oleta.Sama(k, alkoi, "Alkoi-tapahtuma kerran per kaksintaistelu");
            }
            Oleta.Tosi(Ajot.Count >= 5, "ajoja");
            Oleta.Tosi(askelia > 3000, "askelia " + askelia);
            Oleta.Tosi(kaksintaisteluja >= 30, "kaksintaisteluja " + kaksintaisteluja);
        }

        [Testi] static void KultainenKaksintaistelujalkiTallennuksenYli()
        {
            // Väli 1 tallentaa jokaisen teon jälkeen: jokainen kaksintaistelun tila kulkee tallennuksen läpi.
            foreach (var ajo in Ajot) ToistaAjo(ajo, 1);
            foreach (var ajo in Ajot) ToistaAjo(ajo, 7);
        }

        [Testi] static void KultainenKaksintaistelujalkiKaatuuVirheeseen()
        {
            // Vartija: käänteinen kokoelma arpoo eri kysymykset, joten jäljen pitää kaatua.
            var kaanteinen = new Kaksintaistelut();
            kaanteinen.Kysymykset.AddRange(Enumerable.Reverse(Data.Kysymykset));
            bool kaatui = false;
            try { ToistaAjo(Ajot[0], 0, kaanteinen); }
            catch (Exception) { kaatui = true; }
            Oleta.Tosi(kaatui, "väärä kokoelma ei saa tuottaa samaa jälkeä");
        }

        // --- yksikkötestit --------------------------------------------------------

        /// <summary>Peli, jossa pelaaja seisoo ryöstäjäkaupungissa kysymys auki ja oikein vastattuna.</summary>
        static (Matka M, Kysely Ky, Kaksintaistelu Kt) RyostajanJalkeen(long siemen = 4)
        {
            var maarat = new Laattamaarat().Lisaa("star", 7).Lisaa("mannerAarre", 7).Lisaa("robber", 252);
            var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", "pariisi", maarat);
            var ky = new Kysely(m, KyselyTestit.Data);
            var kt = new Kaksintaistelu(m, Data);
            m.AloitaVuoro();
            var rosvo = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.Ryostaja).Key;
            m.Tila.Pelaaja.Sijainti = Sijainti.KaupungissaSijainti(rosvo);
            m.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(ky.Tutki(muoto: KysymysMuoto.Visa).Ok, "kysymys");
            ky.Vastaa(m.Tila.Kysely.Kysymys.Oikea);
            Oleta.Tosi(m.Tila.KaksintaisteluOdottaa, "lippu");
            return (m, ky, kt);
        }

        [Testi] static void KysymyksenSulkeminenAloittaaKaksintaistelun()
        {
            var (m, ky, kt) = RyostajanJalkeen();
            AvoinKaksintaistelu alkanut = null;
            kt.Alkoi += (_, d) => alkanut = d;
            int vuoro = m.Tila.VuoroLaskuri;
            long ennen = m.Satunnainen.Kutsuja;
            Oleta.Tosi(ky.Sulje().Ok, "sulje");
            Oleta.Sama(Vaihe.Kaksintaistelu, m.Tila.Vaihe);
            Oleta.Tosi(kt.Kaynnissa && alkanut == kt.Avoin, "Alkoi ja Avoin");
            Oleta.Sama(vuoro, m.Tila.VuoroLaskuri, "vuoro ei pääty");
            Oleta.Sama(ennen + 1 + 7, m.Satunnainen.Kutsuja, "yksi arvonta + sekoitus 7");
            Oleta.Sama(8, kt.Avoin.Vaihtoehdot.Count);
            Oleta.Sama(KaksintaisteluVakiot.Sekunnit, kt.Avoin.Sekunnit.Value);
            Oleta.Tosi(m.Kulkutavat().Count == 0 && !ky.Tutki().Ok && !ky.Vastaa(0).Ok, "muut teot kiinni");
            Oleta.Tosi(m.Tila.Kysely.Kaytetyt.Contains(kt.Avoin.Kysymys), "käytetty");
        }

        [Testi] static void SuoraVoittoTuoSaaliinJaSuljeVaihtaaVuoron()
        {
            var (m, ky, kt) = RyostajanJalkeen();
            ky.Sulje();
            int raha = m.Tila.Pelaaja.Raha, kysytty = m.Tila.Pelaaja.Kysytty;
            Oleta.Tosi(kt.Vastaa(kt.Avoin.Oikea).Ok);
            Oleta.Sama(raha + KaksintaisteluVakiot.Saalis, m.Tila.Pelaaja.Raha);
            Oleta.Sama(KaksintaisteluVakiot.Saalis, kt.Avoin.Saalis.Value);
            Oleta.Sama(kysytty + 1, m.Tila.Pelaaja.Kysytty, "tietoprosenttiin");
            Oleta.Sama("Ei avointa kaksintaistelua", kt.Vastaa(kt.Avoin.Oikea).Virhe);
            Oleta.Sama("Kysymykseen on jo vastattu", kt.Helpotus().Virhe);
            int vuoro = m.Tila.VuoroLaskuri;
            Oleta.Tosi(kt.Sulje().Ok);
            Oleta.Tosi(kt.Avoin == null && m.Tila.Vaihe != Vaihe.Kaksintaistelu, "suljettu");
            Oleta.Sama(vuoro + 1, m.Tila.VuoroLaskuri, "vuoro päättyi");
            Oleta.Sama("Ei kaksintaistelua", kt.Sulje().Virhe);
        }

        [Testi] static void HelpotuksetJaTappio()
        {
            var (m, ky, kt) = RyostajanJalkeen();
            ky.Sulje();
            var p = m.Tila.Pelaaja;
            p.Raha = 301;
            Oleta.Tosi(kt.HelpotusTarjolla && kt.HelpotuksenHinta == 150, "hinta floor(301/2)");
            Oleta.Tosi(kt.Helpotus().Ok);
            Oleta.Sama(151, p.Raha);
            Oleta.Sama(4, kt.Avoin.Piilotetut.Count, "ensimmäinen poistaa 4");
            Oleta.Tosi(!kt.Avoin.Piilotetut.Contains(kt.Avoin.Oikea), "oikea ei piiloon");
            Oleta.Sama("Tuo vaihtoehto on poistettu", kt.Vastaa(kt.Avoin.Piilotetut[0]).Virhe);
            Oleta.Tosi(kt.Helpotus().Ok);
            Oleta.Sama(6, kt.Avoin.Piilotetut.Count, "toinen poistaa 2");
            Oleta.Tosi(kt.Avoin.Piilotetut.SequenceEqual(kt.Avoin.Piilotetut.OrderBy(x => x)), "nousevasti");
            Oleta.Sama(150 + 75, kt.Avoin.Viety);
            Oleta.Tosi(!kt.HelpotusTarjolla, "helpotukset käytetty");
            Oleta.Sama("Helpotukset on käytetty", kt.Helpotus().Virhe);
            int vaara = Enumerable.Range(0, 8).Single(i => i != kt.Avoin.Oikea && !kt.Avoin.Piilotetut.Contains(i));
            Oleta.Tosi(kt.Vastaa(vaara).Ok);
            Oleta.Sama(0, p.Raha, "rosvo vei kaiken");
            Oleta.Sama(301, kt.Avoin.Viety);
            Oleta.Tosi(kt.Avoin.OikeinVastattu == false && kt.Avoin.Saalis == null, "tappio");
        }

        [Testi] static void AikaLoppuiJaRahatonHelpotus()
        {
            var (m, ky, kt) = RyostajanJalkeen();
            ky.Sulje();
            m.Tila.Pelaaja.Raha = 1;
            Oleta.Tosi(!kt.HelpotusTarjolla, "käyttöliittymä harmaannuttaa (hinta 0)");
            long ennen = m.Satunnainen.Kutsuja;
            Oleta.Tosi(kt.Helpotus().Ok, "web sallii logiikassa");
            Oleta.Sama(1, m.Tila.Pelaaja.Raha);
            Oleta.Sama(ennen + 6, m.Satunnainen.Kutsuja, "7 väärää → 6 arvontaa");
            Oleta.Tosi(kt.AikaLoppui().Ok);
            Oleta.Tosi(kt.Avoin.AikaLoppui && kt.Avoin.Valittu == -1 && kt.Avoin.Sekunnit == 0, "aika");
            Oleta.Sama(0, m.Tila.Pelaaja.Raha);
            Oleta.Sama("Ei avointa kaksintaistelua", kt.AikaLoppui().Virhe);
        }

        [Testi] static void AvoinKaksintaisteluKulkeeTallennuksessa()
        {
            var (m, ky, kt) = RyostajanJalkeen();
            var ilman = m.Tallenna();
            Oleta.Tosi(!ilman.Contains("avoinKaksintaistelu") && ilman.Contains("\"versio\":3"), "valinnainen kenttä, versio 3");
            ky.Sulje();
            kt.Helpotus();
            kt.Avoin.Sekunnit = 17;   // käyttöliittymän tiimalasi
            var json = m.Tallenna();
            Oleta.Tosi(json.Contains("\"vaihe\":\"Kaksintaistelu\"") && json.Contains("\"avoinKaksintaistelu\":{"), "tallennettu");
            var l = Matka.Lataa(KultaisetApu.Verkko, json);
            Oleta.Sama(json, l.Tallenna());
            var kt2 = new Kaksintaistelu(l, Data);
            Oleta.Tosi(kt2.Kaynnissa, "jatkuu");
            Oleta.Sama(17, kt2.Avoin.Sekunnit.Value);
            Oleta.Sama(string.Join(",", kt.Avoin.Piilotetut), string.Join(",", kt2.Avoin.Piilotetut));
            Oleta.Tosi(kt2.Vastaa(kt2.Avoin.Oikea).Ok && kt2.Avoin.Saalis == null, "helpotuksen jälkeen ei saalista");
            // Vanha versio 3 -tallennus ilman kenttää latautuu ilman kaksintaistelua.
            Oleta.Tosi(Matka.Lataa(KultaisetApu.Verkko, ilman).Tila.Kaksintaistelu == null, "vanha tallennus");
        }

        [Testi] static void TyhjaKokoelmaPaattaaVuoron()
        {
            var (m, ky, _) = RyostajanJalkeen();
            new Kaksintaistelu(m, new Kaksintaistelut());
            int vuoro = m.Tila.VuoroLaskuri;
            long ennen = m.Satunnainen.Kutsuja;
            Oleta.Tosi(ky.Sulje().Ok);
            Oleta.Tosi(m.Tila.Kaksintaistelu == null && !m.Tila.KaksintaisteluOdottaa, "ei kaksintaistelua");
            Oleta.Sama(vuoro + 1, m.Tila.VuoroLaskuri, "vuoro päättyi");
            Oleta.Sama(ennen, m.Satunnainen.Kutsuja, "ei kaksintaistelun arvontaa");
        }
    }
}
