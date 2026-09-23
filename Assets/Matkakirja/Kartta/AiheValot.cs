using System;
using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Karttavalot pallolle (webin js/karttavalot.js ja karttaselite): sisältöpaketin
    /// kokoelmat/karttavalot.json (Siirtoseppä, nippu 4) aiheittain. Yksi aihe kerrallaan
    /// palaa ("kaikki" = kaikki, "ei" = pois). Valot ovat aiheen värisiä täpliä
    /// (Shaders/Valopiste), yksi verkko aihetta kohden, joten vaihto on vain renderöijän
    /// kytkin. Laskurit kertovat, montako kunkin aiheen valoa on nykyisessä näkymässä.
    ///
    /// Natiivi-UI:n karttaselite käyttää tätä IKarttaValot-sillan kautta
    /// (Scripts/Kartta/KarttaValotSilta.cs, Assembly-CSharp).
    /// </summary>
    public class AiheValot : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public Material materiaali;
        [Tooltip("Valon säde iOS-pisteinä (web 12 px perustasolla).")]
        public float sade = 12f;
        [Tooltip("Valon korkeus ellipsoidin yläpuolella, metreinä (kuten merkit).")]
        public double korkeus = 5000.0;

        /// <summary>Webin KARTTAVALO_AIHEET-järjestys ja kärkisymbolin väri (css --sym-*).</summary>
        public static readonly (string Aihe, Color32 Vari)[] Aiheet =
        {
            ("kaupungit", new Color32(0x8a, 0x6d, 0x4a, 255)),
            ("luonto", new Color32(0x4f, 0x7d, 0x6f, 255)),
            ("elaimet", new Color32(0xb9, 0x8d, 0x54, 255)),
            ("historia", new Color32(0xa0, 0x5c, 0x3f, 255)),
            ("ihmeet", new Color32(0xb8, 0x86, 0x2b, 255)),
            ("hetket", new Color32(0x6e, 0x4a, 0x63, 255)),
            ("kulttuuri", new Color32(0x7b, 0x5a, 0x8c, 255)),
            ("kauppa", new Color32(0x7d, 0x78, 0x40, 255)),
            ("skandaalit", new Color32(0xdd, 0xa4, 0x2c, 255)),
        };

        public string Valittu { get; private set; } = "ei";
        public IReadOnlyDictionary<string, int> Laskurit => laskurit;
        /// <summary>Valinta tai laskurit muuttuivat (enintään 4 kertaa sekunnissa).</summary>
        public event Action Muuttui;
        public bool Valmis { get; private set; }

        struct Valo { public string Id, Aihe; public Vector3 Paikka; public Vector3 Normaali; }

        /// <summary>Näkyvän valon napautus: karttavalot.json:n id (esim. "kohde:thessaloniki").</summary>
        public event Action<string> Napautettu;
        [Tooltip("Napautuksen osuma-alueen säde iOS-pisteinä (44 pt halkaisija).")]
        public float osumaSade = 22f;
        public KaupunkiMerkit merkit;

        readonly Dictionary<string, int> laskurit = new Dictionary<string, int>();
        readonly Dictionary<string, MeshRenderer> verkot = new Dictionary<string, MeshRenderer>();
        readonly List<Valo> valot = new List<Valo>();
        bool nakymaMuuttui = true;
        float seuraavaLasku;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto != null) kierto.NakymaMuuttui += () => nakymaMuuttui = true;
            if (kierto != null) kierto.Napautettu += Napautus;
            if (merkit == null) merkit = FindAnyObjectByType<KaupunkiMerkit>();
            StartCoroutine(Lataa());
        }

        public void Valitse(string aihe)
        {
            if (string.IsNullOrEmpty(aihe)) aihe = "ei";
            Valittu = aihe;
            foreach (var p in verkot) p.Value.enabled = aihe == "kaikki" || aihe == p.Key;
            nakymaMuuttui = true;
            seuraavaLasku = 0;
            Muuttui?.Invoke();
        }

        IEnumerator Lataa()
        {
            string teksti = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => teksti = t, true);
            if (teksti == null) { Debug.LogWarning("MATKAKIRJA valot: karttavalot.json puuttuu (paketti ennen nippua 4?)"); yield break; }
            var juuri = Peli.MiniJson.Jasenna(teksti) as Dictionary<string, object>;
            if (juuri == null || !(juuri.TryGetValue("alkiot", out var a) && a is List<object> alkiot))
            {
                Debug.LogWarning("MATKAKIRJA valot: karttavalot.json ei ole kokoelma");
                yield break;
            }
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            foreach (var o in alkiot)
            {
                if (!(o is Dictionary<string, object> d)) continue;
                if (!(d.TryGetValue("aihe", out var ai) && ai is string aihe)) continue;
                if (!d.TryGetValue("lat", out var la) || !d.TryGetValue("lon", out var lo)) continue;
                // Vienti koodaa -0:n olioksi { "$luku": "-0" }, joten muu kuin luku = 0.
                double lat = la is double dla ? dla : 0, lon = lo is double dlo ? dlo : 0;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                string id = d.TryGetValue("id", out var iv) && iv is string ids ? ids : null;
                valot.Add(new Valo { Id = id, Aihe = aihe, Paikka = (float3)u, Normaali = (float3)math.normalize(u - keskus) });
            }
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            foreach (var (aihe, vari) in Aiheet)
            {
                var omat = valot.FindAll(v => v.Aihe == aihe);
                if (omat.Count == 0) continue;
                var go = new GameObject("Valot " + aihe);
                go.transform.SetParent(georeferenssi.transform, false);
                go.AddComponent<MeshFilter>().sharedMesh = Verkko(omat, vari);
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = new Material(materiaali);
                r.sharedMaterial.SetFloat("_Koko", sade * kerroin);
                r.sharedMaterial.SetVector("_Keskus", (Vector3)(float3)keskus);
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                r.enabled = Valittu == "kaikki" || Valittu == aihe;
                verkot[aihe] = r;
            }
            Valmis = true;
            Debug.Log($"MATKAKIRJA valot: {valot.Count} valoa, {verkot.Count} aihetta");
            nakymaMuuttui = true;
        }

        static Mesh Verkko(List<Valo> omat, Color32 vari)
        {
            int n = omat.Count;
            var paikat = new Vector3[n * 4];
            var kulmat = new Vector2[n * 4];
            var varit = new Color32[n * 4];
            var kolmiot = new int[n * 6];
            var k = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) };
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    paikat[i * 4 + j] = omat[i].Paikka;
                    kulmat[i * 4 + j] = k[j];
                    varit[i * 4 + j] = vari;
                }
                int v = i * 4, t = i * 6;
                kolmiot[t] = v; kolmiot[t + 1] = v + 2; kolmiot[t + 2] = v + 1;
                kolmiot[t + 3] = v; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
            }
            var m = new Mesh { name = "Karttavalot", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            m.vertices = paikat;
            m.uv = kulmat;
            m.colors32 = varit;
            m.triangles = kolmiot;
            // Kärjet laajenevat ruudulla: rajat koko maapallon kokoisiksi, ettei verkkoa karsita.
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 2.6e7f);
            return m;
        }

        /// <summary>Valon paikka näytöllä pikseleinä (testikomento "valot osoita id"); false, jos ei näy.</summary>
        public bool RuutuPaikka(string id, out Vector2 ruutu)
        {
            ruutu = default;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            foreach (var v in valot)
            {
                if (v.Id != id || kamera == null) continue;
                Vector3 r = kamera.WorldToScreenPoint(georeferenssi.transform.TransformPoint(v.Paikka));
                if (r.z <= 0) return false;
                ruutu = r;
                return true;
            }
            return false;
        }

        void Napautus(Vector2 ruutu)
        {
            if (!Valmis || Valittu == "ei" || Napautettu == null) return;
            if (merkit != null && merkit.merkitNakyvat && merkit.OsuuKaupunkiin(ruutu)) return;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            if (kamera == null) return;
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float paras = osumaSade * kerroin;
            string osuma = null;
            var gt = georeferenssi.transform;
            Vector3 kameraPaikka = kamera.transform.position;
            foreach (var v in valot)
            {
                if (v.Id == null || (Valittu != "kaikki" && v.Aihe != Valittu)) continue;
                Vector3 p = gt.TransformPoint(v.Paikka);
                if (Vector3.Dot(gt.TransformDirection(v.Normaali), (kameraPaikka - p).normalized) < 0.05f) continue;
                Vector3 r = kamera.WorldToScreenPoint(p);
                if (r.z <= 0) continue;
                float d = Vector2.Distance(ruutu, r);
                if (d < paras) { paras = d; osuma = v.Id; }
            }
            if (osuma == null) return;
            Debug.Log("MATKAKIRJA valot: napautus " + osuma);
            Napautettu?.Invoke(osuma);
        }

        void Update()
        {
            if (!Valmis || !nakymaMuuttui || Time.unscaledTime < seuraavaLasku) return;
            nakymaMuuttui = false;
            seuraavaLasku = Time.unscaledTime + 0.25f;
            Laske();
        }

        void Laske()
        {
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            if (kamera == null) return;
            var gt = georeferenssi.transform;
            Vector3 kameraPaikka = kamera.transform.position;
            var uudet = new Dictionary<string, int>();
            foreach (var v in valot)
            {
                Vector3 p = gt.TransformPoint(v.Paikka);
                if (Vector3.Dot(gt.TransformDirection(v.Normaali), (kameraPaikka - p).normalized) < 0.05f) continue;
                Vector3 vp = kamera.WorldToViewportPoint(p);
                if (vp.z <= 0 || vp.x < 0 || vp.x > 1 || vp.y < 0 || vp.y > 1) continue;
                uudet[v.Aihe] = uudet.TryGetValue(v.Aihe, out var c) ? c + 1 : 1;
            }
            int kaikki = 0;
            foreach (var c in uudet.Values) kaikki += c;
            uudet["kaikki"] = kaikki;
            bool muuttui = uudet.Count != laskurit.Count;
            if (!muuttui)
                foreach (var p in uudet)
                    if (!laskurit.TryGetValue(p.Key, out var c) || c != p.Value) { muuttui = true; break; }
            if (!muuttui) return;
            laskurit.Clear();
            foreach (var p in uudet) laskurit[p.Key] = p.Value;
            Muuttui?.Invoke();
        }
    }
}
