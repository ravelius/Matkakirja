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
//
// 1.0.27-KOKEILU (mallit luettaviksi ylhäältä, Linssisepän tyyliohje):
//  6. Ääriviiva: _Reuna 1 = sama verkko toisena piirtona omalla materiaalillaan (Symbolimallit.ReunaMateriaali: Cull Off,
//     ZWrite Off, renderQueue mallin ja maakontaktin välissä). Kärki siirtyy vaakatasossa UV1:n suuntaan (osan keskipisteestä
//     osan puolileveyksillä normitettuna, Rakentaja) kertaa _Tila.z (leveys mallin yksiköissä = 1,2 pt / mallin koko pt),
//     joten jokainen osa kasvaa vakioleveyden verran ja malli piirtää itsensä päälle; jäljelle jää ääriviiva, myös
//     suoraan ylhäältä. Väri muste #3b3024 (Linssisepän 0,23 / 0,19 / 0,14 näyttöarvona), alfa 0,85, usva ja piilo kyllä.
//     Klassinen inverted hull (Cull Front) ei piirrä mitään suoraan ylhäältä, koska malleissa ei ole pohjatahkoja.
//  7. Valo vaaleammaksi: 0,62 + 0,38 · N·L (ennen 0,55 + 0,45) ja ylöspäin olevat tahkot (katot) puoliksi kohti täyttä
//     valoa, jotta katto on vaalein valon suunnasta riippumatta (omistaja 26.9.: "toivottavasti mallit ovat vaaleita").
//
// KATEGORIASYMBOLIT (omistaja 26.9. klo 21.5x; esitys arkkityypit-paletti-animaatio-20260926.md §1, Symbolimallit.Kategoriat.cs):
//  8. Seepiaramppi, kun kärjen alfa < 0,5 (reliefit; arkkityypit ja erikoismallit alfa 1 → kohdat 1, 2 ja 7 ennallaan):
//     kärkiväri → rampin kohta s (valoisuudesta: 0 muste #3b2f22, 1 seepia #8a6a44, 2 paperi #efe4cc) → valo siirtää
//     kohtaa alaspäin s − 1,25 · (1 − v) → väri rampista (ei harmaata: varjo on seepiaa, ei tummennettua paperia).
//     Valo v on kuvamerkin oma kiinteä valo vasemmalta ylhäältä mallin avaruudessa (−0,45, 0,8, 0,4): reliefin
//     varjopuoli on sama kuin 2D-merkissä kartan kierrosta, kamerasta ja pelin auringosta riippumatta. v = 0,2 + 0,8 · N·L,
//     ylöspäin olevat tahkot nostetaan kohti täyttä valoa (ylös²), joten yläkasvo on paperia ja varjon kylki seepiaa.
Shader "Matkakirja/Symbolimalli"
{
    Properties
    {
        _Himmea("Himmeä (löytämätön)", Float) = 0
        _Paperi("Pergamentti", Color) = (0.93, 0.89, 0.78, 1)
        _Pohja("Maakontaktilevy", Float) = 0
        _Reuna("Ääriviivapiirto", Float) = 0
        [Enum(UnityEngine.Rendering.CullMode)] _Cull("Cull", Float) = 2
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
            Cull [_Cull]
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
                float _Reuna;
            CBUFFER_END

            UNITY_INSTANCING_BUFFER_START(Symbolit)
                UNITY_DEFINE_INSTANCED_PROP(float4, _Tila)
            UNITY_INSTANCING_BUFFER_END(Symbolit)

            struct Tulo
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
                half4 vari : COLOR;
                float2 reuna : TEXCOORD1;   // ääriviivan vaakasuunta (Rakentaja, UV1)
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
                float3 nOS : TEXCOORD4;   // mallin avaruuden normaali (kohta 8: kuvamerkin kiinteä valo)
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            Valissa vert(Tulo i)
            {
                Valissa o;
                UNITY_SETUP_INSTANCE_ID(i);
                UNITY_TRANSFER_INSTANCE_ID(i, o);
                float3 p = i.positionOS.xyz;
                // 6. Ääriviivapiirto: osa kasvaa vaakatasossa leveyden _Tila.z (mallin yksiköissä) verran.
                if (_Reuna > 0.5) p.xz += i.reuna * UNITY_ACCESS_INSTANCED_PROP(Symbolit, _Tila).z;
                float3 maailma = TransformObjectToWorld(p);
                o.positionCS = TransformWorldToHClip(maailma);
                o.n = TransformObjectToWorldNormal(i.normalOS);
                o.kohti = _WorldSpaceCameraPos - maailma;
                // Mallin ylös (paikallinen +Y, malli seisoo pinnan normaalin suuntaan) maailmassa: kohta 2:n ylätahkojen valo.
                o.ylos = TransformObjectToWorldDir(float3(0, 1, 0));
                o.vari = i.vari;
                o.nOS = i.normalOS;
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
                // 6. Ääriviiva: muste #3b3024 lineaarisena, alfa 0,85.
                if (_Reuna > 0.5) return half4(0.0395, 0.0260, 0.0132, 0.85 * nakyvyys);

                const half3 luma = half3(0.2126, 0.7152, 0.0722);
                const half3 mustevari = half3(0.23, 0.19, 0.14);
                float3 n = normalize(i.n);
                // 3. Ohut kaiverrusreuna: tahko lähes syrjittäin kameraan tummuu musteeksi (siluetti).
                half reuna = smoothstep(0.65, 0.92, 1.0 - abs(dot(n, normalize(i.kohti))));

                // 8. Seepiaramppi (kategoriasymbolit, kärjen alfa 0).
                if (i.vari.a < 0.5)
                {
                    const half3 P = half3(0.8632, 0.7758, 0.6038), S = half3(0.2542, 0.1441, 0.0578), M = half3(0.0437, 0.0284, 0.0160);
                    const half lP = 0.7820, lS = 0.1613, lM = 0.0308;
                    half lv = dot(i.vari.rgb, luma);
                    half s0 = lv >= lS ? 1.0 + (lv - lS) / (lP - lS) : (lv - lM) / (lS - lM);
                    float3 nos = normalize(i.nOS);
                    half v = 0.2 + 0.8 * saturate(dot(nos, float3(-0.4592, 0.8163, 0.4082)));
                    half yl = saturate(nos.y);
                    v = lerp(v, 1.0, yl * yl);
                    half sr = clamp(s0 - 1.25 * (1.0 - v), 0.0, 2.0);
                    half3 cr = sr >= 1.0 ? lerp(S, P, sr - 1.0) : lerp(M, S, sr);
                    cr = lerp(cr, mustevari, 0.7 * reuna);
                    return half4(cr, nakyvyys);
                }

                // 1. Harmaa pois: kylläisyys likimain sRGB:nä (neliöjuuri), jotta rajat 0,04–0,12 vastaavat paletin hex-arvoja.
                half3 c = i.vari.rgb;
                half3 g = sqrt(max(c, (half3)0));
                half sat = max(g.r, max(g.g, g.b)) - min(g.r, min(g.g, g.b));
                half l = dot(c, luma);
                c = lerp(c, l * half3(1.06, 0.98, 0.80), 0.6 * (1.0 - smoothstep(0.04, 0.12, sat)));

                // 2. + 7. Valo: 0,62 + 0,38 · N·L; ylöspäin olevat tahkot (katot) puoliksi kohti täyttä valoa ja hieman
                // kirkkaampia, alaspäin olevat tummempia.
                half nl = saturate(dot(n, GetMainLight().direction));
                half ylos = saturate(dot(n, normalize(i.ylos)));
                half valo = 0.62 + 0.38 * nl;
                valo = lerp(valo, 1.0, 0.5 * ylos * ylos);
                c *= valo * lerp(0.88, 1.04, ylos);

                // 4. Löytämätön näyttää samalta kuin löydetty (Fable 26.9. löydös 175: web ei himmennä, omistajan päätös
                // 21.9.; himmennys oli osasyy harmauteen). _Himmea ja tila.x (muste) jäävät rajapintaan, mutta eivät vaikuta.
                const half muste = 0;

                // 3. Kaiverrusreuna (laskettu yllä).
                c = lerp(c, mustevari, 0.7 * reuna);
                half a = lerp(1.0, 0.9, muste) * nakyvyys;
                return half4(c, a);
            }
            ENDHLSL
        }
    }
}
