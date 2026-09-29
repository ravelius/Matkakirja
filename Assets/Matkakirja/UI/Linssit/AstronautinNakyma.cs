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
//   KyytiKasittelija   ISS:n kyyti (IssKyytiNakyma): tietorivi, ✕ ja ikkunassa Cupola-kehys; avaruuskävely
//                      (AvaruuskavelyNakyma) kyydin päällä.
//   Taulu              Pulun taulu (PulunTauluNakyma, web #3590): moodit Pulun napautuksesta.
// Linssin ollessa auki pulu on astronautti (LinssiUi asettaa Pulu.Astronautti).
using System;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
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
        public readonly IssKyytiNakyma Kyyti;
        public readonly AvaruuskavelyNakyma Kavely;
        /// <summary>Pulun taulu (web #3590): linssin moodit, Kysy Pululta ja ilman Pulua Näkymät-nappi.</summary>
        public readonly PulunTauluNakyma Taulu;
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
            Kyyti = new IssKyytiNakyma(kerros);
            // Kyydin ✕ on linssin sulkunapin paikalla, joten sulkunappi piiloon kuten kuvanäkymässä.
            Kyyti.AukiMuuttui += auki => KuvaAuki?.Invoke(auki);
            // Avaruuskävely (29.9.): paikkamerkit ja vertailukortti kyydin päällä.
            Kavely = new AvaruuskavelyNakyma(kerros);
            Kyyti.AukiMuuttui += Kavely.Kyydissa;
            // Taulu kuvanäkymän ja kyydin päälle (web z-index 50 > kyydin kosketuskerros 48).
            Taulu = new PulunTauluNakyma(kerros, this);
            // Avaruuskävely Pulun taulusta (Päätoimittaja 29.9.): rivi ISS-rivien jälkeen; valinta vie ensin seurantaan (kuva kiinni,
            // kyytiin) ja aloittaa kävelyn perillä.
            Taulu.LisaaRivi("avaruuskavely", "Avaruuskävely", "Ulos kaiteelle katsomaan auringonnousua",
                () => AstroLinssi()?.Kavely?.Kaynnissa == true, () => { AstroLinssi()?.AloitaKavely(); }, AstroMoodi.Seuranta);
            // Laite 29.9. kavely1: linssin avauksen automaattitaulu jäi auki kävelyn päälle (kehittäjäkomennolla aloitettu).
            Kavely.Alkoi += () => { if (Taulu.Auki) Taulu.Sulje("avaruuskavely"); };
            // PULU KYYDIN PÄÄLLÄ (web body.satelliitti-kyyti .pollo-nappi z-index 49 > kyydin kerros 48): Cupola-kehys peitti
            // Pulun, joka on taulun avaaja kaikissa moodeissa. Kyydin ajaksi Pulun kerros nousee kehyksen yläpuolelle.
            // Cupolassa (Ikkuna) Pulu on ulkona avaruuskävelyllä ikkunan aukossa (omistaja 29.9.2026), joten kerros pysyy kehyksen
            // alla ja lasi, heijastus ja pölyt piirtyvät sen päälle; Cupolan läpinäkyvät osat päästävät napautuksen Puluun.
            Kyyti.TilaMuuttui += tila => kerros.AsetaJarjestys(Pulu.Kerros,
                tila != KyydinTila.Kauko && tila != KyydinTila.Ikkuna ? LinssiUi.SulkuKerros : Pulu.Kerros);

            AstronauttiKerros.AvausKasittelija = Avaus;
            AstronauttiKerros.KuvaKasittelija = (kohde, indeksi) =>
            {
                if (kohde == null) Kuva.Sulje(false);
                else Kuva.Avaa(kohde, indeksi);
            };
            AstronauttiKerros.SumuKasittelija = Sumu.Aseta;
            AstronauttiKerros.KyytiKasittelija = Kyyti.Aseta;
        }

        static AstronauttiLinssi AstroLinssi() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

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
            Taulu.LinssiVaihtui(astronauttiAuki);
            if (astronauttiAuki) return;
            if (Vaihe != AvauksenVaihe.Pois) Avaus(AvauksenVaihe.Pois);
            Sumu.Aseta(0);
            Kuva.Sulje(false);
            Kyyti.Pois();
            Kavely.Kyydissa(false);
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
