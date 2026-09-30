// ISS:n rakenteen siluetti astronautin valokuvan reunassa (ISS-kamera, Helsingin esimerkkikuva; omistaja 30.9.2026: "näyttääkö
// siluetti aidommalta"). Koko ruudun neliö kameran edessä (IssSiluetti.cs, kuten CupolaKerros), laskennallinen aurinkopaneelin
// siipi ilman tekstuuria: siipi tulee ruudun kulmasta vinosti, kaksi kennomattoa maston molemmin puolin, paneelilohkojen raot
// ja hienot kennoviivat, kehysputki kärjessä. Kamera on tarkennettu äärettömään, joten reunat ovat hieman pehmeät (_Sumeus).
// Valo: aurinko kameran koordinaateissa (_AurinkoRuutu); auringon puoleinen reuna saa kapean kirkkaan reunuksen ja matto
// hennon kiillon, varjon puoli jää tummaksi. Esikerrottu alfa, Overlay-jono, ZTest Always: kohteen edessä aina.
Shader "Matkakirja/Linssit/IssSiluetti"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
        _Ruutu("Ruudun kuvasuhde w/h", Float) = 0.46
        _AurinkoRuutu("Aurinko kamerassa (x, y, z; w = näkyy)", Vector) = (0.3, 0.5, 0.4, 1)
        _Asettelu("Siiven alku x, y, kulma (°), leveys", Vector) = (-0.12, -0.06, 24, 0.105)
        _Pituus("Siiven pituus", Float) = 0.62
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
                half a = saturate(max(max(sisalla * (1 - rako * (1 - masto)), putki), masto * step(0, t) * step(t, _Pituus)));
                if (a <= 0.001) return 0;

                // Matto: tumma sinivioletti, lohkojen raot ja hienot kennoviivat.
                half3 matto = half3(0.020, 0.024, 0.040);
                half lohko = Viiva(t, 0.052, 0.0022);
                half kenno = max(Viiva(t, 0.0105, 0.0007), Viiva(s, 0.0105, 0.0007));
                matto = lerp(matto, half3(0.055, 0.04, 0.022), lohko * 0.7);
                matto = lerp(matto, half3(0.045, 0.045, 0.06), kenno * 0.35);

                // Valo: kiilto (aurinko kameran edessä tai sivulla) ja auringon puoleinen reunus.
                float3 aur = normalize(_AurinkoRuutu.xyz);
                half nakyy = saturate(_AurinkoRuutu.w);
                half kiilto = pow(saturate(dot(normalize(float2(aur.x, aur.y) + 1e-4), normalize(d + n * 0.3)) * 0.5 + 0.5), 6) * nakyy;
                matto += half3(0.10, 0.09, 0.13) * kiilto * (0.4 + 0.6 * saturate(t / _Pituus));
                float puoli = sign(dot(float2(aur.x, aur.y), n));      // kummalla puolella aurinko on
                half reunus = (1 - smoothstep(0.0, 0.006, w - s * puoli)) * sisalla * nakyy;
                half3 vari = matto + half3(0.75, 0.62, 0.42) * reunus * 0.45;
                // Masto ja putki metallinharmaat, aurinkoon päin vaaleammat.
                half metalli = saturate(max(masto, putki));
                vari = lerp(vari, half3(0.07, 0.07, 0.075) + half3(0.20, 0.17, 0.13) * nakyy * 0.5, metalli * 0.85);
                a *= _Peitto;
                return half4(vari * a, a);
            }
            ENDHLSL
        }
    }
}
