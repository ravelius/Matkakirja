// Cupolan reunavalot yhdeksi kuvaksi (Linssiseppä 30.9.2026, ISS-laitemittaus: kolme koko ruudun valokuvaa UI Toolkitissa
// maksoi iPad Pro 12.9:llä ~8 ms kehyksessä, Cupola 45 fps / seuranta 60). IssKyytiNakyma blittaa kolme Codexin Cupola 3
// -reunavaloa (sun-nw, sun-ne, sun-sw) painoineen puolikokoiseen RT:hen vain painojen muuttuessa; UI piirtää yhden kerroksen.
// Sama tulos kuin kolmella päällekkäisellä kerroksella: "over"-kompositio järjestyksessä 0, 1, 2 (kerrosten piirtojärjestys),
// alfa = paino × kuvan alfa, ulos suora (ei esikerrottu) alfa kuten UI Toolkitin taustakuvissa.
// Blit-varjostin kuten Resources/Lippuaalto.shader: TransformObjectToHClip Blitin ortomatriiseilla, Blend Off.
Shader "Matkakirja/Linssit/CupolaValot"
{
    Properties
    {
        _Valo0("Valo 0", 2D) = "black" {}
        _Valo1("Valo 1", 2D) = "black" {}
        _Valo2("Valo 2", 2D) = "black" {}
        _Painot("Painot (0, 1, 2, -)", Vector) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" "PreviewType" = "Plane" }
        Pass
        {
            Name "CupolaValot"
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
            CBUFFER_START(UnityPerMaterial)
                float4 _Painot;
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
                Paalle(SAMPLE_TEXTURE2D(_Valo0, sampler_Valo0, i.uv), _Painot.x, c, a);
                Paalle(SAMPLE_TEXTURE2D(_Valo1, sampler_Valo1, i.uv), _Painot.y, c, a);
                Paalle(SAMPLE_TEXTURE2D(_Valo2, sampler_Valo2, i.uv), _Painot.z, c, a);
                return half4(a > 1e-5 ? c / a : 0, a);
            }
            ENDHLSL
        }
    }
}
