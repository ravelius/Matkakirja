// DETALJIKARTAT (omistaja 8.10. 19.5x / PT: Thief-vertailu, LR:n materiaalit; juna 169, Siirtoseppä): pinnan albedo-, normaali- ja
// karheusdetalji triplanaarisesti maailmapaikasta (ei UV:ta; leivottu valo pysyy UV1:llä). Albedo on 0,5-pohjainen overlay
// (×2), normaali tangenttiavaruudessa (OpenGL Y+, ajonaikainen RGB → ×2 − 1) ja sekoitetaan Whiteout-tavalla (Golus), karheus
// (R) himmentää märkyyden kiiltoa. Kutsuja määrittelee materiaalin CBUFFERiin `float4 _Detalji` (x = 1 / toistoväli m,
// y = voima 0–1, z = päällä) — DioraamaRakennus.AsetaDetalji. Pois päältä: ei näytteitä, ei vaikutusta.
#ifndef DIORAAMA_DETALJI_INCLUDED
#define DIORAAMA_DETALJI_INCLUDED

TEXTURE2D(_DetaljiAlbedo); SAMPLER(sampler_DetaljiAlbedo);
TEXTURE2D(_DetaljiNormaali); SAMPLER(sampler_DetaljiNormaali);
TEXTURE2D(_DetaljiKarheus); SAMPLER(sampler_DetaljiKarheus);
TEXTURE2D(_DetaljiKorkeus); SAMPLER(sampler_DetaljiKorkeus);

// PARALLAKSI (POM, LR v45s, juna 169, vain Ultra): korkeuskartta (lineaarinen, 1 = ylin) hallitsevan projektiotason UV:lle; muut
// tasot pelkällä normaalilla. pom.x = syvyys UV-yksiköissä (syvyys_m / m), pom.y = päällä. Häivytys 6–10 m ja loiva kulma (< 15°) pois.
float2 DioraamaParallaksi(float2 uv, float3 V, float3 akseliU, float3 akseliV, float3 akseliN, float syvyys)
{
    float vn = abs(dot(V, akseliN));
    float2 suunta = float2(dot(V, akseliU), dot(V, akseliV)) / max(vn, 0.25);
    const int ASKELIA = 10;
    float2 dUv = suunta * syvyys / ASKELIA;
    float2 gx = ddx(uv), gy = ddy(uv);
    float kerros = 0, syva = 1.0 - SAMPLE_TEXTURE2D_GRAD(_DetaljiKorkeus, sampler_DetaljiKorkeus, uv, gx, gy).r;
    float2 p = uv;
    [loop] for (int i = 0; i < ASKELIA; i++)
    {
        if (kerros >= syva) break;
        p -= dUv; kerros += 1.0 / ASKELIA;
        syva = 1.0 - SAMPLE_TEXTURE2D_GRAD(_DetaljiKorkeus, sampler_DetaljiKorkeus, p, gx, gy).r;
    }
    return p;
}

struct DetaljiTulos
{
    half3 albedo;      // kerroin väriin (1 = ennallaan)
    float3 normaali;   // maailman normaali detaljin kanssa
    half karheus;      // 0 (sileä) … 1 (karhea)
    half valo;         // kohokuvion valokerroin leivotulle valolle (1 = ennallaan)
};

DetaljiTulos DioraamaDetalji(float4 detalji, float3 p, float3 n, float4 pom)
{
    DetaljiTulos t;
    t.albedo = 1; t.normaali = n; t.karheus = 1; t.valo = 1;
    if (detalji.z < 0.5) return t;
    float3 w = pow(abs(n), 4.0); w /= max(1e-4, w.x + w.y + w.z);
    float2 uvX = p.zy * detalji.x, uvY = p.xz * detalji.x, uvZ = p.xy * detalji.x;
    if (pom.y > 0.5 && pom.x > 0)
    {
        float3 V = _WorldSpaceCameraPos - p; float matka = length(V); V /= max(matka, 1e-4);
        float hiv = saturate((10.0 - matka) / 4.0) * step(0.26, abs(dot(V, n)));   // 6–10 m, kulma > 15°
        float syv = pom.x * hiv;
        if (syv > 1e-5)
        {
            if (w.x >= w.y && w.x >= w.z) uvX = DioraamaParallaksi(uvX, V, float3(0, 0, 1), float3(0, 1, 0), float3(1, 0, 0), syv);
            else if (w.y >= w.z) uvY = DioraamaParallaksi(uvY, V, float3(1, 0, 0), float3(0, 0, 1), float3(0, 1, 0), syv);
            else uvZ = DioraamaParallaksi(uvZ, V, float3(1, 0, 0), float3(0, 1, 0), float3(0, 0, 1), syv);
        }
    }
    half v = (half)detalji.y;

    half3 a = SAMPLE_TEXTURE2D(_DetaljiAlbedo, sampler_DetaljiAlbedo, uvX).rgb * (half)w.x
            + SAMPLE_TEXTURE2D(_DetaljiAlbedo, sampler_DetaljiAlbedo, uvY).rgb * (half)w.y
            + SAMPLE_TEXTURE2D(_DetaljiAlbedo, sampler_DetaljiAlbedo, uvZ).rgb * (half)w.z;
    t.albedo = lerp(1.0h, a * 2.0h, v);

    float3 tX = SAMPLE_TEXTURE2D(_DetaljiNormaali, sampler_DetaljiNormaali, uvX).rgb * 2.0 - 1.0;
    float3 tY = SAMPLE_TEXTURE2D(_DetaljiNormaali, sampler_DetaljiNormaali, uvY).rgb * 2.0 - 1.0;
    float3 tZ = SAMPLE_TEXTURE2D(_DetaljiNormaali, sampler_DetaljiNormaali, uvZ).rgb * 2.0 - 1.0;
    // Whiteout-sekoitus: tasokohtainen tangenttinormaali pinnan normaalin päälle, sitten akselit takaisin maailmaan.
    tX = float3(tX.xy + n.zy, abs(tX.z) * n.x);
    tY = float3(tY.xy + n.xz, abs(tY.z) * n.y);
    tZ = float3(tZ.xy + n.xy, abs(tZ.z) * n.z);
    float3 nd = normalize(tX.zyx * w.x + tY.xzy * w.y + tZ.xyz * w.z);
    t.normaali = normalize(lerp(n, nd, v));

    t.karheus = SAMPLE_TEXTURE2D(_DetaljiKarheus, sampler_DetaljiKarheus, uvX).r * (half)w.x
              + SAMPLE_TEXTURE2D(_DetaljiKarheus, sampler_DetaljiKarheus, uvY).r * (half)w.y
              + SAMPLE_TEXTURE2D(_DetaljiKarheus, sampler_DetaljiKarheus, uvZ).r * (half)w.z;

    // Leivotun valon kohokuvio: hallitseva valo ylhäältä ja hieman katsojaa kohti; ero detaljinormaalin ja pinnan välillä.
    float3 L = normalize(float3(0.25, 1.0, 0.15));
    t.valo = (half)saturate(1.0 + (dot(t.normaali, L) - dot(n, L)) * 1.6);
    return t;
}

#endif
