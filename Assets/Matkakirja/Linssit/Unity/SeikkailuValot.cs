// HISTORIAMOOTTORI: LINNAN VALOEFEKTIT (Siirtoseppä 7.10.2026; PÄÄTOIMITTAJA 20.3x–20.4x: kynttilät, soihdut ja kuunsäteet linnaan,
// laatutasokytkin). Paketit: Vefects Candle VFX - URP (liekit, kevyet: kaikilla laitteilla) ja Kronnect Volumetric Lights 2 (URP;
// oletuksena Macilla ja M-sarjan iPadeilla, iPhonella pois kunnes mitattu). Volumetric Lightsin tyypit ovat URP:n assemblyssä
// (asmref), joten ne haetaan heijastuksella: tämä kääntyy ilman pakettia, ja puuttuva paketti ohitetaan hiljaa.
// - Liekit: Liekki(isa) luo VFX_Candle_Flame_01:n kynttilän tai lyhdyn liekiksi (DioraamaLiekit.LuoLyhty, kappelin kynttilät).
// - Kuunsäteet: Saede(paikka, suunta, …) luo spottivalon VolumetricLight-komponentilla; render feature lisätään URP:n renderereihin
//   ensimmäisellä käytöllä ja poistetaan, kun kytkin menee pois. Testi: "poikki valot volumetriset 0|1" ja "poikki valot liekit 0|1".
// - Hehku (8.10.): pistevalo, jonka ympärille VolumetricLight tekee savuisen hehkun. Kannettu valo (vartijan lyhty tai soihtu) palaa
//   aina ja vain hehku seuraa laatutasoa; tilan soihtujen ja tulisijojen hehku on kokonaan laatutason takana.
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class SeikkailuValot
    {
        static SeikkailuVfxViitteet viitteet; static bool haettu;
        static Type tyyppiValo, tyyppiFeature;
        static readonly List<ScriptableRendererFeature> lisatyt = new List<ScriptableRendererFeature>();
        /// <summary>Luodut säteet (kytkin ajon aikana näyttää/piilottaa ne; luukun säde lisäksi luukun tilan mukaan).</summary>
        static readonly List<Light> saeteet = new List<Light>();
        /// <summary>Hehkut: (valo, palaa aina). Aina-valoista kytkin vaihtaa vain hehkun, muista myös valon.</summary>
        static readonly List<(Light Valo, bool Aina)> hehkut = new List<(Light, bool)>();

        /// <summary>Candle VFX -liekit (kevyet, oletuksena päällä kaikilla).</summary>
        public static bool Liekit = true;
        /// <summary>Volumetriset valot: laatutaso (Mac ja M-sarjan iPad päällä, iPhone ja vanhat iPadit pois).</summary>
        public static bool Volumetriset = OletusVolumetriset();
        public static event Action Muuttui;
        /// <summary>Render feature lisätty (jokin volumetrinen säde käytössä): dioraaman kamera pyytää syvyyden vain silloin.</summary>
        public static bool Kaytossa => lisatyt.Count > 0;

        /// <summary>Oletus: M-sarjan iPad tai Apple silicon -Mac (Natiivisepän Laitetaso.OnkoMSarja 8.10.: vanha sääntö luki A16-iPadin ja
        /// mini A17 Pron M-sarjaksi).</summary>
        static bool OletusVolumetriset() => Laitetaso.OnkoMSarja(SystemInfo.deviceModel, SystemInfo.processorType,
            Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXEditor);

        static bool kuumaPois;
        /// <summary>Lämpö (Natiiviseppä 8.10.): kuumana volumetriset pois linnan ajaksi, viileänä takaisin, jos ne olivat päällä.
        /// Kysellään näyttämön päivityksestä (Lampo.Muuttui nollautuu domain-latauksessa).</summary>
        public static void LampoTarkistus()
        {
            if (Lampo.Kuuma && Volumetriset) { kuumaPois = true; Aseta(volumetriset: false); Debug.Log("MATKAKIRJA seikkailu: lämpö → volumetriset pois"); }
            else if (!Lampo.Kuuma && kuumaPois) { kuumaPois = false; Aseta(volumetriset: true); Debug.Log("MATKAKIRJA seikkailu: lämpö normaali → volumetriset takaisin"); }
        }

        public static void Aseta(bool? liekit = null, bool? volumetriset = null)
        {
            if (liekit is bool l) Liekit = l;
            if (volumetriset is bool v)
            {
                Volumetriset = v;
                if (!v) PoistaFeature(); else VarmistaFeature();
                saeteet.RemoveAll(x => x == null);
                foreach (var s in saeteet) { var vl = tyyppiValo != null ? s.GetComponent(tyyppiValo) as Behaviour : null; if (vl != null) vl.enabled = v; s.enabled = v; }
                hehkut.RemoveAll(x => x.Valo == null);
                foreach (var h in hehkut) { var vl = tyyppiValo != null ? h.Valo.GetComponent(tyyppiValo) as Behaviour : null; if (vl != null) vl.enabled = v; h.Valo.enabled = v || h.Aina; }
            }
            Muuttui?.Invoke();
        }

        static void Hae()
        {
            if (haettu) return;
            haettu = true;
            viitteet = Resources.Load<SeikkailuVfxViitteet>("Seikkailu/SeikkailuVfx");
            foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
            {
                tyyppiValo ??= asm.GetType("VolumetricLights.VolumetricLight");
                tyyppiFeature ??= asm.GetType("VolumetricLights.VolumetricLightsRenderFeature");
            }
        }

        /// <summary>Kynttilän liekki VFX:nä isän lapseksi (isän skaala kumotaan). Null, jos pois tai paketti puuttuu.</summary>
        public static GameObject Liekki(Transform isa, int kerros)
        {
            Hae();
            if (!Liekit || viitteet == null || viitteet.KynttilanLiekki == null || isa == null) return null;
            var go = UnityEngine.Object.Instantiate(viitteet.KynttilanLiekki, isa, false);
            go.name = "Kynttilän liekki (VFX)";
            var s = isa.lossyScale;
            go.transform.localScale = new Vector3(s.x != 0 ? 1f / s.x : 1f, s.y != 0 ? 1f / s.y : 1f, s.z != 0 ? 1f / s.z : 1f);
            foreach (var t in go.GetComponentsInChildren<Transform>(true)) t.gameObject.layer = kerros;
            foreach (var l in go.GetComponentsInChildren<Light>(true)) l.enabled = false;   // valo tulee pelin omista valoista
            foreach (var a in go.GetComponentsInChildren<AudioSource>(true)) a.enabled = false;
            return go;
        }

        /// <summary>Volumetrinen säde (kuunvalo ilmaraosta tai luukusta): spottivalo + VolumetricLight. Null, jos laatutaso pois tai paketti puuttuu.</summary>
        public static Light Saede(Transform isa, Vector3 paikka, Vector3 suunta, Color vari, float voima, float kantama, float kulma, int kerros)
        {
            Hae();
            // Säde luodaan aina, kun paketti on mukana (kytkin voi tuoda sen ajon aikana); laatutaso pois → valo ja efekti pois.
            if (tyyppiValo == null || Volumetriset && !VarmistaFeature()) return null;
            var go = new GameObject("Kuunsäde (volumetrinen)") { layer = kerros };
            go.transform.SetParent(isa, false);
            go.transform.position = paikka;
            go.transform.rotation = Quaternion.LookRotation(suunta.sqrMagnitude > 1e-4f ? suunta.normalized : Vector3.down);
            var l = go.AddComponent<Light>();
            l.type = LightType.Spot; l.color = vari; l.intensity = voima; l.range = kantama; l.spotAngle = kulma; l.shadows = LightShadows.None;
            var vl = go.AddComponent(tyyppiValo);
            Kentta(vl, "density", 0.12f); Kentta(vl, "brightness", 0.8f); Kentta(vl, "noiseStrength", 0.6f); Kentta(vl, "enableDustParticles", true);
            if (!Volumetriset) { l.enabled = false; if (vl is Behaviour b) b.enabled = false; }
            saeteet.Add(l);
            return l;
        }

        /// <summary>Pistevalo isän lapseksi (paikallinen paikka) ja sen ympärille volumetrinen hehku, jos paketti on mukana. aina = valo
        /// palaa laatutasosta riippumatta (kannettu lyhty tai soihtu valaisee hahmot ja paljastaa kantajan tulon); muuten valo ja hehku
        /// vain laatutason ollessa päällä. Palauttaa valon (aina-valo myös ilman pakettia), muuten null.</summary>
        public static Light Hehku(Transform isa, Vector3 paikallinen, Color vari, float voima, float kantama, bool aina, int kerros)
        {
            Hae();
            if (isa == null || !aina && tyyppiValo == null) return null;
            if (Volumetriset && tyyppiValo != null) VarmistaFeature();
            var go = new GameObject(aina ? "Kannettu valo" : "Liekin hehku (volumetrinen)") { layer = kerros };
            go.transform.SetParent(isa, false);
            go.transform.localPosition = paikallinen;
            var l = go.AddComponent<Light>();
            l.type = LightType.Point; l.color = vari; l.intensity = voima; l.range = kantama; l.shadows = LightShadows.None;
            if (tyyppiValo != null)
            {
                var vl = go.AddComponent(tyyppiValo);
                // Tiheämpi ja lyhyempi kuin kuunsäteessä: savuinen pallo liekin ympärillä, ei pölyä.
                Kentta(vl, "density", 0.2f); Kentta(vl, "brightness", 0.5f); Kentta(vl, "noiseStrength", 0.8f); Kentta(vl, "enableDustParticles", false);
                if (vl is Behaviour b) b.enabled = Volumetriset;
            }
            l.enabled = aina || Volumetriset;
            hehkut.Add((l, aina));
            return l;
        }

        static readonly HashSet<int> hehkuLiekit = new HashSet<int>();
        static readonly List<GameObject> isot = new List<GameObject>();
        /// <summary>Soihtujen ja tulisijojen volumetrinen hehku (laatutaso): lisää hehkun isoihin liekkeihin, joilla sitä ei vielä ole
        /// (tilat latautuvat vähitellen; SeikkailuVartijat kutsuu 2 s välein). Sammunut liekki (Go pois) vie hehkun mukanaan.</summary>
        public static void HehkuIsoihinLiekkeihin(DioraamaLiekit liekit, int kerros)
        {
            if (liekit == null || !Volumetriset) return;
            Hae();
            if (tyyppiValo == null) return;
            isot.Clear(); liekit.IsotLiekit(1.4f, isot);
            foreach (var g in isot)
                if (hehkuLiekit.Add(g.GetInstanceID()))
                    Hehku(g.transform, Vector3.zero, new Color(1f, 0.6f, 0.28f), 0.8f, 2.5f, false, kerros);
        }

        static void Kentta(Component c, string nimi, object arvo)
        {
            var f = c.GetType().GetField(nimi);
            if (f != null && f.FieldType.IsInstanceOfType(arvo)) f.SetValue(c, arvo);
        }

        /// <summary>VolumetricLightsRenderFeature URP:n renderereihin (kerran); false, jos ei onnistu.</summary>
        static bool VarmistaFeature()
        {
            if (tyyppiFeature == null) return false;
            if (lisatyt.Count > 0) return true;
            var urp = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            var kentta = typeof(UniversalRenderPipelineAsset).GetField("m_RendererDataList", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            if (urp == null || kentta == null || !(kentta.GetValue(urp) is ScriptableRendererData[] lista)) return false;
            foreach (var rd in lista)
            {
                if (rd == null || rd.rendererFeatures.Exists(f => f != null && f.GetType() == tyyppiFeature)) continue;
                var f = (ScriptableRendererFeature)ScriptableObject.CreateInstance(tyyppiFeature);
                f.name = "Volumetric Lights (Matkakirja)";
                rd.rendererFeatures.Add(f); rd.SetDirty();
                lisatyt.Add(f);
            }
            Debug.Log($"MATKAKIRJA seikkailu: volumetriset valot päälle ({lisatyt.Count} renderöijään)");
            return true;
        }

        static void PoistaFeature()
        {
            if (lisatyt.Count == 0) return;
            var urp = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            var kentta = typeof(UniversalRenderPipelineAsset).GetField("m_RendererDataList", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            if (urp != null && kentta != null && kentta.GetValue(urp) is ScriptableRendererData[] lista)
                foreach (var rd in lista) if (rd != null && rd.rendererFeatures.RemoveAll(f => lisatyt.Contains(f)) > 0) rd.SetDirty();
            foreach (var f in lisatyt) if (f != null) UnityEngine.Object.Destroy(f);
            lisatyt.Clear();
        }

        /// <summary>Seikkailu suljetaan: feature pois rendereristä (muut näkymät eivät maksa siitä).</summary>
        public static void Poista()
        {
            PoistaFeature();
            // Tilan liekkien hehkut pois (liekit jäävät linnanäkymään); kannetut valot lähtevät vartijoiden mukana.
            foreach (var h in hehkut) if (h.Valo != null && !h.Aina) UnityEngine.Object.Destroy(h.Valo.gameObject);
            hehkuLiekit.Clear(); hehkut.Clear();
        }
    }
}
