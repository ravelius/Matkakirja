// OMAT 3D-MALLIT GOOGLEN LAATTOJEN SÄVYYN (Linssiseppä 2, 9.10.2026; omistaja: Notre-Dame ja Kuninkaanlinna "mahdollisimman hyviksi
// väreineen ja valaistuksineen", PT: valo ja liitos LS2:lle). Cesiumin glTF-ominaisuudet (_baseColorTexture/_Factor, _emissive*,
// COLOR_0 = LR:n leivottu AO) kuten CesiumDefaultTilesetShader, mutta valaistus ja ilma samoin kuin IlmakehaLaatat:
//  - aurinko (päävalo, pehmeä kääre) + ympäristövalo (URP:n SH = kaupungin Trilight, YmparistoValo) + pilvien varjot;
//  - ilmaperspektiivi ja loppuillan sininen hetki samoista globaaleista kuin laatoissa (malli ei erotu sumussa eikä illalla);
//  - ILTA (kaupungin valot _IlmMaailma.z): yleinen lämmin julkisivuvalaistus alhaalta (ei minkään valoshow'n jäljitelmä) ja
//    emissiivinen kanava (LR: lasimaalaukset ja ikkunat) hehkuu voimakkaammin.
Shader "Matkakirja/Linssit/OmaMalli"
{
    Properties
    {
        _baseColorTexture ("Perusväri", 2D) = "white" {}
        _baseColorFactor ("Perusvärin kerroin", Color) = (1, 1, 1, 1)
        _baseColorTextureCoordinateIndex ("UV-kanava", Float) = 0
        _emissiveTexture ("Hehku", 2D) = "black" {}
        _emissiveFactor ("Hehkun kerroin", Vector) = (0, 0, 0, 0)
        _emissiveTextureCoordinateIndex ("Hehkun UV-kanava", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _baseColorTexture_ST; half4 _baseColorFactor; float _baseColorTextureCoordinateIndex;
        float4 _emissiveTexture_ST; float4 _emissiveFactor; float _emissiveTextureCoordinateIndex;
        CBUFFER_END
        float4 _OmaValo;   // x valotus (1), y julkisivuvalaistuksen voima illalla, z hehkun voimistus illalla, w varjopuolen nosto
        float2 Kanava(float2 a, float2 b, float2 c, float2 d, float i) { return i < 0.5 ? a : i < 1.5 ? b : i < 2.5 ? c : d; }
        ENDHLSL
        Pass
        {
            Name "OmaMalli"
            Tags { "LightMode" = "UniversalForward" }
            Cull Back
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Ilmakeha.hlsl"
            TEXTURE2D(_baseColorTexture); SAMPLER(sampler_baseColorTexture);
            TEXTURE2D(_emissiveTexture); SAMPLER(sampler_emissiveTexture);
            struct A { float4 p : POSITION; float3 n : NORMAL; float4 c : COLOR; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; float3 w : TEXCOORD1; float3 n : TEXCOORD2; float4 c : TEXCOORD3; float2 uvE : TEXCOORD4; float sumu : TEXCOORD5; };
            V vert(A a)
            {
                V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w); v.n = TransformObjectToWorldNormal(a.n);
                float2 uv = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _baseColorTextureCoordinateIndex);
                v.uv = uv * _baseColorTexture_ST.xy + _baseColorTexture_ST.zw;
                v.uvE = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _emissiveTextureCoordinateIndex) * _emissiveTexture_ST.xy + _emissiveTexture_ST.zw;
                v.c = a.c; v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                float3 albedo = SAMPLE_TEXTURE2D(_baseColorTexture, sampler_baseColorTexture, v.uv).rgb * _baseColorFactor.rgb * v.c.rgb;
                float3 n = normalize(v.n);
                float m = _IlmMaailma.x;
                float3 kohti = v.w - _WorldSpaceCameraPos; float etM = length(kohti) * m; float3 d = kohti / max(1e-4, length(kohti));
                // Aurinko: päävalo (URP), pehmeä kääre (Googlen leivottu valo on pehmeä), varjot jos käytössä, pilvien varjot kuten laatoissa.
                Light valo = GetMainLight(TransformWorldToShadowCoord(v.w));
                float nl = saturate((dot(n, valo.direction) + 0.25) / 1.25);
                float pilvi = IlmPilvi(v.w * m) * _IlmPilviParam.y * saturate(_IlmAurinko.y * 4.0);
                float3 suora = valo.color * nl * valo.shadowAttenuation * (1.0 - pilvi);
                float3 ymparisto = SampleSH(n) * (1.0 + _OmaValo.w * (1.0 - nl));   // varjopuolen nosto (ei ruskeita varjosivuja)
                float3 c = albedo * (suora + ymparisto) * _OmaValo.x;
                // Ilta: lämmin julkisivuvalaistus alhaalta (pystypinnat, vahvin alaosassa), ikkunoiden ja lasimaalausten hehku.
                float yo = saturate(_IlmMaailma.z);
                float korkeus = max(0.0, v.w.y * m), pysty = 1.0 - abs(n.y);
                float3 julkisivu = float3(1.0, 0.80, 0.56) * (0.45 + 0.55 * exp(-korkeus / 35.0)) * pysty * _OmaValo.y * yo;
                c += albedo * julkisivu;
                float3 hehku = SAMPLE_TEXTURE2D(_emissiveTexture, sampler_emissiveTexture, v.uvE).rgb * _emissiveFactor.rgb;
                c += hehku * (1.0 + _OmaValo.z * yo);
                // Ilmaperspektiivi ja loppuillan sävy kuten IlmakehaLaatat (sama kaava).
                float3 sironta, lapaisy; IlmIlmaperspektiivi(etM, d, sironta, lapaisy);
                c = lerp(c, c * lapaisy + IlmSavytys(sironta * _IlmParam.y), _IlmParam.z);
                c *= lerp((float3)1.0, float3(0.55, 0.60, 0.78), _IlmHamara.x * (1.0 - 0.6 * yo));
                return half4(MixFog((half3)c, v.sumu), 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "ShadowCaster"
            Tags { "LightMode" = "ShadowCaster" }
            ZWrite On ColorMask 0
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float3 _LightDirection;
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"
            struct A { float4 p : POSITION; float3 n : NORMAL; };
            float4 vert(A a) : SV_POSITION
            {
                float3 w = TransformObjectToWorld(a.p.xyz), n = TransformObjectToWorldNormal(a.n);
                float4 p = TransformWorldToHClip(ApplyShadowBias(w, n, _LightDirection));
                #if UNITY_REVERSED_Z
                p.z = min(p.z, UNITY_NEAR_CLIP_VALUE);
                #else
                p.z = max(p.z, UNITY_NEAR_CLIP_VALUE);
                #endif
                return p;
            }
            half4 frag() : SV_Target { return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On ColorMask R
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float4 vert(float4 p : POSITION) : SV_POSITION { return TransformObjectToHClip(p.xyz); }
            half frag() : SV_Target { return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthNormals"
            Tags { "LightMode" = "DepthNormals" }
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            struct A { float4 p : POSITION; float3 n : NORMAL; };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.n = TransformObjectToWorldNormal(a.n); return v; }
            half4 frag(V v) : SV_Target { return half4(normalize(v.n), 0.0); }
            ENDHLSL
        }
    }
}
