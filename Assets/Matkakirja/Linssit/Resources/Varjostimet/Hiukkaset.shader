// Ihmisen matka II:n hiukkaset (erä 5, vapaat kädet): LUMI kylmissä jaksoissa ja PÖLY soihdun valossa luolissa.
// Piirretään proseduraalisesti (Linssit/Unity/IhmisenMatka2Hiukkaset.cs, Graphics.RenderPrimitives): 6 kärkeä per
// hiukkanen, paikka lasketaan kärkivarjostimessa hiukkasen numerosta ja ajasta (tilaton: ei CPU-päivitystä, ei
// puskureita). Kärjet ovat valmiiksi leikkeen koordinaateissa kuten Tummennus.shaderissa, joten hiukkaset ovat ruudun
// tasossa kamerasta riippumatta; _ProjectionParams.x kääntää y:n, kun projektio on käännetty (lumi putoaa alas).
//
//   _Tila     x = laji (0 lumi, 1 pöly), y = voima 0–1 (häivytys), z = aika (s), w = ruudun kuvasuhde (leveys / korkeus)
//   _Keila    pöly: xy = keilan keskipiste ruudulla (0–1, origo vasen ala), z = säde ruudun korkeuksina, w = näkyy 0/1
//   _Koko     x = pienin ja y = suurin koko pikseleinä, z = ruudun leveys px, w = ruudun korkeus px
//   _Vari     rgb lineaarinen, a = suurin peittävyys
Shader "Matkakirja/Linssit/Hiukkaset"
{
    Properties
    {
        _Vari("Väri", Color) = (1, 1, 1, 0.7)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+45" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma target 3.5
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            // Ei UnityPerMaterial-puskuria: proseduraalinen piirto ei käy SRP-batcherin kautta.
            float4 _Tila;
            float4 _Keila;
            float4 _Koko;
            float4 _Vari;

            static const float2 KULMAT[6] =
            {
                float2(-1, -1), float2(1, -1), float2(1, 1),
                float2(-1, -1), float2(1, 1), float2(-1, 1),
            };

            struct Vali
            {
                float4 paikka : SV_POSITION;
                float2 kulma : TEXCOORD0;
                float alfa : TEXCOORD1;
            };

            float Tiiviste(uint n)
            {
                n = (n << 13u) ^ n;
                n = n * (n * n * 15731u + 789221u) + 1376312589u;
                return float(n & 0x7fffffffu) / float(0x7fffffff);
            }

            Vali vert(uint vid : SV_VertexID)
            {
                Vali o;
                uint i = vid / 6;
                float2 kulma = KULMAT[vid - i * 6];
                float h1 = Tiiviste(i * 3u + 11u), h2 = Tiiviste(i * 3u + 12u), h3 = Tiiviste(i * 3u + 13u);
                float t = _Tila.z;
                float2 p;
                float alfa;
                if (_Tila.x < 0.5)
                {
                    // LUMI: putoaa 3,5–9 % ruudun korkeudesta sekunnissa, lähimmät (isot) nopeimmin; kevyt tuuli ja
                    // huojunta. Ruudun reunoilla kiertää ympäri (frac), joten hiutaleita on aina yhtä paljon.
                    float nopeus = lerp(0.035, 0.09, h3);
                    p.y = frac(h2 - t * nopeus);
                    p.x = frac(h1 + t * 0.012 + 0.015 * sin(t * (0.6 + h3) + h1 * 6.2832));
                    alfa = lerp(0.35, 1.0, h3);
                }
                else
                {
                    // PÖLY: leijuu soihdun valokeilan sisällä hitaasti kiertäen ja väreillen; kirkkain keskellä.
                    float suunta = h2 > 0.5 ? 1.0 : -1.0;
                    float a = h1 * 6.2832 + t * (0.04 + 0.09 * h3) * suunta;
                    float r = sqrt(frac(h2 * 7.13)) * _Keila.z;
                    float2 heilunta = 0.006 * float2(sin(t * 0.7 + h1 * 20.0), cos(t * 0.53 + h2 * 20.0));
                    p = _Keila.xy + float2(cos(a) * r / max(_Tila.w, 0.1), sin(a) * r) + heilunta;
                    float vare = 0.55 + 0.45 * sin(t * (1.1 + 2.3 * h3) + h1 * 31.0);
                    alfa = saturate(1.0 - r / max(_Keila.z, 1e-4)) * vare * _Keila.w;
                }
                float koko = lerp(_Koko.x, _Koko.y, h3);
                float2 leike = p * 2.0 - 1.0 + kulma * koko * 2.0 / max(_Koko.zw, 1.0);
                leike.y *= _ProjectionParams.x;
                o.paikka = float4(leike, UNITY_NEAR_CLIP_VALUE, 1.0);
                o.kulma = kulma;
                o.alfa = alfa * _Tila.y * _Vari.a;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                // Pehmeä pyöreä piste; väri esikerrottuna (Blend One OneMinusSrcAlpha).
                float d = length(i.kulma);
                float a = saturate(1.0 - smoothstep(0.35, 1.0, d)) * i.alfa;
                if (a < 0.003) discard;
                return half4(_Vari.rgb * a, a);
            }
            ENDHLSL
        }
    }
}
