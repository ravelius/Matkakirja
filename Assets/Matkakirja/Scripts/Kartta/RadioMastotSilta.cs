// Silta radiolinssistä Kartan radiomastoihin (radiouudistus build 12, Natiiviseppä).
// RadioMastot (Matkakirja.Kartta) toteuttaa Linssisepän IRadioMastot-rajapinnan, mutta LinssiOhjain on
// Assembly-CSharpissa, jota Kartta-asmdef ei näe. Tämä asettaa LinssiOhjain.RadioSovitin.MastoPiirto-tehtaan
// kohtauksen latauduttua; radio kysyy piirtäjää avatessaan (RadioSovitin.Avaa). Jos kohtaus on rakennettu ennen
// kuin Rakennus.LuoPallo lisäsi RadioMastot-komponentin, se luodaan tässä georeferenssiin (materiaalit
// ajonaikaisesti; käännöksessä varjostimet tulevat LuoPallon materiaaleista).
//
// Napautus kulkee ilman tätä siltaa: RadioMastot → PalloKierto.IlmoitaKaupunki → RadioSovitin.Kartta →
// RadioLinssi.SoitaKaupunki (sama reitti kuin entinen kaupunkimerkin napautus radiotilassa).
using CesiumForUnity;
using Matkakirja.Linssit.Radio;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    static class RadioMastotSilta
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            // Luodaan heti (ei vasta radion avauksessa), jotta Start ja verkot ovat valmiina ennen ensimmäistä avausta.
            Piirtaja();
            LinssiOhjain.RadioSovitin.MastoPiirto = Piirtaja;
        }

        static IRadioMastot Piirtaja()
        {
            var m = RadioMastot.Instanssi != null ? RadioMastot.Instanssi : Object.FindAnyObjectByType<RadioMastot>();
            if (m != null) return m;
            var g = Object.FindAnyObjectByType<CesiumGeoreference>();
            if (g == null) return null;
            Debug.Log("MATKAKIRJA mastot: RadioMastot puuttui kohtauksesta, luodaan georeferenssiin");
            return g.gameObject.AddComponent<RadioMastot>();
        }
    }
}
