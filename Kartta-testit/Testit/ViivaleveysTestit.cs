// Löydös 46 jatko: pelaajan maan kehän leveys webin lain mukaan (Kartta/Viivaleveys.cs).
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ViivaleveysTestit
    {
        [Testi]
        static void PaatteetKuinWebissa()
        {
            Oleta.Tosi(Viivaleveys.KehaPt(0) == 1.6 && Viivaleveys.KehaPt(25) == 1.6, "kaukana 1,6");
            Oleta.Tosi(Viivaleveys.KehaPt(250) == 3.0 && Viivaleveys.KehaPt(1000) == 3.0, "lähellä 3");
            Oleta.Tosi(Math.Abs(Viivaleveys.KehaPt(137.5) - 2.3) < 1e-12, "puolivälissä 2,3");
            Oleta.Tosi(Viivaleveys.KehaPt(double.NaN) == 1.6, "NaN = ohuin pää");
        }

        [Testi]
        static void KreikanNakymaIpadilla()
        {
            // iPad Pro 11" pysty: 2 420 px, fov 50°, korkeus 1 200 km → 2 420 / (2 · 1 200 · tan 25°) px/km × 111,2 km/°.
            double tiheys = 2420.0 / (2.0 * 1200.0 * Math.Tan(25.0 * Math.PI / 180.0)) * 111.2;
            double pt = Viivaleveys.KehaPt(tiheys);
            Oleta.Tosi(tiheys > 235 && tiheys < 250 && pt > 2.8 && pt <= 3.0, $"tiheys {tiheys:0}, {pt:0.00} pt");
            Oleta.Tosi(Math.Abs(Viivaleveys.NakyvaLaitePx(pt, 2) - (2 * pt + 0.5)) < 1e-12, "laitepikselit");
        }

        [Testi]
        static void OhitusVoittaa()
        {
            Oleta.Tosi(Viivaleveys.KehaPt(240, 1.2) == 1.2, "kiinteä 1,2 pt");
            Oleta.Tosi(Viivaleveys.KehaPt(240, 0) == Viivaleveys.KehaPt(240), "0 = webin laki");
        }

        [Testi]
        static void RannikkoOnPuoletKehasta()
        {
            Oleta.Tosi(Viivaleveys.Pt(250, Viivaleveys.RannikkoKaukana, Viivaleveys.RannikkoLahella) == 1.2, "rannikko 1,2");
        }
        [Testi]
        static void AluerajatVastaMaanakymasta()
        {
            // Löydös 74 d: iPhonen avaruuspallo (halkaisija ~560 laitepikseliä) = säde 280 px → keskellä 280 · π/180 ≈ 4,9 px/°.
            double avaruus = 280.0 * Math.PI / 180.0;
            double raja = Vektorisolut.RajatTiheys;
            Oleta.Tosi(raja == 30, "web VEKTORIT_RAJAT_PX_ASTE 30");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, avaruus, raja, 1f) == 0f, "avaruudessa piilossa");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(1f, true, avaruus, raja, 1f) == 0f, "loitonnus häivyttää pois");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, 30, raja, 1f) == 1f, "maanäkymässä näkyvissä");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, double.NaN, raja, 1f) == 0f, "NaN = kaukana");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(1f, false, 240, raja, 1f) == 0f, "linssissä pois");
            Oleta.Tosi(Viivaleveys.AluerajaHaive(0f, true, 0, 0, 0f, 0f) == 1f, "raja 0 ja kesto 0 = heti näkyvissä");
        }

        [Testi]
        static void AluerajojenHaiveKuinWebissa()
        {
            // Web VEKTORIT_HAIVE_MS 260: puolivälissä 0,13 s:n jälkeen, perillä 0,26 s:ssa, ei yli.
            float h = 0f;
            for (int i = 0; i < 13; i++) h = Viivaleveys.AluerajaHaive(h, true, 100, 30, 0.01f);
            Oleta.Tosi(Math.Abs(h - 0.5f) < 1e-3f, "puolivälissä " + h);
            for (int i = 0; i < 20; i++) h = Viivaleveys.AluerajaHaive(h, true, 100, 30, 0.01f);
            Oleta.Tosi(h == 1f, "perillä " + h);
            h = Viivaleveys.AluerajaHaive(h, true, 10, 30, 0.13f);
            Oleta.Tosi(Math.Abs(h - 0.5f) < 1e-3f, "ulos samaa tahtia " + h);
            Oleta.Tosi(Viivaleveys.AluerajaHaive(float.NaN, true, 100, 30, -1f) == 0f, "NaN ja negatiivinen dt eivät liikuta");
        }
    
        // ---- Maakuntarajat (löydös 113): webin nimiötason rasteri ----

        [Testi]
        static void AluerajaTasoKuinWebinPallossa()
        {
            // js/pallolaatat.js lepokerroksenTaso: matalin taso, jonka px/° ≥ tiheys (z6 120, z7 240, z8 480).
            Oleta.Sama(5, Viivaleveys.AluerajaTaso(60));
            Oleta.Sama(6, Viivaleveys.AluerajaTaso(61));
            Oleta.Sama(7, Viivaleveys.AluerajaTaso(142));
            Oleta.Sama(8, Viivaleveys.AluerajaTaso(615));
            Oleta.Sama(0.0, Viivaleveys.AluerajaLaitePx(50, 46), "alle z6:n ei viivaa");
        }

        [Testi]
        static void AluerajaMitatutNakymat()
        {
            // 2-provence.jpg: tiheys ~615, 44° → z8: 2,2 · 615 · cos 44° / 480 ≈ 2,0 laitepx (mitattu ~2,4).
            double p = Viivaleveys.AluerajaLaitePx(615, 44);
            Oleta.Tosi(p > 1.9 && p < 2.1, $"Provence {p:0.00}");
            // 1-ranska.jpg: tiheys ~142, 46,4° → z7: 1,5 · 142 · cos / 240 ≈ 0,61 (puhelimen laattakatto antoi z6:n ~0,8–1,0).
            p = Viivaleveys.AluerajaLaitePx(142, 46.35);
            Oleta.Tosi(p > 0.55 && p < 0.7, $"Ranska {p:0.00}");
            // Peitto: seepia 0,45 täytön (0,34) alla = 0,297 sRGB; lineaarisena suurempi, silti alle vanhan 0,55.
            Oleta.Tosi(Math.Abs(Viivaleveys.AluerajaPeittoWeb - 0.297) < 1e-9, "web 0,297");
            Oleta.Tosi(Viivaleveys.AluerajaPeittoNatiivi > 0.297 && Viivaleveys.AluerajaPeittoNatiivi < 0.55,
                $"natiivi {Viivaleveys.AluerajaPeittoNatiivi:0.000}");
            Console.WriteLine($"      maakuntaraja: peitto web {Viivaleveys.AluerajaPeittoWeb:0.000} → natiivi {Viivaleveys.AluerajaPeittoNatiivi:0.000}");
        }

        [Testi]
        static void AluerajaPiirtoSailyttaaPeiton()
        {
            // Rajaviiva: puolileveys px = pt·k/2 + 0,75, alfa = saturate(px − |d|); ∫ alfa = laitePx.
            foreach (double w in new[] { 0.3, 0.6, 0.8, 1.0, 2.0, 3.2 })
                foreach (double k in new[] { 2.0, 3.0 })
                {
                    var (pt, a) = Viivaleveys.AluerajaPiirto(w, k);
                    double px = 0.5 * pt * k + 0.75, integraali = 0;
                    for (double d = -5; d <= 5; d += 0.0005) integraali += a * Math.Max(0, Math.Min(1, px - Math.Abs(d))) * 0.0005;
                    Oleta.Tosi(Math.Abs(integraali - w) < 0.01 && pt >= 0, $"w {w} k {k}: pt {pt:0.000} alfa {a:0.00} → {integraali:0.000}");
                }
        }

        // ---- Kehän paino (löydös 127: "raja joka tapauksessa kevyempi") ----

        [Testi]
        static void KehanPainotKevyemmatKuinWeb()
        {
            var W = Viivaleveys.KehanPaino.Web; var K = Viivaleveys.KehanPaino.Kevyt; var KK = Viivaleveys.KehanPaino.Kevein;
            Oleta.Tosi(Viivaleveys.KehaPt(0, double.NaN, K) == 1.0 && Viivaleveys.KehaPt(1000, double.NaN, K) == 1.8, "kevyt 1,0–1,8");
            Oleta.Tosi(Viivaleveys.KehaPt(0, double.NaN, KK) == 0.8 && Viivaleveys.KehaPt(1000, double.NaN, KK) == 1.2, "kevein 0,8–1,2");
            Oleta.Tosi(Viivaleveys.KehaPt(240) == Viivaleveys.KehaPt(240, double.NaN, W), "oletus = web");
            Oleta.Tosi(Viivaleveys.KehaPt(240, 1.2, K) == 1.2, "kiinteä leveys ohittaa painon");
            for (double t = 0; t <= 300; t += 10)
            {
                double web = Viivaleveys.KehaPt(t, double.NaN, W) * Viivaleveys.KehaPeitto(W);
                double kevyt = Viivaleveys.KehaPt(t, double.NaN, K) * Viivaleveys.KehaPeitto(K);
                double kevein = Viivaleveys.KehaPt(t, double.NaN, KK) * Viivaleveys.KehaPeitto(KK);
                double raja = Viivaleveys.Pt(t, Viivaleveys.RajaKaukana, Viivaleveys.RajaLahella);
                // Mustetta (leveys × peitto) vähemmän kuin webin korostuksessa, mutta viiva yhä leveämpi kuin naapurien raja.
                Oleta.Tosi(kevein < kevyt && kevyt < 0.55 * web, $"tiheys {t}: muste {web:0.00} / {kevyt:0.00} / {kevein:0.00}");
                Oleta.Tosi(Viivaleveys.KehaPt(t, double.NaN, KK) > raja, $"tiheys {t}: kevein {Viivaleveys.KehaPt(t, double.NaN, KK):0.00} > raja {raja:0.00}");
            }
            Oleta.Tosi(Viivaleveys.KehaPeittoNatiivi(W) == 1.0, "täysi peitto pysyy");
            double kn = Viivaleveys.KehaPeittoNatiivi(K), kkn = Viivaleveys.KehaPeittoNatiivi(KK);
            Oleta.Tosi(kn >= 0.8 && kn < 1 && kkn >= 0.6 && kkn < kn, $"natiivi {kn:0.000} / {kkn:0.000}");
            Console.WriteLine($"      kehä: kevyt peitto 0,8 → natiivi {kn:0.000}, kevein 0,6 → {kkn:0.000}");
        }

        [Testi]
        static void KehanPainoKomennosta()
        {
            Oleta.Tosi(Viivaleveys.LueKehanPaino("web", out var p) && p == Viivaleveys.KehanPaino.Web, "web");
            Oleta.Tosi(Viivaleveys.LueKehanPaino("nykyinen", out p) && p == Viivaleveys.KehanPaino.Web, "nykyinen = web");
            Oleta.Tosi(Viivaleveys.LueKehanPaino("kevyt", out p) && p == Viivaleveys.KehanPaino.Kevyt, "kevyt");
            Oleta.Tosi(Viivaleveys.LueKehanPaino("kevein", out p) && p == Viivaleveys.KehanPaino.Kevein, "kevein");
            Oleta.Tosi(!Viivaleveys.LueKehanPaino("paksu", out _), "tuntematon");
        }

        [Testi]
        static void OletusrajatIlmanTayttoaWebinRasterinPeitolla()
        {
            // Löydös 113 jatko: webin rasteriraja 0,45; pallomaakuntien täyttö (0,34) himmentää sen 0,297:ään vain täytön kanssa.
            Oleta.Tosi(Viivaleveys.AluerajaPeitto(false, false) == 0.45, "ilman täyttöä web 0,45");
            Oleta.Tosi(Viivaleveys.AluerajaPeitto(true, false) == Viivaleveys.AluerajaPeittoWeb, "täytön kanssa 0,297");
            double ilman = Viivaleveys.AluerajaPeitto(false, true), kanssa = Viivaleveys.AluerajaPeitto(true, true);
            Oleta.Tosi(ilman > kanssa && ilman >= 0.45 && ilman < 1, $"natiivi ilman {ilman:0.000} > kanssa {kanssa:0.000}");
            Console.WriteLine($"      maakuntaraja ilman täyttöä: web 0,45 → natiivi {ilman:0.000} (täytön kanssa {kanssa:0.000})");
        }
    }
}
