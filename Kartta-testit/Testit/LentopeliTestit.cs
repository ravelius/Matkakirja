// LENTOPELI (omistaja 27.9.2026, docs/raportit/lentopeli-suunnitelma-20260927.md): puhtaan ytimen testit.
// Polttoaine ja kantama kaasuittain [O], oikaisu, koordinoitu käännös, energia, sakkaus, liito 1:8, tuuli, paluurengas,
// rahat ja tankkaus, rengasradan determinismi ja mitat, renkaan läpäisy sekä autopilotti koko radan läpi palkkioineen.
using System;
using Matkakirja;
using static Matkakirja.Lentopeli;

namespace Matkakirja.Kartta.Testit
{
    static class LentopeliTestit
    {
        const double Dt = 1.0 / 60.0, AteenaLat = 37.98, AteenaLon = 23.73;

        static void Lahella(double odotettu, double saatu, double tol, string mika) =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) <= tol, $"{mika}: odotettu {odotettu} ± {tol}, saatu {saatu}");

        static Ohjaus Irti(Kaasu k) => new Ohjaus { Kaasu = k };

        /// <summary>Vaakalento kaasulla tavoitenopeudesta, kunnes moottori sammuu: (aika s, matka km).</summary>
        static (double Aika, double Km) TankkiTyhjaksi(Kaasu k)
        {
            var s = Lentotila.Lahto(40, 20, 3, 0);
            s.NopeusKms = Tavoitenopeus(k);
            double km = 0;
            while (s.Moottori && s.AikaS < 1000)
            {
                var e = s;
                s = Askel(s, Dt, Irti(k), default);
                km += EtaisyysKm(e.Lat, e.Lon, s.Lat, s.Lon);
            }
            return (s.AikaS, km);
        }

        [Testi]
        static void TaysiTankkiMatkakaasulla()
        {
            var (aika, km) = TankkiTyhjaksi(Kaasu.Matka);
            Lahella(360, aika, 18, "matkakaasu 360 s ± 5 %");
            Lahella(800, km, 40, "kantama 800 km ± 5 %");
            Oleta.Tosi(km >= 790 && km <= 840, $"kantama 792–840 km, saatu {km}");
        }

        [Testi]
        static void TalousJaTaysiKaasu()
        {
            var (talous, kmT) = TankkiTyhjaksi(Kaasu.Talous);
            var (taysi, kmF) = TankkiTyhjaksi(Kaasu.Taysi);
            var (_, kmM) = TankkiTyhjaksi(Kaasu.Matka);
            Lahella(480, talous, 5, "talous ~480 s");
            Lahella(240, taysi, 5, "täysi ~240 s");
            Oleta.Tosi(kmT > kmM * 1.1 && kmF < kmM * 0.85, $"talous pidempi, täysi lyhyempi: {kmT} / {kmM} / {kmF}");
        }

        [Testi]
        static void SormenNostoOikaisee()
        {
            var s = Lentotila.Lahto(40, 20, 3, 0);
            var veto = new Ohjaus { SauvaX = 1, SauvaY = 1, Sormi = true, Kaasu = Kaasu.Matka };
            for (int i = 0; i < 120; i++) s = Askel(s, Dt, veto, default);
            Lahella(45, s.Kallistus, 0.5, "täysi veto 45°");
            Lahella(25, s.Nokka, 0.5, "nokka 25°");
            for (int i = 0; i < 90; i++) s = Askel(s, Dt, Irti(Kaasu.Matka), default);
            Oleta.Tosi(Math.Abs(s.Kallistus) < 2 && Math.Abs(s.Nokka) < 2, $"1,5 s: kallistus {s.Kallistus}, nokka {s.Nokka}");

            // Vapaa tila pitää asennon sormen noustessa.
            var v = Lentotila.Lahto(40, 20, 3, 0);
            v.Kallistus = 30;
            var vapaa = new Ohjaus { Kaasu = Kaasu.Matka, Avustettu = false };
            for (int i = 0; i < 90; i++) v = Askel(v, Dt, vapaa, default);
            Lahella(30, v.Kallistus, 1e-9, "vapaa tila ei oikaise");
            Oleta.Tosi(new Ohjaus().Avustettu, "avustettu on oletus");
        }

        [Testi]
        static void KallistusKaantaa()
        {
            var s = Lentotila.Lahto(40, 20, 3, 10);
            s.Kallistus = 45;
            var o = new Ohjaus { SauvaX = 1, Sormi = true, Kaasu = Kaasu.Matka };
            for (int i = 0; i < 60; i++) s = Askel(s, Dt, o, default);
            Lahella(50, s.Suunta, 0.5, "45° kallistus kääntää 40°/s");
            var v = Lentotila.Lahto(40, 20, 3, 10);
            v.Kallistus = -45;
            o.SauvaX = -1;
            for (int i = 0; i < 60; i++) v = Askel(v, Dt, o, default);
            Lahella(330, v.Suunta, 0.5, "vasen kallistus kääntää vasemmalle");
        }

        [Testi]
        static void NokanNostoVaihtaaNopeuttaKorkeuteen()
        {
            var s = Lentotila.Lahto(40, 20, 3, 0);
            var o = new Ohjaus { SauvaY = 1, Sormi = true, Kaasu = Kaasu.Matka };
            double h0 = s.KorkeusKm, v0 = s.NopeusKms;
            for (int i = 0; i < 120; i++) s = Askel(s, Dt, o, default);
            Oleta.Tosi(s.KorkeusKm > h0 + 1.0, $"korkeus nousi: {s.KorkeusKm}");
            Oleta.Tosi(s.NopeusKms < v0 - 0.3, $"nopeus laski: {s.NopeusKms}");
            // Sukellus takaisin: nopeus kasvaa yli matkanopeuden.
            o.SauvaY = -1;
            double h1 = s.KorkeusKm;
            for (int i = 0; i < 120; i++) s = Askel(s, Dt, o, default);
            Oleta.Tosi(s.KorkeusKm < h1 && s.NopeusKms > v0, $"sukellus: h {s.KorkeusKm}, v {s.NopeusKms}");
        }

        [Testi]
        static void SakkausLaukeaaJaToipuu()
        {
            var s = Lentotila.Lahto(40, 20, 3, 0);
            s.NopeusKms = 1.3;
            var nosto = new Ohjaus { SauvaY = 1, Sormi = true, Kaasu = Kaasu.Tyhjakaynti };
            double laukesi = -1;
            for (int i = 0; i < 600 && laukesi < 0; i++)
            {
                s = Askel(s, Dt, nosto, default);
                if (s.Sakkaus > 0) laukesi = s.AikaS;
            }
            Oleta.Tosi(laukesi > 0, "sakkaus laukesi hitaalla nousulla");
            // Pelaaja pitää sauvan ylhäällä: nokka pakotetaan silti alas.
            double alin = 90;
            while (s.Sakkaus > 0 && s.AikaS < laukesi + 3) { s = Askel(s, Dt, nosto, default); alin = Math.Min(alin, s.Nokka); }
            Oleta.Tosi(s.AikaS - laukesi <= 2.0, $"toipui {s.AikaS - laukesi} s:ssa");
            Oleta.Tosi(alin < -5, $"nokka putosi: {alin}");

            // Matkanopeudella sama nosto ei sakkaa.
            var m = Lentotila.Lahto(40, 20, 3, 0);
            var nostoM = new Ohjaus { SauvaY = 0.3, Sormi = true, Kaasu = Kaasu.Matka };
            for (int i = 0; i < 300; i++) { m = Askel(m, Dt, nostoM, default); Oleta.Tosi(m.Sakkaus == 0, "ei sakkausta matkalla"); }
        }

        [Testi]
        static void PolttoaineLoppuuJaKoneLiitaa()
        {
            var s = Lentotila.Lahto(40, 20, 5, 0, 0.002);
            double minV = 9;
            for (int i = 0; i < 60 * 40; i++)
            {
                s = Askel(s, Dt, Irti(Kaasu.Matka), default);
                if (!s.Moottori) minV = Math.Min(minV, s.NopeusKms);
            }
            Oleta.Tosi(!s.Moottori && s.Polttoaine == 0, "moottori sammui");
            Oleta.Tosi(minV >= 0.9, $"liitonopeus ≥ 0,9: {minV}");
            var e = s;
            for (int i = 0; i < 300; i++) s = Askel(s, Dt, Irti(Kaasu.Matka), default);
            double vajoama = (e.KorkeusKm - s.KorkeusKm) / 5.0, v = (e.NopeusKms + s.NopeusKms) / 2;
            Lahella(v / 8.0, vajoama, v / 8.0 * 0.15, "vajoama ≈ v/8");
            Oleta.Tosi(s.Sakkaus == 0, "liito ei sakkaa");
        }

        [Testi]
        static void TuuliSiirtaa()
        {
            var a = Lentotila.Lahto(40, 20, 3, 0);
            var b = a;
            var lansi = new Tuuli(270, 0.5);
            for (int i = 0; i < 600; i++) { a = Askel(a, Dt, Irti(Kaasu.Matka), default); b = Askel(b, Dt, Irti(Kaasu.Matka), lansi); }
            Lahella(0, a.Lon - 20, 1e-9, "tyynessä suoraan pohjoiseen");
            double ita = EtaisyysKm(b.Lat, a.Lon, b.Lat, b.Lon);
            Oleta.Tosi(b.Lon > a.Lon, "länsituuli siirtää itään");
            Lahella(5.0, ita, 0.1, "0,5 km/s × 10 s");
            Lahella(a.Lat, b.Lat, 0.01, "sivutuuli ei muuta pohjoiskomponenttia");
            Lahella(0, a.Suunta - b.Suunta, 1e-9, "tuuli ei käännä nokkaa");
        }

        [Testi]
        static void PaluuSadeTuulenMukaan()
        {
            Lahella(912, PaluuSadeKm(1.0, default, 0), 1e-6, "tyyni: 480 s × 1,9");
            Lahella(456, PaluuSadeKm(0.5, default, 123), 1e-6, "puoli tankkia");
            double vasta = PaluuSadeKm(1.0, new Tuuli(90, 0.4), 90);
            double myota = PaluuSadeKm(1.0, new Tuuli(270, 0.4), 90);
            double sivu = PaluuSadeKm(1.0, new Tuuli(0, 0.4), 90);
            Lahella(480 * 1.5, vasta, 1e-6, "vastatuuli");
            Lahella(480 * 2.3, myota, 1e-6, "myötätuuli");
            Lahella(912, sivu, 1e-6, "sivutuuli");
            Oleta.Tosi(vasta < myota, "vastatuulessa pienempi");
            Oleta.Sama(0.0, PaluuSadeKm(0, new Tuuli(0, 0.3), 0), "tyhjä tankki");
        }

        [Testi]
        static void HinnatJaTankkaus()
        {
            Lahella(24, TankkiHinta(1.0), 1e-12, "tankki");
            Lahella(14.4, TankkiHinta(0.6), 1e-12, "tankki 0,6");
            Lahella(64, SakkoMuualle(1.6), 1e-12, "sakko muualle");
            Lahella(80, SakkoPakkolasku(1.0), 1e-12, "pakkolasku");
            Lahella(0.20, Palkkio(Tehtava.Rengasrata), 1e-12, "rengasrata");
            Lahella(0.25, Palkkio(Tehtava.Kuvauslento), 1e-12, "kuvauslento");
            Lahella(0.35, Palkkio(Tehtava.Navigointi), 1e-12, "navigointi");

            double p = Tankkaa(0.25, 100, 1.0, out double maksu);
            Lahella(1.0, p, 1e-12, "täyteen");
            Lahella(18, maksu, 1e-12, "0,75 tankkia = 18 £");
            p = Tankkaa(0.25, 6, 1.0, out maksu);
            Lahella(0.5, p, 1e-12, "rahan verran");
            Lahella(6, maksu, 1e-12, "koko raha");
            p = Tankkaa(0.4, 0, 1.6, out maksu);
            Lahella(0.4, p, 1e-12, "rahaton ei tankkaa");
            Lahella(0, maksu, 1e-12, "ei maksua");
            p = Tankkaa(1.0, 50, 1.0, out maksu);
            Lahella(0, maksu, 1e-12, "täysi tankki ei maksa");
        }

        [Testi]
        static void RengasrataDeterministinen()
        {
            int siemen = Siemen("ateena", 12);
            Oleta.Sama(siemen, Siemen("ateena", 12), "siemen toistuu");
            Oleta.Tosi(siemen != Siemen("ateena", 13) && siemen != Siemen("rooma", 12), "siemen vaihtelee");
            Oleta.Tosi(siemen >= 0, "siemen ei-negatiivinen");
            var a = Rengasrata(siemen, AteenaLat, AteenaLon);
            var b = Rengasrata(siemen, AteenaLat, AteenaLon);
            Oleta.Sama(a.Length, b.Length, "sama pituus");
            for (int i = 0; i < a.Length; i++)
                Oleta.Tosi(a[i].Lat == b[i].Lat && a[i].Lon == b[i].Lon && a[i].KorkeusKm == b[i].KorkeusKm && a[i].SuuntaAst == b[i].SuuntaAst, "sama rata " + i);

            var pituudet = new bool[8];
            for (int k = 0; k < 200; k++)
            {
                var r = Rengasrata(Siemen("kaupunki" + k, k), AteenaLat, AteenaLon);
                Oleta.Tosi(r.Length >= 5 && r.Length <= 7, "5–7 rengasta: " + r.Length);
                pituudet[r.Length] = true;
                foreach (var g in r)
                {
                    double d = EtaisyysKm(AteenaLat, AteenaLon, g.Lat, g.Lon);
                    Oleta.Tosi(d >= 25 - 1e-6 && d <= 45 + 1e-6, $"etäisyys 25–45 km: {d}");
                    Oleta.Tosi(g.KorkeusKm >= 1.5 && g.KorkeusKm <= 5, $"korkeus 1,5–5 km: {g.KorkeusKm}");
                    Lahella(7.5, g.SadeKm, 1e-12, "säde 3 × siipiväli / 2");
                    Oleta.Tosi(g.SuuntaAst >= 0 && g.SuuntaAst < 360, "suunta 0..360");
                }
                for (int i = 0; i + 1 < r.Length; i++)
                {
                    // Rengas on radan kulkusuuntaan: seuraava rengas on renkaan edessä.
                    double s = SuuntimaAst(r[i].Lat, r[i].Lon, r[i + 1].Lat, r[i + 1].Lon);
                    double ero = Math.Abs(((s - r[i].SuuntaAst) % 360 + 540) % 360 - 180);
                    Oleta.Tosi(ero < 90, $"seuraava edessä: {ero}");
                }
            }
            Oleta.Tosi(pituudet[5] && pituudet[6] && pituudet[7], "kaikki pituudet 5, 6 ja 7 esiintyvät");
        }

        static Lentotila Pisteessa(Rengas r, double suunta, double km, double korkeus)
        {
            var s = Lentotila.Lahto(r.Lat, r.Lon, korkeus, 0);
            Siirra(r.Lat, r.Lon, suunta, km, out s.Lat, out s.Lon);
            return s;
        }

        [Testi]
        static void LapiRenkaastaVainSisalta()
        {
            var r = new Rengas { Lat = 40, Lon = 20, KorkeusKm = 3, SuuntaAst = 90, SadeKm = 7.5 };
            Oleta.Tosi(LapiRenkaasta(Pisteessa(r, 270, 0.05, 3), Pisteessa(r, 90, 0.05, 3), r), "keskeltä läpi");
            Oleta.Tosi(!LapiRenkaasta(Pisteessa(r, 90, 0.05, 3), Pisteessa(r, 270, 0.05, 3), r), "väärään suuntaan");

            // Reunan lähellä: 7 km pohjoiseen sisällä, 8 km ulkona, 8 km yläpuolella ulkona.
            static Lentotila Siirretty(Rengas r, double ita, double pohjoinen, double h)
            {
                Siirra(r.Lat, r.Lon, 0, pohjoinen, out double la, out double lo);
                Siirra(la, lo, 90, ita, out la, out lo);
                var s = Lentotila.Lahto(la, lo, h, 90);
                return s;
            }
            Oleta.Tosi(LapiRenkaasta(Siirretty(r, -0.05, 7, 3), Siirretty(r, 0.05, 7, 3), r), "7 km keskeltä sisällä");
            Oleta.Tosi(!LapiRenkaasta(Siirretty(r, -0.05, 8, 3), Siirretty(r, 0.05, 8, 3), r), "8 km ulkona");
            Oleta.Tosi(!LapiRenkaasta(Siirretty(r, -0.05, 0, 11), Siirretty(r, 0.05, 0, 11), r), "8 km yläpuolella ulkona");
            Oleta.Tosi(!LapiRenkaasta(Siirretty(r, -0.05, 5, 9), Siirretty(r, 0.05, 5, 9), r), "5 km + 6 km = 7,8 km ulkona");
            Oleta.Tosi(LapiRenkaasta(Siirretty(r, -0.05, 4, 7), Siirretty(r, 0.05, 4, 7), r), "4 km + 4 km = 5,7 km sisällä");
            // Samansuuntaisesti ohi: kulkee renkaan tason suuntaisesti (ei ylitä tasoa), vaikka on säteen sisällä.
            Oleta.Tosi(!LapiRenkaasta(Siirretty(r, -0.5, 3, 3), Siirretty(r, -0.5, -3, 3), r), "tason suuntaisesti ohi");
            Oleta.Tosi(!LapiRenkaasta(Siirretty(r, -2, 0, 3), Siirretty(r, -1, 0, 3), r), "ei vielä tasolla");
        }

        [Testi]
        static void AutopilottiLapaiseeRadanJaSaaPalkkion()
        {
            (string, int, double, double)[] lennot =
            {
                ("ateena", 1, AteenaLat, AteenaLon), ("ateena", 2, AteenaLat, AteenaLon), ("rooma", 7, 41.9, 12.5),
                ("helsinki", 3, 60.17, 24.94), ("lontoo", 11, 51.507, -0.128), ("pariisi", 5, 48.857, 2.352),
            };
            foreach (var (kaupunki, paiva, lat, lon) in lennot)
            {
                var rata = Rengasrata(Siemen(kaupunki, paiva), lat, lon);
                var l = Uusi(Lentotila.Lahto(lat, lon, 1.0, 0), lat, lon, rata);
                double palkkio = 0;
                while (l.Tila.AikaS < 600)
                {
                    var kohde = l.RataValmis ? new Rengas { Lat = lat, Lon = lon, KorkeusKm = 1.0 } : l.Rata[l.Seuraava];
                    double ennen = l.Tila.Polttoaine;
                    bool valmisEnnen = l.RataValmis;
                    Paivita(ref l, Dt, Autopilotti(l.Tila, kohde), default);
                    if (!valmisEnnen && l.RataValmis) palkkio = l.Tila.Polttoaine - ennen;
                }
                string s = $"{kaupunki} {paiva}";
                Oleta.Tosi(l.RataValmis, $"{s}: rata läpi ({l.Lapaisty}/{rata.Length})");
                Oleta.Sama(rata.Length, l.Lapaisty, s + " läpäisyt");
                Lahella(PalkkioRengasrata - Kulutus(Kaasu.Matka) * Dt, palkkio, 1e-9, s + " palkkio +0,20");
            }
        }

        [Testi]
        static void PalkkioEnintaanTaysiJaKaynnistaa()
        {
            var r = new Rengas { Lat = 40, Lon = 20, KorkeusKm = 3, SuuntaAst = 90, SadeKm = 7.5 };
            var tila = Pisteessa(r, 270, 0.02, 3);
            tila.Suunta = 90;
            tila.Polttoaine = 0.95;
            var l = Uusi(tila, 40, 19, new[] { r });
            Paivita(ref l, Dt, Irti(Kaasu.Matka), default);
            Oleta.Tosi(l.RataValmis, "yhden renkaan rata läpi");
            Lahella(1.0, l.Tila.Polttoaine, 1e-12, "enintään täysi tankki");

            tila.Polttoaine = 0; tila.Moottori = false;
            l = Uusi(tila, 40, 19, new[] { r });
            Paivita(ref l, Dt, Irti(Kaasu.Matka), default);
            Oleta.Tosi(l.Tila.Moottori && Math.Abs(l.Tila.Polttoaine - 0.2) < 1e-12, "palkkio käynnistää sammuneen moottorin");
            Paivita(ref l, Dt, Irti(Kaasu.Matka), default);
            Oleta.Sama(1, l.Lapaisty, "palkkio vain kerran");
        }

        [Testi]
        static void EtaisyysJaSuuntima()
        {
            Lahella(111.195, EtaisyysKm(0, 0, 1, 0), 0.001, "1° meridiaania");
            Lahella(0, SuuntimaAst(40, 20, 41, 20), 1e-9, "pohjoinen");
            Lahella(90, SuuntimaAst(0, 20, 0, 21), 1e-9, "itä");
            Lahella(180, SuuntimaAst(41, 20, 40, 20), 1e-9, "etelä");
            Siirra(AteenaLat, AteenaLon, 47, 250, out double la, out double lo);
            Lahella(250, EtaisyysKm(AteenaLat, AteenaLon, la, lo), 1e-9, "250 km tarkasti");
            Lahella(47, SuuntimaAst(AteenaLat, AteenaLon, la, lo), 1e-9, "suuntima säilyy");
        }
    }
}
