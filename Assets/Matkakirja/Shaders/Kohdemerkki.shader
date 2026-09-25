// Siirtokohteen merkki (web js/pallolauta/merkit.js kohdeElementti, css .target-piste/.target-halo):
// kultalevy rgba(246,210,122,0.72), punamullan katkoviiva (--mark #b03a2b, 3 pt, katko 6/4; reitin varren
// piste 2,2 pt, 4/3, levy 0,55) ja hengittävä halo (--accent #d9a13b, 2,4 s: säde ×1,14 ↔ ×1,42,
// peitto 0,85 ↔ 0,4). Halon viiva 3,4 pt (reitin varren piste 2,4): pallolaudan merkki on .target-halo.fokus
// (css/styles.css:8293, js/pallolauta/merkit.js ympyra('target-halo fokus')), ei laudan 5 yksikön .target-halo. Neliö KaupunkiMerkit-juuressa, yksi yksikkö = yksi näytön piste; _Koko = sivu pisteinä.
// JOUTOSYKE (Fable 25.9.2026 klo 20.1x, Kartta/Joutosyke.cs): halo ei lue Unityn _Time.y:tä vaan globaalit _SykeAika
// (sykkeen oma aika, pysähtyy levossa) ja _SykeVoima (0 = keskiasento: säde ×1,28, peitto 0,625; 1 = täysi syke), jotta
// jäädytys keskiasentoon ja jatko ovat saumattomia.
Shader "Matkakirja/Kohdemerkki"
{
    Properties
    {
        _Taytto("Levy", Color) = (0.965, 0.824, 0.478, 0.72)
        _Viivavari("Katkoviiva", Color) = (0.690, 0.227, 0.169, 1)
        _Halovari("Halo", Color) = (0.851, 0.631, 0.231, 1)
        _Sade("Säde (pt)", Float) = 12
        _Viiva("Viiva (pt)", Float) = 3
        _Katko("Katko ja väli (pt)", Vector) = (6, 4, 0, 0)
        _Koko("Neliön sivu (pt)", Float) = 48
        _HaloViiva("Halon viiva (pt)", Float) = 3.4
        _Alfa("Häivytys (ilmestyminen ja poistuminen, web MERKKIEN_SIIRTYMA_MS)", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+2" "RenderPipeline" = "UniversalPipeline" }
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
                half4 _Taytto, _Viivavari, _Halovari;
                float _Sade, _Viiva, _Koko, _HaloViiva, _Alfa;
                float4 _Katko;
            CBUFFER_END
            // Joutosykkeen globaalit (Shader.SetGlobalFloat, Kartta/Joutosyke.cs), ei materiaalin ominaisuuksia.
            float _SykeAika, _SykeVoima;

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = (i.uv - 0.5) * _Koko;
                return o;
            }

            // SVG-kerrokset alhaalta ylös: halo, levy, katkoviiva ("over"-sekoitus).
            half4 Paalle(half4 ala, half3 vari, half a) { return half4(lerp(ala.rgb, vari, a), a + ala.a * (1 - a)); }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                float w = max(fwidth(r), 1e-4);
                // Halo: kohde-halo 2,4 s ease-in-out, 0 % ja 100 % kapea; joutosykkeen voima painaa keskiasentoon (e = 0,5).
                float t = frac(_SykeAika / 2.4);
                float s = t < 0.5 ? t * 2.0 : (1.0 - t) * 2.0;
                float e = s * s * (3.0 - 2.0 * s);
                e = 0.5 + _SykeVoima * (e - 0.5);
                float haloR = _Sade * lerp(1.14, 1.42, e);
                float haloA = lerp(0.85, 0.40, e) * (1.0 - smoothstep(_HaloViiva * 0.5 - 0.5 * w, _HaloViiva * 0.5 + 0.5 * w, abs(r - haloR)));
                half4 c = half4(_Halovari.rgb, haloA * _Halovari.a);
                // Levy.
                float levy = 1.0 - smoothstep(_Sade - w, _Sade, r);
                c = Paalle(c, _Taytto.rgb, levy * _Taytto.a);
                // Katkoviiva kehällä: kaaren pituus pisteinä, jakso katko + väli.
                float kaari = (atan2(i.uv.y, i.uv.x) + PI) * _Sade;
                float jakso = max(_Katko.x + _Katko.y, 0.01);
                float kohta = frac(kaari / jakso) * jakso;
                float katko = 1.0 - smoothstep(_Katko.x - 0.5, _Katko.x + 0.5, kohta);
                float viiva = (1.0 - smoothstep(_Viiva * 0.5 - 0.5 * w, _Viiva * 0.5 + 0.5 * w, abs(r - _Sade))) * katko;
                c = Paalle(c, _Viivavari.rgb, viiva * _Viivavari.a);
                c.a *= _Alfa;
                if (c.a <= 0.001) discard;
                return c;
            }
            ENDHLSL
        }
    }
}
