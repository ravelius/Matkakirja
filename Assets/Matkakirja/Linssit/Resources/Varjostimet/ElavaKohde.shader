// ELÄVÄN KAUPUNGIN KOHTEET (Linssiseppä 8.10.2026; suunnitelma B1 + B2): veneet ja lokit kaupunkikameralla. Väri kärjistä (sRGB-tavut
// → lineaarinen), valo samasta Ydin KoriValaistuksesta kuin pallon korissa mutta maailma-avaruudessa (ElavaKaupunki asettaa
// globaalit joka kehys): auringon suunta ja väri, taivaan ylä- ja alaosan ambient. Kaupunkikameran jälkikäsittely (valotus ja
// suodin) tulee kameralta, sumu MixFogilla. Ei varjoja (Googlen laatoissa ei ole reaaliaikaisia varjoja).
Shader "Matkakirja/Linssit/ElavaKohde"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        float4 _ElavaAurinko, _ElavaAurinkoVari, _ElavaTaivasYla, _ElavaTaivasAla;
        ENDHLSL
        Pass
        {
            Name "ElavaKohde"
            Tags { "LightMode" = "UniversalForward" }
            Cull Back
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #pragma multi_compile_instancing
            struct A { float4 p : POSITION; float3 n : NORMAL; half4 c : COLOR; UNITY_VERTEX_INPUT_INSTANCE_ID };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; half3 c : TEXCOORD1; float sumu : TEXCOORD2; };
            V vert(A a)
            {
                UNITY_SETUP_INSTANCE_ID(a);
                V v; float3 w = TransformObjectToWorld(a.p.xyz);
                v.p = TransformWorldToHClip(w); v.n = TransformObjectToWorldNormal(a.n);
                v.c = pow(a.c.rgb, 2.2h); v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half4 frag(V v) : SV_Target
            {
                float3 n = normalize(v.n), l = normalize(_ElavaAurinko.xyz);
                half kaari = (half)saturate((dot(n, l) + 0.25) / 1.25);
                half3 amb = lerp((half3)_ElavaTaivasAla.rgb, (half3)_ElavaTaivasYla.rgb, (half)(n.y * 0.5 + 0.5));
                half3 c = v.c * (amb + (half3)_ElavaAurinkoVari.rgb * kaari);
                return half4(MixFog(c, v.sumu), 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On
            ColorMask R
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            struct A { float4 p : POSITION; UNITY_VERTEX_INPUT_INSTANCE_ID };
            float4 vert(A a) : SV_POSITION { UNITY_SETUP_INSTANCE_ID(a); return TransformObjectToHClip(a.p.xyz); }
            half frag() : SV_Target { return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthNormals"
            Tags { "LightMode" = "DepthNormals" }
            Cull Back
            ZWrite On
            // URP:n DepthNormals-esipassi (Ultra-renderöijän SSAO, lähde DepthNormals) tuottaa kameran syvyystekstuurin: ilman tätä passia
            // kohde puuttuu _CameraDepthTexturesta (9.10. simu: yövalot ja muotokorostus näkivät tyhjän syvyyden).
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            struct A { float4 p : POSITION; float3 n : NORMAL; UNITY_VERTEX_INPUT_INSTANCE_ID };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; };
            V vert(A a) { UNITY_SETUP_INSTANCE_ID(a); V v; v.p = TransformObjectToHClip(a.p.xyz); v.n = TransformObjectToWorldNormal(a.n); return v; }
            half4 frag(V v) : SV_Target { return half4(normalize(v.n), 0.0); }
            ENDHLSL
        }
    }
}
