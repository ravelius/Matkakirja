// PALLON POLTTIMEN LIEKKI (Linssiseppä 8.10.2026; pallo Unreal-tasolle kohdat 2 ja 7): korin kameran kuvan yläreunassa polttimen
// liekin juuri ja hehku (liekki nousee ylös kuvan ulkopuolelle). Proseduraalinen: kartiomainen kieli, ylöspäin vierivä kohina,
// ydin kelta-valkoinen → oranssi → punainen reuna, ja laaja pehmeä hehku (bloomin korvike: korin kameralla ei ole jälkikäsittelyä).
// Esikerrottu alfa (korin tekstuurin kooste PalloKoriKooste: One OneMinusSrcAlpha); _Voima = Poltin.Liekki (0 = piilossa).
Shader "Matkakirja/Linssit/PalloLiekki"
{
    Properties { _Voima ("Voima", Float) = 0 _Hehku ("Hehku", Float) = 0.35 }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "Liekki"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            float _Voima, _Hehku;
            CBUFFER_END
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.uv = a.uv; return v; }
            float Hash(float2 p) { return frac(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }
            float Kohina(float2 p)
            {
                float2 i = floor(p), f = frac(p); f = f * f * (3.0 - 2.0 * f);
                return lerp(lerp(Hash(i), Hash(i + float2(1, 0)), f.x), lerp(Hash(i + float2(0, 1)), Hash(i + 1), f.x), f.y);
            }
            half4 frag(V v) : SV_Target
            {
                if (_Voima <= 0.001) return 0;
                float t = _Time.y;
                float2 uv = v.uv;   // x 0–1 vasemmalta, y 0 = alareuna (lähellä korin reunaa) … 1 = kuvan yläpuolella
                float k = Kohina(float2(uv.x * 6.0, uv.y * 4.0 - t * 3.2)) * 0.6 + Kohina(float2(uv.x * 13.0, uv.y * 9.0 - t * 6.0)) * 0.4;
                float leveys = 0.10 + 0.22 * uv.y;   // kieli levenee ylöspäin
                float dx = (uv.x - 0.5 + (k - 0.5) * 0.08) / leveys;
                float kieli = saturate(1.0 - dx * dx) * smoothstep(0.0, 0.35, uv.y + (k - 0.5) * 0.25);
                kieli *= 0.55 + 0.45 * k;
                float ydin = pow(saturate(kieli), 3.0);
                half3 vari = lerp(half3(0.9, 0.25, 0.05), half3(1.0, 0.62, 0.18), saturate(kieli * 1.4));
                vari = lerp(vari, half3(1.0, 0.95, 0.8), ydin);
                // Hehku: laaja pehmeä kumpu liekin ympärillä (myös taivaan päälle).
                float2 d = float2((uv.x - 0.5) * 1.6, uv.y - 0.75);
                float hehku = exp(-dot(d, d) * 5.0) * _Hehku;
                half voima = (half)_Voima;
                half3 rgb = (vari * kieli * 1.6h + half3(1.0, 0.55, 0.2) * hehku) * voima;
                half alfa = (half)saturate(kieli * 0.8 + hehku * 0.15) * voima;
                return half4(rgb, alfa);
            }
            ENDHLSL
        }
    }
}
