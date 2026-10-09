// OSM-lamput yövaloissa (Linssiseppä 10.10.2026, PT: yövalot 174/175 ilman lisämuistia): Karttasepän OSM-lamput vesimaskin vapaissa
// kanavissa (tyokalut/yovalot_lamput.py: R vesi, G lamppu, B paikka solussa, A valaistu alue).
using System;
using System.IO;
using System.IO.Compression;

namespace Matkakirja.Linssit.Testit
{
    public static class YovalotLamputTestit
    {
        static string Polku(params string[] o) => Path.Combine(AppContext.BaseDirectory, "..", "..", Path.Combine(o));

        /// <summary>RGBA-PNG (suodatin 0) → (leveys, korkeus, pikselit).</summary>
        static (int w, int h, byte[] px) Lue(byte[] b)
        {
            int w = (b[16] << 24) | (b[17] << 16) | (b[18] << 8) | b[19], h = (b[20] << 24) | (b[21] << 16) | (b[22] << 8) | b[23];
            var idat = new MemoryStream(); int i = 8;
            while (i < b.Length)
            {
                int n = (b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3];
                if (b[i + 4] == 'I' && b[i + 5] == 'D' && b[i + 6] == 'A' && b[i + 7] == 'T') idat.Write(b, i + 8, n);
                i += 12 + n;
            }
            idat.Position = 0; var raaka = new MemoryStream();
            using (var z = new ZLibStream(idat, CompressionMode.Decompress)) z.CopyTo(raaka);
            var r = raaka.ToArray(); var px = new byte[w * h * 4];
            for (int y = 0; y < h; y++) { Oleta.Tosi(r[y * (w * 4 + 1)] == 0, "suodatin 0"); Array.Copy(r, y * (w * 4 + 1) + 1, px, y * w * 4, w * 4); }
            return (w, h, px);
        }

        [Testi] static void MaskeissaLamputJaVesi()
        {
            foreach (var (id, vahintaan) in new[] { ("pariisi", 50000), ("tukholma", 20000) })
            {
                var b = File.ReadAllBytes(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Elava", $"vesi-{id}-maski.bytes"));
                Oleta.Tosi(b[24] == 8 && b[25] == 6, id + ": RGBA-PNG (värityyppi 6 → KaupunkiYovalot tunnistaa lamput)");
                var (w, h, px) = Lue(b);
                Oleta.Tosi(w == 1536 && h == 1536, id + ": 1536², 8 m (VesiSivuM 12 288)");
                int lamput = 0, vesi = 0, vaaraB = 0;
                for (int i = 0; i < w * h; i++)
                {
                    if (px[i * 4] > 0) vesi++;
                    if (px[i * 4 + 1] == 255) lamput++;
                    else if (px[i * 4 + 1] != 0 || px[i * 4 + 2] != 0) vaaraB++;
                }
                Oleta.Tosi(lamput >= vahintaan, $"{id}: lamppuja {lamput} ≥ {vahintaan}");
                Oleta.Tosi(vesi > w * h / 100, $"{id}: vettä {vesi}");
                Oleta.Tosi(vaaraB == 0, $"{id}: G on 0 tai 255, B vain lampun soluissa ({vaaraB})");
            }
        }

        [Testi] static void VarjostinJaTunnistus()
        {
            string s = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "KaupunkiYovalot.shader"));
            string c = File.ReadAllText(Polku("Assets", "Matkakirja", "Linssit", "Unity", "KaupunkiYovalot.cs"));
            Oleta.Tosi(s.Contains("float3 OsmLamput(float2 vuv, float sadeM)") && s.Contains("_LamppuParam") && s.Contains("!osmL"), "varjostin: OSM-lamput korvaavat solukon maskin alueella");
            Oleta.Tosi(c.Contains("ta.bytes[25] == 6") && c.Contains("TextureFormat.RGBA32, true, true"), "RGBA-tunnistus ja lineaarinen tekstuuri (B ja A ilman sRGB:tä)");
            Oleta.Tosi(c.Contains("LoadImage(ta.bytes, true)"), "ei CPU-kopiota (muisti)");
        }
    }
}
