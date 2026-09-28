// Kyydin Kuu (ISS-realismi 4b, KyydinTaivas): kamerakeskeinen kiekko suunnassa _Suunta, kulmasäde atan(_Koko) (0,26°),
// syvyys kaukotasolle (maa peittää). Kiekon piste → pallon normaali kameraan päin, joten vaihe tulee suoraan Lambertista
// auringon suunnasta (_Aurinko); maanvalo 0,03 ja hento reunan tummuminen. Pinta proseduraalinen: tummat "meret" kahdesta
// matalataajuisesta kohinasta (kiekko on ruudulla vain 10–20 px).
Shader "Matkakirja/Linssit/KyydinKuu"
{
    Properties
    {
        _Suunta("Kuun suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Koko("tan(kulmasäde)", Float) = 0.004538
        _Kirkkaus("Kirkkaus (HDR)", Float) = 1.25
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-60" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float4 _Suunta, _Aurinko;
                float _Koko, _Kirkkaus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 oikea : TEXCOORD1; float3 ylos : TEXCOORD2; float3 kohti : TEXCOORD3; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 d = normalize(_Suunta.xyz);
                float3 apu = abs(d.y) < 0.99 ? float3(0, 1, 0) : float3(1, 0, 0);
                float3 oikea = normalize(cross(apu, d)), ylos = cross(d, oikea);
                // Pieni ylimitoitus (1,25) reunan pehmennykselle; kiekko on uv-säteellä 0,8.
                float3 p = _WorldSpaceCameraPos + (d + (oikea * i.uv.x + ylos * i.uv.y) * _Koko * 1.25) * 1.0e6;
                float4 c = TransformWorldToHClip(p);
                #if UNITY_REVERSED_Z
                    c.z = 1.0e-6 * c.w;
                #else
                    c.z = 0.999999 * c.w;
                #endif
                o.paikka = c;
                o.uv = i.uv * 1.25;
                o.oikea = oikea; o.ylos = ylos; o.kohti = -d;
                return o;
            }

            float Hash(float2 p) { p = frac(p * float2(123.34, 456.21)); p += dot(p, p + 45.32); return frac(p.x * p.y); }
            float Kohina(float2 p)
            {
                float2 i = floor(p), f = frac(p);
                f = f * f * (3 - 2 * f);
                return lerp(lerp(Hash(i), Hash(i + float2(1, 0)), f.x), lerp(Hash(i + float2(0, 1)), Hash(i + 1), f.x), f.y);
            }

            half4 frag(Vali i) : SV_Target
            {
                float r2 = dot(i.uv, i.uv);
                float reuna = fwidth(r2) * 1.5;
                half kiekko = (half)(1.0 - smoothstep(1.0 - reuna, 1.0 + reuna, r2));
                float z = sqrt(saturate(1.0 - r2));
                float3 n = normalize(i.oikea * i.uv.x + i.ylos * i.uv.y + i.kohti * z);
                half valo = (half)saturate(dot(n, normalize(_Aurinko.xyz)));
                half meri = (half)smoothstep(0.45, 0.75, Kohina(i.uv * 2.3 + 4.1) * 0.65 + Kohina(i.uv * 5.1 + 1.7) * 0.35);
                half albedo = lerp(0.95h, 0.62h, meri * 0.8h) * (half)(0.85 + 0.15 * z);
                half3 vari = half3(0.97, 0.95, 0.9) * albedo * (valo * (half)_Kirkkaus + 0.03h);
                return half4(vari * kiekko, kiekko);
            }
            ENDHLSL
        }
    }
}
