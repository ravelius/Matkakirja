// ERIKOISNOSTOT: AJATTELIJAN PÄÄ KARTUUTSIN LIPUN ALLA (omistaja 2.10.2026 klo 12.34, vaihtoehto B; Linssiseppä 2.10.;
// web #3843 js/ajattelijapaat.js kytkeAjattelijaPaat + css/pohjat/erikoisnostot.css ovat malli, mitat
// proto-3d/lokit/linssiseppa-erikoisnostot-web-20261002/mitat.json). Toistaiseksi VAIN KEHITTÄJÄTILASSA (Asetukset.Kehittaja).
//
//  - Sarake roikkuu lipun alla kartuutsin oikean reunan ulkopuolella; kiinni-tilassa (lippu piilossa) paikka lasketaan
//    nimirivistä, ja jos sarake ei mahdu lipun alle, alareuna asettuu kartuutsin alareunan tasalle (ErikoisnostoMitat).
//    Reunaehto (Päätoimittajan OK 2.10.): ei mahdu turva-alueen oikean reunan sisään → kartuutsin yläpuolelle oikeaan reunaan.
//  - Maa = Kartuscha.Maa (ISO3); ajattelijat AjattelijatSovitin.Ajattelijat-rekisteristä (KarttaMaa), enintään 3 allekkain.
//  - Pää: 3D-malli omalla kameralla RenderTextureen (UI/AjattelijaPaat.cs), nappi ilman kehystä kuten webin minipulu.
//  - Nenä kohti näkymän keskustaa ±30°, kartan liike heilauttaa (jousi suhteessa korkeuteen); valo kartan auringosta
//    kartan kameran koordinaateissa kuten web. Piirto vain, kun kääntö tai valo muuttuu.
//  - Napautus: AjattelijatSovitin.AvaaAjattelija(tunnus) (Linssiseppä 2:n ajattelijat-linssi, webin avaaAjattelija).
//  - Piilossa, kun kartuutsi ei näy (linssi, lento, paneelit: Kartuscha.NakyvaKortti).
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Linssit.Ajattelijat;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Erikoisnostot
    {
        sealed class Paa
        {
            public AjattelijaData A;
            public Button Nappi;
            public AjattelijaPaa P;
            public double Kulma, Nopeus;
            public string Piirretty;
        }

        /// <summary>RenderTexturen sivu: 64 pt × min(pikselisuhde, 2) kuten web (iPhone 3× → 128).</summary>
        const int Pikselit = 128;

        readonly UiKerros kerros;
        readonly Kartuscha kartuscha;
        readonly VisualElement turva, sarake;
        readonly List<Paa> paat = new List<Paa>();
        string nykyinenIso;
        double? edellinenLon;
        bool mahtuu, ylla;
        float kaantoViimeksi;
        PalloKierto kierto;
        Camera karttaKamera;
        Aurinko aurinko;

        public Erikoisnostot(UiKerros kerros, Kartuscha kartuscha)
        {
            this.kerros = kerros;
            this.kartuscha = kartuscha;
            turva = kerros.Turva(UiKerros.Tilarivi);
            sarake = Rakenne.El("mk-erikoisnostot", turva, PickingMode.Ignore);
            sarake.style.display = DisplayStyle.None;
            // Maa vaihtuu vain saapuessa: kevyt vahti kuten webin setInterval(tarkista, 400).
            sarake.schedule.Execute(Tarkista).Every(400);
            kerros.JokaRuutu += Ruutu;
        }

        /// <summary>Kartuutsin maa, kun ominaisuus on päällä ja kartuutsi näkyy; muuten null.</summary>
        string NakyvaMaa() => Asetukset.Kehittaja && kartuscha.NakyvaKortti != null ? kartuscha.Maa : null;

        void Tarkista()
        {
            string iso = NakyvaMaa();
            if (iso == nykyinenIso) return;
            nykyinenIso = iso;
            Tyhjenna();
            if (iso == null) return;
            var ajattelijat = AjattelijatSovitin.Ajattelijat.Where(a => a.KarttaMaa == iso).Take(ErikoisnostoMitat.Enintaan).ToList();
            if (ajattelijat.Count == 0) return;
            for (int i = 0; i < ajattelijat.Count; i++)
            {
                var a = ajattelijat[i];
                string tunnus = a.Tunnus;
                // Kosketusnappi ilman oletusteeman ja mk-nappi-tyylejä: pää läpinäkyvällä taustalla kuten minipulu (web).
                var b = new Kosketusnappi(() => Avaa(tunnus)) { text = "" };
                b.RemoveFromClassList(Button.ussClassName);
                b.AddToClassList("mk-erikoisnosto-paa");
                if (i == 0) b.AddToClassList("mk-erikoisnosto-paa--ensimmainen");
                b.tooltip = a.Nimi;   // nimi vain VoiceOverille ja vihjeenä, ei näkyvää tekstiä
                sarake.Add(b);
                var p = new Paa { A = a, Nappi = b };
                p.P = AjattelijaPaat.Luo(a, Pikselit, kerros);
                if (p.P.Kuva != null) b.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(p.P.Kuva));
                p.P.Latautui += () => p.Piirretty = null;   // ensimmäinen kuva heti, kun malli on valmis
                paat.Add(p);
            }
            sarake.style.display = DisplayStyle.Flex;
        }

        static void Avaa(string tunnus)
        {
            Debug.Log("MATKAKIRJA erikoisnostot: napautus " + tunnus);
            if (!AjattelijatSovitin.AvaaAjattelija(tunnus)) Debug.LogWarning("MATKAKIRJA erikoisnostot: ajattelijaa ei voitu avata: " + tunnus);
        }

        void Tyhjenna()
        {
            foreach (var p in paat) AjattelijaPaat.Pura(p.P);
            paat.Clear();
            sarake.Clear();
            sarake.style.display = DisplayStyle.None;
            edellinenLon = null;
        }

        void Ruutu()
        {
            if (paat.Count == 0) return;
            foreach (var p in paat) AjattelijaPaat.Askel(p.P);
            var kortti = kartuscha.NakyvaKortti;
            if (kortti == null || !Asetukset.Kehittaja) { sarake.style.display = DisplayStyle.None; return; }
            sarake.style.display = DisplayStyle.Flex;
            if (!Asemoi(kortti, out float keskiX, out float leveys)) return;

            // Kartan liike: pituusasteen muutos korkeudella (maan säteinä) → heilahdus, jousi takaisin lepoon.
            kierto ??= Object.FindAnyObjectByType<PalloKierto>();
            double potku = 0;
            if (kierto != null)
            {
                double korkeus = (kierto.korkeus > 0 ? kierto.korkeus : kierto.KokoPallonKorkeus()) / 6371000.0;
                if (edellinenLon.HasValue) potku = ErikoisnostoMitat.Potku(edellinenLon.Value, kierto.pituus, korkeus);
                edellinenLon = kierto.pituus;
            }
            var valo = KartanValo();
            foreach (var p in paat)
            {
                (p.Kulma, p.Nopeus) = ErikoisnostoMitat.Heilahda(p.Kulma, p.Nopeus, potku);
                float kaanto = ErikoisnostoMitat.Kaanto(keskiX, leveys, p.Kulma);
                kaantoViimeksi = kaanto;
                string tila = string.Format(CultureInfo.InvariantCulture, "{0:0.00}|{1:0.000},{2:0.000},{3:0.000}", kaanto, valo.x, valo.y, valo.z);
                if (tila == p.Piirretty || !p.P.Valmis) continue;
                p.Piirretty = tila;
                AjattelijaPaat.Piirra(p.P, kaanto, valo);
            }
        }

        /// <summary>Sarakkeen paikka turva-alueessa; keskiX ja leveys ruudun (paneelin) koordinaateissa kääntöä varten.</summary>
        bool Asemoi(VisualElement kortti, out float keskiX, out float leveys)
        {
            keskiX = leveys = 0f;
            // Lippu näkyy vain avatussa kartuutsissa → muuten nimirivi (web).
            static VisualElement Nakyva(VisualElement e) => e != null && e.resolvedStyle.display != DisplayStyle.None && e.worldBound.height > 0 ? e : null;
            var lippu = Nakyva(kortti.Q(className: "mk-kartuscha__lippu")) ?? Nakyva(kortti.Q(className: "mk-kartuscha__nimirivi"));
            if (lippu == null || turva.panel == null) return false;
            var l = lippu.worldBound; var k = kortti.worldBound; var t = turva.worldBound;
            float korkeus = paat.Count * ErikoisnostoMitat.PaaPt + (paat.Count - 1) * ErikoisnostoMitat.Vali;
            var (x, y) = ErikoisnostoMitat.SarakkeenPaikka(l.xMin, l.yMax, k.xMax, k.yMin, k.yMax, korkeus, t.xMax, out mahtuu, out ylla);
            sarake.style.left = x - t.xMin;
            sarake.style.top = y - t.yMin;
            leveys = turva.panel.visualTree.layout.width;
            keskiX = x + ErikoisnostoMitat.PaaPt / 2f;
            return !float.IsNaN(leveys) && leveys > 0;
        }

        /// <summary>
        /// Kartan valon suunta kartan kameran koordinaateissa (webin tapaan: x oikea, y ylös, z kohti katsojaa, z ≥ 0,15),
        /// oletus (0,5, 0,8, 0,6), jos aurinkoa tai kameraa ei löydy.
        /// </summary>
        Vector3 KartanValo()
        {
            aurinko ??= Object.FindAnyObjectByType<Aurinko>();
            if (karttaKamera == null && kierto != null) karttaKamera = kierto.GetComponent<Camera>();
            var valo = aurinko != null ? aurinko.valo : null;
            if (valo == null || karttaKamera == null) return new Vector3(0.5f, 0.8f, 0.6f);
            var c = karttaKamera.transform.InverseTransformDirection(-valo.transform.forward);
            return new Vector3(c.x, c.y, Mathf.Max(0.15f, -c.z));
        }

        /// <summary>Testikomento `ui erikoisnostot`: maa, päät, paikka, mahtuuko, kääntö ja lataustila.</summary>
        public string Tila()
        {
            var s = sarake.worldBound;
            string paaTila = string.Join(", ", paat.Select(p => $"{p.A.Tunnus} {(p.P.Valmis ? "valmis" : p.P.Virhe ?? "latautuu")}"));
            return string.Format(CultureInfo.InvariantCulture, "erikoisnostot: kehittäjä {0}, maa {1}, päitä {2} [{3}], sarake {4:0},{5:0} {6:0}×{7:0}, mahtuu {8}, yllä {9}, kääntö {10:0.0}°, näkyy {11}",
                Asetukset.Kehittaja, nykyinenIso ?? "-", paat.Count, paaTila, s.xMin, s.yMin, s.width, s.height, mahtuu, ylla, kaantoViimeksi,
                sarake.resolvedStyle.display == DisplayStyle.Flex);
        }

        /// <summary>Testikomento `ui erikoisnostot napauta [i]`: pään napautus kuten sormi (avaa ajattelijan).</summary>
        public string Napauta(int i)
        {
            if (i < 0 || i >= paat.Count) return "erikoisnostot: ei päätä " + i;
            Avaa(paat[i].A.Tunnus);
            return "erikoisnostot: napautettu " + paat[i].A.Tunnus;
        }
    }
}
