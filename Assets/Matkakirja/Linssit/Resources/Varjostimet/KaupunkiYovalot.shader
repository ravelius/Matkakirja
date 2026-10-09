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
// v4 (Päätoimittaja 22.3x: "pisteet näyttävät kohinalta"): katuvalot OSM-katujen maskista (_Tiet, KaupunkiTiet) nauhoina ja
// lamppuina vain kaduilla; ei pisteitä katoille eikä Black Marblen mukaan; kohteen kultainen valonheitto (_KohdeP); utu 0,04.
// v6 (Linssiseppä 9.10., kehityskaupungit): kierroksen muut maamerkit julkisivuvalolla (_Maamerkit, maasta ylöspäin hiipuva lämmin
// valo) ja veden heijastukset vesimaskin (_Vedet) vedellä: rantavalot katsesuunnassa (Black Marble maalla 25–300 m edempänä) ja
// valaistujen maamerkkien kultaiset juovat; aaltojen välke (venytetty kohina katsesuuntaan), fresnel loivassa kulmassa.
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
            // Kaupunkikameran käänteinen näkymä-projektio ja paikka (KaupunkiPassi asettaa): passi on jälkikäsittelyn jälkeen, jolloin
            // URP:n UNITY_MATRIX_I_VP ja _WorldSpaceCameraPos eivät enää ole kaupunkikameran (9.10. simu: maailmanpaikka tyhjä).
            float4x4 _KaupunkiInvVP;
            float4 _KaupunkiKamera;
            TEXTURE2D(_KaupunkiSyvyys);   // kameran syvyyden kopio läpinäkyvien jälkeen (KaupunkiPassi)
            float KaupunkiSyvyys(float2 uv) { return SAMPLE_TEXTURE2D_LOD(_KaupunkiSyvyys, sampler_PointClamp, uv, 0).r; }

            TEXTURE2D(_Valot); SAMPLER(sampler_Valot);
            float4x4 _MaailmaPaikallinen;   // Unityn maailma → paikallinen ENU (m): x itä, y ylös, z pohjoinen
            float4 _ValoAlue;               // x = ruudukon lounaiskulman lon, y = lat, z = origon lat, w = origon lon
            float4 _ValoParam;              // x = osuus 0–1, y = valosaaste, z = katuvalot, w = solukoko (m)
            float4 _ValoVari;               // natrium (rgb), a = valkoisten LED-pisteiden osuus
            float4 _IkkunaParam;            // x = ikkunoiden voima, y = palavien osuus enintään
            TEXTURE2D(_Tiet); SAMPLER(sampler_Tiet);
            float4 _TieAlue;                // x = keskipisteen lat, y = lon, z = sivu (m), w = 1 jos kadut ladattu
            float4 _KohdeP;                 // kohteen maapiste paikallisessa ENU:ssa (m), w = 1 jos kohde
            float4 _KohdeParam;             // x = säde (m), y = voima
            TEXTURE2D(_Vedet); SAMPLER(sampler_Vedet);
            float4 _VesiAlue;               // x = keskipisteen lat, y = lon, z = sivu (m), w = heijastuksen voima (0 = ei maskia)
            float4 _Vedet_TexelSize;        // v12: 1/N, 1/N, N, N
            float4 _LamppuParam;            // v12 OSM-lamput vesimaskissa (G lamppu, B paikka solussa, A alue): x = 1 käytössä, y = alueiden voima
            float4 _KameraP;                // kamera paikallisessa ENU:ssa (m)
            float4 _Maamerkit[8];           // xyz = maapiste paikallisessa ENU:ssa, w = säde (m); w = 0 tyhjä
            float4 _MaamerkkiParam;         // x = määrä, y = voima
            float4 _ValoDebug;              // x: 0 = normaali, 1 = passin tunniste (violetti), 2 = maailmanpaikka, 3 = Black Marble, 4 = lisävalo × 5; y = valotuksen kompensointi

            float3 Hash32(float2 p)
            {
                float3 p3 = frac(float3(p.xyx) * float3(0.1031, 0.1030, 0.0973));
                p3 += dot(p3, p3.yxz + 33.33);
                return frac((p3.xxy + p3.yzz) * p3.zyx);
            }

            float4 _IlmSaa;                 // LS2 (KaupunkiIlmakeha, globaali): x = katujen märkyys 0–1 (kuuro ja sää, kuivuu hitaasti)

            // Katulamput solukossa (sama kaava kuin katuvaloissa): solun piste, gauss-säde ja LED-osuus.
            float3 Lamput(float2 xz, float solu, float sade)
            {
                float2 q = xz / solu, ci = floor(q); float3 l = 0.0;
                for (int y = -1; y <= 1; y++)
                for (int x = -1; x <= 1; x++)
                {
                    float2 sc = ci + float2(x, y);
                    float3 h = Hash32(sc);
                    float2 d = q - (sc + 0.2 + 0.6 * h.xy);
                    l += exp(-dot(d, d) / (sade * sade)) * lerp(_ValoVari.rgb, float3(0.95, 0.97, 1.0), step(1.0 - _ValoVari.a, frac(h.z * 7.13)));
                }
                return l;
            }

            // Pehmeä arvokohina (v11: soluittainen hash näkyi Tukholman vedellä matalasta kulmasta ruudukkona, LS2:n kuva 9.10.).
            float Kohina(float2 q)
            {
                float2 i = floor(q), f = frac(q); f = f * f * (3.0 - 2.0 * f);
                float a = Hash32(i).x, b = Hash32(i + float2(1, 0)).x, c = Hash32(i + float2(0, 1)).x, d = Hash32(i + float2(1, 1)).x;
                return lerp(lerp(a, b, f.x), lerp(c, d, f.x), f.y);
            }

            static const float MAA_R = 6371000.0, ASTE = 57.2957795;

            float2 Asteet(float3 paikka)
            {
                return float2(_ValoAlue.z + paikka.z / MAA_R * ASTE, _ValoAlue.w + paikka.x / (MAA_R * cos(_ValoAlue.z / ASTE)) * ASTE);
            }

            float BlackMarble(float3 paikka)
            {
                float2 ll = Asteet(paikka); float lat = ll.x, lon = ll.y;
                float2 uv = float2((lon - _ValoAlue.x) / 3.0, (lat - _ValoAlue.y) / 3.0);
                if (any(uv < 0.0) || any(uv > 1.0)) return 0.0;
                float v = SAMPLE_TEXTURE2D_LOD(_Valot, sampler_Valot, uv, 0).r;
                return 0.7 * v / (0.3 + 0.7 * v);   // loiva käyrä: 1 → 0,7; 0,1 → 0,19
            }

            float Vesi(float3 paikka)
            {
                if (_VesiAlue.w <= 0.0) return 0.0;
                float2 ll = Asteet(paikka);
                float2 m = float2((ll.y - _VesiAlue.y) * MAA_R * cos(_VesiAlue.x / ASTE) / ASTE, (ll.x - _VesiAlue.x) * MAA_R / ASTE);
                float2 vuv = m / _VesiAlue.z + 0.5;
                if (any(vuv < 0.0) || any(vuv > 1.0)) return 0.0;
                return SAMPLE_TEXTURE2D_LOD(_Vedet, sampler_Vedet, vuv, 0).r;
            }

            float2 VesiUv(float3 paikka)
            {
                float2 ll = Asteet(paikka);
                float2 m = float2((ll.y - _VesiAlue.y) * MAA_R * cos(_VesiAlue.x / ASTE) / ASTE, (ll.x - _VesiAlue.x) * MAA_R / ASTE);
                return m / _VesiAlue.z + 0.5;
            }

            // v12 OSM-LAMPUT (Karttasepän katuvalot, valaistut tiet ja sillat, rantavalot; tyokalut/yovalot_lamput.py): 3 × 3 solua (8 m)
            // ympäriltä, lamppu solun G:ssä ja paikka B:ssä (x ylänelikko, y alanelikko, (v + 0,5) / 16 solun lounaiskulmasta). Gauss-säde m.
            float3 OsmLamput(float2 vuv, float sadeM)
            {
                float2 N = _Vedet_TexelSize.zw; float solu = _VesiAlue.z * _Vedet_TexelSize.x;
                float2 q = vuv * N, ci = floor(q); float3 l = 0.0;
                for (int y = -1; y <= 1; y++)
                for (int x = -1; x <= 1; x++)
                {
                    int2 sc = int2(ci) + int2(x, y);
                    if (any(sc < 0) || any(sc >= int2(N))) continue;
                    float4 t = LOAD_TEXTURE2D_LOD(_Vedet, sc, 0);
                    if (t.g < 0.5) continue;
                    uint bb = (uint)round(t.b * 255.0);
                    float2 d = (q - (float2(sc) + (float2(bb >> 4, bb & 15u) + 0.5) / 16.0)) * solu;
                    float3 h = Hash32(float2(sc));
                    l += exp(-dot(d, d) / (sadeM * sadeM)) * lerp(_ValoVari.rgb, float3(0.95, 0.97, 1.0), step(1.0 - _ValoVari.a, frac(h.z * 7.13)));
                }
                return l;
            }

            float3 Paikka(float2 uv)
            {
                float d = KaupunkiSyvyys(uv);
                return mul(_MaailmaPaikallinen, float4(ComputeWorldSpacePosition(uv, d, _KaupunkiInvVP), 1.0)).xyz;
            }

            // NaN/inf bittitasolla (Metalin nopea matematiikka poistaa isnan-tarkistukset; 9.10. simu: yö mustana suojasta huolimatta).
            bool Huono(float3 x) { return any((asuint(x) & 0x7fffffffu) >= 0x7f800000u); }

            half4 frag(Varyings i) : SV_Target
            {
                UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i);
                float2 uv = i.texcoord, px = _BlitTexture_TexelSize.xy;
                half4 c = SAMPLE_TEXTURE2D_X_LOD(_BlitTexture, sampler_PointClamp, uv, 0);
                if (_ValoDebug.x > 8.5 && _ValoDebug.x < 9.5) return c;   // 9: läpivienti (onko kaupunki jo ennen passia musta)
                if (_ValoDebug.x > 0.5 && _ValoDebug.x < 1.5) return half4(c.rgb * 0.5h + half3(0.5h, 0.0h, 0.5h), 1.0h);
                float syvyys = KaupunkiSyvyys(uv);
                if (_ValoDebug.x > 4.5 && _ValoDebug.x < 5.5) return half4(syvyys > 1e-7 && syvyys < 1.0 - 1e-7 ? half3(0.0h, 1.0h, 0.0h) : half3(1.0h, 0.0h, 0.0h), 1.0h);   // 5: syvyys (vihreä = on)
                if (_ValoDebug.x > 5.5 && _ValoDebug.x < 6.5) return half4((half3)frac(syvyys * 200.0), 1.0h);   // 6: syvyyden arvo
                #if UNITY_REVERSED_Z
                if (syvyys <= 1e-7) return c;
                #else
                if (syvyys >= 1.0 - 1e-7) return c;
                #endif
                float3 pw = ComputeWorldSpacePosition(uv, syvyys, _KaupunkiInvVP);
                if (distance(pw, _KaupunkiKamera.xyz) < 30.0) return c;   // päällyskameran kori ja kupu (v8: passi myös niille)
                float3 p = mul(_MaailmaPaikallinen, float4(pw, 1.0)).xyz;
                if (_ValoDebug.x > 1.5 && _ValoDebug.x < 2.5) return half4((half3)frac(float3(p.x / 200.0, p.y / 50.0, p.z / 200.0)), 1.0h);
                float bm = BlackMarble(p);
                if (_ValoDebug.x > 2.5 && _ValoDebug.x < 3.5) return half4((half3)saturate(bm * 2.0), 1.0h);
                if (bm <= 0.01 && _KohdeP.w < 0.5 && _MaamerkkiParam.x < 0.5) return c;   // ei valoja eikä ikkunoita

                // Naapurit: lyhyempi ero kummaltakin akselilta (reunalla pitkä ero on toisen pinnan puolella).
                float3 pr = Paikka(uv + float2(px.x, 0)), pl = Paikka(uv - float2(px.x, 0));
                float3 pu = Paikka(uv + float2(0, px.y)), pd = Paikka(uv - float2(0, px.y));
                float3 dx = length(pr - p) < length(p - pl) ? pr - p : p - pl;
                float3 dy = length(pu - p) < length(p - pd) ? pu - p : p - pd;
                float3 nr = cross(dy, dx);   // rappeutunut (naapurit samassa pisteessä) → ylös, ei NaN:ia (9.10. simu: yö mustana)
                float3 n = dot(nr, nr) > 1e-12 ? nr * rsqrt(dot(nr, nr)) : float3(0.0, 1.0, 0.0);
                if (n.y < 0.0) n = -n;                                   // ylöspäin (kamera on yleensä yläpuolella)
                float jalanjalki = max(length(dx), length(dy));          // pikselin koko pinnalla (m)
                // Tasaisuus (v3, simu 22.2x: puiden latvoihin syttyi ikkunoita, nurmelle katuvaloja): seinä ja katu ovat tasaisia
                // (peräkkäiset erot samansuuntaisia), lehvästö ja reunat eivät. Valot vain tasaisille pinnoille.
                float sx = dot(normalize(pr - p + 1e-6), normalize(p - pl + 1e-6)), sy = dot(normalize(pu - p + 1e-6), normalize(p - pd + 1e-6));
                float tasainen = saturate((min(sx, sy) - 0.97) / 0.025);   // v5: tiukempi (puiden kipinät)
                tasainen = lerp(tasainen, 1.0, saturate((jalanjalki - 2.0) / 4.0));   // kaukana (pikseli > 2–6 m) mattoa ei karsita

                float3 lisa = _ValoVari.rgb * bm * bm * _ValoParam.y;  // valosaaste
                // KAUKAISET VALOT (v7, Päätoimittaja 9.10.: filmikuvissa horisonttiin katsottaessa kaupunki oli musta, B163:n alaspäin
                // katsovassa kuvassa valot näkyivät): kun pikseli on pinnalla yli ~2–10 m, katulamput (nakyvyys), ikkunat (terava) ja
                // katunauhan normaalit (vaaka, kohinainen syvyys) häviävät, ja jäljelle jäi vain himmeä valosaaste. Kaukana Black Marblen
                // säteily piirretään valopisteiden keskiarvona (lamput + ikkunat yhteensä), joten kaupunki hehkuu horisonttiin asti.
                float kauko = saturate((jalanjalki - 2.0) / 8.0);
                lisa += _ValoVari.rgb * bm * kauko * _ValoParam.z * 0.35;

                // Katuvalot OSM-katujen mukaan (v4): maski kaduista; vaakapinnoilla valonauha (katu valaistu) ja lamput nauhan keskellä.
                float vaaka = saturate((n.y - 0.82) / 0.1) * tasainen;
                // v12: OSM-lamput vesimaskin alueella (oikeat paikat); muualla solukon lamput katumaskin mukaan kuten ennen.
                float2 vuvL = _LamppuParam.x > 0.5 ? VesiUv(p) : float2(-1.0, -1.0);
                bool osmL = all(vuvL > 0.002) && all(vuvL < 0.998);
                float sadeL = max(1.0, jalanjalki * 0.75), nakyvyysL = saturate(2.0 - jalanjalki * 2.5 / _ValoParam.w);
                if (vaaka > 0.0 && _TieAlue.w > 0.5)
                {
                    float2 ll = Asteet(p);
                    float2 m = float2((ll.y - _TieAlue.y) * MAA_R * cos(_TieAlue.x / ASTE) / ASTE, (ll.x - _TieAlue.x) * MAA_R / ASTE);
                    float2 tuv = m / _TieAlue.z + 0.5;
                    if (all(tuv > 0.0) && all(tuv < 1.0))
                    {
                        // Mipit kaukana (katujen tiheys); gradientit naapuripikseleistä (ei ddx:ää haarassa).
                        float tie = SAMPLE_TEXTURE2D_GRAD(_Tiet, sampler_Tiet, tuv, dx.xz / _TieAlue.z, dy.xz / _TieAlue.z).r;
                        float3 nauha = _ValoVari.rgb * tie * 0.16;   // v5: nauha himmeämmäksi (simu 22.5x: "neonputket")
                        // Lamput: solun piste palaa vain, jos se osuu kadulle (pikseli kadulla ja lähellä pistettä).
                        float solu = _ValoParam.w, nakyvyys = saturate(2.0 - jalanjalki * 2.5 / solu);
                        float3 lamput = 0.0;
                        if (nakyvyys > 0.0 && tie > 0.35 && !osmL)
                        {
                            float2 q = p.xz / solu, ci = floor(q);
                            float sade = max(1.0, jalanjalki * 0.75) / solu;
                            for (int y = -1; y <= 1; y++)
                            for (int x = -1; x <= 1; x++)
                            {
                                float2 sc = ci + float2(x, y);
                                float3 h = Hash32(sc);
                                float2 d = q - (sc + 0.2 + 0.6 * h.xy);
                                float w = exp(-dot(d, d) / (sade * sade));
                                float led = step(1.0 - _ValoVari.a, frac(h.z * 7.13));
                                lamput += w * lerp(_ValoVari.rgb, float3(0.95, 0.97, 1.0), led);
                            }
                            lamput *= nakyvyys * saturate((tie - 0.35) / 0.3);
                        }
                        lisa += (nauha + lamput * _ValoParam.z) * vaaka;
                        // MÄRÄT KADUT (junan 171 erä; märkyys ja tummuminen LS2:n IlmakehaLaatoissa): katulamppujen heijastus juovana kohti
                        // kameraa. Maan pikseliin heijastuu katsesuunnassa kauempana oleva lamppu: näytteet 0,3–1,6 solun päästä.
                        float mark = _IlmSaa.x;
                        if (mark > 0.02 && tie > 0.2 && nakyvyys > 0.0)
                        {
                            float2 vk = normalize(p.xz - _KameraP.xz + 1e-4);
                            float sadeH = max(1.0, jalanjalki * 0.75) / solu * 1.6;
                            float3 heijL = 0.0;
                            [unroll] for (int k = 0; k < 4; k++)
                            {
                                float sk = solu * (0.3 + 0.43 * k);
                                float tie2 = SAMPLE_TEXTURE2D_LOD(_Tiet, sampler_Tiet, tuv + vk * sk / _TieAlue.z, 0).r;
                                float3 lk = osmL ? OsmLamput(VesiUv(p + float3(vk.x * sk, 0.0, vk.y * sk)), sadeH * solu) : Lamput(p.xz + vk * sk, solu, sadeH);
                                heijL += lk * saturate((tie2 - 0.35) / 0.3) * (1.0 - 0.2 * k);
                            }
                            lisa += heijL * _ValoParam.z * mark * 0.3 * vaaka * nakyvyys;
                        }
                    }
                }

                // v12 OSM-lamput ja valaistut alueet (kentät valkoisina LED-valoina, kohteet himmeämmin) vaakapinnoille. Katot katujen
                // päällä karsitaan katumaskilla (lamppu on jalkakäytävällä, maski LOD 1 ≈ 12 m), jos kadut on ladattu.
                if (osmL && vaaka > 0.0)
                {
                    float katu = 1.0;
                    if (_TieAlue.w > 0.5)
                    {
                        float2 ll = Asteet(p);
                        float2 m = float2((ll.y - _TieAlue.y) * MAA_R * cos(_TieAlue.x / ASTE) / ASTE, (ll.x - _TieAlue.x) * MAA_R / ASTE);
                        float2 tuv = m / _TieAlue.z + 0.5;
                        // v12b (simu 01.09: rantojen ja jalkakäytävien lamput jäivät maskin ulkopuolelle): katon karsinta vain puoliksi.
                        if (all(tuv > 0.0) && all(tuv < 1.0)) katu = 0.5 + 0.5 * saturate((SAMPLE_TEXTURE2D_LOD(_Tiet, sampler_Tiet, tuv, 1).r - 0.05) / 0.15);
                    }
                    // v12b: säde × 1,3 (OSM-lamppuja ~28 m välein, solukossa 18 m; simu 01.09: himmeämpi kuin ennen)
                    if (nakyvyysL > 0.0) lisa += OsmLamput(vuvL, sadeL * 1.3) * nakyvyysL * katu * _ValoParam.z * vaaka;
                    float alue = SAMPLE_TEXTURE2D_GRAD(_Vedet, sampler_Vedet, vuvL, dx.xz / _VesiAlue.z, dy.xz / _VesiAlue.z).a;
                    lisa += float3(0.9, 0.93, 1.0) * alue * 0.1 * _LamppuParam.y * vaaka;
                }

                // Kohteen paino (valonheitto alla); kohteessa ei ikkunoita (v5: Eiffelin ristikkoon syttyi ikkunoita).
                float wKohde = 0.0;
                if (_KohdeP.w > 0.5)
                {
                    float2 dk = p.xz - _KohdeP.xz;
                    wKohde = exp(-dot(dk, dk) / (_KohdeParam.x * _KohdeParam.x)) * saturate((p.y - _KohdeP.y + 4.0) / 4.0);
                }
                // Ikkunat pystypinnoille: julkisivun vaakasuunta × korkeus, 3,2 × 3,0 m.
                float pysty = saturate((0.35 - abs(n.y)) / 0.2) * (1.0 - saturate(wKohde * 3.0));
                // ILTAIKKUNAT (v11, junan 171 erä): ikkunat omana summanaan iltaikkunoiden osuudella (_IkkunaParam.z), joka alkaa ennen
                // katuvaloja; palavien osuus kasvaa illan mittaan (valot syttyvät vähitellen), neon vasta yöllä.
                float3 ikk = 0.0; float osI = _IkkunaParam.z;
                if (pysty > 0.0)
                {
                    float2 t = normalize(float2(-n.z, n.x) + 1e-5);
                    float2 w = float2(dot(p.xz, t) / 3.2, p.y / 3.0);
                    float2 wi = floor(w), wf = frac(w);
                    float3 h = Hash32(wi + 17.0);
                    float palaa = step(h.x, bm * _IkkunaParam.y * osI);
                    float ikkuna = step(0.28, wf.x) * step(wf.x, 0.72) * step(0.3, wf.y) * step(wf.y, 0.82);
                    float terava = saturate(2.0 - jalanjalki * 2.0 / 1.2);       // ikkuna (~1,2 m) yli puolen pikselin
                    float keski = bm * _IkkunaParam.y * osI * 0.23;                   // kaukana: palavien osuus × ikkunan ala
                    float3 iv = lerp(float3(1.0, 0.72, 0.42), float3(1.0, 0.88, 0.70), h.y);
                    // VALOMAINOKSET (v7, Päätoimittaja 9.10. iltavalot): harva palava ikkuna värillisenä neonina, joka välkkyy hitaasti.
                    float neon = step(h.z, 0.035) * palaa * _ValoParam.x;
                    float3 nv = h.y < 0.33 ? float3(1.0, 0.2, 0.55) : (h.y < 0.66 ? float3(0.2, 0.85, 1.0) : float3(1.0, 0.35, 0.15));
                    float valke = 0.75 + 0.25 * sin(_Time.y * (2.0 + 5.0 * h.x) + h.y * 40.0);
                    iv = lerp(iv, nv * 1.8 * valke, neon);
                    ikk = iv * pysty * tasainen * _IkkunaParam.x * (0.6 + 0.4 * h.z) * lerp(keski, palaa * ikkuna, terava) * (0.5 + 0.5 * osI);
                }
                // v6 veden heijastukset: vaakapinta vesimaskissa; rantavalot ja maamerkit katsesuunnassa juovina.
                float vesi = _VesiAlue.w > 0.0 ? Vesi(p) * saturate((n.y - 0.9) / 0.08) : 0.0;
                lisa *= 1.0 - 0.75 * saturate(vesi);   // v10: valosaaste ei sävytä vettä ruskeaksi (Tukholma 9.10.); vedellä vain heijastukset
                if (vesi > 0.01)
                {
                    float3 kohti = p - _KameraP.xyz; float et = length(kohti);
                    float2 v = normalize(kohti.xz + 1e-4), poikki = float2(-v.y, v.x);
                    float cosv = saturate(-kohti.y / max(et, 1.0));
                    float fresnel = 0.12 + 0.38 * pow(1.0 - cosv, 3.0);   // v11: enintään 0,5 (LS2:n vesi heijastaa jo taivaan; matalalla lahti tasaisen kultainen)
                    // Aaltojen välke: kohina venytettynä katsesuuntaan (juovat kohti kameraa), liikkuu ajassa.
                    float2 q = float2(dot(p.xz, poikki) / 2.5, dot(p.xz, v) / 14.0 + _Time.y * 0.9);
                    float kn = Kohina(q);
                    float valke = saturate(kn * 1.8 - 0.5) * (0.7 + 0.3 * sin(_Time.y * 2.3 + kn * 6.28));
                    float ranta = 0.0;
                    [unroll] for (int k = 0; k < 4; k++)
                    {
                        float s = 25.0 * exp2((float)k * 1.25);   // 25, 60, 141, 336 m
                        float3 q3 = p + float3(v.x * s, 0.0, v.y * s);
                        // v12: OSM-lamppujen tiheys (LOD 2 ≈ 32 m; sillat mukana) maskin alueella, muuten Black Marble rannalta.
                        float2 vq = VesiUv(q3);
                        float rl = osmL && all(vq > 0.0) && all(vq < 1.0)
                            ? saturate(SAMPLE_TEXTURE2D_LOD(_Vedet, sampler_Vedet, vq, 2).g * 8.0) * 0.7   // v12b: × 3 → × 8 (rantaketju 28 m ≈ 0,06 LOD 2:ssa; Black Marble ~0,5)
                            : BlackMarble(q3) * (1.0 - Vesi(q3));
                        ranta = max(ranta, rl / (1.0 + s / 250.0));
                    }
                    float3 heij = _ValoVari.rgb * ranta * 0.2;    // v9: puolet (junan 170 kuvat: vesi tasaisen kullanruskea)
                    float3 kulta = float3(1.0, 0.74, 0.36);
                    int nm = (int)_MaamerkkiParam.x;
                    for (int m = 0; m < 8; m++)
                    {
                        if (m >= nm) break;
                        float4 mm = _Maamerkit[m];
                        float2 dl = mm.xz - p.xz; float pitka = dot(dl, v);
                        if (pitka <= 0.0) continue;
                        float sivu = dot(dl, poikki), lev = mm.w * 0.35;
                        heij += kulta * _MaamerkkiParam.y * 0.15 * exp(-sivu * sivu / (lev * lev)) / (1.0 + pitka / 700.0);   // v9: himmeämpi (pystyraidat)
                    }
                    if (_KohdeP.w > 0.5)   // nykyinen kohde (Eiffel Seinellä) vahvimpana juovana
                    {
                        float2 dl = _KohdeP.xz - p.xz; float pitka = dot(dl, v);
                        float sivu = dot(dl, poikki), lev = _KohdeParam.x * 0.6;
                        if (pitka > 0.0) heij += kulta * _KohdeParam.y * 0.35 * exp(-sivu * sivu / (lev * lev)) / (1.0 + pitka / 700.0);
                    }
                    lisa += heij * vesi * fresnel * valke * _VesiAlue.w;
                }
                // v9 etäisyyshäivytys (junan 170 kuvat 0ae25418: horisontin kaukainen maasto hehkui kullanruskeana ja Tukholman karkeiden
                // kaukolaattojen sahalaita erottui mustaa taivasta vasten): valot täysinä 5 km:iin, häipyvät 12 km:ssä.
                float lahella = 1.0 - saturate((distance(pw, _KaupunkiKamera.xyz) - 5000.0) / 7000.0);
                lisa *= lahella; ikk *= lahella;
                if (_ValoDebug.x > 3.5 && _ValoDebug.x < 4.5) return half4((half3)saturate((lisa + ikk) * 5.0), 1.0h);
                float3 tulos = c.rgb + (lisa * _ValoParam.x + ikk) * max(1.0, _ValoDebug.y);
                // Kohteen valaistus (v4): lämmin valonheitto kohteen ympärille maasta ylöspäin (Eiffel kultaisena).
                if (wKohde > 0.0)
                {
                    float3 kulta = float3(1.0, 0.74, 0.36);
                    tulos = tulos * (1.0 + _KohdeParam.y * wKohde * _ValoParam.x * kulta) + kulta * 0.03 * wKohde * _ValoParam.x;
                }
                // v6 maamerkkien julkisivuvalo: lämmin valo maasta ylöspäin (heikkenee korkeuden mukana), ei vedelle.
                int nmv = (int)_MaamerkkiParam.x;
                for (int mi = 0; mi < 8; mi++)
                {
                    if (mi >= nmv) break;
                    float4 mm = _Maamerkit[mi];
                    float2 dk = p.xz - mm.xz; float yl = p.y - mm.y;
                    float w = exp(-dot(dk, dk) / (mm.w * mm.w)) * saturate((yl + 4.0) / 4.0) * exp(-max(0.0, yl) / 45.0) * (1.0 - vesi);
                    if (w <= 0.001) continue;
                    float3 julkisivu = float3(1.0, 0.82, 0.55);
                    tulos = tulos * (1.0 + _MaamerkkiParam.y * w * _ValoParam.x * julkisivu) + julkisivu * 0.02 * w * _ValoParam.x;
                }
                if (Huono(tulos)) tulos = c.rgb;   // varmistus bittitasolla: virheellinen pikseli ei musta ruutua
                return half4((half3)tulos, c.a);
            }
            ENDHLSL
        }
    }
}
