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
using UnityEngine.Rendering;
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
        /// <summary>Hehkun (Bloom) lämmin sävy, erä 2: #ffd9a8.</summary>
        static readonly Color HehkuSavy = new Color(1f, 0.851f, 0.6588f);
        const float SumuAlkuKerroin = 1.6f, SumuLoppuKerroin = 6f;

        static readonly int IdValo = Shader.PropertyToID("_DioraamaValo"), IdLepatus = Shader.PropertyToID("_DioraamaLepatus"),
            IdSumuVari = Shader.PropertyToID("_DioraamaSumuVari"), IdSumu = Shader.PropertyToID("_DioraamaSumu");
        // "Ylhäältä vasemmalta edestä": +Y ylös, -X vasen, +Z kohti tavanomaista katsojaa (Unity-avaruudessa).
        static readonly Vector3 ValonSuunta = new Vector3(-0.45f, 0.78f, 0.45f).normalized;

        /// <summary>QA-kytkin ("poikki dof 0|1", DioraamaSovitin.Komento). Pois päältä: volume.enabled ja
        /// kameran renderPostProcessing menevät epätodeksi joka ruudussa (PaivitaDofTila) -- 0 kustannusta.</summary>
        public static bool DofPaalla = true;
        /// <summary>QA-kytkin hehkulle (Bloom, "poikki hehku 0|1", DioraamaSovitin.Komento). Instanssikohtainen
        /// (ei staattinen kuten DofPaalla: Bloom asuu samassa Volumessa kuin DoF eikä sillä ole vastaavaa tarvetta
        /// säilyä ennen linssin avausta) -- pois päältä = hehkuBloom.active false, DoF:n jälkikäsittely jatkuu
        /// ennallaan (PaivitaDofTila yhdistää molempien tilan).</summary>
        public bool Hehku
        {
            get => hehku;
            set { hehku = value; PaivitaDofTila(); }
        }
        const float VolyymiPrioriteetti = 100f;

        Camera pallonKamera;
        UniversalAdditionalCameraData kameraData;
        Volume volyymi;
        VolumeProfile profiili;
        DepthOfField syvyys;
        Bloom hehkuBloom;
        bool hehku = true;

        public Camera Kamera { get; private set; }
        /// <summary>Liekkinäkymä (tulisijat/kynttilät/soihdut, erä 2): omistus ja elinkaari täällä (Luo/Tuhoa),
        /// samalla kerroksella kuin muu dioraama. DioraamaSovitin kutsuu tätä viittausta LisaaTila/AsetaAtlas-
        /// kutsuihin (Hahmot-malli), kun rakennus.json:n liekkidata on ladattu.</summary>
        public DioraamaLiekit Liekit { get; private set; }
        /// <summary>Dioraaman valot (aurinko + tilojen pistevalot, erä 2b): omistus ja elinkaari täällä (Luo/
        /// Paivita/Tuhoa), sama kerros kuin muu dioraama. Ks. DioraamaValot.cs:n alkukommentti siitä, miksi se
        /// lukee Rakennuksen/kohdetilan DioraamaSovitin-staattisista sen sijaan, että Sovitin työntäisi ne tänne.</summary>
        public DioraamaValot Valot { get; private set; }
        /// <summary>3D-pienoisfiguurit (erä 2b, kohta 4 "3D-HAHMOT"): omistus ja elinkaari TÄÄLLÄ (Luo/Tuhoa),
        /// sama malli kuin Liekit/Valot yllä — mutta Paivita EI tapahdu tämän luokan Paivita-metodissa (toisin
        /// kuin Liekit/Valot), koska se tarvitsee Rakennus+Nakyma-parametrit, joita DioraamaNayttamo.Paivita ei
        /// vastaanota: DioraamaSovitin kutsuu nayttamo.Hahmot3D.Paivita(...):a suoraan omasta Paivita-metodistaan,
        /// SAMAAN kohtaan kuin vanhaa 2D-hahmot3D-kenttää (ks. DioraamaSovitin.cs).</summary>
        public DioraamaHahmot3D Hahmot3D { get; private set; }
        /// <summary>Savu liekki:-tyhjien yllä ja leivotun valon liekkipisteet (Olavinlinna, Siirtoseppä 29.9.2026):
        /// omistus ja elinkaari täällä kuten Liekit; DioraamaSovitin syöttää tilan tyhjät (LisaaTila).</summary>
        public DioraamaSavu Savu { get; private set; }
        /// <summary>Ikkunakeilat pölyineen ikkuna:-tyhjistä (Olavinlinna, Siirtoseppä 29.9.2026).</summary>
        public DioraamaIkkunat Ikkunat { get; private set; }
        /// <summary>Fotogrammetrinen ulkokuori laatutasoineen (Olavinlinna, Siirtoseppä 29.9.2026).</summary>
        public DioraamaUlkokuori Ulkokuori { get; private set; }
        /// <summary>Linnan ympäristö ja järvi (Boat Attack -vesi, maasto, puut, horisontti; Siirtoseppä 1.10.2026).</summary>
        public DioraamaYmparisto Ymparisto { get; private set; }
        /// <summary>Lokkiparvet lokit:-tyhjistä (tunnelma).</summary>
        public DioraamaLokit Lokit { get; private set; }
        /// <summary>Sykkivä vihje ensimmäisellä käynnillä (elävä linna).</summary>
        public DioraamaSyke Syke { get; private set; }
        /// <summary>Etsintä (voudin sinetti): kimallukset, irtoesineet, löytö.</summary>
        public DioraamaEtsinta Etsinta { get; private set; }

        /// <summary>Tunnelma (DioraamaTunnelma): tausta ja sumu, auringon ja taivaan kerroin, lintujen valo.</summary>
        public void AsetaTunnelma(bool hamara)
        {
            var tausta = hamara ? DioraamaTunnelma.HamaraTausta : TaustaVari;
            if (Kamera != null) Kamera.backgroundColor = tausta;
            Shader.SetGlobalColor(IdSumuVari, tausta);
            DioraamaValot.TunnelmaAurinko = hamara ? DioraamaTunnelma.HamaraAurinko : 1f;
            DioraamaValot.TunnelmaTaivas = hamara ? DioraamaTunnelma.HamaraTaivas : 1f;
            Shader.SetGlobalFloat(DioraamaLokit.IdLintuValo, hamara ? DioraamaTunnelma.HamaraLinnut : 1f);
        }
        /// <summary>
        /// Näyttämön kuva: kamera piirtää tähän, ja DioraamaTaulu näyttää sen koko ruudun UI-elementtinä kerroksessa
        /// LinssiUi.MustaKerros (24, Ihmisen matkan musta tausta). Näin kartan UI (nimet, tilarivi, Liiku) jää alle ja
        /// linssin ✕ ja taulu päälle. Koko = ruutu × KuvaSkaala (Mobile_RPAssetin renderöintiskaala 0,8).
        /// </summary>
        public RenderTexture Kuva { get; private set; }
        public const float KuvaSkaala = 0.8f;
        public static event System.Action<RenderTexture> KuvaVaihtui;
        public static RenderTexture NykyinenKuva { get; private set; }

        /// <summary>Luo näyttämön juuren ja kameran; asettaa kiinteät globaalit kerran.</summary>
        public static DioraamaNayttamo Luo(Camera pallonKamera)
        {
            var go = new GameObject("DioraamaNayttamo");
            var n = go.AddComponent<DioraamaNayttamo>();
            n.pallonKamera = pallonKamera;
            n.LuoKamera();
            n.Liekit = new DioraamaLiekit(n.transform);
            n.Valot = new DioraamaValot(n.transform);
            n.Hahmot3D = new DioraamaHahmot3D(n.transform);
            n.Savu = new DioraamaSavu(n.transform);
            n.Ikkunat = new DioraamaIkkunat(n.transform);
            n.Ulkokuori = new DioraamaUlkokuori(n.transform);
            n.Ymparisto = new DioraamaYmparisto(n.transform);
            n.Lokit = new DioraamaLokit(n.transform);
            n.Syke = new DioraamaSyke(n.transform);
            n.Etsinta = new DioraamaEtsinta(n.transform);
            var liekit = n.Liekit;
            DioraamaHahmot3D.LyhdynLuoja = isa => liekit?.LuoLyhty(isa);
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
            // HDR: Bloomin kynnys (0,9) ja lämpötermin ylivalotus (COLOR_0.G · _Lampo > 1, DioraamaMaalattu.shader)
            // tarvitsevat HDR-värikohteen. Mobile_RPAsset/PC_RPAsset sallivat HDR:n jo projektinlaajuisesti halvalla
            // 32-bittisellä R11G11B10-puskurilla (m_HDRColorBufferPrecision 0) -- tämä ei lisää kaistaa/muistia
            // mihinkään muualle. Kuva (RenderTexture, alla) pysyy ARGB32/sRGB:nä: URP:n viimeinen jälkikäsittely-
            // vaihe (tonemapping) pakkaa HDR-värin 0..1-välille ENNEN kirjoitusta target-tekstuuriin, joten itse
            // tulostekstuuria ei tarvitse muuttaa HDR-muotoon (ei lisäkustannusta, ei alfan menetystä).
            Kamera.allowHDR = true;
            kameraData = Kamera.GetUniversalAdditionalCameraData();
            kameraData.renderType = CameraRenderType.Base;
            kameraData.renderPostProcessing = DofPaalla;
            kameraData.renderShadows = true; // era 2b: aurinko+lamput+tuli heittävät varjoja (DioraamaValot.cs)
            kameraData.requiresDepthTexture = true; // syväterävyys tarvitsee syvyystekstuurin; vain tällä kameralla (ei Mobile_RPAssetiin)
            kameraData.requiresColorTexture = false;
            kameraData.volumeLayerMask = 1 << Kerros;

            LuoSyvyysvolyymi();
        }

        /// <summary>
        /// Ajonaikainen Volume + DepthOfField (Gaussian) kerroksessa Kerros, Filmipinon (Kartta/Filmipino.cs) tapaan
        /// (profile, ei sharedProfile: ajonaikainen kopio, jottei säätö kirjoita mihinkään assetiin). HUOM: Filmipino
        /// käyttää bakattua asset-profiilia (Assets/Matkakirja/Asetukset/Filmipino.asset), koska URP karsii
        /// käännöksestä jälkikäsittelyn shader-variantit joita mikään profiili ei käytä -- ajonaikana luotu profiili
        /// jäisi laitteella hiljaa vaikutuksettomaksi, JOS mikään muu profiili buildissa ei käyttäisi samaa efektiä.
        /// Filmipino.asset käyttää jo täsmälleen samaa Gaussian DoF -tilaa (luettu: DepthOfField.mode m_Value 1 =
        /// Gaussian, m_OverrideState 1) ja on osa buildia, joten variantti on jo säilytetty -- tämän näyttämön
        /// ajonaikainen profiili on siis turvallinen NIIN KAUAN kuin Filmipino/sen asset pysyvät projektissa
        /// käytössä (riski kirjattu erän raporttiin).
        /// </summary>
        void LuoSyvyysvolyymi()
        {
            var vg = new GameObject("DioraamaSyvyys");
            vg.layer = Kerros;
            vg.transform.SetParent(transform, false);
            volyymi = vg.AddComponent<Volume>();
            volyymi.isGlobal = true;
            volyymi.priority = VolyymiPrioriteetti;
            profiili = ScriptableObject.CreateInstance<VolumeProfile>();
            profiili.name = "DioraamaSyvyysProfiili";
            syvyys = profiili.Add<DepthOfField>(true);
            syvyys.mode.Override(DepthOfFieldMode.Gaussian);
            syvyys.highQualitySampling.Override(false);

            // Hehku (Bloom, erä 2, dioraama-rajapinnat-era2-20260929.md kohta 3): lämmin sävy korostaa tulisijaa ja
            // muita hehkuvia pintoja (COLOR_0.G, ks. DioraamaMaalattu.shader). Sama Volume/profiili kuin DoF:lla --
            // Filmipino.asset käyttää jo Bloomia (luettu: active 1), joten variantti on säilytetty samalla perusteella
            // kuin yllä DoF:lle (riski kirjattu erän raporttiin).
            hehkuBloom = profiili.Add<Bloom>(true);
            hehkuBloom.threshold.Override(1.2f); // 29.9.: 0,9 tarttui HDR:ssä lähes kaikkiin pintoihin (usva)
            hehkuBloom.intensity.Override(0.45f);
            hehkuBloom.scatter.Override(0.55f);
            hehkuBloom.tint.Override(HehkuSavy);
            // Tonemappaus (erä 2b, 29.9.): valaistu HDR-kuva puristetaan näytölle ilman palanutta valkoista.
            // Neutral, koska Filmipino.asset käyttää sitä jo (variantti säilyy buildissa; ACES voisi karsiutua).
            var savy = profiili.Add<Tonemapping>(true);
            savy.mode.Override(TonemappingMode.Neutral);

            volyymi.profile = profiili;
            PaivitaDofTila(); // alkutila: volyymi.enabled, renderPostProcessing, syvyys.active, hehkuBloom.active
        }

        /// <summary>Kanoninen (metrit, +X itä +Y ylös +Z etelä) → Unity (x, y, −z). Ks. dioraama-rajapinnat kohta 0.</summary>
        public static Vector3 UnityPiste(V3 v) => new Vector3((float)v.X, (float)v.Y, (float)-v.Z);

        /// <summary>Luo tai koon muuttuessa (kierto) luo uudelleen näyttämön kuvan.</summary>
        void VarmistaKuva()
        {
            int w = Mathf.Max(64, Mathf.RoundToInt(Screen.width * KuvaSkaala));
            int h = Mathf.Max(64, Mathf.RoundToInt(Screen.height * KuvaSkaala));
            if (Kuva != null && Kuva.width == w && Kuva.height == h) return;
            VapautaKuva();
            Kuva = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB)
            { name = "DioraamaKuva", antiAliasing = 1, useMipMap = false };
            Kuva.Create();
            Kamera.targetTexture = Kuva;
            NykyinenKuva = Kuva;
            KuvaVaihtui?.Invoke(Kuva);
        }

        void VapautaKuva()
        {
            if (Kuva == null) return;
            if (Kamera != null) Kamera.targetTexture = null;
            Kuva.Release();
            Destroy(Kuva);
            Kuva = null;
        }

        /// <summary>Kameran asento (Nakyma.Kamera → Kameraliike.AsentoSijainti → Unity) ja lepatuksen päivitys.
        /// t (oletus 0): liekkien ruutu ajasta (DioraamaLiekit.Paivita) -- DioraamaSovitin voi jatkossa antaa
        /// tähän Ydin-ajan (pysaytettyT ?? y.Aika), jotta "poikki aika" pysäyttää liekkienkin ruudun kuten hahmot;
        /// oletuksella 0 liekit näkyvät paikallaan (billboard-kääntö toimii silti), poikkeama raportoitu.</summary>
        // SAAPUMISEN ODOTUS (Päätoimittaja 30.9.): kaari alkaa vasta kun kevyt kuori on valmis; sitä ennen näkyy vain hämärä
        // järvi (kamera, syvyys ja vesi jäävät), ei harmaita tilapalikoita. Piilotetut merkitään, jotta palautus ei herätä
        // tarkoituksella piilotettuja (esim. löydetty sinetti). Kutsutaan joka ruutu odotuksen aikana: odotuksen kuluessa
        // syntyvät uudet lapset (tilat, liekit) piiloutuvat samalla.
        readonly System.Collections.Generic.HashSet<GameObject> odotusPiilossa = new System.Collections.Generic.HashSet<GameObject>();
        public void Odota(bool paalla)
        {
            if (paalla)
            {
                foreach (Transform lapsi in transform)
                {
                    var g = lapsi.gameObject;
                    if (!g.activeSelf || (Kamera != null && g == Kamera.gameObject) || g.name == "DioraamaSyvyys" || g.name == "Ulkokuori:vesi") continue;
                    g.SetActive(false);
                    odotusPiilossa.Add(g);
                }
            }
            else
            {
                foreach (var g in odotusPiilossa) if (g != null) g.SetActive(true);
                odotusPiilossa.Clear();
            }
        }

        /// <summary>Linna esiin sumusta (TF 136 -kierros 4.10.: odotuksen jälkeen linna ilmestyi kerralla): sumu peittää aluksi
        /// kohteen etäisyyden (0,45–0,85 d) ja palaa normaaliksi s sekunnissa (smoothstep); linna nousee taustaväristä.</summary>
        public void Haivyta(float s) { haivytysAlku = Time.unscaledTime; haivytysKesto = Mathf.Max(0.01f, s); }
        float haivytysAlku = -10f, haivytysKesto = 1f;

        /// <param name="asetaKamera">false = Cinemachine (DioraamaCinemachine) on jo asettanut kameran paikan, suunnan ja fov:n;
        /// asentoa käytetään silloin vain sumuun ja syväterävyyteen (etäisyys, aukko).</param>
        public void Paivita(Asento kameranAsento, bool vahennettyLiike, double t = 0, bool asetaKamera = true)
        {
            VarmistaKuva();
            PaivitaDofTila();
            if (asetaKamera)
            {
                var (sijainti, kohde) = Kameraliike.AsentoSijainti(kameranAsento);
                Vector3 paikka = UnityPiste(sijainti), kohdeU = UnityPiste(kohde);
                Kamera.transform.position = paikka;
                Vector3 suunta = kohdeU - paikka;
                if (suunta.sqrMagnitude > 1e-8f) Kamera.transform.rotation = Quaternion.LookRotation(suunta, Vector3.up);
                // Datan fov on jo NakymaHetkella(t, pysty)-kutsussa sovitettu pysty/vaakakuvasuhteeseen (Unityn
                // fieldOfView on aina pystykenttä).
                Kamera.fieldOfView = Mathf.Clamp((float)kameranAsento.Fov, 1f, 179f);
            }
            float d = (float)kameranAsento.Etaisyys;
            // Elävä linna (1.0.57): kaukaa saavuttaessa (600 m) järven taso katkesi kaukoleikkaukseen (2000 m) näkyvänä
            // reunana. Sumu on aina täysi ennen kaukotasoa, jolloin järvi häipyy taustaan saumatta.
            // Ympäristö (1.10.2026): rannat 2 km ja horisontti 10 km näkyvät, joten kaukotaso 16 km ja ilmaperspektiivin
            // usva alkaa vasta kolminkertaisen katseluetäisyyden jälkeen ja on täysi 9 km:ssä (horisonttirengas häipyy taustaan).
            bool ymparisto = DioraamaYmparisto.Kaytossa;
            Kamera.nearClipPlane = ymparisto ? 0.5f : 0.3f;
            Kamera.farClipPlane = ymparisto ? 16000f : 2000f;
            float sumuLoppu = ymparisto ? 9000f : Mathf.Min(d * SumuLoppuKerroin, Kamera != null ? Kamera.farClipPlane * 0.9f : 1800f);
            float sumuAlku = ymparisto ? Mathf.Max(d * 3f, 300f) : Mathf.Min(d * SumuAlkuKerroin, sumuLoppu * 0.6f);
            float h = Mathf.Clamp01((Time.unscaledTime - haivytysAlku) / haivytysKesto);
            if (h < 1f)
            {
                h = h * h * (3f - 2f * h);
                // Vain linnan etäisyysvyöhyke (kohde d:n päässä) sumuun: lähivesi pysyy ennallaan, linna nousee taustaväristä.
                sumuLoppu = Mathf.Lerp(Mathf.Min(d * 0.85f, sumuLoppu), sumuLoppu, h);
                sumuAlku = Mathf.Lerp(Mathf.Min(d * 0.45f, sumuAlku), sumuAlku, h);
            }
            Shader.SetGlobalVector(IdSumu, new Vector4(sumuAlku, sumuLoppu, 0, 0));
            Ymparisto?.Paivita(Kamera);
            if (syvyys != null)
            {
                // Aukko 0..1 (0,3 yleisnäkymä loiva -- 0,8 huone voimakas taustan sumennus, ks. DioraamaData.Asento).
                float aukko = (float)kameranAsento.Aukko;
                syvyys.gaussianStart.Override(d + 1.5f);
                syvyys.gaussianEnd.Override(d + 6f + 18f * (1f - aukko));
                syvyys.gaussianMaxRadius.Override(Mathf.Lerp(0.5f, 1.5f, aukko));
            }

            float kohina = Mathf.PerlinNoise((float)(Time.unscaledTimeAsDouble * 0.35), 17.3f);
            Shader.SetGlobalFloat(IdLepatus, vahennettyLiike ? 1f : Mathf.Lerp(0.85f, 1f, kohina));

            // Liekkien billboard-kääntö ja ruutu (ks. Paivita-parametrin t-kommentti yllä).
            Liekit?.Paivita(null, default, Kamera, t);
            Savu?.Paivita(t, vahennettyLiike, Kamera);
            Ikkunat?.Paivita(t, vahennettyLiike);
            Lokit?.Paivita(t, vahennettyLiike);
            // Aurinko/pistevalojen lepatus + kohdetilan mukainen varjoetäisyys (era 2b, DioraamaValot.cs).
            Valot?.Paivita(t, vahennettyLiike, Kamera);
        }

        /// <summary>"poikki dof 0|1" ja Hehku-ominaisuus ("poikki hehku 0|1") voivat vaihtaa tilaa milloin tahansa;
        /// synkronoi näyttämön volumen (jaettu DoF:n ja Bloomin kesken) ja kameran tilan joka ruutu. Molemmat pois
        /// päältä = 0 kustannusta (ei jälkikäsittelyä eikä syvyysajoa tällä kameralla).</summary>
        void PaivitaDofTila()
        {
            bool dofPaalla = DofPaalla;
            bool jokinPaalla = dofPaalla || hehku;
            if (syvyys != null) syvyys.active = dofPaalla;
            if (hehkuBloom != null) hehkuBloom.active = hehku;
            if (volyymi != null) volyymi.enabled = jokinPaalla;
            if (kameraData != null)
            {
                kameraData.renderPostProcessing = jokinPaalla;
                // Syvyysajo vain DoF:n tarpeeseen: Bloom ei tarvitse syvyystekstuuria.
                kameraData.requiresDepthTexture = dofPaalla;
            }
        }

        public void Tuhoa()
        {
            VapautaKuva();
            NykyinenKuva = null;
            KuvaVaihtui?.Invoke(null);
            Liekit?.Tyhjenna();
            Liekit = null;
            Valot?.Tuhoa();
            Valot = null;
            Hahmot3D?.Tyhjenna();
            Hahmot3D = null;
            Savu?.Tyhjenna();
            Savu = null;
            Ikkunat?.Tyhjenna();
            Ikkunat = null;
            Ulkokuori?.Tyhjenna();
            Ulkokuori = null;
            Ymparisto?.Tyhjenna();
            Ymparisto = null;
            Lokit?.Tyhjenna();
            Lokit = null;
            Syke?.Tyhjenna();
            Syke = null;
            Etsinta?.Tyhjenna();
            Etsinta = null;
            AsetaTunnelma(false); // globaalit takaisin päiväksi (muut linssit)
            if (profiili != null) Destroy(profiili);
            profiili = null;
            syvyys = null;
            hehkuBloom = null;
            volyymi = null;
            kameraData = null;
            if (this != null && gameObject != null) Destroy(gameObject);
        }
    }
}
