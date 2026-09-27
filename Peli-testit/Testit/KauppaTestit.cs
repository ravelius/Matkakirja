// Kauppojen testit: Kaupat (Peli/Kaupat.cs).
// Kultainen jälki Kultaiset/kauppajalki.json (Kultaiset/tee-kauppajalki.mjs):
// komentolista ajetaan sellaisenaan, ja jokaisen teon tulos ja sen jälkeinen
// tila (raha, satunnaislukukutsut, laatat, tapahtumat, availableActions,
// kauppojen kirjanpito) verrataan webin jälkeen.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class KauppaTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "kauppajalki.json"))));

        static List<Dictionary<string, object>> Ajot =>
            MiniJson.Taulukko(MiniJson.Kentta(Jalki, "ajot")).Select(MiniJson.Objekti).ToList();

        static string Tiiviste(string s)
        {
            uint h = 0x811c9dc5;
            foreach (char c in s) { h ^= c; h = unchecked(h * 0x01000193); }
            return h.ToString("x8");
        }

        static string Kartta(IEnumerable<KeyValuePair<string, string>> k) => string.Join(";", k.Select(p => p.Key + "=" + p.Value));
        static string N(string s) => s ?? "null";
        static List<object> Jarj(IEnumerable<string> l) => l.OrderBy(x => x, StringComparer.Ordinal).Cast<object>().ToList();

        /// <summary>Pelin osat yhdessä: tallennuksen jälkeen kaikki luodaan uudelleen.</summary>
        sealed class Peli
        {
            public Matka M;
            public Kysely Ky;
            public Kaupat Ka;
            public readonly List<string> Tapahtumat = new List<string>();

            public void Kytke(Matka m)
            {
                M = m;
                Ky = new Kysely(m, KyselyTestit.Data);
                Ka = new Kaupat(m);
                m.Tapahtui += Kirjaa;
                Ky.Tapahtui += Kirjaa;
            }

            void Kirjaa(string laji, string teksti) =>
                Tapahtumat.Add(laji == "flight" || laji == "aid" ? laji + ":" + teksti : laji);

            public void Lataa()
            {
                var json = M.Tallenna();
                var l = Matka.Lataa(KultaisetApu.Verkko, json);
                Oleta.Sama(json, l.Tallenna(), "tallennus pysyy samana latauksen yli");
                Kytke(l);
            }
        }

        static object Tulos(KauppaTulos t, params string[] kentat)
        {
            if (!t.Ok) return new Dictionary<string, object> { ["ok"] = false, ["error"] = t.Virhe };
            var d = new Dictionary<string, object> { ["ok"] = true };
            foreach (var k in kentat)
                d[k] = k switch
                {
                    "palkittu" => (object)t.Palkittu, "uusi" => t.Uusi, "hinta" => t.Hinta, "palkkio" => t.Palkkio,
                    "found" => (object)t.Loyto, _ => throw new Exception(k),
                };
            return d;
        }

        static object Ok(TekoTulos t) => new Dictionary<string, object> { ["ok"] = t.Ok };

        /// <summary>Komento kuten skriptin suorita(); palauttaa webin paluuarvon muodon.</summary>
        static object Suorita(Peli pe, string teko, List<object> a)
        {
            var m = pe.M;
            var ka = pe.Ka;
            var p = m.Tila.Pelaaja;
            string S(int i) => a[i] as string;
            bool B(int i) => (bool)a[i];
            int I(int i) => (int)(double)a[i];
            bool On(int i) => a.Count > i;
            switch (teko)
            {
                case "raha": p.Raha = I(0); return null;
                case "siirry": p.Sijainti = Sijainti.KaupungissaSijainti(S(0)); return null;
                case "tallenna": pe.Lataa(); return null;
                case "kulttuuri":
                    return Tulos(On(2) ? ka.Kulttuuri(S(0), B(1), I(2)) : ka.Kulttuuri(S(0), B(1)), "palkittu");
                case "minitehtava":
                    return Tulos(On(3) ? ka.Minitehtava(S(0), S(1), B(2), I(3)) : ka.Minitehtava(S(0), S(1), B(2)), "palkittu");
                case "nosto": return ka.KirjaaNostotehtava();
                case "ohje": return ka.MerkitseAarrepisteOhje();
                case "pullavinkki": return Tulos(On(1) ? ka.PullaVinkki(S(0), I(1)) : ka.PullaVinkki(S(0)), "hinta");
                case "pullaostos":
                    return Tulos(On(2) ? ka.PullaOstos(S(0), I(1), S(2)) : On(1) ? ka.PullaOstos(S(0), I(1)) : ka.PullaOstos(S(0)), "hinta");
                case "pullavinkkiostettu": return ka.PullaVinkkiOstettu(S(0));
                case "pullaostettu": return ka.PullaOstettu(S(0));
                case "elaintaky": return Tulos(ka.Elaintaky(S(0), On(1) && a[1] is double d ? (int)d : (int?)null), "uusi", "palkkio");
                case "elaintakylunastettu": return ka.ElaintakyLunastettu(S(0));
                case "juliste": return Tulos(ka.MyonnaJuliste(S(0)), "uusi");
                case "mannerlento": return Tulos(ka.MannerLento(S(0)));
                case "sahke":
                    return Tulos(On(1) ? ka.AvaaAarreSahkeella(S(0), I(1)) : ka.AvaaAarreSahkeella(S(0)), "found", "palkkio");
                case "travel": return Ok(m.ValitseKulkutapa(KultaisetApu.Tavaksi(S(0))));
                case "stay": return Ok(m.ValitseKulkutapa(Kulkutapa.Pysy));
                case "roll": return Ok(m.Heita());
                case "move": return Ok(m.Liiku(m.Tila.Siirrot.Keys.OrderBy(k => k, StringComparer.Ordinal).First()));
                case "cancel": return Ok(m.PeruKulkutapa());
                case "timeout": return Ok(pe.Ky.AikaLoppui());
                case "close": return Ok(pe.Ky.Sulje());
                default: throw new Exception("tuntematon teko " + teko);
            }
        }

        /// <summary>C#-tila samoin kentin kuin skriptin tila().</summary>
        static Dictionary<string, object> Rivi(Peli pe, string teko, object args, object tulos)
        {
            var m = pe.M;
            var t = m.Tila;
            var p = t.Pelaaja;
            var q = t.Kysely.Kysymys;
            var k = t.Kaupat;
            var to = pe.Ka.Toiminnot();
            int n = p.Loydot.Count;
            var tapahtumat = pe.Tapahtumat.Cast<object>().ToList();
            pe.Tapahtumat.Clear();
            return new Dictionary<string, object>
            {
                ["teko"] = teko,
                ["args"] = args,
                ["tulos"] = tulos,
                ["vaihe"] = KyselyTestit.Web(t.Vaihe),
                ["sijainti"] = p.Sijainti.Avain,
                ["raha"] = p.Raha,
                ["turnCount"] = t.VuoroLaskuri,
                ["rngCalls"] = m.Satunnainen.Kutsuja,
                ["travelMode"] = t.Kulkutapa.HasValue ? MatkaTestit.Web(t.Kulkutapa.Value) : null,
                ["kaydyt"] = p.Kaydyt.Count,
                ["xp"] = p.Xp,
                ["nousut"] = m.Kokemus.OtaNousut().Select(x => (object)x.Taso).ToList(),
                ["tahdet"] = p.Paaaarteet,
                ["laatat"] = m.Laatat.Laatat.Count,
                ["laattaTiiviste"] = Tiiviste(Kartta(m.Laatat.Laatat)),
                ["kaannetyt"] = m.Laatat.Kaannetyt.Count,
                ["starsFound"] = m.Laatat.PaaaarteetLoydetty.Select(kv => (object)(kv.Key + "=" + kv.Value)).ToList(),
                ["viimeLoyto"] = n == 0 ? null : $"{p.Loydot[n - 1]}@{N(p.LoytoMantereet[n - 1])}/{N(p.LoytoMaat[n - 1])}",
                ["quiz"] = q == null ? null : new Dictionary<string, object>
                {
                    ["cityId"] = q.Kaupunki, ["chosen"] = q.Valittu, ["right"] = q.OikeinVastattu,
                },
                ["tapahtumat"] = tapahtumat,
                ["toiminnot"] = new Dictionary<string, object>
                {
                    ["travel"] = to.Matkat.Select(MatkaTestit.Web).Cast<object>().ToList(),
                    ["roll"] = to.Heitto,
                    ["quiz"] = to.Kysymys,
                    ["fly"] = to.Lennot.Cast<object>().ToList(),
                    ["mannerFlights"] = to.MannerLennot.Select(x => (object)$"{x.Kaupunki}/{x.Manner}/{x.Nimi}").ToList(),
                },
                ["kaupat"] = new Dictionary<string, object>
                {
                    ["kulttuuri"] = Jarj(k.KulttuuriVastatut),
                    ["minitehtavat"] = Jarj(k.MinitehtavatVastatut),
                    ["minitehtavatOikein"] = Jarj(k.MinitehtavatOikein),
                    ["nostotehtavat"] = k.NostotehtavatRatkaistu,
                    ["aarrepisteOhje"] = k.AarrepisteOhjeNahty,
                    ["pullat"] = Jarj(k.PullaVinkit),
                    ["elaintayt"] = Jarj(k.ElaintakyLunastetut),
                    ["julisteet"] = Jarj(k.Julisteet),
                },
            };
        }

        static Laattamaarat Maarat(Dictionary<string, object> ajo) =>
            new Laattamaarat(MiniJson.Taulukko(ajo["maarat"]).Select(x =>
            {
                var l = MiniJson.Taulukko(x);
                return new KeyValuePair<string, int>((string)l[0], (int)(double)l[1]);
            }));

        /// <summary>
        /// Toistaa ajon ja vertaa joka askelen. tallennaJoka = tosi: peli
        /// tallennetaan ja ladataan lisäksi JOKAISEN teon jälkeen.
        /// vikaan muuttaa uutta peliä ennen ensimmäistä vuoroa (vartijatesti).
        /// </summary>
        static int ToistaAjo(Dictionary<string, object> ajo, bool tallennaJoka, Action<Peli> vikaan = null)
        {
            var siemen = (long)(double)ajo["seed"];
            var alku = MiniJson.Teksti(ajo, "start");
            var nimi = MiniJson.Teksti(ajo, "nimi");
            var askeleet = MiniJson.Taulukko(ajo["askeleet"]).Select(MiniJson.Objekti).ToList();

            var rng = new Satunnainen(siemen);
            var m = Matka.Luo(KultaisetApu.Verkko, rng, "Fogg", alku, Maarat(ajo), MiniJson.Totuus(ajo, "pollo"));
            Oleta.Sama((long)MiniJson.Luku(ajo, "rngAlussa").Value, rng.Kutsuja, nimi + ": jaon kulutus");
            Oleta.Sama(string.Join(";", MiniJson.Taulukko(ajo["laatat"]).Cast<List<object>>().Select(l => l[0] + "=" + l[1])),
                Kartta(m.Laatat.Laatat), nimi + ": laattakartta");
            var pe = new Peli();
            pe.Kytke(m);
            vikaan?.Invoke(pe);
            m.AloitaVuoro();

            for (int i = 0; i < askeleet.Count; i++)
            {
                var odotettu = askeleet[i];
                var teko = MiniJson.Teksti(odotettu, "teko");
                var args = MiniJson.Taulukko(odotettu["args"]);
                object tulos = teko == "alku" ? null : Suorita(pe, teko, args);
                var saatu = Rivi(pe, teko, args, tulos);
                var eroja = saatu.Keys.Union(odotettu.Keys)
                    .Where(key => KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key)) != KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null))
                    .Select(key => $"\n  {key}: web {KyselyTestit.Kanoninen(MiniJson.Kentta(odotettu, key))}\n  {new string(' ', key.Length)}  C#  {KyselyTestit.Kanoninen(saatu.TryGetValue(key, out var v) ? v : null)}")
                    .ToList();
                if (eroja.Count > 0) throw new Exception($"{nimi} askel {i} ({teko} {KyselyTestit.Kanoninen(args)}):{string.Concat(eroja)}");
                if (tallennaJoka && teko != "tallenna") pe.Lataa();
            }
            return askeleet.Count;
        }

        [Testi] static void KultainenKauppajalki()
        {
            Oleta.Tosi(Ajot.Count >= 3, "ajoja");
            int yht = Ajot.Sum(a => ToistaAjo(a, false));
            Oleta.Tosi(yht > 90, "askelia " + yht);
        }

        [Testi] static void KultainenKauppajalkiTallennuksenYli()
        {
            foreach (var ajo in Ajot) ToistaAjo(ajo, true);
        }

        [Testi] static void KauppajalkiKaatuuVirheeseen()
        {
            // Vartija: valmiiksi ostettu pullavinkki, valmiiksi lunastettu
            // eläintäky ja valmiiksi löytynyt Euroopan pääaarre muuttavat
            // tuloksia, joten jokaisen ajon pitää kaatua.
            var viat = new Action<Peli>[]
            {
                pe => pe.M.Tila.Kaupat.PullaVinkit.Add("maailmankartta:pariisi"),
                pe => pe.M.Tila.Kaupat.ElaintakyLunastetut.Add("FIN"),
                pe => pe.M.Laatat.PaaaarteetLoydetty.Aseta("europe", "lontoo"),
            };
            int kaatui = 0;
            foreach (var vika in viat)
                foreach (var ajo in Ajot.Take(2))
                {
                    try { ToistaAjo(ajo, false, vika); }
                    catch (Exception) { kaatui++; break; }
                }
            Oleta.Sama(viat.Length, kaatui, "jokaisen vian pitää kaataa jokin ajo");
        }

        // --- yksikkötestit --------------------------------------------------------

        static Matka UusiPeli(long siemen = 3, string alku = "pariisi") =>
            Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", alku, KultaisetApu.Laattamaarat);

        [Testi] static void VanhaTallennusIlmanKauppojaLatautuu()
        {
            var m = UusiPeli();
            var ka = new Kaupat(m);
            ka.Kulttuuri("pariisi", true);
            ka.Minitehtava("pariisi", "kaupunki", false);
            var json = m.Tallenna();
            Oleta.Tosi(json.Contains("\"versio\":6") && json.Contains("\"kaupat\":{") && !json.Contains("voittaja"), "nykyversio kaupoin");
            // Ilman kauppakenttiä: nykyversio, vanhempi versio 3 ja versio 2.
            int a = json.IndexOf(",\"kaupat\":", StringComparison.Ordinal);
            int b = json.IndexOf(",\"laattamaailma\":", StringComparison.Ordinal);
            var ilman = json.Remove(a, b - a);
            foreach (var vanha in new[] { ilman, ilman.Replace("\"versio\":6", "\"versio\":3"), ilman.Replace("\"versio\":6", "\"versio\":2") })
            {
                var l = Matka.Lataa(KultaisetApu.Verkko, vanha, KultaisetApu.Laattamaarat);
                Oleta.Sama(0, l.Tila.Kaupat.KulttuuriVastatut.Count, "tyhjä kirjanpito");
                Oleta.Tosi(new Kaupat(l).Kulttuuri("pariisi", true).Ok, "vastattavissa uudelleen");
            }
            // Web fromJSON: puuttuva oikein-joukko = jokainen vastattu ratkaistuksi.
            var ilmanOikein = json.Replace(",\"minitehtavatOikein\":[]", "");
            Oleta.Tosi(ilmanOikein != json, "kenttä poistettiin");
            var lo = Matka.Lataa(KultaisetApu.Verkko, ilmanOikein);
            Oleta.Tosi(new Kaupat(lo).MinitehtavaRatkaistu("pariisi", "kaupunki"), "vanha vastattu = ratkaistu");
            var laskuri = json.Replace("\"nostotehtavat\":0", "\"nostotehtavat\":-3");
            Oleta.Sama(0, Matka.Lataa(KultaisetApu.Verkko, laskuri).Tila.Kaupat.NostotehtavatRatkaistu, "negatiivinen laskuri = 0");
        }

        [Testi] static void SahkePalkkioJaAvaimetKuinWeb()
        {
            // Web sahkePalkkio: Math.round(pohja × (1 − 0,25 × ohi)), ei alle nollan.
            Oleta.Sama("200,150,100,50,0,0", string.Join(",", Enumerable.Range(0, 6).Select(o => KauppaVakiot.SahkePalkkioOhilyonneista(o))));
            Oleta.Sama(113, KauppaVakiot.SahkePalkkioOhilyonneista(1, 150), "112,5 pyöristyy ylös kuten Math.round");
            Oleta.Sama("sahke:tukholma-1:vinkki", KauppaVakiot.SahkePullaAvain("tukholma-1", "vinkki"));
            Oleta.Sama("", KauppaVakiot.SahkePullaAvain(null, "linkki"));
            Oleta.Sama("Lennä Aasiaan: Tokio", KauppaVakiot.MannerlentoNappi(new MannerlentoKohde { Kaupunki = "tokio", Manner = "asia", Nimi = "Tokio" }));
            Oleta.Sama("Toiselle mantereelle: X", KauppaVakiot.MannerlentoNappi(new MannerlentoKohde { Manner = "kuu", Nimi = "X" }));
            var ka = new Kaupat(UusiPeli());
            Oleta.Sama("maailmankartta", ka.Lauta);
            ka.PullaVinkki("rooma");
            Oleta.Tosi(ka.PullaOstettu("maailmankartta:rooma") && ka.PullaVinkkiOstettu("rooma"), "sama avainavaruus");
        }

        [Testi] static void KauppasisaltoLukeeNaytteet()
        {
            var s = Kauppasisalto.Lue(
                File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "elaintayt.json")),
                File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "julisteet.json")));
            Oleta.Sama("FIN,SWE,NOR,ISL", string.Join(",", s.Elaintayt.Keys));
            Oleta.Sama("saimaannorppa", s.Elaintayt["FIN"].Elain);
            Oleta.Tosi(s.Elaintayt["FIN"].Lat > 60 && s.Elaintayt["FIN"].Kuva.EndsWith(".jpg"), "sijainti ja kuva");
            Oleta.Sama("istanbul", s.KaupunginJuliste("istanbul").Avain);
            Oleta.Tosi(s.Julisteet.ContainsKey("ateena-nike") && s.Julisteet["ateena-nike"].Kaupunki == null, "alikohde ilman kaupunkia");
            Oleta.Tosi(s.KaupunginJuliste("ateena-nike") == null && s.KaupunginJuliste("helsinki") == null, "ei kaupungin omaa");
            // Myönnetty juliste näkyy laukussa.
            var ka = new Kaupat(UusiPeli());
            Oleta.Tosi(ka.MyonnaJuliste(s.KaupunginJuliste("istanbul").Avain).Uusi && ka.JulisteLaukussa("istanbul"), "laukkuun");
        }
    }
}
