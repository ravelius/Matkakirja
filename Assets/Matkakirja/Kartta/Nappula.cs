using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Pelinappula kartalla ja sen liike (Fablen tarkastus B16; pariteettiraportti 25.9. A20, A21, B12–B16, B24;
    /// web js/pallolauta/siirto.js, js/siirtokoreografia.js ja js/ui.js animatePawnSisalla):
    ///   MAA JA MERI (Aja, luvut Siirtokoreografia.cs:ssä): ennakkozoomi, hengähdys, yksi saattava kamera-ajo
    ///   kohti määränpäätä ja nappula 300 ms kameran perässä. Liftaus ja laiva hyppyketjuna (paraabelihyppy,
    ///   tauko 190 ms), bussi autokyytinä (matkanVaihe: vauhti notkahtaa matkapisteissä osuuteen 0,4).
    ///   LENTO: isoympyräkaari ylös ja alas, valitun lennon kaari katkoviivana.
    /// Kamera-ajot tehdään, kun seuraaKamera on päällä; kamera ei ole lukittu nappulaan.
    /// Hahmo on webin pawnShape (sotilasnappula) koodista piirrettynä, jalka pisteessä.
    /// </summary>
    // LennonVaihe (Ei, Nousu, Matka, Lasku) on LennonAikajana.cs:ssä (puhdas, Kartta-testit).

    public class Nappula : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public PalloKierto kierto;
        public Material materiaali;
        [Tooltip("Nappulan korkeus iOS-pisteinä (web 36 px).")]
        public float koko = 36f;
        [Tooltip("Korkeus ellipsoidin yläpuolella, metreinä (kuten merkit).")]
        public double nosto = 5000.0;
        [Tooltip("Lennon vähimmäisvara liioitellun maaston (KorkeusKerroin) yläpuolella reitin näytteissä, metreinä.")]
        public double maastoVara = 1000.0;
        public Color vari = new Color32(0x9a, 0x3b, 0x2c, 0xff);
        public bool seuraaKamera = true;

        /// <summary>Webin MATKAPISTEEN_VAUHTI: vauhti matkapisteen kohdalla suhteessa välin keskinopeuteen.</summary>
        public const double MatkapisteenVauhti = 0.4;

        public double Lat { get; private set; }
        public double Lon { get; private set; }
        public bool Nakyy => olio != null && olio.activeSelf;

        bool kerrosNakyy = true;

        /// <summary>KarttaKerrokset "nappula": nappula ja kone piiloon (linssiportti) tilaa muuttamatta.</summary>
        public void Nakyvat(bool nakyy)
        {
            kerrosNakyy = nakyy;
            if (olio != null && olio.TryGetComponent<MeshRenderer>(out var r)) r.enabled = nakyy;
            if (malli != null) foreach (var mr in malli.GetComponentsInChildren<Renderer>()) mr.enabled = nakyy;
        }
        public bool Liikkeessa => liike != null;

        /// <summary>
        /// Pelinappulan laatikko ruudulla pikseleinä (y ylös) nimiladonnan pinoksi (web js/pallolauta/nimet.js
        /// pinot + PELIMERKIN_VARA_PX): kuva <see cref="koko"/> pistettä korkea, leveys 32/36, jalka pisteessä
        /// (Nappula.shader). false, jos nappula ei näy, on lentokoneena tai pallon takana.
        /// </summary>
        public bool Pino(Camera kamera, float kerroin, float vara, out Ruutulaatikko laatikko)
        {
            laatikko = default;
            if (!Nakyy || kone || kamera == null || georeferenssi == null) return false;
            var paikka = olio.transform.position;
            var keskus = georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
            if (Vector3.Dot((paikka - keskus).normalized, (kamera.transform.position - paikka).normalized) < 0.02f) return false;
            Vector3 r = kamera.WorldToScreenPoint(paikka);
            if (r.z <= 0) return false;
            float k = koko * kerroin, puoli = k * 0.5f * (32f / 36f), v = vara * kerroin;
            laatikko = new Ruutulaatikko(r.x - puoli - v, r.y - v, r.x + puoli + v, r.y + k + v);
            return true;
        }

        [Header("Aloituslento")]
        [Tooltip("Lentokoneen koko iOS-pisteinä.")]
        public float koneKoko = 44f;
        [Tooltip("Kaari (°), jolla kamera näyttää lähtökaupungin ennen lentoa.")]
        public double lahtoKaari = 18.6;
        [Tooltip("Kameran zoomi lähtöön, sekunteja.")]
        public float lahtoZoomS = 2.5f;
        public Color koneVari = new Color32(0x9a, 0x3b, 0x2c, 0xff);
        [Tooltip("Lentokoneen 3D-malli (Natiivi-UI:n DC-3, nokka +Z); null = kuva.")]
        public GameObject koneMalli;
        [Tooltip("Koneen materiaali (URP Lit, hopea); FBX:n omat materiaalit eivät ole URP:tä.")]
        public Material koneMateriaali;
        [Tooltip("Raidan (Raita) ja ikkunoiden (Ikkunat) materiaalit; null = koneMateriaali.")]
        public Material raitaMateriaali, ikkunaMateriaali;
        /// <summary>Potkurikiekko (Shaders/PotkuriKiekko, elokuvalento erä 2).</summary>
        public Material kiekkoMateriaali;
        [Tooltip("3D-koneen koko ruudulla iOS-pisteinä (siipiväli).")]
        public float malliPx = 110f;
        public Savujana savu;
        public Aurinko aurinko;
        /// <summary>Lähtösumu ja pilvimeri (LENNON PINTA), Rakennus luo.</summary>
        public Usvalevy usva;
        /// <summary>Kaupunkien tunnusrakennukset (Maamerkit.cs), Rakennus luo.</summary>
        public Maamerkit maamerkit;

        GameObject olio;
        Material oma;
        Texture2D nappulaKuva, koneKuva;
        GameObject malli;
        float malliKoko = 1f;
        bool kone;
        Coroutine liike;
        Action kesken;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            if (Application.isPlaying) StartCoroutine(Esilammita());
        }

        /// <summary>
        /// Lennon ensimmäisen kehyksen piikki (mittaus 24.9.: 209 ms + 42 ms) tulee koneen,
        /// savun, sumuvarjostinmuunnelman ja pilvikuoren ensipiirrosta. Piirretään ne kerran heti alussa
        /// näkymättömän pieninä, kun mitään ei vielä liiku.
        /// </summary>
        IEnumerator Esilammita()
        {
            yield return new WaitForSecondsRealtime(1.5f);
            if (liike != null || georeferenssi == null || kierto == null) yield break;
            var kamera = kierto.GetComponent<Camera>();
            if (kamera == null) yield break;
            bool nakyi = Nakyy;
            Tee();
            Kone(true);
            var eteen = kamera.transform.position + kamera.transform.forward * (kamera.nearClipPlane * 4f);
            if (malli != null) { malli.transform.position = eteen; malli.transform.localScale = Vector3.one * 1e-4f; }
            if (savu != null)
            {
                savu.Aloita();
                var gt = georeferenssi.transform;
                double3 e1 = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed((float3)gt.InverseTransformPoint(eteen));
                savu.Lisaa(e1);
                savu.Lisaa(e1 + new double3(0.01, 0, 0));
            }
            if (aurinko != null) aurinko.Sumu(1e9, 2e9); // sumumuunnelma käännetään, sumua ei näy
            // Linssisepän pilvikuori luodaan ensimmäisellä Nayta-kutsulla (mittaus: 40 ms lennon alussa):
            // luodaan se nyt ja piilotetaan samassa kehyksessä, joten pilviä ei näy.
            var pilvet = Matkakirja.Linssit.Pilvet.LentoPilvet.Instanssi;
            if (pilvet != null && !pilvet.Nakyvissa) { pilvet.Nayta(2000.0, 0.01); pilvet.Piilota(0.01); }
            yield return null;
            yield return null;
            if (aurinko != null && liike == null) aurinko.Sumu(0, 0);
            if (liike != null) yield break; // lento alkoi välissä: se hoitaa tilan
            if (savu != null) savu.Lopeta();
            Kone(false);
            if (!nakyi && olio != null) olio.SetActive(false);
        }

        // ---- Rajapinta ----

        /// <summary>Nappula näkyviin pisteeseen (saapuminen, lataus).</summary>
        public void Aseta(double lat, double lon)
        {
            Pysayta();
            Tee();
            Siirra(lat, lon, 0);
            olio.SetActive(true);
        }

        public void Piilota()
        {
            Pysayta();
            if (olio != null) olio.SetActive(false);
        }

        /// <summary>
        /// Maa- ja merimatka (liftaus, bussi, laiva) webin koreografialla (pariteetti A20, A21, B12–B16).
        /// Pisteet: ensimmäinen = lähtö, loput = askelpisteet (PeliApu.Matkapisteet). Tapa: Maa = liftaus,
        /// Bussi, Meri = laiva (muut kuten liftaus). Askelia: nopan/polun askelmäärä (web path.length), 0 = pisteitä − 1.
        /// </summary>
        public struct Matkaliike
        {
            public IList<(double lat, double lon)> Pisteet;
            public global::Matkakirja.Peli.Kulkutapa Tapa;
            public int Askelia;
        }

        /// <summary>
        /// SIIRTO WEBIN KOREOGRAFIALLA (Siirtokoreografia.cs; web ui.js animatePawnSisalla):
        ///   1. ennakkozoomi (kamera lähtöpisteen ja 2. askeleen puoliväliin askelmittakaavaan, laivalla koko matka
        ///      laatikkona) 760–1800 ms + hengähdys 120 ms;
        ///   2. YKSI saattava kamera-ajo kohti määränpäätä, kesto clamp(300 + nappula + 280, 1200, 6200) ms,
        ///      trapetsipehmennys ramppi 0,3 (ei tehdä, jos matka ruudulla &lt; max(24 pt, 6 % leveydestä));
        ///   3. nappula lähtee 300 ms saaton alun jälkeen: liftaus hyppyketjuna (860/708/640 ms, tauko 190 ms, huippu
        ///      0,34 × hypyn pituus ruudulla 9–30 pt), bussi autokyytinä (n × round(askel × 0,6)), laiva hyppyketjuna
        ///      (190 + 190 ms).
        /// valmis kutsutaan perillä: kun nappula on laskeutunut ja saatto päättynyt (nappula on perillä 280 ms ennen
        /// kameraa). Palauttaa koko liikkeen keston sekunteina (= <see cref="MatkanKesto"/>): Pelikoodari antaa sen
        /// NappulaAjon varakellolle. Sormi keskeyttää kamera-ajot (ele voittaa), nappula jatkaa silti.
        /// Uusi Aja/Lenna/Aseta keskeyttää ilman valmis-kutsua. Ilman kameraa (seuraaKamera false) vain nappula liikkuu.
        /// </summary>
        public float Aja(Matkaliike liike, Action valmis) =>
            AloitaSiirto(liike.Pisteet, Tavaksi(liike.Tapa), liike.Askelia, 0f, valmis);

        /// <summary>
        /// Liikkeen kesto sekunteina (ennakkozoomi + hengähdys + saatto, tai nappulan matka) nykyisestä kamerasta,
        /// käynnistämättä mitään. Laske juuri ennen Ajaa (ennakkozoomin kesto riippuu kameran paikasta).
        /// </summary>
        public float MatkanKesto(Matkaliike liike)
        {
            if (liike.Pisteet == null || liike.Pisteet.Count < 2) return 0f;
            var pisteet = new List<(double lat, double lon)>(liike.Pisteet);
            return (float)(Suunnittele(pisteet, Tavaksi(liike.Tapa), liike.Askelia, 0f, out _, out _).KokonaisMs / 1000.0);
        }

        /// <summary>
        /// VANHA RAJAPINTA (Pelikoodarin PeliOhjain kutsuu tätä, kunnes siirtyy <see cref="Aja(Matkaliike, Action)"/>:iin):
        /// sama koreografia oletuskulkutavalla (liftaus, askelia = pisteitä − 1), mutta koko aikataulu kutistetaan
        /// mahtumaan <paramref name="kestoS"/>:iin, jottei PeliOhjaimen varakello (kesto + 0,75 s) laukea kesken matkan.
        /// </summary>
        public void Aja(IList<(double lat, double lon)> matkapisteet, float kestoS, Action valmis) =>
            AloitaSiirto(matkapisteet, Siirtokoreografia.Tapa.Liftaus, 0, math.max(0.05f, kestoS), valmis);

        static Siirtokoreografia.Tapa Tavaksi(global::Matkakirja.Peli.Kulkutapa k) => k switch
        {
            global::Matkakirja.Peli.Kulkutapa.Bussi => Siirtokoreografia.Tapa.Bussi,
            global::Matkakirja.Peli.Kulkutapa.Meri => Siirtokoreografia.Tapa.Laiva,
            _ => Siirtokoreografia.Tapa.Liftaus,
        };

        float AloitaSiirto(IList<(double lat, double lon)> matkapisteet, Siirtokoreografia.Tapa tapa, int askelia, float mahduS, Action valmis)
        {
            if (matkapisteet == null || matkapisteet.Count == 0) { valmis?.Invoke(); return 0f; }
            Pysayta();
            Tee();
            olio.SetActive(true);
            var pisteet = new List<(double lat, double lon)>(matkapisteet);
            if (pisteet.Count == 1) { Siirra(pisteet[0].lat, pisteet[0].lon, 0); valmis?.Invoke(); return 0f; }
            Siirra(pisteet[0].lat, pisteet[0].lon, 0);
            var a = Suunnittele(pisteet, tapa, askelia, mahduS, out var ennakko, out bool kamera);
            Debug.Log($"MATKAKIRJA siirto: {tapa} {a.Askelia} askelta, ennakko {a.EnnakkoMs:0} ms → leveys {ennakko.Leveys:0} yks, " +
                      $"saatto {a.SaattoMs:0} ms, nappula {a.NappulaMs:0} ms (askel {a.AskelMs:0}, tauko {a.TaukoMs:0}), " +
                      $"yhteensä {a.KokonaisMs:0} ms" + (mahduS > 0 ? $" (vanha Aja, mahdutettu {mahduS:0.00} s:iin)" : ""));
            liike = StartCoroutine(Siirto(pisteet, a, ennakko, kamera, valmis));
            return (float)(a.KokonaisMs / 1000.0);
        }

        /// <summary>Ruudun mitat pisteinä, kuvakulma, kuvasuhde ja kameran nykyinen näkyvä leveys lautayksikköinä.</summary>
        bool Mitat(out double leveysPt, out double korkeusPt, out double fov, out double kuvasuhde)
        {
            leveysPt = korkeusPt = fov = kuvasuhde = 0;
            var kam = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (kam == null || kam.pixelWidth <= 0 || kam.pixelHeight <= 0) return false;
            double kerroin = PalloKierto.Pistekerroin;
            leveysPt = kam.pixelWidth / kerroin;
            korkeusPt = kam.pixelHeight / kerroin;
            fov = kam.fieldOfView;
            kuvasuhde = kam.aspect;
            return true;
        }

        double LeveysKorkeudesta(double korkeusM)
        {
            Mitat(out _, out _, out double fov, out double kuvasuhde);
            return Siirtokoreografia.LeveysKorkeudesta(korkeusM, fov, kuvasuhde, CesiumWgs84Ellipsoid.GetMaximumRadius());
        }

        double KorkeusLeveydesta(double leveysYks)
        {
            Mitat(out _, out _, out double fov, out double kuvasuhde);
            return Siirtokoreografia.KorkeusLeveydesta(leveysYks, fov, kuvasuhde, CesiumWgs84Ellipsoid.GetMaximumRadius());
        }

        double KameranKorkeus => kierto.korkeus > 0 ? kierto.korkeus : kierto.MaxKorkeus();

        Siirtokoreografia.Aikataulu Suunnittele(List<(double lat, double lon)> pisteet, Siirtokoreografia.Tapa tapa, int askelia,
            float mahduS, out Siirtokoreografia.Ennakko ennakko, out bool kamera)
        {
            int valeja = pisteet.Count - 1;
            int n = askelia > 0 ? askelia : valeja;
            ennakko = default;
            kamera = seuraaKamera && kierto != null && Mitat(out double lPt, out double kPt, out _, out _);
            if (kamera)
            {
                Mitat(out lPt, out kPt, out _, out _);
                ennakko = Siirtokoreografia.Ennakkozoomi(pisteet, tapa, kierto.leveys, kierto.pituus,
                    LeveysKorkeudesta(KameranKorkeus), lPt, kPt, LeveysKorkeudesta(kierto.MinKorkeus()));
            }
            var a = Siirtokoreografia.Laske(tapa, n, ennakko.KestoMs, kamera);
            // Hyppyjen määrä tulee pisteistä (normaalisti sama kuin askelia).
            a.NappulaMs = Siirtokoreografia.HyppyketjunMs(a, valeja);
            if (mahduS > 0 && a.KokonaisMs > mahduS * 1000.0) a = a.Skaalattu(mahduS * 1000.0 / a.KokonaisMs);
            return a;
        }

        static readonly Func<double, double> SaatonPehmennys = t => Siirtokoreografia.SiirtoajonPehmennys(t);

        /// <summary>
        /// Nappula osui maahan (pariteetti B21, äänet Pelikoodarilta): askel 1…n ja onko se viimeinen. Hyppyketjussa
        /// (liftaus, laiva) jokainen välihyppy (web 'step') ja viimeinen (web 'arrive'); bussilla vain viimeinen.
        /// </summary>
        public event Action<int, bool> Laskeutui;

        IEnumerator Siirto(List<(double lat, double lon)> pisteet, Siirtokoreografia.Aikataulu a, Siirtokoreografia.Ennakko ennakko,
            bool kamera, Action valmis)
        {
            kesken = valmis;
            float alku = Time.unscaledTime;
            double Ms() => (Time.unscaledTime - alku) * 1000.0;
            int valeja = pisteet.Count - 1;
            var lahto = pisteet[0];
            var maali = pisteet[valeja];

            // 1. ENNAKKOZOOMI (ui.js:23259): nappula seisoo lähtöpisteessä, kamera ajaa lähemmäs.
            if (kamera && a.EnnakkoMs > 0)
                kierto.Aja(ennakko.Lat, ennakko.Lon, KorkeusLeveydesta(ennakko.Leveys), (float)(a.EnnakkoMs / 1000.0), null, SaatonPehmennys);
            while (Ms() < a.SaattoAlkaaMs) yield return null;

            // 2. SAATTO (ui.js:23312): yksi ajo kohti määränpäätä nykyisestä näkymästä (sormi on voinut siirtää sitä).
            if (kamera && a.SaattoMs > 0 && Mitat(out double lPt, out _, out _, out _))
            {
                var s = Siirtokoreografia.Saattoajo(lahto, maali, ennakko, kierto.leveys, kierto.pituus, LeveysKorkeudesta(KameranKorkeus), lPt);
                if (s.Ajetaan)
                    kierto.Aja(s.Lat, s.Lon, double.IsNaN(s.Leveys) ? 0 : KorkeusLeveydesta(s.Leveys), (float)(a.SaattoMs / 1000.0), null, SaatonPehmennys);
                else
                    Debug.Log($"MATKAKIRJA siirto: saatto jää ajamatta, matka ruudulla {s.MatkaPt:0.0} pt ≤ {s.KynnysPt:0.0} pt");
            }

            // 3. NAPPULA lähtee viiveellä (ui.js:23345) ja hyppii tai ajaa perille.
            bool hyppii = Siirtokoreografia.Hyppii(a.Tapa);
            int hyppy = -1;
            double huippu = Siirtokoreografia.HypynKorkeusMin;
            while (true)
            {
                double m = Ms() - a.NappulaLahteeMs;
                if (m >= 0)
                {
                    var (i, e, nousu) = Siirtokoreografia.NappulanVaihe(a, valeja, m);
                    // Välihyppyjen laskeutumiset (web ui.js:23419 'step'): kaikki ohitetut, jos kehys hyppäsi yli.
                    if (hyppii) for (int j = math.max(hyppy, 0); j < i && hyppy >= 0; j++) Laskeutui?.Invoke(j + 1, false);
                    if (hyppii && i != hyppy)
                    {
                        // Huippu hypyn pituudesta ruudulla hypyn alkaessa (web siirto.js:572 hypynHuippu(matka)).
                        hyppy = i;
                        huippu = Siirtokoreografia.HypynHuippu(RuutuMatkaPt(pisteet[i], pisteet[i + 1]));
                    }
                    var q = ReittiGeometria.Isoympyra(pisteet[i].lat, pisteet[i].lon, pisteet[i + 1].lat, pisteet[i + 1].lon, e);
                    Siirra(q.x, q.y, 0);
                    Nosta(huippu * nousu);
                    if (m >= a.NappulaMs) break;
                }
                yield return null;
            }
            Nosta(0);
            Siirra(maali.lat, maali.lon, 0);
            // Viimeinen laskeutuminen (web 'arrive', ui.js:23387 bussi ja :23419 hyppyketju).
            Laskeutui?.Invoke(math.max(1, valeja), true);
            // Saatto jatkuu vielä 280 ms nappulan laskeuduttua ja pysähtyy pehmeästi: valmis vasta sen jälkeen, jottei
            // Pelikoodarin saapumisajo katkaise liikkuvaa kameraa (KAMERA-AJOT: ei hyppyjä).
            while (Ms() < a.KokonaisMs) yield return null;
            liike = null;
            kesken = null;
            valmis?.Invoke();
        }

        /// <summary>Kahden maan pisteen etäisyys ruudulla pisteinä (nappulan korkeudella); 0, jos jompikumpi ei näy.</summary>
        double RuutuMatkaPt((double lat, double lon) a, (double lat, double lon) b)
        {
            if (kierto == null) return 0;
            if (!kierto.RuutuPiste(a.lat, a.lon, out var ra, Pohja) || !kierto.RuutuPiste(b.lat, b.lon, out var rb, Pohja)) return 0;
            return Vector2.Distance(ra, rb) / PalloKierto.Pistekerroin;
        }

        /// <summary>
        /// Hypyn kaari: nappulan kuva nousee ruudulla <paramref name="nostoPt"/> pistettä (web siirto.js piirraNappula:
        /// hahmo translate(0, −korkeus)). Varjostimen ankkuri _Keskitys on nappulan korkeuksina, joten −nosto / koko.
        /// </summary>
        void Nosta(double nostoPt)
        {
            if (oma == null || kone) return;
            oma.SetFloat("_Keskitys", -(float)(nostoPt / math.max(1f, koko)));
        }

        /// <summary>
        /// Lento isoympyräkaarena (lento, mannerlento) lennon esityksellä: kamera LennonAikajanan mukaan
        /// (build 11: syöksy koneen sivulle, sivukylki, loittonus, liuku, kierto kaupungin vastakkaiselle puolelle ja
        /// orbit saapumisnäkymään), aurinko, sumu, pilvet ja savujana.
        /// </summary>
        public void Lenna(double lat0, double lon0, double lat1, double lon1, float kestoS, Action valmis)
        {
            Pysayta();
            Tee();
            Kone(true);
            Siirra(lat0, lon0, 0);
            liike = StartCoroutine(Lento(lat0, lon0, lat1, lon1, math.max(0.5f, kestoS), 0f, null, valmis, naytaLentokaari));
        }

        /// <summary>
        /// Aloituslento (omistajan aloituskaava 23.9.2026): kamera zoomaa lähtöön (Lontoo),
        /// sitten lento kuten <see cref="Lenna"/>. lahti kutsutaan, kun kone irtoaa (ääni ja
        /// luenta alkavat), valmis perillä. kestoS = lennon kesto ilman zoomia (PeliOhjain: reitin
        /// pituuden mukaan 16–26 s, LennonAikajana.Kesto). Uusi Aja/Lenna/Aseta keskeyttää ilman valmis-kutsua;
        /// perillä kone vaihtuu takaisin nappulaksi.
        /// </summary>
        public void AloitusLento(double lahtoLat, double lahtoLon, double lat, double lon, float kestoS, Action lahti, Action valmis)
        {
            Pysayta();
            Tee();
            Kone(true);
            Siirra(lahtoLat, lahtoLon, 0);
            // Omistaja 24.9.: aloituslennon ajan kartalla näkyy vain kohdekaupungin piste (ja nimiö);
            // pelin karttapisteet ja muut kaupungit palaavat perillä (Paatalento).
            aloitusMerkit = FindAnyObjectByType<KaupunkiMerkit>();
            string kohde = aloitusMerkit != null ? aloitusMerkit.LahinId(lat, lon) : null;
            string lahto = aloitusMerkit != null ? aloitusMerkit.LahinId(lahtoLat, lahtoLon) : null;
            // Lähtökin näkyy (omistaja 24.9. klo 13.4x: punainen piste ja rengas lähtöön ja kohteeseen koko lennon).
            if (aloitusMerkit != null) aloitusMerkit.NaytaVain(new[] { kohde, lahto }.Where(x => x != null).ToArray());
            KarttaKerrokset.Instanssi?.Nakyvyys("pisteet", false);
            // Löydös 84 (omistaja 25.9. build 13): ei erillistä Lontoon zoomia. Kuva häivytetään mustaan, lennon pinta
            // latautuu verhon takana, ja verhon jälkeen kamera lähtee valintanäkymästä kohti konetta, joka on jo
            // nousussa (zoomin aika lisätään lentoon, jotta syöksy ei nopeudu).
            liike = StartCoroutine(Lento(lahtoLat, lahtoLon, lat, lon, math.max(1f, kestoS) + lahtoZoomS, 0f, lahti, valmis, false, aloitus: true));
        }

        /// <summary>
        /// Aloituslento odottaa perillä saapumiskorttia (löydös 85): lennon esitys (pinta, kone, merkit) jää kuvaan,
        /// kunnes PeliOhjain kutsuu <see cref="PaataAloituslento"/> kortin peittäessä ruudun.
        /// </summary>
        public bool AloituslentoPerilla { get; private set; }

        /// <summary>
        /// Löydös 85: aloituslennon esitys pois (topografiapinta → vanha kartta, kone ja lennon merkit pois) vasta,
        /// kun saapumiskortin paperi peittää ruudun. Ei tee mitään, jos aloituslento ei odota.
        /// </summary>
        public void PaataAloituslento()
        {
            // Varareitti ehti ennen lennon loppua (PeliOhjaimen ajoLoppuu): lento keskeytetään ja esitys puretaan.
            if (!AloituslentoPerilla && aloitusAjossa && liike != null) { Pysayta(); return; }
            if (!AloituslentoPerilla) return;
            AloituslentoPerilla = false;
            Paatalento();
        }

        /// <summary>Aloituslennon Lento-ajo käynnissä (musta verho tai lento).</summary>
        bool aloitusAjossa;

        /// <summary>Lennon vaihe (LENNON ESITYS): Pelikoodari ajoittaa äänet ja luennan, UI tekstit.</summary>
        public LennonVaihe Vaihe { get; private set; }
        public event Action<LennonVaihe> VaiheVaihtui;

        void AsetaVaihe(LennonVaihe v)
        {
            if (Vaihe == v) return;
            Vaihe = v;
            VaiheVaihtui?.Invoke(v);
        }

        IEnumerator Lento(double lat0, double lon0, double lat1, double lon1, float kesto, float zoomS, Action lahti, Action valmis, bool kaari,
            bool aloitus = false)
        {
            kesken = valmis;
            AloituslentoPerilla = false;
            aloitusAjossa = aloitus;
            // Lähtözoomin korkeus (Lontoo ennen koneen lähtöä).
            double lahtoKorkeus = kierto != null ? kierto.KorkeusKaarelle(lahtoKaari) : 0;
            // KAMERAREITTI (build 11): vaihejako lennon keston mukaan (sivukylki ≥ 1,4 s, orbit ≥ 4 s).
            var jako = LennonAikajana.Jaa(kesto);
            koneMinimi = 0;
            // KORKEUSKERROIN (löydös 29): lennon pohja nousee liioitellun maaston yli (reitin näytteet, LennonPohja).
            double reittiM0 = math.radians(ReittiGeometria.Kulma(lat0, lon0, lat1, lon1)) * 6371000.0;
            double huippu0 = math.min(900000.0, reittiM0 * 0.12);
            lentoPohja = KorkeusKerroin.Sovita(nosto);
            var pohjaKysely = new LennonPohja(this, lat0, lon0, lat1, lon1, reittiM0, huippu0);
            // LÄHTÖSUMU (omistaja 24.9. klo 13.5x, LENNON PINTA): usva nousee koneen alle jo zoomin aikana, ja pallon
            // pinta vaihtuu lennon pintaan vasta sen peitossa (pintaVaihdettu alla).
            // Lennon pinnan laatat välimuistiin zoomin ja usvan aikana (ei lohkoja matkalla, Fable 24.9.).
            var esilataus = KarttaKerrokset.Instanssi?.EsilataaLento(lat0, lon0, lat1, lon1);
            // Lento päättyy täsmälleen saapumisnäkymään, johon PeliOhjain.Saavu ajaa perillä (aloituslento: webin
            // kaupunkinäkymä ilman maan laatikkoa; kallistus 0, pohjoinen ylös), joten perillä kamera ei hyppää.
            double saapumisKorkeus = lahtoKorkeus, saapumisLat = lat1, saapumisLon = lon1;
            Laattapalvelin.Esilataus kohdeLataus = null;
            if (kierto != null)
            {
                var sn = kierto.SaapumisNakyma(null, lat1, lon1, maaRajaus: false);
                saapumisKorkeus = sn.Korkeus * CesiumWgs84Ellipsoid.GetMaximumRadius();
                saapumisLat = sn.Lat;
                saapumisLon = sn.Lon;
                // LASKUN LAATAT (Fable 24.9. klo 18): orbitin loppunäkymän laatat etusijalla heti lennon alussa.
                // Näkymä: leveys NakyvaLeveys lautayksikköä (12000 = 360°), korkeus leveys / kuvasuhde, väljennys 25 %.
                var kam = kierto.GetComponent<Camera>();
                double aspect = kam != null && kam.aspect > 0 ? kam.aspect : 0.7;
                double pl = 0.5 * 1.25 * sn.NakyvaLeveys * 360.0 / Saapumisnakyma.LaudanLeveys;
                double pk = pl / aspect;
                kohdeLataus = KarttaKerrokset.Instanssi?.EsilataaKohde(
                    math.min(lat1, sn.Lat - pk), math.max(lat1, sn.Lat + pk), sn.Lon - pl, sn.Lon + pl, lat1, lon1);
            }
            bool pintaVaihdettu = false, laskuSumu = false, kohdeKirjattu = false;
            if (aloitus)
            {
                // LÖYDÖS 84: feidi mustaan → värillinen topografiakartta latautuu taustalla → feidi takaisin. Pinta
                // vaihdetaan verhon takana (ei lähtösumua), ja verho lähtee, kun reitin laatat ja näkyvä pallo ovat
                // valmiit tai Katto on kulunut.
                yield return Mustaverho.Haivyta(1f);
                KarttaKerrokset.Instanssi?.LentoPohja(true);
                pintaVaihdettu = true;
                var pallo = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
                float odotus = Time.unscaledTime;
                // Ennen lähtösumu peitti koneen lähikuvan maan; nyt lähikuvan laatat ladataan mustan alla: kamera ensin
                // lähikuvaan (Lontoo, koneen kylki 30 km, sama asento kuin syöksyn lopussa), sitten takaisin
                // valintanäkymään, ja kummassakin odotetaan näkyvän pallon latausta (Cesium pitää laatat välimuistissa).
                IEnumerator Lataa(float katto)
                {
                    float alku = Time.unscaledTime;
                    // Vähintään muutama kehys, jotta Cesium ehtii pyytää uudet laatat ennen latausasteen lukua.
                    int kehykset = 0;
                    while (Time.unscaledTime - alku < katto)
                    {
                        bool reitti = esilataus == null || esilataus.Osuus >= 0.9f;
                        bool nakyma = pallo == null || pallo.ComputeLoadProgress() >= MustanLataus;
                        if (++kehykset > 10 && reitti && nakyma) yield break;
                        yield return null;
                    }
                }
                if (kierto != null)
                {
                    var (vLat, vLon, vKork, vKall, vSuunta, vKatse) =
                        (kierto.leveys, kierto.pituus, kierto.korkeus, kierto.KaytettyKallistus, kierto.suuntima, kierto.katseKorkeus);
                    double pohja0 = double.IsNaN(lentoPohja) ? KorkeusKerroin.Sovita(nosto) : lentoPohja;
                    kierto.Kuvaa(lat0, lon0, LennonAikajana.LahiM, LennonAikajana.LahiKallistus,
                        Suuntima(lat0, lon0, lat1, lon1, 0) + 90.0, pohja0 + LennonAikajana.MinKoneKorkeusM);
                    yield return Lataa(MustanKatto * 0.6f);
                    float lahi = Time.unscaledTime - odotus;
                    kierto.Kuvaa(vLat, vLon, vKork, vKall, vSuunta, vKatse);
                    yield return Lataa(MustanKatto - (Time.unscaledTime - odotus));
                    Debug.Log($"MATKAKIRJA aloituslento: lähikuvan laatat {lahi:0.0} s");
                }
                else yield return Lataa(MustanKatto);
                Debug.Log($"MATKAKIRJA aloituslento: musta {Time.unscaledTime - odotus:0.0} s, esilataus "
                          + (esilataus != null ? $"{esilataus.Valmis}+{esilataus.Epaonnistui}/{esilataus.Yhteensa}" : "-")
                          + $", pallo {(pallo != null ? pallo.ComputeLoadProgress().ToString("0") : "-")} %");
                yield return Mustaverho.Haivyta(0f);
            }
            else if (usva != null)
            {
                usva.Aseta(lat0, lon0, UsvanKorkeus, 0f);
                usva.Tavoite(1f, math.max(0.8f, zoomS));
            }
            if (kierto != null && zoomS > 0)
            {
                kierto.Aja(lat0, lon0, lahtoKorkeus, zoomS, null);
                // Sormi voi keskeyttää zoomin (Aja ei silloin kutsu valmista): lento lähtee silti ajallaan.
                // Zoomin aikana reitin maastokysely valmistuu yleensä; pohja asettuu heti (kamera on vielä kaukana).
                float zoomAlku = Time.unscaledTime;
                while (Time.unscaledTime - zoomAlku < zoomS)
                {
                    double ennen = lentoPohja;
                    pohjaKysely.Paivita(heti: true);
                    Siirra(lat0, lon0, 0);
                    if (usva != null && math.abs(lentoPohja - ennen) > 1.0)
                    {
                        // Lähtösumu koneen alle myös korotetulla pohjalla (peitto ja nousu jatkuvat).
                        usva.Aseta(lat0, lon0, UsvanKorkeus, usva.Peitto);
                        usva.Tavoite(1f, math.max(0.05f, zoomS - (Time.unscaledTime - zoomAlku)));
                    }
                    yield return null;
                }
            }
            lahti?.Invoke();

            double kulma = ReittiGeometria.Kulma(lat0, lon0, lat1, lon1);
            double reittiM = math.radians(kulma) * 6371000.0;
            double huippu = huippu0;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;

            // LENNON AIKAJANA (omistaja 24.9.): kamera avainkehyksinä datana, kohdekaupungin kierto taulukosta.
            var merkit = aloitusMerkit != null ? aloitusMerkit : FindAnyObjectByType<KaupunkiMerkit>();
            string kohdeId = merkit != null ? merkit.LahinId(lat1, lon1) : null;
            // LENNON KARTTA (omistaja 24.9.2026 klo 13.4x): reittikaari pois (lähikuvassa se näkyi juovana koneesta
            // kameraa kohti), sileä pohja ilman teitä ja rajoja, lähtö ja kohde punaisin pistein ja renkain.
            var kerrokset = KarttaKerrokset.Instanssi;
            reititEnnen = kerrokset == null || kerrokset.reitit == null || kerrokset.reitit.Nakyvissa;
            kerrokset?.Nakyvyys("reitit", false);
            // VALITUN LENNON KAARI (pariteetti B24, web ui.js:20691 ja 11424 lentoKaari, nollaus perillä 20755/11433):
            // liikkuva katkoviiva lähdöstä laskeutumiseen koneen omaa reittiä pitkin. Ei aloituslennolla (webissä sillä
            // ei ole lentoKaarta). Lähikuvissa kaari häivytetään (yllä oleva omistajan havainto: juova kameraa kohti).
            if (kaari) TeeLentokaari(lat0, lon0, lat1, lon1, huippu, jako);
            lentoMerkit = merkit;
            lentoIdt = new[] { merkit != null ? merkit.LahinId(lat0, lon0) : null, kohdeId }.Where(x => x != null).ToArray();
            // MAAMERKIT (omistaja 24.9.): lähtö- ja kohdekaupungin tunnusrakennus näkyy koko lennon.
            if (maamerkit != null) maamerkit.Nayta(lentoIdt);
            if (merkit != null)
            {
                merkit.Renkaat(lentoIdt, null, LentoPunainen);
                foreach (var id in lentoIdt) merkit.Korosta(id, LentoPunainen);
            }
            // Maisemasuunta ratkaisee vain kiertosuunnan (Fable 24.9.); muille kohteille lyhyempi kierto.
            var kaupunki = kohdeId != null && LennonAikajana.Kaupungit.TryGetValue(kohdeId, out var kk) ? kk : LennonAikajana.EiMaisemaa;
            var avaimet = LennonAikajana.Laske(reittiM, saapumisKorkeus, kaupunki, jako,
                tt => Suuntima(lat0, lon0, lat1, lon1, LennonAikajana.KoneenOsuus(tt, jako)));
            // Lähtöasento kamerasta (esim. Lontoon zoomin loppu): aikajanan ensimmäinen avain.
            var alku0 = kierto != null
                ? (lat: kierto.leveys, lon: kierto.pituus, katse: kierto.katseKorkeus)
                : (lat: lat0, lon: lon0, katse: 0.0);
            if (kierto != null)
                avaimet[0] = new LennonAikajana.Avain
                {
                    Osuus = 0, Kohde = -1, SuuntaAbs = true,
                    Etaisyys = kierto.korkeus, Kallistus = kierto.KaytettyKallistus, Suunta = kierto.suuntima,
                };

            if (savu != null) savu.Aloita();
            if (aurinko != null) aurinko.Aseta(true);
            Filmipino.Instanssi?.Paalle(true);
            var pilvet = Matkakirja.Linssit.Pilvet.LentoPilvet.Instanssi;
            pilvet?.Nayta(math.max(2000.0, huippu * 0.35));
            AsetaVaihe(LennonVaihe.Nousu);

            float alku = Time.unscaledTime;
            while (true)
            {
                float kulunut = Time.unscaledTime - alku;
                double t = math.saturate(kulunut / kesto);
                // Koneen tempo: lähikuvassa lähes paikallaan, kiihdytys, tasainen matka, hidastus kaupunkiin.
                double p = LennonAikajana.KoneenOsuus(t, jako);
                pohjaKysely.Paivita();
                var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                // Kone vähintään 10 km lennon pohjan yllä lähikuvista kiertoon (skaalattu kone ei leikkaa maastoa,
                // ja sivukyljen kamera on koneen tasolla), laskeutuu orbitin aikana.
                koneMinimi = LennonAikajana.KoneenMinimi(t, jako, aloitus ? LennonAikajana.AloituksenNousu : 1.0);
                double h = KoneenKorkeus(p, huippu);
                Siirra(q.x, q.y, h);
                double suunta = Suuntima(lat0, lon0, lat1, lon1, p);
                AsetaVaihe(LennonAikajana.Vaihe(t, jako));
                // Mittari: kohdealueen laatat orbitin alkaessa (tavoite: valmiina ennen laskeutumisnäkymää).
                if (kohdeLataus != null && !kohdeKirjattu && t >= jako.Kierto)
                {
                    kohdeKirjattu = true;
                    Debug.Log($"MATKAKIRJA lennon pinta: orbit alkaa t={t * kesto:0.0} s, kohdealue {kohdeLataus.Valmis}+{kohdeLataus.Epaonnistui}"
                              + $"/{kohdeLataus.Yhteensa} ({kohdeLataus.Osuus:P0})");
                }

                var (etaisyys, kallistusNyt, suuntimaNyt, kohde, koneOsuus) = LennonAikajana.Arvo(avaimet, t, suunta);
                koneRuudusta = (float)koneOsuus;
                // Kohde: −1 lähtöpiste → 0 kone → 1 kohdekaupunki → 2 saapumisnäkymän keskipiste.
                double klat, klon, katse;
                if (kohde < 0)
                {
                    double s = kohde + 1;
                    klat = math.lerp(alku0.lat, q.x, s);
                    klon = alku0.lon + ((q.y - alku0.lon + 540.0) % 360.0 - 180.0) * s;
                    katse = math.lerp(alku0.katse, lentoPohja + h, s);
                }
                else if (kohde <= 1)
                {
                    klat = math.lerp(q.x, lat1, kohde);
                    klon = q.y + ((lon1 - q.y + 540.0) % 360.0 - 180.0) * kohde;
                    katse = math.lerp(lentoPohja + h, 0.0, kohde);
                }
                else
                {
                    double s = kohde - 1;
                    klat = math.lerp(lat1, saapumisLat, s);
                    klon = lon1 + ((saapumisLon - lon1 + 540.0) % 360.0 - 180.0) * s;
                    katse = 0.0;
                }
                if (kierto != null) kierto.Kuvaa(klat, klon, etaisyys, kallistusNyt, suuntimaNyt, katse);

                // Etäisyyssumu loittonuksen jälkipuoliskolta kierron puoliväliin (build 10: 30–80 %).
                double matka = Pehmea((t - (jako.Sivu + 0.35 * (jako.Loitto - jako.Sivu))) / (0.3 * (jako.Loitto - jako.Sivu)))
                               * (1 - Pehmea((t - jako.Liuku) / (0.5 * (jako.Kierto - jako.Liuku))));
                if (aurinko != null)
                {
                    aurinko.Kohde(q.y);
                    // Aurinko ja rinnevarjot myös kaupungin kierron ajan; kameravalo palaa juuri ennen perillä oloa.
                    if (t > 1 - 0.22 * (1 - jako.Kierto)) aurinko.Aseta(false);
                    // Etäisyyssumu matkalennon ajan: alku ja loppu karkaavat kauas nousussa ja laskussa.
                    if (matka > 0.02) aurinko.Sumu(etaisyys * (1.1 + 6.0 * (1 - matka)), etaisyys * (4.0 + 30.0 * (1 - matka)));
                    else aurinko.Sumu(0, 0);
                }
                if (pilvet != null)
                {
                    if (t > jako.Liuku) { if (pilvet.Nakyvissa) pilvet.Piilota(); }
                    else pilvet.Korkeus(math.max(2000.0, (lentoPohja + h) * 0.6));
                }
                PaivitaKone(kamera, lat0, lon0, lat1, lon1, p, huippu);
                if (lentokaari != null) PaivitaLentokaari(lat0, lon0, lat1, lon1, huippu, jako);
                // LENNON PINTA: vaihto usvan peitossa, usva hälvenee irtautumisessa; laskussa usva kohteen ylle,
                // pergamentti palaa sen alla ja usva hälvenee perillä (jatkuu Paatalennon jälkeen).
                // Vasta lähikuvassa (t ≥ 0,08), kun usva täyttää kuvan: Lontoon zoomissa kamera on niin korkealla, että
                // usvalevy peittää vain keskustan ja uuden pinnan laatat näkyivät pikselöityinä reunoilla (sim 24.9.).
                // Esilataus (build 9): vaihto vasta, kun kolmannes reitin laatoista on välimuistissa (lähtöpää ensin),
                // muuten viimeistään t > 0,2 ennen kuin usva alkaa hälvetä (t > 0,24).
                bool pintaValmis = esilataus == null || esilataus.Osuus >= 0.33f;
                // !laskuSumu: laskun jälkeen (pintaVaihdettu = false) pinta ei saa vaihtua takaisin; ennen t > 0,2 -ehto
                // vaihtoi sen uudelleen joka kehys, ja loki näytti 15 vaihto/lasku-paria (kylmä lento 24.9.).
                // Kamerareitti (build 11): lähikuva alkaa syöksyn loppupuolella (0,6 × syöksy ≈ 8 %), varaehto sivukyljen lopussa.
                if (!pintaVaihdettu && !laskuSumu && ((usva == null || usva.Peitto > 0.85f) && t >= 0.6 * jako.Syoksy && pintaValmis || t > jako.Sivu))
                {
                    pintaVaihdettu = true;
                    kerrokset?.LentoPohja(true);
                    // Mittari (Fable 24.9.): montako reitin laattaa ehti välimuistiin ennen pinnan vaihtoa.
                    if (esilataus != null)
                        Debug.Log($"MATKAKIRJA lennon pinta: vaihto t={t:0.00}, esilataus {esilataus.Valmis}+{esilataus.Epaonnistui}/{esilataus.Yhteensa} "
                                  + $"({esilataus.Osuus:P0}), välimuistista {Laattapalvelin.Valimuistista}, verkosta {Laattapalvelin.Verkosta}");
                }
                double laskuSumuun = jako.Kierto + 0.55 * (1 - jako.Kierto);
                if (usva != null && t > jako.Sivu + 0.02 && t < laskuSumuun) usva.Tavoite(0f, kesto * 0.12f);
                // Löydös 85: aloituslento pysyy topografiakartalla loppuun asti (ei laskusumua eikä paluuta pohjaan).
                if (usva != null && !aloitus && !laskuSumu && t > laskuSumuun)
                {
                    laskuSumu = true;
                    usva.Aseta(lat1, lon1, UsvanKorkeus, usva.Peitto);
                    usva.Tavoite(1f, kesto * 0.05f);
                }
                if (laskuSumu && pintaVaihdettu && (usva.Peitto > 0.85f || t > 0.985))
                {
                    pintaVaihdettu = false;
                    if (esilataus != null)
                        Debug.Log($"MATKAKIRJA lennon pinta: lasku, esilataus {esilataus.Valmis}+{esilataus.Epaonnistui}/{esilataus.Yhteensa} "
                                  + $"({esilataus.Osuus:P0}), välimuistista {Laattapalvelin.Valimuistista}, verkosta {Laattapalvelin.Verkosta}");
                    kerrokset?.LentoPohja(false);
                    usva.Tavoite(0f, 1.4f);
                }
                if (t >= 1) break;
                yield return null;
            }
            liike = null;
            kesken = null;
            lentoPohja = double.NaN;
            // Löydös 85: aloituslennon esitys jää kuvaan saapumiskortin alle (PaataAloituslento).
            aloitusAjossa = false;
            if (aloitus) AloituslentoPerilla = true;
            else Paatalento();
            valmis?.Invoke();
        }

        /// <summary>Löydös 84: pisin musta odotus (s) lennon pinnan latautumista, vaikka laatat eivät olisi valmiita.</summary>
        public const float MustanKatto = 5f;
        /// <summary>Näkyvän pallon latausaste (%), jolla musta verho saa lähteä (Cesium3DTileset.ComputeLoadProgress).</summary>
        public const float MustanLataus = 97f;

        /// <summary>Lennon esitys pois (perillä tai keskeytys): kamera palautuu, valo, sumu ja pilvet pois.</summary>
        KaupunkiMerkit aloitusMerkit;

        /// <summary>Koneen leveys osuutena ruudun leveydestä lennon aikajanalta (0 = merkkikoko).</summary>
        float koneRuudusta;

        /// <summary>Koneen vähimmäiskorkeus lennon pohjasta tässä kehyksessä (LennonAikajana.KoneenMinimi).</summary>
        double koneMinimi;

        /// <summary>Koneen korkeus lennon pohjasta reitin kohdassa p: kaari huippu · sin πp, vähintään koneMinimi.</summary>
        double KoneenKorkeus(double p, double huippu) => math.max(huippu * math.sin(math.PI * p), koneMinimi);

        /// <summary>Lennon lähdön ja kohteen merkki (omistaja 24.9.: punainen piste tai hehkurengas).</summary>
        static readonly Color LentoPunainen = new Color32(0xb8, 0x32, 0x28, 0xff);
        KaupunkiMerkit lentoMerkit;
        string[] lentoIdt;
        bool reititEnnen = true;

        // Oletus pois (Fable 25.9. klo 05.3x, B25: LENNON ESITYS kaikille lennoille, hyväksytty poikkeama webistä;
        // savujana korvaa punaisen viivan, kaari näkyy ennen lähtöä listassa). Kytkin kokeiluun.
        [Tooltip("Valitun lennon kaari liikkuvana katkoviivana lennon ajan (pariteetti B24); ei aloituslennolla.")]
        public bool naytaLentokaari = false;
        [Tooltip("Kaari häipyy, kun kone täyttää tätä suuremman osan ruudun leveydestä (lähikuvat).")]
        public float lentokaarenLahikuva = 0.08f;

        GameObject lentokaari;
        Material lentokaarenMateriaali;
        double lentokaarenPohja;
        float lentokaarenAlfa = -1f;

        /// <summary>
        /// Koneen reitti viivaksi: aikajanan näytteet t = 0…1, koneen osuus KoneenOsuus(t) ja korkeus
        /// lentoPohja + max(huippu · sin πp, KoneenMinimi(t)), eli täsmälleen koneen kulkema kaari.
        /// </summary>
        void TeeLentokaari(double lat0, double lon0, double lat1, double lon1, double huippu, LennonAikajana.Jako jako)
        {
            PoistaLentokaari();
            var reitit = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.reitit : null;
            if (reitit == null || reitit.korostus == null) return;
            if (lentokaarenMateriaali == null) lentokaarenMateriaali = new Material(reitit.korostus) { name = "Valitun lennon kaari" };
            const int N = 256;
            var pisteet = new List<double3>(N + 1);
            double pohja = double.IsNaN(lentoPohja) ? Pohja : lentoPohja;
            for (int i = 0; i <= N; i++)
            {
                double t = (double)i / N;
                double p = LennonAikajana.KoneenOsuus(t, jako);
                var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                pisteet.Add(new double3(q.x, q.y, pohja + math.max(huippu * math.sin(math.PI * p), LennonAikajana.KoneenMinimi(t, jako))));
            }
            lentokaari = reitit.PiirraKaari("valittu-lento", pisteet, lentokaarenMateriaali);
            lentokaarenPohja = pohja;
            lentokaarenAlfa = -1f;
        }

        /// <summary>Kaari lennon pohjan mukana (maastokysely voi nostaa pohjaa) ja häivytys lähikuvissa.</summary>
        void PaivitaLentokaari(double lat0, double lon0, double lat1, double lon1, double huippu, LennonAikajana.Jako jako)
        {
            if (!double.IsNaN(lentoPohja) && math.abs(lentoPohja - lentokaarenPohja) > 300.0)
                TeeLentokaari(lat0, lon0, lat1, lon1, huippu, jako);
            if (lentokaari == null || lentokaarenMateriaali == null) return;
            float alfa = 1f - Mathf.SmoothStep(0f, 1f, koneRuudusta / Mathf.Max(0.001f, lentokaarenLahikuva));
            if (Mathf.Abs(alfa - lentokaarenAlfa) < 0.004f) return;
            lentokaarenAlfa = alfa;
            var c = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.reitit != null
                ? KarttaKerrokset.Instanssi.reitit.korostus.GetColor("_BaseColor") : Color.white;
            lentokaarenMateriaali.SetColor("_BaseColor", new Color(c.r, c.g, c.b, c.a * alfa));
            lentokaarenMateriaali.SetFloat("_Kerroin", PalloKierto.Pistekerroin);
            lentokaari.SetActive(alfa > 0.004f);
        }

        void PoistaLentokaari()
        {
            if (lentokaari != null) Destroy(lentokaari);
            lentokaari = null;
        }

        void Paatalento()
        {
            PoistaLentokaari();
            var kerrokset = KarttaKerrokset.Instanssi;
            if (kerrokset != null)
            {
                kerrokset.LentoPohja(false);
                if (usva != null) usva.Tavoite(0f, 1.4f);
                if (maamerkit != null) maamerkit.Piilota();
                if (reititEnnen) kerrokset.Nakyvyys("reitit", true);
            }
            if (lentoMerkit != null)
            {
                lentoMerkit.Renkaat(null);
                if (lentoIdt != null) foreach (var id in lentoIdt) lentoMerkit.Korosta(id, null);
                lentoMerkit = null;
                lentoIdt = null;
            }
            koneRuudusta = 0;
            koneMinimi = 0;
            if (aloitusMerkit != null)
            {
                aloitusMerkit.NaytaVain(null);
                KarttaKerrokset.Instanssi?.Nakyvyys("pisteet", true);
                aloitusMerkit = null;
            }
            if (kierto != null) kierto.SeurantaLoppui();
            if (savu != null) savu.Lopeta();
            if (aurinko != null) { aurinko.Aseta(false); aurinko.Sumu(0, 0); }
            Filmipino.Instanssi?.Paalle(false);
            var pilvet = Matkakirja.Linssit.Pilvet.LentoPilvet.Instanssi;
            if (pilvet != null && pilvet.Nakyvissa) pilvet.Piilota();
            AsetaVaihe(LennonVaihe.Ei);
            Kone(false);
        }

        static double Pehmea(double x)
        {
            x = math.saturate(x);
            return x * x * (3 - 2 * x);
        }

        /// <summary>Lentosuunta (suuntima asteina pohjoisesta) reitin kohdassa p.</summary>
        static double Suuntima(double lat0, double lon0, double lat1, double lon1, double p)
        {
            double pa = math.min(p, 0.995), pb = pa + 0.005;
            var a = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, pa);
            var b = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, pb);
            double f1 = math.radians(a.x), f2 = math.radians(b.x), dl = math.radians(b.y - a.y);
            double y = math.sin(dl) * math.cos(f2);
            double x = math.cos(f1) * math.sin(f2) - math.sin(f1) * math.cos(f2) * math.cos(dl);
            return math.degrees(math.atan2(y, x));
        }

        /// <summary>3D-kone (DC-3) paikalleen, nokka lentosuuntaan ja koko ruudulla vakio; ilman mallia kuvan kierto.</summary>
        void PaivitaKone(Camera kamera, double lat0, double lon0, double lat1, double lon1, double p, double huippu)
        {
            if (kamera == null) return;
            double p2 = math.min(1.0, p + 0.004), p1 = p2 - 0.004;
            Vector3 a = Maailmaan(lat0, lon0, lat1, lon1, p1, huippu), b = Maailmaan(lat0, lon0, lat1, lon1, p2, huippu);
            if (savu != null)
            {
                var qs = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
                savu.Lisaa(CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(qs.y, qs.x, lentoPohja + KoneenKorkeus(p, huippu))));
            }
            if (malli == null) { Suunta(kamera, a, b); return; }
            var paikka = olio.transform.position;
            var ylos = (paikka - georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero))).normalized;
            var eteen = b - a;
            if (eteen.sqrMagnitude > 1e-6f) malli.transform.SetPositionAndRotation(paikka, Quaternion.LookRotation(eteen.normalized, ylos));
            else malli.transform.position = paikka;
            float etaisyys = Vector3.Distance(kamera.transform.position, paikka);
            float kerroin = PalloKierto.Pistekerroin;
            float pikseli = 2f * etaisyys * Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad) / Mathf.Max(1, Screen.height);
            // Lähikuvassa kone täyttää osan ruudun leveydestä (aikajana), muuten vakiokokoinen merkki.
            float koko = Mathf.Max(malliPx * kerroin, koneRuudusta * Screen.width);
            malli.transform.localScale = Vector3.one * (pikseli * koko / malliKoko);
            // Filmiefektipino (erä 3): lähikuvan osuus syväterävyyteen (täysi lähikuva = sivukylki 0,9, build 10:ssä 0,74),
            // luotain koneen mukana.
            Filmipino.Instanssi?.Kuvaa(koneRuudusta / (float)LennonAikajana.LahiKone, etaisyys, paikka);
        }

        Vector3 Maailmaan(double lat0, double lon0, double lat1, double lon1, double p, double huippu)
        {
            var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, p);
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.y, q.x, lentoPohja + KoneenKorkeus(p, huippu)));
            return georeferenssi.transform.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef));
        }

        /// <summary>Kuvan nokka lentosuuntaan ruudulla (kuva osoittaa ylös), kun 3D-mallia ei ole.</summary>
        void Suunta(Camera kamera, Vector3 a, Vector3 b)
        {
            Vector3 ra = kamera.WorldToScreenPoint(a), rb = kamera.WorldToScreenPoint(b);
            var d = new Vector2(rb.x - ra.x, rb.y - ra.y);
            if (d.sqrMagnitude < 1e-6f || ra.z <= 0 || rb.z <= 0) return;
            oma.SetFloat("_Kulma", Mathf.Atan2(d.y, d.x) - Mathf.PI / 2f);
        }

        /// <summary>Vaihtaa nappulan ja lentokoneen välillä: 3D-malli, jos koneMalli on annettu, muuten kuva.</summary>
        void Kone(bool paalle)
        {
            if (oma == null || kone == paalle) return;
            kone = paalle;
            if (koneMalli != null)
            {
                if (paalle && malli == null)
                {
                    malli = Instantiate(koneMalli, georeferenssi.transform, false);
                    malli.name = "Lentokone";
                    if (malli.GetComponent<Potkurit>() == null) malli.AddComponent<Potkurit>();
                    // Mallin koko (siipiväli tai pituus) maailman akseleissa ennen kiertoa.
                    malli.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
                    malli.transform.localScale = Vector3.one;
                    Bounds? rajat = null;
                    foreach (var r in malli.GetComponentsInChildren<Renderer>())
                    {
                        r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                        var oma = r.name.StartsWith("Raita") && raitaMateriaali != null ? raitaMateriaali
                            : r.name.StartsWith("Ikkun") && ikkunaMateriaali != null ? ikkunaMateriaali : koneMateriaali;
                        if (oma != null)
                        {
                            var m = r.sharedMaterials;
                            for (int i = 0; i < m.Length; i++) m[i] = oma;
                            r.sharedMaterials = m;
                        }
                        if (rajat == null) rajat = r.bounds; else { var b = rajat.Value; b.Encapsulate(r.bounds); rajat = b; }
                    }
                    if (rajat != null) malliKoko = Mathf.Max(0.01f, Mathf.Max(rajat.Value.size.x, rajat.Value.size.z));
                    // Kiekot vasta koon jälkeen: ne ovat lapojen sisällä eivätkä saa koneen materiaalia.
                    malli.GetComponent<Potkurit>().Kiekot(kiekkoMateriaali);
                    if (!kerrosNakyy) foreach (var mr in malli.GetComponentsInChildren<Renderer>()) mr.enabled = false;
                    Debug.Log($"MATKAKIRJA nappula: kone {malli.GetComponentsInChildren<Renderer>().Length} osaa, koko {malliKoko:0.##} m, rajat {rajat?.size}");
                }
                if (malli != null) malli.SetActive(paalle);
                olio.SetActive(!paalle);
                if (!paalle) olio.SetActive(true);
                return;
            }
            float kerroin = PalloKierto.Pistekerroin;
            if (paalle && koneKuva == null) koneKuva = Kuva(koneVari, 64, 64, KoneMuoto);
            oma.SetTexture("_MainTex", paalle ? koneKuva : nappulaKuva);
            oma.SetFloat("_Koko", (paalle ? koneKoko : koko) * kerroin);
            oma.SetFloat("_Suhde", paalle ? 1f : 32f / 36f);
            oma.SetFloat("_Keskitys", paalle ? 0.5f : 0f);
            oma.SetFloat("_Kulma", 0f);
            olio.SetActive(true);
        }

        // ---- Käyrät (vanha autokyyti smootherstepillä; siirto käyttää nyt Siirtokoreografia.MatkanVaihe) ----

        public static double AutokyydinVaihe(double t)
        {
            // KAMERA-AJOT: smootherstep (ennen quad in/out, jonka kiihtyvyys hyppäsi keskellä).
            return PalloKierto.Smootherstep(t);
        }

        public static double MatkanVaihe(double t, int pisteita)
        {
            int n = math.max(1, pisteita);
            double x = AutokyydinVaihe(t);
            if (n < 2 || x <= 0 || x >= 1) return x;
            double k = 1 - MatkapisteenVauhti;
            double raaka = x * n;
            int i = math.min(n - 1, (int)math.floor(raaka));
            double u = raaka - i;
            return (i + (u - k / (2 * math.PI) * math.sin(2 * math.PI * u))) / n;
        }

        // ---- Toteutus ----

        void Pysayta()
        {
            lentoPohja = double.NaN;
            AloituslentoPerilla = false;
            aloitusAjossa = false;
            Mustaverho.Pois();
            if (liike != null) StopCoroutine(liike);
            liike = null;
            kesken = null;
            Nosta(0);
            PoistaLentokaari();
            if (Vaihe != LennonVaihe.Ei) Paatalento();
            else if (kierto != null) kierto.SeurantaLoppui();
            Kone(false);
        }

        /// <summary>
        /// Nappulan ja koneen pohjakorkeus ellipsoidista. Maassa (ei lentoa) <see cref="nosto"/> × korkeuskerroin: mikä
        /// oli kertoimella 1 maaston yllä, pysyy sen yllä (KorkeusKerroin.Sovita). Lennolla <see cref="lentoPohja"/>.
        /// </summary>
        double Pohja => double.IsNaN(lentoPohja) ? KorkeusKerroin.Sovita(nosto) : lentoPohja;
        /// <summary>Lennon pohjakorkeus (koneen kaari = pohja + huippu·sin(πp)); NaN = ei lentoa.</summary>
        double lentoPohja = double.NaN;
        /// <summary>Lähtö- ja laskusumu puolet nostosta koneen alle (ennen 1,0: nosto/2), korotetun pohjan mukana.</summary>
        double UsvanKorkeus => math.max(nosto * 0.5, Pohja - nosto * 0.5);

        /// <summary>
        /// KORKEUSKERROIN (löydös 29, build 10): kone ei saa lentää liioitellun maaston läpi. Lennon alussa (ennen
        /// zoomia) Cesiumilta kysytään maaston korkeus reitin niistä kohdista, joissa kaari on matala: 2 km:n välein
        /// (enintään 64 näytettä), kun huippu·sin(πp) &lt; Sovita(9000 m) + vara − nosto. Pitkällä reitillä se on
        /// noin 35–75 km kummastakin päästä, lyhyellä koko reitti. Pohja = max(nosto, max_i(Sovita(h_i) + vara − kaari_i)):
        /// vakio koko lennolle, joten kaaren muoto pysyy, ja alankolennot (Lontoo) pysyvät ennallaan 5 km:ssä.
        /// Tulos saapuu asynkronisesti: pohja nousee tavoitteeseen pehmeästi (aikavakio 0,6 s). Jos kysely epäonnistuu,
        /// pohja on Sovita(nosto) (kertoimen 1 turvallisuus skaalattuna). Näytteiden väliin jäävät huiput katetaan
        /// varalla (1 km).
        /// </summary>
        sealed class LennonPohja
        {
            const double Katto = 9000.0;
            readonly Nappula n;
            readonly double[] osuudet;
            readonly double huippu;
            System.Threading.Tasks.Task<CesiumSampleHeightResult> kysely;
            double tavoite, varma;

            public LennonPohja(Nappula n, double lat0, double lon0, double lat1, double lon1, double reittiM, double huippu)
            {
                this.n = n;
                this.huippu = huippu;
                // Kunnes tulos on saatu (tai jos kysely epäonnistuu): kertoimen 1 nosto skaalattuna.
                varma = KorkeusKerroin.Sovita(n.nosto);
                tavoite = varma;
                double raja = KorkeusKerroin.Sovita(Katto) + n.maastoVara - n.nosto;
                var o = new List<double>();
                int askelia = (int)math.clamp(math.ceil(reittiM / 2000.0), 1, 20000);
                for (int i = 0; i <= askelia; i++)
                {
                    double p = (double)i / askelia;
                    if (huippu * math.sin(math.PI * p) < raja) o.Add(p);
                }
                if (o.Count > 64)
                {
                    var harva = new List<double>();
                    for (int j = 0; j < 63; j++) harva.Add(o[(int)((long)j * o.Count / 63)]);
                    harva.Add(o[o.Count - 1]);
                    o = harva;
                }
                osuudet = o.ToArray();
                var pallo = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo
                    : UnityEngine.Object.FindAnyObjectByType<Cesium3DTileset>();
                // Ellipsoidipohjalla (maasto pois) ei ole liioiteltavaa: nosto riittää.
                if (pallo != null && pallo.tilesetSource != CesiumDataSource.FromUrl) { tavoite = n.nosto; return; }
                if (pallo == null || osuudet.Length == 0) return;
                var paikat = new double3[osuudet.Length];
                for (int i = 0; i < osuudet.Length; i++)
                {
                    var q = ReittiGeometria.Isoympyra(lat0, lon0, lat1, lon1, osuudet[i]);
                    paikat[i] = new double3(q.y, q.x, 0);
                }
                try { kysely = pallo.SampleHeightMostDetailed(paikat); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA nappula: reitin maastokysely kaatui: " + e.Message); }
            }

            /// <summary>
            /// Joka kehys lennon aikana: kyselyn tulos tavoitteeksi ja pohja pehmeästi kohti sitä (heti = zoomin aikana).
            /// </summary>
            public void Paivita(bool heti = false)
            {
                if (kysely != null && kysely.IsCompleted)
                {
                    var t = kysely;
                    kysely = null;
                    if (t.IsFaulted || t.IsCanceled || t.Result == null)
                        Debug.LogWarning("MATKAKIRJA nappula: reitin maastokysely epäonnistui, lennon pohja " + varma.ToString("0") + " m");
                    else
                    {
                        var r = t.Result;
                        double uusi = n.nosto, korkein = 0;
                        int ok = 0;
                        for (int i = 0; i < osuudet.Length; i++)
                        {
                            if (r.sampleSuccess == null || !r.sampleSuccess[i]) continue;
                            ok++;
                            double h = r.longitudeLatitudeHeightPositions[i].z;
                            korkein = math.max(korkein, h);
                            uusi = math.max(uusi, KorkeusKerroin.Sovita(h) + n.maastoVara - huippu * math.sin(math.PI * osuudet[i]));
                        }
                        // Puuttuva näyte voi olla huippu: silloin vähintään varma pohja.
                        tavoite = ok < osuudet.Length ? math.max(uusi, varma) : uusi;
                        Debug.Log($"MATKAKIRJA nappula: reitin maasto {ok}/{osuudet.Length} näytettä, korkein {korkein:0} m, " +
                                  $"kerroin {KorkeusKerroin.Arvo:0.##} → lennon pohja {tavoite:0} m");
                    }
                }
                if (double.IsNaN(n.lentoPohja)) n.lentoPohja = tavoite;
                double a = heti ? 1.0 : 1.0 - math.exp(-Time.unscaledDeltaTime / 0.6);
                n.lentoPohja += (tavoite - n.lentoPohja) * a;
            }
        }

        void Siirra(double lat, double lon, double h)
        {
            Lat = lat;
            Lon = lon;
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, Pohja + h));
            olio.transform.localPosition = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        void LateUpdate()
        {
            if (oma == null || georeferenssi == null) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            oma.SetVector("_Keskus", georeferenssi.transform.TransformPoint((float3)keskus));
        }

        void Tee()
        {
            if (olio != null) return;
            olio = new GameObject("Pelinappula");
            olio.transform.SetParent(georeferenssi.transform, false);
            var m = new Mesh { name = "Nappula" };
            m.vertices = new Vector3[4];
            m.uv = new[] { new Vector2(-1, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(-1, 1) };
            m.triangles = new[] { 0, 2, 1, 0, 3, 2 };
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 1e7f);
            olio.AddComponent<MeshFilter>().sharedMesh = m;
            var r = olio.AddComponent<MeshRenderer>();
            oma = new Material(materiaali);
            nappulaKuva = Kuva(vari, 64, 72, NappulaMuoto);
            oma.SetTexture("_MainTex", nappulaKuva);
            float kerroin = PalloKierto.Pistekerroin;
            oma.SetFloat("_Koko", koko * kerroin);
            r.sharedMaterial = oma;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            r.enabled = kerrosNakyy;
            olio.SetActive(false);
        }

        /// <summary>Sotilasnappula (pää, kaula, runko, jalusta): etäisyys muotoon (negatiivinen sisällä), 64×72 px, y = 0 alhaalla.</summary>
        static float NappulaMuoto(float x, float y)
        {
            float cx = x - 32f;
            float paa = new Vector2(cx, y - 55f).magnitude - 10.5f;
            float runkoLeveys = Mathf.Lerp(15f, 7f, Mathf.InverseLerp(10f, 46f, y));
            float runko = Mathf.Max(Mathf.Abs(cx) - runkoLeveys, Mathf.Max(10f - y, y - 47f));
            float jalka = new Vector2(cx / 24f, (y - 8f) / 6.5f).magnitude * 6.5f - 6.5f;
            return Mathf.Min(paa, Mathf.Min(runko, jalka));
        }

        /// <summary>Lentokone ylhäältä, nokka ylöspäin (runko, siivet, pyrstö), 64×64 px.</summary>
        static float KoneMuoto(float x, float y)
        {
            float cx = Mathf.Abs(x - 32f);
            float runko = Mathf.Max(cx - 4.5f, Mathf.Max(6f - y, y - 58f));
            float nokka = new Vector2(cx, y - 57f).magnitude - 4.5f;
            // Siivet: nuolimaiset, juuresta (y 40) kärkeen (y 30), paksuus 8 px.
            float siipiY = 40f - cx * 0.4f;
            float siipi = Mathf.Max(cx - 29f, Mathf.Abs(y - siipiY) - 4f);
            float pyrstoY = 12f - cx * 0.3f;
            float pyrsto = Mathf.Max(cx - 12f, Mathf.Abs(y - pyrstoY) - 3f);
            return Mathf.Min(Mathf.Min(runko, nokka), Mathf.Min(siipi, pyrsto));
        }

        /// <summary>Kuva etäisyysmuodosta tummalla ääriviivalla ja korostuksella.</summary>
        static Texture2D Kuva(Color vari, int L, int K, Func<float, float, float> Muoto)
        {
            var t = new Texture2D(L, K, TextureFormat.RGBA32, false) { name = "Nappula", wrapMode = TextureWrapMode.Clamp };
            var px = new Color32[L * K];
            var muste = new Color(0.16f, 0.11f, 0.07f, 1f);
            for (int y = 0; y < K; y++)
                for (int x = 0; x < L; x++)
                {
                    float d = Muoto(x + 0.5f, y + 0.5f);
                    float peitto = Mathf.Clamp01(0.5f - d);
                    if (peitto <= 0) { px[y * L + x] = new Color32(0, 0, 0, 0); continue; }
                    float reuna = Mathf.Clamp01(d + 2.5f);
                    // Korostus vasemmalta ylhäältä.
                    float valo = Mathf.Clamp01(0.5f - (x - L / 2f) / 40f + (y - K / 2f) / 90f) * 0.35f;
                    var c = Color.Lerp(Color.Lerp(vari, Color.white, valo), muste, reuna);
                    c.a = peitto;
                    px[y * L + x] = c;
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return t;
        }
    }
}
