// LATAUSPALKKI (Natiivi-UI 5.10.2026; omistaja 12.5x: "linnan lataukseen ja tulevaisuudessa muidenkin vastaavien lataukseen
// ennemmin pienen latauspalkin, josta näkee edistymisen"): EDISTYMINEN-pohjan (.mk-edistyminen, sisällön lataus Äänet-paneelissa)
// yhteinen kääre odotusruuduille. Pieni ja ohut palkki tekstin alle, arvo 0–1, häivytys Tyylikirja.Kesto-tokeneilla; ei uutta
// tyyliä (värit ja kulmat pohjasta, teema isännän tk-teema-luokasta). Ensimmäinen käyttäjä: linnan nimiruutu (DioraamaTaulu).
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Latauspalkki
    {
        /// <summary>Palkin juuri (.mk-edistyminen .mk-edistyminen--latauspalkki); isäntä asettelee sen.</summary>
        public readonly VisualElement Juuri;
        readonly VisualElement taytto;
        float arvo;
        bool nakyy;

        public Latauspalkki(VisualElement isa)
        {
            Juuri = Rakenne.El("mk-edistyminen mk-edistyminen--latauspalkki", isa, PickingMode.Ignore);
            taytto = Rakenne.El("mk-edistyminen__taytto", Juuri, PickingMode.Ignore);
            Juuri.style.opacity = 0f;
        }

        /// <summary>Edistyminen 0–1 (rajataan); täyttö liukuu Tyylikirja.Kesto.Liuku-ajassa (.mk-edistyminen--latauspalkki).</summary>
        public float Arvo
        {
            get => arvo;
            set
            {
                float a = float.IsNaN(value) ? 0f : Mathf.Clamp01(value);
                if (Mathf.Abs(a - arvo) < 0.001f) return;
                arvo = a;
                taytto.style.width = Length.Percent(a * 100f);
            }
        }

        public bool Nakyy => nakyy;

        /// <summary>Häivyttää palkin esiin tai pois (läpinäkyvänä se pitää paikkansa, joten mikään ei liiku).</summary>
        public void Nayta(bool nayta)
        {
            if (nayta == nakyy) return;
            nakyy = nayta;
            Juuri.style.opacity = nayta ? 1f : 0f;
        }

        /// <summary>Heti näkymättömäksi ja nollaan (uusi odotus alkaa tyhjästä ilman häivytystä).</summary>
        public void Nollaa()
        {
            nakyy = false;
            arvo = 0f;
            Juuri.style.transitionDuration = new System.Collections.Generic.List<TimeValue> { new TimeValue(0f) };
            taytto.style.transitionDuration = new System.Collections.Generic.List<TimeValue> { new TimeValue(0f) };
            Juuri.style.opacity = 0f;
            taytto.style.width = Length.Percent(0f);
            Juuri.schedule.Execute(() =>
            {
                Juuri.style.transitionDuration = StyleKeyword.Null;
                taytto.style.transitionDuration = StyleKeyword.Null;
            });
        }
    }
}
