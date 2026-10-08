// PALLON ÄÄNIMAISEMA KEHITYSKAUPUNGEISSA (Pelikoodari 8.10.2026, PT: Tausta-säädin, Linssiseppä kytkee; aanet/pallo-aanimaisema-v1):
// manifest { kaupungit: { <id>: [{ tunnus, aani, silmukka, kesto_s, ... }] } }. Silmukat korvaavat kaupungin äänimaiseman vastaavat
// kerrokset (KaupunkiAanimaisemaSoitin.SilmukanUrl), jottei liikenne kuulu kahdesti: humina → liikenne_hiljainen, lokit → satama.
// Kerta-äänet (vene-ohi, hoyrypilli, kellot) soivat harvakseltaan satunnaisin välein (Pelikoodarin ehdotus: kellot 2–4 min, muut
// 1–3 min), deterministisesti siemenestä. Puhdas C#: PalloAanimaisemaTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class PalloAanimaisema
    {
        public sealed class Aani { public string Tunnus, Polku; public bool Silmukka; public double KestoS; }
        public readonly Dictionary<string, List<Aani>> Kaupungit = new Dictionary<string, List<Aani>>(StringComparer.OrdinalIgnoreCase);

        /// <summary>Silmukan tunnus → kaupungin äänimaiseman kerros, jonka se korvaa.</summary>
        public static readonly Dictionary<string, string> Korvaa = new Dictionary<string, string>
        {
            ["humina"] = KaupunkiAanimaisema.LiikenneHiljainen, ["lokit"] = KaupunkiAanimaisema.Satama,
        };

        public static PalloAanimaisema Lue(string json)
        {
            var m = new PalloAanimaisema();
            var k = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "kaupungit"));
            if (k == null) return m;
            foreach (var kv in k)
            {
                var l = new List<Aani>();
                foreach (var o in MiniJson.TaulukkoTaiTyhja(kv.Value))
                {
                    var d = MiniJson.Objekti(o);
                    var a = new Aani { Tunnus = MiniJson.Teksti(d, "tunnus"), Polku = MiniJson.Teksti(d, "aani"), KestoS = MiniJson.Luku(d, "kesto_s") ?? 0,
                        Silmukka = MiniJson.Kentta(d, "silmukka") is bool b && b };
                    if (!string.IsNullOrEmpty(a.Tunnus) && !string.IsNullOrEmpty(a.Polku)) l.Add(a);
                }
                m.Kaupungit[kv.Key] = l;
            }
            return m;
        }

        /// <summary>Kaupungin silmukka, joka korvaa kerroksen, tai null.</summary>
        public string KerroksenPolku(string kaupunki, string kerros)
        {
            if (kaupunki == null || !Kaupungit.TryGetValue(kaupunki, out var l)) return null;
            foreach (var a in l) if (a.Silmukka && Korvaa.TryGetValue(a.Tunnus, out var kr) && kr == kerros) return a.Polku;
            return null;
        }

        /// <summary>Seuraavan kerta-äänen väli (s): kellot 120–240, muut 60–180.</summary>
        public static double Vali(string tunnus, Random r) => tunnus == "kellot" ? 120 + 120 * r.NextDouble() : 60 + 120 * r.NextDouble();

        /// <summary>Korkeuden vaimennus (m maasta): täysi alle 150 m, 0,3 yli 800 m:n (pallo kaupungin yllä).</summary>
        public static double Korkeudella(double korkeusM) => 1 - 0.7 * Math.Max(0, Math.Min(1, (korkeusM - 150) / 650));
    }
}
