// TÄHTITAIVAAN SÄÄNNÖT JA AINEISTO (Linssiseppä 29.9.2026; web pelikoodari-tahtitaivas d9a9438a, js/linssit/tahtitaivas-laskenta.js,
// Fablen hyväksymä 21.9.2026): NYT / 1873 -kirkkausrajat (valosaaste: suurkaupunki 2,5, muut 3,5 ↔ 1873 kaikki 4,5), näkyvät
// tähdistöt (2/3 viivatähdistä horisontin yllä ja kirkkain rajan sisällä), Livian kysymys (kirkkaat kuviot ensin, neljä
// vaihtoehtoa, oikea +20 tp) ja palautteet. Aineisto Resources/Taivas/tahtitaivas.json (Linssit-testit/kultaiset/
// tee-tahtitaivas.mjs webin js/packs/linssi-tahdet.js:stä: Yale BSC, ConstellationLines CC BY 4.0, IAU-nimet CC BY, suomenkieliset
// nimet). Puhdas C#, testit Linssit-testit/Testit/TaivaanSaannotTestit.cs.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Taivas
{
    public sealed class Tahti
    {
        public int Hr;
        public double Ra, Dec, Mag, Bv;
        public string Nimi;
        public (double x, double y, double z) Eci;
    }

    public sealed class Tahdisto
    {
        public string Lyhenne, Latina, Suomi, Huomio;
        /// <summary>Viivajonot HR-numeroina (web ConstellationLines).</summary>
        public int[][] Viivat;
        public int[] Hrt;
    }

    /// <summary>Näkyvä tähdistö: viivatähdet horisontissa ja kirkkain magnitudi.</summary>
    public sealed class NakyvaTahdisto
    {
        public Tahdisto Tahdisto;
        public List<(Tahti Tahti, Horisontti Suunta)> Pisteet;
        public double Kirkkain;
    }

    public sealed class Kysymys
    {
        public NakyvaTahdisto Oikea;
        public List<Tahdisto> Vaihtoehdot;
        public string Teksti;
    }

    public sealed class TaivasAineisto
    {
        public List<Tahti> Tahdet = new List<Tahti>();
        public List<Tahdisto> Tahdistot = new List<Tahdisto>();
        public readonly Dictionary<int, Tahti> Hr = new Dictionary<int, Tahti>();
        public double Raja1873 = 4.5, RajaNyt = 3.5, RajaSuurkaupunki = 2.5, HorisontinVara = 4;
        public HashSet<string> Suurkaupungit = new HashSet<string>(StringComparer.Ordinal);
        public int ArvauksenTp = 20, Vaihtoehtoja = 4;
        public List<string> Kysymykset = new List<string>();
        public string PalauteOikein = "", PalauteVaarin = "", Kortti = "", Lahde = "";

        static double D(object o) => o == null ? 0 : Convert.ToDouble(o, System.Globalization.CultureInfo.InvariantCulture);

        /// <summary>Lukee tee-tahtitaivas.mjs:n JSONin (MiniJson-puu).</summary>
        public static TaivasAineisto Lue(object juuri)
        {
            var a = new TaivasAineisto();
            if (!(juuri is Dictionary<string, object> j)) return a;
            if (j.TryGetValue("kirkkausrajat", out var kr) && kr is Dictionary<string, object> r)
            {
                if (r.TryGetValue("1873", out var v)) a.Raja1873 = D(v);
                if (r.TryGetValue("nyt", out v)) a.RajaNyt = D(v);
                if (r.TryGetValue("suurkaupunki", out v)) a.RajaSuurkaupunki = D(v);
            }
            if (j.TryGetValue("suurkaupungit", out var sk) && sk is List<object> sl) foreach (var s in sl) a.Suurkaupungit.Add(s as string);
            if (j.TryGetValue("horisontinVara", out var hv)) a.HorisontinVara = D(hv);
            if (j.TryGetValue("arvauksenTp", out var tp)) a.ArvauksenTp = (int)D(tp);
            if (j.TryGetValue("vaihtoehtoja", out var ve)) a.Vaihtoehtoja = (int)D(ve);
            if (j.TryGetValue("kysymykset", out var ky) && ky is List<object> kl) foreach (var k in kl) a.Kysymykset.Add(k as string);
            a.PalauteOikein = j.TryGetValue("palauteOikein", out var po) ? po as string : "";
            a.PalauteVaarin = j.TryGetValue("palauteVaarin", out var pv) ? pv as string : "";
            a.Kortti = j.TryGetValue("kortti", out var ko) ? ko as string : "";
            a.Lahde = j.TryGetValue("lahde", out var la) ? la as string : "";
            if (j.TryGetValue("tahdet", out var td) && td is List<object> tl)
                foreach (var o in tl)
                {
                    if (!(o is List<object> x) || x.Count < 5) continue;
                    var t = new Tahti { Hr = (int)D(x[0]), Ra = D(x[1]), Dec = D(x[2]), Mag = D(x[3]), Bv = D(x[4]), Nimi = x.Count > 5 ? x[5] as string : null };
                    t.Eci = Taivaslaskenta.Eci(t.Ra, t.Dec);
                    a.Tahdet.Add(t);
                    a.Hr[t.Hr] = t;
                }
            if (j.TryGetValue("kuviot", out var kv) && kv is List<object> kvl)
                foreach (var o in kvl)
                {
                    if (!(o is Dictionary<string, object> x)) continue;
                    var viivat = new List<int[]>();
                    if (x.TryGetValue("viivat", out var vv) && vv is List<object> vl)
                        foreach (var jono in vl)
                            if (jono is List<object> jl) viivat.Add(jl.Select(h => (int)D(h)).ToArray());
                    a.Tahdistot.Add(new Tahdisto
                    {
                        Lyhenne = x.TryGetValue("lyhenne", out var ly) ? ly as string : null,
                        Latina = x.TryGetValue("latina", out var lt) ? lt as string : null,
                        Suomi = x.TryGetValue("suomi", out var su) ? su as string : null,
                        Huomio = x.TryGetValue("huomio", out var hu) ? hu as string : null,
                        Viivat = viivat.ToArray(),
                        Hrt = viivat.SelectMany(v => v).Distinct().ToArray(),
                    });
                }
            return a;
        }

        /// <summary>Kirkkausraja (web kirkkausraja): 1873 kaikkialla 4,5; nyt suurkaupungissa 2,5, muualla 3,5.</summary>
        public double Kirkkausraja(bool vuosi1873, string kaupunki) =>
            vuosi1873 ? Raja1873 : kaupunki != null && Suurkaupungit.Contains(kaupunki) ? RajaSuurkaupunki : RajaNyt;

        /// <summary>
        /// Näkyvät tähdistöt (web nakyvatKuviot): viivatähdistä vähintään 2/3 horisontin yllä (vara 4°) ja kirkkain rajan sisällä.
        /// </summary>
        public List<NakyvaTahdisto> NakyvatTahdistot(double lat, double lon, double jd, double magRaja)
        {
            double lst = Taivaslaskenta.Lst(jd, lon);
            var ulos = new List<NakyvaTahdisto>();
            foreach (var k in Tahdistot)
            {
                var pisteet = new List<(Tahti, Horisontti)>();
                foreach (var hr in k.Hrt)
                    if (Hr.TryGetValue(hr, out var t)) pisteet.Add((t, Taivaslaskenta.Horisonttiin(t.Eci, lat, lst)));
                if (pisteet.Count < 2) continue;
                int ylla = pisteet.Count(p => p.Item2.Korkeus >= HorisontinVara);
                if (ylla < 2.0 * pisteet.Count / 3) continue;
                double kirkkain = pisteet.Min(p => p.Item1.Mag);
                if (kirkkain > magRaja) continue;
                ulos.Add(new NakyvaTahdisto { Tahdisto = k, Pisteet = pisteet, Kirkkain = kirkkain });
            }
            return ulos;
        }

        /// <summary>
        /// Livian kysymys (web arvoKysymys): oikea mieluiten ei juuri kysytty ja vähintään 3 viivatähteä, kirkkaat kuviot
        /// (kirkkain ≤ 3,0) ensin, jos niitä on tarpeeksi; kolme muuta näkyvää nimeä sekoitettuna. null = liian vähän näkyvää.
        /// </summary>
        public Kysymys ArvoKysymys(List<NakyvaTahdisto> nakyvat, ISet<string> kysytyt, int jarjestys, Random arpa)
        {
            var kaikki = nakyvat.Where(n => n.Pisteet.Count >= 3).ToList();
            var kirkkaat = kaikki.Where(n => n.Kirkkain <= 3.0).ToList();
            var ehdokkaat = kirkkaat.Count >= Vaihtoehtoja ? kirkkaat : kaikki;
            if (ehdokkaat.Count < Vaihtoehtoja) return null;
            var tuoreet = ehdokkaat.Where(n => !kysytyt.Contains(n.Tahdisto.Lyhenne)).ToList();
            var lahde = tuoreet.Count > 0 ? tuoreet : ehdokkaat;
            var oikea = lahde[Math.Min(lahde.Count - 1, (int)(arpa.NextDouble() * lahde.Count))];
            var muut = Sekoita(ehdokkaat.Where(n => n != oikea).ToList(), arpa).Take(Vaihtoehtoja - 1);
            return new Kysymys
            {
                Oikea = oikea,
                Vaihtoehdot = Sekoita(new[] { oikea }.Concat(muut).ToList(), arpa).Select(n => n.Tahdisto).ToList(),
                Teksti = Kysymykset.Count > 0 ? Kysymykset[jarjestys % Kysymykset.Count] : "",
            };
        }

        public string Palaute(bool oikein, Tahdisto t) => (oikein ? PalauteOikein : PalauteVaarin).Replace("{TÄHDISTÖ}", t.Suomi);

        static List<T> Sekoita<T>(List<T> lista, Random arpa)
        {
            var u = new List<T>(lista);
            for (int i = u.Count - 1; i > 0; i--)
            {
                int j = Math.Min(i, (int)(arpa.NextDouble() * (i + 1)));
                (u[i], u[j]) = (u[j], u[i]);
            }
            return u;
        }
    }
}
