// LINNAN ALUSKASVIT (Linssiseppä 2, 1.10.2026; Päätoimittajan erä, Siirtosepän rajapinta, omistaja: "linnan maa paremmaksi").
// Kanerva, mustikka, kivet, ruoko ja muut matalat lajit korttipareina (kaksi ristikkäistä korttia per kasvi) yhdeksi meshiksi ja
// yhdeksi piirtokutsuksi kuten puut (DioraamaYmparisto.LataaPuut). Data Linnanrakentajalta (maasto_splat.py + aluskasvit.py):
//   lista  {"tasot":{"kevyt":0,"normaali":8000,"huippu":20000},"kasvit":[[x,y,z,laji,koko]…]} (v1: "aluskasvit") Blenderissä
//          (x itä, y pohjoinen, z ylös → Unity (x, z, y)), etäisyysjärjestyksessä linnasta, säde ≤ 300 m; koko metreinä.
//   atlas  {"atlas":"aluskasvit.png","lajit":{"0":"kanerva",…},"kortit":{nimi:{u:[u0,u1],v:[v0,v1],kortti_per_koko,
//          leveys_per_korkeus}}} (kortin korkeus = koko × kortti_per_koko, leveys = korkeus × leveys_per_korkeus; nimi2 = vaihtelu).
// Taso DioraamaUlkokuori.Valittu:sta: kevyt = ei aluskasveja, normaali 8 000, huippu 20 000 (listan "tasot", lähimmät ensin).
// Varjostin DioraamaPuu (uv1.x = korkeus kortissa): kasveilla latva 0,6 (heilunta 0,12 × 0,36 ≈ 4 cm, ei puiden 12 cm:ä),
// kivillä tasainen 0,3 (ei juuri-latva-varjostusta eikä huomattavaa heiluntaa).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public static class DioraamaAluskasvit
    {
        /// <summary>Kivilaji: ei heiluntaa eikä juuri–latva-varjostusta.</summary>
        const string Kivi = "kivi";
        static readonly int IdKuva = Shader.PropertyToID("_Kuva");
        static readonly List<MeshRenderer> piirrot = new List<MeshRenderer>();
        /// <summary>Mesh osiin alle 65 536 kärjen (oletus); false = yksi UInt32-mesh (A/B viivavian rajaukseen).</summary>
        public static bool Osiin = true;
        /// <summary>Viivavian rajaus (`poikki aluskasvit lajit 7,8|kaikki`, seuraava lataus): vain nämä lajit, null = kaikki.</summary>
        public static HashSet<int> VainLajit;
        /// <summary>UV-reunus solun sisään (atlaksen tekseleinä), ettei kortti näytteistä solun rajaa eikä naapurisolua.</summary>
        const float ReunusTekselia = 2f;
        /// <summary>A/B kuvapariin (`poikki aluskasvit 0|1`): aluskasvit piiloon tai näkyviin lataamatta uudelleen.</summary>
        public static bool Pois;

        /// <summary>A/B-kytkin: näkyvyys heti; palauttaa tilarivin.</summary>
        public static string Kytke(bool paalla)
        {
            Pois = !paalla;
            foreach (var r in piirrot) if (r != null) r.enabled = paalla;
            return $"aluskasvit {(paalla ? "näkyvissä" : "piilossa")}, {piirrot.Count} osaa{(Osiin ? "" : " (yksi mesh)")}";
        }

        sealed class Kortti { public float U0, U1, V0, V1, KorttiPerKoko = 1.9f, LeveysPerKorkeus = 1f; public bool Kivi; }

        /// <summary>
        /// Lataa aluskasvit isäolion alle (DioraamaYmparisto.Lataa puiden jälkeen). luodut: siivottavat oliot (Tyhjenna);
        /// voimassa: false, jos lataus vanheni (uusi Lataa tai Tyhjenna).
        /// </summary>
        public static IEnumerator Lataa(Ymparisto y, DioraamaUlkokuori.Laatu taso, Func<string, string> url, Action<string> kirjaa,
            Transform isa, List<UnityEngine.Object> luodut, Func<bool> voimassa)
        {
            if (y == null || string.IsNullOrEmpty(y.AluskasvitLista) || string.IsNullOrEmpty(y.AluskasvitAtlas)) yield break;
            if (taso == DioraamaUlkokuori.Laatu.Kevyt) { kirjaa?.Invoke("poikki: ympäristö: aluskasvit pois (kevyt)"); yield break; }
            byte[] atlasJson = null, listaJson = null, atlasTavut = null;
            string tiedot = y.AluskasvitKortit ?? y.AluskasvitAtlas; // uusi muoto: atlas = png, kortit = json (Siirtoseppä 1.10.)
            yield return DioraamaLevyvalimuisti.Hae(url(tiedot), 60, t => atlasJson = t);
            yield return DioraamaLevyvalimuisti.Hae(url(y.AluskasvitLista), 120, t => listaJson = t);
            if (!voimassa()) yield break;
            if (atlasJson == null || listaJson == null) { kirjaa?.Invoke("poikki: ympäristö: aluskasvit eivät latautuneet"); yield break; }
            string atlasNimi = null;
            try { atlasNimi = MiniJson.Teksti(MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(atlasJson))), "atlas"); } catch { }
            string kansio = tiedot.Contains("/") ? tiedot.Substring(0, tiedot.LastIndexOf('/') + 1) : "";
            yield return DioraamaLevyvalimuisti.Hae(url(y.AluskasvitKortit != null ? y.AluskasvitAtlas : kansio + (atlasNimi ?? "aluskasvit.png")), 60, t => atlasTavut = t);
            if (!voimassa()) yield break;
            if (atlasTavut == null) { kirjaa?.Invoke("poikki: ympäristö: aluskasvien atlas ei latautunut"); yield break; }

            // Atlaksen koko PNG-otsakkeesta (IHDR: leveys tavuissa 16–19, korkeus 20–23) UV-reunusta varten.
            int atlasL = 1280, atlasK = 512;
            if (atlasTavut.Length > 24 && atlasTavut[1] == 'P' && atlasTavut[2] == 'N' && atlasTavut[3] == 'G')
            {
                atlasL = atlasTavut[16] << 24 | atlasTavut[17] << 16 | atlasTavut[18] << 8 | atlasTavut[19];
                atlasK = atlasTavut[20] << 24 | atlasTavut[21] << 16 | atlasTavut[22] << 8 | atlasTavut[23];
            }
            float du = ReunusTekselia / Math.Max(1, atlasL), dv = ReunusTekselia / Math.Max(1, atlasK);
            float alku = Time.realtimeSinceStartup;
            Vector3[] p = null; Vector2[] uv0 = null, uv1 = null; Color32[] v = null; int[] kolmiot = null; string virhe = null; int kasveja = 0;
            var tehtava = Task.Run(() =>
            {
                try
                {
                    var aj = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(atlasJson)));
                    var lajit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(aj, "lajit"));
                    var kortit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(aj, "kortit"));
                    Kortti LueKortti(string nimi, bool kivi)
                    {
                        var k = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kortit, nimi));
                        if (k == null) return null;
                        var u = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "u")); var vv = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "v"));
                        return new Kortti
                        {
                            U0 = u.Count > 0 && u[0] is double a ? (float)a : 0f, U1 = u.Count > 1 && u[1] is double b ? (float)b : 1f,
                            V0 = vv.Count > 0 && vv[0] is double c ? (float)c : 0f, V1 = vv.Count > 1 && vv[1] is double e ? (float)e : 1f,
                            KorttiPerKoko = (float)(MiniJson.Luku(k, "kortti_per_koko") ?? 1.9),
                            LeveysPerKorkeus = (float)(MiniJson.Luku(k, "leveys_per_korkeus") ?? 1.0), Kivi = kivi,
                        };
                    }
                    var lajiKortit = new Dictionary<int, List<Kortti>>();
                    if (lajit != null)
                        foreach (var kv in lajit)
                            if (int.TryParse(kv.Key, out int li) && kv.Value is string ln)
                            {
                                var lista = new List<Kortti>();
                                var k1 = LueKortti(ln, ln == Kivi); if (k1 != null) lista.Add(k1);
                                var k2 = LueKortti(ln + "2", ln == Kivi); if (k2 != null) lista.Add(k2);
                                if (lista.Count > 0) lajiKortit[li] = lista;
                            }

                    var lj = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(listaJson)));
                    var rivit = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(lj, "kasvit") ?? MiniJson.Kentta(lj, "aluskasvit"));   // v2: "kasvit", v1: "aluskasvit"
                    var tasot = MiniJson.ObjektiTaiNull(MiniJson.Kentta(lj, "tasot"));
                    string tasoNimi = taso == DioraamaUlkokuori.Laatu.Huippu ? "huippu" : "normaali";
                    int oletus = taso == DioraamaUlkokuori.Laatu.Huippu ? 20000 : 8000;
                    int n = Math.Min(rivit.Count, (int)(MiniJson.Luku(tasot, tasoNimi) ?? oletus));
                    p = new Vector3[n * 8]; uv0 = new Vector2[n * 8]; uv1 = new Vector2[n * 8]; v = new Color32[n * 8]; kolmiot = new int[n * 12];
                    int k0 = 0;
                    for (int i = 0; i < n; i++)
                    {
                        if (!(rivit[i] is List<object> r) || r.Count < 5) continue;
                        float bx = (float)(double)r[0], by = (float)(double)r[1], bz = (float)(double)r[2];
                        int laji = (int)(double)r[3];
                        float koko = (float)(double)r[4];
                        if (VainLajit != null && !VainLajit.Contains(laji)) continue;
                        if (!lajiKortit.TryGetValue(laji, out var vaihtoehdot)) continue;
                        uint hsh = (uint)(i * 2654435761u) ^ (uint)(bx * 73856093f) ^ (uint)(by * 19349663f);
                        var kortti = vaihtoehdot[(int)(hsh % (uint)vaihtoehdot.Count)];
                        float korkeus = koko * kortti.KorttiPerKoko, puoli = korkeus * kortti.LeveysPerKorkeus * 0.5f;
                        float kulma = (hsh >> 8) % 360 * Mathf.Deg2Rad;
                        // Juuri hieman maan alle, jottei kortin alareuna leiju rinteessä.
                        var juuriP = new Vector3(bx, kortti.Kivi ? bz : bz - korkeus * 0.06f, by);   // kivet on upotettu jo datassa
                        byte kirkkaus = (byte)(hsh >> 16 & 0xFF), vaihe = (byte)(hsh >> 24 & 0xFF);
                        float latva = kortti.Kivi ? 0.3f : 0.6f, tyvi = kortti.Kivi ? 0.3f : 0f;
                        for (int q = 0; q < 2; q++)
                        {
                            float a = kulma + q * Mathf.PI * 0.5f;
                            var sivu = new Vector3(Mathf.Cos(a), 0, Mathf.Sin(a)) * puoli;
                            int b = k0 * 4;
                            p[b] = juuriP - sivu; p[b + 1] = juuriP + sivu;
                            p[b + 2] = juuriP + sivu + Vector3.up * korkeus; p[b + 3] = juuriP - sivu + Vector3.up * korkeus;
                            float u0 = kortti.U0 + du, u1 = kortti.U1 - du, v0 = kortti.V0 + dv, v1 = kortti.V1 - dv;
                            uv0[b] = new Vector2(u0, v0); uv0[b + 1] = new Vector2(u1, v0);
                            uv0[b + 2] = new Vector2(u1, v1); uv0[b + 3] = new Vector2(u0, v1);
                            uv1[b] = uv1[b + 1] = new Vector2(tyvi, 0); uv1[b + 2] = uv1[b + 3] = new Vector2(latva, 0);
                            for (int c = 0; c < 4; c++) v[b + c] = new Color32(kirkkaus, vaihe, 0, 255);
                            int ti = k0 * 6;
                            kolmiot[ti] = b; kolmiot[ti + 1] = b + 2; kolmiot[ti + 2] = b + 1;
                            kolmiot[ti + 3] = b; kolmiot[ti + 4] = b + 3; kolmiot[ti + 5] = b + 2;
                            k0++;
                        }
                        kasveja++;
                    }
                    if (k0 * 4 < p.Length)
                    {
                        Array.Resize(ref p, k0 * 4); Array.Resize(ref uv0, k0 * 4); Array.Resize(ref uv1, k0 * 4);
                        Array.Resize(ref v, k0 * 4); Array.Resize(ref kolmiot, k0 * 6);
                    }
                }
                catch (Exception e) { virhe = e.Message; }
            });
            while (!tehtava.IsCompleted) yield return null;
            if (!voimassa()) yield break;
            if (p == null || p.Length == 0) { kirjaa?.Invoke($"poikki: ympäristö: aluskasvit virhe: {virhe ?? "ei kasveja"}"); yield break; }

            var atlas = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Ymparisto:aluskasvit", filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 2 };
            if (!atlas.LoadImage(atlasTavut, false)) { UnityEngine.Object.Destroy(atlas); kirjaa?.Invoke("poikki: ympäristö: aluskasvien atlas ei jäsentynyt"); yield break; }
            // ETC/ASTC-pakkaus vaatii mip-tasoilta 4:n monikerrat: 1280 × 512 -atlas (5 × 2 solua) ei kelpaa (laite 1.10.: "mip level 7
            // with dimensions 10×4"), joten pakataan vain kahden potenssin atlas. Pakkaamaton 1280 × 512 on ~3,5 Mt mipeineen.
            bool pot = Mathf.IsPowerOfTwo(atlas.width) && Mathf.IsPowerOfTwo(atlas.height);
            if (pot) atlas.Compress(true);
            atlas.Apply(true, true);
            luodut.Add(atlas);
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaPuu");
            if (varjostin == null) { kirjaa?.Invoke("poikki: ympäristö: DioraamaPuu-varjostin puuttuu (aluskasvit)"); yield break; }
            var mat = new Material(varjostin) { name = "Ymparisto:aluskasvit" };
            mat.SetTexture(IdKuva, atlas);
            luodut.Add(mat);
            // Osiin (oletus): enintään 16 000 korttia (64 000 kärkeä) per mesh, 16-bittiset indeksit; huipputasolla 3 piirtokutsua.
            // Laite 1.10. (v3b, huippu, 160 000 kärkeä yhdessä UInt32-meshissä): kaksi pitkää risteävää viivaa maan tasolla, kuin
            // kolmio olisi osunut väärään kärkeen. A/B `poikki aluskasvit osat 0|1` (seuraavassa latauksessa).
            int korttejaYht = kolmiot.Length / 6, perOsa = Osiin ? 16000 : korttejaYht;
            piirrot.Clear();
            for (int alkuK = 0; alkuK < korttejaYht; alkuK += perOsa)
            {
                int kpl = Math.Min(perOsa, korttejaYht - alkuK), v0 = alkuK * 4, nv = kpl * 4;
                var osaP = new Vector3[nv]; var osaUv0 = new Vector2[nv]; var osaUv1 = new Vector2[nv]; var osaV = new Color32[nv];
                Array.Copy(p, v0, osaP, 0, nv); Array.Copy(uv0, v0, osaUv0, 0, nv); Array.Copy(uv1, v0, osaUv1, 0, nv); Array.Copy(v, v0, osaV, 0, nv);
                var osaK = new int[kpl * 6];
                for (int t = 0; t < osaK.Length; t++) osaK[t] = kolmiot[alkuK * 6 + t] - v0;
                var mesh = new Mesh { name = "Ymparisto:aluskasvit", indexFormat = nv > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
                mesh.SetVertices(osaP); mesh.SetUVs(0, osaUv0); mesh.SetUVs(1, osaUv1); mesh.SetColors(osaV); mesh.SetTriangles(osaK, 0);
                mesh.RecalculateBounds();
                mesh.UploadMeshData(true);
                luodut.Add(mesh);
                var go = new GameObject("Ymparisto:aluskasvit") { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(isa, false);
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var rr = go.AddComponent<MeshRenderer>();
                rr.sharedMaterial = mat;
                rr.shadowCastingMode = ShadowCastingMode.Off;
                rr.receiveShadows = false;
                rr.enabled = !Pois;
                piirrot.Add(rr);
            }
            kirjaa?.Invoke($"poikki: ympäristö: aluskasvit {kasveja} ({kolmiot.Length / 3} kolmiota, {piirrot.Count} osaa, {atlas.width}×{atlas.height} {atlas.format}), {Time.realtimeSinceStartup - alku:F1} s");
        }
    }
}
