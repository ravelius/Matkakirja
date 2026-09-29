// Dioraaman FOTOGRAMMETRINEN ULKOKUORI (Olavinlinna, Siirtoseppä 29.9.2026; malli Senaatti-kiinteistöt, CC BY 4.0):
// valaisematon, koska fotogrammetrian tekstuurissa on jo todellinen päivänvalo. Väri = kuva(uv0) · _Kirkkaus → sumu
// kuten muilla dioraaman pinnoilla. Molemmat puolet (glTF doubleSided: fotogrammetrian verkko on yksipuolinen
// kuori, jonka reunoista näkee sisään). SRP Batcher -yhteensopiva.
//
// LEIKKAUSIKKUNA (speksi dioraama-rajapinnat-blender-20260929.md kohta 3): kohdistetun tilan ajaksi kuoresta hylätään
// fragmentit leikkaustilavuudessa = tilan rajat (laajennettuna) jatkettuna vaakasuunnassa kameraa kohti kameraan asti.
// Globaalit (DioraamaUlkokuori.PaivitaLeikkaus): _DioraamaLeikkausMin.xyz / Max.xyz (maailma, jo laajennettu ja
// osuudella kutistettu keskipisteeseen), Min.w = osuus 0…1 (0 = kuori ehjä), Max.w = 1 jatketaan kameraan, 0 = vain
// laatikko; _DioraamaLeikkausKamera.xyz = kameran paikka. Reunalle 12 cm vaalea kivisävy (ei pahvinen reuna).
Shader "Matkakirja/Linssit/DioraamaKuori"
{
    Properties
    {
        _Kuva ("Fotogrammetrian tekstuuri", 2D) = "grey" {}
        _Kirkkaus ("Kirkkaus", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu;
            float4 _DioraamaLeikkausMin, _DioraamaLeikkausMax, _DioraamaLeikkausKamera;

            // Onko p leikkaustilavuudessa, kun laatikkoa kasvatetaan marginaalilla m? Säde p:stä kameran vastaiseen
            // vaakasuuntaan (−d) osuu laatikkoon matkalla [0, L] ⇔ p kuuluu laatikon kameraa kohti venytettyyn jatkeeseen.
            bool Leikkauksessa(float3 p, float m)
            {
                float3 lo = _DioraamaLeikkausMin.xyz - m, hi = _DioraamaLeikkausMax.xyz + m;
                if (p.y < lo.y || p.y > hi.y) return false;
                if (all(p.xz >= lo.xz) && all(p.xz <= hi.xz)) return true;
                if (_DioraamaLeikkausMax.w < 0.5) return false;
                float2 keski = (lo.xz + hi.xz) * 0.5;
                float2 kohti = _DioraamaLeikkausKamera.xz - keski;
                float L = length(kohti);
                if (L < 1e-3) return false;
                float2 d = -kohti / L; // p:stä laatikkoa kohti
                float2 inv = 1.0 / ((step(0.0, d) * 2.0 - 1.0) * max(abs(d), 1e-5)); // ei nollalla jakoa
                float2 t0 = (lo.xz - p.xz) * inv, t1 = (hi.xz - p.xz) * inv;
                float2 tmin = min(t0, t1), tmax = max(t0, t1);
                float sisaan = max(tmin.x, tmin.y), ulos = min(tmax.x, tmax.y);
                return sisaan <= ulos && ulos >= 0 && sisaan <= L;
            }

            TEXTURE2D(_Kuva); SAMPLER(sampler_Kuva);

            CBUFFER_START(UnityPerMaterial)
                float4 _Kuva_ST;
                half _Kirkkaus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 paikkaW : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 vari = SAMPLE_TEXTURE2D(_Kuva, sampler_Kuva, i.uv).rgb * _Kirkkaus;
                if (_DioraamaLeikkausMin.w > 0.001)
                {
                    if (Leikkauksessa(i.paikkaW, 0)) discard;
                    // Reuna kuoren omasta väristä hieman vaaleampana (1.0.57: kiinteä vaalea sävy näkyi hämärässä valkoisena
                    // viivana); leikattu kivi erottuu, mutta seuraa päivän/hämärän kirkkautta.
                    if (Leikkauksessa(i.paikkaW, 0.12)) vari = vari * 1.45h + half3(0.02h, 0.018h, 0.015h);
                }
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
