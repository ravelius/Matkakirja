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
            #include "Ilmakeha.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Vari;
            CBUFFER_END
            struct A { float4 p : POSITION; };
            struct V { float4 p : SV_POSITION; float sumu : TEXCOORD0; float3 w : TEXCOORD1; };
            V vert(A a) { V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w); v.sumu = ComputeFogFactor(v.p.z); return v; }
            half4 frag(V v) : SV_Target
            {
                // Loppuillan sininen hetki (LS2 9.10., PT: Tukholman sahalaita mustaa taivasta vasten): täyte taivaanrannan sävyyn.
                float3 c = _Vari.rgb;
                if (_IlmHamara.x > 0.001)
                {
                    float3 dv = normalize(v.w - _WorldSpaceCameraPos);
                    c = lerp(c, IlmSininenHetki(normalize(float3(dv.x, -0.2, dv.z))) / _IlmHamara.x, _IlmHamara.x);
                }
                return half4(MixFog((half3)c, v.sumu), 1);
            }
            ENDHLSL
        }
    }
}
