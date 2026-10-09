// KIELITAULU (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys englanniksi; Raamattu KÄÄNNÖKSET: kielikohtaiset paketit,
// ei rivi-i18n:ää). Yksi taulu per kieli: {"kieli": "fi", "tekstit": {"avain": "teksti", …}}; muotoilu {0}, {1} kuten
// string.Format. Haku: pyydetty kieli → suomi (perustaulu) → avain itse (näkyvä merkki puuttuvasta tekstistä, ei tyhjää ruutua).
// Avaimet ryhmittäin: opas.*, linna.*, seikkailu.*, olavinlinna.*, yleinen.*. Puhdas C#: Linssit-testit.
using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Peli;

namespace Matkakirja.Linssit
{
    public sealed class Kielitaulu
    {
        public readonly string Kieli;
        readonly Dictionary<string, string> tekstit;

        Kielitaulu(string kieli, Dictionary<string, string> t) { Kieli = kieli; tekstit = t; }

        public int Maara => tekstit.Count;
        public IEnumerable<string> Avaimet => tekstit.Keys;
        public bool On(string avain) => avain != null && tekstit.ContainsKey(avain);

        /// <summary>{"kieli", "tekstit": {avain: teksti}}; väärä muoto → null.</summary>
        public static Kielitaulu Lue(string json)
        {
            object o;
            try { o = MiniJson.Jasenna(json); } catch (FormatException) { return null; }
            if (!(o is Dictionary<string, object> j) || !(MiniJson.Kentta(j, "tekstit") is Dictionary<string, object> t)) return null;
            var d = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var kv in t) if (kv.Value is string s) d[kv.Key] = s;
            return new Kielitaulu(MiniJson.Teksti(j, "kieli") ?? "", d);
        }

        /// <summary>Teksti avaimelle: tämä taulu → perustaulu (suomi) → avain. Arvot muotoillaan {0}, {1} … (suomen numeromuoto).</summary>
        public string T(string avain, Kielitaulu perus = null, params object[] arvot)
        {
            if (string.IsNullOrEmpty(avain)) return "";
            if (!tekstit.TryGetValue(avain, out var s) && (perus == null || !perus.tekstit.TryGetValue(avain, out s))) s = avain;
            if (arvot == null || arvot.Length == 0) return s;
            try { return string.Format(CultureInfo.GetCultureInfo("fi-FI"), s, arvot); }
            catch (FormatException) { return s; }
        }
    }
}
