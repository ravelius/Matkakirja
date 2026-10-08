// KUUMAILMAPALLON KORINÄKYMÄ (omistaja 7.10.2026 klo 09.1x, Päätoimittaja: kokeilu Prahassa, ei junaan ennen kuittausta).
// Kaupunkitilassa (OpasSovitin.Kaupunkitila) kuva on kuin vanhan pallon korista: alalaidassa punotun korin nahkareunus (~12 %
// ruudun korkeudesta) ja sivuilla kaksi köyttä nousee kuvan yläpuolelle. Kori ja köydet piirretään omalla overlay-kameralla
// (kerros Kerros, URP-kamerapino) kaupunkikameran päälle, joten ne eivät uppoa rakennuksiin; ohjaimet (UI Toolkit) jäävät päälle.
// Liike: Ydin KoriLiike (keinunta ~1° / 5 s, jousi vastasuuntaan kiihdytyksissä, köydet viiveellä); kaupunki ja horisontti
// pysyvät vakaina, koska vain overlay-kameran lapset kääntyvät. Kiihtyvyys kaupunkikameran paikasta (2. derivaatta,
// alipäästö); origon siirto (siirtymä toiseen paikkaan) nollaa historian.
// MALLI: Linnanrakentajan kori_nakyma.glb (_valmiit/ilmapallo-v1/kori; solmut kori_etureuna, koysi_v, koysi_o, kamera (0; 1,5; 0)
// katse −Z): Documents/pallokori/kori_nakyma.glb (testi) tai R2 MalliOsoite, välimuisti persistentDataPath. Luetaan DioraamaGlb:llä
// (taustasäie), baseColor-tekstuuri PalloKori-varjostimen _Kuvio 3:lla. Kunnes malli on ladattu, paikkamerkki (laatikot ja
// sylinterit). Korin solmu keinuu omasta pivotistaan (köysien kiinnitysten keskeltä) ja köysisolmut omistaan (alapää).
// ÄÄNET (Päätoimittaja 7.10. 09.2x, omistaja TF 163): ylhäällä lähes hiljaista; korin narina ja köysien kiristys hiljaa (NarinaTaso)
// vain liikkeen muutoksissa (kiihtyvyys ylittää NarinaKiihtyvyyden, vähintään NarinaValiS välein), nousun alussa lyhyt liekin humahdus ja laskun
// alussa kankaan huokaus. Kaupungin äänimaisema korkeuden mukaan Siirtosepän KaupunkiAanimaisemaSoitin.Kamera-Funcilla
// (heijastus, kunnes siirtoseppa/aanimaisema on mainissa). Leikkeet Resources/Aanet/Pallokori: eleven-* (ElevenLabs-ääniefektit,
// omistajan kokeilulupa) ja kirjasto-* (PD/CC0; lähteet proto-3d/_lahteet/pallokori-aanet/*/LAHTEET.md); A/B `opas kori aanet
// eleven|kirjasto` (puuttuva kirjastoääni → eleven).
// A/B: komento `opas kori 0|1`.
using System.IO;
using System.Threading.Tasks;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class PalloKori
    {
        public const int Kerros = 16;
        /// <summary>Köydet vain, kun ruutu on vähintään tämän levyinen (leveys/korkeus): iPhone pysty ~0,46 → ei köysiä, iPad pysty 0,75 → köydet.</summary>
        public const float KoydetMinAspect = 0.6f;
        /// <summary>
        /// Vasemman köyden ruutuala normalisoituna (0–1, x vasemmalta, y ylhäältä; Natiivi-UI siirtää metrolinjan köyden oikealle
        /// puolelle, omistajan stillit 7.10.): tyhjä (width 0), kun köyttä ei näy. Päivittyy joka kehys korin kanssa.
        /// </summary>
        public static Rect VasenKoysiNorm { get; private set; }
        const float KoysiPuoliLeveys = 0.006f;
        /// <summary>A/B (komento `opas kori 0|1`); kaupunkitilassa oletuksena päällä tässä kokeessa.</summary>
        public static bool Paalla = true;
        /// <summary>Äänisarja (A/B): "eleven" tai "kirjasto".</summary>
        public static string AaniSarja = "eleven";
        // Omistaja 18.5x: äänet kuuluviin mutta säästeliäästi (TF 161: 0,55 jäi kaupungin äänimaiseman alle).
        // Omistaja TF 163 (23.2x): "korin natina on häiritsevää se saisi olla paljon pienemmällä" → narina ja köysi −12 dB (×0,25),
        // vain liikkeen muutoksessa (kiihtyvyys ylittää rajan, ei jatkuvasti) ja vähintään 20 s välein; liekki ja kangas ennallaan.
        public const float NarinaKiihtyvyys = 1.2f, NarinaValiS = 20f, NarinaTaso = 0.25f, PystyRaja = 1.8f, PystyValiS = 6f, Voimakkuus = 0.9f;
        /// <summary>
        /// Pallon tehosteet kertojaan nähden (omistaja TF 166, 8.10. 17.5x: "äänitehosteet saisivat olla hieman hiljemmalla"):
        /// −3 dB oletuksena; asetukset.json "pallo.TehosteetDb" ohittaa (osoitinvaihdolla ilman käännöstä). Korin narina, köysi,
        /// liekki ja kangas (Soita) sekä ukkosen kumahdukset (OpasSovitin.SoitaUkkonen).
        /// </summary>
        public static float TehosteKerroin => Mathf.Pow(10f, Matkakirja.Peli.Asetus.Luku("pallo.TehosteetDb", TehosteetDbOletus) / 20f);
        public const float TehosteetDbOletus = -3f;
        bool narinaRajanYli;
        AudioSource aani;
        public const string MalliOsoite = "https://media.matkakirja.app/kartta/ilmapallo/v1/kori_nakyma.glb";
        static GlbMalli malli; static bool malliHaussa;
        Transform malliJuuri, malliKori; readonly System.Collections.Generic.List<Transform> malliKoydet = new System.Collections.Generic.List<Transform>();
        readonly System.Collections.Generic.List<Quaternion> malliKoysiAlku = new System.Collections.Generic.List<Quaternion>();
        Quaternion malliKoriAlku;
        float viimeNarina = -100f, viimeLiekki = -100f, viimeHuokaus = -100f;
        int pystySuunta;
        /// <summary>Etäisyys kamerasta korin etureunaan (m); näkymäkulma ratkaisee koon.</summary>
        const float EtaisyysM = 0.8f;
        /// <summary>Korin reunan yläreuna ruudun alalaidasta, osuutena ruudun korkeudesta (Päätoimittaja: ~12 %).</summary>
        const float ReunaOsuus = 0.12f;
        const float KiihtyvyysAikavakioS = 0.15f, HyppyM = 300f;

        readonly KoriLiike liike = new KoriLiike();
        Camera perus, overlay;
        // PEHMEÄ KORI (omistaja 7.10. 19.0x, kuten Cupolan ikkuna): overlay = korin oma Base-kamera puolikkaalla resoluutiolla
        // tekstuuriin; kooste = kaupunkikameran pinon overlay (kerros KoosteKerros), joka piirtää tekstuurin PalloKoriKooste-varjostimella
        // (sumennus ~2 näyttöpikseliä, tummennus 0,85). Kaupunki terävä; korin piirto kevenee (neljännes pikseleistä).
        public const int KoosteKerros = 18;
        public const float PehmeaSkaala = 0.5f, Tummuus = 0.85f;
        Camera kooste;
        RenderTexture rt;
        // ITSETARKISTUS (Päätoimittaja 19.0x: tummenemisriski ilman simua): muutaman kehyksen jälkeen GPU:lta luetaan korin
        // tekstuurin ylin rivi (taivas: pitää olla läpinäkyvä) ja alin rivi (korin reuna: pitää peittää). Jos jompikumpi ei täsmää
        // (alfa ei säily laitteella tai kori ei piirry tekstuuriin), palataan pysyvästi suoraan overlay-piirtoon ilman pehmennystä.
        static bool pehmeaEiToimi;
        int tarkistusKehys = -1; bool tarkistusKesken, tarkistettu;
        Material koosteMat;
        Transform koosteTaso;
        Transform juuri, koriKaanto, koysiKaanto;
        Material punos, nahka, koysi;
        float fov = -1, aspect = -1;
        Vector3 edPaikka, edNopeus, kiihtyvyys;
        int historia;
        bool kaytossa;

        public bool Nakyy => kaytossa && juuri != null && juuri.gameObject.activeSelf;
        /// <summary>Testi (Editori KoriKoosteTesti): korin oma kamera ja koostekamera.</summary>
        public Camera KoriKamera => overlay;
        public Camera KoosteKamera => kooste;
        public KoriLiike Liike => liike;

        /// <summary>Joka kehys oppaasta: kaytossa = kaupunkitila ja näkymä auki.</summary>
        public void Kayta(bool paalla, Camera kamera)
        {
            paalla &= Paalla && kamera != null;
            if (paalla && (perus != kamera || overlay == null)) Luo(kamera);
            if (paalla && overlay != null && rt != null) { VarmistaKohde(); Itsetarkistus(); }   // ruudun koko (kierto) ennen piirtoa
            if (paalla == kaytossa) return;
            kaytossa = paalla;
            if (juuri != null) juuri.gameObject.SetActive(paalla);
            if (overlay != null) overlay.enabled = paalla;
            if (kooste != null) kooste.enabled = paalla;
            historia = 0;
            if (paalla) RenderPipelineManager.beginCameraRendering += EnnenPiirtoa;
            else RenderPipelineManager.beginCameraRendering -= EnnenPiirtoa;
        }

        public void Sulje()
        {
            Kayta(false, null);
            if (perus != null && kooste != null)
            {
                var d = perus.GetUniversalAdditionalCameraData();
                if (d != null) d.cameraStack.Remove(kooste);
            }
            if (overlay != null) { overlay.targetTexture = null; Object.Destroy(overlay.gameObject); }
            if (kooste != null) Object.Destroy(kooste.gameObject);
            if (rt != null) { rt.Release(); Object.Destroy(rt); }
            if (koosteMat != null) Object.Destroy(koosteMat);
            kooste = null; rt = null; koosteMat = null; koosteTaso = null;
            foreach (var m in new[] { punos, nahka, koysi }) if (m != null) Object.Destroy(m);
            KytkeAanimaisema(false);
            VasenKoysiNorm = default;
            malliJuuri = null; malliKori = null; malliKoydet.Clear(); malliKoysiAlku.Clear(); koysiVerkot.Clear();
            if (liekkiMat != null) Object.Destroy(liekkiMat);
            liekki = null; liekkiMat = null;
            overlay = null; juuri = null; perus = null; punos = nahka = koysi = null; fov = aspect = -1; aani = null;
        }

        void Luo(Camera kamera)
        {
            Sulje();
            perus = kamera;
            var go = new GameObject("Pallon kori (overlay)") { layer = Kerros };
            go.transform.SetParent(kamera.transform, false);
            overlay = go.AddComponent<Camera>();
            if (pehmeaEiToimi) { SuoraTila(kamera); goto materiaalit; }
            overlay.clearFlags = CameraClearFlags.SolidColor;
            overlay.backgroundColor = Color.clear;
            overlay.cullingMask = 1 << Kerros;
            overlay.nearClipPlane = 0.05f; overlay.farClipPlane = 20f;
            overlay.allowHDR = false; overlay.allowMSAA = false;
            overlay.depth = kamera.depth - 1f;   // ennen kaupunkikameraa: tekstuuri valmis koosteelle
            var od = overlay.GetUniversalAdditionalCameraData();
            od.renderType = CameraRenderType.Base;
            od.renderPostProcessing = false; od.antialiasing = AntialiasingMode.None;
            od.requiresDepthTexture = false; od.requiresColorTexture = false;
            VarmistaKohde();
            var kg = new GameObject("Pallon kori (kooste)") { layer = KoosteKerros };
            kg.transform.SetParent(kamera.transform, false);
            kooste = kg.AddComponent<Camera>();
            kooste.clearFlags = CameraClearFlags.Depth;
            kooste.cullingMask = 1 << KoosteKerros;
            kooste.nearClipPlane = 0.1f; kooste.farClipPlane = 5f;
            kooste.GetUniversalAdditionalCameraData().renderType = CameraRenderType.Overlay;
            var pd = kamera.GetUniversalAdditionalCameraData();
            if (pd != null && !pd.cameraStack.Contains(kooste)) pd.cameraStack.Insert(0, kooste);
            koosteMat = new Material(Resources.Load<Shader>("Varjostimet/PalloKoriKooste")) { name = "Pallon kori (kooste)" };
            koosteMat.SetFloat("_Tummuus", Tummuus);
            koosteMat.SetTexture("_MainTex", rt);
            var q = GameObject.CreatePrimitive(PrimitiveType.Quad);
            Object.Destroy(q.GetComponent<Collider>());
            q.name = "Korin taso"; q.layer = KoosteKerros;
            q.transform.SetParent(kg.transform, false);
            var qr = q.GetComponent<MeshRenderer>();
            qr.sharedMaterial = koosteMat; qr.shadowCastingMode = ShadowCastingMode.Off; qr.receiveShadows = false;
            koosteTaso = q.transform;
            tarkistusKehys = Time.frameCount + 4; tarkistusKesken = false; tarkistettu = false;
            materiaalit:
            var sh = Shader.Find("Matkakirja/Linssit/PalloKori");
            punos = Materiaali(sh, new Color(0.55f, 0.40f, 0.24f), 1, new Vector4(60, 6, 0, 0));
            nahka = Materiaali(sh, new Color(0.30f, 0.17f, 0.09f), 0, Vector4.one);
            koysi = Materiaali(sh, new Color(0.62f, 0.52f, 0.36f), 2, new Vector4(1, 40, 0, 0));
            juuri = new GameObject("Kori") { layer = Kerros }.transform;
            juuri.SetParent(go.transform, false);
            koriKaanto = new GameObject("Korin kääntö") { layer = Kerros }.transform;
            koriKaanto.SetParent(juuri, false);
            koysiKaanto = new GameObject("Köysien kääntö") { layer = Kerros }.transform;
            koysiKaanto.SetParent(juuri, false);
            aani = go.AddComponent<AudioSource>();
            aani.playOnAwake = false; aani.spatialBlend = 0f; aani.loop = false;
            KytkeAanimaisema(true);
        }

        static AudioClip Leike(string nimi)
        {
            AudioClip c = null;
            if (AaniSarja == "kirjasto") c = Resources.Load<AudioClip>("Aanet/Pallokori/kirjasto-" + nimi);
            return c != null ? c : Resources.Load<AudioClip>("Aanet/Pallokori/eleven-" + nimi);
        }

        void Soita(string nimi, float taso)
        {
            var c = Leike(nimi);
            if (c == null || aani == null) return;
            aani.PlayOneShot(c, (float)Matkakirja.Linssit.Aanet.OpasAanitasot.Kori(Voimakkuus, taso, TehosteKerroin, Asetukset.Taso(Voima.Tehosteet), OpasSovitin.OpasAaniSoi));   // mikserin Tehosteet ja väistö kertojan alla (8.10.)
            Debug.Log($"MATKAKIRJA kaupunki: kori ääni {nimi} ({AaniSarja}, {taso:F2})");
        }

        /// <summary>Kaupungin äänimaisema seuraa korin korkeutta (Siirtosepän staattinen Func; heijastus, jotta kääntyy ilman sitä).</summary>
        void KytkeAanimaisema(bool paalle)
        {
            var t = typeof(PalloKori).Assembly.GetType("Matkakirja.Natiivi.KaupunkiAanimaisemaSoitin");
            var f = t?.GetField("Kamera", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (f == null || f.FieldType != typeof(System.Func<(double, double, double, double)?>)) return;
            f.SetValue(null, paalle ? (System.Func<(double, double, double, double)?>)(() =>
            {
                if (!kaytossa || perus == null) return null;
                double korkeus = System.Math.Max(0, perus.transform.position.y);   // origo kohteen maassa (SiirraOrigo)
                return (korkeus, (double)edNopeus.magnitude, 0d, 0d);
            }) : null);
        }

        static Material Materiaali(Shader sh, Color c, float kuvio, Vector4 toisto)
        {
            var m = new Material(sh != null ? sh : Shader.Find("Universal Render Pipeline/Unlit"));
            m.SetColor("_Vari", c); m.SetFloat("_Kuvio", kuvio); m.SetVector("_Toisto", toisto);
            return m;
        }

        /// <summary>Paikkamerkin geometria näkymäkulman mukaan (reunan yläreuna ReunaOsuus ruudun alalaidasta).</summary>
        void Rakenna()
        {
            foreach (Transform t in koriKaanto) Object.Destroy(t.gameObject);
            foreach (Transform t in koysiKaanto) Object.Destroy(t.gameObject);
            if (malli != null) { if (malliJuuri == null) RakennaMalli(); return; }
            if (!malliHaussa && Matkakirja.Natiivi.LinssiOhjain.Instanssi != null) Matkakirja.Natiivi.LinssiOhjain.Instanssi.StartCoroutine(HaeMalli());
            float h = EtaisyysM * Mathf.Tan(fov * 0.5f * Mathf.Deg2Rad), w = h * aspect;
            float yla = -h + 2 * h * ReunaOsuus, nahkaK = 0.05f * h;
            Laatikko(koriKaanto, punos, new Vector3(0, (yla - nahkaK + -1.6f * h) * 0.5f, EtaisyysM + 0.02f), new Vector3(2.6f * w, (yla - nahkaK) + 1.6f * h, 0.04f));
            Laatikko(koriKaanto, nahka, new Vector3(0, yla - nahkaK * 0.5f, EtaisyysM - 0.005f), new Vector3(2.6f * w, nahkaK, 0.06f));
            foreach (float s in new[] { -1f, 1f })
            {
                var ala = new Vector3(s * 0.86f * w, yla, EtaisyysM + 0.05f);
                var ylos = new Vector3(s * 0.62f * w, 2.2f * h, EtaisyysM + 0.6f);
                Koysi(koysiKaanto, ala, ylos, 0.012f * h);
            }
        }

        /// <summary>GLB levyltä (Documents → välimuisti) tai R2:sta; jäsennys taustasäikeellä. Saapuessa näkymä rakennetaan uudelleen.</summary>
        System.Collections.IEnumerator HaeMalli()
        {
            malliHaussa = true;
            string testi = Path.Combine(Application.persistentDataPath, "pallokori", "kori_nakyma.glb");
            string valimuisti = Path.Combine(Application.persistentDataPath, "kuvat", "pallokori-v1.glb");
            byte[] glb = null;
            foreach (var p in new[] { testi, valimuisti }) if (glb == null && File.Exists(p)) try { glb = File.ReadAllBytes(p); } catch (System.Exception) { }
            if (glb == null)
            {
                using var r = UnityEngine.Networking.UnityWebRequest.Get(MalliOsoite);
                r.timeout = 30;
                yield return r.SendWebRequest();
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                {
                    glb = r.downloadHandler.data;
                    try { Directory.CreateDirectory(Path.GetDirectoryName(valimuisti)); File.WriteAllBytes(valimuisti, glb); } catch (System.Exception) { }
                }
                else Debug.Log($"MATKAKIRJA kaupunki: kori: malli ei latautunut ({r.responseCode}), paikkamerkki");
            }
            if (glb == null) { malliHaussa = false; yield break; }
            var tyo = Task.Run(() => DioraamaGlb.Lue(glb, true));
            while (!tyo.IsCompleted) yield return null;
            malliHaussa = false;
            if (tyo.IsFaulted) { Debug.Log("MATKAKIRJA kaupunki: kori: GLB virhe " + tyo.Exception?.GetBaseException().Message); yield break; }
            malli = tyo.Result;
            Debug.Log($"MATKAKIRJA kaupunki: kori: malli {malli.Solmut.Count} solmua, {malli.Kuvat.Count} kuvaa");
            fov = -1;   // seuraava kehys rakentaa mallin
        }

        void RakennaMalli()
        {
            malliJuuri = new GameObject("Korimalli") { layer = Kerros }.transform;
            malliJuuri.SetParent(juuri, false);
            malliJuuri.localPosition = new Vector3(0, -1.5f, 0);   // mallin kamera (0; 1,5; 0) = overlay-kamera
            var tekstuurit = new System.Collections.Generic.Dictionary<int, Texture2D>();
            var solmut = new Transform[malli.Solmut.Count];
            for (int i = 0; i < malli.Solmut.Count; i++)
            {
                var sm = malli.Solmut[i];
                var go = new GameObject(sm.Nimi ?? "solmu") { layer = Kerros };
                solmut[i] = go.transform;
                go.transform.localPosition = new Vector3(sm.Translation[0], sm.Translation[1], sm.Translation[2]);
                go.transform.localRotation = new Quaternion(sm.Rotation[0], sm.Rotation[1], sm.Rotation[2], sm.Rotation[3]);
                go.transform.localScale = new Vector3(sm.Scale[0], sm.Scale[1], sm.Scale[2]);
                foreach (var osa in sm.Osat) Osa(go.transform, osa, tekstuurit);
            }
            for (int i = 0; i < solmut.Length; i++)
            {
                int v = malli.Solmut[i].Vanhempi;
                solmut[i].SetParent(v >= 0 ? solmut[v] : malliJuuri, false);
                var nimi = malli.Solmut[i].Nimi ?? "";
                if (nimi == "kori_etureuna") { malliKori = solmut[i]; malliKoriAlku = solmut[i].localRotation; }
                else if (nimi.StartsWith("koysi")) { malliKoydet.Add(solmut[i]); malliKoysiAlku.Add(solmut[i].localRotation); }
            }
            RakennaKoysiVerkot();
        }

        // KÖYDET VERLET-KETJUNA (Linssiseppä 8.10., pallo Unreal-tasolle kohta 5): jokainen köysiverkko taipuu Ydin VerletKoysin mukaan
        // (pituusakseli = verkon suurin ulottuvuus, t = 0 alhaalla korin reunassa); jäykkä viivekierto (KoriLiike) säilyy päällä.
        sealed class KoysiVerkko { public Mesh Mesh; public Vector3[] Alku, Uudet; public float[] T; public int A1, A2; public VerletKoysi Sim; }
        readonly System.Collections.Generic.List<KoysiVerkko> koysiVerkot = new System.Collections.Generic.List<KoysiVerkko>();
        void RakennaKoysiVerkot()
        {
            koysiVerkot.Clear();
            foreach (var k in malliKoydet)
                foreach (var mf in k.GetComponentsInChildren<MeshFilter>())
                {
                    var m = mf.sharedMesh; if (m == null || m.vertexCount == 0) continue;
                    var b = m.bounds; var e = b.size;
                    int ak = e.x >= e.y && e.x >= e.z ? 0 : e.y >= e.z ? 1 : 2;
                    var alku = m.vertices; var t = new float[alku.Length];
                    float min = b.min[ak], pit = Mathf.Max(1e-4f, e[ak]);
                    for (int i = 0; i < alku.Length; i++) t[i] = (alku[i][ak] - min) / pit;
                    m.MarkDynamic();
                    var lisa = new Vector3(0.5f, 0.5f, 0.5f); lisa[ak] = 0f;   // taipuma mahtuu rajoihin (ei näkyvyyskarsintaa)
                    m.bounds = new Bounds(b.center, b.size + lisa);
                    koysiVerkot.Add(new KoysiVerkko { Mesh = m, Alku = alku, Uudet = new Vector3[alku.Length], T = t, A1 = (ak + 1) % 3, A2 = (ak + 2) % 3, Sim = new VerletKoysi(pit) });
                }
        }
        void PaivitaKoydet(float dt, float aOikea, float aEteen)
        {
            foreach (var k in koysiVerkot)
            {
                k.Sim.Paivita(dt, aOikea, aEteen);
                for (int i = 0; i < k.Alku.Length; i++)
                {
                    var (ox, oz) = k.Sim.Poikkeama(k.T[i]);
                    var v = k.Alku[i]; v[k.A1] += (float)ox; v[k.A2] += (float)oz; k.Uudet[i] = v;
                }
                k.Mesh.SetVertices(k.Uudet);
            }
        }

        /// <summary>
        /// Malli on sommiteltu vaakaruudulle (fov 60°, 16:9; Linnanrakentaja). Muulla ruudulla (simu 7.10. 10.50: iPhone pysty, köydet
        /// kuvan ulkopuolella ja reunus 3 %): reunuksen yläreuna siirretään ReunaOsuus-korkeudelle ja köydet sisään 85 %:iin puolileveydestä.
        /// </summary>
        void SovitaMalli()
        {
            if (malliJuuri == null || perus == null) return;
            const float Z = 0.881f, ReunaY = 1.122f, KoysiX = 0.551f;   // korin etureuna, reunuksen yläreuna ja köysien kiinnitys (m)
            float t = Mathf.Tan(perus.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float tavoiteY = (-1f + 2f * ReunaOsuus) * t * Z;              // kameran koordinaateissa
            malliJuuri.localPosition = new Vector3(0, -1.5f + (tavoiteY - (ReunaY - 1.5f)), 0);
            float puoliLeveys = t * perus.aspect * Z;
            // Omistaja 7.10. 12.3x: iPhonen pystynäkymässä köydet pois (kori ja reunus jäävät); vaaka ja iPad ennallaan.
            bool koydet = perus.aspect >= KoydetMinAspect;
            for (int i = 0; i < malliKoydet.Count; i++) if (malliKoydet[i] != null && malliKoydet[i].gameObject.activeSelf != koydet) malliKoydet[i].gameObject.SetActive(koydet);
            if (koysiKaanto != null && koysiKaanto.gameObject.activeSelf != koydet) koysiKaanto.gameObject.SetActive(koydet);
            for (int i = 0; i < malliKoydet.Count; i++)
            {
                var k = malliKoydet[i]; if (k == null) continue;
                float x = Mathf.Sign(k.localPosition.x) * Mathf.Min(KoysiX, 0.85f * puoliLeveys);
                if (!Mathf.Approximately(k.localPosition.x, x)) k.localPosition = new Vector3(x, k.localPosition.y, k.localPosition.z);
            }
        }

        void Osa(Transform v, GlbOsa osa, System.Collections.Generic.Dictionary<int, Texture2D> tekstuurit)
        {
            int n = (osa.Paikat?.Length ?? 0) / 3;
            if (n == 0) return;
            var paikat = new Vector3[n]; var normaalit = new Vector3[n]; var uv = new Vector2[n];
            for (int i = 0; i < n; i++)
            {
                paikat[i] = new Vector3(osa.Paikat[i * 3], osa.Paikat[i * 3 + 1], osa.Paikat[i * 3 + 2]);
                normaalit[i] = osa.Normaalit != null && osa.Normaalit.Length >= (i + 1) * 3 ? new Vector3(osa.Normaalit[i * 3], osa.Normaalit[i * 3 + 1], osa.Normaalit[i * 3 + 2]) : Vector3.up;
                uv[i] = osa.Uv != null && osa.Uv.Length >= (i + 1) * 2 ? new Vector2(osa.Uv[i * 2], 1f - osa.Uv[i * 2 + 1]) : Vector2.zero;
            }
            var mesh = new Mesh { name = "Kori " + osa.Pinta, indexFormat = IndexFormat.UInt32 };
            mesh.SetVertices(paikat); mesh.SetNormals(normaalit); mesh.SetUVs(0, uv);
            mesh.SetTriangles(osa.Kolmiot ?? System.Array.Empty<int>(), 0);
            mesh.RecalculateBounds();
            var go = new GameObject("osa " + osa.Pinta) { layer = Kerros };
            go.transform.SetParent(v, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>(); r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
            var m = Materiaali(Shader.Find("Matkakirja/Linssit/PalloKori"), Color.white, 3, new Vector4(1, 1, 0, 0));
            if (osa.Kuva >= 0 && osa.Kuva < malli.Kuvat.Count && malli.Kuvat[osa.Kuva] != null)
            {
                if (!tekstuurit.TryGetValue(osa.Kuva, out var t))
                {
                    t = new Texture2D(2, 2, TextureFormat.RGBA32, true);
                    t.LoadImage(malli.Kuvat[osa.Kuva], true);
                    tekstuurit[osa.Kuva] = t;
                }
                m.SetTexture("_MainTex", t);
                // Normaali- ja ORM-kartat (Linssiseppä 8.10.: kori_nakyma.glb:n kaikissa materiaaleissa), lineaarisina.
                Texture2D Lin(int i)
                {
                    if (i < 0 || i >= malli.Kuvat.Count || malli.Kuvat[i] == null) return null;
                    if (!tekstuurit.TryGetValue(LinAvain + i, out var lt))
                    {
                        lt = new Texture2D(2, 2, TextureFormat.RGBA32, true, true);
                        lt.LoadImage(malli.Kuvat[i], true);
                        tekstuurit[LinAvain + i] = lt;
                    }
                    return lt;
                }
                var nor = Lin(osa.NormaaliKuva); var orm = Lin(osa.OrmKuva);
                if (nor != null && orm != null) { m.SetTexture("_NorTex", nor); m.SetTexture("_OrmTex", orm); m.SetFloat("_OnKartat", 1); }
            }
            else if (osa.Vari != null && osa.Vari.Length >= 3) { m.SetFloat("_Kuvio", 0); m.SetColor("_Vari", new Color(osa.Vari[0], osa.Vari[1], osa.Vari[2]).gamma); }
            r.sharedMaterial = m;
        }

        const int LinAvain = 100000;   // lineaaristen (normaali, ORM) tekstuurien avaimet samassa välimuistissa

        void Laatikko(Transform v, Material m, Vector3 p, Vector3 koko)
        {
            var g = GameObject.CreatePrimitive(PrimitiveType.Cube);
            Object.Destroy(g.GetComponent<Collider>());
            g.layer = Kerros; g.transform.SetParent(v, false);
            g.transform.localPosition = p; g.transform.localScale = koko;
            var r = g.GetComponent<MeshRenderer>(); r.sharedMaterial = m; r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
        }

        void Koysi(Transform v, Vector3 a, Vector3 b, float sade)
        {
            var g = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            Object.Destroy(g.GetComponent<Collider>());
            g.layer = Kerros; g.transform.SetParent(v, false);
            g.transform.localPosition = (a + b) * 0.5f;
            g.transform.localRotation = Quaternion.FromToRotation(Vector3.up, (b - a).normalized);
            g.transform.localScale = new Vector3(2 * sade, (b - a).magnitude * 0.5f, 2 * sade);
            var r = g.GetComponent<MeshRenderer>(); r.sharedMaterial = koysi; r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
        }

        /// <summary>Vasemman köyden (mallin koysi_v tai paikkamerkin vasen sylinteri) näkyvä ruutuala overlay-kameralla.</summary>
        Rect LaskeVasenKoysi()
        {
            if (overlay == null || !kaytossa) return default;
            Transform koysi = null;
            foreach (var k in malliKoydet) if (k != null && k.gameObject.activeInHierarchy && overlay.transform.InverseTransformPoint(k.position).x < 0) koysi = k;
            if (koysi == null && koysiKaanto != null && koysiKaanto.gameObject.activeInHierarchy)
                foreach (Transform t in koysiKaanto) if (overlay.transform.InverseTransformPoint(t.position).x < 0) koysi = t;
            if (koysi == null) return default;
            var rr = koysi.GetComponentsInChildren<Renderer>();
            if (rr.Length == 0) return default;
            // Köyden akseli näytteinä (NUI 13.1x: maailman AABB:n kulmat levisivät perspektiivissä ruudun reunaan → metrolinja
            // ruudun ulkopuolelle). Jokaisen rendererin oman localBoundsin pisin akseli, 17 pistettä, vain kameran edessä ja ruudulla.
            float xmin = 1, xmax = 0, ymin = 1, ymax = 0;
            float lahin = overlay.nearClipPlane;
            foreach (var r in rr)
            {
                var lb = r.localBounds; var e = lb.extents;
                Vector3 akseli = e.x >= e.y && e.x >= e.z ? new Vector3(e.x, 0, 0) : e.y >= e.z ? new Vector3(0, e.y, 0) : new Vector3(0, 0, e.z);
                for (int i = 0; i <= 16; i++)
                {
                    var v = overlay.WorldToViewportPoint(r.transform.TransformPoint(lb.center + akseli * (i / 8f - 1)));
                    if (v.z <= lahin || v.y < 0 || v.y > 1 || v.x < -0.05f || v.x > 1.05f) continue;
                    xmin = Mathf.Min(xmin, v.x); xmax = Mathf.Max(xmax, v.x); ymin = Mathf.Min(ymin, 1 - v.y); ymax = Mathf.Max(ymax, 1 - v.y);
                }
            }
            if (xmax < xmin) return default;
            xmin -= KoysiPuoliLeveys; xmax += KoysiPuoliLeveys;
            xmin = Mathf.Clamp01(xmin); xmax = Mathf.Clamp01(xmax); ymin = Mathf.Clamp01(ymin); ymax = Mathf.Clamp01(ymax);
            return xmax > xmin && ymax >= ymin ? new Rect(xmin, ymin, xmax - xmin, ymax - ymin) : default;
        }

        /// <summary>Lähdön laattaodotus (pallo lipuu, kertoja hiljaa): kori narahtaa ja köysi kiristyy hiljaa, enintään NarinaValiS välein
        /// (omistaja TF 163: narina ×0,25). Ei poltinta (pallo ei nouse).</summary>
        public void OdotusAani()
        {
            float nyt = Time.unscaledTime;
            if (nyt - viimeNarina <= NarinaValiS) return;
            viimeNarina = nyt;
            Soita("korin-narina", 0.5f * NarinaTaso);
            Soita("koyden-kiristys", 0.35f * NarinaTaso);
        }

        void Aanet(float vaakaKiihtyvyys, float pystyNopeus)
        {
            float nyt = Time.unscaledTime;
            if (historia < 2) return;
            bool yli = vaakaKiihtyvyys > NarinaKiihtyvyys, muutos = yli && !narinaRajanYli;
            narinaRajanYli = yli;
            if (muutos && nyt - viimeNarina > NarinaValiS)
            {
                viimeNarina = nyt;
                float taso = (Mathf.Clamp01((vaakaKiihtyvyys - NarinaKiihtyvyys) / 4f) * 0.6f + 0.4f) * NarinaTaso;
                Soita("korin-narina", taso);
                Soita("koyden-kiristys", taso * 0.7f);
            }
            // Liekin humahdus samasta polttimesta kuin liekki ja valo (Poltin.Syttyi), ei omaa kynnystä.
            if (poltin.Syttyi && nyt - viimeLiekki > PystyValiS) { viimeLiekki = nyt; Soita("liekin-humahdus", 0.8f); }
            int suunta = pystyNopeus > PystyRaja ? 1 : pystyNopeus < -PystyRaja ? -1 : 0;
            if (suunta != 0 && suunta != pystySuunta)
            {
                if (suunta < 0 && nyt - viimeHuokaus > PystyValiS) { viimeHuokaus = nyt; Soita("kankaan-huokaus", 0.7f); }
            }
            pystySuunta = suunta;
        }

        /// <summary>Kaupunkikameran lopullinen asento tässä kehyksessä: kiihtyvyys ja korin kulmat ennen piirtoa.</summary>
        /// <summary>Suora piirto (TF 161:n tapa): korin kamera overlayna kaupunkikameran pinossa, ei tekstuuria eikä koostetta.</summary>
        void SuoraTila(Camera kamera)
        {
            overlay.targetTexture = null;
            overlay.clearFlags = CameraClearFlags.Depth;
            overlay.cullingMask = 1 << Kerros;
            overlay.nearClipPlane = 0.05f; overlay.farClipPlane = 20f;
            overlay.GetUniversalAdditionalCameraData().renderType = CameraRenderType.Overlay;
            var pd = kamera.GetUniversalAdditionalCameraData();
            if (pd != null && kooste != null) pd.cameraStack.Remove(kooste);
            if (pd != null && !pd.cameraStack.Contains(overlay)) pd.cameraStack.Insert(0, overlay);
            if (kooste != null) { Object.Destroy(kooste.gameObject); kooste = null; koosteTaso = null; }
            if (rt != null) { rt.Release(); Object.Destroy(rt); rt = null; }
        }

        void Itsetarkistus()
        {
            if (tarkistettu || tarkistusKesken || pehmeaEiToimi || Time.frameCount < tarkistusKehys) return;
            if (!SystemInfo.supportsAsyncGPUReadback) { tarkistettu = true; return; }
            tarkistusKesken = true;
            int w = rt.width, h = rt.height, kehys = Time.frameCount;
            // Rivit keskeltä puolet leveydestä: ylin (köydet ovat sivuilla, keskellä taivas) ja alin (korin etureuna).
            int x0 = w / 4, lev = w / 2;
            float? yla = null, ala = null;
            void Valmis()
            {
                if (yla == null || ala == null) return;
                tarkistusKesken = false; tarkistettu = true;
                // Riviorientaatiosta riippumatta (GPU:n y voi olla käännetty): toisen reunan pitää olla läpinäkyvä, toisen peittää.
                bool ok = Mathf.Min(yla.Value, ala.Value) < 0.1f && Mathf.Max(yla.Value, ala.Value) > 0.5f;
                Debug.Log($"MATKAKIRJA kaupunki: kori pehmeä itsetarkistus {(ok ? "ok" : "EI TOIMI → suora piirto")} (ylin rivi peittää {yla:P0}, alin {ala:P0})");
                if (!ok && perus != null && overlay != null) { pehmeaEiToimi = true; SuoraTila(perus); }
            }
            void Pyyda(int y, System.Action<float> tulos)
            {
                AsyncGPUReadback.Request(rt, 0, x0, lev, y, 1, 0, 1, TextureFormat.RGBA32, r =>
                {
                    if (r.hasError || rt == null) { tulos(-1f); return; }
                    var d = r.GetData<Color32>();
                    int peittaa = 0;
                    for (int i = 0; i < d.Length; i++) if (d[i].a > 127) peittaa++;
                    tulos(d.Length > 0 ? peittaa / (float)d.Length : -1f);
                });
            }
            Pyyda(h - 2, v => { yla = v < 0 ? 0f : v; Valmis(); });
            Pyyda(1, v => { ala = v < 0 ? 1f : v; Valmis(); });
        }

        /// <summary>Korin tekstuuri puolikkaalla resoluutiolla (uusi, kun ruudun koko muuttuu).</summary>
        void VarmistaKohde()
        {
            if (pehmeaEiToimi || overlay == null) return;
            // Kohteen koko: kaupunkikameran oma tekstuuri (testi) tai ruutu.
            int sw = perus != null && perus.targetTexture != null ? perus.targetTexture.width : Screen.width;
            int sh = perus != null && perus.targetTexture != null ? perus.targetTexture.height : Screen.height;
            int w = Mathf.Max(16, Mathf.RoundToInt(sw * PehmeaSkaala)), h = Mathf.Max(16, Mathf.RoundToInt(sh * PehmeaSkaala));
            if (rt != null && rt.width == w && rt.height == h) return;
            if (rt != null) { overlay.targetTexture = null; rt.Release(); Object.Destroy(rt); }
            rt = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32) { name = "Pallon kori", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp, antiAliasing = 1 };
            rt.Create();
            overlay.targetTexture = rt;
            if (koosteMat != null) koosteMat.SetTexture("_MainTex", rt);
        }

        /// <summary>Koostetaso täyttää koostekameran näkymän (fov ja kuvasuhde kaupunkikamerasta).</summary>
        void SovitaKooste()
        {
            if (kooste == null || koosteTaso == null) return;
            kooste.fieldOfView = perus.fieldOfView;
            float k = 2f * Mathf.Tan(perus.fieldOfView * 0.5f * Mathf.Deg2Rad);
            koosteTaso.localPosition = new Vector3(0, 0, 1f);
            koosteTaso.localRotation = Quaternion.identity;
            koosteTaso.localScale = new Vector3(k * perus.aspect, k, 1f);
        }

        static readonly int IdAurinko = Shader.PropertyToID("_KoriAurinkoV"), IdAurinkoVari = Shader.PropertyToID("_KoriAurinkoVari"),
            IdYlos = Shader.PropertyToID("_KoriYlosV"), IdYla = Shader.PropertyToID("_KoriTaivasYla"), IdAla = Shader.PropertyToID("_KoriTaivasAla"),
            IdValotus = Shader.PropertyToID("_KoriValotus");
        /// <summary>
        /// KORIN VALO KAUPUNGISTA (Linssiseppä 8.10., Päätoimittaja: pallo Unreal-tasolle kohta 1): Ydin KoriValaistus kaupunkinäkymän
        /// vuorokausisävystä ja säästä; suunnat kaupunkikameran näkymäavaruuteen (kori on kuvassa aina samassa paikassa, joten korin
        /// kameran näkymäavaruus = kaupunkikameran). Kori saa myös kaupungin valotuksen ja suotimen, koska sillä ei ole jälkikäsittelyä.
        /// </summary>
        void AsetaValo()
        {
            Vector3 V(double[] c) => new Vector3((float)c[0], (float)c[1], (float)c[2]);
            double[] C(Color c) => new double[] { c.r, c.g, c.b };
            var k = KoriValaistus.Laske(KaupunkiKuva.KoriAurinkoKorkeus, KaupunkiKuva.KoriAtsimuutti, C(KaupunkiKuva.KoriLaki), C(KaupunkiKuva.KoriHorisontti), KaupunkiKuva.Saa.Harmaus);
            var nakyma = perus.worldToCameraMatrix;
            Vector3 aurinko = nakyma.MultiplyVector(new Vector3((float)k.AurinkoX, (float)k.AurinkoY, (float)k.AurinkoZ)).normalized;
            Vector3 ylos = nakyma.MultiplyVector(Vector3.up).normalized;
            Shader.SetGlobalVector(IdAurinko, aurinko);
            Shader.SetGlobalVector(IdYlos, ylos);
            Shader.SetGlobalVector(IdAurinkoVari, V(k.AurinkoVari));
            Shader.SetGlobalVector(IdYla, V(k.TaivasYla));
            Shader.SetGlobalVector(IdAla, V(k.TaivasAla));
            var s = KaupunkiKuva.KoriSuodin; float e = Mathf.Pow(2f, KaupunkiKuva.KoriValotusEV);
            Shader.SetGlobalVector(IdValotus, new Vector4(s.r * e, s.g * e, s.b * e, 1f));
        }

        // POLTIN (Linssiseppä 8.10., pallo Unreal-tasolle kohdat 2 ja 7): Ydin Poltin pystynopeudesta (vain nousussa), lämmin valo
        // korin reunaan ylhäältä (_KoriPoltin) ja liekkikuva hehkuineen kuvan yläreunaan (PalloLiekki).
        readonly Poltin poltin = new Poltin();
        public Poltin Poltin => poltin;
        static readonly int IdPoltin = Shader.PropertyToID("_KoriPoltin"), IdVoima = Shader.PropertyToID("_Voima");
        public const float PoltinValo = 1.6f;
        GameObject liekki; Material liekkiMat;
        void PaivitaPoltin(float dt, float pystyNopeus)
        {
            poltin.Paivita(dt, pystyNopeus);
            float l = (float)poltin.Liekki;
            Shader.SetGlobalVector(IdPoltin, new Vector4(1f, 0.62f, 0.3f, 0f) * (l * PoltinValo));
            if (liekki == null)
            {
                var sh = Shader.Find("Matkakirja/Linssit/PalloLiekki");
                if (sh == null || overlay == null) return;
                liekki = GameObject.CreatePrimitive(PrimitiveType.Quad); Object.Destroy(liekki.GetComponent<Collider>());
                liekki.name = "polttimen liekki"; liekki.layer = Kerros; liekki.transform.SetParent(overlay.transform, false);
                var r = liekki.GetComponent<MeshRenderer>(); r.shadowCastingMode = ShadowCastingMode.Off; r.receiveShadows = false;
                liekkiMat = new Material(sh); r.sharedMaterial = liekkiMat;
            }
            bool nakyy = l > 0.01f;
            if (liekki.activeSelf != nakyy) liekki.SetActive(nakyy);
            if (!nakyy) return;
            // Liekin juuri kuvan yläreunassa keskellä, kieli nousee kuvan ulkopuolelle (kamera katsoo eteen, poltin on yläpuolella).
            const float z = 1.2f;
            float yla = Mathf.Tan(overlay.fieldOfView * 0.5f * Mathf.Deg2Rad) * z, korkeus = yla * 0.7f;
            liekki.transform.localPosition = new Vector3(0f, yla - korkeus * 0.2f, z);
            liekki.transform.localRotation = Quaternion.identity;
            liekki.transform.localScale = new Vector3(korkeus * 1.3f, korkeus, 1f);
            liekkiMat.SetFloat(IdVoima, l);
        }

        void EnnenPiirtoa(ScriptableRenderContext _, Camera c)
        {
            // Korin kamera piirtää ensin (depth perus − 1; suorassa tilassa pinossa perus-kameran jälkeen): asento ja liike sen alussa.
            if (c != overlay || perus == null || juuri == null) return;
            SovitaKooste();
            overlay.aspect = perus.aspect;
            overlay.fieldOfView = perus.fieldOfView;
            if (!Mathf.Approximately(fov, perus.fieldOfView) || !Mathf.Approximately(aspect, perus.aspect))
            { fov = perus.fieldOfView; aspect = perus.aspect; Rakenna(); }
            SovitaMalli();
            AsetaValo();
            float dt = Mathf.Max(Time.unscaledDeltaTime, 1e-3f);
            Vector3 p = perus.transform.position;
            if (historia > 0 && (p - edPaikka).magnitude > HyppyM) historia = 0;   // origon siirto tai siirtymä
            Vector3 v = historia > 0 ? (p - edPaikka) / dt : Vector3.zero;
            Vector3 a = historia > 1 ? (v - edNopeus) / dt : Vector3.zero;
            PaivitaPoltin(dt, historia > 0 ? v.y : 0f);
            kiihtyvyys += (a - kiihtyvyys) * (1 - Mathf.Exp(-dt / KiihtyvyysAikavakioS));
            edPaikka = p; edNopeus = v; historia = Mathf.Min(historia + 1, 2);
            Vector3 eteen = Vector3.ProjectOnPlane(perus.transform.forward, Vector3.up);
            if (eteen.sqrMagnitude < 1e-6f) eteen = Vector3.ProjectOnPlane(perus.transform.up, Vector3.up);
            eteen.Normalize();
            Vector3 oikea = Vector3.Cross(Vector3.up, eteen);
            float aEteen = Vector3.Dot(kiihtyvyys, eteen), aOikea = Vector3.Dot(kiihtyvyys, oikea);
            liike.Paivita(dt, aEteen, aOikea);
            PaivitaKoydet(dt, aOikea, aEteen);
            Aanet(new Vector2(aEteen, aOikea).magnitude, v.y);
            var kKori = Quaternion.Euler((float)liike.Nyokkays, 0, -(float)liike.Kallistus);
            var kKoysi = Quaternion.Euler((float)liike.KoysiNyokkays, 0, -(float)liike.KoysiKallistus);
            koriKaanto.localRotation = kKori; koysiKaanto.localRotation = kKoysi;
            if (malliKori != null) malliKori.localRotation = kKori * malliKoriAlku;
            VasenKoysiNorm = LaskeVasenKoysi();
            for (int i = 0; i < malliKoydet.Count; i++) if (malliKoydet[i] != null) malliKoydet[i].localRotation = kKoysi * malliKoysiAlku[i];
        }
    }
}
