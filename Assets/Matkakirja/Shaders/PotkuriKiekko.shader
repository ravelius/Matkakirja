// Potkurikiekko (ELOKUVALLINEN ALOITUSLENTO erä 2): pyörivän potkurin liike-epäterävä kiekko lapojen päällä.
// Litteä kiekko potkurin tasossa, uv = napakoordinaattien pohja (keskipiste 0,5). Läpikuultava: tyvi ja napa
// lähes näkymättömiä, lavan leveimmän kohdan vyöhyke tummin, kärkien ohut vaalea rengas (kärjet välähtävät
// auringossa). Kevyet säteittäiset vyöt ja hidas stroboskooppinen haamulapakuvio (3 lapaa) liikkeen tunnuksi.
// Pääauringon valo sävyttää kiekon, jotta se istuu koneen valaistukseen. Ei syvyyskirjoitusta, molemmat puolet.
Shader "Matkakirja/PotkuriKiekko"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.30, 0.31, 0.33, 1)
        _Karki("Kärkirengas", Color) = (0.85, 0.86, 0.88, 1)
        _Peitto("Peitto", Range(0, 1)) = 0.34
        _Haamu("Haamulapojen kierto (rad/s)", Float) = -1.3
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" }
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
                half4 _Karki;
                half _Peitto;
                float _Haamu;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; half valo : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                // Kiekko on ohut: valo kummaltakin puolelta (abs), ja pohjavalo, ettei varjopuoli mustu.
                float3 n = TransformObjectToWorldNormal(i.normaali);
                Light aurinko = GetMainLight();
                o.valo = (half)(0.45 + 0.75 * abs(dot(n, aurinko.direction)));
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 p = i.uv * 2.0 - 1.0;
                float r = length(p);
                if (r > 1.0) discard;
                float kulma = atan2(p.y, p.x);
                // Säteittäinen profiili: lavan jänne (leveys) määrää peiton; napa ja tyvi ohuita.
                half lapa = smoothstep(0.10, 0.30, r) * (1.0 - smoothstep(0.90, 1.0, r));
                lapa *= 0.65 + 0.35 * smoothstep(0.25, 0.55, r) * (1.0 - smoothstep(0.75, 0.98, r));
                // Kevyet vyöt (lavan profiilin kiilto kiertäessä) ja haamulavat.
                half vyot = 0.88 + 0.12 * sin(r * 38.0);
                half haamu = 0.80 + 0.20 * pow(saturate(cos(3.0 * (kulma - _Haamu * _Time.y))), 6.0);
                half karki = smoothstep(0.93, 0.965, r) * (1.0 - smoothstep(0.975, 1.0, r));
                half3 vari = lerp(_BaseColor.rgb, _Karki.rgb, karki) * i.valo;
                half a = saturate(_Peitto * lapa * vyot * haamu + karki * 0.35);
                return half4(vari * _MainLightColor.rgb, a);
            }
            ENDHLSL
        }
    }
}
