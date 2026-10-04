// Cupolan katse vetämällä lasista (omistaja 3.10.2026, IssKatse): oletus ennallaan, suoraan alas, ilmansuunta, rajat,
// inertia, napautuksen ja vedon erottelu, kaksoisnapautuksen paluu, kuvaputken lukitus ja kyydin nollaus.
using System;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class IssKatseTestit
    {
        const double Deg = Math.PI / 180;
        static readonly IssHetki Iss = new IssHetki(new LatLon(50, 10), 420_000, 60);

        /// <summary>Silmän paikka Kuvakulmasta (sama kaava kuin IssKyytiTestit.Silma / PalloKierto.LaskeAsento, pallomalli).</summary>
        static (double lat, double lon, double h) Silma(in Kuvakulma k)
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
            double x = ylos.x * R + s.x * k.EtaisyysM, y = ylos.y * R + s.y * k.EtaisyysM, z = ylos.z * R + s.z * k.EtaisyysM;
            double r = Math.Sqrt(x * x + y * y + z * z);
            return (Math.Asin(z / r) / Deg, Math.Atan2(y, x) / Deg, r - IssKuvakulma.MaanSadeM);
        }

        static void SilmaIssissa(in Kuvakulma k, string mika)
        {
            var e = Silma(k);
            Oleta.Tosi(Math.Abs(e.lat - 50) < 0.01 && Math.Abs(e.lon - 10) < 0.01 && Math.Abs(e.h - 420_000) < 200,
                $"{mika}: silmä ISS:ssä ({e.lat:0.000}, {e.lon:0.000}, {e.h / 1000:0.0} km)");
        }

        [Testi] static void OletusOnEnnallaan()
        {
            var k = new IssKatse();
            double oletus = IssKuvakulma.IkkunanKatse(Iss.KorkeusM);
            k.Askel(0, oletus, IssKatse.Alaraja(Iss.KorkeusM));
            Oleta.Tosi(!k.Muutettu && Math.Abs(k.AlasNyt(oletus) - oletus) < 1e-12, "oletus = rajauksen katse");
            var a = IssKuvakulma.Ikkuna(Iss, k.AlasNyt(oletus), k.Suunta);
            var b = IssKuvakulma.Ikkuna(Iss);
            Oleta.Tosi(a.Lat == b.Lat && a.Lon == b.Lon && a.Kallistus == b.Kallistus && a.Suuntima == b.Suuntima && a.EtaisyysM == b.EtaisyysM,
                "ilman vetoa sama asento kuin ennen");
            Oleta.Tosi(Math.Abs(IssKatse.Alaraja(420_000) - 21.3) < 0.1, $"alaraja 420 km: 21,3° ({IssKatse.Alaraja(420_000):0.00})");
        }

        [Testi] static void SuoraanAlas()
        {
            var k = IssKuvakulma.Ikkuna(Iss, 90, 0);
            Oleta.Tosi(Math.Abs(k.Kallistus) < 1e-6, $"kallistus 0 ({k.Kallistus})");
            Oleta.Tosi(Math.Abs(k.Lat - 50) < 1e-6 && Math.Abs(k.Lon - 10) < 1e-6, "katsekohde alapiste");
            Oleta.Tosi(Math.Abs(k.Suuntima - 60) < 1e-6, $"ruudun ylös maajäljen suuntaan ({k.Suuntima})");
            SilmaIssissa(k, "90°");
            // Jatkuvuus: juuri ennen nadiiria suuntima on sama (ei 0/180-hyppyä).
            var l = IssKuvakulma.Ikkuna(Iss, 89.9, 0);
            Oleta.Tosi(Math.Abs(l.Suuntima - 60) < 0.5, $"89,9°: suuntima {l.Suuntima:0.00}");
            var m = IssKuvakulma.Ikkuna(Iss, 90, 45);
            Oleta.Tosi(Math.Abs(m.Suuntima - 105) < 1e-6, $"90°, suunta +45: {m.Suuntima}");
        }

        [Testi] static void IlmansuuntaKaantaaKatseen()
        {
            foreach (double s in new[] { 90.0, -90, 180, -135 })
            {
                var k = IssKuvakulma.Ikkuna(Iss, 40, s);
                SilmaIssissa(k, $"suunta {s}");
                double suunta = IssKuvakulma.Suunta(50, 10, k.Lat, k.Lon);
                double odotus = ((60 + s) % 360 + 360) % 360;
                Oleta.Tosi(Math.Abs(IssKatse.Kulma(suunta - odotus)) < 0.2, $"suunta {s}: katsekohde suunnassa {suunta:0.0}, odotus {odotus:0.0}");
            }
        }

        static IssKatse Vedettava(double t = 0)
        {
            var k = new IssKatse { AsteitaPisteelle = 0.1 };
            k.Askel(t, 26, IssKatse.Alaraja(420_000));
            return k;
        }

        [Testi] static void VetoKaantaaSormenMukaan()
        {
            var k = Vedettava();
            k.Tartu(0);
            k.VetoPt(0, -100, 0.1);   // veto ylös: maa nousee, katse alemmas
            Oleta.Tosi(Math.Abs(k.Alas - 36) < 1e-9, $"alas 26 + 10 = {k.Alas}");
            double c = Math.Cos(36 * Deg);
            k.VetoPt(50, 0, 0.2);     // veto oikealle: maa oikealle, katse vasemmalle
            Oleta.Tosi(Math.Abs(k.Suunta + 5 / c) < 1e-9, $"suunta −5 / cos 36° = {k.Suunta:0.000}");
            var (da, ds) = IssKatse.PisteetAsteiksi(10, 0, 0.1, 90);
            Oleta.Tosi(da == 0 && Math.Abs(ds + 1 / IssKatse.SuunnanCosMin) < 1e-9, "nadiirissa jakaja rajattu");
        }

        [Testi] static void RajatJaRajaOsumat()
        {
            var k = Vedettava();
            k.Tartu(0);
            k.VetoPt(0, -2000, 0.1);
            Oleta.Tosi(k.Alas == IssKatse.AlasMax && k.Rajalla == "yläraja" && k.RajaOsumat == 1, $"yläraja 90 ({k.Alas}, {k.RajaOsumat})");
            k.VetoPt(0, -100, 0.2);
            Oleta.Tosi(k.RajaOsumat == 1, "rajalla painaminen ei laske uudelleen");
            k.VetoPt(0, 5000, 0.3);
            Oleta.Tosi(Math.Abs(k.Alas - IssKatse.Alaraja(420_000)) < 1e-9 && k.RajaOsumat == 2, $"alaraja ({k.Alas:0.00})");
            k.VetoPt(4000, 0, 0.4);
            Oleta.Tosi(k.Suunta > -180 && k.Suunta <= 180, $"suunta kiertyy 360° ({k.Suunta:0.0})");
        }

        [Testi] static void InertiaHidastuuJaPysahtyy()
        {
            var k = Vedettava();
            k.Tartu(0);
            k.VetoPt(-30, 0, 0.05, 0.05);   // 3° / 0,05 s vasemmalle = ~60 °/s pehmennettynä 0,6:lla
            double s0 = k.Suunta;
            k.Irti(0.05);
            Oleta.Tosi(k.VSuunta > 0 && k.Liikkuu, $"vauhti jää ({k.VSuunta:0.0})");
            double t = 0.05;
            for (int i = 0; i < 200 && k.Liikkuu; i++) { t += 1 / 30.0; k.Askel(t, 26, 21.3); }
            Oleta.Tosi(!k.Liikkuu, "pysähtyy");
            double liuku = k.Suunta - s0;
            Oleta.Tosi(liuku > 3 && liuku < 15, $"liuku ~ vauhti · 0,3 s ({liuku:0.0}°)");
            Oleta.Tosi(t < 2.5, $"pysähtyy alle 2,5 s:ssa ({t:0.00})");

            var v = Vedettava();
            v.Tartu(0);
            v.VetoPt(-30, 0, 0.05, 0.05);
            v.Irti(0.3);   // sormi seisoi 0,25 s ennen irrotusta
            Oleta.Tosi(!v.Liikkuu, "pysähtynyt sormi ei jätä vauhtia");

            var r = Vedettava();
            r.Vahennetty = true;
            r.Tartu(0);
            r.VetoPt(-30, 0, 0.05, 0.05);
            r.Irti(0.05);
            Oleta.Tosi(!r.Liikkuu, "vähennetty liike: ei inertiaa");
        }

        [Testi] static void NapautusJaVetoErotellaan()
        {
            var k = Vedettava();
            k.Paina(0, 200, 300);
            k.Liiku(0.05, 205, 306);   // 7,8 pt: yhä napautus
            Oleta.Tosi(!k.Vetaa && !k.Muutettu, "alle kynnyksen ei vetoa");
            Oleta.Sama(IssKatse.Nosto.Napautus, k.Nosta(0.15), "lyhyt nosto = napautus");
            k.Paina(0.25, 202, 301);
            Oleta.Sama(IssKatse.Nosto.Tupla, k.Nosta(0.3), "toinen 0,3 s:n sisällä = kaksoisnapautus");

            var v = Vedettava();
            v.Paina(0, 200, 300);
            v.Liiku(0.05, 200, 285);   // 15 pt ylös: veto, koko siirto käännetään
            Oleta.Tosi(v.Vetaa && Math.Abs(v.Alas - 27.5) < 1e-9, $"kynnyksen yli: alas 27,5 ({v.Alas})");
            Oleta.Sama(IssKatse.Nosto.Veto, v.Nosta(0.06), "veto ei ole napautus");

            var p = Vedettava();
            p.Paina(0, 200, 300);
            Oleta.Sama(IssKatse.Nosto.Ei, p.Nosta(0.5), "pitkä painallus ei ole napautus");
        }

        [Testi] static void KaksoisnapautusPalauttaaPehmeasti()
        {
            var k = Vedettava();
            k.Aseta(70, 120);
            Oleta.Tosi(k.Muutettu && k.Alas == 70 && k.Suunta == 120, "asetettu");
            k.Paina(1, 200, 300); k.Nosta(1.1);
            k.Paina(1.2, 200, 300); k.Nosta(1.25);
            Oleta.Tosi(k.Palautuu, "paluu alkoi");
            k.Askel(1.55, 26, 21.3);
            Oleta.Tosi(k.Alas < 70 && k.Alas > 26 && k.Suunta < 120 && k.Suunta > 0, $"puolivälissä ({k.Alas:0.0}, {k.Suunta:0.0})");
            k.Askel(1.9, 26, 21.3);
            Oleta.Tosi(!k.Palautuu && !k.Muutettu && k.AlasNyt(26) == 26, "oletuksessa 0,6 s:n jälkeen");

            var r = Vedettava();
            r.Vahennetty = true;
            r.Aseta(70, 120);
            r.Oletukseen(0);
            Oleta.Tosi(!r.Muutettu && !r.Palautuu, "vähennetty liike: heti");
        }

        [Testi] static void KuvaputkiLukitsee()
        {
            var k = Vedettava();
            k.Tartu(0);
            k.VetoPt(-30, 0, 0.05, 0.05);
            k.Irti(0.05);
            k.Lukittu = true;
            double s = k.Suunta;
            k.Askel(0.2, 26, 21.3);
            Oleta.Tosi(k.Suunta == s && !k.Liikkuu, "inertia pysähtyy");
            k.Paina(0.3, 100, 100); k.Liiku(0.4, 100, 0);
            Oleta.Tosi(!k.Vetaa && k.Suunta == s, "veto ohitetaan");
            k.Lukittu = false;
            k.Paina(0.5, 100, 100); k.Liiku(0.6, 100, 50);
            Oleta.Tosi(k.Vetaa, "lukituksen jälkeen veto toimii");
        }

        [Testi] static void KyytiKayttaaJaNollaa()
        {
            var kyyti = new IssKyyti();
            var kauko = IssKuvakulma.Kauko(50, 10, 18_000_000, 0, 0);
            kyyti.Napauta(kauko, Iss, 50, 0, true);
            Oleta.Sama(KyydinTila.Ikkuna, kyyti.Tila, "Cupola");
            kyyti.Paivita(0, Iss, 50, out var a0, out _, out _);
            kyyti.Katse.Aseta(90, 0);
            kyyti.Paivita(0.1, Iss, 50, out var a1, out _, out _);
            Oleta.Tosi(Math.Abs(a1.Kallistus) < 1e-6 && Math.Abs(a0.Kallistus - a1.Kallistus) > 30, $"veto näkyy asennossa ({a0.Kallistus:0.0} → {a1.Kallistus:0.0})");
            SilmaIssissa(a1, "kyyti 90°");
            kyyti.Poistu(10_000_000, 0.2, true);
            Oleta.Tosi(!kyyti.Katse.Muutettu, "poistuminen nollaa katseen");
            kyyti.Katse.Aseta(60, 30);
            kyyti.Nollaa();
            Oleta.Tosi(!kyyti.Katse.Muutettu, "linssin sulku nollaa katseen");
        }
    }
}
