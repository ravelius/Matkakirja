// KUUMAILMAPALLON KORI, PAIKKAMERKKI (Päätoimittaja 7.10. 09.1x; Linnanrakentajan malli korvaa): korin punos, nahkareunus ja
// köydet overlay-kameralle. Valaistus kiinteästä yläviistosta (kori on kameran lapsi), kuvio uv:sta: _Kuvio 0 = sileä (nahka),
// 1 = punos (vinot säikeet), 2 = köysi (kierre). Ei varjoja eikä läpinäkyvyyttä.
Shader "Matkakirja/Linssit/PalloKori"
{
    Properties { _Vari ("Väri", Color) = (0.55, 0.40, 0.24, 1) _Kuvio ("Kuvio", Float) = 1 _Toisto ("Toisto", Vector) = (40, 4, 0, 0) }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        Pass
        {
            Name "Kori"
            Tags { "LightMode" = "UniversalForward" }
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Vari; float _Kuvio; float4 _Toisto;
            CBUFFER_END
            struct A { float4 p : POSITION; float3 n : NORMAL; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; float2 uv : TEXCOORD1; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.n = TransformObjectToWorldNormal(a.n); v.uv = a.uv * _Toisto.xy; return v; }
            half4 frag(V v) : SV_Target
            {
                float3 n = normalize(v.n);
                half valo = 0.55h + 0.45h * saturate(dot(n, normalize(float3(-0.3, 0.8, -0.5))));
                half k = 1.0h;
                if (_Kuvio > 0.5 && _Kuvio < 1.5)
                {
                    // Punos: kaksi vinoa säiettä vuorotellen, säikeiden väliin tumma rako.
                    float2 u = v.uv;
                    float a = frac(u.x + u.y), b = frac(u.x - u.y);
                    float vuoro = step(0.5, frac(floor(u.x) * 0.5 + floor(u.y) * 0.5));
                    float s = lerp(a, b, vuoro);
                    k = 0.72h + 0.28h * (half)smoothstep(0.0, 0.25, s) * (half)smoothstep(1.0, 0.75, s);
                }
                else if (_Kuvio > 1.5)
                    k = 0.8h + 0.2h * (half)sin(6.2831 * (v.uv.x * 3.0 + v.uv.y));
                return half4(_Vari.rgb * valo * k, 1.0h);
            }
            ENDHLSL
        }
    }
}
