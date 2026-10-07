// HISTORIAMOOTTORI V3 (Siirtoseppä 7.10.2026): vartijan aivot — partio, näkökartio ja valoisuus, epäily → kiinni, harhautus äänellä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VartijaTestit
    {
        static readonly List<(double, double, double)> Reitti = new List<(double, double, double)> { (0, 0, 1.0), (0, 10, 1.0) };

        // Yksinkertainen liike: vartija kävelee kohteeseen Vauhdilla (sovittimen NavMeshin sijaan).
        static void Aja(Vartija v, ref double x, ref double z, Func<double, double, VartijanSyote> syote, double sekuntia)
        {
            for (double t = 0; t < sekuntia; t += 1 / 30.0)
            {
                var s = syote(x, z); s.VartijaX = x; s.VartijaZ = z;
                v.Paivita(1 / 30.0, s);
                double dx = v.KohdeX - x, dz = v.KohdeZ - z, d = Math.Sqrt(dx * dx + dz * dz);
                if (d > 1e-6 && v.Vauhti > 0) { double a = Math.Min(d, v.Vauhti / 30.0); x += dx / d * a; z += dz / d * a; v.Yaw = Math.Atan2(dx, dz) * 180 / Math.PI; }
            }
        }

        static VartijanSyote Kaukana(double x, double z) => new VartijanSyote { PelaajaX = 50, PelaajaZ = 50, NakolinjaVapaa = false, Valoisuus = 1 };

        [Testi] static void PartioKiertaaReitin()
        {
            var v = new Vartija(Reitti); double x = 0, z = 0;
            Aja(v, ref x, ref z, Kaukana, 12);
            Oleta.Tosi(z > 8 || v.KohdeZ < 1, $"vartija eteni reitillä (z {z:F1}, kohde {v.KohdeZ:F1})");
            Aja(v, ref x, ref z, Kaukana, 12);
            Oleta.Sama(VartijanTila.Partio, v.Tila);
        }

        [Testi] static void NakeeEdestaMuttaEiTakaaEikaPimeassaKaukaa()
        {
            var v = new Vartija(Reitti, yaw: 0);
            var edessa = new VartijanSyote { VartijaX = 0, VartijaZ = 0, PelaajaX = 0.5, PelaajaZ = 5, NakolinjaVapaa = true, Valoisuus = 1 };
            Oleta.Tosi(v.NakoVoima(edessa) > 0.3, $"edessä näkyy ({v.NakoVoima(edessa):F2})");
            var takana = edessa; takana.PelaajaZ = -5;
            Oleta.Sama(0.0, v.NakoVoima(takana));
            var pimea = edessa; pimea.PelaajaZ = 6; pimea.Valoisuus = 0; pimea.Hiipii = true;   // ulottuma 10·0,35·0,7 = 2,45 m
            Oleta.Sama(0.0, v.NakoVoima(pimea));
            var seina = edessa; seina.NakolinjaVapaa = false;
            Oleta.Sama(0.0, v.NakoVoima(seina));
            var piilo = edessa; piilo.Piilossa = true;
            Oleta.Sama(0.0, v.NakoVoima(piilo));
        }

        [Testi] static void EpailyJaKiinni()
        {
            var v = new Vartija(Reitti, yaw: 0); double x = 0, z = 0;
            // Pelaaja paikallaan 3 m edessä: epäily ~0,4 s:ssa, ei vielä kiinni 0,6 s:ssa (reaktioaika), sitten takaa-ajo ja kiinni 1,2 m:ssä.
            VartijanSyote Nakyy(double vx, double vz) => new VartijanSyote { PelaajaX = 0, PelaajaZ = 3, NakolinjaVapaa = true, Valoisuus = 1 };
            Aja(v, ref x, ref z, Nakyy, 0.6);
            Oleta.Tosi(v.Tila == VartijanTila.Epaily, $"epäily, ei kiinni ({v.Tila}, mittari {v.Mittari:F2})");
            Aja(v, ref x, ref z, Nakyy, 4);
            Oleta.Sama(VartijanTila.Kiinni, v.Tila);
            Oleta.Tosi(z > 1.5, $"vartija ajoi takaa ennen kiinniottoa (z {z:F1})");
            v.Nollaa(x, z);
            Oleta.Tosi(v.Tila == VartijanTila.Partio && v.Mittari == 0, "nollaus partioon");
        }

        [Testi] static void HarhautusAanellaJaPaluu()
        {
            var v = new Vartija(Reitti, yaw: 0); double x = 0, z = 0;
            bool heitetty = false;
            VartijanSyote Heitto(double vx, double vz)
            {
                var s = Kaukana(vx, vz);
                if (!heitetty) { s.Aanet = new List<Aanilahde> { new Aanilahde(6, 2, 12) }; heitetty = true; }
                return s;
            }
            Aja(v, ref x, ref z, Heitto, 0.1);
            Oleta.Sama(VartijanTila.Etsinta, v.Tila);
            Aja(v, ref x, ref z, Kaukana, 6);
            Oleta.Tosi(Math.Abs(x - 6) < 0.7 && Math.Abs(z - 2) < 0.7, $"vartija meni äänen luo ({x:F1}, {z:F1})");
            Aja(v, ref x, ref z, Kaukana, Vartija.EtsintaKatseluS + 1);
            Oleta.Sama(VartijanTila.Partio, v.Tila);
            var kaukoAani = new VartijanSyote { NakolinjaVapaa = false, Aanet = new List<Aanilahde> { new Aanilahde(40, 40, 5) } };
            var v2 = new Vartija(Reitti); kaukoAani.VartijaX = 0; kaukoAani.VartijaZ = 0; v2.Paivita(0.1, kaukoAani);
            Oleta.Sama(VartijanTila.Partio, v2.Tila);
        }

        // Pelattavuusmalli 7.10. kohta 11: 1 000 satunnaista ajoa siemenellä — ei yhtään kiinniottoa ilman 1,5 s:n varoitusta, merkkiä ja sydäntä.
        [Testi] static void VaroitusAinaEnnenKiinniottoa()
        {
            var r = new Random(7); int kiinni = 0;
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var v = new Vartija(Reitti, yaw: r.NextDouble() * 360 - 180); double x = 0, z = r.NextDouble() * 10;
                double px = r.NextDouble() * 8 - 4, pz = r.NextDouble() * 14 - 2, valo = r.NextDouble(); bool hiipii = r.Next(2) == 0;
                double t = 0, valpasS = -1, sydanAlku = -1; bool merkkiNahty = false;
                for (int i = 0; i < 300 && v.Tila != VartijanTila.Kiinni; i++, t += 1 / 30.0)
                {
                    px += (r.NextDouble() - 0.5) * 0.2; pz += (r.NextDouble() - 0.5) * 0.2;
                    var s = new VartijanSyote { VartijaX = x, VartijaZ = z, PelaajaX = px, PelaajaZ = pz, NakolinjaVapaa = r.NextDouble() > 0.05, Valoisuus = valo, Hiipii = hiipii, PelaajaVauhti = r.NextDouble() * 3 };
                    v.Paivita(1 / 30.0, s);
                    if (v.Tila != VartijanTila.Partio && v.Tila != VartijanTila.Paluu && v.Tila != VartijanTila.Kiinni && valpasS < 0) valpasS = t;
                    if (v.Tila == VartijanTila.Partio) valpasS = -1;
                    if (v.Tila == VartijanTila.Epaily || v.Tila == VartijanTila.Halytys) merkkiNahty = true;
                    if (v.SydanS > 0 && sydanAlku < 0) sydanAlku = t;
                    double dx = v.KohdeX - x, dz = v.KohdeZ - z, d = Math.Sqrt(dx * dx + dz * dz);
                    if (d > 1e-6 && v.Vauhti > 0) { double a = Math.Min(d, v.Vauhti / 30.0); x += dx / d * a; z += dz / d * a; v.Yaw = Math.Atan2(dx, dz) * 180 / Math.PI; }
                }
                if (v.Tila == VartijanTila.Kiinni)
                {
                    kiinni++;
                    Oleta.Tosi(valpasS >= 0 && t - valpasS >= Vartija.VaroitusS - 1e-6 && merkkiNahty && sydanAlku >= 0 && t - sydanAlku >= Vartija.SydanVahS - 0.05,
                        $"ajo {ajo}: kiinni ilman varoitusta (vaiheissa {t - valpasS:F2} s, sydän {t - sydanAlku:F2} s)");
                }
            }
            Oleta.Tosi(kiinni > 20, $"kiinniottoja syntyi ({kiinni})");
        }

        [Testi] static void EtsiiJaValppaus()
        {
            var v = new Vartija(Reitti, yaw: 0); double x = 0, z = 0;
            v.Piilot.Add((1, 4)); v.Piilot.Add((-1, 5)); v.Piilot.Add((5, 9));
            // Pelaaja näkyy hetken (mittari ≥ 0,6), katoaa: tutkii → etsii 2 lähintä piiloa → paluu ja valppaus 60 s.
            VartijanSyote Nakyy(double vx, double vz) => new VartijanSyote { PelaajaX = 0, PelaajaZ = 4, NakolinjaVapaa = true, Valoisuus = 0.6 };
            Aja(v, ref x, ref z, Nakyy, 1.4);
            Oleta.Tosi(v.Mittari >= 0.6 && v.Tila == VartijanTila.Epaily, $"epäily ({v.Tila}, {v.Mittari:F2})");
            Aja(v, ref x, ref z, Kaukana, 2.5 + Vartija.EtsintaKatseluS + 2.5);
            Oleta.Sama(VartijanTila.Etsii, v.Tila);
            Aja(v, ref x, ref z, Kaukana, Vartija.EtsiiS + 1);
            Oleta.Tosi(v.Tila == VartijanTila.Partio && v.Valppaus > 40, $"paluu ja valppaus ({v.Tila}, {v.Valppaus:F0} s)");
            // Valppaana epäily alkaa jo 0,2:sta.
            Oleta.Tosi(v.Mittari < 0.2, "mittari laskenut");
        }

        [Testi] static void IrtipaasyKerranMinuutissa()
        {
            var v = new Vartija(Reitti, yaw: 0); double x = 0, z = 0;
            VartijanSyote Vieressa(double vx, double vz) => new VartijanSyote { PelaajaX = 0, PelaajaZ = 1, NakolinjaVapaa = true, Valoisuus = 1 };
            for (int i = 0; i < 200 && v.Tila != VartijanTila.Kiinni; i++) Aja(v, ref x, ref z, Vieressa, 1 / 30.0);
            Oleta.Sama(VartijanTila.Kiinni, v.Tila);
            Oleta.Tosi(v.Irrottaudu(), "ikkunassa irti");
            double z0 = z;
            Aja(v, ref x, ref z, Vieressa, 2.9);
            Oleta.Tosi(v.Tila == VartijanTila.Halytys && Math.Abs(z - z0) < 0.01, "horjahtaa 3 s paikallaan");
            Aja(v, ref x, ref z, Vieressa, 3);
            Oleta.Sama(VartijanTila.Kiinni, v.Tila);
            Oleta.Tosi(!v.Irrottaudu(), "toinen irtipääsy minuutin sisällä ei onnistu");
            var w = new Vartija(Reitti, yaw: 0); x = 0; z = 0;
            for (int i = 0; i < 200 && w.Tila != VartijanTila.Kiinni; i++) Aja(w, ref x, ref z, Vieressa, 1 / 30.0);
            Aja(w, ref x, ref z, Vieressa, Vartija.IrtiIkkunaS + 0.1);
            Oleta.Tosi(!w.Irrottaudu(), "ikkunan jälkeen ei irti");
        }

        [Testi] static void KokkiHuutaaEikaJahtaa()
        {
            var v = new Vartija(Reitti, yaw: 0) { Profiili = VartijaProfiili.Kokki }; double x = 0, z = 0;
            VartijanSyote Nakyy(double vx, double vz) => new VartijanSyote { PelaajaX = 0, PelaajaZ = 2, NakolinjaVapaa = true, Valoisuus = 1 };
            Aja(v, ref x, ref z, Nakyy, 4);
            Oleta.Tosi(v.Tila == VartijanTila.Halytys && v.Huuto && Math.Abs(z) < 0.01, $"kokki huutaa paikaltaan ({v.Tila}, z {z:F2})");
            var a = new Vartija(Reitti, yaw: 0) { Profiili = VartijaProfiili.Apulainen };
            a.Paivita(0.1, new VartijanSyote { NakolinjaVapaa = false, Aanet = new List<Aanilahde> { new Aanilahde(1, 1, 12) } });
            Oleta.Sama(VartijanTila.Partio, a.Tila);   // apulainen ei kuule
            var r = new Vartija(Reitti) { Profiili = VartijaProfiili.Renki };
            Oleta.Sama(0.0, r.NakoVoima(new VartijanSyote { PelaajaZ = 2, NakolinjaVapaa = true, Valoisuus = 1 }));
        }
    }
}
