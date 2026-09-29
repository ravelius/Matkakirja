// Dioraaman hahmo (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): paikkamerkkiatlaksen quad
// (DioraamaHahmot.cs, sylinteribillboard). Alpha-cutout 0,5, ei tarvitse lämpökentän kerrointa (vain _Vari-sävy,
// oletus 1 = ei sävyä); sama etäisyyssumu kuin DioraamaMaalattu.shader, jotta hahmot sulautuvat samaan näkymään.
// SRP Batcher -yhteensopiva: tekstuuri ja näyte CBUFFERin ulkopuolella (Cupola.shader-malli).
Shader "Matkakirja/Linssit/DioraamaHahmo"
{
    Properties
    {
        _MainTex("Atlas (RGBA)", 2D) = "gray" {}
        _Vari("Sävy", Color) = (1, 1, 1, 1)
    }
    SubShader
    {
        Tags { "RenderType" = "TransparentCutout" "Queue" = "AlphaTest" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);

            // Globaalit (DioraamaNayttamo.cs): sama sumu kuin dioraaman pinnoilla.
            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu; // x = alku (m), y = loppu (m)

            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                half4 _Vari;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 paikkaW : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.uv = i.uv * _MainTex_ST.xy + _MainTex_ST.zw;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 tex = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                clip(tex.a - 0.5);
                half3 vari = tex.rgb * _Vari.rgb;
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                vari = lerp(vari, _DioraamaSumuVari.rgb, sumu);
                return half4(vari, 1);
            }
            ENDHLSL
        }
    }
}
