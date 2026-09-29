// ISS:n merkki ja kertasyke Astronautin kamerassa (web ISS_PIIRROS_SVG ja .astro-iss-syke; Linssiseppä 29.9.2026): tekstuuri
// (IssPiirros.Rasteroi / Rengas) ruudun suuntaisella neliöllä, ei valaistusta, aina muiden linssipisteiden päällä kuten webin DOM.
Shader "Matkakirja/Linssit/IssMerkki"
{
    Properties
    {
        _MainTex("Piirros", 2D) = "white" {}
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+14" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Valissa { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Valissa vert(Syote i)
            {
                Valissa o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                c.a *= _Peitto;
                return c;
            }
            ENDHLSL
        }
    }
}
