// ASTRONAUTIN KAMERAN UI (Natiivi-UI): AstronauttiKerroksen koukut.
//
//   AvausKasittelija   webin luoPaljastus (js/linssit/satelliitti-avaruus.js):
//                      musta ruutu, jonka keskellä pelin oma otsikkokortti
//                      "ASTRONAUTIN KAMERA", 3,2 rem:n viiva ja "kuvat: NASA"
//                      (NASAn tunnusta ei käytetä). Vaiheet: Musta → OtsikkoPois
//                      (otsikko häipyy 700 ms) → MustaPois (musta häipyy 1100 ms,
//                      kosketukset läpi) → Pois. Musta ottaa kosketukset, jottei
//                      näkymätöntä palloa pyöritetä; linssin ✕ on sen päällä.
//   KuvaKasittelija    astronautin valokuva (Kuvanakyma); (null, −1) sulkee.
//   SumuKasittelija    avaruussumu (Avaruussumu): kaksi ajelehtivaa harsoa.
// Linssin ollessa auki pulu on astronautti (LinssiUi asettaa Pulu.Astronautti).
using System;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AstronautinNakyma
    {
        public const int OtsikonHaivytysMs = (int)AstronauttiLinssi.OtsikonHaivytysMs;
        public const int MustanHaivytysMs = (int)AstronauttiLinssi.MustanHaivytysMs;

        readonly VisualElement musta, otsikko;
        public readonly Kuvanakyma Kuva;
        public readonly Avaruussumu Sumu;
        IVisualElementScheduledItem piilotus;

        public AvauksenVaihe Vaihe { get; private set; } = AvauksenVaihe.Pois;

        /// <summary>Kuvanäkymä auki/kiinni (LinssiUi piilottaa linssin sulkunapin sen ajaksi).</summary>
        public event Action<bool> KuvaAuki;

        public AstronautinNakyma(UiKerros kerros)
        {
            musta = Rakenne.El("mk-astroavaus", kerros.Juuri(LinssiUi.Ylakerros));
            musta.style.display = DisplayStyle.None;
            otsikko = Rakenne.El("mk-astroavaus__otsikko", musta, PickingMode.Ignore);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            var nimi = Rakenne.Teksti("ASTRONAUTIN KAMERA", "mk-astroavaus__nimi", otsikko);
            Kirjasimet.Aseta(nimi, Kirjasin.KoneLihava);
            Rakenne.El("mk-astroavaus__viiva", otsikko, PickingMode.Ignore);
            Rakenne.Teksti("kuvat: NASA", "mk-astroavaus__lahde", otsikko);

            Kuva = new Kuvanakyma(kerros);
            Kuva.AukiMuuttui += auki => KuvaAuki?.Invoke(auki);
            Sumu = new Avaruussumu(kerros);

            AstronauttiKerros.AvausKasittelija = Avaus;
            AstronauttiKerros.KuvaKasittelija = (kohde, indeksi) =>
            {
                if (kohde == null) Kuva.Sulje(false);
                else Kuva.Avaa(kohde, indeksi);
            };
            AstronauttiKerros.SumuKasittelija = Sumu.Aseta;
        }

        /// <summary>AstronauttiKerros.AvausKasittelija: avauksen vaihe.</summary>
        public void Avaus(AvauksenVaihe vaihe)
        {
            Vaihe = vaihe;
            piilotus?.Pause();
            switch (vaihe)
            {
                case AvauksenVaihe.Musta:
                    musta.RemoveFromClassList("mk-astroavaus--haipyy");
                    otsikko.RemoveFromClassList("mk-astroavaus__otsikko--haipyy");
                    musta.style.opacity = 1f;
                    otsikko.style.opacity = 1f;
                    musta.pickingMode = PickingMode.Position;
                    musta.style.display = DisplayStyle.Flex;
                    break;
                case AvauksenVaihe.OtsikkoPois:
                    musta.style.display = DisplayStyle.Flex;
                    otsikko.AddToClassList("mk-astroavaus__otsikko--haipyy");
                    otsikko.style.opacity = 0f;
                    break;
                case AvauksenVaihe.MustaPois:
                    musta.style.display = DisplayStyle.Flex;
                    otsikko.style.opacity = 0f;
                    musta.pickingMode = PickingMode.Ignore;
                    musta.AddToClassList("mk-astroavaus--haipyy");
                    musta.style.opacity = 0f;
                    // Varmistus, jos Pois-vaihetta ei tule (linssi suljetaan kesken).
                    piilotus = musta.schedule.Execute(() => { if (Vaihe == AvauksenVaihe.MustaPois) musta.style.display = DisplayStyle.None; })
                        .StartingIn(MustanHaivytysMs + 200);
                    break;
                default:
                    musta.pickingMode = PickingMode.Ignore;
                    musta.style.display = DisplayStyle.None;
                    break;
            }
        }

        /// <summary>Linssi vaihtui: muu kuin astronautti siivoaa jäljet (koukut eivät ehkä ehtineet).</summary>
        public void Vaihtui(bool astronauttiAuki)
        {
            if (astronauttiAuki) return;
            if (Vaihe != AvauksenVaihe.Pois) Avaus(AvauksenVaihe.Pois);
            Sumu.Aseta(0);
            Kuva.Sulje(false);
        }

        // --- testit ----------------------------------------------------------------------

        /// <summary>Testikomento: koko avaus oikeassa ajassa (musta 2 s, sitten häivytykset).</summary>
        public void TestaaAvaus()
        {
            Avaus(AvauksenVaihe.Musta);
            musta.schedule.Execute(() => Avaus(AvauksenVaihe.OtsikkoPois)).StartingIn(2000);
            musta.schedule.Execute(() => Avaus(AvauksenVaihe.MustaPois)).StartingIn(2000 + OtsikonHaivytysMs);
            musta.schedule.Execute(() => Avaus(AvauksenVaihe.Pois)).StartingIn(2000 + OtsikonHaivytysMs + MustanHaivytysMs + 50);
        }
    }
}
