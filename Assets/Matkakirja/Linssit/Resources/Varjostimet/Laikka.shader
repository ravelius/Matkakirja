// Musteläikkä (elävä kartta, Isoisän muste 26.9.2026): noston merkki pudotuksessa. PAIKKAMERKKI Pelikoodarin
// kokoluokille ja himmeille jäljille (Natiiviseppä piirtää lopullisen). Neliö makaa pallon pinnalla (maailman koko),
// läikän reuna on kulman mukaan rikottu (siemen per nosto), muste pakkautuu reunaan tummemmaksi, osumasta leviää
// roiskerengas, ja pääkohde saa kevyen kultaisen hehkun (Raamattu: iso merkki + kevyt hehku).
// Kärki: keskipiste (POSITION), kulma −1…1 (TEXCOORD0), tangentit × säde (TEXCOORD1, TEXCOORD2) ja tila
// (mittakaava, peitto, roiske 0–1, luokka) (TEXCOORD3) sekä siemen (TEXCOORD4.x). Tila päivitetään CPU:lta (ElavaKohtaus.Nosto).
Shader "Matkakirja/Linssit/Laikka"
{
    Properties
    {
        _Muste("Muste", Color) = (0.17, 0.12, 0.08, 1)
        _Kulta("Hehku", Color) = (0.93, 0.74, 0.33, 1)
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+13" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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
                half4 _Muste;
                half4 _Kulta;
                half _Peitto;
            CBUFFER_END

            static const float Laajuus = 1.9;   // neliö ulottuu 1,9 säteeseen (roiskerengas)

            struct Syote { float4 paikka : POSITION; float2 kulma : TEXCOORD0; float3 tx : TEXCOORD1; float3 ty : TEXCOORD2; float4 tila : TEXCOORD3; float2 siemen : TEXCOORD4; };
            struct Vali { float4 paikka : SV_POSITION; float2 kulma : TEXCOORD0; float4 tila : TEXCOORD1; float siemen : TEXCOORD2; };

            float Hajautus2(float2 p) { return frac(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }

            float Kohina2(float2 x)
            {
                float2 i = floor(x), f = frac(x);
                f = f * f * (3 - 2 * f);
                return lerp(lerp(Hajautus2(i), Hajautus2(i + float2(1, 0)), f.x),
                            lerp(Hajautus2(i + float2(0, 1)), Hajautus2(i + float2(1, 1)), f.x), f.y);
            }

            Vali vert(Syote i)
            {
                Vali o;
                float m = max(i.tila.x, 0.0);
                float3 p = i.paikka.xyz + (i.tx * i.kulma.x + i.ty * i.kulma.y) * Laajuus * max(m, 1.0);
                o.paikka = TransformObjectToHClip(p);
                o.kulma = i.kulma * Laajuus * max(m, 1.0) / max(m, 1e-3);   // läikän säteen yksiköissä
                o.tila = i.tila;
                o.siemen = i.siemen.x;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float peitto = i.tila.y * _Peitto;
                if (peitto <= 0.001) discard;
                float2 c = i.kulma;
                float r = length(c);
                float2 ymp = r > 1e-5 ? c / r : float2(1, 0);
                float s = i.siemen * 17.13;
                float rr = 1 + 0.30 * (Kohina2(ymp * 1.6 + s) - 0.5) + 0.10 * (Kohina2(ymp * 5.0 + s * 1.7) - 0.5);
                float aa = max(fwidth(r), 1e-4);
                float runko = 1 - smoothstep(rr - aa, rr + aa, r);
                float reunus = smoothstep(rr - 0.38, rr - 0.03, r) * runko;
                // Pieniä roiskepisaroita reunan ulkopuolella (kolme, siemenen kulmissa).
                float pisarat = 0;
                for (int k = 0; k < 3; k++)
                {
                    float a = (s + k * 2.1) * 6.2832;
                    float2 q = float2(cos(a), sin(a)) * (1.25 + 0.2 * frac(s * (k + 1)));
                    float d = length(c - q);
                    pisarat = max(pisarat, 1 - smoothstep(0.07, 0.07 + aa, d));
                }
                float roiske = i.tila.z;
                float rengasR = 1.05 + 0.7 * roiske;
                float x = (r - rengasR) / 0.07;
                float rengas = exp(-x * x) * (1 - roiske) * 0.5;
                float muste = saturate(runko * (0.72 + 0.28 * reunus) + pisarat * 0.8 + rengas);
                half3 vari = _Muste.rgb * (1 - 0.3 * reunus);
                float hehku = i.tila.w < 0.5 ? exp(-r * r * 0.8) * 0.33 : 0;
                float a0 = muste * peitto, a1 = hehku * saturate(peitto * 1.6) * (1 - a0);
                float alfa = a0 + a1;
                half3 tulos = (vari * a0 + _Kulta.rgb * a1) / max(alfa, 1e-4);
                return half4(tulos, alfa);
            }
            ENDHLSL
        }
    }
}
