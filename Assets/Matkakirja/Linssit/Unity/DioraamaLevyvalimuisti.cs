// DIORAAMAN LEVYVÄLIMUISTI (Siirtoseppä 30.9.2026): TF 1.0.61 -löydöksen jälkeen Blender-paketti (kuori, leivotut
// atlakset) tulee ämpäristä, ja iPhone lataa linssiä avattaessa 150–250 Mt (iPad Pro ~400 Mt). Ilman välimuistia
// jokainen avaus latasi kaiken uudelleen. Hash-kansion tiedostot ovat muuttumattomia (vie-dioraama.yml: immutable),
// joten polku riittää avaimeksi:
//   <temporaryCachePath>/dioraama/<rakennus>/<hash>/<paketin sisäinen polku>
// Vain https-osoitteet, jotka alkavat nykyisen paketin hash-juurella, tallennetaan. Peili (file://), uusin.json ja
// juuren äänet (aanet/v<n>/) haetaan aina verkosta. Kun uusi hash otetaan käyttöön, saman rakennuksen vanhat
// hash-kansiot poistetaan (Siivoa). iOS saa tyhjentää temporaryCachePathin, jolloin tiedostot vain ladataan uudelleen.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public static class DioraamaLevyvalimuisti
    {
        /// <summary>Nykyisen paketin hash-juuri (https://…/dioraama/&lt;r&gt;/&lt;hash&gt;/) ja sen paikallinen kansio;
        /// null = ei välimuistia (kehityspeili tai uusin.json puuttui).</summary>
        static string juuri, kansio;

        public static int Osumia { get; private set; }
        /// <summary>Esilataus (DioraamaEsilataus) ja linssi voivat pyytää samaa tiedostoa yhtä aikaa: haussa oleva url ja sen
        /// levykirjoitus odotetaan loppuun, jolloin toinen pyyntö saa osuman eikä lataa tiedostoa toista kertaa.</summary>
        static readonly HashSet<string> haussa = new HashSet<string>(StringComparer.Ordinal);
        static readonly Dictionary<string, Task> kirjoitukset = new Dictionary<string, Task>(StringComparer.Ordinal);
        public static int Latauksia { get; private set; }

        /// <summary>DioraamaSovitin.LataaRakennus: uusin.json luettu. ampariJuuri = …/dioraama/&lt;r&gt;/, hash ilman kauttaviivoja.</summary>
        public static void Aseta(string ampariJuuri, string hash)
        {
            juuri = kansio = null;
            if (string.IsNullOrEmpty(hash) || ampariJuuri == null || !ampariJuuri.StartsWith("https://", StringComparison.Ordinal)) return;
            string rakennus = Path.GetFileName(ampariJuuri.TrimEnd('/'));
            if (string.IsNullOrEmpty(rakennus) || hash.IndexOfAny(new[] { '/', '\\', '.' }) >= 0) return;
            juuri = ampariJuuri + hash + "/";
            kansio = Path.Combine(Application.temporaryCachePath, "dioraama", rakennus, hash);
            Siivoa(Path.Combine(Application.temporaryCachePath, "dioraama", rakennus), hash);
        }

        /// <summary>Paikallinen polku url:lle, tai null jos url ei ole nykyisen hash-paketin tiedosto.</summary>
        static string Paikka(string url)
        {
            if (juuri == null || url == null || !url.StartsWith(juuri, StringComparison.Ordinal)) return null;
            string rel = url.Substring(juuri.Length);
            if (rel.Length == 0 || rel.Contains("..") || rel.Contains("?")) return null;
            return Path.Combine(kansio, rel.Replace('/', Path.DirectorySeparatorChar));
        }

        /// <summary>Tavut välimuistista tai verkosta (onnistunut lataus tallennetaan taustasäikeessä). null = epäonnistui.</summary>
        public static IEnumerator Hae(string url, int aikakatkaisu, Action<byte[]> valmis)
        {
            yield return OdotaKesken(url);
            string paikka = Paikka(url);
            if (paikka != null && File.Exists(paikka))
            {
                byte[] luettu = null;
                var luku = Task.Run(() => { try { luettu = File.ReadAllBytes(paikka); } catch { luettu = null; } });
                while (!luku.IsCompleted) yield return null;
                if (luettu != null && luettu.Length > 0) { Osumia++; valmis(luettu); yield break; }
            }
            byte[] tavut = null;
            haussa.Add(url);
            try
            {
                using var p = UnityWebRequest.Get(url);
                p.timeout = aikakatkaisu;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) tavut = p.downloadHandler.data;
            }
            finally { haussa.Remove(url); }
            if (tavut != null)
            {
                Latauksia++;
                if (paikka != null)
                {
                    // Kirjoitus väliaikaiseen ja siirto, ettei keskeytynyt kirjoitus jää puolikkaaksi osumaksi.
                    var kopio = tavut;
                    kirjoitukset[url] = Task.Run(() =>
                    {
                        try
                        {
                            Directory.CreateDirectory(Path.GetDirectoryName(paikka));
                            string tmp = paikka + ".tmp";
                            File.WriteAllBytes(tmp, kopio);
                            if (File.Exists(paikka)) File.Delete(paikka);
                            File.Move(tmp, paikka);
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
            yield return OdotaKesken(url);
            string paikka = Paikka(url);
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
                    if (ok) { Osumia++; valmis(data); yield break; }
                    data.Dispose();
                }
            }
            byte[] tavut = null;
            yield return Hae(url, aikakatkaisu, t => tavut = t);
            valmis(tavut == null ? default : new Unity.Collections.NativeArray<byte>(tavut, Unity.Collections.Allocator.Persistent));
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

        static void Siivoa(string rakennusKansio, string pidettava)
        {
            try
            {
                if (!Directory.Exists(rakennusKansio)) return;
                foreach (var d in Directory.GetDirectories(rakennusKansio))
                    if (Path.GetFileName(d) != pidettava) Directory.Delete(d, true);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA dioraama: vanhaa välimuistia ei poistettu: " + e.Message); }
        }

        public static string Raportti() =>
            juuri == null ? "välimuisti pois (peili tai ei hashia)" : $"välimuisti {kansio}: {Osumia} osumaa, {Latauksia} latausta";
    }
}
