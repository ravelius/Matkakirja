// PULUN VALMIIDEN VASTAUSTEN LATAUS (omistaja 9.10.2026, juna 173; malli ja muoto Peli/PuluValmiit.cs): hakemisto
// pulu/vastaukset/v1/maat.json kerran istunnossa (?t = 10 min:n jakso, CDN), sitten maan paketti <ISO3>.json?v=<versio>
// laitteelle (persistentDataPath/pulu-vastaukset/<ISO3>-<versio>.json), joten se toimii myös ilman verkkoa. Lataus on sama kaikilla
// verkoilla (Raamattu). Nostokortti esilataa kortin maan paketin, jotta Kysy vastaa heti.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class PuluValmiitLataus
    {
        const string Juuri = Kuvat.PeiliJuuri + "pulu/vastaukset/v1/";
        static string Kansio => Path.Combine(Application.persistentDataPath, "pulu-vastaukset");

        /// <summary>
        /// LIVE VAIN KEHITTÄJÄLLE (omistajan linja 9.10.2026: "jos valmista ei löydy, live-polku kehittäjäkoodilla tai myöhemmin
        /// maksullisella lisäosalla"). Pois päältä, kunnes Päätoimittaja vahvistaa käyttöönoton: muuten pelaajilta puuttuisi Pulu
        /// kaikissa maissa, joilla ei vielä ole pakettia. Päällä: valmiin kohdan keskustelussa linkit vain valmiisiin vastauksiin
        /// ja jatkoina kohdan kysymättömät kysymykset (Asetukset.Kehittaja ohittaa).
        /// </summary>
        public static bool LiveVainKehittajalle = false;

        static Dictionary<string, string> hakemisto;
        static bool hakemistoHaussa;
        static readonly Dictionary<string, PuluValmiit> paketit = new Dictionary<string, PuluValmiit>(StringComparer.Ordinal);
        static readonly Dictionary<string, List<Action<PuluValmiit>>> odottajat = new Dictionary<string, List<Action<PuluValmiit>>>(StringComparer.Ordinal);
        static readonly List<Action> hakemistonOdottajat = new List<Action>();

        /// <summary>Maan paketti, jos se on jo muistissa; muuten null (ks. Hae).</summary>
        public static PuluValmiit Muistissa(string maa) => maa != null && paketit.TryGetValue(maa.ToUpperInvariant(), out var p) ? p : null;

        /// <summary>Esilataus (nostokortin avaus): sama kuin Hae ilman kutsujaa.</summary>
        public static void Esilataa(string maa) => Hae(maa, null);

        /// <summary>Maan paketti kutsujalle (null = maalla ei pakettia tai lataus epäonnistui); kutsutaan pääsäikeessä.</summary>
        public static void Hae(string maa, Action<PuluValmiit> valmis)
        {
            if (string.IsNullOrEmpty(maa)) { valmis?.Invoke(null); return; }
            maa = maa.ToUpperInvariant();
            if (paketit.TryGetValue(maa, out var p)) { valmis?.Invoke(p); return; }
            if (odottajat.TryGetValue(maa, out var l)) { if (valmis != null) l.Add(valmis); return; }
            odottajat[maa] = new List<Action<PuluValmiit>>();
            if (valmis != null) odottajat[maa].Add(valmis);
            Hakemisto(() => UiKerros.Hae().StartCoroutine(Lataa(maa)));
        }

        static void Hakemisto(Action valmis)
        {
            if (hakemisto != null) { valmis(); return; }
            hakemistonOdottajat.Add(valmis);
            if (hakemistoHaussa) return;
            hakemistoHaussa = true;
            UiKerros.Hae().StartCoroutine(HaeHakemisto());
        }

        static IEnumerator HaeHakemisto()
        {
            string levy = Path.Combine(Kansio, "maat.json");
            long jakso = DateTimeOffset.UtcNow.ToUnixTimeSeconds() / 600;
            using (var r = UnityWebRequest.Get(Juuri + "maat.json?t=" + jakso))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success && PuluValmiit.LueHakemisto(r.downloadHandler.text) is Dictionary<string, string> h)
                {
                    hakemisto = h;
                    try { Directory.CreateDirectory(Kansio); File.WriteAllText(levy, r.downloadHandler.text); } catch (Exception e) { Debug.Log("MATKAKIRJA pulun valmiit: hakemisto levylle: " + e.Message); }
                }
                else
                {
                    // Ei verkkoa: viimeksi tallennettu hakemisto (muuten tyhjä, jolloin live kuten ennen).
                    try { hakemisto = File.Exists(levy) ? PuluValmiit.LueHakemisto(File.ReadAllText(levy)) : null; } catch { hakemisto = null; }
                    hakemisto ??= new Dictionary<string, string>();
                    Debug.Log("MATKAKIRJA pulun valmiit: hakemisto verkosta ei onnistunut (" + r.error + "), levyltä " + hakemisto.Count + " maata");
                }
            }
            hakemistoHaussa = false;
            var o = hakemistonOdottajat.ToArray();
            hakemistonOdottajat.Clear();
            foreach (var a in o) a();
        }

        static IEnumerator Lataa(string maa)
        {
            PuluValmiit p = null;
            if (hakemisto.TryGetValue(maa, out var versio))
            {
                string levy = Path.Combine(Kansio, maa + "-" + Turva(versio) + ".json");
                try { if (File.Exists(levy)) p = PuluValmiit.Lue(File.ReadAllText(levy)); } catch { p = null; }
                if (p == null)
                {
                    using var r = UnityWebRequest.Get(Juuri + maa + ".json?v=" + UnityWebRequest.EscapeURL(versio));
                    r.timeout = 30;
                    yield return r.SendWebRequest();
                    if (r.result == UnityWebRequest.Result.Success)
                    {
                        p = PuluValmiit.Lue(r.downloadHandler.text);
                        if (p != null) try { Directory.CreateDirectory(Kansio); File.WriteAllText(levy, r.downloadHandler.text); } catch (Exception e) { Debug.Log("MATKAKIRJA pulun valmiit: levylle: " + e.Message); }
                    }
                    else Debug.Log("MATKAKIRJA pulun valmiit: " + maa + " ei latautunut (" + r.error + ")");
                }
                if (p != null) Debug.Log($"MATKAKIRJA pulun valmiit: {maa} {p.Kohdat.Count} kohtaa, {p.Vastauksia} vastausta");
            }
            // Maa ilman pakettia muistetaan tyhjänä istunnon ajan (ei uutta hakua jokaisella kortilla).
            paketit[maa] = p;
            var o = odottajat[maa];
            odottajat.Remove(maa);
            foreach (var a in o) a(p);
        }

        static string Turva(string s) => System.Text.RegularExpressions.Regex.Replace(s ?? "", "[^A-Za-z0-9._-]", "_");

        /// <summary>Nostokortin kohta pakettiin (karttavalon tunnus): kohde:&lt;id&gt; tai nosto:&lt;id&gt;; muut lajit null.</summary>
        public static string Kohta(Nosto n) => n == null ? null
            : n.Laji == NostoLaji.Kohde ? "kohde:" + n.Id : n.Laji == NostoLaji.Takynosto ? "nosto:" + n.Id : null;
    }
}
