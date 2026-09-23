// Tasaväri: täytetty polygoni yhdellä värillä (vesistölinssin järvet, web
// Globe.gl polygonCapColor). Valaisematon ja läpinäkyvä kuten reittiviiva
// (Matkakirja/Viiva): ZWrite pois, jotta viivat ja nimet piirtyvät päälle
// ilman syvyyskilpaa, ja ZTest LEqual, jotta pallo peittää takapuolen järvet.
// Cull Off: kolmioiden kiertosuunta ei ratkaise näkyvyyttä (verkko on pallon
// pinnan suuntainen, ja kiertosuunta riippuu georeferenssin kätisyydestä).
// Offset vetää täytön hieman kohti kameraa, ettei se välky maastolaattojen
// kanssa matalilla korkeuksilla.
Shader "Matkakirja/Linssit/Tasavari"
{
    Properties
    {
        _Vari("Väri", Color) = (0.231, 0.490, 0.710, 1)
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+0" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                return half4(_Vari.rgb, _Vari.a * _Peitto);
            }
            ENDHLSL
        }
    }
}
