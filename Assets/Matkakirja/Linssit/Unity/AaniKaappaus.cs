// ÄÄNIKAAPPAUS TALLENTEESEEN (Päätoimittaja 4.10.2026: kokonaistarkistuksen tallenteessa oltava ääniraita; simulaattorin video on
// mykkä). AudioListenerin OnAudioFilterRead kopioi koko miksauksen muistiin ja NOLLAA ulostulon: mitään ei kuulu kaiuttimista (omistajan
// kaiuttimet, yö), mutta WAV:ssa on sama ääni kuin laitteella. Kaappauksen ajan ajattelijan lähteet soivat täysillä mykistyksestä
// huolimatta (Kaynnissa). Kirjoittaa Documents/<nimi>.wav (16 bit PCM) ja kirjaa alun dspTime-hetken (kohdistus kytkimeen).
// Testikomento: ajattelija kaappaa <s> [nimi] ja ajattelija merkki. Vain testikomennoilla (linssi-komento.txt, LueKomennot
// #if !MATKAKIRJA_APPSTORE; TF-sovellukseen ei voi kirjoittaa komentoja), joten TF:ssä ei koskaan välähdystä eikä piippausta.
using System;
using System.IO;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class AaniKaappaus : MonoBehaviour
    {
        /// <summary>Kaappaus käynnissä: ajattelijan lähteet soivat täysillä (ulostulo on nollattu).</summary>
        public static bool Kaynnissa { get; private set; }

        /*
         * NATIIVIKAAPPAUS (Päätoimittaja 4.10.2026; sovittu Linssiseppä 2:n kanssa): AVAudioEnginessä soivat äänet (Cupolan humina,
         * MatkakirjaSilmukat.mm) eivät kulje tämän suotimen kautta. Aloita käynnistää samalla natiivin tapin samaksi ajaksi
         * (Documents/<nimi>-natiivi.wav; kaiuttimet hiljaa kuten tässä) ja Merkki soittaa saman piippauksen natiivimoottorissa,
         * joten tallenne-yhdista.py kohdistaa kummankin WAVin piippauksesta. Vain testikomennoista (LueKomennot #if !MATKAKIRJA_APPSTORE).
         */
#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern void MatkakirjaSilmukka_Kaappaa(string polku, double sekunnit);
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern void MatkakirjaSilmukka_Merkki(double etumatka);
#else
        static void MatkakirjaSilmukka_Kaappaa(string polku, double sekunnit) { }
        static void MatkakirjaSilmukka_Merkki(double etumatka) { }
#endif

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
            TestiMykistys.KaappausNollaa = true;   // testimykistys (ennen tätä ketjussa) jättää nollauksen tälle
            var natiivi = Path.Combine(Application.persistentDataPath, nimi + "-natiivi.wav");
            MatkakirjaSilmukka_Kaappaa(natiivi, sekunnit);
            kirjaa($"kaappaus alkaa: {sekunnit:F0} s, {k.taajuus} Hz, {k.kanavia} kan; natiivi {Path.GetFileName(natiivi)}");
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
            TestiMykistys.KaappausNollaa = false;
            AudioListener.volume = taso;
            var polku = Path.Combine(Application.persistentDataPath, nimi + ".wav");
            File.WriteAllBytes(polku, Wav(puskuri, kirjoitettu, kanavia, taajuus));
            kirjaa?.Invoke($"kaappaus valmis: {polku}, alku dsp {alkuDsp:F4} s, {kirjoitettu / kanavia} näytettä");
            puskuri = null;
            enabled = false;
        }

        // TAHDISTUSMERKKI (Päätoimittaja 4.10.: tallenne c:n ääni oli yhdistetty 0,8 s myöhään, koska kohdistin valon täyteen kirkkauteen):
        // valkoinen koko ruudun välähdys ja 1 kHz:n piippaus samaan äänikellon hetkeen. Piippaus PlayScheduledilla hetkeen T, välähdys
        // näkyy, kun äänikello + viive on välillä T … T + 0,1 s (sama kompensaatio kuin ajattelijan kuvalla). Yhdistys etsii välähdyksen
        // videon aikaleimoista ja piippauksen WAV:sta.
        static double merkkiT = double.NaN, merkkiViive;
        static AudioSource piippi;

        /// <summary>Merkki etumatkalla s (äänikello); viive = ulostulon viive − näyttö (kuten AjattelijatSovitin).</summary>
        public static double Merkki(double etumatka, double viive)
        {
            var kuuntelija = FindAnyObjectByType<AudioListener>();
            if (kuuntelija == null) return double.NaN;
            if (piippi == null)
            {
                // Oma lapsiolio: AudioSource samassa oliossa kuin kuuntelija ja sen OnAudioFilterRead-suotimet (TestiMykistys, tämä)
                // antoi Unityn virheen "multiple AudioSources and/or AudioListeners" kehityskonsoliin (tallenne d, Päätoimittaja).
                var go = new GameObject("Tahdistusmerkki");
                go.transform.SetParent(kuuntelija.transform, false);
                piippi = go.AddComponent<AudioSource>();
                int f = AudioSettings.outputSampleRate, n = f / 10;
                var c = AudioClip.Create("tahdistus", n, 1, f, false);
                var d = new float[n];
                for (int i = 0; i < n; i++) d[i] = 0.6f * Mathf.Sin(2 * Mathf.PI * 1000f * i / f);
                c.SetData(d, 0);
                piippi.clip = c; piippi.playOnAwake = false; piippi.spatialBlend = 0;
            }
            merkkiT = AudioSettings.dspTime + etumatka;
            MatkakirjaSilmukka_Merkki(etumatka);   // sama piippaus natiivimoottoriin (natiivi-WAVin kohdistus)
            merkkiViive = viive;
            piippi.volume = 1f;
            piippi.PlayScheduled(merkkiT);
            return merkkiT;
        }

        void OnGUI()
        {
            if (double.IsNaN(merkkiT)) return;
            double t = AudioSettings.dspTime - merkkiViive;
            if (t >= merkkiT && t < merkkiT + 0.1)
                GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), Texture2D.whiteTexture);
            else if (t >= merkkiT + 0.1) merkkiT = double.NaN;
        }

        void OnDisable() { TestiMykistys.KaappausNollaa = false; if (puskuri != null) { Kaynnissa = false; AudioListener.volume = taso; } }

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
