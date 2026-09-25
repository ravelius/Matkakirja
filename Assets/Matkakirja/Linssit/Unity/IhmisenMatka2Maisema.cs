// IHMISEN MATKA II: AIDOT ÄÄNIMAISEMAT (erä 4; Raamattu LINSSIEN AIDOT AANIMAISEMAT 7.9.2026, omistaja: "aitoja, jossain
// nauhoitettuja, missä voisi olla eri paikkojen äänimaisemaa"; web js/linssit/ihmisen-matka-aanimaisema.js, jota webissä
// ei vielä kutsuta).
//
// Tiedostot ja manifesti ovat ämpärissä (aanet/tehosteet/ihmisen-matka/, aanihaku-työnkulku, Freesound CC0/CC BY; tekijät
// manifestissa). Jakson tekninen kenttä `maisema` (KertomusJakso.Maisema) valitsee tyypin; null = hiljaisuus (avaus).
//
//   SAMA TYYPPI PERÄKKÄIN EI TEE MITÄÄN: kolme savannijaksoa on yksi katkeamaton savanni.
//   VAIHTO: ristihäivytys RistiS (web RISTI_MS 2500, omistajan mitta 2–3 s).
//   SILMUKAN SAUMA: kenttä-äänitteen alku ja loppu eivät osu yhteen, joten kierroksen lopussa (RistiS ennen) aloitetaan
//   uusi kierros toisella lähteellä ja vanha häivytetään sen alta (web sama koneisto).
//   TASO: Voima (web MAISEMAN_VOIMA 0,10) × pelaajan taustataso; kertojan puheen alla väistö (web lisaaVaistaja).
//   Asetus "Äänimaisema" pois tai sovellus mykistetty → hiljaa. Puuttuva manifesti tai tiedosto on hiljaisuus, ei virhe.
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatka2Maisema : MonoBehaviour
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/tehosteet/ihmisen-matka/";
        public const string Manifesti = Juuri + "manifesti.json";
        /// <summary>Taso (web MAISEMAN_VOIMA): kuulokokeen nuppi, omistaja säätää laitteellaan.</summary>
        public const float MaisemanVoima = 0.10f;
        /// <summary>Väistö kertojan puheen alla (osuus tasosta).</summary>
        public const float Vaisto = 0.7f;
        /// <summary>Ristihäivytys ja silmukan sauma (s).</summary>
        public const float RistiS = 2.5f;
        /// <summary>Lopetuksen häivytys (s).</summary>
        public const float LoppuS = 1.2f;

        static Dictionary<string, string> tiedostot;   // tunnus → tiedosto (manifesti, istunnon välimuisti)
        static bool manifestiHaettu;
        static readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>();

        /// <summary>Soiko kertoja juuri nyt (väistö); IhmisenMatka2Tehosteet asettaa.</summary>
        public System.Func<bool> KertojaSoi;

        AudioSource a, b;          // vuorotellen: kärki (nouseva) ja hiipuva
        AudioSource karki, hiipuva;
        float karjenKerroin, hiipuvanKerroin;
        string tyyppi, haluttu;
        bool lopetus;

        public static IhmisenMatka2Maisema Luo(Transform isanta)
        {
            var m = new GameObject("Aanimaisema").AddComponent<IhmisenMatka2Maisema>();
            m.transform.SetParent(isanta, false);
            m.a = m.UusiLahde();
            m.b = m.UusiLahde();
            if (!manifestiHaettu) m.StartCoroutine(HaeManifesti());
            return m;
        }

        AudioSource UusiLahde()
        {
            var s = gameObject.AddComponent<AudioSource>();
            s.playOnAwake = false;
            s.loop = false;
            s.spatialBlend = 0;
            s.volume = 0;
            return s;
        }

        static IEnumerator HaeManifesti()
        {
            manifestiHaettu = true;
            using var p = UnityWebRequest.Get(Manifesti);
            p.timeout = 15;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success) { tiedostot = new Dictionary<string, string>(); yield break; }
            var t = new Dictionary<string, string>();
            if (Matkakirja.Peli.MiniJson.Jasenna(p.downloadHandler.text) is Dictionary<string, object> m
                && m.TryGetValue("tehosteet", out var l) && l is List<object> lista)
                foreach (var o in lista)
                    if (o is Dictionary<string, object> r && r.TryGetValue("tunnus", out var tu) && tu is string tunnus
                        && r.TryGetValue("tiedosto", out var ti) && ti is string tiedosto)
                        t[tunnus] = tiedosto;
            tiedostot = t;
            LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: äänimaisemia {t.Count}");
        }

        /// <summary>Jakson maisema (tunnus tai null = hiljaisuus). Sama tyyppi jatkuu katkeamatta.</summary>
        public void Aseta(string tunnus)
        {
            // Jakso = esitys käynnissä. Lopetus (esityksen loppu tai muistista avattu tutkimusvaihe, joka kutsuu Loppua)
            // ei saa vaientaa uutta esitystä: "Aloita alusta" soittaa maisemat uudelleen (simulaattori 25.9.: maisema
            // ei soinut lainkaan, koska linssi avautui tutkimusvaiheeseen ennen "esitys alusta" -komentoa).
            lopetus = false;
            haluttu = tunnus;
            if (tunnus == tyyppi) return;
            if (tunnus == null) { Vaihda(null, null); return; }
            StartCoroutine(LataaJaVaihda(tunnus));
        }

        IEnumerator LataaJaVaihda(string tunnus)
        {
            for (float t = 0; tiedostot == null && t < 20f; t += Time.unscaledDeltaTime) yield return null;
            if (tiedostot == null || !tiedostot.TryGetValue(tunnus, out var tiedosto)) yield break;   // hiljaisuus
            if (!klipit.TryGetValue(tunnus, out var klippi) || klippi == null)
            {
                using var p = UnityWebRequestMultimedia.GetAudioClip(Juuri + tiedosto, AudioType.MPEG);
                var dh = (DownloadHandlerAudioClip)p.downloadHandler;
                dh.streamAudio = false;
                dh.compressed = true;   // pakattuna muistiin (kuten kertoja): ei pitkää purkua pääsäikeessä
                yield return p.SendWebRequest();
                if (p.result != UnityWebRequest.Result.Success)
                {
                    LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: maisema {tunnus} ei latautunut ({p.error})");
                    yield break;
                }
                klippi = DownloadHandlerAudioClip.GetContent(p);
                klippi.name = "maisema-" + tunnus;
                klipit[tunnus] = klippi;
            }
            if (haluttu != tunnus || lopetus) yield break;   // jakso vaihtui latauksen aikana
            if (tyyppi == tunnus) yield break;   // toinen lataus ehti ensin (jaksot edestakaisin): ei alkua uudelleen
            Vaihda(tunnus, klippi);
            LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: maisema {tunnus} ({klippi.length:F0} s)");
        }

        /// <summary>Ristihäivytys uuteen klippiin (null = häivytys hiljaisuuteen). Kesken oleva hiipuva katkaistaan.</summary>
        void Vaihda(string tunnus, AudioClip klippi)
        {
            tyyppi = tunnus;
            if (hiipuva != null) { hiipuva.Stop(); hiipuva.volume = 0; }
            hiipuva = karki != null && karki.isPlaying ? karki : null;
            hiipuvanKerroin = karjenKerroin;
            karki = null;
            karjenKerroin = 0;
            if (klippi == null) return;
            karki = hiipuva == a ? b : a;
            karki.clip = klippi;
            karki.volume = 0;
            karki.time = 0;
            karki.Play();
        }

        /// <summary>Linssi sulkeutuu tai esitys loppuu: häivytys pois.</summary>
        public void Lopeta()
        {
            lopetus = true;
            haluttu = null;
            Vaihda(null, null);
        }

        float Taso()
        {
            // Vain Äänimaisema-kytkin (koko pelin mykistys, web sfx.enabled). EI EsityksenAani.Mykistetty: se on tosi myös,
            // kun pelaaja on ottanut pelkän kertojan pois, eikä kertojan poisto saa vaientaa paikkojen ääniä.
            if (!Asetukset.Paalla(Kytkin.Aanimaisema)) return 0f;
            float t = MaisemanVoima * Asetukset.Taso(Voima.Tausta);
            return KertojaSoi != null && KertojaSoi() ? t * Vaisto : t;
        }

        void Update()
        {
            float dt = Time.unscaledDeltaTime, taso = Taso();
            if (karki != null)
            {
                karjenKerroin = Mathf.MoveTowards(karjenKerroin, 1f, dt / RistiS);
                karki.volume = taso * karjenKerroin;
                // Silmukan sauma: uusi kierros toisella lähteellä ristihäivytyksen verran ennen loppua.
                if (karki.clip != null && karki.clip.length > RistiS * 2 && karki.time >= karki.clip.length - RistiS)
                {
                    Vaihda(tyyppi, karki.clip);
                    LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: maisema {tyyppi} sauma");
                }
            }
            if (hiipuva != null)
            {
                hiipuvanKerroin = Mathf.MoveTowards(hiipuvanKerroin, 0f, dt / (lopetus ? LoppuS : RistiS));
                hiipuva.volume = taso * hiipuvanKerroin;
                if (hiipuvanKerroin <= 0f) { hiipuva.Stop(); hiipuva = null; }
            }
        }
    }
}
