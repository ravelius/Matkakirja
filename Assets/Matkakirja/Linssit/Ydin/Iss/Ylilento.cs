// "LENNÄ KOHTEEN YLLE" (omistaja 28.9.2026 klo 12.1x; web js/linssit/iss-rata.js seuraavaYlilento ja iss-kyyti-nakyma.js
// ylilennonKohteet, commit 891958e17): ISS:n SEURAAVA todellinen ohitus kohteen yli SGP4:llä (IssNyt.Paikka) ja valikon
// kohteet: Astronautin kameran omat NASA-kohteet Euroopan rajauksella (VAIN EUROOPPA 27.9.), samat ja samassa järjestyksessä
// kuin webissä. Linssi kelaa simuloidun ajan ohitukseen (Simukello.KelaaHetkeen), ja perillä kamera kääntyy kohteeseen
// (KyydinTila.Kohde). Puhdas C#.
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Iss
{
    /// <summary>Ylilento: maajäljen lähin ohitus (hetki UTC), sivuttaisetäisyys (km) ja ISS:n alapiste silloin.</summary>
    public readonly struct Ylilento
    {
        public readonly DateTime Hetki;
        public readonly double SivuttainKm, Lat, Lon;
        public Ylilento(DateTime hetki, double sivuttainKm, double lat, double lon) { Hetki = hetki; SivuttainKm = sivuttainKm; Lat = lat; Lon = lon; }
        public override string ToString() => $"{Hetki:yyyy-MM-dd HH:mm:ss} UTC, sivussa {SivuttainKm:0.0} km, ISS ({Lat:F2}, {Lon:F2})";
    }

    public static class Ylilennot
    {
        /// <summary>Ylilennon raja: maajäljen lähin ohitus enintään näin kaukana (km); haun pituus (h) ja karkea askel (s).</summary>
        public const double RajaKm = 500, HakuH = 48, AskelS = 20;
        /// <summary>Valoisa ylilento (valinnainen): aurinko kohteessa yli 10° horisontin yllä.</summary>
        public const double ValoisaKorkeus = 10;
        /// <summary>
        /// Valikon alue (web YLILENNON_ALUE): leveys 34–72°, pituus −25…45°. Pois kohteet, joiden yli ISS ei lennä: 51,6°:n rata
        /// näkee 500 km:n rajalla enintään noin 56°N (revontulet 60°N).
        /// </summary>
        public const double AlueLatMin = 34, AlueLatMax = 72, AlueLonMin = -25, AlueLonMax = 45, MaksimiLeveys = 56;

        /// <summary>Maan pinnan etäisyys (km, 111,195 km/aste kuten webissä).</summary>
        public static double MaaEtaisyysKm(double lat1, double lon1, double lat2, double lon2)
        {
            const double r = Math.PI / 180;
            double c = Math.Sin(lat1 * r) * Math.Sin(lat2 * r) + Math.Cos(lat1 * r) * Math.Cos(lat2 * r) * Math.Cos((lon1 - lon2) * r);
            return Math.Acos(Math.Max(-1, Math.Min(1, c))) / r * 111.195;
        }

        /// <summary>Seuraava ylilento ISS:n todellisella radalla (IssNyt.Paikka: SGP4 tai havainnollinen rata ilman TLE:tä).</summary>
        public static Ylilento? Seuraava(double lat, double lon, DateTime alku, double rajaKm = RajaKm, double hakuH = HakuH,
            double askelS = AskelS, bool valoisa = false) =>
            Seuraava(IssNyt.Paikka, lat, lon, alku, rajaKm, hakuH, askelS, valoisa);

        /// <summary>
        /// ISS:n SEURAAVA ylilento kohteen yli hetken <paramref name="alku"/> jälkeen: maajäljen lähin ohitus, kun se on
        /// enintään <paramref name="rajaKm"/> sivussa. Karkea haku 20 s:n askelin (maajälki liikkuu 150 km askeleessa), sitten
        /// kultainen leikkaus puolen sekunnin tarkkuuteen. Meneillään oleva ohitus ohitetaan (haku alkaa minuutin päästä).
        /// <paramref name="valoisa"/>: vain ohitukset, joissa aurinko on kohteessa yli 10° horisontin yllä. null = ei ohitusta.
        /// </summary>
        public static Ylilento? Seuraava(Func<DateTime, LatLon> paikka, double lat, double lon, DateTime alku,
            double rajaKm = RajaKm, double hakuH = HakuH, double askelS = AskelS, bool valoisa = false)
        {
            DateTime H(double ms) => alku.AddTicks((long)Math.Round(ms * TimeSpan.TicksPerMillisecond));
            double D(double ms)
            {
                var p = paikka(H(ms));
                return MaaEtaisyysKm(p.Lat, p.Lon, lat, lon);
            }
            double askel = askelS * 1000, loppu = hakuH * 3600e3, t0 = 60e3;
            double a = D(t0 - askel), b = D(t0);
            for (double t = t0 + askel; t <= loppu; t += askel)
            {
                double c = D(t);
                if (b <= a && b <= c && b < rajaKm + 200)
                {
                    // Paikallinen minimi välillä [t − 2 askelta, t]: kultainen leikkaus.
                    double x0 = t - 2 * askel, x1 = t, g = (Math.Sqrt(5) - 1) / 2;
                    double c1 = x1 - g * (x1 - x0), c2 = x0 + g * (x1 - x0), f1 = D(c1), f2 = D(c2);
                    while (x1 - x0 > 500)
                    {
                        if (f1 < f2) { x1 = c2; c2 = c1; f2 = f1; c1 = x1 - g * (x1 - x0); f1 = D(c1); }
                        else { x0 = c1; c1 = c2; f1 = f2; c2 = x0 + g * (x1 - x0); f2 = D(c2); }
                    }
                    double ms = Math.Floor((x0 + x1) / 2 + 0.5), sivu = D(ms);
                    if (sivu <= rajaKm && ms > 0 && (!valoisa || Valossa(H(ms), lat, lon)))
                    {
                        var p = paikka(H(ms));
                        return new Ylilento(H(ms), sivu, p.Lat, p.Lon);
                    }
                }
                a = b;
                b = c;
            }
            return null;
        }

        /// <summary>Aurinko kohteessa yli ValoisaKorkeus-asteen horisontin yllä hetkellä utc.</summary>
        public static bool Valossa(DateTime utc, double lat, double lon)
        {
            Aurinko.Alihajapiste(Aika.Jd(utc), out double alat, out double alon);
            const double r = Math.PI / 180;
            double s = Math.Sin(lat * r) * Math.Sin(alat * r) + Math.Cos(lat * r) * Math.Cos(alat * r) * Math.Cos((lon - alon) * r);
            return s > Math.Sin(ValoisaKorkeus * r);
        }

        /// <summary>
        /// Valikon kohteet (web ylilennonKohteet): aineiston kohteet Euroopan rajauksella, ISS:n ylilentojen leveysrajan sisällä,
        /// nimen mukaan suomalaisessa aakkosjärjestyksessä (web localeCompare 'fi'; vakaa lajittelu kuten webissä).
        /// </summary>
        public static List<Havaintokohde> Kohteet(IEnumerable<Havaintokohde> kohteet) =>
            (kohteet ?? Enumerable.Empty<Havaintokohde>())
                .Where(k => k != null && Aarellinen(k.Lat) && Aarellinen(k.Lon)
                    && k.Lat >= AlueLatMin && k.Lat <= AlueLatMax && k.Lon >= AlueLonMin && k.Lon <= AlueLonMax
                    && Math.Abs(k.Lat) <= MaksimiLeveys)
                .OrderBy(k => k.Nimi ?? "", Suomeksi)
                .ToList();

        static bool Aarellinen(double x) => !double.IsNaN(x) && !double.IsInfinity(x);

        /// <summary>
        /// Suomalainen aakkosjärjestys ilman alustan lokaalia (iOS:n IL2CPP ja testien .NET antaisivat eri tuloksen): kirjaimet
        /// kirjainkoosta ja tarkkeista riippumatta (š = s, é = e, ü = y), å, ä ja ö z:n jälkeen (æ = ä, ø = ö), välilyönti ja
        /// välimerkit ennen kirjaimia kuten ICU:n suomi; tasatilanteessa tarkkeet ja lopuksi merkit sellaisinaan.
        /// </summary>
        public static readonly IComparer<string> Suomeksi = Comparer<string>.Create(VertaaSuomeksi);

        public static int VertaaSuomeksi(string a, string b)
        {
            a ??= "";
            b ??= "";
            int e = string.CompareOrdinal(Avain(a, true), Avain(b, true));
            if (e != 0) return e;
            e = string.CompareOrdinal(Avain(a, false), Avain(b, false));
            return e != 0 ? e : string.CompareOrdinal(a, b);
        }

        /// <summary>Lajitteluavain: perus = tarkkeet pois (ensisijainen vertailu), muuten vain pienaakkoset (tarkkeet mukana).</summary>
        static string Avain(string s, bool perus)
        {
            var sb = new StringBuilder(s.Length);
            foreach (char c0 in s)
            {
                char c = char.ToLowerInvariant(c0);
                switch (c)
                {
                    case 'å': sb.Append('{'); continue;             // z:n jälkeen: å < ä < ö
                    case 'ä': case 'æ': sb.Append('|'); continue;
                    case 'ö': case 'ø': case 'œ': sb.Append('}'); continue;
                    case '’': case '‘': sb.Append('\''); continue;
                    case '–': case '—': sb.Append('-'); continue;
                }
                if (!perus || c < 0x80) { sb.Append(c); continue; }
                switch (c)
                {
                    case 'ü': case 'ű': sb.Append('y'); continue;
                    case 'ł': sb.Append('l'); continue;
                    case 'đ': case 'ð': sb.Append('d'); continue;
                    case 'ß': sb.Append("ss"); continue;
                }
                string d = c.ToString().Normalize(NormalizationForm.FormD);
                sb.Append(d.Length > 0 && d[0] < 0x80 ? d[0] : c);
            }
            return sb.ToString();
        }
    }
}
