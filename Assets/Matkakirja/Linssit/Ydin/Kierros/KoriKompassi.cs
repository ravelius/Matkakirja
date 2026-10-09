// KORIN KOMPASSI (omistaja 9.10.2026 "teetä", PT 00.45; malli Linnanrakentajalta): pieni messinkinen nestekompassi korin reunalla.
// Ruusu osoittaa oikeaan pohjoiseen (kaupunkikameran suuntimasta) ja kääntyy kuin nesteessä: alivaimennettu jousi (pieni ylitys,
// hidas asettuminen) kulmaerolla lyhintä tietä. Kardaani kallistuu korin keinunnan vastaisesti viiveellä (ruusu pysyy vaakatasossa).
// Kehän merkki näyttää seuraavan kohteen suunnan, kun kohde on tiedossa (näkyvyys häivytetään). Puhdas C#: KoriKompassiTestit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class KoriKompassi
    {
        public const double RuusuOmega = 2.6, RuusuZeta = 0.42, MerkkiOmega = 4.0, MerkkiZeta = 0.85, KardaaniAikaS = 0.45, MerkkiHaivytysS = 0.6;
        /// <summary>Ruusun kulma kompassin rungossa (°, myötäpäivään ylhäältä; 0 = pohjoinen kohti katsetta).</summary>
        public double Ruusu { get; private set; }
        /// <summary>Seuraavan kohteen merkin kulma rungossa (°) ja näkyvyys 0–1.</summary>
        public double Merkki { get; private set; }
        public double MerkkiNakyy { get; private set; }
        /// <summary>Kardaanin kompensaatio (°): nyökkäys ja kallistus korin keinunnan vastaisesti.</summary>
        public double KardaaniX { get; private set; }
        public double KardaaniZ { get; private set; }
        double vRuusu, vMerkki; bool alussa = true;

        static double Kiedo(double a) { a %= 360; if (a > 180) a -= 360; if (a < -180) a += 360; return a; }

        /// <summary>suuntimaAst = katseen suunta (0 = pohjoinen, myötäpäivään); seuraavaAst = suunta seuraavaan kohteeseen tai null.</summary>
        public void Paivita(double dt, double suuntimaAst, double? seuraavaAst, double koriNyokkays, double koriKallistus)
        {
            dt = Math.Max(0, Math.Min(0.1, dt));
            double tavoite = Kiedo(-suuntimaAst);
            if (alussa) { Ruusu = tavoite; alussa = false; }
            // Neste: x'' = −2ζω x' − ω² (x − tavoite) kulmaerolla (lyhin tie).
            double e = Kiedo(Ruusu - tavoite);
            vRuusu += (-2 * RuusuZeta * RuusuOmega * vRuusu - RuusuOmega * RuusuOmega * e) * dt;
            Ruusu = Kiedo(Ruusu + vRuusu * dt);
            if (seuraavaAst is double s)
            {
                double mt = Kiedo(s - suuntimaAst);
                if (MerkkiNakyy <= 0.001) Merkki = mt;
                double em = Kiedo(Merkki - mt);
                vMerkki += (-2 * MerkkiZeta * MerkkiOmega * vMerkki - MerkkiOmega * MerkkiOmega * em) * dt;
                Merkki = Kiedo(Merkki + vMerkki * dt);
                MerkkiNakyy = Math.Min(1, MerkkiNakyy + dt / MerkkiHaivytysS);
            }
            else MerkkiNakyy = Math.Max(0, MerkkiNakyy - dt / MerkkiHaivytysS);
            double k = 1 - Math.Exp(-dt / KardaaniAikaS);
            KardaaniX += (-koriNyokkays - KardaaniX) * k;
            KardaaniZ += (-koriKallistus - KardaaniZ) * k;
        }
    }
}
