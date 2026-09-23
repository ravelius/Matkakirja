// Aarrelaattojen (Peli/Laatat.cs) testit: kultainen laattajälki
// Kultaiset/laattajalki.json, jonka verkkopelin js/game.js + js/tokens.js
// tuottivat (Kultaiset/tee-laattajalki.mjs), sekä pienet yksikkötestit.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class LaattaTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki =>
            jalki ??= MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "laattajalki.json"))));

        static IReadOnlyList<Kaupunki> Kaupungit => KultaisetApu.Verkko.KaupunkiLista;

        static Laattamaarat PaketinMaarat =>
            Laattamaarat.Lue(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "laatat.json")));

        static long Kokonais(object o) => (long)(double)o;

        /// <summary>[[a,b],…] → "a=b;…" vertailua varten.</summary>
        static string Parit(object taulukko) =>
            string.Join(";", MiniJson.Taulukko(taulukko).Select(p =>
            {
                var l = MiniJson.Taulukko(p);
                return l[0] + "=" + l[1];
            }));

        static string Parit(IEnumerable<KeyValuePair<string, string>> kv) =>
            string.Join(";", kv.Select(p => p.Key + "=" + p.Value));

        static string Lista(object taulukko) =>
            string.Join(";", MiniJson.Taulukko(taulukko).Select(x => x?.ToString() ?? "null"));

        static Laattamaarat Maarat(Dictionary<string, object> ajo) =>
            new Laattamaarat(MiniJson.Taulukko(ajo["maarat"]).Select(p =>
            {
                var l = MiniJson.Taulukko(p);
                return new KeyValuePair<string, int>((string)l[0], (int)(double)l[1]);
            }));

        [Testi] static void PaketinMaaratJarjestyksessa()
        {
            var m = PaketinMaarat;
            Oleta.Sama("star=7;mannerAarre=7;isoAarre=82;pieniAarre=170",
                string.Join(";", m.Maarat.Select(p => p.Key + "=" + p.Value)));
            Oleta.Sama(Kaupungit.Count, m.Yhteensa, "laattoja yksi per kaupunki");
        }

        [Testi] static void MaaratSisaltopaketinModuulista()
        {
            // Sisältöpaketin moduulin muoto (moduulit/js/packs/maailmankartta.json).
            var json = "{\"$skeema\":\"matkakirja-vienti/1/moduuli\",\"exportit\":{\"MAAILMANKARTTA\":{\"id\":\"maailmankartta\","
                + "\"tokens\":{\"types\":{},\"counts\":{\"star\":7,\"mannerAarre\":7,\"isoAarre\":82,\"pieniAarre\":170}}}}}";
            var m = Laattamaarat.Lue(json);
            Oleta.Sama("star=7;mannerAarre=7;isoAarre=82;pieniAarre=170",
                string.Join(";", m.Maarat.Select(p => p.Key + "=" + p.Value)));
        }

        [Testi] static void MaaratSisaltopaketinKokoelmasta()
        {
            // Kokoelma kokoelmat/laatat.json (Siirtoseppä #2944): tokens alkion data-kentässä.
            var json = "{\"$skeema\":\"matkakirja-vienti/1/kokoelma\",\"nimi\":\"laatat\",\"alkiot\":[{\"id\":\"tokens\",\"data\":"
                + "{\"types\":{},\"mannerTypes\":{},\"counts\":{\"star\":7,\"mannerAarre\":7,\"isoAarre\":82,\"pieniAarre\":170}}}]}";
            var m = Laattamaarat.Lue(json);
            Oleta.Sama("star=7;mannerAarre=7;isoAarre=82;pieniAarre=170",
                string.Join(";", m.Maarat.Select(p => p.Key + "=" + p.Value)));
        }

        [Testi] static void KultainenJalki()
        {
            int ajoja = 0, kaannoksia = 0, lukkoja = 0;
            var maarat = PaketinMaarat;
            foreach (var ajo in KultaisetApu.Lista(Jalki, "jaljet"))
            {
                var seed = (double)ajo["seed"];
                var nimi = $"siemen {seed}";
                var koe = (bool)ajo["koe"];
                var m = koe ? Maarat(ajo) : maarat;
                // Paketin laatat.json = verkkopelin pack.tokens.counts samassa järjestyksessä.
                if (!koe) Oleta.Sama(Parit(ajo["maarat"]),
                    string.Join(";", maarat.Maarat.Select(p => p.Key + "=" + p.Value)), nimi + " määrät");

                // Jako ja RNG-kutsujen määrä pelin luonnissa.
                var rng = new Satunnainen(seed);
                var maailma = Laattamaailma.Jaa(Kaupungit, m, rng);
                Oleta.Sama(Kokonais(ajo["rngJaonJalkeen"]), rng.Kutsuja, nimi + " kutsut jaon jälkeen");
                Oleta.Sama(Kokonais(ajo["rngLuonnissa"]), rng.Kutsuja, nimi + " kutsut luonnissa");
                Oleta.Sama(Parit(ajo["laatat"]), Parit(maailma.Laatat), nimi + " laattakartta");
                var tahdet = maailma.Laatat.Where(p => p.Value == Laattatyypit.Paaaarre)
                    .Select(p => new KeyValuePair<string, string>(maailma.MannerOf(p.Key), p.Key));
                Oleta.Sama(Parit(ajo["tahdet"]), Parit(tahdet), nimi + " pääaarteet");
                var mannerAarteet = maailma.Laatat.Where(p => p.Value == Laattatyypit.MannerAarre)
                    .Select(p => new KeyValuePair<string, string>(maailma.MannerOf(p.Key), p.Key));
                Oleta.Sama(Parit(ajo["mannerAarteet"]), Parit(mannerAarteet), nimi + " mantereen aarteet");

                // Käännöt: pelaajan kirjanpito kuten Matka sen tekisi.
                var alku = MiniJson.Objekti(ajo["alku"]);
                long raha = Kokonais(alku["raha"]), tahtia = Kokonais(alku["tahdet"]), xp = Kokonais(alku["xp"]);
                bool vaellus = (bool)ajo["vaellus"];
                bool polloAarteena = ajo["pollo"] != null, polloLoydetty = !polloAarteena;
                bool ennatysKirjattu = false; // web recordNoted; päivä on 1, joten bonus tulee
                var finds = new List<string>();
                var findManner = new List<string>();
                var findMaa = new List<string>();
                foreach (var k in KultaisetApu.Lista(ajo, "kaannot"))
                {
                    var kaupunki = (string)k["kaupunki"];
                    var kohta = $"{nimi} kääntö {kaupunki} #{kaannoksia}";
                    long ennen = rng.Kutsuja;
                    var l = maailma.Kaanna(kaupunki, rng, vaellus, polloAarteena && !polloLoydetty);
                    if (l != null)
                    {
                        raha += l.RahaLisays;
                        tahtia += l.TahtiLisays;
                        xp += l.TpLisays;
                        if (l.Ennatys && !ennatysKirjattu) { ennatysKirjattu = true; xp += LaattaVakiot.TpEnnatys; }
                        finds.Add(l.Tyyppi);
                        findManner.Add(l.Manner);
                        findMaa.Add(l.Maa);
                        if (l.Pollo) polloLoydetty = true;
                    }
                    Oleta.Sama((string)k["tulos"], l?.WebTulos, kohta + " tulos");
                    // Web viimeAarre asetetaan vain tavallisessa löydössä (ei pöllö, ei tyhjä).
                    long? arvo = l == null || l.Pollo ? (long?)null : l.Arvo;
                    Oleta.Sama(k["arvo"] == null ? (long?)null : Kokonais(k["arvo"]), arvo, kohta + " arvo");
                    Oleta.Sama(Kokonais(k["raha"]), raha, kohta + " raha");
                    Oleta.Sama(Kokonais(k["tahdet"]), tahtia, kohta + " tähdet");
                    Oleta.Sama(Kokonais(k["xp"]), xp, kohta + " tp");
                    Oleta.Sama(Parit(k["starsFound"]), Parit(maailma.TahdetLoydetty), kohta + " starsFound");
                    Oleta.Sama((bool)k["polloLoydetty"], polloLoydetty, kohta + " polloLoydetty");
                    Oleta.Sama(Kokonais(k["rngKaanto"]), rng.Kutsuja - ennen, kohta + " kutsuja käännössä");
                    Oleta.Sama(Kokonais(k["rngCalls"]), rng.Kutsuja, kohta + " rngCalls");
                    Oleta.Sama(Kokonais(k["laattoja"]), (long)maailma.Laatat.Count, kohta + " laattoja jäljellä");
                    kaannoksia++;
                }

                foreach (var lk in KultaisetApu.Lista(ajo, "lukot"))
                {
                    var kaupunki = (string)lk["kaupunki"];
                    long ennen = rng.Kutsuja;
                    Oleta.Sama((string)lk["tyyppi"], maailma.PoistaLukittu(kaupunki, rng), $"{nimi} lukitus {kaupunki}");
                    Oleta.Sama(Kokonais(lk["rngLukitus"]), rng.Kutsuja - ennen, $"{nimi} lukituksen kutsut {kaupunki}");
                    Oleta.Sama(Kokonais(lk["rngCalls"]), rng.Kutsuja, $"{nimi} rngCalls lukituksen jälkeen");
                    lukkoja++;
                }

                var loppu = MiniJson.Objekti(ajo["lopuksi"]);
                Oleta.Sama(Parit(loppu["laatat"]), Parit(maailma.Laatat), nimi + " laatat lopuksi (Map-järjestys)");
                Oleta.Sama(Parit(loppu["revealed"]), Parit(maailma.Kaannetyt), nimi + " revealed");
                Oleta.Sama(Lista(loppu["finds"]), string.Join(";", finds), nimi + " finds");
                Oleta.Sama(Lista(loppu["findManner"]), string.Join(";", findManner.Select(x => x ?? "null")), nimi + " findManner");
                Oleta.Sama(Lista(loppu["findMaa"]), string.Join(";", findMaa.Select(x => x ?? "null")), nimi + " findMaa");
                ajoja++;
            }
            Oleta.Sama(12, ajoja, "ajoja");
            Oleta.Sama(252, kaannoksia, "käännöksiä");
            Oleta.Sama(5, lukkoja, "lukituksia");
        }

        /// <summary>
        /// Matkajäljen rngAlussa (konstruktorin kulutus ennen ensimmäistä vuoroa)
        /// on täsmälleen laattojen jako, jonka Matka.Luo(…, Laattamaarat) tekee.
        /// </summary>
        [Testi] static void MatkajaljenAlkukulutusOnLaattajako()
        {
            var mj = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "matkajalki.json"))));
            int n = 0;
            foreach (var j in KultaisetApu.Lista(mj, "jaljet"))
            {
                var rng = new Satunnainen((double)j["seed"]);
                Laattamaailma.Jaa(Kaupungit, PaketinMaarat, rng);
                Oleta.Sama(Kokonais(j["rngAlussa"]), rng.Kutsuja, $"siemen {j["seed"]}");
                n++;
            }
            Oleta.Tosi(n > 0, "matkajäljessä ajoja");
        }

        [Testi] static void JakoPitaaSaannot()
        {
            var rng = new Satunnainen(123L);
            var w = Laattamaailma.Jaa(Kaupungit, PaketinMaarat, rng);
            Oleta.Sama(Kaupungit.Count, w.Laatat.Count);
            var mantereet = Kaupungit.Select(k => w.MannerOf(k.Id)).Distinct().ToList();
            foreach (var m in mantereet)
            {
                Oleta.Sama(1, w.Laatat.Count(p => p.Value == Laattatyypit.Paaaarre && w.MannerOf(p.Key) == m), "pääaarre " + m);
                Oleta.Sama(1, w.Laatat.Count(p => p.Value == Laattatyypit.MannerAarre && w.MannerOf(p.Key) == m), "mantereen aarre " + m);
            }
            foreach (var k in Kaupungit.Where(k => k.Aloitus))
                Oleta.Tosi(w.Laatat.Hae(k.Id) != Laattatyypit.Paaaarre, "pääaarre aloituskaupungissa " + k.Id);
        }

        [Testi] static void VaaraMaaraHeittaa()
        {
            var m = new Laattamaarat().Lisaa(Laattatyypit.PieniAarre, 3);
            try { Laattamaailma.Jaa(Kaupungit, m, new Satunnainen(1L)); }
            catch (InvalidOperationException) { return; }
            throw new Exception("pino ≠ kaupungit ei heittänyt");
        }

        [Testi] static void ArvotValeilla()
        {
            var rng = new Satunnainen(9L);
            for (int i = 0; i < 500; i++)
            {
                int p = Laattamaailma.ArvoAarteenArvo(Laattatyypit.PieniAarre, rng);
                int s = Laattamaailma.ArvoAarteenArvo(Laattatyypit.IsoAarre, rng);
                Oleta.Tosi(p >= 100 && p <= 250 && p % 10 == 0, "pieni " + p);
                Oleta.Tosi(s >= 500 && s <= 800 && s % 10 == 0, "iso " + s);
            }
            Oleta.Sama(1000L, rng.Kutsuja);
            Oleta.Sama(1000, Laattamaailma.ArvoAarteenArvo(Laattatyypit.MannerAarre, rng));
            Oleta.Sama(0, Laattamaailma.ArvoAarteenArvo(Laattatyypit.Paaaarre, rng));
            Oleta.Sama(1000L, rng.Kutsuja, "kiinteät eivät kuluta");
        }

        [Testi] static void JarjestettyKarttaKuinJsMap()
        {
            var k = new JarjestettyKartta();
            k.Aseta("a", "1"); k.Aseta("b", "2"); k.Aseta("c", "3");
            k.Aseta("a", "x");        // olemassa oleva pitää paikkansa
            k.Poista("b");
            k.Aseta("b", "4");        // poistettu palaa loppuun
            Oleta.Sama("a=x;c=3;b=4", Parit(k));
            Oleta.Sama(null, k.Hae("z"));
        }
    }
}
