// ELÄVÄ SAVU (Linssiseppä 9.10.2026; Päätoimittaja juna 171, B8): savupatsas piipun suulta yhtenä verkkona (Ydin SavuJaLiput.
// SavuHiukkasia nelikulmiota; kärjen POSITION.xy = kulma −1…1, TEXCOORD0.x = hiukkasen vaihe, .y = satunnaisluku). Hiukkasen paikka,
// koko ja peittävyys lasketaan kärjessä ajasta samalla kaavalla kuin Ydin SavuJaLiput.SavuHiukkanen (nousu hidastuu, tuuli taivuttaa
// ja levittää), ja nelikulmio käännetään kameraa kohti. Pehmeä proseduraalinen kiekko, ei kuvia. Piippukohtaiset arvot
// MaterialPropertyBlockista (_Savu: voima, mittakaava, harmaus, vaihe), tuuli globaalista _ElavaTuuli (suunta paketin ENU:ssa, m/s).
// Valo samoista globaaleista kuin ElavaKohde: yöllä savu tummuu ja himmenee. Läpikuultava: ei syvyyskirjoitusta, molemmat puolet.
Shader "Matkakirja/Linssit/ElavaSavu"
{
    Properties { _Savu ("Voima, mittakaava, harmaus, vaihe", Vector) = (1, 1, 0.5, 0) }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" "IgnoreProjector" = "True" }
        Pass
        {
            Name "ElavaSavu"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            float4 _ElavaAurinko, _ElavaAurinkoVari, _ElavaTaivasYla, _ElavaTaivasAla, _ElavaTuuli;
            CBUFFER_START(UnityPerMaterial)
            float4 _Savu;
            CBUFFER_END
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float2 k : TEXCOORD0; half4 c : TEXCOORD1; float sumu : TEXCOORD2; };
            V vert(A a)
            {
                V v;
                const float elinaika = 16.0;
                float r = a.uv.y, voima = _Savu.x, mitta = _Savu.y;
                float ika01 = frac(_Time.y / elinaika * (0.9 + 0.2 * r) + a.uv.x + _Savu.w);
                float ika = ika01 * elinaika, ms = clamp(_ElavaTuuli.z, 0.3, 14.0);
                float2 t = _ElavaTuuli.xy;
                float nousu = (22.0 * (1.0 - exp(-ika / 5.0)) / (1.0 + 0.12 * ms) + 0.4 * ika) * mitta;
                float ajo = ms * 0.8 * ika * (0.35 + 0.65 * ika01);
                float sivu = ((r - 0.5) * (2.0 + ika * 0.6) + sin(ika * 0.7 + r * 6.2832) * 0.8) * mitta;
                float sade = (1.8 + 10.0 * ika01) * (0.6 + 0.4 * voima) * mitta;
                float alku = smoothstep(0.0, 0.1, ika01);
                float alfa = alku * pow(1.0 - ika01, 1.5) * voima * 0.5;
                float3 keski = float3(t.x * ajo - t.y * sivu, nousu, t.y * ajo + t.x * sivu);
                float3 w = TransformObjectToWorld(keski);
                float skaala = length(float3(UNITY_MATRIX_M._m00, UNITY_MATRIX_M._m10, UNITY_MATRIX_M._m20));
                float3 oikea = UNITY_MATRIX_V[0].xyz, ylos = UNITY_MATRIX_V[1].xyz;
                w += (oikea * a.p.x + ylos * a.p.y) * sade * skaala;
                v.p = TransformWorldToHClip(w); v.k = a.p.xy;
                // Valo: taivaan keskiarvo + aurinko; höyry (harmaus 0) vaalea, savu (1) harmaa. Yöllä (valo vähissä) myös himmeämpi.
                half3 amb = (half3)(_ElavaTaivasYla.rgb + _ElavaTaivasAla.rgb) * 0.5h;
                half3 valo = amb + (half3)_ElavaAurinkoVari.rgb * 0.6h;
                half paiva = (half)saturate(dot((float3)valo, float3(0.333, 0.333, 0.333)) * 1.5);
                half3 pohja = lerp(half3(0.93h, 0.93h, 0.92h), half3(0.52h, 0.51h, 0.50h), (half)_Savu.z);
                v.c = half4(pohja * valo, (half)alfa * lerp(0.45h, 1.0h, paiva));
                v.sumu = ComputeFogFactor(v.p.z);
                return v;
            }
            half4 frag(V v) : SV_Target
            {
                half r2 = (half)dot(v.k, v.k);
                half pehmea = pow(saturate(1.0h - r2), 1.5h);
                return half4(MixFog(v.c.rgb, v.sumu), v.c.a * pehmea);
            }
            ENDHLSL
        }
    }
}
