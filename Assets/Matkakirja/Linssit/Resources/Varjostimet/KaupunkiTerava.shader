// KAUPUNGIN TERÄVÖITYS (omistaja 6.10. 19.1x kuvanlaatulista kohta 1, Linssiseppä): kontrastimukautuva terävöitys (AMD CAS:n
// periaate) Googlen 3D-laattojen pehmeälle tekstuurille. Yksi koko ruudun passi, 5 näytettä, ei välipuskureita. Vahvuus _Terava 0–1.
// Reunoilla (suuri paikallinen kontrasti) terävöitys heikkenee itsestään, joten haloja ei synny. KaupunkiTerava.cs kytkee passin
// FullScreenPassRendererFeaturena vain kaupunkinäkymän ajaksi.
Shader "Matkakirja/Linssit/KaupunkiTerava"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" }
        ZWrite Off Cull Off ZTest Always
        Pass
        {
            Name "Terava"
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

            float _Terava;

            half3 N(float2 uv) { return SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_PointClamp, uv, 0).rgb; }

            half4 frag(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                float2 uv = i.texcoord, d = _BlitTexture_TexelSize.xy;
                half3 c = N(uv), n = N(uv + float2(0, d.y)), s = N(uv - float2(0, d.y)), e = N(uv + float2(d.x, 0)), w = N(uv - float2(d.x, 0));
                half3 mn = min(c, min(min(n, s), min(e, w))), mx = max(c, max(max(n, s), max(e, w)));
                half3 amp = sqrt(saturate(min(mn, 1.0h - mx) / max(mx, 1e-4h)));
                half3 k = amp * lerp(-0.125h, -0.2h, (half)saturate(_Terava));
                half3 r = (c + (n + s + e + w) * k) / (1.0h + 4.0h * k);
                return half4(saturate(r), 1.0h);
            }
            ENDHLSL
        }
    }
}
