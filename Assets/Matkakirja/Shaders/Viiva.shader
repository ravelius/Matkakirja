// Reittiviiva: nauha, jonka paksuus on vakio ruutupisteinä (verkkopelin
// MATKAREITIN_PAKSUUS_PX). Kärkipisteessä on oma paikka, seuraavan pisteen paikka
// (TEXCOORD0.xyz), puoli ±1 (TEXCOORD1.x) ja kuljettu matka asteina (TEXCOORD1.y).
// Katko: jakso asteina (_Katko.x) ja täytetty osuus (_Katko.y); 0 = yhtenäinen.
Shader "Matkakirja/Viiva"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.29, 0.23, 0.14, 0.42)
        _Paksuus("Paksuus (ruutupistettä)", Float) = 2.5
        _Kerroin("Pikseliä pisteelle", Float) = 3
        _Katko("Katko (jakso°, osuus, liike°/s)", Vector) = (0.16, 0.5, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+0" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _Paksuus;
                float _Kerroin;
                float4 _Katko;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 seuraava : TEXCOORD0; float2 puoli : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; float matka : TEXCOORD0; float reuna : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float4 a = TransformObjectToHClip(i.paikka.xyz);
                float4 b = TransformObjectToHClip(i.seuraava);
                float2 ruutu = _ScreenParams.xy;
                float2 sa = a.xy / a.w * ruutu;
                float2 sb = b.xy / b.w * ruutu;
                float2 suunta = sb - sa;
                float l = length(suunta);
                suunta = l > 1e-4 ? suunta / l : float2(1, 0);
                float2 normaali = float2(-suunta.y, suunta.x);
                // Puolet paksuudesta kummallekin puolelle, pikseleinä → leikkausavaruus.
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                a.xy += normaali * i.puoli.x * px * 2.0 / ruutu * a.w;
                o.paikka = a;
                o.matka = i.puoli.y;
                o.reuna = i.puoli.x * px;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half alfa = _BaseColor.a;
                // Pehmeä reuna: viimeinen pikseli liukuu läpinäkyväksi.
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                alfa *= saturate(px - abs(i.reuna));
                if (_Katko.x > 0)
                {
                    float vaihe = frac((i.matka - _Katko.z * _Time.y) / _Katko.x);
                    alfa *= step(vaihe, _Katko.y);
                }
                return half4(_BaseColor.rgb, alfa);
            }
            ENDHLSL
        }
    }
}
