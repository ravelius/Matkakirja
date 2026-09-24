// Lentoestevalo (radiouudistus build 12, Kartta/RadioMastot.cs): kaikkien mastojen kaikki valotasot yhtenä
// instansoituna billboard-kutsuna. Instanssin matriisi = valon paikka maailmassa; _Valo per instanssi:
//   x = vilkun jakso (s), y = vaihe (0…1)   Mastot.Vilkku(asema): FNV-1a-tiivisteestä, 1,5 s ± 20 %
//   z = kirkkaus: < 0 = muu masto (vilkku lasketaan tässä), ≥ 0 = valittu masto VU-tahdissa (Valittu(id, kirkkaus))
//   w = näkyvyys 0…1 (maston nousu)
// Vilkku samalla kaavalla kuin Mastot.VilkunValo: palaa 0,45 s jakson alussa, nousu ja lasku 0,12 s, Pehmeä
// (smootherstep). Prosessori ei tee kehyskohtaista vilkkutyötä.
//
// Ulkoasu havainnekuvan mastot.js:stä: valon säde r = 2,1 pt (valittu 2,8 pt) × max(0,7, mittakaava) (_Sade ja
// _SadeValittu pikseleinä); halo 6,8 r (valittu 12 r) radialGradient-pysäyttimillä
//   hehku   0: #ff5a3a 1 · 0,22: #ff3a1a 0,55 · 0,55: #ff2a0a 0,16 · 1: 0     ydin #ff5a3a
//   hehkuV  0: #ffd0b0 1 · 0,18: #ff5a2a 0,8  · 0,5: #ff3a12 0,25 · 1: 0     ydin #ffd2b0
// ja sammunut valo pieni tumma piste #5a1a10 (0,8 r). Värit lineaarisina. Pallon takana olevat valot karsii C#.
Shader "Matkakirja/Lentoestevalo"
{
    Properties
    {
        _Sade("Valon säde (px)", Float) = 6.3
        _SadeValittu("Valitun valon säde (px)", Float) = 8.4
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+5" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Sade, _SadeValittu;
            CBUFFER_END

            UNITY_INSTANCING_BUFFER_START(Valot)
                UNITY_DEFINE_INSTANCED_PROP(float4, _Valo)
            UNITY_INSTANCING_BUFFER_END(Valot)

            struct Syote { float4 paikka : POSITION; float2 kulma : TEXCOORD0; UNITY_VERTEX_INPUT_INSTANCE_ID };
            // kulma: halon yksiköissä (1 = halon reuna); tila: x = kirkkaus 0…1, y = valittu (0/1), z = ytimen säde
            // halon osuutena, w = näkyvyys.
            struct Vali { float4 paikka : SV_POSITION; float2 kulma : TEXCOORD0; half4 tila : TEXCOORD1; };

            float Pehmea(float x) { x = saturate(x); return x * x * x * (x * (x * 6.0 - 15.0) + 10.0); }

            Vali vert(Syote i)
            {
                Vali o;
                UNITY_SETUP_INSTANCE_ID(i);
                float4 valo = UNITY_ACCESS_INSTANCED_PROP(Valot, _Valo);
                bool valittu = valo.z >= 0.0;
                float v;
                if (valittu) v = saturate(valo.z);
                else
                {
                    float jakso = max(valo.x, 0.1);
                    float x = frac(_Time.y / jakso + valo.y) * jakso;   // s jakson alusta (Mastot.VilkunValo)
                    v = x >= 0.45 ? 0.0 : Pehmea(min(min(1.0, x / 0.12), min(1.0, (0.45 - x) / 0.12)));
                }
                float r = valittu ? _SadeValittu : _Sade;
                float halo = r * (valittu ? 12.0 : 6.8);
                float3 keski = float3(UNITY_MATRIX_M._m03, UNITY_MATRIX_M._m13, UNITY_MATRIX_M._m23);
                o.paikka = TransformWorldToHClip(keski);
                o.paikka.xy += i.kulma * halo * 2.0 / _ScreenParams.xy * o.paikka.w;
                o.kulma = i.kulma;
                o.tila = half4(v, valittu ? 1.0 : 0.0, r / halo, saturate(valo.w));
                if (valo.w <= 0.0) o.paikka = float4(2, 2, 2, 1);
                return o;
            }

            // Paloittain lineaarinen radiaaligradientti: pysäyttimet (0, a, b, 1), värit c0…c3 ja peitot p0…p3.
            half4 Liuku(float d, float a, float b, half3 c0, half3 c1, half3 c2, half3 c3, half p0, half p1, half p2)
            {
                if (d < a) { float t = d / a; return half4(lerp(c0, c1, t), lerp(p0, p1, t)); }
                if (d < b) { float t = (d - a) / (b - a); return half4(lerp(c1, c2, t), lerp(p1, p2, t)); }
                float t = saturate((d - b) / (1.0 - b));
                return half4(lerp(c2, c3, t), lerp(p2, 0.0, t));
            }

            half4 frag(Vali i) : SV_Target
            {
                float d = length(i.kulma);
                float w = fwidth(d);   // ennen discardia (derivaatat tasaisessa ohjausvuossa)
                if (d >= 1.0) discard;
                half v = i.tila.x;
                bool valittu = i.tila.y > 0.5;
                half4 h = valittu
                    ? Liuku(d, 0.18, 0.5, half3(1.0, 0.6308, 0.4342), half3(1.0, 0.1022, 0.0232), half3(1.0, 0.0423, 0.0060), half3(1.0, 0.0232, 0.0030), 1.0, 0.8, 0.25)
                    : Liuku(d, 0.22, 0.55, half3(1.0, 0.1022, 0.0423), half3(1.0, 0.0423, 0.0103), half3(1.0, 0.0232, 0.0030), half3(1.0, 0.0232, 0.0030), 1.0, 0.55, 0.16);
                h.a *= v;
                // Ydin: palaessa kirkas (säde r), sammuneena tumma piste 0,8 r.
                half3 ydinVari = lerp(half3(0.1022, 0.0103, 0.0052), valittu ? half3(1.0, 0.6445, 0.4342) : half3(1.0, 0.1022, 0.0423), v);
                float ydinR = i.tila.z * lerp(0.8, 1.0, v);
                half ydin = 1.0 - smoothstep(ydinR - w, ydinR + w, d);
                // SVG-järjestys: halo ensin, ydin päälle (esikerrottu alfa).
                half3 rgb = h.rgb * h.a * (1.0 - ydin) + ydinVari * ydin;
                half a = h.a * (1.0 - ydin) + ydin;
                half nak = i.tila.w;
                return half4(rgb * nak, a * nak);
            }
            ENDHLSL
        }
    }
}
