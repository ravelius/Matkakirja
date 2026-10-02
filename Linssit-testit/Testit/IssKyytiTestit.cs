// ISS:n kyyti: kameran asennot (seuranta, Cupola-ikkuna), sekoitus, tilakone ja AstronauttiLinssin kytkentä vale-ympäristössä.
using System;
using System.IO;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class IssKyytiTestit
    {
        const double Deg = Math.PI / 180;
        static readonly IssHetki Iss = new IssHetki(new LatLon(50, 10), 420_000, 60);

        /// <summary>Silmän paikka Kuvakulmasta samalla kaavalla kuin PalloKierto.LaskeAsento (pallomalli).</summary>
        static (double x, double y, double z) Silma(in Kuvakulma k)
        {
            double R = IssKuvakulma.MaanSadeM + k.KatseKorkeusM, p = k.Lat * Deg, l = k.Lon * Deg;
            var ylos = (x: Math.Cos(p) * Math.Cos(l), y: Math.Cos(p) * Math.Sin(l), z: Math.Sin(p));
            var pohjoinen = (x: -Math.Sin(p) * Math.Cos(l), y: -Math.Sin(p) * Math.Sin(l), z: Math.Cos(p));
            var ita = (x: -Math.Sin(l), y: Math.Cos(l), z: 0.0);
            double b = k.Suuntima * Deg, t = k.Kallistus * Deg;
            var eteen = (x: pohjoinen.x * Math.Cos(b) + ita.x * Math.Sin(b), y: pohjoinen.y * Math.Cos(b) + ita.y * Math.Sin(b),
                z: pohjoinen.z * Math.Cos(b) + ita.z * Math.Sin(b));
            var s = (x: ylos.x * Math.Cos(t) - eteen.x * Math.Sin(t), y: ylos.y * Math.Cos(t) - eteen.y * Math.Sin(t),
                z: ylos.z * Math.Cos(t) - eteen.z * Math.Sin(t));
            return (ylos.x * R + s.x * k.EtaisyysM, ylos.y * R + s.y * k.EtaisyysM, ylos.z * R + s.z * k.EtaisyysM);
        }

        static (double lat, double lon, double h) Llh((double x, double y, double z) v)
        {
            double r = Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            return (Math.Asin(v.z / r) / Deg, Math.Atan2(v.y, v.x) / Deg, r - IssKuvakulma.MaanSadeM);
        }

        [Testi] static void IkkunanRajaukset()
        {
            // Omistaja 28.9. klo 22.5x: oletuksena pyöreä kattoikkuna tiiviisti rajattuna. 30.9.: katse horisonttikulmaan
            // (HorisonttikulmaTestit); A/B pois = 55° kuten ennen.
            Oleta.Tosi(IssKuvakulma.Rajaus == IssKuvakulma.IkkunanRajaus.Pyorea && double.IsNaN(IssKuvakulma.KatseAlasPakotettu), "oletus pyöreä");
            Oleta.Tosi(IssKuvakulma.Horisonttikulma && IssKuvakulma.IkkunanKatseNyt < 35, "pyöreä: horisonttikulma");
            IssKuvakulma.Horisonttikulma = false;
            try { Oleta.Tosi(IssKuvakulma.IkkunanKatseNyt == IssKuvakulma.IkkunanKatseAlas, "pyöreä A/B pois 55°"); }
            finally { IssKuvakulma.Horisonttikulma = true; }
            // Horisontti (A/B, omistaja 21.5x): katse sivuikkunasta 36°, maan reuna 20,3° alapuolella eli 15,7° kuvan keskikohdan
            // yläpuolella: näkyy (kenttä 65,7°, puolikas 32,8°) ja avaruus sen yllä.
            IssKuvakulma.Rajaus = IssKuvakulma.IkkunanRajaus.Horisontti;
            try
            {
                Oleta.Tosi(IssKuvakulma.IkkunanKatseNyt == IssKuvakulma.HorisontinKatseAlas, "horisontti 36°");
                double horisontti = Math.Acos(IssKuvakulma.MaanSadeM / (IssKuvakulma.MaanSadeM + Iss.KorkeusM)) / Deg;
                double yla = IssKuvakulma.HorisontinKatseAlas - horisontti;
                Oleta.Tosi(yla > 1 && yla < IssKuvakulma.IkkunanKentta / 2 - 10, $"maan reuna {yla:0.0}° keskikohdan yläpuolella");
                var k = IssKuvakulma.Ikkuna(Iss);
                var s = Llh(Silma(k));
                Oleta.Tosi(Math.Abs(s.h - 420_000) < 500, $"silmän korkeus {s.h:0} m");
                Oleta.Tosi(IssKuvakulma.Kaari(s.lat, s.lon, Iss.Paikka.Lat, Iss.Paikka.Lon) < 0.01, "silmä ISS:n kohdalla");
                Oleta.Tosi(Math.Abs(IssKuvakulma.Suunta(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon) - Iss.Suuntima) < 0.01, "radan suuntaan");
                // Katto (A/B) = 1.0.40.
                IssKuvakulma.Rajaus = IssKuvakulma.IkkunanRajaus.Katto;
                Oleta.Tosi(IssKuvakulma.IkkunanKatseNyt == IssKuvakulma.IkkunanKatseAlas, "katto 55°");
            }
            finally { IssKuvakulma.Rajaus = IssKuvakulma.IkkunanRajaus.Pyorea; }
        }

        [Testi] static void Cupola3KuvaJaValot()
        {
            // Kuva laitteen muodosta: iPhone pysty sellaisenaan ja vaaka käännettynä, iPad vaaka sellaisenaan ja pysty käännettynä.
            Oleta.Tosi(IssKuvakulma.Cupola3Kuva(402, 874) == (false, false), "iPhone pysty");
            Oleta.Tosi(IssKuvakulma.Cupola3Kuva(874, 402) == (false, true), "iPhone vaaka käännetty");
            Oleta.Tosi(IssKuvakulma.Cupola3Kuva(1194, 834) == (true, false), "iPad 11 vaaka");
            Oleta.Tosi(IssKuvakulma.Cupola3Kuva(834, 1194) == (true, true), "iPad 11 pysty käännetty");
            Oleta.Tosi(IssKuvakulma.Cupola3Kuva(1032, 1376) == (true, true), "iPad 13 pysty käännetty");
            Oleta.Tosi(IssKuvakulma.Cupola3Kuva(1290, 2796) == (false, false) && IssKuvakulma.Cupola3Kuva(0, 0) == (false, false), "pikselit ja nolla");
            // Valot (luode, koillinen, lounas): aurinko kaakossa → luoteen reuna täysin, viereiset himmeästi.
            var p = new float[3];
            IssKuvakulma.Cupola3Valot(1, -1, p);
            Oleta.Tosi(Math.Abs(p[0] - 1) < 1e-4 && p[1] > 0.2 && p[1] < 0.3 && Math.Abs(p[1] - p[2]) < 1e-4, $"kaakko {p[0]:0.00} {p[1]:0.00} {p[2]:0.00}");
            // Aurinko etelässä → yläreunat (luode ja koillinen) yhtä paljon, lounas ei.
            IssKuvakulma.Cupola3Valot(0, -0.5, p);
            Oleta.Tosi(p[0] > 0.7 && Math.Abs(p[0] - p[1]) < 1e-4 && p[2] == 0, $"etelä {p[0]:0.00} {p[1]:0.00} {p[2]:0.00}");
            // Aurinko koillisessa → lounas; pohjoisessa → lounas (ainoa alareuna); luoteessa → kaksi viereistä himmeästi.
            IssKuvakulma.Cupola3Valot(2, 2, p);
            Oleta.Tosi(Math.Abs(p[2] - 1) < 1e-4 && p[0] < 0.3 && p[1] == 0, $"koillinen {p[0]:0.00} {p[1]:0.00} {p[2]:0.00}");
            IssKuvakulma.Cupola3Valot(0, 1, p);
            Oleta.Tosi(p[2] > 0.7 && p[0] == 0 && p[1] == 0, $"pohjoinen {p[0]:0.00} {p[1]:0.00} {p[2]:0.00}");
            IssKuvakulma.Cupola3Valot(-1, 1, p);
            Oleta.Tosi(p[0] == 0 && p[1] > 0.2 && p[1] < 0.3 && Math.Abs(p[1] - p[2]) < 1e-4, $"luode {p[0]:0.00} {p[1]:0.00} {p[2]:0.00}");
            // Suoraan edessä tai takana: ei reunavaloa.
            IssKuvakulma.Cupola3Valot(0.0002, 0.0001, p);
            Oleta.Tosi(p[0] == 0 && p[1] == 0 && p[2] == 0, "edessä");
            // Keskitys (cl18: iPadilla lappu leikkautui reunaan; cl19: laatikon siirto paljasti 16 pt:n aukon, koska taustakuva
            // leikataan laatikkoon): iPad Pro 11 vaaka 1210 × 834, ikkuna y 0,465 → kuva siirtyy laatikossa (asema y 0,065 eli 31,8 pt
            // alas) ja laatikko pysyy paikallaan (y 0), vaaka pieni siirto laatikon varan sisällä.
            var d = IssKuvakulma.Cupola3Rajaus(1210, 834, true, "a", 1.04, 8);
            Oleta.Tosi(Math.Abs(d.asemaY - 0.065) < 0.005 && Math.Abs(d.y) < 0.01 && d.asemaX == 0.5 && d.x < -3 && d.x > -4.5,
                $"iPad vaaka asema ({d.asemaX:0.000}, {d.asemaY:0.000}) siirto ({d.x:0.0}, {d.y:0.0})");
            // Laatikko peittää ruudun: siirto enintään (z − 1) · korkeus / 2 − vara.
            Oleta.Tosi(Math.Abs(d.y) <= 0.04 * 417 - 8 && Math.Abs(d.x) <= 0.04 * 605 - 8, "iPad laatikon vara");
            // iPhone pysty: ei cover-ylijäämää pystyyn, joten siirto laatikkona varan verran (17,5 − 8 = 9,5 pt).
            d = IssKuvakulma.Cupola3Rajaus(402, 874, false, "a", 1.04, 8);
            Oleta.Tosi(Math.Abs(d.y - 9.48) < 0.05 && d.asemaY == 0.5 && Math.Abs(d.x) < 0.1, $"iPhone pysty ({d.asemaX:0.00}, {d.x:0.00}, {d.y:0.00})");
            // Ilman suurennosta (z = 1) laatikkoa ei siirretä lainkaan.
            d = IssKuvakulma.Cupola3Rajaus(402, 874, false, "a", 1, 8);
            Oleta.Tosi(d.x == 0 && d.y == 0, "ei varaa");
        }

        [Testi] static void IkkunanSilmaOnIssissa()
        {
            var k = IssKuvakulma.Ikkuna(Iss, IssKuvakulma.IkkunanKatseAlas);
            Oleta.Tosi(Math.Abs(k.EtaisyysM - 521_000) < 3_000, "etäisyys noin 521 km: " + k);
            Oleta.Tosi(Math.Abs(k.Kallistus - 37.7) < 0.2, "kallistus noin 37,7°: " + k);
            Oleta.Tosi(Math.Abs(IssKuvakulma.Kaari(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon) - 2.69) < 0.05, "kohde 2,69° edellä");
            var s = Llh(Silma(k));
            Oleta.Tosi(Math.Abs(s.h - 420_000) < 500, $"silmän korkeus {s.h:0} m");
            Oleta.Tosi(IssKuvakulma.Kaari(s.lat, s.lon, Iss.Paikka.Lat, Iss.Paikka.Lon) < 0.01, "silmä ISS:n kohdalla");
            // Kohde on radan suunnassa ISS:stä.
            Oleta.Tosi(Math.Abs(IssKuvakulma.Suunta(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon) - Iss.Suuntima) < 0.01, "radan suuntaan");
        }

        [Testi] static void LahemmasLasia()
        {
            // Omistaja 28.9. klo 18.0x: ikkuna zoomataan 1,3 ×: kenttä 80° → 65,7°, ja kuvan mittakaava kasvaa täsmälleen 1,3 ×.
            Oleta.Tosi(Math.Abs(IssKuvakulma.KenttaZoomilla(80, 1) - 80) < 1e-9, "zoom 1 = 1.0.37");
            double k = IssKuvakulma.KenttaZoomilla(80, 1.3);
            Oleta.Tosi(Math.Abs(k - 65.68) < 0.01, $"1,3 × → {k:0.00}°");
            double suhde = Math.Tan(40 * Math.PI / 180) / Math.Tan(k * 0.5 * Math.PI / 180);
            Oleta.Tosi(Math.Abs(suhde - 1.3) < 1e-9, "mittakaava 1,3 ×");
            Oleta.Tosi(IssKuvakulma.KenttaZoomilla(80, 0) == 80, "virheellinen zoom: ennallaan");
            Oleta.Tosi(Math.Abs(IssKuvakulma.IkkunanKentta - IssKuvakulma.KenttaZoomilla(80, IssKuvakulma.LasiZoom)) < 1e-9, "oletus");
        }

        [Testi] static void SeurantaOnIssinTakanaJaYlla()
        {
            var k = IssKuvakulma.Seuranta(Iss);
            var s = Llh(Silma(k));
            Oleta.Tosi(s.h > 420_000 + 600_000, $"silmä ISS:n yllä: {s.h / 1000:0} km");
            // Silmä on ISS:n takana: suunta ISS:stä silmään on radan vastasuunta.
            double taakse = IssKuvakulma.Suunta(Iss.Paikka.Lat, Iss.Paikka.Lon, s.lat, s.lon);
            Oleta.Tosi(Math.Abs(((taakse - (Iss.Suuntima + 180)) % 360 + 540) % 360 - 180) < 1, $"takana: {taakse:0.0}°");
        }

        [Testi] static void KatseOsuuMaahanMatalallakinKulmalla()
        {
            var k = IssKuvakulma.Ikkuna(Iss, 5);   // horisontti 20,3° → rajataan 21,3°:een
            Oleta.Tosi(double.IsFinite(k.EtaisyysM) && k.EtaisyysM > 0 && k.Kallistus < 90, "kelvollinen: " + k);
        }

        [Testi] static void SekoitusLyhintaTieta()
        {
            var a = new Kuvakulma(0, 170, 10_000_000, 0, 350);
            var b = new Kuvakulma(0, -170, 1_000_000, 50, 10, 400_000);
            var m = IssKuvakulma.Sekoita(a, b, 0.5);
            Oleta.Tosi(Math.Abs(Math.Abs(m.Lon) - 180) < 0.01, "päivämääräraja ylitetään lyhintä tietä: " + m);
            Oleta.Tosi(m.Suuntima < 0.01 || m.Suuntima > 359.99, "suuntima 350 → 10 nollan kautta: " + m);
            Oleta.Tosi(Math.Abs(m.EtaisyysM - Math.Sqrt(1e7 * 1e6)) < 1, "etäisyys logaritmisesti");
            Oleta.Sama(25.0, m.Kallistus);
            Oleta.Sama(200_000.0, m.KatseKorkeusM);
            Oleta.Sama(a.EtaisyysM, IssKuvakulma.Sekoita(a, b, 0).EtaisyysM);
            Oleta.Sama(b.EtaisyysM, IssKuvakulma.Sekoita(a, b, 1).EtaisyysM);
        }

        [Testi] static void TilakoneKierto()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            var k = new IssKyyti();
            var kauko = new Kuvakulma(50, 10, 18_000_000, 0, 0);
            Oleta.Sama(false, k.Paivita(0, Iss, 50, out _, out _, out _), "kaukonäkymässä kamera on pelaajan");
            k.Napauta(kauko, Iss, 50, 0, false);
            Oleta.Sama(KyydinTila.Seuranta, k.Tila);
            Oleta.Tosi(k.Paivita(0, Iss, 50, out var a, out double f, out _), "kyydissä");
            Oleta.Sama(kauko.EtaisyysM, a.EtaisyysM, "siirtymä alkaa kamerasta");
            k.Paivita(IssKyyti.KyytiinS + 0.01, Iss, 50, out a, out f, out _);
            Oleta.Sama(IssKuvakulma.SeurannanEtaisyysM, a.EtaisyysM, "seuranta");
            Oleta.Sama(50.0, f);
            Oleta.Sama(false, k.Siirtyy);

            k.Napauta(a, Iss, f, 3, false);
            Oleta.Sama(KyydinTila.Ikkuna, k.Tila);
            k.Paivita(3 + IssKyyti.IkkunaanS / 2, Iss, 50, out _, out f, out _);
            Oleta.Tosi(f > 50 && f < 80, "kenttäkulma liukuu: " + f);
            k.Paivita(3 + IssKyyti.IkkunaanS + 0.01, Iss, 50, out a, out f, out _);
            Oleta.Sama(IssKuvakulma.IkkunanKentta, f);
            Oleta.Tosi(Math.Abs(a.Kallistus - IssKuvakulma.Ikkuna(Iss).Kallistus) < 1e-9, "ikkuna");

            k.Napauta(a, Iss, f, 5, false);
            Oleta.Sama(KyydinTila.Seuranta, k.Tila, "ikkunasta takaisin seurantaan");

            k.Poistu(18_000_000, 6, false);
            Oleta.Sama(KyydinTila.Kauko, k.Tila);
            Oleta.Tosi(k.Kyydissa, "paluu kesken on vielä kyytiä");
            k.Paivita(6 + IssKyyti.KaukoonS / 2, Iss, 50, out _, out _, out bool valmis);
            Oleta.Sama(false, valmis);
            k.Paivita(6 + IssKyyti.KaukoonS + 0.01, Iss, 50, out a, out f, out valmis);
            Oleta.Sama(true, valmis, "paluu valmis");
            Oleta.Sama(18_000_000.0, a.EtaisyysM);
            Oleta.Sama(0.0, a.Kallistus);
            Oleta.Sama(50.0, f, "kenttäkulma palasi");
            Oleta.Sama(false, k.Kyydissa);
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void VahennettyLiikeOnHeti()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            var k = new IssKyyti();
            k.Napauta(new Kuvakulma(50, 10, 18_000_000, 0, 0), Iss, 50, 0, true);
            k.Paivita(0, Iss, 50, out var a, out _, out _);
            Oleta.Sama(IssKuvakulma.SeurannanEtaisyysM, a.EtaisyysM);
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void KaukaaIssiinPidempiLento()
        {
            var k = new IssKyyti();
            k.Napauta(new Kuvakulma(-50, -170, 18_000_000, 0, 0), Iss, 50, 0, false);
            k.Paivita(IssKyyti.KyytiinS + 0.01, Iss, 50, out var a, out _, out _);
            Oleta.Tosi(a.EtaisyysM > IssKuvakulma.SeurannanEtaisyysM, "pallon toiselta puolelta lento kestää pidempään");
        }

        [Testi] static void KohteenYllaSilmaIssissaJaPitkaObjektiivi()
        {
            var k = IssKuvakulma.KohteenKulma(Iss, 48, 13);   // noin 300 km sivussa
            var s = Llh(Silma(k));
            Oleta.Tosi(Math.Abs(s.h - 420_000) < 500, $"silmän korkeus {s.h:0} m");
            Oleta.Tosi(IssKuvakulma.Kaari(s.lat, s.lon, Iss.Paikka.Lat, Iss.Paikka.Lon) < 0.01, "silmä ISS:n kohdalla");
            Oleta.Sama(48.0, k.Lat);
            Oleta.Tosi(k.Kallistus > 20 && k.Kallistus < 70, $"vinokuva {k.Kallistus:0.0}°");
            double f = IssKuvakulma.KohteenKentta(k.EtaisyysM);
            Oleta.Tosi(f >= 6 && f <= 14, $"kenttäkulma {f:0.0}°");
            var suoraan = IssKuvakulma.KohteenKulma(Iss, Iss.Paikka.Lat, Iss.Paikka.Lon);
            Oleta.Tosi(Math.Abs(suoraan.Kallistus) < 1e-3 && Math.Abs(suoraan.EtaisyysM - 420_000) < 1, "suoraan alla: " + suoraan);
            Oleta.Sama(IssKuvakulma.KohteenKenttaMin, IssKuvakulma.KohteenKentta(5_000_000), "kaukana vähintään 6°");
            Oleta.Sama(IssKuvakulma.KohteenKenttaMax, IssKuvakulma.KohteenKentta(10_000), "lähellä enintään 50°");
        }

        [Testi] static void TilakoneKohteenYlleJaTakaisinSeurantaan()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            var k = new IssKyyti();
            k.Napauta(new Kuvakulma(50, 10, 18_000_000, 0, 0), Iss, 50, 0, true);
            k.Paivita(0, Iss, 50, out var a, out _, out _);
            k.Kohteeseen(new LatLon(48, 13), a, 50, 1, false);
            Oleta.Sama(KyydinTila.Kohde, k.Tila);
            Oleta.Tosi(k.Kohde.HasValue && k.Kohde.Value.Lat == 48, "kohde muistissa");
            k.Paivita(1, Iss, 50, out var alku, out double f0, out _);
            Oleta.Sama(a.EtaisyysM, alku.EtaisyysM, "siirtymä alkaa seurannasta (ei hyppyä)");
            Oleta.Sama(50.0, f0);
            k.Paivita(1 + IssKyyti.KohteeseenS + 0.01, Iss, 50, out var p, out double f, out _);
            Oleta.Tosi(f < 20, "pitkä objektiivi: " + f);
            Oleta.Tosi(Math.Abs(p.Lat - 48) < 1e-9 && Math.Abs(p.Lon - 13) < 1e-9, "katse kohteeseen");
            k.Napauta(p, Iss, f, 3, true);
            Oleta.Sama(KyydinTila.Seuranta, k.Tila, "napautus palaa seurantaan");
            k.Paivita(3, Iss, 50, out var q, out f, out _);
            Oleta.Sama(IssKuvakulma.SeurannanEtaisyysM, q.EtaisyysM);
            Oleta.Sama(50.0, f, "kenttäkulma palasi");
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void CupolanValoAuringonJaVarjonMukaan()
        {
            Oleta.Tosi(CupolanValo.Aurinkoisuus(0.5, 420) > 0.99, "päiväpuoli: auringossa");
            Oleta.Tosi(CupolanValo.Aurinkoisuus(-0.2, 420) > 0.99, "aurinko 12° horisontin alla: ISS yhä auringossa");
            Oleta.Tosi(CupolanValo.Aurinkoisuus(-0.5, 420) < 0.01, "syvällä yöpuolella: varjossa");
            double raja = -Math.Sqrt(1 - Math.Pow(6371.0 / 6791.0, 2));
            Oleta.Tosi(Math.Abs(CupolanValo.Aurinkoisuus(raja, 420) - 0.5) < 0.01, "varjon reuna puolivälissä");
            Oleta.Tosi(CupolanValo.Maavalo(1) > 0.99 && CupolanValo.Maavalo(-1) < 0.16, "maavalo päivä 1, yö 0,15");
            var r = CupolanValo.Ruudulle(0, 3, 4);
            Oleta.Tosi(Math.Abs(r.y - 0.6) < 1e-9 && Math.Abs(r.z - 0.8) < 1e-9, "yksikkövektori");
        }

        [Testi] static void PulunEvaValotYollaJaPaivalla()
        {
            var yo = EvaValo.Valot(0, 0.15);
            var paiva = EvaValo.Valot(1, 1);
            Oleta.Tosi(yo.kasvo > 0.99f && yo.lamput > 0.99f && yo.maa < 0.11f, "yö: kasvovalo ja lamput täysillä, maa hämärä");
            Oleta.Tosi(paiva.kasvo < 0.4f && paiva.lamput < 0.3f && paiva.maa > 0.99f, "päivä: maan valo vahva, omat valot hillityt");
            var h = EvaValo.Valot(0.5, 0.5);
            Oleta.Tosi(h.kasvo < yo.kasvo && h.kasvo > paiva.kasvo, "hämärä välissä");
        }

        // ---- AstronauttiLinssi ----

        sealed class Nakyma : IAstronautinNakyma
        {
            public KyydinTila Tila;
            public double KorkeusKm, NopeusKmh;
            public int Kyyteja;
            public KyydinAika Aika;
            public void Avaus(AvauksenVaihe v) { }
            public void Kohteet(System.Collections.Generic.IReadOnlyList<Havaintokohde> k) { }
            public void Nimet(bool n) { }
            public void Pilvet(double p, double k) { }
            public void Sumu(double p) { }
            public void Tahdet(double p) { }
            public void Iss(LatLon p, System.Collections.Generic.IReadOnlyList<LatLon> k) { }
            public void Kuva(Havaintokohde k, int i) { }
            public void KuvaPois() { }
            public void Pois() { }
            public void Kyyti(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio, KyydinAika aika)
            { Tila = tila; KorkeusKm = korkeusKm; NopeusKmh = nopeusKmh; Aika = aika; Kyyteja++; }
        }

        static (AstronauttiLinssi l, ValeYmparisto y, Nakyma n) Avaa()
        {
            string P(string x) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", x);
            var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(P("satelliitti-data.json"))),
                MiniJson.Jasenna(File.ReadAllText(P("astronaut-kysymykset.json"))));
            var y = new ValeYmparisto();
            var n = new Nakyma();
            var l = new AstronauttiLinssi(a, n);
            l.Avaa(y);
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Valmis;
            Aja(l, y, 2.0);
            return (l, y, n);
        }

        static void Aja(AstronauttiLinssi l, ValeYmparisto y, double s)
        {
            double loppu = y.Kello + s;
            while (y.Kello < loppu) { y.Kello += 1 / 60.0; l.Paivita(); }
        }

        [Testi] static void LinssiKyytiinJaPois()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            var (l, y, n) = Avaa();
            Oleta.Sama(AvauksenVaihe.OtsikkoPois, l.Vaihe);
            l.NapautaIss();
            Aja(l, y, 0.1);
            Oleta.Sama(KyydinTila.Seuranta, n.Tila);
            Oleta.Tosi(y.Kuvaus.HasValue, "kamera kuvaa");
            Oleta.Tosi(n.KorkeusKm > 300 && n.NopeusKmh > 26_000, $"tietorivi {n.KorkeusKm:0} km, {n.NopeusKmh:0} km/h");
            l.Napauta(l.Kohteet[0].Tunnus);
            Oleta.Sama(null, l.AvoinKuva, "havaintopisteet eivät avaudu kyydissä");
            Aja(l, y, 4.5);
            l.NapautaIss();
            Aja(l, y, 1.5);
            Oleta.Sama(KyydinTila.Ikkuna, l.Kyyti);
            Oleta.Sama(IssKuvakulma.IkkunanKentta, y.Kentta.Value);
            l.PoistuKyydista();
            Aja(l, y, 0.1);
            Oleta.Sama(KyydinTila.Kauko, n.Tila, "UI sulkee kehyksen heti paluun alkaessa");
            Aja(l, y, IssKyyti.KaukoonS + 0.1);
            Oleta.Sama(false, l.Kyydissa);
            Oleta.Sama(null, y.Kuvaus, "kuvaus loppui");
            Oleta.Sama(null, y.Kentta, "kenttäkulma palautettu");
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void SulkeminenKyydissaPalauttaaKameran()
        {
            var (l, y, n) = Avaa();
            l.NapautaIss();
            Aja(l, y, 5);
            l.NapautaIss();
            Aja(l, y, 0.5);
            l.Sulje();
            Oleta.Sama(null, y.Kuvaus);
            Oleta.Sama(null, y.Kentta);
            Oleta.Sama(KyydinTila.Kauko, n.Tila);
            Oleta.Sama(false, l.Kyydissa);
        }

        [Testi] static void KuvaAukiEiKyytia()
        {
            var (l, y, n) = Avaa();
            l.Napauta(l.Kohteet[0].Tunnus);
            l.NapautaIss();
            Aja(l, y, 0.1);
            Oleta.Sama(0, n.Kyyteja);
            Oleta.Sama(false, l.Kyydissa);
        }

        [Testi] static void SeurannastaIkkunaanKyydinOmastaAsennosta()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            // Web napauta: kyydissä siirtymä lähtee kyydin viimeisimmästä asennosta (pelikameran näkymästä puuttuu katsekorkeus).
            var (l, y, n) = Avaa();
            l.NapautaIss();
            Aja(l, y, 4.5);
            var ennen = y.Kuvaus.Value;
            Oleta.Tosi(ennen.KatseKorkeusM > 300_000, "seurannassa katse ISS:ään");
            l.NapautaIss();
            Aja(l, y, 1 / 60.0);
            var eka = y.Kuvaus.Value;
            Oleta.Tosi(Math.Abs(eka.KatseKorkeusM - ennen.KatseKorkeusM) < 20_000 && IssKuvakulma.Kaari(eka.Lat, eka.Lon, ennen.Lat, ennen.Lon) < 1,
                $"ei hyppyä: {ennen} → {eka}");
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        // ---- Nopeutus ja "Lennä kohteen ylle" (web iss-kyyti-nakyma.js asetaNopeus ja lennaKohteeseen, commit 891958e17) ----

        const string I1 = "1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927";
        const string I2 = "2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537";
        static DateTime valeUtc;

        /// <summary>Linssi ISS:n 2008-radalla (SGP4) ja valekellolla: IssNyt.Simu lukee valeUtc:tä, joka kulkee y.Kellon mukana.</summary>
        static (AstronauttiLinssi l, ValeYmparisto y, Nakyma n) AvaaValekellolla()
        {
            IssNyt.Nollaa();
            Oleta.Tosi(IssNyt.Aseta(Tle.Jasenna(I1, I2)), "TLE");
            valeUtc = new DateTime(2008, 9, 20, 13, 25, 40, DateTimeKind.Utc);
            IssNyt.Simu = new Simukello(() => valeUtc);
            return Avaa();
        }

        static void AjaUtc(AstronauttiLinssi l, ValeYmparisto y, double s, double askel = 1 / 30.0)
        {
            double loppu = y.Kello + s;
            while (y.Kello < loppu)
            {
                y.Kello += askel;
                valeUtc = valeUtc.AddTicks((long)(askel * TimeSpan.TicksPerSecond));
                l.Paivita();
            }
        }

        static void Palauta()
        {
            IssNyt.Simu = new Simukello(() => DateTime.UtcNow);
            IssNyt.Nollaa();
        }

        [Testi] static void LennaKohteenYlleKelaaJaKaantaaKameran()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            try
            {
                var (l, y, n) = AvaaValekellolla();
                Oleta.Sama("etna gibraltar istanbul italia-yolla zeeland tunis",
                    string.Join(" ", System.Linq.Enumerable.Select(l.YlilennonKohteet, k => k.Tunnus)), "valikon kohteet");
                Oleta.Tosi(!l.LennaKohteeseen("etna").HasValue, "vain kyydissä");
                l.NapautaIss();
                AjaUtc(l, y, 3.5);
                Oleta.Sama(KyydinTila.Seuranta, l.Kyyti);
                Oleta.Tosi(!l.LennaKohteeseen("revontulet").HasValue && l.ViimeisinLento == null, "tuntematon kohde");

                var alku = IssNyt.Kello();
                var yl = l.LennaKohteeseen("etna");
                Oleta.Tosi(yl.HasValue && yl.Value.Hetki > alku && yl.Value.SivuttainKm <= Ylilennot.RajaKm, "ylilento: " + yl);
                Oleta.Tosi(IssNyt.Simu.Kelaa, "kelaus alkoi");
                AjaUtc(l, y, 0.1);
                Oleta.Tosi(n.Aika.Nopeutettu && n.Aika.Kelaa && n.Aika.Valittu == null, "pilleri nopeutettuna, portaassa ei valintaa");
                Oleta.Tosi(n.Aika.Ylilento != null && n.Aika.Ylilento.StartsWith("Etna · Ylilento klo "), n.Aika.Ylilento ?? "rivi puuttuu");
                Oleta.Sama(KyydinTila.Seuranta, l.Kyyti, "kelauksen ajan seuranta");

                // Kelaus kestää enintään 25 s; perillä 1× ja kamera kääntyy kohteeseen 1,2 s:ssa.
                AjaUtc(l, y, Simukello.KelausMaxS + 0.5);
                Oleta.Sama(KyydinTila.Kohde, l.Kyyti, "perillä kohteen yllä");
                var lento = l.ViimeisinLento.Value;
                Oleta.Tosi(lento.Perilla && lento.Kohde.Tunnus == "etna", "perillä");
                double ero = (IssNyt.Kello() - yl.Value.Hetki).TotalSeconds;
                Oleta.Tosi(ero >= 0 && ero < Simukello.KelausMaxS + 1, $"simuloitu aika ylilennon hetkessä (+{ero:0.0} s)");
                AjaUtc(l, y, IssKyyti.KohteeseenS + 0.2);
                Oleta.Tosi(Math.Abs(y.Kuvaus.Value.Lat - 37.751) < 1e-6 && y.Kentta < 20, $"katse Etnaan pitkällä objektiivilla: {y.Kuvaus} {y.Kentta:0.0}°");
                Oleta.Tosi(n.Aika.Nopeutettu && !n.Aika.Kelaa && n.Aika.Valittu == 1, "perillä 1×, ei LIVE");
                Oleta.Tosi(n.Aika.Ylilento.StartsWith("Etna: ISS ") && n.Aika.Ylilento.EndsWith(" km sivussa"), n.Aika.Ylilento);

                // Palaa LIVE: kelaus todelliseen hetkeen (valekello), ylilento unohtuu; kamera jää kohteeseen kuten webissä.
                Oleta.Tosi(l.AsetaNopeus(1), "Palaa LIVE");
                AjaUtc(l, y, Simukello.PaluuMaxS + 0.2);
                Oleta.Tosi(IssNyt.Simu.Live && !n.Aika.Nopeutettu && n.Aika.Ylilento == null, "LIVE");
                Oleta.Sama(valeUtc, IssNyt.Kello());
                l.NapautaIss();
                AjaUtc(l, y, IssKyyti.IkkunaanS + 0.2);
                Oleta.Sama(KyydinTila.Seuranta, l.Kyyti, "napautus kohteen yltä seurantaan");
            }
            finally { Palauta(); }
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void KeskeytettyYlilentoUnohtuu()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            try
            {
                var (l, y, n) = AvaaValekellolla();
                l.NapautaIss();
                AjaUtc(l, y, 3);
                Oleta.Tosi(l.LennaKohteeseen("etna").HasValue, "ylilento");
                AjaUtc(l, y, 1);
                Oleta.Tosi(n.Aika.Ylilento != null, "rivi näkyy");
                // Testikello (astro kyyti kello) keskeyttää kelauksen: ylilento unohtuu eikä kamera käänny.
                IssNyt.Simu.AsetaSiirto(TimeSpan.FromHours(1));
                AjaUtc(l, y, Simukello.KelausMaxS + 1);
                Oleta.Tosi(l.ViimeisinLento == null && n.Aika.Ylilento == null, "rivi pois");
                Oleta.Sama(KyydinTila.Seuranta, l.Kyyti, "ei kohteen ylle");
                Oleta.Sama(valeUtc.AddHours(1), IssNyt.Kello(), "testikellon LIVE");
            }
            finally { Palauta(); }
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void NopeutusPilleriinJaPoistuPalaaLiveksi()
        {
            try
            {
                var (l, y, n) = AvaaValekellolla();
                l.NapautaIss();
                AjaUtc(l, y, 3);
                Oleta.Tosi(!n.Aika.Nopeutettu && n.Aika.Valittu == 1 && n.Aika.Ylilento == null, "LIVE");
                Oleta.Tosi(!l.AsetaNopeus(50), "vain portaan nopeudet");
                Oleta.Tosi(l.AsetaNopeus(100));
                var ennen = IssNyt.Kello();
                AjaUtc(l, y, 1);
                double kulunut = (IssNyt.Kello() - ennen).TotalSeconds;
                Oleta.Tosi(Math.Abs(kulunut - 100) < 5, $"100× sekunnissa noin 100 s: {kulunut:0.0}");
                Oleta.Tosi(n.Aika.Nopeutettu && n.Aika.Valittu == 100 && Math.Abs(n.Aika.Nopeus - 100) < 1e-9, "pilleri 100×");
                int kyyteja = n.Kyyteja;
                AjaUtc(l, y, 1);
                Oleta.Tosi(n.Kyyteja - kyyteja >= 3, $"tietorivi 4 kertaa sekunnissa nopeutettuna ({n.Kyyteja - kyyteja})");

                // ✕: paluulento ja aika LIVE:ksi samassa ajassa.
                l.PoistuKyydista();
                AjaUtc(l, y, IssKyyti.KaukoonS + 0.2);
                Oleta.Sama(false, l.Kyydissa);
                Oleta.Tosi(IssNyt.Simu.Live, "LIVE paluulennon jälkeen");
                Oleta.Sama(valeUtc, IssNyt.Kello());

                // Linssin sulku palauttaa LIVE:n heti.
                l.AsetaNopeus(1000);
                AjaUtc(l, y, 0.5);
                Oleta.Tosi(!IssNyt.Simu.Live, "nopeutettu");
                l.Sulje();
                Oleta.Tosi(IssNyt.Simu.Live && IssNyt.Kello() == valeUtc, "sulku: LIVE heti");
            }
            finally { Palauta(); }
        }

        [Testi] static void CupolaYopuoleltaPaivanvaloonJaLiveTakaisin()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            // Arvioija 1.1 (75), Päätoimittaja 30.9.: Cupola LIVEnä yöpuolella → kelaus päivänvaloon (PÄIVÄ), LIVE palauttaa yön.
            try
            {
                var (l, y, n) = AvaaValekellolla();
                for (int i = 0; i < 240 && !Avaruuskavely.Yopuolella(valeUtc); i++) valeUtc = valeUtc.AddMinutes(1);
                Oleta.Tosi(Avaruuskavely.Yopuolella(valeUtc), "yöpuolen hetki löytyi");
                var yo = valeUtc;
                l.NapautaIss();
                AjaUtc(l, y, 3.5);
                Oleta.Sama(KyydinTila.Seuranta, l.Kyyti);
                Oleta.Tosi(!l.PaivanvaloSiirto, "seurannassa ei siirretä");
                l.NapautaIss();
                Oleta.Sama(KyydinTila.Ikkuna, l.Kyyti);
                Oleta.Tosi(l.PaivanvaloSiirto && IssNyt.Simu.Kelaa, "Cupola: kelaus päivänvaloon");
                AjaUtc(l, y, Simukello.KelausMaxS + 0.5);
                var t = IssNyt.Kello();
                Oleta.Tosi(Avaruuskavely.MaanAurinko(t, IssNyt.Paikka(t)) >= Avaruuskavely.PaivaRaja - 0.01, "perillä päivänvalossa");
                Oleta.Tosi(n.Aika.Paiva && n.Aika.Nopeutettu && !n.Aika.Kelaa, "kilpi PÄIVÄ, PALAA meripihka");
                Oleta.Tosi(l.PaivanvaloSiirto, "siirto jatkuu 1×:llä");
                // LIVE-kytkin: todellinen hetki (yö), rivi kertoo yöpuolesta.
                Oleta.Tosi(l.AsetaNopeus(1), "Palaa LIVE");
                AjaUtc(l, y, Simukello.PaluuMaxS + 0.3);
                Oleta.Tosi(IssNyt.Simu.Live && !l.PaivanvaloSiirto && !n.Aika.Paiva, "LIVE, ei siirtoa");
                Oleta.Tosi(Math.Abs((IssNyt.Kello() - yo).TotalSeconds) < 30, "todellinen hetki");
                Oleta.Sama("ISS on nyt Maan yöpuolella", n.Aika.Ylilento);
                // A/B pois: ei siirtoa.
                AstronauttiLinssi.CupolaPaivanvaloon = false;
                l.NapautaIss(); AjaUtc(l, y, IssKyyti.IkkunaanS + 0.2);
                l.NapautaIss();
                Oleta.Tosi(!l.PaivanvaloSiirto && IssNyt.Simu.Live, "A/B 0: yö sellaisenaan");
            }
            finally { AstronauttiLinssi.CupolaPaivanvaloon = true; Palauta(); }
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }

        [Testi] static void AvaruuskavelyKyydista()
        { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = true;   // kehittäjän seurantapolku (ISS:n rinnalla pois pelistä 2.10.)
            try {
            // Avaruuskävely (29.9.): kyydistä ilmalukkoon, ulos kaiteelle (Ulkona), köysi, kelaus seuraavaan auringonnousuun
            // (≤ 5 s), Pulu, kuva ja NASA-vertailu, takaisin seurantaan. Ylilento ei käynnisty kävelyn aikana.
            try
            {
                var (l, y, n) = AvaaValekellolla();
                Oleta.Tosi(!l.AloitaKavely(), "vain kyydissä");
                l.NapautaIss();
                AjaUtc(l, y, 3.5);
                Oleta.Tosi(l.AloitaKavely(), "kävely alkaa seurannasta");
                Oleta.Sama(KavelynVaihe.Ilmalukko, l.Kavely.Vaihe);
                l.NapautaIss();
                Oleta.Sama(KavelynVaihe.Ulos, l.Kavely.Vaihe, "napautus kulkee tilakoneelle");
                AjaUtc(l, y, 0.1);
                Oleta.Sama(KyydinTila.Ulkona, n.Tila, "näkymä tietää ulkona");
                AjaUtc(l, y, IssKyyti.UlosS);
                Oleta.Sama(KavelynVaihe.Koysi, l.Kavely.Vaihe);
                Oleta.Tosi(Math.Abs(y.Kentta.Value - IssKuvakulma.UlkonaKentta) < 1e-6 && y.Kuvaus.Value.Kallistus < 70, "kaiteella: " + y.Kuvaus);
                Oleta.Tosi(!l.LennaKohteeseen("etna").HasValue, "ei ylilentoa kävelyllä");
                l.NapautaIss();
                Oleta.Sama(KavelynVaihe.Auringonnousu, l.Kavely.Vaihe);
                var nousu = l.Kavely.NousuHetki;
                Oleta.Tosi(nousu.HasValue && nousu.Value > IssNyt.Kello(), "seuraava nousu: " + nousu);
                Oleta.Tosi(Avaruuskavely.Valoisuus(IssNyt.Kello(), IssNyt.Paikka(IssNyt.Kello()), IssNyt.KorkeusKm(IssNyt.Kello())) <= 0
                    || (nousu.Value - IssNyt.Kello()).TotalMinutes > 30, "valossa aloitettu: nousu vasta varjon jälkeen");
                double t0 = y.Kello;
                while (l.Kavely.Vaihe == KavelynVaihe.Auringonnousu && y.Kello - t0 < 20) AjaUtc(l, y, 0.1);
                Oleta.Sama(KavelynVaihe.Pulu, l.Kavely.Vaihe);
                double kesto = y.Kello - t0;
                Oleta.Tosi(kesto <= Simukello.KelausMaxS + Avaruuskavely.EnnenS + Avaruuskavely.JalkeenS + 0.3, $"auringonnousu {kesto:0.0} s");
                Oleta.Tosi(Avaruuskavely.Valoisuus(IssNyt.Kello(), IssNyt.Paikka(IssNyt.Kello()), IssNyt.KorkeusKm(IssNyt.Kello())) > 0, "ISS auringossa");
                Oleta.Tosi(!IssNyt.Simu.Live && Math.Abs(IssNyt.Simu.Kerroin - Avaruuskavely.NousuKerroin) < 1e-9, "aurinko nousee nopeutettuna");
                l.NapautaIss();
                Oleta.Sama(KavelynVaihe.Kuva, l.Kavely.Vaihe);
                Oleta.Tosi(!IssNyt.Simu.Live && IssNyt.Simu.Kerroin == 1, "kuvasta eteenpäin 1× (ei hyppyä LIVE:ksi)");
                l.NapautaIss();
                Oleta.Sama(KavelynVaihe.Vertailu, l.Kavely.Vaihe);
                Oleta.Tosi(l.KavelynVertailu.HasValue, "NASA-vertailukuva valittu");
                l.NapautaIss();
                AjaUtc(l, y, IssKyyti.SisaanS + 0.2);
                Oleta.Sama(KavelynVaihe.Ei, l.Kavely.Vaihe);
                Oleta.Sama(KyydinTila.Seuranta, l.Kyyti, "takaisin seurannassa");
                Oleta.Tosi(Math.Abs(y.Kuvaus.Value.Kallistus - IssKuvakulma.SeurannanKallistus) < 1e-6, "seurannan asento");

                // ✕ kesken kävelyn: kävely pois ja kaukonäkymään.
                Oleta.Tosi(l.AloitaKavely(), "uusi kävely");
                l.NapautaIss();
                AjaUtc(l, y, 1);
                l.PoistuKyydista();
                Oleta.Sama(KavelynVaihe.Ei, l.Kavely.Vaihe);
                AjaUtc(l, y, IssKyyti.KaukoonS + 0.2);
                Oleta.Sama(false, l.Kyydissa);
            }
            finally { Palauta(); }
                    } finally { Matkakirja.Linssit.Iss.IssKyyti.SeurantaKaytossa = false; }
        }
    }
}
