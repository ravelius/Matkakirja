// KAUPUNGIN YÖVALOT (kuvanlaatujärjestys kohta 2, Linssiseppä 6.10.2026; omistaja: natrium-oranssi): koko ruudun passi
// jälkikäsittelyn jälkeen (valot eivät tummu yön valotuksessa). Ruudun pisteen paikka syvyydestä → paikallinen ENU (metriä,
// CesiumGeoreferencen origo) → asteet → Black Marble -ruudukko (_Valot, 3 × 3 astetta, R8). Kaksi osaa:
//  - hehku: pehmeä valomatto Black Marblen mukaan (kaukana koko kaupunki hohtaa),
//  - pisteet: katuvalot ~_Solu m:n soluissa, jokaisessa satunnainen piste, joka palaa todennäköisyydellä Black Marblen arvo;
//    piste on vähintään ~1 pikselin kokoinen ja häipyy hehkuksi, kun solu on alle 2 pikseliä (ei välkettä kaukana).
// Taivas (syvyys kaukotasossa) ohitetaan. KaupunkiYovalot.cs kytkee passin FullScreenPassRendererFeaturena vain yöllä.
Shader "Matkakirja/Linssit/KaupunkiYovalot"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" }
        ZWrite Off Cull Off ZTest Always
        Pass
        {
            Name "Yovalot"
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl"
            #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

            TEXTURE2D(_Valot); SAMPLER(sampler_Valot);
            float4x4 _MaailmaPaikallinen;   // Unityn maailma → paikallinen ENU (m): x itä, y ylös, z pohjoinen
            float4 _ValoAlue;               // x = ruudukon lounaiskulman lon, y = lat, z = origon lat, w = origon lon
            float4 _ValoParam;              // x = osuus 0–1, y = hehkun voima, z = pisteiden voima, w = solukoko (m)
            float4 _ValoVari;               // natrium (rgb), a = valkoisten LED-pisteiden osuus

            float3 Hash32(float2 p)
            {
                float3 p3 = frac(float3(p.xyx) * float3(0.1031, 0.1030, 0.0973));
                p3 += dot(p3, p3.yxz + 33.33);
                return frac((p3.xxy + p3.yzz) * p3.zyx);
            }

            float BlackMarble(float3 paikka)
            {
                const float R = 6371000.0, ASTE = 57.2957795;
                float lat = _ValoAlue.z + paikka.z / R * ASTE;
                float lon = _ValoAlue.w + paikka.x / (R * cos(_ValoAlue.z / ASTE)) * ASTE;
                float2 uv = float2((lon - _ValoAlue.x) / 3.0, (lat - _ValoAlue.y) / 3.0);
                if (any(uv < 0.0) || any(uv > 1.0)) return 0.0;
                return SAMPLE_TEXTURE2D_LOD(_Valot, sampler_Valot, uv, 0).r;
            }

            half4 frag(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                float2 uv = i.texcoord;
                half4 c = SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_PointClamp, uv, 0);
                float syvyys = SampleSceneDepth(uv);
                #if UNITY_REVERSED_Z
                if (syvyys <= 1e-7) return c;
                #else
                if (syvyys >= 1.0 - 1e-7) return c;
                #endif
                float3 maailma = ComputeWorldSpacePosition(uv, syvyys, UNITY_MATRIX_I_VP);
                float3 paikka = mul(_MaailmaPaikallinen, float4(maailma, 1.0)).xyz;
                float bm = BlackMarble(paikka);
                if (bm <= 0.002) return c;

                // Pikselin koko maassa (m): derivaatat paikallisesta paikasta.
                float jalanjalki = max(length(ddx(paikka)), length(ddy(paikka)));
                float solu = _ValoParam.w;
                float pisteet = 0.0; float3 pisteVari = 0.0;
                float nakyvyys = saturate(2.0 - jalanjalki * 2.0 / solu);   // solu alle 2 px → pisteet häipyvät hehkuun
                if (nakyvyys > 0.0)
                {
                    float2 p = paikka.xz / solu, ci = floor(p);
                    float sade = max(1.6, jalanjalki * 0.9) / solu;          // vähintään ~1 px, lähellä ~1,6 m:n lamppu
                    for (int y = -1; y <= 1; y++)
                    for (int x = -1; x <= 1; x++)
                    {
                        float2 s = ci + float2(x, y);
                        float3 h = Hash32(s);
                        if (h.z > bm * 1.15) continue;                           // palaa Black Marblen todennäköisyydellä
                        float2 d = p - (s + 0.15 + 0.7 * h.xy);
                        float w = exp(-dot(d, d) / (sade * sade));
                        float led = step(1.0 - _ValoVari.a, frac(h.z * 7.13));   // osa pisteistä valkoisia LED-valoja
                        pisteet += w;
                        pisteVari += w * lerp(_ValoVari.rgb, float3(0.95, 0.97, 1.0), led);
                    }
                    pisteVari /= max(pisteet, 1e-4);
                }
                float hehku = bm * bm * (0.35 + 0.65 * (1.0 - nakyvyys));
                float3 lisa = _ValoVari.rgb * hehku * _ValoParam.y + pisteVari * pisteet * nakyvyys * _ValoParam.z;
                return half4(c.rgb + (half3)(lisa * _ValoParam.x), c.a);
            }
            ENDHLSL
        }
    }
}
