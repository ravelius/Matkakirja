// KAUPUNKIÄÄNIMAISEMAN SOITIN (Siirtoseppä 6.10.2026, pilotti Pariisi/Venetsia/Kööpenhamina; uudelleenkäytettävä myös linnassa):
// Ytimen KaupunkiAanimaisema (tasot, alipäästö, suhina, väistö) Unityn omilla AudioSourceilla, ei FMODia/Wwiseä.
//  - silmukat: SilmukanUrl(kerros) → ladataan välimuistiin (temporaryCachePath) ja soitetaan file://-suoratoistona (streamAudio),
//    joten muistiin ei pureta koko silmukkaa; lähde luodaan vasta, kun kerros nousee kuuluvaksi, ja vapautetaan hiljaa 5 s jälkeen.
//  - kaupunkikerroksilla AudioLowPassFilter (korkeus → humina); sade ja tuuli ilman suodinta.
//  - suhina: proseduraalinen kaistanpäästetty kohina (Ydin Kohina + Biquad) omassa lähteessä OnAudioFilterReadilla.
//  - kellot: tasatunnein TasatunninLyonnit, kirkkojen määrä äänikartasta (KirkkojaLahella), KelloUrl kertasoittona.
//  - puhe: Aanisoitin-tilan Voimassa < 1 (kertoja/Pulu) tai OpasSovitin.OpasAaniSoi (William, siltalause) → väistö; Äänimaisema-
//    kytkin ja testimykistys hiljentävät.
// Syötteet asetetaan ulkoa: Kamera (LS1: korkeus, nopeus, kohteen lat/lon), Aanikartta ja SilmukanUrl (Pelikoodari), Sade (COZY).
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Aanet;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiAanimaisemaSoitin : MonoBehaviour
    {
        public static Func<(double KorkeusM, double NopeusMs, double Lat, double Lon)?> Kamera;
        public static Func<double, double, IReadOnlyDictionary<string, double>> Aanikartta;
        public static Func<double, double, int> KirkkojaLahella;
        public static Func<string, string> SilmukanUrl;
        public static Func<double> Sade;
        public static string KelloUrl = Juuri + "aanimaisema-v1/kello-01.mp3";
        /// <summary>Kaupungin tunnus (LS1: oppaan kaupunki); äänikartta ladataan Juuri + "aanikartta-v1/&lt;id&gt;.json" (Pelikoodari).</summary>
        public static Func<string> KaupunkiId;
        public const string Juuri = "https://media.matkakirja.app/aanet/";
        AaniKartta kartta; string karttaId, karttaLadataan;
        public const float Taso = 0.55f, KelloTaso = 0.35f, VapautusS = 5f;

        static KaupunkiAanimaisemaSoitin instanssi;

        // OPPAAN KYTKENTÄ (LS1 73a0379f, kytkentä toisin päin: OpasSovitin ei tunne soitinta): vahti lukee joka kehys
        // OpasSovitin.KaupunkiNakyvissa (päälle/pois), KaupunkiKamera (korkeus, nopeus, kohde) ja OpasAaniSoi (Williamin väistö).
        // Ulkoa asetetut Kamera/KaupunkiId/Aanikartta voittavat (linna ja testit).
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Vahti() => DontDestroyOnLoad(new GameObject("Kaupunkiäänimaisema vahti").AddComponent<OppaanVahti>().gameObject);

        sealed class OppaanVahti : MonoBehaviour
        {
            void Update()
            {
                bool nakyy = OpasSovitin.KaupunkiNakyvissa;
                if (nakyy != (instanssi != null)) Kaytossa(nakyy);
            }
        }

        static (double KorkeusM, double NopeusMs, double Lat, double Lon)? OppaanKamera()
        {
            var k = OpasSovitin.KaupunkiKamera;
            return k.HasValue ? (k.Value.korkeusM, k.Value.nopeusMs, k.Value.lat, k.Value.lon) : ((double, double, double, double)?)null;
        }

        /// <summary>Kaupungin tunnus äänikartalle nimestä (Kööpenhamina → koopenhamina): pienet kirjaimet, ä/å → a, ö → o, välit → -.</summary>
        public static string Tunnus(string nimi)
        {
            if (string.IsNullOrEmpty(nimi)) return null;
            var sb = new System.Text.StringBuilder();
            foreach (char c0 in nimi.ToLowerInvariant())
            {
                char c = c0 == 'ä' || c0 == 'å' || c0 == 'á' || c0 == 'à' ? 'a' : c0 == 'ö' || c0 == 'ø' || c0 == 'ó' ? 'o' : c0 == 'é' || c0 == 'è' ? 'e' : c0;
                if (char.IsLetterOrDigit(c)) sb.Append(c); else if (c == ' ' || c == '-') sb.Append('-');
            }
            return sb.ToString();
        }
        readonly KaupunkiAanimaisema mikseri = new KaupunkiAanimaisema();
        readonly AudioSource[] lahteet = new AudioSource[KaupunkiAanimaisema.Kerrokset.Length];
        readonly float[] hiljaaAlkaen = new float[KaupunkiAanimaisema.Kerrokset.Length];
        readonly HashSet<string> ladataan = new HashSet<string>();
        IReadOnlyDictionary<string, double> painot;
        double karttaLat = double.NaN, karttaLon = double.NaN;
        int edellinenTunti = -1;
        Suhina suhina;
        AudioClip kello;

        /// <summary>Käynnistä (oppaan avaus) tai lopeta (sulku). Tila ja lähteet nollautuvat.</summary>
        public static void Kaytossa(bool paalla)
        {
            if (paalla && instanssi == null)
            {
                instanssi = new GameObject("Kaupunkiäänimaisema").AddComponent<KaupunkiAanimaisemaSoitin>();
                DontDestroyOnLoad(instanssi.gameObject);
                Debug.Log("MATKAKIRJA äänimaisema: päällä");
            }
            else if (!paalla && instanssi != null) { Destroy(instanssi.gameObject); instanssi = null; Debug.Log("MATKAKIRJA äänimaisema: pois"); }
        }

        void Awake()
        {
            var sg = new GameObject("suhina"); sg.transform.SetParent(transform, false);
            var sl = sg.AddComponent<AudioSource>(); sl.playOnAwake = false; sl.spatialBlend = 0; sl.loop = true;
            sl.clip = AudioClip.Create("suhina", 1, 1, AudioSettings.outputSampleRate, false); sl.Play();
            suhina = sg.AddComponent<Suhina>();
            if (!string.IsNullOrEmpty(KelloUrl)) StartCoroutine(Lataa(KelloUrl, c => kello = c));
        }

        void Update()
        {
            var k = Kamera != null ? Kamera() : OppaanKamera();
            string id = KaupunkiId != null ? KaupunkiId() : Tunnus(OpasSovitin.Aloituskaupunki);
            if (!string.IsNullOrEmpty(id) && id != karttaId && id != karttaLadataan) StartCoroutine(LataaKartta(id));
            var tila = Aanisoitin.Instanssi?.Tila;
            bool paalla = (tila?.Aanimaisema ?? Asetukset.Paalla(Kytkin.Aanimaisema)) && !(TestiMykistys.Paalla && !AaniKaappaus.Kaynnissa);
            if (k.HasValue && (double.IsNaN(karttaLat) || Etaisyys(k.Value.Lat, k.Value.Lon, karttaLat, karttaLon) > 80))
            {
                karttaLat = k.Value.Lat; karttaLon = k.Value.Lon;
                painot = Aanikartta != null ? Aanikartta(karttaLat, karttaLon) : kartta?.Painot(karttaLat, karttaLon);
            }
            double tunti = k.HasValue ? Matkakirja.Linssit.Kierros.KaupunkiValo.PaikallinenTunti(DateTime.UtcNow, k.Value.Lon) : 12;
            mikseri.Paivita(new KaupunkiAanimaisema.Syote
            {
                Painot = painot, KorkeusM = k?.KorkeusM ?? 100, NopeusMs = k?.NopeusMs ?? 0, Tunti = tunti,
                Sade = Sade?.Invoke() ?? 0, Puhe = (tila != null && tila.Voimassa < 0.999) || OpasSovitin.OpasAaniSoi, Paalla = paalla && k.HasValue,
            }, Time.unscaledDeltaTime);
            float kokonais = (float)mikseri.Kokonais * Taso;
            for (int i = 0; i < lahteet.Length; i++)
            {
                float t = (float)mikseri.Tasot[i] * kokonais;
                var l = lahteet[i];
                if (t > 0.001f && l == null) { Avaa(i); continue; }
                if (l == null) continue;
                l.volume = t;
                if (l.TryGetComponent<AudioLowPassFilter>(out var f)) f.cutoffFrequency = (float)mikseri.Alipaasto;
                if (t <= 0.001f) { if (hiljaaAlkaen[i] <= 0) hiljaaAlkaen[i] = Time.unscaledTime; else if (Time.unscaledTime - hiljaaAlkaen[i] > VapautusS) Vapauta(i); }
                else hiljaaAlkaen[i] = 0;
            }
            suhina.Taso = (float)(mikseri.Suhina * mikseri.Kokonais);
            // Tasatunti: lyönnit hajautettuina kirkoittain (vain kun maisema kuuluu).
            int h = (int)Math.Floor(tunti);
            if (edellinenTunti >= 0 && h != edellinenTunti && kello != null && paalla && k.HasValue)
            {
                int kirkkoja = KirkkojaLahella?.Invoke(k.Value.Lat, k.Value.Lon) ?? kartta?.KirkkojaLahella(k.Value.Lat, k.Value.Lon) ?? 0;
                foreach (var (viive, kirkko) in KaupunkiAanimaisema.TasatunninLyonnit(h, Math.Min(kirkkoja, 3), (int)(karttaLat * 1000)))
                    StartCoroutine(Lyo(viive, KelloTaso * (kirkko == 0 ? 1f : 0.6f) * kokonais));
            }
            edellinenTunti = h;
        }

        // AINEISTOINDEKSI (Pelikoodari 6.10.: ämpäri ja CDN välimuistittavat 404:n): kartta haetaan vain, jos id on Pöllön
        // /opas/aineistot-listalla {"aanikartta":[…]}. Indeksi kerran istunnossa; epäonnistunut haku yritetään uudelleen 60 s päästä.
        static HashSet<string> karttaIndeksi;
        static float indeksiYritys = -999f;

        IEnumerator LataaKartta(string id)
        {
            karttaLadataan = id;
            if (karttaIndeksi == null)
            {
                if (Time.unscaledTime - indeksiYritys < 60f) { karttaLadataan = null; yield break; }
                indeksiYritys = Time.unscaledTime;
                using var ir = UnityWebRequest.Get(Matkakirja.Peli.Lukijaaani.Palvelin + "/opas/aineistot");
                ir.timeout = 10;
                ir.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                yield return ir.SendWebRequest();
                if (ir.result == UnityWebRequest.Result.Success && Matkakirja.Peli.MiniJson.Jasenna(ir.downloadHandler.text) is Dictionary<string, object> io)
                {
                    karttaIndeksi = new HashSet<string>();
                    foreach (var x in Matkakirja.Peli.MiniJson.TaulukkoTaiTyhja(Matkakirja.Peli.MiniJson.Kentta(io, "aanikartta"))) if (x is string sx) karttaIndeksi.Add(sx);
                    Debug.Log($"MATKAKIRJA äänimaisema: aineistoindeksi {karttaIndeksi.Count} äänikarttaa");
                }
                else { Debug.Log($"MATKAKIRJA äänimaisema: aineistoindeksi ei saatavilla ({ir.error})"); karttaLadataan = null; yield break; }
            }
            if (!karttaIndeksi.Contains(id)) { karttaId = id; karttaLadataan = null; Debug.Log($"MATKAKIRJA äänimaisema: ei äänikarttaa kaupungille {id}"); yield break; }
            using var r = UnityWebRequest.Get(Juuri + "aanikartta-v1/" + id + ".json");
            yield return r.SendWebRequest();
            karttaLadataan = null;
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA äänimaisema: äänikartta {id}: {r.error}"); karttaId = id; yield break; }
            try { kartta = AaniKartta.Lue(r.downloadHandler.text); karttaId = id; karttaLat = double.NaN; Debug.Log($"MATKAKIRJA äänimaisema: äänikartta {id} {kartta.Rivit}×{kartta.Sarakkeet}, {kartta.Ruudut.Count} kerrosta, {kartta.Kirkot.Count} kirkkoa"); }
            catch (Exception e) { Debug.Log($"MATKAKIRJA äänimaisema: äänikartta {id} virheellinen: {e.Message}"); karttaId = id; }
        }

        IEnumerator Lyo(double viive, float taso)
        {
            yield return new WaitForSecondsRealtime((float)viive);
            var l = gameObject.AddComponent<AudioSource>(); l.spatialBlend = 0; l.PlayOneShot(kello, taso);
            Destroy(l, kello.length + 0.5f);
        }

        void Avaa(int i)
        {
            string kerros = KaupunkiAanimaisema.Kerrokset[i];
            // Oletus: Pelikoodarin nimeäminen aanimaisema-v1/<kerros>-01.mp3 (aanimaisema.json korvaa, kun se on).
            string url = SilmukanUrl != null ? SilmukanUrl(kerros) : Juuri + "aanimaisema-v1/" + kerros + "-01.mp3";
            if (string.IsNullOrEmpty(url) || !ladataan.Add(kerros)) return;
            StartCoroutine(Lataa(url, c =>
            {
                ladataan.Remove(kerros);
                if (c == null || this == null || lahteet[i] != null) return;
                var g = new GameObject(kerros); g.transform.SetParent(transform, false);
                var l = g.AddComponent<AudioSource>(); l.clip = c; l.loop = true; l.spatialBlend = 0; l.volume = 0; l.playOnAwake = false;
                // Satunnainen alkukohta: samat silmukat eivät ala samasta tahdista joka kohteessa.
                if (c.length > 1) l.time = UnityEngine.Random.Range(0f, c.length * 0.9f);
                if (kerros != KaupunkiAanimaisema.Sade && kerros != KaupunkiAanimaisema.Tuuli) g.AddComponent<AudioLowPassFilter>().cutoffFrequency = 22000;
                l.Play();
                lahteet[i] = l; hiljaaAlkaen[i] = 0;
                Debug.Log($"MATKAKIRJA äänimaisema: {kerros} soi ({c.length:F0} s)");
            }));
        }

        void Vapauta(int i)
        {
            var c = lahteet[i].clip;
            Destroy(lahteet[i].gameObject); lahteet[i] = null; hiljaaAlkaen[i] = 0;
            if (c != null) Destroy(c);
        }

        /// <summary>Silmukka välimuistiin (ensimmäinen kerta) ja file://-suoratoistona soittoon (ei koko PCM:ää muistiin).</summary>
        static IEnumerator Lataa(string url, Action<AudioClip> valmis)
        {
            string tiedosto = Path.Combine(Application.temporaryCachePath, "aanimaisema", Hash(url) + Path.GetExtension(new Uri(url).AbsolutePath));
            if (!File.Exists(tiedosto))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                using var r = UnityWebRequest.Get(url);
                r.downloadHandler = new DownloadHandlerFile(tiedosto) { removeFileOnAbort = true };
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA äänimaisema: lataus epäonnistui {url}: {r.error}"); valmis(null); yield break; }
            }
            var tyyppi = tiedosto.EndsWith(".wav", StringComparison.OrdinalIgnoreCase) ? AudioType.WAV : AudioType.MPEG;
            using var a = UnityWebRequestMultimedia.GetAudioClip("file://" + tiedosto, tyyppi);
            ((DownloadHandlerAudioClip)a.downloadHandler).streamAudio = true;
            yield return a.SendWebRequest();
            valmis(a.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(a) : null);
        }

        static string Hash(string s) { unchecked { ulong h = 1469598103934665603; foreach (char c in s) { h ^= c; h *= 1099511628211; } return h.ToString("x16"); } }

        static double Etaisyys(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180, x = (lon2 - lon1) * r * Math.Cos((lat1 + lat2) * 0.5 * r), y = (lat2 - lat1) * r;
            return Math.Sqrt(x * x + y * y) * 6371000;
        }

        /// <summary>Proseduraalinen suhina: kaistanpäästetty kohina (~600 Hz–2,5 kHz), taso liukuu pehmeästi audiosäikeessä.</summary>
        sealed class Suhina : MonoBehaviour
        {
            public volatile float Taso;
            Kohina kohina = new Kohina(0x51A7u);
            Biquad ali, yli;
            float nyt;
            int taajuus;

            void Awake()
            {
                taajuus = AudioSettings.outputSampleRate;
                ali.Aseta(Suodin.Alipaasto, 2500, 0.7, taajuus);
                yli.Aseta(Suodin.Ylipaasto, 600, 0.7, taajuus);
            }

            void OnAudioFilterRead(float[] data, int kanavia)
            {
                float tavoite = Taso, k = 1f / (taajuus * 0.15f);
                for (int i = 0; i < data.Length; i += kanavia)
                {
                    nyt += (tavoite - nyt) * k;
                    float x = yli.Suodata(ali.Suodata(kohina.Seuraava())) * nyt * 0.5f;
                    for (int c = 0; c < kanavia; c++) data[i + c] = x;
                }
            }
        }
    }
}
