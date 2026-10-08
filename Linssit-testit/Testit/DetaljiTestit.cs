// Detaljikartat (LR 8.10., juna 169): rakennus.json:n juuren "detaljit" pintanimen mukaan.
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Testit
{
    public static class DetaljiTestit
    {
        const string Fixture = @"{
          ""id"": ""detalji-testi"", ""nimi"": ""Detaljit"", ""versio"": 1,
          ""detaljit"": {
            ""kivi"": { ""albedo"": ""blender/materiaalit/kivi-albedo.jpg"", ""normaali"": ""blender/materiaalit/kivi-normaali.jpg"",
                        ""karheus"": ""blender/materiaalit/kivi-karheus.jpg"", ""astc"": { ""albedo"": ""blender/materiaalit/kivi-albedo-4x4.astcm"" },
                        ""m"": 1.2, ""voima"": 0.7 },
            ""puu"": { ""albedo"": ""blender/materiaalit/puu-albedo.jpg"", ""voima"": 3 }
          }
        }";

        [Testi] static void DetaljitPinnoittain()
        {
            var r = DioraamaData.Lue(Fixture);
            Oleta.Sama(2, r.Detaljit.Count);
            var k = r.Detaljit["kivi"];
            Oleta.Tosi(k.Albedo.EndsWith("kivi-albedo.jpg") && k.Normaali != null && k.Karheus != null, "kivi: kolme karttaa");
            Oleta.Tosi(k.AstcAlbedo != null && k.AstcNormaali == null, "kivi: ASTC vain albedolle");
            Oleta.Tosi(System.Math.Abs(k.M - 1.2) < 1e-9 && System.Math.Abs(k.Voima - 0.7) < 1e-9, "kivi: m 1,2, voima 0,7");
            var p = r.Detaljit["puu"];
            Oleta.Tosi(System.Math.Abs(p.M - 1.5) < 1e-9 && System.Math.Abs(p.Voima - 1) < 1e-9 && p.Normaali == null, "puu: oletus-m, voima rajattu 1:een");
            Oleta.Sama(0, DioraamaData.Lue(@"{ ""id"": ""x"", ""nimi"": ""x"", ""versio"": 1 }").Detaljit.Count);
            // LR v45l: osoitin erilliseen tiedostoon.
            var o = DioraamaData.Lue(@"{ ""id"": ""x"", ""nimi"": ""x"", ""versio"": 1, ""detaljit"": ""blender/materiaalit/detaljit.json"" }");
            Oleta.Sama("blender/materiaalit/detaljit.json", o.DetaljitTiedosto);
            DioraamaData.LueDetaljitTiedosto(@"{ ""versio"": 1, ""koodaus"": ""lineaarinen"", ""detaljit"": { ""kivi"": { ""albedo"": ""a.jpg"", ""astc"": { ""albedo"": ""a-6x6.astcm"", ""normaali"": ""n-6x6.astcm"", ""karheus"": ""k-6x6.astcm"" }, ""m"": 1.5, ""voima"": 0.6, ""lahde"": ""x"", ""lisenssi"": ""CC0"" } } }", o);
            Oleta.Tosi(o.Detaljit.TryGetValue("kivi", out var ok) && ok.AstcKarheus == "k-6x6.astcm", "erillinen tiedosto jäsennetty");
        }

        [Testi] static void KavelyosienValoatlakset()
        {
            // LR v45r: 9 kävelyosalla valoatlas paketin juuresta (blender/kavely/valot/…), ASTC-vastineineen; Tila.ValoVain.
            var d = Matkakirja.Linssit.Testit.Huonesimulaatio.Data;
            int n = 0;
            foreach (var o in d.Osat.Values)
            {
                if (o.ValoAtlas == null) continue;
                var t = new Tila { Id = "kavely:" + o.Id };
                DioraamaData.LueValoAtlas(t, o.ValoAtlas);
                Oleta.Tosi(t.ValoAtlas.StartsWith("blender/kavely/valot/") && t.ValoAtlasAstc != null && t.ValoAtlasPuoli != null, $"{o.Id}: polut paketin juuresta ({t.ValoAtlas})");
                n++;
            }
            Oleta.Sama(9, n);
        }

        [Testi] static void Rekvisiitta()
        {
            // LR v45r: 46 rekvisiittamerkkiä, glb ja osa jokaisella; ei esineiden eikä reittien päällä (sijoittelu LR:n).
            var d = Matkakirja.Linssit.Testit.Huonesimulaatio.Data;
            int n = 0; var ohitetut = new System.Collections.Generic.List<string>();
            foreach (var m in d.Lajia("rekvisiitta"))
            {
                Oleta.Tosi(!string.IsNullOrEmpty(m.Glb) && m.Glb.StartsWith("rekvisiitta-") && m.Glb.EndsWith(".glb") && !string.IsNullOrEmpty(m.Osa), $"{m.Nimi}: glb ja osa");
                if (d.RekvisiittaPeittaa(m)) ohitetut.Add(m.Tunnus);
                n++;
            }
            Oleta.Sama(46, n);
            // Esineen päällä olevat ohitetaan (v45p: kulho 0,11 m tarjottimesta) — v45r: LR siirsi pöytärekvisiitan ≥ r + 0,3 m:n päähän, joten mitään ei ohiteta.
            Oleta.Tosi(ohitetut.Count == 0, "ohitetut: " + string.Join(", ", ohitetut));
            System.Console.WriteLine("      rekvisiitta: ohitetaan esineen päältä " + string.Join(", ", ohitetut));
        }
    }
}
