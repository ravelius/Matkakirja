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
// Kytkin.Aanimaisema (musiikin ja tehosteiden mykistys — EI luentaa, omistaja 27.9.2026 klo 15.5x).
// Asetukset.Muuttui päivittää soivan. Kaiuttimen painallus: Lue/Soita/Esihae(…, pyynnosta: true).
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
        /// <summary>Korvattavan puheen häivytys uuden alta (web: kertoja alkaa pehmeästi).</summary>
        public const float Alkuhaivytys = 0.15f;
        /// <summary>A/B-mittaus (peli-komento "puhe alku vanha|uusi"): vanha = uusi klippi häivytetään nollasta ruutujen tahdissa.</summary>
        public static bool VanhaAlku;
        /// <summary>Testi (peli-komento "puhe jumi ms"): pääsäie seisoo seuraavan Play():n jälkeen, kuten raskaassa ruudussa.</summary>
        public static int JumiMs;
        /// <summary>Testi (peli-komento "puhe hidas ms s"): seuraavan uuden puheen alusta s sekunnin ajan jokainen ruutu kestää
        /// vähintään ms (laitteen raskaat saapumisruudut simulaattorissa; ruuduittaiset rampit hidastuvat, ääni ei).</summary>
        public static int HidasMs;
        public static float HidasS;
        static float hidasLoppu;

        public static Puhe Instanssi { get; private set; }

        /// <summary>Puhe alkoi (tosi) tai loppui/pysähtyi (epätosi): musiikin vaimennus.</summary>
        public event Action<bool> Puhuu;

        /// <summary>
        /// Puheen taso: Voima.Lukija. LUENTA KUULUU AINA PYYNNÖSTÄ (omistaja 27.9.2026 klo 15.5x, web #3422):
        /// Kytkin.Aanimaisema mykistää vain musiikin ja tehosteet, ei luentaa.
        /// </summary>
        public static float Voimakkuus => Asetukset.Taso(global::Matkakirja.Natiivi.Voima.Lukija);

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
                // Lukijan moottori (xAI / ElevenLabs v4 Turbo, omistaja 30.9.2026): valinta vain omistajan laitteilla ja kehittäjätilassa.
                saadot.MoottoriLahde = Striimiaani.MoottoriValinta;
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
        /// <summary>Soiva puhe tauolla (Tauko/Jatka, nostokortin kaiutin: omistaja 27.9.2026 klo 09.3x).</summary>
        public bool Tauolla => tauolla;
        bool tauolla;
        readonly float[] tasoNaytteet = new float[256];

        /// <summary>
        /// Soivan puheen tauko (web soitin.tauko): AudioSource.Pause, jatko on näytteen tarkka. Loppu-kutsu ei laukea
        /// tauon aikana; Puhuu-tapahtuma kertoo tauon (musiikki ja ambienssi palaavat). False, jos mikään ei soi.
        /// </summary>
        public bool Tauko()
        {
            if (tauolla || !puhuu || lahde == null || !lahde.isPlaying || haivytys != null) return false;
            tauolla = true;
            lahde.Pause();
            AsetaPuhuu(false);
            return true;
        }

        /// <summary>Tauon jatko samasta kohdasta (web soitin.jatka). False, jos tauolla ei ollut mitään.</summary>
        public bool Jatka()
        {
            if (!tauolla || lahde == null) return false;
            tauolla = false;
            lahde.UnPause();
            AsetaPuhuu(true);
            return true;
        }

        /// <summary>
        /// Kelaus soivassa tai tauolla olevassa palassa (lukijan valikko, omistaja 28.9.2026: "-10sek ja +10sek"; web
        /// soitin.siirryAika): 0 = kohta mahtui palaan ja soitto jatkuu siitä; −1 / +1 = raja ylittyi, kutsuja siirtyy
        /// edelliseen tai seuraavaan palaan. Palan alussa (alle 1 s) taaksepäin = edellinen pala.
        /// </summary>
        public int Kelaa(float sekunnit)
        {
            if (lahde == null || lahde.clip == null || (!puhuu && !tauolla) || haivytys != null) return 0;
            float t = lahde.time + sekunnit;
            if (t < 0f) return lahde.time < 1f ? -1 : KelaaAlkuun();
            if (t >= lahde.clip.length - 0.05f) return 1;
            lahde.time = t;
            return 0;
        }

        int KelaaAlkuun()
        {
            lahde.time = 0f;
            return 0;
        }

        /// <summary>Tauolla oleva klippi pois (uusi puhe tai pysäytys ei jatka taukoa).</summary>
        void PuraTauko()
        {
            if (!tauolla) return;
            tauolla = false;
            if (lahde != null) lahde.Stop();
        }

        /// <summary>Soivan puheen RMS-taso (VU-mittari, web puheMittari); 0 kun hiljaa tai tauolla.</summary>
        public float SoivaTaso
        {
            get
            {
                if (lahde == null || !lahde.isPlaying || tauolla) return 0f;
                lahde.GetOutputData(tasoNaytteet, 0);
                double s = 0;
                for (int i = 0; i < tasoNaytteet.Length; i++) s += tasoNaytteet[i] * tasoNaytteet[i];
                return Mathf.Sqrt((float)(s / tasoNaytteet.Length));
            }
        }
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
            // Kertojan pois kytkeminen pysäyttää automaattisen luennan, ei pyynnöstä alkanutta (kaiutin) eikä Pulua.
            if (!Paalla && (puhuu || lataus != null) && !PulunPuhe(SoivaPersoona) && !soiPyynnosta) { Pysayta(0.3f); return; }
            if (lahde != null && lahde.isPlaying && haivytys == null) lahde.volume = Kohdetaso;
        }

        /// <summary>
        /// AudioSource.volume soivalle: äänite = Voimakkuus (Lukija-taso), synteesi = 1 (taso on
        /// vahvistimessa, jotta se saa ylittää ykkösen). Äänimaisema ei mykistä luentaa (omistaja 27.9. klo 15.5x).
        /// </summary>
        float Kohdetaso => synteesi ? 1f : Voimakkuus;

        /// <summary>Soiva luenta alkoi pelaajan pyynnöstä (kaiutin): kertojan pois kytkeminen ei katkaise sitä.</summary>
        bool soiPyynnosta;

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
        public bool Soita(string url, float viiveS = 0, Action loppu = null, bool pyynnosta = false)
        {
            // pyynnosta: pelaaja painoi kaiutinta — soi kertojakytkimestä riippumatta (web lukija: ei porttia).
            if ((!Paalla && !pyynnosta) || string.IsNullOrEmpty(url)) return false;
            // Jatkohiljaisuus (PeliOhjain): automaattinen puhe ei ala ennen pelaajan ensimmäistä toimintoa; kaiutin (pyynnöstä) soi.
            if (!pyynnosta && PeliOhjain.EstaJatkohiljaisuudessa("puheen " + System.IO.Path.GetFileName(url.Split('?')[0]))) return false;
            soiPyynnosta = pyynnosta;
            AsetaIstunto();
            PuraTauko();
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
        /// <param name="loppuTagi">xAI-puhetagi palan loppuun (Lukijaaani.LuennanPalatJaTagit: [pause] kappalejaossa,
        /// [long-pause] väliotsikon edellä); vain puhepyyntöön, säilö omaan lohkoonsa (kertoja-t1).</param>
        /// <param name="lohko">säilölohko (web lueAaneen sailio), oletuksena persoonan lohko (Lukijaaani.OletusLohko); esim.
        /// astronautin kuvaselite astro-selite kuten webissä (Linssiseppä 29.9.2026).</param>
        public bool Lue(string teksti, string persoona = "merkinnat", float viiveS = 0, Action loppu = null, bool pyynnosta = false,
            string loppuTagi = null, string lohko = null)
        {
            // pyynnosta: kaiuttimen painallus lukee aina (omistaja 27.9.2026 klo 15.5x); automaattista ohjaa Kertoja.
            if (!Paalla && !PulunPuhe(persoona) && !pyynnosta) return false;
            soiPyynnosta = pyynnosta;
            return Syntetisoi(teksti, persoona, TagiLohko(lohko ?? Lukijaaani.OletusLohko(persoona), loppuTagi), true, viiveS, loppu, loppuTagi);
        }

        static string TagiLohko(string lohko, string loppuTagi) => Lukijaaani.TagiLohko(lohko, loppuTagi);
        static List<string> PyyntoPalat(string teksti, bool sailo, string loppuTagi) =>
            Lukijaaani.PyyntoPalat(teksti, Virta && sailo, loppuTagi);

        /// <summary>
        /// Kuuntele näyte (web #puhe-nayte): persoonan näyteteksti (PUHE_NAYTTEET) nykyisillä
        /// säädöillä, ilman säilöä: ei välimuistia laitteelle eikä lohkoa workerille. Kutsu
        /// AsetaAsetus ensin, jos kentissä on tallentamaton muutos (web tallentaa ennen näytettä).
        /// Soi Kertoja-kytkimestä riippumatta kuten webissä; mykistetty peli ei soita. Pysäytä
        /// dialogin sulkeutuessa Pysayta()-kutsulla (web pysaytaLukija).
        /// </summary>
        public bool Nayte(string persoona)
        {
            // Näyte on aina pelaajan pyyntö; äänimaisema ei mykistä luentaa (omistaja 27.9.2026 klo 15.5x).
            soiPyynnosta = true;
            return Syntetisoi(Lukijaaani.NayteTeksti(persoona), persoona, null, false, 0, null);
        }

        bool Syntetisoi(string teksti, string persoona, string lohko, bool sailo, float viiveS, Action loppu, string loppuTagi = null)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return false;
            persoona ??= "kertoja";
            teksti = Katkaise(Lukijaaani.JsTrim(teksti), TekstinKatto);
            AsetaIstunto();
            PuraTauko();
            int oma = ++tunnus;
            if (lataus != null) StopCoroutine(lataus);
            if (lahde.isPlaying) Haivyta(Alkuhaivytys, false);
            this.loppu = loppu;
            SoivaUrl = "puhe:" + persoona + ":" + teksti;
            SoivaPersoona = persoona;
            ViimeVirhe = null;
            ekaAlku = Time.unscaledTime;
            mittaaEka = true;
            // Uusi puhe: vanhan puheen jonottavat esihaut pois (kutsuja lisää omat seuraavat palansa heti Luen jälkeen).
            esihakujono.Clear();
            // Palavirta (Virta): lyhyt ensimmäinen pala soi heti, loput haetaan sen soidessa (Lukijaaani.VirtaPalat).
            var palat = PyyntoPalat(teksti, sailo, loppuTagi);
            // Yksikin pala kulkee SoitaPalatin kautta: uusinta ja palaloki koskevat kaikkea luentaa.
            lataus = StartCoroutine(SoitaPalat(palat, persoona, lohko, viiveS, oma, sailo));
            return true;
        }

        float ekaAlku;
        bool mittaaEka;
        static float klippiLoppui = -1f;
        static readonly List<double> raot = new List<double>();
        /// <summary>Katkot ms: synteesiklipin loppu → seuraavan alku, kun väli on alle 5 s (palavirran palat ja
        /// ketjutetut Lue-kutsut, esim. nostokortin otsikko → kappaleet). Mittari: "puhe virta"; "puhe katkot nollaa".</summary>
        public static IReadOnlyList<double> Raot => raot;
        public static void NollaaRaot() { raot.Clear(); klippiLoppui = -1f; }

        /// <summary>
        /// PALAVIRTA: palat peräkkäin samana puheena. Seuraava pala haetaan heti, kun edellinen on pyydetty
        /// (web aikatauluta +1), joten se on levyllä ennen kuin edellinen soi loppuun. Välissä Puhuu pysyy
        /// päällä eikä loppu-kutsua tehdä; virhe missä tahansa palassa lopettaa puheen kuten ennenkin.
        /// </summary>
        IEnumerator SoitaPalat(List<string> palat, string persoona, string lohko, float viiveS, int oma, bool sailo)
        {
            for (int i = 0; i < palat.Count; i++)
            {
                if (oma != tunnus) yield break;
                bool viimeinen = i == palat.Count - 1;
                if (!viimeinen) EsihaePala(palat[i + 1], persoona, lohko, true);
                var (runko, koodi) = Saadot.Pyynto(palat[i], persoona, lohko);
                string avain = Saadot.Valimuistiavain(persoona, palat[i]);
                PalaNyt = $"{i + 1}/{palat.Count} {palat[i].Length} mrk";
                /*
                 * EI PUDOTETA PALAA (omistaja 27.9.2026 klo 22.0x, TF 1.0.32: "luenta pomppasi taas joidenkin kohtien yli"):
                 * epäonnistunut pala (verkko, avaus, tallennus; Esilataaja on jo uusinut 429/5xx/yhteysvirheet) haetaan
                 * uudelleen 1, 2 ja 4 s:n päästä. Seuraavaan palaan ei siirrytä koskaan ennen kuin tämä on soinut loppuun;
                 * jos uusinnatkaan eivät auta (tai worker vastaa 429 = päiväraja), luenta pysähtyy tähän kuten webissä.
                 */
                for (int yritys = 0; ; yritys++)
                {
                    ViimeVirhe = null;
                    yield return LataaJaSoita(avain, () => SynteesiPyynto(runko, koodi), i == 0 ? viiveS : 0, oma, true, sailo, viimeinen, i > 0);
                    if (oma != tunnus) yield break;
                    if (ViimeVirhe == null) break;
                    bool raja = ViimeVirhe.Contains("429");
                    if (raja || yritys >= PalanUusinnat)
                    {
                        Kirjaa($"pala {PalaNyt} LUOVUTETTU ({yritys} uusintaa): {ViimeVirhe}");
                        yield break;
                    }
                    PalojaUusittu++;
                    Kirjaa($"pala {PalaNyt} uusitaan ({yritys + 1}/{PalanUusinnat}): {ViimeVirhe}");
                    yield return new WaitForSecondsRealtime(1 << yritys);
                    if (oma != tunnus) yield break;
                }
            }
        }

        /// <summary>
        /// VIRKEVIRTA (web js/lukija.js lueVirtana, Pulun striimivastaus; Natiivi-UI 28.9.2026): luenta alkaa ensimmäisestä
        /// valmiista virkkeestä, kun muu vastaus vielä saapuu. Kutsuja syöttää valmiit virkkeet (Lisaa) ja päättää (Paata).
        /// Putki: kun mikään ei odota vuoroaan, saapuva teksti sitoutuu heti palaksi ja esihaetaan; muuten se kertyy
        /// ja sitoutuu seuraavaksi palaksi, kun edellinen alkaa latautua. Näin yksi pala on aina valmiina soivan perässä.
        /// Puhuu pysyy päällä palojen välissä; loppu kutsutaan, kun päätetty virta on soinut loppuun. Uusi Lue/Soita tai
        /// Pysayta katkaisee virran (Voimassa = false, Lisaa ei tee mitään).
        /// </summary>
        public sealed class Virtaluenta
        {
            readonly Puhe puhe;
            internal readonly int Oma;
            internal readonly string Persoona, Lohko;
            internal readonly Queue<string> Jono = new Queue<string>();
            readonly StringBuilder odottaa = new StringBuilder();
            internal bool Paatetty;

            internal Virtaluenta(Puhe puhe, int oma, string persoona, string lohko)
            {
                this.puhe = puhe;
                Oma = oma;
                Persoona = persoona;
                Lohko = lohko;
            }

            /// <summary>Virta on yhä soiva puhe (ei korvattu eikä pysäytetty).</summary>
            public bool Voimassa => puhe != null && puhe.tunnus == Oma;

            /// <summary>Valmis virke tai virkkeet luettavaksi.</summary>
            public void Lisaa(string teksti)
            {
                teksti = Lukijaaani.JsTrim(teksti ?? "");
                if (teksti.Length == 0 || Paatetty || !Voimassa) return;
                if (odottaa.Length > 0) odottaa.Append(' ');
                odottaa.Append(teksti);
                if (Jono.Count == 0) Sitouta();
            }

            /// <summary>Ei enempää tekstiä: virta loppuu, kun jono on soitettu.</summary>
            public void Paata()
            {
                if (Paatetty) return;
                Paatetty = true;
                if (Jono.Count == 0) Sitouta();
            }

            /// <summary>Kertynyt teksti seuraavaksi palaksi (enintään TekstinKatto) ja sen esihaku jonon kärkeen.</summary>
            internal void Sitouta()
            {
                if (odottaa.Length == 0 || !Voimassa) return;
                string kaikki = odottaa.ToString();
                string pala = Katkaise(kaikki, TekstinKatto);
                odottaa.Clear().Append(Lukijaaani.JsTrim(kaikki.Substring(pala.Length)));
                Jono.Enqueue(pala);
                puhe.EsihaePala(pala, Persoona, Lohko, true);
            }

            internal bool Tyhja => Jono.Count == 0 && odottaa.Length == 0;
        }

        /// <summary>
        /// Aloittaa virkevirran (ks. Virtaluenta): soiva puhe vaihtuu tähän kuten Luessa. null, jos luennat on kytketty pois
        /// (Pulun puhe soi aina, kuten Luessa).
        /// </summary>
        public Virtaluenta LueVirtana(string persoona, Action loppu = null)
        {
            persoona ??= "kertoja";
            if (!Paalla && !PulunPuhe(persoona)) return null;
            soiPyynnosta = false;
            AsetaIstunto();
            PuraTauko();
            int oma = ++tunnus;
            if (lataus != null) StopCoroutine(lataus);
            if (lahde.isPlaying) Haivyta(Alkuhaivytys, false);
            this.loppu = loppu;
            SoivaUrl = "puhe:" + persoona + ":virta";
            SoivaPersoona = persoona;
            ViimeVirhe = null;
            ekaAlku = Time.unscaledTime;
            mittaaEka = true;
            esihakujono.Clear();
            var v = new Virtaluenta(this, oma, persoona, TagiLohko(Lukijaaani.OletusLohko(persoona), null));
            lataus = StartCoroutine(SoitaVirta(v));
            return v;
        }

        IEnumerator SoitaVirta(Virtaluenta v)
        {
            int oma = v.Oma;
            for (int i = 0; ; i++)
            {
                // Odotetaan seuraavaa palaa, kunnes virta päätetään ja kaikki on soitettu.
                while (oma == tunnus && v.Jono.Count == 0)
                {
                    v.Sitouta();
                    if (v.Jono.Count > 0 || (v.Paatetty && v.Tyhja)) break;
                    yield return null;
                }
                if (oma != tunnus) yield break;
                if (v.Jono.Count == 0) break;
                string pala = v.Jono.Dequeue();
                // Soitettavan palan aikana kertynyt teksti seuraavaksi palaksi ja sen haku heti (putki).
                if (v.Jono.Count == 0) v.Sitouta();
                var (runko, koodi) = Saadot.Pyynto(pala, v.Persoona, v.Lohko);
                string avain = Saadot.Valimuistiavain(v.Persoona, pala);
                PalaNyt = $"v{i + 1} {pala.Length} mrk";
                for (int yritys = 0; ; yritys++)
                {
                    ViimeVirhe = null;
                    // viimeinen: false — virran loppu hoidetaan alla (lisää tekstiä voi vielä tulla palan soidessa).
                    yield return LataaJaSoita(avain, () => SynteesiPyynto(runko, koodi), 0, oma, true, true, false, i > 0);
                    if (oma != tunnus) yield break;
                    if (ViimeVirhe == null) break;
                    bool raja = ViimeVirhe.Contains("429");
                    if (raja || yritys >= PalanUusinnat)
                    {
                        // Virran luovutus on sen loppu (web onVirhe → loppui): kuulija ei jää odottamaan puhetta.
                        Kirjaa($"pala {PalaNyt} LUOVUTETTU ({yritys} uusintaa): {ViimeVirhe}");
                        LopetaVirta();
                        yield break;
                    }
                    PalojaUusittu++;
                    Kirjaa($"pala {PalaNyt} uusitaan ({yritys + 1}/{PalanUusinnat}): {ViimeVirhe}");
                    yield return new WaitForSecondsRealtime(1 << yritys);
                    if (oma != tunnus) yield break;
                    // LatausPetti tyhjensi SoivaUrl:n: virta on yhä soiva puhe uusinnan ajan.
                    SoivaUrl = "puhe:" + v.Persoona + ":virta";
                }
            }
            LopetaVirta();
        }

        /// <summary>Virran loppu (soitettu tai luovutettu): puhe päättyy ja loppu kutsutaan. Korvattu/pysäytetty ei tule tänne.</summary>
        void LopetaVirta()
        {
            SoivaUrl = null;
            AsetaPuhuu(false);
            var l = loppu;
            loppu = null;
            l?.Invoke();
        }

        /// <summary>Palan loppuosa (s), jonka puuttuminen ei ole katkos vaan mp3:n kestoarvion häntä (ks. SOI LOPPUUN ASTI).</summary>
        public const float HantaVara = 1.5f;

        /// <summary>Epäonnistuneen palan uusinnat (1, 2, 4 s) ennen kuin luenta pysähtyy.</summary>
        public const int PalanUusinnat = 3;
        /// <summary>Soiva pala "i/n mrk" (palaloki).</summary>
        public static string PalaNyt { get; private set; }
        /// <summary>Palaloki (mittari: "puhe palat"): soitetut, kesken loppuneet ja jatketut, uusitut palat.</summary>
        public static int PalojaSoitettu, PalojaJatkettu, PalojaUusittu, PalojaMyohassa;
        static readonly List<string> palaloki = new List<string>();
        public static IReadOnlyList<string> Palaloki => palaloki;
        public static void NollaaPalaloki() { palaloki.Clear(); PalojaSoitettu = PalojaJatkettu = PalojaUusittu = PalojaMyohassa = 0; }
        static void Kirjaa(string rivi)
        {
            Debug.Log("MATKAKIRJA puhe: " + rivi);
            palaloki.Add($"{Time.unscaledTime:0.0} {rivi}");
            if (palaloki.Count > 40) palaloki.RemoveAt(0);
        }
        /// <summary>Workerin x-puhe-lahde (reuna | r2 | generoitu) välimuistiavaimittain: palaloki kertoo, mistä pala tuli.</summary>
        static readonly Dictionary<string, string> puheLahde = new Dictionary<string, string>();
        static void MuistaLahde(string avain, UnityWebRequest r)
        {
            string l = r.GetResponseHeader("x-puhe-lahde");
            // Moottori mukaan (juna 142, Eleven-äänten selvitys): eleven | xai (päiväkatto tai varapolku) | openai.
            string m = r.GetResponseHeader("x-puhe-moottori");
            puheLahde[avain] = $"{(l ?? "?")} {m ?? "?"} {r.responseCode}";
            if (puheLahde.Count > 64) puheLahde.Clear();
        }

        /// <summary>
        /// ESIHAKU JÄRJESTYKSESSÄ (Fable 27.9.2026 klo 21.5x, mittaus: nostokortissa 3,2 s katko, kun kortin +1/+2-palojen kaikki
        /// virtapalat generoitiin rinnakkain soivan puheen seuraavan palan kanssa): synteesipalat haetaan jonosta YKSI kerrallaan.
        /// Soivan puheen seuraava pala (kiireellinen) menee jonon kärkeen, kortin myöhemmät palat perään. Soitto, joka tarvitsee
        /// jonossa odottavaa palaa, ottaa sen jonosta ja hakee sen itse heti (LataaJaSoita).
        /// </summary>
        struct Esihaku { public string Avain, Tiedosto; public Func<UnityWebRequest> Pyynto; }
        readonly LinkedList<Esihaku> esihakujono = new LinkedList<Esihaku>();
        bool esihakuKaynnissa;

        /// <summary>Hakee yhden synteesipalan levylle soittamatta (Esihae ja palavirta) jonon kautta.</summary>
        void EsihaePala(string pala, string persoona, string lohko, bool kiireellinen = false)
        {
            string avain = Saadot.Valimuistiavain(persoona, pala);
            if (esiladataan.Contains(avain)) return;
            string tiedosto = Path.Combine(Kansio, Tiiviste(avain) + ".mp3");
            if (File.Exists(tiedosto)) return;
            // Kiireellinen siirtyy kärkeen; muuten jo jonossa oleva pitää paikkansa.
            if (kiireellinen) PoistaJonosta(avain);
            else foreach (var h in esihakujono) if (h.Avain == avain) return;
            var (runko, koodi) = Saadot.Pyynto(pala, persoona, lohko);
            var haku = new Esihaku { Avain = avain, Tiedosto = tiedosto, Pyynto = () => SynteesiPyynto(runko, koodi) };
            if (kiireellinen) esihakujono.AddFirst(haku);
            else esihakujono.AddLast(haku);
            if (!esihakuKaynnissa) StartCoroutine(PuraEsihakujono());
        }

        /// <summary>Poistaa avaimen jonottavista esihauista; true = oli jonossa.</summary>
        bool PoistaJonosta(string avain)
        {
            for (var n = esihakujono.First; n != null; n = n.Next)
                if (n.Value.Avain == avain) { esihakujono.Remove(n); return true; }
            return false;
        }

        IEnumerator PuraEsihakujono()
        {
            esihakuKaynnissa = true;
            try
            {
                while (esihakujono.Count > 0)
                {
                    var h = esihakujono.First.Value;
                    esihakujono.RemoveFirst();
                    if (esiladataan.Contains(h.Avain) || File.Exists(h.Tiedosto)) continue;
                    yield return EsilataaTiedosto(h.Avain, h.Tiedosto, Taso.SeuraavaRuutu, h.Pyynto, "esihaettu pala");
                }
            }
            finally { esihakuKaynnissa = false; }
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
        public void Esihae(string teksti, string persoona = "kertoja", bool pyynnosta = false, string loppuTagi = null)
        {
            if ((!Paalla && !PulunPuhe(persoona) && !pyynnosta) || string.IsNullOrWhiteSpace(teksti)) return;
            persoona ??= "kertoja";
            teksti = Katkaise(Lukijaaani.JsTrim(teksti), TekstinKatto);
            // Samat palat kuin Lue tekee (palavirta), muuten esihaku menisi hukkaan ja pala generoitaisiin kahdesti.
            string lohko = TagiLohko(Lukijaaani.OletusLohko(persoona), loppuTagi);
            foreach (var pala in PyyntoPalat(teksti, true, loppuTagi))
                EsihaePala(pala, persoona, lohko);
        }

        /// <summary>
        /// Luennan ENSIMMÄINEN pala valmiiksi (omistaja 29.9.2026: "voitaisiinko ensimmäinen lause tai pelkkä otsikkokin
        /// esiladata heti kun nosto latautuu"): vain palavirran 1. pala (otsikko + 1. virke) jonon kärkeen, samalla avaimella
        /// kuin Lue sen hakee, joten kaiuttimen napautus soi välimuistista. Palauttaa avaimen (PeruEsihaku), null = ei haettu.
        /// </summary>
        public string EsihaeAlku(string teksti, string persoona = "kertoja", string loppuTagi = null)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return null;
            persoona ??= "kertoja";
            teksti = Katkaise(Lukijaaani.JsTrim(teksti), TekstinKatto);
            string lohko = TagiLohko(Lukijaaani.OletusLohko(persoona), loppuTagi);
            var palat = PyyntoPalat(teksti, true, loppuTagi);
            if (palat.Count == 0) return null;
            EsihaePala(palat[0], persoona, lohko, true);
            return Saadot.Valimuistiavain(persoona, palat[0]);
        }

        /// <summary>Jonottava esihaku pois (kortti suljettiin ennen kuin haku alkoi); käynnissä oleva valmistuu.</summary>
        public void PeruEsihaku(string avain)
        {
            if (avain != null && PoistaJonosta(avain)) Debug.Log("MATKAKIRJA puhe: esihaku peruttu (kortti suljettiin)");
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
            PuraTauko();
            esihakujono.Clear(); // suljettu kortti ei generoi enää jonottavia palojaan (käynnissä oleva valmistuu)
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
            }, taso, "puhe", r => { ok = r.result == UnityWebRequest.Result.Success; MuistaLahde(url, r); }, avain: url);
            try
            {
                if (ok && !File.Exists(tiedosto)) File.Move(valiaikainen, tiedosto);
                else if (File.Exists(valiaikainen)) File.Delete(valiaikainen);
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA puhe: esilataus: " + e.Message); }
            Debug.Log($"MATKAKIRJA puhe: esiladattu {nimi ?? Path.GetFileName(url.Split('?')[0])} {(ok ? "ok" : "EPÄONNISTUI")}");
            esiladataan.Remove(url);
        }

        IEnumerator LataaJaSoita(string url, Func<UnityWebRequest> pyynto, float viiveS, int oma, bool synteesi, bool sailo,
            bool viimeinen = true, bool jatko = false)
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
            // Jonossa odottava esihaku (ei vielä käynnissä): soitto hakee palan itse heti, ei odota jonoa.
            if (sailo && synteesi) PoistaJonosta(url);
            // Esilataus kesken (Esilataa): odotetaan sitä, ettei samaa tiedostoa ladata kahdesti rinnakkain.
            while (sailo && esiladataan.Contains(url)) yield return null;
            if (sailo && File.Exists(tiedosto)) Esilataaja.NakyvaValmis(url);
            if (oma != tunnus) yield break;
            // Synteesi verkosta: soitto alkaa ensimmäisistä tavuista (VIRTA alla), ei koko palan latauksen jälkeen.
            if (synteesi && Striimi && viimeinen && !jatko && !virtaPetti && (!sailo || !File.Exists(tiedosto)))
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
                }, Taso.Nakyva, "puhe", r => { ok = r.result == UnityWebRequest.Result.Success; virhe = r.error; if (synteesi) MuistaLahde(url, r); });
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

            yield return LataaJaSoitaTiedosto(url, viiveS, oma, sailo, tiedosto, alku, synteesi, valimuistista, mukana, viimeinen, jatko);
        }

        /// <summary>Avaa levyllä olevan äänitteen klipiksi ja soittaa sen loppuun (LataaJaSoita ja virran varapolku).</summary>
        IEnumerator LataaJaSoitaTiedosto(string url, float viiveS, int oma, bool sailo, string tiedosto, float alku,
            bool synteesi = true, bool valimuistista = false, string mukana = null, bool viimeinen = true, bool jatko = false)
        {
            AudioClip klippi;
            using (var r = UnityWebRequestMultimedia.GetAudioClip("file://" + tiedosto, TyyppiPaatteesta(tiedosto)))
            {
                // PCM MUISTIIN (kärki 30.9.2026, omistajan tallenne: isoisä kuului laitteella heti äänitteen kohdasta 6,6 s,
                // vaikka Unity ilmoitti kohdaksi 0,04 s): pakattu mp3 puretaan laitteella soiton aikana, ja kohdan asetus
                // (timeSamples) pakattuun klippiin voi osua muualle kuin alkuun. Puhe puretaan kokonaan jo avauksessa, jolloin
                // soitto ja kohta ovat näytetarkkoja. Kustannus: purku avausruudussa (22 s ≈ 2 Mt, mitattu lokiin).
                // Pakattu = true palauttaa vanhan polun vertailua varten (peli-komento "puhe pakattu 1|0").
                ((DownloadHandlerAudioClip)r.downloadHandler).compressed = Pakattu;
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
                float purku0 = Time.realtimeSinceStartup;
                klippi = DownloadHandlerAudioClip.GetContent(r);
                float purkuMs = (Time.realtimeSinceStartup - purku0) * 1000f;
                if (purkuMs > 20f || Verho) Debug.Log($"MATKAKIRJA puhe: klippi avattu {(Pakattu ? "pakattuna" : "PCM:nä")} {purkuMs:0} ms, "
                    + $"{klippi?.length:0.0} s, {klippi?.frequency} Hz, {klippi?.loadType} {Path.GetFileName(url.Split('?')[0])}");
            }
            // Näyte ei jää laitteelle (web: sailio null). Pakattu klippi on jo muistissa.
            if (!sailo) { try { File.Delete(tiedosto); } catch { } }
            // KLIPPI VALMIIKSI ENNEN SOITTOA (omistaja 29.9.2026: uuden noston 1. napautus alkoi ensimmäisen virkkeen
            // puolivälistä, 2. napautus välimuistista oikein; laitteella). Pakatun klipin data voi vielä latautua Play():n
            // hetkellä: soitto alkaa myöhässä tai "ei alkanut 2 s:ssa" ja palavirran pala ohitetaan. Odotetaan Loaded
            // (enintään 5 s), vasta sitten Play() ja kohta 0 (AloitaKlippi).
            if (klippi != null && klippi.loadState != AudioDataLoadState.Loaded)
            {
                float lataus0 = Time.unscaledTime;
                if (klippi.loadState == AudioDataLoadState.Unloaded) klippi.LoadAudioData();
                while (oma == tunnus && klippi.loadState == AudioDataLoadState.Loading && Time.unscaledTime - lataus0 < 5f) yield return null;
                Kirjaa($"pala {PalaNyt} klippi latautui {(Time.unscaledTime - lataus0) * 1000:0} ms ennen soittoa ({klippi.loadState})");
                if (oma != tunnus) { Destroy(klippi); yield break; }
            }
            float jaljella = viiveS - (Time.unscaledTime - alku);
            if (jaljella > 0) yield return new WaitForSecondsRealtime(jaljella);
            if (oma != tunnus) { Destroy(klippi); yield break; }

            // Palavirran välissä tauotettu puhe ei jatku itsestään: odotetaan jatkoa (Jatka purkaa tauon).
            while (jatko && tauolla && oma == tunnus) yield return null;
            if (oma != tunnus) { Destroy(klippi); yield break; }
            // ULOSTULO KÄYNNISSÄ ENNEN SOITTOA (kärki 30.9.2026): FMOD käynnistää ulostulonsa uudelleen taustasiirtymän ja
            // keskeytyksen jälkeen (FMOD::OutputCoreAudio::reset). Uusi puhe alkaa vasta, kun DSP-kello etenee (enintään 2 s),
            // jottei alku soi pysähtyneeseen ulostuloon. Tavallisesti kello etenee seuraavalla ruudulla (puskuri 21 ms).
            if (!jatko)
            {
                double dsp0 = AudioSettings.dspTime;
                float ulos0 = Time.unscaledTime;
                while (oma == tunnus && AudioSettings.dspTime <= dsp0 && Time.unscaledTime - ulos0 < 2f) yield return null;
                if (oma != tunnus) { Destroy(klippi); yield break; }
                float seisoi = Time.unscaledTime - ulos0;
                if (seisoi > 0.15f) Debug.LogWarning($"MATKAKIRJA puhe: ulostulo seisoi {seisoi * 1000:0} ms ennen soittoa"
                    + $"{(AudioSettings.dspTime <= dsp0 ? " (ei käynnistynyt 2 s:ssa, soitetaan silti)" : "")} {Path.GetFileName(url.Split('?')[0])}");
            }
            if (synteesi && klippiLoppui >= 0f && Time.unscaledTime - klippiLoppui < 5f) raot.Add((Time.unscaledTime - klippiLoppui) * 1000.0);
            AloitaKlippi(klippi, synteesi, jatko);
            if (synteesi && mittaaEka) { ViimeEkaAaniMs = (Time.unscaledTime - ekaAlku) * 1000.0; mittaaEka = false; }
            // Viive pyynnöstä ääneen (löydös 118: intron pitää alkaa painalluksesta heti).
            Debug.Log($"MATKAKIRJA puhe: alkoi {(Time.unscaledTime - alku) * 1000:0} ms pyynnöstä ({(valimuistista ? "välimuisti" : "verkko")}) "
                      + Path.GetFileName(url.Split('?')[0]) + (mukana != null ? " [buildissa]" : ""));

            /*
             * SOI LOPPUUN ASTI (TF 1.0.32 ohitukset): ennen loppu tunnistettiin pelkästä isPlayingista samassa ruudussa
             * kuin Play() — jos pakattu klippi ei ollut vielä soimassa (tai äänilähde pysähtyi kesken, esim. istunnon
             * keskeytys), pala "loppui" heti ja seuraava pala korvasi sen = kohta ohitettiin. Nyt: odotetaan alkua enintään
             * 2 s (Play uudelleen), seurataan soitettua aikaa, ja kesken pysähtynyt pala jatkuu samasta kohdasta (≤ 3 kertaa).
             */
            float kesto = klippi != null ? klippi.length : 0f, soi = 0f, alkuOdotus = Time.unscaledTime;
            // Juurisyyn mittari: vanha koodi tulkitsi Play()-ruudun isPlaying = false palan loppumiseksi.
            bool heti = lahde.isPlaying || tauolla;
            int ruutuja = 0;
            while (oma == tunnus && !lahde.isPlaying && !tauolla && Time.unscaledTime - alkuOdotus < 2f) { ruutuja++; yield return null; }
            if (synteesi && !heti && oma == tunnus)
            {
                PalojaMyohassa++;
                Kirjaa($"pala {PalaNyt} alkoi soida vasta {ruutuja} ruudun / {(Time.unscaledTime - alkuOdotus) * 1000:0} ms päästä Play():sta (vanha koodi olisi OHITTANUT palan)");
            }
            if (oma != tunnus) yield break;
            if (!lahde.isPlaying && !tauolla) { Kirjaa($"pala {PalaNyt} ei alkanut 2 s:ssa: Play uudelleen"); lahde.Play(); }
            for (int jatkoja = 0; ; jatkoja++)
            {
                while (oma == tunnus && (lahde.isPlaying || tauolla))
                {
                    if (lahde.isPlaying && lahde.clip == klippi) soi = Mathf.Max(soi, lahde.time);
                    yield return null;
                    // OHIMENEVÄ PYSÄHDYS (omistaja 1.0.39: "noin 15 s päästä hyppää alkuun ja aloittaa uudestaan"; mitattu
                    // FB234D08 alkumittarilla): pakatun mp3-klipin isPlaying on välillä yhden ruudun epätosi kesken soiton,
                    // soittokohta tallessa. Se ei ole loppu eikä katkos: odotetaan, jatkuuko soitto itsestään (≤ 0,25 s).
                    if (oma == tunnus && !lahde.isPlaying && !tauolla && lahde.clip == klippi && lahde.time > 0f)
                    {
                        float odotus = Time.unscaledTime;
                        while (oma == tunnus && !lahde.isPlaying && !tauolla && Time.unscaledTime - odotus < 0.25f) yield return null;
                        if (lahde.isPlaying) Kirjaa($"pala {PalaNyt} ohimenevä pysähdys {soi:0.0} s ({(Time.unscaledTime - odotus) * 1000:0} ms), soitto jatkui");
                    }
                }
                if (oma != tunnus) yield break;
                // HÄNTÄ EI OLE KATKOS (omistaja 28.9.2026 klo 17.5x: "striimiluenta alkaa kesken lauseen … hyppää"): xAI-mp3:n
                // klippi päättyy luonnostaan 0,2–0,5 s ennen clip.lengthiä (mp3:n kestoarvio; laitemittaus FB234D08: 17,4/17,8,
                // 16,9/17,4, 11,2/11,4, 20,1/20,6 s), ja entinen 0,25 s:n vara kelasi joka palan lopun uudelleen. Pakatun mp3:n
                // kelaus on epätarkka, joten "jatko" saattoi soittaa kohdan kesken lauseen uudelleen. Katkokseksi tulkitaan vain,
                // kun palaa on jäljellä yli HantaVara.
                if (!synteesi || kesto <= 0f || soi >= kesto - HantaVara || jatkoja >= 3 || lahde.clip != klippi) break;
                PalojaJatkettu++;
                Kirjaa($"pala {PalaNyt} pysähtyi kesken {soi:0.0}/{kesto:0.0} s: jatketaan");
                // Kohta asetetaan Play():n JÄLKEEN: Play() aloittaa klipin alusta, joten ennen sitä asetettu time hukkui ja
                // "jatko" soitti palan alusta uudelleen (mitattu: 0,3/7,8 s → 0,000).
                lahde.Play();
                lahde.time = Mathf.Min(soi, Mathf.Max(0f, kesto - 0.05f));
                yield return null;
            }
            if (synteesi)
            {
                PalojaSoitettu++;
                string mista = mukana != null ? "buildissa" : valimuistista ? "levy" : "verkko";
                puheLahde.TryGetValue(url, out var worker);
                // Mallin ohitus näkyy lyhyenä klippinä: puhetta ~14 mrk/s, alle puolet siitä → merkintä lokiin.
                int mrk = PalaNyt != null && int.TryParse(PalaNyt.Split(' ')[1], out var m) ? m : 0;
                string lyhyt = mrk > 60 && kesto > 0f && kesto < mrk / 28f ? " LYHYT KLIPPI (mallin ohitus?)" : "";
                Kirjaa($"pala {PalaNyt} soi {soi:0.0}/{kesto:0.0} s, {mista}{(worker != null ? ", worker " + worker : "")}{lyhyt}");
            }
            // Palavirran välipala: puhe jatkuu seuraavalla palalla (SoitaPalat), ei loppua eikä Puhuu-muutosta.
            if (synteesi) klippiLoppui = Time.unscaledTime;
            if (!viimeinen) yield break;
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
        /// <summary>
        /// PALAVIRTA (oletus päällä; komento "puhe virta pois|paalle"): synteesi soi kasvavina paloina
        /// (Lukijaaani.VirtaPalat), ensimmäinen lyhyt pala ~2 s:ssa, jokainen pala vanhalla, laitteella toimivalla
        /// polulla (levy → klippi). Pois: koko teksti yhtenä palana (vertailumittaus).
        /// </summary>
        public static bool Virta = true;
        /// <summary>
        /// Striimattu mp3 (DownloadHandlerAudioClip streamAudio, SoitaVirtana). OLETUS POIS: iOS ei jäsennä sitä
        /// (Laitetestaajan uusinta 27.9. b380a78d4, TF 1.0.29: "Data Processing Error, see Download Handler error 200").
        /// Vain kokeiluun komennolla "puhe striimi paalle"; palavirta on laitteen tapa.
        /// </summary>
        public static bool Striimi = false;
        /// <summary>Virta petti tässä istunnossa (jäsennysvirhe laitteella): synteesi soitetaan vanhalla polulla. Komento "puhe virta paalle" nollaa.</summary>
        static bool virtaPetti;
        /// <summary>Nollaa virran pettämisen (testikomento "puhe virta paalle").</summary>
        public static void NollaaVirta() => virtaPetti = false;
        /// <summary>Onko virta pudonnut vanhaan polkuun tässä istunnossa (mittari).</summary>
        public static bool VirtaPetti => virtaPetti;
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
                    /*
                     * VIRTA EI SAA VAIENTAA PUHETTA (Laitetestaaja TF 1.0.29, b380a78d4): palvelin vastasi 200, mutta
                     * DownloadHandlerAudioClip (streamAudio, MPEG) ei jäsentänyt virtaa laitteella → DataProcessingError,
                     * eikä ääntä tullut lainkaan. Jäsennysvirhe (vastaus 200) sammuttaa virran tämän istunnon ajaksi ja
                     * pala soitetaan vanhalla polulla: ensin jo ladatuista tavuista, muuten uudella haulla.
                     */
                    if (r.result == UnityWebRequest.Result.DataProcessingError && r.responseCode == 200)
                    {
                        virtaPetti = true;
                        Debug.LogWarning("MATKAKIRJA puhe: virta pois tästä eteenpäin (jäsennysvirhe), vanha polku");
                        bool tavuista = Tallenna(dh, tiedosto, hiljaa: true);
                        r.Dispose();
                        if (oma != tunnus) yield break;
                        if (tavuista) yield return LataaJaSoitaTiedosto(url, viiveS, oma, sailo, tiedosto, alku);
                        else yield return LataaJaSoita(url, pyynto, viiveS, oma, true, sailo);
                        yield break;
                    }
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
            // Tauolla (Puhe.Tauko) klippi ei soi, mutta puhe ei ole loppunut: loppu-kutsu vasta jatkon jälkeen.
            while (oma == tunnus && (!laheta.isDone || lahde.isPlaying || tauolla)) yield return null;
            VerkkoOdotus.Kirjaa(vaihe, "puhe:" + Path.GetFileName(url.Split('?')[0]), (Time.realtimeSinceStartup - odotusAlku) * 1000.0, 1,
                laheta.isDone && r.result == UnityWebRequest.Result.Success ? null : "virhe");
            if (sailo) Esilataaja.NakyvaValmis(url);
            if (laheta.isDone && r.result == UnityWebRequest.Result.Success && sailo) Tallenna(dh, tiedosto);
            else if (laheta.isDone && r.result != UnityWebRequest.Result.Success)
            {
                ViimeVirhe = r.error;
                Debug.LogWarning($"MATKAKIRJA puhe: virta katkesi: {r.error}");
                // Jäsennysvirhe kesken soiton: seuraavat palat vanhalla polulla (ks. yllä).
                if (r.result == UnityWebRequest.Result.DataProcessingError) virtaPetti = true;
            }
            if (oma != tunnus) { if (!laheta.isDone) r.Abort(); r.Dispose(); yield break; }
            r.Dispose();
            SoivaUrl = null;
            AsetaPuhuu(false);
            var l = loppu;
            loppu = null;
            l?.Invoke();
        }

        /// <summary>Hiljainen esilämmitys ennen uutta klippiä Bluetooth-reitillä (s).</summary>
        public const float Esilammitys = 0.5f;

        /// <summary>Vaihtaa soivan klipin (vanha tuhotaan), käynnistää sen ja häivyttää sisään; Puhuu-tapahtuma uudelleen.</summary>
        void AloitaKlippi(AudioClip klippi, bool synteesi, bool jatko = false)
        {
            if (haivytys != null) { StopCoroutine(haivytys); haivytys = null; }
            var vanha = lahde.clip;
            lahde.Stop();
            lahde.clip = klippi;
            // LUENNAN ALKUKATKO (omistaja 1.0.39: isoisän luennan ja kaupungin nimen alku ei välillä kuulu laitteella;
            // Natiivi-UI 29.9.): ennen klippi alkoi voimakkuudella 0 ja nousi 150 ms:ssa pääsäikeen ruuduissa. Äänisäie
            // soittaa kuitenkin Play():sta lähtien, joten jos pääsäie seisoo heti Play():n jälkeen (saapuminen: kaupunki,
            // kortti ja kartta samassa ruudussa; laitteella hitaampi kuin simulaattorissa), klippi soi koko jumin ajan
            // mykkänä ja ensimmäinen tavu katoaa. Puheklipeissä on 0,11–0,20 s hiljaisuutta alussa (mitattu 10 klippiä
            // välimuistista), joten alku ei naksahda: klippi alkaa suoraan kohdetasolla, ja häivytys jää vain korvattavalle.
            lahde.volume = VanhaAlku ? 0f : Kohdetaso;
            lahde.pitch = 1f; // nopeus on generoinnissa (web: ei playbackRatea)
            this.synteesi = synteesi;
            PaivitaVahvistus();
            vahvistin.Nollaa();
            // BLUETOOTH-ESILÄMMITYS (omistaja 29.9.2026: AirPodseilla luennan alku jäi kuulematta): uusi klippi alkaa
            // Esilammitys-viiveellä, jotta hiljaisuuden jälkeen heräävä Bluetooth-linkki ehtii auki ennen ensimmäistä tavua.
            // ISTUNTO KUNTOON JUURI ENNEN SOITTOA (kärki 30.9.2026): FMOD voi palauttaa Ambientin taustalta paluun jälkeen, ja
            // äänetön tila mykistää sen — ennen tätä luokka tarkistettiin vain sovelluksen ensimmäisestä puheesta.
            if (AaniIstunto.Varmista()) Debug.Log($"MATKAKIRJA puhe: istunto oli Ambient ennen soittoa, Playback palautettu ({klippi?.name})");
            bool esilammitys = !jatko && AaniIstunto.Bluetooth();
            if (esilammitys) { lahde.PlayDelayed(Esilammitys); Debug.Log($"MATKAKIRJA puhe: Bluetooth-esilämmitys {Esilammitys:0.0} s {klippi?.name}"); }
            else lahde.Play();
            // LUENTA ALUSTA (omistaja 29.9.2026, laitteella: uusi luenta alkoi ensimmäisen virkkeen keskeltä edellisen
            // keskeytetyn jälkeen): uusi klippi soi aina näytteestä 0; palan jatko (jatko) kelaa itse.
            if (!jatko) lahde.timeSamples = 0;
            StartCoroutine(AlkuMittari(klippi, Kohdetaso, !jatko));
            if (Verho) StartCoroutine(VerhoMittari(klippi, synteesi ? PalaNyt : null));
            if (!jatko && HidasMs > 0 && HidasS > 0f) { hidasLoppu = Time.unscaledTime + HidasS; HidasS = 0f; Debug.Log($"MATKAKIRJA puhe: hidas {HidasMs} ms/ruutu alkaa"); }
            if (vanha != null && vanha != klippi) Destroy(vanha);
            // Uusi puhe korvasi soivan: kuuntelijat näkevät lopun ja uuden alun. Palavirran jatkopala on
            // saman puheen jatkoa: ei loppua eikä alkua väliin (lataus-kahva kuuluu yhä SoitaPalat-korutiinille).
            if (!jatko)
            {
                if (puhuu) AsetaPuhuu(false);
                lataus = null;
            }
            if (!puhuu) AsetaPuhuu(true);
            if (VanhaAlku) haivytys = StartCoroutine(Voimakkuuteen(Kohdetaso, Alkuhaivytys, false));
        }

        /// <summary>
        /// Alun mittari (currentTime-mittaus, 29.9.): ruuduittain 1 s ajan soittokohta ja voimakkuus. "hiljaa" = soitettu
        /// aika, jonka lähde oli alle puolen kohdetasosta; klipin alkuhiljaisuuden (0,11–0,20 s) ylittävä osa on kadonnut
        /// tavu. Unity käynnistää soiton vasta Play()-ruudun lopussa, joten testijumi (puhe jumi) osuu ensimmäiseen ruutuun,
        /// jossa klippi jo soi: raskas ruutu heti soiton alettua (saapuminen, kortin avaus).
        /// </summary>
        IEnumerator AlkuMittari(AudioClip klippi, float taso, bool kelaaAlkuun = false)
        {
            float t0 = Time.unscaledTime, edellinen = 0f, hiljaa = 0f, v = lahde.volume, jumi = 0f, ekaKohta = -1f;
            int ruutuja = 0;
            while (lahde.clip == klippi && Time.unscaledTime - t0 < 1f + Esilammitys)
            {
                yield return null;
                if (lahde.clip != klippi) yield break;
                float t = lahde.time;
                if (ekaKohta < 0f && t > 0f)
                {
                    // Ensimmäinen soiva ruutu: kohta yli 0,25 s (yksi ruutu on ≤ 0,05 s) = klippi ei alkanut alusta.
                    ekaKohta = t;
                    if (t > 0.25f) Debug.LogWarning($"MATKAKIRJA puhe: ALKU EI ALUSSA: 1. soiva ruutu kohdassa {t:0.000} s {klippi?.name}"
                        + (kelaaAlkuun ? " → kelattu alkuun" : ""));
                    // Turvaverkko (omistaja 29.9.2026: "isoisän luennan alku jää kuulematta"): uusi klippi, joka ehti soida
                    // pääsäikeen jumin aikana yli 0,25 s, kelataan alkuun, jotta ensimmäinen virke kuuluu. Palavirran
                    // jatkopala ei kelaa (se jatkaa edellistä).
                    if (t > 0.25f && kelaaAlkuun) { lahde.timeSamples = 0; edellinen = 0f; t = 0f; }
                }
                if (t > edellinen && v < 0.5f * taso) hiljaa += t - edellinen;
                if (t > 0f) edellinen = t;
                v = lahde.volume;
                ruutuja++;
                if (JumiMs > 0 && t > 0f) { jumi = JumiMs; System.Threading.Thread.Sleep(JumiMs); JumiMs = 0; }
            }
            Debug.Log($"MATKAKIRJA puhe: alku {(VanhaAlku ? "vanha" : "uusi")}: 1. soiva kohta {ekaKohta:0.000} s, jumi {jumi:0} ms, {ruutuja} ruutua, soittokohta {edellinen:0.000} s, "
                + $"hiljaa (< 50 %) soitettu {hiljaa:0.000} s {klippi?.name}");
        }

        /// <summary>Puhe pakattuna muistiin (vanha polku) vai PCM:nä (oletus 30.9.2026), peli-komento "puhe pakattu 1|0".</summary>
        public static bool Pakattu;

        /// <summary>Verhomittari (peli-komento "puhe verho 1|0"): jokaisen klipin alku lokiin, ks. VerhoMittari.</summary>
        public static bool Verho = true;
        public const float VerhoS = 8f, VerhoJakso = 0.25f;
        readonly float[] verhoNaytteet = new float[512];

        /// <summary>
        /// PUHEVÄYLÄN VERHO (kärki 30.9.2026, omistaja TF 1.0.64 kaiuttimella: "isoisän luenta alkaa vieläkin kesken kappaleen",
        /// alusta puuttuu 1–2 virkettä eli noin 3–8 s, myös nostoissa): klipin ensimmäiset 8 s 0,25 s:n jaksoina —
        /// soittokohta, Puhe-lähteen oma RMS (lahde.GetOutputData, ei masteria), koko miksauksen RMS (kuuntelija) ja DSP-kellon
        /// eteneminen. Oma RMS > 0 heti = puhe soi ääneen alusta; kaikki ≫ oma = musiikki tai tausta peittää; DSP ei etene =
        /// miksaus seisoo. Muut soivat lähteet (nimi@voimakkuus) ensimmäisen jakson lopussa. Yksi rivi per klippi.
        /// </summary>
        IEnumerator VerhoMittari(AudioClip klippi, string pala)
        {
            var sb = new StringBuilder(1200);
            sb.Append($"MATKAKIRJA puhe: verho {klippi?.name} [{pala ?? "äänite"}] {klippi?.loadState} {klippi?.frequency} Hz, voim. {lahde.volume:0.00}, "
                + "t kohta/oma/kaikki/dsp:");
            float t0 = Time.unscaledTime, jaksonLoppu = VerhoJakso;
            double dspEd = AudioSettings.dspTime, oma = 0, kaikki = 0;
            int n = 0;
            bool muutKirjattu = false;
            while (lahde.clip == klippi && Time.unscaledTime - t0 < VerhoS)
            {
                yield return null;
                if (lahde.clip != klippi) break;
                if (lahde.isPlaying) { lahde.GetOutputData(verhoNaytteet, 0); oma += Rms(verhoNaytteet); }
                TestiMykistys.Lahto(verhoNaytteet, 0);
                kaikki += Rms(verhoNaytteet);
                n++;
                float t = Time.unscaledTime - t0;
                if (t < jaksonLoppu) continue;
                double dsp = AudioSettings.dspTime;
                sb.Append($" {t:0.00}:{lahde.time:0.00}/{oma / n:0.000}/{kaikki / n:0.000}/{dsp - dspEd:0.00}");
                dspEd = dsp; oma = kaikki = 0; n = 0;
                jaksonLoppu = t + VerhoJakso;
                if (muutKirjattu) continue;
                muutKirjattu = true;
                var muut = new List<string>();
                foreach (var a in FindObjectsByType<AudioSource>(FindObjectsInactive.Exclude, FindObjectsSortMode.None))
                    if (a != lahde && a.isPlaying && a.volume > 0.01f) muut.Add($"{a.gameObject.name}@{a.volume:0.00}");
                sb.Append($" (muut: {(muut.Count > 0 ? string.Join(", ", muut) : "-")})");
            }
            Debug.Log(sb.ToString());
        }

        static float Rms(float[] d)
        {
            double s = 0;
            for (int i = 0; i < d.Length; i++) s += d[i] * d[i];
            return Mathf.Sqrt((float)(s / d.Length));
        }

        /// <summary>Valmiin virran tavut välimuistitiedostoon (atominen siirto). false, jos tavuja ei saatu.</summary>
        bool Tallenna(DownloadHandlerAudioClip dh, string tiedosto, bool hiljaa = false)
        {
            try
            {
                var tavut = dh.data;
                if (tavut == null || tavut.Length == 0) { if (!hiljaa) Debug.LogWarning("MATKAKIRJA puhe: virran tavuja ei saatu talteen"); return false; }
                Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                string valiaikainen = tiedosto + ".virta";
                File.WriteAllBytes(valiaikainen, tavut);
                if (File.Exists(tiedosto)) File.Delete(tiedosto);
                File.Move(valiaikainen, tiedosto);
                return true;
            }
            catch (Exception e) { if (!hiljaa) ViimeVirhe = e.Message; Debug.LogWarning("MATKAKIRJA puhe: virran tallennus: " + e.Message); return false; }
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
            if (HidasMs > 0 && Time.unscaledTime < hidasLoppu) System.Threading.Thread.Sleep(HidasMs);
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
        // Jokaisen puheen alussa (ennen: vain sovelluksen ensimmäisestä puheesta, staattinen lippu — kärki 30.9.2026):
        // kevyt luokan tarkistus, korjaus vain Ambientista (AaniIstunto.Varmista, MatkakirjaAani.mm).
        static void AsetaIstunto() => AaniIstunto.Varmista();
#else
        static void AsetaIstunto() { }
#endif
    }
}
