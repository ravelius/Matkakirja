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
            string paikka = Paikka(url);
            if (paikka != null && File.Exists(paikka))
            {
                byte[] luettu = null;
                var luku = Task.Run(() => { try { luettu = File.ReadAllBytes(paikka); } catch { luettu = null; } });
                while (!luku.IsCompleted) yield return null;
                if (luettu != null && luettu.Length > 0) { Osumia++; valmis(luettu); yield break; }
            }
            byte[] tavut = null;
            using (var p = UnityWebRequest.Get(url))
            {
                p.timeout = aikakatkaisu;
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success) tavut = p.downloadHandler.data;
            }
            if (tavut != null)
            {
                Latauksia++;
                if (paikka != null)
                {
                    // Kirjoitus väliaikaiseen ja siirto, ettei keskeytynyt kirjoitus jää puolikkaaksi osumaksi.
                    var kopio = tavut;
                    _ = Task.Run(() =>
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
