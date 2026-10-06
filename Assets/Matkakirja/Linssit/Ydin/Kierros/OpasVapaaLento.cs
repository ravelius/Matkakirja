// OPPAAN VAPAA TILA (omistaja 6.10.2026 klo 16.5x Päätoimittajan kautta: "Silloin voisin vapaasti kiertää kaupunkia edelleen niillä
// joystick-säätimillä … kun nyt ei olekaan mitään kiinteää kohdetta, minkä ympärillä kamera pyörisi"; juna 152). Kierroksen ■ jälkeen
// (OpasSilmukka.VapaaTila, LS1) pelaaja lentää kaupungissa tapeilla:
//   vasen tappi   ↕ eteen/taakse katsesuunnan mukaan, ↔ sivuttain (strafe)
//   oikea tappi   ↔ kääntää katsetta paikallaan (kamera pysyy, näkymä kääntyy), ↕ nousee/laskee suoraan ylös/alas
//   kallistus     korkeuden mukaan automaattisesti: matalalla lähes vaakaan (78°), ylhäällä jyrkemmin alas (50° 10 km:ssä)
//   nopeus        verrannollinen korkeuteen maasta (0,6 × korkeus / s täydellä tapilla), pehmeä kiihdytys ja hiipuma
//   maasto        kamera vähintään MinKorkeusM kameran alla olevan maan yläpuolella, enintään MaxKorkeusM
// Tila on kameran paikka (lat, lon), korkeus maasta, suunta ja kallistus; ulos Kuvakulma (katsepiste kallistuksen suunnassa)
// PalloKierto.Kuvaa-muodossa. Puhdas C#: Linssit-testit OpasVapaaLentoTestit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class OpasVapaaLento
    {
        public const double NopeusKerroin = 0.6, NousuKerroin = 0.8, KaantoAstS = 55, SyoteAikaS = 0.2, HiipumaAikaS = 0.5, KuollutAlue = 0.12;
        public const double MinKorkeusM = 40, MaxKorkeusM = 12000, MinNopeusMS = 15;

        /// <summary>Kameran alapiste, korkeus maasta (m), katseen suunta (0 = pohjoinen) ja kallistus pystysuorasta (°).</summary>
        public double Lat { get; private set; }
        public double Lon { get; private set; }
        public double KorkeusM { get; private set; }
        public double Suunta { get; private set; }
        public double Kallistus => KallistusKorkeudelle(KorkeusM);
        double vEteen, vSivu, vNousu, vKaanto;

        /// <summary>Kallistus korkeuden mukaan: 100 m → 78°, 1 km → 66°, 10 km → 54° (log-asteikko, rajat 50…80).</summary>
        public static double KallistusKorkeudelle(double korkeusM) =>
            Math.Max(50, Math.Min(80, 78 - 12 * Math.Log10(Math.Max(1, korkeusM) / 100)));

        /// <summary>Aloitus nykyisestä asennosta (kierroksen viimeinen kehys): kameran paikka katsepisteestä taaksepäin.</summary>
        public void Aloita(Kuvakulma a, Func<double, double, double> maa)
        {
            double k = a.Kallistus * Math.PI / 180;
            double vaaka = a.EtaisyysM * Math.Sin(k), pysty = a.EtaisyysM * Math.Cos(k);
            (Lat, Lon) = Siirra(a.Lat, a.Lon, a.Suuntima + 180, vaaka);
            double maaKamera = Maa(maa, Lat, Lon, a.KatseKorkeusM);
            KorkeusM = Math.Max(MinKorkeusM, Math.Min(MaxKorkeusM, a.KatseKorkeusM + pysty - maaKamera));
            Suunta = KierrosLento.Kiedo(a.Suuntima);
            vEteen = vSivu = vNousu = vKaanto = 0;
        }

        /// <summary>
        /// Kerran kehyksessä: vasen (x sivulle +oikea, y eteen +), oikea (x kääntö +oikealle, y nousu +ylös), −1…1. maa(lat, lon) =
        /// maaston korkeus ellipsoidista tai NaN. Palauttaa kameran Kuvakulman (katsepiste, etäisyys, kallistus, suunta, katseen korkeus).
        /// </summary>
        public Kuvakulma Paivita(double dt, double vasenX, double vasenY, double oikeaX, double oikeaY, Func<double, double, double> maa)
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
            KorkeusM = Math.Max(MinKorkeusM, Math.Min(MaxKorkeusM, KorkeusM + vNousu * dt));
            return Kuvakulma(maa);
        }

        /// <summary>Kameran asento Kuvakulmana: katsepiste kallistuksen suunnassa maan pinnalla (yksi tarkennus maaston korkeudella).</summary>
        public Kuvakulma Kuvakulma(Func<double, double, double> maa)
        {
            double k = Kallistus * Math.PI / 180;
            double maaKamera = Maa(maa, Lat, Lon, 0), kameraAbs = maaKamera + KorkeusM;
            double maaKatse = maaKamera, vaaka = 0, et = KorkeusM;
            for (int i = 0; i < 2; i++)
            {
                double pysty = Math.Max(MinKorkeusM, kameraAbs - maaKatse);
                vaaka = pysty * Math.Tan(k); et = pysty / Math.Cos(k);
                var (tl, to) = Siirra(Lat, Lon, Suunta, vaaka);
                maaKatse = Maa(maa, tl, to, maaKamera);
            }
            var (klat, klon) = Siirra(Lat, Lon, Suunta, vaaka);
            return new Kuvakulma(klat, klon, et, Kallistus, Suunta, maaKatse);
        }

        static double Maa(Func<double, double, double> maa, double lat, double lon, double varalla)
        {
            double m = maa != null ? maa(lat, lon) : double.NaN;
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
