// KAUPUNKIOPAS KARTTAELEMENTTINÄ (omistaja 7.10.2026 klo 08.3x Päätoimittajan kautta; Linssiseppä 2): kiinnitetty kuumailmapallo
// jokaisen sallitun 3D-kaupungin keskipisteessä (LS2:n sallitut-lista, Pöllön /opas/aineistot "sallitut", OpasSovitin
// lukee ja säilyttää sen; lista palvelimelta, joten muutokset kuten Varsovan poisto näkyvät ilman junaa). Napautus avaa sen
// kaupungin oppaan suoraan (LS1:n kaupunkitila). Mekanismi kuten ajattelijoiden kipsipäät (UI/Erikoisnostot.cs):
//
//  - Pallo on karttaobjekti: nappi liikkuu kartan mukana, kuvan alareunan keskikohta (köyden pää) kaupungin keskipisteessä.
//  - Näkyvyys (omistaja 7.10. 12.5x: "vain siinä maassa, missä parhaillaan ollaan"): vain pelaajan nykyisen maan
//    (NostoKerros.NykyinenMaa) sallittujen kaupunkien pallot kaikilla zoomeilla, maan vaihtuessa häivytys kuten kipsipäillä;
//    ei sallittua kaupunkia maassa → ei palloja. Koko zoomin mukaan (Kartta/KaupunkiPalloMitat.cs): 84 → 120 pt lähestyessä (osuma-ala = nappi ≥ 44 × 44 pt). Piilossa pallon takapuolella, ruudun ulkopuolella sekä linssin, lentopelin, kaupunkikortin,
//    valikon ja muun kuin karttatilan aikana (kuten päät).
//  - Malli: Linnanrakentajan kiinnitetty kuumailmapallo (ilmapallo-v1, keski). Kaikki pallot ovat samanlaisia, joten kuva
//    piirretään kerran omalla kameralla RenderTextureen (UI/KaupunkiPalloKuva.cs) ja jaetaan kaikille napeille.
//  - Puoli (omistaja 7.10. 12.4x: "Kreikassa kuumailmapallo jää Ateenan nostokortin taakse"): pallo kallistuu oletuksena vasemmalle;
//    jos pelaajan kaupungin kutsukortti (Kutsuminiatyyri) on pisteen lähellä vasemmalla, pallo peilataan oikealle. Kortin paikka on
//    lukittu kaupunkia kohden, joten puoli päätetään kerran (KaupunkiPalloMitat.Oikealle) eikä vaihdu zoomatessa; vain korttia
//    lähin pallo, ja maan vaihtuessa puolet päätetään uudelleen.
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
            /// <summary>Kaupungin maa (ISO3, pelin kaupunkidata tai lähin laudan kaupunki); null = ei vielä tiedossa.</summary>
            public string Maa;
            /// <summary>Häivytys 0…1 (pelaajan maa → 1, muu → 0) kuten kipsipäillä.</summary>
            public float Peitto;
        }

        /// <summary>RenderTexturen sivu: suurin koko 120 pt × min(pikselisuhde, 3).</summary>
        const int Pikselit = 360;

        readonly UiKerros kerros;
        readonly VisualElement juuri;
        readonly List<Pallo> pallot = new List<Pallo>();
        KaupunkiPalloKuva kuva, kipsiKuva;
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
            // Päällimmäiseksi (omistaja 7.10. 14.5x, Mac TF 160: "ei vain ota napsautusta vastaan tai napsautuksen ottaa elementti
            // kuumailman pallon takana"): näkyvä pallo on aina ylin osumakohde nimiöiden, merkkien ja nappulan yllä; osuma vain
            // kuoressa ja korissa (PalloNappi.ContainsPoint), joten pallon läpinäkyvä kehys ei sieppaa alla olevien klikkauksia.
            juuri.BringToFront();
            juuri.schedule.Execute(() => { if (juuri.parent != null && juuri.parent.IndexOf(juuri) != juuri.parent.childCount - 1) juuri.BringToFront(); }).Every(1000);
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
            if (lista.Any(k => !Kehityskaupunki(k.Id))) kipsiKuva ??= KaupunkiPalloKuva.Luo(Pikselit, kipsi: true);
            foreach (var k in lista)
            {
                if (string.IsNullOrEmpty(k.Id) || double.IsNaN(k.Lat) || double.IsNaN(k.Lon)) continue;
                string id = k.Id;
                // Kosketusnappi ilman oletusteeman ja mk-nappi-tyylejä: pallo läpinäkyvällä taustalla (kuten päät).
                var b = new PalloNappi(() => Avaa(id)) { text = "" };
                b.RemoveFromClassList(Button.ussClassName);
                b.AddToClassList("mk-erikoisnosto-paa");
                b.tooltip = Kieli.T("ui.pallo.kaupunkiopas", k.Nimi);   // vain VoiceOverille ja vihjeenä
                b.name = "kaupunkipallo-" + id;   // todistusajon haku (tap-teksti kaupunkipallo-<id>)
                b.style.display = DisplayStyle.None;
                juuri.Add(b);
                var kv = Rakenne.El("mk-erikoisnosto-paa__kuva", b, PickingMode.Ignore);
                kv.name = b.name;   // todistusajon ui-puu listaa kuvaelementit (napin nimi ei näy siellä)
                // Kehityskaupunki: värillinen pallo; muut kipsinä (omistaja 8.10.2026 klo 20.4x), toimivat samoin.
                var oma = Kehityskaupunki(id) || kipsiKuva?.Kuva == null ? kuva : kipsiKuva;
                if (oma?.Kuva != null) kv.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(oma.Kuva));
                pallot.Add(new Pallo { Id = id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, Nappi = b, Kuva = kv });
            }
            Debug.Log($"MATKAKIRJA kaupunkipallot: {pallot.Count} kaupunkia: {string.Join(", ", pallot.Select(p => p.Id))}");
        }

        /// <summary>Pidemmälle viety kaupunki (omistaja 8.10.2026: Tukholma ja Pariisi): LS1:n Ydin Matkakirja.Linssit.Kehityskaupungit
        /// suoraan (9.10.: heijastus pois, puuttuva rajapinta kaatuu käännökseen; KehityskaupungitTestit).</summary>
        static bool Kehityskaupunki(string id) => Matkakirja.Linssit.Kehityskaupungit.On(id);

        static void Avaa(string id)
        {
            Debug.Log("MATKAKIRJA kaupunkipallot: napautus " + id);
            if (!OpasSovitin.AvaaKaupunkitila(id)) Debug.LogWarning("MATKAKIRJA kaupunkipallot: opasta ei voitu avata: " + id);
        }

        void Ruutu()
        {
            if (pallot.Count == 0) return;
            kuva?.Askel();
            kipsiKuva?.Askel();
            bool sallittu = Sallittu();
            juuri.style.display = sallittu ? DisplayStyle.Flex : DisplayStyle.None;
            kierto ??= Object.FindAnyObjectByType<PalloKierto>();
            float W = juuri.layout.width, H = juuri.layout.height;
            double korkeus = kierto == null ? double.NaN : kierto.korkeus > 0 ? kierto.korkeus : kierto.KokoPallonKorkeus();
            if (!sallittu || kierto == null || juuri.panel == null || float.IsNaN(W) || W <= 0 || kuva == null || !kuva.Valmis)
            {
                foreach (var p in pallot) Nayta(p, false);
                return;
            }
            float koko = KaupunkiPalloMitat.Koko(korkeus);
            // Kutsukortti (pelaajan kaupunki, Kutsuminiatyyri): pallo kortista poispäin (omistaja 7.10. 12.4x, Ateena).
            var kortti = UiNakymat.Olemassa ? UiNakymat.Hae().Kutsu?.Laatikko ?? default : default;
            Vector2 kk = kortti.width > 0 ? juuri.WorldToLocal(kortti.center) : new Vector2(float.NaN, float.NaN);
            // Vain pelaajan nykyisen maan pallot (omistaja 7.10. 12.5x), kaikilla zoomeilla; maan vaihtuessa häivytys nostojen
            // syttymisen ajassa kuten kipsipäillä (ErikoisnostoMitat.OmaMaa, Haivytys).
            var nk = NostoKerros.Instanssi;
            string maa = nk != null ? nk.NykyinenMaa : null;
            bool kaikki = Paavalikko.MaailmaNakyma;   // kehittäjän maailmanäkymä (huntu pois): kaikkien maiden pallot (TF 162)
            // UI-häivytys enintään Tyylikirja.Kesto.Avaus (0,22 s; pallotilan katselmointi 9.10., oli nostojen 0,3 s).
            float kesto = Mathf.Min(nk != null ? nk.syttyminenS : 0.3f, Tyylikirja.Kesto.Avaus / 1000f);
            if (maa != edellinenMaa || kaikki != edellinenKaikki)
            {
                edellinenMaa = maa; edellinenKaikki = kaikki;
                foreach (var x in pallot) x.PuoliPaatetty = false;   // uusi maa: puolet uudelleen pelaajan kaupungin kortin mukaan
                Debug.Log($"MATKAKIRJA kaupunkipallot: maa {maa ?? "-"}, näkyvät: " + string.Join(", ",
                    pallot.Where(x => KaupunkiPalloMitat.Nakyy(PallonMaa(x), maa, kaikki)).Select(x => x.Id).DefaultIfEmpty("-")));
            }
            // Kortti kuuluu pelaajan kaupunkiin: vain korttia lähin pallo ratkaisee puolensa (simu af5922b9: Sevillan kortti käänsi
            // Granadan ja Tampereen kortti Helsingin pallon).
            Pallo lahin = null;
            if (!float.IsNaN(kk.x))
            {
                float pd = float.MaxValue;
                foreach (var p in pallot)
                    if (p.Peitto > 0f && kierto.RuutuPiste(p.Lat, p.Lon, out var rp))
                    {
                        var qp = juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(rp.x, Screen.height - rp.y)));
                        float d = (qp - kk).sqrMagnitude;
                        if (d < pd) { pd = d; lahin = p; }
                    }
            }
            foreach (var p in pallot)
            {
                bool oma = KaupunkiPalloMitat.Nakyy(PallonMaa(p), maa, kaikki);
                p.Peitto = ErikoisnostoMitat.Haivytys(p.Peitto, oma, Time.unscaledDeltaTime, kesto);
                // Karttapiste ruudulle; false = pallon takana tai ruudun ulkopuolella. Muu maa: piilossa, kun häivytys on ohi.
                if (p.Peitto <= 0f || !kierto.RuutuPiste(p.Lat, p.Lon, out var r)) { Nayta(p, false); continue; }
                var q = juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y)));
                if (!KaupunkiPalloMitat.Ruutupaikka(q.x, q.y, koko, W, H, out float x, out float y)) { Nayta(p, false); continue; }
                if (!p.PuoliPaatetty && p == lahin && KaupunkiPalloMitat.Oikealle(q.x, q.y, kk.x, kk.y, koko) is bool oikea)
                {
                    p.PuoliPaatetty = true;
                    if (oikea != p.Oikea) { p.Oikea = oikea; ((PalloNappi)p.Nappi).Oikea = oikea; p.Kuva.style.scale = new Scale(new Vector3(oikea ? -1f : 1f, 1f, 1f)); }
                    Debug.Log($"MATKAKIRJA kaupunkipallot: {p.Id} {(oikea ? "oikealle" : "vasemmalle")} (kortti {(kk.x < q.x ? "vasemmalla" : "oikealla")}, {kk.x - q.x:0},{kk.y - q.y:0} pt)");
                }
                p.Nappi.style.left = x;
                p.Nappi.style.top = y;
                p.Nappi.style.width = koko;
                p.Nappi.style.height = koko;
                p.Nappi.style.opacity = p.Peitto;
                p.Nappi.pickingMode = oma ? PickingMode.Position : PickingMode.Ignore;   // pois häivyttyvää ei napauteta
                Nayta(p, true);
            }
        }

        string edellinenMaa = "";
        bool edellinenKaikki;

        /// <summary>Pallon maa: pelin kaupunkidata (sallittujen id = laudan kaupungin id), muuten lähin laudan kaupunki ≤ 0,5°.</summary>
        static string PallonMaa(Pallo p)
        {
            if (p.Maa != null) return p.Maa;
            string m = UiSisalto.Kaupunki(p.Id)?.Maa;
            if (string.IsNullOrEmpty(m))
            {
                var merkit = KarttaKerrokset.Instanssi?.merkit;
                string id = merkit?.LahinId(p.Lat, p.Lon, 0.5);
                m = id != null ? merkit.KaupunginMaa(id) : null;
            }
            if (!string.IsNullOrEmpty(m)) p.Maa = m.ToUpperInvariant();
            return p.Maa;
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
                "kaupunkipallot: {0}, sallittu {1}, kuva {2}, kaupunkeja {3}, korkeus {4:0} km, maa {5}, koko {6:0} pt, näkyvät [{7}]",
                Paalla ? "päällä" : "pois", Sallittu(), kuva == null ? "-" : kuva.Valmis ? "valmis" : kuva.Virhe ?? "latautuu", pallot.Count,
                korkeus / 1000, NostoKerros.Instanssi?.NykyinenMaa ?? "-", KaupunkiPalloMitat.Koko(korkeus), string.Join("; ", nakyvat));
        }

        /// <summary>Pallon kuoren keskikohta (Nostot-paneelin pt) hiiritestiin: kuori on kuvan yläosassa kallistuspuolella.</summary>
        public Vector2? KuorenKeskus(string id)
        {
            var p = pallot.FirstOrDefault(x => x.Id == id);
            if (p == null || !p.Nakyy) return null;
            var r = p.Nappi.worldBound;
            float kx = p.Oikea ? 1f - PalloNappi.KuoriX : PalloNappi.KuoriX;
            var keski = juuri.WorldToLocal(new Vector2(r.xMin + kx * r.width, r.yMin + PalloNappi.KuoriY * r.height));
            return keski;
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

    /// <summary>
    /// Pallon nappi, jonka osuma on vain näkyvässä pallossa (omistaja 7.10. 14.5x): kuoren ellipsi ja kori (kuvan osuuksina,
    /// Linnanrakentajan ilmapallo-v1 kehystettynä KaupunkiPalloKuva-kameralla), vähintään 44 pt. Muualla napin neliössä
    /// klikkaus menee alla olevalle (nimiöt, merkit, nappula, kartta). Oikea = kuva peilattu oikealle kallistuvaksi.
    /// </summary>
    public sealed class PalloNappi : Button
    {
        public bool Oikea;
        /// <summary>
        /// Kuoren keskipiste ja säteet sekä kori napin koon osuuksina (vasemmalle kallistuva kuva). Mallista: kehys 37,9 m
        /// (laki 36 m / 0,95), pallo 9 m ankkurin sivussa → x 0,5 − 9/37,9 = 0,26; kuori Ø 12 m, keskus 30 m → y 0,18, säde 0,16
        /// (+ vara 0,03); kori ~13 m → y 0,63. Omistajan Ateena-kuva (Mac TF 160) täsmää: kuori 52 px, ankkuri nappulan juurella.
        /// </summary>
        public const float KuoriX = 0.26f, KuoriY = 0.18f, KuoriRx = 0.19f, KuoriRy = 0.19f, KoriX = 0.26f, KoriY = 0.63f, KoriR = 0.05f;
        const float MinSade = 22f;

        public PalloNappi(System.Action painettu) : base(painettu) { }

        public override bool ContainsPoint(Vector2 p)
        {
            var r = layout;
            if (float.IsNaN(r.width) || r.width <= 0f) return false;
            float w = r.width, h = r.height;
            float kx = (Oikea ? 1f - KuoriX : KuoriX) * w, ky = KuoriY * h;
            float rx = Mathf.Max(KuoriRx * w, MinSade), ry = Mathf.Max(KuoriRy * h, MinSade);
            float dx = (p.x - kx) / rx, dy = (p.y - ky) / ry;
            if (dx * dx + dy * dy <= 1f) return true;
            float bx = (Oikea ? 1f - KoriX : KoriX) * w, by = KoriY * h, br = Mathf.Max(KoriR * w, 10f);
            return Mathf.Abs(p.x - bx) <= br && p.y >= ky && p.y <= by + br;
        }
    }
}
