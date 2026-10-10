// DIORAAMAN LEVYVÄLIMUISTI (Siirtoseppä 30.9.2026): TF 1.0.61 -löydöksen jälkeen Blender-paketti (kuori, leivotut
// atlakset) tulee ämpäristä, ja iPhone lataa linssiä avattaessa 150–250 Mt (iPad Pro ~400 Mt). Ilman välimuistia
// jokainen avaus latasi kaiken uudelleen.
// SISÄLTÖVARASTO (Päätoimittaja 4.10.2026, juna 139): osoittimen vaihto (uusi hash) mitätöi ennen koko välimuistin, vaikka
// uusi paketti erosi edellisestä vain muutaman tiedoston osalta. Nyt tiedosto tallennetaan sisältönsä sha256:n nimellä:
//   <temporaryCachePath>/dioraama/<rakennus>/sisalto/<sha256>
// ja paketin manifest.json (polku → sha256, tavuja; CI kirjoittaa sen hash-kansioon) kertoo, mikä sisältö kuuluu mihinkin
// polkuun. Muuttumattomat tiedostot käytetään siis uudelleen pakettiversiosta toiseen ja vain erotus ladataan.
// Ladattu tiedosto tarkistetaan sha256:ta vasten taustasäikeessä ennen kuin se menee varastoon (väärä → ei välimuistiin).
// Manifestit: <rakennus>/manifestit/<hash>.json. Vanha muoto <rakennus>/<hash>/<polku> siirretään kerran varastoon
// (koko ja sha256 täsmäävät uuteen manifestiin), ja loput siivotaan, kun uusi paketti on valmis (SiivoaVanhat).
// Vain https-osoitteet nykyisen paketin hash-juuren alla ja manifestissa luetellut polut tallennetaan. Peili (file://),
// uusin.json ja juuren äänet (aanet/v<n>/) haetaan aina verkosta. iOS saa tyhjentää temporaryCachePathin, jolloin
// tiedostot vain ladataan uudelleen.
// OSOITIN: esilataus ja linssi lukevat uusin.jsonin yhden kerran saman istunnon aikana (LueOsoitin, 30 min), joten ne
// käyttävät samaa pakettia; testiosoitin ("poikki osoitin <hash>") korvaa sen kehittäjän kokeissa.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class DioraamaLevyvalimuisti
    {
        /// <summary>Nykyisen paketin hash-juuri (https://…/dioraama/&lt;r&gt;/&lt;hash&gt;/), rakennuksen välimuistikansio ja
        /// sisältövarasto; null = ei välimuistia (kehityspeili tai uusin.json puuttui).</summary>
        static string juuri, hashNyt, rakennusKansio, varasto;
        /// <summary>Nykyisen paketin manifesti: polku → (sha256 pienin kirjaimin, tavuja; Brotli-pakattu .br: sha256, tavuja tai
        /// null, -1). Ylätaso on purettu tiedosto. null = ei vielä luettu → ei välimuistia.</summary>
        static Dictionary<string, Merkinta> manifesti;

        public static int Osumia { get; private set; }
        /// <summary>Esilataus (DioraamaEsilataus) ja linssi voivat pyytää samaa tiedostoa yhtä aikaa: haussa oleva url ja sen
        /// levykirjoitus odotetaan loppuun, jolloin toinen pyyntö saa osuman eikä lataa tiedostoa toista kertaa.</summary>
        static readonly HashSet<string> haussa = new HashSet<string>(StringComparer.Ordinal);
        static readonly Dictionary<string, Task> kirjoitukset = new Dictionary<string, Task>(StringComparer.Ordinal);
        public static int Latauksia { get; private set; }
        /// <summary>Epäonnistuneet verkkolataukset (linnan latausvirhe, Päätoimittaja 4.10.) ja kaikki valmistuneet (edistyminen).</summary>
        public static int Epaonnistui { get; private set; }
        public static int Valmistuneita => Osumia + Latauksia + Epaonnistui;
        /// <summary>Tiivisteeltään väärät lataukset (eivät menneet varastoon).</summary>
        public static int VaariaTiivisteita => vaariaTiivisteita;
        static int vaariaTiivisteita;   // kasvatetaan myös taustasäikeistä (Interlocked)
        static int esiLaskuri;

        // --- OSOITIN ---------------------------------------------------------------------------------------------------
        /// <summary>Kehittäjän testiosoitin ("poikki osoitin &lt;hash&gt;|pois"): korvaa uusin.jsonin, null = tuotanto.</summary>
        public static string TestiOsoitin;
        static string osoitinJuuri, osoitinPolku;
        static float osoitinLuettu = -1e9f;
        static bool osoitinHaussa;
        const float OsoitinVoimassaS = 1800f;

        /// <summary>uusin.jsonin polku ("&lt;hash&gt;/") — sama esilataukselle ja linssille saman istunnon aikana (30 min),
        /// testiosoitin ensin. null = ei saatu.</summary>
        /// <summary>Testi ("poikki osoitin esta 1"): uusin.json ei latautu eikä istunnon osoitinta käytetä (verkko pois -toistoajo).</summary>
        public static bool EstaOsoitin;

        public static IEnumerator LueOsoitin(string ampariJuuri, Action<string> polku)
        {
            if (EstaOsoitin) { polku(null); yield break; }
            if (!string.IsNullOrEmpty(TestiOsoitin)) { polku(TestiOsoitin.Trim('/') + "/"); yield break; }
            while (osoitinHaussa) yield return null;
            if (osoitinPolku != null && osoitinJuuri == ampariJuuri && Time.realtimeSinceStartup - osoitinLuettu < OsoitinVoimassaS)
            { polku(osoitinPolku); yield break; }
            osoitinHaussa = true;
            string teksti = null;
            try
            {
                using var p = UnityWebRequest.Get(ampariJuuri + "uusin.json?t=" + DateTime.UtcNow.Ticks);
                p.timeout = 20;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) teksti = p.downloadHandler.text;
            }
            finally { osoitinHaussa = false; }
            string uusi = null;
            try
            {
                var o = teksti != null ? Matkakirja.Peli.MiniJson.Jasenna(teksti) as Dictionary<string, object> : null;
                uusi = o != null && o.TryGetValue("polku", out var pv) ? pv as string : null;
            }
            catch (Exception) { uusi = null; }
            if (!string.IsNullOrEmpty(uusi))
            {
                if (osoitinPolku != null && osoitinPolku != uusi)
                    Debug.Log($"MATKAKIRJA linssit: poikki: osoitin vaihtui {osoitinPolku} → {uusi} (vain erotus ladataan)");
                osoitinJuuri = ampariJuuri; osoitinPolku = uusi; osoitinLuettu = Time.realtimeSinceStartup;
            }
            polku(string.IsNullOrEmpty(uusi) ? osoitinPolku : uusi);
        }

        // --- PAKETTI JA MANIFESTI --------------------------------------------------------------------------------------
        /// <summary>DioraamaSovitin / DioraamaEsilataus: paketti valittu. ampariJuuri = …/dioraama/&lt;r&gt;/, hash ilman
        /// kauttaviivoja; null = välimuisti pois. Manifesti luetaan levyltä, jos se on jo haettu; muuten Valmistele hakee sen.</summary>
        public static void Aseta(string ampariJuuri, string hash)
        {
            if (hash != null && hash == hashNyt && juuri != null && ampariJuuri != null && juuri.StartsWith(ampariJuuri, StringComparison.Ordinal)) return;
            juuri = hashNyt = rakennusKansio = varasto = null;
            manifesti = null;
            if (string.IsNullOrEmpty(hash) || ampariJuuri == null || !ampariJuuri.StartsWith("https://", StringComparison.Ordinal)) return;
            string rakennus = Path.GetFileName(ampariJuuri.TrimEnd('/'));
            if (string.IsNullOrEmpty(rakennus) || hash.IndexOfAny(new[] { '/', '\\', '.' }) >= 0) return;
            juuri = ampariJuuri + hash + "/";
            hashNyt = hash;
            rakennusKansio = Path.Combine(Application.temporaryCachePath, "dioraama", rakennus);
            varasto = Path.Combine(rakennusKansio, "sisalto");
            try
            {
                string mp = ManifestinPolku(hash);
                if (File.Exists(mp)) manifesti = JasennaManifesti(File.ReadAllText(mp));
            }
            catch (Exception) { manifesti = null; }
        }

        static string ManifestinPolku(string hash) => Path.Combine(rakennusKansio, "manifestit", hash + ".json");

        /// <summary>Hakee nykyisen paketin manifest.jsonin (jos ei levyllä) ja siirtää vanhan muodon tiedostot kerran
        /// varastoon. Ilman manifestia välimuisti on pois (lataukset toimivat verkosta).</summary>
        public static IEnumerator Valmistele(Action<string> kirjaa)
        {
            if (juuri == null) yield break;
            string omaHash = hashNyt;
            if (manifesti == null)
            {
                string teksti = null;
                using (var p = UnityWebRequest.Get(juuri + "manifest.json"))
                {
                    p.timeout = 20;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success) teksti = p.downloadHandler.text;
                }
                if (omaHash != hashNyt) yield break;
                var m = teksti != null ? JasennaManifesti(teksti) : null;
                if (m == null) { kirjaa?.Invoke("poikki: välimuisti: manifest.json puuttuu, välimuisti pois tältä kerralta"); yield break; }
                manifesti = m;
                string mp = ManifestinPolku(omaHash);
                var tallennus = Task.Run(() =>
                {
                    try { Directory.CreateDirectory(Path.GetDirectoryName(mp)); File.WriteAllText(mp + ".tmp", teksti); if (File.Exists(mp)) File.Delete(mp); File.Move(mp + ".tmp", mp); }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA dioraama: manifestia ei tallennettu: " + e.Message); }
                });
                while (!tallennus.IsCompleted) yield return null;
            }
            yield return SiirraVanhaMuoto(kirjaa);
        }

        struct Merkinta { public string Sha; public long Tavuja; public string BrSha; public long BrTavuja; }

        static Dictionary<string, Merkinta> JasennaManifesti(string teksti)
        {
            try
            {
                var o = Matkakirja.Peli.MiniJson.Jasenna(teksti) as Dictionary<string, object>;
                if (o == null || !o.TryGetValue("tiedostot", out var t) || !(t is List<object> lista)) return null;
                var m = new Dictionary<string, Merkinta>(StringComparer.Ordinal);
                foreach (var x in lista)
                {
                    if (!(x is Dictionary<string, object> d)) continue;
                    string polku = d.TryGetValue("polku", out var pv) ? pv as string : null;
                    string sha = d.TryGetValue("sha256", out var sv) ? sv as string : null;
                    long tavuja = d.TryGetValue("tavuja", out var tv) && tv != null ? Convert.ToInt64(tv) : -1;
                    if (string.IsNullOrEmpty(polku) || sha == null || sha.Length != 64) continue;
                    // Häviötön pakkaus (juna 143): br-kenttä = ladattava <polku>.br; ylätaso pysyy puretun tiedoston tietoina.
                    string brSha = null; long brTavuja = -1;
                    if (d.TryGetValue(DioraamaPakkaus.Kentta, out var bv) && bv is Dictionary<string, object> br)
                    {
                        brSha = br.TryGetValue("sha256", out var bs) ? bs as string : null;
                        brTavuja = br.TryGetValue("tavuja", out var bt) && bt != null ? Convert.ToInt64(bt) : -1;
                        if (brSha == null || brSha.Length != 64) { brSha = null; brTavuja = -1; }
                    }
                    m[polku] = new Merkinta { Sha = sha.ToLowerInvariant(), Tavuja = tavuja, BrSha = brSha?.ToLowerInvariant(), BrTavuja = brTavuja };
                }
                return m.Count > 0 ? m : null;
            }
            catch (Exception) { return null; }
        }

        static bool siirtoTehty;
        /// <summary>Kertasiirto (yhteensopivuus juna 138:n välimuistin kanssa): vanhan muodon &lt;r&gt;/&lt;hash&gt;/&lt;polku&gt;
        /// -tiedostot, joiden koko ja sha256 täsmäävät nykyiseen manifestiin, siirretään varastoon taustasäikeessä.</summary>
        static IEnumerator SiirraVanhaMuoto(Action<string> kirjaa)
        {
            if (siirtoTehty || manifesti == null || rakennusKansio == null || !Directory.Exists(rakennusKansio)) yield break;
            siirtoTehty = true;
            var m = new Dictionary<string, Merkinta>(manifesti);
            string rk = rakennusKansio, va = varasto;
            int siirretty = 0; long tavuja = 0;
            var tyo = Task.Run(() =>
            {
                try
                {
                    foreach (var d in Directory.GetDirectories(rk))
                    {
                        string nimi = Path.GetFileName(d);
                        if (nimi == "sisalto" || nimi == "manifestit") continue;
                        foreach (var e in m)
                        {
                            string kohde = Path.Combine(va, e.Value.Sha);
                            if (File.Exists(kohde)) continue;
                            string vanha = Path.Combine(d, e.Key.Replace('/', Path.DirectorySeparatorChar));
                            if (!File.Exists(vanha) || (e.Value.Tavuja >= 0 && new FileInfo(vanha).Length != e.Value.Tavuja)) continue;
                            if (TiedostonSha(vanha) != e.Value.Sha) continue;
                            Directory.CreateDirectory(va);
                            File.Move(vanha, kohde);
                            siirretty++; tavuja += e.Value.Tavuja;
                        }
                    }
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA dioraama: vanhan välimuistin siirto keskeytyi: " + e.Message); }
            });
            while (!tyo.IsCompleted) yield return null;
            if (siirretty > 0) kirjaa?.Invoke($"poikki: välimuisti: vanhasta muodosta siirretty {siirretty} tiedostoa ({tavuja / 1048576f:F0} Mt) sisältövarastoon");
        }

        /// <summary>Onko url nykyisen paketin manifestissa; null = manifestia ei ole (peili tai välimuisti pois).</summary>
        public static bool? Manifestissa(string url)
        {
            if (juuri == null || manifesti == null) return null;
            if (url == null || !url.StartsWith(juuri, StringComparison.Ordinal)) return false;
            return manifesti.ContainsKey(url.Substring(juuri.Length));
        }

        /// <summary>Onko paketin suhteellinen polku (esim. "blender/hahmot/x.glb") nykyisen paketin manifestissa; null = manifestia ei ole.</summary>
        public static bool? PaketissaPolku(string polku) => manifesti == null || polku == null ? null : manifesti.ContainsKey(polku);

        /// <summary>Paikallinen polku ja odotettu sha256 url:lle, tai (null, null), jos url ei ole nykyisen paketin manifestin tiedosto.</summary>
        static (string Paikka, string Sha) Paikka(string url)
        {
            if (juuri == null || manifesti == null || url == null || !url.StartsWith(juuri, StringComparison.Ordinal)) return (null, null);
            string rel = url.Substring(juuri.Length);
            if (rel.Length == 0 || rel.Contains("..") || rel.Contains("?")) return (null, null);
            return manifesti.TryGetValue(rel, out var e) ? (Path.Combine(varasto, e.Sha), e.Sha) : (null, null);
        }

        /// <summary>Brotli-pakattu versio (juna 143): (url + ".br", pakatun sha256, puretut tavut), tai Url = null, jos
        /// merkinnällä ei ole br-kenttää tai purku ei ole käytössä (editori ja Mac; iOS-laitteella ja -simulaattorissa on).</summary>
        static (string Url, string Sha, long Tavuja) Pakattu(string url)
        {
            if (!DioraamaPakkaus.Kaytossa || juuri == null || manifesti == null || url == null || !url.StartsWith(juuri, StringComparison.Ordinal)) return (null, null, -1);
            return manifesti.TryGetValue(url.Substring(juuri.Length), out var e) && e.BrSha != null && e.Tavuja > 0
                ? (url + DioraamaPakkaus.Paate, e.BrSha, e.Tavuja) : (null, null, -1);
        }

        /// <summary>Tätä suurempi purettu tiedosto puretaan aina tiedostosta tiedostoon (8k-atlas 89 Mt).</summary>
        const long IsoPurkuTavuja = 16L << 20;

        /// <summary>Puretut tiedostot, niiden tavut ja purkuaika taustasäikeessä yhteensä (Raportti, "poikki välimuisti").</summary>
        public static int Purettuja { get; private set; }
        static long purettuTavuja, pakattuTavuja;
        static double purkuMs;
        static readonly object purkuLukko = new object();
        static void KirjaaPurku(long pakattu, long purettu, double ms)
        {
            lock (purkuLukko) { Purettuja++; pakattuTavuja += pakattu; purettuTavuja += purettu; purkuMs += ms; }
        }

        static string Heksa(byte[] h)
        {
            var c = new char[h.Length * 2];
            const string merkit = "0123456789abcdef";
            for (int i = 0; i < h.Length; i++) { c[2 * i] = merkit[h[i] >> 4]; c[2 * i + 1] = merkit[h[i] & 15]; }
            return new string(c);
        }

        static string TavujenSha(byte[] tavut) { using var s = SHA256.Create(); return Heksa(s.ComputeHash(tavut)); }
        static string TiedostonSha(string polku)
        {
            using var s = SHA256.Create();
            using var f = new FileStream(polku, FileMode.Open, FileAccess.Read, FileShare.Read, 1 << 20);
            return Heksa(s.ComputeHash(f));
        }

        // --- EDISTYMINEN (linnan latauspalkki, omistaja 5.10. klo 12.5x; Natiivi-UI:n pohja DioraamaTaulu.LatausEdistyminen) ---
        // Tavuina manifestin koon mukaan: pyydetty = tämän avauksen haettavaksi pyydetyt tiedostot, valmis = valmiit (välimuisti
        // tai verkko), lennossa = käynnissä olevien latausten jo saapuneet tavut. Nollataan linnan avauksessa (NollaaEdistys).
        static long pyydetty, valmisTavuja;
        static readonly HashSet<string> pyydetyt = new HashSet<string>(), valmiit = new HashSet<string>();
        static readonly Dictionary<string, UnityWebRequest> lennossa = new Dictionary<string, UnityWebRequest>();
        public static long PyydettyTavuja => pyydetty;
        public static void NollaaEdistys() { pyydetty = 0; valmisTavuja = 0; pyydetyt.Clear(); valmiit.Clear(); }
        static long ManifestinKoko(string url)
        {
            if (juuri == null || manifesti == null || url == null || !url.StartsWith(juuri, StringComparison.Ordinal)) return 0;
            return manifesti.TryGetValue(url.Substring(juuri.Length), out var e) && e.Tavuja > 0 ? e.Tavuja : 0;
        }
        static void Pyyda(string url) { if (url != null && pyydetyt.Add(url)) pyydetty += ManifestinKoko(url); }
        static void Valmis(string url) { if (url != null && valmiit.Add(url)) valmisTavuja += ManifestinKoko(url); }
        /// <summary>0…1 tavuina; nimittäjä vähintään muistettu (edellisen täyden latauksen pyydetyt tavut). NaN = ei tietoa.</summary>
        public static float Edistys(long muistettu)
        {
            long nimittaja = Math.Max(pyydetty, muistettu);
            if (nimittaja <= 0) return float.NaN;
            long saapunut = valmisTavuja;
            foreach (var e in lennossa) { try { saapunut += (long)e.Value.downloadedBytes; } catch (Exception) { } }
            return Mathf.Clamp01((float)((double)saapunut / nimittaja));
        }

        // --- HAUT ------------------------------------------------------------------------------------------------------
        /// <summary>Tavut välimuistista tai verkosta (onnistunut lataus tarkistetaan ja tallennetaan taustasäikeessä). null = epäonnistui.</summary>
        /// <summary>Testikomento "poikki pakota-virhe N" (Päätoimittaja 5.10.: teardown-kilvan todennus): N valmistuneen tiedoston
        /// jälkeen kaikki haut epäonnistuvat (kuten verkkokatko kesken latauksen). −1 = pois.</summary>
        public static int PakotaVirheJalkeen = -1;
        static bool Pakotettu() => PakotaVirheJalkeen >= 0 && Valmistuneita >= PakotaVirheJalkeen;

        public static IEnumerator Hae(string url, int aikakatkaisu, Action<byte[]> valmis)
        {
            Pyyda(url);
            yield return OdotaKesken(url);
            if (Pakotettu()) { Epaonnistui++; valmis(null); yield break; }
            var (paikka, sha) = Paikka(url);
            if (paikka != null && File.Exists(paikka))
            {
                byte[] luettu = null;
                var luku = Task.Run(() => { try { luettu = File.ReadAllBytes(paikka); } catch { luettu = null; } });
                while (!luku.IsCompleted) yield return null;
                if (luettu != null && luettu.Length > 0) { Osumia++; Valmis(url); valmis(luettu); yield break; }
            }
            byte[] tavut = null;
            var pak = Pakattu(url);
            // Iso pakattu tiedosto (Siirtosepän katselmointi): ei pakattua ja purettua taulukkoa yhtä aikaa muistiin, vaan
            // Esilataan tiedostoreitti (.br levylle → virtapurku → tiiviste → varasto) ja luku varastosta.
            if (pak.Url != null && pak.Tavuja > IsoPurkuTavuja && paikka != null)
            {
                bool esiladattu = false;
                yield return Esilataa(url, aikakatkaisu, ok => esiladattu = ok);
                if (esiladattu && File.Exists(paikka))
                {
                    byte[] luettu = null;
                    var luku = Task.Run(() => { try { luettu = File.ReadAllBytes(paikka); } catch { luettu = null; } });
                    while (!luku.IsCompleted) yield return null;
                    if (luettu != null && luettu.Length > 0) { valmis(luettu); yield break; }
                }
                pak = (null, null, -1);   // esilataus epäonnistui (se kokeili jo pakkaamatonta): viimeinen yritys suoraan alla
            }
            haussa.Add(url);
            try
            {
                // Häviötön pakkaus (juna 143): ladataan <polku>.br, pakatun tiiviste ja purku taustasäikeessä ennen palautusta;
                // puretun tiiviste tarkistetaan alla ennen varastoon kirjoitusta kuten ennenkin. Virhe → pakkaamaton polku.
                if (pak.Url != null)
                {
                    byte[] pakattu = null;
                    using (var p = UnityWebRequest.Get(pak.Url))
                    {
                        p.timeout = aikakatkaisu;
                        lennossa[url] = p;
                        yield return p.SendWebRequest();
                        lennossa.Remove(url);
                        if (p.result == UnityWebRequest.Result.Success) pakattu = p.downloadHandler.data;
                    }
                    if (pakattu != null)
                    {
                        byte[] purettu = null;
                        var tyo = Task.Run(() =>
                        {
                            try
                            {
                                var kello = System.Diagnostics.Stopwatch.StartNew();
                                if (TavujenSha(pakattu) != pak.Sha) { System.Threading.Interlocked.Increment(ref vaariaTiivisteita); return; }
                                purettu = DioraamaPakkaus.PuraPuskuri(pakattu, pak.Tavuja);
                                if (purettu != null) KirjaaPurku(pakattu.Length, purettu.Length, kello.Elapsed.TotalMilliseconds);
                            }
                            catch (Exception) { purettu = null; }
                        });
                        while (!tyo.IsCompleted) yield return null;
                        tavut = purettu;
                    }
                    if (tavut == null) Debug.LogWarning("MATKAKIRJA dioraama: pakattu ei kelvannut, ladataan pakkaamaton: " + pak.Url);
                }
                if (tavut == null)
                {
                    using var p = UnityWebRequest.Get(url);
                    p.timeout = aikakatkaisu;
                    lennossa[url] = p;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success) tavut = p.downloadHandler.data;
                }
            }
            finally { haussa.Remove(url); lennossa.Remove(url); }
            if (tavut == null) Epaonnistui++;
            if (tavut != null)
            {
                Latauksia++;
                Valmis(url);
                if (paikka != null)
                {
                    // Tiiviste ensin, sitten kirjoitus väliaikaiseen ja siirto, ettei keskeytynyt kirjoitus jää puolikkaaksi osumaksi.
                    var kopio = tavut;
                    kirjoitukset[url] = Task.Run(() =>
                    {
                        try
                        {
                            if (TavujenSha(kopio) != sha) { System.Threading.Interlocked.Increment(ref vaariaTiivisteita); Debug.LogWarning("MATKAKIRJA dioraama: väärä tiiviste, ei välimuistiin: " + url); return; }
                            Directory.CreateDirectory(Path.GetDirectoryName(paikka));
                            string tmp = paikka + "." + System.Threading.Thread.CurrentThread.ManagedThreadId + ".tmp";
                            File.WriteAllBytes(tmp, kopio);
                            if (File.Exists(paikka)) File.Delete(tmp); else File.Move(tmp, paikka);
                        }
                        catch (Exception e) { Debug.LogWarning("MATKAKIRJA dioraama: välimuistiin ei kirjoitettu: " + e.Message); }
                    });
                }
            }
            valmis(tavut);
        }

        /// <summary>Linnan piikit (iPad 2.10.): ASTC-mipketjut (8k-atlas 89 Mt) natiivimuistiin. Välimuistiosuma luetaan
        /// taustasäikeessä suoraan NativeArrayhin (ei hallittua taulukkoa, roskienkeruun keko ei kasva kesken latauksen);
        /// ensilataus kulkee Hae:n kautta ja kopioidaan kerran. default = epäonnistui. Kutsuja vapauttaa (Dispose).</summary>
        public static IEnumerator HaeNatiivi(string url, int aikakatkaisu, Action<Unity.Collections.NativeArray<byte>> valmis)
        {
            Pyyda(url);
            yield return OdotaKesken(url);
            if (Pakotettu()) { Epaonnistui++; valmis(default); yield break; }
            var (paikka, _) = Paikka(url);
            // Pakattu ensilataus (juna 143): esilataa purettuna varastoon, jolloin alla oleva osumapolku lukee sen suoraan
            // NativeArrayhin (ei hallittua taulukkoa).
            if (paikka != null && !File.Exists(paikka) && Pakattu(url).Url != null)
                yield return Esilataa(url, aikakatkaisu, _ => { });
            if (paikka != null && File.Exists(paikka))
            {
                var data = default(Unity.Collections.NativeArray<byte>);
                try
                {
                    long pituus = new FileInfo(paikka).Length;
                    if (pituus > 0 && pituus < int.MaxValue)
                        data = new Unity.Collections.NativeArray<byte>((int)pituus, Unity.Collections.Allocator.Persistent,
                            Unity.Collections.NativeArrayOptions.UninitializedMemory);
                }
                catch (IOException) { }
                if (data.IsCreated)
                {
                    bool ok = false;
                    var kohde = data;
                    var luku = Task.Run(() =>
                    {
                        try
                        {
                            using var f = new FileStream(paikka, FileMode.Open, FileAccess.Read, FileShare.Read, 1 << 20);
                            var s = kohde.AsSpan();
                            int o = 0;
                            while (o < s.Length) { int r = f.Read(s.Slice(o)); if (r <= 0) break; o += r; }
                            ok = o == s.Length;
                        }
                        catch (Exception) { ok = false; }
                    });
                    while (!luku.IsCompleted) yield return null;
                    if (ok) { Osumia++; Valmis(url); valmis(data); yield break; }
                    data.Dispose();
                }
            }
            byte[] tavut = null;
            yield return Hae(url, aikakatkaisu, t => tavut = t);
            valmis(tavut == null ? default : new Unity.Collections.NativeArray<byte>(tavut, Unity.Collections.Allocator.Persistent));
        }

        /// <summary>Esilataus (DioraamaEsilataus): tiedosto suoraan levylle (DownloadHandlerFile, ei muistikopiota — kuoren 8k-tekstuuri
        /// 90 Mt kartalla), tiiviste tarkistetaan taustasäikeessä ennen varastoon siirtoa. Jo varastossa → heti true (myös
        /// edellisen pakettiversion samasisältöinen tiedosto). Vain nykyisen paketin manifestin tiedostot; muut false.</summary>
        public static IEnumerator Esilataa(string url, int aikakatkaisu, Action<bool> valmis)
        {
            Pyyda(url);
            yield return OdotaKesken(url);
            if (Pakotettu()) { Epaonnistui++; valmis(false); yield break; }
            var (paikka, sha) = Paikka(url);
            if (paikka == null) { valmis(false); yield break; }
            if (File.Exists(paikka)) { Osumia++; Valmis(url); valmis(true); yield break; }
            bool ok = false;
            haussa.Add(url);
            try
            {
                Directory.CreateDirectory(Path.GetDirectoryName(paikka));
                // Väliaikainen nimi kutsukohtaisesti (Brotli-mittaus 5.10.): kaksi pakettiversiota (osoitin vaihtui kesken
                // esilatauksen) voivat ladata saman sisällön samaan varastopolkuun yhtä aikaa, ja yhteinen .esi sotki tiivisteen.
                string tmp = paikka + "." + System.Threading.Interlocked.Increment(ref esiLaskuri) + ".esi";
                // Häviötön pakkaus (juna 143): <polku>.br levylle → pakatun tiiviste → virtapurku tiedostoon taustasäikeessä;
                // puretun tiiviste tarkistetaan alla ennen siirtoa kuten ennenkin. Virhe → pakkaamaton polku.
                var pak = Pakattu(url);
                if (pak.Url != null)
                {
                    string tmpBr = tmp + DioraamaPakkaus.Paate;
                    bool ladattu;
                    using (var p = new UnityWebRequest(pak.Url, UnityWebRequest.kHttpVerbGET, new DownloadHandlerFile(tmpBr) { removeFileOnAbort = true }, null))
                    {
                        p.timeout = aikakatkaisu;
                        yield return p.SendWebRequest();
                        ladattu = p.result == UnityWebRequest.Result.Success;
                    }
                    if (ladattu)
                    {
                        var tyo = Task.Run(() =>
                        {
                            try
                            {
                                var kello = System.Diagnostics.Stopwatch.StartNew();
                                if (TiedostonSha(tmpBr) != pak.Sha) { System.Threading.Interlocked.Increment(ref vaariaTiivisteita); return; }
                                long pakTavuja = new FileInfo(tmpBr).Length;
                                if (DioraamaPakkaus.PuraTiedosto(tmpBr, tmp, pak.Tavuja)) { ok = true; KirjaaPurku(pakTavuja, pak.Tavuja, kello.Elapsed.TotalMilliseconds); }
                            }
                            catch (Exception) { ok = false; }
                        });
                        while (!tyo.IsCompleted) yield return null;
                    }
                    try { if (File.Exists(tmpBr)) File.Delete(tmpBr); if (!ok && File.Exists(tmp)) File.Delete(tmp); } catch (Exception) { }
                    if (!ok) Debug.LogWarning("MATKAKIRJA dioraama: esilataus: pakattu ei kelvannut, ladataan pakkaamaton: " + pak.Url);
                }
                if (!ok)
                    using (var p = new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET, new DownloadHandlerFile(tmp) { removeFileOnAbort = true }, null))
                    {
                        p.timeout = aikakatkaisu;
                        yield return p.SendWebRequest();
                        ok = p.result == UnityWebRequest.Result.Success;
                    }
                if (ok)
                {
                    bool oikea = false;
                    var tarkistus = Task.Run(() => { try { oikea = TiedostonSha(tmp) == sha; } catch (Exception) { oikea = false; } });
                    while (!tarkistus.IsCompleted) yield return null;
                    if (!oikea) { ok = false; System.Threading.Interlocked.Increment(ref vaariaTiivisteita); Debug.LogWarning("MATKAKIRJA dioraama: esilataus: väärä tiiviste, hylätty: " + url); }
                }
                if (ok)
                {
                    try { if (File.Exists(paikka)) File.Delete(tmp); else File.Move(tmp, paikka); Latauksia++; Valmis(url); }
                    catch (Exception e) { ok = false; Debug.LogWarning("MATKAKIRJA dioraama: esilataus ei siirtynyt välimuistiin: " + e.Message); }
                }
                if (!ok) { try { if (File.Exists(tmp)) File.Delete(tmp); } catch (Exception) { } Epaonnistui++; }
            }
            finally { haussa.Remove(url); }
            valmis(ok);
        }

        static IEnumerator OdotaKesken(string url)
        {
            while (url != null && haussa.Contains(url)) yield return null;
            if (url != null && kirjoitukset.TryGetValue(url, out var k))
            {
                while (!k.IsCompleted) yield return null;
                kirjoitukset.Remove(url);
            }
        }

        // --- SIIVOUS ---------------------------------------------------------------------------------------------------
        static bool siivousKaynnissa;
        /// <summary>Kun nykyinen paketti on valmis (linnan saapuminen alkoi / esilataus valmis): varastosta pois sisältö, jota
        /// nykyinen manifesti ei käytä, vanhan muodon hash-kansiot ja muut manifestit. Levynkäyttö ennen ja jälkeen lokiin.</summary>
        public static void SiivoaVanhat(Action<string> kirjaa)
        {
            if (siivousKaynnissa || manifesti == null || rakennusKansio == null || haussa.Count > 0) return;
            foreach (var k in kirjoitukset.Values) if (!k.IsCompleted) return;
            siivousKaynnissa = true;
            var kaytossa = new HashSet<string>(StringComparer.Ordinal);
            foreach (var e in manifesti.Values) kaytossa.Add(e.Sha);
            string rk = rakennusKansio, va = varasto, h = hashNyt;
            Task.Run(() =>
            {
                long ennen = 0, jalkeen = 0; int poistettu = 0;
                try
                {
                    ennen = Koko(rk);
                    if (Directory.Exists(va))
                        foreach (var f in Directory.GetFiles(va))
                        {
                            string nimi = Path.GetFileName(f);
                            bool keskenerainen = nimi.Contains(".");
                            if (keskenerainen ? File.GetLastWriteTimeUtc(f) < DateTime.UtcNow.AddHours(-1) : !kaytossa.Contains(nimi))
                            { File.Delete(f); poistettu++; }
                        }
                    foreach (var d in Directory.GetDirectories(rk))
                    {
                        string nimi = Path.GetFileName(d);
                        if (nimi != "sisalto" && nimi != "manifestit") { Directory.Delete(d, true); poistettu++; }
                    }
                    string mk = Path.Combine(rk, "manifestit");
                    if (Directory.Exists(mk))
                        foreach (var f in Directory.GetFiles(mk)) if (Path.GetFileName(f) != h + ".json") { File.Delete(f); poistettu++; }
                    jalkeen = Koko(rk);
                }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA dioraama: vanhaa välimuistia ei poistettu: " + e.Message); }
                finally { siivousKaynnissa = false; }
                Debug.Log($"MATKAKIRJA linssit: poikki: välimuistin siivous: {ennen / 1048576f:F0} Mt → {jalkeen / 1048576f:F0} Mt ({poistettu} poistettu, paketti {h})");
            });
        }

        static long Koko(string kansio)
        {
            long s = 0;
            if (!Directory.Exists(kansio)) return 0;
            foreach (var f in Directory.GetFiles(kansio, "*", SearchOption.AllDirectories)) { try { s += new FileInfo(f).Length; } catch (Exception) { } }
            return s;
        }

        public static string Raportti() =>
            juuri == null ? "välimuisti pois (peili tai ei hashia)"
            : manifesti == null ? $"välimuisti {hashNyt}: manifesti puuttuu (ei välimuistia)"
            : $"välimuisti {hashNyt} ({manifesti.Count} tiedostoa manifestissa): {Osumia} osumaa, {Latauksia} latausta{(VaariaTiivisteita > 0 ? $", {VaariaTiivisteita} väärää tiivistettä" : "")}{PurkuRaportti()}";

        /// <summary>Häviötön pakkaus: puretut tiedostot, ladattu → purettu ja purkuaika taustasäikeessä yhteensä.</summary>
        static string PurkuRaportti()
        {
            lock (purkuLukko)
                return Purettuja == 0 ? (DioraamaPakkaus.Kaytossa ? "; pakattuja ei purettu" : "; pakkaus ei käytössä")
                    : $"; purettu {Purettuja} ({pakattuTavuja / 1048576f:F0} → {purettuTavuja / 1048576f:F0} Mt, {purkuMs / 1000:F2} s taustalla)";
        }

        /// <summary>"poikki välimuisti": levynkäyttö (taustasäikeessä, loki).</summary>
        public static void KirjaaKoko()
        {
            string rk = rakennusKansio;
            if (rk == null) { Debug.Log("MATKAKIRJA linssit: poikki: " + Raportti()); return; }
            string r = Raportti();
            Task.Run(() => Debug.Log($"MATKAKIRJA linssit: poikki: {r}; levyllä {Koko(rk) / 1048576f:F0} Mt"));
        }
    }
}
