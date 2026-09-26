// Pehmeä piste (elävä kartta, Isoisän muste 26.9.2026): kameraan päin käännetty neliö, jonka CPU rakentaa joka kehys
// (ElavaKartta: laivan savu ja käytyjen kaupunkien yövalot). Muoto on gaussinen läiskä (ydin + halo), väri ja peitto
// kärjessä. Sekoitus materiaalista: savu tavallisena läpinäkyvänä (SrcAlpha, OneMinusSrcAlpha), valot lisäävinä (One, One).
Shader "Matkakirja/Linssit/Pehmeapiste"
{
    Properties
    {
        [Enum(UnityEngine.Rendering.BlendMode)] _Lahde("Lähde", Float) = 5
        [Enum(UnityEngine.Rendering.BlendMode)] _Kohde("Kohde", Float) = 10
        _Ydin("Ytimen terävyys", Float) = 4
        _Halo("Halon osuus", Range(0, 1)) = 0.35
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+14" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend [_Lahde] [_Kohde]
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Lahde;
                float _Kohde;
                float _Ydin;
                half _Halo;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; half4 vari : COLOR; float2 kulma : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; half4 vari : COLOR; float2 kulma : TEXCOORD0; float usvaY : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.vari = i.vari;
                o.kulma = i.kulma;
                o.usvaY = UsvaYlhaalta(o.paikka);   // horisonttiusva (löydös 159)
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r2 = dot(i.kulma, i.kulma);
                float muoto = exp(-r2 * _Ydin) + _Halo * exp(-r2 * 1.3);
                muoto *= saturate((1 - r2) * 4) * UsvaNakyvyys(i.usvaY);
                // Lisäävä sekoitus (One, One): väri esikerrottuna; läpinäkyvä: alfa kantaa muodon.
                bool lisaava = _Kohde < 1.5;
                return lisaava ? half4(i.vari.rgb * i.vari.a * muoto, 0) : half4(i.vari.rgb, i.vari.a * saturate(muoto));
            }
            ENDHLSL
        }
    }
}
