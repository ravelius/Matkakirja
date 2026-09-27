// KORTIN LUKIJA (Natiivi-UI): webin js/lukija.js lisaaLukijanappi — kaiutinkuvake tekstikortin
// otsikkoriville (omistaja 6.9.2026: "Kaikissa missä on tekstiä" luenta).
//
// Napautus lukee kortin tekstit kertojan äänellä (Puhe.Lue, persoona "kertoja") kappale
// kerrallaan; toinen napautus pysäyttää. Vain yksi luenta kerrallaan: uusi kortti tai toisen
// kortin kaiutin pysäyttää edellisen. Luennan aikana kuvake on kultainen (web .lukee #a8741a).
// Kertoja pois → vinoviiva ja nimeksi syy, nappi jää näkyviin (web .mykistetty). Alle 80 merkin
// teksti ei tarjoa kaiutinta (web LUETTAVAN_VAHIMMAIS). Kortin sulkija kutsuu Pysayta.
//
// NOSTOKORTIN LUENNAN SÄÄTIMET (saatimet: true; omistaja 27.9.2026 klo 09.3x, web #3388 js/lukija.js):
//   [⚙] [kaiutin)))]   Juuri = rivi, jonka kortti lisää otsikkoriville (ratas kaiuttimen vasemmalla).
//   1. Kaiutin keskeyttää ja jatkaa (Puhe.Tauko/Jatka, näytteen tarkka). Jos luenta katkeaa muualta (toinen luenta,
//      kortin vaihe), viimeksi kuultu pala jää talteen ja seuraava napautus jatkaa sen alusta; loppuun luettu alkaa alusta.
//   2. Keskeytettynä kaiutin vilkkuu kevyesti (vain läpinäkyvyys, USS-transitio; vähennetty liike: ei vilkuntaa).
//   3. Ratas avaa paneelin: nopeus 0,6–1,6 (Puhe.Nopeus) ja lukijan ääni pelinimellä (Striimiaani.Pelinimet — moottorin
//      tunnus ei näy pelaajalle). Molemmat kuuluvat seuraavasta palasta. Napautus paneelin ohi sulkee.
//   4. Kaiuttimen kolme kaarta ovat VU-mittari kuten isoisän luennassa (Matkakirjakortti.Mittari): luennan aikana
//      Puhe.SoivaTaso, muuten täysinä.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KortinLukija
    {
        public const int Vahimmais = 80;
        const string Mykka = "Äänet ovat mykistettynä — luentaa ei ole";
        const string SaadinOtsikko = "Luennan nopeus ja ääni", JatkaOtsikko = "Jatka kuuntelua", KeskeytaOtsikko = "Keskeytä kuuntelu";
        // Sama kaiutin kuin isoisän luennassa (Matkakirjakortti): runko ja kolme kaarta, jotka ovat VU-mittari.
        const string KaiutinRunko = "M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z";
        static readonly string[] Kaaret =
        {
            "M14.6 9.6a3.4 3.4 0 0 1 0 4.8",
            "M17.1 7.2a6.8 6.8 0 0 1 0 9.6",
            "M19.6 4.8a10.2 10.2 0 0 1 0 14.4",
        };
        static readonly float[] Kynnykset = { 0.04f, 0.10f, 0.20f };
        // Web SAADIN_IKONI (24 × 24): napa, kahdeksan piikkiä ja kehä.
        const string RatasIkoni = "<circle cx=\"12\" cy=\"12\" r=\"2.6\"/>"
            + "<path d=\"M12 4.2v2.2M12 17.6v2.2M4.2 12h2.2M17.6 12h2.2M6.5 6.5l1.55 1.55M15.95 15.95l1.55 1.55"
            + "M6.5 17.5l1.55-1.55M15.95 8.05l1.55-1.55\"/><circle cx=\"12\" cy=\"12\" r=\"5.4\"/>";
        const long VilkkuMs = 700;
        const float SaadotLeveys = 262f;
        static KortinLukija ajossa;

        public readonly Button Nappi;
        /// <summary>Kortille lisättävä elementti: säätimillä rivi [ratas][kaiutin], muuten Nappi.</summary>
        public readonly VisualElement Juuri;
        readonly bool saatimet;
        readonly Button ratas;
        readonly SvgIkoni[] kaaret;
        readonly float[] kaariTaso = new float[3];
        IVisualElementScheduledItem mittari, vilkku;
        VisualElement paneeli;
        string otsikko;
        List<string> palat = new List<string>();
        bool luetaan, keskeytetty;
        int versio;
        /// <summary>Soiva (tai viimeksi kuultu) pala; katkennut luenta jatkaa tästä (web __lukijaKohta).</summary>
        int kohta, jatkoKohta = -1;

        public KortinLukija(VisualElement isa, string otsikko = "Kuuntele kortti", string luokka = null, bool saatimet = false)
        {
            this.otsikko = otsikko;
            this.saatimet = saatimet;
            if (!saatimet)
            {
                Nappi = Rakenne.Nappi(null, "mk-lukija" + (luokka != null ? " " + luokka : ""), Vaihda, isa, Ikonit.Viiva["kaiutin"]);
                Rakenne.El("mk-kaiutin__vinoviiva", Nappi, PickingMode.Ignore);
                Juuri = Nappi;
            }
            else
            {
                Juuri = Rakenne.El("mk-lukija-rivi" + (luokka != null ? " " + luokka : ""), isa, PickingMode.Ignore);
                ratas = Rakenne.Nappi(null, "mk-lukija mk-lukija__ratas", VaihdaPaneeli, Juuri);
                ratas.tooltip = SaadinOtsikko;
                Rakenne.Ikoni(RatasIkoni, "mk-lukija__ratasikoni", ratas);
                Nappi = Rakenne.Nappi(null, "mk-lukija mk-lukija--kortti", Vaihda, Juuri);
                var kuvake = Rakenne.El("mk-kaiutin", Nappi, PickingMode.Ignore);
                Rakenne.Ikoni(KaiutinRunko, "mk-kaiutin__osa", kuvake);
                kaaret = new SvgIkoni[3];
                for (int i = 0; i < 3; i++)
                {
                    kaaret[i] = Rakenne.Ikoni(Kaaret[i], "mk-kaiutin__osa mk-kaiutin__kaari mk-lukija__kaari", kuvake);
                    kaariTaso[i] = 1f;
                }
                Rakenne.El("mk-kaiutin__vinoviiva", kuvake, PickingMode.Ignore);
            }
            Asetukset.Muuttui += _ => PaivitaMykistys();
            PaivitaMykistys();
            Juuri.style.display = DisplayStyle.None;
        }

        /// <summary>Kortin luettavat tekstit (kappaleet); edellinen luenta pysähtyy (web: uusi kortti ruudulle).</summary>
        public void Aseta(IEnumerable<string> tekstit, string otsikko = null)
        {
            if (otsikko != null) this.otsikko = otsikko;
            Pysayta();
            jatkoKohta = -1;
            AsetaKeskeytys(false);
            SuljePaneeli();
            if (ajossa != null && ajossa != this) ajossa.Pysayta();
            var raaka = (tekstit ?? Enumerable.Empty<string>()).Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => t.Trim()).ToList();
            // Lukijan putkitus (Pelikoodari 27.9.): otsikko kappaleen alkuun, pitkä kappale paloiksi.
            palat = Lukijaaani.LuennanPalat(raaka);
            // Säätöratas seuraa kaiutinta: ilman luettavaa ei säätimiäkään (web __lukijaSaadin.hidden).
            Juuri.style.display = raaka.Sum(p => p.Length) >= Vahimmais ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaMykistys();
        }

        void PaivitaMykistys()
        {
            bool mykka = !Puhe.Paalla;
            Nappi.EnableInClassList("mk-mykistetty", mykka);
            PaivitaNimi();
            if (mykka && luetaan) Pysayta();
        }

        void PaivitaNimi()
        {
            if (!Puhe.Paalla) { Nappi.tooltip = Mykka; return; }
            Nappi.tooltip = !saatimet ? otsikko : keskeytetty ? JatkaOtsikko : luetaan ? KeskeytaOtsikko : otsikko;
        }

        void Vaihda()
        {
            if (saatimet && luetaan)
            {
                // Web kortinPainallus: kaiutin keskeyttää ja jatkaa soittimen tauolla.
                var p = Puhe.Instanssi;
                if (p == null) { Pysayta(); return; }
                if (p.Tauolla) p.Jatka();
                else if (!p.Tauko()) return; // pala vielä latautuu: ei taukoa
                AsetaKeskeytys(p.Tauolla);
                PaivitaNimi();
                return;
            }
            if (luetaan) { Pysayta(); return; }
            var puhe = Puhe.Hae();
            if (palat.Count == 0 || puhe == null || !Puhe.Paalla) return;
            if (ajossa != null && ajossa != this) ajossa.Pysayta();
            ajossa = this;
            luetaan = true;
            Nappi.AddToClassList("mk-lukee");
            int v = ++versio, i = saatimet && jatkoKohta >= 0 && jatkoKohta < palat.Count ? jatkoKohta : 0;
            jatkoKohta = -1;
            AsetaKeskeytys(false);
            KaynnistaMittari();
            PaivitaNimi();
            void Seuraava()
            {
                if (v != versio) return;
                if (i >= palat.Count) { jatkoKohta = -1; kohta = palat.Count; Pysayta(); return; } // luettu loppuun: alusta
                kohta = i;
                if (!puhe.Lue(palat[i++], "kertoja", 0, () => UiKerros.PaaSaikeessa(Seuraava))) { Pysayta(); return; }
                Esihae(puhe, palat, i);
            }
            Seuraava();
        }

        /// <summary>
        /// Lukijan putkitus (omistaja 27.9. klo 01.5x: pitkä tauko otsikon ja kappaleiden välissä): kun pala i−1 alkaa soida,
        /// kaksi seuraavaa palaa generoidaan jo taustalla samalla persoonalla (Puhe.Esihae), joten seuraava ei odota
        /// koko generointia. Yhteinen Lehtinakyma- ja Nahtavyysarkki-luennalle.
        /// </summary>
        public static void Esihae(Puhe puhe, IReadOnlyList<string> palat, int i, string persoona = "kertoja")
        {
            if (puhe == null || palat == null) return;
            if (i < palat.Count) puhe.Esihae(palat[i], persoona);
            if (i + 1 < palat.Count) puhe.Esihae(palat[i + 1], persoona);
        }

        /// <summary>Luenta seis (kortti suljettiin, sivu vaihtui tai toinen kortti aukesi).</summary>
        public void Pysayta()
        {
            SuljePaneeli();
            if (!luetaan) return;
            luetaan = false;
            versio++;
            Nappi.RemoveFromClassList("mk-lukee");
            if (ajossa == this) ajossa = null;
            // Web talletaKortinKohta: katkennut kortti jatkaa viimeksi kuullusta palasta (Aseta nollaa uuden sisällön).
            if (saatimet && kohta < palat.Count) { jatkoKohta = kohta; AsetaKeskeytys(true); }
            PysaytaMittari();
            PaivitaNimi();
            Puhe.Instanssi?.Pysayta(0.3f);
        }

        // --- keskeytyksen vilkku ja VU -------------------------------------------------------------

        void AsetaKeskeytys(bool k)
        {
            if (!saatimet) return;
            keskeytetty = k;
            Nappi.EnableInClassList("mk-lukija--keskeytetty", k);
            if (!k || LinssiUi.VahennettyLiike())
            {
                vilkku?.Pause();
                vilkku = null;
                Nappi.RemoveFromClassList("mk-lukija--himmea");
                return;
            }
            // Kevyt vilkku: luokka vaihtuu 700 ms välein ja USS-transitio (opacity) tekee siirtymän. Vain kun kaiutin
            // näkyy; muuten ajo raukeaa (ei piirtoa piilossa).
            if (vilkku != null) return;
            vilkku = Nappi.schedule.Execute(() =>
            {
                if (!keskeytetty || Nappi.panel == null || !Rakenne.Naytetaan(Nappi))
                {
                    vilkku?.Pause();
                    vilkku = null;
                    Nappi.RemoveFromClassList("mk-lukija--himmea");
                    return;
                }
                Nappi.ToggleInClassList("mk-lukija--himmea");
                Ruudunpaivitys.Herata(0.7f);
            }).Every(VilkkuMs);
        }

        void KaynnistaMittari()
        {
            if (!saatimet || mittari != null) return;
            mittari = Nappi.schedule.Execute(Mittari).Every(16);
        }

        void PysaytaMittari()
        {
            mittari?.Pause();
            mittari = null;
            if (kaaret == null) return;
            for (int i = 0; i < 3; i++) { kaariTaso[i] = 1f; kaaret[i].style.opacity = StyleKeyword.Null; }
        }

        /// <summary>Kaaret VU:na (Matkakirjakortti.Mittari: nousu ~18 ms, lasku ~120 ms); tauolla täysinä.</summary>
        void Mittari()
        {
            if (!luetaan || Nappi.panel == null) { PysaytaMittari(); return; }
            var p = Puhe.Instanssi;
            bool tauko = p != null && p.Tauolla;
            float rms = p != null ? p.SoivaTaso : 0f;
            float dt = Time.unscaledDeltaTime;
            for (int i = 0; i < 3; i++)
            {
                float tavoite = tauko ? 1f : rms >= Kynnykset[i] ? 1f : 0.2f;
                float nopeus = tavoite > kaariTaso[i] ? dt / 0.018f : dt / 0.12f;
                kaariTaso[i] = Mathf.MoveTowards(kaariTaso[i], tavoite, nopeus);
                kaaret[i].style.opacity = kaariTaso[i];
            }
            if (!tauko) Ruudunpaivitys.Herata(0.1f);
        }

        // --- säätörattaan paneeli ------------------------------------------------------------------

        static string NopeusTeksti(float arvo) =>
            arvo.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',') + "×";

        void VaihdaPaneeli()
        {
            if (paneeli != null) { SuljePaneeli(); return; }
            // Paneeli kerroksen juureen päällimmäiseksi: rivin lapsena kortin myöhemmät sisarukset (päiväys, otsikko)
            // piirtyivät sen päälle. Paikka rattaan alle, oikea reuna kaiutinrivin oikeaan reunaan.
            var juuri = Juuri.panel?.visualTree;
            if (juuri == null) return;
            paneeli = Rakenne.El("mk-lukija-saadot", juuri);
            var rv = Juuri.worldBound;
            var alku = juuri.WorldToLocal(new Vector2(rv.xMax, ratas.worldBound.yMax + 4f));
            paneeli.style.left = Mathf.Max(8f, Mathf.Round(alku.x - SaadotLeveys));
            paneeli.style.top = Mathf.Round(alku.y);
            paneeli.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());

            var nopeusRivi = Rakenne.El("mk-lukija-saadot__rivi", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Nopeus", "mk-lukija-saadot__nimi", nopeusRivi), Kirjasin.Luku);
            // Äänentasojen liukutyyli (mk-saadin: kultainen täyttö ja nuppi, Aanentasot.LuoSaadinrivi).
            var liuku = new Slider(Puhe.NopeusMin, Puhe.NopeusMax) { value = Puhe.Nopeus, pageSize = 0, fill = true };
            liuku.AddToClassList("mk-saadin");
            liuku.AddToClassList("mk-lukija-saadot__liuku");
            nopeusRivi.Add(liuku);
            var arvo = Rakenne.Teksti(NopeusTeksti(Puhe.Nopeus), "mk-lukija-saadot__arvo", nopeusRivi);
            Kirjasimet.Aseta(arvo, Kirjasin.Luku);
            liuku.RegisterValueChangedCallback(e =>
            {
                // Askel 0,05 (web step): arvo pyöristetään ja tallennetaan heti; kuuluu seuraavasta palasta.
                Puhe.Nopeus = Mathf.Round(e.newValue / Puhe.SaatoAskel) * Puhe.SaatoAskel;
                arvo.text = NopeusTeksti(Puhe.Nopeus);
            });

            var aaniRivi = Rakenne.El("mk-lukija-saadot__rivi", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Ääni", "mk-lukija-saadot__nimi", aaniRivi), Kirjasin.Luku);
            // Pelinimet: näytössä nimi, pyynnössä tunnus (web AANTEN_PELINIMET). Oletus ensin "Aino (oletus)".
            var nimet = new List<string> { Striimiaani.Pelinimet[0].Nimi + " (oletus)" };
            for (int i = 1; i < Striimiaani.Pelinimet.Count; i++) nimet.Add(Striimiaani.Pelinimet[i].Nimi);
            string valittu = Striimiaani.Valittu;
            int indeksi = 0;
            for (int i = 1; i < Striimiaani.Pelinimet.Count; i++) if (Striimiaani.Pelinimet[i].Tunnus == valittu) indeksi = i;
            var valinta = new DropdownField(nimet, indeksi);
            valinta.AddToClassList("mk-lukija-saadot__valinta");
            Kirjasimet.Aseta(valinta, Kirjasin.Luku);
            aaniRivi.Add(valinta);
            valinta.RegisterValueChangedCallback(_ =>
            {
                int k = valinta.index;
                Striimiaani.Aseta(k > 0 ? Striimiaani.Pelinimet[k].Tunnus : null);
            });

            ratas.AddToClassList("mk-valittu");
            Ruudunpaivitys.Herata(0.3f);
            // Napautus paneelin ohi sulkee (web kerran-kuuntelija). Valikon ponnahduslista on omassa paneelissaan.
            Juuri.panel?.visualTree.RegisterCallback<PointerDownEvent>(OhiNapautus, TrickleDown.TrickleDown);
        }

        void OhiNapautus(PointerDownEvent e)
        {
            if (paneeli == null) return;
            if (e.target is VisualElement v && (paneeli.Contains(v) || ratas.Contains(v))) return;
            SuljePaneeli();
        }

        void SuljePaneeli()
        {
            if (paneeli == null) return;
            paneeli.panel?.visualTree.UnregisterCallback<PointerDownEvent>(OhiNapautus, TrickleDown.TrickleDown);
            paneeli.RemoveFromHierarchy();
            paneeli = null;
            Ruudunpaivitys.Herata(0.3f);
            ratas?.RemoveFromClassList("mk-valittu");
        }
    }
}
