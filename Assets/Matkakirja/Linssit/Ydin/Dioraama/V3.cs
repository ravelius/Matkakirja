// DIORAAMAMOOTTORIN VEKTORI (Linnanrakentaja, speksi docs/raportit/dioraama-rajapinnat-20260929.md
// kohdat 0 ja 5). Metrit; +X = itä, +Y = ylös, +Z = etelä (oikeakätinen = glTF = three.js).
using System;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Kolmiulotteinen vektori (double-tarkkuus, kanoninen kehys kohdan 0 mukaan).</summary>
    public readonly struct V3
    {
        public readonly double X, Y, Z;

        public V3(double x, double y, double z) { X = x; Y = y; Z = z; }

        public double Pituus => Math.Sqrt(X * X + Y * Y + Z * Z);

        public static V3 operator +(V3 a, V3 b) => new V3(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
        public static V3 operator -(V3 a, V3 b) => new V3(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
        public static V3 operator *(V3 a, double s) => new V3(a.X * s, a.Y * s, a.Z * s);
        public static V3 operator *(double s, V3 a) => new V3(a.X * s, a.Y * s, a.Z * s);

        public static V3 Lerp(V3 a, V3 b, double e) => new V3(a.X + (b.X - a.X) * e, a.Y + (b.Y - a.Y) * e, a.Z + (b.Z - a.Z) * e);

        public override string ToString() => $"({X:F3}, {Y:F3}, {Z:F3})";
    }
}
