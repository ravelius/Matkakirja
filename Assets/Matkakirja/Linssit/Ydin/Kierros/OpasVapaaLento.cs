// OPPAAN VAPAA TILA (omistaja 6.10.2026 klo 16.5x Päätoimittajan kautta: "Silloin voisin vapaasti kiertää kaupunkia edelleen niillä
// joystick-säätimillä … kun nyt ei olekaan mitään kiinteää kohdetta, minkä ympärillä kamera pyörisi"; juna 152; Päätoimittaja
// hyväksyi suosituksen). Kierroksen ■ jälkeen (OpasSilmukka.VapaaTila, LS1) pelaaja lentää kaupungissa tapeilla:
//   vasen tappi   ↕ eteen/taakse katsesuunnan mukaan, ↔ sivuttain (strafe)
//   oikea tappi   ↔ kääntää katsetta paikallaan (kamera pysyy, näkymä kääntyy), ↕ nousee/laskee suoraan ylös/alas
//   kallistus     korkeuden mukaan automaattisesti: matalalla lähes vaakaan (78°), ylhäällä jyrkemmin alas (54° 10 km:ssä)
//   nopeus        verrannollinen korkeuteen pinnasta (0,6 × korkeus / s täydellä tapilla), pehmeä kiihdytys ja hiipuma
//   pinta         vähintään MinKorkeusM 3D-laattojen pinnan (rakennukset mukana: OpasSovitin SampleHeightMostDetailed) yläpuolella
//                 kamerassa ja EnnakkoS:n päässä liikkeen suunnassa (Päätoimittaja: ei läpi korkeista rakennuksista); enintään MaxKorkeusM
// Tila: kameran alapiste, absoluuttinen korkeus (ellipsoidi), suunta; ulos Kuvakulma PalloKierto.Kuvaa-muodossa (katsepiste
// kallistuksen suunnassa pinnalla). Pinnan näyte voi puuttua (NaN): silloin viimeisin tunnettu. Puhdas C#: Linssit-testit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class OpasVapaaLento
    {
        public const double NopeusKerroin = 0.6, NousuKerroin = 0.8, KaantoAstS = 55, SyoteAikaS = 0.2, HiipumaAikaS = 0.5, KuollutAlue = 0.12;
        public const double MinKorkeusM = 40, MaxKorkeusM = 12000, MinNopeusMS = 15, EnnakkoS = 0.6, NostoAikaS = 0.25;
        /// <summary>
        /// Naapuruston näytteet (Päätoimittaja 6.10.: Eiffel-tornin ristikko läpäisi pistenäytteen): kaksi kehää kameran ympärillä
        /// (20 ja 45 m, kummassakin 8 suuntaa); pinnaksi suurin tunnettu korkeus kamerasta, ennakosta ja kehiltä.
        /// </summary>
        public static readonly double[] KehaSateet = { 20, 45 };
        public const int KehaSuuntia = 8;
        /// <summary>Kehän piste i (0 … KehaSateet.Length · KehaSuuntia − 1) kameran ympäriltä.</summary>
        public (double lat, double lon) KehaPiste(int i)
        {
            int r = (i / KehaSuuntia) % KehaSateet.Length, s = i % KehaSuuntia;
            return Siirra(Lat, Lon, s * 360.0 / KehaSuuntia + (r % 2) * 22.5, KehaSateet[r]);
        }
        public static int KehaPisteita => KehaSateet.Length * KehaSuuntia;

        public double Lat { get; private set; }
        public double Lon { get; private set; }
        /// <summary>Kameran korkeus ellipsoidista (m).</summary>
        public double KorkeusAbsM { get; private set; }
        /// <summary>Viimeisin tunnettu pinnan korkeus kameran alla ja edessä (suurempi).</summary>
        public double PintaM { get; private set; }
        /// <summary>Korkeus pinnasta (nopeus ja kallistus).</summary>
        public double KorkeusM => Math.Max(MinKorkeusM, KorkeusAbsM - PintaM);
        public double Suunta { get; private set; }
        public double Kallistus => KallistusKorkeudelle(KorkeusM);
        double vEteen, vSivu, vNousu, vKaanto;

        /// <summary>Kallistus korkeuden mukaan: 100 m → 78°, 1 km → 66°, 10 km → 54° (log-asteikko, rajat 50…80).</summary>
        public static double KallistusKorkeudelle(double korkeusM) =>
            Math.Max(50, Math.Min(80, 78 - 12 * Math.Log10(Math.Max(1, korkeusM) / 100)));

        /// <summary>Pisteet, joiden pinnan korkeus tarvitaan (kamera ja ennakko); sovitin pyytää näytteet.</summary>
        public (double lat, double lon) Ennakko
        {
            get { var (la, lo) = Siirra(Lat, Lon, Suunta, vEteen * EnnakkoS); return Siirra(la, lo, Suunta + 90, vSivu * EnnakkoS); }
        }

        /// <summary>Aloitus nykyisestä asennosta (kierroksen viimeinen kehys): kameran paikka katsepisteestä taaksepäin.</summary>
        public void Aloita(Kuvakulma a, Func<double, double, double> pinta)
        {
            double k = a.Kallistus * Math.PI / 180;
            (Lat, Lon) = Siirra(a.Lat, a.Lon, a.Suuntima + 180, a.EtaisyysM * Math.Sin(k));
            KorkeusAbsM = a.KatseKorkeusM + a.EtaisyysM * Math.Cos(k);
            PintaM = Pinta(pinta, Lat, Lon, a.KatseKorkeusM);
            KorkeusAbsM = Math.Max(PintaM + MinKorkeusM, Math.Min(PintaM + MaxKorkeusM, KorkeusAbsM));
            Suunta = KierrosLento.Kiedo(a.Suuntima);
            vEteen = vSivu = vNousu = vKaanto = 0;
        }

        /// <summary>
        /// Kerran kehyksessä: vasen (x sivulle +oikea, y eteen +), oikea (x kääntö +oikealle, y nousu +ylös), −1…1. pinta(lat, lon) =
        /// 3D-pinnan korkeus ellipsoidista (rakennukset mukana) tai NaN. Palauttaa kameran Kuvakulman.
        /// </summary>
        public Kuvakulma Paivita(double dt, double vasenX, double vasenY, double oikeaX, double oikeaY, Func<double, double, double> pinta)
        {
            dt = Math.Max(0, Math.Min(0.1, dt));
            double K(double x) { x = Math.Max(-1, Math.Min(1, x)); return Math.Abs(x) < KuollutAlue ? 0 : Math.Sign(x) * (Math.Abs(x) - KuollutAlue) / (1 - KuollutAlue); }
            double eteen = K(vasenY), sivu = K(vasenX), kaanto = K(oikeaX), nousu = K(oikeaY);
            bool syote = eteen != 0 || sivu != 0 || kaanto != 0 || nousu != 0;
            double a = 1 - Math.Exp(-dt / (syote ? SyoteAikaS : HiipumaAikaS));
            double v = Math.Max(MinNopeusMS, NopeusKerroin * KorkeusM);
            vEteen += (eteen * v - vEteen) * a;
            vSivu += (sivu * v - vSivu) * a;
            vNousu += (nousu * Math.Max(MinNopeusMS, NousuKerroin * KorkeusM) - vNousu) * a;
            vKaanto += (kaanto * KaantoAstS - vKaanto) * a;
            Suunta = KierrosLento.Kiedo(Suunta + vKaanto * dt);
            (Lat, Lon) = Siirra(Lat, Lon, Suunta, vEteen * dt);
            (Lat, Lon) = Siirra(Lat, Lon, Suunta + 90, vSivu * dt);
            // Pinta kamerassa ja liikkeen suunnassa (rakennus edessä nostaa jo ennen kuin kamera on sen kohdalla).
            var (el, eo) = Ennakko;
            double suurin = double.NaN;
            void Ota(double h) { if (!double.IsNaN(h)) suurin = double.IsNaN(suurin) ? h : Math.Max(suurin, h); }
            if (pinta != null)
            {
                Ota(pinta(Lat, Lon)); Ota(pinta(el, eo));
                for (int i = 0; i < KehaPisteita; i++) { var (kl, ko) = KehaPiste(i); Ota(pinta(kl, ko)); }
            }
            if (!double.IsNaN(suurin)) PintaM = suurin;
            KorkeusAbsM += vNousu * dt;
            double ala = PintaM + MinKorkeusM, yla = PintaM + MaxKorkeusM;
            // Pinnan nousu nostaa kameraa pehmeästi (NostoAikaS), muttei koskaan alle rajan.
            if (KorkeusAbsM < ala) KorkeusAbsM += (ala - KorkeusAbsM) * Math.Min(1, dt / NostoAikaS);
            KorkeusAbsM = Math.Max(ala - MinKorkeusM * 0.5, Math.Min(yla, KorkeusAbsM));
            return Kuvakulma(pinta);
        }

        /// <summary>Kameran asento Kuvakulmana: katsepiste kallistuksen suunnassa pinnalla (kaksi tarkennusta pinnan korkeudella).</summary>
        public Kuvakulma Kuvakulma(Func<double, double, double> pinta)
        {
            double k = Kallistus * Math.PI / 180;
            double katse = PintaM, vaaka = 0, et = KorkeusM;
            for (int i = 0; i < 2; i++)
            {
                double pysty = Math.Max(MinKorkeusM * 0.5, KorkeusAbsM - katse);
                vaaka = pysty * Math.Tan(k); et = pysty / Math.Cos(k);
                var (tl, to) = Siirra(Lat, Lon, Suunta, vaaka);
                katse = Pinta(pinta, tl, to, katse);
            }
            var (klat, klon) = Siirra(Lat, Lon, Suunta, vaaka);
            return new Kuvakulma(klat, klon, et, Kallistus, Suunta, katse);
        }

        static double Pinta(Func<double, double, double> pinta, double lat, double lon, double varalla)
        {
            double m = pinta != null ? pinta(lat, lon) : double.NaN;
            return double.IsNaN(m) ? varalla : m;
        }

        /// <summary>Piste matkan m päässä suuntaan (°) tasokartan likiarvolla (kaupungin mittakaavassa riittää).</summary>
        public static (double lat, double lon) Siirra(double lat, double lon, double suunta, double m)
        {
            double s = suunta * Math.PI / 180;
            double dLat = m * Math.Cos(s) / 111320.0, dLon = m * Math.Sin(s) / (111320.0 * Math.Max(0.01, Math.Cos(lat * Math.PI / 180)));
            return (lat + dLat, lon + dLon);
        }
    }
}
