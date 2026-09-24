// MAISEMAN KOMPRESSORI ÄÄNISÄIKEESSÄ (B7 §2.2, ilman AudioMixeriä).
//
// Web: <audio> → DynamicsCompressorNode → GainNode (taso) → ulos. Natiivi: AudioSource.volume = 1,
// tämä suodatin ajaa Chromiumin kompressorin (Peli/Aani/Kompressori.cs) ja kertoo tuloksen tasolla
// VASTA kompressorin jälkeen, joten järjestys on sama kuin webissä ja taso saa ylittää ykkösen.
//
// OnAudioFilterRead koskee koko GameObjectin lähteitä, joten jokainen maisemalähde on omassa
// lapsi-GameObjectissaan (Aanisoitin luo "Maisema A" ja "Maisema B"; malli Natiivi-UI:n Aanet.cs:n
// tehostekaiku). Suodatin toimii AudioSourcen ulostulolle, joten striimattu ja purettu klippi käyvät.
//
// SÄIKEET: pääsäie kirjoittaa Taso- ja nollauspyynnön, äänisäie lukee ne puskurin alussa. Taso
// interpoloidaan lineaarisesti edellisen puskurin loppuarvosta uuteen (ruudun askelista ei synny
// porrasta). Näytetaajuus luetaan pääsäikeessä (AudioSettings ei ole äänisäikeen API). Äänisäie ei
// allokoi: kompressorin puskurit varataan konstruktorissa.
using System.Threading;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DisallowMultipleComponent]
    public sealed class MaisemaKompressori : MonoBehaviour
    {
        readonly Kompressori kompressori = Kompressori.Maisema();
        volatile float taso;
        volatile int naytetaajuus;
        int nollaus;          // Interlocked: 1 = nollaa ennen seuraavaa puskuria
        float edellinenTaso;  // äänisäikeen oma

        /// <summary>Maiseman taso (lineaarinen, kompressorin jälkeen; saa ylittää 1:n kuten web-gain).</summary>
        public float Taso
        {
            get => taso;
            set => taso = float.IsNaN(value) || float.IsInfinity(value) || value < 0f ? 0f : value;
        }

        /// <summary>Kompressorin viimeisin vahvistus (makeup × puristus, ilman tasoa); testikomennoille.</summary>
        public float Vahvistus => kompressori.Vahvistus;

        /// <summary>Uusi klippi alkaa: kompressori alkutilaan (web luo jokaiselle soittimelle oman solmun).</summary>
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
            float t = taso;
            if (Interlocked.Exchange(ref nollaus, 0) != 0)
            {
                kompressori.Nollaa();
                edellinenTaso = t;
            }
            kompressori.Prosessoi(data, kanavia, naytetaajuus, edellinenTaso, t);
            edellinenTaso = t;
        }
    }
}
