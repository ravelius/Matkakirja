// KAUPUNKIMAISEMAN LÄHIKERROKSET KEHITYSKAUPUNGEISSA (Pelikoodari 9.10.2026, äänisuunnittelijan sitova linja; Linssiseppä kytkee):
// aanet/kaupunkimaisema-v1 (yleiset 45 s silmukat: raitiovaunu-02, metro-01, laituri-01; tori-02, kahvila-02 ja lapset-01 EIVÄT käytössä)
// ja aanet/kaupunkimaisema-v2 (kaupunkikohtainen sorina: tori, kahvila, lapset; Pariisissa myös metro ja raitiovaunun kerta-ohiajo).
//  - kerros → ääni: v2:n kaupungin oma (silmukka; kerta-ääni = ei silmukkaa, soitin soittaa harvakseltaan), muuten v1:n yleinen
//    (raitiovaunu, metro, laituri). Vain Tukholma ja Pariisi (Kehityskaupungit); muualla ei mitään → ei latauksia olemattomiin.
//  - taso = Tausta × maiseman Taso (0,55) × kerroin × äänikartan paino × korkeusvaimennus (soitin ohittaa mikserin korkeuskertoimen;
//    kertoimet suhteellisia samaan maisemaan, Pelikoodari 9.10.).
//  - painot: tori, kahvila, raitiovaunu kartasta; lapset = puisto 8–20; metro = rautatie × 0,5; laituri = max(kanava, aallot, satama).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class KaupunkiMaisema
    {
        public static readonly string[] Lahikerrokset =
        {
            KaupunkiAanimaisema.Raitiovaunu, KaupunkiAanimaisema.Metro, KaupunkiAanimaisema.Tori,
            KaupunkiAanimaisema.Lapset, KaupunkiAanimaisema.Kahvila, KaupunkiAanimaisema.Laituri,
        };
        /// <summary>v1:n yleinen silmukka kerrokselle, kun v2:ssa ei ole kaupungin omaa (tori-02, kahvila-02, lapset-01 korvattu v2:lla).</summary>
        static readonly Dictionary<string, string> V1 = new Dictionary<string, string>
        {
            [KaupunkiAanimaisema.Raitiovaunu] = "raitiovaunu-02", [KaupunkiAanimaisema.Metro] = "metro-01", [KaupunkiAanimaisema.Laituri] = "laituri-01",
        };
        public const double LapsetAlkaa = 8, LapsetLoppuu = 20, MetroRautatie = 0.5;

        readonly Dictionary<string, string> yleiset = new Dictionary<string, string>();   // v1: tunnus → osoite
        PalloAanimaisema kaupungit = new PalloAanimaisema();                               // v2: sama muoto kuin pallo-aanimaisema-v1

        public static bool On(string kerros) => Array.IndexOf(Lahikerrokset, kerros) >= 0;

        /// <summary>Tasokerroin Tausta-tason päälle.</summary>
        public static double Kerroin(string kerros) => kerros switch
        {
            KaupunkiAanimaisema.Raitiovaunu => 0.5, KaupunkiAanimaisema.Metro => 0.25, KaupunkiAanimaisema.Tori => 0.6,
            KaupunkiAanimaisema.Lapset => 0.4, KaupunkiAanimaisema.Kahvila => 0.35, KaupunkiAanimaisema.Laituri => 0.7, _ => 0,
        };

        public static KaupunkiMaisema Lue(string v1Json, string v1Juuri, string v2Json, string v2Juuri)
        {
            var m = new KaupunkiMaisema();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(v1Json)), "aanet")))
            {
                var d = MiniJson.Objekti(o);
                string t = MiniJson.Teksti(d, "tunnus"), a = MiniJson.Teksti(d, "aani");
                if (!string.IsNullOrEmpty(t) && !string.IsNullOrEmpty(a) && MiniJson.Kentta(d, "silmukka") is bool b && b) m.yleiset[t] = v1Juuri + a;
            }
            m.kaupungit = PalloAanimaisema.Lue(v2Json, v2Juuri);
            return m;
        }

        PalloAanimaisema.Aani Oma(string kaupunki, string kerros)
        {
            if (kaupunki == null || !kaupungit.Kaupungit.TryGetValue(kaupunki, out var l)) return null;
            foreach (var a in l) if (a.Tunnus == kerros) return a;
            return null;
        }

        /// <summary>Kerroksen silmukan osoite kehityskaupungissa, tai null (ei kehityskaupunki, ei lähikerros, kerta-ääni tai ei ääntä).</summary>
        public string Url(string kaupunki, string kerros)
        {
            if (!Kehityskaupungit.On(kaupunki) || !On(kerros)) return null;
            var a = Oma(kaupunki, kerros);
            if (a != null) return a.Silmukka ? a.Osoite : null;
            return V1.TryGetValue(kerros, out var t) && yleiset.TryGetValue(t, out var u) ? u : null;
        }

        /// <summary>Kerroksen kerta-ääni (Pariisin raitiovaunun ohiajo), tai null.</summary>
        public PalloAanimaisema.Aani KertaAani(string kaupunki, string kerros)
        {
            if (!Kehityskaupungit.On(kaupunki)) return null;
            var a = Oma(kaupunki, kerros);
            return a != null && !a.Silmukka ? a : null;
        }

        /// <summary>Korkeusvaimennus: täysi ≤ taysiM, −12 dB miinus12M:ssä (log-asteikolla), siitä lineaarisesti nollaan poisM:ssä.</summary>
        public static double Vaimennus(double korkeusM, double taysiM, double miinus12M, double poisM)
        {
            if (korkeusM <= taysiM) return 1;
            if (korkeusM >= poisM) return 0;
            const double G12 = 0.25118864315;   // −12 dB
            if (korkeusM <= miinus12M) return Math.Pow(G12, Math.Log(korkeusM / taysiM) / Math.Log(miinus12M / taysiM));
            return G12 * (poisM - korkeusM) / (poisM - miinus12M);
        }

        /// <summary>Kerroksen korkeusvaimennus: täysi alle 150 m, −12 dB 600 m, pois 1 200 m; laituri lähiääni 75 / 300 / 600 m.</summary>
        public static double Korkeudella(string kerros, double korkeusM) =>
            kerros == KaupunkiAanimaisema.Laituri ? Vaimennus(korkeusM, 75, 300, 600) : Vaimennus(korkeusM, 150, 600, 1200);

        /// <summary>Kerroksen paino kartasta ennen kerrointa (lapset vain päivällä 8–20).</summary>
        public static double KarttaPaino(string kerros, IReadOnlyDictionary<string, double> kartta, double tunti)
        {
            if (kartta == null) return 0;
            double P(string k) => kartta.TryGetValue(k, out var w) ? Math.Max(0, Math.Min(1, w)) : 0;
            tunti = ((tunti % 24) + 24) % 24;
            switch (kerros)
            {
                case KaupunkiAanimaisema.Lapset: return tunti >= LapsetAlkaa && tunti < LapsetLoppuu ? P(KaupunkiAanimaisema.Puisto) : 0;
                case KaupunkiAanimaisema.Metro: return P(KaupunkiAanimaisema.Rautatie) * MetroRautatie;
                case KaupunkiAanimaisema.Laituri: return Math.Max(P(KaupunkiAanimaisema.Kanava), Math.Max(P(KaupunkiAanimaisema.Aallot), P(KaupunkiAanimaisema.Satama)));
                default: return P(kerros);
            }
        }

        /// <summary>Lähikerroksen taso mikserille: kerroin × paino × korkeusvaimennus.</summary>
        public static double Paino(string kerros, IReadOnlyDictionary<string, double> kartta, double tunti, double korkeusM) =>
            Kerroin(kerros) * KarttaPaino(kerros, kartta, tunti) * Korkeudella(kerros, korkeusM);

        /// <summary>
        /// Kehityskaupungin painot mikserille (ulos tyhjennetään): kartan kerrokset sellaisinaan, lähikerrokset johdettuina; lähikerros,
        /// jolla ei ole silmukkaa (onSilmukka false, esim. Pariisin raitiovaunu = kerta-ääni), saa painon 0. Kartta null → null.
        /// </summary>
        public static IReadOnlyDictionary<string, double> Painot(IReadOnlyDictionary<string, double> kartta, double tunti, double korkeusM,
            Func<string, bool> onSilmukka, Dictionary<string, double> ulos)
        {
            if (kartta == null) return null;
            ulos.Clear();
            foreach (var kv in kartta) ulos[kv.Key] = kv.Value;
            foreach (var k in Lahikerrokset) ulos[k] = onSilmukka(k) ? Paino(k, kartta, tunti, korkeusM) : 0;
            return ulos;
        }
    }
}
