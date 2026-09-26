// Elävä kartta (Isoisän muste, 26.9.2026): sisärajat, etäisyysjärjestys, aikajanan ikkunat, kamerapolun jatkuvuus.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class ElavaKarttaTestit
    {
        static ElavaMaakunta Maakunta(string id, params double[] lonLat)
        {
            var r = new LatLon[lonLat.Length / 2];
            for (int i = 0; i < r.Length; i++) r[i] = new LatLon(lonLat[2 * i + 1], lonLat[2 * i]);
            var m = new ElavaMaakunta { Id = id, Nimi = id };
            m.Renkaat.Add(r);
            m.Keskus = Maakuntarajat.Painopiste(r);
            return m;
        }

        // A ja B vierekkäin, C molempien päällä; rajat kohtaavat pisteessä (1, 1).
        static List<ElavaMaakunta> Kolme() => new List<ElavaMaakunta>
        {
            Maakunta("A", 0, 0, 1, 0, 1, 1, 0, 1),
            Maakunta("B", 1, 0, 2, 0, 2, 1, 1, 1),
            Maakunta("C", 0, 1, 1, 1, 2, 1, 2, 2, 0, 2),
        };

        static ElavaKohtaus Kohtaus(List<ElavaMaakunta> m = null) => new ElavaKohtaus(
            new LatLon(0.3, 0.4), m ?? Kolme(),
            new[] { new ElavaJoki("pitkä", new[] { 0.5, 0.2, 0.5, 1.5, 1.5, 1.8 }), new ElavaJoki("lyhyt", new[] { 0.2, 1.2, 0.4, 1.6 }) },
            new[]
            {
                new ElavaNosto("p1", 0.5, 0.5, Kokoluokka.Paakohde), new ElavaNosto("k1", 0.5, 1.5, Kokoluokka.Kohde),
                new ElavaNosto("k2", 1.5, 0.5, Kokoluokka.Kohde), new ElavaNosto("s1", 0.2, 0.2, Kokoluokka.Pieni),
            },
            "A", "p1", new[] { new LatLon(0.1, 0.1), new LatLon(0.1, 0.3) },
            new[] { ("X", new LatLon(10, 0)), ("Y", new LatLon(5, 5)), ("A", new LatLon(0.3, 0.4)) }, 20_000_000);

        [Testi] static void SisarajatRisteyksestaKetjuiksi()
        {
            var rajat = Maakuntarajat.Sisarajat(Kolme());
            Oleta.Sama(3, rajat.Count, "A|B, A|C, B|C");
            foreach (var r in rajat)
            {
                Oleta.Sama(2, r.Length, "yksi jana per raja");
                Oleta.Tosi(r.Any(p => Math.Abs(p.Lat - 1) < 1e-9 && Math.Abs(p.Lon - 1) < 1e-9), "kaikki alkavat risteyksestä (1, 1)");
            }
            // Rannikko (yhden maakunnan jana) ei ole sisäraja: kaikkien pisteiden summa ei sisällä kulmia (0,0), (2,2).
            Oleta.Tosi(!rajat.SelectMany(r => r).Any(p => (p.Lat == 0 && p.Lon == 0) || (p.Lat == 2 && p.Lon == 2)), "ulkoreuna pois");
        }

        [Testi] static void SisarajaSaarenYmparillaOnRengas()
        {
            // Saari S kokonaan maakunnan M sisällä (reikä M:ssä): raja on suljettu ketju ilman risteystä.
            var m = new List<ElavaMaakunta>
            {
                Maakunta("S", 1, 1, 2, 1, 2, 2, 1, 2),
                Maakunta("M", 0, 0, 3, 0, 3, 3, 0, 3),
            };
            m[1].Renkaat.Add(new[] { new LatLon(1, 1), new LatLon(1, 2), new LatLon(2, 2), new LatLon(2, 1) });
            var rajat = Maakuntarajat.Sisarajat(m);
            Oleta.Sama(1, rajat.Count);
            Oleta.Sama(5, rajat[0].Length, "suljettu neliö: alku = loppu");
        }

        [Testi] static void MaakunnatSyttyvatEtaisyysjarjestyksessa()
        {
            var k = Kohtaus();
            // Keskus (0,3; 0,4) on A:ssa → A ensin; B:n lähin kärki (lon 1) on lähempänä kuin C:n (lat 1).
            Oleta.Sama("A", k.Maakunnat[k.Jarjestys[0]].Id);
            Oleta.Sama(ElavaKohtaus.MaakunnatAlku, k.Sytytys[k.Jarjestys[0]]);
            for (int i = 1; i < k.Jarjestys.Length; i++)
                Oleta.Tosi(k.Sytytys[k.Jarjestys[i]] > k.Sytytys[k.Jarjestys[i - 1]], "nouseva järjestys");
            foreach (var s in k.Sytytys) Oleta.Tosi(s + ElavaKohtaus.MaakunnanTaytto <= 5.5 + 1e-9, "valmis 5,5 s:iin mennessä");
            Oleta.Tosi(k.MaakunnanPeitto(k.Jarjestys[0], 3.9) == 0 && k.MaakunnanPeitto(k.Jarjestys[0], 5.0) > 0.99, "täyttö 0,4 s");
            Oleta.Tosi(Math.Abs(k.MaakunnanPeitto(0, 8.0) - ElavaKohtaus.AsettunutOsuus) < 1e-9, "asettuu paperiksi");
        }

        [Testi] static void ViivatJaNostotIkkunoissaan()
        {
            var k = Kohtaus();
            Oleta.Sama(3, k.Rajat.Count);
            foreach (var v in k.Rajat.Concat(k.Joet))
            {
                Oleta.Tosi(v.Alku >= ElavaKohtaus.ViivatAlku - 1e-9 && v.Alku + v.Kesto <= ElavaKohtaus.ViivatLoppu + 1e-9, v.Nimi);
                Oleta.Tosi(v.Osuus(v.Alku) == 0 && v.Osuus(v.Alku + v.Kesto + 1e-9) == 1, v.Nimi + " osuus");
            }
            Oleta.Sama("pitkä", k.Joet[0].Nimi, "lähin joki ensin (piste 0,5; 0,2)");
            Oleta.Tosi(k.Joet.Single(j => j.Nimi == "pitkä").Kesto > k.Joet.Single(j => j.Nimi == "lyhyt").Kesto, "pidempi piirtyy hitaammin");
            // Pääkohteet ennen kohteita ennen pieniä, kaikki 5,0–6,5 s.
            var luokat = k.Nostot.OrderBy(n => n.Alku).Select(n => (int)n.Nosto.Luokka).ToList();
            Oleta.Tosi(luokat.SequenceEqual(luokat.OrderBy(x => x)), "luokittain");
            foreach (var n in k.Nostot) Oleta.Tosi(n.Alku >= 5.0 - 1e-9 && n.Alku + n.Kesto <= 6.5 + 1e-9, n.Nosto.Id);
            Oleta.Sama("p1", k.Nostot[k.Napautus].Nosto.Id, "napautus A:n pääkohteeseen");
            Oleta.Sama(2, k.HeraavanNostoja, "A:ssa p1 ja s1");
        }

        [Testi] static void HuntuKuivuuKokonaan()
        {
            var k = Kohtaus();
            Oleta.Sama(ElavaKohtaus.HuntuAlkuKm, k.HuntuSadeKm(0.5));
            double ed = 0;
            for (double t = 0; t <= 4; t += 0.05) { double r = k.HuntuSadeKm(t); Oleta.Tosi(r >= ed - 1e-9, "kasvaa"); ed = r; }
            Oleta.Tosi(k.HuntuSadeKm(ElavaKohtaus.HuntuLoppu) >= k.HuntuMaxKm - 1e-6, "kuivunut 3,5 s:ssa");
            Oleta.Tosi(!k.HuntuNakyy(3.6), "huntu pois");
        }

        [Testi] static void LiukuKiihtyyTasainenJarruttaa()
        {
            Oleta.Tosi(ElavaKayrat.Liuku(0) == 0 && Math.Abs(ElavaKayrat.Liuku(1) - 1) < 1e-12, "päät");
            const double h = 1e-4;
            double N(double t) => (ElavaKayrat.Liuku(t + h) - ElavaKayrat.Liuku(t - h)) / (2 * h);
            Oleta.Tosi(N(h) < 0.02 && N(1 - h) < 0.02, "lepo päissä");
            Oleta.Tosi(Math.Abs(N(0.4) - N(0.6)) < 1e-6, "tasainen keskellä");
            double ed = -1;
            for (int i = 0; i <= 1000; i++) { double v = ElavaKayrat.Liuku(i / 1000.0); Oleta.Tosi(v >= ed, "monotoninen"); ed = v; }
        }

        [Testi] static void KamerapolkuIlmanHyppyja()
        {
            var k = Kohtaus();
            var ed = k.KameranAsento(0);
            for (double t = 1 / 60.0; t <= ElavaKohtaus.Kesto; t += 1 / 60.0)
            {
                var a = k.KameranAsento(t);
                double siirto = Kameramatikka.KulmaAsteina(ed.Kohde, a.Kohde);
                Oleta.Tosi(siirto < 1.5, $"kohde hyppää {siirto:F2}° hetkellä {t:F2}");
                Oleta.Tosi(Math.Abs(Math.Log(a.EtaisyysM / ed.EtaisyysM)) < 0.08, $"etäisyys hyppää hetkellä {t:F2}");
                Oleta.Tosi(Math.Abs(a.Kallistus - ed.Kallistus) < 1.5 && Math.Abs(a.Suuntima - ed.Suuntima) < 1.5, $"kulma hyppää {t:F2}");
                ed = a;
            }
            var loppu = k.KameranAsento(ElavaKohtaus.Kesto);
            Oleta.Tosi(loppu.Kallistus == 0 && loppu.EtaisyysM >= 20_000_000 - 1, "koko pallo lopussa");
        }

        [Testi] static void AurinkoAamustaPaivaanJaTakaisin()
        {
            var k = Kohtaus();
            Oleta.Tosi(Math.Abs(k.Aurinko(0, out double k0) - 315) < 1e-9 && Math.Abs(k0 - 35) < 1e-9, "alku = kartan aurinko");
            Oleta.Tosi(Math.Abs(k.Aurinko(2, out double k1) - ElavaKohtaus.AamuAtsimuutti) < 1e-9 && Math.Abs(k1 - ElavaKohtaus.AamuKorkeus) < 1e-9, "aamu");
            Oleta.Tosi(Math.Abs(k.Aurinko(9, out double k2) - ElavaKohtaus.PaivaAtsimuutti) < 1e-9 && Math.Abs(k2 - ElavaKohtaus.PaivaKorkeus) < 1e-9, "päivä");
            Oleta.Tosi(Math.Abs(k.Aurinko(18.2, out double k3) - 315) < 1e-9 && Math.Abs(k3 - 35) < 1e-9, "palautus");
        }

        [Testi] static void LaivaJaValot()
        {
            var k = Kohtaus();
            Oleta.Tosi(!k.LaivanTila(11.4).Nakyy && k.LaivanTila(13).Nakyy && !k.LaivanTila(14.6).Nakyy, "hetki ≤ 3 s");
            Oleta.Tosi(k.Savu(13).All(s => s.Ika <= ElavaKohtaus.SavunIka), "savun ikä");
            Oleta.Sama(3, k.Valot.Count);
            Oleta.Tosi(k.Valot[0].Alku < k.Valot[1].Alku && k.Valot[1].Alku < k.Valot[2].Alku, "syttyvät reitin järjestyksessä");
            Oleta.Tosi(Math.Abs(k.Valot[2].Alku - (ElavaKohtaus.ReittiAlku + ElavaKohtaus.ReitinKesto)) < 1e-3, "saapumiskaupunki viimeisenä " + k.Valot[2].Alku + " pituus " + k.Reitti.Pituus);
            Oleta.Tosi(k.ValonVoima(2, 18) == 1, "saapumiskaupunki kirkkain");
        }

        [Testi] static void KreikanAineistoKunnossa()
        {
            Oleta.Sama(62, KreikanAineisto.Nostot.Length);
            Oleta.Sama(12, KreikanAineisto.Nostot.Count(n => n.Luokka == Kokoluokka.Paakohde));
            Oleta.Sama(31, KreikanAineisto.Nostot.Count(n => n.Luokka == Kokoluokka.Kohde));
            Oleta.Sama(19, KreikanAineisto.Nostot.Count(n => n.Luokka == Kokoluokka.Pieni));
            Oleta.Tosi(KreikanAineisto.Nostot.Any(n => n.Id == KreikanAineisto.NapautettavaNosto), "Marathon");
            Oleta.Sama(11, KreikanAineisto.Joet.Length);
            foreach (var j in KreikanAineisto.Joet)
                Oleta.Tosi(j.Pisteet.All(p => p.Lat > 34 && p.Lat < 42 && p.Lon > 19 && p.Lon < 30), j.Nimi);
        }

        static ElavaKohtaus Saapuminen() => new ElavaKohtaus(
            new LatLon(0.3, 0.4), Kolme(),
            new[] { new ElavaJoki("pitkä", new[] { 0.5, 0.2, 0.5, 1.5, 1.5, 1.8 }) },
            new[] { new ElavaNosto("p1", 0.5, 0.5, Kokoluokka.Paakohde), new ElavaNosto("s1", 0.2, 0.2, Kokoluokka.Pieni) },
            null, null, null, null, 0, 315, 35, ElavaProfiili.Saapuminen);

        [Testi] static void SaapuminenAlleViidenSekunnin()
        {
            var k = Saapuminen();
            Oleta.Tosi(k.KestoS <= 5.0, "≤ 5 s (Raamattu ELÄVÄ KARTTA)");
            var P = ElavaProfiili.Saapuminen;
            foreach (var v in k.Rajat.Concat(k.Joet)) Oleta.Tosi(v.Alku >= P.ViivatAlku - 1e-9 && v.Alku + v.Kesto <= P.ViivatLoppu + 1e-9, v.Nimi);
            foreach (var s in k.Sytytys) Oleta.Tosi(s + P.MaakunnanTaytto <= P.LuovutusAlku, "maakunnat ennen luovutusta");
            foreach (var n in k.Nostot) Oleta.Tosi(n.Alku + n.Kesto <= P.LuovutusAlku, "nostot ennen luovutusta");
            Oleta.Tosi(k.HuntuSadeKm(P.HuntuLoppu) >= k.HuntuMaxKm - 1e-6 && !k.HuntuNakyy(1.7), "huntu kuivunut 1,6 s:ssa");
            Oleta.Tosi(k.KerrostenPeitto(4.0) == 1 && k.KerrostenPeitto(k.KestoS) < 1e-9, "luovutus pysyville kerroksille");
            Oleta.Tosi(k.Asettuminen(4.0) == 0, "saapumisessa ei asetuta paperiksi");
            Oleta.Sama(-1, k.Heraava, "ei herätystä saapuessa");
            Oleta.Tosi(!k.LaivanTila(2).Nakyy && k.Valot.Count == 0, "ei laivaa eikä valoja");
        }

        [Testi] static void SaapumisenAurinkoPalaaKartanValoon()
        {
            var k = Saapuminen();
            Oleta.Tosi(Math.Abs(k.Aurinko(0, out double e0) - 315) < 1e-9 && Math.Abs(e0 - 35) < 1e-9, "alku");
            Oleta.Tosi(Math.Abs(k.Aurinko(0.8, out double e1) - 285) < 1e-9 && Math.Abs(e1 - 12) < 1e-9, "matala 30° vastapäivään");
            Oleta.Tosi(Math.Abs(k.Aurinko(4.5, out double e2) - 315) < 1e-9 && Math.Abs(e2 - 35) < 1e-9, "kartan valo lopussa");
            double ed = k.Aurinko(0, out _);
            for (double t = 0.02; t <= 4.8; t += 0.02) { double a = k.Aurinko(t, out _); Oleta.Tosi(Math.Abs(((a - ed) % 360 + 540) % 360 - 180) < 3, "ei hyppyä " + t); ed = a; }
        }

        [Testi] static void JoetGeoJsonistaPaauomat()
        {
            string json = "{\"type\":\"FeatureCollection\",\"features\":[" +
                "{\"type\":\"Feature\",\"properties\":{\"jarjestys\":7,\"valuma_km2\":50000},\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[22.1,40.1],[22.2,40.2],[22.3,40.3]]}}," +
                "{\"type\":\"Feature\",\"properties\":{\"jarjestys\":6,\"valuma_km2\":9000},\"geometry\":{\"type\":\"MultiLineString\",\"coordinates\":[[[21,39],[21.1,39.1]],[[21.5,39.5],[21.6,39.6]]]}}," +
                "{\"type\":\"Feature\",\"properties\":{\"jarjestys\":4,\"valuma_km2\":800},\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[23,38],[23.1,38.1]]}}]}";
            var j = ElavaAineisto.JoetGeoJsonista(json);
            Oleta.Sama(3, j.Count, "Strahler 7 ja 6 (kaksi osaa), ei 4");
            Oleta.Tosi(j[0].Pisteet.Length == 3 && Math.Abs(j[0].Pisteet[0].Lat - 40.1) < 1e-9 && Math.Abs(j[0].Pisteet[0].Lon - 22.1) < 1e-9, "[lon, lat] → LatLon");
        }

        [Testi] static void NostotKarttavaloista()
        {
            string json = "{\"alkiot\":[" +
                "{\"id\":\"a\",\"lat\":38,\"lon\":23,\"maa\":\"GRC\",\"kokoluokka\":\"paakohde\"}," +
                "{\"id\":\"b\",\"lat\":39,\"lon\":22,\"maa\":\"GRC\",\"taso\":3}," +
                "{\"id\":\"c\",\"lat\":39,\"lon\":22,\"maa\":\"GRC\",\"salaisuus\":true}," +
                "{\"id\":\"d\",\"lat\":39,\"lon\":22,\"maa\":\"GRC\",\"paakartalla\":false}," +
                "{\"id\":\"e\",\"lat\":48,\"lon\":2,\"maa\":\"FRA\",\"taso\":1}]}";
            var n = ElavaAineisto.NostotKarttavaloista(json, "GRC");
            Oleta.Sama(2, n.Count, "salaisuus, sivukartta ja muu maa pois");
            Oleta.Sama(Kokoluokka.Paakohde, n[0].Luokka);
            Oleta.Sama(Kokoluokka.Pieni, n[1].Luokka, "taso 3 = pieni");
        }

        [Testi] static void HeraysAlleKolmenSekunnin()
        {
            var m = Kolme()[0];
            var h = new Herays(m, new LatLon(0.5, 0.5), 1, 3);
            Oleta.Tosi(Herays.Kesto <= 2.5, "herätys ≤ 2,5 s");
            Oleta.Tosi(h.Tulva(0.05).SadeKm == 0 && h.Tulva(Herays.TulvaAlku + Herays.TulvaKesto).SadeKm >= h.TulvaMaxKm - 1e-6, "tulva kattaa renkaan");
            Oleta.Tosi(h.Tulva(Herays.TulvaAlku + Herays.TulvaKesto + Herays.ValmisKesto).Valmis >= 1 - 1e-9, "saaret lopuksi");
            Oleta.Tosi(h.NimiOsuus(Herays.NimiAlku) == 0 && h.NimiOsuus(Herays.NimiAlku + Herays.NimiKesto) >= 1 - 1e-9, "nimi kirjoittuu");
            Oleta.Tosi(h.Merkit(1.0).Peitto == 0 && h.Merkit(Herays.MerkitAlku + Herays.MerkitKesto).Peitto == 1, "merkit leimautuvat");
            Oleta.Tosi(h.KerrostenPeitto(1.9) == 1 && h.KerrostenPeitto(Herays.Kesto) < 1e-9, "luovutus pysyvälle täytölle");
            Oleta.Tosi(Math.Abs(h.TulvaMaxKm - (Math.Sqrt(0.5) * ElavaKohtaus.KmAsteella + 5)) < 1, "kauimmainen kulma");
        }
    }
}
