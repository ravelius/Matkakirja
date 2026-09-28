// ALOITUSLENNON RATA v3 (omistajan palaute v2-videoon 27.9.2026 klo 23.5x; v2 v7:stä klo 23.0x): jokainen näyte mitataan.
// v3: kaukaa kone on pieni (vähimmäiskoko, kasvaa vain lähellä), kosketus nähdään kaukaa pienenä, usva ei hukuta maata.
// Kone aina ruudulla (pienenä tai isona), ei koskaan takaa, ohitus vasemmalta oikealle läheltä, saapuminen etuviistosta,
// lähtöpiste kuvassa alussa, kamera liikkuu koko ajan ilman nykäyksiä, alku = napautusnäkymä ja loppu = saapumisnäkymä.
// ALOITUSRATA_TAULU=1 tulostaa aikajanan 0,5 s välein (kohde ALOITUSRATA_KOHDE, oletus ateena; kaikki = kaikki kohteet).
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class AloituslennonRataTestit
    {
        const double LontooLat = 51.507, LontooLon = -0.128;
        static readonly (string Id, double Lat, double Lon)[] Kohteet =
        {
            ("ateena", 37.98, 23.73), ("rooma", 41.9, 12.5), ("istanbul", 41.01, 28.98), ("lissabon", 38.72, -9.14),
            ("pariisi", 48.857, 2.352), ("kairo", 30.04, 31.24), ("moskova", 55.75, 37.62),
        };
        /// <summary>Valintanäkymä (Aloitusnakyma: 30° N 17° E, koko pallo, v3–v7-lokit: 7 597 km).</summary>
        static readonly AloituslennonRata.Asento Napautus = new AloituslennonRata.Asento(30.0, 17.0, 7_597_000, 0, 0, 0);

        static AloituslennonRata Rata(double lat, double lon, string id = null)
        {
            // Saapumisnäkymä kuten web (kaupunkinäkymä: katsepiste hieman koilliseen, 0,28 R, pohjoinen ylös).
            var loppu = new AloituslennonRata.Asento(lat + 0.6, lon + 0.8, 1_795_000, 0, 0, 0);
            return new AloituslennonRata(LontooLat, LontooLon, lat, lon, Napautus, loppu, 1206.0 / 2622.0, 50.0, 150.0,
                AloituslennonRata.OhitusKohteelle(id));
        }

        static AloituslennonRata Rata((string Id, double Lat, double Lon) k) => Rata(k.Lat, k.Lon, k.Id);

        [Testi]
        static void AlkuJaLoppuTasmalleen()
        {
            var r = Rata(37.98, 23.73);
            var a = r.Kamera(0);
            Oleta.Tosi(Math.Abs(a.Lat - Napautus.Lat) < 1e-9 && Math.Abs(a.EtaisyysM - Napautus.EtaisyysM) < 1e-3 && a.Kallistus == 0,
                $"t = 0 napautusnäkymä: {a.Lat:F4} {a.EtaisyysM:F0} {a.Kallistus:F2}");
            var b = r.Kamera(1.0 / 120);
            Oleta.Tosi(Math.Abs(b.EtaisyysM / Napautus.EtaisyysM - 1) < 0.001 && Math.Abs(b.Kallistus) < 0.05, "lähtö levosta");
            var l = r.Kamera(AloituslennonRata.KestoS);
            Oleta.Tosi(Math.Abs(l.Lat - r.Loppu.Lat) < 1e-9 && Math.Abs(l.EtaisyysM - r.Loppu.EtaisyysM) < 1 && Math.Abs(l.Kallistus) < 1e-9,
                $"t = 15 saapumisnäkymä: {l.Lat:F3} {l.EtaisyysM:F0} {l.Kallistus:F2}");
        }

        [Testi]
        static void KoneNakyyAinaEikaKoskaanTakaa()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double pieninKoko = 9;
                for (double t = 0.05; t <= AloituslennonRata.KestoS; t += 1.0 / 60)
                {
                    var m = r.Mitta(t);
                    Oleta.Tosi(m.Nakyy && Math.Abs(m.X) <= 0.92 && Math.Abs(m.Y) <= 0.92,
                        $"{k.Id} kone kuvassa t={t:F2}: x {m.X:F2} y {m.Y:F2} näkyy {m.Nakyy}");
                    pieninKoko = Math.Min(pieninKoko, m.Koko);
                    Oleta.Tosi(m.Korotus >= 60 || m.Alfa <= 100, $"{k.Id} ei takaa t={t:F2}: α {m.Alfa:F0}° korotus {m.Korotus:F0}°");
                    Oleta.Tosi(m.KameraKorkeusM > 1500, $"{k.Id} kamera maan yllä t={t:F2}: {m.KameraKorkeusM:F0} m");
                }
                Oleta.Tosi(pieninKoko >= 0.95 * AloituslennonRata.KokoLaskussa, $"{k.Id} kone vähintään 1,4 % leveydestä: {pieninKoko:P1}");
            }
        }

        [Testi]
        static void OhitusVasemmaltaOikealleLahelta()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                var a = r.Mitta(AloituslennonRata.KiriS); var b = r.Mitta(AloituslennonRata.OhitusLoppuS);
                Oleta.Tosi(a.X < -0.25 && b.X > 0.2, $"{k.Id} kone vasemmalta oikealle: {a.X:F2} → {b.X:F2}");
                double suurin = 0, ed = double.NegativeInfinity;
                for (double t = AloituslennonRata.KiriS; t <= AloituslennonRata.OhitusLoppuS; t += 1.0 / 60)
                {
                    var m = r.Mitta(t);
                    suurin = Math.Max(suurin, m.Koko);
                    Oleta.Tosi(m.X >= ed - 0.01, $"{k.Id} ohitus etenee oikealle t={t:F2}");
                    Oleta.Tosi(m.Alfa >= 55 && m.Alfa <= 100, $"{k.Id} ohitus kyljestä t={t:F2}: α {m.Alfa:F0}°");
                    ed = m.X;
                }
                Oleta.Tosi(suurin >= 0.3, $"{k.Id} ohitus läheltä: kone {suurin:P0} leveydestä");
                Oleta.Tosi(Math.Abs(r.KoneenOsuus(AloituslennonRata.OhitusS) - r.Ohitus) < 0.02,
                    $"{k.Id} ohitus ohituskohdassa {r.Ohitus:F3}: {r.KoneenOsuus(AloituslennonRata.OhitusS):F3}");
            }
        }

        [Testi]
        static void OhitusMaanPaalla()
        {
            // v3b: ohituskohdat (maapolygoneista laskettu taulu) välillä 0,3–0,7; tuntematon kohde puolivälissä.
            foreach (var kv in AloituslennonRata.OhitusMaalla)
                Oleta.Tosi(kv.Value >= 0.3 && kv.Value <= 0.7, $"{kv.Key} ohitus {kv.Value}");
            Oleta.Tosi(AloituslennonRata.OhitusKohteelle("ateena") == 0.47 && AloituslennonRata.OhitusKohteelle("rooma") == 0.5
                       && AloituslennonRata.OhitusKohteelle(null) == 0.5, "ateena 0,47, muut 0,5");
            // Ääripää (New York 0,685): kone silti ohituskohdassa ohitushetkellä ja perillä ajallaan.
            var r = new AloituslennonRata(LontooLat, LontooLon, 37.98, 23.73, Napautus,
                new AloituslennonRata.Asento(38.58, 24.53, 1_795_000, 0, 0, 0), 1206.0 / 2622.0, 50.0, 150.0, 0.685);
            Oleta.Tosi(Math.Abs(r.KoneenOsuus(AloituslennonRata.OhitusS) - 0.685) < 0.02 && r.KoneenOsuus(AloituslennonRata.PysahdysS) == 1.0,
                $"ohitus 0,685: {r.KoneenOsuus(AloituslennonRata.OhitusS):F3}");
        }

        [Testi]
        static void KarkeatVaiheetKiriJaYlilento()
        {
            Oleta.Tosi(!AloituslennonRata.Karkea(2.0) && AloituslennonRata.Karkea(5.0) && !AloituslennonRata.Karkea(AloituslennonRata.OhitusS)
                       && AloituslennonRata.Karkea(9.5) && !AloituslennonRata.Karkea(AloituslennonRata.SaapuminenS)
                       && !AloituslennonRata.Karkea(AloituslennonRata.KosketusS), "karkea vain kiressä ja ylilennossa");
        }

        [Testi]
        static void KaukaaPieniJaLaskuKaukaa()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                for (double t = 0.05; t <= AloituslennonRata.KestoS; t += 1.0 / 60)
                {
                    var m = r.Mitta(t);
                    if (m.EtaisyysM > 600_000)
                        Oleta.Tosi(m.Koko <= 0.03, $"{k.Id} kaukaa pieni t={t:F2}: {m.Koko:P1} {m.EtaisyysM / 1000:F0} km");
                }
                // Kosketus ja pysähdys kaukaa ja ylhäältä: kone ihan pieni (omistaja: töksö laskeutuminen ei näy; v3d: "selvästi
                // kauempana ja kone pienemmäksi", "loppu laskeutuminen ylhäältä, nyt näyttää kun joku pommi iskisi").
                for (double t = AloituslennonRata.KosketusS - 0.3; t <= AloituslennonRata.PysahdysS; t += 0.05)
                {
                    var m = r.Mitta(t);
                    Oleta.Tosi(m.Koko <= 0.02 && m.EtaisyysM >= 700_000,
                        $"{k.Id} lasku kaukaa t={t:F2}: {m.Koko:P1} {m.EtaisyysM / 1000:F0} km");
                    Oleta.Tosi(m.Korotus >= 65, $"{k.Id} lasku ylhäältä t={t:F2}: korotus {m.Korotus:F0}°");
                }
            }
        }

        [Testi]
        static void UsvaEiHukutaMaata()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                for (double t = AloituslennonRata.KiriS; t <= AloituslennonRata.KosketusS; t += 0.1)
                    Oleta.Tosi(r.MaaNakyvissa(t) >= 0.6, $"{k.Id} maa näkyy usvan läpi t={t:F1}: {r.MaaNakyvissa(t):P0}");
            }
        }

        [Testi]
        static void SaapuminenEtuviistostaJaKohdeKuvassa()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                for (double t = AloituslennonRata.SaapuminenS; t <= AloituslennonRata.KosketusS - 0.3; t += 0.1)
                {
                    var m = r.Mitta(t);
                    Oleta.Tosi(m.Alfa <= 75 || m.Korotus >= 60, $"{k.Id} saapuminen edestä tai ylhäältä t={t:F1}: α {m.Alfa:F0}° korotus {m.Korotus:F0}°");
                    Oleta.Tosi(r.Ruudussa(t, k.Lat, k.Lon, 0, out _, out _), $"{k.Id} kohde kuvassa t={t:F1}");
                }
            }
        }

        [Testi]
        static void LahtopisteKuvassaAlussa()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                for (double t = 0.3; t <= AloituslennonRata.AvausS + 0.3; t += 0.1)
                    Oleta.Tosi(r.Ruudussa(t, LontooLat, LontooLon, 0, out _, out _), $"{k.Id} Lontoo kuvassa t={t:F1}");
            }
        }

        [Testi]
        static void KameraLiikkuuAinaIlmanNykayksia()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double dt = 1.0 / 60;
                var ed = r.Kamera(0.4);
                double edLiike = double.NaN;
                for (double t = 0.4 + dt; t <= AloituslennonRata.KestoS - 0.05; t += dt)
                {
                    var a = r.Kamera(t);
                    double lnd = Math.Log(a.EtaisyysM / ed.EtaisyysM) / dt;
                    double kal = (a.Kallistus - ed.Kallistus) / dt, suu = LennonV3.Kulmaero(ed.Suuntima, a.Suuntima) / dt;
                    double siirto = LennonAikajana.ReittiM(ed.Lat, ed.Lon, a.Lat, a.Lon) / Math.Max(a.EtaisyysM, 1) / dt;
                    double liike = Math.Abs(lnd) + Math.Abs(kal) / 30 + Math.Abs(suu) / 30 + siirto;
                    Oleta.Tosi(liike > 0.01, $"{k.Id} kamera liikkuu t={t:F2}: {liike:F4}");
                    Oleta.Tosi(Math.Abs(lnd) < 4.5, $"{k.Id} zoom t={t:F2}: {lnd:F2} e/s");
                    Oleta.Tosi(Math.Abs(kal) < 60 && Math.Abs(suu) < 90, $"{k.Id} kääntö t={t:F2}: kall {kal:F0} °/s suunta {suu:F0} °/s");
                    if (!double.IsNaN(edLiike)) Oleta.Tosi(Math.Abs(liike - edLiike) < 0.6, $"{k.Id} nykäys t={t:F2}: {edLiike:F2} → {liike:F2}");
                    edLiike = liike; ed = a;
                }
            }
        }

        [Testi]
        static void KonePerillaJaNousu()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double ed = 0;
                for (double t = 0; t <= 15; t += 0.01) { double p = r.KoneenOsuus(t); Oleta.Tosi(p >= ed - 1e-12, $"{k.Id} monotoninen"); ed = p; }
                Oleta.Tosi(r.KoneenOsuus(AloituslennonRata.KosketusS) > 0.998, $"{k.Id} kosketus perillä {r.KoneenOsuus(AloituslennonRata.KosketusS):F4}");
                Oleta.Tosi(r.KoneenOsuus(AloituslennonRata.PysahdysS) == 1.0, $"{k.Id} pysähdys");
                Oleta.Tosi(r.Nopeus1 > 0 && r.Nopeus2 > 0, $"{k.Id} matkanopeudet {r.Nopeus1:F0} / {r.Nopeus2:F0} m/s");
                Oleta.Tosi(AloituslennonRata.PerusKorkeus(0.3) < 100 && AloituslennonRata.PerusKorkeus(5) > 3000
                           && AloituslennonRata.PerusKorkeus(AloituslennonRata.KosketusS) == 0, "nousu ja kosketus");
            }
            if (Environment.GetEnvironmentVariable("ALOITUSRATA_TAULU") != "1") return;
            Console.WriteLine("kohde | reitti km | kone pienin % | α suurin ° (korotus < 60°) | ohitus suurin % | saapuminen α ° | kamera matalin km "
                              + "| kosketus % / km | maa usvan läpi ohitus / saapuminen % (v2-raja)");
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double pienin = 9, alfa = 0, ohitus = 0, sa0 = 999, sa1 = 0, matalin = 1e9, maaO = 1, maaS = 1, maaO2 = 1, maaS2 = 1;
                for (double t = 0.05; t <= AloituslennonRata.KestoS; t += 1.0 / 60)
                {
                    var m = r.Mitta(t);
                    pienin = Math.Min(pienin, m.Koko);
                    if (m.Korotus < 60) alfa = Math.Max(alfa, m.Alfa);
                    if (t >= AloituslennonRata.KiriS && t <= AloituslennonRata.OhitusLoppuS) ohitus = Math.Max(ohitus, m.Koko);
                    if (t >= AloituslennonRata.SaapuminenS && t <= AloituslennonRata.KosketusS) { sa0 = Math.Min(sa0, m.Alfa); sa1 = Math.Max(sa1, m.Alfa); }
                    matalin = Math.Min(matalin, m.KameraKorkeusM);
                    if (t >= AloituslennonRata.KiriS && t <= AloituslennonRata.OhitusLoppuS)
                    { maaO = Math.Min(maaO, r.MaaNakyvissa(t)); maaO2 = Math.Min(maaO2, r.MaaNakyvissa(t, 0)); }
                    if (t >= AloituslennonRata.SaapuminenS && t <= AloituslennonRata.KosketusS)
                    { maaS = Math.Min(maaS, r.MaaNakyvissa(t)); maaS2 = Math.Min(maaS2, r.MaaNakyvissa(t, 0)); }
                }
                var mk = r.Mitta(AloituslennonRata.KosketusS);
                Console.WriteLine($"{k.Id,-8} | {r.ReittiM / 1000,5:F0} | {pienin * 100,5:F1} | {alfa,4:F0} | {ohitus * 100,5:F0} | {sa0:F0}–{sa1:F0} | {matalin / 1000:F1} "
                                  + $"| {mk.Koko * 100:F1} / {mk.EtaisyysM / 1000:F0} | {maaO * 100:F0} / {maaS * 100:F0} ({maaO2 * 100:F0} / {maaS2 * 100:F0})");
            }
            string kohde = Environment.GetEnvironmentVariable("ALOITUSRATA_KOHDE") ?? "ateena";
            foreach (var k in Kohteet)
            {
                if (k.Id != kohde && kohde != "kaikki") continue;
                var r = Rata(k);
                Console.WriteLine($"{k.Id}: reitti {r.ReittiM / 1000:F0} km, matkanopeus {r.Nopeus1:F2} / {r.Nopeus2:F2} kameran etäisyyttä/s");
                Console.WriteLine("   t s | katse km | kall ° | suunta ° | kone x, y | koko % | α ° | korotus ° | kone km | kamera km | kone reitillä km | maa %");
                for (double t = 0; t <= 15.001; t += 0.5)
                {
                    var c = r.Kamera(t); var m = r.Mitta(t);
                    bool lnakyy = r.Ruudussa(t, LontooLat, LontooLon, 0, out double lx, out double ly);
                    Console.WriteLine($"  {t,4:F1} | {c.EtaisyysM / 1000,8:F1} | {c.Kallistus,5:F1} | {c.Suuntima,6:F0} | {m.X,5:F2}, {m.Y,5:F2} "
                                      + $"| {m.Koko * 100,5:F1} | {m.Alfa,4:F0} | {m.Korotus,5:F0} | {m.EtaisyysM / 1000,7:F1} | {m.KameraKorkeusM / 1000,7:F1} "
                                      + $"| {r.KoneenOsuus(t) * r.ReittiM / 1000,6:F0} | {r.MaaNakyvissa(t) * 100,3:F0} | Lontoo {lx,5:F2}, {ly,5:F2}{(lnakyy ? "" : " (ei)")}{(m.Nakyy ? "" : "  EI NÄY")}");
                }
            }
        }
    }
}
