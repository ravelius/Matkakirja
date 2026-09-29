// ISS-SÄÄTÖPANEELIN MODULAARISET ELEMENTIT (Linssiseppä 2, 28.9.2026; omistaja Päätoimittajan kautta: "Säätimet voisi olla ISS
// säätöpaneelissa. Tilaa codexilta. Voisi olla muutama modulaarinen elementti mitä voidaan yhdistellä ja monistaa tarpeen
// mukaan"). Codexin elementtisarja (posti/fable-codex-iss-saatopaneeli-20260928.md; toimitus ~/Documents/Codex/2026-09-28/
// iss-saatopaneeli, omistaja 29.9. klo 00.0x "Kyllä, kytke"): paneeli (9-slice 20), liukusäätimen ura ja nuppi, segmenttisolu,
// valikkorivi (9-slice 12), lukemakilpi (9-slice 10) ja sulkunappi, kukin tiloissa normaali / aktiivinen / pois käytöstä.
// Kuvat ovat tekstittömiä; tekstit ovat UI Toolkitin Labeleita kuvan päällä.
//
// Jokainen ISS-ohjauksen elementti luodaan täältä ja puetaan NAHKALLA (Pue): nahka antaa osalle USS-luokat
// (mk-issohjaus__<osa> + mk-issnahka--<nimi>) ja, jos sillä on osalle kuva, 9-slice-taustan (-unity-slice-*, @3x-kuvat
// slice-skaalalla 1/3). "codex" = Codexin sarja Resources/IssOhjaus/ (oletus), "perus" = vanha tyyli pelkällä USS:llä (A/B:
// ui iss nahka perus|codex). Nahan vaihto pukee elossa olevat elementit uudelleen. Toiminnot eivät riipu nahasta.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class IssOhjaus
    {
        /// <summary>Elementin osa (Codexin sarjan nimet).</summary>
        public enum Osa { Paneeli, Liukusaadin, Nuppi, Segmentti, Valikkorivi, Lukema, Sulku }

        /// <summary>Osan tila (Codexin normal / active / disabled).</summary>
        public enum Tila { Normaali, Aktiivinen, Pois }

        /// <summary>Nahka: nimi (USS-luokka mk-issnahka--nimi) ja valinnaiset 9-slice-kuvat osittain ja tiloittain.</summary>
        public sealed class Asu
        {
            public string Nimi;
            /// <summary>Kuvien tiheys: @3x-kuva → slice-rajat kuvan pikseleinä ja skaala 1/3 (loogiset pt).</summary>
            public float Tiheys = 1f;
            /// <summary>Osan taustakuva ja slice-rajat (vasen, ylä, oikea, ala; kuvan pikseleinä); puuttuva = pelkkä USS.</summary>
            public readonly Dictionary<(Osa, Tila), (Texture2D Kuva, RectOffset Slice)> Kuvat =
                new Dictionary<(Osa, Tila), (Texture2D, RectOffset)>();
        }

        /// <summary>Vanha tyyli ilman kuvia (kyydin tumma pilleri, vihreä korostus).</summary>
        public static readonly Asu Perus = new Asu { Nimi = "perus" };

        static Asu codex;
        static bool codexHaettu;
        /// <summary>Codexin sarja Resources/IssOhjaus/&lt;osa&gt;-&lt;tila&gt;.png (@3x); null, jos kuvia ei ole.</summary>
        public static Asu Codex
        {
            get
            {
                if (!codexHaettu) { codexHaettu = true; codex = LataaCodex(); }
                return codex;
            }
        }

        static Asu LataaCodex()
        {
            var a = new Asu { Nimi = "codex", Tiheys = 3f };
            // sprites.json: 9-slice (vasen, ylä, oikea, ala) loogisina px:inä; @3x-kuvassa × 3.
            var osat = new (Osa Osa, string Tiedosto, int Slice)[]
            {
                (Osa.Paneeli, "panel", 20), (Osa.Liukusaadin, "slider-track", 0), (Osa.Nuppi, "slider-thumb", 0),
                (Osa.Segmentti, "segment-cell", 10), (Osa.Valikkorivi, "button-row", 12), (Osa.Lukema, "readout", 10),
                (Osa.Sulku, "close", 0),
            };
            var tilanimet = new (Tila Tila, string Nimi)[] { (Tila.Normaali, "normal"), (Tila.Aktiivinen, "active"), (Tila.Pois, "disabled") };
            foreach (var (osa, tiedosto, slice) in osat)
                foreach (var (tila, nimi) in tilanimet)
                {
                    var t = Resources.Load<Texture2D>($"IssOhjaus/{tiedosto}-{nimi}");
                    if (t == null) continue;
                    int s = slice * 3;
                    a.Kuvat[(osa, tila)] = (t, new RectOffset(s, s, s, s));
                }
            return a.Kuvat.Count > 0 ? a : null;
        }

        static Asu nahka;
        static readonly List<(VisualElement El, Osa Osa)> puetut = new List<(VisualElement, Osa)>();
        static readonly Dictionary<VisualElement, Tila> tilat = new Dictionary<VisualElement, Tila>();

        /// <summary>Käytössä oleva nahka (oletus Codex, jos kuvat ovat mukana); vaihto pukee elossa olevat elementit uudelleen.</summary>
        public static Asu Nahka
        {
            get => nahka ??= Codex ?? Perus;
            set
            {
                var vanha = Nahka;
                nahka = value ?? Perus;
                puetut.RemoveAll(p => p.El.panel == null && p.El.parent == null);
                foreach (var (el, osa) in puetut) { el.RemoveFromClassList("mk-issnahka--" + vanha.Nimi); Pue(el, osa, false); }
            }
        }

        /// <summary>Pukee elementin osaksi: luokat ja nahan kuva (9-slice), ja muistaa sen nahan vaihtoa varten.</summary>
        public static T Pue<T>(T el, Osa osa, bool muista = true) where T : VisualElement
        {
            el.AddToClassList("mk-issohjaus__" + Luokka(osa));
            el.AddToClassList("mk-issnahka--" + Nahka.Nimi);
            Kuva(el, osa, tilat.TryGetValue(el, out var t) ? t : Tila.Normaali);
            if (muista) puetut.Add((el, osa));
            return el;
        }

        /// <summary>Osan tila (valittu segmentti, auki oleva rivi, pois käytöstä): kuva ja luokka mk-issohjaus--&lt;tila&gt;.</summary>
        public static void AsetaTila(VisualElement el, Osa osa, Tila tila)
        {
            if (tilat.TryGetValue(el, out var ed) && ed == tila) return;
            tilat[el] = tila;
            el.EnableInClassList("mk-issohjaus--aktiivinen", tila == Tila.Aktiivinen);
            el.EnableInClassList("mk-issohjaus--pois", tila == Tila.Pois);
            Kuva(el, osa, tila);
        }

        static void Kuva(VisualElement el, Osa osa, Tila tila)
        {
            var n = Nahka;
            if (n.Kuvat.TryGetValue((osa, tila), out var k) || n.Kuvat.TryGetValue((osa, Tila.Normaali), out k))
            {
                el.style.backgroundImage = new StyleBackground(k.Kuva);
                el.style.unitySliceLeft = k.Slice.left; el.style.unitySliceTop = k.Slice.top;
                el.style.unitySliceRight = k.Slice.right; el.style.unitySliceBottom = k.Slice.bottom;
                el.style.unitySliceScale = 1f / n.Tiheys;
            }
            else el.style.backgroundImage = StyleKeyword.Null;
        }

        static string Luokka(Osa osa) => osa switch
        {
            Osa.Paneeli => "paneeli", Osa.Liukusaadin => "saadin", Osa.Nuppi => "nuppi", Osa.Segmentti => "segmentti",
            Osa.Valikkorivi => "valikkorivi", Osa.Lukema => "lukema", _ => "sulku",
        };

        /// <summary>Paneeli (9-slice-kehys), johon rivit lisätään allekkain.</summary>
        public static VisualElement Paneeli(VisualElement isanta)
        {
            var p = Pue(new VisualElement(), Osa.Paneeli);
            isanta.Add(p);
            return p;
        }

        /// <summary>Lukemakilpi (readout): sisältö lisätään palautettuun elementtiin.</summary>
        public static VisualElement Lukema(VisualElement isanta)
        {
            var l = Pue(new VisualElement(), Osa.Lukema);
            isanta.Add(l);
            return l;
        }

        /// <summary>Valikko- tai toimintorivi (button-row): teksti vasemmalla, valinnainen merkki (›, ⌄) oikealla.</summary>
        public static Button Valikkorivi(VisualElement isanta, string teksti, Action painettu, string merkki = null)
        {
            var b = Rakenne.Nappi(teksti, "mk-issohjaus__rivinappi", painettu, isanta);
            Pue(b, Osa.Valikkorivi);
            if (merkki != null) Rakenne.Teksti(merkki, "mk-issohjaus__merkki", b).pickingMode = PickingMode.Ignore;
            return b;
        }

        /// <summary>Segmenttisolu (segment-cell): monistetaan riviksi (nopeudet, välilehdet), yksi aktiivinen.</summary>
        public static Button Segmentti(VisualElement rivi, string teksti, Action painettu)
        {
            var b = Rakenne.Nappi(teksti, "mk-issohjaus__segmenttinappi", painettu, rivi);
            return Pue(b, Osa.Segmentti);
        }

        /// <summary>Sulkunappi 44 × 44 (close): kuva ilman tekstiä.</summary>
        public static Button Sulku(VisualElement isanta, Action painettu, string vihje)
        {
            var b = new Button(painettu) { text = "", tooltip = vihje };
            b.AddToClassList("mk-issohjaus__sulkunappi");
            isanta.Add(b);
            return Pue(b, Osa.Sulku);
        }

        /// <summary>
        /// Liukusäädin kuten webissä (Siirtoseppä 29.9.): otsikko "PILVIPEITTO · NYT" (nimi ja lukema isoin kirjaimin), ura
        /// ja nuppi, alla ääripäiden nimet (Selkeä … Nykyinen). Arvo 0…1 tai kokonaisluvut (askel 1).
        /// </summary>
        public sealed class Saadin
        {
            public readonly Slider Liuku;
            public readonly Label Nimi, Lukema;
            readonly bool kokonais;
            readonly string nimi;
            bool asettaa;

            internal Saadin(VisualElement paneeli, string nimi, float min, float max, bool kokonaisluku, Action<float> muuttui,
                string vasen = null, string oikea = null)
            {
                kokonais = kokonaisluku;
                this.nimi = nimi;
                var ylarivi = Rakenne.El("mk-issohjaus__rivi", paneeli);
                Nimi = Rakenne.Teksti(nimi.ToUpperInvariant(), "mk-issohjaus__nimi", ylarivi);
                Lukema = Nimi;
                Liuku = new Slider(min, max) { pageSize = 0 };
                Liuku.AddToClassList("mk-saadin");
                Liuku.AddToClassList("mk-issohjaus__liuku");
                Liuku.tooltip = nimi;
                paneeli.Add(Liuku);
                if (vasen != null || oikea != null)
                {
                    var paat = Rakenne.El("mk-issohjaus__paat", paneeli, PickingMode.Ignore);
                    Rakenne.Teksti(vasen ?? "", "mk-issohjaus__paa", paat);
                    Rakenne.Teksti(oikea ?? "", "mk-issohjaus__paa mk-issohjaus__paa--oikea", paat);
                }
                // Codexin ura ja nuppi Sliderin omiin osiin (tracker ja dragger).
                var ura = Liuku.Q(className: "unity-base-slider__tracker");
                var nuppi = Liuku.Q(className: "unity-base-slider__dragger");
                if (ura != null) Pue(ura, Osa.Liukusaadin);
                if (nuppi != null) Pue(nuppi, Osa.Nuppi);
                Liuku.RegisterValueChangedCallback(e =>
                {
                    if (asettaa) return;
                    float v = kokonais ? Mathf.Round(e.newValue) : e.newValue;
                    if (kokonais && !Mathf.Approximately(v, e.newValue)) { asettaa = true; Liuku.SetValueWithoutNotify(v); asettaa = false; }
                    muuttui?.Invoke(v);
                });
                // Vedon ajan ura ja nuppi aktiivisina (Codexin active).
                Liuku.RegisterCallback<PointerDownEvent>(_ => Aktiivinen(ura, nuppi, true), TrickleDown.TrickleDown);
                Liuku.RegisterCallback<PointerUpEvent>(_ => Aktiivinen(ura, nuppi, false), TrickleDown.TrickleDown);
                Liuku.RegisterCallback<PointerCaptureOutEvent>(_ => Aktiivinen(ura, nuppi, false));
            }

            static void Aktiivinen(VisualElement ura, VisualElement nuppi, bool paalla)
            {
                var t = paalla ? Tila.Aktiivinen : Tila.Normaali;
                if (ura != null) AsetaTila(ura, Osa.Liukusaadin, t);
                if (nuppi != null) AsetaTila(nuppi, Osa.Nuppi, t);
            }

            /// <summary>Arvo ja lukema tilasta (ei kutsu muuttui-käsittelijää).</summary>
            public void Aseta(float arvo, string lukema)
            {
                if (!Mathf.Approximately(Liuku.value, arvo)) { asettaa = true; Liuku.SetValueWithoutNotify(arvo); asettaa = false; }
                Nimi.text = (string.IsNullOrEmpty(lukema) ? nimi : nimi + " · " + lukema).ToUpperInvariant();
            }
        }

        public static Saadin Liukusaadin(VisualElement paneeli, string nimi, float min, float max, Action<float> muuttui,
            bool kokonaisluku = false, string vasen = null, string oikea = null) =>
            new Saadin(paneeli, nimi, min, max, kokonaisluku, muuttui, vasen, oikea);
    }
}
