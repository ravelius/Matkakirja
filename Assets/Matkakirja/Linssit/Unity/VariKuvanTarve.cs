// KAUPUNKIKAMERAN VÄRIKOPION TARVE (Linssiseppä 8.10.2026; Natiiviseppä: yhteinen viitelaskuri): useampi tehoste (Nopeustehoste,
// pallon lämmön väreily) pyytää kameran läpinäkymättömän kopion (requiresColorOption On) vain käyttönsä ajaksi. Laskuri per
// kamera: ensimmäinen pyyntö tallentaa alkuperäisen asetuksen ja kytkee On, viimeinen vapautus palauttaa sen, joten
// palautusjärjestys ei voi jättää kopiota päälle tai sammuttaa sitä toiselta.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class VariKuvanTarve
    {
        static readonly Dictionary<Camera, (int maara, CameraOverrideOption alku)> tarpeet = new Dictionary<Camera, (int, CameraOverrideOption)>();

        public static void Pyyda(Camera kamera)
        {
            var d = kamera != null ? kamera.GetUniversalAdditionalCameraData() : null;
            if (d == null) return;
            if (tarpeet.TryGetValue(kamera, out var t)) { tarpeet[kamera] = (t.maara + 1, t.alku); return; }
            tarpeet[kamera] = (1, d.requiresColorOption);
            d.requiresColorOption = CameraOverrideOption.On;
        }

        public static void Vapauta(Camera kamera)
        {
            if (kamera == null || !tarpeet.TryGetValue(kamera, out var t)) return;
            if (t.maara > 1) { tarpeet[kamera] = (t.maara - 1, t.alku); return; }
            tarpeet.Remove(kamera);
            var d = kamera.GetUniversalAdditionalCameraData();
            if (d != null) d.requiresColorOption = t.alku;
        }
    }
}
