// Symbolimalli (Kartta/Symbolimallit.cs, omistajan löydös 160, build 21 -prototyyppi): nostojen low-poly 3D-mallit.
// Yksi materiaali, värit kärkiväreinä (Sisältökirjurin vari2-paletti), ei tekstuureja. Tasavarjostus (normaalit tahkoittain
// verkossa). Horisonttiusva (Shaders/Horisonttiusva.hlsl, 153/159).
//
// LÖYDÖS 175c (Linssisepän ohje, linja NIUKKUUS: malli on kaiverrus kartalla, ei esine):
//  1. Harmaa pois: neutraali kärkiväri lämmitetään pergamentiksi samalla valoisuudella (kylläisyys likimain sRGB:nä, koska
//     kärkivärit ovat lineaarisia; muuten tumma muste #4b3a1c luettaisiin harmaaksi ja haalistuisi).
//  2. Valo 0,55 + 0,45 · N·L ja ylöspäin olevat tahkot hieman kirkkaampia (0,85–1,06 mallin +Y:n mukaan).
//  3. Ohut kaiverrusreuna: syrjittäiset tahkot musteeksi (smoothstep 0,65–0,92, enintään 0,7).
//  4. Löytämätön näyttää samalta kuin löydetty (Fable 26.9., löydös 175; web ei himmennä). _Himmea ja _Tila.x ovat
//     rajapinnassa, mutta eivät vaikuta väriin.
//  5. Maakontakti: _Pohja 1 = mallin alla pehmeä varjolevy (kärkiväri sellaisenaan, ei valoa, reunaa eikä seepiaa, usva
//     kyllä). Levyn materiaali: _ZTest Always, _ZWrite Off ja pienempi renderQueue kuin mallilla.
//
// TASOT 2–3 (löydös 160 kohta 11, GPU-instansointi: Graphics.RenderMeshInstanced, Symbolimallit.Tasot23.cs): instanssin
// tila _Tila = (muste 0–1, piilo 0–1, 0, 0). Muste 1 = löytämätön (kuten _Himmea); 0 = löydetty täysväreinä
// (0,4 s syttyminen laskee arvoa). Piilo = 1 − NostoKerroksen syttyminen (kerroksen häivähdys ja saapumisen piilotus).
// Nollatila (0, 0) on sama kuin tason 1 ulkoasu, joten instansoimaton MeshRenderer-polku (taso 1) ei muutu.
Shader "Matkakirja/Symbolimalli"
{
    Properties
    {
        _Himmea("Himmeä (löytämätön)", Float) = 0
        _Paperi("Pergamentti", Color) = (0.93, 0.89, 0.78, 1)
        _Pohja("Maakontaktilevy", Float) = 0
        [Enum(UnityEngine.Rendering.CompareFunction)] _ZTest("ZTest", Float) = 4
        [Enum(Off, 0, On, 1)] _ZWrite("ZWrite", Float) = 1
    }
    SubShader
    {
        Tags { "Queue" = "Transparent+3" "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Symbolimalli"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite [_ZWrite]
            ZTest [_ZTest]
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
                float _Pohja;
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
                float3 ylos : TEXCOORD3;
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
                // Mallin ylös (paikallinen +Y, malli seisoo pinnan normaalin suuntaan) maailmassa: kohta 2:n ylätahkojen valo.
                o.ylos = TransformObjectToWorldDir(float3(0, 1, 0));
                o.vari = i.vari;
                // Usva mallin jalkapisteestä (symboli paikassaan): korkea malli ei haalistu yläpäästään horisonttiin.
                o.usvaY = UsvaYlhaalta(TransformObjectToHClip(float3(0, 0, 0)));
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                UNITY_SETUP_INSTANCE_ID(i);
                float4 tila = UNITY_ACCESS_INSTANCED_PROP(Symbolit, _Tila);
                half nakyvyys = UsvaNakyvyys(i.usvaY) * (1.0 - (half)tila.y);
                // Maakontaktilevy (kohta 5): kärkiväri ja -alfa sellaisenaan (varjo keskellä 0,42 → reunalla 0), vain usva ja piilo.
                if (_Pohja > 0.5) return half4(i.vari.rgb, i.vari.a * nakyvyys);

                const half3 luma = half3(0.2126, 0.7152, 0.0722);
                const half3 mustevari = half3(0.23, 0.19, 0.14);
                // 1. Harmaa pois: kylläisyys likimain sRGB:nä (neliöjuuri), jotta rajat 0,04–0,12 vastaavat paletin hex-arvoja.
                half3 c = i.vari.rgb;
                half3 g = sqrt(max(c, (half3)0));
                half sat = max(g.r, max(g.g, g.b)) - min(g.r, min(g.g, g.b));
                half l = dot(c, luma);
                c = lerp(c, l * half3(1.06, 0.98, 0.80), 0.6 * (1.0 - smoothstep(0.04, 0.12, sat)));

                // 2. Valo: 0,55 + 0,45 · N·L, ylöspäin olevat tahkot hieman kirkkaampia, alaspäin tummempia.
                float3 n = normalize(i.n);
                half nl = saturate(dot(n, GetMainLight().direction));
                c *= 0.55 + 0.45 * nl;
                c *= lerp(0.85, 1.06, saturate(dot(n, normalize(i.ylos))));

                // 4. Löytämätön näyttää samalta kuin löydetty (Fable 26.9. löydös 175: web ei himmennä, omistajan päätös
                // 21.9.; himmennys oli osasyy harmauteen). _Himmea ja tila.x (muste) jäävät rajapintaan, mutta eivät vaikuta.
                const half muste = 0;

                // 3. Ohut kaiverrusreuna: tahko lähes syrjittäin kameraan tummuu musteeksi (siluetti).
                half reuna = smoothstep(0.65, 0.92, 1.0 - abs(dot(n, normalize(i.kohti))));
                c = lerp(c, mustevari, 0.7 * reuna);
                half a = lerp(1.0, 0.9, muste) * nakyvyys;
                return half4(c, a);
            }
            ENDHLSL
        }
    }
}
