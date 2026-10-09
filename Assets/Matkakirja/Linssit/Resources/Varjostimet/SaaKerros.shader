// PALLON SÄÄKERROS (omistaja 8.10.2026, Päätoimittaja: kevyet tehosteet; juna 166): yksi koko ruudun nelikulmio overlay-kamerassa.
// Sade: kolme kerrosta vinoja juovia (tuuli _Tuuli), lumi: kolme kerrosta pehmeitä huojuvia pisteitä, salama: heikko valkoinen
// välähdys (_Salama; päävälähdys valotuksena KaupunkiKuvassa), utu (_Sumu; juna 166: video 165:ssä Googlen laatat eivät reagoineet
// Unityn sumuun → utu pystygradienttina, tihein ylhäällä eli kaukana). Proseduraalinen (ei tekstuuria), _Aika s, _Aspect = l/k.
Shader "Matkakirja/Linssit/SaaKerros"
{
    Properties
    {
        _Sade ("Sade", Float) = 0
        _Lumi ("Lumi", Float) = 0
        _Salama ("Salama", Float) = 0
        _Sumu ("Utu", Float) = 0
        _Tuuli ("Tuuli (vino)", Float) = 0.15
        _Aika ("Aika", Float) = 0
        _Aspect ("Kuvasuhde", Float) = 1.33
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "SaaKerros"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha, One OneMinusSrcAlpha   // alfa "over": KaupunkiKooste-RT esikerrottu (Linssiseppä 8.10.)
            ZWrite Off
            ZTest Always
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            float _Sade; float _Lumi; float _Salama; float _Sumu; float _Tuuli; float _Aika; float _Aspect;
            CBUFFER_END
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.uv = a.uv; return v; }

            float H(float2 p) { return frac(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }

            float Sade(float2 uv, float t)
            {
                float a = 0;
                [unroll] for (int i = 0; i < 3; i++)
                {
                    float n = 55.0 + i * 65.0, nopeus = 1.4 + i * 0.5, pituus = 0.45 - i * 0.1;
                    float2 q = uv; q.x += q.y * _Tuuli;
                    float2 p = float2(q.x * _Aspect * n, q.y * n * 0.22 + t * nopeus * n * 0.22);
                    float sar = floor(p.x); p.y += H(float2(sar, i)) * 7.0;
                    float2 c = floor(p), f = frac(p);
                    float x0 = 0.25 + 0.5 * H(c + i * 13.1);
                    float juova = saturate(1.0 - abs(f.x - x0) / 0.09);
                    float hanta = step(f.y, pituus) * (f.y / pituus);
                    a += juova * hanta * step(0.45, H(c + 7.7)) * (0.55 + 0.25 * i);
                }
                return a;
            }

            float Lumi(float2 uv, float t)
            {
                float a = 0;
                [unroll] for (int i = 0; i < 3; i++)
                {
                    float n = 9.0 + i * 8.0, nopeus = 0.05 + i * 0.03;
                    float2 p = float2(uv.x * _Aspect * n, uv.y * n + t * nopeus * n);
                    float rivi = floor(p.y);
                    p.x += sin(t * 0.8 + rivi * 1.7 + i) * 0.25;
                    float2 c = floor(p), f = frac(p);
                    float2 keski = 0.2 + 0.6 * float2(H(c + 3.3 + i), H(c + 9.1 + i));
                    float r = 0.05 + 0.04 * H(c + 1.9) - i * 0.01;
                    float d = length(f - keski);
                    a += saturate(1.0 - d / r) * step(0.4, H(c + 5.5 + i)) * (0.5 + 0.25 * i);
                }
                return a;
            }

            half4 frag(V v) : SV_Target
            {
                float t = _Aika;
                float s = _Sade > 0.001 ? Sade(v.uv, t) * _Sade * 0.62 : 0;
                float l = _Lumi > 0.001 ? Lumi(v.uv, t) * _Lumi * 0.95 : 0;
                float u = _Sumu * (0.22 + 0.55 * smoothstep(0.0, 1.0, v.uv.y));   // utu: alhaalla (lähellä) ohuempi, ylhäällä (kaukana) tiheä
                float a = saturate(s + l + u + _Salama * 0.22);
                half3 sadeVari = half3(0.80, 0.84, 0.90), utuVari = half3(0.78, 0.80, 0.84);
                half3 c = (sadeVari * s + half3(1, 1, 1) * (l + _Salama * 0.22) + utuVari * u) / max(s + l + u + _Salama * 0.22, 1e-3);
                return half4(c, min(a, 0.9));
            }
            ENDHLSL
        }
    }
}
