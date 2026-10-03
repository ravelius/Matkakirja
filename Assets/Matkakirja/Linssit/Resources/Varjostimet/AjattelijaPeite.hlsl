// AJATTELIJAN PEITE (yhteinen AjattelijaPeite- ja AjattelijaKipsi-varjostimille): webin CSS-kerrokset kuvan päällä —
// pystyvinjetti laajoissa otoksissa (52 %:sta alas: 0,05 / 0,3 / 0,58 / 0,65 ja säteittäinen 0,18) ja lähderivin
// liukuväri alareunassa (läpinäkyvä → --tk-himmennys-tumma). CSS sekoittaa sRGB-arvoina, joten sekoitus tehdään tässä
// sRGB:nä täsmälleen: c = c · (1 − a1), sitten c = c · (1 − a2) + H · a2 (DOM-järjestys: kangas, vinjetti, lähde).
// Kipsi soveltaa sen bystin pikseleihin, peite taustan pikseleihin (syvyystesti kauko-tasolla), joten kuvan alfa pysyy 1:nä.
// (3.10.2026: alfasekoitus lineaarisena jätti kuvaan alfan < 1, ja UI Toolkit sekoitti kuvan KUVANÄKYMÄN lämpimän
// pinnan #201a14 päälle: punertava hehku ja ~10 % himmeämpi bysti vinjetin alueella; 2,2-potenssin likiarvo tummensi lisää.)
#ifndef AJATTELIJA_PEITE_HLSL
#define AJATTELIJA_PEITE_HLSL

float4 _Peite;          // x vinjetti 0…1, y lähteen liukuväri 0…1, z liukuvärin korkeus (osuus kuvasta)
float4 _HimmennysVari;  // --tk-himmennys-tumma (sRGB rgb, a) — asetetaan SetVectorilla (ei lineaarimuunnosta)

// sRGB ↔ lineaarinen (IEC 61966-2-1); oma kaava, koska Core.hlsl ei tuo Color.hlsl:n muunnoksia (Metal-käännös 2.10.).
float3 PeiteLineaariseksi(float3 c) { return lerp(pow((c + 0.055) / 1.055, 2.4), c / 12.92, step(c, 0.04045)); }
float3 PeiteSrgb(float3 c) { c = max(c, 0.0); return lerp(1.055 * pow(c, 1.0 / 2.4) - 0.055, c * 12.92, step(c, 0.0031308)); }
float PeiteVali(float y, float a, float b, float pa, float pb) { return lerp(pa, pb, saturate((y - a) / (b - a))); }

/// Leikkausavaruuden paikasta CSS:n uv (0,0 vasen yläkulma), sama kuva molemmissa varjostimissa.
float2 PeiteUv(float4 leikkaus)
{
    float2 uv = leikkaus.xy / leikkaus.w * 0.5 + 0.5;
#if UNITY_UV_STARTS_AT_TOP
    uv.y = 1.0 - uv.y;
#endif
    return uv;
}

/// CSS-kerrokset sRGB-värin päälle (uv: x vasemmalta, y = 1 − uv.y ylhäältä kuten CSS).
float3 PeiteSrgbVariin(float3 c, float2 uv)
{
    float y = 1.0 - uv.y;   // 0 ylhäällä kuten CSS
    float pysty = y < 0.52 ? 0.0 : y < 0.62 ? PeiteVali(y, 0.52, 0.62, 0.0, 0.05) : y < 0.78 ? PeiteVali(y, 0.62, 0.78, 0.05, 0.3)
        : y < 0.92 ? PeiteVali(y, 0.78, 0.92, 0.3, 0.58) : PeiteVali(y, 0.92, 1.0, 0.58, 0.65);
    float2 e = (uv - 0.5) * 2.0;
    float sade = saturate((length(e) / sqrt(2.0) - 0.55) / 0.45);
    float vin = 1.0 - (1.0 - pysty) * (1.0 - 0.18 * sade);
    float a1 = vin * _Peite.x;
    float l = saturate((y - (1.0 - _Peite.z)) / max(_Peite.z, 1e-4));
    float a2 = l * _HimmennysVari.a * _Peite.y;
    c *= 1.0 - a1;
    return c * (1.0 - a2) + _HimmennysVari.rgb * a2;
}

/// Lineaarinen väri → CSS-kerrokset sRGB:nä → lineaarinen (kipsi).
float3 PeiteLineaariseen(float3 lineaarinen, float2 uv)
{
    if (_Peite.x <= 0.0 && _Peite.y <= 0.0) return lineaarinen;
    return PeiteLineaariseksi(PeiteSrgbVariin(PeiteSrgb(lineaarinen), uv));
}
#endif
