// KAUPUNGIN YÖVALOT v2 (kuvanlaatujärjestys kohta 2, Linssiseppä 6.10.2026; omistaja: natrium-oranssi): koko ruudun passi
// jälkikäsittelyn jälkeen (valot eivät tummu yön valotuksessa). Ruudun pisteen paikka syvyydestä → paikallinen ENU (metriä,
// CesiumGeoreferencen origo) → asteet → Black Marble -ruudukko (_Valot, 3 × 3 astetta, R8) = valojen tiheys.
// v1 (simu 6.10. 21.5x) peitti Pariisin tasaiseen oranssiin (Black Marble saturoituu koko kaupungissa) ja piirsi reunoihin
// viivoja (derivaatat syvyyden epäjatkuvuuksissa). v2:
//  - paikka ja normaali naapuripikseleistä lyhyemmältä puolelta (reuna ei vuoda), pikselin koko maassa samoin,
//  - valosaaste: heikko lämmin nosto (_ValoParam.y),
//  - katuvalot vain ylöspäin osoittaville pinnoille (kadut, aukiot; Pariisin viistot katot eivät),
//  - ikkunat pystypinnoille: 3,2 × 3,0 m:n ruudukko, osa palaa (tiheys Black Marblesta), kaukana keskiarvo pehmeänä,
//  - Black Marble -arvo loivennetaan (saturoitunut keskusta ≈ 0,7), joten kaupungin sisällä on vielä vaihtelua.
// v3: valot vain tasaisille pinnoille (ei puiden latvoja eikä reunoja), valosaaste 0,07.
// Taivas (syvyys kaukotasossa) ohitetaan. KaupunkiYovalot.cs kytkee passin FullScreenPassRendererFeaturena vain yöllä.
Shader "Matkakirja/Linssit/KaupunkiYovalot"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" }
        ZWrite Off Cull Off ZTest Always
        Pass
        {
            Name "Yovalot"
            HLSLPROGRAM
            #pragma vertex Vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl"
            #include "Packages/com.unity.render-pipelines.core/Runtime/Utilities/Blit.hlsl"

            TEXTURE2D(_Valot); SAMPLER(sampler_Valot);
            float4x4 _MaailmaPaikallinen;   // Unityn maailma → paikallinen ENU (m): x itä, y ylös, z pohjoinen
            float4 _ValoAlue;               // x = ruudukon lounaiskulman lon, y = lat, z = origon lat, w = origon lon
            float4 _ValoParam;              // x = osuus 0–1, y = valosaaste, z = katuvalot, w = solukoko (m)
            float4 _ValoVari;               // natrium (rgb), a = valkoisten LED-pisteiden osuus
            float4 _IkkunaParam;            // x = ikkunoiden voima, y = palavien osuus enintään

            float3 Hash32(float2 p)
            {
                float3 p3 = frac(float3(p.xyx) * float3(0.1031, 0.1030, 0.0973));
                p3 += dot(p3, p3.yxz + 33.33);
                return frac((p3.xxy + p3.yzz) * p3.zyx);
            }

            float BlackMarble(float3 paikka)
            {
                const float R = 6371000.0, ASTE = 57.2957795;
                float lat = _ValoAlue.z + paikka.z / R * ASTE;
                float lon = _ValoAlue.w + paikka.x / (R * cos(_ValoAlue.z / ASTE)) * ASTE;
                float2 uv = float2((lon - _ValoAlue.x) / 3.0, (lat - _ValoAlue.y) / 3.0);
                if (any(uv < 0.0) || any(uv > 1.0)) return 0.0;
                float v = SAMPLE_TEXTURE2D_LOD(_Valot, sampler_Valot, uv, 0).r;
                return 0.7 * v / (0.3 + 0.7 * v);   // loiva käyrä: 1 → 0,7; 0,1 → 0,19
            }

            float3 Paikka(float2 uv)
            {
                float d = SampleSceneDepth(uv);
                return mul(_MaailmaPaikallinen, float4(ComputeWorldSpacePosition(uv, d, UNITY_MATRIX_I_VP), 1.0)).xyz;
            }

            half4 frag(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                float2 uv = i.texcoord, px = _BlitTexture_TexelSize.xy;
                half4 c = SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_PointClamp, uv, 0);
                float syvyys = SampleSceneDepth(uv);
                #if UNITY_REVERSED_Z
                if (syvyys <= 1e-7) return c;
                #else
                if (syvyys >= 1.0 - 1e-7) return c;
                #endif
                float3 p = mul(_MaailmaPaikallinen, float4(ComputeWorldSpacePosition(uv, syvyys, UNITY_MATRIX_I_VP), 1.0)).xyz;
                float bm = BlackMarble(p);
                if (bm <= 0.01) return c;

                // Naapurit: lyhyempi ero kummaltakin akselilta (reunalla pitkä ero on toisen pinnan puolella).
                float3 pr = Paikka(uv + float2(px.x, 0)), pl = Paikka(uv - float2(px.x, 0));
                float3 pu = Paikka(uv + float2(0, px.y)), pd = Paikka(uv - float2(0, px.y));
                float3 dx = length(pr - p) < length(p - pl) ? pr - p : p - pl;
                float3 dy = length(pu - p) < length(p - pd) ? pu - p : p - pd;
                float3 n = normalize(cross(dy, dx));
                if (n.y < 0.0) n = -n;                                   // ylöspäin (kamera on yleensä yläpuolella)
                float jalanjalki = max(length(dx), length(dy));          // pikselin koko pinnalla (m)
                // Tasaisuus (v3, simu 22.2x: puiden latvoihin syttyi ikkunoita, nurmelle katuvaloja): seinä ja katu ovat tasaisia
                // (peräkkäiset erot samansuuntaisia), lehvästö ja reunat eivät. Valot vain tasaisille pinnoille.
                float sx = dot(normalize(pr - p + 1e-6), normalize(p - pl + 1e-6)), sy = dot(normalize(pu - p + 1e-6), normalize(p - pd + 1e-6));
                float tasainen = saturate((min(sx, sy) - 0.94) / 0.05);
                tasainen = lerp(tasainen, 1.0, saturate((jalanjalki - 2.0) / 4.0));   // kaukana (pikseli > 2–6 m) mattoa ei karsita
                if (tasainen <= 0.0) return half4(c.rgb + (half3)(_ValoVari.rgb * bm * bm * _ValoParam.y * _ValoParam.x), c.a);

                float3 lisa = _ValoVari.rgb * bm * bm * _ValoParam.y;  // valosaaste

                // Katuvalot vaakapinnoille.
                float vaaka = saturate((n.y - 0.82) / 0.1);
                float solu = _ValoParam.w;
                float nakyvyys = saturate(2.0 - jalanjalki * 2.5 / solu);
                if (vaaka > 0.0 && nakyvyys > 0.0)
                {
                    float2 q = p.xz / solu, ci = floor(q);
                    float sade = max(1.1, jalanjalki * 0.75) / solu;
                    float pisteet = 0.0; float3 pv = 0.0;
                    for (int y = -1; y <= 1; y++)
                    for (int x = -1; x <= 1; x++)
                    {
                        float2 s = ci + float2(x, y);
                        float3 h = Hash32(s);
                        if (h.z > bm) continue;
                        float2 d = q - (s + 0.15 + 0.7 * h.xy);
                        float w = exp(-dot(d, d) / (sade * sade));
                        float led = step(1.0 - _ValoVari.a, frac(h.z * 7.13));
                        pisteet += w;
                        pv += w * lerp(_ValoVari.rgb, float3(0.95, 0.97, 1.0), led);
                    }
                    lisa += pv * vaaka * nakyvyys * tasainen * _ValoParam.z;
                }

                // Ikkunat pystypinnoille: julkisivun vaakasuunta × korkeus, 3,2 × 3,0 m.
                float pysty = saturate((0.35 - abs(n.y)) / 0.2);
                if (pysty > 0.0)
                {
                    float2 t = normalize(float2(-n.z, n.x) + 1e-5);
                    float2 w = float2(dot(p.xz, t) / 3.2, p.y / 3.0);
                    float2 wi = floor(w), wf = frac(w);
                    float3 h = Hash32(wi + 17.0);
                    float palaa = step(h.x, bm * _IkkunaParam.y);
                    float ikkuna = step(0.28, wf.x) * step(wf.x, 0.72) * step(0.3, wf.y) * step(wf.y, 0.82);
                    float terava = saturate(2.0 - jalanjalki * 2.0 / 1.2);       // ikkuna (~1,2 m) yli puolen pikselin
                    float keski = bm * _IkkunaParam.y * 0.23;                     // kaukana: palavien osuus × ikkunan ala
                    float3 iv = lerp(float3(1.0, 0.72, 0.42), float3(1.0, 0.88, 0.70), h.y);
                    lisa += iv * pysty * tasainen * _IkkunaParam.x * (0.6 + 0.4 * h.z) * lerp(keski, palaa * ikkuna, terava);
                }
                return half4(c.rgb + (half3)(lisa * _ValoParam.x), c.a);
            }
            ENDHLSL
        }
    }
}
