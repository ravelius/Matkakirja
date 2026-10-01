// Dioraaman TAIVASKUPOLI (Olavinlinna, Siirtoseppä 1.10.2026; Päätoimittaja: natiivin taivas oli tasaisen tummansininen,
// vaikka vesi peilaa vaaleanpunaista kajoa). Kupoli seuraa kameraa (DioraamaYmparisto.Paivita) ja piirtyy ensimmäisenä
// ilman syvyyskirjoitusta, joten se näkyy myös järven planaariheijastuksessa.
//   _TaivasParam.x = 1: Linnanrakentajan equirect-kuva (_TaivasKuva, u = atsimuutti + _TaivasParam.y, v = korkeus);
//   muuten liukuväri: horisontti (_TaivasHorisontti = sumun väri, jotta kaukomaasto sulautuu) → lakipiste, ja auringon
//   puolella kajo (_TaivasKajo), joka hiipuu ylöspäin. _TaivasAurinko.xyz = auringon suunta (sama kuin veden kiillot).
Shader "Matkakirja/Linssit/DioraamaTaivas"
{
    Properties
    {
        _TaivasKuva ("Taivas (equirect)", 2D) = "black" {}
    }
    SubShader
    {
        Tags { "RenderType" = "Background" "Queue" = "Background" "RenderPipeline" = "UniversalPipeline" "PreviewType" = "Skybox" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _TaivasHorisontti, _TaivasLaki, _TaivasKajo;
            float4 _TaivasAurinko, _TaivasParam;
            TEXTURE2D(_TaivasKuva); SAMPLER(sampler_TaivasKuva);

            CBUFFER_START(UnityPerMaterial)
                float4 _TaivasKuva_ST;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikkaH : SV_POSITION; float3 suunta : TEXCOORD0; };

            Vali vert(Syote v)
            {
                Vali o;
                float3 w = TransformObjectToWorld(v.paikka.xyz);
                o.paikkaH = TransformWorldToHClip(w);
                o.suunta = w - _WorldSpaceCameraPos;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 d = normalize(i.suunta);
                if (_TaivasParam.x > 0.5)
                {
                    // Kompassiatsimuutti a = atan2(itä, pohjoinen); Linnanrakentajan kuvissa a = suunta + 360·u (u kasvaa
                    // myötäpäivään), joten u = (a − suunta) / 360 (_TaivasParam.y = −suunta/360, toisto kiertää).
                    float u = atan2(d.x, d.z) / (2 * PI) + _TaivasParam.y;
                    float v = asin(clamp(d.y, -1, 1)) / PI + 0.5;
                    return half4(SAMPLE_TEXTURE2D_LOD(_TaivasKuva, sampler_TaivasKuva, float2(u, max(v, 0.5)), 0).rgb, 1);
                }
                half h = (half)saturate(d.y);
                half3 vari = lerp(_TaivasHorisontti.rgb, _TaivasLaki.rgb, pow(h, 0.45h));
                float2 xz = normalize(d.xz + 1e-5), sxz = normalize(_TaivasAurinko.xz + 1e-5);
                half kohti = (half)saturate(dot(xz, sxz) * 0.5 + 0.5);
                half kajo = pow(kohti, 3.0h) * exp(-h * 5.0h);
                vari = lerp(vari, _TaivasKajo.rgb, saturate(kajo * _TaivasKajo.a));
                return half4(vari, 1);
            }
            ENDHLSL
        }
    }
}
