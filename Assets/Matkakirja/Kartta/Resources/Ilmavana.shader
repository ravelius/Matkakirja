// Ilmavana ja linnut (aloituslento v3e, omistaja 28.9.2026 Fablen kautta; Natiiviseppä): kameraan päin käännetty nauha tai
// läiskä, jonka CPU rakentaa joka kehys (AloituslennonIlma). Poikkiprofiili on gaussinen (ydin + halo) kuten Linssisepän
// Pehmeapisteessä; väri ja peitto kärjessä, horisonttiusva kuten muissa päällyskerroksissa. ZTest materiaalista: vanat LEqual
// (kone ja maasto peittävät, vana ei piirry koneen päälle), linnut Always (kameran ja maan välissä).
Shader "Matkakirja/Kartta/Ilmavana"
{
    Properties
    {
        _Ydin("Ytimen terävyys", Float) = 3
        _Halo("Halon osuus", Range(0, 1)) = 0.3
        [Enum(UnityEngine.Rendering.CompareFunction)] _ZTest("ZTest", Float) = 4
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+13" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest [_ZTest]
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Ydin;
                half _Halo;
                float _ZTest;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; half4 vari : COLOR; float2 kulma : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; half4 vari : COLOR; float2 kulma : TEXCOORD0; float usvaY : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.vari = i.vari;
                o.kulma = i.kulma;
                o.usvaY = UsvaYlhaalta(o.paikka);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r2 = dot(i.kulma, i.kulma);
                float muoto = exp(-r2 * _Ydin) + _Halo * exp(-r2 * 1.3);
                muoto *= saturate((1 - r2) * 4) * UsvaNakyvyys(i.usvaY);
                return half4(i.vari.rgb, i.vari.a * saturate(muoto));
            }
            ENDHLSL
        }
    }
}
