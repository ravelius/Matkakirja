// AARRELASKURI (Natiivi-UI; omistaja 11.10.2026 klo 13.4x–13.5x Päätoimittajan kautta, juna 182): kartan yläreunan keskelle
// "Etsityt kaupungit X/50", X = pelaajan avaamat aarteet Euroopassa (Laattamaailma.AvatutAarteet("europe")), 50 = Euroopan
// aarrekaupungit. Tyyli: olemassa oleva päivälaskuri (Pelikellonaytto: mk-pelikello -lasipilleri ja mk-pelikello__paiva
// -kapiteeli, isoin kirjaimin kuten "PÄIVÄ 1/80"); ei uusia tyylejä.
//
// Paikka: yläpalkin alle 8 pt (kuten karttaselite), vaakasuunnassa keskelle; palkin ollessa piilossa (vaaka, iPhonen veto)
// turva-alueen yläreunaan. Näkyy pelin karttatilassa; linssin, aloitusnäkymän ja valikon aikana piilossa.
// Luku tarkistetaan puolen sekunnin välein, piirto vain luvun vaihtuessa.
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Aarrelaskuri
    {
        /// <summary>Euroopan aarrekaupungit (omistaja 11.10.2026).</summary>
        public const int EuroopanAarrekaupungit = 50;
        const string Manner = "europe";
        const float Ylavara = 8f;

        readonly VisualElement juuri;
        readonly Label rivi;
        int naytetty = -1;

        public Aarrelaskuri(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-pelikello", kerros.Turva(UiKerros.Tilarivi), PickingMode.Ignore);
            juuri.name = "aarrelaskuri";
            juuri.style.left = Length.Percent(50);
            juuri.style.translate = new Translate(Length.Percent(-50), 0);
            rivi = Rakenne.Teksti("", "mk-pelikello__paiva", juuri);
            Kirjasimet.Aseta(rivi, Kirjasin.Kone);
            juuri.style.display = DisplayStyle.None;
            juuri.schedule.Execute(Paivita).Every(500);
        }

        /// <summary>Testikomento: näkyykö ja mitä.</summary>
        public string Kuvaus => (juuri.style.display == DisplayStyle.Flex ? "näkyy " : "piilossa ") + rivi.text;

        static bool Sallittu()
        {
            if (!UiNakymat.Olemassa) return false;
            var ui = UiNakymat.Hae();
            var o = PeliOhjain.Instanssi;
            return o != null && o.Kaytossa && o.Matka != null && o.Tila == SilmukanTila.Kartta && ui.Linssit?.Auki == null
                   && !Aloitusnakyma.AloitusAuki && !ui.Valikko.Auki;
        }

        void Paivita()
        {
            bool nayta = Sallittu();
            var tila = nayta ? DisplayStyle.Flex : DisplayStyle.None;
            if (juuri.style.display != tila) { juuri.style.display = tila; Ruudunpaivitys.Herata(0.1f); }
            if (!nayta) return;
            float yla = (Ylapalkki.PalkkiPiilossa ? 0f : Ylapalkki.Varaus) + Ylavara;
            if (juuri.resolvedStyle.top != yla) juuri.style.top = yla;
            int x = PeliOhjain.Instanssi.Matka.Laatat?.AvatutAarteet(Manner) ?? 0;
            if (x == naytetty) return;
            naytetty = x;
            rivi.text = Kieli.T("ui.aarrelaskuri", x, EuroopanAarrekaupungit).ToUpperInvariant();
            Ruudunpaivitys.Herata(0.1f);
        }
    }
}
