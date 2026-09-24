// Maamerkit sisältöpaketista: kokoelman lukija (Maamerkkisisalto) ja kapea GLB-lukija (GlbLukija).
// Kultainen Blender-vienti: Kultaiset/maamerkki-koe.glb (maamerkit.py --glb), jos tiedosto on olemassa.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli.Testit
{
    public static class MaamerkkiTestit
    {
        const string Sha = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

        static string Rivi(string id, string kaupunki, string lisa = "", string malli = null) =>
            "{\"id\":\"" + id + "\",\"kaupunki\":\"" + kaupunki + "\",\"lat\":51.5,\"lon\":-0.1,\"maanKorkeus\":10,"
            + "\"suunta\":15,\"mallinKorkeus\":97.2,\"malli\":" + (malli ?? "{\"url\":\"https://media.matkakirja.app/maamerkit/" + id
            + "-01234567.glb\",\"sha256\":\"" + Sha + "\",\"tavuja\":1234}") + ",\"lisenssi\":\"CC0-1.0\",\"tekija\":\"Matkakirja\""
            + lisa + "}";

        [Testi] static void KokoelmaLuetaanPaatasolta()
        {
            var hyl = new List<string>();
            var r = Maamerkkisisalto.Lue("{\"alkiot\":[" + Rivi("lontoo", "lontoo") + "]}", hyl);
            Oleta.Sama(1, r.Count, string.Join("; ", hyl));
            var a = r[0];
            Oleta.Sama("lontoo", a.Kaupunki);
            Oleta.Sama(10.0, a.MaanKorkeus);
            Oleta.Sama(15f, a.Suunta);
            Oleta.Sama(97.2f, a.MallinKorkeus);
            Oleta.Sama(1234L, a.MalliTavuja);
            Oleta.Tosi(a.MalliUrl.EndsWith("lontoo-01234567.glb"));
        }

        [Testi] static void TyhjaKokoelmaJaPuuttuvaOvatTyhjia()
        {
            Oleta.Sama(0, Maamerkkisisalto.Lue(null).Count);
            Oleta.Sama(0, Maamerkkisisalto.Lue("{\"alkiot\":[]}").Count);
        }

        [Testi] static void PuutteellisetRivitHylataanSyylla()
        {
            var hyl = new List<string>();
            var json = "{\"alkiot\":["
                + Rivi("a", "a", malli: "null") + ","
                + Rivi("b", "b", malli: "{\"url\":\"http://x/b.glb\",\"sha256\":\"" + Sha + "\",\"tavuja\":1}") + ","
                + Rivi("c", "c", malli: "{\"url\":\"https://x/c.glb\",\"sha256\":\"abc\",\"tavuja\":1}") + ","
                + Rivi("d", "d").Replace("CC0-1.0", "kaikki oikeudet pidätetään") + ","
                + Rivi("E", "e") + ","
                + Rivi("f", "f") + "," + Rivi("f2", "f") + "]}";
            var r = Maamerkkisisalto.Lue(json, hyl);
            Oleta.Sama("f", string.Join(",", r.Select(x => x.Id)));
            Oleta.Sama(6, hyl.Count, string.Join("; ", hyl));
            Oleta.Tosi(hyl.Any(h => h.StartsWith("a: malli.url")));
            Oleta.Tosi(hyl.Any(h => h.StartsWith("b: malli.url ei ole https")));
            Oleta.Tosi(hyl.Any(h => h.StartsWith("c: malli.sha256")));
            Oleta.Tosi(hyl.Any(h => h.StartsWith("d: lisenssi")));
            Oleta.Tosi(hyl.Any(h => h.StartsWith("E: id")));
            Oleta.Tosi(hyl.Any(h => h.StartsWith("f2: kaupunki kahdesti")));
        }

        [Testi] static void MallinTarkistusTavutJaSha()
        {
            var tavut = Encoding.UTF8.GetBytes("abc");
            var r = new Maamerkkirivi
            {
                MalliTavuja = 3,
                MalliSha256 = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
            };
            Oleta.Sama(null, Maamerkkisisalto.TarkistaMalli(r, tavut));
            r.MalliTavuja = 4;
            Oleta.Tosi(Maamerkkisisalto.TarkistaMalli(r, tavut).StartsWith("tavuja"));
            r.MalliTavuja = 3; r.MalliSha256 = Sha;
            Oleta.Sama("sha256 ei täsmää", Maamerkkisisalto.TarkistaMalli(r, tavut));
        }

        // --- GLB --------------------------------------------------------------------------------------

        /// <summary>Kirjoittaa pienen GLB:n: yksi kolmio (0,0,0) (1,0,0) (0,1,0), normaali +Z, UV ja 2 tavun "kuva".</summary>
        static byte[] Kolmio(string solmu, bool indeksit = true, bool kuva = true)
        {
            var bin = new List<byte>();
            void F(params float[] v) { foreach (var x in v) bin.AddRange(BitConverter.GetBytes(x)); }
            F(0, 0, 0, 1, 0, 0, 0, 1, 0);          // POSITION 0..35
            F(0, 0, 1, 0, 0, 1, 0, 0, 1);          // NORMAL 36..71
            F(0, 0, 1, 0, 0, 1);                   // TEXCOORD_0 72..95
            bin.AddRange(new byte[] { 0, 0, 1, 0, 2, 0, 0, 0 });   // ushort 0,1,2 + täyte 96..103
            bin.AddRange(new byte[] { 0x89, 0x50 }); // "kuva" 104..105
            while (bin.Count % 4 != 0) bin.Add(0);
            var json = "{\"asset\":{\"version\":\"2.0\"},\"scene\":0,\"scenes\":[{\"nodes\":[0]}],"
                + "\"nodes\":[{\"mesh\":0" + solmu + "}],"
                + "\"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2}"
                + (indeksit ? ",\"indices\":3" : "") + ",\"material\":0}]}],"
                + "\"materials\":[{\"pbrMetallicRoughness\":" + (kuva ? "{\"baseColorTexture\":{\"index\":0}}" : "{}") + "}],"
                + "\"textures\":[{\"source\":0}],\"images\":[{\"bufferView\":4,\"mimeType\":\"image/png\"}],"
                + "\"accessors\":["
                + "{\"bufferView\":0,\"componentType\":5126,\"count\":3,\"type\":\"VEC3\"},"
                + "{\"bufferView\":1,\"componentType\":5126,\"count\":3,\"type\":\"VEC3\"},"
                + "{\"bufferView\":2,\"componentType\":5126,\"count\":3,\"type\":\"VEC2\"},"
                + "{\"bufferView\":3,\"componentType\":5123,\"count\":3,\"type\":\"SCALAR\"}],"
                + "\"bufferViews\":["
                + "{\"buffer\":0,\"byteOffset\":0,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":36,\"byteLength\":36},"
                + "{\"buffer\":0,\"byteOffset\":72,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":96,\"byteLength\":6},"
                + "{\"buffer\":0,\"byteOffset\":104,\"byteLength\":2}],"
                + "\"buffers\":[{\"byteLength\":" + bin.Count + "}]}";
            var jb = Encoding.UTF8.GetBytes(json).ToList();
            while (jb.Count % 4 != 0) jb.Add(0x20);
            var t = new List<byte>();
            void U(uint v) => t.AddRange(BitConverter.GetBytes(v));
            U(0x46546C67); U(2); U((uint)(12 + 8 + jb.Count + 8 + bin.Count));
            U((uint)jb.Count); U(0x4E4F534A); t.AddRange(jb);
            U((uint)bin.Count); U(0x004E4942); t.AddRange(bin);
            return t.ToArray();
        }

        static void Lahella(float odotettu, float saatu, string mika) =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) < 1e-5f, $"{mika}: odotettu {odotettu}, saatu {saatu}");

        [Testi] static void GlbKehysZPeilataanJaKiertoKaannetaan()
        {
            var v = GlbLukija.Lue(Kolmio(""));
            Oleta.Sama(3, v.Karkia);
            // (0,1,0) pysyy; z peilataan (normaali +Z → −Z), v' = 1 − v.
            Lahella(1f, v.Paikat[7], "y");
            Lahella(-1f, v.Normaalit[2], "normaali z");
            Lahella(1f, v.Uv[1], "uv v (0 → 1)");
            Lahella(0f, v.Uv[5], "uv v (1 → 0)");
            Oleta.Sama("0,2,1", string.Join(",", v.Kolmiot));
            Oleta.Sama("image/png", v.KuvaTyyppi);
            Oleta.Sama(2, v.Kuva.Length);
            Lahella(1f, v.YlinY, "ylin y");
        }

        [Testi] static void GlbKolmioOnUnitynEtupuoliNormaalinSuuntaan()
        {
            // Unity (vasenkätinen): etupuoli on myötäpäivään katsottuna normaalin puolelta. Unityn pintanormaali
            // (Mesh.RecalculateNormals, Vector3.Cross) = cross(b − a, c − a), ja sen pitää osoittaa kärkinormaalin suuntaan.
            Etupuoli(GlbLukija.Lue(Kolmio("")));
        }

        static void Etupuoli(GlbVerkko v)
        {
            float[] P(int i) => new[] { v.Paikat[i * 3], v.Paikat[i * 3 + 1], v.Paikat[i * 3 + 2] };
            var a = P(v.Kolmiot[0]); var b = P(v.Kolmiot[1]); var c = P(v.Kolmiot[2]);
            float ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], wx = c[0] - a[0], wy = c[1] - a[1], wz = c[2] - a[2];
            float nz = ux * wy - uy * wx;
            // Unity laskee pinnan normaalin cross(b − a, c − a):lla samalla kaavalla; sen pitää osoittaa kärkinormaalin suuntaan.
            float nx = uy * wz - uz * wy, ny = uz * wx - ux * wz;
            float piste = nx * v.Normaalit[0] + ny * v.Normaalit[1] + nz * v.Normaalit[2];
            Oleta.Tosi(piste > 0, "kierto ja normaali samaan suuntaan: " + piste);
        }

        [Testi] static void GlbSolmunSiirtoJaKiertoSovelletaan()
        {
            // 90° kierto x-akselin ympäri (Blenderin Z-ylös → glTF Y-ylös -tyyppinen), siirto (5, 0, 0).
            var s = Math.Sqrt(0.5).ToString("R", System.Globalization.CultureInfo.InvariantCulture);
            var v = GlbLukija.Lue(Kolmio($",\"translation\":[5,0,0],\"rotation\":[{s},0,0,{s}]"));
            // (0,1,0) → kierto x:n ympäri +90° → (0,0,1) → +5 x → (5,0,1) → z-peilaus → (5,0,−1).
            Lahella(5f, v.Paikat[6], "x"); Lahella(0f, v.Paikat[7], "y"); Lahella(-1f, v.Paikat[8], "z");
            // normaali +Z → −Y (kierto), z-peilaus ei muuta y:tä.
            Lahella(-1f, v.Normaalit[1], "normaali y");
        }

        [Testi] static void GlbPeilaavaSolmuEiKaannaKiertoa()
        {
            var v = GlbLukija.Lue(Kolmio(",\"scale\":[-1,1,1]"));
            Oleta.Sama("0,1,2", string.Join(",", v.Kolmiot));
            Lahella(-1f, v.Normaalit[2], "normaali (0,0,1) → x-peilaus ei muuta → z-peilaus −1");
            Etupuoli(v);
        }

        [Testi] static void GlbIlmanIndeksejaJaKuvaa()
        {
            var v = GlbLukija.Lue(Kolmio("", indeksit: false, kuva: false));
            Oleta.Sama("0,2,1", string.Join(",", v.Kolmiot));
            Etupuoli(v);
            Oleta.Sama(null, v.Kuva);
        }

        [Testi] static void GlbRikkinainenHylataan()
        {
            foreach (var (tavut, mika) in new[]
            {
                (new byte[4], "lyhyt"),
                (Encoding.ASCII.GetBytes("xxxxxxxxxxxxxxxxxxxxxxxx"), "magic"),
                (Kolmio("").Take(60).ToArray(), "katkaistu"),
            })
            {
                bool virhe = false;
                try { GlbLukija.Lue(tavut); } catch (GlbVirhe) { virhe = true; }
                Oleta.Tosi(virhe, mika);
            }
        }

        [Testi] static void GlbBlenderinVientiKultainen()
        {
            var polku = Path.Combine("Kultaiset", "maamerkki-koe.glb");
            if (!File.Exists(polku)) return;
            var v = GlbLukija.Lue(File.ReadAllBytes(polku));
            Oleta.Tosi(v.Karkia > 100, "kärkiä " + v.Karkia);
            Oleta.Tosi(v.Normaalit != null && v.Uv != null, "normaalit ja UV");
            Oleta.Tosi(v.Kuva != null && v.Kuva.Length > 1000, "atlas upotettu");
            Oleta.Tosi(v.YlinY > 50 && v.YlinY < 150, "korkeus " + v.YlinY);
            // Kehys: Elizabeth Tower on lontoo.py:ssä kohdassa (itä −135, pohjoinen −45) → Unity x −135, z −45.
            int ylin = 0;
            for (int i = 0; i < v.Karkia; i++) if (v.Paikat[i * 3 + 1] > v.Paikat[ylin * 3 + 1]) ylin = i;
            Oleta.Tosi(Math.Abs(v.Paikat[ylin * 3] + 135) < 10 && Math.Abs(v.Paikat[ylin * 3 + 2] + 45) < 10,
                $"Big Ben ({v.Paikat[ylin * 3]:0}, {v.Paikat[ylin * 3 + 2]:0}), odotettu (−135, −45)");
            // Kierto: lähes kaikkien kolmioiden Unity-pintanormaali osoittaa kärkinormaalin puolelle.
            int oikein = 0, n = v.Kolmiot.Length / 3;
            for (int t = 0; t < n; t++)
            {
                int a = v.Kolmiot[t * 3], b = v.Kolmiot[t * 3 + 1], c = v.Kolmiot[t * 3 + 2];
                float ux = v.Paikat[b * 3] - v.Paikat[a * 3], uy = v.Paikat[b * 3 + 1] - v.Paikat[a * 3 + 1], uz = v.Paikat[b * 3 + 2] - v.Paikat[a * 3 + 2];
                float wx = v.Paikat[c * 3] - v.Paikat[a * 3], wy = v.Paikat[c * 3 + 1] - v.Paikat[a * 3 + 1], wz = v.Paikat[c * 3 + 2] - v.Paikat[a * 3 + 2];
                float nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
                if (nx * v.Normaalit[a * 3] + ny * v.Normaalit[a * 3 + 1] + nz * v.Normaalit[a * 3 + 2] > 0) oikein++;
            }
            Oleta.Tosi(oikein >= n * 0.98, $"etupuoli {oikein}/{n}");
        }
    }
}
