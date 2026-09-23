using System;
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

        /// <summary>Onko sormi ruudulla, liukuma tai kamera-ajo käynnissä (kehysmittari lukee).</summary>
        public bool Liikkeessa => edellinenSormia > 0 || math.lengthsq(liuku) > 1e-4 || ajo != null;

        /// <summary>Napautus näytön pikselikoordinaateissa (KaupunkiMerkit etsii osuman).</summary>
        public event Action<Vector2> Napautettu;

        /// <summary>IKamera: kaupunkia napautettiin (KaupunkiMerkit ilmoittaa).</summary>
        public event Action<string> KaupunkiNapautettu;

        public void IlmoitaKaupunki(string id) => KaupunkiNapautettu?.Invoke(id);

        class Ajo
        {
            public double3 alku, loppu; // (pituus, leveys, korkeus)
            public double kesto, aika, nousu;
            public Action valmis;
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
        }

        void Update()
        {
            if (georeferenssi == null) return;
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            if (Application.isPlaying)
            {
                Ohjaa(Time.unscaledDeltaTime);
                if (ajo != null) Etene(Time.unscaledDeltaTime);
            }
            Aseta();
        }

        float Kerroin => Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;

        double PuoliKulma()
        {
            var kamera = GetComponent<Camera>();
            double pysty = math.radians(kamera != null ? kamera.fieldOfView : 40.0) / 2.0;
            double vaaka = math.atan(math.tan(pysty) * (kamera != null ? kamera.aspect : 1.0));
            return math.min(pysty, vaaka);
        }

        /// <summary>Sallittu kallistus tällä korkeudella: kaukaa pallo katsotaan aina suoraan.</summary>
        public double KallistusRaja()
        {
            double raja = kallistusRajaKm * 1000.0;
            double min = MinKorkeus();
            return maxKallistus * math.saturate((raja - korkeus) / math.max(1.0, raja - min));
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
            double fov = math.radians(kamera != null ? kamera.fieldOfView : 40.0);
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
            int n = sormet.Count;
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
            else if (Mouse.current != null && Mouse.current.leftButton.isPressed)
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
                }
                kosketusAika += (float)dt;
                kosketusMatka = math.max(kosketusMatka, math.distance(keski, kosketusAlku) / Kerroin);
                if (n > 1) kosketusMatka = float.MaxValue; // monisormiele ei ole napautus

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
        public void Aja(double lat, double lon, double kohdeKorkeus, float kestoS, Action valmis)
        {
            kosketettu = true;
            liuku = 0;
            double h1 = kohdeKorkeus > 0 ? math.clamp(kohdeKorkeus, MinKorkeus(), MaxKorkeus()) : korkeus;
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
            };
        }

        void Etene(double dt)
        {
            ajo.aika += dt;
            double t = math.saturate(ajo.aika / ajo.kesto);
            double e = Pehmennys(t, ajonRamppi);
            pituus = Kiedo(math.lerp(ajo.alku.x, ajo.loppu.x, e));
            leveys = math.lerp(ajo.alku.y, ajo.loppu.y, e);
            // Korkeus logaritmisesti (tasainen zoomin tuntu) ja nousu kaaren keskellä.
            double hMax = MaxKorkeus();
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

        public void Aseta()
        {
            if (georeferenssi == null) return;
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            kallistus = math.min(kallistus, KallistusRaja());

            // Kamera kiertää maanpinnan pistettä (pituus, leveys): kallistus kääntää sen
            // pystysuorasta etelään päin, etäisyys pysyy samana. Kallistus 0 = entinen
            // suora katse maan keskipisteeseen.
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(pituus, leveys, 0));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde);
            double3 napa = new double3(0, 0, 1);
            double3 pohjoinen = math.normalize(napa - ylos * math.dot(napa, ylos));
            double k = math.radians(kallistus);
            double3 suunta = ylos * math.cos(k) - pohjoinen * math.sin(k);
            double3 silma = kohde + suunta * korkeus;
            double3 kameranYlos = pohjoinen * math.cos(k) + ylos * math.sin(k);

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
                kamera.farClipPlane = (float)(korkeus + 2.0 * r);
                if (kallistus > 0) kamera.nearClipPlane = (float)math.max(50.0, korkeus * 0.01);
            }
        }
    }
}
