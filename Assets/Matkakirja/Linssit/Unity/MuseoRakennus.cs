// TAIDEMUSEON RAKENNUS (Linssiseppä 10.10.2026): väliaikaishalli sali.json:sta (MuseoGeometria.Halli: yksi verkko kärkivärein),
// teokset kehyksineen (MuseoGeometria.Kehys, profiili sali.json:sta), grafiikalle passepartout, tekstitaulut ja kattoikkunat.
// Kaikki MuseoValaistu-varjostimella kerroksessa MuseoNayttamo.Kerros. Teoksen kuva: teokset.json:n "kuva" (sisältöpaketti,
// Natiivi.Kuvat.Hae) tai siihen asti paikkakuva (hillitty sävy teoksen tunnuksesta, oikea kuvasuhde, ei tekstiä).
// Linnanrakentajan sali-lod{0,1}.glb korvaa hallin myöhemmin samoilla mitoilla; teokset, kehykset ja valot pysyvät tässä.
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed class MuseoRakennus
    {
        /// <summary>Kattoikkunan luminanssi (cd/m²): pilvinen päivä lasikaton läpi himmennettynä.</summary>
        const float KattoikkunaCd = 320f;
        /// <summary>Passepartout grafiikan ympärillä (m, liite C2.4: 5–8 cm).</summary>
        const double PaspisM = 0.065;

        readonly Transform juuri;
        readonly Shader varjostin;
        readonly List<Object> tuhottavat = new List<Object>();
        public readonly Dictionary<string, Material> TeosMateriaalit = new Dictionary<string, Material>();
        /// <summary>Teoksen kuvan paikka MuseoTekstuureille (seinätaso materiaaliin, yksityiskohtaruudut kankaan eteen).</summary>
        public readonly Dictionary<string, MuseoTekstuurit.Kuvapaikka> Kuvapaikat = new Dictionary<string, MuseoTekstuurit.Kuvapaikka>();
        public int Kolmioita { get; private set; }

        public MuseoRakennus(Transform isa)
        {
            juuri = new GameObject("MuseoRakennus").transform;
            juuri.SetParent(isa, false);
            varjostin = Resources.Load<Shader>("Varjostimet/MuseoValaistu");
        }

        public bool Varjostin => varjostin != null && varjostin.isSupported;

        Material Materiaali(string nimi, Color pohja, float kiilto, float karheus, float metalli = 0, bool karkivari = false)
        {
            var m = new Material(varjostin) { name = nimi };
            m.SetColor("_Pohja", pohja);
            m.SetFloat("_Kiilto", kiilto); m.SetFloat("_Karheus", karheus); m.SetFloat("_Metalli", metalli);
            m.SetFloat("_KarkiVari", karkivari ? 1 : 0);
            tuhottavat.Add(m);
            return m;
        }

        static Color Lin((double R, double G, double B) c) => new Color((float)c.R, (float)c.G, (float)c.B).linear;

        GameObject Kappale(string nimi, Verkko v, Material m, Transform isa, bool lineaarinenVari, bool kaannaZ = false)
        {
            var go = new GameObject(nimi) { layer = MuseoNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var mesh = new Mesh { name = nimi };
            if (v.P.Count > 65000) mesh.indexFormat = IndexFormat.UInt32;
            var p = new Vector3[v.P.Count]; var n = new Vector3[v.P.Count]; var c = new Color[v.P.Count]; var uv = new Vector2[v.P.Count];
            for (int i = 0; i < p.Length; i++)
            {
                p[i] = kaannaZ ? new Vector3((float)v.P[i].X, (float)v.P[i].Y, (float)-v.P[i].Z) : MuseoNayttamo.U(v.P[i]);
                n[i] = kaannaZ ? new Vector3((float)v.N[i].X, (float)v.N[i].Y, (float)-v.N[i].Z) : MuseoNayttamo.U(v.N[i]);
                var cc = new Color((float)v.C[i].R, (float)v.C[i].G, (float)v.C[i].B);
                c[i] = lineaarinenVari ? cc : cc.linear;
                uv[i] = new Vector2((float)v.UV[i].U, (float)v.UV[i].V);
            }
            mesh.vertices = p; mesh.normals = n; mesh.colors = c; mesh.uv = uv;
            mesh.triangles = v.T.ToArray();
            mesh.RecalculateBounds();
            tuhottavat.Add(mesh);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m; r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
            Kolmioita += v.T.Count / 3;
            return go;
        }

        /// <summary>Koko sali: halli, kattoikkunat, teokset kehyksineen ja tekstitaulut.</summary>
        public void Rakenna(Sali s)
        {
            var halliMat = Materiaali("MuseoHalli", Color.white, 0.03f, 0.85f, 0, karkivari: true);
            Kappale("Halli", MuseoGeometria.Halli(s), halliMat, juuri, lineaarinenVari: false);

            var ikkunaMat = Materiaali("MuseoKattoikkuna", new Color(0.9f, 0.92f, 0.95f), 0, 1);
            var pv = Linssit.Museo.MuseoValo.Kelvin(5600);
            ikkunaMat.SetColor("_Hehku", new Color((float)pv.R, (float)pv.G, (float)pv.B) * KattoikkunaCd);
            foreach (var o in s.Osat)
            {
                if (o.Kattoikkuna == null) continue;
                double cx = (o.X0 + o.X1) / 2, cz = (o.Z0 + o.Z1) / 2, hw = Mathf.Min((float)o.Kattoikkuna[0], (float)(o.X1 - o.X0)) / 2, hl = Mathf.Min((float)o.Kattoikkuna[1], (float)(o.Z1 - o.Z0)) / 2, y = o.Y1 - 0.02;
                var v = new Verkko();
                v.Nelio(new V3(cx - hw, y, cz - hl), new V3(cx + hw, y, cz - hl), new V3(cx + hw, y, cz + hl), new V3(cx - hw, y, cz + hl), new V3(0, -1, 0), (1, 1, 1));
                Kappale("Kattoikkuna " + o.Id, v, ikkunaMat, juuri, true);
            }

            var kehysMat = new Dictionary<string, Material>();
            foreach (var kv in s.KehysMateriaalit)
                kehysMat[kv.Key] = Materiaali("Kehys " + kv.Key, Lin((kv.Value.R, kv.Value.G, kv.Value.B)), kv.Value.Metalli > 0.5 ? 0.9f : 0.05f, (float)kv.Value.Karheus, (float)kv.Value.Metalli);
            var paspisMat = kehysMat.TryGetValue("paspis", out var pm) ? pm : Materiaali("Paspis", new Color(0.82f, 0.78f, 0.69f), 0.02f, 0.9f);
            var tauluMat = Materiaali("Tekstitaulu", Lin(MuseoGeometria.Vari(s, "paneeli_kerma", (0.85, 0.82, 0.75))), 0.03f, 0.8f);

            foreach (var r in s.Ripustukset)
            {
                var paikka = r.Paikka;
                var go = new GameObject("Teos " + r.Teos.Id + " @ " + paikka.Id) { layer = MuseoNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                var n = MuseoNayttamo.U(paikka.Normaali).normalized;
                go.transform.position = MuseoNayttamo.U(paikka.Keskipiste) + n * 0.004f;
                // Paikallinen +Z seinään päin, +X katsojan oikealle (kuva ei peilaudu); kehyksen "ulos seinästä" = −Z.
                go.transform.rotation = Quaternion.LookRotation(-n, Vector3.up);

                double w = r.Leveys, h = r.Korkeus, ulkoW = w, ulkoH = h;
                if (paikka.Grafiikka) { ulkoW += 2 * PaspisM; ulkoH += 2 * PaspisM; }
                var mat = Materiaali("Teos " + r.Teos.Id, Color.white, 0.03f, 0.5f);
                mat.mainTexture = Paikkakuva(r.Teos);
                TeosMateriaalit[r.Teos.Id] = mat;
                s.Kehykset.TryGetValue(paikka.Kehysprofiili ?? s.Oletuskehys ?? "", out var prof);
                // Kangas (tai paperi) 3 mm kehyksen sisähuulen alla; passepartout paperin takana.
                double huuli = (prof?.HuuliCm ?? 1.5) / 100, kangas = Mathf.Max(0.001f, (float)(huuli - 0.003));
                Kappale("Kuva", Suorakaide(w, h, kangas), mat, go.transform, true, kaannaZ: true);
                Kuvapaikat[r.Teos.Id] = new MuseoTekstuurit.Kuvapaikka { Isa = go.transform, Materiaali = mat, Leveys = (float)w, Korkeus = (float)h, Z = -(float)kangas,
                    Paketti = r.Teos.Paketti, PxLeveys = r.Teos.KuvaLeveys, PxKorkeus = r.Teos.KuvaKorkeus };
                if (paikka.Grafiikka) Kappale("Passepartout", Suorakaide(ulkoW, ulkoH, kangas - 0.0008), paspisMat, go.transform, true, kaannaZ: true);
                if (prof != null)
                {
                    var km = kehysMat.TryGetValue(prof.Materiaali ?? "musta", out var x) ? x : halliMat;
                    var kv = MuseoGeometria.Kehys(prof, ulkoW, ulkoH, (1, 1, 1));
                    Kappale("Kehys", kv, km, go.transform, true, kaannaZ: true);
                }
            }
            foreach (var t in s.Tekstitaulut)
            {
                if (s.HaeRipustus(t.Teospaikka) == null) continue;
                var go = new GameObject("Tekstitaulu " + t.Id) { layer = MuseoNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                var n = MuseoNayttamo.U(t.Normaali).normalized;
                go.transform.position = MuseoNayttamo.U(t.Keskipiste) + n * 0.006f;
                go.transform.rotation = Quaternion.LookRotation(-n, Vector3.up);
                Kappale("Laatta", Suorakaide(t.Leveys, t.Korkeus, 0), tauluMat, go.transform, true, kaannaZ: true);
            }
        }

        /// <summary>Suorakaide <paramref name="ulos"/> metriä seinästä (kehyksen kehyksessä +Z ulos; Unityssä −Z kaannaZ:n jälkeen), uv 0–1.</summary>
        static Verkko Suorakaide(double w, double h, double ulos)
        {
            var v = new Verkko();
            v.Nelio(new V3(-w / 2, -h / 2, ulos), new V3(w / 2, -h / 2, ulos), new V3(w / 2, h / 2, ulos), new V3(-w / 2, h / 2, ulos), new V3(0, 0, 1), (1, 1, 1));
            return v;
        }

        /// <summary>Paikkakuva (ei tekstiä): hillitty pohjasävy teoksen tunnuksesta, vaaleampi keskus ja tumma reuna, kuten vanha
        /// öljymaalaus himmeästi; grafiikalle kerma ja tumma viivasto. Kuvasuhde teoksen mukaan.</summary>
        Texture2D Paikkakuva(Teos t)
        {
            float suhde = (float)(t.Kuvasuhde > 0 ? t.Kuvasuhde : t.LeveysCm / t.KorkeusCm);
            int h = 96, w = Mathf.Clamp(Mathf.RoundToInt(h * suhde), 24, 256);
            var tex = new Texture2D(w, h, TextureFormat.RGBA32, true) { name = "Paikkakuva " + t.Id, wrapMode = TextureWrapMode.Clamp };
            uint siemen = 2166136261; foreach (char ch in t.Id) siemen = (siemen ^ ch) * 16777619;
            var paletti = new[] { new Color(0.35f, 0.27f, 0.17f), new Color(0.24f, 0.25f, 0.18f), new Color(0.42f, 0.33f, 0.20f), new Color(0.20f, 0.17f, 0.14f), new Color(0.30f, 0.32f, 0.33f) };
            var pohja = t.Grafiikka ? new Color(0.86f, 0.82f, 0.72f) : paletti[siemen % (uint)paletti.Length];
            var valo = t.Grafiikka ? new Color(0.25f, 0.22f, 0.18f) : Color.Lerp(pohja, new Color(0.85f, 0.72f, 0.48f), 0.55f);
            float vx = 0.3f + (siemen >> 8) % 40 / 100f, vy = 0.35f + (siemen >> 16) % 35 / 100f;
            var px = new Color[w * h];
            for (int y = 0; y < h; y++)
                for (int x = 0; x < w; x++)
                {
                    float u = (x + 0.5f) / w, v = (y + 0.5f) / h;
                    float r = Mathf.Sqrt((u - vx) * (u - vx) * suhde * suhde + (v - vy) * (v - vy));
                    float hash = Mathf.Repeat(Mathf.Sin(x * 12.9898f + y * 78.233f + siemen % 997) * 43758.545f, 1f);
                    Color c;
                    if (t.Grafiikka) c = Color.Lerp(pohja, valo, ((x + y * 3) % 7 == 0 ? 0.35f : 0f) * Mathf.Clamp01(1.2f - r * 1.6f));
                    else c = Color.Lerp(valo, pohja, Mathf.Clamp01(r * 1.6f)) * (0.94f + 0.06f * hash);
                    float reuna = Mathf.Min(Mathf.Min(u, 1 - u) * suhde, Mathf.Min(v, 1 - v));
                    c *= Mathf.Lerp(0.7f, 1f, Mathf.Clamp01(reuna * 8f));
                    c.a = 1; px[y * w + x] = c;
                }
            tex.SetPixels(px); tex.Apply(true, true);
            tuhottavat.Add(tex);
            return tex;
        }

        /// <summary>Seinäkuvan pitkä sivu muistissa (px): 2048 px:n JPEG puretaan, pienennetään GPU:lla mippeineen tähän ja alkuperäinen
        /// vapautetaan (20 teosta ≈ 90 Mt). Natiivisepän ASTC-seinätaso (MuseoTekstuurit) korvaa tämän.</summary>
        public static int KuvaPitkaSivu = 1024;
        readonly List<RenderTexture> kuvat = new List<RenderTexture>();
        public int KuviaLadattu { get; private set; }

        /// <summary>Teosten kuvat kuvajuuren alta (https:// tai file://; teokset.json "kuva" = suhteellinen polku), yksi kerrallaan,
        /// jotta purettu alkuperäinen ei kasaudu muistiin. Epäonnistunut kuva jättää paikkakuvan. vainTeos: vain tämä (ASTC-paketin vara).</summary>
        public IEnumerator LataaKuvat(Sali s, string juuri, System.Action<string> kirjaa, string vainTeos = null)
        {
            if (string.IsNullOrEmpty(juuri)) yield break;
            if (!juuri.EndsWith("/")) juuri += "/";
            float t0 = Time.realtimeSinceStartup; int virheita = 0;
            foreach (var r in s.Ripustukset)
            {
                if (vainTeos != null && r.Teos.Id != vainTeos) continue;
                if (string.IsNullOrEmpty(r.Teos.Kuva) || !TeosMateriaalit.TryGetValue(r.Teos.Id, out var mat) || mat == null) continue;
                using (var pyynto = UnityWebRequestTexture.GetTexture(juuri + r.Teos.Kuva, true))
                {
                    yield return pyynto.SendWebRequest();
                    if (mat == null) yield break;   // linssi suljettiin latauksen aikana
                    if (pyynto.result != UnityWebRequest.Result.Success) { virheita++; kirjaa?.Invoke($"museo: kuva {r.Teos.Id} ei latautunut ({pyynto.error})"); continue; }
                    var alkup = DownloadHandlerTexture.GetContent(pyynto);
                    float k = Mathf.Min(1f, (float)KuvaPitkaSivu / Mathf.Max(alkup.width, alkup.height));
                    var rt = new RenderTexture(Mathf.Max(4, Mathf.RoundToInt(alkup.width * k)), Mathf.Max(4, Mathf.RoundToInt(alkup.height * k)), 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB)
                    { name = "Teos " + r.Teos.Id, useMipMap = true, autoGenerateMips = true, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear, anisoLevel = 4 };
                    rt.Create();
                    Graphics.Blit(alkup, rt);
                    Object.Destroy(alkup);
                    kuvat.Add(rt);
                    mat.mainTexture = rt;
                    KuviaLadattu++;
                    if (vainTeos != null) kirjaa?.Invoke($"museo: {vainTeos} JPEG-varakuva {rt.width}×{rt.height}");
                }
            }
            if (vainTeos == null) kirjaa?.Invoke($"museo: kuvat {KuviaLadattu}/{s.Ripustukset.Count} ladattu ({virheita} virhettä) {Time.realtimeSinceStartup - t0:F1} s, pitkä sivu {KuvaPitkaSivu} px");
        }

        public void Tuhoa()
        {
            foreach (var rt in kuvat) if (rt != null) { rt.Release(); Object.Destroy(rt); }
            kuvat.Clear();
            foreach (var o in tuhottavat) if (o != null) Object.Destroy(o);
            tuhottavat.Clear(); TeosMateriaalit.Clear(); Kuvapaikat.Clear();
            if (juuri != null) Object.Destroy(juuri.gameObject);
        }
    }
}
