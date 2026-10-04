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

        [Testi] static void KaupunkiVain80KmSateellaMuutenVuoriTaiMaa()
        {
            // Päätoimittaja 4.10.: kaupunki vain 80 km:n säteellä (Poznańin yllä ei "VARSOVA" 280 km:n päästä).
            var a = Pieni();
            Oleta.Sama(("ITALIA", ""), IssSijainti.Hae(a, 38.2, 16.0), "Calabria: pelin kaupungit kaukana, ei paikkaa");
            a.Paikat.Add(new IssSijainti.Paikka("Cosenza", 39.30, 16.25, "ITA", 70000));
            a.Paikat.Add(new IssSijainti.Paikka("Catanzaro", 38.90, 16.60, "ITA", 90000));
            Oleta.Sama(("CATANZARO", "ITALIA"), IssSijainti.Hae(a, 38.8, 16.4), "Natural Earthin lähin paikka");
            a.Kaupungit.Add(new IssSijainti.Paikka("Zürich", 47.37, 8.54, "CHE", 2));
            Oleta.Sama(("ALPIT", "SVEITSI"), IssSijainti.Hae(a, 46.5, 9.7), "ei kaupunkia 80 km:n säteellä → vuoristo");
            Oleta.Sama(("ZÜRICH", "SVEITSI"), IssSijainti.Hae(a, 47.3, 8.4), "kaupunki säteellä");
        }

        [Testi] static void PelinSuomenkielinenNimiPaikalle()
        {
            var a = new IssSijainti.Aineisto { Maa = (lat, lon) => ("POL", "Puola") };
            a.Kaupungit.Add(new IssSijainti.Paikka("Varsova", 52.23, 21.01, "POL", 3));
            a.Paikat.Add(new IssSijainti.Paikka("Warszawa", 52.2519, 20.9981, "POL", 1707000));
            a.Paikat.Add(new IssSijainti.Paikka("Poznań", 52.4058, 16.8999, "POL", 623997));
            Oleta.Sama(("VARSOVA", "PUOLA"), IssSijainti.Hae(a, 52.10, 21.20), "pelin nimi Natural Earthin paikalle");
            Oleta.Sama(("POZNAŃ", "PUOLA"), IssSijainti.Hae(a, 52.30, 16.70), "paikallinen nimi, kun paikka ei ole pelissä");
        }

        [Testi] static void MerialuePolygonistaEiLahimmastaNimipisteesta()
        {
            // Päätoimittaja 4.10. 23.2x: Pohjanmeren keskiosa sai lähimmän nimipisteen SKAGERRAK.
            var a = new IssSijainti.Aineisto { Maa = (lat, lon) => null };
            a.Meret.Add(new IssSijainti.Paikka("Skagerrak", 57.8, 9.0));
            a.Meret.Add(new IssSijainti.Paikka("Pohjanmeri", 54.0, 3.0));
            a.Meret.Add(new IssSijainti.Paikka("Testilahti", 59.5, -1.5));
            a.MeriAlueet.Add(new IssSijainti.MeriAlue("North Sea", "Pohjanmeri", new List<double[]> { new double[] { -4, 51, 9, 51, 9, 62, -4, 62, -4, 51 } }));
            a.MeriAlueet.Add(new IssSijainti.MeriAlue("Test Bay", "", new List<double[]> { new double[] { -2, 59, -1, 59, -1, 60, -2, 60, -2, 59 } }));
            Oleta.Sama(("POHJANMERI", ""), IssSijainti.Hae(a, 58.5, 6.5), "polygoni voittaa lähimmän nimipisteen (Skagerrak 160 km)");
            Oleta.Sama(("TESTILAHTI", ""), IssSijainti.Hae(a, 59.4, -1.6), "pienin alue; nimi pelin nimipisteestä alueen sisällä");
            Oleta.Sama(("SKAGERRAK", ""), IssSijainti.Hae(a, 57.8, 10.5), "alueen ulkopuolella lähin nimipiste kuten ennen");
        }

        [Testi] static void PelkkaMaaKunEiKohdetta()
        {
            var a = Pieni();
            a.Kaupungit.Clear(); a.Vuoret.Clear();
            Oleta.Sama(("ITALIA", ""), IssSijainti.Hae(a, 41.9, 12.5));
            Oleta.Sama(("", ""), IssSijainti.Hae(null, 0, 0), "ei aineistoa");
        }
    
        [Testi] static void PisteenMaaJaSamanMaanKaupunki()
        {
            // Päätoimittaja 4.10.: maa = pisteen maa, kaupunki samasta maasta; rajan takainen Berliini ei kelpaa Puolan pisteessä.
            var a = new IssSijainti.Aineisto
            {
                Maa = (lat, lon) => lon > 14.6 ? ("POL", "Puola") : ("DEU", "Saksa"),
                MaanNimi = iso => iso == "DEU" ? "Saksa" : iso == "POL" ? "Puola" : null,
            };
            a.Kaupungit.Add(new IssSijainti.Paikka("Berliini", 52.52, 13.40, "DEU", 3));
            a.Kaupungit.Add(new IssSijainti.Paikka("Poznań", 52.41, 16.93, "POL", 1));
            Oleta.Sama(("POZNAŃ", "PUOLA"), IssSijainti.Hae(a, 52.40, 16.60), "Puolan puolelta");
            Oleta.Sama(("BERLIINI", "SAKSA"), IssSijainti.Hae(a, 52.50, 13.50));
            a.Kaupungit.RemoveAt(1);
            Oleta.Sama(("PUOLA", ""), IssSijainti.Hae(a, 52.40, 16.60), "ei saman maan kaupunkia → maa");
        }
    }
}
