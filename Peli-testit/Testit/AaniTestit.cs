// Musiikki ja äänimaisema (Assets/Matkakirja/Peli/Aani/) webin kultaista jälkeä vasten
// (Kultaiset/aanijalki.json = tee-aanijalki.mjs: musiikkivalitsin, kaupunkimusiikki, media,
// aani-ehdokkaat, ambience-stream, siirtymamusiikki ja ui.js:n aarreaihe tynkä-Audiolla) sekä
// paketin kokoelma aanitaulut (Kultaiset/paketti/aanitaulut.json, Siirtosepän koepaketti v30).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    static class AaniTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "aanijalki.json"))));

        static List<object> L(object o) => MiniJson.Taulukko(o);
        static Dictionary<string, object> O(object o) => MiniJson.Objekti(o);
        static Dictionary<string, object> V => O(Jalki["vakiot"]);
        static List<string> Tekstit(object o) => o == null ? null : L(o).Select(x => x as string).ToList();
        static string Yhdista(IEnumerable<string> l) => l == null ? "null" : "[" + string.Join("|", l) + "]";

        static void Lahella(double odotettu, double saatu, string viesti)
        {
            if (odotettu == saatu) return;
            if (Math.Abs(odotettu - saatu) <= 1e-12 * Math.Max(1, Math.Abs(odotettu))) return;
            throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} {viesti}");
        }

        /// <summary>Oletustaulut + jäljen kaupunkikohtainen data (maat, tyypit, KAUPUNKI_EHDOKKAAT).</summary>
        static AaniTaulut Taulut(bool paketinKorit = false)
        {
            var t = AaniTaulut.Oletus();
            foreach (var r in L(V["kaupungit"]).Select(L))
            {
                var id = (string)r[0];
                if (r[1] is string tyyppi) t.Tyypit[id] = tyyppi;
                if (r[2] is string maa) t.Maat[id] = maa;
            }
            t.LueKaupunkiEhdokkaat(O(V["kaupunkiEhdokkaat"]));
            if (paketinKorit) t.LueAanitaulut(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "aanitaulut.json")));
            return t;
        }

        // =====================================================================
        // VAKIOT JA TAULUT
        // =====================================================================

        [Testi] static void VakiotJaTaulutKutenWeb()
        {
            var t = AaniTaulut.Oletus();
            Oleta.Sama(MiniJson.Teksti(V, "aaniJuuri"), AaniOsoite.Juuri);
            Oleta.Sama(MiniJson.Teksti(V, "musiikinPaate"), t.MusiikinPaate);
            Oleta.Sama(MiniJson.Teksti(V, "pohjaraita"), t.Pohjaraita);
            Oleta.Sama(Yhdista(L(V["tilaraidat"]).Select(O).Select(o => MiniJson.Teksti(o, "nimi") + "=" + MiniJson.Teksti(o, "tunnus"))),
                Yhdista(t.Tilaraidat.Select(r => r.Nimi + "=" + r.Tunnus)), "tilaraidat");
            Oleta.Sama(Yhdista(L(V["paikkaraidat"]).Select(O).Select(o => MiniJson.Teksti(o, "nimi") + "=" + MiniJson.Teksti(o, "tunnus"))),
                Yhdista(t.Paikkaraidat.Select(r => r.Key + "=" + r.Value)), "paikkaraidat");
            Oleta.Sama(Yhdista(Tekstit(V["kaupunkiraidat"])), Yhdista(t.Kaupunkiraidat), "kaupunkiraidat");
            Oleta.Sama(Yhdista(O(V["kaupunginAlue"]).Select(p => p.Key + "=" + p.Value)), Yhdista(t.KaupunginAlue.Select(p => p.Key + "=" + p.Value)));
            Oleta.Sama(Yhdista(Tekstit(V["alueraidat"])), Yhdista(t.Alueraidat), "alueraidat");
            Oleta.Sama(Yhdista(O(V["alueenMaat"]).Select(p => p.Key + "=" + p.Value)), Yhdista(t.AlueenMaat.Select(p => p.Key + "=" + p.Value)));
            Oleta.Sama(MiniJson.Luku(V, "musiikinPerustaso"), AaniVakiot.MusiikinPerustaso);
            Oleta.Sama(MiniJson.Luku(V, "musiikinKayra"), AaniVakiot.MusiikinKayra);
            Oleta.Sama(MiniJson.Luku(V, "musiikinKatto"), AaniVakiot.MusiikinKatto);
            Oleta.Sama(MiniJson.Luku(V, "musiikinLiukuOletus"), (double)AaniVakiot.LiukuOletus);
            var raidat = L(V["siirtymaRaidat"]).Select(O).ToList();
            Oleta.Sama(raidat.Count, t.Siirtymat.Count, "siirtymäraitoja");
            for (int i = 0; i < raidat.Count; i++)
            {
                var w = raidat[i];
                var c = t.Siirtymat[i];
                Oleta.Sama(MiniJson.Teksti(w, "laji"), c.Laji);
                Oleta.Sama(MiniJson.Teksti(w, "ryhma"), c.Ryhma, c.Laji);
                Oleta.Sama(MiniJson.Teksti(w, "ampari"), c.Ampari, c.Laji);
                Oleta.Sama(MiniJson.Teksti(w, "oma"), c.Oma, c.Laji);
                Oleta.Sama(MiniJson.Luku(w, "voima"), c.Voima, c.Laji);
                Oleta.Sama((int)(MiniJson.Luku(w, "nousuMs") ?? AaniVakiot.SiirtymaNousuMs), c.NousuMs, c.Laji);
                Oleta.Sama((int)(MiniJson.Luku(w, "laskuMs") ?? AaniVakiot.SiirtymaLaskuMs), c.LaskuMs, c.Laji);
            }
            Oleta.Sama(MiniJson.Teksti(V, "visaOletus"), t.VisaOletus);
            var aarre = O(V["aarreMusiikki"]);
            Oleta.Sama(MiniJson.Teksti(aarre, "tavallinen"), t.AarreTavallinen);
            Oleta.Sama(MiniJson.Teksti(aarre, "paa"), t.AarrePaa);
            Oleta.Sama(Yhdista(Tekstit(V["aarretyypit"])), Yhdista(t.Aarretyypit));
            Oleta.Sama(Yhdista(Tekstit(V["vakiopaikat"])), Yhdista(t.Vakiopaikat));
            Oleta.Sama(Yhdista(O(V["yhdistetyt"]).Select(p => p.Key + "=" + Yhdista(Tekstit(p.Value)))),
                Yhdista(t.Yhdistetyt.Select(p => p.Key + "=" + Yhdista(p.Value))), "YHDISTETYT");
            Oleta.Sama(Yhdista(O(V["oletuskorit"]).Select(p => p.Key + "=" + Yhdista(Tekstit(p.Value)))),
                Yhdista(t.Oletuskorit.Select(p => p.Key + "=" + Yhdista(p.Value))), "OLETUSKORIT");
            Oleta.Sama((float)MiniJson.Luku(V, "master").Value, Tehostetaulu.Master, "MASTER_PERUSTASO");
        }

        [Testi] static void PaketinAanitaulutKutenWeb()
        {
            // Siirtosepän koepaketti v30 (skeema 1.24): siirtymä-, tila-, paikka- ja pohjaraidat sekä
            // aarreaiheet ovat samat kuin C#:n oletus, ja musiikkiketju-rivit = Ketju(∅).
            var oletus = AaniTaulut.Oletus();
            var t = AaniTaulut.Oletus();
            var korit = t.LueAanitaulut(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "aanitaulut.json")));
            Oleta.Sama(270, korit, "maisemakori-rivejä (266 kaupunkia + 4 virtuaalipaikkaa)");
            Oleta.Sama(Yhdista(oletus.Tilaraidat.Select(r => r.Nimi + "=" + r.Tunnus)), Yhdista(t.Tilaraidat.Select(r => r.Nimi + "=" + r.Tunnus)));
            Oleta.Sama(Yhdista(oletus.Paikkaraidat.Select(r => r.Key + "=" + r.Value)), Yhdista(t.Paikkaraidat.Select(r => r.Key + "=" + r.Value)));
            Oleta.Sama(oletus.Pohjaraita, t.Pohjaraita);
            Oleta.Sama(oletus.AarreTavallinen, t.AarreTavallinen);
            Oleta.Sama(oletus.AarrePaa, t.AarrePaa);
            Oleta.Sama(Yhdista(oletus.Vakiopaikat), Yhdista(t.Vakiopaikat));
            Oleta.Sama(Yhdista(oletus.Siirtymat.Select(r => $"{r.Laji}/{r.Ryhma}/{r.Ampari}/{r.Oma}/{r.Voima:R}/{r.NousuMs}/{r.LaskuMs}")),
                Yhdista(t.Siirtymat.Select(r => $"{r.Laji}/{r.Ryhma}/{r.Ampari}/{r.Oma}/{r.Voima:R}/{r.NousuMs}/{r.LaskuMs}")), "siirtymäraidat");
            var valitsin = new Musiikkivalitsin(oletus);
            var paketti = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "aanitaulut.json"))));
            var maat = Taulut().Maat;
            int ketjuja = 0;
            foreach (var o in L(paketti["alkiot"]).Select(O).Where(o => MiniJson.Teksti(o, "laji") == "musiikkiketju"))
            {
                var k = MiniJson.Teksti(o, "kaupunki");
                maat.TryGetValue(k, out var maa);
                Oleta.Sama(Yhdista(Tekstit(o["ketju"])), Yhdista(valitsin.Ketju(null, k, maa)), k);
                ketjuja++;
            }
            Oleta.Sama(266, ketjuja, "musiikkiketjuja");
        }

        // =====================================================================
        // JÄLJET 1–4: VALITSIN JA TASO
        // =====================================================================

        [Testi] static void KetjutKutenWeb()
        {
            var valitsin = new Musiikkivalitsin(AaniTaulut.Oletus());
            int n = 0;
            foreach (var joukko in L(Jalki["ketjut"]).Select(O))
            {
                var tilat = Tekstit(joukko["tilat"]);
                foreach (var r in L(joukko["rivit"]).Select(L))
                {
                    var ketju = valitsin.Ketju(tilat, r[0] as string, r[1] as string);
                    Oleta.Sama(Yhdista(Tekstit(r[2])), Yhdista(ketju), $"{Yhdista(tilat)} {r[0]} {r[1]}");
                    n++;
                }
            }
            Oleta.Tosi(n > 1300, "ketjuja " + n);
        }

        [Testi] static void ValinnatKutenWeb()
        {
            foreach (var r in L(Jalki["valinnat"]).Select(O))
            {
                var ketju = Tekstit(r["ketju"]);
                var puuttuvat = new HashSet<string>(Tekstit(r["puuttuvat"]));
                Oleta.Sama(MiniJson.Teksti(r, "valinta"), Musiikkivalitsin.Valitse(ketju, puuttuvat), Yhdista(puuttuvat));
            }
        }

        [Testi] static void AlueetKutenWeb()
        {
            var valitsin = new Musiikkivalitsin(AaniTaulut.Oletus());
            foreach (var r in L(Jalki["alueet"]).Select(L))
                Oleta.Sama(r[2] as string, valitsin.Alue(r[0] as string, r[1] as string), $"{r[0]} {r[1]}");
        }

        static double JsLukuJaljesta(object o) => o switch
        {
            double d => d,
            "NaN" => double.NaN,
            "Infinity" => double.PositiveInfinity,
            "-Infinity" => double.NegativeInfinity,
            _ => throw new Exception("tuntematon luku " + o),
        };

        [Testi] static void LiukuJaKerroinKutenWeb()
        {
            foreach (var r in L(Jalki["liuku"]).Select(O))
            {
                var x = JsLukuJaljesta(r["liuku"]);
                Lahella(MiniJson.Luku(r, "kerroin").Value, Musiikkitaso.Kerroin(x), "liuku " + x);
                Oleta.Sama(MiniJson.Teksti(r, "teksti"), Musiikkitaso.Teksti(x), "liuku " + x);
            }
            Oleta.Sama("35 · −23 dB", Musiikkitaso.Teksti(35));
            Oleta.Sama(35.0, Musiikkitaso.Asetuksesta(0.35));
        }

        // =====================================================================
        // JÄLJET 5–6: OSOITTEET
        // =====================================================================

        [Testi] static void OsoitteetKutenWeb()
        {
            foreach (var r in L(Jalki["osoitteet"]).Select(O))
            {
                var s = MiniJson.Teksti(r, "syote");
                Oleta.Sama(MiniJson.Teksti(r, "url"), AaniOsoite.Url(s), "url " + s);
                Oleta.Sama(MiniJson.Teksti(r, "peili"), AaniOsoite.PeiliPolku(s), "peili " + s);
            }
            foreach (var r in L(Jalki["turvanimet"]).Select(O))
                Oleta.Sama(MiniJson.Teksti(r, "nimi"), AaniOsoite.Turvanimi(MiniJson.Teksti(r, "teksti"), MiniJson.Teksti(r, "pate")),
                    MiniJson.Teksti(r, "teksti"));
        }

        [Testi] static void JaaAlkuKutenWeb()
        {
            foreach (var r in L(Jalki["jaaAlku"]).Select(O))
            {
                var s = MiniJson.Teksti(r, "syote");
                var j = AaniOsoite.JaaAlku(s);
                Oleta.Sama(MiniJson.Teksti(r, "url"), j.Url, "url " + s);
                // JSON ei tunne ääretöntä: null = Infinity (Number('Infinity')).
                Oleta.Sama(MiniJson.Luku(r, "alku") ?? double.PositiveInfinity, j.Alku, "alku " + s);
                Oleta.Sama(MiniJson.Luku(r, "voima") ?? double.PositiveInfinity, j.Voima, "voima " + s);
            }
        }

        // =====================================================================
        // JÄLJET 7–9: KORIT, ARVONTA, VÄISTÖ
        // =====================================================================

        [Testi] static void MaisemakoritKutenWeb()
        {
            var t = Taulut();
            foreach (var r in L(Jalki["korit"]).Select(O))
            {
                var rivi = Maisemakori.Kori(t, MiniJson.Teksti(r, "lauta"), MiniJson.Teksti(r, "paikka"), MiniJson.Teksti(r, "tyyppi"),
                    MiniJson.Totuus(r, "maat") ? t.Maat : null);
                var nimi = $"{MiniJson.Teksti(r, "lauta")}/{MiniJson.Teksti(r, "paikka")}";
                Oleta.Sama(MiniJson.Teksti(r, "porras"), rivi.Porras, nimi);
                Oleta.Sama(Yhdista(Tekstit(r["kori"])), Yhdista(rivi.Kori), nimi);
            }
        }

        [Testi] static void PaketinMaisemakoritOvatWebinLaskenta()
        {
            // Vastaavuus: paketin maisemakori:<paikka> = kaupunkiKori → maaKori → tyyppiKori (OLETUSKORIT).
            var t = Taulut(paketinKorit: true);
            int n = 0;
            foreach (var r in L(Jalki["korit"]).Select(O))
            {
                if (MiniJson.Teksti(r, "lauta") != t.Lauta) continue;
                var paikka = MiniJson.Teksti(r, "paikka");
                var mailla = MiniJson.Totuus(r, "maat");
                var virtuaali = paikka == "etusivu" || paikka == "lentomatka" || paikka == "jalkamatka" || paikka == "merimatka";
                if (!t.Maisemakorit.TryGetValue(paikka, out var p)) { Oleta.Tosi(paikka == "tuntematon", "paketista puuttuu " + paikka); continue; }
                if (!mailla && !virtuaali) continue;
                Oleta.Sama(MiniJson.Teksti(r, "porras"), p.Porras, paikka);
                Oleta.Sama(Yhdista(Tekstit(r["kori"])), Yhdista(p.Kori), paikka);
                n++;
            }
            Oleta.Sama(270, n, "verrattuja koreja");
        }

        [Testi] static void ArvontaKutenWeb()
        {
            var a = O(Jalki["arvonta"]);
            var r = new Satunnainen((long)MiniJson.Luku(a, "siemen").Value);
            int arpoja = 0;
            var tila = new AaniTila(Taulut(), () => { arpoja++; return r.Seuraava(); });
            foreach (var s in L(a["askeleet"]).Select(O))
            {
                arpoja = 0;
                if (MiniJson.Teksti(s, "e") == "paikka") tila.Paikka(MiniJson.Teksti(s, "paikka"), MiniJson.Teksti(s, "tyyppi"));
                else tila.KestoTiedossa(MiniJson.Luku(s, "s").Value);
                var m = tila.Toive(Kanava.Maisema);
                var nimi = $"{MiniJson.Teksti(s, "e")} {MiniJson.Teksti(s, "paikka")} {MiniJson.Luku(s, "s")}";
                Oleta.Sama((int)MiniJson.Luku(s, "arpoja").Value, arpoja, "arpoja " + nimi);
                Oleta.Sama(MiniJson.Teksti(s, "url"), m.Url, nimi);
                Lahella(MiniJson.Luku(s, "alku") ?? 0, m.Alku, "alku " + nimi);
            }
        }

        [Testi] static void VaistoKutenWeb()
        {
            var t = AaniTaulut.Oletus();
            foreach (var r in L(Jalki["vaisto"]).Select(O))
            {
                var syyt = Tekstit(r["syyt"]);
                var pyydetty = MiniJson.Luku(r, "pyydetty").Value;
                var voimassa = MiniJson.Luku(r, "voimassa").Value;
                var nimi = $"{MiniJson.Teksti(r, "pyynto")} {Yhdista(syyt)}";
                Oleta.Sama(voimassa, Vaisto.Voimassa(pyydetty, syyt), nimi);
                foreach (var (laji, arvo) in O(r["lajit"]).Select(p => (p.Key, (double)p.Value)))
                    Oleta.Sama(arvo, Vaisto.Laji(t.Siirtyma(laji), syyt, pyydetty, voimassa), nimi + " " + laji);
            }
        }

        // =====================================================================
        // JÄLKI 10: TAPAHTUMAKONE
        // =====================================================================

        static readonly string[] KanavaNimet = { "pohja", "maisema", "visa", "siirtyma", "aarre" };

        static void Aja(AaniTila tila, Dictionary<string, object> e)
        {
            bool Auki() => MiniJson.Totuus(e, "auki");
            double Luku(string n) => MiniJson.Luku(e, n).Value;
            string T(string n) => MiniJson.Teksti(e, n);
            switch (T("e"))
            {
                case "paikka": tila.Paikka(T("paikka"), T("tyyppi")); break;
                case "kesto": tila.KestoTiedossa(Luku("s")); break;
                case "silmukka": tila.SilmukkaVaihtuu(); break;
                case "tila": tila.Tila(T("nimi"), Auki()); break;
                case "hiljennys": tila.Hiljennys(T("syy"), Auki()); break;
                case "puhe": tila.Puhe(Auki()); break;
                case "nayte": tila.Nayte(Auki()); break;
                case "visa": tila.Visa(Auki()); break;
                case "siirtyma": tila.Siirtyma(T("laji")); break;
                case "himmennys": tila.Himmennys(Luku("kerroin")); break;
                case "linssi": tila.LinssiPito(Auki()); break;
                case "musiikki": tila.MusiikkiPaalle(Auki()); break;
                case "aanimaisema": tila.AanimaisemaPaalle(Auki()); break;
                case "liuku": tila.AsetaLiuku(Luku("arvo")); break;
                case "tausta": tila.AsetaTausta(Luku("arvo")); break;
                case "puuttuu": tila.Puuttuu((Kanava)Array.IndexOf(KanavaNimet, T("kanava"))); break;
                case "aarre": tila.AarrePaljastui(T("tyyppi")); break;
                case "aarreLoppui": tila.AarreLoppui(); break;
                case "avaus": tila.Avaus(Auki()); break;
                case "taustalle": tila.TaustalleSiirto(Auki()); break;
                case "uusiMatka": tila.UusiMatka(); break;
                default: throw new Exception("tuntematon tapahtuma " + T("e"));
            }
        }

        static int? Kokonaisluku(Dictionary<string, object> o, string n) => MiniJson.Luku(o, n) is double d ? (int)d : (int?)null;

        static void KoneKutenWeb(AaniTaulut taulut)
        {
            var kone = O(Jalki["kone"]);
            var r = new Satunnainen((long)MiniJson.Luku(kone, "siemen").Value);
            int arpoja = 0;
            var tila = new AaniTila(taulut, () => { arpoja++; return r.Seuraava(); });
            int i = 0;
            foreach (var e in L(kone["askeleet"]).Select(O))
            {
                arpoja = 0;
                Aja(tila, e);
                var nimi = $"#{i} {MiniJson.Teksti(e, "e")} ";
                Oleta.Sama((int)MiniJson.Luku(e, "arpoja").Value, arpoja, nimi + "arpoja");
                var kanavat = O(e["kanavat"]);
                for (int k = 0; k < KanavaNimet.Length; k++)
                {
                    var w = O(kanavat[KanavaNimet[k]]);
                    var c = tila.Toive((Kanava)k);
                    var n = nimi + KanavaNimet[k] + " ";
                    Oleta.Sama(MiniJson.Teksti(w, "url"), c.Url, n + "url");
                    if (c.Url != null)
                    {
                        Lahella(MiniJson.Luku(w, "taso").Value, c.Tavoite, n + "taso");
                        Lahella(MiniJson.Luku(w, "alku") ?? 0, c.Alku, n + "alku");
                    }
                    Oleta.Sama(Kokonaisluku(w, "kesto"), c.KestoMs, n + "kesto");
                    Oleta.Sama(MiniJson.Totuus(w, "uusi"), c.Uusi, n + "uusi");
                    Oleta.Sama(Kokonaisluku(w, "pois"), c.PoisMs, n + "pois");
                    Oleta.Sama(MiniJson.Totuus(w, "tauko"), c.Tauko, n + "tauko");
                    Oleta.Sama(MiniJson.Totuus(w, "silmukka"), c.Silmukka, n + "silmukka");
                }
                i++;
            }
            Oleta.Tosi(i > 100, "askelia " + i);
        }

        [Testi] static void KoneKutenWebLasketuillaKoreilla() => KoneKutenWeb(Taulut());

        [Testi] static void KoneKutenWebPaketinKoreilla() => KoneKutenWeb(Taulut(paketinKorit: true));

        // =====================================================================
        // TEHOSTEET
        // =====================================================================

        [Testi] static void TehosteetKutenWeb()
        {
            var te = O(Jalki["tehosteet"]);
            var lista = L(te["lista"]).Select(O).ToList();
            Oleta.Sama(lista.Count, Tehostetaulu.Kaikki.Count, "tehosteita");
            foreach (var w in lista)
            {
                var nimi = MiniJson.Teksti(w, "nimi");
                var c = Tehostetaulu.Hae(nimi) ?? throw new Exception("puuttuu " + nimi);
                Oleta.Sama(nimi, c.Nimi);
                Oleta.Sama(MiniJson.Teksti(w, "url"), c.Url, nimi);
                var tail = MiniJson.Luku(w, "tail");
                var aloitus = tail != null ? "hanta" : MiniJson.Totuus(w, "alusta") ? "alusta" : MiniJson.Totuus(w, "isku") ? "isku" : "satunnainen";
                Oleta.Sama(aloitus, c.Aloitus, nimi);
                Oleta.Sama((float)(tail ?? MiniJson.Luku(w, "dur").Value), c.Kesto, nimi + " kesto");
                Oleta.Sama((float)MiniJson.Luku(w, "gain").Value, c.Gain, nimi + " gain");
                var vire = MiniJson.Luku(w, "vire");
                Oleta.Sama(vire.HasValue ? (float?)vire.Value : null, c.Vire, nimi + " vire");
                Oleta.Sama(MiniJson.Totuus(w, "tasavire"), c.Tasavire, nimi + " tasavire");
                Oleta.Sama(0.0, MiniJson.Luku(w, "delay").Value, nimi + " delay");
            }
            Oleta.Sama(MiniJson.Teksti(O(te["lento"]), "url"), Tehostetaulu.Lento.Url);
        }

        [Testi] static void TehosteidenSiivuJaMoottoriKutenSoundJs()
        {
            var arpa = new Func<double>(() => 0.5);
            void F(double o, double x, string v) => Oleta.Tosi(Math.Abs(o - x) < 1e-5, $"odotettu {o}, saatu {x} {v}");
            Oleta.Sama(10f - 0.6f - 0.15f, Tehostetaulu.Alkukohta(Tehostetaulu.Hae("dieLand"), 10f, null, arpa), "häntä");
            Oleta.Sama(0f, Tehostetaulu.Alkukohta(Tehostetaulu.Hae("correct"), 10f, null, arpa), "alusta");
            Oleta.Sama(2f, Tehostetaulu.Alkukohta(Tehostetaulu.Hae("popup"), 10f, new[] { 1f, 2f, 3f }, arpa), "isku");
            Oleta.Sama(10f * 0.2f + 0.5f * (10f * 0.6f - 0.5f), Tehostetaulu.Alkukohta(Tehostetaulu.Hae("popup"), 10f, new float[0], arpa), "isku ilman iskuja");
            Oleta.Sama(1f, Tehostetaulu.Toistonopeus(Tehostetaulu.Hae("pen"), 0.9), "tasavire");
            F(0.82 * 1.02, Tehostetaulu.Toistonopeus(Tehostetaulu.Hae("step"), 1.0), "nimetty vire +2 %");
            F(0.95, Tehostetaulu.Toistonopeus(Tehostetaulu.Hae("click"), 0.0), "heitto −5 %");
            F(0.0001, Tehostetaulu.Lento.Taso(0.1f), "moottori hiljaa 0,15 s");
            F(0.7, Tehostetaulu.Lento.Taso(6f), "huippu");
            Oleta.Tosi(Tehostetaulu.Lento.Taso(Tehostetaulu.Lento.WebinLentoS) < 0.012f, "webin 2,8 s:n lento jää noin tasoon 0,010");
            F(0.82 + 0.18, Tehostetaulu.Kaiku.Kuiva + Tehostetaulu.Kaiku.Marka, "kaiku");
        }

        // =====================================================================
        // NATIIVIN OMAT SÄÄNNÖT (ei webissä)
        // =====================================================================

        [Testi] static void MaisemanToinenVirheOnHiljaisuus()
        {
            var tila = new AaniTila(Taulut(), new Satunnainen(1).Seuraava);
            tila.Paikka("lontoo", "kaupunki");
            Oleta.Tosi(tila.Toive(Kanava.Maisema).Url.StartsWith(AaniOsoite.Juuri), "peilistä");
            tila.Puuttuu(Kanava.Maisema);
            Oleta.Tosi(tila.Toive(Kanava.Maisema).Url.StartsWith("https://archive.org/download/"), "varareitti alkuperäiseen");
            tila.Puuttuu(Kanava.Maisema);
            Oleta.Sama(null, tila.Toive(Kanava.Maisema).Url, "toinen virhe");
            Oleta.Sama(0, tila.Toive(Kanava.Maisema).PoisMs, "pois heti");
            // Pohja jatkaa (maisema ja musiikki ovat eri kanavia).
            Oleta.Tosi(tila.Toive(Kanava.Pohja).Url != null, "pohja soi");
        }

        [Testi] static void LinssinPitoOnIdempotentti()
        {
            var tila = new AaniTila(Taulut(), new Satunnainen(1).Seuraava);
            tila.Paikka("pariisi", "kaupunki");
            tila.LinssiPito(true);
            tila.LinssiPito(true);
            Oleta.Sama(null, tila.Toive(Kanava.Pohja).Url, "pohja pidossa");
            Oleta.Sama(null, tila.Toive(Kanava.Maisema).Url, "maisema pois");
            Oleta.Sama(1, tila.Hiljennykset.Count, "yksi linssi-syy");
            tila.LinssiPito(false);
            Oleta.Sama(0, tila.Hiljennykset.Count, "linssi-syy purettu");
            Oleta.Tosi(tila.Toive(Kanava.Pohja).Url != null && tila.Toive(Kanava.Maisema).Url != null, "palaa samaan paikkaan");
        }

        [Testi] static void LinssinTaustaaaniMaisemanPaikalla()
        {
            // ILinssiYmparisto.Taustaaani (Pelikoodari 26.9.): astronautin humina maiseman soittimella, ei linssiväistöä.
            const string humina = "https://media.matkakirja.app/matkakirja/aanet/linssit/humina.mp3";
            var tila = new AaniTila(Taulut(), new Satunnainen(1).Seuraava);
            tila.Paikka("pariisi", "kaupunki");
            tila.LinssiPito(true);
            tila.LinssiTausta(humina, 0.45, 2000);
            var m = tila.Toive(Kanava.Maisema);
            Oleta.Sama(humina, m.Url, "humina soi maiseman paikalla");
            tila.LinssiTausta(humina, 0.45, 2000);
            Oleta.Sama(humina, tila.Toive(Kanava.Maisema).Url, "sama tunnus ei ala alusta");
            tila.LinssiTausta(null, 0, 0);
            Oleta.Sama(null, tila.Toive(Kanava.Maisema).Url, "pois linssin ollessa auki: hiljaa");
            tila.LinssiPito(false);
            Oleta.Tosi(tila.Toive(Kanava.Maisema).Url != null && tila.Toive(Kanava.Maisema).Url != humina, "paikan maisema palaa");
        }

        [Testi] static void TaustallaUusiMaisemaOdottaaPaluuta()
        {
            var tila = new AaniTila(Taulut(), new Satunnainen(3).Seuraava);
            tila.Paikka("pariisi", "kaupunki");
            tila.TaustalleSiirto(true);
            tila.Paikka("berliini", "kaupunki");
            var m = tila.Toive(Kanava.Maisema);
            Oleta.Tosi(m.Uusi && m.Tauko && m.Tavoite == 0, "ladataan mutta ei soiteta");
            tila.TaustalleSiirto(false);
            m = tila.Toive(Kanava.Maisema);
            Oleta.Tosi(!m.Tauko && m.Tavoite > 0, "soi paluussa");
            Oleta.Sama(AaniVakiot.HaivytysMs, m.KestoMs ?? -1, "nousu");
        }
    }
}
