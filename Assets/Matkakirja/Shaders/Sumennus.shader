// Aloitusportin sumennus (web .start-gate backdrop-filter: blur(6px); omistajan löydös 17, build 6).
// Erotettava Gauss (σ ≈ 2,94 tekseliä, 17 tekseliä 9 bilineaarisella näytteellä) kameran
// pienennetyllä kuvalla: PalloSumennus laskee URP:n renderScalen niin, että σ tekseleinä ×
// tekselin koko ruudun pikseleinä = 6 pt. Pass 0 vaaka, pass 1 pysty (_Askel.xy = tekseliaskel
// × häivytysosuus 0–1). Blitter asettaa _BlitTexturen ja koko ruudun kolmion (Blit.hlsl Vert).
Shader "Matkakirja/Sumennus"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" }
        ZTest Always
        ZWrite Off
        Cull Off
        Blend Off

        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

        float4 _Askel;

        half4 Gauss(float2 uv, float2 suunta)
        {
            // Painot ja siirtymät: diskreetti Gauss σ = 3 (−8…8), tekseliparit yhdistetty
            // bilineaarisiksi näytteiksi (paino = parin summa, siirtymä = painotettu keskikohta).
            const float w0 = 0.13357;
            const float4 w = float4(0.23331, 0.13593, 0.05138, 0.01259);
            const float4 o = float4(1.4584, 3.4040, 5.3518, 7.3029);
            half4 s = SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_LinearClamp, uv, 0) * w0;
            [unroll] for (int i = 0; i < 4; i++)
            {
                float2 d = suunta * o[i];
                s += SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_LinearClamp, uv + d, 0) * w[i];
                s += SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_LinearClamp, uv - d, 0) * w[i];
            }
            return s;
        }
        ENDHLSL

        Pass
        {
            Name "Vaaka"
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment Vaaka
            half4 Vaaka(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                return Gauss(i.texcoord, float2(_Askel.x, 0));
            }
            ENDHLSL
        }

        Pass
        {
            Name "Pysty"
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment Pysty
            half4 Pysty(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                return Gauss(i.texcoord, float2(0, _Askel.y));
            }
            ENDHLSL
        }
    }
}
