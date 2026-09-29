using System;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class OmaSijaintiTestit
    {
        [Testi] static void MaaTraceRivilta()
        {
            Oleta.Sama("FI", OmaSijainti.LueMaa("fl=12f1\nh=media.matkakirja.app\nip=1.2.3.4\nts=1\nvisit_scheme=https\ncolo=RIX\nloc=FI\ntls=TLSv1.3\n"));
            Oleta.Sama("SE", OmaSijainti.LueMaa("loc=se\r\n"));
            Oleta.Sama(null, OmaSijainti.LueMaa("loc=XX\n"), "tuntematon");
            Oleta.Sama(null, OmaSijainti.LueMaa("loc=T1\n"), "Tor");
            Oleta.Sama(null, OmaSijainti.LueMaa("colo=RIX\n"));
            Oleta.Sama(null, OmaSijainti.LueMaa(null));
        }

        // Laitemittaus 28.9.: Suomi (64,50, 26,29) ja Ruotsi (62,83, 16,75) → "ei ylilentoa 48 tunnin sisällä", koska rata ei
        // ulotu sinne. Haku radan pohjoisimmalle osuudelle samalla pituudella löytää ylilennon (ISS 2008 -TLE kuten YlilentoTestit).
        [Testi] static void PohjolaSaaYlilennon()
        {
            Oleta.Sama(51.0, OmaSijainti.HakuLeveys(64.5));
            Oleta.Sama(-51.0, OmaSijainti.HakuLeveys(-70));
            Oleta.Sama(48.2, OmaSijainti.HakuLeveys(48.2), "radan ulottuvilla ennallaan");
            IssNyt.Nollaa();
            try
            {
                Oleta.Tosi(IssNyt.Aseta(Tle.Jasenna(
                    "1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927",
                    "2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537")), "aseta");
                var alku = new DateTime(2008, 9, 20, 13, 0, 0, DateTimeKind.Utc);
                Oleta.Tosi(!Ylilennot.Seuraava(64.50, 26.29, alku).HasValue, "Suomen keskipiste: ei ylilentoa");
                foreach (var (lat, lon) in new[] { (64.50, 26.29), (62.83, 16.75) })
                {
                    var y = Ylilennot.Seuraava(OmaSijainti.HakuLeveys(lat), lon, alku);
                    Oleta.Tosi(y.HasValue && (y.Value.Hetki - alku).TotalHours < 24, $"ylilento vuorokauden sisällä ({lat}, {lon})");
                    double km = Matkakirja.Linssit.Astronautti.AstronauttiLinssi.SivussaKm(new Matkakirja.Linssit.Astronautti.Havaintokohde { Lat = lat, Lon = lon }, y.Value);
                    Oleta.Tosi(km > 1000 && km < 2300, $"rivi kertoo matkan omaan maahan (horisontin sisällä): {km:0} km");
                }
            }
            finally { IssNyt.Nollaa(); }
        }

        [Testi] static void KatseLyhyesti()
        {
            var (la, lo) = OmaSijainti.Katsepiste(51.0, 26.0, 64.5, 26.29);
            double d = Ylilennot.MaaEtaisyysKm(51.0, 26.0, la, lo);
            Oleta.Tosi(Math.Abs(d - OmaSijainti.KatseKm) < 5, $"katse {OmaSijainti.KatseKm} km: {d:0} km");
            Oleta.Tosi(la > 51 && la < 64.5 && Math.Abs(lo - 26.1) < 0.5, $"kohti Suomea: {la:0.00}, {lo:0.00}");
            Oleta.Sama((45.0, 12.0), OmaSijainti.Katsepiste(45.2, 12.1, 45.0, 12.0), "lähellä kohde itse");
        }

        [Testi] static void ValikonRivi()
        {
            Oleta.Sama("Oma sijainti · Suomi", OmaSijainti.Rivi("Suomi"));
            Oleta.Sama("Oma sijainti", OmaSijainti.Rivi(null));
        }
    }
}
