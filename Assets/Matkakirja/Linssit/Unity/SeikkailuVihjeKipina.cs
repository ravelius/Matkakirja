// HISTORIAMOOTTORI: VIHJEEN VALOKIPINÄ UNITYSSA (Pelikoodari 11.10.2026; PT:n Olavinlinna-yösuunnitelma A4; lento Ydin VihjeLento).
// Vihjeen maailman valo (ValoVihje, omistaja 8.10.: ei Pulua, ei tekstiä) näkyväksi myös pimeässä ja näkymän ulkopuolella: pieni hehkuva
// kipinä (kameraa kohti kääntyvä neliö, pyöreä pehmeä kuvio, Sprites/Default kuten oppaan korostus: aina mukana, läpinäkyvä, ZWrite pois,
// seinät peittävät) lähtee katseen edestä, lentää kaarena kohteeseen lyhyen vanan kanssa ja jää sykkimään kohteeseen. Kirkkaus perillä
// vihjeen valon mukaan (kutsujan Voima 0–1); kimalluksen pistevalo seuraa kipinää (SeikkailuVihjeet).
using System;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVihjeKipina : MonoBehaviour
    {
        /// <summary>Kipinän koko lennossa ja perillä (m), vanan pituus (kopioita) ja viive (s), sykkeen jakso (s), HDR-voimakkuus (yön bloom).</summary>
        const float KokoLento = 0.16f, KokoPerilla = 0.24f, VanaViive = 0.045f, SykeS = 1.2f, Hdr = 2.4f;
        const int Vana = 5;

        static Material materiaali; static Texture2D kuvio;
        VihjeLento lento; Transform[] osat; Renderer[] piirrot; Vector3[] historia; int historiaN;
        Color vari; float aika, perillaAika;
        /// <summary>Perillä näkyvyys 0–1 (vihjeen valon kirkkaus suhteessa huippuun); 0 → kipinä häviää.</summary>
        public Func<float> Voima;
        /// <summary>Kipinän nykyinen paikka (pistevalo seuraa).</summary>
        public Vector3 Paikka { get; private set; }
        public event Action Perilla;
        bool perillaKerrottu;

        public static SeikkailuVihjeKipina Lenna(Transform isa, Vector3 alku, Vector3 kohde, Color vari, bool lenna, int kerros)
        {
            var go = new GameObject("Vihjeen kipinä") { layer = kerros }; go.transform.SetParent(isa, false);
            var k = go.AddComponent<SeikkailuVihjeKipina>();
            k.vari = vari;
            k.lento = new VihjeLento(lenna ? (alku.x, alku.y, alku.z) : (kohde.x, kohde.y, kohde.z), (kohde.x, kohde.y, kohde.z));
            k.osat = new Transform[Vana + 1]; k.piirrot = new Renderer[Vana + 1]; k.historia = new Vector3[64];
            for (int i = 0; i <= Vana; i++)
            {
                var q = new GameObject(i == 0 ? "kipinä" : "vana") { layer = kerros };
                q.transform.SetParent(go.transform, false);
                q.AddComponent<MeshFilter>().sharedMesh = Nelio();
                var r = q.AddComponent<MeshRenderer>(); r.sharedMaterial = Materiaali(); r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; r.receiveShadows = false;
                k.osat[i] = q.transform; k.piirrot[i] = r;
            }
            k.Paikka = k.V(k.lento.Paikka(0));
            return k;
        }

        Vector3 V((double X, double Y, double Z) p) => new Vector3((float)p.X, (float)p.Y, (float)p.Z);

        void Update()
        {
            float dt = Time.unscaledDeltaTime; aika += dt;
            bool lennossa = !lento.Perilla;
            Paikka = V(lento.Paivita(dt));
            historia[historiaN++ % historia.Length] = Paikka;
            if (!lennossa) perillaAika += dt;
            if (lento.Perilla && !perillaKerrottu) { perillaKerrottu = true; Perilla?.Invoke(); }
            float voima = lennossa ? 1f : Mathf.Clamp01(Voima?.Invoke() ?? 0f);
            if (!lennossa && voima <= 0.01f && perillaAika > 0.5f) { Destroy(gameObject); return; }
            var cam = Kamera();
            float syke = lennossa ? 1f : 0.75f + 0.25f * Mathf.Cos(2f * Mathf.PI * perillaAika / SykeS);
            for (int i = 0; i <= Vana; i++)
            {
                // Vana: aiemmat paikat (VanaViive välein), pienenevät ja himmenevät; perillä vana sulautuu kipinään.
                int taakse = Mathf.Min(historiaN - 1, Mathf.RoundToInt(i * VanaViive / Mathf.Max(1e-3f, dt)));
                var p = historia[((historiaN - 1 - taakse) % historia.Length + historia.Length) % historia.Length];
                float osuus = 1f - i / (float)(Vana + 1);
                float koko = (lennossa ? KokoLento : KokoPerilla * syke) * (i == 0 ? 1f : 0.85f * osuus);
                osat[i].position = p; osat[i].localScale = Vector3.one * koko;
                if (cam != null) osat[i].rotation = Quaternion.LookRotation(osat[i].position - cam.transform.position);
                var c = vari * Hdr; c.a = voima * (i == 0 ? 1f : 0.6f * osuus * (lennossa ? 1f : 0f));
                var mpb = Lohko(); mpb.SetColor("_Color", c); piirrot[i].SetPropertyBlock(mpb);
                piirrot[i].enabled = c.a > 0.005f;
            }
        }

        static MaterialPropertyBlock lohko;
        static MaterialPropertyBlock Lohko() => lohko ??= new MaterialPropertyBlock();

        static Camera Kamera()
        {
            var p = SeikkailuPelaaja.Aktiivinen; var n = p != null ? p.GetComponentInParent<DioraamaNayttamo>() : null;
            return n != null && n.Kamera != null ? n.Kamera : Camera.main;
        }

        /// <summary>Lähtöpaikka: katseen edestä (VihjeLento.LahtoEteenM) ja hieman alempaa; null ilman kameraa.</summary>
        public static Vector3? Lahto()
        {
            var cam = Kamera(); if (cam == null) return null;
            var t = cam.transform;
            return t.position + t.forward * (float)VihjeLento.LahtoEteenM - t.up * (float)VihjeLento.LahtoAlasM;
        }

        /// <summary>Onko piste kameran näkymässä (edessä ja ruudun sisällä, reunasta 5 %).</summary>
        public static bool Nakyvissa(Vector3 piste)
        {
            var cam = Kamera(); if (cam == null) return false;
            var v = cam.WorldToViewportPoint(piste);
            return v.z > 0 && v.x > 0.05f && v.x < 0.95f && v.y > 0.05f && v.y < 0.95f;
        }

        static Mesh nelio;
        /// <summary>Yksikköneliö (−0,5…0,5) valkoisin verteksivärein: Sprites/Default kertoo verteksivärillä (Quad-primitiivissä ei värejä).</summary>
        static Mesh Nelio()
        {
            if (nelio != null) return nelio;
            nelio = new Mesh { name = "Vihjeen kipinä" };   // kieli: ei (tekninen)
            nelio.SetVertices(new[] { new Vector3(-0.5f, -0.5f, 0), new Vector3(0.5f, -0.5f, 0), new Vector3(-0.5f, 0.5f, 0), new Vector3(0.5f, 0.5f, 0) });
            nelio.SetUVs(0, new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) });
            nelio.SetColors(new[] { Color.white, Color.white, Color.white, Color.white });
            nelio.SetTriangles(new[] { 0, 2, 1, 2, 3, 1 }, 0);
            nelio.RecalculateBounds();
            return nelio;
        }

        static Material Materiaali()
        {
            if (materiaali != null) return materiaali;
            var s = Shader.Find("Sprites/Default") ?? Shader.Find("UI/Default");
            materiaali = new Material(s) { name = "Vihjeen kipinä", renderQueue = 3100, mainTexture = Kuvio() };   // kieli: ei (tekninen)
            return materiaali;
        }

        /// <summary>Pyöreä pehmeä kuvio: kirkas ydin ja nopeasti hiipuva hehku (64 × 64, luodaan kerran).</summary>
        static Texture2D Kuvio()
        {
            if (kuvio != null) return kuvio;
            const int n = 64; kuvio = new Texture2D(n, n, TextureFormat.RGBA32, false) { name = "Vihjeen kipinä", wrapMode = TextureWrapMode.Clamp };   // kieli: ei (tekninen)
            var px = new Color32[n * n];
            for (int y = 0; y < n; y++)
                for (int x = 0; x < n; x++)
                {
                    float dx = (x + 0.5f) / n * 2f - 1f, dy = (y + 0.5f) / n * 2f - 1f, r = Mathf.Sqrt(dx * dx + dy * dy);
                    float a = Mathf.Clamp01(Mathf.Exp(-r * r * 9f) + 0.35f * Mathf.Exp(-r * r * 2.2f) - 0.04f) * (r < 1f ? 1f : 0f);
                    px[y * n + x] = new Color32(255, 255, 255, (byte)Mathf.RoundToInt(255 * a));
                }
            kuvio.SetPixels32(px); kuvio.Apply(false, true);
            return kuvio;
        }
    }
}
