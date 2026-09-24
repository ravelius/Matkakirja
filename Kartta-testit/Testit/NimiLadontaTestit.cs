// Nimikerroksen puhtaat osat (Assets/Matkakirja/Kartta/NimiLadonta.cs): aineiston luku ja merien kaksoiskappaleet,
// tasovalinta, kallistuksen häivytys, tasoon painaminen, aaltomerkki, lukusuunta, yhteinen ruututörmäys ja väistö.
// Koepaketti (valinnainen): NIMET_KOE=<paketin kansio> tai oletus /Users/Shared/Claude/sisalto-koe-2/v8.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Kartta.Testit
{
    static class NimiLadontaTestit
    {
        const string Alue = @"{ ""$skeema"": ""matkakirja-vienti/2/kokoelma"", ""nimi"": ""aluenimet"",
          ""tyylit"": {
            ""meri"": { ""versaali"": true, ""harvennus_em"": 0.32, ""koot_px"": { ""4"": 14, ""8"": 46 }, ""vari"": ""rgba(58, 66, 84, 0.62)"",
                        ""aaltomerkki"": { ""alla_em"": 0.95, ""leveys_osuus"": 0.5, ""kaaria"": 3 } },
            ""nykyalue"": { ""versaali"": true, ""harvennus_em"": 0.32, ""pienkapiteeli"": 0.78,
                        ""varit"": { ""ruoste"": ""rgba(146, 66, 38, 0.60)"", ""ruoste-vahva"": ""rgba(128, 44, 20, 0.95)"" } },
            ""valtameri"": { ""kursiivi"": true, ""versaali"": true, ""harvennus_em"": 0.34, ""vari"": ""rgba(112, 99, 76, 0.62)"" } },
          ""alkiot"": [
            { ""id"": ""valimeri"", ""teksti"": ""VÄLIMERI"", ""luokka"": ""meri"", ""tyyli"": ""meri"", ""kulma"": 0, ""tasot"": [4, 8], ""pallotasot"": [5, 9],
              ""paikat"": { ""4"": { ""lon"": 15, ""lat"": 38.88228, ""korkeus_m"": 44430, ""leveys_m"": 303768 },
                          ""8"": { ""lon"": 15, ""lat"": 38.00002, ""korkeus_m"": 9191, ""leveys_m"": 63141 } } },
            { ""id"": ""grand-est"", ""teksti"": ""Grand Est"", ""luokka"": ""nykyalue"", ""tyyli"": ""nykyalue"", ""iso"": ""FRA"", ""kulma"": 0,
              ""tasot"": [7, 8], ""pallotasot"": [8, 9], ""muste"": ""ruoste-vahva"",
              ""paikat"": { ""7"": { ""lon"": 4.9, ""lat"": 48.95, ""korkeus_m"": 5000, ""leveys_m"": 30000 },
                          ""8"": { ""lon"": 4.9, ""lat"": 48.95, ""korkeus_m"": 3400, ""leveys_m"": 20000 } } },
            { ""id"": ""valtameri-1"", ""teksti"": ""TYYNIMERI"", ""luokka"": ""valtameri"", ""tyyli"": ""valtameri"", ""lon"": -142, ""lat"": 4, ""kulma"": 0,
              ""tasot"": [0, 1, 2, 3], ""pallotasot"": [1, 2, 3, 4], ""korkeus_m"": 163202 },
            { ""id"": ""rikki"", ""teksti"": ""RIKKI"", ""luokka"": ""tuntematon"", ""pallotasot"": [5] },
            { ""id"": ""ei-paikkaa"", ""teksti"": ""TYHJÄ"", ""luokka"": ""maakunta"", ""pallotasot"": [6], ""paikat"": {} }
          ] }";

        const string Meri = @"{ ""nimi"": ""merinimet"",
          ""tyyli"": { ""versaali"": true, ""harvennusEm"": 0.32, ""vari"": ""rgba(58, 66, 84, 0.62)"",
                     ""kirjainkorkeusPx"": { ""4"": 14, ""5"": 18, ""6"": 24, ""7"": 34, ""8"": 46 },
                     ""aaltomerkki"": { ""alaMuutos"": 0.95, ""leveysOsuus"": 0.5, ""jaksot"": 3, ""ohjausOsuus"": 0.55 } },
          ""alkiot"": [
            { ""id"": ""valimeri"", ""nimi"": ""VÄLIMERI"", ""lat"": 38, ""lon"": 15, ""kulma"": 0, ""tasot"": [4, 5, 6, 7, 8] },
            { ""id"": ""itameri"", ""nimi"": ""ITÄMERI"", ""lat"": 58, ""lon"": 19, ""kulma"": 0, ""tasot"": [4, 5, 6, 7, 8] }
          ] }";

        static void Lahella(double odotettu, double saatu, double vara, string viesti) =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) <= vara, $"{viesti}: odotettu {odotettu} ± {vara}, saatu {saatu}");

        // ---- Luku ------------------------------------------------------------------------------------------------

        [Testi] static void LukeeAluenimetJaOhittaaRikkinaiset()
        {
            var n = Nimisto.Lue(Alue, null);
            Oleta.Sama(3, n.Nimet.Count, "valimeri, grand-est, valtameri");
            Oleta.Sama(2, n.Ohitetut.Count, string.Join(" | ", n.Ohitetut));
            var v = n.Nimet.First(r => r.Id == "valimeri");
            Oleta.Tosi(v.Tasot.SequenceEqual(new[] { 5, 9 }), "pallotasot");
            Oleta.Sama(44430.0, v.Paikat[5].KorkeusM, "taso 4 → pallotaso 5");
            Oleta.Sama(3, v.Porras);
            var ge = n.Nimet.First(r => r.Id == "grand-est");
            Oleta.Sama(2, ge.Porras);
            Oleta.Sama("ruoste-vahva", ge.Muste);
            var t = n.Nimet.First(r => r.Id == "valtameri-1");
            Oleta.Sama(4, t.Porras);
            Oleta.Tosi(t.Tasot.All(z => t.Paikat[z].KorkeusM == 163202 && t.Paikat[z].LeveysM > 163202 * 5), "valtameren paikka kaikille tasoille, leveys arvioitu");
            Oleta.Sama(9, n.YlinTaso);
            Oleta.Tosi(n.Tyyli(t).Kursiivi && !n.Tyyli(v).Kursiivi, "kursiivi vain valtamerellä");
            Oleta.Tosi(n.Tyyli(v).Aalto != null && n.Tyyli(v).Aalto.Jaksot == 3, "aaltomerkki");
        }

        [Testi] static void MeriOnVainKerranJaAluenimetVoittaa()
        {
            var n = Nimisto.Lue(Alue, Meri);
            Oleta.Sama(1, n.Nimet.Count(r => r.Id == "valimeri"), "VÄLIMERI kerran");
            Oleta.Tosi(!n.Nimet.First(r => r.Id == "valimeri").Varareitti, "aluenimistä");
            Oleta.Sama(44430.0, n.Nimet.First(r => r.Id == "valimeri").Paikat[5].KorkeusM);
            Oleta.Tosi(n.Nimet.First(r => r.Id == "itameri").Varareitti, "itämeri merinimistä");
            Oleta.Sama(3, n.Aluenimia);
            Oleta.Sama(1, n.Merinimia);
        }

        [Testi] static void VanhaPakettiMerinimetVarareittina()
        {
            var n = Nimisto.Lue(null, Meri);
            Oleta.Sama(2, n.Nimet.Count);
            var v = n.Nimet.First(r => r.Id == "valimeri");
            Oleta.Tosi(v.Tasot.SequenceEqual(new[] { 5, 6, 7, 8, 9 }), "pyramidin 4–8 → pallotasot 5–9");
            // Sama kaava kuin aluenimet.json:n korkeus_m (VÄLIMERI z8 lat 38: 9191 m).
            Lahella(9191, v.Paikat[9].KorkeusM, 30, "korkeus z8");
            Oleta.Tosi(n.Tyyli(v).Aalto != null, "aalto merinimistä");
            var tyhja = Nimisto.Lue(null, null);
            Oleta.Sama(0, tyhja.Nimet.Count, "ei kumpaakaan = tyhjä, ei virhettä");
        }

        [Testi] static void KorkeusJaLeveysVastaavatAineistoa()
        {
            // aluenimet.json v8: VÄLIMERI z4 (lat 38,88) 14 px → 44 430 m, leveys 303 768 m; ITÄMERI z4 (58,0) 35 785 / 179 837.
            Lahella(44430, NimiLadonta.KorkeusMetreina(14, 4, 38.88228), 60, "VÄLIMERI korkeus");
            Lahella(35785, NimiLadonta.KorkeusMetreina(14, 4, 58.00004), 60, "ITÄMERI korkeus");
            Lahella(303768, NimiLadonta.LeveysArvio("VÄLIMERI", 44430, 0.32, 38.88228), 303768 * 0.06, "VÄLIMERI leveys");
            Lahella(179837, NimiLadonta.LeveysArvio("ITÄMERI", 35785, 0.32, 58.00004), 179837 * 0.06, "ITÄMERI leveys");
        }

        [Testi] static void Koepaketti()
        {
            string kansio = Environment.GetEnvironmentVariable("NIMET_KOE") ?? "/Users/Shared/Claude/sisalto-koe-2/v8";
            string a = Path.Combine(kansio, "kokoelmat", "aluenimet.json"), m = Path.Combine(kansio, "kokoelmat", "merinimet.json");
            if (!File.Exists(a)) { Console.WriteLine("  (koepakettia ei ole: " + a + ")"); return; }
            var n = Nimisto.Lue(File.ReadAllText(a), File.Exists(m) ? File.ReadAllText(m) : null);
            Oleta.Sama(0, n.Ohitetut.Count, string.Join(" | ", n.Ohitetut));
            Oleta.Sama(0, n.Merinimia, "kaikki meret aluenimistä");
            Oleta.Sama(n.Nimet.Count, n.Nimet.Select(r => r.Id).Distinct().Count(), "tunnukset uniikit");
            Oleta.Sama(1, n.Nimet.Count(r => r.Teksti == "VÄLIMERI"), "VÄLIMERI kerran");
            Oleta.Tosi(n.Nimet.All(r => r.Tasot.All(z => r.Paikat.ContainsKey(z))), "paikka joka tasolle");
            Oleta.Tosi(n.Nimet.All(r => r.Porras >= 2), "portaat");
            var luokat = n.Nimet.GroupBy(r => r.Luokka).ToDictionary(g => g.Key, g => g.Count());
            Console.WriteLine($"  koepaketti {kansio}: {n.Nimet.Count} nimeä ({string.Join(", ", luokat.Select(p => p.Key + " " + p.Value))}), ylin taso {n.YlinTaso}");
            // Tasoittain enimmäismäärä koko maailmassa (näkyvissä on osa): budjetti 250 riittää.
            for (int z = 1; z <= n.YlinTaso; z++)
            {
                int c = n.Nimet.Count(r => NimiLadonta.RivinTaso(r.Tasot, z, n.YlinTaso) == z);
                Oleta.Tosi(c <= 250, $"taso {z}: {c} nimeä");
            }
        }

        // ---- Tasovalinta ja kallistus ----------------------------------------------------------------------------

        [Testi] static void JatkuvaTasoKamerasta()
        {
            // Nimelliskoko: 30 pt/° = pyramidin z4 = pallotaso 5.
            double fov = 50, ruutu = 834;
            double h = ruutu / (2 * Math.Tan(fov * 0.5 * Math.PI / 180)) * NimiLadonta.MetriaAsteelle / 30.0;
            Lahella(5.0, NimiLadonta.JatkuvaTaso(h, fov, ruutu), 1e-9, "z4");
            Lahella(6.0, NimiLadonta.JatkuvaTaso(h / 2, fov, ruutu), 1e-9, "puolet korkeudesta = taso ylemmäs");
            // Karttasepän arvio (H 1024, fov 60): z4 ≈ 3 300 km → pallotaso 5.
            Lahella(5.0, NimiLadonta.JatkuvaTaso(3.3e6, 60, 1024), 0.05, "raportin z4");
        }

        [Testi] static void TasovalintaSiirrollaJaHystereesilla()
        {
            Oleta.Sama(9, NimiLadonta.ValitseTaso(8.46, -1), "lähin näkymä ~8,5 → taso 9");
            Oleta.Sama(8, NimiLadonta.ValitseTaso(8.30, -1));
            Oleta.Sama(8, NimiLadonta.ValitseTaso(8.45, 8), "hystereesi pitää tason 8");
            Oleta.Sama(9, NimiLadonta.ValitseTaso(8.60, 8), "yli hystereesin");
            Oleta.Sama(9, NimiLadonta.ValitseTaso(8.35, 9), "alaspäin sama");
            Oleta.Sama(8, NimiLadonta.ValitseTaso(8.20, 9));
            Oleta.Sama(0, NimiLadonta.ValitseTaso(-3, -1), "ei negatiivista");
        }

        [Testi] static void RivinTasoOmillaTasoillaJaYlizoomi()
        {
            var t = new[] { 5, 7, 8, 9 };
            Oleta.Sama(-1, NimiLadonta.RivinTaso(t, 6, 9), "aukko");
            Oleta.Sama(7, NimiLadonta.RivinTaso(t, 7, 9));
            Oleta.Sama(9, NimiLadonta.RivinTaso(t, 11, 9), "syvemmällä ylin taso");
            Oleta.Sama(-1, NimiLadonta.RivinTaso(new[] { 1, 2, 3, 4 }, 5, 9), "valtameri ei Z5:ssä");
            Oleta.Sama(-1, NimiLadonta.RivinTaso(new[] { 1, 2, 3, 4 }, 11, 9), "vain aineiston ylin taso ylizoomataan");
            Oleta.Sama(-1, NimiLadonta.RivinTaso(t, 4, 9), "alle alimman");
        }

        [Testi] static void KallistusHaivyttaaYli70Asteen()
        {
            Oleta.Sama(1.0, NimiLadonta.KallistusPeitto(40));
            Oleta.Sama(1.0, NimiLadonta.KallistusPeitto(65));
            Lahella(0.5, NimiLadonta.KallistusPeitto(70), 1e-12, "puolivälissä");
            Oleta.Sama(0.0, NimiLadonta.KallistusPeitto(75));
            Oleta.Sama(0.0, NimiLadonta.KallistusPeitto(89));
        }

        // ---- Tasoon painaminen ja aalto --------------------------------------------------------------------------

        [Testi] static void PinnanTasoOnOrtonormaaliJaKulmaMyotapaivaan()
        {
            var t = NimiLadonta.PinnanTaso(0, 0, 0);
            Lahella(6378137, t.Keski.X, 1e-6, "päiväntasaaja");
            Lahella(1, t.Oikea.Y, 1e-12, "kulma 0 = itään");
            Lahella(1, t.Pysty.Z, 1e-12, "kirjainten yläpää pohjoiseen");
            Lahella(1, t.Ylos.X, 1e-12, "normaali ulos");
            var r = t.Oikea.Ristitulo(t.Pysty);
            Lahella(1, r.Pistetulo(t.Ylos), 1e-12, "oikea × pysty = ylös (tekstin etupuoli ylöspäin)");
            var k = NimiLadonta.PinnanTaso(0, 0, 90);
            Lahella(-1, k.Oikea.Z, 1e-12, "kulma 90 = lukusuunta etelään");
            Lahella(1, k.Pysty.Y, 1e-12, "kirjainten yläpää itään");
            foreach (var (lat, lon, kulma) in new[] { (48.95, 4.9, 0.0), (-33.9, 151.2, 30.0), (78.0, -40.0, -15.0) })
            {
                var q = NimiLadonta.PinnanTaso(lat, lon, kulma);
                Lahella(1, q.Oikea.Pituus, 1e-12, "oikea yksikkö");
                Lahella(1, q.Pysty.Pituus, 1e-12, "pysty yksikkö");
                Lahella(0, q.Oikea.Pistetulo(q.Pysty), 1e-12, "kohtisuorat");
                Lahella(0, q.Oikea.Pistetulo(q.Ylos), 1e-12, "tasossa");
                Lahella(0, q.Pysty.Pistetulo(q.Ylos), 1e-12, "tasossa");
                // Leveä nimi: kulmat ovat pinnan yläpuolella vain (L/2)²/2R.
                var kulmaPiste = q.Piste(150000, 0);
                double nousu = kulmaPiste.Pituus - q.Keski.Pituus;
                Oleta.Tosi(nousu > 0 && nousu < 2500, "tangenttitaso: " + nousu);
            }
        }

        [Testi] static void NimenAlaJaAaltoviiva()
        {
            var aalto = new Aaltomerkki();
            var (x0, y0, x1, y1) = NimiLadonta.NimenAla(1000, 100, null);
            Oleta.Tosi(x0 == -500 && x1 == 500 && y0 == -50 && y1 == 50, "ilman aaltoa");
            var ala = NimiLadonta.NimenAla(1000, 100, aalto);
            Oleta.Tosi(ala.Y0 < -95, "aalto laajentaa alas: " + ala.Y0);
            var v = NimiLadonta.Aaltoviiva(1000, 100, aalto);
            Oleta.Sama(1 + 6 * 6, v.Count, "6 puolijaksoa × 6 näytettä");
            Lahella(-250, v[0].X, 1e-9, "alku −w/2 (w = 0,5 × leveys)");
            Lahella(250, v[v.Count - 1].X, 1e-9, "loppu");
            Lahella(-95, v[0].Y, 1e-9, "0,95 × korkeus keskilinjan alla");
            Oleta.Tosi(v[3].Y > -95, "ensimmäinen puolijakso ylös");
            Oleta.Tosi(v[9].Y < -95, "toinen alas");
            double a = 500.0 / 6, huippu = v.Max(p => p.Y) + 95;
            Lahella(0.5 * 0.55 * a, huippu, 1e-6, "Bézierin huippu = puolet ohjauspisteestä");
            Oleta.Tosi(ala.Y0 <= v.Min(p => p.Y), "ala kattaa aallon");
            Lahella(0.8, NimiLadonta.AallonPaksuus(500, 100, 14, 1), 1e-12, "pieni nimi 0,8");
            Lahella(46 * 7 / 120.0 * 1.2, NimiLadonta.AallonPaksuus(700, 100, 46, 1.2), 1e-12, "leveä nimi");
        }

        [Testi] static void LukusuuntaKaantyyHystereesilla()
        {
            Oleta.Tosi(!NimiLadonta.Kaannetty(false, 10, 0), "oikealle");
            Oleta.Tosi(NimiLadonta.Kaannetty(false, -10, 0), "vasemmalle = käännä");
            Oleta.Tosi(!NimiLadonta.Kaannetty(false, 0, 10), "pystyssä ei käännetä");
            Oleta.Tosi(NimiLadonta.Kaannetty(true, 0, 10), "pystyssä kääntö pysyy");
            Oleta.Tosi(!NimiLadonta.Kaannetty(true, 10, 1), "palautus");
            Oleta.Tosi(NimiLadonta.Kaannetty(true, 0, 0), "nollavektori pitää tilan");
        }

        // ---- Törmäys ja väistö -----------------------------------------------------------------------------------

        [Testi] static void RuutuvarauksetHilassa()
        {
            var v = new Ruutuvaraukset(64);
            v.Aloita(1);
            v.Varaa(new Ruutulaatikko(0, 0, 100, 20));
            Oleta.Tosi(v.Osuu(new Ruutulaatikko(90, 10, 200, 30)), "leikkaa");
            Oleta.Tosi(!v.Osuu(new Ruutulaatikko(100, 0, 200, 20)), "reunan kosketus ei osu");
            Oleta.Tosi(!v.Osuu(new Ruutulaatikko(500, 500, 600, 520)), "kaukana");
            Oleta.Tosi(v.Osuu(new Ruutulaatikko(-30, -10, 5, 5)), "negatiiviset solut");
            v.Varaa(new Ruutulaatikko(-5000, -5000, 5000, 5000));
            Oleta.Tosi(v.Osuu(new Ruutulaatikko(3000, 3000, 3010, 3010)), "suuri laatikko löytyy hilan ulkopuolelta");
            v.Varmista(1);
            Oleta.Sama(2, v.Maara, "sama kehys ei tyhjennä");
            v.Varmista(2);
            Oleta.Sama(0, v.Maara, "uusi kehys tyhjentää");
            Oleta.Tosi(!v.Osuu(new Ruutulaatikko(3000, 3000, 3010, 3010)), "tyhjä");
            Oleta.Tosi(v.YritaVarata(new Ruutulaatikko(0, 0, 10, 10)) && !v.YritaVarata(new Ruutulaatikko(5, 5, 15, 15)), "YritaVarata");
        }

        static NimiLadonta.Ehdokas E(int i, int porras, float x, bool edellinen = false, double koko = 1) => new NimiLadonta.Ehdokas
        {
            Indeksi = i, Porras = porras, Edellinen = edellinen, Koko = koko, Laatikko = new Ruutulaatikko(x, 100, x + 100, 120),
        };

        [Testi] static void VaistoPrioriteettiJarjestyksessa()
        {
            var ruutu = new Ruutulaatikko(0, 0, 1000, 800);
            var v = new Ruutuvaraukset();
            v.Aloita(1);
            v.Varaa(new Ruutulaatikko(600, 90, 650, 130)); // kaupungin nimiö (porras 0) varattu ensin
            var tulos = new List<int>();
            // Valtameri (4) listassa ensin, meri (3) ja maakunta (2) samassa kohdassa: maakunta voittaa.
            var e = new List<NimiLadonta.Ehdokas> { E(0, 4, 50), E(1, 3, 60), E(2, 2, 70), E(3, 2, 580), E(4, 3, 2000), E(5, 2, 300) };
            NimiLadonta.Lado(e, v, ruutu, 2f, tulos);
            Oleta.Tosi(tulos.Contains(2) && !tulos.Contains(1) && !tulos.Contains(0), "maakunta > meri > valtameri");
            Oleta.Tosi(!tulos.Contains(3), "kaupunki voittaa");
            Oleta.Tosi(!tulos.Contains(4), "ruudun ulkopuolinen ohitetaan");
            Oleta.Tosi(tulos.Contains(5), "vapaa paikka");
            Oleta.Sama(2, tulos.Count);
            Oleta.Sama(1 + 2, v.Maara, "ruudun ulkopuolinen ei varaa");
        }

        [Testi] static void VaistoEdellinenJaKokoSamassaPortaassa()
        {
            var ruutu = new Ruutulaatikko(0, 0, 1000, 800);
            var v = new Ruutuvaraukset();
            var tulos = new List<int>();
            v.Aloita(1);
            NimiLadonta.Lado(new List<NimiLadonta.Ehdokas> { E(0, 2, 50, koko: 1), E(1, 2, 60, koko: 2) }, v, ruutu, 0f, tulos);
            Oleta.Tosi(tulos.SequenceEqual(new[] { 1 }), "suurempi ensin");
            v.Aloita(2);
            NimiLadonta.Lado(new List<NimiLadonta.Ehdokas> { E(0, 2, 50, true, 1), E(1, 2, 60, false, 2) }, v, ruutu, 0f, tulos);
            Oleta.Tosi(tulos.SequenceEqual(new[] { 0 }), "edellisessä näkynyt pysyy (ei välkettä)");
            v.Aloita(3);
            NimiLadonta.Lado(new List<NimiLadonta.Ehdokas> { E(0, 3, 50, true), E(1, 2, 60) }, v, ruutu, 0f, tulos);
            Oleta.Tosi(tulos.SequenceEqual(new[] { 1 }), "porras voittaa edellisen");
        }

        [Testi] static void NostonLaatikkoKutenNatiiviUi()
        {
            var l = NimiLadonta.NostonLaatikko(100, 200, "Verdun", 1, 2f);
            Lahella(80, l.X0, 1e-4, "symboli 10 pt vasemmalle");
            Lahella(180, l.Y0, 1e-4, "10 pt alas");
            Lahella(100 + (12 + 2 + 6 * 11 * 0.55f) * 2, l.X1, 1e-3, "nimiö oikealla");
            Lahella(220, l.Y1, 1e-4, "10 pt ylös");
        }

        // ---- Tyyli -----------------------------------------------------------------------------------------------

        [Testi] static void LineaarinenAlfaVastaaWebinSekoitusta()
        {
            // Määritelmä: lineaarinen sekoitus alfalla a' antaa saman luminanssin kuin sRGB-sekoitus alfalla a.
            foreach (var (css, pohja) in new[] { ("rgba(70, 48, 29, 0.58)", NimiLadonta.PohjaMaa), ("rgba(58, 66, 84, 0.62)", NimiLadonta.PohjaMeri),
                                                 ("rgba(128, 44, 20, 0.95)", NimiLadonta.PohjaMaa), ("rgba(112, 99, 76, 0.62)", NimiLadonta.PohjaMeri) })
            {
                var c = NimiLadonta.Rgba(css);
                double a = c[3], a2 = NimiLadonta.LineaarinenAlfa(c, a, pohja);
                Oleta.Tosi(a2 >= a && a2 <= 1, $"{css}: {a} → {a2} välillä [a, 1]");
                double web = NimiLadonta.Luminanssi(a * c[0] + (1 - a) * pohja[0], a * c[1] + (1 - a) * pohja[1], a * c[2] + (1 - a) * pohja[2]);
                double yb = NimiLadonta.Luminanssi(pohja[0], pohja[1], pohja[2]), yc = NimiLadonta.Luminanssi(c[0], c[1], c[2]);
                double natiivi = a2 * yc + (1 - a2) * yb;
                if (a2 < 1) Lahella(web, natiivi, 1e-9, css + " luminanssi");
                Console.WriteLine($"  {css}: a {a:0.00} → a' {a2:0.000}");
            }
            var maakunta = NimiLadonta.LineaarinenAlfa(NimiLadonta.Rgba("rgba(70, 48, 29, 0.58)"), 0.58, NimiLadonta.PohjaMaa);
            Oleta.Tosi(maakunta > 0.75 && maakunta < 0.9, "maakunta tummenee selvästi: " + maakunta);
            double lahes = NimiLadonta.LineaarinenAlfa(new[] { 0.2, 0.2, 0.2 }, 0.99, NimiLadonta.PohjaMaa);
            Oleta.Tosi(lahes >= 0.99 && lahes <= 1.0, "välillä [a, 1]: " + lahes);
            Oleta.Sama(1.0, NimiLadonta.LineaarinenAlfa(new[] { 0.2, 0.2, 0.2 }, 1.0, NimiLadonta.PohjaMaa), "täysi pysyy");
            Oleta.Sama(0.5, NimiLadonta.LineaarinenAlfa(new[] { 0.9, 0.9, 0.9 }, 0.5, new[] { 0.9, 0.9, 0.9 }), "sama väri = ennallaan");
            Oleta.Tosi(NimiLadonta.Pohja("meri") == NimiLadonta.PohjaMeri && NimiLadonta.Pohja("valtameri") == NimiLadonta.PohjaMeri
                && NimiLadonta.Pohja("nykyalue") == NimiLadonta.PohjaMaa, "pohja luokittain");
            Lahella(0.2140, NimiLadonta.Lineaarinen(0.5), 1e-4, "sRGB 0,5 → 0,214");
        }

        [Testi] static void MuotoiluJaVarit()
        {
            Oleta.Sama("G<size=78%>RAND</size> E<size=78%>ST</size>", NimiLadonta.Muotoile("Grand Est", true, 0.78));
            Oleta.Sama("H<size=78%>AUTS</size>-<size=78%>DE</size>-F<size=78%>RANCE</size>", NimiLadonta.Muotoile("Hauts-de-France", true, 0.78));
            Oleta.Sama("ŁÓDŹ".Substring(0, 1) + "<size=78%>ÓDŹ</size>", NimiLadonta.Muotoile("Łódź", true, 0.78));
            Oleta.Sama("SAKSI", NimiLadonta.Muotoile("Saksi", true, 0));
            Oleta.Sama("VÄLIMERI", NimiLadonta.Muotoile("VÄLIMERI", true, 0));
            var c = NimiLadonta.Rgba("rgba(58, 66, 84, 0.62)");
            Lahella(58 / 255.0, c[0], 1e-12, "r");
            Lahella(0.62, c[3], 1e-12, "a");
            var h = NimiLadonta.Rgba("#46331f");
            Lahella(0x46 / 255.0, h[0], 1e-12, "hex");
            Oleta.Tosi(NimiLadonta.Rgba("sininen") == null && NimiLadonta.Rgba(null) == null, "virheellinen");
            var n = Nimisto.Lue(Alue, null);
            var ge = n.Nimet.First(r => r.Id == "grand-est");
            Lahella(0.95, NimiLadonta.Vari(n.Tyyli(ge), ge.Muste)[3], 1e-12, "muste ruoste-vahva");
            Lahella(0.60, NimiLadonta.Vari(n.Tyyli(ge), "tuntematon")[3], 1e-12, "oletus ruoste");
        }
    }
}
