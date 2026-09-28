// Kyydin tähdet (ISS-realismi 4c, KyydinTaivas): Yale Bright Star -tähdet ECI-suuntina, _Kierto vie maailmaan (georeferenssi
// × GMST). Jokainen tähti on neljä kärkeä samassa suunnassa: vertex levittää ne kameraan päin neliöksi (koko pikseleinä
// uv2.x, ruudun tiheyden mukaan) ja painaa syvyyden kaukotasolle, joten maa peittää tähdet eikä parallaksia ole.
// Pehmeä pyöreä piste, kirkkaus uv2.y × _Peitto (ISS varjossa 1, päivällä 0,3), väri B−V:stä (vertex-väri).
Shader "Matkakirja/Linssit/KyydinTahdet"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-60" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One One
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                float4x4 _Kierto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; float2 uv2 : TEXCOORD1; half4 vari : COLOR; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; half3 vari : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 suunta = normalize(mul((float3x3)_Kierto, i.paikka.xyz));
                float4 c = TransformWorldToHClip(_WorldSpaceCameraPos + suunta * 1.0e6);
                // Neliö ruudulla: koko pikseleinä (1× → ruudun pikselit kertoimella lyhyen sivun mukaan).
                float tiheys = max(1.0, min(_ScreenParams.x, _ScreenParams.y) / 400.0);
                float2 px = i.uv * i.uv2.x * tiheys * 1.6;
                c.xy += px * 2.0 / _ScreenParams.xy * c.w;
                #if UNITY_REVERSED_Z
                    c.z = 1.0e-6 * c.w;
                #else
                    c.z = 0.999999 * c.w;
                #endif
                o.paikka = c;
                o.uv = i.uv;
                o.vari = i.vari.rgb * (half)i.uv2.y;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half r2 = (half)dot(i.uv, i.uv);
                half piste = (half)exp(-r2 * 4.0) * (half)saturate(1.0 - r2);
                return half4(i.vari * piste * _Peitto, 0);
            }
            ENDHLSL
        }
    }
}
