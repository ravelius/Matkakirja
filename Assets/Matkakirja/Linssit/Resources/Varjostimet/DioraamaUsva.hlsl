// USVA (grafiikka 8.10., juna 169, Siirtoseppä): matala korkeussumu sateen jälkeiseen yöhön (vesi, laituri, piha). Globaalit asettaa
// SeikkailuYo vain seikkailun ajaksi; muualla _DioraamaUsva.w = 0 → ei vaikutusta. Tiheys kasvaa alaspäin usvan pinnasta (y) ja
// etäisyyden mukaan (exp), ja usva ajelehtii hitaasti (kaksi siniaaltoa maailmapaikasta).
#ifndef DIORAAMA_USVA_INCLUDED
#define DIORAAMA_USVA_INCLUDED

float4 _DioraamaUsva;      // x = usvan pinta (y, m), y = paksuus (m), z = tiheys (1/m), w = voima 0–1
float4 _DioraamaUsvaVari;  // rgb = usvan väri (lineaarinen, kuunvalo), a ei käytössä

half3 DioraamaUsva(half3 vari, float3 paikkaW)
{
    if (_DioraamaUsva.w <= 0.001) return vari;
    float syvyys = saturate((_DioraamaUsva.x - paikkaW.y) / max(0.05, _DioraamaUsva.y));
    float matka = length(_WorldSpaceCameraPos - paikkaW);
    float ajelehtii = 0.75 + 0.25 * sin(paikkaW.x * 0.11 + _Time.y * 0.07) * sin(paikkaW.z * 0.09 - _Time.y * 0.05);
    float maara = syvyys * (1.0 - exp(-matka * _DioraamaUsva.z)) * ajelehtii * _DioraamaUsva.w;
    return lerp(vari, (half3)_DioraamaUsvaVari.rgb, (half)saturate(maara));
}

#endif
