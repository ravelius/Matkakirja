// MAAILMANRADION ÄÄNET Unityssä: suora lähetys (RadioVirta, iOS AVPlayer -liitännäinen
// Plugins/iOS/MatkakirjaRadio.mm) ja viritysääni (RadioViritin, webin aidot äänitteet
// js/packs/viritysaanet.js, media.matkakirja.app/audio/).
//
// Editorissa ja simulaattorittomassa ajossa ei ole AVPlayeria: RadioVirta ilmoittaa
// lähetyksen kuuluvaksi 0,8 s:n kuluttua ilman ääntä, jotta tilakoneen voi ajaa läpi.
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Matkakirja.Linssit.Radio;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public class RadioVirta : MonoBehaviour, IRadioVirta
    {
#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaRadio_Avaa(string osoite);
        [DllImport("__Internal")] static extern void MatkakirjaRadio_Sulje();
        [DllImport("__Internal")] static extern void MatkakirjaRadio_Voimakkuus(float arvo);
        [DllImport("__Internal")] static extern int MatkakirjaRadio_Tila();
        [DllImport("__Internal")] static extern void MatkakirjaRadio_Tauko(int paalle);
        [DllImport("__Internal")] static extern string MatkakirjaRadio_Kuvaus();
#else
        float aukesi = -1;
        static void MatkakirjaRadio_Voimakkuus(float arvo) { }
#endif
        bool auki;

        /*
         * YKSI SOITIN, OMISTAJALUKKO (Natiivi-UI:n mediarivi 24.9.): MatkakirjaRadio.mm:ssä on yksi
         * globaali AVPlayer, jota maailmanradio ja lehden mediarivi käyttävät omilla RadioVirta-
         * instansseillaan. Web radio.js: "LINSSIN OMA VIRITYS VOITTAA" — radiolinssin virta
         * (Etusija) ei väisty lehden tieltä, ja vain soittimen nykyinen omistaja saa sulkea sen,
         * joten suljettu lehti ei katkaise linssin lähetystä.
         */
        static RadioVirta omistaja;
        /// <summary>Radiolinssin virta: ei väisty muiden (lehden mediarivi) tieltä.</summary>
        public bool Etusija;
        /// <summary>Avaus hylättiin, koska radiolinssi soittaa (Varattu).</summary>
        public bool Estetty { get; private set; }
        /// <summary>Radiolinssin lähetys soi tai virittyy: muut eivät saa soittaa (UI: näytä syy).</summary>
        public static bool Varattu => omistaja != null && omistaja.auki && omistaja.Etusija;
        bool Oma => ReferenceEquals(omistaja, this);

        public static RadioVirta Luo(Transform isanta, bool etusija = false)
        {
            var go = new GameObject("RadioVirta");
            go.transform.SetParent(isanta, false);
            var v = go.AddComponent<RadioVirta>();
            v.Etusija = etusija;
            return v;
        }

        public void Avaa(string url, string tyyppi)
        {
            Estetty = false;
            if (!Etusija && Varattu && !Oma) { Estetty = true; auki = false; return; }
            if (omistaja != null && !Oma) omistaja.auki = false;   // edellinen menettää soittimen
            omistaja = this;
            auki = true;
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaRadio_Avaa(url);
#else
            aukesi = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA radio: (editori) avaa {url} [{tyyppi}] ilman ääntä");
#endif
        }

        public void Sulje()
        {
            if (!auki) return;
            auki = false;
            if (!Oma) return;   // soitin on jo toisen: ei katkaista sitä
            omistaja = null;
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaRadio_Sulje();
#else
            aukesi = -1;
#endif
        }

        public float Voimakkuus { set { if (Oma) MatkakirjaRadio_Voimakkuus(value); } }

        /// <summary>Tauko: AVPlayer pause/play (yhteys jää, RadioLinssi ei lue Kuuluu-tilaa tauolla).</summary>
        public void Tauko(bool paalle)
        {
            if (!auki || !Oma) return;
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaRadio_Tauko(paalle ? 1 : 0);
#else
            Debug.Log($"MATKAKIRJA radio: (editori) tauko {paalle}");
#endif
        }

        int Tila
        {
            get
            {
                if (!auki || !Oma) return 0;
#if UNITY_IOS && !UNITY_EDITOR
                return MatkakirjaRadio_Tila();
#else
                return aukesi >= 0 && Time.unscaledTime - aukesi > 0.8f ? 2 : 1;
#endif
            }
        }

        public bool Kuuluu => Tila == 2;

        /// <summary>Soittimen tila lokiin (virheen tai aikakatkaisun hetkellä): AVPlayerin tilat, syyt ja istunto.</summary>
        public string Kuvaus =>
#if UNITY_IOS && !UNITY_EDITOR
            MatkakirjaRadio_Kuvaus() ?? "-";
#else
            $"(editori) auki {auki}, tila {Tila}";
#endif
        public string Virhe => Estetty ? "Radiolinssi soi" : Tila switch { 3 => "Asema ei vastaa", 4 => "Lähetys katkesi", _ => null };

        void OnDestroy() => Sulje();
    }

    /// <summary>Viritysääni: satunnainen aito kohinaäänite silmukkana, häivytys pois lukituksessa.</summary>
    public class RadioViritin : MonoBehaviour, IViritin
    {
        readonly List<string> osoitteet = new List<string>();
        readonly Dictionary<string, AudioClip> ladatut = new Dictionary<string, AudioClip>();
        AudioSource lahde;
        float aani = 0.8f, haive, haiveAlku, haiveKesto;
        bool soi;

        public static RadioViritin Luo(Transform isanta, IEnumerable<string> aanet)
        {
            var go = new GameObject("RadioViritin");
            go.transform.SetParent(isanta, false);
            var v = go.AddComponent<RadioViritin>();
            v.osoitteet.AddRange(aanet);
            v.lahde = go.AddComponent<AudioSource>();
            v.lahde.playOnAwake = false;
            v.lahde.loop = true;
            v.lahde.spatialBlend = 0;
            // Esilataus: ensimmäinen viritys ei jää hiljaiseksi latauksen ajaksi.
            foreach (var u in v.osoitteet) v.StartCoroutine(v.Lataa(u));
            return v;
        }

        IEnumerator Lataa(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            yield return p.SendWebRequest();
            if (p.result == UnityWebRequest.Result.Success) ladatut[url] = DownloadHandlerAudioClip.GetContent(p);
            else Debug.LogWarning($"MATKAKIRJA radio: viritysääni {url} ei latautunut: {p.error}");
        }

        public float Voimakkuus { set { aani = Mathf.Clamp01(value); if (soi && haiveKesto <= 0) lahde.volume = aani; } }

        public void Aloita()
        {
            haiveKesto = 0;
            if (soi && lahde.isPlaying) { lahde.volume = aani; return; }
            var valmiit = new List<AudioClip>(ladatut.Values);
            if (valmiit.Count == 0) { soi = false; return; }
            lahde.clip = valmiit[Random.Range(0, valmiit.Count)];
            lahde.time = Random.Range(0f, Mathf.Max(0, lahde.clip.length - 1f));
            lahde.volume = aani;
            lahde.Play();
            soi = true;
        }

        public void Lopeta(double haiveS)
        {
            if (!soi) return;
            if (haiveS <= 0) { lahde.Stop(); soi = false; return; }
            haive = lahde.volume;
            haiveAlku = Time.unscaledTime;
            haiveKesto = (float)haiveS;
        }

        void Update()
        {
            if (!soi || haiveKesto <= 0) return;
            float t = (Time.unscaledTime - haiveAlku) / haiveKesto;
            // Tasatehoinen häivytys kuten lähetyksen nousu (RadioLinssi.Vaistyva).
            lahde.volume = haive * (float)RadioLinssi.Vaistyva(t);
            if (t >= 1) { lahde.Stop(); soi = false; haiveKesto = 0; }
        }

        void OnDestroy()
        {
            foreach (var c in ladatut.Values) if (c != null) Destroy(c);
        }
    }
}
