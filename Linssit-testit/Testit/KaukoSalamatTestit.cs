// Kaukaiset salamat (Päätoimittaja 9.10., junan 171 erä): iskut vain ukkosella, kaukana, jyrinä etäisyyden viiveellä, muoto rajoissa.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    static class KaukoSalamatTestit
    {
        [Testi] static void IskutVainUkkosellaJaKaukana()
        {
            var s = new KaukoSalamat(7); const double dt = 0.05;
            for (double t = 0; t < 120; t += dt) { s.Paivita(dt, 0.1); Oleta.Tosi(!s.Alkoi && s.Nykyinen == null, "heikolla ukkosella ei iskuja"); }
            int iskuja = 0; double viive = -1, alkoi = -1;
            for (double t = 0; t < 600; t += dt)
            {
                s.Paivita(dt, 1);
                if (s.Alkoi)
                {
                    iskuja++;
                    var i = s.Nykyinen.Value;
                    Oleta.Tosi(i.EtaisyysM >= KaukoSalamat.EtMinM && i.EtaisyysM <= KaukoSalamat.EtMaxM, $"etäisyys {i.EtaisyysM:F0} m");
                    if (i.EtaisyysM < KaukoSalamat.AaniMaxM && viive < 0) { viive = i.EtaisyysM / KaukoSalamat.AaniMs; alkoi = t; }
                }
                if (s.Kumahdus > 0 && alkoi >= 0 && viive > 0)
                {
                    Oleta.Tosi(Math.Abs(t - alkoi - viive) < 0.2, $"jyrinä {t - alkoi:F1} s, odotettu {viive:F1} s");
                    Oleta.Tosi(s.Kumahdus >= 0.3 && s.Kumahdus <= 1, "jyrinän voima rajoissa");
                    viive = -2;
                }
            }
            Oleta.Tosi(iskuja >= 30 && iskuja <= 150, $"10 min ukkosta: {iskuja} iskua");
            Oleta.Tosi(viive == -2, "lähin isku kuului");
        }

        [Testi] static void ValahdysJaMuoto()
        {
            Oleta.Tosi(KaukoSalamat.Kirkkaus(0.001, 5) > 0.9, "päävälähdys heti");
            Oleta.Sama(0.0, KaukoSalamat.Kirkkaus(KaukoSalamat.KestoS + 0.01, 5));
            Oleta.Tosi(KaukoSalamat.Kirkkaus(0.2, 5) < KaukoSalamat.Kirkkaus(0.001, 5), "sammuu välähdysten välillä");
            var m = KaukoSalamat.Muoto(1234, 14);
            Oleta.Sama(14, m.Count);
            Oleta.Tosi(m[0].x == 0 && m[0].y == 0 && Math.Abs(m[13].y - 1) < 1e-9, "maasta pilveen");
            foreach (var p in m) Oleta.Tosi(Math.Abs(p.x) <= 0.25 + 1e-9, "poikkeama rajoissa");
            Oleta.Tosi(KaukoSalamat.Muoto(1234, 14)[7] == m[7], "toistettava siemenestä");
            var h = KaukoSalamat.Muoto(1234, 6, true);
            Oleta.Tosi(h[0].y >= 0.4 && h[0].y <= 0.7 && h[5].y < h[0].y, "haara alkaa keskeltä ja kulkee alas");
        }
    }
}
