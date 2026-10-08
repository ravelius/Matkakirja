// Latauskuvan liike (pohja LATAUSKUVA, omistaja 8.10.2026): hidas sinimuotoinen heilahdus ±1–2°, jakso 6–8 s, ei nykimistä;
// köysi seuraa liikkuvaa kerrosta.
using System;

namespace Matkakirja.Linssit.Testit
{
    public static class LatausLiikeTestit
    {
        [Testi] static void AmplitudiJaJaksoPysyvatRajoissa()
        {
            var p = LatausLiike.Profiili.Oletus;
            double maksK = 0, maksN = 0;
            for (double t = 0; t < 30; t += 1.0 / 60)
            {
                var a = LatausLiike.Tila(p, t);
                maksK = Math.Max(maksK, Math.Abs(a.KulmaAste)); maksN = Math.Max(maksN, Math.Abs(a.NousuPt));
            }
            Oleta.Tosi(maksK <= 1.5 + 1e-9 && maksK > 1.49, $"kulma ±{maksK:F3}");
            Oleta.Tosi(maksN <= 4 + 1e-9 && maksN > 3.99, $"nousu ±{maksN:F3}");
            var a0 = LatausLiike.Tila(p, 2.3); var a1 = LatausLiike.Tila(p, 2.3 + 7);
            Oleta.Tosi(Math.Abs(a0.KulmaAste - a1.KulmaAste) < 1e-9 && Math.Abs(a0.NousuPt - a1.NousuPt) < 1e-9, "jakso 7 s");
        }

        [Testi] static void RajatPakotetaanPohjaan()
        {
            var q = new LatausLiike.Profiili { KulmaAste = 10, NousuPt = 40, JaksoS = 1, Vaihe = double.NaN }.Rajattu();
            Oleta.Tosi(q.KulmaAste == 2 && q.NousuPt == 8 && q.JaksoS == 6 && q.Vaihe == 0, $"{q.KulmaAste} {q.NousuPt} {q.JaksoS} {q.Vaihe}");
            var r = new LatausLiike.Profiili { KulmaAste = 0.1, JaksoS = 30 }.Rajattu();
            Oleta.Tosi(r.KulmaAste == 1 && r.JaksoS == 8, "liian pieni kulma ja pitkä jakso rajataan (ei pysähtynyttä kuvaa)");
            var tyhja = LatausLiike.Tila(default, 1.0);
            Oleta.Tosi(!double.IsNaN(tyhja.KulmaAste) && Math.Abs(tyhja.KulmaAste) <= 1, "oletusarvoton profiili ei tuota NaN:ia");
        }

        [Testi] static void EiNykimistaKehysvalilla()
        {
            // Pahin sallittu profiili (±2°, 6 s, nousu 8 pt): muutos 30 fps:n kehysvälillä pieni ja jatkuva.
            var p = new LatausLiike.Profiili { KulmaAste = 2, NousuPt = 8, JaksoS = 6 };
            Oleta.Tosi(LatausLiike.SuurinKulmanopeus(p) < 2.1, $"{LatausLiike.SuurinKulmanopeus(p):F2} °/s");
            double dt = 1.0 / 30, maksK = 0, maksN = 0;
            var e = LatausLiike.Tila(p, 0);
            for (double t = dt; t < 12; t += dt)
            {
                var a = LatausLiike.Tila(p, t);
                maksK = Math.Max(maksK, Math.Abs(a.KulmaAste - e.KulmaAste)); maksN = Math.Max(maksN, Math.Abs(a.NousuPt - e.NousuPt));
                e = a;
            }
            Oleta.Tosi(maksK < 0.075, $"kulma enintään {maksK:F4}° / kehys");
            Oleta.Tosi(maksN < 0.3, $"nousu enintään {maksN:F3} pt / kehys");
        }

        [Testi] static void KaantopisteJaKiinnitysSeuraavat()
        {
            var a = new LatausLiike.Asento { KulmaAste = 90, NousuPt = 5 };
            var k = LatausLiike.Muunna(100, 50, 100, 50, a);
            Oleta.Tosi(Math.Abs(k.X - 100) < 1e-9 && Math.Abs(k.Y - 45) < 1e-9, $"kääntöpiste vain nousee: {k.X:F3},{k.Y:F3}");
            // Piste kääntöpisteen oikealla puolella: 90° myötäpäivään (y alas) → alapuolelle.
            var p = LatausLiike.Muunna(110, 50, 100, 50, new LatausLiike.Asento { KulmaAste = 90 });
            Oleta.Tosi(Math.Abs(p.X - 100) < 1e-9 && Math.Abs(p.Y - 60) < 1e-9, $"myötäpäivään: {p.X:F3},{p.Y:F3}");
            // Köyden kiinnityspiste liikkuu kerroksen mukana: ero lepoasentoon = kerroksen siirtymä.
            var lepo = LatausLiike.Muunna(120, 200, 120, 0, default);
            var heilahdus = LatausLiike.Muunna(120, 200, 120, 0, new LatausLiike.Asento { KulmaAste = 2 });
            Oleta.Tosi(heilahdus.X < lepo.X - 6.9 && heilahdus.X > lepo.X - 7.0, $"200 pt:n varsi 2°: {lepo.X - heilahdus.X:F3} pt");
        }

        [Testi] static void KoydenRiippuma()
        {
            var s = LatausLiike.Ohjauspiste(0, 0, 100, 0, 0);
            Oleta.Tosi(s.X == 50 && s.Y == 0, "riippuma 0: suora");
            var r = LatausLiike.Ohjauspiste(0, 0, 0, 200, 0.05);
            Oleta.Tosi(r.X == 0 && Math.Abs(r.Y - 110) < 1e-9, $"5 % pituudesta alas: {r.Y}");
            var n = LatausLiike.Ohjauspiste(0, 0, 100, 0, -1);
            Oleta.Tosi(n.Y == 0, "negatiivinen riippuma = suora");
        }
    }
}
