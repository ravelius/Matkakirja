// HISTORIAMOOTTORI: VIHJE MAAILMAN VALONA (Linssiseppä 2, 8.10.2026; OMISTAJAN PÄÄTÖS klo 19.0x: "voisiko pulun pitää poissa pelistä?
// kyse on videopelistä, mihin pulu ei periaatteessa kuulu"). Vihjeportaiden (Vihjeet, MVihjeet, LaituriVihje) kohteessa näkyy hento
// kimallus — ulkona kuunvalon, sisällä liekin sävyinen — ja kuuluu pieni ääni; ei tekstiä eikä hahmoa. Taso 1 himmeä ja lyhyt, taso 2
// kirkkaampi, taso 3 sykkii, kunnes pelaaja on kohteella (LoydettyM) tai Taso3MaxS on kulunut. Kirkkaus 0–1 (sovitin kertoo valon
// perusvoimakkuudella); nousu ja lasku pehmeät, uusi vihje jatkaa nykyisestä kirkkaudesta (ei välähdystä).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum VihjeSavy { Kuu, Liekki }

    public sealed class ValoVihje
    {
        public const double NousuS = 0.6, LaskuS = 0.8, Taso1S = 2.5, Taso2S = 4, Taso3MaxS = 20, SykeS = 1.6, LoydettyM = 2;
        /// <summary>Huippukirkkaus tasoittain (1 = liekin hehku): hento, ei koskaan liekkiä kirkkaampi.</summary>
        public static readonly double[] Huippu = { 0, 0.3, 0.5, 0.7 };
        /// <summary>Ulkona olevat kävelyosat (kuunvalo); muurikäytävän osa harjan korkeudella on myös ulkona.</summary>
        public static readonly string[] UlkoOsat = { "ulkoalue", "vesiportti", "pikkupiha" };

        public int Taso { get; private set; }
        public (double X, double Y, double Z) Kohde { get; private set; }
        public VihjeSavy Savy { get; private set; }
        public double Kirkkaus { get; private set; }
        public bool Kaynnissa => Taso > 0;
        double aika, alku, laskuAlku = -1, laskuKirkkaus;

        public static VihjeSavy SavyOsassa(string osa, double y) =>
            Array.IndexOf(UlkoOsat, osa) >= 0 || osa == "muurikaytava" && y >= MVihjeet.HarjaY - 1 ? VihjeSavy.Kuu : VihjeSavy.Liekki;

        /// <summary>Väri (r, g, b) 0–1: kuunvalo kylmä sinivalkoinen, liekki lämmin.</summary>
        public static (double R, double G, double B) Vari(VihjeSavy s) => s == VihjeSavy.Kuu ? (0.72, 0.82, 1.0) : (1.0, 0.72, 0.42);

        public void Aloita(int taso, (double X, double Y, double Z) kohde, VihjeSavy savy)
        {
            Taso = Math.Max(1, Math.Min(3, taso)); Kohde = kohde; Savy = savy;
            aika = 0; alku = Kirkkaus; laskuAlku = -1;
        }

        /// <summary>Kehys: pelaajan etäisyys kohteeseen (m). Palauttaa, onko vihje yhä näkyvissä.</summary>
        public bool Paivita(double dt, double pelaajaKohteeseenM)
        {
            if (Taso == 0) return false;
            aika += Math.Max(0, dt);
            double huippu = Huippu[Taso];
            double kesto = Taso == 1 ? Taso1S : Taso == 2 ? Taso2S : Taso3MaxS;
            bool loppuu = aika >= kesto - LaskuS || Taso == 3 && pelaajaKohteeseenM < LoydettyM;
            if (loppuu && laskuAlku < 0) { laskuAlku = aika; laskuKirkkaus = Kirkkaus; }
            if (laskuAlku >= 0)
            {
                double s = Math.Min(1, (aika - laskuAlku) / LaskuS);
                Kirkkaus = laskuKirkkaus * (1 - Silea(s));
                if (s >= 1) { Taso = 0; Kirkkaus = 0; return false; }
                return true;
            }
            double nousu = Silea(Math.Min(1, aika / NousuS));
            double taso = Taso == 3 ? huippu * (0.6 + 0.4 * 0.5 * (1 + Math.Cos(2 * Math.PI * Math.Max(0, aika - NousuS) / SykeS))) : huippu;
            Kirkkaus = alku + (taso - alku) * nousu;
            return true;
        }

        static double Silea(double x) => x * x * (3 - 2 * x);
    }
}
