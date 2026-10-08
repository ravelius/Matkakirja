// OMA KORKEUSMALLI (8.10., Map Tiles C4): 16-bit PNG:n purku kaikilla suotimilla (synteettinen kuva), bilineaarinen korkeus,
// ei-data ohitetaan, lähiosa ennen kaukoa; Karttasepän oikealla aineistolla (jos levyllä) Eiffel-tornin huippu ja Tukholman maa.
using System;
using System.IO;
using System.IO.Compression;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OmaKorkeusTestit
    {
        static byte[] Png(int w, int h, Func<int, int, ushort> arvo)
        {
            var raaka = new MemoryStream(); var ed = new byte[w * 2];
            for (int r = 0; r < h; r++)
            {
                var rivi = new byte[w * 2];
                for (int i = 0; i < w; i++) { ushort v = arvo(i, r); rivi[2 * i] = (byte)(v >> 8); rivi[2 * i + 1] = (byte)v; }
                int suodin = r % 5; raaka.WriteByte((byte)suodin);
                for (int i = 0; i < rivi.Length; i++)
                {
                    int a = i >= 2 ? rivi[i - 2] : 0, c = i >= 2 ? ed[i - 2] : 0, yl = ed[i], ennuste = 0;
                    if (suodin == 1) ennuste = a; else if (suodin == 2) ennuste = yl; else if (suodin == 3) ennuste = (a + yl) >> 1;
                    else if (suodin == 4) { int p = a + yl - c, pa = Math.Abs(p - a), pb = Math.Abs(p - yl), pc = Math.Abs(p - c); ennuste = pa <= pb && pa <= pc ? a : pb <= pc ? yl : c; }
                    raaka.WriteByte((byte)(rivi[i] - ennuste));
                }
                ed = rivi;
            }
            var z = new MemoryStream(); z.WriteByte(0x78); z.WriteByte(0x9C);
            using (var d = new DeflateStream(z, CompressionLevel.Optimal, true)) { raaka.Position = 0; raaka.CopyTo(d); }
            z.Write(new byte[4], 0, 4);   // adler32 (lukija ei tarkista)
            var png = new MemoryStream(); png.Write(new byte[] { 137, 80, 78, 71, 13, 10, 26, 10 }, 0, 8);
            void Pala(string t, byte[] data)
            {
                png.Write(new[] { (byte)(data.Length >> 24), (byte)(data.Length >> 16), (byte)(data.Length >> 8), (byte)data.Length }, 0, 4);
                png.Write(System.Text.Encoding.ASCII.GetBytes(t), 0, 4); png.Write(data, 0, data.Length); png.Write(new byte[4], 0, 4);
            }
            Pala("IHDR", new byte[] { 0, 0, (byte)(w >> 8), (byte)w, 0, 0, (byte)(h >> 8), (byte)h, 16, 0, 0, 0, 0 });
            Pala("IDAT", z.ToArray()); Pala("IEND", new byte[0]);
            return png.ToArray();
        }

        [Testi] static void Png16KaikillaSuotimilla()
        {
            ushort F(int i, int r) => (ushort)(1000 + i * 37 + r * 911 + (i * r) % 251);
            var (w, h, a) = OmaKorkeus.Png16(Png(23, 17, F));
            Oleta.Tosi(w == 23 && h == 17, "koko");
            for (int r = 0; r < h; r++) for (int i = 0; i < w; i++) Oleta.Tosi(a[r * w + i] == F(i, r), $"arvo ({i}, {r})");
        }

        [Testi] static void BilineaarinenJaEiData()
        {
            // 4 × 3 ruutua 10 m, kulma (0, 0): ylin rivi pohjoisin. Arvo = 100 + 10·i (dm) → h = 50 + 10 + i.
            var o = new OmaKorkeus.Osa { RuutuM = 10, KulmaX = 0, KulmaY = 0, PohjaM = 50, W = 4, H = 3, Arvot = new ushort[12] };
            for (int r = 0; r < 3; r++) for (int i = 0; i < 4; i++) o.Arvot[r * 4 + i] = (ushort)(100 + 10 * i);
            Oleta.Tosi(Math.Abs(o.Korkeus(5, 5) - 60) < 1e-9, "solun keskellä");
            Oleta.Tosi(Math.Abs(o.Korkeus(10, 15) - 60.5) < 1e-9, "puolivälissä");
            Oleta.Tosi(double.IsNaN(o.Korkeus(-20, 5)) && double.IsNaN(o.Korkeus(5, 40)), "ulkopuolella NaN");
            o.Arvot[1 * 4 + 1] = 0;   // ei dataa: naapurit kantavat
            Oleta.Tosi(Math.Abs(o.Korkeus(15, 15) - 61.5) < 0.5, "ei-data ohitetaan (naapurien keskiarvo)");
        }

        static OmaKorkeus Lue(string id)
        {
            const string K = "/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/korkeus-20261008/";
            if (!File.Exists(K + "korkeus-" + id + ".json")) return null;
            return OmaKorkeus.Lue(File.ReadAllText(K + "korkeus-" + id + ".json"), n => File.Exists(K + n) ? File.ReadAllBytes(K + n) : null);
        }

        [Testi] static void KarttasepanAineisto()
        {
            var p = Lue("pariisi");
            if (p != null)
            {
                Oleta.Tosi(p.Osat.Count == 2 && p.Osat[0].RuutuM < p.Osat[1].RuutuM, "lähi ensin");
                double torni = 0;   // Eiffel-tornin huippu: suurin 30 m:n säteellä (2 m ruutu)
                for (int dy = -15; dy <= 15; dy++) for (int dx = -15; dx <= 15; dx++) torni = Math.Max(torni, p.Korkeus(48.85826 + dy * 1e-5, 2.29450 + dx * 1.5e-5));
                Oleta.Tosi(torni > 330 && torni < 380, $"Eiffel {torni:F1} m (ellipsoidi, huippu ~369)");
                double seine = p.Korkeus(48.8575, 2.3410), concorde = p.Korkeus(48.86563, 2.32124);   // Seine ~27 m NGF + geoidi ~44,5 m
                Oleta.Tosi(seine > 66 && seine < 77 && concorde > 70 && concorde < 85, $"Seine {seine:F1} m, Concorde {concorde:F1} m");
            }
            var t = Lue("tukholma");
            if (t != null)
            {
                double h = t.Korkeus(59.3251, 18.0711);   // Gamla stan
                Oleta.Tosi(h > 20 && h < 80, $"Gamla stan {h:F1} m");
                Oleta.Tosi(double.IsNaN(t.Korkeus(60.5, 18.07)), "mallin ulkopuolella NaN");
            }
        }
    }
}
