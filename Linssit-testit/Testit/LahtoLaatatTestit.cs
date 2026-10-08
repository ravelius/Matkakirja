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
            int m = s.ReittiEsilataus(_ => 5, ulos);
            Oleta.Tosi(m == 2, $"lennon puolivälissä 2 näkymää edessä ({m})");
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
