// TÄHTITAIVAAN NÄYTTÄMÖ (Linssiseppä 29.9.2026; logiikka Linssit/Ydin/Taivas/): oma kamera ja oma kerros (11), jonka
// maailman akselit ovat paikallinen horisontti (x itä, y ylös, z pohjoinen). Pallon kamera sammuu linssin ajaksi
// (SyoteLukko.LisaaNakymaPeitto, sama kuin Poikkileikkaus-linssissä), ja pallon eleet on estetty (SyoteLukko.Esta).
//
//   kupu      TaivaanKupu: taivas auringon korkeuden mukaan (Taivaslaskenta.Savy), hämärän kaari auringon puolella, maa
//             horisontin alla (kirjoittaa syvyyden, joten tähdet ja Kuu laskevat sen taakse)
//   tähdet    BSC5 samalla meshillä ja varjostimella kuin ISS:n kyydissä (KyydinTaivas.RakennaTahdet, KyydinTahdet):
//             sarakekierto ECI → horisontti paikallisesta tähtiajasta; näkyvyys auringon korkeudesta
//   Kuu       KyydinKuu (vaihe auringon suunnasta, 0,52°)
//   suunnat   P, I, E, L horisontissa (kartan fontti)
//   ohjaus    veto kääntää katsetta (atsimuutti ja korkeus −5…90°), nipistys tai rulla zoomaa (näkökenttä 25…100°)
//   GYRO      (erä 2) puhelin osoittaa taivaalle: Input Systemin AttitudeSensor (CoreMotion). Kallistus ja korkeus ovat
//             todellisia (painovoima), mutta suunta on suhteellinen: iOS:n asentoanturin kiertokulma on mielivaltainen, eikä
//             Input System tarjoa iOS:llä kompassia. Siksi avaushetken katse (Kuu tai etelä) sidotaan puhelimen sen hetkiseen
//             suuntaan, ja vaakaveto säätää sitä (pelaaja voi kääntää P:n oikeaan pohjoiseen). Pystyveto ei vaikuta gyrossa.
//             Anturi ei vaadi lupaa. Ruudun kierto korjataan (pysty, vaaka vasen/oikea). Ilman anturia (simulaattori, editori)
//             ohjaus on vedolla kuten erässä 1. Testikomento taivas gyro 0|1.
//   POHJOINEN (Päätoimittajan tilaus 29.9.): iOS:llä ensisijaisesti CoreMotion magneettisen pohjoisen kehyksessä
//             (Plugins/iOS/MatkakirjaTaivasAsento.mm, ei sijaintilupaa) + WMM2025-deklinaatio kartalla katsotusta paikasta
//             (Ydin/Taivas/Wmm.cs), joten P osoittaa todelliseen pohjoiseen; vaakaveto jää hienosäädöksi. AttitudeSensor (yllä)
//             on varapolku laitteille, joilla magneettista kehystä ei ole. A/B `taivas gyro kaanteinen` (kvaternio kääntäen).
using System.Collections.Generic;
using Matkakirja.Linssit.Taivas;
using TMPro;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public sealed class TaivasNayttamo : MonoBehaviour, ITaivaanNakyma
    {
        public const int Kerros = 11;
        public const float KuvanKentta = 70f, KenttaMin = 25f, KenttaMax = 100f, KorkeusMin = -5f, KorkeusMax = 90f;
        const float KupuSade = 500f;
        static readonly int IdZeniitti = Shader.PropertyToID("_Zeniitti"), IdHorisontti = Shader.PropertyToID("_Horisontti"),
            IdAurinko = Shader.PropertyToID("_Aurinko"), IdHehku = Shader.PropertyToID("_Hehku"), IdMaa = Shader.PropertyToID("_Maa"),
            IdZWrite = Shader.PropertyToID("_ZWrite"), IdPeitto = Shader.PropertyToID("_Peitto"),
            IdKiertoX = Shader.PropertyToID("_KiertoX"), IdKiertoY = Shader.PropertyToID("_KiertoY"), IdKiertoZ = Shader.PropertyToID("_KiertoZ"),
            IdSuunta = Shader.PropertyToID("_Suunta"), IdKoko = Shader.PropertyToID("_Koko");

        Camera kamera, pallonKamera;
        Material taivasMat, maaMat, tahtiMat, kuuMat;
        Mesh kupuMesh, kuuMesh, tahtiMesh;
        readonly List<GameObject> oliot = new List<GameObject>();
        System.Func<bool> peitto;
        bool auki;
        double lat, lon;
        /// <summary>Katse: atsimuutti pohjoisesta itään ja korkeus (asteina); näkökenttä pystysuunnassa.</summary>
        public float Atsimuutti { get; private set; } = 180f;
        public float Korkeus { get; private set; } = 30f;
        public float Kentta => kamera != null ? kamera.fieldOfView : KuvanKentta;
        /// <summary>Viimeisin tila testikomennolle: auringon ja Kuun korkeus, tähtien näkyvyys.</summary>
        public double AurinkoKorkeus { get; private set; }
        public double KuuKorkeus { get; private set; }
        public double KuuAtsimuutti { get; private set; }
        public double Nakyvyys { get; private set; }
        public bool TahdetValmiit => tahtiMesh != null;

        public static TaivasNayttamo Luo(Camera pallonKamera)
        {
            var go = new GameObject("TaivasNayttamo");
            var n = go.AddComponent<TaivasNayttamo>();
            n.pallonKamera = pallonKamera;
            n.Rakenna();
            return n;
        }

        void Rakenna()
        {
            peitto = () => auki;
            var kg = new GameObject("TaivasKamera");
            kg.transform.SetParent(transform, false);
            kamera = kg.AddComponent<Camera>();
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = Color.black;
            kamera.cullingMask = 1 << Kerros;
            kamera.nearClipPlane = 0.5f;
            kamera.farClipPlane = 2000f;
            kamera.fieldOfView = KuvanKentta;
            kamera.depth = (pallonKamera != null ? pallonKamera.depth : 0f) + 1f;
            kamera.allowHDR = true;
            var data = kamera.GetUniversalAdditionalCameraData();
            data.renderType = CameraRenderType.Base;
            data.renderPostProcessing = false;
            data.renderShadows = false;
            kamera.enabled = false;

            var kupu = Resources.Load<Shader>("Varjostimet/TaivaanKupu");
            taivasMat = new Material(kupu) { name = "TaivaanKupu", renderQueue = (int)RenderQueue.Background };
            maaMat = new Material(kupu) { name = "TaivaanMaa", renderQueue = (int)RenderQueue.Geometry };
            maaMat.SetFloat(IdMaa, 1f);
            maaMat.SetFloat(IdZWrite, 1f);
            kupuMesh = Pallo();
            Olio("Taivas", kupuMesh, taivasMat, KupuSade);
            Olio("Maa", kupuMesh, maaMat, KupuSade * 0.9f);

            tahtiMat = new Material(Resources.Load<Shader>("Varjostimet/KyydinTahdet")) { name = "TaivaanTahdet" };
            kuuMat = new Material(Resources.Load<Shader>("Varjostimet/KyydinKuu")) { name = "TaivaanKuu" };
            kuuMesh = Nelio();
            Olio("Kuu", kuuMesh, kuuMat, 1f);
            StartCoroutine(KyydinTaivas.HaeTahtiLista(lista =>
            {
                if (lista == null || this == null) return;
                tahtiMesh = KyydinTaivas.RakennaTahdet(lista, out _, out _);
                if (tahtiMesh != null) Olio("Tahdet", tahtiMesh, tahtiMat, 1f);
                Debug.Log($"MATKAKIRJA tähtitaivas: {lista.Count} tähteä (BSC5)");
            }));
            Suunnat();
            foreach (var o in oliot) o.SetActive(false);
        }

        GameObject Olio(string nimi, Mesh mesh, Material mat, float skaala)
        {
            var o = new GameObject(nimi) { layer = Kerros };
            o.transform.SetParent(transform, false);
            o.transform.localScale = Vector3.one * skaala;
            o.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = o.AddComponent<MeshRenderer>();
            r.sharedMaterial = mat;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            oliot.Add(o);
            return o;
        }

        void Suunnat()
        {
            var fontti = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.merkit != null ? KarttaKerrokset.Instanssi.merkit.fontti : null;
            var nimet = new[] { ("P", 0f), ("I", 90f), ("E", 180f), ("L", 270f) };
            foreach (var (teksti, az) in nimet)
            {
                var o = new GameObject("Suunta " + teksti) { layer = Kerros };
                o.transform.SetParent(transform, false);
                var t = o.AddComponent<TextMeshPro>();
                if (fontti != null) t.font = fontti;
                t.text = teksti;
                t.fontSize = 60;
                t.alignment = TextAlignmentOptions.Center;
                t.color = new Color(0.93f, 0.86f, 0.62f, 0.9f);
                float r = az * Mathf.Deg2Rad;
                var suunta = new Vector3(Mathf.Sin(r), 0.02f, Mathf.Cos(r));
                o.transform.localPosition = suunta * 300f;
                o.transform.rotation = Quaternion.LookRotation(suunta);
                oliot.Add(o);
            }
        }

        // --- ITaivaanNakyma ------------------------------------------------------------------------------------------

        public void Avaa(double lat, double lon)
        {
            this.lat = lat;
            this.lon = lon;
            auki = true;
            Deklinaatio = Wmm.Deklinaatio(lat, lon, Wmm.Vuosi(System.DateTime.UtcNow));
            foreach (var o in oliot) o.SetActive(true);
            kamera.enabled = true;
            kamera.fieldOfView = KuvanKentta;
            SyoteLukko.LisaaNakymaPeitto(peitto);
            SyoteLukko.Esta(this);
            alkuKatse = true;
            gyroTasattu = Quaternion.identity;
            AsetaGyro(true);
        }

        bool alkuKatse;

        public void Paivita(double jd)
        {
            if (!auki) return;
            double lst = Taivaslaskenta.Lst(jd, lon);
            var (e, u, n) = Taivaslaskenta.Rivit(lat, lst);
            // Sarakkeet: ECI-akseli → maailma (x itä, y ylös, z pohjoinen), kuten KyydinTahdet-varjostin odottaa.
            tahtiMat.SetVector(IdKiertoX, new Vector4((float)e.x, (float)u.x, (float)n.x, 0));
            tahtiMat.SetVector(IdKiertoY, new Vector4((float)e.y, (float)u.y, (float)n.y, 0));
            tahtiMat.SetVector(IdKiertoZ, new Vector4((float)e.z, (float)u.z, (float)n.z, 0));

            var a = Taivaslaskenta.Aurinko(jd, lat, lon);
            var k = Taivaslaskenta.Kuu(jd, lat, lon);
            AurinkoKorkeus = a.Korkeus;
            KuuKorkeus = k.Korkeus;
            KuuAtsimuutti = k.Atsimuutti;
            Nakyvyys = Taivaslaskenta.TahtienNakyvyys(a.Korkeus);
            var aurinko = new Vector3((float)a.Ita, (float)a.Ylos, (float)a.Pohjoinen);
            var (zen, hor) = Taivaslaskenta.Savy(a.Korkeus);
            taivasMat.SetColor(IdZeniitti, new Color((float)zen.r, (float)zen.g, (float)zen.b));
            taivasMat.SetColor(IdHorisontti, new Color((float)hor.r, (float)hor.g, (float)hor.b));
            maaMat.SetColor(IdHorisontti, new Color((float)hor.r, (float)hor.g, (float)hor.b));
            taivasMat.SetVector(IdAurinko, aurinko);
            // Hämärän kaari: vahvimmillaan auringon ollessa horisontissa (−8…+6°).
            float h = (float)a.Korkeus;
            taivasMat.SetFloat(IdHehku, Mathf.Clamp01(1f - Mathf.Abs(h + 1f) / 7f));
            tahtiMat.SetFloat(IdPeitto, (float)Nakyvyys);
            kuuMat.SetVector(IdSuunta, new Vector3((float)k.Ita, (float)k.Ylos, (float)k.Pohjoinen));
            kuuMat.SetVector(IdAurinko, aurinko);
            // Ensimmäinen katse: Kuuhun, jos se on taivaalla, muuten etelään.
            if (alkuKatse)
            {
                alkuKatse = false;
                if (k.Korkeus > 5) { Atsimuutti = (float)k.Atsimuutti; Korkeus = Mathf.Clamp((float)k.Korkeus, 15f, 60f); }
                else { Atsimuutti = lat >= 0 ? 180f : 0f; Korkeus = 30f; }
            }
        }

        public void Sulje()
        {
            AsetaGyro(false);
            auki = false;
            if (kamera != null) kamera.enabled = false;
            foreach (var o in oliot) if (o != null) o.SetActive(false);
            SyoteLukko.PoistaNakymaPeitto(peitto);
            SyoteLukko.Vapauta(this);
        }

        // --- ohjaus ----------------------------------------------------------------------------------------------------

        Vector2? edellinen;
        float? edellinenVali;

        /// <summary>Gyro-ohjaus päällä (AttitudeSensor on käytössä); testikomento taivas gyro 0|1.</summary>
        public bool Gyro { get; private set; }
        /// <summary>Gyro sallittu (A/B-kytkin).</summary>
        public static bool GyroSallittu = true;
        float? gyroSiirto;
        Quaternion gyroTasattu = Quaternion.identity;
        /// <summary>Magneettinen kehys käytössä (natiivi CoreMotion); deklinaatio asteina itään; hienosäätö vaakavedosta.</summary>
        public bool Pohjoinen { get; private set; }
        public double Deklinaatio { get; private set; }
        public static bool Kaanteinen;
        float hienosaato;
        public int Tarkkuus => Pohjoinen ? MatkakirjaTaivas_Tarkkuus() : -2;

#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern bool MatkakirjaTaivas_Aloita();
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern void MatkakirjaTaivas_Lopeta();
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern bool MatkakirjaTaivas_Asento(float[] q);
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern int MatkakirjaTaivas_Tarkkuus();
#else
        static bool MatkakirjaTaivas_Aloita() => false;
        static void MatkakirjaTaivas_Lopeta() { }
        static bool MatkakirjaTaivas_Asento(float[] q) => false;
        static int MatkakirjaTaivas_Tarkkuus() => -2;
#endif
        readonly float[] asento = new float[4];

        static Matkakirja.Linssit.Taivas.Ruutu RuudunAsento() => Screen.orientation switch
        {
            ScreenOrientation.LandscapeLeft => Matkakirja.Linssit.Taivas.Ruutu.VaakaVasen,
            ScreenOrientation.LandscapeRight => Matkakirja.Linssit.Taivas.Ruutu.VaakaOikea,
            ScreenOrientation.PortraitUpsideDown => Matkakirja.Linssit.Taivas.Ruutu.Ylosalaisin,
            _ => Matkakirja.Linssit.Taivas.Ruutu.Pysty,
        };

        /// <summary>Natiivin magneettikehyksen kehys: katse todellisessa horisontissa; false = ei näytettä.</summary>
        bool PohjoinenKehys(float vetoX, float asteitaPx)
        {
            if (!Pohjoinen || !MatkakirjaTaivas_Asento(asento)) return false;
            if (!(asento[0] * asento[0] + asento[1] * asento[1] + asento[2] * asento[2] + asento[3] * asento[3] > 0.5f)) return false;
            hienosaato -= vetoX * asteitaPx;
            var (katse, ylos) = Gyromatikka.Kamera(asento[0], asento[1], asento[2], asento[3], RuudunAsento(), Deklinaatio + hienosaato, Kaanteinen);
            var tavoite = Quaternion.LookRotation(new Vector3((float)katse.Ita, (float)katse.Ylos, (float)katse.Pohjoinen),
                new Vector3((float)ylos.Ita, (float)ylos.Ylos, (float)ylos.Pohjoinen));
            gyroTasattu = gyroTasattu == Quaternion.identity ? tavoite : Quaternion.Slerp(gyroTasattu, tavoite, 1f - Mathf.Exp(-Time.unscaledDeltaTime / 0.06f));
            kamera.transform.localRotation = gyroTasattu;
            Atsimuutti = (float)katse.Atsimuutti;
            Korkeus = (float)katse.Korkeus;
            return true;
        }

        /// <summary>Gyro päälle tai pois (anturi otetaan käyttöön vasta tarvittaessa ja vapautetaan sulkiessa).</summary>
        public void AsetaGyro(bool paalla)
        {
            // Ensisijaisesti magneettinen kehys (todellinen pohjoinen), muuten AttitudeSensor (suhteellinen suunta).
            bool pohjoinen = paalla && GyroSallittu && MatkakirjaTaivas_Aloita();
            if (!pohjoinen && Pohjoinen) MatkakirjaTaivas_Lopeta();
            Pohjoinen = pohjoinen;
            hienosaato = 0f;
            if (pohjoinen) paalla = false;   // AttitudeSensoria ei tarvita
            var anturi = AttitudeSensor.current;
            bool voi = paalla && GyroSallittu && anturi != null;
            if (voi && !anturi.enabled) InputSystem.EnableDevice(anturi);
            if (!voi && anturi != null && anturi.enabled && Gyro) InputSystem.DisableDevice(anturi);
            Gyro = voi || pohjoinen;
            gyroSiirto = null;
        }

        /// <summary>Laitteen asento Unityn kameran kierroksi (iOS: CoreMotion x oikealle, y ylös, z ruudusta ulos) ja ruudun kierto.</summary>
        static Quaternion Laitteesta(Quaternion q)
        {
            var r = Quaternion.Euler(90f, 0f, 0f) * new Quaternion(q.x, q.y, -q.z, -q.w);
            float kierto = Screen.orientation switch
            {
                ScreenOrientation.LandscapeLeft => 90f,
                ScreenOrientation.LandscapeRight => -90f,
                ScreenOrientation.PortraitUpsideDown => 180f,
                _ => 0f,
            };
            return r * Quaternion.Euler(0f, 0f, kierto);
        }

        /// <summary>Gyron kehys: katse laitteen asennosta, suunta sidottu avaushetken katseeseen (gyroSiirto).</summary>
        bool GyroKehys(float vetoX, float asteitaPx)
        {
            if (Pohjoinen) return PohjoinenKehys(vetoX, asteitaPx);
            var anturi = AttitudeSensor.current;
            if (!Gyro || anturi == null) return false;
            var raaka = anturi.attitude.ReadValue();
            // Ennen ensimmäistä näytettä anturi antaa nollan (tai NaN): ohjaus vedolla siihen asti.
            float pituus = raaka.x * raaka.x + raaka.y * raaka.y + raaka.z * raaka.z + raaka.w * raaka.w;
            if (!(pituus > 0.5f)) return false;
            var laite = Laitteesta(raaka);
            float laiteSuunta = laite.eulerAngles.y;
            gyroSiirto ??= Atsimuutti - laiteSuunta;
            // Vaakaveto säätää pohjoista (sormen alla oleva taivas seuraa sormea).
            gyroSiirto -= vetoX * asteitaPx;
            var tavoite = Quaternion.Euler(0f, gyroSiirto.Value, 0f) * laite;
            // Pehmennys: anturin värinä ei näy tähdissä (noin 60 ms:n aikavakio).
            gyroTasattu = gyroTasattu == Quaternion.identity ? tavoite : Quaternion.Slerp(gyroTasattu, tavoite, 1f - Mathf.Exp(-Time.unscaledDeltaTime / 0.06f));
            kamera.transform.localRotation = gyroTasattu;
            var e = gyroTasattu.eulerAngles;
            Atsimuutti = Mathf.Repeat(e.y, 360f);
            Korkeus = Mathf.Clamp(-(e.x > 180f ? e.x - 360f : e.x), -90f, 90f);
            return true;
        }

        void LateUpdate()
        {
            if (!auki || kamera == null) return;
            float kentta = kamera.fieldOfView;
            // Asteita per ruutupiste pystysuunnassa: sormen alla oleva tähti seuraa sormea.
            float asteitaPx = kentta / Mathf.Max(1f, Screen.height);
            var kos = Touchscreen.current;
            int sormia = 0;
            Vector2 p0 = default, p1 = default;
            if (kos != null)
                foreach (var t in kos.touches)
                    if (t.press.isPressed) { if (sormia == 0) p0 = t.position.ReadValue(); else if (sormia == 1) p1 = t.position.ReadValue(); sormia++; }
            var hiiri = Mouse.current;
            if (sormia == 0 && hiiri != null && hiiri.leftButton.isPressed) { sormia = 1; p0 = hiiri.position.ReadValue(); }
            if (hiiri != null && Mathf.Abs(hiiri.scroll.ReadValue().y) > 0.01f)
                kamera.fieldOfView = Mathf.Clamp(kentta * (1f - Mathf.Sign(hiiri.scroll.ReadValue().y) * 0.08f), KenttaMin, KenttaMax);

            if (sormia >= 2)
            {
                float vali = Vector2.Distance(p0, p1);
                if (edellinenVali.HasValue && vali > 1f)
                    kamera.fieldOfView = Mathf.Clamp(kentta * edellinenVali.Value / vali, KenttaMin, KenttaMax);
                edellinenVali = vali;
                edellinen = null;
            }
            float vetoX = 0f;
            if (sormia < 2)
            {
                edellinenVali = null;
                if (sormia == 1)
                {
                    if (edellinen.HasValue)
                    {
                        var d = p0 - edellinen.Value;
                        vetoX = d.x;
                        if (!Gyro)
                        {
                            Atsimuutti = Mathf.Repeat(Atsimuutti - d.x * asteitaPx, 360f);
                            Korkeus = Mathf.Clamp(Korkeus - d.y * asteitaPx, KorkeusMin, KorkeusMax);
                        }
                    }
                    edellinen = p0;
                }
                else edellinen = null;
            }
            if (!GyroKehys(vetoX, asteitaPx))
                kamera.transform.localRotation = Quaternion.Euler(-Korkeus, Atsimuutti, 0f);
            // Kuun kulmasäde todellisena (0,26°); tähtivarjostin laskee koon ruudun pikseleinä.
            kuuMat.SetFloat(IdKoko, Mathf.Tan(0.26f * Mathf.Deg2Rad));
        }

        /// <summary>Katse ja näkökenttä suoraan (testikomento taivas katso az korkeus [kenttä]).</summary>
        public void Katso(float atsimuutti, float korkeus, float? kentta = null)
        {
            Atsimuutti = Mathf.Repeat(atsimuutti, 360f);
            Korkeus = Mathf.Clamp(korkeus, KorkeusMin, KorkeusMax);
            if (kentta.HasValue && kamera != null) kamera.fieldOfView = Mathf.Clamp(kentta.Value, KenttaMin, KenttaMax);
            alkuKatse = false;
            gyroSiirto = null;
        }

        static Mesh Pallo()
        {
            const int S = 48, R = 24;
            var p = new Vector3[(S + 1) * (R + 1)];
            for (int r = 0; r <= R; r++)
                for (int s = 0; s <= S; s++)
                {
                    float th = Mathf.PI * r / R, ph = 2 * Mathf.PI * s / S;
                    p[r * (S + 1) + s] = new Vector3(Mathf.Sin(th) * Mathf.Cos(ph), Mathf.Cos(th), Mathf.Sin(th) * Mathf.Sin(ph));
                }
            var t = new int[S * R * 6];
            int i = 0;
            for (int r = 0; r < R; r++)
                for (int s = 0; s < S; s++)
                {
                    int a = r * (S + 1) + s, b = a + 1, c = a + S + 1, d = c + 1;
                    t[i++] = a; t[i++] = b; t[i++] = c; t[i++] = b; t[i++] = d; t[i++] = c;
                }
            var m = new Mesh { name = "TaivaanKupu", vertices = p, triangles = t };
            m.RecalculateBounds();
            return m;
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "TaivaanKuu" };
            m.vertices = new[] { new Vector3(-1, -1), new Vector3(1, -1), new Vector3(-1, 1), new Vector3(1, 1) };
            m.uv = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(-1, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e9f);
            return m;
        }

        void OnDestroy()
        {
            if (auki) Sulje();
            Destroy(taivasMat); Destroy(maaMat); Destroy(tahtiMat); Destroy(kuuMat);
            Destroy(kupuMesh); Destroy(kuuMesh);
            if (tahtiMesh != null) Destroy(tahtiMesh);
        }
    }
}
