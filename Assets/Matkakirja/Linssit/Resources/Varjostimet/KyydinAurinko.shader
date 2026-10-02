// Kyydin aurinko kuvaputkessa (Linssiseppä 1.10.2026, Linssiseppä 2:n juliste "aurinko horisontin reunalla"): kamerakeskeinen
// kiekko suunnassa _Suunta kuten KyydinKuu (syvyys kaukotasolle, joten maa peittää), kulmasäde 0,27°; HDR-ydin (Kyytipinon bloom
// tekee hehkun) ja kuuden säteen tähtikuvio kuten kameran aukon diffraktio. Ilmakeha2 piirtyy päälle (jono −38), joten reunalla
// aurinko himmenee ja punertuu ilmakehän läpi. Vain kuvaputkessa (Avaruus.Kuvaputki), _Kirkkaus 0 = pois.
Shader "Matkakirja/Linssit/KyydinAurinko"
{
    Properties
    {
        _Suunta("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Koko("tan(hehkun kulmasäde)", Float) = 0.0524
        _Kiekko("Kiekon säde hehkun säteestä", Float) = 0.09
        _Kirkkaus("Kirkkaus (HDR)", Float) = 24
        _Sateet("Säteiden ja hehkun kerroin (kuvaputken kiertoratanousu, 1 = ennallaan)", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-59" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One One
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float4 _Suunta;
                float _Koko, _Kiekko, _Kirkkaus, _Sateet;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 d = normalize(_Suunta.xyz);
                float3 apu = abs(d.y) < 0.99 ? float3(0, 1, 0) : float3(1, 0, 0);
                float3 oikea = normalize(cross(apu, d)), ylos = cross(d, oikea);
                float3 p = _WorldSpaceCameraPos + (d + (oikea * i.uv.x + ylos * i.uv.y) * _Koko) * 1.0e6;
                float4 c = TransformWorldToHClip(p);
                #if UNITY_REVERSED_Z
                    c.z = 1.0e-6 * c.w;
                #else
                    c.z = 0.999999 * c.w;
                #endif
                o.paikka = c;
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                float reuna = fwidth(r) * 1.5;
                float kiekko = 1.0 - smoothstep(_Kiekko - reuna, _Kiekko + reuna, r);
                float hehku = exp(-r * r / 0.004) * 0.35 + exp(-r * 9.0) * 0.06;
                float kulma = atan2(i.uv.y, i.uv.x);
                float sade = pow(abs(cos(kulma * 3.0)), 60.0) * exp(-r * 5.0) * 0.12 * (1.0 - smoothstep(0.7, 1.0, r));
                // Kiertoratanousu (_Sateet > 1, Päätoimittaja 1.10. 21.5x: "selvästi suurempi flare"): pidemmät säteet, lisäksi
                // ohuet välisäteet ja lämmin laaja hehku; _Koko kasvaa samalla (KyydinTaivas), kiekko pysyy 0,27°:ssa.
                float lisa = 0.0;
                if (_Sateet > 1.0)
                {
                    float k = _Sateet - 1.0;
                    // ei laajaa hehkua tässä (laite 4968e1fd: kuvion reuna näkyi terävänä puolikaarena); laaja hehku tulee kuvan
                    // jälkikäsittelystä (IssKameraKuva.Heijastukset), säteet häivytetään jo 0,5:stä alkaen
                    lisa = k * (pow(abs(cos(kulma * 3.0)), 40.0) * exp(-r * 3.0) * 0.10 + pow(abs(sin(kulma * 6.0 + 0.3)), 200.0) * exp(-r * 4.5) * 0.05);
                }
                float v = (kiekko + hehku + sade + lisa) * (1.0 - smoothstep(_Sateet > 1.0 ? 0.45 : 0.85, 1.0, r));
                half3 vari = lerp(half3(1.0, 0.96, 0.9), half3(1.0, 0.78, 0.55), (half)saturate((_Sateet - 1.0) * 0.5 * saturate(r * 4.0)));
                return half4(vari * (half)(v * _Kirkkaus), 0);
            }
            ENDHLSL
        }
    }
}
