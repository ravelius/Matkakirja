// VAPAA LENTO JA PALUU KIERROKSELLE (omistaja 9.10., Päätoimittaja juna 170): kierroksella pelaaja aloittaa vapaan lennon, lentää
// käsiohjauksella poispäin, ja "Palaa kierrokselle" lentää pehmeästi keskeytyskohtaan, josta kierros jatkuu kesken jääneestä kohteesta.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class VapaaLentoTestit
    {
        const double Dt = 1 / 30.0;

        [Testi] static void VapaaLentoJaPaluuKeskeytyskohtaan()
        {
            var c = PalloKaupungitTestit.Lue().First(x => x.Id == "pariisi");
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(c.Lat, c.Lon));
                double t = 0; var vastaukset = new List<(double t, int n, string toive)>(); var hiljaa = new List<double>();
                s.Pyyda += (n, toive) => vastaukset.Add((t + 2, n, toive));
                s.AlkaaPuhua += k => hiljaa.Add(t + k.KestoS);
                s.Aloita(c.Nimi);
                s.AloitaKierros(c.Kohteet.Select(k => (k.Nimi, k.Lat, k.Lon)).ToList());
                void Askel()
                {
                    t += Dt;
                    for (int j = vastaukset.Count - 1; j >= 0; j--)
                    {
                        if (vastaukset[j].t > t) continue;
                        var v = vastaukset[j]; vastaukset.RemoveAt(j);
                        var k = Array.Find(c.Kohteet, x => x.Nimi == v.toive);
                        if (k != null) s.Vastaus(v.n, new OpasKohde { Id = k.Id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, KokoM = k.KokoM, KorkeusM = k.KorkeusM, Luokka = k.Luokka, KestoS = k.KestoS, Kierros = true });
                    }
                    for (int j = hiljaa.Count - 1; j >= 0; j--) if (hiljaa[j] <= t) { hiljaa.RemoveAt(j); s.AaniLoppui(); }
                    s.Paivita(Dt, _ => 35, () => true);
                }
                // Lennolle kolmanteen kohteeseen, kun sen kerronta jo soi (puhe alkaa lennon alussa).
                var toinen = c.Kohteet[2];
                for (int i = 0; i < 30 * 300 && !(s.Vaihe == OpasVaihe.Lentaa && s.Nykyinen?.Id == toinen.Id && s.VaiheAika > 5); i++) Askel();
                Oleta.Tosi(s.Nykyinen?.Id == toinen.Id && s.VapaaLentoKaytettavissa, "vapaa lento käytettävissä kierroksella");
                Oleta.Tosi(!s.PaluuKierrokselleKaytettavissa, "paluu ei käytettävissä ennen vapaata lentoa");
                Oleta.Tosi(s.AloitaVapaaLento(), "vapaa lento alkoi");
                Oleta.Tosi(s.VapaaTila && s.KierrosKeskeytetty && !s.KierrosKaynnissa, "vapaa tila, kierros keskeytetty");
                var keskeytys = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon);
                // Käsiohjaus eteenpäin 8 s.
                s.VapaaTapit = (0, 1, 0, 0);
                for (int i = 0; i < 30 * 8; i++) Askel();
                s.VapaaTapit = (0, 0, 0, 0);
                for (int i = 0; i < 30 * 3; i++) Askel();
                var vapaa = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon);
                double pois = Math.Sqrt(Math.Pow(vapaa.e - keskeytys.e, 2) + Math.Pow(vapaa.n - keskeytys.n, 2));
                Oleta.Tosi(pois > 20, $"vapaa lento liikkui keskeytyskohdasta ({pois:F0} m)");
                Oleta.Tosi(s.PaluuKierrokselleKaytettavissa && !s.VapaaLentoKaytettavissa, "paluu käytettävissä vapaassa lennossa");
                Oleta.Tosi(s.PalaaKierrokselle(), "paluu alkoi");
                Oleta.Tosi(s.PaluuLennossa && s.Vaihe == OpasVaihe.Lentaa && !s.VapaaTila, "paluulento käynnissä");
                double maxDv = 0, maxT = 0, paluuT0 = t, alkuV = -1, loppuV = 0; var ed = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon); double edV = 0; bool perilla = false; double lahinPaluu = double.MaxValue;
                for (int i = 0; i < 30 * 60; i++)
                {
                    Askel();
                    var e = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon);
                    double v = Math.Sqrt(Math.Pow(e.e - ed.e, 2) + Math.Pow(e.n - ed.n, 2) + Math.Pow(e.u - ed.u, 2)) / Dt;
                    if (s.PaluuLennossa) { if (alkuV < 0) alkuV = v; loppuV = v; if (Math.Abs(v - edV) > maxDv) { maxDv = Math.Abs(v - edV); maxT = t - paluuT0; } lahinPaluu = Math.Sqrt(Math.Pow(e.e - keskeytys.e, 2) + Math.Pow(e.n - keskeytys.n, 2) + Math.Pow(e.u - keskeytys.u, 2)); }
                    ed = e; edV = v;
                    if (!s.PaluuLennossa && s.KierrosKaynnissa) { perilla = true; break; }
                }
                Oleta.Tosi(perilla, "paluu perillä ja kierros jatkuu");
                Oleta.Tosi(lahinPaluu < 3, $"paluu keskeytyskohtaan ({lahinPaluu:F1} m)");
                Oleta.Tosi(alkuV < 0.5 && loppuV < 0.5, $"paluu alkaa ja päättyy levossa ({alkuV:F2} / {loppuV:F2} m/s)");
                Oleta.Tosi(maxDv < 1.0, $"paluulento pehmeä (nopeushyppy {maxDv:F2} m/s ruudussa, {maxT:F1} s paluun alusta, kesto {s.LentoKestoS:F1} s)");
                // Kesken jäänyt kohde luetaan alusta.
                for (int i = 0; i < 30 * 60 && s.Vaihe != OpasVaihe.Puhuu; i++) Askel();
                Oleta.Tosi(s.Nykyinen?.Id == toinen.Id, $"kierros jatkuu kesken jääneestä kohteesta ({s.Nykyinen?.Nimi})");
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }
    }
}
