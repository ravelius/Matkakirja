// PÖLLÖPOIMINTOJEN LAITEVARASTO (Natiivi-UI): webin js/pollopoiminnat.js lueOmatPoiminnat, tallennaPoiminta,
// poistaPoiminta, tyhjennaPoiminnat ja vientiLohko.
//
// Kehittäjätilassa "Tallenna juttuun" tallentaa kysymys–vastaus-parin tälle laitteelle (PlayerPrefs, sama avain
// ja sama muoto kuin webin localStorage: { avain: [{ kysymys, vastaus }] }). Laitteen omat parit näkyvät
// pillereinä vain kehittäjätilassa, ja Kehittäjälehden Pöllöpoiminnat-sivu vie ne JS-lohkona pakettiin
// (js/packs/pollo-poiminnat.js). Sama pari lähtee tallennettaessa myös ehdotuskanavaan (PuluChat.PoimintaRivi).
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class PoimintaVarasto
    {
        public const string Avain = "matkakirja-pollo-poiminnat"; // web POIMINNAT_TALLE

        /// <summary>Laitteen omat parit avaimittain (rikkinäinen tai puuttuva = tyhjä).</summary>
        public static Dictionary<string, List<(string Kysymys, string Vastaus)>> Lue()
        {
            var ulos = new Dictionary<string, List<(string, string)>>();
            string raaka = PlayerPrefs.GetString(Avain, "");
            if (raaka.Length == 0) return ulos;
            try
            {
                foreach (var kv in Rakenne.Olio(MiniJson.Jasenna(raaka)) ?? new Dictionary<string, object>())
                {
                    var lista = (Rakenne.Lista(kv.Value) ?? new List<object>()).Select(Rakenne.Olio).Where(p => p != null)
                        .Select(p => (MiniJson.Teksti(p, "kysymys"), MiniJson.Teksti(p, "vastaus")))
                        .Where(p => !string.IsNullOrEmpty(p.Item1) && !string.IsNullOrEmpty(p.Item2)).ToList();
                    ulos[kv.Key] = lista;
                }
            }
            catch (System.FormatException) { /* rikkinäinen varasto = ei pareja */ }
            return ulos;
        }

        static void Kirjoita(Dictionary<string, List<(string Kysymys, string Vastaus)>> kaikki)
        {
            var sb = new StringBuilder("{");
            bool eka = true;
            foreach (var kv in kaikki)
            {
                if (kv.Value.Count == 0) continue;
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append(PeliApu.Json(kv.Key)).Append(":[");
                sb.Append(string.Join(",", kv.Value.Select(p => "{\"kysymys\":" + PeliApu.Json(p.Kysymys) + ",\"vastaus\":" + PeliApu.Json(p.Vastaus) + "}")));
                sb.Append(']');
            }
            PlayerPrefs.SetString(Avain, sb.Append('}').ToString());
            PlayerPrefs.Save();
        }

        /// <summary>Web tallennaPoiminta: false, jos tyhjä tai sama kysymys on jo tallessa tällä avaimella.</summary>
        public static bool Tallenna(string avain, string kysymys, string vastaus)
        {
            string k = (kysymys ?? "").Trim(), v = (vastaus ?? "").Trim();
            if (string.IsNullOrEmpty(avain) || k.Length == 0 || v.Length == 0) return false;
            var kaikki = Lue();
            if (!kaikki.TryGetValue(avain, out var lista)) kaikki[avain] = lista = new List<(string, string)>();
            if (lista.Any(p => p.Kysymys == k)) return false;
            lista.Add((k, v));
            Kirjoita(kaikki);
            return true;
        }

        /// <summary>Web poistaPoiminta: false, jos paria ei ollut.</summary>
        public static bool Poista(string avain, string kysymys)
        {
            var kaikki = Lue();
            if (avain == null || !kaikki.TryGetValue(avain, out var lista) || lista.RemoveAll(p => p.Kysymys == kysymys) == 0) return false;
            if (lista.Count == 0) kaikki.Remove(avain);
            Kirjoita(kaikki);
            return true;
        }

        /// <summary>Web tyhjennaPoiminnat (vienti tehty).</summary>
        public static void Tyhjenna()
        {
            PlayerPrefs.DeleteKey(Avain);
            PlayerPrefs.Save();
        }

        /// <summary>
        /// Web vientiLohko: valmis JS-lohko tiedostoon js/packs/pollo-poiminnat.js (avaimet aakkosjärjestyksessä,
        /// merkkijonot JSON.stringify-muodossa). Tyhjä, jos pareja ei ole.
        /// </summary>
        public static string VientiLohko(Dictionary<string, List<(string Kysymys, string Vastaus)>> omat)
        {
            var avaimet = omat.Where(kv => kv.Value.Count > 0).Select(kv => kv.Key).OrderBy(a => a, System.StringComparer.Ordinal).ToList();
            if (avaimet.Count == 0) return "";
            var rivit = new List<string> { "export const POLLO_POIMINNAT = {" };
            foreach (var avain in avaimet)
            {
                rivit.Add("  " + JsMerkkijono(avain) + ": [");
                foreach (var p in omat[avain])
                {
                    rivit.Add("    {");
                    rivit.Add("      kysymys: " + JsMerkkijono(p.Kysymys) + ",");
                    rivit.Add("      vastaus: " + JsMerkkijono(p.Vastaus) + ",");
                    rivit.Add("    },");
                }
                rivit.Add("  ],");
            }
            rivit.Add("};");
            return string.Join("\n", rivit);
        }

        /// <summary>JSON.stringify merkkijonolle (lyhyet pakomerkit \n \t … kuten selaimessa).</summary>
        public static string JsMerkkijono(string s)
        {
            var sb = new StringBuilder(s.Length + 2).Append('"');
            foreach (var c in s)
            {
                switch (c)
                {
                    case '"': sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '\t': sb.Append("\\t"); break;
                    case '\b': sb.Append("\\b"); break;
                    case '\f': sb.Append("\\f"); break;
                    default:
                        if (c < 0x20) sb.Append("\\u").Append(((int)c).ToString("x4"));
                        else sb.Append(c);
                        break;
                }
            }
            return sb.Append('"').ToString();
        }
    }
}
