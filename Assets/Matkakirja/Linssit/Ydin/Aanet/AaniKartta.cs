// ÄÄNIKARTTA (Pelikoodari 6.10.2026, kaupunkiäänimaisema): OSM:stä esilaskettu kaupunkikohtainen ruudukko
// aanet/aanikartta-v1/<kaupunki>.json = { versio, kaupunki, ruutu_m, sade_m, lounas{lat,lon}, askel{lat,lon}, rivit, sarakkeet,
// kerrokset[], painot{kerros: base64(Uint8 rivit×sarakkeet, rivi kerrallaan etelästä pohjoiseen, 0–255 → 0–1)}, kirkot[{lat,lon,nimi}] }.
// Painot(lat, lon): bilineaarinen interpolointi neljän ruudun välillä (ruudukon ulkopuolella reunan arvo). Puhdas, ei Unitya.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class AaniKartta
    {
        public string Kaupunki;
        public double LounasLat, LounasLon, AskelLat, AskelLon;
        public int Rivit, Sarakkeet;
        public readonly Dictionary<string, byte[]> Ruudut = new Dictionary<string, byte[]>();
        public readonly List<(double Lat, double Lon, string Nimi)> Kirkot = new List<(double, double, string)>();

        public static AaniKartta Lue(string json)
        {
            var o = MiniJson.Jasenna(json) as Dictionary<string, object> ?? throw new FormatException("äänikartta ei ole objekti");
            var lounas = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "lounas"));
            var askel = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "askel"));
            var k = new AaniKartta
            {
                Kaupunki = MiniJson.Teksti(o, "kaupunki"),
                LounasLat = MiniJson.Luku(lounas, "lat") ?? 0, LounasLon = MiniJson.Luku(lounas, "lon") ?? 0,
                AskelLat = MiniJson.Luku(askel, "lat") ?? 0, AskelLon = MiniJson.Luku(askel, "lon") ?? 0,
                Rivit = (int)(MiniJson.Luku(o, "rivit") ?? 0), Sarakkeet = (int)(MiniJson.Luku(o, "sarakkeet") ?? 0),
            };
            if (k.Rivit <= 0 || k.Sarakkeet <= 0 || k.AskelLat <= 0 || k.AskelLon <= 0) throw new FormatException("äänikartan ruudukko puuttuu");
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "painot")) ?? new Dictionary<string, object>())
            {
                if (!(pari.Value is string b64)) continue;
                var t = Convert.FromBase64String(b64);
                if (t.Length != k.Rivit * k.Sarakkeet) throw new FormatException($"äänikartta {pari.Key}: {t.Length} ≠ {k.Rivit}×{k.Sarakkeet}");
                k.Ruudut[pari.Key] = t;
            }
            foreach (var ko in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kirkot")))
                if (MiniJson.ObjektiTaiNull(ko) is Dictionary<string, object> kk && MiniJson.Luku(kk, "lat") is double la && MiniJson.Luku(kk, "lon") is double lo)
                    k.Kirkot.Add((la, lo, MiniJson.Teksti(kk, "nimi")));
            return k;
        }

        /// <summary>Kerrosten painot pisteessä (bilineaarinen, reunalla reunan arvo).</summary>
        public Dictionary<string, double> Painot(double lat, double lon)
        {
            double y = (lat - LounasLat) / AskelLat, x = (lon - LounasLon) / AskelLon;
            y = Math.Max(0, Math.Min(Rivit - 1, y)); x = Math.Max(0, Math.Min(Sarakkeet - 1, x));
            int r0 = (int)Math.Floor(y), c0 = (int)Math.Floor(x), r1 = Math.Min(Rivit - 1, r0 + 1), c1 = Math.Min(Sarakkeet - 1, c0 + 1);
            double fy = y - r0, fx = x - c0;
            var tulos = new Dictionary<string, double>();
            foreach (var pari in Ruudut)
            {
                var t = pari.Value;
                double a = t[r0 * Sarakkeet + c0], b = t[r0 * Sarakkeet + c1], c = t[r1 * Sarakkeet + c0], d = t[r1 * Sarakkeet + c1];
                tulos[pari.Key] = ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy) / 255.0;
            }
            return tulos;
        }

        /// <summary>Kirkot säteellä (m), lähin ensin.</summary>
        public int KirkkojaLahella(double lat, double lon, double sadeM = 600)
        {
            int n = 0;
            foreach (var (la, lo, _) in Kirkot) if (Etaisyys(lat, lon, la, lo) <= sadeM) n++;
            return n;
        }

        public static double Etaisyys(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180, x = (lon2 - lon1) * r * Math.Cos((lat1 + lat2) * 0.5 * r), y = (lat2 - lat1) * r;
            return Math.Sqrt(x * x + y * y) * 6371000;
        }
    }
}
