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
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            var kortti = Rakenne.El("mk-galleria", himmennys);
            Rakenne.Tausta(kortti, Kuviot.Pergamentti);
            var yla = Rakenne.El("mk-galleria__yla", kortti, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Julisteet", "mk-galleria__otsikko", yla), Kirjasin.LukuLihava);
            luku = Rakenne.Teksti("", "mk-galleria__luku", yla);
            Kirjasimet.Aseta(luku, Kirjasin.Kone);
            Rakenne.Nappi("×", "mk-nosto__sulje", Sulje, yla);
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-galleria__vieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
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
            luku.text = $"{kaikki.Count(j => Voitettu(j, saadut))}/{kaikki.Count}";
            string Manner(JulisteTiedot j) => UiSisalto.Kaupunki(j.Kaupunki)?.Manner ?? "muu";
            var jarjestys = Mantereet.Select(m => m.Id).ToList();
            var ryhmat = kaikki.GroupBy(Manner).OrderBy(g => { int i = jarjestys.IndexOf(g.Key); return i < 0 ? 99 : i; }).ToList();
            // Selattava sarja: voitetut ryhmien järjestyksessä (web selattavat).
            var sarja = ryhmat.SelectMany(g => g).Where(j => Voitettu(j, saadut)).ToList();
            var teokset = sarja.Select(j => new LehtiKuva { Lahde = j.Url, Lyhyt = j.Otsikko, Selite = j.Selite ?? j.Lyhyt ?? j.Otsikko, LahdeRivi = "Matkakirjan tuotantojuliste" }).ToList();
            foreach (var g in ryhmat)
            {
                string nimi = Mantereet.FirstOrDefault(m => m.Id == g.Key).Nimi ?? "Muualla";
                Kirjasimet.Aseta(Rakenne.Teksti($"{nimi.ToUpperInvariant()}  {g.Count(j => Voitettu(j, saadut))}/{g.Count()}", "mk-galleria__ryhma", sisus), Kirjasin.Kone);
                var ruudukko = Rakenne.El("mk-galleria__ruudukko", sisus, PickingMode.Ignore);
                foreach (var j in g)
                {
                    if (!Voitettu(j, saadut))
                    {
                        var lukko = Rakenne.El("mk-galleria__vedos mk-galleria__vedos--lukossa", ruudukko, PickingMode.Ignore);
                        Kirjasimet.Aseta(Rakenne.Teksti("?", "mk-galleria__kysymys", lukko), Kirjasin.LukuLihava);
                        continue;
                    }
                    int kohta = sarja.IndexOf(j);
                    var vedos = Rakenne.Nappi(null, "mk-galleria__vedos", () => suurennos.Avaa(teokset, kohta), ruudukko);
                    var kuva = Rakenne.El("mk-galleria__kuva", vedos, PickingMode.Ignore);
                    if (j.Url != null) Kuvat.Hae(j.Url, t => { if (t != null) kuva.style.backgroundImage = new StyleBackground(t); });
                    Kirjasimet.Aseta(Rakenne.Teksti(j.KaupunkiNimi ?? UiSisalto.Kaupunki(j.Kaupunki)?.Nimi ?? j.Kaupunki, "mk-galleria__nimi", vedos), Kirjasin.Kone);
                }
            }
        }
    }

    public sealed class Tietajagalleria
    {
        // Päätoimittajan kaanonteksti (js/tietajagalleria.js TIETAJASELITYS, omistaja 18.8.2026).
        const string Selitys = "Livia — täydeltä nimeltään Columba Livia, kirjekyyhky, "
            + "jonka suku on kantanut viestejä Caesarille ja Pariisin piiritykseen (ja hän kyllä "
            + "kertoo sen, jos aihetta on) — kulkee mukanasi ja kasvattaa sinua tiedon tiellä. "
            + "Jokainen uusi kaupunki, lauta ja oikea vastaus kartuttaa tietäjäpisteitä, ja pisteet "
            + "nostavat tietäjätasoa: untuvikosta aina Tietäjäksi iänikuiseksi asti.";

        readonly VisualElement himmennys, nykyKuva, ruudukko;
        readonly Label nykyNimi;
        public bool Auki { get; private set; }

        public Tietajagalleria(UiKerros kerros)
        {
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            var kortti = Rakenne.El("mk-galleria mk-galleria--tietaja", himmennys);
            Rakenne.Tausta(kortti, Kuviot.Pergamentti);
            var yla = Rakenne.El("mk-galleria__yla", kortti, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Tietäjän tie", "mk-galleria__otsikko", yla), Kirjasin.LukuLihava);
            Rakenne.Nappi("×", "mk-nosto__sulje", Sulje, yla);
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-galleria__vieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(v);
            var ylarivi = Rakenne.El("mk-tietaja__ylarivi", v, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(Selitys, "mk-tietaja__selitys", ylarivi), Kirjasin.Luku);
            var nyky = Rakenne.El("mk-tietaja__nykyinen", ylarivi, PickingMode.Ignore);
            nykyKuva = Rakenne.El("mk-tietaja__nykykuva", nyky, PickingMode.Ignore);
            nykyNimi = Rakenne.Teksti("", "mk-tietaja__nykynimi", nyky);
            Kirjasimet.Aseta(nykyNimi, Kirjasin.LukuLihava);
            ruudukko = Rakenne.El("mk-galleria__ruudukko mk-tietaja__ruudukko", v, PickingMode.Ignore);
        }

        static string Avatar(int taso) => Laukku.SivustoJuuri + $"assets/tietaja/taso-{taso:00}.jpg";

        public void Avaa(int pisteet)
        {
            var nyt = Kokemus.TasoPisteille(pisteet);
            nykyNimi.text = nyt.Nimi;
            Kuvat.Hae(Avatar(nyt.Taso), t => { if (t != null) nykyKuva.style.backgroundImage = new StyleBackground(t); });
            ruudukko.Clear();
            foreach (var t in Kokemus.Tasot)
            {
                var kohta = Rakenne.El("mk-tietaja__kohta", ruudukko, PickingMode.Ignore);
                kohta.EnableInClassList("mk-tietaja__kohta--saavuttamaton", pisteet < t.Raja);
                kohta.EnableInClassList("mk-valittu", t.Taso == nyt.Taso);
                var kuva = Rakenne.El("mk-tietaja__kuva", kohta, PickingMode.Ignore);
                Kuvat.Hae(Avatar(t.Taso), tx => { if (tx != null) kuva.style.backgroundImage = new StyleBackground(tx); });
                Kirjasimet.Aseta(Rakenne.Teksti(t.Nimi, "mk-tietaja__nimi", kohta), Kirjasin.LukuLihava);
                Kirjasimet.Aseta(Rakenne.Teksti($"{t.Raja} tp", "mk-tietaja__raja", kohta), Kirjasin.Kone);
            }
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 220);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 200);
            SyoteLukko.Vapauta(this);
        }
    }
}
