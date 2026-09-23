// VERTAILU- JA MAATIETOLINSSIN AINEISTO sisältöpaketista:
//   kokoelmat/maarajat.json             maat asteina: id = ISO3, iso2 (ei kaikilla), bbox [w, s, e, n],
//                                       renkaat [[[lon, lat], …]] (Natural Earth 10m, 0,05° harvennus;
//                                       saaria ja reikiä ei eroteltu → parillisuussääntö)
//   kokoelmat/maat.json                 nimi, lippu, lippuUrl, maalehti, tiedot (MAATIEDOT)
//   moduulit/js/linssit/vertailu.json   LINSSI (tunnus, nimi, lyhyt, ikoni, lahde, jarjestys 90)
//   moduulit/js/linssit/maatiedot.json  LINSSI (jarjestys 95)
//
// Maan tunnus on koko natiivissa ISO3 (maarajat.json id, sama kuin webin
// countryShapes-avain; Natiivisepän kanssa sovittu 23.9.). Iso2 on kaikilla koepaketista v11 alkaen.
//
// Vienti koodaa negatiivisen nollan olioksi { "$luku": "-0" } (JSON ei erota
// -0:aa), joten koordinaatit luetaan Luku-apurilla.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Maat
{
    /// <summary>Väri 0…1 ilman UnityEngineä (sovitin muuntaa Coloriksi).</summary>
    public readonly struct Rgba : IEquatable<Rgba>
    {
        public readonly float R, G, B, A;
        public Rgba(float r, float g, float b, float a = 1f) { R = r; G = g; B = b; A = a; }

        /// <summary>"#rrggbb" tai "rgba(r, g, b, a)" (webin sävymerkkijonot).</summary>
        public static Rgba Lue(string s)
        {
            s = s?.Trim() ?? throw new ArgumentNullException(nameof(s));
            if (s.StartsWith("#") && s.Length == 7)
            {
                int v = int.Parse(s.Substring(1), NumberStyles.HexNumber, CultureInfo.InvariantCulture);
                return new Rgba(((v >> 16) & 255) / 255f, ((v >> 8) & 255) / 255f, (v & 255) / 255f);
            }
            if (s.StartsWith("rgba(") && s.EndsWith(")"))
            {
                var o = s.Substring(5, s.Length - 6).Split(',')
                    .Select(x => float.Parse(x.Trim(), CultureInfo.InvariantCulture)).ToArray();
                if (o.Length == 4) return new Rgba(o[0] / 255f, o[1] / 255f, o[2] / 255f, o[3]);
            }
            throw new FormatException("tuntematon väri: " + s);
        }

        public bool Equals(Rgba o) => R == o.R && G == o.G && B == o.B && A == o.A;
        public override bool Equals(object o) => o is Rgba r && Equals(r);
        public override int GetHashCode() => HashCode.Combine(R, G, B, A);
        public override string ToString() => $"rgba({R * 255:F0}, {G * 255:F0}, {B * 255:F0}, {A:0.##})";
    }

    /// <summary>Maan sävy: täyttö ja raja (web { vari, reuna }).</summary>
    public readonly struct Savy : IEquatable<Savy>
    {
        public readonly Rgba Taytto, Reuna;
        public Savy(Rgba taytto, Rgba reuna) { Taytto = taytto; Reuna = reuna; }
        public Savy(string taytto, string reuna) : this(Rgba.Lue(taytto), Rgba.Lue(reuna)) { }
        public bool Equals(Savy o) => Taytto.Equals(o.Taytto) && Reuna.Equals(o.Reuna);
        public override bool Equals(object o) => o is Savy s && Equals(s);
        public override int GetHashCode() => HashCode.Combine(Taytto, Reuna);
    }

    /// <summary>Yksi maa pallolla.</summary>
    public sealed class Maa
    {
        public string Id;       // ISO3
        public string Iso2;     // voi puuttua
        public string Nimi;
        public string Lippu, LippuUrl;
        /// <summary>Maalehden tunnus (kokoelmat/maalehdet), tai null.</summary>
        public string Maalehti;
        /// <summary>Rajalaatikko asteina; E voi olla yli 180, jos maa ylittää päivämäärärajan.</summary>
        public double W, S, E, N;
        /// <summary>Renkaat [lon, lat]; saaret ja reiät samassa listassa (parillisuussääntö).</summary>
        public List<(double Lon, double Lat)[]> Renkaat = new List<(double Lon, double Lat)[]>();
        /// <summary>Nimen paikka: suurimman renkaan painopiste (tai sen laatikon keskus).</summary>
        public double KeskusLat, KeskusLon;
        /// <summary>Nimi piirretään pallolle (web: laudan leveys >= 60, MaatAineisto.Nimelle).</summary>
        public bool NimiPallolle;
        /// <summary>Vertailukortin rivit (web rakennaVertailuTunnusluvut): nimiö ja arvo.</summary>
        public List<(string Nimio, string Arvo)> Tunnusluvut = new List<(string, string)>();
    }

    public sealed class MaatAineisto
    {
        /// <summary>Maat ISO3-tunnuksella.</summary>
        public readonly Dictionary<string, Maa> Maat = new Dictionary<string, Maa>(StringComparer.Ordinal);
        public LinssiTiedot Vertailu, Maatiedot;

        /// <summary>
        /// Nimen leveysraja asteina. Webin ehto on laudan leveys >= 60 px
        /// maailmankartalla (12 000 px = 360°), eli 1,8°. Pallolla mitataan
        /// renkaista, jotka ovat vähintään NimenRengasOsuus suurimmasta: kaukaiset
        /// pikkusaaret eivät levennä maata. Kynnys 1,85° erottaa Kyproksen (58 px)
        /// Kuwaitista (64 px). Ainoa ero webiin on Saint Helena (laudalla vain
        /// pääsaari, rajoissa myös Ascension ja Tristan da Cunha).
        /// </summary>
        public const double NimenLeveys = 1.85;
        public const double NimenRengasOsuus = 0.01;

        public Maa Hae(string iso3) => iso3 != null && Maat.TryGetValue(iso3, out var m) ? m : null;

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;

        /// <summary>Luku tai viennin { "$luku": "-0" }.</summary>
        static double Luku(object x)
        {
            if (x is double d) return d;
            if (Ob(x) is Dictionary<string, object> o && MiniJson.Teksti(o, "$luku") is string s)
                return double.Parse(s, CultureInfo.InvariantCulture);
            return double.NaN;
        }

        static IEnumerable<object> Alkiot(object kokoelma) =>
            Lista(MiniJson.Kentta(Ob(kokoelma), "alkiot")) ?? throw new FormatException("kokoelmasta puuttuu alkiot");

        static Dictionary<string, object> Linssi(object moduuli)
        {
            if (moduuli == null) return null;
            var v = Ob(MiniJson.Kentta(Ob(moduuli), "exportit"));
            var o = Ob(MiniJson.Kentta(v, "LINSSI"));
            return Ob(MiniJson.Kentta(o, "arvo")) ?? o;
        }

        static LinssiTiedot Tiedot(object moduuli, string id, string nimi, int jarjestys)
        {
            var l = Linssi(moduuli);
            var lahde = Ob(MiniJson.Kentta(l, "lahde"));
            return new LinssiTiedot
            {
                Id = MiniJson.Teksti(l, "tunnus") ?? id,
                Nimi = MiniJson.Teksti(l, "nimi") ?? nimi,
                Lyhyt = MiniJson.Teksti(l, "lyhyt"),
                Jarjestys = (int)(MiniJson.Luku(l, "jarjestys") ?? jarjestys),
                Ikoni = MiniJson.Teksti(l, "ikoni"),
                Valokuva = MiniJson.Totuus(l, "valokuva", false),
                Kesken = MiniJson.Totuus(l, "kesken", false),
                Lahde = lahde == null ? null : new Lahde
                {
                    Aineisto = MiniJson.Teksti(lahde, "aineisto"), Lisenssi = MiniJson.Teksti(lahde, "lisenssi"),
                    Osoite = MiniJson.Teksti(lahde, "osoite"), Haettu = MiniJson.Teksti(lahde, "haettu"),
                },
            };
        }

        /// <summary>Pelkät rajat (MaaOsuma: Natiivisepän napautus ja Sumu.PaljastaMaa).</summary>
        public static MaatAineisto LueRajat(object maarajat) => Lue(maarajat, null, null, null);

        public static MaatAineisto Lue(object maarajat, object maat, object vertailuModuuli, object maatiedotModuuli)
        {
            var a = new MaatAineisto();
            foreach (var o in Alkiot(maarajat))
            {
                var r = Ob(o);
                var id = MiniJson.Teksti(r, "id");
                if (id == null) continue;
                var bbox = Lista(MiniJson.Kentta(r, "bbox"));
                var m = new Maa { Id = id, Iso2 = MiniJson.Teksti(r, "iso2"), Nimi = id };
                if (bbox != null && bbox.Count == 4)
                { m.W = Luku(bbox[0]); m.S = Luku(bbox[1]); m.E = Luku(bbox[2]); m.N = Luku(bbox[3]); }
                foreach (var rengas in Lista(MiniJson.Kentta(r, "renkaat")) ?? new List<object>())
                {
                    var pisteet = (Lista(rengas) ?? new List<object>())
                        .Select(p => Lista(p) is List<object> l && l.Count >= 2 ? (Luku(l[0]), Luku(l[1])) : (double.NaN, double.NaN))
                        .Where(p => !double.IsNaN(p.Item1) && !double.IsNaN(p.Item2)).ToArray();
                    if (pisteet.Length >= 3) m.Renkaat.Add(pisteet);
                }
                if (m.Renkaat.Count == 0) continue;
                Mittaa(m);
                a.Maat[id] = m;
            }

            if (maat != null)
                foreach (var o in Alkiot(maat))
                {
                    var t = Ob(o);
                    var m = a.Hae(MiniJson.Teksti(t, "id"));
                    if (m == null) continue;
                    m.Nimi = MiniJson.Teksti(t, "nimi") ?? m.Id;
                    m.Iso2 ??= MiniJson.Teksti(t, "iso2");
                    m.Lippu = MiniJson.Teksti(t, "lippu");
                    m.LippuUrl = MiniJson.Teksti(t, "lippuUrl");
                    m.Maalehti = MiniJson.Teksti(t, "maalehti");
                    var tiedot = Ob(MiniJson.Kentta(t, "tiedot"));
                    if (tiedot == null) continue;
                    void Rivi(string nimio, string arvo) { if (!string.IsNullOrEmpty(arvo)) m.Tunnusluvut.Add((nimio, arvo)); }
                    Rivi("Väkiluku", MiniJson.Teksti(tiedot, "vakiluku"));
                    Rivi("Pinta-ala", MiniJson.Teksti(tiedot, "pintaAla"));
                    Rivi("Tulot", MiniJson.Teksti(Ob(MiniJson.Kentta(tiedot, "keskitulo")), "arvo"));
                    Rivi("V-Dem", MiniJson.Teksti(Ob(MiniJson.Kentta(tiedot, "demokratia")), "arvo"));
                }

            // Ilman maat.jsonia (julkaistu paketti v2) nimenä olisi ISO3-koodi:
            // sellaista ei piirretä pallolle (Natiivisepän iPad-havainto 23.9.).
            foreach (var m in a.Maat.Values) if (m.Nimi == m.Id) m.NimiPallolle = false;

            a.Vertailu = Tiedot(vertailuModuuli, "vertailu", "Vertailulinssi", 90);
            a.Maatiedot = Tiedot(maatiedotModuuli, "maatiedot", "Maiden tiedot", 95);
            return a;
        }

        /// <summary>Renkaan pinta-ala (astetasossa, etumerkki pois).</summary>
        internal static double Ala((double Lon, double Lat)[] r)
        {
            double s = 0;
            for (int i = 0, j = r.Length - 1; i < r.Length; j = i++) s += r[j].Lon * r[i].Lat - r[i].Lon * r[j].Lat;
            return Math.Abs(s / 2);
        }

        /// <summary>Leveyspiirin lat leveimmän renkaan sisäisen välin keskikohta.</summary>
        static double? LeveinVali((double Lon, double Lat)[] r, double lat)
        {
            var x = new List<double>();
            for (int i = 0, j = r.Length - 1; i < r.Length; j = i++)
                if ((r[i].Lat > lat) != (r[j].Lat > lat))
                    x.Add((r[j].Lon - r[i].Lon) * (lat - r[i].Lat) / (r[j].Lat - r[i].Lat) + r[i].Lon);
            x.Sort();
            double? paras = null, leveys = 0;
            for (int i = 0; i + 1 < x.Count; i += 2)
                if (x[i + 1] - x[i] > leveys) { leveys = x[i + 1] - x[i]; paras = (x[i] + x[i + 1]) / 2; }
            return paras;
        }

        /// <summary>Nimen paikka ja nimiehto.</summary>
        static void Mittaa(Maa m)
        {
            var alat = m.Renkaat.Select(Ala).ToArray();
            double suurin = alat.Max();
            var iso = m.Renkaat[Array.IndexOf(alat, suurin)];

            double w = double.MaxValue, e = double.MinValue;
            for (int i = 0; i < m.Renkaat.Count; i++)
            {
                if (alat[i] < NimenRengasOsuus * suurin) continue;
                foreach (var p in m.Renkaat[i]) { w = Math.Min(w, p.Lon); e = Math.Max(e, p.Lon); }
            }
            m.NimiPallolle = e - w >= NimenLeveys;

            // Painopiste (kengännauha). Jos se osuu renkaan ulkopuolelle (kaareva
            // maa kuten Vietnam), nimi menee painopisteen leveyspiirin leveimmän
            // sisäosan keskelle.
            double a = 0, cx = 0, cy = 0;
            for (int i = 0, j = iso.Length - 1; i < iso.Length; j = i++)
            {
                double k = iso[j].Lon * iso[i].Lat - iso[i].Lon * iso[j].Lat;
                a += k; cx += (iso[j].Lon + iso[i].Lon) * k; cy += (iso[j].Lat + iso[i].Lat) * k;
            }
            double lat0 = Math.Abs(a) > 1e-12 ? cy / (3 * a) : (iso.Min(p => p.Lat) + iso.Max(p => p.Lat)) / 2;
            double lon0 = Math.Abs(a) > 1e-12 ? cx / (3 * a) : (iso.Min(p => p.Lon) + iso.Max(p => p.Lon)) / 2;
            if (!MaaOsuma.Sisalla(iso, lon0, lat0)) lon0 = LeveinVali(iso, lat0) ?? lon0;
            m.KeskusLat = lat0;
            m.KeskusLon = lon0;
            if (m.KeskusLon > 180) m.KeskusLon -= 360;
            if (m.KeskusLon < -180) m.KeskusLon += 360;
        }
    }
}
