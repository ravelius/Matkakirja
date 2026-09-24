// Keksintölinssin tummennus (web js/pallolauta/linssit.js kalvoRuudulle, js/aikajana.js
// PALLON_TUMMENNUS): koko ruudun kalvo pallon päällä ja valojen alla (Valo.shader on
// Transparent+50), reikä nykyisen lampun kohdalla ruutupikseleinä.
//
// Peittävyys muunnetaan lineaarisessa väriavaruudessa webin sRGB-sekoitusta vastaavaksi.
//
// Kärjet ovat valmiiksi leikkeen koordinaateissa (-1…1), joten kalvo peittää ruudun
// kameran asennosta riippumatta. Reiän liukuväri kuten webin radial-gradient:
// läpinäkyvä _Reika.z × 0,12 asti, _Keski 0,5:ssä ja _Vari reunalla (1,0).
Shader "Matkakirja/Linssit/Tummennus"
{
    Properties
    {
        _Vari("Tummennus", Color) = (0.039, 0.027, 0.020, 0.86)
        _Keski("Reiän puoliväli", Color) = (0.039, 0.027, 0.020, 0.35)
        _Reika("Reikä (x, y px, säde px, käytössä 0/1)", Vector) = (0, 0, 0, 0)
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+40" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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
                half4 _Keski;
                float4 _Reika;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = float4(i.paikka.xy, UNITY_NEAR_CLIP_VALUE, 1);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 c = _Vari;
                if (_Reika.w > 0.5)
                {
                    // Ruudun pikseli alavasemmalta (sama kuin Camera.WorldToScreenPoint).
                    float2 px = GetNormalizedScreenSpaceUV(i.paikka) * _ScaledScreenParams.xy;
                    float d = distance(px, _Reika.xy) / max(_Reika.z, 1);
                    half4 lapi = half4(_Keski.rgb, 0);
                    if (d < 0.12) c = lapi;
                    else if (d < 0.5) c = lerp(lapi, _Keski, (d - 0.12) / 0.38);
                    else if (d < 1) c = lerp(_Keski, _Vari, (d - 0.5) / 0.5);
                }
                c.a *= _Peitto;
            #if !defined(UNITY_COLORSPACE_GAMMA)
                // Web sekoittaa kalvon sRGB-arvoihin (css-kalvo kanvaasin päällä), projekti on
                // lineaarinen: sama 0,86 jätti iPadilla kartan kaksi kertaa webiä vaaleammaksi
                // (kontakti 24.9.: meri 95 vs web 49, ennuste lineaarisekoitukselle 91). Lähes
                // mustalla kalvolla lin((1-a)·S) = (1-a)^2,2 · lin(S), joten peittävyys muunnetaan.
                c.a = 1 - pow(max(1 - c.a, 0), 2.2);
            #endif
                return c;
            }
            ENDHLSL
        }
    }
}
