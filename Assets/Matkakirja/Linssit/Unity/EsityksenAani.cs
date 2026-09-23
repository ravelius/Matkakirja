// KERTOJAN ÄÄNI ihmisen matkan esitykselle (web js/linssit/ihmisen-matka-luenta.js,
// putkitila: yksi äänite koko kertomukselle, kertomusmanifestin aikaleimat).
//
// Esitys on äänikellon varassa (Aikajana/Esitys.cs): KohtaMs on äänitteen kohta,
// ja null tarkoittaa, ettei ääni soi — silloin esitys kulkee seinäkellolla ja
// tekstin pituudesta lasketuilla varakestoilla. Siksi lataus saa epäonnistua
// hiljaa: esitys ei jää odottamaan ääntä.
//
// Äänitaso ja mykistys ovat Pelikoodarin (Mykistetty-koukku). Kertoja soi
// taustamusiikin yli; väistö hoidetaan ILinssiYmparisto.MusiikkiPitoon-kutsulla.
using System;
using System.Collections;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public class EsityksenAani : MonoBehaviour, IEsityksenAani
    {
        /// <summary>Onko ääni mykistetty (Pelikoodarin asetus). Mykistettynä KohtaMs on null.</summary>
        public static Func<bool> Mykistetty;

        AudioSource lahde;
        AudioClip aanite;
        double? odottavaKohta;
        bool tauolla, virhe;

        public static EsityksenAani Luo(Transform isanta, string osoite)
        {
            var a = new GameObject("Kertoja").AddComponent<EsityksenAani>();
            a.transform.SetParent(isanta, false);
            a.lahde = a.gameObject.AddComponent<AudioSource>();
            a.lahde.playOnAwake = false;
            a.lahde.spatialBlend = 0;
            if (!string.IsNullOrEmpty(osoite)) a.StartCoroutine(a.Lataa(osoite));
            else a.virhe = true;
            return a;
        }

        IEnumerator Lataa(string osoite)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(osoite, AudioType.MPEG);
            ((DownloadHandlerAudioClip)p.downloadHandler).streamAudio = false;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success)
            {
                virhe = true;
                Debug.LogWarning("MATKAKIRJA linssit: kertojan ääni ei latautunut: " + p.error);
                yield break;
            }
            aanite = DownloadHandlerAudioClip.GetContent(p);
            lahde.clip = aanite;
            if (odottavaKohta is double k && !tauolla) Aloita(k);
        }

        void Aloita(double kohtaMs)
        {
            odottavaKohta = null;
            lahde.time = Mathf.Clamp((float)(kohtaMs / 1000), 0, Mathf.Max(0, aanite.length - 0.01f));
            lahde.Play();
        }

        public void Soita(double kohtaMs)
        {
            tauolla = false;
            if (aanite == null) { odottavaKohta = kohtaMs; return; }
            Aloita(kohtaMs);
        }

        public void Tauko()
        {
            tauolla = true;
            if (lahde.isPlaying) lahde.Pause();
        }

        public void Jatka()
        {
            if (!tauolla) return;
            tauolla = false;
            if (aanite != null && lahde.time > 0) lahde.UnPause();
        }

        public void Lopeta()
        {
            odottavaKohta = null;
            lahde.Stop();
        }

        public double? KohtaMs
        {
            get
            {
                if (virhe || aanite == null || (Mykistetty?.Invoke() ?? false)) return null;
                if (!lahde.isPlaying && !tauolla) return null;
                return lahde.time * 1000.0;
            }
        }

        void Update() => lahde.mute = Mykistetty?.Invoke() ?? false;

        void OnDestroy()
        {
            if (aanite != null) Destroy(aanite);
        }
    }
}
