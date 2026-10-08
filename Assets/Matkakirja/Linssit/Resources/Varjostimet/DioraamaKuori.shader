// Dioraaman FOTOGRAMMETRINEN ULKOKUORI (Olavinlinna, Siirtoseppä 29.9.2026; malli Senaatti-kiinteistöt, CC BY 4.0):
// valaisematon, koska fotogrammetrian tekstuurissa on jo todellinen päivänvalo. Väri = kuva(uv0) · _Kirkkaus → sumu
// kuten muilla dioraaman pinnoilla. Molemmat puolet (glTF doubleSided: fotogrammetrian verkko on yksipuolinen
// kuori, jonka reunoista näkee sisään). SRP Batcher -yhteensopiva.
//
// LEIKKAUSIKKUNA (speksi dioraama-rajapinnat-blender-20260929.md kohta 3): kohdistetun tilan ajaksi kuoresta hylätään
// fragmentit leikkaustilavuudessa = tilan rajat (laajennettuna) jatkettuna vaakasuunnassa kameraa kohti kameraan asti.
// Globaalit (DioraamaUlkokuori.PaivitaLeikkaus): _DioraamaLeikkausMin.xyz / Max.xyz (maailma, jo laajennettu ja
// osuudella kutistettu keskipisteeseen), Min.w = osuus 0…1 (0 = kuori ehjä), Max.w = 1 jatketaan kameraan, 0 = vain
// laatikko; _DioraamaLeikkausKamera.xyz = kameran paikka. Reunalle 12 cm vaalea kivisävy (ei pahvinen reuna).
//
// LÄHIDETALJI (omistaja/Päätoimittaja 30.9.2026, menetelmä B; Linnanrakentajan CC0-kirjasto): kuoren UV0:n materiaalimaski
// (_DetaljiMaski: R muuri, G katto, B maa/kivilaatta, A kallio) valitsee neljästä laattaavasta sarjasta (diffuusi + normaali,
// maailman koordinaateissa, toisto _DetaljiToisto m). Muuri: sivuprojektio vallitsevan vaaka-akselin mukaan; katto ja maa:
// yläprojektio; kallio: sivu ja ylä sekoitettuna normaalin mukaan. Diffuusin leivottu valo säilyy:
//   väri ·= lerp(1, kirkkaus(detalji) / _DetaljiKeski, voimakkuus)
//   väri ·= 1 + normaali · (N_detalji · L − N · L), L = _DioraamaValo
// Kanava, jonka paino < 0,02, ohitetaan (dynaaminen haara; alueet ovat yhtenäisiä). _DetaljiParam.z = 0 → pois (ei dataa).
// Kaikki detaljiarvot ovat globaaleja (DioraamaUlkokuori.AsetaDetalji), jaettuja kaikille laatutasoille.
Shader "Matkakirja/Linssit/DioraamaKuori"
{
    Properties
    {
        _Kuva ("Fotogrammetrian tekstuuri", 2D) = "grey" {}
        _Kirkkaus ("Kirkkaus", Float) = 1
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
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu;
            float4 _DioraamaValo;
            float4 _DetaljiToisto, _DetaljiKeski, _DetaljiParam; // toisto m (R,G,B,A), keskikirkkaus, (voimakkuus, normaali, päällä)
            TEXTURE2D(_DetaljiMaski); SAMPLER(sampler_DetaljiMaski);
            TEXTURE2D(_DetaljiDiff0); TEXTURE2D(_DetaljiDiff1); TEXTURE2D(_DetaljiDiff2); TEXTURE2D(_DetaljiDiff3);
            TEXTURE2D(_DetaljiNor0); TEXTURE2D(_DetaljiNor1); TEXTURE2D(_DetaljiNor2); TEXTURE2D(_DetaljiNor3);
            SAMPLER(sampler_linear_repeat);
            float4 _DioraamaLeikkausMin, _DioraamaLeikkausMax, _DioraamaLeikkausKamera;
            // Historiamoottorin kävelytila (SeikkailuKavely, Linnanrakentajan osat.json leikkaukset): enintään 8 kierrettyä särmiötä
            // glTF-koordinaateissa (z etelä = −Unity z): xyz keskipiste, w kierto y-akselin ympäri (rad); Koko.xyz = puolikoko.
            float4 _KavelyLeikkaus[16], _KavelyLeikkausKoko[16];   // 7.10.: 8 → 16 (datassa 40; SeikkailuKavely valitsee lähimmät)
            float _KavelyLeikkausN;
            bool KavelyLeikattu(float3 pU)
            {
                float3 p = float3(pU.x, pU.y, -pU.z);
                for (int k = 0; k < 16; k++)
                {
                    if (k >= (int)_KavelyLeikkausN) break;
                    float3 d = p - _KavelyLeikkaus[k].xyz;
                    float c = cos(-_KavelyLeikkaus[k].w), sn = sin(-_KavelyLeikkaus[k].w);
                    float lx = c * d.x - sn * d.z, lz = sn * d.x + c * d.z;
                    float3 h = _KavelyLeikkausKoko[k].xyz;
                    if (abs(lx) <= h.x && abs(d.y) <= h.y && abs(lz) <= h.z) return true;
                }
                return false;
            }

            // Onko p leikkaustilavuudessa, kun laatikkoa kasvatetaan marginaalilla m? Säde p:stä kameran vastaiseen
            // vaakasuuntaan (−d) osuu laatikkoon matkalla [0, L] ⇔ p kuuluu laatikon kameraa kohti venytettyyn jatkeeseen.
            bool Leikkauksessa(float3 p, float m)
            {
                float3 lo = _DioraamaLeikkausMin.xyz - m, hi = _DioraamaLeikkausMax.xyz + m;
                if (p.y < lo.y) return false;
                if (p.y <= hi.y && all(p.xz >= lo.xz) && all(p.xz <= hi.xz)) return true;
                if (_DioraamaLeikkausMax.w < 0.5) return false;
                float2 keski = (lo.xz + hi.xz) * 0.5;
                float2 kohti = _DioraamaLeikkausKamera.xz - keski;
                float L = length(kohti);
                if (L < 1e-3) return false;
                float2 d = -kohti / L; // p:stä laatikkoa kohti
                float2 inv = 1.0 / ((step(0.0, d) * 2.0 - 1.0) * max(abs(d), 1e-5)); // ei nollalla jakoa
                float2 t0 = (lo.xz - p.xz) * inv, t1 = (hi.xz - p.xz) * inv;
                float2 tmin = min(t0, t1), tmax = max(t0, t1);
                float sisaan = max(tmin.x, tmin.y), ulos = min(tmax.x, tmax.y);
                // Katto nousee kameraa kohti (1.0.59 V10: pystykamera 19° / 28 m oli laatikon yläpuolella, ja kuori
                // laatikon yläreunan ja kameran välissä peitti tilan). Katto = yläreuna + (kamera.y − yläreuna) · s / Lreuna,
                // s = p:n matka laatikkoon, Lreuna = kameran matka laatikon reunaan (alakanttiin: L − puolilävistäjä).
                float Lreuna = max(L - 0.5 * length(hi.xz - lo.xz), 1.0);
                float katto = hi.y + max(0.0, _DioraamaLeikkausKamera.y - hi.y) * saturate(max(sisaan, 0.0) / Lreuna);
                return sisaan <= ulos && ulos >= 0 && sisaan <= L && p.y <= katto;
            }

            TEXTURE2D(_Kuva); SAMPLER(sampler_Kuva);

            CBUFFER_START(UnityPerMaterial)
                float4 _Kuva_ST;
                half _Kirkkaus;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 paikkaW : TEXCOORD1; float3 normaaliW : TEXCOORD2; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.normaaliW = TransformObjectToWorldNormal(i.normaali);
                o.uv = i.uv;
                return o;
            }

            // Yksi sarja: projektion uv, detaljin kirkkaussuhde ja maailman normaali (akselinormaalin ympärillä).
            // ylä: uv = xz, N = (t.x, t.z, t.y); sivu x: uv = zy, N = (s·t.z, t.y, t.x); sivu z: uv = xy, N = (t.x, t.y, s·t.z).
            void Sarja(TEXTURE2D_PARAM(dif, sd), TEXTURE2D_PARAM(nor, sn), float2 uv, int akseli, float merkki, float keski,
                       bool normaali, inout half suhde, inout float3 nd, float paino)
            {
                half3 d = SAMPLE_TEXTURE2D(dif, sd, uv).rgb;
                suhde += paino * (dot(d, half3(0.299h, 0.587h, 0.114h)) / max(keski, 0.05));
                if (!normaali) return;
                float3 t = SAMPLE_TEXTURE2D(nor, sn, uv).xyz * 2 - 1;
                float3 w = akseli == 0 ? float3(t.x, t.z, t.y) : akseli == 1 ? float3(merkki * t.z, t.y, t.x) : float3(t.x, t.y, merkki * t.z);
                float3 akseliN = akseli == 0 ? float3(0, 1, 0) : akseli == 1 ? float3(merkki, 0, 0) : float3(0, 0, merkki);
                nd += paino * (w - akseliN); // vain poikkeama projektion akselista (tasainen detalji = 0)
            }

            half3 Detalji(half3 vari, float2 uv0, float3 p, float3 n)
            {
                if (_DetaljiParam.z < 0.5) return vari;
                half4 m = SAMPLE_TEXTURE2D(_DetaljiMaski, sampler_DetaljiMaski, uv0);
                float summa = m.r + m.g + m.b + m.a;
                if (summa < 0.02) return vari;
                bool normaali = _DetaljiParam.y > 0.001;
                n = normalize(n);
                bool xAkseli = abs(n.x) > abs(n.z);
                float2 sivu = xAkseli ? p.zy : p.xy; int sivuAkseli = xAkseli ? 1 : 2; float sivuMerkki = xAkseli ? sign(n.x) : sign(n.z);
                float2 yla = p.xz;
                half suhde = 0; float3 nd = 0;
                if (m.r > 0.02) Sarja(TEXTURE2D_ARGS(_DetaljiDiff0, sampler_linear_repeat), TEXTURE2D_ARGS(_DetaljiNor0, sampler_linear_repeat),
                    sivu / _DetaljiToisto.x, sivuAkseli, sivuMerkki, _DetaljiKeski.x, normaali, suhde, nd, m.r);
                if (m.g > 0.02) Sarja(TEXTURE2D_ARGS(_DetaljiDiff1, sampler_linear_repeat), TEXTURE2D_ARGS(_DetaljiNor1, sampler_linear_repeat),
                    yla / _DetaljiToisto.y, 0, 1, _DetaljiKeski.y, normaali, suhde, nd, m.g);
                if (m.b > 0.02) Sarja(TEXTURE2D_ARGS(_DetaljiDiff2, sampler_linear_repeat), TEXTURE2D_ARGS(_DetaljiNor2, sampler_linear_repeat),
                    yla / _DetaljiToisto.z, 0, 1, _DetaljiKeski.z, normaali, suhde, nd, m.b);
                if (m.a > 0.02)
                {
                    float ylaPaino = saturate(abs(n.y) * 1.5 - 0.25);
                    if (ylaPaino > 0.02) Sarja(TEXTURE2D_ARGS(_DetaljiDiff3, sampler_linear_repeat), TEXTURE2D_ARGS(_DetaljiNor3, sampler_linear_repeat),
                        yla / _DetaljiToisto.w, 0, 1, _DetaljiKeski.w, normaali, suhde, nd, m.a * ylaPaino);
                    if (ylaPaino < 0.98) Sarja(TEXTURE2D_ARGS(_DetaljiDiff3, sampler_linear_repeat), TEXTURE2D_ARGS(_DetaljiNor3, sampler_linear_repeat),
                        sivu / _DetaljiToisto.w, sivuAkseli, sivuMerkki, _DetaljiKeski.w, normaali, suhde, nd, m.a * (1 - ylaPaino));
                }
                float kattavuus = saturate(summa);
                suhde = suhde / max(summa, 1e-3);
                vari *= lerp(1.0h, suhde, (half)(_DetaljiParam.x * kattavuus));
                if (normaali)
                {
                    float3 L = normalize(_DioraamaValo.xyz);
                    float3 n2 = normalize(n + nd / max(summa, 1e-3)); // detaljin poikkeama kallistaa mesh-normaalia
                    float ero = dot(n2, L) - dot(n, L);
                    vari *= (half)saturate(1 + _DetaljiParam.y * kattavuus * ero);
                }
                return vari;
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 vari = SAMPLE_TEXTURE2D(_Kuva, sampler_Kuva, i.uv).rgb * _Kirkkaus;
                vari = Detalji(vari, i.uv, i.paikkaW, i.normaaliW);
                if (_KavelyLeikkausN > 0.5 && KavelyLeikattu(i.paikkaW)) discard;
                if (_DioraamaLeikkausMin.w > 0.001)
                {
                    if (Leikkauksessa(i.paikkaW, 0)) discard;
                    // Reuna kuoren omasta väristä hieman vaaleampana (1.0.57: kiinteä vaalea sävy näkyi hämärässä valkoisena
                    // viivana); leikattu kivi erottuu, mutta seuraa päivän/hämärän kirkkautta.
                    if (Leikkauksessa(i.paikkaW, 0.12)) vari = vari * 1.45h + half3(0.02h, 0.018h, 0.015h);
                }
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
