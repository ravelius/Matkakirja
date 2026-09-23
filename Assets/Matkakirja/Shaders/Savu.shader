// Koneen savujana (LENNON ESITYS): LineRendererin kärkivärit (alfa häipyy hännässä),
// pehmeä reuna nauhan poikki (uv.y), ei syvyyskirjoitusta.
Shader "Matkakirja/Savu"
{
    Properties
    {
        _Color("Väri", Color) = (1, 1, 1, 0.8)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+10" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Color;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; half4 vari : COLOR; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; half4 vari : COLOR; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.vari = i.vari * _Color;
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half poikki = 1.0 - abs(i.uv.y * 2.0 - 1.0);
                half4 c = i.vari;
                c.a *= smoothstep(0.0, 0.7, poikki);
                return c;
            }
            ENDHLSL
        }
    }
}
