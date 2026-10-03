// ÄÄNIKAAPPAUS TALLENTEESEEN (Päätoimittaja 4.10.2026: kokonaistarkistuksen tallenteessa oltava ääniraita; simulaattorin video on
// mykkä). AudioListenerin OnAudioFilterRead kopioi koko miksauksen muistiin ja NOLLAA ulostulon: mitään ei kuulu kaiuttimista (omistajan
// kaiuttimet, yö), mutta WAV:ssa on sama ääni kuin laitteella. Kaappauksen ajan ajattelijan lähteet soivat täysillä mykistyksestä
// huolimatta (Kaynnissa). Kirjoittaa Documents/<nimi>.wav (16 bit PCM) ja kirjaa alun dspTime-hetken (kohdistus kytkimeen).
// Testikomento: ajattelija kaappaa <s> [nimi]. Vain testikäyttöön (kehittäjätila).
using System;
using System.IO;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class AaniKaappaus : MonoBehaviour
    {
        /// <summary>Kaappaus käynnissä: ajattelijan lähteet soivat täysillä (ulostulo on nollattu).</summary>
        public static bool Kaynnissa { get; private set; }

        float[] puskuri;
        int kirjoitettu, kanavia, taajuus;
        double alkuDsp = double.NaN;
        string nimi;
        Action<string> kirjaa;
        float taso = 1f;

        public static void Aloita(double sekunnit, string nimi, Action<string> kirjaa)
        {
            var kuuntelija = FindAnyObjectByType<AudioListener>();
            if (kuuntelija == null) { kirjaa("kaappaus: ei AudioListeneriä"); return; }
            var k = kuuntelija.gameObject.GetComponent<AaniKaappaus>();
            if (k == null) k = kuuntelija.gameObject.AddComponent<AaniKaappaus>();   // ei ??: Unityn null-vertailu
            // Mykistys "hiljaa" (AudioListener.volume 0) voisi nollata miksauksen ennen suodinta: täysi taso kaappauksen ajaksi,
            // ulostulo nollataan suotimessa joka tapauksessa.
            k.taso = AudioListener.volume;
            AudioListener.volume = 1f;
            k.taajuus = AudioSettings.outputSampleRate;
            k.kanavia = AudioSettings.speakerMode == AudioSpeakerMode.Mono ? 1 : 2;
            k.puskuri = new float[(int)(sekunnit * k.taajuus) * k.kanavia];
            k.kirjoitettu = 0;
            k.alkuDsp = double.NaN;
            k.nimi = nimi;
            k.kirjaa = kirjaa;
            k.enabled = true;
            Kaynnissa = true;
            kirjaa($"kaappaus alkaa: {sekunnit:F0} s, {k.taajuus} Hz, {k.kanavia} kan");
        }

        void OnAudioFilterRead(float[] data, int kan)
        {
            if (puskuri != null && Kaynnissa)
            {
                if (double.IsNaN(alkuDsp)) { alkuDsp = AudioSettings.dspTime; kanavia = kan; }
                int n = Math.Min(data.Length, puskuri.Length - kirjoitettu);
                if (n > 0) { Array.Copy(data, 0, puskuri, kirjoitettu, n); kirjoitettu += n; }
            }
            Array.Clear(data, 0, data.Length);   // ei mitään kaiuttimiin
        }

        void Update()
        {
            if (puskuri == null || kirjoitettu < puskuri.Length) return;
            Kaynnissa = false;
            AudioListener.volume = taso;
            var polku = Path.Combine(Application.persistentDataPath, nimi + ".wav");
            File.WriteAllBytes(polku, Wav(puskuri, kirjoitettu, kanavia, taajuus));
            kirjaa?.Invoke($"kaappaus valmis: {polku}, alku dsp {alkuDsp:F4} s, {kirjoitettu / kanavia} näytettä");
            puskuri = null;
            enabled = false;
        }

        void OnDisable() { if (puskuri != null) { Kaynnissa = false; AudioListener.volume = taso; } }

        static byte[] Wav(float[] d, int n, int kan, int f)
        {
            using var m = new MemoryStream();
            using var w = new BinaryWriter(m);
            w.Write(System.Text.Encoding.ASCII.GetBytes("RIFF")); w.Write(36 + n * 2);
            w.Write(System.Text.Encoding.ASCII.GetBytes("WAVEfmt ")); w.Write(16); w.Write((short)1); w.Write((short)kan);
            w.Write(f); w.Write(f * kan * 2); w.Write((short)(kan * 2)); w.Write((short)16);
            w.Write(System.Text.Encoding.ASCII.GetBytes("data")); w.Write(n * 2);
            for (int i = 0; i < n; i++) w.Write((short)Mathf.Clamp(Mathf.RoundToInt(d[i] * 32767f), -32768, 32767));
            return m.ToArray();
        }
    }
}
