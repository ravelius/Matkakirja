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
    /// Pelinappula kartalla ja sen liike (Fablen tarkastus B16; web js/pallolauta/siirto.js
    /// ja js/siirtokoreografia.js):
    ///   AUTOKYYTI (liftaus, laiva, bussi): koko matka yhdellä käyrällä, joka kiihdyttää
    ///   lähtiessä ja jarruttaa perillä (autokydinVaihe), ja jokaisella matkapisteellä vauhti
    ///   notkahtaa osuuteen 0,4 (matkanVaihe) — nappula kulkee pisteiden läpi eikä hypi.
    ///   LENTO: isoympyräkaari ylös ja alas samalla käyrällä.
    /// Kamera seuraa nappulaa, kun seuraaKamera on päällä (Pelikoodari: Matkalla-tila).
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
        /// Autokyyti matkapisteiden läpi (ensimmäinen = lähtö). valmis kutsutaan perillä;
        /// uusi Aja/Lenna/Aseta keskeyttää ilman valmis-kutsua.
        /// </summary>
        public void Aja(IList<(double lat, double lon)> matkapisteet, float kestoS, Action valmis)
        {
            if (matkapisteet == null || matkapisteet.Count == 0) { valmis?.Invoke(); return; }
            Pysayta();
            Tee();
            olio.SetActive(true);
            var pisteet = new List<(double lat, double lon)>(matkapisteet);
            if (pisteet.Count == 1) { Siirra(pisteet[0].lat, pisteet[0].lon, 0); valmis?.Invoke(); return; }
            liike = StartCoroutine(Kulje(kestoS, valmis, t =>
            {
                double p = MatkanVaihe(t, pisteet.Count - 1);
                double raaka = p * (pisteet.Count - 1);
                int i = math.min(pisteet.Count - 2, (int)math.floor(raaka));
                var a = pisteet[i];
                var b = pisteet[i + 1];
                var q = ReittiGeometria.Isoympyra(a.lat, a.lon, b.lat, b.lon, raaka - i);
                return (q.x, q.y, 0.0);
            }));
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
            liike = StartCoroutine(Lento(lat0, lon0, lat1, lon1, math.max(0.5f, kestoS), 0f, null, valmis));
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
            liike = StartCoroutine(Lento(lahtoLat, lahtoLon, lat, lon, math.max(1f, kestoS), lahtoZoomS, lahti, valmis));
        }

        /// <summary>Lennon vaihe (LENNON ESITYS): Pelikoodari ajoittaa äänet ja luennan, UI tekstit.</summary>
        public LennonVaihe Vaihe { get; private set; }
        public event Action<LennonVaihe> VaiheVaihtui;

        void AsetaVaihe(LennonVaihe v)
        {
            if (Vaihe == v) return;
            Vaihe = v;
            VaiheVaihtui?.Invoke(v);
        }

        IEnumerator Lento(double lat0, double lon0, double lat1, double lon1, float kesto, float zoomS, Action lahti, Action valmis)
        {
            kesken = valmis;
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
            if (usva != null)
            {
                usva.Aseta(lat0, lon0, UsvanKorkeus, 0f);
                usva.Tavoite(1f, math.max(0.8f, zoomS));
            }
            bool pintaVaihdettu = false, laskuSumu = false, kohdeKirjattu = false;
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
                koneMinimi = LennonAikajana.KoneenMinimi(t, jako);
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
                if (usva != null && !laskuSumu && t > laskuSumuun)
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
            Paatalento();
            valmis?.Invoke();
        }

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

        void Paatalento()
        {
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

        // ---- Käyrät (web js/siirtokoreografia.js) ----

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

        IEnumerator Kulje(float kestoS, Action valmis, Func<double, (double lat, double lon, double h)> paikka)
        {
            kesken = valmis;
            float alku = Time.unscaledTime;
            float kesto = math.max(0.05f, kestoS);
            while (true)
            {
                double t = math.saturate((Time.unscaledTime - alku) / kesto);
                var (lat, lon, h) = paikka(t);
                Siirra(lat, lon, h);
                if (seuraaKamera && kierto != null) kierto.Seuraa(lat, lon);
                if (t >= 1) break;
                yield return null;
            }
            liike = null;
            kesken = null;
            if (kierto != null) kierto.SeurantaLoppui();
            valmis?.Invoke();
        }

        void Pysayta()
        {
            lentoPohja = double.NaN;
            if (liike != null) StopCoroutine(liike);
            liike = null;
            kesken = null;
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
