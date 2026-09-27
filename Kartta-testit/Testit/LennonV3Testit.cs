// LENTO V3 (omistaja 26.9.2026 klo 23.5x, speksi docs/raportit/lento-v3-speksi.md): puhtaan laskennan testit.
// Avainarvot, kanavien jatkuvuus (numeerinen derivaatta, ei hyppyjä), nopeusprofiilin integraali ja Ateenan huippunopeus,
// kaukoskaala lyhyillä reiteillä, kamera aina matalalla (≤ 20 km), koneen korkeus ja kosketus, Ateenan reitti Afrikasta
// pohjoiseen, kallistusraja ja EI MONOTONIAA -vaihtelun toistettavuus.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LennonV3Testit
    {
        const double AteenaLat = 37.98, AteenaLon = 23.73, LontooLat = 51.507, LontooLon = -0.128;
        const double AteenaReittiM = 588_000.0;

        [Testi]
        static void AvaimetOsuvat()
        {
            foreach (var a in LennonV3.Avaimet)
            {
                var k = LennonV3.Kamera(a.T, AteenaReittiM);
                double odotettuKm = a.EtaisyysKm * Math.Pow(LennonV3.Kaukoskaala(AteenaReittiM), a.Skaala);
                Oleta.Tosi(Math.Abs(k.EtaisyysM / 1000 - odotettuKm) < 0.01, $"etäisyys {a.T} s: {k.EtaisyysM / 1000:F2} vs {odotettuKm:F2}");
                Oleta.Tosi(Math.Abs(k.Theta - a.Theta) < 1e-6, $"θ {a.T} s");
                Oleta.Tosi(Math.Abs(k.Korkeuskulma - a.Korkeuskulma) < 1e-6, $"korkeuskulma {a.T} s");
            }
        }

        [Testi]
        static void KanavatJatkuvia()
        {
            // Ensimmäinen ja toinen derivaatta: ei hyppyjä avainten saumoissa (vierekkäisten näytteiden erotus pieni).
            double dt = 0.002;
            double Ln(double t) => Math.Log(LennonV3.Kamera(t, AteenaReittiM).EtaisyysM);
            double Th(double t) => LennonV3.Kamera(t, AteenaReittiM).Theta;
            double edV = double.NaN, edT = double.NaN;
            for (double t = dt; t < LennonV3.KestoS - dt; t += dt)
            {
                double v = (Ln(t + dt) - Ln(t - dt)) / (2 * dt), vt = (Th(t + dt) - Th(t - dt)) / (2 * dt);
                if (!double.IsNaN(edV))
                {
                    Oleta.Tosi(Math.Abs(v - edV) < 0.02, $"ln-etäisyyden nopeus hyppää {t:F3} s: {edV:F4} → {v:F4}");
                    Oleta.Tosi(Math.Abs(vt - edT) < 0.5, $"θ:n nopeus hyppää {t:F3} s: {edT:F3} → {vt:F3}");
                }
                edV = v; edT = vt;
            }
        }

        [Testi]
        static void AlkuLiukuuHetiJaLoppuLepaa()
        {
            // Speksi: 0 s ei ole lepoavain (+1,5 km/s, θ −4,5°/s), 15 s on lepo.
            double dt = 0.01;
            var a = LennonV3.Kamera(0, AteenaReittiM); var b = LennonV3.Kamera(dt, AteenaReittiM);
            double e = (b.EtaisyysM - a.EtaisyysM) / dt / 1000, th = (b.Theta - a.Theta) / dt;
            Oleta.Tosi(e > 1.0 && e < 2.0, $"alun etäisyysnopeus {e:F2} km/s");
            Oleta.Tosi(th < -3.5 && th > -5.5, $"alun θ-nopeus {th:F2} °/s");
            var c = LennonV3.Kamera(LennonV3.KestoS - dt, AteenaReittiM); var d = LennonV3.Kamera(LennonV3.KestoS, AteenaReittiM);
            Oleta.Tosi(Math.Abs(d.EtaisyysM - c.EtaisyysM) / dt < 50, "loppu lepää (etäisyys)");
            Oleta.Tosi(Math.Abs(d.Theta - c.Theta) / dt < 0.05, "loppu lepää (θ)");
        }

        [Testi]
        static void NopeusprofiiliJaAteenanHuippu()
        {
            Oleta.Tosi(Math.Abs(LennonV3.ProfiilinIntegraali - 8.27) < 0.05, $"∫f = {LennonV3.ProfiilinIntegraali:F3} s");
            Oleta.Tosi(LennonV3.KoneenOsuus(0) == 0 && Math.Abs(LennonV3.KoneenOsuus(LennonV3.KestoS) - 1) < 1e-9, "osuus 0 → 1");
            double ed = -1;
            for (double t = 0; t <= LennonV3.KestoS; t += 0.05)
            {
                double u = LennonV3.KoneenOsuus(t);
                Oleta.Tosi(u >= ed, $"osuus ei laske {t:F2} s");
                ed = u;
            }
            double huippu = LennonV3.NopeusMs(9.5, AteenaReittiM) / 1000;
            Oleta.Tosi(Math.Abs(huippu - 71) < 1.5, $"Ateenan huippu {huippu:F1} km/s (speksi 71)");
            double lahi = LennonV3.NopeusMs(1.0, AteenaReittiM) / 1000;
            Oleta.Tosi(Math.Abs(lahi - 5) < 0.5, $"lähikuvan nopeus {lahi:F1} km/s (speksi 5)");
            Oleta.Tosi(LennonV3.NopeusMs(LennonV3.KestoS, AteenaReittiM) == 0, "pysähtyy 15 s");
        }

        [Testi]
        static void KaukoskaalaLyhyillaReiteilla()
        {
            // Pariisi–Bryssel 264 km: kaukokuva 36 km; Wien–Bratislava 55 km: sama alaraja; pitkät 80 km (avaimet 8 ja 11 s;
            // välissä ajelehdinta pysyy 10 %:n sisällä).
            foreach (double t in new[] { 8.0, 11.0 })
            {
                Oleta.Tosi(Math.Abs(LennonV3.Kamera(t, 264_000).EtaisyysM / 1000 - 36) < 0.05, $"Pariisi–Bryssel 36 km ({t} s)");
                Oleta.Tosi(Math.Abs(LennonV3.Kamera(t, 55_000).EtaisyysM / 1000 - 36) < 0.05, $"Wien–Bratislava 36 km ({t} s)");
                Oleta.Tosi(Math.Abs(LennonV3.Kamera(t, 5_570_000).EtaisyysM / 1000 - 80) < 0.05, $"Lontoo–New York 80 km ({t} s)");
            }
            double valissa = LennonV3.Kamera(9.5, 264_000).EtaisyysM / 1000;
            Oleta.Tosi(Math.Abs(valissa - 36) < 3.6, $"ajelehdinta 9,5 s: {valissa:F1} km");
            Oleta.Tosi(Math.Abs(LennonV3.Kamera(0, 55_000).EtaisyysM / 1000 - 20) < 0.01, "lähikuva ei skaalaudu");
        }

        [Testi]
        static void KameraAinaMatalalla()
        {
            foreach (double L in new[] { 55_000.0, 264_000.0, AteenaReittiM, 5_570_000.0 })
                for (double t = 0; t <= LennonV3.KestoS; t += 0.1)
                {
                    double h = LennonV3.KameranKorkeusM(t, L);
                    var k = LennonV3.Kamera(t, L);
                    Oleta.Tosi(h <= 20_000 && h > 500, $"kameran korkeus {h / 1000:F1} km ({L / 1000} km, {t:F1} s)");
                    Oleta.Tosi(k.Korkeuskulma >= 9 && k.Korkeuskulma <= 16, $"korkeuskulma {k.Korkeuskulma:F1}° ({t:F1} s)");
                    Oleta.Tosi(k.Theta >= 45 && k.Theta <= 120, $"θ {k.Theta:F1}° ei suoraan takaa ({t:F1} s)");
                }
        }

        [Testi]
        static void KoneenKorkeusJaKosketus()
        {
            Oleta.Sama(LennonV3.MatkaKorkeusM, LennonV3.KoneenKorkeusM(5.0));
            Oleta.Tosi(LennonV3.KoneenKorkeusM(13.0) < LennonV3.MatkaKorkeusM && LennonV3.KoneenKorkeusM(13.0) > 0, "liuku 13 s");
            Oleta.Sama(0.0, LennonV3.KoneenKorkeusM(LennonV3.KosketusS));
            double ed = double.MaxValue;
            for (double t = LennonV3.LaskuAlkaaS; t <= LennonV3.KosketusS; t += 0.05)
            {
                double h = LennonV3.KoneenKorkeusM(t);
                Oleta.Tosi(h <= ed + 1e-9, $"korkeus ei nouse laskussa {t:F2} s");
                ed = h;
            }
            Oleta.Tosi(LennonV3.NokanKulma(14.2) > 0 && LennonV3.NokanKulma(12.5) < 0, "liuku nokka alas, oikaisu ylös");
        }

        [Testi]
        static void AteenaAfrikastaPohjoiseen()
        {
            var r = LennonV3.Reitti("ateena", LontooLat, LontooLon, AteenaLat, AteenaLon);
            Oleta.Tosi(r[0].Lat < 33.5, $"lähtö Afrikan rannikolta ({r[0].Lat:F2} N)");
            Oleta.Tosi(Math.Abs(r[r.Count - 1].Lat - AteenaLat) < 1e-9, "päättyy Ateenaan");
            // Matkan suunta pääosin pohjoiseen (suuntima 330–40°) koko reitillä.
            for (double u = 0; u <= 1.0; u += 0.05)
            {
                var k = LennonV3.ReitinKohta(r, u);
                Oleta.Tosi(k.Suunta > 330 || k.Suunta < 40, $"suunta {k.Suunta:F0}° kohdassa {u:F2}");
            }
            double yht = 0;
            for (int i = 1; i < r.Count; i++) yht += LennonAikajana.ReittiM(r[i - 1].Lat, r[i - 1].Lon, r[i].Lat, r[i].Lon);
            Oleta.Tosi(Math.Abs(yht / 1000 - 588) < 30, $"Ateenan reitti {yht / 1000:F0} km (speksi 588)");
        }

        [Testi]
        static void MaisemasuuntaJaLoppuKaupunkiin()
        {
            // Tokio: maisemasuunta 235° (Fuji lounaassa) → kone lentää suuntaan 235° kohti kaupunkia.
            var r = LennonV3.Reitti("tokio", LontooLat, LontooLon, 35.68, 139.69);
            var loppu = LennonV3.ReitinKohta(r, 0.98);
            Oleta.Tosi(Math.Abs(LennonV3.Kulmaero(loppu.Suunta, 235)) < 15, $"Tokion loppusuunta {loppu.Suunta:F0}°");
            var p = LennonV3.ReitinKohta(r, 1.0);
            Oleta.Tosi(Math.Abs(p.Lat - 35.68) < 1e-6 && Math.Abs(p.Lon - 139.69) < 1e-6, "perillä kaupungissa");
            // Tuntematon kohde: todellisen reitin loppuosa (Lontoosta Reykjavikiin tultaessa suunta lännestä/luoteesta).
            var m = LennonV3.Reitti(null, LontooLat, LontooLon, 64.15, -21.94);
            Oleta.Tosi(m.Count == 4, "tuntematon: lähtö, kaksi välipistettä ja kohde");
        }

        [Testi]
        static void KallistusRajoissa()
        {
            var r = LennonV3.Reitti("ateena", LontooLat, LontooLon, AteenaLat, AteenaLon);
            bool kaarsi = false;
            for (double t = 0; t <= LennonV3.KestoS; t += 0.05)
            {
                double k = LennonV3.Kallistus(r, t);
                Oleta.Tosi(Math.Abs(k) <= LennonV3.KallistusRaja + 1e-9, $"kallistus {k:F1}° ({t:F2} s)");
                if (Math.Abs(k) > 3) kaarsi = true;
            }
            Oleta.Tosi(kaarsi, "Ateenan reitillä on kaarroksia (Antikythera, Aegina)");
            Oleta.Sama(0.0, LennonV3.Kallistus(r, 14.8));
        }

        [Testi]
        static void AlkuliukuNapautusnakymastaLentoon()
        {
            // Omistajan TF-löydös 27.9.: lähtö napautusnäkymästä (Eurooppa 5000 km ylhäältä) ilman leikkausta, liittyy lennon kameraan.
            var a = (Lat: 48.0, Lon: 12.0, EtaisyysM: 5_000_000.0, Kallistus: 0.0, Suuntima: 350.0, Katse: 0.0);
            var b = (Lat: 33.1, Lon: 22.7, EtaisyysM: 20_000.0, Kallistus: 77.9, Suuntima: 20.0, Katse: 3500.0);
            double T = LennonV3.AlkuliukuS(a.EtaisyysM, b.EtaisyysM);
            Oleta.Tosi(T > 4.0 && T <= 5.0, $"kesto {T:F2} s");
            Oleta.Tosi(LennonV3.Alkuliuku(0, T, a, b).Equals(a), "t = 0: täsmälleen napautusnäkymä");
            Oleta.Tosi(LennonV3.Alkuliuku(T, T, a, b).Equals(b), "t = T: lennon kamera");
            // Lähtee levosta: ensimmäisen kehyksen (1/120 s) muutos mitätön.
            var k1 = LennonV3.Alkuliuku(1.0 / 120, T, a, b);
            Oleta.Tosi(Math.Abs(k1.EtaisyysM - a.EtaisyysM) < 50 && Math.Abs(k1.Lat - a.Lat) < 1e-4, "levosta");
            // Suuntima lyhintä tietä (350° → 20° kiertää 30° eikä 330°) ja etäisyys monotonisesti alas.
            double ed = double.MaxValue;
            for (double t = 0; t <= T; t += T / 200)
            {
                var k = LennonV3.Alkuliuku(t, T, a, b);
                double d = LennonV3.Kulmaero(a.Suuntima, k.Suuntima);
                Oleta.Tosi(d >= -1e-9 && d <= 30 + 1e-9, $"suuntima {k.Suuntima:F1} t={t:F2}");
                Oleta.Tosi(k.EtaisyysM <= ed + 1e-6, $"etäisyys kasvoi t={t:F2}");
                ed = k.EtaisyysM;
            }
            // Katsepiste perillä jo siirto-osuudella (maa ei liu'u lähikuvassa).
            var ks = LennonV3.Alkuliuku(LennonV3.AlkuliukuSiirto * T, T, a, b);
            Oleta.Tosi(Math.Abs(ks.Lat - b.Lat) < 1e-6 && Math.Abs(ks.Lon - b.Lon) < 1e-6, "siirto valmis");
            Oleta.Sama(2.0, LennonV3.AlkuliukuS(30_000, 20_000));
        }

        [Testi]
        static void EloToistuuJaVaihtelee()
        {
            var a = LennonV3.Elo(6.3, 42); var b = LennonV3.Elo(6.3, 42); var c = LennonV3.Elo(6.3, 43);
            Oleta.Tosi(a.Equals(b), "sama siemen → sama arvo");
            Oleta.Tosi(!a.Equals(c), "eri siemen → eri arvo");
            // Ei monotoniaa: kallistus ei ole jaksollinen 2 s:n välein.
            double ero = 0;
            for (double t = 1; t < 9; t += 0.25) ero += Math.Abs(LennonV3.Elo(t, 42).Kallistus - LennonV3.Elo(t + 2, 42).Kallistus);
            Oleta.Tosi(ero > 1.0, $"vaihtelu {ero:F2}");
            Oleta.Tosi(LennonV3.Elo(1.0, 42).Kierrokset > 0.9 && LennonV3.Elo(14.9, 42).Kierrokset < 0.7, "kierrokset: matka / tyhjäkäynti");
        }
    }
}
