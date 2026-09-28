// CUPOLA-KERROS (omistajan palaute 28.9.2026 ISS-kyydistä, Fable: tummempi sisäpinta ja valonlähde, lasi aidommaksi,
// asemasta osa ikkunan taakse): Cupola-varjostin koko ruudun neliönä kameran edessä. UI Toolkit ei valaise kuvaa, joten
// kehys piirretään 3D-kerroksena (Overlay-jono, ZTest Always) ja käyttöliittymä (tietorivi, ✕) jää sen päälle.
//
//   paikka      kameran lapsi, etäisyys 1,5 × lähitaso ja koko kenttäkulman mukaan juuri ennen piirtoa
//               (RenderPipelineManager.beginCameraRendering: PalloKierto asettaa kameran ja lähitason samassa kehyksessä)
//   kuvat       Codexin kehys ja heijastus ämpäristä (karttanostot/20260926/iss-cupola-*), mipmapit (kehyksen läheisyys ja
//               kohokuvio lasketaan mip-tasoista), välimuisti persistentDataPath/kuvat; ilman verkkoa ei kehystä
//   valo        aurinko kameran koordinaateissa (Aurinko.AurinkoEcef), ISS:n varjo ja maavalo (CupolanValo)
//   häivytys    0,3 s; pieni liike pois: heti
using System;
using System.Collections;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit.Iss;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class CupolaKerros : MonoBehaviour
    {
        const string Juuri = "https://media.matkakirja.app/karttanostot/20260926/";
        const float HaivytysS = 0.3f;
        static readonly int IdKehys = Shader.PropertyToID("_Kehys"), IdHeijastus = Shader.PropertyToID("_Heijastus"),
            IdPeitto = Shader.PropertyToID("_Peitto"), IdRuutu = Shader.PropertyToID("_Ruutu"), IdKuva = Shader.PropertyToID("_Kuva"),
            IdAurinko = Shader.PropertyToID("_AurinkoRuutu"), IdMaavalo = Shader.PropertyToID("_Maavalo"), IdAika = Shader.PropertyToID("_Aika"),
            IdVarsi = Shader.PropertyToID("_Varsi");

        /// <summary>Cupolan tyyli: Kuva = Codexin tumma Cupola 28.9. UI-kerroksina (IssKyytiNakyma; jos kuvat eivät
        /// lataudu, tämä 3D-kehys varalla), Kolmiulotteinen = tämä valaistu 3D-kehys, Vanha = 1.0.35:n UI-kehys.</summary>
        public enum Tyylit { Kuva, Kolmiulotteinen, Vanha }
        /// <summary>A/B (`astro kyyti cupola uusi|3d|vanha`); omistajan päätös 28.9. klo 11.0x: Codexin uusi kuva.</summary>
        public static Tyylit Tyyli = Tyylit.Kuva;
        /// <summary>1.0.35:n UI-kehys (kuvaparin "ennen").</summary>
        public static bool Vanha => Tyyli == Tyylit.Vanha;
        /// <summary>A/B (`astro kyyti varsi 0|1`): Canadarm2 ja paneeli ikkunan takana.</summary>
        public static bool Varsi = true;

        Camera kamera;
        CesiumGeoreference g;
        Material materiaali;
        MeshRenderer piirto;
        Texture2D kehys, heijastus;
        float peitto, tavoite, aurinkoAika = -10f;
        DateTime aurinkoUtc;
        Vector4 aurinko = new Vector4(0.3f, 0.5f, 0.4f, 1f);
        float maavalo = 0.8f;
        bool haettu;

        /// <summary>ISS:n ylös-suunta maailmassa ja korkeus (AstronauttiKerros päivittää).</summary>
        public Vector3 IssYlos = Vector3.up;
        public double IssKorkeusKm = 420;

        public bool Nakyy => peitto > 0.001f;

        public static CupolaKerros Luo(Camera kamera, CesiumGeoreference g)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Cupola");
            if (varjostin == null || kamera == null) { Debug.LogWarning("MATKAKIRJA ISS-kyyti: Cupola-varjostin puuttuu"); return null; }
            var go = new GameObject("Cupola");
            go.transform.SetParent(kamera.transform, false);
            var c = go.AddComponent<CupolaKerros>();
            c.kamera = kamera;
            c.g = g;
            c.materiaali = new Material(varjostin) { name = "Cupola" };
            c.materiaali.SetFloat(IdPeitto, 0);
            go.AddComponent<MeshFilter>().sharedMesh = Nelio();
            c.piirto = go.AddComponent<MeshRenderer>();
            c.piirto.sharedMaterial = c.materiaali;
            c.piirto.shadowCastingMode = ShadowCastingMode.Off;
            c.piirto.receiveShadows = false;
            c.piirto.enabled = false;
            RenderPipelineManager.beginCameraRendering += c.EnnenPiirtoa;
            return c;
        }

        /// <summary>Ikkuna näkyviin tai pois (häivytys); kuvat haetaan ensimmäisellä kerralla.</summary>
        public void Nayta(bool nakyvissa)
        {
            tavoite = nakyvissa ? 1f : 0f;
            if (nakyvissa && !haettu) { haettu = true; StartCoroutine(HaeKuvat()); }
        }

        /// <summary>
        /// Viimeisin valo (IssKyytiNakyma: pölyhiukkaset auringonsäteessä): aurinko kameran suunnissa (x oikealle, y ylös,
        /// z eteen) ja w = ISS auringossa 0…1 (maan varjo). Lasketaan ikkunassa aina, vaikka 3D-kehys ei näy (Cupola 2 on UI-kuvina).
        /// </summary>
        public static Vector4 Valo { get; private set; }
        /// <summary>Valo on laskettu tällä kyydillä (Cupola-kerros olemassa); false = ei tietoa, pölyt pois.</summary>
        public static bool ValoTiedossa { get; private set; }
        /// <summary>Maavalo 0,15…1 (CupolanValo.Maavalo): horisontin reunavalo alhaalta (IssKyytiNakyma).</summary>
        public static float MaavaloNyt { get; private set; } = 0.8f;

        void Update()
        {
            // Neljästi sekunnissa ja nopeutettuna sekunnin välein simuloitua aikaa (1000×: ISS kiertää 65°/s); myös kehyksen
            // ollessa piilossa, koska pölyhiukkaset (IssKyytiNakyma) lukevat valon Cupola 2 -kuvien kanssa.
            if (Time.unscaledTime - aurinkoAika >= 0.25f || Math.Abs((IssNyt.Kello() - aurinkoUtc).TotalSeconds) >= 1) PaivitaValo();
            bool valmis = kehys != null;
            float nopeus = LinssiOhjain.Instanssi != null && LinssiOhjain.Instanssi.VahennettyLiike ? 1000f : 1f / HaivytysS;
            peitto = Mathf.MoveTowards(peitto, valmis ? tavoite : 0f, Time.unscaledDeltaTime * nopeus);
            bool nakyy = peitto > 0.001f;
            if (piirto.enabled != nakyy) piirto.enabled = nakyy;
            if (!nakyy) return;
            materiaali.SetFloat(IdPeitto, peitto);
            materiaali.SetFloat(IdAika, Time.unscaledTime);
            materiaali.SetFloat(IdVarsi, Varsi ? 1f : 0f);
            materiaali.SetVector(IdAurinko, aurinko);
            materiaali.SetFloat(IdMaavalo, maavalo);
        }

        /// <summary>Aurinko kameran koordinaateissa, ISS:n varjo ja maavalo (neljästi sekunnissa riittää: 4°/min).</summary>
        void PaivitaValo()
        {
            aurinkoAika = Time.unscaledTime;
            aurinkoUtc = IssNyt.Kello();
            var gt = g.transform;
            Vector3 a = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(
                Aurinko.AurinkoEcef(aurinkoUtc))).normalized;
            double ylos = Vector3.Dot(gt.TransformDirection(IssYlos).normalized, a);
            Vector3 k = kamera.transform.InverseTransformDirection(a);
            var r = CupolanValo.Ruudulle(k.x, k.y, k.z);
            aurinko = new Vector4((float)r.x, (float)r.y, (float)r.z, (float)CupolanValo.Aurinkoisuus(ylos, IssKorkeusKm));
            maavalo = (float)CupolanValo.Maavalo(ylos);
            MaavaloNyt = maavalo;
            Valo = aurinko;
            ValoTiedossa = true;
        }

        /// <summary>Neliö kameran eteen juuri ennen piirtoa: lähitaso ja kenttäkulma ovat tämän kehyksen arvot.</summary>
        void EnnenPiirtoa(ScriptableRenderContext _, Camera c)
        {
            if (c != kamera || piirto == null || !piirto.enabled) return;
            float d = Mathf.Max(1f, kamera.nearClipPlane * 1.5f);
            if (d >= kamera.farClipPlane) d = kamera.farClipPlane * 0.5f;
            float h = 2f * d * Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad), w = h * kamera.aspect;
            transform.localPosition = new Vector3(0, 0, d);
            transform.localRotation = Quaternion.identity;
            // Lasin zoom (IssKuvakulma.LasiZoom): neliö ruutua suurempi, jolloin kehys suurenee samassa suhteessa kuin maa.
            float zoom = Mathf.Max(1f, (float)IssKuvakulma.LasiZoom);
            transform.localScale = new Vector3(w * 1.02f * zoom, h * 1.02f * zoom, 1f);
            materiaali.SetFloat(IdRuutu, kamera.aspect);
        }

        IEnumerator HaeKuvat()
        {
            // iPad-kehys leveämmälle ruudulle (1536 × 2732), muuten iPhone (1206 × 2622); cover rajaa loput.
            bool ipad = Screen.width > 0.5f * Screen.height;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            yield return Hae("iss-cupola-kokonainen-" + koko + ".png", t => kehys = t);
            if (kehys == null) { Debug.LogWarning("MATKAKIRJA ISS-kyyti: Cupola-kehys ei latautunut, ikkuna ilman kehystä"); yield break; }
            materiaali.SetTexture(IdKehys, kehys);
            materiaali.SetFloat(IdKuva, kehys.width / (float)kehys.height);
            yield return Hae("iss-cupola-heijastus-" + koko + ".png", t => heijastus = t);
            if (heijastus != null) materiaali.SetTexture(IdHeijastus, heijastus);
        }

        static IEnumerator Hae(string nimi, Action<Texture2D> valmis)
        {
            string polku = Path.Combine(Application.persistentDataPath, "kuvat", "cupola-" + nimi);
            byte[] tavut = null;
            if (File.Exists(polku)) tavut = File.ReadAllBytes(polku);
            else
            {
                using var p = UnityWebRequest.Get(Juuri + nimi);
                yield return p.SendWebRequest();
                if (p.result == UnityWebRequest.Result.Success)
                {
                    tavut = p.downloadHandler.data;
                    try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, tavut); }
                    catch (Exception e) { Debug.LogWarning("MATKAKIRJA ISS-kyyti: välimuisti " + e.Message); }
                }
                else Debug.LogWarning($"MATKAKIRJA ISS-kyyti: {nimi} {p.error}");
            }
            if (tavut == null) { valmis(null); yield break; }
            // Mipmapit: varjostin lukee kehyksen läheisyyden ja kohokuvion mip-tasoista. Ei CPU-kopiota (markNonReadable).
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, true) { name = nimi, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Trilinear };
            if (!t.LoadImage(tavut, true)) { Destroy(t); valmis(null); yield break; }
            valmis(t);
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Cupola" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 2f);
            return m;
        }

        void OnDestroy()
        {
            ValoTiedossa = false;
            RenderPipelineManager.beginCameraRendering -= EnnenPiirtoa;
            if (TryGetComponent<MeshFilter>(out var f)) Destroy(f.sharedMesh);
            if (materiaali != null) Destroy(materiaali);
            if (kehys != null) Destroy(kehys);
            if (heijastus != null) Destroy(heijastus);
        }
    }
}
