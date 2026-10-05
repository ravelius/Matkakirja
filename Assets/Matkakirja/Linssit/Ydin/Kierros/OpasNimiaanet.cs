// MAIDEN JA KAUPUNKIEN NIMET ÄÄNENÄ (Pelikoodari 5.10. 23.2x, juna 146): Vaihda kohde -valikon valinta sanotaan heti Williamin
// äänellä. Aineisto ämpärissä:
//   aanet/opas/nimet-v1/nimet.json  maat{ISO → leike}, kaupungit[{iso, nimi, paakaupunki, …leike}], jatkot{maa[], kaupunki[]}
//                                   (jatkon "paikka": "alku" = nimi ensin "Tanska." + "hieno valinta.", "loppu" = jatko ensin)
//   aanet/opas/maat-v1/maat.json    maat{ISO → {"maa": [valmiit lauseet], "pk": [pääkaupunki], "<kaupunki>": […]}}
// SÄÄNTÖ: valmis yhdistelmä, jos nimelle on sellainen; muuten nimi + jatko. Ei toistoa istunnossa (yhdistelmät ja jatkot).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class NimiLeike
    {
        public string Id, Teksti, Url, Paikka;
        public double KestoS;

        internal static NimiLeike Lue(object o)
        {
            if (!(o is Dictionary<string, object> d)) return null;
            string S(string k) => d.TryGetValue(k, out var v) ? v as string : null;
            string id = S("id"), url = S("url");
            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(url)) return null;
            double kesto = d.TryGetValue("kesto_s", out var ko) && ko != null ? Convert.ToDouble(ko, System.Globalization.CultureInfo.InvariantCulture) : 0;
            return new NimiLeike { Id = id, Teksti = S("teksti"), Url = url, Paikka = S("paikka"), KestoS = kesto };
        }

        internal static List<NimiLeike> Lista(object o)
        {
            var r = new List<NimiLeike>();
            if (o is IList<object> l) foreach (var x in l) { var n = Lue(x); if (n != null) r.Add(n); }
            return r;
        }
    }

    public sealed class OpasNimiaanet
    {
        readonly Dictionary<string, NimiLeike> maat = new Dictionary<string, NimiLeike>(StringComparer.OrdinalIgnoreCase);
        readonly List<(string iso, string nimi, bool pk, NimiLeike leike)> kaupungit = new List<(string, string, bool, NimiLeike)>();
        List<NimiLeike> jatkoMaa = new List<NimiLeike>(), jatkoKaupunki = new List<NimiLeike>();
        readonly Dictionary<string, Dictionary<string, List<NimiLeike>>> yhdistelmat =
            new Dictionary<string, Dictionary<string, List<NimiLeike>>>(StringComparer.OrdinalIgnoreCase);
        readonly HashSet<string> kaytetyt = new HashSet<string>(StringComparer.Ordinal);
        readonly Random satunnainen;

        public OpasNimiaanet(int siemen = 0) { satunnainen = siemen == 0 ? new Random() : new Random(siemen); }

        /// <summary>nimet.json ja maat.json (MiniJson-sanakirjoina; maat saa puuttua). null, jos nimissä ei ole maita.</summary>
        public static OpasNimiaanet Lue(Dictionary<string, object> nimet, Dictionary<string, object> yhd, int siemen = 0)
        {
            if (nimet == null || !nimet.TryGetValue("maat", out var mo) || !(mo is Dictionary<string, object> md)) return null;
            var a = new OpasNimiaanet(siemen);
            foreach (var kv in md) { var l = NimiLeike.Lue(kv.Value); if (l != null) a.maat[kv.Key] = l; }
            if (nimet.TryGetValue("kaupungit", out var ko) && ko is IList<object> kl)
                foreach (var x in kl)
                {
                    if (!(x is Dictionary<string, object> d)) continue;
                    var l = NimiLeike.Lue(d);
                    string iso = d.TryGetValue("iso", out var i) ? i as string : null, nimi = d.TryGetValue("nimi", out var n) ? n as string : null;
                    bool pk = d.TryGetValue("paakaupunki", out var p) && p is bool b && b;
                    if (l != null && !string.IsNullOrEmpty(iso) && !string.IsNullOrEmpty(nimi)) a.kaupungit.Add((iso, nimi, pk, l));
                }
            if (nimet.TryGetValue("jatkot", out var jo) && jo is Dictionary<string, object> jd)
            {
                if (jd.TryGetValue("maa", out var jm)) a.jatkoMaa = NimiLeike.Lista(jm);
                if (jd.TryGetValue("kaupunki", out var jk)) a.jatkoKaupunki = NimiLeike.Lista(jk);
            }
            if (yhd != null && yhd.TryGetValue("maat", out var yo) && yo is Dictionary<string, object> yd)
                foreach (var kv in yd)
                {
                    if (!(kv.Value is Dictionary<string, object> avaimet)) continue;
                    var r = new Dictionary<string, List<NimiLeike>>(StringComparer.OrdinalIgnoreCase);
                    foreach (var av in avaimet) { var l = NimiLeike.Lista(av.Value); if (l.Count > 0) r[av.Key] = l; }
                    a.yhdistelmat[kv.Key] = r;
                }
            return a.maat.Count > 0 ? a : null;
        }

        /// <summary>Kaikki leikkeet (esilataus): nimet, jatkot ja yhdistelmät.</summary>
        public IEnumerable<NimiLeike> Kaikki()
        {
            foreach (var l in maat.Values) yield return l;
            foreach (var k in kaupungit) yield return k.leike;
            foreach (var l in jatkoMaa) yield return l;
            foreach (var l in jatkoKaupunki) yield return l;
            foreach (var m in yhdistelmat.Values) foreach (var r in m.Values) foreach (var l in r) yield return l;
        }

        /// <summary>Maan valinta: leikkeet soittojärjestyksessä (1 yhdistelmä tai nimi + jatko); tyhjä, jos maata ei tunneta.</summary>
        public NimiLeike[] Maalle(string iso, Func<NimiLeike, bool> saatavilla = null)
        {
            if (string.IsNullOrEmpty(iso)) return Array.Empty<NimiLeike>();
            var y = Yhdistelma(iso, "maa", saatavilla);
            if (y != null) return new[] { y };
            return maat.TryGetValue(iso, out var nimi) ? Jatkolla(nimi, jatkoMaa, saatavilla) : Array.Empty<NimiLeike>();
        }

        /// <summary>Kaupungin valinta: pääkaupungille "pk"-yhdistelmä, muulle kaupungin nimen avain; muuten nimi + jatko.
        /// iso saa puuttua (haetaan nimellä). Samannimisistä (Jerusalem IL/PS) iso ratkaisee.</summary>
        public NimiLeike[] Kaupungille(string iso, string nimi, Func<NimiLeike, bool> saatavilla = null)
        {
            if (string.IsNullOrWhiteSpace(nimi)) return Array.Empty<NimiLeike>();
            string n = nimi.Trim();
            int i = kaupungit.FindIndex(k => string.Equals(k.nimi, n, StringComparison.OrdinalIgnoreCase) && (iso == null || string.Equals(k.iso, iso, StringComparison.OrdinalIgnoreCase)));
            if (i < 0) return Array.Empty<NimiLeike>();
            var c = kaupungit[i];
            var y = Yhdistelma(c.iso, c.pk ? "pk" : c.nimi, saatavilla);
            if (y != null) return new[] { y };
            return Jatkolla(c.leike, jatkoKaupunki, saatavilla);
        }

        NimiLeike Yhdistelma(string iso, string avain, Func<NimiLeike, bool> saatavilla)
        {
            if (!yhdistelmat.TryGetValue(iso, out var m) || !m.TryGetValue(avain, out var r)) return null;
            return Vapaa(r, saatavilla);
        }

        NimiLeike[] Jatkolla(NimiLeike nimi, List<NimiLeike> jatkot, Func<NimiLeike, bool> saatavilla)
        {
            if (saatavilla != null && !saatavilla(nimi)) return Array.Empty<NimiLeike>();
            var j = Vapaa(jatkot, saatavilla);
            if (j == null) return new[] { nimi };
            return j.Paikka == "loppu" ? new[] { j, nimi } : new[] { nimi, j };
        }

        NimiLeike Vapaa(List<NimiLeike> r, Func<NimiLeike, bool> saatavilla)
        {
            var vapaat = r.FindAll(l => !kaytetyt.Contains(l.Id) && (saatavilla == null || saatavilla(l)));
            if (vapaat.Count == 0) return null;
            var v = vapaat[satunnainen.Next(vapaat.Count)];
            kaytetyt.Add(v.Id);
            return v;
        }
    }
}
