// TÄYDEN VAUHDIN REUNAT (omistaja 6.10.2026: täydellä nopeudella kuva "hieman vääristää kuvan reunoja"; Päätoimittaja:
// säteittäinen liike-epäterävyys vain reunoilla, keskusta terävä). Koko ruudun neliö kameran edessä (Nopeustehoste), joka
// näytteistää kameran läpinäkymättömän kuvan (_CameraOpaqueTexture; kamerakohtainen requiresColorTexture vain kun Voima > 0)
// kahdeksalla näytteellä säteen suunnassa: zoom-sumennus, jonka pituus kasvaa reunaa kohti; keskusta jää koskematta.
// Jono Transparent-60: ilmakehä (−55/−38), Cupolan kehys ja siluetti (Overlay) piirtyvät terävinä päälle.
Shader "Matkakirja/Reunasumennus"
{
    Properties
    {
        _Voima("Voima 0…1", Float) = 0
        _Pituus("Sumennuksen pituus reunalla (osuus ruudusta)", Float) = 0.035
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-60" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareOpaqueTexture.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Voima;
                float _Pituus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 uv = GetNormalizedScreenSpaceUV(i.paikka);
                float2 d = uv - 0.5;
                float2 dk = d * float2(_ScaledScreenParams.x / _ScaledScreenParams.y, 1);
                // r = 0 keskellä, ~1 lyhyemmän sivun reunalla: vaikutus alkaa 45 %:sta.
                half reuna = smoothstep(0.45, 1.05, length(dk) * 2);
                half a = saturate(reuna * _Voima);
                clip(a - 0.004);
                float p = _Pituus * _Voima * reuna;
                half3 c = 0;
                [unroll] for (int k = 0; k < 8; k++)
                {
                    float t = (k / 7.0 - 0.5) * p * 2;
                    c += SampleSceneColor(saturate(uv + d * t)).rgb;
                }
                return half4(c / 8, a);
            }
            ENDHLSL
        }
    }
}
