// LINSSIN VALMIIT KYSYMYKSET CHATISSA (Natiivi-UI): web js/linssit/ihmisen-matka-pulukysymykset.js
// (pulunKysymystilanne, jaksonKysymystunnus) ja ihmisen-matka-kysymykset.js (haeIhmisenMatkanKysymykset,
// haeIhmisenMatkanVastaus). Ihmisen matkan aikana pulun chat tarjoaa nykyisen löytöpaikan kolme
// valmista kysymystä tervehdyksen tilalla; valmis vastaus lähteineen tulee ilman palvelinta.
//
// Tilan (kertomus + esityksen indeksi) antaa AikajanaNakyma, aineisto on paketin moduulissa
// moduulit/js/linssit/ihmisen-matka-kysymykset.json (IHMISEN_MATKAN_KYSYMYKSET).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class LinssiKysymys
    {
        /// <summary>Kysyttyjen muistin avain (web avain: jakso:tunnus).</summary>
        public string Avain;
        public List<string> Kysymykset = new List<string>();
        public Dictionary<string, (string Vastaus, List<(string Url, string Otsikko)> Lahteet)> Vastaukset =
            new Dictionary<string, (string, List<(string, string)>)>();
    }

    public static class LinssiKysymykset
    {
        const string Moduuli = "moduulit/js/linssit/ihmisen-matka-kysymykset.json";
        static Dictionary<string, LinssiKysymys> aineisto;
        static bool haussa;

        /// <summary>Ihmisen matkan tila (AikajanaNakyma): kertomus ja esityksen jakso, tai null kun linssi ei ole auki.</summary>
        public static Func<(IReadOnlyList<KertomusJakso> Kertomus, int Indeksi)?> Tila;

        /// <summary>Nykyisen jakson kysymykset (web pulunKysymystilanne), tai null.</summary>
        public static LinssiKysymys Nykyinen()
        {
            var t = Tila?.Invoke();
            if (t == null) return null;
            if (aineisto == null) { Lataa(); return null; }
            var (kertomus, indeksi) = t.Value;
            if (kertomus == null || indeksi < 0) return null;
            // Web jaksonKysymystunnus: lähin jakso taaksepäin, jonka kohteella on kysymyksiä.
            for (int i = Mathf.Min(indeksi, kertomus.Count - 1); i >= 0; i--)
            {
                var kohde = kertomus[i]?.Kohde;
                if (kohde != null && aineisto.TryGetValue(kohde, out var k) && k.Kysymykset.Count > 0) return k;
            }
            return null;
        }

        /// <summary>Esilataus (linssin auetessa), jotta chatin ensimmäinen avaus löytää kysymykset.</summary>
        public static void Lataa()
        {
            if (aineisto != null || haussa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(LinssiSisalto.Hae(Moduuli, teksti =>
            {
                var tulos = new Dictionary<string, LinssiKysymys>();
                try
                {
                    var exportit = Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(teksti != null ? MiniJson.Jasenna(teksti) : null), "exportit"));
                    var vienti = Rakenne.Olio(MiniJson.Kentta(exportit, "IHMISEN_MATKAN_KYSYMYKSET"));
                    var arvo = Rakenne.Olio(MiniJson.Kentta(vienti, "arvo")) ?? vienti;
                    foreach (var kv in arvo ?? new Dictionary<string, object>())
                    {
                        var o = Rakenne.Olio(kv.Value);
                        var k = new LinssiKysymys { Avain = "jakso:" + kv.Key };
                        k.Kysymykset = (Rakenne.Lista(MiniJson.Kentta(o, "kysymykset")) ?? new List<object>()).OfType<string>().ToList();
                        foreach (var v in (Rakenne.Lista(MiniJson.Kentta(o, "vastaukset")) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null))
                        {
                            string kysymys = MiniJson.Teksti(v, "kysymys"), vastaus = MiniJson.Teksti(v, "vastaus");
                            if (kysymys == null || vastaus == null) continue;
                            var lahteet = new List<(string, string)>();
                            foreach (var l in (Rakenne.Lista(MiniJson.Kentta(v, "lahteet")) ?? new List<object>()).Select(Rakenne.Olio).Where(x => x != null))
                                if (MiniJson.Teksti(l, "url") is string u && u.StartsWith("https://")) lahteet.Add((u, MiniJson.Teksti(l, "title") ?? u));
                            k.Vastaukset[kysymys.Trim()] = (vastaus, lahteet);
                        }
                        tulos[kv.Key] = k;
                    }
                }
                catch (FormatException e) { Debug.LogWarning("MATKAKIRJA ui linssikysymykset: " + e.Message); }
                aineisto = tulos;
                haussa = false;
            }));
        }
    }
}
