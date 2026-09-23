// Napakansi: himmeä Lambert-valaistus (päävalo + ympäristö) ja kärkipisteen alfa,
// jolla kalotin reuna häivytetään laattoihin (ks. NapaKannet.cs).
Shader "Matkakirja/Napakansi"
{
    Properties
    {
        _BaseColor("Väri", Color) = (1, 1, 1, 1)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" }
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
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; half4 vari : COLOR; };
            struct Vali { float4 paikka : SV_POSITION; float3 normaali : TEXCOORD0; half4 vari : COLOR; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.normaali = TransformObjectToWorldNormal(i.normaali);
                o.vari = i.vari;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 n = normalize(i.normaali);
                Light valo = GetMainLight();
                half3 valaistus = valo.color * saturate(dot(n, valo.direction)) + SampleSH(n);
                return half4(_BaseColor.rgb * valaistus, _BaseColor.a * i.vari.a);
            }
            ENDHLSL
        }
    }
}
