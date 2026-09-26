// Symbolimalli (Kartta/Symbolimallit.cs, omistajan löydös 160, build 21 -prototyyppi): nostojen low-poly 3D-mallit.
// Yksi materiaali, värit kärkiväreinä (Sisältökirjurin vari2-paletti), ei tekstuureja. Tasavarjostus (normaalit tahkoittain
// verkossa) pehmeällä pääsuuntavalolla, hillitty: 0,74 + 0,26 · N·L. Löytämätön (_Himmea 1): väri kohti pergamenttia ja
// hieman läpikuultava kuten elävän kartan musteen jälki (35 % pergamenttia, peitto 0,88; 1. koe 60 %/0,7 liian haalea). Horisonttiusva (Shaders/Horisonttiusva.hlsl, 153/159).
//
// TASOT 2–3 (löydös 160 kohta 11, GPU-instansointi: Graphics.RenderMeshInstanced, Symbolimallit.Tasot23.cs): instanssin
// tila _Tila = (muste 0–1, piilo 0–1, 0, 0). Muste 1 = löytämätön himmeänä musteena: desaturoitu kohti seepiamustetta,
// peitto 0,55 ja mustereuna (kameraan nähden syrjittäiset tahkot tummuvat kärkivärin päällä); 0 = löydetty täysväreinä
// (0,4 s syttyminen laskee arvoa). Piilo = 1 − NostoKerroksen syttyminen (kerroksen häivähdys ja saapumisen piilotus).
// Nollatila (0, 0) on sama kuin tason 1 ulkoasu, joten instansoimaton MeshRenderer-polku (taso 1) ei muutu.
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
            #pragma multi_compile_instancing
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Himmea;
                half4 _Paperi;
            CBUFFER_END

            UNITY_INSTANCING_BUFFER_START(Symbolit)
                UNITY_DEFINE_INSTANCED_PROP(float4, _Tila)
            UNITY_INSTANCING_BUFFER_END(Symbolit)

            struct Tulo
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
                half4 vari : COLOR;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };
            struct Valissa
            {
                float4 positionCS : SV_POSITION;
                half4 vari : COLOR;
                float3 n : TEXCOORD0;
                float usvaY : TEXCOORD1;
                float3 kohti : TEXCOORD2;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            Valissa vert(Tulo i)
            {
                Valissa o;
                UNITY_SETUP_INSTANCE_ID(i);
                UNITY_TRANSFER_INSTANCE_ID(i, o);
                float3 maailma = TransformObjectToWorld(i.positionOS.xyz);
                o.positionCS = TransformWorldToHClip(maailma);
                o.n = TransformObjectToWorldNormal(i.normalOS);
                o.kohti = _WorldSpaceCameraPos - maailma;
                o.vari = i.vari;
                // Usva mallin jalkapisteestä (symboli paikassaan): korkea malli ei haalistu yläpäästään horisonttiin.
                o.usvaY = UsvaYlhaalta(TransformObjectToHClip(float3(0, 0, 0)));
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                UNITY_SETUP_INSTANCE_ID(i);
                float4 tila = UNITY_ACCESS_INSTANCED_PROP(Symbolit, _Tila);
                float3 n = normalize(i.n);
                half nl = saturate(dot(n, GetMainLight().direction));
                half3 c = i.vari.rgb * (0.74 + 0.26 * nl);
                c = lerp(c, _Paperi.rgb * (0.86 + 0.14 * nl), _Himmea * 0.35);
                half a = lerp(1.0, 0.88, _Himmea) * UsvaNakyvyys(i.usvaY);
                // Tasot 2–3: löytämätön musteena. Harmaa seepiaan, tummennus 0,8; reuna = tahko lähes syrjittäin kameraan.
                half muste = (half)tila.x;
                if (muste > 0.001)
                {
                    half l = dot(c, half3(0.2126, 0.7152, 0.0722));
                    half3 seepia = l * half3(0.86, 0.8, 0.68);
                    half reuna = 1.0 - saturate(abs(dot(n, normalize(i.kohti))) * 2.5);
                    half3 m = lerp(c, seepia, 0.85) * (1.0 - 0.45 * reuna);
                    c = lerp(c, m, muste);
                    a *= lerp(1.0, 0.55, muste);
                }
                a *= 1.0 - (half)tila.y;
                return half4(c, a);
            }
            ENDHLSL
        }
    }
}
