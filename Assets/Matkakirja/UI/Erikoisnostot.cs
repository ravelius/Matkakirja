// ERIKOISNOSTOT: AJATTELIJAN PÄÄ KARTUUTSIN LIPUN ALLA (omistaja 2.10.2026 klo 12.34, vaihtoehto B; Linssiseppä 2.10.;
// web #3843 js/ajattelijapaat.js kytkeAjattelijaPaat + css/pohjat/erikoisnostot.css ovat malli, mitat
// proto-3d/lokit/linssiseppa-erikoisnostot-web-20261002/mitat.json). Toistaiseksi VAIN KEHITTÄJÄTILASSA (Asetukset.Kehittaja).
//
//  - Sarake roikkuu lipun alla kartuutsin oikean reunan ulkopuolella; kiinni-tilassa (lippu piilossa) paikka lasketaan
//    nimirivistä, ja jos sarake ei mahdu lipun alle, alareuna asettuu kartuutsin alareunan tasalle (ErikoisnostoMitat).
//    OMISTAJA 2.10. 16.4x (loki 307ddc0a7): "ei pään tarvitse väistää kartussia" → ei reunaehtoa: pää pysyy suljetun kartuutsin
//    vieressä, ja avattu kortti saa peittää sen (sarake kortin takana, paikka jäädytetään avauksen ajaksi).
//  - Varjo kartalle (omistaja 16.4x "sen pitäisi tehdä varjo kartalle"): pehmeä ellipsi kaulan alla, siirtyy valoa vastaan.
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
            public VisualElement Kuva, Varjo;
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
        bool mahtuu;
        Vector2? suljettuPaikka;
        static Texture2D varjoKuva;
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
            sarake.SendToBack();   // kartuutsin takana: avattu kortti saa peittää pään (omistaja 2.10. 16.4x)
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
                // Varjo ensin (pään alle), sitten pää: napin omat lapset piirtyvät järjestyksessä.
                var varjo = Rakenne.El("mk-erikoisnosto-paa__varjo", b, PickingMode.Ignore);
                varjo.style.backgroundImage = new StyleBackground(VarjoKuva());
                var kuva = Rakenne.El("mk-erikoisnosto-paa__kuva", b, PickingMode.Ignore);
                var p = new Paa { A = a, Nappi = b, Kuva = kuva, Varjo = varjo };
                p.P = AjattelijaPaat.Luo(a, Pikselit, kerros);
                if (p.P.Kuva != null) kuva.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(p.P.Kuva));
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
            suljettuPaikka = null;
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
                // Varjo valoa vastaan: kaulan alla, sivusuunnassa −x · 10 pt (valo vasemmalta → varjo oikealle).
                p.Varjo.style.left = (ErikoisnostoMitat.PaaPt - VarjoLeveys) / 2f - valo.x * 10f;
                p.Varjo.style.top = ErikoisnostoMitat.PaaPt - VarjoKorkeus * 0.75f + (1f - Mathf.Clamp01(valo.y)) * 4f;
                (p.Kulma, p.Nopeus) = ErikoisnostoMitat.Heilahda(p.Kulma, p.Nopeus, potku);
                float kaanto = ErikoisnostoMitat.Kaanto(keskiX, leveys, p.Kulma);
                kaantoViimeksi = kaanto;
                string tila = string.Format(CultureInfo.InvariantCulture, "{0:0.00}|{1:0.000},{2:0.000},{3:0.000}", kaanto, valo.x, valo.y, valo.z);
                if (tila == p.Piirretty || !p.P.Valmis) continue;
                p.Piirretty = tila;
                AjattelijaPaat.Piirra(p.P, kaanto, valo);
            }
        }

        /// <summary>
        /// Sarakkeen paikka turva-alueessa; keskiX ja leveys ruudun (paneelin) koordinaateissa kääntöä varten. Suljetun kartuutsin
        /// vieressä nimirivin alla (web sarakkeenPaikka ilman reunaehtoa); avatun kortin ajaksi paikka jäädytetään, ja kortti peittää pään.
        /// </summary>
        bool Asemoi(VisualElement kortti, out float keskiX, out float leveys)
        {
            keskiX = leveys = 0f;
            if (turva.panel == null) return false;
            var t = turva.worldBound;
            leveys = turva.panel.visualTree.layout.width;
            if (float.IsNaN(leveys) || leveys <= 0) return false;
            Vector2 paikka;
            if (kartuscha.AukiKortti != null && suljettuPaikka.HasValue) paikka = suljettuPaikka.Value;
            else
            {
                static VisualElement Nakyva(VisualElement e) => e != null && e.resolvedStyle.display != DisplayStyle.None && e.worldBound.height > 0 ? e : null;
                var rivi = Nakyva(kortti.Q(className: "mk-kartuscha__nimirivi"));
                if (rivi == null) return false;
                var l = rivi.worldBound; var k = kortti.worldBound;
                float korkeus = paat.Count * ErikoisnostoMitat.PaaPt + (paat.Count - 1) * ErikoisnostoMitat.Vali;
                var (x, y) = ErikoisnostoMitat.SarakkeenPaikka(l.xMin, l.yMax, k.xMax, k.yMax, korkeus, out mahtuu);
                paikka = new Vector2(x, y);
                if (kartuscha.AukiKortti == null) suljettuPaikka = paikka;
            }
            sarake.style.left = paikka.x - t.xMin;
            sarake.style.top = paikka.y - t.yMin;
            keskiX = paikka.x + ErikoisnostoMitat.PaaPt / 2f;
            return true;
        }

        const float VarjoLeveys = 52f, VarjoKorkeus = 16f;

        /// <summary>Pehmeä varjoellipsi (Gaussin reuna) kartan musteella (Tyylikirja MapInk); tehdään kerran.</summary>
        static Texture2D VarjoKuva()
        {
            if (varjoKuva != null) return varjoKuva;
            const int w = 64, h = 24;
            var tavut = new byte[w * h * 4];
            var m = Tyylikirja.Kehys.MapInk;   // kartan muste (varjo on kartalla)
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                {
                    float dx = (x + 0.5f - w / 2f) / (w / 2f), dy = (y + 0.5f - h / 2f) / (h / 2f);
                    float r2 = dx * dx + dy * dy;
                    float a = Mathf.Exp(-r2 * 3.2f) * 0.42f;
                    int k = (y * w + x) * 4;
                    tavut[k] = m.r; tavut[k + 1] = m.g; tavut[k + 2] = m.b; tavut[k + 3] = (byte)Mathf.RoundToInt(a * 255f);
                }
            varjoKuva = new Texture2D(w, h, TextureFormat.RGBA32, false) { name = "ErikoisnostoVarjo", wrapMode = TextureWrapMode.Clamp, hideFlags = HideFlags.HideAndDontSave };
            varjoKuva.LoadRawTextureData(tavut);
            varjoKuva.Apply(false, true);
            return varjoKuva;
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

        /// <summary>Näkyvän sarakkeen laatikko (paneelin koordinaatit) pulun väistöön, muuten null.</summary>
        public Rect? NakyvaAlue =>
            paat.Count > 0 && kartuscha.AukiKortti == null && sarake.panel != null && sarake.resolvedStyle.display == DisplayStyle.Flex && sarake.worldBound.height > 0
                ? sarake.worldBound : (Rect?)null;

        /// <summary>Testikomento `ui erikoisnostot`: maa, päät, paikka, mahtuuko, kääntö ja lataustila.</summary>
        public string Tila()
        {
            var s = sarake.worldBound;
            string paaTila = string.Join(", ", paat.Select(p => $"{p.A.Tunnus} {(p.P.Valmis ? "valmis" : p.P.Virhe ?? "latautuu")}"));
            return string.Format(CultureInfo.InvariantCulture, "erikoisnostot: kehittäjä {0}, maa {1}, päitä {2} [{3}], sarake {4:0},{5:0} {6:0}×{7:0}, mahtuu {8}, kääntö {9:0.0}°, näkyy {10}",
                Asetukset.Kehittaja, nykyinenIso ?? "-", paat.Count, paaTila, s.xMin, s.yMin, s.width, s.height, mahtuu, kaantoViimeksi,
                sarake.resolvedStyle.display == DisplayStyle.Flex);
        }

        /// <summary>A/B `ui erikoisnostot kipsi|ymparisto r g b`: kipsin sävy ja ympäristövalo, päät piirretään uudelleen.</summary>
        public string Saato(string mika, float r, float g, float b)
        {
            var v = new Vector4(r, g, b, 0f);
            if (mika == "kipsi") AjattelijaPaat.Kipsi = v; else AjattelijaPaat.Ymparisto = v;
            foreach (var p in paat) p.Piirretty = null;
            return string.Format(CultureInfo.InvariantCulture, "erikoisnostot: kipsi {0}, ympäristö {1}", AjattelijaPaat.Kipsi, AjattelijaPaat.Ymparisto);
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
