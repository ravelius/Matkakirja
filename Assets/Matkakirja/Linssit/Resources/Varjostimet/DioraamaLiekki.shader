// Dioraaman liekki (Poikkileikkaus-linssi, Linnanrakentaja erä 2, 29.9.2026): DioraamaLiekit.cs:n quad, additiivinen
// billboard (tulisija/kynttilä/soihtu). Ei alpha-cutoutia kuten DioraamaHahmo.shader -- additiivinen Blend One One
// EI käytä alfaa sekoitukseen lainkaan, joten atlaksen alfa (= kirkkaus) kerrotaan käsin väriin fragmentissa, jotta
// ruudun pehmeät reunat häipyvät oikein sen sijaan että näkyisivät kovana neliönä.
// Väri = tex.rgb · tex.a · _Voima · (0,85 + 0,15 · globaali _DioraamaLepatus). _Voima on per-atlas-materiaali
// (EI MaterialPropertyBlockia, talon linja: jaettu Material per atlas, ks. DioraamaLiekit.AtlasMateriaali).
// _DioraamaLepatus on globaali (DioraamaNayttamo.cs, Shader.SetGlobalFloat): sama hidas kohinainen 0,85…1,0 kuin
// DioraamaMaalattu.shaderin tulisijan lämpöhehkulla, jotta liekki ja sen valaisema pinta lepattavat yhdessä.
// SRP Batcher -yhteensopiva: tekstuuri CBUFFERin ulkopuolella, ei float4x4-arvoja ilman Properties-riviä.
Shader "Matkakirja/Linssit/DioraamaLiekki"
{
    Properties
    {
        _MainTex("Atlas (RGBA, alfa = kirkkaus)", 2D) = "black" {}
        _Voima("Voima", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" "PreviewType" = "Plane" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One One
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);

            // Globaali (DioraamaNayttamo.cs, Shader.SetGlobalFloat): sama lepatus kuin muillakin dioraaman
            // materiaaleilla (tulisijan/valon hidas kohinainen 0,85…1,0).
            half _DioraamaLepatus;

            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                half _Voima;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.uv = i.uv * _MainTex_ST.xy + _MainTex_ST.zw;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 tex = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                half lepatus = (half)(0.85 + 0.15 * _DioraamaLepatus);
                half3 vari = tex.rgb * tex.a * _Voima * lepatus;
                return half4(vari, 1);
            }
            ENDHLSL
        }
    }
}
