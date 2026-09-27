// Elävä kartta (Isoisän muste, 26.9.2026): sisärajat, etäisyysjärjestys, aikajanan ikkunat, kamerapolun jatkuvuus;
// 27.9.2026: saapuminen on vain täyttö ja luovutus, video ennallaan (sormenjälki).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aanet;
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

        /// <summary>
        /// Kohtauksen koko aikajana sormenjälkenä (Linssiseppä 27.9.2026: saapumisen karsinta ei saa muuttaa videota):
        /// profiili, rakenne (syttymiset, viivat, pudotukset, valot) ja jokaisen vaiheen tila 0,05 s välein 0–kesto neljällä
        /// desimaalilla, FNV-1a 64 -tiivisteenä.
        /// </summary>
        static string Sormenjalki(ElavaKohtaus k)
        {
            var s = new System.Text.StringBuilder();
            string F(double x) => x.ToString("F4", System.Globalization.CultureInfo.InvariantCulture);
            void A(params object[] osat) { foreach (var o in osat) s.Append(o is double d ? F(d) : o?.ToString() ?? "-").Append(' '); }
            var P = k.P;
            A(P.Nimi, P.HuntuAlku, P.HuntuLoppu, P.ViivatAlku, P.ViivatLoppu, P.RajanKesto, P.JoenKestoMin, P.JoenKestoMax, P.JokiVali,
              P.MaakunnatAlku, P.MaakuntaVali, P.MaakuntienKesto, P.MaakunnanTaytto, P.AsettuminenAlku, P.AsettuminenLoppu,
              P.AsettunutOsuus, P.Kesto, P.LuovutusAlku, P.Kamera);
            foreach (var (a, b, c) in P.NostoIkkunat) A(a, b, c);
            foreach (var (t, at, ko) in P.AurinkoPolku(315, 35)) A(t, at, ko);
            A(k.KestoS, k.Heraava, k.Napautus, k.HuntuMaxKm, k.TulvaMaxKm, k.HeraavanNostoja, k.TulvaKeskus.Lat, k.TulvaKeskus.Lon);
            for (int i = 0; i < k.Sytytys.Length; i++) A(k.Jarjestys[i], k.Sytytys[i]);
            foreach (var v in k.Rajat.Concat(k.Joet).Append(k.Laiva).Append(k.Reitti)) A(v.Nimi, v.Alku, v.Kesto, v.Pituus, v.Pisteet.Length);
            foreach (var n in k.Nostot) A(n.Nosto.Id, n.Alku, n.Kesto, n.Maakunta);
            foreach (var v in k.Valot) A(v.Nimi, v.Alku, v.Voima);
            s.Append('\n');
            for (int j = 0; j * 0.05 <= k.KestoS + 1e-9; j++)
            {
                double t = j * 0.05;
                A(t, k.HuntuSadeKm(t), k.Vesiraja(t), k.HuntuNakyy(t), k.KerrostenPeitto(t), k.Asettuminen(t));
                for (int i = 0; i < k.Maakunnat.Count; i++) A(k.MaakunnanPeitto(i, t));
                var (ts, tv) = k.Tulva(t);
                var (rs, rp) = k.NapautusRengas(t);
                var (mm, mp) = k.Merkit(t);
                A(ts, tv, rs, rp, k.NimiOsuus(t), mm, mp);
                for (int i = 0; i < k.Nostot.Count; i++) { var (a, b, c) = k.Nosto(i, t); A(a, b, c); }
                double atsimuutti = k.Aurinko(t, out double korkeus);
                var l = k.LaivanTila(t);
                A(atsimuutti, korkeus, l.Nakyy, l.Paikka.Lat, l.Paikka.Lon, l.Suunta, l.Peitto, k.Hamara(t));
                foreach (var p in k.Savu(t)) A(p.Synty, p.Paikka.Lat, p.Paikka.Lon, p.Suunta, p.Ika);
                for (int i = 0; i < k.Valot.Count; i++) A(k.ValonVoima(i, t));
                var a2 = k.KameranAsento(t);
                A(a2.Lat, a2.Lon, a2.EtaisyysM, a2.Kallistus, a2.Suuntima, k.Vaihe(t));
                s.Append('\n');
            }
            ulong h = 14695981039346656037UL;
            foreach (char c in s.ToString()) { h ^= c; h *= 1099511628211UL; }
            return h.ToString("x16");
        }

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

        // Saapuminen kuten pelissä (ElavaKartta.Valmistele: ei herätystä, laivaa eikä reittiä), mutta joet ja nostot annetaan,
        // jotta nähdään, että profiili itse ohittaa kynäviivat ja pudotukset.
        static ElavaKohtaus Saapuminen(List<ElavaMaakunta> m = null) => new ElavaKohtaus(
            new LatLon(0.3, 0.4), m ?? Kolme(),
            new[] { new ElavaJoki("pitkä", new[] { 0.5, 0.2, 0.5, 1.5, 1.5, 1.8 }) },
            new[] { new ElavaNosto("p1", 0.5, 0.5, Kokoluokka.Paakohde), new ElavaNosto("s1", 0.2, 0.2, Kokoluokka.Pieni) },
            null, null, null, null, 0, 315, 35, ElavaProfiili.Saapuminen);

        /// <summary>
        /// Saapuminen 27.9.2026 (omistaja 08.3x: koko maailma auki, maakunnat heränneinä heti): vain maakuntien täyttö, joka
        /// alkaa 0 s:ssa, ja luovutus pelin pysyviin kerroksiin; kokonaisuus 1,5–1,8 s. Ei huntua, kynäviivoja, pudotuksia,
        /// herätystä (nimi, merkit), laivaa, valoja eikä auringon liikettä.
        /// </summary>
        [Testi] static void SaapuminenVainTayttoJaLuovutus()
        {
            var P = ElavaProfiili.Saapuminen;
            Oleta.Tosi(!P.HuntuKuivuu && !P.ViivatPiirtyvat && !P.NostotPutoavat && !P.AurinkoLiikkuu && !P.Kamera, "vaiheliput: vain täyttö");
            Oleta.Tosi(P.NostoIkkunat == null && double.IsNaN(P.AsettuminenAlku), "ei pudotusikkunoita eikä asettumista");
            Oleta.Sama(0.0, P.MaakunnatAlku, "täyttö alkaa heti");
            Oleta.Tosi(P.MaakunnatAlku + P.MaakuntienKesto + P.MaakunnanTaytto <= P.LuovutusAlku + 1e-9, "täyttö valmis ennen luovutusta");
            Oleta.Tosi(P.Kesto - P.LuovutusAlku > 0.2 && P.Kesto - P.LuovutusAlku <= 0.5, "lyhyt luovutus");

            var k = Saapuminen();
            Oleta.Tosi(k.KestoS >= 1.5 && k.KestoS <= 1.8, $"kesto {k.KestoS} s");
            Oleta.Tosi(k.Rajat.Count == 0 && k.Joet.Count == 0, "ei kynäviivoja (joki annettu)");
            Oleta.Tosi(k.Nostot.Count == 0 && k.Napautus == -1, "ei pudotuksia (nostot annettu)");
            Oleta.Tosi(k.Heraava == -1 && k.Valot.Count == 0 && k.Laiva.Pisteet.Length == 0 && k.Reitti.Pisteet.Length == 0,
                "ei herätystä, laivaa, reittiä eikä valoja");

            // Täyttö: lähin maakunta syttyy 0 s:ssa ja kaikki ovat täysiä luovutuksen alkaessa.
            int eka = k.Jarjestys[0];
            Oleta.Sama("A", k.Maakunnat[eka].Id, "saapumiskaupungin maakunta ensin");
            Oleta.Sama(0.0, k.Sytytys[eka], "ensimmäinen syttyy 0 s:ssa");
            Oleta.Tosi(k.MaakunnanPeitto(eka, 0) == 0 && k.MaakunnanPeitto(eka, 0.05) > 0.2, "täyttö alkaa heti");
            for (int i = 1; i < k.Jarjestys.Length; i++) Oleta.Tosi(k.Sytytys[k.Jarjestys[i]] > k.Sytytys[k.Jarjestys[i - 1]], "etäisyysjärjestys");
            for (int i = 0; i < k.Maakunnat.Count; i++)
            {
                Oleta.Tosi(k.Sytytys[i] + P.MaakunnanTaytto <= P.LuovutusAlku + 1e-9, "täyttö ennen luovutusta");
                Oleta.Sama(1.0, k.MaakunnanPeitto(i, P.LuovutusAlku), "täysi luovutuksessa");
            }

            // Koko aikajana: ei huntua, ei asettumista paperiksi, kartan valo ennallaan; omat kerrokset täysinä luovutukseen.
            for (double t = 0; t <= k.KestoS + 1e-9; t += 0.02)
            {
                Oleta.Tosi(!k.HuntuNakyy(t) && k.Asettuminen(t) == 0, "ei huntua eikä asettumista " + t);
                Oleta.Tosi(Math.Abs(k.Aurinko(t, out double e) - 315) < 1e-9 && Math.Abs(e - 35) < 1e-9, "aurinko paikallaan " + t);
                if (t < P.LuovutusAlku) Oleta.Sama(1.0, k.KerrostenPeitto(t), "ennen luovutusta " + t);
            }
            double puoliva = k.KerrostenPeitto((P.LuovutusAlku + P.Kesto) / 2);
            Oleta.Tosi(puoliva > 0 && puoliva < 1 && k.KerrostenPeitto(k.KestoS) < 1e-9, "luovutus pysyville kerroksille");
            Oleta.Sama("maakunnat syttyvät", k.Vaihe(0));
            Oleta.Sama("luovutus pysyville kerroksille", k.Vaihe(P.LuovutusAlku));
        }

        [Testi] static void SaapumisenTayttoMonellaMaakunnalla()
        {
            // 40 maakuntaa rivissä: syttymisväli kutistuu (0,85 s / n), ja kaikki ovat silti täysiä ennen luovutusta.
            var m = Enumerable.Range(0, 40).Select(i => Maakunta("M" + i, i, 0, i + 1, 0, i + 1, 1, i, 1)).ToList();
            var k = Saapuminen(m);
            var P = ElavaProfiili.Saapuminen;
            Oleta.Sama("M0", k.Maakunnat[k.Jarjestys[0]].Id);
            Oleta.Sama(0.0, k.Sytytys[k.Jarjestys[0]], "ensimmäinen 0 s:ssa");
            Oleta.Tosi(k.Sytytys.Max() < P.MaakunnatAlku + P.MaakuntienKesto, "viimeinen syttyy ennen 0,85 s");
            for (int i = 0; i < m.Count; i++) Oleta.Sama(1.0, k.MaakunnanPeitto(i, P.LuovutusAlku), m[i].Id);
        }

        /// <summary>
        /// Video ennallaan (27.9.2026): kaikki vaiheet päällä ja koko aikajana samana kuin ennen saapumisen karsintaa (sormenjälki
        /// laskettu pohjalla pelikoodari/maailma-auki 7041fd0e ennen muutosta).
        /// </summary>
        [Testi] static void VideoEnnallaan()
        {
            var V = ElavaProfiili.Video;
            Oleta.Tosi(V.HuntuKuivuu && V.ViivatPiirtyvat && V.NostotPutoavat && V.AurinkoLiikkuu && V.Kamera, "videossa kaikki vaiheet");
            Oleta.Tosi(V.Kesto == ElavaKohtaus.Kesto && double.IsPositiveInfinity(V.LuovutusAlku), "18,5 s ilman luovutusta");
            var k = Kohtaus();
            Oleta.Tosi(k.Rajat.Count == 3 && k.Joet.Count == 2 && k.Nostot.Count == 4 && k.Heraava == 0 && k.Valot.Count == 3,
                "videossa rajat, joet, pudotukset, herätys ja valot");
            Oleta.Sama("f33f2b5c8c29ba1f", Sormenjalki(k), "videon aikajana muuttui");
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

        [Testi] static void MusteenJalkiJaLoyto()
        {
            var (p, t) = MusteJalki.Laske(64, 12345);
            Oleta.Tosi(p[32 * 64 + 32] > 0.6, "keskellä mustetta");
            Oleta.Tosi(p[0] == 0 && p[63] == 0, "kulmat tyhjiä");
            Oleta.Tosi(t.Max() > 0.05 && t[32 * 64 + 32] < 0.05, "tummuma reunassa, ei keskellä");
            var (q, _) = MusteJalki.Laske(64, 12345);
            Oleta.Tosi(p.SequenceEqual(q), "sama siemen = sama jälki");
            var (r, _) = MusteJalki.Laske(64, 999);
            Oleta.Tosi(!p.SequenceEqual(r), "eri siemen = eri jälki");
            var h = MusteJalki.Hehku(32);
            Oleta.Tosi(h[16 * 32 + 16] > 0.9 && h[0] < 0.01, "hehku keskellä");
            Oleta.Tosi(Math.Abs(MusteJalki.Loyto(0).Peitto - MusteJalki.JaljenPeitto) < 1e-9 && Math.Abs(MusteJalki.Loyto(0.3).Peitto - 1) < 1e-9, "jäljestä täyteen");
            Oleta.Tosi(Math.Abs(MusteJalki.Loyto(0.3).Mittakaava - 1) < 1e-9 && Enumerable.Range(0, 31).Max(i => MusteJalki.Loyto(i / 100.0).Mittakaava) > 1.0, "jousi yli 1:n");
        }
            const string Reitit1873Json = "{\"alkiot\":[" +
            "{\"id\":\"laiva-a\",\"laji\":\"laiva\",\"nimi\":\"A\",\"viivat\":[[[20,38],[21,38],[22,38],[23,38],[24,38]]]}," +
            "{\"id\":\"rata-b\",\"laji\":\"rautatie\",\"nimi\":null,\"viivat\":[[[2,48],[3,48.5]]]}," +
            "{\"id\":\"tyhja\",\"laji\":\"laiva\",\"viivat\":[[[1,1]]]}]}";

        [Testi] static void Reitit1873Jasennys()
        {
            var r = Reitti1873.Jasenna(Reitit1873Json);
            Oleta.Sama(2, r.Count, "yhden pisteen viiva pois");
            Oleta.Tosi(r[0].Laiva && !r[1].Laiva, "laji");
            Oleta.Tosi(r[0].Viivat[0][0].Lat == 38 && r[0].Viivat[0][0].Lon == 20, "[lon, lat] → LatLon(lat, lon)");
            Oleta.Tosi(r[0].MinLon == 20 && r[0].MaxLon == 24 && r[1].MaxLat == 48.5, "rajauslaatikko");
            Oleta.Sama(0, Reitti1873.Jasenna("{}").Count);
        }

        [Testi] static void HetkiAjastinLykkaa()
        {
            var a = new HetkiAjastin(7, 1000);
            Oleta.Tosi(a.Seuraava >= 1045 && a.Seuraava <= 1120, "ensimmäinen 45–120 s");
            Oleta.Tosi(!a.Tarkista(1040, true), "ei ennen aikaa");
            double s = a.Seuraava;
            Oleta.Tosi(!a.Tarkista(s, false) && Math.Abs(a.Seuraava - (s + HetkiAjastin.LykkaysS)) < 1e-9, "varattu lykkää");
            double t = a.Seuraava;
            Oleta.Tosi(a.Tarkista(t, true), "vapaa käynnistää");
            Oleta.Tosi(a.Seuraava >= t + 120 && a.Seuraava <= t + 300, "seuraava 2–5 min");
        }

        [Testi] static void HetkenValintaNakyvalta()
        {
            var reitit = Reitti1873.Jasenna(Reitit1873Json);
            var keskus = new LatLon(38, 22);
            var satunnainen = new Random(3);
            Oleta.Sama(null, HetkenValinta.Valitse(satunnainen, keskus, 400, reitit, null, pakota: HetkenLaji.Juna), "rata ei näy");
            for (int i = 0; i < 20; i++)
            {
                var h = HetkenValinta.Valitse(satunnainen, keskus, 400, reitit, null, pakota: HetkenLaji.Laiva);
                Oleta.Tosi(h != null && h.Laji == HetkenLaji.Laiva, "laiva näkyvällä reitillä");
                double km = h.Rata.Pituus * ElavaKohtaus.KmAsteella, odotus = Hetki.RadanOsuus(HetkenLaji.Laiva) * 800;
                Oleta.Tosi(km > odotus * 0.5 - 1 && km < odotus + 1, $"radan pituus {km:F1} km (odotus {odotus:F0})");
                Oleta.Tosi(h.Rata.Pisteet.All(p => Math.Abs(p.Lat - 38) < 0.01), "rata reittiä pitkin");
            }
            var maakunnat = Kolme();
            for (int i = 0; i < 30; i++)
            {
                var h = HetkenValinta.Valitse(satunnainen, keskus, 400, reitit, maakunnat, edellinen: HetkenLaji.Laiva);
                Oleta.Tosi(h != null && h.Laji != HetkenLaji.Laiva && h.Laji != HetkenLaji.Juna, "sama laji ei toistu, rata ei näy");
                if (h.Laji == HetkenLaji.Sade)
                {
                    double s = HetkenGeometria.Suuntima(h.Rata.Pisteet[0], h.Rata.Pisteet[h.Rata.Pisteet.Length - 1]);
                    Oleta.Tosi(s >= 55 && s <= 125, $"sade länsituulessa ({s:F0}°)");
                }
            }
        }

        [Testi] static void HetkenPeittoJaGeometria()
        {
            var h = new Hetki(HetkenLaji.Parvi, new[] { new LatLon(40, 20), new LatLon(40, 21) }, "x", 1);
            Oleta.Tosi(Hetki.Kesto <= 3, "hetki ≤ 3 s");
            Oleta.Tosi(h.Peitto(0) == 0 && Math.Abs(h.Peitto(1.5) - 1) < 1e-9 && h.Peitto(Hetki.Kesto) == 0, "sisään ja ulos");
            Oleta.Tosi(Math.Abs(h.Suunta(1.5) - 90) < 1, "itään");
            var q = HetkenGeometria.Kohde(new LatLon(40, 20), 90, 1);
            Oleta.Tosi(Math.Abs(Kameramatikka.KulmaAsteina(new LatLon(40, 20), q) - 1) < 1e-6, "kohde kulman päässä");
            Oleta.Tosi(Math.Abs(HetkenGeometria.Suuntima(new LatLon(40, 20), q) - 90) < 1e-6, "suuntima");
            var takaisin = HetkenValinta.ViivaaPitkin(new[] { new LatLon(0, 0), new LatLon(0, 1), new LatLon(0, 2) }, 2, 1.5, true);
            Oleta.Tosi(takaisin != null && Math.Abs(takaisin[takaisin.Length - 1].Lon - 0.5) < 1e-6, "viivan päästä taaksepäin");
        }
            [Testi] static void HetkienAanetHiljaisia()
        {
            foreach (var nimi in HetkienAanet.Nimet)
            {
                var x = HetkienAanet.Syntetisoi(nimi, 48000, 12345);
                Oleta.Sama(Synteesi.Naytteita(HetkienAanet.KestoS, 48000), x.Length);
                Oleta.Tosi(!x.Any(float.IsNaN), nimi + " ei NaN");
                float huippu = x.Max(v => Math.Abs(v));
                double rms = Math.Sqrt(x.Average(v => (double)v * v));
                Console.WriteLine($"      {nimi}: huippu {huippu:F4}, rms {rms:F4}");
                Oleta.Tosi(huippu > 0.004 && huippu < 0.1, $"{nimi} huippu {huippu:F4}");
                Oleta.Tosi(x[0] == 0 && x[x.Length - 1] == 0, nimi + " alku ja loppu hiljaa");
            }
            var k = HetkienAanet.Syntetisoi(HetkienAanet.Laiva, 48000, 7);
            double Energia(double t0, double t1) { double e = 0; for (int n = (int)(t0 * 48000); n < (int)(t1 * 48000); n++) e += k[n] * k[n]; return e; }
            Oleta.Tosi(Energia(0.36, 0.40) > 3 * Energia(0.30, 0.34), "ensimmäinen lyönti");
            Oleta.Tosi(Energia(0.76, 0.80) > 1.5 * Energia(0.70, 0.74), "toinen lyönti");
        }
    }
}
