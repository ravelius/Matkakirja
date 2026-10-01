// PILLERIVALIKKO (omistaja 29.9.2026 klo 09.07, loki "YLÄPALKKI MATKALAUKUKSI"; web on malli, rakenne Pelikoodarilta):
// yläpalkin pilleri avaa yhden pudotuspaneelin, jonka pääsivu on ylhäältä alas Äänet (kytkimet ja tasot) → Kartta →
// toiminnot (Uusi peli, Ehdota, Offline-kartat, Asetukset, Retkikunta, Kehittäjä) → Linssit › → Aarteet › → pillerin
// tiedot (matkalaukun Matka ja Matkan tilastot) → versiorivi. Linssit ja Aarteet vaihtavat saman paneelin sisällön
// (‹ Takaisin ja otsikko), tiheä lista ilman selitettä; 1. napautus nostaa esikatselun omaan ikkunaansa paneelin vasemmalle
// puolelle (kuva ja selite, avausanimaatio rivin suunnasta; omistaja 29.9.2026 klo 23.0x, 1.0.56: erillinen ikkuna, valikko
// kapeampi) ja rivi muuttuu samassa kohdassa toimintonapiksi (Aktivoi /
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

        /// <summary>Pääsivu ja sen alinäkymät (omistaja 29.9.2026 klo 20.2x: Matka-nappi ja Asetukset samaan paneeliin).</summary>
        public enum Nakyma { Paa, Linssit, Aarteet, Matka, Asetukset }
        public Nakyma NykyinenNakyma { get; private set; }

        ScrollView vieritys;
        VisualElement tiedot, aarteet, pohja, esikatselu, esiKuva, runko, asetukset;
        /// <summary>Asetukset-näkymän sisältö (UiNakymat rakentaa: äänentasot, kartta, muut).</summary>
        public VisualElement AsetusKohde => asetukset;
        /// <summary>Asetukset-näkymä avautui (UiNakymat päivittää kytkimet ja säätimet).</summary>
        public event Action AsetuksetAvautuu;
        Label esiOtsikko, esiTeksti, esiTila;
        Button esiNappi;
        Button alaTakaisin;
        Kuvasuurennos suurennos;
        SvgIkoni esiIkoni;
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
            // Linssit ja Aarteet: runko on pelkkä lista (paneeli kapeana, .mk-linssivalitsin--kapea); esikatselu on OMA IKKUNANSA
            // paneelin vasemmalla puolella samalla pergamentilla ja kehyksellä (omistaja 29.9.2026 klo 23.0x, 1.0.56): kuva,
            // nimi ja selite. Ikkunan paikka ja leveys luetaan turva-alueesta (AsetteleEsikatselu).
            runko = Rakenne.El("mk-linssivalitsin__runko", null, PickingMode.Ignore);
            vieritys.contentContainer.Insert(vieritys.contentContainer.IndexOf(lista), runko);
            var oikea = Rakenne.El("mk-linssivalitsin__oikea", runko, PickingMode.Ignore);
            oikea.Add(lista);
            aarteet = Rakenne.El("mk-linssivalitsin__aarteet", oikea, PickingMode.Ignore);
            tiedot = Rakenne.El("mk-linssivalitsin__tiedot", vieritys, PickingMode.Ignore);
            asetukset = Rakenne.El("mk-linssivalitsin__asetukset", vieritys, PickingMode.Ignore);
            pohja = Rakenne.El("mk-pudotus__pohjarivi mk-linssivalitsin__pohja", vieritys, PickingMode.Ignore);
            tiedot.style.display = aarteet.style.display = pohja.style.display = runko.style.display = asetukset.style.display = DisplayStyle.None;

            esikatselu = Rakenne.El("mk-linssivalitsin__esikatselu", turva);
            Rakenne.Tausta(esikatselu, Kuviot.PergamenttiVaalea);
            esikatselu.Add(new KarheaKehys { Sade = 10, Paksuus = 1.2f });
            Kirjasimet.Aseta(esikatselu, Kirjasin.Kone);
            var esiVieritys = new ScrollView(ScrollViewMode.Vertical);
            esiVieritys.AddToClassList("mk-linssivalitsin__esivieritys");
            esiVieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            esiVieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            esikatselu.Add(esiVieritys);
            var esiSisus = esiVieritys.contentContainer;
            esiKuva = Rakenne.El("mk-linssivalitsin__esikuva", esiSisus, PickingMode.Ignore);
            esiIkoni = new SvgIkoni();
            esiIkoni.AddToClassList("mk-linssivalitsin__esiikoni");
            esiIkoni.pickingMode = PickingMode.Ignore;
            esiKuva.Add(esiIkoni);
            esiOtsikko = Rakenne.Teksti("", "mk-linssivalitsin__esiotsikko", esiSisus);
            Kirjasimet.Aseta(esiOtsikko, Kirjasin.LukuLihava);
            esiTeksti = Rakenne.Teksti("", "mk-linssivalitsin__esiteksti", esiSisus);
            Kirjasimet.Aseta(esiTeksti, Kirjasin.Luku);
            esiNappi = Rakenne.Nappi("", "mk-linssivalitsin__esinappi", () => esiToiminto?.Invoke(), esiSisus);
            Kirjasimet.Aseta(esiNappi, Kirjasin.KoneLihava);
            esikatselu.style.display = DisplayStyle.None;
            turva.RegisterCallback<GeometryChangedEvent>(_ => AsetteleEsikatselu());
            suurennos = new Kuvasuurennos(kerros.Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true };
        }

        /// <summary>Kapean paneelin (Linssit, Aarteet) leveys; sama kuin Linssit.uss .mk-linssivalitsin--kapea.</summary>
        const float KapeaLeveys = 232f;
        /// <summary>Paneelin oikea reuna (Linssit.uss .mk-linssivalitsin right) ja rako esikatseluikkunaan.</summary>
        const float PaneelinOikea = 10f, IkkunanRako = 8f, IkkunaMax = 280f;

        /// <summary>Esikatseluikkuna kapean paneelin vasemmalle puolelle samaan yläreunaan; kuva ikkunan levyinen (4:3).</summary>
        void AsetteleEsikatselu()
        {
            if (esikatselu == null || esikatselu.parent == null) return;
            float tila = esikatselu.parent.resolvedStyle.width;
            if (float.IsNaN(tila) || tila <= 0f) return;
            float oikea = PaneelinOikea + Mathf.Min(KapeaLeveys, tila * 0.94f) + IkkunanRako;
            float leveys = Mathf.Clamp(tila - oikea - PaneelinOikea, 0f, IkkunaMax);
            esikatselu.style.right = oikea;
            esikatselu.style.width = leveys;
            esikatselu.style.top = paneeli.style.top;
            esiKuva.style.height = Mathf.Round(Mathf.Max(0f, leveys - 20f) * 0.75f);
        }

        // --- pääsivun osat (UiNakymat.RakennaPuhelinvalikko) -------------------------------------

        /// <summary>Osion otsikko (ÄÄNET, KARTTA, MUUT): vasen reuna, pienet kapiteelit, sama kaikissa näkymissä.</summary>
        public Label LisaOsioOtsikko(string teksti, VisualElement isa = null) =>
            Rakenne.Teksti(teksti.ToUpperInvariant(), "mk-linssivalitsin__valiotsikko", isa ?? lisaosa);

        /// <summary>Äänentasojen liukusäätimet (Asetukset-näkymä; entinen Äänentasot-paneeli).</summary>
        public void LisaSaatimet(VisualElement isa = null)
        {
            var kuori = Rakenne.El("mk-linssivalitsin__saatimet", isa ?? lisaosa, PickingMode.Ignore);
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

        /// <summary>
        /// Alinäkymän rivi pääsivulle ("Linssit ›", "Aarteet ›"); rivi annettuna napit puolikkaina vierekkäin (omistaja 29.9.2026,
        /// 1.0.50-palaute: Linssit ja Aarteet vierekkäin).
        /// </summary>
        public Button LisaAlinakyma(string nimi, string ikoni, Nakyma n, Func<bool> nakyy = null, VisualElement rivi = null)
        {
            var b = ValikkoNappi(rivi ?? lisaosa, nimi, ikoni, () => NaytaNakyma(n),
                "mk-valikkonappi mk-valikkonappi--nav mk-linssivalitsin__alinakyma");
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
            DisplayStyle D(bool b) => b ? DisplayStyle.Flex : DisplayStyle.None;
            lisaosa.style.display = D(paa);
            tiedot.style.display = D(n == Nakyma.Matka);
            asetukset.style.display = D(n == Nakyma.Asetukset);
            pohja.style.display = D(paa);
            lista.style.display = D(n == Nakyma.Linssit);
            paneeli.EnableInClassList("mk-linssivalitsin--kapea", n == Nakyma.Linssit || n == Nakyma.Aarteet);
            runko.style.display = D(n == Nakyma.Linssit || n == Nakyma.Aarteet);
            aarteet.style.display = D(n == Nakyma.Aarteet);
            alaTakaisin.style.display = D(!paa);
            otsikko.text = n switch { Nakyma.Linssit => "LINSSIT", Nakyma.Aarteet => "AARTEET", Nakyma.Matka => "MATKA", Nakyma.Asetukset => "ASETUKSET", _ => "" };
            if (n == Nakyma.Aarteet) RakennaAarteet();
            if (n == Nakyma.Asetukset)
            {
                foreach (var (rivi, nakyy) in lisarivit) rivi.style.display = nakyy == null || nakyy() ? DisplayStyle.Flex : DisplayStyle.None;
                PaivitaKytkimet();
                PaivitaSaatimet();
                AsetuksetAvautuu?.Invoke();
                PaivitaNappirivit();
            }
            // Linssit ja Aarteet: esikatseluikkuna auki heti (aktiivinen linssi tai ensimmäinen aarre), palaute 6–7.
            AsetteleEsikatselu();
            VaraaEsikatselu();
            vieritys.scrollOffset = Vector2.zero;
        }

        // --- esikatselu ------------------------------------------------------------------------------

        void Esikatsele(string id, VisualElement rivi, Label tila, string kuvaUrl, string otsikkoTeksti, string teksti,
            string toimintoNimi, Action toiminto, string ikoni = null)
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
            esiNappi.text = toimintoNimi;
            // Ainoa Aktivoi / Näytä on rivin oranssi nappi nimen kohdalla (omistaja 29.9.2026, palautteet 6 ja 7).
            esiNappi.style.display = DisplayStyle.None;
            TaytaEsikatselu(id, kuvaUrl, otsikkoTeksti, teksti, ikoni);
            Ponnahdus.Avaa(esikatselu, rivi != null ? rivi.worldBound.center : (Vector2?)null);
        }

        void SuljeEsikatselu()
        {
            if (esiTila != null) esiTila.text = esiTilaEnnen ?? "";
            if (esiId != null) foreach (var r in lista.Children().Concat(aarteet.Query<VisualElement>(className: "mk-esikatseltu").ToList())) r.RemoveFromClassList("mk-esikatseltu");
            esiId = null;
            esiTila = null;
            esiToiminto = null;
            if (esikatselu != null && esikatselu.style.display == DisplayStyle.Flex && esikatselu.resolvedStyle.visibility == Visibility.Visible)
                Ponnahdus.Sulje(esikatselu, () => { esikatselu.style.display = DisplayStyle.None; VaraaEsikatselu(); });
        }

        string taytetty;

        /// <summary>
        /// Ikkunan sisältö: kuva tekstin yläpuolella AINA (Päätoimittaja 30.9.2026, omistajan 1.0.56-kohta 5 "linssin kuva ja
        /// selite"): kuva, tai jos sitä ei ole tai se ei lataudu, kohteen viivakuvake isona samassa kehyksessä.
        /// </summary>
        void TaytaEsikatselu(string id, string kuvaUrl, string otsikkoTeksti, string teksti, string ikoni = null)
        {
            taytetty = id;
            esiOtsikko.text = otsikkoTeksti ?? "";
            esiTeksti.text = teksti ?? "";
            esiTeksti.style.display = string.IsNullOrEmpty(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
            esikatselu.style.visibility = StyleKeyword.Null;
            esiKuva.style.backgroundImage = StyleKeyword.Null;
            void Kuvake(bool nakyy)
            {
                bool on = nakyy && !string.IsNullOrEmpty(ikoni);
                if (on) esiIkoni.Polku = ikoni;
                esiIkoni.style.display = on ? DisplayStyle.Flex : DisplayStyle.None;
                esiKuva.EnableInClassList("mk-linssivalitsin__esikuva--kuvake", on);
                esiKuva.style.display = on || !nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            }
            if (string.IsNullOrEmpty(kuvaUrl)) { Kuvake(true); return; }
            Kuvake(false);
            Kuvat.Hae(kuvaUrl, tex =>
            {
                if (taytetty != id) return;
                if (tex != null) esiKuva.style.backgroundImage = new StyleBackground(tex);
                else Kuvake(true);
            });
        }

        /// <summary>
        /// Linssit-näkymässä ikkunassa on avauksesta asti aktiivisen linssin esikatselu (tai "Ei linssiä"), Aarteissa ensimmäinen
        /// kerätty rivi (Aarnin luettelo → Tavarat → Julisteet); ilman kerättyjä ikkuna on kiinni. Muissa näkymissä ja valikon
        /// ollessa kiinni ikkuna on piilossa.
        /// </summary>
        void VaraaEsikatselu()
        {
            if (esikatselu == null || esiId != null) return;
            (string Id, string Kuva, string Nimi, string Selite, string Ikoni)? sisalto = null;
            if (Auki && Valikkona && NykyinenNakyma == Nakyma.Linssit)
                sisalto = aukiId != null && linssiTiedot.TryGetValue(aukiId, out var t)
                    ? ("aktiivinen:" + aukiId, EsikatselunKuva(t), t.Nimi, EsikatselunTeksti(t), LinssinIkoni(t))
                    : ("aktiivinen:", null, "Ei linssiä", "Kartta sellaisena kuin isoisä sen piirsi.", EiLinssiaIkoni);
            else if (Auki && Valikkona && NykyinenNakyma == Nakyma.Aarteet)
            {
                // Tyhjissä Aarteissakin ikkuna (Päätoimittaja 30.9.2026): laukku ja lyhyt selite, kunnes jotain löytyy.
                if (ensimmainenAarre.HasValue)
                {
                    var a = ensimmainenAarre.Value;
                    sisalto = (a.Id, a.Kuva, a.Nimi, a.Selite, Ikonit.Laukku);
                }
                else sisalto = ("aarteet:tyhja", null, "Laukku on vielä tyhjä", "Löydetyt aarteet, tavarat ja julisteet kertyvät tänne.", Ikonit.Laukku);
            }
            if (sisalto == null)
            {
                if (!Ponnahdus.Kaynnissa(esikatselu)) esikatselu.style.display = DisplayStyle.None;
                return;
            }
            esiNappi.style.display = DisplayStyle.None;
            var s = sisalto.Value;
            TaytaEsikatselu(s.Id, s.Kuva, s.Nimi, s.Selite, s.Ikoni);
            // Ikkuna kasvaa paneelin puoleisesta yläkulmasta (oikea yläkulma).
            if (esikatselu.style.display != DisplayStyle.Flex)
                Ponnahdus.Avaa(esikatselu, null, new TransformOrigin(Length.Percent(100), Length.Percent(0), 0));
        }

        bool EsikatseluSisaltaa(Vector2 p) => esikatselu != null && esikatselu.style.display == DisplayStyle.Flex && esikatselu.worldBound.Contains(p);

        // --- Aarteet ---------------------------------------------------------------------------------

        (string Id, string Kuva, string Nimi, string Selite)? ensimmainenAarre;

        void RakennaAarteet()
        {
            aarteet.Clear();
            ensimmainenAarre = null;
            var d = AarteetData?.Invoke();
            if (d == null) { Rakenne.Teksti("Matka ei ole vielä alkanut.", "mk-linssivalitsin__tyhja", aarteet); return; }
            var loydetyt = d.AarninLuettelo.Where(a => a.Loydetty).ToList();
            Osio("Aarnin luettelo", loydetyt.Count, d.AarninLuettelo.Count);
            foreach (var a in loydetyt)
                AarreRivi("aarre:" + a.Id, a.Nimi, a.KuvaUrl, a.Manner, () => Suurenna(a.KuvaUrl, a.Nimi));
            Osio("Tavarat", d.Tavarat.Count, -1);
            foreach (var t in d.Tavarat)
                AarreRivi("tavara:" + t.Id, t.Teksti, t.KuvaUrl, null, () => Suurenna(t.KuvaUrl, t.Nimi));
            // MATKAMUISTOT (Pelikoodari 29.9.2026, elävän linnan etsinnät; Natiivi-UI:n kuittaus): vain kun jotain on löytynyt.
            if (d.Matkamuistot?.Count > 0)
            {
                Osio("Matkamuistot", d.Matkamuistot.Count, -1);
                foreach (var m in d.Matkamuistot) AarreRivi("muisto:" + m.Id, m.Nimi, m.KuvaUrl, m.Selite, () => Suurenna(m.KuvaUrl, m.Nimi));
            }
            // PELIT (Siirtoseppä 1.10.2026, Päätoimittajan linjaus): pelatut lautapelit; napautus avaa pelin uudelleen.
            if (d.Pelit?.Count > 0)
            {
                Osio("Pelit", d.Pelit.Count, -1);
                foreach (var g in d.Pelit)
                {
                    var id = g.Id;
                    AarreRivi("peli:" + id, g.Nimi, null, g.Selite, () => { Sulje(); MyllyNakyma.AvaaPeli(id); });
                }
            }
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
            ensimmainenAarre ??= (id, kuvaUrl, nimi, selite);
            Button b = null;
            Label tila = null;
            b = Rakenne.Nappi(null, "mk-linssirivi mk-linssivalitsin__aarrerivi mk-linssirivi--aktivoi", () =>
            {
                if (esiId != id) { Esikatsele(id, b, tila, kuvaUrl, nimi, selite, "Näytä", nayta, Ikonit.Laukku); return; }
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
            NaytaNakyma(nimi switch { "linssit" => Nakyma.Linssit, "aarteet" => Nakyma.Aarteet, "matka" => Nakyma.Matka, "asetukset" => Nakyma.Asetukset, _ => Nakyma.Paa });
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
