// VALOKEILA (Ihmisen matka II, 25.9.2026): lat/lon → suunta, säde → kulma, kosinirajat, pehmennys, isoympyrä ja
// värilämpötila. Kartta/Valokeilalaskenta.cs; samat kaavat tileset-varjostimessa ja napakansissa.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ValokeilalaskentaTestit
    {
        static bool Lahella(double a, double b, double tol = 1e-9) => Math.Abs(a - b) <= tol;
        static double Pituus((double x, double y, double z) v) => Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

        [Testi]
        static void SuuntaAkselitOikein()
        {
            var nolla = Valokeilalaskenta.SuuntaEcef(0, 0);
            Oleta.Tosi(Lahella(nolla.x, 1) && Lahella(nolla.y, 0) && Lahella(nolla.z, 0), $"{nolla}");
            var ita = Valokeilalaskenta.SuuntaEcef(0, 90);
            Oleta.Tosi(Lahella(ita.y, 1, 1e-12) && Lahella(ita.x, 0, 1e-12), $"{ita}");
            var napa = Valokeilalaskenta.SuuntaEcef(90, 123);
            Oleta.Tosi(Lahella(napa.z, 1, 1e-12), $"{napa}");
        }

        [Testi]
        static void SuuntaOnYksikkoJaGeosentrinen()
        {
            // Pariisi 48,8566 N: geosentrinen leveys on ~0,19° pienempi kuin geodeettinen.
            var p = Valokeilalaskenta.SuuntaEcef(48.8566, 2.3522);
            Oleta.Tosi(Lahella(Pituus(p), 1, 1e-12), "yksikkö");
            double geosentrinen = Math.Asin(p.z) * 180 / Math.PI;
            Oleta.Tosi(geosentrinen < 48.8566 && geosentrinen > 48.8566 - 0.2, $"geosentrinen {geosentrinen:0.0000}");
            Oleta.Tosi(Lahella(Math.Atan2(p.y, p.x) * 180 / Math.PI, 2.3522, 1e-9), "pituus säilyy");
        }

        [Testi]
        static void SadeKulmaksi()
        {
            Oleta.Tosi(Lahella(Valokeilalaskenta.Kulma(Valokeilalaskenta.MaanSadeKm), 1.0), "R km = 1 rad");
            Oleta.Tosi(Lahella(Valokeilalaskenta.Kulma(500), 500 / 6371.0088), "500 km");
            Oleta.Sama(0.0, Valokeilalaskenta.Kulma(-5), "negatiivinen");
            Oleta.Sama(Math.PI, Valokeilalaskenta.Kulma(1e9), "yläraja π");
            Oleta.Sama(0.0, Valokeilalaskenta.Kulma(double.NaN), "NaN");
        }

        [Testi]
        static void RajatJaValo()
        {
            double k = Valokeilalaskenta.Kulma(600);
            var (sisa, ulko) = Valokeilalaskenta.Rajat(k, 0.5);
            Oleta.Tosi(ulko > sisa, "ulko > sisä");
            Oleta.Tosi(Lahella(ulko, 2 * Math.Sin(k / 2)) && Lahella(sisa, 2 * Math.Sin(k / 4)), "jänteet");
            // Keskellä ja sisärajan sisällä täysi valo, ulkorajalla ja sen takana pimeä, välissä monotoninen.
            Oleta.Sama(1.0, Valokeilalaskenta.Valo(0.0, sisa, ulko), "keskusta");
            Oleta.Sama(1.0, Valokeilalaskenta.Valo(Valokeilalaskenta.Janne(k * 0.49), sisa, ulko), "sisällä");
            Oleta.Sama(0.0, Valokeilalaskenta.Valo(Valokeilalaskenta.Janne(k), sisa, ulko), "reunalla");
            Oleta.Sama(0.0, Valokeilalaskenta.Valo(Valokeilalaskenta.Janne(k * 1.2), sisa, ulko), "ulkona");
            double edellinen = 1.0;
            for (int i = 0; i <= 20; i++)
            {
                double v = Valokeilalaskenta.Valo(Valokeilalaskenta.Janne(k * (0.5 + 0.5 * i / 20.0)), sisa, ulko);
                Oleta.Tosi(v <= edellinen + 1e-12, $"monotoninen {i}");
                edellinen = v;
            }
        }

        [Testi]
        static void TeravaReunaJaNollakulmaEivatRiko()
        {
            var (s0, u0) = Valokeilalaskenta.Rajat(0.1, 0.0);
            Oleta.Tosi(u0 > s0, "p = 0");
            var (s1, u1) = Valokeilalaskenta.Rajat(0.0, 0.5);
            Oleta.Tosi(u1 > s1 && !double.IsNaN(Valokeilalaskenta.Valo(0.0, s1, u1)), "kulma 0");
            var (s2, u2) = Valokeilalaskenta.Rajat(Math.PI, 1.0);
            Oleta.Sama(1.0, Valokeilalaskenta.Valo(0.0, s2, u2), "koko pallo, täysi pehmeys: keskusta");
            Oleta.Tosi(Valokeilalaskenta.Valo(Math.Sqrt(2), s2, u2) is > 0.1 and < 0.5, "koko pallo: 90° hämärtyvä");
        }

        [Testi]
        static void JanneOnTarkkaPienillaKulmilla()
        {
            // 5 km:n keila: jänne vektorierotuksesta floatina vastaa kulmaa ~1 m:n tarkkuudella (kosini ei).
            double k = Valokeilalaskenta.Kulma(5);
            var a = Valokeilalaskenta.SuuntaEcef(60, 25);
            var c = Valokeilalaskenta.SuuntaEcef(61, 25);
            var b = Valokeilalaskenta.Isoympyra(a, c, k / Math.Acos(Valokeilalaskenta.Piste(a, c)));
            float dx = (float)a.x - (float)b.x, dy = (float)a.y - (float)b.y, dz = (float)a.z - (float)b.z;
            double janneF = Math.Sqrt(dx * dx + dy * dy + dz * dz);
            Oleta.Tosi(Math.Abs(janneF - Valokeilalaskenta.Janne(k)) * Valokeilalaskenta.MaanSadeKm * 1000 < 2, $"jänne {janneF} vs {Valokeilalaskenta.Janne(k)}");
            Oleta.Tosi(Lahella(Valokeilalaskenta.Janne(Math.PI), 2), "vastapiste 2");
        }

        [Testi]
        static void KerroinHamarassa()
        {
            Oleta.Sama(1.0, Valokeilalaskenta.Kerroin(1.0, 1.0), "keilassa ennallaan");
            Oleta.Tosi(Lahella(Valokeilalaskenta.Kerroin(0.0, 1.0), 0.05), "hämäryys 1 lähes musta");
            Oleta.Sama(1.0, Valokeilalaskenta.Kerroin(0.0, 0.0), "hämäryys 0 ennallaan");
            Oleta.Tosi(Lahella(Valokeilalaskenta.Kerroin(0.5, 0.6), 1 - 0.57 * 0.5), "puolivälissä");
        }

        [Testi]
        static void PehmennysEaseInOut()
        {
            Oleta.Sama(0.0, Valokeilalaskenta.Pehmennys(0), "alku");
            Oleta.Sama(1.0, Valokeilalaskenta.Pehmennys(1), "loppu");
            Oleta.Tosi(Lahella(Valokeilalaskenta.Pehmennys(0.5), 0.5), "symmetria");
            Oleta.Sama(0.0, Valokeilalaskenta.Pehmennys(-1), "rajaus alas");
            Oleta.Sama(1.0, Valokeilalaskenta.Pehmennys(2), "rajaus ylös");
            // Ei lineaarinen: päissä nopeus ~0 (derivaatta ≈ 0), keskellä 1,875.
            double h = 1e-4;
            Oleta.Tosi(Valokeilalaskenta.Pehmennys(h) / h < 1e-6, "alussa lepo");
            Oleta.Tosi((1 - Valokeilalaskenta.Pehmennys(1 - h)) / h < 1e-6, "lopussa lepo");
            Oleta.Tosi(Lahella((Valokeilalaskenta.Pehmennys(0.5 + h) - Valokeilalaskenta.Pehmennys(0.5 - h)) / (2 * h), 1.875, 1e-6), "keskinopeus");
        }

        [Testi]
        static void IsoympyraPitaaPinnallaJaTasavauhtisena()
        {
            var a = Valokeilalaskenta.SuuntaEcef(60.17, 24.94);   // Helsinki
            var b = Valokeilalaskenta.SuuntaEcef(-33.87, 151.21); // Sydney
            double w = Math.Acos(Valokeilalaskenta.Piste(a, b));
            var alku = Valokeilalaskenta.Isoympyra(a, b, 0);
            var loppu = Valokeilalaskenta.Isoympyra(a, b, 1);
            Oleta.Tosi(Lahella(Valokeilalaskenta.Piste(alku, a), 1, 1e-12) && Lahella(Valokeilalaskenta.Piste(loppu, b), 1, 1e-12), "päät");
            for (int i = 1; i < 10; i++)
            {
                double e = i / 10.0;
                var p = Valokeilalaskenta.Isoympyra(a, b, e);
                Oleta.Tosi(Lahella(Pituus(p), 1, 1e-12), $"yksikkö {e}");
                // Isoympyrällä: kulmat päihin summautuvat koko kulmaksi ja jakautuvat e:n mukaan.
                double wa = Math.Acos(Math.Min(1, Valokeilalaskenta.Piste(a, p))), wb = Math.Acos(Math.Min(1, Valokeilalaskenta.Piste(p, b)));
                Oleta.Tosi(Lahella(wa + wb, w, 1e-9) && Lahella(wa, e * w, 1e-9), $"isoympyrä {e}: {wa} + {wb} ≠ {w}");
            }
        }

        [Testi]
        static void IsoympyraSamaJaVastapiste()
        {
            var a = Valokeilalaskenta.SuuntaEcef(10, 20);
            var s = Valokeilalaskenta.Isoympyra(a, a, 0.5);
            Oleta.Tosi(Lahella(Valokeilalaskenta.Piste(s, a), 1, 1e-12), "sama piste");
            var v = (-a.x, -a.y, -a.z);
            var puoli = Valokeilalaskenta.Isoympyra(a, v, 0.5);
            Oleta.Tosi(Lahella(Pituus(puoli), 1, 1e-12) && Math.Abs(Valokeilalaskenta.Piste(puoli, a)) < 1e-9, "vastapiste: 90° puolivälissä");
            Oleta.Tosi(Lahella(Valokeilalaskenta.Piste(Valokeilalaskenta.Isoympyra(a, v, 1), v), 1, 1e-9), "vastapiste: loppu");
        }

        [Testi]
        static void KelvinLyhty()
        {
            var (r, g, b) = Valokeilalaskenta.Kelvin(3200);
            Oleta.Tosi(Lahella(r, 1) && Lahella(g, 0.72, 0.01) && Lahella(b, 0.48, 0.01), $"3200 K = ({r:0.000}, {g:0.000}, {b:0.000})");
            var (r6, g6, b6) = Valokeilalaskenta.Kelvin(6600);
            Oleta.Tosi(r6 > 0.99 && g6 > 0.95 && b6 > 0.99, "6600 K lähes valkoinen");
            var (r1, _, b1) = Valokeilalaskenta.Kelvin(1500);
            Oleta.Tosi(r1 == 1 && b1 == 0, "1500 K ei sinistä");
        }
    }
}
