// VIHJE MAAILMAN VALONA (Linssiseppä 2, 8.10.2026; omistajan päätös: Pulu pois pelistä, vihjeportaat hennoksi kimallukseksi): tasot
// erottuvat (kesto ja kirkkaus), kaikki alkavat ja päättyvät pimeästä ilman hyppyä, taso 3 sykkii kunnes pelaaja on kohteella, uusi
// vihje kesken jatkaa nykyisestä kirkkaudesta, ja sävy on ulkona kuunvalo, sisällä liekki — myös jokaisen M-osan vihjekohteen kohdalla.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class ValoVihjeTestit
    {
        const double Dt = 1 / 60.0;

        /// <summary>Ajaa vihjeen loppuun: kesto, suurin kirkkaus, suurin kirkkauden muutos ruutua kohden.</summary>
        static (double Kesto, double Maks, double Hyppy) Aja(ValoVihje v, Func<double, double> etaisyys = null)
        {
            double t = 0, maks = 0, hyppy = 0, ed = v.Kirkkaus;
            while (v.Paivita(Dt, etaisyys?.Invoke(t) ?? 30) && t < 60)
            {
                t += Dt; maks = Math.Max(maks, v.Kirkkaus); hyppy = Math.Max(hyppy, Math.Abs(v.Kirkkaus - ed)); ed = v.Kirkkaus;
            }
            hyppy = Math.Max(hyppy, Math.Abs(v.Kirkkaus - ed));
            return (t, maks, hyppy);
        }

        // Pehmeä: suurin muutos ruudussa ≤ 1,5 × huippu / nousuaika × dt (smoothstepin jyrkin kohta 1,5).
        static double Raja(int taso) => 1.5 * ValoVihje.Huippu[taso] / Math.Min(ValoVihje.NousuS, ValoVihje.LaskuS) * Dt + 1e-9;

        [Testi] static void TasotErottuvatJaOvatHentoja()
        {
            var tulokset = new List<(double Kesto, double Maks, double Hyppy)>();
            for (int taso = 1; taso <= 3; taso++)
            {
                var v = new ValoVihje(); v.Aloita(taso, (0, 0, 0), VihjeSavy.Liekki);
                var r = Aja(v); tulokset.Add(r);
                Console.WriteLine($"      taso {taso}: {r.Kesto:F1} s, huippu {r.Maks:F2}, suurin muutos {r.Hyppy:F4}/ruutu");
                Oleta.Tosi(r.Maks <= 0.7 + 1e-9 && r.Maks >= ValoVihje.Huippu[taso] * 0.99, $"taso {taso}: hento (huippu {r.Maks:F2} ≤ 0,7, liekki = 1)");
                Oleta.Tosi(r.Hyppy <= Raja(taso), $"taso {taso}: ei välähdystä ({r.Hyppy:F4} ≤ {Raja(taso):F4})");
                Oleta.Tosi(v.Kirkkaus == 0 && !v.Kaynnissa, $"taso {taso}: päättyy pimeään");
            }
            Oleta.Tosi(tulokset[0].Kesto < tulokset[1].Kesto && tulokset[0].Maks < tulokset[1].Maks && tulokset[1].Maks < tulokset[2].Maks, "taso 1 < 2 < 3");
            Oleta.Tosi(Math.Abs(tulokset[2].Kesto - ValoVihje.Taso3MaxS) < 0.1, $"taso 3 ilman löytöä enintään {ValoVihje.Taso3MaxS} s ({tulokset[2].Kesto:F1})");
        }

        [Testi] static void TasoKolmeSykkiiKunnesPelaajaKohteella()
        {
            var v = new ValoVihje(); v.Aloita(3, (0, 0, 0), VihjeSavy.Kuu);
            double min = 1, maks = 0;
            for (double t = 0; t < 6; t += Dt) { v.Paivita(Dt, 10); if (t > 1) { min = Math.Min(min, v.Kirkkaus); maks = Math.Max(maks, v.Kirkkaus); } }
            Oleta.Tosi(maks - min > 0.2 && min > 0.3, $"sykkii näkyvästi ({min:F2}–{maks:F2})");
            var r = Aja(v, t => 1.5);   // pelaaja kohteella
            Oleta.Tosi(r.Kesto <= ValoVihje.LaskuS + 2 * Dt && !v.Kaynnissa, $"häipyy, kun pelaaja on kohteella ({r.Kesto:F2} s)");
        }

        [Testi] static void UusiVihjeJatkaaNykyisesta()
        {
            var v = new ValoVihje(); v.Aloita(1, (0, 0, 0), VihjeSavy.Liekki);
            for (double t = 0; t < 1; t += Dt) v.Paivita(Dt, 30);
            double ennen = v.Kirkkaus; v.Aloita(2, (1, 0, 0), VihjeSavy.Liekki);
            v.Paivita(Dt, 30);
            Oleta.Tosi(ennen > 0.25 && Math.Abs(v.Kirkkaus - ennen) <= Raja(2), $"ei hyppyä tasolta 1 tasolle 2 ({ennen:F3} → {v.Kirkkaus:F3})");
            Oleta.Tosi(v.Taso == 2 && v.Kohde.X == 1, "uusi taso ja kohde");
        }

        [Testi] static void SavyUlkonaKuuSisallaLiekki()
        {
            Oleta.Sama(VihjeSavy.Kuu, ValoVihje.SavyOsassa("vesiportti", -5.6), "laituri ja vesiportti");
            Oleta.Sama(VihjeSavy.Kuu, ValoVihje.SavyOsassa("muurikaytava", 16.6), "muurinharja");
            Oleta.Sama(VihjeSavy.Liekki, ValoVihje.SavyOsassa("muurikaytava", 13.4), "muurikäytävä");
            Oleta.Sama(VihjeSavy.Liekki, ValoVihje.SavyOsassa("palatsi", 3.4), "Linnantupa");
            var k = ValoVihje.Vari(VihjeSavy.Kuu); var l = ValoVihje.Vari(VihjeSavy.Liekki);
            Oleta.Tosi(k.B > k.R && l.R > l.B, "kuu sininen, liekki lämmin");
            // Jokainen M-osan vihjekohde (MVihjeetTestit) ja laiturin portti saa sävyn datan osasta.
            var d = Huonesimulaatio.Data; var kohteet = new List<string> { LaituriVihje.Kohde, "ovi:porttikaytava-T102-alku", "ovi:kirkkotorni-piha", "ovi:kappeli-alku", "esine:koysikieppi", "koysi:sakara", "naulakko:tott-kammio" };
            foreach (var n in kohteet)
            {
                var p = MVihjeet.Paikka(d, n);
                Oleta.Tosi(p != null, $"{n} datassa");
                var s = ValoVihje.SavyOsassa(Askelaani.Osa(d, p.Value.X, p.Value.Y, p.Value.Z), p.Value.Y);
                Console.WriteLine($"      {n}: {Askelaani.Osa(d, p.Value.X, p.Value.Y, p.Value.Z)} → {s}");
            }
            var portti = MVihjeet.Paikka(d, LaituriVihje.Kohde).Value; var kieppi = MVihjeet.Paikka(d, "esine:koysikieppi").Value;
            Oleta.Sama(VihjeSavy.Kuu, ValoVihje.SavyOsassa(Askelaani.Osa(d, portti.X, portti.Y, portti.Z), portti.Y), "laiturin portti kuunvalossa");
            Oleta.Sama(VihjeSavy.Kuu, ValoVihje.SavyOsassa(Askelaani.Osa(d, kieppi.X, kieppi.Y, kieppi.Z), kieppi.Y), "harjan köysikieppi kuunvalossa");
        }
    }
}
