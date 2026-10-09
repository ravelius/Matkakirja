// KORIN KOMPASSI (9.10.): ruusu osoittaa pohjoiseen ja asettuu kuin nesteessä (pieni ylitys, lyhin tie 360°:n yli), merkki
// seuraavaan kohteeseen häivytettynä, kardaani korin keinunnan vastaisesti.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KoriKompassiTestit
    {
        static double Ero(double a, double b) { double d = (a - b) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return Math.Abs(d); }

        [Testi] static void RuusuNesteessaJaMerkki()
        {
            var k = new KoriKompassi();
            k.Paivita(0.016, 0, null, 0, 0);
            Oleta.Tosi(Ero(k.Ruusu, 0) < 1e-9 && k.MerkkiNakyy == 0, "alussa pohjoinen, ei merkkiä");
            double yli = 0;
            for (int i = 0; i < 60 * 6; i++) { k.Paivita(1 / 60.0, 90, null, 0, 0); yli = Math.Max(yli, -k.Ruusu - 90); }   // tavoite −90
            Oleta.Tosi(Ero(k.Ruusu, -90) < 1.0, $"asettui {k.Ruusu:F1}° (tavoite −90)");
            Oleta.Tosi(yli > 1 && yli < 25, $"neste: pieni ylitys {yli:F1}°");
            // Lyhin tie: −90 → +170 on 100° negatiiviseen suuntaan (ylitys mukaan alle 200°), ei 260° toiseen.
            double ed = k.Ruusu, matka = 0;
            for (int i = 0; i < 60 * 8; i++) { k.Paivita(1 / 60.0, -170, null, 0, 0); matka += Ero(k.Ruusu, ed); ed = k.Ruusu; }
            Oleta.Tosi(Ero(k.Ruusu, 170) < 1.0 && matka < 200, $"lyhin tie: {k.Ruusu:F1}°, kuljettu {matka:F0}°");
            for (int i = 0; i < 60 * 3; i++) k.Paivita(1 / 60.0, 0, 45, 0, 0);
            Oleta.Tosi(k.MerkkiNakyy > 0.99 && Ero(k.Merkki, 45) < 1.5, $"merkki seuraavaan {k.Merkki:F1}°");
            for (int i = 0; i < 60; i++) k.Paivita(1 / 60.0, 0, null, 0, 0);
            Oleta.Tosi(k.MerkkiNakyy < 0.01, "merkki häipyy, kun kohdetta ei ole");
            for (int i = 0; i < 60 * 3; i++) k.Paivita(1 / 60.0, 0, null, 2, -1);
            Oleta.Tosi(Math.Abs(k.KardaaniX + 2) < 0.05 && Math.Abs(k.KardaaniZ - 1) < 0.05, "kardaani kompensoi keinunnan");
        }
    }
}
