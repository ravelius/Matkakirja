// ISS:n rakenteen siluetti astronautin valokuvan reunassa (ISS-kamera, Helsingin esimerkkikuva; omistaja 30.9.2026: "näyttääkö
// siluetti aidommalta"). Koko ruudun neliö kameran edessä (IssSiluetti.cs, kuten CupolaKerros), laskennallinen aurinkopaneelin
// siipi ilman tekstuuria: siipi tulee ruudun kulmasta vinosti, kaksi kennomattoa maston molemmin puolin, paneelilohkojen raot
// ja hienot kennoviivat, kehysputki kärjessä. Kamera on tarkennettu äärettömään, joten reunat ovat hieman pehmeät (_Sumeus).
// Valo: musta vastavalosiluetti (omistaja 30.9.): runko ja matto lähes mustia, auringon puoleisessa reunassa ja kärjessä ohut
// lämmin reunavalo (aurinko kameran koordinaateissa, _AurinkoRuutu). Esikerrottu alfa, Overlay-jono, ZTest Always.
Shader "Matkakirja/Linssit/IssSiluetti"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
        _Ruutu("Ruudun kuvasuhde w/h", Float) = 0.46
        _AurinkoRuutu("Aurinko kamerassa (x, y, z; w = näkyy)", Vector) = (0.3, 0.5, 0.4, 1)
        _Asettelu("Siiven alku x, y, kulma (°), leveys", Vector) = (-0.1, -0.05, 22, 0.08)
        _Pituus("Siiven pituus", Float) = 0.5
        _Sumeus("Reunan pehmeys", Float) = 0.006
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Overlay+5" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                float _Ruutu, _Pituus, _Sumeus;
                float4 _AurinkoRuutu, _Asettelu;
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

            // Kapea viiva 0…1 (keskellä 1) jaksollisessa koordinaatissa.
            half Viiva(float x, float jakso, float leveys)
            {
                float f = abs(frac(x / jakso + 0.5) - 0.5) * jakso;
                return 1 - smoothstep(leveys * 0.5, leveys, f);
            }

            half4 frag(Vali i) : SV_Target
            {
                // Kuvasuhteen mukaiset koordinaatit: x ruudun leveyden osuuksina kuvasuhteella, y korkeuden osuuksina.
                float2 p = float2(i.uv.x * _Ruutu, i.uv.y);
                float kulma = radians(_Asettelu.z);
                float2 d = float2(cos(kulma), sin(kulma));
                float2 n = float2(-d.y, d.x);
                float2 q = p - _Asettelu.xy;
                float t = dot(q, d);          // siiven pituussuunta
                float s = dot(q, n);          // poikkisuunta, maston kohdalla 0
                // Perspektiivi: siiven tyvi (kulmassa) on lähempänä kameraa ja leveämpi, kärki kapenee.
                float w = _Asettelu.w * lerp(1.35, 0.8, saturate(t / _Pituus));
                float reuna = _Sumeus;
                half sisalla = smoothstep(-reuna, reuna, t) * (1 - smoothstep(_Pituus - reuna, _Pituus + reuna, t))
                             * (1 - smoothstep(w - reuna, w + reuna, abs(s)));
                // Kärjen kehysputki hieman siipeä leveämpi.
                half putki = (1 - smoothstep(0.004 - reuna, 0.004 + reuna, abs(t - _Pituus)))
                           * (1 - smoothstep(w * 1.08 - reuna, w * 1.08 + reuna, abs(s)));
                // Masto keskellä ja sen molemmin puolin mattojen rako.
                half masto = 1 - smoothstep(0.0035, 0.0035 + reuna, abs(s));
                half rako = 1 - smoothstep(0.0075, 0.0075 + reuna, abs(s));
                // Bokeh (400 mm:n etuala, _Sumeus > 0,02): pelkkä pehmeä muoto, ei teräviä mastoja, rakoja eikä kehysputkea.
                half bokeh = step(0.02, _Sumeus);
                half a = lerp(saturate(max(max(sisalla * (1 - rako * (1 - masto)), putki), masto * step(0, t) * step(t, _Pituus))), sisalla, bokeh);
                if (a <= 0.001) return 0;

                // Musta vastavalosiluetti (omistaja 30.9.2026 Päätoimittajan kautta: "musta siluetti"): matto ja runko lähes
                // mustia, rakenne erottuu vain aavistuksena; auringon puoleisessa reunassa ohut lämmin reunavalo.
                half lohko = Viiva(t, 0.052, 0.0022) * (1 - bokeh);
                half3 vari = half3(0.006, 0.007, 0.010) + half3(0.012, 0.010, 0.008) * lohko;
                float3 aur = normalize(_AurinkoRuutu.xyz);
                half nakyy = saturate(_AurinkoRuutu.w);
                float puoli = sign(dot(float2(aur.x, aur.y), n));      // kummalla puolella aurinko on
                half reunus = (1 - smoothstep(0.0, 0.0022, w - s * puoli)) * sisalla * nakyy;
                half karki = (1 - smoothstep(0.0, 0.003, abs(t - _Pituus))) * step(0, s * puoli) * nakyy;
                vari += half3(0.55, 0.45, 0.32) * saturate(reunus + karki * 0.6) * 0.7 * (1 - bokeh);
                a *= _Peitto;
                return half4(vari * a, a);
            }
            ENDHLSL
        }
    }
}
