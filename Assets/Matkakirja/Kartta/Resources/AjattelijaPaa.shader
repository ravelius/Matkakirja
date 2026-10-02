// AJATTELIJAN PÄÄ KARTUUTSIN LIPUN ALLA (ERIKOISNOSTOT, Linssiseppä 2.10.2026; web #3843 js/ajattelijapaat.js luoPaanPiirtaja on malli).
// Webin three.js-kohtaus samoin luvuin: MeshStandardMaterial (kipsiväri + normaalikartta, metallisuus 0, karheus 0,62),
// DirectionalLight 2,6 (0xfff4e6), AgX-sävytys ja sRGB; 2.10. 16.4x kipsi lämpimäksi (_Kipsi) ja ympäristö ruskeanharmaaksi (_Ymparisto). Valo annetaan maailman suunnassa
// (_Valo, kohti valoa); AjattelijaPaat.cs muuntaa kartan auringon suunnan pään kameran kehykseen kuten web (kameran koordinaatit).
// Oma kerros ja kamera (Kartta/AjattelijaPaat.cs), piirto RenderTextureen vain kun asento tai valo muuttuu.
Shader "Matkakirja/Kartta/AjattelijaPaa"
{
    Properties
    {
        _MainTex("Kipsiväri (sRGB)", 2D) = "white" {}
        _NormalMap("Normaalikartta", 2D) = "bump" {}
        _NormaaliPaalla("Normaalikartta päällä", Float) = 1
        _Valo("Suunta kohti valoa (maailma)", Vector) = (-0.5, 0.8, -0.6, 0)
        _Karheus("Karheus", Float) = 0.62
        _Kipsi("Kipsin lämpö ja valotus (kerroin)", Vector) = (1.9, 1.8, 1.6, 0)
        _Ymparisto("Ympäristövalo (lämmin ruskeanharmaa)", Vector) = (0.42, 0.34, 0.26, 0)
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
                float4 _Valo, _Kipsi, _Ymparisto;
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

            // AgX (Troy Sobotka; minimaalinen sovitus kuten three.js AgXToneMapping): lineaarinen → näyttö → lineaarinen.
            float3 AgxKontrasti(float3 x)
            {
                float3 x2 = x * x, x4 = x2 * x2;
                return 15.5 * x4 * x2 - 40.14 * x4 * x + 31.96 * x4 - 6.868 * x2 * x + 0.4298 * x2 + 0.1191 * x - 0.00232;
            }
            float3 Agx(float3 c)
            {
                // GLSL mat3(...)·v sarakkein = HLSL mul(v, rivit).
                const float3x3 sisaan = float3x3(0.842479062253094, 0.0423282422610123, 0.0423756549057051,
                                                 0.0784335999999992, 0.878468636469772, 0.0784336,
                                                 0.0792237451477643, 0.0791661274605434, 0.879142973793104);
                const float3x3 ulos = float3x3(1.19687900512017, -0.0528968517574562, -0.0529716355144438,
                                               -0.0980208811401368, 1.15190312990417, -0.0980434501171241,
                                               -0.0990297440797205, -0.0989611768448433, 1.15107367264116);
                const float minEv = -12.47393, maxEv = 4.026069;
                c = mul(max(c, 1e-10), sisaan);
                c = saturate((clamp(log2(c), minEv, maxEv) - minEv) / (maxEv - minEv));
                c = AgxKontrasti(c);
                c = mul(c, ulos);
                return pow(max(c, 0.0), 2.2);   // takaisin lineaariseksi (RenderTexture koodaa sRGB:ksi)
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
                // OMISTAJA 2.10. 16.4x: "pää on liian tumma ja sininen" → kipsi lämpimäksi ja vaaleaksi (valaistu puoli ≈ 210/202/185),
                // varjopuolet lämpimän ruskeanharmaat (ei valkoista/sinistä ympäristövaloa).
                float3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv).rgb * _Kipsi.rgb;
                float3 l = normalize(_Valo.xyz);
                float3 v = normalize(GetCameraPositionWS() - i.maailma);
                float nl = saturate(dot(n, l));
                // three.js: suora = valo · n·l · albedo / π, ympäristö = 0,35 · albedo / π.
                float3 valoVari = float3(1.0, 0.957, 0.902) * 2.6;
                float3 c = albedo * (valoVari * nl + _Ymparisto.rgb) / PI;
                // GGX-heijastus (F0 0,04, karheus 0,62) kuten MeshStandardMaterial.
                float3 h = normalize(l + v);
                float a = _Karheus * _Karheus, a2 = a * a;
                float nh = saturate(dot(n, h)), nv = saturate(dot(n, v)) + 1e-4;
                float d = a2 / (PI * pow(nh * nh * (a2 - 1.0) + 1.0, 2.0));
                float k = a / 2.0;
                float g = (nl / (nl * (1.0 - k) + k)) * (nv / (nv * (1.0 - k) + k));
                float f = 0.04 + 0.96 * pow(1.0 - saturate(dot(v, h)), 5.0);
                c += valoVari * d * g * f / max(4.0 * nl * nv, 1e-4) * nl;
                return half4((half3)Agx(c), 1);
            }
            ENDHLSL
        }
    }
}
