// ERIKOISNOSTOT: AJATTELIJOIDEN KIPSIPÄÄT KARTTAOBJEKTEINA (omistaja 2.10.2026 klo 12.34, 16.4x ja 16.5x; Linssiseppä 2.10.;
// web #3866 js/ajattelijapaat.js kytkeAjattelijaPaat + css/pohjat/erikoisnostot.css ovat malli). VAIN KEHITTÄJÄTILASSA.
//
//  - Jokaisella ajattelijalla on kiinteä karttapiste (AjattelijaData.KarttaPiste = web kartta.piste; ei kaupunki). Pää liikkuu
//    kartan mukana ja pysyy ruudulla vakiokokoisena kuten karttamerkit: napin keskipiste x = pisteen x, y = pisteen y − 0,35 ×
//    64 pt (pää seisoo pisteen päällä). Nappi on 1,5 × pää (96 pt), koska varjo paperilla ulottuu pään ohi.
//  - Näkyy aina, kun piste on näkyvissä (web, Päätoimittajan täsmennys): ei riipu kartuutsin maasta eikä väistä kartuutsia
//    (avattu kortti saa peittää sen). Piilossa pallon takapuolella, ruudun ulkopuolella sekä linssin, lentopelin,
//    kaupunkikortin, valikon ja muun kuin karttatilan aikana (web body-luokat).
//  - Nenä kohti näkymän keskustaa ±30°, kartan liike heilauttaa (jousi); valo ylhäältä kuten webin pallolaudan suuntavalo,
//    korkeus kiinnitetty 58°:een (web kartanValo), varjo paperille samasta valosta (UI/AjattelijaPaat.cs). Piirto vain, kun
//    kääntö muuttuu.
//  - Napautus: AjattelijatSovitin.AvaaAjattelija(tunnus). Pulu väistää päätä (Pulu.Alareuna, NakyvaAlueet).
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
            public bool Nakyy;
        }

        /// <summary>RenderTexturen sivu: 64 pt × 1,5 (varjo) × min(pikselisuhde, 2) kuten web (iPhone 3× → 192).</summary>
        const int Pikselit = 192;
        const float Kangas = 1.5f, VarjonKorkeusAste = 58f;

        readonly UiKerros kerros;
        readonly VisualElement juuri;
        readonly List<Paa> paat = new List<Paa>();
        bool rakennettu;
        double? edellinenLon;
        PalloKierto kierto;

        public Erikoisnostot(UiKerros kerros, Kartuscha kartuscha)
        {
            this.kerros = kerros;
            // Karttamerkkien kerros (kuten Kutsuminiatyyri): paneelit ja kortit piirtyvät päälle.
            juuri = Rakenne.El("mk-erikoisnostot", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            juuri.schedule.Execute(Tarkista).Every(250);
            kerros.JokaRuutu += Ruutu;
        }

        /// <summary>Saako päitä näyttää nyt (kehittäjätila, peli kartalla, ei linssiä, lentopeliä, korttia tai valikkoa).</summary>
        static bool Sallittu()
        {
            if (!Asetukset.Kehittaja || !UiNakymat.Olemassa) return false;
            var ui = UiNakymat.Hae();
            var o = PeliOhjain.Instanssi;
            return o != null && o.Kaytossa && o.Tila == SilmukanTila.Kartta && ui.Linssit?.Auki == null && !ui.Kaupunkikortti.Nakyvissa
                   && Nappula.Lentopelissa == null && !ui.Valikko.Auki;
        }

        void Tarkista()
        {
            if (rakennettu || !Sallittu()) return;
            rakennettu = true;
            var ajattelijat = AjattelijatSovitin.Ajattelijat.Where(a => a.KarttaPiste != null && !string.IsNullOrEmpty(a.KarttaGlb)).ToList();
            foreach (var a in ajattelijat)
            {
                string tunnus = a.Tunnus;
                // Kosketusnappi ilman oletusteeman ja mk-nappi-tyylejä: pää ja varjo läpinäkyvällä taustalla (web).
                var b = new Kosketusnappi(() => Avaa(tunnus)) { text = "" };
                b.RemoveFromClassList(Button.ussClassName);
                b.AddToClassList("mk-erikoisnosto-paa");
                b.tooltip = a.Nimi;   // nimi vain VoiceOverille ja vihjeenä, ei näkyvää tekstiä
                b.style.display = DisplayStyle.None;
                juuri.Add(b);
                // Varjo ensin (pään alle), sitten pää: napin lapset piirtyvät järjestyksessä.
                var varjo = Rakenne.El("mk-erikoisnosto-paa__kuva", b, PickingMode.Ignore);
                var kuva = Rakenne.El("mk-erikoisnosto-paa__kuva", b, PickingMode.Ignore);
                var p = new Paa { A = a, Nappi = b, Kuva = kuva, Varjo = varjo };
                p.P = AjattelijaPaat.Luo(a, Pikselit, kerros);
                if (p.P.Kuva != null) kuva.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(p.P.Kuva));
                if (p.P.Varjo != null) varjo.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(p.P.Varjo));
                p.P.Latautui += () => p.Piirretty = null;   // ensimmäinen kuva heti, kun malli on valmis
                paat.Add(p);
            }
        }

        static void Avaa(string tunnus)
        {
            Debug.Log("MATKAKIRJA erikoisnostot: napautus " + tunnus);
            if (!AjattelijatSovitin.AvaaAjattelija(tunnus)) Debug.LogWarning("MATKAKIRJA erikoisnostot: ajattelijaa ei voitu avata: " + tunnus);
        }

        void Ruutu()
        {
            if (paat.Count == 0) return;
            foreach (var p in paat) AjattelijaPaat.Askel(p.P);
            bool sallittu = Sallittu();
            juuri.style.display = sallittu ? DisplayStyle.Flex : DisplayStyle.None;
            kierto ??= Object.FindAnyObjectByType<PalloKierto>();
            float W = juuri.layout.width, H = juuri.layout.height;
            if (!sallittu || kierto == null || juuri.panel == null || float.IsNaN(W) || W <= 0)
            {
                foreach (var p in paat) Nayta(p, false);
                return;
            }

            // Kartan liike: pituusasteen muutos korkeudella (maan säteinä) → heilahdus, jousi takaisin lepoon; pää ei liu'u.
            double korkeus = (kierto.korkeus > 0 ? kierto.korkeus : kierto.KokoPallonKorkeus()) / 6371000.0;
            double potku = edellinenLon.HasValue ? ErikoisnostoMitat.Potku(edellinenLon.Value, kierto.pituus, korkeus) : 0;
            edellinenLon = kierto.pituus;
            var valo = KartanValo();
            foreach (var p in paat)
            {
                // Karttapiste ruudulle; false = pallon takana tai ruudun ulkopuolella.
                if (!p.P.Valmis || !kierto.RuutuPiste(p.A.KarttaPiste[0], p.A.KarttaPiste[1], out var r))
                {
                    Nayta(p, false);
                    continue;
                }
                var q = juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y)));
                if (!ErikoisnostoMitat.PaanRuutupaikka(q.x, q.y, W, H, out float x, out float y)) { Nayta(p, false); continue; }
                float koko = ErikoisnostoMitat.PaaPt * Kangas;
                p.Nappi.style.left = x - koko / 2f;
                p.Nappi.style.top = y - koko / 2f;
                Nayta(p, true);
                (p.Kulma, p.Nopeus) = ErikoisnostoMitat.Heilahda(p.Kulma, p.Nopeus, potku);
                float kaanto = ErikoisnostoMitat.Kaanto(x, W, p.Kulma);
                string tila = string.Format(CultureInfo.InvariantCulture, "{0:0.00}|{1:0.000},{2:0.000},{3:0.000}", kaanto, valo.x, valo.y, valo.z);
                if (tila == p.Piirretty) continue;
                p.Piirretty = tila;
                AjattelijaPaat.Piirra(p.P, kaanto, valo);
            }
        }

        static void Nayta(Paa p, bool nakyy)
        {
            if (p.Nakyy == nakyy) return;
            p.Nakyy = nakyy;
            p.Nappi.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>
        /// Valon suunta pään kameran koordinaateissa (web kartanValo: x oikea, y ylös, z kohti katsojaa; korkeus kiinnitetty 58°:een).
        /// Suunta paperin tasossa on webin pallolaudan suuntavalon mitattu suunta (kameran yläpuolelta: x 0, y 0,78 → (0, 1); mitattu
        /// 2.10. GRC ja ITA). Natiivin karttatilan rinnevalo tulee sivulta, jolloin varjo jäi pään taakse (simulaattori 8be87066:
        /// maski oikealla, ei leuan alla) → webin suunta, jotta pää seisoo kartalla samoin.
        /// </summary>
        static Vector3 KartanValo()
        {
            const float dx = 0f, dy = 1f;
            float kor = VarjonKorkeusAste * Mathf.Deg2Rad;
            return new Vector3(dx * Mathf.Cos(kor), dy * Mathf.Cos(kor), Mathf.Sin(kor));
        }

        /// <summary>Näkyvien päiden laatikot (paneelin koordinaatit) pulun väistöön.</summary>
        public IEnumerable<Rect> NakyvaAlueet()
        {
            foreach (var p in paat)
                if (p.Nakyy && p.Kuva.panel != null && p.Kuva.worldBound.height > 0)
                {
                    // Vain pää (keskimmäinen 64 pt), ei varjon reunusta.
                    var b = p.Kuva.worldBound;
                    float s = b.width / Kangas, m = (b.width - s) / 2f;
                    yield return new Rect(b.xMin + m, b.yMin + m, s, s);
                }
        }

        /// <summary>Testikomento `ui erikoisnostot`: päät, näkyvyys, paikka ja lataustila.</summary>
        public string Tila()
        {
            var osat = paat.Select(p =>
            {
                var b = p.Nappi.worldBound;
                return string.Format(CultureInfo.InvariantCulture, "{0} {1} {2}", p.A.Tunnus, p.P.Valmis ? "valmis" : p.P.Virhe ?? "latautuu",
                    p.Nakyy ? $"näkyy {b.center.x:0},{b.center.y:0}" : "piilossa");
            });
            return $"erikoisnostot: kehittäjä {Asetukset.Kehittaja}, sallittu {Sallittu()}, päitä {paat.Count} [{string.Join("; ", osat)}]";
        }

        /// <summary>A/B `ui erikoisnostot kipsi r g b`: kipsin sävykerroin, päät piirretään uudelleen.</summary>
        public string Saato(string mika, float r, float g, float b)
        {
            AjattelijaPaat.Savy = new Vector4(r, g, b, 0f);
            foreach (var p in paat) p.Piirretty = null;
            return "erikoisnostot: sävy " + AjattelijaPaat.Savy;
        }

        /// <summary>Diagnostiikka `ui erikoisnostot varjokuva` ja A/B `ui erikoisnostot varjo peitto sumennus syvyys`.</summary>
        public string Varjo(string[] a)
        {
            if (a.Length >= 4)
            {
                AjattelijaPaat.VarjoPeitto = float.Parse(a[1], CultureInfo.InvariantCulture);
                AjattelijaPaat.VarjoSumennus = float.Parse(a[2], CultureInfo.InvariantCulture);
                AjattelijaPaat.VarjoSyvyys = float.Parse(a[3], CultureInfo.InvariantCulture);
                foreach (var p in paat) p.Piirretty = null;
            }
            return "erikoisnostot: " + string.Join(" | ", paat.Select(p => p.A.Tunnus + ": " + AjattelijaPaat.VarjoKuva(p.P)))
                + string.Format(CultureInfo.InvariantCulture, " (peitto {0}, sumennus {1}, syvyys {2})", AjattelijaPaat.VarjoPeitto, AjattelijaPaat.VarjoSumennus, AjattelijaPaat.VarjoSyvyys);
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
