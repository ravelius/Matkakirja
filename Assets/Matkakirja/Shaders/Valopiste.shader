// Karttavalo (webin js/karttavalot.js): aiheen värinen täplä, kolme sisäkkäistä kehää
// (r 12 / 7,4 / 3,6 px, peitto 0,14 / 0,24 / 0,42). Kärjet laajennetaan ruudulla
// vakiokokoon; pallon takapuolen valot pudotetaan pois (normaali _Keskus-pisteestä).
Shader "Matkakirja/Valopiste"
{
    Properties
    {
        _Koko("Säde (px)", Float) = 12
        _Keskus("Maan keskipiste (objekti)", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" }
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
                float _Koko;
                float4 _Keskus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 kulma : TEXCOORD0; half4 vari : COLOR; };
            struct Vali { float4 paikka : SV_POSITION; float2 kulma : TEXCOORD0; half4 vari : COLOR; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                float3 keskus = TransformObjectToWorld(_Keskus.xyz);
                float3 normaali = normalize(maailma - keskus);
                float3 kohti = normalize(_WorldSpaceCameraPos - maailma);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikka.xy += i.kulma * _Koko * 2.0 / _ScreenParams.xy * o.paikka.w;
                // Takapuoli: kärki leikkausavaruuden ulkopuolelle.
                if (dot(normaali, kohti) < 0.05) o.paikka = float4(2, 2, 2, 1);
                o.kulma = i.kulma;
                o.vari = i.vari;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.kulma);
                float w = fwidth(r);
                float k1 = 1 - smoothstep(1.0 - w, 1.0, r);
                float k2 = 1 - smoothstep(0.617 - w, 0.617, r);
                float k3 = 1 - smoothstep(0.3 - w, 0.3, r);
                float a = 1 - (1 - 0.14 * k1) * (1 - 0.24 * k2) * (1 - 0.42 * k3);
                if (a <= 0.001) discard;
                return half4(i.vari.rgb, a * i.vari.a);
            }
            ENDHLSL
        }
    }
}
