// TARKEMMAT LAIVAT (Linssiseppä 2, 9.10.2026; omistaja TF 168: "liian laatikkomaisia"): verkot ehjiä, kolmiot budjetissa, normaalit
// yksikköpituisia ja kiertojärjestys normaalin mukainen (Unity: Cross(p1 − p0, p2 − p0)), mitat tyypin mukaan, piippu mallin päällä.
using System;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class TarkatVeneetTestit
    {
        [Testi] static void VerkotEhjiaJaBudjetissa()
        {
            foreach (var tyyppi in TarkatVeneet.Tyypit)
            {
                var v = TarkatVeneet.Luo(tyyppi);
                Oleta.Tosi(v != null, tyyppi);
                int kolmioita = v.Kolmiot.Length / 3;
                Oleta.Tosi(kolmioita > 500 && kolmioita < 8000, $"{tyyppi}: {kolmioita} kolmiota");
                Oleta.Sama(v.Paikat.Length / 3 * 4, v.Varit.Length, $"{tyyppi}: värit");
                float minZ = float.MaxValue, maxZ = float.MinValue, maxX = 0, maxY = float.MinValue;
                for (int i = 0; i < v.Karkia; i++)
                {
                    float x = v.Paikat[i * 3], y = v.Paikat[i * 3 + 1], z = v.Paikat[i * 3 + 2];
                    minZ = Math.Min(minZ, z); maxZ = Math.Max(maxZ, z); maxX = Math.Max(maxX, Math.Abs(x)); maxY = Math.Max(maxY, y);
                    double nl = Math.Sqrt(v.Normaalit[i * 3] * v.Normaalit[i * 3] + v.Normaalit[i * 3 + 1] * v.Normaalit[i * 3 + 1] + v.Normaalit[i * 3 + 2] * v.Normaalit[i * 3 + 2]);
                    Oleta.Tosi(Math.Abs(nl - 1) < 1e-3, $"{tyyppi}: normaali {nl}");
                }
                Oleta.Tosi(Math.Abs((maxZ - minZ) - v.Pituus) < v.Pituus * 0.08, $"{tyyppi}: pituus {maxZ - minZ:F1} vs {v.Pituus}");
                Oleta.Tosi(maxX * 2 < v.Leveys * 1.15 && maxY <= v.Korkeus + 0.01, $"{tyyppi}: leveys {maxX * 2:F1}, korkeus {maxY:F1}/{v.Korkeus}");
                int vaarin = 0;
                for (int k = 0; k < v.Kolmiot.Length; k += 3)
                {
                    int a = v.Kolmiot[k] * 3, b = v.Kolmiot[k + 1] * 3, c = v.Kolmiot[k + 2] * 3;
                    Oleta.Tosi(a / 3 < v.Karkia && b / 3 < v.Karkia && c / 3 < v.Karkia, "indeksi");
                    float ux = v.Paikat[b] - v.Paikat[a], uy = v.Paikat[b + 1] - v.Paikat[a + 1], uz = v.Paikat[b + 2] - v.Paikat[a + 2];
                    float wx = v.Paikat[c] - v.Paikat[a], wy = v.Paikat[c + 1] - v.Paikat[a + 1], wz = v.Paikat[c + 2] - v.Paikat[a + 2];
                    float cx = uy * wz - uz * wy, cy = uz * wx - ux * wz, cz = ux * wy - uy * wx;
                    if (cx * v.Normaalit[a] + cy * v.Normaalit[a + 1] + cz * v.Normaalit[a + 2] < -1e-6) vaarin++;
                }
                Oleta.Sama(0, vaarin, $"{tyyppi}: kiertojärjestys normaalia vastaan");
                var pp = TarkatVeneet.Piippu(tyyppi);
                Oleta.Tosi(pp != null && pp[1] > 4 && pp[1] <= v.Korkeus && pp[2] > minZ && pp[2] < maxZ, $"{tyyppi}: piippu");
            }
            Oleta.Tosi(TarkatVeneet.Luo("vene") == null && !TarkatVeneet.Tukee("vene") && TarkatVeneet.Tukee("hoyrylaiva"), "muut LS1:n malleista");
        }
    
        /// <summary>Kehitystyökalu: TARKAT_OBJ=<kansio> kirjoittaa verkot OBJ:ksi (värit kärjissä) silmämääräistä tarkistusta varten.</summary>
        [Testi] static void ObjVienti()
        {
            string k = Environment.GetEnvironmentVariable("TARKAT_OBJ"); if (string.IsNullOrEmpty(k)) return;
            foreach (var tyyppi in TarkatVeneet.Tyypit)
            {
                var v = TarkatVeneet.Luo(tyyppi); var sb = new System.Text.StringBuilder();
                var ci = System.Globalization.CultureInfo.InvariantCulture;
                for (int i = 0; i < v.Karkia; i++) sb.AppendLine(string.Format(ci, "v {0} {1} {2} {3} {4} {5}", v.Paikat[i * 3], v.Paikat[i * 3 + 1], v.Paikat[i * 3 + 2], v.Varit[i * 4] / 255f, v.Varit[i * 4 + 1] / 255f, v.Varit[i * 4 + 2] / 255f));
                for (int i = 0; i < v.Kolmiot.Length; i += 3) sb.AppendLine($"f {v.Kolmiot[i] + 1} {v.Kolmiot[i + 1] + 1} {v.Kolmiot[i + 2] + 1}");
                System.IO.File.WriteAllText(System.IO.Path.Combine(k, tyyppi + ".obj"), sb.ToString());
            }
        }
}
}
