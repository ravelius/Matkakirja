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
        /// <summary>Onko kaupungilla oma kaupunkilehti (kategoria "kaupunki").</summary>
        public bool Lehti;
    }

    public sealed class MaaTiedot
    {
        public string Iso3, Nimi, Paikallinen, Valtiomuoto, Maalehti;
        public List<string> Lippu = new List<string>();
        /// <summary>Tunnusluvut (null = maalla ei tietoja).</summary>
        public string Vakiluku, VakilukuSija, PintaAla, PintaAlaSija, Demokratia, DemokratiaSija, Keskitulo, KeskituloSija;
        public List<(string Teksti, string Kieli, string Lippu, string Osuus)> Tervehdykset = new List<(string, string, string, string)>();
        public List<(string Id, string Nimi)> Aiheet = new List<(string, string)>();
        public bool OnTiedot => Vakiluku != null || PintaAla != null || Demokratia != null || Keskitulo != null || Tervehdykset.Count > 0;
    }

    public sealed class Kuvateksti
    {
        public string Tiedosto, Lyhyt, Selite, Lahde;
    }

    public static class UiSisalto
    {
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
                        var d = MiniJson.Objekti(MiniJson.Kentta(a, "data"));
                        if (id != null && d != null && tulos.TryGetValue(id, out var kt)) kt.Iskulause = MiniJson.Teksti(d, "slogan");
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
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(teksti));
            var alkiot = juuri != null ? MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot")) : null;
            if (alkiot == null) yield break;
            foreach (var a in alkiot) { var o = MiniJson.Objekti(a); if (o != null) yield return o; }
        }

        static void LueKuvat(List<object> kuvat, List<Kuvateksti> kohde)
        {
            if (kuvat == null) return;
            foreach (var ku in kuvat)
            {
                var o = MiniJson.Objekti(ku);
                // tiedosto = Commons-nimi, ampari = pelin oma kuva julisteet/-kansiossa (Kuvat.Reitit).
                var tiedosto = o != null ? (MiniJson.Teksti(o, "tiedosto") ?? MiniJson.Teksti(o, "ampari")) : null;
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
                var tiedot = MiniJson.Objekti(MiniJson.Kentta(a, "tiedot"));
                if (tiedot != null)
                {
                    m.Vakiluku = MiniJson.Teksti(tiedot, "vakiluku");
                    m.VakilukuSija = MiniJson.Teksti(tiedot, "vakilukuSija");
                    m.PintaAla = MiniJson.Teksti(tiedot, "pintaAla");
                    m.PintaAlaSija = MiniJson.Teksti(tiedot, "pintaAlaSija");
                    var dem = MiniJson.Objekti(MiniJson.Kentta(tiedot, "demokratia"));
                    if (dem != null) { m.Demokratia = MiniJson.Teksti(dem, "arvo"); m.DemokratiaSija = MiniJson.Teksti(dem, "sija"); }
                    var tulo = MiniJson.Objekti(MiniJson.Kentta(tiedot, "keskitulo"));
                    if (tulo != null) { m.Keskitulo = MiniJson.Teksti(tulo, "arvo"); m.KeskituloSija = MiniJson.Teksti(tulo, "sija"); }
                    var terv = MiniJson.Taulukko(MiniJson.Kentta(tiedot, "tervehdykset"));
                    if (terv != null)
                        foreach (var x in terv)
                        {
                            var o = MiniJson.Objekti(x);
                            if (o == null) continue;
                            m.Tervehdykset.Add((MiniJson.Teksti(o, "teksti"), MiniJson.Teksti(o, "kieli"), MiniJson.Teksti(o, "lippu"), MiniJson.Teksti(o, "osuus")));
                        }
                }
                var aiheet = MiniJson.Taulukko(MiniJson.Kentta(a, "aiheet"));
                if (aiheet != null)
                    foreach (var x in aiheet)
                    {
                        var o = MiniJson.Objekti(x);
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
                    Id = id, Nimi = MiniJson.Teksti(a, "nimi") ?? id, Maa = MiniJson.Teksti(a, "maa"),
                    Lat = MiniJson.Luku(a, "lat") ?? double.NaN, Lon = MiniJson.Luku(a, "lon") ?? double.NaN,
                };
            }

            var maat = new Dictionary<string, (string Nimi, List<string> Lippu)>();
            foreach (var a in Alkiot(liput))
            {
                string iso = MiniJson.Teksti(a, "iso") ?? MiniJson.Teksti(a, "id");
                if (iso == null) continue;
                var osoitteet = new List<string>();
                var url = MiniJson.Teksti(a, "url");
                if (url != null) osoitteet.Add(url);
                var varat = MiniJson.Taulukko(MiniJson.Kentta(a, "varat"));
                if (varat != null) foreach (var v in varat) if (v is string s) osoitteet.Add(s);
                maat[iso] = (MiniJson.Teksti(a, "nimi"), osoitteet);
            }
            foreach (var k in t.Values)
                if (k.Maa != null && maat.TryGetValue(k.Maa, out var m)) { k.MaaNimi = m.Nimi; k.Lippu = m.Lippu; }

            foreach (var a in Alkiot(lehdet))
            {
                string id = MiniJson.Teksti(a, "kaupunki") ?? MiniJson.Teksti(a, "id");
                if (id == null || !t.TryGetValue(id, out var k)) continue;
                var kategoriat = MiniJson.Taulukko(MiniJson.Kentta(a, "data"));
                if (kategoriat == null) continue;
                foreach (var ko in kategoriat)
                {
                    var kat = MiniJson.Objekti(ko);
                    if (kat == null) continue;
                    if (MiniJson.Teksti(kat, "id") == "kaupunki")
                    {
                        k.Lehti = true;
                        k.Johdanto = MiniJson.Teksti(kat, "johdanto");
                        LueKuvat(MiniJson.Taulukko(MiniJson.Kentta(kat, "kansikuvat")) ?? MiniJson.Taulukko(MiniJson.Kentta(kat, "avauskuvat")), k.Kansikuvat);
                        LueKuvat(MiniJson.Taulukko(MiniJson.Kentta(kat, "avauskuvat")), k.Avauskuvat);
                    }
                    else
                    {
                        var nimi = MiniJson.Teksti(kat, "nimi");
                        if (!string.IsNullOrEmpty(nimi)) k.Aiheet.Add(nimi);
                    }
                }
            }

            foreach (var a in Alkiot(julisteet))
            {
                string id = MiniJson.Teksti(a, "kaupunki");
                var d = MiniJson.Objekti(MiniJson.Kentta(a, "data"));
                if (id == null || d == null || !t.TryGetValue(id, out var k) || k.JulisteTiedosto != null) continue;
                k.JulisteTiedosto = MiniJson.Teksti(d, "tiedosto");
                k.JulisteOtsikko = MiniJson.Teksti(d, "otsikko");
            }
            return t;
        }
    }
}
