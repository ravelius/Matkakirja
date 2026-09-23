// IHMISEN MATKA -LINSSI (web js/linssit/ihmisen-matka.js + ihmisen-matka-esitys.js).
//
// Avaus: pelin kerrokset piiloon ja musiikki pitoon; värivirrat ja vanat
// lasketaan (sovitin ajaa laskennan taustasäikeessä ja antaa valmiin tuloksen
// Vanat-ominaisuuteen), ja esitys alkaa, kun laskenta on valmis — webissä
// Käynnistä-nappi odottaa samoin (odotaVirtoja). Sulkiessa kamera palaa.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Virrat;

namespace Matkakirja.Linssit.Aikajana
{
    public sealed class IhmisenMatkaLinssi : ILinssi
    {
        public static readonly LinssiTiedot IhmisenMatkaTiedot = new LinssiTiedot
        {
            Id = "ihmisen-matka",
            Nimi = "Ihmisen matka",
            Lyhyt = "Ihmisen matka Afrikasta koko maapallolle: kello juoksee, valot syttyvät.",
            Jarjestys = 26,
        };

        readonly IhmisenMatkaAineisto aineisto;
        readonly IReadOnlyDictionary<string, JaksonLeimat> leimat;
        readonly IEsityksenNakyma nakyma;
        readonly IEsityksenAani aani;
        ILinssiYmparisto y;
        Nakyma talteen;
        List<IReadOnlyList<double[]>> vanat = new List<IReadOnlyList<double[]>>();

        public Esitys Esitys { get; private set; }
        public LinssiTiedot Tiedot { get; }
        public bool Auki { get; private set; }
        /// <summary>Käynnistyykö esitys itse, kun vanat ovat valmiit (ilman UI:n esittelylaatikkoa).</summary>
        public bool Itsestaan = true;

        public IhmisenMatkaLinssi(IhmisenMatkaAineisto aineisto, IReadOnlyDictionary<string, JaksonLeimat> leimat,
            IEsityksenNakyma nakyma, IEsityksenAani aani, LinssiTiedot tiedot = null)
        {
            this.aineisto = aineisto;
            this.leimat = leimat;
            this.nakyma = nakyma;
            this.aani = aani;
            Tiedot = tiedot ?? IhmisenMatkaTiedot;
        }

        /// <summary>
        /// Värivirrat ja vanat aineistosta (puhdas laskenta, ~130 ms Macilla): sovitin
        /// kutsuu tämän taustasäikeessä ja antaa tuloksen Vanat-kutsulla.
        /// </summary>
        public static VanatTulos Laske(VirtaAineisto virrat)
        {
            var maa = Ruudukko.PuraMaamaski(virrat.Maamaski.Juoksut);
            var kentat = VirtaLaskenta.LaskeKentat(virrat, maa);
            return Vanat.JohdaVanat(kentat, virrat.Vanat, maa, pysakit: virrat.Pysakit);
        }

        /// <summary>Lasketut vanat (selkäranka ensin) esityksen kamerarajausta varten.</summary>
        public void AsetaVanat(VanatTulos tulos)
        {
            vanat = tulos.Vanat.Select(v => (IReadOnlyList<double[]>)v.Pisteet.Select(p => new[] { p.Lat, p.Lon, p.Aika }).ToList()).ToList();
            if (Auki && Esitys != null && !Esitys.Kaynnissa && !Esitys.Paattynyt && Itsestaan) Esitys.Aloita();
        }

        public bool VanatValmiit => vanat.Count > 0;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto;
            Auki = true;
            talteen = y.Kamera;
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            Esitys = new Esitys(aineisto.Kertomus, aineisto.Kohteet, leimat, () => vanat, y, nakyma, aani);
            if (VanatValmiit && Itsestaan) Esitys.Aloita();
        }

        /// <summary>Esittelylaatikon Käynnistä-nappi (odottaa vanoja kuten web).</summary>
        public bool Kaynnista()
        {
            if (!VanatValmiit || Esitys == null) return false;
            Esitys.Aloita();
            return true;
        }

        public void Paivita() => Esitys?.Paivita();

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Esitys?.Pura();
            Esitys = null;
            y.Pelikerrokset(true);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : 0.9f);
        }
    }
}
