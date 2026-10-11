// TYRMÄN ÄÄNIYMPÄRISTÖ (Pelikoodari 11.10.2026, PT B3 ja 06.0x): harvat vaihtelevat tapahtumat pohjan päällä, muunnelman ohjaava ääni
// vain kunnes tehtävä on tehty.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class TyrmanAanetTestit
    {
        static List<(double T, TyrmanAani A)> Aja(int muunnelma, double s, System.Func<double, TyrmanVaihe> vaihe, int siemen = 1)
        {
            var a = new TyrmanAanet(siemen); var ulos = new List<TyrmanAani>(); var kaikki = new List<(double, TyrmanAani)>();
            for (double t = 0; t < s; t += 0.1) { a.Paivita(0.1, muunnelma, vaihe(t), t, ulos); foreach (var x in ulos) kaikki.Add((t, x)); }
            return kaikki;
        }

        [Testi] static void HarvatVaihtelevatTapahtumat()
        {
            // 4. kierros (PT 06.0x): pohjan päällä harvat tapahtumat 20–40 s:n välein, ensimmäinen 8–14 s:ssa, ei samaa lajia kahdesti peräkkäin.
            for (int siemen = 0; siemen < 20; siemen++)
            {
                var e = Aja(2, 600, t => TyrmanVaihe.Istuu, siemen).Where(x => TyrmanAanet.Tapahtumat.Contains(x.A)).ToList();
                Oleta.Tosi(e[0].T >= TyrmanAanet.EnsinMinS - 0.2 && e[0].T <= TyrmanAanet.EnsinMaxS + 0.2, $"ensimmäinen {e[0].T:F1} s (siemen {siemen})");
                for (int i = 1; i < e.Count; i++)
                {
                    double vali = e[i].T - e[i - 1].T;
                    Oleta.Tosi(vali >= TyrmanAanet.ValiMinS - 0.2 && vali <= TyrmanAanet.ValiMaxS + 0.2, $"väli {vali:F1} s (siemen {siemen})");
                    Oleta.Tosi(e[i].A != e[i - 1].A, $"{e[i].A} kahdesti peräkkäin (siemen {siemen})");
                }
                Oleta.Tosi(e.Count >= 14 && TyrmanAanet.Tapahtumat.All(l => e.Any(x => x.A == l)), $"tapahtumia {e.Count}, kaikki lajit (siemen {siemen})");
            }
        }

        [Testi] static void Muunnelma1AvaimetRaossaJaOlissaKunnesPoimittu()
        {
            // Pudotus 3 s, poiminta 40 s.
            var e = Aja(1, 60, t => t < Tyrma.PuluTuleeS ? TyrmanVaihe.Istuu : t < 40 ? TyrmanVaihe.AvaimetOlissa : TyrmanVaihe.AvaimetKadessa);
            var raossa = e.Where(x => x.A == TyrmanAani.AvainRaossa).ToList();
            Oleta.Sama(1, raossa.Count);
            Oleta.Tosi(raossa[0].T < Tyrma.PuluTuleeS, "kilinä raossa ennen pudotusta");
            var olissa = e.Where(x => x.A == TyrmanAani.AvainOlissa).Select(x => x.T).ToList();
            Oleta.Tosi(olissa.Count >= 3 && olissa[0] <= Tyrma.PuluTuleeS + TyrmanAanet.OhjausEnsinS + 0.2, $"olkien kilinä {olissa.Count}");
            Oleta.Tosi(olissa.All(t => t < 40), "ei kilinää poiminnan jälkeen");
            Oleta.Tosi(e.All(x => x.A != TyrmanAani.OviVeto && x.A != TyrmanAani.KiviRapina), "vain oman muunnelman ohjaus");
        }

        [Testi] static void Muunnelmat2ja3Ohjaavat()
        {
            var v = Aja(2, 40, t => t < Tyrma.VesipoikaS ? TyrmanVaihe.Istuu : t < 30 ? TyrmanVaihe.OviAuki : TyrmanVaihe.Ulkona);
            var veto = v.Where(x => x.A == TyrmanAani.OviVeto).Select(x => x.T).ToList();
            Oleta.Tosi(veto.Count >= 2 && veto.All(t => t >= Tyrma.VesipoikaS && t < 30), $"oven veto {veto.Count}");
            Oleta.Tosi(v.All(x => x.T < 30), "ulkona hiljaa");
            var k = Aja(3, 40, t => t < 25 ? TyrmanVaihe.Istuu : TyrmanVaihe.OviAuki);
            var rapina = k.Where(x => x.A == TyrmanAani.KiviRapina).Select(x => x.T).ToList();
            Oleta.Tosi(rapina.Count >= 2 && rapina[0] <= TyrmanAanet.OhjausEnsinS + 0.2 && rapina.All(t => t < 25), $"kiven rapina {rapina.Count}");
        }
    }
}
