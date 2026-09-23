// Pulmien ja tapahtumakorttien testit (Peli/Pulmat.cs, Peli/Tapahtumat.cs).
// Kultainen jälki Kultaiset/pulmajalki.json (Kultaiset/tee-pulmajalki.mjs):
//   arvonnat  — jokainen generaattori siemenillä 1…25, tulos ja kulutus
//   pulmaAjot — peli alkaa pulmakaupungista, pulma avataan ja siihen
//               vastataan kuudella tavalla (oikein, väärin, vihje, 50:50,
//               sulkeminen vastaamatta, aika loppui), laatallinen ja laataton
//   peliAjot  — koko peli pulmineen kysymysjäljen käsikirjoituksella, osassa
//               Afrikan tapahtumakortit (raha, kyyti, viive)
// Kaikki toistetaan myös tallentaen ja ladaten kesken pelin.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class PulmaTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "pulmajalki.json"))));

        static Pulmadata pulmadata;
        static Pulmadata Pulmadata => pulmadata ??= Pulmadata.LueKansiosta(KultaisetApu.Paketti);

        static Tapahtumadata tapahtumadata;
        static Tapahtumadata Tapahtumadata => tapahtumadata ??= Tapahtumadata.LueKansiosta(KultaisetApu.Paketti);

        static List<Dictionary<string, object>> Lista(string nimi) =>
            MiniJson.Taulukko(MiniJson.Kentta(Jalki, nimi)).Select(MiniJson.Objekti).ToList();

        static string Web(Vaihe v) => v == Vaihe.Tapahtuma ? "event" : KyselyTestit.Web(v);
        static List<object> Jarj(IEnumerable<string> l) => l.OrderBy(x => x, StringComparer.Ordinal).Cast<object>().ToList();

        // --- tilarivi kuten skriptin tila() ------------------------------------

        static Dictionary<string, object> KysymysRivi(AvoinKysymys q)
        {
            if (q == null) return null;
            if (q.Laji != KysymysMuoto.Pulma)
                return new Dictionary<string, object>
                {
                    ["kind"] = KyselyTestit.Web(q.Laji), ["cityId"] = q.Kaupunki, ["hard"] = q.Vaikea, ["kaari"] = q.Kaari,
                    ["explore"] = q.Tutkimus, ["question"] = q.Kysymys, ["options"] = q.Vaihtoehdot.Cast<object>().ToList(),
                    ["correct"] = q.Oikea, ["hidden"] = q.Piilotetut.Cast<object>().ToList(), ["chosen"] = q.Valittu,
                    ["right"] = q.OikeinVastattu, ["aarreLukittui"] = q.AarreLukittui, ["found"] = q.Loyto,
                };
            var t = q.PulmaTiedot;
            return new Dictionary<string, object>
            {
                ["kind"] = "puzzle", ["laatta"] = q.Laatta, ["cityId"] = q.Kaupunki, ["puzzleId"] = q.PulmaId,
                ["sketchData"] = t?.Luonnos, ["title"] = t?.Otsikko, ["selite"] = t?.Selite,
                ["hard"] = q.Vaikea, ["kaari"] = q.Kaari, ["explore"] = q.Tutkimus, ["question"] = q.Kysymys,
                ["fact"] = q.Fakta, ["source"] = q.Lahteet.Cast<object>().ToList(),
                ["options"] = q.Vaihtoehdot.Cast<object>().ToList(),
                ["kuvat"] = t?.Kuvat?.Select(k => (object)new Dictionary<string, object> { ["tiedosto"] = k.Tiedosto, ["selite"] = k.Selite }).ToList(),
                ["kuvaLahteet"] = t?.KuvaLahteet, ["correct"] = q.Oikea, ["hint"] = q.Vihje, ["hintShown"] = q.VihjeNaytetty,
                ["hidden"] = q.Piilotetut.Cast<object>().ToList(), ["chosen"] = q.Valittu, ["right"] = q.OikeinVastattu,
                ["timedOut"] = q.AikaLoppui, ["seconds"] = q.Sekunnit, ["aarreLukittui"] = q.AarreLukittui, ["found"] = q.Loyto,
            };
        }

        static Dictionary<string, object> Vaikutus(TapahtumaVaikutus v)
        {
            if (v == null) return null;
            var d = new Dictionary<string, object> { ["kind"] = v.Laji };
            if (v.Maara.HasValue) d["amount"] = v.Maara.Value;
            return d;
        }

        sealed class Peli
        {
            public Matka Matka;
            public Kysely Kysely;
            public Pulmat Pulmat;
            public Tapahtumat Tapahtumat;
            public int Kaksintaisteluja;
        }

        static Dictionary<string, object> Rivi(string teko, Peli pe)
        {
            var m = pe.Matka;
            var t = m.Tila;
            var p = t.Pelaaja;
            var k = t.Kysely;
            var kortti = t.Tapahtumakortti;
            return new Dictionary<string, object>
            {
                ["teko"] = teko,
                ["vaihe"] = Web(t.Vaihe),
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
                ["quizAsked"] = p.Kysytty,
                ["quizCorrect"] = p.Oikein,
                ["kaytetyt"] = k.Kaytetyt.Count,
                ["lastForm"] = k.ViimeMuoto.HasValue ? KyselyTestit.Web(k.ViimeMuoto.Value) : null,
                ["laatat"] = m.Laatat.Laatat.Count,
                ["kaannetyt"] = m.Laatat.Kaannetyt.Count,
                ["tutkittuja"] = k.Tutkitut.Count,
                ["kaaria"] = k.KaariYritykset.Values.Sum(v => v.Yritykset * 2 + (v.Onnistui ? 1 : 0)),
                ["lukot"] = Jarj(k.AarreLukot),
                ["havainto"] = k.Havainto,
                ["pulmaOdottaa"] = pe.Pulmat.Odottaa()?.Id,
                ["puzzlesSeen"] = Jarj(t.NahdytPulmat),
                ["puzzlePrevPhase"] = k.PulmaEdellinenVaihe.HasValue ? Web(k.PulmaEdellinenVaihe.Value) : null,
                ["eventCard"] = kortti == null ? null : new Dictionary<string, object>
                {
                    ["cityId"] = kortti.Kaupunki, ["text"] = kortti.Teksti, ["effect"] = Vaikutus(kortti.Vaikutus),
                },
                ["duelArmed"] = t.KaksintaisteluOdottaa,
                ["kaksintaisteluja"] = pe.Kaksintaisteluja,
                ["quiz"] = KysymysRivi(k.Kysymys),
            };
        }

        /// <summary>Kysely, pulmat ja (valinnaisesti) tapahtumat uudelle tai ladatulle matkalle.</summary>
        static void Kytke(Peli pe, Matka m, bool tapahtumat)
        {
            pe.Matka = m;
            pe.Kysely = new Kysely(m, KyselyTestit.Data);
            pe.Pulmat = Pulmat.Kytke(pe.Kysely, Pulmadata);
            pe.Tapahtumat = tapahtumat ? Tapahtumat.Kytke(pe.Kysely, Tapahtumadata) : null;
            // Skriptin beginDuel-stub: kaksintaistelu "alkaa" ja vuoro päättyy.
            m.Kaksintaistelu = _ => { pe.Kaksintaisteluja++; m.Tila.Vaihe = Vaihe.Toiminta; m.PaataVuoro(); return true; };
        }

        /// <summary>Vertaa askeleen; puzzlePrevPhase ohitetaan latauksen jälkeen (web fromJSON nollaa sen, jälki ei lataa).</summary>
        static void Vertaa(string nimi, int i, Dictionary<string, object> odotettu, Dictionary<string, object> saatu, bool ladattu)
        {
            var eroja = saatu.Keys.Union(odotettu.Keys)
                .Where(key => !(ladattu && key == "puzzlePrevPhase"))
                .Where(key => KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key)) != KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null))
                .Select(key => $"\n  {key}: web {KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key))}\n  {new string(' ', key.Length)}  C#  {KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null)}")
                .ToList();
            if (eroja.Count > 0) throw new Exception($"{nimi} askel {i} ({MiniJson.Teksti(odotettu, "teko")}):{string.Concat(eroja)}");
        }

        /// <summary>Tallentaa ja lataa pelin; tallennuksen pitää pysyä samana latauksen yli.</summary>
        static void TallennaJaLataa(Peli pe, bool tapahtumat, string nimi)
        {
            var json = pe.Matka.Tallenna();
            var m2 = Matka.Lataa(KultaisetApu.Verkko, json, KultaisetApu.Laattamaarat);
            Oleta.Sama(json, m2.Tallenna(), nimi + ": tallennus pysyy samana latauksen yli");
            Kytke(pe, m2, tapahtumat);
        }

        // --- 1. arvonnat ----------------------------------------------------------

        [Testi] static void PaketinPulmatLuetaan()
        {
            var odotetut = Lista("pulmat");
            Oleta.Sama(0, Pulmadata.Ohitetut.Count, "ohitettuja: " + string.Join("; ", Pulmadata.Ohitetut));
            Oleta.Sama(string.Join(",", odotetut.Select(p => MiniJson.Teksti(p, "id") + "@" + MiniJson.Teksti(p, "city"))),
                string.Join(",", Pulmadata.Pulmat.Select(p => p.Id + "@" + p.Kaupunki)), "pulmat ja kaupungit webin järjestyksessä");
            foreach (var p in Pulmadata.Pulmat)
            {
                Oleta.Tosi(p.Arvo != null, p.Id + ": generaattori portattu");
                Oleta.Tosi(p.Otsikko != null && p.Selite != null && p.Kysymys != null && p.Fakta != null && p.Vihje != null, p.Id + ": tekstit");
                Oleta.Tosi(p.Lahteet.Count > 0, p.Id + ": lähteet");
            }
            Oleta.Tosi(Pulmadata.Hae("pylvaat").KuvaLahteet != null, "pylväiden kuvalähteet");
            Oleta.Sama(Pulmadata.Pulmat.Count, Pulmageneraattorit.Generaattorit.Count, "jokaiselle generaattorille pulma");
        }

        [Testi] static void KultaisetArvonnat()
        {
            var arvonnat = Lista("arvonnat");
            Oleta.Tosi(arvonnat.Count >= 11 * 25, "arvontoja " + arvonnat.Count);
            foreach (var a in arvonnat)
            {
                var id = MiniJson.Teksti(a, "id");
                var siemen = (long)MiniJson.Luku(a, "siemen").Value;
                var rng = new Satunnainen(siemen);
                var t = Pulmadata.Hae(id).Arvo(rng);
                var nimi = $"{id} siemen {siemen}";
                Oleta.Sama((long)MiniJson.Luku(a, "kutsuja").Value, rng.Kutsuja, nimi + ": arvontojen määrä");
                var saatu = new Dictionary<string, object>
                {
                    ["sketch"] = t.Luonnos, ["q"] = t.Kysymys, ["options"] = t.Vaihtoehdot, ["correct"] = t.Oikea,
                    ["hint"] = t.Vihje,
                    ["kuvat"] = t.Kuvat?.Select(k => (object)new Dictionary<string, object> { ["tiedosto"] = k.Tiedosto, ["selite"] = k.Selite }).ToList(),
                };
                Oleta.Sama(KyselyTestit.Kanoninen(a["tulos"]), KyselyTestit.Kanoninen(saatu), nimi);
            }
        }

        // --- 2. pulma-ajot --------------------------------------------------------

        static int ToistaPulmaAjo(Dictionary<string, object> ajo, int tallennaVali)
        {
            var muunnelmat = MiniJson.Taulukko(Jalki["muunnelmat"]).Cast<string>().ToList();
            var siemen = (long)MiniJson.Luku(ajo, "seed").Value;
            var alku = MiniJson.Teksti(ajo, "start");
            int ajoNro = (int)MiniJson.Luku(ajo, "ajo").Value;
            var nimi = $"pulma {MiniJson.Teksti(ajo, "pulma")} siemen {siemen}";
            var askeleet = MiniJson.Taulukko(ajo["askeleet"]).Select(MiniJson.Objekti).ToList();

            var pe = new Peli();
            var rng = new Satunnainen(siemen);
            var m = Matka.Luo(KultaisetApu.Verkko, rng, "Fogg", alku, KultaisetApu.Laattamaarat);
            Kytke(pe, m, false);
            m.AloitaVuoro();
            Oleta.Sama((long)MiniJson.Luku(ajo, "rngAlussa").Value, rng.Kutsuja, nimi + ": alun kulutus");
            if (MiniJson.Totuus(ajo, "laatatonta")) m.Laatat.Laatat.Poista(alku);

            int i = 0;
            bool ladattu = false;
            Vertaa(nimi, i, askeleet[i], Rivi("alku", pe), ladattu); i++;
            int avatut = 0;
            bool apu = false;
            for (int n = 0; n < 12; n++)
            {
                var t = pe.Matka.Tila;
                var p = t.Pelaaja;
                var ky = pe.Kysely;
                pe.Matka.ViimeLoyto = null;
                string teko;
                TekoTulos tulos;
                if (t.Vaihe == Vaihe.Toiminta)
                {
                    if (!pe.Matka.Kulkutavat().Contains(Kulkutapa.Pysy)) break;
                    teko = "stay";
                    tulos = pe.Matka.ValitseKulkutapa(Kulkutapa.Pysy);
                    if (t.Vaihe == Vaihe.Kysymys) { avatut++; apu = false; }
                }
                else if (t.Vaihe == Vaihe.Kysymys)
                {
                    var q = t.Kysely.Kysymys;
                    var mu = muunnelmat[(ajoNro + avatut - 1) % muunnelmat.Count];
                    if (q.Valittu.HasValue) { teko = "close"; tulos = ky.Sulje(); }
                    else if (mu == "vihje" && !apu && q.Vihje != null && p.Raha >= 40) { apu = true; teko = "hint"; tulos = ky.Vihje(); }
                    else if (mu == "puolita" && !apu && q.Vaihtoehdot.Count >= 4 && p.Raha >= 80) { apu = true; teko = "fiftyfifty"; tulos = ky.Puolita(); }
                    else if (mu == "sulje") { teko = "close"; tulos = ky.Sulje(); }
                    else if (mu == "aika") { teko = "timeout"; tulos = ky.AikaLoppui(); }
                    else
                    {
                        bool oikein = mu == "oikein" || mu == "vihje";
                        int valinta = oikein ? q.Oikea
                            : Enumerable.Range(0, q.Vaihtoehdot.Count).First(x => x != q.Oikea && !q.Piilotetut.Contains(x));
                        teko = "answer:" + valinta;
                        tulos = ky.Vastaa(valinta);
                    }
                }
                else if (t.Vaihe == Vaihe.Tapahtuma) { teko = "event:close"; tulos = pe.Tapahtumat.Sulje(); }
                else break;
                if (!tulos.Ok) throw new Exception($"{nimi}: {teko} epäonnistui: {tulos.Virhe}");
                if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                Vertaa(nimi, i, askeleet[i], Rivi(teko, pe), ladattu); i++;
                if (tallennaVali > 0 && (n + 1) % tallennaVali == 0)
                {
                    TallennaJaLataa(pe, false, nimi);
                    ladattu = true;
                }
            }
            Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");
            return i;
        }

        [Testi] static void KultaisetPulmaAjot()
        {
            var ajot = Lista("pulmaAjot");
            Oleta.Tosi(ajot.Count >= 55, "ajoja " + ajot.Count);
            int yht = ajot.Sum(a => ToistaPulmaAjo(a, 0));
            Oleta.Tosi(yht > 400, "askelia " + yht);
        }

        [Testi] static void KultaisetPulmaAjotTallennuksenYli()
        {
            // Väli 1: tallennus joka teon jälkeen, myös avoimen pulman kesken.
            foreach (var ajo in Lista("pulmaAjot")) ToistaPulmaAjo(ajo, 1);
            foreach (var ajo in Lista("pulmaAjot")) ToistaPulmaAjo(ajo, 2);
        }

        // --- 3. peli-ajot ---------------------------------------------------------

        static int ToistaPeliAjo(Dictionary<string, object> ajo, int tallennaVali)
        {
            var siemen = (long)MiniJson.Luku(ajo, "seed").Value;
            var alku = MiniJson.Teksti(ajo, "start");
            bool tapahtumat = MiniJson.Totuus(ajo, "tapahtumat");
            var nimi = $"peli siemen {siemen} {alku}";
            var askeleet = MiniJson.Taulukko(ajo["askeleet"]).Select(MiniJson.Objekti).ToList();
            int vuorot = (int)MiniJson.Luku(Jalki, "vuorot").Value;
            int maxTeot = (int)MiniJson.Luku(Jalki, "maxTeot").Value;

            var pe = new Peli();
            var rng = new Satunnainen(siemen);
            var m = Matka.Luo(KultaisetApu.Verkko, rng, "Fogg", alku, KultaisetApu.Laattamaarat);
            Kytke(pe, m, tapahtumat);
            m.AloitaVuoro();
            Oleta.Sama((long)MiniJson.Luku(ajo, "rngAlussa").Value, rng.Kutsuja, nimi + ": alun kulutus");

            int i = 0;
            bool ladattu = false;
            Vertaa(nimi, i, askeleet[i], Rivi("alku", pe), ladattu); i++;
            var kk = new KyselyKasikirjoitus();
            for (int n = 0; n < maxTeot && pe.Matka.Tila.VuoroLaskuri <= vuorot; n++)
            {
                pe.Matka.ViimeLoyto = null;
                string teko;
                if (pe.Matka.Tila.Vaihe == Vaihe.Tapahtuma)
                {
                    var tulos = pe.Tapahtumat.Sulje();
                    if (!tulos.Ok) throw new Exception($"{nimi}: tapahtuman sulku epäonnistui: {tulos.Virhe}");
                    teko = "event:close";
                }
                else teko = kk.Seuraava(pe.Kysely);
                if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                Vertaa(nimi, i, askeleet[i], Rivi(teko, pe), ladattu); i++;
                if (tallennaVali > 0 && (n + 1) % tallennaVali == 0)
                {
                    TallennaJaLataa(pe, tapahtumat, nimi);
                    ladattu = true;
                }
            }
            Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");
            return i;
        }

        [Testi] static void KultaisetPeliAjot()
        {
            var ajot = Lista("peliAjot");
            Oleta.Tosi(ajot.Count >= 7, "ajoja " + ajot.Count);
            int yht = ajot.Sum(a => ToistaPeliAjo(a, 0));
            Oleta.Tosi(yht > 2000, "askelia " + yht);
            // Jäljessä on pulmia ja jokainen tapahtumavaikutus (skripti vartioi samaa).
            var rivit = ajot.SelectMany(a => MiniJson.Taulukko(a["askeleet"]).Select(MiniJson.Objekti)).ToList();
            Oleta.Tosi(rivit.Any(r => MiniJson.Kentta(r, "quiz") is Dictionary<string, object> q && MiniJson.Teksti(q, "kind") == "puzzle"), "pulma peliajossa");
            foreach (var laji in new[] { "raha", "kyyti", "viive" })
                Oleta.Tosi(rivit.Any(r => MiniJson.Kentta(r, "eventCard") is Dictionary<string, object> e
                    && MiniJson.Kentta(e, "effect") is Dictionary<string, object> f && MiniJson.Teksti(f, "kind") == laji), "tapahtuma " + laji);
        }

        [Testi] static void KultaisetPeliAjotTallennuksenYli()
        {
            foreach (var ajo in Lista("peliAjot")) ToistaPeliAjo(ajo, 5);
            foreach (var ajo in Lista("peliAjot")) ToistaPeliAjo(ajo, 3);
        }

        // --- yksikkötestit -------------------------------------------------------

        static Kysely PieniKysely(string alku, out ValeLaatat laatat)
        {
            var m = Matka.Luo(ValeVerkko.Pieni(), new Satunnainen(5), "Fogg", alku);
            var d = new Kysymysdata();
            d.Yleiset.Add(new Kysymys { Q = "yleinen", Vaihtoehdot = new List<string> { "a", "b", "c", "d" }, Oikea = 0, Fakta = "f" });
            var ky = new Kysely(m, d);
            laatat = new ValeLaatat();
            laatat.Kytke(ky);
            return ky;
        }

        static Pulmadata PieniPulmadata() => Pulmadata.Lue(@"{""nimi"":""pulmat"",""alkiot"":[
            {""id"":""kiintea"",""kaupunki"":""ala"",""data"":{""id"":""kiintea"",""city"":""ala"",""title"":""Otsikko"",""selite"":""Selite"",
              ""q"":""Kysymys?"",""options"":[""yksi"",""kaksi"",""kolme""],""correct"":1,""fact"":""Fakta."",""source"":[""lähde"",""  ""],
              ""sketch"":{""luku"":3}}},
            {""id"":""kukko"",""kaupunki"":""bee"",""data"":{""id"":""kukko"",""generate"":{""$funktio"":""arvoKukko"",""lahde"":""…""},""city"":""bee"",
              ""title"":""Tuulikukko"",""q"":""Mihin?"",""hint"":""Katso nokkaa."",""fact"":""F"",""source"":""S""}},
            {""id"":""outo"",""kaupunki"":""cee"",""data"":{""id"":""outo"",""generate"":{""$funktio"":""arvoTuntematon""},""city"":""cee"",""q"":""?""}}
          ]}");

        [Testi] static void PulmaDataOhittaaTuntemattomanGeneraattorin()
        {
            var d = PieniPulmadata();
            Oleta.Sama("kiintea,kukko", string.Join(",", d.Pulmat.Select(p => p.Id)));
            Oleta.Sama(1, d.Ohitetut.Count);
            Oleta.Tosi(d.Ohitetut[0].Contains("arvoTuntematon"), d.Ohitetut[0]);
            Oleta.Sama("lähde", string.Join("|", d.Hae("kiintea").Lahteet), "sourceList karsii tyhjät");
            Oleta.Sama(0, Pulmadata.LueKansiosta(Path.Combine(KultaisetApu.Juuri, "ei-ole")).Pulmat.Count, "puuttuva kokoelma = ei pulmia");
        }

        [Testi] static void LaatatonPulmaPalaaEdelliseenVaiheeseen()
        {
            var ky = PieniKysely("ala", out _);
            var m = ky.Matka;
            var pu = Pulmat.Kytke(ky, PieniPulmadata());
            m.AloitaVuoro();
            Oleta.Tosi(m.Kulkutavat().Contains(Kulkutapa.Pysy), "pulma tuo Pysy-tavan");
            Oleta.Sama("kiintea", pu.Odottaa()?.Id);
            long ennen = m.Satunnainen.Kutsuja;
            Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Pysy).Ok, "avaa pulman");
            Oleta.Sama(ennen + 2, m.Satunnainen.Kutsuja, "kiinteä pulma: vain kolmen vaihtoehdon sekoitus");
            var q = m.Tila.Kysely.Kysymys;
            Oleta.Sama(KysymysMuoto.Pulma, q.Laji);
            Oleta.Tosi(!q.Laatta && q.Sekunnit == null, "laataton, ei aikaa");
            Oleta.Sama("Otsikko", pu.Nakyma.Otsikko);
            Oleta.Sama(3.0, (double)pu.Nakyma.Luonnos["luku"], "kiinteä luonnos");
            Oleta.Sama("kaksi", q.Vaihtoehdot[q.Oikea]);
            Oleta.Tosi(m.Tila.NahdytPulmat.Contains("ala"), "nähty heti avattaessa");
            Oleta.Tosi(pu.Odottaa() == null && !pu.Avaa().Ok, "ei toista kertaa");
            Oleta.Tosi(ky.Vastaa(q.Oikea).Ok, "vastaus");
            Oleta.Sama(Kokemus.Pulma, m.Tila.Pelaaja.Xp, "pulmapisteet");
            Oleta.Tosi(ky.Sulje().Ok, "sulje");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Sama(1, m.Tila.VuoroLaskuri, "laataton pulma ei päätä vuoroa");
            Oleta.Tosi(m.Kulkutavat().Contains(Kulkutapa.Pysy), "tutkiminen jää tarjolle");
        }

        [Testi] static void LaatallinenPulmaKaantaaLaatanJaPaattaaVuoron()
        {
            var ky = PieniKysely("bee", out var laatat);
            laatat.Laatat["bee"] = "pieniAarre";
            var m = ky.Matka;
            var pu = Pulmat.Kytke(ky, PieniPulmadata());
            m.AloitaVuoro();
            Oleta.Tosi(ky.Tutki().Ok, "pulma ennen laattakysymystä");
            var q = m.Tila.Kysely.Kysymys;
            Oleta.Tosi(q.Laji == KysymysMuoto.Pulma && q.Laatta, "laatallinen pulma");
            Oleta.Sama("Katso nokkaa.", q.Vihje);
            Oleta.Tosi(pu.Nakyma.Luonnos.ContainsKey("kulma"), "generaattorin luonnos");
            // Tallennus kesken: pulma, luonnos ja nähdyt kulkevat.
            var json = m.Tallenna();
            var m2 = Matka.Lataa(ValeVerkko.Pieni(), json);
            Oleta.Sama(json, m2.Tallenna(), "sama teksti");
            Oleta.Sama(KyselyTestit.Kanoninen(pu.Nakyma.Luonnos), KyselyTestit.Kanoninen(m2.Tila.Kysely.Kysymys.PulmaTiedot.Luonnos), "luonnos latautuu");
            Oleta.Tosi(m2.Tila.NahdytPulmat.Contains("bee"), "nähdyt latautuvat");
            Oleta.Tosi(ky.Vastaa(q.Oikea).Ok, "vastaus");
            Oleta.Sama("pieniAarre", q.Loyto, "oikea ratkaisu kääntää laatan");
            Oleta.Tosi(ky.Sulje().Ok, "sulje");
            Oleta.Sama(2, m.Tila.VuoroLaskuri, "laatallinen pulma päättää vuoron");
        }

        [Testi] static void VanhaTallennusIlmanPulmakenttiaLatautuu()
        {
            var ky = PieniKysely("ala", out _);
            Pulmat.Kytke(ky, PieniPulmadata());
            ky.Matka.AloitaVuoro();
            ky.Tutki();
            var json = ky.Matka.Tallenna();
            Oleta.Tosi(json.Contains("\"pulmatNahty\":[\"ala\"]") && json.Contains("\"tapahtumakortti\":null"), "uudet kentät");
            var vanha = json.Substring(0, json.IndexOf(",\"pulmatNahty\":", StringComparison.Ordinal)).Replace("\"versio\":4", "\"versio\":3") + "}";
            vanha = vanha.Replace(",\"pulmaTiedot\":", ",\"eiKaytossa\":");
            var t = Pelitila.FromJson(vanha);
            Oleta.Sama(0, t.NahdytPulmat.Count, "ei nähtyjä");
            Oleta.Tosi(t.Tapahtumakortti == null, "ei korttia");
            Oleta.Tosi(t.Kysely.Kysymys.PulmaTiedot == null, "ei pulman tietoja");
            Oleta.Sama(3, t.LuettuVersio, "versio ennallaan");
        }

        // --- tapahtumat ------------------------------------------------------------

        [Testi] static void TapahtumadataLuetaanKaikistaMuodoista()
        {
            var taulu = Tapahtumadata.Lue(@"[{""text"":""A"",""effect"":{""kind"":""raha"",""amount"":-60}},{""text"":""B""}]");
            Oleta.Sama(2, taulu.Kortit.Count);
            Oleta.Sama(-60, taulu.Kortit[0].Vaikutus.Maara);
            Oleta.Tosi(taulu.Kortit[1].Vaikutus == null, "ei vaikutusta");
            var events = Tapahtumadata.Lue(@"{""events"":[{""text"":""C"",""effect"":{""kind"":""kyyti""}}]}");
            Oleta.Sama("kyyti", events.Kortit[0].Vaikutus.Laji);
            Oleta.Tosi(!events.Kortit[0].Vaikutus.Maara.HasValue, "ei määrää");
            var kokoelma = Tapahtumadata.Lue(@"{""nimi"":""tapahtumat"",""alkiot"":[{""id"":""x"",""data"":{""text"":""D"",""effect"":{""kind"":""viive""}}}]}");
            Oleta.Sama("D", kokoelma.Kortit[0].Teksti);
            bool heitti = false;
            try { Tapahtumadata.Lue(@"[{""effect"":{""kind"":""viive""}}]"); } catch (FormatException) { heitti = true; }
            Oleta.Tosi(heitti, "kortti ilman tekstiä");
            Oleta.Sama(12, Tapahtumadata.Kortit.Count, "testiaineisto: Afrikan kortit");
            Oleta.Sama(0, Tapahtumadata.LueKansiosta(Path.Combine(KultaisetApu.Juuri, "ei-ole")).Kortit.Count);
        }

        static Tapahtumat PienetTapahtumat(Kysely ky, string json) => Tapahtumat.Kytke(ky, Tapahtumadata.Lue(json));

        [Testi] static void RahatapahtumaEiVieMiinukselle()
        {
            var ky = PieniKysely("ala", out var laatat);
            laatat.Laatat["ala"] = "pieniAarre";
            var m = ky.Matka;
            var ta = PienetTapahtumat(ky, @"[{""text"":""Maksu"",""effect"":{""kind"":""raha"",""amount"":-500}}]");
            m.AloitaVuoro();
            Oleta.Sama("88,0,0,0,12", string.Join(",", ky.Painot("ala").Select(x => x.Value)), "tapahtumien paino 12, puuttuvat muodot visalle");
            Oleta.Tosi(ky.Tutki(muoto: KysymysMuoto.Tapahtuma).Ok, "nimetty muoto avaa tapahtuman");
            Oleta.Sama(Vaihe.Tapahtuma, m.Tila.Vaihe);
            Oleta.Tosi(m.Kulkutavat().Count == 0, "kortin aikana ei matkusteta");
            Oleta.Sama("ala", ta.Kortti.Kaupunki);
            Oleta.Tosi(m.Tila.Kysely.Kaytetyt.Contains("Maksu"), "kortti käytetty");
            var viestit = new List<string>();
            ta.Tapahtui += (laji, teksti) => viestit.Add(laji + ":" + teksti);
            Oleta.Tosi(ta.Sulje().Ok, "sulje");
            Oleta.Sama(0, m.Tila.Pelaaja.Raha, "raha ei mene miinukselle");
            Oleta.Sama("raha:Fogg menetti 300 puntaa.", string.Join("|", viestit));
            Oleta.Sama(2, m.Tila.VuoroLaskuri, "vuoro päättyi");
            Oleta.Tosi(laatat.Laatat.ContainsKey("ala"), "laatta jää kääntämättä");
            Oleta.Tosi(!ta.Sulje().Ok, "ei avointa korttia");
        }

        [Testi] static void KyytiJaViive()
        {
            var ky = PieniKysely("saari", out var laatat);
            laatat.Laatat["saari"] = "pieniAarre";
            var m = ky.Matka;
            var ta = PienetTapahtumat(ky, @"[{""text"":""Kyyti"",""effect"":{""kind"":""kyyti""}},{""text"":""Viive"",""effect"":{""kind"":""viive""}}]");
            m.AloitaVuoro();
            // Saaresta ainoa naapuri on ala (merireitti): kyyti vie sinne ja kirjaa saapumisen.
            m.Tila.Tapahtumakortti = new Tapahtumakortti { Kaupunki = "saari", Teksti = "Kyyti", Vaikutus = ta.Data.Kortit[0].Vaikutus };
            m.Tila.Vaihe = Vaihe.Tapahtuma;
            long ennen = m.Satunnainen.Kutsuja;
            Oleta.Tosi(ta.Sulje().Ok, "kyyti");
            Oleta.Sama("c:ala", m.Tila.Pelaaja.Sijainti.Avain);
            Oleta.Tosi(m.Tila.Pelaaja.Kaydyt.Contains("ala"), "saapuminen kirjattu");
            Oleta.Sama("ala", m.Tila.Kysely.Havainto, "saapumishavainto");
            Oleta.Tosi(m.Satunnainen.Kutsuja >= ennen + 1, "kyytikohde arvottiin");
            // Viive: kaksi vuoroa.
            m.Tila.Tapahtumakortti = new Tapahtumakortti { Kaupunki = "ala", Teksti = "Viive", Vaikutus = ta.Data.Kortit[1].Vaikutus };
            m.Tila.Vaihe = Vaihe.Tapahtuma;
            int vuoro = m.Tila.VuoroLaskuri;
            // Tapahtumakortti kulkee tallennuksessa.
            var json = m.Tallenna();
            var m2 = Matka.Lataa(ValeVerkko.Pieni(), json);
            Oleta.Sama(json, m2.Tallenna());
            Oleta.Sama("Viive", m2.Tila.Tapahtumakortti.Teksti);
            Oleta.Sama(Vaihe.Tapahtuma, m2.Tila.Vaihe);
            Oleta.Tosi(ta.Sulje().Ok, "viive");
            Oleta.Sama(vuoro + 2, m.Tila.VuoroLaskuri, "viive vie ylimääräisen vuoron");
        }
    }
}
