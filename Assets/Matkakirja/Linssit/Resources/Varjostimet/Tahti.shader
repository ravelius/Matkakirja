// Tähti: pyöreä, pehmeäreunainen piste, joka kääntyy aina kameraan päin
// (web js/pallolauta/tahdet.js pyoristaPiste: discard r > 0,5, alfa
// smoothstep(0,5, 0,18, r), additiivinen sekoitus kuten three.js AdditiveBlending).
//
// Kärki: POSITION = tähden keskipiste (objektin koordinaatit), UV = kulma 0…1,
// UV2.x = leveys objektin yksiköissä. Kulma levitetään näkymäavaruudessa, joten
// neliö on aina kohtisuorassa katsesuuntaan. Syvyystesti päällä, kirjoitus pois:
// maapallo peittää takanaan olevat tähdet.
//
// Linssit/Resources-kansiossa, jotta Resources.Load löytää sen käännöksessä
// (Shader.Find voi karsiutua).
Shader "Matkakirja/Linssit/Tahti"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-100" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha One
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; float2 koko : TEXCOORD1; half4 vari : COLOR; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; half4 vari : COLOR; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 keskusWS = TransformObjectToWorld(i.paikka.xyz);
                float3 keskusVS = TransformWorldToView(keskusWS);
                // Objektin mittakaava maailmassa (tähtiolio voi olla skaalattu georeferenssin alla).
                float mittakaava = length(float3(UNITY_MATRIX_M[0].x, UNITY_MATRIX_M[1].x, UNITY_MATRIX_M[2].x));
                float2 kulma = (i.uv - 0.5) * i.koko.x * mittakaava;
                o.paikka = TransformWViewToHClip(keskusVS + float3(kulma, 0));
                o.uv = i.uv - 0.5;
                o.vari = i.vari;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float r = length(i.uv);
                clip(0.5 - r);
                half a = smoothstep(0.5, 0.18, r) * _Peitto * i.vari.a;
                return half4(i.vari.rgb, a);
            }
            ENDHLSL
        }
    }
}
