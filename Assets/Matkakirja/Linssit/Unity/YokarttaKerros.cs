// YÖKARTAN UNITY-KERROS (Linssiseppä 29.9.2026; logiikka Linssit/Ydin/Yokartta/YokarttaLinssi.cs): sama yökuori kuin ISS:n
// kyydissä (Yokuori: Black Marble -valot HDR:nä, todellinen aurinko, hämäräkaista, päiväpuolen varjo ja auringon kiilto vedessä).
// Kuori luodaan linssin avauksessa ja tuhotaan sulkiessa; valot tulevat ämpäristä välimuistin kautta (Yokuori.HaeValot).
using CesiumForUnity;
using Matkakirja.Linssit.Yokartta;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class YokarttaKerros : MonoBehaviour, IYokartanNakyma
    {
        Yokuori kuori;

        public static YokarttaKerros Luo(CesiumGeoreference georeferenssi)
        {
            var go = new GameObject("YokarttaKerros");
            if (georeferenssi != null) go.transform.SetParent(georeferenssi.transform, false);
            var k = go.AddComponent<YokarttaKerros>();
            k.kuori = Yokuori.Luo(georeferenssi);
            if (k.kuori != null) k.kuori.transform.SetParent(go.transform, true);
            return k;
        }

        public void Nayta(bool nakyvissa) => kuori?.Nayta(nakyvissa);

        void OnDestroy()
        {
            if (kuori != null) Destroy(kuori.gameObject);
        }
    }
}
