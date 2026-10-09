// Päätoimittaja 8.10. 07.4x (juna 164 -video): Île de la Citén kortteli sumeana lennon alussa (lähtö 87 %, avauksesta 61 %).
// Lähtö odottaa seuraavan kohteen ja reitin laattoja (≥ LahtoValmis) enintään LahtoOdotusMaxS, ja reitin välinäkymät esiladataan.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class LahtoLaatatTestit
    {
        static OpasKohde K(string id, double lat, double lon) => new OpasKohde { Id = id, Nimi = id, Lat = lat, Lon = lon, KokoM = 60, KestoS = 5 };

        /// <summary>A:ssa puhe loppunut ja B esihaettu; latausaste säädettävissä.</summary>
        static OpasSilmukka AssaBValmiina(Func<double> edistys)
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            s.Vastaus(p[^1].n, K("B", 55.6800, 12.5900));   // ~1,4 km: lento, ei siirtoa
            s.LatausEdistys = edistys;
            s.AaniLoppui();
            return s;
        }

        static double LahtoAika(OpasSilmukka s)
        {
            double t = 0;
            for (int i = 0; i < 400 && s.Vaihe != OpasVaihe.Lentaa; i++) { s.Paivita(0.05, _ => 5); t += 0.05; }
            Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa && s.Nykyinen?.Id == "B", $"lähti B:hen ({s.Vaihe} {s.Nykyinen?.Id})");
            return t;
        }

        [Testi] static void LahtoOdottaaLaattojaEnintaanViisiSekuntia()
        {
            // Valmiit laatat: lähtö tauon jälkeen kuten ennen (LoppuTaukoS ≈ 1 s).
            var v = AssaBValmiina(() => 1.0);
            double tv = LahtoAika(v);
            Oleta.Tosi(tv < 2, $"laatat valmiit: lähtö heti tauon jälkeen ({tv:F2} s)");
            Oleta.Tosi(v.LahtoOdottiS == 0, "ei odotusta");

            // Laatat 87 % (video): lähtö odottaa, kunnes ne valmistuvat.
            double ed = 0.87;
            var o = AssaBValmiina(() => ed);
            for (int i = 0; i < 50; i++) o.Paivita(0.05, _ => 5);   // 2,5 s
            Oleta.Tosi(o.Vaihe == OpasVaihe.Puhuu && o.Nykyinen?.Id == "A", "87 %: odotetaan");
            ed = 0.985;
            double to = LahtoAika(o);
            Oleta.Tosi(to < 0.2, $"≥ 98 %: lähtö heti ({to:F2} s)");
            Oleta.Tosi(o.LahtoOdottiS > 1 && o.LahtoOdottiS < OpasSilmukka.LahtoOdotusMaxS, $"odotus kirjattu ({o.LahtoOdottiS:F1} s)");

            // Laatat eivät valmistu: kierros ei jumitu, lähtö viimeistään LahtoOdotusMaxS normaalin tauon yli.
            var j = AssaBValmiina(() => 0.5);
            double tj = LahtoAika(j);
            Oleta.Tosi(tj > tv + OpasSilmukka.LahtoOdotusMaxS - 0.2 && tj < tv + OpasSilmukka.LahtoOdotusMaxS + 0.3,
                $"aikaraja: {tj:F2} s (tauko {tv:F2} + {OpasSilmukka.LahtoOdotusMaxS} s)");
        }

        [Testi] static void PelaajanOhitusOdottaaEnintaanKaksiSekuntia()
        {
            var v = AssaBValmiina(() => 1.0);
            Oleta.Tosi(v.OhitaKohde(), "ohitus");
            double tv = LahtoAika(v);   // tavallinen tauko (TaukoS)
            var s = AssaBValmiina(() => 0.5);
            Oleta.Tosi(s.OhitaKohde(), "ohitus");
            double t = LahtoAika(s);
            Oleta.Tosi(t <= tv + OpasSilmukka.LahtoPelaajaMaxS + 0.1, $"⏭: laatoille enintään {OpasSilmukka.LahtoPelaajaMaxS} s ({t:F2} s, tauko {tv:F2} s)");
        }

        // Juna 164 -video: kierros alkoi ⏭:llä avauksesta (seuraavaa ei vielä ollut) → 1. lento saa täyden odotuksen.
        [Testi] static void OhitusIlmanValmistaSeuraavaaOdottaaTaydesti()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            s.LatausEdistys = () => 0.5;
            Oleta.Tosi(s.OhitaKohde(), "ohitus ilman seuraavaa (saapumisen esihaku vielä vastauksetta)");
            s.Vastaus(p[^1].n, K("B", 55.6800, 12.5900));
            double t = LahtoAika(s);
            Oleta.Tosi(t > OpasSilmukka.LahtoOdotusMaxS - 0.1, $"täysi odotus ({t:F2} s)");
        }

        // Päätoimittaja 8.10. 07.5x: kohteen valo sammui ja syttyi yhdessä ruudussa. Häivytys ~1 s; sammunut ennen liikettä,
        // syttyy vasta saapumisen jälkeen; automaattinen lähtö ei viivästy (sammutus lopputauon aikana).
        [Testi] static void KorostusHaivyttyyJaSammuuEnnenLiiketta()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            double ennenSaapumista = 0;
            for (int i = 0; i < 600 && s.Vaihe != OpasVaihe.Puhuu; i++) { s.Paivita(0.05, _ => 5); if (s.Vaihe == OpasVaihe.Lentaa) ennenSaapumista = Math.Max(ennenSaapumista, s.KorostusOsuus); }
            Oleta.Sama(0.0, ennenSaapumista, "lennon aikana ei korostusta");
            s.Paivita(0.05, _ => 5);
            Oleta.Tosi(s.KorostusOsuus > 0 && s.KorostusOsuus < 0.2, $"syttyy saapumisesta pehmeästi ({s.KorostusOsuus:F2})");
            for (int i = 0; i < 30; i++) s.Paivita(0.05, _ => 5);
            Oleta.Sama(1.0, s.KorostusOsuus, "täysi ~1 s:ssa");
            s.Vastaus(p[^1].n, K("B", 55.6800, 12.5900));
            s.AaniLoppui();
            double edella = s.KorostusOsuus, suurinAskel = 0, lahdossa = -1;
            for (int i = 0; i < 100 && s.Vaihe != OpasVaihe.Lentaa; i++)
            {
                s.Paivita(0.05, _ => 5);
                suurinAskel = Math.Max(suurinAskel, edella - s.KorostusOsuus); edella = s.KorostusOsuus;
                if (s.Vaihe == OpasVaihe.Lentaa) lahdossa = s.KorostusOsuus;
            }
            Oleta.Sama(0.0, lahdossa, "sammunut, kun liike alkaa");
            Oleta.Tosi(suurinAskel <= 0.05 / OpasSilmukka.KorostusS + 1e-9, $"ei yhden ruudun sammutusta (askel {suurinAskel:F3})");
        }

        // Video2 8.10.: 1. lento lähti 61 %:ssa samassa ruudussa, jossa seuraava tuli (aste oli vielä edellisen näkymän 100 %).
        [Testi] static void LatausasteeseenLuotetaanVastaMittausajanJalkeen()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.LatausEdistys = () => 1.0;
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            double t = 0;
            for (int i = 0; i < 100 && s.Vaihe != OpasVaihe.Lentaa; i++) { s.Paivita(0.05, _ => 5); t += 0.05; }
            Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa, "lähti");
            Oleta.Tosi(t >= OpasSilmukka.LahtoMittausS - 1e-9, $"ei ennen mittausaikaa ({t:F2} s)");
        }

        // Video3 8.10.: avauskuva katsoi 1. kohteen kohdalle (matka < 50 m) → lähtö 57 %:ssa ilman odotusta ja reitin esilatausta.
        [Testi] static void AvauskuvaKohteenKohdallaEiOleSamaPaikka()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.6760, 12.5700, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.LatausEdistys = () => 0.5;
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            Oleta.Tosi(s.ReittiEsilataus(_ => 5, new Kuvakulma[4]) > 0, "reitti esiladataan");
            double t = 0;
            for (int i = 0; i < 400 && s.Vaihe != OpasVaihe.Lentaa; i++) { s.Paivita(0.05, _ => 5); t += 0.05; }
            Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa && t > OpasSilmukka.LahtoOdotusMaxS - 0.1, $"odotti laattoja ({t:F2} s)");
        }

        // Päätoimittaja 8.10. 08.3x: silmän nopeus (m/s) nousee ja hidastuu 10 → 90 % vähintään 3 s:ssa, eikä kuvan nopeus kasva
        // laskeutuessa (Laitetestaaja: Louvreen tultaessa näennäinen nopeus kasvoi ennen pysähdystä).
        [Testi] static void LennonRampitJaKuvanNopeus()
        {
            OpasSilmukka.PalloLento = true;
            try
            {
                OpasKuvaus.SumennusNostoPaalla = false;   // rampit ilman sumennusnostoa (700 m:n lento ohittaa prefektuurin; nosto: oma testi)
                foreach (double m in new[] { 700.0, 1363, 3000 })
                {
                    double lat0 = 48.853, lon0 = 2.3498, lat1 = lat0 + m / 111320.0 * 0.6, lon1 = lon0 - m / 73000.0 * 0.8;
                    var a = new Kuvakulma(lat0, lon0, 420, 58, 250, 40);
                    double T = OpasSilmukka.LennonKesto(KierrosLento.EtaisyysM(lat0, lon0, lat1, lon1)), dt = 1 / 60.0;
                    // Pahin saapumissuunta: kehys katsoisi vastakkaiseen suuntaan → PalloTulosuunta rajaa käännöksen.
                    var b = new Kuvakulma(lat1, lon1, 350, 58, OpasSilmukka.PalloTulosuunta(250, 70, T), 60);
                    double kaanto = 0;
                    var v = new List<double>(); var vk = new List<double>(); var et = new List<double>();
                    var e = OpasKuvaus.KameraPaikka(a, lat0, lon0); var edK = a;
                    for (double t = dt; t <= T + 1e-9; t += dt)
                    {
                        var k = OpasKuvaus.Lennossa(a, b, t / T); var p2 = OpasKuvaus.KameraPaikka(k, lat0, lon0);
                        kaanto = Math.Max(kaanto, Math.Abs(KierrosLento.Kiedo(k.Suuntima - edK.Suuntima)) / dt);
                        v.Add(KierrosLento.EtaisyysM(edK.Lat, edK.Lon, k.Lat, k.Lon) / dt); edK = k;   // kulkunopeus: katsepisteen maajälki
                        vk.Add(Math.Sqrt((p2.e - e.e) * (p2.e - e.e) + (p2.n - e.n) * (p2.n - e.n) + (p2.u - e.u) * (p2.u - e.u)) / dt); et.Add(k.EtaisyysM); e = p2;
                    }
                    var (nousu, hidastus, huippu, _) = OpasKuvaus.Telemetria(v, et, dt);
                    var (_, _, _, kasvu) = OpasKuvaus.Telemetria(vk, et, dt);   // kuvan nopeus kokonaisliikkeestä
                    Oleta.Tosi(nousu >= 3 && hidastus >= 3, $"{m} m: nousu {nousu:F1} s, hidastus {hidastus:F1} s (≥ 3), huippu {huippu:F0} m/s, kesto {T:F1} s");
                    Oleta.Tosi(kasvu < 0.03, $"{m} m: kuvan nopeus ei kasva huipun jälkeen ({kasvu:P1})");
                    Oleta.Tosi(kaanto <= OpasSilmukka.PalloKaantoAstS + 0.2, $"{m} m: kääntö {kaanto:F1} °/s (video6 Louvre 13,6)");
                }
            }
            finally { OpasSilmukka.PalloLento = false; OpasKuvaus.SumennusNostoPaalla = true; }
        }

        // Omistaja 8.10. ~09.0x: kierroksen aloitus yleiskuvasta laskeutuu rauhallisesti suoraan 1. kohteeseen (ei pysähdystä arviokehyksessä).
        [Testi] static void AvauksenLaskeutuminenJatkuuSuoraanKohteeseen()
        {
            var s = new OpasSilmukka(OpasSilmukka.Avauskuva(48.8566, 2.3522));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            int vaihtui = 0; s.LentoKohdeVaihtui += _ => vaihtui++;
            s.Aloita("Pariisi");
            s.AloitaKierros(new List<(string, double, double)> { ("Notre-Dame", 48.8530, 2.3499), ("Louvre", 48.8606, 2.3376) });
            Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa && s.LentoKestoS >= OpasSilmukka.AvausLaskuS - 1e-9, $"laskeutuminen alkoi ({s.Vaihe}, {s.LentoKestoS:F1} s)");
            for (int i = 0; i < 240; i++) s.Paivita(0.05, _ => 35);   // 12 s: worker vastaa kesken laskeutumisen
            s.Vastaus(p[^1].n, K("Notre-Dame", 48.8530, 2.3499));
            bool odotti = false;
            for (int i = 0; i < 600 && s.Vaihe != OpasVaihe.Puhuu; i++) { s.Paivita(0.05, _ => 35); if (s.Vaihe == OpasVaihe.Odottaa) odotti = true; }
            Oleta.Tosi(vaihtui == 1 && !odotti, $"kohde vaihtui lennossa ({vaihtui}), ei pysähdystä välissä ({odotti})");
            Oleta.Tosi(s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen?.Id == "Notre-Dame", $"perillä kohteessa ({s.Vaihe} {s.Nykyinen?.Id})");
        }

        // Video6 8.10.: Louvren lennolla kääntö 13,6 °/s — kehyksen SivuKulma (25°) jäi saapumissuunnan rajan ulkopuolelle.
        [Testi] static void SilmukanPallolentoKaantyyEnintaanKymmenenAstettaSekunnissa()
        {
            OpasSilmukka.PalloLento = true;
            try
            {
                foreach (double kulma in new[] { 0.0, 90, 180, 270 })
                {
                    var s = new OpasSilmukka(new Kuvakulma(48.853, 2.3498, 420, 58, kulma, 40));
                    var p = new List<(int n, string t)>();
                    s.Pyyda += (n, t) => p.Add((n, t));
                    s.Aloita("Pariisi");
                    s.Vastaus(p[^1].n, K("A", 48.8530, 2.3498));
                    for (int i = 0; i < 600 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.05, _ => 35);
                    s.Vastaus(p[^1].n, new OpasKohde { Id = "Louvre", Nimi = "Louvre", Lat = 48.8611, Lon = 2.3358, KokoM = 300, KestoS = 5 });
                    s.AaniLoppui();
                    for (int i = 0; i < 400 && s.Vaihe != OpasVaihe.Lentaa; i++) s.Paivita(0.05, _ => 35);
                    double maks = 0, ed = s.Asento.Suuntima; const double dt = 1 / 60.0;
                    for (int i = 0; i < 2000 && s.Vaihe == OpasVaihe.Lentaa; i++)
                    {
                        s.Paivita(dt, _ => 35);
                        if (s.Vaihe == OpasVaihe.Lentaa) maks = Math.Max(maks, Math.Abs(KierrosLento.Kiedo(s.Asento.Suuntima - ed)) / dt);
                        ed = s.Asento.Suuntima;
                    }
                    Oleta.Tosi(maks <= OpasSilmukka.PalloKaantoAstS + 0.3, $"lähtösuunta {kulma}°: kääntö enintään {maks:F1} °/s");
                }
            }
            finally { OpasSilmukka.PalloLento = false; }
        }

        // Tukholman kuva-arkki 9.10. (PT junaan 174): Vasa-museo nähtiin lentosuunnasta tumman takaseinän puolelta → worker
        // "katse_suunta" kääntää pysähdyksen kehyksen veden puolelle (kamera lounaassa, katse koilliseen), kääntöraja pätee yhä.
        [Testi] static void KohteenKatseSuuntaKorvaaLentosuunnan()
        {
            var j = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna("{\"nimi\":\"Vasa-museo\",\"lat\":59.3281,\"lon\":18.0914,\"katse_suunta\":40}");
            Oleta.Tosi(Math.Abs(OpasKohde.Lue(j).KatseSuunta - 40) < 1e-9, "katse_suunta luetaan");
            Oleta.Tosi(double.IsNaN(OpasKohde.Lue((Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna("{\"nimi\":\"x\",\"lat\":1,\"lon\":2}")).KatseSuunta), "puuttuva = NaN");
            foreach (bool pallo in new[] { false, true })
                foreach (double? katse in new double?[] { null, 40 })
                {
                    OpasSilmukka.PalloLento = pallo;
                    try
                    {
                        var s = new OpasSilmukka(new Kuvakulma(59.3250, 18.0708, 420, 58, 70, 30));
                        var p = new List<(int n, string t)>();
                        s.Pyyda += (n, t) => p.Add((n, t));
                        s.Aloita("Tukholma");
                        s.Vastaus(p[^1].n, K("Gamla stan", 59.3250, 18.0708));
                        for (int i = 0; i < 600 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.05, _ => 25);
                        var vasa = new OpasKohde { Id = "Q901371", Nimi = "Vasa-museo", Lat = 59.3281, Lon = 18.0914, KokoM = 120, KorkeusM = 39, KestoS = 5 };
                        if (katse.HasValue) vasa.KatseSuunta = katse.Value;
                        s.Vastaus(p[^1].n, vasa);
                        s.AaniLoppui();
                        for (int i = 0; i < 400 && s.Vaihe != OpasVaihe.Lentaa; i++) s.Paivita(0.05, _ => 25);
                        double maks = 0, ed = s.Asento.Suuntima; const double dt = 1 / 60.0;
                        for (int i = 0; i < 4000 && s.Vaihe != OpasVaihe.Puhuu; i++)
                        {
                            s.Paivita(dt, _ => 25);
                            if (s.Vaihe == OpasVaihe.Lentaa) maks = Math.Max(maks, Math.Abs(KierrosLento.Kiedo(s.Asento.Suuntima - ed)) / dt);
                            ed = s.Asento.Suuntima;
                        }
                        Oleta.Tosi(s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen?.Id == "Q901371", $"perillä Vasassa ({s.Vaihe})");
                        double su = s.Asento.Suuntima, lento = OpasSilmukka.Suunta(59.3250, 18.0708, 59.3281, 18.0914);
                        string m = $"pallo {pallo}, katse {(katse?.ToString() ?? "-")}: suuntima {su:F0}°, lentosuunta {lento:F0}°, kääntö {maks:F1} °/s";
                        if (katse.HasValue && !pallo) Oleta.Tosi(Math.Abs(KierrosLento.Kiedo(su - 40)) < 6, m);
                        if (katse.HasValue && pallo) Oleta.Tosi(Math.Abs(KierrosLento.Kiedo(su - 40)) < Math.Abs(KierrosLento.Kiedo(lento + OpasKuvaus.SivuKulma - 40)), "pallo kääntyy kohti katsesuuntaa: " + m);
                        if (!katse.HasValue) Oleta.Tosi(Math.Abs(KierrosLento.Kiedo(su - 40)) > 20, "ilman kenttää lentosuunnan mukaan: " + m);
                        if (pallo) Oleta.Tosi(maks <= OpasSilmukka.PalloKaantoAstS + 0.3, "kääntöraja: " + m);
                    }
                    finally { OpasSilmukka.PalloLento = false; }
                }
        }

        // Video8 8.10.: siirron maanäyte pyydettiin ennen kuin kaupunki oli auki (hylättiin hiljaa) → siirto aina aikarajaan.
        [Testi] static void SiirtoPyytaaMaanNaytteenUudelleen()
        {
            var s = new OpasSilmukka(OpasSilmukka.Avauskuva(55.68, 12.57));
            s.Pyyda += (n, t) => { };
            double maa = double.NaN; int pyyntoja = 0;
            s.MaaPisteessa = (la, lo) => maa;
            s.MaaTarvitaan += (la, lo) => pyyntoja++;
            s.LatausEdistys = () => 1.0;
            s.PakotaSiirto = true;
            s.VaihdaPaikka(48.861, 2.351, "Pariisi");
            for (int i = 0; i < 25; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(s.Siirtymassa && pyyntoja >= 3, $"näyte pyydetään uudelleen ({pyyntoja} pyyntöä 2,5 s:ssa)");
            maa = 35;
            for (int i = 0; i < 40 && s.Siirtymassa; i++) s.Paivita(0.1, _ => double.NaN);
            Oleta.Tosi(!s.Siirtymassa, "näytteen jälkeen siirto valmistuu ennen aikarajaa");
        }

        // Juna 165 (Päätoimittaja 09.2x, video9: 12 s:ssa 70 %): siirrossa ensin yleiskuva, vasta sitten 1. kohteen esikamera.
        [Testi] static void SiirtoLataaEnsinYleiskuvanJaSittenKohteen()
        {
            var s = new OpasSilmukka(OpasSilmukka.Avauskuva(55.68, 12.57));
            s.Pyyda += (n, t) => { };
            s.MaaPisteessa = (la, lo) => 35;
            double ed = 0.5;
            s.LatausEdistys = () => ed;
            s.EsiKohde = ("Notre-Dame", 48.8530, 2.3499);
            s.PakotaSiirto = true;
            s.VaihdaPaikka(48.861, 2.351, "Pariisi");
            for (int i = 0; i < 20; i++) s.Paivita(0.1, _ => 35);
            bool NotreDamessa(Kuvakulma? k) => k is Kuvakulma kk && KierrosLento.EtaisyysM(kk.Lat, kk.Lon, 48.8530, 2.3499) < 300;
            Oleta.Tosi(s.Siirtymassa && !s.YleiskuvaValmis && !NotreDamessa(s.Esilataus(_ => 35)), "1. vaihe: vain yleiskuva (esikamera ei Notre-Damessa)");
            Oleta.Tosi(s.SiirtoEdistys <= 0.6 + 1e-9, $"palkki 1. vaiheessa ≤ 60 % ({s.SiirtoEdistys:P0})");
            ed = 0.97;
            for (int i = 0; i < 3; i++) s.Paivita(0.1, _ => 35);
            Oleta.Tosi(s.Siirtymassa && s.YleiskuvaValmis && NotreDamessa(s.Esilataus(_ => 35)), "2. vaihe: 1. kohde esiladataan, siirto jatkuu");
            for (int i = 0; i < 10 && s.Siirtymassa; i++) s.Paivita(0.1, _ => 35);
            Oleta.Tosi(!s.Siirtymassa, "mittausajan jälkeen ≥ 95 % → siirtoruutu pois");
        }

        // Omistaja 8.10. 08.3x (liikemalli): esittelyn aikana pallo lipuu kohti seuraavaa, kamera pysyy nykyisessä kohteessa;
        // lipuminen pysähtyy pehmeästi ennen lentoa (lento alkaa levosta).
        [Testi] static void PalloLipuuKohtiSeuraavaaKatseNykyisessa()
        {
            OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(new Kuvakulma(48.853, 2.3498, 420, 58, 0, 40));
                var p = new List<(int n, string t)>();
                s.Pyyda += (n, t) => p.Add((n, t));
                s.Aloita("Pariisi");
                s.Vastaus(p[^1].n, K("A", 48.8530, 2.3498));
                for (int i = 0; i < 800 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.05, _ => 35);
                s.Vastaus(p[^1].n, K("B", 48.8611, 2.3358));
                var alku = OpasKuvaus.KameraPaikka(s.Asento, 48.8530, 2.3498);
                double bE = (2.3358 - 2.3498) * 6371000 * Math.Cos(48.853 * Math.PI / 180) * Math.PI / 180, bN = (48.8611 - 48.8530) * 6371000 * Math.PI / 180;
                double Etaisyys((double e, double n, double u) x) => Math.Sqrt((x.e - bE) * (x.e - bE) + (x.n - bN) * (x.n - bN));
                double maks = 0;
                for (int i = 0; i < 300; i++) { s.Paivita(0.05, _ => 35); maks = Math.Max(maks, s.LipumisVauhti); }   // 15 s esittelyä
                var nyt = OpasKuvaus.KameraPaikka(s.Asento, 48.8530, 2.3498);
                Oleta.Tosi(KierrosLento.EtaisyysM(s.Asento.Lat, s.Asento.Lon, 48.8530, 2.3498) < 1, "katse pysyy nykyisessä kohteessa");
                // 8.10. ilta (omistaja "jää liian kauas"): lipuminen skaalataan kehyksen koolla ja rajataan 1,2 × vaakaetäisyyteen.
                Oleta.Tosi(Etaisyys(nyt) < Etaisyys(alku) - 10, $"silmä lähestyi seuraavaa ({Etaisyys(alku):F0} → {Etaisyys(nyt):F0} m)");
                Oleta.Tosi(maks <= OpasKuvaus.KaariNopeusMS + 1e-9 && maks > 1, $"vauhti enintään {OpasKuvaus.KaariNopeusMS} m/s ({maks:F1})");
                s.AaniLoppui();
                double vauhtiLahtiessa = double.NaN;
                for (int i = 0; i < 400 && s.Vaihe != OpasVaihe.Lentaa; i++) { vauhtiLahtiessa = s.LipumisVauhti; s.Paivita(0.05, _ => 35); }
                Oleta.Tosi(s.Vaihe == OpasVaihe.Lentaa && vauhtiLahtiessa < 0.05, $"lipuminen pysähtyi ennen lentoa ({vauhtiLahtiessa:F2} m/s)");
            }
            finally { OpasSilmukka.PalloLento = false; }
        }

        // Pelikoodari 8.10. (pallosanasto, siltalauseet-v3b): pallolauseiden valinta kierroksella.
        // Omistaja 9.10. ("kuulostaa puuduttavalta"), Päätoimittaja: lause noin joka 4. siirtymään, ei peräkkäin, muulloin kierros-lause.
        [Testi] static void PallolauseetValitaanSaannoin()
        {
            var p = new OpasPallolauseet();
            Oleta.Sama(OpasPallolauseet.Lahto, p.Lahtoon(0, 500), "1. lähtö: pallo-lahto");
            for (int i = 1; i < OpasPallolauseet.Vali; i++) Oleta.Sama(null, p.Lahtoon(i % 2 == 0 ? 0 : 120, 1500), $"siirtymä {i}: hiljaa");
            Oleta.Sama(OpasPallolauseet.Kaanto, p.Lahtoon(120 + 100, 500), "4. siirtymä, suunta muuttui → pallo-kaanto");
            Oleta.Sama(null, p.Laskuun(), "lähdössä soi → ei laskua");
            for (int i = 1; i < OpasPallolauseet.Vali; i++) p.Lahtoon(220, 300);
            Oleta.Sama(OpasSiltalauseet.Kierros, p.Lahtoon(221, 300), "lyhyt, suora → tavallinen kierros-lause");
            // 20 siirtymää: enintään 5 lausetta, ei kahta peräkkäin.
            var q = new OpasPallolauseet(); int n = 0, ed = -10;
            for (int i = 0; i < 20; i++)
                if (q.Lahtoon(i % 2 == 0 ? 0 : 120, 1500) != null) { n++; Oleta.Tosi(i - ed >= OpasPallolauseet.Vali, $"siirtymä {i}: edellinen lause {i - ed} siirtymää sitten"); ed = i; }
            Oleta.Sama(5, n, "20 siirtymää → 5 lausetta");
            Oleta.Sama(OpasSiltalauseet.Kierros, new OpasPallolauseet().Lahtoon(0, 500, r => r != OpasPallolauseet.Lahto), "ryhmää ei aineistossa → tavallinen");
        }

        // Juna 166 (Pelikoodarin GET /opas/saa PR #4194): vastaus → Saatila.LiveSaa; LIVE-aika auringosta; hakuväli.
        [Testi] static void PalloSaaLuetaanJaHakuvaliRajataan()
        {
            var j = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna("{\"tila\":\"pilvinen\",\"pilvisyys_pct\":70.3,\"sade_mm_h\":0,\"tuuli_ms\":2,\"paiva\":true}");
            var t = PalloSaaTiedot.Lue(j);
            Oleta.Tosi(t != null && t.Tila == PalloSaa.Pilvinen && Math.Abs(t.PilvisyysPct - 70.3) < 1e-9 && t.Paiva, "pilvinen luetaan");
            Oleta.Tosi(PalloSaaTiedot.Lue((Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna("{\"virhe\":\"palvelin\"}")) == null, "502-runko ilman tilaa → null (arvo pysyy)");
            Oleta.Tosi(PalloSaaTiedot.TilaksiSaa("raekuuro") == null && PalloSaaTiedot.TilaksiSaa("ukkonen") == PalloSaa.Ukkonen, "tuntematon tila → null");
            Oleta.Tosi(PalloSaaTiedot.AikaAuringosta(new DateTime(2026, 10, 8, 12, 0, 0, DateTimeKind.Utc), 48.86, 2.35) == PalloAika.Paiva, "Pariisi klo 14 → päivä");
            Oleta.Tosi(PalloSaaTiedot.AikaAuringosta(new DateTime(2026, 10, 8, 23, 0, 0, DateTimeKind.Utc), 48.86, 2.35) == PalloAika.Yo, "Pariisi klo 01 → yö");
            Oleta.Tosi(!PalloSaaTiedot.Hae(false, "pariisi", null, 1e9), "LIVE pois → ei hakua");
            Oleta.Tosi(PalloSaaTiedot.Hae(true, "pariisi", "rooma", 10) && !PalloSaaTiedot.Hae(true, "pariisi", "pariisi", 10), "kaupungin vaihto hakee, sama kaupunki ei");
            Oleta.Tosi(PalloSaaTiedot.Hae(true, "pariisi", "pariisi", PalloSaaTiedot.HakuValiS), "15 min jälkeen uudelleen");
        }

        // Juna 166: säätehosteiden painot liukuvat (ei hyppyä), ukkosella salama ja kumahdus välein.
        [Testi] static void SaaPainotLiukuvatJaUkkonenValahtaa()
        {
            var v = new PalloSaaVaikutus(7);
            v.Paivita(0.1, PalloSaa.Sade, null);
            Oleta.Tosi(v.Nyt.Sade > 0 && v.Nyt.Sade <= 0.1 / PalloSaaVaikutus.SiirtymaS + 1e-9, $"sade alkaa liukuen ({v.Nyt.Sade:F3})");
            for (int i = 0; i < 40; i++) v.Paivita(0.1, PalloSaa.Sade, null);
            Oleta.Tosi(Math.Abs(v.Nyt.Sade - 0.6) < 1e-9 && Math.Abs(v.Nyt.Harmaus - 0.75) < 1e-9, "tavoitteessa 4 s:ssa");
            for (int i = 0; i < 40; i++) v.Paivita(0.1, PalloSaa.Pois, null);
            Oleta.Tosi(v.Nyt.Tyhja, "sää pois → kaikki painot nollaan");
            var t = new PalloSaaTiedot { Tila = PalloSaa.Sade, SadeMmH = 4 };
            Oleta.Tosi(Math.Abs(PalloSaaVaikutus.Tavoite(PalloSaa.Sade, t).Sade - 1) < 1e-9, "rankkasade (4 mm/h) → sade 1");
            int salamat = 0, kumahdukset = 0; double ed = 0;
            for (int i = 0; i < 7200; i++)   // 120 s ukkosta 60 Hz:llä
            {
                v.Paivita(1 / 60.0, PalloSaa.Ukkonen, null);
                if (v.Salama > 0 && ed == 0) salamat++;   // kaksoisvälähdys = yksi salama
                if (v.Kumahdus) kumahdukset++;
                ed = v.Salama;
            }
            Oleta.Tosi(salamat >= 120 / PalloSaaVaikutus.SalamaValiMaxS - 1 && salamat <= 120 / PalloSaaVaikutus.SalamaValiMinS + 2, $"salamia {salamat} / 120 s");
            Oleta.Tosi(kumahdukset >= salamat - 1 && kumahdukset <= salamat, $"jokaista salamaa seuraa kumahdus ({kumahdukset}/{salamat})");
            Oleta.Tosi(PalloSaaVaikutus.Valahdys(0.04) > 0.95 && PalloSaaVaikutus.Valahdys(0.5) == 0, "välähdyksen muoto");
        }

        // Juna 166 (video 165 Concorde: kuvan nopeudella kaksi kumpua): van Wijk–Nuij-polku alkaa ja loppuu oikeaan leveyteen,
        // vaakaosuus on monotoninen ja kaari maltillinen.
        [Testi] static void ZoomPolkuPaatepisteetJaKaari()
        {
            foreach (var (w0, w1, u) in new[] { (420.0, 350.0, 2518.0), (350.0, 900.0, 700.0), (500.0, 500.0, 0.0) })
            {
                var alku = OpasKuvaus.ZoomPolku(w0, w1, u, 0); var loppu = OpasKuvaus.ZoomPolku(w0, w1, u, 1);
                Oleta.Tosi(Math.Abs(alku.osuus) < 1e-9 && Math.Abs(alku.leveys - w0) < 1e-6 && Math.Abs(loppu.osuus - 1) < 1e-6 && Math.Abs(loppu.leveys - w1) < 1e-3,
                    $"{u} m: päätepisteet ({alku.leveys:F1} → {loppu.leveys:F1})");
                double ed = -1, maks = 0;
                for (int i = 0; i <= 100; i++) { var x = OpasKuvaus.ZoomPolku(w0, w1, u, i / 100.0); Oleta.Tosi(x.osuus >= ed - 1e-12, "vaakaosuus monotoninen"); ed = x.osuus; maks = Math.Max(maks, x.leveys); }
                Oleta.Tosi(maks <= Math.Max(w0, w1) * 1.6 + 1, $"{u} m: kaari maltillinen (huippu {maks:F0} m)");
            }
        }

        // Päätoimittaja 8.10. 10.3x (video 165): Googlen sumentamien kohteiden (prefektuuri, Élysée) ohi lennetään korkeammalta,
        // jolloin sumennus näkyy pienenä kaukana; reitti ja päätepisteet ennallaan.
        [Testi] static void SumennetunKohteenOhiLennetaanKorkeammalta()
        {
            OpasSilmukka.PalloLento = true;
            try
            {
                // Silmän etäisyys sumennukseen hetkellä, jolloin katsepiste ohittaa sen lähimmältä (läiskä kuvan keskellä).
                double Lahin(Kuvakulma a, Kuvakulma b, double slat, double slon, out double alkuEro, out double loppuEro)
                {
                    double T = OpasSilmukka.LennonKesto(KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon)), katseLahin = double.MaxValue, silma = 0;
                    alkuEro = Math.Abs(OpasKuvaus.Lennossa(a, b, 0).EtaisyysM - a.EtaisyysM); loppuEro = Math.Abs(OpasKuvaus.Lennossa(a, b, 1).EtaisyysM - b.EtaisyysM);
                    for (double t = 0; t <= T + 1e-9; t += 1 / 30.0)
                    {
                        var k = OpasKuvaus.Lennossa(a, b, t / T);
                        double kd = KierrosLento.EtaisyysM(k.Lat, k.Lon, slat, slon);
                        if (kd < katseLahin) { katseLahin = kd; var e = OpasKuvaus.KameraPaikka(k, slat, slon); silma = Math.Sqrt(e.e * e.e + e.n * e.n + (e.u - 35) * (e.u - 35)); }
                    }
                    return silma;
                }
                var tapaukset = new[]
                {
                    // Prefektuuri on 230 m Notre-Damesta: päätepisteen vieressä ei nostoa (SumennusPaateM, omistaja 9.10. lennot matalammiksi). Nosto 9.10. matalammaksi
                    // (omistaja: lennot matalammalla; SumennusEtM 1 100 → 500 m), joten rajat 1,1/1,4 → 1,0/1,0 ja vähintään 600 → 450 m (Élysée ohitetaan jo ilman nostoa 533 m:stä).
                    ("Notre-Dame → Concorde / prefektuuri", new Kuvakulma(48.8530, 2.3498, 420, 58, 250, 60), new Kuvakulma(48.8656, 2.3212, 400, 58, 300, 40), 48.8541, 2.3470, 1.0, 0.0),
                    ("Concorde → Champs-Élysées / Élysée", new Kuvakulma(48.8656, 2.3212, 400, 58, 300, 40), new Kuvakulma(48.8697, 2.3079, 380, 58, 290, 40), 48.8704, 2.3167, 1.0, 450.0),
                };
                foreach (var (nimi, a, b, slat, slon, kerroin, vahintaan) in tapaukset)
                {
                    OpasKuvaus.SumennusNostoPaalla = false;
                    double ennen = Lahin(a, b, slat, slon, out _, out _);
                    OpasKuvaus.SumennusNostoPaalla = true;
                    double jalkeen = Lahin(a, b, slat, slon, out double ae, out double le);
                    Console.WriteLine($"      {nimi}: lähin etäisyys lennon aikana {ennen:F0} → {jalkeen:F0} m");
                    Oleta.Tosi(jalkeen >= ennen * kerroin && jalkeen >= vahintaan, $"{nimi}: lähin etäisyys sumennukseen {ennen:F0} → {jalkeen:F0} m");
                    Oleta.Tosi(ae < 1e-6 && le < 1e-6, $"{nimi}: päätepisteet ennallaan");
                }
                var kaukana = OpasKuvaus.Lennossa(new Kuvakulma(48.8606, 2.3376, 400, 58, 0, 40), new Kuvakulma(48.8600, 2.3265, 400, 58, 0, 40), 0.5);
                OpasKuvaus.SumennusNostoPaalla = false;
                var kaukanaIlman = OpasKuvaus.Lennossa(new Kuvakulma(48.8606, 2.3376, 400, 58, 0, 40), new Kuvakulma(48.8600, 2.3265, 400, 58, 0, 40), 0.5);
                OpasKuvaus.SumennusNostoPaalla = true;
                Oleta.Tosi(Math.Abs(kaukana.EtaisyysM - kaukanaIlman.EtaisyysM) < 1e-9, "kaukana sumennuksista (Louvre → Orsay) ei nostoa");
            }
            finally { OpasSilmukka.PalloLento = false; OpasKuvaus.SumennusNostoPaalla = true; }
        }

        // Varsova 7.10. (Päätoimittaja 8.10.: juna 166): Googlen 404-tiilet → aluskerros. Toisto oikealla lokilla (b-ajo, 38 riviä).
        [Testi] static void VarsovanTiiliReiatTunnistetaan()
        {
            var rivit = System.IO.File.ReadAllLines(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "varsova-404-20261007.log"));
            var r = new GoogleTiiliReiat();
            int reikia = 0;
            foreach (var x in rivit) if (r.Kirjaa(x)) reikia++;
            Oleta.Sama(38, reikia, "kaikki Varsovan 404-tiilet tunnistetaan");
            Oleta.Tosi(r.AluskerrosTarvitaan, "Varsovassa aluskerros tarvitaan");
            var y = new GoogleTiiliReiat();
            y.Kirjaa(rivit[0]); y.Kirjaa("MATKAKIRJA valmisluennat: manifesti ei saatavilla (404) → palavirta");
            y.Kirjaa("[error] Received status code 404 for tile content https://assets.ion.cesium.com/x.b3dm");
            Oleta.Tosi(y.Maara == 1 && !y.AluskerrosTarvitaan, "yksittäinen 404 tai muu 404 ei riitä");
            r.Nollaa();
            Oleta.Tosi(!r.AluskerrosTarvitaan, "kaupungin vaihto nollaa");
            // Päätoimittaja 8.10.: aluskerroksessa ei karttakuvaa (vain Googlen laatat näkymässä) → ei rasterikerrosta TarkistaReiat-lohkossa.
            var lahde = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "CesiumKaupunki.cs"));
            int i0 = lahde.IndexOf("public void TarkistaReiat()", StringComparison.Ordinal), i1 = lahde.IndexOf("void PoistaAluskerros()", i0, StringComparison.Ordinal);
            Oleta.Tosi(i0 > 0 && i1 > i0, "TarkistaReiat löytyy");
            var lohko = lahde.Substring(i0, i1 - i0);
            Oleta.Tosi(!lohko.Contains("RasterOverlay") && lohko.Contains("ReikaTayte"), "aluskerros: ei karttakuvaa, tasainen sävy");
        }

        [Testi] static void ReitinValinakymatEsiladataanPysahdyksellaJaLennossa()
        {
            var s = AssaBValmiina(() => 0.5);
            var ulos = new Kuvakulma[OpasSilmukka.ReittiNaytteet.Length];
            int n = s.ReittiEsilataus(_ => 5, ulos);
            Oleta.Sama(OpasSilmukka.ReittiNaytteet.Length, n, "pysähdyksellä kaikki välinäkymät");
            // Välinäkymät etenevät A:sta B:hen (pituus kasvaa itään).
            for (int i = 1; i < n; i++) Oleta.Tosi(ulos[i].Lon > ulos[i - 1].Lon, $"näkymä {i} etenee ({ulos[i - 1].Lon:F4} → {ulos[i].Lon:F4})");
            Oleta.Tosi(ulos[0].Lon > 12.5700 - 0.002 && ulos[n - 1].Lon < 12.5900 + 0.002, "reitillä");
            // Lennon puolivälissä vain edessä olevat.
            LahtoAika(s);
            while (s.Vaihe == OpasVaihe.Lentaa && s.VaiheAika < s.LentoKestoS * 0.45) s.Paivita(0.05, _ => 5);
            int m = s.ReittiEsilataus(_ => 5, ulos), edessa = 0;
            foreach (var t in OpasSilmukka.ReittiNaytteet) if (t > s.VaiheAika / s.LentoKestoS) edessa++;
            Oleta.Tosi(m == edessa && m < n, $"lennossa vain edessä olevat ({m}/{edessa})");
            // Perillä (puhe) ilman seuraavaa: ei reittiä.
            for (int i = 0; i < 400 && s.Vaihe == OpasVaihe.Lentaa; i++) s.Paivita(0.05, _ => 5);
            Oleta.Sama(0, s.ReittiEsilataus(_ => 5, ulos), "perillä ilman seuraavaa: 0");
        }

        [Testi] static void SiirtoEiOdotaEikaEsilataaReittia()
        {
            var s = new OpasSilmukka(new Kuvakulma(55.68, 12.57, 1500, 50, 0, 40));
            var p = new List<(int n, string t)>();
            s.Pyyda += (n, t) => p.Add((n, t));
            s.Aloita("Kööpenhamina");
            s.Vastaus(p[^1].n, K("A", 55.6760, 12.5700));
            for (int i = 0; i < 300 && s.Vaihe != OpasVaihe.Puhuu; i++) s.Paivita(0.1, _ => 5);
            s.Vastaus(p[^1].n, K("Praha", 50.0900, 14.4000));
            s.LatausEdistys = () => 0.2;
            Oleta.Sama(0, s.ReittiEsilataus(_ => 5, new Kuvakulma[4]), "siirto: ei reittiä");
            s.AaniLoppui();
            for (int i = 0; i < 30 && !s.Siirtymassa; i++) s.Paivita(0.1, _ => 5);
            Oleta.Tosi(s.Siirtymassa, "siirto alkaa odottamatta (oma latausruutu)");
        }
    }
}
