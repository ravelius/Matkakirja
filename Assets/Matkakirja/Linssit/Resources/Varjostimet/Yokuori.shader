// Yökuori (ISS:n kyyti, Linssiseppä 28.9.2026; Natiiviseppä: väliaikainen linssin oma kerros, pallon terminaattoria ei ole):
// läpikuultava kuori pilvikuoren yllä, tumma yöpuolella auringon suunnan mukaan ja 6°:n hämäräkaista (aurinko −6° … +2°).
// Ulkopinta (Cull Back), ZWrite Off; piirtyy pilvien jälkeen, joten pilvetkin tummuvat yöllä.
Shader "Matkakirja/Linssit/Yokuori"
{
    Properties
    {
        _Peitto("Yön peitto", Range(0, 1)) = 0.82
        _Vari("Yön väri", Color) = (0.012, 0.02, 0.05, 1)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-40" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                half4 _Vari;
                float4 _Aurinko;
                float4 _Keskus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.maailma - _Keskus.xyz);
                // Auringon korkeus pinnalla: sin(korkeus) = n · aurinko; hämärä −6° (−0,105) … +2° (0,035).
                float s = dot(n, normalize(_Aurinko.xyz));
                half yo = 1.0h - (half)smoothstep(-0.105, 0.035, s);
                return half4(_Vari.rgb, _Peitto * yo);
            }
            ENDHLSL
        }
    }
}
