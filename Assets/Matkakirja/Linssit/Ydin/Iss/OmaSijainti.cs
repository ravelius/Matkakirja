// OMA SIJAINTI ISS-KYYDISSÄ (omistaja 28.9.2026, TF 1.0.39 -kaappaus: "Lisää myös mahdollisuus mennä käyttäjän sijainnin
// kohdalle"; Päätoimittaja: karkea sijainti mieluiten ilman lupakyselyä). Maa luetaan Cloudflaren trace-vastauksesta
// (https://media.matkakirja.app/cdn-cgi/trace, rivi "loc=FI": pyytäjän maa IP:n mukaan, ei laitteen sijaintia eikä
// lupaa), varalla laitteen alueasetus. Maan paikka on sen nimen keskipiste (MaatAineisto.KeskusLat/Lon), joten tarkkuus on
// maan kokoluokkaa — riittää ylilentoon (500 km:n säde). Laitteen sijaintia (CoreLocation) ei käytetä.
using System;

namespace Matkakirja.Linssit.Iss
{
    public static class OmaSijainti
    {
        public const string TraceUrl = "https://media.matkakirja.app/cdn-cgi/trace";

        /// <summary>Maa trace-vastauksesta ("loc=FI") ISO2-koodina isoin kirjaimin, tai null (puuttuu, XX tai T1 = Tor).</summary>
        public static string LueMaa(string trace)
        {
            if (string.IsNullOrEmpty(trace)) return null;
            foreach (var rivi in trace.Split('\n'))
            {
                var r = rivi.Trim();
                if (!r.StartsWith("loc=", StringComparison.Ordinal)) continue;
                var koodi = r.Substring(4).Trim().ToUpperInvariant();
                return Kelpaa(koodi) ? koodi : null;
            }
            return null;
        }

        /// <summary>Kaksikirjaiminen maakoodi, ei Cloudflaren tuntemattoman (XX) eikä Torin (T1) merkkiä.</summary>
        public static bool Kelpaa(string koodi) =>
            koodi != null && koodi.Length == 2 && char.IsLetter(koodi[0]) && char.IsLetter(koodi[1]) && koodi != "XX" && koodi != "T1";

        /// <summary>Ylilennon hakuleveys: ISS:n 51,6°:n rata ei ulotu Pohjolan ylle (500 km:n rajalla enintään ~56°), joten sitä
        /// pohjoisempi (tai eteläisempi) paikka haetaan leveydeltä ±51, jonka yli rata kulkee joka vuorokausi.</summary>
        public const double RadanLeveys = 51;
        public static double HakuLeveys(double lat) =>
            Math.Abs(lat) <= Ylilennot.MaksimiLeveys ? lat : Math.Sign(lat) * RadanLeveys;

        /// <summary>Katseen enimmäismatka ISS:n alapisteestä (km): kauempana maa näkyy vain utuna horisontissa.</summary>
        public const double KatseKm = 700;

        /// <summary>
        /// Minne kamera kääntyy perillä (laite 28.9. saatimet4: Suomi 1 520 km:n päässä näkyi pelkkänä harmaana utuna, kun katse
        /// osui horisonttiin): kohde itse, jos se on enintään KatseKm päässä ISS:n alapisteestä, muuten isoympyrän piste
        /// KatseKm kohteen suuntaan — maa näkyy, ja oma maa on horisontissa katseen jatkeella.
        /// </summary>
        public static (double lat, double lon) Katsepiste(double issLat, double issLon, double lat, double lon)
        {
            double d = Ylilennot.MaaEtaisyysKm(issLat, issLon, lat, lon);
            if (!(d > KatseKm)) return (lat, lon);
            const double r = Math.PI / 180;
            double f1 = issLat * r, l1 = issLon * r, f2 = lat * r, l2 = lon * r;
            double kulma = d / 6371.0, u = KatseKm / d;
            double a = Math.Sin((1 - u) * kulma) / Math.Sin(kulma), b = Math.Sin(u * kulma) / Math.Sin(kulma);
            double x = a * Math.Cos(f1) * Math.Cos(l1) + b * Math.Cos(f2) * Math.Cos(l2);
            double y = a * Math.Cos(f1) * Math.Sin(l1) + b * Math.Cos(f2) * Math.Sin(l2);
            double z = a * Math.Sin(f1) + b * Math.Sin(f2);
            return (Math.Atan2(z, Math.Sqrt(x * x + y * y)) / r, Math.Atan2(y, x) / r);
        }

        /// <summary>Valikon rivi: "Oma sijainti · Suomi" (maa tiedossa) tai "Oma sijainti".</summary>
        public static string Rivi(string maanNimi) => string.IsNullOrEmpty(maanNimi) ? "Oma sijainti" : "Oma sijainti · " + maanNimi;
    }
}
