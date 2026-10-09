// OLAVINLINNAN HISTORIA-ANIMAATIO (Ydin/Dioraama/Historiajana.cs; PT 9.10.2026, juna 171): aikajana, vuosi, avainsanat, kasvu,
// kasvun leikkauslaatikko, drone-kameran jatkuvuus ja K2-lyhennys. Leikkausnimet Olavinlinnan PelattavaPala.Versio-datasta.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class HistoriajanaTestit
    {
        static KavelyData Data()
        {
            string Lue(string n) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n));
            return KavelyData.Lue(Lue("olavinlinna-" + PelattavaPala.Versio + "-osat.json"), Lue("olavinlinna-" + PelattavaPala.Versio + "-merkit.json"));
        }

        [Testi] static void KestotSuunnitelmanMukaan()
        {
            var h = Historiajana.Olavinlinna;
            Oleta.Sama(11, h.Vaiheet.Count);
            Oleta.Tosi(h.Kesto >= 150 && h.Kesto <= 200, $"historia noin 3 min ({h.Kesto} s)");
            Oleta.Sama(8.0, Historiajana.K2Lyhyt.Kesto);
            for (int i = 1; i < h.Vaiheet.Count; i++) Oleta.Tosi(h.Vaiheet[i].Vuosi > h.Vaiheet[i - 1].Vuosi, $"vuodet kasvavat ({i})");
            Oleta.Tosi(h.LoppuVuosi > h.Vaiheet[h.Vaiheet.Count - 1].Vuosi, "loppuvuosi viimeisen vaiheen jälkeen");
            Oleta.Tosi(Historiajana.Lukittu, "vuodet Sisältökirjurin tarkistamia (PT:n ehto 1)");
        }

        [Testi] static void VuosiEteneeVaiheittain()
        {
            var h = Historiajana.Olavinlinna;
            Oleta.Sama(-7500.0, h.Vuosi(0));
            Oleta.Sama(1475.0, h.Vuosi(h.VaiheenAlku(2)));
            Oleta.Sama(1499.0, h.Vuosi(h.VaiheenAlku(4)));
            Oleta.Sama(h.LoppuVuosi, h.Vuosi(h.Kesto + 5));
            double alku = h.VaiheenAlku(3), kesto = h.Vaiheet[3].KestoS;
            Oleta.Tosi(Math.Abs(h.Vuosi(alku + kesto / 2) - 1488) < 1e-9, "vaiheen puolivälissä puolet vuosista (1477 → 1499)");
            double e = h.Vuosi(0);
            for (double t = 0.1; t <= h.Kesto; t += 0.1) { double v = h.Vuosi(t); Oleta.Tosi(v >= e - 1e-9, $"vuosi ei peruutu ({t:F1} s)"); e = v; }
        }

        [Testi] static void AvainsanatVainVaiheenAlussa()
        {
            var h = Historiajana.Olavinlinna;
            for (int i = 0; i < h.Vaiheet.Count; i++)
            {
                double a = h.VaiheenAlku(i);
                if (h.Vaiheet[i].Avain == null) { Oleta.Tosi(h.Avainsana(a + 2) == null, $"vaihe {i}: ei avainsanaa"); continue; }
                Oleta.Tosi(h.Avainsana(a + 0.2) == null, $"vaihe {i}: ei heti vaihdossa");
                Oleta.Tosi(h.Avainsana(a + 2) == h.Vaiheet[i], $"vaihe {i}: avainsana alussa");
                Oleta.Tosi(h.Vaiheet[i].KestoS >= Historiajana.AvainsanaAlkuS + Historiajana.AvainsanaS + 1, $"vaihe {i}: avainsana ehtii häipyä ennen seuraavaa");
                Oleta.Tosi(!string.IsNullOrEmpty(h.Vaiheet[i].VuosiTeksti), $"vaihe {i}: vuosiluku");
            }
            Oleta.Tosi(h.Avainsana(h.Kesto + 1) == null && h.Avainsana(-1) == null, "ei avainsanaa historian ulkopuolella");
            for (double t = 0; t < Historiajana.K2Lyhyt.Kesto; t += 0.1) Oleta.Tosi(Historiajana.K2Lyhyt.Avainsana(t) == null, "K2: ei tekstiä pelissä (ehto 2)");
        }

        [Testi] static void KasvuJaPurku()
        {
            var o = new HistoriaOsa("x", 1790, 10);
            Oleta.Sama(0.0, Historiajana.Kasvu(1500, o));
            Oleta.Sama(0.0, Historiajana.Kasvu(1790, o));
            Oleta.Tosi(Math.Abs(Historiajana.Kasvu(1795, o) - 0.5) < 1e-9, "puolivälissä puolet");
            Oleta.Sama(1.0, Historiajana.Kasvu(1800, o));
            Oleta.Sama(1.0, Historiajana.Kasvu(2026, o));
            Oleta.Sama(1.0, Historiajana.Kasvu(0, null));
            var p = new HistoriaOsa("y", 1500, 10, 1700);
            Oleta.Sama(1.0, Historiajana.Kasvu(1600, p));
            Oleta.Sama(0.0, Historiajana.Kasvu(1710, p));
            Oleta.Tosi(Math.Abs(Historiajana.Kasvu(1705, p) - 0.5) < 1e-9, "purku puolivälissä");
        }

        [Testi] static void LaatikonAlareunaNousee()
        {
            var (y0, h0) = Historiajana.KasvuLaatikko(10, 4, 0);
            Oleta.Sama(10.0, y0); Oleta.Sama(4.0, h0);
            var (y1, h1) = Historiajana.KasvuLaatikko(10, 4, 0.5);
            Oleta.Sama(14.0, y1 + h1);   // yläreuna pysyy
            Oleta.Sama(10.0, y1 - h1);   // alareuna noussut puoleenväliin (6 → 10)
            var (_, h2) = Historiajana.KasvuLaatikko(10, 4, 1);
            Oleta.Sama(0.0, h2);
        }

        [Testi] static void KaikillaVuoden1499LeikkauksillaOnVuosi()
        {
            var d = Data();
            int n = 0;
            foreach (var m in d.Lajia("leikkaus"))
            {
                if (!m.Tunnus.StartsWith("vain-1499", StringComparison.Ordinal) || m.Leikkaukset == null) continue;
                foreach (var nimi in m.Leikkaukset)
                {
                    var o = Historiajana.Osa(nimi);
                    Oleta.Tosi(o != null && o.Vuodesta > 1499, $"{nimi}: historiaosa vuoden 1499 jälkeen");
                    n++;
                }
            }
            Oleta.Tosi(n >= 10, $"leikkauksia {n}");
            Oleta.Tosi(Historiajana.Osa("pk-kappeli-katto") == null, "muu leikkaus ei ole historiaosa");
            Oleta.Sama("b1499-kellobastioni", Historiajana.Osa("b1499-kellobastioni-lounas").Etuliite);
            // Sisältökirjuri 9.10.: Vesiportin bastioni 1749–55 (valmis 1756), Kellobastioni olemassa 1751.
            Oleta.Sama(1.0, Historiajana.Kasvu(1756, Historiajana.Osa("b1499-vesiportin-bastioni-l")));
            Oleta.Sama(1.0, Historiajana.Kasvu(1751, Historiajana.Osa("b1499-kellobastioni")));
            Oleta.Sama(0.0, Historiajana.Kasvu(1743, Historiajana.Osa("b1499-kellobastioni")));
        }

        [Testi] static void DatanVuodetLeikkauksista()
        {
            const string osat = "{\"versio\": 1, \"osat\": {\"vesiportti\": {\"rajat\": {\"min\": [0, 0, 0], \"max\": [10, 3, 10]}, \"leikkaukset\": [" +
                "{\"nimi\": \"b1499-vesiportin-bastioni-l\", \"keskipiste\": [1, 2, 3], \"koko\": [2, 4, 2], \"vuodesta\": 1749}," +
                "{\"nimi\": \"b1499-kellobastioni\", \"keskipiste\": [1, 2, 3], \"koko\": [2, 4, 2], \"vuodesta\": null, \"historia_vuosi\": 1745}," +
                "{\"nimi\": \"pk-katto\", \"keskipiste\": [1, 2, 3], \"koko\": [2, 4, 2]}]}}}";
            var d = KavelyData.Lue(osat, "[]");
            var l = new List<(string, double?, double?)>();
            foreach (var k in d.Osat["vesiportti"].Leikkaukset) l.Add((k.Nimi, k.HistoriaVuodesta, k.HistoriaVuoteen));
            var h = Historiajana.OsatDatasta(l);
            Oleta.Sama(2, h.Count);
            Oleta.Sama(1749.0, Historiajana.Osa("b1499-vesiportin-bastioni-l", h).Vuodesta);
            Oleta.Sama(1745.0, Historiajana.Osa("b1499-kellobastioni", h).Vuodesta);
            Oleta.Tosi(Historiajana.Osa("pk-katto", h) == null, "ilman vuotta ei historiaosa");
            Oleta.Sama(1.0, Historiajana.Kasvu(1749 + Historiajana.DatanRakennusVuotta, Historiajana.Osa("b1499-vesiportin-bastioni-l", h)));
        }

        [Testi] static void PaketinLeikkauksillaOnVuodet()
        {
            // LR v45y: 12 leikkausobjektia vuodella (vuodesta tai historia_vuosi); jokainen vain-1499-leikkaus saa vuoden datasta.
            var d = Data();
            var l = new List<(string, double?, double?)>();
            foreach (var o in d.Osat.Values) foreach (var k in o.Leikkaukset) l.Add((k.Nimi, k.HistoriaVuodesta, k.HistoriaVuoteen));
            var h = Historiajana.OsatDatasta(l);
            Oleta.Tosi(h.Count >= 12, $"vuosia {h.Count}");
            foreach (var m in d.Lajia("leikkaus"))
                if (m.Tunnus.StartsWith("vain-1499", StringComparison.Ordinal) && m.Leikkaukset != null)
                    foreach (var n in m.Leikkaukset) { var o = Historiajana.Osa(n, h); Oleta.Tosi(o != null && o.Vuodesta > 1499, $"{n}: vuosi datasta"); }
        }

        [Testi] static void VaihemallitJaPalonLeikkaukset()
        {
            // LR v45y: blender/vaiheet/vaiheet.json ja palon-jaljet-leikkaukset.json (muoto kuten paketissa).
            var v = Historiajana.LueVaihemallit("[{\"id\": \"tyhja-saari\", \"glb\": \"vaiheet/tyhja-saari.glb\", \"vuodesta\": null, \"vuoteen\": 1475}," +
                "{\"id\": \"puuvarustus\", \"glb\": \"vaiheet/puuvarustus.glb\", \"vuodesta\": 1475, \"vuoteen\": 1477}," +
                "{\"id\": \"palon-jaljet\", \"glb\": \"vaiheet/palon-jaljet.glb\", \"vuodesta\": 1868, \"vuoteen\": 1872, \"leikkaukset\": \"vaiheet/palon-jaljet-leikkaukset.json\"}]");
            Oleta.Sama(3, v.Count);
            Oleta.Tosi(v[0].Nakyy(-7500) && !v[0].Nakyy(1475), "tyhjä saari vuoteen 1475");
            Oleta.Tosi(!v[1].Nakyy(1474) && v[1].Nakyy(1476) && !v[1].Nakyy(1477), "puuvarustus 1475–1477");
            Oleta.Tosi(v[2].Nakyy(1870) && !v[2].Nakyy(1872) && v[2].Leikkaukset != null, "palon jäljet 1868–1872");
            Oleta.Tosi(!Historiajana.LinnaNakyy(1476) && Historiajana.LinnaNakyy(1477), "kivilinna 1477");
            var l = Historiajana.LueLeikkaukset("[{\"nimi\": \"palo-katto-1\", \"keskipiste\": [-19.777, 20.287, 2.685], \"koko\": [44.353, 18.562, 32.517], \"kierto_y\": 2.6924, \"vuodesta\": 1868, \"vuoteen\": 1872, \"piilottaa\": true}]");
            Oleta.Tosi(l.Count == 1 && l[0].HistoriaVuodesta == 1868 && l[0].HistoriaVuoteen == 1872 && Math.Abs(l[0].KokoX - 44.353) < 1e-9, "palon leikkaus");
            // Koko historiassa jokainen vaihemalli näkyy vähintään 2 s (palo 1868–1872 vaiheessa 1847–1872 15 s:ssa: ~2,4 s).
            var h = Historiajana.Olavinlinna;
            foreach (var m in v)
            {
                double n = 0; for (double t = 0; t < h.Kesto; t += 0.05) if (m.Nakyy(h.Vuosi(t))) n += 0.05;
                Oleta.Tosi(n >= 2, $"{m.Id} näkyy {n:F1} s");
            }
        }

        [Testi] static void SolmujenVuodetPeriytyvat()
        {
            // juuri(0) ← teline-kellotorni(1, 1961–1964) ← putki(2); muu(3) ilman vuosia.
            var v = HistoriaVaihemalli.SolmujenVuodet(new[] { -1, 0, 1, 0 }, new (double?, double?)[] { (null, null), (1961, 1964), (null, null), (null, null) });
            Oleta.Tosi(v[1] == (1961, 1964) && v[2] == (1961, 1964) && v[3] == (null, null) && v[0] == (null, null), "lapsi perii, muu avoin");
            Oleta.Tosi(HistoriaVaihemalli.Valilla(1962, 1961, 1964) && !HistoriaVaihemalli.Valilla(1964, 1961, 1964) && HistoriaVaihemalli.Valilla(1970, null, null), "väli [a, b)");
            // LR v45z: ryhmän vuodet kalenterivuosina (1963–1963 näkyy vuoden 1963 ajan), ja jokainen v45z-ryhmä näkyy historiassa ≥ 0,7 s.
            Oleta.Tosi(HistoriaVaihemalli.RyhmaVuonna(1963.5, 1963, 1963) && !HistoriaVaihemalli.RyhmaVuonna(1964, 1963, 1963), "kalenterivuosi");
            foreach (var (a, b) in new (double, double)[] { (1962, 1963), (1963, 1963), (1966, 1966), (1968, 1968), (1970, 1972), (1971, 1971), (1973, 1974), (1975, 1975) })
            {
                double nr = 0; for (double tt = 0; tt < Historiajana.Olavinlinna.Kesto; tt += 0.02) if (HistoriaVaihemalli.RyhmaVuonna(Historiajana.Olavinlinna.Vuosi(tt), a, b)) nr += 0.02;
                Oleta.Tosi(nr >= 0.7, $"ryhmä {a}–{b} näkyy {nr:F2} s");
            }
            // Restauroinnin jakso: 1961–1975 näkyy vähintään 6 s (telineet).
            var h = Historiajana.Olavinlinna; double n = 0;
            for (double t = 0; t < h.Kesto; t += 0.05) if (HistoriaVaihemalli.Valilla(h.Vuosi(t), 1961, 1975)) n += 0.05;
            Oleta.Tosi(n >= 6, $"restaurointi näkyy {n:F1} s");
        }

        [Testi] static void K2KasvattaaKaikkiOsat()
        {
            var k2 = Historiajana.K2Lyhyt;
            foreach (var o in Historiajana.OlavinlinnanOsat)
            {
                Oleta.Sama(0.0, Historiajana.Kasvu(k2.Vuosi(0), o));
                Oleta.Sama(1.0, Historiajana.Kasvu(k2.Vuosi(k2.Kesto), o));
                // Kasvu kestää näkyvästi (vähintään 0,5 s), ei ponnahda.
                double alku = -1, loppu = -1;
                for (double t = 0; t <= k2.Kesto; t += 0.01)
                {
                    double g = Historiajana.Kasvu(k2.Vuosi(t), o);
                    if (alku < 0 && g > 0.01) alku = t;
                    if (loppu < 0 && g > 0.99) loppu = t;
                }
                Oleta.Tosi(loppu - alku >= 0.5, $"{o.Etuliite}: kasvu {loppu - alku:F2} s");
            }
            // Myös koko historiassa jokainen osa kasvaa vähintään 1 s.
            var h = Historiajana.Olavinlinna;
            foreach (var o in Historiajana.OlavinlinnanOsat)
            {
                Oleta.Sama(0.0, Historiajana.Kasvu(h.Vuosi(h.VaiheenAlku(4)), o));   // 1499: ei vielä
                Oleta.Sama(1.0, Historiajana.Kasvu(h.Vuosi(h.Kesto), o));
            }
        }

        [Testi] static void DroneJatkuvaEiHyppyja()
        {
            var h = Historiajana.Olavinlinna;
            var keski = new V3(-20, 15, 0);
            var (e, _) = Kameraliike.AsentoSijainti(h.Kamera(0, keski, 90, 200));
            double maks = 0, minY = double.MaxValue;
            for (double t = 1 / 60.0; t <= h.Kesto; t += 1 / 60.0)
            {
                var (s, _) = Kameraliike.AsentoSijainti(h.Kamera(t, keski, 90, 200));
                maks = Math.Max(maks, (s - e).Pituus); minY = Math.Min(minY, s.Y);
                e = s;
            }
            Oleta.Tosi(maks < 1.5, $"kamera enintään 1,5 m / ruutu ({maks:F2})");
            Oleta.Tosi(minY > keski.Y + 30, $"drone linnan yllä ({minY:F1})");
            var loppu = h.Kamera(h.Kesto, keski, 90, 200);
            Oleta.Tosi(Math.Abs(loppu.Atsimuutti - (200 + Historiajana.KiertoAsteet)) < 1e-9, "kierto koko historian ajan");
        }
    }
}
