// Karttataivas (Kartta/Karttataivas.cs, omistajan löydös 154, build 20): kallistetun kartan "taivas" eli horisonttiusvan
// yläpuoli sinertää ylöspäin — pergamentti usvan rajalla, utuinen vaaleansininen ruudun yläreunassa. Natiivin sumu
// maalaa usvan rajan yläpuolen täyteen kermaan (Aurinko, Horisonttiusva.Sumu), joten tämä on ruudun tason liukuväri
// sen päälle: peitto 0 rajalla (Horisonttiusva.RuutuRajaY), _Voima yläreunassa, käyrä pow(t, _Kaari).
// Resources-kansiossa, koska materiaali luodaan ajossa (Resources.Load), kuten Lippuaalto.
//
// KOKORUUTU: nelikulmion kärjet ovat valmiiksi leikkausavaruudessa (−1…1), joten kameran siirto ja Cesiumin mittakaava
// eivät vaikuta; _ProjectionParams.x kääntää y:n, kun URP piirtää välitekstuuriin. ZTest Always, ZWrite Off.
Shader "Matkakirja/Karttataivas"
{
    Properties
    {
        _Vari("Taivaan sävy (sRGB)", Color) = (0.72, 0.82, 0.91, 1)
        _Raja("Usvan raja, osuus ylhäältä", Float) = 0.25
        _Voima("Peitto yläreunassa", Float) = 0.85
        _Kaari("Käyrän eksponentti", Float) = 0.8
    }
    SubShader
    {
        Tags { "Queue" = "Transparent+50" "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Karttataivas"
            ZTest Always
            ZWrite Off
            Cull Off
            Blend SrcAlpha OneMinusSrcAlpha

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                float _Raja;
                float _Voima;
                float _Kaari;
            CBUFFER_END

            struct Tulo { float4 positionOS : POSITION; };
            struct Valissa { float4 positionCS : SV_POSITION; float ylhaalta : TEXCOORD0; };

            Valissa vert(Tulo i)
            {
                Valissa o;
                o.positionCS = float4(i.positionOS.x, i.positionOS.y * _ProjectionParams.x, UNITY_NEAR_CLIP_VALUE, 1.0);
                o.ylhaalta = 0.5 - 0.5 * i.positionOS.y;   // 0 yläreunassa, 1 alareunassa
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                float t = saturate((_Raja - i.ylhaalta) / max(_Raja, 1e-3));
                return half4(_Vari.rgb, _Voima * pow(t, _Kaari));
            }
            ENDHLSL
        }
    }
}
