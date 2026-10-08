// ELÄVÄ KAUPUNKI: KATULIIKENNE (Linssiseppä 9.10.2026; suunnitelma B4, PT): autot pääkaduilla ja raitiovaunut kiskoilla
// (tyokalut/elava_kaupunki.py: OSM-pätkät ketjutettuina, "kadut" ja "raitiotiet" paketissa). Korkeus annetaan funktiona
// (Unity: oma korkeusmalli, ei Googlen laattoja, Map Tiles C4): reitin pisteiden maa, puuttuvat naapureista. Autot molempiin
// suuntiin (kaistasiirto Unityssä), yksisuuntaisilla kaduilla vain menosuuntaan; päissä kääntö lyhyellä tauolla (Unity piilottaa
// kulkijan reitin päissä). Määrä rajasta (keskustaa lähimmät reitit ensin). Puhdas C#: ElavaKaupunkiTestit.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public sealed class KatuLiikenne
    {
        public const double AutoNopeus = 9, AutoValiM = 220, RaitioNopeus = 7, RaitioValiM = 1400, PaassaTaukoS = 1.0, PiiloPaassaM = 18;
        public readonly ReittiLiike Autot = new ReittiLiike { PaassaTaukoS = PaassaTaukoS }, Raitiot = new ReittiLiike { PaassaTaukoS = 6 };

        /// <summary>Paketista; maa(x, z) = maan korkeus paikallisessa ENU:ssa (NaN = ei tiedossa); raja = autojen yläraja.</summary>
        public static KatuLiikenne Lue(string json, Func<double, double, double> maa, int autoja, int siemen)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var k = new KatuLiikenne();
            Lisaa(k.Autot, MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "kadut")), maa, autoja, AutoValiM, AutoNopeus, siemen);
            Lisaa(k.Raitiot, MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "raitiotiet")), maa, Math.Max(4, autoja / 12), RaitioValiM, RaitioNopeus, siemen + 1);
            return k;
        }

        static void Lisaa(ReittiLiike l, IList<object> viivat, Func<double, double, double> maa, int raja, double vali, double nopeus, int siemen)
        {
            var ehdokkaat = new List<(List<(double, double)> P, List<double> Y, bool Yksi, double Lahin, double Pit)>();
            foreach (var o in viivat)
            {
                var v = MiniJson.Objekti(o);
                var p = new List<(double, double)>();
                foreach (var q in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(v, "p")))
                {
                    var a = MiniJson.TaulukkoTaiTyhja(q);
                    if (a.Count >= 2) p.Add((Convert.ToDouble(a[0]), Convert.ToDouble(a[1])));
                }
                if (p.Count < 2) continue;
                var y = p.Select(q => maa(q.Item1, q.Item2)).ToList();
                if (y.All(double.IsNaN)) continue;
                // Puuttuvat korkeudet lähimmästä tunnetusta (edestä ja takaa).
                double ed = double.NaN;
                for (int i = 0; i < y.Count; i++) { if (double.IsNaN(y[i])) y[i] = ed; else ed = y[i]; }
                ed = double.NaN;
                for (int i = y.Count - 1; i >= 0; i--) { if (double.IsNaN(y[i])) y[i] = ed; else ed = y[i]; }
                double pit = 0; for (int i = 1; i < p.Count; i++) pit += Math.Sqrt(Math.Pow(p[i].Item1 - p[i - 1].Item1, 2) + Math.Pow(p[i].Item2 - p[i - 1].Item2, 2));
                bool yksi = MiniJson.Luku(v, "yksisuunta") is double ys && ys != 0;
                ehdokkaat.Add((p, y, yksi, p.Min(q => Math.Sqrt(q.Item1 * q.Item1 + q.Item2 * q.Item2)), pit));
            }
            int yht = 0;
            foreach (var e in ehdokkaat.OrderBy(e => e.Lahin))
            {
                if (yht >= raja) break;
                int n = Math.Max(1, Math.Min(raja - yht, (int)Math.Round(e.Pit / vali)));
                var r = new Reitti(e.P, false, e.Y) { Yksisuunta = e.Yksi };
                l.Lisaa(r, e.Pit / n, nopeus, siemen + l.Reitit.Count * 7919);
                yht += n;
            }
        }

        /// <summary>Kulkija piilossa reitin päissä (kääntö tai yksisuuntaisen paluu alkuun ei näy).</summary>
        public static bool Piilossa(ReittiLiike l, ReittiLiike.Kulkija k)
        {
            var r = l.Reitit[k.Reitti];
            return k.Tauko > 0 || k.S < PiiloPaassaM || k.S > r.Pituus - PiiloPaassaM;
        }
    }
}
