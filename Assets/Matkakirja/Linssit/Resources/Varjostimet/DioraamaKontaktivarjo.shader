// Dioraaman hahmon kontaktivarjo (omistaja 2.10.2026 20.2x: "kävelijä tarvitsee vielä varjon jalkojensa alle"). Linnan
// lattiat ovat leivottuja (DioraamaLeivottu), eivätkä ne ota vastaan reaaliaikaisia varjoja, joten jokaisen 3D-hahmon
// juuren alle piirretään pehmeä varjolevy samalla periaatteella kuin kartan symbolimallien maakontakti
// (Symbolimallit.Rakentaja PohjaVerkko: peitto keskellä, smoothstep-lasku reunalle nollaan, ei kovaa reunaa).
// Neliö (DioraamaHahmot3D.VarjoVerkko), uv −1…1; ZTest LEqual (seinät ja esineet peittävät), ZWrite pois, 15 cm
// kameraa kohti (vert) ettei levy jää lattian alle.
Shader "Matkakirja/Linssit/DioraamaKontaktivarjo"
{
    Properties
    {
        _Vari("Varjon väri", Color) = (0.06, 0.045, 0.03, 1)
        _Peitto("Peitto keskellä", Range(0, 1)) = 0.5
        [Enum(UnityEngine.Rendering.CompareFunction)] _ZTest("Syvyystesti (testikomento: Always)", Float) = 4
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
            ZTest [_ZTest]
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
                // Leivotun lattian pinta voi olla hahmon juurta muutaman sentin ylempänä (laatat, kynnykset): levy siirretään
                // näkymäavaruudessa 15 cm kameraa kohti, jolloin se piirtyy lattian päälle mutta seinät ja esineet peittävät.
                float3 nakyma = TransformWorldToView(TransformObjectToWorld(i.paikka.xyz));
                nakyma += normalize(-nakyma) * 0.15;
                o.paikka = TransformWViewToHClip(nakyma);
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
