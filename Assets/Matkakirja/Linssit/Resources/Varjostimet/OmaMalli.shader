// OMAT 3D-MALLIT GOOGLEN LAATTOJEN SÄVYYN (Linssiseppä 2, 9.10.2026; omistaja: Notre-Dame ja Kuninkaanlinna "mahdollisimman hyviksi
// väreineen ja valaistuksineen", PT: valo ja liitos LS2:lle). Cesiumin glTF-ominaisuudet (_baseColorTexture/_Factor, _emissive*,
// COLOR_0 = LR:n leivottu AO) kuten CesiumDefaultTilesetShader, mutta valaistus ja ilma samoin kuin IlmakehaLaatat:
//  - aurinko (päävalo, pehmeä kääre) + ympäristövalo (URP:n SH = kaupungin Trilight, YmparistoValo) + pilvien varjot;
//  - ilmaperspektiivi ja loppuillan sininen hetki samoista globaaleista kuin laatoissa (malli ei erotu sumussa eikä illalla);
//  - ILTA (kaupungin valot _IlmMaailma.z): yleinen lämmin julkisivuvalaistus alhaalta (ei minkään valoshow'n jäljitelmä) ja
//    emissiivinen kanava (LR: lasimaalaukset ja ikkunat) hehkuu voimakkaammin.
//  - PBR-PINNAT (omistaja 9.10.: "oikeat pintatekstuurit", PT junaan 173): glTF:n normalTexture (scale), metallicRoughnessTexture
//    (G = karheus, B = metalli, kertoimet _metallicRoughnessFactor.xy) ja occlusionTexture (R × strength) Cesiumin nimillä. Mallit
//    ovat ilman TANGENT-attribuuttia, joten tangenttikehys lasketaan pikselissä derivaatoista (kotangenttikehys, ei esilaskentaa).
//    Kiilto: auringon GGX-heijastus ja ympäristön heijastus URP:n SH:sta (Karisin mobiili-BRDF-arvio); metalli ottaa sävyn perusväristä.
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
        _normalMapTexture ("Normaalikartta", 2D) = "bump" {}
        _normalMapScale ("Normaalikartan voima", Float) = 1
        _normalMapTextureCoordinateIndex ("Normaalikartan UV-kanava", Float) = 0
        _metallicRoughnessTexture ("Metalli ja karheus (G, B)", 2D) = "white" {}
        _metallicRoughnessFactor ("Metalli, karheus", Vector) = (0, 1, 0, 0)
        _metallicRoughnessTextureCoordinateIndex ("Metallin UV-kanava", Float) = 0
        _occlusionTexture ("Peitto (R)", 2D) = "white" {}
        _occlusionStrength ("Peiton voima", Float) = 0
        _occlusionTextureCoordinateIndex ("Peiton UV-kanava", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _baseColorTexture_ST; half4 _baseColorFactor; float _baseColorTextureCoordinateIndex;
        float4 _emissiveTexture_ST; float4 _emissiveFactor; float _emissiveTextureCoordinateIndex;
        float4 _normalMapTexture_ST; float _normalMapScale; float _normalMapTextureCoordinateIndex;
        float4 _metallicRoughnessTexture_ST; float4 _metallicRoughnessFactor; float _metallicRoughnessTextureCoordinateIndex;
        float4 _occlusionTexture_ST; float _occlusionStrength; float _occlusionTextureCoordinateIndex;
        CBUFFER_END
        float4 _OmaAurinko;   // omien mallien aurinko (KaupunkiIlmakeha.OmaAtsimuutti): laattojen leivottu atsimuutti, todellinen korkeus
        float4 _OmaValo;   // x valotus (1), y julkisivuvalaistuksen voima illalla, z hehkun voimistus illalla, w varjopuolen nosto
        float2 Kanava(float2 a, float2 b, float2 c, float2 d, float i) { return i < 0.5 ? a : i < 1.5 ? b : i < 2.5 ? c : d; }
        // Kuten CesiumDefaultTilesetShader: alfaleikkaus 0,5 perusvärin alfasta (LR:n korttipuut alphaMode MASK) ja kaksipuolinen piirto.
        TEXTURE2D(_baseColorTexture); SAMPLER(sampler_baseColorTexture);
        float2 PerusUv(float2 a, float2 b, float2 c, float2 d) { return Kanava(a, b, c, d, _baseColorTextureCoordinateIndex) * _baseColorTexture_ST.xy + _baseColorTexture_ST.zw; }
        void Alfa(float2 uv) { clip(SAMPLE_TEXTURE2D(_baseColorTexture, sampler_baseColorTexture, uv).a * _baseColorFactor.a - 0.5); }
        ENDHLSL
        Pass
        {
            Name "OmaMalli"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Ilmakeha.hlsl"
            TEXTURE2D(_emissiveTexture); SAMPLER(sampler_emissiveTexture);
            TEXTURE2D(_normalMapTexture); SAMPLER(sampler_normalMapTexture);
            TEXTURE2D(_metallicRoughnessTexture); SAMPLER(sampler_metallicRoughnessTexture);
            TEXTURE2D(_occlusionTexture); SAMPLER(sampler_occlusionTexture);
            struct A { float4 p : POSITION; float3 n : NORMAL; float4 c : COLOR; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; float3 w : TEXCOORD1; float3 n : TEXCOORD2; float4 c : TEXCOORD3; float2 uvE : TEXCOORD4; float sumu : TEXCOORD5;
                       float4 uvNM : TEXCOORD6; float2 uvO : TEXCOORD7; };
            // Kotangenttikehys derivaatoista (Schüler 2013): normaalikartan tangenttiavaruus ilman TANGENT-attribuuttia. glTF:n
            // normaalikartta on OpenGL-käytäntöä (+Y ylös); Cesium kääntää V:n ja kuvan yhdessä, joten vihreä kanava käy sellaisenaan.
            float3 Kartoitettu(float3 n, float3 w, float2 uv, float3 t)
            {
                float3 dp1 = ddx(w), dp2 = ddy(w); float2 du1 = ddx(uv), du2 = ddy(uv);
                float3 p2 = cross(dp2, n), p1 = cross(n, dp1);
                float3 T = p2 * du1.x + p1 * du2.x, B = p2 * du1.y + p1 * du2.y;
                float k = rsqrt(max(1e-12, max(dot(T, T), dot(B, B))));
                return normalize(T * (t.x * k) + B * (t.y * k) + n * t.z);
            }
            // Karis 2014 (mobiili): ympäristöheijastuksen BRDF-integraali ilman taulukkoa.
            float3 YmpBrdf(float3 f0, float karheus, float nv)
            {
                const float4 c0 = float4(-1.0, -0.0275, -0.572, 0.022), c1 = float4(1.0, 0.0425, 1.04, -0.04);
                float4 r = karheus * c0 + c1; float a = min(r.x * r.x, exp2(-9.28 * nv)) * r.x + r.y;
                float2 ab = float2(-1.04, 1.04) * a + r.zw; return f0 * ab.x + ab.y;
            }
            V vert(A a)
            {
                V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w); v.n = TransformObjectToWorldNormal(a.n);
                v.uv = PerusUv(a.uv0, a.uv1, a.uv2, a.uv3);
                v.uvE = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _emissiveTextureCoordinateIndex) * _emissiveTexture_ST.xy + _emissiveTexture_ST.zw;
                v.uvNM.xy = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _normalMapTextureCoordinateIndex) * _normalMapTexture_ST.xy + _normalMapTexture_ST.zw;
                v.uvNM.zw = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _metallicRoughnessTextureCoordinateIndex) * _metallicRoughnessTexture_ST.xy + _metallicRoughnessTexture_ST.zw;
                v.uvO = Kanava(a.uv0, a.uv1, a.uv2, a.uv3, _occlusionTextureCoordinateIndex) * _occlusionTexture_ST.xy + _occlusionTexture_ST.zw;
                v.c = a.c; v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v, bool etu : SV_IsFrontFace) : SV_Target
            {
                float4 pv = SAMPLE_TEXTURE2D(_baseColorTexture, sampler_baseColorTexture, v.uv);
                clip(pv.a * _baseColorFactor.a - 0.5);
                float3 albedo = pv.rgb * _baseColorFactor.rgb * v.c.rgb;
                float3 n0 = normalize(v.n) * (etu ? 1.0 : -1.0);   // kaksipuoliset lehtikortit
                float m = _IlmMaailma.x;
                float3 kohti = v.w - _WorldSpaceCameraPos; float etM = length(kohti) * m; float3 d = kohti / max(1e-4, length(kohti));
                // PBR-kartat (glTF): normaali (scale xy:hen), metalli ja karheus (B, G), peitto (R, voima strength).
                float3 tn = SAMPLE_TEXTURE2D(_normalMapTexture, sampler_normalMapTexture, v.uvNM.xy).rgb * 2.0 - 1.0;
                tn.xy *= _normalMapScale;
                float3 n = Kartoitettu(n0, v.w, v.uvNM.xy, normalize(tn));
                float4 mr = SAMPLE_TEXTURE2D(_metallicRoughnessTexture, sampler_metallicRoughnessTexture, v.uvNM.zw);
                float metalli = saturate(_metallicRoughnessFactor.x * mr.b), karheus = clamp(_metallicRoughnessFactor.y * mr.g, 0.045, 1.0);
                float peitto = lerp(1.0, SAMPLE_TEXTURE2D(_occlusionTexture, sampler_occlusionTexture, v.uvO).r, saturate(_occlusionStrength));
                // Aurinko: KAUPUNGIN aurinko (_OmaAurinko = _IlmAurinko laattojen leivotulla atsimuutilla, LS2 10.10.; x itä, y ylös, z pohjoinen; PT 9.10.: ND kauempaa harmaa) eikä URP:n
                // päävalo, joka on kartan aurinko ja seuraa kameraa (Kartta/Aurinko.cs, ei varjoja): muuten etelän seinät jäivät valotta
                // ja valo vaihtoi puolta kameran mukana. Päävalosta vain väri. Pehmeä kääre (Googlen leivottu valo on pehmeä), pilvien varjot.
                Light valo = GetMainLight(TransformWorldToShadowCoord(v.w));
                bool kaupunki = dot(_OmaAurinko.xyz, _OmaAurinko.xyz) > 0.5;
                valo.direction = kaupunki ? normalize(_OmaAurinko.xyz) : valo.direction;
                valo.color *= kaupunki ? saturate(_OmaAurinko.y * 6.0 + 0.1) : 1.0;   // aurinko horisontin alla → ei suoraa valoa
                float nl = saturate((dot(n, valo.direction) + 0.25) / 1.25);
                float pilvi = IlmPilvi(v.w * m) * _IlmPilviParam.y * saturate(_IlmAurinko.y * 4.0);
                float3 suora = valo.color * nl * valo.shadowAttenuation * (1.0 - pilvi);
                float3 ymparisto = SampleSH(n) * (1.0 + _OmaValo.w * (1.0 - nl)) * peitto;   // varjopuolen nosto (ei ruskeita varjosivuja)
                // Kiilto: dielektrinen F0 0,04, metallilla perusväri; diffuusi vähenee metallin osuudella.
                float3 f0 = lerp((float3)0.04, albedo, metalli), sv = -d;
                float nv = saturate(abs(dot(n, sv)) + 1e-4), nlA = saturate(dot(n, valo.direction));
                float3 h = normalize(valo.direction + sv); float nh = saturate(dot(n, h)), vh = saturate(dot(sv, h));
                float a2 = karheus * karheus; a2 *= a2;
                float dd = nh * nh * (a2 - 1.0) + 1.0, Dg = a2 / (PI * dd * dd + 1e-7);
                float k = karheus * karheus * 0.5, Vis = 0.25 / ((nlA * (1.0 - k) + k) * (nv * (1.0 - k) + k) + 1e-5);
                float3 Fs = f0 + (1.0 - f0) * pow(1.0 - vh, 5.0);
                float3 kiilto = Dg * Vis * Fs * nlA * valo.color * valo.shadowAttenuation * (1.0 - pilvi)
                              + SampleSH(reflect(d, n)) * YmpBrdf(f0, karheus, nv) * peitto;
                float3 c = (albedo * (1.0 - metalli) * (suora + ymparisto) + kiilto) * _OmaValo.x;
                // Ilta: lämmin julkisivuvalaistus alhaalta (pystypinnat, vahvin alaosassa), ikkunoiden ja lasimaalausten hehku.
                float yo = saturate(_IlmMaailma.z);
                float korkeus = max(0.0, v.w.y * m), pysty = 1.0 - abs(n.y);
                float3 julkisivu = float3(1.0, 0.80, 0.56) * (0.45 + 0.55 * exp(-korkeus / 35.0)) * pysty * _OmaValo.y * yo;
                c += albedo * (1.0 - 0.5 * metalli) * julkisivu;
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
            ZWrite On ColorMask 0 Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float3 _LightDirection;
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"
            struct A { float4 p : POSITION; float3 n : NORMAL; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a)
            {
                float3 w = TransformObjectToWorld(a.p.xyz), n = TransformObjectToWorldNormal(a.n);
                float4 p = TransformWorldToHClip(ApplyShadowBias(w, n, _LightDirection));
                #if UNITY_REVERSED_Z
                p.z = min(p.z, UNITY_NEAR_CLIP_VALUE);
                #else
                p.z = max(p.z, UNITY_NEAR_CLIP_VALUE);
                #endif
                V v; v.p = p; v.uv = PerusUv(a.uv0, a.uv1, a.uv2, a.uv3); return v;
            }
            half4 frag(V v) : SV_Target { Alfa(v.uv); return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On ColorMask R Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            struct A { float4 p : POSITION; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.uv = PerusUv(a.uv0, a.uv1, a.uv2, a.uv3); return v; }
            half frag(V v) : SV_Target { Alfa(v.uv); return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthNormals"
            Tags { "LightMode" = "DepthNormals" }
            ZWrite On Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            struct A { float4 p : POSITION; float3 n : NORMAL; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; float2 uv2 : TEXCOORD2; float2 uv3 : TEXCOORD3; };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; float2 uv : TEXCOORD1; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.n = TransformObjectToWorldNormal(a.n); v.uv = PerusUv(a.uv0, a.uv1, a.uv2, a.uv3); return v; }
            half4 frag(V v, bool etu : SV_IsFrontFace) : SV_Target { Alfa(v.uv); return half4(normalize(v.n) * (etu ? 1.0 : -1.0), 0.0); }
            ENDHLSL
        }
    }
}
