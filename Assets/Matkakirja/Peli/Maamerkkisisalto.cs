// MAAMERKIT SISÄLTÖPAKETISTA (Fable 24.9.2026; Raamattu LENNON KARTTA JA MAAMERKIT, omistajan kortti klo 13.4x):
// jokaisen kaupungin 3D-maamerkki tulee paketin kokoelmasta "maamerkit" (skeema 1.33, Siirtoseppä), jolloin
// monistus kaupunkeihin on pelkkää sisältötyötä (tools/vienti/maamerkit.json + GLB ämpärin maamerkit/-kansiossa).
// Pilotti (Lontoo, Ateena) pysyy sovelluksen FBX:nä ja Kartta/Maamerkit.cs:n Oletustaulukossa, kunnes omistaja on
// kokeillut sen; paketin rivi korvaa saman kaupungin oletuksen vasta, kun sen malli on ladattu (MaamerkitPaketista).
//
// Alkio (päätasolla, ei raakaa dataa):
//   { id, kaupunki, lat, lon, maanKorkeus (m, EGM2008 kuten kaupungit.korkeus), suunta (° pohjoisesta myötäpäivään),
//     mallinKorkeus (m, jalasta huippuun), malli: { url (https), sha256, tavuja }, lisenssi, tekija, lahde }
// Mallin kehys: glTF +Y ylös, −Z pohjoinen, origo jalassa maan tasossa (natiivissa +Z pohjoinen, +X itä; GlbLukija).
// Vienti ei vie riviä ilman mallia; lukija hylkää silti puutteellisen rivin (syy listaan), eikä kaadu.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Matkakirja.Peli
{
    public sealed class Maamerkkirivi
    {
        public string Id, Kaupunki;
        public double Lat, Lon, MaanKorkeus;
        public float Suunta, MallinKorkeus;
        public string MalliUrl, MalliSha256;
        public long MalliTavuja;
        public string Lisenssi, Tekija, Lahde;
    }

    public static class Maamerkkisisalto
    {
        /// <summary>Kokoelman nimi paketissa (kokoelmat/maamerkit.json).</summary>
        public const string Kokoelma = "maamerkit";

        /// <summary>Hyväksytyt lisenssit (CLAUDE.md: kuvat ja media vain PD/CC). Oma työ on CC0-1.0.</summary>
        static readonly string[] Lisenssit = { "CC0-1.0", "PD", "CC-BY-4.0", "CC-BY-SA-4.0" };

        /// <summary>
        /// Lukee kokoelman rivit paketin järjestyksessä. Puutteellinen rivi ohitetaan ja syy lisätään
        /// <paramref name="hylatyt"/>-listaan ("id: syy"). Sama kaupunki kahdesti: ensimmäinen voittaa.
        /// </summary>
        public static List<Maamerkkirivi> Lue(string json, List<string> hylatyt = null)
        {
            var rivit = new List<Maamerkkirivi>();
            if (string.IsNullOrEmpty(json)) return rivit;
            var kaupungit = new HashSet<string>();
            foreach (var a in MiniJson.Alkiot(json))
            {
                var r = LueRivi(a, out var syy);
                if (r != null && !kaupungit.Add(r.Kaupunki)) { syy = "kaupunki kahdesti: " + r.Kaupunki; r = null; }
                if (r == null) { hylatyt?.Add((MiniJson.Teksti(a, "id") ?? "?") + ": " + syy); continue; }
                rivit.Add(r);
            }
            return rivit;
        }

        static Maamerkkirivi LueRivi(Dictionary<string, object> a, out string syy)
        {
            syy = null;
            var malli = MiniJson.ObjektiTaiNull(MiniJson.Kentta(a, "malli"));
            var r = new Maamerkkirivi
            {
                Id = MiniJson.Teksti(a, "id"),
                Kaupunki = MiniJson.Teksti(a, "kaupunki"),
                Lat = MiniJson.Luku(a, "lat") ?? double.NaN,
                Lon = MiniJson.Luku(a, "lon") ?? double.NaN,
                MaanKorkeus = MiniJson.Luku(a, "maanKorkeus") ?? 0,
                Suunta = (float)(MiniJson.Luku(a, "suunta") ?? 0),
                MallinKorkeus = (float)(MiniJson.Luku(a, "mallinKorkeus") ?? 0),
                MalliUrl = MiniJson.Teksti(malli, "url"),
                MalliSha256 = MiniJson.Teksti(malli, "sha256")?.ToLowerInvariant(),
                MalliTavuja = (long)(MiniJson.Luku(malli, "tavuja") ?? 0),
                Lisenssi = MiniJson.Teksti(a, "lisenssi"),
                Tekija = MiniJson.Teksti(a, "tekija"),
                Lahde = MiniJson.Teksti(a, "lahde"),
            };
            if (string.IsNullOrEmpty(r.Id) || !Tunnus(r.Id)) syy = "id puuttuu tai ei ole [a-z0-9-]";
            else if (string.IsNullOrEmpty(r.Kaupunki)) syy = "kaupunki puuttuu";
            else if (!(r.Lat >= -90 && r.Lat <= 90) || !(r.Lon >= -180 && r.Lon <= 180)) syy = "lat/lon puuttuu tai rajojen ulkopuolella";
            else if (!(r.MallinKorkeus > 0)) syy = "mallinKorkeus puuttuu";
            else if (malli == null || string.IsNullOrEmpty(r.MalliUrl)) syy = "malli.url puuttuu";
            else if (!r.MalliUrl.StartsWith("https://", StringComparison.Ordinal)
                     || !r.MalliUrl.EndsWith(".glb", StringComparison.OrdinalIgnoreCase)) syy = "malli.url ei ole https-osoite .glb-tiedostoon";
            else if (!Sha256(r.MalliSha256)) syy = "malli.sha256 puuttuu tai ei ole 64 heksamerkkiä";
            else if (!(r.MalliTavuja > 0)) syy = "malli.tavuja puuttuu";
            else if (!Lisenssit.Contains(r.Lisenssi)) syy = "lisenssi ei ole PD/CC: " + (r.Lisenssi ?? "puuttuu");
            return syy == null ? r : null;
        }

        static bool Tunnus(string s) => s.All(c => (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-');

        static bool Sha256(string s) =>
            s != null && s.Length == 64 && s.All(c => (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f'));

        /// <summary>Tarkistaa ladatun mallin: tavumäärä ja SHA-256 (pieni heksa) täsmäävät riviin.</summary>
        public static string TarkistaMalli(Maamerkkirivi r, byte[] tavut)
        {
            if (tavut == null) return "malli puuttuu";
            if (tavut.LongLength != r.MalliTavuja) return $"tavuja {tavut.LongLength}, odotettu {r.MalliTavuja}";
            using var sha = System.Security.Cryptography.SHA256.Create();
            var h = string.Concat(sha.ComputeHash(tavut).Select(b => b.ToString("x2", CultureInfo.InvariantCulture)));
            return h == r.MalliSha256 ? null : "sha256 ei täsmää";
        }
    }
}
