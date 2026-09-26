// Symbolimalli (Kartta/Symbolimallit.cs, omistajan löydös 160, build 21 -prototyyppi): tason 1 nostojen low-poly 3D-mallit.
// Yksi materiaali, värit kärkiväreinä (Sisältökirjurin vari2-paletti), ei tekstuureja. Tasavarjostus (normaalit tahkoittain
// verkossa) pehmeällä pääsuuntavalolla, hillitty: 0,74 + 0,26 · N·L. Löytämätön (_Himmea 1): väri kohti pergamenttia ja
// hieman läpikuultava kuten elävän kartan musteen jälki. Horisonttiusva (Shaders/Horisonttiusva.hlsl, 153/159).
Shader "Matkakirja/Symbolimalli"
{
    Properties
    {
        _Himmea("Himmeä (löytämätön)", Float) = 0
        _Paperi("Pergamentti", Color) = (0.93, 0.89, 0.78, 1)
    }
    SubShader
    {
        Tags { "Queue" = "Transparent+3" "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Symbolimalli"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Back
            Blend SrcAlpha OneMinusSrcAlpha

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Himmea;
                half4 _Paperi;
            CBUFFER_END

            struct Tulo { float4 positionOS : POSITION; float3 normalOS : NORMAL; half4 vari : COLOR; };
            struct Valissa { float4 positionCS : SV_POSITION; half4 vari : COLOR; float3 n : TEXCOORD0; float usvaY : TEXCOORD1; };

            Valissa vert(Tulo i)
            {
                Valissa o;
                o.positionCS = TransformObjectToHClip(i.positionOS.xyz);
                o.n = TransformObjectToWorldNormal(i.normalOS);
                o.vari = i.vari;
                o.usvaY = UsvaYlhaalta(o.positionCS);
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                half nl = saturate(dot(normalize(i.n), GetMainLight().direction));
                half3 c = i.vari.rgb * (0.74 + 0.26 * nl);
                c = lerp(c, _Paperi.rgb * (0.86 + 0.14 * nl), _Himmea * 0.6);
                half a = lerp(1.0, 0.7, _Himmea) * UsvaNakyvyys(i.usvaY);
                return half4(c, a);
            }
            ENDHLSL
        }
    }
}
