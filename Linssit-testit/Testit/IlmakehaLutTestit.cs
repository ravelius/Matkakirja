// ILMAKEHÄN TAULUKOT (Linssiseppä 2, 8.10.2026; PT: pallon maisema, kohdat 1–2): Karttasepän LUT-tiedostot (Resources/Ilmakeha) ja
// ilmakeha.json:n näytepisteet. Ensin tekseli täsmälleen (tiedostomuoto, akselijärjestys), sitten fyysisestä syötteestä UV-kaavoilla
// (IlmakehaLut = varjostimen CPU-vertailu): näyte osuu samaan tekseliin, joten tuloksen pitää täsmätä puolitarkkuuden rajoissa.
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Ilmakeha;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class IlmakehaLutTestit
    {
        static string Kansio => Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Ilmakeha");
        static IlmakehaLut lut;
        static IlmakehaLut Lut => lut ??= new IlmakehaLut(File.ReadAllBytes(Path.Combine(Kansio, "lapaisy.bytes")), File.ReadAllBytes(Path.Combine(Kansio, "taivas.bytes")),
            File.ReadAllBytes(Path.Combine(Kansio, "ilmaperspektiivi.bytes")), File.ReadAllBytes(Path.Combine(Kansio, "ilmaperspektiivi-lapaisy.bytes")));

        static System.Collections.Generic.IEnumerable<System.Collections.Generic.Dictionary<string, object>> Naytteet() =>
            MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(Kansio, "ilmakeha.json")))), "naytteet")).Select(MiniJson.Objekti);

        static double[] Luvut(object o) => MiniJson.TaulukkoTaiTyhja(o).Select(x => Convert.ToDouble(x)).ToArray();

        /// <summary>Puolitarkkuuden sallittu ero: suhteellinen 2⁻⁹ + pieni absoluuttinen.</summary>
        static bool Lahella(double a, double b, double suht = 0.004, double abs = 1e-6) => Math.Abs(a - b) <= suht * Math.Max(Math.Abs(a), Math.Abs(b)) + abs;
        static bool Lahella(Rgba x, double[] o, double suht = 0.004, double abs = 1e-6) => Lahella(x.R, o[0], suht, abs) && Lahella(x.G, o[1], suht, abs) && Lahella(x.B, o[2], suht, abs) && Lahella(x.A, o[3], suht, abs);

        [Testi] static void TiedostotJaMitat()
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(Kansio, "ilmakeha.json"))));
            Oleta.Tosi(MiniJson.Luku(j, "R_km") == IlmakehaLut.Rkm && MiniJson.Luku(j, "RT_km") == IlmakehaLut.RTkm && MiniJson.Luku(j, "ap_etaisyys_km") == IlmakehaLut.ApEtaisyysKm, "vakiot jsonin mukaan");
            Oleta.Tosi(Luvut(MiniJson.Kentta(j, "korkeudet_m")).SequenceEqual(IlmakehaLut.TasotM), "korkeustasot");
            Oleta.Tosi(Lut.Taivas.W == 96 && Lut.Taivas.H == 64 && Lut.Taivas.D == 96 && Lut.Ap.D == 96 && Lut.Lapaisy.W == 256, "mitat");
            Oleta.Sama(1f, Taulukko.Puoli(0x3C00), "puoli 1,0"); Oleta.Sama(-2f, Taulukko.Puoli(0xC000), "puoli −2"); Oleta.Sama(5.9604645e-8f, Taulukko.Puoli(0x0001), "puoli pienin");
        }

        [Testi] static void NaytepisteetTekselinaJaFyysisestaSyotteesta()
        {
            int n = 0;
            foreach (var nayte in Naytteet())
            {
                string t = MiniJson.Teksti(nayte, "taulukko"); var tx = Luvut(MiniJson.Kentta(nayte, "tekseli")).Select(x => (int)x).ToArray();
                var odotettu = Luvut(MiniJson.Kentta(nayte, "odotettu")); var s = MiniJson.ObjektiTaiNull(MiniJson.Kentta(nayte, "syote"));
                double K(string k) => MiniJson.Luku(s, k) ?? double.NaN;
                Rgba tekseli, fyys;
                switch (t)
                {
                    case "lapaisy":
                        tekseli = Lut.Lapaisy.Tekseli(tx[0], tx[1]);
                        var (u, v) = IlmakehaLut.LapaisyUv(K("korkeus_m"), K("mu")); fyys = Lut.Lapaisy.Nayte(u, v); break;
                    case "taivas":
                        tekseli = Lut.Taivas.Tekseli(tx[0], tx[1], tx[2]);
                        fyys = Lut.TaivasNayte(K("korkeus_m"), K("katseen_zeniitti_deg") * Math.PI / 180, K("atsimuutti_auringosta_deg") * Math.PI / 180, K("auringon_zeniitti_deg")); break;
                    default:
                        tekseli = Lut.Ap.Tekseli(tx[0], tx[1], tx[2]);
                        fyys = Lut.IlmaperspektiiviNayte(K("korkeus_m"), K("etaisyys_m"), K("cos_gamma"), K("auringon_zeniitti_deg")); break;
                }
                Oleta.Tosi(Lahella(tekseli, odotettu), $"{t} tekseli [{string.Join(",", tx)}]: {tekseli} ≠ ({string.Join(", ", odotettu)})");
                // Syötteestä bilineaarisesti: 2 % tai 1e-4 (radianssi × valotus 30 < 0,003; d = 1 m osuu 7 %:iin seuraavaa tekseliä).
                Oleta.Tosi(Lahella(fyys, odotettu, 0.02, 1e-4), $"{t} syötteestä [{string.Join(",", tx)}]: {fyys} ≠ ({string.Join(", ", odotettu)})");
                n++;
            }
            Oleta.Tosi(n >= 15, $"näytteitä {n}");
        }

        /// <summary>Fysiikan järkevyys: taivas sinisempi kuin punainen päivällä, läpäisy laskee kohti horisonttia ja ilmaperspektiivi kasvaa
        /// etäisyyden mukana (sirontaa enemmän, läpäisy pienempi), ja yöllä (aurinko 100°) taivas on pimeä.</summary>
        [Testi] static void FysiikanSuunnat()
        {
            var paiva = Lut.TaivasNayte(1500, 60 * Math.PI / 180, Math.PI, 40);
            Oleta.Tosi(paiva.B > paiva.R * 1.5, $"päivätaivas sininen {paiva}");
            Oleta.Tosi(Lut.LapaisyNayte(500, 1).R > Lut.LapaisyNayte(500, 0.05).R, "läpäisy pienempi horisonttiin");
            var lahi = Lut.IlmaperspektiiviNayte(1500, 2000, 0, 40); var kauka = Lut.IlmaperspektiiviNayte(1500, 60000, 0, 40);
            Oleta.Tosi(kauka.B > lahi.B && kauka.A < lahi.A, $"kaukana enemmän sirontaa ja vähemmän läpäisyä ({lahi} → {kauka})");
            var yo = Lut.TaivasNayte(1500, 60 * Math.PI / 180, Math.PI, 100);
            Oleta.Tosi(yo.B < paiva.B * 0.01, $"yötaivas pimeä {yo}");
            Oleta.Sama(0.0, Lut.LapaisyNayte(1500, -0.5).R, "maahan osuva läpäisy 0");
        }
    }
}
