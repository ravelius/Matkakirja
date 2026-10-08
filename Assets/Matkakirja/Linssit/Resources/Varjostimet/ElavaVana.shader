// VENEIDEN VANA (Linssiseppä 8.10.2026; suunnitelma B1): läpikuultava vaahto veden pinnalla (ElavaKaupunki: vanan verkko veneen
// perässä). Alfa kärjistä (häipyy taaksepäin), valo taivaan yläosasta ja auringosta kuten ElavaKohde; ei syvyyskirjoitusta.
Shader "Matkakirja/Linssit/ElavaVana"
{
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent-10" }
        Pass
        {
            Name "ElavaVana"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            float4 _ElavaAurinko, _ElavaAurinkoVari, _ElavaTaivasYla;
            struct A { float4 p : POSITION; half4 c : COLOR; };
            struct V { float4 p : SV_POSITION; half4 c : COLOR; float sumu : TEXCOORD0; };
            V vert(A a)
            {
                V v; v.p = TransformObjectToHClip(a.p.xyz); v.c = a.c; v.c.rgb = pow(v.c.rgb, 2.2h);
                v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                half3 valo = (half3)_ElavaTaivasYla.rgb + (half3)_ElavaAurinkoVari.rgb * (half)saturate(_ElavaAurinko.y);
                return half4(MixFog(v.c.rgb * valo, v.sumu), v.c.a);
            }
            ENDHLSL
        }
    }
}
