// PELIN TEKSTIT (PT 9.10.2026): lataa kaikki Resources/Tekstit/<alue>.<kieli>.json -taulut (Linssit/Resources/Tekstit = Siirtoseppä,
// UI/Resources/Tekstit = Natiivi-UI) Matkakirja.Peli.Tekstit-luokkaan ennen ensimmäistä kohtausta. Ks. Peli/Tekstit.cs.
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class TekstiLataaja
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        public static void Lataa()
        {
            Tekstit.Tyhjenna();
            int n = 0, t = 0;
            foreach (var a in Resources.LoadAll<TextAsset>("Tekstit"))
            {
                // Nimi "olavinlinna.fi" → kieli "fi" (viimeinen pisteen jälkeinen osa).
                int p = a.name.LastIndexOf('.');
                if (p <= 0) continue;
                n += Tekstit.Lisaa(a.name.Substring(p + 1), a.text); t++;
            }
            Debug.Log($"MATKAKIRJA tekstit: {n} avainta {t} taulusta, kieli {Tekstit.Kieli}");
        }
    }
}
