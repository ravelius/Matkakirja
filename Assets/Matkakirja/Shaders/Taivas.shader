// Taivas lennon ajaksi (omistaja 24.9.2026: SININEN ilmakehätaivas, horisontti vaalea, ei mustaa;
// musta vain astronauttilinssissä). Skybox: väri riippuu kulmasta pallon reunaan (limb) nähden —
// reunalla vaalea usva, kauempana sininen. Pinnan lähellä reuna on horisontti, kaukaa pallon kehä,
// joten sama kaava antaa sekä taivaan että ilmakehän hehkun. Aurinko.cs asettaa _Nadir ja _Raja.
Shader "Matkakirja/Taivas"
{
    Properties
    {
        _BaseColor("Horisontti", Color) = (0.80, 0.87, 0.94, 1)
        _Zeniitti("Zeniitti", Color) = (0.22, 0.42, 0.74, 1)
        _Tausta("Tausta", Color) = (0.10, 0.08, 0.06, 1)
        _Osuus("Osuus", Range(0, 1)) = 1
        _Nadir("Nadir", Vector) = (0, -1, 0, 0)
        _Raja("Reunan kulma (rad)", Float) = 1.5
    }
    SubShader
    {
        Tags { "Queue" = "Background" "RenderType" = "Background" "PreviewType" = "Skybox" "RenderPipeline" = "UniversalPipeline" }
        Cull Off
        ZWrite Off
        Pass
        {
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                half4 _Zeniitti;
                half4 _Tausta;
                half _Osuus;
                float4 _Nadir;
                float _Raja;
            CBUFFER_END

            struct Tulo { float4 positionOS : POSITION; };
            struct Valissa { float4 positionCS : SV_POSITION; float3 suunta : TEXCOORD0; };

            Valissa vert(Tulo i)
            {
                Valissa o;
                o.positionCS = TransformObjectToHClip(i.positionOS.xyz);
                o.suunta = i.positionOS.xyz;
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                float3 d = normalize(i.suunta);
                float kulma = acos(clamp(dot(d, _Nadir.xyz), -1.0, 1.0));
                // 0 pallon reunalla, 1 suoraan poispäin pallosta.
                float s = saturate((kulma - _Raja) / max(1e-3, PI - _Raja));
                half3 c = lerp(_BaseColor.rgb, _Zeniitti.rgb, pow(s, 0.45));
                return half4(lerp(_Tausta.rgb, c, _Osuus), 1);
            }
            ENDHLSL
        }
    }
}
