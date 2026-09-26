// Hunnun kuivuminen (elävä kartta, Isoisän muste 26.9.2026): PAIKKAMERKKI Natiivisepän Paljastus(keskus, säde, t)
// -rajapinnalle. Kohdemaa on kermahunnun alla (webin kerma #faf4d6, peitto 0,80 kuten Varitaso), ja huntu kuivuu pois
// saapumiskaupungista ulospäin kuin muste paperilla: reuna on kohinalla rikottu ja sen takana kulkee tummempi vesiraja.
// Verkko on maan maakuntien kolmiot (maa-alue, meri jää pohjan väriin). Kärjessä yksikkösuunta ECEF:ssä (TEXCOORD0),
// joten kulmaetäisyys lasketaan pikseleittäin tarkasti jänteestä (2·asin(|d − k| / 2)).
Shader "Matkakirja/Linssit/Huntu"
{
    Properties
    {
        _Vari("Kerma", Color) = (0.980, 0.957, 0.839, 1)
        _Tumma("Vesiraja", Color) = (0.80, 0.70, 0.50, 1)
        _Peitto("Peitto", Range(0, 1)) = 0.8
        _Keskus("Keskus (yksikkösuunta)", Vector) = (1, 0, 0, 0)
        _Sade("Säde (rad)", Float) = 0.004
        _Reuna("Reunan leveys (rad)", Float) = 0.006
        _Kohina("Reunan kohina (rad)", Float) = 0.004
        _Vesiraja("Vesirajan voima", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+11" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Tumma;
                half _Peitto;
                float4 _Keskus;
                float _Sade;
                float _Reuna;
                float _Kohina;
                half _Vesiraja;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 suunta : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float3 suunta : TEXCOORD0; };

            float Hajautus(float3 p)
            {
                p = frac(p * 0.3183099 + 0.1);
                p *= 17.0;
                return frac(p.x * p.y * p.z * (p.x + p.y + p.z));
            }

            float Kohina(float3 x)
            {
                float3 i = floor(x), f = frac(x);
                f = f * f * (3 - 2 * f);
                return lerp(lerp(lerp(Hajautus(i), Hajautus(i + float3(1, 0, 0)), f.x),
                                 lerp(Hajautus(i + float3(0, 1, 0)), Hajautus(i + float3(1, 1, 0)), f.x), f.y),
                            lerp(lerp(Hajautus(i + float3(0, 0, 1)), Hajautus(i + float3(1, 0, 1)), f.x),
                                 lerp(Hajautus(i + float3(0, 1, 1)), Hajautus(i + float3(1, 1, 1)), f.x), f.y), f.z);
            }

            float Fbm(float3 p)
            {
                return (0.5 * Kohina(p) + 0.25 * Kohina(p * 2.03 + 11.7) + 0.125 * Kohina(p * 4.01 + 3.1) + 0.0625 * Kohina(p * 8.13 + 7.9)) / 0.9375;
            }

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.suunta = i.suunta;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 d = normalize(i.suunta);
                float kulma = 2.0 * asin(saturate(length(d - _Keskus.xyz) * 0.5));
                // Kuivumisreuna: iso aalto (~100 km) ja pieni röpelö (~25 km), kuten muste imeytyy paperiin.
                float r = _Sade + _Kohina * ((Fbm(d * 70.0) - 0.5) * 2.0 + 0.35 * (Fbm(d * 260.0) - 0.5) * 2.0);
                float huntu = smoothstep(r - _Reuna * 0.5, r + _Reuna * 0.5, kulma);
                // Vesiraja: tummempi kaista juuri kuivuneen reunan takana.
                float x = (kulma - r) / max(_Reuna * 0.45, 1e-6);
                float raja = exp(-x * x) * _Vesiraja;
                half3 vari = lerp(_Vari.rgb, _Tumma.rgb, saturate(raja * 0.75));
                // Paperin rae.
                vari *= 0.965 + 0.07 * Fbm(d * 3200.0);
                half alfa = _Peitto * huntu + raja * 0.35 * (1 - huntu);
                return half4(vari, saturate(alfa));
            }
            ENDHLSL
        }
    }
}
