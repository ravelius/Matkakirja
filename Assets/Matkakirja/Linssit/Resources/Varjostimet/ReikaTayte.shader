// GOOGLEN TIILIREIKIEN TÄYTE (Varsova; Päätoimittaja 8.10.: ei muuta karttakuvaa Googlen laattojen kanssa, Raamatun kaupunkinäkymä-
// linja ja Google Map Tiles -ehdot): aluskerroksen maastomuoto piirretään yhdellä tasaisella sävyllä (_Vari = horisontin/sumun väri,
// CesiumKaupunki asettaa joka kehys) ja Unityn sumulla, jolloin reikä sulautuu utuun eikä näytä kuvaa. Ei tekstuureja.
// ILMAKEHÄN SÄVY (LS2 9.10., PT päätös B: ei karttakuvaa, täyte paremmaksi ilman kuvaa): kun kaupungin ilmakehä on päällä, täyte on
// tasainen maan perussävy (_MaaVari, ei kuvaa) maastomuodon varjostuksella (normaali derivaatoista, aurinko _IlmAurinko) ja pilvien
// varjoilla, ja siihen ilmaperspektiivi samoista mitatuista taulukoista ja samalla kaavalla kuin laatoissa. Kaukana täyte liukuu utuun
// samoin kuin Googlen laatat, eikä vakiosumunsävy erotu valkoisena läiskänä. Ilman ilmakehää ennallaan _Vari.
Shader "Matkakirja/Linssit/ReikaTayte"
{
    Properties
    {
        _Vari ("Sävy", Color) = (0.62, 0.65, 0.70, 1)
        _MaaVari ("Maan perussävy (lineaarinen)", Color) = (0.075, 0.085, 0.068, 1)
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
            half4 _Vari; half4 _MaaVari;
            CBUFFER_END
            struct A { float4 p : POSITION; };
            struct V { float4 p : SV_POSITION; float sumu : TEXCOORD0; float3 w : TEXCOORD1; };
            V vert(A a) { V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w); v.sumu = ComputeFogFactor(v.p.z); return v; }
            half4 frag(V v) : SV_Target
            {
                // Loppuillan sininen hetki (LS2 9.10., PT: Tukholman sahalaita mustaa taivasta vasten): täyte taivaanrannan sävyyn.
                float3 c = _Vari.rgb;
                if (_IlmParam.w > 0.001)
                {
                    float m = _IlmMaailma.x; float3 kohti = v.w - _WorldSpaceCameraPos; float3 dv = kohti / max(1e-4, length(kohti));
                    float3 n = normalize(cross(ddy(v.w), ddx(v.w))); n *= sign(n.y + 1e-4);
                    float nl = saturate((dot(n, _IlmAurinko.xyz) + 0.3) / 1.3) * saturate(_IlmAurinko.y * 6.0 + 0.1);
                    float3 maa = _MaaVari.rgb * (0.55 + 0.75 * nl);
                    maa *= 1.0 - IlmPilvi(v.w * m) * _IlmPilviParam.y * saturate(_IlmAurinko.y * 4.0);
                    maa *= lerp((float3)1.0, float3(0.55, 0.60, 0.78), _IlmHamara.x);
                    float3 sironta, lapaisy; IlmIlmaperspektiivi(length(kohti) * m, dv, sironta, lapaisy);
                    maa = lerp(maa, maa * lapaisy + IlmSavytys(sironta * _IlmParam.y), _IlmParam.z);
                    c = lerp(c, maa, saturate(_IlmParam.w));
                }
                if (_IlmHamara.x > 0.001)
                {
                    float3 dv = normalize(v.w - _WorldSpaceCameraPos);
                    c = lerp(c, IlmSininenHetki(normalize(float3(dv.x, -0.2, dv.z))) / _IlmHamara.x, _IlmHamara.x);
                }
                return half4(MixFog((half3)c, v.sumu), 1);
            }
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
