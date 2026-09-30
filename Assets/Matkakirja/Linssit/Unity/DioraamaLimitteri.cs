// DIORAAMAN MASTER-LIMITTERI (Siirtoseppä 30.9.2026, Päätoimittajan pyyntö): Linnanrakentajan puhetiedostojen true peak on
// −0,2 dBTP (−17 LUFS), joten puhe silmukoiden (tuli, pata, laineet) päällä voi summautua yli 0 dBFS:n ja leikkautua.
// Natiivissa ei ole AudioMixeriä (vrt. Kompressori.cs, MaisemaKompressori.cs), joten kevyt huippulimitteri ajetaan
// äänisäikeessä AudioListenerin OnAudioFilterRead-ketjussa, eli koko miksauksen päällä, vain dioraaman ollessa auki.
//
//   kynnys   −1 dBFS (0,891): näyte, joka ylittäisi kynnyksen, vaimennetaan heti (hyökkäys 0 ms, ei ylitystä)
//   vapautus 80 ms eksponentiaalisesti takaisin 1:een; kanavat linkitetty (suurin itseisarvo)
// Tiedostoihin ei kosketa. Puheväylän −3 dB on DioraamaAanet.PuheTaso.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaLimitteri : MonoBehaviour
    {
        public const float Kynnys = 0.891f, VapautusS = 0.08f;

        float vahvistus = 1f, vapautus;
        volatile float pieninVahvistus = 1f;

        /// <summary>Pienin vahvistus edellisen luennan jälkeen (mittaus: 1 = ei rajoitusta).</summary>
        public float PieninVahvistusJaNollaa() { float v = pieninVahvistus; pieninVahvistus = 1f; return v; }

        static DioraamaLimitteri instanssi;
        public static DioraamaLimitteri Instanssi => instanssi;

        /// <summary>Päälle kohtauksen AudioListeneriin (dioraama auki); luo komponentin kerran.</summary>
        public static void Paalle(bool paalla)
        {
            if (instanssi == null)
            {
                if (!paalla) return;
                var kuuntelija = FindAnyObjectByType<AudioListener>();
                if (kuuntelija == null) return;
                instanssi = kuuntelija.gameObject.GetComponent<DioraamaLimitteri>();
                if (instanssi == null) instanssi = kuuntelija.gameObject.AddComponent<DioraamaLimitteri>(); // ei ??: Unityn null-vertailu
            }
            instanssi.enabled = paalla;
        }

        void Awake() => vapautus = 1f - Mathf.Exp(-1f / (VapautusS * Mathf.Max(8000, AudioSettings.outputSampleRate)));

        void OnAudioFilterRead(float[] data, int kanavia)
        {
            float g = vahvistus, pienin = pieninVahvistus;
            for (int i = 0; i < data.Length; i += kanavia)
            {
                float huippu = 0f;
                for (int c = 0; c < kanavia; c++) { float a = Mathf.Abs(data[i + c]); if (a > huippu) huippu = a; }
                float tavoite = huippu * g > Kynnys ? Kynnys / huippu : 1f;
                g = tavoite < g ? tavoite : g + (1f - g) * vapautus;
                if (g < pienin) pienin = g;
                for (int c = 0; c < kanavia; c++) data[i + c] *= g;
            }
            vahvistus = g;
            pieninVahvistus = pienin;
        }
    }
}
