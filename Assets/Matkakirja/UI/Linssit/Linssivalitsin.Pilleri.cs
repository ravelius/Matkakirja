// PILLERIVALIKKO (omistaja 29.9.2026 klo 09.07, loki "YLÄPALKKI MATKALAUKUKSI"; web on malli, rakenne Pelikoodarilta):
// yläpalkin pilleri avaa yhden pudotuspaneelin, jonka pääsivu on ylhäältä alas Äänet (kytkimet ja tasot) → Kartta →
// toiminnot (Uusi peli, Ehdota, Offline-kartat, Asetukset, Retkikunta, Kehittäjä) → Linssit › → Aarteet › → pillerin
// tiedot (matkalaukun Matka ja Matkan tilastot) → versiorivi. Linssit ja Aarteet vaihtavat saman paneelin sisällön
// (‹ Takaisin ja otsikko), tiheä lista ilman selitettä; 1. napautus nostaa esikatselun paneelin vasemmalle puolelle
// (kuva ja lyhyt selite, avausanimaatio rivin suunnasta) ja rivi muuttuu samassa kohdassa toimintonapiksi (Aktivoi /
// Näytä), 2. napautus tekee toiminnon. Toisen rivin napautus vaihtaa esikatselun. Aarteet: Aarnin luettelo, Tavarat ja
// Julisteet otsikoittain, otsikossa "N / kaikki", ei tyhjiä rivejä; Näytä = kuva koko ruudulle (juliste: galleria).
// Ulkoasu (matkalaukkunahka) vasta omistajan hyväksymästä Codexin kuvasta; siihen asti nykyinen pergamentti.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Linssivalitsin
    {
        /// <summary>Paneeli on pillerin valikko: pääsivu, Linssit- ja Aarteet-näkymät (kaikki laitteet, omistaja 29.9.2026).</summary>
        public static bool PilleriValikko => true;

        public enum Nakyma { Paa, Linssit, Aarteet }
        public Nakyma NykyinenNakyma { get; private set; }

        ScrollView vieritys;
        VisualElement tiedot, aarteet, pohja, esikatselu, esiKuva;
        Label esiOtsikko, esiTeksti, esiTila;
        Button alaTakaisin;
        Kuvasuurennos suurennos;
        string esiId;
        string esiTilaEnnen;
        Action esiToiminto;
        readonly List<(Slider Saadin, Label Arvo, Voima Voima)> saatimet = new List<(Slider, Label, Voima)>();

        /// <summary>Aarteet-näkymän data (UiNakymat: PeliOhjain.Laukku()).</summary>
        public Func<LaukkuNaytto> AarteetData;
        /// <summary>Valikko aukeaa: pillerin tiedot päivitetään (UiNakymat: Matkalaukku.PaivitaTiedot).</summary>
        public event Action Avautuu;
        /// <summary>Pillerin tietojen paikka pääsivulla (Matkalaukku.Upota).</summary>
        public VisualElement TiedotKohde => tiedot;
        /// <summary>Muut avaajat (pilleri, iPadin ☰): niiden painallus ei ole "ohi paneelin".</summary>
        public readonly List<VisualElement> Avaajat = new List<VisualElement>();

        void LuoPilleriOsat(VisualElement turva, UiKerros kerros)
        {
            tiedot = Rakenne.El("mk-linssivalitsin__tiedot", vieritys, PickingMode.Ignore);
            aarteet = Rakenne.El("mk-linssivalitsin__aarteet", vieritys, PickingMode.Ignore);
            pohja = Rakenne.El("mk-pudotus__pohjarivi mk-linssivalitsin__pohja", vieritys, PickingMode.Ignore);
            tiedot.style.display = aarteet.style.display = pohja.style.display = DisplayStyle.None;

            // Esikatselu paneelin vasemmalla puolella (pergamentti kuten paneeli).
            esikatselu = Rakenne.El("mk-linssivalitsin__esikatselu", turva);
            Rakenne.Tausta(esikatselu, Kuviot.Pergamentti);
            esikatselu.Add(new KarheaKehys { Sade = 10, Paksuus = 1.2f });
            esiKuva = Rakenne.El("mk-linssivalitsin__esikuva", esikatselu, PickingMode.Ignore);
            esiOtsikko = Rakenne.Teksti("", "mk-linssivalitsin__esiotsikko", esikatselu);
            Kirjasimet.Aseta(esiOtsikko, Kirjasin.LukuLihava);
            esiTeksti = Rakenne.Teksti("", "mk-linssivalitsin__esiteksti", esikatselu);
            Kirjasimet.Aseta(esiTeksti, Kirjasin.Luku);
            esikatselu.AddManipulator(new Clickable(() => esiToiminto?.Invoke()));
            esikatselu.style.display = DisplayStyle.None;
            suurennos = new Kuvasuurennos(kerros.Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true };
        }

        // --- pääsivun osat (UiNakymat.RakennaPuhelinvalikko) -------------------------------------

        /// <summary>Osion otsikko pääsivulle (ÄÄNET, KARTTA).</summary>
        public Label LisaOsioOtsikko(string teksti) =>
            Rakenne.Teksti(teksti.ToUpperInvariant(), "mk-selite__otsikko mk-linssivalitsin__valiotsikko", lisaosa);

        /// <summary>Äänentasojen liukusäätimet (web: Äänet-osio; entinen Äänentasot-paneeli).</summary>
        public void LisaSaatimet()
        {
            var kuori = Rakenne.El("mk-linssivalitsin__saatimet", lisaosa, PickingMode.Ignore);
            foreach (var v in Asetukset.VoimaJarjestys)
            {
                var (s, a) = Aanentasot.LuoSaadinrivi(kuori, v);
                saatimet.Add((s, a, v));
            }
        }

        void PaivitaSaatimet()
        {
            foreach (var (s, a, v) in saatimet)
            {
                int p = Mathf.RoundToInt(Asetukset.Taso(v) * 100f);
                s.SetValueWithoutNotify(p);
                a.text = p + " %";
            }
        }

        /// <summary>Alinäkymän rivi pääsivulle ("Linssit ›", "Aarteet ›").</summary>
        public Button LisaAlinakyma(string nimi, string ikoni, Nakyma n, Func<bool> nakyy = null)
        {
            var b = ValikkoNappi(lisaosa, nimi, ikoni, () => NaytaNakyma(n), "mk-valikkonappi mk-valikkonappi--rivi mk-linssivalitsin__alinakyma");
            Rakenne.Teksti("›", "mk-linssivalitsin__vakanen", b);
            if (nakyy != null) lisarivit.Add((b, nakyy));
            return b;
        }

        /// <summary>Versiorivi alimmaisena (web versiokulma → Mitä uutta).</summary>
        public void LisaVersio(Func<string> teksti, Action painettu)
        {
            var n = Rakenne.Nappi("", "mk-pudotus__versionappi", () => { Sulje(); painettu?.Invoke(); }, pohja);
            var l = n.Q<Label>();
            l.AddToClassList("mk-pudotus__versio");
            Avautuu += () => l.text = teksti?.Invoke() ?? "";
        }

        // --- näkymät ---------------------------------------------------------------------------------

        public void NaytaNakyma(Nakyma n)
        {
            NykyinenNakyma = n;
            SuljeEsikatselu();
            bool paa = n == Nakyma.Paa;
            lisaosa.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;
            tiedot.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;
            pohja.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;
            lista.style.display = n == Nakyma.Linssit ? DisplayStyle.Flex : DisplayStyle.None;
            aarteet.style.display = n == Nakyma.Aarteet ? DisplayStyle.Flex : DisplayStyle.None;
            alaTakaisin.style.display = paa ? DisplayStyle.None : DisplayStyle.Flex;
            otsikko.text = n == Nakyma.Linssit ? "LINSSIT" : n == Nakyma.Aarteet ? "AARTEET" : "";
            // Tiheä lista: kapea paneeli, jotta esikatselu mahtuu sen vasemmalle puolelle myös puhelimella.
            paneeli.EnableInClassList("mk-linssivalitsin--kapea", !paa);
            if (n == Nakyma.Aarteet) RakennaAarteet();
            vieritys.scrollOffset = Vector2.zero;
        }

        // --- esikatselu ------------------------------------------------------------------------------

        void Esikatsele(string id, VisualElement rivi, Label tila, string kuvaUrl, string otsikkoTeksti, string teksti,
            string toimintoNimi, Action toiminto)
        {
            // Edellisen rivin tila takaisin.
            if (esiTila != null) esiTila.text = esiTilaEnnen ?? "";
            esiId = id;
            esiTila = tila;
            esiTilaEnnen = tila?.text;
            if (tila != null) tila.text = toimintoNimi;
            rivi?.AddToClassList("mk-esikatseltu");
            foreach (var r in (rivi?.parent?.Children() ?? Enumerable.Empty<VisualElement>()))
                if (r != rivi) r.RemoveFromClassList("mk-esikatseltu");
            esiToiminto = toiminto;
            esiOtsikko.text = otsikkoTeksti ?? "";
            esiTeksti.text = teksti ?? "";
            esiTeksti.style.display = string.IsNullOrEmpty(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
            esiKuva.style.backgroundImage = StyleKeyword.Null;
            esiKuva.style.display = string.IsNullOrEmpty(kuvaUrl) ? DisplayStyle.None : DisplayStyle.Flex;
            if (!string.IsNullOrEmpty(kuvaUrl))
            {
                string pyydetty = id;
                Kuvat.Hae(kuvaUrl, tex =>
                {
                    if (esiId != pyydetty) return;
                    if (tex != null) esiKuva.style.backgroundImage = new StyleBackground(tex);
                    else esiKuva.style.display = DisplayStyle.None;
                });
            }
            // Paikka: paneelin vasemmalle, rivin korkeudelle (ruudun rajoissa).
            var pr = paneeli.worldBound;
            var juuri = esikatselu.parent;
            var jr = juuri.worldBound;
            float oikea = jr.xMax - pr.xMin + 8f;
            float leveys = Mathf.Clamp(pr.xMin - jr.xMin - 16f, 150f, 260f);
            esikatselu.style.right = oikea;
            esikatselu.style.width = leveys;
            float y = rivi != null ? rivi.worldBound.yMin - jr.yMin : pr.yMin - jr.yMin;
            esikatselu.style.top = Mathf.Clamp(y - 20f, pr.yMin - jr.yMin, Mathf.Max(pr.yMin - jr.yMin, jr.height - 260f));
            Ponnahdus.Avaa(esikatselu, rivi != null ? rivi.worldBound.center : (Vector2?)null);
        }

        void SuljeEsikatselu()
        {
            if (esiTila != null) esiTila.text = esiTilaEnnen ?? "";
            if (esiId != null) foreach (var r in lista.Children().Concat(aarteet.Query<VisualElement>(className: "mk-esikatseltu").ToList())) r.RemoveFromClassList("mk-esikatseltu");
            esiId = null;
            esiTila = null;
            esiToiminto = null;
            if (esikatselu != null && esikatselu.style.display == DisplayStyle.Flex) Ponnahdus.Sulje(esikatselu);
        }

        bool EsikatseluSisaltaa(Vector2 p) => esiId != null && esikatselu.worldBound.Contains(p);

        // --- Aarteet ---------------------------------------------------------------------------------

        void RakennaAarteet()
        {
            aarteet.Clear();
            var d = AarteetData?.Invoke();
            if (d == null) { Rakenne.Teksti("Matka ei ole vielä alkanut.", "mk-linssivalitsin__tyhja", aarteet); return; }
            var loydetyt = d.AarninLuettelo.Where(a => a.Loydetty).ToList();
            Osio("Aarnin luettelo", loydetyt.Count, d.AarninLuettelo.Count);
            foreach (var a in loydetyt)
                AarreRivi("aarre:" + a.Id, a.Nimi, a.KuvaUrl, a.Manner, () => Suurenna(a.KuvaUrl, a.Nimi));
            Osio("Tavarat", d.Tavarat.Count, -1);
            foreach (var t in d.Tavarat)
                AarreRivi("tavara:" + t.Id, t.Teksti, t.KuvaUrl, null, () => Suurenna(t.KuvaUrl, t.Nimi));
            Osio("Julisteet", d.Julisteet.Count, d.JulisteitaKaikkiaan);
            var avaimet = d.Julisteet.Select(j => j.Avain).ToList();
            foreach (var j in d.Julisteet)
            {
                var avain = j.Avain;
                AarreRivi("juliste:" + avain, j.Otsikko ?? avain, j.Url, j.Lyhyt, () =>
                {
                    Sulje();
                    UiNakymat.Hae().Julistegalleria.Avaa(avaimet);
                });
            }
        }

        void Osio(string nimi, int n, int kaikki)
        {
            var r = Rakenne.El("mk-linssivalitsin__aarreosio", aarteet, PickingMode.Ignore);
            var o = Rakenne.Teksti(nimi.ToUpperInvariant(), "mk-selite__otsikko mk-linssivalitsin__valiotsikko", r);
            Kirjasimet.Aseta(o, Kirjasin.Kone);
            var l = Rakenne.Teksti(kaikki >= 0 ? $"{n} / {kaikki}" : n.ToString(), "mk-linssivalitsin__aarreluku", r);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
        }

        void AarreRivi(string id, string nimi, string kuvaUrl, string selite, Action nayta)
        {
            Button b = null;
            Label tila = null;
            b = Rakenne.Nappi(null, "mk-linssirivi mk-linssivalitsin__aarrerivi", () =>
            {
                if (esiId != id) { Esikatsele(id, b, tila, kuvaUrl, nimi, selite, "Näytä", nayta); return; }
                nayta?.Invoke();
            }, aarteet);
            b.tooltip = nimi;
            var nimirivi = Rakenne.El("mk-linssirivi__nimirivi", b, PickingMode.Ignore);
            var n = Rakenne.Teksti(nimi ?? "", "mk-linssirivi__nimi", nimirivi);
            Kirjasimet.Aseta(n, Kirjasin.Luku);
            tila = Rakenne.Teksti("", "mk-linssirivi__tila", nimirivi);
        }

        void Suurenna(string url, string otsikkoTeksti)
        {
            if (string.IsNullOrEmpty(url)) return;
            Sulje();
            suurennos.Avaa(new List<LehtiKuva> { new LehtiKuva { Lahde = url, Otsikko = otsikkoTeksti } }, 0);
        }

        // --- testikomento -------------------------------------------------------------------------

        /// <summary>Testi (ui pilleri linssit|aarteet|paa [n]): näkymä auki ja n:s rivi napautettuna kerran (esikatselu).</summary>
        public string TestaaNakyma(string nimi, int rivi)
        {
            if (!Auki) Avaa();
            NaytaNakyma(nimi == "linssit" ? Nakyma.Linssit : nimi == "aarteet" ? Nakyma.Aarteet : Nakyma.Paa);
            if (rivi < 0) return $"näkymä {NykyinenNakyma}";
            var isa = NykyinenNakyma == Nakyma.Linssit ? lista : aarteet;
            var napit = isa.Query<Button>(className: "mk-linssirivi").ToList();
            if (rivi >= napit.Count) return $"näkymä {NykyinenNakyma}, rivejä {napit.Count}";
            var nappi = napit[rivi];
            paneeli.schedule.Execute(() =>
            {
                using var e = NavigationSubmitEvent.GetPooled();
                e.target = nappi;
                nappi.SendEvent(e);
            }).StartingIn(300);
            return $"näkymä {NykyinenNakyma}, rivi {rivi}/{napit.Count}: {nappi.tooltip}";
        }
    }
}
