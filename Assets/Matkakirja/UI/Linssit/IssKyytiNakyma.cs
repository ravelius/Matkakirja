// ISS:N KYYTI (Linssisepän suositus docs/raportit/iss-kyyti-suositus-20260928.md; Natiivi-UI katselmoi):
// AstronauttiKerros.KyytiKasittelija. Kyydissä (seuranta ja ikkuna):
//   vasen ylä    tietorivi "ISS · 418 km · 27 580 km/h" kuvanäkymän nimipillerin tyylillä (+ "rata-arvio" ilman tuoretta TLE:tä)
//   oikea ylä    ✕ palaa kaukonäkymään (AstronauttiLinssi.PoistuKyydista); linssin oma sulkunappi on piilossa (KuvaAuki)
// Ikkunassa lisäksi Cupola-kehys (Codexin toimitus 26.9., ämpäri karttanostot/20260926/iss-cupola-*): keskilasi ja kuusi
// trapetsilasia koko ruudulle (cover), ja lasin heijastus omana kerroksenaan hitaalla heilunnalla (8 s, 3 pt; pieni liike
// pois: paikallaan). Kuvat haetaan ensimmäisellä kyydillä (Kuvat.Hae, levyvälimuisti); ilman verkkoa ikkuna ilman kehystä.
// Kehys ja heijastus häivyttyvät 300 ms. Kaikki paitsi ✕ päästää kosketukset läpi, jolloin napautus vaihtaa tilaa.
using System;
using System.Globalization;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKyytiNakyma
    {
        const string Juuri = "https://media.matkakirja.app/karttanostot/20260926/";
        static readonly CultureInfo Fi = CultureInfo.GetCultureInfo("fi-FI");

        readonly VisualElement juuri, kehys, heijastus, turva;
        readonly Label tieto;
        bool kuvatHaettu;
        IVisualElementScheduledItem heilunta;

        public KyydinTila Tila { get; private set; } = KyydinTila.Kauko;
        /// <summary>Kyyti alkoi tai päättyi (LinssiUi piilottaa linssin sulkunapin kyydin ajaksi).</summary>
        public event Action<bool> AukiMuuttui;

        public IssKyytiNakyma(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-isskyyti", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            kehys = Rakenne.El("mk-isskyyti__kehys", juuri, PickingMode.Ignore);
            heijastus = Rakenne.El("mk-isskyyti__heijastus", juuri, PickingMode.Ignore);
            turva = Rakenne.El("mk-isskyyti__turva", juuri, PickingMode.Ignore);
            var pilleri = Rakenne.El("mk-isskyyti__tieto", turva, PickingMode.Ignore);
            tieto = Rakenne.Teksti("", "mk-isskyyti__teksti", pilleri);
            var sulku = Rakenne.Nappi("×", "mk-astrokuva__sulku", Poistu, turva);
            sulku.tooltip = "Pois kyydistä";
            juuri.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                var r = kerros.Reunat(LinssiUi.Kerros);
                turva.style.left = r.x; turva.style.top = r.y; turva.style.right = r.z; turva.style.bottom = r.w;
            });
        }

        static void Poistu() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi?.PoistuKyydista();

        /// <summary>AstronauttiKerros.KyytiKasittelija.</summary>
        public void Aseta(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio)
        {
            bool oliAuki = Tila != KyydinTila.Kauko;
            Tila = tila;
            bool auki = tila != KyydinTila.Kauko;
            juuri.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (auki)
                tieto.text = string.Format(Fi, "ISS · {0:N0} km · {1:N0} km/h{2}", korkeusKm, Math.Round(nopeusKmh / 10) * 10,
                    arvio ? " · rata-arvio" : "");
            bool ikkuna = tila == KyydinTila.Ikkuna;
            if (ikkuna && !kuvatHaettu) HaeKuvat();
            juuri.EnableInClassList("mk-isskyyti--ikkuna", ikkuna);
            Heilu(ikkuna);
            if (auki != oliAuki) AukiMuuttui?.Invoke(auki);
        }

        void HaeKuvat()
        {
            kuvatHaettu = true;
            // iPad-kehys leveämmälle ruudulle (1536 × 2732), muuten iPhone (1206 × 2622); cover rajaa loput.
            bool ipad = Screen.width > 0.5f * Screen.height;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            Kuvat.Hae(Juuri + "iss-cupola-kokonainen-" + koko + ".png", t => { if (t != null) kehys.style.backgroundImage = t; });
            Kuvat.Hae(Juuri + "iss-cupola-heijastus-" + koko + ".png", t => { if (t != null) heijastus.style.backgroundImage = t; });
        }

        void Heilu(bool paalla)
        {
            heilunta?.Pause();
            heijastus.style.translate = new Translate(0, 0);
            if (!paalla || LinssiUi.VahennettyLiike()) return;
            float t0 = Time.unscaledTime;
            heilunta = heijastus.schedule.Execute(() =>
            {
                float u = (Time.unscaledTime - t0) / 8f * 2f * Mathf.PI;
                heijastus.style.translate = new Translate(3f * Mathf.Sin(u), 2f * Mathf.Sin(u * 0.5f));
            }).Every(33);
        }

        /// <summary>Linssi vaihtui tai suljettiin: kyydin UI pois.</summary>
        public void Pois() { if (Tila != KyydinTila.Kauko) Aseta(KyydinTila.Kauko, 0, 0, false); }
    }
}
