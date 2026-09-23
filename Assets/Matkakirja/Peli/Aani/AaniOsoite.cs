// ÄÄNIEN OSOITTEET (B7 §1.9): verkkopelin js/media.js aaniOsoite / aaniUrl / omaAaniPolku /
// peiliAaniPolku / turvanimi ja js/aani-ehdokkaat.js jaaAlku puhtaana C#:na. Kultainen jälki
// Peli-testit/Kultaiset/aanijalki.json (osoitteet, turvanimet, jaaAlku) vartioi identtisyyden.
//
// Natiivissa äänipeili on aina käytössä (webin katkaisija peiliKaytossa('aanet') on selaimen
// kuormasuoja, §2.9). Varareitti ämpärin pettäessä on alkuperäinen osoite (vain ulkoiset äänet),
// ja sen valitsee AaniTila (Puuttuu).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Matkakirja.Peli
{
    /// <summary>Äänivalinnan osat: osoite ilman #-fragmenttia, aloituskohta (s) ja voimakkuuskerroin.</summary>
    public readonly struct AlkuJako
    {
        public readonly string Url;
        public readonly double Alku;
        public readonly double Voima;
        public AlkuJako(string url, double alku, double voima) { Url = url; Alku = alku; Voima = voima; }
    }

    public static class AaniOsoite
    {
        /// <summary>Webin AANI_JUURI (R2-ämpäri).</summary>
        public const string Juuri = "https://media.matkakirja.app/";
        const string AaniAlipolku = "audio/";

        /// <summary>
        /// Webin UUSITUT_AANET (?v=N omille äänitteille). Taulussa on nyt vain puhetta (intro, luennat),
        /// ei musiikkia eikä tehosteita, joten oletus on tyhjä; AaniTaulut voi täyttää sen paketista.
        /// Horation versioidut luennat (VERSIOIDUT_HORATIO_AANET) eivät kuulu B7:ään.
        /// </summary>
        public static readonly Dictionary<string, int> Uusitut = new Dictionary<string, int>();

        static readonly Regex OmaKuvio = new Regex(@"(?:^|/)assets/audio/([^/?#]+)", RegexOptions.CultureInvariant);

        /// <summary>Webin omaAaniPolku: assets/audio/&lt;nimi&gt; → nimi, muuten null.</summary>
        public static string OmaPolku(string polku)
        {
            if (polku == null) return null;
            var m = OmaKuvio.Match(polku);
            return m.Success ? m.Groups[1].Value : null;
        }

        /// <summary>Webin aaniUrl: oma äänite ämpärin audio/-kansioon, muu sellaisenaan.</summary>
        public static string AaniUrl(string polku)
        {
            var nimi = OmaPolku(polku);
            if (nimi == null) return polku;
            return Juuri + AaniAlipolku + nimi + (Uusitut.TryGetValue(nimi, out var v) && v != 0 ? "?v=" + v.ToString(CultureInfo.InvariantCulture) : "");
        }

        /// <summary>Webin aaniOsoite: oma äänite → audio/, Freesound ja archive.org → peilin aanet/, muu sellaisenaan.</summary>
        public static string Url(string url)
        {
            if (string.IsNullOrEmpty(url)) return url;
            if (OmaPolku(url) != null) return AaniUrl(url);
            var polku = PeiliPolku(url);
            return polku != null ? Juuri + polku : url;
        }

        static readonly (Regex Kuvio, string Etuliite)[] Aanimuodot =
        {
            (new Regex(@"^https?://cdn\.freesound\.org/previews/\d+/(\d+)", RegexOptions.CultureInvariant), "freesound"),
            (new Regex(@"^https?://archive\.org/download/([^/]+)/[^/]+$", RegexOptions.CultureInvariant), "aporee"),
        };
        static readonly Regex PaateKuvio = new Regex(@"^[a-z0-9]{2,4}$", RegexOptions.CultureInvariant);

        /// <summary>Webin peiliAaniPolku: peilin polku (aanet/…) tai null, jos osoite ei ole peilattava äänitiedosto.</summary>
        public static string PeiliPolku(string url)
        {
            if (url == null) return null;
            var osoite = url.Split('#')[0].Split('?')[0];
            foreach (var (kuvio, etuliite) in Aanimuodot)
            {
                var m = kuvio.Match(osoite);
                if (!m.Success) continue;
                var tiedosto = osoite.Substring(osoite.LastIndexOf('/') + 1);
                var pate = tiedosto.Substring(tiedosto.LastIndexOf('.') + 1).ToLowerInvariant();
                return "aanet/" + Turvanimi(etuliite + "-" + m.Groups[1].Value, PaateKuvio.IsMatch(pate) ? pate : "mp3");
            }
            return null;
        }

        static readonly Regex Merkit = new Regex(@"[^a-zA-Z0-9._-]+", RegexOptions.CultureInvariant);
        static readonly Regex Reunat = new Regex(@"^-+|-+$", RegexOptions.CultureInvariant);
        static readonly Regex Kirjain = new Regex(@"[a-z]", RegexOptions.CultureInvariant);

        /// <summary>Webin turvanimi: NFD ilman diakriittejä, [^a-zA-Z0-9._-]+ → -, reunat pois, pienaakkoset, 90 merkkiä.</summary>
        public static string Turvanimi(string teksti, string pate)
        {
            var nfd = teksti.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(nfd.Length);
            foreach (var c in nfd) if (c < '̀' || c > 'ͯ') sb.Append(c);
            var puhdas = Reunat.Replace(Merkit.Replace(sb.ToString(), "-"), "");
            puhdas = AsciiPieneksi(puhdas);
            if (puhdas.Length > 90) puhdas = puhdas.Substring(0, 90);
            var nimi = Kirjain.IsMatch(puhdas) ? puhdas : "kuva-" + Tiiviste(teksti);
            return string.IsNullOrEmpty(pate) ? nimi : nimi + "." + pate;
        }

        // Seulan jälkeen jäljellä on vain ASCII, joten JS toLowerCase = ASCII-pienennys.
        static string AsciiPieneksi(string s)
        {
            var t = s.ToCharArray();
            for (int i = 0; i < t.Length; i++) if (t[i] >= 'A' && t[i] <= 'Z') t[i] = (char)(t[i] + 32);
            return new string(t);
        }

        /// <summary>FNV-1a 32 bittiä UTF-16-yksiköistä, base36 (webin tiiviste).</summary>
        static string Tiiviste(string teksti)
        {
            uint luku = 0x811c9dc5;
            unchecked { foreach (var c in teksti) { luku ^= c; luku *= 0x01000193; } }
            if (luku == 0) return "0";
            const string numerot = "0123456789abcdefghijklmnopqrstuvwxyz";
            var sb = new StringBuilder();
            while (luku > 0) { sb.Insert(0, numerot[(int)(luku % 36)]); luku /= 36; }
            return sb.ToString();
        }

        /// <summary>
        /// Webin jaaAlku: 'osoite#alku=S&amp;voima=K' → (osoite, max(0, Number(S) || 0), max(0,1, Number(K) || 1)).
        /// Ilman #-merkkiä osoite palautuu sellaisenaan (null → null).
        /// </summary>
        public static AlkuJako JaaAlku(string arvo)
        {
            var teksti = arvo ?? "";
            int risu = teksti.IndexOf('#');
            if (risu < 0) return new AlkuJako(arvo, 0, 1);
            var url = teksti.Substring(0, risu);
            var osat = new Dictionary<string, string>();
            foreach (var pari in teksti.Substring(risu + 1).Split('&'))
            {
                var p = pari.Split('=');
                if (p.Length == 2) osat[p[0]] = p[1];
            }
            double alku = osat.TryGetValue("alku", out var a) ? JsTaiNolla(JsLuku(a)) : 0;
            double voima = osat.TryGetValue("voima", out var v) ? JsTaiNolla(JsLuku(v)) : 0;
            return new AlkuJako(url, Math.Max(0, alku), Math.Max(0.1, voima == 0 ? 1 : voima));
        }

        /// <summary>JS `x || 0` luvulle: NaN ja 0 → 0.</summary>
        static double JsTaiNolla(double x) => double.IsNaN(x) ? 0 : x;

        /// <summary>JS Number(merkkijono): tyhjä = 0, 0x/0o/0b, Infinity, desimaali; muu NaN.</summary>
        public static double JsLuku(string s)
        {
            var t = (s ?? "").Trim();
            if (t.Length == 0) return 0;
            if (t.Length > 2 && t[0] == '0' && "xXoObB".IndexOf(t[1]) >= 0)
            {
                int kanta = t[1] == 'x' || t[1] == 'X' ? 16 : t[1] == 'o' || t[1] == 'O' ? 8 : 2;
                double arvo = 0;
                foreach (var c0 in t.Substring(2))
                {
                    char c = char.ToLowerInvariant(c0);
                    int d = c >= '0' && c <= '9' ? c - '0' : c >= 'a' && c <= 'z' ? c - 'a' + 10 : 99;
                    if (d >= kanta) return double.NaN;
                    arvo = arvo * kanta + d;
                }
                return arvo;
            }
            int i = 0;
            if (t[0] == '+' || t[0] == '-') i++;
            if (t.Substring(i) == "Infinity") return t[0] == '-' ? double.NegativeInfinity : double.PositiveInfinity;
            int numeroita = 0;
            while (i < t.Length && t[i] >= '0' && t[i] <= '9') { i++; numeroita++; }
            if (i < t.Length && t[i] == '.') { i++; while (i < t.Length && t[i] >= '0' && t[i] <= '9') { i++; numeroita++; } }
            if (numeroita == 0) return double.NaN;
            if (i < t.Length && (t[i] == 'e' || t[i] == 'E'))
            {
                i++;
                if (i < t.Length && (t[i] == '+' || t[i] == '-')) i++;
                int e = i;
                while (i < t.Length && t[i] >= '0' && t[i] <= '9') i++;
                if (i == e) return double.NaN;
            }
            if (i != t.Length) return double.NaN;
            return double.Parse(t, NumberStyles.Float, CultureInfo.InvariantCulture);
        }
    }
}
