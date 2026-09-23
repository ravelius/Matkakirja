// LAUKUN GALLERIAT (Natiivi-UI): julistegalleria ja tietäjän tasogalleria.
//
// JULISTEGALLERIA (webin js/ui.js avaaJulisteGalleria, css .julistegalleria): laukun
// julisterivi "n/m »" avaa. Ylärivi "Julisteet n/m" ja ×; ryhmä per maanosa (webin
// MANNER_NIMET-järjestys) otsikolla "Maanosa saatu/kaikki"; voitettu juliste = vedos
// kaupungin nimellä (napautus → suurennos, selattava voitettujen sarja), voittamaton =
// "?"-lukko. Data: UiSisalto.Julisteet (kokoelma julisteet), voitetut LaukkuNaytto.Julisteet.
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
            var kortti = Rakenne.El("mk-galleria", himmennys);
            var yla = Rakenne.El("mk-galleria__yla", kortti, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("JULISTEET", "mk-galleria__otsikko", yla), Kirjasin.Kone);
            luku = Rakenne.Teksti("", "mk-galleria__luku", yla);
            Kirjasimet.Aseta(luku, Kirjasin.Kone);
            Rakenne.Nappi("×", "mk-galleria__rasti", Sulje, yla);
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
            // Selattava sarja: voitetut ryhmien järjestyksessä (web selattavat).
            var sarja = ryhmat.SelectMany(g => g).Where(j => Voitettu(j, saadut)).ToList();
            var teokset = sarja.Select(j => new LehtiKuva { Lahde = j.Url, Lyhyt = j.Otsikko, Selite = j.Selite ?? j.Lyhyt ?? j.Otsikko, Otsikko = j.Otsikko, LahdeRivi = "Matkakirjan oma paino" }).ToList();
            foreach (var g in ryhmat)
            {
                string nimi = Mantereet.FirstOrDefault(m => m.Id == g.Key).Nimi ?? "Muualla";
                Kirjasimet.Aseta(Rakenne.Teksti($"{nimi.ToUpperInvariant()} {g.Count(j => Voitettu(j, saadut))}/{g.Count()}", "mk-galleria__ryhma", sisus), Kirjasin.Kone);
                var ruudukko = Rakenne.El("mk-galleria__ruudukko", sisus, PickingMode.Ignore);
                foreach (var j in g)
                {
                    if (!Voitettu(j, saadut))
                    {
                        var lukko = Rakenne.El("mk-galleria__vedos mk-galleria__vedos--lukossa", ruudukko, PickingMode.Ignore);
                        lukko.Add(new Katkokehys());
                        Kirjasimet.Aseta(Rakenne.Teksti("?", "mk-galleria__kysymys", lukko), Kirjasin.Luku);
                        continue;
                    }
                    int kohta = sarja.IndexOf(j);
                    var vedos = Rakenne.Nappi(null, "mk-galleria__vedos", () => suurennos.Avaa(teokset, kohta), ruudukko);
                    var kuva = Rakenne.El("mk-galleria__kuva", vedos, PickingMode.Ignore);
                    kuva.Add(new Katkokehys());
                    // Viemätön tiedosto jättää nimen ja katkoviivakehyksen (web .kuvaton).
                    if (j.Url == null) vedos.AddToClassList("mk-galleria__vedos--kuvaton");
                    else Kuvat.Hae(j.Url, t =>
                    {
                        if (t != null) kuva.style.backgroundImage = new StyleBackground(t);
                        else vedos.AddToClassList("mk-galleria__vedos--kuvaton");
                    });
                    Kirjasimet.Aseta(Rakenne.Teksti(j.KaupunkiNimi ?? UiSisalto.Kaupunki(j.Kaupunki)?.Nimi ?? j.Kaupunki, "mk-galleria__nimi", vedos), Kirjasin.Kone);
                }
                // grid auto-fill minmax(92px, 1fr), gap .6rem; vedos 2:3.
                Rakenne.Ruudukko(ruudukko, 92f, 10f, (c, w) =>
                {
                    var k = c.ClassListContains("mk-galleria__vedos--lukossa") ? c : c.Q(className: "mk-galleria__kuva");
                    if (k != null) k.style.height = Mathf.Round(w * 1.5f);
                });
            }
        }
    }

    /// <summary>Katkoviivakehys (web border: 1px dashed): lukossa oleva ja kuvaton paikka. Väri = USS color.</summary>
    sealed class Katkokehys : VisualElement
    {
        public Katkokehys()
        {
            pickingMode = PickingMode.Ignore;
            AddToClassList("mk-katkokehys");
            generateVisualContent += Piirra;
        }

        void Piirra(MeshGenerationContext mgc)
        {
            var r = contentRect;
            if (r.width < 4 || r.height < 4) return;
            var p = mgc.painter2D;
            p.strokeColor = resolvedStyle.color;
            p.lineWidth = 1f;
            p.lineCap = LineCap.Butt;
            const float Viiva = 4f, Vali = 3f;
            void Sivu(Vector2 a, Vector2 b)
            {
                float pituus = Vector2.Distance(a, b);
                for (float t = 0; t < pituus; t += Viiva + Vali)
                {
                    p.MoveTo(Vector2.Lerp(a, b, t / pituus));
                    p.LineTo(Vector2.Lerp(a, b, Mathf.Min(pituus, t + Viiva) / pituus));
                }
            }
            p.BeginPath();
            float x0 = r.xMin + 0.5f, y0 = r.yMin + 0.5f, x1 = r.xMax - 0.5f, y1 = r.yMax - 0.5f;
            Sivu(new Vector2(x0, y0), new Vector2(x1, y0));
            Sivu(new Vector2(x1, y0), new Vector2(x1, y1));
            Sivu(new Vector2(x1, y1), new Vector2(x0, y1));
            Sivu(new Vector2(x0, y1), new Vector2(x0, y0));
            p.Stroke();
        }
    }

    public static class Tietajagalleria
    {
        // Päätoimittajan kaanonteksti (js/tietajagalleria.js TIETAJASELITYS, omistaja 18.8.2026).
        const string Selitys = "Livia — täydeltä nimeltään Columba Livia, kirjekyyhky, "
            + "jonka suku on kantanut viestejä Caesarille ja Pariisin piiritykseen (ja hän kyllä "
            + "kertoo sen, jos aihetta on) — kulkee mukanasi ja kasvattaa sinua tiedon tiellä. "
            + "Jokainen uusi kaupunki, lauta ja oikea vastaus kartuttaa tietäjäpisteitä, ja pisteet "
            + "nostavat tietäjätasoa: untuvikosta aina Tietäjäksi iänikuiseksi asti.";

        static string Avatar(int taso) => Laukku.SivustoJuuri + $"assets/tietaja/taso-{taso:00}.jpg";

        static void Kuva(VisualElement e, int taso) =>
            Kuvat.Hae(Avatar(taso), t => { if (t != null) e.style.backgroundImage = new StyleBackground(t); });

        /// <summary>Webin avaaTietajagalleria(pisteet): minipopup "Tietäjän tie".</summary>
        public static Minipopup Avaa(int pisteet) => Minipopup.Avaa("Tietäjän tie", s =>
        {
            var nyt = Kokemus.TasoPisteille(pisteet);
            var ylarivi = Rakenne.El("mk-tietaja__ylarivi", s, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(Selitys, "mk-tietaja__selitys", ylarivi), Kirjasin.Luku);
            var nyky = Rakenne.El("mk-tietaja__nykyinen", ylarivi, PickingMode.Ignore);
            Kuva(Rakenne.El("mk-tietaja__nykykuva", nyky, PickingMode.Ignore), nyt.Taso);
            Kirjasimet.Aseta(Rakenne.Teksti(nyt.Nimi, "mk-tietaja__nykynimi", nyky), Kirjasin.Kone);
            var ruudukko = Rakenne.El("mk-tietaja__ruudukko", s, PickingMode.Ignore);
            foreach (var t in Kokemus.Tasot)
            {
                var kohta = Rakenne.El("mk-tietaja__kohta", ruudukko, PickingMode.Ignore);
                kohta.EnableInClassList("mk-tietaja__kohta--saavuttamaton", pisteet < t.Raja);
                kohta.EnableInClassList("mk-valittu", t.Taso == nyt.Taso);
                Kuva(Rakenne.El("mk-tietaja__kuva", kohta, PickingMode.Ignore), t.Taso);
                Kirjasimet.Aseta(Rakenne.Teksti(t.Nimi, "mk-tietaja__nimi", kohta), Kirjasin.Kone);
                Rakenne.Teksti($"{t.Raja} tp", "mk-tietaja__raja", kohta);
            }
            Rakenne.Ruudukko(ruudukko, 83f, 9f); // grid auto-fill minmax(5.2rem, 1fr), gap .55rem
        }, "mk-minipopup--tietaja");
    }
}
