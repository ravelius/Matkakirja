// E3:n loppu (Ydin/Dioraama/NousuReitti.cs): nousu holvin läpi, yötaivas ja drone-kaari Kellotornin kaareen.
// Kappelin luvut Siirtosepältä (Unity → V3: z peilattu): lattia y 9,6, holvin laki y 15,2, keskus (−15,3; 9,6; −13,2).
using System;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Testit
{
    public static class NousuReittiTestit
    {
        static NousuReitti Reitti() => new NousuReitti(
            lahto: new V3(-16.5, 11.2, -12.2), lahtoKohde: new V3(-12.9, 10.4, -15.0), lahtoFov: 60, holviY: 15.2,
            linnaKeski: new V3(0, 10, 0), linnaSade: 60, kaari: new V3(40, 18, -10), kaariUlos: new V3(1, 0, 0));

        static double Etaisyys(V3 a, V3 b) => (a - b).Pituus;

        [Testi] static void AlkuJaLoppuOikein()
        {
            var r = Reitti();
            var (s0, k0, f0, _, v0) = r.Hetki(0);
            Oleta.Tosi(Etaisyys(s0, r.Lahto) < 1e-9 && Etaisyys(k0, r.LahtoKohde) < 1e-9 && f0 == 60 && v0 == 'A', "alku = kameran paikka");
            var (s1, k1, f1, l1, v1) = r.Hetki(NousuReitti.Kesto + 1);
            var (ls, lk) = Kameraliike.AsentoSijainti(r.Loppu);
            Oleta.Tosi(Etaisyys(s1, ls) < 1e-9 && Etaisyys(k1, new V3(40, 18, -10)) < 1e-9 && v1 == 'V' && l1 == 0, "loppu kaaren edessä");
            // Kaari katsotaan ulkoa: kamera seinän ulkopuolella (+x) ja vähän ylempänä.
            Oleta.Tosi(s1.X > 40 + 20 && s1.Y > 18, $"kamera ulkona {s1}");
            Oleta.Tosi(Math.Abs(f1 - NousuReitti.LoppuFov) < 1e-9, "loppu-fov");
        }

        [Testi] static void JatkuvaEiHyppyja()
        {
            var r = Reitti();
            var (eS, eK, _, _, _) = r.Hetki(0);
            double maksS = 0, maksK = 0;
            for (double t = 1 / 60.0; t <= NousuReitti.Kesto + 0.1; t += 1 / 60.0)
            {
                var (s, k, _, _, _) = r.Hetki(t);
                maksS = Math.Max(maksS, Etaisyys(s, eS)); maksK = Math.Max(maksK, Etaisyys(k, eK));
                eS = s; eK = k;
            }
            Oleta.Tosi(maksS < 2.0, $"kamera enintään 2 m / ruutu ({maksS:F2})");
            Oleta.Tosi(maksK < 4.0, $"katsekohde enintään 4 m / ruutu ({maksK:F2})");
        }

        [Testi] static void HolvinLapiLahileikkauksella()
        {
            var r = Reitti();
            bool leikattu = false, yli = false;
            for (double t = 0; t < NousuReitti.NousuS; t += 0.01)
            {
                var (s, _, _, lahi, v) = r.Hetki(t);
                if (Math.Abs(s.Y - 15.2) <= 1.0) leikattu |= lahi > 0;
                if (lahi > 0) Oleta.Tosi(Math.Abs(s.Y - 15.2) <= NousuReitti.HolviVyoM + 1e-9, $"lähileikkaus vain holvin kohdalla (y {s.Y:F2})");
                yli |= s.Y > 15.2 + 10;
            }
            Oleta.Tosi(leikattu && yli, "holvin läpi lähileikkauksella ja reilusti yli");
            var (sB, _, _, lB, vB) = r.Hetki(NousuReitti.NousuS + 0.1);
            Oleta.Tosi(vB == 'B' && lB == 0 && sB.Y > 15.2 + NousuReitti.YliHolvinM - 1, "yötaivaalla holvin yllä");
        }

        [Testi] static void DroneKaariKiertaaLinnaa()
        {
            var r = Reitti();
            double a0 = r.LennonAlku.Atsimuutti, a1 = r.Loppu.Atsimuutti;
            double ero = ((a0 - a1) % 360 + 540) % 360 - 180;
            Oleta.Tosi(Math.Abs(Math.Abs(ero) - NousuReitti.KaarenKierto) < 1e-6, $"kierto {ero:F1}°");
            Oleta.Tosi(r.LennonAlku.Etaisyys >= NousuReitti.LentoMinM, "lennon alku kaukana");
            // Lennon aikana kamera pysyy maan yllä ja linnan ulkopuolella (ei sisään muureihin ennen loppua).
            for (double t = NousuReitti.NousuS + NousuReitti.LeijuntaS; t < NousuReitti.Kesto; t += 0.1)
            {
                var (s, _, _, _, _) = r.Hetki(t);
                Oleta.Tosi(s.Y > 18, $"lennossa korkealla (t {t:F1}, y {s.Y:F1})");
            }
        }

        /// <summary>Olavinlinnan oikeat mitat (Linnanrakentaja 7.10., glTF): kaari (−51,0; 15,8; −5,5), ulos (−0,985; 0; −0,174),
        /// päälinna (−20; 15; 0) säde 90; kappeli Siirtosepältä. Pysähdys länsipuolella komeron edessä, ei tornin sisällä.</summary>
        [Testi] static void OlavinlinnanKellotorni()
        {
            var r = new NousuReitti(new V3(-16.5, 11.2, -12.2), new V3(-12.9, 10.4, -15.0), 60, 15.2,
                new V3(-20, 15, 0), 90, new V3(-51.0, 15.8, -5.5), new V3(-0.985, 0, -0.174), 9);
            var (s, k, _, _, _) = r.Hetki(NousuReitti.Kesto);
            Oleta.Tosi(s.X < -51.0 - 8 && Math.Abs((s - k).Pituus - 9) < 1e-6, $"kamera 9 m komerosta länteen {s}");
            Oleta.Tosi(Math.Abs(r.Loppu.Atsimuutti - 280) < 1.0 || Math.Abs(r.Loppu.Atsimuutti + 80) < 1.0, $"kompassi 280° ({r.Loppu.Atsimuutti:F1})");
            // Lennon aikana ei Kellotornin sisään (keskipiste (−43,7; ·; −4,2), säde ~8 m) alle 40 m:n korkeudella.
            for (double t = NousuReitti.NousuS; t < NousuReitti.Kesto; t += 0.05)
            {
                var (p, _, _, _, _) = r.Hetki(t);
                double d = Math.Sqrt((p.X + 43.7) * (p.X + 43.7) + (p.Z + 4.2) * (p.Z + 4.2));
                Oleta.Tosi(d > 8 || p.Y > 40.5, $"ei tornin läpi (t {t:F2}, d {d:F1}, y {p.Y:F1})");
            }
        }
    }
}
