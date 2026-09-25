// Maakuntien täyttö (Kartta/Maakuntajako.cs Naapurit, Varita, Taytto, Haive; MaaKartta.maakohtainen): webin
// js/pallomaakunnat.js ja tools/tee-maakuntavektorit.mjs varita. Oikea aineisto ja vertailu webin värinumeroihin:
//   MAAKUNTARAJAT=<maakuntarajat.json> MAAKUNNAT_WEB=<kansio, jossa webin <ISO>.json> ./kaanna.sh MaakuntaVarit
// (webin tiedostot: curl https://media.matkakirja.app/julisteet/pallo/maakunnat/2026-09-25a/<ISO>.json);
// ilman ympäristömuuttujia oikean aineiston testit ohitetaan.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja;
using Matkakirja.Linssit.Maat;
using Matkakirja.Peli;

namespace Matkakirja.Kartta.Testit
{
    static class MaakuntaVaritTestit
    {
        static HashSet<int> S(params int[] x) => new HashSet<int>(x);

        [Testi]
        static void VaritysKutenWebissa()
        {
            // Tähti: keskus (aste 3) ensin → 0, sakarat 1; sakaroiden välinen raja 1–2 → 2 saa 2.
            var n = new List<HashSet<int>> { S(3), S(2, 3), S(1, 3), S(0, 1, 2) };
            var v = Maakuntajako.Varita(n);
            Oleta.Sama("1,1,2,0", string.Join(",", v));
            // Saman asteen alueet etusijan mukaan (webissä piirrejärjestys): 2 ennen 1:tä.
            v = Maakuntajako.Varita(n, new[] { 0, 5, 1, 0 });
            Oleta.Sama("1,2,1,0", string.Join(",", v));
            // Eristetyt alueet (saaret) 0.
            Oleta.Sama("0,0", string.Join(",", Maakuntajako.Varita(new List<HashSet<int>> { S(), S() })));
        }

        static Maa Neliö(string id, double x0, double y0, double x1, double y1) => new Maa
        {
            Id = id,
            Renkaat = new List<(double, double)[]> { new[] { (x0, y0), (x1, y0), (x1, y1), (x0, y1), (x0, y0) } },
        };

        [Testi]
        static void NaapuritJaetuistaJanoista()
        {
            // a | b vierekkäin, c vain kulmassa b:n kanssa (ei yhteistä janaa → ei naapuri), d kaukana.
            var alueet = new List<Maa>
            {
                Neliö("a", 0, 0, 1, 1), Neliö("b", 1, 0, 2, 1), Neliö("c", 2, 1, 3, 2), Neliö("d", 10, 10, 11, 11),
            };
            var n = Maakuntajako.Naapurit(alueet);
            Oleta.Tosi(n[0].SetEquals(S(1)) && n[1].SetEquals(S(0)) && n[2].Count == 0 && n[3].Count == 0,
                string.Join(" | ", n.ConvertAll(x => string.Join(",", x))));
        }

        [Testi]
        static void HaiveEaseOut()
        {
            Oleta.Sama(0.0, Maakuntajako.Haive(0));
            Oleta.Tosi(Math.Abs(Maakuntajako.Haive(0.13) - 0.75) < 1e-9, "puolivälissä 1 − 0,5² = 0,75");
            Oleta.Sama(1.0, Maakuntajako.Haive(0.26));
            Oleta.Sama(1.0, Maakuntajako.Haive(5));
        }

        static double Lin(double c) => NimiLadonta.Lineaarinen(c);

        [Testi]
        static void TayttoVastaaWebinSekoitusta()
        {
            var pohja = NimiLadonta.PohjaMaa;
            for (int vari = 0; vari < 5; vari++)
                foreach (bool valittu in new[] { false, true })
                {
                    // Gamma-tilassa webin arvot sellaisenaan.
                    var g = Maakuntajako.Taytto(vari, valittu, false);
                    var p = Maakuntajako.Paletti[vari];
                    double k = valittu ? 0.62 / 0.34 : 1;
                    Oleta.Tosi(Math.Abs(g.R - Math.Min(1, p[0] * k)) < 1e-12 && g.A == 0.34, $"gamma {vari} {valittu}");
                    // Lineaarisena: paletti tallennetaan 8-bittisenä (sRGB-väri, lineaarinen alfa), GPU sekoittaa lineaarisesti.
                    var t = Maakuntajako.Taytto(vari, valittu, true);
                    double a = Math.Round(t.A * 255) / 255;
                    double[] c = { t.R, t.G, t.B };
                    double[] w = { g.R, g.G, g.B };
                    for (int i = 0; i < 3; i++)
                    {
                        double ci = Lin(Math.Round(c[i] * 255) / 255);
                        double natiivi = ci * a + Lin(pohja[i]) * (1 - a);
                        double web = Lin(0.34 * w[i] + 0.66 * pohja[i]);
                        // Alle puolen 8-bittisen askeleen näytöllä (sRGB).
                        double ero = Math.Abs(Math.Pow(natiivi, 1 / 2.2) - Math.Pow(web, 1 / 2.2)) * 255;
                        Oleta.Tosi(ero < 0.75, $"vari {vari} valittu {valittu} kanava {i}: ero {ero:0.00}");
                    }
                    Oleta.Tosi(t.A >= 0.34 && t.A < 0.6, $"alfa {t.A:0.000}");
                }
        }

        // ---- Oikea aineisto ja webin värinumerot ----

        [Testi]
        static void OikeaVaritWebinMukaan()
        {
            var polku = Environment.GetEnvironmentVariable("MAAKUNTARAJAT");
            var web = Environment.GetEnvironmentVariable("MAAKUNNAT_WEB");
            if (string.IsNullOrEmpty(polku) || !File.Exists(polku)) { Console.WriteLine("      (ohitettu: MAAKUNTARAJAT puuttuu)"); return; }
            var j = Maakuntajako.Lue(MiniJson.Jasenna(File.ReadAllText(polku)));
            int alueita = 0, maksimi = 0;
            foreach (var m in j.Maat.Values)
            {
                Oleta.Tosi(m.Varit != null && m.Varit.Length == m.Alueet.Count, m.Iso3);
                var n = Maakuntajako.Naapurit(m.Alueet);
                for (int i = 0; i < n.Count; i++)
                {
                    foreach (int k in n[i]) Oleta.Tosi(m.Varit[i] != m.Varit[k], $"{m.Alueet[i].Id} ja {m.Alueet[k].Id} samaa sävyä");
                    maksimi = Math.Max(maksimi, m.Varit[i]);
                }
                alueita += m.Alueet.Count;
            }
            Console.WriteLine($"      {j.Maat.Count} maata, {alueita} aluetta, värejä {maksimi + 1}, laskettu {j.VaritLaskettu} maalle");
            Oleta.Tosi(maksimi < Maakuntajako.Paletti.Length, $"värejä {maksimi + 1}");
            if (string.IsNullOrEmpty(web) || !Directory.Exists(web)) { Console.WriteLine("      (webin vertailu ohitettu: MAAKUNNAT_WEB puuttuu)"); return; }

            // Webin <ISO>.json: alueet[] webin järjestyksessä (tunnus, vari). Naapuruus on sama, jos webin järjestyksellä
            // (saman asteen etusija) tulee täsmälleen webin väri; tunnusjärjestyksellä (kokoelma) osa eroaa.
            int samaWebJarjestyksella = 0, samaNyt = 0, verrattu = 0, maitaNyt = 0;
            var eroavat = new List<string>();
            foreach (var m in j.Maat.Values)
            {
                var tiedosto = Path.Combine(web, m.Iso3 + ".json");
                if (!File.Exists(tiedosto)) continue;
                var juuri = MiniJson.Jasenna(File.ReadAllText(tiedosto)) as Dictionary<string, object>;
                var webVari = new Dictionary<string, int>();
                var webIndeksi = new Dictionary<string, int>();
                int ix = 0;
                foreach (var o in (List<object>)juuri["alueet"])
                {
                    var d = (Dictionary<string, object>)o;
                    string id = m.Iso3 + ":" + (string)d["tunnus"];
                    webVari[id] = (int)(double)d["vari"];
                    webIndeksi[id] = ix++;
                }
                var etusija = m.Alueet.ConvertAll(a => webIndeksi.TryGetValue(a.Id, out var x) ? x : int.MaxValue);
                var v = Maakuntajako.Varita(Maakuntajako.Naapurit(m.Alueet), etusija);
                bool kaikki = true;
                for (int i = 0; i < m.Alueet.Count; i++)
                {
                    if (!webVari.TryGetValue(m.Alueet[i].Id, out int wv)) continue;
                    verrattu++;
                    if (v[i] == wv) samaWebJarjestyksella++;
                    if (m.Varit[i] == wv) samaNyt++; else kaikki = false;
                }
                if (kaikki) maitaNyt++;
                else if (m.Iso3 == "FRA" || m.Iso3 == "JPN") eroavat.Add(m.Iso3);
            }
            Console.WriteLine($"      webiin verrattu {verrattu} aluetta: webin järjestyksellä {samaWebJarjestyksella} samaa, " +
                              $"kokoelman järjestyksellä {samaNyt} samaa ({maitaNyt} maata kokonaan); FRA/JPN eroaa: {string.Join(" ", eroavat)}");
            Oleta.Sama(verrattu, samaWebJarjestyksella, "naapuruus kuten webissä");
        }
    }
}
