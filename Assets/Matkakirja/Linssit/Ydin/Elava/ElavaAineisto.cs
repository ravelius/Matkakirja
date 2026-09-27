// ELÄVÄ KARTTA: kohtauksen aineisto maittain (Linssiseppä 26.9.2026). Puhdas C#.
//
//   JOET   Karttasepän julisteet/pallo/vektorit/joet-2026-09-26b/<ISO>.geojson (GEOGLOWS v2 / TDX-Hydro, CC BY-SA 4.0;
//          LineString [lon, lat], properties jarjestys = Strahler, valuma_km2). Kynä piirtää vain pääuomat: kaksi suurinta
//          Strahler-luokkaa ja niistä enintään JokiaEnintaan suurinta valumaltaan. Vain video (saapuminen 27.9.2026: ei jokia;
//          saapumisen nostot karttavaloista poistuivat samalla).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public static class ElavaAineisto
    {
        /// <summary>Jokiaineiston hakemisto ämpärissä (Sisalto.Juuri + tämä + ISO3 + ".geojson").</summary>
        public const string JoetKansio = "julisteet/pallo/vektorit/joet-2026-09-26b/";
        public const string JoetLahde = "GEOGLOWS v2 (TDX-Hydro), CC BY-SA 4.0";
        public const int JokiaEnintaan = 36;

        static double Luku(object x) =>
            x is double d ? d : x is long l ? l : x is int i ? i
            : x is string s && double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var v) ? v : double.NaN;

        static IEnumerable<LatLonLista> Viivat(Dictionary<string, object> geometria)
        {
            if (geometria == null) yield break;
            string tyyppi = geometria.TryGetValue("type", out var t) ? t as string : null;
            if (!geometria.TryGetValue("coordinates", out var k) || !(k is List<object> koord)) yield break;
            if (tyyppi == "LineString") yield return Viiva(koord);
            else if (tyyppi == "MultiLineString")
                foreach (var osa in koord) if (osa is List<object> o) yield return Viiva(o);
        }

        sealed class LatLonLista { public readonly List<double> LatLon = new List<double>(); }

        static LatLonLista Viiva(List<object> pisteet)
        {
            var l = new LatLonLista();
            foreach (var p in pisteet)
            {
                if (!(p is List<object> q) || q.Count < 2) continue;
                double lon = Luku(q[0]), lat = Luku(q[1]);
                if (double.IsNaN(lon) || double.IsNaN(lat)) continue;
                l.LatLon.Add(lat);
                l.LatLon.Add(lon);
            }
            return l;
        }

        /// <summary>Pääuomat GeoJSONista: kaksi suurinta Strahler-luokkaa, suurin valuma ensin, enintään <paramref name="enintaan"/>.</summary>
        public static List<ElavaJoki> JoetGeoJsonista(string json, int enintaan = JokiaEnintaan)
        {
            var tulos = new List<ElavaJoki>();
            if (!(MiniJson.Jasenna(json) is Dictionary<string, object> juuri) || !juuri.TryGetValue("features", out var f) || !(f is List<object> piirteet))
                return tulos;
            var ehdokkaat = new List<(int Jarjestys, double Valuma, double[] Pisteet)>();
            foreach (var o in piirteet)
            {
                if (!(o is Dictionary<string, object> piirre)) continue;
                var ominaisuudet = piirre.TryGetValue("properties", out var pr) ? pr as Dictionary<string, object> : null;
                double j = ominaisuudet != null && ominaisuudet.TryGetValue("jarjestys", out var jj) ? Luku(jj) : double.NaN;
                double valuma = ominaisuudet != null && ominaisuudet.TryGetValue("valuma_km2", out var vv) ? Luku(vv) : 0;
                foreach (var v in Viivat(piirre.TryGetValue("geometry", out var g) ? g as Dictionary<string, object> : null))
                    if (v.LatLon.Count >= 4) ehdokkaat.Add((double.IsNaN(j) ? 0 : (int)j, double.IsNaN(valuma) ? 0 : valuma, v.LatLon.ToArray()));
            }
            if (ehdokkaat.Count == 0) return tulos;
            int suurin = ehdokkaat.Max(e => e.Jarjestys);
            int k = 0;
            foreach (var e in ehdokkaat.Where(e => e.Jarjestys >= suurin - 1).OrderByDescending(e => e.Jarjestys).ThenByDescending(e => e.Valuma).Take(enintaan))
                tulos.Add(new ElavaJoki($"uoma {++k} (Strahler {e.Jarjestys}, {e.Valuma:0} km²)", e.Pisteet));
            return tulos;
        }
    }
}
