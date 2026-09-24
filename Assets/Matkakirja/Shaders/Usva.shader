// Lähtösumu ja pilvimeri (omistaja 24.9.2026 klo 13.5x, LENNON PINTA): läpikuultava kaareva pilvilevy koneen alla.
// Peittää maanpinnan lähikuvissa lähdössä (Lontoon usva) ja laskussa, ja pallon pinta vaihtuu sen alla
// pergamentista lennon pintaan ja takaisin. Proseduraalinen fbm-kohina (ei tekstuuria), aurinko sävyttää
// yläpinnan, reunat häipyvät (uv.x = etäisyys keskeltä 0–1). _Peitto 0–1 animoidaan (Usvalevy.cs).
Shader "Matkakirja/Usva"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.93, 0.94, 0.96, 1)
        _Varjo("Varjopuoli", Color) = (0.70, 0.73, 0.79, 1)
        _Peitto("Peitto", Range(0, 1)) = 0
        _Mittakaava("Kohinan mittakaava (1/m)", Float) = 0.00004
        _Ajelehdinta("Ajelehdinta (m/s)", Float) = 60
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-20" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                half4 _Varjo;
                half _Peitto;
                float _Mittakaava;
                float _Ajelehdinta;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; float2 uv : TEXCOORD0; };
            struct Vali
            {
                float4 paikka : SV_POSITION;
                float2 uv : TEXCOORD0;
                float2 taso : TEXCOORD1;     // levyn paikalliset metrit (x, z) kohinalle
                half valo : TEXCOORD2;
            };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                o.taso = i.paikka.xz;
                float3 n = TransformObjectToWorldNormal(i.normaali);
                o.valo = (half)saturate(0.35 + 0.65 * dot(n, GetMainLight().direction));
                return o;
            }

            float hajautus(float2 p) { return frac(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }

            float kohina(float2 p)
            {
                float2 i = floor(p), f = frac(p);
                float2 u = f * f * (3.0 - 2.0 * f);
                return lerp(lerp(hajautus(i), hajautus(i + float2(1, 0)), u.x),
                            lerp(hajautus(i + float2(0, 1)), hajautus(i + float2(1, 1)), u.x), u.y);
            }

            float fbm(float2 p)
            {
                float s = 0, a = 0.5;
                for (int k = 0; k < 5; k++) { s += a * kohina(p); p = p * 2.03 + 17.1; a *= 0.5; }
                return s;
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 p = (i.taso + float2(_Time.y * _Ajelehdinta, _Time.y * _Ajelehdinta * 0.3)) * _Mittakaava;
                float n = fbm(p);
                // Peitto kasvattaa tiheyttä: pienellä peitolla vain harsoja, täydellä umpimeri.
                float tiheys = saturate((n - (1.0 - _Peitto) * 0.75) * 2.2 + _Peitto * 0.55);
                float reuna = 1.0 - smoothstep(0.55, 1.0, i.uv.x);
                // Täydelläkin peitolla pinta elää: kohinan laaksot vähän läpikuultavia ja varjossa, huiput valossa
                // (sim 24.9.: tasainen valkoinen näytti tyhjältä).
                half a = (half)saturate(tiheys * reuna * saturate(_Peitto * 1.6) * (0.78 + 0.22 * smoothstep(0.25, 0.6, n)));
                float kumpu = smoothstep(0.3, 0.75, fbm(p * 3.1 + 5.3));
                half3 vari = lerp(_Varjo.rgb, _BaseColor.rgb, saturate(i.valo * (0.35 + 0.65 * kumpu)));
                return half4(vari * max(0.6, _MainLightColor.rgb), a);
            }
            ENDHLSL
        }
    }
}
