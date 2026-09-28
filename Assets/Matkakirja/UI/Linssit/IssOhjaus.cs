// ISS-SÄÄTÖPANEELIN MODULAARISET ELEMENTIT (Linssiseppä 2, 28.9.2026; omistaja Päätoimittajan kautta: "Säätimet voisi olla ISS
// säätöpaneelissa. Tilaa codexilta. Voisi olla muutama modulaarinen elementti mitä voidaan yhdistellä ja monistaa tarpeen
// mukaan"). Codexilta on tilattu elementtisarja (posti/fable-codex-iss-saatopaneeli-20260928.md): 9-slice-paneeli,
// liukusäädin, segmenttinappi, valikkorivi, lukemakilpi ja sulkunappi.
//
// Jokainen ISS-ohjauksen elementti luodaan täältä ja puetaan NAHKALLA (Pue): nahka antaa osalle USS-luokat
// (mk-issohjaus__<osa> + mk-issnahka--<nimi>) ja, jos sillä on osalle kuva, 9-slice-taustan (-unity-slice-*). Nykyinen nahka
// "perus" on kyydin nykyinen tyyli (tumma pilleri, vihreä reuna ja korostus) pelkällä USS:llä. Kun Codexin kuvat tulevat,
// uusi nahka (kuvat + slice-rajat) otetaan käyttöön yhdellä rivillä (Nahka = …), ja NahkaVaihtui pukee olemassa olevat
// elementit uudelleen. Toiminnot eivät riipu nahasta.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class IssOhjaus
    {
        /// <summary>Elementin osa (Codexin sarjan nimet).</summary>
        public enum Osa { Paneeli, Liukusaadin, Segmentti, Valikkorivi, Lukema, Sulku }

        /// <summary>Nahka: nimi (USS-luokka mk-issnahka--nimi) ja valinnaiset 9-slice-kuvat osittain.</summary>
        public sealed class Asu
        {
            public string Nimi;
            /// <summary>Osan taustakuva ja slice-rajat (vasen, ylä, oikea, ala; kuvan pikseleinä); puuttuva osa = pelkkä USS.</summary>
            public readonly Dictionary<Osa, (Texture2D Kuva, RectOffset Slice)> Kuvat = new Dictionary<Osa, (Texture2D, RectOffset)>();
        }

        /// <summary>Nykyinen tyyli ilman kuvia (kyydin tumma pilleri, vihreä korostus).</summary>
        public static readonly Asu Perus = new Asu { Nimi = "perus" };

        static Asu nahka = Perus;
        static readonly List<(VisualElement El, Osa Osa)> puetut = new List<(VisualElement, Osa)>();

        /// <summary>Käytössä oleva nahka; vaihto pukee kaikki elossa olevat elementit uudelleen.</summary>
        public static Asu Nahka
        {
            get => nahka;
            set
            {
                var vanha = nahka;
                nahka = value ?? Perus;
                puetut.RemoveAll(p => p.El.panel == null && p.El.parent == null);
                foreach (var (el, osa) in puetut) { el.RemoveFromClassList("mk-issnahka--" + vanha.Nimi); Pue(el, osa, false); }
            }
        }

        /// <summary>Pukee elementin osaksi: luokat ja nahan kuva (9-slice), ja muistaa sen nahan vaihtoa varten.</summary>
        public static T Pue<T>(T el, Osa osa, bool muista = true) where T : VisualElement
        {
            el.AddToClassList("mk-issohjaus__" + Luokka(osa));
            el.AddToClassList("mk-issnahka--" + nahka.Nimi);
            if (nahka.Kuvat.TryGetValue(osa, out var k) && k.Kuva != null)
            {
                el.style.backgroundImage = new StyleBackground(k.Kuva);
                el.style.unitySliceLeft = k.Slice.left; el.style.unitySliceTop = k.Slice.top;
                el.style.unitySliceRight = k.Slice.right; el.style.unitySliceBottom = k.Slice.bottom;
            }
            else el.style.backgroundImage = StyleKeyword.Null;
            if (muista) puetut.Add((el, osa));
            return el;
        }

        static string Luokka(Osa osa) => osa switch
        {
            Osa.Paneeli => "paneeli", Osa.Liukusaadin => "saadin", Osa.Segmentti => "segmentti",
            Osa.Valikkorivi => "valikkorivi", Osa.Lukema => "lukema", _ => "sulku",
        };

        /// <summary>Paneeli (9-slice-kehys), johon rivit lisätään allekkain.</summary>
        public static VisualElement Paneeli(VisualElement isanta)
        {
            var p = Pue(new VisualElement(), Osa.Paneeli);
            isanta.Add(p);
            return p;
        }

        /// <summary>Liukusäädinrivi: nimi · liuku · lukema. Arvo 0…1 tai kokonaisluvut (askel 1), muutos kutsuu muuttui.</summary>
        public sealed class Saadin
        {
            public readonly Slider Liuku;
            public readonly Label Nimi, Lukema;
            readonly bool kokonais;
            bool asettaa;

            internal Saadin(VisualElement paneeli, string nimi, float min, float max, bool kokonaisluku, Action<float> muuttui)
            {
                kokonais = kokonaisluku;
                var rivi = Rakenne.El("mk-issohjaus__rivi", paneeli);
                Nimi = Rakenne.Teksti(nimi, "mk-issohjaus__nimi", rivi);
                Liuku = new Slider(min, max) { pageSize = 0 };
                Liuku.AddToClassList("mk-saadin");
                Pue(Liuku, Osa.Liukusaadin);
                Liuku.tooltip = nimi;
                rivi.Add(Liuku);
                Lukema = Pue(Rakenne.Teksti("", "mk-issohjaus__arvo", rivi), Osa.Lukema);
                Liuku.RegisterValueChangedCallback(e =>
                {
                    if (asettaa) return;
                    float v = kokonais ? Mathf.Round(e.newValue) : e.newValue;
                    if (kokonais && !Mathf.Approximately(v, e.newValue)) { asettaa = true; Liuku.SetValueWithoutNotify(v); asettaa = false; }
                    muuttui?.Invoke(v);
                });
            }

            /// <summary>Arvo ja lukema tilasta (ei kutsu muuttui-käsittelijää).</summary>
            public void Aseta(float arvo, string lukema)
            {
                if (!Mathf.Approximately(Liuku.value, arvo)) { asettaa = true; Liuku.SetValueWithoutNotify(arvo); asettaa = false; }
                Lukema.text = lukema;
            }
        }

        public static Saadin Liukusaadin(VisualElement paneeli, string nimi, float min, float max, Action<float> muuttui, bool kokonaisluku = false) =>
            new Saadin(paneeli, nimi, min, max, kokonaisluku, muuttui);
    }
}
