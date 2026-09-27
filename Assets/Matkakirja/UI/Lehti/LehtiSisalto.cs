// LEHDEN SISÄLTÖ (Natiivi-UI): kaupunki- ja maalehti sisältöpaketista (webin js/lehti.js
// rakennaSivut, js/maalehti.js; docs/moduulit/kaupunkilehti.md ja maalehti.md).
//
//   kaupunkilehdet  alkio {kaupunki, data: [aihe]}   aihe {id, nimi, otsikko?, johdanto,
//                   nostot[], tehtava?, kansikuvat?, avauskuvat?, ennenNyt?, matkailijalle?}
//   maalehdet       alkio {maa, data: [aihe]}        + lista (menovinkit)
// Kaupunkilehden sivut: 0 = etusivu (aihe "kaupunki"), 1 = "<Kaupunki> pintaa syvemmältä"
// (saman aiheen johdanto ja nostot), sitten muut aiheet data-järjestyksessä ja lopuksi maan
// Menovinkit, jos maalla on sellainen (web rakennaSivut — sähkeen sivulinkit nojaavat tähän
// järjestykseen). Maalehti: aiheet järjestyksessä (maa-etusivu tulee, kun maakartat ovat
// paketissa). Data luetaan toistaiseksi alkion data-kentästä (Siirtoseppä nostaa päätasolle
// skeemassa 1.13).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Kehittaja = kehittäjän liite (web avaaKehittajaLehti): synteettiset sivut, ei tehtäviä eikä reaktioita.</summary>
    public enum LehtiLaji { Kaupunki, Maa, Kehittaja }

    public sealed class LehtiKuva
    {
        public string Lahde, Lyhyt, Selite, LahdeRivi, Vuosi, Otsikko;
        /// <summary>Matkakirjan ihmeen kulmanauhan teksti (Nostokortti.Ihmenauha), muuten null.</summary>
        public string Nauha;
        /// <summary>Suurennoksen reaktiorivin tunniste ja otsikko (web teos.reaktio), muuten null.</summary>
        public string Reaktio, ReaktioOtsikko;
        /// <summary>Lähderivi linkkinä (web pollo-kuvalahde: "Kuva: Wikipedia — …" avaa artikkelin), muuten null.</summary>
        public string LahdeUrl;
    }

    public sealed class LehtiNosto
    {
        public string Otsikko, Teksti, Aika, Wiki, Leveys, Linkki, Nayte, NayteNimi, Musiikki, MusiikkiNimi;
        /// <summary>Web nosto.aani ("Kuuntele näyte"), nosto.esikuuntelu (Apple Musicin 30 s haku), nosto.linkkiNimi.</summary>
        public string Aani, Esikuuntelu, LinkkiNimi;
        /// <summary>Web nostonMusiikkilinkit: merkkijono = yksi Apple Music -linkki, lista = nimetyt linkit.</summary>
        public List<(string Url, string Nimi, string Otsake)> Musiikkilinkit = new List<(string, string, string)>();
        public LehtiKuva Kuva;
        public List<LehtiKuva> Galleria = new List<LehtiKuva>();
        /// <summary>Kehittäjän liitteen noston lisäosa tekstin perään (web nosto.toiminnot: napit, kentät), muuten null.</summary>
        public Action<VisualElement> Lisa;
    }

    public sealed class LehtiTehtava
    {
        public string Kysymys, Fakta;
        public List<string> Vaihtoehdot = new List<string>();
        public int Oikea;
    }

    public sealed class LehtiListaKohde
    {
        public string Nimi, Teksti, Linkki;
        public LehtiKuva Kuva;
    }

    public sealed class LehtiAihe
    {
        public string Id, Nimi, Otsikko, Johdanto;
        public List<LehtiNosto> Nostot = new List<LehtiNosto>();
        public LehtiTehtava Tehtava;
        public List<LehtiKuva> Kansikuvat = new List<LehtiKuva>(), Avauskuvat = new List<LehtiKuva>(), EnnenNyt = new List<LehtiKuva>();
        public string MatkailijalleKappale;
        public LehtiKuva MatkailijalleKuva;
        public List<(string Otsikko, List<LehtiListaKohde> Kohteet)> Lista = new List<(string, List<LehtiListaKohde>)>();
        /// <summary>Aihe on lainattu maalehdestä (Menovinkit kaupunkilehden lopussa): lippu otsikkoon.</summary>
        public string LainattuMaasta;
        /// <summary>Turistiopas (matkailijalle.artikkeli, taitto "opas") tai null.</summary>
        public OpasArtikkeli Opas;
    }

    /// <summary>Turistioppaan artikkeli (web kaupunkilehdet → kansi.matkailijalle.artikkeli, js/opas.js).</summary>
    public sealed class OpasArtikkeli
    {
        public string Kaupunki, Nimi, Teksti, Nosto, Lahde, ParasAika;
        public List<OpasJakso> Jaksot = new List<OpasJakso>();
        /// <summary>"Parasta täällä" (Tahdet 0–3) ja "Hyvä tietää" (Tahdet null).</summary>
        public List<OpasRivi> Parasta = new List<OpasRivi>(), HyvaTietaa = new List<OpasRivi>();
        public List<OpasKausi> Kaudet = new List<OpasKausi>();
        public List<(string Nimi, string Url)> Linkit = new List<(string, string)>();
    }

    public sealed class OpasJakso
    {
        public string Otsikko, Teksti;
        public List<LehtiKuva> Kuvat = new List<LehtiKuva>();
        /// <summary>Ensimmäisen kuvan asettelu "kapea": kuva kelluu oikealla 40 %.</summary>
        public bool Kapea;
    }

    public sealed class OpasRivi { public string Nimi, Selite; public int? Tahdet; }

    public sealed class OpasKausi { public string Nimi, Kk, Lampotila, Kuvaus; }

    /// <summary>MaaEtusivu = maan korkokartta ja perustiedot, Numeroina = "Maa numeroina" (skeema 1.15+ sivut).</summary>
    public enum LehtiSivuLaji { Etusivu, Aihe, MaaEtusivu, Numeroina }

    public sealed class LehtiSivu
    {
        public LehtiSivuLaji Laji;
        public LehtiAihe Aihe;
        /// <summary>Sivun otsikko (aihe-nimi) ja lyhyt nimi alapalkin nuoliin.</summary>
        public string Otsikko, Lyhyt;
        /// <summary>Minitehtävän avain Kaupat.Minitehtava(kaupunki, aihe): kaupunkilehdessä aiheId, maalehdessä ISO:aiheId.</summary>
        public string TehtavaAihe;
        /// <summary>
        /// Kehittäjän liitteen sivun oma piirto (web sivu.rakenna): korvaa nostot, ellei RakennaJatka (web
        /// rakennaJatka), jolloin nostot piirretään sen perään.
        /// </summary>
        public Action<VisualElement> Rakenna;
        public bool RakennaJatka;
    }

    public sealed class Lehti
    {
        public LehtiLaji Laji;
        public string Omistaja, Nimi, Maa, MaaNimi;
        public List<LehtiSivu> Sivut = new List<LehtiSivu>();
        public string Johdanto;   // kaupungin esittely etusivulle (UiSisalto)
    }

    public static class LehtiSisalto
    {
        static Dictionary<string, List<object>> kaupungit, maat;
        static readonly Dictionary<string, List<string>> maaSivut = new Dictionary<string, List<string>>();
        static bool haussa;

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static string T(Dictionary<string, object> o, string k) => MiniJson.Teksti(o, k);

        public static IEnumerator Hae(LehtiLaji laji, string omistaja, Action<Lehti> valmis)
        {
            while (haussa) yield return null;
            if (kaupungit == null || maat == null)
            {
                haussa = true;
                string k = null, m = null;
                yield return Sisalto.HaeTeksti("kaupunkilehdet", t => k = t, valinnainen: true);
                yield return Sisalto.HaeTeksti("maalehdet", t => m = t, valinnainen: true);
                // Jäsennys taustasäikeessä: kaupunkilehdet on 3,7–11 Mt, ja pääsäikeessä se pysäytti
                // ruudun (Natiivisepän mittaus: kaupunkikortin avaus 23.9.).
                Dictionary<string, List<object>> ka = null, ma = null;
                var ms = new Dictionary<string, List<string>>();
                var tehtava = System.Threading.Tasks.Task.Run(() => { ka = Taulu(k, "kaupunki"); ma = Taulu(m, "maa", ms); });
                while (!tehtava.IsCompleted) yield return null;
                foreach (var kv in ms) maaSivut[kv.Key] = kv.Value;
                kaupungit = ka ?? new Dictionary<string, List<object>>();
                maat = ma ?? new Dictionary<string, List<object>>();
                haussa = false;
            }
            bool kaupunkiValmis = false;
            UiSisalto.Lataa(() => kaupunkiValmis = true);
            while (!kaupunkiValmis) yield return null;
            valmis(laji == LehtiLaji.Kaupunki ? Kaupunkilehti(omistaja) : Maalehti(omistaja?.ToUpperInvariant()));
        }

        static Dictionary<string, List<object>> Taulu(string json, string avain, Dictionary<string, List<string>> sivut = null)
        {
            var t = new Dictionary<string, List<object>>();
            try
            {
                foreach (var a in Rakenne.Lista(MiniJson.Kentta(Ob(MiniJson.Jasenna(json ?? "{}")), "alkiot")) ?? new List<object>())
                {
                    var o = Ob(a);
                    string id = T(o, avain) ?? T(o, "id");
                    // Päätaso ensin (skeema 1.26+, 2.0): aiheet + kansi, ja vain päätasolla ovat mm. aiheen tehtava,
                    // lista ja sivunOtsikko (v40: 332 / 581 aihetta). Raaka data vain varana Paataso-reitin kautta.
                    var aiheet = PaatasonAiheet(o) ?? Rakenne.Lista(Paataso.RaakaArvo(o));
                    if (id != null && aiheet != null) t[id] = aiheet;
                    // Skeema 1.15: sivujärjestys (maa-etusivu, aiheet, maa-numeroina).
                    if (sivut != null && id != null && Rakenne.Lista(MiniJson.Kentta(o, "sivut")) is List<object> sl)
                        sivut[id] = sl.OfType<string>().ToList();
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui lehti: " + e.Message); }
            return t;
        }

        /// <summary>
        /// Skeema 2.0 (Siirtosepän kenttäkartta 24.9.2026): ei data-kenttää; aiheet ovat päätasolla, ja kaupunkiaiheen
        /// kuvat ovat alkion kansi-oliossa (kansi.kansikuvat, avauskuvat, ennenNyt, matkailijalle). Kansi yhdistetään
        /// kaupunkiaiheeseen (tai luodaan sellainen), jotta etusivu ja turistiopas lukevat sen kuten raa'asta datasta.
        /// </summary>
        static List<object> PaatasonAiheet(Dictionary<string, object> alkio)
        {
            var aiheet = Rakenne.Lista(MiniJson.Kentta(alkio, "aiheet"));
            var kansi = Ob(MiniJson.Kentta(alkio, "kansi"));
            if (aiheet == null || kansi == null) return aiheet;
            var tulos = new List<object>(aiheet.Count + 1);
            bool loytyi = false;
            foreach (var a in aiheet)
            {
                var ao = Ob(a);
                if (ao != null && T(ao, "id") == "kaupunki")
                {
                    var yhdistetty = new Dictionary<string, object>(ao);
                    foreach (var kv in kansi) if (!yhdistetty.ContainsKey(kv.Key) || yhdistetty[kv.Key] == null) yhdistetty[kv.Key] = kv.Value;
                    tulos.Add(yhdistetty);
                    loytyi = true;
                }
                else tulos.Add(a);
            }
            if (!loytyi)
            {
                var uusi = new Dictionary<string, object>(kansi) { ["id"] = "kaupunki" };
                tulos.Insert(0, uusi);
            }
            return tulos;
        }

        public static bool OnKaupunkilehti(string kaupunki) => kaupungit != null && kaupunki != null && kaupungit.ContainsKey(kaupunki);

        /// <summary>
        /// Lehden nostojen otsikot raakadatasta (web sisaltohakemisto: MAA_KATEGORIAT / KULTTUURI_KATEGORIAT
        /// → nostot[].otsikko) pöllön sähkehakemistoon. Tyhjä, jos lehtiä ei ole vielä haettu (Hae).
        /// </summary>
        public static List<string> NostoOtsikot(LehtiLaji laji, string omistaja)
        {
            var tulos = new List<string>();
            var taulu = laji == LehtiLaji.Kaupunki ? kaupungit : maat;
            if (taulu == null || omistaja == null || !taulu.TryGetValue(omistaja, out var aiheet)) return tulos;
            foreach (var a in aiheet)
                foreach (var n in Rakenne.Lista(MiniJson.Kentta(Ob(a), "nostot")) ?? new List<object>())
                    if (T(Ob(n), "otsikko") is string o && o.Length > 0) tulos.Add(o);
            return tulos;
        }

        static Lehti Kaupunkilehti(string kaupunki)
        {
            if (kaupunki == null || kaupungit == null || !kaupungit.TryGetValue(kaupunki, out var data)) return null;
            var k = UiSisalto.Kaupunki(kaupunki);
            var l = new Lehti
            {
                Laji = LehtiLaji.Kaupunki, Omistaja = kaupunki, Nimi = k?.Nimi ?? kaupunki,
                Maa = k?.Maa, MaaNimi = k?.MaaNimi, Johdanto = k?.Johdanto,
            };
            var aiheet = data.Select(Ob).Where(x => x != null).Select(Aihe).ToList();
            var kansi = aiheet.FirstOrDefault(a => a.Id == "kaupunki");
            if (kansi != null)
            {
                l.Sivut.Add(new LehtiSivu { Laji = LehtiSivuLaji.Etusivu, Aihe = kansi, Otsikko = l.Nimi, Lyhyt = "Etusivu" });
                l.Sivut.Add(new LehtiSivu
                {
                    Laji = LehtiSivuLaji.Aihe, Aihe = kansi, TehtavaAihe = kansi.Id,
                    Otsikko = kansi.Otsikko ?? l.Nimi + " pintaa syvemmältä", Lyhyt = kansi.Nimi ?? l.Nimi,
                });
            }
            foreach (var a in aiheet.Where(a => a != kansi))
                l.Sivut.Add(new LehtiSivu { Laji = LehtiSivuLaji.Aihe, Aihe = a, TehtavaAihe = a.Id, Otsikko = a.Otsikko ?? a.Nimi, Lyhyt = a.Nimi });
            // Maan Menovinkit viimeiseksi (lainattu maalehdestä, lipun kanssa).
            if (l.Maa != null && maat != null && maat.TryGetValue(l.Maa, out var maaData))
            {
                var mv = maaData.Select(Ob).Where(x => x != null && T(x, "id") == "menovinkit").Select(Aihe).FirstOrDefault();
                if (mv != null)
                {
                    mv.LainattuMaasta = l.Maa;
                    l.Sivut.Add(new LehtiSivu { Laji = LehtiSivuLaji.Aihe, Aihe = mv, TehtavaAihe = l.Maa + ":" + mv.Id, Otsikko = mv.Otsikko ?? mv.Nimi, Lyhyt = mv.Nimi });
                }
            }
            return l.Sivut.Count > 0 ? l : null;
        }

        static Lehti Maalehti(string iso)
        {
            if (iso == null || maat == null || !maat.TryGetValue(iso, out var data)) return null;
            var m = UiSisalto.Maa(iso);
            var l = new Lehti { Laji = LehtiLaji.Maa, Omistaja = iso, Maa = iso, Nimi = m?.Nimi ?? iso, MaaNimi = m?.Nimi };
            var aiheet = data.Select(Ob).Where(x => x != null).Select(Aihe).ToList();
            foreach (var a in aiheet) a.LainattuMaasta = iso;
            LehtiSivu AiheSivu(LehtiAihe a) =>
                new LehtiSivu { Laji = LehtiSivuLaji.Aihe, Aihe = a, TehtavaAihe = iso + ":" + a.Id, Otsikko = a.Otsikko ?? a.Nimi, Lyhyt = a.Nimi };
            if (maaSivut.TryGetValue(iso, out var jarjestys) && jarjestys.Count > 0)
            {
                // Webin sivut: maan etusivu (korkokartta), aiheet ja "Maa numeroina" (js/maalehti.js).
                foreach (var id in jarjestys)
                {
                    if (id == "maa-etusivu" && m?.KarttaUrl != null)
                        l.Sivut.Add(new LehtiSivu { Laji = LehtiSivuLaji.MaaEtusivu, Aihe = new LehtiAihe { Id = id }, Otsikko = l.Nimi, Lyhyt = l.Nimi });
                    else if (id == "maa-numeroina" && m?.Numeroina != null)
                    {
                        string ots = MiniJson.Teksti(m.Numeroina, "otsikko") ?? l.Nimi + " numeroina";
                        l.Sivut.Add(new LehtiSivu { Laji = LehtiSivuLaji.Numeroina, Aihe = new LehtiAihe { Id = id }, Otsikko = ots, Lyhyt = ots });
                    }
                    else if (aiheet.FirstOrDefault(a => a.Id == id) is LehtiAihe a) l.Sivut.Add(AiheSivu(a));
                }
                // Järjestyksestä puuttuvat aiheet loppuun, ettei mitään katoa.
                foreach (var a in aiheet) if (!jarjestys.Contains(a.Id)) l.Sivut.Add(AiheSivu(a));
            }
            else foreach (var a in aiheet) l.Sivut.Add(AiheSivu(a));
            return l.Sivut.Count > 0 ? l : null;
        }

        /// <summary>Maalehden sivun indeksi aiheen id:llä (web maalehdenSivunumero), muuten 0.</summary>
        public static int SivuAiheelle(Lehti l, string aihe)
        {
            if (l == null || string.IsNullOrEmpty(aihe)) return 0;
            int i = l.Sivut.FindIndex(s => s.Laji == LehtiSivuLaji.Aihe && s.Aihe.Id == aihe);
            return Math.Max(0, i);
        }

        /// <summary>Yksittäinen nosto (esim. maakartan nosto) samalla jäsennyksellä kuin aiheiden nostot.</summary>
        public static LehtiNosto Nosto(Dictionary<string, object> n) =>
            n == null ? null : Aihe(new Dictionary<string, object> { ["nostot"] = new List<object> { n } }).Nostot.FirstOrDefault();

        static LehtiAihe Aihe(Dictionary<string, object> o)
        {
            var a = new LehtiAihe
            {
                Id = T(o, "id"), Nimi = T(o, "nimi"), Otsikko = T(o, "otsikko"), Johdanto = T(o, "johdanto"),
            };
            foreach (var n in (Rakenne.Lista(MiniJson.Kentta(o, "nostot")) ?? new List<object>()).Select(Ob).Where(x => x != null))
            {
                var nosto = new LehtiNosto
                {
                    // Tyypitetyssä (1.15) muodossa wiki, linkki, näyte ja kuva ovat olioita.
                    Otsikko = T(n, "otsikko"), Teksti = T(n, "teksti"), Aika = T(n, "aika"),
                    Wiki = T(n, "wiki") ?? T(Ob(MiniJson.Kentta(n, "wiki")), "otsikko"),
                    Leveys = T(n, "leveys"), Linkki = T(n, "linkki") ?? T(Ob(MiniJson.Kentta(n, "linkki")), "url"),
                    Nayte = T(n, "musiikkiNayte") ?? T(Ob(MiniJson.Kentta(n, "musiikkiNayte")), "url"),
                    NayteNimi = T(n, "musiikkiNayteNimi") ?? T(Ob(MiniJson.Kentta(n, "musiikkiNayte")), "nimi"),
                    Musiikki = T(n, "musiikki"), MusiikkiNimi = T(n, "musiikkiNimi"),
                    Kuva = Kuva(n) ?? Kuva(Ob(MiniJson.Kentta(n, "kuva"))),
                    Aani = T(n, "aani") ?? T(Ob(MiniJson.Kentta(n, "aani")), "url"),
                    Esikuuntelu = T(n, "esikuuntelu"),
                    LinkkiNimi = T(n, "linkkiNimi") ?? T(Ob(MiniJson.Kentta(n, "linkki")), "nimi"),
                };
                if (nosto.Musiikki != null) nosto.Musiikkilinkit.Add((nosto.Musiikki, "Apple Music", nosto.MusiikkiNimi));
                else foreach (var m in (Rakenne.Lista(MiniJson.Kentta(n, "musiikki")) ?? new List<object>()).Select(Ob).Where(x => x != null))
                    if (T(m, "url") is string mu && mu.Length > 0)
                        nosto.Musiikkilinkit.Add((mu, T(m, "nimi") ?? "Apple Music", T(m, "otsake") ?? ((T(m, "nimi") ?? "") + " Apple Musicissa").Trim()));
                foreach (var g in (Rakenne.Lista(MiniJson.Kentta(n, "galleria")) ?? new List<object>()).Select(Ob).Where(x => x != null))
                    if (Kuva(g) is LehtiKuva gk) nosto.Galleria.Add(gk);
                a.Nostot.Add(nosto);
            }
            var t = Ob(MiniJson.Kentta(o, "tehtava"));
            if (t != null && Rakenne.Lista(MiniJson.Kentta(t, "vaihtoehdot")) is List<object> vv && vv.Count > 0)
            {
                a.Tehtava = new LehtiTehtava { Kysymys = T(t, "kysymys"), Fakta = T(t, "fakta"), Vaihtoehdot = vv.Select(x => x?.ToString() ?? "").ToList() };
                var oikea = MiniJson.Kentta(t, "oikea");
                a.Tehtava.Oikea = oikea is string os ? Math.Max(0, a.Tehtava.Vaihtoehdot.IndexOf(os)) : (int)(MiniJson.Luku(t, "oikea") ?? 0);
            }
            Kuvat(MiniJson.Kentta(o, "kansikuvat"), a.Kansikuvat);
            Kuvat(MiniJson.Kentta(o, "avauskuvat"), a.Avauskuvat);
            Kuvat(MiniJson.Kentta(o, "ennenNyt"), a.EnnenNyt);
            var mk = Ob(MiniJson.Kentta(o, "matkailijalle"));
            if (mk != null)
            {
                a.MatkailijalleKappale = T(mk, "kappale");
                a.MatkailijalleKuva = Kuva(Ob(MiniJson.Kentta(mk, "kuva")));
                a.Opas = Opas(Ob(MiniJson.Kentta(mk, "artikkeli")));
            }
            foreach (var r in (Rakenne.Lista(MiniJson.Kentta(o, "lista")) ?? new List<object>()).Select(Ob).Where(x => x != null))
            {
                var kohteet = new List<LehtiListaKohde>();
                foreach (var k in (Rakenne.Lista(MiniJson.Kentta(r, "kohteet")) ?? new List<object>()).Select(Ob).Where(x => x != null))
                    kohteet.Add(new LehtiListaKohde { Nimi = T(k, "nimi"), Teksti = T(k, "teksti"), Linkki = T(k, "linkki"), Kuva = Kuva(k) ?? Kuva(Ob(MiniJson.Kentta(k, "kuva"))) });
                a.Lista.Add((T(r, "otsikko"), kohteet));
            }
            return a;
        }

        static List<Dictionary<string, object>> Oliot(object arvo) =>
            (Rakenne.Lista(arvo) ?? new List<object>()).Select(Ob).Where(x => x != null).ToList();

        static OpasArtikkeli Opas(Dictionary<string, object> o)
        {
            if (o == null || string.IsNullOrEmpty(T(o, "teksti"))) return null;
            var a = new OpasArtikkeli { Nimi = T(o, "nimi"), Teksti = T(o, "teksti"), Nosto = T(o, "nosto"), Lahde = T(o, "lahde") };
            foreach (var j in Oliot(MiniJson.Kentta(o, "jaksot")))
            {
                var jakso = new OpasJakso { Otsikko = T(j, "otsikko"), Teksti = T(j, "teksti") };
                var kv = MiniJson.Kentta(j, "kuva");
                var kuvat = Rakenne.Lista(kv) != null ? Oliot(kv) : (Ob(kv) is Dictionary<string, object> yksi ? new List<Dictionary<string, object>> { yksi } : new List<Dictionary<string, object>>());
                foreach (var k in kuvat) if (Kuva(k) is LehtiKuva lk) jakso.Kuvat.Add(lk);
                jakso.Kapea = kuvat.Count > 0 && T(kuvat[0], "asettelu") == "kapea";
                a.Jaksot.Add(jakso);
            }
            var m = Ob(MiniJson.Kentta(o, "matkailu"));
            if (m != null)
            {
                a.ParasAika = T(m, "parasAika");
                foreach (var x in Oliot(MiniJson.Kentta(m, "parasta")))
                    a.Parasta.Add(new OpasRivi { Nimi = T(x, "mita"), Selite = T(x, "selite"), Tahdet = (int)Math.Round(MiniJson.Luku(x, "tahdet") ?? 0) });
                foreach (var x in Oliot(MiniJson.Kentta(m, "hyvaTietaa")))
                    a.HyvaTietaa.Add(new OpasRivi { Nimi = T(x, "otsikko"), Selite = T(x, "teksti") });
                foreach (var x in Oliot(MiniJson.Kentta(m, "kaudet")))
                    a.Kaudet.Add(new OpasKausi { Nimi = T(x, "nimi"), Kk = T(x, "kk"), Lampotila = T(x, "lampotila"), Kuvaus = T(x, "kuvaus") });
                foreach (var x in Oliot(MiniJson.Kentta(m, "linkit")))
                    if (T(x, "url") is string url) a.Linkit.Add((T(x, "nimi") ?? url, url));
            }
            return a;
        }

        static readonly Dictionary<string, OpasArtikkeli> oppaat = new Dictionary<string, OpasArtikkeli>();
        static readonly Dictionary<string, LehtiKuva> oppaidenKuvat = new Dictionary<string, LehtiKuva>();

        /// <summary>Kansiaiheen matkailijalle.kuva (avauskortin turisti-info, web kaupunginMatkailijalle().kuva), HaeOpas-kutsun jälkeen.</summary>
        public static LehtiKuva OppaanKuva(string kaupunki) =>
            kaupunki != null && oppaidenKuvat.TryGetValue(kaupunki, out var k) ? k : null;

        /// <summary>
        /// Kaupungin turistiopas (null = ei opasta). Lataa kaupunkilehdet tarvittaessa. Jäsentää vain
        /// kansiaiheen matkailijalle-kentän (ei koko lehteä) ja muistaa tuloksen: kaupunkikortti kysyy
        /// tätä jokaisella avauksella.
        /// </summary>
        public static void HaeOpas(string kaupunki, Action<OpasArtikkeli> valmis)
        {
            if (kaupunki != null && oppaat.TryGetValue(kaupunki, out var muistettu)) { valmis(muistettu); return; }
            UiKerros.Hae().StartCoroutine(HaeOpasReitti(kaupunki, valmis));
        }

        static IEnumerator HaeOpasReitti(string kaupunki, Action<OpasArtikkeli> valmis)
        {
            // Sama latausreitti kuin lehdellä, mutta ilman lehden rakentamista.
            yield return Hae(LehtiLaji.Kaupunki, null, _ => { });
            OpasArtikkeli o = null;
            if (kaupunki != null && kaupungit != null && kaupungit.TryGetValue(kaupunki, out var data))
            {
                var kansi = data.Select(Ob).FirstOrDefault(x => x != null && T(x, "id") == "kaupunki");
                var mk = Ob(MiniJson.Kentta(kansi, "matkailijalle"));
                o = Opas(Ob(MiniJson.Kentta(mk, "artikkeli")));
                if (o != null) o.Kaupunki = kaupunki;
                oppaidenKuvat[kaupunki] = Kuva(Ob(MiniJson.Kentta(mk, "kuva")));
            }
            if (kaupunki != null) oppaat[kaupunki] = o;
            valmis(o);
        }

        static void Kuvat(object arvo, List<LehtiKuva> kohde)
        {
            foreach (var x in (Rakenne.Lista(arvo) ?? new List<object>()).Select(Ob).Where(x => x != null))
                if (Kuva(x) is LehtiKuva k) kohde.Add(k);
        }

        static LehtiKuva Kuva(Dictionary<string, object> o)
        {
            if (o == null) return null;
            // Skeema 1.15 (tyypitetty kuva): url on valmis CDN-osoite, arvo media.jsonin avain.
            string lahde = T(o, "url") ?? T(o, "tiedosto") ?? T(o, "osoite") ?? T(o, "ampari") ?? T(o, "arvo");
            if (string.IsNullOrEmpty(lahde)) return null;
            return new LehtiKuva
            {
                Lahde = lahde, Lyhyt = T(o, "lyhyt") ?? T(o, "selite"), Selite = T(o, "selite") ?? T(o, "lyhyt"),
                LahdeRivi = T(o, "lahde"), Vuosi = T(o, "vuosi"), Otsikko = T(o, "otsikko"),
            };
        }
    }
}
