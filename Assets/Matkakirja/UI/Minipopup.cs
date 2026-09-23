// MINIPOPUP JA PIKKUSELOSTE (Natiivi-UI): webin js/minipopup.js ja ui.js pikkuselosteNappi.
//
// MINIPOPUP (css .minipopup-kehys/-kortti): pieni paperikortti keskellä ruutua,
// otsikko ja × ylärivissä, sisältö vierii (enintään 66 % ruudusta). Napautus taustaan
// sulkee. Yksi auki kerrallaan kuten webissä (avaus sulkee edellisen).
//
// PIKKUSELOSTE (css button.seloste-nappi, .pikkuseloste): pieni i-ympyrä otsikon
// perässä; napautus avaa tekstin kokoisen laatikon napin alle (tai yläpuolelle, jos
// alle ei mahdu), ×, napautus ohi tai toinen napautus samaan nappiin sulkee.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Minipopup
    {
        static Minipopup auki;

        readonly VisualElement himmennys;
        public readonly VisualElement Sisalto;
        public event Action Suljettu;
        public bool Auki => auki == this;

        Minipopup(string otsikko, string luokka, int kerros)
        {
            var juuri = UiKerros.Hae().Juuri(kerros);
            himmennys = Rakenne.El("mk-himmennys mk-minipopup", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            var kehys = Rakenne.El("mk-minipopup__kehys", himmennys);
            Rakenne.Luokat(kehys, luokka);
            Rakenne.Tausta(kehys, Kuviot.Pergamentti);
            Kirjasimet.Aseta(kehys, Kirjasin.Luku);
            var yla = Rakenne.El("mk-minipopup__ylarivi", kehys, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-minipopup__otsikko", yla), Kirjasin.Kone);
            Rakenne.Nappi("×", "mk-minipopup__sulje", Sulje, yla);
            var v = new ScrollView(ScrollViewMode.Vertical);
            v.AddToClassList("mk-minipopup__vieritys");
            v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            v.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kehys.Add(v);
            Sisalto = v.contentContainer;
        }

        /// <summary>
        /// Avaa uuden minipopupin (sulkee edellisen); rakenna täyttää Sisallon. kerros = UiKerros-kerros
        /// (oletus Valikot; Traileri = lehden, nähtävyysarkin ja aloitusnäkymän päälle, ettei popup jää alle).
        /// </summary>
        public static Minipopup Avaa(string otsikko, Action<VisualElement> rakenna, string luokka = null, int kerros = UiKerros.Valikot)
        {
            auki?.Sulje();
            var m = new Minipopup(otsikko, luokka, kerros);
            rakenna?.Invoke(m.Sisalto);
            auki = m;
            Rakenne.Nayta(m.himmennys, true, 200);
            SyoteLukko.Esta(m);
            return m;
        }

        /// <summary>Avaa minipopupin pelkällä tekstillä (web sisalto: string).</summary>
        public static Minipopup AvaaTeksti(string otsikko, string teksti, int kerros = UiKerros.Valikot) =>
            Avaa(otsikko, s => Rakenne.Teksti(teksti, "mk-minipopup__teksti", s), null, kerros);

        public static void SuljeAuki() => auki?.Sulje();

        public void Sulje()
        {
            if (auki != this) return;
            auki = null;
            SyoteLukko.Vapauta(this);
            var h = himmennys;
            Rakenne.Nayta(h, false, 160);
            h.schedule.Execute(() => h.RemoveFromHierarchy()).StartingIn(200);
            Suljettu?.Invoke();
        }
    }

    public static class Pikkuseloste
    {
        static VisualElement laatikko, ankkuri, juuri;
        static EventCallback<PointerDownEvent> ohi;

        /// <summary>i-nappi otsikon perään (web ui.pikkuselosteNappi).</summary>
        public static Button Nappi(string teksti, VisualElement isa = null)
        {
            Button b = null;
            b = Rakenne.Nappi("i", "mk-seloste-nappi", () =>
            {
                if (ankkuri == b) Sulje();
                else Avaa(b, teksti);
            }, isa);
            Kirjasimet.Aseta(b, Kirjasin.Kone);
            return b;
        }

        /// <summary>Katkaisija: sama ankkuri sulkee, muu avaa (web opas-vyo-nappi).</summary>
        public static void Vaihda(VisualElement a, string teksti)
        {
            if (ankkuri == a) Sulje();
            else Avaa(a, teksti);
        }

        public static void Avaa(VisualElement a, string teksti)
        {
            Sulje();
            if (a == null || string.IsNullOrEmpty(teksti)) return;
            juuri = UiKerros.Hae().Juuri(UiKerros.Valikot);
            ankkuri = a;
            ankkuri.AddToClassList("mk-auki");
            laatikko = Rakenne.El("mk-pikkuseloste", juuri);
            Rakenne.Tausta(laatikko, Kuviot.Pergamentti);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-pikkuseloste__teksti", laatikko), Kirjasin.Luku);
            Rakenne.Nappi("×", "mk-pikkuseloste__sulje", Sulje, laatikko);
            laatikko.style.opacity = 0;
            laatikko.RegisterCallback<GeometryChangedEvent>(Asemoi);
            // Sulkija vasta seuraavalla kierroksella: avaava napautus ei saa sulkea heti.
            var l = laatikko;
            juuri.schedule.Execute(() =>
            {
                if (laatikko != l) return;
                ohi = e =>
                {
                    var t = e.target as VisualElement;
                    if (t != null && (laatikko.Contains(t) || ankkuri.Contains(t))) return;
                    Sulje();
                };
                juuri.panel?.visualTree.RegisterCallback(ohi, TrickleDown.TrickleDown);
            });
        }

        static void Asemoi(GeometryChangedEvent _)
        {
            if (laatikko == null || ankkuri == null) return;
            var a = ankkuri.worldBound;
            var alku = juuri.WorldToLocal(a.position);
            float w = laatikko.resolvedStyle.width, h = laatikko.resolvedStyle.height;
            float W = juuri.resolvedStyle.width, H = juuri.resolvedStyle.height;
            const float marginaali = 10f;
            float alle = alku.y + a.height + 8f;
            float yli = alku.y - h - 8f;
            float yla = alle + h <= H - marginaali ? alle : Mathf.Max(marginaali, yli);
            float vasen = Mathf.Clamp(alku.x + a.width / 2f - w / 2f, marginaali, Mathf.Max(marginaali, W - w - marginaali));
            laatikko.style.top = yla;
            laatikko.style.left = vasen;
            laatikko.style.opacity = 1;
        }

        public static void Sulje()
        {
            if (ohi != null) juuri?.panel?.visualTree.UnregisterCallback(ohi, TrickleDown.TrickleDown);
            ohi = null;
            ankkuri?.RemoveFromClassList("mk-auki");
            laatikko?.RemoveFromHierarchy();
            laatikko = ankkuri = null;
        }
    }
}
