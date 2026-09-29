// Dioraaman FOTOGRAMMETRINEN ULKOKUORI (Olavinlinna, Siirtoseppä 29.9.2026; malli Senaatti-kiinteistöt, CC BY 4.0):
// valaisematon, koska fotogrammetrian tekstuurissa on jo todellinen päivänvalo. Väri = kuva(uv0) · _Kirkkaus → sumu
// kuten muilla dioraaman pinnoilla. Molemmat puolet (glTF doubleSided: fotogrammetrian verkko on yksipuolinen
// kuori, jonka reunoista näkee sisään). SRP Batcher -yhteensopiva.
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
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
