// AJATTELIJAN KIPSIBYSTI (Linssiseppä 2, 2.10.2026; web js/linssit/ajattelija.js + ajattelija-projektori.js, three.js r185).
// Koko valaistus tässä varjostimessa (ei Unityn valoja): webin MeshStandardMaterial (roughness 0,62, metalness 0,
// baseColor GLB:stä) sellaisenaan: GGX + Lambert, spottivalot three.js:n kaavoin (keila smoothstep(cos ulko, cos sisä),
// vaimennus 1 / max(d², 0,01)), puolipallovalo, videotykit (projektoriValo) ja AgX-sävykartoitus (three.js AgXToneMapping,
// valotus 1). Kuva kirjoitetaan sRGB-kohteeseen lineaarisena, kuten three.js:n lineaari → sRGB -ulostulo.
//
// Valot (AjattelijaNayttamo asettaa): 0 avainvalo (aurinko, varjo omasta varjokartasta _Varjo), 1–3 prologin reunavalot
// (v14: kolmas päälaelle), 3 kaiun täyte. Aikajanassa (v13–v14) 1 pyyhkäisy ja 2 rakovalo: kuvio _VKuvio (suorakaide
// Gaussin pehmeällä reunalla kuten webin kankaan blur, ±puoli RD:n tasolla) ja oma varjokartta _Varjo2.
// Videotykit: _PMaara kpl, rivit _PX/_PY/_PF (projektorin kanta: jx = PX·p / PF·p), parametrit _PA…_PF kuten
// webin pA…pF (_PG = webin pF: keilan cos sisäreuna, keskitys, kaiku, v14 rintama). Atlaksen v on käännetty Unityn
// kuvasuuntaan (AjattelijaNayttamo). v13c: väistökehät _PVaisto (vain toistorivit) ja savumaski _Savu (kaikki projektorit).
Shader "Matkakirja/AjattelijaKipsi"
{
    Properties
    {
        _NormalMap ("Normaalikartta", 2D) = "bump" {}
        _Detalji ("Kipsin mikronormaali", 2D) = "bump" {}
        _Atlas ("Tekstiatlas", 2D) = "black" {}
        _Kaiku ("Kaikukuva", 2D) = "black" {}
        _Varjo ("Varjokartta", 2D) = "white" {}
        _Kaiku2 ("Toinen kaikukuva", 2D) = "black" {}
        _Varjo2 ("Rakovalon varjokartta", 2D) = "white" {}
        _Savu ("Savumaski", 2D) = "white" {}
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
            #include "AjattelijaPeite.hlsl"   // webin CSS-vinjetti ja lähderivin liukuväri sRGB:nä bystin pikseleille

            #define P_ENINTAAN 24
            #define VALOJA 4

            TEXTURE2D(_NormalMap); SAMPLER(sampler_NormalMap);
            TEXTURE2D(_Detalji); SAMPLER(sampler_Detalji);
            TEXTURE2D(_Atlas); SAMPLER(sampler_Atlas);
            TEXTURE2D(_Kaiku); SAMPLER(sampler_Kaiku);
            TEXTURE2D(_Varjo); SAMPLER(sampler_Varjo);
            TEXTURE2D(_Kaiku2); SAMPLER(sampler_Kaiku2);
            TEXTURE2D(_Varjo2); SAMPLER(sampler_Varjo2);
            TEXTURE2D(_Savu); SAMPLER(sampler_Savu);

            float4 _Pohja;          // baseColorFactor (lineaarinen), w = karheus
            float4 _Taivas, _Maa;   // puolipallovalo: taivaan ja maan väri × voima (rgb)
            float _KipsiPaalla, _NormaaliPaalla;
            float _Spekulaari;      // A/B-koe (ajattelija koe spekulaari x); oletus 1
            // Spotit: paikka.xyz + cos ulkoreuna, suunta.xyz + cos sisäreuna, väri × voima.
            float4 _VPaikka[VALOJA], _VSuunta[VALOJA], _VVari[VALOJA];
            float4x4 _VarjoVP;      // avainvalon näkymä+projektio (ei GPU-muunnosta: uv = ndc · 0,5 + 0,5)
            float4 _VarjoTiedot;    // lähi, kauko, harha (normalisoitu), tekseli
            float4x4 _Varjo2VP;     // rakovalon (valo 2) varjon näkymä+projektio
            float4 _Varjo2Tiedot;
            float4 _VKuvio;         // valon 2 kuvio: puolileveys, puolikorkeus (m RD:n tasolla), Gaussin hajonta (m), päällä
            float _VKuvioEtaisyys;  // RD (web 0,9 m)
            int _PMaara;
            float4 _PX[P_ENINTAAN], _PY[P_ENINTAAN], _PF[P_ENINTAAN];
            float4 _PA[P_ENINTAAN]; // etäisyys, nauhan leveys, nauhan korkeus, siirto
            float4 _PB[P_ENINTAAN]; // cos kulma, sin kulma, pystysiirto vM, voima
            float4 _PC[P_ENINTAAN]; // atlas v0, v1 (terävä), v0, v1 (sumea) — Unityn v
            float4 _PD[P_ENINTAAN]; // uMax, ca, syvyys, toisto
            float4 _PE[P_ENINTAAN]; // projektorin paikka, keilan cos ulkoreuna
            float4 _PG[P_ENINTAAN]; // keilan cos sisäreuna, keskitys, kaiku (1 kierrokset, 2 _Kaiku, 3 _Kaiku2), rintama (v14)
            float4 _PVari, _PKaikuVari;
            float4 _PKaikuMuoto;    // kaikukuvan muoto (x _Kaiku, y _Kaiku2): 0 RGBA, 1 R8, 2 Alpha8 (harmaasävy = kirkkaus, alfa 1)
            float4 _PVaisto[4];     // väistökehät: xyz maailmassa, w säde (0 = pois)
            float4 _SavuTila;       // päällä, ala (m), laatan u, v (webin kuvasuunnassa)
            float4 _SavuKanava;
            float _SavuC0;
            float4 _SavuPehmeys;    // x: sumennuksen säde laatan uv:nä, y: harso (0 = ei savua, 1 = webin täysi varjo)

            struct Tulo { float4 paikka : POSITION; float3 normaali : NORMAL; float4 tangentti : TANGENT; float2 uv : TEXCOORD0; };
            struct Ulos
            {
                float4 paikka : SV_POSITION;
                float3 maailma : TEXCOORD0;
                float3 normaali : TEXCOORD1;
                float4 tangentti : TEXCOORD2;
                float2 uv : TEXCOORD3;
                float4 ruutu : TEXCOORD4;   // ruudun paikka (ComputeScreenPos: y = 0 kuvan alareunassa myös RT:hen piirrettäessä)
            };

            Ulos vert(Tulo t)
            {
                Ulos o;
                o.maailma = TransformObjectToWorld(t.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                // Ei leikkausavaruuden y:tä suoraan: RenderTextureen piirrettäessä projektio on Metalissa käännetty, jolloin peite
                // osui bystiin peilattuna (vinjetti ylös, alareuna ~17 % liian kirkas; Marcuksen nimiruutu 3.10.2026).
                o.ruutu = ComputeScreenPos(o.paikka);
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

            // Avainvalon varjo: tallennettu matka (lähi…kauko → 0…1), 3 × 3 PCF. Rakovalolla (valo 2) oma kartta _Varjo2.
            float Varjo(float3 p, float3 n, int k)
            {
                float3 q = p + n * 0.002;   // webin normalBias 0,002 m
                float4x4 vp = _VarjoVP;
                float4 tiedot = _VarjoTiedot;
                if (k != 0) { vp = _Varjo2VP; tiedot = _Varjo2Tiedot; }
                float4 c = mul(vp, float4(q, 1.0));
                float2 uv = c.xy / c.w * 0.5 + 0.5;
                if (any(uv < 0.0) || any(uv > 1.0)) return 1.0;
                float m = (length(q - _VPaikka[k].xyz) - tiedot.x) / (tiedot.y - tiedot.x) - tiedot.z;
                float s = 0.0;
                [unroll] for (int y = -1; y <= 1; y++)
                    [unroll] for (int x = -1; x <= 1; x++)
                    {
                        float2 o = uv + float2(x, y) * tiedot.w;
                        float d = SAMPLE_TEXTURE2D_LOD(_Varjo, sampler_Varjo, o, 0).r;
                        if (k != 0) d = SAMPLE_TEXTURE2D_LOD(_Varjo2, sampler_Varjo2, o, 0).r;
                        s += d >= m ? 1.0 : 0.0;
                    }
                return s / 9.0;
            }

            // erf-likiarvo (Winitzki, a = 0,147; virhe < 2·10⁻⁴): Gaussin sumentaman suorakaiteen reuna.
            float Erf(float x)
            {
                float x2 = x * x;
                return sign(x) * sqrt(1.0 - exp(-x2 * (1.27324 + 0.147 * x2) / (1.0 + 0.147 * x2)));
            }
            float Kaista(float x, float puoli, float hajonta)
            {
                float k = 0.70710678 / max(hajonta, 1e-5);
                return 0.5 * (Erf((x + puoli) * k) - Erf((x - puoli) * k));
            }
            // Rakovalon kuvio (web: 512 px:n kangas, valkoinen suorakaide k × ky, blur(levea · px / 2) → spotLight.map): pisteen
            // paikka valon kuvatasossa RD:n etäisyydellä, vaakasuunta kuten three.js:n lookAt (up = y); suorakaide on symmetrinen.
            float RakoKuvio(float3 p)
            {
                float3 s = _VSuunta[2].xyz;
                float3 d = p - _VPaikka[2].xyz;
                float z = dot(d, s);
                if (z <= 1e-4) return 0.0;
                float3 hx = normalize(cross(s, float3(0.0, 1.0, 0.0)));
                float3 hy = cross(hx, s);
                float X = dot(d, hx) / z * _VKuvioEtaisyys, Y = dot(d, hy) / z * _VKuvioEtaisyys;
                return saturate(Kaista(X, _VKuvio.x, _VKuvio.z) * Kaista(Y, _VKuvio.y, _VKuvio.z));
            }

            float PNayte(int i, float jx, float jy, float sk, float sumeus)
            {
                float4 a = _PA[i]; float4 b = _PB[i]; float4 c = _PC[i]; float4 d = _PD[i];
                float x = jx * a.x * sk, y = jy * a.x * sk;
                float u = (x * b.x - y * b.y) / a.y + _PG[i].y + a.w;
                float v = (x * b.y + y * b.x - b.z) / a.z + 0.5;
                if (v <= 0.0 || v >= 1.0) return 0.0;
                // Rintama (v14): rivi näkyy vain siltä puolelta, jolta se on jo juossut sisään (pehmeä 1 cm:n reuna).
                float rintama = 1.0;
                float pw = _PG[i].w;
                if (pw != 0.0)
                {
                    float sd = sign(pw);
                    float kynnys = pw - sd * 10.0;
                    float xm = x * b.x - y * b.y;
                    rintama = smoothstep(-0.005, 0.005, sd * (xm - kynnys));
                    if (rintama <= 0.0) return 0.0;
                }
                float reuna = smoothstep(0.0, 0.15, v) * smoothstep(1.0, 0.85, v) * rintama;
                if (d.w < 0.5 && (u <= 0.0 || u >= 1.0)) return 0.0;
                if (_PG[i].z > 0.5)
                {
                    float reunaK = smoothstep(0.0, 0.08, u) * smoothstep(1.0, 0.92, u) * smoothstep(0.0, 0.08, v) * smoothstep(1.0, 0.92, v);
                    // Kaikukuva (u, v) eikä (u, 1 − v): LoadImage antaa rivin 0 alimpana (= webin flipY true), ja webin kaiut olivat
                    // ylösalaisin samasta syystä (Pelikoodari 3.10., web #3888 flipY = false + 1 − v, todennettu Blender v10:tä vasten).
                    return smoothstep(0.08, 0.9, SAMPLE_TEXTURE2D_LOD(_Kaiku, sampler_Kaiku, float2(u, v), 0).r) * reunaK;
                }
                float au = u * d.x;
                float terava = SAMPLE_TEXTURE2D_BIAS(_Atlas, sampler_Atlas, float2(au, lerp(c.x, c.y, 1.0 - v)), -0.75).r;
                if (sumeus <= 0.0) return terava * reuna;
                float sumea = SAMPLE_TEXTURE2D(_Atlas, sampler_Atlas, float2(au, lerp(c.z, c.w, 1.0 - v))).r;
                return lerp(terava, sumea, sumeus) * reuna;
            }

            /*
             * Kaikukuva (web v13b/v13c pKaikuNayte, aikajana): valoa vain sisällössä; matalat sävyt kynnystetään pois kirkkaudesta,
             * sävy säilyy (väri / kirkkaus), alfa rajaa hahmon ja reunasta häivytetään vain 1 % (pistemäinen projektori).
             * Harmaasävykuva (R8/Alpha8) = kirkkaus, alfa 1. Kuva (u, v) kuten kierrosten kaiussa (LoadImage: rivi 0 alimpana).
             */
            float3 KaikuNayte(int i, float jx, float jy)
            {
                float4 a = _PA[i]; float4 b = _PB[i];
                float x = jx * a.x, y = jy * a.x;
                float u = (x * b.x - y * b.y) / a.y + _PG[i].y + a.w;
                float v = (x * b.y + y * b.x - b.z) / a.z + 0.5;
                if (u <= 0.0 || u >= 1.0 || v <= 0.0 || v >= 1.0) return 0.0;
                float reunaK = smoothstep(0.0, 0.01, u) * smoothstep(1.0, 0.99, u) * smoothstep(0.0, 0.01, v) * smoothstep(1.0, 0.99, v);
                bool toinen = _PG[i].z > 2.5;
                float4 c = SAMPLE_TEXTURE2D_LOD(_Kaiku, sampler_Kaiku, float2(u, v), 0);
                if (toinen) c = SAMPLE_TEXTURE2D_LOD(_Kaiku2, sampler_Kaiku2, float2(u, v), 0);
                float muoto = toinen ? _PKaikuMuoto.y : _PKaikuMuoto.x;
                if (muoto > 1.5) c = float4(c.aaa, 1.0);
                else if (muoto > 0.5) c = float4(c.rrr, 1.0);
                float l = max(max(c.r, c.g), c.b);
                return c.rgb / max(l, 1e-3) * smoothstep(0.08, 0.9, l) * c.a * reunaK;
            }

            /* Väistö (v13c): taustavirta jättää kaiun (v14: myös lainauskortin) ympärille tyhjän kehän, reuna pehmenee 15 % säteestä. */
            float VaistoKerroin(float3 p)
            {
                float k = 1.0;
                [unroll] for (int j = 0; j < 4; j++)
                    if (_PVaisto[j].w > 0.0) k *= smoothstep(0.85 * _PVaisto[j].w, _PVaisto[j].w, distance(p, _PVaisto[j].xyz));
                return k;
            }

            /* Savu (v13c): maskin uv = (X/Z · etäisyys) / ala + 0,5 projektorin kuvatasossa; 1 = täysi valo, ulkopuolella täysi.
               Webin v (flipY false, rivi 0 ylhäällä) → Unityn 1 − v (LoadImage: rivi 0 alimpana). */
            float SavuMaski(float2 uv)
            {
                // Laatan sisällä (8 × 8 atlas, 256 px laatta): puolen tekselin reuna, ettei naapuriruutu vuoda sumennukseen.
                float2 w = _SavuTila.zw + clamp(uv, 0.002, 0.998) * 0.125;
                return dot(SAMPLE_TEXTURE2D_LOD(_Savu, sampler_Savu, float2(w.x, 1.0 - w.y), 0), _SavuKanava);
            }

            /* PEHMEÄ SAVU (omistaja TF 133: kiehkurat "aivan terävinä varjoina"; Päätoimittaja: ohut savuharso valossa, ei varjo):
               maski sumennetaan viidellä näytteellä (keskus + neljä kierrettyä kulmaa säteellä _SavuPehmeys.x; bilineaarinen
               suodatus pehmentää loput) ja tummennus laimennetaan harsoksi: valo = lerp(1, maski, _SavuPehmeys.y). */
            float SavuNayte(float x, float y)
            {
                float2 uv = float2(x, y) / _SavuTila.y + 0.5;
                if (uv.x <= 0.0 || uv.x >= 1.0 || uv.y <= 0.0 || uv.y >= 1.0) return 1.0;
                float r = _SavuPehmeys.x;
                float m = SavuMaski(uv);
                if (r > 0.0)
                    m = 0.2 * (m + SavuMaski(uv + float2(r, 0.4 * r)) + SavuMaski(uv + float2(-0.4 * r, r))
                             + SavuMaski(uv + float2(-r, -0.4 * r)) + SavuMaski(uv + float2(0.4 * r, -r)));
                float s = saturate((m - _SavuC0) / (1.0 - _SavuC0));
                return lerp(1.0, s, _SavuPehmeys.y);
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
                    float3 t;
                    if (_PG[i].z > 1.5) t = KaikuNayte(i, jx, jy) * _PKaikuVari.rgb;
                    else
                    {
                        t = ca > 0.0
                            ? float3(PNayte(i, jx, jy, 1.0 + ca, sumeus), PNayte(i, jx, jy, 1.0, sumeus), PNayte(i, jx, jy, 1.0 - ca, sumeus))
                            : PNayte(i, jx, jy, 1.0, sumeus).xxx;
                        t *= _PG[i].z > 0.5 ? _PKaikuVari.rgb : _PVari.rgb;
                    }
                    if (_PD[i].w > 0.5) t *= VaistoKerroin(p);                                 // vain taustavirran toistorivit
                    if (_SavuTila.x > 0.5) t *= SavuNayte(jx * _PA[i].x, jy * _PA[i].x);   // kaikki projektorit
                    summa += t * (_PB[i].w * keila * nl / (r * r));
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
                // three.js MeshStandardMaterial: karheus += geometrinen karheus (näkymäavaruuden geometrianormaalin derivaatat,
                // ennen normaalikarttaa), enintään 1. Pehmentää spekulaaria vinoissa kulmissa (prologin takavalot).
                float3 nNakyma = mul((float3x3)UNITY_MATRIX_V, n);
                float3 dxy = max(abs(ddx(nNakyma)), abs(ddy(nNakyma)));
                float karheus = min(max(_Pohja.w, 0.0525) + max(max(dxy.x, dxy.y), dxy.z), 1.0);
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
                    if (k == 2 && _VKuvio.w > 0.5 && keila > 0.0) sateily *= RakoKuvio(i.maailma);
                    if ((k == 0 || k == 2) && _VVari[k].a > 0.0 && nl > 0.0 && keila > 0.0) sateily *= Varjo(i.maailma, normalize(i.normaali), k);
                    suora += sateily * (lambert + Ggx(l, v, n, karheus) * _Spekulaari);
                }
                float3 puolipallo = lerp(_Maa.rgb, _Taivas.rgb, 0.5 * n.y + 0.5);
                float3 vari = suora + puolipallo * lambert + lambert * ProjektoriValo(i.maailma, n);
                return half4(PeiteLineaariseen(AgX(vari), i.ruutu.xy / i.ruutu.w), 1.0);
            }
            ENDHLSL
        }
    }
}
