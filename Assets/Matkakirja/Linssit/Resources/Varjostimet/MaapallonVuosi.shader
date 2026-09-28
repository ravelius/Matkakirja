// Maapallon vuosi -linssin kuukausikuori (VuosiKuori; web js/linssit/maapallon-vuosi.js piirtojarjestys):
// pohja A, pohja B painolla _T (kuukauden ristihäivytys), sitten kerroskuvat K1 ja K2 omilla alfoillaan
// (kerroksen PNG:n oma alfa × peitto). Läpinäkymätön, joten Cesium-pallo jää alle. Kevyt reunan tummennus kuten
// webin Globe.gl-pallossa (valo katsojan suunnasta): keskellä täysi kirkkaus, reunalla 0,72.
Shader "Matkakirja/Linssit/MaapallonVuosi"
{
    Properties
    {
        _PohjaA("Pohja A (BMNG)", 2D) = "black" {}
        _PohjaB("Pohja B (BMNG)", 2D) = "black" {}
        _T("Pohjan B paino", Range(0, 1)) = 0
        _Kerros1("Kerros 1", 2D) = "black" {}
        _Alfa1("Kerroksen 1 alfa", Range(0, 1)) = 0
        _Kerros2("Kerros 2", 2D) = "black" {}
        _Alfa2("Kerroksen 2 alfa", Range(0, 1)) = 0
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry+10" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_PohjaA); SAMPLER(sampler_PohjaA);
            TEXTURE2D(_PohjaB); SAMPLER(sampler_PohjaB);
            TEXTURE2D(_Kerros1); SAMPLER(sampler_Kerros1);
            TEXTURE2D(_Kerros2); SAMPLER(sampler_Kerros2);
            CBUFFER_START(UnityPerMaterial)
                float4 _PohjaA_ST, _PohjaB_ST, _Kerros1_ST, _Kerros2_ST;
                half _T, _Alfa1, _Alfa2;
                float4 _Keskus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 maailma : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 c = SAMPLE_TEXTURE2D(_PohjaA, sampler_PohjaA, i.uv).rgb;
                if (_T > 0.001h) c = lerp(c, SAMPLE_TEXTURE2D(_PohjaB, sampler_PohjaB, i.uv).rgb, _T);
                if (_Alfa1 > 0.001h)
                {
                    half4 k = SAMPLE_TEXTURE2D(_Kerros1, sampler_Kerros1, i.uv);
                    c = lerp(c, k.rgb, k.a * _Alfa1);
                }
                if (_Alfa2 > 0.001h)
                {
                    half4 k = SAMPLE_TEXTURE2D(_Kerros2, sampler_Kerros2, i.uv);
                    c = lerp(c, k.rgb, k.a * _Alfa2);
                }
                float3 n = normalize(i.maailma - _Keskus.xyz);
                float3 v = normalize(GetCameraPositionWS() - i.maailma);
                half valo = lerp(0.72h, 1.0h, (half)pow(saturate(dot(n, v)), 0.6));
                return half4(c * valo, 1.0h);
            }
            ENDHLSL
        }
    }
}
