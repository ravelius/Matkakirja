// TÄHTITAIVAAN NÄYTTÄMÖ (Linssiseppä 29.9.2026; logiikka Linssit/Ydin/Taivas/): oma kamera ja oma kerros (11), jonka
// maailman akselit ovat paikallinen horisontti (x itä, y ylös, z pohjoinen). Pallon kamera sammuu linssin ajaksi
// (SyoteLukko.LisaaNakymaPeitto, sama kuin Poikkileikkaus-linssissä), ja pallon eleet on estetty (SyoteLukko.Esta).
//
//   kupu      TaivaanKupu: taivas auringon korkeuden mukaan (Taivaslaskenta.Savy), hämärän kaari auringon puolella, maa
//             horisontin alla (kirjoittaa syvyyden, joten tähdet ja Kuu laskevat sen taakse)
//   tähdet    BSC5 samalla meshillä ja varjostimella kuin ISS:n kyydissä (KyydinTaivas.RakennaTahdet, KyydinTahdet):
//             sarakekierto ECI → horisontti paikallisesta tähtiajasta; näkyvyys auringon korkeudesta
//   Kuu       KyydinKuu (vaihe auringon suunnasta, 0,52°)
//   suunnat   P, I, E, L horisontissa (kartan fontti), oletuksena pois (omistaja 29.9.2026, SuunnatNakyvissa)
//   ERÄ 3     planeetat Merkurius–Saturnus (Ydin/Taivas/Planeetat, JPL) kirkkaina pisteinä nimineen (näkyvät jo hämärässä).
//   WEBIN TÄHTITAIVAS (pelikoodari-tahtitaivas d9a9438a, Päätoimittaja 29.9.): aineisto Resources/Taivas/tahtitaivas.json
//             (1 656 tähteä HR-numeroin, 88 tähdistöä ConstellationLines CC BY 4.0, suomenkieliset nimet). NYT / 1873: valosaaste
//             (suurkaupunki mag 2,5, muut 3,5 ↔ 1873 kaikki 4,5; nyt horisontissa kaupungin kajo), Horation kortti 1873:n
//             ensimmäisellä valinnalla. Napautus sytyttää lähimmän tähdistön (viivat kultaisina, nimi taivaalle, huomio korttiin),
//             seuraava napautus sammuttaa. Livia kysyy: sytyttää tähdistön ja tarjoaa neljä nimeä; oikea +20 tp
//             (PisteetAnnettu → Matka.Kokemus.Anna). Säännöt Ydin/Taivas/TaivaanSaannot.cs, paneeli TaivasPaneeli.cs.
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
        Material taivasMat, maaMat, tahtiMat, kuuMat, viivaMat, planeettaMat;
        Mesh viivaMesh, planeettaMesh;
        TaivasAineisto aineisto;
        GameObject tahtiOlio, viivaOlio;
        TextMeshPro kuvionNimi;
        TaivasPaneeli paneeli;
        Tahdisto sytytetty, liviaKuvio;
        Kysymys kysymys;
        readonly HashSet<string> kysytyt = new HashSet<string>();
        int kysymyksia;
        bool horatioNaytetty;
        double viimeJd = double.NaN, magRaja = 3.5;
        float tilaPaivitetty = -10f;
        int nakyviaTahtia;
        readonly System.Random arpa = new System.Random();
        static readonly int IdKajo = Shader.PropertyToID("_Kajo");
        /// <summary>1873 (valosaasteeton taivas) vai nyt; pelaajan kaupunki (web: suurkaupungin raja); pisteet oikeasta vastauksesta.</summary>
        public bool Vuosi1873 { get; private set; }

        /// <summary>
        /// TÄMÄN ILLAN TAIVAS (Päätoimittaja 30.9.2026, esittelylinssien katselmus: arvioija avaa linssin päivällä ja näki
        /// tyhjän sinisen taivaan): jos aurinko on avaushetkellä yli −6° (päivä tai porvarillinen hämärä), taivas siirretään
        /// samaan iltaan paikalliseen aurinkoaikaan klo 22. Tilarivi kertoo "Tämän illan taivas"; Nyt-vipu palaa todelliseen hetkeen.
        /// </summary>
        public bool Ilta => iltaSiirto > 0;
        double iltaSiirto;   // vuorokausina
        bool iltaPaatos;
        public const double IltaKello = 22.0, IltaRaja = -6.0;

        /// <summary>Siirto (vrk) hetkestä jd paikalliseen aurinkoaikaan IltaKello samana tai seuraavana iltana.</summary>
        public static double IltaanSiirto(double jd, double lon)
        {
            double tunti = ((jd + 0.5 + lon / 360.0) % 1.0 + 1.0) % 1.0 * 24.0;
            double d = IltaKello - tunti;
            if (d < 0) d += 24.0;
            return d / 24.0;
        }
        public string Kaupunki;
        public System.Action<int> PisteetAnnettu;
        public double MagRaja => magRaja;
        public string Sytytetty => sytytetty?.Suomi ?? liviaKuvio?.Suomi;
        readonly List<TextMeshPro> planeettaNimet = new List<TextMeshPro>();
        double planeetatLaskettu = double.NaN;
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
            // Kaikkien pelin kameroiden yläpuolelle: elävän kerroksen kamera (ElavaKerros, maamerkit ja nimet) on pallo + 1, ja
            // samalla syvyydellä sen piirtojärjestys oli satunnainen (Laitetestaaja 1.0.55: Meteora ja Olympos taivaan päällä).
            kamera.depth = (pallonKamera != null ? pallonKamera.depth : 0f) + 10f;
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
            viivaMat = new Material(Resources.Load<Shader>("Varjostimet/TaivaanViivat")) { name = "TaivaanViivat" };
            viivaMat.SetColor("_Vari", new Color(0.94f, 0.89f, 0.76f, 1f));   // web rgba(240, 226, 194, 0.85)
            planeettaMat = new Material(Resources.Load<Shader>("Varjostimet/KyydinTahdet")) { name = "TaivaanPlaneetat" };
            planeettaMesh = Planeettamesh();
            Olio("Planeetat", planeettaMesh, planeettaMat, 1f);
            foreach (var p in Planeetat.Kaikki) planeettaNimet.Add(Nimio(p.Nimi, new Color(1f, 0.93f, 0.78f, 0.95f), 34));
            var ta = Resources.Load<TextAsset>("Taivas/tahtitaivas");
            aineisto = ta != null ? TaivasAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(ta.text)) : new TaivasAineisto();
            tahtiOlio = Olio("Tahdet", null, tahtiMat, 1f);
            viivaOlio = Olio("Kuviot", null, viivaMat, 1f);
            kuvionNimi = Nimio("", new Color(0.94f, 0.89f, 0.76f, 0.95f), 40);
            Debug.Log($"MATKAKIRJA tähtitaivas: {aineisto.Tahdet.Count} tähteä, {aineisto.Tahdistot.Count} tähdistöä");
            if (SuunnatNakyvissa) Suunnat();
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

        TextMeshPro Nimio(string teksti, Color vari, float koko)
        {
            var o = new GameObject("Nimi " + teksti) { layer = Kerros };
            o.transform.SetParent(transform, false);
            var t = o.AddComponent<TextMeshPro>();
            var fontti = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.merkit != null ? KarttaKerrokset.Instanssi.merkit.fontti : null;
            if (fontti != null) t.font = fontti;
            t.text = teksti;
            t.fontSize = koko;
            t.alignment = TextAlignmentOptions.Center;
            t.color = vari;
            t.enabled = false;
            oliot.Add(o);
            return t;
        }

        /// <summary>Tähdet kirkkausrajaan asti (web: valosaaste karsii himmeät) samaksi meshiksi kuin kyydissä.</summary>
        void RakennaTahdet()
        {
            var lista = new List<object>();
            foreach (var t in aineisto.Tahdet)
                if (t.Mag <= magRaja) lista.Add(new List<object> { t.Ra, t.Dec, t.Mag, t.Bv });
            if (tahtiMesh != null) Destroy(tahtiMesh);
            tahtiMesh = lista.Count > 0 ? KyydinTaivas.RakennaTahdet(lista, out _, out _) : null;
            tahtiOlio.GetComponent<MeshFilter>().sharedMesh = tahtiMesh;
        }

        /// <summary>Sytytetyn ja Livian tähdistön viivat (web: vain ne, ei muita): viivajonon peräkkäiset tähdet pareittain.</summary>
        void PaivitaViivat()
        {
            var karjet = new List<Vector3>();
            foreach (var k in new[] { sytytetty, liviaKuvio })
            {
                if (k == null) continue;
                foreach (var jono in k.Viivat)
                    for (int i = 0; i + 1 < jono.Length; i++)
                        if (aineisto.Hr.TryGetValue(jono[i], out var a) && aineisto.Hr.TryGetValue(jono[i + 1], out var b))
                        { karjet.Add(V(a.Eci)); karjet.Add(V(b.Eci)); }
            }
            if (viivaMesh == null) viivaMesh = new Mesh { name = "TaivaanViivat" };
            viivaMesh.Clear();
            viivaMesh.SetVertices(karjet);
            var ind = new int[karjet.Count];
            for (int i = 0; i < ind.Length; i++) ind[i] = i;
            viivaMesh.SetIndices(ind, MeshTopology.Lines, 0);
            viivaMesh.bounds = new Bounds(Vector3.zero, Vector3.one * 1e9f);
            viivaOlio.GetComponent<MeshFilter>().sharedMesh = viivaMesh;
            var k2 = sytytetty ?? liviaKuvio;
            kuvionNimi.text = k2 == null ? "" : liviaKuvio != null && sytytetty == null ? "?" : $"{k2.Suomi}\n<size=70%><i>{k2.Latina}</i></size>";
        }

        // --- NYT / 1873, napautus ja Livian kysymys (web tahtitaivas.js) ----------------------------------------------------------

        /// <summary>Valitsee taivaan: 1873 (raja 4,5) tai nyt (valosaaste); 1873:n ensimmäinen valinta näyttää Horation kortin.</summary>
        public void AsetaVuosi(bool v1873)
        {
            Vuosi1873 = v1873;
            magRaja = aineisto.Kirkkausraja(v1873, Kaupunki);
            RakennaTahdet();
            if (sytytetty != null && !Nakyvat().Exists(n => n.Tahdisto == sytytetty)) Sammuta();
            if (v1873 && !horatioNaytetty && kysymys == null)
            {
                horatioNaytetty = true;
                paneeli?.Nayta("Horatio, Marseille 1873", aineisto.Kortti);
            }
            tilaPaivitetty = -10f;
        }

        List<NakyvaTahdisto> Nakyvat() => double.IsNaN(viimeJd) ? new List<NakyvaTahdisto>() : aineisto.NakyvatTahdistot(lat, lon, viimeJd, magRaja);

        /// <summary>Pallon napautus (ruutupiste, y ylös): lähin näkyvä viivatähti 26 pt:n säteellä sytyttää tähdistön, muuten sammuttaa.</summary>
        public void Napautus(Vector2 ruutu)
        {
            if (kysymys != null) return;
            float sade = 26f * LinssiOhjain.Pistekerroin;
            Tahdisto paras = null;
            float parasD = sade;
            foreach (var n in Nakyvat())
                foreach (var (_, suunta) in n.Pisteet)
                {
                    if (suunta.Korkeus < 0) continue;
                    var sp = kamera.WorldToScreenPoint(transform.TransformPoint(new Vector3((float)suunta.Ita, (float)suunta.Ylos, (float)suunta.Pohjoinen) * 300f));
                    if (sp.z <= 0) continue;
                    float d = Vector2.Distance(ruutu, sp);
                    if (d < parasD) { parasD = d; paras = n.Tahdisto; }
                }
            if (paras == null || paras == sytytetty) { Sammuta(); return; }
            sytytetty = paras;
            liviaKuvio = null;
            PaivitaViivat();
            if (!string.IsNullOrEmpty(paras.Huomio)) paneeli?.Nayta(paras.Suomi, paras.Huomio, paras.Latina);
            else paneeli?.Piilota();
        }

        void Sammuta()
        {
            sytytetty = null;
            liviaKuvio = null;
            PaivitaViivat();
            if (kysymys == null) paneeli?.Piilota();
        }

        /// <summary>Livia kysyy (web arvoKysymys): tähdistö syttyy ilman nimeä, neljä vaihtoehtoa.</summary>
        public void Kysy()
        {
            var k = aineisto.ArvoKysymys(Nakyvat(), kysytyt, kysymyksia, arpa);
            if (k == null) { paneeli?.Nayta("Livia", "Nyt näkyy liian vähän tähdistöjä. Kokeile vuotta 1873, silloin taivas oli täynnä."); return; }
            kysymys = k;
            kysymyksia++;
            sytytetty = null;
            liviaKuvio = k.Oikea.Tahdisto;
            PaivitaViivat();
            paneeli?.Nayta("Livia", k.Teksti, null, k.Vaihtoehdot.ConvertAll(v => v.Suomi));
        }

        public void Vastaa(int i)
        {
            if (kysymys == null || i < 0 || i >= kysymys.Vaihtoehdot.Count) return;
            var k = kysymys;
            bool oikein = k.Vaihtoehdot[i] == k.Oikea.Tahdisto;
            kysytyt.Add(k.Oikea.Tahdisto.Lyhenne);
            string teksti = aineisto.Palaute(oikein, k.Oikea.Tahdisto) + (oikein ? $" +{aineisto.ArvauksenTp} tp" : "");
            paneeli?.Vastaus(i, k.Vaihtoehdot.IndexOf(k.Oikea.Tahdisto), teksti, oikein);
            if (oikein) PisteetAnnettu?.Invoke(aineisto.ArvauksenTp);
            // Vastauksen jälkeen tähdistö saa nimensä taivaalle.
            sytytetty = k.Oikea.Tahdisto;
            liviaKuvio = null;
            kysymys = null;
            PaivitaViivat();
        }

        static Vector3 V((double x, double y, double z) s) => new Vector3((float)s.x, (float)s.y, (float)s.z);

        /// <summary>Planeetat neljän kärjen neliöinä kuten tähdet (KyydinTahdet): koko ja kirkkaus magnitudista, väri planeetasta.</summary>
        static Mesh Planeettamesh()
        {
            int n = Planeetat.Kaikki.Length;
            var paikat = new Vector3[n * 4];
            var uv = new Vector2[n * 4];
            var uv2 = new Vector2[n * 4];
            var varit = new Color32[n * 4];
            var kolmiot = new int[n * 6];
            var kulmat = new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(-1, 1), new Vector2(1, 1) };
            for (int i = 0; i < n; i++)
            {
                var p = Planeetat.Kaikki[i];
                float koko = Mathf.Lerp(2.6f, 5.2f, Mathf.Clamp01((1.5f - p.Magnitudi) / 5.5f));
                for (int c = 0; c < 4; c++)
                {
                    paikat[i * 4 + c] = Vector3.forward;
                    uv[i * 4 + c] = kulmat[c];
                    uv2[i * 4 + c] = new Vector2(koko, KyydinTaivas.Kirkkaus(p.Magnitudi));
                    varit[i * 4 + c] = new Color(p.Vari.r, p.Vari.g, p.Vari.b);
                }
                kolmiot[i * 6] = i * 4; kolmiot[i * 6 + 1] = i * 4 + 2; kolmiot[i * 6 + 2] = i * 4 + 1;
                kolmiot[i * 6 + 3] = i * 4 + 1; kolmiot[i * 6 + 4] = i * 4 + 2; kolmiot[i * 6 + 5] = i * 4 + 3;
            }
            var m = new Mesh { name = "TaivaanPlaneetat", vertices = paikat, uv = uv, uv2 = uv2, colors32 = varit, triangles = kolmiot };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e9f);
            return m;
        }

        readonly Vector3[] planeettaSuunnat = new Vector3[5];

        /// <summary>Planeettojen suunnat hetkeen jd (kerran minuutissa riittää: planeetat liikkuvat taivaalla hitaasti).</summary>
        void PaivitaPlaneetat(double jd)
        {
            if (!double.IsNaN(planeetatLaskettu) && System.Math.Abs(jd - planeetatLaskettu) < 1.0 / 1440) return;
            planeetatLaskettu = jd;
            var paikat = planeettaMesh.vertices;
            for (int i = 0; i < Planeetat.Kaikki.Length; i++)
            {
                var s = V(Planeetat.Paikka(Planeetat.Kaikki[i], jd).Suunta);
                planeettaSuunnat[i] = s;
                for (int c = 0; c < 4; c++) paikat[i * 4 + c] = s;
            }
            planeettaMesh.vertices = paikat;
        }

        /// <summary>Nimiöt horisonttiin nykyisellä kierrolla: näkyvissä vain horisontin yllä, kasvot kameraan päin.</summary>
        void PaivitaNimiot(Vector3 kx, Vector3 ky, Vector3 kz, float kuviot, float planeetat)
        {
            var k = sytytetty ?? liviaKuvio;
            if (k == null) Aseta(kuvionNimi, Vector3.down, 0f, 0f);
            else
            {
                // Nimi tähdistön horisontin yllä olevien tähtien keskelle.
                Vector3 summa = Vector3.zero;
                foreach (var hr in k.Hrt)
                    if (aineisto.Hr.TryGetValue(hr, out var t))
                    {
                        var d = kx * (float)t.Eci.x + ky * (float)t.Eci.y + kz * (float)t.Eci.z;
                        if (d.y > 0) summa += d;
                    }
                Aseta(kuvionNimi, summa.sqrMagnitude > 0 ? summa.normalized : Vector3.down, kuviot, -18f);
            }
            for (int i = 0; i < planeettaNimet.Count; i++)
            {
                var s = planeettaSuunnat[i];
                Aseta(planeettaNimet[i], kx * s.x + ky * s.y + kz * s.z, planeetat, -12f);
            }
        }

        static void Aseta(TextMeshPro t, Vector3 suunta, float peitto, float siirto)
        {
            bool nakyy = peitto > 0.02f && suunta.y > 0.02f;
            if (t.enabled != nakyy) t.enabled = nakyy;
            if (!nakyy) return;
            var d = suunta.normalized;
            // Nimi hieman kohteen alle (siirto ruudun ylösakselin suuntaan), jottei se peitä tähteä tai planeettaa.
            t.transform.localPosition = d * 300f + Vector3.up * (siirto * 0.1f);
            t.transform.localRotation = Quaternion.LookRotation(d);
            var c = t.color; c.a = peitto; t.color = c;
        }

        /// <summary>
        /// Ilmansuuntien kirjaimet P, I, E, L horisontissa. POIS (omistaja 29.9.2026 klo 23.3x, iPad Rooma 1.0.57: "Poista linssiin
        /// kuulumattomat", listassa "yksittäinen I vasemmassa reunassa"): näkymässä on kerrallaan yleensä yksi kirjain, joka näyttää
        /// irralliselta. Näkyviin jäävät tähdet, planeetat nimineen, linssin napit ja tilarivi.
        /// </summary>
        public static bool SuunnatNakyvissa = false;

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
            paneeli = new TaivasPaneeli();
            // Nyt-vipu vie tämän illan taivaalta todelliseen hetkeen (1873 pitää saman illan).
            paneeli.TilaValittu += v => { if (!v) iltaSiirto = 0; AsetaVuosi(v); };
            paneeli.KysyPainettu += Kysy;
            paneeli.VastausValittu += Vastaa;
            paneeli.KorttiSuljettu += () => { if (kysymys != null) { kysymys = null; liviaKuvio = null; PaivitaViivat(); } };
            AsetaVuosi(false);
            iltaSiirto = 0;
            iltaPaatos = true;
        }

        bool alkuKatse;

        public void Paivita(double jd)
        {
            if (!auki) return;
            if (iltaPaatos)
            {
                iltaPaatos = false;
                if (Taivaslaskenta.Aurinko(jd, lat, lon).Korkeus > IltaRaja) iltaSiirto = IltaanSiirto(jd, lon);
                if (iltaSiirto > 0) Debug.Log($"MATKAKIRJA taivas: tämän illan taivas (+{iltaSiirto * 24:0.0} h)");
            }
            jd += iltaSiirto;
            double lst = Taivaslaskenta.Lst(jd, lon);
            var (e, u, n) = Taivaslaskenta.Rivit(lat, lst);
            // Sarakkeet: ECI-akseli → maailma (x itä, y ylös, z pohjoinen), kuten KyydinTahdet-varjostin odottaa.
            var kx = new Vector4((float)e.x, (float)u.x, (float)n.x, 0);
            var ky = new Vector4((float)e.y, (float)u.y, (float)n.y, 0);
            var kz = new Vector4((float)e.z, (float)u.z, (float)n.z, 0);
            foreach (var m in new[] { tahtiMat, viivaMat, planeettaMat })
            {
                m.SetVector(IdKiertoX, kx); m.SetVector(IdKiertoY, ky); m.SetVector(IdKiertoZ, kz);
            }
            PaivitaPlaneetat(jd);

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
            // Sytytetyn tähdistön viivat ja nimi näkyvät myös hämärässä; planeetat näkyvät jo hämärässä (ennen tähtiä).
            float kuviot = Mathf.Max(0.35f, (float)Nakyvyys) * 0.85f;
            viimeJd = jd;
            // Kaupungin kajo horisontissa (valosaaste) nykyajan yössä; 1873 ei kajoa.
            float kajo = Vuosi1873 ? 0f : (float)Nakyvyys * (magRaja <= aineisto.RajaSuurkaupunki ? 1f : 0.55f);
            taivasMat.SetColor(IdKajo, new Color(0.26f, 0.15f, 0.07f) * kajo);
            if (Time.unscaledTime - tilaPaivitetty > 2f) PaivitaTila(jd);
            float planeetat = Mathf.Clamp01((float)Taivaslaskenta.TahtienNakyvyys(a.Korkeus + 5));
            viivaMat.SetFloat(IdPeitto, kuviot);
            planeettaMat.SetFloat(IdPeitto, planeetat);
            PaivitaNimiot(kx, ky, kz, kuviot, planeetat);
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

        void PaivitaTila(double jd)
        {
            tilaPaivitetty = Time.unscaledTime;
            double lst = Taivaslaskenta.Lst(jd, lon);
            int n = 0;
            foreach (var t in aineisto.Tahdet)
                if (t.Mag <= magRaja && Taivaslaskenta.Horisonttiin(t.Eci, lat, lst).Korkeus >= aineisto.HorisontinVara) n++;
            nakyviaTahtia = n;
            var kello = Matkakirja.Linssit.Iss.IssNyt.Kello().AddHours(lon / 15.0 + iltaSiirto * 24.0);   // paikallinen aurinkoaika (web: kaupungin oma aika)
            string paikka = !string.IsNullOrEmpty(Kaupunki) ? char.ToUpper(Kaupunki[0]) + Kaupunki.Substring(1)
                : $"{System.Math.Abs(lat):0.0}° {(lat >= 0 ? "P" : "E")}";
            string hetki = Vuosi1873 ? "1873" : Ilta ? "Tämän illan taivas" : "nyt";
            paneeli?.Tila($"{paikka} · {hetki} · {kello:HH.mm} · {n} tähteä", Vuosi1873);
        }

        public int NakyviaTahtia => nakyviaTahtia;

        public void Sulje()
        {
            paneeli?.Poista();
            paneeli = null;
            kysymys = null;
            sytytetty = liviaKuvio = null;
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
        bool kosketusAlkoi, kosketusUi, liikkui, nipistys;
        Vector2 alkuPiste, viimePiste;
        float alkuAika;

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

            // NAPAUTUS (web: napautus sytyttää tähdistön): lyhyt kosketus ilman liikettä. Kosketus, joka alkaa UI:n päältä
            // (paneeli, vivut, ✕), ei käännä taivasta eikä ole napautus.
            if (sormia > 0 && !kosketusAlkoi)
            {
                kosketusAlkoi = true; kosketusUi = SyoteLukko.Peittaa(p0); alkuPiste = p0; alkuAika = Time.unscaledTime;
                liikkui = false; nipistys = false;
            }
            if (sormia > 0)
            {
                viimePiste = p0;
                if (Vector2.Distance(p0, alkuPiste) > 10f * LinssiOhjain.Pistekerroin) liikkui = true;
                if (sormia >= 2) nipistys = true;
            }
            else if (kosketusAlkoi)
            {
                kosketusAlkoi = false;
                if (!kosketusUi && !liikkui && !nipistys && Time.unscaledTime - alkuAika < 0.5f) Napautus(viimePiste);
            }
            if (kosketusUi) sormia = 0;

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
            Destroy(taivasMat); Destroy(maaMat); Destroy(tahtiMat); Destroy(kuuMat); Destroy(viivaMat); Destroy(planeettaMat);
            if (viivaMesh != null) Destroy(viivaMesh);
            Destroy(planeettaMesh);
            Destroy(kupuMesh); Destroy(kuuMesh);
            if (tahtiMesh != null) Destroy(tahtiMesh);
        }
    }
}
