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
            half4 frag(V v) : SV_Target
            {
                float m = _IlmMaailma.x; float3 pm = v.w * m;
                float t = _Time.y;
                float2 g = Kalteva(pm.xz / _AaltoM + float2(t * 0.11, t * 0.07)) + 0.6 * Kalteva(pm.xz / (_AaltoM * 0.37) - float2(t * 0.19, -t * 0.13));
                float3 kohti = v.w - _WorldSpaceCameraPos; float et = length(kohti); float3 d = kohti / max(1e-4, et);
                // Aallot loivenevat etäisyyden mukana (ei välkettä kaukana).
                float f = _Aalto * (1.0 - saturate(et * m / 3000.0));
                float3 n = normalize(float3(-g.x * f, 1.0, -g.y * f));
                float3 r = reflect(d, n); r.y = abs(r.y);
                float cosv = saturate(dot(-d, n)), fresnel = 0.02 + 0.98 * pow(1.0 - cosv, 5.0);
                float3 taivas = IlmSavytys(IlmTaivas(r) * _IlmParam.y);
                float aurinko = pow(saturate(dot(r, _IlmAurinko.xyz)), 900.0) * _Kimallus * step(0.0, _IlmAurinko.y);
                float3 c = lerp(_Syva.rgb * saturate(_IlmAurinko.y * 3.0 + 0.15), taivas, fresnel) + aurinko * IlmLapaisy(_IlmParam.x, _IlmAurinko.y);
                float3 sironta, lapaisy; IlmIlmaperspektiivi(et * m, d, sironta, lapaisy);
                c = lerp(c, c * lapaisy + IlmSavytys(sironta * _IlmParam.y), _IlmParam.z);
                float alfa = smoothstep(0.0, 3.0, v.ranta) * 0.97;
                return half4((half3)IlmDither(MixFog((half3)c, v.sumu), v.p.xy), alfa);   // ei portaita B10G11R11-puskurissa
            }
            ENDHLSL
        }
    }
}
