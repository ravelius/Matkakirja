// Dioraaman YMPÄRISTÖN MAASTO JA HORISONTTI (Olavinlinna, Siirtoseppä 1.10.2026; Linnanrakentajan aineisto MML CC BY 4.0).
// Valaisematon kuten fotogrammetrinen kuori: ortokuvassa on jo päivänvalo. Väri = kuva(uv0) · _Kirkkaus → ilmaperspektiivi
// (kaukana sinertävä usva _DioraamaSumuVari) → dioraaman sumu. Veden alle jäävä osa (y < _VesiY) ei näy, koska järvi peittää.
Shader "Matkakirja/Linssit/DioraamaMaasto"
{
    Properties
    {
        _Kuva ("Ortokuva", 2D) = "grey" {}
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
            Cull Back

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
            struct Vali { float4 paikkaH : SV_POSITION; float2 uv : TEXCOORD0; float3 paikkaW : TEXCOORD1; };

            Vali vert(Syote v)
            {
                Vali o;
                o.paikkaW = TransformObjectToWorld(v.paikka.xyz);
                o.paikkaH = TransformWorldToHClip(o.paikkaW);
                o.uv = v.uv;
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
