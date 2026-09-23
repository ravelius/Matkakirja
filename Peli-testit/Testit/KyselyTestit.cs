// Kysymysmoottorin (Peli/Kysely.cs), kokemuksen (Peli/Kokemus.cs) ja
// kysymysdatan (Peli/Kysymysdata.cs) testit: kultainen jälki
// Kultaiset/kysymysjalki.json, jonka verkkopelin js/game.js tuotti
// (Kultaiset/tee-kysymysjalki.mjs), sekä yksikkötestit.
// Käsikirjoitus on sama kuin skriptissä (ks. sen otsakekommentti).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli.Testit
{
    /// <summary>
    /// Kysymysjäljen rajaus (tee-kysymysjalki.mjs): laatat jaetaan oikeasti,
    /// mutta revealToken/lukitseAarre vain poistavat laatan (ei rahaa, ei
    /// arvontaa). Koukut korvaavat Kyselyn oletuskytkennän Matkan laattoihin.
    /// </summary>
    static class RajatutLaatat
    {
        public static void Kytke(Kysely k)
        {
            var laatat = k.Matka.Laatat.Laatat;
            k.LaattaKaantyy = c => { var t = laatat.Hae(c); if (t != null) laatat.Poista(c); return t; };
            k.AarreLukittuu = c => laatat.Poista(c);
        }
    }

    /// <summary>Pienen verkon testien valelaatat: kaupunki → tyyppi ilman jakoa.</summary>
    sealed class ValeLaatat
    {
        public readonly Dictionary<string, string> Laatat = new Dictionary<string, string>();

        public void Kytke(Kysely k)
        {
            k.LaattaTassa = c => Laatat.ContainsKey(c);
            k.LaattaKaantyy = c => Laatat.Remove(c, out var t) ? t : null;
            k.AarreLukittuu = c => Laatat.Remove(c);
            k.Matka.Tavoitteet = () => Laatat.Keys.ToList();
        }
    }

    /// <summary>Sama deterministinen käsikirjoitus kuin tee-kysymysjalki.mjs:ssä.</summary>
    sealed class KyselyKasikirjoitus
    {
        public int Valinnat, Heitot, Avatut;
        public bool ApuKokeiltu;

        public string Seuraava(Kysely ky)
        {
            var m = ky.Matka;
            var t = m.Tila;
            var p = t.Pelaaja;
            TekoTulos tulos = null;
            string teko = null;
            if (t.Vaihe == Vaihe.Toiminta)
            {
                var tavat = m.Kulkutavat();
                if (tavat.Count == 0) throw new Exception("ei tapoja");
                var muut = tavat.Where(x => x != Kulkutapa.Pysy).ToList();
                if (tavat.Contains(Kulkutapa.Pysy) && (Valinnat % 2 == 0 || muut.Count == 0))
                {
                    var kaupunki = p.Sijainti.Kaupungissa ? p.Sijainti.Kaupunki : null;
                    bool vaikea = kaupunki != null && ky.LaattaTassa(kaupunki) && ky.VaikeitaTarjolla(kaupunki) && Avatut % 4 == 3;
                    teko = vaikea ? "stay:hard" : "stay";
                    tulos = ky.Tutki(vaikea);
                    if (t.Vaihe == Vaihe.Kysymys) { Avatut++; ApuKokeiltu = false; }
                }
                else
                {
                    var tapa = muut[Valinnat % muut.Count];
                    if (tapa == Kulkutapa.Bussi)
                    {
                        var kohde = m.BussiKohteet().OrderBy(k => k, StringComparer.Ordinal).First();
                        teko = "bus:" + kohde; tulos = m.Bussi(kohde);
                    }
                    else if (tapa == Kulkutapa.Lento)
                    {
                        var kohde = m.LentoKohteet().OrderBy(k => k, StringComparer.Ordinal).First();
                        teko = "fly:" + kohde; tulos = m.Lenna(kohde);
                    }
                    else { teko = "travel:" + MatkaTestit.Web(tapa); tulos = m.ValitseKulkutapa(tapa); }
                }
                Valinnat++;
            }
            else if (t.Vaihe == Vaihe.Heitto)
            {
                if (m.MuitaTapojaTarjolla() && Heitot % 4 == 3) { teko = "cancel"; tulos = m.PeruKulkutapa(); }
                else { teko = "roll"; tulos = m.Heita(); }
                Heitot++;
            }
            else if (t.Vaihe == Vaihe.Siirto)
            {
                var avain = t.Siirrot.Keys.OrderBy(k => k, StringComparer.Ordinal).First();
                teko = "move:" + avain; tulos = m.Liiku(avain);
            }
            else if (t.Vaihe == Vaihe.Kysymys)
            {
                var q = t.Kysely.Kysymys;
                int k = (Avatut - 1) % 6;
                if (!q.Valittu.HasValue && !ApuKokeiltu)
                {
                    ApuKokeiltu = true;
                    if (k == 1 && q.Vaihtoehdot.Count >= 4 && p.Raha >= 80) { teko = "fiftyfifty"; tulos = ky.Puolita(); }
                    else if (k == 2 && q.Vihje != null && p.Raha >= 40) { teko = "hint"; tulos = ky.Vihje(); }
                    else if (k == 3 && q.Vaihtoehdot.Count >= 2 && p.Raha >= 25) { teko = "kaveriapu"; tulos = ky.Kaveriapu(); }
                }
                if (teko == null)
                {
                    if (q.Valittu.HasValue) { teko = "close"; tulos = ky.Sulje(); }
                    else if (k == 4) { teko = "timeout"; tulos = ky.AikaLoppui(); }
                    else if (k == 5) { teko = "close"; tulos = ky.Sulje(); }
                    else
                    {
                        bool oikein = (Avatut - 1) % 3 != 2;
                        int valinta = oikein ? q.Oikea
                            : Enumerable.Range(0, q.Vaihtoehdot.Count).First(i => i != q.Oikea && !q.Piilotetut.Contains(i));
                        teko = "answer:" + valinta; tulos = ky.Vastaa(valinta);
                    }
                }
            }
            else throw new Exception("odottamaton vaihe " + t.Vaihe);
            if (!tulos.Ok) throw new Exception(teko + " epäonnistui: " + tulos.Virhe);
            return teko;
        }
    }

    public static class KyselyTestit
    {
        static Kysymysdata data;
        internal static Kysymysdata Data => data ??= Kysymysdata.LueKansiosta(KultaisetApu.Paketti);

        static List<Lippumaa> liput;
        internal static List<Lippumaa> Liput => liput ??= Kysymysdata.LueLiput(File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "liput.json")));

        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "kysymysjalki.json"))));

        // --- webin nimet --------------------------------------------------------

        internal static string Web(Vaihe v) => v switch
        {
            Vaihe.Toiminta => "action", Vaihe.Heitto => "roll", Vaihe.Siirto => "move",
            Vaihe.Kysymys => "quiz", Vaihe.Ohi => "over", _ => "pickstart",
        };

        internal static string Web(KysymysMuoto m) => m switch
        {
            KysymysMuoto.Visa => "quiz", KysymysMuoto.Vaite => "claim", KysymysMuoto.Kuva => "photo",
            KysymysMuoto.Lippu => "flag", _ => "puzzle",
        };

        // --- kanoninen muoto: avaimet aakkosjärjestyksessä ---------------------

        static void Kanoninen(object o, StringBuilder sb)
        {
            switch (o)
            {
                case null: sb.Append("null"); break;
                case string s: sb.Append(Pelitila.Teksti(s)); break;
                case bool b: sb.Append(b ? "true" : "false"); break;
                case double d: sb.Append(d.ToString("R", CultureInfo.InvariantCulture)); break;
                case int i: sb.Append(((double)i).ToString("R", CultureInfo.InvariantCulture)); break;
                case long l: sb.Append(((double)l).ToString("R", CultureInfo.InvariantCulture)); break;
                case Dictionary<string, object> dict:
                    sb.Append('{');
                    bool eka = true;
                    foreach (var kv in dict.OrderBy(k => k.Key, StringComparer.Ordinal))
                    {
                        if (!eka) sb.Append(',');
                        eka = false;
                        sb.Append(kv.Key).Append(':');
                        Kanoninen(kv.Value, sb);
                    }
                    sb.Append('}');
                    break;
                case System.Collections.IEnumerable e:
                    sb.Append('[');
                    bool ek = true;
                    foreach (var x in e) { if (!ek) sb.Append(','); ek = false; Kanoninen(x, sb); }
                    sb.Append(']');
                    break;
                default: throw new Exception("tuntematon tyyppi " + o.GetType());
            }
        }

        internal static string Kanoninen(object o) { var sb = new StringBuilder(); Kanoninen(o, sb); return sb.ToString(); }

        static Dictionary<string, object> KysymysRivi(AvoinKysymys q)
        {
            if (q == null) return null;
            return new Dictionary<string, object>
            {
                ["kind"] = Web(q.Laji), ["cityId"] = q.Kaupunki, ["hard"] = q.Vaikea, ["kaari"] = q.Kaari,
                ["explore"] = q.Tutkimus, ["frame"] = q.Kehys, ["question"] = q.Kysymys, ["fact"] = q.Fakta,
                ["source"] = q.Lahteet.Cast<object>().ToList(), ["place"] = q.Paikka, ["photoCity"] = q.KuvaKaupunki,
                ["flagFile"] = q.LippuTiedosto, ["options"] = q.Vaihtoehdot.Cast<object>().ToList(), ["correct"] = q.Oikea,
                ["hint"] = q.Vihje, ["hintShown"] = q.VihjeNaytetty, ["hidden"] = q.Piilotetut.Cast<object>().ToList(),
                ["kaveriapu"] = q.Kaveriapu, ["chosen"] = q.Valittu, ["right"] = q.OikeinVastattu,
                ["timedOut"] = q.AikaLoppui, ["seconds"] = q.Sekunnit, ["aarreLukittui"] = q.AarreLukittui,
                ["found"] = q.Loyto,
            };
        }

        static List<object> Jarj(IEnumerable<string> l) => l.OrderBy(x => x, StringComparer.Ordinal).Cast<object>().ToList();

        /// <summary>C#-tila samoin kentin kuin skriptin tila().</summary>
        internal static Dictionary<string, object> Rivi(string teko, Kysely ky)
        {
            var m = ky.Matka;
            var t = m.Tila;
            var p = t.Pelaaja;
            var k = t.Kysely;
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
                ["taso"] = Kokemus.TasoPisteille(p.Xp).Taso,
                ["nousut"] = ky.Kokemus.OtaNousut().Select(x => (object)x.Taso).ToList(),
                ["quizAsked"] = p.Kysytty,
                ["quizCorrect"] = p.Oikein,
                ["tietoprosentti"] = Kokemus.Tietoprosentti(p),
                ["kaytetyt"] = k.Kaytetyt.Count,
                ["lastForm"] = k.ViimeMuoto.HasValue ? Web(k.ViimeMuoto.Value) : null,
                ["laatat"] = m.Laatat.Laatat.Count,
                ["tutkitut"] = Jarj(k.Tutkitut),
                ["kaari"] = Jarj(k.KaariYritykset.Select(kv => $"{kv.Key}={kv.Value.Yritykset}{(kv.Value.Onnistui ? "+" : "")}")),
                ["lukot"] = Jarj(k.AarreLukot),
                ["havainto"] = k.Havainto,
                ["quiz"] = KysymysRivi(k.Kysymys),
            };
        }

        /// <summary>Uusi tai ladattu Kysely ajon asetuksin (rajatut laatat, liput, kuvat).</summary>
        static Kysely Kytke(Matka m, Dictionary<string, object> ajo)
        {
            var ky = new Kysely(m, Data);
            RajatutLaatat.Kytke(ky);
            if (MiniJson.Totuus(ajo, "liput")) ky.Liput = Liput;
            if (MiniJson.Totuus(ajo, "kuvat"))
                ky.AsetaKuvat(MiniJson.Taulukko(MiniJson.Kentta(Jalki, "kuvat")).Cast<string>());
            return ky;
        }

        /// <summary>
        /// Toistaa yhden ajon ja vertaa joka askelen. tallennaVali > 0: joka
        /// tallennaVali:nnen teon jälkeen peli tallennetaan ja ladataan.
        /// </summary>
        static int ToistaAjo(Dictionary<string, object> ajo, int tallennaVali, Action<Kysely> vikaan = null)
        {
            var siemen = (long)(double)MiniJson.Kentta(ajo, "seed");
            var alku = MiniJson.Teksti(ajo, "start");
            var askeleet = MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Select(MiniJson.Objekti).ToList();
            int vuorot = (int)MiniJson.Luku(Jalki, "vuorot").Value;
            int maxTeot = (int)MiniJson.Luku(Jalki, "maxTeot").Value;
            var nimi = $"siemen {siemen} {alku}";

            // Oikea jako (erä 3): sama laattakartta ja kulutus kuin webin konstruktorissa.
            var rng = new Satunnainen(siemen);
            var m = Matka.Luo(KultaisetApu.Verkko, rng, "Fogg", alku, KultaisetApu.Laattamaarat);
            Oleta.Sama((long)MiniJson.Luku(ajo, "rngAlussa").Value, rng.Kutsuja, nimi + ": jaon kulutus");
            var odotetutLaatat = string.Join(";", MiniJson.Taulukko(MiniJson.Kentta(ajo, "laatat")).Cast<List<object>>().Select(l => l[0] + "=" + l[1]));
            Oleta.Sama(odotetutLaatat, string.Join(";", m.Laatat.Laatat.Select(kv => kv.Key + "=" + kv.Value)), nimi + ": laattakartta");
            if (MiniJson.Teksti(ajo, "taso") == "easy") m.Tila.Pelaaja.Taso = Vaikeustaso.Helppo;
            var ky = Kytke(m, ajo);
            vikaan?.Invoke(ky);
            m.AloitaVuoro();

            int i = 0;
            void Vertaa(string teko)
            {
                if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                var odotettu = askeleet[i];
                var saatu = Rivi(teko, ky);
                var eroja = saatu.Keys.Union(odotettu.Keys)
                    .Where(key => Kanoninen(MiniJson.Kentta(odotettu, key)) != Kanoninen(saatu.TryGetValue(key, out var v) ? v : null))
                    .Select(key => $"\n  {key}: web {Kanoninen(MiniJson.Kentta(odotettu, key))}\n  {new string(' ', key.Length)}  C#  {Kanoninen(saatu.TryGetValue(key, out var v) ? v : null)}")
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
            for (int n = 0; n < maxTeot && m.Tila.VuoroLaskuri <= vuorot; n++)
            {
                Vertaa(kk.Seuraava(ky));
                if (tallennaVali > 0 && (n + 1) % tallennaVali == 0)
                {
                    var json = m.Tallenna();
                    m = Matka.Lataa(KultaisetApu.Verkko, json);
                    Oleta.Sama(json, m.Tallenna(), nimi + ": tallennus pysyy samana latauksen yli");
                    ky = Kytke(m, ajo);
                }
            }
            Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");
            return i;
        }

        static List<Dictionary<string, object>> Ajot =>
            MiniJson.Taulukko(MiniJson.Kentta(Jalki, "jaljet")).Select(MiniJson.Objekti).ToList();

        [Testi] static void KultainenKysymysjalki()
        {
            int yht = 0, kysymyksia = 0;
            Oleta.Tosi(Ajot.Count >= 8, "ajoja");
            foreach (var ajo in Ajot) yht += ToistaAjo(ajo, 0);
            foreach (var ajo in Ajot)
                kysymyksia += MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Select(MiniJson.Objekti)
                    .Count(a => MiniJson.Teksti(a, "teko").StartsWith("stay"));
            Oleta.Tosi(yht > 1000, "askelia " + yht);
            Oleta.Tosi(kysymyksia > 100, "kysymyksiä " + kysymyksia);
        }

        [Testi] static void KultainenKysymysjalkiTallennuksenYli()
        {
            // Väli 5 osuu myös avoimeen kysymykseen (vastaamatta ja vastattuna).
            foreach (var ajo in Ajot) ToistaAjo(ajo, 5);
        }

        [Testi] static void KultainenJalkiKaatuuVaaraanPainoon()
        {
            // Vartija: jos kysymysmoottorin muotopainot poikkeavat webistä (tässä
            // lippumuoto pois), jälki ei saa mennä läpi ainakaan siinä ajossa,
            // jossa lippukysymys arvottiin.
            int kaatui = 0;
            foreach (var ajo in Ajot.Where(a => MiniJson.Totuus(a, "liput")))
            {
                try { ToistaAjo(ajo, 0, ky => ky.Liput = null); }
                catch (Exception) { kaatui++; }
            }
            Oleta.Tosi(kaatui > 0, "lippumuodon poisto muuttaa arvonnat, joten jäljen pitää kaatua");
        }

        [Testi] static void JaljessaOnKaikkiMuodot()
        {
            var muodot = new HashSet<string>();
            foreach (var ajo in Ajot)
                foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Select(MiniJson.Objekti))
                    if (MiniJson.Kentta(a, "quiz") is Dictionary<string, object> q)
                    {
                        var laji = MiniJson.Teksti(q, "kind");
                        if (MiniJson.Totuus(q, "kaari")) laji += "+kaari";
                        if (MiniJson.Totuus(q, "explore")) laji += "+tutki";
                        if (MiniJson.Totuus(q, "hard")) laji += "+vaikea";
                        if (MiniJson.Kentta(q, "aarreLukittui") is bool b && b) muodot.Add("lukko");
                        if (MiniJson.Totuus(q, "timedOut")) muodot.Add("aikaLoppui");
                        if ((MiniJson.Kentta(q, "hidden") as List<object>)?.Count > 0) muodot.Add("50:50");
                        muodot.Add(laji);
                    }
            foreach (var m in new[] { "quiz", "claim", "photo", "flag", "quiz+kaari", "quiz+kaari+tutki", "quiz+tutki", "quiz+vaikea", "lukko", "aikaLoppui", "50:50" })
                Oleta.Tosi(muodot.Contains(m), "jäljestä puuttuu " + m + " (" + string.Join(",", muodot) + ")");
        }

        // --- yksikkötestit --------------------------------------------------------

        [Testi] static void PaketinKysymyksetLuetaan()
        {
            var d = Data;
            Oleta.Sama(104, d.Yleiset.Count, "yleispakka");
            Oleta.Sama(16, d.Vaitteet.Count, "väittämät");
            Oleta.Sama(1407 - 104 - 16, d.Kaupungeittain.Values.Sum(l => l.Count), "kaupunkien kysymykset");
            Oleta.Sama(257, d.Kaupungeittain.Count, "kaupunkeja");
            var sevilla = d.Omat("sevilla");
            Oleta.Sama("Minkä joen rannalla Sevilla sijaitsee?", sevilla[0].Q);
            Oleta.Sama(1, sevilla[0].Vaikeus);
            Oleta.Sama(3, sevilla[1].Vaikeus);
            Oleta.Sama("Guadalquivir", sevilla[0].Vaihtoehdot[sevilla[0].Oikea]);
            Oleta.Sama("https://fi.wikipedia.org/wiki/Sevilla", sevilla[0].Lahteet.Single());
            Oleta.Sama(2, d.Yleiset.First(q => q.Taso == null).Vaikeus, "oletustaso 2");
            var v = d.Vaitteet[0];
            Oleta.Tosi(v.VaiteTotta && v.Vaihtoehdot == null && v.Paikka == "Suezin kanava", "väittämä");
            Oleta.Sama(42, d.Kaaret.Count, "kohtaamiset");
            Oleta.Sama(4, d.Kaaret["praha"].Vaihtoehdot.Count);
            Oleta.Sama(945, d.Paikkatiedot.Values.Sum(l => l.Count), "paikkatiedot");
            Oleta.Sama("isoisa", d.Paikkatiedot["lontoo"][2].Aani);
            Oleta.Tosi(Liput.Count(m => m.Nimi != null && m.Lippu != null) >= 100, "lippuja");
        }

        [Testi] static void TietajatasotJaNousut()
        {
            Oleta.Sama(1, Kokemus.TasoPisteille(0).Taso);
            Oleta.Sama(1, Kokemus.TasoPisteille(149).Taso);
            Oleta.Sama(2, Kokemus.TasoPisteille(150).Taso);
            Oleta.Sama("Tietäjä iänikuinen", Kokemus.TasoPisteille(99999).Nimi);
            Oleta.Sama(null, Kokemus.SeuraavaTaso(8000));
            Oleta.Sama("2,3", string.Join(",", Kokemus.Nousut(100, 400).Select(t => t.Taso)));
            Oleta.Sama(0, Kokemus.Nousut(400, 400).Count);
            Oleta.Sama(0.5, Kokemus.TasonOsuus(75));
            Oleta.Sama(1.0, Kokemus.TasonOsuus(8000));
        }

        [Testi] static void TietoprosenttiPyoristaaKuinJs()
        {
            var p = new Pelaaja();
            Oleta.Sama(null, Kokemus.Tietoprosentti(p));
            Kokemus.KirjaaVastaus(p, true);
            for (int i = 0; i < 7; i++) Kokemus.KirjaaVastaus(p, false);
            Oleta.Sama(13, Kokemus.Tietoprosentti(p), "12,5 → 13 (Math.round)");
            p.Kysytty = 3; p.Oikein = 2;
            Oleta.Sama(67, Kokemus.Tietoprosentti(p));
        }

        static Kysely PieniKysely(string alku, out ValeLaatat laatat, Kysymysdata d = null)
        {
            var m = Matka.Luo(ValeVerkko.Pieni(), new Satunnainen(5), "Fogg", alku);
            var ky = new Kysely(m, d ?? PieniData());
            laatat = new ValeLaatat();
            laatat.Kytke(ky);
            m.AloitaVuoro();
            return ky;
        }

        static Kysymysdata PieniData()
        {
            var d = new Kysymysdata();
            Kysymys K(string q, int? taso = null) => new Kysymys
            {
                Q = q, Vaihtoehdot = new List<string> { "a", "b", "c", "d" }, Oikea = 0, Taso = taso, Vihje = "v", Fakta = "f",
            };
            d.Kaupungeittain["ala"] = new List<Kysymys> { K("ala1"), K("ala-vaikea", 3) };
            d.Kaupungeittain["bee"] = new List<Kysymys> { K("bee1") };
            d.Yleiset.Add(K("yleinen"));
            d.Vaitteet.Add(new Kysymys { Q = "väite", VaiteTotta = false, Fakta = "f" });
            d.Kaaret["cee"] = new KaariKysymys { Kaupunki = "cee", Q = "kaari?", Vaihtoehdot = new List<string> { "x", "y", "z" }, Oikea = 2, Fakta = "k" };
            return d;
        }

        [Testi] static void PainotSiirtyvatVisalle()
        {
            var ky = PieniKysely("ala", out _);
            string P(List<KeyValuePair<KysymysMuoto, int>> p) => string.Join(",", p.Select(x => x.Value));
            // Ei kuvia eikä lippuja: 67 (visa 55 + webin tapahtumapaino 12) + 10 + 8 = 85.
            Oleta.Sama("85,15,0,0", P(ky.Painot("ala")));
            ky.Matka.Tila.Kysely.ViimeMuoto = KysymysMuoto.Vaite;
            Oleta.Sama("100,0,0,0", P(ky.Painot("ala")), "sama erikoismuoto ei toistu");
            ky.AsetaKuvat(new[] { "bee", "cee", "bee" });
            ky.Matka.Tila.Kysely.ViimeMuoto = KysymysMuoto.Visa;
            Oleta.Sama("bee,cee", string.Join(",", ky.KuvaKohteet()), "kaksoiset pois");
            Oleta.Sama("75,15,10,0", P(ky.Painot("ala")));
        }

        [Testi] static void TutkiminenPalkitseeKerranJaAvaaVuoron()
        {
            var ky = PieniKysely("ala", out _);
            var m = ky.Matka;
            Oleta.Tosi(m.Kulkutavat().Contains(Kulkutapa.Pysy), "tutkimaton kaupunki tarjoaa Pysy-tavan");
            Oleta.Tosi(!ky.Tutki(vaikea: true).Ok, "vaikea vaatii laatan");
            Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Pysy).Ok, "Pysy avaa tutkimuksen");
            var q = m.Tila.Kysely.Kysymys;
            Oleta.Tosi(q.Tutkimus && m.Tila.Vaihe == Vaihe.Kysymys, "tutkimus auki");
            Oleta.Tosi(ky.Vastaa(q.Oikea).Ok, "vastaus");
            Oleta.Sama(350, m.Tila.Pelaaja.Raha, "löytöpalkkio");
            Oleta.Sama(Kokemus.Tutkiminen, m.Tila.Pelaaja.Xp);
            Oleta.Tosi(!ky.Vastaa(q.Oikea).Ok, "toista vastausta ei oteta");
            Oleta.Tosi(ky.Sulje().Ok, "sulje");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Sama(2, m.Tila.VuoroLaskuri, "vuoro päättyi");
            Oleta.Tosi(!m.Kulkutavat().Contains(Kulkutapa.Pysy), "kerran pelissä");
        }

        [Testi] static void KohtaaminenLukitseeToisellaVaarallaJaPalkitseeOikealla()
        {
            var ky = PieniKysely("cee", out var laatat);
            var lukitut = new List<string>();
            ky.AarreLukittuu += c => lukitut.Add(c);
            var m = ky.Matka;
            for (int yritys = 1; yritys <= 2; yritys++)
            {
                m.Tila.Vaihe = Vaihe.Toiminta;
                Oleta.Tosi(ky.Tutki().Ok, "kohtaaminen " + yritys);
                var q = m.Tila.Kysely.Kysymys;
                Oleta.Tosi(q.Kaari && q.Tutkimus, "laataton kohtaaminen");
                Oleta.Sama(yritys, ky.KaariYritysLuku("cee").Value.Nyt);
                ky.Vastaa(q.Oikea == 0 ? 1 : 0);
                Oleta.Sama(yritys == 2 ? (bool?)true : null, q.AarreLukittui);
                ky.Sulje();
            }
            Oleta.Tosi(ky.AarreLukittu("cee"), "lukossa");
            Oleta.Sama("cee", string.Join(",", lukitut));
            Oleta.Tosi(ky.KaariTarina("cee") == null && !ky.TehtavaTarjolla(m.Tila.Pelaaja), "ei enää tehtävää");

            // Laatallinen kohtaaminen: oikea vastaus kääntää laatan eikä kohtaamista pelata uudelleen.
            var ky2 = PieniKysely("ala", out var laatat2);
            laatat2.Laatat["cee"] = "pieniAarre";
            var m2 = ky2.Matka;
            m2.Tila.Pelaaja.Sijainti = Sijainti.KaupungissaSijainti("cee");
            m2.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(ky2.Tutki().Ok, "kohtaaminen laatalla");
            var q2 = m2.Tila.Kysely.Kysymys;
            Oleta.Tosi(q2.Kaari && !q2.Tutkimus, "laatta → ei tutkimus");
            ky2.Vastaa(q2.Oikea);
            Oleta.Sama("pieniAarre", q2.Loyto);
            Oleta.Sama(0, laatat2.Laatat.Count);
            Oleta.Tosi(ky2.KaariTarina("cee") == null, "onnistunut ei toistu");
        }

        [Testi] static void VaikeaKysymysMaksaaJaApukeinotVeloittavat()
        {
            var ky = PieniKysely("ala", out var laatat);
            laatat.Laatat["ala"] = "isoAarre";
            var m = ky.Matka;
            m.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(ky.VaikeitaTarjolla("ala") && ky.Tutki(vaikea: true).Ok, "vaikea");
            var q = m.Tila.Kysely.Kysymys;
            Oleta.Sama("ala-vaikea", q.Kysymys);
            Oleta.Tosi(ky.Vihje().Ok && !ky.Vihje().Ok, "vihje kerran");
            Oleta.Tosi(ky.Puolita().Ok && !ky.Puolita().Ok, "50:50 kerran");
            Oleta.Sama(2, q.Piilotetut.Count);
            Oleta.Tosi(!q.Piilotetut.Contains(q.Oikea), "oikea ei piiloon");
            Oleta.Tosi(!ky.Vastaa(q.Piilotetut[0]).Ok, "piilotettuun ei voi vastata");
            Oleta.Tosi(ky.Kaveriapu().Ok && !ky.Kaveriapu().Ok, "kaveriapu kerran");
            Oleta.Sama(300 - 40 - 80 - 25, m.Tila.Pelaaja.Raha);
            ky.Vastaa(q.Oikea);
            Oleta.Sama(300 - 145 + KysymysVakiot.VaikeaPalkkio, m.Tila.Pelaaja.Raha);
            Oleta.Sama(Kokemus.VaikeaVastaus, m.Tila.Pelaaja.Xp);
            Oleta.Sama("isoAarre", q.Loyto);
            Oleta.Sama(1, m.Tila.Pelaaja.Kysytty);
            Oleta.Sama(100, Kokemus.Tietoprosentti(m.Tila.Pelaaja));
        }

        [Testi] static void SaapuminenAntaaPisteetJaTasonNousun()
        {
            var ky = PieniKysely("ala", out _);
            var m = ky.Matka;
            var nousut = new List<int>();
            ky.Kokemus.TasoNousi += (_, t) => nousut.Add(t.Taso);
            m.Tila.Pelaaja.Xp = 90;
            Oleta.Tosi(m.Bussi("bee").Ok, "bussi");
            Oleta.Sama(90 + Kokemus.EnsimmainenKaupunki + Kokemus.UusiKaupunki, m.Tila.Pelaaja.Xp, "uusi lauta + uusi kaupunki");
            Oleta.Sama("2", string.Join(",", nousut));
            Oleta.Sama("bee", m.Tila.Kysely.Havainto);
            m.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(m.Bussi("ala").Ok, "takaisin");
            Oleta.Sama(160, m.Tila.Pelaaja.Xp, "ala oli aloitus → uusi kaupunki");
            m.Tila.Vaihe = Vaihe.Toiminta;
            m.Bussi("bee");
            Oleta.Sama(160, m.Tila.Pelaaja.Xp, "käyty kaupunki ei anna uudelleen");
            Oleta.Sama(1, ky.Kokemus.OtaNousut().Count);
            Oleta.Sama(0, ky.Kokemus.OtaNousut().Count, "jono tyhjenee");
        }

        [Testi] static void AvoinKysymysKulkeeTallennuksessa()
        {
            var ky = PieniKysely("ala", out var laatat);
            laatat.Laatat["ala"] = "pieniAarre";
            ky.AsetaKuvat(new[] { "bee", "cee" });
            var m = ky.Matka;
            m.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(ky.Tutki().Ok, "avaa");
            ky.Puolita();
            var json = m.Tallenna();
            var m2 = Matka.Lataa(ValeVerkko.Pieni(), json);
            Oleta.Sama(json, m2.Tallenna(), "sama teksti");
            Oleta.Sama(Vaihe.Kysymys, m2.Tila.Vaihe);
            var q1 = m.Tila.Kysely.Kysymys;
            var q2 = m2.Tila.Kysely.Kysymys;
            Oleta.Sama(string.Join("|", q1.Vaihtoehdot), string.Join("|", q2.Vaihtoehdot));
            Oleta.Sama(q1.Oikea, q2.Oikea);
            Oleta.Sama(string.Join(",", q1.Piilotetut), string.Join(",", q2.Piilotetut));
            Oleta.Sama(m.Tila.Kysely.Kaytetyt.Count, m2.Tila.Kysely.Kaytetyt.Count);
            // Versio 1 (erä 1) latautuu yhä.
            Oleta.Tosi(json.Contains("\"versio\":4"), "tallennusversio 4");
            var v1 = json.Replace("\"versio\":4", "\"versio\":1");
            v1 = v1.Substring(0, v1.IndexOf(",\"kysely\":", StringComparison.Ordinal)) + "}";
            var vanha = Pelitila.FromJson(v1);
            Oleta.Sama(0, vanha.Kysely.Kaytetyt.Count);
        }
    }
}
