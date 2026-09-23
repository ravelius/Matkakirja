// Yhteiset apurit värivirtojen kultaisille testeille: kultaiset/-kansion
// haku, JSONin jäsennys MiniJsonin muotoon (Dictionary/List/double;
// System.Text.Json, koska Ydin-testit eivät käännä Peli-kokoonpanoa),
// FNV-1a-tiivisteet taulukoista ja kerran laskettu kenttäkooste.
//
// Kultaiset tiedostot tekee Linssit-testit/kultaiset/tee-kultaiset.mjs
// verkkopelin omalla laskentamoduulilla.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text.Json;
using Matkakirja.Linssit.Virrat;

namespace Matkakirja.Linssit.Testit
{
    static class VirratApu
    {
        static string juuri;
        static Dictionary<string, object> kultaiset;
        static Dictionary<string, object> aineistoJson;
        static VirtaAineisto aineisto;
        static byte[] maa;
        static Kentat kentat;
        static VirranKentta retki;

        /// <summary>Kansio kultaiset/ (kaanna.sh ajaa Linssit-testit-kansiosta; haetaan varmuuden vuoksi ylöspäin).</summary>
        public static string Kansio
        {
            get
            {
                if (juuri != null) return juuri;
                var d = new DirectoryInfo(Directory.GetCurrentDirectory());
                while (d != null && !File.Exists(Path.Combine(d.FullName, "kultaiset", "virrat-kultaiset.json"))
                       && !File.Exists(Path.Combine(d.FullName, "Linssit-testit", "kultaiset", "virrat-kultaiset.json"))) d = d.Parent;
                if (d == null) throw new Exception("kultaiset/virrat-kultaiset.json ei löydy");
                var suora = Path.Combine(d.FullName, "kultaiset");
                juuri = File.Exists(Path.Combine(suora, "virrat-kultaiset.json")) ? suora : Path.Combine(d.FullName, "Linssit-testit", "kultaiset");
                return juuri;
            }
        }

        public static Dictionary<string, object> Kultaiset =>
            kultaiset ??= (Dictionary<string, object>)Jasenna(File.ReadAllText(Path.Combine(Kansio, "virrat-kultaiset.json")));

        public static Dictionary<string, object> AineistoJson =>
            aineistoJson ??= (Dictionary<string, object>)Jasenna(File.ReadAllText(Path.Combine(Kansio, "virrat-aineisto.json")));

        public static VirtaAineisto Aineisto => aineisto ??= AineistonLukija.Lue(AineistoJson);

        public static byte[] Maa => maa ??= Ruudukko.PuraMaamaski(Aineisto.Maamaski.Juoksut);

        /// <summary>Koko kaaren kentät (laskettu kerran testiajossa).</summary>
        public static Kentat Laskettu => kentat ??= VirtaLaskenta.LaskeKentat(Aineisto, Maa);

        /// <summary>Retken täysi kenttä (Kentat sisältää vain retken ajat).</summary>
        public static VirranKentta Retki => retki ??= VirtaLaskenta.LaskeVirta(Aineisto.Retki,
            new Ymparisto { Maa = Maa, Rannikko = Laskettu.Rannikko });

        /* ---------------------------------------------------------- JSON */

        /// <summary>JSON → Dictionary/List/double/bool/string/null (sama muoto kuin MiniJson).</summary>
        public static object Jasenna(string teksti)
        {
            using var doc = JsonDocument.Parse(teksti);
            return Muunna(doc.RootElement);
        }

        static object Muunna(JsonElement e)
        {
            switch (e.ValueKind)
            {
                case JsonValueKind.Object:
                    var o = new Dictionary<string, object>();
                    foreach (var p in e.EnumerateObject()) o[p.Name] = Muunna(p.Value);
                    return o;
                case JsonValueKind.Array:
                    var l = new List<object>();
                    foreach (var a in e.EnumerateArray()) l.Add(Muunna(a));
                    return l;
                case JsonValueKind.Number: return e.GetDouble();
                case JsonValueKind.String: return e.GetString();
                case JsonValueKind.True: return true;
                case JsonValueKind.False: return false;
                default: return null;
            }
        }

        public static Dictionary<string, object> O(object a) => (Dictionary<string, object>)a;
        public static List<object> L(object a) => (List<object>)a;
        public static Dictionary<string, object> O(Dictionary<string, object> o, string nimi) => (Dictionary<string, object>)o[nimi];
        public static List<object> L(Dictionary<string, object> o, string nimi) => (List<object>)o[nimi];
        public static double D(object a) => a == null ? double.NaN : (double)a;
        public static int I(object a) => (int)(double)a;
        public static string S(Dictionary<string, object> o, string nimi) => o[nimi] as string;

        /// <summary>Kultaisten otoksen ruutuindeksit.</summary>
        public static List<int> Otos
        {
            get
            {
                var l = new List<int>();
                foreach (var a in L(Kultaiset, "otos")) l.Add(I(a));
                return l;
            }
        }

        /* ------------------------------------------------------ tiivisteet */

        /// <summary>FNV-1a 32 taulukon tavuista (little-endian) heksana, kuten tee-kultaiset.mjs.</summary>
        public static string Fnv(Array taulu)
        {
            var koko = Buffer.ByteLength(taulu);
            var tavut = new byte[koko];
            Buffer.BlockCopy(taulu, 0, tavut, 0, koko);
            var h = 0x811c9dc5u;
            unchecked
            {
                foreach (var b in tavut)
                {
                    h ^= b;
                    h *= 0x01000193u;
                }
            }
            return h.ToString("x8", CultureInfo.InvariantCulture);
        }

        /* ------------------------------------------------------ vertailut */

        /// <summary>Liukuluku suhteellisella toleranssilla (oletus 1e-9); NaN = NaN.</summary>
        public static void Lahella(double odotettu, double saatu, string viesti, double suhteellinen = 1e-9)
        {
            if (double.IsNaN(odotettu) && double.IsNaN(saatu)) return;
            if (odotettu == saatu) return;
            var ero = Math.Abs(odotettu - saatu);
            var mittakaava = Math.Max(Math.Abs(odotettu), Math.Abs(saatu));
            if (ero <= suhteellinen * mittakaava || ero <= 1e-300) return;
            throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} (ero {ero:E2}) {viesti}");
        }

        /// <summary>Otoksen arvot tarkalleen (Float32- ja kokonaislukukentät).</summary>
        public static void OtosSama(List<object> odotetut, List<int> kohdat, Func<int, double> saatu, string viesti)
        {
            Oleta.Sama(odotetut.Count, kohdat.Count, viesti + ": otoksen koko");
            var virheita = 0;
            string ensimmainen = null;
            for (var k = 0; k < kohdat.Count; k += 1)
            {
                var o = D(odotetut[k]);
                var s = saatu(kohdat[k]);
                if (o == s || (double.IsNaN(o) && double.IsNaN(s))) continue;
                virheita += 1;
                ensimmainen ??= $"ruutu {kohdat[k]}: odotettu {o:R}, saatu {s:R}";
            }
            if (virheita > 0) throw new Exception($"{viesti}: {virheita}/{kohdat.Count} otosarvoa poikkeaa; ensimmäinen {ensimmainen}");
        }
    }
}
