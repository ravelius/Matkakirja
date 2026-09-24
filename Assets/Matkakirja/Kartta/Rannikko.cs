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
    /// RANTAVIIVA VEKTORINA (omistajan löydös 46, erä E1; Fable hyväksyi 3D-selvittäjän suosituksen 24.9.2026): web
    /// piirtää rannat vektorina jokaisessa zoomissa (js/pallovektorit.js), natiivi näytti vain Z8-rasteriin poltetun
    /// rannan, joka lähikuvassa on 5× suurennettu. Tämä kerros piirtää saman aineiston samoilla säännöillä:
    ///
    ///  - AINEISTO: webin GSHHS-sarja ämpärissä (<see cref="Juuri"/>: luettelo.json ja solut &lt;laji&gt;/l&lt;k&gt;/&lt;s_r&gt;.bin,
    ///    viisi tasoa, toleranssit 0,1…0°, tasot 0–1 koko maailma yhtenä tiedostona, 2–4 10°:n soluina). Haku
    ///    Laattapalvelimen kautta (offline-kansio → välimuisti → verkko), joten offline-alue (Alueet) toimii.
    ///  - TASO webin vektoritasolla: matalin taso, jonka toleranssi × tiheys ≤ 0,5 laitepikseliä (tiheys =
    ///    laitepikseliä leveysastetta kohti ruudun keskellä, sama kuin Maarajalla); solut näkyvästä alueesta (7 × 7
    ///    näytettä + horisontin puolitushaku kallistuksessa); ladattu solu harvennetaan webin harvennusportaalla.
    ///  - PIIRTO: Rajaviiva-varjostin, yksi verkko ja piirtokutsu solua kohti, verkot taustasäikeessä
    ///    (<see cref="Vektorisolut.TeeNauha"/>). Leveys Viivaleveys: rannikko 0,8–1,2 pt × Pistekerroin, muste #5a4330
    ///    peitolla 0,58 (web RANTA_MUSTE, RANTA_PEITTO; lineaarisessa sekoituksessa <see cref="PeittoNatiivi"/>), ei
    ///    päätyjatketta (web: läpinäkyvä muste ei saa kasautua).
    ///  - SYVYYS: ZTest LEqual ja syvyysnosto (<see cref="NostoM"/> + <see cref="NostoOsuus"/> × etäisyys) kuten
    ///    Napakansi: viiva on ellipsoidilla (korkeus 0 = ranta myös korkeuskertoimella, max(h, 0)·(k − 1) = 0), karkean
    ///    maastotason virhe ei peitä sitä, mutta vuori kallistetussa kuvassa peittää.
    ///  - JÄRJESTYS: <see cref="Jono"/> 2996 = pelaajan maan kehän (Maaraja 2995) päällä, kuten webissä (korostus
    ///    −0,55 rannikon −0,5 alla), ja reittien, pisteiden ja nimiöiden alla.
    ///  - LIIKE: uusi solu häivytetään sisään 260 ms (ease-out). Tason vaihtuessa vanha taso pysyy, kunnes uuden tason
    ///    näkyvät solut ovat valmiita (web piilottaa vanhan heti), enintään <see cref="VaihdonOdotusSek"/>.
    ///
    /// NÄKYVYYS: karttatilassa päällä. Pois lennon satelliittipinnalla (KarttaKerrokset.SatelliittiLento) ja linssissä,
    /// jolla on oma pohja (KarttaKerrokset.LinssiPaalla), ellei linssi pyydä <see cref="LinssinPaalla"/>. Yleinen
    /// kytkin <see cref="Nakyvissa"/> (linssit, UI), kerros "rannikko" (KarttaKerrokset.Nakyvyys) ja komento
    /// "rannikko pois|paalle|taso &lt;n&gt;|taso auto|tila|syvyys pois|paalle|nosto &lt;m&gt; [osuus]|peitto &lt;a&gt;|oletus"
    /// (Komennot.cs).
    /// </summary>
    public class Rannikko : MonoBehaviour
    {
        /// <summary>Webin PALLOVEKTORIT_VERSIO (js/pallovektorit.js).</summary>
        public const string Versio = "2026-09-21-gshhs";
        /// <summary>Aineiston kansio ämpärissä (ilman juurta).</summary>
        public const string Juuri = "julisteet/pallo/vektorit/" + Versio + "/";
        public const string LuetteloPolku = Juuri + "luettelo.json";
        public const string Laji = "rannikko";
        /// <summary>Web RANTA_MUSTE #5a4330 ja RANTA_PEITTO 0,58.</summary>
        public static readonly Color Muste = new Color32(0x5a, 0x43, 0x30, 0xff);
        public const float Peitto = 0.58f;
        /// <summary>
        /// Peitto natiivin lineaarisessa sekoituksessa (Vektorisolut.LineaarinenPeitto): sama luminanssi kuin webin
        /// sRGB-sekoitus peitolla 0,58 maan ja meren pohjalla (noin 0,74).
        /// </summary>
        public static readonly float PeittoNatiivi = (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, Peitto);
        /// <summary>Piirtojärjestys: Maarajan (2995) päällä, reittien (3000), pisteiden (3001) ja nimiöiden (3005) alla.</summary>
        public const int Jono = 2996;
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

        // ---- Kytkimet (staattiset: linssit, UI ja komennot) ----

        /// <summary>Yleinen kytkin (linssit, UI). Oletus päällä.</summary>
        public static bool Nakyvissa = true;
        /// <summary>Linssi, jolla on oma pohja, haluaa rannikon päälleen (oletus: ei, rannikko väistyy).</summary>
        public static bool LinssinPaalla;
        /// <summary>Komento "rannikko pois|paalle" (mittaukseen).</summary>
        public static bool Sallittu = true;
        /// <summary>Pakotettu taso (komento "rannikko taso &lt;n&gt;"); &lt; 0 = webin sääntö.</summary>
        public static int PakotettuTaso = -1;
        /// <summary>Syvyystesti (LEqual + nosto); false = ZTest Always kuten Maaraja (komento "rannikko syvyys").</summary>
        public static bool Syvyystesti = true;
        /// <summary>Syvyysnosto: vakio metreinä ja osuus etäisyydestä (maaston karkean tason virhe × korkeuskerroin).</summary>
        public static float NostoM = 200f, NostoOsuus = 0.002f;
        /// <summary>Peiton ohitus (komento "rannikko peitto &lt;a&gt;|oletus"); NaN = <see cref="PeittoNatiivi"/>.</summary>
        public static float PeittoOhitus = float.NaN;

        /// <summary>Käytössä oleva peitto (lineaarinen sekoitus).</summary>
        public static float PeittoNyt => PeittoOhitus >= 0f && PeittoOhitus <= 1f ? PeittoOhitus : PeittoNatiivi;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            Nakyvissa = true; LinssinPaalla = false; Sallittu = true; PakotettuTaso = -1; Syvyystesti = true;
            NostoM = 200f; NostoOsuus = 0.002f; PeittoOhitus = float.NaN; Luettelo = null; Instanssi = null;
        }

        /// <summary>Ladattu luettelo (Alueet käyttää offline-polkuihin); null ennen latausta.</summary>
        public static Vektorisolut.Luettelo Luettelo { get; private set; }
        public static Rannikko Instanssi { get; private set; }

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
            public bool Lataa, Tyhja;
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
        bool latausAlkanut, piilossa, nakyiEdella;
        int kello, latauksia, rakennuksia, naytettyTaso = -1;
        float viimePaivitys = -1f, odotusAlku = -1f;
        Vector3 viimeKamera;
        Quaternion viimeKierto;
        int viimeLeveys, viimeKorkeus;
        bool tyotaKesken = true;

        // Mittarit (komento "rannikko tila").
        int taso = -1;
        float tiheys;
        double porras;
        Vektorisolut.Alue alue;
        bool alueOn;
        int tavoitteita, pyyntoja, virheita;
        long ladattuTavuja;
        double rakennusMs, purkuMs;

        static readonly int VariId = Shader.PropertyToID("_BaseColor");

        void Awake() => Instanssi = this;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kerrokset == null) kerrokset = GetComponent<KarttaKerrokset>();
            if (materiaali != null && georeferenssi != null && !latausAlkanut) StartCoroutine(LataaLuettelo());
        }

        void OnDestroy()
        {
            foreach (var s in solut.Values) Vapauta(s, true);
            solut.Clear();
            if (juuri != null) Destroy(juuri);
            if (oma != null) Destroy(oma);
            if (Instanssi == this) Instanssi = null;
        }

        /// <summary>Kerros "rannikko" (KarttaKerrokset.Nakyvyys).</summary>
        public void Nakyvat(bool nakyy) => piilossa = !nakyy;

        /// <summary>Näkyykö kerros juuri nyt, ja jos ei, miksi (tila-komento).</summary>
        public string Syy()
        {
            if (!Sallittu) return "komento pois";
            if (!Nakyvissa) return "Nakyvissa = false";
            if (piilossa) return "kerros rannikko pois";
            if (kerrokset != null && kerrokset.SatelliittiLento) return "lennon satelliittipinta";
            if (kerrokset != null && kerrokset.LinssiPaalla && !LinssinPaalla) return "linssin oma pohja";
            if (Luettelo == null) return "luettelo lataamatta";
            return null;
        }

        IEnumerator LataaLuettelo()
        {
            latausAlkanut = true;
            while (Luettelo == null)
            {
                byte[] tavut = null;
                using (var pyynto = UnityWebRequest.Get(Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + LuetteloPolku)))
                {
                    pyynto.timeout = 30;
                    yield return pyynto.SendWebRequest();
                    if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                    else Debug.LogWarning($"MATKAKIRJA rannikko: luettelo ei latautunut ({pyynto.responseCode} {pyynto.error}), uusi yritys {UusintaSek:0} s");
                }
                if (tavut != null && tavut.Length > 0)
                {
                    Vektorisolut.Luettelo l = null;
                    var tehtava = Task.Run(() => l = Vektorisolut.LueLuettelo(Encoding.UTF8.GetString(Maaraja.Geojson.Pura(tavut))));
                    while (!tehtava.IsCompleted) yield return null;
                    if (tehtava.IsFaulted) Debug.LogError("MATKAKIRJA rannikko: luettelon jäsennys kaatui: " + tehtava.Exception?.GetBaseException());
                    else if (l == null || l.Tasolle(Laji, 0) == null) Debug.LogWarning("MATKAKIRJA rannikko: luettelossa ei rannikkoa");
                    else
                    {
                        Luettelo = l;
                        var tasot = l.Lajit[Laji];
                        var sb = new StringBuilder();
                        foreach (var t in tasot) sb.Append($" l{t.K} tol {t.Tol.ToString(CultureInfo.InvariantCulture)} ({t.Tiedostot.Count} tiedostoa, {t.Pisteita} pistettä)");
                        Debug.Log($"MATKAKIRJA rannikko: luettelo {l.Versio},{sb}");
                        yield break;
                    }
                }
                yield return new WaitForSecondsRealtime(UusintaSek);
            }
        }

        // ---- Kehys ----

        void LateUpdate()
        {
            if (materiaali == null || georeferenssi == null) return;
            bool nakyy = Syy() == null;
            if (juuri == null) Luo();
            if (juuri.activeSelf != nakyy) juuri.SetActive(nakyy);
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
            juuri = new GameObject("Rannikko");
            juuri.transform.SetParent(georeferenssi.transform, false);
            oma = new Material(materiaali) { name = "Rannikko", renderQueue = Jono };
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
            oma.SetFloat("_Paksuus", (float)Viivaleveys.Pt(tiheys, Viivaleveys.RannikkoKaukana, Viivaleveys.RannikkoLahella));
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
            foreach (var s in naytetyt)
            {
                if (s.HaiveAlku < 0f || s.Piirto == null) continue;
                float h = Mathf.Clamp01((nyt - s.HaiveAlku) / HaiveSek);
                if (h >= 1f) { s.HaiveAlku = -1f; s.Piirto.SetPropertyBlock(null); continue; }
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
            int k = PakotettuTaso >= 0 ? Mathf.Min(PakotettuTaso, l.Lodit.Length - 1) : Vektorisolut.ValitseTaso(l.Lodit, tiheys);
            var t = l.Tasolle(Laji, k);
            taso = k;
            porras = Vektorisolut.HarvennusPorras(tiheys);
            double solunPorras = t == null ? 0 : Vektorisolut.SolunPorras(porras, t.Tol);
            double[] matriisi = null;

            tyolista.Clear();
            if (t != null && alueOn)
                foreach (var avain in Vektorisolut.Solut(alue, t.Solu))
                {
                    if (!t.Tiedostot.Contains(avain)) continue;
                    string id = "l" + k + "/" + avain;
                    if (!solut.TryGetValue(id, out var s)) solut[id] = s = new Solu { Id = id, Avain = avain, K = k };
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
                    if (!s.Nakyy && s.Piirto != null) { s.Piirto.enabled = false; s.HaiveAlku = -1f; s.Piirto.SetPropertyBlock(null); }
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
            using (var pyynto = UnityWebRequest.Get(url))
            {
                pyynto.timeout = 30;
                yield return pyynto.SendWebRequest();
                if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                else
                {
                    virheita++;
                    s.VirheAika = Time.unscaledTime;
                    Debug.LogWarning($"MATKAKIRJA rannikko: {s.Id} ei latautunut ({pyynto.responseCode} {pyynto.error})");
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
                var v = Vektorisolut.Pura(Maaraja.Geojson.Pura(tavut));
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
                    if (s.Purku.IsFaulted) { Debug.LogError($"MATKAKIRJA rannikko: {s.Id} purku kaatui: {s.Purku.Exception?.GetBaseException()}"); s.VirheAika = Time.unscaledTime; }
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
                    if (tehtava.IsFaulted) { Debug.LogError($"MATKAKIRJA rannikko: {s.Id} verkko kaatui: {tehtava.Exception?.GetBaseException()}"); continue; }
                    AsetaVerkko(s, tehtava.Result, s.RakennusPorras);
                }
            }
        }

        void AsetaVerkko(Solu s, Vektorisolut.Nauha n, double p)
        {
            if (s.Go == null)
            {
                s.Go = new GameObject("Rannikko " + s.Id);
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
            s.Suodatin.sharedMesh = n.Janoja > 0 ? TeeVerkko(n, s.Id) : null;
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
        };

        static Mesh TeeVerkko(Vektorisolut.Nauha n, string nimi)
        {
            const MeshUpdateFlags Liput = MeshUpdateFlags.DontRecalculateBounds | MeshUpdateFlags.DontValidateIndices
                                          | MeshUpdateFlags.DontNotifyMeshUsers;
            int karkia = n.Janoja * 4, indekseja = n.Janoja * 6;
            var mesh = new Mesh { name = "Rannikko " + nimi };
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

        /// <summary>Tila lokiin (komento "rannikko tila").</summary>
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
                   (PakotettuTaso >= 0 ? " (pakotettu)" : "") + $" tol {tol.ToString("0.####", ic)}°, näytetty l{naytettyTaso}, " +
                   $"tiheys {tiheys.ToString("0.0", ic)} px/°, porras {porras.ToString("0.####", ic)}°, " +
                   $"leveys {Viivaleveys.Pt(tiheys, Viivaleveys.RannikkoKaukana, Viivaleveys.RannikkoLahella).ToString("0.00", ic)} pt × {PalloKierto.Pistekerroin}, " +
                   $"{alueTeksti}, soluja {naytetyt.Count}/{tavoitteita} näkyvissä, {janoja} janaa, " +
                   $"muistissa {viivoja} solua ja {verkkoja} verkkoa, pyyntöjä {pyyntoja} ({ladattuTavuja / 1024} kt, virheitä {virheita}), " +
                   $"purku {purkuMs.ToString("0", ic)} ms, verkot {rakennusMs.ToString("0", ic)} ms (taustasäie), " +
                   $"peitto {PeittoNyt.ToString("0.000", ic)} (web 0,58 sRGB), " +
                   $"syvyys {(Syvyystesti ? $"LEqual, nosto {NostoM.ToString("0", ic)} m + {NostoOsuus.ToString("0.####", ic)} × etäisyys" : "Always")}";
        }

        // ---- Offline (Alueet) ----

        /// <summary>
        /// Offline-alueen tiedostot (ämpärin polkuina): maailmalle luettelo ja kokonaiset tasot, joiden solu on koko
        /// maailma tai jotka ovat pieniä (l0–l2, noin 3 Mt); maalle tarkemmat tasot laatikon soluista. Ilman ladattua
        /// luetteloa vain luettelo (maat saavat solunsa, kun luettelo on ladattu ennen maan latausta).
        /// </summary>
        public static List<string> OfflinePolut(bool maailma, Vektorisolut.Alue? laatikko)
        {
            var polut = new List<string>();
            if (maailma) polut.Add(LuetteloPolku);
            var l = Luettelo;
            if (l == null || !l.Lajit.TryGetValue(Laji, out var tasot)) return polut;
            foreach (var t in tasot)
            {
                bool koko = t.Solu >= 360 || t.K <= 2;
                if (maailma && koko)
                    foreach (var avain in t.Tiedostot) polut.Add(Juuri + Vektorisolut.SolunPolku(Laji, t.K, avain));
                else if (!maailma && !koko && laatikko.HasValue)
                    foreach (var avain in Vektorisolut.Solut(laatikko.Value, t.Solu))
                        if (t.Tiedostot.Contains(avain)) polut.Add(Juuri + Vektorisolut.SolunPolku(Laji, t.K, avain));
            }
            return polut;
        }
    }
}
