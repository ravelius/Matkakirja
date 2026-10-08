// HISTORIAMOOTTORI: ÄÄNEKKYYS PINNOITTAIN JA SEINÄSÄÄNTÖ (Siirtoseppä 7.10.2026; pelattavuusmalli-olavinlinna.md kohta 2.2).
// Kuulosäde = matka, jolta hahmo kuulee askeleen. Pinta osan oletuksesta (osat.json "pinta") tai poikkeusmerkistä pinta:<laji>-N
// (paikka, koko [x, y, z]). Seinät: ääni kuuluu omassa osassa täysin, naapuriosaan (osat.json "naapurit") puolella säteellä,
// muualle ei. Koordinaatit glTF-muodossa (x itä, y ylös, z etelä) kuten KavelyData.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public static class Askelaani
    {
        /// <summary>Pinta → (hiivintä, kävely, juoksu) metreinä.</summary>
        public static readonly Dictionary<string, (double Hiivinta, double Kavely, double Juoksu)> Pinnat = new Dictionary<string, (double, double, double)>(StringComparer.Ordinal)
        {
            ["kivi"] = (0, 2.5, 6), ["porras"] = (0, 2.5, 6), ["puu"] = (1.0, 3.5, 8), ["olki"] = (0, 1.5, 4), ["sora"] = (0.5, 3.0, 7), ["vesi"] = (2.0, 5.0, 10),
        };

        public static double Sade(string pinta, Liiketapa tapa)
        {
            if (pinta == null || !Pinnat.TryGetValue(pinta, out var p)) p = Pinnat["kivi"];
            return tapa == Liiketapa.Hiipiminen ? p.Hiivinta : tapa == Liiketapa.Juoksu ? p.Juoksu : p.Kavely;
        }

        /// <summary>Pelaajan oma askel (pelattavuusmalli 2.2, Askelääni-sarake): äänitteen tunnukset etusijajärjestyksessä (pinnan oma,
        /// varana kivi) ja voimakkuus 0…1. Hiivintä kuuluu itselle hiljaa, vaikka vartija ei sitä kuule; äänekäs pinta on kovempi.</summary>
        public static (string[] Tunnukset, float Voimakkuus) OmaAskel(string pinta, Liiketapa tapa, double markyys = 0)
        {
            if (pinta == null || !Pinnat.ContainsKey(pinta)) pinta = "kivi";
            var tunnukset = pinta == "kivi" ? new[] { "askel-kivi" } : pinta == "porras" ? new[] { "askel-porras-1", "askel-kivi" } : new[] { "askel-" + pinta, "askel-kivi" };
            // Märkä pinta (LR v45f, Pelikoodarin aanet-saa-v2, 8.10.): märkä äänite edelle, kuiva varana. Laiturin kansi (puu, märkyys ≥ 0,85)
            // narisee märkänä omalla äänitteellään.
            if (markyys >= MarkaRaja)
            {
                string marka = pinta == "puu" ? (markyys >= 0.85 ? "askel-laituri-marka" : "askel-puu-marka") : pinta == "vesi" || pinta == "olki" ? null : "askel-kivi-marka";
                if (marka != null)
                {
                    var t = new string[tunnukset.Length + (pinta == "puu" && marka == "askel-laituri-marka" ? 2 : 1)];
                    int i = 0; t[i++] = marka; if (marka == "askel-laituri-marka") t[i++] = "askel-puu-marka";
                    foreach (var x in tunnukset) t[i++] = x;
                    tunnukset = t;
                }
            }
            float perus = tapa == Liiketapa.Hiipiminen ? 0.2f : tapa == Liiketapa.Juoksu ? 0.8f : 0.45f;
            float pintaK = (float)Math.Min(1.25, Math.Max(0.7, 0.45 + 0.17 * Pinnat[pinta].Kavely));   // olki 0,7 · kivi 0,88 · puu 1,05 · vesi 1,25
            return (tunnukset, Math.Min(1f, perus * pintaK));
        }

        /// <summary>Märkä askel tästä märkyydestä alkaen (ulkoalue 0,75, piha 0,7; porttikäytävä 0,25 on kuiva).</summary>
        public const double MarkaRaja = 0.5;

        /// <summary>Märkyys pisteessä: pinta-merkin markyys (kierretty laatikko), muuten osan markyys, muuten 0.</summary>
        public static double Markyys(KavelyData d, double x, double y, double z)
        {
            if (d == null) return 0;
            foreach (var m in d.Lajia("pinta"))
            {
                var k = m.KokoV ?? new[] { 1.0, 1.0, 1.0 };
                double dx = x - m.X, dz = z - m.Z, c = Math.Cos(m.KiertoY ?? 0), s = Math.Sin(m.KiertoY ?? 0);
                double lx = c * dx - s * dz, lz = s * dx + c * dz;
                if (Math.Abs(lx) <= k[0] / 2 && Math.Abs(y - m.Y) <= Math.Max(0.5, k[1] / 2) && Math.Abs(lz) <= k[2] / 2 && m.Markyys > 0) return m.Markyys;
            }
            string osa = Osa(d, x, y, z);
            return osa != null && d.Osat.TryGetValue(osa, out var o) ? o.Markyys : 0;
        }

        /// <summary>Osa, jonka rajojen sisällä piste on (pienin tilavuus voittaa; 0,3 m vara vaakatasossa, 1 m pystyssä); null = ei mikään.</summary>
        public static string Osa(KavelyData d, double x, double y, double z)
        {
            string paras = null; double pv = double.MaxValue;
            if (d == null) return null;
            foreach (var o in d.Osat.Values)
            {
                if (x < o.RajatMin[0] - 0.3 || x > o.RajatMax[0] + 0.3 || z < o.RajatMin[2] - 0.3 || z > o.RajatMax[2] + 0.3 || y < o.RajatMin[1] - 1 || y > o.RajatMax[1] + 1) continue;
                double v = (o.RajatMax[0] - o.RajatMin[0]) * (o.RajatMax[1] - o.RajatMin[1]) * (o.RajatMax[2] - o.RajatMin[2]);
                if (v < pv) { pv = v; paras = o.Id; }
            }
            return paras;
        }

        /// <summary>Pinta pisteessä: poikkeusmerkki pinta:&lt;laji&gt;-N (laatikko), muuten osan oletus, muuten kivi.</summary>
        public static string Pinta(KavelyData d, double x, double y, double z)
        {
            if (d == null) return "kivi";
            foreach (var m in d.Lajia("pinta"))
            {
                var k = m.KokoV ?? new[] { 1.0, 1.0, 1.0 };
                // Kierretty laatikko (kierto_y, glTF y-akselin ympäri; LS2 8.10.: laiturin puu-1 41°) kuten KavelyPiilo.Sisalla.
                double dx = x - m.X, dz = z - m.Z, c = Math.Cos(m.KiertoY ?? 0), s = Math.Sin(m.KiertoY ?? 0);
                double lx = c * dx - s * dz, lz = s * dx + c * dz;
                if (Math.Abs(lx) <= k[0] / 2 && Math.Abs(y - m.Y) <= Math.Max(0.5, k[1] / 2) && Math.Abs(lz) <= k[2] / 2)
                {
                    int v = m.Tunnus.LastIndexOf('-');
                    return v > 0 ? m.Tunnus.Substring(0, v) : m.Tunnus;
                }
            }
            string osa = Osa(d, x, y, z);
            return osa != null && d.Osat.TryGetValue(osa, out var o) && !string.IsNullOrEmpty(o.Pinta) ? o.Pinta : "kivi";
        }

        /// <summary>Seinäsääntö: tehollinen kuulosäde kuulijan osassa (sama osa = täysi, naapuri = puolet, muu = 0; tuntematon osa = täysi).</summary>
        public static double Kuuluvuus(KavelyData d, double sade, string lahdeOsa, string kuulijaOsa)
        {
            if (lahdeOsa == null || kuulijaOsa == null || lahdeOsa == kuulijaOsa || d == null) return sade;
            if (d.Osat.TryGetValue(lahdeOsa, out var a) && a.Naapurit.Contains(kuulijaOsa) || d.Osat.TryGetValue(kuulijaOsa, out var b) && b.Naapurit.Contains(lahdeOsa)) return sade / 2;
            return 0;
        }
    }
}
