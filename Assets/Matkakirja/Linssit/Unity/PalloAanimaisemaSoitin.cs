// PALLON ÄÄNIMAISEMA, UNITY-OSA (Pelikoodari 8.10.2026 aanet/pallo-aanimaisema-v1, PT: Tausta-säädin; Ydin PalloAanimaisema).
// Kehityskaupungeissa (Tukholma, Pariisi) kaupungin omat silmukat korvaavat KaupunkiAanimaisemaSoittimen liikenne- ja satamakerrokset
// (SilmukanUrl-koukku; muut kerrokset aanimaisema-v2:sta kuten ennen), ja kerta-äänet (vene ohi, höyrypilli, kellot) soivat
// harvakseltaan: ☰-mikserin Tausta × kaupungin äänimaiseman taso × väistö kertojan alla (OpasAanitasot.Maisema) × korkeus
// (PalloAanimaisema.Korkeudella). Äänimaisema-kytkin pois → ei kerta-ääniä. Tekijät (CC BY) Lähteissä: data/aanilahteet.json (NUI).
// SEINE (Pelikoodari 8.10., pariisi-seine-v1): toinen manifesti yhdistetään Pariisiin; kyyhkyjen kujerrus on kaupungin oma silmukka
// (ei korvaa kerrosta), joka soi hiljaa (OmaSilmukkaTaso) omana lähteenään; jokiproomu, laivan torvi ja kyyhkyparven lähtö kerta-ääninä.
// ÄÄNIREKISTERI (Natiivi-UI 9.10., Ydin Aanimikseri): manifestin kerta-äänet ja omat silmukat pallon Äänimaisema-ryhmään tunnuksella
// <kaupunki>.<tunnus> (klipin nimi = tunnus); kerroksen korvaavat silmukat ja korkean tuulen soittaa ja rekisteröi KaupunkiAanimaisemaSoitin
// kerroksen tunnuksella. Taso = Kerroin("maisema", tunnus), joka sisältää ryhmän tason nykyisessä kontekstissa (korvaa Asetukset.Taso(Voima.Tausta)).
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
        public static readonly string[] Juuret = { Juuri, KaupunkiAanimaisemaSoitin.Juuri + "pariisi-seine-v1/" };
        public const float OmaSilmukkaTaso = 0.45f;
        /// <summary>Pallon tuuli korkealla (Pelikoodari 9.10., Sonniss, aanet/sonniss-tuulet-v1): kylmä, ohut ja puuskainen ilman lintuja;
        /// korvaa kaupungin äänimaiseman tuulikerroksen kaikissa kaupungeissa (taso korkeuden mukaan ja ☰ Sää ennallaan).</summary>
        public const string TuuliUrl = KaupunkiAanimaisemaSoitin.Juuri + "sonniss-tuulet-v1/tuuli-korkea.mp3";
        readonly Dictionary<string, AudioSource> omat = new Dictionary<string, AudioSource>();
        static PalloAanimaisema manifesti; static bool haettu;
        readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>();
        readonly HashSet<string> ladataan = new HashSet<string>();
        readonly Dictionary<string, double> seuraava = new Dictionary<string, double>();
        readonly System.Random rnd = new System.Random(20261008);
        AudioSource lahde; float perus; string lahdeOsoite;
        static readonly Dictionary<string, string> osoitteenId = new Dictionary<string, string>();

        static string AaniId(string kaupunki, string tunnus)
        {
            var sb = new System.Text.StringBuilder();
            foreach (char c in (kaupunki + "." + tunnus).ToLowerInvariant()) sb.Append((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '.' || c == '-' ? c : '-');
            return sb.ToString();
        }

        static string Nakyva(string kaupunki, string tunnus) =>
            (kaupunki.Length > 0 ? char.ToUpperInvariant(kaupunki[0]) + kaupunki.Substring(1) : kaupunki) + ": " + tunnus.Replace('-', ' ').Replace('_', ' ');

        /// <summary>Manifestin kerta-äänet ja omat silmukat rekisteriin (jokaisen manifestin jälkeen; Rekisteroi on idempotentti).</summary>
        static void Rekisteroi(PalloAanimaisema m)
        {
            foreach (var kv in m.Kaupungit)
                foreach (var a in kv.Value)
                {
                    if (a.Silmukka && PalloAanimaisema.Korvaa.ContainsKey(a.Tunnus)) continue;   // kerroksen korvaava: KaupunkiAanimaisemaSoitin
                    string id = AaniId(kv.Key, a.Tunnus);
                    osoitteenId[a.Osoite] = id;
                    Aanimikseri.Yhteinen.Rekisteroi("pallo", "maisema", id, Nakyva(kv.Key, a.Tunnus));
                }
        }

        static float Kerroin(string osoite) =>
            Aanimikseri.Yhteinen.Kerroin("maisema", osoite != null && osoitteenId.TryGetValue(osoite, out var id) ? id : null);
        string kaupunki;

        /// <summary>Joka kehys oppaasta: kaupunki (null = ei kaupunkitilaa), kameran korkeus maasta (m).</summary>
        public void Paivita(MonoBehaviour isanta, string kaupunkiId, double korkeusM)
        {
            if (!haettu && isanta != null) { haettu = true; foreach (var j in Juuret) isanta.StartCoroutine(HaeManifesti(j)); }
            kaupunki = kaupunkiId != null && Matkakirja.Linssit.Kehityskaupungit.On(kaupunkiId) ? kaupunkiId : null;
            if (manifesti == null || isanta == null) return;
            float voima = (float)OpasAanitasot.Maisema(PalloAanimaisema.Korkeudella(korkeusM), OpasSovitin.OpasAaniSoi);
            if (lahde != null && lahde.isPlaying) lahde.volume = (float)OpasAanitasot.Liuku(lahde.volume, voima * perus * Kerroin(lahdeOsoite), Time.unscaledDeltaTime);
            bool soi = kaupunki != null && Asetukset.Paalla(Kytkin.Aanimaisema);
            // Kaupungin omat silmukat (kujerrus): päälle tässä kaupungissa, muut hiljenevät ja vapautuvat.
            var halutut = new HashSet<string>();
            if (soi) foreach (var a in manifesti.OmatSilmukat(kaupunki)) halutut.Add(a.Osoite);
            foreach (var kv in new List<KeyValuePair<string, AudioSource>>(omat))
            {
                if (kv.Value == null) { omat.Remove(kv.Key); continue; }
                float tavoite = halutut.Contains(kv.Key) ? voima * OmaSilmukkaTaso * Kerroin(kv.Key) : 0f;
                kv.Value.volume = (float)OpasAanitasot.Liuku(kv.Value.volume, tavoite, Time.unscaledDeltaTime);
                if (tavoite <= 0f && kv.Value.volume < 0.002f) { Object.Destroy(kv.Value); omat.Remove(kv.Key); }
            }
            foreach (var u in halutut)
            {
                if (omat.ContainsKey(u)) continue;
                if (!klipit.TryGetValue(u, out var sc)) { if (ladataan.Add(u)) isanta.StartCoroutine(Lataa(u)); continue; }
                if (sc == null) continue;
                var ol = isanta.gameObject.AddComponent<AudioSource>(); ol.playOnAwake = false; ol.spatialBlend = 0; ol.loop = true; ol.clip = sc; ol.volume = 0f;
                ol.time = Random.Range(0f, sc.length * 0.9f); ol.Play(); omat[u] = ol;
            }
            if (!soi || !manifesti.Kaupungit.TryGetValue(kaupunki, out var l)) return;
            double nyt = Time.unscaledTimeAsDouble;
            foreach (var a in l)
            {
                if (a.Silmukka) continue;
                string avain = kaupunki + "/" + a.Tunnus;
                if (!seuraava.TryGetValue(avain, out double t)) { seuraava[avain] = nyt + PalloAanimaisema.Vali(a.Tunnus, rnd) * 0.5; continue; }
                if (nyt < t) continue;
                if (!klipit.TryGetValue(a.Osoite, out var c)) { if (ladataan.Add(a.Osoite)) isanta.StartCoroutine(Lataa(a.Osoite)); continue; }
                seuraava[avain] = nyt + PalloAanimaisema.Vali(a.Tunnus, rnd);
                if (c == null || (lahde != null && lahde.isPlaying)) continue;   // yksi kerta-ääni kerrallaan
                if (lahde == null) { lahde = isanta.gameObject.AddComponent<AudioSource>(); lahde.playOnAwake = false; lahde.spatialBlend = 0; lahde.loop = false; }
                perus = a.Tunnus == "hoyrypilli" || a.Tunnus == "laivan-torvi" ? 0.7f : 0.85f;
                lahdeOsoite = a.Osoite;
                lahde.clip = c; lahde.volume = voima * perus * Kerroin(lahdeOsoite); lahde.Play();
                Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema {avain} ({lahde.volume:F2})");
            }
        }

        static IEnumerator HaeManifesti(string juuri)
        {
            using var r = UnityWebRequest.Get(juuri + "manifest.json");
            r.timeout = 20;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema: {juuri} manifesti ei latautunut ({r.responseCode})"); yield break; }
            PalloAanimaisema uusi;
            try { uusi = PalloAanimaisema.Lue(r.downloadHandler.text, juuri); } catch (System.Exception e) { Debug.Log("MATKAKIRJA kaupunki: pallon äänimaisema: " + e.Message); yield break; }
            Rekisteroi(uusi);
            if (manifesti != null) { manifesti.Yhdista(uusi); Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema: lisätty {juuri}"); yield break; }
            manifesti = uusi;
            // Silmukat kaupungin äänimaiseman kerroksiksi kehityskaupungeissa; muut kerrokset ennallaan (aanimaisema-v2).
            KaupunkiAanimaisemaSoitin.SilmukanUrl = kerros =>
            {
                if (kerros == KaupunkiAanimaisema.Tuuli) return TuuliUrl;
                string id = OpasSovitin.NykyinenKaupunkiId;
                var a = id != null && Matkakirja.Linssit.Kehityskaupungit.On(id) ? manifesti.KerroksenAani(id, kerros) : null;
                return a != null ? a.Osoite : KaupunkiAanimaisemaSoitin.Juuri + "aanimaisema-v2/" + kerros + "-01.mp3";
            };
            Debug.Log($"MATKAKIRJA kaupunki: pallon äänimaisema: {manifesti.Kaupungit.Count} kaupunkia");
        }

        IEnumerator Lataa(string osoite)
        {
            string polku = osoite;
            using var r = UnityWebRequestMultimedia.GetAudioClip(osoite, AudioType.MPEG);
            r.timeout = 30;
            yield return r.SendWebRequest();
            ladataan.Remove(polku);
            klipit[polku] = r.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(r) : null;
            if (klipit[polku] != null && osoitteenId.TryGetValue(polku, out var id)) klipit[polku].name = id;
        }

        public void Sulje()
        {
            if (lahde != null) { lahde.Stop(); Object.Destroy(lahde); lahde = null; }
            foreach (var o in omat.Values) if (o != null) { o.Stop(); Object.Destroy(o); }
            omat.Clear(); seuraava.Clear();
        }
    }
}
