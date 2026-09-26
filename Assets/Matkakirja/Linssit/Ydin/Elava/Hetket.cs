// ELÄVÄ KARTTA, kohta 5: ELÄVÄT HETKET (Linssiseppä 26.9.2026; suunnitelma §5, Raamattu ELÄVÄ KARTTA kohta 5).
// Kartta ei liiku jatkuvasti: 2–5 minuutin välein yksi 3 s:n hetki kartan näkyvällä alueella, sitten lepo (lepopiirto
// herää vain hetken ajaksi). Lajit: laiva lipuu 1873-laivareittiä, juna kulkee 1873-radalla savu perässään, lintuparvi
// ylittää maakunnan ja sadekuuro kulkee maakunnan yli länsituulessa. Hetki ei osu kortin, luennan eikä linssin päälle:
// Unity-puoli kertoo vapauden, ja ajastin lykkää. Puhdas C#: ajastus, valinta ja liikeradat, ajat sekunteina.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Elava
{
    public enum HetkenLaji { Laiva, Juna, Parvi, Sade }

    /// <summary>Vuoden 1873 reitti (sisältöpaketin kokoelma reitit1873, skeema 1.46): laivalinja tai rautatie.</summary>
    public sealed class Reitti1873
    {
        public string Id, Nimi;
        public bool Laiva;
        public readonly List<LatLon[]> Viivat = new List<LatLon[]>();
        public double MinLat = 90, MaxLat = -90, MinLon = 180, MaxLon = -180;

        internal void Rajaa()
        {
            foreach (var v in Viivat)
                foreach (var p in v)
                {
                    MinLat = Math.Min(MinLat, p.Lat); MaxLat = Math.Max(MaxLat, p.Lat);
                    MinLon = Math.Min(MinLon, p.Lon); MaxLon = Math.Max(MaxLon, p.Lon);
                }
        }

        /// <summary>Kokoelman jäsennys: juuren "alkiot" [{ id, laji, nimi, viivat [[[lon, lat], …]] }].</summary>
        public static List<Reitti1873> Jasenna(string json)
        {
            var tulos = new List<Reitti1873>();
            if (!(MiniJson.Jasenna(json) is Dictionary<string, object> juuri) || !juuri.TryGetValue("alkiot", out var a) || !(a is List<object> alkiot))
                return tulos;
            foreach (var o in alkiot)
            {
                if (!(o is Dictionary<string, object> d) || !d.TryGetValue("viivat", out var vv) || !(vv is List<object> viivat)) continue;
                var r = new Reitti1873
                {
                    Id = d.TryGetValue("id", out var i) ? i as string : null,
                    Nimi = d.TryGetValue("nimi", out var n) ? n as string : null,
                    Laiva = d.TryGetValue("laji", out var l) && l as string == "laiva",
                };
                foreach (var v in viivat)
                {
                    if (!(v is List<object> pisteet)) continue;
                    var viiva = new List<LatLon>(pisteet.Count);
                    foreach (var p in pisteet)
                        if (p is List<object> q && q.Count >= 2) viiva.Add(new LatLon(Luku(q[1]), Luku(q[0])));
                    if (viiva.Count >= 2) r.Viivat.Add(viiva.ToArray());
                }
                if (r.Viivat.Count == 0) continue;
                r.Rajaa();
                tulos.Add(r);
            }
            return tulos;
        }

        static double Luku(object o) => o switch
        {
            double d => d,
            long l => l,
            int i => i,
            string s when double.TryParse(s, NumberStyles.Float, CultureInfo.InvariantCulture, out var v) => v,
            _ => double.NaN,
        };
    }

    /// <summary>Yksi hetki: laji, liikerata (isoympyrää pitkin), pehmeä sisääntulo ja häivytys.</summary>
    public sealed class Hetki
    {
        public const double Kesto = 3.0, Sisaan = 0.5, Ulos = 0.7;

        /// <summary>Radan pituus näkymän halkaisijasta: liike näkyy, mutta ei hätäile (laiva lipuu, parvi ylittää).</summary>
        public static double RadanOsuus(HetkenLaji laji) => laji switch
        {
            HetkenLaji.Laiva => 0.05,
            HetkenLaji.Juna => 0.08,
            HetkenLaji.Parvi => 0.3,
            _ => 0.06,
        };

        public readonly HetkenLaji Laji;
        public readonly Piirtoviiva Rata;
        public readonly string Kohde;
        public readonly int Siemen;

        public Hetki(HetkenLaji laji, LatLon[] rata, string kohde, int siemen)
        {
            Laji = laji;
            Rata = new Piirtoviiva(kohde, rata);
            Kohde = kohde;
            Siemen = siemen;
        }

        public bool Kaynnissa(double t) => t >= 0 && t < Kesto;

        public double Peitto(double t) =>
            t <= 0 || t >= Kesto ? 0 : Math.Min(ElavaKayrat.Pehmea(t / Sisaan), ElavaKayrat.Pehmea((Kesto - t) / Ulos));

        /// <summary>Kuljettu osuus radasta: tasainen liike (laiva lipuu, parvi lentää).</summary>
        public double Osuus(double t) => ElavaKayrat.Rajaa(t / Kesto);

        public LatLon Paikka(double t) => Rata.Piste(Osuus(t));

        /// <summary>Kulkusuunta asteina pohjoisesta myötäpäivään.</summary>
        public double Suunta(double t)
        {
            double u = Osuus(t);
            return HetkenGeometria.Suuntima(Rata.Piste(Math.Max(0, u - 0.02)), Rata.Piste(Math.Min(1, u + 0.02)));
        }
    }

    public static class HetkenGeometria
    {
        const double R = Math.PI / 180;

        public static double Suuntima(LatLon a, LatLon b)
        {
            double f1 = a.Lat * R, f2 = b.Lat * R, dl = (b.Lon - a.Lon) * R;
            double y = Math.Sin(dl) * Math.Cos(f2), x = Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl);
            return (Math.Atan2(y, x) / R + 360) % 360;
        }

        /// <summary>Piste, johon päädytään kulkemalla p:stä suuntimaan kulma asteen verran isoympyrää pitkin.</summary>
        public static LatLon Kohde(LatLon p, double suuntima, double kulma)
        {
            double f1 = p.Lat * R, l1 = p.Lon * R, t = suuntima * R, d = kulma * R;
            double f2 = Math.Asin(Math.Sin(f1) * Math.Cos(d) + Math.Cos(f1) * Math.Sin(d) * Math.Cos(t));
            double l2 = l1 + Math.Atan2(Math.Sin(t) * Math.Sin(d) * Math.Cos(f1), Math.Cos(d) - Math.Sin(f1) * Math.Sin(f2));
            return new LatLon(f2 / R, ((l2 / R + 540) % 360) - 180);
        }
    }

    /// <summary>Hetkien ajastus: ensimmäinen 45–120 s:n kuluttua, sitten 2–5 min välein. Kun kartta ei ole vapaa
    /// (kortti, luenta, linssi, kameran liike), hetki lykkääntyy LykkaysS:n päähän eikä jonoudu perään.</summary>
    public sealed class HetkiAjastin
    {
        public const double EnsimmainenMinS = 45, ValiMinS = 120, ValiMaxS = 300, LykkaysS = 20;
        readonly Random satunnainen;
        public double Seuraava { get; private set; }

        public HetkiAjastin(int siemen, double nyt)
        {
            satunnainen = new Random(siemen);
            Seuraava = nyt + EnsimmainenMinS + satunnainen.NextDouble() * (ValiMinS - EnsimmainenMinS);
        }

        /// <summary>true = hetki alkaa nyt (seuraava ajastetaan samalla).</summary>
        public bool Tarkista(double nyt, bool vapaa)
        {
            if (nyt < Seuraava) return false;
            if (!vapaa)
            {
                Seuraava = nyt + LykkaysS;
                return false;
            }
            Seuraava = nyt + ValiMinS + satunnainen.NextDouble() * (ValiMaxS - ValiMinS);
            return true;
        }
    }

    /// <summary>Hetken valinta näkyvältä alueelta: laji arvotaan niistä, joille on näkyvä kohde (laiva vain, jos
    /// laivareitti näkyy), eikä sama laji toistu peräkkäin, jos muita on.</summary>
    public static class HetkenValinta
    {
        /// <summary>Kohteen pitää olla näin syvällä näkymässä (osuus säteestä), jotta koko hetki näkyy.</summary>
        public const double NakyvaOsuus = 0.7;

        public static Hetki Valitse(Random satunnainen, LatLon keskus, double sadeKm, IReadOnlyList<Reitti1873> reitit,
            IReadOnlyList<ElavaMaakunta> maakunnat, HetkenLaji? edellinen = null, HetkenLaji? pakota = null)
        {
            double rajaAst = NakyvaOsuus * sadeKm / ElavaKohtaus.KmAsteella;
            var laivat = Pisteet(reitit, true, keskus, rajaAst);
            var junat = Pisteet(reitit, false, keskus, rajaAst);
            var alueet = maakunnat?.Where(m => Kameramatikka.KulmaAsteina(keskus, m.Keskus) < rajaAst).ToList() ?? new List<ElavaMaakunta>();
            var lajit = new List<HetkenLaji>();
            if (laivat.Count > 0) lajit.Add(HetkenLaji.Laiva);
            if (junat.Count > 0) lajit.Add(HetkenLaji.Juna);
            lajit.Add(HetkenLaji.Parvi);
            lajit.Add(HetkenLaji.Sade);
            HetkenLaji laji;
            if (pakota.HasValue && lajit.Contains(pakota.Value)) laji = pakota.Value;
            else if (pakota.HasValue) return null;
            else
            {
                var muut = lajit.Where(l => l != edellinen).ToList();
                var valinta = muut.Count > 0 ? muut : lajit;
                laji = valinta[satunnainen.Next(valinta.Count)];
            }
            double pituusAst = Hetki.RadanOsuus(laji) * 2 * sadeKm / ElavaKohtaus.KmAsteella;
            int siemen = satunnainen.Next();
            switch (laji)
            {
                case HetkenLaji.Laiva:
                case HetkenLaji.Juna:
                {
                    var lista = laji == HetkenLaji.Laiva ? laivat : junat;
                    // Arvotaan näkyvä piste (pitkät näkyvät reitit todennäköisempiä) ja kuljetaan viivaa pitkin.
                    for (int yritys = 0; yritys < 8; yritys++)
                    {
                        var (reitti, viiva, indeksi) = lista[satunnainen.Next(lista.Count)];
                        var rata = ViivaaPitkin(viiva, indeksi, pituusAst, satunnainen.Next(2) == 0);
                        if (rata != null) return new Hetki(laji, rata, reitti.Id ?? reitti.Nimi, siemen);
                    }
                    return null;
                }
                default:
                {
                    // Parvi ylittää maakunnan (satunnainen suunta), sade kulkee länsituulessa (suunta 60–120°).
                    var alue = alueet.Count > 0 ? alueet[satunnainen.Next(alueet.Count)] : null;
                    var c = alue?.Keskus ?? keskus;
                    double suunta = laji == HetkenLaji.Parvi ? satunnainen.NextDouble() * 360 : 60 + satunnainen.NextDouble() * 60;
                    var alku = HetkenGeometria.Kohde(c, (suunta + 180) % 360, pituusAst / 2);
                    const int n = 12;
                    var rata = new LatLon[n + 1];
                    for (int i = 0; i <= n; i++) rata[i] = HetkenGeometria.Kohde(alku, suunta, pituusAst * i / n);
                    return new Hetki(laji, rata, alue?.Id ?? "näkymä", siemen);
                }
            }
        }

        /// <summary>Reittien pisteet näkyvällä alueella (rajaus ensin laatikolla).</summary>
        static List<(Reitti1873, LatLon[], int)> Pisteet(IReadOnlyList<Reitti1873> reitit, bool laiva, LatLon keskus, double rajaAst)
        {
            var tulos = new List<(Reitti1873, LatLon[], int)>();
            if (reitit == null) return tulos;
            double lonRaja = rajaAst / Math.Max(0.05, Math.Cos(keskus.Lat * Math.PI / 180));
            foreach (var r in reitit)
            {
                if (r.Laiva != laiva) continue;
                if (r.MaxLat < keskus.Lat - rajaAst || r.MinLat > keskus.Lat + rajaAst) continue;
                if (lonRaja < 180 && (r.MaxLon < keskus.Lon - lonRaja || r.MinLon > keskus.Lon + lonRaja)) continue;
                foreach (var v in r.Viivat)
                    for (int i = 0; i < v.Length; i++)
                        if (Kameramatikka.KulmaAsteina(keskus, v[i]) < rajaAst) tulos.Add((r, v, i));
            }
            return tulos;
        }

        /// <summary>Rata viivaa pitkin pisteestä i eteen- tai taaksepäin pituusAst verran (tihennetty 12 osaan);
        /// jos viiva loppuu, toiseen suuntaan; null, jos viivaa on alle puolet pituudesta.</summary>
        internal static LatLon[] ViivaaPitkin(LatLon[] viiva, int i, double pituusAst, bool eteen)
        {
            for (int kierros = 0; kierros < 2; kierros++, eteen = !eteen)
            {
                var pisteet = new List<LatLon> { viiva[i] };
                double kuljettu = 0;
                int askel = eteen ? 1 : -1;
                for (int j = i + askel; j >= 0 && j < viiva.Length && kuljettu < pituusAst; j += askel)
                {
                    double v = Kameramatikka.KulmaAsteina(pisteet[pisteet.Count - 1], viiva[j]);
                    if (kuljettu + v > pituusAst && v > 0)
                    {
                        pisteet.Add(Kameramatikka.IsoympyranPiste(pisteet[pisteet.Count - 1], viiva[j], (pituusAst - kuljettu) / v));
                        kuljettu = pituusAst;
                        break;
                    }
                    pisteet.Add(viiva[j]);
                    kuljettu += v;
                }
                if (kuljettu >= pituusAst * 0.5 && pisteet.Count >= 2)
                {
                    var p = new Piirtoviiva("", pisteet.ToArray());
                    const int n = 12;
                    var tihea = new LatLon[n + 1];
                    for (int k = 0; k <= n; k++) tihea[k] = p.Piste((double)k / n);
                    return tihea;
                }
            }
            return null;
        }
    }
}
