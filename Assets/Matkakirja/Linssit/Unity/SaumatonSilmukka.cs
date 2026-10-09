// SAUMATON SILMUKKA (Pelikoodari 9.10.2026, PT:n silmukkatarkistus, juna 174): iOS:n FMOD ei leikkaa MP3:n kooderiviivettä eikä
// täytettä, joten AudioSource.loop = true soitti jokaisessa saumassa ~51 ms hiljaisuutta (34 silmukkaa: Olavinlinnan sää ja taustat,
// 3D-silmukat ja askeleet, pallon kyyhkyt, lokkiparvi ja laivat). Kiinnita(lähde) ottaa soittimen oman AudioSourcen OHJAUSLÄHTEEKSI:
// soitin käyttää sitä kuten ennenkin (clip, Play, Stop, isPlaying, volume, pitch, time, paikka), mutta se on mykistetty, ja kaksi
// samaan GameObjectiin luotua kaksoislähdettä soittaa saman klipin saumattomasti (Ydin: Silmukkasauma):
//   Liitos (PCM-klippi, compressed = false; WAV; pakotettuna myös pakattu musiikki): kierros [Alku, Loppu) LAME-tagista
//     (AsetaTagi/HaeTagi) tai varalla alun hiljaisuudesta; edellinen päättyy SetScheduledEndTime Lopun hetkellä ja seuraava
//     PlayScheduled klipin ALUSTA Alun verran aiemmin (hakuton: alkuviive soi hiljaisuutena edellisen lopun alla).
//     Pakattu klippi saa Liitoksen, kun sen LAME-tagi on tiedossa (hakuton jatko).
//   Risti (pakattu ilman tagia, ≥ 7,5 s): 1,2 s tasatehoinen ristihäivytys kuten KaupunkiAanimaisemaSoitin ja ElavaSilmukka.
//   Tavallinen (pakattu ilman tagia < 7,5 s tai striimattu): ohjauslähde soi itse kuten ennen.
// MUISTI: ei PCM-kopioita; kaksi lisä-AudioSourcea per silmukka samalla klipillä (pakatulla klipillä ristihäivytyksen ajan kaksi
// dekooderia). Tagin haku: 8 kt Range-pyyntö per klippi. ÄÄNET: ohjauslähde mykistettynä prioriteetilla 256 (virtualisoituu ensin).
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Ajattelijat;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SaumatonSilmukka : MonoBehaviour
    {
        static readonly Dictionary<AudioClip, AjattelijaTahti.Mp3Tiedot?> tagit = new Dictionary<AudioClip, AjattelijaTahti.Mp3Tiedot?>();

        /// <summary>Klipin LAME-tagi (null = ei tagia). Ilman tagia Liitos käyttää alun hiljaisuutta (enintään FMOD:n 2257 näytettä).</summary>
        public static void AsetaTagi(AudioClip c, AjattelijaTahti.Mp3Tiedot? t) { if (c != null) tagit[c] = t; }

        /// <summary>Hakee MP3:n alun (8 kt Range) ja asettaa klipin tagin.</summary>
        public static IEnumerator HaeTagi(string url, AudioClip c)
        {
            if (c == null || string.IsNullOrEmpty(url) || tagit.ContainsKey(c)) yield break;
            using var p = UnityWebRequest.Get(url);
            p.SetRequestHeader("Range", "bytes=0-8191"); p.timeout = 15;
            yield return p.SendWebRequest();
            if (c != null) tagit[c] = p.result == UnityWebRequest.Result.Success ? AjattelijaTahti.Mp3Alku(p.downloadHandler.data) : null;
        }

        /// <summary>Tagi paikallisesta tiedostosta (välimuistiin ladatut klipit).</summary>
        public static void TagiTiedostosta(string tiedosto, AudioClip c)
        {
            if (c == null || tagit.ContainsKey(c)) return;
            try
            {
                using var f = System.IO.File.OpenRead(tiedosto);
                var b = new byte[System.Math.Min(8192, (int)f.Length)]; int n = f.Read(b, 0, b.Length);
                if (n < b.Length) System.Array.Resize(ref b, n);
                tagit[c] = AjattelijaTahti.Mp3Alku(b);
            }
            catch (System.Exception) { tagit[c] = null; }
        }

        /// <summary>Ottaa lähteen ohjaukseen (kerran); palauttaa komponentin. Soitin jatkaa lähteen käyttöä kuten ennen.</summary>
        /// <param name="pakotaLiitos">Liitos myös pakatulle klipille (musiikki: ristihäivytys rikkoisi tahdin).</param>
        public static SaumatonSilmukka Kiinnita(AudioSource ohjaus, bool pakotaLiitos = false)
        {
            if (ohjaus == null) return null;
            foreach (var x in ohjaus.GetComponents<SaumatonSilmukka>()) if (x.ohjaus == ohjaus) return x;
            var s = ohjaus.gameObject.AddComponent<SaumatonSilmukka>();
            s.ohjaus = ohjaus; s.pakotaLiitos = pakotaLiitos; ohjaus.loop = true; ohjaus.mute = true;
            s.a = s.Kaksonen(); s.b = s.Kaksonen();
            // Mykistetty ohjauslähde soi yhä (isPlaying, time): alin prioriteetti, jotta FMOD virtualisoi sen ensin (32 todellista ääntä).
            ohjaus.priority = 256;
            return s;
        }

        AudioSource ohjaus, a, b;
        AudioClip klippi;
        Silmukkasauma.Tapa tapa;
        long alku, loppu;
        bool soi, ajastettu, pakotaLiitos;
        double t0, kohta0, liitos;
        float savel, ristiAlku = -1f;

        AudioSource Kaksonen()
        {
            var s = gameObject.AddComponent<AudioSource>();
            s.playOnAwake = false; s.loop = false; s.volume = 0f;
            s.outputAudioMixerGroup = ohjaus.outputAudioMixerGroup; s.priority = ohjaus.priority;
            s.bypassEffects = ohjaus.bypassEffects; s.bypassListenerEffects = ohjaus.bypassListenerEffects; s.bypassReverbZones = ohjaus.bypassReverbZones;
            s.ignoreListenerPause = ohjaus.ignoreListenerPause; s.ignoreListenerVolume = ohjaus.ignoreListenerVolume;
            s.rolloffMode = ohjaus.rolloffMode;
            if (ohjaus.rolloffMode == AudioRolloffMode.Custom) s.SetCustomCurve(AudioSourceCurveType.CustomRolloff, ohjaus.GetCustomCurve(AudioSourceCurveType.CustomRolloff));
            Peilaa(s);
            return s;
        }

        /// <summary>Paikkaan ja etäisyyteen liittyvät asetukset ohjauslähteestä (soitin voi muuttaa niitä soiton aikana).</summary>
        void Peilaa(AudioSource s)
        {
            s.spatialBlend = ohjaus.spatialBlend; s.minDistance = ohjaus.minDistance; s.maxDistance = ohjaus.maxDistance;
            s.dopplerLevel = ohjaus.dopplerLevel; s.spread = ohjaus.spread; s.panStereo = ohjaus.panStereo; s.reverbZoneMix = ohjaus.reverbZoneMix;
        }

        void LateUpdate()
        {
            if (ohjaus == null) { Destroy(this); return; }   // OnDestroy poistaa kaksoset (soitin tuhosi lähteensä)
            var c = ohjaus.clip;
            if (!ohjaus.isPlaying || c == null || !ohjaus.enabled) { if (soi) Lopeta(); return; }
            if (!soi || c != klippi) Aloita(c);
            if (tapa == Silmukkasauma.Tapa.Tavallinen) return;
            Peilaa(a); Peilaa(b);
            if (tapa == Silmukkasauma.Tapa.Liitos) PaivitaLiitos(ohjaus.volume, ohjaus.pitch);
            else PaivitaRisti(ohjaus.volume, ohjaus.pitch);
        }

        void Aloita(AudioClip c)
        {
            Lopeta();
            klippi = c; soi = true;
            bool pakattu = c.loadType != AudioClipLoadType.DecompressOnLoad;
            tapa = c.loadType == AudioClipLoadType.Streaming ? Silmukkasauma.Tapa.Tavallinen
                : pakotaLiitos ? Silmukkasauma.Tapa.Liitos : Silmukkasauma.Valitse(pakattu, c.length, tagit.TryGetValue(c, out var tg) && tg.HasValue);
            ohjaus.mute = tapa != Silmukkasauma.Tapa.Tavallinen; ohjaus.priority = ohjaus.mute ? 256 : a.priority;
            if (tapa == Silmukkasauma.Tapa.Tavallinen) return;
            (alku, loppu) = Alue(c);
            a.clip = c; b.clip = c;
            long s0 = Silmukkasauma.Aloitus(ohjaus.timeSamples, alku, loppu);
            savel = ohjaus.pitch; a.pitch = b.pitch = savel; a.volume = ohjaus.volume; b.volume = 0f;
            if (tapa == Silmukkasauma.Tapa.Liitos)
            {
                t0 = AudioSettings.dspTime + Silmukkasauma.AloitusViiveS; kohta0 = s0; ajastettu = false;
                a.timeSamples = (int)s0; a.PlayScheduled(t0);
            }
            else
            {
                long viimeinen = loppu - (long)((Silmukkasauma.RistiAlkuS + 0.1) * c.frequency);
                a.timeSamples = (int)System.Math.Min(s0, System.Math.Max(alku, viimeinen)); a.Play(); ristiAlku = -1f;
            }
        }

        (long, long) Alue(AudioClip c)
        {
            if (tagit.TryGetValue(c, out var t) && t.HasValue) return Silmukkasauma.Alue(t, c.samples);
            if (c.loadType != AudioClipLoadType.DecompressOnLoad)   // pakattu ilman tagia: KaupunkiAanimaisemaSoittimen PadS 0,06 s
                return ((long)(0.06 * c.frequency), c.samples);
            int n = (int)System.Math.Min(c.samples, Silmukkasauma.AlkuEnintaan);
            var d = new float[n * c.channels];
            long vara = c.GetData(d, 0) ? Silmukkasauma.AlkuHiljaisuudesta(d, c.channels) : 0;
            return Silmukkasauma.VaraAlue(vara, c.samples);
        }

        void PaivitaLiitos(float vol, float sav)
        {
            double nyt = AudioSettings.dspTime;
            if (Mathf.Abs(sav - savel) > 1e-4f)
            {
                if (nyt > t0) { kohta0 = Silmukkasauma.Kohta(kohta0, t0, nyt, klippi.frequency, savel); t0 = nyt; }
                savel = sav;
                if (ajastettu) { liitos = Silmukkasauma.LoppuHetki(kohta0, t0, loppu, klippi.frequency, savel); b.SetScheduledStartTime(Silmukkasauma.KaynnistysHetki(liitos, alku, klippi.frequency, savel)); a.SetScheduledEndTime(liitos); }
            }
            a.volume = vol; b.volume = vol; a.pitch = sav; b.pitch = sav;
            if (!ajastettu)
            {
                liitos = Silmukkasauma.LoppuHetki(kohta0, t0, loppu, klippi.frequency, savel);
                if (liitos - nyt < Silmukkasauma.EnnakkoS)
                {
                    // Hakuton liitos: b alkaa klipin alusta niin, että sen alkuviive soi a:n lopun alla (Silmukkasauma.KaynnistysHetki).
                    b.timeSamples = 0; b.PlayScheduled(Silmukkasauma.KaynnistysHetki(liitos, alku, klippi.frequency, savel)); a.SetScheduledEndTime(liitos); ajastettu = true;
                }
            }
            else if (nyt >= liitos)
            {
                (a, b) = (b, a); t0 = liitos; kohta0 = alku; ajastettu = false;
            }
        }

        void PaivitaRisti(float vol, float sav)
        {
            a.pitch = sav; b.pitch = sav;
            double loppuS = (double)loppu / klippi.frequency;
            if (!a.isPlaying && !b.isPlaying) { a.timeSamples = (int)alku; a.Play(); }   // kehyskatko ehti loppuun
            if (ristiAlku < 0f && a.isPlaying && loppuS - a.time <= Silmukkasauma.RistiAlkuS)
            {
                b.timeSamples = (int)alku; b.volume = 0f; b.Play(); ristiAlku = Time.unscaledTime;
            }
            if (ristiAlku < 0f) { a.volume = vol; return; }
            float u = Mathf.Clamp01((Time.unscaledTime - ristiAlku) / (float)Silmukkasauma.RistiS);
            a.volume = vol * Mathf.Cos(u * Mathf.PI * 0.5f); b.volume = vol * Mathf.Sin(u * Mathf.PI * 0.5f);
            if (u >= 1f) { a.Stop(); a.volume = 0f; (a, b) = (b, a); ristiAlku = -1f; }
        }

        void Lopeta()
        {
            if (a != null) { a.Stop(); a.volume = 0f; }
            if (b != null) { b.Stop(); b.volume = 0f; }
            soi = false; ajastettu = false; ristiAlku = -1f; klippi = null;   // ohjaus pysyy mykistettynä (Tavallinen avaa sen Aloita-kohdassa)
        }

        void OnDisable() { if (soi) Lopeta(); }
        void OnDestroy() { if (a != null) Destroy(a); if (b != null) Destroy(b); }
    }
}
