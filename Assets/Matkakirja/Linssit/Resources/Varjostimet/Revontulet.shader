// Revontulet (ISS-realismi 3b, omistajan kortti 28.9.2026): NOAA SWPC OVATION Prime -todennäköisyys (Julkaisijan ajastettu
// haku, data/revontulet/uusin.png 360 × 181: sarake 0 = pituus 0° itään, rivi 0 = leveys 90°) kuorella R + 110 km yöpuolella.
// Emissio lisätään (Blend One One): vihreä (OI 557,7 nm) p², yläreunassa punertava; hidas verhomainen kohina, jonka nopeus
// vaihtelee (Ei monotoniaa). Näkyy, kun aurinko on pisteessä alle −12°. Kuoren fragmentin oma leveys ja pituus (kuori on
// revontulien korkeudella, joten parallaksia ei korjata).
Shader "Matkakirja/Linssit/Revontulet"
{
    Properties
    {
        _Todennakoisyys("OVATION-todennäköisyys (R, tasakulmainen)", 2D) = "black" {}
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _Akseli("Napa-akseli (maailma, ECEF Z)", Vector) = (0, 1, 0, 0)
        _Nolla("Päiväntasaaja 0° (maailma, ECEF X)", Vector) = (1, 0, 0, 0)
        _Ita("Päiväntasaaja 90° itään (maailma, ECEF Y)", Vector) = (0, 0, 1, 0)
        _Voima("Voimakkuus (0 = pois)", Float) = 1.4
        _Aika("Aika (s)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-45" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One One
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_Todennakoisyys); SAMPLER(sampler_Todennakoisyys);
            CBUFFER_START(UnityPerMaterial)
                float4 _Aurinko, _Keskus, _Akseli, _Nolla, _Ita;
                float _Voima, _Aika;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
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
                float3 n = normalize(i.maailma - _Keskus.xyz);
                float yo = 1.0 - smoothstep(-0.26, -0.18, dot(n, normalize(_Aurinko.xyz)));   // aurinko alle −12° … −15°
                // ECEF Y C#:sta (Unityn maailma on vasenkätinen: cross(z, x) = −Y peilasi pituuden).
                float3 z = normalize(_Akseli.xyz), x = normalize(_Nolla.xyz), y = normalize(_Ita.xyz);
                float lat = asin(clamp(dot(n, z), -1.0, 1.0)), lon = atan2(dot(n, y), dot(n, x));
                float lonAst = degrees(lon), latAst = degrees(lat);
                float2 uv = float2(frac((lonAst + 360.0) / 360.0 + 0.5 / 360.0), (latAst + 90.0) / 181.0 + 0.5 / 181.0);
                float p = SAMPLE_TEXTURE2D(_Todennakoisyys, sampler_Todennakoisyys, uv).r;
                // Verhot: pitkittäinen kohina pituuspiirin suunnassa, liike vaihtelee hitaasti (kaksi nopeutta sekoittuu).
                float nopeus = 0.6 + 0.4 * sin(_Aika * 0.05);
                float verho = Kohina(float2(lonAst * 0.9 + _Aika * 0.8 * nopeus, latAst * 0.25)) * 0.7
                            + Kohina(float2(lonAst * 2.3 - _Aika * 0.5, latAst * 0.6 + 3.1)) * 0.3;
                float voima = p * p * (0.45 + 0.9 * verho) * yo * _Voima;
                half3 vari = lerp(half3(0.25, 1.0, 0.45), half3(1.0, 0.3, 0.35), (half)saturate((verho - 0.65) * 2.0) * 0.35h);
                return half4(vari * (half)voima, 0);
            }
            ENDHLSL
        }
    }
}
