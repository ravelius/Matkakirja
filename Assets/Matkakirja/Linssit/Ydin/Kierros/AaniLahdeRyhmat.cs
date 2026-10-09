// ÄÄNILÄHTEIDEN RYHMÄT (Päätoimittaja 9.10.2026, juna 171): ☰ Lähteet › Äänet (73 riviä) otsikoiden alle kiinteässä järjestyksessä,
// rivit aakkosjärjestyksessä otsikon sisällä (suomen lajittelu: å, ä, ö lopussa). Ryhmä aanilahteet.json:n "ryhma"-kentästä
// (Pelikoodari); tuntematon tai puuttuva → "Muut" loppuun. Tyhjiä ryhmiä ei palauteta. Puhdas C#: Linssit-testit.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Matkakirja.Linssit.Kierros
{
    public static class AaniLahdeRyhmat
    {
        public static readonly string[] Jarjestys = { "Kuumailmapallo ja kaupungit", "Olavinlinna", "Kartta ja linssit", "Lautapelit", "Käyttöliittymä" };
        public const string Muut = "Muut";

        static readonly CompareInfo Suomi = CultureInfo.GetCultureInfo("fi-FI").CompareInfo;

        /// <summary>(ryhmä, rivi) → ryhmät järjestyksessä, rivit aakkosittain ja kukin kerran.</summary>
        public static List<(string Ryhma, List<string> Rivit)> Ryhmittele(IEnumerable<(string ryhma, string rivi)> rivit)
        {
            var ryhmat = new Dictionary<string, List<string>>(StringComparer.Ordinal);
            foreach (var (ryhma, rivi) in rivit ?? Enumerable.Empty<(string, string)>())
            {
                if (string.IsNullOrWhiteSpace(rivi)) continue;
                string r = Array.Find(Jarjestys, j => string.Equals(j, ryhma?.Trim(), StringComparison.OrdinalIgnoreCase)) ?? Muut;
                if (!ryhmat.TryGetValue(r, out var l)) ryhmat[r] = l = new List<string>();
                string t = rivi.Trim();
                if (!l.Contains(t)) l.Add(t);
            }
            var tulos = new List<(string, List<string>)>();
            foreach (var r in Jarjestys.Append(Muut))
                if (ryhmat.TryGetValue(r, out var l) && l.Count > 0)
                {
                    l.Sort((a, b) => Suomi.Compare(a, b, CompareOptions.IgnoreCase));
                    tulos.Add((r, l));
                }
            return tulos;
        }
    }
}
