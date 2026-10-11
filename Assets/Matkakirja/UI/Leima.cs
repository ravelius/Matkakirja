// TAPAHTUMAKUPLA (Natiivi-UI): webin ui.buildToast / removeToast (.event-toast.stamp). Kartan
// päällä ylhäällä keskellä (top 16 %), tumma kortti vihertävällä reunalla, kukkaroikoni, teksti ja
// alarivi; nousee 0,28 s, pysyy TOAST_MS (1,2 s), häipyy 0,3 s. Kuplat näytetään jonossa.
//
// Rahan muutos (Pelikoodarin PeliOhjain.RahaMuuttui(muutos, syy, saldo)): "+10 puntaa" ja alle syy
// ("Lehden minitehtävä ratkesi"). Jos syy on jo valmis summarivi ("Bussimatka −5 puntaa"), se
// näytetään sellaisenaan. Kolikkoääni tulee Pelikoodarin Aani("coin")-tapahtumasta, ei täältä.
using System.Collections.Generic;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Leima
    {
        const int SisaanMs = 280, NakyvissaMs = 1200, UlosMs = 300;
        static readonly Regex Summa = new Regex(@"£\s*\d+|\d+\s*(?:puntaa|£)");

        readonly VisualElement juuri;
        readonly Queue<(string Teksti, string Ala, string Ikoni, int Ms)> jono = new Queue<(string, string, string, int)>();
        bool naytetaan;

        public Leima(UiKerros ui)
        {
            juuri = Rakenne.El("mk-leimat", ui.Juuri(UiKerros.Matkavalinta), PickingMode.Ignore);
        }

        /// <summary>
        /// Rahan muutos kuplaksi (PeliOhjain.RahaMuuttui). Matkakulu (ruoka ja yöpyminen) näkyy 5 s
        /// (omistaja 11.10.2026, juna 182; Peli/Kukkaro.cs), muut oletusajan.
        /// </summary>
        public void Raha(int muutos, string syy)
        {
            if (muutos == 0) return;
            int ms = Matkakirja.Peli.Kulukertyma.OnMatkakulu(syy) ? Matkakirja.Peli.Kulukertyma.MatkakulunNakyvyysMs : NakyvissaMs;
            if (!string.IsNullOrEmpty(syy) && Summa.IsMatch(syy)) Nayta(syy, null, nakyvissaMs: ms);
            else Nayta((muutos > 0 ? "+" : "−") + "£" + Mathf.Abs(muutos), syy, nakyvissaMs: ms);
        }

        /// <summary>Kupla jonoon (ikoni = Ikonit.Viiva-avain, oletus kukkaro).</summary>
        public void Nayta(string teksti, string ala, string ikoni = "kukkaro", int nakyvissaMs = NakyvissaMs)
        {
            jono.Enqueue((teksti, ala, ikoni, nakyvissaMs));
            if (!naytetaan) Seuraava();
        }

        /*
         * PUNNAN MERKKI LUKU-KIRJASIMELLA (PT 11.10.2026: leiman "−£50" näytti &-merkiltä). Kone-kirjasimen £ on koukku;
         * pilleri (Ylapalkki punta) ja pillerivalikon päivärivi (Linssivalitsin.ValikkoV2 Punta) käyttävät £:lle omaa
         * Luku-kirjasimen tekstiä, joten leima tekee samoin: teksti paloiksi £:n kohdalta riviin. Ilman £:ää yksi teksti kuten ennen.
         * Palan lopun välilyönti ei mitoitu, joten väli £:n eteen tulee luokasta mk-leima__punta--vali.
         */
        static void TekstiPunnalla(string teksti, string luokka, VisualElement isa, Kirjasin kirjasin)
        {
            if (teksti.IndexOf('£') < 0) { Kirjasimet.Aseta(Rakenne.Teksti(teksti, luokka, isa), kirjasin); return; }
            var rivi = Rakenne.El("mk-leima__rivi", isa, PickingMode.Ignore);
            var osat = teksti.Split('£');
            for (int i = 0; i < osat.Length; i++)
            {
                if (i > 0)
                {
                    var p = Kirjasimet.Aseta(Rakenne.Teksti("£", luokka, rivi), Kirjasin.Luku);
                    p.AddToClassList("mk-leima__punta");
                    if (osat[i - 1].EndsWith(" ")) p.AddToClassList("mk-leima__punta--vali");
                }
                var pala = osat[i].TrimEnd(' ');
                if (pala.Length > 0) Kirjasimet.Aseta(Rakenne.Teksti(pala, luokka, rivi), kirjasin);
            }
        }

        void Seuraava()
        {
            if (jono.Count == 0) { naytetaan = false; return; }
            naytetaan = true;
            var (teksti, ala, ikoni, ms) = jono.Dequeue();
            var kupla = Rakenne.El("mk-leima", juuri, PickingMode.Ignore);
            if (ikoni != null && Ikonit.Viiva.TryGetValue(ikoni, out var merkinta)) Rakenne.Ikoni(merkinta, "mk-leima__ikoni", kupla);
            var tekstit = Rakenne.El("mk-leima__tekstit", kupla, PickingMode.Ignore);
            TekstiPunnalla(teksti, "mk-leima__teksti", tekstit, Kirjasin.KoneLihava);
            if (!string.IsNullOrEmpty(ala)) TekstiPunnalla(ala, "mk-leima__ala", tekstit, Kirjasin.Kone);
            kupla.schedule.Execute(() => kupla.AddToClassList("mk-auki")).StartingIn(16);
            kupla.schedule.Execute(() => { kupla.RemoveFromClassList("mk-auki"); kupla.AddToClassList("mk-leima--lahtee"); })
                .StartingIn(SisaanMs + ms);
            kupla.schedule.Execute(() => { kupla.RemoveFromHierarchy(); Seuraava(); }).StartingIn(SisaanMs + ms + UlosMs);
        }
    }
}
