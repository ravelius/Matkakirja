// GOOGLEN LAATAT ILMAKEHÄSSÄ (Linssiseppä 2, 8.10.2026; PT: pallon maisema Unreal-tasolle, kohdat 2–3): Cesiumin unlit-tilesetin
// ominaisuusnimet (_baseColorTexture, _ST, _baseColorFactor; Cesium asettaa) ja kuvan päälle ilmaperspektiivi (Karttasepän LUT:
// etäisyys, kulma aurinkoon, kameran korkeus → läpäisy ja sironta) sekä pilvien varjot (pilvikenttä auringon suunnassa, ei yöllä).
// Geometria ja kuva ennallaan (renderöintitehoste kuten Cesiumin oma sumu; Map Tiles -ehdot, Karttaseppä 8.10.). Sään sumu MixFogilla.
// Cesiumin polygonileikkaus (CesiumOmatMallit: CesiumPolygonRasterOverlay, materialKey "Clipping"; LS1:n katselmointi 8.10.): sama kaava
// kuin CesiumUnlitTilesetShaderissa (CesiumRasterOverlay-alikaavio: uv = valittu UV-kanava × skaala + siirto, v käännetty; alfaraja 0,5).
Shader "Matkakirja/Linssit/IlmakehaLaatat"
{
    Properties
    {
        _baseColorTexture ("Perusväri", 2D) = "white" {}
        _baseColorFactor ("Perusvärin kerroin", Color) = (1, 1, 1, 1)
        _baseColorTextureCoordinateIndex ("UV-kanava", Float) = 0
        _overlayTexture_Clipping ("Leikkaus", 2D) = "black" {}
        _overlayTextureCoordinateIndex_Clipping ("Leikkauksen UV-kanava", Float) = 0
        _overlayTranslationAndScale_Clipping ("Leikkauksen siirto ja skaala", Vector) = (0, 0, 1, 1)
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _baseColorTexture_ST; half4 _baseColorFactor; float _baseColorTextureCoordinateIndex;
        float _overlayTextureCoordinateIndex_Clipping; float4 _overlayTranslationAndScale_Clipping;
        CBUFFER_END
        TEXTURE2D(_overlayTexture_Clipping); SAMPLER(sampler_overlayTexture_Clipping);
        float2 Kanava(float2 a, float2 b, float2 c, float2 d, float i) { return i < 0.5 ? a : i < 1.5 ? b : i < 2.5 ? c : d; }
        /// Cesiumin leikkaus: polygonin sisällä peite (alfa > 0,5) → pikseli pois.
        void Leikkaa(float2 uv)
        {
            float4 t = _overlayTranslationAndScale_Clipping;
            float2 q = uv * t.zw + t.xy; q.y = 1.0 - q.y;
            clip(0.5 - SAMPLE_TEXTURE2D(_overlayTexture_Clipping, sampler_overlayTexture_Clipping, q).a);
        }
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
            struct A { float4 p : POSITION; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; float3 w : TEXCOORD1; float sumu : TEXCOORD2; float2 leik : TEXCOORD3; };
            V vert(A a)
            {
                V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w);
                float2 uv = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _baseColorTextureCoordinateIndex);
                v.uv = uv * _baseColorTexture_ST.xy + _baseColorTexture_ST.zw;
                v.leik = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _overlayTextureCoordinateIndex_Clipping);
                v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                Leikkaa(v.leik);
                float3 c = SAMPLE_TEXTURE2D(_baseColorTexture, sampler_baseColorTexture, v.uv).rgb * _baseColorFactor.rgb;
                float m = _IlmMaailma.x;
                float3 kohti = v.w - _WorldSpaceCameraPos;
                float etM = length(kohti) * m;
                // Pilvien varjot: kenttä auringon suunnassa pisteen yllä, häipyy auringon laskiessa.
                float varjo = IlmPilvi(v.w * m) * _IlmPilviParam.y * saturate(_IlmAurinko.y * 4.0);
                c *= 1.0 - varjo;
                // MÄRÄT KADUT (Ydin KaupunkiKuuro.Markyys; omistaja TF 168): ylöspäin osoittavat pinnat (geometrian normaali derivaatoista,
                // Googlen laatoissa ei normaaleja) tummuvat ja heijastavat taivasta Fresnelillä; lätäköt kohinasta 3 m:n mittakaavassa.
                if (_IlmSaa.x > 0.001)
                {
                    float3 n = normalize(cross(ddy(v.w), ddx(v.w))); n *= sign(n.y + 1e-4);
                    float ylos = smoothstep(0.8, 0.95, n.y);
                    float2 lc = floor(v.w.xz * m / 3.0); float latakko = frac(sin(dot(lc, float2(12.9898, 78.233))) * 43758.5453);
                    float mark = _IlmSaa.x * ylos * (0.6 + 0.4 * latakko);
                    float3 dv = kohti / max(1e-4, length(kohti)), r = reflect(dv, float3(0, 1, 0));
                    float fres = 0.02 + 0.98 * pow(1.0 - saturate(-dv.y), 5.0);
                    c *= 1.0 - 0.35 * mark;
                    c = lerp(c, IlmSavytys(IlmTaivas(r) * _IlmParam.y), saturate(fres * mark * 0.8));
                }
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
            struct A { float4 p : POSITION; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float2 leik : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.leik = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _overlayTextureCoordinateIndex_Clipping); return v; }
            half frag(V v) : SV_Target { Leikkaa(v.leik); return 0; }
            ENDHLSL
        }
    }
}
