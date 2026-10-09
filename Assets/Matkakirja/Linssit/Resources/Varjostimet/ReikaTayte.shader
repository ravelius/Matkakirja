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
        Pass
        {
            Name "DepthNormals"
            Tags { "LightMode" = "DepthNormals" }
            Cull Back
            ZWrite On
            // URP:n DepthNormals-esipassi (Ultra-renderöijän SSAO, lähde DepthNormals) tuottaa kameran syvyystekstuurin: ilman tätä passia
            // kohde puuttuu _CameraDepthTexturesta (9.10. simu: yövalot ja muotokorostus näkivät tyhjän syvyyden).
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            struct A { float4 p : POSITION; };
            struct V { float4 p : SV_POSITION; float3 pw : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.pw = TransformObjectToWorld(a.p.xyz); return v; }
            half4 frag(V v) : SV_Target
            {
                float3 n = normalize(cross(ddy(v.pw), ddx(v.pw)));
                if (dot(n, GetCameraPositionWS() - v.pw) < 0.0) n = -n;
                return half4(n, 0.0);
            }
            ENDHLSL
        }
    }
}
