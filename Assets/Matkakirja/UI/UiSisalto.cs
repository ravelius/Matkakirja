// UI:N SISÄLTÖ: kaupunkikortin näyttödata sisältöpaketista (Natiivi-UI, erä 2).
//
// Lukee Natiivisepän Sisalto.HaeTeksti-reitillä (sama osoitin, versiokansio ja
// laitevälimuisti) kokoelmat kaupungit, kaupunkilehdet (3,7 Mt), julisteet ja
// lippumaat, jäsentää ne taustasäikeessä MiniJsonilla ja pitää muistissa vain
// kortin tarvitsemat kentät. Pelilogiikkaan ei kosketa.
//   kaupungit      id → nimi, maa (ISO3)
//   kaupunkilehdet kaupunki → kategoria "kaupunki": johdanto, kansikuvat[0..], muut aiheet
//   julisteet      kaupunki → tuotantojuliste (tiedosto, otsikko)
//   lippumaat      ISO3 → nimi, lippu (url + varat)
//   maat           ISO3 → oma nimi, valtiomuoto 1873, tunnusluvut, tervehdykset, maalehden aiheet
//                  (Siirtosepän kokoelma skeemasta 1.9 alkaen; puuttuessa kartuscha näyttää vain nimen)
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiTiedot
    {
        public string Id, Nimi, Maa, MaaNimi, Johdanto;
        /// <summary>Wikipedia-otsikko (city.wiki) ja etusivun esittely (web ARTIKKELIT[wiki ?? nimi].intro, paketissa intro.teksti).</summary>
        public string Wiki, Intro;
        public double Lat = double.NaN, Lon = double.NaN;
        /// <summary>Lipun osoitteet järjestyksessä (url, varat).</summary>
        public List<string> Lippu = new List<string>();
        public List<Kuvateksti> Kansikuvat = new List<Kuvateksti>();
        /// <summary>Lehden avauskuvat (saapumistraileri); tyhjä = kansikuvat.</summary>
        public List<Kuvateksti> Avauskuvat = new List<Kuvateksti>();
        /// <summary>Kaupungin iskulause (saapumispuheet.slogan), tai null.</summary>
        public string Iskulause;
        /// <summary>Lehden muut aiheet ("Nykytaide", "Luonto" …) lehden sisällysluetteloon.</summary>
        public List<string> Aiheet = new List<string>();
        public string JulisteTiedosto, JulisteOtsikko;
        /// <summary>Maanosa (kaupungit.manner: europe, middleeast, africa, asia, northamerica, southamerica, oceania).</summary>
        public string Manner;
        /// <summary>Onko kaupungilla oma kaupunkilehti (kategoria "kaupunki").</summary>
        public bool Lehti;
        /// <summary>Kaupungissa nauhoitettu kielinäyte (kaupungit.kielinayte: url, nimi), radion vara lehden mediarivillä.</summary>
        public string KielinayteUrl, KielinayteNimi;
    }

    public sealed class MaaTiedot
    {
        public string Iso3, Nimi, Paikallinen, Valtiomuoto, Maalehti;
        public List<string> Lippu = new List<string>();
        /// <summary>Tunnusluvut (null = maalla ei tietoja).</summary>
        public string Vakiluku, VakilukuSija, PintaAla, PintaAlaSija, Demokratia, DemokratiaSija, Keskitulo, KeskituloSija;
        public List<(string Teksti, string Kieli, string Lippu, string Osuus)> Tervehdykset = new List<(string, string, string, string)>();
        public List<(string Id, string Nimi)> Aiheet = new List<(string, string)>();
        /// <summary>V-Demin selitys ja lähdelinkki (web naytaVdemInfo).</summary>
        public string DemokratiaSelitys, DemokratiaLinkki;
        /// <summary>Skeema 1.15+: maan korkokartta etusivulle (null = ei maa-etusivua).</summary>
        public string KarttaUrl, KarttaLahde;
        public List<(string Nimi, float X, float Y, bool Paa)> KarttaKaupungit = new List<(string, float, float, bool)>();
        /// <summary>Kartan nosto (raaka nosto-olio, LehtiSisalto.Nosto).</summary>
        public Dictionary<string, object> KarttaNosto;
        /// <summary>Skeema 1.15+: "Maa numeroina" -sivun tekstit (raaka olio, MaaNumeroina.Rakenna).</summary>
        public Dictionary<string, object> Numeroina;
        /// <summary>Skeema 1.15+: lipun tarina (web LIPPUTIEDOT: maa, symboliikka, kappaleet, versiot).</summary>
        public Dictionary<string, object> Lipputarina;
        public bool OnTiedot => Vakiluku != null || PintaAla != null || Demokratia != null || Keskitulo != null || Tervehdykset.Count > 0;
    }

    public sealed class Kuvateksti
    {
        public string Tiedosto, Lyhyt, Selite, Lahde;
    }

    /// <summary>Tuotantojuliste (kokoelma julisteet): galleria ja laukku.</summary>
    public sealed class JulisteTiedot
    {
        public string Id, Kaupunki, KaupunkiNimi, Tiedosto, Otsikko, Lyhyt, Selite;
        /// <summary>Skeema 1.20: Tiedosto on kuva.url (täysi osoite); vanhempi paketti: polku julisteet/-juuren alla.</summary>
        public string Url => string.IsNullOrEmpty(Tiedosto) ? null
            : Tiedosto.StartsWith("https://") || Tiedosto.StartsWith("http://") ? Tiedosto
            : "https://media.matkakirja.app/julisteet/" + Tiedosto;
    }

    public static class UiSisalto
    {
        /// <summary>Kaikki julisteet paketin järjestyksessä (tyhjä, kunnes ladattu).</summary>
        public static IReadOnlyList<JulisteTiedot> Julisteet => JulisteLista ?? (IReadOnlyList<JulisteTiedot>)new JulisteTiedot[0];
        static List<JulisteTiedot> JulisteLista;
        static Dictionary<string, KaupunkiTiedot> kaupungit;
        static Dictionary<string, MaaTiedot> maat = new Dictionary<string, MaaTiedot>();
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        public static bool Valmis => kaupungit != null;

        /// <summary>Kaupungin tiedot, tai null (ei vielä ladattu tai tuntematon).</summary>
        public static KaupunkiTiedot Kaupunki(string id) =>
            id != null && kaupungit != null && kaupungit.TryGetValue(id, out var k) ? k : null;

        /// <summary>Kaikki kaupungit (tyhjä, kunnes ladattu).</summary>
        public static IEnumerable<KaupunkiTiedot> Kaikki => kaupungit != null ? kaupungit.Values : (IEnumerable<KaupunkiTiedot>)new KaupunkiTiedot[0];

        /// <summary>Maan tiedot ISO3-koodilla, tai null.</summary>
        public static MaaTiedot Maa(string iso3) =>
            iso3 != null && maat.TryGetValue(iso3, out var m) ? m : null;

        /// <summary>Lataa (kerran) ja kutsuu valmis pääsäikeessä. Epäonnistuessa Valmis = false.</summary>
        public static void Lataa(Action valmis)
        {
            if (Valmis) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Hae());
        }

        static IEnumerator Hae()
        {
            string kaup = null, lehdet = null, julisteet = null, liput = null;
            yield return Sisalto.HaeTeksti("kaupungit", t => kaup = t);
            yield return Sisalto.HaeTeksti("kaupunkilehdet", t => lehdet = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("julisteet", t => julisteet = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("lippumaat", t => liput = t, valinnainen: true);
            string maaTeksti = null, puheet = null;
            yield return Sisalto.HaeTeksti("maat", t => maaTeksti = t, valinnainen: true);
            yield return Sisalto.HaeTeksti("saapumispuheet", t => puheet = t, valinnainen: true);
            if (kaup == null)
            {
                Debug.LogWarning("MATKAKIRJA ui sisältö: kaupungit-kokoelmaa ei saatu");
                Valmistu(null);
                yield break;
            }
            Task.Run(() =>
            {
                Dictionary<string, KaupunkiTiedot> tulos = null;
                try
                {
                    tulos = Jasenna(kaup, lehdet, julisteet, liput);
                    JasennaMaat(maaTeksti, tulos);
                    foreach (var a in Alkiot(puheet))
                    {
                        var id = MiniJson.Teksti(a, "kaupunki") ?? MiniJson.Teksti(a, "id");
                        // Päätaso ensin (skeema 1.26 iskulause), raaka data vain Paatason kautta (Paataso.Saapumispuhe).
                        string isku = MiniJson.Teksti(a, "iskulause") ?? MiniJson.Teksti(Paataso.Raaka(a), "slogan");
                        if (id != null && isku != null && tulos.TryGetValue(id, out var kt)) kt.Iskulause = isku;
                    }
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui sisältö: jäsennys epäonnistui: " + e.Message); }
                UiKerros.PaaSaikeessa(() => Valmistu(tulos));
            });
        }

        static void Valmistu(Dictionary<string, KaupunkiTiedot> tulos)
        {
            kaupungit = tulos;
            haussa = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var k in kutsut) { try { k(); } catch (Exception e) { Debug.LogException(e); } }
        }

        static IEnumerable<Dictionary<string, object>> Alkiot(string teksti)
        {
            if (string.IsNullOrEmpty(teksti)) yield break;
            var juuri = Rakenne.Olio(MiniJson.Jasenna(teksti));
            var alkiot = juuri != null ? Rakenne.Lista(MiniJson.Kentta(juuri, "alkiot")) : null;
            if (alkiot == null) yield break;
            foreach (var a in alkiot) { var o = Rakenne.Olio(a); if (o != null) yield return o; }
        }

        static void LueKuvat(List<object> kuvat, List<Kuvateksti> kohde)
        {
            if (kuvat == null) return;
            foreach (var ku in kuvat)
            {
                var o = Rakenne.Olio(ku);
                // tiedosto = Commons-nimi, ampari = pelin oma kuva julisteet/-kansiossa (Kuvat.Reitit).
                // Skeema 1.26 (kansi.kansikuvat): url valmiina ämpäriin; vanha muoto: Commons-nimi.
                var tiedosto = o != null ? (MiniJson.Teksti(o, "url") ?? MiniJson.Teksti(o, "tiedosto") ?? MiniJson.Teksti(o, "ampari") ?? MiniJson.Teksti(o, "arvo")) : null;
                if (tiedosto == null) continue;
                kohde.Add(new Kuvateksti
                {
                    Tiedosto = tiedosto, Lyhyt = MiniJson.Teksti(o, "lyhyt"),
                    Selite = MiniJson.Teksti(o, "selite"), Lahde = MiniJson.Teksti(o, "lahde"),
                });
            }
        }

        static void JasennaMaat(string teksti, Dictionary<string, KaupunkiTiedot> kaupungit)
        {
            var t = new Dictionary<string, MaaTiedot>();
            foreach (var a in Alkiot(teksti))
            {
                string iso = MiniJson.Teksti(a, "id");
                if (iso == null) continue;
                var m = new MaaTiedot
                {
                    Iso3 = iso, Nimi = MiniJson.Teksti(a, "nimi"), Paikallinen = MiniJson.Teksti(a, "paikallinen"),
                    Valtiomuoto = MiniJson.Teksti(a, "valtiomuoto"), Maalehti = MiniJson.Teksti(a, "maalehti"),
                };
                var lippuUrl = MiniJson.Teksti(a, "lippuUrl");
                if (lippuUrl != null) m.Lippu.Add(lippuUrl);
                var lippu = MiniJson.Teksti(a, "lippu");
                if (lippu != null) m.Lippu.Add(lippu); // Commons-nimi → ämpäri + Commons (Kuvat, kansio liput)
                var tiedot = Rakenne.Olio(MiniJson.Kentta(a, "tiedot"));
                if (tiedot != null)
                {
                    m.Vakiluku = MiniJson.Teksti(tiedot, "vakiluku");
                    m.VakilukuSija = MiniJson.Teksti(tiedot, "vakilukuSija");
                    m.PintaAla = MiniJson.Teksti(tiedot, "pintaAla");
                    m.PintaAlaSija = MiniJson.Teksti(tiedot, "pintaAlaSija");
                    var dem = Rakenne.Olio(MiniJson.Kentta(tiedot, "demokratia"));
                    if (dem != null)
                    {
                        m.Demokratia = MiniJson.Teksti(dem, "arvo"); m.DemokratiaSija = MiniJson.Teksti(dem, "sija");
                        m.DemokratiaSelitys = MiniJson.Teksti(dem, "selitys"); m.DemokratiaLinkki = MiniJson.Teksti(dem, "linkki");
                    }
                    var tulo = Rakenne.Olio(MiniJson.Kentta(tiedot, "keskitulo"));
                    if (tulo != null) { m.Keskitulo = MiniJson.Teksti(tulo, "arvo"); m.KeskituloSija = MiniJson.Teksti(tulo, "sija"); }
                    var terv = Rakenne.Lista(MiniJson.Kentta(tiedot, "tervehdykset"));
                    if (terv != null)
                        foreach (var x in terv)
                        {
                            var o = Rakenne.Olio(x);
                            if (o == null) continue;
                            m.Tervehdykset.Add((MiniJson.Teksti(o, "teksti"), MiniJson.Teksti(o, "kieli"), MiniJson.Teksti(o, "lippu"), MiniJson.Teksti(o, "osuus")));
                        }
                }
                var kartta = Rakenne.Olio(MiniJson.Kentta(a, "maakartta"));
                if (kartta != null)
                {
                    var kk = Rakenne.Olio(MiniJson.Kentta(kartta, "kuva"));
                    m.KarttaUrl = MiniJson.Teksti(kk, "url") ?? MiniJson.Teksti(kk, "arvo");
                    m.KarttaLahde = MiniJson.Teksti(kartta, "lahde") ?? MiniJson.Teksti(kk, "lahde");
                    foreach (var x in Rakenne.Lista(MiniJson.Kentta(kartta, "kaupungit")) ?? new List<object>())
                        if (Rakenne.Olio(x) is Dictionary<string, object> ko && MiniJson.Luku(ko, "x") is double kx && MiniJson.Luku(ko, "y") is double ky)
                            m.KarttaKaupungit.Add((MiniJson.Teksti(ko, "nimi"), (float)kx, (float)ky, MiniJson.Totuus(ko, "paa")));
                    m.KarttaNosto = Rakenne.Olio(MiniJson.Kentta(kartta, "nosto"));
                }
                m.Numeroina = Rakenne.Olio(MiniJson.Kentta(a, "numeroina"));
                m.Lipputarina = Rakenne.Olio(MiniJson.Kentta(a, "lipputarina"));
                var aiheet = Rakenne.Lista(MiniJson.Kentta(a, "aiheet"));
                if (aiheet != null)
                    foreach (var x in aiheet)
                    {
                        var o = Rakenne.Olio(x);
                        var id = o != null ? MiniJson.Teksti(o, "id") : null;
                        if (id != null) m.Aiheet.Add((id, MiniJson.Teksti(o, "nimi") ?? id));
                    }
                t[iso] = m;
            }
            // Vanha paketti ilman maat-kokoelmaa: maan nimi ja lippu lippumaista kaupunkien kautta.
            if (kaupungit != null)
                foreach (var k in kaupungit.Values)
                    if (k.Maa != null && !t.ContainsKey(k.Maa) && k.MaaNimi != null)
                        t[k.Maa] = new MaaTiedot { Iso3 = k.Maa, Nimi = k.MaaNimi, Lippu = k.Lippu };
            maat = t;
        }

        static Dictionary<string, KaupunkiTiedot> Jasenna(string kaup, string lehdet, string julisteet, string liput)
        {
            var t = new Dictionary<string, KaupunkiTiedot>();
            foreach (var a in Alkiot(kaup))
            {
                string id = MiniJson.Teksti(a, "id");
                if (id == null) continue;
                t[id] = new KaupunkiTiedot
                {
                    Id = id, Nimi = MiniJson.Teksti(a, "nimi") ?? id, Maa = MiniJson.Teksti(a, "maa"), Manner = MiniJson.Teksti(a, "manner"), Wiki = MiniJson.Teksti(a, "wiki"),
                    Intro = MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(a, "intro")), "teksti") ?? MiniJson.Teksti(a, "intro"),
                    Lat = MiniJson.Luku(a, "lat") ?? double.NaN, Lon = MiniJson.Luku(a, "lon") ?? double.NaN,
                };
                var nayte = Rakenne.Olio(MiniJson.Kentta(a, "kielinayte"));
                if (MiniJson.Teksti(nayte, "url") is string nayteUrl && nayteUrl.Length > 0)
                {
                    t[id].KielinayteUrl = nayteUrl;
                    t[id].KielinayteNimi = MiniJson.Teksti(nayte, "nimi");
                }
            }

            var maat = new Dictionary<string, (string Nimi, List<string> Lippu)>();
            foreach (var a in Alkiot(liput))
            {
                string iso = MiniJson.Teksti(a, "iso") ?? MiniJson.Teksti(a, "id");
                if (iso == null) continue;
                var osoitteet = new List<string>();
                var url = MiniJson.Teksti(a, "url");
                if (url != null) osoitteet.Add(url);
                var varat = Rakenne.Lista(MiniJson.Kentta(a, "varat"));
                if (varat != null) foreach (var v in varat) if (v is string s) osoitteet.Add(s);
                maat[iso] = (MiniJson.Teksti(a, "nimi"), osoitteet);
            }
            foreach (var k in t.Values)
                if (k.Maa != null && maat.TryGetValue(k.Maa, out var m)) { k.MaaNimi = m.Nimi; k.Lippu = m.Lippu; }

            foreach (var a in Alkiot(lehdet))
            {
                string id = MiniJson.Teksti(a, "kaupunki") ?? MiniJson.Teksti(a, "id");
                if (id == null || !t.TryGetValue(id, out var k)) continue;
                // Päätaso ensin (skeema 1.26: aiheet + kansi), raaka data-lista vain Paatason kautta.
                var kategoriat = Rakenne.Lista(MiniJson.Kentta(a, "aiheet")) ?? Rakenne.Lista(Paataso.RaakaArvo(a));
                if (kategoriat == null) continue;
                var kansi = Rakenne.Olio(MiniJson.Kentta(a, "kansi"));
                foreach (var ko in kategoriat)
                {
                    var kat = Rakenne.Olio(ko);
                    if (kat == null) continue;
                    if (MiniJson.Teksti(kat, "id") == "kaupunki")
                    {
                        k.Lehti = true;
                        k.Johdanto = MiniJson.Teksti(kat, "johdanto");
                        var kansikuvat = Rakenne.Lista(MiniJson.Kentta(kansi, "kansikuvat")) ?? Rakenne.Lista(MiniJson.Kentta(kat, "kansikuvat"));
                        var avauskuvat = Rakenne.Lista(MiniJson.Kentta(kansi, "avauskuvat")) ?? Rakenne.Lista(MiniJson.Kentta(kat, "avauskuvat"));
                        LueKuvat(kansikuvat ?? avauskuvat, k.Kansikuvat);
                        LueKuvat(avauskuvat, k.Avauskuvat);
                    }
                    else
                    {
                        var nimi = MiniJson.Teksti(kat, "nimi");
                        if (!string.IsNullOrEmpty(nimi)) k.Aiheet.Add(nimi);
                    }
                }
            }

            var kaikki = new List<JulisteTiedot>();
            foreach (var a in Alkiot(julisteet))
            {
                string id = MiniJson.Teksti(a, "kaupunki");
                // Päätaso ensin (Paataso.Juliste: otsikko, lyhyt, selite; kaupungin nimi päätasolla `nimi`, koska
                // päätason `kaupunki` on tunnus), raaka data vain Paatason kautta.
                var d = Paataso.Nakyma(a, Paataso.Juliste);
                var raaka = Paataso.Raaka(a);
                string tiedosto = MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(a, "kuva")), "url") ?? MiniJson.Teksti(raaka, "tiedosto");
                string otsikko = MiniJson.Teksti(d, "otsikko");
                if (tiedosto == null && otsikko == null) continue;
                kaikki.Add(new JulisteTiedot
                {
                    Id = MiniJson.Teksti(a, "id") ?? id, Kaupunki = id,
                    KaupunkiNimi = MiniJson.Teksti(a, "nimi") ?? MiniJson.Teksti(raaka, "kaupunki"),
                    // Skeema 1.20: kuva.url valmiina; vanhempi paketti: tiedosto (Kuvat.Reitit → julisteet/).
                    Tiedosto = tiedosto,
                    Otsikko = otsikko,
                    Lyhyt = MiniJson.Teksti(d, "lyhyt"), Selite = MiniJson.Teksti(d, "selite"),
                });
                if (id == null || !t.TryGetValue(id, out var k) || k.JulisteTiedosto != null) continue;
                k.JulisteTiedosto = MiniJson.Teksti(raaka, "tiedosto") ?? tiedosto;
                k.JulisteOtsikko = otsikko;
            }
            JulisteLista = kaikki;
            return t;
        }
    }
}
