// KAUPUNKINÄKYMÄN POINOTON KOOSTE (Linssiseppä 8.10.2026; Natiiviseppä: TAA, juna 169/170): URP 17.3 ajaa ajallisen
// reunanpehmennyksen vain kameralla, jolla ei ole kamerapinoa. Kun Laatutaso.Ajallinen, pallon kori, sääkerros ja
// yksityiskohtakortti piirretään omilla Base-kameroillaan yhteiseen ruudun kokoiseen RT:hen (ei jälkikäsittelyä, ei MSAA:ta, ei
// jitteriä) järjestyksessä; ensimmäinen piirtävä tyhjentää läpinäkyväksi. RT on esikerrottu (läpikuultavat varjostimet: alfa
// "One OneMinusSrcAlpha"), joten piirron jälkeen se muunnetaan suoraksi alfaksi (KoosteSuora) Kuvaksi, jonka Natiivi-UI näyttää UI:n
// alimpana kerroksena (null = ei mitään piirrettävää). Ilman Ajallista järjestelmät käyttävät kamerapinoa kuten ennen.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Linssit
{
    public static class KaupunkiKooste
    {
        public const int Kori = 0, Saa = 1, Kortti = 2;
        /// <summary>
        /// Käytetäänkö koostetta pinon sijaan: Natiivisepän laatutaso (kuumana pois) JA kaupunkinäkymän kytkin. PT 8.10. 23.4x: junassa 169
        /// OLETUS POIS (asetukset.json "kaupunki.Ajallinen" 0); kuvapari junan 169 käännöksestä, päälle seuraavassa junassa.
        /// Komento `opas ajallinen paalle|pois` ohittaa (Pakko).
        /// </summary>
        public static bool Kaytossa => Laatutaso.Ajallinen && (Pakko ?? Matkakirja.Peli.Asetus.Luku("kaupunki.Ajallinen", 0) != 0);
        public static bool? Pakko;
        /// <summary>Suoran alfan kuva UI:lle; null, kun yksikään koosteen kamera ei piirrä.</summary>
        public static RenderTexture Kuva { get; private set; }

        static RenderTexture rt, suora;
        static Material muunto;
        static readonly List<(Camera K, int J)> kamerat = new List<(Camera, int)>();
        static bool kytketty;

        /// <summary>Kamera koosteeseen (Base, kohde = koosteen RT); järjestys Kori, Saa, Kortti.</summary>
        public static void Lisaa(Camera k, int jarjestys)
        {
            if (k == null) return;
            kamerat.RemoveAll(x => x.K == null || x.K == k);
            kamerat.Add((k, jarjestys));
            var d = k.GetUniversalAdditionalCameraData();
            d.renderType = CameraRenderType.Base; d.renderPostProcessing = false; d.antialiasing = AntialiasingMode.None;
            d.requiresColorTexture = false; d.requiresDepthTexture = false;
            k.allowMSAA = false; k.allowHDR = false;
            k.targetTexture = Kohde();
            if (!kytketty) { RenderPipelineManager.beginContextRendering += Ennen; RenderPipelineManager.endContextRendering += Jalkeen; kytketty = true; }
        }

        public static void Poista(Camera k)
        {
            kamerat.RemoveAll(x => x.K == null || x.K == k);
            if (k != null && k.targetTexture == rt) k.targetTexture = null;
            if (kamerat.Count == 0) Pura();
        }

        static RenderTexture Kohde()
        {
            int w = Mathf.Max(16, Screen.width), h = Mathf.Max(16, Screen.height);
            if (rt != null && rt.width == w && rt.height == h) return rt;
            if (rt != null) { rt.Release(); Object.Destroy(rt); }
            if (suora != null) { suora.Release(); Object.Destroy(suora); }
            rt = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32) { name = "Kaupunkikooste", antiAliasing = 1 }; rt.Create();
            suora = new RenderTexture(w, h, 0, RenderTextureFormat.ARGB32) { name = "Kaupunkikooste (suora)", antiAliasing = 1 }; suora.Create();
            foreach (var (k, _) in kamerat) if (k != null) k.targetTexture = rt;
            return rt;
        }

        static void Ennen(ScriptableRenderContext _, List<Camera> __)
        {
            Kohde();
            kamerat.RemoveAll(x => x.K == null);
            kamerat.Sort((a, b) => a.J.CompareTo(b.J));
            bool eka = true;
            foreach (var (k, j) in kamerat)
            {
                if (!k.isActiveAndEnabled) continue;
                k.depth = 50 + j;   // piirtojärjestys: kori, sää, kortti
                k.clearFlags = eka ? CameraClearFlags.SolidColor : CameraClearFlags.Depth;
                k.backgroundColor = Color.clear;
                eka = false;
            }
        }

        static void Jalkeen(ScriptableRenderContext _, List<Camera> __)
        {
            bool piirsi = false;
            foreach (var (k, _) in kamerat) if (k != null && k.isActiveAndEnabled) { piirsi = true; break; }
            if (!piirsi || rt == null) { Kuva = null; return; }
            if (muunto == null)
            {
                var sh = Resources.Load<Shader>("Varjostimet/KoosteSuora");
                if (sh == null) { Kuva = rt; return; }
                muunto = new Material(sh) { name = "Kaupunkikooste suoraksi" };
            }
            Graphics.Blit(rt, suora, muunto);
            Kuva = suora;
        }

        static void Pura()
        {
            if (kytketty) { RenderPipelineManager.beginContextRendering -= Ennen; RenderPipelineManager.endContextRendering -= Jalkeen; kytketty = false; }
            if (rt != null) { rt.Release(); Object.Destroy(rt); rt = null; }
            if (suora != null) { suora.Release(); Object.Destroy(suora); suora = null; }
            Kuva = null;
        }
    }
}
