// LEHDEN OSIOHAKEMISTO (Natiivi-UI; omistaja 27.9.2026, web v2296 js/lehtiosiot.js osiohakemisto +
// piirraOsiohakemisto, css .lehti-osiohakemisto): kaupunkilehden etusivun alle "LEHDEN OSIOT" — lehden osiot ja
// kaupungin nostot aiheittain, osiota kohden linkki "Nimi →", enintään neljä jutunotsikkoa ("… ja n muuta" avaa
// loput) ja yksi kuva. Korvaa etusivun Matkailijalle-lohkon ja radiorivin (turisti-info on avauskortissa, radio
// kartussissa).
//
// Kokoaminen (web osiohakemisto): 1) lehden aihesivut järjestyksessä (ei kansiaihetta "kaupunki"; hetki-* kootaan
// osioon "Historian hetket"), jutut sivun nostojen otsikoista (" — " edeltä, pienaakkosin ilman toistoja); linkki
// avaa sivun. 2) kaupungin nostot kategorioittain (KaupunkiNostot, web nostokategoriat), samaan osioon aiheen
// mukaan, jos otsikko ei jo ole; jutun napautus avaa noston. Kuva: osion ensimmäinen käyttämätön ehdokas (sivun
// ensimmäinen noston kuva tai kansikuva; noston kuva kohdekartan jutusta tai nostokortin datasta), varalla kaupungin
// nähtävyysjuttujen kuvat.
//
// KEVYT (omistaja 27.9.2026 klo 11.2x: linkit liian raskaan näköiset): ohut rivi — pieni kuva 40 × 40, osion nimi
// Luku 15,5 #b03a2b ja yhdellä alarivillä enintään kaksi jutun nimeä "·"-erottimin (13,2, himmeä muste); ei
// "… ja n muuta" -riviä (osion linkki vie loppuihin), ei laatikoita. Otsikko "LEHDEN OSIOT" kuten webissä.
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Lehtiosiot
    {
        public const string Otsikko = "LEHDEN OSIOT";
        /// <summary>Jutun nimiä osion alla (omistaja 11.2x: 1–2; web OSIOHAKEMISTON_OTSIKOITA 4).</summary>
        public const int Otsikoita = 2;

        sealed class Juttu
        {
            public string Otsikko;
            public int Sivu = -1;
            public KaupunkiNosto Nosto;
        }

        sealed class Osio
        {
            public string Aihe, Nimi;
            public int Sivu = -1;
            public List<Juttu> Jutut = new List<Juttu>();
            /// <summary>Kuvaehdokkaat järjestyksessä: kuvan lähde (LehtiKuva) tai nostoKuvaHaku (valo-id).</summary>
            public List<object> Ehdokkaat = new List<object>();
        }

        /// <summary>
        /// Piirtää hakemiston etusivulle. kaanna(sivu) kääntää lehden sivulle; nostot avataan avaaNosto(nosto)-kutsulla
        /// (lehti sulkeutuu ensin). Kaupungin nostot saapuvat asynkronisesti: hakemisto piirretään kun ne ovat valmiit.
        /// </summary>
        public static void Piirra(VisualElement isa, Lehti lehti, Action<int> kaanna, Action<KaupunkiNosto> avaaNosto)
        {
            if (lehti == null || lehti.Laji != LehtiLaji.Kaupunki) return;
            var lohko = Rakenne.El("mk-lehti__osiot", isa, PickingMode.Ignore);
            string kaupunki = lehti.Omistaja;
            KaupunkiNostot.Hae(kaupunki, kategoriat =>
            {
                if (lohko.panel == null && lohko.parent == null) return;
                var osiot = Kokoa(lehti, kategoriat);
                Kohdekartat.Hae(kaupunki, kk => Rakenna(lohko, osiot, kk, kaanna, avaaNosto));
            });
        }

        static List<Osio> Kokoa(Lehti lehti, List<NostoKategoria> kategoriat)
        {
            var osiot = new List<Osio>();
            var nahty = new HashSet<string>();
            Osio Hae(string aihe, string nimi)
            {
                var o = osiot.Find(x => x.Aihe == aihe);
                if (o == null) { o = new Osio { Aihe = aihe, Nimi = nimi }; osiot.Add(o); }
                return o;
            }
            for (int i = 1; i < lehti.Sivut.Count; i++)
            {
                var s = lehti.Sivut[i];
                if (s.Laji != LehtiSivuLaji.Aihe || s.Aihe == null || s.Aihe.Id == "kaupunki") continue;
                string id = s.Aihe.Id ?? "";
                bool hetki = id.StartsWith("hetki-", StringComparison.Ordinal);
                var o = Hae(hetki ? "hetket" : id, hetki ? "Historian hetket" : s.Aihe.Nimi ?? s.Lyhyt ?? id);
                if (o.Sivu < 0) o.Sivu = i;
                foreach (var n in s.Aihe.Nostot)
                {
                    string otsikko = JutunOtsikko(n.Otsikko ?? s.Aihe.Nimi);
                    if (otsikko.Length == 0 || !nahty.Add(otsikko.ToLowerInvariant())) continue;
                    o.Jutut.Add(new Juttu { Otsikko = otsikko, Sivu = i });
                }
                nahty.Add(id);
                var kuva = s.Aihe.Nostot.Select(n => n.Kuva ?? n.Galleria.FirstOrDefault()).FirstOrDefault(k => k?.Lahde != null)
                    ?? s.Aihe.Kansikuvat.FirstOrDefault() ?? s.Aihe.Avauskuvat.FirstOrDefault();
                if (kuva != null) o.Ehdokkaat.Add(kuva);
            }
            foreach (var kat in kategoriat ?? new List<NostoKategoria>())
            {
                string aihe = string.IsNullOrEmpty(kat.Aihe) ? "muut" : kat.Aihe;
                foreach (var r in kat.Jasenet)
                {
                    string otsikko = (r.Nimi ?? "").Trim();
                    string tunnus = r.ValoId ?? r.Kohde?.Nosto ?? otsikko;
                    if (otsikko.Length == 0 || nahty.Contains(tunnus) || nahty.Contains(otsikko.ToLowerInvariant())) continue;
                    nahty.Add(tunnus);
                    nahty.Add(otsikko.ToLowerInvariant());
                    var o = Hae(aihe, kat.Nimi);
                    o.Jutut.Add(new Juttu { Otsikko = otsikko, Nosto = r });
                    var kk = r.Kohde?.Juttu?.Kuvat.FirstOrDefault();
                    if (kk?.Lahde != null) o.Ehdokkaat.Add(kk);
                    else if (r.ValoId != null) o.Ehdokkaat.Add(r.ValoId);
                }
            }
            osiot.RemoveAll(o => o.Jutut.Count == 0 && o.Sivu < 0);
            return osiot;
        }

        /// <summary>Web osiohakOtsikko: otsikon alku ennen " — ".</summary>
        static string JutunOtsikko(string t)
        {
            t ??= "";
            int i = t.IndexOf(" — ", StringComparison.Ordinal);
            return (i >= 0 ? t.Substring(0, i) : t).Trim();
        }

        static void Rakenna(VisualElement lohko, List<Osio> osiot, Kohdekartta kartta, Action<int> kaanna, Action<KaupunkiNosto> avaaNosto)
        {
            lohko.Clear();
            if (osiot.Count == 0) { lohko.style.display = DisplayStyle.None; return; }
            Kirjasimet.Aseta(Rakenne.Teksti(Otsikko, "mk-lehti__osiot-otsikko", lohko), Kirjasin.KoneLihava);
            // Varakuvat: kaupungin nähtävyysjuttujen ensimmäiset kuvat (web NAHTAVYYSJUTUT[cityId]).
            var varat = kartta == null ? new List<object>()
                : kartta.Kohteet.Concat(kartta.Tarinakohteet).Select(k => (object)k.Juttu?.Kuvat.FirstOrDefault()).Where(k => k != null).ToList();
            var kaytetyt = new HashSet<string>();
            foreach (var o in osiot)
            {
                var rivi = Rakenne.El("mk-lehti__osio", lohko, PickingMode.Ignore);
                var kuvapaikka = Rakenne.El("mk-lehti__osio-kuva", rivi, PickingMode.Ignore);
                var tekstit = Rakenne.El("mk-lehti__osio-tekstit", rivi, PickingMode.Ignore);
                var ensimmainen = o.Jutut.FirstOrDefault();
                var osio = o;
                var linkki = Rakenne.Nappi(o.Nimi + " →", "mk-lehti__osio-linkki", () =>
                {
                    if (osio.Sivu >= 0) kaanna(osio.Sivu);
                    else if (ensimmainen != null) Avaa(ensimmainen, kaanna, avaaNosto);
                }, tekstit);
                Kirjasimet.Aseta(linkki, Kirjasin.LukuLihava);
                var lista = Rakenne.El("mk-lehti__osio-jutut", tekstit, PickingMode.Ignore);
                bool eka = true;
                foreach (var j in o.Jutut.Take(Otsikoita)) { JuttuRivi(lista, j, kaanna, avaaNosto, eka); eka = false; }
                // Kuva: ensimmäinen käyttämätön ehdokas, varalla nähtävyysjutut (web kaytetyt).
                var kuva = o.Ehdokkaat.Concat(varat).FirstOrDefault(k => !kaytetyt.Contains(Avain(k)));
                if (kuva != null) { kaytetyt.Add(Avain(kuva)); AsetaKuva(kuvapaikka, kuva); }
            }
        }

        static string Avain(object k) => k is LehtiKuva l ? l.Lahde ?? "" : k as string ?? "";

        static void AsetaKuva(VisualElement paikka, object k)
        {
            void Aseta(Texture2D t) { if (t != null) paikka.style.backgroundImage = new StyleBackground(t); }
            if (k is LehtiKuva l && l.Lahde != null) { Kuvat.Hae(l.Lahde, Aseta); return; }
            if (k is string valo)
                UiKerros.Hae().StartCoroutine(NostoSisalto.Hae(valo, n =>
                {
                    var nk = n?.Kuvat.FirstOrDefault(x => x?.Lahde != null);
                    if (nk != null) NostoSisalto.HaeKuva(nk.Lahde, Aseta);
                }));
        }

        /// <summary>Jutun nimi alarivillä (ennen muita "·"-erotin); napautus avaa sivun tai noston.</summary>
        static void JuttuRivi(VisualElement lista, Juttu j, Action<int> kaanna, Action<KaupunkiNosto> avaaNosto, bool eka)
        {
            if (!eka) Kirjasimet.Aseta(Rakenne.Teksti("·", "mk-lehti__osio-piste", lista), Kirjasin.Luku);
            var b = Rakenne.Nappi(j.Otsikko, "mk-lehti__osio-juttunappi", () => Avaa(j, kaanna, avaaNosto), lista);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
        }

        static void Avaa(Juttu j, Action<int> kaanna, Action<KaupunkiNosto> avaaNosto)
        {
            if (j.Sivu >= 0) kaanna(j.Sivu);
            else if (j.Nosto != null) avaaNosto(j.Nosto);
        }
    }
}
