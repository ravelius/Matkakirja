// PAKO JA KOMERO (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huoneet 9–10): Pako-ytimen vaiheet ja ajat (20/45 s,
// K4 4 s, uinti 12 s, soutaja 1,5 s ennen, köysi-armo 20 s, K5 12 s), myöhästyminen ja uusi yritys ilman jumia, 1 000 satunnaista
// tapahtumasarjaa; Komero: arkku vasta tiilten jälkeen, kilpien kääntö kiertää, jokaisesta asennosta pääsee auki, satunnaissarjat.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class PakoJaKomeroTestit
    {
        const double Dt = 1 / 60.0, Tol = 0.05;

        static double Aja(Pako p, double max, bool k4, Func<Pako, bool> ehto)
        {
            for (double t = 0; t < max; t += Dt) { p.Paivita(Dt, k4); if (ehto(p)) return t + Dt; }
            return -1;
        }

        [Testi] static void SujuvaPakoVaiheetJaAjat()
        {
            var p = new Pako();
            p.Paivita(5, false); Oleta.Sama(PakoVaihe.Odottaa, p.Vaihe);
            Oleta.Tosi(!p.Kiinnita(), "ei kiinnitystä ennen kelloa");
            p.ArkkuAuki(); Oleta.Tosi(p.KelloSoi && p.Vaihe == PakoVaihe.Kello, "arkku → kello");
            Aja(p, 2, false, _ => false);
            Oleta.Tosi(p.Kiinnita() && p.Vaihe == PakoVaihe.Lasku, "köysi kramppiin");
            Aja(p, 8, false, _ => false); p.LaskuValmis();
            Oleta.Sama(PakoVaihe.Kallio, p.Vaihe);
            double esiin = Aja(p, 30, false, x => x.RantaEsiin);
            Oleta.Tosi(Math.Abs(10 + esiin - Pako.RantaEsiinS) <= Tol, $"rannan vartijat 25 s kellosta ({10 + esiin:F2})");
            Aja(p, 1, true, x => x.Sukelsi);
            Oleta.Sama(PakoVaihe.K4, p.Vaihe);
            double k4 = Aja(p, 10, false, x => x.Vaihe == PakoVaihe.Uinti);
            double huuto = Aja(p, 20, false, x => x.SoutajaHuutaa);
            double uinti = Aja(p, 20, false, x => x.Vaihe == PakoVaihe.Koysi);
            Oleta.Tosi(Math.Abs(k4 - Pako.K4S) <= Tol && Math.Abs(huuto - (Pako.UintiS - Pako.SoutajaEnnenS)) <= Tol && Math.Abs(huuto + uinti - Pako.UintiS) <= Tol,
                $"K4 {k4:F2} s, soutaja {huuto:F2} s, uinti {huuto + uinti:F2} s");
            Oleta.Tosi(p.Veneessa && p.Katkaise() && p.Katkaistu && !p.Katkaise(), "Katkaise kerran");
            double k5 = Aja(p, 20, false, x => x.Valmistui);
            Oleta.Tosi(Math.Abs(k5 - Pako.K5S) <= Tol && p.Vaihe == PakoVaihe.Valmis, $"K5 {k5:F2} s → valmis");
        }

        [Testi] static void KoysiArmo20s()
        {
            var p = new Pako(); p.ArkkuAuki(); p.Kiinnita(); p.LaskuValmis(); Aja(p, 1, true, x => x.Sukelsi);
            Aja(p, 20, false, x => x.Vaihe == PakoVaihe.Koysi);
            double armo = Aja(p, 30, false, x => x.Vaihe == PakoVaihe.K5);
            Oleta.Tosi(Math.Abs(armo - 2 * Pako.KoysiS) <= Tol && p.Katkaistu, $"soutaja irrottaa itse {armo:F2} s:ssa");
        }

        [Testi] static void MyohastyminenJaUusiYritysEiJumia()
        {
            var p = new Pako(); p.ArkkuAuki(); p.Kiinnita(); p.LaskuValmis();
            double myoh = Aja(p, 60, false, x => x.Myohastyi);
            Oleta.Tosi(Math.Abs(myoh - Pako.MyohassaS) <= Tol && p.Vaihe == PakoVaihe.Kello, $"myöhästyi 45 s:ssa ({myoh:F2}) → kello-vaihe (T10a)");
            p.RantaEsiin = false; p.Myohastyi = false;
            Aja(p, 40, false, _ => false);   // tyrmä ja paluu köysilaskun alkuun
            Oleta.Tosi(p.Kiinnita() && p.UusiYritys && p.KelloS < Dt, "uusi kiinnitys aloittaa ikkunan alusta (rannan vartijat piiloon)");
            p.LaskuValmis();
            double esiin = Aja(p, 30, false, x => x.RantaEsiin);
            Oleta.Tosi(Math.Abs(esiin - Pako.RantaEsiinS) <= Tol, $"uudessa yrityksessä vartijat taas 25 s:ssa ({esiin:F2})");
            Aja(p, 5, true, x => x.Sukelsi);
            Oleta.Sama(PakoVaihe.K4, p.Vaihe);
        }

        [Testi] static void KiinniLaskussaTaiKalliollaUusiYritys()
        {
            foreach (var vaihe in new[] { PakoVaihe.Lasku, PakoVaihe.Kallio })
            {
                var p = new Pako(); p.ArkkuAuki(); p.Kiinnita(); if (vaihe == PakoVaihe.Kallio) p.LaskuValmis();
                Aja(p, 10, false, _ => false);
                Oleta.Tosi(p.Kiinni() && p.Vaihe == PakoVaihe.Kello, $"kiinni ({vaihe}) → kello-vaihe");
                Aja(p, 30, false, _ => false);
                Oleta.Tosi(p.Kiinnita() && p.UusiYritys && p.KelloS < Dt, $"{vaihe}: uusi kiinnitys alusta");
            }
            var q = new Pako(); q.ArkkuAuki();
            Oleta.Tosi(!q.Kiinni() && q.Vaihe == PakoVaihe.Kello, "kellovaiheessa kiinni ei muuta");
        }

        [Testi] static void SatunnaisetPakosarjatPaatyvatValmiiksi()
        {
            var r = new Random(23); int myohastyi = 0;
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var p = new Pako(); var ennen = p.Vaihe;
                for (int n = 0; n < 60; n++)
                {
                    bool kiinni = false;
                    switch (r.Next(7))
                    {
                        case 6: kiinni = p.Kiinni(); break;
                        case 0: p.ArkkuAuki(); break;
                        case 1: p.Kiinnita(); break;
                        case 2: p.LaskuValmis(); break;
                        case 3: p.Katkaise(); break;
                        default: p.Paivita(r.NextDouble() * 8, r.Next(4) == 0); break;
                    }
                    if (p.Myohastyi || kiinni) { if (p.Myohastyi) myohastyi++; p.Myohastyi = false; Oleta.Sama(PakoVaihe.Kello, p.Vaihe); }
                    else Oleta.Tosi(p.Vaihe >= ennen, $"ajo {ajo}: vaihe ei taannu ilman myöhästymistä ({ennen} → {p.Vaihe})");
                    ennen = p.Vaihe;
                }
                // Määrätietoinen pelaaja mistä tahansa tilasta: kello, kiinnitys, 8 s lasku, 12 s kallio, sukellus, katkaisu.
                p.ArkkuAuki(); p.Kiinnita(); double lasku = 0;
                for (double t = 0; t < 120 && p.Vaihe != PakoVaihe.Valmis; t += 0.1)
                {
                    if (p.Vaihe == PakoVaihe.Kello) p.Kiinnita();
                    if (p.Vaihe == PakoVaihe.Lasku && (lasku += 0.1) > 8) { p.LaskuValmis(); lasku = 0; }
                    p.Paivita(0.1, p.Vaihe == PakoVaihe.Kallio && p.KelloS > 12);
                    if (p.Vaihe == PakoVaihe.Koysi) p.Katkaise();
                }
                Oleta.Sama(PakoVaihe.Valmis, p.Vaihe, $"ajo {ajo}: jumi");
            }
            Oleta.Tosi(myohastyi > 10, $"myöhästymisiä syntyi ({myohastyi})");
        }

        [Testi] static void KomeroArkkuVastaTiiltenJalkeenJaKilpiKiertaa()
        {
            var k = new Komero();
            Oleta.Tosi(double.IsNaN(k.KaannaKilpea(1)) && k.Avaa() == KilpiTulos.Ei, "tiilet edessä: ei kilpiä eikä kantta");
            for (int i = 0; i < 6; i++) { k.Raavi(i); k.Raavi(i); }
            Oleta.Tosi(k.ArkkuUlottuvilla, "kaikki tiilet irti");
            Oleta.Sama(KilpiTulos.Kolahdus, k.Avaa());
            for (int i = 0; i < 3; i++) { k.KaannaKilpea(1); k.KaannaKilpea(2); }
            Oleta.Tosi(k.Lukko.Kilpi1 == 45 && k.Lukko.Kilpi2 == 45 && k.Avaa() == KilpiTulos.Auki && k.Auki, "3 × 15° → 45° → auki");
            var w = new Komero(0);
            Oleta.Tosi(w.ArkkuUlottuvilla, "ilman tiiliä arkku heti");
            double a = 0; for (int i = 0; i < 7; i++) a = w.KaannaKilpea(1);   // 15…90 (6 askelta), 7. kiertää
            Oleta.Sama(-90.0, a, "90° jälkeen kiertää −90°:een");
            Oleta.Tosi(Math.Abs(w.KaannaKilpea(1) + 75) < 1e-9, "−90 → −75");
        }

        [Testi] static void KomeroJokaisestaAsennostaAukiJaSatunnaissarjat()
        {
            // Kaikki 13 × 13 askelasentoa: kääntämällä löytyy aina avautuva asento (leveyshaku).
            for (int a = -6; a <= 6; a++)
                for (int b = -6; b <= 6; b++)
                {
                    int askelia = Askelia(a * 15.0, b * 15.0);
                    Oleta.Tosi(askelia >= 0 && askelia <= 24, $"{a * 15}° / {b * 15}°: {askelia} askelta");
                }
            var r = new Random(29);
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var k = new Komero();
                for (int n = 0; n < 40; n++)
                {
                    int t = r.Next(4);
                    if (t == 0) k.Raavi(r.Next(-1, 7), r.NextDouble());
                    else if (t == 1) k.KaannaKilpea(r.Next(1, 3));
                    else if (t == 2) k.Avaa();
                    else k.Tiilet.Paivita(r.NextDouble() * 5);
                }
                for (int i = 0; i < 6; i++) { k.Raavi(i); k.Raavi(i); }
                for (int n = 0; n < 30 && !k.Auki; n++)
                {
                    if (Math.Abs(k.Lukko.Kilpi1 - 45) > 10) k.KaannaKilpea(1);
                    else if (Math.Abs(k.Lukko.Kilpi2 - 45) > 10) k.KaannaKilpea(2);
                    else k.Avaa();
                }
                Oleta.Tosi(k.Auki, $"ajo {ajo}: arkku jäi kiinni ({k.Lukko.Kilpi1}° / {k.Lukko.Kilpi2}°)");
            }
        }

        static int Askelia(double a1, double a2)
        {
            var alku = (a1, a2); var kayty = new HashSet<(double, double)> { alku }; var jono = new Queue<((double, double), int)>(); jono.Enqueue((alku, 0));
            while (jono.Count > 0)
            {
                var ((x, y), n) = jono.Dequeue();
                var k = new Komero(0); k.Lukko.Kaanna(1, x); k.Lukko.Kaanna(2, y);
                if (k.Avaa() == KilpiTulos.Auki) return n;
                foreach (int kilpi in new[] { 1, 2 })
                {
                    var j = new Komero(0); j.Lukko.Kaanna(1, x); j.Lukko.Kaanna(2, y); j.KaannaKilpea(kilpi);
                    var s = (j.Lukko.Kilpi1, j.Lukko.Kilpi2);
                    if (kayty.Add(s)) jono.Enqueue((s, n + 1));
                }
            }
            return -1;
        }
    }
}
