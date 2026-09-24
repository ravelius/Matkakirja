// Radiomasto (radiouudistus build 12, Kartta/RadioMastot.cs): kolme proseduraalista verkkoa (MastoGeometria) GPU-
// instansseina, yksi piirtokutsu kokoa kohden. Instanssin matriisi asettaa juuren, pinnan normaalin suunnan ja
// korkeuden (H, H · nousu, H). Kärkiväri (sRGB, mastot.js) valaistaan kameran valolla, ja hämärä (_radioHamara, sama
// kaava kuin tileset-varjostimessa) tummentaa maston mustahkoksi kuten havainnekuvassa. Kanavaton maa: _Peitto 0,5.
// Ristikon sauvat ovat levyjä: molemmat puolet piirretään, ja normaali käännetään katsojaan päin.
Shader "Matkakirja/Radiomasto"
{
    Properties
    {
        _BaseColor("Väri", Color) = (1, 1, 1, 1)
    }
    SubShader
    {
        // Renkaiden (Transparent-20) jälkeen ja valojen (Transparent+5) alle; laattojen syvyys peittää pallon takana.
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-10" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite On
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.core/ShaderLibrary/Color.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
            CBUFFER_END
            float _radioHamara;

            UNITY_INSTANCING_BUFFER_START(Mastot)
                UNITY_DEFINE_INSTANCED_PROP(float, _Peitto)
            UNITY_INSTANCING_BUFFER_END(Mastot)

            struct Syote
            {
                float4 paikka : POSITION;
                float3 normaali : NORMAL;
                half4 vari : COLOR;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };
            struct Vali
            {
                float4 paikka : SV_POSITION;
                float3 normaali : TEXCOORD0;
                float3 maailma : TEXCOORD1;
                half4 vari : COLOR;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            Vali vert(Syote i)
            {
                Vali o;
                UNITY_SETUP_INSTANCE_ID(i);
                UNITY_TRANSFER_INSTANCE_ID(i, o);
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.normaali = TransformObjectToWorldNormal(i.normaali);
                half4 v = i.vari;
            #if !defined(UNITY_COLORSPACE_GAMMA)
                v.rgb = SRGBToLinear(v.rgb);
            #endif
                o.vari = v;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                UNITY_SETUP_INSTANCE_ID(i);
                float3 n = normalize(i.normaali);
                float3 kohti = normalize(_WorldSpaceCameraPos - i.maailma);
                if (dot(n, kohti) < 0.0) n = -n;
                // Kameran mukana kulkeva suunnattu valo (Rakennus.LuoPallo "Valo") ja tasainen ympäristö.
                half nl = saturate(dot(n, _MainLightPosition.xyz));
                half3 vari = i.vari.rgb * _BaseColor.rgb * (0.45 + 0.8 * nl * _MainLightColor.rgb);
                vari = lerp(vari, vari * half3(0.18, 0.17, 0.24) + half3(0.006, 0.006, 0.016), (half)saturate(_radioHamara));
                return half4(vari, UNITY_ACCESS_INSTANCED_PROP(Mastot, _Peitto) * _BaseColor.a);
            }
            ENDHLSL
        }
    }
}
