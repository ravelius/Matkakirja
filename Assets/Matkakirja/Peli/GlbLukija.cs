// KAPEA GLB-LUKIJA MAAMERKEILLE (Pelikoodari 24.9.2026): lukee oman Blender-putken GLB:n (Maamerkit/Lahde~/
// maamerkit.py --glb) ilman glTFast-pakettia. Tuettu: glTF 2.0 binääri, yksi tai useampi verkko solmupuussa
// (TRS tai matriisi), kolmiot (mode 4), POSITION/NORMAL float VEC3, TEXCOORD_0 float VEC2, indeksit
// ubyte/ushort/uint (tai ilman), ensimmäisen materiaalin baseColorTexture upotettuna (bufferView, PNG/JPEG).
// Muu (sparse, morph, skin, ulkoiset tiedostot, kvantisointi) → virhe, ei arvausta.
//
// Kehys: glTF on oikeakätinen (+Y ylös, −Z pohjoinen Blenderin oletusviennissä), Unity vasenkätinen.
// Muunnos (x, y, z) → (x, y, −z) ja kolmioiden kiertosuunta käännetään: tulos on +X itä, +Y ylös, +Z pohjoinen
// kuten Kartta/Maamerkit.cs:n FBX-malleissa. UV: glTF:n origo vasemmassa yläkulmassa → v' = 1 − v.
using System;
using System.Collections.Generic;
using System.Text;

namespace Matkakirja.Peli
{
    public sealed class GlbVerkko
    {
        /// <summary>Kärkipisteet (x, y, z) Unityn kehyksessä, metreinä.</summary>
        public float[] Paikat;
        /// <summary>Normaalit (x, y, z) Unityn kehyksessä; null jos mallissa ei ole normaaleja.</summary>
        public float[] Normaalit;
        /// <summary>UV (u, v) Unityn kehyksessä; null jos mallissa ei ole UV:tä.</summary>
        public float[] Uv;
        /// <summary>Kolmiot Unityn kiertosuunnassa.</summary>
        public int[] Kolmiot;
        /// <summary>Värikartan tavut (PNG tai JPEG) ja MIME; null jos ei tekstuuria.</summary>
        public byte[] Kuva;
        public string KuvaTyyppi;
        public int Karkia => Paikat.Length / 3;
        /// <summary>Korkein y (mallin korkeus jalasta, kun origo on jalassa).</summary>
        public float YlinY;
    }

    public static class GlbLukija
    {
        const uint Magic = 0x46546C67, JsonPala = 0x4E4F534A, BinPala = 0x004E4942;

        /// <summary>Lukee GLB:n. Virhe → GlbVirhe viestillä (mikä ei ole tuettu tai rikki).</summary>
        public static GlbVerkko Lue(byte[] glb)
        {
            if (glb == null || glb.Length < 20) throw new GlbVirhe("liian lyhyt");
            if (U32(glb, 0) != Magic) throw new GlbVirhe("ei glTF-binääri");
            if (U32(glb, 4) != 2) throw new GlbVirhe("versio " + U32(glb, 4));
            int pituus = (int)Math.Min(U32(glb, 8), (uint)glb.Length);
            Dictionary<string, object> json = null;
            int binAlku = -1, binPituus = 0;
            for (int k = 12; k + 8 <= pituus;)
            {
                int n = (int)U32(glb, k); uint tyyppi = U32(glb, k + 4);
                if (n < 0 || k + 8 + n > pituus) throw new GlbVirhe("pala yli tiedoston");
                if (tyyppi == JsonPala && json == null) json = MiniJson.Objekti(MiniJson.Jasenna(Encoding.UTF8.GetString(glb, k + 8, n)));
                else if (tyyppi == BinPala && binAlku < 0) { binAlku = k + 8; binPituus = n; }
                k += 8 + ((n + 3) & ~3);
            }
            if (json == null) throw new GlbVirhe("JSON-pala puuttuu");
            var l = new Lukija(json, glb, binAlku, binPituus);
            var tulos = l.Kokoa();
            l.Kuva(tulos);
            return tulos;
        }

        static uint U32(byte[] b, int i) => (uint)(b[i] | b[i + 1] << 8 | b[i + 2] << 16 | b[i + 3] << 24);

        sealed class Lukija
        {
            readonly Dictionary<string, object> j;
            readonly byte[] b;
            readonly int binAlku, binPituus;
            readonly List<float> paikat = new List<float>(), normaalit = new List<float>(), uv = new List<float>();
            readonly List<int> kolmiot = new List<int>();
            bool normaaliKaikilla = true, uvKaikilla = true;

            public Lukija(Dictionary<string, object> json, byte[] glb, int alku, int pituus)
            { j = json; b = glb; binAlku = alku; binPituus = pituus; }

            List<object> Lista(string nimi) => MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, nimi));
            Dictionary<string, object> Alkio(string lista, int i)
            {
                var l = Lista(lista);
                if (i < 0 || i >= l.Count) throw new GlbVirhe($"{lista}[{i}] puuttuu");
                return MiniJson.Objekti(l[i]);
            }

            public GlbVerkko Kokoa()
            {
                var skene = (int)(MiniJson.Luku(j, "scene") ?? 0);
                var skenet = Lista("scenes");
                var juuret = skenet.Count > 0
                    ? MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(skenet[Math.Min(skene, skenet.Count - 1)]), "nodes"))
                    : new List<object>();
                if (juuret.Count == 0) for (int i = 0; i < Lista("nodes").Count; i++) juuret.Add((double)i); // ei sceneä
                foreach (var s in juuret) Solmu((int)(double)s, Matriisi.Yksikko, 0);
                if (paikat.Count == 0) throw new GlbVirhe("ei kolmioita");
                var t = new GlbVerkko
                {
                    Paikat = paikat.ToArray(),
                    Normaalit = normaaliKaikilla ? normaalit.ToArray() : null,
                    Uv = uvKaikilla ? uv.ToArray() : null,
                    Kolmiot = kolmiot.ToArray(),
                    YlinY = float.MinValue,
                };
                for (int i = 1; i < t.Paikat.Length; i += 3) t.YlinY = Math.Max(t.YlinY, t.Paikat[i]);
                return t;
            }

            void Solmu(int i, Matriisi vanhempi, int syvyys)
            {
                if (syvyys > 32) throw new GlbVirhe("solmupuu liian syvä");
                var n = Alkio("nodes", i);
                if (MiniJson.Kentta(n, "skin") != null) throw new GlbVirhe("skin ei tuettu");
                var m = vanhempi * Matriisi.Solmusta(n);
                var verkko = MiniJson.Luku(n, "mesh");
                if (verkko.HasValue) Verkko((int)verkko.Value, m);
                foreach (var c in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(n, "children"))) Solmu((int)(double)c, m, syvyys + 1);
            }

            void Verkko(int i, Matriisi m)
            {
                var v = Alkio("meshes", i);
                foreach (var po in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(v, "primitives")))
                {
                    var p = MiniJson.Objekti(po);
                    if ((int)(MiniJson.Luku(p, "mode") ?? 4) != 4) throw new GlbVirhe("vain kolmiot (mode 4)");
                    if (MiniJson.Kentta(p, "targets") != null) throw new GlbVirhe("morph ei tuettu");
                    var a = MiniJson.Objekti(MiniJson.Kentta(p, "attributes"));
                    var pos = Float(a, "POSITION", "VEC3") ?? throw new GlbVirhe("POSITION puuttuu");
                    var nor = Float(a, "NORMAL", "VEC3");
                    var tex = Float(a, "TEXCOORD_0", "VEC2");
                    int alku = paikat.Count / 3, k = pos.Length / 3;
                    var nm = m.Normaalimatriisi();
                    for (int q = 0; q < k; q++)
                    {
                        m.Piste(pos[q * 3], pos[q * 3 + 1], pos[q * 3 + 2], out var x, out var y, out var z);
                        paikat.Add(x); paikat.Add(y); paikat.Add(-z);
                        if (nor != null)
                        {
                            nm.Suunta(nor[q * 3], nor[q * 3 + 1], nor[q * 3 + 2], out x, out y, out z);
                            float d = (float)Math.Sqrt(x * x + y * y + z * z);
                            if (d > 1e-12f) { x /= d; y /= d; z /= d; }
                            normaalit.Add(x); normaalit.Add(y); normaalit.Add(-z);
                        }
                        if (tex != null) { uv.Add(tex[q * 2]); uv.Add(1f - tex[q * 2 + 1]); }
                    }
                    normaaliKaikilla &= nor != null;
                    uvKaikilla &= tex != null;
                    var ind = MiniJson.Luku(p, "indices");
                    var ii = ind.HasValue ? Indeksit((int)ind.Value) : Jarjestys(k);
                    if (ii.Length % 3 != 0) throw new GlbVirhe("indeksit eivät ole kolmioita");
                    // Peilaava solmumatriisi kääntää kierron; z-peilaus (glTF → Unity) kääntää sen vielä kerran.
                    bool kaanna = m.Determinantti() > 0;
                    for (int q = 0; q < ii.Length; q += 3)
                    {
                        if (ii[q] >= k || ii[q + 1] >= k || ii[q + 2] >= k) throw new GlbVirhe("indeksi yli kärkien");
                        kolmiot.Add(alku + ii[q]);
                        kolmiot.Add(alku + (kaanna ? ii[q + 2] : ii[q + 1]));
                        kolmiot.Add(alku + (kaanna ? ii[q + 1] : ii[q + 2]));
                    }
                }
            }

            static int[] Jarjestys(int n) { var t = new int[n]; for (int i = 0; i < n; i++) t[i] = i; return t; }

            /// <summary>Accessorin tavualue: (alku, askel, määrä) BIN-palassa.</summary>
            (int alku, int askel, int maara, int komponentit, int tyyppi) Accessor(int i, int tavujaKomponentti = 0)
            {
                var a = Alkio("accessors", i);
                if (MiniJson.Kentta(a, "sparse") != null) throw new GlbVirhe("sparse ei tuettu");
                if (MiniJson.Totuus(a, "normalized")) throw new GlbVirhe("kvantisointi ei tuettu");
                int tyyppi = (int)(MiniJson.Luku(a, "componentType") ?? 0);
                int maara = (int)(MiniJson.Luku(a, "count") ?? 0);
                int komponentit = MiniJson.Teksti(a, "type") switch
                {
                    "SCALAR" => 1, "VEC2" => 2, "VEC3" => 3, "VEC4" => 4,
                    var x => throw new GlbVirhe("accessor-tyyppi " + x),
                };
                int koko = tyyppi switch { 5121 => 1, 5123 => 2, 5125 => 4, 5126 => 4, _ => throw new GlbVirhe("componentType " + tyyppi) };
                var bvi = MiniJson.Luku(a, "bufferView") ?? throw new GlbVirhe("accessor ilman bufferViewiä");
                var bv = Alkio("bufferViews", (int)bvi);
                if ((int)(MiniJson.Luku(bv, "buffer") ?? 0) != 0 || binAlku < 0) throw new GlbVirhe("vain upotettu BIN-puskuri");
                int bvAlku = (int)(MiniJson.Luku(bv, "byteOffset") ?? 0), bvPituus = (int)(MiniJson.Luku(bv, "byteLength") ?? 0);
                int askel = (int)(MiniJson.Luku(bv, "byteStride") ?? 0);
                if (askel == 0) askel = koko * komponentit;
                int alku = bvAlku + (int)(MiniJson.Luku(a, "byteOffset") ?? 0);
                long loppu = maara == 0 ? alku : (long)alku + (long)askel * (maara - 1) + koko * komponentit;
                if (bvAlku + bvPituus > binPituus || loppu > bvAlku + bvPituus) throw new GlbVirhe("accessor yli puskurin");
                return (binAlku + alku, askel, maara, komponentit, tyyppi);
            }

            float[] Float(Dictionary<string, object> attr, string nimi, string odotettu)
            {
                var i = MiniJson.Luku(attr, nimi);
                if (!i.HasValue) return null;
                var (alku, askel, maara, komponentit, tyyppi) = Accessor((int)i.Value);
                if (tyyppi != 5126 || komponentit != (odotettu == "VEC3" ? 3 : 2)) throw new GlbVirhe(nimi + " ei ole float " + odotettu);
                var t = new float[maara * komponentit];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < komponentit; c++)
                        t[q * komponentit + c] = BitConverter.ToSingle(b, alku + q * askel + c * 4);
                return t;
            }

            int[] Indeksit(int i)
            {
                var (alku, askel, maara, komponentit, tyyppi) = Accessor(i);
                if (komponentit != 1 || tyyppi == 5126) throw new GlbVirhe("indeksit eivät ole kokonaislukuja");
                var t = new int[maara];
                for (int q = 0; q < maara; q++)
                {
                    int o = alku + q * askel;
                    t[q] = tyyppi == 5121 ? b[o] : tyyppi == 5123 ? b[o] | b[o + 1] << 8 : (int)U32(b, o);
                    if (t[q] < 0) throw new GlbVirhe("indeksi liian suuri");
                }
                return t;
            }

            /// <summary>Ensimmäisen materiaalin baseColorTexture (upotettu kuva), jos on.</summary>
            public void Kuva(GlbVerkko t)
            {
                var materiaalit = Lista("materials");
                if (materiaalit.Count == 0) return;
                var pbr = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.Objekti(materiaalit[0]), "pbrMetallicRoughness"));
                var bct = MiniJson.ObjektiTaiNull(MiniJson.Kentta(pbr, "baseColorTexture"));
                var ti = MiniJson.Luku(bct, "index");
                if (!ti.HasValue) return;
                var lahde = MiniJson.Luku(Alkio("textures", (int)ti.Value), "source") ?? throw new GlbVirhe("tekstuurilla ei lähdettä");
                var kuva = Alkio("images", (int)lahde);
                var bvi = MiniJson.Luku(kuva, "bufferView") ?? throw new GlbVirhe("kuva ei ole upotettu (uri ei tuettu)");
                var bv = Alkio("bufferViews", (int)bvi);
                int alku = (int)(MiniJson.Luku(bv, "byteOffset") ?? 0), n = (int)(MiniJson.Luku(bv, "byteLength") ?? 0);
                if (binAlku < 0 || alku + n > binPituus) throw new GlbVirhe("kuva yli puskurin");
                t.Kuva = new byte[n];
                Buffer.BlockCopy(b, binAlku + alku, t.Kuva, 0, n);
                t.KuvaTyyppi = MiniJson.Teksti(kuva, "mimeType");
            }
        }

        /// <summary>4×4-matriisi sarakepääjärjestyksessä (glTF), double-tarkkuus.</summary>
        readonly struct Matriisi
        {
            readonly double[] m;
            Matriisi(double[] a) { m = a; }
            public static Matriisi Yksikko => new Matriisi(new double[] { 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 });

            public static Matriisi Solmusta(Dictionary<string, object> n)
            {
                var mat = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(n, "matrix"));
                if (mat.Count == 16) { var a = new double[16]; for (int i = 0; i < 16; i++) a[i] = (double)mat[i]; return new Matriisi(a); }
                var t = Vektori(n, "translation", 3, 0);
                var r = Vektori(n, "rotation", 4, 0); if (MiniJson.Kentta(n, "rotation") == null) r[3] = 1;
                var s = Vektori(n, "scale", 3, 1);
                double x = r[0], y = r[1], z = r[2], w = r[3];
                // R · S sarakkeittain, T viimeisessä sarakkeessa.
                return new Matriisi(new[]
                {
                    (1 - 2 * (y * y + z * z)) * s[0], (2 * (x * y + z * w)) * s[0], (2 * (x * z - y * w)) * s[0], 0,
                    (2 * (x * y - z * w)) * s[1], (1 - 2 * (x * x + z * z)) * s[1], (2 * (y * z + x * w)) * s[1], 0,
                    (2 * (x * z + y * w)) * s[2], (2 * (y * z - x * w)) * s[2], (1 - 2 * (x * x + y * y)) * s[2], 0,
                    t[0], t[1], t[2], 1,
                });
            }

            static double[] Vektori(Dictionary<string, object> n, string nimi, int k, double oletus)
            {
                var l = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(n, nimi));
                var v = new double[k];
                for (int i = 0; i < k; i++) v[i] = i < l.Count ? (double)l[i] : oletus;
                return v;
            }

            public static Matriisi operator *(Matriisi a, Matriisi c)
            {
                var r = new double[16];
                for (int col = 0; col < 4; col++)
                    for (int row = 0; row < 4; row++)
                    {
                        double s = 0;
                        for (int k = 0; k < 4; k++) s += a.m[k * 4 + row] * c.m[col * 4 + k];
                        r[col * 4 + row] = s;
                    }
                return new Matriisi(r);
            }

            public void Piste(float x, float y, float z, out float ox, out float oy, out float oz)
            {
                ox = (float)(m[0] * x + m[4] * y + m[8] * z + m[12]);
                oy = (float)(m[1] * x + m[5] * y + m[9] * z + m[13]);
                oz = (float)(m[2] * x + m[6] * y + m[10] * z + m[14]);
            }

            public void Suunta(float x, float y, float z, out float ox, out float oy, out float oz)
            {
                ox = (float)(m[0] * x + m[4] * y + m[8] * z);
                oy = (float)(m[1] * x + m[5] * y + m[9] * z);
                oz = (float)(m[2] * x + m[6] * y + m[10] * z);
            }

            public double Determinantti() =>
                m[0] * (m[5] * m[10] - m[9] * m[6]) - m[4] * (m[1] * m[10] - m[9] * m[2]) + m[8] * (m[1] * m[6] - m[5] * m[2]);

            /// <summary>Normaalien matriisi: 3×3-osan käänteisen transpoosi (skaalattuna, suunta riittää).</summary>
            public Matriisi Normaalimatriisi()
            {
                double a = m[0], bb = m[4], c = m[8], d = m[1], e = m[5], f = m[9], g = m[2], h = m[6], k = m[10];
                // Liittomatriisi (kofaktorit) = det · käänteisen transpoosi; merkki säilyttää suunnan, kun det > 0.
                double s = Determinantti() < 0 ? -1 : 1;
                return new Matriisi(new[]
                {
                    s * (e * k - f * h), s * -(bb * k - c * h), s * (bb * f - c * e), 0,
                    s * -(d * k - f * g), s * (a * k - c * g), s * -(a * f - c * d), 0,
                    s * (d * h - e * g), s * -(a * h - bb * g), s * (a * e - bb * d), 0,
                    0, 0, 0, 1,
                });
            }
        }
    }

    public sealed class GlbVirhe : Exception
    {
        public GlbVirhe(string viesti) : base("GLB: " + viesti) { }
    }
}
