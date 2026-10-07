// HISTORIAMOOTTORI V3 (Siirtoseppä 7.10.2026): vartijan aivot — partio, näkökartio ja valoisuus, epäily → kiinni, harhautus äänellä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VartijaTestit
    {
        static readonly List<(double, double, double)> Reitti = new List<(double, double, double)> { (0, 0, 1.0), (0, 10, 1.0) };

        // Yksinkertainen liike: vartija kävelee kohteeseen Vauhdilla (sovittimen NavMeshin sijaan).
        static void Aja(Vartija v, ref double x, ref double z, Func<double, double, VartijanSyote> syote, double sekuntia)
        {
            for (double t = 0; t < sekuntia; t += 1 / 30.0)
            {
                var s = syote(x, z); s.VartijaX = x; s.VartijaZ = z;
                v.Paivita(1 / 30.0, s);
                double dx = v.KohdeX - x, dz = v.KohdeZ - z, d = Math.Sqrt(dx * dx + dz * dz);
                if (d > 1e-6 && v.Vauhti > 0) { double a = Math.Min(d, v.Vauhti / 30.0); x += dx / d * a; z += dz / d * a; v.Yaw = Math.Atan2(dx, dz) * 180 / Math.PI; }
            }
        }

        static VartijanSyote Kaukana(double x, double z) => new VartijanSyote { PelaajaX = 50, PelaajaZ = 50, NakolinjaVapaa = false, Valoisuus = 1 };

        [Testi] static void PartioKiertaaReitin()
        {
            var v = new Vartija(Reitti); double x = 0, z = 0;
            Aja(v, ref x, ref z, Kaukana, 12);
            Oleta.Tosi(z > 8 || v.KohdeZ < 1, $"vartija eteni reitillä (z {z:F1}, kohde {v.KohdeZ:F1})");
            Aja(v, ref x, ref z, Kaukana, 12);
            Oleta.Sama(VartijanTila.Partio, v.Tila);
        }

        [Testi] static void NakeeEdestaMuttaEiTakaaEikaPimeassaKaukaa()
        {
            var v = new Vartija(Reitti, yaw: 0);
            var edessa = new VartijanSyote { VartijaX = 0, VartijaZ = 0, PelaajaX = 0.5, PelaajaZ = 5, NakolinjaVapaa = true, Valoisuus = 1 };
            Oleta.Tosi(v.NakoVoima(edessa) > 0.5, $"edessä näkyy ({v.NakoVoima(edessa):F2})");
            var takana = edessa; takana.PelaajaZ = -5;
            Oleta.Sama(0.0, v.NakoVoima(takana));
            var pimea = edessa; pimea.PelaajaZ = 6; pimea.Valoisuus = 0; pimea.Hiipii = true;   // ulottuma 10·0,35·0,7 = 2,45 m
            Oleta.Sama(0.0, v.NakoVoima(pimea));
            var seina = edessa; seina.NakolinjaVapaa = false;
            Oleta.Sama(0.0, v.NakoVoima(seina));
            var piilo = edessa; piilo.Piilossa = true;
            Oleta.Sama(0.0, v.NakoVoima(piilo));
        }

        [Testi] static void EpailyJaKiinni()
        {
            var v = new Vartija(Reitti, yaw: 0); double x = 0, z = 0;
            VartijanSyote Nakyy(double vx, double vz) => new VartijanSyote { PelaajaX = 0, PelaajaZ = vz + 3, NakolinjaVapaa = true, Valoisuus = 1 };
            Aja(v, ref x, ref z, Nakyy, 0.3);
            Oleta.Tosi(v.Tila == VartijanTila.Epaily || v.Tila == VartijanTila.Kiinni, $"epäily ({v.Tila}, mittari {v.Mittari:F2})");
            Aja(v, ref x, ref z, Nakyy, 2);
            Oleta.Sama(VartijanTila.Kiinni, v.Tila);
            v.Nollaa(x, z);
            Oleta.Tosi(v.Tila == VartijanTila.Partio && v.Mittari == 0, "nollaus partioon");
        }

        [Testi] static void HarhautusAanellaJaPaluu()
        {
            var v = new Vartija(Reitti, yaw: 0); double x = 0, z = 0;
            bool heitetty = false;
            VartijanSyote Heitto(double vx, double vz)
            {
                var s = Kaukana(vx, vz);
                if (!heitetty) { s.Aanet = new List<Aani> { new Aani(6, 2, 12) }; heitetty = true; }
                return s;
            }
            Aja(v, ref x, ref z, Heitto, 0.1);
            Oleta.Sama(VartijanTila.Etsinta, v.Tila);
            Aja(v, ref x, ref z, Kaukana, 6);
            Oleta.Tosi(Math.Abs(x - 6) < 0.7 && Math.Abs(z - 2) < 0.7, $"vartija meni äänen luo ({x:F1}, {z:F1})");
            Aja(v, ref x, ref z, Kaukana, Vartija.EtsintaKatseluS + 1);
            Oleta.Sama(VartijanTila.Partio, v.Tila);
            var kaukoAani = new VartijanSyote { NakolinjaVapaa = false, Aanet = new List<Aani> { new Aani(40, 40, 5) } };
            var v2 = new Vartija(Reitti); kaukoAani.VartijaX = 0; kaukoAani.VartijaZ = 0; v2.Paivita(0.1, kaukoAani);
            Oleta.Sama(VartijanTila.Partio, v2.Tila);
        }
    }
}
