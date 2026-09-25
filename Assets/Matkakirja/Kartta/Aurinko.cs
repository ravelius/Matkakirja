using System;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Pallon valo (LENNON ESITYS, omistaja 23.9.2026): tavallisesti valo kulkee kameran mukana,
    /// jolloin näkyvä puolipallo on aina valaistu. Lennon ajaksi valo vaihtuu aurinkoon, joka
    /// paistaa pelin kellonajan mukaan (Aika tai paikallinen aamu koneen kohdalla), ja palaa laskeutuessa.
    /// Maaston varjot syntyvät pinnan normaaleista (valo matalalta = pitkät rinnevarjot); oikeat
    /// heittovarjot eivät toimi planeetan mittakaavassa.
    /// Sumu: etäisyyssumu lennon ajaksi (Cesiumin URP Lit -varjostin lukee RenderSettings.fogin).
    ///
    /// KARTAN RINNEVALO (omistajan löydös 46, build 11 → 12: "valo muotoilisi korkeuseroja"): karttatilassa (ei lento,
    /// ei linssi omalla kuvallaan, ei aloitusportti) kameravalon tilalle tulee matala aurinko luoteesta
    /// (<see cref="Atsimuutti"/> 315°, <see cref="KorkeusAst"/> 35° kameran alapisteen vaakatasosta), ilman varjoja.
    /// Tasamaan sävy pysyy build 11:n arvossa: I = v·D₀/nl ja ambientti A₀ + (1 − v)·D₀·L (Karttavalo.Kompensoi), ja
    /// tileset-varjostin tasaa normaalit kameran alapisteen normaaliin (KorkeusKerroin.Tasaus), joten nl on koko ruudulla
    /// sin 35°. Pallon mittakaavassa (4 000–8 000 km) valo liukuu takaisin kameravaloon (Karttavalo.Osuus).
    ///
    /// HORISONTTIUSVA (löydös 46): kallistetussa karttanäkymässä lineaarinen sumu webin rajasta (0,6 × korkeus,
    /// Horisonttiusva.Sumu) ja kameran tausta pergamentin sävyyn, joten horisontin yllä ei näy mustaa avaruutta.
    /// Voimakkuus kallistuksen mukaan kuten webissä (min(1, kulma / 8°)). Linssin oma tausta (KarttaKerrokset.OmaTausta)
    /// ja lento ohittavat usvan.
    ///
    /// SUMUVARIANTIT (b12p-laitekuvat 25.9.: usva ei sumentanut maastoa lainkaan): ProjectSettings/GraphicsSettings
    /// m_FogStripping oli Automatic, jolloin Unity karsii käännöksestä sumuvariantit, joita kohtauksessa ei ole (Pallo.unity
    /// m_Fog 0). RenderSettings.fog ajossa ei silloin tee laitteella mitään (myös lennon etäisyyssumu). Nyt Manual ja
    /// FOG_LINEAR säilytetään (Exp ja Exp2 karsitaan, niitä ei käytetä).
    /// </summary>
    public class Aurinko : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Light valo;
        [Tooltip("Kameravalon suunta kameraan nähden (paikallinen kierto).")]
        public Vector3 kameraKierto = new Vector3(10f, -15f, 0f);
        [Tooltip("Siirtymä kameravalon ja auringon välillä, sekunteja.")]
        public float siirtymaS = 1.5f;
        public Color sumuVari = new Color(0.86f, 0.80f, 0.68f);
        [Tooltip("Lennon taivas (Matkakirja/Taivas): sininen ilmakehä auringon ajaksi, muuten pelin tausta.")]
        public Material taivas;

        /// <summary>
        /// Aika, jonka mukaan aurinko paistaa (UTC). null = pelin paikallinen aika: aurinko on
        /// koneen kohdalla kello <see cref="paikallinenTunti"/> (pelin "aamu"), joten lento ei
        /// ole yöllä laitteen kellonajasta riippumatta. Pelikoodari voi asettaa pelin kellon.
        /// </summary>
        public Func<DateTime> Aika;
        [Tooltip("Paikallinen aurinkoaika koneen kohdalla, kun Aika = null (10 = aamupäivä, pitkät rinnevarjot).")]
        public double paikallinenTunti = 10.0;

        double kohdePituus;

        /// <summary>Kohta (koneen pituusaste), jonka paikallinen aika määrää auringon, kun Aika = null.</summary>
        public void Kohde(double pituusAste) => kohdePituus = pituusAste;

        /// <summary>Kokeilu (komento "lentoharmaa sumu pois"): etäisyyssumu pois lennolta.</summary>
        public static bool SumuEstetty;

        /// <summary>Paistaako aurinko (lento) vai kameravalo.</summary>
        public bool Paalla { get; private set; }

        // ---- Kartan rinnevalo ja horisonttiusva (löydös 46). Komennot: valo …, usva … (Komennot.cs). ----

        /// <summary>Rinnevalo karttatilassa (komento "valo pois|paalle"). false = build 11:n kameravalo.</summary>
        public static bool RinnevaloSallittu = true;
        /// <summary>Auringon atsimuutti pohjoisesta myötäpäivään, asteina (komento "valo kulma &lt;atsimuutti&gt; &lt;korkeus&gt;").</summary>
        public static double Atsimuutti = Karttavalo.OletusAtsimuutti;
        /// <summary>Auringon korkeuskulma kameran alapisteen vaakatasosta, asteina.</summary>
        public static double KorkeusAst = Karttavalo.OletusKorkeus;
        /// <summary>Suoran valon osuus D₀:sta (komento "valo voima &lt;v&gt;"): 1 = ambientti ennallaan, alle 1 = pehmeämpi.</summary>
        public static double Voima = Karttavalo.OletusVoima;
        /// <summary>Horisonttiusva kallistuksessa (komento "usva pois|paalle").</summary>
        public static bool UsvaSallittu = true;
        /// <summary>Usvan ja taustan sävy: webin --kerma #faf4d6 (css/styles.css .pallolauta-usva).</summary>
        public static Color UsvaVari = new Color(250f / 255f, 244f / 255f, 214f / 255f);
        /// <summary>Usvan raja × korkeus (webin KALLISTUS_RAJA_KERROIN 0,6; komento "usva raja &lt;k&gt;").</summary>
        public static double UsvaRaja = Horisonttiusva.RajaKerroin;

        /// <summary>Editorin pelitila ilman domain reloadia: kokeilut eivät jää edellisestä ajosta.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKokeilut()
        {
            RinnevaloSallittu = true;
            Atsimuutti = Karttavalo.OletusAtsimuutti;
            KorkeusAst = Karttavalo.OletusKorkeus;
            Voima = Karttavalo.OletusVoima;
            UsvaSallittu = true;
            UsvaVari = new Color(250f / 255f, 244f / 255f, 214f / 255f);
            UsvaRaja = Horisonttiusva.RajaKerroin;
        }

        /// <summary>Rinnevalon osuus tässä kehyksessä (0 = kameravalo, 1 = matala aurinko ja täysi tasaus).</summary>
        public float Rinne { get; private set; }
        /// <summary>Horisonttiusvan vahvuus tässä kehyksessä (0–1).</summary>
        public float Usva { get; private set; }

        float perusIntensiteetti = (float)Karttavalo.VanhaIntensiteetti;
        Color perusAmbientti, perusTausta;
        bool perusOn;
        float kartta = 1f, taustaKartta = 1f, rinne;   // pehmeät siirtymät (linssi päälle/pois, korkeus)
        PalloKierto kierto;
        Camera kameraKomp;

        float osuus;           // 0 = kameravalo, 1 = aurinko
        double sumuAlku, sumuLoppu;
        bool sumu;
        Quaternion kameraSuhde;

        void Start()
        {
            if (valo == null) valo = GetComponent<Light>();
            if (georeferenssi == null) georeferenssi = FindAnyObjectByType<CesiumGeoreference>();
            kameraSuhde = Quaternion.Euler(kameraKierto);
            if (valo != null)
            {
                // Pehmeä valo ilman heittovarjoja (planeetan mittakaavassa varjokartta ei toimi; rinteet varjostuvat N·L:stä).
                valo.shadows = LightShadows.None;
                perusIntensiteetti = valo.intensity;
            }
            perusAmbientti = RenderSettings.ambientLight;
            kameraKomp = transform.parent != null ? transform.parent.GetComponent<Camera>() : null;
            kierto = transform.parent != null ? transform.parent.GetComponent<PalloKierto>() : null;
            if (kameraKomp != null) perusTausta = kameraKomp.backgroundColor;
            perusOn = true;
        }

        /// <summary>Aurinko päälle (lennon alku) tai pois (laskeutuminen).</summary>
        public void Aseta(bool paalle) => Paalla = paalle;

        /// <summary>Etäisyyssumu metreinä kamerasta (alku, loppu); loppu &lt;= 0 = sumu pois.</summary>
        public void Sumu(double alku, double loppu)
        {
            sumu = loppu > 0;
            sumuAlku = alku;
            sumuLoppu = loppu;
        }

        // LÄMPÖERÄ (PallonLepo): valon, taustan ja usvan pehmeät siirtymät (aurinko 1,5 s, linssin kartta ja tausta 0,5 s,
        // rinnevalo 0,5 s korkeuden mukaan) jatkuvat kameran pysähdyttyä, ja lennon aurinko (osuus > 0) elää koko ajan.
        bool liukuu;
        void OnEnable() => PallonLepo.Animoi(Liukuu, "aurinko");
        void OnDisable() => PallonLepo.Poista(Liukuu);
        bool Liukuu() => liukuu;

        void LateUpdate()
        {
            if (valo == null) return;
            float osuus0 = osuus, kartta0 = kartta, tausta0 = taustaKartta, rinne0 = rinne;
            float dt = Time.unscaledDeltaTime;
            float tavoite = Paalla ? 1f : 0f;
            osuus = Mathf.MoveTowards(osuus, tavoite, dt / Mathf.Max(0.05f, siirtymaS));
            float s = osuus * osuus * (3f - 2f * osuus);
            var kamera = transform.parent;
            Quaternion kameraValo = kamera != null ? kamera.rotation * kameraSuhde : transform.rotation;

            // Karttatila: linssi omalla kuvallaan ja portti palauttavat build 11:n kameravalon (pehmeästi 0,5 s:ssa).
            var kk = KarttaKerrokset.Instanssi;
            kartta = Mathf.MoveTowards(kartta, kk != null && kk.LinssiPaalla ? 0f : 1f, dt / 0.5f);
            taustaKartta = Mathf.MoveTowards(taustaKartta, kk != null && kk.OmaTausta ? 0f : 1f, dt / 0.5f);
            float rinneTavoite = RinnevaloSallittu && kierto != null && !kierto.Portissa ? (float)Karttavalo.Osuus(kierto.korkeus) : 0f;
            rinne = Mathf.MoveTowards(rinne, rinneTavoite, dt / 0.5f);
            liukuu = osuus > 0f || osuus != osuus0 || kartta != kartta0 || taustaKartta != tausta0 || rinne != rinne0;
            Rinne = rinne * rinne * (3f - 2f * rinne) * kartta * (1f - s);

            // Kameran alapisteen normaali n0 (geosentrinen, kuten tileset-varjostimen tasaus).
            Vector3 n0 = kamera != null ? -kamera.forward : Vector3.up;
            double3 n0Ecef = default;
            bool n0On = false;
            if (georeferenssi != null && kamera != null)
            {
                var gt = georeferenssi.transform;
                double3 kameraEcef = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(
                    (float3)gt.InverseTransformPoint(kamera.position));
                if (math.lengthsq(kameraEcef) > 1.0)
                {
                    n0Ecef = math.normalize(kameraEcef);
                    n0 = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(n0Ecef)).normalized;
                    n0On = true;
                }
            }

            Quaternion valonKierto = kameraValo;
            if (Rinne > 0f && n0On)
            {
                // Matala aurinko n0:n vaakatasossa: atsimuutti pohjoisesta, korkeus vaakatasosta (Karttavalo.Suunta).
                double3 napa = new double3(0, 0, 1);
                double3 pohjoinen = napa - n0Ecef * math.dot(napa, n0Ecef);
                pohjoinen = math.lengthsq(pohjoinen) > 1e-12 ? math.normalize(pohjoinen) : new double3(1, 0, 0);
                double3 ita = math.normalize(math.cross(pohjoinen, n0Ecef));
                var (e, n, u) = Karttavalo.Suunta(Atsimuutti, KorkeusAst);
                double3 kohti = ita * e + pohjoinen * n + n0Ecef * u;
                var suunta = georeferenssi.transform.TransformDirection(
                    (float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(kohti));
                var karttaAurinko = Quaternion.LookRotation(-suunta, kamera.up);
                valonKierto = Quaternion.Slerp(kameraValo, karttaAurinko, Rinne);
            }
            if (osuus > 0f && georeferenssi != null)
            {
                double3 kohti = Aika != null ? AurinkoEcef(Aika()) : AurinkoPaikallinen(DateTime.UtcNow, kohdePituus, paikallinenTunti);
                var suunta = georeferenssi.transform.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(kohti));
                var aurinko = Quaternion.LookRotation(-suunta, kamera != null ? kamera.up : Vector3.up);
                valonKierto = Quaternion.Slerp(valonKierto, aurinko, s);
            }
            valo.transform.rotation = valonKierto;
            // Tileset-varjostimen normaalien tasaus samalla painolla (0 lennolla, linssissä ja pallon mittakaavassa).
            KorkeusKerroin.Tasaus(Rinne);
            Kompensoi(n0, kartta * (1f - s));

            Usva = UsvaSallittu && kierto != null && kameraKomp != null
                ? (float)Horisonttiusva.Vahvuus(kierto.KaytettyKallistus) * taustaKartta * (1f - s) : 0f;
            if (kameraKomp != null && perusOn && (kk == null || !kk.OmaTausta))
            {
                var tausta = Color.Lerp(perusTausta, UsvaVari, Usva);
                if (kameraKomp.backgroundColor != tausta) kameraKomp.backgroundColor = tausta;
            }
            Taivas(kameraKomp);

            if (sumu && !SumuEstetty)
            {
                RenderSettings.fog = true;
                RenderSettings.fogMode = FogMode.Linear;
                RenderSettings.fogColor = sumuVari;
                RenderSettings.fogStartDistance = (float)sumuAlku;
                RenderSettings.fogEndDistance = (float)sumuLoppu;
            }
            else if (Usva > 0.001f)
            {
                // Horisonttiusva: täysi webin rajalla (0,6 × korkeus P:stä), liuku rajan alapuolella. Heikko usva
                // (pieni kallistus) siirtää sumun kauas, jolloin se ei näy (raja on silloin ruudun yläpuolella).
                double mitta = georeferenssi != null ? georeferenssi.transform.lossyScale.x : 1.0;
                double puoliFov = kameraKomp.fieldOfView * 0.5;
                var (alku, loppu) = Horisonttiusva.Sumu(kierto.korkeus, kierto.KaytettyKallistus, puoliFov,
                    CesiumWgs84Ellipsoid.GetMaximumRadius(), UsvaRaja);
                float kauas = (float)(loppu * mitta) * 8f;
                RenderSettings.fog = true;
                RenderSettings.fogMode = FogMode.Linear;
                RenderSettings.fogColor = UsvaVari;
                RenderSettings.fogStartDistance = Mathf.Lerp(kauas, (float)(alku * mitta), Usva);
                RenderSettings.fogEndDistance = Mathf.Lerp(kauas * 1.5f, (float)(loppu * mitta), Usva);
            }
            else RenderSettings.fog = false;
        }

        /// <summary>
        /// Valon intensiteetti ja ambientti niin, että tasamaan (normaali n0) sävy on build 11:n arvo (Karttavalo.Kompensoi):
        /// I = v·D₀/nl, A = A₀ + (1 − v)·D₀·L lineaarisena; nl = n0 · (suunta valoon). paino 0 (lento, linssi) →
        /// kohtauksen alkuperäiset arvot. Kameravalossa (Rinne 0, ylhäältä) tulos on täsmälleen I = 1,1 ja A₀.
        /// </summary>
        void Kompensoi(Vector3 n0, float paino)
        {
            if (!perusOn) return;
            float mittakaava = perusIntensiteetti / (float)Karttavalo.VanhaIntensiteetti;
            double nl = Vector3.Dot(n0, -valo.transform.forward);
            double v = 1.0 + (Voima - 1.0) * Rinne;   // kameravalossa voima 1: build 11 täsmälleen
            var (i, lisa) = Karttavalo.Kompensoi(nl, v);
            float intensiteetti = Mathf.Lerp(perusIntensiteetti, (float)i * mittakaava, paino);
            if (!Mathf.Approximately(valo.intensity, intensiteetti)) valo.intensity = intensiteetti;
            Color a = perusAmbientti.linear + valo.color.linear * ((float)lisa * mittakaava * paino);
            Color ambientti = a.gamma;
            ambientti.a = perusAmbientti.a;
            var nyt = RenderSettings.ambientLight;
            if (Mathf.Abs(nyt.r - ambientti.r) + Mathf.Abs(nyt.g - ambientti.g) + Mathf.Abs(nyt.b - ambientti.b) > 1e-4f)
                RenderSettings.ambientLight = ambientti;
        }

        /// <summary>Tila lokiin (komento "valo tila").</summary>
        public string Tila()
        {
            var n0 = transform.parent != null ? -transform.parent.forward : Vector3.up;
            return $"rinne {Rinne:0.00} (sallittu {RinnevaloSallittu}, atsimuutti {Atsimuutti:0}°, korkeus {KorkeusAst:0}°, voima {Voima:0.00}), " +
                   $"tasaus {KorkeusKerroin.TasausArvo:0.00}, intensiteetti {valo?.intensity:0.000}, ambientti {RenderSettings.ambientLight}, " +
                   $"ambientProbe[0,0] {RenderSettings.ambientProbe[0, 0]:0.0000}, N·L(kameran akseli) {Vector3.Dot(n0, valo != null ? -valo.transform.forward : n0):0.000}, " +
                   $"usva {Usva:0.00} (sallittu {UsvaSallittu}, raja {UsvaRaja:0.00}, taustakartta {taustaKartta:0.00}), " +
                   $"tausta {(kameraKomp != null ? kameraKomp.backgroundColor.ToString() : "-")} {(kameraKomp != null ? kameraKomp.clearFlags.ToString() : "")}, " +
                   $"sumu {RenderSettings.fog} (lennon sumu {sumu}) " +
                   $"{RenderSettings.fogStartDistance:0}–{RenderSettings.fogEndDistance:0} m, kallistus {kierto?.KaytettyKallistus:0.0}°, " +
                   $"korkeus {kierto?.korkeus / 1000.0:0} km, lento {osuus:0.00}";
        }

        bool taivasPaalla;

        /// <summary>
        /// Sininen taivas lennon ajaksi (häivytys samalla osuudella kuin aurinko): kameran tausta vaihtuu
        /// skyboxiin, jonka väri lasketaan pallon reunan kulmasta. Muulloin pelin oma yksivärinen tausta
        /// (linssit, esim. astronautin musta avaruus, asettavat sen KarttaKerrokset.Taustavarilla).
        /// </summary>
        void Taivas(Camera kamera)
        {
            if (taivas == null || kamera == null || georeferenssi == null) return;
            if (osuus <= 0f)
            {
                if (taivasPaalla) { kamera.clearFlags = CameraClearFlags.SolidColor; taivasPaalla = false; }
                return;
            }
            if (!taivasPaalla)
            {
                RenderSettings.skybox = taivas;
                kamera.clearFlags = CameraClearFlags.Skybox;
                taivasPaalla = true;
            }
            var gt = georeferenssi.transform;
            Vector3 keskus = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
            Vector3 kohti = keskus - kamera.transform.position;
            float d = kohti.magnitude;
            float r = (float)CesiumWgs84Ellipsoid.GetMaximumRadius() * gt.lossyScale.x;
            taivas.SetVector("_Nadir", kohti / Mathf.Max(1f, d));
            taivas.SetFloat("_Raja", Mathf.Asin(Mathf.Clamp01(r / Mathf.Max(r, d))));
            taivas.SetColor("_Tausta", kamera.backgroundColor);
            taivas.SetFloat("_Osuus", osuus * osuus * (3f - 2f * osuus));
        }

        /// <summary>Aurinko niin, että pituusasteella lon on paikallinen aurinkoaika tunti (deklinaatio päivämäärästä).</summary>
        public static double3 AurinkoPaikallinen(DateTime utc, double lon, double tunti)
        {
            double3 v = AurinkoEcef(utc);
            double dekl = math.asin(v.z);
            double pituus = math.radians(lon - (tunti - 12.0) * 15.0);
            return new double3(math.cos(dekl) * math.cos(pituus), math.cos(dekl) * math.sin(pituus), math.sin(dekl));
        }

        /// <summary>
        /// Suunta maan keskipisteestä aurinkoon (ECEF, yksikkövektori): auringon alapiste
        /// deklinaatiosta ja aikayhtälöstä (NOAA:n likiarvo, tarkkuus ~0,5°).
        /// </summary>
        public static double3 AurinkoEcef(DateTime utc)
        {
            double paiva = utc.DayOfYear - 1 + (utc.Hour - 12 + utc.Minute / 60.0) / 24.0;
            double g = 2 * math.PI / 365.0 * paiva;
            double deklinaatio = 0.006918 - 0.399912 * math.cos(g) + 0.070257 * math.sin(g)
                - 0.006758 * math.cos(2 * g) + 0.000907 * math.sin(2 * g)
                - 0.002697 * math.cos(3 * g) + 0.00148 * math.sin(3 * g);
            double aikayhtalo = 229.18 * (0.000075 + 0.001868 * math.cos(g) - 0.032077 * math.sin(g)
                - 0.014615 * math.cos(2 * g) - 0.040849 * math.sin(2 * g)); // minuutteja
            double minuutit = utc.Hour * 60 + utc.Minute + utc.Second / 60.0;
            double pituus = math.radians(-(minuutit + aikayhtalo - 720.0) / 4.0);
            return new double3(math.cos(deklinaatio) * math.cos(pituus), math.cos(deklinaatio) * math.sin(pituus), math.sin(deklinaatio));
        }
    }
}
