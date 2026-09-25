// PUHE: isoisän luennat ja kertojaäänet natiivissa (Pelikoodari, 23.9.2026).
//
// Yksi puhuja kerrallaan kuten webin js/luenta.js: uusi puhe häivyttää
// edellisen, pysäytys häivyttää 1,5 s (LUENNAN_HAIPYMA_S). Äänitteet ovat
// ämpärissä (https-osoitteet sisältöpaketin kokoelmista, esim.
// saapumispuheet.data.url); ne ladataan kerran välimuistiin
// persistentDataPath/aani/<sha256(url)>.mp3 ja soitetaan sieltä, joten sama
// luenta toimii toisella kerralla ilman verkkoa.
//
// Kytkin ja taso: Natiivi-UI:n Asetukset (UI/Asetukset.cs, webin avaimet):
// Kytkin.Kertoja (web kertojaTila), Voima.Lukija (oletus 0,9, web puheVoima) ja
// Kytkin.Aanimaisema (koko pelin mykistys). Asetukset.Muuttui päivittää soivan.
// Puhuu-tapahtuma (tosi alkaessa, epätosi loppuessa) on musiikin ja
// ambienssin vaimennusta varten (web puheAlkoi/puheLoppui).
//
// PUHESYNTEESI (Lue): muut tekstit luetaan pollo-workerin puheella kuten
// webissä (js/puhe.js haePala: POST {tehtava:'puhe', teksti, persoona}).
// Natiivi tunnistautuu otsakkeella x-matkakirja-natiivi = bundle id ja samalla
// tunnisteella User-Agentissa (verkkopelin PR #2956, Fablen päätös 23.9.2026).
// Äänitetyt luennat ovat ensisijaisia; synteesi on välimuistissa kuten äänitteet.
//
// LUKIJAÄÄNI (Kehittäjälehden Lukijaääni-dialogi, web js/main.js avaaLukijaaani, 24.9.2026):
// persoonat, oletukset, säädöt ja pyynnön runko ovat puhtaassa luokassa Peli/Lukijaaani.cs
// (kultainen jälki), säilönä PlayerPrefs webin localStorage-avaimin. Staattiset apurit alla
// (Persoonat, Oletus, Aanivaihtoehdot, Asetus/AsetaAsetus/PoistaAsetus, Nopeus, Voima) ja Nayte.
//   - Ääni ja ohje kulkevat pyynnössä kuten webissä (haePala); worker tottelee niitä vain
//     kehittäjäkoodilla (x-pollo-kehittaja; koodi vain Keychainissa, Asetukset.PolloKoodi).
//   - Nopeus (oletus 1,15) toteutuu GENEROINNISSA kuten webissä (OpenAI speed, worker `nopeus`),
//     ei toistossa: AudioSource.pitch pysyy 1:ssä, joten sävelkorkeus ei muutu.
//   - Voima (oletus 2,0) on synteesin vahvistus ennen kompressoria (PuheVahvistin, web GainNode +
//     DynamicsCompressor): taso = Voima × Lukija-liuku / 0,9. Äänitteet soivat Lukija-tasolla
//     kuten webin luenta.js (ei vahvistinta).
//   - Välimuistiavain = webin haePala-avain (persoona|ääni|ohje|nopeus|teksti) ja luennat
//     pyytävät workerin säilölohkon (persoona, pöllöllä ei) kuten web lueAaneen.
//
// iOS: äänettömyyskytkin mykistäisi Unityn oletusistunnon (Ambient). Web
// Safarissa media soi kytkimestä huolimatta, joten natiivi asettaa istunnon
// Playback + MixWithOthers (Plugins/iOS/MatkakirjaAani.mm) ensimmäisellä
// puheella.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
#if UNITY_IOS && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class Puhe : MonoBehaviour
    {
        public const string Puhepalvelin = Lukijaaani.Palvelin;
        /// <summary>Workerin PUHE_TEKSTIN_KATTO (tools/pollo/rajat.js).</summary>
        public const int TekstinKatto = 1000;
        /// <summary>Luennan loppuhäivytys (web LUENNAN_HAIPYMA_S).</summary>
        public const float Haivytys = 1.5f;
        /// <summary>Uuden puheen alkuhäivytys (web: kertoja alkaa pehmeästi).</summary>
        public const float Alkuhaivytys = 0.15f;

        public static Puhe Instanssi { get; private set; }

        /// <summary>Puhe alkoi (tosi) tai loppui/pysähtyi (epätosi): musiikin vaimennus.</summary>
        public event Action<bool> Puhuu;

        /// <summary>Puheen taso: Voima.Lukija, nolla kun äänet on mykistetty (Kytkin.Aanimaisema).</summary>
        public static float Voimakkuus => Asetukset.Paalla(Kytkin.Aanimaisema) ? Asetukset.Taso(global::Matkakirja.Natiivi.Voima.Lukija) : 0f;

        // --- lukijaääni (Kehittäjälehden dialogi; web js/puhe.js + main.js) --------------------------

        static Lukijaaani saadot;

        /// <summary>Lukijaäänen säädöt PlayerPrefsissä (webin localStorage-avaimet).</summary>
        public static Lukijaaani Saadot
        {
            get
            {
                if (saadot != null) return saadot;
                saadot = new Lukijaaani(
                    k => PlayerPrefs.HasKey(k) ? PlayerPrefs.GetString(k, null) : null,
                    (k, v) => { PlayerPrefs.SetString(k, v); PlayerPrefs.Save(); },
                    k => { PlayerPrefs.DeleteKey(k); PlayerPrefs.Save(); });
                // Kehittäjäkoodi vain Keychainista (Asetukset.PolloKoodi); vanhat PlayerPrefs-kopiot pois.
                saadot.Koodilahde = () => Asetukset.PolloKoodi;
                saadot.PoistaVanhatKoodit();
                saadot.Muuttui += () =>
                {
                    if (Instanssi != null) Instanssi.PaivitaVahvistus();
                    try { LukijaaaniMuuttui?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
                };
                return saadot;
            }
        }

        /// <summary>Jokin lukijaäänen säätö muuttui (asetus, nopeus tai voima).</summary>
        public static event Action LukijaaaniMuuttui;

        /// <summary>Dialogin lukijat: (merkinnat, "Matkakirja — merkinnät"), (kertoja, "Lehdet ja sivut"), (pollo, "Livia").</summary>
        public static IReadOnlyList<(string Persoona, string Nimi)> Persoonat => Lukijaaani.Persoonat;

        /// <summary>Workerin oletusääni ja -ohje (näytetään dialogissa "(pelin oletus: …)" ja paikkamerkkinä).</summary>
        public static (string Aani, string Ohje) Oletus(string persoona) => Lukijaaani.Oletus(persoona);

        /// <summary>Äänivalikon vaihtoehdot (tyhjä valinta = pelin oletus).</summary>
        public static IReadOnlyList<string> Aanivaihtoehdot => Lukijaaani.Aanivaihtoehdot;

        /// <summary>Dialogin kentät: Aani null = pelin oletus, Ohje null = tyhjä kenttä.</summary>
        public static (string Aani, string Ohje) Asetus(string persoona) => Saadot.Asetus(persoona);

        /// <summary>Tallentaa heti (web tallennaPuheKentat): aani null/"" = oletus, ohje trimmataan.</summary>
        public static void AsetaAsetus(string persoona, string aani, string ohje) => Saadot.AsetaAsetus(persoona, aani, ohje);

        /// <summary>"Palauta oletus": persoonan säädöt pois.</summary>
        public static void PoistaAsetus(string persoona) => Saadot.PoistaAsetus(persoona);

        public const float NopeusMin = (float)Lukijaaani.NopeusMin, NopeusMax = (float)Lukijaaani.NopeusMax;
        public const float VoimaMin = (float)Lukijaaani.VoimaMin, VoimaMax = (float)Lukijaaani.VoimaMax;
        /// <summary>Liukujen askel (index.html step 0.05).</summary>
        public const float SaatoAskel = 0.05f;

        /// <summary>Lukunopeus 0,6–1,6 (oletus 1,15). Asetus rajaa ja tallentaa; vaikuttaa seuraavasta generoinnista.</summary>
        public static float Nopeus
        {
            get => (float)Saadot.Nopeus;
            set => Saadot.AsetaNopeus(Tarkka(value));
        }

        /// <summary>Lukijaäänen voima 0,25–2,5 (oletus 2,0). Asetus rajaa, tallentaa ja vaikuttaa heti soivaan.</summary>
        public static float Voima
        {
            get => (float)Saadot.Voima;
            set => Saadot.AsetaVoima(Tarkka(value));
        }

        /// <summary>Liu'un float → webin desimaaliluku (1,15f → 1.15, ei 1.1499999761581421).</summary>
        static double Tarkka(float x) =>
            float.IsNaN(x) || float.IsInfinity(x) ? double.NaN
            : double.Parse(x.ToString("R", System.Globalization.CultureInfo.InvariantCulture), System.Globalization.CultureInfo.InvariantCulture);

        /// <summary>
        /// Kehittäjätilan pääkoodi talteen (web talletaPolloKoodi): kutsu koodilla, kun kehittäjätila
        /// kytketään pääkoodilla, ja null, kun tila kytketään pois tai koodi on rajattu.
        /// </summary>
        /// <summary>
        /// Vanha kutsu (Asetukset.AsetaKehittaja): koodi on nyt vain Keychainissa (Asetukset.PolloKoodi), joten tämä
        /// vain siivoaa mahdolliset vanhat PlayerPrefs-kopiot. Ei tallenna mitään.
        /// </summary>
        public static void TalletaKehittajakoodi(string koodi) => Saadot.PoistaVanhatKoodit();

        /// <summary>Synteesin toistotaso (web lukijanTaso) ilman mykistystä.</summary>
        public static float LukijanTaso => (float)Saadot.LukijanTaso(Asetukset.Taso(global::Matkakirja.Natiivi.Voima.Lukija));

        AudioSource lahde;
        PuheVahvistin vahvistin;
        Coroutine lataus, haivytys;
        int tunnus;
        Action loppu;
        bool puhuu;
        bool synteesi; // soiva klippi on puhesynteesiä (vahvistin + kompressori), muuten äänite

        /// <summary>Soiva (tai ladattava) äänite, null = hiljaa.</summary>
        public string SoivaUrl { get; private set; }
        public bool Soi => puhuu;
        /// <summary>Soivan synteesin persoona (merkinnat | kertoja | pollo), äänitteellä null.</summary>
        public string SoivaPersoona { get; private set; }
        /// <summary>
        /// Pulun chat-vastaus soi (persoona pollo): pulu puhuu itse eikä kertoja (löydös 66 kohta 7,
        /// web lukija → ilmoitaLivianKasvopuhe): nokka liikkuu, eikä tämä vaienna pulua kertojana.
        /// </summary>
        public bool PuluaaniSoi => puhuu && SoivaPersoona == "pollo";
        public float Aika => lahde != null && lahde.clip != null ? lahde.time : 0;
        public float Kesto => lahde != null && lahde.clip != null ? lahde.clip.length : 0;
        public string ViimeVirhe { get; private set; }

        /// <summary>Kertoja päällä (Asetukset Kytkin.Kertoja, web kertojaTila). Pois kytkeminen pysäyttää soivan.</summary>
        public static bool Paalla
        {
            get => Asetukset.Paalla(Kytkin.Kertoja);
            set => Asetukset.Aseta(Kytkin.Kertoja, value);
        }

        void AsetuksetMuuttuivat(string nimi)
        {
            PaivitaVahvistus();
            if (!Paalla && (puhuu || lataus != null)) { Pysayta(0.3f); return; }
            if (lahde != null && lahde.isPlaying && haivytys == null) lahde.volume = Kohdetaso;
        }

        /// <summary>
        /// AudioSource.volume soivalle: äänite = Voimakkuus (Lukija-taso), synteesi = 1 (taso on
        /// vahvistimessa, jotta se saa ylittää ykkösen). Mykistettynä kumpikin 0.
        /// </summary>
        float Kohdetaso => synteesi ? (Asetukset.Paalla(Kytkin.Aanimaisema) ? 1f : 0f) : Voimakkuus;

        void PaivitaVahvistus()
        {
            if (vahvistin == null) return;
            vahvistin.Kaytossa = synteesi;
            vahvistin.Vahvistus = synteesi ? LukijanTaso : 1f;
        }

        static string Kansio => Path.Combine(Application.persistentDataPath, "aani");

        public static Puhe Hae()
        {
            if (Instanssi != null) return Instanssi;
            var go = new GameObject("MatkakirjaPuhe");
            DontDestroyOnLoad(go);
            return go.AddComponent<Puhe>();
        }

        void Awake()
        {
            if (Instanssi != null && Instanssi != this) { Destroy(gameObject); return; }
            Instanssi = this;
            lahde = gameObject.AddComponent<AudioSource>();
            lahde.playOnAwake = false;
            lahde.loop = false;
            lahde.spatialBlend = 0;
            lahde.priority = 0;
            // Suodatin AudioSourcen perään samassa GameObjectissa (web: GainNode + kompressori).
            vahvistin = gameObject.AddComponent<PuheVahvistin>();
            Asetukset.Muuttui += AsetuksetMuuttuivat;
        }

        void OnDestroy()
        {
            Asetukset.Muuttui -= AsetuksetMuuttuivat;
            if (Instanssi == this) Instanssi = null;
        }

        /// <summary>
        /// Soittaa äänitteen (https). viiveS odotetaan latauksen rinnalla;
        /// loppu kutsutaan, kun äänite soi loppuun (ei, jos se pysäytetään tai
        /// korvataan). Palauttaa false, jos luennat on kytketty pois tai url puuttuu.
        /// </summary>
        public bool Soita(string url, float viiveS = 0, Action loppu = null)
        {
            if (!Paalla || string.IsNullOrEmpty(url)) return false;
            AsetaIstunto();
            int oma = ++tunnus;
            if (lataus != null) StopCoroutine(lataus);
            if (lahde.isPlaying) Haivyta(Alkuhaivytys, false);
            this.loppu = loppu;
            SoivaUrl = url;
            SoivaPersoona = null;
            ViimeVirhe = null;
            lataus = StartCoroutine(LataaJaSoita(url, () => new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET), viiveS, oma, false, true));
            return true;
        }

        /// <summary>
        /// Lukee tekstin puhesynteesillä (persoona: merkinnat | kertoja | pollo, web PUHE_PERSOONAT;
        /// muu lukee kertojan äänellä). Lukijaäänen säädöt (ääni, ohje, nopeus) kulkevat pyynnössä ja
        /// voima vahvistimessa. Muuten kuten Soita. Liian pitkä teksti katkaistaan virkkeen rajalta
        /// workerin kattoon.
        /// </summary>
        public bool Lue(string teksti, string persoona = "merkinnat", float viiveS = 0, Action loppu = null)
        {
            if (!Paalla) return false;
            return Syntetisoi(teksti, persoona, Lukijaaani.OletusLohko(persoona), true, viiveS, loppu);
        }

        /// <summary>
        /// Kuuntele näyte (web #puhe-nayte): persoonan näyteteksti (PUHE_NAYTTEET) nykyisillä
        /// säädöillä, ilman säilöä: ei välimuistia laitteelle eikä lohkoa workerille. Kutsu
        /// AsetaAsetus ensin, jos kentissä on tallentamaton muutos (web tallentaa ennen näytettä).
        /// Soi Kertoja-kytkimestä riippumatta kuten webissä; mykistetty peli ei soita. Pysäytä
        /// dialogin sulkeutuessa Pysayta()-kutsulla (web pysaytaLukija).
        /// </summary>
        public bool Nayte(string persoona)
        {
            if (!Asetukset.Paalla(Kytkin.Aanimaisema)) return false;
            return Syntetisoi(Lukijaaani.NayteTeksti(persoona), persoona, null, false, 0, null);
        }

        bool Syntetisoi(string teksti, string persoona, string lohko, bool sailo, float viiveS, Action loppu)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return false;
            persoona ??= "kertoja";
            teksti = Katkaise(Lukijaaani.JsTrim(teksti), TekstinKatto);
            AsetaIstunto();
            int oma = ++tunnus;
            if (lataus != null) StopCoroutine(lataus);
            if (lahde.isPlaying) Haivyta(Alkuhaivytys, false);
            this.loppu = loppu;
            SoivaUrl = "puhe:" + persoona + ":" + teksti;
            SoivaPersoona = persoona;
            ViimeVirhe = null;
            var (runko, koodi) = Saadot.Pyynto(teksti, persoona, lohko);
            string avain = Saadot.Valimuistiavain(persoona, teksti);
            lataus = StartCoroutine(LataaJaSoita(avain, () =>
            {
                var r = new UnityWebRequest(Puhepalvelin, UnityWebRequest.kHttpVerbPOST)
                {
                    uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                };
                r.SetRequestHeader("Content-Type", "application/json");
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                if (koodi != null) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
                return r;
            }, viiveS, oma, true, sailo));
            return true;
        }

        /// <summary>Katkaisee tekstin viimeiseen virkkeen loppuun ennen kattoa (tai kattoon).</summary>
        public static string Katkaise(string teksti, int katto)
        {
            if (teksti.Length <= katto) return teksti;
            int raja = Math.Max(teksti.LastIndexOf(". ", katto, StringComparison.Ordinal),
                Math.Max(teksti.LastIndexOf("! ", katto, StringComparison.Ordinal), teksti.LastIndexOf("? ", katto, StringComparison.Ordinal)));
            return raja > katto / 3 ? teksti.Substring(0, raja + 1) : teksti.Substring(0, katto);
        }

        /// <summary>Pysäyttää häivyttäen (web haivytaAani); loppu-kutsua ei tehdä.</summary>
        public void Pysayta(float haivytysS = Haivytys)
        {
            tunnus++;
            loppu = null;
            if (lataus != null) { StopCoroutine(lataus); lataus = null; }
            SoivaUrl = null;
            if (lahde.isPlaying) Haivyta(haivytysS, true);
            else AsetaPuhuu(false);
        }

        /// <param name="url">välimuistiavain: äänitteen osoite tai synteesin Lukijaaani.Valimuistiavain</param>
        /// <param name="synteesi">klippi soi vahvistimen ja kompressorin läpi (web lukijan piiri)</param>
        /// <param name="sailo">false = näyte: ladataan väliaikaiseen tiedostoon, joka poistetaan heti</param>
        /// <summary>Esiladattavat äänitteet (url), joiden lataus on kesken: Soita odottaa niitä eikä lataa rinnalla.</summary>
        static readonly HashSet<string> esiladataan = new HashSet<string>();

        /// <summary>
        /// Lataa äänitteen levyvälimuistiin soittamatta (löydös 118: intro-puhe portin aikana, jotta luenta alkaa
        /// Aloita seikkailu -painalluksesta heti). Ei tee mitään, jos tiedosto on jo välimuistissa tai latauksessa.
        /// </summary>
        public void Esilataa(string url)
        {
            if (string.IsNullOrEmpty(url) || esiladataan.Contains(url)) return;
            if (Mukana.Polku(url) != null) { Debug.Log($"MATKAKIRJA puhe: esiladattu {Path.GetFileName(url.Split('?')[0])} (buildissa)"); return; }
            string tiedosto = Path.Combine(Kansio, Tiiviste(url) + Paate(url));
            if (File.Exists(tiedosto)) { Debug.Log($"MATKAKIRJA puhe: esiladattu {Path.GetFileName(url.Split('?')[0])} (välimuistissa)"); return; }
            StartCoroutine(EsilataaTiedosto(url, tiedosto));
        }

        IEnumerator EsilataaTiedosto(string url, string tiedosto)
        {
            esiladataan.Add(url);
            Directory.CreateDirectory(Kansio);
            string valiaikainen = tiedosto + ".esilataus";
            bool ok = false;
            // Seuraavan ruudun esilataus (Esilataaja: näkyvä ohittaa).
            yield return Esilataaja.Hae(() => new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET)
            {
                downloadHandler = new DownloadHandlerFile(valiaikainen) { removeFileOnAbort = true },
                timeout = 60,
            }, Taso.SeuraavaRuutu, "puhe", r => ok = r.result == UnityWebRequest.Result.Success);
            try
            {
                if (ok && !File.Exists(tiedosto)) File.Move(valiaikainen, tiedosto);
                else if (File.Exists(valiaikainen)) File.Delete(valiaikainen);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA puhe: esilataus: " + e.Message); }
            Debug.Log($"MATKAKIRJA puhe: esiladattu {Path.GetFileName(url.Split('?')[0])} {(ok ? "ok" : "EPÄONNISTUI")}");
            esiladataan.Remove(url);
        }

        IEnumerator LataaJaSoita(string url, Func<UnityWebRequest> pyynto, float viiveS, int oma, bool synteesi, bool sailo)
        {
            float alku = Time.unscaledTime;
            // Buildiin mukana (Mukana, löydös 118: avausluenta ilman verkkoa) → suoraan sieltä.
            string mukana = sailo && !synteesi ? Mukana.Polku(url) : null;
            bool valimuistista = mukana != null || (sailo && File.Exists(Path.Combine(Kansio, Tiiviste(url) + (synteesi ? ".mp3" : Paate(url)))));
            if (sailo) VerkkoOdotus.Osuma("puhe", valimuistista);
            string kansio = sailo ? Kansio : Application.temporaryCachePath;
            string tiedosto = mukana ?? (sailo ? Path.Combine(Kansio, Tiiviste(url) + (synteesi ? ".mp3" : Paate(url)))
                : Path.Combine(kansio, "puhenayte-" + oma + ".mp3"));
            // Esilataus kesken (Esilataa): odotetaan sitä, ettei samaa tiedostoa ladata kahdesti rinnakkain.
            while (sailo && esiladataan.Contains(url)) yield return null;
            if (oma != tunnus) yield break;
            if (!sailo || !File.Exists(tiedosto))
            {
                Directory.CreateDirectory(kansio);
                string valiaikainen = tiedosto + ".lataus";
                // Verkko-odotus: ääni alkaa vasta latauksen jälkeen (välimuistista heti). Kirjataan valmiina (Kirjaa), koska
                // uusi puhe voi pysäyttää tämän coroutinen kesken latauksen.
                string vaihe = VerkkoOdotus.Vaihe, virhe = null;
                float odotusAlku = Time.realtimeSinceStartup;
                bool ok = false;
                yield return Esilataaja.Hae(() =>
                {
                    var r = pyynto();
                    r.downloadHandler = new DownloadHandlerFile(valiaikainen) { removeFileOnAbort = true };
                    r.timeout = 60;
                    return r;
                }, Taso.Nakyva, "puhe", r => { ok = r.result == UnityWebRequest.Result.Success; virhe = r.error; });
                VerkkoOdotus.Kirjaa(vaihe, "puhe:" + Path.GetFileName(url.Split('?')[0]), (Time.realtimeSinceStartup - odotusAlku) * 1000.0, 1, ok ? null : "virhe");
                if (oma != tunnus) yield break;
                if (!ok)
                {
                    ViimeVirhe = virhe;
                    Debug.LogWarning($"MATKAKIRJA puhe: {url} ei latautunut: {virhe}");
                    LatausPetti();
                    yield break;
                }
                try { if (File.Exists(tiedosto)) File.Delete(tiedosto); File.Move(valiaikainen, tiedosto); }
                catch (Exception e) { ViimeVirhe = e.Message; Debug.LogWarning("MATKAKIRJA puhe: välimuisti: " + e.Message); LatausPetti(); yield break; }
            }

            AudioClip klippi;
            using (var r = UnityWebRequestMultimedia.GetAudioClip("file://" + tiedosto, TyyppiPaatteesta(tiedosto)))
            {
                // Pakattuna muistiin: ei koko luennan purkua pääsäikeessä (LoadFMODSound-piikki).
                ((DownloadHandlerAudioClip)r.downloadHandler).compressed = true;
                yield return r.SendWebRequest();
                if (oma != tunnus) yield break;
                if (r.result != UnityWebRequest.Result.Success)
                {
                    ViimeVirhe = r.error;
                    Debug.LogWarning($"MATKAKIRJA puhe: {tiedosto} ei avautunut: {r.error}");
                    try { File.Delete(tiedosto); } catch { }
                    LatausPetti();
                    yield break;
                }
                klippi = DownloadHandlerAudioClip.GetContent(r);
            }
            // Näyte ei jää laitteelle (web: sailio null). Pakattu klippi on jo muistissa.
            if (!sailo) { try { File.Delete(tiedosto); } catch { } }
            float jaljella = viiveS - (Time.unscaledTime - alku);
            if (jaljella > 0) yield return new WaitForSecondsRealtime(jaljella);
            if (oma != tunnus) { Destroy(klippi); yield break; }

            if (haivytys != null) { StopCoroutine(haivytys); haivytys = null; }
            var vanha = lahde.clip;
            lahde.Stop();
            lahde.clip = klippi;
            lahde.volume = 0;
            lahde.pitch = 1f; // nopeus on generoinnissa (web: ei playbackRatea)
            this.synteesi = synteesi;
            PaivitaVahvistus();
            vahvistin.Nollaa();
            lahde.Play();
            // Viive pyynnöstä ääneen (löydös 118: intron pitää alkaa painalluksesta heti).
            Debug.Log($"MATKAKIRJA puhe: alkoi {(Time.unscaledTime - alku) * 1000:0} ms pyynnöstä ({(valimuistista ? "välimuisti" : "verkko")}) "
                      + Path.GetFileName(url.Split('?')[0]) + (mukana != null ? " [buildissa]" : ""));
            if (vanha != null && vanha != klippi) Destroy(vanha);
            // Uusi puhe korvasi soivan: kuuntelijat näkevät lopun ja uuden alun.
            if (puhuu) AsetaPuhuu(false);
            AsetaPuhuu(true);
            lataus = null;
            haivytys = StartCoroutine(Voimakkuuteen(Kohdetaso, Alkuhaivytys, false));

            // Loppu: äänite soi loppuun (ei pysäytetty eikä korvattu).
            while (oma == tunnus && lahde.isPlaying) yield return null;
            if (oma != tunnus) yield break;
            SoivaUrl = null;
            AsetaPuhuu(false);
            var l = loppu;
            loppu = null;
            l?.Invoke();
        }

        /// <summary>
        /// Uuden puheen lataus tai avaus epäonnistui (esim. TTS 403): korvattu puhe häipyy jo (Haivyta ilman
        /// pysäytystä jätti puhuu-tilan päälle), joten puhe loppuu tähän. Muuten Soi jäisi todeksi
        /// (Natiivi-UI: matkakirjakortti jäi lapuksi, 24.9.2026).
        /// </summary>
        void LatausPetti()
        {
            lataus = null;
            SoivaUrl = null;
            AsetaPuhuu(false);
        }

        void Haivyta(float kesto, bool pysayta)
        {
            if (haivytys != null) StopCoroutine(haivytys);
            haivytys = StartCoroutine(Voimakkuuteen(0, kesto, true));
            if (pysayta) AsetaPuhuu(false);
        }

        IEnumerator Voimakkuuteen(float kohde, float kesto, bool lopuksiSeis)
        {
            float alku = lahde.volume, t = 0;
            while (t < kesto)
            {
                t += Time.unscaledDeltaTime;
                float x = Mathf.Clamp01(t / Mathf.Max(0.001f, kesto));
                // Loppuhäivytys alkaa loivasti (viimeinen sana ei huku), alku nopeasti.
                float k = lopuksiSeis ? 1 - (1 - x) * (1 - x) : x;
                lahde.volume = Mathf.Lerp(alku, kohde, k);
                yield return null;
            }
            lahde.volume = kohde;
            if (lopuksiSeis) lahde.Stop();
            haivytys = null;
        }

        void AsetaPuhuu(bool nyt)
        {
            if (puhuu == nyt) return;
            puhuu = nyt;
            try { Puhuu?.Invoke(nyt); }
            catch (Exception e) { Debug.LogException(e); }
        }

        void Update()
        {
            if (puhuu && haivytys == null && lahde.isPlaying)
            {
                float kohde = Kohdetaso;
                if (!Mathf.Approximately(lahde.volume, kohde)) lahde.volume = kohde;
            }
        }

        // --- apurit ------------------------------------------------------------

        static string Tiiviste(string s)
        {
            using var sha = SHA256.Create();
            var b = sha.ComputeHash(Encoding.UTF8.GetBytes(s));
            var sb = new StringBuilder(64);
            foreach (var x in b) sb.Append(x.ToString("x2"));
            return sb.ToString();
        }

        static string Paate(string url)
        {
            var polku = url.Split('?', '#')[0];
            var p = Path.GetExtension(polku).ToLowerInvariant();
            return p == ".mp3" || p == ".m4a" || p == ".ogg" || p == ".wav" ? p : ".mp3";
        }

        static AudioType TyyppiPaatteesta(string tiedosto)
        {
            switch (Path.GetExtension(tiedosto).ToLowerInvariant())
            {
                case ".m4a": return AudioType.AUDIOQUEUE;
                case ".ogg": return AudioType.OGGVORBIS;
                case ".wav": return AudioType.WAV;
                default: return AudioType.MPEG;
            }
        }

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaAani_Toisto();
        static bool istuntoAsetettu;
        static void AsetaIstunto()
        {
            if (istuntoAsetettu) return;
            istuntoAsetettu = true;
            try { MatkakirjaAani_Toisto(); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA puhe: ääni-istunto: " + e.Message); }
        }
#else
        static void AsetaIstunto() { }
#endif
    }
}
