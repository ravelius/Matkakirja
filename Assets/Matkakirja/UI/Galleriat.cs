// LAUKUN GALLERIAT (Natiivi-UI): julistegalleria ja tietäjän tasogalleria.
//
// JULISTEGALLERIA (webin js/ui.js avaaJulisteGalleria, css .julistegalleria): laukun
// julisterivi "n/m »" avaa. Ylärivi "Julisteet n/m" ja ×; ryhmä per maanosa (webin
// MANNER_NIMET-järjestys) otsikolla "Maanosa saatu/kaikki"; voitettu juliste = vedos
// kaupungin nimellä (napautus → suurennos, selaus saman maanosan voitetuissa, web #3870), voittamaton =
// pelkkä reunus-kehys himmeällä pohjalla (ei kuvaa eikä nimeä). Data: UiSisalto.Julisteet (kokoelma julisteet), voitetut LaukkuNaytto.Julisteet.
//
// TIETÄJÄN TIE (webin js/tietajagalleria.js): laukun tietäjärivin "i" avaa. Selitys
// (päätoimittajan kaanonteksti TIETAJASELITYS), nykyinen taso isona kuvana ja kaikki
// kymmenen tasoa ruudukkona (kuva, nimi, raja tp); saavuttamattomat himmeinä, nykyinen
// korostettuna. Tasot Pelikoodarin Kokemus.Tasot.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Julistegalleria
    {
        static readonly (string Id, string Nimi)[] Mantereet =
        {
            ("europe", "Eurooppa"), ("middleeast", "Lähi-itä"), ("africa", "Afrikka"), ("asia", "Aasia"),
            ("northamerica", "Pohjois-Amerikka"), ("southamerica", "Etelä-Amerikka"), ("oceania", "Oseania"),
        };

        readonly VisualElement himmennys, sisus;
        readonly Label luku;
        readonly Kuvasuurennos suurennos;
        public bool Auki { get; private set; }

        public Julistegalleria(UiKerros kerros)
        {
            var juuri = kerros.Juuri(UiKerros.Valikot);
            himmennys = Rakenne.El("mk-himmennys mk-galleria-huntu", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            // GALLERIA-pohja (omistaja 2.10.2026 klo 15.5x, Pohjat/galleria.uss): PANEELI paperi, ✕ OHJAUSNAPPI.
            var kortti = Rakenne.El("mk-galleria tk-teema-paperi", himmennys);
            // Web #3870: leveys min(leveys.levea, ruutu − vali.xl) (USS:ssä ei min()/calc()).
            himmennys.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float w = Mathf.Min(Tyylikirja.Leveys.Levea, e.newRect.width - Tyylikirja.Vali.Xl);
                if (w > 0f && Mathf.Abs(kortti.resolvedStyle.width - w) > 0.5f) kortti.style.width = w;
            });
            var yla = Rakenne.El("mk-galleria__yla", kortti, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("JULISTEET", "mk-galleria__otsikko", yla), Kirjasin.Kone);
            luku = Rakenne.Teksti("", "mk-galleria__luku", yla);
            Kirjasimet.Aseta(luku, Kirjasin.Kone);
            Ohjausnappi.Nappi(Ikonit.Viiva["rasti"], "Sulje", Sulje, yla);
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-galleria__vieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            v.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(v);
            sisus = v.contentContainer;
            suurennos = new Kuvasuurennos(juuri);
        }

        /// <summary>Avaa gallerian; voitetut = laukun voitetut julisteavaimet (kaupunki tai julisteen id).</summary>
        public void Avaa(IEnumerable<string> voitetut)
        {
            var saadut = new HashSet<string>(voitetut ?? Enumerable.Empty<string>());
            UiSisalto.Lataa(() => Rakenna(saadut));
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 220);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            suurennos.Sulje();
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 200);
            SyoteLukko.Vapauta(this);
        }

        /// <summary>Lukossa olevan ja kuvattoman ruudun pohja: reunus-väri 30 %:n peitolla (web color-mix reunus 30 %).</summary>
        static void Himmea(VisualElement e)
        {
            Color c = Tyylikirja.Paperi.Reunus;
            c.a *= 0.3f;
            e.style.backgroundColor = c;
        }

        static bool Voitettu(JulisteTiedot j, HashSet<string> saadut) => saadut.Contains(j.Id) || saadut.Contains(j.Kaupunki);

        void Rakenna(HashSet<string> saadut)
        {
            sisus.Clear();
            var kaikki = UiSisalto.Julisteet;
            // Kehittäjätilassa koko kokoelma näkyy voitettuna (web julisteVoitot, omistaja 22.8.2026).
            if (Asetukset.Kehittaja) saadut = new HashSet<string>(kaikki.Select(j => j.Id));
            luku.text = $"{kaikki.Count(j => Voitettu(j, saadut))}/{kaikki.Count}";
            string Manner(JulisteTiedot j) => UiSisalto.Kaupunki(j.Kaupunki)?.Manner ?? "muu";
            var jarjestys = Mantereet.Select(m => m.Id).ToList();
            var ryhmat = kaikki.GroupBy(Manner).OrderBy(g => { int i = jarjestys.IndexOf(g.Key); return i < 0 ? 99 : i; }).ToList();
            // Web #3870: täysi koko selaa vain saman osion avoimia kuvia.
            var osiot = ryhmat.ToList();
            for (int oi = 0; oi < osiot.Count; oi++)
            {
                var g = osiot[oi];
                string nimi = Mantereet.FirstOrDefault(m => m.Id == g.Key).Nimi ?? "Muualla";
                Kirjasimet.Aseta(Rakenne.Teksti($"{nimi.ToUpperInvariant()} {g.Count(j => Voitettu(j, saadut))}/{g.Count()}", "mk-galleria__ryhma", sisus), Kirjasin.Kone);
                var ruudukko = Rakenne.El("mk-galleria__ruudukko" + (oi < osiot.Count - 1 ? " mk-galleria__ruudukko--vali" : ""), sisus, PickingMode.Ignore);
                var sarja = g.Where(j => Voitettu(j, saadut)).ToList();
                var teokset = sarja.Select(j => new LehtiKuva { Lahde = j.Url, Lyhyt = j.Otsikko, Selite = j.Selite ?? j.Lyhyt ?? j.Otsikko, Otsikko = j.Otsikko, LahdeRivi = "Matkakirjan oma paino" }).ToList();
                foreach (var j in g)
                {
                    if (!Voitettu(j, saadut))
                    {
                        // Lukossa: ohut reunus-kehys ja himmeä pohja, ei kuvaa eikä nimeä (web #3870, tyylikirja GALLERIA).
                        var lukko = Rakenne.El("mk-galleria__vedos mk-galleria__vedos--lukossa", ruudukko, PickingMode.Ignore);
                        Himmea(Rakenne.El("mk-galleria__kuva", lukko, PickingMode.Ignore));
                        continue;
                    }
                    int kohta = sarja.IndexOf(j);
                    var vedos = Rakenne.Nappi(null, "mk-galleria__vedos", () => suurennos.Avaa(teokset, kohta), ruudukko);
                    var kuva = Rakenne.El("mk-galleria__kuva", vedos, PickingMode.Ignore);
                    // Viemätön tiedosto: sama kehys kuin lukossa, nimi jää (web .kuvaton).
                    if (j.Url == null) { vedos.AddToClassList("mk-galleria__vedos--kuvaton"); Himmea(kuva); }
                    else Kuvat.Hae(j.PikkuUrl, t =>
                    {
                        if (t != null) kuva.style.backgroundImage = new StyleBackground(t);
                        else { vedos.AddToClassList("mk-galleria__vedos--kuvaton"); Himmea(kuva); }
                    });
                    Kirjasimet.Aseta(Rakenne.Teksti(j.KaupunkiNimi ?? UiSisalto.Kaupunki(j.Kaupunki)?.Nimi ?? j.Kaupunki, "mk-galleria__nimi", vedos), Kirjasin.Kone);
                }
                // grid auto-fill minmax(92px, 1fr), gap .6rem; vedos 2:3.
                Rakenne.Ruudukko(ruudukko, Tyylikirja.Galleria.Sarake, Tyylikirja.Galleria.Vali, (c, w) =>
                {
                    var k = c.Q(className: "mk-galleria__kuva");
                    if (k != null) k.style.height = Mathf.Round(w * 1.5f);
                });
            }
        }
    }

    public static class Tietajagalleria
    {
        static void SovitaSana(Label l)
        {
            float w = l.contentRect.width, koko = l.resolvedStyle.fontSize;
            if (float.IsNaN(w) || w <= 0f || float.IsNaN(koko)) return;
            string pisin = "";
            foreach (var sana in (l.text ?? "").Split(' ')) if (sana.Length > pisin.Length) pisin = sana;
            float leveys = l.MeasureTextSize(pisin, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            if (leveys <= w + 0.5f || koko <= 8f) return;
            l.style.fontSize = Mathf.Max(8f, Mathf.Min(koko - 0.5f, koko * w / leveys));
        }

        // Päätoimittajan kaanonteksti (js/tietajagalleria.js TIETAJASELITYS, omistaja 18.8.2026).
        const string Selitys = "Livia — täydeltä nimeltään Columba Livia, kirjekyyhky, "
            + "jonka suku on kantanut viestejä Caesarille ja Pariisin piiritykseen (ja hän kyllä "
            + "kertoo sen, jos aihetta on) — kulkee mukanasi ja kasvattaa sinua tiedon tiellä. "
            + "Jokainen uusi kaupunki, lauta ja oikea vastaus kartuttaa tietäjäpisteitä, ja pisteet "
            + "nostavat tietäjätasoa: untuvikosta aina Tietäjäksi iänikuiseksi asti.";

        public static string Avatar(int taso) => Laukku.SivustoJuuri + $"assets/tietaja/taso-{taso:00}.jpg";

        /// <summary>Tason muotokuva elementin taustaksi (myös valikon tasorivi ja tasonäkymä).</summary>
        public static void Kuva(VisualElement e, int taso) =>
            Kuvat.Hae(Avatar(taso), t => { if (t != null && e != null) e.style.backgroundImage = new StyleBackground(t); });

        /// <summary>Webin avaaTietajagalleria(pisteet): minipopup "Tietäjän tie".</summary>
        public static Minipopup Avaa(int pisteet) => Minipopup.Avaa("Tietäjän tie", s =>
        {
            var nyt = Kokemus.TasoPisteille(pisteet);
            var ylarivi = Rakenne.El("mk-tietaja__ylarivi", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(Selitys, "mk-tietaja__selitys", ylarivi), Kirjasin.Luku);
            var nyky = Rakenne.El("mk-tietaja__nykyinen", ylarivi, PickingMode.Ignore);
            Kuva(Rakenne.El("mk-tietaja__nykykuva", nyky, PickingMode.Ignore), nyt.Taso);
            Kirjasimet.Aseta(Rakenne.Teksti(nyt.Nimi, "mk-tietaja__nykynimi", nyky), Kirjasin.Kone);
            Ruudukko(s, pisteet);
        }, "mk-minipopup--tietaja");

        /// <summary>
        /// Kaikki tasot ruudukkona (kuva, nimi ja raja; nykyinen korostettu, saavuttamattomat himmeinä). Sama ruudukko
        /// minipopupissa ja valikon tasonäkymässä (web tietajaRuudukko, omistaja 2.10.2026 klo 14.4x, #3853); rengas = kuva
        /// renkaan sisällä, jolloin nykyinen ympyröidään toimintovärillä (pillerivalikko.uss .mk-tasonakyma).
        /// </summary>
        public static VisualElement Ruudukko(VisualElement isa, int pisteet, bool rengas = false)
        {
            var nyt = Kokemus.TasoPisteille(pisteet);
            var ruudukko = Rakenne.El("mk-tietaja__ruudukko", isa, PickingMode.Ignore);
            foreach (var t in Kokemus.Tasot)
            {
                var kohta = Rakenne.El("mk-tietaja__kohta", ruudukko, PickingMode.Ignore);
                kohta.EnableInClassList("mk-tietaja__kohta--saavuttamaton", pisteet < t.Raja);
                kohta.EnableInClassList("mk-valittu", t.Taso == nyt.Taso);
                var kuvanIsa = rengas ? Rakenne.El("mk-tietaja__rengas", kohta, PickingMode.Ignore) : kohta;
                Kuva(Rakenne.El("mk-tietaja__kuva", kuvanIsa, PickingMode.Ignore), t.Taso);
                var nimi = Rakenne.Teksti(t.Nimi, "mk-tietaja__nimi", kohta);
                Kirjasimet.Aseta(nimi, Kirjasin.Kone);
                // Pisin sana mahtuu riville (kapea valikko 320 pt: "Maailmanmatkaaja" katkesi keskeltä sanaa, 86638635):
                // fontti pienenee 0,5 px kerrallaan enintään 8 px:iin; vain pienenee, joten asettelu ei kierrä.
                nimi.RegisterCallback<GeometryChangedEvent>(_ => SovitaSana(nimi));
                Rakenne.Teksti($"{t.Raja} tp", "mk-tietaja__raja", kohta);
            }
            Rakenne.Ruudukko(ruudukko, 83f, 9f); // grid auto-fill minmax(5.2rem, 1fr), gap .55rem
            return ruudukko;
        }
    }
}
