// KUUMAILMAPALLON KORI (Päätoimittaja 7.10. 09.1x; Linnanrakentajan malli): korin punos, nahkareunus ja köydet overlay-kameralle.
// Kuvio uv:sta: _Kuvio 0 = sileä (nahka), 1 = punos (vinot säikeet), 2 = köysi (kierre), 3 = Linnanrakentajan mallin tekstuurit
// (_MainTex baseColor, _NorTex normaali, _OrmTex glTF metallicRoughness: R = AO, G = karheus). Ei varjoja.
// VALO KAUPUNGISTA (Linssiseppä 8.10.2026, pallo Unreal-tasolle kohta 1): PalloKori.AsetaValo antaa näkymäavaruudessa auringon
// suunnan ja värin, taivaan ylä- ja alaosan ambientin (Ydin KoriValaistus) ja kaupunkikameran valotuksen; normaalikartta ilman
// tangentteja ruutuderivaatoista (kotangenttikehys), kiiltoheijastus karheudesta. Ennen ensimmäistä AsetaValoa (_KoriValotus.w = 0)
// vanha kiinteä yläviisto valo.
// KUPU (Linssiseppä 8.10.2026, Linnanrakentajan kupu_nakyma.glb): _Cull 0 kaksipuolisille (kangas, nauhat; takapinnan normaali
// käännetään), _Lapikuulto = auringon valo kankaan läpi (pinnan takaa tuleva valo), ORM:n B = metallisuus (heijastus albedon
// värinen, hajavalo pienenee). Polttimen valo pistevalona (_KoriPoltinP näkymäavaruudessa, w = 1), muuten ylhäältä kuten ennen.
// KORI TUMMUU ALASPÄIN JA KÖYDET VASTAVALOSSA (omistaja TF 169, PT 9.10.: "köysi pitäisi olla tumma keskeltä, koska valo tulee
// edestä päin ... kori pitäisi olla vaalein ylhäältä ja sitten tummua jo alaspäin"): _Osa 1 = kori (PalloKori merkitsee korimallin ja
// paikkamerkin), 2 = köysi, 0 = muu (kupu, kompassi ennallaan). Kori: syvyys reunan alapuolella korin omaa pystyä pitkin
// (_KoriReunaV = reunan piste näkymäavaruudessa, w = näkyvä kaistale m; _KoriPystyV = korin ylös, w = 1 kun asetettu); ylin
// _KoriTummuus.x-osuus täysi valo, kaistaleen alalaidassa valo × _KoriTummuus.y, taivaan ambient lisäksi × _KoriTummuus.z;
// koskee aurinkoa, ambientia, kiiltoa ja poltinta (myös yöllä alaosa tumma). Köysi: kameraan päin oleva pinta (N·V) tummuu
// _KoysiSiluetti.x (vahvempi, kun aurinko on kuvan suunnassa edessä), reunoille vastavalon reunavalo _KoysiSiluetti.z, ja
// kuvan keskikorkeudella kulkeva osuus tummuu pituussuunnassa _KoysiSiluetti.y.
Shader "Matkakirja/Linssit/PalloKori"
{
    Properties
    {
        _Vari ("Väri", Color) = (0.55, 0.40, 0.24, 1) _Kuvio ("Kuvio", Float) = 1 _Toisto ("Toisto", Vector) = (40, 4, 0, 0)
        _MainTex ("Väri", 2D) = "white" {} _NorTex ("Normaali", 2D) = "bump" {} _OrmTex ("ORM", 2D) = "white" {}
        _NorVoima ("Normaalin voima", Float) = 1 _OnKartat ("Kartat", Float) = 0
        _Cull ("Cull", Float) = 2 _Lapikuulto ("Läpikuulto", Float) = 0 _Osa ("Osa (1 kori, 2 köysi)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        Pass
        {
            Name "Kori"
            Tags { "LightMode" = "UniversalForward" }
            Cull [_Cull]
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Vari; float _Kuvio; float4 _Toisto; float _NorVoima; float _OnKartat; float _Cull; float _Lapikuulto; float _Osa;
            CBUFFER_END
            float4 _KoriAurinkoV, _KoriAurinkoVari, _KoriYlosV, _KoriTaivasYla, _KoriTaivasAla, _KoriValotus, _KoriPoltin, _KoriPoltinP;
            float4 _KoriReunaV, _KoriPystyV, _KoriTummuus, _KoysiSiluetti;
            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            TEXTURE2D(_NorTex); SAMPLER(sampler_NorTex);
            TEXTURE2D(_OrmTex); SAMPLER(sampler_OrmTex);
            struct A { float4 p : POSITION; float3 n : NORMAL; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; float2 uv : TEXCOORD1; float3 pv : TEXCOORD2; };
            V vert(A a)
            {
                V v; float3 w = TransformObjectToWorld(a.p.xyz);
                v.p = TransformWorldToHClip(w); v.pv = TransformWorldToView(w);
                v.n = mul((float3x3)UNITY_MATRIX_V, TransformObjectToWorldNormal(a.n)); v.uv = a.uv * _Toisto.xy; return v;
            }
            // Normaalikartta ilman tangentteja (Schüler 2006): kotangenttikehys näkymäpaikan ja uv:n derivaatoista.
            float3 Kartta(float3 n, float3 pv, float2 uv)
            {
                float3 dp1 = ddx(pv), dp2 = ddy(pv); float2 du1 = ddx(uv), du2 = ddy(uv);
                float3 p2 = cross(dp2, n), p1 = cross(n, dp1);
                float3 t = p2 * du1.x + p1 * du2.x, b = p2 * du1.y + p1 * du2.y;
                float s = rsqrt(max(1e-12, max(dot(t, t), dot(b, b))));
                float3 tn = UnpackNormal(SAMPLE_TEXTURE2D(_NorTex, sampler_NorTex, uv));
                tn.xy *= _NorVoima;
                return normalize(tn.x * t * s + tn.y * b * s + tn.z * n);
            }
            // Korin syvyys reunan alapuolella (0 reunalla ja sen yläpuolella, 1 näkyvän kaistaleen alalaidassa).
            half KoriSyvyys(float3 pv)
            {
                if (_Osa < 0.5 || _Osa > 1.5 || _KoriPystyV.w < 0.5) return 0.0h;
                float d = dot(_KoriReunaV.xyz - pv, normalize(_KoriPystyV.xyz)) / max(_KoriReunaV.w, 1e-3);
                return (half)smoothstep(_KoriTummuus.x, 1.0, d);
            }
            half3 Valaise(half3 albedo, float3 n, float3 pv, half ao, half karheus, half metalli)
            {
                half syva = KoriSyvyys(pv);
                half tumma = lerp(1.0h, (half)_KoriTummuus.y, syva);
                if (_KoriValotus.w < 0.5)   // ei vielä kaupungin valoa: vanha kiinteä yläviisto valo (näkymäavaruudessa ylös ≈ +y)
                    return albedo * tumma * (0.55h + 0.45h * (half)saturate(dot(n, normalize(float3(-0.3, 0.8, 0.5)))));
                float3 l = normalize(_KoriAurinkoV.xyz), ylos = normalize(_KoriYlosV.xyz), katse = normalize(-pv);
                half kaari = (half)saturate((dot(n, l) + 0.3) / 1.3);   // kankaan ja punoksen pehmeä valo (wrap)
                half puoli = (half)(dot(n, ylos) * 0.5 + 0.5);
                half3 amb = lerp((half3)_KoriTaivasAla.rgb, (half3)_KoriTaivasYla.rgb, puoli) * ao;
                // Kori: korin sisäpuoli ja alaosa saavat vähemmän taivasta.
                amb *= lerp(1.0h, (half)(_KoriTummuus.y * _KoriTummuus.z), syva);
                // Köysi vastavalossa: aurinko kuvan suunnassa edessä (näkymäavaruudessa katse −z) → kameraan päin oleva pinta varjossa.
                half etu = (half)saturate(-l.z);
                half nv = (half)saturate(dot(n, katse));
                half siluetti = 1.0h, reunaValo = 0.0h, pituus = 1.0h;
                if (_Osa > 1.5)
                {
                    siluetti = 1.0h - (half)_KoysiSiluetti.x * lerp(0.6h, 1.0h, etu) * nv * nv;
                    half r1 = 1.0h - nv;
                    reunaValo = r1 * r1 * r1 * etu * (half)_KoysiSiluetti.z;
                    // Pituussuunta: kuvan keskikorkeudella kulkeva osuus tummin, ylä- ja alalaidan päät saavat enemmän hajavaloa.
                    float4x4 proj = UNITY_MATRIX_P;   // [1][1] = 1 / tan(fov/2); tekstuuriin piirrossa etumerkki voi kääntyä
                    float ys = pv.y * abs(proj[1][1]) / max(-pv.z, 1e-3);
                    pituus = 1.0h - (half)_KoysiSiluetti.y * (half)smoothstep(0.0, 1.0, 1.0 - saturate(abs(ys)));
                }
                float3 h = normalize(l + katse);
                half kiilto = (half)exp2(10.0 * (1.0 - karheus) + 1.0);
                half heijastus = (half)pow(saturate(dot(n, h)), kiilto) * (1.0h - karheus) * lerp(0.35h, 1.0h, metalli) * (half)saturate(dot(n, l));
                half3 hajaAlb = albedo * (1.0h - 0.8h * metalli);
                half3 kiiltoVari = lerp((half3)1.0h, albedo, metalli);
                // Läpikuulto: kankaan takaa (auringon puolelta) tuleva valo kuultaa läpi; albedon värisenä.
                half lapi = (half)saturate(-dot(n, l)) * (half)_Lapikuulto;
                half3 c = hajaAlb * (amb * siluetti + (half3)_KoriAurinkoVari.rgb * (kaari * siluetti + lapi + reunaValo)) + (half3)_KoriAurinkoVari.rgb * kiiltoVari * heijastus;
                c *= tumma * pituus;
                // Polttimen lämmin valo (Poltin.Liekki, PalloKori.PoltinValo): paikallinen valo, ei kaupungin valotusta. Pistevalona,
                // kun kupu on ladattu (_KoriPoltinP.w = 1; voimakkuus 1 korin reunan etäisyydellä ~4,5 m), muuten ylhäältä.
                half poltinK;
                if (_KoriPoltinP.w > 0.5)
                {
                    float3 dp = _KoriPoltinP.xyz - pv; float d2 = dot(dp, dp);
                    poltinK = (half)(saturate(dot(n, dp * rsqrt(max(d2, 1e-4))) * 0.6 + 0.4) * min(3.0, 21.0 / (1.0 + d2)));   // katto: suun köydet ja helma ovat aivan liekin vieressä
                }
                else poltinK = (half)saturate(dot(n, ylos) * 0.6 + 0.4);
                half3 poltin = hajaAlb * (half3)_KoriPoltin.rgb * poltinK * ao * tumma;   // yölläkin korin alaosa jää tummaksi
                return c * (half3)_KoriValotus.rgb + poltin;
            }
            half4 frag(V v, FRONT_FACE_TYPE etu : FRONT_FACE_SEMANTIC) : SV_Target
            {
                float3 n = normalize(v.n);
                n = IS_FRONT_VFACE(etu, n, -n);   // kaksipuolinen kangas: takapinta katsojaan päin
                if (_Kuvio > 2.5)
                {
                    half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv).rgb * _Vari.rgb;
                    half ao = 1.0h, karheus = 0.85h, metalli = 0.0h;
                    if (_OnKartat > 0.5)
                    {
                        n = Kartta(n, v.pv, v.uv);
                        half3 orm = SAMPLE_TEXTURE2D(_OrmTex, sampler_OrmTex, v.uv).rgb;
                        ao = orm.r; karheus = orm.g; metalli = orm.b;
                    }
                    return half4(Valaise(albedo, n, v.pv, ao, karheus, metalli), 1.0h);
                }
                half k = 1.0h;
                if (_Kuvio > 0.5 && _Kuvio < 1.5)
                {
                    // Punos: kaksi vinoa säiettä vuorotellen, säikeiden väliin tumma rako.
                    float2 u = v.uv;
                    float a = frac(u.x + u.y), b = frac(u.x - u.y);
                    float vuoro = step(0.5, frac(floor(u.x) * 0.5 + floor(u.y) * 0.5));
                    float s = lerp(a, b, vuoro);
                    k = 0.72h + 0.28h * (half)smoothstep(0.0, 0.25, s) * (half)smoothstep(1.0, 0.75, s);
                }
                else if (_Kuvio > 1.5)
                    k = 0.8h + 0.2h * (half)sin(6.2831 * (v.uv.x * 3.0 + v.uv.y));
                return half4(Valaise(_Vari.rgb * k, n, v.pv, 1.0h, 0.9h, 0.0h), 1.0h);
            }
            ENDHLSL
        }
    }
}
