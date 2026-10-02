// KIPSIPÄÄN VARJO PAPERILLE (ERIKOISNOSTOT, Linssiseppä 2.10.2026; web #3866: ShadowMaterial-taso 0,1 yksikköä pään takana,
// peitto 0,26, VSM-pehmeys 10, auringon korkeus kiinnitetty 58°:een). Natiivissa ilman varjokarttaa:
//  - pass 0 "Projektio": pään verkko projisoidaan valon suunnassa paperin tasolle (maailman z = _Taso) ja piirretään
//    valkoisena omaan maskiin (UI/AjattelijaPaat.cs: varjokamera, kerros 14);
//  - pass 1 "Sumennus": erotuva Gaussin sumennus (_Suunta = tekseliaskel), viimeisellä kierroksella peitto ja muste.
// Tulos näytetään UI:ssa pään alla (sama koko ja kehys), joten pää peittää oman varjonsa kuten webissä.
Shader "Matkakirja/Kartta/AjattelijaVarjo"
{
    Properties
    {
        _MainTex("Maski", 2D) = "black" {}
        _Valo("Suunta kohti valoa (maailma)", Vector) = (0, 0.5, -0.85, 0)
        _Taso("Paperin z (maailma)", Float) = 0.1
        _Suunta("Sumennuksen askel (uv)", Vector) = (0.01, 0, 0, 0)
        _Peitto("Peitto (0 = väli, > 0 = viimeinen kierros)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Projektio"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off ZWrite Off ZTest Always
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST, _Valo, _Suunta;
                float _Taso, _Peitto;
            CBUFFER_END
            float4 vert(float4 p : POSITION) : SV_POSITION
            {
                float3 w = TransformObjectToWorld(p.xyz);
                float3 l = normalize(_Valo.xyz);
                // Säde pisteestä poispäin valosta osuu tasoon z = _Taso (valo kohti kameraa: l.z < 0, taso pään takana).
                float t = (w.z - _Taso) / min(l.z, -1e-3);
                return TransformWorldToHClip(w - l * t);
            }
            half4 frag() : SV_Target { return half4(1, 1, 1, 1); }
            ENDHLSL
        }
        Pass
        {
            Name "Sumennus"
            Cull Off ZWrite Off ZTest Always
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST, _Valo, _Suunta;
                float _Taso, _Peitto;
            CBUFFER_END
            struct Vali { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            Vali vert(float4 p : POSITION, float2 uv : TEXCOORD0)
            {
                Vali o;
                o.p = TransformObjectToHClip(p.xyz);
                o.uv = uv;
                return o;
            }
            half4 frag(Vali i) : SV_Target
            {
                // 9 näytettä, σ ≈ 2 askelta.
                const float w[5] = { 0.2042, 0.1802, 0.1238, 0.0663, 0.0276 };
                float a = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv).a * w[0];
                [unroll] for (int k = 1; k < 5; k++)
                {
                    a += SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv + _Suunta.xy * k).a * w[k];
                    a += SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv - _Suunta.xy * k).a * w[k];
                }
                // Väli: maski alfassa. Viimeinen: musta varjo peitolla (ShadowMaterial: väri 0, alfa peitto × varjo).
                return _Peitto > 0 ? half4(0, 0, 0, a * _Peitto) : half4(1, 1, 1, a);
            }
            ENDHLSL
        }
    }
}
