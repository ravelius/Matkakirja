// LINNAN HISTORIAN VAIHEMALLIT (LR v45y, juna 172): blender/vaiheet/vaiheet.json (tyhjä saari –1475, puuvarustus 1475–1477, palon
// jäljet 1868–1872) omina glb:inään dioraaman kehyksessä (kuoren koordinaatit, vesi y −7). SeikkailuHistoria näyttää kunkin mallin
// vain sen vuosina (HistoriaVaihemalli.Nakyy), piilottaa linnan ennen kivilinnaa (Historiajana.LinnaNakyy) ja asettaa palon
// leikkaukset (kuoren katot piiloon) SeikkailuKavelyn historiaosiin. Materiaali per glb-materiaali (puuvarustus: olki + puu),
// DioraamaValaistu (B, maalattu: aurinko, varjot ja pistevalot kuten esineillä; arvio 2 9.10.: valaisematon DioraamaMaasto näytti
// tyhjän saaren toistuvan kalliokuvan litteänä ruskeana ruudukkona ja puuvarustuksen haaleana), vara DioraamaMaasto; kuvaton
// materiaali (hiili) baseColorin värillä. Värikanavat kuten esineillä: AO 1, ei lämpöä, B 0,5.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVaiheet
    {
        public sealed class Vaihe
        {
            public HistoriaVaihemalli Malli; public GameObject Go; public List<KavelyLeikkaus> Leikkaukset;
            /// <summary>Solmuryhmät omilla vuosillaan (glb-solmujen extras vuodesta/vuoteen; LR:n restaurointitelineet, juna 173).</summary>
            public readonly List<(GameObject Go, double? Vuodesta, double? Vuoteen)> Ryhmat = new List<(GameObject, double?, double?)>();
            /// <summary>Näkyvyys vuonna: vaihe ja sen ryhmät.</summary>
            /// <summary>Vaihe näkyy omina vuosinaan tai kun jokin sen ryhmistä näkyy (ryhmien vuodet kalenterivuosina, RyhmaVuonna).</summary>
            public bool Nakyy(double vuosi)
            {
                if (Malli.Nakyy(vuosi)) return true;
                foreach (var (_, a, b) in Ryhmat) if (HistoriaVaihemalli.RyhmaVuonna(vuosi, a, b)) return true;
                return false;
            }
            public void Nayta(double vuosi)
            {
                bool nakyy = Nakyy(vuosi);
                if (Go != null && Go.activeSelf != nakyy) Go.SetActive(nakyy);
                if (nakyy) foreach (var (g, a, b) in Ryhmat) { bool n = HistoriaVaihemalli.RyhmaVuonna(vuosi, a, b); if (g != null && g.activeSelf != n) g.SetActive(n); }
            }
        }

        public readonly List<Vaihe> Vaiheet = new List<Vaihe>();
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        static readonly int IdKuva = Shader.PropertyToID("_Kuva"), IdPohjaKuva = Shader.PropertyToID("_PohjaKuva"), IdTila = Shader.PropertyToID("_Tila");

        /// <summary>Lataa vaiheet (juuri = paketin blender-kansio, esim. ".../blender/"); puuttuva vaiheet.json = ei vaiheita (vanha paketti).</summary>
        public static IEnumerator Lataa(string juuri, Func<string, string> url, Transform isa, Action<string> kirjaa, Action<SeikkailuVaiheet> valmis)
        {
            var s = new SeikkailuVaiheet();
            string listaUrl = juuri + "vaiheet/vaiheet.json";
            if (DioraamaLevyvalimuisti.Manifestissa(listaUrl) == false) { valmis(s); yield break; }
            byte[] b = null;
            yield return DioraamaLevyvalimuisti.Hae(url(listaUrl), 30, t => b = t);
            if (b == null) { valmis(s); yield break; }
            List<HistoriaVaihemalli> mallit;
            try { mallit = Historiajana.LueVaihemallit(System.Text.Encoding.UTF8.GetString(b)); } catch (Exception e) { kirjaa?.Invoke("seikkailu: vaiheet: " + e.Message); valmis(s); yield break; }
            float alku = Time.realtimeSinceStartup;
            foreach (var m in mallit)
            {
                byte[] g = null;
                yield return DioraamaLevyvalimuisti.Hae(url(juuri + m.Glb), 60, t => g = t);
                if (g == null || isa == null) continue;
                GlbMalli malli = null; string virhe = null;
                var tehtava = Task.Run(() => { try { malli = DioraamaGlb.Lue(g, true); } catch (Exception e) { virhe = e.Message; } });
                while (!tehtava.IsCompleted) yield return null;
                if (malli == null) { kirjaa?.Invoke($"seikkailu: vaihe {m.Id}: {virhe}"); continue; }
                var v = new Vaihe { Malli = m };
                v.Go = s.Rakenna(malli, m.Id, isa, v);
                // Esittelyn esihistoria (LR v46x, juna 176): tyhjät liekki:/savu: (nuotio, kaskisavu) savuksi vaiheen alle, näkyy vaiheen mukana.
                var tyhjat = DioraamaTyhja.Lue(malli);
                var savu = isa.GetComponent<DioraamaNayttamo>()?.Savu;
                if (savu != null && tyhjat.Exists(t => t.Laji == "savu" || t.Laji == "liekki")) savu.LisaaTila("vaihe:" + m.Id, v.Go.transform, tyhjat, kirjaa, v.Go.transform);
                v.Go.SetActive(false);
                if (!string.IsNullOrEmpty(m.Leikkaukset))
                {
                    byte[] lb = null;
                    yield return DioraamaLevyvalimuisti.Hae(url(juuri + m.Leikkaukset), 30, t => lb = t);
                    if (lb != null) try { v.Leikkaukset = Historiajana.LueLeikkaukset(System.Text.Encoding.UTF8.GetString(lb)); } catch (Exception e) { kirjaa?.Invoke($"seikkailu: vaihe {m.Id} leikkaukset: {e.Message}"); }
                }
                s.Vaiheet.Add(v);
            }
            kirjaa?.Invoke($"seikkailu: historian vaihemallit {s.Vaiheet.Count}/{mallit.Count} ({Time.realtimeSinceStartup - alku:F1} s)");
            valmis(s);
        }

        static double? Luku(Dictionary<string, object> e, string k) => e != null && e.TryGetValue(k, out var x) && x is double d ? d : (double?)null;

        GameObject Rakenna(GlbMalli malli, string id, Transform isa, Vaihe vaihe)
        {
            var juuri = new GameObject("Vaihe:" + id) { layer = DioraamaNayttamo.Kerros };
            juuri.transform.SetParent(isa, false);
            // Solmujen perityt vuodet → ryhmä per vuosiväli (ilman vuosia suoraan juureen).
            var vanh = new int[malli.Solmut.Count]; var omat = new (double?, double?)[malli.Solmut.Count];
            for (int i = 0; i < vanh.Length; i++) { vanh[i] = malli.Solmut[i].Vanhempi == i ? -1 : malli.Solmut[i].Vanhempi; omat[i] = (Luku(malli.Solmut[i].Extras, "vuodesta"), Luku(malli.Solmut[i].Extras, "vuoteen")); }
            var vuodet = HistoriaVaihemalli.SolmujenVuodet(vanh, omat);
            var ryhmat = new Dictionary<string, Transform>(StringComparer.Ordinal);
            Transform Ryhma(int si)
            {
                var (a, b) = vuodet[si];
                if (a == null && b == null) return juuri.transform;
                string k = a + "|" + b;
                if (!ryhmat.TryGetValue(k, out var tr))
                {
                    var g = new GameObject($"Vaihe:{id}:{a}-{b}") { layer = DioraamaNayttamo.Kerros };
                    g.transform.SetParent(juuri.transform, false); ryhmat[k] = tr = g.transform; vaihe.Ryhmat.Add((g, a, b));
                }
                return tr;
            }
            var valaistu = Shader.Find("Matkakirja/Linssit/DioraamaValaistu");
            var varjostin = valaistu != null ? valaistu : Shader.Find("Matkakirja/Linssit/DioraamaMaasto");
            var materiaalit = new Dictionary<string, Material>(StringComparer.Ordinal);
            var kuvat = new Dictionary<int, Texture2D>();
            var mat = new Matrix4x4[malli.Solmut.Count]; var valmis = new bool[malli.Solmut.Count];
            Matrix4x4 Maailma(int i)
            {
                if (valmis[i]) return mat[i];
                var g = malli.Solmut[i];
                var oma = Matrix4x4.TRS(new Vector3(g.Translation[0], g.Translation[1], g.Translation[2]), new Quaternion(g.Rotation[0], g.Rotation[1], g.Rotation[2], g.Rotation[3]), new Vector3(g.Scale[0], g.Scale[1], g.Scale[2]));
                mat[i] = g.Vanhempi >= 0 && g.Vanhempi < malli.Solmut.Count && g.Vanhempi != i ? Maailma(g.Vanhempi) * oma : oma; valmis[i] = true;
                return mat[i];
            }
            for (int si = 0; si < malli.Solmut.Count; si++)
                foreach (var o in malli.Solmut[si].Osat)
                {
                    int k = (o.Paikat?.Length ?? 0) / 3; if (k == 0 || o.Kolmiot == null) continue;
                    var sm = Maailma(si);
                    var p = new Vector3[k]; var n = new Vector3[k]; var uv = new Vector2[k];
                    for (int i = 0; i < k; i++)
                    {
                        p[i] = sm.MultiplyPoint3x4(new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]));
                        n[i] = o.Normaalit != null && o.Normaalit.Length >= (i + 1) * 3 ? sm.MultiplyVector(new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2])).normalized : Vector3.up;
                        uv[i] = o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero;
                    }
                    var me = new Mesh { name = "Vaihe:" + id, indexFormat = k > 65000 ? UnityEngine.Rendering.IndexFormat.UInt32 : UnityEngine.Rendering.IndexFormat.UInt16 };
                    me.vertices = p; me.normals = n; me.uv = uv; me.triangles = o.Kolmiot; me.RecalculateBounds();
                    if (valaistu != null) { var vc = new Color[k]; for (int i = 0; i < k; i++) vc[i] = new Color(1f, 0f, 0.5f, 1f); me.colors = vc; }
                    luodut.Add(me);
                    string avain = o.Kuva + "|" + (o.Vari != null ? string.Join(",", o.Vari) : "");
                    if (!materiaalit.TryGetValue(avain, out var ma) && varjostin != null)
                    {
                        ma = new Material(varjostin) { name = "Vaihe:" + id + ":" + avain }; luodut.Add(ma);
                        Texture2D t = null;
                        if (o.Kuva >= 0 && o.Kuva < malli.Kuvat.Count && !kuvat.TryGetValue(o.Kuva, out t) && malli.Kuvat[o.Kuva] != null)
                        {
                            t = new Texture2D(2, 2, TextureFormat.RGBA32, true, false) { name = "Vaihe:" + id + ":" + o.Kuva, wrapMode = TextureWrapMode.Repeat };
                            // GPU-pakkaus (kuten kuoren Compress): 1024² RGBA32 mipeineen ~5,6 Mt → ~0,7 Mt; CPU-kopio pois.
                            if (t.LoadImage(malli.Kuvat[o.Kuva], false)) { t.Compress(true); t.Apply(false, true); kuvat[o.Kuva] = t; luodut.Add(t); } else { UnityEngine.Object.Destroy(t); t = null; }
                        }
                        if (t == null)
                        {
                            var c = o.Vari != null && o.Vari.Length >= 3 ? new Color(o.Vari[0], o.Vari[1], o.Vari[2]) : new Color(0.3f, 0.3f, 0.3f);
                            t = new Texture2D(1, 1, TextureFormat.RGBA32, false) { name = "Vaihe:" + id + ":vari" }; t.SetPixel(0, 0, c); t.Apply(false, true); luodut.Add(t);
                        }
                        if (valaistu != null) { ma.SetFloat(IdTila, 1f); ma.SetTexture(IdPohjaKuva, t); } else ma.SetTexture(IdKuva, t);
                        materiaalit[avain] = ma;
                    }
                    var go = new GameObject("Osa:" + (o.Pinta ?? "")) { layer = DioraamaNayttamo.Kerros };
                    go.transform.SetParent(Ryhma(si), false);
                    go.AddComponent<MeshFilter>().sharedMesh = me;
                    var r = go.AddComponent<MeshRenderer>(); r.sharedMaterial = ma; r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.On;
                }
            malli.Kuvat.Clear();
            return juuri;
        }

        public void Tuhoa()
        {
            foreach (var v in Vaiheet) if (v.Go != null) UnityEngine.Object.Destroy(v.Go);
            foreach (var o in luodut) if (o != null) UnityEngine.Object.Destroy(o);
            Vaiheet.Clear(); luodut.Clear();
        }
    }
}
