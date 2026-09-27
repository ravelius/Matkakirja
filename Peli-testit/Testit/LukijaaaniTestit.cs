// Lukijaääni (Peli/Lukijaaani.cs): Kehittäjälehden Lukijaääni-dialogin ja puhepyynnön logiikka
// kultaista jälkeä vasten (Kultaiset/lukijaaanijalki.json = tee-lukijaaanijalki.mjs: js/puhe.js,
// js/puhe-oletukset.js, js/main.js, index.html, tools/pollo/worker.js). Säilön merkkijonot,
// pyynnön runko ja kehittäjäotsake vaaditaan merkilleen samoiksi.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    static class LukijaaaniTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "lukijaaanijalki.json"))));
        static Dictionary<string, object> Vakiot => MiniJson.Objekti(Jalki["vakiot"]);

        static (Lukijaaani, Dictionary<string, string>) Uusi()
        {
            var sailo = new Dictionary<string, string>();
            var l = new Lukijaaani(k => sailo.TryGetValue(k, out var v) ? v : null, (k, v) => sailo[k] = v, k => sailo.Remove(k));
            return (l, sailo);
        }

        static double Luku(object x) => (double)x;

        [Testi] static void VakiotOvatWebin()
        {
            var v = Vakiot;
            var persoonat = MiniJson.Taulukko(v["persoonat"]).Select(MiniJson.Objekti).ToList();
            Oleta.Sama(persoonat.Count, Lukijaaani.Persoonat.Count);
            for (int i = 0; i < persoonat.Count; i++)
            {
                Oleta.Sama((string)persoonat[i]["persoona"], Lukijaaani.Persoonat[i].Persoona);
                Oleta.Sama((string)persoonat[i]["nimi"], Lukijaaani.Persoonat[i].Nimi);
            }
            Oleta.Sama(string.Join(",", MiniJson.Taulukko(v["tunnetut"])), string.Join(",", Lukijaaani.Tunnetut));
            Oleta.Sama(string.Join(",", MiniJson.Taulukko(v["aanet"])), string.Join(",", Lukijaaani.Aanivaihtoehdot));

            var oletukset = MiniJson.Objekti(v["oletukset"]);
            Oleta.Sama(3, oletukset.Count);
            foreach (var p in oletukset)
            {
                var o = MiniJson.Objekti(p.Value);
                Oleta.Sama((string)o["aani"], Lukijaaani.Oletus(p.Key).Aani, p.Key);
                Oleta.Sama((string)o["ohje"], Lukijaaani.Oletus(p.Key).Ohje, p.Key);
            }
            Oleta.Sama(Lukijaaani.Oletus("kertoja"), Lukijaaani.Oletus("vieras"), "tuntematon = kertoja");

            var naytteet = MiniJson.Objekti(v["naytteet"]);
            Oleta.Sama(3, naytteet.Count);
            foreach (var p in naytteet) Oleta.Sama((string)p.Value, Lukijaaani.NayteTeksti(p.Key), p.Key);
            Oleta.Sama(Lukijaaani.NayteTeksti("kertoja"), Lukijaaani.NayteTeksti("vieras"));

            var a = MiniJson.Objekti(v["avaimet"]);
            Oleta.Sama((string)a["asetukset"], Lukijaaani.AsetusAvain);
            Oleta.Sama((string)a["koodi"], Lukijaaani.KoodiAvain);
            Oleta.Sama((string)a["polloKoodi"], Lukijaaani.PolloKoodiAvain);
            Oleta.Sama((string)a["voima"], Lukijaaani.VoimaAvain);
            Oleta.Sama((string)a["nopeus"], Lukijaaani.NopeusAvain);
            Oleta.Sama((string)v["palvelin"], Lukijaaani.Palvelin);

            // Uusi peli ei pyyhi lukijaäänen säätöjä (main.js SAILYVAT_ASETUKSET).
            var sailyvat = MiniJson.Taulukko(v["sailyvat"]).Cast<string>().ToList();
            foreach (var k in new[] { Lukijaaani.AsetusAvain, Lukijaaani.KoodiAvain, Lukijaaani.PolloKoodiAvain, Lukijaaani.VoimaAvain, Lukijaaani.NopeusAvain })
                Oleta.Tosi(sailyvat.Contains(k), k);

            void Rajat(string nimi, double oletus, double min, double max, double askel)
            {
                var r = MiniJson.Objekti(v[nimi]);
                var liuku = MiniJson.Objekti(r["liuku"]);
                Oleta.Sama(Luku(r["oletus"]), oletus, nimi);
                Oleta.Sama(Luku(r["min"]), min, nimi);
                Oleta.Sama(Luku(r["max"]), max, nimi);
                Oleta.Sama(Luku(liuku["min"]), min, nimi + " liuku");
                Oleta.Sama(Luku(liuku["max"]), max, nimi + " liuku");
                Oleta.Sama(Luku(liuku["askel"]), askel, nimi + " askel");
            }
            var ko = MiniJson.Objekti(v["kompressori"]);
            var lk = Kompressori.Lukija();
            Oleta.Sama((float)Luku(ko["threshold"]), lk.ThresholdDb, "threshold");
            Oleta.Sama((float)Luku(ko["knee"]), lk.KneeDb, "knee");
            Oleta.Sama((float)Luku(ko["ratio"]), lk.Ratio, "ratio");
            Oleta.Sama((float)Luku(ko["attack"]), lk.AttackS, "attack");
            Oleta.Sama((float)Luku(ko["release"]), lk.ReleaseS, "release");

            Rajat("nopeus", Lukijaaani.NopeusOletus, Lukijaaani.NopeusMin, Lukijaaani.NopeusMax, Lukijaaani.NopeusAskel);
            Rajat("voima", Lukijaaani.VoimaOletus, Lukijaaani.VoimaMin, Lukijaaani.VoimaMax, Lukijaaani.VoimaAskel);
        }

        [Testi] static void JalkiToistuu()
        {
            var (l, sailo) = Uusi();
            // Webin jälki asettaa koodin localStorageen (oma avain, varalla pöllön); natiivissa sama arvo tulee
            // Keychainista (Koodilahde). Toisto lukee jäljen säilöstä samalla järjestyksellä.
            l.Koodilahde = () => sailo.TryGetValue(Lukijaaani.KoodiAvain, out var k) && !string.IsNullOrEmpty(k) ? k
                : sailo.TryGetValue(Lukijaaani.PolloKoodiAvain, out var pk) ? pk : null;
            int n = 0;
            foreach (var a in MiniJson.Taulukko(Jalki["askeleet"]).Select(MiniJson.Objekti))
            {
                string teko = (string)a["teko"];
                string kohta = $"askel {n++} {teko}";
                switch (teko)
                {
                    case "raaka":
                        if (a["arvo"] is string arvo) sailo[(string)a["avain"]] = arvo; else sailo.Remove((string)a["avain"]);
                        Oleta.Sama(Luku(a["nopeus"]), l.Nopeus, kohta + " nopeus");
                        Oleta.Sama(Luku(a["voima"]), l.Voima, kohta + " voima");
                        break;
                    case "asetaNopeus": Oleta.Sama(Luku(a["tulos"]), l.AsetaNopeus(Luku(a["arvo"])), kohta); break;
                    case "asetaVoima": Oleta.Sama(Luku(a["tulos"]), l.AsetaVoima(Luku(a["arvo"])), kohta); break;
                    case "taso":
                        Oleta.Sama(Luku(a["voima"]), l.Voima, kohta);
                        Oleta.Sama(Luku(a["tulos"]), l.LukijanTaso(Luku(a["liuku"])), kohta);
                        break;
                    case "kentat":
                    {
                        var t = MiniJson.Objekti(a["tulos"]);
                        var s = l.Asetus((string)a["persoona"]);
                        Oleta.Sama((string)t["aani"], s.Aani ?? "", kohta + " ääni");
                        Oleta.Sama((string)t["ohje"], s.Ohje ?? "", kohta + " ohje");
                        Oleta.Sama(Luku(t["nopeus"]), l.Nopeus, kohta);
                        Oleta.Sama(Luku(t["voima"]), l.Voima, kohta);
                        break;
                    }
                    case "tallenna": l.AsetaAsetus((string)a["persoona"], (string)a["aani"], (string)a["ohje"]); break;
                    case "palauta": l.PoistaAsetus((string)a["persoona"]); break;
                    case "pyynto":
                    {
                        var t = MiniJson.Objekti(a["tulos"]);
                        var (runko, koodi) = l.Pyynto(Lukijaaani.JsTrim((string)a["teksti"]), (string)a["persoona"], a["lohko"] as string);
                        Oleta.Sama((string)t["osoite"], Lukijaaani.Palvelin, kohta);
                        Oleta.Sama((string)t["runko"], runko, kohta + " runko");
                        Oleta.Sama(t["koodi"] as string, koodi, kohta + " koodi");
                        break;
                    }
                    default: throw new Exception("tuntematon teko " + teko);
                }
                foreach (var p in MiniJson.Objekti(a["sailo"]))
                    Oleta.Sama(p.Value as string, sailo.TryGetValue(p.Key, out var v) ? v : null, kohta + " säilö " + p.Key);
            }
            Oleta.Tosi(n > 70, "askeleita " + n);
        }

        [Testi] static void ValimuistiavainKuinWebin()
        {
            var (l, sailo) = Uusi();
            Oleta.Sama("kertoja||1.15|Moi.", l.Valimuistiavain("kertoja", "Moi."));
            l.AsetaNopeus(1);
            Oleta.Sama("kertoja||Moi.", l.Valimuistiavain("kertoja", "Moi."));
            l.AsetaAsetus("kertoja", "ash", " Hitaasti. ");
            Oleta.Sama("kertoja|ash|Hitaasti.|Moi.", l.Valimuistiavain("kertoja", "Moi."));
            l.AsetaNopeus(0.65);
            Oleta.Sama("kertoja|ash|Hitaasti.|0.65|Moi.", l.Valimuistiavain("kertoja", "Moi."));
            l.AsetaAsetus("pollo", "", "Vain ohje");
            Oleta.Sama("pollo||Vain ohje|0.65|Hei", l.Valimuistiavain("pollo", "Hei"));
            Oleta.Sama("{\"kertoja\":{\"aani\":\"ash\",\"ohje\":\"Hitaasti.\"},\"pollo\":{\"aani\":null,\"ohje\":\"Vain ohje\"}}", sailo[Lukijaaani.AsetusAvain]);
        }

        [Testi] static void KehittajakoodiVainLahteesta()
        {
            var (l, sailo) = Uusi();
            Oleta.Sama((string)null, l.Kehittajakoodi);
            string koodi = "P";
            l.Koodilahde = () => koodi;
            Oleta.Sama((string)null, l.Pyynto("x", "pollo", null).Koodi, "ilman säätöjä ei otsaketta");
            l.AsetaAsetus("pollo", "nova", "");
            Oleta.Sama("P", l.Pyynto("x", "pollo", null).Koodi);
            Oleta.Tosi(!sailo.ContainsKey(Lukijaaani.KoodiAvain) && !sailo.ContainsKey(Lukijaaani.PolloKoodiAvain), "koodi ei säilöön");
            koodi = "";
            Oleta.Sama((string)null, l.Kehittajakoodi, "tyhjä = ei koodia");
            // Migraatio: vanhat selväkieliset kopiot pois.
            sailo[Lukijaaani.KoodiAvain] = "T"; sailo[Lukijaaani.PolloKoodiAvain] = "Q";
            l.PoistaVanhatKoodit();
            Oleta.Tosi(!sailo.ContainsKey(Lukijaaani.KoodiAvain) && !sailo.ContainsKey(Lukijaaani.PolloKoodiAvain));
        }

        [Testi] static void MuuttuiLaukeaa()
        {
            var (l, _) = Uusi();
            int kerrat = 0;
            l.Muuttui += () => kerrat++;
            l.AsetaNopeus(1.3);
            l.AsetaVoima(1.0);
            l.AsetaAsetus("pollo", "nova", "");
            l.PoistaAsetus("pollo");
            Oleta.Sama(4, kerrat);
        }

        [Testi] static void AsetusVainTunnetullaAanella()
        {
            var (l, sailo) = Uusi();
            l.AsetaAsetus("kertoja", "tuntematon", "");
            Oleta.Sama((string)null, l.Asetus("kertoja").Aani, "dialogi näyttää oletuksen");
            Oleta.Sama("tuntematon", l.Saadot("kertoja")?.Aani, "pyyntöön kuten webissä (worker hylkää)");
            Oleta.Sama((string)null, l.Asetus("merkinnat").Ohje);
            Oleta.Tosi(l.Saadot("merkinnat") == null);
            Oleta.Sama("merkinnat", Lukijaaani.OletusLohko("merkinnat"));
            Oleta.Sama((string)null, Lukijaaani.OletusLohko("pollo"));
            Oleta.Tosi(sailo.ContainsKey(Lukijaaani.AsetusAvain));
        }

        [Testi] static void JsLukuJaParseFloat()
        {
            Oleta.Sama("1.15", Lukijaaani.JsLuku(1.15));
            Oleta.Sama("0.6000000000000001", Lukijaaani.JsLuku(0.6000000000000001));
            Oleta.Sama("2", Lukijaaani.JsLuku(2.0));
            Oleta.Sama("1000000000000000", Lukijaaani.JsLuku(1e15));
            Oleta.Sama("100000000000000000000", Lukijaaani.JsLuku(1e20));
            Oleta.Sama("1e+21", Lukijaaani.JsLuku(1e21));
            Oleta.Sama("1.5e+22", Lukijaaani.JsLuku(1.5e22));
            Oleta.Sama("0.000001", Lukijaaani.JsLuku(1e-6));
            Oleta.Sama("1e-7", Lukijaaani.JsLuku(1e-7));
            Oleta.Sama("1.25e-7", Lukijaaani.JsLuku(1.25e-7));
            Oleta.Sama("-0.25", Lukijaaani.JsLuku(-0.25));
            Oleta.Sama("123.456", Lukijaaani.JsLuku(123.456));
            Oleta.Sama(5.0, Lukijaaani.JsParseFloat("5."));
            Oleta.Sama(5000.0, Lukijaaani.JsParseFloat("5.e3"));
            Oleta.Sama(-0.5, Lukijaaani.JsParseFloat("-.5x"));
            Oleta.Sama(2.0, Lukijaaani.JsParseFloat("2e"));
            Oleta.Tosi(double.IsNaN(Lukijaaani.JsParseFloat(".")));
            Oleta.Tosi(double.IsNaN(Lukijaaani.JsParseFloat("-")));
            Oleta.Tosi(double.IsNegativeInfinity(Lukijaaani.JsParseFloat(" -Infinityx")));
        }
    
        // Luennan palat (omistaja 27.9.2026): otsikko kappaleen alkuun, kappale = pala, ei katkaisua.
        [Testi] static void LuennanPalatOtsikkoKappaleeseen()
        {
            var palat = Lukijaaani.LuennanPalat(new[] { "Eiffel-torni", "Torni valmistui 1889. Se on rautaa.", "  ", "Toinen kappale." });
            Oleta.Sama(2, palat.Count);
            Oleta.Sama("Eiffel-torni. Torni valmistui 1889. Se on rautaa.", palat[0]);
            Oleta.Sama("Toinen kappale.", palat[1]);
            // Peräkkäiset otsikot samaan kohtaan; hännän otsikko jää lukematta (web keraaKohdat).
            palat = Lukijaaani.LuennanPalat(new[] { "Osasto", "Alaotsikko", "Leipä.", "Orpo otsikko" });
            Oleta.Sama(1, palat.Count);
            Oleta.Sama("Osasto. Alaotsikko. Leipä.", palat[0]);
        }

        [Testi] static void LuennanPalatPitkaKappaleVirkerajalta()
        {
            string virke = new string('a', 30) + ".";
            string kappale = string.Join(" ", Enumerable.Repeat(virke, 10)); // 319 mrk
            var palat = Lukijaaani.LuennanPalat(new[] { kappale }, 100);
            Oleta.Sama(4, palat.Count);
            foreach (var p in palat) Oleta.Tosi(p.Length <= 100, p.Length.ToString());
            // Mitään ei pudoteta: palat yhdessä = kappale.
            Oleta.Sama(kappale, string.Join(" ", palat));
            // Oletuskatolla tavallinen kappale on yksi pala, ja katto mahtuu workerin rajaan.
            Oleta.Sama(1, Lukijaaani.LuennanPalat(new[] { kappale }).Count);
            Oleta.Tosi(Lukijaaani.PalaKatto < 2500);
        }
    }
}
