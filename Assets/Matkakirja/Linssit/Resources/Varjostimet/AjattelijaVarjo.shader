// AJATTELIJAN VARJOKARTTA (Linssiseppä 2, 2.10.2026): avainvalon (spotti) varjo omana karttanaan, koska URP:n lisävalojen
// varjot ovat projektissa pois (Mobile_RPAsset). Piirretään AjattelijaNayttamossa komentopuskurilla valon perspektiivistä
// (webin SpotLight.shadow: kartta 2048, lähi 0,6, kauko 2,2, keila 32°); arvo = matka valosta normalisoituna lähi…kauko.
Shader "Hidden/Matkakirja/AjattelijaVarjo"
{
    SubShader
    {
        Tags { "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Tags { "LightMode" = "SRPDefaultUnlit" }
            Cull Off
            ZWrite On
            ZTest LEqual
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            float4x4 _VarjoGpuVP;   // GL.GetGPUProjectionMatrix(P, true) · V
            float4 _VarjoValo;      // valon paikka, lähi
            float _VarjoKauko;
            struct Tulo { float4 paikka : POSITION; };
            struct Ulos { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };
            Ulos vert(Tulo t)
            {
                Ulos o;
                o.maailma = t.paikka.xyz;   // bysti origossa ilman muunnosta
                o.paikka = mul(_VarjoGpuVP, float4(o.maailma, 1.0));
                return o;
            }
            float4 frag(Ulos i) : SV_Target
            {
                return (length(i.maailma - _VarjoValo.xyz) - _VarjoValo.w) / (_VarjoKauko - _VarjoValo.w);
            }
            ENDHLSL
        }
    }
}
