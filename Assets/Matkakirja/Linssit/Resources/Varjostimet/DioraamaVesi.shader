// Dioraaman JÄRVI (Olavinlinna, Siirtoseppä 1.10.2026; omistajan hyväksymä ympäristösuunnitelma, vaihe 2 vesi).
// Pohjana Unityn Boat Attack -vesijärjestelmä (com.verasl.water-system, © 2018 Unity Technologies ApS, Unity Companion
// License): Gerstner-aallot (GerstnerWaves.hlsl), pintanormaalin kaksi vierivää näytettä (WaterCommon.hlsl), fresnel ja
// GGX-kiilto (WaterLighting.hlsl) sekä planaariheijastus (PlanarReflections.cs → DioraamaVesi.cs). Mobiilia varten:
//   - aallot vain fragmentissa normaaleina (järven aallot 1,5–7 m; kärkisiirtymä ei näy dioraaman etäisyyksiltä),
//   - ei taittoa eikä _CameraOpaqueTexturea: veden runko on syvyyden mukaan matalan ja syvän värin sekoitus,
//   - syvyys Linnanrakentajan syvyyskartasta (MML/SYKE), ei kameran syvyydestä (_SyvyysParam.w = 0 → vakio 8 m),
//   - heijastus: _VesiHeijastus (DioraamaVesi.cs, puolikas/neljännes resoluutio) tai kevyellä tasolla taivaan liukuma.
// Sumu kuten muilla dioraaman pinnoilla (_DioraamaSumu, _DioraamaSumuVari).
Shader "Matkakirja/Linssit/DioraamaVesi"
{
    Properties
    {
        _Pinta ("Pintanormaali (Boat Attack WaterSurface_single)", 2D) = "grey" {}
        _Syvyys ("Syvyyskartta (0 = ranta)", 2D) = "black" {}
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry+10" "RenderPipeline" = "UniversalPipeline" }
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
            float4 _DioraamaValo;

            // Globaalit (DioraamaVesi.cs): aallot (amplitudi m, suunta °, aallonpituus m, -) × 4, heijastus ja värit.
            float4 _VesiAallot[4];
            float4 _VesiParam;        // x aika, y heijastus käytössä (0/1), z pintanormaalin voimakkuus, w fresnel-bias
            float4 _SyvyysParam;      // xy kuvan vasen alakulma (Unity x, z), z 1 / alueen koko m, w suurin syvyys m (0 = ei karttaa)
            half4 _VesiMata, _VesiSyva, _VesiTaivasYla, _VesiTaivasAla, _VesiAurinko;
            TEXTURE2D(_VesiHeijastus); SAMPLER(sampler_VesiHeijastus);

            TEXTURE2D(_Pinta); SAMPLER(sampler_Pinta);
            TEXTURE2D(_Syvyys); SAMPLER(sampler_Syvyys);

            CBUFFER_START(UnityPerMaterial)
                float4 _Pinta_ST;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali
            {
                float4 paikkaH : SV_POSITION;
                float3 paikkaW : TEXCOORD0;
                float4 ruutu : TEXCOORD1;
            };

            Vali vert(Syote v)
            {
                Vali o;
                o.paikkaW = TransformObjectToWorld(v.paikka.xyz);
                o.paikkaH = TransformWorldToHClip(o.paikkaW);
                o.ruutu = ComputeScreenPos(o.paikkaH);
                return o;
            }

            // Boat Attack GerstnerWave, vain normaali (peak 1,5; aaltojen määrä 4).
            float3 GerstnerNormaali(float2 pos, float amplitudi, float suunta, float aallonpituus, float aika)
            {
                float w = 6.28318 / aallonpituus;
                float nopeus = sqrt(9.8 * w);
                float qi = 1.5 / (amplitudi * w * 4.0);
                float s = radians(suunta);
                float2 tuuli = float2(sin(s), cos(s));
                float laske = dot(tuuli, pos) * w - aika * nopeus;
                float wa = w * amplitudi;
                return float3(-(tuuli.x * wa * cos(laske)), 1 - (qi * wa * sin(laske)), -(tuuli.y * wa * cos(laske))) * 0.25;
            }

            // Boat Attack Highlights (GGX, "Optimizing PBR for Mobile").
            half Kiilto(half3 n, half3 L, half3 V, half karheus)
            {
                half r2 = karheus * karheus;
                half3 h = SafeNormalize(L + V);
                half NoH = saturate(dot(n, h));
                half LoH = saturate(dot(L, h));
                half d = NoH * NoH * (r2 - 1.h) + 1.0001h;
                half termi = r2 / ((d * d) * max(0.1h, LoH * LoH) * (karheus + 0.5h) * 4);
                return clamp(termi - HALF_MIN, 0.0h, 5.0h);
            }

            half4 frag(Vali i) : SV_Target
            {
                float aika = _VesiParam.x;
                float3 p = i.paikkaW;
                float etaisyys = length(_WorldSpaceCameraPos - p);

                // Syvyys (m) kartasta; ranta tyyntyy.
                float syvyys = 8.0;
                if (_SyvyysParam.w > 0)
                {
                    float2 uv = (p.xz - _SyvyysParam.xy) * _SyvyysParam.z;
                    syvyys = SAMPLE_TEXTURE2D(_Syvyys, sampler_Syvyys, uv).r * _SyvyysParam.w;
                }
                half tyyni = (half)saturate(syvyys * 0.1 + 0.05); // Boat Attack: opacity = saturate(depth · 0,1 + 0,05)

                // Aallot + pintanormaali (Boat Attack: uv.zw = xz · 0,1 + t · 0,05, uv.xy = xz · 0,4 − t · 0,1).
                float3 n = float3(0, 0, 0);
                [unroll] for (int k = 0; k < 4; k++)
                    n += GerstnerNormaali(p.xz, _VesiAallot[k].x, _VesiAallot[k].y, _VesiAallot[k].z, aika);
                n.xz *= tyyni;
                half2 d1 = SAMPLE_TEXTURE2D(_Pinta, sampler_Pinta, p.xz * 0.1 + aika * 0.05).xy * 2 - 1;
                half2 d2 = SAMPLE_TEXTURE2D(_Pinta, sampler_Pinta, p.xz * 0.4 - aika * 0.1).xy * 2 - 1;
                half2 detalji = (d1 + d2 * 0.5h) * (half)_VesiParam.z * tyyni;
                n += float3(detalji.x, 0, detalji.y);
                // Kaukana pinta tasoittuu (Boat Attack distanceBlend), ettei kaukovesi välky.
                n = normalize(lerp(n, float3(0, 1, 0), saturate(etaisyys * 0.002 - 0.25)));

                half3 V = (half3)normalize(_WorldSpaceCameraPos - p);
                half NoV = saturate(dot((half3)n, V));
                half fresnel = saturate((half)_VesiParam.w + (1 - (half)_VesiParam.w) * pow(1 - NoV, 5));

                // Heijastus: planaarikuva ruudun koordinaateissa normaalilla vääristettynä, tai taivaan liukuma.
                half3 heijastus;
                float2 ruutu = i.ruutu.xy / i.ruutu.w;
                if (_VesiParam.y > 0.5)
                    heijastus = SAMPLE_TEXTURE2D(_VesiHeijastus, sampler_VesiHeijastus, ruutu + n.zx * float2(0.012, 0.03)).rgb;
                else
                {
                    half3 r = reflect(-V, (half3)n);
                    heijastus = lerp(_VesiTaivasAla.rgb, _VesiTaivasYla.rgb, saturate(r.y * 1.6h + 0.1h));
                }

                // Veden runko syvyyden mukaan + auringon sironta (Boat Attack SSS, yksinkertaistettu).
                half3 L = (half3)normalize(_DioraamaValo.xyz);
                half3 runko = lerp(_VesiMata.rgb, _VesiSyva.rgb, saturate((half)syvyys / 6.0h));
                runko *= 0.75h + 0.25h * saturate(L.y);
                half3 vari = lerp(runko, heijastus, fresnel);
                vari += Kiilto((half3)n, L, V, 0.08h) * _VesiAurinko.rgb * 0.35h;

                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
