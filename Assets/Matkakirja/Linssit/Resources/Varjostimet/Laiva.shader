// Höyrylaiva (elävä kartta, Isoisän muste 26.9.2026): elävän hetken PAIKKAMERKKI (Natiivisepän laivamalli ja
// Karttasepän 1873-reitit myöhemmin). Pystyssä seisova neliö (CPU kääntää sen kameraan pystyakselin ympäri) ja
// siluetti etäisyyskentistä kuin vanhan kartan kuvituksessa: runko keula ylhäällä, kansirakennus, savupiippu, kaksi
// mastoa raakapuineen ja keulan kuohu. UV: x 0–1 perästä keulaan (_Suunta −1 kääntää), y 0–1 vesirajasta ylös.
Shader "Matkakirja/Linssit/Laiva"
{
    Properties
    {
        _Muste("Muste", Color) = (0.16, 0.12, 0.09, 1)
        _Kuohu("Kuohu", Color) = (0.97, 0.95, 0.88, 1)
        _Peitto("Peitto", Range(0, 1)) = 1
        _Suunta("Suunta ±1", Float) = 1
        _Aika("Aika (s)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+15" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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
                half4 _Kuohu;
                half _Peitto;
                float _Suunta;
                float _Aika;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            // Etäisyys suorakulmioon (keskipiste, puolikoko); negatiivinen sisällä.
            float Laatikko(float2 p, float2 k, float2 h)
            {
                float2 d = abs(p - k) - h;
                return length(max(d, 0)) + min(max(d.x, d.y), 0);
            }

            float Jana(float2 p, float2 a, float2 b, float leveys)
            {
                float2 pa = p - a, ba = b - a;
                float h = saturate(dot(pa, ba) / dot(ba, ba));
                return length(pa - ba * h) - leveys;
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 p = i.uv;
                if (_Suunta < 0) p.x = 1 - p.x;
                // Neliön kuvasuhde 2:1 → y-yksiköt samoiksi kuin x.
                p.y *= 0.5;
                // Runko: kansi y 0,11, pohja vesirajassa; keula (x → 1) kohoaa ja terävöityy, perä pyöreähkö.
                float kansi = 0.10 + 0.025 * smoothstep(0.75, 1.0, p.x);
                float pohja = 0.0 + 0.03 * smoothstep(0.8, 1.0, p.x) + 0.02 * (1 - smoothstep(0.0, 0.12, p.x));
                float keula = 0.96 - 0.10 * saturate((kansi - p.y) / 0.12);
                float runko = max(max(pohja - p.y, p.y - kansi), max(0.06 - p.x, p.x - keula));
                float d = runko;
                d = min(d, Laatikko(p, float2(0.50, 0.125), float2(0.13, 0.022)));           // kansirakennus
                d = min(d, Laatikko(p, float2(0.515, 0.19), float2(0.022, 0.06)));           // savupiippu
                d = min(d, Jana(p, float2(0.26, 0.10), float2(0.25, 0.36), 0.004));          // takamasto
                d = min(d, Jana(p, float2(0.76, 0.12), float2(0.77, 0.40), 0.004));          // etumasto
                d = min(d, Jana(p, float2(0.19, 0.30), float2(0.33, 0.30), 0.0035));         // raakapuut
                d = min(d, Jana(p, float2(0.69, 0.34), float2(0.85, 0.34), 0.0035));
                d = min(d, Jana(p, float2(0.95, 0.12), float2(0.77, 0.38), 0.0025));         // keulaharus
                float aa = max(fwidth(d), 1e-4);
                float muste = 1 - smoothstep(-aa, aa, d);
                // Keulan kuohu ja vana vesirajassa (kevyt värinä ajassa).
                float vesi = abs(p.y - 0.004);
                float kuohu = (1 - smoothstep(0.004, 0.012, vesi)) * smoothstep(0.0, 1.0, p.x) * (0.6 + 0.4 * sin(p.x * 90 - _Aika * 9));
                kuohu *= step(p.x, 1.02);
                half3 vari = lerp(_Kuohu.rgb, _Muste.rgb, muste);
                half alfa = saturate(muste + kuohu * 0.8 * (1 - muste)) * _Peitto;
                return half4(vari, alfa);
            }
            ENDHLSL
        }
    }
}
