// Dioraaman 3D-liekki (Linnanrakentaja erä 2b, dioraama-rajapinnat-era2b-20260929.md kohta 6): korvaa atlas-
// billboardin proseduraalisella pisaramalla, jotta liekki näyttää oikealta 3D:ltä kaikista kulmista, myös
// ylhäältä (litteä billboard näkyisi suoraan ylhäältä katsottuna ohuena viivana). DioraamaLiekit.cs rakentaa
// jaetun pisaramesh (2 sisäkkäistä kerrosta, ydin+vaippa, DioraamaLiekit.LuoLiekkiMesh) ja jaetun kipinämeshin
// (24 nelikulmiota, LuoKipinaMesh) KERRAN ja jakaa ne kaikille liekkiesiintymille -- vain gameobjectin
// transform (paikka, skaala Koko-kertoimesta/koko_m:stä) vaihtelee esiintymien välillä.
//
// KAKSI PASSIA, KAKSI MATERIAALIA (valittu perustelu): liekin runko ja kipinät ovat eri topologiaa (runko =
// varsinainen tilavuusmesh, kipinät = kameraa kohti kääntyvät nelikulmiot indeksillä) ja eri kärkidataa, joten
// molemmat passit AJETTAISIIN samalle meshille jos materiaali käyttäisi molempia -- väärä data toisessa passissa.
// Siksi kaksi Material-oliota (DioraamaLiekit.VarmistaJaetutResurssit), jotka molemmat viittaavat TÄHÄN samaan
// shader-tiedostoon mutta poistavat käytöstä toisen passin (Material.SetShaderPassEnabled), jolloin runko- ja
// kipinä-MeshRenderer piirtävät kumpikin vain oman passinsa yhdellä draw callilla. Ei tekstuureja -- täysin
// proseduraalinen (väri korkeuden mukaan + fresnel), joten Properties-lohko on lyhyt eikä lataus tarvita.
//
// GLOBAALIT (Shader.SetGlobalFloat, DioraamaLiekit.Paivita/DioraamaNayttamo.cs):
//   _DioraamaAika      Ytimen aika t (SAMA kuin muualla dioraamassa -- "poikki aika" pysäytys pysäyttää tämänkin,
//                      ei Unityn omaa _Time:a, jotta kuvaparit/kehitystyö pysyvät deterministisinä)
//   _DioraamaLepatus   hidas kohinainen 0,85…1,0 (DioraamaNayttamo.cs), sama lepatus kuin muillakin materiaaleilla
//
// PER-ESIINTYMÄ VAIHTELU ILMAN MATERIALPROPERTYBLOCKIA (talon linja): koska mesh+materiaali ovat jaettuja, siemen
// vaihteluun otetaan esiintymän omasta maailmanpisteestä (unity_ObjectToWorld._m03_m13_m23) -- SRP Batcher -
// yhteensopiva per-draw-data, ei materiaalikohtaista tilaa.
Shader "Matkakirja/Linssit/DioraamaLiekki3D"
{
    Properties
    {
        _Voima("Voima", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }

        Pass
        {
            Name "Liekki"
            Tags { "LightMode" = "UniversalForward" }
            Blend One One
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma target 3.5
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            // Globaalit -- ks. tiedoston alkukommentti.
            float _DioraamaAika;
            half _DioraamaLepatus;

            CBUFFER_START(UnityPerMaterial)
                half _Voima;
            CBUFFER_END

            struct Syote
            {
                float4 paikka : POSITION;
                float3 normaali : NORMAL;
                float2 uv0 : TEXCOORD0; // x = ympärikulma 0..1, y = korkeus01 (0 tyvi, 1 kärki)
                float2 uv1 : TEXCOORD1; // x = kerroksen ajanvaihe, y = kerroksen kirkkaus (ydin > vaippa)
            };
            struct Vali
            {
                float4 paikka : SV_POSITION;
                float3 normaali : TEXCOORD0;
                float3 maailma : TEXCOORD1;
                float2 korkeusKirkkaus : TEXCOORD2; // x = korkeus01, y = kerroksen kirkkaus
            };

            Vali vert(Syote i)
            {
                Vali o;
                float3 lokaali = i.paikka.xyz;
                float korkeus01 = saturate(i.uv0.y);
                float ympari = i.uv0.x;
                // Per-esiintymä siemen esiintymän maailmanpisteestä (jaettu mesh+materiaali, ei MPB:tä, ks. yllä).
                float3 tyvi = unity_ObjectToWorld._m03_m13_m23;
                float siemen = frac(sin(dot(tyvi.xz, float2(12.9898, 78.233))) * 43758.5453);
                float t = _DioraamaAika + i.uv1.x + siemen * 11.0;
                // NOUSEVA AALTO + KOHINA: aalto etenee ylöspäin (korkeus01 kasvaa t:n myötä, koska vaihe on
                // -t:n kanssa), enemmän liikettä kärjessä kuin tyvessä -- tyvi pysyy paikallaan liekkipesässä.
                float aalto = sin(korkeus01 * 3.0 - t * 1.6) * 0.09;
                float kohina = sin(ympari * 12.0 + t * 4.1) * 0.05 + sin(ympari * 7.0 - t * 2.7) * 0.04;
                float vaanto = (aalto + kohina) * korkeus01;
                // Säde pulssaa sisään/ulos (kerrottuna nykyisellä x/z:lla -- kärjessä x=z=0, pysyy siis terävänä).
                lokaali.x += vaanto * lokaali.x;
                lokaali.z += vaanto * lokaali.z;
                lokaali.y += 0.03 * sin(t * 2.3) * korkeus01;

                float3 maailma = TransformObjectToWorld(lokaali);
                o.paikka = TransformWorldToHClip(maailma);
                o.normaali = normalize(TransformObjectToWorldNormal(i.normaali));
                o.maailma = maailma;
                o.korkeusKirkkaus = float2(korkeus01, i.uv1.y);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float h = saturate(i.korkeusKirkkaus.x);
                half3 valkoinen = half3(1.0, 0.97, 0.86);
                half3 keltainen = half3(1.0, 0.82, 0.25);
                half3 oranssi = half3(1.0, 0.45, 0.06);
                half3 punainen = half3(0.75, 0.10, 0.03);
                half3 vari = h < 0.33 ? lerp(valkoinen, keltainen, (half)(h / 0.33))
                    : h < 0.66 ? lerp(keltainen, oranssi, (half)((h - 0.33) / 0.33))
                    : lerp(oranssi, punainen, (half)saturate((h - 0.66) / 0.34));

                float3 n = normalize(i.normaali);
                float3 v = normalize(_WorldSpaceCameraPos - i.maailma);
                // Fresnel-HÄIVYTYS (ei rim-kirkastus): reuna (normaali kohtisuorassa katseeseen) himmenee, jotta
                // tilavuusmeshin kova siluetti pehmenee additiivisessa piirrossa eikä näytä kiinteältä muovilta.
                half reuna = (half)saturate(pow(abs(dot(n, v)), 0.55));

                half kirkkaus = (half)i.korkeusKirkkaus.y;
                half lepatus = (half)(0.85 + 0.15 * _DioraamaLepatus);
                half3 emissio = vari * kirkkaus * reuna * _Voima * lepatus;
                return half4(emissio, 1.0);
            }
            ENDHLSL
        }

        Pass
        {
            Name "Kipinat"
            Tags { "LightMode" = "UniversalForward" }
            Blend One One
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma target 3.5
            #pragma vertex vertKipina
            #pragma fragment fragKipina
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            float _DioraamaAika;
            half _DioraamaLepatus;

            CBUFFER_START(UnityPerMaterial)
                half _Voima;
            CBUFFER_END

            // 24 kipinää yhdessä meshissä (DioraamaLiekit.LuoKipinaMesh): paikka lasketaan tässä ajasta ja
            // kipinän indeksistä, ei CPU-päivitystä joka ruutu. Nelikulmio käännetään kameraa kohti
            // UNITY_MATRIX_I_V:n sarakkeista (kameran maailmanoikea/-ylä), ei transform.rotationilla.
            struct SyoteKipina
            {
                float4 paikka : POSITION; // xy = nelikulman kulma -1..1 (paikallinen billboard-siirtymä)
                float2 uv0 : TEXCOORD0;   // x = kipinän indeksi 0..23
            };
            struct ValiKipina
            {
                float4 paikka : SV_POSITION;
                float2 kulma : TEXCOORD0;
                half kirkkaus : TEXCOORD1;
            };

            float Tiiviste(float n) { return frac(sin(n) * 43758.5453); }

            ValiKipina vertKipina(SyoteKipina i)
            {
                ValiKipina o;
                float idx = i.uv0.x;
                float2 kulma = i.paikka.xy;
                // Sama per-esiintymä-siemen periaate kuin Liekki-passissa (jaettu mesh+materiaali, ei MPB:tä).
                float3 tyvi = unity_ObjectToWorld._m03_m13_m23;
                float siemen = Tiiviste(dot(tyvi.xz, float2(12.9898, 78.233)) + idx * 0.037);
                float h1 = Tiiviste(idx * 7.13 + siemen * 91.7 + 1.0);
                float h2 = Tiiviste(idx * 7.13 + siemen * 91.7 + 2.0);
                float h3 = Tiiviste(idx * 7.13 + siemen * 91.7 + 3.0);
                // Elinkaari 0..1 kiertyy uudelleen (frac): nousee, ajelehtii kierrellen, sammuu, syttyy uudelleen.
                float kesto = lerp(1.6, 3.0, h1);
                float vaihe = frac(_DioraamaAika / kesto + h2);
                float nousu = vaihe * lerp(0.9, 1.5, h3);
                float kierto = vaihe * 6.2832 * lerp(1.0, 2.0, h1) + h2 * 6.2832;
                float sade = 0.08 * (1.0 - vaihe);
                float3 lokaali = float3(cos(kierto) * sade, nousu, sin(kierto) * sade);
                float3 keski = TransformObjectToWorld(lokaali);

                float3 oikea = UNITY_MATRIX_I_V._11_21_31; // kameran maailman-oikea (billboard, ei CPU-kääntöä)
                float3 yla = UNITY_MATRIX_I_V._12_22_32;
                half sammuminen = (half)(saturate(1.0 - vaihe) * saturate(vaihe * 6.0)); // pehmeä syttymä+sammuma
                float koko = lerp(0.012, 0.02, h3);
                float3 maailma = keski + (oikea * kulma.x + yla * kulma.y) * koko;

                o.paikka = TransformWorldToHClip(maailma);
                o.kulma = kulma;
                o.kirkkaus = sammuminen * (half)lerp(0.5, 1.0, h2);
                return o;
            }

            half4 fragKipina(ValiKipina i) : SV_Target
            {
                float d = length(i.kulma);
                half a = (half)saturate(1.0 - smoothstep(0.2, 1.0, d)) * i.kirkkaus;
                half lepatus = (half)(0.85 + 0.15 * _DioraamaLepatus);
                half3 vari = half3(1.0, 0.75, 0.4) * a * _Voima * lepatus;
                return half4(vari, 1.0);
            }
            ENDHLSL
        }
    }
}
