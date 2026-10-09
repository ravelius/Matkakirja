// HISTORIAMOOTTORI V6: AUTOMAATTINEN TALLENNUS (Siirtoseppä 7.10.2026; pelattavuusmalli-olavinlinna.md kohta 4.3). Tallennus
// tapahtumista (portaalin ylitys, arvoitusvaihe, avainesine, löytö, paluu tyrmästä), ei ajastettuna. Sisältö: tarkistuspiste (Unity-
// koordinaatit) ja sen osa, kädessä ja laukussa olevat, avatut ovet, arvoitusvaiheet, vihjetasot, kiinnijäämiset huoneittain, kulunut
// aika ja datan versio. Lukija sietää tuntemattomat ja puuttuvat kentät (tuntematon tunniste ohitetaan sovittimessa).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class SeikkailuTallennus
    {
        public const int Versio = 1;
        public string Rakennus = "olavinlinna", DataVersio, TarkistusOsa, Kadessa;
        public double X, Y, Z, KulunutS;
        public bool OnTarkistus;
        public List<string> Laukku = new List<string>(), AvatutOvet = new List<string>();
        public Dictionary<string, int> Arvoitus = new Dictionary<string, int>(StringComparer.Ordinal);
        public Dictionary<string, int> Vihjetasot = new Dictionary<string, int>(StringComparer.Ordinal);
        public Dictionary<string, int> Kiinnijaamiset = new Dictionary<string, int>(StringComparer.Ordinal);

        public string Kirjoita()
        {
            var b = new StringBuilder("{");
            b.Append("\"versio\": ").Append(Versio);
            Kentta(b, "rakennus", Rakennus); Kentta(b, "data_versio", DataVersio);
            if (OnTarkistus) { b.Append(", \"tarkistus\": [").Append(L(X)).Append(", ").Append(L(Y)).Append(", ").Append(L(Z)).Append(']'); Kentta(b, "tarkistus_osa", TarkistusOsa); }
            Kentta(b, "kadessa", Kadessa);
            Lista(b, "laukku", Laukku); Lista(b, "avatut_ovet", AvatutOvet);
            Sanakirja(b, "arvoitus", Arvoitus); Sanakirja(b, "vihjetasot", Vihjetasot); Sanakirja(b, "kiinnijaamiset", Kiinnijaamiset);
            b.Append(", \"kulunut_s\": ").Append(L(KulunutS)).Append('}');
            return b.ToString();
        }

        public static SeikkailuTallennus Lue(string json)
        {
            object j; try { j = MiniJson.Jasenna(json ?? ""); } catch (Exception) { return null; }
            var o = MiniJson.ObjektiTaiNull(j); if (o == null) return null;
            var t = new SeikkailuTallennus
            {
                Rakennus = MiniJson.Teksti(o, "rakennus") ?? "olavinlinna", DataVersio = MiniJson.Teksti(o, "data_versio"),
                TarkistusOsa = MiniJson.Teksti(o, "tarkistus_osa"), Kadessa = MiniJson.Teksti(o, "kadessa"), KulunutS = MiniJson.Luku(o, "kulunut_s") ?? 0,
            };
            var tp = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "tarkistus"));
            if (tp.Count == 3 && tp[0] is double x && tp[1] is double y && tp[2] is double z) { t.X = x; t.Y = y; t.Z = z; t.OnTarkistus = true; }
            foreach (var s in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "laukku"))) if (s is string ls) t.Laukku.Add(ls);
            foreach (var s in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "avatut_ovet"))) if (s is string os) t.AvatutOvet.Add(os);
            LueSanakirja(o, "arvoitus", t.Arvoitus); LueSanakirja(o, "vihjetasot", t.Vihjetasot); LueSanakirja(o, "kiinnijaamiset", t.Kiinnijaamiset);
            return t;
        }

        static void LueSanakirja(Dictionary<string, object> o, string nimi, Dictionary<string, int> ulos)
        {
            foreach (var kv in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, nimi)) ?? new Dictionary<string, object>()) if (kv.Value is double d) ulos[kv.Key] = (int)d;
        }

        static string L(double d) => d.ToString("0.###", CultureInfo.InvariantCulture);
        static void Merkkijono(StringBuilder b, string s)
        {
            b.Append('"');
            foreach (char c in s) { if (c == '"' || c == '\\') b.Append('\\').Append(c); else if (c < 0x20) b.Append("\\u").Append(((int)c).ToString("x4")); else b.Append(c); }   // kieli: ei (tekninen)
            b.Append('"');
        }
        static void Kentta(StringBuilder b, string nimi, string arvo) { if (arvo == null) return; b.Append(", \"").Append(nimi).Append("\": "); Merkkijono(b, arvo); }
        static void Lista(StringBuilder b, string nimi, List<string> l)
        {
            b.Append(", \"").Append(nimi).Append("\": [");
            for (int i = 0; i < l.Count; i++) { if (i > 0) b.Append(", "); Merkkijono(b, l[i]); }
            b.Append(']');
        }
        static void Sanakirja(StringBuilder b, string nimi, Dictionary<string, int> d)
        {
            b.Append(", \"").Append(nimi).Append("\": {"); bool eka = true;
            foreach (var kv in d) { if (!eka) b.Append(", "); eka = false; Merkkijono(b, kv.Key); b.Append(": ").Append(kv.Value.ToString(CultureInfo.InvariantCulture)); }   // ei kulttuurin miinusta (fi: −30 rikkoi JSONin)
            b.Append('}');
        }
    }
}
