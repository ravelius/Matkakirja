using System;
using System.Collections;
using System.Collections.Concurrent;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// Paikallinen laattapalvelin (127.0.0.1) Cesiumin ja ämpärin väliin. Cesium hakee
    /// pallolaatat ja maaston osoitteesta http://127.0.0.1:portti/r/&lt;ämpärin polku&gt;, ja
    /// palvelin vastaa järjestyksessä:
    ///   1. offline-kansiosta (Alueet: maittain ladattu, persistentDataPath/offline/, ei iCloud-varmuuskopiota),
    ///   2. välimuistista (temporaryCachePath/laatat/, iOS saa tyhjentää),
    ///   3. verkosta (UnityWebRequest pääsäikeessä, NSURLSession), joka tallentaa välimuistiin.
    /// Näin sama polku toimii striimauksessa ja offline-tilassa, eikä Cesiumin
    /// 4096 kohteen SQLite-välimuisti rajoita.
    ///
    /// iOS: Info.plistiin NSAllowsLocalNetworking (Rakennus.PaikallinenVerkkoPlist).
    /// </summary>
    [DefaultExecutionOrder(-1000)]
    public class Laattapalvelin : MonoBehaviour
    {
        public const string Ampari = "https://media.matkakirja.app/";
        public static Laattapalvelin Instanssi { get; private set; }
        /// <summary>Paikallinen juuri, esim. http://127.0.0.1:52100/r/ (null ennen käynnistystä).</summary>
        public static string Juuri { get; private set; }

        public static string OfflineKansio => Path.Combine(Application.persistentDataPath, "offline");
        public static string ValimuistiKansio => Path.Combine(Application.temporaryCachePath, "laatat");

        [Tooltip("Rinnakkaiset verkkohaut (UnityWebRequest).")]
        public int rinnakkain = 12;
        [Tooltip("Välimuistin yläraja megatavuina; käynnistyksessä karsitaan vanhimmat 75 %:iin (offline-kansio ei kuulu tähän).")]
        public int valimuistiMt = 600;

        TcpListener kuuntelija;
        CancellationTokenSource lopetus;
        readonly ConcurrentQueue<Haku> jono = new ConcurrentQueue<Haku>();
        int kaynnissa;
        string offline, valimuisti;

        /// <summary>Tilastot testaukseen: osumat offline / välimuisti / verkko, virheet.</summary>
        public static int Offline, Valimuistista, Verkosta, Virheita;

        sealed class Haku
        {
            public string Polku;
            public TaskCompletionSource<(int tila, byte[] data)> Valmis =
                new TaskCompletionSource<(int, byte[])>(TaskCreationOptions.RunContinuationsAsynchronously);
        }

        /// <summary>Muuntaa ämpärin osoitteen paikalliseksi (muut osoitteet sellaisenaan).</summary>
        public static string Paikallinen(string url) =>
            Juuri != null && url != null && url.StartsWith(Ampari) ? Juuri + url.Substring(Ampari.Length) : url;

        /// <summary>Tiedostopolku ämpärin polulle (kysely mukaan, jotta ?v=-versiot eivät sekoitu).</summary>
        public static string Tiedosto(string juuri, string polku)
        {
            int q = polku.IndexOf('?');
            string perus = q < 0 ? polku : polku.Substring(0, q);
            if (q >= 0)
            {
                // Cesium lisää maastolaattoihin extensions=…; staattinen tiedosto ei riipu siitä,
                // joten avain on sama kuin Alueiden lataamalla (layer.jsonin tiles-pohja).
                var osat = new System.Collections.Generic.List<string>();
                foreach (var o in polku.Substring(q + 1).Split('&'))
                    if (o.Length > 0 && !o.StartsWith("extensions=")) osat.Add(o);
                if (osat.Count > 0) perus += "__" + string.Join("_", osat).Replace('/', '_').Replace('=', '-');
            }
            return Path.Combine(juuri, perus.Replace('/', Path.DirectorySeparatorChar));
        }

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(this); return; }
            Instanssi = this;
            offline = OfflineKansio;
            valimuisti = ValimuistiKansio;
            Directory.CreateDirectory(offline);
            Directory.CreateDirectory(valimuisti);
#if UNITY_IOS && !UNITY_EDITOR
            UnityEngine.iOS.Device.SetNoBackupFlag(offline);
#endif
            try
            {
                kuuntelija = new TcpListener(IPAddress.Loopback, 0);
                kuuntelija.Start(64);
                int portti = ((IPEndPoint)kuuntelija.LocalEndpoint).Port;
                Juuri = $"http://127.0.0.1:{portti}/r/";
                lopetus = new CancellationTokenSource();
                _ = Task.Run(() => Kuuntele(lopetus.Token));
                Debug.Log("MATKAKIRJA laattapalvelin: " + Juuri);
                OhjaaCesium();
                long raja = (long)valimuistiMt * 1048576;
                _ = Task.Run(() => Karsi(valimuisti, raja));
            }
            catch (Exception e)
            {
                Juuri = null;
                Debug.LogWarning("MATKAKIRJA laattapalvelin ei käynnistynyt, Cesium hakee suoraan: " + e.Message);
            }
        }

        /// <summary>Karsii välimuistin vanhimmat tiedostot (viimeisin käyttö = muokkausaika), kun koko ylittää rajan.</summary>
        static void Karsi(string kansio, long raja)
        {
            try
            {
                var tiedostot = new DirectoryInfo(kansio).GetFiles("*", SearchOption.AllDirectories);
                long koko = 0;
                foreach (var f in tiedostot) koko += f.Length;
                if (koko <= raja) return;
                Array.Sort(tiedostot, (x, y) => x.LastWriteTimeUtc.CompareTo(y.LastWriteTimeUtc));
                long tavoite = raja * 3 / 4;
                int poistettu = 0;
                foreach (var f in tiedostot)
                {
                    if (koko <= tavoite) break;
                    try { koko -= f.Length; f.Delete(); poistettu++; } catch { }
                }
                Debug.Log($"MATKAKIRJA laattapalvelin: välimuisti karsittu, {poistettu} tiedostoa pois, {koko / 1048576} Mt jäljellä");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA laattapalvelin: karsinta epäonnistui: " + e.Message); }
        }

        /// <summary>Kohtauksen pallo (maasto) ja pohjalaatat hakemaan palvelimen kautta.</summary>
        static void OhjaaCesium()
        {
            foreach (var t in FindObjectsByType<CesiumForUnity.Cesium3DTileset>(FindObjectsSortMode.None))
                t.url = Paikallinen(t.url);
            foreach (var o in FindObjectsByType<CesiumForUnity.CesiumUrlTemplateRasterOverlay>(FindObjectsSortMode.None))
                o.templateUrl = Paikallinen(o.templateUrl);
        }

        void OnDestroy()
        {
            if (Instanssi != this) return;
            lopetus?.Cancel();
            try { kuuntelija?.Stop(); } catch { }
            Instanssi = null;
            Juuri = null;
        }

        async Task Kuuntele(CancellationToken peru)
        {
            while (!peru.IsCancellationRequested)
            {
                TcpClient asiakas;
                try { asiakas = await kuuntelija.AcceptTcpClientAsync(); }
                catch { if (peru.IsCancellationRequested) return; continue; }
                _ = Task.Run(() => Palvele(asiakas));
            }
        }

        async Task Palvele(TcpClient asiakas)
        {
            using (asiakas)
            {
                try
                {
                    asiakas.NoDelay = true;
                    var virta = asiakas.GetStream();
                    // Keep-alive: palvellaan pyyntöjä samasta yhteydestä, kunnes asiakas sulkee.
                    while (true)
                    {
                        string otsake = await LueOtsake(virta);
                        if (otsake == null) return;
                        int eka = otsake.IndexOf(' '), toka = eka < 0 ? -1 : otsake.IndexOf(' ', eka + 1);
                        if (eka < 0 || toka < 0) return;
                        string metodi = otsake.Substring(0, eka);
                        string kohde = otsake.Substring(eka + 1, toka - eka - 1);
                        bool sulje = otsake.IndexOf("Connection: close", StringComparison.OrdinalIgnoreCase) >= 0;
                        (int tila, byte[] data) vastaus = (404, null);
                        if (kohde.StartsWith("/r/")) vastaus = await Hae(kohde.Substring(3));
                        await Vastaa(virta, vastaus.tila, vastaus.data, kohde, metodi == "HEAD");
                        if (sulje) return;
                    }
                }
                catch (Exception) { /* asiakas sulki */ }
            }
        }

        static async Task<string> LueOtsake(NetworkStream virta)
        {
            // GET-pyynnöissä ei ole runkoa, eikä NSURLSession putkita: luetaan kunnes \r\n\r\n.
            var puskuri = new byte[8192];
            int n = 0;
            while (n < puskuri.Length)
            {
                int k = await virta.ReadAsync(puskuri, n, puskuri.Length - n);
                if (k == 0) return n == 0 ? null : Encoding.ASCII.GetString(puskuri, 0, n);
                n += k;
                for (int i = Math.Max(0, n - k - 3); i + 3 < n; i++)
                    if (puskuri[i] == '\r' && puskuri[i + 1] == '\n' && puskuri[i + 2] == '\r' && puskuri[i + 3] == '\n')
                        return Encoding.ASCII.GetString(puskuri, 0, n);
            }
            return null;
        }

        static async Task Vastaa(NetworkStream virta, int tila, byte[] data, string kohde, bool vainOtsake)
        {
            string tyyppi = kohde.Contains(".terrain") ? "application/vnd.quantized-mesh"
                : kohde.Contains(".json") ? "application/json"
                : kohde.Contains(".png") ? "image/png"
                : kohde.Contains(".webp") ? "image/webp" : "image/jpeg";
            int pituus = data?.Length ?? 0;
            string teksti = tila == 200 ? "OK" : tila == 404 ? "Not Found" : "Bad Gateway";
            var o = Encoding.ASCII.GetBytes(
                $"HTTP/1.1 {tila} {teksti}\r\nContent-Type: {tyyppi}\r\nContent-Length: {pituus}\r\n" +
                "Cache-Control: no-store\r\nAccess-Control-Allow-Origin: *\r\nConnection: keep-alive\r\n\r\n");
            await virta.WriteAsync(o, 0, o.Length);
            if (!vainOtsake && pituus > 0) await virta.WriteAsync(data, 0, pituus);
            await virta.FlushAsync();
        }

        /// <summary>Hakee ämpärin polun: offline → välimuisti → verkko (tallentaa välimuistiin).</summary>
        async Task<(int, byte[])> Hae(string polku)
        {
            polku = Uri.UnescapeDataString(polku);
            if (polku.Contains("..")) return (404, null);
            string f = Tiedosto(offline, polku);
            if (File.Exists(f)) { Interlocked.Increment(ref Offline); return (200, File.ReadAllBytes(f)); }
            f = Tiedosto(valimuisti, polku);
            if (File.Exists(f))
            {
                Interlocked.Increment(ref Valimuistista);
                var data = File.ReadAllBytes(f);
                try { File.SetLastWriteTimeUtc(f, DateTime.UtcNow); } catch { }
                return (200, data);
            }
            var h = new Haku { Polku = polku };
            jono.Enqueue(h);
            var (tila, data) = await h.Valmis.Task;
            if (tila == 200 && data != null)
            {
                Interlocked.Increment(ref Verkosta);
                try
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(f));
                    string tmp = f + "." + Guid.NewGuid().ToString("N") + ".tmp";
                    File.WriteAllBytes(tmp, data);
                    if (File.Exists(f)) File.Delete(tmp); else File.Move(tmp, f);
                }
                catch (Exception) { /* välimuisti on valinnainen */ }
            }
            else Interlocked.Increment(ref Virheita);
            return (tila, data);
        }

        void Update()
        {
            while (kaynnissa < rinnakkain && jono.TryDequeue(out var h)) StartCoroutine(Lataa(h));
        }

        IEnumerator Lataa(Haku h)
        {
            kaynnissa++;
            using (var r = UnityWebRequest.Get(Ampari + h.Polku))
            {
                r.timeout = 30;
                yield return r.SendWebRequest();
                kaynnissa--;
                if (r.result == UnityWebRequest.Result.Success) h.Valmis.TrySetResult((200, r.downloadHandler.data));
                else h.Valmis.TrySetResult(((int)(r.responseCode > 0 ? r.responseCode : 502), null));
            }
        }

        /// <summary>
        /// Tallentaa yhden ämpärin polun offline-kansioon (Alueet). Palauttaa tavut tai -1.
        /// Käytetään korutiinina pääsäikeessä.
        /// </summary>
        public static IEnumerator LataaOffline(string polku, Action<long> valmis)
        {
            string f = Tiedosto(OfflineKansio, polku);
            if (File.Exists(f)) { valmis(new FileInfo(f).Length); yield break; }
            string v = Tiedosto(ValimuistiKansio, polku);
            if (File.Exists(v))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(f));
                File.Copy(v, f, true);
                valmis(new FileInfo(f).Length);
                yield break;
            }
            using var r = UnityWebRequest.Get(Ampari + polku);
            r.timeout = 30;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { valmis(r.responseCode == 404 ? 0 : -1); yield break; }
            Directory.CreateDirectory(Path.GetDirectoryName(f));
            File.WriteAllBytes(f, r.downloadHandler.data);
            valmis(r.downloadHandler.data.Length);
        }
    }
}
