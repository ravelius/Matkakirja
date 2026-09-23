// Kaupunkilehden osoite natiiville WKWebView-kuorelle (osa C, Pelikoodari 23.9.2026).
//
// Puhdas C# ilman UnityEngineä: LehtiKuori.cs (Unity) rakentaa osoitteen
// tällä, ja ./kaanna.sh testaa sen (Testit/LehtiOsoiteTestit.cs).
// Verkkopuolen vastine: js/lehtikuori.js lehtikuorenKaupunki — sama
// tunnussääntö /^[a-z0-9-]{2,40}$/, jotta natiivi ei koskaan avaa osoitetta,
// jonka verkkopuoli hylkäisi (hylätty tunnus = tyhjä sivu ilman sulje-viestiä).
using System;

namespace Matkakirja.Peli
{
    public static class LehtiOsoite
    {
        /// <summary>Tuotannon lehtikuori (verkkopelin PR #2942).</summary>
        public const string OletusPohja = "https://matkakirja.app/index.html?lehti=";

        public const int TunnusMin = 2;
        public const int TunnusMax = 40;

        /// <summary>
        /// Kaupunkitunnus kelpaa: 2–40 merkkiä a–z, 0–9 tai '-'. Käsin eikä
        /// Regexillä: .NET:n '$' hyväksyisi lopun rivinvaihdon, JS:n ei.
        /// </summary>
        public static bool KelpaaTunnukseksi(string kaupunki)
        {
            if (kaupunki == null || kaupunki.Length < TunnusMin || kaupunki.Length > TunnusMax) return false;
            foreach (var m in kaupunki)
            {
                bool ok = (m >= 'a' && m <= 'z') || (m >= '0' && m <= '9') || m == '-';
                if (!ok) return false;
            }
            return true;
        }

        /// <summary>
        /// Pohja kelpaa: https (tai kehityksessä http://localhost / 127.0.0.1),
        /// isäntä mukana, ja päättyy kyselyparametriin "?lehti=" tai "&amp;lehti=",
        /// jolloin tunnus liitetään suoraan perään.
        /// </summary>
        public static bool KelpaaPohjaksi(string pohja)
        {
            if (string.IsNullOrEmpty(pohja)) return false;
            if (!pohja.EndsWith("?lehti=", StringComparison.Ordinal) &&
                !pohja.EndsWith("&lehti=", StringComparison.Ordinal)) return false;
            if (pohja.IndexOf('#') >= 0) return false;  // fragmentti söisi kyselyn
            // Käsin eikä System.Uri:lla: ./kaanna.sh ei viittaa System.Private.Uri:hin,
            // ja tarkistus on näin täsmälleen sama kaikkialla.
            string loput;
            bool https;
            if (pohja.StartsWith("https://", StringComparison.Ordinal)) { https = true; loput = pohja.Substring(8); }
            else if (pohja.StartsWith("http://", StringComparison.Ordinal)) { https = false; loput = pohja.Substring(7); }
            else return false;
            int loppu = loput.IndexOfAny(new[] { '/', '?' });
            var valtuutus = loppu < 0 ? loput : loput.Substring(0, loppu);
            if (valtuutus.IndexOf('@') >= 0) return false;  // ei käyttäjätietoja isännän edessä
            int kaksoispiste = valtuutus.IndexOf(':');
            var isanta = kaksoispiste < 0 ? valtuutus : valtuutus.Substring(0, kaksoispiste);
            if (isanta.Length == 0) return false;
            if (kaksoispiste >= 0)
            {
                var portti = valtuutus.Substring(kaksoispiste + 1);
                if (portti.Length == 0 || portti.Length > 5) return false;
                foreach (var m in portti) if (m < '0' || m > '9') return false;
            }
            foreach (var m in isanta)
            {
                bool ok = (m >= 'a' && m <= 'z') || (m >= 'A' && m <= 'Z') || (m >= '0' && m <= '9') || m == '-' || m == '.';
                if (!ok) return false;
            }
            if (https) return true;
            return isanta == "localhost" || isanta == "127.0.0.1";
        }

        /// <summary>Rakentaa osoitteen; virheestä palauttaa false ja syyn.</summary>
        public static bool YritaRakentaa(string kaupunki, string pohja, out string osoite, out string virhe)
        {
            osoite = null;
            if (!KelpaaTunnukseksi(kaupunki))
            {
                virhe = "kelvoton kaupunkitunnus: '" + kaupunki + "' (sallittu ^[a-z0-9-]{2,40}$)";
                return false;
            }
            var p = string.IsNullOrEmpty(pohja) ? OletusPohja : pohja;
            if (!KelpaaPohjaksi(p))
            {
                virhe = "kelvoton osoitepohja: '" + p + "' (https, päättyy ?lehti= tai &lehti=)";
                return false;
            }
            // Tunnuksen merkit ovat URL-turvallisia: ei koodausta.
            osoite = p + kaupunki;
            virhe = null;
            return true;
        }

        /// <summary>
        /// Natiivin alkutila lehdelle risuaitaan: osoite#tila=&lt;base64url(UTF-8 JSON)&gt;
        /// (verkkopelin js/lehtikuori.js lehtikuorenTila). Risuaita ei lähde
        /// palvelimelle. Tyhjä JSON → osoite sellaisenaan.
        /// </summary>
        public static string LisaaTila(string osoite, string tilaJson)
        {
            if (string.IsNullOrEmpty(osoite) || string.IsNullOrEmpty(tilaJson)) return osoite;
            var b64 = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(tilaJson))
                .TrimEnd('=').Replace('+', '-').Replace('/', '_');
            int risu = osoite.IndexOf('#');
            return (risu >= 0 ? osoite.Substring(0, risu) : osoite) + "#tila=" + b64;
        }

        /// <summary>
        /// Maalehti kaupunkilehden sijaan (verkkopelin lehtikuorenMaa):
        /// osoite&amp;maa=ISO3[&amp;sivu=aihe]. Kelvoton maa → osoite sellaisenaan,
        /// kelvoton sivu jätetään pois (lehti aukeaa ensimmäiseltä sivulta).
        /// </summary>
        public static string LisaaMaa(string osoite, string iso3, string sivu = null)
        {
            if (string.IsNullOrEmpty(osoite) || iso3 == null || iso3.Length != 3) return osoite;
            foreach (var c in iso3) if (c < 'A' || c > 'Z') return osoite;
            bool sivuKelpaa = !string.IsNullOrEmpty(sivu) && sivu.Length <= 60;
            if (sivuKelpaa) foreach (var c in sivu) if (!((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-')) { sivuKelpaa = false; break; }
            int risu = osoite.IndexOf('#');
            string alku = risu >= 0 ? osoite.Substring(0, risu) : osoite, loppu = risu >= 0 ? osoite.Substring(risu) : "";
            return alku + "&maa=" + iso3 + (sivuKelpaa ? "&sivu=" + sivu : "") + loppu;
        }

        /// <summary>Kuten YritaRakentaa, mutta heittää ArgumentExceptionin.</summary>
        public static string Rakenna(string kaupunki, string pohja = OletusPohja)
        {
            if (!YritaRakentaa(kaupunki, pohja, out var osoite, out var virhe)) throw new ArgumentException(virhe);
            return osoite;
        }
    }
}
