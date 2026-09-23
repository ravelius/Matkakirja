// LENNON PILVISUMU Unityssä (ILentoPilvet, Ydin/Pilvet/LentoPilvet.cs): astronautin Pilvikuori
// lennon korkeudella, peitto ja ajelehdintä PilviVerhosta. Käynnistyy itse
// (RuntimeInitializeOnLoadMethod kuten LinssiOhjain) ja rekisteröityy LentoPilvet.Instanssiin;
// kuori ja pilvikuva luodaan vasta ensimmäisellä Nayta-kutsulla, joten peli ei maksa mitään,
// jos lentoa ei ole.
using Matkakirja.Linssit.Pilvet;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class PilviKerros : MonoBehaviour, ILentoPilvet
    {
        PalloKierto kierto;
        Pilvikuori kuori;
        readonly PilviVerho verho = new PilviVerho();
        double pyydetty = PilviVerho.VahimmaisKorkeus;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (LentoPilvet.Instanssi is PilviKerros) return;
            var k = FindAnyObjectByType<PalloKierto>();
            if (k == null) return;
            var go = new GameObject("PilviKerros");
            var p = go.AddComponent<PilviKerros>();
            p.kierto = k;
            LentoPilvet.Instanssi = p;
        }

        static double Nyt => Time.unscaledTimeAsDouble;

        public bool Nakyvissa => verho.Nakyvissa(Nyt);

        public void Nayta(double korkeusM, double? kestoS = null)
        {
            if (kuori == null && kierto != null && kierto.georeferenssi != null)
                kuori = Pilvikuori.Luo(kierto.georeferenssi);
            pyydetty = korkeusM;
            verho.Nayta(Nyt, kestoS);
        }

        public void Korkeus(double korkeusM) => pyydetty = korkeusM;

        public void Piilota(double? kestoS = null) => verho.Piilota(Nyt, kestoS);

        void LateUpdate()
        {
            if (kuori == null) return;
            double t = Nyt;
            double peitto = verho.Peitto(t);
            if (peitto <= 0.001 && !verho.Nakyvissa(t))
            {
                if (kuori.gameObject.activeSelf) kuori.Aseta(0, verho.Kierto(t));
                return;
            }
            // Kameran korkeus maan keskipisteestä: kuori pysyy sen alapuolella (näkyy ylhäältä).
            var g = kierto.georeferenssi.transform;
            Vector3 keskus = g.TransformPoint(kuori.transform.localPosition);
            double kamera = Vector3.Distance(kierto.transform.position, keskus) - 6_371_000;
            kuori.Korkeus(PilviVerho.Rajaa(pyydetty, kamera));
            kuori.Aseta(peitto, verho.Kierto(t));
        }

        void OnDestroy()
        {
            if (ReferenceEquals(LentoPilvet.Instanssi, this)) LentoPilvet.Instanssi = null;
            if (kuori != null) Destroy(kuori.gameObject);
        }
    }
}
