// Ihmisen matkan vana: rannikkoa maalaava kaista (web js/aikajana-vanat.js
// KARKIVARJOSTIN + FRAGMENTTIVARJOSTIN). Piirretään proseduraalisesti
// (Linssit/Unity/VanaKerros.cs, Graphics.RenderPrimitives): 6 kärkeä per
// jana, janan tiedot StructuredBufferista _Janat (jana = SV_VertexID / 6).
//
// OLETUKSET (editoria ei ajettu, käännöksen tarkistaa Natiiviseppä):
//   - Kaikki geometria on YKSIKKÖAVARUUDESSA u = ECEF / (a+h, a+h, b+h):
//     kaistan pinta on yksikköpallo (webin uSade = 1). _YksikostaMaailmaan
//     vie maailmaan, _Kamera on kameran paikka yksikköavaruudessa.
//   - Värit (_Vanha, _Kirkas, _RengasVari) ovat LINEAARISIA kuten webissä
//     (lineaariseksi); URP:n lineaarinen väriavaruus muuntaa ne näytölle.
//   - Rantamaski R8, 2880 × 1440, rivi 0 = 90°N v = 0:ssa, u kiertää
//     (Repeat), bilineaarinen ilman mip-tasoja.
//   - PÄÄLLEKKÄISYYS ON IDEMPOTENTTI (webin kohta 5, Ihmisen matka II:n erä 1
//     25.9.2026: omistaja näki kaistoissa raidoitusta): säde lasketaan PIKSELISTÄ
//     (käänteinen VP), ei nelikulmion interpoloidusta paikasta, joten saman pikselin
//     kaikki fragmentit saavat bitilleen saman pinnan pisteen, ja syvyys kirjoitetaan
//     siitä pisteestä (SV_Depth). ZTest Less päästää vain ensimmäisen läpi: liitosten
//     puolittajalla (SUVAITSE) molemmat janat maalaavat, mutta peitto ei enää summaudu
//     (ennen 1 − 0,5² = 0,75 joka kärjessä = raita). Vahvempi fragmentti vedetään
//     hitusen lähemmäs (webin KAISTAN_ALFABIAS), jotta toisen vanan häipyvä reuna ei
//     peitä vahvaa kaistaa.
//   - MAASTO: natiivin pallossa on korostettu maasto (KorkeusKerroin 2), joten syvyys
//     vedetään pinnan pisteestä _Syvyys.x kameraa kohti (25 km): kaista maalautuu
//     vuorten päälle eikä leikkaudu laattojen kolmioihin (repaleiset aukot).
//   - KUVAN ALUE (Ihmisen matka II): _KuvanAlue häivyttää kaistan havainnekuvan alta
//     (omistaja: väri ei saa levitä kuvan päälle).
Shader "Matkakirja/Vana"
{
    Properties
    {
        _Rantamaski("Rantamaski (R8)", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+2" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite On
            ZTest Less
            Cull Off

            HLSLPROGRAM
            #pragma target 4.5
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            // VanaPiirto.VanaTaulukko (24 vanaa + 8 kotipesää) ja VirtojaMax.
            #define VANOJA 32
            #define VIRTOJA 8
            // Omistussäännön suvaitsu (webin 1e-4 · uSade).
            #define SUVAITSE 1e-4
            // VanaPiirto.KaistanPitoVara.
            #define PITO_VARA 0.02

            // Sama järjestys kuin VanaKerros.JanaGpu (7 × float4).
            struct Jana
            {
                float4 p0, p1, p2, p3;   // xyz yksikköavaruudessa, w = kumulatiivinen matka
                float4 leveys;           // puolileveys A, B; etäisyys rantaan A, B
                float4 aikaMeri;         // saapumisaika A, B; merisyys A, B
                float4 tunnus;           // virta A, virta B, vana, rengas
            };
            StructuredBuffer<Jana> _Janat;

            // Ei UnityPerMaterial-puskuria: proseduraalinen piirto ei käy SRP-batcherin kautta.
            float4x4 _YksikostaMaailmaan;
            float3 _Kamera;
            float _Litistys;          // (a+h) / (b+h): yksikköpallon piste → geodeettinen leveys
            float4 _Aika;             // nyt, rintama, pito (0/1), kaistan peitto
            float4 _Leveys;           // minPuoli, minPuoliMeri, pehmennys, meriKerroin (yksikköä)
            float4 _Rengas;           // puolileveys, pehmennys (yksikköä)
            float4 _RengasVari;
            float4 _Maski;            // päällä (0/1), kynnys ala, kynnys ylä
            float4x4 _MaailmastaYksikkoon;
            float4 _Syvyys;           // veto kameraa kohti (yksikköä), vahvuuden lisäveto täydellä peitolla, peiton porras
            float4 _KuvanAlue;        // ruudun uv (origo vasen ala): x0, y0, x1, y1
            float4 _KuvanHaivytys;    // peitto 0–1, reunan pehmeys (uv)
            float _Kuljettu[VANOJA];
            float _VanaPeitto[VANOJA];
            float4 _Vanha[VIRTOJA];
            float4 _Kirkas[VIRTOJA];
            TEXTURE2D(_Rantamaski);
            SAMPLER(sampler_Rantamaski);

            struct Vali
            {
                float4 paikkaCS : SV_POSITION;
                nointerpolation uint jana : TEXCOORD0;
            };

            struct Ulos
            {
                half4 vari : SV_Target;
                float syvyys : SV_Depth;
            };

            static const float2 KULMAT[6] =
            {
                float2(-1, -1), float2(1, -1), float2(1, 1),
                float2(-1, -1), float2(1, 1), float2(-1, 1),
            };

            bool OnRengas(Jana j) { return j.tunnus.w > 0.5; }

            /* Nelikulmion puolikoko: leveys + ranta + pehmennys + webin vara 0,02 · säde. */
            float Hulli(Jana j)
            {
                float puoli = OnRengas(j) ? _Rengas.x + _Rengas.y : max(max(j.leveys.x, j.leveys.y), _Leveys.x);
                return puoli + max(j.leveys.z, j.leveys.w) + _Leveys.z + 0.02;
            }

            Vali vert(uint vid : SV_VertexID)
            {
                Vali o;
                uint n = vid / 6;
                Jana j = _Janat[n];
                o.jana = n;
                float2 kulma = KULMAT[vid - n * 6];
                float3 a = j.p1.xyz;
                float3 b = j.p2.xyz;
                float H = Hulli(j);
                float kulj = _Kuljettu[(int)(j.tunnus.z + 0.5)];
                // Karsinta: kello ei ole ehtinyt janaan, tai molemmat päät ovat
                // horisontin takana nelikulmion verran (piste u näkyy, kun u·kamera ≥ 1).
                float raja = 1.0 - H * length(_Kamera);
                if (kulj <= j.p1.w || (dot(a, _Kamera) < raja && dot(b, _Kamera) < raja))
                {
                    o.paikkaCS = float4(0, 0, 0, 1);
                    return o;
                }
                float3 keski = kulma.y < 0.0 ? a : b;
                float3 ab = b - a;
                float pituus = length(ab);
                float3 ylos = normalize(keski);
                float3 suunta = pituus > 1e-7 ? ab / pituus : normalize(cross(ylos, abs(ylos.z) < 0.9 ? float3(0, 0, 1) : float3(1, 0, 0)));
                float3 normaali = normalize(cross(suunta, ylos));
                float3 paikka = keski + normaali * (kulma.x * H) + suunta * (kulma.y * H);
                // Jänteen painuma: kulma pallon pinnan yläpuolelle (webin nosto, säde 1).
                float nosto = length(keski) + (H * H) * 0.5 + 0.001;
                paikka = normalize(paikka) * nosto;
                o.paikkaCS = TransformWorldToHClip(mul(_YksikostaMaailmaan, float4(paikka, 1.0)).xyz);
                return o;
            }

            /* Etäisyys janaan a→b ja projektion parametri t (0…1). */
            float Janaan(float3 q, float3 a, float3 b, out float t)
            {
                float3 ab = b - a;
                float l2 = dot(ab, ab);
                t = l2 > 1e-14 ? saturate(dot(q - a, ab) / l2) : 0.0;
                return length(q - (a + ab * t));
            }

            /* Jana kasvun mukaan katkaistuna; parametri KOKO janalla (t · f). Aloittamaton = kaukana. */
            float Katkaistuun(float3 q, float3 a, float3 b, float ma, float mb, float kulj, out float tKoko)
            {
                tKoko = 0.0;
                if (kulj <= ma) return 1e9;
                float f = mb > ma ? saturate((kulj - ma) / (mb - ma)) : 1.0;
                float t;
                float d = Janaan(q, a, a + (b - a) * f, t);
                tKoko = t * f;
                return d;
            }

            Ulos frag(Vali i)
            {
                Jana j = _Janat[i.jana];
                // Pinnan piste: kameran säde PIKSELIN läpi (käänteinen VP, ei interpoloitu paikka: sama bitteinä
                // jokaiselle saman pikselin fragmentille) leikattuna yksikköpallon kanssa.
                float2 uv = GetNormalizedScreenSpaceUV(i.paikkaCS);
                float3 kaukanaW = ComputeWorldSpacePosition(uv, 0.5, UNITY_MATRIX_I_VP);
                float3 suunta = normalize(mul((float3x3)_MaailmastaYksikkoon, kaukanaW - _WorldSpaceCameraPos));
                float b = dot(_Kamera, suunta);
                float c = dot(_Kamera, _Kamera) - 1.0;
                float disc = b * b - c;
                if (disc < 0.0) discard;
                float t0 = -b - sqrt(disc);
                if (t0 < 0.0) discard;
                float3 q = _Kamera + suunta * t0;

                int vana = (int)(j.tunnus.z + 0.5);
                float kulj = _Kuljettu[vana];
                // OMISTUSSÄÄNTÖ: jana maalaa vain siellä, missä oma jana on lähempänä
                // kuin naapurit — jokainen pikseli kuuluu yhdelle janalle, liitokset pyöreät.
                float t1, t2, t3;
                float d1 = Katkaistuun(q, j.p0.xyz, j.p1.xyz, j.p0.w, j.p1.w, kulj, t1);
                float d2 = Katkaistuun(q, j.p1.xyz, j.p2.xyz, j.p1.w, j.p2.w, kulj, t2);
                float d3 = Katkaistuun(q, j.p2.xyz, j.p3.xyz, j.p2.w, j.p3.w, kulj, t3);
                if (d2 > 1e8) discard;
                if (d1 < d2 - SUVAITSE || d3 < d2 - SUVAITSE) discard;

                float alfa;
                float3 vari;
                if (OnRengas(j))
                {
                    // Kotipesän rengas: kiinteä pikselileveys, ei maskia, pesän väri.
                    alfa = (1.0 - smoothstep(_Rengas.x - _Rengas.y, _Rengas.x + _Rengas.y, d2)) * _VanaPeitto[vana];
                    vari = _RengasVari.rgb;
                }
                else
                {
                    float w = lerp(j.leveys.x, j.leveys.y, t2);
                    float ranta = lerp(j.leveys.z, j.leveys.w, t2);
                    float aika = lerp(j.aikaMeri.x, j.aikaMeri.y, t2);
                    float meri = lerp(j.aikaMeri.z, j.aikaMeri.w, t2);
                    // Maalla leveä ja rantaviivaan leikattu (etäisyys rannasta), merellä kapea.
                    float puoliMaa = max(w, _Leveys.x);
                    float puoliMeri = max(w * _Leveys.w, _Leveys.y);
                    float muotoMaa = 1.0 - smoothstep(puoliMaa - _Leveys.z, puoliMaa, max(0.0, d2 - ranta));
                    float muotoMeri = 1.0 - smoothstep(puoliMeri - _Leveys.z, puoliMeri, d2);
                    float maa = 1.0;
                    if (_Maski.x > 0.5)
                    {
                        // Geodeettinen leveys ja pituus: ECEF = (a' u.x, a' u.y, b' u.z).
                        float lon = atan2(q.y, q.x);
                        float lat = atan2(_Litistys * q.z, length(q.xy));
                        float2 uvMaski = float2(lon / 6.28318530718 + 0.5, 0.5 - lat / 3.14159265359);
                        maa = smoothstep(_Maski.y, _Maski.z, SAMPLE_TEXTURE2D_LOD(_Rantamaski, sampler_Rantamaski, uvMaski, 0).r);
                    }
                    alfa = lerp(muotoMaa * maa, muotoMeri, saturate(meri)) * _Aika.w * _VanaPeitto[vana];

                    // Kärkiväri: karjenPaino (rintama kymmenesosa kellosta); pito ei osu kärjen pyöristysrajaan.
                    float paino = _Aika.y > 0.0 ? saturate(1.0 - (aika - _Aika.x) / _Aika.y) : 0.0;
                    if (_Aika.z > 0.5 && _Aika.x - aika > _Aika.y * PITO_VARA) paino = 0.0;
                    int v0 = (int)(j.tunnus.x + 0.5);
                    int v1 = (int)(j.tunnus.y + 0.5);
                    float3 vanhaVari = lerp(_Vanha[v0].rgb, _Vanha[v1].rgb, t2);
                    float3 kirkasVari = lerp(_Kirkas[v0].rgb, _Kirkas[v1].rgb, t2);
                    vari = lerp(vanhaVari, kirkasVari, paino);
                }
                // Havainnekuvan alue (II): kaista häipyy kuvan alta pehmeästi.
                if (_KuvanHaivytys.x > 0.0)
                {
                    float2 ulko2 = max(_KuvanAlue.xy - uv, uv - _KuvanAlue.zw);
                    float sisalla = 1.0 - smoothstep(-_KuvanHaivytys.y, _KuvanHaivytys.y, max(ulko2.x, ulko2.y));
                    alfa *= 1.0 - _KuvanHaivytys.x * sisalla;
                }
                if (alfa < 0.004) discard;

                // Syvyys pinnan pisteestä kameraa kohti vedettynä (maasto), vahvempi hitusen lähemmäs; peitto
                // portaittain, jotta puolittajan tasapelin kaksi fragmenttia saavat täsmälleen saman syvyyden.
                float porras = floor(alfa * _Syvyys.z) / _Syvyys.z;
                float veto = min(_Syvyys.x + porras * _Syvyys.y, t0 * 0.5);
                float3 qv = q - suunta * veto;
                float4 leike = TransformWorldToHClip(mul(_YksikostaMaailmaan, float4(qv, 1.0)).xyz);
                float z = leike.z / leike.w;
            #if !UNITY_REVERSED_Z && (defined(SHADER_API_GLES3) || defined(SHADER_API_GLCORE))
                z = z * 0.5 + 0.5;
            #endif
                Ulos u;
                u.vari = half4(vari, alfa);
                u.syvyys = z;
                return u;
            }
            ENDHLSL
        }
    }
}
