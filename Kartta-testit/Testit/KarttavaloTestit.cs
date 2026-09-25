// LÖYDÖS 46 (build 11 → 12): rinnevalon kompensointi (tasamaan sävy ennallaan) ja horisonttiusvan geometria
// (webin raja 0,6 × korkeus, kallistuksen katto). Kartta/Karttavalo.cs ja Kartta/Horisonttiusva.cs.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class KarttavaloTestit
    {
        const double R = 6371000.0;
        const double A0 = 0.45;   // build 11:n ambientin punainen kanava (Rakennus.cs), harmaana riittää kaavalle
        const double Fii = 25.0;  // pystysuuntainen puolikuvakulma (fieldOfView 50°)

        static bool Lahella(double a, double b, double tol = 1e-9) => Math.Abs(a - b) <= tol;

        // ---- Valo ----

        [Testi]
        static void VanhaSuoraOnBuild11nKameravalo()
        {
            Oleta.Tosi(Lahella(Karttavalo.VanhaSuora, 1.1 * 0.98481 * 0.96593, 1e-4), $"D0 {Karttavalo.VanhaSuora:0.00000}");
        }

        [Testi]
        static void TasamaaSamaKaikillaKulmillaJaVoimilla()
        {
            double vanha = A0 + Karttavalo.VanhaSuora;
            foreach (double korkeus in new[] { 15.0, 25.0, 35.0, 45.0, 60.0, 90.0 })
            foreach (double voima in new[] { 0.5, 0.85, 1.0, 1.3 })
            {
                double nl = Math.Sin(korkeus * Math.PI / 180.0);
                var (i, lisa) = Karttavalo.Kompensoi(nl, voima);
                double uusi = Karttavalo.Kirkkaus(A0, i, lisa, nl);
                Oleta.Tosi(Lahella(uusi, vanha, 1e-12), $"korkeus {korkeus} voima {voima}: {uusi} ≠ {vanha}");
            }
        }

        [Testi]
        static void OletusvoimaEiMuutaAmbienttia()
        {
            var (i, lisa) = Karttavalo.Kompensoi(Math.Sin(Karttavalo.OletusKorkeus * Math.PI / 180.0));
            Oleta.Tosi(lisa == 0.0, $"lisäys {lisa}");
            Oleta.Tosi(Lahella(i, Karttavalo.VanhaSuora / Math.Sin(35.0 * Math.PI / 180.0), 1e-12), $"I {i}");
            Oleta.Tosi(i > 1.8 && i < 1.85, $"I {i:0.000} (odotettu ≈ 1,82)");
        }

        [Testi]
        static void KameravaloYlhaaltaOnBuild11()
        {
            // Pallon mittakaavassa valo palaa kameraan: N·L = VanhaNL → täsmälleen I = 1,1 ja ambientti ennallaan.
            var (i, lisa) = Karttavalo.Kompensoi(Karttavalo.VanhaNL, 1.0);
            Oleta.Tosi(Lahella(i, 1.1, 1e-12) && lisa == 0.0, $"I {i}, lisäys {lisa}");
        }

        [Testi]
        static void RinteetVaalenevatJaTummuvat()
        {
            // 10° rinne auringon puolella ja poispäin, aurinko 35°: N·L = sin(35 ± 10).
            double nl = Math.Sin(35.0 * Math.PI / 180.0);
            var (i, lisa) = Karttavalo.Kompensoi(nl);
            double tasa = Karttavalo.Kirkkaus(A0, i, lisa, nl);
            double valo = Karttavalo.Kirkkaus(A0, i, lisa, Math.Sin(45.0 * Math.PI / 180.0));
            double varjo = Karttavalo.Kirkkaus(A0, i, lisa, Math.Sin(25.0 * Math.PI / 180.0));
            Oleta.Tosi(valo > tasa * 1.1 && varjo < tasa * 0.9, $"tasa {tasa:0.000}, valo {valo:0.000}, varjo {varjo:0.000}");
            // Vanha kameravalo: sama rinne ±10° näkymän akselista muuttaa kirkkautta alle 2 %.
            double vanha = A0 + 1.1 * Karttavalo.VanhaNL;
            double vanhaRinne = A0 + 1.1 * Math.Cos((18.0 + 10.0) * Math.PI / 180.0);
            Oleta.Tosi(Math.Abs(vanhaRinne / vanha - 1.0) < 0.1, "vanha kameravalo ei muotoile");
        }

        [Testi]
        static void PehmeampiVoimaNostaaVarjonPohjaa()
        {
            double nl = Math.Sin(35.0 * Math.PI / 180.0);
            var (_, lisa1) = Karttavalo.Kompensoi(nl, 1.0);
            var (_, lisa2) = Karttavalo.Kompensoi(nl, 0.8);
            Oleta.Tosi(lisa2 > lisa1, "voima 0,8 kasvattaa ambienttia");
            Oleta.Tosi(Lahella(lisa2, 0.2 * Karttavalo.VanhaSuora, 1e-12), $"lisäys {lisa2}");
        }

        [Testi]
        static void MatalaAurinkoRajataan()
        {
            var (i, _) = Karttavalo.Kompensoi(0.0);
            Oleta.Tosi(double.IsFinite(i) && Lahella(i, Karttavalo.VanhaSuora / Karttavalo.PieninNL, 1e-12), $"I {i}");
        }

        [Testi]
        static void AuringonSuuntaLuoteesta()
        {
            var (e, n, u) = Karttavalo.Suunta(315.0, 35.0);
            Oleta.Tosi(e < 0 && n > 0 && Lahella(-e, n, 1e-12), $"luode: itä {e}, pohjoinen {n}");
            Oleta.Tosi(Lahella(u, Math.Sin(35.0 * Math.PI / 180.0), 1e-12), "korkeus");
            Oleta.Tosi(Lahella(e * e + n * n + u * u, 1.0, 1e-12), "yksikkövektori");
        }

        [Testi]
        static void OsuusHaipyyPallonMittakaavassa()
        {
            Oleta.Tosi(Karttavalo.Osuus(1_200_000) == 1.0, "Kreikka 1 200 km täysi");
            Oleta.Tosi(Karttavalo.Osuus(Karttavalo.TaysiM) == 1.0, "täysi rajalla");
            Oleta.Tosi(Karttavalo.Osuus(Karttavalo.NollaM) == 0.0, "nolla rajalla");
            Oleta.Tosi(Karttavalo.Osuus(14_000_000) == 0.0, "koko pallo");
            double v = Karttavalo.Osuus(6_000_000);
            Oleta.Tosi(v > 0 && v < 1, $"välissä {v}");
        }

        // ---- Horisonttiusva ----

        [Testi]
        static void YlhaaltaRajaOnRuudunYlapuolella()
        {
            // Kallistus 0: raja 0,6 · d vaakasuunnassa, kamera d:n korkeudella → tan⁻¹(0,6) = 31° > 25°.
            double y = Horisonttiusva.RajanRuutuY(1_000_000, 0, Fii, R);
            Oleta.Tosi(y > 1.0, $"y {y:0.000}");
        }

        [Testi]
        static void RajaLaskeeKallistuksenKasvaessa()
        {
            double edellinen = double.MaxValue;
            for (double a = 0; a <= 85; a += 5)
            {
                double y = Horisonttiusva.RajanRuutuY(1_000_000, a, Fii, R);
                Oleta.Tosi(y < edellinen, $"α {a}: y {y:0.000} ≥ {edellinen:0.000}");
                edellinen = y;
            }
        }

        [Testi]
        static void Webin30AsteenRajaVastaaTasomallia()
        {
            // Tasomalli (pieni d): β = atan((0,6 + sin α) / cos α), y = tan(β − α) / tan φ. 30°: y ≈ 0,857.
            double a = 30.0 * Math.PI / 180.0;
            double beta = Math.Atan((0.6 + Math.Sin(a)) / Math.Cos(a));
            double odotus = Math.Tan(beta - a) / Math.Tan(Fii * Math.PI / 180.0);
            double y = Horisonttiusva.RajanRuutuY(1_000, 30, Fii, R);
            Oleta.Tosi(Lahella(y, odotus, 1e-4), $"y {y:0.0000}, taso {odotus:0.0000}");
        }

        [Testi]
        static void KattoNoin55Astetta()
        {
            foreach (double d in new[] { 200_000.0, 1_000_000.0, 1_500_000.0 })
            {
                double k = Horisonttiusva.KallistusKatto(d, Fii, R);
                Oleta.Tosi(k > 50 && k < 60, $"d {d}: katto {k:0.0}°");
                Oleta.Tosi(Math.Abs(Horisonttiusva.RajanRuutuY(d, k, Fii, R) - Horisonttiusva.RajanY) < 1e-6, "raja kohdallaan");
            }
        }

        [Testi]
        static void KattoKunnioittaaMaksimia()
        {
            // Löysä raja (y ≥ −5) sallii kaiken: katto = max.
            Oleta.Tosi(Horisonttiusva.KallistusKatto(1_000_000, Fii, R, 40.0, rajanY: -5) == 40.0, "max");
        }

        [Testi]
        static void SumuAlkaaRajanEdessaJaLoppuuRajalle()
        {
            double d = 1_000_000;
            var (alku, loppu) = Horisonttiusva.Sumu(d, 45, Fii, R);
            Oleta.Tosi(alku > 0 && alku < loppu, $"alku {alku:0}, loppu {loppu:0}");
            Oleta.Tosi(loppu > d, $"raja keskipisteen takana: {loppu:0} > {d}");
            // Rajan syvyys = sen ruutupaikan säteen osumasyvyys.
            double y = Horisonttiusva.RajanRuutuY(d, 45, Fii, R);
            double s = Horisonttiusva.SyvyysRuudulla(d, 45, Fii, R, y);
            Oleta.Tosi(Math.Abs(s - loppu) < 1.0, $"osuma {s:0.0}, raja {loppu:0.0}");
        }

        [Testi]
        static void KeskipisteenSyvyysOnEtaisyys()
        {
            foreach (double a in new[] { 0.0, 30.0, 60.0 })
            {
                double s = Horisonttiusva.SyvyysRuudulla(800_000, a, Fii, R, 0.0);
                Oleta.Tosi(Math.Abs(s - 800_000) < 1e-3, $"α {a}: {s}");
            }
        }

        [Testi]
        static void TaivasOnAareton()
        {
            // 80° kallistus 1 000 km:n etäisyydellä: ruudun yläreunan säde menee pallon ohi.
            double s = Horisonttiusva.SyvyysRuudulla(1_000_000, 80, Fii, R, 1.0);
            Oleta.Tosi(double.IsPositiveInfinity(s), $"syvyys {s}");
        }

        [Testi]
        static void VahvuusKuinWebissa()
        {
            Oleta.Tosi(Horisonttiusva.Vahvuus(0) == 0 && Horisonttiusva.Vahvuus(4) == 0.5 && Horisonttiusva.Vahvuus(30) == 1, "min(1, kulma / 8)");
        }
    }
}
