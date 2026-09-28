// DIORAAMAN NÄYTTÄMÖ (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): oma juuri-GameObject origossa ja
// oma Camera dioraaman geometrialle (DioraamaRakennus, DioraamaHahmot). Katso dioraama-rajapinnat-20260929.md
// kohta 6 ja Linnanrakentajan speksi (erä 1, kohta 6.2).
//
// KERROS: ProjectSettings/TagManager.asset-kohdassa vapaa (nimeämätön) kerrosnumero 9 valittu tälle linssille
// (raportoitu erän 1 luovutuksessa; Layer-nimen "Dioraama" lisääminen TagManager.asset-tiedostoon jää tämän
// tehtävän ulkopuolelle, koska sitä ei saanut muokata). GameObject.layer/cullingMask toimivat numerolla ilman
// nimeäkin.
//
// PALLO PIILOON: DioraamaSovitin rekisteröi koko ruudun näkymäpeiton (SyoteLukko.LisaaNakymaPeitto, sama kuin lehdellä):
// PalloKierto.Peitetty → Ruudunpaivitys sammuttaa pallon kameran. SyoteLukko.Esta/Vapauta estää pallon oman eleen, jotta
// se ei käy päällekkäin dioraaman kosketuksen (DioraamaSyote) kanssa.
//
// GLOBAALIT (Shader.SetGlobal…, kaikki dioraaman materiaalit DioraamaMaalattu/DioraamaHahmo jakavat nämä):
//   _DioraamaValo      kiinteä valon suunta (ylhäältä vasemmalta edestä), asetetaan kerran
//   _DioraamaLepatus   hidas kohinainen 0,85…1,0 (tulisijan lepatus), päivitetään joka ruudussa
//   _DioraamaSumuVari + _DioraamaSumu (x=alku m, y=loppu m): lineaarinen etäisyyssumu, sama väri kuin kameran
//                       clear color (#cfd6d6); alku ja loppu seuraavat kameran etäisyyttä kohteeseen (1,6× ja 6×),
//                       jotta tarkennettu tila pysyy kirkkaana ja kaukainen tausta sulautuu
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    // Matkakirja-nimiavaruudessa on jo oma V3 (Kartta/NimiLadonta.cs, nimien asettelu), ja se on lähempänä
    // hakupolussa kuin tiedoston alun using-tuonti: alias pitää olla nimiavaruuden SISÄLLÄ, jotta se voittaa
    // ympäröivän Matkakirja-nimiavaruuden samannimisen tyypin (muuten V3 tarkoittaisi vahingossa sitä).
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed class DioraamaNayttamo : MonoBehaviour
    {
        /// <summary>Unity-kerros (TagManager.asset): vapaa, nimeämätön indeksi 9 (ks. tiedoston alkukommentti).</summary>
        public const int Kerros = 9;

        /// <summary>Näyttämön taustaväri (myös sumun väri): #cfd6d6.</summary>
        public static readonly Color TaustaVari = new Color(0.8118f, 0.8392f, 0.8392f, 1f);
        const float SumuAlkuKerroin = 1.6f, SumuLoppuKerroin = 6f;

        static readonly int IdValo = Shader.PropertyToID("_DioraamaValo"), IdLepatus = Shader.PropertyToID("_DioraamaLepatus"),
            IdSumuVari = Shader.PropertyToID("_DioraamaSumuVari"), IdSumu = Shader.PropertyToID("_DioraamaSumu");
        // "Ylhäältä vasemmalta edestä": +Y ylös, -X vasen, +Z kohti tavanomaista katsojaa (Unity-avaruudessa).
        static readonly Vector3 ValonSuunta = new Vector3(-0.45f, 0.78f, 0.45f).normalized;

        Camera pallonKamera;

        public Camera Kamera { get; private set; }

        /// <summary>Luo näyttämön juuren ja kameran; asettaa kiinteät globaalit kerran.</summary>
        public static DioraamaNayttamo Luo(Camera pallonKamera)
        {
            var go = new GameObject("DioraamaNayttamo");
            var n = go.AddComponent<DioraamaNayttamo>();
            n.pallonKamera = pallonKamera;
            n.LuoKamera();
            Shader.SetGlobalVector(IdValo, ValonSuunta);
            Shader.SetGlobalColor(IdSumuVari, TaustaVari); // sama muunnos kuin kameran taustavärillä
            Shader.SetGlobalVector(IdSumu, new Vector4(1000f, 4000f, 0, 0));
            Shader.SetGlobalFloat(IdLepatus, 1f);
            return n;
        }

        void LuoKamera()
        {
            var kg = new GameObject("DioraamaKamera");
            kg.transform.SetParent(transform, false);
            Kamera = kg.AddComponent<Camera>();
            Kamera.clearFlags = CameraClearFlags.SolidColor;
            Kamera.backgroundColor = TaustaVari;
            Kamera.cullingMask = 1 << Kerros;
            Kamera.nearClipPlane = 0.3f;
            Kamera.farClipPlane = 2000f;
            Kamera.depth = (pallonKamera != null ? pallonKamera.depth : 0f) + 1f;
            var data = Kamera.GetUniversalAdditionalCameraData();
            data.renderType = CameraRenderType.Base;
            data.renderPostProcessing = false;
            data.renderShadows = false;
            data.requiresDepthTexture = false;
            data.requiresColorTexture = false;
        }

        /// <summary>Kanoninen (metrit, +X itä +Y ylös +Z etelä) → Unity (x, y, −z). Ks. dioraama-rajapinnat kohta 0.</summary>
        public static Vector3 UnityPiste(V3 v) => new Vector3((float)v.X, (float)v.Y, (float)-v.Z);

        /// <summary>Kameran asento (Nakyma.Kamera → Kameraliike.AsentoSijainti → Unity) ja lepatuksen päivitys.</summary>
        public void Paivita(Asento kameranAsento, bool vahennettyLiike)
        {
            var (sijainti, kohde) = Kameraliike.AsentoSijainti(kameranAsento);
            Vector3 paikka = UnityPiste(sijainti), kohdeU = UnityPiste(kohde);
            Kamera.transform.position = paikka;
            Vector3 suunta = kohdeU - paikka;
            if (suunta.sqrMagnitude > 1e-8f) Kamera.transform.rotation = Quaternion.LookRotation(suunta, Vector3.up);
            // Datan fov on jo NakymaHetkella(t, pysty)-kutsussa sovitettu pysty/vaakakuvasuhteeseen (Unityn
            // fieldOfView on aina pystykenttä).
            Kamera.fieldOfView = Mathf.Clamp((float)kameranAsento.Fov, 1f, 179f);
            float d = (float)kameranAsento.Etaisyys;
            Shader.SetGlobalVector(IdSumu, new Vector4(d * SumuAlkuKerroin, d * SumuLoppuKerroin, 0, 0));

            float kohina = Mathf.PerlinNoise((float)(Time.unscaledTimeAsDouble * 0.35), 17.3f);
            Shader.SetGlobalFloat(IdLepatus, vahennettyLiike ? 1f : Mathf.Lerp(0.85f, 1f, kohina));
        }

        public void Tuhoa()
        {
            if (this != null && gameObject != null) Destroy(gameObject);
        }
    }
}
