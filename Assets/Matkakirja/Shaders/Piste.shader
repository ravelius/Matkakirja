// Kaupunkipiste: pyöreä täplä neliöstä (UV-etäisyys keskeltä), pehmeä reuna ja
// vaalea kehä, jotta piste erottuu sekä maalta että mereltä.
Shader "Matkakirja/Piste"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.23, 0.18, 0.13, 1)
        _Kehys("Kehä", Color) = (0.97, 0.94, 0.86, 1)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+1" "RenderPipeline" = "UniversalPipeline" }
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
                half4 _BaseColor;
                half4 _Kehys;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv * 2.0 - 1.0;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                float w = fwidth(r);
                half sisa = 1.0 - smoothstep(0.62 - w, 0.62 + w, r);
                half ulko = 1.0 - smoothstep(1.0 - 2.0 * w, 1.0, r);
                half3 vari = lerp(_Kehys.rgb, _BaseColor.rgb, sisa);
                return half4(vari, ulko * _BaseColor.a);
            }
            ENDHLSL
        }
    }
}
