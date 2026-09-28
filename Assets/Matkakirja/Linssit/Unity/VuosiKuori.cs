// MAAPALLON VUOSI -LINSSIN KUUKAUSIKUORI (web js/linssit/maapallon-vuosi.js: pohja, häivytys ja kerros yhdeksi
// tekstuuriksi pallon materiaalille). Natiivissa pelin Cesium-pallo jää alle, ja sen päälle piirretään
// läpinäkymätön tasakulmainen kuori 25 km:n korkeudelle (maaston korostus 2 nostaa Everestin 17,7 km:iin), joten
// maasto ei puhkaise kuorta eikä pallon laattoja tarvitse vaihtaa. Varjostin (Varjostimet/MaapallonVuosi)
// yhdistää pohjan A, pohjan B painolla t ja kaksi kerroskuvaa omilla alfoillaan: sama piirtojärjestys kuin
// webin canvasilla, mutta näytönohjaimella ilman 4096 × 2048 -canvasin uudelleenlatausta joka kehys.
//
// Kuvat: UnityWebRequest + DownloadHandlerTexture (purku taustasäikeessä, mipit), välimuisti osoitteen mukaan.
// 4096 × 2048 RGBA mipeineen on 43 Mt, joten muistissa pidetään enintään MaxKuvia (iso muisti 6, muuten 4:
// pohja A ja B, kaksi kerroskuvaa ja seuraavan kuukauden esilataus); vanhin käyttämätön vapautetaan. Kuori ja
// kuvat tuhotaan linssin sulkeutuessa.
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Vuosi;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class VuosiKuori : MonoBehaviour, IVuosiKuori
    {
        /// <summary>Kuoren korkeus merenpinnasta (m).</summary>
        public const double Korkeus = 25_000;
        const int Sarakkeet = 192, Rivit = 96;
        const int IsoMuistiMt = 5500;
        const int RinnakkaisetLataukset = 2;

        /// <summary>Paikallinen peili (kehitys: simulaattori lukee Karttasepän vientikansiota file://-osoitteella).</summary>
        public static Func<string, string> Peili = o => o;

        sealed class Kuva
        {
            public Texture2D Tekstuuri;
            public UnityWebRequest Pyynto;
            public bool Luovutti;
            public float Kaytetty;
            public float Alku;
        }

        readonly Dictionary<string, Kuva> kuvat = new Dictionary<string, Kuva>();
        readonly Queue<string> jono = new Queue<string>();
        /// <summary>Esilataukset lähtevät vasta, kun näkyvien kuvien jono on tyhjä (laite vuosi1 28.9.: rinnakkainen
        /// esilataus hidasti tammikuun ensimmäistä latausta 1 s:sta 14 s:iin).</summary>
        readonly Queue<string> esijono = new Queue<string>();
        readonly HashSet<string> kaytossa = new HashSet<string>();
        Material materiaali;
        MeshRenderer piirtaja;
        GameObject ilmakeha;
        Material ilmakehaMat;
        Camera kamera;
        Color? alkuperainenTausta;

        /// <summary>Web (Globe.gl) backgroundColor #05070d ja atmosphereColor #8fb4ff, atmosphereAltitude 0,16.</summary>
        public static readonly Color Tausta = new Color32(5, 7, 13, 255), IlmakehanVari = new Color32(143, 180, 255, 255);
        public const float IlmakehanKorkeus = 0.16f;
        int maxKuvia;
        (string, string, float, string, float, string, float) edellinen;

        static readonly int IdA = Shader.PropertyToID("_PohjaA"), IdB = Shader.PropertyToID("_PohjaB"), IdT = Shader.PropertyToID("_T"),
            IdK1 = Shader.PropertyToID("_Kerros1"), IdA1 = Shader.PropertyToID("_Alfa1"),
            IdK2 = Shader.PropertyToID("_Kerros2"), IdA2 = Shader.PropertyToID("_Alfa2"), IdKeskus = Shader.PropertyToID("_Keskus");

        public static VuosiKuori Luo(CesiumGeoreference georeferenssi)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/MaapallonVuosi");
            if (varjostin == null || georeferenssi == null)
            {
                Debug.LogWarning("MATKAKIRJA vuosi: varjostin tai georeferenssi puuttuu");
                return null;
            }
            var go = new GameObject("VuosiKuori");
            go.transform.SetParent(georeferenssi.transform, false);
            var k = go.AddComponent<VuosiKuori>();
            k.Rakenna(georeferenssi, varjostin);
            k.LuoIlmakeha(georeferenssi);
            return k;
        }

        void Rakenna(CesiumGeoreference g, Shader varjostin)
        {
            maxKuvia = SystemInfo.systemMemorySize >= IsoMuistiMt ? 6 : 4;
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            transform.localPosition = (Vector3)(float3)keskus;
            var paikat = new Vector3[(Sarakkeet + 1) * (Rivit + 1)];
            var uv = new Vector2[paikat.Length];
            for (int r = 0; r <= Rivit; r++)
                for (int s = 0; s <= Sarakkeet; s++)
                {
                    double lat = 90 - 180.0 * r / Rivit, lon = -180 + 360.0 * s / Sarakkeet;
                    var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, Korkeus));
                    int i = r * (Sarakkeet + 1) + s;
                    paikat[i] = (Vector3)(float3)(g.TransformEarthCenteredEarthFixedPositionToUnity(ecef) - keskus);
                    uv[i] = new Vector2(s / (float)Sarakkeet, 1 - r / (float)Rivit);
                }
            var kolmiot = new int[Sarakkeet * Rivit * 6];
            int t = 0;
            for (int r = 0; r < Rivit; r++)
                for (int s = 0; s < Sarakkeet; s++)
                {
                    int a = r * (Sarakkeet + 1) + s, b = a + 1, c = a + Sarakkeet + 1, d = c + 1;
                    kolmiot[t++] = a; kolmiot[t++] = b; kolmiot[t++] = c;
                    kolmiot[t++] = b; kolmiot[t++] = d; kolmiot[t++] = c;
                }
            var mesh = new Mesh { name = "VuosiKuori", indexFormat = IndexFormat.UInt32, vertices = paikat, uv = uv, triangles = kolmiot };
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            gameObject.AddComponent<MeshFilter>().sharedMesh = mesh;
            piirtaja = gameObject.AddComponent<MeshRenderer>();
            materiaali = new Material(varjostin);
            piirtaja.sharedMaterial = materiaali;
            piirtaja.shadowCastingMode = ShadowCastingMode.Off;
            piirtaja.receiveShadows = false;
            piirtaja.enabled = false;
        }

        // ── IVuosiKuori ────────────────────────────────────────────────────

        public void Nayta(bool nakyvissa)
        {
            if (piirtaja != null) piirtaja.enabled = nakyvissa;
            if (ilmakeha != null) ilmakeha.SetActive(nakyvissa);
            AsetaTausta(nakyvissa);
            PallonLepo.Muuttui("vuosikuori");
        }

        public bool Valmis(string osoite)
        {
            if (osoite == null) return false;
            var k = Pyyda(osoite);
            k.Kaytetty = Time.unscaledTime;
            return k.Tekstuuri != null;
        }

        public bool Epaonnistui(string osoite) => osoite != null && kuvat.TryGetValue(osoite, out var k) && k.Luovutti;

        public void Esilataa(string osoite)
        {
            if (osoite == null || kuvat.ContainsKey(osoite)) return;
            // Esilataus ei saa vapauttaa näkyvää kuvaa: tilaa tehdään vain vanhimmasta käyttämättömästä (laite vuosi2 28.9.:
            // kerroksen kanssa muisti oli täynnä, esilataus jäi pois ja toisto odotti verkkoa joka kuukausi, ~4 s/kk).
            if (kuvat.Count >= maxKuvia && !VapautaYksi()) return;
            Pyyda(osoite, esilataus: true);
        }

        public void Aseta(string pohjaA, string pohjaB, float t, string kerros1, float alfa1, string kerros2, float alfa2)
        {
            kaytossa.Clear();
            foreach (var o in new[] { pohjaA, pohjaB, kerros1, kerros2 }) if (o != null) kaytossa.Add(o);
            var a = Tekstuuri(pohjaA);
            var b = Tekstuuri(pohjaB);
            var k1 = Tekstuuri(kerros1);
            var k2 = Tekstuuri(kerros2);
            // Pohja B ilman kuvaa = A (t ei näy); kerros ilman kuvaa = alfa 0.
            materiaali.SetTexture(IdA, a != null ? a : Texture2D.blackTexture);
            materiaali.SetTexture(IdB, b != null ? b : a != null ? a : Texture2D.blackTexture);
            materiaali.SetFloat(IdT, b != null ? Mathf.Clamp01(t) : 0f);
            materiaali.SetTexture(IdK1, k1 != null ? k1 : Texture2D.blackTexture);
            materiaali.SetFloat(IdA1, k1 != null ? Mathf.Clamp01(alfa1) : 0f);
            materiaali.SetTexture(IdK2, k2 != null ? k2 : Texture2D.blackTexture);
            materiaali.SetFloat(IdA2, k2 != null ? Mathf.Clamp01(alfa2) : 0f);
            materiaali.SetVector(IdKeskus, transform.position);
            var nyt = (pohjaA, pohjaB, t, kerros1, alfa1, kerros2, alfa2);
            if (!nyt.Equals(edellinen)) PallonLepo.Muuttui("vuosikuori");
            edellinen = nyt;
        }

        // ── Lataus ─────────────────────────────────────────────────────────

        Texture2D Tekstuuri(string osoite) => osoite != null && kuvat.TryGetValue(osoite, out var k) ? k.Tekstuuri : null;

        Kuva Pyyda(string osoite, bool esilataus = false)
        {
            if (kuvat.TryGetValue(osoite, out var k))
            {
                // Esiladattavaksi jonotettu kuva tarvitaan nyt: näkyvien jonoon (kaksoiskappale ohitetaan latauksessa).
                if (!esilataus && k.Tekstuuri == null && k.Pyynto == null && !k.Luovutti) jono.Enqueue(osoite);
                return k;
            }
            k = new Kuva { Kaytetty = Time.unscaledTime };
            kuvat[osoite] = k;
            (esilataus ? esijono : jono).Enqueue(osoite);
            Vapauta();
            return k;
        }

        /// <summary>
        /// Avaruuden tausta suoraan pallon kameraan (KarttaKerrokset.Taustavari lukee Camera.mainin, joka on null elävän
        /// kerroksen tilassa: laite vuosi2 28.9. näytti pelin ruskean taustan). Pidetään voimassa joka kehys.
        /// </summary>
        void AsetaTausta(bool paalla)
        {
            if (kamera == null) { var k = FindAnyObjectByType<PalloKierto>(); kamera = k != null ? k.GetComponent<Camera>() : Camera.main; }
            if (kamera == null) return;
            if (paalla)
            {
                if (!alkuperainenTausta.HasValue) alkuperainenTausta = kamera.backgroundColor;
                kamera.backgroundColor = Tausta;
            }
            else if (alkuperainenTausta.HasValue)
            {
                kamera.backgroundColor = alkuperainenTausta.Value;
                alkuperainenTausta = null;
            }
        }

        /// <summary>Ilmakehän hehku kuten webin Globe.gl (three-glow-mesh, Ilmakeha-varjostin): kuori R × 1,16.</summary>
        void LuoIlmakeha(CesiumGeoreference g)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Ilmakeha");
            if (varjostin == null) return;
            const int Sektorit = 96, Kehat = 48;
            double sade = CesiumWgs84Ellipsoid.GetMaximumRadius();
            ilmakeha = new GameObject("VuosiIlmakeha");
            ilmakeha.transform.SetParent(g.transform, false);
            ilmakeha.transform.localPosition = (Vector3)(float3)g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var paikat = new Vector3[(Kehat + 1) * (Sektorit + 1)];
            float rk = (float)(sade * (1 + IlmakehanKorkeus));
            int i = 0;
            for (int kk = 0; kk <= Kehat; kk++)
            {
                float lat = Mathf.PI * (0.5f - kk / (float)Kehat);
                for (int s = 0; s <= Sektorit; s++, i++)
                {
                    float lon = 2 * Mathf.PI * s / Sektorit;
                    paikat[i] = new Vector3(Mathf.Cos(lat) * Mathf.Cos(lon), Mathf.Sin(lat), Mathf.Cos(lat) * Mathf.Sin(lon)) * rk;
                }
            }
            var kolmiot = new int[Kehat * Sektorit * 6];
            int t = 0;
            for (int kk = 0; kk < Kehat; kk++)
                for (int s = 0; s < Sektorit; s++)
                {
                    int a0 = kk * (Sektorit + 1) + s, b = a0 + 1, c = a0 + Sektorit + 1, d = c + 1;
                    kolmiot[t++] = a0; kolmiot[t++] = b; kolmiot[t++] = c;
                    kolmiot[t++] = b; kolmiot[t++] = d; kolmiot[t++] = c;
                }
            var mesh = new Mesh { name = "VuosiIlmakeha", indexFormat = IndexFormat.UInt32, vertices = paikat, triangles = kolmiot };
            mesh.RecalculateBounds();
            ilmakeha.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = ilmakeha.AddComponent<MeshRenderer>();
            ilmakehaMat = new Material(varjostin);
            ilmakehaMat.SetColor("_Vari", IlmakehanVari);
            ilmakehaMat.SetFloat("_Ontto", (float)sade);
            ilmakehaMat.SetFloat("_Peitto", 1f);
            r.sharedMaterial = ilmakehaMat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            ilmakeha.SetActive(false);
        }

        void Update()
        {
            if (piirtaja != null && piirtaja.enabled && kamera != null && kamera.backgroundColor != Tausta) AsetaTausta(true);
            int kaynnissa = 0;
            foreach (var p in kuvat)
            {
                var k = p.Value;
                if (k.Pyynto == null) continue;
                if (!k.Pyynto.isDone) { kaynnissa++; continue; }
                if (k.Pyynto.result == UnityWebRequest.Result.Success)
                {
                    k.Tekstuuri = DownloadHandlerTexture.GetContent(k.Pyynto);
                    k.Tekstuuri.name = "Vuosi " + p.Key.Substring(p.Key.LastIndexOf('/') + 1);
                    k.Tekstuuri.wrapModeU = TextureWrapMode.Repeat;
                    k.Tekstuuri.wrapModeV = TextureWrapMode.Clamp;
                    k.Tekstuuri.filterMode = FilterMode.Trilinear;
                    k.Tekstuuri.anisoLevel = 4;
                    Debug.Log($"MATKAKIRJA vuosi: {k.Tekstuuri.name} {k.Tekstuuri.width}×{k.Tekstuuri.height}, {k.Tekstuuri.mipmapCount} mipiä, {(Time.unscaledTime - k.Alku) * 1000:F0} ms");
                    PallonLepo.Valmistui("vuosikuori");
                }
                else
                {
                    k.Luovutti = true;
                    Debug.LogWarning($"MATKAKIRJA vuosi: {p.Key} ei latautunut: {k.Pyynto.error}");
                }
                k.Pyynto.Dispose();
                k.Pyynto = null;
            }
            while (kaynnissa < RinnakkaisetLataukset && (jono.Count > 0 || (kaynnissa == 0 && esijono.Count > 0)))
            {
                string osoite = jono.Count > 0 ? jono.Dequeue() : esijono.Dequeue();
                if (!kuvat.TryGetValue(osoite, out var k) || k.Tekstuuri != null || k.Pyynto != null) continue;
                var parametrit = DownloadedTextureParams.Default;
                parametrit.readable = false;
                parametrit.mipmapChain = true;
                k.Pyynto = new UnityWebRequest(Peili(osoite), UnityWebRequest.kHttpVerbGET, new DownloadHandlerTexture(parametrit), null) { timeout = 60 };
                k.Alku = Time.unscaledTime;
                k.Pyynto.SendWebRequest();
                kaynnissa++;
            }
        }

        /// <summary>Muistikatto: vanhin käyttämätön kuva pois, kunnes kuvia on enintään MaxKuvia.</summary>
        void Vapauta()
        {
            while (kuvat.Count > maxKuvia && VapautaYksi()) { }
        }

        /// <summary>Vanhin kuva, joka ei ole näkyvissä eikä latautumassa, pois; false, jos sellaista ei ole.</summary>
        bool VapautaYksi()
        {
            string vanhin = null;
            float aika = float.MaxValue;
            foreach (var p in kuvat)
                if (!kaytossa.Contains(p.Key) && p.Value.Pyynto == null && p.Value.Kaytetty < aika) { aika = p.Value.Kaytetty; vanhin = p.Key; }
            if (vanhin == null) return false;
            Poista(vanhin);
            return true;
        }

        void Poista(string osoite)
        {
            if (!kuvat.TryGetValue(osoite, out var k)) return;
            k.Pyynto?.Abort();
            k.Pyynto?.Dispose();
            if (k.Tekstuuri != null) Destroy(k.Tekstuuri);
            kuvat.Remove(osoite);
        }

        /// <summary>Lokiin: kuvat muistissa ja latauksessa.</summary>
        public string Kuvaus()
        {
            int valmiit = 0, lataa = 0, luovutti = 0;
            foreach (var k in kuvat.Values)
                if (k.Tekstuuri != null) valmiit++; else if (k.Luovutti) luovutti++; else lataa++;
            return $"kuori {(piirtaja != null && piirtaja.enabled ? "näkyy" : "piilossa")}, kuvia {valmiit} valmiina, {lataa} tulossa, {luovutti} luovutti (katto {maxKuvia})";
        }

        void OnDestroy()
        {
            foreach (var o in new List<string>(kuvat.Keys)) Poista(o);
            if (kamera != null && alkuperainenTausta.HasValue) kamera.backgroundColor = alkuperainenTausta.Value;
            if (ilmakeha != null) Destroy(ilmakeha);
            if (ilmakehaMat != null) Destroy(ilmakehaMat);
            if (ilmakeha != null && ilmakeha.TryGetComponent<MeshFilter>(out var im)) Destroy(im.sharedMesh);
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            Destroy(materiaali);
        }
    }
}
