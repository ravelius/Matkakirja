// KAUPUNGIN OMA VESIPINTA (Linssiseppä 2, 8.10.2026; omistaja 20.2x valitsi B: oma vesipinta Googlen laattojen päälle): Karttasepän
// vesiverkko (KaupunkiVesi), taivaan heijastus samasta sironta-LUTista kuin kupoli (Ilmakeha.hlsl), Fresnel (Schlick, n = 1,33),
// aallot kahdesta liikkuvasta proseduraalisesta normaalikentästä (ei tekstuuria), auringon kimallus läpäisyllä, syvän veden sävy,
// ilmaperspektiivi kuten laatoilla ja rannan alfa smoothstep(0, 3, d) (uv0.x = rantaetäisyys m). Läpinäkyvä, ei syvyyskirjoitusta.
Shader "Matkakirja/Linssit/VesiPinta"
{
    Properties
    {
        _Syva ("Syvän veden sävy", Color) = (0.015, 0.045, 0.06, 1)
        _Aalto ("Aaltojen voimakkuus", Float) = 0.12
        _AaltoM ("Aallonpituus m", Float) = 6
        _Kimallus ("Kimallus", Float) = 30
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-10" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "VesiPinta"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Back
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Ilmakeha.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Syva; float _Aalto, _AaltoM, _Kimallus;
            CBUFFER_END
            // Vanat (Ydin VesiVanat, KaupunkiVesi.Vana): maailman x, z, suunta; B = nopeus m/s, veneen pituus m.
            float4 _VesiVana[16], _VesiVanaB[16]; float _VesiVanaMaara;
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float3 w : TEXCOORD0; float ranta : TEXCOORD1; float sumu : TEXCOORD2; };
            V vert(A a)
            {
                V v; v.w = TransformObjectToWorld(a.p.xyz); v.p = TransformWorldToHClip(v.w);
                v.ranta = a.uv.x; v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            // Gradienttikohinan derivaatta (arvokohina, sileä) normaalikenttään.
            float2 Hash(float2 p) { p = float2(dot(p, float2(127.1, 311.7)), dot(p, float2(269.5, 183.3))); return frac(sin(p) * 43758.5453) * 2.0 - 1.0; }
            float2 Kalteva(float2 x)
            {
                float2 i = floor(x), f = frac(x), u = f * f * (3.0 - 2.0 * f), du = 6.0 * f * (1.0 - f);
                float a = dot(Hash(i), f), b = dot(Hash(i + float2(1, 0)), f - float2(1, 0));
                float c = dot(Hash(i + float2(0, 1)), f - float2(0, 1)), d = dot(Hash(i + float2(1, 1)), f - float2(1, 1));
                return Hash(i) * (1 - u.x) * (1 - u.y) + float2(du.x * (b - a + (a - b - c + d) * u.y), du.y * (c - a + (a - b - c + d) * u.x));
            }
            // Vaahto ja normaalin häiriö vanoista (sama kaava kuin VesiVanat.Vaahto; metreinä, m = metriä maailmayksikköä kohden).
            float Vanat(float3 w, float m, inout float2 g)
            {
                float vaahto = 0;
                [loop] for (int i = 0; i < 16; i++)
                {
                    if (i >= (int)_VesiVanaMaara) break;
                    float4 a = _VesiVana[i], b = _VesiVanaB[i];
                    float2 d = (w.xz - a.xy) * m, s = a.zw;
                    float taakse = -dot(d, s), sivuS = d.x * s.y - d.y * s.x, sivu = abs(sivuS);
                    float pit = max(1.0, b.y), L = pit * 6.0, n = saturate(b.x / 6.0), lev = max(2.0, pit * 0.18);
                    if (taakse < -pit * 0.6 || taakse > L || n <= 0.0) continue;
                    float t = max(0.0, taakse) / L, haivy = (1.0 - t) * (1.0 - t) * n;
                    float keski = taakse > 0.0 ? exp(-sivu * sivu / (lev * lev * (1.0 + taakse * 0.02))) : 0.0;
                    float varsi = 0.354 * max(0.0, taakse) + lev * 0.5, kl = 2.5 + taakse * 0.05, ka = (sivu - varsi) / kl, kaari = exp(-ka * ka);
                    float ke = (taakse + pit * 0.5) / (pit * 0.15), keula = exp(-ke * ke) * exp(-sivu * sivu / (lev * lev));
                    vaahto += (keski * 0.6 + kaari * 0.15) * haivy + keula * 0.4 * n;
                    // Kiilan aaltoharjat kallistavat normaalia ulospäin kulkulinjasta (liikkuvat veneen mukana).
                    float2 ulos = float2(s.y, -s.x) * sign(sivuS);
                    g += ulos * (-2.0 * ka / kl) * kaari * haivy * 0.6 + s * sin(taakse * 0.9 - _Time.y * 3.0) * keski * haivy * 0.3;
                }
                return vaahto;
            }

            half4 frag(V v) : SV_Target
            {
                float m = _IlmMaailma.x; float3 pm = v.w * m;
                float t = _Time.y;
                float2 g = Kalteva(pm.xz / _AaltoM + float2(t * 0.11, t * 0.07)) + 0.6 * Kalteva(pm.xz / (_AaltoM * 0.37) - float2(t * 0.19, -t * 0.13));
                float vaahto = Vanat(v.w, m, g);
                float3 kohti = v.w - _WorldSpaceCameraPos; float et = length(kohti); float3 d = kohti / max(1e-4, et);
                // Aallot loivenevat etäisyyden mukana (ei välkettä kaukana).
                float f = _Aalto * (1.0 - saturate(et * m / 3000.0));
                float3 n = normalize(float3(-g.x * f, 1.0, -g.y * f));
                float3 r = reflect(d, n); r.y = abs(r.y);
                float cosv = saturate(dot(-d, n)), fresnel = 0.02 + 0.98 * pow(1.0 - cosv, 5.0);
                float3 taivas = IlmSavytys(IlmTaivas(r) * _IlmParam.y);
                float aurinko = pow(saturate(dot(r, _IlmAurinko.xyz)), 900.0) * _Kimallus * step(0.0, _IlmAurinko.y);
                // Välke (omistaja 9.10.): satunnaiset kimallukset laajemmassa heijastuskeilassa, vaihtuvat 8 kertaa sekunnissa.
                // Solut 3 m (ei raitoja kaukaa), vain lähellä (alle 900 m) ja hillitysti.
                float2 kk = floor(pm.xz / 3.0) + floor(t * 6.0); float kipina = step(0.992, frac(sin(dot(kk, float2(12.9898, 78.233))) * 43758.5453));
                aurinko += pow(saturate(dot(r, _IlmAurinko.xyz)), 120.0) * kipina * 1.5 * (1.0 - saturate(et * m / 900.0)) * step(0.0, _IlmAurinko.y);
                float3 c = lerp(_Syva.rgb * saturate(_IlmAurinko.y * 3.0 + 0.15), taivas, fresnel) + aurinko * IlmLapaisy(_IlmParam.x, _IlmAurinko.y);
                // Vaahto: valkoinen auringon ja taivaan valossa (näyttöavaruudessa kuten _Syva), vain lähellä (ei välkettä kaukana).
                float vaahtoV = saturate(vaahto) * 0.75 * (1.0 - saturate(et * m / 2500.0));
                c = lerp(c, float3(0.86, 0.9, 0.92) * saturate(_IlmAurinko.y * 2.0 + 0.25), vaahtoV);
                float3 sironta, lapaisy; IlmIlmaperspektiivi(et * m, d, sironta, lapaisy);
                c = lerp(c, c * lapaisy + IlmSavytys(sironta * _IlmParam.y), _IlmParam.z);
                float alfa = smoothstep(0.0, 3.0, v.ranta) * 0.97;
                return half4((half3)IlmDither(MixFog((half3)c, v.sumu), v.p.xy), alfa);   // ei portaita B10G11R11-puskurissa
            }
            ENDHLSL
        }
        Pass
        {
            // AAMUSUMU (Ydin AamuSumu, _IlmSaa.z): sama vesiverkko 3 m ylempänä, hidas kohina, rannalla ja lähellä kameraa häivytetty.
            Name "VesiSumu"
            Tags { "LightMode" = "SRPDefaultUnlit" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Ilmakeha.hlsl"
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float3 w : TEXCOORD0; float ranta : TEXCOORD1; float sumu : TEXCOORD2; };
            V vert(A a)
            {
                V v; v.w = TransformObjectToWorld(a.p.xyz) + float3(0, 3.0 / max(1e-6, _IlmMaailma.x), 0);
                v.p = TransformWorldToHClip(v.w); v.ranta = a.uv.x; v.sumu = ComputeFogFactor(v.p.z);
                if (_IlmSaa.z <= 0.001) v.p = float4(0, 0, -1, 1);   // ei sumua: kolmiot pois (ei pikselityötä)
                return v;
            }
            half4 frag(V v) : SV_Target
            {
                float m = _IlmMaailma.x; float2 pm = v.w.xz * m * 0.01 + _IlmTuuli.xy * 0.003;
                float2 i = floor(pm), f = frac(pm); f = f * f * (3.0 - 2.0 * f);
                float a00 = frac(sin(dot(i, float2(127.1, 311.7))) * 43758.5453), a10 = frac(sin(dot(i + float2(1, 0), float2(127.1, 311.7))) * 43758.5453);
                float a01 = frac(sin(dot(i + float2(0, 1), float2(127.1, 311.7))) * 43758.5453), a11 = frac(sin(dot(i + float2(1, 1), float2(127.1, 311.7))) * 43758.5453);
                float n = lerp(lerp(a00, a10, f.x), lerp(a01, a11, f.x), f.y);
                float et = length(v.w - _WorldSpaceCameraPos) * m;
                float alfa = _IlmSaa.z * 0.45 * (0.5 + 0.5 * n) * smoothstep(0.0, 25.0, v.ranta) * smoothstep(60.0, 300.0, et);
                // Sumun väri: auringon läpäisy (lämmin aamuvalo) + taivas, sävytettynä kuten taivas.
                float3 c = IlmSavytys((IlmLapaisy(_IlmParam.x, _IlmAurinko.y) * 0.25 + IlmTaivas(float3(0, 1, 0))) * _IlmParam.y);
                return half4(MixFog((half3)c, v.sumu), alfa);
            }
            ENDHLSL
        }
    }
}
