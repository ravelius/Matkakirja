// IHMISEN MATKAN NOSTOKORTTI (Natiivi-UI): web js/linssit/ihmisen-matka-kortti.js luoNostokortti ja
// css/ihmisen-tutkimus.css .ihmisen-nostokortti. Löytökuvan napautus avaa kortin palkin alle vasempaan
// reunaan: ✕ (Sulje nosto), ajoitus pilkun kanssa, otsikko, "paikka — maa", kuvat (kuvitus, esine,
// aito kuva), löytöteksti ja "Kysy viisaalta pöllöltä pululta" -kysymykset. Valmis vastaus tulee
// kortin sisään lähteineen (LinssiKysymykset), muuten kysymys kulkee pululle (PuluChat.KysyUlkoisesti).
// Esitys menee kortin ajaksi tauolle ja jatkuu sulkiessa, jos se oli käynnissä.
//
// Natiivin aineistosta puuttuvat vielä kuvatekstit, kuvien lähderivit ja noston juttu (web "Lue lisää"
// → ihmisen matkan tiedeliite), joten niitä ei näytetä.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IhmisenNostokortti
    {
        readonly VisualElement kortti;
        readonly ScrollView vieritys;
        bool pysaytin, kysymysKesken;
        Label kupla;

        /// <summary>Auki olevan noston tunnus (web tila.auki), tai null.</summary>
        public string Auki { get; private set; }

        /// <summary>Kortti avautui tai sulkeutui (pulun linssikysymykset seuraavat avointa nostoa).</summary>
        public event Action Muuttui;

        public IhmisenNostokortti(VisualElement isa)
        {
            kortti = Rakenne.El("mk-ihmisnosto", isa);
            kortti.style.display = DisplayStyle.None;
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-ihmisnosto__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(vieritys);
        }

        /// <summary>Kortin yläreuna palkin alle (turva-alueen koordinaateissa).</summary>
        public float Yla { set => kortti.style.top = value; }

        /// <summary>Web avaa(tunnus): sama nosto uudestaan sulkee.</summary>
        public bool Avaa(Loytopaikka p)
        {
            if (p == null) return false;
            if (Auki == p.Tunnus) { Sulje(); return false; }
            Auki = p.Tunnus;
            kupla = null;
            foreach (var b in kortti.Children().OfType<Button>().ToList()) b.RemoveFromHierarchy();
            var s = vieritys.contentContainer;
            s.Clear();
            vieritys.scrollOffset = Vector2.zero;

            var sulje = Rakenne.Nappi("✕", "mk-ihmisnosto__sulje", Sulje, kortti);
            sulje.tooltip = "Sulje nosto";
            sulje.BringToFront();

            var ajoitus = Rakenne.El("mk-ihmisnosto__ajoitus", s, PickingMode.Ignore);
            Rakenne.El("mk-ihmisnosto__pilkku", ajoitus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti((p.Ajoitus ?? "").ToUpperInvariant(), "mk-ihmisnosto__ajoitusteksti", ajoitus), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti(p.Otsikko ?? "", "mk-ihmisnosto__otsikko", s), Kirjasin.KoneLihava);
            if (!string.IsNullOrEmpty(p.Paikka))
                Kirjasimet.Aseta(Rakenne.Teksti(string.IsNullOrEmpty(p.Maa) ? p.Paikka : p.Paikka + " — " + p.Maa, "mk-ihmisnosto__paikka", s), Kirjasin.Luku);

            // Kuva-alue (web: kuvitus, esine 38 %, aito kuva sovitettuna).
            var kuvat = Rakenne.El("mk-ihmisnosto__kuvat", s, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(p.Kuva)) Kuva(kuvat, p.Kuva, "mk-ihmisnosto__kuva--kuvitus", 2f / 3f);
            if (!string.IsNullOrEmpty(p.Esine)) Kuva(kuvat, p.Esine, "mk-ihmisnosto__kuva--esine", 1f);
            if (!string.IsNullOrEmpty(p.Aito)) Kuva(kuvat, p.Aito, "mk-ihmisnosto__kuva--aito", 2f / 3f);
            if (kuvat.childCount == 0) kuvat.style.display = DisplayStyle.None;

            string teksti = p.Loyto ?? p.Selite ?? "";
            if (teksti.Length > 0) Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-ihmisnosto__teksti", s), Kirjasin.Luku);

            // Kysymykset: löytöpaikalla valmiit (web haeIhmisenMatkanKysymykset), muuten noston omat; enintään 3.
            var valmiit = !p.Lisanosto ? LinssiKysymykset.Tunnukselle(p.Tunnus) : null;
            var kysymykset = (valmiit != null && valmiit.Kysymykset.Count > 0 ? valmiit.Kysymykset : p.Kysymykset.ToList())
                .Where(k => !string.IsNullOrEmpty(k)).Take(3).ToList();
            if (kysymykset.Count > 0)
            {
                var ryhma = Rakenne.El("mk-ihmisnosto__kysymykset", s, PickingMode.Ignore);
                var q = Rakenne.Teksti("Kysy <s>viisaalta pöllöltä</s> pululta:", "mk-ihmisnosto__kysyotsikko", ryhma);
                q.enableRichText = true;
                Kirjasimet.Aseta(q, Kirjasin.Luku);
                foreach (var k in kysymykset)
                {
                    string kysymys = k;
                    Button nappi = null;
                    nappi = Rakenne.Nappi(kysymys, "mk-ihmisnosto__kysymys", () => KysyPululta(valmiit, kysymys, nappi, ryhma), ryhma);
                    Kirjasimet.Aseta(nappi, Kirjasin.Luku);
                }
            }

            kortti.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(kortti, true, 220);
            // Esitys tauolle kortin ajaksi; jatko sulusta (web tila.pysaytin).
            var e = LinssiUi.IhmisenMatka?.Esitys;
            if (e != null && e.Kaynnissa) { e.Tauko(); pysaytin = true; }
            Muuttui?.Invoke();
            return true;
        }

        public void Sulje()
        {
            if (Auki == null) return;
            Auki = null;
            Rakenne.Nayta(kortti, false, 180);
            foreach (var b in kortti.Children().OfType<Button>().ToList()) b.RemoveFromHierarchy();
            if (pysaytin) { pysaytin = false; LinssiUi.IhmisenMatka?.Esitys?.Jatka(); }
            Muuttui?.Invoke();
        }

        /// <summary>Linssi pois tai esitys alusta: kortti kiinni ilman jatkoa.</summary>
        public void Pois()
        {
            pysaytin = false;
            Sulje();
        }

        static void Kuva(VisualElement isa, string url, string luokka, float suhde)
        {
            var k = Rakenne.El("mk-ihmisnosto__kuva " + luokka, isa, PickingMode.Ignore);
            k.RegisterCallback<GeometryChangedEvent>(ev =>
            {
                float h = Mathf.Round(ev.newRect.width * suhde);
                if (ev.newRect.width > 0 && Mathf.Abs(ev.newRect.height - h) > 0.5f) k.style.height = h;
            });
            // Puuttuva kuva pois (web ilmanVaraa / error → kehys pois).
            Kuvat.Hae(url, t => { if (t == null) k.RemoveFromHierarchy(); else k.style.backgroundImage = new StyleBackground(t); });
        }

        void KysyPululta(LinssiKysymys valmiit, string kysymys, Button nappi, VisualElement ryhma)
        {
            if (kysymysKesken || !nappi.enabledSelf) return;
            nappi.AddToClassList("mk-ihmisnosto__kysymys--lahetetty");
            nappi.SetEnabled(false);
            if (kupla == null)
            {
                kupla = Rakenne.Teksti("", "mk-ihmisnosto__vastaus", ryhma.parent);
                kupla.enableRichText = false;
                Kirjasimet.Aseta(kupla, Kirjasin.Luku);
                kupla.PlaceInFront(ryhma);
            }
            var lahdeRivi = ryhma.parent.Q(className: "mk-ihmisnosto__vastauslahde");
            lahdeRivi?.RemoveFromHierarchy();
            if (valmiit != null && valmiit.Vastaukset.TryGetValue(kysymys.Trim(), out var v))
            {
                kupla.text = v.Vastaus;
                if (v.Lahteet.Count > 0)
                {
                    var rivi = Rakenne.El("mk-ihmisnosto__vastauslahde", ryhma.parent, PickingMode.Ignore);
                    rivi.PlaceInFront(kupla);
                    Kirjasimet.Aseta(Rakenne.Teksti("Lähde:", "mk-ihmisnosto__lahdeteksti", rivi), Kirjasin.Luku);
                    foreach (var (url, otsikko) in v.Lahteet)
                    {
                        string u = url;
                        Kirjasimet.Aseta(Rakenne.Nappi(otsikko, "mk-ihmisnosto__lahdelinkki", () => Application.OpenURL(u), rivi), Kirjasin.Luku);
                    }
                }
                return;
            }
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            var k = kupla;
            k.text = "…";
            if (chat == null || !chat.KysyUlkoisesti(kysymys, vastaus => { kysymysKesken = false; if (k.panel != null) k.text = vastaus; }))
            {
                k.text = "Pulu vastaa vielä edelliseen. Hetki vain.";
                nappi.RemoveFromClassList("mk-ihmisnosto__kysymys--lahetetty");
                nappi.SetEnabled(true);
                return;
            }
            kysymysKesken = true;
        }
    }
}
