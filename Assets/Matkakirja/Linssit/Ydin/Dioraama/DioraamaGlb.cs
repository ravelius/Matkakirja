// KAPEA GLB-LUKIJA DIORAAMALLE (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 3 ja 5).
// OMA LUKIJA (ei Matkakirja.Peli.GlbLukija, jota ei muokata): dioraaman glb poikkeaa maamerkkien glb:stä
// kolmella tavalla, joita yleinen lukija ei tue: (1) YKSI mesh, USEITA primitiivejä (yksi per käytetty pinta,
// extras.pinta/materiaalin nimi = pinnan id), (2) COLOR_0 UNSIGNED_BYTE NORMALIZED VEC4 (AO/lämpö; yleinen
// lukija hylkää kaiken normalisoinnin), (3) indeksit UINT32.
//
// Tuettu: glTF 2.0 binääri, yksi solmu jolla on mesh (ei hierarkiaa), kolmiot (mode 4), POSITION/NORMAL float
// VEC3, TEXCOORD_0 float VEC2 (rakennuskoneen oma tasoprojektio — EI käännetä, ks. kohta 3), COLOR_0
// UNSIGNED_BYTE normalized VEC4, indeksit ubyte/ushort/uint. Muu (sparse, skin, morph, ulkoiset puskurit) →
// GlbVirhe, ei arvausta.
//
// unityyn = true: (x, y, z) → (x, y, −z) paikoille ja normaaleille, kolmion kiertosuunta käännetään
// (i0, i2, i1) — sama kaava kuin kohdan 0 Unity-muunnos (+Z_unity = pohjoinen). unityyn = false palauttaa
// kanonisen kehyksen (+Z = etelä) sellaisenaan.
using System;
using System.Collections.Generic;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Yhden pinnan primitiivi tilan glb:ssä.</summary>
    public sealed class GlbOsa
    {
        public string Pinta;
        public float[] Paikat;
        public float[] Normaalit;
        public float[] Uv;
        /// <summary>COLOR_0 raakoina tavuina RGBA (R = AO, G = lämpö, B = 0, A = 255; kohta 3).</summary>
        public byte[] Varit;
        public int[] Kolmiot;
    }

    /// <summary>Tilan koko glb: yksi mesh (solmun nimi), primitiivi per käytetty pinta.</summary>
    public sealed class GlbMalli
    {
        public string Nimi;
        public List<GlbOsa> Osat = new List<GlbOsa>();
    }

    public static class DioraamaGlb
    {
        const uint Magic = 0x46546C67, JsonPala = 0x4E4F534A, BinPala = 0x004E4942;

        /// <summary>Lukee dioraaman glb:n. unityyn = true kääntää Unityn kehykseen (ks. tiedoston alun huomautus).</summary>
        public static GlbMalli Lue(byte[] glb, bool unityyn)
        {
            if (glb == null || glb.Length < 20) throw new DioraamaGlbVirhe("liian lyhyt");
            if (U32(glb, 0) != Magic) throw new DioraamaGlbVirhe("ei glTF-binääri");
            if (U32(glb, 4) != 2) throw new DioraamaGlbVirhe("versio " + U32(glb, 4));
            int pituus = (int)Math.Min(U32(glb, 8), (uint)glb.Length);
            Dictionary<string, object> json = null;
            int binAlku = -1, binPituus = 0;
            for (int k = 12; k + 8 <= pituus;)
            {
                int n = (int)U32(glb, k); uint tyyppi = U32(glb, k + 4);
                if (n < 0 || k + 8 + n > pituus) throw new DioraamaGlbVirhe("pala yli tiedoston");
                if (tyyppi == JsonPala && json == null) json = MiniJson.Objekti(MiniJson.Jasenna(Encoding.UTF8.GetString(glb, k + 8, n)));
                else if (tyyppi == BinPala && binAlku < 0) { binAlku = k + 8; binPituus = n; }
                k += 8 + ((n + 3) & ~3);
            }
            if (json == null) throw new DioraamaGlbVirhe("JSON-pala puuttuu");
            return new Lukija(json, glb, binAlku, binPituus, unityyn).Kokoa();
        }

        static uint U32(byte[] b, int i) => (uint)(b[i] | b[i + 1] << 8 | b[i + 2] << 16 | b[i + 3] << 24);

        sealed class Lukija
        {
            readonly Dictionary<string, object> j;
            readonly byte[] b;
            readonly int binAlku, binPituus;
            readonly bool unityyn;

            public Lukija(Dictionary<string, object> json, byte[] glb, int alku, int pituus, bool unityyn)
            { j = json; b = glb; binAlku = alku; binPituus = pituus; this.unityyn = unityyn; }

            List<object> Lista(string nimi) => MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, nimi));

            Dictionary<string, object> Alkio(string lista, int i)
            {
                var l = Lista(lista);
                if (i < 0 || i >= l.Count) throw new DioraamaGlbVirhe($"{lista}[{i}] puuttuu");
                return MiniJson.Objekti(l[i]);
            }

            public GlbMalli Kokoa()
            {
                var solmut = Lista("nodes");
                int solmuIndeksi = -1;
                for (int i = 0; i < solmut.Count; i++)
                    if (MiniJson.Luku(MiniJson.Objekti(solmut[i]), "mesh").HasValue) { solmuIndeksi = i; break; }
                if (solmuIndeksi < 0) throw new DioraamaGlbVirhe("ei solmua, jolla on mesh");
                var solmu = MiniJson.Objekti(solmut[solmuIndeksi]);
                if (MiniJson.Kentta(solmu, "skin") != null) throw new DioraamaGlbVirhe("skin ei tuettu");
                if (MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(solmu, "children")).Count > 0)
                    throw new DioraamaGlbVirhe("solmuhierarkia ei tuettu (speksi: yksi solmu)");
                string nimi = MiniJson.Teksti(solmu, "name");
                int meshI = (int)MiniJson.Luku(solmu, "mesh").Value;
                var mesh = Alkio("meshes", meshI);
                var materiaalit = Lista("materials");

                var malli = new GlbMalli { Nimi = nimi };
                foreach (var po in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(mesh, "primitives")))
                {
                    var p = MiniJson.Objekti(po);
                    if ((int)(MiniJson.Luku(p, "mode") ?? 4) != 4) throw new DioraamaGlbVirhe("vain kolmiot (mode 4)");
                    if (MiniJson.Kentta(p, "targets") != null) throw new DioraamaGlbVirhe("morph ei tuettu");
                    var a = MiniJson.Objekti(MiniJson.Kentta(p, "attributes"));
                    var pos = FloatVec(a, "POSITION", 3) ?? throw new DioraamaGlbVirhe("POSITION puuttuu");
                    var nor = FloatVec(a, "NORMAL", 3);
                    var tex = FloatVec(a, "TEXCOORD_0", 2);
                    var vari = ColorVec(a, "COLOR_0");
                    int k = pos.Length / 3;

                    var paikat = new float[pos.Length];
                    for (int q = 0; q < k; q++)
                    {
                        paikat[q * 3] = pos[q * 3];
                        paikat[q * 3 + 1] = pos[q * 3 + 1];
                        paikat[q * 3 + 2] = unityyn ? -pos[q * 3 + 2] : pos[q * 3 + 2];
                    }
                    float[] normaalit = null;
                    if (nor != null)
                    {
                        normaalit = new float[nor.Length];
                        for (int q = 0; q < k; q++)
                        {
                            normaalit[q * 3] = nor[q * 3];
                            normaalit[q * 3 + 1] = nor[q * 3 + 1];
                            normaalit[q * 3 + 2] = unityyn ? -nor[q * 3 + 2] : nor[q * 3 + 2];
                        }
                    }

                    var ind = MiniJson.Luku(p, "indices");
                    var ii = ind.HasValue ? Indeksit((int)ind.Value) : Jarjestys(k);
                    if (ii.Length % 3 != 0) throw new DioraamaGlbVirhe("indeksit eivät ole kolmioita");
                    var kolmiot = new int[ii.Length];
                    for (int q = 0; q < ii.Length; q += 3)
                    {
                        if (ii[q] >= k || ii[q + 1] >= k || ii[q + 2] >= k) throw new DioraamaGlbVirhe("indeksi yli kärkien");
                        kolmiot[q] = ii[q];
                        kolmiot[q + 1] = unityyn ? ii[q + 2] : ii[q + 1];
                        kolmiot[q + 2] = unityyn ? ii[q + 1] : ii[q + 2];
                    }

                    string pinta = MiniJson.Teksti(MiniJson.ObjektiTaiNull(MiniJson.Kentta(p, "extras")), "pinta");
                    if (pinta == null)
                    {
                        var matI = MiniJson.Luku(p, "material");
                        if (matI.HasValue && (int)matI.Value < materiaalit.Count)
                            pinta = MiniJson.Teksti(MiniJson.Objekti(materiaalit[(int)matI.Value]), "name");
                    }

                    malli.Osat.Add(new GlbOsa { Pinta = pinta, Paikat = paikat, Normaalit = normaalit, Uv = tex, Varit = vari, Kolmiot = kolmiot });
                }
                if (malli.Osat.Count == 0) throw new DioraamaGlbVirhe("ei primitiivejä");
                return malli;
            }

            static int[] Jarjestys(int n) { var t = new int[n]; for (int i = 0; i < n; i++) t[i] = i; return t; }

            /// <summary>Accessorin tavualue: (alku, askel, määrä, komponentit, componentType, normalized).</summary>
            (int alku, int askel, int maara, int komponentit, int tyyppi, bool normalisoitu) Accessor(int i)
            {
                var a = Alkio("accessors", i);
                if (MiniJson.Kentta(a, "sparse") != null) throw new DioraamaGlbVirhe("sparse ei tuettu");
                int tyyppi = (int)(MiniJson.Luku(a, "componentType") ?? 0);
                int maara = (int)(MiniJson.Luku(a, "count") ?? 0);
                int komponentit = MiniJson.Teksti(a, "type") switch
                {
                    "SCALAR" => 1, "VEC2" => 2, "VEC3" => 3, "VEC4" => 4,
                    var x => throw new DioraamaGlbVirhe("accessor-tyyppi " + x),
                };
                int koko = tyyppi switch { 5120 => 1, 5121 => 1, 5122 => 2, 5123 => 2, 5125 => 4, 5126 => 4, _ => throw new DioraamaGlbVirhe("componentType " + tyyppi) };
                var bvi = MiniJson.Luku(a, "bufferView") ?? throw new DioraamaGlbVirhe("accessor ilman bufferViewiä (ulkoinen data ei tuettu)");
                var bv = Alkio("bufferViews", (int)bvi);
                if ((int)(MiniJson.Luku(bv, "buffer") ?? 0) != 0 || binAlku < 0)
                    throw new DioraamaGlbVirhe("vain upotettu BIN-puskuri (ulkoiset tiedostot eivät tuettu)");
                int bvAlku = (int)(MiniJson.Luku(bv, "byteOffset") ?? 0), bvPituus = (int)(MiniJson.Luku(bv, "byteLength") ?? 0);
                int askel = (int)(MiniJson.Luku(bv, "byteStride") ?? 0);
                if (askel == 0) askel = koko * komponentit;
                int alku = bvAlku + (int)(MiniJson.Luku(a, "byteOffset") ?? 0);
                long loppu = maara == 0 ? alku : (long)alku + (long)askel * (maara - 1) + koko * komponentit;
                if (bvAlku + bvPituus > binPituus || loppu > bvAlku + bvPituus) throw new DioraamaGlbVirhe("accessor yli puskurin");
                return (binAlku + alku, askel, maara, komponentit, tyyppi, MiniJson.Totuus(a, "normalized"));
            }

            float[] FloatVec(Dictionary<string, object> attr, string nimi, int komponenttejaOdotettu)
            {
                var i = MiniJson.Luku(attr, nimi);
                if (!i.HasValue) return null;
                var (alku, askel, maara, komponentit, tyyppi, _) = Accessor((int)i.Value);
                if (tyyppi != 5126 || komponentit != komponenttejaOdotettu) throw new DioraamaGlbVirhe(nimi + " ei ole float VEC" + komponenttejaOdotettu);
                var t = new float[maara * komponentit];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < komponentit; c++)
                        t[q * komponentit + c] = BitConverter.ToSingle(b, alku + q * askel + c * 4);
                return t;
            }

            /// <summary>COLOR_0: UNSIGNED_BYTE normalized VEC4 (kohta 3) → raa'at tavut RGBA sellaisinaan.</summary>
            byte[] ColorVec(Dictionary<string, object> attr, string nimi)
            {
                var i = MiniJson.Luku(attr, nimi);
                if (!i.HasValue) return null;
                var (alku, askel, maara, komponentit, tyyppi, normalisoitu) = Accessor((int)i.Value);
                if (tyyppi != 5121 || komponentit != 4 || !normalisoitu) throw new DioraamaGlbVirhe(nimi + " ei ole normalisoitu UNSIGNED_BYTE VEC4");
                var t = new byte[maara * 4];
                for (int q = 0; q < maara; q++)
                    for (int c = 0; c < 4; c++)
                        t[q * 4 + c] = b[alku + q * askel + c];
                return t;
            }

            int[] Indeksit(int i)
            {
                var (alku, askel, maara, komponentit, tyyppi, _) = Accessor(i);
                if (komponentit != 1 || tyyppi == 5126) throw new DioraamaGlbVirhe("indeksit eivät ole kokonaislukuja");
                var t = new int[maara];
                for (int q = 0; q < maara; q++)
                {
                    int o = alku + q * askel;
                    t[q] = tyyppi switch
                    {
                        5121 => b[o],
                        5123 => b[o] | b[o + 1] << 8,
                        5125 => (int)U32(b, o),
                        _ => throw new DioraamaGlbVirhe("indeksien componentType " + tyyppi),
                    };
                    if (t[q] < 0) throw new DioraamaGlbVirhe("indeksi liian suuri");
                }
                return t;
            }
        }
    }

    public sealed class DioraamaGlbVirhe : Exception
    {
        public DioraamaGlbVirhe(string viesti) : base("Dioraama GLB: " + viesti) { }
    }
}
