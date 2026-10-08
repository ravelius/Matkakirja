// ELÄVÄ KAUPUNKI: VESILIIKENNE JA LOKIT (Linssiseppä 8.10.2026; suunnitelma B1 + B2). Lukee tyokalut/elava_kaupunki.py:n paketin
// (Resources/Elava/elava-<kohde>.json: lautta- ja vesiväyläreitit tihennettyinä, korkeus omasta vesipinnasta, lokkiparvien paikat)
// ja jakaa veneet reiteille määrärajan mukaan: keskustaa lähimmät reitit ensin, tyyppikohtainen nopeus ja väli. Parvet: Parvi-
// olio jokaiselle paikalle. Koordinaatit paketin origossa (x itä, z pohjoinen, y korkeus). Puhdas C#: ElavaKaupunkiTestit.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public sealed class VesiLiikenne
    {
        /// <summary>Tyyppi → (nopeus m/s, väli m): lautat vuorovälein, pikkuveneet tiheämmin.</summary>
        public static readonly Dictionary<string, (double Nopeus, double ValiM)> Parametrit = new Dictionary<string, (double, double)>
        {
            ["lautta"] = (4.5, 700), ["pendelbat"] = (6.5, 2500), ["saaristolaiva"] = (6.5, 3500), ["hoyrylaiva"] = (5.0, 6000),
            ["kiertoajelu"] = (3.5, 900), ["autolautta"] = (4.0, 2500), ["pikkulautta"] = (3.5, 1500), ["vene"] = (4.0, 450),
            ["jokilaiva"] = (3.5, 1100),
        };

        /// <summary>Parven paikka: lokit vesillä (Vesi = pinnan korkeus), kyyhkyt aukioilla (Laji "kyyhky", maa ajonaikana Lat/Lon:sta).</summary>
        public sealed class ParviPaikka { public string Nimi, Laji; public double X, Z, Vesi, Alue, Lat, Lon; public int Maara; public bool Kyyhky => Laji == "kyyhky"; }

        public readonly ReittiLiike Liike = new ReittiLiike();
        /// <summary>Reitin (Liike.Reitit-indeksi) tyyppi VeneMallit.Tyypit-indeksinä.</summary>
        public readonly List<int> ReitinTyyppi = new List<int>();
        public readonly List<ParviPaikka> Parvet = new List<ParviPaikka>();
        public double Lat, Lon; public string Kohde, Krediitti;
        public int Reitteja { get; private set; }

        public int Tyyppi(ReittiLiike.Kulkija k) => ReitinTyyppi[k.Reitti];

        /// <summary>Paketti jsonista; enintaan = veneiden yläraja (laatutaso), siemen toistettavaan sijoitteluun.</summary>
        public static VesiLiikenne Lue(string json, int enintaan, int siemen)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var v = new VesiLiikenne { Kohde = MiniJson.Teksti(j, "kohde"), Krediitti = MiniJson.Teksti(j, "krediitti") };
            var o = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "origo"));
            v.Lat = MiniJson.Luku(o, "lat") ?? 0; v.Lon = MiniJson.Luku(o, "lon") ?? 0;
            var ehdokkaat = new List<(int Tyyppi, List<(double x, double z)> P, List<double> Y, double Lahin, double Pituus)>();
            foreach (var ro in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "reitit")))
            {
                var r = MiniJson.Objekti(ro);
                int t = Array.IndexOf(VeneMallit.Tyypit, MiniJson.Teksti(r, "tyyppi"));
                if (t < 0) continue;
                var p = new List<(double, double)>(); var y = new List<double>();
                foreach (var q in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(r, "p")))
                {
                    var a = MiniJson.TaulukkoTaiTyhja(q);
                    if (a.Count < 3) continue;
                    p.Add((Convert.ToDouble(a[0]), Convert.ToDouble(a[1]))); y.Add(a[2] == null ? 0 : Convert.ToDouble(a[2]));
                }
                if (p.Count < 2) continue;
                double lahin = p.Min(q => Math.Sqrt(q.Item1 * q.Item1 + q.Item2 * q.Item2)), pit = 0;
                for (int i = 1; i < p.Count; i++) pit += Math.Sqrt(Math.Pow(p[i].Item1 - p[i - 1].Item1, 2) + Math.Pow(p[i].Item2 - p[i - 1].Item2, 2));
                ehdokkaat.Add((t, p, y, lahin, pit));
            }
            // Määräraja: keskustaa lähimmät reitit ensin; jokaiselle reitille vähintään yksi vene, jos mahtuu.
            int yht = 0;
            foreach (var e in ehdokkaat.OrderBy(e => e.Lahin))
            {
                if (yht >= enintaan) break;
                var (nopeus, vali) = Parametrit[VeneMallit.Tyypit[e.Tyyppi]];
                int n = Math.Max(1, (int)Math.Round(e.Pituus / vali));
                n = Math.Min(n, enintaan - yht);
                v.Liike.Lisaa(new Reitti(e.P, false, e.Y), e.Pituus / n, nopeus, siemen + v.ReitinTyyppi.Count * 7919);
                v.ReitinTyyppi.Add(e.Tyyppi);
                yht += n;
            }
            v.Reitteja = v.ReitinTyyppi.Count;
            foreach (var po in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "parvet")))
            {
                var p = MiniJson.Objekti(po);
                v.Parvet.Add(new ParviPaikka { Nimi = MiniJson.Teksti(p, "nimi"), Laji = MiniJson.Teksti(p, "laji") ?? "lokki", Lat = MiniJson.Luku(p, "lat") ?? double.NaN,
                    Lon = MiniJson.Luku(p, "lon") ?? double.NaN, X = MiniJson.Luku(p, "x") ?? 0, Z = MiniJson.Luku(p, "z") ?? 0,
                    Vesi = MiniJson.Luku(p, "vesi") ?? 0, Alue = MiniJson.Luku(p, "alue") ?? 200, Maara = (int)(MiniJson.Luku(p, "maara") ?? 8) });
            }
            return v;
        }
    }
}
