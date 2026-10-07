// HISTORIAMOOTTORI: VALOEFEKTIEN VIITTEET (Siirtoseppä 7.10.2026). Resources/Seikkailu/SeikkailuVfx.asset viittaa Asset Storen
// paketteihin (Vefects Candle VFX - URP: VFX_Candle_Flame_01), jotta ne voi ladata koodista ilman kohtausviitettä.
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVfxViitteet : ScriptableObject
    {
        public GameObject KynttilanLiekki;
    }
}
