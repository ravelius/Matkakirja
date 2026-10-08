// MÄRÄT PINNAT (omistajan palaute 8.10. (2), Siirtoseppä): yhteinen DioraamaLeivottu- ja DioraamaValaistu-varjostimille.
// Märkä pinta tummuu (vaakapinnat eniten, hento laikukkuus), ja kiilto heijastaa kuunvaloa loivassa kulmassa (Fresnel).
// Palauttaa märkyysmäärän mm (0–1), jolla kutsuja voi vahvistaa liekkien kiiltoa. Globaalit asettaa SeikkailuKavely.AsetaMarkyys.
#ifndef DIORAAMA_MARKYYS_INCLUDED
#define DIORAAMA_MARKYYS_INCLUDED

float _DioraamaMarkyysPaalla;
float4 _DioraamaMarkyysKiilto;

half DioraamaMarkyys(inout half3 vari, float markyys, float3 nW, float3 paikkaW)
{
    half mm = 0;
    if (markyys * _DioraamaMarkyysPaalla > 0.001)
    {
        half yla = (half)saturate(nW.y);
        half kuvio = 0.78h + 0.22h * (half)sin(paikkaW.x * 1.7 + sin(paikkaW.z * 2.3) * 1.3);
        mm = (half)(markyys * _DioraamaMarkyysPaalla) * lerp(0.45h, 1.0h, yla) * kuvio;
        vari *= lerp(1.0h, 0.58h, mm);
        float3 v = normalize(_WorldSpaceCameraPos - paikkaW);
        half fres = (half)pow(1.0 - saturate(dot(nW, v)), 5.0);
        vari += (half3)_DioraamaMarkyysKiilto.rgb * fres * mm * yla * 0.6h;
    }
    return mm;
}

#endif
