// Latauskuvan liike (pohja LATAUSKUVA, omistaja 8.10.2026): vähäeleinen sinimuotoinen heilahdus ±0,5–0,75°, jakso 7–8 s, ei nykimistä;
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
            Oleta.Tosi(maksK <= 0.6 + 1e-9 && maksK > 0.599, $"kulma ±{maksK:F3}");
            Oleta.Tosi(maksN <= 3 + 1e-9 && maksN > 2.99, $"nousu ±{maksN:F3}");
            var a0 = LatausLiike.Tila(p, 2.3); var a1 = LatausLiike.Tila(p, 2.3 + 7.5);
            Oleta.Tosi(Math.Abs(a0.KulmaAste - a1.KulmaAste) < 1e-9 && Math.Abs(a0.NousuPt - a1.NousuPt) < 1e-9, "jakso 7,5 s");
        }

        [Testi] static void RajatPakotetaanPohjaan()
        {
            var q = new LatausLiike.Profiili { KulmaAste = 10, NousuPt = 40, JaksoS = 1, Vaihe = double.NaN }.Rajattu();
            Oleta.Tosi(q.KulmaAste == 0.75 && q.NousuPt == 4 && q.JaksoS == 7 && q.Vaihe == 0, $"{q.KulmaAste} {q.NousuPt} {q.JaksoS} {q.Vaihe}");
            var r = new LatausLiike.Profiili { KulmaAste = 0.1, JaksoS = 30 }.Rajattu();
            Oleta.Tosi(r.KulmaAste == 0.5 && r.JaksoS == 8, "liian pieni kulma ja pitkä jakso rajataan (ei pysähtynyttä kuvaa)");
            var tyhja = LatausLiike.Tila(default, 1.0);
            Oleta.Tosi(!double.IsNaN(tyhja.KulmaAste) && Math.Abs(tyhja.KulmaAste) <= 0.5, "oletusarvoton profiili ei tuota NaN:ia");
        }

        [Testi] static void EiNykimistaKehysvalilla()
        {
            // Pahin sallittu profiili (±0,75°, 7 s, nousu 4 pt): muutos 30 fps:n kehysvälillä pieni ja jatkuva.
            var p = new LatausLiike.Profiili { KulmaAste = 0.75, NousuPt = 4, JaksoS = 7 };
            Oleta.Tosi(LatausLiike.SuurinKulmanopeus(p) < 0.68, $"{LatausLiike.SuurinKulmanopeus(p):F2} °/s");
            double dt = 1.0 / 30, maksK = 0, maksN = 0;
            var e = LatausLiike.Tila(p, 0);
            for (double t = dt; t < 12; t += dt)
            {
                var a = LatausLiike.Tila(p, t);
                maksK = Math.Max(maksK, Math.Abs(a.KulmaAste - e.KulmaAste)); maksN = Math.Max(maksN, Math.Abs(a.NousuPt - e.NousuPt));
                e = a;
            }
            Oleta.Tosi(maksK < 0.023, $"kulma enintään {maksK:F4}° / kehys");
            Oleta.Tosi(maksN < 0.12, $"nousu enintään {maksN:F3} pt / kehys");
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

        [Testi] static void LahentyminenNollastaNeljaanProsenttiin()
        {
            var a0 = LatausLiike.Lahentyminen(0, 0.8, 0.6);
            Oleta.Tosi(a0.Skaala == 1 && a0.AnkkuriX == 0.5 && a0.AnkkuriY == 0.5, "alku 1,00 keskeltä");
            var a8 = LatausLiike.Lahentyminen(8, 0.8, 0.6);
            Oleta.Tosi(Math.Abs(a8.Skaala - 1.04) < 1e-9 && Math.Abs(a8.AnkkuriX - 0.9) < 1e-9 && Math.Abs(a8.AnkkuriY - 0.8) < 1e-9, $"8 s: {a8.Skaala} {a8.AnkkuriX} {a8.AnkkuriY}");
            var a16 = LatausLiike.Lahentyminen(16, 0.8, 0.6);
            Oleta.Tosi(Math.Abs(a16.Skaala - 1) < 1e-9, "16 s: takaisin 1,00 pehmeästi (ei hyppyä)");
            double dt = 1.0 / 30, maks = 0; var e = LatausLiike.Lahentyminen(0, 1, 1);
            for (double t = dt; t < 40; t += dt)
            {
                var a = LatausLiike.Lahentyminen(t, 1, 1);
                Oleta.Tosi(a.Skaala >= 1 && a.Skaala <= 1.04 + 1e-9 && a.AnkkuriX >= 0 && a.AnkkuriX <= 1, $"rajoissa {t:F2}");
                maks = Math.Max(maks, Math.Abs(a.Skaala - e.Skaala)); e = a;
            }
            Oleta.Tosi(maks < 0.0003, $"skaalan muutos enintään {maks:F5} / kehys");
            var neg = LatausLiike.Lahentyminen(-3, double.NaN, 5);
            Oleta.Tosi(neg.Skaala == 1 && neg.AnkkuriX == 0.5 && neg.AnkkuriY == 0.5, "negatiivinen aika ja NaN rajataan");
        }

        [Testi] static void SuuntaPysyyKuvalle()
        {
            var a = LatausLiike.Suunta("https://commons/x.jpg"); var b = LatausLiike.Suunta("https://commons/x.jpg");
            Oleta.Tosi(a == b && Math.Abs(a.X) == 0.8 && Math.Abs(a.Y) == 0.6, $"{a}");
            var nul = LatausLiike.Suunta(null);
            Oleta.Tosi(Math.Abs(nul.X) == 0.8, "null kelpaa");
        }

        [Testi] static void AnkkurikoysiSeuraaKoria()
        {
            // Ankkuriköysi: kiintopiste maassa (taustassa), kiinnitys korin kerroksessa; korin heilahdus siirtää köyden yläpäätä,
            // riippuma tekee pienen kaaren (ohjauspiste köyden alapuolella), ei suoraa.
            var p = LatausLiike.Profiili.Oletus;
            double kaantoX = 200, kaantoY = 300, kiinX = 190, kiinY = 360;   // korin pohjan kulma 60 pt kääntöpisteen alla
            var maa = (X: 40.0, Y: 600.0);
            double maksSiirto = 0;
            var lepo = LatausLiike.Muunna(kiinX, kiinY, kaantoX, kaantoY, default);
            for (double t = 0; t < 8; t += 0.1)
            {
                var b = LatausLiike.Muunna(kiinX, kiinY, kaantoX, kaantoY, LatausLiike.Tila(p, t));
                maksSiirto = Math.Max(maksSiirto, Math.Abs(b.X - lepo.X) + Math.Abs(b.Y - lepo.Y));
                var c = LatausLiike.Ohjauspiste(maa.X, maa.Y, b.X, b.Y, 0.06);
                Oleta.Tosi(c.Y > (maa.Y + b.Y) / 2, "kaari alaspäin");
            }
            Oleta.Tosi(maksSiirto > 0.5 && maksSiirto < 5, $"yläpää liikkuu korin mukana vähäeleisesti: {maksSiirto:F2} pt");
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
