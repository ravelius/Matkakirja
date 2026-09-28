// "Lennä kohteen ylle" (web tests/iss-rata.test.mjs "seuraava ylilento" ja tests/iss-kyyti.test.mjs): seuraava ylilento
// SGP4:llä tunnetulle TLE:lle (ISS 2008), raja 500 km, valoisa ohitus, meneillään oleva ohitus ohitetaan; valikon
// Euroopan kohteet webin järjestyksessä; tietorivi nopeutettuna ja ylilennon teksti.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class YlilentoTestit
    {
        // ISS 2008 (Wikipedian TLE-esimerkki, sama kuin IssTestit ja webin testi).
        const string I1 = "1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927";
        const string I2 = "2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537";
        static readonly DateTime Ep = new DateTime(2008, 9, 20, 12, 25, 40, DateTimeKind.Utc);

        static double AurinkoKorkeus(DateTime t, double lat, double lon)
        {
            Aurinko.Alihajapiste(Aika.Jd(t), out double alat, out double alon);
            double r = Math.PI / 180;
            return Math.Asin(Math.Sin(lat * r) * Math.Sin(alat * r) + Math.Cos(lat * r) * Math.Cos(alat * r) * Math.Cos((lon - alon) * r)) / r;
        }

        [Testi] static void SeuraavaYlilentoTunnetullaTlella()
        {
            IssNyt.Nollaa();
            try
            {
                Oleta.Tosi(IssNyt.Aseta(Tle.Jasenna(I1, I2)), "aseta");
                // Kohde suoraan maajäljellä 5 h 7 min epookin jälkeen: löytyy sekunnin tarkkuudella.
                var T = Ep.AddMinutes(5 * 60 + 7);
                var p = IssNyt.Paikka(T);
                var kello = System.Diagnostics.Stopwatch.StartNew();
                var y = Ylilennot.Seuraava(p.Lat, p.Lon, Ep.AddHours(1));
                double ms = kello.Elapsed.TotalMilliseconds;
                Oleta.Tosi(y.HasValue, "ylilento löytyy");
                Oleta.Tosi(Math.Abs((y.Value.Hetki - T).TotalSeconds) < 5, $"aika {(y.Value.Hetki - T).TotalSeconds:0.0} s");
                Oleta.Tosi(y.Value.SivuttainKm < 2, $"sivuttain {y.Value.SivuttainKm:0.00} km");
                Console.WriteLine($"      ylilento {y.Value} haettu {ms:0} ms:ssa (JIT mukana)");

                // Sivussa 200 km: ohitus löytyy, ja sivuttaisetäisyys on noin 200 km.
                double lon200 = p.Lon + 200 / (111.195 * Math.Cos(p.Lat * Math.PI / 180));
                var sivu = Ylilennot.Seuraava(p.Lat, lon200, Ep.AddHours(1));
                Oleta.Tosi(sivu.HasValue && sivu.Value.SivuttainKm > 100 && sivu.Value.SivuttainKm < 210, "200 km sivussa: " + sivu);

                // Kohtisuoraan maajäljestä 200 km: sivuttaisetäisyys noin 200 km (ikkuna vain tämän ohituksen ympärillä).
                double suunta = IssNyt.Suuntima(T);
                IssKuvakulma.Kohde(p.Lat, p.Lon, suunta + 90, 200 / 111.195, out double lat2, out double lon2, out _);
                var kohtisuora = Ylilennot.Seuraava(lat2, lon2, T.AddMinutes(-20), hakuH: 0.6);
                Oleta.Tosi(kohtisuora.HasValue && Math.Abs(kohtisuora.Value.SivuttainKm - 200) < 15
                    && Math.Abs((kohtisuora.Value.Hetki - T).TotalMinutes) < 2, "kohtisuoraan 200 km: " + kohtisuora);
                // Raja: 150 km:n rajalla sama ohitus hylätään; oletusraja 500 km hylkää 700 km:n ohituksen.
                Oleta.Tosi(!Ylilennot.Seuraava(lat2, lon2, T.AddMinutes(-20), rajaKm: 150, hakuH: 0.6).HasValue, "raja 150 km");
                Oleta.Sama(500.0, Ylilennot.RajaKm);
                IssKuvakulma.Kohde(p.Lat, p.Lon, suunta + 90, 700 / 111.195, out double lat7, out double lon7, out _);
                var kaukana = Ylilennot.Seuraava(lat7, lon7, T.AddMinutes(-20), hakuH: 0.6);
                Oleta.Tosi(!kaukana.HasValue, "700 km sivussa ei ole ylilento: " + kaukana);
                var raja600 = Ylilennot.Seuraava(lat7, lon7, T.AddMinutes(-20), rajaKm: 750, hakuH: 0.6);
                Oleta.Tosi(raja600.HasValue && Math.Abs(raja600.Value.SivuttainKm - 700) < 30, "750 km:n rajalla löytyy: " + raja600);

                // Napa-alue: ISS ei lennä yli.
                Oleta.Tosi(!Ylilennot.Seuraava(80, 0, Ep, hakuH: 24).HasValue, "80°N");

                // Vain valoisat ohitukset: aurinko kohteessa yli 10°.
                var va = Ylilennot.Seuraava(p.Lat, p.Lon, Ep.AddHours(1), valoisa: true);
                Oleta.Tosi(va.HasValue, "valoisa ohitus löytyy");
                double korkeus = AurinkoKorkeus(va.Value.Hetki, p.Lat, p.Lon);
                Oleta.Tosi(korkeus > 10, $"aurinko {korkeus:0.0}°");

                // "Seuraava": meneillään oleva ohitus ohitetaan.
                var toinen = Ylilennot.Seuraava(p.Lat, p.Lon, T.AddSeconds(120));
                Oleta.Tosi(toinen.HasValue && toinen.Value.Hetki > T.AddMinutes(30), "seuraava ohitus myöhemmin: " + toinen);
            }
            finally { IssNyt.Nollaa(); }
        }

        [Testi] static void SeuraavaYlilentoHavainnollisellaRadalla()
        {
            // Ilman TLE:tä havainnollinen 51,6°:n rata: ylilento löytyy silti (offline), ja se on rajan sisällä.
            IssNyt.Nollaa();
            var alku = new DateTime(2026, 9, 28, 12, 0, 0, DateTimeKind.Utc);
            var y = Ylilennot.Seuraava(45.44, 12.332, alku);
            Oleta.Tosi(y.HasValue && y.Value.SivuttainKm <= 500 && y.Value.Hetki > alku && y.Value.Hetki < alku.AddHours(48), "Venetsia: " + y);
        }

        static Havaintokohde K(string tunnus, string nimi, double lat, double lon) =>
            new Havaintokohde { Tunnus = tunnus, Nimi = nimi, Lat = lat, Lon = lon };

        /// <summary>Webin valikko commitissa 891958e17 (25 kohdetta, localeCompare 'fi'), tuotantoaineisto 189 kohdetta.</summary>
        static readonly string[] WebinJarjestys =
        {
            "Aletschin jäätikkö", "Ararat", "Dardanellit", "Ebron suisto", "Englannin kanaali yöllä", "Etna", "Geneven järvi",
            "Gibraltarinsalmi", "Iberian niemimaa yöllä", "Istanbul", "Italian saapas yöllä", "Krimin värilliset lagunit", "Lontoo",
            "Moskova", "Pariisi", "Reinin suistosaaret", "Rooma", "Santorini", "Tanskan saaristo", "Tšernobyl", "Tunis yöllä",
            "Valakian tasanko yöllä", "Venetsia", "Vesuvius", "Wien",
        };

        [Testi] static void ValikonKohteetEuroopastaWebinJarjestyksessa()
        {
            // Suomalainen järjestys alustan lokaalista riippumatta: sekoitettu lista lajittuu webin järjestykseen.
            int n = WebinJarjestys.Length;
            var sekoitettu = Enumerable.Range(0, n).Select(i => WebinJarjestys[(i * 7 + 3) % n]).ToList();
            sekoitettu.Sort(Ylilennot.Suomeksi);
            Oleta.Sama(string.Join(" | ", WebinJarjestys), string.Join(" | ", sekoitettu));
            Oleta.Tosi(Ylilennot.VertaaSuomeksi("Tšernobyl", "Tunis") < 0, "š = s");
            Oleta.Tosi(Ylilennot.VertaaSuomeksi("Zürich", "Åland") < 0 && Ylilennot.VertaaSuomeksi("Åland", "Ähtäri") < 0
                && Ylilennot.VertaaSuomeksi("Ähtäri", "Öland") < 0, "å, ä, ö z:n jälkeen");
            Oleta.Tosi(Ylilennot.VertaaSuomeksi("Übersee", "Vaasa") > 0, "ü = y");
            Oleta.Tosi(Ylilennot.VertaaSuomeksi("Tunis yöllä", "Tunisia") < 0, "välilyönti ennen kirjaimia");

            // Rajaus: Euroopan alue ja ISS:n ylilentojen leveysraja 56° (revontulet 60°N pois), järjestys nimen mukaan.
            var kohteet = new List<Havaintokohde>
            {
                K("wien", "Wien", 48.208, 16.373), K("aurora-scandinavia", "Revontulet Skandinavian yllä", 60, 18),
                K("venetsia", "Venetsia", 45.44, 12.332), K("kairo", "Kairo", 30.04, 31.24), K("moskova", "Moskova", 55.751, 37.617),
                K("new-york", "New York", 40.71, -74.0), K("tshernobyl", "Tšernobyl", 51.39, 30.1), K("tuntematon", "Ei paikkaa", double.NaN, 10),
                K("aletsch", "Aletschin jäätikkö", 46.43, 8.02), K("ararat", "Ararat", 39.7, 44.3),
            };
            var l = Ylilennot.Kohteet(kohteet);
            Oleta.Sama("aletsch ararat moskova tshernobyl venetsia wien", string.Join(" ", l.Select(k => k.Tunnus)));

            // Pelin aineisto (testipaketin 64 kohdetta): Euroopan kuusi.
            string P(string x) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", x);
            var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(P("satelliitti-data.json"))));
            Oleta.Sama("etna gibraltar istanbul italia-yolla zeeland tunis", string.Join(" ", Ylilennot.Kohteet(a.Kohteet).Select(k => k.Tunnus)));
        }

        [Testi] static void TietoriviNopeutettunaKerroinIlmanLiveSanaa()
        {
            var r = KyydinTeksti.Tietorivi(421, 27560, false, 100);
            Oleta.Sama(false, r.Live);
            Oleta.Sama("100×", r.Merkki);
            Oleta.Sama("· ISS · 421 km · 27 560 km/h", r.Teksti);
            var l = KyydinTeksti.Tietorivi(418.4, 27583, false);
            Oleta.Tosi(l.Live && l.Merkki == "LIVE", "LIVE");
            Oleta.Sama("· ISS · 418 km · 27 580 km/h", l.Teksti);
            var a = KyydinTeksti.Tietorivi(418, 27583, true);
            Oleta.Tosi(!a.Live && a.Merkki == null, "rata-arviossa ei merkkiä");
            Oleta.Sama("ISS · 418 km · 27 580 km/h · rata-arvio", a.Teksti);
            var an = KyydinTeksti.Tietorivi(418, 27583, true, 10);
            Oleta.Sama("10×", an.Merkki);
            Oleta.Sama("· ISS · 418 km · 27 580 km/h · rata-arvio", an.Teksti);

            Oleta.Sama("1×", KyydinTeksti.NopeudenMerkki(1));
            Oleta.Sama("1×", KyydinTeksti.NopeudenMerkki(1.2));
            Oleta.Sama("10×", KyydinTeksti.NopeudenMerkki(10));
            Oleta.Sama("100×", KyydinTeksti.NopeudenMerkki(99.6));
            Oleta.Sama("870×", KyydinTeksti.NopeudenMerkki(873));
            Oleta.Sama("1 000×", KyydinTeksti.NopeudenMerkki(1000));
            Oleta.Sama("13 000×", KyydinTeksti.NopeudenMerkki(12_960));

            var nyt = new DateTime(2026, 9, 28, 11, 20, 0, DateTimeKind.Utc);
            Oleta.Sama("Ylilento klo 14.32, 3 h 12 min päästä", KyydinTeksti.YlilennonTeksti(nyt.AddMinutes(3 * 60 + 12), nyt, TimeZoneInfo.Utc));
            Oleta.Sama("Ylilento klo 11.27, 7 min päästä", KyydinTeksti.YlilennonTeksti(nyt.AddMinutes(7), nyt, TimeZoneInfo.Utc));
            Oleta.Sama("Ylilento klo 11.20, 0 min päästä", KyydinTeksti.YlilennonTeksti(nyt, nyt.AddSeconds(5), TimeZoneInfo.Utc));

            Oleta.Sama((int?)1, default(KyydinAika).Valittu, "oletus = LIVE");
            Oleta.Sama((int?)100, new KyydinAika(true, false, 100, 100, null).Valittu);
            Oleta.Sama((int?)null, new KyydinAika(true, true, 1, 870, null).Valittu, "kelauksessa ei valintaa");
            Oleta.Sama((int?)1, new KyydinAika(true, false, 1, 1, "x").Valittu, "perillä 1× = Palaa LIVE valittuna kuten webissä");
        }
    }
}
