// ÄÄNEN MIKSERILUOKKA (PT 8.10. 22.17, omistajan mikseri: "äänimaisema seuraa Tausta- ja Sää-säätimiä"): onko silmukka tai tehoste
// säätä (tuuli, sade, ukkonen, tippuminen) → ☰-mikserin Sää, vai muuta äänimaisemaa → Tausta. Kertaäänet ovat Tehosteita.
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public static class AaniLuokka
    {
        static readonly string[] SaaSanat = { "tuuli", "sade", "ukkonen", "myrsky", "tippu", "raystas", "rae", "lumi" };

        /// <summary>Tunnus on sääääni (pienillä kirjaimilla osa nimeä, esim. "linna-tuuli", "sade-kivi", "tippuminen-muuri").</summary>
        public static bool OnkoSaa(string tunnus)
        {
            if (string.IsNullOrEmpty(tunnus)) return false;
            string t = tunnus.ToLowerInvariant();
            foreach (var s in SaaSanat) if (t.Contains(s)) return true;
            return false;
        }
    }
}
