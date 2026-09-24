// LINSSI MUISTAA TILANSA (web js/linssit/ihmisen-matka-muisti.js; Raamattu "IHMISEN MATKA:
// YKSI PALKKI, EI KARUSELLIA, KAIKKIIN NOSTOIHIN KUVA, LINSSI MUISTAA PAIKKANSA").
//
// Muistetaan esityksen vaihe (kesken oleva jakso ja siitä kulunut aika, tai tutkimusvaihe),
// pidon pohja (kuinka pitkälle vanat on jo piirretty), kameran paikka, avoin kortti ja
// valittu virta. Laitteen katselutila, ei pelin tapahtuma: Unityssä PlayerPrefs samalla
// avaimella kuin webin localStorage (matkakirja-linssimuisti-<tunnus>).
//
// Kelvollinen on puhdas: vanha tai rikkinäinen muisti ohitetaan, ja linssi alkaa alusta.
// Ero webiin: kameran korkeus on metreinä (natiivin Nakyma), ei globe.gl:n säteinä, joten
// kenttä on "korkeus" eikä "altitude".
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>Laitteen avain–arvo-varasto (Unityssä PlayerPrefs, testeissä sanakirja).</summary>
    public interface ILinssiVarasto
    {
        string Lue(string avain);
        void Kirjoita(string avain, string arvo);
        void Poista(string avain);
    }

    public sealed class LinssiMuistiTila
    {
        /// <summary>"esitys" tai "tutkimus".</summary>
        public string Vaihe;
        public string Jakso;
        public double Kulunut;
        public double? PitoMin;
        /// <summary>Kameran paikka (lat, lon, korkeus metreinä) tai null.</summary>
        public Nakyma? Kamera;
        public string Kortti;
        public string Virta;
        /// <summary>Tallennushetki (ms Unix-ajasta).</summary>
        public double Aika;
    }

    public static class LinssiMuisti
    {
        public const string Etuliite = "matkakirja-linssimuisti-";
        public const int Versio = 1;
        /// <summary>Vanhin muisti, joka vielä jatketaan (30 vrk, web MUISTIN_IKA_MAX_MS).</summary>
        public const double IkaMaxMs = 30.0 * 24 * 60 * 60 * 1000;

        public static string Avain(string tunnus) => Etuliite + tunnus;

        public static double NytMs => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        /// <summary>
        /// Tarkistaa ja siistii muistin (web kelvollinenMuisti). Tuntematon jakso, nosto tai virta
        /// pudotetaan; kesken jäänyt esitys ilman tunnettua jaksoa ei ole jatkettavissa.
        /// </summary>
        public static LinssiMuistiTila Kelvollinen(Dictionary<string, object> m, ICollection<string> jaksot = null,
            ICollection<string> nostot = null, ICollection<string> virrat = null, double? nyt = null)
        {
            if (m == null) return null;
            if (!(MiniJson.Luku(m, "versio") is double v) || v != Versio) return null;
            double tama = nyt ?? NytMs;
            if (!(MiniJson.Luku(m, "aika") is double aika) || !double.IsFinite(aika)) return null;
            if (tama - aika > IkaMaxMs || aika > tama + 60000) return null;
            var vaihe = MiniJson.Teksti(m, "vaihe");
            if (vaihe != "esitys" && vaihe != "tutkimus") return null;
            var jakso = MiniJson.Teksti(m, "jakso");
            if (jakso != null && jaksot != null && !jaksot.Contains(jakso)) jakso = null;
            if (vaihe == "esitys" && jakso == null) return null;
            Nakyma? kamera = null;
            if (MiniJson.Kentta(m, "kamera") is Dictionary<string, object> k
                && MiniJson.Luku(k, "lat") is double lat && double.IsFinite(lat)
                && MiniJson.Luku(k, "lng") is double lng && double.IsFinite(lng)
                && MiniJson.Luku(k, "korkeus") is double korkeus && korkeus > 0)
                kamera = new Nakyma(lat, lng, korkeus);
            var kortti = MiniJson.Teksti(m, "kortti");
            if (kortti != null && nostot != null && !nostot.Contains(kortti)) kortti = null;
            var virta = MiniJson.Teksti(m, "virta");
            if (virta != null && virrat != null && !virrat.Contains(virta)) virta = null;
            double kulunut = MiniJson.Luku(m, "kulunut") is double ku && double.IsFinite(ku) ? Math.Max(0, ku) : 0;
            double? pitoMin = MiniJson.Luku(m, "pitoMin") is double p && double.IsFinite(p) && p >= 0 ? p : (double?)null;
            return new LinssiMuistiTila
            {
                Vaihe = vaihe, Jakso = jakso, Kulunut = kulunut, PitoMin = pitoMin,
                Kamera = kamera, Kortti = kortti, Virta = virta, Aika = aika,
            };
        }

        /// <summary>Muisti JSONiksi (versio ja aika mukaan kuten web tallennaMuisti).</summary>
        public static string Json(LinssiMuistiTila t, double? nyt = null)
        {
            var s = new StringBuilder("{");
            void Kentta(string nimi, string arvo) { if (s.Length > 1) s.Append(','); s.Append('"').Append(nimi).Append("\":").Append(arvo); }
            Kentta("versio", Versio.ToString(CultureInfo.InvariantCulture));
            Kentta("aika", Luku(nyt ?? NytMs));
            Kentta("vaihe", Teksti(t.Vaihe));
            Kentta("jakso", Teksti(t.Jakso));
            Kentta("kulunut", Luku(t.Kulunut));
            Kentta("pitoMin", t.PitoMin is double p && double.IsFinite(p) ? Luku(p) : "null");
            Kentta("kamera", t.Kamera is Nakyma k
                ? $"{{\"lat\":{Luku(k.Lat)},\"lng\":{Luku(k.Lon)},\"korkeus\":{Luku(k.Korkeus)}}}"
                : "null");
            Kentta("kortti", Teksti(t.Kortti));
            Kentta("virta", Teksti(t.Virta));
            return s.Append('}').ToString();
        }

        static string Luku(double v) => double.IsFinite(v) ? v.ToString("R", CultureInfo.InvariantCulture) : "null";

        static string Teksti(string s)
        {
            if (s == null) return "null";
            var b = new StringBuilder("\"");
            foreach (char c in s)
            {
                if (c == '"' || c == '\\') b.Append('\\').Append(c);
                else if (c < 0x20) b.Append("\\u").Append(((int)c).ToString("x4"));
                else b.Append(c);
            }
            return b.Append('"').ToString();
        }

        /// <summary>Lukee ja tarkistaa muistin; null, jos sitä ei ole tai se ei kelpaa.</summary>
        public static LinssiMuistiTila Lue(ILinssiVarasto varasto, string tunnus, ICollection<string> jaksot = null,
            ICollection<string> nostot = null, ICollection<string> virrat = null, double? nyt = null)
        {
            if (varasto == null || tunnus == null) return null;
            try
            {
                var raaka = varasto.Lue(Avain(tunnus));
                if (string.IsNullOrEmpty(raaka)) return null;
                return Kelvollinen(MiniJson.Jasenna(raaka) as Dictionary<string, object>, jaksot, nostot, virrat, nyt);
            }
            catch (Exception) { return null; }
        }

        public static bool Tallenna(ILinssiVarasto varasto, string tunnus, LinssiMuistiTila tila, double? nyt = null)
        {
            if (varasto == null || tunnus == null || tila == null) return false;
            try { varasto.Kirjoita(Avain(tunnus), Json(tila, nyt)); return true; }
            catch (Exception) { return false; }
        }

        /// <summary>"Aloita alusta" (web tyhjennaMuisti).</summary>
        public static bool Tyhjenna(ILinssiVarasto varasto, string tunnus)
        {
            if (varasto == null || tunnus == null) return false;
            try { varasto.Poista(Avain(tunnus)); return true; }
            catch (Exception) { return false; }
        }
    }
}
