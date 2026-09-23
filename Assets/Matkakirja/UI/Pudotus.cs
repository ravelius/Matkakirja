// PUDOTUSPANEELI: verkkopelin .paavalikko-kuori (Natiivi-UI, erä 1).
//
// Tumma paneeli (--panel #2a1f16, reuna --line, pyöristys 10, varjo) ankkuroituu
// yläpalkin oikeaan reunaan palkin alle (top: 100 % + 0,35rem). Paneelin
// takana on läpinäkyvä sulkija koko ruudun yli: napautus ohi paneelin sulkee
// sen (kuten webissä klikkaus valikon ulkopuolelle). Auki ollessa pallon syöte
// on lukittu (SyoteLukko), ettei ohi osunut veto pyöritä karttaa.
// Kerros 40 (valikot) on pelidialogien yläpuolella.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public abstract class Pudotus
    {
        protected readonly VisualElement Sulkija, Paneeli;
        protected readonly ScrollView Sisalto;
        readonly UiKerros kerros;
        readonly Func<float> alareuna;

        public bool Auki { get; private set; }
        public event Action<bool> AukiMuuttui;

        protected Pudotus(UiKerros kerros, Func<float> ylapalkinAlareuna, string luokka)
        {
            this.kerros = kerros;
            alareuna = ylapalkinAlareuna;
            var juuri = kerros.Juuri(UiKerros.Valikot);
            kerros.Turva(UiKerros.Valikot);

            Sulkija = Rakenne.El("mk-sulkija", juuri);
            Sulkija.RegisterCallback<PointerDownEvent>(e => { Sulje(); e.StopPropagation(); });
            Sulkija.style.display = DisplayStyle.None;

            Paneeli = Rakenne.El("mk-pudotus " + luokka, juuri);
            Paneeli.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(Paneeli, Kirjasin.Kone);
            Sisalto = new ScrollView(ScrollViewMode.Vertical);
            Sisalto.AddToClassList("mk-pudotus__vieritys");
            Sisalto.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            Sisalto.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            Paneeli.Add(Sisalto);

            kerros.TurvaMuuttui += Asettele;
        }

        protected virtual void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Valikot);
            Paneeli.style.top = alareuna() + 6;
            Paneeli.style.right = r.z + 10;
            Paneeli.style.maxHeight = new Length(Mathf.Max(200, kerros.Juuri(UiKerros.Valikot).resolvedStyle.height - alareuna() - r.w - 24), LengthUnit.Pixel);
        }

        /// <summary>Päivittää rivien tilat juuri ennen avaamista.</summary>
        protected abstract void Paivita();

        public void Avaa()
        {
            if (Auki) return;
            Paivita();
            Asettele();
            Auki = true;
            Sulkija.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(Paneeli, true, 180);
            SyoteLukko.Esta(this);
            AukiMuuttui?.Invoke(true);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Sulkija.style.display = DisplayStyle.None;
            Rakenne.Nayta(Paneeli, false, 180);
            SyoteLukko.Vapauta(this);
            AukiMuuttui?.Invoke(false);
        }

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        /// <summary>Ryhmän otsikko (.valikko-otsikko: kulta, versaali, harva).</summary>
        protected Label Otsikko(string teksti) => Rakenne.Teksti(teksti.ToUpperInvariant(), "mk-pudotus__otsikko", Sisalto);
    }
}
