// AJATTELIJAN PEITE (Linssiseppä 2, 2.10.2026): webin CSS-kerrokset kuvan päällä yhtenä koko ruudun kolmiona:
// pystyvinjetti laajoissa otoksissa (52 %:sta alas: 0,05 / 0,3 / 0,58 / 0,65 ja säteittäinen 0,18) ja lähderivin
// liukuväri alareunassa (läpinäkyvä → --tk-himmennys-tumma). CSS sekoittaa sRGB:nä; Unity lineaarisena, joten musta
// peitto a muunnetaan 1 − (1 − a)^2,2 (sama tulos näytöllä).
Shader "Hidden/Matkakirja/AjattelijaPeite"
{
    SubShader
    {
        Tags { "RenderPipeline" = "UniversalPipeline" "Queue" = "Overlay" "RenderType" = "Transparent" }
        Pass
        {
            Tags { "LightMode" = "SRPDefaultUnlit" }
            Cull Off
            ZWrite Off
            ZTest Always
            Blend SrcAlpha OneMinusSrcAlpha
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            float4 _Peite;          // x vinjetti 0…1, y lähteen liukuväri 0…1, z liukuvärin korkeus (osuus kuvasta)
            float4 _HimmennysVari;  // --tk-himmennys-tumma (sRGB rgb, a)
            struct Tulo { float4 paikka : POSITION; };
            struct Ulos { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };
            Ulos vert(Tulo t)
            {
                Ulos o;
                o.paikka = float4(t.paikka.xy, UNITY_NEAR_CLIP_VALUE, 1.0);
                o.uv = t.paikka.xy * 0.5 + 0.5;
            #if UNITY_UV_STARTS_AT_TOP
                o.uv.y = 1.0 - o.uv.y;
            #endif
                return o;
            }
            // sRGB → lineaarinen (IEC 61966-2-1); oma kaava, koska Core.hlsl ei tuo Color.hlsl:n SRGBToLinearia (Metal-käännös 2.10.).
            float3 Lineaariseksi(float3 c) { return lerp(pow((c + 0.055) / 1.055, 2.4), c / 12.92, step(c, 0.04045)); }
            float Vali(float y, float a, float b, float pa, float pb) { return lerp(pa, pb, saturate((y - a) / (b - a))); }
            float4 frag(Ulos i) : SV_Target
            {
                float y = 1.0 - i.uv.y;   // 0 ylhäällä kuten CSS
                float pysty = y < 0.52 ? 0.0 : y < 0.62 ? Vali(y, 0.52, 0.62, 0.0, 0.05) : y < 0.78 ? Vali(y, 0.62, 0.78, 0.05, 0.3)
                    : y < 0.92 ? Vali(y, 0.78, 0.92, 0.3, 0.58) : Vali(y, 0.92, 1.0, 0.58, 0.65);
                float2 e = (i.uv - 0.5) * 2.0;
                float sade = saturate((length(e) / sqrt(2.0) - 0.55) / 0.45);
                float vin = 1.0 - (1.0 - pysty) * (1.0 - 0.18 * sade);
                float a1 = vin * _Peite.x;
                float l = saturate((y - (1.0 - _Peite.z)) / max(_Peite.z, 1e-4));
                float a2 = l * _HimmennysVari.a * _Peite.y;
                // Kaksi sRGB-kerrosta päällekkäin: musta vinjetti ja himmennysväri; tulos lineaariseksi peitoksi.
                float a = 1.0 - (1.0 - a1) * (1.0 - a2);
                float3 vari = a > 1e-4 ? _HimmennysVari.rgb * (a2 * (1.0 - a1)) / a : 0;
                return float4(Lineaariseksi(vari), 1.0 - pow(1.0 - a, 2.2));
            }
            ENDHLSL
        }
    }
}
