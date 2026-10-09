// VALMIIT LUENNAT (Päätoimittaja 6.10.2026, avainmalli sovittu Natiivisepän kanssa; junaan 147): kappaleen luenta soitetaan
// valmiista tiedostosta, jos se on ämpärissä, muuten palavirtana kuten ennen (Puhe.Syntetisoi). Omistajan PCM-linja: koko
// kappale yhtenä ottona → pcm_44100 → taso → mp3 kerran (esigeneroija, proto-3d/tyokalut/pelikoodari-ajot).
//
// Manifesti (Asetus "osoitteet.luennat-manifesti", oletus ManifestiOletus): {"versio":1,"aanet":{"<ääni>":"<malli>"},
//   "palat":{"<avain>":{"u":"k/<avain>.mp3","s":<kesto s>}}}; u on suhteellinen manifestin kansioon (tai täysi osoite).
// Avain = sha256 hex[:32] UTF-8-merkkijonosta "v1|<malli>|<ääni>|<nopeus F2 Invariant>|<loppuTagi>|<teksti NFC>", jossa
// teksti on Syntetisoi-kutsun kappale (Katkaise(JsTrim):n jälkeen) ja loppuTagi kappaleen perään tuleva tauko ([pause],
// [long-pause] tai tyhjä; tauko on tiedostossa). Malli tulee manifestista äänen mukaan: äänimallin vaihto vaihtaa avaimet.
// Ajautumissuoja: Peli-testit/Kultaiset/valmisluennat-avaimet.json (sama tiedosto esigeneroijassa).
// Puhdas logiikka (ei UnityEnginea): Peli-testit kääntää tämän.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace Matkakirja.Peli
{
    public static class Valmisluennat
    {
        public const string ManifestiOletus = "https://media.matkakirja.app/aanet/luennat/v1/manifest.json";
        public const string AvainVersio = "v1";

        static Dictionary<string, string> palat;     // avain → täysi url
        static Dictionary<string, string> mallit;    // ääni → malli

        /// <summary>Manifesti ladattu (Lue onnistui).</summary>
        public static bool Ladattu => palat != null;
        public static int Maara => palat?.Count ?? 0;

        public static string Avain(string teksti, string malli, string aani, double nopeus, string loppuTagi = null)
        {
            string s = AvainVersio + "|" + (malli ?? "") + "|" + (aani ?? "") + "|"
                + nopeus.ToString("F2", CultureInfo.InvariantCulture) + "|" + (loppuTagi ?? "") + "|"
                + (teksti ?? "").Normalize(NormalizationForm.FormC);
            using var h = SHA256.Create();
            var b = h.ComputeHash(Encoding.UTF8.GetBytes(s));
            var sb = new StringBuilder(32);
            for (int i = 0; i < 16; i++) sb.Append(b[i].ToString("x2"));
            return sb.ToString();
        }

        /// <summary>Jäsentää manifestin; palauttaa palojen määrän (0 = virheellinen tai tyhjä, ei osumia).</summary>
        public static int Lue(string json, string manifestinUrl)
        {
            try
            {
                var o = MiniJson.Objekti(MiniJson.Jasenna(json));
                string juuri = manifestinUrl.Split('?')[0];
                juuri = juuri.Substring(0, juuri.LastIndexOf('/') + 1);
                var uudetMallit = new Dictionary<string, string>();
                foreach (var kv in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "aanet")) ?? new Dictionary<string, object>())
                    if (kv.Value is string m) uudetMallit[kv.Key] = m;
                var uudet = new Dictionary<string, string>();
                foreach (var kv in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "palat")) ?? new Dictionary<string, object>())
                {
                    string u = MiniJson.Teksti(MiniJson.ObjektiTaiNull(kv.Value), "u");
                    if (string.IsNullOrEmpty(u)) continue;
                    uudet[kv.Key] = u.StartsWith("http", StringComparison.Ordinal) ? u : juuri + u;
                }
                palat = uudet;
                mallit = uudetMallit;
                return uudet.Count;
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>Valmiin kappaleen osoite tai null (ei manifestia, ääni ei ole manifestissa, avainta ei ole).</summary>
        public static string Url(string teksti, string aani, double nopeus, string loppuTagi = null)
        {
            if (palat == null || mallit == null || string.IsNullOrEmpty(aani) || !mallit.TryGetValue(aani, out var malli)) return null;
            return palat.TryGetValue(Avain(teksti, malli, aani, nopeus, loppuTagi), out var url) ? url : null;
        }

        /// <summary>
        /// Valmis tiedosto ei latautunut (404 julkaisun aikana, katkos): osoite pois tämän istunnon manifestista, jolloin Url
        /// palauttaa null ja kappale luetaan palavirtana (Puhe.Syntetisoi varareitti, juna 173). Palauttaa poistettujen määrän.
        /// </summary>
        public static int Petti(string url)
        {
            if (palat == null || string.IsNullOrEmpty(url)) return 0;
            int n = 0;
            foreach (var k in new List<string>(palat.Keys)) if (palat[k] == url) { palat.Remove(k); n++; }
            return n;
        }

        /// <summary>Testeille: tyhjennä ladattu manifesti.</summary>
        public static void Nollaa() { palat = null; mallit = null; }
    }
}
