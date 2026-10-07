// E3:N LOPPU, NOUSU HOLVIN LÄPI (Päätoimittaja 7.10.2026, käsikirjoitus kasikirjoitus-olavinlinna-kappeli-e3.md vaihe 11:
// "kamera nousee holvin läpi yötaivaalle ja drone-näkymään nykyiseen linnaan ja pysähtyy Kellotornin seinän kaareen").
// Puhdas reitti dioraaman V3-avaruudessa (glTF: Unity = (x, y, −z)), testit Linssit-testit/Testit/NousuReittiTestit.cs;
// Unity-puoli Linssit/Unity/SeikkailuNousu.cs (Siirtosepän historiamoottori kutsuu vaiheen 11 lopussa).
//
//   A  NOUSU (NousuS): suoraan ylös kamerasta holvin läpi YliHolvinM holvin yläpuolelle; katse kääntyy alttarilta taivaalle.
//      Holvin kohdalla lähileikkaus (LahiLeikkausM), jotta kamera ei näe holvin sisäpintaa vaan menee sen läpi.
//   B  YÖTAIVAS (LeijuntaS): leijunta taivaalla ja liuku drone-kaaren alkuun; katse laskee taivaalta linnaan.
//   C  DRONE (LentoS): Kameraliike.SiirtymaAsento lennon alusta (linnan yllä, 55°, kaukana) Kellotornin kaareen (8°, lähellä);
//      atsimuutti kiertää linnaa noin 150°.
// Kaikki vaiheet jatkuvia: jokaisen vaiheen alku on edellisen loppu (sijainti ja katsekohde).
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class NousuReitti
    {
        public const double NousuS = 3.2, LeijuntaS = 2.4, LentoS = 8.4;
        public const double Kesto = NousuS + LeijuntaS + LentoS;
        /// <summary>Nousun huippu holvin laen yläpuolella (m) ja lähileikkaus holvin läpimenossa (m, ±HolviVyoM).</summary>
        public const double YliHolvinM = 34, LahiLeikkausM = 3.0, HolviVyoM = 2.0;
        /// <summary>Drone-kaaren alku: korkeuskulma, etäisyys linnan säteen kertoimena (vähintään LentoMinM) ja kierto loppuun nähden.</summary>
        public const double LennonKorkeus = 55, LennonEtaisyysKerroin = 2.2, LentoMinM = 80, KaarenKierto = 150;
        /// <summary>Pysähdys Kellotornin kaaren eteen: korkeuskulma ja oletusetäisyys (m).</summary>
        public const double LoppuKorkeus = 8, LoppuEtaisyys = 24, LoppuFov = 45, LennonFov = 55;

        public readonly V3 Lahto, LahtoKohde;
        public readonly double HolviY, LahtoFov;
        public readonly Asento LennonAlku, Loppu;
        readonly V3 huippu, taivasKohde;

        /// <param name="lahto">Kameran sijainti nousun alussa (kappelissa).</param>
        /// <param name="lahtoKohde">Kameran katsekohde nousun alussa.</param>
        /// <param name="holviY">Kappelin holvin laen korkeus.</param>
        /// <param name="linnaKeski">Linnan keskipiste drone-kaarelle; <paramref name="linnaSade"/> vaakasäde.</param>
        /// <param name="kaari">Kellotornin seinän kaaren keskipiste; <paramref name="kaariUlos"/> seinän ulkonormaali (vaaka).</param>
        public NousuReitti(V3 lahto, V3 lahtoKohde, double lahtoFov, double holviY, V3 linnaKeski, double linnaSade, V3 kaari, V3 kaariUlos,
            double loppuEtaisyys = LoppuEtaisyys)
        {
            Lahto = lahto; LahtoKohde = lahtoKohde; LahtoFov = lahtoFov; HolviY = holviY;
            // Kompassi (Kameraliike.AsentoSijainti): kameran suunta kohteesta = (sin a, ·, −cos a) → a = atan2(nx, −nz).
            double a = Math.Atan2(kaariUlos.X, -kaariUlos.Z) * 180 / Math.PI;
            Loppu = new Asento(kaari, a, LoppuKorkeus, loppuEtaisyys, LoppuFov, 0);
            LennonAlku = new Asento(linnaKeski, a + KaarenKierto, LennonKorkeus, Math.Max(linnaSade * LennonEtaisyysKerroin, LentoMinM), LennonFov, 0);
            huippu = new V3(lahto.X, Math.Max(lahto.Y, holviY) + YliHolvinM, lahto.Z);
            // Taivaalle: katse ylös ja hieman eteenpäin alkuperäisestä katsesuunnasta (vaaka).
            var eteen = new V3(lahtoKohde.X - lahto.X, 0, lahtoKohde.Z - lahto.Z);
            double p = eteen.Pituus;
            eteen = p > 1e-6 ? eteen * (1 / p) : new V3(0, 0, -1);
            taivasKohde = huippu + new V3(0, 12, 0) + eteen * 6;
        }

        /// <summary>Kameran tila hetkellä t (s): sijainti, katsekohde, fov, lähileikkaus (m, 0 = oletus) ja vaihe (A, B, C, valmis).</summary>
        public (V3 sijainti, V3 kohde, double fov, double lahiLeikkaus, char vaihe) Hetki(double t)
        {
            if (t <= 0) return (Lahto, LahtoKohde, LahtoFov, 0, 'A');
            if (t < NousuS)
            {
                double e = Kameraliike.Smootherstep(t / NousuS);
                var s = V3.Lerp(Lahto, huippu, e);
                // Katse alttarilta taivaalle nopeammin kuin nousu (ensimmäisen kolmanneksen aikana), ettei holvin pinta täytä kuvaa.
                double k = Kameraliike.Smootherstep(Math.Min(1, t / (NousuS * 0.45)));
                var kohde = V3.Lerp(LahtoKohde, s + (taivasKohde - huippu), k);
                double lahi = Math.Abs(s.Y - HolviY) <= HolviVyoM ? LahiLeikkausM : 0;
                return (s, kohde, LahtoFov + (LennonFov - LahtoFov) * e, lahi, 'A');
            }
            var (alkuSij, alkuKohde) = Kameraliike.AsentoSijainti(LennonAlku);
            if (t < NousuS + LeijuntaS)
            {
                double e = Kameraliike.Smootherstep((t - NousuS) / LeijuntaS);
                return (V3.Lerp(huippu, alkuSij, e), V3.Lerp(taivasKohde, alkuKohde, e), LennonFov, 0, 'B');
            }
            if (t < Kesto)
            {
                var a = Kameraliike.SiirtymaAsento(LennonAlku, Loppu, (t - NousuS - LeijuntaS) / LentoS);
                var (sij, kohde) = Kameraliike.AsentoSijainti(a);
                return (sij, kohde, a.Fov, 0, 'C');
            }
            var (ls, lk) = Kameraliike.AsentoSijainti(Loppu);
            return (ls, lk, Loppu.Fov, 0, 'V');
        }
    }
}
