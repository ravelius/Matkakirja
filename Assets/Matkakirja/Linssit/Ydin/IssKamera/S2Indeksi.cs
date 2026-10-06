// ISS-KAMERA: Karttasepän "paras kesäkuva per S2-ruutu" -indeksi (media.matkakirja.app/linssit/astronautin-kamera/
// s2-indeksi/v1/indeksi.json, 1.10.2026): ruudut MGRS-tunnuksin, bbox [W,S,E,N], valinnat pisteiden mukaan (paras ensin,
// 1–3 kpl; TCI-arvo 0 = nodata → varakuva), yhteinen tci_lut (TCI-tavu → mosaiikin sävytys) ja ruudun vesisiirto.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.IssKamera
{
    public sealed class S2Valinta
    {
        public string Id, Tci, Scl, Pvm;
        public double Pilvi, Lumi, Nodata;
        /// <summary>v2 (Karttaseppä 5.10.): täytekuva toiselta suhteelliselta radalta valinnan 0 nodata-alueelle ("toinen_rata": true).</summary>
        public bool ToinenRata;
        /// <summary>v2b: täytekuvan sävy päävalinnan päällekkäisalueelta ("savy": {vahvistus: [r,g,b], siirto: [r,g,b]}); null = ei.</summary>
        public double[] Vahvistus, Siirto;
    }

    public sealed class S2IndeksiRuutu
    {
        public string Tunnus;
        public double W, S, E, N;
        public double[] Vesisiirto;
        /// <summary>Alueen tci_lut (maailman indeksi: jokaisella alueella oma sävytys); null = yhteinen KuvaData.Lut.</summary>
        public byte[] Lut;
        /// <summary>Alue, jonka indeksistä ruutu tuli (maailma.json; null = yksi indeksi).</summary>
        public string Alue;
        public readonly List<S2Valinta> Valinnat = new List<S2Valinta>();
        /// <summary>Toisen radan täytekuvan valinta (v2) tai -1.</summary>
        public int ToisenRadanValinta => Valinnat.FindIndex(v => v.ToinenRata);

        /// <summary>Valinta k (0 = paras) kuvasuunnitelman ruuduksi.</summary>
        public S2Ruutu Ruutu(int k = 0) => k < Valinnat.Count
            ? new S2Ruutu { Tunnus = k == 0 ? Tunnus : Tunnus + "#" + k, Url = Valinnat[k].Tci, Scl = Valinnat[k].Scl, Valinta = k,
                W = W, S = S, E = E, N = N, Nodata = Valinnat[k].Nodata, Lut = Lut, Vahvistus = Valinnat[k].Vahvistus, Siirto = Valinnat[k].Siirto } : null;
    }

    public sealed class S2Indeksi
    {
        public const string Osoite = "https://media.matkakirja.app/linssit/astronautin-kamera/s2-indeksi/" + S2Maailma.Versio + "/indeksi.json";
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
                    double[] Kolme(object v) { var t = MiniJson.TaulukkoTaiTyhja(v); return t.Count == 3 ? t.Select(Convert.ToDouble).ToArray() : null; }
                    var savy = MiniJson.ObjektiTaiNull(MiniJson.Kentta(vo, "savy"));
                    ru.Valinnat.Add(new S2Valinta {
                        Vahvistus = savy == null ? null : Kolme(MiniJson.Kentta(savy, "vahvistus")),
                        Siirto = savy == null ? null : Kolme(MiniJson.Kentta(savy, "siirto")), Id = MiniJson.Teksti(vo, "id"), Tci = MiniJson.Teksti(vo, "tci"), Scl = MiniJson.Teksti(vo, "scl"),
                        Pvm = MiniJson.Teksti(vo, "pvm"), Pilvi = MiniJson.Luku(vo, "pilvi") ?? 0, Lumi = MiniJson.Luku(vo, "lumi") ?? 0, Nodata = MiniJson.Luku(vo, "nodata") ?? 0,
                        ToinenRata = MiniJson.Totuus(vo, "toinen_rata") });
                }
                if (ru.Valinnat.Count > 0) r.Ruudut[kv.Key] = ru;
            }
            return r;
        }

        /// <summary>
        /// KOKO MAAILMA (omistaja 4.10.2026 klo 14.0x, loki #3936; Karttaseppä: alueindeksit samaa muotoa, maailma.json): alueiden
        /// indeksit yhdeksi etusijajärjestyksessä. Sama MGRS useammassa alueessa → ensimmäinen (etusijaltaan korkein) voittaa. Jokainen
        /// ruutu saa oman alueensa lutin (Uudelleenprojisointi soveltaa ruuduittain ennen saumasekoitusta), joten yhdistetyn Lut = null.
        /// </summary>
        public static S2Indeksi Yhdista(IEnumerable<(string alue, S2Indeksi indeksi)> etusijassa)
        {
            var r = new S2Indeksi { Versio = "maailma" };
            foreach (var (alue, ix) in etusijassa)
            {
                if (ix == null) continue;
                foreach (var kv in ix.Ruudut)
                {
                    if (r.Ruudut.ContainsKey(kv.Key)) continue;
                    kv.Value.Lut = ix.Lut;
                    kv.Value.Alue = alue;
                    r.Ruudut[kv.Key] = kv.Value;
                }
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

    /// <summary>
    /// Maailman S2-indeksin luettelo (Karttaseppä 4.10.2026: s2-indeksi/v1/maailma.json): {juuri, merkinta, etusija[], alueet{alue:
    /// {tiedosto, bbox [w, s, e, n], ruutuja}}}. Aluebboxit menevät päällekkäin (tropiikki kiertää maapallon); näkymän alueet
    /// etusijajärjestyksessä, vain tarvittavat ladataan (2,7–9 Mt kukin).
    /// </summary>
    public sealed class S2Maailma
    {
        /// <summary>Indeksin versio (polku ja laitteen välimuistin tiedostonimet): vaihto vain tästä, vanha välimuisti ei jää käyttöön.</summary>
        public const string Versio = "v2f";   // Karttaseppä 6.10.: Meksikon 11RQQ:n varakuvan sävy, vino meriraja (vasta junan 147 VIE:n jälkeen)
        public const string Osoite = "https://media.matkakirja.app/linssit/astronautin-kamera/s2-indeksi/" + Versio + "/maailma.json";
        public string Juuri, Merkinta;
        public readonly List<string> Etusija = new List<string>();
        /// <summary>Alue → tiedosto, rajaukset (bbox tai bboxit: päivämäärärajan ylittävä alue useana osana, aina w &lt; e) ja ruutumäärä.</summary>
        public readonly Dictionary<string, (string Tiedosto, List<(double W, double S, double E, double N)> Rajaukset, int Ruutuja)> Alueet =
            new Dictionary<string, (string, List<(double, double, double, double)>, int)>();

        public static S2Maailma Jasenna(string json, string oletusJuuri = null)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var m = new S2Maailma { Juuri = MiniJson.Teksti(j, "juuri") ?? oletusJuuri, Merkinta = MiniJson.Teksti(j, "merkinta") };
            foreach (var e in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "etusija"))) if (e is string t) m.Etusija.Add(t);
            var alueet = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "alueet"));
            if (alueet != null)
                foreach (var kv in alueet)
                {
                    var o = MiniJson.ObjektiTaiNull(kv.Value); if (o == null) continue;
                    string tiedosto = MiniJson.Teksti(o, "tiedosto");
                    var rajaukset = new List<(double, double, double, double)>();
                    var lista = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "bboxit"));
                    if (lista.Count == 0) lista = new List<object> { MiniJson.Kentta(o, "bbox") };
                    foreach (var x in lista)
                    {
                        var b = MiniJson.TaulukkoTaiTyhja(x);
                        if (b.Count == 4) rajaukset.Add((Convert.ToDouble(b[0]), Convert.ToDouble(b[1]), Convert.ToDouble(b[2]), Convert.ToDouble(b[3])));
                    }
                    if (rajaukset.Count == 0 || tiedosto == null) continue;
                    m.Alueet[kv.Key] = (tiedosto, rajaukset, (int)(MiniJson.Luku(o, "ruutuja") ?? 0));
                    if (!m.Etusija.Contains(kv.Key)) m.Etusija.Add(kv.Key);   // luettelon ulkopuolinen alue viimeiseksi
                }
            return m;
        }

        /// <summary>Alueen indeksin osoite (juuri + tiedosto; tiedosto voi olla myös täysi osoite).</summary>
        public string Osoitteeksi(string alue)
        {
            var t = Alueet[alue].Tiedosto;
            if (t.StartsWith("http")) return t;
            string j = Juuri ?? Osoite.Substring(0, Osoite.LastIndexOf('/') + 1);
            return j.EndsWith("/") ? j + t : j + "/" + t;
        }

        /// <summary>Alueet, joiden bbox leikkaa näkymän rajauksen, etusijajärjestyksessä (w &gt; e = vaihtopäivän yli).</summary>
        public List<string> Nakymassa(double w, double s, double e, double n)
        {
            var r = new List<string>();
            foreach (var a in Etusija)
            {
                if (!Alueet.TryGetValue(a, out var al)) continue;
                foreach (var b in al.Rajaukset)
                    if (!(b.N < s || b.S > n) && LonLeikkaa(b.W, b.E, w, e)) { r.Add(a); break; }
            }
            return r;
        }

        static bool LonLeikkaa(double aw, double ae, double bw, double be)
        {
            // Välit voivat kiertää vaihtopäivän yli (w > e): jaetaan kahteen osaan.
            foreach (var (x0, x1) in Osat(aw, ae))
                foreach (var (y0, y1) in Osat(bw, be))
                    if (!(x1 < y0 || x0 > y1)) return true;
            return false;
        }

        static IEnumerable<(double, double)> Osat(double w, double e)
        {
            if (w <= e) { yield return (w, e); yield break; }
            yield return (w, 180); yield return (-180, e);
        }
    }
}
