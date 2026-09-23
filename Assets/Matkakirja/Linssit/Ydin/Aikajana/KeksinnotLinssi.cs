// KEKSINTÖLINSSI (web js/linssit/keksinnot.js + js/aikajana.js pysäkkikello).
//
// Avaus: pelin kerrokset piiloon, musiikki pitoon, kamera ensimmäisen pysäkin
// lähikuvaan; esittelylaatikko (Natiivi-UI) käynnistää kellon (Kaynnista).
// Ilman UI:ta sovitin kutsuu Kaynnista-metodia itse.
using System;

namespace Matkakirja.Linssit.Aikajana
{
    public sealed class KeksinnotLinssi : ILinssi
    {
        readonly KeksinnotAineisto aineisto;
        readonly IPysakkiajonNakyma nakyma;
        readonly Func<bool> luentaSoi;
        ILinssiYmparisto y;
        Nakyma talteen;
        double edellinen;

        public Pysakkiajo Ajo { get; private set; }
        public LinssiTiedot Tiedot => aineisto.Tiedot;
        public bool Auki { get; private set; }

        public KeksinnotLinssi(KeksinnotAineisto aineisto, IPysakkiajonNakyma nakyma, Func<bool> luentaSoi = null)
        {
            this.aineisto = aineisto;
            this.nakyma = nakyma;
            this.luentaSoi = luentaSoi;
        }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto;
            Auki = true;
            talteen = y.Kamera;
            edellinen = y.Aika;
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            Ajo = new Pysakkiajo(aineisto.Pysakit, aineisto.Alku, aineisto.Alue, y, nakyma, luentaSoi);
            // Pimeässä ajettu avauskamera (web AVAUS_KAMERA_MS 700).
            Ajo.SovitaAlkuun(700);
        }

        /// <summary>Esittelylaatikon Käynnistä-nappi.</summary>
        public void Kaynnista() => Ajo?.Jatka();

        public void Paivita()
        {
            if (!Auki) return;
            double nyt = y.Aika;
            Ajo.Paivita((nyt - edellinen) * 1000);
            edellinen = nyt;
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Ajo.Tauko();
            y.Pelikerrokset(true);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : 0.9f);
            Ajo = null;
        }
    }
}
