// Dioraaman hahmon kontaktivarjo (omistaja 2.10.2026 20.2x: "kävelijä tarvitsee vielä varjon jalkojensa alle"). Linnan
// lattiat ovat leivottuja (DioraamaLeivottu), eivätkä ne ota vastaan reaaliaikaisia varjoja, joten jokaisen 3D-hahmon
// juuren alle piirretään pehmeä varjolevy samalla periaatteella kuin kartan symbolimallien maakontakti
// (Symbolimallit.Rakentaja PohjaVerkko: peitto keskellä, smoothstep-lasku reunalle nollaan, ei kovaa reunaa).
// Neliö (DioraamaHahmot3D.VarjoVerkko), uv −1…1; ZTest LEqual (seinät ja esineet peittävät), ZWrite pois, Offset kohti
// kameraa ettei levy välky lattian kanssa.
Shader "Matkakirja/Linssit/DioraamaKontaktivarjo"
{
    Properties
    {
        _Vari("Varjon väri", Color) = (0.06, 0.045, 0.03, 1)
        _Peitto("Peitto keskellä", Range(0, 1)) = 0.5
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-10" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Off
            Offset -1, -1

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half r = (half)length(i.uv);
                half a = _Peitto * (1.0h - smoothstep(0.0h, 1.0h, r));
                return half4(_Vari.rgb, a * a / max(_Peitto, 0.001h));
            }
            ENDHLSL
        }
    }
}
