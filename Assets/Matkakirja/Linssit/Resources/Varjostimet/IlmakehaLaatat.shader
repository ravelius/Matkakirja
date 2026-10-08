// GOOGLEN LAATAT ILMAKEHÄSSÄ (Linssiseppä 2, 8.10.2026; PT: pallon maisema Unreal-tasolle, kohdat 2–3): Cesiumin unlit-tilesetin
// ominaisuusnimet (_baseColorTexture, _ST, _baseColorFactor; Cesium asettaa) ja kuvan päälle ilmaperspektiivi (Karttasepän LUT:
// etäisyys, kulma aurinkoon, kameran korkeus → läpäisy ja sironta) sekä pilvien varjot (pilvikenttä auringon suunnassa, ei yöllä).
// Geometria ja kuva ennallaan (renderöintitehoste kuten Cesiumin oma sumu; Map Tiles -ehdot, Karttaseppä 8.10.). Sään sumu MixFogilla.
Shader "Matkakirja/Linssit/IlmakehaLaatat"
{
    Properties
    {
        _baseColorTexture ("Perusväri", 2D) = "white" {}
        _baseColorFactor ("Perusvärin kerroin", Color) = (1, 1, 1, 1)
        _baseColorTextureCoordinateIndex ("UV-kanava", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _baseColorTexture_ST; half4 _baseColorFactor; float _baseColorTextureCoordinateIndex;
        CBUFFER_END
        ENDHLSL
        Pass
        {
            Name "IlmakehaLaatat"
            Tags { "LightMode" = "UniversalForward" }
            Cull Back
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Ilmakeha.hlsl"
            TEXTURE2D(_baseColorTexture); SAMPLER(sampler_baseColorTexture);
            struct A { float4 p : POSITION; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; float3 w : TEXCOORD1; float sumu : TEXCOORD2; };
            V vert(A a)
            {
                V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w);
                float2 uv = _baseColorTextureCoordinateIndex > 0.5 ? a.uv1 : a.uv0;
                v.uv = uv * _baseColorTexture_ST.xy + _baseColorTexture_ST.zw;
                v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                float3 c = SAMPLE_TEXTURE2D(_baseColorTexture, sampler_baseColorTexture, v.uv).rgb * _baseColorFactor.rgb;
                float m = _IlmMaailma.x;
                float3 kohti = v.w - _WorldSpaceCameraPos;
                float etM = length(kohti) * m;
                // Pilvien varjot: kenttä auringon suunnassa pisteen yllä, häipyy auringon laskiessa.
                float varjo = IlmPilvi(v.w * m) * _IlmPilviParam.y * saturate(_IlmAurinko.y * 4.0);
                c *= 1.0 - varjo;
                // Ilmaperspektiivi: läpäisy kanavittain ja sironta (valotus ja sävytys kuten taivaassa), voimalla A/B.
                float3 sironta, lapaisy; IlmIlmaperspektiivi(etM, kohti / max(1e-4, length(kohti)), sironta, lapaisy);
                float3 ap = c * lapaisy + IlmSavytys(sironta * _IlmParam.y);
                c = lerp(c, ap, _IlmParam.z);
                return half4(MixFog((half3)c, v.sumu), 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On
            ColorMask R
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float4 vert(float4 p : POSITION) : SV_POSITION { return TransformObjectToHClip(p.xyz); }
            half frag() : SV_Target { return 0; }
            ENDHLSL
        }
    }
}
