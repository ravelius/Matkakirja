// KIELITAULU (Päätoimittaja 9.10.2026, juna 172/173: UI:n käännettävyys englanniksi; Raamattu KÄÄNNÖKSET: kielikohtaiset paketit,
// ei rivi-i18n:ää). Siirtosepän muoto (9.10.): Resources/Tekstit/<alue>.<kieli>.json, litteä {"avain": "teksti"}; avaimet
// <alue>.<ryhmä>.<id> (ui.*, olavinlinna.*), muotoilu {0}, {1} kuten string.Format. Saman kielen alueet yhdistetään yhdeksi
// tauluksi. Haku: pyydetty kieli → suomi (perustaulu) → avain itse (näkyvä merkki puuttuvasta tekstistä). Puhdas C#: Linssit-testit.
using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Peli;

namespace Matkakirja.Linssit
{
    public sealed class Kielitaulu
    {
        readonly Dictionary<string, string> tekstit = new Dictionary<string, string>(StringComparer.Ordinal);

        public int Maara => tekstit.Count;
        public IEnumerable<string> Avaimet => tekstit.Keys;
        public bool On(string avain) => avain != null && tekstit.ContainsKey(avain);

        /// <summary>Litteä {"avain": "teksti"}; väärä muoto → null.</summary>
        public static Kielitaulu Lue(string json)
        {
            var t = new Kielitaulu();
            return t.Lisaa(json) ? t : null;
        }

        /// <summary>Lisää alueen tiedoston tähän tauluun (sama avain: myöhempi voittaa); false, jos muoto on väärä.</summary>
        public bool Lisaa(string json)
        {
            object o;
            try { o = MiniJson.Jasenna(json); } catch (FormatException) { return false; }
            if (!(o is Dictionary<string, object> j)) return false;
            foreach (var kv in j) if (kv.Value is string s) tekstit[kv.Key] = s;
            return true;
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
