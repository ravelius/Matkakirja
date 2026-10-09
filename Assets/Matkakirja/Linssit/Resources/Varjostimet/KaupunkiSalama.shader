// KAUKAINEN SALAMA (Linssiseppä 9.10.2026; Päätoimittaja, junan 171 erä): salaman pultti additiivisena nauhana kärkiväreillä (ydin ja
// hehku, alfa = kärjen osuus) × _Voima (välähdyksen kirkkaus, MaterialPropertyBlock). Sumu himmentää vain vähän (salama näkyy sateen
// läpi), ei syvyyskirjoitusta, molemmat puolet. Unity-puoli KaupunkiSalamat.
Shader "Matkakirja/Linssit/KaupunkiSalama"
{
    Properties
    {
        _Voima ("Voima", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "KaupunkiSalama"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha One
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            float _Voima;
            CBUFFER_END
            struct A { float4 p : POSITION; half4 c : COLOR; };
            struct V { float4 p : SV_POSITION; half4 c : COLOR; float sumu : TEXCOORD0; };
            V vert(A a)
            {
                V v; v.p = TransformObjectToHClip(a.p.xyz); v.c = a.c;
                v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                half sumu = (half)pow(saturate(ComputeFogIntensity(v.sumu)), 0.3);
                return half4(v.c.rgb * 4.0h, saturate(v.c.a * (half)_Voima * (0.35h + 0.65h * sumu)));
            }
            ENDHLSL
        }
    }
}
