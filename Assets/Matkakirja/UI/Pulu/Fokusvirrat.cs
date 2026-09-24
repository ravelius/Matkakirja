// FOKUSVIRRAT: kaupungin saapumisvirran näyttödata (Natiivi-UI, erä 5).
//
// Siirtosepän kokoelma fokusvirrat (webin js/packs/fokusvirta-<kaupunki>.js):
//   matkakirja: paikkarivi, teksti, luentakuva, luentakuva2
//               kuva = {osoite|ampari|tiedosto, lyhyt, selite, lahde}
//   pollo:      kuvat[] (PuluCam), kommentti[] (Livian repliikit luennan jälkeen)
//   aarremerkinta: isoisän myöhempi sivu, kun kaupungin laatta kääntyy
//               (merkkijono tai {teksti, paikkarivi}; web fokusvirtaAarremerkinta)
//   sahketehtava (Sahketehtava.Lue) ja sähkehakemiston otsikot: takyt[].otsikko,
//               kohteet[].nimi, takynostot[].nimio (web sisaltohakemisto, lähde 3)
//   kohtaaminen + kohtaamispiste.laudat.maailmankartta {x, y}: aarteen avaus mahdollinen
//               (lehden fokustehtävät ja pullavinkki, LehtiFokus.cs)
//   lehtitehtavat: raakana varareitiksi, jos kokoelmaa lehtitehtavat (skeema 1.17) ei ole
//   takynostot, takyt: raakana nostokortille (NostoSisalto: täkynosto, syvennystarina, leikekirja);
//               alkion tyypitetystä virrasta (kuvat {arvo, url}), vara data
// Jäsennetään taustasäikeessä kerran (0,9 Mt), muistissa vain nämä kentät.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class VirtaKuva
    {
        /// <summary>https-osoite tai Commons-tiedostonimi (Kuvat.Hae hoitaa molemmat).</summary>
        public string Osoite, Lyhyt, Selite, Lahde;
    }

    public sealed class Saapumisvirta
    {
        public string Kaupunki, Paikkarivi, Teksti;
        public List<VirtaKuva> Luentakuvat = new List<VirtaKuva>();
        public List<VirtaKuva> PuluKuvat = new List<VirtaKuva>();
        public List<string> PuluKommentit = new List<string>();
        /// <summary>Aarremerkintä (web aarremerkinnanTeksti): teksti ja oma paikkarivi, tai null.</summary>
        public string AarreTeksti, AarrePaikkarivi;
        /// <summary>Pöllön sähketehtävä (web data.sahketehtava) tai null (SahketehtavaNakyma: leima, napit, hakemisto).</summary>
        public Sahketehtava Sahketehtava;
        /// <summary>Kaupungin omat otsikot sähkehakemistoon: täkyt, kohdenostot, täkynostojen nimiöt.</summary>
        public List<string> Otsikot = new List<string>();
        /// <summary>Web aarteenAvausMahdollista: kohtaaminen ja sille paikka maailmankartalla.</summary>
        public bool AarteenAvaus;
        /// <summary>data.lehtitehtavat raakana (LehtiFokus lukee, jos kokoelma lehtitehtavat puuttuu).</summary>
        public List<object> Lehtitehtavat;
        /// <summary>Kaupungin täkynostot ja syvennystarinat raakana (web takynostot, takyt; NostoSisalto).</summary>
        public List<object> Takynostot, Takyt;
    }

    public static class Fokusvirrat
    {
        static readonly IReadOnlyList<(string Uusi, string Vanha)> FokusKentat = Paataso.Samat(
            "aarremerkinta", "kaupunki", "kohtaaminen", "kohtaamispiste", "kohteet", "lehtitehtavat", "matkakirja",
            "oppitunti", "pollo", "takyt", "valinta", "sahketehtava", "virta");

        static Dictionary<string, Saapumisvirta> virrat;
        static bool haussa;
        static readonly List<Action> odottajat = new List<Action>();

        /// <summary>Onko kokoelma jo luettu (Hae palauttaa silloin lopullisen tuloksen).</summary>
        public static bool Valmis => virrat != null;

        /// <summary>Kaikki luetut virrat (tyhjä, kunnes ladattu).</summary>
        public static IEnumerable<Saapumisvirta> Kaikki => virrat != null ? virrat.Values : (IEnumerable<Saapumisvirta>)new Saapumisvirta[0];

        public static Saapumisvirta Hae(string kaupunki) =>
            kaupunki != null && virrat != null && virrat.TryGetValue(kaupunki, out var v) ? v : null;

        public static void Lataa(Action valmis)
        {
            if (virrat != null) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Lue());
        }

        static IEnumerator Lue()
        {
            string teksti = null;
            yield return Sisalto.HaeTeksti("fokusvirrat", t => teksti = t, valinnainen: true);
            Task.Run(() =>
            {
                var t = new Dictionary<string, Saapumisvirta>();
                try { Jasenna(teksti, t); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui fokusvirrat: " + e.Message); }
                UiKerros.PaaSaikeessa(() =>
                {
                    virrat = t;
                    haussa = false;
                    var k = odottajat.ToArray();
                    odottajat.Clear();
                    foreach (var a in k) { try { a(); } catch (Exception e) { Debug.LogException(e); } }
                });
            });
        }

        static VirtaKuva Kuva(object o)
        {
            var d = o as Dictionary<string, object>;
            if (d == null) return null;
            var osoite = MiniJson.Teksti(d, "osoite") ?? MiniJson.Teksti(d, "tiedosto");
            var ampari = MiniJson.Teksti(d, "ampari");
            if (osoite == null && ampari != null) osoite = Kuvat.PeiliJuuri + "julisteet/" + ampari;
            if (osoite == null) return null;
            return new VirtaKuva
            {
                Osoite = osoite, Lyhyt = MiniJson.Teksti(d, "lyhyt"),
                Selite = MiniJson.Teksti(d, "selite"), Lahde = MiniJson.Teksti(d, "lahde"),
            };
        }

        static void Jasenna(string teksti, Dictionary<string, Saapumisvirta> t)
        {
            if (string.IsNullOrEmpty(teksti)) return;
            var juuri = Rakenne.Olio(MiniJson.Jasenna(teksti));
            var alkiot = Rakenne.Lista(MiniJson.Kentta(juuri, "alkiot"));
            if (alkiot == null) return;
            foreach (var a in alkiot)
            {
                var o = a as Dictionary<string, object>;
                // Päätaso ensin (skeema 1.26+: mm. sahketehtava ja virta ovat vain päätasolla), raaka data vain
                // puuttuvien kenttien varana Paataso-reitin kautta (2.0 poistaa sen).
                var d = Paataso.Nakyma(o, FokusKentat);
                string kaupunki = MiniJson.Teksti(o, "kaupunki") ?? MiniJson.Teksti(d, "kaupunki");
                if (kaupunki == null) continue;
                var v = new Saapumisvirta { Kaupunki = kaupunki };
                // Sähketehtävä ja hakemiston otsikot (web sisaltohakemisto, fokusvirran lähteet).
                if (MiniJson.Kentta(d, "sahketehtava") is Dictionary<string, object> st)
                {
                    try { v.Sahketehtava = Sahketehtava.Lue(st, kaupunki); }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui fokusvirrat: sähketehtävä " + kaupunki + ": " + e.Message); }
                }
                foreach (var (lohko, nimi) in new[] { ("takyt", "otsikko"), ("kohteet", "nimi"), ("takynostot", "nimio") })
                    foreach (var x in Rakenne.Lista(MiniJson.Kentta(d, lohko)) ?? new List<object>())
                        if (MiniJson.Teksti(x as Dictionary<string, object>, nimi) is string ots && ots.Length > 0) v.Otsikot.Add(ots);
                // Puuttuva lohko ei saa kaataa koko kokoelman jäsennystä (MiniJson.Objekti heittää nullista).
                var m = MiniJson.Kentta(d, "matkakirja") as Dictionary<string, object>;
                if (m != null)
                {
                    v.Paikkarivi = MiniJson.Teksti(m, "paikkarivi");
                    v.Teksti = MiniJson.Teksti(m, "teksti");
                    foreach (var kentta in new[] { "luentakuva", "luentakuva2" })
                    {
                        var k = Kuva(MiniJson.Kentta(m, kentta));
                        if (k != null) v.Luentakuvat.Add(k);
                    }
                }
                var p = MiniJson.Kentta(d, "pollo") as Dictionary<string, object>;
                if (p != null)
                {
                    var kuvat = Rakenne.Lista(MiniJson.Kentta(p, "kuvat"));
                    if (kuvat != null) foreach (var k in kuvat) { var vk = Kuva(k); if (vk != null) v.PuluKuvat.Add(vk); }
                    var kommentit = MiniJson.Kentta(p, "kommentti");
                    if (kommentit is string yksi) v.PuluKommentit.Add(yksi);
                    else if (Rakenne.Lista(kommentit) is List<object> lista)
                        foreach (var r in lista) if (r is string s) v.PuluKommentit.Add(s);
                }
                if (MiniJson.Kentta(d, "kohtaaminen") != null
                    && MiniJson.Kentta(MiniJson.Kentta(MiniJson.Kentta(d, "kohtaamispiste") as Dictionary<string, object>, "laudat")
                        as Dictionary<string, object>, "maailmankartta") is Dictionary<string, object> piste
                    && MiniJson.Luku(piste, "x") is double px && MiniJson.Luku(piste, "y") is double py
                    && !double.IsNaN(px) && !double.IsNaN(py) && !double.IsInfinity(px) && !double.IsInfinity(py))
                    v.AarteenAvaus = true;
                var am = MiniJson.Kentta(d, "aarremerkinta");
                if (am is string amt) v.AarreTeksti = amt;
                else if (Rakenne.Olio(am) is Dictionary<string, object> amo)
                {
                    v.AarreTeksti = MiniJson.Teksti(amo, "teksti");
                    v.AarrePaikkarivi = MiniJson.Teksti(amo, "paikkarivi");
                }
                if (string.IsNullOrEmpty(v.AarreTeksti)) v.AarreTeksti = null;
                v.Lehtitehtavat = Rakenne.Lista(MiniJson.Kentta(d, "lehtitehtavat"));
                // Tyypitetty virta (skeema: kuvat {arvo, url, varat}) ensin, raaka data varana.
                var virta = MiniJson.Kentta(o, "virta") as Dictionary<string, object>;
                v.Takynostot = Rakenne.Lista(MiniJson.Kentta(virta, "takynostot")) ?? Rakenne.Lista(MiniJson.Kentta(d, "takynostot"));
                v.Takyt = Rakenne.Lista(MiniJson.Kentta(virta, "takyt")) ?? Rakenne.Lista(MiniJson.Kentta(d, "takyt"));
                t[kaupunki] = v;
            }
        }
    }
}
