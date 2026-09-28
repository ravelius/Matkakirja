// ALOITUSLENNON RATA v3e (omistajan palaute v3d-videoon 28.9.2026 klo 09.2x; v3 v2:sta 27.9. klo 23.5x): jokainen näyte mitataan.
// v3e: lähestyminen on yksi S-käyrä (yksi zoomin nopeushuippu, ei pysähdystä välillä), lähin kohta lähempänä kuin v3d (23,5 km),
// erkanemisessa ensin pakitus lähes samalla korkeudella, sitten silmän korkeus S-käyränä pysähtymättä, loppu suoraan kohteen yllä
// ylhäältä alas. Ennallaan: kaukaa kone on pieni, kosketus nähdään kaukaa ja ylhäältä, usva ei hukuta maata, kone aina ruudulla,
// ei koskaan takaa, ohitus vasemmalta oikealle, lähtöpiste kuvassa alussa, kamera liikkuu koko ajan ilman nykäyksiä, alku =
// napautusnäkymä ja loppu = saapumisnäkymä.
// ALOITUSRATA_TAULU=1 tulostaa aikajanan 0,5 s välein (kohde ALOITUSRATA_KOHDE, oletus ateena; kaikki = kaikki kohteet;
// ALOITUSRATA_ASKEL = rivien väli s).
using System;
using System.Collections.Generic;
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
                AloituslennonRata.OhitusKohteelle(id, LennonAikajana.ReittiM(LontooLat, LontooLon, lat, lon)));
        }

        static AloituslennonRata Rata((string Id, double Lat, double Lon) k) => Rata(k.Lat, k.Lon, k.Id);

        /// <summary>ln-suureen muutosnopeus (1/s) keskeisdifferenssinä.</summary>
        static double LnNopeus(Func<double, double> f, double t, double dt = 1.0 / 60) =>
            (Math.Log(f(Math.Min(AloituslennonRata.KestoS, t + dt))) - Math.Log(f(Math.Max(0, t - dt))))
            / (Math.Min(AloituslennonRata.KestoS, t + dt) - Math.Max(0, t - dt));

        /// <summary>Maan vierintä: katsepisteen maanopeus kameran etäisyyksinä sekunnissa (1 = näkymän syvyys sekunnissa).</summary>
        static double Vierinta(AloituslennonRata r, double t, double dt = 1.0 / 60)
        {
            var a = r.Kamera(Math.Max(0, t - dt)); var b = r.Kamera(Math.Min(AloituslennonRata.KestoS, t + dt));
            return LennonAikajana.ReittiM(a.Lat, a.Lon, b.Lat, b.Lon) / Math.Max(1.0, 0.5 * (a.EtaisyysM + b.EtaisyysM)) / (2 * dt);
        }

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
            // Viimeinen ratkaistu näyte on jo saapumisnäkymässä (kanavat päättyvät siihen, ei pakotettua loikkaa).
            var e = r.Kamera(AloituslennonRata.KestoS - 1.0 / 240);
            double ero = LennonAikajana.ReittiM(e.Lat, e.Lon, r.Loppu.Lat, r.Loppu.Lon);
            Oleta.Tosi(ero < 2000 && Math.Abs(e.EtaisyysM / r.Loppu.EtaisyysM - 1) < 0.001,
                $"loppu ilman loikkaa: {ero:F0} m, {e.EtaisyysM / r.Loppu.EtaisyysM:F4}");
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
                // v3e (omistaja: "asteen lähemmäs"): v3d:n suurin 49 % (23,5 km).
                Oleta.Tosi(suurin >= 0.55, $"{k.Id} ohitus läheltä: kone {suurin:P0} leveydestä");
                Oleta.Tosi(Math.Abs(r.KoneenOsuus(AloituslennonRata.OhitusS) - r.Ohitus) < 0.02,
                    $"{k.Id} ohitus ohituskohdassa {r.Ohitus:F3}: {r.KoneenOsuus(AloituslennonRata.OhitusS):F3}");
            }
        }

        [Testi]
        static void LahinKohtaLahempanaKuinV3d()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double lahin = 1e12, hetki = 0;
                for (double t = 5.0; t <= 10.0; t += 1.0 / 120)
                {
                    var m = r.Mitta(t);
                    if (m.EtaisyysM < lahin) { lahin = m.EtaisyysM; hetki = t; }
                }
                Oleta.Tosi(lahin <= 20_500 && lahin >= 15_000, $"{k.Id} lähin {lahin / 1000:F1} km (v3d 23,5 km)");
                Oleta.Tosi(Math.Abs(hetki - AloituslennonRata.OhitusS) < 0.4, $"{k.Id} lähin hetkellä {hetki:F2} s");
            }
        }

        [Testi]
        static void LahestyminenYksiKiihdytys()
        {
            // Zoomin nopeus (ln-etäisyys katsepisteeseen) napautusnäkymästä lähimpään kohtaan: yksi huippu (kasvaa, sitten laskee),
            // ei pysähdystä välillä (v3d: avaus hidastui 4 s:iin ja kiri syöksyi 4 500 → 30 km 2 s:ssa).
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                const double dt = 1.0 / 30;
                var v = new List<(double T, double V)>();
                for (double t = dt; t <= AloituslennonRata.OhitusS - dt; t += dt) v.Add((t, -LnNopeus(x => r.Kamera(x).EtaisyysM, t)));
                int h = 0;
                for (int i = 1; i < v.Count; i++) if (v[i].V > v[h].V) h = i;
                for (int i = 1; i <= h; i++) Oleta.Tosi(v[i].V >= v[i - 1].V - 1e-6, $"{k.Id} zoom kiihtyy t={v[i].T:F2}: {v[i - 1].V:F3} → {v[i].V:F3}");
                for (int i = h + 1; i < v.Count; i++) Oleta.Tosi(v[i].V <= v[i - 1].V + 1e-6, $"{k.Id} zoom hidastuu t={v[i].T:F2}: {v[i - 1].V:F3} → {v[i].V:F3}");
                foreach (var (t, n) in v)
                    if (t >= 1.0 && t <= AloituslennonRata.OhitusS - 0.6) Oleta.Tosi(n > 0.1, $"{k.Id} zoom ei pysähdy t={t:F2}: {n:F3}");
                Oleta.Tosi(v[h].V < 1.8 && v[h].T > 3.5 && v[h].T < 6.0, $"{k.Id} zoomin huippu {v[h].V:F2} e/s hetkellä {v[h].T:F2} s");
            }
        }

        [Testi]
        static void ErkaneminenPakitusJaKorkeudenSKayra()
        {
            // Omistaja 28.9.: ensin pakitus ("korkeus kyllä muuttuu, mutta todella todella vähän"), sitten korkeudenmuutos kiihtyy ja
            // hidastuu loppua kohti, "mutta ei lopu myöskään missään kohdassa".
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double t0 = AloituslennonRata.OhitusS, tp = t0 + 2.2;
                double h0 = r.SilmanKorkeus(t0), hp = r.SilmanKorkeus(tp);
                double e0 = r.Mitta(t0).EtaisyysM, ep = r.Mitta(tp).EtaisyysM;
                Oleta.Tosi(hp / h0 < 1.35, $"{k.Id} pakitus lähes samalla korkeudella: {h0 / 1000:F1} → {hp / 1000:F1} km");
                Oleta.Tosi(ep / e0 > 1.8, $"{k.Id} pakitus loitontaa koneesta: {e0 / 1000:F1} → {ep / 1000:F1} km");
                const double dt = 1.0 / 30;
                double huippu = 0, huippuT = 0;
                for (double t = t0 + 0.05; t <= AloituslennonRata.KestoS - 0.05; t += dt)
                {
                    double n = LnNopeus(r.SilmanKorkeus, t);
                    Oleta.Tosi(n > 0, $"{k.Id} korkeus nousee koko ajan t={t:F2}: {n:F4}");
                    if (n > huippu) { huippu = n; huippuT = t; }
                }
                Oleta.Tosi(huippuT > tp && huippuT < AloituslennonRata.KestoS - 1.5 && huippu < 2.0,
                    $"{k.Id} nousun huippu {huippu:F2} e/s hetkellä {huippuT:F2} s");
                // Hidastuu loppua kohti, mutta 0,5 s ennen loppua vielä liikkeessä.
                double loppu = LnNopeus(r.SilmanKorkeus, AloituslennonRata.KestoS - 0.5);
                Oleta.Tosi(loppu > 0.005 && loppu < 0.3 * huippu, $"{k.Id} lopussa hidastuu mutta liikkuu: {loppu:F3} e/s");
            }
        }

        [Testi]
        static void OhitusLoppumatkallaMaanPaalla()
        {
            // v3e: ohitus OhitusJaljellaM ennen kohdetta (taulu: maan päällä), osuus 0,3–0,95; muut säännöllä 0,5–0,92.
            foreach (var kv in AloituslennonRata.OhitusMaalla)
                Oleta.Tosi(kv.Value >= 0.3 && kv.Value <= 0.97, $"{kv.Key} ohitus {kv.Value}");
            Oleta.Tosi(AloituslennonRata.OhitusKohteelle("ateena") == 0.92 && AloituslennonRata.OhitusKohteelle(null) == 0.5
                       && Math.Abs(AloituslennonRata.OhitusKohteelle("rooma", 1_434_000) - (1 - 190.0 / 1434)) < 1e-9
                       && AloituslennonRata.OhitusKohteelle("pariisi", 343_000) == 0.5
                       && AloituslennonRata.OhitusKohteelle("sydney", 16_994_000) == 0.93, "ateena 0,92, muut säännöllä");
            // Ääripää (0,95): kone silti ohituskohdassa ohitushetkellä ja perillä ajallaan.
            var r = new AloituslennonRata(LontooLat, LontooLon, 37.98, 23.73, Napautus,
                new AloituslennonRata.Asento(38.58, 24.53, 1_795_000, 0, 0, 0), 1206.0 / 2622.0, 50.0, 150.0, 0.95);
            Oleta.Tosi(Math.Abs(r.KoneenOsuus(AloituslennonRata.OhitusS) - 0.95) < 0.02 && r.KoneenOsuus(AloituslennonRata.PysahdysS) == 1.0,
                $"ohitus 0,95: {r.KoneenOsuus(AloituslennonRata.OhitusS):F3}");
        }

        [Testi]
        static void KarkeatVaiheetNopeimmissaOsissa()
        {
            // v3e2: nousu täydellä tarkkuudella (v3e-laiteajo: karkean nousun laattaraja 10,8–12,3 s).
            Oleta.Tosi(!AloituslennonRata.Karkea(1.0) && AloituslennonRata.Karkea(4.0) && !AloituslennonRata.Karkea(AloituslennonRata.OhitusS)
                       && !AloituslennonRata.Karkea(AloituslennonRata.OhitusS + 1.0) && !AloituslennonRata.Karkea(11.0)
                       && !AloituslennonRata.Karkea(AloituslennonRata.SaapuminenS + 0.6) && !AloituslennonRata.Karkea(AloituslennonRata.KosketusS),
                "karkea vain lähestymisen nopeimmassa osassa");
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
        static void SaapuminenYlhaaltaSuoraanKohteenYlle()
        {
            // Omistaja 28.9.: "takaisin suoraan Ateenan yläpuolelle ja kamera suoraan ylhäältä alas".
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                for (double t = AloituslennonRata.SaapuminenS; t <= AloituslennonRata.KestoS; t += 0.1)
                    Oleta.Tosi(r.Ruudussa(t, k.Lat, k.Lon, 0, out _, out _), $"{k.Id} kohde kuvassa t={t:F1}");
                for (double t = AloituslennonRata.KosketusS; t <= AloituslennonRata.KestoS; t += 0.1)
                {
                    var a = r.Kamera(t);
                    Oleta.Tosi(a.Kallistus <= 12, $"{k.Id} suoraan ylhäältä t={t:F1}: kallistus {a.Kallistus:F1}°");
                    var s = r.SilmanMaapiste(t);
                    double sivu = LennonAikajana.ReittiM(s.Lat, s.Lon, k.Lat, k.Lon);
                    Oleta.Tosi(sivu < 0.25 * r.SilmanKorkeus(t), $"{k.Id} silmä kohteen yllä t={t:F1}: sivussa {sivu / 1000:F0} km");
                }
            }
        }

        [Testi]
        static void SilmaKaartaaKohteenYlleIlmanKoukkua()
        {
            // v3e2 (omistaja 28.9.: "Lentoreitti voisi olla takaisin suoraan Ateenan yläpuolelle ja kamera suoraan ylhäältä alas,
            // mutta tee kiihdytys ja lentoreitti hieman S-kurvin mukaisesti"): silmän maapiste ei erkanemisessa loittone kohteesta
            // eikä kierrä sen taakse (v3e: ~270 km kohteen eteläpuolella 13 s:ssa ja takaisin), ja kosketus nähdään suoraan ylhäältä.
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                var s0 = r.SilmanMaapiste(AloituslennonRata.OhitusS);
                double alku = LennonAikajana.ReittiM(s0.Lat, s0.Lon, k.Lat, k.Lon), suurin = 0;
                for (double t = AloituslennonRata.OhitusS; t <= AloituslennonRata.KestoS; t += 1.0 / 60)
                {
                    var s = r.SilmanMaapiste(t);
                    double et = LennonAikajana.ReittiM(s.Lat, s.Lon, k.Lat, k.Lon);
                    Oleta.Tosi(et <= alku + 15_000, $"{k.Id} silmä ei loittone kohteesta t={t:F2}: {et / 1000:F0} km (ohituksessa {alku / 1000:F0} km)");
                    if (t >= AloituslennonRata.SaapuminenS) suurin = Math.Max(suurin, et);
                }
                Oleta.Tosi(suurin <= 120_000, $"{k.Id} silmä saapuessa enintään 120 km kohteesta: {suurin / 1000:F0} km");
                var a = r.Kamera(AloituslennonRata.KosketusS);
                Oleta.Tosi(a.Kallistus <= 4.0, $"{k.Id} kosketus suoraan ylhäältä: kallistus {a.Kallistus:F1}°");
            }
        }

        [Testi]
        static void LahtopisteKuvassaAlussa()
        {
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                for (double t = 0.3; t <= AloituslennonRata.AvausS; t += 0.1)
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
                for (double t = 0.4 + dt; t <= AloituslennonRata.KestoS - 0.15; t += dt)
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
                Oleta.Tosi(r.Nopeus1 > 0 && r.Nopeus2 > 0, $"{k.Id} matkanopeudet {r.Nopeus1:F2} / {r.Nopeus2:F2} etäisyyttä/s");
                Oleta.Tosi(AloituslennonRata.PerusKorkeus(0.3) < 100 && AloituslennonRata.PerusKorkeus(5) > 3000
                           && AloituslennonRata.PerusKorkeus(AloituslennonRata.KosketusS) == 0, "nousu ja kosketus");
            }
            if (Environment.GetEnvironmentVariable("ALOITUSRATA_TAULU") != "1") return;
            Console.WriteLine("kohde | reitti km | ohitus osuus | kone pienin % | α suurin ° (korotus < 60°) | ohitus suurin % | lähin km | zoom huippu e/s "
                              + "| nousu huippu e/s | vierintä huippu lähestyminen / erkaneminen | kamera matalin km | kosketus % / km | maa usvan läpi ohitus / nousu %");
            foreach (var k in Kohteet)
            {
                var r = Rata(k);
                double pienin = 9, alfa = 0, ohitus = 0, lahin = 1e12, zoom = 0, nousu = 0, matalin = 1e9, maaO = 1, maaS = 1, v1 = 0, v2 = 0;
                for (double t = 0.05; t <= AloituslennonRata.KestoS - 0.05; t += 1.0 / 60)
                {
                    var m = r.Mitta(t);
                    pienin = Math.Min(pienin, m.Koko);
                    if (m.Korotus < 60) alfa = Math.Max(alfa, m.Alfa);
                    if (t >= AloituslennonRata.KiriS && t <= AloituslennonRata.OhitusLoppuS) ohitus = Math.Max(ohitus, m.Koko);
                    lahin = Math.Min(lahin, m.EtaisyysM);
                    if (t < AloituslennonRata.OhitusS - 0.05) zoom = Math.Max(zoom, -LnNopeus(x => r.Kamera(x).EtaisyysM, t));
                    if (t > AloituslennonRata.OhitusS + 0.05) nousu = Math.Max(nousu, LnNopeus(r.SilmanKorkeus, t));
                    matalin = Math.Min(matalin, m.KameraKorkeusM);
                    double vi = Vierinta(r, t);
                    if (t < AloituslennonRata.OhitusS) v1 = Math.Max(v1, vi); else v2 = Math.Max(v2, vi);
                    if (t >= AloituslennonRata.KiriS && t <= AloituslennonRata.OhitusLoppuS) maaO = Math.Min(maaO, r.MaaNakyvissa(t));
                    if (t > AloituslennonRata.OhitusLoppuS && t <= AloituslennonRata.KosketusS) maaS = Math.Min(maaS, r.MaaNakyvissa(t));
                }
                var mk = r.Mitta(AloituslennonRata.KosketusS);
                Console.WriteLine($"{k.Id,-8} | {r.ReittiM / 1000,5:F0} | {r.Ohitus:F3} | {pienin * 100,5:F1} | {alfa,4:F0} | {ohitus * 100,5:F0} | {lahin / 1000,5:F1} "
                                  + $"| {zoom,4:F2} | {nousu,4:F2} | {v1:F2} / {v2:F2} | {matalin / 1000:F1} | {mk.Koko * 100:F1} / {mk.EtaisyysM / 1000:F0} | {maaO * 100:F0} / {maaS * 100:F0}");
            }
            string kohde = Environment.GetEnvironmentVariable("ALOITUSRATA_KOHDE") ?? "ateena";
            double askel = double.TryParse(Environment.GetEnvironmentVariable("ALOITUSRATA_ASKEL"), System.Globalization.NumberStyles.Float,
                System.Globalization.CultureInfo.InvariantCulture, out var aa) ? aa : 0.5;
            foreach (var k in Kohteet)
            {
                if (k.Id != kohde && kohde != "kaikki") continue;
                var r = Rata(k);
                Console.WriteLine($"{k.Id}: reitti {r.ReittiM / 1000:F0} km, matkanopeus {r.Nopeus1:F2} / {r.Nopeus2:F2} kameran etäisyyttä/s, "
                                  + $"silmä ohituksessa {r.KorkeusOhitus / 1000:F1} km, lopussa {r.KorkeusLoppu / 1000:F0} km");
                Console.WriteLine("   t s | katse km | silmä km | zoom e/s | nousu e/s | vierintä e/s | loittonee e/s | kall ° | suunta ° | kone x, y | koko % | α ° "
                                  + "| korotus ° | kone km | kone reitillä km | silmän maapiste | maa % | kohde x, y");
                for (double t = 0; t <= 15.001; t += askel)
                {
                    var c = r.Kamera(t); var m = r.Mitta(t);
                    var s = r.SilmanMaapiste(t);
                    bool lnakyy = r.Ruudussa(t, LontooLat, LontooLon, 0, out double lx, out double ly);
                    Console.WriteLine($"  {t,5:F2} | {c.EtaisyysM / 1000,8:F1} | {r.SilmanKorkeus(t) / 1000,8:F1} | {LnNopeus(x => r.Kamera(x).EtaisyysM, t),6:F2} "
                                      + $"| {LnNopeus(r.SilmanKorkeus, t),6:F2} | {Vierinta(r, t),6:F2} | {LnNopeus(x => r.Mitta(x).EtaisyysM, t, 1.0 / 30),6:F2} | {c.Kallistus,5:F1} | {c.Suuntima,6:F0} | {m.X,5:F2}, {m.Y,5:F2} | {m.Koko * 100,5:F1} "
                                      + $"| {m.Alfa,4:F0} | {m.Korotus,5:F0} | {m.EtaisyysM / 1000,7:F1} | {r.KoneenOsuus(t) * r.ReittiM / 1000,6:F0} "
                                      + $"| {s.Lat,6:F2} {s.Lon,6:F2} | {r.MaaNakyvissa(t) * 100,3:F0} | Lontoo {lx,5:F2}, {ly,5:F2}{(lnakyy ? "" : " (ei)")}"
                                      + $" | kohde {(r.Ruudussa(t, k.Lat, k.Lon, 0, out double kx, out double ky) ? "" : "(ei) ")}{kx,5:F2}, {ky,5:F2}{(m.Nakyy ? "" : "  EI NÄY")}");
                }
            }
        }
    }
}
