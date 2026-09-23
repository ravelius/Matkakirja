// Pelinappula (webin js/pallolauta/merkit.js nappulaElementti): kuva ruudun
// vakiokokoisena, jalka pisteessä. Kärjet ovat objektin origossa ja laajenevat
// ruudulla kulmien (TEXCOORD0) mukaan; pallon takapuolella nappula piilotetaan.
Shader "Matkakirja/Nappula"
{
    Properties
    {
        _MainTex("Kuva", 2D) = "white" {}
        _Koko("Korkeus (px)", Float) = 36
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+20" "RenderPipeline" = "UniversalPipeline" }
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

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float _Koko;
                float4 _Keskus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 kulma : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(float3(0, 0, 0));
                float3 normaali = normalize(maailma - _Keskus.xyz);
                float3 kohti = normalize(_WorldSpaceCameraPos - maailma);
                o.paikka = TransformWorldToHClip(maailma);
                // Leveys = 32/36 korkeudesta (webin svg 32×36), jalka pisteessä.
                float2 koko = float2(_Koko * 32.0 / 36.0, _Koko);
                float2 siirto = float2(i.kulma.x * 0.5, i.kulma.y) * koko;
                o.paikka.xy += siirto * 2.0 / _ScreenParams.xy * o.paikka.w;
                if (dot(normaali, kohti) < 0.02) o.paikka = float4(2, 2, 2, 1);
                o.uv = float2(i.kulma.x * 0.5 + 0.5, i.kulma.y);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                if (c.a <= 0.01) discard;
                return c;
            }
            ENDHLSL
        }
    }
}
