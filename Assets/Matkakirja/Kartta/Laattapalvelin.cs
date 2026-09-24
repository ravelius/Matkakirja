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
        /// <summary>Huntulaatat (pieniä, 3 kt) ohi jonon: näkyvän alueen huntu ehtii ennen kuin laatta näkyy ilman sitä.</summary>
        readonly ConcurrentQueue<Haku> kiireJono = new ConcurrentQueue<Haku>();
        int kaynnissa;
        string offline, valimuisti;

        /// <summary>Tilastot testaukseen: osumat offline / välimuisti / verkko, virheet, varakuvat.</summary>
        public static int Offline, Valimuistista, Verkosta, Virheita, Varakuvia;

        /// <summary>
        /// Näkyvän kartan laattoja haussa (jonossa tai käynnissä): Alueet hidastaa offline-latauksen,
        /// jotta näkyvä näkymä latautuu ensin (omistajan build 5 -löydös 13).
        /// </summary>
        public static bool Kiireinen => Instanssi != null && (Instanssi.kaynnissa > 0 || !Instanssi.jono.IsEmpty || !Instanssi.kiireJono.IsEmpty);

        /// <summary>
        /// Pohjalaatan polun alku (Rakennus.LaattaUrl ilman ämpäriä): jos tällainen laatta ei tule
        /// uusintayrityksistä huolimatta, Cesiumille annetaan pergamentin värinen varalaatta eikä virhettä,
        /// koska Cesium piirtää epäonnistuneen rasterin mustana eikä yritä uudelleen. Varakuvaa ei
        /// tallenneta välimuistiin, joten laatta haetaan uudelleen, kun Cesium lataa sen seuraavan kerran.
        /// </summary>
        public static string PohjaPolku;
        static byte[] varakuva;
        /// <summary>
        /// Väritason tyhjä laatta (läpinäkyvä, Varitaso): kaukonäkymän tasot (z &lt; alin taso, web: ei huntua
        /// maailmanäkymässä) ja puuttuvat laatat ilman verkkoa. Cesium piirtäisi epäonnistuneen laatan mustana.
        /// </summary>
        static byte[] tyhjakuva;
        sealed class VariKansio { public double[] Alue; public string Maailma; public int Alin; }
        static readonly ConcurrentDictionary<string, VariKansio> varialueet = new ConcurrentDictionary<string, VariKansio>();

        /// <summary>
        /// Väritason maakansio (ämpärin polku, "/"-loppuinen), sen alue asteina, maailman sarjan kansio
        /// (alueen ulkopuoliset laatat haetaan sieltä samalla z/x/y:llä; null = läpinäkyvä) ja alin taso.
        /// </summary>
        public static void VariAlue(string kansio, double lon0, double lat0, double lon1, double lat1, string maailma, int alin) =>
            varialueet[kansio] = new VariKansio { Alue = new[] { lon0, lat0, lon1, lat1 }, Maailma = maailma, Alin = alin };

        /// <summary>
        /// Väritason pyynnön ohjaus: tyhja = läpinäkyvä laatta heti; muuten polku (alueen ulkopuolella maailman
        /// sarjan laatta). varitasoa = polku kuuluu väritasoon (virhe → tyhjä, ei mustaa).
        /// </summary>
        static string VariOhjaus(string polku, out bool varitasoa, out bool tyhja)
        {
            varitasoa = tyhja = false;
            foreach (var p in varialueet)
            {
                if (!polku.StartsWith(p.Key, StringComparison.Ordinal)) continue;
                varitasoa = true;
                string loppu = polku.Substring(p.Key.Length);
                var osat = loppu.Split('/');
                if (osat.Length != 3) return polku;
                int piste = osat[2].IndexOf('.');
                if (!int.TryParse(osat[0], out int z) || !int.TryParse(osat[1], out int x)
                    || !int.TryParse(piste < 0 ? osat[2] : osat[2].Substring(0, piste), out int y)) return polku;
                if (z < p.Value.Alin) { tyhja = true; return polku; }
                double n = 1 << z, a = p.Value.Alue[0], e = p.Value.Alue[1], i = p.Value.Alue[2], ps = p.Value.Alue[3];
                double lonL = x / n * 360 - 180, lonI = (x + 1) / n * 360 - 180;
                double latP = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
                double latE = Math.Atan(Math.Sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI;
                bool ulkona = lonI <= a || lonL >= i || latP <= e || latE >= ps;
                if (!ulkona) return polku;
                if (p.Value.Maailma == null) { tyhja = true; return polku; }
                return p.Value.Maailma + loppu;
            }
            return polku;
        }

        [Tooltip("Varalaatan väri (pergamentti, meren ja maan välissä).")]
        public Color32 varavari = new Color32(0xd9, 0xd0, 0xbb, 0xff);

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
            if (varakuva == null)
            {
                var t = new Texture2D(256, 256, TextureFormat.RGB24, false);
                var px = new Color32[256 * 256];
                for (int i = 0; i < px.Length; i++) px[i] = varavari;
                t.SetPixels32(px);
                t.Apply(false);
                varakuva = t.EncodeToJPG(85);
                Destroy(t);
            }
            if (tyhjakuva == null)
            {
                var t = new Texture2D(256, 256, TextureFormat.RGBA32, false);
                t.SetPixels32(new Color32[256 * 256]);
                t.Apply(false);
                // PNG .webp-osoitteessa: Cesium tunnistaa kuvan tavuista, ei päätteestä.
                tyhjakuva = t.EncodeToPNG();
                Destroy(t);
            }
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
            {
                // Pohjakerros (taso 0 alkaen) saa varalaatan; linssien ja alueiden kerrokset eivät.
                string u = o.templateUrl;
                int z = u != null ? u.IndexOf("{z}", StringComparison.Ordinal) : -1;
                if (o.minimumLevel == 0 && z > 0 && u.StartsWith(Ampari) && u.Contains("pallo/laatat/"))
                    PohjaPolku = u.Substring(Ampari.Length, z - Ampari.Length);
                o.templateUrl = Paikallinen(u);
            }
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
                : kohde.Contains(".json") || kohde.Contains(".geojson") ? "application/json"
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
            polku = VariOhjaus(polku, out bool varitasoa, out bool tyhja);
            if (tyhja && tyhjakuva != null) return (200, tyhjakuva);
            string f = Tiedosto(offline, polku);
            if (File.Exists(f)) { Interlocked.Increment(ref Offline); return (200, File.ReadAllBytes(f)); }
            f = Tiedosto(valimuisti, polku);
            if (File.Exists(f))
            {
                Interlocked.Increment(ref Valimuistista);
                var sisalto = File.ReadAllBytes(f);
                try { File.SetLastWriteTimeUtc(f, DateTime.UtcNow); } catch { }
                return (200, sisalto);
            }
            var h = new Haku { Polku = polku };
            (varitasoa ? kiireJono : jono).Enqueue(h);
            var (tila, data) = await h.Valmis.Task;
            if (tila != 200 && varakuva != null && PohjaPolku != null && polku.StartsWith(PohjaPolku))
            {
                Interlocked.Increment(ref Varakuvia);
                varalla.TryAdd(polku, 0);
                return (200, varakuva);
            }
            // Väritason puuttuva laatta: läpinäkyvä (Cesium piirtäisi epäonnistuneen mustana).
            if (tila != 200 && varitasoa && tyhjakuva != null) return (200, tyhjakuva);
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

        /// <summary>
        /// Pohjalaatat, joiden tilalle annettiin varalaatta. Cesium ei hae laattaa uudelleen (se sai vastauksen),
        /// joten pergamenttinen suorakulmio jäisi kartalle (Laitetestaaja 24.9.: umpikerma Espanjan–Saharan yllä).
        /// Ne haetaan uudelleen rauhallisena hetkenä, ja kun yksikin onnistuu, pohjakerros ladataan uudelleen
        /// Cesiumiin (laatat tulevat nyt välimuistista).
        /// </summary>
        readonly ConcurrentDictionary<string, byte> varalla = new ConcurrentDictionary<string, byte>();
        float seuraavaUusinta;
        bool uusintaKesken;

        void Update()
        {
            // Huntulaatoille neljä lisäpaikkaa, jotta ne eivät jää suurten pohja- ja maastolaattojen taakse.
            while (kaynnissa < rinnakkain + 4 && kiireJono.TryDequeue(out var k)) StartCoroutine(Lataa(k));
            while (kaynnissa < rinnakkain && jono.TryDequeue(out var h)) StartCoroutine(Lataa(h));
            if (!uusintaKesken && !varalla.IsEmpty && Time.unscaledTime >= seuraavaUusinta && !Kiireinen)
            {
                seuraavaUusinta = Time.unscaledTime + 10f;
                StartCoroutine(UusiVaralaatat());
            }
        }

        IEnumerator UusiVaralaatat()
        {
            uusintaKesken = true;
            int onnistui = 0;
            foreach (var polku in new System.Collections.Generic.List<string>(varalla.Keys))
            {
                var h = new Haku { Polku = polku };
                yield return Lataa(h);
                var (tila, data) = h.Valmis.Task.Result;
                if (tila != 200 || data == null) continue;
                try
                {
                    string f = Tiedosto(valimuisti, polku);
                    Directory.CreateDirectory(Path.GetDirectoryName(f));
                    File.WriteAllBytes(f, data);
                }
                catch (Exception) { continue; }
                varalla.TryRemove(polku, out _);
                onnistui++;
            }
            if (onnistui > 0)
            {
                var pohja = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pohja : null;
                if (pohja != null && pohja.enabled) { pohja.RemoveFromTileset(); pohja.AddToTileset(); }
                Debug.Log($"MATKAKIRJA laattapalvelin: {onnistui} varalaattaa korvattu oikealla, pohja ladattu uudelleen ({varalla.Count} jäljellä)");
            }
            uusintaKesken = false;
        }

        IEnumerator Lataa(Haku h)
        {
            kaynnissa++;
            int tila = 502;
            byte[] data = null;
            // Tilapäinen virhe (aikakatkaisu, verkko, 5xx) yritetään uudelleen: Cesium ei itse yritä.
            for (int yritys = 0; yritys < 3; yritys++)
            {
                if (yritys > 0) yield return new WaitForSecondsRealtime(0.6f * yritys * yritys);
                using var r = UnityWebRequest.Get(Ampari + h.Polku);
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result == UnityWebRequest.Result.Success) { tila = 200; data = r.downloadHandler.data; break; }
                tila = (int)(r.responseCode > 0 ? r.responseCode : 502);
                if (tila == 404 || tila == 403) break;
            }
            kaynnissa--;
            h.Valmis.TrySetResult((tila, data));
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
