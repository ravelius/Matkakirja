// FYSIKAALINEN TAIVAS (Linssiseppä 2, 8.10.2026; PT: pallon maisema Unreal-tasolle, kohta 1): KaupunkiKuvan kupoli Karttasepän
// sironta-LUTilla (UE SkyViewLut, korkeustasot 0,5/1,5/3 km, aurinko 0–100° zeniitistä) + auringon kiekko läpäisyllä, valotus ja sävytys
// 1 − e^(−x). Horisontin alapuoli (maa) LUTin omasta alaosasta. _IlmParam.w = voima (A/B ja häivytys vanhaan kupoliin, KaupunkiIlmakeha).
Shader "Matkakirja/Linssit/IlmakehaTaivas"
{
    Properties { }
    SubShader
    {
        Tags { "RenderType" = "Background" "Queue" = "Background" "RenderPipeline" = "UniversalPipeline" "PreviewType" = "Skybox" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite Off
            ZTest LEqual
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Ilmakeha.hlsl"
            half4 _TaivasHorisontti, _TaivasLaki;   // vanha kupoli (DioraamaTaivas) häivytykseen, KaupunkiKuva asettaa
            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikkaH : SV_POSITION; float3 suunta : TEXCOORD0; };
            Vali vert(Syote v)
            {
                Vali o; float3 w = TransformObjectToWorld(v.paikka.xyz);
                o.paikkaH = TransformWorldToHClip(w); o.suunta = w - _WorldSpaceCameraPos; return o;
            }
            half4 frag(Vali i) : SV_Target
            {
                float3 d = normalize(i.suunta);
                float3 L = IlmTaivas(d);
                // Auringon kiekko (0,27° säde, reuna pehmeä) ja läpäisy kameran korkeudelta; kirkkaus rajattu, ettei sävytys palaa puhki.
                float cs = dot(d, _IlmAurinko.xyz);
                float kiekko = smoothstep(0.99996, 0.99999, cs) * step(0.0, _IlmAurinko.y + 0.02);
                L += kiekko * IlmLapaisy(_IlmParam.x, _IlmAurinko.y) * 40.0;
                float3 c = IlmSavytys(L * _IlmParam.y);
                half3 vanha = lerp(_TaivasHorisontti.rgb, _TaivasLaki.rgb, (half)saturate(d.y * 2.0));
                return half4(lerp(vanha, (half3)c, (half)_IlmParam.w), 1);
            }
            ENDHLSL
        }
    }
}
