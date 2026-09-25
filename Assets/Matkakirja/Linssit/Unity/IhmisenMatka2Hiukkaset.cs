// IHMISEN MATKA II: HIUKKASET (erä 5, vapaat kädet; suunnitelma: kylmissä jaksoissa lumihiutaleet, luolissa pöly valossa).
// Linssit/Resources/Varjostimet/Hiukkaset.shader piirtää ne ruudun tasoon proseduraalisesti (tilaton kärkivarjostin),
// joten tämä komponentti vain valitsee lajin jaksosta, häivyttää ja kertoo pölylle soihtukeilan paikan ruudulla.
//
//   LUMI   kylmät jaksot (Jana, Beringia, White Sands, Eurooppa; sama joukko kuin IhmisenMatka2Tehosteet.Kylmat)
//   PÖLY   luolat (Denisova, Chauvet), vain keilan sisällä ja keilan ollessa ruudulla
// Vaihto häivyttää vanhan pois ennen uutta (HaivytysS). Loppu, tutkimusvaihe ja vähennetty liike: ei hiukkasia.
// Kustannus: yksi piirtokutsu, enintään LumiMaara × 6 kärkeä, pienet läpinäkyvät pisteet.
// TAUKO (löydös 148): esityksen tauolla hiukkaset jäävät ilmaan (oma kello ei etene) ja häivytys odottaa.
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatka2Hiukkaset : MonoBehaviour
    {
        public enum Laji { Ei, Lumi, Poly }

        /// <summary>Hiukkasten määrä lajeittain.</summary>
        public const int LumiMaara = 140, PolyMaara = 70;
        /// <summary>Koko pisteinä (pienin, suurin) lajeittain.</summary>
        public static readonly Vector2 LumiKokoPt = new Vector2(1.3f, 3.6f), PolyKokoPt = new Vector2(0.9f, 2.2f);
        /// <summary>Häivytys sisään ja ulos (s).</summary>
        public const float HaivytysS = 1.5f;

        static readonly HashSet<string> Luolat = new HashSet<string> { "denisova", "chauvet" };
        static readonly HashSet<string> Kylmat = new HashSet<string> { "napapiiri", "beringia", "white-sands", "eurooppa" };

        static readonly int IdTila = Shader.PropertyToID("_Tila");
        static readonly int IdKeila = Shader.PropertyToID("_Keila");
        static readonly int IdKoko = Shader.PropertyToID("_Koko");
        static readonly int IdVari = Shader.PropertyToID("_Vari");

        Material materiaali;
        Camera kamera;
        CesiumGeoreference georeferenssi;
        Laji nyt = Laji.Ei, tavoite = Laji.Ei;
        float voima, aika;   // aika: varjostimen kello (s), ei etene tauolla

        /// <summary>Testikomento "hiukkaset pois|paalle" (kehysaikojen vertailu).</summary>
        public static bool Pois;
        /// <summary>Esitys tauolla (IhmisenMatka2Tehosteet asettaa): hiukkaset seisovat ilmassa.</summary>
        public bool Tauolla;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => Pois = false;

        public static IhmisenMatka2Hiukkaset Luo(Transform isanta, PalloKierto kierto)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Hiukkaset");
            var kam = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            if (varjostin == null || kam == null) return null;
            var h = new GameObject("Hiukkaset").AddComponent<IhmisenMatka2Hiukkaset>();
            h.transform.SetParent(isanta, false);
            h.materiaali = new Material(varjostin) { name = "Hiukkaset", hideFlags = HideFlags.DontSave };
            h.kamera = kam;
            h.georeferenssi = kierto != null ? kierto.georeferenssi : null;
            return h;
        }

        /// <summary>Jakso alkaa: laji jakson seudusta.</summary>
        public void Jakso(KertomusJakso j)
        {
            tavoite = j == null ? Laji.Ei : Luolat.Contains(j.Id) ? Laji.Poly : Kylmat.Contains(j.Id) ? Laji.Lumi : Laji.Ei;
            if (j != null) LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: hiukkaset {j.Id} → {tavoite}");
        }

        /// <summary>Esitys loppuu tai tutkimusvaihe alkaa: hiukkaset häipyvät.</summary>
        public void Loppu() => tavoite = Laji.Ei;

        /// <summary>Tila lokiin (komento "hiukkaset tila").</summary>
        public string Kuvaus() => $"hiukkaset {nyt} → {tavoite}, voima {voima:0.00}{(Pois ? ", POIS" : "")}";

        void LateUpdate()
        {
            bool vahennetty = LinssiOhjain.Instanssi != null && LinssiOhjain.Instanssi.VahennettyLiike;
            var haluttu = Pois || vahennetty ? Laji.Ei : tavoite;
            float dt = Tauolla ? 0f : Time.unscaledDeltaTime;
            aika += dt;
            // Vanha laji häipyy ennen uutta; sama laji jatkuu katkeamatta.
            float kohde = haluttu == nyt && nyt != Laji.Ei ? 1f : 0f;
            voima = Mathf.MoveTowards(voima, kohde, dt / HaivytysS);
            if (voima <= 0f && haluttu != nyt) nyt = haluttu;
            if (nyt == Laji.Ei || voima <= 0.001f || materiaali == null || kamera == null) return;

            float w = Mathf.Max(1, kamera.pixelWidth), h = Mathf.Max(1, kamera.pixelHeight);
            float pt = Mathf.Max(1f, LinssiOhjain.Pistekerroin);
            var koko = nyt == Laji.Lumi ? LumiKokoPt : PolyKokoPt;
            var keila = Vector4.zero;
            if (nyt == Laji.Poly)
            {
                keila = KeilaRuudulla(w, h);
                if (keila.w <= 0f) return;   // keila ei ruudulla (pallon takana tai sammunut)
            }
            materiaali.SetVector(IdTila, new Vector4(nyt == Laji.Lumi ? 0f : 1f, voima, aika, w / h));
            materiaali.SetVector(IdKeila, keila);
            materiaali.SetVector(IdKoko, new Vector4(koko.x * pt, koko.y * pt, w, h));
            materiaali.SetVector(IdVari, nyt == Laji.Lumi
                ? new Vector4(0.92f, 0.95f, 1f, 0.75f)
                : new Vector4(1f, 0.78f, 0.5f, 0.85f));
            var rp = new RenderParams(materiaali)
            {
                worldBounds = new Bounds(kamera.transform.position + kamera.transform.forward, Vector3.one * 1e6f),
                camera = kamera,
                layer = gameObject.layer,
                shadowCastingMode = ShadowCastingMode.Off,
                receiveShadows = false,
            };
            Graphics.RenderPrimitives(rp, MeshTopology.Triangles, (nyt == Laji.Lumi ? LumiMaara : PolyMaara) * 6, 1);
        }

        /// <summary>Pääkeilan keskipiste (0–1, origo vasen ala) ja säde ruudun korkeuksina; w = 0, jos ei ruudulla.</summary>
        Vector4 KeilaRuudulla(float w, float h)
        {
            if (georeferenssi == null || KarttaKerrokset.PaaKeila is not { } k) return Vector4.zero;
            Vector3 Ruutuun(double lat, double lon, out bool edessa)
            {
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0));
                var u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                var p = kamera.WorldToScreenPoint(new Vector3((float)u.x, (float)u.y, (float)u.z));
                edessa = p.z > 0f;
                return p;
            }
            var keski = Ruutuun(k.lat, k.lon, out bool e1);
            var reuna = Ruutuun(System.Math.Min(89.0, k.lat + k.sadeKm / 111.2), k.lon, out bool e2);
            // Pallon takapuoli: keskipisteen ja kameran välissä on maa (pisteen normaali poispäin kamerasta).
            var ecefK = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(k.lon, k.lat, 0));
            var uK = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecefK);
            var keskusMaa = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(new double3(0, 0, 0));
            var normaali = new Vector3((float)(uK.x - keskusMaa.x), (float)(uK.y - keskusMaa.y), (float)(uK.z - keskusMaa.z)).normalized;
            var katse = (kamera.transform.position - new Vector3((float)uK.x, (float)uK.y, (float)uK.z)).normalized;
            if (!e1 || !e2 || Vector3.Dot(normaali, katse) <= 0.05f) return Vector4.zero;
            float sade = Mathf.Clamp(Vector2.Distance(keski, reuna) / h, 0.03f, 0.35f);
            return new Vector4(keski.x / w, keski.y / h, sade, 1f);
        }

        void OnDestroy()
        {
            if (materiaali != null) Destroy(materiaali);
        }
    }
}
