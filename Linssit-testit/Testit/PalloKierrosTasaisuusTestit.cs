// PALLON KIERROKSEN TASAISUUS (omistaja TF 166, 8.10. 18.3x: "jää välillä aivan liikaa paikalleen … välillä lähteekin yhtäkkiä
// hetkeksi taaksepäin ja sitten palaa takaisin"; Linssiseppä): Pariisin kierros OpasSilmukassa pallotilassa (lipuminen, van Wijk–Nuij-
// lento), laatat eivät koskaan täyty (kuten TF:ssä: lähtö odotti laattoja 5,0 s joka kerta). Mitataan kameran (silmän) vaakaliike:
// paikallaanolo (< 0,3 m/s yhtäjaksoisesti) ja taaksepäin nykäisy (0,5 s:n liike vastaan edellistä 0,5 s:n liikettä, molemmat > 1 m/s).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloKierrosTasaisuusTestit
    {
        static readonly (string, double, double)[] Pariisi =
        {
            ("Notre-Dame", 48.8530, 2.3499), ("Concorden aukio", 48.8656, 2.3212), ("Champs-Élysées", 48.8698, 2.3076),
            ("Riemukaari", 48.8738, 2.2950), ("Eiffel-torni", 48.8584, 2.2945),
        };

        public sealed class Mittaus { public string PisinKohta; public double PisinSeisonta, Seisonta; public int Nykayksia; public List<string> Loki = new List<string>(); public double T; }

        public static Mittaus Aja(double latausaste, double kestoS = 8)
        {
            bool pallo0 = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(new Kuvakulma(48.8566, 2.3522, 2200, 50, 0, 40));
                var pyynnot = new List<(int n, string t)>();
                s.Pyyda += (n, t) => pyynnot.Add((n, t));
                double puheAlkoi = -1, t = 0; s.AlkaaPuhua += k => puheAlkoi = t;
                s.LatausEdistys = () => latausaste;
                s.Aloita("Pariisi");
                var jono = new List<(string, double, double)>(Pariisi);
                s.AloitaKierros(jono);
                const double dt = 1 / 30.0; var m = new Mittaus();
                var paikat = new List<(double e, double n)>(); var korkeudet = new List<double>(); int vastattu = 0; double seisoo = 0;
                for (; t < 150 && s.Nykyinen?.Id != "Eiffel-torni"; t += dt)
                {
                    while (vastattu < pyynnot.Count)
                    {
                        var (n, nimi) = pyynnot[vastattu++];
                        var e = jono.Find(x => x.Item1 == nimi);
                        if (e.Item1 != null) s.Vastaus(n, new OpasKohde { Id = e.Item1, Nimi = e.Item1, Lat = e.Item2, Lon = e.Item3, KokoM = 120, KestoS = kestoS, Kierros = true });
                    }
                    s.Paivita(dt, _ => 35);
                    if (s.Vaihe == OpasVaihe.Puhuu && puheAlkoi >= 0 && t - puheAlkoi > kestoS) { s.AaniLoppui(); puheAlkoi = -1; }
                    var p = OpasKuvaus.KameraPaikka(s.Asento, 48.8566, 2.3522); paikat.Add((p.e, p.n)); korkeudet.Add(p.u);
                    int i = paikat.Count - 1;
                    if (i >= 1)
                    {
                        // Silmän 3D-nopeus: pystysuora laskeutuminen (zoomaus pystysuunnassa, juna 168) on liikettä eikä seisontaa.
                        double v = Math.Sqrt(Math.Pow(paikat[i].e - paikat[i - 1].e, 2) + Math.Pow(paikat[i].n - paikat[i - 1].n, 2) + Math.Pow(korkeudet[i] - korkeudet[i - 1], 2)) / dt;
                        seisoo = v < 0.3 && s.Nykyinen != null && !s.Leijuu ? seisoo + dt : 0;
                        if (seisoo > 0) m.Seisonta += dt;
                        if (seisoo > m.PisinSeisonta) { m.PisinSeisonta = seisoo; m.PisinKohta = $"{t:F1} s {s.Vaihe} {s.Nykyinen?.Id} va {s.VaiheAika:F1} lei {s.Leijuu} v {v:F2}"; }
                    }
                    int w = 15;   // 0,5 s
                    if (i >= 2 * w && i % 3 == 0)
                    {
                        double ae = paikat[i - w].e - paikat[i - 2 * w].e, an = paikat[i - w].n - paikat[i - 2 * w].n, be = paikat[i].e - paikat[i - w].e, bn = paikat[i].n - paikat[i - w].n;
                        double la = Math.Sqrt(ae * ae + an * an) / 0.5, lb = Math.Sqrt(be * be + bn * bn) / 0.5;
                        if (la > 1 && lb > 1 && (ae * be + an * bn) / (la * lb * 0.25) < -0.5) { m.Nykayksia++; if (m.Loki.Count < 12) m.Loki.Add($"{t:F1} s {s.Vaihe} {s.Nykyinen?.Id} {la:F1}→{lb:F1} m/s"); }
                    }
                }
                m.T = t;
                return m;
            }
            finally { OpasSilmukka.PalloLento = pallo0; }
        }

        [Testi] static void PariisinPallokierrosTasainen()
        {
            // Laatat eivät täyty (TF 166: lähtö odotti laattoja 5,0 s joka kerta): ennen korjausta seisonta 30 s (pisin 6,0 s) ja
            // 10 taaksepäin nykäisyä sumennusnostosta (Notre-Dame/prefektuuri, Concorde ja Champs-Élysées/Élysée).
            var m = Aja(0.9);
            Console.WriteLine($"      pallokierros: {m.T:F0} s, seisonta yht. {m.Seisonta:F1} s (pisin {m.PisinSeisonta:F1} s @ {m.PisinKohta}), taaksepäin {m.Nykayksia}: {string.Join(" | ", m.Loki)}");
            Oleta.Sama(0, m.Nykayksia, "ei taaksepäin nykäisyjä");
            Oleta.Tosi(m.PisinSeisonta <= 2, $"pisin seisonta {m.PisinSeisonta:F1} s ≤ 2 s (lipuminen jatkuu laattaodotuksen ajan; silmän 3D-nopeus, leijunta kaaren päässä ohitetaan)");
            Oleta.Tosi(m.Seisonta <= 15, $"seisonta yhteensä {m.Seisonta:F1} s ≤ 15 s");
            var v = Aja(1.0);
            Oleta.Tosi(v.Nykayksia == 0 && v.PisinSeisonta <= 2, $"laatat valmiina: taaksepäin {v.Nykayksia}, pisin seisonta {v.PisinSeisonta:F1} s");
        }
    }
}
