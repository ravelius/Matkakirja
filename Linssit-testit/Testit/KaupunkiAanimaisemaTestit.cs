// Kaupunkiäänimaisema (Siirtoseppä 6.10.2026): enintään 8 soivaa, 2,5 s liuku, korkeus, nopeus, vuorokausi, väistö ja kellot.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiAanimaisemaTestit
    {
        static KaupunkiAanimaisema.Syote S(Dictionary<string, double> p, double korkeus = 100, double nopeus = 0, double tunti = 12, bool puhe = false, double sade = 0) =>
            new KaupunkiAanimaisema.Syote { Painot = p, KorkeusM = korkeus, NopeusMs = nopeus, Tunti = tunti, Puhe = puhe, Sade = sade, Paalla = true };

        static void Aja(KaupunkiAanimaisema m, KaupunkiAanimaisema.Syote s, double sek) { for (double t = 0; t < sek; t += 1 / 60.0) m.Paivita(s, 1 / 60.0); }

        static Dictionary<string, double> Kaikki(double w)
        {
            var d = new Dictionary<string, double>();
            foreach (var k in KaupunkiAanimaisema.Kerrokset) d[k] = w;
            return d;
        }

        [Testi] static void EnintaanKahdeksanSoivaa()
        {
            var p = Kaikki(0.5); p[KaupunkiAanimaisema.Tori] = 0.9; p[KaupunkiAanimaisema.Satama] = 0.8;
            var m = new KaupunkiAanimaisema();
            Aja(m, S(p, sade: 0.6), 5);
            Oleta.Tosi(m.Soivia <= KaupunkiAanimaisema.MaxSoivat, $"soivia {m.Soivia}");
            Oleta.Tosi(m.Tasot[KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Tori)] > 0.85, "vahvin soi");
        }

        [Testi] static void LiukuKestaaHaivytysajan()
        {
            var m = new KaupunkiAanimaisema();
            var p = new Dictionary<string, double> { [KaupunkiAanimaisema.Satama] = 1 };
            Aja(m, S(p), 1.25);
            double puoli = m.Tasot[KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Satama)];
            Oleta.Tosi(puoli > 0.45 && puoli < 0.55, $"puolessa ajassa puolessa ({puoli:F2})");
            // Kohde vaihtuu: satama häipyy ja puisto nousee samassa ajassa (ristihäivytys).
            Aja(m, S(p), 2);
            var q = new Dictionary<string, double> { [KaupunkiAanimaisema.Puisto] = 1 };
            Aja(m, S(q), 2.6);
            Oleta.Tosi(m.Tasot[KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Satama)] == 0, "satama pois 2,5 s:ssa");
            Oleta.Tosi(m.Tasot[KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Puisto)] > 0.99, "puisto täysi");
        }

        [Testi] static void KorkeusVaimentaaJaTuuliVoimistuu()
        {
            var p = new Dictionary<string, double> { [KaupunkiAanimaisema.Tori] = 1 };
            var maa = new KaupunkiAanimaisema(); Aja(maa, S(p, 80), 4);
            var yla = new KaupunkiAanimaisema(); Aja(yla, S(p, 3000), 4);
            int tori = KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Tori), tuuli = KaupunkiAanimaisema.Indeksi(KaupunkiAanimaisema.Tuuli);
            Oleta.Tosi(yla.Tasot[tori] < 0.2 && maa.Tasot[tori] > 0.99, $"tori ylhäällä {yla.Tasot[tori]:F2}, maassa {maa.Tasot[tori]:F2}");
            Oleta.Tosi(yla.Tasot[tuuli] > 0.75 && maa.Tasot[tuuli] < 0.1, "tuuli voimistuu ylhäällä");
            Oleta.Tosi(yla.Alipaasto < 1000 && maa.Alipaasto > 20000, $"alipäästö {yla.Alipaasto:F0} / {maa.Alipaasto:F0} Hz");
        }

        [Testi] static void NopeusSuhina()
        {
            var m = new KaupunkiAanimaisema(); Aja(m, S(null, nopeus: 5), 3);
            Oleta.Tosi(m.Suhina < 0.01, "hidas: ei suhinaa");
            Aja(m, S(null, nopeus: 300), 4);
            Oleta.Tosi(m.Suhina > 0.55 && m.Suhina <= KaupunkiAanimaisema.SuhinaMax + 1e-9, $"nopea: suhina {m.Suhina:F2}");
        }

        [Testi] static void VuorokausiJaVaisto()
        {
            Oleta.Tosi(KaupunkiAanimaisema.Vuorokausi(KaupunkiAanimaisema.LiikenneVilkas, 2) < 0.3, "yöllä hiljaista");
            Oleta.Tosi(KaupunkiAanimaisema.Vuorokausi(KaupunkiAanimaisema.Puisto, 6.5) > 1.2, "aamulla linnut");
            var m = new KaupunkiAanimaisema();
            Aja(m, S(null), 1); Oleta.Tosi(Math.Abs(m.Kokonais - 1) < 1e-6, "ilman puhetta täysi");
            Aja(m, S(null, puhe: true), 1.5); Oleta.Tosi(Math.Abs(m.Kokonais - KaupunkiAanimaisema.VaistoTaso) < 0.01, $"puheen alla −9 dB ({m.Kokonais:F2})");
            Aja(m, S(null), 4); Oleta.Tosi(m.Kokonais > 0.99, "palautuu");
            var pois = S(Kaikki(1)); pois.Paalla = false; Aja(m, pois, 3);
            Oleta.Tosi(m.Kokonais == 0 && m.Soivia == 0, "kytkin pois hiljentää");
        }

        [Testi] static void KirkonkellotHajautettuina()
        {
            var l = KaupunkiAanimaisema.TasatunninLyonnit(15, 3, 42);
            Oleta.Sama(9, l.Count);   // klo 15 → 3 lyöntiä × 3 kirkkoa
            var alut = new double[3]; foreach (var (v, k) in l) if (alut[k] == 0 || v < alut[k]) alut[k] = k == 0 ? 0 : v;
            Oleta.Tosi(alut[1] >= 0.6 && alut[2] - alut[1] >= 0.6, "kirkot eri aikaan");
            Oleta.Sama(12, KaupunkiAanimaisema.TasatunninLyonnit(0, 1, 1).Count);
            Oleta.Sama(0, KaupunkiAanimaisema.TasatunninLyonnit(10, 0, 1).Count);
        }
    }
}
