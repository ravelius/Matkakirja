// PELIOHJAIN: MAAMERKIT SISÄLTÖPAKETISTA (Fable 24.9.2026; Raamattu LENNON KARTTA JA MAAMERKIT).
//
// Kokoelma "maamerkit" (skeema 1.33, Peli/Maamerkkisisalto.cs) luetaan taustalla sisällön latauduttua. Jokaisen
// rivin GLB haetaan ämpäristä (offline-tilassa Laattapalvelin.Paikallinen) tai välimuistista
// persistentDataPath/maamerkit/<tiedosto>, tarkistetaan (tavut + sha256), luetaan Peli/GlbLukija.cs:llä ja
// annetaan Kartta/Maamerkit.cs:lle: LisaaMalli (verkko + atlas pohjaMateriaalin kloonilla) ja AsetaTaulukko.
//
// Pilotti (Lontoo, Ateena) pysyy sovelluksen FBX:nä Oletustaulukossa. Paketin rivi korvaa saman kaupungin
// oletusrivin vasta, kun sen malli on ladattu ja kelpaa; epäonnistunut rivi ei vie oletusta pois.
// Paketin rivi, jonka id on sama kuin FBX:n (lontoo, ateena), korvaa FBX-mallin: pilotti siirtyy pakettiin
// vain lisäämällä rivi tools/vienti/maamerkit.json:iin omistajan kokeilun jälkeen.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        static string MaamerkkiKansio => Path.Combine(Application.persistentDataPath, "maamerkit");

        /// <summary>Paketin maamerkit, joiden malli on ladattu (kaupunki → rivi).</summary>
        readonly Dictionary<string, Maamerkkirivi> paketinMaamerkit = new Dictionary<string, Maamerkkirivi>();

        IEnumerator HaeMaamerkit()
        {
            string teksti = null;
            yield return HaeTiedosto("kokoelmat/" + Maamerkkisisalto.Kokoelma + ".json", false, true, t => teksti = t);
            if (teksti == null) yield break;
            var hylatyt = new List<string>();
            List<Maamerkkirivi> rivit;
            try { rivit = Maamerkkisisalto.Lue(teksti, hylatyt); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA maamerkit: kokoelma ei jäsenny: " + e.Message); yield break; }
            foreach (var h in hylatyt) Debug.LogWarning("MATKAKIRJA maamerkit: rivi ohitettu: " + h);
            if (rivit.Count == 0) yield break;
            var maamerkit = Nappula != null ? Nappula.maamerkit : null;
            if (maamerkit == null) { Debug.LogWarning("MATKAKIRJA maamerkit: Maamerkit-komponenttia ei ole"); yield break; }
            foreach (var r in rivit)
            {
                if (verkko != null && !verkko.Kaupungit.ContainsKey(r.Kaupunki))
                {
                    Debug.LogWarning($"MATKAKIRJA maamerkit: {r.Id}: tuntematon kaupunki {r.Kaupunki}");
                    continue;
                }
                byte[] tavut = null;
                yield return HaeMaamerkkiMalli(r, t => tavut = t);
                if (tavut == null) continue;
                try
                {
                    var malli = TeeMalli(r, GlbLukija.Lue(tavut), maamerkit.pohjaMateriaali, maamerkit.transform);
                    maamerkit.LisaaMalli(malli);
                    paketinMaamerkit[r.Kaupunki] = r;
                    maamerkit.AsetaTaulukko(Maamerkkitaulukko());
                    Debug.Log($"MATKAKIRJA maamerkit: {r.Id} ({r.Kaupunki}) paketista, {tavut.Length / 1024} kt");
                }
                catch (Exception e) { Debug.LogWarning($"MATKAKIRJA maamerkit: {r.Id}: {e.Message}"); }
            }
        }

        /// <summary>Oletustaulukko (FBX-pilotti), jossa paketin ladatut rivit korvaavat saman kaupungin oletuksen.</summary>
        List<Maamerkit.Rivi> Maamerkkitaulukko()
        {
            var t = Maamerkit.Oletustaulukko().Where(o => !paketinMaamerkit.ContainsKey(o.kaupunki)).ToList();
            foreach (var r in paketinMaamerkit.Values)
                t.Add(new Maamerkit.Rivi
                {
                    id = r.Id, kaupunki = r.Kaupunki, lat = r.Lat, lon = r.Lon,
                    korkeusM = r.MaanKorkeus, suunta = r.Suunta, korkeus = r.MallinKorkeus,
                });
            return t;
        }

        /// <summary>GLB välimuistista tai verkosta; tarkistettu (tavut + sha256). valmis(null) = ei saatu.</summary>
        IEnumerator HaeMaamerkkiMalli(Maamerkkirivi r, Action<byte[]> valmis)
        {
            var nimi = Path.GetFileName(new Uri(r.MalliUrl).AbsolutePath);
            var tiedosto = Path.Combine(MaamerkkiKansio, nimi);
            if (File.Exists(tiedosto))
            {
                byte[] vanha = null;
                try { vanha = File.ReadAllBytes(tiedosto); } catch (Exception) { }
                if (vanha != null && Maamerkkisisalto.TarkistaMalli(r, vanha) == null) { valmis(vanha); yield break; }
            }
            using var k = UnityWebRequest.Get(Laattapalvelin.Paikallinen(r.MalliUrl));
            k.timeout = 60;
            yield return k.SendWebRequest();
            if (k.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning($"MATKAKIRJA maamerkit: {r.Id}: lataus epäonnistui ({k.responseCode} {k.error})");
                valmis(null);
                yield break;
            }
            var tavut = k.downloadHandler.data;
            var virhe = Maamerkkisisalto.TarkistaMalli(r, tavut);
            if (virhe != null) { Debug.LogWarning($"MATKAKIRJA maamerkit: {r.Id}: {virhe}"); valmis(null); yield break; }
            try
            {
                Directory.CreateDirectory(MaamerkkiKansio);
                var valiaikainen = tiedosto + ".uusi";
                File.WriteAllBytes(valiaikainen, tavut);
                if (File.Exists(tiedosto)) File.Delete(tiedosto);
                File.Move(valiaikainen, tiedosto);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA maamerkit: välimuistiin ei voitu kirjoittaa: " + e.Message); }
            valmis(tavut);
        }

        /// <summary>
        /// Malli-GameObject (ei aktiivinen) GLB:stä: verkko ja atlas pohjamateriaalin kloonissa (_BaseMap).
        /// Maamerkit.Luo instansioi sen kuten FBX-prefabin.
        /// </summary>
        static Maamerkit.Malli TeeMalli(Maamerkkirivi r, GlbVerkko g, Material pohja, Transform vanhempi)
        {
            var mesh = new Mesh { name = "Maamerkki " + r.Id };
            if (g.Karkia > 65535) mesh.indexFormat = IndexFormat.UInt32;
            var p = new Vector3[g.Karkia];
            for (int i = 0; i < p.Length; i++) p[i] = new Vector3(g.Paikat[i * 3], g.Paikat[i * 3 + 1], g.Paikat[i * 3 + 2]);
            mesh.vertices = p;
            if (g.Uv != null)
            {
                var uv = new Vector2[g.Karkia];
                for (int i = 0; i < uv.Length; i++) uv[i] = new Vector2(g.Uv[i * 2], g.Uv[i * 2 + 1]);
                mesh.uv = uv;
            }
            mesh.triangles = g.Kolmiot;
            if (g.Normaalit != null)
            {
                var n = new Vector3[g.Karkia];
                for (int i = 0; i < n.Length; i++) n[i] = new Vector3(g.Normaalit[i * 3], g.Normaalit[i * 3 + 1], g.Normaalit[i * 3 + 2]);
                mesh.normals = n;
            }
            else mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            mesh.UploadMeshData(true);

            var m = pohja != null ? new Material(pohja) : new Material(Shader.Find("Universal Render Pipeline/Lit"));
            m.name = "Maamerkki-" + r.Id;
            if (g.Kuva != null)
            {
                var tx = new Texture2D(2, 2, TextureFormat.RGBA32, true) { name = r.Id + "_vari", wrapMode = TextureWrapMode.Clamp, anisoLevel = 4 };
                if (tx.LoadImage(g.Kuva, true)) m.SetTexture("_BaseMap", tx);
                else Debug.LogWarning($"MATKAKIRJA maamerkit: {r.Id}: atlas ei avaudu ({g.KuvaTyyppi})");
            }

            var go = new GameObject("Maamerkkimalli " + r.Id);
            go.SetActive(false);
            go.transform.SetParent(vanhempi, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            go.AddComponent<MeshRenderer>().sharedMaterial = m;
            return new Maamerkit.Malli { id = r.Id, prefab = go, materiaali = m };
        }
    }
}
