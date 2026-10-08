// GOOGLEN TIILIREIKIEN TÄYTE (Varsova; Päätoimittaja 8.10.: ei muuta karttakuvaa Googlen laattojen kanssa, Raamatun kaupunkinäkymä-
// linja ja Google Map Tiles -ehdot): aluskerroksen maastomuoto piirretään yhdellä tasaisella sävyllä (_Vari = horisontin/sumun väri,
// CesiumKaupunki asettaa joka kehys) ja Unityn sumulla, jolloin reikä sulautuu utuun eikä näytä kuvaa. Ei tekstuureja.
Shader "Matkakirja/Linssit/ReikaTayte"
{
    Properties
    {
        _Vari ("Sävy", Color) = (0.62, 0.65, 0.70, 1)
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        Pass
        {
            Name "ReikaTayte"
            Tags { "LightMode" = "UniversalForward" }
            Cull Back
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Vari;
            CBUFFER_END
            struct A { float4 p : POSITION; };
            struct V { float4 p : SV_POSITION; float sumu : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.sumu = ComputeFogFactor(v.p.z); return v; }
            half4 frag(V v) : SV_Target { return half4(MixFog(_Vari.rgb, v.sumu), 1); }
            ENDHLSL
        }
    }
}
