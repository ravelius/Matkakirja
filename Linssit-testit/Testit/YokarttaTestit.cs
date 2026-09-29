// Yökartta (Linssiseppä 29.9.2026, vain natiivi): iltarajan paikka auringosta ja linssin elinkaari vale-ympäristössä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Yokartta;

namespace Matkakirja.Linssit.Testit
{
    public static class YokarttaTestit
    {
        sealed class ValeNakyma : IYokartanNakyma
        {
            public readonly List<bool> Kutsut = new List<bool>();
            public void Nayta(bool n) => Kutsut.Add(n);
        }

        [Testi] static void IltarajaOnAuringonlaskussa()
        {
            // Päiväntasauksena (22.9.2026 klo 12 UTC) aurinko on zeniitissä noin 0° P, 2° I; päiväntasaajalla ilta on 90° idässä.
            var utc = new DateTime(2026, 9, 22, 12, 0, 0, DateTimeKind.Utc);
            Iss.Aurinko.Alihajapiste(Iss.Aika.Jd(utc), out double sLat, out double sLon);
            var r = YokarttaLinssi.Iltaraja(utc, 0);
            Oleta.Tosi(Math.Abs(((r.Lon - sLon - 90) + 540) % 360 - 180) < 0.5, $"iltaraja {r.Lon:F1} vs aurinko {sLon:F1}");
            // Kesäpäivänseisauksena pohjoisessa ilta on myöhemmin: raja yli 90° idässä 50° leveydellä.
            var kesa = new DateTime(2026, 6, 21, 12, 0, 0, DateTimeKind.Utc);
            Iss.Aurinko.Alihajapiste(Iss.Aika.Jd(kesa), out _, out double kLon);
            var k = YokarttaLinssi.Iltaraja(kesa, 50);
            double ero = ((k.Lon - kLon) + 540) % 360 - 180;
            Oleta.Tosi(ero > 100 && ero < 130, $"kesäilta 50° P: {ero:F1}° auringosta itään");
            // Leveys rajataan ±55°:een.
            Oleta.Sama(55.0, Math.Round(YokarttaLinssi.Iltaraja(kesa, 80).Lat, 6));
        }

        [Testi] static void AvausJaSulku()
        {
            var y = new ValeYmparisto();
            var n = new ValeNakyma();
            var l = new YokarttaLinssi(n);
            var alku = y.Asento;
            l.Avaa(y);
            Oleta.Tosi(l.Auki);
            Oleta.Sama(true, n.Kutsut[0], "yökuori näkyviin");
            Oleta.Sama(false, y.Vale.Nakyvat["laatat"], "reliefi pohjan tilalle");
            Oleta.Sama(false, y.PelikerroksetNakyvissa);
            Oleta.Tosi(Math.Abs(y.Katto.Value - y.KokoPallonKorkeus * YokarttaLinssi.ZoominKauin) < 1);
            Oleta.Sama(y.KokoPallonKorkeus * YokarttaLinssi.AvausOsuus, y.Ajo.Value.Korkeus);
            Oleta.Sama(YokarttaLinssi.AvausAjoS, y.AjonKesto);
            l.Sulje();
            Oleta.Tosi(!l.Auki);
            Oleta.Sama(false, n.Kutsut[1]);
            Oleta.Sama(true, y.Vale.Nakyvat["laatat"]);
            Oleta.Sama(true, y.PelikerroksetNakyvissa);
            Oleta.Tosi(y.Katto == null);
            Oleta.Sama(alku.Korkeus, y.Ajo.Value.Korkeus);
            Oleta.Sama(YokarttaLinssi.PaluuAjoS, y.AjonKesto);
            Oleta.Tosi(Iss.IssNyt.Simu.Live, "sulku palauttaa todellisen ajan");
        }

        [Testi] static void EiAvauskynnysta()
        {
            // Vain kehittäjätilassa (omistaja NATIIVI ENSIN 29.9.: aluksi kehittäjätilassa).
            Oleta.Tosi(!Linssirekisteri.Avauskynnykset.ContainsKey("yokartta"));
            Oleta.Tosi(YokarttaLinssi.YokarttaTiedot.Kesken);
        }
    }
}
