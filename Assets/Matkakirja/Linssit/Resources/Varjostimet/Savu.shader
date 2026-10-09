// LAIVOJEN SAVU JA HÖYRY (Linssiseppä 2, 9.10.2026; VeneSavu): ParticleSystemin billboard-hiukkaset, pehmeä pyöreä läikkä uv:sta
// (ei tekstuuria), väri ja peitto hiukkasen vertex-väristä (colorOverLifetime), sumu kuten muulla kaupungilla. Läpinäkyvä, ei syvyyttä.
Shader "Matkakirja/Linssit/Savu"
{
    Properties { }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Savu"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            struct A { float4 p : POSITION; half4 c : COLOR; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; half4 c : COLOR; float2 uv : TEXCOORD0; float sumu : TEXCOORD1; };
            V vert(A a)
            {
                V v; v.p = TransformObjectToHClip(a.p.xyz); v.c = a.c; v.uv = a.uv; v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                float2 q = v.uv * 2.0 - 1.0;
                float r = dot(q, q), reuna = saturate(1.0 - r);
                // Pehmeä pilvimäinen läikkä: kaksi siniaaltoa reunaan (ei tekstuuria, ei ympyrän kovaa reunaa).
                float muoto = reuna * reuna * (0.8 + 0.2 * sin(q.x * 5.0 + q.y * 3.0));
                return half4(MixFog(v.c.rgb, v.sumu), saturate(muoto * v.c.a));
            }
            ENDHLSL
        }
    }
}
