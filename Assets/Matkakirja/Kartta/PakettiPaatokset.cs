using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja
{
    /// <summary>
    /// SISÄLTÖPAKETIN TAUSTAPÄIVITYS, puhtaat päätökset (Siirtoseppä; suunnitelma
    /// docs/raportit/paketin-taustapaivitys-suunnitelma-20260925.md, vaihe 2). Ei UnityEngineä: Kartta-testit ajaa nämä
    /// dotnetilla. Paketin puoli (vaihe 1, tools/vienti/julkaise-sisalto.mjs): osoittimessa hakemisto { polku, sha256,
    /// tavuja }, tavuja, siirto ja tasoittain.ios; versiokansiossa hakemisto.json = kaikki tiedostot { polku, sha256, tavuja,
    /// siirto }. osoitin.sha256 = sha256 riveistä "polku\tsha256\n" polun mukaan järjestettynä.
    /// </summary>
    public static class PakettiPaatokset
    {
        public sealed class Osoitin
        {
            public int Versio;
            public string Polku, Sha256, Skeemaversio;
            public int? MinIos;
            public string HakemistoSha256;
            public long HakemistoTavuja, Tavuja, Siirto;
            /// <summary>Sisältötaso → versio (tasoittain.ios). Tyhjä vanhoissa osoittimissa.</summary>
            public readonly Dictionary<int, int> Tasoittain = new Dictionary<int, int>();
        }

        public sealed class Rivi
        {
            public string Polku, Sha256;
            public long Tavuja, Siirto;
        }

        public static Osoitin LueOsoitin(string json)
        {
            var o = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json));
            if (o == null) return null;
            var tulos = new Osoitin
            {
                Versio = (int)(MiniJson.Luku(o, "versio") ?? 0),
                Polku = MiniJson.Teksti(o, "polku"),
                Sha256 = MiniJson.Teksti(o, "sha256"),
                Skeemaversio = MiniJson.Teksti(o, "skeemaversio"),
                Tavuja = (long)(MiniJson.Luku(o, "tavuja") ?? 0),
                Siirto = (long)(MiniJson.Luku(o, "siirto") ?? 0),
            };
            var min = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "minSovellus"));
            if (min != null && MiniJson.Luku(min, "ios") is double ios) tulos.MinIos = (int)ios;
            var h = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "hakemisto"));
            if (h != null)
            {
                tulos.HakemistoSha256 = MiniJson.Teksti(h, "sha256");
                tulos.HakemistoTavuja = (long)(MiniJson.Luku(h, "tavuja") ?? 0);
            }
            var t = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "tasoittain")) ?? new Dictionary<string, object>(), "ios"));
            if (t != null)
                foreach (var kv in t)
                    if (int.TryParse(kv.Key, NumberStyles.Integer, CultureInfo.InvariantCulture, out int taso) && kv.Value is double v)
                        tulos.Tasoittain[taso] = (int)v;
            return string.IsNullOrEmpty(tulos.Polku) || tulos.Versio <= 0 ? null : tulos;
        }

        /// <summary>
        /// Versio, jonka tämän buildin sisältötaso osaa lukea: tasoittain[taso], jos kartassa on taso; muuten osoittimen
        /// versio, jos minSovellus.ios ≤ taso (tai puuttuu); muuten 0 = ei sopivaa versiota (pysytään käytössä olevassa).
        /// Tasoittain-kartan versiolle haetaan oma osoitin (sisalto/&lt;p&gt;/v&lt;N&gt;/osoitin.json).
        /// </summary>
        public static int KohdeVersio(Osoitin o, int sisaltoTaso)
        {
            if (o == null) return 0;
            if (o.Tasoittain.TryGetValue(sisaltoTaso, out int v)) return v;
            return o.MinIos == null || o.MinIos <= sisaltoTaso ? o.Versio : 0;
        }

        /// <summary>Versiopolku toiselle versiolle samassa pääversiossa: "sisalto/1/v107/" → "sisalto/1/v106/".</summary>
        public static string VersionPolku(string polku, int versio)
        {
            if (string.IsNullOrEmpty(polku)) return null;
            int v = polku.TrimEnd('/').LastIndexOf("/v", StringComparison.Ordinal);
            return v < 0 ? null : polku.Substring(0, v) + "/v" + versio.ToString(CultureInfo.InvariantCulture) + "/";
        }

        /// <summary>Versionumero polusta ("sisalto/1/v107/" → 107; 0 jos ei jäsenny).</summary>
        public static int VersioPolusta(string polku)
        {
            if (string.IsNullOrEmpty(polku)) return 0;
            var s = polku.TrimEnd('/');
            int v = s.LastIndexOf("/v", StringComparison.Ordinal);
            return v >= 0 && int.TryParse(s.Substring(v + 2), NumberStyles.Integer, CultureInfo.InvariantCulture, out int n) ? n : 0;
        }

        public static List<Rivi> LueHakemisto(string json)
        {
            var o = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json));
            var rivit = new List<Rivi>();
            foreach (var x in MiniJson.TaulukkoTaiTyhja(o == null ? null : MiniJson.Kentta(o, "tiedostot")))
            {
                var r = MiniJson.ObjektiTaiNull(x);
                if (r == null) continue;
                rivit.Add(new Rivi
                {
                    Polku = MiniJson.Teksti(r, "polku"),
                    Sha256 = MiniJson.Teksti(r, "sha256"),
                    Tavuja = (long)(MiniJson.Luku(r, "tavuja") ?? 0),
                    Siirto = (long)(MiniJson.Luku(r, "siirto") ?? 0),
                });
            }
            return rivit;
        }

        public static string Sha256(byte[] tavut)
        {
            using (var h = SHA256.Create()) return Heksa(h.ComputeHash(tavut));
        }

        public static string Sha256(System.IO.Stream virta)
        {
            using (var h = SHA256.Create()) return Heksa(h.ComputeHash(virta));
        }

        static string Heksa(byte[] b)
        {
            var sb = new StringBuilder(b.Length * 2);
            foreach (var x in b) sb.Append(x.ToString("x2", CultureInfo.InvariantCulture));
            return sb.ToString();
        }

        /// <summary>
        /// Paketin tiiviste hakemiston riveistä, sama sääntö kuin julkaise-sisalto.mjs paketinTiiviste: rivit
        /// "polku\tsha256\n" polun mukaan järjestettynä (ordinaali = JS:n sort UTF-16-yksiköittäin).
        /// </summary>
        public static string PaketinTiiviste(IEnumerable<Rivi> rivit)
        {
            var sb = new StringBuilder();
            foreach (var r in rivit.OrderBy(r => r.Polku, StringComparer.Ordinal)) sb.Append(r.Polku).Append('\t').Append(r.Sha256).Append('\n');
            return Sha256(Encoding.UTF8.GetBytes(sb.ToString()));
        }

        /// <summary>Hakemisto kelpaa: oma tiiviste osoittimen mukainen ja rivien tiiviste = osoitin.sha256.</summary>
        public static string TarkistaHakemisto(Osoitin o, byte[] hakemisto, out List<Rivi> rivit)
        {
            rivit = null;
            if (o == null) return "ei osoitinta";
            if (string.IsNullOrEmpty(o.HakemistoSha256)) return "osoittimessa ei hakemistoa (paketti ennen vaihetta 1)";
            if (Sha256(hakemisto) != o.HakemistoSha256) return "hakemiston sha256 ei täsmää";
            rivit = LueHakemisto(Encoding.UTF8.GetString(hakemisto));
            if (rivit.Count == 0 || rivit.Any(r => string.IsNullOrEmpty(r.Polku) || string.IsNullOrEmpty(r.Sha256))) return "hakemisto tyhjä tai rikki";
            return PaketinTiiviste(rivit) == o.Sha256 ? null : "rivien tiiviste ei vastaa osoittimen sha256:ta";
        }

        /// <summary>Puuttuvat sisällöt: yksi rivi kutakin sha256:ta kohden, jota varastossa ei ole.</summary>
        public static List<Rivi> Puuttuvat(IEnumerable<Rivi> rivit, Func<string, bool> varastossa)
        {
            var nahty = new HashSet<string>();
            var ulos = new List<Rivi>();
            foreach (var r in rivit)
                if (nahty.Add(r.Sha256) && !varastossa(r.Sha256)) ulos.Add(r);
            return ulos;
        }

        /// <summary>
        /// Käyttöön otettava versio käynnistyksessä: osoittimen kohde, jos se on valmis; muuten käytössä ollut valmis versio;
        /// muuten 0 = ei valmista (luetaan laiskasti osoittimen polusta kuten ennen taustapäivitystä).
        /// Palautus (osoitin taaksepäin) valitsee vanhemman valmiin version ilman latausta.
        /// </summary>
        public static int ValitseKaytto(int kohde, int kaytossa, ICollection<int> valmiit)
        {
            if (kohde > 0 && valmiit.Contains(kohde)) return kohde;
            if (kaytossa > 0 && valmiit.Contains(kaytossa) && (kohde == 0 || kaytossa <= kohde)) return kaytossa;
            return 0;
        }

        /// <summary>
        /// Säilytettävät versiot: käytössä oleva, edellinen valmis sitä vanhempi (palautus ilman latausta) sekä KAIKKI
        /// käytössä olevaa uudemmat, valmiit ja kesken olevat. Taustapäivitys lataa seuraavan version valmiiksi samalla
        /// käynnistyksellä, ja se otetaan käyttöön vasta seuraavalla (Natiivi-UI 26.9.: siivous poisti juuri valmistuneen
        /// v151:n, ja laite jäi v145:een). Muut poistetaan.
        /// </summary>
        public static HashSet<int> Sailytettavat(int kaytossa, ICollection<int> valmiit, ICollection<int> kesken)
        {
            var s = new HashSet<int>();
            if (kaytossa <= 0) { foreach (var v in valmiit) s.Add(v); foreach (var v in kesken) s.Add(v); return s; }
            s.Add(kaytossa);
            int edellinen = valmiit.Where(v => v < kaytossa).DefaultIfEmpty(0).Max();
            if (edellinen > 0) s.Add(edellinen);
            foreach (var v in valmiit) if (v > kaytossa) s.Add(v);
            foreach (var v in kesken) if (v > kaytossa) s.Add(v);
            return s;
        }

        /// <summary>
        /// SISÄLTÖ VAIHTUI (löydös 170, Fable 26.9.2026): uuden version polut, joiden sisältö eroaa käytössä olleesta
        /// (uusi polku tai eri sha256), sekä poistuneet polut. Järjestys: uuden hakemiston järjestys, poistuneet perään.
        /// </summary>
        public static List<string> Muuttuneet(IDictionary<string, string> vanha, IEnumerable<Rivi> uusi)
        {
            var ulos = new List<string>();
            var uudet = new HashSet<string>();
            foreach (var r in uusi)
            {
                uudet.Add(r.Polku);
                if (vanha == null || !vanha.TryGetValue(r.Polku, out var sha) || sha != r.Sha256) ulos.Add(r.Polku);
            }
            if (vanha != null) foreach (var p in vanha.Keys) if (!uudet.Contains(p)) ulos.Add(p);
            return ulos;
        }

        /// <summary>
        /// Otetaanko juuri valmistunut versio käyttöön kesken istunnon: vain uudempi kuin istunnon versio (palautus eli
        /// vanhempi kohde odottaa seuraavaa käynnistystä, jotta kesken olevan pelin sisältö ei hyppää taaksepäin).
        /// </summary>
        public static bool VaihdaKeskenIstunnon(int valmis, int istunnon) => valmis > 0 && valmis > istunnon;

        /// <summary>Varaston tiedostot (sha256), joihin yksikään säilytettävä hakemisto ei viittaa.</summary>
        public static List<string> Orvot(IEnumerable<string> varasto, IEnumerable<IEnumerable<Rivi>> sailytettavat)
        {
            var kaytetyt = new HashSet<string>(sailytettavat.SelectMany(h => h.Select(r => r.Sha256)));
            return varasto.Where(sha => !kaytetyt.Contains(sha)).ToList();
        }
    }
}
