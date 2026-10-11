// HOUKUTTIMET KARTALLA (Kartta/Houkuttimet.cs; omistaja 11.10.2026, juna 182): houkutinlista, värit tyylikirjan tokeneista,
// piirtojärjestys hunnun päällä ja näkyvyys kaikilla korkeuksilla (myös koko Euroopan loitonnuksessa).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja;
using Matkakirja.Peli;

namespace Matkakirja.Kartta.Testit
{
    static class HoukuttimetTestit
    {
        // Houkutinkaupunkien paikat (lat, lon; laudan kaupungit, Alpit alueen pisteenä).
        static readonly Dictionary<string, (double Lat, double Lon)> Paikat = new Dictionary<string, (double, double)>
        {
            ["alpit"] = (46.5, 9.8), ["lontoo"] = (51.507, -0.128), ["edinburgh"] = (55.953, -3.188), ["istanbul"] = (41.008, 28.978),
            ["amsterdam"] = (52.37, 4.895),
        };

        [Testi]
        static void HoukutinLista()
        {
            var linssit = Houkuttimet.Lista.Where(h => h.Laji == Houkuttimet.Laji.Linssi && !h.Vapaa).Select(h => h.Id).ToArray();
            Oleta.Tosi(linssit.SequenceEqual(new[] { "alpit", "lontoo", "edinburgh", "istanbul", "amsterdam" }), "linssikaupungit: " + string.Join(",", linssit));
            // Lautapeleihin ei värikorostusta (omistaja 11.10. 17.1x): Berliini ja Ateena eivät ole houkuttimia.
            Oleta.Tosi(Houkuttimet.LajiTunnukselle("berliini") == null && Houkuttimet.LajiTunnukselle("ateena") == null, "lautapelikaupungit ilman houkutinta");
            // Olavinlinna (NUI-jako): vapaa sininen piste, ei laudan kaupunki (ei napautusta), paikka 61,8639 N 28,9011 E.
            var olavi = Houkuttimet.Lista.Single(h => h.Laji == Houkuttimet.Laji.Videopeli);
            Oleta.Tosi(olavi.Id == "olavinlinna" && olavi.Vapaa && Math.Abs(olavi.Lat - 61.8639) < 1e-9 && Math.Abs(olavi.Lon - 28.9011) < 1e-9, "Olavinlinna " + olavi);
            Oleta.Tosi(Houkuttimet.LajiKaupungille("olavinlinna") == null && Houkuttimet.LajiTunnukselle("olavinlinna") == Houkuttimet.Laji.Videopeli,
                       "Olavinlinna ei ole kaupunki (ei napautusta)");
            Oleta.Tosi(Houkuttimet.Token(Houkuttimet.Laji.Videopeli) == Houkuttimet.PeliToken, "Olavinlinna videopelien sinisellä");
            Oleta.Tosi(Houkuttimet.Lista.Length == 7 && Houkuttimet.Lista.Count(h => !h.Vapaa) == 5, "7 houkutinta: 5 linssiä, Olavinlinna, Andøya");
            var andoya = Houkuttimet.Lista.First(h => h.Id == "andoya");
            Oleta.Tosi(andoya.Vapaa && andoya.Laji == Houkuttimet.Laji.Linssi && Math.Abs(andoya.Lat - 69.2944) < 1e-9 && Math.Abs(andoya.Lon - 16.0206) < 1e-9
                && Houkuttimet.LajiKaupungille("andoya") == null, "Andøya vapaa violetti piste " + andoya);
            Oleta.Tosi(Houkuttimet.Lista.Select(h => h.Id).Distinct().Count() == Houkuttimet.Lista.Length, "tunnukset yksilöllisiä");
            Oleta.Tosi(Houkuttimet.LajiKaupungille("alpit") == Houkuttimet.Laji.Linssi && Houkuttimet.LajiKaupungille("ateena") == null
                       && Houkuttimet.LajiKaupungille("pariisi") == null && Houkuttimet.LajiKaupungille(null) == null, "laji kaupungille");
            foreach (var h in Houkuttimet.Lista) Oleta.Tosi(!string.IsNullOrEmpty(h.Kohde), h.Id + ": kohde");
        }

        [Testi]
        static void VaritTyylikirjanTokeneista()
        {
            var tk = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText("../tyylikirja/tyylikirja.json")));
            string linssi = MiniJson.Teksti(MiniJson.Objekti(tk["erikois"]), "linssi-hehku");
            string peli = MiniJson.Teksti(MiniJson.Objekti(MiniJson.Objekti(tk["teemat"])["videopeli"]), "korostus");
            Oleta.Tosi(linssi == "#b57bff", "erikois.linssi-hehku " + linssi);
            Oleta.Tosi(peli == "#7fc4ff", "teemat.videopeli.korostus " + peli);
            Oleta.Tosi(Houkuttimet.LinssiToken == "--tk-erikois-linssi-hehku" && Houkuttimet.PeliToken == "--tk-videopeli-korostus", "tokenien nimet");
            // Generoidut natiivitiedostot: USS-muuttujat ja Tyylikirja.cs-arvot.
            string uss = File.ReadAllText("../Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss");
            Oleta.Tosi(uss.Contains(Houkuttimet.LinssiToken + ": #b57bff;") && uss.Contains(Houkuttimet.PeliToken + ": #7fc4ff;"), "Tyylikirja.uss");
            string cs = File.ReadAllText("../Assets/Matkakirja/UI/Tyylikirja.cs");
            Oleta.Tosi(cs.Contains("LinssiHehku = new Color32(181, 123, 255, 255)"), "Tyylikirja.Erikois.LinssiHehku");
            Oleta.Tosi(cs.Contains("Videopeli = new Teema(\"videopeli\"") && cs.Contains("new Color32(127, 196, 255, 255)"), "Tyylikirja.Videopeli.Korostus");
            // Värit annetaan vain tokeneista (UI/HoukutinVarit.cs), ei literaaleja.
            string varit = File.ReadAllText("../Assets/Matkakirja/UI/HoukutinVarit.cs");
            Oleta.Tosi(varit.Contains("= Tyylikirja.Erikois.LinssiHehku;") && varit.Contains("= Tyylikirja.Videopeli.Korostus;"), "HoukutinVarit tokeneista");
            Oleta.Tosi(!varit.Contains("new Color"), "ei värilitteraaleja");
        }

        [Testi]
        static void HunnunPaalla()
        {
            // Huntu on Cesiumin laattojen raster-kerros (geometriajono); pisteen varjostin on Transparent+1.
            string piste = File.ReadAllText("../Assets/Matkakirja/Shaders/Piste.shader");
            Oleta.Tosi(piste.Contains("\"Queue\" = \"Transparent+1\"") && Houkuttimet.PisteJono == 3000 + 1, "pisteen jono");
            Oleta.Tosi(Houkuttimet.HunnunPaalla(Houkuttimet.PisteJono) && Houkuttimet.HunnunPaalla(Houkuttimet.HehkuJono), "piste ja hehku hunnun päällä");
            Oleta.Tosi(!Houkuttimet.HunnunPaalla(Houkuttimet.LaattaJono), "laatat eivät");
            // Näkyvyys ei riipu korkeudesta, maasta eikä pelin rajauksesta: vain merkit päällä, portti ja linssin suodatin.
            Oleta.Tosi(Houkuttimet.Nakyy(true, false, true), "näkyy");
            // Kalusteiden laatikot eivät piilota houkutinta (PT 15.5x, iPhonen Eurooppa); tavallisen merkin kyllä, linssissä kaikkien.
            Oleta.Tosi(!Houkuttimet.KalusteetPiilottavat(true, false) && Houkuttimet.KalusteetPiilottavat(false, false)
                       && Houkuttimet.KalusteetPiilottavat(true, true), "kalusteet eivät piilota houkutinta");
            Oleta.Tosi(!Houkuttimet.Nakyy(false, false, true) && !Houkuttimet.Nakyy(true, true, true) && !Houkuttimet.Nakyy(true, false, false), "piiloon vain merkit pois, portti tai linssin suodatin");
        }

        [Testi]
        static void NakyvatKaikillaKorkeuksilla()
        {
            // Koko Euroopan loitonnuksen katolla jokainen houkutin on kuvassa jokaisella laitteella (ja siis lähempänä oma seutunsa).
            foreach (var l in EurooppaLoitonnusTestit.Laitteet)
            {
                double a = l.W / l.H, R = EurooppaLoitonnusTestit.R;
                double katto = EurooppaLoitonnus.Katto(2_200_000, EurooppaLoitonnus.SovitusKorkeus(EurooppaLoitonnusTestit.Fov, a) * R, EurooppaLoitonnusTestit.KokoPallo(a));
                foreach (var h in Houkuttimet.Lista)
                {
                    var p = h.Vapaa ? (h.Lat, h.Lon) : Paikat[h.Id];
                    Oleta.Tosi(EurooppaLoitonnus.Euroopassa(p.Lat, p.Lon), h.Id + " Euroopassa");
                    Oleta.Tosi(EurooppaLoitonnusTestit.Kuvassa(p.Lat, p.Lon, katto / R, a), $"{l.Nimi}: {h.Id} kuvassa katolla {katto / 1000:0} km");
                }
            }
            // Syke: hidas ja rajattu; levossa (voima 0) keskiasento.
            for (double t = 0; t < 10; t += 0.25)
            {
                double k = Houkuttimet.Koko(t, 1), hk = Houkuttimet.HehkunKoko(t, 1), hp = Houkuttimet.HehkunPeitto(t, 1);
                Oleta.Tosi(k >= Houkuttimet.KokoKerroin * (1 - Houkuttimet.SykeOsuus) - 1e-9 && k <= Houkuttimet.KokoKerroin * (1 + Houkuttimet.SykeOsuus) + 1e-9, $"koko {t}: {k}");
                Oleta.Tosi(hk > 1 && hp > 0 && hp < 0.5, $"hehku {t}: {hk} {hp}");
                Oleta.Tosi(Houkuttimet.Koko(t, 0) == Houkuttimet.KokoKerroin && Houkuttimet.HehkunPeitto(t, 0) == Houkuttimet.HehkuPeitto, "levossa keskiasento");
            }
            Oleta.Tosi(Houkuttimet.JaksoS >= 2.4, "hidas sykähdys");
        }

        [Testi]
        static void PisteetPienetKaikillaTasoilla()
        {
            // Omistaja 16.0x: ydinpiste tavallisen kaupunkipisteen kokoinen, halo hento (ala alle kolmannes entisestä 3,6 × pisteestä).
            Oleta.Tosi(Houkuttimet.KokoKerroin == 1.0, "ydin = tavallinen piste");
            double haloMax = Houkuttimet.HehkuKerroin * Houkuttimet.KokoKerroin * (1 + Houkuttimet.SykeOsuus);
            Oleta.Tosi(haloMax * haloMax <= (2.4 * 1.5) * (2.4 * 1.5) / 3, $"halo {haloMax:0.00} × piste ≤ kolmannes alasta");
            Oleta.Tosi(Houkuttimet.HehkuPeitto <= 0.25, "hento hehku");
            // Pisteet eivät kasva loitonnettaessa: mittakerroin ei koskaan yli 1 ja pienenee (tai pysyy) zoomikertoimen pienetessä.
            double edellinen = double.MaxValue;
            foreach (double zoom in new[] { 64.0, 8, 2, 1, 0.8, 0.5, 0.3, 0.2, 0.134, 0.05 })
            {
                double k = Houkuttimet.PisteenMittakerroin(zoom);
                Oleta.Tosi(k <= 1.0 && k <= edellinen && k >= Houkuttimet.PisteMinOsuus, $"zoom {zoom}: {k}");
                edellinen = k;
            }
            Oleta.Tosi(Houkuttimet.PisteenMittakerroin(1) == 1 && Houkuttimet.PisteenMittakerroin(double.NaN) == 1, "saapumisnäkymässä peruskoko");
            // iPhone (@3x): Suomen saapumisnäkymä 9 pt = 27 px; koko Euroopan näkymä (maan katto 1820 km / 13 579 km) pienempi.
            double eur = Houkuttimet.PisteenMittakerroin(1820.0 / 13579.0);
            Oleta.Tosi(9 * 3 * eur < 9 * 3 && 13 * 3 * eur <= 18, $"Euroopassa {9 * 3 * eur:0} / {13 * 3 * eur:0} px");
            // PT 16.5x: houkuttimen ydin Euroopassa 9–10 pt, ei koskaan yli oman saapumiskoon; hehku ≤ 2 × ydin.
            foreach (double oma in new[] { 9.0, 13.0 })
            {
                double ydinEur = Houkuttimet.YtimenKokoPt(oma, eur), ydinSuomi = Houkuttimet.YtimenKokoPt(oma, 1);
                Oleta.Tosi(ydinEur >= 9 && ydinEur <= 10, $"ydin Euroopassa {ydinEur} pt (oma {oma})");
                Oleta.Tosi(ydinSuomi == oma && ydinEur <= ydinSuomi, $"ydin Suomessa {ydinSuomi} pt");
                double ed = double.MaxValue;
                foreach (double z in new[] { 4.0, 1, 0.6, 0.3, 0.134 })
                {
                    double y = Houkuttimet.YtimenKokoPt(oma, Houkuttimet.PisteenMittakerroin(z));
                    Oleta.Tosi(y <= ed, $"ydin ei kasva loitonnettaessa ({oma}, zoom {z})"); ed = y;
                }
            }
            Oleta.Tosi(haloMax <= 2.0, $"hehku ≤ 2 × ydin ({haloMax:0.00})");
            Console.WriteLine($"  houkuttimet iPhone: Suomi 27 / 39 px, Eurooppa {9 * 3 * eur:0} / {13 * 3 * eur:0} px, halo enintään {haloMax:0.00} × piste");
        }
    }
}
