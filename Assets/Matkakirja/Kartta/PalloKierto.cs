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

        [Tooltip("Kallistusasteita näytön pisteelle kahden sormen pystyvedossa (KameraEleet.KallistusHerkkyys).")]
        public double kallistusHerkkyys = KameraEleet.KallistusHerkkyys;

        [Header("Napautus")]
        [Tooltip("Suurin liike näytön pisteinä, joka vielä on napautus.")]
        public float napautusLiike = 10f;
        public float napautusAika = 0.35f;

        [Header("Kamera-ajo")]
        [Tooltip("Verkkopelin SAATON_RAMPPI.")]
        public double ajonRamppi = 0.3;

        [Header("Aloitusportti (web etusivupallo, löydös 17)")]
        // KAMERA SEURAA ETUSIVUN LENTOA (löydös 112): ennen tasainen kierto 360° / 49,6 s leveydellä 25° ja
        // Lontoosta alkaen (porttiNopeus, porttiLeveys, porttiPituus); nyt pituus ja leveys ovat webin kameranNakyma
        // (EtusivunLento.KameranNakyma: koneen silotettu paikka ±3,4 s, leveys 0,62 × rajattuna 2–38°).
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
        /// etusivun lennon mukana (<see cref="PorttiAika"/>, kone ja punainen viiva: Etusivulento), kaupunkimerkit, nimiöt, karttapisteet, valot ja nostot piiloon,
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

        /// <summary>
        /// Linssi auki (LinssiOhjain.Pelikerrokset): kuvasumennus ei koske linssiä. Kerronnan kuvat (KuvaSumea) jäivät
        /// sumentamaan koko linssin, jos se avattiin kesken kerronnan (Linssisepän pariteettiajo 25.9., rivi 39:
        /// renderScale 0,44, nimet ja kehä katosivat).
        /// </summary>
        public static bool LinssiAuki { get; set; }

        /// <summary>Editorin pelitila ilman domain reloadia: staattinen tila ei jää edellisestä ajosta.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaPortti()
        {
            PorttiSumea = false; KuvaSumea = false; LinssiAuki = false; PorttiAikaSeis = false;
            siirtoAlku = siirtoKohde = siirtoNyt = Vector2.zero; siirtoT = 1f;
        }

        /// <summary>Kamera on aloituspallotilassa (PorttiSumea luettu tässä kehyksessä).</summary>
        public bool Portissa => porttiTila;
        bool porttiTila;
        PalloSumennus sumennus;
        Etusivulento etusivulento;

        /// <summary>
        /// Etusivun lennon kierrosaika sekunteina [0, EtusivunLento.Kesto): kamera (PorttiKierto) ja kone + viiva
        /// (<see cref="Etusivulento"/>) lukevat saman hetken. Alkaa nollasta aina, kun portti avautuu.
        /// </summary>
        public double PorttiAika { get; private set; }

        /// <summary>Testikomento "etusivu aika &lt;s&gt; [pysayta]": hyppää kierroksen hetkeen (webin klippien vertailu).</summary>
        public void AsetaPorttiAika(double t) => PorttiAika = EtusivunLento.Kierroksessa(t);

        /// <summary>Testikomento "etusivu pysayta|jatka": kierrosaika seis (kuvaus samasta hetkestä kuin web).</summary>
        public static bool PorttiAikaSeis { get; set; }

        /// <summary>Onko sormi ruudulla, liukuma tai kamera-ajo käynnissä (kehysmittari lukee).</summary>
        public bool Liikkeessa => edellinenSormia > 0 || math.lengthsq(liuku) > 1e-4 || ajo != null || Seurataan || porttiTila || pohjoiseen
                                  || LinssisiirtoLiukuu;

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
        public void SovitaPisteet(IReadOnlyList<(double lat, double lon)> pisteet, double marginaali = KohdesovitusMarginaali,
                                  float kestoS = KohdesovitusKesto, (double lat, double lon)? oma = null)
        {
            if (pisteet == null || pisteet.Count == 0) return;
            var kaikki = new List<(double lat, double lon)>(pisteet);
            if (oma is (double, double) o) kaikki.Add(o);
            bool mahtuu = true;
            var kamera = GetComponent<Camera>();
            // Web: 2 px sieto (SOVITUKSEN_SIETO_PX) marginaalin reunalla.
            float mx = (float)(Screen.width * marginaali) - 2f * Pistekerroin, my = (float)(Screen.height * marginaali) - 2f * Pistekerroin;
            foreach (var p in kaikki)
            {
                if (!RuutuPiste(p.lat, p.lon, out var r)) { mahtuu = false; break; }
                if (r.x < mx || r.x > Screen.width - mx || r.y < my || r.y > Screen.height - my) { mahtuu = false; break; }
            }
            if (mahtuu || kamera == null) return;
            // Rajaus kuten web kohteidenRajaus: pituudet lähimpään kiertoon oman paikan suhteen (kiertoKohdat), keskelle.
            double viite = oma?.lon ?? pisteet[0].lon;
            double lat0 = double.MaxValue, lat1 = double.MinValue, lon0 = double.MaxValue, lon1 = double.MinValue;
            foreach (var p in kaikki)
            {
                double l = viite + (((p.lon - viite) % 360.0 + 540.0) % 360.0 - 180.0);
                lat0 = math.min(lat0, p.lat); lat1 = math.max(lat1, p.lat);
                lon0 = math.min(lon0, l); lon1 = math.max(lon1, l);
            }
            double clat = (lat0 + lat1) * 0.5, clon = ((((lon0 + lon1) * 0.5) % 360.0 + 540.0) % 360.0) - 180.0;
            double suurin = 0;
            foreach (var p in kaikki) suurin = math.max(suurin, ReittiGeometria.Kulma(clat, clon, p.lat, p.lon));
            // Web: tila = leveys − 2 · reuna, ja mittakaava vain loitontaa (min(s, tarvittu)); keskitys aina.
            double tavoite = math.max(korkeus, KorkeusKaarelle(2.0 * suurin / math.max(0.1, 1.0 - 2.0 * marginaali)));
            Aja(clat, clon, tavoite, kestoS, null);
        }

        /// <summary>Web js/ui.js:942 KOHDESOVITUKSEN_MARGINAALI.</summary>
        public const double KohdesovitusMarginaali = 0.14;
        /// <summary>Web js/ui.js:999 KOHDESOVITUKSEN_MS 720.</summary>
        public const float KohdesovitusKesto = 0.72f;

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
            var kamera = GetComponent<Camera>();
            if (linssiAsetettu && kamera != null) kamera.ResetProjectionMatrix();
            linssiAsetettu = false;
            porttiLinssi = 0f;
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
            if (Application.isPlaying) PaivitaPorttiLinssi(Time.unscaledDeltaTime);
            var nakyma = new double4(pituus, leveys, korkeus, KaytettyKallistus + suuntima * 1000.0);
            if (!nakyma.Equals(edellinenNakyma)) { edellinenNakyma = nakyma; NakymaMuuttui?.Invoke(); }
            bool lepo = !Liikkeessa && !Peitetty;
            if (lepo != Levossa) { Levossa = lepo; LepoMuuttui?.Invoke(lepo); }
        }

        /// <summary>
        /// Laitepikseliä yhdellä pisteellä (CSS px / iOS pt), kuten UI ja linssit: Round(dpi / 163).
        /// Pyöristämätön dpi/163 antoi 264 dpi:n iPadille 1,62 (iPadin 1x on 132 dpi), joten
        /// merkit ja viivat olivat 0,81× webin koosta. iPhonella dpi ei kelpaa: simulaattori antaa iPadin dpi:n
        /// (iPhone 17 Pro ×2 tai ×1, ruutu 603 × 1311 pt), joten iPhone luetaan lyhyestä sivusta kuten UI:n
        /// UiKerros.PikseliaPisteessa (85539c2): ≥ 1000 px on @3x (1080–1320), muuten @2x (SE 750, 11/XR 828).
        /// Oikeilla laitteilla tulos on sama kuin dpi-kaavalla (iPhone 17 Pro 460 dpi → 3, iPhone 11 326 dpi → 2).
        /// </summary>
        public static float Pistekerroin
        {
            get
            {
                if (Puhelin()) return Mathf.Min(Screen.width, Screen.height) >= 1000 ? 3f : 2f;
                return Screen.dpi > 0 ? Mathf.Max(1f, Mathf.Round(Screen.dpi / 163f)) : 1f;
            }
        }

        /// <summary>iPhone (UiKerros.Tabletti käänteisenä): mobiili, ei iPad-mallinimeä eikä iPadin kuvasuhdetta (&lt; 1,6).</summary>
        static bool Puhelin()
        {
            if (!Application.isMobilePlatform || SystemInfo.deviceModel.StartsWith("iPad", StringComparison.Ordinal)) return false;
            float pitka = Mathf.Max(Screen.width, Screen.height), lyhyt = Mathf.Max(1, Mathf.Min(Screen.width, Screen.height));
            return pitka / lyhyt >= 1.6f;
        }

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
                    PorttiAika = 0;
                }
                // Kone ja punainen viiva ruututasossa (löydös 112); kerros seuraa porttia itse (Portissa).
                if (sumea && etusivulento == null)
                {
                    etusivulento = gameObject.AddComponent<Etusivulento>();
                    etusivulento.kierto = this;
                }
            }
            // Sumennuksen tavoite: portti 6 pt, kuvat mieto (löydös 19), muuten pois.
            // Lennon kuvauksessa (vapaaKuvaus, Nappula.Lento) ei kuvasumennusta: sumennus on koko ruudun jälkikäsittely ja
            // sumensi myös koneen, kun lento-alun luenta näytti isoisän kuvan (Laitetestaaja 24.9., iPhone, f6de924).
            float tavoite = porttiTila ? porttiSumennusPt : KuvaSumea && !vapaaKuvaus && !LinssiAuki ? kuvaSumennusPt : 0f;
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

        /// <summary>
        /// Aloituspallo: kamera seuraa etusivun lentoa webin tapaan (js/etusivupallo.js kameranNakyma 411–426):
        /// pituus = koneen silotettu pituus, leveys = clamp(0,62 × silotettu leveys, 2°, 38°); korkeus täyttää ruudun.
        /// </summary>
        void PorttiKierto(double dt)
        {
            if (!PorttiAikaSeis) PorttiAika = EtusivunLento.Kierroksessa(PorttiAika + dt);
            var nakyma = EtusivunLento.KameranNakyma(PorttiAika);
            pituus = Kiedo(nakyma.Lon);
            leveys = nakyma.Lat;
            korkeus = PorttiKorkeus();
            kallistus = 0;
            suuntima = 0;
            pohjoiseen = false;
            katseKorkeus = 0;
        }

        /// <summary>
        /// Portin korkeus = webin ETUSIVUN_KAMERA.korkeus 1,55 pallon sädettä (D = 2,55), jotta perspektiivi on sama kuin
        /// webin videossa. Kuvan koko ja kiekon paikka tulevat projektiosta (<see cref="PaivitaPorttiLinssi"/>, web
        /// pallonSovitus: kiekko 1,15 × nurkkaetäisyys). Ennen löydöstä 112 korkeus sovitti kiekon fov 50°:lla (D ≈ 1,97),
        /// jolloin reitin pohjoinen osa kulki 50–75 pt webiä ylempänä.
        /// </summary>
        public double PorttiKorkeus() => EtusivunLento.KameranKorkeus * CesiumWgs84Ellipsoid.GetMaximumRadius();

        float porttiLinssi;
        bool linssiAsetettu;

        /// <summary>
        /// PORTIN LINSSI (löydös 112): webin etusivupallo on video, joka on zoomattu (cover × lisays) ja keskitetty
        /// .intro-paneeliin — sama kuva syntyy kamerasta D = 2,55, jonka pystykulma on 2·atan(ruudun korkeus / 2F) ja
        /// kuvakeskipiste siirretty kiekon keskelle (EtusivunLento.RuudulleSovitus; iPhone 393 × 852: fov 39,9°,
        /// keskipiste 25 pt alempana). Vain projektiomatriisi vaihtuu: fieldOfView pysyy 50°:ssa kaikille lukijoille.
        /// Portista poistuttaessa linssi liukuu takaisin <see cref="porttiHaivytysS"/>:ssa (sumennuksen kanssa), sitten
        /// ResetProjectionMatrix. Lähi- ja kaukoraja luetaan joka kehys (Aseta).
        /// </summary>
        void PaivitaPorttiLinssi(double dt)
        {
            var kamera = GetComponent<Camera>();
            if (kamera == null) return;
            porttiLinssi = Mathf.MoveTowards(porttiLinssi, porttiTila ? 1f : 0f, (float)dt / Mathf.Max(0.01f, porttiHaivytysS));
            PaivitaLinssisiirto((float)dt);
            if (porttiLinssi <= 0f && siirtoNyt == Vector2.zero)
            {
                if (linssiAsetettu) { kamera.ResetProjectionMatrix(); linssiAsetettu = false; }
                return;
            }
            float fov = kamera.fieldOfView, m02 = 0f, m12 = 0f;
            if (porttiLinssi > 0f)
            {
                float kerroin = Pistekerroin;
                double lev = kamera.pixelWidth / kerroin, kork = kamera.pixelHeight / kerroin;
                if (lev <= 0 || kork <= 0) return;
                var sov = EtusivunLento.RuudulleSovitus(lev, kork);
                float osuus = Mathf.SmoothStep(0f, 1f, porttiLinssi);
                float fovWeb = (float)(2.0 * math.degrees(math.atan(kork / 2.0 / sov.F)));
                fov = Mathf.Lerp(kamera.fieldOfView, fovWeb, osuus);
                // Kuvakeskipisteen siirto (lens shift): x_ndc − m02, y_ndc − m12; ruudun y alas = NDC:n y alas.
                m02 = -2f * (float)((sov.Cx - lev / 2.0) / lev) * osuus;
                m12 = 2f * (float)((sov.Cy - kork / 2.0) / kork) * osuus;
            }
            // Linssisiirto: optisen akselin piste (katsekohde) siirtyy ruudulla dx oikealle ja dy ylös ruudun osuuksina,
            // eli NDC:ssä 2·d (akselin piste on x_ndc = −m02, y_ndc = −m12).
            m02 -= 2f * siirtoNyt.x;
            m12 -= 2f * siirtoNyt.y;
            var p = Matrix4x4.Perspective(fov, kamera.aspect, kamera.nearClipPlane, kamera.farClipPlane);
            p[0, 2] = m02;
            p[1, 2] = m12;
            kamera.projectionMatrix = p;
            linssiAsetettu = true;
        }

        // ---- LINSSISIIRTO (Ihmisen matka II, Linssisepän tilaus 25.9.2026: "kartta väistää") ----
        // Isot havainnekuvat peittävät osan ruudusta, joten tarinan kohta siirretään vapaaseen osaan kameraa liikuttamatta:
        // vain projektion pääpiste siirtyy (kuten portin linssissä), joten kallistus, etäisyys ja eleet pysyvät ennallaan.
        static Vector2 siirtoAlku, siirtoKohde, siirtoNyt;
        static float siirtoT = 1f, siirtoKestoS;

        /// <summary>
        /// Katsekohde siirtyy ruudulla dx (oikealle) ja dy (ylös) ruudun leveyden ja korkeuden osuuksina, esim. (0, −0,25) =
        /// kohde ruudun keskeltä alaspäin neljänneksen verran. Liuku kestoS sekunnissa (ease in/out, KAMERA-AJOT); uusi kutsu
        /// jatkaa nykyisestä kohdasta. (0, 0) palauttaa.
        /// </summary>
        public static void Linssisiirto(float dx, float dy, float kestoS)
        {
            siirtoAlku = siirtoNyt;
            siirtoKohde = new Vector2(Mathf.Clamp(dx, -0.5f, 0.5f), Mathf.Clamp(dy, -0.5f, 0.5f));
            siirtoKestoS = Mathf.Max(0f, kestoS);
            siirtoT = 0f;
            if (siirtoKestoS <= 0f) { siirtoNyt = siirtoKohde; siirtoT = 1f; }
        }

        /// <summary>Nykyinen linssisiirto (ruudun osuuksina).</summary>
        public static Vector2 LinssisiirtoNyt => siirtoNyt;
        /// <summary>Linssisiirto liukuu (kuva muuttuu, vaikka kamera on paikallaan: lepopiirto ei saa harventaa).</summary>
        public static bool LinssisiirtoLiukuu => siirtoT < 1f;

        static void PaivitaLinssisiirto(float dt)
        {
            if (siirtoT >= 1f) return;
            siirtoT = Mathf.Min(1f, siirtoT + dt / Mathf.Max(1e-3f, siirtoKestoS));
            // Smootherstep: nopeus ja kiihtyvyys nollassa molemmissa päissä.
            float s = siirtoT * siirtoT * siirtoT * (siirtoT * (siirtoT * 6f - 15f) + 10f);
            siirtoNyt = siirtoT >= 1f ? siirtoKohde : Vector2.LerpUnclamped(siirtoAlku, siirtoKohde, s);
        }

        /// <summary>Sallittu kallistus tällä korkeudella: kaukaa pallo katsotaan aina suoraan.</summary>
        public double KallistusRaja() => KallistusRaja(korkeus);

        /// <summary>
        /// Sallittu kallistus annetulla korkeudella (lennon lasku päättyy tähän, ettei kamera hyppää): täysi
        /// <see cref="maxKallistus"/> ≤ <see cref="kallistusTaysiKm"/>, nolla ≥ <see cref="kallistusNollaKm"/>,
        /// välillä smootherstep (KameraEleet.KallistusRaja). Rajaa käytetyn kallistuksen, ei tallennettua.
        /// Lisäksi horisonttiusvan katto (<see cref="KallistusKattoPaalla"/>) ja kallistuksen kytkin
        /// (<see cref="KallistusSallittu"/>); eleet lukevat rajan tästä eivätkä muutu.
        /// </summary>
        public double KallistusRaja(double korkeusM)
        {
            if (!KallistusSallittu) return 0.0;
            double raja = KameraEleet.KallistusRaja(korkeusM, maxKallistus, kallistusTaysiKm * 1000.0, kallistusNollaKm * 1000.0);
            if (KallistusKattoPaalla && raja > 0.0)
                raja = math.min(raja, Horisonttiusva.KallistusKatto(korkeusM, PuoliKulmaPysty(),
                    CesiumWgs84Ellipsoid.GetMaximumRadius(), raja));
            return raja;
        }

        // KALLISTUKSEN KATTO JA KYTKIN (omistajan löydös 46, build 11: "kallistus on aneeminen", "kallistuksen voi ottaa pois,
        // jos ei saada paremman näköiseksi"). Katto webin säännöllä (js/pallolauta/kallistus.js, horisontin raja 0,6 ×
        // korkeus): kallistus kasvaa, kunnes usvan raja laskee ruudun puoliväliin keskeltä yläreunaan (Horisonttiusva,
        // noin 52° Kreikan korkeudella; build 11:ssä 85°, jolloin kuva oli enimmäkseen horisonttia). Yläneljännes on
        // pergamenttiusvaa (Aurinko.cs), ei mustaa avaruutta. Kytkin on varavaihtoehto: oletus päällä.

        /// <summary>Pelaajan kallistus sallittu (komento "kallistus pois|paalle"). false = kartta aina suoraan ylhäältä
        /// (lennon kuvaus ei muutu). Oletus true.</summary>
        public static bool KallistusSallittu = true;
        /// <summary>Horisonttiusvan kallistuskatto (komento "kallistus katto pois|paalle"). Oletus true.</summary>
        public static bool KallistusKattoPaalla = true;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKallistus() { KallistusSallittu = true; KallistusKattoPaalla = true; }

        /// <summary>Pystysuuntainen puolikuvakulma asteina (Camera.fieldOfView on pystykulma).</summary>
        double PuoliKulmaPysty()
        {
            var kamera = GetComponent<Camera>();
            return (kamera != null ? kamera.fieldOfView : 50.0) * 0.5;
        }

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
        readonly KameraEleet.KiertoEstin kiertoEstin = new KameraEleet.KiertoEstin();
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

            if (n < 2) { lukko = Elelukko.Ei; kiertoEstin.Nollaa(); }
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
                            // Yhdensuuntainen pystyveto kallistaa; zoomi, suunta ja paikka pysyvät. Veto ylös kallistaa
                            // viistoon, alas palauttaa ylhäältä katsottavaksi (omistaja 24.9. klo 22.4x, KameraEleet.KallistusMuutos).
                            // Lähtö käytetystä kallistuksesta: tallennettu voi olla korkeuden rajaa suurempi.
                            double raja = KallistusRaja();
                            kallistus = math.clamp(math.min(kallistus, raja) + KameraEleet.KallistusMuutos(siirto.y / Kerroin, kallistusHerkkyys), 0, raja);
                            vetoNopeus = 0;
                        }
                        else if (lukko == Elelukko.NipistysKierto)
                        {
                            // Nipistys zoomaa, sormiparin kierto kääntää suuntimaa ja keskipisteen siirto panoroi;
                            // kallistus ei muutu (käytetty kallistus voi silti laskea pallon mittakaavassa, KallistusRaja).
                            Kierra(siirto, dt);
                            if (edellinenVali > 1f && vali > 1f)
                                korkeus = math.clamp(korkeus * edellinenVali / vali, MinKorkeus(), EleKatto());
                            // Tahaton kierto nipistyksessä ei käännä karttaa (KameraEleet.KiertoEstin, kynnys 15°).
                            double kierto = kiertoEstin.Suodata(KameraEleet.KulmaMuutos(Pt(edellinenA, 1f), Pt(edellinenB, 1f), Pt(sa, 1f), Pt(sb, 1f)));
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
                    kiertoEstin.Nollaa();
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
            RajaaMaahan();
        }

        // ---- MAAN RAJAT (build 13, liikkumisen pariteetti D7, D8, D11; web js/pallolauta/lauta.js:1690 maanZoomiraja
        //      ja :1778 maanPanoraja, kamera.js:1059 uloszoomausRaja ja :1089 panoraja) ----
        //
        // Tavallisessa pelissä saapumisen jälkeen pelaaja ei pääse loitontamaan saapumisnäkymää kauemmas (katto =
        // saapumisnäkymä, kerroin 1,02) eikä vetämään keskipistettä maan laatikosta × 1,3 ulos. Rajat koskevat vain
        // pelaajan eleitä (nipistys, veto, liuku); kamera-ajot (lennot, sovitukset, linssit) eivät rajaudu. Rajat
        // eivät ole voimassa: ennen ensimmäistä saapumista, maissa ilman laatikkoa (kaupunkinäkymä), matkalla
        // (<see cref="MatkallaVapaana"/>, web matkaZoomivapaus: nopan kohteiden sovitus avaa, saapuminen sulkee),
        // linssissä (KaupunkiMerkit.LinssiTila) eikä maailmatilassa (<see cref="MaailmaTila"/>).

        Saapumisnakyma.Laatikko? maanLaatikko;
        double maanKatto, maanToiveLng, webSuhde = 1;
        Saapumisnakyma.Panoraja? panorajaMuisti;
        KaupunkiMerkit kaupunkiMerkit;
        bool maailmaTila;

        /// <summary>Matka käynnissä: maan rajat pois (web matkaZoomivapaus(true)); saapuminen palauttaa.</summary>
        public bool MatkallaVapaana { get; set; }

        /// <summary>
        /// Maailmatila (Paavalikko.Maailma, kehittäjätila): rajat pois. Pelikoodari asettaa PeliOhjaimesta. Kun tila
        /// sammuu, kamera puristetaan heti maan kattoon ja rajaan (web tahdistaZoomirajat, ei ajoa, D11).
        /// </summary>
        public bool MaailmaTila
        {
            get => maailmaTila;
            set
            {
                if (maailmaTila == value) return;
                maailmaTila = value;
                if (!value) PuristaMaahan();
            }
        }

        bool RajatVoimassa
        {
            get
            {
                if (!maanLaatikko.HasValue || MatkallaVapaana || maailmaTila) return false;
                if (kaupunkiMerkit == null) kaupunkiMerkit = FindAnyObjectByType<KaupunkiMerkit>();
                return kaupunkiMerkit == null || !kaupunkiMerkit.LinssiTila;
            }
        }

        /// <summary>Eleen loitonnuksen katto metreinä: maan katto, jos rajat ovat voimassa, muuten koko pallo.</summary>
        double EleKatto() => RajatVoimassa && maanKatto > 0 ? math.clamp(maanKatto, MinKorkeus(), MaxKorkeus()) : MaxKorkeus();

        /// <summary>Asettaa maan rajat saapumisnäkymästä (AjaSaapumisnakymaan) tai poistaa ne (laatikoton saapuminen).</summary>
        void AsetaMaanRajat(Saapumisnakyma.Tulos t, double toiveLng)
        {
            var katto = Saapumisnakyma.Uloszoomauskatto(t);
            maanLaatikko = katto.HasValue ? t.Laatikko : null;
            maanKatto = katto.HasValue ? katto.Value * CesiumWgs84Ellipsoid.GetMaximumRadius() : 0;
            maanToiveLng = toiveLng;
            webSuhde = t.Korkeus > 0 ? t.WebKorkeus / t.Korkeus : 1;
            panorajaMuisti = null;
            MatkallaVapaana = false;
        }

        Saapumisnakyma.Panoraja? MaanPanoraja()
        {
            if (!maanLaatikko.HasValue) return null;
            if (panorajaMuisti.HasValue && !panorajaMuisti.Value.Elava) return panorajaMuisti;
            var kamera = GetComponent<Camera>();
            double k = Pistekerroin;
            var kotelo = Saapumisnakyma.WebinKotelo((kamera != null ? kamera.pixelWidth : Screen.width) / k,
                                                    (kamera != null ? kamera.pixelHeight : Screen.height) / k);
            double nyt = korkeus / CesiumWgs84Ellipsoid.GetMaximumRadius() * webSuhde;
            panorajaMuisti = Saapumisnakyma.MaanPanoraja(maanLaatikko.Value, kotelo.W, kotelo.H, maanToiveLng, nyt);
            return panorajaMuisti;
        }

        void RajaaMaahan()
        {
            if (!RajatVoimassa) return;
            var raja = MaanPanoraja();
            if (!raja.HasValue) return;
            var (lat, lon) = Saapumisnakyma.RajaaPanorointi(raja.Value, leveys, pituus);
            if (math.abs(lat - leveys) > 1e-9 || math.abs(Kiedo(lon - pituus)) > 1e-9)
            {
                leveys = lat;
                pituus = Kiedo(lon);
                vetoNopeus = 0; // liuku pysähtyy rajaan
            }
        }

        /// <summary>Kamera heti maan kattoon ja rajaan (maailmatila pois, D11).</summary>
        void PuristaMaahan()
        {
            if (!RajatVoimassa) return;
            korkeus = math.min(korkeus, EleKatto());
            RajaaMaahan();
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
        /// <param name="kallistukseen">Kallistus (°) ajon lopussa samalla pehmennyksellä; null = pelaajan kallistus säilyy
        /// (radion avaus 40°, radiouudistus build 12).</param>
        public void Aja(double lat, double lon, double kohdeKorkeus, float kestoS, Action valmis, Func<double, double> pehmennys,
            bool yliKaton = false, double? kallistukseen = null)
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
                kallistusAlku = kallistus,
                kallistukseen = kallistukseen.HasValue ? math.clamp(kallistukseen.Value, 0, 85) : (double?)null,
            };
        }

        /// <summary>
        /// SAAPUMISNÄKYMÄ tälle ruudulle (web js/pallolauta/lauta.js saavu → kamera.js kotiin): maan
        /// saapumislaatikko (<see cref="Saapumisrajaus"/>) sovitettuna kameran kuvaan, tai webin kaupunkinäkymä,
        /// kun maa on tuntematon, rajat eivät ole vielä latautuneet tai <paramref name="maaRajaus"/> on false
        /// (web siirto.js laske: avauslento ajaa kotiin ilman laatikkoa). maa = pelaajan kaupungin ISO3
        /// (reitin varrella null, kuten webin cityOf); lat/lon = pelaajan paikka. Ruutu on kameran kuva
        /// pisteinä, FOV kameran pystykulma ja dpr <see cref="Pistekerroin"/>. Webin näkymä lasketaan webin
        /// kotelolle (karttaruutu yläpalkin alla, <see cref="Saapumisnakyma.WebinKotelo"/>) ja siirretään koko ruudun
        /// kameraan (<see cref="Saapumisnakyma.LaskeRuudulle"/>, löydös 50): sama mittakaava pisteinä ja webin
        /// keskipiste kotelon keskellä.
        /// </summary>
        public Saapumisnakyma.Tulos SaapumisNakyma(string maa, double lat, double lon, bool maaRajaus = true)
        {
            var kamera = GetComponent<Camera>();
            double kerroin = Pistekerroin;
            double leveysPt = (kamera != null ? kamera.pixelWidth : Screen.width) / kerroin;
            double korkeusPt = (kamera != null ? kamera.pixelHeight : Screen.height) / kerroin;
            double fov = kamera != null ? kamera.fieldOfView : Saapumisnakyma.PalloFov;
            var laatikko = maaRajaus ? Saapumisrajaus.Laatikko(maa, lat, lon) : null;
            return Saapumisnakyma.LaskeRuudulle(laatikko, lat, lon, leveysPt, korkeusPt, fov, kerroin);
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
            AsetaMaanRajat(t, lon);
            Aja(t.Lat, t.Lon, t.Korkeus * CesiumWgs84Ellipsoid.GetMaximumRadius(), kestoS, valmis);
            if (ajo != null)
            {
                ajo.kallistusAlku = kallistus;
                ajo.kallistukseen = 0;
            }
            // Webin saapuminen on pohjoinen ylös; eleet (löydös 30) säilyttävät pelaajan suuntiman, joten käännetään
            // se samassa ajassa takaisin.
            PalautaPohjoinen(kestoS);
            Debug.Log($"MATKAKIRJA saapuminen: {maa ?? "-"} {t.Tapa} → ({t.Lat:0.###}, {t.Lon:0.###}) " +
                      $"korkeus {t.Korkeus:0.####} R, näkyvä leveys {t.NakyvaLeveys:0} yks; web kotelossa ({t.WebLat:0.###}, " +
                      $"{t.WebLon:0.###}) {t.WebKorkeus:0.####} R" +
                      (t.Laatikko.HasValue ? $", laatikko {t.Laatikko.Value}" : "") +
                      (Saapumisrajaus.Valmis ? "" : " (rajat lataamatta)"));
            return t;
        }

        [Tooltip("Panoroinnin (Panoroi) pehmennyksen ramppi: web LIUSKAN_AJON_RAMPPI 0,12.")]
        public double panorointiRamppi = Panorointi.LiuskanRamppi;

        /// <summary>
        /// PANOROINTI RUUTUPISTEESEEN (Natiivi-UI, löydös 48; web js/pallolauta/lauta.js napautaKaupunki → ajaKamera
        /// LIUSKAN_AJO_MS 420 ja LIUSKAN_PEHMENNYS): kamera ajaa niin, että maan pinnan piste (lat, lon, korkeus 0)
        /// päätyy ruutupisteeseen <paramref name="ruutuMaali"/> (pikseleinä, origo vasen alakulma kuten
        /// <see cref="RuutuPiste"/>). Korkeus, kallistus ja suuntima eivät muutu, vain katselupiste liikkuu
        /// (pituus ja leveys lineaarisesti, kuten <see cref="Aja"/>, ilman nousukaarta). Pehmennys on webin
        /// siirtoajonPehmennys rampilla <see cref="panorointiRamppi"/>; kesto <paramref name="kestoS"/> (web 0,42 s,
        /// <see cref="Panorointi.LiuskanAjoS"/>), 0 tai alle = heti. Sormi keskeyttää kuten muutkin ajot, eikä
        /// <paramref name="valmis"/>-kutsua silloin tehdä; muuten se kutsutaan ajon lopussa.
        ///
        /// Katselupiste ratkaistaan numeerisesti (<see cref="Panorointi.Ratkaise"/>) samalla asennonlaskulla kuin
        /// kameran päivitys (<see cref="LaskeAsento"/>), alkuarvauksena maa maalipikselin alla. Reunatapaukset:
        /// piste ruudun ulkopuolella tai pallon takana ratkeaa samoin (projektio ei välitä peitosta). Jos ratkaisu
        /// ei osu 2 px:n sisään (maalipikseli taivasta kallistetussa kuvassa, katselupisteen leveysraja ±maxLeveys)
        /// tai piste jäisi ratkaisussa horisontin taakse, kamera ajaa pisteen ruudun keskelle (katselupiste = piste),
        /// jolloin se ainakin näkyy; lokiin varoitus. Käynnissä oleva pohjoisen palautus lasketaan valmiiksi
        /// (suuntima 0). Ilman kameraa tai georeferenssiä valmis kutsutaan heti.
        /// </summary>
        public void Panoroi(double lat, double lon, Vector2 ruutuMaali, float kestoS, Action valmis)
        {
            var kamera = GetComponent<Camera>();
            if (georeferenssi == null || kamera == null || !Kelvollinen() || !math.isfinite(lat) || !math.isfinite(lon))
            {
                Debug.LogWarning("MATKAKIRJA panorointi: ei kameraa tai kelvotonta tilaa, ohitetaan");
                valmis?.Invoke();
                return;
            }
            kosketettu = true;
            liuku = 0;
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            double suunt = pohjoiseen ? 0.0 : suuntima;
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, 0.0));
            Panorointi.Projektio f = (double p, double l, out double x, out double y) =>
                Projisoi(kamera, LaskeAsento(p, l, suunt), kohde, out x, out y);

            // Alkuarvaus: maa maalipikselin alla nykyisessä kuvassa (säde ellipsoidiin); taivasta vasten kohde itse.
            var alku = (pituus: lon, leveys: lat);
            var a0 = LaskeAsento(pituus, leveys, suunt);
            if (MaaRuudulla(kamera, a0, ruutuMaali, out double3 maa))
            {
                var llh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(maa);
                alku = Panorointi.Alkuarvaus(pituus, leveys, llh.x, llh.y, lon, lat, maxLeveys);
            }
            var r = Panorointi.Ratkaise(f, alku.pituus, alku.leveys, ruutuMaali.x, ruutuMaali.y,
                AstettaPikselille() * 4.0, maxLeveys, 0.25, 8);
            bool kelpaa = r.Virhe <= 2.0;
            if (kelpaa)
            {
                var a1 = LaskeAsento(r.Pituus, r.Leveys, suunt);
                kelpaa = math.dot(CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde), a1.silma - kohde) > 0.0;
            }
            if (!kelpaa)
            {
                Debug.LogWarning($"MATKAKIRJA panorointi: ({lat:0.###}, {lon:0.###}) → ({ruutuMaali.x:0}, {ruutuMaali.y:0}) " +
                                 $"ei ratkea (virhe {r.Virhe:0.#} px, {r.Kierroksia} kierrosta) → piste ruudun keskelle");
                r.Pituus = Kiedo(lon);
                r.Leveys = math.clamp(lat, -maxLeveys, maxLeveys);
            }
            if (kestoS <= 0f)
            {
                ajo = null;
                pituus = r.Pituus;
                leveys = r.Leveys;
                Aseta();
                valmis?.Invoke();
                return;
            }
            double ramppi = panorointiRamppi;
            ajo = new Ajo
            {
                alku = new double3(pituus, leveys, korkeus),
                loppu = new double3(pituus + Kiedo(r.Pituus - pituus), r.Leveys, korkeus),
                kesto = math.max(0.05, kestoS),
                nousu = 0.0,
                valmis = valmis,
                pehmennys = t => Pehmennys(t, ramppi),
            };
        }

        /// <summary>Ruutupisteen säteen ensimmäinen osuma ellipsoidiin (korkeus 0) asennosta a; false = taivas.</summary>
        static bool MaaRuudulla(Camera kamera, in Asento a, Vector2 ruutu, out double3 osuma)
        {
            osuma = default;
            double3 eteen = math.normalize(a.kohde - a.silma);
            double3 ylos = math.normalize(a.ylos - eteen * math.dot(a.ylos, eteen));
            double3 oikea = math.cross(eteen, ylos);
            double tanY = math.tan(math.radians(kamera.fieldOfView) * 0.5);
            var rect = kamera.pixelRect;
            if (rect.width <= 0 || rect.height <= 0) return false;
            double nx = (ruutu.x - rect.x) / rect.width * 2.0 - 1.0, ny = (ruutu.y - rect.y) / rect.height * 2.0 - 1.0;
            double3 suunta = eteen + oikea * (nx * tanY * kamera.aspect) + ylos * (ny * tanY);
            // Ellipsoidi yksikköpalloksi: (x/a, y/a, z/b).
            double3 s = CesiumWgs84Ellipsoid.GetRadii();
            double3 o = a.silma / s, d = suunta / s;
            double aa = math.dot(d, d), bb = 2.0 * math.dot(o, d), cc = math.dot(o, o) - 1.0;
            double disk = bb * bb - 4.0 * aa * cc;
            if (disk < 0 || aa <= 0) return false;
            double t = (-bb - math.sqrt(disk)) / (2.0 * aa);
            if (t <= 0) return false;
            osuma = a.silma + suunta * t;
            return true;
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
                // Kamera loppuasentoon ennen kutsua: valmis lukee usein RuutuPisteen (liuska ripustetaan merkin uuteen
                // ruutupisteeseen, web ladoLevossa), ja muuten transform olisi vielä edellisen kehyksen asennossa.
                if (valmis != null) Aseta();
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

        /// <summary>
        /// PIIRRETYN maaston korkeus (m, ellipsoidista) viimeisimmästä näytteestä, jos se on 30 km:n sisällä; muuten 0.
        /// Cesiumin näyte on liioittelematon, piirretty maasto KorkeusKerroin.Sovita(h) (löydös 29, oletus 2): kaikki
        /// kamera-ajot (Aja, Kuvaa = lennon aikajana, linssit, seuranta) kulkevat Aseta()-metodin raon kautta.
        /// </summary>
        double MaastoKohdassa(double lat, double lon)
        {
            if (!maastoNayteOn) return 0.0;
            if (ReittiGeometria.Kulma(lat, lon, maastoNaytePaikka.x, maastoNaytePaikka.y) > 30.0 / 111.2) return 0.0;
            return math.max(0.0, KorkeusKerroin.Sovita(maastoNayte));
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
            if (silmanKorkeus > KorkeusKerroin.Sovita(maastonKatto) + KameraEleet.VahimmaisRako(korkeus) + 3000.0) return;
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

        /// <summary>Kameran asento ECEF-koordinaateissa (metrit): <see cref="LaskeAsento"/>.</summary>
        struct Asento
        {
            public double3 silma, kohde, ylos; // ylos = kameran yläsuunta
            public double kaytetty, etaisyys, maasto;
            public double3 silmaLlh;           // (pituus, leveys, korkeus)
        }

        /// <summary>
        /// Kameran asento annetulla katselupisteellä ja suuntimalla, muut tilat (korkeus, kallistus, katseKorkeus,
        /// maastonäyte) nykyisistä kentistä. Ei liikuta kameraa eikä muuta kenttiä: <see cref="Aseta"/> asettaa
        /// kameran tällä, ja <see cref="Panoroi"/> ratkaisee katselupisteen samalla geometrialla.
        /// </summary>
        Asento LaskeAsento(double pit, double lev, double suunt)
        {
            // Käytetty kallistus (löydös 28 b): tallennettua kallistusta EI leikata, vaan raja koskee vain kuvaa, joten
            // loitonnus ja lähennys palauttavat pelaajan kallistuksen. Lennon kuvaus (vapaaKuvaus) ei ole korkeuden
            // rajoittama. Ylempänä ennen 24.9. tässä oli kallistus = min(kallistus, raja), joka leikkasi pysyvästi.
            double kaytetty = math.clamp(vapaaKuvaus ? kallistus : math.min(kallistus, KallistusRaja()), 0.0, 85.0);
            double etaisyys = korkeus;

            // Kamera kiertää pistettä (pituus, leveys, katseKorkeus): kallistus kääntää sen
            // pystysuorasta katsesuuntaa vastapäätä (suuntima 0 = kamera etelässä, katse
            // pohjoiseen), etäisyys pysyy samana. Kallistus 0 = suora katse alas.
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(pit, lev, katseKorkeus));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde);
            double3 napa = new double3(0, 0, 1);
            double3 pohjoinen = math.normalize(napa - ylos * math.dot(napa, ylos));
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double b = math.radians(suunt);
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
            return new Asento
            {
                silma = silma, kohde = kohde, ylos = eteen * math.cos(k) + ylos * math.sin(k),
                kaytetty = kaytetty, etaisyys = etaisyys, maasto = maasto, silmaLlh = silmaLlh,
            };
        }

        /// <summary>
        /// ECEF-pisteen paikka ruudulla (pikseleinä, origo vasen alakulma kuten WorldToScreenPoint) asennosta a,
        /// kameran FOV:lla, kuvasuhteella ja pixelRectillä ilman Unityn kameraa. Ruudun oikea = eteen × ylös
        /// (oikeakätinen ECEF; kallistus 0, suuntima 0 → oikea on itä kuten kartalla). false = kameran takana.
        /// </summary>
        static bool Projisoi(Camera kamera, in Asento a, double3 piste, out double x, out double y)
        {
            x = y = 0;
            double3 eteen = math.normalize(a.kohde - a.silma);
            double3 ylos = math.normalize(a.ylos - eteen * math.dot(a.ylos, eteen));
            double3 oikea = math.cross(eteen, ylos);
            double3 d = piste - a.silma;
            double z = math.dot(d, eteen);
            if (!(z > 1e-6 * math.length(d))) return false;
            double tanY = math.tan(math.radians(kamera.fieldOfView) * 0.5);
            var rect = kamera.pixelRect;
            x = rect.x + (math.dot(d, oikea) / (z * tanY * kamera.aspect) + 1.0) * 0.5 * rect.width;
            y = rect.y + (math.dot(d, ylos) / (z * tanY) + 1.0) * 0.5 * rect.height;
            return true;
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
            var a = LaskeAsento(pituus, leveys, suuntima);
            double kaytetty = a.kaytetty, etaisyys = a.etaisyys, maasto = a.maasto;
            KaytettyKallistus = kaytetty;
            silmanLat = a.silmaLlh.y;
            silmanLon = a.silmaLlh.x;
            silmanKorkeus = a.silmaLlh.z;

            var gt = georeferenssi.transform;
            var p = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(a.silma));
            var t = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(a.kohde));
            var yl = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(a.ylos));
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
