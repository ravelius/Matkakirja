// Pakettivartijan testit (Pakettivartija.cs). Vain vartija: ./kaanna.sh Pakettivartija  (tai ./vartija.sh)
//
// Oletus (ei verkkoa): tuotantopaketin paikallinen kopio Kultaiset/tuotanto (uusin.json + v<N>/).
// Ympäristömuuttujat:
//   VARTIJA_HAE=1            hae tuore tuotantopaketti osoittimesta rakennus/paketit/tuotanto/-kansioon ja
//                            vartioi se; kertoo, onko paikallinen kopio vanhentunut
//   VARTIJA_PAIVITA=1        (HAE:n kanssa) kirjoita haettu paketti paikalliseksi kopioksi Kultaiset/tuotanto
//   VARTIJA_OSOITIN=<url>    osoitin (oletus https://media.matkakirja.app/sisalto/1/uusin.json)
//   VARTIJA_PAKETTI=<kansio> vartioi tämä paketti tuotannon sijaan (juuri, jossa uusin.json, tai versiokansio)
//   VARTIJA_KOE=1|<kansio>   vartioi myös koepaketti (oletus /Users/Shared/Claude/sisalto-koe)
//   VARTIJA_RAAKA_KIELLETTY=1 vaiheen 2 esikatselu: Paataso.RaakaKielletty päälle vartijan ajaksi
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class PakettivartijaTestit
    {
        static string Ymp(string nimi) => Environment.GetEnvironmentVariable(nimi) is string s && s.Length > 0 ? s : null;
        static bool Paalla(string nimi) => Ymp(nimi) is string s && s != "0";

        static string PaikallinenKopio => Path.Combine(KultaisetApu.Juuri, "Kultaiset", "tuotanto");

        static Paketti paikallinen;
        static Paketti Paikallinen => paikallinen ??= Paketti.Kansiosta(PaikallinenKopio, "tuotanto, paikallinen kopio");

        static void Vartioi(Paketti p)
        {
            bool vanha = Paataso.RaakaKielletty;
            // 2.0: paketissa ei ole raakadataa, joten se vartioidaan aina raakakiellolla (varareitti ei saa auttaa).
            bool kielto = Paalla("VARTIJA_RAAKA_KIELLETTY") || Pakettiskeema.MajorOf(p.Skeemaversio) >= 2;
            // Raakakielto koskee vain paketteja, joiden skeema lupaa täyden päätason (≥ 1.30, koepaketti v38).
            // Vanhempi paketti (tuotanto v11 = 1.10) luetaan raa'an datan varareitillä, ja se kerrotaan.
            if (kielto && !Pakettiskeema.Vahintaan(p.Skeemaversio, Pakettiskeema.PaatasoTaysi))
            {
                Console.WriteLine($"  (raakakielto ei koske pakettia {p.Nimi}: skeema {p.Skeemaversio ?? "?"} < {Pakettiskeema.PaatasoTaysi}, päätaso ei ole täysi)");
                kielto = false;
            }
            if (kielto) Paataso.RaakaKielletty = true;
            Vartijatulos t;
            try { t = Pakettivartija.Tarkista(p); }
            finally { Paataso.RaakaKielletty = vanha; }
            Pakettivartija.Tulosta(t);
            if (!t.Vihrea) throw new Exception($"pakettivartija punainen ({p.Nimi}): {t.Virheet.Count} virhettä, ensimmäinen: {t.Virheet[0]}");
        }

        /// <summary>Tuotantopaketti (paikallinen kopio tai lipulla tuore) jokaisen natiivin lukijan läpi.</summary>
        [Testi] static void Tuotantopaketti()
        {
            if (Ymp("VARTIJA_PAKETTI") is string oma) { Vartioi(Paketti.Kansiosta(oma, "VARTIJA_PAKETTI")); return; }
            if (!Paalla("VARTIJA_HAE"))
            {
                Console.WriteLine($"  (paikallinen kopio {Paikallinen.Versio}, julkaistu {MiniJson.Teksti(Paikallinen.Osoitin, "julkaistu")}; tuore: VARTIJA_HAE=1)");
                Vartioi(Paikallinen);
                return;
            }
            var osoitin = Ymp("VARTIJA_OSOITIN") ?? Pakettivartija.OsoitinOletus;
            var kohde = Paalla("VARTIJA_PAIVITA") ? PaikallinenKopio : Path.Combine(KultaisetApu.Juuri, "rakennus", "paketit", "tuotanto");
            string vanhaVersio = Directory.Exists(PaikallinenKopio) ? Paikallinen.Versio : "puuttuu";
            paikallinen = null;
            Pakettivartija.Hae(osoitin, kohde);
            var tuore = Paketti.Kansiosta(kohde, "tuotanto, haettu " + osoitin);
            if (tuore.Versio != vanhaVersio)
                Console.WriteLine(Paalla("VARTIJA_PAIVITA")
                    ? $"  PAIKALLINEN KOPIO PÄIVITETTY: {vanhaVersio} → {tuore.Versio} (Kultaiset/tuotanto, commitoi)"
                    : $"  PAIKALLINEN KOPIO VANHENTUNUT: Kultaiset/tuotanto {vanhaVersio}, tuotanto {tuore.Versio} (päivitys: VARTIJA_HAE=1 VARTIJA_PAIVITA=1)");
            else Console.WriteLine($"  paikallinen kopio ajan tasalla ({vanhaVersio})");
            Vartioi(tuore);
        }

        /// <summary>Koepaketti (Siirtosepän paikallinen, mainia uudempi) vain lipulla VARTIJA_KOE.</summary>
        [Testi] static void Koepaketti()
        {
            var koe = Ymp("VARTIJA_KOE");
            if (koe == null || koe == "0") { Console.WriteLine("  (VARTIJA_KOE ei asetettu, ohitetaan)"); return; }
            Vartioi(Paketti.Kansiosta(koe == "1" ? Pakettivartija.KoepakettiOletus : koe, "koepaketti"));
        }

        // --- vartijan omat testit (rikottu paketti muistissa) ---------------

        static string Muokkaa(string kokoelma, Action<List<Dictionary<string, object>>> muutos)
        {
            var runko = MiniJson.Objekti(MiniJson.Jasenna(Paikallinen.Teksti(kokoelma)));
            var alkiot = MiniJson.Taulukko(runko["alkiot"]).Select(MiniJson.Objekti).ToList();
            muutos(alkiot);
            runko["alkiot"] = alkiot.Cast<object>().ToList();
            var sb = new StringBuilder(); Json.Kirjoita(sb, runko);
            return sb.ToString();
        }

        static Vartijatulos Aja(Paketti p, string kokoelma) =>
            Pakettivartija.Tarkista(p, Pakettivartija.Saannot.Where(s => s.Kokoelma == kokoelma || s.Kokoelma == "kaupungit"));

        static void OletaVirhe(Vartijatulos t, string osa)
        {
            Oleta.Tosi(!t.Vihrea, "vartija ei punastunut: " + osa);
            Oleta.Tosi(t.Virheet.Any(v => v.Contains(osa)), $"virhe '{osa}' puuttuu: {string.Join(" | ", t.Virheet)}");
        }

        [Testi] static void PuuttuvaPakollinenKenttaOnPunainen()
        {
            var teksti = Muokkaa("reitit", l =>
            {
                var o = l.First(x => (string)x["laji"] == "maa");
                o.Remove("askelia");
                ((Dictionary<string, object>)o["data"]).Remove("steps");
            });
            var t = Aja(Paikallinen.Korvaa("reitit", teksti), "reitit");
            OletaVirhe(t, "puuttuu askelia");
            OletaVirhe(t, "lukija kaatui");
            var rivi = t.Rivit.First(r => r.Kokoelma == "reitit");
            Oleta.Sama(1, rivi.Hylatty, "yksi reitti hylätty");
            Oleta.Sama(rivi.Alkioita - 1, rivi.Luettu, "muut luettu");
        }

        /// <summary>Ämpärin v11 (skeema 1.10 ilman 1.10:n kenttiä): varoitus, ei virhe (Siirtoseppä 24.9.2026).</summary>
        [Testi] static void LuvattuKenttaPuuttuuOnVaroitus()
        {
            // Paikallinen kopio v11 on juuri tällainen paketti; tuoreemmalla kopiolla varoitusta ei odoteta.
            var p = Paikallinen;
            var t = Pakettivartija.Tarkista(p);
            Oleta.Tosi(t.Vihrea, "vihreä, vaikka luvattu kenttä puuttuu: " + string.Join(" | ", t.Virheet));
            foreach (var (versio, kokoelma, kentta) in Pakettivartija.LuvatutKentat)
            {
                bool odotus = Pakettiskeema.Vahintaan(p.Skeemaversio, versio) && p.Teksti(kokoelma) != null
                    && !p.Alkiot(kokoelma).Any(o => o.ContainsKey(kentta));
                Oleta.Sama(odotus, t.Varoitukset.Any(v => v.StartsWith(kokoelma + "." + kentta + " ")), $"varoitus {kokoelma}.{kentta} skeemalla {p.Skeemaversio}");
            }
            Oleta.Tosi(Pakettiskeema.Vahintaan("1.24", "1.10") && !Pakettiskeema.Vahintaan("1.9", "1.10") && !Pakettiskeema.Vahintaan("x", "1.10"), "Vahintaan");
        }

        [Testi] static void VaaraTyyppiOnPunainen()
        {
            var teksti = Muokkaa("kaupungit", l => l[0]["lat"] = "48.85");
            var t = Aja(Paikallinen.Korvaa("kaupungit", teksti), "kaupungit");
            OletaVirhe(t, "lat: odotettu luku, saatu teksti");
            var sisakkainen = Muokkaa("fokusvirrat", l =>
                ((List<object>)((Dictionary<string, object>)l.First(o => ((Dictionary<string, object>)o["data"]).ContainsKey("lehtitehtavat"))["data"])["lehtitehtavat"])
                    .Add(new Dictionary<string, object> { ["id"] = 7.0 }));
            OletaVirhe(Aja(Paikallinen.Korvaa("fokusvirrat", sisakkainen), "fokusvirrat"), "data.lehtitehtavat.*.id: odotettu teksti, saatu luku");
        }

        [Testi] static void KaksoisavainJaVierasKaupunkiOvatPunaisia()
        {
            var kaksois = Muokkaa("saapumispuheet", l => l.Add(l[0]));
            OletaVirhe(Aja(Paikallinen.Korvaa("saapumispuheet", kaksois), "saapumispuheet"), "kaksoisavain");
            var vieras = Muokkaa("kuvakysymykset", l => l[0]["kaupunki"] = "atlantis");
            OletaVirhe(Aja(Paikallinen.Korvaa("kuvakysymykset", vieras), "kuvakysymykset"), "kaupunki 'atlantis' ei ole kaupungeissa");
        }

        [Testi] static void SuodinOhittaaIlmanVirhetta()
        {
            var t = Aja(Paikallinen, "kohtaamiskuvat");
            var rivi = t.Rivit.Single(r => r.Kokoelma == "kohtaamiskuvat");
            Oleta.Tosi(t.Vihrea, string.Join(" | ", t.Virheet));
            Oleta.Sama(rivi.Alkioita, rivi.Luettu + rivi.Ohitettu, "kaikki luettu tai ohitettu");
            var saannot = Aja(Paikallinen, "saannot").Rivit.Single(r => r.Kokoelma == "saannot");
            Oleta.Sama(1, saannot.Luettu, "KATKOKUVA luettu");
            Oleta.Tosi(saannot.Ohitettu > 0, "muut säännöt ohitettu");
        }

        [Testi] static void TuntematonSkeemaversioOnPunainen()
        {
            Oleta.Tosi(Pakettiskeema.Tunnettu("1.10") && Pakettiskeema.Tunnettu("1.9") && Pakettiskeema.Tunnettu("1.1") && Pakettiskeema.Tunnettu("2.0"), "tunnetut");
            Oleta.Tosi(!Pakettiskeema.Tunnettu("1.10.0") && !Pakettiskeema.Tunnettu("x") && !Pakettiskeema.Tunnettu(null), "muoto");
            var seuraava2 = $"2.{Pakettiskeema.SuurinMinor2 + 1}";
            Oleta.Tosi(!Pakettiskeema.Tunnettu($"1.{Pakettiskeema.SuurinMinor + 1}") && !Pakettiskeema.Tunnettu(seuraava2)
                && !Pakettiskeema.Tunnettu("3.0") && !Pakettiskeema.Tunnettu("1.0") && !Pakettiskeema.Tunnettu("0.9"), "tuntemattomat");
            Oleta.Tosi(Pakettiskeema.Vahintaan("2.0", Pakettiskeema.PaatasoTaysi) && !Pakettiskeema.Vahintaan("1.29", "2.0"), "2.0 ≥ 1.30");
            foreach (var v in new[] { $"1.{Pakettiskeema.SuurinMinor + 1}", seuraava2, "3.0" })
            {
                var o = new Dictionary<string, object>(Paikallinen.Osoitin) { ["skeemaversio"] = v };
                var m = new Dictionary<string, object>(Paikallinen.Manifest) { ["skeemaversio"] = v };
                var p = new Paketti("skeema " + v, o, m, Paikallinen.Teksti);
                OletaVirhe(Pakettivartija.Tarkista(p, Pakettivartija.Saannot.Take(1)), "tuntematon skeemaversio " + v);
            }
            var runko = Muokkaa("kaupungit", l => { }).Replace("matkakirja-vienti/1/kokoelma", "matkakirja-vienti/2/kokoelma");
            OletaVirhe(Aja(Paikallinen.Korvaa("kaupungit", runko), "kaupungit"), "tuntematon $skeema");
            // 2.0-paketissa kokoelman $skeema on /2/ (ja /1/ on vieras).
            var o2 = new Dictionary<string, object>(Paikallinen.Osoitin) { ["skeemaversio"] = "2.0" };
            var p2 = new Paketti("skeema 2.0", o2, new Dictionary<string, object>(), k => k == "kaupungit" ? runko : Paikallinen.Teksti(k));
            var t2 = Pakettivartija.Tarkista(p2, Pakettivartija.Saannot.Take(1));
            Oleta.Tosi(t2.Vihrea, "2.0 + /2/kokoelma vihreä: " + string.Join(" | ", t2.Virheet));
            var p21 = new Paketti("skeema 2.0, /1/", o2, new Dictionary<string, object>(), Paikallinen.Teksti);
            OletaVirhe(Pakettivartija.Tarkista(p21, Pakettivartija.Saannot.Take(1)), "tuntematon $skeema matkakirja-vienti/1/kokoelma");
        }

        [Testi] static void KopioVastaaManifestia()
        {
            var t = Aja(Paikallinen.Korvaa("kaupungit", Paikallinen.Teksti("kaupungit") + " "), "kaupungit");
            OletaVirhe(t, "sha256 ei täsmää");
        }

        /// <summary>Äänitaulujen raidat ja pulut vertailtavana tekstinä (tyhjä kenttä näkyy tyhjänä).</summary>
        static string Raidat(AaniTaulut t) => string.Join("\n",
            t.Siirtymat.Select(r => $"siirtyma {r.Laji}/{r.Ryhma}/{r.Ampari}/{r.Oma}/{r.Voima:R}/{r.NousuMs}/{r.LaskuMs}")
                .Concat(t.Tilaraidat.Select(r => $"tila {r.Nimi}={r.Tunnus}"))
                .Concat(t.Paikkaraidat.Select(r => $"paikka {r.Key}={r.Value}"))
                .Concat(t.Raitakuvaukset.Select(r => $"kuvaus {r.Key}={r.Value}"))
                .Concat(t.Pulut.Values.Select(r => $"pulu {r.Nimi}/{r.Juuri}/{r.Tunnus}/{r.Kesto:R}/{r.Voima:R}")));

        static AaniTaulut LueAanitaulut(string json, bool kielto)
        {
            var t = new AaniTaulut();
            Paataso.RaakaKielletty = kielto;
            try { t.LueAanitaulut(json); } finally { Paataso.RaakaKielletty = false; }
            return t;
        }

        /// <summary>
        /// Skeema 1.30 (koepaketti v38): aanitaulujen siirtymä-, tila- ja paikkaraidat sekä pulut ovat
        /// päätasolla, joten raakakiellolla ne EIVÄT tyhjene (≤ 1.29: kentät vain data-oliossa → tyhjät).
        /// Aina: paikallinen kopio (v11, vain raakaa) ja siitä tehty 1.30-muoto; lipulla VARTIJA_KOE myös
        /// koepaketti, kun sen skeema ≥ Pakettiskeema.PaatasoTaysi.
        /// </summary>
        [Testi] static void AanitaulujenRaidatEivatTyhjeneRaakakiellolla()
        {
            var vanha = Paikallinen.Teksti("aanitaulut");
            var ilman = LueAanitaulut(vanha, false);
            Oleta.Tosi(ilman.Siirtymat.Count == 5 && ilman.Tilaraidat.Count == 2 && ilman.Paikkaraidat.Count == 1 && ilman.Pulut.Count == 16,
                "v11: 5 siirtymää, 2 tila-, 1 paikkaraita, 16 pulua: " + Raidat(ilman));
            // Vanha paketti raakakiellolla: rivit löytyvät, mutta kentät tyhjenevät (siksi kielto vain ≥ 1.30).
            var tyhja = LueAanitaulut(vanha, true);
            Oleta.Tosi(tyhja.Siirtymat.All(r => r.Ampari == null && r.Ryhma == null) && tyhja.Pulut.Values.All(r => r.Tunnus == null),
                "v11 raakakiellolla: kentät tyhjiä");

            // 1.30-muoto: data-olion kentät päätasolle (kuten Siirtoseppä), data jää rinnalle.
            var uusi = Muokkaa("aanitaulut", l =>
            {
                foreach (var o in l)
                    if (o.TryGetValue("data", out var d) && d is Dictionary<string, object> dd)
                        foreach (var kv in dd) if (!o.ContainsKey(kv.Key)) o[kv.Key] = kv.Value;
            });
            Oleta.Sama(Raidat(ilman), Raidat(LueAanitaulut(uusi, true)), "1.30-muoto raakakiellolla = raaka sallittuna");

            var koe = Ymp("VARTIJA_KOE");
            if (koe == null || koe == "0") return;
            var p = Paketti.Kansiosta(koe == "1" ? Pakettivartija.KoepakettiOletus : koe, "koepaketti");
            if (!Pakettiskeema.Vahintaan(p.Skeemaversio, Pakettiskeema.PaatasoTaysi))
            {
                Console.WriteLine($"  (koepaketti {p.Versio} skeema {p.Skeemaversio} < {Pakettiskeema.PaatasoTaysi}: äänitaulut vain raakana)");
                return;
            }
            var json = p.Teksti("aanitaulut");
            var sallittu = LueAanitaulut(json, false);
            var kielletty = LueAanitaulut(json, true);
            Oleta.Tosi(kielletty.Siirtymat.Count > 0 && kielletty.Tilaraidat.Count > 0 && kielletty.Paikkaraidat.Count > 0 && kielletty.Pulut.Count > 0,
                $"koepaketti {p.Versio}: raidat ja pulut luettu raakakiellolla");
            Oleta.Tosi(kielletty.Siirtymat.All(r => r.Ryhma != null && r.Ampari != null && r.Oma != null && r.Voima > 0)
                && kielletty.Tilaraidat.All(r => r.Tunnus != null) && kielletty.Paikkaraidat.Values.All(x => x != null)
                && kielletty.Pulut.Values.All(r => r.Tunnus != null && r.Juuri != null && r.Kesto > 0 && r.Voima > 0),
                $"koepaketti {p.Versio}: raakakiellolla ei tyhjiä kenttiä: " + Raidat(kielletty));
            Oleta.Sama(Raidat(sallittu), Raidat(kielletty), $"koepaketti {p.Versio}: raakakielto ei muuta raitoja");
            Console.WriteLine($"  koepaketti {p.Versio} (skeema {p.Skeemaversio}): {kielletty.Siirtymat.Count} siirtymää, {kielletty.Tilaraidat.Count} tila-, {kielletty.Paikkaraidat.Count} paikkaraitaa, {kielletty.Pulut.Count} pulua raakakiellolla");
        }

        /// <summary>Vaihe 2: Paataso.RaakaKielletty poistaa data-varareitin lukijalta ja vartijalta.</summary>
        [Testi] static void RaakaKiellettyKytkin()
        {
            const string kysymys = "{\"nimi\":\"kysymykset\",\"alkiot\":[{\"id\":\"general:0\",\"ryhma\":\"general\",%\"data\":{\"q\":\"Vanha?\",\"options\":[\"a\",\"b\"],\"correct\":1}}]}";
            var vainRaaka = kysymys.Replace("%", "");
            var paataso = kysymys.Replace("%", "\"kysymys\":\"Uusi?\",\"vaihtoehdot\":[\"c\",\"d\"],\"oikea\":0,");
            Oleta.Tosi(!Paataso.RaakaKielletty, "oletus pois");
            try
            {
                var d = new Kysymysdata(); d.LueKysymykset(vainRaaka);
                Oleta.Sama("Vanha?", d.Yleiset[0].Q, "raaka varareitti oletuksena");
                Paataso.RaakaKielletty = true;
                d = new Kysymysdata(); d.LueKysymykset(paataso);
                Oleta.Sama("Uusi?", d.Yleiset[0].Q, "päätaso");
                Oleta.Sama(0, d.Yleiset[0].Oikea, "päätason oikea");
                bool kaatui = false;
                try { new Kysymysdata().LueKysymykset(vainRaaka); } catch (FormatException) { kaatui = true; }
                Oleta.Tosi(kaatui, "raaka kielletty: data.q ei kelpaa");

                var t = Pakettivartija.Tarkista(new Paketti("raaka", Paikallinen.Osoitin, new Dictionary<string, object>(),
                    k => k == "kysymykset" ? vainRaaka : Paikallinen.Teksti(k)), Pakettivartija.Saannot.Where(s => s.Kokoelma == "kysymykset"));
                OletaVirhe(t, "vain raakadatassa: kysymys|data.q");
                t = Pakettivartija.Tarkista(new Paketti("päätaso", Paikallinen.Osoitin, new Dictionary<string, object>(),
                    k => k == "kysymykset" ? paataso : Paikallinen.Teksti(k)), Pakettivartija.Saannot.Where(s => s.Kokoelma == "kysymykset"));
                Oleta.Tosi(t.Vihrea, "päätason paketti vihreä ilman raakaa: " + string.Join(" | ", t.Virheet));
            }
            finally { Paataso.RaakaKielletty = false; }
        }
    }
}
