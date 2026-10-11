// TYRMÄN ÄÄNIYMPÄRISTÖ (Pelikoodari 11.10.2026, PT B3): ei pitkiä hiljaisia jaksoja, askeleet käytävällä, muunnelman ohjaava ääni
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

        [Testi] static void EiPitkiaHiljaisuuksia()
        {
            for (int siemen = 0; siemen < 20; siemen++)
            {
                var e = Aja(2, 600, t => TyrmanVaihe.Istuu, siemen);
                double edellinen = 0, pisin = 0;
                foreach (var (t, _) in e) { pisin = System.Math.Max(pisin, t - edellinen); edellinen = t; }
                Oleta.Tosi(pisin <= TyrmanAanet.TippaMaxS + 0.2, $"pisin hiljaisuus {pisin:F1} s (siemen {siemen})");
                var askeleet = e.Where(x => x.A == TyrmanAani.Askeleet).Select(x => x.T).ToList();
                Oleta.Tosi(askeleet.Count >= 9 && askeleet[0] <= TyrmanAanet.AskelEnsinMaxS + 0.2, $"askeleet {askeleet.Count}, ensin {askeleet.FirstOrDefault():F0} s");
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
