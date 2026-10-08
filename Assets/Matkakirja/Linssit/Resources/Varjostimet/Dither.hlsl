// DITHER HDR-PUSKURIIN (Linssiseppä 2, 9.10.2026): yhteinen taivaille ja vedelle (Ilmakeha.hlsl, DioraamaTaivas).
#ifndef MATKAKIRJA_DITHER
#define MATKAKIRJA_DITHER

/// Ditheröinti HDR-puskuriin (PT 9.10. 00.02, omistajan TF 167 -kuva Pariisista: taivaassa portaittaiset vaakaraidat). URP:n
/// HDR-puskuri on 32-bittinen B10G11R11 (Mobile/PC_RPAsset m_HDRColorBufferPrecision 0): mantissa R/G 6 bittiä ja B 5 bittiä, joten
/// tasainen sininen liukuma kvantisoituu ~3 %:n portaisiin. Kolmiojakautunut kohina (kaksi interleaved gradient -näytettä, ±1 askel)
/// suhteessa arvoon ennen kirjoitusta hajottaa portaat; staattinen ruudun koordinaateista (ei värinää).
float IlmIgn(float2 p) { return frac(52.9829189 * frac(dot(p, float2(0.06711056, 0.00583715)))); }
float3 IlmDither(float3 c, float2 ruutu)
{
    float n = IlmIgn(ruutu) + IlmIgn(ruutu + float2(47.0, 17.0)) - 1.0;
    return max(0.0, c * (1.0 + n * float3(1.0 / 64.0, 1.0 / 64.0, 1.0 / 32.0)) + n * (1.0 / 1024.0));
}

#endif
