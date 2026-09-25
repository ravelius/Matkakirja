// Löydös 119: pergamenttinen pohjapallo (Kartta/Pohjapallolaskenta.cs): verkko, jänne, syvyysperuste, näkyvyys ja sävy.
using System;
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class PohjapalloTestit
    {
        [Testi]
        static void IkosaedrinKoko()
        {
            var (k0, t0) = Pohjapallolaskenta.Ikosaedri(0);
            Oleta.Sama(12, k0.Count, "jako 0: kärjet");
            Oleta.Sama(60, t0.Count, "jako 0: 20 kolmiota");
            var (k, t) = Pohjapallolaskenta.Ikosaedri(Pohjapallolaskenta.Jako);
            // 10·4^n + 2 kärkeä, 20·4^n kolmiota; jaettujen keskipisteiden ansiosta ei tuplakärkiä.
            Oleta.Sama(10242, k.Count, "jako 5: kärjet");
            Oleta.Sama(20480 * 3, t.Count, "jako 5: kolmiot");
            Oleta.Tosi(k.Count <= 65535, "16-bittiset indeksit riittävät");
        }

        [Testi]
        static void KarjetYksikkopallolla()
        {
            var (k, _) = Pohjapallolaskenta.Ikosaedri(3);
            foreach (var v in k)
                Oleta.Tosi(Math.Abs(Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z) - 1.0) < 1e-12, $"kärki {v}");
        }

        [Testi]
        static void KolmiotUlospainJaUmpinainen()
        {
            var (k, t) = Pohjapallolaskenta.Ikosaedri(4);
            var suunnatut = new HashSet<(int, int)>();
            for (int i = 0; i < t.Count; i += 3)
            {
                var a = k[t[i]]; var b = k[t[i + 1]]; var c = k[t[i + 2]];
                // (b − a) × (c − a) osoittaa ulos: kierto vastapäivään ulkoa (oikeakätinen ECEF).
                double ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z, vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
                double nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
                Oleta.Tosi(nx * (a.x + b.x + c.x) + ny * (a.y + b.y + c.y) + nz * (a.z + b.z + c.z) > 0, $"kolmio {i / 3} ulos");
                foreach (var (p, q) in new[] { (t[i], t[i + 1]), (t[i + 1], t[i + 2]), (t[i + 2], t[i]) })
                    Oleta.Tosi(suunnatut.Add((p, q)), $"särmä {p}→{q} kahdesti samaan suuntaan");
            }
            // Umpinainen: jokaisella särmällä on vastakkainen pari (ei reunaa, ei rakoa).
            foreach (var (p, q) in suunnatut) Oleta.Tosi(suunnatut.Contains((q, p)), $"särmältä {p}→{q} puuttuu pari");
        }

        [Testi]
        static void SyvyysJaSateet()
        {
            var (x, y, z) = Pohjapallolaskenta.Sateet();
            Oleta.Sama(6375137.0, x, "päiväntasaaja");
            Oleta.Sama(x, y, "pyörähdysellipsoidi");
            Oleta.Tosi(Math.Abs(z - (6356752.314245 - 3000.0)) < 1e-6, "napa-akseli");
            Oleta.Sama(3000.0, Pohjapallolaskenta.SyvyysM, "Fablen hyväksymä 3 km");
        }

        [Testi]
        static void VerkonJanneAlleKahdenKilometrin()
        {
            double r = Pohjapallolaskenta.Sateet().x;
            var (k5, t5) = Pohjapallolaskenta.Ikosaedri(5);
            double p5 = Pohjapallolaskenta.SuurinPainuma(k5, t5, r);
            Oleta.Tosi(p5 > 500.0 && p5 < 2000.0, $"jako 5: painuma {p5:0} m");
            var (k4, t4) = Pohjapallolaskenta.Ikosaedri(4);
            double p4 = Pohjapallolaskenta.SuurinPainuma(k4, t4, r);
            // Jako puolittaa särmän → painuma neljäsosaan.
            Oleta.Tosi(p4 / p5 > 3.5 && p4 / p5 < 4.5, $"jako 4 / jako 5 = {p4 / p5:0.00}");
        }

        [Testi]
        static void EtupintaNousisiKarkeidenLaattojenLapi()
        {
            // Karttasepän RTIN rajaa jänteen painuman kynnykseen ½ · 77 067 m / 2^z: tasoilla 0–3 kynnys ylittää 3 km:n
            // syvyyden (merilaatan kolmiot painuvat puolikkaan ja koko kynnyksen välille), joten etupinta näkyisi pilkkuina
            // koko pallon näkymässä → varjostin piirtää takapinnan. Tasosta 4 alkaen kynnys on syvyyden alla.
            Oleta.Tosi(Math.Abs(Pohjapallolaskenta.MaastonPainuma(0) - 38533.7) < 1.0, "z0 ≈ 38,5 km");
            for (int z = 0; z <= 3; z++)
                Oleta.Tosi(Pohjapallolaskenta.MaastonPainuma(z) > Pohjapallolaskenta.SyvyysM, "z" + z);
            for (int z = 4; z <= 12; z++)
                Oleta.Tosi(Pohjapallolaskenta.MaastonPainuma(z) < Pohjapallolaskenta.SyvyysM, "z" + z);
            Oleta.Sama(0.5, Pohjapallolaskenta.MaastonPainuma(30), "alaraja 0,5 m (tee-maasto.mjs)");
        }

        [Testi]
        static void TakapintaOnKaikkienEtupuolenPisteidenTakana()
        {
            // Säde kamerasta: jokainen piste säteen alkupuoliskolla (ennen lähintä kohtaa maan keskipisteeseen) on lähempänä
            // kuin takapinnan osuma t2, olipa se pallon sisällä (jänne painunut syvälle) tai ulkona (maasto).
            var r = new Random(119);
            double R = Pohjapallolaskenta.Sateet().x;
            for (int i = 0; i < 2000; i++)
            {
                double korkeus = 100.0 + r.NextDouble() * 3.0e7;
                var kamera = (x: 0.0, y: 0.0, z: R + 3000.0 + korkeus);
                double kulma = r.NextDouble() * Math.Asin(Math.Min(1.0, R / (R + 3000.0 + korkeus)));
                var suunta = (x: Math.Sin(kulma), y: 0.0, z: -Math.Cos(kulma));
                double b = kamera.z * suunta.z;                        // oc · d
                double q2 = kamera.z * kamera.z - b * b;               // |q|²
                double h = Math.Sqrt(Math.Max(R * R - q2, 0.0));
                double t2 = -b + h, tKeski = -b;
                double tP = r.NextDouble() * tKeski;                   // mikä tahansa etupuolen piste säteellä
                Oleta.Tosi(tP < t2, $"säde {i}: piste {tP:0} m, takapinta {t2:0} m");
            }
        }

        [Testi]
        static void NakyvyysTilasta()
        {
            Oleta.Tosi(Pohjapallolaskenta.Nakyy(Pohjapallolaskenta.Tila.Auto, false), "auto: päällä");
            Oleta.Tosi(!Pohjapallolaskenta.Nakyy(Pohjapallolaskenta.Tila.Auto, true), "auto: piilossa magentan ajan");
            Oleta.Tosi(Pohjapallolaskenta.Nakyy(Pohjapallolaskenta.Tila.Paalle, true), "paalle: myös magentan kanssa");
            Oleta.Tosi(Pohjapallolaskenta.Nakyy(Pohjapallolaskenta.Tila.Paalle, false), "paalle");
            Oleta.Tosi(!Pohjapallolaskenta.Nakyy(Pohjapallolaskenta.Tila.Pois, false), "pois");
            Oleta.Tosi(!Pohjapallolaskenta.Nakyy(Pohjapallolaskenta.Tila.Pois, true), "pois magentan kanssa");
        }

        [Testi]
        static void PintaJaSavy()
        {
            Oleta.Sama(Pohjapallolaskenta.Pinta.Pergamentti, Pohjapallolaskenta.Valitse(false, true), "kartta");
            Oleta.Sama(Pohjapallolaskenta.Pinta.Satelliitti, Pohjapallolaskenta.Valitse(true, true), "satelliittilento");
            Oleta.Sama(Pohjapallolaskenta.Pinta.Satelliitti, Pohjapallolaskenta.Valitse(true, false), "lento voittaa");
            Oleta.Sama(Pohjapallolaskenta.Pinta.Reliefi, Pohjapallolaskenta.Valitse(false, false), "linssin reliefi");
            Oleta.Tosi(Pohjapallolaskenta.Savy(Pohjapallolaskenta.Pinta.Pergamentti) == (0xe5, 0xd0, 0xa7), "renderöidyn pergamentin mediaani");
            Oleta.Tosi(Pohjapallolaskenta.Savy(Pohjapallolaskenta.Pinta.Satelliitti) == (17, 46, 92), "S2MeriVari");
            Oleta.Tosi(Pohjapallolaskenta.Savy(Pohjapallolaskenta.Pinta.Reliefi) == (38, 78, 145), "ReliefiPohjoinen");
        }
    }
}
