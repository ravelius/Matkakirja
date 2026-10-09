// ELÄVÄ VALO (Linssiseppä 9.10.2026; Päätoimittaja juna 170, elävä taivas ja iltavalot): additiivinen valaisematon valo kärkivärien
// mukaan (valonheittimen keila, lentokoneen tiivistysvana ja navigointivalot). Väri gamma → lineaari kuten ElavaVana, alfa = voima;
// ei syvyyskirjoitusta, molemmat puolet, sumu himmentää kaukaiset (keila ei hehku sumun läpi).
Shader "Matkakirja/Linssit/ElavaValo"
{
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "ElavaValo"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha One
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            struct A { float4 p : POSITION; half4 c : COLOR; };
            struct V { float4 p : SV_POSITION; half4 c : COLOR; float sumu : TEXCOORD0; };
            V vert(A a)
            {
                V v; v.p = TransformObjectToHClip(a.p.xyz); v.c = a.c; v.c.rgb = pow(v.c.rgb, 2.2h);
                v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                // Additiivinen: sumussa valo himmenee kohti nollaa (ei sumun väriin).
                half sumu = (half)saturate(ComputeFogIntensity(v.sumu));
                return half4(v.c.rgb, v.c.a * sumu);
            }
            ENDHLSL
        }
    }
}
