// LENTOPELI UNITY-PUOLI (Linssiseppä 1.10.2026, vaihe 1 -proto): Nappula.Lentopeli.cs ja LentopeliNakyma.cs eivät käänny tässä
// ajurissa, joten testit lukevat lähdekoodin tekstinä: kamera alle 20 km (suunnitelma kohta 7.7), pallon eleet pois lennon
// ajaksi ja takaisin purussa, ohjain LINSSIN OHJAIN -pohjalla (teema LASI) ja komennot.
using System;
using System.IO;
using System.Text.RegularExpressions;

namespace Matkakirja.Kartta.Testit
{
    static class LentopeliUnityTestit
    {
        static string Lue(string polku) => File.ReadAllText(Path.Combine("..", polku));
        static string Nappula => Lue("Assets/Matkakirja/Kartta/Nappula.Lentopeli.cs");

        static double Vakio(string lahde, string nimi)
        {
            var m = Regex.Match(lahde, nimi + @"\s*=\s*([0-9.]+)");
            Oleta.Tosi(m.Success, "vakio puuttuu: " + nimi);
            return double.Parse(m.Groups[1].Value, System.Globalization.CultureInfo.InvariantCulture);
        }

        [Testi]
        static void KameraAinaAlle20Km()
        {
            var s = Nappula;
            double e = Vakio(s, "LpKameraEtaisyysM"), kulma = Vakio(s, "LpKameraKorkeuskulma");
            // Korkein rengas 5 km; autopilotti ei nouse sen yli. Kameran korkeus = kone + e · sin(kulma).
            double korkein = Lentopeli.RengasMaksKorkeus * 1000.0 + e * Math.Sin(kulma * Math.PI / 180.0);
            Oleta.Tosi(korkein < 20000.0, $"kamera {korkein:0} m");
            Oleta.Tosi(e >= 30000.0 && e <= 40000.0, "etäisyys 30–40 km (suunnitelma kohta 5)");
            double theta = Vakio(s, "LpKameraTheta");
            Oleta.Tosi(theta >= 25.0 && theta <= 35.0, "θ 25–35° takaa vasemmalta");
        }

        [Testi]
        static void EleetPoisJaTakaisin()
        {
            var s = Nappula;
            Oleta.Tosi(s.Contains("kierto.SyoteEstetty = true"), "pallon eleet pois lennon ajaksi");
            Oleta.Tosi(Regex.IsMatch(s, @"void LpPurku\(\)[\s\S]*kierto\.SyoteEstetty = false"), "purku palauttaa eleet");
            Oleta.Tosi(Regex.IsMatch(s, @"void LpPurku\(\)[\s\S]*LentopeliVaihtui\?\.Invoke\(false\)"), "purku piilottaa ohjaimen");
            Oleta.Tosi(s.Contains("kaytava?.Peru()"), "käytävän esilataus perutaan lopussa");
        }

        [Testi]
        static void NimiotJaMallitPoisLennolta()
        {
            var s = Nappula;
            Oleta.Tosi(s.Contains("NostoKerros.LentopeliPiilottaa = true") && Regex.IsMatch(s, @"void LpPurku\(\)[\s\S]*LentopeliPiilottaa = false"),
                "nostojen nimiöt pois lennon ajaksi ja takaisin");
            Oleta.Tosi(!s.Contains("maamerkit.Nayta("), "zoomin mukaan skaalautuva maamerkkimalli ei lennolla");
            foreach (var k in new[] { "aariviiva", "rannikko", "rajat" })
                Oleta.Tosi(s.Contains($"Nakyvyys(\"{k}\", false)") && s.Contains($"Nakyvyys(\"{k}\", true)"), k + " pois lennolta ja takaisin");
            Oleta.Tosi(Lue("Assets/Matkakirja/Kartta/Symbolimallit.cs").Contains("&& Nappula.Lentopelissa == null"), "symbolimallit pois lennolta");
            Oleta.Tosi(Lue("Assets/Matkakirja/UI/Kutsuminiatyyri.cs").Contains("Nappula.Lentopelissa != null"), "avauskortin kutsu pois lennolta");
            var nk = Lue("Assets/Matkakirja/Kartta/NostoKerros.cs");
            Oleta.Tosi(nk.Contains("if (LentopeliPiilottaa) nimet = false;") && nk.Contains("&& !LentopeliPiilottaa;"), "nostot ja nimiöt pois lennon ajaksi");
        }

        [Testi]
        static void LatausodotusKutenLentoV3()
        {
            // Päätoimittaja 2.10.: lento alkaa vasta, kun lähialue ≥ 98 % ja Cesium tasaantunut; taustajono tauolla lennon ajan,
            // ennakkokamera koneen edessä; kaikki puretaan lopussa.
            var s = Nappula;
            Oleta.Tosi(s.Contains("LpLahialueKynnys = 0.98f") && s.Contains("Valmius.Tasaantunut(ehto,"), "kynnys 98 % ja tasaantuminen");
            Oleta.Tosi(s.Contains("Laattapalvelin.AsetaSaapumistila(LpTaukoSyy, true)")
                       && Regex.IsMatch(s, @"void LpPurku\(\)[\s\S]*AsetaSaapumistila\(LpTaukoSyy, false\)"), "taustajono tauolle ja takaisin");
            Oleta.Tosi(s.Contains("LpEnnakko(t, kamera)") && Regex.IsMatch(s, @"void LpPurku\(\)[\s\S]*EnnakkoPois\(\)"), "ennakkokamera ja purku");
            int odotus = s.IndexOf("LATAUSODOTUS"), leikkaus = s.IndexOf("V3Tapahtuma(\"leikkaus\")");
            Oleta.Tosi(odotus > 0 && leikkaus > odotus, "moottori kiihtyy (leikkaus) vasta odotuksen jälkeen");
        }

        [Testi]
        static void OhjainPohjallaJaKomennot()
        {
            var n = Lue("Assets/Matkakirja/UI/Linssit/LentopeliNakyma.cs");
            Oleta.Tosi(n.Contains("Pohja: LINSSIN OHJAIN") && n.Contains("tk-teema-lasi"), "LINSSIN OHJAIN -pohja, teema LASI");
            Oleta.Tosi(Lue("Assets/Matkakirja/UI/Linssit/LinssiUi.cs").Contains("new LentopeliNakyma(kerros)"), "ohjain luodaan");
            // Kaasuvipu (omistajan speksi): pystyliuku oikeassa reunassa, nuppi teeman toiminto-värillä, ei kaasuriviä ohjaimessa.
            Oleta.Tosi(n.Contains("\"mk-lento-vipu\"") && !n.Contains("mk-lento__kytkin"), "kaasuvipu, ei pykäläriviä");
            var uss = Lue("Assets/Matkakirja/UI/Resources/MatkakirjaUI/Pohjat/Pinnat/lentopeli.uss");
            Oleta.Tosi(Regex.IsMatch(uss, @"\.mk-lento-vipu__nuppi \{[^}]*background-color: var\(--tk-toiminto\)"), "nuppi toiminto-värillä");
            var k = Lue("Assets/Matkakirja/Kartta/Komennot.cs");
            foreach (var c in new[] { "\"aloita\"", "\"pois\"", "\"kaasu\"", "\"auto\"", "\"sauva\"", "\"irti\"" })
                Oleta.Tosi(Regex.IsMatch(k, @"a == " + Regex.Escape(c)), "komento " + c);
        }
    }
}
