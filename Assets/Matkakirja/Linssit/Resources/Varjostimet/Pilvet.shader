// Pilvikuori (web js/linssit/astro-sumu.js): tasavälinen pilvikuva pallokuoren
// pinnalla, alfa valmiiksi laskettu (Pilvikuva.Alfa), peitto kameran korkeudesta.
// Ulkopinta näkyy (Cull Back), joten kuoren takapuoli ei piirry pallon eteen.
// IHMISEN MATKA II (sumu, erä 3): sävy (_Vari) ja valokeila — keilojen ulkopuolella pilvet himmenevät kuten pallo
// (KarttaKerrokset: perusväri × (1 − 0,95 · hämäryys)). Oletukset (_Vari valkoinen, _Hamara 0) pitävät astronautin ja
// lennon pilvet ennallaan.
Shader "Matkakirja/Linssit/Pilvet"
{
    Properties
    {
        _MainTex("Pilvikuva", 2D) = "black" {}
        _Peitto("Peitto", Range(0, 1)) = 0.9
        _Vari("Sävy", Color) = (1, 1, 1, 1)
        _Hamara("Hämäryys keilojen ulkopuolella", Range(0, 1)) = 0
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _KeilaA("Pääkeila: suunta, cos ulkoreuna", Vector) = (0, 0, 1, 2)
        _KeilaAsisa("Pääkeila: cos sisäreuna, voimakkuus", Vector) = (2, 0, 0, 0)
        _KeilaB("Toinen keila: suunta, cos ulkoreuna", Vector) = (0, 0, 1, 2)
        _KeilaBsisa("Toinen keila: cos sisäreuna, voimakkuus", Vector) = (2, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-50" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                half _Peitto;
                half4 _Vari;
                half _Hamara;
                float4 _Keskus;
                float4 _KeilaA, _KeilaAsisa, _KeilaB, _KeilaBsisa;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 maailma : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                half valo = 1.0h;
                if (_Hamara > 0.0h)
                {
                    // Keilat maan keskipisteestä katsottuina (cos-kulmat): pilvi on keilassa yhtä kirkas kuin pallo.
                    float3 d = normalize(i.maailma - _Keskus.xyz);
                    half a = smoothstep(_KeilaA.w, _KeilaAsisa.x, dot(d, _KeilaA.xyz)) * _KeilaAsisa.y;
                    half b = smoothstep(_KeilaB.w, _KeilaBsisa.x, dot(d, _KeilaB.xyz)) * _KeilaBsisa.y;
                    valo = max(1.0h - 0.95h * _Hamara, max(a, b));
                }
                return half4(c.rgb * _Vari.rgb * valo, c.a * _Peitto * _Vari.a * lerp(0.5h, 1.0h, valo));
            }
            ENDHLSL
        }
    }
}
