using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.EnhancedTouch;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja
{
    /// <summary>
    /// Pallon kamera: katsoo aina maan keskipisteeseen paikasta (pituus, leveys, korkeus).
    ///
    /// Ohjaus: yhden sormen veto pyörittää palloa, irrotus jättää liukuman, joka
    /// hiipuu pehmeästi. Kahden sormen ele lukitaan alussa (<see cref="KameraEleet.Paata"/>):
    /// yhdensuuntainen pystyveto kallistaa, muuten nipistys zoomaa, sormiparin kierto kääntää
    /// suuntimaa ja keskipisteen siirto pyörittää. Lyhyt kosketus ilman liikettä on napautus
    /// (<see cref="Napautettu"/>); toinen napautus samaan kohtaan 0,3 s:n sisällä kääntää pohjoisen ylös.
    /// Ennen ensimmäistä kosketusta pallo pyörii itsestään.
    ///
    /// Kamera-ajo (<see cref="Aja"/>, IKamera) käyttää verkkopelin liikekieltä:
    /// nopeusprofiili on js/siirtokoreografia.js siirtoajonPehmennys (trapetsi
    /// pehmeillä rampeilla, ramppi 0,3), ja pitkillä matkoilla kamera nousee
    /// välillä, jotta pallo näkyy.
    ///
    /// Kameran paikka lasketaan ECEF-koordinaateista georeferenssin kautta, joten
    /// Unityn akselien suunnasta ei tarvitse arvata mitään.
    /// </summary>
    [ExecuteAlways]
    public class PalloKierto : MonoBehaviour, IKamera
    {
        public CesiumGeoreference georeferenssi;

        [Header("Paikka")]
        public double pituus = 10.0;
        public double leveys = 25.0;
        [Tooltip("Korkeus maanpinnasta metreinä; 0 = koko pallo kuvaan.")]
        public double korkeus = 0.0;

        [Header("Itsestään pyöriminen")]
        [Tooltip("Pituusasteita sekunnissa ennen ensimmäistä kosketusta.")]
        public double nopeus = 6.0;

        [Header("Ohjaus")]
        [Tooltip("Liukuman hiipumisen aikavakio sekunteina.")]
        public double liukuAika = 0.35;
        // LÄHIN ZOOMI WEBIN MUKAAN (omistajan build 9 -löydös 26, 24.9.2026; WEB ON MALLI, MITATTUNA):
        // web js/pallolauta/kamera.js (origin/main 24.9.) 375 PALLOLAUDAN_LAHIN_LEVEYS = SIIRTOLEVEYS 120 / 2 = 60
        // lautayksikköä RUUDUN LEVEYDELLÄ (lauta 12000 = 360°, eli 1,8°); 428–432 puhelin (leveys ≤ 480 css px ja
        // dpr ≥ 2) pääsee yhden portaan syvemmälle, kerroin 1,5 → 40 yksikköä = 1,2° (Raamattu KARTTAUUDISTUKSEN
        // PAATOKSET 34 kohta 15 c). Korkeus kuten 276 korkeusLeveydesta: leveys / (kuvasuhde · 2 tan(fov/2)).
        // Aiempi natiivi 3,6° kapeammassa suunnassa oli siirtonäkymän leveys eikä lähin zoomi.
        [Tooltip("Lähin näkymä: ruudun leveys lautayksikköinä (web PALLOLAUDAN_LAHIN_LEVEYS 60 = 1,8°).")]
        public double lahinLeveys = 60.0;
        [Tooltip("Puhelimen lähizoomin syvennys (web PUHELIMEN_LAHIZOOMIN_KERROIN).")]
        public double puhelimenLahizoomi = 1.5;
        [Tooltip("Kapean ruudun raja pisteinä, jota pidetään puhelimena (web PUHELIMEN_RUUTU_PX).")]
        public double puhelimenRuutuPt = 480.0;
        [Tooltip("Kuinka suuren osan kapeammasta kuvakulmasta pallo täyttää kaukaisimmillaan.")]
        public double taytto = 0.92;
        public double maxLeveys = 80.0;

        [Header("Kallistus")]
        [Tooltip("Kameran kallistus pystysuorasta, asteina (0 = suoraan alas).")]
        public double kallistus = 0.0;
        // KALLISTUS PIDEMMÄLLE (omistajan build 9 -löydös 31, 24.9.2026): lähes horisonttiin, 85° (ei 90°), sama
        // kuin lennon kuvauksen raja (Kuvaa). Maaston alle kamera ei mene: Aseta pienentää käytettyä kallistusta, jos
        // rako maastoon alittuu (KameraEleet.Maastolle).
        [Tooltip("Suurin kallistus pelikorkeuksilla (kallistusTaysiKm ja alle).")]
        public double maxKallistus = 85.0;
        [Tooltip("Katseen vaakasuunta asteina (0 = kamera katsoo pohjoiseen, 90 = itään). Pelaaja kääntää kahden sormen " +
                 "kiertoeleellä, ja se pysyy; tuplanapautus ja PalautaPohjoinen kääntävät pohjoisen ylös. Lennon kuvauksen " +
                 "suuntima palautuu lennon jälkeen nollaan.")]
        public double suuntima = 0.0;
        [Tooltip("Katsottavan pisteen korkeus metreinä (lennon kuvaus katsoo konetta).")]
        public double katseKorkeus = 0.0;
        [Tooltip("Suuntiman ja katseen korkeuden palautuksen aikavakio lennon jälkeen, sekunteja.")]
        public double palautusAika = 0.6;

        // KALLISTUSRAJA (löydös 28 b): täysi tavallisilla pelikorkeuksilla, laskee vasta pallon mittakaavassa
        // (smootherstep). Aiempi lineaarinen raja MinKorkeus…3000 km leikkasi kallistusta heti loitonnettaessa.
        [Tooltip("Korkeus (km), jonka alapuolella kallistus saa olla täysi (maxKallistus).")]
        public double kallistusTaysiKm = KameraEleet.KallistusTaysiM / 1000.0;
        [Tooltip("Korkeus (km), jonka yläpuolella kallistus on nolla; väliltä se liukuu (smootherstep).")]
        public double kallistusNollaKm = KameraEleet.KallistusNollaM / 1000.0;

        [Tooltip("Kallistusasteita näytön pisteelle kahden sormen pystyvedossa.")]
        public double kallistusHerkkyys = 0.25;

        [Header("Napautus")]
        [Tooltip("Suurin liike näytön pisteinä, joka vielä on napautus.")]
        public float napautusLiike = 10f;
        public float napautusAika = 0.35f;

        [Header("Kamera-ajo")]
        [Tooltip("Verkkopelin SAATON_RAMPPI.")]
        public double ajonRamppi = 0.3;

        [Header("Aloitusportti (web etusivupallo, löydös 17)")]
        [Tooltip("Pituusasteita sekunnissa itään (Lontoosta kohti Aasiaa). Web js/etusivupallo.js: kierros 360° " +
                 "= 10 jaksoa × JAKSON_POHJA_S 1,0 + 322° × JAKSON_ASTE_S 0,115 + LOPPU_PITO_S 2,6 ≈ 49,6 s.")]
        public double porttiNopeus = 360.0 / 49.6;
        [Tooltip("Kameran leveysaste portissa. Web ETUSIVUN_KAMERA: 0,62 × koneen leveys rajattuna 2–38°, " +
                 "reitin keskiarvo noin 25°.")]
        public double porttiLeveys = 25.0;
        [Tooltip("Aloituspituus portin avautuessa: Lontoo (web ETUSIVUN_REITTI alkaa Lontoosta).")]
        public double porttiPituus = 0.0;
        [Tooltip("Web KIEKON_YLITYS: pallon kiekon säde / etäisyys ruudun keskeltä nurkkaan. 1,15 vie reunan " +
                 "selvästi ruudun ulkopuolelle kaikilla kuvasuhteilla.")]
        public double porttiYlitys = 1.15;
        [Tooltip("Web .start-gate backdrop-filter: blur(6px): Gaussin keskihajonta pisteinä.")]
        public float porttiSumennusPt = 6f;
        [Tooltip("Sumennuksen häivytys sisään ja ulos, sekunteja (web portin häipyminen 400 ms).")]
        public float porttiHaivytysS = 0.4f;
        [Tooltip("Kuvien aikainen mieto sumennus (löydös 19), pisteinä.")]
        public float kuvaSumennusPt = 2.25f;
        [Tooltip("Kuvasumennuksen häivytys, sekunteja.")]
        public float kuvaHaivytysS = 0.3f;
        [Tooltip("Matkakirja/Sumennus (Rakennus.cs). Ilman sitä portti on vain pieni kuva (renderScale 0,1).")]
        public Material sumennusMateriaali;

        /// <summary>
        /// ALOITUSPORTTI (Natiivi-UI: Aloitusnakyma.PorttiMuuttui → tämä). true = kamera aloituspallotilaan
        /// kuten webin etusivupallo: pallo täyttää koko ruudun (kiekko 1,15 × nurkkaetäisyys), pyörii hitaasti
        /// itään (<see cref="porttiNopeus"/>), kaupunkimerkit, nimiöt, karttapisteet, valot ja nostot piiloon,
        /// sumennus 6 pt päälle (PalloSumennus), sormet eivät liikuta palloa. false = sumennus häipyy
        /// 0,4 s:ssa ja merkit palaavat; kamera jää paikalleen, ja kutsuja ajaa sen seuraavaan näkymään
        /// (Aja toimii samassa kehyksessä). Asetettavissa ennen kuin kamera on olemassa.
        /// </summary>
        public static bool PorttiSumea { get; set; }

        /// <summary>
        /// KUVASUMENNUS (omistajan löydös 19; Natiivi-UI: UiNakymat.KuvaSumeaMuuttui → tämä): kartta mieto sumeaksi
        /// (<see cref="kuvaSumennusPt"/>), kun isoisän tai pulun kuvia on ruudulla — sama keino kuin portin verhossa,
        /// mutta ei täyttöä, pyöritystä eikä merkkien piilotusta; liukuu päälle ja pois <see cref="kuvaHaivytysS"/>.
        /// Portti voittaa, jos molemmat ovat päällä.
        /// </summary>
        public static bool KuvaSumea { get; set; }

        /// <summary>Editorin pelitila ilman domain reloadia: staattinen tila ei jää edellisestä ajosta.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaPortti() { PorttiSumea = false; KuvaSumea = false; }

        /// <summary>Kamera on aloituspallotilassa (PorttiSumea luettu tässä kehyksessä).</summary>
        public bool Portissa => porttiTila;
        bool porttiTila;
        double porttiLon;
        PalloSumennus sumennus;

        /// <summary>Onko sormi ruudulla, liukuma tai kamera-ajo käynnissä (kehysmittari lukee).</summary>
        public bool Liikkeessa => edellinenSormia > 0 || math.lengthsq(liuku) > 1e-4 || ajo != null || Seurataan || porttiTila || pohjoiseen;

        /// <summary>Nappula ohjaa kameraa (Nappula.seuraaKamera): kamera katsoo annettua pistettä.</summary>
        public bool Seurataan { get; private set; }

        /// <summary>Kamera katsomaan pistettä (nappulan seuranta); korkeus &lt;= 0 = nykyinen. Keskeyttää ajon.</summary>
        public void Seuraa(double lat, double lon, double korkeus = 0)
        {
            ajo = null;
            liuku = 0;
            Seurataan = true;
            leveys = lat;
            pituus = lon;
            if (korkeus > 0) this.korkeus = math.clamp(korkeus, MinKorkeus(), MaxKorkeus());
        }

        public void SeurantaLoppui() { Seurataan = false; vapaaKuvaus = false; }

        /// <summary>Lennon kuvaus: kallistus ei ole korkeuden rajoittama, ja suuntima palautuu vasta seurannan jälkeen.</summary>
        bool vapaaKuvaus;

        /// <summary>
        /// Lennon kuvaus (Nappula, LENNON ESITYS): kamera kiertää pistettä (lat, lon, katseKorkeus)
        /// annetulla etäisyydellä, kallistuksella ja suuntimalla. Asettaa kameran heti, jotta
        /// kone ja kamera liikkuvat samassa kehyksessä. Keskeyttää ajon; SeurantaLoppui palauttaa.
        /// </summary>
        public void Kuvaa(double lat, double lon, double etaisyys, double kallistusAsteina, double suuntimaAsteina, double katseenKorkeus)
        {
            ajo = null;
            liuku = 0;
            Seurataan = true;
            vapaaKuvaus = true;
            leveys = lat;
            pituus = lon;
            korkeus = math.max(100.0, etaisyys);
            kallistus = math.clamp(kallistusAsteina, 0, 85);
            suuntima = suuntimaAsteina;
            katseKorkeus = katseenKorkeus;
            lennonSuuntima = true;
            pohjoiseen = false;
            Aseta();
        }

        /// <summary>
        /// Kallistus, jolla kamera tässä kehyksessä oikeasti on (asteina): tallennettu <see cref="kallistus"/>
        /// rajattuna korkeuden mukaan (<see cref="KallistusRaja()"/>, ei lennon kuvauksessa) ja maaston raon mukaan.
        /// Tallennettu arvo ei muutu, joten lähemmäs zoomatessa pelaajan kallistus palaa. Kameran asentoa
        /// talteen ottavat (lennon alku, linssit) lukevat tämän eivätkä kenttää.
        /// </summary>
        public double KaytettyKallistus { get; private set; }

        /// <summary>
        /// POHJOINEN YLÖS (omistajan build 9 -löydös 30; Natiivi-UI:n kompassinappi, tuplanapautus): suuntima kääntyy
        /// lyhintä tietä nollaan <paramref name="kestoS"/> sekunnissa (smootherstep). Kallistus ja zoomi pysyvät.
        /// 0 = heti. Kiertoele tai lennon kuvaus keskeyttää.
        /// </summary>
        public void PalautaPohjoinen(float kestoS = 0.4f)
        {
            lennonSuuntima = false;
            pohjoiseenAlku = Kiedo(suuntima);
            pohjoiseenAika = 0;
            pohjoiseenKesto = kestoS;
            pohjoiseen = kestoS > 0f && pohjoiseenAlku != 0;
            if (!pohjoiseen) suuntima = 0;
        }

        // SUUNTIMAN PALAUTUS (löydös 30 i): pelaajan kiertoeleellä asettama suuntima pysyy. Vain lennon kuvauksen
        // (Kuvaa) oma suuntima palautuu seurannan jälkeen, ja se palautuu NOLLAAN eikä pelaajan lentoa edeltäneeseen
        // suuntimaan: lennon aikajanan lasku päättyy jo pohjoinen ylös (LennonAikajana.Laske, "ilman takaisinkääntöä"),
        // saapuminen uuteen kaupunkiin on webin mukaan pohjoinen ylös, ja vanhan suuntiman palautus kääntäisi karttaa
        // laskeutumisen jälkeen vielä kerran. Useimmiten palautettavaa ei siis ole; tämä siivoaa vain keskeytetyn lennon.
        bool lennonSuuntima;
        bool pohjoiseen;
        double pohjoiseenAlku, pohjoiseenAika, pohjoiseenKesto;

        void KaannaPohjoiseen(double dt)
        {
            pohjoiseenAika += dt;
            double t = pohjoiseenAika / math.max(0.01, pohjoiseenKesto);
            suuntima = pohjoiseenAlku * (1.0 - KameraEleet.Smootherstep(t));
            if (t >= 1.0) { suuntima = 0; pohjoiseen = false; }
        }

        /// <summary>
        /// Kamera heti annettuun korkeuteen (metreinä, myös MaxKorkeuden yläpuolelle), kallistus ja suuntima 0.
        /// Ihmisen matkan avaus (Linssiseppä, web avaaKaukaisuus): Maa pisteenä tähtien keskellä, ja seuraava
        /// Aja lähtee tästä korkeudesta (Etene sallii alkukorkeuden katon yläpuolella). Keskeyttää ajon.
        /// </summary>
        public void AsetaKaukaa(double lat, double lon, double korkeusM)
        {
            ajo = null;
            liuku = 0;
            kosketettu = true;
            leveys = math.clamp(lat, -maxLeveys, maxLeveys);
            pituus = Kiedo(lon);
            korkeus = math.max(MinKorkeus(), korkeusM);
            kallistus = 0;
            suuntima = 0;
            pohjoiseen = false;
            katseKorkeus = 0;
            Aseta();
        }

        /// <summary>
        /// Loitontaa niin, että pisteet mahtuvat ruutuun (marginaali = osuus reunasta), jos ne eivät
        /// jo mahdu; keskipiste pysyy. Ei koskaan lähennä. Kaari lasketaan suurimmasta kulmaetäisyydestä
        /// nykyisestä keskipisteestä kapeamman suunnan mukaan.
        /// </summary>
        public void SovitaPisteet(IReadOnlyList<(double lat, double lon)> pisteet, double marginaali = 0.12, float kestoS = 0.9f)
        {
            if (pisteet == null || pisteet.Count == 0) return;
            bool mahtuu = true;
            var kamera = GetComponent<Camera>();
            foreach (var p in pisteet)
            {
                if (!RuutuPiste(p.lat, p.lon, out var r)) { mahtuu = false; break; }
                float mx = (float)(Screen.width * marginaali), my = (float)(Screen.height * marginaali);
                if (r.x < mx || r.x > Screen.width - mx || r.y < my || r.y > Screen.height - my) { mahtuu = false; break; }
            }
            if (mahtuu || kamera == null) return;
            double suurin = 0;
            foreach (var p in pisteet) suurin = math.max(suurin, ReittiGeometria.Kulma(leveys, pituus, p.lat, p.lon));
            double tavoite = KorkeusKaarelle(2.0 * suurin * (1.0 + 2.0 * marginaali));
            if (tavoite <= korkeus) return;
            Aja(leveys, pituus, tavoite, kestoS, null);
        }

        /// <summary>
        /// Pisteen paikka näytöllä pikseleinä (origo vasen alakulma kuten Input), esim. Natiivi-UI:n
        /// noppa pelaajan kohdalta. false = pallon takapuolella tai ruudun ulkopuolella.
        /// korkeus metreinä ellipsoidista (nappula on 5000 m:ssä).
        /// </summary>
        public bool RuutuPiste(double lat, double lon, out Vector2 ruutu, double korkeus = 0)
        {
            ruutu = default;
            var kamera = GetComponent<Camera>();
            if (georeferenssi == null || kamera == null) return false;
            var gt = georeferenssi.transform;
            double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
            Vector3 p = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
            Vector3 keskus = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
            if (Vector3.Dot((p - keskus).normalized, (kamera.transform.position - p).normalized) < 0.02f) return false;
            Vector3 r = kamera.WorldToScreenPoint(p);
            if (r.z <= 0 || r.x < 0 || r.y < 0 || r.x > Screen.width || r.y > Screen.height) return false;
            ruutu = r;
            return true;
        }

        /// <summary>Lepo vaihtui: true = ei liikettä eikä peittoa (Natiivi-UI:n pieni liike herää vain levossa).</summary>
        public event Action<bool> LepoMuuttui;
        public bool Levossa { get; private set; } = true;

        /// <summary>Napautus näytön pikselikoordinaateissa (KaupunkiMerkit etsii osuman).</summary>
        public event Action<Vector2> Napautettu;

        /// <summary>
        /// Pelaajan veto tai nipistys pallolla alkoi (kerran elettä kohden, kun liike ylittää
        /// napautuksen rajan tai sormia on kaksi). Kamera-ajo ei herätä tätä (web kutistaKortinLiikkeesta).
        /// </summary>
        public event Action PelaajanEle;
        bool eleIlmoitettu;

        /// <summary>IKamera: kaupunkia napautettiin (KaupunkiMerkit ilmoittaa).</summary>
        public event Action<string> KaupunkiNapautettu;

        public void IlmoitaKaupunki(string id) => KaupunkiNapautettu?.Invoke(id);

        /// <summary>Synteettinen napautus näytön pikseleinä (testikomento "napauta x y").</summary>
        public void Napauta(Vector2 ruutu) => Napautettu?.Invoke(ruutu);

        /// <summary>
        /// Kosketusten esto (dialogi, lehti, linssin oma ele): kun tosi, pallo ei lue
        /// sormia eikä tunnista napautuksia. Käynnissä oleva liuku pysähtyy.
        /// Kamera-ajot (Aja) ja synteettiset eleet toimivat edelleen.
        /// </summary>
        public bool SyoteEstetty
        {
            get => syoteEstetty;
            set { syoteEstetty = value; if (value) { liuku = 0; vetoNopeus = 0; edellinenSormia = 0; } }
        }
        bool syoteEstetty;

        /// <summary>
        /// UI:n peittokysely (Natiivi-UI): jos kosketus alkaa pisteestä, jonka UI peittää
        /// (näytön pikseleinä), pallo ei lue koko elettä ennen kuin sormet nousevat.
        /// </summary>
        public Func<Vector2, bool> UiPeittaa;
        bool eleUilla;

        /// <summary>
        /// Koko näytön peittokysely (Pelikoodari: WKWebView-lehti auki). Kun tosi, pallo
        /// piirretään harvemmin (<see cref="PeitettyVali"/>) eikä kehysmittari laske kehyksiä
        /// lepoon: lehden sivulataus ja asettelu ajavat samassa pääsäikeessä kuin Unity.
        /// </summary>
        public Func<bool> NakymaPeitetty;
        public static int PeitettyVali = 4;

        /// <summary>
        /// Kaukoleikkauksen alaraja metreinä (0 = pelkkä pallo). Linssit, jotka piirtävät
        /// pallon taakse (Linssisepän tähtitaivas), nostavat tätä ajaksi ja palauttavat 0:n.
        /// </summary>
        public double KaukorajaVahintaan;
        public bool Peitetty { get; private set; }

        void PaivitaPeitto()
        {
            bool p = false;
            try { p = NakymaPeitetty != null && NakymaPeitetty(); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA pallo: peittokysely kaatui: " + e.Message); }
            if (p == Peitetty) return;
            Peitetty = p;
            UnityEngine.Rendering.OnDemandRendering.renderFrameInterval = p ? PeitettyVali : 1;
        }

        /// <summary>Kameratila muuttui tässä kehyksessä (pituus, leveys, korkeus tai kallistus).</summary>
        public event Action NakymaMuuttui;
        double4 edellinenNakyma;

        class Ajo
        {
            public double3 alku, loppu; // (pituus, leveys, korkeus)
            public double kesto, aika, nousu;
            public Action valmis;
            public Func<double, double> pehmennys;
        }

        bool kosketettu;
        double2 liuku;        // astetta sekunnissa (pituus, leveys)
        double2 vetoNopeus;   // sama suodatettuna vedon aikana
        float2 edellinenKeski;
        float edellinenVali;
        int edellinenSormia;
        float2 kosketusAlku;
        float kosketusAika;
        float kosketusMatka;
        Ajo ajo;

        void OnEnable()
        {
            if (Application.isPlaying) EnhancedTouchSupport.Enable();
        }

        void OnDisable()
        {
            if (Application.isPlaying) EnhancedTouchSupport.Disable();
            // Editorissa URP-asetus on tiedosto: renderScale ei saa jäädä portin arvoon.
            sumennus?.Palauta();
            porttiTila = false; // uudelleen päälle: PaivitaPortti asettaa portin alusta
        }

        void Update()
        {
            PaivitaPeitto();
            if (georeferenssi == null) return;
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            if (Application.isPlaying)
            {
                PaivitaPortti(Time.unscaledDeltaTime);
                if (porttiTila) PorttiKierto(Time.unscaledDeltaTime);
                else
                {
                    Ohjaa(Time.unscaledDeltaTime);
                    if (ajo != null) Etene(Time.unscaledDeltaTime);
                }
            }
            if (pohjoiseen && !Seurataan) KaannaPohjoiseen(Time.unscaledDeltaTime);
            if (!Seurataan && ((lennonSuuntima && suuntima != 0) || katseKorkeus != 0)) Palauta(Time.unscaledDeltaTime);
            else if (!Seurataan) lennonSuuntima = false;
            if (Application.isPlaying) PaivitaMaasto();
            Aseta();
            var nakyma = new double4(pituus, leveys, korkeus, KaytettyKallistus + suuntima * 1000.0);
            if (!nakyma.Equals(edellinenNakyma)) { edellinenNakyma = nakyma; NakymaMuuttui?.Invoke(); }
            bool lepo = !Liikkeessa && !Peitetty;
            if (lepo != Levossa) { Levossa = lepo; LepoMuuttui?.Invoke(lepo); }
        }

        /// <summary>
        /// Laitepikseliä yhdellä pisteellä (CSS px / iOS pt), kuten UI ja linssit: Round(dpi / 163).
        /// Pyöristämätön dpi/163 antoi 264 dpi:n iPadille 1,62 (iPadin 1x on 132 dpi), joten
        /// merkit ja viivat olivat 0,81× webin koosta.
        /// </summary>
        public static float Pistekerroin => Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 163f)) : 1f;

        float Kerroin => Pistekerroin;

        double PuoliKulma()
        {
            var kamera = GetComponent<Camera>();
            double pysty = math.radians(kamera != null ? kamera.fieldOfView : 50.0) / 2.0;
            double vaaka = math.atan(math.tan(pysty) * (kamera != null ? kamera.aspect : 1.0));
            return math.min(pysty, vaaka);
        }

        /// <summary>Portin tilan vaihto (PorttiSumea) ja sumennuksen häivytys.</summary>
        void PaivitaPortti(double dt)
        {
            bool sumea = PorttiSumea;
            if (sumea != porttiTila)
            {
                porttiTila = sumea;
                if (sumea)
                {
                    ajo = null;
                    ele = null;
                    liuku = 0;
                    vetoNopeus = 0;
                    edellinenSormia = 0;
                    Seurataan = false;
                    vapaaKuvaus = false;
                    porttiLon = Kiedo(porttiPituus);
                }
            }
            // Sumennuksen tavoite: portti 6 pt, kuvat mieto (löydös 19), muuten pois.
            // Lennon kuvauksessa (vapaaKuvaus, Nappula.Lento) ei kuvasumennusta: sumennus on koko ruudun jälkikäsittely ja
            // sumensi myös koneen, kun lento-alun luenta näytti isoisän kuvan (Laitetestaaja 24.9., iPhone, f6de924).
            float tavoite = porttiTila ? porttiSumennusPt : KuvaSumea && !vapaaKuvaus ? kuvaSumennusPt : 0f;
            if (tavoite > 0f)
            {
                sumennus ??= new PalloSumennus(GetComponent<Camera>(), sumennusMateriaali);
                // Eri voimakkuus = eri pienen kuvan skaala: vaihdetaan (harvinainen: portti ja kuva yhtä aikaa).
                if (sumennus.Paalla && !Mathf.Approximately(sumennus.sumennusPt, tavoite)) sumennus.Aseta(false);
                if (!sumennus.Paalla) { sumennus.sumennusPt = tavoite; sumennus.Aseta(true); }
            }
            if (sumennus == null || !sumennus.Paalla) return;
            float askel = (float)dt / Mathf.Max(0.01f, sumennus.sumennusPt >= porttiSumennusPt ? porttiHaivytysS : kuvaHaivytysS);
            sumennus.Osuus += tavoite > 0f ? askel : -askel;
            if (tavoite <= 0f && sumennus.Osuus <= 0f) sumennus.Aseta(false);
        }

        /// <summary>Aloituspallo: hidas kierto itään kiinteällä leveydellä ja korkeudella, joka täyttää ruudun.</summary>
        void PorttiKierto(double dt)
        {
            porttiLon = Kiedo(porttiLon + porttiNopeus * dt);
            pituus = porttiLon;
            leveys = porttiLeveys;
            korkeus = PorttiKorkeus();
            kallistus = 0;
            suuntima = 0;
            pohjoiseen = false;
            katseKorkeus = 0;
        }

        /// <summary>
        /// Portin korkeus (web pallonSovitus, KIEKON_YLITYS): pallon kiekon säde on <see cref="porttiYlitys"/> ×
        /// etäisyys ruudun keskeltä nurkkaan, joten reuna ei näy millään kuvasuhteella. Kiekon kulmasäde α
        /// (sin α = r / etäisyys keskipisteestä) näkyy ruudulla säteellä tan α / tan(fov/2) puolikorkeutta;
        /// nurkka on √(1 + aspect²) puolikorkeuden päässä. iPad pysty: α 33,8°, korkeus 5 100 km.
        /// </summary>
        public double PorttiKorkeus()
        {
            var kamera = GetComponent<Camera>();
            double tanPysty = math.tan(math.radians(kamera != null ? kamera.fieldOfView : 50.0) / 2.0);
            double aspect = kamera != null ? kamera.aspect : 1.0;
            double tanKiekko = porttiYlitys * math.sqrt(1.0 + aspect * aspect) * tanPysty;
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            return r / math.sin(math.atan(tanKiekko)) - r;
        }

        /// <summary>Sallittu kallistus tällä korkeudella: kaukaa pallo katsotaan aina suoraan.</summary>
        public double KallistusRaja() => KallistusRaja(korkeus);

        /// <summary>
        /// Sallittu kallistus annetulla korkeudella (lennon lasku päättyy tähän, ettei kamera hyppää): täysi
        /// <see cref="maxKallistus"/> ≤ <see cref="kallistusTaysiKm"/>, nolla ≥ <see cref="kallistusNollaKm"/>,
        /// välillä smootherstep (KameraEleet.KallistusRaja). Rajaa käytetyn kallistuksen, ei tallennettua.
        /// </summary>
        public double KallistusRaja(double korkeusM) =>
            KameraEleet.KallistusRaja(korkeusM, maxKallistus, kallistusTaysiKm * 1000.0, kallistusNollaKm * 1000.0);

        /// <summary>Korkeus, jolla koko pallo mahtuu kuvan kapeampaan suuntaan.</summary>
        public double MaxKorkeus()
        {
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            return r / math.sin(PuoliKulma() * taytto) - r;
        }

        /// <summary>
        /// Lähin korkeus: ruudun leveys näyttää <see cref="lahinLeveys"/> lautayksikköä (puhelimella syvemmälle),
        /// webin lahinKorkeus (js/pallolauta/kamera.js 442) samalla kaavalla.
        /// </summary>
        public double MinKorkeus()
        {
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            var kamera = GetComponent<Camera>();
            double tanPysty = math.tan(math.radians(kamera != null ? kamera.fieldOfView : 50.0) / 2.0);
            double kuvasuhde = kamera != null ? kamera.aspect : 1.0;
            bool puhelin = Screen.width / (double)Kerroin <= puhelimenRuutuPt && Kerroin >= 2f;
            double asteet = lahinLeveys * 360.0 / 12000.0 / (puhelin ? math.max(1.0, puhelimenLahizoomi) : 1.0);
            return math.radians(asteet) * r / (2.0 * tanPysty * math.max(0.01, kuvasuhde));
        }

        /// <summary>Korkeus, jolla kapeampi suunta näyttää annetun kaaren (asteina).</summary>
        public double KorkeusKaarelle(double kaariAsteina)
        {
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            double h = math.radians(kaariAsteina) * r / (2.0 * math.tan(PuoliKulma()));
            return math.clamp(h, MinKorkeus(), MaxKorkeus());
        }

        /// <summary>
        /// Montako astetta maapallon kaarta yksi näytön pikseli on. Lähellä pintaa
        /// sormen alla oleva kohta seuraa sormea; kaukana veto on rauhallisempi.
        /// </summary>
        double AstettaPikselille()
        {
            var kamera = GetComponent<Camera>();
            double fov = math.radians(kamera != null ? kamera.fieldOfView : 50.0);
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            double kaari = 2.0 * korkeus * math.tan(fov / 2.0) / r;
            return math.degrees(math.min(kaari, math.PI)) / math.max(1, Screen.height);
        }

        /// <summary>
        /// Synteettinen ele (Komennot: veto, nipistys, kallista, kierra): sormien paikat näytön osuuksina
        /// (0–1) ajan funktiona. Syötetään samaan ohjaukseen kuin oikeat sormet.
        /// </summary>
        public class Ele
        {
            public float kesto, aika;
            public float2 a0, a1;        // 1. sormi alussa ja lopussa
            public float2 b0, b1;        // 2. sormi (vain kahden sormen eleet)
            public bool kaksi;
            /// <summary>Sormipari kiertyy keskipisteensä ympäri eleen aikana (asteina, vastapäivään +).</summary>
            public float kiertoAst;
        }

        Ele ele;

        /// <summary>Aloittaa synteettisen eleen; sen jälkeinen kehys ilman sormia on irrotus (liuku).</summary>
        public void AloitaEle(Ele e) => ele = e;

        // KAHDEN SORMEN ELEEN LUKITUS (omistajan build 9 -löydös 28 a, 24.9.2026): nipistyksessä keskipiste liikkuu
        // aina hieman pystyyn, ja vanha koodi tulkitsi sen kallistukseksi. Nyt ele lukitaan alussa (KameraEleet.Paata,
        // kynnykset siellä): Kallistus yksin TAI nipistys + kierto + siirto. Lukitus vapautuu, kun sormia on alle 2.
        Elelukko lukko;
        float2 lukkoA0, lukkoB0;          // sormet (pikseleinä), kun kahden sormen ele alkoi
        float2 edellinenA, edellinenB;    // sormet edellisessä kehyksessä (kierto kehyksestä toiseen)
        // Tuplanapautus (löydös 30): edellisen napautuksen aika (s, unscaled) ja paikka pisteinä.
        double viimeNapautusAika = -1;
        float2 viimeNapautus;

        /// <summary>Kahden sormen eleen lukittu tila (Ei ennen kynnystä; diagnostiikkaan).</summary>
        public Elelukko Lukko => lukko;

        static (double x, double y) Pt(float2 p, float kerroin) => (p.x / kerroin, p.y / kerroin);

        void Ohjaa(double dt)
        {
            var sormet = Kosketus.activeTouches;
            int n = syoteEstetty ? 0 : sormet.Count;
            if (n > 0 && edellinenSormia == 0 && !eleUilla && UiPeittaa != null && UiPeittaa(sormet[0].screenPosition))
                eleUilla = true;
            if (eleUilla)
            {
                if (n == 0 && !(Mouse.current?.leftButton.isPressed ?? false)) eleUilla = false;
                n = 0;
                edellinenSormia = 0;
                if (eleUilla) return;
            }
            float2 keski = 0;
            float vali = 0;
            float2 sa = 0, sb = 0; // kaksi ensimmäistä sormea (n >= 2)

            if (ele != null)
            {
                ele.aika += (float)dt;
                float t = math.saturate(ele.aika / ele.kesto);
                var ruutu = new float2(Screen.width, Screen.height);
                float2 a = math.lerp(ele.a0, ele.a1, t) * ruutu;
                if (ele.kaksi)
                {
                    float2 b = math.lerp(ele.b0, ele.b1, t) * ruutu;
                    if (ele.kiertoAst != 0f)
                    {
                        // Kierto keskipisteen ympäri kaarena (ei jänteenä: väli pysyy, ettei kierto näytä nipistykseltä).
                        float2 m = (a + b) * 0.5f;
                        float k = math.radians(ele.kiertoAst * t), c = math.cos(k), s = math.sin(k);
                        float2 da = a - m, db = b - m;
                        a = m + new float2(da.x * c - da.y * s, da.x * s + da.y * c);
                        b = m + new float2(db.x * c - db.y * s, db.x * s + db.y * c);
                    }
                    n = 2; keski = (a + b) * 0.5f; vali = math.distance(a, b); sa = a; sb = b;
                }
                else { n = 1; keski = a; }
                if (t >= 1f) ele = null;
            }
            else if (n > 0)
            {
                for (int i = 0; i < n; i++) keski += (float2)sormet[i].screenPosition;
                keski /= n;
                if (n >= 2)
                {
                    sa = sormet[0].screenPosition;
                    sb = sormet[1].screenPosition;
                    vali = math.distance(sa, sb);
                }
            }
            else if (!syoteEstetty && Mouse.current != null && Mouse.current.leftButton.isPressed)
            {
                n = 1;
                keski = Mouse.current.position.ReadValue();
            }

            if (n < 2) lukko = Elelukko.Ei;
            if (n > 0)
            {
                kosketettu = true;
                liuku = 0;
                ajo = null; // sormi keskeyttää kamera-ajon
                if (edellinenSormia == 0)
                {
                    kosketusAlku = keski;
                    kosketusAika = 0;
                    kosketusMatka = 0;
                    eleIlmoitettu = false;
                }
                kosketusAika += (float)dt;
                kosketusMatka = math.max(kosketusMatka, math.distance(keski, kosketusAlku) / Kerroin);
                if (n > 1) kosketusMatka = float.MaxValue; // monisormiele ei ole napautus
                if (!eleIlmoitettu && kosketusMatka > napautusLiike)
                {
                    eleIlmoitettu = true;
                    PelaajanEle?.Invoke();
                }

                // Sormien määrän vaihtuessa aloitetaan uusi veto ilman hyppyä.
                if (n == edellinenSormia)
                {
                    float2 siirto = keski - edellinenKeski;
                    if (n >= 2)
                    {
                        if (lukko == Elelukko.Ei)
                            lukko = KameraEleet.Paata(Pt(lukkoA0, Kerroin), Pt(lukkoB0, Kerroin), Pt(sa, Kerroin), Pt(sb, Kerroin));
                        if (lukko == Elelukko.Kallistus)
                        {
                            // Yhdensuuntainen pystyveto kallistaa (kuten Apple Mapsissa); zoomi, suunta ja paikka pysyvät.
                            // Lähtö käytetystä kallistuksesta: tallennettu voi olla korkeuden rajaa suurempi.
                            double raja = KallistusRaja();
                            kallistus = math.clamp(math.min(kallistus, raja) - siirto.y / Kerroin * kallistusHerkkyys, 0, raja);
                            vetoNopeus = 0;
                        }
                        else if (lukko == Elelukko.NipistysKierto)
                        {
                            // Nipistys zoomaa, sormiparin kierto kääntää suuntimaa ja keskipisteen siirto panoroi;
                            // kallistus ei muutu (käytetty kallistus voi silti laskea pallon mittakaavassa, KallistusRaja).
                            Kierra(siirto, dt);
                            if (edellinenVali > 1f && vali > 1f)
                                korkeus = math.clamp(korkeus * edellinenVali / vali, MinKorkeus(), MaxKorkeus());
                            double kierto = KameraEleet.KulmaMuutos(Pt(edellinenA, 1f), Pt(edellinenB, 1f), Pt(sa, 1f), Pt(sb, 1f));
                            if (kierto != 0)
                            {
                                suuntima = Kiedo(suuntima + KameraEleet.SuuntimanMuutos(kierto));
                                pohjoiseen = false;
                                lennonSuuntima = false;
                            }
                        }
                        else vetoNopeus = 0; // ennen lukitusta kamera ei liiku
                    }
                    else Kierra(siirto, dt);
                }
                else if (n >= 2)
                {
                    lukko = Elelukko.Ei;
                    lukkoA0 = sa;
                    lukkoB0 = sb;
                }
                edellinenKeski = keski;
                edellinenVali = vali;
                edellinenA = sa;
                edellinenB = sb;
            }
            else
            {
                if (edellinenSormia > 0)
                {
                    if (kosketusMatka <= napautusLiike && kosketusAika <= napautusAika)
                    {
                        vetoNopeus = 0;
                        // Tuplanapautus kääntää pohjoisen ylös. Ensimmäinen napautus käsitellään heti (kaupungin valinta ei
                        // odota); toista ei välitetä napautuksena, ettei sama kohde avaudu ja sulkeudu.
                        float2 pt = edellinenKeski / Kerroin;
                        double nyt = Time.unscaledTimeAsDouble;
                        if (KameraEleet.OnTupla(viimeNapautusAika, (viimeNapautus.x, viimeNapautus.y), nyt, (pt.x, pt.y)))
                        {
                            viimeNapautusAika = -1;
                            PalautaPohjoinen();
                        }
                        else
                        {
                            viimeNapautusAika = nyt;
                            viimeNapautus = pt;
                            Napautettu?.Invoke(edellinenKeski);
                        }
                    }
                    liuku = vetoNopeus;
                }
                vetoNopeus = 0;
                if (math.lengthsq(liuku) > 1e-4)
                {
                    Siirra(liuku * dt);
                    liuku *= math.exp(-dt / liukuAika);
                }
                else if (!kosketettu && ajo == null)
                {
                    pituus = (pituus + nopeus * dt) % 360.0;
                }
            }
            edellinenSormia = n;
        }

        void Kierra(float2 pikselit, double dt)
        {
            double a = AstettaPikselille();
            double cos = math.max(0.3, math.cos(math.radians(leveys)));
            // Veto oikealle tuo lännen näkyviin (pallo pyörii sormen mukana). Kiertyneessä näkymässä (suuntima) ruudun
            // siirto käännetään maan suuntiin, jotta sormen alla oleva maa seuraa sormea (löydös 30 ii).
            var (ita, pohjoinen) = KameraEleet.RuutuMaahan(pikselit.x, pikselit.y, suuntima);
            var muutos = new double2(-ita * a / cos, -pohjoinen * a);
            Siirra(muutos);
            if (dt > 0)
            {
                // Liukuman nopeus: lyhyt eksponentiaalinen keskiarvo viimeisistä kehyksistä.
                double paino = 1.0 - math.exp(-dt / 0.05);
                vetoNopeus = math.lerp(vetoNopeus, muutos / dt, paino);
            }
        }

        void Siirra(double2 muutos)
        {
            pituus = Kiedo(pituus + muutos.x);
            leveys = math.clamp(leveys + muutos.y, -maxLeveys, maxLeveys);
        }

        static double Kiedo(double lon) => ((lon % 360.0) + 540.0) % 360.0 - 180.0;

        /// <summary>
        /// IKamera: ajaa kameran kohteeseen. Korkeus 0 tai alle = nykyinen korkeus.
        /// Sormi ruudulla keskeyttää ajon (valmis-kutsua ei silloin tehdä).
        /// </summary>
        public void Aja(double lat, double lon, double kohdeKorkeus, float kestoS, Action valmis) =>
            Aja(lat, lon, kohdeKorkeus, kestoS, valmis, null);

        /// <summary>
        /// Kamera-ajo omalla pehmennyskäyrällä (t 0–1 → osuus 0–1), esim. linssin
        /// kohdeajo. null = verkkopelin siirtoajonPehmennys (ramppi 0,3).
        /// </summary>
        /// <param name="yliKaton">Kohde saa olla loitonnuksen katon yläpuolella (linssien avaruusajot, Linssiseppä 24.9.).</param>
        public void Aja(double lat, double lon, double kohdeKorkeus, float kestoS, Action valmis, Func<double, double> pehmennys,
            bool yliKaton = false)
        {
            kosketettu = true;
            liuku = 0;
            double katto = yliKaton ? math.max(MaxKorkeus(), kohdeKorkeus) : MaxKorkeus();
            double h1 = kohdeKorkeus > 0 ? math.clamp(kohdeKorkeus, MinKorkeus(), katto) : korkeus;
            double dLon = Kiedo(lon - pituus);
            double lat1 = math.clamp(lat, -maxLeveys, maxLeveys);
            // Isoympyräkulma alun ja lopun välillä: pitkällä matkalla kamera nousee.
            double kulma = math.degrees(math.acos(math.clamp(
                math.sin(math.radians(leveys)) * math.sin(math.radians(lat1)) +
                math.cos(math.radians(leveys)) * math.cos(math.radians(lat1)) * math.cos(math.radians(dLon)), -1, 1)));
            double nakyvaKaari = math.degrees(2.0 * math.max(korkeus, h1) * math.tan(PuoliKulma())
                                              / CesiumWgs84Ellipsoid.GetMaximumRadius());
            double nousu = math.saturate((kulma - nakyvaKaari * 0.5) / 90.0);
            ajo = new Ajo
            {
                alku = new double3(pituus, leveys, korkeus),
                loppu = new double3(pituus + dLon, lat1, h1),
                kesto = math.max(0.05, kestoS),
                nousu = nousu,
                valmis = valmis,
                pehmennys = pehmennys,
            };
        }

        void Etene(double dt)
        {
            ajo.aika += dt;
            double t = math.saturate(ajo.aika / ajo.kesto);
            // KAMERA-AJOT (omistaja 24.9.): oletus smootherstep (ease in/out, ei vakionopeuspätkää keskellä).
            double e = ajo.pehmennys != null ? ajo.pehmennys(t) : Smootherstep(t);
            pituus = Kiedo(math.lerp(ajo.alku.x, ajo.loppu.x, e));
            leveys = math.lerp(ajo.alku.y, ajo.loppu.y, e);
            // Korkeus logaritmisesti (tasainen zoomin tuntu) ja nousu kaaren keskellä.
            // Ajo avaruudesta (AsetaKaukaa) saa lähteä katon yläpuolelta; katto koskee vain pelaajan zoomia.
            double hMax = math.max(MaxKorkeus(), math.max(ajo.alku.z, ajo.loppu.z));
            double lh = math.lerp(math.log(ajo.alku.z), math.log(ajo.loppu.z), e);
            double kaari = math.sin(math.PI * e) * ajo.nousu * (math.log(hMax) - lh);
            korkeus = math.min(hMax, math.exp(lh + kaari));
            if (t >= 1.0)
            {
                var valmis = ajo.valmis;
                ajo = null;
                valmis?.Invoke();
            }
        }

        /// <summary>Smootherstep 6t⁵ − 15t⁴ + 10t³: nopeus ja kiihtyvyys nollassa molemmissa päissä.</summary>
        public static double Smootherstep(double t)
        {
            double x = math.saturate(t);
            return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
        }

        /// <summary>
        /// Verkkopelin siirtoajonPehmennys (js/siirtokoreografia.js): trapetsinopeus,
        /// jonka rampit ovat pehmeät (a³ − a⁴/2), joten kiihtyvyys ei hyppää.
        /// </summary>
        public static double Pehmennys(double t, double ramppi)
        {
            double x = math.saturate(t);
            double r = math.clamp(ramppi, 0.0001, 0.49);
            double v = 1.0 / (1.0 - r);
            if (x < r) { double a = x / r; return v * r * (a * a * a - a * a * a * a / 2.0); }
            if (x > 1.0 - r) { double b = (1.0 - x) / r; return 1.0 - v * r * (b * b * b - b * b * b * b / 2.0); }
            return v * (x - r / 2.0);
        }

        (double, double, double, double, double, double) viimeKelvollinen = (25.0, 10.0, 2.0e7, 0, 0, 0);
        bool nanKirjattu;

        /// <summary>
        /// Näytön pisteen säde (pikseleinä, origo vasen alakulma) kameran FOV:sta ja asennosta ilman Unityn
        /// ScreenPointToRayta: se kirjaa huonolla projektiolla joka kehys "Screen position out of view frustum"
        /// (Laitetestaaja 24.9., iPhone, etelänapa). false = kamera ei ole kelvollinen.
        /// </summary>
        public static bool Sade(Camera kamera, Vector2 ruutu, out Ray sade)
        {
            sade = default;
            if (kamera == null || Screen.width <= 0 || Screen.height <= 0) return false;
            var t = kamera.transform;
            float tanY = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float nx = ruutu.x / Screen.width * 2f - 1f, ny = ruutu.y / Screen.height * 2f - 1f;
            Vector3 suunta = t.forward + t.right * (nx * tanY * kamera.aspect) + t.up * (ny * tanY);
            float pituus = suunta.magnitude;
            if (!(pituus > 1e-6f) || float.IsNaN(t.position.x + t.position.y + t.position.z)) return false;
            sade = new Ray(t.position, suunta / pituus);
            return true;
        }

        bool Kelvollinen() =>
            math.isfinite(leveys) && math.isfinite(pituus) && math.isfinite(korkeus) && korkeus > 0
            && math.isfinite(kallistus) && math.isfinite(suuntima) && math.isfinite(katseKorkeus);

        // MAASTO KAMERAN ALLA (löydös 31). Tilesetissä ei ole törmäysverkkoja (Editor/Rakennus.cs createPhysicsMeshes =
        // false: iPadilla ne paistettiin jokaiselle laatalle), joten Physics.Raycast ei osu mihinkään. Korkeus luetaan
        // Cesiumin SampleHeightMostDetailed-kyselyllä yhdestä pisteestä (silmän alta), enintään 2,5 kertaa sekunnissa,
        // yksi kysely kerrallaan, ja vain kun silmä on alle maastonKatto + rako + 3 km ellipsoidista — korkeammalla
        // mikään vuori ei ylety, eikä kyselyjä tehdä (tavallinen pelinäkymä ilman kallistusta on satojen km:n päässä).
        // Ellipsoidipohjalla (maasto pois) maasto = 0. Vanha näyte kelpaa 30 km:n päähän; kauempana oletetaan 0.

        [Tooltip("Maapallon korkein huippu (m): tätä ylempänä silmä ei voi osua maastoon, eikä kyselyjä tehdä.")]
        public double maastonKatto = 9000.0;
        [Tooltip("Maastokyselyjen väli sekunteina (SampleHeightMostDetailed silmän alta).")]
        public float maastoVali = 0.4f;

        double silmanLat, silmanLon, silmanKorkeus = double.MaxValue;
        Cesium3DTileset maastoPallo;
        Task<CesiumSampleHeightResult> maastoKysely;
        double2 maastoKyselyPaikka;   // (lat, lon)
        double maastoNayte;
        double2 maastoNaytePaikka;    // (lat, lon)
        bool maastoNayteOn;
        float seuraavaMaasto;

        /// <summary>Maaston korkeus (m, ellipsoidista) viimeisimmästä näytteestä, jos se on 30 km:n sisällä; muuten 0.</summary>
        double MaastoKohdassa(double lat, double lon)
        {
            if (!maastoNayteOn) return 0.0;
            if (ReittiGeometria.Kulma(lat, lon, maastoNaytePaikka.x, maastoNaytePaikka.y) > 30.0 / 111.2) return 0.0;
            return math.max(0.0, maastoNayte);
        }

        void PaivitaMaasto()
        {
            if (maastoKysely != null)
            {
                if (!maastoKysely.IsCompleted) return;
                var tehtava = maastoKysely;
                maastoKysely = null;
                if (!tehtava.IsFaulted && !tehtava.IsCanceled && tehtava.Result != null
                    && tehtava.Result.sampleSuccess != null && tehtava.Result.sampleSuccess.Length > 0 && tehtava.Result.sampleSuccess[0])
                {
                    maastoNayte = tehtava.Result.longitudeLatitudeHeightPositions[0].z;
                    maastoNaytePaikka = maastoKyselyPaikka;
                    maastoNayteOn = true;
                }
            }
            if (Time.unscaledTime < seuraavaMaasto) return;
            if (silmanKorkeus > maastonKatto + KameraEleet.VahimmaisRako(korkeus) + 3000.0) return;
            if (maastoPallo == null && georeferenssi != null) maastoPallo = georeferenssi.GetComponentInChildren<Cesium3DTileset>();
            if (maastoPallo == null || maastoPallo.tilesetSource != CesiumDataSource.FromUrl) { maastoNayteOn = false; return; }
            seuraavaMaasto = Time.unscaledTime + maastoVali;
            maastoKyselyPaikka = new double2(silmanLat, silmanLon);
            try { maastoKysely = maastoPallo.SampleHeightMostDetailed(new double3(silmanLon, silmanLat, 0.0)); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA kamera: maastokysely kaatui: " + e.Message); maastoKysely = null; }
        }

        /// <summary>Lennon jälkeen lennon suuntima kääntyy lyhintä tietä pohjoiseen ja katse laskeutuu maahan.</summary>
        void Palauta(double dt)
        {
            double a = 1.0 - math.exp(-dt / math.max(0.05, palautusAika));
            if (lennonSuuntima)
            {
                double s = ((suuntima % 360.0) + 540.0) % 360.0 - 180.0;
                s -= s * a;
                suuntima = math.abs(s) < 0.05 ? 0.0 : s;
                if (suuntima == 0) lennonSuuntima = false;
            }
            katseKorkeus = katseKorkeus < 1.0 ? 0.0 : katseKorkeus * (1.0 - a);
        }

        public void Aseta()
        {
            if (georeferenssi == null) return;
            // Suoja: yksikin ei-äärellinen arvo (NaN) tekee kameran käyttökelvottomaksi — kuva tyhjenee ja
            // ScreenPointToRay kirjaa joka kehys "Screen position out of view frustum" (Laitetestaaja 24.9.,
            // build 6). Palautetaan viimeisin kelvollinen asento ja kirjataan kerran, mistä arvo tuli.
            if (!Kelvollinen())
            {
                if (!nanKirjattu)
                {
                    nanKirjattu = true;
                    Debug.LogError($"MATKAKIRJA kamera: ei-äärellinen asento (lev {leveys}, pit {pituus}, kork {korkeus}, " +
                                   $"kall {kallistus}, suunt {suuntima}, katse {katseKorkeus}) → palautetaan\n{Environment.StackTrace}");
                }
                (leveys, pituus, korkeus, kallistus, suuntima, katseKorkeus) = viimeKelvollinen;
                ajo = null;
                liuku = 0;
            }
            else viimeKelvollinen = (leveys, pituus, korkeus, kallistus, suuntima, katseKorkeus);
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            // Käytetty kallistus (löydös 28 b): tallennettua kallistusta EI leikata, vaan raja koskee vain kuvaa, joten
            // loitonnus ja lähennys palauttavat pelaajan kallistuksen. Lennon kuvaus (vapaaKuvaus) ei ole korkeuden
            // rajoittama. Ylempänä ennen 24.9. tässä oli kallistus = min(kallistus, raja), joka leikkasi pysyvästi.
            double kaytetty = math.clamp(vapaaKuvaus ? kallistus : math.min(kallistus, KallistusRaja()), 0.0, 85.0);
            double etaisyys = korkeus;

            // Kamera kiertää pistettä (pituus, leveys, katseKorkeus): kallistus kääntää sen
            // pystysuorasta katsesuuntaa vastapäätä (suuntima 0 = kamera etelässä, katse
            // pohjoiseen), etäisyys pysyy samana. Kallistus 0 = suora katse alas.
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(pituus, leveys, katseKorkeus));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde);
            double3 napa = new double3(0, 0, 1);
            double3 pohjoinen = math.normalize(napa - ylos * math.dot(napa, ylos));
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double b = math.radians(suuntima);
            double3 eteen = pohjoinen * math.cos(b) + ita * math.sin(b);
            double k = math.radians(kaytetty);
            double3 suunta = ylos * math.cos(k) - eteen * math.sin(k);
            double3 silma = kohde + suunta * etaisyys;
            // MAASTON RAKO (löydös 31): silmän ellipsoidikorkeus ja maasto sen alla (PaivitaMaasto). Jos rako alittuu,
            // kallistus pienenee (tai kallistuksen 0 ei riittäessä kamera nousee) pallomallilla, jonka virhe
            // ellipsoidiin nähden korjataan tämän kehyksen tarkalla korkeudella.
            double3 silmaLlh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(silma);
            double maasto = MaastoKohdassa(silmaLlh.y, silmaLlh.x);
            double minSilma = maasto + KameraEleet.VahimmaisRako(etaisyys);
            if (silmaLlh.z < minSilma)
            {
                double sade = math.length(kohde) - katseKorkeus;
                double virhe = KameraEleet.SilmanKorkeus(katseKorkeus, etaisyys, kaytetty, sade) - silmaLlh.z;
                (kaytetty, etaisyys) = KameraEleet.Maastolle(katseKorkeus, etaisyys, kaytetty, minSilma + virhe, sade);
                k = math.radians(kaytetty);
                suunta = ylos * math.cos(k) - eteen * math.sin(k);
                silma = kohde + suunta * etaisyys;
                silmaLlh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(silma);
            }
            KaytettyKallistus = kaytetty;
            silmanLat = silmaLlh.y;
            silmanLon = silmaLlh.x;
            silmanKorkeus = silmaLlh.z;
            double3 kameranYlos = eteen * math.cos(k) + ylos * math.sin(k);

            var gt = georeferenssi.transform;
            var p = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(silma));
            var t = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(kohde));
            var yl = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(kameranYlos));
            transform.SetPositionAndRotation(p, Quaternion.LookRotation(t - p, yl));

            // Leikkaustasot seuraavat korkeutta: lähellä pintaa tarkkuus riittää.
            var kamera = GetComponent<Camera>();
            if (kamera != null)
            {
                double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
                // Kaukotaso: etäisyys + pallon halkaisija kattaa aina horisontin (85°:n kallistuksessa silmä on ≥ 150 m
                // maasta, horisontti √(2Rh) ≤ satoja km), joten matalassakin kulmassa horisontin laatat mahtuvat.
                // Lähitaso: kallistuksessa 1 % etäisyydestä, mutta enintään puolet raosta maastoon, ettei läheinen
                // vuori leikkaudu (Metal käyttää käänteistä syvyyttä, joten pieni lähitaso ei syö tarkkuutta).
                double lahi = kaytetty > 0 ? math.max(50.0, etaisyys * 0.01) : math.max(100.0, etaisyys * 0.02);
                lahi = math.min(lahi, math.max(1.0, (silmanKorkeus - maasto) * 0.5));
                kamera.nearClipPlane = (float)lahi;
                kamera.farClipPlane = (float)math.max(etaisyys + 2.0 * r, KaukorajaVahintaan);
            }
        }
    }
}
