using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using CesiumForUnity;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using Debug = UnityEngine.Debug;

namespace Matkakirja
{
    /// <summary>
    /// NIMIKERROS (löydös 38, build 11): maakuntien, nykyalueiden, merien ja valtamerten nimet pallolla, painettuina
    /// maahan kuten webin poltetuissa laatoissa. Puhtaat osat (luku, tasovalinta, väistö, tasoon painaminen, aalto)
    /// ovat tiedostossa NimiLadonta.cs; tämä luokka piirtää.
    ///
    /// - Aineisto: kokoelma aluenimet (skeema 1.37); vanhassa paketissa merinimet (1.36) varareittinä, ja jos
    ///   kumpaakaan ei ole, kerros on tyhjä ilman virhettä. Meri, joka on molemmissa, otetaan aluenimistä.
    /// - Piirto: TextMeshPro SDF, yksi materiaali fonttia kohden (ZTest Always kuten Rajaviiva, jotta maaston
    ///   korkeuskerroin ei peitä maahan painettua tekstiä), nimiöt poolissa (enintään <see cref="enintaan"/>).
    ///   Teksti on pinnan tangenttitasossa: koko korkeus_m × leveys_m, kulma rivin kulma. Näkyy vain omilla
    ///   pallotasoillaan (taso kamerakorkeudesta), häivytetään kallistuksessa yli noin 70°:n ja käännetään
    ///   180°, jos se olisi ruudulla ylösalaisin. Merien alla webin aaltomerkki (Rajaviiva-nauha).
    /// - Väistö: yhteinen ruututörmäys <see cref="KaupunkiMerkit.Varaukset"/>: KaupunkiMerkit varaa ensin nostojen
    ///   IKONIT ilman nimiöitä (löydös 50 vaihe 2, web nostot.js:3835–3880: nimiöllisen noston lappu ei ole varaus
    ///   vaan väistää nimiä sovittelussa), sitten kaupunkien pisteet ja nimiöt; tämä kerros lisää omat nimet järjestyksessä
    ///   maakunta/nykyalue > meri > valtameri. Kaupunkien ja nostojen nimet pysyvät omissa piirtäjissään.
    /// - <see cref="Laatikot"/> (webin nimet.laatikot()): ladottujen nimien laatikot, joita Natiivi-UI:n nostojen
    ///   sovittelu väistää; <see cref="LaatikotMuuttuivat"/> herää, kun ne muuttuvat.
    /// - Linssinimet (KarttaKerrokset "linssinimet"): vain merinimet näkyvät linssin aikana.
    /// - Napautus ei osu nimiin (ei törmäyslaatikoita).
    /// Testikomennot (Komennot.cs): nimet paalle|pois|laske|valtameret paalle|pois|siirto &lt;x&gt;.
    /// </summary>
    [DefaultExecutionOrder(50)] // NostoKerroksen (−10) ja KaupunkiMerkitin LateUpdaten jälkeen (ne varaavat ensin)
    public class Nimikerros : MonoBehaviour
    {
        public static Nimikerros Instanssi { get; private set; }

        public CesiumGeoreference georeferenssi;
        public Camera kamera;
        public PalloKierto kierto;
        public KaupunkiMerkit merkit;
        public Nappula nappula;

        [Header("FONTIT (Fable 24.9.2026: Liberation Serif, OFL)")]
        [Tooltip("Maakunnat, nykyalueet ja meret: Liberation Serif Regular SDF. Tyhjä = natiivin nykyinen serif (merkit.fontti, EB Garamond) varafonttina.")]
        public TMP_FontAsset fonttiPysty;
        [Tooltip("Valtameret: Liberation Serif Italic SDF. Tyhjä = pystyfontti TMP:n kursiivityylillä (vino).")]
        public TMP_FontAsset fonttiKursiivi;
        [Tooltip("TextMeshPro/Distance Field Overlay (ZTest Always); Rakennus vie sen käännökseen. Tyhjä = fontin oma varjostin.")]
        public Shader varjostin;
        [Tooltip("Matkakirja/Rajaviiva meren aaltomerkille (väri tulee riviltä).")]
        public Material aaltoMateriaali;

        [Header("Näkyvyys")]
        [Tooltip("Koko kerros (komento nimet paalle|pois, KarttaKerrokset \"aluenimet\").")]
        public bool paalla = true;
        [Tooltip("Valtameret elävinä. Pois oletuksena: pohjasarjassa 2026-09-23a valtameret on poltettu pallotasoille Z1–Z4 " +
                 "(tarkistettu laatasta 2/0/1: TYYNIMERI), joten elävä nimi piirtyisi kahdesti.")]
        public bool valtameret = false;
        [Tooltip("Enintään näin monta nimiötä kerrallaan (pooli).")]
        public int enintaan = 250;
        [Tooltip("Tasovalinta floor(jatkuva + siirto): 0,6 = teksti 0,66–1,32 × webin nimelliskoko.")]
        public float tasoSiirto = 0.6f;
        [Tooltip("Väistön vara laatikon ympärillä, ruutupisteinä.")]
        public float varaPt = 2f;
        [Tooltip("Syttymisen ja sammumisen kesto, s.")]
        public float haiveS = 0.25f;
        [Tooltip("Ladonta levossa näin usein (s); liikkeessä joka kehys.")]
        public float lepoVali = 0.25f;
        [Tooltip("Piirtojärjestys: aluerajojen (Transparent−8) jälkeen, kaupunkipisteiden (Transparent+1) ja nimiöiden (3005) alla.")]
        public int jono = 2995;

        /// <summary>Luettu nimistö (null = ei vielä ladattu).</summary>
        public Nimisto Nimisto { get; private set; }
        /// <summary>Nykyinen pallotaso ja jatkuva taso.</summary>
        public int Taso { get; private set; } = -1;
        public double JatkuvaTaso { get; private set; }
        /// <summary>Viimeisimmän ladonnan näkyvät nimet ja ehdokkaat, sekä ladonnan kesto (ms).</summary>
        public int Naytetty { get; private set; }
        public int Ehdokkaita { get; private set; }
        public float LadontaMs { get; private set; }

        /// <summary>
        /// LADOTTUJEN NIMIEN LAATIKOT (löydös 50 vaihe 2, webin nimet.laatikot() → nostot.sovittele({ nimet })):
        /// viimeisimmän ladonnan näkyvät nimet esteinä nostojen nimiöiden sovittelulle. Ensin
        /// <see cref="KaupunkiLaatikoita"/> kaupunkien laatikkoa (KaupunkiMerkit: kaikkien näkyvien kaupunkien
        /// pisteet, sitten näkyvät nimiöt 4 × 2 pt:n varalla), sitten näytettäviksi ladotut alue-, meri- ja
        /// valtamerinimet (ilman väistön varaa).
        /// Nostojen ikonit eivät ole listassa.
        /// KOORDINAATISTO: ruudun PIKSELIT, origo vasen ALAKULMA, y ylös (kuten Input ja NostoKerros.Nosto.Ruutu);
        /// Rect.xMin/yMin = vasen alakulma. UI Toolkitin paneeliin: kulmat (x, Screen.height − y) →
        /// RuntimePanelUtils.ScreenToPanel, jolloin yMax muuttuu paneelin yläreunaksi. Pisteet = pikselit /
        /// PalloKierto.Pistekerroin. Päivittyy jokaisessa ladonnassa (liikkeessä joka kehys, levossa
        /// <see cref="lepoVali"/> välein); lista on sama olio, jonka sisältö vaihtuu.
        /// </summary>
        public IReadOnlyList<Rect> Laatikot => laatikot;
        /// <summary>Kaupunkien osuus <see cref="Laatikot"/>-listan alusta (loput ovat aluenimiä).</summary>
        public int KaupunkiLaatikoita { get; private set; }
        /// <summary>Herää ladonnan jälkeen, kun <see cref="Laatikot"/> muuttui (ei joka ladonnassa levossa).</summary>
        public event System.Action LaatikotMuuttuivat;

        sealed class Paikka
        {
            public Vector3 keski, oikea, pysty, ylos; // georeferenssin koordinaatit (keski) ja suunnat
            public float puoliL, korkeus, y0, y1;     // metreinä tekstin tasossa
            public float korkeusPx;                   // webin nimelliskoko tällä tasolla (aallon paksuus)
            public readonly Dictionary<int, MeshRenderer> aallot = new Dictionary<int, MeshRenderer>(); // avain kääntö 0/1
        }

        sealed class Rivi
        {
            public Aluenimi nimi;
            public Nimityyli tyyli;
            public string teksti;
            public Color vari;
            public bool kursiivi, meri;
            public readonly Dictionary<int, Paikka> paikat = new Dictionary<int, Paikka>();
            // Tila
            public bool nakyy, kaannetty;
            public int taso = -1;
            public float peitto, alfa;
            public TextMeshPro tmp;
            public int tmpTaso = -1;
            public bool tmpKaannetty;
            public float luonnollinen = -1f; // tekstin leveys em-yksiköinä (fonttikoko 10 = 1 yksikkö)
            public MeshRenderer aalto;
        }

        readonly List<Rivi> rivit = new List<Rivi>();
        readonly List<TextMeshPro> pooli = new List<TextMeshPro>();
        readonly List<NimiLadonta.Ehdokas> ehdokkaat = new List<NimiLadonta.Ehdokas>();
        readonly List<int> ladotut = new List<int>();
        readonly List<Rect> laatikot = new List<Rect>();
        readonly List<Ruutulaatikko> nimiLaatikot = new List<Ruutulaatikko>();
        readonly List<Ruutulaatikko> edellisetLaatikot = new List<Ruutulaatikko>();
        readonly Dictionary<TMP_FontAsset, Material> materiaalit = new Dictionary<TMP_FontAsset, Material>();
        readonly Vector3[] kulmat = new Vector3[4];
        Transform sailio;
        Material aaltoOma;
        MaterialPropertyBlock aaltoLohko;
        int kaytossa;
        float seuraavaLadonta;
        Matrix4x4 edellinenKamera;
        int edellinenTilaAvain = -1;

        static readonly int VariId = Shader.PropertyToID("_BaseColor");
        static readonly int PaksuusId = Shader.PropertyToID("_Paksuus");

        void Awake() => Instanssi = this;
        void OnDestroy() { if (Instanssi == this) Instanssi = null; }

        /// <summary>Vanha kohtaus (ei Rakennus.LuoPallo tämän jälkeen): kerros liitetään kaupunkimerkkien olioon.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Liita()
        {
            if (FindAnyObjectByType<Nimikerros>() != null) return;
            var km = FindAnyObjectByType<KaupunkiMerkit>();
            if (km == null) return;
            km.gameObject.AddComponent<Nimikerros>().merkit = km;
            Debug.Log("MATKAKIRJA nimet: kerros liitetty ajossa (kohtaus ilman Nimikerrosta)");
        }

        void Start()
        {
            if (merkit == null) merkit = GetComponent<KaupunkiMerkit>();
            if (merkit == null) merkit = FindAnyObjectByType<KaupunkiMerkit>();
            if (georeferenssi == null) georeferenssi = merkit != null ? merkit.georeferenssi : GetComponent<CesiumGeoreference>();
            if (kierto == null) kierto = merkit != null ? merkit.kierto : FindAnyObjectByType<PalloKierto>();
            if (kamera == null) kamera = merkit != null && merkit.kamera != null ? merkit.kamera : Camera.main;
            if (nappula == null && KarttaKerrokset.Instanssi != null) nappula = KarttaKerrokset.Instanssi.nappula;
            if (varjostin == null) varjostin = Shader.Find("TextMeshPro/Distance Field Overlay");
            if (aaltoMateriaali == null && KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.maakunnat != null)
                aaltoMateriaali = KarttaKerrokset.Instanssi.maakunnat.rajaMateriaali;
            if (georeferenssi == null || kamera == null || kierto == null)
            {
                Debug.LogWarning("MATKAKIRJA nimet: georeferenssi, kamera tai kierto puuttuu, kerros pois");
                enabled = false;
                return;
            }
            sailio = new GameObject("Aluenimet").transform;
            sailio.SetParent(georeferenssi.transform, false);
            StartCoroutine(Lataa());
        }

        TMP_FontAsset Pysty => fonttiPysty != null ? fonttiPysty : merkit != null ? merkit.fontti : null;
        TMP_FontAsset Kursiivi => fonttiKursiivi != null ? fonttiKursiivi : Pysty;

        IEnumerator Lataa()
        {
            string alue = null, meri = null;
            yield return Sisalto.HaeTeksti("aluenimet", t => alue = t, true);
            Nimisto n = null;
            yield return Jasenna(alue, null, x => n = x);
            // Vanha paketti (ei aluenimiä tai niissä ei meriä): merinimet.json varareittinä, aluenimet voittaa.
            if (n == null || !n.Nimet.Exists(r => r.Luokka == "meri"))
            {
                yield return Sisalto.HaeTeksti("merinimet", t => meri = t, true);
                if (meri != null) yield return Jasenna(alue, meri, x => n = x);
            }
            if (n == null || n.Nimet.Count == 0)
            {
                Debug.Log("MATKAKIRJA nimet: ei aluenimiä eikä merinimiä paketissa, kerros tyhjä");
                yield break;
            }
            Rakenna(n);
            Debug.Log($"MATKAKIRJA nimet: {rivit.Count} nimeä (aluenimet {n.Aluenimia}, merinimet {n.Merinimia}), " +
                      $"ylin taso {n.YlinTaso}, fontti {Pysty?.name ?? "?"} / {(fonttiKursiivi != null ? fonttiKursiivi.name : "vino " + (Pysty?.name ?? "?"))}" +
                      (n.Ohitetut.Count > 0 ? $", ohitettu {n.Ohitetut.Count}: {string.Join("; ", n.Ohitetut)}" : ""));
            StartCoroutine(Esilammita());
        }

        static IEnumerator Jasenna(string alue, string meri, System.Action<Nimisto> valmis)
        {
            if (alue == null && meri == null) { valmis(null); yield break; }
            var t = Task.Run(() => Nimisto.Lue(alue, meri));
            while (!t.IsCompleted) yield return null;
            if (t.IsFaulted)
            {
                Debug.LogError("MATKAKIRJA nimet: jäsennys epäonnistui: " + t.Exception?.GetBaseException().Message);
                valmis(null);
            }
            else valmis(t.Result);
        }

        void Rakenna(Nimisto n)
        {
            Nimisto = n;
            rivit.Clear();
            var alfat = new SortedDictionary<string, string>();
            foreach (var r in n.Nimet)
            {
                var tyyli = n.Tyyli(r);
                var v = NimiLadonta.Vari(tyyli, r.Muste);
                // Lineaarinen väriavaruus: alfa webin sRGB-sekoituksen vastineeksi (NimiLadonta.LineaarinenAlfa).
                double alfa = NimiLadonta.LineaarinenAlfa(v, v[3], NimiLadonta.Pohja(r.Luokka));
                alfat[(r.Tyyli ?? r.Luokka) + (r.Muste != null ? ":" + r.Muste : "")] = $"{v[3]:0.00}→{alfa:0.00}";
                rivit.Add(new Rivi
                {
                    nimi = r,
                    tyyli = tyyli,
                    teksti = NimiLadonta.Muotoile(r.Teksti, tyyli?.Versaali ?? true, tyyli?.Pienkapiteeli ?? 0),
                    vari = new Color((float)v[0], (float)v[1], (float)v[2], (float)alfa),
                    kursiivi = tyyli?.Kursiivi ?? r.Luokka == "valtameri",
                    meri = r.Luokka == "meri",
                });
            }
            var sb = new StringBuilder("MATKAKIRJA nimet: alfa lineaariseen sekoitukseen");
            foreach (var p in alfat) sb.Append(' ').Append(p.Key).Append(' ').Append(p.Value);
            Debug.Log(sb.ToString());
        }

        /// <summary>Fonttien merkit atlakseen levossa (12 merkkiä kehyksessä), ei ensimmäisellä näytöllä.</summary>
        IEnumerator Esilammita()
        {
            var merkkeja = new HashSet<char>();
            foreach (var r in rivit) foreach (char c in r.nimi.Teksti) { merkkeja.Add(char.ToUpperInvariant(c)); merkkeja.Add(c); }
            var jono = new StringBuilder();
            foreach (char c in merkkeja) jono.Append(c);
            string kaikki = jono.ToString();
            foreach (var fa in new[] { Pysty, Kursiivi })
            {
                if (fa == null || fa.atlasPopulationMode != AtlasPopulationMode.Dynamic) continue;
                for (int i = 0; i < kaikki.Length; i += 12)
                {
                    fa.TryAddCharacters(kaikki.Substring(i, Mathf.Min(12, kaikki.Length - i)), out _);
                    yield return null;
                }
            }
        }

        Material Materiaali(TMP_FontAsset fa)
        {
            if (fa == null) return null;
            if (materiaalit.TryGetValue(fa, out var m)) return m;
            m = new Material(fa.material) { name = fa.name + " (aluenimet)" };
            if (varjostin != null) m.shader = varjostin;
            m.renderQueue = jono;
            materiaalit[fa] = m;
            return m;
        }

        /// <summary>Rivin paikka tasolla (georeferenssin koordinaateissa), laskettu kerran.</summary>
        Paikka HaePaikka(Rivi r, int taso)
        {
            if (r.paikat.TryGetValue(taso, out var p)) return p;
            if (!r.nimi.Paikat.TryGetValue(taso, out var np)) return null;
            var t = NimiLadonta.PinnanTaso(np.Lat, np.Lon, r.nimi.Kulma);
            Vector3 U(V3 v) => (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(new double3(v.X, v.Y, v.Z));
            Vector3 S(V3 v) => ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(v.X, v.Y, v.Z))).normalized;
            var ala = NimiLadonta.NimenAla(np.LeveysM, np.KorkeusM, r.meri ? r.tyyli?.Aalto : null);
            double px = 0;
            r.tyyli?.KootPx.TryGetValue(taso - NimiLadonta.PallotasoEro, out px);
            p = new Paikka
            {
                keski = U(t.Keski), oikea = S(t.Oikea), pysty = S(t.Pysty), ylos = S(t.Ylos),
                puoliL = (float)(0.5 * np.LeveysM), korkeus = (float)np.KorkeusM,
                y0 = (float)ala.Y0, y1 = (float)ala.Y1, korkeusPx = (float)px,
            };
            r.paikat[taso] = p;
            return p;
        }

        void LateUpdate()
        {
            // Ilman nimistöä ladotaan silti: kaupunkien laatikot (Laatikot) tarvitaan nostojen sovitteluun.
            if (kamera == null || kierto == null) return;
            var ll = KarttaKerrokset.Instanssi;
            bool linssi = ll != null && ll.Linssinimet;
            bool lento = nappula != null && nappula.Vaihe != LennonVaihe.Ei;
            bool peli = merkit == null || (merkit.merkitNakyvat && merkit.nimiotNakyvat);
            bool nakyva = paalla && !PalloKierto.PorttiSumea && !lento && (linssi || peli);
            int tilaAvain = (nakyva ? 1 : 0) | (linssi ? 2 : 0) | (valtameret ? 4 : 0);

            float kerroin = PalloKierto.Pistekerroin;
            JatkuvaTaso = NimiLadonta.JatkuvaTaso(kierto.korkeus, kamera.fieldOfView, Screen.height / kerroin);
            int taso = NimiLadonta.ValitseTaso(JatkuvaTaso, Taso, tasoSiirto);
            bool tasoVaihtui = taso != Taso;
            Taso = taso;

            var km = kamera.transform.localToWorldMatrix;
            bool liikkui = km != edellinenKamera;
            edellinenKamera = km;
            if (liikkui || tasoVaihtui || tilaAvain != edellinenTilaAvain || Time.unscaledTime >= seuraavaLadonta)
            {
                edellinenTilaAvain = tilaAvain;
                seuraavaLadonta = Time.unscaledTime + lepoVali;
                Lado(nakyva, linssi, kerroin);
            }
            else if (merkit != null)
            {
                // Pidä yhteiset varaukset ajan tasalla myös ladontojen välissä (muut lukijat samassa kehyksessä).
                merkit.Varaukset.Varmista(Time.frameCount);
            }
            Piirra();
        }

        bool Sallittu(Rivi r, bool linssi) =>
            linssi ? r.meri || (valtameret && r.nimi.Luokka == "valtameri")
                   : valtameret || r.nimi.Luokka != "valtameri";

        void Lado(bool nakyva, bool linssi, float kerroin)
        {
            var kello = Stopwatch.StartNew();
            var varaukset = merkit != null ? merkit.Varaukset : omat;
            bool aloitettu = varaukset.Kehys == Time.frameCount;
            varaukset.Varmista(Time.frameCount);
            // Nostot: vain IKONIT (löydös 50 vaihe 2, web nostot.js KIINTEÄ MUSTE ON NIMILADONNAN VARAUS, LIIKKUVA EI).
            // KaupunkiMerkit varaa ne ennen kaupunkeja (web nostot.paivita → nimet.lado); jos kaupunkikerros ei
            // aloittanut kehystä, ikonit varataan tässä. Nimiö ei varaa: Natiivi-UI:n sovittelu väistää Laatikot.
            // Nimibudjettia ei vähennetä nimiöllisillä nostoilla kuten webissä (HTML_MERKKIEN_KATTO − pelia −
            // nimiollisia), koska natiivissa ei ole yhteistä merkkikattoa: aluenimiä rajaa vain pooli (enintaan).
            // Poltettuja nostoja ei natiivissa ole (web varaa niiden koko musteen).
            int ikoneita;
            if (merkit != null && aloitettu) ikoneita = merkit.NostoIkoneita;
            else ikoneita = NostoKerros.Instanssi != null ? NostoKerros.Instanssi.VaraaIkonit(varaukset, kerroin) : 0;
            int kaupunkeja = varaukset.Maara;
            ehdokkaat.Clear();
            var gt = georeferenssi.transform;
            Vector3 kameraPaikka = kamera.transform.position;
            if (nakyva)
            {
                for (int i = 0; i < rivit.Count; i++)
                {
                    var r = rivit[i];
                    r.peitto = 0;
                    if (!Sallittu(r, linssi)) continue;
                    int rt = NimiLadonta.RivinTaso(r.nimi.Tasot, Taso, Nimisto.YlinTaso);
                    if (rt < 0) continue;
                    var p = HaePaikka(r, rt);
                    if (p == null) continue;
                    Vector3 keski = gt.TransformPoint(p.keski);
                    Vector3 kohti = kameraPaikka - keski;
                    float etaisyys = kohti.magnitude;
                    Vector3 ylos = gt.TransformDirection(p.ylos);
                    float kulma = Mathf.Acos(Mathf.Clamp(Vector3.Dot(ylos, kohti / Mathf.Max(1f, etaisyys)), -1f, 1f)) * Mathf.Rad2Deg;
                    float peitto = (float)NimiLadonta.KallistusPeitto(kulma);
                    if (peitto <= 0.01f) continue;
                    Vector3 oikea = gt.TransformDirection(p.oikea), pysty = gt.TransformDirection(p.pysty);
                    // Lukusuunta ruudulla (kääntö 180°, jos nimi olisi ylösalaisin).
                    Vector3 k0 = kamera.WorldToScreenPoint(keski), k1 = kamera.WorldToScreenPoint(keski + oikea * p.puoliL);
                    if (k0.z <= 0f || k1.z <= 0f) continue;
                    bool kaannetty = NimiLadonta.Kaannetty(r.taso == rt && r.kaannetty, k1.x - k0.x, k1.y - k0.y);
                    // Käännetyssä nimessä tekstin akselit ovat −oikea ja −pysty (aalto on silloinkin tekstin alla).
                    float s = kaannetty ? -1f : 1f;
                    Vector3 o = oikea * s, y = pysty * s;
                    float yA = p.y0, yB = p.y1;
                    kulmat[0] = keski + o * -p.puoliL + y * yA;
                    kulmat[1] = keski + o * p.puoliL + y * yA;
                    kulmat[2] = keski + o * -p.puoliL + y * yB;
                    kulmat[3] = keski + o * p.puoliL + y * yB;
                    float x0 = float.MaxValue, y0 = float.MaxValue, x1 = float.MinValue, y1 = float.MinValue;
                    bool takana = false;
                    for (int k = 0; k < 4; k++)
                    {
                        var q = kamera.WorldToScreenPoint(kulmat[k]);
                        if (q.z <= 0f) { takana = true; break; }
                        x0 = Mathf.Min(x0, q.x); x1 = Mathf.Max(x1, q.x);
                        y0 = Mathf.Min(y0, q.y); y1 = Mathf.Max(y1, q.y);
                    }
                    if (takana) continue;
                    r.taso = rt;
                    r.kaannetty = kaannetty;
                    r.peitto = peitto;
                    ehdokkaat.Add(new NimiLadonta.Ehdokas
                    {
                        Indeksi = i, Porras = r.nimi.Porras, Edellinen = r.nakyy, Koko = p.korkeus / Mathf.Max(1f, etaisyys),
                        Laatikko = new Ruutulaatikko(x0, y0, x1, y1),
                    });
                }
            }
            Ehdokkaita = ehdokkaat.Count;
            NimiLadonta.Lado(ehdokkaat, varaukset, new Ruutulaatikko(0, 0, Screen.width, Screen.height), varaPt * kerroin, ladotut);
            foreach (var r in rivit) r.nakyy = false;
            foreach (int i in ladotut) rivit[i].nakyy = true;
            Naytetty = ladotut.Count;
            PaivitaLaatikot(varaukset, ikoneita, kaupunkeja);
            LadontaMs = (float)kello.Elapsed.TotalMilliseconds;
        }

        /// <summary>Laatikot tästä ladonnasta; tapahtuma vain, jos sisältö muuttui.</summary>
        void PaivitaLaatikot(Ruutuvaraukset varaukset, int ikoneita, int kaupunkeja)
        {
            NimiLadonta.NimienLaatikot(varaukset.Laatikot, ikoneita, kaupunkeja, ehdokkaat, ladotut, nimiLaatikot);
            int kk = Mathf.Clamp(kaupunkeja - ikoneita, 0, nimiLaatikot.Count);
            bool muuttui = kk != KaupunkiLaatikoita || !NimiLadonta.Samat(nimiLaatikot, edellisetLaatikot);
            if (!muuttui) return;
            KaupunkiLaatikoita = kk;
            edellisetLaatikot.Clear();
            edellisetLaatikot.AddRange(nimiLaatikot);
            laatikot.Clear();
            foreach (var l in nimiLaatikot) laatikot.Add(Rect.MinMaxRect(l.X0, l.Y0, l.X1, l.Y1));
            LaatikotMuuttuivat?.Invoke();
        }

        readonly Ruutuvaraukset omat = new Ruutuvaraukset();

        void Piirra()
        {
            float askel = haiveS > 0f ? Time.unscaledDeltaTime / haiveS : 1f;
            bool aaltoja = false;
            for (int i = 0; i < rivit.Count; i++)
            {
                var r = rivit[i];
                float tavoite = r.nakyy ? r.peitto : 0f;
                float a = Mathf.MoveTowards(r.alfa, tavoite, askel);
                if (a <= 0f)
                {
                    r.alfa = 0f;
                    Vapauta(r);
                    continue;
                }
                if (r.tmp == null && !Varaa(r)) { r.alfa = 0f; continue; }
                bool muuttui = a != r.alfa;
                r.alfa = a;
                if (r.tmpTaso != r.taso || r.tmpKaannetty != r.kaannetty) Aseta(r);
                if (muuttui || !r.tmp.enabled)
                {
                    var v = r.vari;
                    v.a *= a;
                    r.tmp.color = v;
                    if (!r.tmp.enabled) r.tmp.enabled = true;
                }
                if (r.meri && r.tyyli?.Aalto != null) aaltoja |= AsetaAalto(r, a);
            }
            if (aaltoja && aaltoOma != null)
            {
                double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
                aaltoOma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
            }
        }

        bool Varaa(Rivi r)
        {
            if (r.taso < 0) return false;
            TextMeshPro t;
            if (pooli.Count > 0) { t = pooli[pooli.Count - 1]; pooli.RemoveAt(pooli.Count - 1); }
            else
            {
                if (kaytossa >= enintaan) return false;
                t = new GameObject("Aluenimi").AddComponent<TextMeshPro>();
                t.transform.SetParent(sailio, false);
                t.alignment = TextAlignmentOptions.Midline;
                t.textWrappingMode = TextWrappingModes.NoWrap;
                t.richText = true;
                t.raycastTarget = false;
                t.fontSize = 10f; // 3D-tekstin fonttikoko 10 = 1 yksikkö/em; mittakaava = korkeus_m
                t.rectTransform.pivot = new Vector2(0.5f, 0.5f);
                t.rectTransform.sizeDelta = new Vector2(60f, 3f);
                var mr = t.GetComponent<MeshRenderer>();
                mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                mr.receiveShadows = false;
            }
            kaytossa++;
            var fa = r.kursiivi ? Kursiivi : Pysty;
            t.font = fa;
            t.fontSharedMaterial = Materiaali(fa);
            t.fontStyle = r.kursiivi && fonttiKursiivi == null ? FontStyles.Italic : FontStyles.Normal;
            t.characterSpacing = (float)((r.tyyli?.HarvennusEm ?? 0.32) * 100.0); // TMP: em/100
            t.text = r.teksti;
            t.enabled = false;
            t.gameObject.name = "Aluenimi " + r.nimi.Id;
            r.tmp = t;
            r.tmpTaso = -1;
            if (r.luonnollinen < 0f)
            {
                t.transform.localScale = Vector3.one;
                r.luonnollinen = Mathf.Max(0.1f, t.GetPreferredValues(r.teksti).x);
            }
            return true;
        }

        void Vapauta(Rivi r)
        {
            if (r.aalto != null) { r.aalto.enabled = false; r.aalto = null; }
            if (r.tmp == null) return;
            r.tmp.enabled = false;
            pooli.Add(r.tmp);
            r.tmp = null;
            r.tmpTaso = -1;
            kaytossa--;
        }

        /// <summary>Nimiön paikka, asento ja koko tasolle: pinnan tangenttitasossa, em = korkeus_m, leveys = leveys_m.</summary>
        void Aseta(Rivi r)
        {
            var p = HaePaikka(r, r.taso);
            if (p == null) return;
            float s = r.kaannetty ? -1f : 1f;
            var t = r.tmp.transform;
            t.localPosition = p.keski;
            // Etupuoli (−Z) ylöspäin: katse maahan (forward = −ylös), kirjainten yläpää = pysty (käännettynä −pysty).
            t.localRotation = Quaternion.LookRotation(-p.ylos, p.pysty * s);
            float xk = Mathf.Clamp(2f * p.puoliL / (r.luonnollinen * p.korkeus), 0.5f, 2f);
            t.localScale = new Vector3(p.korkeus * xk, p.korkeus, p.korkeus);
            r.tmpTaso = r.taso;
            r.tmpKaannetty = r.kaannetty;
        }

        /// <summary>Meren aaltomerkki (Rajaviiva-nauha pinnan tasossa), rakennetaan tasoittain kerran. Palauttaa, näkyykö.</summary>
        bool AsetaAalto(Rivi r, float alfa)
        {
            if (aaltoMateriaali == null) return false;
            var p = HaePaikka(r, r.taso);
            if (p == null) return false;
            int avain = r.kaannetty ? 1 : 0;
            if (!p.aallot.TryGetValue(avain, out var mr)) p.aallot[avain] = mr = TeeAalto(r, p);
            if (r.aalto != mr) { if (r.aalto != null) r.aalto.enabled = false; r.aalto = mr; }
            if (mr == null) return false;
            aaltoLohko ??= new MaterialPropertyBlock();
            var v = r.vari;
            v.a *= alfa;
            aaltoLohko.SetColor(VariId, v);
            double mk = NimiLadonta.Mittakaava(JatkuvaTaso, r.taso);
            aaltoLohko.SetFloat(PaksuusId, (float)NimiLadonta.AallonPaksuus(2 * p.puoliL, p.korkeus, p.korkeusPx > 0 ? p.korkeusPx : 14, mk));
            mr.SetPropertyBlock(aaltoLohko);
            mr.enabled = true;
            return true;
        }

        MeshRenderer TeeAalto(Rivi r, Paikka p)
        {
            var np = r.nimi.Paikat[r.taso];
            var viiva = NimiLadonta.Aaltoviiva(np.LeveysM, np.KorkeusM, r.tyyli.Aalto);
            if (viiva.Count < 2) return null;
            var t = NimiLadonta.PinnanTaso(np.Lat, np.Lon, r.nimi.Kulma);
            double s = r.kaannetty ? -1 : 1;
            int n = viiva.Count - 1;
            var paikat = new Vector3[n * 4];
            var toiset = new Vector3[n * 4];
            var puolet = new Vector2[n * 4];
            var kolmiot = new int[n * 6];
            Vector3 U(double x, double y)
            {
                var e = t.Piste(x * s, y * s);
                return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(new double3(e.X, e.Y, e.Z));
            }
            Vector3 b = U(viiva[0].X, viiva[0].Y);
            for (int i = 0; i < n; i++)
            {
                Vector3 a = b;
                b = U(viiva[i + 1].X, viiva[i + 1].Y);
                Vector3 jatko = b + (b - a);
                int v = i * 4;
                paikat[v] = a; paikat[v + 1] = a; paikat[v + 2] = b; paikat[v + 3] = b;
                toiset[v] = b; toiset[v + 1] = b; toiset[v + 2] = jatko; toiset[v + 3] = jatko;
                puolet[v] = new Vector2(-1, 0); puolet[v + 1] = new Vector2(1, 0);
                puolet[v + 2] = new Vector2(-1, 0); puolet[v + 3] = new Vector2(1, 0);
                int k = i * 6;
                kolmiot[k] = v; kolmiot[k + 1] = v + 1; kolmiot[k + 2] = v + 2;
                kolmiot[k + 3] = v + 1; kolmiot[k + 4] = v + 3; kolmiot[k + 5] = v + 2;
            }
            var mesh = new Mesh { name = "Aalto " + r.nimi.Id };
            mesh.vertices = paikat;
            mesh.SetUVs(0, toiset);
            mesh.SetUVs(1, puolet);
            mesh.triangles = kolmiot;
            mesh.RecalculateBounds();
            var go = new GameObject("Aalto " + r.nimi.Id);
            go.transform.SetParent(sailio, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var mr = go.AddComponent<MeshRenderer>();
            if (aaltoOma == null)
            {
                aaltoOma = new Material(aaltoMateriaali) { name = "Aaltomerkki", renderQueue = jono };
                aaltoOma.SetFloat("_Kerroin", PalloKierto.Pistekerroin);
            }
            mr.sharedMaterial = aaltoOma;
            mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            mr.receiveShadows = false;
            mr.enabled = false;
            return mr;
        }

        /// <summary>Komennon "nimet laske" rivi: taso, näkyvät luokittain, ehdokkaat, varaukset, pooli ja ladonnan kesto.</summary>
        public string Kuvaus()
        {
            var luokat = new SortedDictionary<string, int>();
            int piirretty = 0;
            foreach (var r in rivit)
            {
                if (r.tmp == null || !r.tmp.enabled) continue;
                piirretty++;
                luokat.TryGetValue(r.nimi.Luokka, out int c);
                luokat[r.nimi.Luokka] = c + 1;
            }
            var sb = new StringBuilder();
            sb.Append($"MATKAKIRJA nimet: näkyviä nimiöitä {piirretty} (ladottu {Naytetty}/{Ehdokkaita} ehdokkaasta");
            foreach (var p in luokat) sb.Append($", {p.Key} {p.Value}");
            var vr = merkit != null ? merkit.Varaukset : omat;
            sb.Append($"), taso {Taso} (jatkuva {JatkuvaTaso:0.00}, korkeus {kierto.korkeus / 1000.0:0} km), ");
            sb.Append($"varauksia {vr.Maara}, laatikoita {laatikot.Count} (kaupunkeja {KaupunkiLaatikoita}), pooli {kaytossa}+{pooli.Count}/{enintaan}, ladonta {LadontaMs:0.00} ms, ");
            sb.Append($"päällä {paalla}, valtameret {valtameret}, nimiä {rivit.Count}");
            return sb.ToString();
        }
    }
}
