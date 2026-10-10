// ELÄVÄ KAUPUNKI: KATULIIKENNE (Linssiseppä 9.10.2026; suunnitelma B4, PT): autot pääkaduilla ja raitiovaunut kiskoilla
// (tyokalut/elava_kaupunki.py: OSM-pätkät ketjutettuina, "kadut" ja "raitiotiet" paketissa). Korkeus annetaan funktiona
// (Unity: oma korkeusmalli, ei Googlen laattoja, Map Tiles C4): reitin pisteiden maa, puuttuvat naapureista. Autot molempiin
// suuntiin (kaistasiirto Unityssä), yksisuuntaisilla kaduilla vain menosuuntaan; päissä kääntö lyhyellä tauolla (Unity piilottaa
// kulkijan reitin päissä). Määrä rajasta (keskustaa lähimmät reitit ensin). Puhdas C#: ElavaKaupunkiTestit.
// 10.10. (PT, juna 175): tien korkeus maanpinnasta (DTM) ja pinnasta (DSM) yhdessä (TieKorkeus): puiden kohdalla pinta on latvoissa,
// siltojen kohdalla maanpinnassa ei ole siltaa (IGN MNT: auto putoaisi Seineen ~9 m) → kärki saa sen, joka jatkaa tietä naapureista.
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

        /// <summary>Kärjet, joissa pinta ja maa eroavat alle tämän, ovat varmaa tietä (vertailukohta).</summary>
        public const double SamaM = 1.5;
        /// <summary>Kauempana tien jatkeesta kuin tämä kumpikin → tien jatke (molemmin puolin tunnettu).</summary>
        public const double JatkeM = 3.0;

        /// <summary>Paketista; maa(x, z) = maan korkeus paikallisessa ENU:ssa (NaN = ei tiedossa); raja = autojen yläraja;
        /// pinta(x, z) = pintamalli (DSM) siltojen tunnistukseen (null = vain maa).</summary>
        public static KatuLiikenne Lue(string json, Func<double, double, double> maa, int autoja, int siemen, Func<double, double, double> pinta = null)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var k = new KatuLiikenne();
            Lisaa(k.Autot, MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "kadut")), maa, pinta, autoja, AutoValiM, AutoNopeus, siemen);
            Lisaa(k.Raitiot, MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "raitiotiet")), maa, pinta, Math.Max(4, autoja / 12), RaitioValiM, RaitioNopeus, siemen + 1);
            return k;
        }

        /// <summary>Tien korkeus kärjittäin maasta (DTM) ja pinnasta (DSM): kun ne eroavat, valitaan se, joka on lähempänä tien
        /// jatketta (lineaarinen väli lähimmistä varmoista kärjistä matkan mukaan): puu = pinta piikkinä → maa, silta = maa kuopassa
        /// → pinta. Jos kumpikin on yli JatkeM:n päässä jatkeesta (lamppu sillalla), jatke itse. Ei varmaa kärkeä = maa.</summary>
        public static List<double> TieKorkeus(IList<double> maa, IList<double> pinta, IList<double> matka)
        {
            int n = maa.Count;
            var y = new List<double>(maa);
            bool Varma(int i) => !double.IsNaN(maa[i]) && !double.IsNaN(pinta[i]) && Math.Abs(pinta[i] - maa[i]) < SamaM;
            for (int i = 0; i < n; i++)
            {
                if (double.IsNaN(maa[i]) || double.IsNaN(pinta[i]) || Varma(i)) continue;
                int a = i - 1; while (a >= 0 && !Varma(a)) a--;
                int b = i + 1; while (b < n && !Varma(b)) b++;
                double jatke;
                if (a >= 0 && b < n) { double t = (matka[i] - matka[a]) / Math.Max(1e-6, matka[b] - matka[a]); jatke = maa[a] + t * (maa[b] - maa[a]); }
                else if (a >= 0) jatke = maa[a];
                else if (b < n) jatke = maa[b];
                else continue;
                double em = Math.Abs(maa[i] - jatke), ep = Math.Abs(pinta[i] - jatke);
                y[i] = Math.Min(em, ep) > JatkeM && a >= 0 && b < n ? jatke : ep < em ? pinta[i] : maa[i];
            }
            return y;
        }

        static void Tayta(List<double> y)
        {
            // Puuttuvat korkeudet lähimmästä tunnetusta (edestä ja takaa).
            double ed = double.NaN;
            for (int i = 0; i < y.Count; i++) { if (double.IsNaN(y[i])) y[i] = ed; else ed = y[i]; }
            ed = double.NaN;
            for (int i = y.Count - 1; i >= 0; i--) { if (double.IsNaN(y[i])) y[i] = ed; else ed = y[i]; }
        }

        static void Lisaa(ReittiLiike l, IList<object> viivat, Func<double, double, double> maa, Func<double, double, double> pinta, int raja, double vali, double nopeus, int siemen)
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
                var matka = new List<double> { 0 };
                for (int i = 1; i < p.Count; i++) matka.Add(matka[i - 1] + Math.Sqrt(Math.Pow(p[i].Item1 - p[i - 1].Item1, 2) + Math.Pow(p[i].Item2 - p[i - 1].Item2, 2)));
                if (pinta != null) y = TieKorkeus(y, p.Select(q => pinta(q.Item1, q.Item2)).ToList(), matka);
                Tayta(y);
                double pit = matka[matka.Count - 1];
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
