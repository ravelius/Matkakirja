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
        _VarjoVari("Lattian kerroin keskellä (RGB; alfaa ei käytetä)", Color) = (0.63, 0.6, 0.58, 1)
        _VarjoVeto("Siirto kameraa kohti (m)", Float) = 0.4
        [Enum(UnityEngine.Rendering.BlendMode)] _Lahde("Sekoitus: lähde", Float) = 2
        [Enum(UnityEngine.Rendering.BlendMode)] _Kohde("Sekoitus: kohde", Float) = 0
        [Enum(UnityEngine.Rendering.CompareFunction)] _ZTest("Syvyystesti (testikomento: Always)", Float) = 4
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            // Kertova sekoitus (klassinen kontaktivarjo): lattia × lerp(1, väri, peitto), lähtöalfa aina 1 ja kuvan alfa
            // ennallaan. Savukkeet 21.03–21.20: alfasekoituksella levy ei piirtynyt lainkaan, kun lähtöalfa < 1 (peitto 1
            // näkyi, 0,6–0,7 ei muuttanut pikseleitä).
            Blend [_Lahde] [_Kohde], Zero One
            ZWrite Off
            ZTest [_ZTest]
            Cull Off
            Offset -1, -1

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                // float (ei half): Metalilla half-kenttä vakiopuskurissa luki peiton väärin (savuke 21.03: peitto 1 näkyi,
                // 0,7 ei lainkaan); nimet omat, ettei globaali _Vari/_Peitto sekoitu.
                float4 _VarjoVari;
                float _VarjoVeto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                // Näkyvä lattia voi olla hahmon juurta ylempänä (laatat, kynnykset, ulkokuoren muurinharja; savuke 20.42: levy
                // piirtyi vain syvyystesti pois): levy siirretään näkymäavaruudessa _Veto metriä kameraa kohti, jolloin se
                // piirtyy lattian päälle mutta seinät ja esineet peittävät sen yhä.
                float3 nakyma = TransformWorldToView(TransformObjectToWorld(i.paikka.xyz));
                nakyma += normalize(-nakyma) * _VarjoVeto;
                o.paikka = TransformWViewToHClip(nakyma);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                // Tasainen ydin jalkojen alla (r < 0,35) ja pehmeä smoothstep-lasku reunalle (kartan maakontaktin renkaat).
                // Vahvuus RGB:stä, ei alfasta (savuke 21.38: alfa 1 näkyi, 0,6–0,9 ei lainkaan, myös ilman syvyystestiä).
                float a = 1.0 - smoothstep(0.35, 1.0, r);
                // Kertova (DstColor Zero): kerroin lerp(1, väri, a). Alfasekoitus (testi): väri, alfa = väri.a × a.
                return half4((half3)lerp(float3(1.0, 1.0, 1.0), _VarjoVari.rgb, a), (half)(_VarjoVari.a * a));
            }
            ENDHLSL
        }
    }
}
