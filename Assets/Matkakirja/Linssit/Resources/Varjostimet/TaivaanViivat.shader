// Tähtikuvioiden viivat (Linssiseppä 29.9.2026, TaivasNayttamo erä 3): kärjet ovat ECI-suuntia, ja sarakekierto _KiertoX/Y/Z
// (kuten KyydinTahdet) vie ne horisonttiin. Kaukotasolla, joten maa (TaivaanKupu, syvyys) peittää horisontin alle menevät.
Shader "Matkakirja/Linssit/TaivaanViivat"
{
    Properties
    {
        _Vari("Väri", Color) = (0.55, 0.68, 0.9, 1)
        _Peitto("Peitto", Range(0, 1)) = 0.35
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half _Peitto;
                float4 _KiertoX, _KiertoY, _KiertoZ;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 suunta = normalize(_KiertoX.xyz * i.paikka.x + _KiertoY.xyz * i.paikka.y + _KiertoZ.xyz * i.paikka.z);
                float4 c = TransformWorldToHClip(_WorldSpaceCameraPos + suunta * 1.0e6);
                #if UNITY_REVERSED_Z
                    c.z = 1.0e-6 * c.w;
                #else
                    c.z = 0.999999 * c.w;
                #endif
                o.paikka = c;
                return o;
            }

            half4 frag(Vali i) : SV_Target { return half4(_Vari.rgb, _Vari.a * _Peitto); }
            ENDHLSL
        }
    }
}
