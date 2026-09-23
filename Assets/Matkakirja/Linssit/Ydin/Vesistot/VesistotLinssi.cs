// VESISTÖLINSSI (web js/linssit/vesistot.js LINSSI, pallolle).
//
// Maailman joet ja järvet reliefikartan päällä: "vesistö on se, minkä
// topografia selittää — joki laskee sinne minne maa viettää" (omistaja
// 5.8.2026). Siksi pohja on TOPOGRAFIALINSSIN pohja sellaisenaan: sama
// reliefisarja pergamenttilaattojen tilalle, sama odotuspeite, samat
// pelikerrokset piiloon ja sama kameran paluu. Tämä linssi ei kopioi sitä
// kaavaa vaan ajaa sisällään Topografia-olion (samat avaimet, sama testattu
// elinkaari), ja lisää päälle vain oman sisältönsä näkymän kautta:
//   1. järvet (täytetyt kolmioverkot ja tumma reuna),
//   2. penkereet ja uomat (penkereet ensin, jotta tumma reuna ei leikkaa
//      kirkasta uomaa yhtymäkohdissa),
//   3. tärkeimpien jokien nimet (katto 20).
//
// Pallon muunnos lasketaan kerran (VesistotPallolle.Laske) ja jaetaan
// avauskertojen kesken, kuten webin pallomuisti.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Vesistot
{
    /// <summary>Unity-kerros (Linssit/Unity/VesistotKerros) toteuttaa; testeissä vale.</summary>
    public interface IVesistojenNakyma
    {
        /// <summary>Järvet täyttöinä ja reunoina (web polygonit).</summary>
        void Jarvet(IReadOnlyList<Jarvi> jarvet);
        /// <summary>Penkereet ja uomat, penkereet ensin (web polut).</summary>
        void Uomat(IReadOnlyList<Vesipolku> polut);
        /// <summary>Jokien nimet (web merkit 'vesistot-nimet').</summary>
        void Nimet(IReadOnlyList<Vesinimi> nimet);
        /// <summary>Kaikki pois ja kerros puretaan.</summary>
        void Pois();
    }

    public sealed class VesistotLinssi : ILinssi
    {
        readonly VesistotAineisto aineisto;
        readonly IVesistojenNakyma nakyma;
        Topografia pohja;

        /// <summary>Pallon muunnos (laskettu kerran).</summary>
        public VesistotPallolla Pallolla { get; }
        public LinssiTiedot Tiedot => aineisto.Tiedot;
        public bool Auki { get; private set; }
        /// <summary>Mittareille ja testeille: pohjan odotuspeite.</summary>
        public Odotuspeite Peite => pohja?.Peite;

        public VesistotLinssi(VesistotAineisto aineisto, IVesistojenNakyma nakyma, VesistotPallolla pallolla = null)
        {
            this.aineisto = aineisto ?? throw new ArgumentNullException(nameof(aineisto));
            this.nakyma = nakyma;
            Pallolla = pallolla ?? VesistotPallolle.Laske(aineisto);
        }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            Auki = true;
            // Pohja ensin: peite nousee samassa kehyksessä, reliefi pohjan tilalle.
            pohja = new Topografia();
            pohja.Avaa(ymparisto);
            if (nakyma == null) return;
            // Järvet ensin, joet päälle: uoma jatkuu rantaan asti.
            nakyma.Jarvet(Pallolla.Jarvet);
            nakyma.Uomat(Pallolla.Polut);
            if (VesistotPallolle.NimetPallolla && Pallolla.Nimet.Count > 0) nakyma.Nimet(Pallolla.Nimet);
        }

        public void Paivita()
        {
            if (!Auki) return;
            pohja.Paivita();
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            // Vesi pois ennen pohjaa: pohjan sulku ajaa kameran takaisin.
            nakyma?.Pois();
            pohja.Sulje();
        }
    }
}
