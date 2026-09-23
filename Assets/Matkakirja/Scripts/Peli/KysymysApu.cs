// Kysymysnäkymän data ja sen rakentaminen pelin tilasta (Pelikoodari, erä 4).
// Ei UnityEngineä: käännetään myös Peli-testeissä (kaanna.sh). Rajapinta
// IKysymysNakyma on NakymaSopimukset.cs:ssä; näkymät (UGUI-vara
// KysymysDialogi, Natiivi-UI:n UI Toolkit) saavat vain KysymysNaytto-olion.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>Kysymyksen muoto näkymälle (Peli.KysymysMuoto ilman pelilogiikan riippuvuutta).</summary>
    public enum KysymysLaji { Visa, Vaite, Kuva, Lippu, Tapahtuma, Pulma }

    /// <summary>
    /// Avoimen kysymyksen näytettävä tila. Ohjain rakentaa tämän uudelleen jokaisen
    /// teon jälkeen ja kutsuu Nayta uudestaan (sama olio ei muutu näkymän alla).
    /// </summary>
    public sealed class KysymysNaytto
    {
        public KysymysLaji Laji;
        /// <summary>Esim. "Pariisi · aarrekysymys", "Kohtaaminen", "Kaupungin tutkiminen".</summary>
        public string Otsikko;
        /// <summary>Kysyjä ja tilanne kursiivilla, esim. "kahvilan tarjoilija kysyy".</summary>
        public string Kehys;
        public string Kysymys;
        /// <summary>Väittämän paikka (Vaite), muuten null.</summary>
        public string Paikka;
        /// <summary>Kuvan tai lipun osoite (Kuva, Lippu), muuten null. https-osoite.</summary>
        public string KuvaUrl;
        /// <summary>Kuvan lähde/attribuutio pienellä, tai null.</summary>
        public string KuvaLahde;
        public List<string> Vaihtoehdot = new List<string>();
        /// <summary>50:50:n piilottamat vaihtoehdot (indeksit Vaihtoehdot-listaan).</summary>
        public List<int> Piilotetut = new List<int>();

        /// <summary>Ostettu vihje, tai null.</summary>
        public string Vihje;
        /// <summary>Vihjenappi näkyvissä (vihje olemassa, ei ostettu, ei vastattu).</summary>
        public bool VihjeTarjolla;
        public int VihjeHinta;
        /// <summary>50:50-nappi näkyvissä (neljä vaihtoehtoa, ei käytetty, ei vastattu).</summary>
        public bool PuolitusTarjolla;
        public int PuolitusHinta;
        /// <summary>Pelaajan raha (napit harmaana, jos ei riitä; ohjain kertoo virheen Viestinä).</summary>
        public int Raha;
        public string Valuutta = "£";
        /// <summary>Aikaraja sekunteina tai null (ei aikarajaa, esim. pulma). Jäljellä tulee PaivitaAika-kutsuilla.</summary>
        public int? Sekunnit;

        // --- tulos (Vastattu = true) ---
        public bool Vastattu;
        /// <summary>Valittu indeksi; -1 = aika loppui.</summary>
        public int Valittu = -1;
        public int Oikea;
        public bool Oikein;
        public bool AikaLoppui;
        public string Fakta;
        public List<string> Lahteet = new List<string>();
        /// <summary>Löytö tai palkkio yhdellä rivillä ("Löysit: Kätketty matka-arkku, 640 £"), tai null.</summary>
        public string Loyto;
        /// <summary>Jatka-napin teksti tuloksen jälkeen.</summary>
        public string JatkaTeksti = "Jatka matkaa";

        /// <summary>Hetkellinen ilmoitus (esim. "Rahat eivät riitä"), tai null.</summary>
        public string Viesti;
    }

    /// <summary>Kysymysnäkymän takaisinkutsut (ohjain kutsuu pelilogiikkaa).</summary>
    public sealed class KysymysToiminnot
    {
        public Action<int> Vastaa;
        public Action Vihje;
        public Action Puolita;
        /// <summary>Tuloksen jälkeen: sulkee kysymyksen.</summary>
        public Action Jatka;
    }

    /// <summary>AvoinKysymys → KysymysNaytto (PeliOhjain kutsuu jokaisen teon jälkeen).</summary>
    public static class KysymysApu
    {
        /// <summary>Commons-tiedoston osoite halutulla leveydellä (web commonsUrl; PNG-pienennös myös SVG:stä).</summary>
        public static string CommonsUrl(string tiedosto, int leveys) =>
            "https://commons.wikimedia.org/wiki/Special:FilePath/" + Koodaa(tiedosto) + "?width=" + leveys;

        /// <summary>Web encodeURIComponent (UTF-8, varatut merkit A–Z a–z 0–9 - _ . ! ~ * ' ( )).</summary>
        public static string Koodaa(string s)
        {
            var sb = new System.Text.StringBuilder();
            foreach (var b in System.Text.Encoding.UTF8.GetBytes(s))
            {
                char c = (char)b;
                if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || "-_.!~*'()".IndexOf(c) >= 0) sb.Append(c);
                else sb.Append('%').Append(b.ToString("X2"));
            }
            return sb.ToString();
        }

        public static KysymysLaji Laji(KysymysMuoto m) => (KysymysLaji)(int)m;

        /// <summary>Web TOKEN_TYPES[type].name (yleisnimet; maakohtaiset paikallisaarteet myöhemmin).</summary>
        public static string LaatanNimi(string tyyppi)
        {
            switch (tyyppi)
            {
                case Laattatyypit.Paaaarre: return "Unohdettu aarre";
                case Laattatyypit.MannerAarre: return "Mantereen aarre";
                case Laattatyypit.IsoAarre: return "Kätketty matka-arkku";
                case Laattatyypit.PieniAarre: return "Kourallinen hopeakolikoita";
                case Laattatyypit.Ryostaja: return "Ryöstäjä";
                default: return null;
            }
        }

        /// <summary>Laatan kääntö yhdellä rivillä; null, jos laattaa ei käännetty.</summary>
        public static string LoytoTeksti(Loyto l, string valuutta = "£")
        {
            if (l == null) return null;
            if (l.Pollo) return "Laatan alta lehahti pöllö!";
            if (l.Kaksintaistelu) return "Laatan alla odotti ryöstäjä!";
            var nimi = LaatanNimi(l.Tyyppi);
            if (nimi == null) return "Laatta oli tyhjä.";
            var osat = new List<string> { "Löysit: " + nimi };
            if (l.RahaLisays != 0) osat.Add($"+{l.RahaLisays} {valuutta}");
            if (l.TahtiLisays != 0) osat.Add("+" + l.TahtiLisays + " ◈");
            return string.Join(" · ", osat);
        }

        static string Iso(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        /// <summary>
        /// Rakentaa näytettävän tilan. loyto = tämän kysymyksen aikana käännetty
        /// laatta (Matka.Loysi) tai null; lisat = muut palkkiorivit (Kysely.Tapahtui);
        /// viesti = epäonnistuneen teon virhe.
        /// </summary>
        public static KysymysNaytto Nakyma(Kysely kysely, AvoinKysymys q, Loyto loyto = null,
            IEnumerable<string> lisat = null, string viesti = null)
        {
            var m = kysely.Matka;
            var p = m.Tila.Pelaaja;
            string kaupunki = q.Kaupunki != null && m.Verkko.Kaupungit.TryGetValue(q.Kaupunki, out var k) ? k.Nimi : q.Kaupunki;
            string laji = q.Laji == KysymysMuoto.Pulma ? "pulma"
                : q.Kaari ? "kohtaaminen"
                : q.Tutkimus ? "kaupungin tutkiminen"
                : q.Vaikea ? "vaikea aarrekysymys"
                : "aarrekysymys";
            bool vastattu = q.Valittu.HasValue;
            var d = new KysymysNaytto
            {
                Laji = Laji(q.Laji),
                Otsikko = string.IsNullOrEmpty(kaupunki) ? Iso(laji) : kaupunki + " · " + laji,
                Kehys = Iso(q.Kehys),
                Kysymys = q.Kysymys,
                Paikka = q.Laji == KysymysMuoto.Vaite ? q.Paikka : null,
                Vaihtoehdot = new List<string>(q.Vaihtoehdot),
                Piilotetut = new List<int>(q.Piilotetut),
                Vihje = q.VihjeNaytetty ? q.Vihje : null,
                VihjeTarjolla = !vastattu && !q.VihjeNaytetty && !string.IsNullOrEmpty(q.Vihje),
                VihjeHinta = KysymysVakiot.VihjeHinta,
                PuolitusTarjolla = !vastattu && q.Piilotetut.Count == 0 && q.Vaihtoehdot.Count >= 4,
                PuolitusHinta = KysymysVakiot.PuolitusHinta,
                Raha = p.Raha,
                Sekunnit = q.Sekunnit.HasValue ? KysymysVakiot.Sekunnit : (int?)null,
                Vastattu = vastattu,
                Valittu = q.Valittu ?? -1,
                Oikea = q.Oikea,
                Oikein = q.OikeinVastattu == true,
                AikaLoppui = q.AikaLoppui,
                Viesti = viesti,
            };
            if (q.Laji == KysymysMuoto.Kuva && !string.IsNullOrEmpty(q.KuvaTiedosto))
                d.KuvaUrl = q.KuvaTiedosto.StartsWith("http", StringComparison.Ordinal) ? q.KuvaTiedosto : CommonsUrl(q.KuvaTiedosto, 640);
            else if (q.Laji == KysymysMuoto.Lippu && !string.IsNullOrEmpty(q.LippuTiedosto))
                d.KuvaUrl = CommonsUrl(q.LippuTiedosto, 320);
            if (d.KuvaUrl != null) d.KuvaLahde = "Wikimedia Commons";

            if (vastattu)
            {
                d.Fakta = q.Fakta;
                d.Lahteet = new List<string>(q.Lahteet ?? new List<string>());
                var rivit = new List<string>();
                var lt = LoytoTeksti(loyto);
                if (lt != null) rivit.Add(lt);
                if (lisat != null) rivit.AddRange(lisat.Where(s => !string.IsNullOrEmpty(s)));
                if (q.AarreLukittui == true) rivit.Add("Kätkö sulkeutui — tämän kaupungin aarre on menetetty.");
                d.Loyto = rivit.Count > 0 ? string.Join("\n", rivit) : null;
                d.JatkaTeksti = loyto != null && loyto.Kaksintaistelu ? "Kohtaa ryöstäjä" : "Jatka matkaa";
            }
            return d;
        }
        static string J(string s)
        {
            if (s == null) return "null";
            var sb = new System.Text.StringBuilder("\"");
            foreach (var c in s)
            {
                if (c == '"' || c == '\\') sb.Append('\\').Append(c);
                else if (c < ' ') sb.Append("\\u").Append(((int)c).ToString("x4"));
                else sb.Append(c);
            }
            return sb.Append('"').ToString();
        }

        /// <summary>Näkymätila JSONina testikomentojen tilaraporttiin (peli-tila.json); null → "null".</summary>
        public static string Json(KysymysNaytto d, float jaljella)
        {
            if (d == null) return "null";
            string I(int x) => x.ToString(System.Globalization.CultureInfo.InvariantCulture);
            string B(bool b) => b ? "true" : "false";
            return "{\"laji\":" + J(d.Laji.ToString()) + ",\"otsikko\":" + J(d.Otsikko) + ",\"kysymys\":" + J(d.Kysymys)
                + ",\"vaihtoehdot\":[" + string.Join(",", d.Vaihtoehdot.Select(J)) + "]"
                + ",\"piilotetut\":[" + string.Join(",", d.Piilotetut.Select(I)) + "]"
                + ",\"kuva\":" + J(d.KuvaUrl) + ",\"vihje\":" + J(d.Vihje)
                + ",\"vihjeTarjolla\":" + B(d.VihjeTarjolla) + ",\"puolitusTarjolla\":" + B(d.PuolitusTarjolla)
                + ",\"sekunnit\":" + (d.Sekunnit.HasValue ? I(d.Sekunnit.Value) : "null")
                + ",\"jaljella\":" + I((int)Math.Ceiling(Math.Max(0, jaljella)))
                + ",\"vastattu\":" + B(d.Vastattu) + ",\"valittu\":" + I(d.Valittu) + ",\"oikea\":" + (d.Vastattu ? I(d.Oikea) : "null")
                + ",\"oikein\":" + B(d.Oikein) + ",\"aikaLoppui\":" + B(d.AikaLoppui)
                + ",\"loyto\":" + J(d.Loyto) + ",\"viesti\":" + J(d.Viesti) + "}";
        }
    }
}
