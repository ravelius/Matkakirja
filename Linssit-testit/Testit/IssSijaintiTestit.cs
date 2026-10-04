// ISS-ohjaamon LCD:n sijainti (omistaja 4.10.2026: "ROOMA, ITALIA", lähin kaupunki, meri tai vuori; maa alle).
using System.Collections.Generic;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class IssSijaintiTestit
    {
        static IssSijainti.Aineisto Pieni()
        {
            var a = new IssSijainti.Aineisto
            {
                // Karkea maa-arvio laatikoista (testi): Italia, Sveitsi.
                Maa = (lat, lon) => lat > 36 && lat < 47 && lon > 7 && lon < 18.5 && !(lat > 45.8 && lon < 10.5) ? ("ITA", "Italia")
                    : lat > 45.8 && lat < 47.8 && lon > 6 && lon < 10.5 ? ("CHE", "Sveitsi") : ((string, string)?)null,
            };
            a.Kaupungit.Add(new IssSijainti.Paikka("Rooma", 41.9, 12.5, "ITA", 3));
            a.Kaupungit.Add(new IssSijainti.Paikka("Napoli", 40.85, 14.27, "ITA", 1));
            a.Vuoret.Add(new IssSijainti.Paikka("Alpit", 46.5, 9.8));
            a.Meret.Add(new IssSijainti.Paikka("Tyrrhenanmeri", 40.0, 12.0));
            a.Valtameret.Add(new IssSijainti.Paikka("Atlantin valtameri", 30, -40));
            a.Valtameret.Add(new IssSijainti.Paikka("Intian valtameri", -20, 80));
            return a;
        }

        [Testi] static void KaupunkiJaMaa()
        {
            var a = Pieni();
            Oleta.Sama(("ROOMA", "ITALIA"), IssSijainti.Hae(a, 41.95, 12.6));
            Oleta.Sama(("NAPOLI", "ITALIA"), IssSijainti.Hae(a, 40.8, 14.3), "lähin");
        }

        [Testi] static void VuoriKunKaupunkiKaukana()
        {
            Oleta.Sama(("ALPIT", "SVEITSI"), IssSijainti.Hae(Pieni(), 46.6, 9.0));
        }

        [Testi] static void MeriJaValtameri()
        {
            var a = Pieni();
            Oleta.Sama(("TYRRHENANMERI", ""), IssSijainti.Hae(a, 39.0, 6.5), "nimetty meri (testin maalaatikon ulkopuolella)");
            Oleta.Sama(("INTIAN VALTAMERI", ""), IssSijainti.Hae(a, -30, 70), "muualla lähin valtameri");
        }

        [Testi] static void PelkkaMaaKunEiKohdetta()
        {
            var a = Pieni();
            a.Kaupungit.Clear(); a.Vuoret.Clear();
            Oleta.Sama(("ITALIA", ""), IssSijainti.Hae(a, 41.9, 12.5));
            Oleta.Sama(("", ""), IssSijainti.Hae(null, 0, 0), "ei aineistoa");
        }
    
        [Testi] static void KaupunkiOmanMaansaKanssa()
        {
            // Päätoimittaja 4.10.: alapiste Puolassa, lähin kaupunki Berliini → "BERLIINI / SAKSA", ei "BERLIINI / PUOLA".
            var a = new IssSijainti.Aineisto
            {
                Maa = (lat, lon) => lon > 14.6 ? ("POL", "Puola") : ("DEU", "Saksa"),
                MaanNimi = iso => iso == "DEU" ? "Saksa" : iso == "POL" ? "Puola" : null,
            };
            a.Kaupungit.Add(new IssSijainti.Paikka("Berliini", 52.52, 13.40, "DEU", 3));
            Oleta.Sama(("BERLIINI", "SAKSA"), IssSijainti.Hae(a, 52.40, 15.20), "Puolan puolelta");
            Oleta.Sama(("BERLIINI", "SAKSA"), IssSijainti.Hae(a, 52.50, 13.50));
            Oleta.Sama(("Berliini", "Saksa"), IssSijainti.Nimet(a, 52.40, 15.20), "kuvateksti");
        }
    }
}
