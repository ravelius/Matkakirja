// AARRELASKURI (Natiivi-UI; omistaja 11.10.2026 klo 13.4x–13.5x Päätoimittajan kautta, juna 182): kartan yläreunan keskelle
// "Etsityt kaupungit X/N", X = pelaajan avaamat aarteet Euroopassa (Laattamaailma.AvatutAarteet("europe")), N = tämän pelin
// Euroopan kaupungit, joissa on aarrelaatta (AarrekaupungitYhteensa, yleensä 50; PT 11.10.: X ≤ N, jotta N/N on saavutettavissa).
// Tyyli: olemassa oleva päivälaskuri (Pelikellonaytto: mk-pelikello -lasipilleri ja sen kellorivi mk-pelikello__kello); ei uusia
// tyylejä. Kapiteelirivin (mk-pelikello__paiva) harvennus levitti pitkän tekstin koko leveydelle (simuajo f6d9b3ab).
//
// Paikka: yläpalkin alle 8 pt (kuten karttaselite), vaakasuunnassa keskelle; palkin ollessa piilossa (vaaka, iPhonen veto)
// turva-alueen yläreunaan. Matkakirjan lappu on samassa kohdassa, joten laskuri asettuu lapun alle 6 pt; auki oleva
// matkakirja (luenta) peittää yläosan, ja laskuri on silloin piilossa (simuajo 760f067f: laskuri lapun päällä).
// Näkyy pelin karttatilassa; linssin, aloitusnäkymän ja valikon aikana piilossa.
// Luku tarkistetaan puolen sekunnin välein, piirto vain luvun vaihtuessa.
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Aarrelaskuri
    {
        const string Manner = "europe";
        const float Ylavara = 8f, LapunVali = 6f;

        readonly VisualElement juuri;
        readonly Label rivi;
        int naytetty = -1, naytettyN = -1;

        public Aarrelaskuri(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-pelikello", kerros.Turva(UiKerros.Tilarivi), PickingMode.Ignore);
            juuri.name = "aarrelaskuri";
            juuri.style.left = Length.Percent(50);
            juuri.style.translate = new Translate(Length.Percent(-50), 0);
            rivi = Rakenne.Teksti("", "mk-pelikello__kello", juuri);
            Kirjasimet.Aseta(rivi, Kirjasin.KoneBold);
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
                   && !Aloitusnakyma.AloitusAuki && !ui.Valikko.Auki && (!ui.Matkakirja.Nakyy || ui.Matkakirja.Lappuna);
        }

        void Paivita()
        {
            bool nayta = Sallittu();
            var tila = nayta ? DisplayStyle.Flex : DisplayStyle.None;
            if (juuri.style.display != tila) { juuri.style.display = tila; Ruudunpaivitys.Herata(0.1f); }
            if (!nayta) return;
            float yla = (Ylapalkki.PalkkiPiilossa ? 0f : Ylapalkki.Varaus) + Ylavara;
            var mk = UiNakymat.Hae().Matkakirja;
            if (mk.Lappuna && juuri.parent != null)
            {
                var lappu = mk.Rajat;
                if (lappu.width > 0) yla = Mathf.Max(yla, juuri.parent.WorldToLocal(new Vector2(lappu.xMin, lappu.yMax)).y + LapunVali);
            }
            if (juuri.resolvedStyle.top != yla) juuri.style.top = yla;
            var laatat = PeliOhjain.Instanssi.Matka.Laatat;
            int x = laatat?.AvatutAarteet(Manner) ?? 0, n = laatat?.AarrekaupungitYhteensa(Manner) ?? 0;
            if (x == naytetty && n == naytettyN) return;
            naytetty = x; naytettyN = n;
            rivi.text = Kieli.T("ui.aarrelaskuri", x, n);
            Ruudunpaivitys.Herata(0.1f);
        }
    }
}
