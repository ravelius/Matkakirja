using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Maat;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Maatila (Linssisepän vertailu ja maatiedot, RAJAPINTA.md luku 4): maat täyttöinä ja
    /// rajoina pallon päällä, napautus osuu maahan (ISO3). Toteuttaa Linssit.Ydinin
    /// IMaaKartta-rajapinnan; linssit saavat sen <see cref="KarttaKerrokset.Maat"/>-kentästä.
    ///
    /// Aineisto: sisältöpaketin kokoelmat/maarajat.json (Siirtoseppä, nippu 4). Maat
    /// rasteroidaan taustasäikeessä tasakulmaiseen tunnuskarttaan (parillisuussääntö,
    /// päivämääräraja kiertää), ja varjostin (Shaders/MaaTaytto) värittää sen paletista.
    /// Sävyn vaihto kirjoittaa vain 256×2-paletin, joten korostus on ilmainen.
    ///
    /// MAAKUNNAT (<see cref="maakohtainen"/>, kokoelma maakuntarajat, skeema 1.42: 138 maata, 2 546 aluetta): kerros on
    /// maakohtainen kuten webissä (js/pallolauta/lauta.js:5098 maakunnat?.asetaMaa(linssiPaalla() ? null : korostusIso),
    /// js/pallomaakunnat.js). Aineisto jäsennetään kerran taustasäikeessä maittain (<see cref="Maakuntajako"/>), ja kun
    /// pelaajan maa vaihtuu (sama kuin väritasolla ja ääriviivalla: <see cref="Varitaso.Kohde"/>), tunnuskartta
    /// rasteroidaan taustasäikeessä vain sen maan alueista maan omaan rajaukseen ja rajajanat rakennetaan vain maan
    /// kaarista. Napautus, korostus ja <see cref="MaaPisteessa"/> koskevat nykyisen maan alueita.
    ///
    /// MAAKUNTIEN TÄYTTÖ (WEB ON MALLI, Fable 25.9.2026): maakohtainen kerros täyttää alueet webin paletista
    /// (js/pallomaakunnat.js MAAKUNNAT_PALETTI, peitto 0,34, värinumero <see cref="Maakuntajako.Varita"/>), eikä perussävyn
    /// täyttöä käytetä. Korostettu alue (Korosta, B17 `maakunta ISO3:tunnus`) saa webin valitun sävyn (väri × 0,62 / 0,34)
    /// ja korostuksen rajan kuten ennen. Täyttö häipyy sisään 260 ms ease-out, kun maa vaihtuu ja kun kerros tulee
    /// näkyviin (web haivyta). Maatila (maakohtainen pois) ei muutu.
    ///
    /// MAAKUNTARAJAT (omistajan löydös 113, build 14: liian voimakkaat): webissä rajat ovat nimiötason rasterissa
    /// (<see cref="Viivaleveys.AluerajaLaitePx"/>: seepia 0,45 täytön alla, 1,0 / 1,5 / 2,2 laatan pikseliä z6–z8, vasta
    /// z6:sta). Natiivin vektoriviiva saa saman ruutuleveyden ja peiton; perussävyn reunaväriä ei käytetä.
    /// </summary>
    public class MaaKartta : MonoBehaviour, IMaaKartta
    {
        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public KarttaKerrokset kerrokset;
        public Material materiaali;
        [Tooltip("Tunnuskartan leveys (korkeus on puolet). 4096 ≈ 0,09° per pikseli.")]
        public int leveys = 4096;
        [Tooltip("Kuoren korkeus ellipsoidin yläpuolella, metreinä.")]
        public double korkeus = 0.0;
        [Tooltip("Napautuksen toleranssi asteina (rannikkokaupungit osuvat maahan).")]
        public double toleranssi = 0.5;
        [Tooltip("Sisältöpaketin kokoelma: maarajat (maat, ISO3) tai maakuntarajat (\"ISO:tunnus\", B17).")]
        public string kokoelma = "maarajat";
        [Tooltip("Piilotetaanko kaupungit ja nimiöt tilan ajaksi (maatila kyllä, maakuntien värjäys ei).")]
        public bool piilotaKaupungit = true;
        [Tooltip("Piirtojärjestys kuorten kesken (maakunnat maiden päälle).")]
        public int jonoLisa = 0;
        [Tooltip("Tunnuskartan rajaus (länsi, etelä, itä, pohjoinen) asteina; nollat = koko maailma. " +
                 "Rajauksen ulkopuoliset alueet jätetään pois. Ei käytössä maakohtaisessa kerroksessa (rajaus maasta).")]
        public Vector4 rajaus;
        [Tooltip("Maakohtainen kerros (maakunnat, web js/pallomaakunnat.js asetaMaa): vain pelaajan maan alueet, " +
                 "tunnuskartta maan omasta rajauksesta (Maakuntajako). Pois = koko kokoelma kerralla (maatila).")]
        public bool maakohtainen;
        [Tooltip("Maakohtaisen tunnuskartan tavoiteteksel asteina: 44°/4096 ≈ 1,2 km (sama kuin entinen Euroopan rajaus).")]
        public double tekseliAste = 44.0 / 4096;
        [Tooltip("Maakohtaisen tunnuskartan tekselibudjetti (R8 = tavua): suuri maa (RUS, CAN, USA) saa karkeamman tekselin.")]
        public int tekseleitaEnintaan = 4096 * 4096;
        [Tooltip("Rajat vektoriviivoina (Shaders/Rajaviiva), tarkkuus ei riipu tunnuskartasta. null = rajat " +
                 "tunnuskartasta varjostimessa (maatila). Korostetun alueen raja piirtyy edelleen varjostimessa.")]
        public Material rajaMateriaali;
        [Tooltip("Maakohtainen kerros: OLETUSRAJAT (löydös 113, web: nimiötason poltetut maakuntarajat näkyvät aina). Kun " +
                 "pelaajalla on maa, kerros tulee itse päälle ilman täyttöä (vain ohuet rajat); täyttö ja korostus vasta " +
                 "maakunnan valinnasta (Taytto). Natiivi-UI:n Maakunnat \"Pois\" (löydös 114) piilottaa ne (OletusPois).")]
        public bool oletusrajat;
        [Tooltip("Vektorirajat vasta tästä ruudun tiheydestä (laitepikseliä/aste), web VEKTORIT_RAJAT_PX_ASTE 30 " +
                 "(js/pallovektorit.js:171). Kaukana vakioleveä viiva sulaa läiskäksi (löydös 74 d). 0 = aina.")]
        public float rajatMinTiheys = (float)Vektorisolut.RajatTiheys;

        public event Action<string> MaaNapautettu;
        /// <summary>Maakohtainen kerros: pakotettu maa (komento maakunta maa ISO3), null = pelaajan maa.</summary>
        public string Pakotettu { get; set; }
        /// <summary>Maakohtainen kerros: maa, jonka alueet ovat tunnuskartassa (null = ei maakuntia).</summary>
        public string NykyinenMaa { get; private set; }
        public bool Paalla { get; private set; }
        public bool Valmis => tunnukset != null;
        /// <summary>Täyttö näkyvissä (viiden sävyn täyttö ja korostus); false = vain rajat (oletusrajat).</summary>
        public bool TayttoNakyy { get; private set; } = true;
        /// <summary>
        /// Oletusrajojen esto (löydös 114): Natiivi-UI:n "Pois". UI-assembly ei näy Kartalle, joten silta
        /// (Scripts/Kartta/MaakunnatSilta) antaa lukijan; null = ei estoa. Luetaan tarkistuksen yhteydessä, koska valinta
        /// muistetaan (PlayerPrefs) ja voi olla voimassa jo ennen kuin UI rakentuu.
        /// </summary>
        public Func<bool> OletusPois { get; set; }

        MaatAineisto aineisto;
        MaaOsuma osuma;
        readonly Dictionary<string, int> indeksi = new Dictionary<string, int>();
        readonly Dictionary<string, Savy> korostukset = new Dictionary<string, Savy>();
        Savy perus = new Savy(new Rgba(0, 0, 0, 0), new Rgba(0.23f, 0.18f, 0.13f, 0.8f));
        Texture2D tunnukset, paletti;
        MeshRenderer kuori, rajat;
        Material rajaOma;
        bool latausAlkanut;
        // Linssi piilottaa pelikerrokset (KarttaKerrokset "kaupungit" pois) → kerros pois (web lauta.js:5098).
        bool linssit;
        // Vektorirajojen peiton kerroin 0–1 (Viivaleveys.AluerajaHaive) ja viimeksi luettu tiheys (px/°).
        float rajaHaive;
        float rajaTiheys;
        // Maakuntarajan leveys ja peiton kerroin viimeksi (Viivaleveys.AluerajaPiirto): leveys laitepikseleinä ja kerroin.
        float rajaLaitePx, rajaAlfa = 1f;
        // Maakohtainen kerros: aineisto maittain, käynnissä oleva rakennus, rakennetun rajauksen avain (maa#rypäs)
        // ja tunnuskartan rajaus shaderille (länsi, pohjoinen, pituusväli, leveysväli).
        Maakuntajako jako;
        Coroutine rakennus;
        string rakennettu;
        float seuraavaTarkistus;
        Vector4 alue = new Vector4(-180, 90, 360, 180);
        // Maakohtainen täyttö: alueen värinumero (tunnus → vari), häiveen alku (unscaledTime, < 0 = ei käynnissä),
        // nykyinen häive shaderille ja näkyikö kuori viimeksi (näkyviin tulo käynnistää häiveen).
        readonly Dictionary<string, int> varit = new Dictionary<string, int>();
        float haiveAlku = -1f;
        float haive = 1f;
        bool nakyi;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (kerrokset == null) kerrokset = GetComponent<KarttaKerrokset>();
            if (kierto != null) kierto.Napautettu += Napautus;
        }

        void OnDestroy()
        {
            kaikki.Remove(this);
            if (kierto != null) kierto.Napautettu -= Napautus;
        }

        // LÄMPÖERÄ (PallonLepo): maakuntien täytön häive (260 ms) ja vektorirajojen häive tiheyden mukaan
        // (Viivaleveys.AluerajaHaive) jatkuvat kameran pysähdyttyä; kuoren ja paletin vaihdot ovat yksittäisiä muutoksia.
        void OnEnable() => PallonLepo.Animoi(Haivyttaa, kokoelma);
        void OnDisable() => PallonLepo.Poista(Haivyttaa);
        bool Haivyttaa() => (maakohtainen && haiveAlku >= 0f) || rajaHaiveLiikkuu || SaapuminenLiikkuu || herataan.Count > 0;
        bool rajaHaiveLiikkuu;

        // ---- Elävä kartta: saapuminen (Linssisepän rajapinta 26.9., build 19) ----

        /// <summary>Saapumisen piilotuksen häivytys (s) molempiin suuntiin.</summary>
        public const float SaapumisHaiveS = 0.3f;
        static bool saapumisPiilo;
        float saapumisKerroin = 1f;

        /// <summary>
        /// ELÄVÄ KARTTA, SAAPUMINEN (Linssiseppä, ElavaSaapuminen): true = kaikkien maakarttojen täyttö ja rajat piiloon
        /// saapumisanimaation ajaksi (animaatio piirtää omat kynäviivansa ja syttymistäyttönsä), false = palaavat
        /// <see cref="SaapumisHaiveS"/>:n häivytyksellä. Koskee kaikkia MaaKartta-olioita (maat ja maakunnat).
        /// </summary>
        public static void Saapuminen(bool piilossa)
        {
            if (saapumisPiilo == piilossa) return;
            saapumisPiilo = piilossa;
            PallonLepo.Muuttui("maakartta: saapuminen");
        }

        // ---- Elävä kartta, kohta 3: maakunta herää (Linssisepän rajapinta 26.9., build 20) ----

        /// <summary>
        /// Maakunnan pysyvä tila elävässä kartassa: avain "ISO:tunnus" → true = herännyt (täysi sävy), false = uinuva
        /// (himmeä paperi, <see cref="UinuvanPeitto"/>), null = ei elävän kartan tilaa (täyttö kuten ennen). Asettaa
        /// Assembly-CSharp (Linssisepän ElavaKartta PeliOhjain.Muste-tiedosta); muutoksen jälkeen <see cref="PaivitaHeraaminen"/>.
        /// </summary>
        public static Func<string, bool?> Heraannyt;
        /// <summary>Uinuvan maakunnan täytön peitto herääneen suhteen.</summary>
        public const float UinuvanPeitto = 0.3f;
        static readonly List<MaaKartta> kaikki = new List<MaaKartta>();
        // Herätyksen ajaksi piilotetut maakunnat: avain → nykyinen kerroin ja tavoite (0 piilossa, 1 näkyy).
        readonly Dictionary<string, (float nyt, float tavoite)> herataan = new Dictionary<string, (float, float)>(StringComparer.Ordinal);

        /// <summary>Maakuntien tila muuttui (Heraannyt): paletit uusiksi.</summary>
        public static void PaivitaHeraaminen()
        {
            foreach (var m in kaikki)
            {
                if (m == null || !m.maakohtainen) continue;
                m.PaivitaPaletti();
                // Diagnostiikka (avainmuodon täsmäys musteen kanssa): montako maakuntaa kussakin tilassa ja esimerkkiavain.
                int h = 0, u = 0, n = 0;
                string esim = null;
                foreach (var a in m.indeksi.Keys)
                {
                    esim ??= a;
                    bool? t = null;
                    if (Heraannyt != null) try { t = Heraannyt(a); } catch (Exception) { }
                    if (t == true) h++; else if (t == false) u++; else n++;
                }
                Debug.Log($"MATKAKIRJA maakunnat: herääminen {m.NykyinenMaa ?? "-"}: herännyt {h}, uinuva {u}, ei tilaa {n} (avain esim. {esim ?? "-"})");
            }
        }

        /// <summary>
        /// Maakunnan pysyvä täyttö piiloon herätyksen ajaksi (Linssisepän herätysanimaatio piirtää oman täyttönsä) ja
        /// takaisin <see cref="SaapumisHaiveS"/>:n häivytyksellä (piilossa = false). Kaikki maakohtaiset maakartat.
        /// </summary>
        public static void Herata(string avain, bool piilossa)
        {
            if (string.IsNullOrEmpty(avain)) return;
            foreach (var m in kaikki)
            {
                if (m == null || !m.maakohtainen) continue;
                float nyt = m.herataan.TryGetValue(avain, out var h) ? h.nyt : 1f;
                m.herataan[avain] = (nyt, piilossa ? 0f : 1f);
                m.PaivitaPaletti();
            }
            PallonLepo.Muuttui("maakartta: herätys");
        }

        /// <summary>Herätyskertoimien askel; poistaa valmiit näkyvät. Tosi, jos paletti muuttui.</summary>
        bool PaivitaHeratys()
        {
            if (herataan.Count == 0) return false;
            float askel = Time.unscaledDeltaTime / SaapumisHaiveS;
            foreach (var avain in new List<string>(herataan.Keys))
            {
                var (nyt, tavoite) = herataan[avain];
                nyt = Mathf.MoveTowards(nyt, tavoite, askel);
                if (nyt >= 1f && tavoite >= 1f) herataan.Remove(avain); else herataan[avain] = (nyt, tavoite);
            }
            PaivitaPaletti();
            return true;
        }

        void Awake() => kaikki.Add(this);

        static readonly int SaapuminenId = Shader.PropertyToID("_Saapuminen");
        /// <summary>
        /// Maakunnan keskipiste (Natiivi-UI:n elävä kartussi, käsialanimi kartalla): Maakuntajako-alueen KeskusLat/KeskusLon
        /// avaimella "ISO:tunnus". false, jos aineisto ei ole ladattu, aluetta ei löydy tai keskus puuttuu.
        /// </summary>
        public bool MaakunnanKeskus(string avain, out double lat, out double lon)
        {
            lat = lon = double.NaN;
            var m = jako?.Hae(Maakuntajako.MaaTunnuksesta(avain));
            if (m == null) return false;
            foreach (var a in m.Alueet)
                if (a.Id == avain) { lat = a.KeskusLat; lon = a.KeskusLon; break; }
            return !double.IsNaN(lat) && !double.IsNaN(lon);
        }

        bool SaapuminenLiikkuu => saapumisKerroin != (saapumisPiilo ? 0f : 1f);

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaSaapuminen() { saapumisPiilo = false; Heraannyt = null; kaikki.Clear(); }

        /// <summary>Saapumiskertoimen askel; tosi, jos muuttui (täytön häive ja rajan väri uusiksi).</summary>
        bool PaivitaSaapuminen()
        {
            float tavoite = saapumisPiilo ? 0f : 1f;
            if (saapumisKerroin == tavoite) return false;
            saapumisKerroin = Mathf.MoveTowards(saapumisKerroin, tavoite, Time.unscaledDeltaTime / SaapumisHaiveS);
            if (kuori != null) kuori.sharedMaterial.SetFloat(SaapuminenId, saapumisKerroin);
            return true;
        }

        // ---- IMaaKartta ----

        public void MaaTila(bool paalla)
        {
            // Tilan muutos (PallonLepo, joutosyke jatkuu); kuoren ja paletin valmistuminen on Valmistui.
            if (paalla != Paalla) PallonLepo.Muuttui(kokoelma);
            Paalla = paalla;
            if (kerrokset != null && piilotaKaupungit)
            {
                kerrokset.Nakyvyys("kaupungit", !paalla);
                kerrokset.Nakyvyys("nimiot", !paalla);
            }
            if (paalla && !latausAlkanut) StartCoroutine(Lataa());
            PaivitaNakyvyys();
        }

        /// <summary>
        /// Linssi piilotti pelikerrokset (KarttaKerrokset.Nakyvyys("kaupungit", false), LinssiOhjain.Pelikerrokset):
        /// maakuntakerros pois linssin ajaksi kuten webissä (js/pallolauta/lauta.js:5098
        /// maakunnat?.asetaMaa(linssiPaalla() ? null : korostusIso)). Löydös 74 d: ihmisen matkan avaruuspallossa
        /// valitun maakunnan rajat jäivät Euroopan päälle. Pelaajan valinta säilyy ja palaa linssin sulkeutuessa.
        /// Vain maakuntien kerros kuuntelee tätä; maatila (maat) on itse linssin työkalu.
        /// </summary>
        public void Linssit(bool paalla)
        {
            if (linssit == paalla) return;
            linssit = paalla;
            PaivitaNakyvyys();
        }

        bool NakyyNyt => Paalla && Valmis && !linssit && (!maakohtainen || indeksi.Count > 0);

        /// <summary>Kuori heti; vektorirajat häivytetään LateUpdatessa tiheyden mukaan (Viivaleveys.AluerajaHaive).</summary>
        void PaivitaNakyvyys()
        {
            bool nakyy = NakyyNyt;
            if (maakohtainen && nakyy && !nakyi) AloitaHaive();
            if (nakyy != nakyi) PallonLepo.Valmistui(kokoelma);
            nakyi = nakyy;
            if (kuori != null) kuori.enabled = NakyyNyt;
            if (rajat != null && !NakyyNyt) { rajaHaive = 0f; rajat.enabled = false; }
        }

        public void MaaPerussavy(Savy savy) { perus = savy; PaivitaPaletti(); }

        public void Korosta(string iso3, Savy savy)
        {
            if (string.IsNullOrEmpty(iso3)) return;
            korostukset[iso3] = savy;
            PaivitaPaletti();
        }

        public void KorostusPois(string iso3)
        {
            if (iso3 == null) korostukset.Clear(); else korostukset.Remove(iso3);
            PaivitaPaletti();
        }

        /// <summary>Maa pisteessä (sama osumatesti kuin napautuksessa), tai null.</summary>
        public string MaaPisteessa(double lat, double lon) => osuma?.Hae(lat, lon, toleranssi);

        // ---- Napautus ----

        void Napautus(Vector2 ruutu)
        {
            if (!Paalla) return;
            if (osuma == null || kierto == null) { Debug.Log($"MATKAKIRJA maat: napautus ohitettu (osuma {osuma != null}, kierto {kierto != null})"); return; }
            if (!RuutuPallolle(ruutu, out double lat, out double lon)) { Debug.Log($"MATKAKIRJA maat: napautus {ruutu} ohi pallon"); return; }
            var iso3 = osuma.Hae(lat, lon, toleranssi);
            Debug.Log($"MATKAKIRJA maat: napautus {lat:0.00} {lon:0.00} → {iso3 ?? "meri"}");
            if (iso3 != null) MaaNapautettu?.Invoke(iso3);
        }

        /// <summary>Näytön piste (pikseleinä, origo vasen alakulma) → leveys ja pituus ellipsoidilla.</summary>
        public bool RuutuPallolle(Vector2 ruutu, out double lat, out double lon)
        {
            lat = lon = 0;
            var kamera = kierto.GetComponent<Camera>();
            if (kamera == null) kamera = Camera.main;
            if (kamera == null || georeferenssi == null) return false;
            // Pallotesti Unityn avaruudessa (säde = päiväntasaajan säde): napojen virhe on alle
            // 21 km, mikä mahtuu osumatestin 0,5°:n toleranssiin. Osuma muunnetaan ECEF:ksi ja
            // siitä leveydeksi ja pituudeksi.
            if (!PalloKierto.Sade(kamera, ruutu, out Ray r)) return false;
            var gt = georeferenssi.transform;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double3 o = (float3)gt.InverseTransformPoint(r.origin);
            double3 s = math.normalize((double3)(float3)gt.InverseTransformDirection(r.direction));
            double3 oc = o - keskus;
            const double a = 6378137.0;
            double B = math.dot(oc, s), C = math.dot(oc, oc) - a * a;
            double D = B * B - C;
            if (D < 0 || -B - math.sqrt(D) < 0) return false;
            double3 osumaU = o + s * (-B - math.sqrt(D));
            double3 ecef = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(osumaU);
            double3 llh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef);
            lon = llh.x; lat = llh.y;
            return true;
        }

        // ---- Lataus ja rasterointi ----

        IEnumerator Lataa()
        {
            latausAlkanut = true;
            string teksti = null;
            yield return Sisalto.HaeTeksti(kokoelma, t => teksti = t, true);
            if (teksti == null) { Debug.LogWarning($"MATKAKIRJA maat: {kokoelma}.json puuttuu tästä paketista"); latausAlkanut = false; yield break; }
            if (maakohtainen) { yield return LataaMaittain(teksti); yield break; }
            float alku = Time.realtimeSinceStartup;
            bool rajattu = rajaus.z > rajaus.x && rajaus.w > rajaus.y;
            double lon0 = rajattu ? rajaus.x : -180, lat1 = rajattu ? rajaus.w : 90;
            double lonVali = rajattu ? rajaus.z - rajaus.x : 360, latVali = rajattu ? rajaus.w - rajaus.y : 180;
            int w = leveys, h = (int)math.round(leveys * latVali / lonVali);
            var r4 = rajaus;
            MaatAineisto aineistoT = null;
            byte[] kartta = null;
            List<Maa> jarjestys = null;
            bool vektorirajat = rajaMateriaali != null;
            List<(double3 a, double3 b)> janat = null;
            var tehtava = Task.Run(() =>
            {
                var juuri = Peli.MiniJson.Jasenna(teksti);
                aineistoT = MaatAineisto.LueRajat(juuri);
                jarjestys = new List<Maa>(aineistoT.Maat.Values);
                // Rajatussa kartassa vain rajauksen sisään osuvat alueet (FRA:n merentakaiset pois).
                if (rajattu) jarjestys.RemoveAll(m => m.E < r4.x || m.W > r4.z || m.N < r4.y || m.S > r4.w);
                jarjestys.Sort((x, y) => string.CompareOrdinal(x.Id, y.Id));
                if (jarjestys.Count > 255) jarjestys.RemoveRange(255, jarjestys.Count - 255);
                kartta = Rasteroi(jarjestys, w, h, lon0, lat1, lonVali, latVali, !rajattu);
                if (vektorirajat)
                {
                    // Skeema 1.25: "kaaret" (Siirtoseppä) = jokainen raja kerran, samat pisteet kuin renkaissa.
                    // Vanhemmissa paketeissa janat renkaista (naapurien harvennus eroaa → osin tuplana).
                    var kaaret = (juuri as Dictionary<string, object>)?.GetValueOrDefault("kaaret") as List<object>;
                    janat = kaaret != null ? JanatKaarista(kaaret, r4, rajattu) : Janat(jarjestys);
                }
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted)
            {
                Debug.LogError("MATKAKIRJA maat: rasterointi kaatui: " + tehtava.Exception?.GetBaseException());
                latausAlkanut = false;
                yield break;
            }
            aineisto = aineistoT;
            osuma = new MaaOsuma(aineisto);
            indeksi.Clear();
            for (int i = 0; i < jarjestys.Count; i++) indeksi[jarjestys[i].Id] = i + 1;

            tunnukset = new Texture2D(w, h, TextureFormat.R8, false, true)
            {
                name = "Maatunnukset", filterMode = FilterMode.Point,
                wrapModeU = rajattu ? TextureWrapMode.Clamp : TextureWrapMode.Repeat,
                wrapModeV = TextureWrapMode.Clamp,
            };
            tunnukset.SetPixelData(kartta, 0);
            tunnukset.Apply(false, true);
            // sRGB (linear = false): webin värit ovat sRGB:tä, ja URP muuntaa näytteen lineaariseksi.
            // Lineaarisena täyttö näkyi iPadilla haaleana (Linssisepän kontaktiarkki 23.9.).
            paletti = new Texture2D(256, 2, TextureFormat.RGBA32, false, false)
            {
                name = "Maapaletti", filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp,
            };
            PaivitaPaletti();
            TeeKuori();
            if (janat != null) TeeRajat(janat);
            Debug.Log($"MATKAKIRJA maat ({kokoelma}): {jarjestys.Count} aluetta, tunnuskartta {w}×{h}, " +
                      $"{janat?.Count ?? 0} rajajanaa, {(Time.realtimeSinceStartup - alku) * 1000f:0} ms");
            PaivitaNakyvyys();
        }

        // ---- Maakohtainen kerros (maakunnat) ----

        /// <summary>Jäsennys kerran taustasäikeessä maittain; ensimmäinen maa rakennetaan Updatessa.</summary>
        IEnumerator LataaMaittain(string teksti)
        {
            Maakuntajako j = null;
            long jasennys = 0, maittain = 0;
            var tehtava = Task.Run(() =>
            {
                var kello = System.Diagnostics.Stopwatch.StartNew();
                var juuri = Peli.MiniJson.Jasenna(teksti);
                jasennys = kello.ElapsedMilliseconds;
                kello.Restart();
                j = Maakuntajako.Lue(juuri);
                maittain = kello.ElapsedMilliseconds;
            });
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted)
            {
                Debug.LogError("MATKAKIRJA maakunnat: jäsennys kaatui: " + tehtava.Exception?.GetBaseException());
                latausAlkanut = false;
                yield break;
            }
            jako = j;
            Debug.Log($"MATKAKIRJA maakunnat ({kokoelma}): {j.Maat.Count} maata, {j.AlueitaYhteensa} aluetta, {j.Kaaria} kaarta " +
                      $"({j.KohdistamattomatKaaret} ilman maata, {j.SisaisetKaaret} alueen sisäistä ja {j.UlkoKaaret} ulkorajaa pois), jäsennys {jasennys} ms, maittain {maittain} ms");
            if (j.AlueitaEnintaan > Maakuntajako.AluetaEnintaan)
                Debug.LogWarning($"MATKAKIRJA maakunnat: {j.AlueitaEnintaanMaa} {j.AlueitaEnintaan} aluetta, tunnuskartassa enintään " +
                                 $"{Maakuntajako.AluetaEnintaan} (loput jäävät pois)");
            seuraavaTarkistus = 0f;
        }

        /// <summary>Pelaajan maa kuten ääriviivalla (Maaraja): väritason kohde, ilman väritasoa nostokerroksen maa.</summary>
        string SeurattavaMaa()
        {
            if (!string.IsNullOrEmpty(Pakotettu)) return Pakotettu;
            var vt = kerrokset != null ? kerrokset.varitaso : null;
            if (vt != null) return vt.Kohde;
            var nk = NostoKerros.Instanssi;
            return nk != null && !string.IsNullOrEmpty(nk.NykyinenMaa) ? nk.NykyinenMaa : NykyinenMaa;
        }

        /// <summary>
        /// Maakohtainen kerros seuraa pelaajan maata (web asetaMaa(korostusIso)) ja nappulan rypästä (Cayenne → Guyana,
        /// Anchorage → Alaska). Vain näkyvissä: piilossa tai linssin aikana ei rakenneta, vaan palatessa.
        /// </summary>
        /// <summary>Täyttö päälle (maakunnan valinta) tai pois (oletusrajat: vain rajat).</summary>
        public void Taytto(bool nakyy)
        {
            if (TayttoNakyy == nakyy) return;
            TayttoNakyy = nakyy;
            PaivitaPaletti();
        }

        float seuraavaOletus;

        /// <summary>
        /// Oletusrajat (löydös 113): kun pelaajalla on maa eikä kerros ole päällä eikä Pois ole valittu, kerros päälle
        /// ilman täyttöä. Aineisto ladataan vasta tässä (ei käynnistyksessä, jossa pelaajalla ei ole maata). Pois
        /// (löydös 114) sammuttaa oletuksena päälle tulleen kerroksen.
        /// </summary>
        void PaivitaOletus()
        {
            if (!maakohtainen || !oletusrajat || Time.unscaledTime < seuraavaOletus) return;
            seuraavaOletus = Time.unscaledTime + 1f;
            bool pois = OletusPois != null && OletusPois();
            if (pois)
            {
                if (Paalla && !TayttoNakyy) MaaTila(false);
                return;
            }
            if (Paalla || linssit || string.IsNullOrEmpty(SeurattavaMaa())) return;
            Taytto(false);
            MaaTila(true);
        }

        void Update()
        {
            PaivitaOletus();
            if (!maakohtainen || jako == null || !Paalla || linssit || rakennus != null) return;
            if (Time.unscaledTime < seuraavaTarkistus) return;
            seuraavaTarkistus = Time.unscaledTime + 0.5f;
            var nappula = kerrokset != null ? kerrokset.nappula : null;
            if (nappula != null && nappula.Liikkeessa) return;
            string maa = SeurattavaMaa();
            double? lat = null, lon = null;
            if (nappula != null && nappula.Nakyy && string.IsNullOrEmpty(Pakotettu)) { lat = nappula.Lat; lon = nappula.Lon; }
            string avain = string.IsNullOrEmpty(maa) ? "" : maa + "#" + Maakuntajako.LahtoRypas(jako.Hae(maa), lat, lon);
            if (avain == rakennettu) return;
            rakennus = StartCoroutine(Rakenna(maa, lat, lon, avain));
        }

        /// <summary>Maan tunnuskartta ja rajajanat taustasäikeessä; pääsäikeessä vain tekstuurin ja verkon vaihto.</summary>
        IEnumerator Rakenna(string maa, double? lat, double? lon, string avain)
        {
            float alku = Time.realtimeSinceStartup;
            var j = jako;
            double tavoite = tekseliAste, kork = korkeus;
            long budjetti = Math.Max(1, tekseleitaEnintaan);
            int sivu = Math.Min(8192, SystemInfo.maxTextureSize);
            bool vektorirajat = rajaMateriaali != null;
            Maakuntajako.Rajaus rj = null;
            byte[] kartta = null;
            List<(double3 a, double3 b)> janat = null;
            var tehtava = Task.Run(() =>
            {
                rj = string.IsNullOrEmpty(maa) ? null : j.Rajaa(maa, lat, lon, tavoite, budjetti, sivu);
                if (rj == null) return;
                kartta = Maakuntajako.Rasteroi(rj);
                if (!vektorirajat) return;
                var asteet = j.Janat(rj);
                janat = new List<(double3, double3)>(asteet.Count);
                double3 E((double Lon, double Lat) p) =>
                    CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, kork));
                foreach (var (a, b) in asteet) janat.Add((E(a), E(b)));
            });
            while (!tehtava.IsCompleted) yield return null;
            rakennus = null;
            rakennettu = avain; // myös kaatuessa: ei uusintakierrettä samaan virheeseen
            if (tehtava.IsFaulted)
            {
                Debug.LogError($"MATKAKIRJA maakunnat: {maa} rasterointi kaatui: " + tehtava.Exception?.GetBaseException());
                yield break;
            }
            indeksi.Clear();
            varit.Clear();
            string edellinen = NykyinenMaa;
            NykyinenMaa = rj != null ? maa : null;
            if (rj == null)
            {
                osuma = null;
                if (rajat != null) TeeRajat(new List<(double3, double3)>());
                PaivitaPaletti();
                PaivitaNakyvyys();
                Debug.Log($"MATKAKIRJA maakunnat: {(string.IsNullOrEmpty(maa) ? "ei maata" : maa + ": ei maakuntia")}");
                yield break;
            }
            for (int i = 0; i < rj.Alueet.Count; i++)
            {
                indeksi[rj.Alueet[i].Id] = i + 1;
                varit[rj.Alueet[i].Id] = rj.Varit[i];
            }
            // Web asetaMaa → nayta → haivyta: uusi maa häipyy sisään (rypään vaihto samassa maassa ei).
            if (maa != edellinen) AloitaHaive();
            osuma = new MaaOsuma(rj.Alueet);
            var vanha = tunnukset;
            tunnukset = new Texture2D(rj.W, rj.H, TextureFormat.R8, false, true)
            {
                name = "Maakuntatunnukset " + maa, filterMode = FilterMode.Point,
                wrapModeU = TextureWrapMode.Clamp, wrapModeV = TextureWrapMode.Clamp,
            };
            tunnukset.SetPixelData(kartta, 0);
            tunnukset.Apply(false, true);
            alue = new Vector4((float)rj.Lon0, (float)rj.Lat1, (float)rj.LonVali, (float)rj.LatVali);
            if (paletti == null)
                paletti = new Texture2D(256, 2, TextureFormat.RGBA32, false, false)
                {
                    name = "Maakuntapaletti", filterMode = FilterMode.Point, wrapMode = TextureWrapMode.Clamp,
                };
            if (kuori == null) TeeKuori();
            else
            {
                kuori.sharedMaterial.SetTexture("_Tunnus", tunnukset);
                kuori.sharedMaterial.SetVector("_Alue", alue);
            }
            if (vanha != null) Destroy(vanha);
            if (janat != null) TeeRajat(janat);
            PaivitaPaletti();
            if (rj.AlueitaPois > 0)
                Debug.LogWarning($"MATKAKIRJA maakunnat: {maa} yli {Maakuntajako.AluetaEnintaan} aluetta, {rj.AlueitaPois} jäi pois");
            Debug.Log($"MATKAKIRJA maakunnat {maa}: {rj.Alueet.Count} aluetta, tunnuskartta {rj.W}×{rj.H} " +
                      $"(teksel {rj.Teksel * 111.2:0.0} km, {rj.Lon0:0.#}…{rj.Lon0 + rj.LonVali:0.#}°), rypäitä {rj.Rypaita} " +
                      $"(+{rj.RypaitaPois} pois), {janat?.Count ?? 0} rajajanaa, {(Time.realtimeSinceStartup - alku) * 1000f:0} ms");
            PaivitaNakyvyys();
        }

        /// <summary>
        /// Parillisuussäännön juoviorasterointi: jokaiselle maalle kerätään reunojen
        /// leikkaukset riveittäin (pikselin keskikohta) ja täytetään parit. x kiertää
        /// leveyden yli (päivämääräraja, renkaat voivat jatkua yli ±180°).
        /// </summary>
        static byte[] Rasteroi(List<Maa> maat, int w, int h, double lon0, double lat1, double lonVali, double latVali, bool kierra)
        {
            var kartta = new byte[w * h];
            var rivit = new List<float>[h];
            for (int m = 0; m < maat.Count; m++)
            {
                byte arvo = (byte)(m + 1);
                int yMin = h, yMax = -1;
                foreach (var rengas in maat[m].Renkaat)
                {
                    for (int i = 0; i < rengas.Length; i++)
                    {
                        var p0 = rengas[i];
                        var p1 = rengas[(i + 1) % rengas.Length];
                        double x0 = (p0.Lon - lon0) / lonVali * w, y0 = (lat1 - p0.Lat) / latVali * h;
                        double x1 = (p1.Lon - lon0) / lonVali * w, y1 = (lat1 - p1.Lat) / latVali * h;
                        if (y0 == y1) continue;
                        double ya = Math.Min(y0, y1), yb = Math.Max(y0, y1);
                        int r0 = Math.Max(0, (int)Math.Ceiling(ya - 0.5));
                        int r1 = Math.Min(h - 1, (int)Math.Ceiling(yb - 0.5) - 1);
                        for (int r = r0; r <= r1; r++)
                        {
                            double yc = r + 0.5;
                            double x = x0 + (yc - y0) * (x1 - x0) / (y1 - y0);
                            (rivit[r] ??= new List<float>()).Add((float)x);
                            if (r < yMin) yMin = r;
                            if (r > yMax) yMax = r;
                        }
                    }
                }
                for (int r = yMin; r <= yMax; r++)
                {
                    var l = rivit[r];
                    if (l == null || l.Count < 2) { l?.Clear(); continue; }
                    l.Sort();
                    int rivi = r * w;
                    for (int i = 0; i + 1 < l.Count; i += 2)
                    {
                        int xa = (int)Math.Ceiling(l[i] - 0.5), xb = (int)Math.Ceiling(l[i + 1] - 0.5) - 1;
                        for (int x = xa; x <= xb; x++)
                        {
                            int xx = kierra ? ((x % w) + w) % w : x;
                            if (xx < 0 || xx >= w) continue;
                            kartta[rivi + xx] = arvo;
                        }
                    }
                    l.Clear();
                }
            }
            return kartta;
        }

        void PaivitaPaletti()
        {
            if (paletti == null) return;
            var px = new Color32[256 * 2];
            Color32 C(Rgba v) => new Color32((byte)(v.R * 255), (byte)(v.G * 255), (byte)(v.B * 255), (byte)(v.A * 255));
            byte B(double x) => (byte)Math.Round(Math.Min(1, Math.Max(0, x)) * 255);
            bool lineaarinen = QualitySettings.activeColorSpace == ColorSpace.Linear;
            foreach (var p in indeksi)
            {
                bool korostettu = korostukset.TryGetValue(p.Key, out var k);
                var s = korostettu ? k : perus;
                if (maakohtainen)
                {
                    // Webin täyttö (Maakuntajako.Taytto): sRGB-väri paletin sRGB-tekstuuriin, alfa jo lineaarisen
                    // sekoituksen vastine (varjostimen _TayttoEksponentti 1).
                    var t = Maakuntajako.Taytto(varit.TryGetValue(p.Key, out int v) ? v : 0, korostettu, lineaarinen);
                    // Oletusrajat (löydös 113): ilman valintaa vain rajat, täyttö läpinäkyvä.
                    // Elävä kartta (kohta 3): uinuva maakunta himmeänä, herätyksen ajaksi piilotettu häivytyksellä.
                    double peitto = t.A;
                    bool? tila = null;
                    if (Heraannyt != null) try { tila = Heraannyt(p.Key); } catch (Exception) { tila = null; }
                    // Linssiseppä 26.9.: herännyt näkyy täysin sävyin aina (myös oletusrajoilla ilman täyttöä); uinuva himmeänä
                    // vain, kun täyttö on päällä, muuten paperina (ei täyttöä).
                    if (tila == false) peitto *= UinuvanPeitto;
                    if (herataan.TryGetValue(p.Key, out var hk)) peitto *= hk.nyt;
                    bool nakyy = tila == true || TayttoNakyy;
                    px[p.Value] = new Color32(B(t.R), B(t.G), B(t.B), nakyy ? B(peitto) : (byte)0);
                }
                else px[p.Value] = C(s.Taytto);
                // Vektorirajojen kanssa varjostin piirtää vain korostetun alueen rajan.
                px[256 + p.Value] = rajat != null && !korostettu ? new Color32(0, 0, 0, 0) : C(s.Reuna);
            }
            AsetaRajanVari();
            paletti.SetPixels32(px);
            paletti.Apply(false);
            PallonLepo.Valmistui(kokoelma);
        }

        void TeeKuori()
        {
            if (kuori != null || materiaali == null) return;
            var go = new GameObject("Maakuori");
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = Verkko(180, 90);
            kuori = go.AddComponent<MeshRenderer>();
            kuori.sharedMaterial = new Material(materiaali);
            kuori.sharedMaterial.renderQueue = materiaali.renderQueue + jonoLisa;
            kuori.sharedMaterial.SetTexture("_Tunnus", tunnukset);
            kuori.sharedMaterial.SetTexture("_Paletti", paletti);
            // Raja 1 laitepikseli kuten webin polygonStrokeColor (ei Pistekerrointa).
            kuori.sharedMaterial.SetFloat("_ReunaLeveys", 0.5f);
            bool rj = rajaus.z > rajaus.x && rajaus.w > rajaus.y;
            if (!maakohtainen && rj) alue = new Vector4(rajaus.x, rajaus.w, rajaus.z - rajaus.x, rajaus.w - rajaus.y);
            kuori.sharedMaterial.SetVector("_Alue", alue);
            kuori.sharedMaterial.SetFloat(SaapuminenId, saapumisKerroin);
            if (maakohtainen)
            {
                kuori.sharedMaterial.SetFloat("_TayttoEksponentti", 1f);
                kuori.sharedMaterial.SetFloat("_Haive", haive);
            }
            kuori.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            kuori.receiveShadows = false;
            kuori.enabled = false;
        }

        /// <summary>
        /// Rajajanat renkaista ECEF-pisteinä (taustasäikeessä). Naapurien yhteinen raja on
        /// aineistossa kahdesti: sama jana (1e-5° pyöristys, suunnasta riippumatta) piirretään kerran.
        /// </summary>
        List<(double3 a, double3 b)> Janat(List<Maa> maat)
        {
            var nahty = new HashSet<(long, long, long, long)>();
            var ulos = new List<(double3, double3)>();
            (long, long) Q((double Lon, double Lat) p) => ((long)math.round(p.Lon * 1e5), (long)math.round(p.Lat * 1e5));
            double3 E((double Lon, double Lat) p) => CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            foreach (var m in maat)
                foreach (var rengas in m.Renkaat)
                    for (int i = 0; i < rengas.Length; i++)
                    {
                        var a = rengas[i];
                        var b = rengas[(i + 1) % rengas.Length];
                        var qa = Q(a); var qb = Q(b);
                        if (qa == qb) continue;
                        var avain = qa.CompareTo(qb) < 0 ? (qa.Item1, qa.Item2, qb.Item1, qb.Item2) : (qb.Item1, qb.Item2, qa.Item1, qa.Item2);
                        if (!nahty.Add(avain)) continue;
                        ulos.Add((E(a), E(b)));
                    }
            return ulos;
        }

        /// <summary>Janat kaarista ([[lon, lat], …] kukin), rajauksen ulkopuoliset pois.</summary>
        List<(double3 a, double3 b)> JanatKaarista(List<object> kaaret, Vector4 r4, bool rajattu)
        {
            var ulos = new List<(double3, double3)>();
            double3 E(double lon, double lat) => CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
            foreach (var k in kaaret)
            {
                if (!(k is List<object> pisteet) || pisteet.Count < 2) continue;
                double3? edellinen = null;
                foreach (var p in pisteet)
                {
                    if (!(p is List<object> l) || l.Count < 2 || !(l[0] is double lon) || !(l[1] is double lat)) { edellinen = null; continue; }
                    bool sisalla = !rajattu || (lon >= r4.x && lon <= r4.z && lat >= r4.y && lat <= r4.w);
                    var e = E(lon, lat);
                    if (edellinen.HasValue && sisalla) ulos.Add((edellinen.Value, e));
                    edellinen = sisalla ? e : (double3?)null;
                }
            }
            return ulos;
        }

        /// <summary>
        /// Janoista nauhaverkko Rajaviiva-varjostimelle: jokainen jana on oma nelikulmionsa. Maakohtaisessa kerroksessa
        /// maan vaihto korvaa verkon (vanha tuhotaan).
        /// </summary>
        void TeeRajat(List<(double3 a, double3 b)> janat)
        {
            if (rajat == null && janat.Count == 0) return;
            int n = janat.Count;
            var paikat = new Vector3[n * 4];
            var toiset = new Vector3[n * 4];
            var puolet = new Vector2[n * 4];
            var kolmiot = new int[n * 6];
            for (int i = 0; i < n; i++)
            {
                Vector3 a = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(janat[i].a);
                Vector3 b = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(janat[i].b);
                Vector3 jatko = b + (b - a); // b-pään kärjille sama suunta kuin a-päälle
                int v = i * 4;
                paikat[v] = a; paikat[v + 1] = a; paikat[v + 2] = b; paikat[v + 3] = b;
                toiset[v] = b; toiset[v + 1] = b; toiset[v + 2] = jatko; toiset[v + 3] = jatko;
                puolet[v] = new Vector2(-1, 0); puolet[v + 1] = new Vector2(1, 0);
                puolet[v + 2] = new Vector2(-1, 0); puolet[v + 3] = new Vector2(1, 0);
                int t = i * 6;
                kolmiot[t] = v; kolmiot[t + 1] = v + 1; kolmiot[t + 2] = v + 2;
                kolmiot[t + 3] = v + 1; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
            }
            var mesh = new Mesh { name = "Aluerajat", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.vertices = paikat;
            mesh.SetUVs(0, toiset);
            mesh.SetUVs(1, puolet);
            mesh.triangles = kolmiot;
            mesh.RecalculateBounds();
            if (rajat != null)
            {
                var mf = rajat.GetComponent<MeshFilter>();
                var vanha = mf.sharedMesh;
                mf.sharedMesh = mesh;
                if (vanha != null) Destroy(vanha);
                return;
            }
            var go = new GameObject("Aluerajat");
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            rajat = go.AddComponent<MeshRenderer>();
            rajaOma = new Material(rajaMateriaali);
            rajaOma.renderQueue = rajaMateriaali.renderQueue + jonoLisa;
            float kerroin = PalloKierto.Pistekerroin;
            rajaOma.SetFloat("_Kerroin", kerroin);
            if (maakohtainen) rajaOma.SetFloat("_Paksuus", 0f); // LateUpdate asettaa tiheydestä (löydös 113)
            rajat.sharedMaterial = rajaOma;
            rajat.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            rajat.receiveShadows = false;
            rajat.enabled = false;
            PaivitaPaletti();
        }

        /// <summary>Perussävyn reuna × häive (kaukana 0, lähellä 1); maakunnissa webin rajamuste (löydös 113).</summary>
        void AsetaRajanVari()
        {
            if (rajaOma == null) return;
            if (maakohtainen)
            {
                var m = Viivaleveys.AluerajaMuste;
                bool lin = QualitySettings.activeColorSpace == ColorSpace.Linear;
                // Löydös 113 jatko: oletusrajat ilman täyttöä webin täydellä rasterirajalla (0,45), täytön kanssa 0,297.
                double peitto = Viivaleveys.AluerajaPeitto(TayttoNakyy, lin);
                // Color on sRGB-arvoina; URP muuntaa _BaseColorin lineaariseksi lineaarisessa projektissa.
                rajaOma.SetColor("_BaseColor", new Color((float)m[0], (float)m[1], (float)m[2], (float)peitto * rajaAlfa * rajaHaive * saapumisKerroin));
                return;
            }
            rajaOma.SetColor("_BaseColor", new Color(perus.Reuna.R, perus.Reuna.G, perus.Reuna.B, perus.Reuna.A * rajaHaive * saapumisKerroin));
        }

        /// <summary>Ruudun tiheys (px/°) viimeksi, kun vektorirajat olivat mahdollisia (tila-komennot, mittarit).</summary>
        public float RajaTiheys => rajaTiheys;
        /// <summary>Vektorirajojen peiton kerroin 0–1 (0 = piilossa: kaukana, linssissä tai tila pois).</summary>
        public float RajaHaive => rajaHaive;
        /// <summary>Maakuntarajan webin mukainen leveys laitepikseleinä (löydös 113; 0 = alle z6:n tai ei mitattu).</summary>
        public float RajaLaitePx => rajaLaitePx;

        /// <summary>Täytön häive alusta (web haivyta: peitto 0 → 0,34 ease-out 260 ms).</summary>
        void AloitaHaive()
        {
            haiveAlku = Time.unscaledTime;
            haive = 0f;
            if (kuori != null) kuori.sharedMaterial.SetFloat("_Haive", 0f);
        }


        void PaivitaHaive()
        {
            if (haiveAlku < 0f || kuori == null) return;
            haive = (float)Maakuntajako.Haive(Time.unscaledTime - haiveAlku);
            kuori.sharedMaterial.SetFloat("_Haive", haive);
            if (haive >= 1f) haiveAlku = -1f;
        }

        void LateUpdate()
        {
            if (maakohtainen) PaivitaHaive();
            if (maakohtainen) PaivitaHeratys();
            bool saapuminenMuuttui = PaivitaSaapuminen();
            rajaHaiveLiikkuu = false;
            if (rajaOma == null || rajat == null || georeferenssi == null) return;
            if (saapuminenMuuttui) AsetaRajanVari();
            bool sallittu = NakyyNyt;
            if (!sallittu && rajaHaive <= 0f && !rajat.enabled) return;
            // Löydös 74 d: vakioleveä viiva (Rajaviiva _Paksuus pisteinä) sulaa kaukana läiskäksi, joten rajat vasta
            // webin rajojen tiheydestä (Viivaleveys.AluerajaHaive). Kaksi sädettä kehyksessä (Pintaosuma.Tiheys).
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : Camera.main;
            rajaTiheys = sallittu ? Pintaosuma.Tiheys(georeferenssi, kamera) : 0f;
            // Maakunnat: webin rasteriraja vasta z6:sta (tiheys yli 60 laitepx/°).
            double minTiheys = maakohtainen ? Math.Max(rajatMinTiheys, Viivaleveys.AluerajaMinTiheys) : rajatMinTiheys;
            float uusi = Viivaleveys.AluerajaHaive(rajaHaive, sallittu, rajaTiheys, minTiheys, Time.unscaledDeltaTime);
            bool muuttui = uusi != rajaHaive;
            rajaHaiveLiikkuu = muuttui;
            rajaHaive = uusi;
            if (maakohtainen && rajaHaive > 0f && rajaTiheys > 0f)
            {
                // Leveys webin tason säännöstä näkymän keskikohdan leveysasteella.
                var keski = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
                double lat = Pintaosuma.Osuma(georeferenssi, kamera, keski, out _, out double l) ? l : 0.0;
                float k = PalloKierto.Pistekerroin;
                float px = (float)Viivaleveys.AluerajaLaitePx(rajaTiheys, lat);
                var (pt, alfa) = Viivaleveys.AluerajaPiirto(px, k);
                if (px != rajaLaitePx || (float)alfa != rajaAlfa)
                {
                    rajaLaitePx = px;
                    rajaAlfa = (float)alfa;
                    rajaOma.SetFloat("_Paksuus", (float)pt);
                    muuttui = true;
                }
            }
            if (muuttui) AsetaRajanVari();
            rajat.enabled = rajaHaive > 0f;
            if (!rajat.enabled) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            rajaOma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
        }

        /// <summary>Tasakulmainen ellipsoidikuori: rivit pohjoisesta etelään, uv = (lon, 0 pohjoisessa … 1 etelässä).</summary>
        Mesh Verkko(int sektoreita, int kehia)
        {
            int n = (kehia + 1) * (sektoreita + 1);
            var paikat = new Vector3[n];
            var uv = new Vector2[n];
            int i = 0;
            for (int k = 0; k <= kehia; k++)
            {
                double lat = 90.0 - 180.0 * k / kehia;
                for (int s = 0; s <= sektoreita; s++)
                {
                    double lon = -180.0 + 360.0 * s / sektoreita;
                    double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
                    paikat[i] = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                    // Tunnuskartan rivi 0 on pohjoisin (SetPixelData: v = 0), joten v kasvaa etelään.
                    uv[i] = new Vector2((float)s / sektoreita, (float)k / kehia);
                    i++;
                }
            }
            var kolmiot = new int[kehia * sektoreita * 6];
            int t = 0;
            for (int k = 0; k < kehia; k++)
                for (int s = 0; s < sektoreita; s++)
                {
                    int a = k * (sektoreita + 1) + s, b = a + 1, c = a + sektoreita + 1, d = c + 1;
                    // Etupuoli ulospäin (Unityn vasenkätinen kierto georeferenssin akseleilla;
                    // varmistettu iPadilla: väärä kierto näytti takapuolen maat peilattuina).
                    kolmiot[t++] = a; kolmiot[t++] = b; kolmiot[t++] = c;
                    kolmiot[t++] = b; kolmiot[t++] = d; kolmiot[t++] = c;
                }
            var m = new Mesh { name = "Maakuori", indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            m.vertices = paikat;
            m.uv = uv;
            m.triangles = kolmiot;
            m.RecalculateBounds();
            return m;
        }
    }
}
