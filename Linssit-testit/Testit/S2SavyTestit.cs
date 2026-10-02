// S2-SÄVY VARJOSTIMESSA (Linssiseppä 1.10.2026, S2-erä; Natiivisepän ehdot): tileset-varjostimen _s2Savy sävyttää vain
// S2-suorakulmion, ja globaali nollataan (w = 0) S2:n sammuessa, kyydistä poistuttaessa sekä OnDisable/OnDestroy:ssa,
// jottei kartta peri sävyä. Unity-tiedostot eivät käänny tässä ajurissa, joten testit lukevat lähdekoodin tekstinä.
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Matkakirja.Linssit.Testit
{
    public static class S2SavyTestit
    {
        static string Lue(string polku) => File.ReadAllText(Path.Combine("..", polku));
        static string Kerros => Lue("Assets/Matkakirja/Linssit/Unity/AstronauttiKerros.cs");

        static string Metodi(string lahde, string otsikko)
        {
            int i = lahde.IndexOf(otsikko);
            Oleta.Tosi(i >= 0, "metodi puuttuu: " + otsikko);
            int a = lahde.IndexOf('{', i), syvyys = 0;
            for (int j = a; j < lahde.Length; j++)
            {
                if (lahde[j] == '{') syvyys++;
                else if (lahde[j] == '}' && --syvyys == 0) return lahde.Substring(i, j - i + 1);
            }
            return lahde.Substring(i);
        }

        [Testi]
        static void PainoVainS2nOllessaPaalla()
        {
            var k = Lue("Assets/Matkakirja/Linssit/Unity/Kyytipino.cs");
            Oleta.Tosi(Regex.IsMatch(k, @"s2\s*\?\s*new Vector4\(kontrasti, kyllaisyys, lampo, 1f\)\s*:\s*Vector4\.zero"),
                "S2SavyArvo: w = 1 vain S2:n ollessa päällä, muuten nollavektori");
            Oleta.Tosi(k.Contains("Shader.SetGlobalVector(S2SavyId, S2SavyArvo(S2,"), "AsetaS2Savy asettaa _s2Savy:n S2:n mukaan");
            Oleta.Tosi(!k.Contains("vari.contrast.Override") && !k.Contains("vari.colorFilter.Override"),
                "koko ruudun S2-värisäätö poistettu (sävytti myös BMNG-alueet)");
        }

        [Testi]
        static void GlobaaliNollataanPoistuttaessa()
        {
            var s = Kerros;
            foreach (var m in new[] { "void OnDisable()", "void OnDestroy()" })
            {
                var runko = Metodi(s, m);
                Oleta.Tosi(runko.Contains("Kyytipino.S2 = false") && runko.Contains("Kyytipino.AsetaS2Savy()"), m + " nollaa S2-sävyn");
                Oleta.Tosi(runko.Contains("AsetaS2Reuna(false)"), m + " nollaa S2-reunan");
            }
            var p = Metodi(s, "void PaivitaS2(bool kyydissa)");
            // Kyydistä poistuttaessa halutaan = false → S2 pois; sävy seuraa s2Lisatty-tilaa sekä alussa että muutoksen jälkeen.
            Oleta.Tosi(Regex.Matches(p, @"AsetaS2Savy\(\);").Count >= 2, "PaivitaS2 päivittää sävyn alussa ja muutoksen jälkeen");
            Oleta.Tosi(Regex.IsMatch(p, @"bool halutaan = kyydissa && \(\(S2Kaytossa"), "S2 (ja sävy) vain kyydissä");
            var a = Metodi(s, "void AsetaS2Savy()");
            Oleta.Tosi(a.Contains("Kyytipino.S2 = s2Lisatty"), "sävy päällä vain, kun S2 on pinnalla");
        }

        [Testi]
        static void MuistirajaLaiteluokanMukaan()
        {
            // Natiivisepän ehdot 1.10.: kevyt (≤ iPhone 15 Pro tai ≤ 6144 Mt) z9 + karkeampi rasteri, pallon välimuisti 192/384 Mt
            // S2:n ajaksi ja palautus; kierrätetty kerros saa Cesiumin oletukset takaisin.
            var s = Kerros;
            Oleta.Tosi(s.Contains("SystemInfo.systemMemorySize <= 6144"), "kevyt muistin mukaan");
            Oleta.Tosi(s.Contains("S2ValimuistiMt = 384, S2ValimuistiKevytMt = 192"), "välimuistit 384 / 192 Mt");
            var p = Metodi(s, "void PaivitaS2(bool kyydissa)");
            Oleta.Tosi(p.Contains("kk.RasterinMuisti(S2Kerros") && p.Contains("kk.PallonValimuisti((kevyt"), "S2 lisätään muistirajoin");
            Oleta.Tosi(p.Contains("kk.PallonValimuisti(null);"), "S2:n poistuessa välimuisti palautuu");
            Oleta.Tosi(Metodi(s, "void OnDestroy()").Contains("PallonValimuisti(null)"), "OnDestroy palauttaa välimuistin");
            var kk = Lue("Assets/Matkakirja/Kartta/KarttaKerrokset.cs");
            Oleta.Tosi(kk.Contains("k.maximumScreenSpaceError = 2f; k.maximumTextureSize = 2048; k.subTileCacheBytes = 16L * 1024 * 1024;"),
                "UusiKerros palauttaa rasterin oletukset");
        }

        [Testi]
        static void VarjostinSyotteetJaMaski()
        {
            var py = Lue("Assets/Matkakirja/Shaders/Cesium/Lahde~/tee_tileset.py");
            Oleta.Tosi(py.Contains("slotti(\"Vector4MaterialSlot\", 27, \"s2Savy\""), "syöte 27 = _s2Savy");
            Oleta.Tosi(py.Contains("if (s2Savy.w > 0.0)"), "w = 0 → ennallaan (ei keywordia)");
            Oleta.Tosi(py.Contains("normalize(pos - keski.xyz)"), "maski käyttää _maaKeski-syötettä (15)");
            var g = Lue("Assets/Matkakirja/Shaders/Cesium/MatkakirjaTileset.shadergraph");
            Oleta.Tosi(g.Contains("\"m_DefaultReferenceName\": \"_s2Savy\""), "shadergraphissa _s2Savy-ominaisuus");
            Oleta.Tosi(g.Contains("// S2 TONE"), "RadioHamaran runko sisältää S2-sävyn");
            var ali = Lue("Assets/Matkakirja/Shaders/Cesium/MatkakirjaRasteri.shadersubgraph");
            Oleta.Tosi(ali.Contains("// S2 edge") && ali.Contains("\"m_DefaultReferenceName\": \"_s2Reuna\""), "sekoituksessa S2-reuna (_s2Reuna)");
            Oleta.Tosi(g.Contains("\"m_DefaultReferenceName\": \"_s2Reuna\""), "pääkaaviossa _s2Reuna-ominaisuus");
            Oleta.Tosi(!g.Contains("multi_compile") || Regex.Matches(g, "S2_SAVY").Count == 0, "ei uutta keywordia");
            var slotit = Regex.Matches(g, "\"m_ShaderOutputName\": \"(s2Savy|akseli|nolla|ita)\"").Select(m => m.Groups[1].Value).ToList();
            Oleta.Tosi(slotit.Contains("s2Savy") && slotit.Contains("nolla") && slotit.Contains("ita"), "syötteet 27–30 kaaviossa");
        }
    }
}
