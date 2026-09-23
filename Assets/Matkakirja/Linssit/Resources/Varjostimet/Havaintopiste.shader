// Astronautin kameran havaintopiste (css/satelliitti.css): sädekehä 28 pt ja
// ydin 5 pt samassa neliössä. Neliön koko on sädekehän koko; r = 0 keskellä ja 1
// reunalla. Liukuvärit ovat webin pysäkit sellaisinaan (circle closest-side):
//   sädekehä rgba(93,255,168) 0,26 @0 → 0,13 @0,38 → 0,05 @0,66 → 0 @1
//   ydin (säde 5/28) #eafff3 @0 → #5dffa8 @0,55 → alfa 0,6 @0,8 → 0 @1
// Sädekehä sekoitetaan kuin mix-blend-mode: screen (One OneMinusSrcColor), eli
// se kirkastaa karttaa peittämättä sitä. _Vari korvaa vihreän (ISS-merkki: valkoinen).
Shader "Matkakirja/Linssit/Havaintopiste"
{
    Properties
    {
        _Vari("Kehä", Color) = (0.365, 1, 0.659, 1)
        _Ydinvalo("Ydin", Color) = (0.918, 1, 0.953, 1)
        _YtimenOsuus("Ytimen säde / kehän säde", Float) = 0.1786
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+2" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcColor
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Ydinvalo;
                float _YtimenOsuus;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv * 2.0 - 1.0;
                return o;
            }

            // Paloittain lineaarinen liukuväri neljällä pysäkillä.
            half Liuku4(float r, float4 kohdat, float4 arvot)
            {
                if (r <= kohdat.y) return lerp(arvot.x, arvot.y, saturate((r - kohdat.x) / (kohdat.y - kohdat.x)));
                if (r <= kohdat.z) return lerp(arvot.y, arvot.z, saturate((r - kohdat.y) / (kohdat.z - kohdat.y)));
                return lerp(arvot.z, arvot.w, saturate((r - kohdat.z) / (kohdat.w - kohdat.z)));
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                clip(1.0 - r);
                half kehaA = Liuku4(r, float4(0, 0.38, 0.66, 1), float4(0.26, 0.13, 0.05, 0));
                half3 vari = _Vari.rgb * kehaA;
                float ry = r / _YtimenOsuus;
                if (ry < 1.0)
                {
                    half3 ydin = ry < 0.55 ? lerp(_Ydinvalo.rgb, _Vari.rgb, ry / 0.55) : _Vari.rgb;
                    half ydinA = ry < 0.55 ? 1.0 : Liuku4(ry, float4(0.55, 0.8, 0.9, 1), float4(1, 0.6, 0.3, 0));
                    vari = lerp(vari, ydin, ydinA);
                }
                return half4(vari * _Peitto, 1);
            }
            ENDHLSL
        }
    }
}
