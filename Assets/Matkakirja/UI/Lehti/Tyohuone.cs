// TYÖHUONE KEHITTÄJÄN LIITTEINÄ (Natiivi-UI): webin KOKEET-ryhmän Raamattu ja Kehittäjälehti
// (js/lehti.js avaaRaamattuLehti, avaaKehittajalehti, avaaTilanneLehti, avaaPoiminnatLehti;
// js/tyohuone-kehittajalehti.js; js/tyohuone-raamattu-muokkaus.js).
//
// Kaikki avautuu Lehtinakyma.NaytaLiite-arkille (kehittäjän liite) vain kehittäjätilassa. Data tulee
// sisältöpaketin moduuleista (Siirtoseppä, skeema 1.27, luokka "kehittaja"):
//   moduulit/js/tyohuone-raamattu.json  RAAMATTU { paivitetty, johdanto, osiot[{ otsikko, tila, kohdat[] }] }
//   moduulit/js/tyohuone-tilanne.json   TILANNE { paivitetty, tavoite, rivit[] }, TESTATTAVAA[], TUOREET
//
// Raamatun sivut ovat muokkauskenttiä: muutos elää istunnon luonnoksessa (web sessionStorage) ja lähtee
// "Lähetä muutokset" -napilla ehdotuskanavaan lajilla raamattu (Fable kuratoi). Kehittäjälehden rivit
// kutsuvat samoja avauksia kuin webin rivit; natiivissa ovat nyt Tilannelehti ja Poiminnat.
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

        static Lehtinakyma Lehti => UiNakymat.Olemassa ? UiNakymat.Hae().Lehti : null;

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

        static LehtiSivu Sivu(string otsikko, Action<VisualElement> rakenna = null, bool jatka = false, params LehtiNosto[] nostot)
        {
            var aihe = new LehtiAihe { Nimi = otsikko };
            aihe.Nostot.AddRange(nostot);
            return new LehtiSivu { Laji = LehtiSivuLaji.Aihe, Aihe = aihe, Otsikko = otsikko, Rakenna = rakenna, RakennaJatka = jatka };
        }

        static Label Teksti(VisualElement isa, string teksti, string luokka, Kirjasin kirjasin = Kirjasin.Luku)
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
            if (!Asetukset.Kehittaja) return;
            HaeVienti(RaamattuModuuli, e =>
            {
                var r = e != null ? Rakenne.Olio(MiniJson.Kentta(e, "RAAMATTU")) : null;
                if (r == null) return;
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
                }
                Lehti?.NaytaLiite("Raamattu", sivut);
            });
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

        // --- Kehittäjälehti (web avaaKehittajalehti, KEHITTAJALEHDEN_RIVIT) ---------------------------

        static readonly (string Nimi, string Kuvaus, string Ikoni, Action Avaa)[] Rivit =
        {
            ("Tilannelehti", "Kolmen session työnjako, testattavaa ja pöllöpoimintojen vienti.",
                "<path d=\"M4.5 5.5h15v13h-15z\"/><path d=\"M7.5 9h5.5M7.5 12h9M7.5 15h9\"/><path d=\"M16 9h.5\"/>", () => AvaaTilanne()),
            ("Poiminnat", "Oikotie Tilannelehden Pöllöpoiminnat-sivulle.",
                "<rect x=\"4.5\" y=\"9\" width=\"15\" height=\"6\" rx=\"3\"/><path d=\"M12 9v6\"/>", () => AvaaTilanne(2)),
        };

        public static void AvaaKehittajalehti()
        {
            if (!Asetukset.Kehittaja) return;
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
            if (!Asetukset.Kehittaja) return;
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
    }
}
