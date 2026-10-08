// VOUDIN KIISTA (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 6 vaiheet 5–6): katseikkunat 8–14 s ja 20–26 s,
// toisto 40 s kiistan jälkeen, kulho ≤ 1,5 m, SaaOttaa (katse hoitajaan tai kulma > 50° tai matka > 5 m) v44v-datan voudilla ja
// avainrenkaalla, ja huonesimulaatiossa: naamioitu pelaaja ottaa renkaan katseikkunassa ilman epäilyä.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VoudinKiistaTestit
    {
        const double Dt = 1 / 60.0, Tol = 0.05;

        static KavelyMerkki Merkki(string nimi) { foreach (var m in Huonesimulaatio.Data.Merkit) if (m.Nimi == nimi) return m; throw new Exception(nimi + " puuttuu"); }

        [Testi] static void KatseikkunatJaToisto()
        {
            var k = new VoudinKiista();
            k.Paivita(100); Oleta.Tosi(k.Kiista < 0 && !k.KatsooPois, "ilman kulhoa ei kiistaa");
            Oleta.Tosi(!k.KulhoLaskettu(VoudinKiista.KulhoM + 0.1), "kulho liian kaukana");
            Oleta.Tosi(k.KulhoLaskettu(1.0) && k.Alkoi && !k.KulhoLaskettu(1.0), "kulho pöydälle → kiista kerran");
            k.Alkoi = false;
            var vaihdot = new System.Collections.Generic.List<double>(); int alkoi = 0;
            for (double t = 0; t < 150; t += Dt) { k.Paivita(Dt); if (k.Kaantyi) { k.Kaantyi = false; vaihdot.Add(t + Dt); } if (k.Alkoi) { k.Alkoi = false; alkoi++; } }
            var odotetut = new[] { 8, 14, 20, 26, 78, 84, 90, 96, 148 };
            Oleta.Sama(odotetut.Length, vaihdot.Count, string.Join(", ", vaihdot.ConvertAll(x => x.ToString("F2"))));
            for (int i = 0; i < odotetut.Length; i++) Oleta.Tosi(Math.Abs(vaihdot[i] - odotetut[i]) <= Tol, $"vaihto {i}: {vaihdot[i]:F2} s ≠ {odotetut[i]} s");
            Oleta.Sama(2, alkoi, "kiista toistuu 70 s:n välein (30 s + 40 s)");
            Oleta.Sama(52.0, VoudinKiista.PisinOdotus, "pisin odotus ikkunaan (26 s → 78 s)");
        }

        [Testi] static void SaaOttaaDatanVoudilla()
        {
            var vouti = Merkki("istuu:vouti"); var rengas = Merkki("esine:avainrengas"); var poyta = Merkki("reitti:pelaaja-57");
            double yaw = vouti.KiertoY.Value * 180 / Math.PI;   // glTF-kehys (Unity 180° − kierto_y)
            var k = new VoudinKiista();
            Oleta.Tosi(!k.SaaOttaa(rengas.X - vouti.X, rengas.Z - vouti.Z, yaw) && !k.SaaOttaa(poyta.X - vouti.X, poyta.Z - vouti.Z, yaw), "vouti katsoo pöytää: ei avaimia");
            k.KulhoLaskettu(0); k.Paivita(9);
            Oleta.Tosi(k.KatsooPois && k.SaaOttaa(poyta.X - vouti.X, poyta.Z - vouti.Z, yaw), "katseikkunassa saa ottaa");
            var r = new VoudinKiista();
            Oleta.Tosi(r.SaaOttaa(0, 5.1, 0) && !r.SaaOttaa(0, 4.9, 0), "5 m raja");
            Oleta.Tosi(r.SaaOttaa(Math.Sin(51 * Math.PI / 180), Math.Cos(51 * Math.PI / 180), 0) && !r.SaaOttaa(Math.Sin(49 * Math.PI / 180), Math.Cos(49 * Math.PI / 180), 0), "50° raja");
        }

        [Testi] static void NaamioituOttaaRenkaanIkkunassaHuonesimulaatiossa()
        {
            // Pelaaja naamiossa voudin pöydän edessä (reitti:pelaaja-57) laskee kulhon ja odottaa ikkunaa: ottaa renkaan (≤ 1 s) ja
            // poistuu; kukaan (vouti, hoitaja, linnaväki, apulainen) ei epäile.
            var w = Huonesimulaatio.UusiM(); w.Naamio = true;
            var poyta = Merkki("reitti:pelaaja-57"); var kulho = Merkki("esine:kulho-poydalle"); var vouti = Merkki("istuu:vouti");
            (w.PX, w.PY, w.PZ) = (poyta.X, poyta.Y, poyta.Z);
            var k = new VoudinKiista();
            Oleta.Tosi(k.KulhoLaskettu(Huonesimulaatio.Etaisyys2(w.PX, w.PZ, kulho.X, kulho.Z)), "kulho ulottuu pöydän merkistä");
            double yaw = vouti.KiertoY.Value * 180 / Math.PI, otettu = -1;
            for (double t = 0; t < 40 && otettu < 0; t += Huonesimulaatio.Dt)
            {
                w.Odota(false); k.Paivita(Huonesimulaatio.Dt);
                if (k.SaaOttaa(w.PX - vouti.X, w.PZ - vouti.Z, yaw)) otettu = t;
            }
            for (double t = 0; t < 1; t += Huonesimulaatio.Dt) w.Odota(false);   // otto
            var paluu = Merkki("reitti:pelaaja-58");
            for (int i = 0; i < 600 && !w.Askel((paluu.X, paluu.Y, paluu.Z), false); i++) { }
            Console.WriteLine($"      avainrengas otettu {otettu:F1} s kulhosta, kiinni {w.Kiinni}");
            Oleta.Tosi(Math.Abs(otettu - VoudinKiista.Ikkunat[0].Alku) <= 0.1, $"ensimmäinen ikkuna 8 s ({otettu:F1})");
            Oleta.Sama(0, w.Kiinni);
            foreach (var h in w.Hahmot) if (h.Aktiivinen && h.MerkkiOsa == "palatsi") Oleta.Tosi(h.Aivot.Mittari < 0.15, $"{h.Nimi} ei epäile ({h.Aivot.Mittari:F2})");
        }
    }
}
