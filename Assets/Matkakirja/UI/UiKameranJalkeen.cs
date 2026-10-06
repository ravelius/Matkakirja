// UiKerros.KameranJalkeen (Natiivi-UI 5.10.2026, omistajan bugi 14.4x: pieni kohdekortti heilui panoroidessa): oma
// MonoBehaviour omassa tiedostossaan (Unity vaatii MonoBehaviourille saman nimisen tiedoston), Update järjestyksessä 20 eli
// kartan kameran (PalloKierto.Update, järjestys 0) jälkeen ja ennen UI Toolkitin paneelipäivitystä (PreLateUpdate).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DefaultExecutionOrder(20)]
    public sealed class UiKameranJalkeen : MonoBehaviour
    {
        UiKerros kerros;
        void Awake() => kerros = GetComponent<UiKerros>();
        void Update() { if (kerros != null) kerros.AjaKameranJalkeen(); }
    }
}
