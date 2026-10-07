// KAUPUNKIOPAS KARTTAELEMENTTINÄ (omistaja 7.10.2026 klo 08.3x Päätoimittajan kautta; Linssiseppä 2): kiinnitetty kuumailmapallo
// jokaisen sallitun 3D-kaupungin keskipisteessä (LS2:n sallitut-lista, Pöllön /opas/aineistot "sallitut", OpasSovitin
// lukee ja säilyttää sen; lista palvelimelta, joten muutokset kuten Varsovan poisto näkyvät ilman junaa). Napautus avaa sen
// kaupungin oppaan suoraan (LS1:n kaupunkitila). Mekanismi kuten ajattelijoiden kipsipäät (UI/Erikoisnostot.cs):
//
//  - Pallo on karttaobjekti: nappi liikkuu kartan mukana, kuvan alareunan keskikohta (köyden pää) kaupungin keskipisteessä.
//  - Näkyvyys ja koko zoomin mukaan (Kartta/KaupunkiPalloMitat.cs): näkyy kameran korkeudella ≤ 2 600 km (häivytys 2 000 km:stä),
//    koko 84 → 120 pt lähestyessä (osuma-ala = nappi ≥ 44 × 44 pt). Piilossa pallon takapuolella, ruudun ulkopuolella sekä linssin, lentopelin, kaupunkikortin,
//    valikon ja muun kuin karttatilan aikana (kuten päät).
//  - Malli: Linnanrakentajan kiinnitetty kuumailmapallo (ilmapallo-v1, keski). Kaikki pallot ovat samanlaisia, joten kuva
//    piirretään kerran omalla kameralla RenderTextureen (UI/KaupunkiPalloKuva.cs) ja jaetaan kaikille napeille.
//  - Puoli (omistaja 7.10. 12.4x: "Kreikassa kuumailmapallo jää Ateenan nostokortin taakse"): pallo kallistuu oletuksena vasemmalle;
//    jos pelaajan kaupungin kutsukortti (Kutsuminiatyyri) on pisteen lähellä vasemmalla, pallo peilataan oikealle. Kortin paikka on
//    lukittu kaupunkia kohden, joten puoli päätetään kerran (KaupunkiPalloMitat.Oikealle) eikä vaihdu zoomatessa.
//  - Tyylit: olemassa oleva ERIKOISNOSTOT-pohja (mk-erikoisnosto-paa, __kuva); nimi vain VoiceOverille.
//  - Napautus: OpasSovitin.AvaaKaupunkitila(id) (LS1:n kaupunkitila, juna 159); lista OpasSovitin.SallitutLista / LataaSallitut. Pulu väistää palloa (Pulu.Alareuna, NakyvaAlueet).
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiPallot
    {
        sealed class Pallo
        {
            public string Id, Nimi;
            public double Lat, Lon;
            public Button Nappi;
            public VisualElement Kuva;
            public bool Nakyy;
            /// <summary>Pallo kallistuu oikealle (kuva peilattu takaisin), kun kaupungin kutsukortti on vasemmalla; päätetään
            /// kerran kaupunkia kohden, kun kortti näkyy (kortin paikka on lukittu), ettei pallo vaihda puolta zoomatessa.</summary>
            public bool Oikea, PuoliPaatetty;
        }

        /// <summary>RenderTexturen sivu: suurin koko 120 pt × min(pikselisuhde, 3).</summary>
        const int Pikselit = 360;

        readonly UiKerros kerros;
        readonly VisualElement juuri;
        readonly List<Pallo> pallot = new List<Pallo>();
        KaupunkiPalloKuva kuva;
        PalloKierto kierto;
        bool listaVaihtui = true;
        float lataus = -1f;
        /// <summary>A/B ja testit: `ui kaupunkipallot 0|1` (oletus päällä).</summary>
        public static bool Paalla = true;

        public KaupunkiPallot(UiKerros kerros)
        {
            this.kerros = kerros;
            // Karttamerkkien kerros kuten päät: paneelit ja kortit piirtyvät päälle; kerroksen alimmaksi.
            juuri = Rakenne.El("mk-erikoisnostot", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            juuri.SendToBack();
            juuri.style.display = DisplayStyle.None;
            OpasSovitin.SallitutVaihtui += () => listaVaihtui = true;
            juuri.schedule.Execute(Tarkista).Every(500);
            kerros.JokaRuutu += Ruutu;
        }

        /// <summary>Saako palloja näyttää nyt (peli kartalla, ei linssiä, lentopeliä, korttia tai valikkoa).</summary>
        static bool Sallittu()
        {
            if (!Paalla || !UiNakymat.Olemassa) return false;
            var ui = UiNakymat.Hae();
            var o = PeliOhjain.Instanssi;
            return o != null && o.Kaytossa && o.Tila == SilmukanTila.Kartta && ui.Linssit?.Auki == null && !ui.Kaupunkikortti.Nakyvissa
                   && Nappula.Lentopelissa == null && !ui.Valikko.Auki;
        }

        void Tarkista()
        {
            if (!Sallittu()) return;
            // Lista: OpasSovitin lukee levyltä ja hakee palvelimelta (myös ilman oppaan avausta; uusinta 10 min); tyhjä = ei palloja.
            // Kutsu enintään minuutin välein, ettei epäonnistunut haku toistu puolen sekunnin välein (lista null → uusi haku).
            if (Time.realtimeSinceStartup - lataus > 60f || lataus < 0f) { lataus = Time.realtimeSinceStartup; OpasSovitin.LataaSallitut(); }
            if (!listaVaihtui) return;
            listaVaihtui = false;
            Rakenna(OpasSovitin.SallitutLista);
        }

        void Rakenna(IReadOnlyList<OpasSallitut.Kaupunki> lista)
        {
            foreach (var p in pallot) p.Nappi.RemoveFromHierarchy();
            pallot.Clear();
            if (lista == null || lista.Count == 0) return;
            kuva ??= KaupunkiPalloKuva.Luo(Pikselit);
            foreach (var k in lista)
            {
                if (string.IsNullOrEmpty(k.Id) || double.IsNaN(k.Lat) || double.IsNaN(k.Lon)) continue;
                string id = k.Id;
                // Kosketusnappi ilman oletusteeman ja mk-nappi-tyylejä: pallo läpinäkyvällä taustalla (kuten päät).
                var b = new Kosketusnappi(() => Avaa(id)) { text = "" };
                b.RemoveFromClassList(Button.ussClassName);
                b.AddToClassList("mk-erikoisnosto-paa");
                b.tooltip = k.Nimi + ": kaupunkiopas";   // vain VoiceOverille ja vihjeenä
                b.name = "kaupunkipallo-" + id;   // todistusajon haku (tap-teksti kaupunkipallo-<id>)
                b.style.display = DisplayStyle.None;
                juuri.Add(b);
                var kv = Rakenne.El("mk-erikoisnosto-paa__kuva", b, PickingMode.Ignore);
                kv.name = b.name;   // todistusajon ui-puu listaa kuvaelementit (napin nimi ei näy siellä)
                if (kuva?.Kuva != null) kv.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(kuva.Kuva));
                pallot.Add(new Pallo { Id = id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, Nappi = b, Kuva = kv });
            }
            Debug.Log($"MATKAKIRJA kaupunkipallot: {pallot.Count} kaupunkia: {string.Join(", ", pallot.Select(p => p.Id))}");
        }

        static void Avaa(string id)
        {
            Debug.Log("MATKAKIRJA kaupunkipallot: napautus " + id);
            if (!OpasSovitin.AvaaKaupunkitila(id)) Debug.LogWarning("MATKAKIRJA kaupunkipallot: opasta ei voitu avata: " + id);
        }

        void Ruutu()
        {
            if (pallot.Count == 0) return;
            kuva?.Askel();
            bool sallittu = Sallittu();
            juuri.style.display = sallittu ? DisplayStyle.Flex : DisplayStyle.None;
            kierto ??= Object.FindAnyObjectByType<PalloKierto>();
            float W = juuri.layout.width, H = juuri.layout.height;
            double korkeus = kierto == null ? double.NaN : kierto.korkeus > 0 ? kierto.korkeus : kierto.KokoPallonKorkeus();
            float peitto = KaupunkiPalloMitat.Peitto(korkeus);
            if (!sallittu || kierto == null || juuri.panel == null || float.IsNaN(W) || W <= 0 || peitto <= 0f || kuva == null || !kuva.Valmis)
            {
                foreach (var p in pallot) Nayta(p, false);
                return;
            }
            float koko = KaupunkiPalloMitat.Koko(korkeus);
            // Kutsukortti (pelaajan kaupunki, Kutsuminiatyyri): pallo kortista poispäin (omistaja 7.10. 12.4x, Ateena).
            var kortti = UiNakymat.Olemassa ? UiNakymat.Hae().Kutsu?.Laatikko ?? default : default;
            Vector2 kk = kortti.width > 0 ? juuri.WorldToLocal(kortti.center) : new Vector2(float.NaN, float.NaN);
            foreach (var p in pallot)
            {
                // Karttapiste ruudulle; false = pallon takana tai ruudun ulkopuolella.
                if (!kierto.RuutuPiste(p.Lat, p.Lon, out var r)) { Nayta(p, false); continue; }
                var q = juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y)));
                if (!KaupunkiPalloMitat.Ruutupaikka(q.x, q.y, koko, W, H, out float x, out float y)) { Nayta(p, false); continue; }
                if (!p.PuoliPaatetty && KaupunkiPalloMitat.Oikealle(q.x, q.y, kk.x, kk.y, koko) is bool oikea)
                {
                    p.PuoliPaatetty = true;
                    if (oikea != p.Oikea) { p.Oikea = oikea; p.Kuva.style.scale = new Scale(new Vector3(oikea ? -1f : 1f, 1f, 1f)); }
                    Debug.Log($"MATKAKIRJA kaupunkipallot: {p.Id} {(oikea ? "oikealle" : "vasemmalle")} (kortti {(kk.x < q.x ? "vasemmalla" : "oikealla")}, {kk.x - q.x:0},{kk.y - q.y:0} pt)");
                }
                p.Nappi.style.left = x;
                p.Nappi.style.top = y;
                p.Nappi.style.width = koko;
                p.Nappi.style.height = koko;
                p.Nappi.style.opacity = peitto;
                p.Nappi.pickingMode = peitto > 0.5f ? PickingMode.Position : PickingMode.Ignore;   // häipyvää ei napauteta
                Nayta(p, true);
            }
        }

        static void Nayta(Pallo p, bool nakyy)
        {
            if (p.Nakyy == nakyy) return;
            p.Nakyy = nakyy;
            p.Nappi.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Näkyvien pallojen laatikot (paneelin koordinaatit) pulun väistöön.</summary>
        public IEnumerable<Rect> NakyvaAlueet()
        {
            foreach (var p in pallot)
                if (p.Nakyy && p.Kuva.panel != null && p.Kuva.worldBound.height > 0)
                    yield return p.Kuva.worldBound;
        }

        /// <summary>Testikomento `ui kaupunkipallot`: lista, näkyvyys ja paikka.</summary>
        public string Tila()
        {
            double korkeus = kierto == null ? double.NaN : kierto.korkeus > 0 ? kierto.korkeus : kierto.KokoPallonKorkeus();
            var nakyvat = pallot.Where(p => p.Nakyy).Select(p =>
            {
                var b = p.Nappi.worldBound;
                return string.Format(CultureInfo.InvariantCulture, "{0} {1:0},{2:0} {3:0}pt {4}", p.Id, b.center.x, b.center.y, b.width, p.Oikea ? "oikea" : "vasen");
            });
            return string.Format(CultureInfo.InvariantCulture,
                "kaupunkipallot: {0}, sallittu {1}, kuva {2}, kaupunkeja {3}, korkeus {4:0} km, peitto {5:0.00}, koko {6:0} pt, näkyvät [{7}]",
                Paalla ? "päällä" : "pois", Sallittu(), kuva == null ? "-" : kuva.Valmis ? "valmis" : kuva.Virhe ?? "latautuu", pallot.Count,
                korkeus / 1000, KaupunkiPalloMitat.Peitto(korkeus), KaupunkiPalloMitat.Koko(korkeus), string.Join("; ", nakyvat));
        }

        /// <summary>Testikomento `ui kaupunkipallot napauta <id|i>`: napautus kuten sormi (avaa kaupungin oppaan).</summary>
        public string Napauta(string kohde)
        {
            var p = int.TryParse(kohde, out int i) ? (i >= 0 && i < pallot.Count ? pallot[i] : null) : pallot.FirstOrDefault(x => x.Id == kohde);
            if (p == null) return "kaupunkipallot: ei palloa " + kohde;
            Avaa(p.Id);
            return "kaupunkipallot: napautettu " + p.Id;
        }
    }
}
