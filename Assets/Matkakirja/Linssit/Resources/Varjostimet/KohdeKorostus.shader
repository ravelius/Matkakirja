// KOHTEEN MUOTOA SEURAAVA KOROSTUS (Linssiseppä 9.10.2026, omistaja: "parempi korostus kuin pyöreä pilvi", PT 00.52): koko ruudun
// passi jälkikäsittelyn jälkeen. Pikselin paikka syvyydestä → paikallinen ENU → kohteen pohjapiirroksen maski (_Maski, ylhäältä,
// pehmeä reuna; Ydin KohdeMuoto). Maskin sisällä maasta katon yläpuolelle asti julkisivut ja katot lämpimän kultaisiksi (yöllä
// julkisivuvalona: alhaalta ylös hiipuva), reunalla maan tasossa pehmeä kultainen ääriviiva. Voima: hehku saapuessa → heikko (A1:n
// ajoitus) × korostusosuus. Taivas ohitetaan. Väri lisätään laattojen päälle (Map Tiles C2), geometriaa ei muuteta.
Shader "Matkakirja/Linssit/KohdeKorostus"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" }
        ZWrite Off Cull Off ZTest Always
        Pass
        {
            Name "KohdeKorostus"
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl"
            #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

            TEXTURE2D(_Maski); SAMPLER(sampler_Maski);
            float4x4 _MaailmaKohde;      // Unityn maailma → kohteen paikallinen ENU (m): x itä, y ylös (maa = 0), z pohjoinen
            float4 _MaskiAlue;           // x, y = maskin lounaiskulma (x, z), z = sivu (m), w = 1 jos maski
            float4 _KorostusParam;       // x = voima 0–1 (hehku × osuus), y = yön osuus 0–1, z = korkeus (m), w = ääriviivan voima

            half4 frag(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                float2 uv = i.texcoord;
                half4 c = SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_PointClamp, uv, 0);
                if (_MaskiAlue.w < 0.5 || _KorostusParam.x <= 0.001) return c;
                float syvyys = SampleSceneDepth(uv);
                #if UNITY_REVERSED_Z
                if (syvyys <= 1e-7) return c;
                #else
                if (syvyys >= 1.0 - 1e-7) return c;
                #endif
                float3 p = mul(_MaailmaKohde, float4(ComputeWorldSpacePosition(uv, syvyys, UNITY_MATRIX_I_VP), 1.0)).xyz;
                float2 muv = (p.xz - _MaskiAlue.xy) / _MaskiAlue.z;
                if (any(muv < 0.0) || any(muv > 1.0)) return c;
                float m = SAMPLE_TEXTURE2D_LOD(_Maski, sampler_Maski, muv, 0).r;
                float korkeus = max(8.0, _KorostusParam.z);
                // Pystysuunta: maasta (−2 m) katon yli (+15 %); yöllä julkisivuvalo hiipuu ylöspäin, päivällä tasainen.
                float pysty = saturate((p.y + 2.0) / 2.0) * saturate((korkeus * 1.15 + 3.0 - p.y) / 3.0);
                float yo = _KorostusParam.y;
                float hiipuma = lerp(1.0, exp(-max(0.0, p.y) / (0.6 * korkeus)), yo);
                float3 kulta = float3(1.0, 0.78, 0.42);
                float w = m * pysty * hiipuma * _KorostusParam.x;
                float3 tulos = c.rgb * (1.0 + w * lerp(0.35, 1.6, yo) * kulta) + kulta * w * lerp(0.02, 0.05, yo);
                // Ääriviiva maassa: maskin reuna (m ≈ 0,5) lähellä maan tasoa.
                float reuna = saturate(1.0 - abs(m - 0.5) * 3.0) * saturate(1.0 - abs(p.y) / 3.0);
                tulos += kulta * reuna * _KorostusParam.w * _KorostusParam.x * lerp(0.35, 0.8, yo);
                return half4((half3)tulos, c.a);
            }
            ENDHLSL
        }
    }
}
