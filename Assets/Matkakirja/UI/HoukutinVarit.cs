// HOUKUTTIMIEN VÄRIT (omistaja 11.10.2026 PT:n kautta, juna 182; Kartta/Houkuttimet.cs): kartan houkutinpisteiden värit
// tyylikirjan tokeneista. Kartta-kokoonpano ei näe Tyylikirjaa (UI), joten värit annetaan KaupunkiMerkeille täältä kerran
// kohtauksen latauduttua. Linssikaupungit: Tyylikirja.Erikois.LinssiHehku (--tk-erikois-linssi-hehku); Olavinlinna:
// Tyylikirja.Videopeli.Korostus (--tk-videopeli-korostus, videopelien sininen, NUI:n teema).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    static class HoukutinVarit
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Aseta()
        {
            KaupunkiMerkit.HoukutinLinssiVari = Tyylikirja.Erikois.LinssiHehku;
            KaupunkiMerkit.HoukutinPeliVari = Tyylikirja.Videopeli.Korostus;
        }
    }
}
