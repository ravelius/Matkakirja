// LINNAN MUISTIBUDJETTI (omistaja 8.10.2026 19.5x, Natiiviseppä): budjetti nostaa laatua muistin salliessa, laiteluokan taso
// on alaraja paitsi jetsam-vaarassa, ja tuntematon vapaa muisti (−1) pitää laiteluokan tason täsmälleen ennallaan.
using System;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Testit
{
    public static class LinnaMuistibudjettiTestit
    {
        // (malli, RAM Mt, DioraamaLaatu.OnkoTaysi, näytön pikselit)
        static readonly (string Malli, int Ram, bool Taysi, long Px)[] Laitteet =
        {
            ("iPhone16,1", 7500, false, 1179L * 2556),   // iPhone 15 Pro
            ("iPhone18,1", 11500, true, 1206L * 2622),   // iPhone 17 Pro
            ("iPhone17,3", 7500, true, 1179L * 2556),    // iPhone 16
            ("iPad16,3", 7600, true, 2420L * 1668),      // M4 iPad Pro 8 Gt
            ("iPad16,5", 15600, true, 2752L * 2064),     // M4 iPad Pro 16 Gt
            ("iPad13,18", 3700, false, 2360L * 1640),    // A14 iPad (10. sukupolvi)
            ("iPad16,1", 7600, false, 2266L * 1488),     // iPad mini A17 Pro
            ("iPhone13,2", 3700, false, 1170L * 2532),   // iPhone 12
            ("Mac16,12", 16384, true, 2560L * 1664),     // MacBook Air M4
        };

        static LinnaLaatu Laske(int vapaa, (string Malli, int Ram, bool Taysi, long Px) l) =>
            LinnaMuistibudjetti.Laske(vapaa, l.Malli, l.Ram, l.Taysi, l.Px);

        static bool Vahintaan(LinnaLaatu a, LinnaLaatu b) =>
            a.Kuori >= b.Kuori && (a.TaydetPinnat || !b.TaydetPinnat) && (a.RajoituksetPois || !b.RajoituksetPois) && (a.Taysi || !b.Taysi);

        [Testi] static void TuntematonVapaaPitaaLaiteluokan()
        {
            foreach (var l in Laitteet)
            {
                var t = Laske(-1, l);
                Oleta.Tosi(t.SamaLaatu(LinnaMuistibudjetti.Laiteluokka(l.Malli, l.Ram, l.Taysi, l.Px)), l.Malli);
                Oleta.Sama(-1, t.BudjettiMt, l.Malli);
            }
            // Laiteluokka = vanha logiikka: iPhone 15 Pro normaali + puolikkaat + kevennykset, iPhone 17 Pro huippu + kevennykset,
            // M-iPad huippu ilman kevennyksiä, A-iPad normaali + puolikkaat (RAM < 6000), heikko kevyt.
            var p15 = Laske(-1, Laitteet[0]);
            Oleta.Tosi(p15.Kuori == KuoriTaso.Normaali && !p15.TaydetPinnat && !p15.RajoituksetPois && !p15.Taysi, "15 Pro: " + p15);
            var p17 = Laske(-1, Laitteet[1]);
            Oleta.Tosi(p17.Kuori == KuoriTaso.Huippu && p17.TaydetPinnat && !p17.RajoituksetPois && p17.Taysi, "17 Pro: " + p17);
            var m = Laske(-1, Laitteet[3]);
            Oleta.Tosi(m.Kuori == KuoriTaso.Huippu && m.TaydetPinnat && m.RajoituksetPois && m.Taysi, "M-iPad: " + m);
            var a = Laske(-1, Laitteet[5]);
            Oleta.Tosi(a.Kuori == KuoriTaso.Normaali && !a.TaydetPinnat && a.RajoituksetPois && !a.Taysi, "A-iPad: " + a);
            Oleta.Sama(KuoriTaso.Kevyt, LinnaMuistibudjetti.Laiteluokka("iPhone10,1", 2000, false, 750L * 1334).Kuori);
        }

        [Testi] static void TyypillisetLaitteetSaavatTaydenLaadun()
        {
            var huippu = LinnaMuistibudjetti.Portaat[LinnaMuistibudjetti.Portaat.Length - 1];
            foreach (var (i, vapaa) in new[] { (0, 3000), (0, 3500), (1, 4000), (1, 5000), (2, 3000), (3, 5000), (3, 6000), (4, 10000), (5, 2000), (5, 3000), (6, 3000) })
            {
                var t = Laske(vapaa, Laitteet[i]);
                Oleta.Tosi(t.SamaLaatu(huippu), $"{Laitteet[i].Malli} vapaa {vapaa}: {t} ({t.Peruste})");
                Oleta.Tosi(t.TarveMt <= t.BudjettiMt, $"{Laitteet[i].Malli} tarve {t.TarveMt} ≤ budjetti {t.BudjettiMt}");
            }
            Oleta.Tosi(Laske(5500, Laitteet[3]).Peruste == "laiteluokan taso", "M-iPad oli jo täysi");
            Oleta.Tosi(Laske(3200, Laitteet[0]).Peruste.StartsWith("nosto"), "iPhone 15 Pro nousee");
        }

        [Testi] static void LaiteluokkaOnAlarajaKunSeMahtuu()
        {
            foreach (var l in Laitteet)
            {
                var luokka = LinnaMuistibudjetti.Laiteluokka(l.Malli, l.Ram, l.Taysi, l.Px);
                LinnaLaatu? edellinen = null;
                for (int vapaa = 0; vapaa <= 12000; vapaa += 50)
                {
                    var t = Laske(vapaa, l);
                    int budjetti = vapaa - LinnaMuistibudjetti.Marginaali(vapaa);
                    Oleta.Sama(budjetti, t.BudjettiMt, l.Malli);
                    if (LinnaMuistibudjetti.Tarve(luokka) <= budjetti) Oleta.Tosi(Vahintaan(t, luokka), $"{l.Malli} vapaa {vapaa}: {t} < {luokka}");
                    // Mahtuu aina budjettiin, paitsi turvatasolla, jota pienempää ei ole.
                    if (t.Peruste != "HÄTÄ: turvataso") Oleta.Tosi(t.TarveMt <= budjetti, $"{l.Malli} vapaa {vapaa}: tarve {t.TarveMt} > {budjetti}");
                    // Enemmän muistia ei koskaan laske tasoa.
                    if (edellinen.HasValue) Oleta.Tosi(t.TarveMt >= edellinen.Value.TarveMt, $"{l.Malli} vapaa {vapaa}: tarve laski");
                    edellinen = t;
                }
            }
        }

        [Testi] static void VaarassaTurvallinenTaso()
        {
            // M-iPad, vapaa 1350 (budjetti 650): huippu 1024 ei mahdu → normaali + puolikkaat (627).
            var t = Laske(1350, Laitteet[3]);
            Oleta.Tosi(t.Kuori == KuoriTaso.Normaali && !t.TaydetPinnat && !t.RajoituksetPois, t.ToString());
            Oleta.Tosi(t.Peruste.StartsWith("vähän muistia"), t.Peruste);
            // Laitteella 0 = muisti lopussa → turvataso.
            var h = Laske(0, Laitteet[1]);
            Oleta.Tosi(h.SamaLaatu(LinnaMuistibudjetti.Portaat[0]) && h.Peruste == "HÄTÄ: turvataso", h.ToString());
            // A-iPad, vapaa 1500 (budjetti 800): laiteluokka mahtuu → nosto täysiin pintoihin (697), iPadin kevennyksettömyys säilyy.
            var a = Laske(1500, Laitteet[5]);
            Oleta.Tosi(a.Kuori == KuoriTaso.Normaali && a.TaydetPinnat && a.RajoituksetPois && !a.Taysi, a.ToString());
        }

        [Testi] static void MarginaaliJaTarpeet()
        {
            Oleta.Sama(700, LinnaMuistibudjetti.Marginaali(1000));
            Oleta.Sama(700, LinnaMuistibudjetti.Marginaali(4000));
            Oleta.Sama(900, LinnaMuistibudjetti.Marginaali(6000));
            var portaat = LinnaMuistibudjetti.Portaat;
            var odotetut = new[] { 531, 627, 697, 860, 1024 };
            for (int p = 0; p < portaat.Length; p++)
            {
                Oleta.Sama(odotetut[p], LinnaMuistibudjetti.Tarve(portaat[p]), "porras " + p);
                if (p > 0) Oleta.Tosi(Vahintaan(portaat[p], portaat[p - 1]), "portaat kasvavat");
            }
        }
    }
}
