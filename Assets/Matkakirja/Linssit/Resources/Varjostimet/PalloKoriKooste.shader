// KUUMAILMAPALLON KORI PEHMEÄNÄ (omistaja 7.10. 19.0x: "pehmentää sitä koria ja köyttä samalla tavalla kuin kupolassa sen
// ikkunaa"): korin kamera piirtää puolikkaalla resoluutiolla omaan tekstuuriinsa (läpinäkyvä tausta), ja tämä koostaa sen
// kaupungin päälle teltta-suotimella (keskus + neljä vinoa näytettä yhden tekselin päässä ≈ Gauss ~2 näyttöpikseliä, kuten
// Cupolan pehmea4) ja tummentaa aavistuksen (_Tummuus, Cupola 3: 0,85). Kaupunki pysyy terävänä. Esikerrottu alfa.
Shader "Matkakirja/Linssit/PalloKoriKooste"
{
    Properties { _MainTex ("Kori", 2D) = "black" {} _Tummuus ("Tummuus", Float) = 0.85 _Leveys ("Suodin (tekseleinä)", Float) = 1.0 }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "Kooste"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            float _Tummuus; float _Leveys; float4 _MainTex_TexelSize;
            CBUFFER_END
            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.uv = a.uv; return v; }
            half4 frag(V v) : SV_Target
            {
                float2 d = _MainTex_TexelSize.xy * _Leveys;
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv) * 0.36h;
                c += SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv + float2( d.x,  d.y)) * 0.16h;
                c += SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv + float2(-d.x,  d.y)) * 0.16h;
                c += SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv + float2( d.x, -d.y)) * 0.16h;
                c += SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv + float2(-d.x, -d.y)) * 0.16h;
                // Korin tekstuurissa väri on suoraan (a = 1 korissa, 0 taustassa): esikerrotaan alfalla ja tummennetaan.
                c.rgb *= c.a > 0.0h ? (half)_Tummuus : 0.0h;
                return c;
            }
            ENDHLSL
        }
    }
}
