// TÄHTITAIVAS (Linssiseppä 29.9.2026; omistaja NATIIVI ENSIN, vain natiivi, aluksi kehittäjätilassa; ehdotus
// docs/raportit/natiivi-ensin-linssit-20260929.md kohta 1, ERÄ 1): taivas juuri nyt siitä paikasta, jota pelaaja katsoo
// kartalla. Mukana BSC5-tähdet (1 656, sama aineisto kuin ISS:n kyydissä), Kuu, auringon mukaan vaihtuva taivas (päivä,
// hämärät, yö) ja horisontti ilmansuuntineen. Pelaaja katselee ympärilleen sormella (veto kääntää, nipistys zoomaa).
// Gyro erä 2, tähtikuviot ja planeetat erä 3.
//
//   avaus    paikka = kameran katsekohde, pelin kerrokset ja pallon kosketus pois, oma taivasnäyttämö (Unity: TaivasNayttamo).
//   aika     IssNyt.Kello (sama simuloitu kello kuin kyydissä ja yökartassa); Kelaa(k) nopeuttaa, sulku palauttaa LIVE:n.
//   sulku    näyttämö pois, kerrokset takaisin; kamera ei liikkunut, joten paluuajoa ei tarvita.
using System;

namespace Matkakirja.Linssit.Taivas
{
    /// <summary>Tähtitaivaan Unity-näyttämö (Linssit/Unity/TaivasNayttamo).</summary>
    public interface ITaivaanNakyma
    {
        /// <summary>Näyttämö päälle paikassa (asteina).</summary>
        void Avaa(double lat, double lon);
        /// <summary>Taivas hetkeen jd (juliaaninen päivä, UTC).</summary>
        void Paivita(double jd);
        void Sulje();
    }

    public sealed class TahtitaivasLinssi : ILinssi
    {
        public static readonly LinssiTiedot TahtitaivasTiedot = new LinssiTiedot
        {
            Id = "tahdet",
            Nimi = "Tähtitaivas",
            Lyhyt = "Taivas juuri nyt siitä paikasta, jota katsot kartalla.",
            Jarjestys = 96,
            Ikoni = "<path d=\"M12 2.8l2.2 6.3 6.6.2-5.3 4 1.9 6.4L12 15.9l-5.4 3.8 1.9-6.4-5.3-4 6.6-.2z\"/>",
            Kesken = true,
            Lahde = new Lahde
            {
                Aineisto = "Yale Bright Star Catalogue, 5th Revised Ed. (Hoffleit & Warren 1991); Auringon ja Kuun paikat Meeus, Astronomical Algorithms",
                Lisenssi = "Public domain",
                Osoite = "http://tdc-www.harvard.edu/catalogs/bsc5.html",
                Haettu = "2026-09-28",
            },
        };

        readonly ITaivaanNakyma nakyma;
        ILinssiYmparisto y;

        public TahtitaivasLinssi(ITaivaanNakyma nakyma) { this.nakyma = nakyma; }

        public LinssiTiedot Tiedot => TahtitaivasTiedot;
        public bool Auki { get; private set; }
        /// <summary>Paikka, jonka taivas näytetään (asteina).</summary>
        public double Lat { get; private set; }
        public double Lon { get; private set; }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto ?? throw new ArgumentNullException(nameof(ymparisto));
            Auki = true;
            var k = y.Kamera;
            Lat = Math.Max(-89.9, Math.Min(89.9, k.Lat));
            Lon = k.Lon;
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            nakyma.Avaa(Lat, Lon);
            nakyma.Paivita(Iss.Aika.Jd(Iss.IssNyt.Kello()));
        }

        public void Paivita()
        {
            if (!Auki) return;
            nakyma.Paivita(Iss.Aika.Jd(Iss.IssNyt.Kello()));
        }

        /// <summary>Ajan nopeutus (testikomento taivas kelaa k): 1 = takaisin todelliseen aikaan.</summary>
        public void Kelaa(double kerroin)
        {
            if (!Auki) return;
            Iss.IssNyt.Simu.AsetaNopeus(kerroin, y.VahennettyLiike);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Iss.IssNyt.Simu.PalaaLive(vahennetty: true);
            nakyma.Sulje();
            y.Pelikerrokset(true);
            y.MusiikkiPitoon(false);
        }
    }
}
