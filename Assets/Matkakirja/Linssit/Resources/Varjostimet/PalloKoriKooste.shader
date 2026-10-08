// KUUMAILMAPALLON KORI PEHMEÄNÄ (omistaja 7.10. 19.0x: "pehmentää sitä koria ja köyttä samalla tavalla kuin kupolassa sen
// ikkunaa"): korin kamera piirtää puolikkaalla resoluutiolla omaan tekstuuriinsa (läpinäkyvä tausta), ja tämä koostaa sen
// kaupungin päälle teltta-suotimella (keskus + neljä vinoa näytettä yhden tekselin päässä ≈ Gauss ~2 näyttöpikseliä, kuten
// Cupolan pehmea4) ja tummentaa aavistuksen (_Tummuus, Cupola 3: 0,85). Kaupunki pysyy terävänä. Esikerrottu alfa.
// LÄMMÖN VÄREILY (Linssiseppä 8.10.2026, pallo Unreal-tasolle kohta 3; Natiiviseppä: tapa (a)): polttimen palaessa (_Vareily > 0)
// kaupunkikameran läpinäkymätön kopio (_CameraOpaqueTexture, PalloKori pyytää sen vain liekin ajaksi) piirretään liekin yläpuolella
// ylöspäin vierivän kohinan vääristämänä; korin pikselit jäävät päälle. Väreilyalue kuvan yläreunan keskellä polttimen kohdalla.
Shader "Matkakirja/Linssit/PalloKoriKooste"
{
    Properties { _MainTex ("Kori", 2D) = "black" {} _Tummuus ("Tummuus", Float) = 0.85 _Leveys ("Suodin (tekseleinä)", Float) = 1.0 _Vareily ("Väreily", Float) = 0 }
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
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareOpaqueTexture.hlsl"
            CBUFFER_START(UnityPerMaterial)
            float _Tummuus; float _Leveys; float4 _MainTex_TexelSize; float _Vareily;
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
                if (_Vareily > 0.001)
                {
                    float2 su = GetNormalizedScreenSpaceUV(v.p);
                    float hx = (su.x - 0.5) / 0.13;
                    float m = exp(-hx * hx) * smoothstep(0.6, 0.86, su.y) * _Vareily;
                    if (m > 0.002)
                    {
                        float t = _Time.y;
                        float2 q = float2(su.x * 22.0, su.y * 14.0 - t * 2.6);
                        float2 n = float2(sin(q.y + sin(q.x * 0.7) * 1.7), cos(q.x * 0.9 + q.y * 1.3 + t * 3.1));
                        half3 kaupunki = SampleSceneColor(saturate(su + n * 0.0045 * m)).rgb;
                        c.rgb += (1.0h - c.a) * (half)m * kaupunki;
                        c.a += (1.0h - c.a) * (half)m;
                    }
                }
                return c;
            }
            ENDHLSL
        }
    }
}
