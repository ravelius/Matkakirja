// TYÖHUONE KEHITTÄJÄN LIITTEINÄ (Natiivi-UI): webin KOKEET-ryhmän Raamattu ja Kehittäjälehti
// (js/lehti.js avaaRaamattuLehti, avaaKehittajalehti, avaaTilanneLehti, avaaPoiminnatLehti;
// js/tyohuone-kehittajalehti.js; js/tyohuone-raamattu-muokkaus.js).
//
// Kaikki avautuu Lehtinakyma.NaytaLiite-arkille (kehittäjän liite) vain kehittäjätilassa. Data tulee
// sisältöpaketin moduuleista (Siirtoseppä, skeema 1.27, luokka "kehittaja"):
//   moduulit/js/tyohuone-raamattu.json  RAAMATTU { paivitetty, johdanto, osiot[{ otsikko, tila, kohdat[] }] }
//   moduulit/js/tyohuone-tilanne.json   TILANNE { paivitetty, tavoite, rivit[] }, TESTATTAVAA[], TUOREET
//   moduulit/js/tyohuone-musiikki.json  MUSIIKKISIVUN_RAIDAT[{ id, nimi, osasto, kaytto, ampari, oma }], SFX_NIMET[]
//
// Raamatun sivut ovat muokkauskenttiä: muutos elää istunnon luonnoksessa (web sessionStorage) ja lähtee
// "Lähetä muutokset" -napilla ehdotuskanavaan lajilla raamattu (Fable kuratoi). Kehittäjälehden rivit
// kutsuvat samoja avauksia kuin webin rivit; natiivissa ovat nyt Tilannelehti, Poiminnat, Tilastot (Tilastot.cs), Grafiikka, Lukijoilta (Lukijoilta.cs) ja Musiikki.
// Fable 24.9.: Raamattu-data ei muutu appissa, luonnos ei tallennu pysyvästi, lähetys kulkee ehdotusreittiä
// (laji raamattu) ja koko työhuone on vain kehittäjätilassa eikä App Store -buildissa (Paavalikko #if).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Tyohuone
    {
        const string RaamattuModuuli = "moduulit/js/tyohuone-raamattu.json";
        const string TilanneModuuli = "moduulit/js/tyohuone-tilanne.json";
        const string MusiikkiModuuli = "moduulit/js/tyohuone-musiikki.json";
        const string PelitModuuli = "moduulit/js/tyohuone-pelit.json";
        const string MaailmankarttaModuuli = "moduulit/js/packs/maailmankartta.json";

        internal static Lehtinakyma Lehti => UiNakymat.Olemassa ? UiNakymat.Hae().Lehti : null;

        /// <summary>Työhuone vain kehittäjätilassa eikä koskaan App Store -buildissa (Fable 24.9.).</summary>
#if MATKAKIRJA_APPSTORE
        internal static bool Sallittu => false;
#else
        internal static bool Sallittu => Asetukset.Kehittaja;
#endif

        /// <summary>Moduulin exportit (arvo-kääre pois); null, jos moduulia ei ole paketissa.</summary>
        static void HaeVienti(string moduuli, Action<Dictionary<string, object>> valmis)
        {
            UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista(moduuli, json =>
            {
                Dictionary<string, object> ulos = null;
                try
                {
                    var e = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(json != null ? MiniJson.Jasenna(json) : null), "exportit"));
                    if (e != null)
                    {
                        ulos = new Dictionary<string, object>();
                        foreach (var kv in e)
                            ulos[kv.Key] = Rakenne.Olio(kv.Value) is Dictionary<string, object> o && o.Count == 1 && o.ContainsKey("arvo") ? o["arvo"] : kv.Value;
                    }
                }
                catch (FormatException) { ulos = null; }
                if (ulos == null) UiNakymat.Hae()?.Tilarivi.Viesti("Työhuoneen aineisto puuttuu sisältöpaketista");
                valmis(ulos);
            }, true));
        }

        static List<string> Tekstit(object x) =>
            (Rakenne.Lista(x) ?? new List<object>()).Select(o => o as string ?? "").ToList();

        internal static LehtiSivu Sivu(string otsikko, Action<VisualElement> rakenna = null, bool jatka = false, params LehtiNosto[] nostot)
        {
            var aihe = new LehtiAihe { Nimi = otsikko };
            aihe.Nostot.AddRange(nostot);
            return new LehtiSivu { Laji = LehtiSivuLaji.Aihe, Aihe = aihe, Otsikko = otsikko, Rakenna = rakenna, RakennaJatka = jatka };
        }

        internal static Label Teksti(VisualElement isa, string teksti, string luokka, Kirjasin kirjasin = Kirjasin.Luku)
        {
            var l = Rakenne.Teksti(teksti ?? "", luokka, isa);
            l.enableRichText = false;
            Kirjasimet.Aseta(l, kirjasin);
            return l;
        }

        // --- Raamattu (web avaaRaamattuLehti, piirraRaamatunSivu) ------------------------------------

        const string JohdannonOsio = "Johdanto"; // web JOHDANNON_OSIO
        const string RaamatunTunniste = "[Raamatun muutokset]";
        // Istunnon luonnos (web sessionStorage matkakirja-raamattu-luonnos): avain osio»kohta → teksti.
        static readonly Dictionary<string, string> luonnos = new Dictionary<string, string>();
        static string LuonnoksenAvain(string osio, string kohta) => osio + "»" + kohta;

        struct Muutos { public string Osio, Kohta, Vanha, Uusi; }

        public static void AvaaRaamattu()
        {
            if (!Sallittu) return;
            HaeVienti(RaamattuModuuli, e => HaeVienti(PelitModuuli, pe => HaeVienti(MaailmankarttaModuuli, me =>
            {
                var r = e != null ? Rakenne.Olio(MiniJson.Kentta(e, "RAAMATTU")) : null;
                if (r == null) return;
                var pelit = pe != null ? Rakenne.Olio(MiniJson.Kentta(pe, "PELIT")) : null;
                var tokens = me != null ? Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(me, "MAAILMANKARTTA")), "tokens")) : null;
                string paivitetty = MiniJson.Teksti(r, "paivitetty"), johdanto = MiniJson.Teksti(r, "johdanto");
                var osiot = (Rakenne.Lista(MiniJson.Kentta(r, "osiot")) ?? new List<object>()).Select(Rakenne.Olio).Where(o => o != null)
                    .Select(o => (Otsikko: MiniJson.Teksti(o, "otsikko") ?? "", Tila: MiniJson.Teksti(o, "tila") ?? "", Kohdat: Tekstit(MiniJson.Kentta(o, "kohdat"))))
                    .ToList();
                List<Muutos> Keraa()
                {
                    var m = new List<Muutos>();
                    void Lisaa(string osio, string kohta, string vanha)
                    {
                        if (!luonnos.TryGetValue(LuonnoksenAvain(osio, kohta), out var uusi)) return;
                        if (uusi.Trim() == (vanha ?? "").Trim()) return;
                        m.Add(new Muutos { Osio = osio, Kohta = kohta, Vanha = vanha ?? "", Uusi = uusi.Trim() });
                    }
                    Lisaa(JohdannonOsio, "johdanto", johdanto);
                    foreach (var o in osiot) for (int j = 0; j < o.Kohdat.Count; j++) Lisaa(o.Otsikko, j.ToString(), o.Kohdat[j]);
                    return m;
                }
                var sivut = new List<LehtiSivu>
                {
                    Sivu("Raamattu", s =>
                    {
                        Teksti(s, "Päivitetty " + paivitetty, "mk-tyohuone__periaate");
                        RaamatunSivu(s, JohdannonOsio, new[] { ("johdanto", johdanto) }, Keraa);
                    }),
                };
                foreach (var o in osiot)
                {
                    var osio = o;
                    bool valmis = osio.Tila.StartsWith("hyväksytty", StringComparison.Ordinal);
                    sivut.Add(Sivu(osio.Otsikko, s =>
                    {
                        // Valmiusaste värichippinä (web tagi valmis/kesken).
                        Teksti(s, valmis ? "valmis" : "kesken", "mk-tyohuone__tagi mk-tyohuone__tagi--" + (valmis ? "valmis" : "kesken"), Kirjasin.Kone);
                        RaamatunSivu(s, osio.Otsikko, osio.Kohdat.Select((t, j) => (j.ToString(), t)), Keraa);
                    }));
                    // Aarteet ja Tutki kätkö saavat perään pelidatasta lasketun taulusivun (web raamatunTaulusivu).
                    if (osio.Otsikko.StartsWith("Aarteet", StringComparison.Ordinal) && tokens != null)
                        sivut.Add(Sivu("Aarteet taulukkona", s => Aarretaulut(s, tokens)));
                    else if (osio.Otsikko.StartsWith("Tutki kätkö", StringComparison.Ordinal) && pelit != null)
                        sivut.Add(Sivu("Pelit taulukkona", s => Pelitaulu(s, pelit)));
                }
                Lehti?.NaytaLiite("Raamattu", sivut);
            })));
        }

        static void RaamatunSivu(VisualElement s, string osio, IEnumerable<(string Kohta, string Teksti)> kohdat, Func<List<Muutos>> keraa)
        {
            var kentat = Rakenne.El("mk-tyohuone__kentat", s, PickingMode.Ignore);
            foreach (var (kohta, teksti) in kohdat)
            {
                string avain = LuonnoksenAvain(osio, kohta);
                var k = new TextField { multiline = true, value = luonnos.TryGetValue(avain, out var l) ? l : teksti ?? "" };
                k.AddToClassList("mk-tyohuone__kentta");
                k.tooltip = osio + " — " + (kohta == "johdanto" ? "johdanto" : "kohta " + kohta);
                Kirjasimet.Aseta(k, Kirjasin.Luku);
                k.RegisterValueChangedCallback(e => luonnos[avain] = e.newValue);
                kentat.Add(k);
            }
            // Lähetys jokaisen sivun lopussa (web piirraRaamatunLahetys).
            var kotelo = Rakenne.El("mk-tyohuone__lahetys", s, PickingMode.Ignore);
            Label tulos = null;
            Button nappi = null;
            nappi = Rakenne.Nappi("Lähetä muutokset", "mk-tyohuone__nappi", () =>
            {
                var muutokset = keraa();
                if (muutokset.Count == 0) { tulos.text = "Ei muutoksia lähetettäväksi."; return; }
                nappi.SetEnabled(false);
                tulos.text = $"Lähetetään {muutokset.Count} muutosta…";
                var lohkot = muutokset.Select(m => $"{m.Osio} » {(m.Kohta == "johdanto" ? "johdanto" : "kohta " + m.Kohta)}:\nVANHA: {m.Vanha}\nUUSI: {m.Uusi}");
                var kentat2 = new List<(string, string)>
                {
                    ("laji", "raamattu"),
                    ("teksti", string.Join("\n\n", new[] { $"{RaamatunTunniste} {muutokset.Count} kpl" }.Concat(lohkot))),
                    ("sivu", "Raamattu"), ("tarkenne", $"Raamatun muutokset: {muutokset.Count} kohtaa"),
                    ("nimimerkki", "Työhuone (kehittäjä)"),
                };
                Palautekanava.Postita("/laheta", kentat2, null, t =>
                {
                    nappi.SetEnabled(true);
                    if (t.Ok)
                    {
                        luonnos.Clear();
                        tulos.text = $"Muutokset lähetetty Fablelle ({muutokset.Count} kohtaa).";
                    }
                    else tulos.text = "Lähetys ei onnistunut: " + Palautekanava.Virheviesti(t, false);
                });
            }, kotelo);
            Kirjasimet.Aseta(nappi, Kirjasin.Kone);
            tulos = Teksti(kotelo, "", "mk-tyohuone__tulos");
        }

        // --- Raamatun taulusivut (web tyohuone-tilastot.js piirraAarretaulut, piirraPelitaulu) ----------

        static readonly Dictionary<string, string> Mannernimi = new Dictionary<string, string>
        {
            ["europe"] = "Eurooppa", ["middleeast"] = "Lähi-itä", ["africa"] = "Afrikka", ["asia"] = "Aasia",
            ["northamerica"] = "Pohjois-Amerikka", ["southamerica"] = "Etelä-Amerikka", ["oceania"] = "Oseania",
        };

        static void Aarretaulut(VisualElement s, Dictionary<string, object> tokens)
        {
            var mannerit = (Rakenne.Olio(MiniJson.Kentta(tokens, "mannerTypes")) ?? new Dictionary<string, object>()).ToList();
            var eka = mannerit.Count > 0 ? Rakenne.Olio(mannerit[0].Value) : null;
            string Nimi(Dictionary<string, object> t, string laji) => MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(t, laji)), "name") ?? "?";
            var arvo = MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(eka, "mannerAarre")), "value");
            Teksti(s, "Mantereiden aarteet — jokaisella mantereella omansa; laatta paljastaa sen mantereen aarteen, jolta se löytyy. "
                + "Unohdettu aarre on Aarnin luettelon päämäärä, joka avaa mannerlennon.", "mk-lehti__johdanto", Kirjasin.LukuKursiivi);
            Pikataulu(s, new[] { "Manner", "Unohdettu aarre", $"Mantereen aarre +{Luku(arvo, 1000)} p" },
                mannerit.Select(kv => new[] { Mannernimi.TryGetValue(kv.Key, out var n) ? n : kv.Key, Nimi(Rakenne.Olio(kv.Value), "star"), Nimi(Rakenne.Olio(kv.Value), "mannerAarre") }));
            var maarat = Rakenne.Olio(MiniJson.Kentta(tokens, "counts")) ?? new Dictionary<string, object>();
            int M(string k) => maarat.TryGetValue(k, out var x) ? Luku(x, 0) : 0;
            int yhteensa = maarat.Keys.Sum(M);
            Teksti(s, $"Laattojen jakauma ({yhteensa} laattaa, yksi joka kaupungissa; laatan alta löytyy aina aarre):", "mk-tyohuone__huomio");
            Pikataulu(s, new[] { "Laatta", "Kpl", "Vaikutus" }, new[]
            {
                new[] { "Pääaarre (unohdettu aarre)", M("star").ToString(), "+2000 p JA jää matkalaukkuun näkyviin — avaa mannerlennon" },
                new[] { "Mantereen aarre", M("mannerAarre").ToString(), "Kiinteä +1000 p — muuttuu heti rahaksi" },
                new[] { "Iso paikallisaarre", M("isoAarre").ToString(), "Maan oma aarre, +500–800 p löytöhetken mukaan" },
                new[] { "Pieni paikallisaarre", M("pieniAarre").ToString(), "Maan oma aarre, +100–250 p löytöhetken mukaan" },
                new[] { "Ryöstäjä", M("robber").ToString(), "Vie rahat — tai voita kaksintaistelu" },
            });
        }

        static int Luku(object x, int oletus) => x is double d ? (int)d : x is long l ? (int)l : x is int i ? i : oletus;

        static void Pelitaulu(VisualElement s, Dictionary<string, object> pelit)
        {
            Teksti(s, $"{MiniJson.Teksti(pelit, "johdanto")} Päivitetty {MiniJson.Teksti(pelit, "paivitetty")}; Fable ylläpitää.", "mk-lehti__johdanto", Kirjasin.LukuKursiivi);
            IEnumerable<Dictionary<string, object>> Lista(string k) => (Rakenne.Lista(MiniJson.Kentta(pelit, k)) ?? new List<object>()).Select(Rakenne.Olio).Where(o => o != null);
            Pikataulu(s, new[] { "Peli", "Tila", "Kuvaus" },
                Lista("nykyiset").Select(p => new[] { MiniJson.Teksti(p, "nimi"), MiniJson.Teksti(p, "tila"), MiniJson.Teksti(p, "kuvaus") })
                    .Concat(Lista("ehdotukset").Select(p => new[] { MiniJson.Teksti(p, "nimi"), "ehdotus — ei päätetty", MiniJson.Teksti(p, "kuvaus") })));
            Teksti(s, "Ehdotuksia EI ole päätetty. Jokaisessa on mietitty valmiiksi, mihin tarinoihin tyyppi istuu; valitut pilotoidaan "
                + "yhdessä kaupungissa ennen monistusta. Periaatteet: " + string.Join(" · ", Tekstit(MiniJson.Kentta(pelit, "periaatteet"))), "mk-tyohuone__huomio");
        }

        /// <summary>Web pikataulu: otsikkorivi ja rivit, ensimmäinen sarake nimenä; vaakavieritys kapealla ruudulla.</summary>
        static void Pikataulu(VisualElement s, string[] otsikot, IEnumerable<string[]> rivit)
        {
            var vieri = new ScrollView(ScrollViewMode.Horizontal);
            vieri.AddToClassList("mk-tyohuone__taulu");
            vieri.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            vieri.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            s.Add(vieri);
            var taulu = Rakenne.El("mk-tyohuone__taulurunko", vieri.contentContainer, PickingMode.Ignore);
            void Rivi(IEnumerable<string> solut, bool otsikko)
            {
                var r = Rakenne.El(otsikko ? "mk-tyohuone__taulurivi mk-tyohuone__taulurivi--otsikko" : "mk-tyohuone__taulurivi", taulu, PickingMode.Ignore);
                int i = 0;
                foreach (var solu in solut)
                    Teksti(r, solu ?? "", "mk-tyohuone__solu mk-tyohuone__solu--" + (i++ == 0 ? "nimi" : i == 2 ? "toinen" : "muu"), otsikko ? Kirjasin.KoneLihava : Kirjasin.Luku);
            }
            Rivi(otsikot, true);
            foreach (var r in rivit) Rivi(r, false);
        }

        // --- Kehittäjälehti (web avaaKehittajalehti, KEHITTAJALEHDEN_RIVIT) ---------------------------

        static readonly (string Nimi, string Kuvaus, string Ikoni, Action Avaa)[] Rivit =
        {
            ("Tilannelehti", "Kolmen session työnjako, testattavaa ja pöllöpoimintojen vienti.",
                "<path d=\"M4.5 5.5h15v13h-15z\"/><path d=\"M7.5 9h5.5M7.5 12h9M7.5 15h9\"/><path d=\"M16 9h.5\"/>", () => AvaaTilanne()),
            ("Poiminnat", "Oikotie Tilannelehden Pöllöpoiminnat-sivulle.",
                "<rect x=\"4.5\" y=\"9\" width=\"15\" height=\"6\" rx=\"3\"/><path d=\"M12 9v6\"/>", () => AvaaTilanne(2)),
            ("Tilastot", "Rakennustyön tilanne mantereittain, maittain ja kaupungeittain.",
                "<path d=\"M4.5 19.5h15\"/><path d=\"M7 19.5v-7\"/><path d=\"M12 19.5v-11\"/><path d=\"M17 19.5v-4.5\"/>", () => Tilastot.Avaa()),
            ("Grafiikka", "Julistesuunnan luonnokset yksi juliste sivua kohti.",
                "<path d=\"M4.5 4.5h15v15h-15z\"/><path d=\"m4.5 15.5 4.5-4.5 3.5 3.5 3-3 4 4\"/><path d=\"M9.5 8.7a.9.9 0 1 1 0 .2\"/>", () => AvaaGrafiikka()),
            ("Lukijoilta", "Lukijoiden ehdotukset, kuvavinkit ja Raamatun muutokset.",
                "<path d=\"M3.8 6.5h16.4v11H3.8z\"/><path d=\"m3.8 6.5 8.2 6 8.2-6\"/>", () => Lukijoilta.Avaa()),
            ("Musiikki", "Siirtymä-, linssi- ja palettiraidat sekä tehosteet kuunneltavina.",
                "<path d=\"M9.5 17.5V6.2l9-1.7v11\"/><path d=\"M9.5 9.7l9-1.7\"/><path d=\"M9.5 17.5a2.2 2.2 0 1 1-2.2-2.2 2.2 2.2 0 0 1 2.2 2.2z\"/><path d=\"M18.5 15.5a2.2 2.2 0 1 1-2.2-2.2 2.2 2.2 0 0 1 2.2 2.2z\"/>", () => AvaaMusiikki()),
        };

        public static void AvaaKehittajalehti()
        {
            if (!Sallittu) return;
            Lehti?.NaytaLiite("Kehittäjälehti", new List<LehtiSivu>
            {
                Sivu("Kehittäjälehti", s =>
                {
                    var kotelo = Rakenne.El("mk-tyohuone__rivit", s, PickingMode.Ignore);
                    foreach (var r in Rivit)
                    {
                        var avaa = r.Avaa;
                        var b = Rakenne.Nappi(null, "mk-tyohuone__rivi", () => avaa(), kotelo, r.Ikoni);
                        var t = Rakenne.El("mk-tyohuone__riviteksti", b, PickingMode.Ignore);
                        Teksti(t, r.Nimi, "mk-tyohuone__rivinimi", Kirjasin.Kone);
                        Teksti(t, r.Kuvaus, "mk-tyohuone__riviselite");
                    }
                }),
            });
        }

        // --- Tilannelehti (web avaaTilanneLehti, piirraTuoreetChipit, piirraPoimintavienti) ----------

        /// <summary>Tilanne, Testattavaa ja Pöllöpoiminnat; alku = sivu (2 = Pöllöpoiminnat, web avaaPoiminnatLehti).</summary>
        public static void AvaaTilanne(int alku = 0)
        {
            if (!Sallittu) return;
            HaeVienti(TilanneModuuli, e =>
            {
                var tilanne = e != null ? Rakenne.Olio(MiniJson.Kentta(e, "TILANNE")) : null;
                var tuoreet = e != null ? Rakenne.Olio(MiniJson.Kentta(e, "TUOREET")) : null;
                var testattavaa = e != null ? Tekstit(MiniJson.Kentta(e, "TESTATTAVAA")) : new List<string>();
                var nostot = new List<LehtiNosto>();
                if (tilanne != null)
                {
                    nostot.Add(new LehtiNosto { Otsikko = MiniJson.Teksti(tilanne, "paivitetty"), Teksti = MiniJson.Teksti(tilanne, "tavoite") });
                    foreach (var rivi in (Rakenne.Lista(MiniJson.Kentta(tilanne, "rivit")) ?? new List<object>()).Select(Rakenne.Olio).Where(o => o != null))
                    {
                        string seuraavaksi = MiniJson.Teksti(rivi, "seuraavaksi");
                        nostot.Add(new LehtiNosto
                        {
                            Otsikko = $"{MiniJson.Teksti(rivi, "tekija")} — {MiniJson.Teksti(rivi, "rooli")} ({MiniJson.Teksti(rivi, "tila")})",
                            Teksti = string.Join("\n\n", new[] { MiniJson.Teksti(rivi, "tehtava"), string.IsNullOrEmpty(seuraavaksi) ? null : "Seuraavaksi: " + seuraavaksi }
                                .Where(x => !string.IsNullOrEmpty(x))),
                        });
                    }
                }
                var sivut = new List<LehtiSivu>
                {
                    Sivu("Tilanne", s => TuoreetChipit(s, tuoreet), true, nostot.ToArray()),
                    // Äärimmäisen minimalistinen (web): viivarivi per kappale, jokainen omana tekstinään.
                    Sivu("Testattavaa", s => { foreach (var r in testattavaa) Teksti(s, "— " + r, "mk-lehti__leipa"); }),
                    Sivu("Pöllöpoiminnat", Poimintavienti),
                };
                Lehti?.NaytaLiite("Tilannelehti", sivut, Mathf.Clamp(alku, 0, sivut.Count - 1));
            });
        }

        static void TuoreetChipit(VisualElement s, Dictionary<string, object> tuoreet)
        {
            if (tuoreet == null) return;
            var kotelo = Rakenne.El("mk-tyohuone__tuoreet", s, PickingMode.Ignore);
            foreach (var (otsikko, avain, luokka) in new[] { ("Vasta valmistuneet", "valmiit", "valmis"), ("Työn alla", "tyossa", "tyossa") })
            {
                var lista = (Rakenne.Lista(MiniJson.Kentta(tuoreet, avain)) ?? new List<object>()).Select(Rakenne.Olio).Where(o => o != null).ToList();
                if (lista.Count == 0) continue;
                var rivi = Rakenne.El("mk-tyohuone__tuoreetrivi", kotelo, PickingMode.Ignore);
                Teksti(rivi, otsikko.ToUpperInvariant(), "mk-tyohuone__tuoreetotsikko", Kirjasin.KoneLihava);
                foreach (var k in lista)
                {
                    string nimi = MiniJson.Teksti(k, "nimi"), versio = MiniJson.Teksti(k, "versio");
                    Teksti(rivi, string.IsNullOrEmpty(versio) ? nimi : nimi + " · " + versio, "mk-tyohuone__chip mk-tyohuone__chip--" + luokka);
                }
            }
        }

        /// <summary>Web piirraPoimintavienti: laitteen parit, valmis JS-lohko, Kopioi lohko ja Tyhjennä.</summary>
        static void Poimintavienti(VisualElement s)
        {
            var omat = PoimintaVarasto.Lue();
            var avaimet = omat.Where(kv => kv.Value.Count > 0).Select(kv => kv.Key).OrderBy(a => a, StringComparer.Ordinal).ToList();
            var kotelo = Rakenne.El("mk-tyohuone__vienti", s, PickingMode.Ignore);
            Teksti(kotelo, "Kopioi lohko tiedostoon js/packs/pollo-poiminnat.js. Vasta paketissa olevat parit näkyvät pelaajille — "
                + "laitteen omat parit näkyvät pillereinä vain kehittäjätilassa tällä laitteella. Jokainen tallennus lähtee "
                + "nykyään myös ehdotuskanavaan (tarkenne \"Pöllöpoiminta (kehittäjä)\"), joten kopiointi on varareitti — "
                + "Fable poimii parit kuratointijonosta.", "mk-tyohuone__periaate");
            if (avaimet.Count == 0)
            {
                Teksti(kotelo, "Ei tallennettuja poimintoja tällä laitteella. Avaa juttu, kysy Livialta ja paina vastauksen alla \"Tallenna juttuun\".", "mk-tyohuone__huomio");
                return;
            }
            foreach (var avain in avaimet)
            {
                Teksti(kotelo, avain, "mk-tyohuone__vientiavain", Kirjasin.Kone);
                foreach (var (kysymys, _) in omat[avain]) Teksti(kotelo, "— " + kysymys, "mk-tyohuone__vientipari");
            }
            string lohko = PoimintaVarasto.VientiLohko(omat);
            var l = Teksti(kotelo, lohko, "mk-tyohuone__lohko", Kirjasin.Kone);
            l.selection.isSelectable = true; // web pre: teksti on valittavissa, jos leikepöytä kieltäytyy
            var napit = Rakenne.El("mk-tyohuone__napit", kotelo, PickingMode.Ignore);
            Button kopioi = null;
            kopioi = Rakenne.Nappi("Kopioi lohko", "mk-tyohuone__nappi", () =>
            {
                GUIUtility.systemCopyBuffer = lohko;
                Lomake.Nimi(kopioi, "Kopioitu");
            }, napit);
            Kirjasimet.Aseta(kopioi, Kirjasin.Kone);
            var tyhjenna = Rakenne.Nappi("Tyhjennä", "mk-tyohuone__nappi", () =>
            {
                PoimintaVarasto.Tyhjenna();
                kotelo.Clear();
                Teksti(kotelo, "Laitteen poiminnat tyhjennetty.", "mk-tyohuone__huomio");
            }, napit);
            Kirjasimet.Aseta(tyhjenna, Kirjasin.Kone);
        }

        // --- Grafiikka (web lehti.js avaaGrafiikkaLehti): julistesuunnan tyylikoe -------------------------

        static readonly (string Id, string Nimi, string Kuvaus)[] Luonnokset =
        {
            ("istanbul", "Istanbul", "Hagia Sofia keskellä; ympärillä Sininen moskeija, Galata-torni, basaarin katot ja Kultaisen sarven "
                + "veneliikenne. Nimi osmaninturkiksi (thuluth)."),
            ("tokio", "Tokio", "Asakusan pagodi ja temppeliportti keskellä; ympärillä Shinbashin höyryjuna, machiya-puotirivi, "
                + "kaarisilta, kirsikkapuut ja Fuji horisontissa. Nimi kanjeilla."),
            ("pariisi", "Pariisi", "Eiffel-torni keskellä; ympärillä Notre-Dame, Riemukaari, Trocadéron kupolit, Seinen sillat, "
                + "bukinistit ja hevosomnibussit."),
        };

        const string GrafiikanEtusivu =
            "Kolme luonnosta uudesta julistesuunnasta (22.8.2026): pohjana omistajan antama esimerkkiprompti — "
            + "päämaamerkki keskellä, 4–6 tunnistettavaa kohdetta ympärillä, pienet mittakaavahahmot — mutta tyyli "
            + "vaihdettu pelin 1890-luvun kivipainoon ja tekstinä VAIN kaupungin nimi alkuperäiskielellä. Ei "
            + "mainostekstiä, jonka kuva voisi pettää.\n\nYksi luonnos sivua kohti; viimeisellä sivulla on käytetty "
            + "promptipohja. Kuvat ladataan ämpäristä täydessä koossa. Pelin palkintojulisteisiin ei ole koskettu.";

        const string GrafiikanPrompti =
            "Kaupunkikohtaiset kohdat hakasulkeissa; muu teksti on jokaisessa luonnoksessa sama.\n\nCreate a "
            + "premium vertical 4:5 travel poster of [CITY], designed as a beautiful miniature world in the manner "
            + "of a late 19th century stone lithograph.\n\nMake [MAIN LANDMARK] the dominant central feature, "
            + "surrounded by 4-6 other recognizable landmarks and local details of the era that instantly represent "
            + "the city: [LANDMARKS]. Add [GEOGRAPHY] as the geographical anchor. Include tiny period-appropriate "
            + "people, carriages, boats and street details to create scale and storytelling, while keeping the "
            + "composition clean and sophisticated with generous quiet sky.\n\nStyle, strictly: authentic 1890s "
            + "advertising lithograph a real printing house could have produced — disciplined, almost technical "
            + "lithographic linework, layered depth like a staged miniature scene, muted two-to-three colour stone "
            + "lithograph palette only (faded sepia, dull brick red, desaturated slate blue) on unbleached cream "
            + "paper; heavy paper grain, worn edges, slightly uneven ink coverage. No bright or saturated colour "
            + "anywhere.\n\nTypography: at the top, [CITY NAME IN LOCAL SCRIPT] — and NO OTHER TEXT ANYWHERE on the "
            + "poster. No country name, no tagline, no advertisement, no translations, no place-name labels on "
            + "water or streets, no engineering measurement lines or dimension annotations on buildings.\n\nAvoid: "
            + "photorealism, plastic or glossy CGI look, pastel colours, modern objects, distorted landmarks, any "
            + "text beyond the city name, any language other than the local one.";

        /// <summary>Etusivu, luonnos sivua kohti (ämpärin julisteet/&lt;id&gt;-luonnos.png) ja promptipohja.</summary>
        public static void AvaaGrafiikka()
        {
            if (!Sallittu) return;
            var sivut = new List<LehtiSivu>
            {
                Sivu("Grafiikka", null, false, new LehtiNosto { Otsikko = "Tyylikoe: pienoismaailma kivipainona", Teksti = GrafiikanEtusivu }),
            };
            foreach (var (id, nimi, kuvaus) in Luonnokset)
                sivut.Add(Sivu(nimi, null, false, new LehtiNosto
                {
                    Otsikko = nimi + " — luonnos", Teksti = "",
                    Kuva = new LehtiKuva { Lahde = Aanet.Juuri + "julisteet/" + id + "-luonnos.png", Lyhyt = kuvaus, Selite = kuvaus, LahdeRivi = "Matkakirjan oma paino" },
                }));
            sivut.Add(Sivu("Promptipohja", null, false, new LehtiNosto { Otsikko = "Generointiprompti (Gemini, gemini-3-pro-image)", Teksti = GrafiikanPrompti }));
            Lehti?.NaytaLiite("Grafiikka", sivut);
        }

        // --- Musiikki (web js/tyohuone-musiikki.js musiikkiSivut) ------------------------------------

        static readonly Dictionary<string, string> Osastot = new Dictionary<string, string>
        {
            ["siirtyma"] = "Siirtymämusiikki", ["linssi"] = "Linssit", ["paletti"] = "Musiikkipaletti",
            ["kaupunki"] = "Kaupunkiraidat", ["alue"] = "Alueraidat", ["tila"] = "Näkymien raidat", ["tehoste"] = "Tehosteet",
        };

        sealed class Raita { public string Id, Nimi, Osasto, Kaytto, Ampari, Oma; }

        // Web tarkistetut: raidan löytynyt osoite (null = puuttuu), kysytään kerran istunnossa.
        static readonly Dictionary<string, string> tarkistetut = new Dictionary<string, string>();

        /// <summary>Kolme sivua: siirtymät ja linssit (johdanto), paletti ja paikkaraidat, tehosteet ja tehostenimet.</summary>
        public static void AvaaMusiikki()
        {
            if (!Sallittu) return;
            HaeVienti(MusiikkiModuuli, e =>
            {
                if (e == null) return;
                var raidat = (Rakenne.Lista(MiniJson.Kentta(e, "MUSIIKKISIVUN_RAIDAT")) ?? new List<object>()).Select(Rakenne.Olio).Where(o => o != null)
                    .Select(o => new Raita
                    {
                        Id = MiniJson.Teksti(o, "id"), Nimi = MiniJson.Teksti(o, "nimi"), Osasto = MiniJson.Teksti(o, "osasto"),
                        Kaytto = MiniJson.Teksti(o, "kaytto"), Ampari = MiniJson.Teksti(o, "ampari"), Oma = MiniJson.Teksti(o, "oma"),
                    }).ToList();
                var sfx = Tekstit(MiniJson.Kentta(e, "SFX_NIMET"));
                Lehti?.NaytaLiite("Musiikki", new List<LehtiSivu>
                {
                    Sivu("Musiikki", s => MusiikkiSivu(s, raidat, new[] { "siirtyma", "linssi" }, true)),
                    Sivu("Paletti", s => MusiikkiSivu(s, raidat, new[] { "paletti", "kaupunki", "alue", "tila" })),
                    Sivu("Tehosteet", s => { MusiikkiSivu(s, raidat, new[] { "tehoste" }); SfxNapit(s, sfx); }),
                });
            });
        }

        static bool AanetPaalla => Asetukset.Paalla(Kytkin.Aanimaisema);

        static void MusiikkiSivu(VisualElement s, List<Raita> raidat, string[] osastot, bool johdanto = false)
        {
            if (johdanto)
            {
                Teksti(s, "Pelin musiikki yhdellä sivulla kuunneltavaksi. Jokainen rivi kertoo, mihin raitaa käytetään, mistä se "
                    + "haetaan ja löytyykö se. Yksi raita soi kerrallaan, ja soitto hiljentää äänimaiseman kuuntelun ajaksi. "
                    + "Puuttuva raita on normaali tila: peli jää sen kohdalla hiljaiseksi eikä virhettä synny.", "mk-lehti__johdanto", Kirjasin.LukuKursiivi);
                Teksti(s, "Raidat generoidaan ElevenLabs Music -APIlla (tools/generoi-siirtymamusiikki.mjs, generoi-musiikki.mjs), "
                    + "tehosteet tools/generoi-tehosteet.mjs; ajo Actionsissa.", "mk-tyohuone__huomio");
            }
            if (!AanetPaalla)
                Teksti(s, "Äänet ovat pois päältä (valikon Äänimaisema-kytkin, joka on myös koko pelin mykistys), joten soittonapit "
                    + "eivät ole käytössä. Rivit näkyvät silti: tila kysytään palvelimelta, mikä ei soita mitään.", "mk-tyohuone__huomio");
            foreach (var osasto in osastot)
            {
                var omat = raidat.Where(r => r.Osasto == osasto).ToList();
                if (omat.Count == 0) continue;
                Teksti(s, (Osastot.TryGetValue(osasto, out var n) ? n : osasto).ToUpperInvariant(), "mk-lehti__osasto", Kirjasin.Kone);
                foreach (var r in omat) RaitaRivi(s, r);
            }
        }

        /// <summary>Web raidanOsoitteet: ämpäri ensin, sitten repon oma tiedosto ämpärin audio/-kansiossa (aaniUrl).</summary>
        static IEnumerable<string> Osoitteet(Raita r)
        {
            if (!string.IsNullOrEmpty(r.Ampari)) yield return r.Ampari;
            if (!string.IsNullOrEmpty(r.Oma))
            {
                int i = r.Oma.IndexOf("assets/audio/", StringComparison.Ordinal);
                yield return i >= 0 ? Aanet.Juuri + "audio/" + r.Oma.Substring(i + "assets/audio/".Length) : r.Oma;
            }
        }

        static void RaitaRivi(VisualElement s, Raita r)
        {
            var rivi = Rakenne.El("mk-tyohuone__raita", s, PickingMode.Ignore);
            var yla = Rakenne.El("mk-tyohuone__raitanimi", rivi, PickingMode.Ignore);
            Teksti(yla, r.Nimi, "mk-tyohuone__rivinimi", Kirjasin.KoneLihava);
            var tila = Teksti(yla, "tarkistetaan…", "mk-tyohuone__raitatila", Kirjasin.Kone);
            Teksti(rivi, r.Kaytto, "mk-tyohuone__vientipari");
            if (!string.IsNullOrEmpty(r.Ampari)) Teksti(rivi, "ämpäri: " + r.Ampari, "mk-tyohuone__polku", Kirjasin.Kone);
            if (!string.IsNullOrEmpty(r.Oma)) Teksti(rivi, "oma: " + r.Oma, "mk-tyohuone__polku", Kirjasin.Kone);
            var napit = Rakenne.El("mk-tyohuone__napit", rivi, PickingMode.Ignore);
            void Valmis(string url)
            {
                if (rivi.panel == null) return;
                if (url == null) { tila.text = "puuttuu"; tila.AddToClassList("mk-tyohuone__raitatila--puuttuu"); return; }
                tila.text = "olemassa";
                tila.AddToClassList("mk-tyohuone__raitatila--olemassa");
                // Sama soitin kuin lehden kuuntelunapeissa: yksi ääni kerrallaan, toinen painallus pysäyttää.
                var b = Mediarivi.Kuuntele(napit, "Soita", url);
                b.SetEnabled(AanetPaalla);
                if (!AanetPaalla) b.tooltip = "Äänet ovat pois päältä (valikon Äänimaisema-kytkin).";
            }
            if (tarkistetut.TryGetValue(r.Id, out var tunnettu)) { Valmis(tunnettu); return; }
            UiKerros.Hae().StartCoroutine(Tarkista(Osoitteet(r).ToList(), url => { tarkistetut[r.Id] = url; Valmis(url); }));
        }

        /// <summary>Web tarkistaRaita: ensimmäinen osoite, joka vastaa (HEAD 2xx), tai null.</summary>
        static System.Collections.IEnumerator Tarkista(List<string> osoitteet, Action<string> valmis)
        {
            foreach (var url in osoitteet)
            {
                using var r = UnityEngine.Networking.UnityWebRequest.Head(url);
                r.timeout = 6;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success) { valmis(url); yield break; }
            }
            valmis(null);
        }

        /// <summary>Web piirraSfxNapit: pelin tehostenimet napeiksi (Aanet.Tehoste, ei hiljennä äänimaisemaa).</summary>
        static void SfxNapit(VisualElement s, List<string> nimet)
        {
            Teksti(s, "PELIN TEHOSTENIMET", "mk-lehti__osasto", Kirjasin.Kone);
            Teksti(s, "Aanet.Tehoste(nimi) (web sfx.play) — soittaa äänitteen tehostetaulusta; tuntematon nimi on hiljaisuus. "
                + "Nämä eivät kulje yllä olevan soittimen kautta eivätkä hiljennä äänimaisemaa: tehoste on lyhyt.", "mk-tyohuone__vientipari");
            if (!AanetPaalla) Teksti(s, "Äänet ovat pois päältä (valikon Äänimaisema-kytkin), joten napit eivät soita mitään.", "mk-tyohuone__huomio");
            var kotelo = Rakenne.El("mk-tyohuone__sfx", s, PickingMode.Ignore);
            foreach (var nimi in nimet)
            {
                string n = nimi;
                var b = Rakenne.Nappi(n, "mk-tyohuone__nappi", () => Aanet.Tehoste(n), kotelo);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
                b.SetEnabled(AanetPaalla);
            }
        }
    }
}
