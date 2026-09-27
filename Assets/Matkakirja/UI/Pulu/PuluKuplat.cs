// PULUN PUHEKUPLAT (Natiivi-UI, erä 5): webin .pollo-vihje / .pollo-kuplapino.
//
// Kellertävä paperi #f4e7ca, reuna rgba(122,85,20,.32), pyöristys 0,6rem,
// Iowan Old Style 0,92rem, muste #211d18, leveys enintään 17rem. Kuplat
// pinoutuvat pulun yläpuolelle: uusi alimmaiseksi, vanhemmat nousevat ylös;
// pino enintään 14rem korkea ja vierittyy, vanhimmat haalistuvat (webin
// yläreunan liukumaski). Hanta (45° kierretty neliö) vain alimmaisella,
// osoittaa pulua kohti. Ei sulkemisruksia (omistaja 13.9.2026): kuplan
// napautus kuittaa sen. Kupla häviää lukuajan jälkeen (78 ms/merkki,
// 3,2–18 s; pidempi ääni pidentää), vanhimmat pois kun pinossa on yli 4.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PuluKuplat
    {
        public const float MsPerMerkki = 78f, Vahintaan = 3200f, Enintaan = 18000f;
        const int PinoEnintaan = 4;

        readonly VisualElement pino;
        readonly ScrollView vieritys;
        readonly List<Kupla> kuplat = new List<Kupla>();

        public sealed class Kupla
        {
            public VisualElement El;
            public Action Kuitattu;
            public IVisualElementScheduledItem Ajastin;
            public bool Poistuu;
        }

        public VisualElement Juuri => pino;
        public int Maara => kuplat.Count;

        public PuluKuplat(VisualElement isa)
        {
            pino = Rakenne.El("mk-kuplapino", isa, PickingMode.Ignore);
            vieritys = new ScrollView(ScrollViewMode.Vertical) { pickingMode = PickingMode.Ignore };
            vieritys.AddToClassList("mk-kuplapino__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            pino.Add(vieritys);
            Kirjasimet.Aseta(pino, Kirjasin.Luku);
        }

        /// <summary>Lukuaika millisekunteina (webin livianKuplanLukuaika).</summary>
        public static float Lukuaika(string teksti) =>
            Mathf.Clamp((teksti?.Length ?? 0) * MsPerMerkki, Vahintaan, Enintaan);

        /// <summary>Uusi kupla pinon alimmaiseksi. kestoMs 0 = lukuaika tekstistä. aani = pulun sähkeääni.</summary>
        public Kupla Lisaa(string teksti, float kestoMs = 0, Action kuitattu = null, string luokka = null, bool aani = true)
        {
            var el = Rakenne.El("mk-kupla" + (luokka != null ? " " + luokka : ""), null);
            foreach (var kappale in teksti.Split(new[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries))
                Rakenne.Teksti(kappale.Trim(), "mk-kupla__kappale", el);
            Rakenne.El("mk-kupla__hanta", el, PickingMode.Ignore);
            var k = new Kupla { El = el, Kuitattu = kuitattu };
            el.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Kuittaa(k); });
            vieritys.Add(el);
            kuplat.Add(k);
            Rakenne.Nayta(el, true, 220);
            PaivitaHannat();
            while (kuplat.Count > PinoEnintaan) Poista(kuplat[0], false);
            AsetaKesto(k, kestoMs > 0 ? kestoMs : Lukuaika(teksti));
            Rakenne.Vierita(vieritys, el, 30);
            if (aani) Aanet.PulunTehoste("pulu.sahke");
            return k;
        }

        /// <summary>
        /// Viisaan Pöllön muotokuva kuplan vasempaan laitaan (webin naytaAvauskupla
        /// {muotokuva}: vain avausesittelyn opaslupaus). Kuvapaikka 2:3, puhe oikealla;
        /// latautumaton kuva jättää paikan tyhjäksi (webissä kuva piiloon virheessä).
        /// </summary>
        public void LisaaMuotokuva(Kupla k, string url)
        {
            if (k == null || string.IsNullOrEmpty(url)) return;
            k.El.AddToClassList("mk-kupla--muotokuva");
            var puhe = Rakenne.El("mk-kupla__puhe", null, PickingMode.Ignore);
            foreach (var kappale in k.El.Query<Label>(className: "mk-kupla__kappale").ToList()) puhe.Add(kappale);
            var paikka = Rakenne.El("mk-kupla__muotokuva", null, PickingMode.Ignore);
            k.El.Insert(0, paikka);
            k.El.Insert(1, puhe);
            Kuvat.Hae(url, t =>
            {
                if (t == null || paikka.panel == null) return;
                paikka.style.backgroundImage = new StyleBackground(t);
            });
        }

        /// <summary>
        /// Ohita-tekstinappi kuplan oikeaan alakulmaan (web .pollo-vihje-ohita, Livian uuden matkan lyhyt tervehdys):
        /// kuittaa kuplan kuten napautus, mutta kertoo sen näkyvästi.
        /// </summary>
        public void LisaaOhita(Kupla k)
        {
            if (k == null) return;
            var nappi = Rakenne.Nappi("<u>Ohita</u>", "mk-kupla__ohita", () => Kuittaa(k));
            nappi.tooltip = "Ohita Livian tervehdys";
            var hanta = k.El.Q(className: "mk-kupla__hanta");
            if (hanta != null) k.El.Insert(k.El.IndexOf(hanta), nappi); else k.El.Add(nappi);
        }

        /// <summary>Pidentää kuplan näkyvyyttä (esim. ääni on lukuaikaa pidempi).</summary>
        public void AsetaKesto(Kupla k, float ms)
        {
            if (k == null || k.Poistuu) return;
            k.Ajastin?.Pause();
            k.Ajastin = k.El.schedule.Execute(() => Poista(k, false)).StartingIn((long)ms);
        }

        /// <summary>Kupla pois ilman kuittausta (esim. vihjeen peruutus).</summary>
        public void Poista(Kupla k) { if (k != null && !k.Poistuu) Poista(k, false); }

        /// <summary>Napautus: kupla pois ja kuittaus (seuraava repliikki jonosta).</summary>
        public void Kuittaa(Kupla k)
        {
            if (k == null || k.Poistuu) return;
            var kuittaus = k.Kuitattu;
            Poista(k, true);
            kuittaus?.Invoke();
        }

        public void TyhjennaKaikki()
        {
            foreach (var k in kuplat.ToArray()) Poista(k, false);
        }

        void Poista(Kupla k, bool heti)
        {
            if (k.Poistuu) return;
            k.Poistuu = true;
            k.Ajastin?.Pause();
            kuplat.Remove(k);
            Rakenne.Nayta(k.El, false, heti ? 120 : 260);
            k.El.schedule.Execute(() => k.El.RemoveFromHierarchy()).StartingIn(heti ? 160 : 320);
            PaivitaHannat();
        }

        void PaivitaHannat()
        {
            for (int i = 0; i < kuplat.Count; i++)
            {
                bool viimeinen = i == kuplat.Count - 1;
                kuplat[i].El.EnableInClassList("mk-kupla--viimeinen", viimeinen);
                // Vanhemmat haalistuvat ylöspäin (webin maski) ja eivät ota vahinkonapautuksia.
                kuplat[i].El.EnableInClassList("mk-kupla--vanha", i < kuplat.Count - 2);
                kuplat[i].El.pickingMode = i >= kuplat.Count - 2 ? PickingMode.Position : PickingMode.Ignore;
            }
        }
    }
}
