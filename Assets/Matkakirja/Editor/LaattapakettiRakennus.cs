using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEditor;
using UnityEngine;

namespace Matkakirja.Editori
{
    /// <summary>
    /// LAATTAPAKETIN RAKENNUS (esilatauspolitiikan kohta 1, löydös 80: kylmä aloitusverho): lataa pallon kaukonäkymän
    /// sarjat ämpäristä yhdeksi tiedostoksi (muoto Matkakirja.Laattapaketti), joka kopioidaan buildiin
    /// (Xcode-projektin Data/Raw/ = StreamingAssets). Sama sisältö kuin tyokalut/laattapaketti.mjs (ilman editoria).
    ///
    ///   Unity -batchmode -quit -projectPath . -executeMethod Matkakirja.Editori.LaattapakettiRakennus.Luo
    ///   node tyokalut/laattapaketti.mjs
    ///
    /// Sarjat pelin vakioista (paketti vastaa käännettävää peliä):
    ///   pohja        Rakennus.LaattaUrl                             Z0–Z5 (Web Mercator)
    ///   maasto       Rakennus.MaastoUrl (layer.json + available)    Z0–Z5 (quantized-mesh)
    ///   bmng-bathy   KarttaKerrokset.SatelliittiVersio/Meri          Z0–Z5 (lennon Blue Marble; Z5 build 19, kohta 1:
    ///                Pelikoodarin kylmämittaus: 9 Z5-laattaa haettiin verkosta, ~1 024 laattaa ≈ 6 Mt)
    ///   vektorit     Vektorikerros.OletusVersio                      luettelo + l0–l2 (rannikko, rajat)
    ///   napakalotit  NapaKannet.OfflinePolut                         2 kuvaa
    ///   maarajat     Maaraja.MaamaaPolku                             maa–maa-rajat (build 19, kohta 1: 913 kt verkosta kylmänä)
    ///
    /// Paketti EI kuulu gitiin (repossa ei Git LFS:ää): se on projektin Build/laattapaketti/laattapaketti.bin:ssä
    /// (Build/ on .gitignoressa) tai ympäristömuuttujan MATKAKIRJA_LAATTAPAKETTI polussa. Rakennus.Kaanna kutsuu
    /// <see cref="Varmista"/> ennen vientiä (lataa, jos puuttuu tai sarjat ovat vaihtuneet; MATKAKIRJA_PAKETTI=0
    /// ohittaa), ja <see cref="KopioiBuildiin"/> kopioi sen Data/Raw/:iin.
    /// </summary>
    public static class LaattapakettiRakennus
    {
        const string Ampari = Laattapalvelin.Ampari;
        public const int PohjaMax = 5, MaastoMax = 5, BmngMax = 5, VektoritMax = 2;
        const int Rinnakkain = 24;

        /// <summary>Paketin polku projektissa (tai MATKAKIRJA_LAATTAPAKETTI).</summary>
        public static string Polku
        {
            get
            {
                var y = Environment.GetEnvironmentVariable("MATKAKIRJA_LAATTAPAKETTI");
                return !string.IsNullOrEmpty(y) ? Path.GetFullPath(y)
                    : Path.GetFullPath(Path.Combine("Build", "laattapaketti", Laattapaketti.Tiedostonimi));
            }
        }

        sealed class Sarja
        {
            public string Nimi, Etuliite;
            /// <summary>Ämpärin polut (kysely mukana; avain Laattapaketti.Avain).</summary>
            public List<string> Polut = new List<string>();
        }

        static string Pois(string url) =>
            url.StartsWith(Ampari, StringComparison.Ordinal) ? url.Substring(Ampari.Length) : throw new Exception("ei ämpärissä: " + url);
        static string Kansio(string malli) => malli.Substring(0, malli.IndexOf("{z}", StringComparison.Ordinal));

        /// <summary>Sarjojen etuliitteet ja nimet tämän buildin vakioista (ilman latausta).</summary>
        public static List<(string etuliite, string nimi)> Etuliitteet()
        {
            string maasto = Pois(Rakennus.MaastoUrl);
            string kalotti = NapaKannet.OfflinePolut().First();
            return new List<(string, string)>
            {
                (Kansio(Pois(Rakennus.LaattaUrl)), "pohja"),
                (maasto.Substring(0, maasto.LastIndexOf('/') + 1), "maasto"),
                (Pois(KarttaKerrokset.SatelliittiJuuri) + KarttaKerrokset.SatelliittiVersio + "/" + KarttaKerrokset.SatelliittiMeri + "/",
                    KarttaKerrokset.SatelliittiMeri),
                ("julisteet/pallo/vektorit/" + Vektorikerros.OletusVersio + "/", "vektorit"),
                (kalotti.Substring(0, kalotti.LastIndexOf('/') + 1), "napakalotit"),
                (Maaraja.MaamaaPolku.Substring(0, Maaraja.MaamaaPolku.LastIndexOf('/') + 1), "maarajat"),
            };
        }

        /// <summary>Batchmode: lataa ja kirjoittaa paketin aina (vanha korvataan).</summary>
        public static void Luo()
        {
            try { Rakenna(Polku); }
            catch (Exception e)
            {
                Debug.LogError("MATKAKIRJA laattapaketti: " + e.Message);
                if (Application.isBatchMode) EditorApplication.Exit(1);
            }
        }

        /// <summary>
        /// Ennen vientiä (Rakennus.Kaanna): paketti ladataan, jos se puuttuu tai sen sarjat eivät vastaa buildin vakioita.
        /// Epäonnistunut lataus ei kaada käännöstä (peli toimii ilman pakettia, kylmä alku vain hitaampi).
        /// </summary>
        public static void Varmista()
        {
            if (Environment.GetEnvironmentVariable("MATKAKIRJA_PAKETTI") == "0")
            {
                Debug.Log("MATKAKIRJA laattapaketti: ohitettu (MATKAKIRJA_PAKETTI=0)");
                return;
            }
            string polku = Polku;
            var odotetut = Etuliitteet().Select(s => s.etuliite).ToList();
            var p = Laattapaketti.Avaa(polku, out _);
            if (p != null)
            {
                var olevat = p.Sarjat.Select(s => s.Etuliite).ToList();
                // Tasojen muutos (esim. BmngMax 4 → 5) ei näy etuliitteissä: syvimmän bmng-tason laatta on oltava mukana.
                bool tasot = odotetut.Count > 2 && p.Onko(Laattapaketti.Avain(odotetut[2] + BmngMax + "/0/0.jpg"));
                p.Dispose();
                if (olevat.SequenceEqual(odotetut) && tasot)
                {
                    Debug.Log($"MATKAKIRJA laattapaketti: ajan tasalla {polku}");
                    return;
                }
                Debug.Log("MATKAKIRJA laattapaketti: sarjat vaihtuneet, ladataan uudelleen");
            }
            try { Rakenna(polku); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA laattapaketti: lataus epäonnistui, build ilman pakettia: " + e.Message); }
        }

        /// <summary>Kopioi paketin Xcode-projektin Data/Raw/:iin (StreamingAssets iOS:llä). Rakennus kutsuu PostProcessBuildissa.</summary>
        public static void KopioiBuildiin(string xcodeProjekti)
        {
            string lahde = Polku;
            string kohde = Path.Combine(xcodeProjekti, "Data", "Raw", Laattapaketti.Tiedostonimi);
            if (!File.Exists(lahde) || Environment.GetEnvironmentVariable("MATKAKIRJA_PAKETTI") == "0")
            {
                if (File.Exists(kohde)) File.Delete(kohde);
                Debug.LogWarning("MATKAKIRJA laattapaketti: ei pakettia buildissa (" + lahde + ")");
                return;
            }
            Directory.CreateDirectory(Path.GetDirectoryName(kohde));
            File.Copy(lahde, kohde, true);
            Debug.Log($"MATKAKIRJA laattapaketti: buildiin {kohde} ({new FileInfo(kohde).Length / 1048576.0:0.0} Mt)");
        }

        static void Rakenna(string polku)
        {
            // Oma säie: Unityn pääsäikeen SynchronizationContext lukkiutuisi await-jatkoihin.
            Task.Run(() => RakennaAsync(polku)).GetAwaiter().GetResult();
        }

        static async Task RakennaAsync(string polku)
        {
            var kasittelija = new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate };
            using var http = new HttpClient(kasittelija) { Timeout = TimeSpan.FromSeconds(60) };
            var et = Etuliitteet();
            var sarjat = new List<Sarja>();

            // pohja
            {
                string malli = Pois(Rakennus.LaattaUrl);
                var s = new Sarja { Nimi = et[0].nimi, Etuliite = et[0].etuliite };
                foreach (var (z, x, y) in Laattapaketti.Mercator(0, PohjaMax)) s.Polut.Add(Laattapaketti.Tayta(malli, z, x, y));
                sarjat.Add(s);
            }
            // maasto: layer.jsonin tiles-malli ja available-alueet
            {
                string layer = Pois(Rakennus.MaastoUrl);
                var s = new Sarja { Nimi = et[1].nimi, Etuliite = et[1].etuliite };
                var json = MiniJson.Objekti(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(await Hae(http, layer)
                    ?? throw new Exception("layer.json puuttuu"))));
                string malli = MiniJson.Taulukko(MiniJson.Kentta(json, "tiles"))[0] as string;
                var saatavilla = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(json, "available"));
                s.Polut.Add(layer);
                for (int z = 0; z <= MaastoMax && z < saatavilla.Count; z++)
                    foreach (var o in MiniJson.TaulukkoTaiTyhja(saatavilla[z]))
                    {
                        var a = MiniJson.Objekti(o);
                        int x0 = (int)MiniJson.Luku(a, "startX"), x1 = (int)MiniJson.Luku(a, "endX");
                        int y0 = (int)MiniJson.Luku(a, "startY"), y1 = (int)MiniJson.Luku(a, "endY");
                        for (int x = x0; x <= x1; x++)
                            for (int y = y0; y <= y1; y++) s.Polut.Add(s.Etuliite + Laattapaketti.Tayta(malli, z, x, y));
                    }
                sarjat.Add(s);
            }
            // lennon Blue Marble
            {
                var s = new Sarja { Nimi = et[2].nimi, Etuliite = et[2].etuliite };
                foreach (var (z, x, y) in Laattapaketti.Mercator(0, BmngMax)) s.Polut.Add(s.Etuliite + z + "/" + x + "/" + y + ".jpg");
                sarjat.Add(s);
            }
            // vektorit: luettelo + tasot 0–2
            {
                var s = new Sarja { Nimi = et[3].nimi, Etuliite = et[3].etuliite };
                var tavut = await Hae(http, s.Etuliite + "luettelo.json") ?? throw new Exception("vektorien luettelo puuttuu");
                var l = Vektorisolut.LueLuettelo(System.Text.Encoding.UTF8.GetString(tavut)) ?? throw new Exception("vektorien luettelo rikki");
                s.Polut.Add(s.Etuliite + "luettelo.json");
                foreach (var laji in l.Lajit)
                    foreach (var t in laji.Value)
                        if (t.K <= VektoritMax)
                            foreach (var avain in t.Tiedostot.OrderBy(a => a, StringComparer.Ordinal))
                                s.Polut.Add(s.Etuliite + Vektorisolut.SolunPolku(laji.Key, t.K, avain));
                sarjat.Add(s);
            }
            // napakalotit
            {
                var s = new Sarja { Nimi = et[4].nimi, Etuliite = et[4].etuliite };
                s.Polut.AddRange(NapaKannet.OfflinePolut());
                sarjat.Add(s);
            }
            // maa–maa-rajat (Maaraja lataa Laattapalvelimen kautta, joten paketti vastaa ensin)
            {
                var s = new Sarja { Nimi = et[5].nimi, Etuliite = et[5].etuliite };
                s.Polut.Add(Maaraja.MaamaaPolku);
                sarjat.Add(s);
            }

            var rivit = new List<Laattapaketti.Rivi>();
            long kaikki = 0;
            for (int si = 0; si < sarjat.Count; si++)
            {
                var s = sarjat[si];
                var alku = DateTime.UtcNow;
                var data = new byte[s.Polut.Count][];
                using var rajoitin = new SemaphoreSlim(Rinnakkain);
                await Task.WhenAll(s.Polut.Select(async (p, i) =>
                {
                    await rajoitin.WaitAsync().ConfigureAwait(false);
                    try { data[i] = await Hae(http, p).ConfigureAwait(false); }
                    finally { rajoitin.Release(); }
                }));
                int n = 0, puuttuu = 0;
                long t = 0;
                for (int i = 0; i < data.Length; i++)
                {
                    if (data[i] == null) { puuttuu++; continue; }
                    string avain = Laattapaketti.Avain(s.Polut[i]);
                    if (!avain.StartsWith(s.Etuliite, StringComparison.Ordinal)) throw new Exception("avain ei sarjassa: " + avain);
                    rivit.Add(new Laattapaketti.Rivi(si, avain.Substring(s.Etuliite.Length), data[i]));
                    n++; t += data[i].Length;
                }
                kaikki += t;
                Debug.Log($"MATKAKIRJA laattapaketti: {s.Nimi} {s.Etuliite} {n} tiedostoa, {t / 1048576.0:0.00} Mt" +
                          (puuttuu > 0 ? $", {puuttuu} puuttuu ämpäristä" : "") + $", {(DateTime.UtcNow - alku).TotalSeconds:0} s");
            }
            Directory.CreateDirectory(Path.GetDirectoryName(polku));
            string tmp = polku + ".tmp";
            using (var f = new FileStream(tmp, FileMode.Create, FileAccess.Write))
                Laattapaketti.Kirjoita(f, sarjat.Select(s => (s.Etuliite, s.Nimi)).ToList(), rivit);
            if (File.Exists(polku)) File.Delete(polku);
            File.Move(tmp, polku);
            Debug.Log($"MATKAKIRJA laattapaketti: {rivit.Count} tiedostoa, {kaikki / 1048576.0:0.00} Mt → {polku}");
        }

        /// <summary>Yksi ämpärin polku: tavut, null = 404/403. Katkennut JPEG ja tilapäiset virheet yritetään uudelleen.</summary>
        static async Task<byte[]> Hae(HttpClient http, string polku)
        {
            for (int yritys = 0; ; yritys++)
            {
                try
                {
                    using var r = await http.GetAsync(Ampari + polku).ConfigureAwait(false);
                    if (r.StatusCode == HttpStatusCode.NotFound || r.StatusCode == HttpStatusCode.Forbidden) return null;
                    r.EnsureSuccessStatusCode();
                    var b = await r.Content.ReadAsByteArrayAsync().ConfigureAwait(false);
                    if (!Laattapalvelin.KuvaEhja(polku, b)) throw new Exception("katkennut JPEG");
                    return b;
                }
                catch (Exception e) when (yritys < 3)
                {
                    await Task.Delay(500 * (yritys + 1) * (yritys + 1)).ConfigureAwait(false);
                    if (yritys == 2) Debug.LogWarning($"MATKAKIRJA laattapaketti: {polku}: {e.Message}, viimeinen yritys");
                }
            }
        }
    }
}
