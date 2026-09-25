using System;

namespace Matkakirja
{
    /// <summary>
    /// PALLON REIÄT (omistajan löydös 119, build 14: "pallossa on vieläkin todella paljon reikiä, joista näkyy
    /// maapallon läpi"). Puhtaat osat, testit Kartta-testit/Testit/ReikakorjausTestit.cs. Unity-puoli:
    /// Laattapalvelin (maastouusinta ja loki) ja PalloReiat (laattojen rajat ja magenta tausta).
    ///
    /// 1. MAASTOUUSINTA: cesium-native piirtää epäonnistuneen laatan tyhjänä (Tile::isRenderable: Failed on
    ///    "renderöitävä") eikä lataa sitä uudelleen, eikä forbidHoles estä tätä. Laattapalvelin antoi Cesiumille
    ///    virheen kolmen 15 s:n yrityksen jälkeen. Nyt Cesiumin maastolaattaa (.terrain) ei palauteta virheenä
    ///    verkkovirheen, aikakatkaisun tai 5xx:n takia, vaan sitä yritetään uudelleen porrastetulla viiveellä
    ///    (<see cref="UusintaViive"/>) niin kauan kuin Cesium odottaa (yhteys auki). Aito 404/403 ämpäristä menee
    ///    Cesiumille heti kuten ennen. Cesium for Unity ei aseta pyynnölle aikakatkaisua (UnityWebRequest.timeout 0
    ///    → iOS:llä NSURLRequest.timeoutInterval 0 = ei aikakatkaisua), joten odottava pyyntö pysyy auki.
    ///    Poikkeus: laite ilman verkkoa (NotReachable) yli <see cref="OfflineRajaS"/> s → virhe kuten ennen, jottei
    ///    offline-alueen ulkopuolinen maasto varaa Cesiumin yhteyksiä (NSURLSession: 6 yhteyttä / isäntä).
    /// 2. LAATTOJEN RAJAT: korkeuskerroin (KorkeusKerroin, oletus 2) nostaa maastoa verteksivarjostimessa, mutta
    ///    Unity karsii laatan Meshin rajoista, jotka on laskettu nostamattomasta geometriasta. Rajoja laajennetaan
    ///    kaikkiin suuntiin marginaalilla (k − 1) × korkeus (<see cref="Marginaali"/>, oletus 9 km).
    /// 3. HELMAT: Alppien halkeaman juurisyy (laattatasojen hyppy ja helman pituus, <see cref="HelmaPeittaa"/>); raot
    ///    peittää pergamenttinen pohjapallo (Pohjapallolaskenta, Pohjapallo).
    /// </summary>
    public static class Reikakorjaus
    {
        // ---- 1. Maastouusinta ----

        /// <summary>Uusintojen viiveet sekunteina: 0,5, 1, 2, 4, 8 ja sitten 8 s:n välein.</summary>
        static readonly double[] Viiveet = { 0.5, 1.0, 2.0, 4.0, 8.0 };

        /// <summary>
        /// Laite ilman verkkoa (Application.internetReachability NotReachable): pidossa oleva maastolaatta
        /// luovutetaan (virhe Cesiumille kuten ennen), kun haku on kestänyt tämän verran.
        /// </summary>
        public const double OfflineRajaS = 10.0;

        /// <summary>
        /// Viive ennen seuraavaa yritystä, kun <paramref name="yrityksia"/> yritystä on jo epäonnistunut:
        /// 1 → 0,5 s, 2 → 1 s, 3 → 2 s, 4 → 4 s, 5 tai enemmän → 8 s.
        /// </summary>
        public static double UusintaViive(int yrityksia)
        {
            int i = Math.Max(1, yrityksia) - 1;
            return Viiveet[Math.Min(i, Viiveet.Length - 1)];
        }

        /// <summary>
        /// Tilapäinen virhe, jota kannattaa yrittää uudelleen: verkkovirhe tai aikakatkaisu (koodi ≤ 0 tai 502, jonka
        /// <see cref="Koodi"/> antaa ilman HTTP-vastausta), 408, 425, 429 ja 5xx. 404, 403 ja muut 4xx ovat lopullisia.
        /// </summary>
        public static bool Uusittava(int koodi) =>
            koodi <= 0 || koodi == 408 || koodi == 425 || koodi == 429 || koodi >= 500;

        /// <summary>
        /// UnityWebRequestin epäonnistunut tulos HTTP-koodiksi: protokollavirhe (HTTP ≥ 400) sellaisenaan, muu
        /// (yhteys-, aikakatkaisu- tai purkuvirhe) 502. Katkennut siirto antaa responseCode 200 ilman dataa; se oli
        /// ennen Cesiumille tyhjä 200 (maastolaatta Failed = reikä), nyt 502 ja uusinta.
        /// </summary>
        public static int Koodi(bool protokollavirhe, long vastauskoodi) =>
            protokollavirhe && vastauskoodi >= 400 && vastauskoodi <= 999 ? (int)vastauskoodi : 502;

        /// <summary>Pidetäänkö maastolaatta yhä (uusi yritys) vai luovutetaanko (virhe Cesiumille).</summary>
        public static bool Pidetaanko(bool pyydetty, bool offline, double kulunutS) =>
            pyydetty && !(offline && kulunutS >= OfflineRajaS);

        static string IlmanKyselya(string polku)
        {
            int q = polku.IndexOf('?');
            return q < 0 ? polku : polku.Substring(0, q);
        }

        /// <summary>Cesiumin maastolaatta (quantized-mesh .terrain; kysely, esim. ?v= ja extensions=, ohitetaan).</summary>
        public static bool OnMaastolaatta(string polku) =>
            !string.IsNullOrEmpty(polku) && IlmanKyselya(polku).EndsWith(".terrain", StringComparison.Ordinal);

        /// <summary>Maastoluokka (laskurit ja loki): .terrain tai layer.json.</summary>
        public static bool OnMaasto(string polku)
        {
            if (string.IsNullOrEmpty(polku)) return false;
            string p = IlmanKyselya(polku);
            return p.EndsWith(".terrain", StringComparison.Ordinal) || p == "layer.json"
                || p.EndsWith("/layer.json", StringComparison.Ordinal);
        }

        /// <summary>
        /// Lokirivin luokka: maasto, pohja (<paramref name="pohjaPolku"/>, Laattapalvelin.PohjaPolku), satelliitti,
        /// kuva (.jpg, .png, .webp), json (.json, .geojson) tai muu. Väritason laatat luokittelee Laattapalvelin ("vari").
        /// </summary>
        public static string Luokka(string polku, string pohjaPolku = null)
        {
            if (string.IsNullOrEmpty(polku)) return "muu";
            if (OnMaasto(polku)) return "maasto";
            if (!string.IsNullOrEmpty(pohjaPolku) && polku.StartsWith(pohjaPolku, StringComparison.Ordinal)) return "pohja";
            string p = IlmanKyselya(polku);
            if (p.IndexOf("/satelliitti/", StringComparison.Ordinal) >= 0) return "satelliitti";
            if (p.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) || p.EndsWith(".png", StringComparison.OrdinalIgnoreCase)
                || p.EndsWith(".webp", StringComparison.OrdinalIgnoreCase)) return "kuva";
            if (p.EndsWith(".json", StringComparison.OrdinalIgnoreCase) || p.EndsWith(".geojson", StringComparison.OrdinalIgnoreCase)) return "json";
            return "muu";
        }

        // ---- 2. Laattojen rajat ----

        /// <summary>Konservatiivinen maaston yläraja (Everest 8 849 m) rajojen marginaaliin.</summary>
        public const double OletusKorkeusM = 9000.0;

        /// <summary>
        /// Paljonko verteksivarjostin voi enintään siirtää pintaa (metreinä): (k − 1) × korkeus, kun k &gt; 1;
        /// muuten 0 (ei laajennusta). Varjostin: p' = p + n·max(h, 0)·(k − 1) (tee_tileset.py, KorkeusKerroin.cs).
        /// </summary>
        public static double Marginaali(double kerroin, double korkeusM)
        {
            if (double.IsNaN(kerroin) || double.IsNaN(korkeusM) || kerroin <= 1.0 || korkeusM <= 0.0) return 0.0;
            return (kerroin - 1.0) * korkeusM;
        }

        /// <summary>
        /// Marginaali laatan paikallisissa yksiköissä: metrit × (maailman yksiköitä metrillä, georeferenssin mittakaava)
        /// / (maailman yksiköitä laatan yksiköllä, laatan pienin lossyScale-komponentti). Nolla tai virheellinen
        /// mittakaava tulkitaan 1:ksi (Cesiumin laatat ovat metreissä).
        /// </summary>
        public static double PaikallinenMarginaali(double marginaaliM, double maailmaaMetrilla, double maailmaaYksikolla)
        {
            double m = maailmaaMetrilla > 0.0 && !double.IsInfinity(maailmaaMetrilla) ? maailmaaMetrilla : 1.0;
            double y = maailmaaYksikolla > 0.0 && !double.IsInfinity(maailmaaYksikolla) ? maailmaaYksikolla : 1.0;
            return Math.Max(0.0, marginaaliM) * m / y;
        }

        /// <summary>AABB:n puolikkaat laajennettuina marginaalilla kaikkiin suuntiin (negatiivinen marginaali = 0).</summary>
        public static (float x, float y, float z) Laajenna((float x, float y, float z) puolikas, float marginaali)
        {
            float m = float.IsNaN(marginaali) || marginaali < 0f ? 0f : marginaali;
            return (Math.Abs(puolikas.x) + m, Math.Abs(puolikas.y) + m, Math.Abs(puolikas.z) + m);
        }

        // ---- 3. Helmat (Alppien halkeama, koe1 25.9.2026: reikarajaus.jpg) ----
        //
        // Halkeama oli vaakasuora laattasauma (leveyspiiri) terävän kaukaisen ja sumean lähemmän laatan välissä, ja se
        // katosi samasta näkymästä minuutin päästä (b-rajatpois-alpit.png: pinnan sisällä 0 magentapikseliä). Lähempi
        // laatta oli siis emo, joka pysyy (forbidHoles), kunnes kaikki sen lapset ovat ladattuja: saumassa hyppäsi
        // kaksi tai useampi taso. cesium-native (QuantizedMeshLoader) ripustaa laatan reunaan helman, jonka korkeus on
        // 5 × tason geometrinen virhe (HelmanKorkeus; z9 752 m), mutta karkean tason reuna on DEM:n overview-tasosta
        // (z7: näyteväli 2,4 km) ja voi jyrkässä maastossa olla sitä enemmän hienon reunan alla.
        // Korkeuskerroin ei avaa eikä sulje rakoja: varjostimen korotus H(h) = h (h ≤ 0) tai k·h (h > 0) on aidosti
        // kasvava, joten reunojen ja helmojen järjestys säilyy (HelmaPeittaa); rako vain kasvaa ruudulla k-kertaiseksi.
        // Korjaus vaatisi pidemmät helmat (cesium-native, ei säädettävissä Cesium for Unity 1.25:ssä) tai maastopolton,
        // jossa karkean tason reuna ei jää hienon alle — molemmat isoja, joten raot peittää pohjapallo (Pohjapallo.cs).

        /// <summary>Helman korkeus tasolla z (m): cesium-native 5 × 77 067 m / 2^z (CesiumJS:n tasovirhe, ei 8×-kerrointa).</summary>
        public static double HelmanKorkeus(int taso) => 5.0 * Pohjapallolaskenta.Taso0Virhe / Math.Pow(2.0, taso);

        /// <summary>Varjostimen korotus (tee_tileset.py): h + max(h, 0)·(k − 1) eli h meren alla, k·h maalla.</summary>
        public static double Korotettu(double korkeusM, double kerroin) =>
            korkeusM > 0.0 ? korkeusM * Math.Max(1.0, kerroin) : korkeusM;

        /// <summary>
        /// Peittääkö saumassa ylemmän reunan helma raon alempaan reunaan korotuksen jälkeen. Laatat piirtyvät
        /// kaksipuolisina (Pallo.mat _Cull 0), joten kumman tahansa helma näkyy. Reunat ellipsoidista (m) ja tasot.
        /// </summary>
        public static bool HelmaPeittaa(double reunaA, int tasoA, double reunaB, int tasoB, double kerroin)
        {
            double a = Korotettu(reunaA, kerroin), b = Korotettu(reunaB, kerroin);
            return a >= b
                ? Korotettu(reunaA - HelmanKorkeus(tasoA), kerroin) <= b
                : Korotettu(reunaB - HelmanKorkeus(tasoB), kerroin) <= a;
        }
    }
}
