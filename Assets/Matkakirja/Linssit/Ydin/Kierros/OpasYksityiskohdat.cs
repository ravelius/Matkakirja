// OPPAAN YKSITYISKOHTAKUVAT (omistaja 7.10. 10.1x, Päätoimittaja 16.5x, juna 163): kerronnan aikana kuva siitä, mitä 3D-kartan
// yläkulmasta ei erota (esim. "vaalealta kiviviuhkalta" → haussmannilainen julkisivu). Sisältökirjurin paketti
// esittely/<kaupunki>-vN/<kaupunki>-yksityiskohdat.json (polku Pöllön /opas/aineistot "yksityiskohdat_polut"): lista
// {kohde_id, tekstilaji (avaus|teksti|lyhyt), ankkuri, kuvateksti, media_url, paketti_leveys, paketti_korkeus, tekija, lisenssi}.
// Kuva näytetään, kun kertoja sanoo ankkurin: ajoitus sanakohtaisista ajoista (kohdistus), varapolkuna ankkurin osuus tekstistä
// × klipin kesto. Yksi kuva kerrallaan (NayttoS), väli vähintään ValiS; ankkuri, jota ei löydy puhutusta tekstistä, ohitetaan.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasYksityiskohdat
    {
        /// <summary>Kuvan näkymisaika (s) ja seuraavan kuvan aikaisin alku edellisen alusta.</summary>
        public const double NayttoS = 4.0, ValiS = 5.0;
        /// <summary>Kuva ei ala, jos kerrontaa on jäljellä tätä vähemmän (s).</summary>
        public const double LoppuVaraS = 1.5;

        public sealed class Kuva
        {
            public string KohdeId, Tekstilaji, Ankkuri, Kuvateksti, Url, Tekija, Lisenssi;
            public int Leveys, Korkeus;
            /// <summary>Tekoälyllä tehty havainnekuva (Sisältökirjuri v3:sta alkaen "havainnekuva": true; puuttuva = false).</summary>
            public bool Havainnekuva;
        }

        /// <summary>Paketin JSON (lista) kuviksi; puutteelliset (ei kohdetta, ankkuria tai osoitetta) pois.</summary>
        public static List<Kuva> Lue(object json)
        {
            var l = new List<Kuva>();
            if (!(json is IList<object> lista)) return l;
            foreach (var o in lista)
            {
                if (!(o is IDictionary<string, object> d)) continue;
                string S(string a) => d.TryGetValue(a, out var x) ? x as string : null;
                int I(string a) => d.TryGetValue(a, out var x) && x is double v ? (int)v : 0;
                var k = new Kuva { KohdeId = S("kohde_id"), Tekstilaji = S("tekstilaji"), Ankkuri = S("ankkuri"), Kuvateksti = S("kuvateksti"),
                    Url = S("media_url"), Tekija = S("tekija"), Lisenssi = S("lisenssi"), Leveys = I("paketti_leveys"), Korkeus = I("paketti_korkeus"),
                    Havainnekuva = d.TryGetValue("havainnekuva", out var h) && h is bool hb && hb };
                if (string.IsNullOrEmpty(k.KohdeId) || string.IsNullOrWhiteSpace(k.Ankkuri) || string.IsNullOrEmpty(k.Url)) continue;
                l.Add(k);
            }
            return l;
        }

        /// <summary>
        /// Kortin näkyvä teksti: vain kuvateksti (omistaja 7.10. 22.5x: "tekijät eivät saa näkyä näissä kuvissa, ei sovi tyyliin";
        /// tekijä, lisenssi ja havainnekuvan merkintä jäävät dataan, Tekijarivi, ja näytetään muualla).
        /// </summary>
        public static string KortinTeksti(Kuva k) => string.IsNullOrWhiteSpace(k?.Kuvateksti) ? "" : k.Kuvateksti.Trim();

        /// <summary>Kortin alarivi: "Kuva: tekijä, lisenssi"; havainnekuvassa "Havainnekuva" (ja tekijä, jos annettu).</summary>
        public static string Tekijarivi(Kuva k)
        {
            if (k == null) return "";
            string tekija = string.IsNullOrWhiteSpace(k.Tekija) ? "" : k.Tekija.Trim();
            string lisenssi = string.IsNullOrWhiteSpace(k.Lisenssi) ? "" : k.Lisenssi.Trim();
            // Havainnekuva (Sisältökirjuri: kuvateksti päättyy "Havainnekuva.", tekijä Codex): merkintä kerran, ei tekijää.
            if (k.Havainnekuva)
                return (k.Kuvateksti ?? "").IndexOf("havainnekuva", StringComparison.OrdinalIgnoreCase) >= 0
                    ? "Tekoälyllä tuotettu, ei valokuva" : "Havainnekuva · tekoälyllä tuotettu";
            if (tekija.Length == 0) return "";
            return lisenssi.Length > 0 ? $"Kuva: {tekija}, {lisenssi}" : $"Kuva: {tekija}";
        }

        /// <summary>/opas/aineistot "yksityiskohdat_polut" {kaupunki-id: polku median juuresta}; polut, joissa "..", ohitetaan.</summary>
        public static Dictionary<string, string> LuePolut(object json)
        {
            var p = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            if (json is IDictionary<string, object> d && d.TryGetValue("yksityiskohdat_polut", out var v) && v is IDictionary<string, object> vd)
                foreach (var kv in vd)
                    if (kv.Value is string s && !string.IsNullOrWhiteSpace(s) && !s.Contains("..")) p[kv.Key] = s.Trim().TrimStart('/');
            return p;
        }

        /// <summary>
        /// Sanakohtaiset ajat: {"merkit":[…], "alut":[s, …]} (ElevenLabsin alignment: merkki ja sen alku) tai {"sanat":[[merkki, alku], …]}.
        /// Palauttaa (merkki-indeksi tekstissä, alku s) nousevassa järjestyksessä; tyhjä = ei aikoja.
        /// </summary>
        public static List<(int Merkki, double AlkuS)> LueAjat(object json)
        {
            var l = new List<(int, double)>();
            if (!(json is IDictionary<string, object> d)) return l;
            if (d.TryGetValue("sanat", out var s) && s is IList<object> sl)
            {
                foreach (var x in sl)
                    if (x is IList<object> p && p.Count >= 2 && p[0] is double m && p[1] is double a) l.Add(((int)m, a));
            }
            else if (d.TryGetValue("alut", out var al) && al is IList<object> alut)
            {
                for (int i = 0; i < alut.Count; i++) if (alut[i] is double a) l.Add((i, a));
            }
            l.Sort((x, y) => x.Item1.CompareTo(y.Item1));
            return l;
        }

        /// <summary>Ankkurin alkukohta tekstissä (kirjainkoko ja välilyönnit ohittaen); −1, jos ei löydy.</summary>
        public static int Etsi(string teksti, string ankkuri)
        {
            if (string.IsNullOrEmpty(teksti) || string.IsNullOrWhiteSpace(ankkuri)) return -1;
            var (t, ti) = Normaali(teksti);
            var (a, _) = Normaali(ankkuri);
            int i = t.IndexOf(a, StringComparison.Ordinal);
            return i < 0 ? -1 : ti[i];
        }

        /// <summary>Pienet kirjaimet, välimerkit pois, peräkkäiset välit yhdeksi; indeksi alkuperäiseen tekstiin.</summary>
        static (string, List<int>) Normaali(string s)
        {
            var b = new StringBuilder(s.Length); var ix = new List<int>(s.Length);
            bool vali = true;
            for (int i = 0; i < s.Length; i++)
            {
                char c = s[i];
                if (char.IsLetterOrDigit(c)) { b.Append(char.ToLower(c, CultureInfo.InvariantCulture)); ix.Add(i); vali = false; }
                else if (!vali) { b.Append(' '); ix.Add(i); vali = true; }
            }
            return (b.ToString(), ix);
        }

        /// <summary>
        /// Kerronnan kuvat ajoineen: kohteen (tai "avaus") kuvat, joiden ankkuri on puhutussa tekstissä. Aika = ankkurin alun
        /// sanakohtainen alku (viimeisin aika, jonka merkki ≤ ankkurin kohta), muuten osuus tekstistä × kesto. Liian lähekkäiset
        /// (alle ValiS) ja liian myöhäiset (alle LoppuVaraS ennen loppua) jätetään pois.
        /// </summary>
        public static List<(Kuva Kuva, double AikaS)> Ajoita(IEnumerable<Kuva> kuvat, string kohdeId, string teksti, double kestoS,
            IReadOnlyList<(int Merkki, double AlkuS)> ajat = null)
        {
            var l = new List<(Kuva, double)>();
            if (kuvat == null || string.IsNullOrEmpty(kohdeId) || string.IsNullOrEmpty(teksti) || !(kestoS > 0)) return l;
            foreach (var k in kuvat)
            {
                if (!string.Equals(k.KohdeId, kohdeId, StringComparison.OrdinalIgnoreCase)) continue;
                int m = Etsi(teksti, k.Ankkuri);
                if (m < 0) continue;
                double t = double.NaN;
                if (ajat != null && ajat.Count > 0)
                    for (int i = 0; i < ajat.Count && ajat[i].Merkki <= m; i++) t = ajat[i].AlkuS;
                if (double.IsNaN(t)) t = kestoS * m / teksti.Length;
                l.Add((k, t));
            }
            l.Sort((x, y) => x.Item2.CompareTo(y.Item2));
            var tulos = new List<(Kuva, double)>();
            double ed = double.NegativeInfinity;
            foreach (var (k, t) in l)
            {
                if (t > kestoS - LoppuVaraS || t - ed < ValiS) continue;
                tulos.Add((k, t)); ed = t;
            }
            return tulos;
        }
    }
}
