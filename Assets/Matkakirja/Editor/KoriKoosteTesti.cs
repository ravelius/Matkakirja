// KUUMAILMAPALLON KORIN KOOSTEEN GPU-TESTI (Päätoimittaja 7.10. 19.0x): käännöspalvelun projektissa Unity -batchmode ilman
// -nographicsia (Metal) -executeMethod Matkakirja.Editori.KoriKoosteTesti.Aja. Tyhjä kohtaus, kirkas "kaupunki"-taso kaupunkikameran
// edessä, PalloKori.Kayta → korin kamera piirtää tekstuuriinsa ja kaupunkikamera pinoineen omaan tekstuuriinsa (koosteen kanssa
// ja ilman). Tarkistukset: kuva ei ole musta, kori ruudun alaosassa (yläneljännes ilman koria), kaupunkialueen keskivaloisuus
// korimaskin ulkopuolella eroaa alle 2 % kuvasta ilman koostetta. Kuvat tulokset/kori-kooste-{kanssa,ilman}.png. Exit 0 = läpi.
using System;
using System.IO;
using Matkakirja.Linssit;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace Matkakirja.Editori
{
    public static class KoriKoosteTesti
    {
        public static void Aja()
        {
            int koodi = 1;
            try { koodi = Testaa() ? 0 : 1; }
            catch (Exception e) { Debug.LogError("KORITESTI kaatui: " + e); }
            EditorApplication.Exit(koodi);
        }

        static bool Testaa()
        {
            EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
            const int W = 600, H = 1300;   // iPhone-pysty
            var rt = new RenderTexture(W, H, 24, RenderTextureFormat.ARGB32) { name = "Kaupunkikamera" };
            rt.Create();
            var kg = new GameObject("Kaupunkikamera");
            var perus = kg.AddComponent<Camera>();
            perus.fieldOfView = 60f; perus.nearClipPlane = 0.3f; perus.farClipPlane = 1000f;
            perus.clearFlags = CameraClearFlags.SolidColor; perus.backgroundColor = new Color(0.2f, 0.3f, 0.5f, 1f);
            perus.targetTexture = rt;
            perus.cullingMask = 1 << 0;
            // Kaupunki: ruudun täyttävä shakkiruututekstuuri (valoisa, vaihteleva) 50 m edessä.
            var tex = new Texture2D(64, 64) { filterMode = FilterMode.Point };
            for (int y = 0; y < 64; y++) for (int x = 0; x < 64; x++)
                tex.SetPixel(x, y, ((x / 8 + y / 8) % 2 == 0) ? new Color(0.9f, 0.85f, 0.7f) : new Color(0.35f, 0.45f, 0.6f));
            tex.Apply();
            var taso = GameObject.CreatePrimitive(PrimitiveType.Quad);
            taso.layer = 0;
            taso.transform.SetParent(kg.transform, false);
            taso.transform.localPosition = new Vector3(0, 0, 50);
            float k = 2f * 50f * Mathf.Tan(30f * Mathf.Deg2Rad);
            taso.transform.localScale = new Vector3(k * W / H * 1.05f, k * 1.05f, 1);
            var mat = new Material(Shader.Find("Universal Render Pipeline/Unlit")); mat.SetTexture("_BaseMap", tex);
            taso.GetComponent<MeshRenderer>().sharedMaterial = mat;

            var kori = new PalloKori();
            kori.Kayta(true, perus);
            if (kori.KoriKamera == null || kori.KoosteKamera == null) { Debug.LogError("KORITESTI: korin kamerat puuttuvat"); return false; }
            Color32[] kanssa = null, ilman = null;
            for (int i = 0; i < 3; i++) { kori.Kayta(true, perus); kori.KoriKamera.Render(); perus.Render(); }
            kanssa = Lue(rt, W, H);
            kori.KoosteKamera.enabled = false;
            perus.Render();
            ilman = Lue(rt, W, H);
            kori.KoosteKamera.enabled = true;
            Directory.CreateDirectory("tulokset");
            Tallenna(kanssa, W, H, "tulokset/kori-kooste-kanssa.png");
            Tallenna(ilman, W, H, "tulokset/kori-kooste-ilman.png");

            // Korimaski: pikselit, joissa kuvat eroavat selvästi.
            int yla = 0, ala = 0, kaupunki = 0, maski = 0; double sKanssa = 0, sIlman = 0, kaikki = 0;
            for (int y = 0; y < H; y++)
                for (int x = 0; x < W; x++)
                {
                    int i = y * W + x;
                    float a = Valo(kanssa[i]), b = Valo(ilman[i]);
                    kaikki += a;
                    bool kori_ = Mathf.Abs(a - b) > 0.04f;
                    if (kori_) { maski++; if (y < H / 4) ala++; if (y >= 3 * H / 4) yla++; }   // ReadPixels: y = 0 alhaalla
                    else { kaupunki++; sKanssa += a; sIlman += b; }
                }
            double keskiKanssa = sKanssa / Math.Max(1, kaupunki), keskiIlman = sIlman / Math.Max(1, kaupunki);
            double ero = Math.Abs(keskiKanssa - keskiIlman) / Math.Max(1e-6, keskiIlman);
            double valo = kaikki / (W * H);
            bool eiMusta = valo > 0.1;
            bool suunta = ala > H * W / 4 * 0.05 && yla < ala * 0.25;
            bool kaupunkiOk = ero < 0.02;
            bool koriNakyy = maski > W * H * 0.03;
            Debug.Log($"KORITESTI: keskivalo {valo:F3} ({(eiMusta ? "ok" : "MUSTA")}), korimaski {maski * 100.0 / (W * H):F1} % " +
                      $"(alaneljännes {ala}, yläneljännes {yla}: {(suunta ? "kori alhaalla" : "SUUNTA VÄÄRIN")}), kaupunkialueen valoisuusero {ero * 100:F2} % " +
                      $"({(kaupunkiOk ? "ok" : "YLI 2 %")}), kori {(koriNakyy ? "näkyy" : "EI NÄY")}");
            bool ok = eiMusta && suunta && kaupunkiOk && koriNakyy;
            Debug.Log("KORITESTI " + (ok ? "LÄPI" : "HYLÄTTY"));
            kori.Sulje();
            return ok;
        }

        static float Valo(Color32 c) => (0.2126f * c.r + 0.7152f * c.g + 0.0722f * c.b) / 255f;

        static Color32[] Lue(RenderTexture rt, int w, int h)
        {
            var ed = RenderTexture.active; RenderTexture.active = rt;
            var t = new Texture2D(w, h, TextureFormat.RGBA32, false);
            t.ReadPixels(new Rect(0, 0, w, h), 0, 0); t.Apply();
            RenderTexture.active = ed;
            var p = t.GetPixels32(); UnityEngine.Object.DestroyImmediate(t);
            return p;
        }

        static void Tallenna(Color32[] p, int w, int h, string polku)
        {
            var t = new Texture2D(w, h, TextureFormat.RGBA32, false); t.SetPixels32(p); t.Apply();
            File.WriteAllBytes(polku, t.EncodeToPNG()); UnityEngine.Object.DestroyImmediate(t);
        }
    }
}
