// IHMISEN MATKAN TUTKIMUSVAIHE (Natiivi-UI): web js/linssit/ihmisen-matka-tutkimus.js (luoVirtanapit,
// luoTutkimusvaihe) ja css/ihmisen-tutkimus.css (.ihmisen-vananapit, .ihmisen-nosto, .ihmisen-vanalappu).
// Moottori on Linssisepän (Tutkimusvaihe, ITutkimuksenNakyma); tämä on pinta:
//
//   Virtanapit  palkissa otsikon ja kellon välissä: pilkku virran rintamavärillä ja nimi (≤ 1000 px lyhyt).
//               Esityksen ajan legenda (himmeä, ei napautusta), tutkimusvaiheessa napit (Tutkimus.Valitse).
//   Nostot      noin 40 sykkivää pistettä (14 px syke 2,6 s + 5 px ydin, virran sävy tai kulta) pallon
//               pisteissä (IhmisenMatkaKerros.NostonPiste joka ruutu); napautus avaa nostokortin.
//   Vanalappu   valitun virran pergamenttilappu alalaidassa: nimi versaalina ja yhteenveto.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Virrat;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IhmisenTutkimusNakyma : ITutkimuksenNakyma
    {
        static readonly Dictionary<string, string> Lyhyet = new Dictionary<string, string>
        {
            ["paavirta"] = "Pää", ["eurooppa"] = "Eur.", ["siperia"] = "Sib.", ["amerikat"] = "Am.", ["tyynimeri"] = "Tyyni",
        };
        static readonly Color Kulta = new Color32(212, 175, 90, 255);

        readonly VisualElement napit, pisteet, lappu;
        readonly Label lappuOtsikko, lappuTeksti;
        readonly IhmisenNostokortti kortti;
        readonly List<(Button Nappi, string Tunnus)> virtanapit = new List<(Button, string)>();
        readonly List<(VisualElement El, TutkimusNosto Nosto)> nostot = new List<(VisualElement, TutkimusNosto)>();
        bool toiminnassa, syke;

        public IhmisenTutkimusNakyma(UiKerros kerros, VisualElement palkki, int palkinPaikka, IhmisenNostokortti kortti)
        {
            this.kortti = kortti;
            napit = Rakenne.El("mk-vananapit", null, PickingMode.Ignore);
            palkki.Insert(palkinPaikka, napit);
            napit.style.display = DisplayStyle.None;

            var juuri = kerros.Juuri(LinssiUi.Kerros);
            pisteet = Rakenne.El("mk-ihmisnostot", juuri, PickingMode.Ignore);
            pisteet.SendToBack();
            lappu = Rakenne.El("mk-vanalappu", kerros.Turva(LinssiUi.Kerros), PickingMode.Ignore);
            lappu.style.display = DisplayStyle.None;
            Rakenne.Tausta(lappu, Kuviot.Pergamentti);
            lappuOtsikko = Rakenne.Teksti("", "mk-vanalappu__otsikko", lappu);
            Kirjasimet.Aseta(lappuOtsikko, Kirjasin.Kone);
            lappuTeksti = Rakenne.Teksti("", "mk-vanalappu__teksti", lappu);
            Kirjasimet.Aseta(lappuTeksti, Kirjasin.Luku);

            kerros.JokaRuutu += Sijoita;
            // Syke (web ihmisen-nosto-syke 2,6 s): luokka vaihtuu puolen jakson välein, siirtymä hoitaa liukuman.
            pisteet.schedule.Execute(() =>
            {
                if (nostot.Count == 0) return;
                syke = !syke;
                pisteet.EnableInClassList("mk-ihmisnostot--syke", syke);
            }).Every(1300);
        }

        /// <summary>Palkin legenda linssin virroista (web rakennaKertomuksenPalkki). Tyhjä lista = pois.</summary>
        public void Rakenna(IReadOnlyList<Virta> virrat)
        {
            napit.Clear();
            virtanapit.Clear();
            // Web @media (max-width: 1000px): lyhyet nimet ("Pää", "Eur.", …) myös iPadilla pystyssä (834 px), koska
            // kello, otsikko ja napit vievät palkista yli puolet. Leveys UI-yksiköinä (= web CSS px) paneelin juuresta.
            float leveys = napit.panel?.visualTree?.layout.width ?? 0f;
            bool puhelin = float.IsNaN(leveys) || leveys <= 0f || leveys <= 1000f;
            foreach (var v in virrat ?? Array.Empty<Virta>())
            {
                string tunnus = v.Tunnus;
                var b = Rakenne.Nappi(null, "mk-vananappi", () => { if (toiminnassa) LinssiUi.IhmisenMatka?.Tutkimus?.Valitse(tunnus); }, napit);
                b.tooltip = v.Nimi;
                // Web ≤ 1000 px: .ihmisen-vananappi { padding: 0.25rem 0.4rem }.
                if (puhelin) { b.style.paddingLeft = 6.4f; b.style.paddingRight = 6.4f; }
                var pilkku = Rakenne.El("mk-vananappi__pilkku", b, PickingMode.Ignore);
                pilkku.style.backgroundColor = Vari(v.Vari?.Rintama);
                var nimi = Rakenne.Teksti(puhelin && Lyhyet.TryGetValue(tunnus, out var l) ? l : v.Nimi, "mk-vananappi__nimi", b);
                Kirjasimet.Aseta(nimi, Kirjasin.Kone);
                virtanapit.Add((b, tunnus));
            }
            napit.style.display = virtanapit.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            Napit(toiminnassa);
        }

        /// <summary>Linssi pois: napit, pisteet ja lappu pois.</summary>
        public void Pois()
        {
            toiminnassa = false;
            napit.style.display = DisplayStyle.None;
            Nostot(null);
            Valittu(null);
        }

        static Color Vari(string heksa) => ColorUtility.TryParseHtmlString(heksa ?? "", out var c) ? c : Kulta;

        // --- ITutkimuksenNakyma --------------------------------------------------------------

        public void Napit(bool paalla)
        {
            toiminnassa = paalla;
            napit.EnableInClassList("mk-vananapit--legenda", !paalla);
            foreach (var (b, _) in virtanapit) b.pickingMode = paalla ? PickingMode.Position : PickingMode.Ignore;
        }

        public void Valittu(Virta virta)
        {
            foreach (var (b, t) in virtanapit) b.EnableInClassList("mk-valittu", virta != null && t == virta.Tunnus);
            if (virta == null) { Rakenne.Nayta(lappu, false, 250); return; }
            lappuOtsikko.text = (virta.Nimi ?? "").ToUpperInvariant();
            lappuTeksti.text = virta.Yhteenveto ?? "";
            lappu.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(lappu, true, 320);
        }

        public void Nostot(IReadOnlyList<TutkimusNosto> uudet)
        {
            pisteet.Clear();
            nostot.Clear();
            foreach (var n in uudet ?? Array.Empty<TutkimusNosto>())
            {
                var nosto = n;
                var el = Rakenne.El("mk-ihmisnosto-piste", pisteet);
                var sykeEl = Rakenne.El("mk-ihmisnosto-piste__syke", el, PickingMode.Ignore);
                var ydin = Rakenne.El("mk-ihmisnosto-piste__ydin", el, PickingMode.Ignore);
                var vari = Vari(n.Vari);
                ydin.style.backgroundColor = vari;
                sykeEl.style.backgroundColor = new Color(vari.r, vari.g, vari.b, 0.45f);
                el.tooltip = n.Otsikko;
                el.RegisterCallback<ClickEvent>(_ => { if (nosto.Paikka != null) kortti.Avaa(nosto.Paikka); });
                el.style.visibility = Visibility.Hidden;
                nostot.Add((el, n));
            }
            Sijoita();
        }

        /// <summary>Joka ruutu: pisteet pallon mukana (NostonPiste, origo vasen ala → paneelin koordinaatit).</summary>
        void Sijoita()
        {
            if (nostot.Count == 0 || pisteet.panel == null) return;
            foreach (var (el, n) in nostot)
            {
                var p = IhmisenMatkaKerros.NostonPiste(n.Tunnus);
                if (!p.HasValue) { el.style.visibility = Visibility.Hidden; continue; }
                var q = RuntimePanelUtils.ScreenToPanel(pisteet.panel, new Vector2(p.Value.x, Screen.height - p.Value.y));
                el.style.visibility = Visibility.Visible;
                el.style.left = q.x;
                el.style.top = q.y;
            }
        }
    }
}
