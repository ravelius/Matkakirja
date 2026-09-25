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

        /// <summary>
        /// Kuva pienennettynä leveys × korkeus -rajaukseen (peittäen; ylaAsento 1 = yläreuna, 0,5 = keskeltä).
        /// Sama levy- ja verkkoreitti kuin Hae, mutta muistiin jää vain pieni versio: alkuperäinen
        /// puretaan, pienennetään GPU:lla ja vapautetaan (keksijäkarusellin 26 muotokuvaa ~1100 × 1400).
        /// </summary>
        public static void HaePienena(string tiedostoTaiUrl, int leveys, int korkeus, float ylaAsento, Action<Texture2D> valmis, string kansio = "kuvat")
        {
            var reitit = Reitit(tiedostoTaiUrl, kansio);
            if (reitit.Length == 0) { valmis?.Invoke(null); return; }
            string avain = reitit[0] + "@" + leveys + "x" + korkeus;
            if (muisti.TryGetValue(avain, out var t) && t != null) { valmis?.Invoke(t); return; }
            if (kesken.TryGetValue(avain, out var odottajat)) { odottajat.Add(valmis); return; }
            kesken[avain] = new List<Action<Texture2D>> { valmis };
            UiKerros.Hae().StartCoroutine(Lataa(avain, reitit, (alkup, valmisPieni) => PienennaTaustalla(alkup, leveys, korkeus, ylaAsento, px =>
            {
                if (px == null) { valmisPieni(null); return; }
                var t2 = new Texture2D(leveys, korkeus, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp };
                t2.SetPixels32(px);
                t2.Apply(false, false); // luettava: karusellin sumea versio pienennetään tästä
                valmisPieni(t2);
            })));
        }

        /// <summary>
        /// Sama kuin Pienenna, mutta pikselit luetaan AsyncGPUReadbackilla: pääsäie ei pysähdy odottamaan
        /// GPU:ta (Natiiviseppä mittasi ReadPixelsistä 17–24 ms kehyksiä iPadilla). valmis saa pikselit
        /// Texture2D:n rivijärjestyksessä (alin rivi ensin) pääsäikeessä, tai null virheessä.
        /// Luennan rivijärjestys mitataan kerran koekuvalla (grafiikkarajapinnat eroavat).
        /// </summary>
        public static void PienennaTaustalla(Texture lahde, int leveys, int korkeus, float ylaAsento, Action<Color32[]> valmis)
        {
            if (!SystemInfo.supportsAsyncGPUReadback) { valmis(Synkroninen(lahde, leveys, korkeus, ylaAsento)); return; }
            if (luentaKaannetty == null) { MittaaLuenta(() => PienennaTaustalla(lahde, leveys, korkeus, ylaAsento, valmis)); return; }
            var rt = Piirra(lahde, leveys, korkeus, ylaAsento);
            UnityEngine.Rendering.AsyncGPUReadback.Request(rt, 0, TextureFormat.RGBA32, pyynto =>
            {
                Color32[] px = null;
                if (!pyynto.hasError) px = pyynto.GetData<Color32>().ToArray();
                RenderTexture.ReleaseTemporary(rt);
                if (px != null && luentaKaannetty == true) Kaanna(px, leveys, korkeus);
                valmis(px);
            });
        }

        /// <summary>
        /// Esilämmitys (Natiivisepän mittaus: ensimmäinen valokeila 24 ms): RenderTexture, Blit-materiaali ja
        /// AsyncGPUReadback ajetaan kerran koekuvalla ennen ensimmäistä oikeaa kuvaa.
        /// </summary>
        public static void Valmistele()
        {
            if (luentaKaannetty == null && SystemInfo.supportsAsyncGPUReadback) MittaaLuenta(() => { });
        }

        static bool? luentaKaannetty;
        static List<Action> mittausOdottajat;

        /// <summary>Koekuva 1 × 2 (ylärivi punainen): tuleeko luenta ylin rivi ensin (käännettävä) vai alin.</summary>
        static void MittaaLuenta(Action valmis)
        {
            if (mittausOdottajat != null) { mittausOdottajat.Add(valmis); return; }
            mittausOdottajat = new List<Action> { valmis };
            var koe = new Texture2D(1, 2, TextureFormat.RGBA32, false) { filterMode = FilterMode.Point };
            koe.SetPixels32(new[] { new Color32(0, 0, 255, 255), new Color32(255, 0, 0, 255) }); // rivi 0 = alin = sininen
            koe.Apply();
            var rt = RenderTexture.GetTemporary(1, 2, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
            rt.filterMode = FilterMode.Point;
            Graphics.Blit(koe, rt);
            UnityEngine.Rendering.AsyncGPUReadback.Request(rt, 0, TextureFormat.RGBA32, pyynto =>
            {
                bool kaanna = false;
                if (!pyynto.hasError) { var d = pyynto.GetData<Color32>(); kaanna = d.Length >= 2 && d[0].r > d[0].b; }
                RenderTexture.ReleaseTemporary(rt);
                UnityEngine.Object.Destroy(koe);
                luentaKaannetty = kaanna;
                Debug.Log("MATKAKIRJA ui kuvat: GPU-luennan rivit " + (kaanna ? "ylhäältä (käännetään)" : "alhaalta"));
                var odottajat = mittausOdottajat;
                mittausOdottajat = null;
                foreach (var o in odottajat) o();
            });
        }

        static void Kaanna(Color32[] px, int leveys, int korkeus)
        {
            var rivi = new Color32[leveys];
            for (int y = 0; y < korkeus / 2; y++)
            {
                int a = y * leveys, b = (korkeus - 1 - y) * leveys;
                Array.Copy(px, a, rivi, 0, leveys);
                Array.Copy(px, b, px, a, leveys);
                Array.Copy(rivi, 0, px, b, leveys);
            }
        }

        static RenderTexture Piirra(Texture lahde, int leveys, int korkeus, float ylaAsento)
        {
            float suhde = (float)lahde.width / Mathf.Max(1, lahde.height), kohde = (float)leveys / korkeus;
            Vector2 skaala = Vector2.one, siirto = Vector2.zero;
            if (suhde > kohde) { skaala.x = kohde / suhde; siirto.x = (1f - skaala.x) * 0.5f; }
            else { skaala.y = suhde / kohde; siirto.y = (1f - skaala.y) * Mathf.Clamp01(ylaAsento); }
            var rt = RenderTexture.GetTemporary(leveys, korkeus, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
            Graphics.Blit(lahde, rt, skaala, siirto);
            return rt;
        }

        static Color32[] Synkroninen(Texture lahde, int leveys, int korkeus, float ylaAsento)
        {
            var t = Pienenna(lahde, leveys, korkeus, ylaAsento);
            var px = t.GetPixels32();
            UnityEngine.Object.Destroy(t);
            return px;
        }

        /// <summary>Rajaus peittäen (object-fit: cover) ja pienennys GPU:lla luettavaksi tekstuuriksi.</summary>
        public static Texture2D Pienenna(Texture lahde, int leveys, int korkeus, float ylaAsento = 0.5f)
        {
            float suhde = (float)lahde.width / Mathf.Max(1, lahde.height), kohde = (float)leveys / korkeus;
            Vector2 skaala = Vector2.one, siirto = Vector2.zero;
            if (suhde > kohde) { skaala.x = kohde / suhde; siirto.x = (1f - skaala.x) * 0.5f; }
            else { skaala.y = suhde / kohde; siirto.y = (1f - skaala.y) * Mathf.Clamp01(ylaAsento); }
            var rt = RenderTexture.GetTemporary(leveys, korkeus, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
            var ennen = RenderTexture.active;
            try
            {
                Graphics.Blit(lahde, rt, skaala, siirto);
                RenderTexture.active = rt;
                var t = new Texture2D(leveys, korkeus, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp };
                t.ReadPixels(new Rect(0, 0, leveys, korkeus), 0, 0, false);
                t.Apply(false, true);
                return t;
            }
            finally
            {
                RenderTexture.active = ennen;
                RenderTexture.ReleaseTemporary(rt);
            }
        }

        /// <summary>
        /// Lataus ja purku ilman pääsäikeen piikkiä (Natiiviseppä mittasi kaupunkikortin avauksessa
        /// ~33 ms kehyksiä): UnityWebRequestTexture purkaa JPG/PNG:n taustasäikeessä (nonReadable),
        /// laitevälimuisti luetaan file://-osoitteella samaa reittiä ja kirjoitetaan taustasäikeessä.
        /// </summary>
        /// <summary>
        /// Purkuja yhtä aikaa (UI-piikit 24.9.: lehden, kortin ja noston avauksessa EarlyUpdate.ExecuteMainThreadJobs
        /// 20–37 ms, kun kymmenen kuvan tekstuurit valmistuivat samassa kehyksessä). Jono levittää ne kehyksille.
        /// </summary>
        const int PurkujaKerralla = 2;
        static int purkuja;

        static IEnumerator Vuoro()
        {
            while (purkuja >= PurkujaKerralla) yield return null;
            purkuja++;
        }

        static IEnumerator Lataa(string avain, string[] reitit, Action<Texture2D, Action<Texture2D>> muunna = null)
        {
            yield return Vuoro();
            try
            {
                var sisa = LataaVuorossa(avain, reitit, muunna);
                while (sisa.MoveNext()) yield return sisa.Current;
            }
            finally { purkuja--; }
        }

        static IEnumerator LataaVuorossa(string avain, string[] reitit, Action<Texture2D, Action<Texture2D>> muunna)
        {
            Texture2D tulos = null;
            string levy = Valimuisti(reitit[0]);
            // Löydös 63: Unity ei pura WebP:tä (kohdekarttojen miniatyyripiirrokset ovat ämpärissä vain webp:nä),
            // joten webp kulkee ImageIO-purun kautta (Natiivisepän MatkakirjaKuvat_Pura, iOS 14+).
            if (OnWebpOsoite(reitit[0]))
            {
                var w = LataaWebp(avain, reitit, levy, t => tulos = t);
                while (w.MoveNext()) yield return w.Current;
            }
            else if (File.Exists(levy))
            {
                using var l = UnityWebRequestTexture.GetTexture("file://" + levy, true);
                yield return l.SendWebRequest();
                tulos = l.result == UnityWebRequest.Result.Success ? Nimea(DownloadHandlerTexture.GetContent(l), avain) : null;
                if (tulos == null) try { File.Delete(levy); } catch (IOException) { }
            }
            for (int i = 0; tulos == null && !OnWebpOsoite(reitit[0]) && i < reitit.Length; i++)
            {
                using var p = UnityWebRequestTexture.GetTexture(reitit[i], true);
                p.timeout = 20;
                float hakuAlku = Time.realtimeSinceStartup;
                yield return p.SendWebRequest();
                VerkkoOdotus.Haku("kuva", (Time.realtimeSinceStartup - hakuAlku) * 1000.0, (long)p.downloadedBytes);
                if (p.result != UnityWebRequest.Result.Success) continue;
                tulos = Nimea(DownloadHandlerTexture.GetContent(p), avain);
                if (tulos == null) continue;
                var tavut = p.downloadHandler.data;
                if (tavut == null || tavut.Length < 16) continue;
                System.Threading.Tasks.Task.Run(() =>
                {
                    try
                    {
                        Directory.CreateDirectory(Path.GetDirectoryName(levy));
                        File.WriteAllBytes(levy, tavut);
                    }
                    catch (IOException e) { Debug.LogWarning("MATKAKIRJA ui kuva: " + e.Message); }
                });
            }
            if (tulos != null && muunna != null)
            {
                Texture2D pieni = null;
                bool valmis = false;
                var alkup = tulos;
                try { muunna(alkup, t => { pieni = t; valmis = true; }); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui kuva: pienennys " + e.Message); valmis = true; }
                while (!valmis) yield return null;
                UnityEngine.Object.Destroy(alkup);
                tulos = pieni != null ? Nimea(pieni, avain) : null;
            }
            // Kysely pois lokista: kehittäjän kuratointikuvien osoitteissa on avain (?avain=).
            if (tulos == null) Debug.LogWarning("MATKAKIRJA ui kuva ei latautunut: " + reitit[0].Split('?')[0]);
            else Muista(avain, tulos);
            if (kesken.TryGetValue(avain, out var odottajat))
            {
                kesken.Remove(avain);
                foreach (var o in odottajat) { try { o?.Invoke(tulos); } catch (Exception e) { Debug.LogException(e); } }
            }
        }

        static bool OnWebpOsoite(string url) => url != null && url.Split('?')[0].EndsWith(".webp", StringComparison.OrdinalIgnoreCase);

        /// <summary>
        /// WebP: tavut laitevälimuistista tai verkosta, purku taustasäikeessä ImageIO:lla (RGBA8 + mipit,
        /// esikerrottu alfa, rivi 0 alhaalla) ja alfa takaisin suoraksi, koska UI Toolkit piirtää suoralla
        /// alfalla (esikerrottu tummentaisi piirrosten häivytetyt reunat). Editorissa ei purkua (null).
        /// </summary>
        static IEnumerator LataaWebp(string avain, string[] reitit, string levy, Action<Texture2D> valmis)
        {
            byte[] tavut = null;
            if (File.Exists(levy))
            {
                var luku = System.Threading.Tasks.Task.Run(() => { try { return File.ReadAllBytes(levy); } catch (IOException) { return null; } });
                while (!luku.IsCompleted) yield return null;
                tavut = luku.Result;
            }
            bool verkosta = false;
            for (int i = 0; (tavut == null || tavut.Length < 16) && i < reitit.Length; i++)
            {
                using var p = UnityWebRequest.Get(reitit[i]);
                p.timeout = 20;
                float hakuAlku = Time.realtimeSinceStartup;
                yield return p.SendWebRequest();
                VerkkoOdotus.Haku("kuva", (Time.realtimeSinceStartup - hakuAlku) * 1000.0, (long)p.downloadedBytes);
                if (p.result == UnityWebRequest.Result.Success) { tavut = p.downloadHandler.data; verkosta = true; }
            }
            if (tavut == null || tavut.Length < 16) { valmis(null); yield break; }
#if UNITY_IOS && !UNITY_EDITOR
            var tyo = System.Threading.Tasks.Task.Run(() =>
            {
                IntPtr d = MatkakirjaKuvat_Pura(tavut, tavut.Length, 0, out int w, out int h, out int koko);
                byte[] rgba = null;
                if (d != IntPtr.Zero)
                {
                    rgba = new byte[koko];
                    System.Runtime.InteropServices.Marshal.Copy(d, rgba, 0, koko);
                    MatkakirjaKuvat_Vapauta(d);
                    // Esikerrottu → suora alfa (kaikki mip-tasot ovat samassa puskurissa peräkkäin).
                    for (int j = 0; j + 3 < rgba.Length; j += 4)
                    {
                        int a = rgba[j + 3];
                        if (a == 0 || a == 255) continue;
                        rgba[j] = (byte)Math.Min(255, rgba[j] * 255 / a);
                        rgba[j + 1] = (byte)Math.Min(255, rgba[j + 1] * 255 / a);
                        rgba[j + 2] = (byte)Math.Min(255, rgba[j + 2] * 255 / a);
                    }
                }
                return (rgba, w, h);
            });
            while (!tyo.IsCompleted) yield return null;
            var (data, leveys, korkeus) = tyo.Result;
            if (data == null) { valmis(null); yield break; }
            var t = new Texture2D(leveys, korkeus, TextureFormat.RGBA32, true);
            try { t.LoadRawTextureData(data); t.Apply(false, true); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui kuva webp: " + e.Message); UnityEngine.Object.Destroy(t); valmis(null); yield break; }
            if (verkosta)
                System.Threading.Tasks.Task.Run(() =>
                {
                    try { Directory.CreateDirectory(Path.GetDirectoryName(levy)); File.WriteAllBytes(levy, tavut); }
                    catch (IOException e) { Debug.LogWarning("MATKAKIRJA ui kuva: " + e.Message); }
                });
            valmis(Nimea(t, avain));
#else
            valmis(null);
#endif
        }

#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        static extern IntPtr MatkakirjaKuvat_Pura(byte[] tavut, int pituus, int sivu, out int leveys, out int korkeus, out int koko);
        [System.Runtime.InteropServices.DllImport("__Internal")]
        static extern void MatkakirjaKuvat_Vapauta(IntPtr puskuri);
#endif

        static Texture2D Nimea(Texture2D t, string nimi)
        {
            if (t == null || t.width <= 8) { if (t != null) UnityEngine.Object.Destroy(t); return null; }
            t.name = nimi;
            t.wrapMode = TextureWrapMode.Clamp;
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
