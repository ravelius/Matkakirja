// IHMISEN MATKA II: KAMERAN KÄÄRE (erä 5, vapaat kädet). Esitys (Linssit.Ydin) ajaa kameraa ILinssiYmpariston kautta
// täsmälleen kuten I:ssä; II antaa sille tämän kääreen, joka välittää kaiken sellaisenaan paitsi kamera-ajot:
//
//   KALLISTETUT LÄHIKUVAT: tarinan kohteen lähikuvissa (kohde alle LahikuvanKattoKm) kamera kallistuu (Kallistus°), jolloin
//   natiivin korostettu maasto (Rift-laakso, Levantin vuoret, Altai, Andit) nousee näkyviin — webissä kallistusta ei ole,
//   natiivissa se on yksi syy koko siirtoon (Raamattu NATIIVI PELI ETUSIJALLE: korkeuserot, kallistus, kamera-ajot).
//   Laajat ja avaruuden kuvat ajetaan suoraksi (0°), ettei kallistus jää roikkumaan loitonnuksessa.
//   Vähennetty liike: kääre ei kallista.
using System;
using Matkakirja.Linssit;

namespace Matkakirja.Natiivi
{
    public sealed class IhmisenMatka2Ymparisto : ILinssiYmparisto
    {
        /// <summary>Lähikuvan kallistus (astetta); PalloKierto rajaa sen korkeuden ja horisonttiusvan mukaan.</summary>
        public const double Kallistus = 24.0;
        /// <summary>Tätä matalammat kohteet ovat lähikuvia (km).</summary>
        public const double LahikuvanKattoKm = 4500.0;

        readonly ILinssiYmparisto y;

        /// <summary>Kallistetaanko (pois linssin sulkeutuessa: kamera palaa pelaajan omaan näkymään sellaisenaan).</summary>
        public bool Kallista = true;

        public IhmisenMatka2Ymparisto(ILinssiYmparisto sisempi) { y = sisempi ?? throw new ArgumentNullException(nameof(sisempi)); }

        public IKarttaKerrokset Kerrokset => y.Kerrokset;
        public Nakyma Kamera => y.Kamera;

        public void AjaKamera(Nakyma kohde, float kestoS, Func<double, double> pehmennys = null, double? kallistukseen = null)
        {
            if (Kallista && kallistukseen == null && !y.VahennettyLiike)
                kallistukseen = kohde.Korkeus <= LahikuvanKattoKm * 1000.0 ? Kallistus : 0.0;
            y.AjaKamera(kohde, kestoS, pehmennys, kallistukseen);
        }

        public void ZoomiKatto(double? maxKorkeus) => y.ZoomiKatto(maxKorkeus);
        public void KameraAvaruuteen(double lat, double lon, double pallonSateita) => y.KameraAvaruuteen(lat, lon, pallonSateita);
        public double KokoPallonKorkeus => y.KokoPallonKorkeus;
        public double KorkeusLeveydelle(double leveysAsteina) => y.KorkeusLeveydelle(leveysAsteina);
        public double Kuvasuhde => y.Kuvasuhde;
        public double Nakokulma => y.Nakokulma;
        public void Pelikerrokset(bool nakyvissa) => y.Pelikerrokset(nakyvissa);
        public void Peite(bool paalla) => y.Peite(paalla);
        public void MusiikkiPitoon(bool pidossa) => y.MusiikkiPitoon(pidossa);
        public void LinssiMusiikki(string laji) => y.LinssiMusiikki(laji);
        public void LinssiMusiikkiHimmennys(double taso) => y.LinssiMusiikkiHimmennys(taso);
        public bool VahennettyLiike => y.VahennettyLiike;
        public double Aika => y.Aika;
    }
}
