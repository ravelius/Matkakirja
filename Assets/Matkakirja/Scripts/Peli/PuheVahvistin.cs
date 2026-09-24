// LUKIJAÄÄNEN VAHVISTIN ÄÄNISÄIKEESSÄ (Pelikoodari 24.9.2026, ilman AudioMixeriä).
//
// Web (js/puhe.js kytkeVahvistin): puhesynteesin palat → GainNode (lukijanTaso = Voima × Lukija-liuku
// / 0,9, oletus 2,0) → DynamicsCompressorNode (−10 dB, knee 18, ratio 4, 3 ms, 250 ms) → ulos.
// Natiivin AudioSource.volume ei ylitä ykköstä, joten vahvistus tehdään tässä suodattimessa ENNEN
// kompressoria kuten webissä, ja kompressori on sama Chromiumin portti kuin maisemassa
// (Peli/Aani/Kompressori.cs, Kompressori.Lukija()). Äänitteet (luennat, intro) eivät kulje vahvistimen
// läpi webissäkään: Kaytossa = false ohittaa suodattimen kokonaan.
//
// SÄIKEET: pääsäie kirjoittaa Vahvistus-, Kaytossa- ja nollauspyynnön, äänisäie lukee ne puskurin
// alussa. Vahvistus interpoloidaan lineaarisesti edellisen puskurin loppuarvosta (liu'un vedosta ei
// synny porrasta). Äänisäie ei allokoi.
using System.Threading;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class PuheVahvistin : MonoBehaviour
    {
        readonly Kompressori kompressori = Kompressori.Lukija();
        volatile float vahvistus = 1f;
        volatile bool kaytossa;
        volatile int naytetaajuus;
        int nollaus;          // Interlocked: 1 = nollaa ennen seuraavaa puskuria
        float edellinen = 1f; // äänisäikeen oma

        /// <summary>Vahvistus ennen kompressoria (lineaarinen, saa ylittää 1:n kuten web-gain).</summary>
        public float Vahvistus
        {
            get => vahvistus;
            set => vahvistus = float.IsNaN(value) || float.IsInfinity(value) || value < 0f ? 0f : value;
        }

        /// <summary>true = synteesi (vahvistus + kompressori), false = äänite (ohitus).</summary>
        public bool Kaytossa { get => kaytossa; set => kaytossa = value; }

        /// <summary>Uusi pala alkaa: kompressori alkutilaan ilman vahvistuksen liukua.</summary>
        public void Nollaa() => Interlocked.Exchange(ref nollaus, 1);

        void Awake()
        {
            naytetaajuus = AudioSettings.outputSampleRate;
            AudioSettings.OnAudioConfigurationChanged += KokoonpanoMuuttui;
        }

        void OnDestroy() => AudioSettings.OnAudioConfigurationChanged -= KokoonpanoMuuttui;

        void KokoonpanoMuuttui(bool laiteVaihtui) => naytetaajuus = AudioSettings.outputSampleRate;

        void OnAudioFilterRead(float[] data, int kanavia)
        {
            float g = vahvistus;
            if (Interlocked.Exchange(ref nollaus, 0) != 0)
            {
                kompressori.Nollaa();
                edellinen = g;
            }
            if (!kaytossa || kanavia <= 0) { edellinen = g; return; }
            int kehyksia = data.Length / kanavia;
            if (kehyksia == 0) return;
            float askel = (g - edellinen) / kehyksia;
            for (int i = 0; i < kehyksia; i++)
            {
                float t = edellinen + askel * (i + 1);
                int j = i * kanavia;
                for (int c = 0; c < kanavia; c++) data[j + c] *= t;
            }
            kompressori.Prosessoi(data, kanavia, naytetaajuus);
            edellinen = g;
        }
    }
}
