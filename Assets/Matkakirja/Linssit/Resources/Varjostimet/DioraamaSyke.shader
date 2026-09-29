// Dioraaman SYKKIVÄ VIHJE (elävä linna, käsikirjoitus 29.9. kohta 2: "ensimmäisellä käynnillä yksi kohde sykkii
// hienovaraisesti, eikä tekstiopastusta tarvita"; Siirtoseppä): kameraan päin kääntyvä rengas elävän kohteen kohdalla.
// Additiivinen, lämmin; rengas laajenee ja himmenee 1,6 s:n syklissä, toinen rengas puolen syklin välein.
// _Peitto 0…1 (häivytys sisään/ulos), _Koko metreinä, _Aika dioraaman aika.
Shader "Matkakirja/Linssit/DioraamaSyke"
{
    Properties
    {
        _Vari ("Väri", Color) = (1, 0.78, 0.45, 1)
        _Koko ("Koko (m)", Float) = 6
        _Peitto ("Peitto", Float) = 1
        _Aika ("Aika (s)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+10" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite Off
            ZTest Always
            Cull Off
            Blend One One

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                float _Koko, _Peitto, _Aika;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 kulma : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 kulma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 nakyma = TransformWorldToView(TransformObjectToWorld(float3(0, 0, 0)));
                nakyma.xy += i.kulma * _Koko * 0.5;
                o.paikka = TransformWViewToHClip(nakyma);
                o.kulma = i.kulma;
                return o;
            }

            half Rengas(float r, float vaihe)
            {
                float f = frac(_Aika / 1.6 + vaihe);
                float sade = 0.25 + 0.7 * f;
                float leveys = 0.06 + 0.05 * f;
                return (half)(saturate(1.0 - abs(r - sade) / leveys) * (1.0 - f) * (1.0 - f));
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.kulma);
                half a = (Rengas(r, 0.0) + Rengas(r, 0.5)) * 0.55h + (half)(saturate(1.0 - r / 0.22) * 0.25);
                return half4(_Vari.rgb * a * (half)_Peitto, 1);
            }
            ENDHLSL
        }
    }
}
