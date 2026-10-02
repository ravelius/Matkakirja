// AJATTELIJAN KIPSIBYSTI (Linssiseppä 2, 2.10.2026; web js/linssit/ajattelija.js + ajattelija-projektori.js, three.js r185).
// Koko valaistus tässä varjostimessa (ei Unityn valoja): webin MeshStandardMaterial (roughness 0,62, metalness 0,
// baseColor GLB:stä) sellaisenaan: GGX + Lambert, spottivalot three.js:n kaavoin (keila smoothstep(cos ulko, cos sisä),
// vaimennus 1 / max(d², 0,01)), puolipallovalo, videotykit (projektoriValo) ja AgX-sävykartoitus (three.js AgXToneMapping,
// valotus 1). Kuva kirjoitetaan sRGB-kohteeseen lineaarisena, kuten three.js:n lineaari → sRGB -ulostulo.
//
// Valot (AjattelijaNayttamo asettaa): 0 avainvalo (aurinko, varjo omasta varjokartasta _Varjo), 1–2 prologin reunavalot,
// 3 kaiun täyte. Videotykit: _PMaara kpl, rivit _PX/_PY/_PF (projektorin kanta: jx = PX·p / PF·p), parametrit _PA…_PF kuten
// webin pA…pF. Atlaksen v on käännetty Unityn kuvasuuntaan (AjattelijaNayttamo).
Shader "Matkakirja/AjattelijaKipsi"
{
    Properties
    {
        _NormalMap ("Normaalikartta", 2D) = "bump" {}
        _Detalji ("Kipsin mikronormaali", 2D) = "bump" {}
        _Atlas ("Tekstiatlas", 2D) = "black" {}
        _Kaiku ("Kaikukuva", 2D) = "black" {}
        _Varjo ("Varjokartta", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        Pass
        {
            Tags { "LightMode" = "UniversalForward" }
            Cull Back
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 3.5
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            #define P_ENINTAAN 24
            #define VALOJA 4

            TEXTURE2D(_NormalMap); SAMPLER(sampler_NormalMap);
            TEXTURE2D(_Detalji); SAMPLER(sampler_Detalji);
            TEXTURE2D(_Atlas); SAMPLER(sampler_Atlas);
            TEXTURE2D(_Kaiku); SAMPLER(sampler_Kaiku);
            TEXTURE2D(_Varjo); SAMPLER(sampler_Varjo);

            float4 _Pohja;          // baseColorFactor (lineaarinen), w = karheus
            float4 _Taivas, _Maa;   // puolipallovalo: taivaan ja maan väri × voima (rgb)
            float _KipsiPaalla, _NormaaliPaalla;
            float _Spekulaari;      // A/B-koe (ajattelija koe spekulaari x); oletus 1
            // Spotit: paikka.xyz + cos ulkoreuna, suunta.xyz + cos sisäreuna, väri × voima.
            float4 _VPaikka[VALOJA], _VSuunta[VALOJA], _VVari[VALOJA];
            float4x4 _VarjoVP;      // avainvalon näkymä+projektio (ei GPU-muunnosta: uv = ndc · 0,5 + 0,5)
            float4 _VarjoTiedot;    // lähi, kauko, harha (normalisoitu), tekseli
            int _PMaara;
            float4 _PX[P_ENINTAAN], _PY[P_ENINTAAN], _PF[P_ENINTAAN];
            float4 _PA[P_ENINTAAN]; // etäisyys, nauhan leveys, nauhan korkeus, siirto
            float4 _PB[P_ENINTAAN]; // cos kulma, sin kulma, pystysiirto vM, voima
            float4 _PC[P_ENINTAAN]; // atlas v0, v1 (terävä), v0, v1 (sumea) — Unityn v
            float4 _PD[P_ENINTAAN]; // uMax, ca, syvyys, toisto
            float4 _PE[P_ENINTAAN]; // projektorin paikka, keilan cos ulkoreuna
            float4 _PG[P_ENINTAAN]; // keilan cos sisäreuna, keskitys, kaiku
            float4 _PVari, _PKaikuVari;

            struct Tulo { float4 paikka : POSITION; float3 normaali : NORMAL; float4 tangentti : TANGENT; float2 uv : TEXCOORD0; };
            struct Ulos
            {
                float4 paikka : SV_POSITION;
                float3 maailma : TEXCOORD0;
                float3 normaali : TEXCOORD1;
                float4 tangentti : TEXCOORD2;
                float2 uv : TEXCOORD3;
            };

            Ulos vert(Tulo t)
            {
                Ulos o;
                o.maailma = TransformObjectToWorld(t.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.normaali = TransformObjectToWorldNormal(t.normaali);
                o.tangentti = float4(TransformObjectToWorldDir(t.tangentti.xyz), t.tangentti.w * GetOddNegativeScale());
                o.uv = t.uv;
                return o;
            }

            float Pow2(float x) { return x * x; }

            // three.js BRDF_GGX (F_Schlick, V_GGX_SmithCorrelated, D_GGX), specularColor 0,04, f90 1.
            float3 Ggx(float3 l, float3 v, float3 n, float karheus)
            {
                float alfa = Pow2(karheus);
                float3 h = normalize(l + v);
                float nl = saturate(dot(n, l)), nv = saturate(dot(n, v)), nh = saturate(dot(n, h)), vh = saturate(dot(v, h));
                float fres = exp2((-5.55473 * vh - 6.98316) * vh);
                float3 f = 0.04 * (1.0 - fres) + fres;
                float a2 = Pow2(alfa);
                float gv = nl * sqrt(a2 + (1.0 - a2) * Pow2(nv));
                float gl = nv * sqrt(a2 + (1.0 - a2) * Pow2(nl));
                float vis = 0.5 / max(gv + gl, 1e-6);
                float d = (1.0 / PI) * a2 / Pow2(Pow2(nh) * (a2 - 1.0) + 1.0);
                return f * (vis * d);
            }

            // Avainvalon varjo: tallennettu matka (lähi…kauko → 0…1), 3 × 3 PCF.
            float Varjo(float3 p, float3 n)
            {
                float3 q = p + n * 0.002;   // webin normalBias 0,002 m
                float4 c = mul(_VarjoVP, float4(q, 1.0));
                float2 uv = c.xy / c.w * 0.5 + 0.5;
                if (any(uv < 0.0) || any(uv > 1.0)) return 1.0;
                float m = (length(q - _VPaikka[0].xyz) - _VarjoTiedot.x) / (_VarjoTiedot.y - _VarjoTiedot.x) - _VarjoTiedot.z;
                float s = 0.0;
                [unroll] for (int y = -1; y <= 1; y++)
                    [unroll] for (int x = -1; x <= 1; x++)
                        s += SAMPLE_TEXTURE2D_LOD(_Varjo, sampler_Varjo, uv + float2(x, y) * _VarjoTiedot.w, 0).r >= m ? 1.0 : 0.0;
                return s / 9.0;
            }

            float PNayte(int i, float jx, float jy, float sk, float sumeus)
            {
                float4 a = _PA[i]; float4 b = _PB[i]; float4 c = _PC[i]; float4 d = _PD[i];
                float x = jx * a.x * sk, y = jy * a.x * sk;
                float u = (x * b.x - y * b.y) / a.y + _PG[i].y + a.w;
                float v = (x * b.y + y * b.x - b.z) / a.z + 0.5;
                if (v <= 0.0 || v >= 1.0) return 0.0;
                float reuna = smoothstep(0.0, 0.15, v) * smoothstep(1.0, 0.85, v);
                if (d.w < 0.5 && (u <= 0.0 || u >= 1.0)) return 0.0;
                if (_PG[i].z > 0.5)
                {
                    float reunaK = smoothstep(0.0, 0.08, u) * smoothstep(1.0, 0.92, u) * smoothstep(0.0, 0.08, v) * smoothstep(1.0, 0.92, v);
                    return smoothstep(0.08, 0.9, SAMPLE_TEXTURE2D_LOD(_Kaiku, sampler_Kaiku, float2(u, 1.0 - v), 0).r) * reunaK;
                }
                float au = u * d.x;
                float terava = SAMPLE_TEXTURE2D_BIAS(_Atlas, sampler_Atlas, float2(au, lerp(c.x, c.y, 1.0 - v)), -0.75).r;
                if (sumeus <= 0.0) return terava * reuna;
                float sumea = SAMPLE_TEXTURE2D(_Atlas, sampler_Atlas, float2(au, lerp(c.z, c.w, 1.0 - v))).r;
                return lerp(terava, sumea, sumeus) * reuna;
            }

            float3 ProjektoriValo(float3 p, float3 n)
            {
                float3 summa = 0;
                for (int i = 0; i < P_ENINTAAN; i++)
                {
                    if (i >= _PMaara) break;
                    float4 hp = float4(p, 1.0);
                    float z = dot(_PF[i], hp);
                    if (z <= 1e-4 || _PB[i].w <= 0.0) continue;
                    float lx = dot(_PX[i], hp), ly = dot(_PY[i], hp);
                    float3 kohti = _PE[i].xyz - p;
                    float r = length(kohti);
                    float keila = smoothstep(_PE[i].w, _PG[i].x, z / max(length(float3(lx, ly, z)), 1e-5));
                    float nl = max(dot(n, kohti / r), 0.0);
                    if (keila <= 0.0 || nl <= 0.0) continue;
                    float jx = lx / z, jy = ly / z;
                    float sumeus = _PD[i].z > 0.0 ? min(abs(r - _PA[i].x) / _PD[i].z, 1.0) : 0.0;
                    float ca = _PD[i].y;
                    float3 t = ca > 0.0
                        ? float3(PNayte(i, jx, jy, 1.0 + ca, sumeus), PNayte(i, jx, jy, 1.0, sumeus), PNayte(i, jx, jy, 1.0 - ca, sumeus))
                        : PNayte(i, jx, jy, 1.0, sumeus).xxx;
                    summa += t * (_PG[i].z > 0.5 ? _PKaikuVari.rgb : _PVari.rgb) * (_PB[i].w * keila * nl / (r * r));
                }
                return summa;
            }

            // Kipsin mikronormaali (lisaaKipsinPinta): kaksitasoinen triplanar, toistot 28,5 ja 95 / m, voimat 0,6 ja 0,35.
            float3 KipsiTaso(float3 p, float3 w)
            {
                float3 x = SAMPLE_TEXTURE2D(_Detalji, sampler_Detalji, p.zy).xyz * 2.0 - 1.0;
                float3 y = SAMPLE_TEXTURE2D(_Detalji, sampler_Detalji, p.xz).xyz * 2.0 - 1.0;
                float3 z = SAMPLE_TEXTURE2D(_Detalji, sampler_Detalji, p.xy).xyz * 2.0 - 1.0;
                return w.x * float3(0.0, x.y, x.x) + w.y * float3(y.x, 0.0, y.y) + w.z * float3(z.x, z.y, 0.0);
            }

            float3 AgX(float3 c)
            {
                // three.js AgXToneMapping (GLSL mat3 sarakkeittain → sarakkeet kerrottuina erikseen).
                c = float3(0.6274, 0.0691, 0.0164) * c.x + float3(0.3293, 0.9195, 0.0880) * c.y + float3(0.0433, 0.0113, 0.8956) * c.z;
                c = float3(0.856627153315983, 0.137318972929847, 0.11189821299995) * c.x
                  + float3(0.0951212405381588, 0.761241990602591, 0.0767994186031903) * c.y
                  + float3(0.0482516061458583, 0.101439036467562, 0.811302368396859) * c.z;
                c = max(c, 1e-10);
                c = log2(c);
                c = saturate((c + 12.47393) / (4.026069 + 12.47393));
                float3 x2 = c * c, x4 = x2 * x2;
                c = 15.5 * x4 * x2 - 40.14 * x4 * c + 31.96 * x4 - 6.868 * x2 * c + 0.4298 * x2 + 0.1191 * c - 0.00232;
                c = float3(1.1271005818144368, -0.1413297634984383, -0.14132976349843826) * c.x
                  + float3(-0.11060664309660323, 1.157823702216272, -0.11060664309660294) * c.y
                  + float3(-0.016493938717834573, -0.016493938717834257, 1.2519364065950405) * c.z;
                c = pow(max(0.0, c), 2.2);
                c = float3(1.6605, -0.1246, -0.0182) * c.x + float3(-0.5876, 1.1329, -0.1006) * c.y + float3(-0.0728, -0.0083, 1.1187) * c.z;
                return saturate(c);
            }

            half4 frag(Ulos i) : SV_Target
            {
                float3 n = normalize(i.normaali);
                if (_NormaaliPaalla > 0.5)
                {
                    float3 t = normalize(i.tangentti.xyz);
                    float3 b = cross(n, t) * i.tangentti.w;
                    float3 m = SAMPLE_TEXTURE2D_BIAS(_NormalMap, sampler_NormalMap, i.uv, -0.75).xyz * 2.0 - 1.0;
                    n = normalize(t * m.x + b * m.y + n * m.z);
                }
                if (_KipsiPaalla > 0.5)
                {
                    // Webin three.js-koordinaateissa (z peilattu): kipsikuvion x/y-keskiarvo on 0,542, joten mikronormaalissa on vinouma
                    // (+x, +y, +z three = kasvoista ulos). Unityn z:lla se kääntyi kohti prologin takavaloja ja kirkasti reunavaloa ~3×.
                    const float3 PEILI = float3(1.0, 1.0, -1.0);
                    float3 w = pow(abs(n), 4.0);
                    w /= (w.x + w.y + w.z);
                    float3 p = i.maailma * PEILI;
                    float3 d = KipsiTaso(p * 28.5, w) * 0.6 + KipsiTaso(p * 95.0, w) * 0.35;
                    n = normalize(n + d * PEILI);
                }
                float3 v = normalize(_WorldSpaceCameraPos - i.maailma);
                float3 albedo = _Pohja.rgb;
                float3 lambert = albedo / PI;
                float3 suora = 0;
                [unroll] for (int k = 0; k < VALOJA; k++)
                {
                    float3 lv = _VPaikka[k].xyz - i.maailma;
                    float d2 = dot(lv, lv);
                    float3 l = lv * rsqrt(d2);
                    float keila = smoothstep(_VPaikka[k].w, _VSuunta[k].w, dot(-l, _VSuunta[k].xyz));
                    float nl = saturate(dot(n, l));
                    float3 sateily = _VVari[k].rgb * (keila / max(d2, 0.01)) * nl;
                    if (k == 0 && _VVari[0].a > 0.0 && nl > 0.0 && keila > 0.0) sateily *= Varjo(i.maailma, normalize(i.normaali));
                    suora += sateily * (lambert + Ggx(l, v, n, _Pohja.w) * _Spekulaari);
                }
                float3 puolipallo = lerp(_Maa.rgb, _Taivas.rgb, 0.5 * n.y + 0.5);
                float3 vari = suora + puolipallo * lambert + lambert * ProjektoriValo(i.maailma, n);
                return half4(AgX(vari), 1.0);
            }
            ENDHLSL
        }
    }
}
