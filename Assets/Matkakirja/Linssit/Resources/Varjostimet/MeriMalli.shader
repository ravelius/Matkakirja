// MeriMalli (meren koristeiden laatutaso, omistaja 27.9.2026 klo 13.0x: "Nuo voisi tehdä korkeammalla laadulla"; speksi
// docs/raportit/meri-laatu-speksi-20260927.md). Sama kuvakieli kuin kategoriasymboleissa ja erikoismalleissa
// (Kartta/Resources/Symbolimalli.shader kohdat 1–3 ja 6–8), mutta elävän kerroksen tarpeisiin: näytöksen häivytys _Peitto,
// vesikerros samassa verkossa ja valo kartan luoteesta maailmassa (laiva kääntyy, valo ei).
//
// Kärkivärit ovat lineaarisia (MeriRakentaja), ja kärjen alfa kertoo tilan:
//  - alfa < 0,5: B-seepiaramppi. Värin valoisuus = rampin kohta s (0 muste #3b2f22, 1 seepia #8a6a44, 2 paperi #efe4cc);
//    valo v = 0,2 + 0,8 · N·L (L = _Valo, kartan luode ylhäältä kuten kuvamerkeissä), ylöspäin olevat tahkot kohti täyttä
//    valoa (ylös², ylös = _Ylos eli pinnan normaali); kohta laskee s − 1,25 · (1 − v), väri rampista. Ei harmaata.
//  - alfa ≥ 0,5: korostus (pelin punainen #9a3b2c): harmaa pois, valo 0,62 + 0,38 · N·L, ylätahkot kirkkaammiksi.
//  - kaiverrusreuna molemmissa: syrjittäin kameraan oleva tahko tummuu musteeksi (smoothstep 0,65–0,92, enintään 0,7).
//  - UV1.x > 5: vesikerros (vanavesi, keulakuohu, varjo, vaahto, roiskeet): kärkiväri ja -alfa sellaisenaan, ei valoa.
// Ääriviivapiirto (_Reuna 1, oma materiaali: Cull Off, ZWrite Off, renderQueue mallia ennen): kärki siirtyy vaakatasossa
// UV1:n suuntaan kertaa _ReunaLeveys (mallin yksiköissä = 1,2 pt / lajin KokoPt), joten jokainen osa kasvaa vakioleveyden
// verran ja malli piirtää itsensä päälle; jäljelle jää ääriviiva musteena #3b3024 alfa 0,85. Vesikolmiot eivät piirry siinä.
// Horisonttiusva (Shaders/Horisonttiusva.hlsl, 153/159) mallin juuresta, kuten Symbolimallissa.
Shader "Matkakirja/Linssit/MeriMalli"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
        _Reuna("Ääriviivapiirto", Float) = 0
        _ReunaLeveys("Ääriviivan leveys (mallin yksiköissä)", Float) = 0.0043
        _Valo("Valo maailmassa (kartan luode)", Vector) = (-0.4592, 0.8163, 0.4082, 0)
        _Ylos("Pinnan normaali maailmassa", Vector) = (0, 1, 0, 0)
        [Enum(UnityEngine.Rendering.CullMode)] _Cull("Cull", Float) = 2
        [Enum(UnityEngine.Rendering.CompareFunction)] _ZTest("ZTest", Float) = 4
        [Enum(Off, 0, On, 1)] _ZWrite("ZWrite", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+11" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite [_ZWrite]
            ZTest [_ZTest]
            Cull [_Cull]

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                float _Reuna;
                float _ReunaLeveys;
                float4 _Valo;
                float4 _Ylos;
            CBUFFER_END

            struct Tulo
            {
                float4 positionOS : POSITION;
                float3 normalOS : NORMAL;
                half4 vari : COLOR;
                float2 reuna : TEXCOORD1;
            };
            struct Valissa
            {
                float4 positionCS : SV_POSITION;
                half4 vari : COLOR;
                float3 n : TEXCOORD0;
                float3 kohti : TEXCOORD1;
                float usvaY : TEXCOORD2;
                float vesi : TEXCOORD3;
            };

            Valissa vert(Tulo i)
            {
                Valissa o;
                float3 p = i.positionOS.xyz;
                float vesi = i.reuna.x > 5.0 ? 1.0 : 0.0;
                if (_Reuna > 0.5 && vesi < 0.5) p.xz += i.reuna * _ReunaLeveys;
                float3 maailma = TransformObjectToWorld(p);
                o.positionCS = TransformWorldToHClip(maailma);
                o.n = TransformObjectToWorldNormal(i.normalOS);
                o.kohti = _WorldSpaceCameraPos - maailma;
                o.vari = i.vari;
                o.vesi = vesi;
                o.usvaY = UsvaYlhaalta(TransformObjectToHClip(float3(0, 0, 0)));
                return o;
            }

            half4 frag(Valissa i) : SV_Target
            {
                half nakyvyys = UsvaNakyvyys(i.usvaY) * _Peitto;
                if (i.vesi > 0.5)
                {
                    clip(0.5 - _Reuna);
                    return half4(i.vari.rgb, i.vari.a * nakyvyys);
                }
                if (_Reuna > 0.5) return half4(0.0395, 0.0260, 0.0132, 0.85 * nakyvyys);

                const half3 luma = half3(0.2126, 0.7152, 0.0722);
                const half3 mustevari = half3(0.23, 0.19, 0.14);
                float3 n = normalize(i.n);
                float3 valo = normalize(_Valo.xyz), ylos = normalize(_Ylos.xyz);
                half reuna = smoothstep(0.65, 0.92, 1.0 - abs(dot(n, normalize(i.kohti))));
                half yl = saturate(dot(n, ylos));

                if (i.vari.a < 0.5)
                {
                    const half3 P = half3(0.8632, 0.7758, 0.6038), S = half3(0.2542, 0.1441, 0.0578), M = half3(0.0437, 0.0284, 0.0160);
                    const half lP = 0.7820, lS = 0.1613, lM = 0.0308;
                    half lv = dot(i.vari.rgb, luma);
                    half s0 = lv >= lS ? 1.0 + (lv - lS) / (lP - lS) : (lv - lM) / (lS - lM);
                    half v = 0.2 + 0.8 * saturate(dot(n, valo));
                    v = lerp(v, 1.0, yl * yl);
                    half sr = clamp(s0 - 1.25 * (1.0 - v), 0.0, 2.0);
                    half3 cr = sr >= 1.0 ? lerp(S, P, sr - 1.0) : lerp(M, S, sr);
                    cr = lerp(cr, mustevari, 0.7 * reuna);
                    return half4(cr, nakyvyys);
                }

                half3 c = i.vari.rgb;
                half3 g = sqrt(max(c, (half3)0));
                half sat = max(g.r, max(g.g, g.b)) - min(g.r, min(g.g, g.b));
                half l = dot(c, luma);
                c = lerp(c, l * half3(1.06, 0.98, 0.80), 0.6 * (1.0 - smoothstep(0.04, 0.12, sat)));
                half nl = saturate(dot(n, valo));
                half kirkkaus = 0.62 + 0.38 * nl;
                kirkkaus = lerp(kirkkaus, 1.0, 0.5 * yl * yl);
                c *= kirkkaus * lerp(0.88, 1.04, yl);
                c = lerp(c, mustevari, 0.7 * reuna);
                return half4(c, nakyvyys);
            }
            ENDHLSL
        }
    }
}
