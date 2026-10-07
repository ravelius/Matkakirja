// KYSY JA KESKUSTELU (omistaja 6.10. 11.57, Päätoimittaja: Pelikoodarin endpointit, juna 148): workerin vastaus Kysy-napin
// kysymykseen, mikrofoniin tai näppäimistöön. Vastaus kerrotaan Williamin äänellä samassa paikassa; toiminto voi siirtää
// kohteeseen, toiseen kaupunkiin, aloittaa kaupunkikierroksen tai pysäyttää/jatkaa. Kaksi jatkokysymystä nousee Kysy-listan kärkeen.
// Jäsennys on salliva (kentän nimen pienet erot eivät pudota vastausta), koska muoto sovittiin kiireessä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public enum OpasToiminto { Ei, Siirry, Kohde, Kaupunki, Kierros, Tauko, Jatka }

    public sealed class OpasKysyVastaus
    {
        public string Teksti, Aani, AaniPcm;
        public double KestoS;
        public string[] Jatkokysymykset = Array.Empty<string>();
        public OpasToiminto Toiminto;
        /// <summary>Siirry / kaupunki: nimi ja sijainti; kohde: id (Liiku-listalta) ja mahdollinen valmis pysähdys.</summary>
        public string ToimintoNimi, ToimintoId;
        public double ToimintoLat = double.NaN, ToimintoLon = double.NaN;
        public OpasKohde ToimintoKohde;
        /// <summary>Kaupunki-toiminnon kohde toisessa kaupungissa (worker #4107: "vie minut Pyhän Markuksen kirkkoon" Pariisista →
        /// Venetsia + basilika): nimi ja sijainti; NaN = ei kohdetta (laskeudutaan kaupungin yleiskuvaan).</summary>
        public string KohdeNimi;
        public double KohdeLat = double.NaN, KohdeLon = double.NaN;

        public static OpasKysyVastaus Lue(IDictionary<string, object> j)
        {
            if (j == null) return null;
            var v = new OpasKysyVastaus();
            IDictionary<string, object> vo = j.TryGetValue("vastaus", out var vx) ? vx as IDictionary<string, object> : null;
            var lahde = vo ?? j;
            v.Teksti = S(lahde, "teksti") ?? (vx as string);
            v.Aani = S(lahde, "aani"); v.AaniPcm = S(lahde, "aani_pcm");
            v.KestoS = D(lahde, "kesto_s", 0);
            v.Jatkokysymykset = Lista(j, "jatkokysymykset") ?? Lista(j, "kysymykset") ?? Array.Empty<string>();
            object to = j.TryGetValue("toiminto", out var t) ? t : null;
            var td = to as IDictionary<string, object>;
            string tyyppi = to as string ?? (td != null ? S(td, "tyyppi") : null);
            switch ((tyyppi ?? "").ToLowerInvariant())
            {
                case "siirry": v.Toiminto = OpasToiminto.Siirry; break;
                case "kohde": v.Toiminto = OpasToiminto.Kohde; break;
                case "kaupunki": v.Toiminto = OpasToiminto.Kaupunki; break;
                case "kierros": case "kaupunkikierros": v.Toiminto = OpasToiminto.Kierros; break;
                case "tauko": v.Toiminto = OpasToiminto.Tauko; break;
                case "jatka": v.Toiminto = OpasToiminto.Jatka; break;
                default: v.Toiminto = OpasToiminto.Ei; break;
            }
            if (td != null)
            {
                var sisa = td.TryGetValue("kohde", out var kx) && kx is IDictionary<string, object> kd ? kd : td;
                // Kaupunki + kohde (#4107): kaupunki on toiminnon omissa kentissä, kohde litteinä kenttinä kohde_nimi/_lat/_lon.
                // Litteä muoto, koska TF 156/157 -appien jäsennys ottaisi "kohde"-alikentän nimen kaupungin nimeksi (Päätoimittaja
                // 7.10. 07.0x); alikenttä luetaan silti, jos worker lähettää sen.
                if (v.Toiminto == OpasToiminto.Kaupunki)
                {
                    if (sisa != td) { v.KohdeNimi = S(sisa, "nimi"); v.KohdeLat = D(sisa, "lat", double.NaN); v.KohdeLon = D(sisa, "lon", double.NaN); sisa = td; }
                    if (S(td, "kohde_nimi") is string kn) { v.KohdeNimi = kn; v.KohdeLat = D(td, "kohde_lat", double.NaN); v.KohdeLon = D(td, "kohde_lon", double.NaN); }
                }
                v.ToimintoNimi = S(sisa, "nimi"); v.ToimintoId = S(sisa, "id");
                v.ToimintoLat = D(sisa, "lat", double.NaN); v.ToimintoLon = D(sisa, "lon", double.NaN);
                if (sisa != td) v.ToimintoKohde = OpasKohde.Lue(sisa);
            }
            if (string.IsNullOrWhiteSpace(v.Teksti) && v.Toiminto == OpasToiminto.Ei) return null;
            return v;
        }

        /// <summary>Kysy-lista: vastauksen jatkokysymykset ensin, sitten pysähdyksen kysymykset ilman kaksoiskappaleita.</summary>
        public static string[] Yhdista(string[] jatko, string[] perus, int enintaan = 8)
        {
            var r = new List<string>();
            foreach (var x in (jatko ?? Array.Empty<string>())) if (!string.IsNullOrWhiteSpace(x) && !r.Contains(x.Trim())) r.Add(x.Trim());
            foreach (var x in (perus ?? Array.Empty<string>())) if (!string.IsNullOrWhiteSpace(x) && !r.Contains(x.Trim())) r.Add(x.Trim());
            return r.Count > enintaan ? r.GetRange(0, enintaan).ToArray() : r.ToArray();
        }

        static string S(IDictionary<string, object> d, string k) => d != null && d.TryGetValue(k, out var v) ? v as string : null;
        static double D(IDictionary<string, object> d, string k, double o) =>
            d != null && d.TryGetValue(k, out var v) && v != null && !(v is string) ? Convert.ToDouble(v, System.Globalization.CultureInfo.InvariantCulture) : o;
        static string[] Lista(IDictionary<string, object> d, string k)
        {
            if (!d.TryGetValue(k, out var v) || !(v is IList<object> l)) return null;
            var r = new List<string>();
            foreach (var x in l) if (x is string s && !string.IsNullOrWhiteSpace(s)) r.Add(s.Trim());
            return r.ToArray();
        }
    }
}
