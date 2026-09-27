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
        /// <summary>Workerin PUHE_TEKSTIN_KATTO (tools/pollo/rajat.js; 1000 → 2500 web PR #3368, omistaja 27.9.2026).</summary>
        public const int TekstinKatto = 2500;
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

        /// <summary>
        /// PULUN PUHE ILMAN ÄÄNIKYTKIMIÄ (omistaja 27.9.2026 klo 09.2x, sitova; web js/lukija.js pulunPuhe): persoonan
        /// pollo puhetta ohjaa vain Pulun kaiutinvipu (PuluChat.AaniPaalla). Kertoja-kytkin ja pelin mykistys
        /// (Kytkin.Aanimaisema) eivät estä, hiljennä eivätkä katkaise sitä.
        /// </summary>
        public static bool PulunPuhe(string persoona) => persoona == "pollo";

        void AsetuksetMuuttuivat(string nimi)
        {
            PaivitaVahvistus();
            if (!Paalla && (puhuu || lataus != null) && !PulunPuhe(SoivaPersoona)) { Pysayta(0.3f); return; }
            if (lahde != null && lahde.isPlaying && haivytys == null) lahde.volume = Kohdetaso;
        }

        /// <summary>
        /// AudioSource.volume soivalle: äänite = Voimakkuus (Lukija-taso), synteesi = 1 (taso on
        /// vahvistimessa, jotta se saa ylittää ykkösen). Mykistettynä kumpikin 0.
        /// </summary>
        float Kohdetaso => synteesi ? (Asetukset.Paalla(Kytkin.Aanimaisema) || PulunPuhe(SoivaPersoona) ? 1f : 0f) : Voimakkuus;

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
            if (!Paalla && !PulunPuhe(persoona)) return false;
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
            lataus = StartCoroutine(LataaJaSoita(avain, () => SynteesiPyynto(runko, koodi), viiveS, oma, true, sailo));
            return true;
        }

        static UnityWebRequest SynteesiPyynto(string runko, string koodi)
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
        }

        /// <summary>
        /// PUTKITUS (omistaja 27.9.2026 klo 01.5x: "todella pitkä tauko otsikon ja kappaleiden väliin"): hakee luennan
        /// palan levyvälimuistiin soittamatta, jotta seuraava Lue(sama teksti, sama persoona) alkaa heti. Kutsu
        /// seuraaville 1–2 palalle, kun edellinen alkaa soida (web js/puhe.js aikatauluta hakee +1 ja +2). Ilman tätä
        /// pala haettiin vasta edellisen loputtua ja väliin jäi koko generointi (~5 s / 330 mrk, mitattu 27.9.).
        /// Sama avain ja tiedosto kuin Luessa; kesken oleva esihaku ei lataudu kahdesti (Lue odottaa sitä).
        /// </summary>
        public void Esihae(string teksti, string persoona = "kertoja")
        {
            if ((!Paalla && !PulunPuhe(persoona)) || string.IsNullOrWhiteSpace(teksti)) return;
            persoona ??= "kertoja";
            teksti = Katkaise(Lukijaaani.JsTrim(teksti), TekstinKatto);
            string avain = Saadot.Valimuistiavain(persoona, teksti);
            if (esiladataan.Contains(avain)) return;
            string tiedosto = Path.Combine(Kansio, Tiiviste(avain) + ".mp3");
            if (File.Exists(tiedosto)) return;
            var (runko, koodi) = Saadot.Pyynto(teksti, persoona, Lukijaaani.OletusLohko(persoona));
            StartCoroutine(EsilataaTiedosto(avain, tiedosto, Taso.SeuraavaRuutu, () => SynteesiPyynto(runko, koodi), "esihaettu pala"));
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
        public void Esilataa(string url, Taso taso = Taso.SeuraavaRuutu)
        {
            if (string.IsNullOrEmpty(url) || esiladataan.Contains(url)) return;
            if (Mukana.Polku(url) != null) { Debug.Log($"MATKAKIRJA puhe: esiladattu {Path.GetFileName(url.Split('?')[0])} (buildissa)"); return; }
            string tiedosto = Path.Combine(Kansio, Tiiviste(url) + Paate(url));
            if (File.Exists(tiedosto)) { Debug.Log($"MATKAKIRJA puhe: esiladattu {Path.GetFileName(url.Split('?')[0])} (välimuistissa)"); return; }
            StartCoroutine(EsilataaTiedosto(url, tiedosto, taso, () => new UnityWebRequest(url, UnityWebRequest.kHttpVerbGET), null));
        }

        IEnumerator EsilataaTiedosto(string url, string tiedosto, Taso taso, Func<UnityWebRequest> pyynto, string nimi)
        {
            esiladataan.Add(url);
            Directory.CreateDirectory(Kansio);
            string valiaikainen = tiedosto + ".esilataus";
            bool ok = false;
            // Esilataus kutsujan tasolla (oletus seuraava ruutu; Esilataaja: näkyvä ohittaa).
            yield return Esilataaja.Hae(() =>
            {
                var r = pyynto();
                r.downloadHandler = new DownloadHandlerFile(valiaikainen) { removeFileOnAbort = true };
                r.timeout = 60;
                return r;
            }, taso, "puhe", r => ok = r.result == UnityWebRequest.Result.Success, avain: url);
            try
            {
                if (ok && !File.Exists(tiedosto)) File.Move(valiaikainen, tiedosto);
                else if (File.Exists(valiaikainen)) File.Delete(valiaikainen);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA puhe: esilataus: " + e.Message); }
            Debug.Log($"MATKAKIRJA puhe: esiladattu {nimi ?? Path.GetFileName(url.Split('?')[0])} {(ok ? "ok" : "EPÄONNISTUI")}");
            esiladataan.Remove(url);
        }

        IEnumerator LataaJaSoita(string url, Func<UnityWebRequest> pyynto, float viiveS, int oma, bool synteesi, bool sailo)
        {
            float alku = Time.unscaledTime;
            // Buildiin mukana (Mukana, löydös 118: avausluenta ilman verkkoa) → suoraan sieltä.
            string mukana = sailo && !synteesi ? Mukana.Polku(url) : null;
            bool valimuistista = mukana != null || (sailo && File.Exists(Path.Combine(Kansio, Tiiviste(url) + (synteesi ? ".mp3" : Paate(url)))));
            if (sailo) VerkkoOdotus.Osuma("puhe", valimuistista);
            // Esilataajan mittari: soitto on Nakyva-pyyntö (esilataus: Esilataa → EsilataaTiedosto samalla url:lla).
            if (sailo) Esilataaja.NakyvaPyynto(url, valimuistista);
            string kansio = sailo ? Kansio : Application.temporaryCachePath;
            string tiedosto = mukana ?? (sailo ? Path.Combine(Kansio, Tiiviste(url) + (synteesi ? ".mp3" : Paate(url)))
                : Path.Combine(kansio, "puhenayte-" + oma + ".mp3"));
            // Esilataus kesken (Esilataa): odotetaan sitä, ettei samaa tiedostoa ladata kahdesti rinnakkain.
            while (sailo && esiladataan.Contains(url)) yield return null;
            if (sailo && File.Exists(tiedosto)) Esilataaja.NakyvaValmis(url);
            if (oma != tunnus) yield break;
            // Synteesi verkosta: soitto alkaa ensimmäisistä tavuista (VIRTA alla), ei koko palan latauksen jälkeen.
            if (synteesi && Virta && (!sailo || !File.Exists(tiedosto)))
            {
                yield return SoitaVirtana(url, pyynto, viiveS, oma, sailo, tiedosto, alku);
                yield break;
            }
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
                if (sailo) Esilataaja.NakyvaValmis(url);
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

            yield return LataaJaSoitaTiedosto(url, viiveS, oma, sailo, tiedosto, alku, synteesi, valimuistista, mukana);
        }

        /// <summary>Avaa levyllä olevan äänitteen klipiksi ja soittaa sen loppuun (LataaJaSoita ja virran varapolku).</summary>
        IEnumerator LataaJaSoitaTiedosto(string url, float viiveS, int oma, bool sailo, string tiedosto, float alku,
            bool synteesi = true, bool valimuistista = false, string mukana = null)
        {
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

            AloitaKlippi(klippi, synteesi);
            if (synteesi) ViimeEkaAaniMs = (Time.unscaledTime - alku) * 1000.0;
            // Viive pyynnöstä ääneen (löydös 118: intron pitää alkaa painalluksesta heti).
            Debug.Log($"MATKAKIRJA puhe: alkoi {(Time.unscaledTime - alku) * 1000:0} ms pyynnöstä ({(valimuistista ? "välimuisti" : "verkko")}) "
                      + Path.GetFileName(url.Split('?')[0]) + (mukana != null ? " [buildissa]" : ""));

            // Loppu: äänite soi loppuun (ei pysäytetty eikä korvattu).
            while (oma == tunnus && lahde.isPlaying) yield return null;
            if (oma != tunnus) yield break;
            SoivaUrl = null;
            AsetaPuhuu(false);
            var l = loppu;
            loppu = null;
            l?.Invoke();
        }

        /*
         * PROGRESSIIVINEN SOITTO (web PR #3384, Fable 27.9.2026: "natiivin progressiivinen soitto"). Ennen synteesipala
         * ladattiin kokonaan levylle ja avattiin vasta sitten: xAI tuottaa 2 400 merkin palan ~35 s:ssa (≈ 5 × reaaliaika),
         * mutta ensimmäinen tavu tulee ~0,5 s:ssa — kuulija odotti koko generoinnin. Nyt POST-pyynnön vastaus soi
         * striimattuna klippinä (DownloadHandlerAudioClip, streamAudio) heti, kun EsirullaTavut on saapunut, ja
         * valmis pala tallennetaan välimuistiin samoista tavuista (dh.data), joten toinen kerta soi levyltä kuten ennen.
         * Virta = false (testikomento "puhe virta pois") palauttaa vanhan polun vertailumittausta varten.
         */
        /// <summary>Progressiivinen soitto päällä (oletus). Pois: pala ladataan kokonaan ennen soittoa (vertailu).</summary>
        public static bool Virta = true;
        /// <summary>Tavuja ennen soiton alkua: ~1 s mp3:a (xAI 24 kHz); pienempi raja katkoisi alun.</summary>
        public const int EsirullaTavut = 12 * 1024;
        /// <summary>Viimeisimmän striimatun palan 1. ääni ms pyynnöstä (mittari: "puhe virta").</summary>
        public static double ViimeEkaAaniMs { get; private set; } = -1;

        IEnumerator SoitaVirtana(string url, Func<UnityWebRequest> pyynto, float viiveS, int oma, bool sailo, string tiedosto, float alku)
        {
            string vaihe = VerkkoOdotus.Vaihe;
            float odotusAlku = Time.realtimeSinceStartup;
            var r = pyynto();
            var dh = new DownloadHandlerAudioClip(Puhepalvelin, AudioType.MPEG) { streamAudio = true, compressed = false };
            r.downloadHandler = dh;
            r.timeout = 60;
            var laheta = r.SendWebRequest();
            // Esirulla: odotetaan ensimmäiset tavut (tai valmis vastaus, jos pala on lyhyt tai tuli virhe).
            while (!laheta.isDone && r.downloadedBytes < (ulong)EsirullaTavut)
            {
                if (oma != tunnus) { r.Abort(); r.Dispose(); yield break; }
                yield return null;
            }
            bool virhe = laheta.isDone && r.result != UnityWebRequest.Result.Success;
            AudioClip klippi = null;
            if (!virhe)
            {
                try { klippi = dh.audioClip; } catch (Exception e) { Debug.LogWarning("MATKAKIRJA puhe: virta: " + e.Message); }
            }
            if (klippi == null)
            {
                // Virtaklippiä ei syntynyt: odotetaan lataus loppuun ja pudotaan vanhaan polkuun (levy → klippi).
                while (!laheta.isDone) { if (oma != tunnus) { r.Abort(); r.Dispose(); yield break; } yield return null; }
                VerkkoOdotus.Kirjaa(vaihe, "puhe:" + Path.GetFileName(url.Split('?')[0]), (Time.realtimeSinceStartup - odotusAlku) * 1000.0, 1,
                    r.result == UnityWebRequest.Result.Success ? null : "virhe");
                if (sailo) Esilataaja.NakyvaValmis(url);
                if (r.result != UnityWebRequest.Result.Success)
                {
                    ViimeVirhe = r.error;
                    Debug.LogWarning($"MATKAKIRJA puhe: {url} ei latautunut (virta): {r.error} {r.responseCode}");
                    r.Dispose();
                    LatausPetti();
                    yield break;
                }
                bool tallessa = Tallenna(dh, tiedosto);
                r.Dispose();
                if (!tallessa) { LatausPetti(); yield break; }
                yield return LataaJaSoitaTiedosto(url, viiveS, oma, sailo, tiedosto, alku);
                yield break;
            }

            float jaljella = viiveS - (Time.unscaledTime - alku);
            if (jaljella > 0) yield return new WaitForSecondsRealtime(jaljella);
            if (oma != tunnus) { r.Abort(); r.Dispose(); Destroy(klippi); yield break; }
            AloitaKlippi(klippi, true);
            ViimeEkaAaniMs = (Time.unscaledTime - alku) * 1000.0;
            Debug.Log($"MATKAKIRJA puhe: alkoi {ViimeEkaAaniMs:0} ms pyynnöstä (verkko, virta {r.downloadedBytes} t) " + Path.GetFileName(url.Split('?')[0]));

            // Soi, kunnes lataus on valmis JA klippi on soinut loppuun (virta voi hetkeksi ehtyä latauksen aikana).
            while (oma == tunnus && (!laheta.isDone || lahde.isPlaying)) yield return null;
            VerkkoOdotus.Kirjaa(vaihe, "puhe:" + Path.GetFileName(url.Split('?')[0]), (Time.realtimeSinceStartup - odotusAlku) * 1000.0, 1,
                laheta.isDone && r.result == UnityWebRequest.Result.Success ? null : "virhe");
            if (sailo) Esilataaja.NakyvaValmis(url);
            if (laheta.isDone && r.result == UnityWebRequest.Result.Success && sailo) Tallenna(dh, tiedosto);
            else if (laheta.isDone && r.result != UnityWebRequest.Result.Success) { ViimeVirhe = r.error; Debug.LogWarning($"MATKAKIRJA puhe: virta katkesi: {r.error}"); }
            if (oma != tunnus) { if (!laheta.isDone) r.Abort(); r.Dispose(); yield break; }
            r.Dispose();
            SoivaUrl = null;
            AsetaPuhuu(false);
            var l = loppu;
            loppu = null;
            l?.Invoke();
        }

        /// <summary>Vaihtaa soivan klipin (vanha tuhotaan), käynnistää sen ja häivyttää sisään; Puhuu-tapahtuma uudelleen.</summary>
        void AloitaKlippi(AudioClip klippi, bool synteesi)
        {
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
            if (vanha != null && vanha != klippi) Destroy(vanha);
            // Uusi puhe korvasi soivan: kuuntelijat näkevät lopun ja uuden alun.
            if (puhuu) AsetaPuhuu(false);
            AsetaPuhuu(true);
            lataus = null;
            haivytys = StartCoroutine(Voimakkuuteen(Kohdetaso, Alkuhaivytys, false));
        }

        /// <summary>Valmiin virran tavut välimuistitiedostoon (atominen siirto). false, jos tavuja ei saatu.</summary>
        bool Tallenna(DownloadHandlerAudioClip dh, string tiedosto)
        {
            try
            {
                var tavut = dh.data;
                if (tavut == null || tavut.Length == 0) { Debug.LogWarning("MATKAKIRJA puhe: virran tavuja ei saatu talteen"); return false; }
                Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                string valiaikainen = tiedosto + ".virta";
                File.WriteAllBytes(valiaikainen, tavut);
                if (File.Exists(tiedosto)) File.Delete(tiedosto);
                File.Move(valiaikainen, tiedosto);
                return true;
            }
            catch (Exception e) { ViimeVirhe = e.Message; Debug.LogWarning("MATKAKIRJA puhe: virran tallennus: " + e.Message); return false; }
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
