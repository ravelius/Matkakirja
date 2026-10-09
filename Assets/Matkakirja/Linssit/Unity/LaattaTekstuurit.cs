// LAATTATEKSTUURIEN PIENENNYS (Natiiviseppä 9.10.2026, juna 174 -selvitys: iPad Pro 13 M1 8 Gt, Pariisi, Googlen laattojen
// kuvat ~1,2 Gt; PROTO, OLETUS POIS). Asetustiedosto Documents/kaupunki-kuva-asetukset.txt "laattapienennys 0|1|2"
// (0 = pois mutta diagnostiikka päällä, 1 = puolikas, 2 = neljännes); ilman avainta pienen muistin laite käyttää
// PieniMuistiTasoa (0 = pois).
//
// CESIUM 1.25.1 (luettu natiivikirjastosta, TextureLoader.o / UnityPrepareRendererResources.o): perusvärikuva on tavallinen
// Texture2D (TextureFormat, natiivin valmiit mipit, hideFlags HideAndDontSave, Apply(false, true) → vain GPU-kopio), yksi per
// primitiivi omassa materiaali-instanssissa (_baseColorTexture). free() tuhoaa materiaalin jokaisen HideAndDontSave-tekstuurin.
// Siksi: OnTileGameObjectCreated (primitiivit valmiina) → pienempi kopio samassa muodossa (mipit k..n Graphics.CopyTexturella,
// GPU:lla, toimii lukukelvottomalle), kopio materiaaliin, alkuperäinen Destroy heti (Cesium ei pidä siihen muuta viitettä →
// GPU-muisti vapautuu kehyksen lopussa). Kopio on HideAndDontSave, joten Cesiumin free() tuhoaa sen laatan purussa (ei omaa
// OnDestroyta: sitä ei kutsuta laatalle, joka ei koskaan aktivoitunut). Rasteripeitteet (_overlayTexture_*) ennallaan.
// EI KOSKE: natiivin glTF-mallin kuvadataa (cesium-native pitää mallin laatan sisällössä; ei C#-rajapintaa).
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.Experimental.Rendering;
using Object = UnityEngine.Object;

namespace Matkakirja.Natiivi
{
    public static class LaattaTekstuurit
    {
        /// <summary>Asetustiedoston "laattapienennys" (−1 = ei asetettu).</summary>
        public static int Pakotettu = -1;
        /// <summary>Pienen muistin laitteen (KaupunkiKuva.PieniMuisti) taso ilman asetusta: 0 = pois (proto).</summary>
        public static int PieniMuistiTaso = 0;
        public static int Taso => Pakotettu >= 0 ? Mathf.Clamp(Pakotettu, 0, LaattaPienennys.MaksimiTaso) : KaupunkiKuva.PieniMuisti ? PieniMuistiTaso : 0;
        /// <summary>Diagnostiikka 15 s välein: taso > 0 tai asetus annettu (myös 0 = vertailuajo ilman pienennystä).</summary>
        static bool Diagnostiikka => Taso > 0 || Pakotettu >= 0;

        static readonly int IdPerusvari = Shader.PropertyToID("_baseColorTexture");
        /// <summary>Kopion instanceID → alkuperäisen arvioidut tavut (diagnostiikka; karsitaan joka kirjauksessa).</summary>
        static readonly Dictionary<int, long> alkuperaiset = new Dictionary<int, long>();
        static readonly List<MeshRenderer> renderoijat = new List<MeshRenderer>();
        static int luotu, ohitettu;
        static float kirjattu = -100f;
        static bool virheKirjattu;

        /// <summary>LuoTileset: kuuntelija jokaiselle kaupungin tilesetille (taso tarkistetaan laatan luonnissa).</summary>
        public static void Kytke(Cesium3DTileset t)
        {
            if (t == null) return;
            t.OnTileGameObjectCreated -= Laatta;
            t.OnTileGameObjectCreated += Laatta;
        }

        /// <summary>Kaupungin sulkeutuessa (laatat tuhoutuvat tilesetin mukana).</summary>
        public static void Nollaa() { alkuperaiset.Clear(); luotu = ohitettu = 0; kirjattu = -100f; }

        static void Laatta(GameObject go)
        {
            int taso = Taso;
            if (taso <= 0 || go == null || SystemInfo.copyTextureSupport == UnityEngine.Rendering.CopyTextureSupport.None) return;
            go.GetComponentsInChildren(true, renderoijat);
            foreach (var r in renderoijat)
            {
                var m = r != null ? r.sharedMaterial : null;
                if (m == null || !m.HasTexture(IdPerusvari) || !(m.GetTexture(IdPerusvari) is Texture2D src)) continue;
                // Vain Cesiumin luomat (sama ehto kuin sen free()): HideAndDontSave ja lukukelvoton; ei omia kopioita uudelleen.
                if ((src.hideFlags & HideFlags.HideAndDontSave) != HideFlags.HideAndDontSave || src.isReadable || alkuperaiset.ContainsKey(src.GetInstanceID())) continue;
                var k = Pienenna(src, taso);
                if (k == null) { ohitettu++; continue; }
                m.SetTexture(IdPerusvari, k);
                alkuperaiset[k.GetInstanceID()] = Tavut(src);
                Object.Destroy(src);   // CopyTexture on jo komentojonossa ennen tuhoa (kehyksen lopussa)
                luotu++;
            }
            renderoijat.Clear();
        }

        static Texture2D Pienenna(Texture2D src, int taso)
        {
            var v = LaattaPienennys.Valitse(src.width, src.height, src.mipmapCount, taso);
            if (v.Ohita <= 0) return null;
            Texture2D k = null;
            try
            {
                bool lineaarinen = !GraphicsFormatUtility.IsSRGBFormat(src.graphicsFormat);
                k = new Texture2D(v.Leveys, v.Korkeus, src.format, v.Mipit, lineaarinen, true)
                {
                    name = "laatta/" + (1 << v.Ohita),
                    hideFlags = HideFlags.HideAndDontSave,   // Cesiumin free() tuhoaa
                    wrapModeU = src.wrapModeU, wrapModeV = src.wrapModeV, filterMode = src.filterMode, anisoLevel = src.anisoLevel,
                };
                k.Apply(false, true);   // CPU-puskuri pois heti (vain GPU, kuten Cesiumin oma)
                for (int i = 0; i < v.Mipit; i++) Graphics.CopyTexture(src, 0, i + v.Ohita, k, 0, i);
                return k;
            }
            catch (Exception e)
            {
                if (!virheKirjattu) { virheKirjattu = true; Debug.Log($"MATKAKIRJA kaupunki: laattatekstuurit: pienennys ohitettu ({src.format} {src.width}×{src.height}, {src.mipmapCount} mip): {e.Message}"); }
                if (k != null) Object.Destroy(k);
                return null;
            }
        }

        static long Tavut(Texture2D t)
        {
            var gf = t.graphicsFormat;
            return LaattaPienennys.Tavut(t.width, t.height, t.mipmapCount, (int)GraphicsFormatUtility.GetBlockWidth(gf), (int)GraphicsFormatUtility.GetBlockHeight(gf), (int)GraphicsFormatUtility.GetBlockSize(gf));
        }

        /// <summary>Joka kehys kaupungissa (CesiumKaupunki.PidaMaski): 15 s välein tilesetin perusvärikuvien määrä ja arvioidut tavut
        /// (leveys × korkeus × muodon tavut, mipit) nyt ja ilman pienennystä.</summary>
        public static void Seuraa(Cesium3DTileset t)
        {
            if (!Diagnostiikka || t == null || Time.realtimeSinceStartup - kirjattu < 15f) return;
            kirjattu = Time.realtimeSinceStartup;
            long nyt = 0, ilman = 0; int kpl = 0, pien = 0;
            var nahty = new Dictionary<int, long>();
            t.GetComponentsInChildren(true, renderoijat);
            foreach (var r in renderoijat)
            {
                var m = r != null ? r.sharedMaterial : null;
                if (m == null || !m.HasTexture(IdPerusvari) || !(m.GetTexture(IdPerusvari) is Texture2D tx)) continue;
                int id = tx.GetInstanceID();
                if (nahty.ContainsKey(id)) continue;
                long b = Tavut(tx);
                kpl++; nyt += b;
                if (alkuperaiset.TryGetValue(id, out var a)) { pien++; ilman += a; nahty[id] = a; }
                else { ilman += b; nahty[id] = -1; }
            }
            renderoijat.Clear();
            alkuperaiset.Clear();   // karsinta: vain elossa olevat kopiot jäävät
            foreach (var kv in nahty) if (kv.Value >= 0) alkuperaiset[kv.Key] = kv.Value;
            Debug.Log("MATKAKIRJA kaupunki: " + LaattaPienennys.Rivi(Taso, kpl, pien, nyt, ilman, luotu, ohitettu));
        }
    }
}
