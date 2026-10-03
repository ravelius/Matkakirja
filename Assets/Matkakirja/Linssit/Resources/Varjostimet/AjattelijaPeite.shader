// AJATTELIJAN PEITE (Linssiseppä 2, 2.10.2026): webin CSS-kerrokset (pystyvinjetti ja lähderivin liukuväri) TAUSTAN
// pikseleille koko ruudun kolmiona kaukotasolla (syvyystesti: bysti peittää, sen pikselit hoitaa AjattelijaKipsi samalla
// AjattelijaPeite.hlsl-laskulla). Tausta on yksivärinen (_PeiteTausta, sRGB), joten tulos lasketaan sRGB:nä täsmälleen kuten
// CSS ja kirjoitetaan läpinäkymättömänä (alfa 1; 3.10.2026 korjaus: aiempi alfasekoitus jätti kuvaan alfan < 1).
Shader "Hidden/Matkakirja/AjattelijaPeite"
{
    SubShader
    {
        Tags { "RenderPipeline" = "UniversalPipeline" "Queue" = "Overlay" "RenderType" = "Opaque" }
        Pass
        {
            Tags { "LightMode" = "SRPDefaultUnlit" }
            Cull Off
            ZWrite Off
            ZTest LEqual
            Blend Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "AjattelijaPeite.hlsl"
            float4 _PeiteTausta;    // taustan väri (sRGB rgb): kameran tyhjennysväri (prologissa musta)
            struct Tulo { float4 paikka : POSITION; };
            struct Ulos { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };
            Ulos vert(Tulo t)
            {
                Ulos o;
                // Kaukotasolla: piirtyy vain sinne, mihin bysti ei kirjoittanut syvyyttä (tyhjennetty = kauko).
                o.paikka = float4(t.paikka.xy, UNITY_RAW_FAR_CLIP_VALUE, 1.0);
                o.uv = PeiteUv(o.paikka);
                return o;
            }
            float4 frag(Ulos i) : SV_Target
            {
                return float4(PeiteLineaariseksi(PeiteSrgbVariin(_PeiteTausta.rgb, i.uv)), 1.0);
            }
            ENDHLSL
        }
    }
}
