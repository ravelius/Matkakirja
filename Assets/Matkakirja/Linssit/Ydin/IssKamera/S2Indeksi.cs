// ISS-KAMERA: Karttasepän "paras kesäkuva per S2-ruutu" -indeksi (media.matkakirja.app/linssit/astronautin-kamera/
// s2-indeksi/v1/indeksi.json, 1.10.2026): ruudut MGRS-tunnuksin, bbox [W,S,E,N], valinnat pisteiden mukaan (paras ensin,
// 1–3 kpl; TCI-arvo 0 = nodata → varakuva), yhteinen tci_lut (TCI-tavu → mosaiikin sävytys) ja ruudun vesisiirto.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class S2Valinta
    {
        public string Id, Tci, Scl, Pvm;
        public double Pilvi, Lumi, Nodata;
    }

    public sealed class S2IndeksiRuutu
    {
        public string Tunnus;
        public double W, S, E, N;
        public double[] Vesisiirto;
        public readonly List<S2Valinta> Valinnat = new List<S2Valinta>();

        /// <summary>Valinta k (0 = paras) kuvasuunnitelman ruuduksi.</summary>
        public S2Ruutu Ruutu(int k = 0) => k < Valinnat.Count
            ? new S2Ruutu { Tunnus = k == 0 ? Tunnus : Tunnus + "#" + k, Url = Valinnat[k].Tci, Scl = Valinnat[k].Scl, Valinta = k,
                W = W, S = S, E = E, N = N, Nodata = Valinnat[k].Nodata } : null;
    }

    public sealed class S2Indeksi
    {
        public const string Osoite = "https://media.matkakirja.app/linssit/astronautin-kamera/s2-indeksi/v1/indeksi.json";
        public string Versio;
        public byte[] Lut;
        public readonly Dictionary<string, S2IndeksiRuutu> Ruudut = new Dictionary<string, S2IndeksiRuutu>();

        public static S2Indeksi Jasenna(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            var r = new S2Indeksi { Versio = MiniJson.Teksti(juuri, "versio") };
            var lut = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "tci_lut"));
            if (lut.Count == 256) { r.Lut = new byte[256]; for (int i = 0; i < 256; i++) r.Lut[i] = (byte)Math.Max(0, Math.Min(255, Convert.ToDouble(lut[i]))); }
            var ruudut = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "ruudut"));
            if (ruudut == null) return r;
            foreach (var kv in ruudut)
            {
                var o = MiniJson.ObjektiTaiNull(kv.Value); if (o == null) continue;
                var b = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "bbox"));
                if (b.Count != 4) continue;
                var ru = new S2IndeksiRuutu { Tunnus = kv.Key, W = Convert.ToDouble(b[0]), S = Convert.ToDouble(b[1]), E = Convert.ToDouble(b[2]), N = Convert.ToDouble(b[3]) };
                var vs = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "vesisiirto"));
                if (vs.Count == 3) ru.Vesisiirto = new[] { Convert.ToDouble(vs[0]), Convert.ToDouble(vs[1]), Convert.ToDouble(vs[2]) };
                foreach (var v in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "valinnat")))
                {
                    var vo = MiniJson.ObjektiTaiNull(v); if (vo == null || MiniJson.Teksti(vo, "tci") == null) continue;
                    ru.Valinnat.Add(new S2Valinta { Id = MiniJson.Teksti(vo, "id"), Tci = MiniJson.Teksti(vo, "tci"), Scl = MiniJson.Teksti(vo, "scl"),
                        Pvm = MiniJson.Teksti(vo, "pvm"), Pilvi = MiniJson.Luku(vo, "pilvi") ?? 0, Lumi = MiniJson.Luku(vo, "lumi") ?? 0, Nodata = MiniJson.Luku(vo, "nodata") ?? 0 });
                }
                if (ru.Valinnat.Count > 0) r.Ruudut[kv.Key] = ru;
            }
            return r;
        }

        /// <summary>Ruudut, joiden bbox leikkaa alueen (kuvasuunnitelman esikarsinta).</summary>
        public IEnumerable<S2IndeksiRuutu> Alueella(double w, double s, double e, double n)
        {
            foreach (var ru in Ruudut.Values)
                if (!(ru.E < w || ru.W > e || ru.N < s || ru.S > n)) yield return ru;
        }
    }
}
