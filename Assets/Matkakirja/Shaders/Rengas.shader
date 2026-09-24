// Aloitusvalinnan huomiorengas (web .pallolauta-huomio, js/pallolauta/merkit.js KOHDEMERKIN_HUOMIO_PX 54):
// kultainen kehä r 27 pt, viiva 2,6 pt (non-scaling-stroke: ei kasva sykkeen mukana), täyttö
// rgba(234, 184, 78, 0.08). Syke 2,6 s ease-in-out: säde 1 → 1,16 ja peitto 0,92 → 0,42 → takaisin.
// Neliö on KaupunkiMerkit-juuren sisällä, jossa yksi yksikkö = yksi näytön piste; _Koko = neliön sivu
// pisteinä (sama kuin C#:n localScale), joten mitat ovat pisteitä pistekertoimesta riippumatta.
Shader "Matkakirja/Rengas"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.918, 0.722, 0.306, 1)
        _Sade("Säde (pt)", Float) = 27
        _Paksuus("Viiva (pt)", Float) = 2.6
        _Taytto("Täytön peitto", Float) = 0.08
        _Koko("Neliön sivu (pt)", Float) = 68
        _Jakso("Sykkeen jakso (s)", Float) = 2.6
        _Kasvu("Säteen kasvu sykkeessä", Float) = 0.16
        _PeittoYla("Peitto levossa", Float) = 0.92
        _PeittoAla("Peitto sykkeen huipulla", Float) = 0.42
    }
    SubShader
    {
        // Ennen pistettä (Transparent+1) ja nimiötä (3005): rengas jää pisteen alle kuten webissä.
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

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _Sade, _Paksuus, _Taytto, _Koko, _Jakso, _Kasvu, _PeittoYla, _PeittoAla;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = (i.uv - 0.5) * _Koko;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                float w = max(fwidth(r), 1e-4);
                // Keyframes 0 %, 100 % lepo, 50 % huippu; CSS ease-in-out ≈ smoothstep kummallakin puolikkaalla.
                float t = frac(_Time.y / max(_Jakso, 0.01));
                float s = t < 0.5 ? t * 2.0 : (1.0 - t) * 2.0;
                float e = s * s * (3.0 - 2.0 * s);
                float sade = _Sade * (1.0 + _Kasvu * e);
                float peitto = lerp(_PeittoYla, _PeittoAla, e);
                float puoli = _Paksuus * 0.5;
                float viiva = 1.0 - smoothstep(puoli - 0.5 * w, puoli + 0.5 * w, abs(r - sade));
                float sisa = 1.0 - smoothstep(sade - w, sade, r);
                // SVG: viiva täytön päällä, sama väri; koko elementin peitto kertoo molemmat.
                float a = viiva + (1.0 - viiva) * _Taytto * sisa;
                if (a <= 0.001) discard;
                return half4(_BaseColor.rgb, a * peitto * _BaseColor.a);
            }
            ENDHLSL
        }
    }
}
