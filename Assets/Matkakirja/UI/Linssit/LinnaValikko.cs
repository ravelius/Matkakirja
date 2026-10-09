// LINNAN VALIKKO JA PIENOISKARTTA (omistaja 2.10.2026 klo 14.44, Päätoimittajan loki; Natiivi-UI:n pohja
// lokit/natiivi-ui-pohjat/ohjausnappi-ehdotus.md kohta 8; Siirtoseppä): kaikki linnan napit yhteen hampurilaiseen oikeaan
// yläkulmaan ja ‹:n paikalle vasempaan yläkulmaan linnan pienoiskartta.
//
//   nappi    OHJAUSNAPPI (Ohjausnappi.Nappi, Ikonit.Valikko, harmaa 3D:n päällä) ohjausryhmässä turva-alueen sisällä
//   lista    LINSSIN VALIKKO -pohja (.mk-linssivalikko--pohja, LASI): Huoneet › · Esittely uudelleen · Äänet › · Lähteet ·
//            ─ · Sulje linna. Huoneet ja Äänet (ja Lähteet) vaihtavat saman listan alanäkymäksi, jonka ylin rivi ‹ palaa.
//   kartta   Linnanrakentajan kuva (_valmiit/olavinlinna-minikartta/v1 → Resources/Minikartta) OHJAUSNAPPI-kehyksessä
//            (.mk-ohjausnappi--iso 56 pt, omistaja 17.4x) vasemmassa yläkulmassa ☰:n tasolla; nykyinen huone "olet tässä"
//            -pisteenä (--tk-korostus, reunus --tk-pinta, ei hehkua). Koko kehys on yksi osuma: Huoneet-alanäkymä.
//
// Ruudulta pois: ‹ (paluu), ↻ (uusinta), mikserin säätönappi ja linssin ✕ (DioraamaTaulu, MikseriPaneeli.LappuPiilossa,
// LinssiUi.PaivitaSulku). Kuuntele ja Pulu jäävät. Lähteet kootaan tilojen infotauluista ja taulun kohdista (paikkakortin
// lähderivi on pois, omistaja 14.44).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinnaValikko
    {
        enum Nakyma { Paa, Huoneet, Aanet, Lahteet }

        /// <summary>Kaikki linnan ohjaimet (ryhmä ja pienoiskartta); kutsuja näyttää ja piilottaa linnan mukana.</summary>
        public readonly VisualElement Juuri;
        readonly VisualElement ryhma, karttaRyhma, valikko, karttaKuva, piste;
        readonly Button nappi, kartta;
        const float KarttaZoom = 1.65f, KarttaReuna = 0.18f;
        float karttaSuhde = 0.5f;
        Nakyma nakyma;
        public bool Auki { get; private set; }

        readonly Button taukoNappi;
        bool taukoTauolla;

        /// <summary>Esittelyn II/▶ (DioraamaTaulu joka ruutu): näkyy kertojan kierroksen tai tauon ajan.</summary>
        public void NaytaTauko(bool nakyy)
        {
            bool tauolla = Matkakirja.Natiivi.DioraamaSovitin.Tauolla;
            nakyy |= tauolla;
            // Seikkailussa ei esittelyn taukoa (LS2:n stillit 9.10.2026, BUILD 169: II näkyi pelin aikana; Thiefin taso).
            if (SeikkailuTapit.SeikkailuKaynnissa) nakyy = false;
            var d = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (taukoNappi.style.display != d) taukoNappi.style.display = d;
            if (tauolla == taukoTauolla) return;
            taukoTauolla = tauolla;
            taukoNappi.Clear();
            taukoNappi.Add(new SvgIkoni(tauolla ? Ikonit.Toista : Ikonit.Tauko));
            taukoNappi.tooltip = tauolla ? "Jatka" : "Tauko";
            taukoNappi.EnableInClassList("mk-valittu", tauolla);
        }

        const string MinikarttaKuva = "Minikartta/olavinlinna-minikartta@3x", MinikarttaTiedot = "Minikartta/olavinlinna-minikartta";
        readonly Dictionary<string, (string Nimi, Vector2 Paikka)> karttaTilat = new Dictionary<string, (string, Vector2)>();

        public LinnaValikko(UiKerros kerros, int kerrosNro)
        {
            Juuri = Rakenne.El("mk-linnavalikko", kerros.Turva(kerrosNro), PickingMode.Ignore);
            Juuri.style.position = Position.Absolute;
            Juuri.style.left = 0; Juuri.style.right = 0; Juuri.style.top = 0; Juuri.style.bottom = 0;
            Juuri.style.display = DisplayStyle.None;

            ryhma = Ohjausnappi.Ryhma(Juuri);
            // ESITTELYN TAUKO (omistaja 6.10.2026): II/▶ ☰:n vieressä kertojan esittelyn ajan (sama kuvake kuin oppaassa).
            taukoNappi = Ohjausnappi.Nappi(Ikonit.Tauko, "Tauko", () => { Matkakirja.Natiivi.DioraamaSovitin.VaihdaTauko(); NaytaTauko(true); }, ryhma);
            taukoNappi.style.display = DisplayStyle.None;
            nappi = Ohjausnappi.Nappi(Ikonit.Valikko, "Valikko", () => { if (Auki) Sulje(); else Avaa(Nakyma.Paa); }, ryhma);

            // Pienoiskartta ‹:n paikalle OHJAUSNAPPI-kehyksessä (.mk-ohjausnappi--iso 56 pt, omistaja 17.4x): oma ryhmä
            // vasempaan yläkulmaan, yläreuna ☰:n tasolla. Kuva kehyksen sisällä kuvasuhteessaan, piste kuvan päällä.
            karttaRyhma = Ohjausnappi.Ryhma(Juuri);
            karttaRyhma.AddToClassList("mk-minikartta-ryhma");
            kartta = Ohjausnappi.Nappi(null, "Huoneet", () => Avaa(Nakyma.Huoneet), karttaRyhma);
            kartta.AddToClassList("mk-ohjausnappi--iso");
            // Linna täyttää kehyksen (Päätoimittaja 2.10. 18.0x: 2:1-kuva jäi viiruksi): kuva KarttaZoom × kehyksen
            // sisäleveys, korkeus ~80 % kehyksestä, reunat rajautuvat (overflow hidden); näkymä panoroi pisteen näkyviin.
            kartta.style.overflow = Overflow.Hidden;
            karttaKuva = Rakenne.El("mk-minikartta", kartta, PickingMode.Ignore);
            var kuva = Resources.Load<Texture2D>(MinikarttaKuva);
            if (kuva != null)
            {
                karttaKuva.style.backgroundImage = new StyleBackground(kuva);
                karttaSuhde = (float)kuva.height / kuva.width;
            }
            piste = Rakenne.El("mk-minikartta__piste", karttaKuva, PickingMode.Ignore);
            piste.style.display = DisplayStyle.None;
            LueKartta();

            // Lista kerroksen juureen (ei turvaan), paikka napista kuten LinssiValikko.
            valikko = Rakenne.El("mk-linssivalikko mk-linssivalikko--pohja", kerros.Juuri(kerrosNro));
            valikko.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(valikko, Kirjasin.Luku);
            valikko.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());

            kerros.JokaRuutu += Ruutu;
        }

        void LueKartta()
        {
            var t = Resources.Load<TextAsset>(MinikarttaTiedot);
            if (t == null) return;
            try
            {
                var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(t.text));
                var tilat = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "tilat"));
                if (tilat == null) return;
                foreach (var kv in tilat)
                {
                    var o = MiniJson.ObjektiTaiNull(kv.Value);
                    if (o == null) continue;
                    karttaTilat[kv.Key] = (MiniJson.Teksti(o, "nimi") ?? kv.Key,
                        new Vector2((float)(MiniJson.Luku(o, "x") ?? 0.5), (float)(MiniJson.Luku(o, "y") ?? 0.5)));
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA linna: pienoiskartan tiedot: " + e.Message); }
        }

        /// <summary>Linna auki / kiinni (DioraamaTaulu.Kytke ja Peitetty).</summary>
        public void Nayta(bool nakyy)
        {
            Juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            MikseriPaneeli.LappuPiilossa = nakyy;
            if (!nakyy) Sulje();
        }

        bool peliNakyma;

        void Ruutu()
        {
            if (Juuri.style.display == DisplayStyle.None) return;
            // Seikkailu (Päätoimittaja 8.10.2026, Thiefin taso): pienoiskartta pois (linnakierroksen huonehyppy), ☰ levossa himmeä.
            bool peli = SeikkailuTapit.SeikkailuKaynnissa;
            if (peli != peliNakyma)
            {
                peliNakyma = peli;
                karttaRyhma.style.display = peli ? DisplayStyle.None : DisplayStyle.Flex;
            }
            ryhma.EnableInClassList("mk-ohjausryhma--lepo", peli && !Auki);
            // Nykyinen huone pisteenä (DioraamaAanet.NykyinenHuone = näkymän kohdetila); yleisnäkymässä ei pistettä.
            string huone = DioraamaAanet.NykyinenHuone;
            (string Nimi, Vector2 Paikka) k = default;
            bool onPiste = huone != null && karttaTilat.TryGetValue(huone, out k);
            if (onPiste)
            {
                piste.style.display = DisplayStyle.Flex;
                piste.style.left = Length.Percent(k.Paikka.x * 100f);
                piste.style.top = Length.Percent(k.Paikka.y * 100f);
            }
            else piste.style.display = DisplayStyle.None;
            AsetteleKartta(onPiste, k.Paikka);
            TarkistaOhiNapautus();
        }

        void Avaa(Nakyma n)
        {
            nakyma = n;
            Rakenna();
            if (!Auki)
            {
                Auki = true;
                Asettele();
                valikko.BringToFront();
                Ponnahdus.Avaa(valikko, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
                nappi.AddToClassList("mk-valittu");
            }
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Ponnahdus.Sulje(valikko);
            nappi.RemoveFromClassList("mk-valittu");
        }

        void Rakenna()
        {
            valikko.Clear();
            huoneRivit = null;
            switch (nakyma)
            {
                case Nakyma.Paa:
                    // VIHJE (omistaja 8.10.: videopeleissä ei Pulua, vihje maailman sisällä; Päätoimittaja hyväksyi A:n): vain
                    // seikkailun ollessa käynnissä, ei linnakierroksella. Napautus sulkee valikon (Komento) ja pyytää vihjeen.
                    if (SeikkailuTapit.SeikkailuKaynnissa) Komento("Vihje", () => SeikkailuTapit.PyydaVihje("valikko"));
                    // TIETOA (Päätoimittaja 8.10.: tietokerros ilman Pulua, ettei iPad-pelaaja menetä sitä): seikkailun tietokerroksen
                    // kortisto, kun se on tarjolla (SeikkailuTietokerros, nousun jälkeen); sama KORTTI-kortisto kuin Pulun napautuksesta.
                    if (SeikkailuTapit.TietokerrosTarjolla) Komento("Tietoa", SeikkailuTapit.AvaaTietokerrosValikosta);
                    // LINNAN HISTORIA (Päätoimittaja 9.10.2026, juna 171; Siirtoseppä a8a454732): alun valinnan historia myös valikosta,
                    // kun Olavinlinna on ladattu (DioraamaSovitin.HistoriaKaytettavissa); pelin aikana peli pysähtyy ja jatkuu lopussa.
                    if (DioraamaSovitin.HistoriaKaytettavissa) Komento("Linnan historia", () => DioraamaSovitin.AloitaHistoria(null));
                    // Seikkailussa vain pelin rivit (Päätoimittaja 8.10.2026): Vihje, Tietoa, Linnan historia, Äänet, Lähteet, Sulje.
                    if (!SeikkailuTapit.SeikkailuKaynnissa)
                    {
                        Alanakyma("Huoneet", Nakyma.Huoneet);
                        Komento("Esittely uudelleen", EsittelyUudelleen);
                    }
                    Alanakyma("Äänet", Nakyma.Aanet);
                    Alanakyma("Lähteet", Nakyma.Lahteet);
                    // Kehittäjän kuorivalinta (omistaja 5.10.: pois ruudulta hampurilaiseen): auto → huippu → normaali → kevyt.
                    if (Asetukset.Kehittaja && !LinssiOhjain.ValmiitLinssitAuki)
                        Komento(DioraamaUlkokuori.ValintaTeksti(), DioraamaUlkokuori.SeuraavaPakotus);
                    Viiva();
                    Komento("Sulje linna", () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
                    break;
                case Nakyma.Huoneet:
                    Takaisin("Huoneet");
                    string nyt = DioraamaAanet.NykyinenHuone;
                    // Natiivisepän itsetarkistus 4.10. (juna 141, vaaka): seitsemän huonetta ylitti ruudun korkeuden → rivit omaan
                    // vieritykseensä, ja valikko rajataan turva-alueelle (SovitaKorkeus tiivistää rivit, jos tila ei riitä).
                    huoneRivit = new ScrollView(ScrollViewMode.Vertical)
                    { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
                    huoneRivit.style.flexShrink = 1;
                    valikko.Add(huoneRivit);
                    foreach (var (id, nimi) in Huoneet())
                    {
                        var b = Komento(nimi, () => DioraamaSovitin.PyydaTila(id), huoneRivit);
                        b.EnableInClassList("mk-valittu", id == nyt);
                    }
                    break;
                case Nakyma.Aanet:
                    Takaisin("Äänet");
                    Kytkinrivi(Kytkin.Kertoja, "Kertoja");
                    Kytkinrivi(Kytkin.Musiikki, "Musiikki");   // sama nimi kuin mikserissä (Päätoimittaja 8.10.2026)
                    Kytkinrivi(Kytkin.Aanimaisema, "Äänimaisema");
                    if (Asetukset.Kehittaja && MikseriPaneeli.Viimeisin != null)
                        Komento("Mikseri", () => MikseriPaneeli.Viimeisin.Avaa(true));
                    break;
                case Nakyma.Lahteet:
                    Takaisin("Lähteet");
                    var vieritys = new ScrollView(ScrollViewMode.Vertical)
                    { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
                    vieritys.style.maxHeight = Length.Percent(60);
                    valikko.Add(vieritys);
                    foreach (var l in Lahteet())
                        Kirjasimet.Aseta(Rakenne.Teksti(l, "mk-linssivalikko__lahde", vieritys), Kirjasin.Luku);
                    break;
            }
            if (Auki) SovitaKorkeus();
        }

        /// <summary>Huoneet linnan järjestyksessä: tilat, joilla on infotaulu (ei massaa eikä tunnelmaa).</summary>
        static IEnumerable<(string Id, string Nimi)> Huoneet()
        {
            var r = DioraamaSovitin.Linssi?.Rakennus;
            if (r == null) yield break;
            foreach (var t in r.Tilat)
                if (t.Infotaulu != null) yield return (t.Id, t.Infotaulu.Nimi ?? t.Nimi ?? t.Id);
        }

        /// <summary>Lähteet koottuna (paikkakorttien lähderivit ja taulun kohdat), kukin kerran.</summary>
        static List<string> Lahteet()
        {
            var tulos = new List<string>();
            var r = DioraamaSovitin.Linssi?.Rakennus;
            if (r == null) return tulos;
            void Lisaa(string s)
            {
                if (string.IsNullOrEmpty(s) || s == "TARKISTAMATTA") return;
                foreach (var osa in s.Split(';'))
                {
                    var o = osa.Trim();
                    if (o.Length > 0 && !tulos.Contains(o)) tulos.Add(o);
                }
            }
            foreach (var t in r.Tilat)
                if (t.Infotaulu != null) foreach (var (_, l) in t.Infotaulu.Rivit) Lisaa(l);
            if (r.Taulu != null) foreach (var k in r.Taulu.Kohdat) Lisaa(k.Lahde);
            return tulos;
        }

        static void EsittelyUudelleen()
        {
            // Huoneessa ensin yleisnäkymään (kohdistus katkaisisi kierroksen), sitten kierros alusta seuraavassa ruudussa.
            if (DioraamaAanet.NykyinenHuone != null) DioraamaSovitin.PyydaPaluu();
            UiKerros.Hae().Juuri(LinssiUi.RadioKerros).schedule.Execute(() =>
                DioraamaSovitin.Linssi?.KertojaUudelleen(DioraamaSovitin.ViimeisinT)).StartingIn(150);
        }

        Button Komento(string teksti, Action teko, VisualElement isa = null)
        {
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => { Sulje(); teko(); }, isa ?? valikko);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            b.tooltip = teksti;
            return b;
        }

        void Alanakyma(string teksti, Nakyma n)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => { nakyma = n; Rakenna(); }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__nimi", b), Kirjasin.Luku);
            Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-linssivalikko__tila", b), Kirjasin.KoneBold);
            b.tooltip = teksti;
        }

        void Takaisin(string otsikko)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => { nakyma = Nakyma.Paa; Rakenna(); }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti("‹ " + otsikko, "mk-linssivalikko__nimi", b), Kirjasin.LukuLihava);
            b.tooltip = "Takaisin";
            Viiva();
        }

        void Viiva() => Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);

        void Kytkinrivi(Kytkin k, string nimi)
        {
            Label tila = null;
            Button b = null;
            void Paivita()
            {
                bool paalla = Asetukset.Paalla(k);
                b.EnableInClassList("mk-valittu", paalla);
                tila.text = paalla ? "PÄÄLLÄ" : "POIS";
                b.tooltip = nimi + ": " + (paalla ? "päällä" : "pois");
            }
            b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () =>
            {
                Asetukset.Aseta(k, !Asetukset.Paalla(k));
                Paivita();
            }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti(nimi, "mk-linssivalikko__nimi", b), Kirjasin.Luku);
            tila = Rakenne.Teksti("", "mk-linssivalikko__tila", b);
            Kirjasimet.Aseta(tila, Kirjasin.KoneBold);
            Paivita();
        }

        /// <summary>Pienoiskartta kehyksen sisäalaan: keskitetty, ja jos piste jäisi reunalle (alle KarttaReuna), kuva
        /// siirtyy niin, että piste on vähintään KarttaReunan päässä reunasta (kuvan tausta on läpinäkyvä, joten reunatilassa
        /// esim. laiturilla kuva saa irrota kehyksen reunasta; savuke 18.06: piste leikkautui).</summary>
        void AsetteleKartta(bool onPiste, Vector2 paikka)
        {
            var r = kartta.resolvedStyle;
            float w = kartta.layout.width - r.borderLeftWidth - r.borderRightWidth;
            float h = kartta.layout.height - r.borderTopWidth - r.borderBottomWidth;
            if (float.IsNaN(w) || w <= 0) return;
            float kw = w * KarttaZoom, kh = kw * karttaSuhde;
            float x = (w - kw) * 0.5f, y = (h - kh) * 0.5f;
            if (onPiste)
            {
                float m = w * KarttaReuna, px = x + paikka.x * kw;
                if (px < m) x = m - paikka.x * kw;
                else if (px > w - m) x = w - m - paikka.x * kw;
                if (kh > h)
                {
                    float py = y + paikka.y * kh;
                    if (py < m) y = m - paikka.y * kh;
                    else if (py > h - m) y = h - m - paikka.y * kh;
                }
            }
            karttaKuva.style.left = x; karttaKuva.style.top = y;
            karttaKuva.style.width = kw; karttaKuva.style.height = kh;
        }

        /// <summary>Lista napin alle, oikea reuna napin oikeaan reunaan (LinssiValikko.Asettele).</summary>
        void Asettele()
        {
            var isa = valikko.parent;
            if (isa == null) return;
            var n = nappi.worldBound;
            var yla = isa.WorldToLocal(new Vector2(n.xMax, n.yMax));
            float leveys = isa.resolvedStyle.width;
            valikko.style.top = yla.y + 8;
            valikko.style.right = float.IsNaN(leveys) ? 10 : Mathf.Max(0, leveys - yla.x);
            SovitaKorkeus();
        }

        ScrollView huoneRivit;

        /// <summary>Valikko turva-alueen sisään (vaaka-iPhone 402 pt: seitsemän huonetta ei mahtunut). Huoneriveistä tiiviit
        /// (30 pt, väli 2), jos täysikokoiset eivät mahdu; loput vierittyvät.</summary>
        void SovitaKorkeus()
        {
            if (!Auki) return;
            var isa = valikko.parent;
            float korkeus = isa != null ? isa.resolvedStyle.height : float.NaN;
            float ylaR = valikko.resolvedStyle.top;
            if (float.IsNaN(korkeus) || korkeus <= 0 || float.IsNaN(ylaR)) { valikko.schedule.Execute(SovitaKorkeus).StartingIn(16); return; }
            float sk = Screen.height > 0 ? korkeus / Screen.height : 1f;
            float vapaa = korkeus - ylaR - Screen.safeArea.yMin * sk - 8f;
            valikko.style.maxHeight = Mathf.Max(120f, vapaa);
            if (nakyma != Nakyma.Huoneet || huoneRivit == null) return;
            int rivit = huoneRivit.contentContainer.childCount;
            bool tiivis = (rivit + 1) * (Tyylikirja.Nappi.Korkeus + 4f) + 40f > vapaa;
            foreach (var r in huoneRivit.contentContainer.Children())
            {
                r.style.minHeight = tiivis ? (StyleLength)30f : StyleKeyword.Null;
                r.style.marginBottom = tiivis ? (StyleLength)2f : StyleKeyword.Null;
            }
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || valikko.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(valikko.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!valikko.worldBound.Contains(p) && !nappi.worldBound.Contains(p) && !kartta.worldBound.Contains(p)) Sulje();
        }

        /// <summary>Testikomento ("ui linna valikko|huoneet|aanet|lahteet|sulje"): avaa näkymän kuvaa varten.</summary>
        public string Komento(string mita)
        {
            switch (mita)
            {
                case "valikko": Avaa(Nakyma.Paa); break;
                case "huoneet": Avaa(Nakyma.Huoneet); break;
                case "aanet": Avaa(Nakyma.Aanet); break;
                case "lahteet": Avaa(Nakyma.Lahteet); break;
                case "sulje": Sulje(); break;
                default: return "linna: valikko|huoneet|aanet|lahteet|sulje";
            }
            return $"linna: {(Auki ? nakyma.ToString() : "kiinni")}, huone {DioraamaAanet.NykyinenHuone ?? "-"}";
        }
    }
}
