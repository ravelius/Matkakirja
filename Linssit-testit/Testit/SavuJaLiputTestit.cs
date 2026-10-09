// ELÄVÄ KAUPUNKI: SAVU JA LIPUT (Linssiseppä 9.10.2026; juna 171, B8): paketin piiput ja liput luetaan, noin 40 % piipuista savuaa
// deterministisesti, katolla oleva piippu nostetaan, lähimmät valitaan säteen ja määrän mukaan, tuuli puhaltaa mistä-suunnasta
// poispäin, lipun vapaa reuna kääntyy myötätuuleen, aalto voimistuu ja kangas roikkuu tyynellä, savu nousee ja ajautuu tuulen mukana.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class SavuJaLiputTestit
    {
        static string Paketti(string id) => System.IO.File.ReadAllText($"../Assets/Matkakirja/Linssit/Resources/Elava/elava-{id}.json");

        [Testi] static void PaketitSisaltavatPiiputJaLiput()
        {
            foreach (var id in new[] { "tukholma", "pariisi" })
            {
                var s = SavuJaLiput.Lue(Paketti(id), 20261009);
                Oleta.Tosi(s.Piiput.Count >= 60, $"{id}: piippuja {s.Piiput.Count}");
                double osuus = (double)s.Savuavia / s.Piiput.Count;
                Oleta.Tosi(osuus > 0.25 && osuus < 0.55, $"{id}: savuavia {osuus:P0}");
                Oleta.Tosi(s.Piiput.TrueForAll(p => p.Korkeus >= SavuJaLiput.KattoRajaM && p.Voima > 0.3 && p.Voima <= 1), "korkeus ja voima");
                Oleta.Tosi(s.Liput.Count >= 100, $"{id}: lippuja {s.Liput.Count}");
                Oleta.Tosi(s.Liput.TrueForAll(l => l.Korkeus > 0 && l.Tyvi >= 0 && l.Tyvi <= 60 && l.Leveys >= 1.2 && l.Leveys <= 4), "lipun mitat");
                var oma = id == "tukholma" ? SavuJaLiput.LipunMaa.Ruotsi : SavuJaLiput.LipunMaa.Ranska;
                Oleta.Tosi(s.Liput.Exists(l => l.Maa == oma), $"{id}: oman maan lippu");
                var b = SavuJaLiput.Lue(Paketti(id), 20261009);
                for (int i = 0; i < s.Piiput.Count; i++) Oleta.Tosi(s.Piiput[i].Savuaa == b.Piiput[i].Savuaa && s.Piiput[i].Voima == b.Piiput[i].Voima, "deterministinen");
            }
        }

        [Testi] static void KattopiippuJaMaa()
        {
            Oleta.Sama(25.0, SavuJaLiput.SavunKorkeus(7), "katolla: 7 + 18 m");
            Oleta.Sama(140.0, SavuJaLiput.SavunKorkeus(140), "teollisuuspiippu");
            Oleta.Sama(SavuJaLiput.LipunMaa.Ruotsi, SavuJaLiput.MaaKoodista("SE"));
            Oleta.Sama(SavuJaLiput.LipunMaa.Ranska, SavuJaLiput.MaaKoodista("FR"));
            Oleta.Sama(SavuJaLiput.LipunMaa.Neutraali, SavuJaLiput.MaaKoodista(null));
            var s = SavuJaLiput.Lue("{\"liput\":[{\"x\":1,\"z\":2,\"tyvi\":12.8,\"korkeus\":6,\"maa\":\"SE\"},{\"x\":3,\"z\":4,\"maa\":null}]}", 1);
            Oleta.Sama(2, s.Liput.Count); Oleta.Sama(0, s.Piiput.Count);
            Oleta.Tosi(Math.Abs(s.Liput[0].Leveys / s.Liput[0].KangasKorkeus - 1.6) < 1e-9, "Ruotsin lippu 16:10");
            Oleta.Tosi(s.Liput[1].Korkeus == 6 && s.Liput[1].Maa == SavuJaLiput.LipunMaa.Neutraali, "oletustanko 6 m, neutraali");
        }

        [Testi] static void LahimmatSateenJaMaaranMukaan()
        {
            var pts = new List<(double X, double Z)> { (0, 0), (100, 0), (50, 0), (5000, 0), (0, 2900), (-10, 0) };
            var v = SavuJaLiput.Lahimmat(pts, p => p, 0, 0, 3000, 3);
            Oleta.Sama("0,5,2", string.Join(",", v), "lähin ensin, raja 3");
            var kaikki = SavuJaLiput.Lahimmat(pts, p => p, 0, 0, 3000, 10);
            Oleta.Sama(5, kaikki.Count, "5 km:n piste säteen ulkopuolella");
            var ehdolla = SavuJaLiput.Lahimmat(pts, p => p, 0, 0, 3000, 10, p => p.X > 0);
            Oleta.Sama("2,1", string.Join(",", ehdolla), "ehto rajaa");
        }

        [Testi] static void TuuliJaLipunSuunta()
        {
            // Länsituuli (mistä 270°) puhaltaa itään (+x); lipun vapaa reuna (+x paikallisesti) itään: kierto 0°.
            var t = SavuJaLiput.Tuuli(270, 6, 0);
            Oleta.Tosi(Math.Abs(t.X - 1) < 1e-9 && Math.Abs(t.Z) < 1e-9 && t.Ms == 6, $"länsituuli itään ({t.X:F2}, {t.Z:F2})");
            Oleta.Tosi(Math.Abs(SavuJaLiput.LipunSuuntima(t.X, t.Z)) < 1e-9, "kangas itään");
            // Etelätuuli (mistä 180°) puhaltaa pohjoiseen (+z): Euler y = −90° kääntää +x:n kohti +z:aa.
            var e = SavuJaLiput.Tuuli(180, 4, 0);
            Oleta.Tosi(Math.Abs(e.Z - 1) < 1e-9, "etelätuuli pohjoiseen");
            double a = SavuJaLiput.LipunSuuntima(e.X, e.Z) * Math.PI / 180;
            Oleta.Tosi(Math.Abs(Math.Cos(a) - e.X) < 1e-9 && Math.Abs(-Math.Sin(a) - e.Z) < 1e-9, "Unityn y-kierto vie +x:n myötätuuleen");
            var vara = SavuJaLiput.Tuuli(null, null, 90);
            Oleta.Tosi(Math.Abs(vara.X - 1) < 1e-9 && vara.Ms == SavuJaLiput.VaraTuuliMs, "varatuuli puhaltaa kohti annettua suuntaa");
        }

        [Testi] static void LipunAaltoTuulenMukaan()
        {
            var tyyni = SavuJaLiput.LipunAalto(0); var kova = SavuJaLiput.LipunAalto(10);
            Oleta.Tosi(tyyni.Riippu > 0.99 && kova.Riippu == 0, "tyynellä roikkuu, tuulessa suorana");
            Oleta.Tosi(kova.Kulmanopeus > tyyni.Kulmanopeus && kova.Amplitudi > tyyni.Amplitudi, "kovempi tuuli: nopeampi ja isompi aalto");
            for (double v = 0; v <= 30; v += 0.5) { var a = SavuJaLiput.LipunAalto(v); Oleta.Tosi(a.Amplitudi > 0 && a.Amplitudi < 0.2, $"amplitudi {v} m/s"); }
        }

        [Testi] static void SavuNouseeJaAjautuu()
        {
            var alku = SavuJaLiput.SavuHiukkanen(0, 0.5, 1, 1, 1, 0, 5);
            Oleta.Tosi(alku.Alfa == 0 && Math.Abs(alku.Y) < 1e-9, "syntyy näkymättömänä piipun suulla");
            var keski = SavuJaLiput.SavuHiukkanen(0.5, 0.5, 1, 1, 1, 0, 5);
            Oleta.Tosi(keski.Y > 5 && keski.X > 10 && keski.Alfa > 0.1 && keski.Sade > alku.Sade, $"nousee ja ajautuu itään ({keski.X:F0}, {keski.Y:F0})");
            var loppu = SavuJaLiput.SavuHiukkanen(1, 0.5, 1, 1, 1, 0, 5);
            Oleta.Tosi(loppu.Alfa < 1e-9, "häviää elinajan lopussa");
            var tyyni = SavuJaLiput.SavuHiukkanen(0.5, 0.5, 1, 1, 1, 0, 0); var kova = SavuJaLiput.SavuHiukkanen(0.5, 0.5, 1, 1, 1, 0, 12);
            Oleta.Tosi(tyyni.Y > kova.Y && kova.X > tyyni.X, "tyynellä pystympi, tuulessa vaakampi");
            var heikko = SavuJaLiput.SavuHiukkanen(0.5, 0.5, 0.4, 1, 1, 0, 5);
            Oleta.Tosi(heikko.Alfa < keski.Alfa && heikko.Sade < keski.Sade, "heikompi piippu: ohuempi savu");
        }
    }
}
