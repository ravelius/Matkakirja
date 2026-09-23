// Pilvikuori (web js/linssit/astro-sumu.js): tasavälinen pilvikuva pallokuoren
// pinnalla, alfa valmiiksi laskettu (Pilvikuva.Alfa), peitto kameran korkeudesta.
// Ulkopinta näkyy (Cull Back), joten kuoren takapuoli ei piirry pallon eteen.
Shader "Matkakirja/Linssit/Pilvet"
{
    Properties
    {
        _MainTex("Pilvikuva", 2D) = "black" {}
        _Peitto("Peitto", Range(0, 1)) = 0.9
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-50" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                return half4(c.rgb, c.a * _Peitto);
            }
            ENDHLSL
        }
    }
}
