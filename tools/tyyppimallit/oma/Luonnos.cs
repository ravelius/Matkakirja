// Komentorivi: kirjoittaa tyyppimallien luonnokset OBJ:ksi (kärkivärit sRGB:nä) ja tulostaa kolmiot rajaa vasten. Käyttö: dotnet Luonnos.dll <kansio>
using System;
using System.Globalization;
using System.IO;
using System.Text;

namespace Matkakirja
{
    public static class Luonnos
    {
        static float Srgb(float l) => l <= 0.0031308f ? l * 12.92f : 1.055f * (float)Math.Pow(l, 1 / 2.4) - 0.055f;
        public static int Main(string[] a)
        {
            var ulos = a.Length > 0 ? a[0] : "obj";
            Directory.CreateDirectory(ulos);
            var ci = CultureInfo.InvariantCulture;
            foreach (var (nimi, v, raja) in OhjelmaKohdeGeometria.TyyppiLuonnokset())
            {
                var sb = new StringBuilder();
                sb.Append("# ").Append(nimi).Append(" kolmioita ").Append(v.Kolmioita).Append('\n');
                // Neutraali valo leivottuna kärkiväriin (Blender piirtää tasavärinä): lounaasta ylhäältä, ympäristö 0,62 + suora 0,38.
                float lx = -0.5f, ly = 0.75f, lz = -0.45f, ll = (float)Math.Sqrt(lx * lx + ly * ly + lz * lz); lx /= ll; ly /= ll; lz /= ll;
                for (int i = 0; i < v.Karkia; i++)
                {
                    float k = 0.62f + 0.38f * Math.Max(0f, v.Normaalit[i * 3] * lx + v.Normaalit[i * 3 + 1] * ly + v.Normaalit[i * 3 + 2] * lz);
                    sb.AppendFormat(ci, "v {0:0.###} {1:0.###} {2:0.###} {3:0.####} {4:0.####} {5:0.####}\n",
                        v.Paikat[i * 3], v.Paikat[i * 3 + 1], -v.Paikat[i * 3 + 2], Srgb(v.Varit[i * 3] * k), Srgb(v.Varit[i * 3 + 1] * k), Srgb(v.Varit[i * 3 + 2] * k));
                }
                // z peilataan (Unity vasenkätinen → OBJ oikeakätinen), joten kolmion kiertosuunta käännetään.
                for (int t = 0; t < v.Kolmioita; t++) sb.Append("f ").Append(t * 3 + 1).Append(' ').Append(t * 3 + 3).Append(' ').Append(t * 3 + 2).Append('\n');
                File.WriteAllText(Path.Combine(ulos, nimi + ".obj"), sb.ToString());
                string tila = raja == 0 ? "" : (v.Kolmioita <= raja ? " OK" : " YLI");
                Console.WriteLine($"{nimi}\tkolmioita {v.Kolmioita}\traja {raja}{tila}\tkoko {v.MaxX - v.MinX:0} × {v.MaxZ - v.MinZ:0} × {v.MaxY:0} m");
            }
            return 0;
        }
    }
}
