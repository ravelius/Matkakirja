// YÖKARTTA (Linssiseppä 29.9.2026; omistaja NATIIVI ENSIN, Raamattu 47f3bcf3f: vain natiivi, aluksi kehittäjätilassa;
// ehdotus docs/raportit/natiivi-ensin-linssit-20260929.md kohta 2): maapallo yöllä. Kaupunkien valot (NASA Black Marble)
// hehkuvat HDR:nä, ja yö- ja päiväpuolen raja kulkee todellisesta auringosta (Iss.Aurinko, Meeus). Valot syttyvät
// hämäräkaistassa ja päiväpuoli on varjostettu kuten ISS:n kyydissä (Unity: Yokuori-kuori, sama varjostin).
//
//   avaus    pelin kerrokset pois, maastoreliefi pohjaksi (sama sarja kuin Astronautin kamerassa), kamera koko pallon
//            etäisyydelle iltaterminaattorin ylle pelaajan leveydellä (aurinko laskee siellä juuri nyt), zoomikaista 1,3 ×
//            koko pallo, musiikki pitoon.
//   aika     todellinen (IssNyt.Kello, sama simuloitu kello kuin kyydissä); Kelaa(k) nopeuttaa (testikomento yo kelaa k),
//            sulku palauttaa LIVE:n.
//   sulku    kerrokset ja pohja takaisin, zoomikaista pois, kamera pehmeästi lähtöasentoon (KAMERA-AJOT, omistaja 24.9.).
using System;

namespace Matkakirja.Linssit.Yokartta
{
    /// <summary>Yökartan Unity-näkymä (Linssit/Unity/YokarttaKerros): yökuori näkyviin ja pois.</summary>
    public interface IYokartanNakyma
    {
        void Nayta(bool nakyvissa);
    }

    public sealed class YokarttaLinssi : ILinssi
    {
        public const string Kerros = "yokartta";
        /// <summary>Kameran etäisyys avauksessa koko pallon korkeuden osuutena: pallo täyttää ruudun, reuna näkyy.</summary>
        public const double AvausOsuus = 0.9;
        /// <summary>Loitonnuksen katto koko pallon korkeuden kertoimena (sama kuin Astronautin kamerassa).</summary>
        public const double ZoominKauin = 1.3;
        /// <summary>Avausajo (s) ja paluuajo sulkiessa (s).</summary>
        public const float AvausAjoS = 1.8f, PaluuAjoS = 1.6f;
        /// <summary>Kameran leveys rajataan, ettei napa jää keskelle (kuten Astronautin kamerassa).</summary>
        public const double LeveysRaja = 55;

        public static readonly LinssiTiedot YokarttaTiedot = new LinssiTiedot
        {
            Id = "yokartta",
            Nimi = "Yökartta",
            Lyhyt = "Maapallo yöllä: kaupunkien valot ja päivän raja juuri nyt.",
            Jarjestys = 95,
            Ikoni = "<path d=\"M15.5 3.5a8.5 8.5 0 1 0 5 15.4A9 9 0 0 1 15.5 3.5z\"/>",
            Kesken = true,
            Lahde = new Lahde
            {
                Aineisto = "NASA Earth Observatory, Black Marble (Earth at Night); auringon paikka Meeus, Astronomical Algorithms",
                Lisenssi = "Public domain (NASA)",
                Osoite = "https://earthobservatory.nasa.gov/features/NightLights",
                Haettu = "2026-09-28",
            },
        };

        readonly IYokartanNakyma nakyma;
        ILinssiYmparisto y;
        Nakyma talteen;

        public YokarttaLinssi(IYokartanNakyma nakyma) { this.nakyma = nakyma; }

        public LinssiTiedot Tiedot => YokarttaTiedot;
        public bool Auki { get; private set; }

        /// <summary>Iltaterminaattorin piste leveydellä lat hetkellä utc: aurinko laskee siellä nyt (alihajapisteestä 90° itään).</summary>
        public static (double Lat, double Lon) Iltaraja(DateTime utc, double lat)
        {
            Iss.Aurinko.Alihajapiste(Iss.Aika.Jd(utc), out double sLat, out double sLon);
            // Pallolla terminaattori on 90° alihajapisteestä; leveydellä lat pituusero cos(Δλ) = −tan(lat)·tan(δ).
            double d = sLat * Math.PI / 180, l = Math.Max(-LeveysRaja, Math.Min(LeveysRaja, lat)) * Math.PI / 180;
            double c = Math.Max(-1, Math.Min(1, -Math.Tan(l) * Math.Tan(d)));
            double dLon = Math.Acos(c) * 180 / Math.PI;
            double lon = ((sLon + dLon) + 540) % 360 - 180;
            return (l * 180 / Math.PI, lon);
        }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto ?? throw new ArgumentNullException(nameof(ymparisto));
            Auki = true;
            talteen = y.Kamera;
            y.Kerrokset.LisaaRasteri(Kerros, new Rasteri
            {
                Url = Astronautti.AstronauttiLinssi.ReliefinSarja(), Projektio = Projektio.WebMercator,
                MinTaso = 0, MaxTaso = Topografia.ReliefiMaxTaso, Alfa = 1f,
            });
            y.Kerrokset.Nakyvyys(Topografia.Pohja, false);
            y.Pelikerrokset(false);
            foreach (var k in new[] { "reitit", "napakannet" }) y.Kerrokset.Nakyvyys(k, false);
            double koko = y.KokoPallonKorkeus;
            y.ZoomiKatto(koko * ZoominKauin);
            y.MusiikkiPitoon(true);
            nakyma.Nayta(true);
            // Pelaajan kartan leveydellä (kamera on pelaajan seudulla).
            var raja = Iltaraja(Iss.IssNyt.Kello(), talteen.Lat);
            y.AjaKamera(new Nakyma(raja.Lat, raja.Lon, koko * AvausOsuus), y.VahennettyLiike ? 0f : AvausAjoS,
                Kamera.Kamerakayrat.Pehmea);
        }

        public void Paivita() { }

        /// <summary>Ajan nopeutus (testikomento yo kelaa k): 1 = takaisin todelliseen aikaan.</summary>
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
            nakyma.Nayta(false);
            y.Kerrokset.Poista(Kerros);
            y.Kerrokset.Nakyvyys(Topografia.Pohja, true);
            foreach (var k in new[] { "reitit", "napakannet" }) y.Kerrokset.Nakyvyys(k, true);
            y.Pelikerrokset(true);
            y.ZoomiKatto(null);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : PaluuAjoS,
                Kamera.Kamerakayrat.Funktio(Kamera.Kayra.Kuminauha, Kamera.Kamerakayrat.PaluunYlitys));
        }
    }
}
