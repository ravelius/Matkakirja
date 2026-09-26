// Lipputanko (Kartta/Lipputanko.cs, omistajan löydös 161, build 21 -koe): kohdemaan liioitellun iso lipputanko ja
// 1873-lippu, kartan ainoa täysvärinen kohde. Yksi varjostin tangolle, nupille ja lipulle: _MainTex (lippu =
// Liput.Aaltoile-RT, tanko = valkoinen) × _BaseColor, pääteltävä valo pinnan normaalista (pääsuuntavalo, pehmeä:
// 0,72 + 0,28 · N·L, ettei varjopuoli mustu) ja horisonttiusva (Shaders/Horisonttiusva.hlsl, löydökset 153/159).
// Lippu piirretään molemmin puolin (Cull Off); RT:n alfa on tavallinen (Liput), reunamarginaali läpinäkyvä.
// Resources-kansiossa, koska materiaali luodaan ajossa (Resources.Load).
Shader "Matkakirja/Lipputanko"
{
    Properties
    {
        _MainTex("Kuva", 2D) = "white" {}
        _BaseColor("Väri", Color) = (1, 1, 1, 1)
        _Valo("Valon osuus", Float) = 0.28
    }
    SubShader
    {
        Tags { "Queue" = "Transparent+2" "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Lipputanko"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Off
            Blend SrcAlpha OneMinusSrcAlpha

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                half4 _BaseColor;
                float _Valo;
            CBUFFER_END

            struct Tulo { float4 positionOS : POSITION; float3 normalOS : NORMAL; float2 uv : TEXCOORD0; };
            struct Valissa { float4 positionCS : SV_POSITION; float2 uv : TEXCOORD0; float3 n : TEXCOORD1; float usvaY : TEXCOORD2; };

            Valissa vert(Tulo i)
            {
                Valissa o;
                o.positionCS = TransformObjectToHClip(i.positionOS.xyz);
                o.uv = i.uv;
                o.n = TransformObjectToWorldNormal(i.normalOS);
                // Usva tangon jalasta: lippu ei haalistu latvastaan horisonttiin (sama kuin Symbolimalli).
                o.usvaY = UsvaYlhaalta(TransformObjectToHClip(float3(0, 0, 0)));
                return o;
            }

            half4 frag(Valissa i, bool edessa : SV_IsFrontFace) : SV_Target
            {
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv) * _BaseColor;
                float3 n = normalize(i.n) * (edessa ? 1.0 : -1.0);
                half nl = saturate(dot(n, GetMainLight().direction));
                c.rgb *= (1.0 - _Valo) + _Valo * nl;
                c.a *= UsvaNakyvyys(i.usvaY);
                clip(c.a - 0.004);
                return c;
            }
            ENDHLSL
        }
    }
}
