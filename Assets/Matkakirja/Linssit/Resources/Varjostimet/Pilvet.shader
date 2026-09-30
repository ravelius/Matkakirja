// Pilvikuori (web js/linssit/astro-sumu.js): tasavälinen pilvikuva pallokuoren
// pinnalla, alfa valmiiksi laskettu (Pilvikuva.Alfa), peitto kameran korkeudesta.
// Ulkopinta näkyy (Cull Back), joten kuoren takapuoli ei piirry pallon eteen.
// IHMISEN MATKA II (sumu, erä 3): sävy (_Vari) ja valokeila — keilojen ulkopuolella pilvet himmenevät kuten pallo
// (KarttaKerrokset: perusväri × (1 − 0,95 · hämäryys)). Oletukset (_Vari valkoinen, _Hamara 0) pitävät astronautin ja
// lennon pilvet ennallaan.
// TERÄVÄT PILVET KYYDISSÄ (_Tarkkuus > 0, omistaja 28.9.: "Vielä liikaa blurrina"): päivän pilvikuva on 4096 px eli noin
// 10 km/px, ja Cupolasta katsottuna yksi tekseli on ruudulla 30–50 px, joten pilvien reunat levisivät liukumiksi. Kuva
// näytteistetään bikuubisesti (B-splini, neljä bilineaarista näytettä). Reuna piirretään kohinakynnyksellä: pilvi on siellä,
// missä alfa ylittää kynnyksen 0,5 ± 0,36. Kynnys vaihtelee 5 oktaavin simplex-kohinana maan pinnalla (pohja 35 km). Kynnys
// liikkuu vain reunavyöhykkeellä, joten pilvien paikat ja peitto pysyvät kuvan mukaisina. Kahden alimman oktaavin kohina
// antaa pilvien pinnalle ±5 %:n kirkkausvaihtelun. Alle kahden pikselin oktaavit häivytetään. Kun kohinasta ei näy mitään
// (kaukaa, horisontissa), tulos palaa pelkkään kuvaan.
// PILVIEN VALAISTUS KYYDISSÄ (fotorealismi osa 3, Linssiseppä 30.9.2026; _Valaistus > 0): auringon korkeus pilven kohdalla
// himmentää pilven terminaattoria kohti ja punertaa sen matalassa valossa (aurinko 0…12°), ohuet pilvet harmaampia kuin
// paksut (valo siroaa läpi); yön tummennus on edelleen Yokuorilla. A/B `astro kyyti pilvivalo 0|1`.
Shader "Matkakirja/Linssit/Pilvet"
{
    Properties
    {
        _MainTex("Pilvikuva", 2D) = "black" {}
        _Tarkkuus("Terävät pilvet kyydissä (0 = ennallaan)", Range(0, 1)) = 0
        _TarkkuusKm("Kohinan pohja-aallonpituus (km)", Float) = 35
        _Peitto("Peitto", Range(0, 1)) = 0.9
        _Karsinta("Pilvipeiton säädin: ohuet pilvet pois ensin (0 = ennallaan, 1 = selkeä)", Range(0, 1)) = 0
        _Vari("Sävy", Color) = (1, 1, 1, 1)
        _Hamara("Hämäryys keilojen ulkopuolella", Range(0, 1)) = 0
        _Tasainen("Tasainen usva (alfan pohja, pilvettömällä valkoinen)", Range(0, 1)) = 0
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _KeilaA("Pääkeila: suunta, cos ulkoreuna", Vector) = (0, 0, 1, 2)
        _KeilaAsisa("Pääkeila: cos sisäreuna, voimakkuus", Vector) = (2, 0, 0, 0)
        _KeilaB("Toinen keila: suunta, cos ulkoreuna", Vector) = (0, 0, 1, 2)
        _KeilaBsisa("Toinen keila: cos sisäreuna, voimakkuus", Vector) = (2, 0, 0, 0)
        _Valaistus("Auringon valaistus kyydissä (0 = pois)", Range(0, 1)) = 0
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-50" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 3.5
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float4 _MainTex_TexelSize;
                half _Tarkkuus;
                float _TarkkuusKm;
                half _Peitto;
                half _Karsinta;
                half4 _Vari;
                half _Hamara;
                half _Tasainen;
                float4 _Keskus;
                float4 _KeilaA, _KeilaAsisa, _KeilaB, _KeilaBsisa;
                half _Valaistus;
                float4 _Aurinko;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 maailma : TEXCOORD1; float3 olio : TEXCOORD2; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.uv = i.uv;
                o.olio = i.paikka.xyz;   // maan keskipisteestä; kiertyy kuoren mukana, joten kohina pysyy pilvissä
                return o;
            }

            // Kokonaislukuhajautus (ei sin()-temppua, joka on mobiili-GPU:lla epätarkka isoilla koordinaateilla).
            uint Hajautus(int3 k)
            {
                uint h = (asuint(k.x) * 0x8da6b343u) ^ (asuint(k.y) * 0xd8163841u) ^ (asuint(k.z) * 0xcb1ab31fu);
                h ^= h >> 16; h *= 0x7feb352du; h ^= h >> 15; h *= 0x846ca68bu; h ^= h >> 16;
                return h;
            }

            float3 Gradientti(int3 k)
            {
                uint h = Hajautus(k);
                return float3(h & 1023u, (h >> 10) & 1023u, (h >> 20) & 1023u) * (2.0 / 1023.0) - 1.0;
            }

            // 3D-simplex-kohina (Gustavsonin menetelmä), arvot noin −1…1, keskihajonta noin 0,39 (esikatselu 28.9.).
            float Simplex(float3 p)
            {
                const float G3 = 1.0 / 6.0;
                float3 s = floor(p + (p.x + p.y + p.z) * (1.0 / 3.0));
                float3 x0 = p - s + (s.x + s.y + s.z) * G3;
                float3 g = step(x0.yzx, x0.xyz);
                float3 l = 1.0 - g;
                float3 i1 = min(g, l.zxy), i2 = max(g, l.zxy);
                float3 x1 = x0 - i1 + G3, x2 = x0 - i2 + 2.0 * G3, x3 = x0 - 1.0 + 3.0 * G3;
                int3 k = (int3)s;
                float4 m = max(0.6 - float4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
                m *= m; m *= m;
                float4 d = float4(dot(Gradientti(k), x0), dot(Gradientti(k + (int3)i1), x1),
                                  dot(Gradientti(k + (int3)i2), x2), dot(Gradientti(k + 1), x3));
                return 42.0 * dot(m, d);
            }

            float4 Bilineaarinen(float2 uv, float2 dx, float2 dy) { return SAMPLE_TEXTURE2D_GRAD(_MainTex, sampler_MainTex, uv, dx, dy); }

            // Pilvipeiton säädin (omistaja 28.9. TF 1.0.39: "Pilvet peittävät aika paljon"): kynnys alfasta heti näytteen jälkeen,
            // joten ohuet pilvet katoavat ensin ja paksut jäävät (tasainen alfakerroin tekisi kaikista harsoa). K = 0 ennallaan.
            float Karsi(float a) { return _Karsinta > 0.0 ? saturate((a - _Karsinta) / max(1.0 - _Karsinta, 1e-3)) : a; }

            half4 TarkatPilvet(Vali i, out half vaihtelu)
            {
                // Derivaatat ennen dataan perustuvia haaroja. Saumassa (pituus ±180°) u hyppää 1 → 0, joten otetaan pienempi
                // derivaatta u:sta ja frac(u + 0,5):stä (muuten saumaan tulisi alimman mip-tason viiva).
                float2 dx = ddx(i.uv), dy = ddy(i.uv);
                float u2 = frac(i.uv.x + 0.5);
                float u2x = ddx(u2), u2y = ddy(u2);
                dx.x = abs(u2x) < abs(dx.x) ? u2x : dx.x;
                dy.x = abs(u2y) < abs(dy.x) ? u2y : dy.x;
                float3 q = normalize(i.olio) * (6371.0 / max(_TarkkuusKm, 1.0));
                float jalki = max(length(ddx(q)), length(ddy(q)));   // kohinan yksikköä pikseliä kohden pohjataajuudella

                // Bikuubinen B-splini (Ruijters 2008): napautukset i − 1 + α ja i + 1 + β tekselikoordinaateissa.
                float2 st = i.uv * _MainTex_TexelSize.zw - 0.5;
                float2 ix = floor(st), f = st - ix, o = 1.0 - f;
                float2 w0 = o * o * o / 6.0, w1 = 2.0 / 3.0 - 0.5 * f * f * (2.0 - f);
                float2 w2 = 2.0 / 3.0 - 0.5 * o * o * (2.0 - o), w3 = f * f * f / 6.0;
                float2 g0 = w0 + w1, g1 = w2 + w3;
                float2 t0 = (ix - 0.5 + w1 / g0) * _MainTex_TexelSize.xy, t1 = (ix + 1.5 + w3 / g1) * _MainTex_TexelSize.xy;
                float4 c = g0.y * (g0.x * Bilineaarinen(float2(t0.x, t0.y), dx, dy) + g1.x * Bilineaarinen(float2(t1.x, t0.y), dx, dy))
                         + g1.y * (g0.x * Bilineaarinen(float2(t0.x, t1.y), dx, dy) + g1.x * Bilineaarinen(float2(t1.x, t1.y), dx, dy));
                float a0 = Karsi(saturate(c.a));   // pilvipeiton säädin ennen kohinakynnystä (terävä reuna karsitusta alfasta)

                // Oktaavien häivytys (alle kahden pikselin oktaavi häipyy) ja näkyvä osuus ennen haaraa.
                float h[5];
                float kaikki = 0.0, nakyva = 0.0, amp = 1.0, taaj = 1.0;
                [unroll] for (int k = 0; k < 5; k++)
                {
                    h[k] = saturate(1.5 - 2.0 * jalki * taaj);
                    kaikki += amp * amp; nakyva += amp * amp * h[k] * h[k];
                    amp *= 0.5; taaj *= 2.2;
                }
                float nak = sqrt(nakyva / kaikki) * _Tarkkuus;
                vaihtelu = 0.0h;
                // Kynnys t liikkuu välillä 0,14…0,86 ja reunan leveys on ± 0,08, joten alle 0,06:n alfa on terävänä aina 0:
                // kirkkaalla alueella ei ole kohinahiutaleita eikä kohinaa tarvitse laskea.
                float aTarkka = 0.0;
                [branch] if (a0 > 0.06)
                {
                    float summa = 0.0, ala = 0.0;
                    amp = 1.0; taaj = 1.0;
                    [unroll] for (int j = 0; j < 5; j++)
                    {
                        summa += amp * h[j] * Simplex(q * taaj + j * 31.7);
                        if (j == 1) ala = summa;
                        amp *= 0.5; taaj *= 2.2;
                    }
                    const float Sigma = 0.39;
                    float fn = summa * rsqrt(max(nakyva, 1e-4)) / Sigma;
                    float t = 0.5 + 0.36 * tanh(0.8 * fn);
                    aTarkka = smoothstep(t - 0.08, t + 0.08, a0);
                    vaihtelu = (half)(0.05 * clamp(ala / Sigma, -2.5, 2.5) * nak);
                }
                c.a = lerp(a0, aTarkka, nak);
                return (half4)c;
            }

            half4 frag(Vali i) : SV_Target
            {
                half vaihtelu = 0.0h;
                half4 c;
                if (_Tarkkuus > 0.0h) c = TarkatPilvet(i, vaihtelu);
                else { c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv); c.a = (half)Karsi(c.a); }
                c.rgb *= 1.0h + vaihtelu;
                if (_Tasainen > 0.0h)
                {
                    // Seutusumu (II): pilvikartan aavikoilla ei ole pilviä, joten usva saa tasaisen pohjan (valkoinen,
                    // sävy _Varista) ja pilvet piirtyvät sen päälle.
                    c.rgb = lerp(1.0h, c.rgb, saturate(c.a * 4.0h));
                    c.a = max(c.a, _Tasainen);
                }
                half valo = 1.0h;
                if (_Valaistus > 0.0h)
                {
                    float mu = dot(normalize(i.maailma - _Keskus.xyz), normalize(_Aurinko.xyz));
                    half paiva = (half)smoothstep(-0.12, 0.3, mu);
                    half3 matala = lerp(half3(1.0h, 0.58h, 0.36h), 1.0h, (half)smoothstep(0.0, 0.21, mu));
                    half paksuus = lerp(0.8h, 1.0h, saturate(c.a * 1.4h));
                    c.rgb *= lerp(1.0h, matala * lerp(0.35h, 1.0h, paiva) * paksuus, _Valaistus);
                }
                if (_Hamara > 0.0h)
                {
                    // Keilat maan keskipisteestä katsottuina (cos-kulmat): pilvi on keilassa yhtä kirkas kuin pallo.
                    float3 d = normalize(i.maailma - _Keskus.xyz);
                    half a = smoothstep(_KeilaA.w, _KeilaAsisa.x, dot(d, _KeilaA.xyz)) * _KeilaAsisa.y;
                    half b = smoothstep(_KeilaB.w, _KeilaBsisa.x, dot(d, _KeilaB.xyz)) * _KeilaBsisa.y;
                    valo = max(1.0h - 0.95h * _Hamara, max(a, b));
                }
                return half4(c.rgb * _Vari.rgb * valo, c.a * _Peitto * _Vari.a * lerp(0.5h, 1.0h, valo));
            }
            ENDHLSL
        }
    }
}
