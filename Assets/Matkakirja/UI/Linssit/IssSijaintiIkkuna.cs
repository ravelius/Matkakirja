// ISS-OHJAAMON SIJAINTI-IKKUNA (omistaja 4.10.2026 klo 11.40, vaihe 3): LCD:n SIJAINTI-nappi avaa "kokonaan uuden ikkunan, jossa
// iso lista kaikista kohteista ladottuna kahteen riviin. Tämä ikkuna on perinteinen pelin ikkuna jossa tekstit normaalisti ilman
// LCD näytön efektiä vaikkakin mustalla pohjalla sekä vihreällä tekstillä. Jos kohteet eivät mahdu kerrallaan ruudulle, niin
// listaa voi vierittää. Ikkuna sulkeutuu joko kohdetta klikkaamalla tai ilman uutta valintaa ikkunan ulkopuolelta painamalla."
//
//   SIJAINTI                      kapiteeliotsikko (teema lcd, kirjasin Luku)
//   Oma sijainti   │ Alpit         kaksi saraketta, rivi ≥ 44 pt, vieritys; valinta → alus siirtyy katse säilyttäen
//   Ateena         │ Barcelona     (AstronauttiLinssi.SiirraAlus, Linssiseppä 2) ja ikkuna sulkeutuu
//
// Pohja Pohjat/iss-ohjaamo.uss (tyylikirja ISS-OHJAAMO.sijainti). Leveys min(ruutu − 32, 520), korkeus enintään 70 %.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssSijaintiIkkuna
    {
        public readonly struct Kohde
        {
            public readonly string Nimi;
            public readonly double Lat, Lon;
            public Kohde(string nimi, double lat, double lon) { Nimi = nimi; Lat = lat; Lon = lon; }
        }

        readonly VisualElement peite, ikkuna, lista;
        readonly Func<IReadOnlyList<Kohde>> kohteet;
        readonly Action<Kohde> valittu;
        readonly List<Kohde> nykyiset = new List<Kohde>();
        public bool Auki { get; private set; }

        public IssSijaintiIkkuna(VisualElement isa, Func<IReadOnlyList<Kohde>> kohteet, Action<Kohde> valittu)
        {
            this.kohteet = kohteet;
            this.valittu = valittu;
            // Peite koko ruudulle: napautus ikkunan ohi sulkee ilman valintaa (ei valu palloon).
            peite = Rakenne.El("mk-isssijainti", isa);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(e => { if (e.target == peite) { Sulje("ulkopuoli"); e.StopPropagation(); } });
            ikkuna = Rakenne.El("mk-isssijainti__ikkuna", peite);
            ikkuna.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.iss.sijainti-iso"), "mk-isssijainti__otsikko", ikkuna), Kirjasin.Kone);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-isssijainti__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            ikkuna.Add(vieritys);
            lista = Rakenne.El("mk-isssijainti__lista", vieritys.contentContainer, PickingMode.Ignore);
        }

        /// <summary>Avaa ikkunan (kasvaa avaajan kohdalta) ja täyttää listan kahteen sarakkeeseen.</summary>
        public void Avaa(Vector2? avaaja)
        {
            if (Auki) return;
            lista.Clear();
            nykyiset.Clear();
            var k = kohteet?.Invoke();
            if (k != null)
                foreach (var x in k)
                {
                    nykyiset.Add(x);
                    var kohde = x;
                    var b = Rakenne.Nappi(kohde.Nimi, "mk-isssijainti__kohde", () => Valitse(kohde), lista);
                    Kirjasimet.Aseta(b, Kirjasin.Luku);
                }
            Auki = true;
            peite.style.display = DisplayStyle.Flex;
            peite.BringToFront();
            Ponnahdus.Avaa(ikkuna, avaaja);
            Debug.Log($"MATKAKIRJA linssit: sijainti-ikkuna auki, {lista.childCount} kohdetta");
        }

        void Valitse(Kohde k)
        {
            if (!Auki) return;
            Debug.Log("MATKAKIRJA linssit: sijainti-ikkuna valitsi " + k.Nimi);
            Sulje("valinta");
            valittu?.Invoke(k);
        }

        public void Sulje(string syy)
        {
            if (!Auki) return;
            Auki = false;
            Debug.Log("MATKAKIRJA linssit: sijainti-ikkuna kiinni (" + syy + ")");
            Ponnahdus.Sulje(ikkuna, () => { if (!Auki) peite.style.display = DisplayStyle.None; });
        }

        /// <summary>Testikomennon tila ja valinta nimen alulla (astro kyyti ohjaamo sijainti [nimi]).</summary>
        public string Testaa(string nimi)
        {
            if (!string.IsNullOrEmpty(nimi) && Auki)
            {
                int i = nykyiset.FindIndex(x => x.Nimi.StartsWith(nimi, StringComparison.OrdinalIgnoreCase));
                if (i >= 0) Valitse(nykyiset[i]);
            }
            var r = ikkuna.worldBound;
            return $"sijainti-ikkuna {(Auki ? "auki" : "kiinni")}, {lista.childCount} kohdetta, {r.xMin:0},{r.yMin:0}–{r.xMax:0},{r.yMax:0}";
        }
    }
}
