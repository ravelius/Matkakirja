// OPPAAN LÄHILUOTAIN (OpasLahiluotain): syvyyskameran raaka syvyys (Depth-muotoinen RenderTexture) R-float-tekstuuriin, jotta
// AsyncGPUReadback voi lukea sen (syvyysmuotoja se ei lue). Muunnos metreiksi tehdään C#:ssa (lähi/kauko ja käänteinen Z).
Shader "Matkakirja/Linssit/OpasSyvyys"
{
    Properties { _Syvyys ("Syvyys", 2D) = "white" {} }
    SubShader
    {
        Tags { "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Syvyys"
            // Oma LightMode, jota URP ei piirrä (vrt. Ilmakeha2): vain Graphics.Blit ajaa passin.
            Tags { "LightMode" = "OpasSyvyys" }
            ZTest Always ZWrite Off Cull Off Blend Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            TEXTURE2D(_Syvyys); SAMPLER(sampler_point_clamp);
            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };
            Vali vert(Syote i) { Vali o; o.paikka = TransformObjectToHClip(i.paikka.xyz); o.uv = i.uv; return o; }
            float4 frag(Vali i) : SV_Target { return SAMPLE_TEXTURE2D(_Syvyys, sampler_point_clamp, i.uv).rrrr; }
            ENDHLSL
        }
    }
}
