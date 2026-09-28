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

        [Testi] static void IkkunanSilmaOnIssissa()
        {
            var k = IssKuvakulma.Ikkuna(Iss);
            Oleta.Tosi(Math.Abs(k.EtaisyysM - 521_000) < 3_000, "etäisyys noin 521 km: " + k);
            Oleta.Tosi(Math.Abs(k.Kallistus - 37.7) < 0.2, "kallistus noin 37,7°: " + k);
            Oleta.Tosi(Math.Abs(IssKuvakulma.Kaari(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon) - 2.69) < 0.05, "kohde 2,69° edellä");
            var s = Llh(Silma(k));
            Oleta.Tosi(Math.Abs(s.h - 420_000) < 500, $"silmän korkeus {s.h:0} m");
            Oleta.Tosi(IssKuvakulma.Kaari(s.lat, s.lon, Iss.Paikka.Lat, Iss.Paikka.Lon) < 0.01, "silmä ISS:n kohdalla");
            // Kohde on radan suunnassa ISS:stä.
            Oleta.Tosi(Math.Abs(IssKuvakulma.Suunta(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon) - Iss.Suuntima) < 0.01, "radan suuntaan");
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
        {
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
        }

        [Testi] static void VahennettyLiikeOnHeti()
        {
            var k = new IssKyyti();
            k.Napauta(new Kuvakulma(50, 10, 18_000_000, 0, 0), Iss, 50, 0, true);
            k.Paivita(0, Iss, 50, out var a, out _, out _);
            Oleta.Sama(IssKuvakulma.SeurannanEtaisyysM, a.EtaisyysM);
        }

        [Testi] static void KaukaaIssiinPidempiLento()
        {
            var k = new IssKyyti();
            k.Napauta(new Kuvakulma(-50, -170, 18_000_000, 0, 0), Iss, 50, 0, false);
            k.Paivita(IssKyyti.KyytiinS + 0.01, Iss, 50, out var a, out _, out _);
            Oleta.Tosi(a.EtaisyysM > IssKuvakulma.SeurannanEtaisyysM, "pallon toiselta puolelta lento kestää pidempään");
        }

        // ---- AstronauttiLinssi ----

        sealed class Nakyma : IAstronautinNakyma
        {
            public KyydinTila Tila;
            public double KorkeusKm, NopeusKmh;
            public int Kyyteja;
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
            public void Kyyti(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio)
            { Tila = tila; KorkeusKm = korkeusKm; NopeusKmh = nopeusKmh; Kyyteja++; }
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
        {
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
    }
}
