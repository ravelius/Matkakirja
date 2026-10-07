using System.Collections.Generic;
// Kuumailmapallon kori (Päätoimittaja 7.10. 09.1x, vahvistettu 18.5x): keinunta ~2,5°, jousi vastasuuntaan ≤ 5,5°, pysähdyksessä heilahdus eteen.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KoriLiikeTestit
    {
        [Testi] static void KeinuntaPieniJaJatkuva()
        {
            var k = new KoriLiike(); double maks = 0, min = 0;
            for (int i = 0; i < 600; i++) { k.Paivita(1 / 30.0, 0, 0); maks = Math.Max(maks, k.Kallistus); min = Math.Min(min, k.Kallistus); }
            Oleta.Tosi(maks > 1.8 && maks <= 2.6 && min < -1.8, $"keinunta {min:F2}…{maks:F2}°");
        }

        [Testi] static void KiihdytysTaaksePysahdysEteen()
        {
            var k = new KoriLiike(); double alin = 0, ylin = 0;
            for (int i = 0; i < 60; i++) { k.Paivita(1 / 30.0, 3, 0); alin = Math.Min(alin, k.Nyokkays); }   // 2 s kiihdytys eteen
            for (int i = 0; i < 90; i++) k.Paivita(1 / 30.0, 0, 0);                                         // tasainen liike: palaa
            for (int i = 0; i < 30; i++) { k.Paivita(1 / 30.0, -3, 0); ylin = Math.Max(ylin, k.Nyokkays); } // jarrutus
            Oleta.Tosi(alin < -4.0 && alin >= -KoriLiike.RajaAst - KoriLiike.KeinuntaAst, $"kiihdytys taakse {alin:F2}°");
            Oleta.Tosi(ylin > 3.0, $"jarrutus eteen {ylin:F2}°");
        }

        [Testi] static void PallonLennotSKayrinJaKaantyminenVainLiikkeessa()
        {
            // Omistaja 23.4x: "pallolla voi olla sama huippunopeus, mutta nopeat käännökset heti kun kohde vaihtuu toiseksi,
            // ennen kuin siirtyminen alkaa, ovat kaikkein epärealistisimpia. kaikki kiihdytykset on tärkeä tehdä S-käyriä mukaillen."
            // Pahin tapaus: lähtösuunta vastakkainen lentosuuntaan (kamera katsoo etelään, lento pohjoiseen). Näytteet 20 ms:n välein:
            // ensimmäinen ja viimeinen kiihtyvyysnäyte ovat 0–40 ms:n keskiarvoja, joten "nollasta" = alle 8 % huipusta.
            foreach (double m in new[] { 300.0, 800, 1500, 3000, 6000 })
            {
                OpasSilmukka.PalloLento = true;
                double T = OpasSilmukka.LennonKesto(m);
                var r = Mittaa(m, T);
                OpasSilmukka.PalloLento = false;
                double vanha = OpasSilmukka.LennonKesto(m) * OpasSilmukka.PalloKerroin(m / 1000);
                Oleta.Tosi(Math.Abs(T - Math.Max(OpasSilmukka.LentoMinS, Math.Min(OpasSilmukka.LentoMaxS * OpasSilmukka.PalloKerroinLyhyt, vanha))) < 1e-9,
                    $"{m} m: sama kesto ja huippunopeus kuin TF 163 ({T:F1} s)");
                Oleta.Tosi(r.kaannosEnnenLiiketta < 0.5, $"{m} m: ei kääntymistä paikallaan ({r.kaannosEnnenLiiketta:F2}° ennen 1 %:n etenemistä)");
                Oleta.Tosi(r.kaanto <= 10.2, $"{m} m: kääntyminen {r.kaanto:F1}°/s");
                Oleta.Tosi(r.alkuKiihtyvyys < 0.08 * r.maksKiihtyvyys && r.loppuKiihtyvyys < 0.08 * r.maksKiihtyvyys,
                    $"{m} m: kiihtyvyys alkaa ja loppuu nollasta (S-käyrä): alku {r.alkuKiihtyvyys:F1}, loppu {r.loppuKiihtyvyys:F1}, maks {r.maksKiihtyvyys:F1} m/s²");
                Oleta.Tosi(r.kiihtyvyysHyppy < 0.08 * r.maksKiihtyvyys, $"{m} m: kiihtyvyys jatkuva (suurin hyppy {r.kiihtyvyysHyppy:F2} m/s² / 20 ms)");
                Oleta.Tosi(r.kaantoAlku < 0.5 && r.kaantoLoppu < 0.5, $"{m} m: kääntönopeus alkaa ja loppuu nollasta ({r.kaantoAlku:F2}, {r.kaantoLoppu:F2} °/s)");
            }
        }

        /// <summary>Lento pohjoiseen m metriä kestolla T, kamera katsoo lähtiessä etelään (180°).</summary>
        static (double kaanto, double kaannosEnnenLiiketta, double alkuKiihtyvyys, double loppuKiihtyvyys, double maksKiihtyvyys,
            double kiihtyvyysHyppy, double kaantoAlku, double kaantoLoppu) Mittaa(double m, double T)
        {
            double lat0 = 48.85, lon0 = 2.35, lat1 = lat0 + m / 111320.0;
            var a = new Kuvakulma(lat0, lon0, 800, 55, 180);
            var b = new Kuvakulma(lat1, lon0, 800, 55, OpasSilmukka.PalloTulosuunta(180, 0, T));
            const double dt = 0.02;
            var p = new List<Kuvakulma>();
            for (double t = 0; t <= T + 1e-9; t += dt) p.Add(OpasKuvaus.Lennossa(a, b, t / T));
            int n = p.Count;
            var v = new double[n - 1]; var w = new double[n - 1];
            for (int i = 0; i < n - 1; i++)
            {
                v[i] = KierrosLento.EtaisyysM(p[i].Lat, p[i].Lon, p[i + 1].Lat, p[i + 1].Lon) / dt;
                w[i] = Math.Abs(KierrosLento.Kiedo(p[i + 1].Suuntima - p[i].Suuntima)) / dt;
            }
            var acc = new double[n - 2];
            for (int i = 0; i < n - 2; i++) acc[i] = (v[i + 1] - v[i]) / dt;
            double maksA = 0, hyppy = 0, kaanto = 0, ennen = 0;
            for (int i = 0; i < acc.Length; i++) { maksA = Math.Max(maksA, Math.Abs(acc[i])); if (i > 0) hyppy = Math.Max(hyppy, Math.Abs(acc[i] - acc[i - 1])); }
            for (int i = 0; i < w.Length; i++) kaanto = Math.Max(kaanto, w[i]);
            for (int i = 0; i < n && KierrosLento.EtaisyysM(lat0, lon0, p[i].Lat, p[i].Lon) < 0.01 * m; i++)
                ennen = Math.Max(ennen, Math.Abs(KierrosLento.Kiedo(p[i].Suuntima - 180)));
            return (kaanto, ennen, Math.Abs(acc[0]), Math.Abs(acc[acc.Length - 1]), maksA, hyppy, w[0], w[w.Length - 1]);
        }

        [Testi] static void KoydetViiveella()
        {
            var k = new KoriLiike();
            for (int i = 0; i < 5; i++) k.Paivita(1 / 30.0, 0, 6);
            Oleta.Tosi(Math.Abs(k.KoysiKallistus) < Math.Abs(k.Kallistus), "köysi jää koriin nähden jälkeen");
            var v = new KoriLiike { Vahennetty = true };
            v.Paivita(0.1, 5, 5);
            Oleta.Tosi(v.Nyokkays == 0 && v.Kallistus == 0);
        }
    }
}
