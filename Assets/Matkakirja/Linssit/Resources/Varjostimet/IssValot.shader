// ISS-KYTKINPANEELIN VALOKERROKSET YHDEKSI KUVAKSI (Linssiseppä 30.9.2026; Päätoimittaja: Linnanrakentajan Cycles-renderöimät
// valokerrokset per valonlähde summataan painoineen CupolaValot-tyyliin yhdellä varjostimella puolikokoiseen RT:hen vain tilan
// muuttuessa). Enintään 8 kerrosta (_Valo0…7, painot _PainotA.xyzw ja _PainotB.xyzw), "over" järjestyksessä 0 → 7 kuten
// päällekkäiset UI-kerrokset, alfa = paino × kuvan alfa, ulos suora alfa. Blit-varjostin kuten CupolaValot.shader.
Shader "Matkakirja/UI/IssValot"
{
    Properties
    {
        _Valo0("Valo 0", 2D) = "black" {}
        _Valo1("Valo 1", 2D) = "black" {}
        _Valo2("Valo 2", 2D) = "black" {}
        _Valo3("Valo 3", 2D) = "black" {}
        _Valo4("Valo 4", 2D) = "black" {}
        _Valo5("Valo 5", 2D) = "black" {}
        _Valo6("Valo 6", 2D) = "black" {}
        _Valo7("Valo 7", 2D) = "black" {}
        _PainotA("Painot 0–3", Vector) = (0, 0, 0, 0)
        _PainotB("Painot 4–7", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" "PreviewType" = "Plane" }
        Pass
        {
            Name "IssValot"
            ZTest Always
            Cull Off
            ZWrite Off
            Blend Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_Valo0); SAMPLER(sampler_Valo0);
            TEXTURE2D(_Valo1); SAMPLER(sampler_Valo1);
            TEXTURE2D(_Valo2); SAMPLER(sampler_Valo2);
            TEXTURE2D(_Valo3); SAMPLER(sampler_Valo3);
            TEXTURE2D(_Valo4); SAMPLER(sampler_Valo4);
            TEXTURE2D(_Valo5); SAMPLER(sampler_Valo5);
            TEXTURE2D(_Valo6); SAMPLER(sampler_Valo6);
            TEXTURE2D(_Valo7); SAMPLER(sampler_Valo7);
            CBUFFER_START(UnityPerMaterial)
                float4 _PainotA, _PainotB;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            void Paalle(float4 t, float paino, inout float3 c, inout float a)
            {
                float k = saturate(paino * t.a);
                c = t.rgb * k + c * (1.0 - k);
                a = k + a * (1.0 - k);
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 c = 0;
                float a = 0;
                if (_PainotA.x > 0) Paalle(SAMPLE_TEXTURE2D(_Valo0, sampler_Valo0, i.uv), _PainotA.x, c, a);
                if (_PainotA.y > 0) Paalle(SAMPLE_TEXTURE2D(_Valo1, sampler_Valo1, i.uv), _PainotA.y, c, a);
                if (_PainotA.z > 0) Paalle(SAMPLE_TEXTURE2D(_Valo2, sampler_Valo2, i.uv), _PainotA.z, c, a);
                if (_PainotA.w > 0) Paalle(SAMPLE_TEXTURE2D(_Valo3, sampler_Valo3, i.uv), _PainotA.w, c, a);
                if (_PainotB.x > 0) Paalle(SAMPLE_TEXTURE2D(_Valo4, sampler_Valo4, i.uv), _PainotB.x, c, a);
                if (_PainotB.y > 0) Paalle(SAMPLE_TEXTURE2D(_Valo5, sampler_Valo5, i.uv), _PainotB.y, c, a);
                if (_PainotB.z > 0) Paalle(SAMPLE_TEXTURE2D(_Valo6, sampler_Valo6, i.uv), _PainotB.z, c, a);
                if (_PainotB.w > 0) Paalle(SAMPLE_TEXTURE2D(_Valo7, sampler_Valo7, i.uv), _PainotB.w, c, a);
                return half4(a > 1e-5 ? c / a : 0, a);
            }
            ENDHLSL
        }
    }
}
