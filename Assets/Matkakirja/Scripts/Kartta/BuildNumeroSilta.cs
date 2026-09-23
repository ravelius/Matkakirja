// Build-numero (CFBundleVersion) Natiivi-UI:n "Peli päivittyi" -vertailuun (MitaUutta.BuildNumero).
// Unity ei anna build-numeroa ajossa, joten Rakennus kirjoittaa sen viennissä tiedostoon
// Data/Raw/rakennus.txt (StreamingAssets) Xcode-projektin sisään; repoon ei synny tiedostoa.
using System.IO;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    static class BuildNumeroSilta
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            string polku = Path.Combine(Application.streamingAssetsPath, "rakennus.txt");
            MitaUutta.BuildNumero = () => File.Exists(polku) ? File.ReadAllText(polku).Trim() : null;
        }
    }
}
