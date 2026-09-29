using System;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Peli;

namespace Matkakirja
{
    /// <summary>
    /// DELTASARJA (Karttaseppä 29.9.2026, web js/deltasarja.js laattaMuuttunut ja js/pallo.js pallonLaatta): uusi
    /// laattasarja vie ämpäriin vain PERUSSARJASTA MUUTTUNEET laatat. Pallon laatat.json (ja pyramidin luettelo) kantaa
    /// kentän
    ///   "delta": { "perus": "&lt;perussarjan kansio/versio&gt;", "muuttuneet": { "&lt;taso&gt;": "&lt;base64&gt;" | null } }
    /// Bitti i = rivi · sarakkeita + sarake (pallossa sarakkeita = 2^taso); tavu i &gt;&gt; 3, bitti i &amp; 7 (vähiten
    /// merkitsevä ensin). Bitti 1 = laatta on uuden sarjan kansiossa. Bitti 0 tai indeksi bittikartan yli = laatta on
    /// perussarjan kansiossa (julisteet/pallo/laatat/&lt;perus&gt;/z/x/y.jpg, sama polkukaava, vain kansio vaihtuu). Taso null
    /// tai puuttuu = koko taso uudessa kansiossa. Ilman delta-kenttää toiminta on täsmälleen ennallaan.
    ///
    /// Puhdas C# (Kartta-testit). Luokka <see cref="Deltasarja"/> = yhden sarjan delta; <see cref="DeltaRekisteri"/> = mitä
    /// sarjaa (kansiota) vastaa mikäkin delta, ja polun ohjaus perussarjaan (Laattapalvelin käyttää sitä sisältöpolkuna:
    /// paketti, offline, välimuisti, verkko). Sisältöpolku on sama kuin webin osoite, joten välimuisti pysyy jaettuna.
    /// </summary>
    public sealed class Deltasarja
    {
        /// <summary>Pallon laattasarjojen juuri ämpärissä (perus = kansion nimi tämän alla).</summary>
        public const string LaattaJuuri = "julisteet/pallo/laatat/";

        /// <summary>Perussarjan kansion nimi (delta.perus), esim. 2026-09-27-pohja.</summary>
        public string Perus { get; }
        /// <summary>Perussarjan kansio ämpärin polkuna, "/"-loppuisena.</summary>
        public string PerusKansio { get; }

        // taso → bittikartta; null = koko taso uudessa kansiossa (null, puuttuva tai rikkinäinen base64).
        readonly Dictionary<int, byte[]> bitit = new Dictionary<int, byte[]>();

        Deltasarja(string perus)
        {
            Perus = perus;
            PerusKansio = perus.StartsWith("julisteet/", StringComparison.Ordinal) ? perus.TrimEnd('/') + "/" : LaattaJuuri + perus + "/";
        }

        /// <summary>
        /// Lukee deltan laatat.json-tekstistä: juuriobjektin "delta"-kenttä, tai itse juuriobjekti, jos se on delta
        /// (perus + muuttuneet; Karttasepän delta-pohja.json). null = ei deltaa (kenttä puuttuu, perus puuttuu tai JSON rikki).
        /// </summary>
        public static Deltasarja Lue(string json)
        {
            if (string.IsNullOrWhiteSpace(json)) return null;
            try { return Lue(MiniJson.Jasenna(json)); }
            catch (FormatException) { return null; }
        }

        /// <summary>Kuten <see cref="Lue(string)"/> jäsennetystä JSON-puusta (laatat.json:n tai delta-objekti).</summary>
        public static Deltasarja Lue(object puu)
        {
            var juuri = puu as Dictionary<string, object>;
            if (juuri == null) return null;
            var d = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "delta"));
            if (d == null && juuri.ContainsKey("muuttuneet")) d = juuri;
            if (d == null) return null;
            string perus = MiniJson.Teksti(d, "perus");
            if (string.IsNullOrWhiteSpace(perus)) return null;
            var s = new Deltasarja(perus.Trim());
            var m = MiniJson.ObjektiTaiNull(MiniJson.Kentta(d, "muuttuneet"));
            if (m != null)
                foreach (var kv in m)
                {
                    if (!int.TryParse(kv.Key, NumberStyles.None, CultureInfo.InvariantCulture, out int taso)) continue;
                    byte[] b = null;
                    // Base64 puretaan kerran per taso. Rikkinäinen = koko taso uudessa (kuten webin bitit()).
                    if (kv.Value is string t) { try { b = Convert.FromBase64String(t); } catch (FormatException) { b = null; } }
                    s.bitit[taso] = b;
                }
            return s;
        }

        /// <summary>Onko tasolle bittikartta (false = koko taso uudessa kansiossa).</summary>
        public bool TasollaKartta(int taso) => bitit.TryGetValue(taso, out var b) && b != null;

        /// <summary>
        /// Onko laatta muuttunut perussarjasta eli asuuko se uuden sarjan kansiossa. Tason kartta puuttuu → aina kyllä.
        /// x = sarake, y = rivi (XYZ-polun z/x/y). Bitti i = y · sarakkeita + x; indeksi kartan yli → ei (perus).
        /// </summary>
        public bool Muuttunut(int taso, int x, int y, int sarakkeita)
        {
            if (!bitit.TryGetValue(taso, out var b) || b == null) return true;
            long i = (long)y * sarakkeita + x;
            if (i < 0) return true;
            long tavu = i >> 3;
            if (tavu >= b.Length) return false;
            return ((b[tavu] >> (int)(i & 7)) & 1) == 1;
        }

        /// <summary>Pallon laatta (sarakkeita = 2^taso): uuden sarjan kansio, jos muuttunut, muuten perussarjan kansio.</summary>
        public string Kansio(string uusiKansio, int taso, int x, int y) =>
            Muuttunut(taso, x, y, 1 << taso) ? uusiKansio : PerusKansio;

        /// <summary>
        /// Muuttuneiden laattojen osuus tasolla (pallo: 4^taso laattaa); koko taso uudessa = 1.
        /// Huom: ylimääräiset bitit kartan lopussa (täytebitit) eivät ole laattoja, joten lasketaan vain 4^taso ensimmäistä.
        /// </summary>
        public double MuuttuneidenOsuus(int taso)
        {
            if (!TasollaKartta(taso)) return 1.0;
            long n = 1L << (2 * taso), kpl = 0;
            for (long i = 0; i < n; i++) if (Muuttunut(taso, (int)(i % (1 << taso)), (int)(i / (1 << taso)), 1 << taso)) kpl++;
            return (double)kpl / n;
        }
    }
}
