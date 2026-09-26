// Elävä kerros (Kartta/ElavaKerros.cs, omistajan linjaus 26.9.2026 klo 10.0x, löydös 161 B): kartta piirretään kerran,
// ja vain animoidut kohteet (Unity-layer "Elava") piirretään 30 fps:llä talletettua väriä ja syvyyttä vasten.
// Pass 0 SyvyysKopio: pääkameran syvyys (AfterRenderingTransparents) R32-väritekstuuriin, jota voi näytteistää.
// Pass 1 Pohja: ElavaKameran alussa (BeforeRenderingOpaques) talletettu väri kohteeseen ja syvyys SV_Depthinä, jolloin
// Elava-kohteet testaavat syvyyttä kuten täydessä piirrossa. Molemmat Blitterin kokoruudun kolmiolla (_BlitScaleBias).
Shader "Hidden/Matkakirja/ElavaKerros"
{
    SubShader
    {
        Tags { "RenderPipeline" = "UniversalPipeline" }
        ZTest Always
        Cull Off

        Pass
        {
            Name "SyvyysKopio"
            ZWrite Off
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment Frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

            float4 Frag(Varyings i) : SV_Target
            {
                float d = SAMPLE_TEXTURE2D_X(_BlitTexture, sampler_PointClamp, i.texcoord).r;
                return float4(d, 0, 0, 1);
            }
            ENDHLSL
        }

        Pass
        {
            Name "Pohja"
            ZWrite On
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment Frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

            TEXTURE2D(_ElavaSyvyys);

            struct Ulos { half4 vari : SV_Target; float syvyys : SV_Depth; };

            Ulos Frag(Varyings i)
            {
                Ulos o;
                o.vari = SAMPLE_TEXTURE2D_X(_BlitTexture, sampler_PointClamp, i.texcoord);
                o.syvyys = SAMPLE_TEXTURE2D(_ElavaSyvyys, sampler_PointClamp, i.texcoord).r;
                return o;
            }
            ENDHLSL
        }
    }
}
