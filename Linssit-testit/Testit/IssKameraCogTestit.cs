// ISS-kameran COG-lukija: synteettinen laatoitettu TIFF (kaksi tasoa, Deflate + prediktori) ja valinnainen verkkotesti
// oikeaa sentinel-cogs-tiedostoa vastaan: COG_URL=<TCI.tif> ./kaanna.sh IssKameraCog (tallentaa COG_PPM-polkuun tason 4 laatan).
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraCogTestit
    {
        // Pieni little-endian TIFF: tasot (leveys, laatta) pikselilomitettuna RGB:nä, Deflate + vaakaprediktori.
        static byte[] TeeTiff(List<(int w, int tile, byte[][] laatat)> tasot)
        {
            var m = new MemoryStream(); var w = new BinaryWriter(m);
            w.Write((byte)'I'); w.Write((byte)'I'); w.Write((ushort)42); w.Write(0u);
            var ifdPaikat = new List<long>(); var linkit = new List<long>();
            foreach (var (lev, tile, laatat) in tasot)
            {
                // laattadata ensin
                var alut = new List<uint>(); var pit = new List<uint>();
                foreach (var raaka in laatat)
                {
                    var p = (byte[])raaka.Clone(); int rivi = tile * 3;
                    for (int y = 0; y < tile; y++) for (int i = rivi - 1; i >= 3; i--) p[y * rivi + i] = (byte)(p[y * rivi + i] - p[y * rivi + i - 3]);
                    var z = new MemoryStream(); z.WriteByte(0x78); z.WriteByte(0x9C);
                    using (var d = new DeflateStream(z, CompressionMode.Compress, true)) d.Write(p, 0, p.Length);
                    alut.Add((uint)m.Position); pit.Add((uint)z.Length); w.Write(z.ToArray());
                }
                long taulu = m.Position;
                foreach (var a in alut) w.Write(a);
                long taulu2 = m.Position;
                foreach (var a in pit) w.Write(a);
                long skaala = m.Position; w.Write(10.0); w.Write(10.0); w.Write(0.0);
                long tie = m.Position; w.Write(0.0); w.Write(0.0); w.Write(0.0); w.Write(300000.0); w.Write(6700000.0); w.Write(0.0);
                if (m.Position % 2 == 1) w.Write((byte)0);
                long ifd = m.Position; ifdPaikat.Add(ifd);
                var tagit = new List<(ushort, ushort, uint, uint)>
                {
                    (256, 3, 1, (uint)lev), (257, 3, 1, (uint)lev), (259, 3, 1, 8), (277, 3, 1, 3), (317, 3, 1, 2),
                    (322, 3, 1, (uint)tile), (323, 3, 1, (uint)tile),
                    (324, 4, (uint)alut.Count, alut.Count == 1 ? alut[0] : (uint)taulu),
                    (325, 4, (uint)pit.Count, pit.Count == 1 ? pit[0] : (uint)taulu2),
                    (33550, 12, 3, (uint)skaala), (33922, 12, 6, (uint)tie),
                };
                w.Write((ushort)tagit.Count);
                foreach (var (tag, typ, lkm, arvo) in tagit)
                {
                    w.Write(tag); w.Write(typ); w.Write(lkm);
                    if (typ == 3 && lkm == 1) { w.Write((ushort)arvo); w.Write((ushort)0); } else w.Write(arvo);
                }
                linkit.Add(m.Position); w.Write(0u);
            }
            w.Flush(); var b = m.ToArray();
            void Kirjoita(long o, uint v) { b[o] = (byte)v; b[o + 1] = (byte)(v >> 8); b[o + 2] = (byte)(v >> 16); b[o + 3] = (byte)(v >> 24); }
            Kirjoita(4, (uint)ifdPaikat[0]);
            for (int i = 0; i + 1 < ifdPaikat.Count; i++) Kirjoita(linkit[i], (uint)ifdPaikat[i + 1]);
            return b;
        }

        static byte[] Kuvio(int tile, int siemen)
        {
            var r = new byte[tile * tile * 3];
            for (int y = 0; y < tile; y++) for (int x = 0; x < tile; x++)
                { int i = (y * tile + x) * 3; r[i] = (byte)(x * 7 + siemen); r[i + 1] = (byte)(y * 5 + siemen); r[i + 2] = (byte)(x ^ y); }
            return r;
        }

        [Testi]
        static void JasentaaTasotJaGeoreferenssin()
        {
            var t0 = new[] { Kuvio(16, 1), Kuvio(16, 2), Kuvio(16, 3), Kuvio(16, 4) };
            var t1 = new[] { Kuvio(16, 9) };
            var o = CogOtsake.Jasenna(TeeTiff(new List<(int, int, byte[][])> { (32, 16, t0), (16, 16, t1) }));
            Oleta.Sama(2, o.Tasot.Count);
            Oleta.Sama(32, o.Tasot[0].Leveys); Oleta.Sama(2, o.Tasot[0].LaattojaX); Oleta.Sama(4, o.Tasot[0].Alut.Length);
            Oleta.Sama(10.0, o.PikseliM); Oleta.Sama(300000.0, o.Ita0); Oleta.Sama(6700000.0, o.Pohjoinen0);
            Oleta.Sama(20.0, o.TasonPikseliM(1));
            Oleta.Sama(1, o.TasoResoluutiolle(25)); Oleta.Sama(0, o.TasoResoluutiolle(12)); Oleta.Sama(0, o.TasoResoluutiolle(5));
        }

        [Testi]
        static void PurkaaDeflatenJaPrediktorin()
        {
            var t0 = new[] { Kuvio(16, 1), Kuvio(16, 2), Kuvio(16, 3), Kuvio(16, 4) };
            var b = TeeTiff(new List<(int, int, byte[][])> { (32, 16, t0) });
            var o = CogOtsake.Jasenna(b); var t = o.Tasot[0];
            for (int ty = 0; ty < 2; ty++) for (int tx = 0; tx < 2; tx++)
            {
                var (alku, pit) = t.Alue(tx, ty);
                var p = new byte[pit]; Array.Copy(b, alku, p, 0, pit);
                var r = CogOtsake.PuraLaatta(t, p); var odotettu = t0[ty * 2 + tx];
                for (int i = 0; i < r.Length; i++) if (r[i] != odotettu[i]) throw new Exception($"laatta {tx},{ty} tavu {i}: {r[i]} ≠ {odotettu[i]}");
            }
        }

        [Testi]
        static void OikeaSentinelCog()   // vain COG_URL-muuttujalla (verkko)
        {
            var url = Environment.GetEnvironmentVariable("COG_URL");
            if (string.IsNullOrEmpty(url)) return;
            byte[] Hae(long a, long n)   // curl (testiympäristön viitteissä ei ole System.Private.Uri:ta)
            {
                var p = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r {a}-{a + n - 1} {url}")
                    { RedirectStandardOutput = true, UseShellExecute = false });
                var m = new MemoryStream(); p.StandardOutput.BaseStream.CopyTo(m); p.WaitForExit(); return m.ToArray();
            }
            var o = CogOtsake.Jasenna(Hae(0, 65536));
            Console.WriteLine($"  COG: {o.Tasot.Count} tasoa, {o.Tasot[0].Leveys}², {o.PikseliM} m, kulma {o.Ita0:0} {o.Pohjoinen0:0}");
            int ti = o.Tasot.Count - 1; var t = o.Tasot[ti]; var (alku, pit) = t.Alue(0, 0);
            var r = CogOtsake.PuraLaatta(t, Hae(alku, pit));
            Oleta.Sama(t.LaattaL * t.LaattaK * 3, r.Length);
            var ppm = Environment.GetEnvironmentVariable("COG_PPM");
            if (!string.IsNullOrEmpty(ppm))
            {
                using var f = File.Create(ppm); var otsake = System.Text.Encoding.ASCII.GetBytes($"P6 {t.LaattaL} {t.LaattaK} 255\n");
                f.Write(otsake, 0, otsake.Length); f.Write(r, 0, r.Length);
            }
        }
    }
}
