// KAUPUNGIN NOSTOT (Natiivi-UI): kaupunkikortin nostokategoriat haitarina, esim. "Historia (5)".
// Web: js/pallolauta/kaupunkiliuska.js (KAUPUNGIN_SADE_KM, luoSisaisyysTesti, kategoriat,
// liuskanRivit), js/pallolauta/nostot.js (sisaisetKaupungeittain) ja js/nahtavyydet.js
// (kaupunkikartanSiirretyt). Toteutus natiivisti, ei käännös.
//
// Kaupungin sisäiset nostot kahdesta lähteestä, tässä järjestyksessä (web: kartalta + siirretyt):
//   1. KARTALTA: karttavalot (kokoelma karttavalot, sama lähde kuin pallon valoilla), joiden oma
//      paikka on enintään 12 km kaupungin keskuksesta (haversine, ensin karkea astelaatikko).
//      Pois: laudan kaupungit (valon kaupunki-kenttä) sekä kohdekartalle linkitetyt nostot
//      (web karsiKaupunkikartanNostot: ne asuvat kohdekartalla eivätkä ole pääkartan merkkejä)
//      — paitsi Ranskassa, jossa ne palaavat lähizoomiin (web KOHDEKARTAN_NOSTOT_LAHIZOOMIIN).
//   2. KOHDEKARTALTA SIIRRETYT: kohdekartan kohteet ilman miniatyyripiirrosta (ei numeroympyräkartoilla),
//      joilla on juttu tai wiki. Aihe tulee linkitetyn noston valosta; ilman sitä "Muut".
// Kategoria = karttaselitteen aihe (nimi NostoMerkit.Jarjestys Koko = web aiheenNimi, väri web
// karttavaloVari --sym-*). Tuntematon tai puuttuva aihe → "Muut", aina listan lopussa. Järjestys on
// ensiesiintymän järjestys (web ladontaNro; natiivissa valon tärkeys, sitten paketin järjestys).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>Yksi kaupungin sisäinen nosto (haitarin kohderivi).</summary>
    public sealed class KaupunkiNosto
    {
        public string Nimi, Aihe;
        /// <summary>Karttavalon id (kartalta), tai null (kohdekartalta siirretty).</summary>
        public string ValoId;
        /// <summary>Kohdekartalta siirretty kohde (ValoId = null).</summary>
        public Kohdekartta Kartta;
        public KohdekarttaKohde Kohde;

        /// <summary>Avaa noston: valo → nostokortti, siirretty kohde → nähtävyysjuttu (web avaaNahtavyys).</summary>
        public void Avaa()
        {
            var ui = UiNakymat.Hae();
            if (ui == null) return;
            if (Kohde != null) ui.Nahtavyydet.AvaaKohde(Kartta, Kohde);
            else if (ValoId != null) ui.Nostokortti.Avaa(ValoId);
        }
    }

    /// <summary>Haitarin kategoria: "Historia (5)".</summary>
    public sealed class NostoKategoria
    {
        public string Aihe, Nimi, Vari;
        public List<KaupunkiNosto> Jasenet = new List<KaupunkiNosto>();
        public int Maara => Jasenet.Count;
        public string Otsikko => $"{Nimi} ({Maara})";
    }

    public static class KaupunkiNostot
    {
        /// <summary>Web KAUPUNGIN_SADE_KM (Pariisin mitalla: Versailles 17 km jää kartalle).</summary>
        public const double SadeKm = 12;
        public const string MuutAihe = "";
        public const string MuutNimi = "Muut";

        /// <summary>Web --sym-* (css/styles.css) karttavaloVari-reitillä; puuttuva = kaupunki.</summary>
        static readonly Dictionary<string, string> Varit = new Dictionary<string, string>
        {
            { "kaupungit", "#8a6d4a" }, { "luonto", "#4f7d6f" }, { "elaimet", "#b98d54" }, { "historia", "#a05c3f" },
            { "ihmeet", "#b8862b" }, { "hetket", "#6e4a63" }, { "kulttuuri", "#7b5a8c" }, { "kauppa", "#7d7840" },
            { "skandaalit", "#dda42c" },
        };
        const string OletusVari = "#8a6d4a";
        /// <summary>Web KOHDEKARTAN_NOSTOT_LAHIZOOMIIN: näissä maissa kohdekartan nostot ovat myös pääkartalla.</summary>
        static readonly HashSet<string> LahizoomiinMaat = new HashSet<string> { "FRA" };

        sealed class Valo
        {
            public string Id, Aihe, Nimi, Maa;
            public double Lat, Lon;
            public int Tarkeys, Jarjestys;
            public bool LaudanKaupunki;
        }

        static List<Valo> valot;
        static Dictionary<string, Valo> valotIdlla;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();
        static readonly Dictionary<string, List<NostoKategoria>> muisti = new Dictionary<string, List<NostoKategoria>>();

        /// <summary>Kaupungin nostokategoriat (tyhjä lista = ei sisäisiä nostoja). Pääsäikeessä.</summary>
        public static void Hae(string kaupunkiId, Action<List<NostoKategoria>> valmis)
        {
            if (kaupunkiId == null) { valmis?.Invoke(new List<NostoKategoria>()); return; }
            if (muisti.TryGetValue(kaupunkiId, out var m)) { valmis?.Invoke(m); return; }
            UiSisalto.Lataa(() => Kohdekartat.Hae(kaupunkiId, kartta => LataaValot(() =>
            {
                var k = UiSisalto.Kaupunki(kaupunkiId);
                List<NostoKategoria> tulos;
                try { tulos = Kategoriat(Nostot(k, kartta)); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui kaupunkinostot: " + e.Message); tulos = new List<NostoKategoria>(); }
                // Vajaa lataus (verkko poikki) ei jää muistiin: seuraava avaus yrittää uudelleen.
                if (k != null && valot != null && valot.Count > 0) muisti[kaupunkiId] = tulos;
                valmis?.Invoke(tulos);
            })));
        }

        // --- jäsenyys ---------------------------------------------------------------------

        static List<KaupunkiNosto> Nostot(KaupunkiTiedot k, Kohdekartta kartta)
        {
            var ulos = new List<KaupunkiNosto>();
            if (k == null) return ulos;
            var linkitetyt = LinkitetytValot();
            if (valot != null && !double.IsNaN(k.Lat) && !double.IsNaN(k.Lon))
            {
                double latRaja = SadeKm / 111.2;
                double lonRaja = latRaja / Math.Max(0.01, Math.Cos(k.Lat * Math.PI / 180));
                var kartalta = new List<Valo>();
                foreach (var v in valot)
                {
                    if (v.LaudanKaupunki) continue;
                    if (Math.Abs(v.Lat - k.Lat) > latRaja) continue;
                    double dLon = Math.Abs(v.Lon - k.Lon);
                    if (dLon > 180) dLon = 360 - dLon;
                    if (dLon > lonRaja) continue;
                    if (EtaisyysKm(k.Lat, k.Lon, v.Lat, v.Lon) > SadeKm) continue;
                    if (linkitetyt.Contains(v.Id) && !LahizoomiinMaat.Contains(v.Maa ?? "")) continue;
                    kartalta.Add(v);
                }
                foreach (var v in kartalta.OrderByDescending(x => x.Tarkeys).ThenBy(x => x.Jarjestys))
                    ulos.Add(new KaupunkiNosto { Nimi = v.Nimi ?? v.Id, Aihe = v.Aihe ?? MuutAihe, ValoId = v.Id });
            }
            // Kohdekartalta siirretyt (web kaupunkikartanSiirretyt): piirretyt rakennukset jäävät kartalle.
            if (kartta != null && !kartta.Numeroympyrat)
                foreach (var kohde in kartta.Kohteet)
                {
                    if (kohde.Piirros != null || !kohde.Avattava) continue;
                    ulos.Add(new KaupunkiNosto { Nimi = kohde.Nimi, Aihe = SiirretynAihe(kohde), Kartta = kartta, Kohde = kohde });
                }
            return ulos;
        }

        /// <summary>Siirretyn kohteen aihe linkitetyn noston valosta; skandaali-/hetki-tunnus lajistaan.</summary>
        static string SiirretynAihe(KohdekarttaKohde kohde)
        {
            foreach (var n in kohde.Nostot)
                if (valotIdlla != null && valotIdlla.TryGetValue(ValoLinkista(n), out var v) && !string.IsNullOrEmpty(v.Aihe)) return v.Aihe;
            string eka = kohde.Nostot.Count > 0 ? kohde.Nostot[0] : null;
            if (eka == null) return MuutAihe;
            if (eka.StartsWith("skandaali-", StringComparison.Ordinal)) return "skandaalit";
            if (eka.StartsWith("hetki-", StringComparison.Ordinal)) return "hetket";
            return MuutAihe;
        }

        /// <summary>
        /// Kohdekartan nostolinkki → karttavalon id: "skandaali-x" → "skandaali:x", "hetki-x" → "hetki:x",
        /// muut kohteita ("bastilji" → "kohde:bastilji").
        /// </summary>
        static string ValoLinkista(string linkki)
        {
            if (linkki.StartsWith("skandaali-", StringComparison.Ordinal)) return "skandaali:" + linkki.Substring(10);
            if (linkki.StartsWith("hetki-", StringComparison.Ordinal)) return "hetki:" + linkki.Substring(6);
            return "kohde:" + linkki;
        }

        static HashSet<string> linkitetyt;

        /// <summary>Kaikkien kohdekarttojen nostolinkit valo-id:inä (kaikki natiivin kaupungit ovat laudalla).</summary>
        static HashSet<string> LinkitetytValot()
        {
            if (linkitetyt != null) return linkitetyt;
            var s = new HashSet<string>();
            foreach (var kartta in Kohdekartat.Kaikki)
                foreach (var kohde in kartta.Kohteet)
                    foreach (var n in kohde.Nostot) s.Add(ValoLinkista(n));
            if (Kohdekartat.Ladattu) linkitetyt = s;
            return s;
        }

        static double EtaisyysKm(double lat1, double lon1, double lat2, double lon2)
        {
            const double Rad = Math.PI / 180;
            double dLat = (lat2 - lat1) * Rad, dLon = (lon2 - lon1) * Rad;
            double s = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                + Math.Cos(lat1 * Rad) * Math.Cos(lat2 * Rad) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            return 2 * 6371 * Math.Asin(Math.Min(1, Math.Sqrt(s)));
        }

        // --- kategoriat -------------------------------------------------------------------

        /// <summary>Web kategoriat(): ensiesiintymän järjestys, "Muut" lopussa, summa = nostojen määrä.</summary>
        public static List<NostoKategoria> Kategoriat(IEnumerable<KaupunkiNosto> nostot)
        {
            var kasat = new Dictionary<string, NostoKategoria>();
            var jarjestys = new List<NostoKategoria>();
            foreach (var n in nostot)
            {
                string aihe = Varit.ContainsKey(n.Aihe ?? "") ? n.Aihe : MuutAihe;
                if (!kasat.TryGetValue(aihe, out var kat))
                {
                    kat = new NostoKategoria { Aihe = aihe, Nimi = AiheenNimi(aihe), Vari = Varit.TryGetValue(aihe, out var vari) ? vari : OletusVari };
                    kasat[aihe] = kat;
                    jarjestys.Add(kat);
                }
                kat.Jasenet.Add(n);
            }
            // Vakaa lajittelu: "Muut" loppuun, muut ennallaan.
            return jarjestys.Where(x => x.Aihe != MuutAihe).Concat(jarjestys.Where(x => x.Aihe == MuutAihe)).ToList();
        }

        /// <summary>Web aiheenNimi (KARTTAVALO_AIHEET nimi) = karttaselitteen koko nimi.</summary>
        static string AiheenNimi(string aihe)
        {
            if (aihe == MuutAihe) return MuutNimi;
            foreach (var r in NostoMerkit.Jarjestys) if (r.Id == aihe) return r.Koko;
            return MuutNimi;
        }

        // --- karttavalot ------------------------------------------------------------------

        static void LataaValot(Action valmis)
        {
            if (valot != null) { valmis(); return; }
            odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(LataaValotReitti());
        }

        static IEnumerator LataaValotReitti()
        {
            string teksti = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => teksti = t, valinnainen: true);
            List<Valo> tulos = null;
            var tehtava = Task.Run(() =>
            {
                try { tulos = Jasenna(teksti); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui kaupunkinostot: karttavalot: " + e.Message); }
            });
            while (!tehtava.IsCompleted) yield return null;
            valot = tulos ?? new List<Valo>();
            valotIdlla = new Dictionary<string, Valo>();
            foreach (var v in valot) valotIdlla[v.Id] = v;
            haussa = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var k in kutsut) { try { k(); } catch (Exception e) { Debug.LogException(e); } }
            // Tyhjä lataus (verkko poikki): seuraava haku yrittää uudelleen.
            if (valot.Count == 0) { valot = null; valotIdlla = null; }
        }

        static List<Valo> Jasenna(string json)
        {
            var l = new List<Valo>();
            var alkiot = Rakenne.Lista(MiniJson.Kentta(MiniJson.Jasenna(json ?? "{}") as Dictionary<string, object>, "alkiot"));
            if (alkiot == null) return l;
            int i = 0;
            foreach (var a in alkiot)
            {
                if (!(a is Dictionary<string, object> o)) continue;
                string id = MiniJson.Teksti(o, "id");
                if (id == null || !(MiniJson.Luku(o, "lat") is double lat) || !(MiniJson.Luku(o, "lon") is double lon)) continue;
                l.Add(new Valo
                {
                    Id = id, Aihe = MiniJson.Teksti(o, "aihe"), Nimi = MiniJson.Teksti(o, "nimi"), Maa = MiniJson.Teksti(o, "maa"),
                    Lat = lat, Lon = lon, Tarkeys = (int)(MiniJson.Luku(o, "tarkeys") ?? 0), Jarjestys = i++,
                    LaudanKaupunki = MiniJson.Kentta(o, "kaupunki") != null,
                });
            }
            return l;
        }
    }
}
