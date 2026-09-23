// KUVAT: sisältöpaketin kuvat ämpäristä UI:lle (Natiivi-UI, erä 2).
//
// Commons-tiedostonimi → ämpärin peilipolku samalla säännöllä kuin
// verkkopeli (js/media.js turvanimi + peiliKuvaPolku; tools/vienti/media.mjs
// kuva-commons): kuvat/<turvanimi>.<pääte>, liput liput/…, SVG → PNG.
// Reitit järjestyksessä: ämpäri → Commons (Special:FilePath?width=…).
// Ladattu kuva tallennetaan laitteelle (persistentDataPath/kuvat/<avain>),
// joten sama kuva ei lataudu toiseen kertaan, ja muistissa pidetään
// viimeisimmät tekstuurit (Muistissa kpl).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class Kuvat
    {
        public const string PeiliJuuri = "https://media.matkakirja.app/";
        const int Muistissa = 48;

        static readonly Dictionary<string, Texture2D> muisti = new Dictionary<string, Texture2D>();
        static readonly LinkedList<string> jarjestys = new LinkedList<string>();
        static readonly Dictionary<string, List<Action<Texture2D>>> kesken = new Dictionary<string, List<Action<Texture2D>>>();

        // --- webin nimeämissääntö (js/media.js) --------------------------------

        static readonly Regex EiTurva = new Regex("[^a-zA-Z0-9._-]+", RegexOptions.Compiled);
        static readonly Regex Reunaviivat = new Regex("^-+|-+$", RegexOptions.Compiled);
        static readonly Regex Kirjain = new Regex("[a-z]", RegexOptions.Compiled);

        /// <summary>js/media.js turvanimi (peilin nimeämissäännön kopio, pidä identtisenä).</summary>
        public static string Turvanimi(string teksti, string pate)
        {
            var hajotettu = teksti.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(hajotettu.Length);
            foreach (char c in hajotettu) if (c < '̀' || c > 'ͯ') sb.Append(c);
            string puhdas = EiTurva.Replace(sb.ToString(), "-");
            puhdas = Reunaviivat.Replace(puhdas, "").ToLowerInvariant();
            if (puhdas.Length > 90) puhdas = puhdas.Substring(0, 90);
            string nimi = Kirjain.IsMatch(puhdas) ? puhdas : "kuva-" + Tiiviste(teksti);
            return pate != null ? nimi + "." + pate : nimi;
        }

        /// <summary>FNV-1a 32 bittiä UTF-16-yksiköistä, base36 (js/media.js tiiviste).</summary>
        static string Tiiviste(string teksti)
        {
            uint luku = 0x811c9dc5;
            foreach (char c in teksti) { luku ^= c; luku = unchecked(luku * 0x01000193); }
            if (luku == 0) return "0";
            const string Merkit = "0123456789abcdefghijklmnopqrstuvwxyz";
            var sb = new StringBuilder();
            while (luku > 0) { sb.Insert(0, Merkit[(int)(luku % 36)]); luku /= 36; }
            return sb.ToString();
        }

        /// <summary>Commons-tiedostonimestä peilin polku (kansio "kuvat" tai "liput").</summary>
        public static string PeiliKuvaPolku(string tiedosto, string kansio = "kuvat")
        {
            int piste = tiedosto.LastIndexOf('.');
            string pate = piste >= 0 ? tiedosto.Substring(piste + 1) : "jpg";
            pate = Regex.Replace(pate.ToLowerInvariant(), "[^a-z0-9]", "");
            if (pate.Length == 0) pate = "jpg";
            string runko = piste >= 0 ? tiedosto.Substring(0, piste) : tiedosto;
            return kansio + "/" + Turvanimi(runko, pate == "svg" ? "png" : pate);
        }

        /// <summary>Commonsin pienennös (Special:FilePath?width=, PNG myös SVG:stä).</summary>
        public static string CommonsUrl(string tiedosto, int leveys) =>
            "https://commons.wikimedia.org/wiki/Special:FilePath/" + Uri.EscapeDataString(tiedosto.Replace(' ', '_'))
            + "?width=" + leveys.ToString(CultureInfo.InvariantCulture);

        /// <summary>Kuvan reitit: https-osoite sellaisenaan, Commons-nimi → ämpäri + Commons.</summary>
        public static string[] Reitit(string tiedostoTaiUrl, string kansio = "kuvat", int leveys = 1024)
        {
            if (string.IsNullOrEmpty(tiedostoTaiUrl)) return new string[0];
            if (tiedostoTaiUrl.StartsWith("https://") || tiedostoTaiUrl.StartsWith("http://")) return new[] { tiedostoTaiUrl };
            // Pelin oma kuva (tuotanto/…, assets/…): peilissä samalla polulla julisteiden alla.
            if (tiedostoTaiUrl.Contains("/")) return new[] { PeiliJuuri + "julisteet/" + tiedostoTaiUrl };
            return new[] { PeiliJuuri + PeiliKuvaPolku(tiedostoTaiUrl, kansio), CommonsUrl(tiedostoTaiUrl, leveys) };
        }

        // --- lataus --------------------------------------------------------------

        static string Valimuisti(string url)
        {
            string nimi = url.StartsWith(PeiliJuuri) ? url.Substring(PeiliJuuri.Length).Replace('/', '_') : "u-" + Tiiviste(url) + ".img";
            return Path.Combine(Application.persistentDataPath, "kuvat", nimi);
        }

        /// <summary>
        /// Lataa kuvan (Commons-nimi tai https-osoite). valmis(null) = ei saatu.
        /// Kutsutaan pääsäikeestä; valmis kutsutaan pääsäikeessä.
        /// </summary>
        public static void Hae(string tiedostoTaiUrl, Action<Texture2D> valmis, string kansio = "kuvat")
        {
            var reitit = Reitit(tiedostoTaiUrl, kansio);
            if (reitit.Length == 0) { valmis?.Invoke(null); return; }
            string avain = reitit[0];
            if (muisti.TryGetValue(avain, out var t) && t != null)
            {
                jarjestys.Remove(avain);
                jarjestys.AddFirst(avain);
                valmis?.Invoke(t);
                return;
            }
            if (kesken.TryGetValue(avain, out var odottajat)) { odottajat.Add(valmis); return; }
            kesken[avain] = new List<Action<Texture2D>> { valmis };
            UiKerros.Hae().StartCoroutine(Lataa(avain, reitit));
        }

        static IEnumerator Lataa(string avain, string[] reitit)
        {
            Texture2D tulos = null;
            string levy = Valimuisti(reitit[0]);
            if (File.Exists(levy))
            {
                tulos = Pura(File.ReadAllBytes(levy), avain);
                if (tulos == null) File.Delete(levy);
            }
            for (int i = 0; tulos == null && i < reitit.Length; i++)
            {
                using var p = UnityWebRequest.Get(reitit[i]);
                p.timeout = 20;
                yield return p.SendWebRequest();
                if (p.result != UnityWebRequest.Result.Success) continue;
                var tavut = p.downloadHandler.data;
                tulos = Pura(tavut, avain);
                if (tulos == null) continue;
                try
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(levy));
                    File.WriteAllBytes(levy, tavut);
                }
                catch (IOException e) { Debug.LogWarning("MATKAKIRJA ui kuva: " + e.Message); }
            }
            if (tulos == null) Debug.LogWarning("MATKAKIRJA ui kuva ei latautunut: " + reitit[0]);
            else Muista(avain, tulos);
            if (kesken.TryGetValue(avain, out var odottajat))
            {
                kesken.Remove(avain);
                foreach (var o in odottajat) { try { o?.Invoke(tulos); } catch (Exception e) { Debug.LogException(e); } }
            }
        }

        static Texture2D Pura(byte[] tavut, string nimi)
        {
            if (tavut == null || tavut.Length < 16) return null;
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, false) { name = nimi, wrapMode = TextureWrapMode.Clamp };
            if (!t.LoadImage(tavut, true)) { UnityEngine.Object.Destroy(t); return null; }
            return t;
        }

        static void Muista(string avain, Texture2D t)
        {
            muisti[avain] = t;
            jarjestys.AddFirst(avain);
            while (jarjestys.Count > Muistissa)
            {
                string vanha = jarjestys.Last.Value;
                jarjestys.RemoveLast();
                if (muisti.TryGetValue(vanha, out var vt) && vt != null) UnityEngine.Object.Destroy(vt);
                muisti.Remove(vanha);
            }
        }
    }
}
