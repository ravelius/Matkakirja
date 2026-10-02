// AJATTELIJAN KIPSIPÄÄ KARTALLA (ERIKOISNOSTOT, Linssiseppä 2.10.2026; web #3866 js/ajattelijapaat.js luoPaanPiirtaja ja
// KIPSI_KARTALLA ovat malli). Webin three.js-kohtaus samoin luvuin: MeshStandardMaterial (kipsiväri × sävy [1,0, 1,03, 1,1],
// normaalikartta, metallisuus 0, karheus 0,62), HemisphereLight taivas #fff6ea / maa #8c7864 voima 1,0 (ylös = +y),
// DirectionalLight #fff1dc voima 2,65 ja NeutralToneMapping (Khronos PBR Neutral) + sRGB. Valo (_Valo, kohti valoa) maailman
// suunnassa; AjattelijaPaat.cs muuntaa webin kameran koordinaateista. Varjo paperille: AjattelijaVarjo.shader.
// Oma kerros ja kamera (UI/AjattelijaPaat.cs), piirto RenderTextureen vain kun asento tai valo muuttuu.
Shader "Matkakirja/Kartta/AjattelijaPaa"
{
    Properties
    {
        _MainTex("Kipsiväri (sRGB)", 2D) = "white" {}
        _NormalMap("Normaalikartta", 2D) = "bump" {}
        _NormaaliPaalla("Normaalikartta päällä", Float) = 1
        _Valo("Suunta kohti valoa (maailma)", Vector) = (-0.5, 0.8, -0.6, 0)
        _Karheus("Karheus", Float) = 0.62
        _Savy("Kipsin sävykerroin (lineaarinen)", Vector) = (1.0, 1.03, 1.1, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            TEXTURE2D(_NormalMap); SAMPLER(sampler_NormalMap);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float4 _Valo, _Savy;
                float _NormaaliPaalla, _Karheus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; float4 tangentti : TANGENT; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 n : TEXCOORD1; float4 t : TEXCOORD2; float3 maailma : TEXCOORD3; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.uv = i.uv;
                o.n = TransformObjectToWorldNormal(i.normaali);
                o.t = float4(TransformObjectToWorldDir(i.tangentti.xyz), i.tangentti.w * GetOddNegativeScale());
                return o;
            }

            // Khronos PBR Neutral (three.js NeutralToneMapping): lineaarinen → lineaarinen näyttöalue.
            float3 Neutral(float3 c)
            {
                const float alku = 0.8 - 0.04, desaturaatio = 0.15;
                float x = min(c.r, min(c.g, c.b));
                float siirto = x < 0.08 ? x - 6.25 * x * x : 0.04;
                c -= siirto;
                float huippu = max(c.r, max(c.g, c.b));
                if (huippu < alku) return c;
                float d = 1.0 - alku;
                float uusi = 1.0 - d * d / (huippu + d - alku);
                c *= uusi / huippu;
                float g = 1.0 - 1.0 / (desaturaatio * (huippu - uusi) + 1.0);
                return lerp(c, uusi.xxx, g);
            }

            half4 frag(Vali i, bool edessa : SV_IsFrontFace) : SV_Target
            {
                float3 n = normalize(i.n) * (edessa ? 1.0 : -1.0);
                if (_NormaaliPaalla > 0.5)
                {
                    float3 t = normalize(i.t.xyz), b = cross(n, t) * i.t.w;
                    // Ajonaikainen RGBA-kuva (ei DXT5nm-pakkausta): suoraan rgb · 2 − 1, glTF:n tangenttiavaruus (+Y ylös).
                    float3 nt = SAMPLE_TEXTURE2D(_NormalMap, sampler_NormalMap, i.uv).rgb * 2.0 - 1.0;
                    n = normalize(nt.x * t + nt.y * b + nt.z * n);
                }
                float3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv).rgb * _Savy.rgb;
                float3 l = normalize(_Valo.xyz);
                float3 v = normalize(GetCameraPositionWS() - i.maailma);
                float nl = saturate(dot(n, l));
                // Värit sRGB:stä lineaarisiksi kuten three.js ColorManagement: #fff1dc, #fff6ea, #8c7864.
                const float3 aurinko = float3(1.0, 0.8796, 0.7157) * 2.65;
                const float3 taivas = float3(1.0, 0.9216, 0.8228), maa = float3(0.2623, 0.1878, 0.1274);
                float3 puolipallo = lerp(maa, taivas, 0.5 * n.y + 0.5);
                float3 c = albedo * (aurinko * nl + puolipallo) / PI;
                // GGX-heijastus (F0 0,04, karheus 0,62) kuten MeshStandardMaterial.
                float3 h = normalize(l + v);
                float a = _Karheus * _Karheus, a2 = a * a;
                float nh = saturate(dot(n, h)), nv = saturate(dot(n, v)) + 1e-4;
                float dd = a2 / (PI * pow(nh * nh * (a2 - 1.0) + 1.0, 2.0));
                float k = a / 2.0;
                float g = (nl / (nl * (1.0 - k) + k)) * (nv / (nv * (1.0 - k) + k));
                float f = 0.04 + 0.96 * pow(1.0 - saturate(dot(v, h)), 5.0);
                c += aurinko * dd * g * f / max(4.0 * nl * nv, 1e-4) * nl;
                return half4((half3)Neutral(c), 1);
            }
            ENDHLSL
        }
    }
}
