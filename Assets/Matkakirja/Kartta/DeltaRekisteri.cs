using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja
{
    /// <summary>
    /// DELTASARJAN REKISTERI: laattakansio (julisteet/pallo/laatat/&lt;sarja&gt;/) → sen <see cref="Deltasarja"/> tai "ei deltaa"
    /// (täysi sarja). Laattapalvelin lataa kansion laatat.json:n kerran, asettaa sen tänne ja ohjaa jokaisen laatan
    /// SISÄLTÖPOLUN (<see cref="Ohjaa"/>): muuttumaton laatta luetaan ja haetaan perussarjan kansiosta, sama osoite kuin
    /// webissä. Tunnistamaton kansio ja kansio ilman deltaa: polku ennallaan. Säieturvallinen (palvelin ajaa säikeissä).
    /// Puhdas C# (Kartta-testit).
    /// </summary>
    public static class DeltaRekisteri
    {
        static readonly object lukko = new object();
        // null-arvo = tiedetään, ettei sarjalla ole deltaa.
        static readonly Dictionary<string, Deltasarja> kansiot = new Dictionary<string, Deltasarja>(StringComparer.Ordinal);

        /// <summary>Asettaa kansion deltan; null = kansio on täysi sarja (ei deltaa).</summary>
        public static void Aseta(string kansio, Deltasarja delta)
        {
            if (kansio == null) return;
            lock (lukko) kansiot[kansio] = delta;
        }

        /// <summary>Onko kansion tilanne (delta tai ei deltaa) jo selvitetty.</summary>
        public static bool Tunnettu(string kansio)
        {
            if (kansio == null) return true;
            lock (lukko) return kansiot.ContainsKey(kansio);
        }

        /// <summary>Kansion delta tai null (ei deltaa tai ei vielä tiedossa).</summary>
        public static Deltasarja Hae(string kansio)
        {
            if (kansio == null) return null;
            lock (lukko) return kansiot.TryGetValue(kansio, out var d) ? d : null;
        }

        /// <summary>Kaikki delta-kansiot ja niiden perussarjan kansiot (esim. laattapaketin sarjarajaus).</summary>
        public static List<string> PerusKansiot()
        {
            var l = new List<string>();
            lock (lukko)
                foreach (var d in kansiot.Values)
                    if (d != null && !l.Contains(d.PerusKansio)) l.Add(d.PerusKansio);
            return l;
        }

        public static void Nollaa() { lock (lukko) kansiot.Clear(); }

        /// <summary>
        /// Pallon laatan polun jäsennys: julisteet/pallo/laatat/&lt;sarja&gt;/z/x/y.pääte[?kysely] →
        /// kansio ("/"-loppuinen), z, x, y ja loppuosa ("pääte" + kysely, esim. ".jpg"). false, jos polku ei ole sellainen.
        /// </summary>
        public static bool Jasenna(string polku, out string kansio, out int z, out int x, out int y, out string paate)
        {
            kansio = paate = null;
            z = x = y = 0;
            if (polku == null || !polku.StartsWith(Deltasarja.LaattaJuuri, StringComparison.Ordinal)) return false;
            int q = polku.IndexOf('?');
            string perus = q < 0 ? polku : polku.Substring(0, q);
            string kysely = q < 0 ? "" : polku.Substring(q);
            int s3 = perus.LastIndexOf('/');
            if (s3 < 0) return false;
            int s2 = perus.LastIndexOf('/', s3 - 1);
            if (s2 < 0) return false;
            int s1 = perus.LastIndexOf('/', s2 - 1);
            if (s1 < Deltasarja.LaattaJuuri.Length) return false;   // kansion nimi puuttuu (tai ei ole juuren alla)
            string yTeksti = perus.Substring(s3 + 1);
            int piste = yTeksti.IndexOf('.');
            var ok = NumberStyles.None;
            if (!int.TryParse(perus.Substring(s1 + 1, s2 - s1 - 1), ok, CultureInfo.InvariantCulture, out z)
                || !int.TryParse(perus.Substring(s2 + 1, s3 - s2 - 1), ok, CultureInfo.InvariantCulture, out x)
                || !int.TryParse(piste < 0 ? yTeksti : yTeksti.Substring(0, piste), ok, CultureInfo.InvariantCulture, out y)
                || z > 30) return false;
            kansio = perus.Substring(0, s1 + 1);
            paate = (piste < 0 ? "" : yTeksti.Substring(piste)) + kysely;
            return true;
        }

        /// <summary>
        /// Laatan sisältöpolku: jos kansiolla on delta ja laatta ei ole muuttunut, sama z/x/y perussarjan kansiossa;
        /// muuten polku sellaisenaan (myös ilman deltaa tai tuntemattomalla kansiolla). Idempotentti: perussarjan
        /// polku ei ole delta-kansio (ketjun syvyys on yksi), joten toinen kutsu ei muuta sitä.
        /// </summary>
        public static string Ohjaa(string polku)
        {
            if (!Jasenna(polku, out string kansio, out int z, out int x, out int y, out string paate)) return polku;
            var d = Hae(kansio);
            if (d == null || d.Muuttunut(z, x, y, 1 << z)) return polku;
            return d.PerusKansio + z + "/" + x + "/" + y + paate;
        }
    }
}
