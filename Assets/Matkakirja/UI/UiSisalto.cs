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
        /// <summary>Lipun osoitteet järjestyksessä (url, varat).</summary>
        public List<string> Lippu = new List<string>();
        public List<Kuvateksti> Kansikuvat = new List<Kuvateksti>();
        /// <summary>Lehden muut aiheet ("Nykytaide", "Luonto" …) lehden sisällysluetteloon.</summary>
        public List<string> Aiheet = new List<string>();
        public string JulisteTiedosto, JulisteOtsikko;
        /// <summary>Onko kaupungilla oma kaupunkilehti (kategoria "kaupunki").</summary>
        public bool Lehti;
    }

    public sealed class Kuvateksti
    {
        public string Tiedosto, Lyhyt, Selite, Lahde;
    }

    public static class UiSisalto
    {
        static Dictionary<string, KaupunkiTiedot> kaupungit;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        public static bool Valmis => kaupungit != null;

        /// <summary>Kaupungin tiedot, tai null (ei vielä ladattu tai tuntematon).</summary>
        public static KaupunkiTiedot Kaupunki(string id) =>
            id != null && kaupungit != null && kaupungit.TryGetValue(id, out var k) ? k : null;

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
            yield return Sisalto.HaeTeksti("kaupunkilehdet", t => lehdet = t);
            yield return Sisalto.HaeTeksti("julisteet", t => julisteet = t);
            yield return Sisalto.HaeTeksti("lippumaat", t => liput = t);
            if (kaup == null)
            {
                Debug.LogWarning("MATKAKIRJA ui sisältö: kaupungit-kokoelmaa ei saatu");
                Valmistu(null);
                yield break;
            }
            Task.Run(() =>
            {
                Dictionary<string, KaupunkiTiedot> tulos = null;
                try { tulos = Jasenna(kaup, lehdet, julisteet, liput); }
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

        static Dictionary<string, KaupunkiTiedot> Jasenna(string kaup, string lehdet, string julisteet, string liput)
        {
            var t = new Dictionary<string, KaupunkiTiedot>();
            foreach (var a in Alkiot(kaup))
            {
                string id = MiniJson.Teksti(a, "id");
                if (id == null) continue;
                t[id] = new KaupunkiTiedot { Id = id, Nimi = MiniJson.Teksti(a, "nimi") ?? id, Maa = MiniJson.Teksti(a, "maa") };
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
                        var kuvat = MiniJson.Taulukko(MiniJson.Kentta(kat, "kansikuvat")) ?? MiniJson.Taulukko(MiniJson.Kentta(kat, "avauskuvat"));
                        if (kuvat != null)
                            foreach (var ku in kuvat)
                            {
                                var ko2 = MiniJson.Objekti(ku);
                                var tiedosto = ko2 != null ? (MiniJson.Teksti(ko2, "tiedosto") ?? MiniJson.Teksti(ko2, "ampari")) : null;
                                if (tiedosto == null) continue;
                                k.Kansikuvat.Add(new Kuvateksti
                                {
                                    Tiedosto = tiedosto, Lyhyt = MiniJson.Teksti(ko2, "lyhyt"),
                                    Selite = MiniJson.Teksti(ko2, "selite"), Lahde = MiniJson.Teksti(ko2, "lahde"),
                                });
                            }
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
