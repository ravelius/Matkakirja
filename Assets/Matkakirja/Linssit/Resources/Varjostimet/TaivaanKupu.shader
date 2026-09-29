// Tähtitaivaan kupu (Linssiseppä 29.9.2026, TaivasNayttamo): kamerakeskeinen pallo sisäpuolelta. Taivas on taustaa
// (Background, ei syvyyttä): väri zeniitistä horisonttiin auringon korkeuden mukaan (Taivaslaskenta.Savy), ja auringon puolella
// hehku. Maa (_Maa = 1) on horisontin alapuolinen puolipallo, joka kirjoittaa syvyyden, jotta tähdet ja Kuu peittyvät sen alle.
// Maailman akselit ovat paikallinen horisontti: x itä, y ylös, z pohjoinen.
Shader "Matkakirja/Linssit/TaivaanKupu"
{
    Properties
    {
        _Zeniitti("Zeniitti", Color) = (0.006, 0.01, 0.03, 1)
        _Horisontti("Horisontti", Color) = (0.012, 0.016, 0.04, 1)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, -1, 0, 0)
        _Hehku("Auringon hehku", Float) = 0
        _Maa("Maa (0 = taivas, 1 = maa)", Float) = 0
        _MaanVari("Maan väri", Color) = (0.02, 0.022, 0.02, 1)
        _Kajo("Kaupungin kajo (valosaaste)", Color) = (0, 0, 0, 0)
        [Enum(Off, 0, On, 1)] _ZWrite("ZWrite", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Background" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite [_ZWrite]
            ZTest LEqual
            Cull Front

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Zeniitti, _Horisontti, _MaanVari, _Kajo;
                float4 _Aurinko;
                half _Hehku, _Maa;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 suunta : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 p = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(p);
                o.suunta = p - _WorldSpaceCameraPos;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 d = normalize(i.suunta);
                float3 a = normalize(_Aurinko.xyz);
                if (_Maa > 0.5)
                {
                    if (d.y > 0.0) discard;
                    // Maa tummuu alaspäin; horisontin kaistassa taivaan väri kuultaa usvana.
                    half usva = (half)exp(-(-d.y) * 18.0);
                    return half4(lerp(_MaanVari.rgb, _Horisontti.rgb * 0.6h, usva), 1);
                }
                float y = saturate(d.y);
                half3 c = lerp(_Horisontti.rgb, _Zeniitti.rgb, (half)pow(y, 0.45));
                // Hehku auringon puolella: vahvin horisontissa (hämärän kaari), heikko korkealla.
                float kohti = saturate(dot(normalize(float3(d.x, 0, d.z) + 1e-5), normalize(float3(a.x, 0, a.z) + 1e-5)));
                half kaari = (half)(pow(kohti, 6.0) * exp(-y * 5.0));
                half kiekko = (half)pow(saturate(dot(d, a)), 400.0);
                c += _Horisontti.rgb * kaari * _Hehku + half3(1.0, 0.95, 0.85) * kiekko * saturate(_Hehku * 4);
                // Valosaaste: kaupungin oranssi kajo horisontissa (nykyajan yö; 1873 nolla).
                c += _Kajo.rgb * (half)exp(-y * 6.0);
                return half4(c, 1);
            }
            ENDHLSL
        }
    }
}
