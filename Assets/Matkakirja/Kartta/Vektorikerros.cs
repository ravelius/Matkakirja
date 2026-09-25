using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Threading.Tasks;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// VEKTORIKERROS (löydös 46: E1 rannikko, E2 valtioiden rajat): webin pallovektorien solukerros natiivissa. Yhteinen
    /// runko Rannikolle ja Rajoille; kerros antaa lajin, musteen, peiton, leveyden ja katkoviivan. Kuvaus säännöistä
    /// (aineisto, tason valinta, solut, taustasäie, syvyys, häive, tason vaihto) Rannikko.cs:ssä.
    ///
    /// Yhteistä molemmille: luettelo (<see cref="Luettelo"/>, ladataan kerran), syvyystesti ja -nosto
    /// (<see cref="Syvyystesti"/>, <see cref="NostoM"/>, <see cref="NostoOsuus"/>; komennot "rannikko syvyys|nosto")
    /// ja offline-polut (<see cref="OfflinePolut"/>). Näkyvyys: oma kytkin (<see cref="OmaSyy"/>), oma kerros
    /// (KarttaKerrokset), pois lennon satelliittipinnalla ja linssissä, jolla on oma pohja (ellei linssi pyydä).
    /// </summary>
    public abstract class Vektorikerros : MonoBehaviour
    {
        /// <summary>
        /// SARJAN VERSIO YHDEN VAKION TAKANA: oletus on Karttasepän rajakorkeussarja (<see cref="KorkeusVersio"/>, PR #3132:
        /// rajoilla "korkeus": true ja hMin/hMax solukohtaisesti, h = maastoverkon yläraja samalla geoidinollalla kuin
        /// maasto; rannikko kopioitu webin sarjasta sellaisenaan). Fable ilmoitti 25.9. sarjan olevan ämpärissä (1 530
        /// tiedostoa tarkistettu). Webin sarja (<see cref="WebVersio"/>, PALLOVEKTORIT_VERSIO) vertailuun komennolla
        /// "vektorit versio &lt;nimi&gt;|web|oletus" (<see cref="AsetaVersio"/>).
        /// </summary>
        public const string OletusVersio = KorkeusVersio;
        /// <summary>Rajakorkeussarja (tools/maasto/vie-rajakorkeudet.mjs).</summary>
        public const string KorkeusVersio = "2026-09-25-gshhs-korkeus";
        /// <summary>Webin sarja ilman korkeuksia (js/pallovektorit.js PALLOVEKTORIT_VERSIO).</summary>
        public const string WebVersio = "2026-09-21-gshhs";
        /// <summary>Käytössä oleva sarja (ajossa vaihdettava komennolla).</summary>
        public static string Versio { get; private set; } = OletusVersio;
        /// <summary>Aineiston kansio ämpärissä (ilman juurta).</summary>
        public static string Juuri => "julisteet/pallo/vektorit/" + Versio + "/";
        public static string LuetteloPolku => Juuri + "luettelo.json";
        static int versioKierros;

        /// <summary>
        /// Vaihtaa sarjan ajossa (komento "vektorit versio"): luettelo ja kaikki solut ladataan uudelleen uudesta
        /// kansiosta seuraavalla kehyksellä. null tai "oletus" = <see cref="OletusVersio"/>.
        /// </summary>
        public static void AsetaVersio(string nimi)
        {
            nimi = string.IsNullOrEmpty(nimi) || nimi == "oletus" ? OletusVersio : nimi == "web" ? WebVersio : nimi.Trim('/');
            if (nimi == Versio) return;
            Versio = nimi;
            versioKierros++;
            Luettelo = null;
            luetteloHaussa = false;
            Debug.Log("MATKAKIRJA vektorit: versio " + nimi);
        }
        /// <summary>Lajit, joiden solut kuuluvat offline-lataukseen.</summary>
        public static readonly string[] Lajit = { "rannikko", "rajat" };
        public const float HaiveSek = 0.26f;
        /// <summary>Päivitysväli (web VEKTORIT_JARRU_MS).</summary>
        public const float PaivitysSek = 0.06f;
        /// <summary>Muistissa pidettävät solut (web VEKTORIT_SOLUKATTO); näkymättömien verkkojen katto erikseen.</summary>
        public const int SoluKatto = 160, VerkkoKatto = 48;
        public const int LatauksiaKerralla = 6, RakennuksiaKerralla = 4;
        /// <summary>Tason vaihdossa vanhaa tasoa pidetään enintään näin kauan uuden odotuksessa.</summary>
        public const float VaihdonOdotusSek = 1.5f;
        /// <summary>Epäonnistunut solu yritetään uudelleen aikaisintaan tämän jälkeen.</summary>
        public const float UusintaSek = 10f;

        /// <summary>Syvyystesti (LEqual + nosto); false = ZTest Always kuten Maaraja (komento "rannikko syvyys").</summary>
        public static bool Syvyystesti = true;
        /// <summary>Syvyysnosto: vakio metreinä ja osuus etäisyydestä (maaston karkean tason virhe × korkeuskerroin).</summary>
        public static float NostoM = 200f, NostoOsuus = 0.002f;
        /// <summary>Ladattu luettelo (yhteinen kaikille lajeille; Alueet käyttää offline-polkuihin); null ennen latausta.</summary>
        public static Vektorisolut.Luettelo Luettelo { get; private set; }
        static bool luetteloHaussa;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaYhteiset()
        {
            Syvyystesti = true; NostoM = 200f; NostoOsuus = 0.002f; Luettelo = null; luetteloHaussa = false;
            Versio = OletusVersio; versioKierros = 0;
        }

        // ---- Kerroksen omat ----

        /// <summary>Luettelon laji ("rannikko", "rajat").</summary>
        protected abstract string Laji { get; }
        /// <summary>Nimi olioille ja lokiin.</summary>
        protected abstract string Nimi { get; }
        protected abstract int Jono { get; }
        protected abstract Color Muste { get; }
        /// <summary>Peitto lineaarisessa sekoituksessa.</summary>
        public abstract float PeittoNyt { get; }
        protected abstract double LeveysPt(double tiheys);
        /// <summary>Pakotettu taso tai &lt; 0.</summary>
        protected abstract int Pakotettu { get; }
        /// <summary>Oman kytkimen syy olla piilossa tai null.</summary>
        protected abstract string OmaSyy();
        /// <summary>Linssi, jolla on oma pohja, haluaa tämän kerroksen päälleen.</summary>
        protected virtual bool LinssinPaallaOma => false;
        /// <summary>Katkoviiva metreinä (0 = yhtenäinen).</summary>
        protected virtual float KatkoM => 0f;
        protected virtual float ValiM => 0f;
        /// <summary>Pienin ruudun tiheys (px/°), jolla kerros piirretään (web VEKTORIT_RAJAT_PX_ASTE rajoille).</summary>
        protected virtual double MinTiheys => 0;

        /// <summary>Kerros piirtyy juuri nyt (Maaraja väistyy, kun rannikko piirtyy).</summary>
        public bool Piirtyy => Syy() == null && juuri != null && juuri.activeSelf;

        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public KarttaKerrokset kerrokset;
        /// <summary>Rajaviiva-materiaali (sama kuin maakuntien rajoilla ja Maarajalla); tästä tehdään oma kopio.</summary>
        public Material materiaali;

        sealed class Solu
        {
            public string Id, Avain;
            public int K;
            public List<float[]> Viivat;
            public bool Lataa, Tyhja, Korkeus;
            public float VirheAika = -1f;
            public Task<List<float[]>> Purku;
            public Task<Vektorisolut.Nauha> Rakennus;
            public double RakennusPorras = -1, Porras = -1;
            public GameObject Go;
            public MeshFilter Suodatin;
            public MeshRenderer Piirto;
            public int Janoja, Tavuja, Kaytto;
            public bool Nakyy;
            public float HaiveAlku = -1f;
            public bool Verkko => Suodatin != null && Suodatin.sharedMesh != null;
        }

        readonly Dictionary<string, Solu> solut = new Dictionary<string, Solu>(System.StringComparer.Ordinal);
        readonly List<Solu> naytetyt = new List<Solu>();
        readonly List<(double, double)> naytteet = new List<(double, double)>(64);
        readonly List<Solu> tyolista = new List<Solu>();
        GameObject juuri;
        Material oma;
        MaterialPropertyBlock lohko;
        bool piilossa, nakyiEdella;
        int kello, latauksia, rakennuksia, naytettyTaso = -1;
        float viimePaivitys = -1f, odotusAlku = -1f;
        Vector3 viimeKamera;
        Quaternion viimeKierto;
        int viimeLeveys, viimeKorkeus;
        bool tyotaKesken = true;

        // Mittarit (komento "tila").
        int taso = -1;
        float tiheys;
        double porras;
        Vektorisolut.Alue alue;
        bool alueOn;
        int tavoitteita, pyyntoja, virheita;
        long ladattuTavuja;
        double rakennusMs, purkuMs;

        static readonly int VariId = Shader.PropertyToID("_BaseColor");

        protected virtual void Awake() { }

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kerrokset == null) kerrokset = GetComponent<KarttaKerrokset>();
            omaKierros = versioKierros;
        }

        int omaKierros;

        /// <summary>Versio vaihtui: kaikki solut, verkot ja kesken olevat haut pois (luettelo haetaan uudelleen).</summary>
        void Tyhjenna()
        {
            StopAllCoroutines();
            foreach (var s in solut.Values) Vapauta(s, true);
            solut.Clear();
            naytetyt.Clear();
            naytettyTaso = -1;
            odotusAlku = -1f;
            latauksia = 0;
            rakennuksia = 0;
            tyotaKesken = true;
            omaKierros = versioKierros;
        }

        protected virtual void OnDestroy()
        {
            foreach (var s in solut.Values) Vapauta(s, true);
            solut.Clear();
            if (juuri != null) Destroy(juuri);
            if (oma != null) Destroy(oma);
        }

        /// <summary>Oma kerros ("rannikko", "rajat"; KarttaKerrokset.Nakyvyys).</summary>
        public void Nakyvat(bool nakyy) => piilossa = !nakyy;

        /// <summary>Näkyykö kerros juuri nyt, ja jos ei, miksi (tila-komento).</summary>
        public string Syy()
        {
            string omaSyy = OmaSyy();
            if (omaSyy != null) return omaSyy;
            if (piilossa) return "kerros " + Laji + " pois";
            if (kerrokset != null && kerrokset.SatelliittiLento) return "lennon satelliittipinta";
            if (kerrokset != null && kerrokset.LinssiPaalla && !LinssinPaallaOma) return "linssin oma pohja";
            if (Luettelo == null) return "luettelo lataamatta";
            return null;
        }

        IEnumerator LataaLuettelo()
        {
            luetteloHaussa = true;
            int kierros = versioKierros;
            string polku = LuetteloPolku;
            while (Luettelo == null)
            {
                byte[] tavut = null;
                using (var pyynto = UnityWebRequest.Get(Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + polku)))
                {
                    pyynto.timeout = 30;
                    yield return pyynto.SendWebRequest();
                    if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                    else Debug.LogWarning($"MATKAKIRJA vektorit: luettelo ei latautunut ({pyynto.responseCode} {pyynto.error}), uusi yritys {UusintaSek:0} s");
                }
                if (tavut != null && tavut.Length > 0)
                {
                    Vektorisolut.Luettelo l = null;
                    var tehtava = Task.Run(() => l = Vektorisolut.LueLuettelo(Encoding.UTF8.GetString(Maaraja.Geojson.Pura(tavut))));
                    while (!tehtava.IsCompleted) yield return null;
                    if (kierros != versioKierros) yield break; // versio vaihtui kesken: uusi haku hoitaa
                    if (tehtava.IsFaulted) Debug.LogError("MATKAKIRJA vektorit: luettelon jäsennys kaatui: " + tehtava.Exception?.GetBaseException());
                    else if (l == null || l.Lajit.Count == 0) Debug.LogWarning("MATKAKIRJA vektorit: luettelo tyhjä");
                    else
                    {
                        Luettelo = l;
                        var sb = new StringBuilder();
                        foreach (var laji in l.Lajit)
                        {
                            sb.Append($" {laji.Key}:");
                            foreach (var t in laji.Value)
                                sb.Append($" l{t.K} ({t.Tiedostot.Count} tiedostoa, {t.Pisteita} pistettä{(t.Korkeus ? ", korkeus" : "")})");
                        }
                        Debug.Log($"MATKAKIRJA vektorit: luettelo {l.Versio}, lodit {string.Join("/", l.Lodit)};{sb}");
                        luetteloHaussa = false;
                        yield break;
                    }
                }
                yield return new WaitForSecondsRealtime(UusintaSek);
                if (kierros != versioKierros) yield break;
            }
        }

        // ---- Kehys ----

        // LÄMPÖERÄ (PallonLepo): uuden solun häive (0,26 s) jatkuu kameran pysähdyttyä; solujen ja koko kerroksen
        // piilotus on yksittäinen muutos (Muuttui). Latautuvat solut eivät muuta kuvaa ennen kuin niiden verkko näkyy.
        void OnEnable() => PallonLepo.Animoi(Haivyttaa, Laji);
        void OnDisable() => PallonLepo.Poista(Haivyttaa);
        bool Haivyttaa() => haiveKaynnissa && juuri != null && juuri.activeSelf;
        bool haiveKaynnissa;

        void LateUpdate()
        {
            if (materiaali == null || georeferenssi == null) return;
            if (omaKierros != versioKierros) Tyhjenna();
            if (Luettelo == null && !luetteloHaussa) StartCoroutine(LataaLuettelo());
            bool nakyy = Syy() == null;
            if (juuri == null) Luo();
            if (juuri.activeSelf != nakyy) { juuri.SetActive(nakyy); PallonLepo.Muuttui(Laji); }
            // Uudelleen näkyviin: näkyvät solut häivytetään sisään kuten webissä (solu tulee näkyviin → haivyta).
            if (nakyy && !nakyiEdella) foreach (var s in naytetyt) s.HaiveAlku = Time.unscaledTime;
            nakyiEdella = nakyy;
            if (!nakyy) return;

            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (kamera == null) kamera = Camera.main;
            if (kamera == null) return;

            KeraaValmiit();
            if (Time.unscaledTime - viimePaivitys >= PaivitysSek && (tyotaKesken || KameraLiikkui(kamera)))
            {
                viimePaivitys = Time.unscaledTime;
                PaivitaSolut(kamera);
            }
            Materiaali();
            Haiveet();
        }

        void Luo()
        {
            juuri = new GameObject(Nimi);
            juuri.transform.SetParent(georeferenssi.transform, false);
            oma = new Material(materiaali) { name = Nimi, renderQueue = Jono };
            oma.SetFloat("_Jatke", 0f);
            oma.SetFloat("_PieninRengas", 0f);
            oma.SetFloat("_Tiheys", 0f);
            lohko = new MaterialPropertyBlock();
        }

        bool KameraLiikkui(Camera kamera)
        {
            var t = kamera.transform;
            bool liikkui = (t.position - viimeKamera).sqrMagnitude > 1f || Quaternion.Angle(t.rotation, viimeKierto) > 0.01f
                           || Screen.width != viimeLeveys || Screen.height != viimeKorkeus;
            if (liikkui)
            {
                viimeKamera = t.position; viimeKierto = t.rotation;
                viimeLeveys = Screen.width; viimeKorkeus = Screen.height;
            }
            return liikkui;
        }

        void Materiaali()
        {
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            oma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
            oma.SetFloat("_Kerroin", PalloKierto.Pistekerroin);
            oma.SetFloat("_Paksuus", (float)LeveysPt(tiheys));
            oma.SetFloat("_Katko", KatkoM);
            oma.SetFloat("_Vali", ValiM);
            var vari = Muste;
            vari.a = PeittoNyt;
            oma.SetColor(VariId, vari);
            oma.SetFloat("_ZTest", (float)(Syvyystesti ? CompareFunction.LessEqual : CompareFunction.Always));
            oma.SetFloat("_Nosto", Syvyystesti ? NostoM : 0f);
            oma.SetFloat("_NostoOsuus", Syvyystesti ? NostoOsuus : 0f);
        }

        void Haiveet()
        {
            float nyt = Time.unscaledTime;
            haiveKaynnissa = false;
            foreach (var s in naytetyt)
            {
                if (s.HaiveAlku < 0f || s.Piirto == null) continue;
                float h = Mathf.Clamp01((nyt - s.HaiveAlku) / HaiveSek);
                if (h >= 1f) { s.HaiveAlku = -1f; s.Piirto.SetPropertyBlock(null); continue; }
                haiveKaynnissa = true;
                float alfa = 1f - (1f - h) * (1f - h) * (1f - h);
                var vari = Muste;
                vari.a = PeittoNyt * alfa;
                lohko.Clear();
                lohko.SetColor(VariId, vari);
                s.Piirto.SetPropertyBlock(lohko);
            }
        }

        // ---- Solut ----

        void PaivitaSolut(Camera kamera)
        {
            var l = Luettelo;
            kello++;
            tiheys = Pintaosuma.Tiheys(georeferenssi, kamera);
            var keski = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
            double keskiLon = Pintaosuma.Osuma(georeferenssi, kamera, keski, out double klon, out _) ? klon
                : kierto != null ? kierto.pituus : 0.0;
            alueOn = Pintaosuma.NakyvaAlue(georeferenssi, kamera, keskiLon, out alue, naytteet);
            int k = Pakotettu >= 0 ? Mathf.Min(Pakotettu, l.Lodit.Length - 1) : Vektorisolut.ValitseTaso(l.Lodit, tiheys);
            var t = l.Tasolle(Laji, k);
            taso = k;
            porras = Vektorisolut.HarvennusPorras(tiheys);
            double solunPorras = t == null ? 0 : Vektorisolut.SolunPorras(porras, t.Tol);
            double[] matriisi = null;

            tyolista.Clear();
            // Webin VEKTORIT_RAJAT_PX_ASTE: rajat vasta maanäkymästä sisäänpäin (MinTiheys; rannikolla 0).
            if (t != null && alueOn && tiheys >= MinTiheys)
                foreach (var avain in Vektorisolut.Solut(alue, t.Solu))
                {
                    if (!t.Tiedostot.Contains(avain)) continue;
                    string id = "l" + k + "/" + avain;
                    if (!solut.TryGetValue(id, out var s)) solut[id] = s = new Solu { Id = id, Avain = avain, K = k, Korkeus = t.Korkeus };
                    s.Kaytto = kello;
                    tyolista.Add(s);
                }
            tavoitteita = tyolista.Count;

            bool kaikkiValmiina = true;
            tyotaKesken = false;
            foreach (var s in tyolista)
            {
                if (s.Tyhja) continue;
                if (s.Viivat == null)
                {
                    kaikkiValmiina = false;
                    tyotaKesken = true;
                    if (!s.Lataa && s.Purku == null && latauksia < LatauksiaKerralla
                        && (s.VirheAika < 0f || Time.unscaledTime - s.VirheAika >= UusintaSek))
                        StartCoroutine(LataaSolu(s));
                    continue;
                }
                bool oikea = s.Verkko && s.Porras == solunPorras;
                if (!s.Verkko) kaikkiValmiina = false;
                if (oikea) continue;
                tyotaKesken = true;
                if (s.Rakennus != null || rakennuksia >= RakennuksiaKerralla) continue;
                matriisi ??= Matriisi();
                var viivat = s.Viivat;
                double p = solunPorras;
                var m = matriisi;
                s.RakennusPorras = p;
                s.Rakennus = Task.Run(() =>
                {
                    var kello2 = System.Diagnostics.Stopwatch.StartNew();
                    var n = Vektorisolut.TeeNauha(viivat, p, m);
                    lock (this) rakennusMs += kello2.Elapsed.TotalMilliseconds;
                    return n;
                });
                rakennuksia++;
            }

            // Näytettävät: sama taso heti (panoroinnissa uusi solu häivytetään sisään), uusi taso vasta kun sen solut ovat
            // valmiina tai odotus venyy; siihen asti vanha taso pysyy ruudulla.
            bool vaihda = naytettyTaso < 0 || naytettyTaso == k || kaikkiValmiina
                          || (odotusAlku >= 0f && Time.unscaledTime - odotusAlku >= VaihdonOdotusSek) || naytetyt.Count == 0;
            if (vaihda)
            {
                odotusAlku = -1f;
                naytettyTaso = k;
                foreach (var s in naytetyt) s.Nakyy = false;
                foreach (var s in tyolista) if (s.Verkko) s.Nakyy = true;
                foreach (var s in naytetyt)
                    if (!s.Nakyy && s.Piirto != null)
                    {
                        if (s.Piirto.enabled) PallonLepo.Muuttui(Laji);
                        s.Piirto.enabled = false; s.HaiveAlku = -1f; s.Piirto.SetPropertyBlock(null);
                    }
                naytetyt.Clear();
                foreach (var s in tyolista)
                {
                    if (!s.Nakyy) continue;
                    if (!s.Piirto.enabled) { s.Piirto.enabled = true; s.HaiveAlku = Time.unscaledTime; }
                    naytetyt.Add(s);
                }
            }
            else if (odotusAlku < 0f) odotusAlku = Time.unscaledTime;
            if (!vaihda) tyotaKesken = true;
            Karsi();
        }

        /// <summary>ECEF → georeferenssin paikallinen rivi kerrallaan (Vektorisolut.TeeNauha).</summary>
        double[] Matriisi()
        {
            double4x4 m = georeferenssi.ecefToLocalMatrix;
            var a = new double[16];
            for (int r = 0; r < 4; r++)
                for (int c = 0; c < 4; c++) a[r * 4 + c] = m[c][r];
            return a;
        }

        IEnumerator LataaSolu(Solu s)
        {
            s.Lataa = true;
            latauksia++;
            pyyntoja++;
            byte[] tavut = null;
            string url = Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + Juuri + Vektorisolut.SolunPolku(Laji, s.K, s.Avain));
            bool korkeus = s.Korkeus;
            using (var pyynto = UnityWebRequest.Get(url))
            {
                pyynto.timeout = 30;
                yield return pyynto.SendWebRequest();
                if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                else
                {
                    virheita++;
                    s.VirheAika = Time.unscaledTime;
                    Debug.LogWarning($"MATKAKIRJA {Laji}: {s.Id} ei latautunut ({pyynto.responseCode} {pyynto.error})");
                }
            }
            latauksia--;
            s.Lataa = false;
            if (tavut == null) yield break;
            s.Tavuja = tavut.Length;
            ladattuTavuja += tavut.Length;
            s.Purku = Task.Run(() =>
            {
                var kello2 = System.Diagnostics.Stopwatch.StartNew();
                var v = Vektorisolut.Pura(Maaraja.Geojson.Pura(tavut), korkeus);
                lock (this) purkuMs += kello2.Elapsed.TotalMilliseconds;
                return v;
            });
            tyotaKesken = true;
        }

        /// <summary>Valmiit purut ja rakennukset pääsäikeeseen (verkko luodaan vain täällä).</summary>
        void KeraaValmiit()
        {
            foreach (var s in solut.Values)
            {
                if (s.Purku != null && s.Purku.IsCompleted)
                {
                    if (s.Purku.IsFaulted) { Debug.LogError($"MATKAKIRJA {Laji}: {s.Id} purku kaatui: {s.Purku.Exception?.GetBaseException()}"); s.VirheAika = Time.unscaledTime; }
                    else { s.Viivat = s.Purku.Result; s.Tyhja = s.Viivat.Count == 0; }
                    s.Purku = null;
                    tyotaKesken = true;
                }
                if (s.Rakennus != null && s.Rakennus.IsCompleted)
                {
                    rakennuksia--;
                    var tehtava = s.Rakennus;
                    s.Rakennus = null;
                    tyotaKesken = true;
                    if (tehtava.IsFaulted) { Debug.LogError($"MATKAKIRJA {Laji}: {s.Id} verkko kaatui: {tehtava.Exception?.GetBaseException()}"); continue; }
                    AsetaVerkko(s, tehtava.Result, s.RakennusPorras);
                }
            }
        }

        void AsetaVerkko(Solu s, Vektorisolut.Nauha n, double p)
        {
            if (s.Go == null)
            {
                s.Go = new GameObject(Nimi + " " + s.Id);
                s.Go.transform.SetParent(juuri.transform, false);
                s.Suodatin = s.Go.AddComponent<MeshFilter>();
                s.Piirto = s.Go.AddComponent<MeshRenderer>();
                s.Piirto.shadowCastingMode = ShadowCastingMode.Off;
                s.Piirto.receiveShadows = false;
                s.Piirto.lightProbeUsage = LightProbeUsage.Off;
                s.Piirto.reflectionProbeUsage = ReflectionProbeUsage.Off;
                s.Piirto.sharedMaterial = oma;
                s.Piirto.enabled = false; // PaivitaSolut päättää näkyvyyden
            }
            var vanha = s.Suodatin.sharedMesh;
            s.Suodatin.sharedMesh = n.Janoja > 0 ? TeeVerkko(n, Nimi + " " + s.Id) : null;
            if (vanha != null) Destroy(vanha);
            s.Porras = p;
            s.Janoja = n.Janoja;
            if (n.Janoja == 0) s.Tyhja = true;
        }

        static readonly VertexAttributeDescriptor[] Rakenne =
        {
            new VertexAttributeDescriptor(VertexAttribute.Position, VertexAttributeFormat.Float32, 3),
            new VertexAttributeDescriptor(VertexAttribute.TexCoord0, VertexAttributeFormat.Float32, 3),
            new VertexAttributeDescriptor(VertexAttribute.TexCoord1, VertexAttributeFormat.Float32, 2),
            new VertexAttributeDescriptor(VertexAttribute.TexCoord2, VertexAttributeFormat.Float32, 3),
        };

        static Mesh TeeVerkko(Vektorisolut.Nauha n, string nimi)
        {
            const MeshUpdateFlags Liput = MeshUpdateFlags.DontRecalculateBounds | MeshUpdateFlags.DontValidateIndices
                                          | MeshUpdateFlags.DontNotifyMeshUsers;
            int karkia = n.Janoja * 4, indekseja = n.Janoja * 6;
            var mesh = new Mesh { name = nimi };
            mesh.SetVertexBufferParams(karkia, Rakenne);
            mesh.SetVertexBufferData(n.Karjet, 0, 0, karkia * Vektorisolut.KarjenFloatit, 0, Liput);
            mesh.SetIndexBufferParams(indekseja, IndexFormat.UInt32);
            mesh.SetIndexBufferData(n.Kolmiot, 0, 0, indekseja, Liput);
            mesh.subMeshCount = 1;
            mesh.SetSubMesh(0, new SubMeshDescriptor(0, indekseja), Liput);
            // Rajat + 2 km varaa: varjostin levittää nauhan ruudulla ja nostaa syvyyttä kameraa kohti.
            var min = new Vector3(n.MinX, n.MinY, n.MinZ);
            var max = new Vector3(n.MaxX, n.MaxY, n.MaxZ);
            var rajat = new Bounds((min + max) * 0.5f, max - min);
            rajat.Expand(2000f);
            mesh.bounds = rajat;
            mesh.UploadMeshData(true);
            return mesh;
        }

        void Vapauta(Solu s, bool kaikki)
        {
            if (s.Suodatin != null && s.Suodatin.sharedMesh != null)
            {
                var m = s.Suodatin.sharedMesh;
                s.Suodatin.sharedMesh = null;
                Destroy(m);
            }
            if (s.Go != null) { Destroy(s.Go); s.Go = null; s.Suodatin = null; s.Piirto = null; }
            s.Porras = -1;
            s.Janoja = 0;
            s.Nakyy = false;
            if (kaikki) s.Viivat = null;
        }

        /// <summary>LRU: näkymättömät verkot pois yli <see cref="VerkkoKatto"/>:n ja viivat yli <see cref="SoluKatto"/>:n.</summary>
        void Karsi()
        {
            int verkkoja = 0;
            foreach (var s in solut.Values) if (s.Go != null) verkkoja++;
            if (verkkoja <= VerkkoKatto && solut.Count <= SoluKatto) return;
            var ehdokkaat = new List<Solu>();
            foreach (var s in solut.Values)
                if (!s.Nakyy && s.Kaytto != kello && !s.Lataa && s.Purku == null && s.Rakennus == null) ehdokkaat.Add(s);
            ehdokkaat.Sort((a, b) => a.Kaytto.CompareTo(b.Kaytto));
            foreach (var s in ehdokkaat)
            {
                if (verkkoja <= VerkkoKatto) break;
                if (s.Go == null) continue;
                Vapauta(s, false);
                verkkoja--;
            }
            foreach (var s in ehdokkaat)
            {
                if (solut.Count <= SoluKatto) break;
                Vapauta(s, true);
                solut.Remove(s.Id);
            }
        }

        // ---- Mittarit ----

        /// <summary>Tila lokiin (komento "rannikko tila" / "rajat tila").</summary>
        public string Tila()
        {
            int janoja = 0, verkkoja = 0, viivoja = 0;
            foreach (var s in naytetyt) janoja += s.Janoja;
            foreach (var s in solut.Values) { if (s.Go != null) verkkoja++; if (s.Viivat != null) viivoja++; }
            string syy = Syy();
            var ic = CultureInfo.InvariantCulture;
            string alueTeksti = alueOn
                ? $"lat {alue.Lat0.ToString("0.0", ic)}…{alue.Lat1.ToString("0.0", ic)} lon {alue.Lon0.ToString("0.0", ic)}…{alue.Lon1.ToString("0.0", ic)}"
                : "ei aluetta";
            double tol = Luettelo != null && taso >= 0 && taso < Luettelo.Lodit.Length ? Luettelo.Lodit[taso] : double.NaN;
            return $"näkyvissä {(syy == null ? "kyllä" : "ei (" + syy + ")")}, taso l{taso}" +
                   (Pakotettu >= 0 ? " (pakotettu)" : "") + $" tol {tol.ToString("0.####", ic)}°, näytetty l{naytettyTaso}, " +
                   $"tiheys {tiheys.ToString("0.0", ic)} px/°, porras {porras.ToString("0.####", ic)}°, " +
                   $"leveys {LeveysPt(tiheys).ToString("0.00", ic)} pt × {PalloKierto.Pistekerroin}, " +
                   (MinTiheys > 0 ? $"näkyy tiheydestä {MinTiheys.ToString("0", ic)} px/°, " : "") +
                   $"{alueTeksti}, soluja {naytetyt.Count}/{tavoitteita} näkyvissä, {janoja} janaa, " +
                   $"muistissa {viivoja} solua ja {verkkoja} verkkoa, pyyntöjä {pyyntoja} ({ladattuTavuja / 1024} kt, virheitä {virheita}), " +
                   $"purku {purkuMs.ToString("0", ic)} ms, verkot {rakennusMs.ToString("0", ic)} ms (taustasäie), " +
                   $"peitto {PeittoNyt.ToString("0.000", ic)} lineaarisena, " + (KatkoM > 0 ? $"katko {KatkoM.ToString("0", ic)}/{ValiM.ToString("0", ic)} m, " : "") +
                   $"syvyys {(Syvyystesti ? $"LEqual, nosto {NostoM.ToString("0", ic)} m + {NostoOsuus.ToString("0.####", ic)} × etäisyys" : "Always")}";
        }

        // ---- Offline (Alueet) ----

        /// <summary>
        /// Offline-alueen tiedostot (ämpärin polkuina) kaikille <see cref="Lajit"/>-lajeille: maailmalle luettelo ja
        /// kokonaiset tasot, joiden solu on koko maailma tai jotka ovat pieniä (l0–l2, rannikko noin 3 Mt, rajat 0,4 Mt);
        /// maalle tarkemmat tasot laatikon soluista. Ilman ladattua luetteloa vain luettelo.
        /// </summary>
        public static List<string> OfflinePolut(bool maailma, Vektorisolut.Alue? laatikko)
        {
            var polut = new List<string>();
            if (maailma) polut.Add(LuetteloPolku);
            var l = Luettelo;
            if (l == null) return polut;
            foreach (var laji in Lajit)
            {
                if (!l.Lajit.TryGetValue(laji, out var tasot)) continue;
                foreach (var t in tasot)
                {
                    bool koko = t.Solu >= 360 || t.K <= 2;
                    if (maailma && koko)
                        foreach (var avain in t.Tiedostot) polut.Add(Juuri + Vektorisolut.SolunPolku(laji, t.K, avain));
                    else if (!maailma && !koko && laatikko.HasValue)
                        foreach (var avain in Vektorisolut.Solut(laatikko.Value, t.Solu))
                            if (t.Tiedostot.Contains(avain)) polut.Add(Juuri + Vektorisolut.SolunPolku(laji, t.K, avain));
                }
            }
            return polut;
        }
    }
}
