// Cupola-ikkuna ISS:n kyydissä (omistajan palaute 28.9.2026: "Kupola on hyvä, mutta saisiko sen tummemman sävyiseksi ja siinä
// saisi näkyä myös joku valonlähde kuvassa … valonlähteet toisivat luonnolliset valoisuuden muutokset kupolan sisäpintaan …
// lasipinnat enemmän oikean lasin näköiseksi, pienine reunojen virheineen … Kupolan ulkopuolella näkyen joku osa
// avaruusasemasta … kerroksellisuutta"). Koko ruudun neliö kameran edessä (CupolaKerros), kolme kerrosta takaa eteen:
//   1) ulkona: Canadarm2 (kaksi puomia, kyynärnivel, tarttuja) ja aurinkopaneelin kulma, varjostettu auringon suunnasta
//      (ISS maan varjossa: vain maavalo alhaalta)
//   2) lasi: hento vihertävä sävy, heijastuskuva (Codex 26.9.) hitaasti huojuen, reunojen sameus ja valon siroaminen
//      lasin reunassa, tahrat, hiuksenohuet naarmut ja pölyhiukkaset, jotka syttyvät auringossa
//   3) kehys: Codexin kehyskuva tummennettuna (0,42), valaistuna: aurinkotäplä ikkunoista (auringon suunta kameraan nähden),
//      maavalo ikkunoiden läheltä (vaihtelee hitaasti kuin pilvet ohittaisivat), kaksi näkyvää LED-valaisinta sivuilla
//      lämpimine hehkuineen ja pinnan kohokuvio kehyskuvan kirkkaus- ja alfagradientista.
// Esikerrottu alfa (Blend One OneMinusSrcAlpha), jotta lasin heijastukset voivat lisätä valoa.
Shader "Matkakirja/Linssit/Cupola"
{
    Properties
    {
        _Kehys("Kehys (RGBA, suora alfa)", 2D) = "clear" {}
        _Heijastus("Heijastus (RGBA)", 2D) = "clear" {}
        _Peitto("Peitto", Range(0, 1)) = 1
        _Tumma("Kehyksen tummuus", Range(0, 1)) = 0.42
        _Ruutu("Ruudun kuvasuhde w/h", Float) = 0.46
        _Kuva("Kuvan kuvasuhde w/h", Float) = 0.46
        _AurinkoRuutu("Aurinko kamerassa (x, y, z; w = näkyy)", Vector) = (0.3, 0.5, 0.4, 1)
        _Maavalo("Maavalo 0…1", Float) = 0.8
        _Aika("Aika (s)", Float) = 0
        _Varsi("Käsivarsi ja paneeli 0/1", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Overlay+10" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_Kehys); SAMPLER(sampler_Kehys);
            TEXTURE2D(_Heijastus); SAMPLER(sampler_Heijastus);
            CBUFFER_START(UnityPerMaterial)
                float4 _Kehys_ST, _Heijastus_ST, _Kehys_TexelSize;
                half _Peitto, _Tumma;
                float _Ruutu, _Kuva, _Maavalo, _Aika, _Varsi;
                float4 _AurinkoRuutu;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            float Hash(float2 p) { p = frac(p * float2(123.34, 456.21)); p += dot(p, p + 45.32); return frac(p.x * p.y); }
            float Kohina(float2 p)
            {
                float2 i = floor(p), f = frac(p);
                f = f * f * (3 - 2 * f);
                return lerp(lerp(Hash(i), Hash(i + float2(1, 0)), f.x), lerp(Hash(i + float2(0, 1)), Hash(i + 1), f.x), f.y);
            }

            // Kapseli: etäisyys janasta a–b miinus säde; t = paikka janalla 0…1, s = etumerkillinen etäisyys akselista.
            float Kapseli(float2 p, float2 a, float2 b, float r, out float t, out float s)
            {
                float2 ab = b - a, ap = p - a;
                t = saturate(dot(ap, ab) / dot(ab, ab));
                float2 q = ap - ab * t;
                float2 kohtisuora = normalize(float2(-ab.y, ab.x));
                s = dot(q, kohtisuora);
                return length(q) - r;
            }

            // Naarmut (laitteen 2. kierros 28.9.: yhdensuuntaiset alipikseliviivat piirtyivät pisteriveinä): ruudukon soluun
            // korkeintaan yksi lyhyt hiusviiva satunnaisessa suunnassa, reunanpehmennys pikselin leveydestä (px), päät häipyvät.
            half Naarmut(float2 q, float px)
            {
                const float Solu = 0.06;
                float2 solu = floor(q / Solu);
                if (Hash(solu + 17.1) > 0.2) return 0;
                float2 p = q / Solu - solu;
                float kulma = Hash(solu + 3.7) * 3.14159;
                float2 suunta = float2(cos(kulma), sin(kulma));
                float pituus = 0.35 + 0.45 * Hash(solu + 9.2);
                float2 keski = 0.3 + 0.4 * float2(Hash(solu + 1.3), Hash(solu + 5.9));
                float2 a = keski - suunta * pituus * 0.5, ab = suunta * pituus;
                float t = saturate(dot(p - a, ab) / dot(ab, ab));
                float d = length(p - a - ab * t) * Solu;
                float viiva = 1 - smoothstep(px * 0.3, px * 1.1, d);
                float paat = smoothstep(0, 0.2, t) * smoothstep(1, 0.8, t);
                return (half)(viiva * paat * (0.45 + 0.55 * Hash(solu + 11.3)));
            }

            // Sylinterin varjostus poikkileikkauksen normaalista (s / r → −1…1) ja valon suunnasta ruututilassa.
            half Sylinteri(float s, float r, float2 akseli, float3 valo)
            {
                float x = clamp(s / r, -1, 1);
                float2 kohtisuora = normalize(float2(-akseli.y, akseli.x));
                float3 n = float3(kohtisuora * x, sqrt(max(0, 1 - x * x)));
                return (half)saturate(dot(n, valo));
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 uv = i.uv;
                // Kuva peittää ruudun (CSS cover): leikataan pidempi suunta.
                float2 k = uv;
                if (_Ruutu < _Kuva) k.x = 0.5 + (uv.x - 0.5) * _Ruutu / _Kuva;
                else k.y = 0.5 + (uv.y - 0.5) * _Kuva / _Ruutu;
                // Ruututila kuvasuhteen mukaan (muodot pysyvät pyöreinä): x −R/2…R/2, y 0…1 alhaalta.
                float2 q = float2((uv.x - 0.5) * _Ruutu, uv.y);

                half4 f = SAMPLE_TEXTURE2D(_Kehys, sampler_Kehys, k);
                half lahella = SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k, 3).a;    // kehyksen läheisyys (~8 px)
                half ikkunat = 1 - SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k, 6).a; // lasia ympärillä (~64 px)

                float3 aurinko = normalize(float3(_AurinkoRuutu.xy, max(0.15, _AurinkoRuutu.z)));
                half paiva = (half)_AurinkoRuutu.w;                   // 0 = ISS maan varjossa
                half pilvet = (half)(0.85 + 0.15 * Kohina(float2(_Aika * 0.04, 3.1)));
                half maavalo = (half)_Maavalo * pilvet;

                // --- 1) ulkona: Canadarm2 ja paneeli -------------------------------------------------------------
                half3 ulkoC = 0; half ulkoA = 0;
                if (_Varsi > 0.5)
                {
                    float3 valo = paiva > 0.01 ? aurinko : normalize(float3(0, -1, 0.35));
                    half voima = paiva > 0.01 ? paiva : maavalo * 0.35h;
                    float px = fwidth(q.y) * 1.2;
                    // Aurinkopaneelin kulma oikeassa yläikkunassa: kullanruskea kennoverkko, kiilto auringon suunnasta.
                    float2 pa = float2(0.085, 0.735), pu = normalize(float2(1, -0.18)), pv = float2(-pu.y, pu.x);
                    float2 pl = float2(dot(q - pa, pu), dot(q - pa, pv));
                    // Perspektiivi (laitteen 2. kierros 28.9.: tasainen ruudukko näytti yhä laattalattialta): paneeli loittonee
                    // oikealle kohti katoamispistettä x = 1 / 3,2, joten reunat suppenevat ja kennot tihenevät kauempana.
                    float syvyys = max(0.06, 1 - 3.2 * pl.x);
                    float2 pt = float2(pl.x / syvyys, pl.y / syvyys);   // paneelin tason koordinaatit
                    float paneeli = step(0, pl.x) * step(0, pt.y) * step(pt.y, 0.15);
                    // Kennot tason koordinaateissa, raot reunanpehmennettyinä (fwidth ennen haarautumista): lähellä 1 px:n tumma
                    // rako, kaukana ruudukko häipyy tasaiseksi sävyksi eikä muutu pistekuvioksi. Joka kahdeksas rivi on sauma.
                    float2 kenno = pt / float2(0.0042, 0.0030);
                    float2 kfw = max(fwidth(kenno), 1e-4);
                    float2 kr = abs(frac(kenno - 0.5) - 0.5) / kfw;
                    half hienous = (half)saturate(1.6 - max(kfw.x, kfw.y) * 2.2);
                    half rako = (half)(1 - saturate(min(kr.x, kr.y) - 0.35)) * hienous;
                    float sy = pt.y / 0.024, syfw = max(fwidth(sy), 1e-4);
                    half sauma = (half)(1 - saturate(abs(frac(sy - 0.5) - 0.5) / syfw - 0.4)) * (half)saturate(1.4 - syfw * 2);
                    if (paneeli > 0)
                    {
                        // Kennojen sävy vaihtelee hieman (valmistuserä), kullanruskea tummuu kauemmas.
                        half vaihtelu = (half)(0.9 + 0.2 * Hash(floor(kenno)));
                        half3 kulta = lerp(half3(0.60, 0.39, 0.13), half3(0.40, 0.25, 0.08), (half)saturate(pl.x * 3.5)) * vaihtelu;
                        half3 pinta = lerp(kulta, half3(0.06, 0.05, 0.045), saturate(rako * 0.55h + sauma * 0.4h));
                        half kiilto = (half)pow(saturate(dot(reflect(-aurinko, normalize(float3(0.1, 0.35, 0.93))), float3(0, 0, 1))), 18) * paiva;
                        half3 c = pinta * (0.16h + 0.7h * voima * (half)saturate(aurinko.z + 0.35)) + kiilto * half3(1, 0.85, 0.55) * (1 - rako * 0.7h) * 0.8h;
                        // Hopeinen kehysreuna ylä- ja alareunassa, alareunassa harmaa masto putkena.
                        float ry = min(pt.y, 0.15 - pt.y) * syvyys;
                        half reunus = (half)(1 - smoothstep(px * 0.8, px * 2.2, ry));
                        c = lerp(c, half3(0.62, 0.63, 0.64) * (0.25h + 0.75h * voima), reunus * 0.8h);
                        half masto = (half)(1 - smoothstep(0.0035, 0.0055, abs(pt.y - 0.004) * syvyys));
                        c = lerp(c, half3(0.55, 0.56, 0.57) * (0.3h + 0.8h * voima), masto);
                        ulkoC = c; ulkoA = 1;
                    }
                    // Canadarm2: olkapuomi vasemmalta kyynärniveleen, kyynärvarsi yläikkunaan ja tarttuja avaruutta vasten.
                    float2 olka = float2(-0.36, 0.60), kyynar = float2(-0.075, 0.795), ranne = float2(0.045, 0.955), paa = float2(0.07, 1.02);
                    float t1, s1, t2, s2, t3, s3;
                    float d1 = Kapseli(q, olka, kyynar, 0.0115, t1, s1);
                    float d2 = Kapseli(q, kyynar, ranne, 0.0105, t2, s2);
                    float d3 = Kapseli(q, ranne, paa, 0.0135, t3, s3);
                    float nivel1 = length(q - kyynar) - 0.021, nivel2 = length(q - ranne) - 0.0165;
                    float varsi = min(min(d1, d2), min(d3, min(nivel1, nivel2)));
                    half peitto = (half)(1 - smoothstep(-px, px, varsi));
                    if (peitto > 0)
                    {
                        half3 valkoinen = half3(0.86, 0.87, 0.85), harmaa = half3(0.36, 0.37, 0.38);
                        half3 c;
                        if (nivel1 < 0 || nivel2 < 0)
                        {
                            float2 nv = normalize(q - (nivel1 < 0 ? kyynar : ranne));
                            half l = (half)saturate(dot(float3(nv * 0.7, 0.71), valo));
                            c = harmaa * (0.18h + 0.95h * l * voima) + half3(0.9, 0.9, 0.85) * (half)pow(l, 20) * voima * 0.5h;
                        }
                        else
                        {
                            bool eka = d1 <= min(d2, d3), toka = !eka && d2 <= d3;
                            float t = eka ? t1 : toka ? t2 : t3, s = eka ? s1 : toka ? s2 : s3, r = eka ? 0.0115 : toka ? 0.0105 : 0.0135;
                            float2 akseli = eka ? kyynar - olka : toka ? ranne - kyynar : paa - ranne;
                            half l = Sylinteri(s, r, akseli, valo);
                            // Eristeen saumat puomilla ja tarttujan tumma pää.
                            half sauma = (half)(step(frac(t * (eka ? 9 : 7)), 0.035) * (d3 < min(d1, d2) ? 0 : 1));
                            half3 pohja = d3 < min(d1, d2) ? lerp(valkoinen, harmaa, (half)step(0.55, t)) : valkoinen;
                            c = pohja * (0.14h + 0.95h * l * voima) * (1 - sauma * 0.45h) + half3(1, 1, 0.95) * (half)pow(l, 30) * voima * 0.35h;
                        }
                        ulkoC = c * peitto + ulkoC * (1 - peitto);
                        ulkoA = peitto + ulkoA * (1 - peitto);
                    }
                }

                // --- 2) lasi --------------------------------------------------------------------------------------
                half lasi = 1 - f.a;
                half aurinkoLasiin = paiva * (half)saturate(aurinko.z * 0.8 + 0.4);
                half savy = 0.09h;
                half3 lasiC = half3(0.05, 0.11, 0.09) * savy;     // vihertävä sävy (esikerrottu)
                half lasiA = savy;
                // Reunojen sameus ja valon siroaminen lasin reunassa.
                half reuna = (half)saturate(lahella * 2.2) * lasi;
                lasiA += reuna * 0.12h;
                lasiC += half3(0.55, 0.66, 0.70) * reuna * (0.05h + 0.16h * aurinkoLasiin + 0.05h * maavalo);
                // Heijastuskuva hitaasti huojuen (0,4 % ruudusta, 11 s).
                float2 huojunta = float2(sin(_Aika * 0.57), cos(_Aika * 0.43)) * 0.004;
                half4 h = SAMPLE_TEXTURE2D(_Heijastus, sampler_Heijastus, k + huojunta);
                lasiC += h.rgb * h.a * 0.9h;
                // Tahrat, naarmut ja pöly: näkyvät vain valossa.
                half tahra = (half)smoothstep(0.62, 0.92, Kohina(q * 14 + 7.3)) * (half)Kohina(q * 55);
                half naarmu = Naarmut(q, fwidth(q.y));
                half poly = (half)step(0.9965, Hash(floor(q * 900))) * (half)saturate(lahella * 3 + 0.2);
                half valossa = 0.12h + 0.9h * aurinkoLasiin;
                lasiC += half3(0.8, 0.85, 0.85) * (tahra * 0.05h + naarmu * 0.22h + poly * 0.35h) * valossa * lasi;
                lasiA += tahra * 0.03h * lasi;
                lasiC *= lasi; lasiA *= lasi;

                // --- 3) kehys -------------------------------------------------------------------------------------
                float2 e = _Kehys_TexelSize.xy * 2;
                half lx = dot(SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k + float2(e.x, 0), 1).rgb - SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k - float2(e.x, 0), 1).rgb, half3(0.3, 0.59, 0.11));
                half ly = dot(SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k + float2(0, e.y), 1).rgb - SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k - float2(0, e.y), 1).rgb, half3(0.3, 0.59, 0.11));
                half ax = SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k + float2(e.x * 3, 0), 2).a - SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k - float2(e.x * 3, 0), 2).a;
                half ay = SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k + float2(0, e.y * 3), 2).a - SAMPLE_TEXTURE2D_LOD(_Kehys, sampler_Kehys, k - float2(0, e.y * 3), 2).a;
                float3 n = normalize(float3(-(lx * 5 + ax * 1.6), -(ly * 5 + ay * 1.6), 1));
                // Aurinkotäplä: ikkunoista tuleva valo osuu kehykseen auringon suunnasta (siirtyy radan mukana).
                float2 tapla = float2(0.5, 0.5) + _AurinkoRuutu.xy * float2(0.42, 0.38);
                half taplaan = (half)(1 - smoothstep(0.08, 0.42, length((uv - tapla) * float2(_Ruutu / 0.46, 1))));
                half avain = (half)saturate(dot(n, aurinko)) * paiva * (0.35h + 1.25h * taplaan) * (0.5h + 0.5h * (half)ikkunat);
                // Maavalo ikkunoiden läheltä (sinertävä), sisävalo ja kaksi näkyvää LED-valaisinta sivuilla.
                half maa = maavalo * (0.12h + 0.55h * ikkunat) * (half)saturate(n.z * 0.7 + 0.3 - n.y * 0.3);
                float2 ledV = float2(-0.205 * _Ruutu / 0.46, 0.505), ledO = float2(0.205 * _Ruutu / 0.46, 0.505);
                // Kapea pystysuora valonauha (~1,2 % × 4 % ruudusta), ei palloa: laitteen 1. kierros oli ylivalottunut (28.9.).
                float2 nv = (q - ledV) * float2(1, 0.3), no = (q - ledO) * float2(1, 0.3);
                float dv = length(nv), dO = length(no);
                half led = (half)(exp(-dot(nv, nv) / 0.00004) + exp(-dot(no, no) / 0.00004));
                half ledValo = (half)(0.32 * exp(-min(dv, dO) / 0.035));
                half3 kehysValo = half3(0.11, 0.115, 0.13)                          // ympäristö
                                + half3(1.0, 0.95, 0.86) * avain * 1.25h               // aurinko
                                + half3(0.55, 0.64, 0.78) * maa                        // maavalo
                                + half3(1.0, 0.80, 0.58) * ledValo;                    // LED
                half3 kehysC = f.rgb * _Tumma * kehysValo * 2.2h;
                // Valaisimet itse: kirkas lämmin ydin ja hehku (näkyvä valonlähde kuvassa).
                half3 ledC = half3(1.0, 0.88, 0.70) * saturate(led) * 1.2h + half3(1.0, 0.8, 0.55) * (half)(0.18 * exp(-min(dv, dO) / 0.012));
                kehysC = kehysC + ledC * f.a;

                // --- koostus takaa eteen (esikerrottu) ----------------------------------------------------------------
                half3 c = ulkoC * ulkoA * lasi;
                half a = ulkoA * lasi;
                c = lasiC + c * (1 - lasiA);
                a = lasiA + a * (1 - lasiA);
                c = kehysC * f.a + c * (1 - f.a);
                a = f.a + a * (1 - f.a);
                // LED-hehku myös lasin puolelle (siroaa ilmaan).
                c += half3(1.0, 0.82, 0.6) * (half)(0.03 * exp(-min(dv, dO) / 0.02)) * lasi;
                return half4(c, a) * _Peitto;
            }
            ENDHLSL
        }
    }
}
