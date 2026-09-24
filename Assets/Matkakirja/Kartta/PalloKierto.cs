using System;
using System.Collections.Generic;
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
    /// hiipuu pehmeästi. Kahden sormen nipistys zoomaa, ja sormien keskipisteen siirto
    /// pyörittää samalla. Lyhyt kosketus ilman liikettä on napautus (<see cref="Napautettu"/>).
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
        [Tooltip("Lähin näkymä: kapeamman suunnan kaari asteina. Verkkopelin lähin on 3,6° " +
                 "(PALLOLAUDAN_SIIRTOLEVEYS); lähempänä pallolaattojen Z8 venyy sumeaksi.")]
        public double minKaari = 3.6;
        [Tooltip("Kuinka suuren osan kapeammasta kuvakulmasta pallo täyttää kaukaisimmillaan.")]
        public double taytto = 0.92;
        public double maxLeveys = 80.0;

        [Header("Kallistus")]
        [Tooltip("Kameran kallistus pystysuorasta, asteina (0 = suoraan alas).")]
        public double kallistus = 0.0;
        [Tooltip("Suurin kallistus lähimmässä näkymässä.")]
        public double maxKallistus = 60.0;
        [Tooltip("Katseen vaakasuunta asteina (0 = kamera katsoo pohjoiseen, 90 = itään). Pelaajan eleet olettavat 0:n; lennon kuvaus kääntää ja palauttaa.")]
        public double suuntima = 0.0;
        [Tooltip("Katsottavan pisteen korkeus metreinä (lennon kuvaus katsoo konetta).")]
        public double katseKorkeus = 0.0;
        [Tooltip("Suuntiman ja katseen korkeuden palautuksen aikavakio lennon jälkeen, sekunteja.")]
        public double palautusAika = 0.6;

        [Tooltip("Korkeus (km), jonka yläpuolella kallistus on nolla; väliltä se liukuu.")]
        public double kallistusRajaKm = 3000.0;
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
        public bool Liikkeessa => edellinenSormia > 0 || math.lengthsq(liuku) > 1e-4 || ajo != null || Seurataan || porttiTila;

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
            Aseta();
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
            /// <summary>Kallistus ajon lopussa (saapumisnäkymä: 0); null = kallistus ei muutu.</summary>
            public double? kallistukseen;
            public double kallistusAlku;
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
            if (!Application.isPlaying) return;
            EnhancedTouchSupport.Enable();
            // Saapumisnäkymän maarajat (web saapumisrajaus): ladataan kerran taustalla.
            StartCoroutine(Saapumisrajaus.Lataa());
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
            if (!Seurataan && (suuntima != 0 || katseKorkeus != 0)) Palauta(Time.unscaledDeltaTime);
            Aseta();
            var nakyma = new double4(pituus, leveys, korkeus, kallistus + suuntima * 1000.0);
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

        /// <summary>Sallittu kallistus annetulla korkeudella (lennon lasku päättyy tähän, ettei kamera hyppää).</summary>
        public double KallistusRaja(double korkeusM)
        {
            double raja = kallistusRajaKm * 1000.0;
            double min = MinKorkeus();
            return maxKallistus * math.saturate((raja - korkeusM) / math.max(1.0, raja - min));
        }

        /// <summary>Korkeus, jolla koko pallo mahtuu kuvan kapeampaan suuntaan.</summary>
        public double MaxKorkeus()
        {
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            return r / math.sin(PuoliKulma() * taytto) - r;
        }

        /// <summary>Korkeus, jolla kapeampi suunta näyttää <see cref="minKaari"/> astetta.</summary>
        public double MinKorkeus()
        {
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            return math.radians(minKaari) * r / (2.0 * math.tan(PuoliKulma()));
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
        /// Synteettinen ele (Komennot: veto, nipistys): sormien paikat näytön osuuksina
        /// (0–1) ajan funktiona. Syötetään samaan ohjaukseen kuin oikeat sormet.
        /// </summary>
        public class Ele
        {
            public float kesto, aika;
            public float2 a0, a1;        // 1. sormi alussa ja lopussa
            public float2 b0, b1;        // 2. sormi (vain nipistys)
            public bool kaksi;
        }

        Ele ele;

        /// <summary>Aloittaa synteettisen eleen; sen jälkeinen kehys ilman sormia on irrotus (liuku).</summary>
        public void AloitaEle(Ele e) => ele = e;

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

            if (ele != null)
            {
                ele.aika += (float)dt;
                float t = math.saturate(ele.aika / ele.kesto);
                var ruutu = new float2(Screen.width, Screen.height);
                float2 a = math.lerp(ele.a0, ele.a1, t) * ruutu;
                if (ele.kaksi)
                {
                    float2 b = math.lerp(ele.b0, ele.b1, t) * ruutu;
                    n = 2; keski = (a + b) * 0.5f; vali = math.distance(a, b);
                }
                else { n = 1; keski = a; }
                if (t >= 1f) ele = null;
            }
            else if (n > 0)
            {
                for (int i = 0; i < n; i++) keski += (float2)sormet[i].screenPosition;
                keski /= n;
                if (n >= 2) vali = math.distance(sormet[0].screenPosition, sormet[1].screenPosition);
            }
            else if (!syoteEstetty && Mouse.current != null && Mouse.current.leftButton.isPressed)
            {
                n = 1;
                keski = Mouse.current.position.ReadValue();
            }

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
                        // Kahden sormen pystyveto kallistaa (kuten Apple Mapsissa), vaakaveto pyörittää.
                        kallistus = math.clamp(kallistus - siirto.y / Kerroin * kallistusHerkkyys, 0, KallistusRaja());
                        siirto.y = 0;
                    }
                    Kierra(siirto, dt);
                    if (n >= 2 && edellinenVali > 1f && vali > 1f)
                        korkeus = math.clamp(korkeus * edellinenVali / vali, MinKorkeus(), MaxKorkeus());
                }
                edellinenKeski = keski;
                edellinenVali = vali;
            }
            else
            {
                if (edellinenSormia > 0)
                {
                    if (kosketusMatka <= napautusLiike && kosketusAika <= napautusAika)
                    {
                        vetoNopeus = 0;
                        Napautettu?.Invoke(edellinenKeski);
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
            // Veto oikealle tuo lännen näkyviin (pallo pyörii sormen mukana).
            var muutos = new double2(-pikselit.x * a / cos, -pikselit.y * a);
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

        /// <summary>
        /// SAAPUMISNÄKYMÄ tälle ruudulle (web js/pallolauta/lauta.js saavu → kamera.js kotiin): maan
        /// saapumislaatikko (<see cref="Saapumisrajaus"/>) sovitettuna kameran kuvaan, tai webin kaupunkinäkymä,
        /// kun maa on tuntematon, rajat eivät ole vielä latautuneet tai <paramref name="maaRajaus"/> on false
        /// (web siirto.js laske: avauslento ajaa kotiin ilman laatikkoa). maa = pelaajan kaupungin ISO3
        /// (reitin varrella null, kuten webin cityOf); lat/lon = pelaajan paikka. Ruutu on kameran kuva
        /// pisteinä (webin kotelo css-pikseleinä), FOV kameran pystykulma ja dpr <see cref="Pistekerroin"/>.
        /// </summary>
        public Saapumisnakyma.Tulos SaapumisNakyma(string maa, double lat, double lon, bool maaRajaus = true)
        {
            var kamera = GetComponent<Camera>();
            double kerroin = Pistekerroin;
            double leveysPt = (kamera != null ? kamera.pixelWidth : Screen.width) / kerroin;
            double korkeusPt = (kamera != null ? kamera.pixelHeight : Screen.height) / kerroin;
            double fov = kamera != null ? kamera.fieldOfView : Saapumisnakyma.PalloFov;
            var laatikko = maaRajaus ? Saapumisrajaus.Laatikko(maa, lat, lon) : null;
            return Saapumisnakyma.Laske(laatikko, lat, lon, leveysPt, korkeusPt, fov, kerroin);
        }

        /// <summary>
        /// Kamera-ajo saapumisnäkymään (<see cref="SaapumisNakyma"/>): korkeus pallonsäteistä metreiksi
        /// (× WGS84:n iso akseli, kuten <see cref="KorkeusKaarelle"/>) ja kallistus ajon aikana nollaan (web:
        /// kallistus 0, pohjoinen ylös; suuntima palautuu jo itsestään, Palauta). Pehmennys on natiivin oletus
        /// (smootherstep, omistaja 24.9.). Sormi keskeyttää kuten muutkin ajot.
        /// </summary>
        public Saapumisnakyma.Tulos AjaSaapumisnakymaan(string maa, double lat, double lon, float kestoS, Action valmis,
            bool maaRajaus = true)
        {
            var t = SaapumisNakyma(maa, lat, lon, maaRajaus);
            Aja(t.Lat, t.Lon, t.Korkeus * CesiumWgs84Ellipsoid.GetMaximumRadius(), kestoS, valmis);
            if (ajo != null)
            {
                ajo.kallistusAlku = kallistus;
                ajo.kallistukseen = 0;
            }
            Debug.Log($"MATKAKIRJA saapuminen: {maa ?? "-"} {t.Tapa} → ({t.Lat:0.###}, {t.Lon:0.###}) " +
                      $"korkeus {t.Korkeus:0.####} R, näkyvä leveys {t.NakyvaLeveys:0} yks" +
                      (t.Laatikko.HasValue ? $", laatikko {t.Laatikko.Value}" : "") +
                      (Saapumisrajaus.Valmis ? "" : " (rajat lataamatta)"));
            return t;
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
            if (ajo.kallistukseen.HasValue) kallistus = math.lerp(ajo.kallistusAlku, ajo.kallistukseen.Value, e);
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

        /// <summary>Lennon jälkeen suuntima kääntyy lyhintä tietä pohjoiseen ja katse laskeutuu maahan.</summary>
        void Palauta(double dt)
        {
            double a = 1.0 - math.exp(-dt / math.max(0.05, palautusAika));
            double s = ((suuntima % 360.0) + 540.0) % 360.0 - 180.0;
            s -= s * a;
            suuntima = math.abs(s) < 0.05 ? 0.0 : s;
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
            if (!vapaaKuvaus) kallistus = math.min(kallistus, KallistusRaja());

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
            double k = math.radians(kallistus);
            double3 suunta = ylos * math.cos(k) - eteen * math.sin(k);
            double3 silma = kohde + suunta * korkeus;
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
                kamera.nearClipPlane = (float)math.max(100.0, korkeus * 0.02);
                kamera.farClipPlane = (float)math.max(korkeus + 2.0 * r, KaukorajaVahintaan);
                if (kallistus > 0) kamera.nearClipPlane = (float)math.max(50.0, korkeus * 0.01);
            }
        }
    }
}
