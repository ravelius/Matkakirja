// PALLON ÄÄNIMAISEMA, UNITY-OSA (Pelikoodari 8.10.2026 aanet/pallo-aanimaisema-v1, PT: Tausta-säädin; Ydin PalloAanimaisema).
// Kehityskaupungeissa (Tukholma, Pariisi) kaupungin omat silmukat korvaavat KaupunkiAanimaisemaSoittimen liikenne- ja satamakerrokset
// (SilmukanUrl-koukku; muut kerrokset aanimaisema-v2:sta kuten ennen), ja kerta-äänet (vene ohi, höyrypilli, kellot) soivat
// harvakseltaan: ☰-mikserin Tausta × kaupungin äänimaiseman taso × väistö kertojan alla (OpasAanitasot.Maisema) × korkeus
// (PalloAanimaisema.Korkeudella). Äänimaisema-kytkin pois → ei kerta-ääniä. Tekijät (CC BY) Lähteissä: data/aanilahteet.json (NUI).
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class PalloAanimaisemaSoitin
    {
        public const string Juuri = KaupunkiAanimaisemaSoitin.Juuri + "pallo-aanimaisema-v1/";
        static PalloAanimaisema manifesti; static bool haettu;
        readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>();
        readonly HashSet<string> ladataan = new HashSet<string>();
        readonly Dictionary<string, double> seuraava = new Dictionary<string, double>();
        readonly System.Random rnd = new System.Random(20261008);
        AudioSource lahde; float perus;
        string kaupunki;

        /// <summary>Joka kehys oppaasta: kaupunki (null = ei kaupunkitilaa), kameran korkeus maasta (m).</summary>
        public void Paivita(MonoBehaviour isanta, string kaupunkiId, double korkeusM)
        {
            if (!haettu && isanta != null) { haettu = true; isanta.StartCoroutine(HaeManifesti()); }
            kaupunki = kaupunkiId != null && Matkakirja.Linssit.Kehityskaupungit.On(kaupunkiId) ? kaupunkiId : null;
            if (manifesti == null || isanta == null) return;
            float voima = (float)(OpasAanitasot.Maisema(PalloAanimaisema.Korkeudella(korkeusM), OpasSovitin.OpasAaniSoi) * Asetukset.Taso(Voima.Tausta));
            if (lahde != null && lahde.isPlaying) lahde.volume = (float)OpasAanitasot.Liuku(lahde.volume, voima * perus, Time.unscaledDeltaTime);
            if (kaupunki == null || !Asetukset.Paalla(Kytkin.Aanimaisema) || !manifesti.Kaupungit.TryGetValue(kaupunki, out var l)) return;
            double nyt = Time.unscaledTimeAsDouble;
            foreach (var a in l)
            {
                if (a.Silmukka) continue;
                string avain = kaupunki + "/" + a.Tunnus;
                if (!seuraava.TryGetValue(avain, out double t)) { seuraava[avain] = nyt + PalloAanimaisema.Vali(a.Tunnus, rnd) * 0.5; continue; }
                if (nyt < t) continue;
                if (!klipit.TryGetValue(a.Polku, out var c)) { if (ladataan.Add(a.Polku)) isanta.StartCoroutine(Lataa(a.Polku)); continue; }
                seuraava[avain] = nyt + PalloAanimaisema.Vali(a.Tunnus, rnd);
                if (c == null || (lahde != null && lahde.isPlaying)) continue;   // yksi kerta-ääni kerrallaan
                if (lahde == null) { lahde = isanta.gameObject.AddComponent<AudioSource>(); lahde.playOnAwake = false; lahde.spatialBlend = 0; lahde.loop = false; }
                perus = a.Tunnus == "hoyrypilli" ? 0.7f : 0.85f;
                lahde.clip = c; lahde.volume = voima * perus; lahde.Play();
                Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema {avain} ({lahde.volume:F2})");
            }
        }

        static IEnumerator HaeManifesti()
        {
            using var r = UnityWebRequest.Get(Juuri + "manifest.json");
            r.timeout = 20;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema: manifesti ei latautunut ({r.responseCode})"); yield break; }
            try { manifesti = PalloAanimaisema.Lue(r.downloadHandler.text); } catch (System.Exception e) { Debug.Log("MATKAKIRJA kaupunki: pallon äänimaisema: " + e.Message); yield break; }
            // Silmukat kaupungin äänimaiseman kerroksiksi kehityskaupungeissa; muut kerrokset ennallaan (aanimaisema-v2).
            KaupunkiAanimaisemaSoitin.SilmukanUrl = kerros =>
            {
                string id = OpasSovitin.NykyinenKaupunkiId;
                string p = id != null && Matkakirja.Linssit.Kehityskaupungit.On(id) ? manifesti.KerroksenPolku(id, kerros) : null;
                return p != null ? Juuri + p : KaupunkiAanimaisemaSoitin.Juuri + "aanimaisema-v2/" + kerros + "-01.mp3";
            };
            Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema: {manifesti.Kaupungit.Count} kaupunkia");
        }

        IEnumerator Lataa(string polku)
        {
            using var r = UnityWebRequestMultimedia.GetAudioClip(Juuri + polku, AudioType.MPEG);
            r.timeout = 30;
            yield return r.SendWebRequest();
            ladataan.Remove(polku);
            klipit[polku] = r.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(r) : null;
        }

        public void Sulje()
        {
            if (lahde != null) { lahde.Stop(); Object.Destroy(lahde); lahde = null; }
            seuraava.Clear();
        }
    }
}
