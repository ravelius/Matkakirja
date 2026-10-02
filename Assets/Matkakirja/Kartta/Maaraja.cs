using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Maat;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// PELAAJAN MAAN ÄÄRIVIIVA (omistajan build 5 -löydös 2, osa 3; web on oletus): webin pallon
    /// korostuskehä (js/pallovektorit.js korostaMaa, kutsujana js/maanaariviivat.js). Muiden maiden
    /// rajat piirtää Rajat-kerros (vektorina), joten tässä piirretään vain nykyinen maa.
    ///
    /// Webin säännöt: muste RAJA_MUSTE #6b5539 täytenä (KOROSTUS_PEITTO 1), yhtenäinen viiva,
    /// leveys VEKTORIT_KOROSTUS_LEVEYS_CSS [1,6; 3] css-px liukuen ruudun tiheyden mukaan
    /// (VEKTORIT_LEVEYS_TIHEYS 25–250 laitepikseliä leveysastetta kohti ruudun keskellä, mitattuna
    /// 40 css-px:n matkalta alaspäin), renkaat, joiden laatikon lävistäjä ruudulla jää alle
    /// KOROSTUKSEN_PIENIN_RENGAS_PX 10 laitepikselin, pois. Uusi kehä häivytetään sisään
    /// VEKTORIT_HAIVE_MS 260 ms (ease-out, 1 − (1 − t)³); vanha poistuu heti (vapautaKorostus).
    /// Kehä pois linssin ajaksi samalla portilla kuin kaupunkipisteet (lauta.js linssiPaalla).
    ///
    /// LÖYDÖS 127 (omistaja 25.9.2026 klo 22.3x, build 16 → 17, sitova): "Maanraja vain kahden maan välillä, ei niiltä
    /// osin, joissa maa loppuu mereen; raja joka tapauksessa kevyempi." Kaksi muutosta webin korostukseen:
    ///  1. VAIN MAA–MAA-RAJAT: kehä piirretään Karttasepän maa–maa-rajoista (<see cref="MaamaaPolku"/>, PR #3248:
    ///     samat kärjet kuin maapolygonit.geojsonissa, rannikko-osuudet pois; saarimaat tyhjiä, sisämaa kuten CHE koko
    ///     renkaana) AVOIMINA viivoina (Kehaviivat: ei sulkevaa janaa). Jos tiedosto ei lataudu, varana vanha polku:
    ///     koko rengas maapolygonit.geojsonista (<see cref="GeojsonPolku"/>) ja sen puuttuessa sisältöpaketin
    ///     maarajat.json. Komento "maaraja rengas paalle" näyttää vanhan koko renkaan vertailuun.
    ///  2. KEVYEMPI: leveys ja peitto painosta <see cref="Paino"/> (Viivaleveys.KehanPaino; oletus Kevyt, webin korostus
    ///     komennolla "maaraja paino web"). Webissä ei ole kevyempää vastinetta (ks. Viivaleveys).
    ///
    /// Maa: sama kuin väritasolla (<see cref="Varitaso.Kohde"/>), koska webissä korostusIso ohjaa
    /// molempia. Kohde eikä Varitaso.Maa: maa ilman värisarjaa (RUS, ISL …) saa silti kehän,
    /// kuten webissä, jossa kehä tulee maapolygoneista eikä värilaatoista. Ilman väritasoa sama
    /// sääntö suoraan NostoKerrokselta (matkalla edellinen maa säilyy).
    ///
    /// Aineisto (omistajan build 7 -löydös 22 kohta 2: kehän oltava yhtä tarkka kuin webissä): sama
    /// lähde kuin webin kehällä, assets/data/maapolygonit.json (Natural Earth 10m admin-0, DP 0,2
    /// lautayksikköä, rannikko GSHHG full), jonka Karttaseppä muunsi lon/lat-GeoJSONiksi ämpäriin
    /// (<see cref="GeojsonPolku"/>, 135 maata, ~497 000 pistettä, ominaisuus "iso" = ISO3), ja siitä jaettu
    /// maamaa.geojson (MultiLineString). Haetaan laattapalvelimen kautta (offline-kansio → välimuisti → verkko) ja
    /// jäsennetään kerran taustasäikeessä omalla kevyellä lukijalla (<see cref="Geojson"/>) maittain tauluksi.
    /// Nauha piirretään Rajaviiva-varjostimella omalla materiaalikopiolla.
    ///
    /// LÖYDÖS 46 JATKO (omistajan kuva Kreikasta, build 11: "paksu tumma kehä rantojen ympärillä"): leveys on jo webin
    /// arvo (Viivaleveys: 1,6–3 pt × Pistekerroin = webin css × dpr, peitto 1, #6b5539), mutta kuvassa kehä oli noin
    /// 8,6 laitepikseliä 6:n sijaan. Syy: janojen neliöjatke porrasmaisilla rannoilla täytti kulmat; web piirtää
    /// korostuksen päätypyörylöillä. Rajaviiva-varjostin tekee nyt pyöreät päät (myös avoimen viivan päihin).
    ///
    /// RAJA JA RANNAT (omistaja 29.9.2026, sitova; korvaa Painon/KehaPt-lain ja musteen #6b5539): kaksi kerrosta samalla
    /// musteella #5a4330 (Rannikko.RantaMuste). 1) MAA–MAA-RAJA: aineisto <see cref="MaamaaPolku"/> (avoimet viivat, kuten
    /// ennen), leveys kiinteä <see cref="RajaPt"/> 2,2 pt, webin peitto <see cref="RajaPeitto"/> 0,50 (natiivin lineaarinen
    /// <see cref="RajaPeittoNatiivi"/>). 2) KAIKKI RANNAT SAARINEEN: sama maa, kaikki renkaat maapolygonit.geojsonista
    /// (<see cref="GeojsonPolku"/>, suljettuina) rajan alle (renderQueue <see cref="Jono"/> − 1), leveys kiinteä
    /// <see cref="RantaPt"/> 1,2 pt, peitto <see cref="RantaPeitto"/> 0,22 (<see cref="RantaPeittoNatiivi"/>). Ei yleistystä,
    /// pienten renkaiden karsinta (<see cref="PieninRengasPx"/>) ennallaan. Vara: jos maamaa ei lataudu, rajan nauha on koko
    /// rengas kuten ennen ja rannat piirtyvät silti. Komento "maaraja paksuus" ohittaa yhä rajan leveyden; "maaraja paino"
    /// ei enää vaikuta (Paino jäi vain komennon yhteensopivuudeksi).
    /// </summary>
    public class Maaraja : MonoBehaviour
    {
        /// <summary>
        /// Rajan ja rantojen muste (omistaja 29.9.2026): rantaviivan sepia #5a4330 (Rannikko.RantaMuste = Vektorisolut.RantaMuste),
        /// sRGB. Ennen webin RAJA_MUSTE #6b5539.
        /// </summary>
        public static readonly Color Muste = Rannikko.RantaMuste;
        /// <summary>Maa–maa-rajan leveys pisteinä (omistaja 29.9.2026), kiinteä; laitepikselit = pt × PalloKierto.Pistekerroin.</summary>
        public const float RajaPt = 2.2f;
        /// <summary>Maa–maa-rajan peitto webin sRGB-sekoituksena.</summary>
        public const float RajaPeitto = 0.50f;
        /// <summary>Rantojen (kaikki renkaat saarineen) leveys pisteinä, kiinteä.</summary>
        public const float RantaPt = 1.2f;
        /// <summary>Rantojen peitto webin sRGB-sekoituksena.</summary>
        public const float RantaPeitto = 0.22f;
        /// <summary>Peitot natiivin lineaariseen sekoitukseen (kuten Rannikko.PeittoNatiivi, KaupunkiMerkit.KaupunkiPeittoNatiivi).</summary>
        public static readonly float RajaPeittoNatiivi = (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, RajaPeitto);
        public static readonly float RantaPeittoNatiivi = (float)Vektorisolut.LineaarinenPeitto(Vektorisolut.RantaMuste, RantaPeitto);
        /// <summary>
        /// Webin leveys css-pikseleinä [kaukana, lähellä] (web VEKTORIT_KOROSTUS_LEVEYS_CSS; paino Web). Löydös 127:n jälkeen
        /// käytössä oleva leveys tulee painosta (Viivaleveys.KehaPt).
        /// </summary>
        public static readonly Vector2 LeveysCss = new Vector2((float)Viivaleveys.KorostusKaukana, (float)Viivaleveys.KorostusLahella);
        /// <summary>Tiheyden liukuma laitepikseleinä astetta kohti (web VEKTORIT_LEVEYS_TIHEYS).</summary>
        public static readonly Vector2 LeveysTiheys = new Vector2((float)Viivaleveys.TiheysKaukana, (float)Viivaleveys.TiheysLahella);
        /// <summary>Häive sisään sekunteina (web VEKTORIT_HAIVE_MS).</summary>
        public const float HaiveSek = 0.26f;
        /// <summary>Pienin piirrettävä rengas laitepikseleinä (web KOROSTUKSEN_PIENIN_RENGAS_PX).</summary>
        public const float PieninRengasPx = 10f;
        /// <summary>Tiheyden mittamatka css-pikseleinä (web LEPOKERROS_MITTAMATKA_PX).</summary>
        public const float MittamatkaCss = 40f;
        /// <summary>
        /// Piirtojärjestys: Cesium-laattojen ja väritason (läpinäkymättömät) sekä maatäyttöjen
        /// (Transparent−10/−9) ja aluerajojen (−8/−7) päällä, reittien ja karttavalojen (Transparent),
        /// kaupunkipisteiden (+1), nimiöiden (3005) ja nappulan (+20) alla. Rantanauha piirtyy yhtä alempana (Jono − 1).
        /// </summary>
        public const int Jono = 2995;
        /// <summary>
        /// Kehän koko renkaat ämpärissä (Karttasepän maapolygonit.geojson, content-encoding gzip): löydös 127:n jälkeen
        /// VARA, jos <see cref="MaamaaPolku"/> ei lataudu, ja komento "maaraja rengas paalle". Myös offline-latauksen
        /// "maailma"-alueessa (Alueet.Polut).
        /// </summary>
        public const string GeojsonPolku = "julisteet/pallo/vektorit/maapolygonit-2026-09-30/maapolygonit.geojson";
        /// <summary>
        /// Maa–maa-rajat (löydös 127, Karttaseppä 25.9.2026, PR #3248; tools/maarajat-maamaa.mjs): FeatureCollection,
        /// properties.iso = ISO3, MultiLineString lon/lat, samat kärjet kuin <see cref="GeojsonPolku"/>issa mutta vain
        /// osuudet, joiden toisella puolella on toinen maa (myös pelin ulkopuoliset naapurit). Gzip, 307 kt. Myös
        /// offline-latauksen "maailma"-alueessa. 2026-09-30: Krim ja Sevastopol Ukrainalle (Karttaseppä, Päätoimittaja).
        /// </summary>
        public const string MaamaaPolku = "julisteet/pallo/vektorit/maarajat-2026-09-30/maamaa.geojson";

        /// <summary>Kehä sallittu (komento "maaraja pois" = false; oletus true).</summary>
        public static bool Sallittu = true;
        /// <summary>
        /// Kehä myös vektorirannan kanssa. Oletus true: KOTIMAAN KOROSTUS (omistajan build 13 -lista 25.9.2026 ja
        /// Linssisepän kierros 3 rivi 39, web lauta.js paivitaPallonMaakorostus): kotimaa kehällä kuten webissä. Kehä
        /// piirtyy rannan alle (Jono 2995 &lt; Rannikko.RantaJono 2997). Löydösten 126–127 jälkeen rantaviiva on oletuksena
        /// pois ja kehä kulkee vain maiden välillä, joten rannikolla ei ole kumpaakaan.
        /// Korvaa 25.9. klo 00.0x:n päätöksen (kehä pois, kun Rannikko piirtyy). Komento "maaraja pois" vertailuun.
        /// </summary>
        public static bool Pakota = true;
        /// <summary>Kiinteä leveys pisteinä (komento "maaraja paksuus &lt;pt&gt;"); NaN tai ≤ 0 = <see cref="RajaPt"/> (omistaja 29.9.2026); koskee vain maa–maa-rajaa, ei rantoja.</summary>
        public static float PaksuusPt = float.NaN;
        /// <summary>
        /// EI ENÄÄ VAIKUTA (omistaja 29.9.2026: kiinteät <see cref="RajaPt"/>/<see cref="RantaPt"/> ja peitot); jäi vain
        /// komennon "maaraja paino" yhteensopivuudeksi. Löydös 127: kehän paino. Oletus Kevyt ([1,0; 1,8] pt, peitto 0,8); omistaja valitsee kuvaparista
        /// (lokit/rajat-126-128), ja valinta vaihdetaan tähän. Komento "maaraja paino web|kevyt|kevein|oletus".
        /// </summary>
        public const Viivaleveys.KehanPaino OletusPaino = Viivaleveys.KehanPaino.Kevyt;
        public static Viivaleveys.KehanPaino Paino = OletusPaino;
        /// <summary>
        /// Koko rengas rannikkoineen kuten build 16:ssa (komento "maaraja rengas paalle|pois", vertailuun); oletus false =
        /// vain maa–maa-rajat (löydös 127).
        /// </summary>
        public static bool KokoRengas;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut() { Sallittu = true; Pakota = true; PaksuusPt = float.NaN; Paino = OletusPaino; KokoRengas = false; }

        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public Varitaso varitaso;
        /// <summary>Rajaviiva-materiaali (sama kuin maakuntien rajoilla); tästä tehdään oma kopio.</summary>
        public Material materiaali;
        [Tooltip("Viivan korkeus ellipsoidin yläpuolella, metreinä (web VEKTORIT_KORKEUS 0).")]
        public double korkeus = 0.0;

        /// <summary>Maa (ISO3), jonka ääriviiva on nyt piirretty, tai null.</summary>
        public string Maa { get; private set; }

        /// <summary>Koko renkaat (maapolygonit.geojson tai varana maarajat.json) maittain; ladataan vain tarvittaessa.</summary>
        Dictionary<string, List<(double Lon, double Lat)[]>> renkaat;
        /// <summary>Maa–maa-rajat avoimina viivoina (maamaa.geojson) maittain.</summary>
        Dictionary<string, List<(double Lon, double Lat)[]>> maamaa;
        bool renkaatHaussa, maamaaHaussa;
        /// <summary>maapolygonit.geojson (ja sen vara maarajat.json) ei latautunut: rantoja ei piirretä eikä haeta uudelleen.</summary>
        bool renkaatPuuttuu;
        /// <summary>maamaa.geojson ei latautunut (tai oli tyhjä): varana koko rengas, vanha polku.</summary>
        bool maamaaPuuttuu;
        string haluttu;
        /// <summary>Viimeksi aloitettu rakennus: maa ja lähde (true = koko rengas).</summary>
        string kohdeMaa;
        bool kohdeKoko, kohdeAsetettu;
        Coroutine rakennus, rakennusRanta;
        /// <summary>Yksi nauhakerros (oma lapsi-GameObject, Mesh ja materiaalikopio, oma häive).</summary>
        sealed class Kerros
        {
            public MeshRenderer Piirto;
            public MeshFilter Suodatin;
            public Material Oma;
            public bool NakyiEdella;
            public float HaiveAlku = -1f;
        }
        /// <summary>Maa–maa-raja (Jono) ja rannat saarineen (Jono − 1).</summary>
        readonly Kerros raja = new Kerros(), ranta = new Kerros();
        bool linssit, piilossa;
        /// <summary>Rantanauhan viimeksi aloitettu maa.</summary>
        string rantaMaa;
        bool rantaAsetettu;

        // LÄMPÖERÄ (PallonLepo): uuden kehän häive 260 ms; kehän katoaminen on yksittäinen muutos (LateUpdate).
        void OnEnable() => PallonLepo.Animoi(Haivyttaa, "maaraja");
        void OnDisable() => PallonLepo.Poista(Haivyttaa);
        static bool Haiveessa(Kerros k) => k.Piirto != null && k.Piirto.enabled && k.HaiveAlku >= 0f && Time.unscaledTime - k.HaiveAlku < HaiveSek;
        bool Haivyttaa() => Haiveessa(raja) || Haiveessa(ranta);

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (varitaso == null) varitaso = GetComponent<Varitaso>();
        }

        void OnDestroy()
        {
            Vapauta(raja);
            Vapauta(ranta);
            if (raja.Oma != null) Destroy(raja.Oma);
            if (ranta.Oma != null) Destroy(ranta.Oma);
        }

        // ---- Näkyvyys (KarttaKerrokset.Nakyvyys) ----

        /// <summary>Oma kytkin: "aariviiva".</summary>
        public void Nakyvat(bool nakyy) => piilossa = !nakyy;
        /// <summary>Piilotettu Nakyvat(false):lla (lentopeli palauttaa aiemman tilan).</summary>
        public bool Piilossa => piilossa;

        /// <summary>Linssin portti (web: kehä pois linssin ajaksi, samalla portilla kuin kaupunkipisteet).</summary>
        public void Linssit(bool paalla) => linssit = paalla;

        /// <summary>
        /// Kotimaan korostus (Linssisepän kierros 3 rivi 39): vertailu- ja maatietolinssissä kehä näkyy kuten webissä
        /// (vain aikajana piilottaa sen, lauta.js:5089). Oma lippu, koska "kaupungit"-portti (Linssit) asettuu
        /// linssin aikana uudelleen muualta. LinssiOhjain.Pelikerrokset asettaa ja purkaa.
        /// </summary>
        public void SallittuLinssissa(bool sallittu) => linssissaSallittu = sallittu;
        bool linssissaSallittu;

        // ---- Maa ----

        string PelaajanMaa()
        {
            if (varitaso != null) return varitaso.Kohde;
            var nk = NostoKerros.Instanssi;
            string nyt = nk != null ? nk.NykyinenMaa : null;
            // Matkalla (ei lähintä kaupunkia) edellinen maa säilyy kuten väritasolla.
            return !string.IsNullOrEmpty(nyt) ? nyt : haluttu;
        }

        void Update()
        {
            if (materiaali == null) return;
            string maa = PelaajanMaa();
            haluttu = maa;
            // Löydös 127: maa–maa-rajat (maamaa.geojson); varana ja komennolla koko rengas (vanha polku).
            bool koko = KokoRengas || maamaaPuuttuu;
            // Omistajan linjaus 29.9.2026: rannat saarineen piirretään aina, joten renkaat ladataan rinnakkain maamaan kanssa.
            if (renkaat == null && !renkaatHaussa && !renkaatPuuttuu) StartCoroutine(LataaRenkaat());
            if (!koko && maamaa == null && !maamaaHaussa) StartCoroutine(LataaMaamaa());
            PaivitaRaja(maa, koko);
            PaivitaRanta(maa);
        }

        void PaivitaRaja(string maa, bool koko)
        {
            var lahde = koko ? renkaat : maamaa;
            if (lahde == null) return;
            if (kohdeAsetettu && maa == kohdeMaa && koko == kohdeKoko) return;
            kohdeAsetettu = true;
            kohdeMaa = maa;
            kohdeKoko = koko;
            if (rakennus != null) StopCoroutine(rakennus);
            rakennus = StartCoroutine(Rakenna(maa, lahde, koko));
        }

        void PaivitaRanta(string maa)
        {
            if (renkaat == null) return;
            if (rantaAsetettu && maa == rantaMaa) return;
            rantaAsetettu = true;
            rantaMaa = maa;
            if (rakennusRanta != null) StopCoroutine(rakennusRanta);
            rakennusRanta = StartCoroutine(RakennaRanta(maa));
        }

        /// <summary>
        /// Lataa GeoJSONin laattapalvelimen kautta ja jäsentää sen taustasäikeessä (null, jos ei tullut tai oli tyhjä).
        /// Palvelin tallentaa ja palauttaa raakatavut ilman Content-Encoding-otsaketta: jos ämpäri antoi gzipin eikä
        /// UnityWebRequest purkanut sitä, tavut alkavat 0x1f 0x8b ja ne puretaan tässä.
        /// </summary>
        static IEnumerator LataaGeojson(string polku, string nimi, string vara,
            System.Action<Dictionary<string, List<(double Lon, double Lat)[]>>> valmis)
        {
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
            byte[] tavut = null;
            using (var pyynto = UnityWebRequest.Get(Laattapalvelin.Paikallinen(Laattapalvelin.Ampari + polku)))
            {
                pyynto.timeout = 45;
                yield return pyynto.SendWebRequest();
                if (pyynto.result == UnityWebRequest.Result.Success) tavut = pyynto.downloadHandler.data;
                else Debug.LogWarning($"MATKAKIRJA ääriviiva: {nimi} ei latautunut ({pyynto.responseCode} {pyynto.error}), varana {vara}");
            }
            if (tavut != null && tavut.Length > 0)
            {
                long kesto = 0;
                var tehtava = Task.Run(() =>
                {
                    var kello = System.Diagnostics.Stopwatch.StartNew();
                    tulos = Geojson.Lue(Geojson.Pura(tavut));
                    kesto = kello.ElapsedMilliseconds;
                });
                while (!tehtava.IsCompleted) yield return null;
                tavut = null;
                if (tehtava.IsFaulted)
                {
                    Debug.LogError($"MATKAKIRJA ääriviiva: {nimi} jäsennys kaatui: " + tehtava.Exception?.GetBaseException());
                    tulos = null;
                }
                else if (tulos.Count == 0)
                {
                    Debug.LogWarning($"MATKAKIRJA ääriviiva: {nimi} tyhjä, varana {vara}");
                    tulos = null;
                }
                else
                {
                    int viivat = 0, pisteet = 0;
                    foreach (var m in tulos.Values) foreach (var r in m) { viivat++; pisteet += r.Length; }
                    Debug.Log($"MATKAKIRJA ääriviiva: {nimi}, {tulos.Count} maata, {viivat} viivaa, {pisteet} pistettä, jäsennys {kesto} ms");
                }
            }
            valmis(tulos);
        }

        /// <summary>Löydös 127: Karttasepän maa–maa-rajat. Epäonnistuessa Update siirtyy vanhaan polkuun (koko rengas).</summary>
        IEnumerator LataaMaamaa()
        {
            maamaaHaussa = true;
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
            yield return LataaGeojson(MaamaaPolku, "maamaa.geojson", "koko rengas (maapolygonit.geojson)", t => tulos = t);
            maamaaHaussa = false;
            if (tulos != null) maamaa = tulos;
            else maamaaPuuttuu = true;
        }

        /// <summary>Vanha polku: koko renkaat maapolygonit.geojsonista, varana sisältöpaketin karkea maarajat.json.</summary>
        IEnumerator LataaRenkaat()
        {
            renkaatHaussa = true;
            Dictionary<string, List<(double Lon, double Lat)[]>> tulos = null;
            // 1. Webin tarkka aineisto.
            yield return LataaGeojson(GeojsonPolku, "maapolygonit.geojson", "maarajat.json", t => tulos = t);

            // 2. Vara: sisältöpaketin karkea maarajat.json (kuten MaaKartta).
            if (tulos == null)
            {
                string teksti = null;
                yield return Sisalto.HaeTeksti("maarajat", t => teksti = t, true);
                if (teksti == null) { Debug.LogWarning("MATKAKIRJA ääriviiva: maarajat.json puuttuu tästä paketista"); renkaatHaussa = false; renkaatPuuttuu = true; yield break; }
                var tehtava = Task.Run(() =>
                {
                    var aineisto = MaatAineisto.LueRajat(Peli.MiniJson.Jasenna(teksti));
                    tulos = new Dictionary<string, List<(double Lon, double Lat)[]>>(System.StringComparer.Ordinal);
                    foreach (var p in aineisto.Maat) tulos[p.Key] = p.Value.Renkaat;
                });
                while (!tehtava.IsCompleted) yield return null;
                if (tehtava.IsFaulted)
                {
                    Debug.LogError("MATKAKIRJA ääriviiva: maarajojen luku kaatui: " + tehtava.Exception?.GetBaseException());
                    renkaatHaussa = false;
                    renkaatPuuttuu = true;
                    yield break;
                }
            }
            renkaat = tulos;
            renkaatHaussa = false;
        }

        /// <summary>
        /// Kehä maalle: koko = renkaat (suljetaan), muuten maa–maa-rajojen avoimet viivat. Maa ilman viivoja (saarimaa
        /// maamaa.geojsonissa, tai maa aineiston ulkopuolella) jää ilman kehää.
        /// </summary>
        IEnumerator Rakenna(string maa, Dictionary<string, List<(double Lon, double Lat)[]>> lahde, bool koko)
        {
            // Vanha kehä pois heti (web vapautaKorostus), uusi häivytetään sisään.
            Vapauta(raja);
            Maa = null;
            if (string.IsNullOrEmpty(maa) || !lahde.TryGetValue(maa, out var viivat) || viivat.Count == 0)
            {
                if (!string.IsNullOrEmpty(maa))
                    Debug.Log(koko ? $"MATKAKIRJA ääriviiva: {maa} ei aineistossa"
                                   : $"MATKAKIRJA ääriviiva: {maa} ei maa–maa-rajoja (saarimaa tai ei aineistossa), ei kehää");
                rakennus = null;
                yield break;
            }
            // Verkon taulukot taustasäikeessä; ECEF → georeferenssin paikallinen samalla matriisilla
            // kuin TransformEarthCenteredEarthFixedPositionToUnity (luetaan pääsäikeessä).
            double h = korkeus;
            double4x4 ecefPaikalliseksi = georeferenssi.ecefToLocalMatrix;
            bool avoimet = !koko;
            Nauha nauha = null;
            var tehtava = Task.Run(() => nauha = TeeTaulukot(viivat, avoimet, h, ecefPaikalliseksi));
            while (!tehtava.IsCompleted) yield return null;
            rakennus = null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA ääriviiva: " + tehtava.Exception?.GetBaseException()); yield break; }
            if (maa != kohdeMaa || koko != kohdeKoko || nauha.Janoja == 0) yield break;
            TeeNauha(raja, nauha, Jono, "Maaraja");
            Maa = maa;
            raja.HaiveAlku = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA ääriviiva: {maa}, {viivat.Count} {(koko ? "rengasta (koko rengas)" : "maa–maa-rajaviivaa")}, " +
                      $"{nauha.Janoja} janaa, leveys {(PaksuusPt > 0 ? PaksuusPt : RajaPt)} pt, peitto {RajaPeitto} (natiivi {RajaPeittoNatiivi:0.###})");
        }

        /// <summary>
        /// Rannat saarineen (omistaja 29.9.2026): kaikki maan renkaat maapolygonit.geojsonista suljettuina, rajan alle.
        /// Maa aineiston ulkopuolella jää ilman rantoja.
        /// </summary>
        IEnumerator RakennaRanta(string maa)
        {
            Vapauta(ranta);
            if (string.IsNullOrEmpty(maa) || !renkaat.TryGetValue(maa, out var viivat) || viivat.Count == 0)
            {
                if (!string.IsNullOrEmpty(maa)) Debug.Log($"MATKAKIRJA ääriviiva: {maa} ei aineistossa, ei rantoja");
                rakennusRanta = null;
                yield break;
            }
            double h = korkeus;
            double4x4 ecefPaikalliseksi = georeferenssi.ecefToLocalMatrix;
            Nauha nauha = null;
            var tehtava = Task.Run(() => nauha = TeeTaulukot(viivat, false, h, ecefPaikalliseksi));
            while (!tehtava.IsCompleted) yield return null;
            rakennusRanta = null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA ääriviiva (rannat): " + tehtava.Exception?.GetBaseException()); yield break; }
            if (maa != rantaMaa || nauha.Janoja == 0) yield break;
            TeeNauha(ranta, nauha, Jono - 1, "Maaraja-rannat");
            ranta.HaiveAlku = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA ääriviiva: {maa}, {viivat.Count} rantarengasta, {nauha.Janoja} janaa, " +
                      $"leveys {RantaPt} pt, peitto {RantaPeitto} (natiivi {RantaPeittoNatiivi:0.###})");
        }

        /// <summary>Nauhaverkon taulukot (rakennetaan taustasäikeessä, Mesh pääsäikeessä).</summary>
        sealed class Nauha
        {
            public int Janoja;
            public Vector3[] Paikat, Toiset;
            public Vector2[] Puolet;
            public int[] Kolmiot;
        }

        /// <summary>WGS84-ellipsoidi (sama kuin CesiumWgs84Ellipsoid): lon/lat/korkeus → ECEF.</summary>
        static double3 Ecef(double lon, double lat, double h)
        {
            const double a = 6378137.0, f = 1.0 / 298.257223563, e2 = f * (2.0 - f);
            double fi = math.radians(lat), la = math.radians(lon);
            double sf = math.sin(fi), cf = math.cos(fi);
            double n = a / math.sqrt(1.0 - e2 * sf * sf);
            return new double3((n + h) * cf * math.cos(la), (n + h) * cf * math.sin(la), (n * (1.0 - e2) + h) * sf);
        }

        /// <summary>
        /// Nauhaverkko Rajaviiva-varjostimelle kuten MaaKartta.TeeRajat; TEXCOORD1.y = janan pää
        /// (−1 a, +1 b) × (1 + viivan lävistäjä asteina), ks. Shaders/Rajaviiva.shader. Lävistäjä on
        /// viivan laatikon lävistäjä asteina (Kehaviivat.Lavistaja: pituus kavennettuna leveyspiirin mukaan,
        /// kuten webin rengasNakyy, sauman yli avattuna). Renkaat suljetaan, avoimet viivat (maa–maa-rajat,
        /// löydös 127) eivät (Kehaviivat.Janoja/Loppu); lyhyt rajanpätkä karsiutuu kaukana kuten pieni rengas.
        /// </summary>
        static Nauha TeeTaulukot(List<(double Lon, double Lat)[]> viivat, bool avoimet, double h, double4x4 m)
        {
            int n = 0;
            foreach (var viiva in viivat)
                if (viiva != null) n += Kehaviivat.Janoja(viiva.Length, avoimet);
            var paikat = new Vector3[n * 4];
            var toiset = new Vector3[n * 4];
            var puolet = new Vector2[n * 4];
            var kolmiot = new int[n * 6];
            Vector3 U(double lon, double lat) => (Vector3)(float3)math.mul(m, new double4(Ecef(lon, lat, h), 1.0)).xyz;
            int i = 0;
            foreach (var viiva in viivat)
            {
                if (viiva == null || viiva.Length < 2) continue;
                float y = 1f + (float)Kehaviivat.Lavistaja(viiva);
                int janoja = Kehaviivat.Janoja(viiva.Length, avoimet);
                Vector3 b = U(viiva[0].Lon, viiva[0].Lat);
                for (int k = 0; k < janoja; k++)
                {
                    var pa = viiva[k];
                    var pb = viiva[Kehaviivat.Loppu(k, viiva.Length, avoimet)];
                    Vector3 a = b;
                    if (pa.Lon == pb.Lon && pa.Lat == pb.Lat) continue; // suljetun renkaan viimeinen piste
                    b = U(pb.Lon, pb.Lat);
                    Vector3 jatko = b + (b - a); // b-pään kärjille sama suunta kuin a-päälle
                    int v = i * 4;
                    paikat[v] = a; paikat[v + 1] = a; paikat[v + 2] = b; paikat[v + 3] = b;
                    toiset[v] = b; toiset[v + 1] = b; toiset[v + 2] = jatko; toiset[v + 3] = jatko;
                    puolet[v] = new Vector2(-1, -y); puolet[v + 1] = new Vector2(1, -y);
                    puolet[v + 2] = new Vector2(-1, y); puolet[v + 3] = new Vector2(1, y);
                    int t = i * 6;
                    kolmiot[t] = v; kolmiot[t + 1] = v + 1; kolmiot[t + 2] = v + 2;
                    kolmiot[t + 3] = v + 1; kolmiot[t + 4] = v + 3; kolmiot[t + 5] = v + 2;
                    i++;
                }
            }
            if (i < n)
            {
                System.Array.Resize(ref paikat, i * 4);
                System.Array.Resize(ref toiset, i * 4);
                System.Array.Resize(ref puolet, i * 4);
                System.Array.Resize(ref kolmiot, i * 6);
            }
            return new Nauha { Janoja = i, Paikat = paikat, Toiset = toiset, Puolet = puolet, Kolmiot = kolmiot };
        }

        void TeeNauha(Kerros k, Nauha nauha, int jono, string nimi)
        {
            var mesh = new Mesh { name = nimi, indexFormat = UnityEngine.Rendering.IndexFormat.UInt32 };
            mesh.vertices = nauha.Paikat;
            mesh.SetUVs(0, nauha.Toiset);
            mesh.SetUVs(1, nauha.Puolet);
            mesh.triangles = nauha.Kolmiot;
            mesh.RecalculateBounds();
            if (k.Piirto == null)
            {
                var go = new GameObject(nimi);
                go.transform.SetParent(georeferenssi.transform, false);
                k.Suodatin = go.AddComponent<MeshFilter>();
                k.Piirto = go.AddComponent<MeshRenderer>();
                k.Piirto.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                k.Piirto.receiveShadows = false;
                k.Oma = new Material(materiaali) { name = nimi, renderQueue = jono };
                k.Oma.SetFloat("_Kerroin", PalloKierto.Pistekerroin);
                k.Oma.SetFloat("_Jatke", 1f);
                k.Oma.SetFloat("_PieninRengas", PieninRengasPx);
                k.Piirto.sharedMaterial = k.Oma;
            }
            k.Suodatin.sharedMesh = mesh;
            k.Piirto.enabled = false; // LateUpdate päättää näkyvyyden ja leveyden samassa kehyksessä
            k.NakyiEdella = false;
        }

        static void Vapauta(Kerros k)
        {
            if (k.Suodatin == null || k.Suodatin.sharedMesh == null) return;
            var m = k.Suodatin.sharedMesh;
            k.Suodatin.sharedMesh = null;
            Destroy(m);
            if (k.Piirto != null) k.Piirto.enabled = false;
        }

        void LateUpdate()
        {
            if (georeferenssi == null || (raja.Piirto == null && ranta.Piirto == null)) return;
            bool rantaPiirtyy = Rannikko.Instanssi != null && Rannikko.Instanssi.Piirtyy;
            bool sallittu = (!linssit || linssissaSallittu) && !piilossa && Sallittu && (Pakota || !rantaPiirtyy);
            bool rajaNakyy = Nakyy(raja, sallittu), rantaNakyy = Nakyy(ranta, sallittu);
            PaivitaNakyvyys(raja, rajaNakyy);
            PaivitaNakyvyys(ranta, rantaNakyy);
            if (!rajaNakyy && !rantaNakyy) return;

            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            Vector3 keskusU = georeferenssi.transform.TransformPoint((float3)keskus);
            float tiheys = Tiheys();
            // Kiinteät leveydet (omistaja 29.9.2026); komento "maaraja paksuus" ohittaa vain rajan leveyden.
            if (rajaNakyy) AsetaKerros(raja, keskusU, tiheys, PaksuusPt > 0 ? PaksuusPt : RajaPt, RajaPeittoNatiivi);
            if (rantaNakyy) AsetaKerros(ranta, keskusU, tiheys, RantaPt, RantaPeittoNatiivi);
        }

        static bool Nakyy(Kerros k, bool sallittu) => k.Piirto != null && k.Suodatin.sharedMesh != null && sallittu;

        /// <summary>Linssin jälkeen kehä palaa häiveellä kuten webissä (korostaMaa → rakennaKorostus(true)).</summary>
        static void PaivitaNakyvyys(Kerros k, bool nakyy)
        {
            if (k.Piirto == null) return;
            if (nakyy && !k.NakyiEdella) k.HaiveAlku = Time.unscaledTime;
            k.NakyiEdella = nakyy;
            if (k.Piirto.enabled != nakyy) PallonLepo.Valmistui("maaraja");
            k.Piirto.enabled = nakyy;
        }

        static void AsetaKerros(Kerros k, Vector3 keskus, float tiheys, float pt, float peittoNatiivi)
        {
            k.Oma.SetVector("_Keskus", keskus);
            k.Oma.SetFloat("_Paksuus", pt);
            k.Oma.SetFloat("_Tiheys", tiheys);
            float h = k.HaiveAlku < 0f ? 1f : Mathf.Clamp01((Time.unscaledTime - k.HaiveAlku) / HaiveSek);
            float alfa = 1f - (1f - h) * (1f - h) * (1f - h);
            var vari = Muste;
            vari.a = alfa * peittoNatiivi;
            k.Oma.SetColor("_BaseColor", vari);
        }

        /// <summary>
        /// Ruudun tiheys laitepikseleinä leveysastetta kohti ruudun keskellä (web nakyvaAlue: keskipiste ja
        /// piste 40 css-px alempana, leveysasteiden ero). 0 = keskus ohi pallon (ohuin pää, kuten webissä).
        /// </summary>
        float Tiheys()
        {
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (kamera == null) kamera = Camera.main;
            return Pintaosuma.Tiheys(georeferenssi, kamera);
        }
    }
}
