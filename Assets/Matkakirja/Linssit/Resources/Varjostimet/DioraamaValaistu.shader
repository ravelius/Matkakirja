// Dioraaman VALAISTU pinta (Poikkileikkaus-linssi, Linnanrakentaja erä 2b, 29.9.2026, dioraama-rajapinnat-
// era2b-20260929.md kohdat 1 ja 2): sama glb-geometria kuin DioraamaMaalattu.shader, mutta oikea URP-valaistus
// (päävalo + varjot, lisävalot per pikseli) -- DioraamaValot.cs luo aurinko- ja pistevalot, DioraamaRakennus.cs
// valitsee tämän varjostimen kun Valaistus = true (muuten vanha valaisematon DioraamaMaalattu jää varalle).
// SRP Batcher -yhteensopiva: KAIKKI kolme passia (Forward/ShadowCaster/DepthOnly) jakavat saman
// CBUFFER_START(UnityPerMaterial) -sisällön identtisenä (SRP Batcherin vaatimus), TEXTURE2D/SAMPLER CBUFFERin
// ulkopuolella, ei float4x4-arvoja ilman Properties-riviä, ei MaterialPropertyBlockia.
//
// Väri = albedo · (taivas(N.y) + Σ valo · wrapLambert(N·L, 0,3) · varjo) · lerp(1, AO, 0,85)
//        + _Lampo · lämpö(G) · _DioraamaLepatus
//   albedo      _Tila 0 (A, proseduraalinen): _Vari · DioraamaKuvio(_KuvioTyyppi, _KuvioParametrit, uv,
//               maailma, COLOR.b); _Tila 1 (B, Codexin maalattu): _PohjaKuva(sRGB) · (1 + (COLOR.b−0,5)·0,1)
//   taivas(N.y) lerp(_DioraamaTaivasAla, _DioraamaTaivasYla.rgb, N.y·0,5+0,5) · _DioraamaTaivasYla.a (voima);
//               globaalit, DioraamaValot.cs asettaa RAKENNUS.valaistus.taivas-datasta.
//   AO          COLOR.r (0…1, 1 = avoin, rakennuskoneen leipoma)
//   lämpö       COLOR.g (tulisijan ja muiden valojen leipoma lämpö 0…1) -- saa nostaa värin yli 1:n (hehku/Bloom).
//               _DioraamaLepatus (DioraamaNayttamo.cs, hidas kohinainen 0,85…1,0) KUTEN DioraamaMaalattu.shader,
//               mutta EI enää vanhaa kiinteää 0,35-kerrointa -- POIKKEAMA: era 2b:n kaava (kohta 2) nimeää
//               termit "lämpö · G · _Lampo" eikä mainitse omaa vakiota, toisin kuin wrapLambertin 0,3 ja AO:n
//               0,85 (jotka ON kirjoitettu kaavaan) -- luettu tarkoituksellisena, kirjattu raporttiin.
//   COLOR.b     osan satunnaisluku 0–1 (era 2b kohta 1): DioraamaKuvio-parametri ja B-tilan pieni sävyvaihtelu.
// Päävalo (GetMainLight, varjo TransformWorldToShadowCoord:lla) ja lisävalot (GetAdditionalLightsCount/
// GetAdditionalLight, DioraamaValot.cs:n aurinko + tilan pistevalot) URP:n omalla Light-liukuhihnalla; ei
// lisävalojen varjoja (ei _ADDITIONAL_LIGHT_SHADOWS-avainsanaa, Mobile_RPAsset m_AdditionalLightShadowsSupported
// 0) -- GetAdditionalLight(i, positionWS) palauttaa shadowAttenuation = 1 aina. Sumu (_DioraamaSumuVari +
// _DioraamaSumu, DioraamaNayttamo.cs) säilytetty ennallaan (era 1 kohta 6): A/B-materiaalit sulautuvat samaan
// kaukaisuuteen samoin kuin DioraamaMaalattu/DioraamaHahmo -- kaava ei toista tätä, mutta ei myöskään peru sitä.
Shader "Matkakirja/Linssit/DioraamaValaistu"
{
    Properties
    {
        _Vari ("Pinnan väri (lineaarinen)", Color) = (0.72, 0.68, 0.61, 1)
        _Lampo ("Lämmön väri", Color) = (1, 0.6902, 0.3765, 1)
        _PohjaKuva ("Pohjakuva (B, sRGB)", 2D) = "white" {}
        _Virtaus ("Virtaus (UV/s, vain vesi)", Vector) = (0, 0, 0, 0)
        _Tila ("Tila: 0 = A proseduraalinen, 1 = B maalattu", Float) = 0
        _KuvioTyyppi ("Kuvion tyyppi (DioraamaKuvio-taulukon indeksi)", Float) = 0
        _KuvioParametrit ("Kuvion parametrit (koko_u, koko_v, sauma, vaihtelu)", Vector) = (1, 1, 0.02, 0.3)
        _ValoAtlas ("Kävelyosan valoatlas (UV1, valo × 0,5, LR 8.10.)", 2D) = "grey" {}
        _ValoVain ("Valo atlaksesta (1) vai reaaliaikaisista valoista (0)", Float) = 0
        _Markyys ("Märkyys 0–1 (kävelydata, LR v45f)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }

        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile _ _ADDITIONAL_LIGHTS
            // Grafiikka 8.10. (juna 169): Ultra-renderöijä on Forward+ (klusteroitu valosilmukka) ja piirtää lisävalojen pehmeät
            // varjot (liekit, SeikkailuVarjot). Ilman näitä Forward+ ei antaisi tälle varjostimelle yhtään lisävaloa.
            #pragma multi_compile _ _CLUSTER_LIGHT_LOOP
            #pragma multi_compile_fragment _ _ADDITIONAL_LIGHT_SHADOWS
            #pragma multi_compile_fragment _ _SHADOWS_SOFT _SHADOWS_SOFT_LOW _SHADOWS_SOFT_MEDIUM _SHADOWS_SOFT_HIGH
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "DioraamaKuviot.hlsl"
            #include "DioraamaUsva.hlsl"
            #include "DioraamaMarkyys.hlsl"

            // Globaalit: DioraamaNayttamo.cs (sumu+lepatus, kaikki dioraaman varjostimet) ja DioraamaValot.cs
            // (taivas, RAKENNUS.valaistus.taivas-datasta, vain tämä varjostin lukee näitä kahta).
            half _DioraamaLepatus;
            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu; // x = alku (m), y = loppu (m)
            half4 _DioraamaTaivasYla; // rgb = yläväri (lineaarinen), a = taivaan voima
            half4 _DioraamaTaivasAla; // rgb = alaväri (lineaarinen)

            TEXTURE2D(_PohjaKuva); SAMPLER(sampler_PohjaKuva);
            TEXTURE2D(_ValoAtlas); SAMPLER(sampler_ValoAtlas);

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Lampo;
                float4 _PohjaKuva_ST;
                float4 _Virtaus;         // xy = UV/s (vain vesi virtaa; muilla pinnoilla 0,0)
                float _Tila;             // 0 = A (proseduraalinen), 1 = B (maalattu)
                float _KuvioTyyppi;      // DioraamaKuvio-taulukon indeksi (int pyöristettynä)
                float4 _KuvioParametrit; // koko_u, koko_v, sauma, vaihtelu
                float4 _ValoAtlas_ST;
                float _ValoVain;         // 1 = kävelyosa: valo leivotusta atlaksesta (UV1), ei pää- eikä taivasvaloa
                float _Markyys;          // märkyys 0–1 (SeikkailuKavely.AsetaMarkyys)
            CBUFFER_END

            struct Syote
            {
                float4 paikka : POSITION;
                float3 normaali : NORMAL;
                half4 vari : COLOR;
                float2 uv : TEXCOORD0;
                float2 uv1 : TEXCOORD1;
            };
            struct Vali
            {
                float4 paikka : SV_POSITION;
                float3 normaaliW : TEXCOORD0;
                half4 vari : COLOR;
                float3 paikkaW : TEXCOORD1;
                float2 uv : TEXCOORD2;
                float2 uv1 : TEXCOORD3;
            };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.normaaliW = TransformObjectToWorldNormal(i.normaali);
                o.vari = i.vari; // R = AO, G = lämpö, B = satunnainen (ei värejä: ei sRGB-muunnosta)
                o.uv = TRANSFORM_TEX(i.uv, _PohjaKuva);
                o.uv1 = i.uv1;
                return o;
            }

            /// <summary>Pehmeä (wrap) Lambert: valo ulottuu wrap-verran normaalin "väärälle" puolelle (0,3 ≈
            /// pienoismallin loiva täyttövalo, ilman erillistä ambient-valoa per objekti).</summary>
            half WrapLambert(half ndotl, half wrap) { return saturate((ndotl + wrap) / (1.0h + wrap)); }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.normaaliW);
                // Lisävalojen silmukka (LIGHT_LOOP_BEGIN) lukee inputData-muuttujaa (Forward+: klusteri ruutu-UV:sta).
                InputData inputData = (InputData)0;
                inputData.positionWS = i.paikkaW;
                inputData.normalizedScreenSpaceUV = GetNormalizedScreenSpaceUV(i.paikka);
                half ao = (half)i.vari.r, lampo = (half)i.vari.g, satunnainen = (half)i.vari.b;

                // Vesi virtaa (_Virtaus, muilla pinnoilla 0,0): sama UV kuvioon ja pohjakuvaan.
                float2 uv = i.uv + _Virtaus.xy * _Time.y;

                half3 albedo;
                if (_Tila > 0.5)
                {
                    half3 pohja = SAMPLE_TEXTURE2D(_PohjaKuva, sampler_PohjaKuva, uv).rgb;
                    albedo = pohja * (1.0h + (satunnainen - 0.5h) * 0.1h); // B: vain Codexin kuva (_Vari jää A:n pinnan väriksi)
                }
                else
                {
                    half3 kuvio = (half3)DioraamaKuvio((int)(_KuvioTyyppi + 0.5), _KuvioParametrit, uv, i.paikkaW, satunnainen);
                    albedo = _Vari.rgb * kuvio;
                }

                half3 taivas = (half3)lerp(_DioraamaTaivasAla.rgb, _DioraamaTaivasYla.rgb, (half)(n.y * 0.5 + 0.5)) * _DioraamaTaivasYla.a;

                Light paavalo = GetMainLight(TransformWorldToShadowCoord(i.paikkaW));
                half3 valo = taivas + paavalo.color * WrapLambert(dot(n, paavalo.direction), 0.3h) * paavalo.shadowAttenuation;

                #if defined(_ADDITIONAL_LIGHTS) || USE_CLUSTER_LIGHT_LOOP
                // LIGHT_LOOP_BEGIN: tavallinen silmukka Forwardissa, klusterit Forward+:ssa (inputData frag-alussa).
                uint lisavaloja = GetAdditionalLightsCount();
                LIGHT_LOOP_BEGIN(lisavaloja)
                    Light lisavalo = GetAdditionalLight(lightIndex, i.paikkaW, half4(1, 1, 1, 1));
                    // Mobile_RPAsset: ei lisävalojen varjoja (shadowAttenuation 1); Ultra: liekkien pehmeät varjot.
                    valo += lisavalo.color * lisavalo.distanceAttenuation * lisavalo.shadowAttenuation * WrapLambert(dot(n, lisavalo.direction), 0.3h);
                LIGHT_LOOP_END
                #endif

                half3 vari = albedo * valo * lerp(1.0h, ao, 0.85h) + _Lampo.rgb * (lampo * lampo * 0.45h) * _DioraamaLepatus; // g²·0,45: oikea pistevalo valaisee jo (sama kuin esikatselussa)
                if (_ValoVain > 0.5)
                {
                    // Kävelyosa (LR 8.10.): leivottu valo (GI, AO, liekit; tallennettu × 0,5) × pinnan väri. Reaaliaikaisista
                    // lisävaloista vain varjot tummentavat (hahmot heittävät liekin varjon), kuten DioraamaLeivottu.
                    half3 leivottu = SAMPLE_TEXTURE2D(_ValoAtlas, sampler_ValoAtlas, i.uv1).rgb * 2.0h;
                    half varjo = 1.0h;
                    #if defined(_ADDITIONAL_LIGHT_SHADOWS)
                    {
                        uint lisavalojaV = GetAdditionalLightsCount();
                        LIGHT_LOOP_BEGIN(lisavalojaV)
                            Light lv = GetAdditionalLight(lightIndex, i.paikkaW, half4(1, 1, 1, 1));
                            half osuus = (half)saturate(lv.distanceAttenuation * 1.5) * (half)saturate(dot(n, lv.direction) * 2.0 + 0.3);
                            varjo *= lerp(1.0h, lv.shadowAttenuation, osuus * 0.75h);
                        LIGHT_LOOP_END
                    }
                    #endif
                    // Liikkuvat valot (kantajien lyhdyt ja soihdut, Foggin kynttilä; SeikkailuValot.LiikkuvaKerros = bitti 7) eivät
                    // ole atlaksessa: ne valaisevat reaaliaikaisesti.
                    half3 liikkuva = 0;
                    #if defined(_ADDITIONAL_LIGHTS) || USE_CLUSTER_LIGHT_LOOP
                    {
                        uint lisavalojaL = GetAdditionalLightsCount();
                        LIGHT_LOOP_BEGIN(lisavalojaL)
                            Light ll = GetAdditionalLight(lightIndex, i.paikkaW, half4(1, 1, 1, 1));
                            if ((ll.layerMask & 128u) != 0u)
                                liikkuva += ll.color * ll.distanceAttenuation * ll.shadowAttenuation * WrapLambert(dot(n, ll.direction), 0.3h);
                        LIGHT_LOOP_END
                    }
                    #endif
                    vari = albedo * (leivottu * varjo + liikkuva);
                }
                DioraamaMarkyys(vari, _Markyys, n, i.paikkaW);   // märät pinnat (kävelyosat ulkona)

                // Etäisyyssumu (era 1 kohta 6, kuten DioraamaMaalattu/DioraamaHahmo): massa ja keittiö erottuvat.
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                vari = lerp(vari, _DioraamaSumuVari.rgb, sumu);
                vari = DioraamaUsva(vari, i.paikkaW);
                return half4(vari, 1);
            }
            ENDHLSL
        }

        // Varjojen heitto (aurinko + tulevat lisävalojen varjot, jos joskus otetaan käyttöön): sama
        // UnityPerMaterial-CBUFFER kuin Forward-passissa (SRP Batcher vaatii identtisen layoutin joka passissa),
        // vaikka tämä passi ei albedoa tarvitsekaan (ei alpha-cutoutia dioraaman pinnoilla).
        Pass
        {
            Name "ShadowCaster"
            Tags { "LightMode" = "ShadowCaster" }
            ZWrite On
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vertVarjo
            #pragma fragment fragVarjo
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"

            // ShadowUtils.SetupShadowCasterConstantBuffer asettaa: suunta (Directional-valo, meidän aurinkomme)
            // varjon normaalivinouman laskuun (ks. Packages/.../Shaders/ShadowCasterPass.hlsl-malli).
            float3 _LightDirection;

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Lampo;
                float4 _PohjaKuva_ST;
                float4 _Virtaus;
                float _Tila;
                float _KuvioTyyppi;
                float4 _KuvioParametrit;
                float4 _ValoAtlas_ST;
                float _ValoVain;
                float _Markyys;
            CBUFFER_END

            struct SyoteVarjo { float4 paikka : POSITION; float3 normaali : NORMAL; };
            struct ValiVarjo { float4 paikka : SV_POSITION; };

            ValiVarjo vertVarjo(SyoteVarjo i)
            {
                ValiVarjo o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                float3 normaaliW = TransformObjectToWorldNormal(i.normaali);
                float4 paikka = TransformWorldToHClip(ApplyShadowBias(maailma, normaaliW, _LightDirection));
                o.paikka = ApplyShadowClamping(paikka);
                return o;
            }

            half4 fragVarjo(ValiVarjo i) : SV_Target { return 0; }
            ENDHLSL
        }

        // Syvyys ilman väriä (DoF:n mahdollinen syvyysesiajo, jos kopiointi ei riitä laitteella/asetuksella) --
        // sama CBUFFER-syy kuin ShadowCaster-passissa.
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On
            ZTest LEqual
            Cull Back
            ColorMask 0

            HLSLPROGRAM
            #pragma vertex vertSyvyys
            #pragma fragment fragSyvyys
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Lampo;
                float4 _PohjaKuva_ST;
                float4 _Virtaus;
                float _Tila;
                float _KuvioTyyppi;
                float4 _KuvioParametrit;
                float4 _ValoAtlas_ST;
                float _ValoVain;
                float _Markyys;
            CBUFFER_END

            struct SyoteSyvyys { float4 paikka : POSITION; };
            struct ValiSyvyys { float4 paikka : SV_POSITION; };

            ValiSyvyys vertSyvyys(SyoteSyvyys i)
            {
                ValiSyvyys o;
                o.paikka = TransformWorldToHClip(TransformObjectToWorld(i.paikka.xyz));
                return o;
            }

            half4 fragSyvyys(ValiSyvyys i) : SV_Target { return 0; }
            ENDHLSL
        }
    }
}
