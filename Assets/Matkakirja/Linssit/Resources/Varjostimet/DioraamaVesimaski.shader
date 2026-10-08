// Veneen vesimaski (omistajan palaute 8.10. (4): vesi näkyi veneen pohjan läpi). Linnanrakentajan vene.glb:n solmu "vesimaski"
// (extras vesimaski: true) on ohut laatta rungon sisällä vesirajan kohdalla. Se kirjoittaa vain syvyyden (ColorMask 0, ZWrite On)
// ennen vettä (DioraamaVesi on Geometry+10), joten veden pinta ei piirry rungon sisään; ulkopuolelta laatta on näkymätön.
// Cull Off, koska laatan kiertosuuntaa ei ole varmistettu (LR). DepthOnly-passi pitää syvyysesikierron samana.
Shader "Matkakirja/Linssit/DioraamaVesimaski"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry+5" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Vesimaski"
            Tags { "LightMode" = "UniversalForward" }
            ColorMask 0
            ZWrite On
            ZTest LEqual
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            struct Attributes { float4 positionOS : POSITION; };
            struct Varyings { float4 positionCS : SV_POSITION; };
            Varyings vert(Attributes i) { Varyings o; o.positionCS = TransformObjectToHClip(i.positionOS.xyz); return o; }
            half4 frag(Varyings i) : SV_Target { return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ColorMask R
            ZWrite On
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            struct Attributes { float4 positionOS : POSITION; };
            struct Varyings { float4 positionCS : SV_POSITION; };
            Varyings vert(Attributes i) { Varyings o; o.positionCS = TransformObjectToHClip(i.positionOS.xyz); return o; }
            half4 frag(Varyings i) : SV_Target { return 0; }
            ENDHLSL
        }
    }
}
