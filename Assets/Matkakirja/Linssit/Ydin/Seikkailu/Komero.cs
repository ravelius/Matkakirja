// HISTORIAMOOTTORI M-OSA HUONE 9: KOMERO JA ARKKU (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 9; Unity
// SeikkailuKomero). Tiilet (6 × 2 raapaisua) ja Kilpilukko (45° ±10°) yhdessä: arkku on ulottuvilla vasta, kun kaikki tiilet ovat irti;
// kilpeä käännetään 15° kerrallaan −90…90 (yli 90 → −90, joten jokainen asento on saavutettavissa); Avaa kokeilee kantta.
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class Komero
    {
        public const double KilpiAskel = 15;
        public readonly Tiilet Tiilet;
        public readonly Kilpilukko Lukko;

        public Komero(int tiilia = 6, double tavoiteAste = 45, double sallittuAste = 10)
        {
            Tiilet = new Tiilet(Math.Max(0, tiilia)); Lukko = new Kilpilukko(tavoiteAste, sallittuAste);
        }

        public bool ArkkuUlottuvilla => Tiilet.KaikkiIrti;
        public bool Auki => Lukko.Auki;

        public TiiliTulos Raavi(int i, double vetoMs = 0) => Tiilet.Raavi(i, vetoMs);

        /// <summary>Kilpi 1 tai 2 askeleen eteenpäin (yli 90° kiertää −90°:een); palauttaa uuden kulman tai NaN, jos arkku ei ole käsillä.</summary>
        public double KaannaKilpea(int kilpi)
        {
            if (!ArkkuUlottuvilla || Lukko.Auki || kilpi != 1 && kilpi != 2) return double.NaN;
            double nyt = kilpi == 1 ? Lukko.Kilpi1 : Lukko.Kilpi2;
            double uusi = nyt + KilpiAskel > 90 + 1e-9 ? -90 : nyt + KilpiAskel;
            Lukko.Kaanna(kilpi, uusi - nyt);
            return kilpi == 1 ? Lukko.Kilpi1 : Lukko.Kilpi2;
        }

        /// <summary>Kannen kokeilu: Auki, Kolahdus (6 m, ei rangaistusta) tai Ei (tiilet vielä edessä).</summary>
        public KilpiTulos Avaa() => ArkkuUlottuvilla ? Lukko.Kokeile() : KilpiTulos.Ei;
    }
}
