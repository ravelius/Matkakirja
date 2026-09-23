// Aluerajat vektoriviivoina (maakunnat, B17): nauha, jonka paksuus on vakio ruutupisteinä
// tunnuskartan tarkkuudesta riippumatta. Kärjissä oma paikka ja janan toinen pää (TEXCOORD0),
// puoli ±1 (TEXCOORD1.x). Piirtyy maaston päälle (ZTest Always) kuten täyttökuori; pallon
// takapuolen janat piilotetaan maan keskipisteestä (_Keskus, maailma).
Shader "Matkakirja/Rajaviiva"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.23, 0.18, 0.13, 0.8)
        _Paksuus("Paksuus (ruutupistettä)", Float) = 1.2
        _Kerroin("Pikseliä pisteelle", Float) = 3
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-8" "RenderPipeline" = "UniversalPipeline" }
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

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _Paksuus;
                float _Kerroin;
                float4 _Keskus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 toinen : TEXCOORD0; float2 puoli : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; float reuna : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                float4 a = TransformWorldToHClip(maailma);
                float4 b = TransformObjectToHClip(i.toinen);
                float2 ruutu = _ScreenParams.xy;
                float2 suunta = b.xy / b.w * ruutu - a.xy / a.w * ruutu;
                float l = length(suunta);
                suunta = l > 1e-4 ? suunta / l : float2(1, 0);
                float2 normaali = float2(-suunta.y, suunta.x);
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                a.xy += normaali * i.puoli.x * px * 2.0 / ruutu * a.w;
                // Pallon takapuoli pois (sama raja kuin Nappula-varjostimessa).
                float3 ylos = normalize(maailma - _Keskus.xyz);
                float3 kohti = normalize(_WorldSpaceCameraPos - maailma);
                if (dot(ylos, kohti) < 0.02) a = float4(2, 2, 2, 1);
                o.paikka = a;
                o.reuna = i.puoli.x * px;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                half alfa = _BaseColor.a * saturate(px - abs(i.reuna));
                return half4(_BaseColor.rgb, alfa);
            }
            ENDHLSL
        }
    }
}
