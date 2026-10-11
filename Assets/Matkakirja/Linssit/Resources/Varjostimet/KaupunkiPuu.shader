// KAUPUNGIN PUUT KORTTEINA (Linssiseppä 10.10.2026; Päätoimittaja 18.5x, juna 181): Unity/KaupunkiPuut.cs piirtää Graphics.RenderPrimitives-
// kutsuilla; puut StructuredBufferista _Puut (16 t: paikallinen ENU-tyvi xyz m + koodi, Ydin PuuRuudukko.Koodi: korkeus 0,25 m, latvus 0,1 m,
// lehti/havu, vaihtelu). Ei tekstuureja (0 Mt): latvus ja lehvästö kohinasta kortin koordinaateissa, alfaleikkaus (ei lajittelua).
//  _PuuTapa 0 = lähipuu 12 kärkeä (latvus 0–5, runko 6–11), 1 = kaukopuu 6 kärkeä (latvus); puu = _PuuAlku + SV_VertexID / kärkiä.
// LATVUS (tuplapuut, PT 10.10.): kameraan kääntyvä kortti (kameran akselit _PuuOikea/_PuuYlos), leveys _PuuParam.z × latvus, korkeus
// sivulta latvuksen korkeus ja ylhäältä latvus; siirretty säteen verran kameraa kohti (koko kerrottu (d − siirto)/d: näytöllä sama), joten
// kortti on Googlen puumöykyn edessä ja peittää sen siluetin. Valo pallonormaalista kuten ElavaKohde (_ElavaAurinko jne.), ilmaperspektiivi
// kuten IlmakehaLaatat (sama kuva kuin laatoilla), sumu MixFogilla. RUNKO: pystyakselin ympäri kääntyvä kapea kortti tyvestä latvukseen.
// MUOTO (11.10., iPad-ajo 181: rungot pitkiä ja ohuita): sama kuin Ydin PuuRuudukko.Muoto: latvus 0,7 × h (havu 0,8), leveys 0,5–1,2 × h
// (havu 0,3–0,6), näkyvä runko ≤ kolmannes; runko 0,045 × h (0,25–1,1 m).
// Häivytys ditheröiden: kaukorajalla (_PuuParam.y, viimeiset 15 %) ja kun kamera on latvuksen sisällä.
// KATUTASON ULKONÄKÖ (11.10., iPad-ajo 182 t03: latvukset yhtenä tasaisena tummana laattana, rungot mustia): yksityiskohta d kasvaa latvuksen
// koosta ruudulla (fwidth: 40 px → 0, 120 px → 1), joten kaukopuut ja pallonäkymä (t01) pysyvät ennallaan. Lähellä: puukohtainen sävy ja
// kirkkaus (vaihtelu = puun paikasta), lehvästökimput (hieno kohina kallistaa normaalia aurinkoon päin), aurinkopuoli vaaleampi ja alapinta
// tummempi, reunan tummuus ja ditheröity epäsäännöllinen reuna (vierekkäiset latvukset erottuvat). Runko ruskeanharmaa lieriö (normaali
// kortin poikki), sama aurinko- ja taivasvalo; ilmaperspektiivi ja sumu kaikille osille kuten laatoilla.
Shader "Matkakirja/Linssit/KaupunkiPuu"
{
    SubShader
    {
        Tags { "RenderType" = "TransparentCutout" "Queue" = "AlphaTest" "RenderPipeline" = "UniversalPipeline" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        struct PuuGpu { float3 p; uint k; };
        StructuredBuffer<PuuGpu> _Puut;
        float4x4 _PuuMatriisi;   // paikallinen ENU (m) → maailma
        float4 _PuuKamera;       // xyz kamera paikallisessa ENU:ssa
        float4 _PuuOikea, _PuuYlos;   // kameran akselit paikallisessa ENU:ssa
        float4 _PuuParam;        // x lähiraja m, y kaukoraja m, z peitto (latvuskortti / latvus)
        float _PuuAlku, _PuuTapa;
        float4 _ElavaAurinko, _ElavaAurinkoVari, _ElavaTaivasYla, _ElavaTaivasAla;

        struct V
        {
            float4 p : SV_POSITION;
            float2 uv : TEXCOORD0;       // latvus: kortti −1,1…1,1 (latvuksen säde = 1); runko: x −1…1, y 0…1
            float4 tieto : TEXCOORD1;    // x osa (0 latvus, 1 runko), y vaihtelu 0–1, z havu 0/1, w häivytys 0–1
            float3 w : TEXCOORD2;        // maailma
            float3 kohti : TEXCOORD3;    // paikallinen suunta latvuksen keskeltä kameraan
            float sumu : TEXCOORD4;
        };

        static const float2 Kulmat[6] = { float2(0, 0), float2(1, 0), float2(1, 1), float2(0, 0), float2(1, 1), float2(0, 1) };

        V PuuVert(uint vid : SV_VertexID)
        {
            uint per = _PuuTapa < 0.5 ? 12u : 6u;
            uint puu = (uint)(_PuuAlku + 0.5) + vid / per;
            uint k = vid % per;
            uint osa = k / 6u;
            float2 kulma = Kulmat[k % 6u];
            PuuGpu P = _Puut[puu];
            float h = (float)(P.k & 255u) * 0.25;
            float l = (float)((P.k >> 8) & 255u) * 0.1;
            float havu = ((P.k >> 16) & 3u) == 2u ? 1.0 : 0.0;
            float vaiht = (float)((P.k >> 18) & 16383u) / 16383.0;
            // Latvus (PuuRuudukko.Muoto): yläosa 0,7 × h (havu 0,8 × h), leveys 0,5–1,2 × h (havu 0,3–0,6 × h); runko ≤ h / 3.
            float latvusK = h * (havu > 0.5 ? 0.8 : 0.7);
            l = havu > 0.5 ? clamp(l, 0.3 * h, 0.6 * h) : clamp(l, 0.5 * h, 1.2 * h);
            float3 tyvi = P.p;
            float3 keski = tyvi + float3(0.0, h - latvusK * 0.5, 0.0);
            keski.xz += sin(_Time.y * 0.9 + vaiht * 40.0) * 0.012 * h * float2(0.8, 0.6);   // tuuli: latvus huojuu hieman
            float3 kohti = _PuuKamera.xyz - keski;
            float d = max(0.01, length(kohti));
            float3 kd = kohti / d;
            float rx = l * 0.5 * _PuuParam.z;
            float ry = lerp(latvusK * 0.5, l * 0.5, abs(kd.y)) * _PuuParam.z;
            float r = max(rx, ry);
            float siirto = clamp(d - r - 1.0, 0.0, r);   // möykyn eteen, kuitenkin kameran eteen
            float sk = (d - siirto) / d;                   // näytön koko ennallaan
            float dt = length(_PuuKamera.xyz - tyvi);
            float hav = saturate((_PuuParam.y - dt) / (0.15 * _PuuParam.y)) * saturate((d - r * 0.5) / max(0.5, r));
            float3 paikka;
            float2 uv;
            if (osa == 0u)
            {
                uv = (kulma * 2.0 - 1.0) * 1.1;
                paikka = keski + kd * siirto + (_PuuOikea.xyz * (uv.x * rx) + _PuuYlos.xyz * (uv.y * ry)) * sk;
            }
            else
            {
                float3 kv = _PuuKamera.xyz - tyvi;
                kv.y = 0.0;
                float3 sivu = dot(kv, kv) > 1e-4 ? normalize(cross(float3(0.0, 1.0, 0.0), kv)) : _PuuOikea.xyz;
                float lev = clamp(h * 0.045, 0.25, 1.1);
                uv = float2(kulma.x * 2.0 - 1.0, kulma.y);
                paikka = tyvi + sivu * (uv.x * lev * 0.5) + float3(0.0, lerp(-0.3, h - latvusK * 0.5, kulma.y), 0.0);
            }
            V o;
            o.w = mul(_PuuMatriisi, float4(paikka, 1.0)).xyz;
            o.p = TransformWorldToHClip(o.w);
            o.uv = uv;
            o.tieto = float4((float)osa, vaiht, havu, hav);
            o.kohti = kd;
            o.sumu = ComputeFogFactor(o.p.z);
            return o;
        }

        float PuuHash(float2 p) { return frac(sin(dot(p, float2(127.1, 311.7))) * 43758.5453); }
        float PuuKohina(float2 p)
        {
            float2 i = floor(p), f = frac(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = PuuHash(i), b = PuuHash(i + float2(1.0, 0.0)), c = PuuHash(i + float2(0.0, 1.0)), e = PuuHash(i + float2(1.0, 1.0));
            return lerp(lerp(a, b, f.x), lerp(c, e, f.x), f.y);
        }
        /// Latvuksen peitto (> 0 = lehvästöä): lehtipuu pyöreä, havupuu suippo (kärki ylhäällä). Reuna kohinasta, keskimäärin hieman
        /// säteen ulkopuolella (möykyn siluetti peittyy); lehti = pienen mittakaavan kohina (kolot ja sävy).
        float PuuLatvus(float2 u, float vaiht, float havu, out float lehti)
        {
            float2 s = vaiht * float2(37.0, 91.0);
            float n1 = PuuKohina(u * 2.5 + s), n2 = PuuKohina(u * 6.0 + s * 1.7);
            lehti = n2;
            float rr = length(u);
            if (havu > 0.5) rr = length(float2(u.x / lerp(0.95, 0.3, saturate(u.y * 0.5 + 0.5)), u.y));
            return 1.05 - rr + (n1 - 0.5) * 0.3 + (n2 - 0.5) * 0.15;
        }
        /// Ruudun kohina (interleaved gradient) 0–1: ditheröinti ilman läpinäkyvyyttä.
        float PuuIgn(float2 p) { return frac(52.9829189 * frac(dot(p, float2(0.06711056, 0.00583715)))); }
        /// Häivytys ilman läpinäkyvyyttä: w = 1 → aina näkyvissä.
        void PuuHaivytys(V i) { clip(i.tieto.w - PuuIgn(i.p.xy) * 0.999 - 0.0005); }
        /// Katutason yksityiskohta 0–1 latvuksen koosta ruudulla (kortti 2,2 uv-yksikköä): alle 40 px 0 (kaukoversio ennallaan), yli 120 px 1.
        float PuuLahi(float2 u)
        {
            float fw = max(fwidth(u.x) + fwidth(u.y), 1e-5);
            return saturate((2.2 / fw - 40.0) / 80.0);
        }
        /// Latvuksen leikkaus: kaukona PuuLatvus sellaisenaan; lähellä lisäksi hieno reunakohina (lehvästön epäsäännöllisyys) ja ditheröity
        /// pehmeä reuna. Kaikki passit samoin (syvyys = väri).
        float PuuLatvusLeikkaus(V i, float d, out float lehti)
        {
            float m = PuuLatvus(i.uv, i.tieto.y, i.tieto.z, lehti);
            float n3 = PuuKohina(i.uv * 13.0 + i.tieto.y * float2(53.0, 17.0));
            return m + d * ((n3 - 0.5) * 0.22 - PuuIgn(i.p.xy) * 0.14);
        }
        void PuuLeikkaa(V i)
        {
            float lehti;
            if (i.tieto.x < 0.5) clip(PuuLatvusLeikkaus(i, PuuLahi(i.uv), lehti));
            else clip(0.95 - abs(i.uv.x));
            PuuHaivytys(i);
        }
        ENDHLSL
        Pass
        {
            Name "KaupunkiPuu"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off
            ZWrite On
            ZTest LEqual
            HLSLPROGRAM
            #pragma vertex PuuVert
            #pragma fragment frag
            #pragma multi_compile_fog
            #pragma target 4.5
            #include "Ilmakeha.hlsl"
            half4 frag(V i) : SV_Target
            {
                float3 l = normalize(_ElavaAurinko.xyz + float3(0.0, 1e-4, 0.0));
                float3 c;
                if (i.tieto.x < 0.5)
                {
                    float lehti;
                    float2 u = i.uv;
                    float d = PuuLahi(u);
                    clip(PuuLatvusLeikkaus(i, d, lehti));
                    float rr = saturate(dot(u, u));
                    float3 nL = u.x * _PuuOikea.xyz + u.y * _PuuYlos.xyz + sqrt(1.0 - rr) * i.kohti;
                    float3 n = normalize(mul((float3x3)_PuuMatriisi, nL));
                    // Lineaarinen perusväri: lehtipuu kellanvihreä, havupuu tumma sinivihreä; sävy ja punaisuus vaihtelevat puittain.
                    float3 pohja = i.tieto.z > 0.5 ? float3(0.045, 0.085, 0.05) : float3(0.075, 0.13, 0.04);
                    pohja *= lerp(0.75, 1.25, i.tieto.y);
                    pohja.r *= lerp(0.8, 1.3, frac(i.tieto.y * 7.0));
                    float sisa = lerp(0.55, 1.0, lehti) * lerp(0.75, 1.0, saturate(u.y * 0.5 + 0.5));   // kolot ja alapinnan varjo
                    float kaari = saturate((dot(n, l) + 0.3) / 1.3);
                    float3 amb = lerp(_ElavaTaivasAla.rgb, _ElavaTaivasYla.rgb, n.y * 0.5 + 0.5);
                    c = pohja * sisa * (amb + _ElavaAurinkoVari.rgb * kaari);
                    if (d > 0.0)
                    {
                        // Katutaso: puukohtainen kirkkaus ja sävy (keltainen ↔ sinertävä), vaaleampi perusväri (vanha oli lähellä mustaa).
                        float v1 = i.tieto.y, v2 = frac(v1 * 13.0), v3 = frac(v1 * 29.0);
                        float3 p2 = i.tieto.z > 0.5 ? float3(0.055, 0.10, 0.06) : float3(0.095, 0.16, 0.045);
                        p2 *= lerp(0.7, 1.3, v3);
                        p2 *= lerp(float3(1.15, 1.05, 0.7), float3(0.85, 0.97, 1.2), v2);
                        // Lehvästökimput: hieno kohina kallistaa normaalia aurinkoon / poispäin → valaistut ja varjoiset kimput.
                        float kimppu = PuuKohina(u * 9.0 + v1 * float2(11.0, 71.0)) * 0.7 + PuuKohina(u * 21.0 + v1 * 5.0) * 0.3;
                        float3 n2 = normalize(n + l * ((kimppu - 0.5) * 1.2));
                        float valo = saturate((dot(n2, l) + 0.15) / 1.15);
                        float ala = lerp(0.4, 1.0, saturate(u.y * 0.55 + 0.6));                 // alapinta tummempi
                        float reuna = lerp(0.65, 1.0, saturate((1.05 - length(u)) * 2.5));      // reuna tummuu: latvukset erottuvat
                        float aukot = lerp(0.45, 1.0, lehti) * lerp(0.75, 1.1, kimppu);
                        float3 c2 = p2 * ala * reuna * aukot * (amb + _ElavaAurinkoVari.rgb * valo * 1.15);
                        c = lerp(c, c2, d);
                    }
                }
                else
                {
                    clip(0.95 - abs(i.uv.x));
                    // Runko: ruskeanharmaa lieriö; normaali kortin poikki (sivu kuten kärkivarjostimessa, kohti kameraa vaakatasossa).
                    float3 kh = float3(i.kohti.x, 0.0, i.kohti.z);
                    kh = dot(kh, kh) > 1e-6 ? normalize(kh) : float3(0.0, 0.0, 1.0);
                    float3 sv = normalize(cross(float3(0.0, 1.0, 0.0), kh));
                    float ux = clamp(i.uv.x / 0.95, -1.0, 1.0);
                    float3 n = normalize(mul((float3x3)_PuuMatriisi, sv * ux + kh * sqrt(1.0 - ux * ux)));
                    float3 amb = lerp(_ElavaTaivasAla.rgb, _ElavaTaivasYla.rgb, 0.5);
                    float kaari = saturate((dot(n, l) + 0.2) / 1.2);
                    float3 kuori = float3(0.13, 0.11, 0.09) * lerp(0.8, 1.15, frac(i.tieto.y * 17.0));
                    c = kuori * (amb + _ElavaAurinkoVari.rgb * kaari) * lerp(0.55, 1.0, saturate(i.uv.y * 1.5));   // tyvi hieman tummempi
                }
                PuuHaivytys(i);
                // Ilmaperspektiivi samoin kuin Googlen laatoilla (IlmakehaLaatat; voima 0 = ilmakehä pois → ei muutosta).
                float3 kw = i.w - _WorldSpaceCameraPos;
                float pit = max(1e-4, length(kw));
                float3 sironta, lapaisy;
                IlmIlmaperspektiivi(pit * _IlmMaailma.x, kw / pit, sironta, lapaisy);
                c = lerp(c, c * lapaisy + IlmSavytys(sironta * _IlmParam.y), _IlmParam.z);
                return half4(MixFog((half3)c, i.sumu), 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            Cull Off
            ZWrite On
            ColorMask R
            HLSLPROGRAM
            #pragma vertex PuuVert
            #pragma fragment frag
            #pragma target 4.5
            half frag(V i) : SV_Target { PuuLeikkaa(i); return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthNormals"
            Tags { "LightMode" = "DepthNormals" }
            Cull Off
            ZWrite On
            // URP:n DepthNormals-esipassi (SSAO, yövalojen syvyys) kuten ElavaKohde: puut _CameraDepthTextureen.
            HLSLPROGRAM
            #pragma vertex PuuVert
            #pragma fragment frag
            #pragma target 4.5
            half4 frag(V i) : SV_Target
            {
                PuuLeikkaa(i);
                return half4(normalize(_WorldSpaceCameraPos - i.w), 0.0);
            }
            ENDHLSL
        }
    }
}
