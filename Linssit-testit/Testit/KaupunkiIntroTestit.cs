// Pariisin nykyintro (docs/kohtaukset/pallokierros/pariisi-nykyintro.md; PT 9.10.2026: 31 s, C1–C5, nyt-rivi nousussa): aikajana,
// leikkaukset tahdin iskuille (124 bpm ±50 ms), nyt-rivi 15,5 s, C5:n puuttuessa kova leikkaus, ohitus kohtaukseen 7, avaus 33,5 s.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiIntroTestit
    {
        static readonly Func<int, bool> Kaikki = n => true;

        [Testi] static void VainPariisi()
        {
            Oleta.Tosi(KaupunkiIntro.OnIntro("pariisi") && KaupunkiIntro.OnIntro("Pariisi"));
            foreach (var k in new[] { "tukholma", "rooma", "lontoo", null, "" }) Oleta.Tosi(!KaupunkiIntro.OnIntro(k), "ei introa: " + k);
        }

        [Testi] static void LeikkauksetTahdinIskuilleJaKasikirjoituksenAjoille()
        {
            // Kuvakäsikirjoituksen taulukon ajat (s) kohtausten 2–7 alussa.
            double[] kasikirjoitus = { 7.7, 15.5, 19.4, 23.2, 27.1, 31.0 };
            var o = KaupunkiIntro.Otokset;
            for (int i = 1; i <= 6; i++)
            {
                double a = o[i].AlkuS;
                double tahdit = a / KaupunkiIntro.TahtiS;
                Oleta.Tosi(Math.Abs(tahdit - Math.Round(tahdit)) * KaupunkiIntro.TahtiS < 0.05, $"otos {o[i].Nro} {a:F3} s tahdin alussa");
                Oleta.Tosi(Math.Abs(a - kasikirjoitus[i - 1]) <= 0.05, $"otos {o[i].Nro} {a:F3} s ≈ {kasikirjoitus[i - 1]} s");
                Oleta.Tosi(Math.Abs(o[i - 1].LoppuS - a) < 1e-9, $"otos {o[i - 1].Nro} päättyy samalla iskulla kuin {o[i].Nro} alkaa");
            }
            Oleta.Tosi(Math.Abs(KaupunkiIntro.IskuS - 60.0 / 124) < 1e-12 && Math.Abs(KaupunkiIntro.Tahti(2) - 3.871) < 0.001, "2 tahtia ≈ 3,87 s");
            Oleta.Tosi(Math.Abs(KaupunkiIntro.SiirtymaS - KaupunkiIntro.MusiikinKatkoS) <= 0.05, "siirtymä vanhaan musiikin katkon kohdalla");
        }

        [Testi] static void OtostenLajitJaKuvat()
        {
            var odotettu = new (double t, int otos, IntroLaji laji, int kuva)[]
            {
                (1.0, 1, IntroLaji.Avausnakyma, 0), (10.0, 2, IntroLaji.Kuva, 1), (17.0, 3, IntroLaji.Eiffel, 0), (21.0, 4, IntroLaji.Kuva, 2),
                (25.0, 5, IntroLaji.Kuva, 3), (29.0, 6, IntroLaji.Kuva, 4), (31.2, 7, IntroLaji.Avausnakyma, 0), (34.0, 8, IntroLaji.Kuva, 5),
                (36.5, 9, IntroLaji.Kuva, 5),
            };
            foreach (var (t, otos, laji, kuva) in odotettu)
            {
                var s = KaupunkiIntro.Tila(t, Kaikki, true);
                Oleta.Sama(otos, s.Otos, $"t {t}"); Oleta.Sama(laji, s.Laji, $"t {t}"); Oleta.Sama(kuva, s.Kuva, $"t {t}");
                Oleta.Tosi(!s.Ohi, $"t {t} ei ohi");
            }
            var loppu = KaupunkiIntro.Tila(38.0, Kaikki, true);
            Oleta.Tosi(loppu.Ohi && loppu.Kuva == 0, "38,0 s: paluu 3D-avausnäkymään, kuvakerros pois");
        }

        [Testi] static void C5RistihaivytysJaPaluu()
        {
            Oleta.Sama(0.0, KaupunkiIntro.Tila(31.4, Kaikki, true).Alfa, "31,4 s: vielä 3D");
            var puoli = KaupunkiIntro.Tila((KaupunkiIntro.C5AlkaaS + KaupunkiIntro.C5TaysiS) / 2, Kaikki, true);
            Oleta.Tosi(puoli.Kuva == 5 && Math.Abs(puoli.Alfa - 0.5) < 1e-9, $"häivytyksen puoliväli {puoli.Alfa:F2}");
            Oleta.Tosi(Math.Abs(KaupunkiIntro.C5TaysiS - KaupunkiIntro.C5AlkaaS - 1.5) < 1e-9, "ristihäivytys 1,5 s");
            Oleta.Sama(1.0, KaupunkiIntro.Tila(33.0, Kaikki, true).Alfa, "33,0 s: C5 täysi");
            var paluu = KaupunkiIntro.Tila(37.0, Kaikki, true);
            Oleta.Tosi(paluu.Kuva == 5 && Math.Abs(paluu.Alfa - 0.5) < 1e-9, $"paluun puoliväli {paluu.Alfa:F2}");
            // Ei hyppyä alfassa 30,9 → 38,1 s.
            double ed = KaupunkiIntro.Tila(30.9, Kaikki, true).Alfa;
            for (double t = 30.9; t < 38.1; t += 1.0 / 60)
            {
                double a = KaupunkiIntro.Tila(t, Kaikki, true).Alfa;
                if (t > KaupunkiIntro.SiirtymaS + 0.02) Oleta.Tosi(Math.Abs(a - ed) < 0.03, $"alfa hyppää {t:F2} s: {ed:F3} → {a:F3}");
                ed = a;
            }
        }

        [Testi] static void IlmanC5KovaLeikkausJaAvaus31_5()
        {
            var s = KaupunkiIntro.Tila(31.0, n => n != 5, false);
            Oleta.Tosi(s.Ohi && s.Kuva == 0 && s.Laji == IntroLaji.Avausnakyma, "31,0 s: kova leikkaus 3D-avausnäkymään");
            var ennen = KaupunkiIntro.Tila(30.9, n => n != 5, false);
            Oleta.Tosi(!ennen.Ohi && ennen.Kuva == 4 && ennen.Alfa == 1, "30,9 s: C4 täysin näkyvissä (ei häivytystä)");
            Oleta.Sama(31.5, KaupunkiIntro.AvausAlkaa(false));
            Oleta.Tosi(Math.Abs(KaupunkiIntro.Loppu(false) - KaupunkiIntro.SiirtymaS) < 1e-9, "intro päättyy siirtymään");
            Oleta.Tosi(KaupunkiIntro.Tila(34.0, n => n != 5, false).Ohi, "ei C5:tä myöhemminkään");
        }

        [Testi] static void PuuttuvaKuvaNaytetaanAvausnakymana()
        {
            var s = KaupunkiIntro.Tila(21.0, n => n != 2, true);
            Oleta.Tosi(s.Laji == IntroLaji.Avausnakyma && s.Kuva == 0 && !s.Ohi, "C2 ei latautunut → 3D-avausnäkymä");
            Oleta.Sama(1, KaupunkiIntro.Tila(10.0, n => n == 1, true).Kuva, "C1 ladattu näkyy");
        }

        [Testi] static void NytRiviNousussa()
        {
            Oleta.Tosi(Math.Abs(KaupunkiIntro.NytRiviS - 15.5) <= 0.05, $"nyt-rivi {KaupunkiIntro.NytRiviS:F3} s");
            Oleta.Sama(KaupunkiIntro.NousuS, KaupunkiIntro.NytRiviS);
            Oleta.Sama(3, KaupunkiIntro.Tila(KaupunkiIntro.NytRiviS, Kaikki, true).Otos, "nousu = Eiffel-otos");
        }

        [Testi] static void OhitusKohtaukseen7()
        {
            foreach (var t in new[] { 0.0, 3.0, 15.5, 29.9 })
            {
                double u = KaupunkiIntro.Ohita(t);
                Oleta.Sama(KaupunkiIntro.SiirtymaS, u, $"ohitus {t} s");
                Oleta.Sama(7, KaupunkiIntro.Tila(u, Kaikki, true).Otos, $"ohitus {t} s → otos 7");
            }
            Oleta.Sama(34.0, KaupunkiIntro.Ohita(34.0), "siirtymässä ohitus ei siirrä");
        }

        [Testi] static void AvausAlkaa33_5()
        {
            Oleta.Sama(33.5, KaupunkiIntro.AvausAlkaa(true));
            Oleta.Tosi(KaupunkiIntro.AvausAlkaa(true) > KaupunkiIntro.C5TaysiS && KaupunkiIntro.AvausAlkaa(true) < KaupunkiIntro.PaluuAlkaaS, "isoisän teksti C5:n aikana");
            Oleta.Sama(8, KaupunkiIntro.Tila(33.5, Kaikki, true).Otos);
            Oleta.Tosi(KaupunkiIntro.HidasAlkaaS > KaupunkiIntro.MusiikinKatkoS && KaupunkiIntro.HidasAlkaaS < KaupunkiIntro.AvausS, "hidas teema ennen isoisää");
        }

        [Testi] static void KenBurnsEnintaan5Prosenttia()
        {
            foreach (var o in KaupunkiIntro.Otokset)
            {
                if (o.Laji != IntroLaji.Kuva) continue;
                foreach (var r in new[] { o.KbAlku, o.KbLoppu })
                {
                    Oleta.Tosi(r.Skaala >= 1 && r.Skaala <= KaupunkiIntro.KbMaks + 1e-9, $"otos {o.Nro} skaala {r.Skaala}");
                    Oleta.Tosi(r.AnkkuriX >= 0 && r.AnkkuriX <= 1 && r.AnkkuriY >= 0 && r.AnkkuriY <= 1, $"otos {o.Nro} ankkuri");
                }
            }
            var c4 = KaupunkiIntro.Otokset[5];
            Oleta.Tosi(c4.Kuva == 4 && Math.Max(c4.KbAlku.Skaala, c4.KbLoppu.Skaala) <= 1.05, "C4 ≤ 5 %");
            // Liike näkyy (ei pysähtynyttä kuvaa) ja on jatkuva otoksen sisällä.
            var a = KaupunkiIntro.Tila(8.0, Kaikki, true).Rajaus; var b = KaupunkiIntro.Tila(15.0, Kaikki, true).Rajaus;
            Oleta.Tosi(b.Skaala > a.Skaala, "C1 sisään");
            var c = KaupunkiIntro.Tila(28.0, Kaikki, true).Rajaus; var d = KaupunkiIntro.Tila(30.5, Kaikki, true).Rajaus;
            Oleta.Tosi(d.Skaala < c.Skaala, "C4 ulos");
        }

        [Testi] static void EiffelOtosLiukuuJaEsiladataan()
        {
            var a = KaupunkiIntro.EiffelKulma(0, double.NaN); var b = KaupunkiIntro.EiffelKulma(1, 35);
            Oleta.Tosi(a.Suuntima < b.Suuntima && Math.Abs((a.Suuntima + b.Suuntima) / 2 - 134) < 1, "liuku Trocadéron suunnasta (134°) molemmin puolin");
            Oleta.Tosi(Math.Abs(a.KatseKorkeusM - (KaupunkiIntro.EiffelMaaArvioM + KaupunkiIntro.EiffelKatseM)) < 1e-9, "maa-arvio, kun korkeusmalli puuttuu");
            Oleta.Tosi(Math.Abs(b.KatseKorkeusM - (35 + KaupunkiIntro.EiffelKatseM)) < 1e-9);
            var m0 = KaupunkiIntro.EiffelKulma(0.02, 79); var m1 = KaupunkiIntro.EiffelKulma(0.5, 79);
            Oleta.Tosi(m1.Suuntima - m0.Suuntima > 5 * (m0.Suuntima - a.Suuntima), "pehmeä alku");
            Oleta.Tosi(KaupunkiIntro.EiffelEsilataus(0) && KaupunkiIntro.EiffelEsilataus(19.0) && !KaupunkiIntro.EiffelEsilataus(19.5), "esilataus otoksen loppuun");
            Oleta.Sama(0.5, Math.Round(KaupunkiIntro.EiffelOsuus((KaupunkiIntro.Tahti(8) + KaupunkiIntro.Tahti(10)) / 2), 9));
        }

        [Testi] static void KuvaOsoitteet()
        {
            Oleta.Sama("https://media.matkakirja.app/julisteet/pariisi-nykyintro/20261009/pariisi-nykyintro-c1.jpg", KaupunkiIntro.KuvaUrl(1));
            Oleta.Sama("https://media.matkakirja.app/julisteet/pariisi-nykyintro/20261009/pariisi-nykyintro-c5.jpg", KaupunkiIntro.KuvaUrl(5));
        }
    }
}
