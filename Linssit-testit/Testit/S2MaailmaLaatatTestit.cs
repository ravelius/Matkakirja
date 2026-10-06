// S2-maailma v2 (juna 145): laatat.json-bittikartan luku ja ISS-kuvan mosaiikkilehdet Euroopan ulkopuolella.
using System;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class S2MaailmaLaatatTestit
    {
        static string Json(int zmin, int zmax, Func<int, int, int, bool> onko)
        {
            var sb = new System.Text.StringBuilder("{\"tasot\":{\"min\":" + zmin + ",\"max\":" + zmax + "},\"saatavuus\":{");
            for (int z = zmin; z <= zmax; z++)
            {
                long n = 1L << z; var b = new byte[n * n / 8];
                for (long y = 0; y < n; y++) for (long x = 0; x < n; x++) if (onko(z, (int)x, (int)y)) { long i = y * n + x; b[i >> 3] |= (byte)(1 << (int)(i & 7)); }
                sb.Append(z > zmin ? "," : "").Append('"').Append(z).Append("\":\"").Append(Convert.ToBase64String(b)).Append('"');
            }
            return sb.Append("}}").ToString();
        }

        [Testi]
        static void BittikarttaLuetaanRiviSarakeJarjestyksessa()
        {
            var m = S2MaailmaLaatat.Jasenna(Json(6, 8, (z, x, y) => x == 21 << (z - 6) && y == 32 << (z - 6)));
            Oleta.Tosi(m != null, "jäsennys");
            Oleta.Tosi(m.Onko(6, 21, 32), "z6 21/32 olemassa");
            Oleta.Tosi(!m.Onko(6, 32, 21), "rivi ja sarake eivät vaihdu");
            Oleta.Tosi(m.Onko(8, 84, 128), "z8");
            Oleta.Tosi(!m.Onko(5, 10, 16) && !m.Onko(9, 168, 256), "tasojen ulkopuolella ei");
            Oleta.Tosi(S2MaailmaLaatat.Jasenna("{\"x\":1}") == null, "väärä muoto → null (käytös ennallaan)");
            // korjaus.json (Karttaseppä 19.04): "korjatut" ilman "tasot"-kenttää → tasot 6–10.
            var k = S2MaailmaLaatat.Jasenna(Json(6, 10, (z, x, y) => z == 7 && x == 42 && y == 64).Replace("\"tasot\":{\"min\":6,\"max\":10},", "").Replace("\"saatavuus\"", "\"korjatut\""));
            Oleta.Tosi(k != null && k.Onko(7, 42, 64) && !k.Onko(7, 43, 64), "korjatut-kenttä ja oletustasot");
        }

        [Testi]
        static void MosaiikkilehdetMaailmassaJaEuroopassa()
        {
            var ennen = KuvanTyosto.Maailma;
            try
            {
                KuvanTyosto.Maailma = null;
                Oleta.Tosi(!KuvanTyosto.MosaiikinLaatta(8, 85, 130), "ilman laatat.jsonia Amazonia ei mosaiikista");
                Oleta.Tosi(KuvanTyosto.MosaiikinLaatta(8, 145, 74), "Helsinki Euroopan mosaiikista");
                KuvanTyosto.Maailma = S2MaailmaLaatat.Jasenna(Json(6, 10, (z, x, y) => (x >> (z - 6)) == 21 && (y >> (z - 6)) == 32));
                Oleta.Tosi(KuvanTyosto.MosaiikinLaatta(8, 85, 130), "Amazonia (z6 21/32) maailman mosaiikista");
                Oleta.Tosi(KuvanTyosto.MosaiikinLaatta(11, 85 * 8, 130 * 8), "z11 z10-isästä");
                Oleta.Tosi(!KuvanTyosto.MosaiikinLaatta(8, 99, 105), "avomeri ei");
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/v2/8/85/130.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 85, 130));
                Oleta.Sama("E/2/37/22.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 145, 74), "Eurooppa rajatulla jaolla");
                KuvanTyosto.Maailma.Korjaukset = new[] { ("v2-korjaus2", S2MaailmaLaatat.Jasenna(Json(6, 10, (z, x, y) => z == 8 && x == 85 && y == 130))) };
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/v2-korjaus2/8/85/130.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 85, 130), "korjaussarjasta");
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/v2/8/86/130.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 86, 130), "korjaamaton v2:sta");
                // Korjauskerrokset uusin ensin (Karttaseppä 6.10.): uudempi voittaa, vanhempi jää alle; korjaus voittaa myös Euroopan.
                KuvanTyosto.Maailma.Korjaukset = new[]
                {
                    ("v2-korjaus3", S2MaailmaLaatat.Jasenna(Json(6, 10, (z, x, y) => z == 8 && ((x == 86 && y == 130) || (x == 145 && y == 74))))),
                    ("v2-korjaus2", S2MaailmaLaatat.Jasenna(Json(6, 10, (z, x, y) => z == 8 && (x == 85 || x == 86) && y == 130))),
                };
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/v2-korjaus3/8/86/130.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 86, 130), "uusin kerros");
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/v2-korjaus2/8/85/130.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 85, 130), "vanhempi kerros");
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-maailma/v2-korjaus3/8/145/74.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 145, 74), "korjaus Euroopan lohkossa");
                // Euroopan korjauskerros (rajattu jako): Madeira-tyyppinen.
                KuvanTyosto.Maailma.Korjaukset = System.Array.Empty<(string, S2MaailmaLaatat)>();
                KuvanTyosto.Maailma.EuroopanKorjaukset = new[] { ("v2-korjaus1", S2MaailmaLaatat.Jasenna(Json(6, 10, (z, x, y) => z == 8 && x == 145 && y == 74))) };
                Oleta.Sama("https://media.matkakirja.app/linssit/astronautin-kamera/s2-eurooppa/v2-korjaus1/2/37/22.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 145, 74), "Euroopan korjaus rajatulla jaolla");
                Oleta.Sama("E/2/37/23.jpg", KuvanTyosto.MosaiikinOsoite("E/", 8, 145, 75), "korjaamaton Eurooppa");
            }
            finally { KuvanTyosto.Maailma = ennen; }
        }
    }
}
