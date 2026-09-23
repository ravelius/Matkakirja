// Astronautin ilmakehän hehku (web js/linssit/satelliitti-avaruus.js ILMAKEHAN_VARI
// #7fb6ff, ILMAKEHAN_KORKEUS 0,25 → globe.gl atmosphere = three-glow-mesh):
// kuori säteellä R × 1,25, piirretään takapinnat, alfa = (0,1 + n·v)^3,5, ja pallon
// kiekon kohdalla oleva osa hylätään (hollowRadius = R). Hehku näkyy siis vain pallon
// reunan ulkopuolella kaistana, joka himmenee kuoren reunaa kohti.
Shader "Matkakirja/Linssit/Ilmakeha"
{
    Properties
    {
        _Vari("Väri", Color) = (0.498, 0.714, 1, 1)
        _Kerroin("Coefficient", Float) = 0.1
        _Potenssi("Power", Float) = 3.5
        _Ontto("Pallon säde (m)", Float) = 6378137
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-60" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Front

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                float _Kerroin, _Potenssi, _Ontto;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 keskus = TransformObjectToWorld(float3(0, 0, 0));
                float3 kamerasta = i.maailma - _WorldSpaceCameraPos;
                float3 keskukseen = keskus - _WorldSpaceCameraPos;
                float etaisyys = length(keskukseen);
                if (etaisyys < _Ontto) discard;
                // Pallon kiekon sisällä (kulma keskipisteeseen < reunakulma): ei hehkua.
                float reuna = atan(_Ontto / etaisyys);
                float kulma = acos(saturate(dot(normalize(kamerasta), keskukseen / etaisyys)));
                if (kulma < reuna) discard;
                float3 n = normalize(i.maailma - keskus);
                float voima = pow(max(0, _Kerroin + dot(n, normalize(kamerasta))), _Potenssi);
                return half4(_Vari.rgb, saturate(voima) * _Peitto);
            }
            ENDHLSL
        }
    }
}
