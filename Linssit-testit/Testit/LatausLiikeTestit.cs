// Latauskuvan liike (pohja LATAUSKUVA, omistaja 8.10.2026): vähäeleinen sinimuotoinen heilahdus ±0,5–0,75°, jakso 7–8 s, ei nykimistä;
// köysi seuraa liikkuvaa kerrosta. Kuumailmapallo tuulessa ja ankkuriköysi ketjukäyränä (omistaja 10.10. 16.5x).
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

        static void OletaPeittaa((double X, double Y, double L, double K) r, double w, double h, string mika)
        {
            Oleta.Tosi(r.X <= 1e-9 && r.Y <= 1e-9 && r.X + r.L >= w - 1e-9 && r.Y + r.K >= h - 1e-9,
                $"{mika}: {r.X:F1},{r.Y:F1} {r.L:F1}×{r.K:F1} ei peitä {w}×{h} (mustia palkkeja)");
        }

        [Testi] static void KiertoVaihtaaRajauksenJaPeittaa()
        {
            // iPad 11 (834 × 1194 pt) ja iPhone (393 × 852 pt) pysty ↔ vaaka: oikea rajaus ja peittävä sovitus ilman palkkeja.
            foreach (var (w, h, pysty) in new[] { (834.0, 1194.0, 1), (393.0, 852.0, 0) })
            {
                Oleta.Sama(pysty, LatausLiike.Rajausindeksi(w, h), $"pysty {w}×{h}");
                Oleta.Sama(2, LatausLiike.Rajausindeksi(h, w), $"vaaka {h}×{w}");
                // Kuvat: iPhone 9:19,5, iPad pysty 3:4, vaaka 4:3 (ylaOsuus 0,12 kuten pallo).
                double[] suhde = { 9 / 19.5, 3 / 4.0, 4 / 3.0 };
                OletaPeittaa(LatausLiike.Peita(w, h, suhde[pysty]), w, h, "pysty oma rajaus");
                OletaPeittaa(LatausLiike.Peita(h, w, suhde[2], 0.12), h, w, "vaaka oma rajaus");
                // Kierron hetki: vanha kuva uuteen kokoon, kunnes uusi rajaus on muistissa; sekin peittää.
                OletaPeittaa(LatausLiike.Peita(h, w, suhde[pysty], 0.12), h, w, "vaaka vanhalla kuvalla");
                OletaPeittaa(LatausLiike.Peita(w, h, suhde[2]), w, h, "pysty vanhalla kuvalla");
            }
            OletaPeittaa(LatausLiike.Peita(1366, 1024, double.NaN), 1366, 1024, "tuntematon kuvasuhde");
        }

        // TUULI (omistaja 10.10. 16.5x): pallo selkeästi tuulessa, kori seuraa, liike sileä.
        static readonly LatausLiike.Profiili Kupu = new LatausLiike.Profiili { Tuuli = true, KulmaAste = 2.5, SivuPt = 12, NousuPt = 4, JaksoS = 6, Puuska = 1 };
        static readonly LatausLiike.Profiili Kori = new LatausLiike.Profiili { Tuuli = true, KulmaAste = 1.6, SivuPt = 12, NousuPt = 3, JaksoS = 6, Puuska = 1, ViiveS = 0.25 };

        [Testi] static void TuuliHeiluttaaSelvasti()
        {
            double maksK = 0, maksS = 0;
            for (double t = 0; t < 60; t += 1.0 / 60)
            {
                var a = LatausLiike.Tila(Kupu, t);
                maksK = Math.Max(maksK, Math.Abs(a.KulmaAste)); maksS = Math.Max(maksS, Math.Abs(a.SivuPt));
            }
            Oleta.Tosi(maksK <= 2.5 + 1e-9 && maksK > 2.0, $"kallistus ±{maksK:F2}° (tavoite 2–3)");
            Oleta.Tosi(maksS <= 12 + 1e-9 && maksS > 9.6, $"sivuliike ±{maksS:F1} pt (tavoite 10–15)");
            // Puuskat: liike ei toistu täsmälleen perusjakson välein.
            var a0 = LatausLiike.Tila(Kupu, 2.0); var a1 = LatausLiike.Tila(Kupu, 8.0);
            Oleta.Tosi(Math.Abs(a0.SivuPt - a1.SivuPt) > 0.3, $"epäsäännöllinen: {a0.SivuPt:F2} / {a1.SivuPt:F2} pt");
            var q = new LatausLiike.Profiili { Tuuli = true, KulmaAste = 9, SivuPt = 40, JaksoS = 2, Puuska = 5, ViiveS = 9 }.Rajattu();
            Oleta.Tosi(q.KulmaAste == 3 && q.SivuPt == 15 && q.JaksoS == 5 && q.Puuska == 1 && q.ViiveS == 1.5, "tuulen rajat");
        }

        [Testi] static void TuuliEiNyi()
        {
            double dt = 1.0 / 30, maksK = 0, maksS = 0, maksKiihtyvyys = 0, edV = double.NaN;
            var e = LatausLiike.Tila(Kupu, 0);
            for (double t = dt; t < 60; t += dt)
            {
                var a = LatausLiike.Tila(Kupu, t);
                double v = (a.SivuPt - e.SivuPt) / dt;
                maksK = Math.Max(maksK, Math.Abs(a.KulmaAste - e.KulmaAste)); maksS = Math.Max(maksS, Math.Abs(a.SivuPt - e.SivuPt));
                if (!double.IsNaN(edV)) maksKiihtyvyys = Math.Max(maksKiihtyvyys, Math.Abs(v - edV) / dt);
                edV = v; e = a;
            }
            Oleta.Tosi(maksK < 0.2, $"kallistus enintään {maksK:F3}° / kehys");
            Oleta.Tosi(maksS < 1.0, $"sivuliike enintään {maksS:F2} pt / kehys");
            Oleta.Tosi(maksKiihtyvyys < 60, $"kiihtyvyys enintään {maksKiihtyvyys:F1} pt/s² (sileä)");
        }

        [Testi] static void KoriSeuraaPalloaViiveella()
        {
            // Sama tuuli 0,25 s myöhemmin: korin sivuliike = pallon sivuliike hetkellä t − 0,25.
            for (double t = 1; t < 20; t += 0.7)
            {
                double kori = LatausLiike.Tila(Kori, t).SivuPt, pallo = LatausLiike.Tila(Kupu, t - 0.25).SivuPt;
                Oleta.Tosi(Math.Abs(kori - pallo) < 1e-9, $"t {t:F1}: kori {kori:F2} / pallo {pallo:F2}");
            }
            double ero = 0;
            for (double t = 0; t < 30; t += 1.0 / 30) ero = Math.Max(ero, Math.Abs(LatausLiike.Tila(Kori, t).SivuPt - LatausLiike.Tila(Kupu, t).SivuPt));
            Oleta.Tosi(ero < 6, $"kori enintään {ero:F1} pt pallosta (köydet eivät veny näkyvästi)");
        }

        static double Pituus((double X, double Y)[] p)
        {
            double l = 0;
            for (int i = 1; i < p.Length; i++) l += Math.Sqrt((p[i].X - p[i - 1].X) * (p[i].X - p[i - 1].X) + (p[i].Y - p[i - 1].Y) * (p[i].Y - p[i - 1].Y));
            return l;
        }

        [Testi] static void KoysiJatkuuSumuunJaHaipyy()
        {
            // Omistaja 10.10. 17.5x: köysi jatkuu maapisteen ohi samaan suuntaan alemmas ja häipyy sumuun ilman näkyvää päätä.
            var j = LatausLiike.Jatke(0.51, 0.56, 0.34, 0.715, 0.80);
            Oleta.Tosi(Math.Abs(j.Y - 0.80) < 1e-9 && j.X < 0.34, $"jatke {j}");
            double kulma0 = Math.Atan2(0.715 - 0.56, 0.34 - 0.51), kulma1 = Math.Atan2(j.Y - 0.715, j.X - 0.34);
            Oleta.Tosi(Math.Abs(kulma0 - kulma1) < 1e-9, "sama suunta kuin korista maahan");
            Oleta.Tosi(LatausLiike.Jatke(0.51, 0.56, 0.34, 0.715, 0.70) == (0.34, 0.715), "maapiste jo alempana → ennallaan");
            Oleta.Tosi(LatausLiike.Haivytys(0.60, 0.70, 0.80) == 1 && LatausLiike.Haivytys(0.80, 0.70, 0.80) == 0
                       && LatausLiike.Haivytys(0.90, 0.70, 0.80) == 0, "täysi yllä, poissa alla");
            double edellinen = 1;
            for (double y = 0.70; y <= 0.80; y += 0.005)
            {
                double a = LatausLiike.Haivytys(y, 0.70, 0.80);
                Oleta.Tosi(a <= edellinen + 1e-12, $"häipyy alaspäin y {y:F3}");
                edellinen = a;
            }
            Oleta.Tosi(Math.Abs(LatausLiike.Haivytys(0.75, 0.70, 0.80) - 0.5) < 1e-9, "puolivälissä puoliksi");
            Oleta.Tosi(LatausLiike.Haivytys(0.9, 0.8, 0.8) == 1, "ei häivytystä ilman väliä");
        }

        [Testi] static void AnkkurikoysiRiippuuKetjukayrana()
        {
            // Maa (vasen alhaalla) → kori (oikea ylhäällä), y alas; köysi 5 % lepoetäisyyttä pidempi.
            double L = Math.Sqrt(120 * 120 + 300 * 300) * 1.05;
            var k = LatausLiike.Ketjukayra(0, 400, 120, 100, L, 200);
            Oleta.Tosi(k[0] == (0.0, 400.0) && k[k.Length - 1] == (120.0, 100.0), "päät kiinni");
            Oleta.Tosi(Math.Abs(Pituus(k) - L) < L * 0.002, $"pituus {Pituus(k):F1} / {L:F1}");
            // Painuma: köysi kulkee jänteen alapuolella (y suurempi) ja on aidosti kaareva.
            double suurin = 0;
            for (int i = 1; i < k.Length - 1; i++)
            {
                double u = (k[i].X - 0) / 120, jy = 400 + (100 - 400) * u;
                suurin = Math.Max(suurin, k[i].Y - jy);
            }
            Oleta.Tosi(suurin > 15, $"painuma {suurin:F1} pt jänteen alla");
            // Kori liikkuu 12 pt oikealle: köysi kiristyy (painuma pienenee), vasemmalle: löystyy.
            double Painuma(double bx)
            {
                var q = LatausLiike.Ketjukayra(0, 400, bx, 100, L, 200); double m = 0;
                for (int i = 1; i < q.Length - 1; i++) { double u = q[i].X / bx; m = Math.Max(m, q[i].Y - (400 - 300 * u)); }
                return m;
            }
            Oleta.Tosi(Painuma(132) < suurin && Painuma(108) > suurin, $"painuma seuraa koria: {Painuma(108):F1} > {suurin:F1} > {Painuma(132):F1}");
            var kirea = LatausLiike.Ketjukayra(0, 0, 100, 0, 90, 10);
            Oleta.Tosi(Math.Abs(kirea[5].Y) < 1e-9 && Math.Abs(kirea[5].X - 50) < 1e-9, "liian lyhyt köysi: suora");
            var pysty = LatausLiike.Ketjukayra(0, 300, 0, 0, 315, 50);
            Oleta.Tosi(pysty[0] == (0.0, 300.0) && pysty[50] == (0.0, 0.0) && !double.IsNaN(pysty[25].X), "pystysuora köysi ei hajoa");
            var oikealta = LatausLiike.Ketjukayra(120, 100, 0, 400, L, 50);
            Oleta.Tosi(oikealta[0] == (120.0, 100.0) && oikealta[50] == (0.0, 400.0), "suunta oikealta vasemmalle");
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
