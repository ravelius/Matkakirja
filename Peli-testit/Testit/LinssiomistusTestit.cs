// Linssien omistuksen ja passin testit: Passi (Peli/Passi.cs) ja
// Linssiomistus (Peli/Linssiomistus.cs). Kultainen jälki
// Kultaiset/linssijalki.json (Kultaiset/tee-linssijalki.mjs): passiosan teot
// verrataan JSON-tekstiä ja stampList-järjestystä myöten, omistusajot
// (kylkiäiset, kynnykset, hyvitys, valmistuminen, kehittäjätila, toinen
// pelikerta samalla passilla) joka teon jälkeen. Seitsemän peninkulman
// linssillä ja vapaalla siirtymisellä ei ole webissä vastinetta: niille
// tavalliset testit.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class LinssiomistusTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "linssijalki.json"))));

        static List<Dictionary<string, object>> Lista(string nimi) =>
            MiniJson.Taulukko(MiniJson.Kentta(Jalki, nimi)).Select(MiniJson.Objekti).ToList();

        static DateTime KiinteaPaiva => DateTime.ParseExact(MiniJson.Teksti(Jalki, "paiva"), "yyyy-MM-dd",
            System.Globalization.CultureInfo.InvariantCulture).AddHours(12);

        static List<Linssirivi> Rekisteri(string nimi) => Lista(nimi).Select(r => new Linssirivi
        {
            Tunnus = MiniJson.Teksti(r, "tunnus"),
            Manner = MiniJson.Teksti(r, "manner"),
            Hiomassa = MiniJson.Totuus(r, "hiomassa"),
            Nimi = MiniJson.Teksti(r, "nimi"),
        }).ToList();

        static Dictionary<string, string> Taulu(string nimi) =>
            MiniJson.Objekti(Jalki[nimi]).ToDictionary(kv => kv.Key, kv => kv.Value as string);

        static void Vertaa(string otsikko, Dictionary<string, object> odotettu, Dictionary<string, object> saatu)
        {
            var eroja = saatu.Keys.Union(odotettu.Keys)
                .Where(k => KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, k)) != KyselyTestit.Kanoninen(saatu.TryGetValue(k, out var v) ? v : null))
                .Select(k => $"\n  {k}: web {KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, k))}\n  {new string(' ', k.Length)}  C#  {KyselyTestit.Kanoninen(saatu.TryGetValue(k, out var v) ? v : null)}")
                .ToList();
            if (eroja.Count > 0) throw new Exception(otsikko + ":" + string.Concat(eroja));
        }

        static List<object> Jarj(IEnumerable<string> l) => l.OrderBy(x => x, StringComparer.Ordinal).Cast<object>().ToList();

        // --- passi -------------------------------------------------------------

        static DateTime Paiva(object a)
        {
            var l = MiniJson.Taulukko(a);
            return new DateTime((int)(double)l[0], (int)(double)l[1], (int)(double)l[2], 12, 0, 0);
        }

        [Testi] static void KultainenPassijalki()
        {
            string raaka = null;                 // web localStorage.getItem(STAMP_KEY)
            Passi passi = null;
            void Avaa(Passi p) { passi = p; passi.Muuttui += () => raaka = passi.Kirjoita(); }
            Avaa(Passi.Lue(raaka));
            var askeleet = Lista("passi");
            Oleta.Tosi(askeleet.Count > 20, "passiaskelia");
            for (int i = 0; i < askeleet.Count; i++)
            {
                var o = askeleet[i];
                var teko = MiniJson.Teksti(o, "teko");
                var a = MiniJson.Taulukko(o["args"]);
                object tulos = null;
                switch (teko)
                {
                    case "alku": break;
                    case "leimaa": tulos = passi.Leimaa((string)a[0], (string)a[1], Paiva(a[2])); break;
                    case "lue": tulos = Passi.Lue(raaka).Avaimet.Cast<object>().ToList(); break;
                    case "kirjoita":
                        passi.Korvaa((a[0] as Dictionary<string, object>)?.Select(kv =>
                        {
                            var l = MiniJson.Objekti(kv.Value);
                            return new KeyValuePair<string, Leima>(kv.Key, new Leima { Nimi = MiniJson.Teksti(l, "label"), Paiva = MiniJson.Teksti(l, "date") });
                        }));
                        tulos = true;
                        break;
                    case "raaka": raaka = (string)a[0]; Avaa(Passi.Lue(raaka)); break;
                    case "tyhjenna": raaka = null; Avaa(Passi.Lue(raaka)); break;
                    case "isoDate": tulos = Passi.IsoPaiva(Paiva(a[0])); break;
                    case "stampDate": tulos = Passi.LeimaPaiva((string)a[0]); break;
                    default: throw new Exception("tuntematon passiteko " + teko);
                }
                Vertaa($"passi askel {i} ({teko} {KyselyTestit.Kanoninen(a)})", o, new Dictionary<string, object>
                {
                    ["teko"] = teko, ["args"] = a, ["tulos"] = tulos, ["raaka"] = raaka,
                    ["lista"] = passi.Lista().Select(r => (object)$"{r.Avain}={r.Nimi}@{r.Paiva}").ToList(),
                });
            }
        }

        [Testi] static void PassiLukeeOmanKirjoituksensa()
        {
            var p = new Passi { Kello = () => new DateTime(2026, 9, 23) };
            Oleta.Tosi(p.Leimaa("linssi:radio", "Maailman\"radio\"\t\u0001"), "uusi leima");
            Oleta.Tosi(!p.Leimaa("linssi:radio", "toinen"), "jo leimattu");
            p.Leimaa("maailmankartta", "Maailmankartta", new DateTime(2026, 1, 2));
            var json = p.Kirjoita();
            Oleta.Sama("{\"linssi:radio\":{\"label\":\"Maailman\\\"radio\\\"\\t\\u0001\",\"date\":\"2026-09-23\"},\"maailmankartta\":{\"label\":\"Maailmankartta\",\"date\":\"2026-01-02\"}}", json);
            var l = Passi.Lue(json);
            Oleta.Sama(json, l.Kirjoita(), "sama teksti takaisin");
            Oleta.Sama("maailmankartta,linssi:radio", string.Join(",", l.Lista().Select(r => r.Avain)), "vanhin ensin");
            Oleta.Sama(Passi.TallennusAvain, (string)MiniJson.Objekti(Jalki["vakiot"])["leimaAvain"], "web STAMP_KEY");
            Oleta.Sama("{}", Passi.Lue("[1,2]").Kirjoita(), "taulukko ei ole passi");
            Oleta.Sama("{}", Passi.Lue("{\"a\":true}").Kirjoita(), "muu kuin olio ohitetaan");
            int muutoksia = 0;
            l.Muuttui += () => muutoksia++;
            l.Leimaa("linssi:radio", "x");
            l.Leimaa("uusi", "x");
            l.Korvaa(null);
            Oleta.Sama(2, muutoksia, "vain uusi leima ja korvaus muuttavat");
        }

        // --- omistus: kultainen jälki --------------------------------------------

        /// <summary>Yhden ajon osat; tallennus ja uusi peli luovat Matkan ja Linssiomistuksen uudelleen.</summary>
        sealed class Ajo
        {
            public Passi Passi;
            public bool Kehittaja;
            public List<Linssirivi> Rekisteri;
            public Matka M;
            public Linssiomistus O;
            public readonly List<LinssiMyonto> Myonnot = new List<LinssiMyonto>();
            public readonly List<string> Tapahtumat = new List<string>();

            public void Kytke(Matka m, Linssitila tila)
            {
                M = m;
                O = new Linssiomistus(Passi, tila, Rekisteri)
                {
                    Aarteet = Taulu("aarteet"),
                    LinssinNimi = t => Taulu("nimet").TryGetValue(t, out var n) ? n : null,
                    Kehittajatila = Kehittaja,
                }.Kytke(m);
                O.Myonsi += (p, my) => Myonnot.Add(my);
                m.Tapahtui += (laji, teksti) => Tapahtumat.Add(laji + ":" + teksti);
            }

            public void Lataa()
            {
                var json = M.Tallenna();
                var tila = Linssitila.Lue(MiniJson.Objekti(MiniJson.Jasenna(O.Tila.Json())));
                Oleta.Sama(O.Tila.Json(), tila.Json(), "linssitila pysyy samana latauksen yli");
                Kytke(Matka.Lataa(KultaisetApu.Verkko, json), tila);
            }
        }

        static object Tulos(Ajo a, string teko, List<object> x)
        {
            var o = a.O;
            var p = a.M.Tila.Pelaaja;
            string S(int i) => x[i] as string;
            int I(int i) => (int)(double)x[i];
            switch (teko)
            {
                case "xp": a.M.Kokemus.Anna(p, I(0)); return null;
                case "kylkiainen":
                {
                    var m = o.Kylkiainen(p, S(0), S(1));
                    return m == null ? null : new Dictionary<string, object> { ["tunnus"] = m.Tunnus, ["hiomassa"] = m.Hiomassa, ["hyvitys"] = m.Hyvitys };
                }
                case "myonna":
                {
                    var (uusi, tunnus) = o.Myonna(p, S(0));
                    return new Dictionary<string, object> { ["uusi"] = uusi, ["tunnus"] = tunnus };
                }
                case "hyvita": return o.HyvitaHiomassa(p, S(0));
                case "nahty": return o.MerkitseNahdyksi(S(0));
                case "kaupungista": return o.LinssiKaupungista(S(0), p);
                case "kynnys": return o.TarkistaKynnys(p, I(0), I(1)).Cast<object>().ToList();
                case "omistaa": return o.Omistaa(p, S(0));
                case "hiomassa": return o.Hiomassa(S(0));
                case "hiomassaNimi": return o.HiomassaNimi(S(0));
                case "kehittaja": a.Kehittaja = o.Kehittajatila = (bool)x[0]; return null;
                case "valmistu": a.Rekisteri.First(r => r.Tunnus == S(0)).Hiomassa = false; return null;
                case "tallenna": a.Lataa(); return null;
                case "uusiPeli":
                    a.Kytke(Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(I(0)), "Fogg", S(1)), new Linssitila());
                    return null;
                default: throw new Exception("tuntematon teko " + teko);
            }
        }

        static Dictionary<string, object> Rivi(Ajo a, string teko, List<object> args, object tulos)
        {
            var p = a.M.Tila.Pelaaja;
            var o = a.O;
            var tapahtumat = a.Myonnot.Select(m => (object)new Dictionary<string, object>
            {
                ["otsikko"] = m.Otsikko, ["linssi"] = m.Tunnus, ["sub"] = m.Alaotsikko, ["tilanne"] = m.Tilanne,
                ["hiomassa"] = m.Hiomassa, ["hyvitys"] = m.Hyvitys,
            }).ToList();
            var puheet = a.Myonnot.Select(m => (object)m.Teksti).ToList();
            // Jokainen myöntö näkyy myös Matkan tapahtumana ('aid', say-rivi) kuten Kaupat.
            Oleta.Sama(string.Join("|", a.Myonnot.Select(m => "aid:" + m.Teksti)), string.Join("|", a.Tapahtumat), "Matka.Tapahtui");
            a.Myonnot.Clear();
            a.Tapahtumat.Clear();
            return new Dictionary<string, object>
            {
                ["teko"] = teko,
                ["args"] = args,
                ["tulos"] = tulos,
                ["raha"] = p.Raha,
                ["xp"] = p.Xp,
                ["linssit"] = o.Tila.Pelaajat.TryGetValue(p.Id, out var l) ? l.Cast<object>().ToList() : new List<object>(),
                ["omistetut"] = Jarj(o.Omistetut(p)),
                ["hiomassa"] = Jarj(o.HiomassaOlevat(p)),
                ["valmistuneet"] = Jarj(o.Valmistuneet(p)),
                ["passi"] = Jarj(a.Passi.Avaimet.Select(k => $"{k}={a.Passi.Leima(k).Nimi}@{a.Passi.Leima(k).Paiva}")),
                ["tapahtumat"] = tapahtumat,
                ["puheet"] = puheet,
            };
        }

        /// <summary>Toistaa kaikki ajot (passi jatkuu ajosta toiseen, ellei uusiPassi). vikaan muuttaa ajon alkua (vartija).</summary>
        static int ToistaAjot(bool tallennaJoka, Action<Ajo> vikaan = null)
        {
            Passi passi = null;
            bool kehittaja = false;
            int yht = 0;
            foreach (var ajo in Lista("ajot"))
            {
                var nimi = MiniJson.Teksti(ajo, "nimi");
                if (MiniJson.Totuus(ajo, "uusiPassi") || passi == null)
                {
                    passi = new Passi();
                    kehittaja = false;   // web localStorage.clear()
                }
                var paiva = KiinteaPaiva;
                passi.Kello = () => paiva;
                var a = new Ajo { Passi = passi, Kehittaja = kehittaja, Rekisteri = Rekisteri("koerekisteri") };
                a.Kytke(Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen((long)(double)ajo["seed"]), "Fogg",
                    MiniJson.Teksti(ajo, "start")), new Linssitila());
                vikaan?.Invoke(a);
                var askeleet = MiniJson.Taulukko(ajo["askeleet"]).Select(MiniJson.Objekti).ToList();
                for (int i = 0; i < askeleet.Count; i++)
                {
                    var o = askeleet[i];
                    var teko = MiniJson.Teksti(o, "teko");
                    var args = MiniJson.Taulukko(o["args"]);
                    var tulos = teko == "alku" ? null : Tulos(a, teko, args);
                    Vertaa($"{nimi} askel {i} ({teko} {KyselyTestit.Kanoninen(args)})", o, Rivi(a, teko, args, tulos));
                    if (tallennaJoka && teko != "tallenna" && teko != "uusiPeli") a.Lataa();
                }
                kehittaja = a.Kehittaja;
                yht += askeleet.Count;
            }
            return yht;
        }

        [Testi] static void KultainenLinssijalki()
        {
            Oleta.Tosi(ToistaAjot(false) > 60, "askelia");
        }

        [Testi] static void KultainenLinssijalkiTallennuksenYli() => ToistaAjot(true);

        [Testi] static void LinssijalkiKaatuuVirheeseen()
        {
            // Vartija: valmiiksi leimattu linssi, maksettu hyvitys, kehittäjätila ja
            // väärä kynnyssääntö muuttavat tuloksia, joten jokaisen pitää kaataa ajo.
            var viat = new Action<Ajo>[]
            {
                a => a.Passi.Leimaa("linssi:topografia", "Topografialinssi"),
                a => a.Passi.Leimaa("hyvitys:yokartta", "x"),
                a => a.O.Kehittajatila = true,
                a => a.O.Kynnyssaanto = (omat, e, j) => j >= 300 && e < 300 ? new[] { "radio" } : Array.Empty<string>(),
                a => a.O.Aarteet = new Dictionary<string, string>(),
            };
            int kaatui = 0;
            foreach (var vika in viat)
            {
                try { ToistaAjot(false, vika); }
                catch (Exception) { kaatui++; }
            }
            Oleta.Sama(viat.Length, kaatui, "jokaisen vian pitää kaataa jälki");
        }

        [Testi] static void RekisteriJaVakiotKuinWeb()
        {
            string Rivit(IEnumerable<Linssirivi> l) => string.Join(";", l.Select(r => $"{r.Tunnus}/{r.Manner}/{r.Hiomassa}/{r.Nimi}"));
            Oleta.Sama(Rivit(Rekisteri("rekisteri")), Rivit(Linssiomistus.Oletusrekisteri), "oletusrekisteri = webin LINSSIT");
            var v = MiniJson.Objekti(Jalki["vakiot"]);
            Oleta.Sama(MiniJson.Teksti(v, "leimaEtuliite"), Linssiomistus.LeimaEtuliite);
            Oleta.Sama(MiniJson.Teksti(v, "hyvitysEtuliite"), Linssiomistus.HyvitysEtuliite);
            Oleta.Sama(MiniJson.Teksti(v, "nahtyEtuliite"), Linssiomistus.NahtyEtuliite);
            Oleta.Sama((int)MiniJson.Luku(v, "optikonHyvitys").Value, Linssiomistus.OptikonHyvitys);
            Oleta.Sama(KyselyTestit.Kanoninen(v["kynnykset"]), KyselyTestit.Kanoninen(Linssiomistus.Kynnykset.ToList()));
            Oleta.Sama(KyselyTestit.Kanoninen(v["peruslinssit"]), KyselyTestit.Kanoninen(Linssiomistus.Peruslinssit.ToList()));
            Oleta.Sama(0, Linssiomistus.Oletusaarteet.Count, "tuotannon aarretaulu on tyhjä");
            var o = new Linssiomistus(new Passi(), null, Rekisteri("koerekisteri"));
            Oleta.Sama(KyselyTestit.Kanoninen(Jalki["laattamantereet"]), KyselyTestit.Kanoninen(o.Laattamantereet()));
        }

        // --- yksikkötestit ----------------------------------------------------------

        static Matka UusiPeli(long siemen = 3, string alku = "pariisi") =>
            Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", alku, KultaisetApu.Laattamaarat);

        [Testi] static void LinssitilaTallennusJaVanhaMuoto()
        {
            var t = new Linssitila();
            t.Linssit(0).AddRange(new[] { "radio", "topografia" });
            t.Linssit(2).Add("pallo");
            t.Linssit(1);   // tyhjä lista ei tallennu
            Oleta.Sama("{\"0\":[\"radio\",\"topografia\"],\"2\":[\"pallo\"]}", t.Json());
            Oleta.Sama(t.Json(), Linssitila.Lue(MiniJson.Objekti(MiniJson.Jasenna(t.Json()))).Json());
            Oleta.Sama("{}", Linssitila.Lue(null).Json(), "puuttuva kenttä = tyhjä");
            Oleta.Sama("{\"0\":[\"a\"]}", Linssitila.Lue(MiniJson.Objekti(MiniJson.Jasenna("{\"0\":[\"a\",\"a\",3],\"x\":[\"b\"],\"1\":\"c\"}"))).Json(), "roskat ohitetaan");
        }

        [Testi] static void KynnyssaantoVaihdettavissa()
        {
            // Omistajan sääntö (Linssiseppä, Linssirekisteri.Kynnys): 1400 antaa radion JA topografian.
            IReadOnlyList<string> Omistajan(IEnumerable<string> omat, int ennen, int jalkeen)
            {
                var taulu = new (int Raja, string[] Linssit)[]
                {
                    (400, new[] { "ihmisen-matka" }), (800, new[] { "keksinnot" }),
                    (1400, new[] { "radio", "topografia" }), (2200, new[] { "satelliitti" }),
                };
                var o = new HashSet<string>(omat);
                return taulu.Where(k => ennen < k.Raja && jalkeen >= k.Raja).SelectMany(k => k.Linssit).Where(o.Add).ToList();
            }
            var m = UusiPeli();
            var om = new Linssiomistus(new Passi()) { Kynnyssaanto = Omistajan }.Kytke(m);
            var saadut = new List<string>();
            om.Myonsi += (p, my) => saadut.Add(my.Tunnus);
            m.Kokemus.Anna(m.Tila.Pelaaja, 1400);
            Oleta.Sama("ihmisen-matka,keksinnot,radio,topografia", string.Join(",", saadut));
            Oleta.Tosi(om.Omistaa("topografia") && !om.Omistaa("satelliitti"), "omistus");
            // Tuntematon tunnus säännöltä ohitetaan (ei rekisterissä → ei myöntöä).
            om.Kynnyssaanto = (o, e, j) => new[] { "olematon", "satelliitti" };
            Oleta.Sama("satelliitti", string.Join(",", om.TarkistaKynnys(m.Tila.Pelaaja, 0, 1)));
            // Webin sääntö antaa 1400:lla vain radion (topografia on mannerlinssi).
            var w = new Linssiomistus(new Passi());
            Oleta.Sama("ihmisen-matka,keksinnot,radio", string.Join(",", w.WebKynnys(new[] { "pallo" }, 0, 1400)));
        }

        [Testi] static void OmistaaIlmanMatkaaJaKoukut()
        {
            var passi = new Passi();
            var o = new Linssiomistus(passi);
            Oleta.Tosi(o.Omistaa("pallo") && !o.Omistaa("radio") && !o.Omistaa(null) && !o.Omistaa(""), "peruslinssi ilman matkaa");
            passi.Leimaa("linssi:radio", "Maailmanradio");
            Oleta.Tosi(o.Omistaa("radio"), "passista");
            Func<string, bool> koukku = o.Omistaa;   // Linssirekisteri.Omistaa-kenttään sopiva muoto
            Oleta.Tosi(koukku("radio"), "koukku");
            Oleta.Tosi(o.Ostettavissa("topografia") && !o.Ostettavissa("radio") && !o.Ostettavissa("olematon"), "ostettavissa");
            // Kytkentä: ison aarteen kylkiäinen Matkan koukusta.
            var m = UusiPeli();
            var om = new Linssiomistus(passi) { Aarteet = new Dictionary<string, string> { ["pariisi"] = "topografia" } }.Kytke(m);
            m.LinssiKylkiaisena(m.Tila.Pelaaja, "pariisi", Laattatyypit.IsoAarre);
            Oleta.Tosi(om.Omistaa("topografia") && passi.Leima("linssi:topografia").Nimi == "topografia", "leima tunnuksella ilman nimikoukkua");
        }

        /// <summary>Kääntää pelaajalle n pääaarretta (laattamaailman ensimmäiset).</summary>
        static List<Loyto> KaannaPaaaarteet(Matka m, int n) =>
            m.Laatat.Laatat.Where(kv => kv.Value == Laattatyypit.Paaaarre).Select(kv => kv.Key).Take(n).ToList()
                .Select(m.KaannaLaatta).ToList();

        [Testi] static void PeninkulmaSeitsemannestaPaaaarteesta()
        {
            var passi = new Passi();
            var m = UusiPeli();
            var om = new Linssiomistus(passi).Kytke(m);
            var myonnot = new List<LinssiMyonto>();
            om.Myonsi += (p, my) => myonnot.Add(my);
            KaannaPaaaarteet(m, 6);
            Oleta.Sama(6, Linssiomistus.Paaaarteita(m.Tila.Pelaaja));
            Oleta.Tosi(!om.Omistaa(Linssiomistus.Peninkulma) && !om.Omistaa("radio"), "kuusi ei riitä");
            KaannaPaaaarteet(m, 1);
            // Seitsemän pääaarretta + ennätys = 900 tp: kynnyslinssit 400 ja 800 ennen peninkulmaa.
            Oleta.Sama("ihmisen-matka,keksinnot,peninkulma", string.Join(",", myonnot.Select(x => x.Tunnus)), "seitsemäs antaa linssin");
            Oleta.Sama("peli.linssi.peninkulma", myonnot.Last().Tilanne);
            Oleta.Tosi(passi.Leimattu("linssi:peninkulma"), "passissa");
            // Kaikki linssit auki, myös hiomassa-, tuntemattomat ja Linssisepän omat tunnukset.
            Oleta.Tosi(om.Omistaa("radio") && om.Omistaa("topografia") && om.Omistaa("isoisa-1873"), "kaikki auki");
            Oleta.Tosi(Linssiomistus.Oletusrekisteri.All(r => om.Omistetut().Contains(r.Tunnus)), "omistetut = koko rekisteri");
            Oleta.Tosi(!om.Ostettavissa(Linssiomistus.Peninkulma) && !om.Ostettavissa("radio"), "ei ostettavissa");
            Oleta.Sama(null, om.Myonna(m.Tila.Pelaaja, Linssiomistus.Peninkulma).Tunnus, "ei myönnettävissä muuten");
            Oleta.Sama(0, om.TarkistaKynnys(m.Tila.Pelaaja, 0, 9000).Count, "kynnyksillä ei annettavaa");
            // Kerran: uusi tarkistus ei anna uudestaan.
            Oleta.Tosi(om.TarkistaPeninkulma() == null, "vain kerran");
            // Tallennus: pelikerran lista kulkee Linssitilassa, passi erikseen.
            var tila = Linssitila.Lue(MiniJson.Objekti(MiniJson.Jasenna(om.Tila.Json())));
            Oleta.Tosi(tila.Linssit(0).Contains(Linssiomistus.Peninkulma), "linssitilassa");
            var ladattu = new Linssiomistus(new Passi(), tila).Kytke(Matka.Lataa(KultaisetApu.Verkko, m.Tallenna()));
            Oleta.Tosi(ladattu.Omistaa("vesistot") && ladattu.VapaaSiirtyminenKaytettavissa(), "ladattu peli ilman passia");
            // Uusi peli samalla passilla (Fable 23.9.): leima pitää linssit auki, mutta vapaa siirtyminen
            // on vain pelissä, jossa se ansaittiin; uudessa pelissä se ansaitaan uudelleen.
            var uusi = new Linssiomistus(passi).Kytke(UusiPeli(9));
            Oleta.Tosi(uusi.Omistaa("radio") && !uusi.VapaaSiirtyminenKaytettavissa(), "passista uuteen peliin: linssit auki, ei vapaata siirtymistä");
        }

        [Testi] static void PeninkulmaVainEnintaan80Paivassa()
        {
            // Päivä 80 kelpaa, 81 ei.
            foreach (var (paiva, saa) in new[] { (80, true), (81, false) })
            {
                var m = UusiPeli();
                while (m.Tila.Paiva() < paiva) m.Tila.VuoroLaskuri++;
                Oleta.Sama(paiva, m.Tila.Paiva());
                var om = new Linssiomistus(new Passi()).Kytke(m);
                KaannaPaaaarteet(m, 7);
                Oleta.Sama(saa, om.Omistaa(Linssiomistus.Peninkulma), "päivä " + paiva);
            }
            // Muu kuin pääaarre ei laukaise tarkistusta, vaikka pääaarteita olisi seitsemän.
            var m2 = UusiPeli(5);
            var o2 = new Linssiomistus(new Passi()).Kytke(m2);
            m2.Tila.Pelaaja.Loydot.AddRange(Enumerable.Repeat(Laattatyypit.Paaaarre, 7));
            m2.KaannaLaatta(m2.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.PieniAarre).Key);
            Oleta.Tosi(!o2.Omistaa(Linssiomistus.Peninkulma), "pieni aarre ei myönnä");
            Oleta.Sama(Linssiomistus.Peninkulma, o2.TarkistaPeninkulma()?.Tunnus, "suora tarkistus myöntää");
        }

        [Testi] static void VapaaSiirtyminen()
        {
            var passi = new Passi();
            var m = UusiPeli(3, "pariisi");
            var om = new Linssiomistus(passi).Kytke(m);
            var p = m.Tila.Pelaaja;
            var kohde = KultaisetApu.Verkko.KaupunkiLista.First(k => k.Id != "pariisi" && k.Manner != "europe" && !p.Kaydyt.Contains(k.Id)).Id;
            Oleta.Sama("Seitsemän peninkulman linssiä ei ole tässä pelissä", om.VapaaSiirtyminen(kohde).Virhe);
            Oleta.Tosi(!om.VapaaSiirtyminenKaytettavissa(), "ei linssiä");
            passi.Leimaa("linssi:peninkulma", Linssiomistus.PeninkulmaNimi);
            Oleta.Tosi(!om.VapaaSiirtyminenKaytettavissa(), "pelkkä passin leima ei riitä (ansaitaan pelissä)");
            om.Tila.Linssit(p.Id).Add(Linssiomistus.Peninkulma);
            Oleta.Tosi(om.VapaaSiirtyminenKaytettavissa(), "ansaittu tässä pelissä");
            Oleta.Sama("Tuntematon kaupunki", om.VapaaSiirtyminen("olematon").Virhe);
            Oleta.Sama("Tuntematon kaupunki", om.VapaaSiirtyminen(null).Virhe);
            Oleta.Sama("Olet jo täällä", om.VapaaSiirtyminen("pariisi").Virhe);
            // Väärä vaihe: noppa heitetty (Siirto); ennen heittoa (Heitto) siirtyminen käy.
            if (m.Tila.Vaihe == Vaihe.Toiminta) m.ValitseKulkutapa(m.Kulkutavat().First(t => t != Kulkutapa.Bussi && t != Kulkutapa.Pysy));
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe);
            Oleta.Tosi(om.VapaaSiirtyminenKaytettavissa(), "ennen heittoa");
            var tallessa = m.Tallenna();
            m.Heita();
            Oleta.Sama(Vaihe.Siirto, m.Tila.Vaihe, "heitetty");
            Oleta.Sama("Väärä vaihe", om.VapaaSiirtyminen(kohde).Virhe);
            Oleta.Tosi(!om.VapaaSiirtyminenKaytettavissa(), "heiton jälkeen ei");
            m = Matka.Lataa(KultaisetApu.Verkko, tallessa);
            om = new Linssiomistus(passi, om.Tila).Kytke(m);
            p = m.Tila.Pelaaja;

            var tapahtumat = new List<string>();
            var saapumiset = new List<string>();
            m.Tapahtui += (laji, teksti) => tapahtumat.Add(laji + ":" + teksti);
            m.Saapui += (pl, k, uusiK) => saapumiset.Add(k + "/" + uusiK);
            int raha = p.Raha, vuoro = m.Tila.VuoroLaskuri, xp = p.Xp;
            long arvontoja = m.Satunnainen.Kutsuja;
            var r = om.VapaaSiirtyminen(kohde);
            Oleta.Tosi(r.Ok && r.Noppa == null, "onnistui ilman noppaa");
            Oleta.Sama("c:" + kohde, p.Sijainti.Avain);
            Oleta.Sama(raha, p.Raha, "hinta 0");
            Oleta.Sama(vuoro + 1, m.Tila.VuoroLaskuri, "vie vuoron (aika kuluu)");
            Oleta.Sama(arvontoja, m.Satunnainen.Kutsuja, "ei arvontaa");
            Oleta.Sama(kohde + "/True", string.Join(",", saapumiset), "saapuminen kuten lento");
            // Laudan ensimmäinen käynti: +50 (uusi lauta) ja +10 (uusi kaupunki), kuten lennossa.
            Oleta.Tosi(p.Kaydyt.Contains(kohde) && p.Xp == xp + Kokemus.EnsimmainenKaupunki + Kokemus.UusiKaupunki, "käynti ja tietäjäpisteet " + (p.Xp - xp));
            Oleta.Tosi(tapahtumat.Any(t => t.StartsWith("peninkulma:", StringComparison.Ordinal)), "tapahtuma");
            Oleta.Tosi(m.Tila.Noppa == null && m.Tila.Vaihe != Vaihe.Siirto, "uusi vuoro alkoi");

            // Pysähdys saapuessa (Kysely offerQuiz): vuoro ei pääty.
            m.PysaytaSaapuessa = _ => true;
            vuoro = m.Tila.VuoroLaskuri;
            Oleta.Tosi(om.VapaaSiirtyminen("pariisi").Ok, "takaisin");
            Oleta.Sama(vuoro, m.Tila.VuoroLaskuri, "pysähdys pitää vuoron");
            Oleta.Tosi(m.Tila.Vaihe == Vaihe.Toiminta && m.Tila.Kulkutapa == null && !m.Tila.AutoMatka, "esivalinta purettu");
            m.PysaytaSaapuessa = null;

            // Reitin varrelta: lähtö kesken matkan.
            var reitti = KultaisetApu.Verkko.Reitit.Values.First(x => x.Askeleet > 1);
            p.Sijainti = Sijainti.ReitillaSijainti(reitti.Id, 1);
            m.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(om.VapaaSiirtyminen(kohde).Ok && p.Sijainti.Avain == "c:" + kohde, "reitiltä");
            // Tallennus latautuu normaalisti siirtymän jälkeen.
            var l = Matka.Lataa(KultaisetApu.Verkko, m.Tallenna());
            Oleta.Sama("c:" + kohde, l.Tila.Pelaaja.Sijainti.Avain);
        }
    }
}
