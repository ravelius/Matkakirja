// VÄLÄHDYSVAHTI (omistaja 6.10. 16.5x, TF 149 iPad: "karttaan tulee hyvin nopeita, ihan kuin tekstileikkeitä, vaakasuuntaisina
// viivoina"): oppaan aikana jokainen tekstielementti (Label), joka oli näkyvissä alle Raja-ajan, kirjataan lokiin elementin
// polun ja tekstin kanssa. Näkyvyys: paneelissa, display ja visibility päällä, kertynyt opasiteetti > 0,05, ala > 0 ja
// ruudulla. Diagnostiikka: ajetaan vain oppaan ollessa auki (OpasValikko.PaivitaSirut).
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class Valahdysvahti
    {
        public const float Raja = 0.2f;
        static readonly Dictionary<Label, (float Alku, string Teksti)> naky = new Dictionary<Label, (float, string)>();
        static readonly List<Label> poistuneet = new List<Label>();
        static readonly HashSet<Label> nyt = new HashSet<Label>();
        static readonly List<Label> kaikki = new List<Label>();
        public static int Kirjattu { get; private set; }

        public static void Paivita(VisualElement juuri)
        {
            if (juuri?.panel == null) return;
            float t = Time.realtimeSinceStartup;
            var ruutu = juuri.panel.visualTree.worldBound;
            nyt.Clear();
            kaikki.Clear();
            juuri.panel.visualTree.Query<Label>().ToList(kaikki);
            foreach (var l in kaikki)
                if (Nakyy(l, ruutu)) nyt.Add(l);
            foreach (var l in nyt)
                if (!naky.ContainsKey(l)) naky[l] = (t, l.text);
            poistuneet.Clear();
            foreach (var kv in naky) if (!nyt.Contains(kv.Key)) poistuneet.Add(kv.Key);
            foreach (var l in poistuneet)
            {
                var (alku, teksti) = naky[l];
                naky.Remove(l);
                float kesto = t - alku;
                if (kesto < Raja)
                {
                    Kirjattu++;
                    string s = teksti ?? "";
                    if (s.Length > 80) s = s.Substring(0, 80) + "…";
                    Debug.Log($"MATKAKIRJA välähdys: {kesto * 1000f:0} ms {Polku(l)} \"{s}\"");
                }
            }
        }

        static bool Nakyy(Label l, Rect ruutu)
        {
            if (string.IsNullOrWhiteSpace(l.text) || l.panel == null) return false;
            var r = l.worldBound;
            if (r.width < 1f || r.height < 1f || !r.Overlaps(ruutu)) return false;
            float o = 1f;
            for (VisualElement v = l; v != null; v = v.parent)
            {
                var st = v.resolvedStyle;
                if (st.display == DisplayStyle.None || st.visibility == Visibility.Hidden) return false;
                o *= st.opacity;
                if (o < 0.05f) return false;
            }
            return true;
        }

        static string Polku(VisualElement e)
        {
            var osat = new List<string>();
            for (var v = e; v != null && osat.Count < 4; v = v.parent)
            {
                string n = !string.IsNullOrEmpty(v.name) ? "#" + v.name : null;
                foreach (var c in v.GetClasses()) { n = "." + c; break; }
                osat.Add(n ?? v.GetType().Name);
            }
            osat.Reverse();
            return string.Join(" > ", osat);
        }
    }
}
