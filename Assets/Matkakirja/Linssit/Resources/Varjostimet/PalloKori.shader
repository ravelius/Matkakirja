// KUUMAILMAPALLON KORI (Päätoimittaja 7.10. 09.1x; Linnanrakentajan malli): korin punos, nahkareunus ja köydet overlay-kameralle.
// Kuvio uv:sta: _Kuvio 0 = sileä (nahka), 1 = punos (vinot säikeet), 2 = köysi (kierre), 3 = Linnanrakentajan mallin tekstuurit
// (_MainTex baseColor, _NorTex normaali, _OrmTex glTF metallicRoughness: R = AO, G = karheus). Ei varjoja.
// VALO KAUPUNGISTA (Linssiseppä 8.10.2026, pallo Unreal-tasolle kohta 1): PalloKori.AsetaValo antaa näkymäavaruudessa auringon
// suunnan ja värin, taivaan ylä- ja alaosan ambientin (Ydin KoriValaistus) ja kaupunkikameran valotuksen; normaalikartta ilman
// tangentteja ruutuderivaatoista (kotangenttikehys), kiiltoheijastus karheudesta. Ennen ensimmäistä AsetaValoa (_KoriValotus.w = 0)
// vanha kiinteä yläviisto valo.
Shader "Matkakirja/Linssit/PalloKori"
{
    Properties
    {
        _Vari ("Väri", Color) = (0.55, 0.40, 0.24, 1) _Kuvio ("Kuvio", Float) = 1 _Toisto ("Toisto", Vector) = (40, 4, 0, 0)
        _MainTex ("Väri", 2D) = "white" {} _NorTex ("Normaali", 2D) = "bump" {} _OrmTex ("ORM", 2D) = "white" {}
        _NorVoima ("Normaalin voima", Float) = 1 _OnKartat ("Kartat", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        Pass
        {
            Name "Kori"
            Tags { "LightMode" = "UniversalForward" }
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Vari; float _Kuvio; float4 _Toisto; float _NorVoima; float _OnKartat;
            CBUFFER_END
            float4 _KoriAurinkoV, _KoriAurinkoVari, _KoriYlosV, _KoriTaivasYla, _KoriTaivasAla, _KoriValotus;
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
            half3 Valaise(half3 albedo, float3 n, float3 pv, half ao, half karheus)
            {
                if (_KoriValotus.w < 0.5)   // ei vielä kaupungin valoa: vanha kiinteä yläviisto valo (näkymäavaruudessa ylös ≈ +y)
                    return albedo * (0.55h + 0.45h * (half)saturate(dot(n, normalize(float3(-0.3, 0.8, 0.5)))));
                float3 l = normalize(_KoriAurinkoV.xyz), ylos = normalize(_KoriYlosV.xyz), katse = normalize(-pv);
                half kaari = (half)saturate((dot(n, l) + 0.3) / 1.3);   // kankaan ja punoksen pehmeä valo (wrap)
                half puoli = (half)(dot(n, ylos) * 0.5 + 0.5);
                half3 amb = lerp((half3)_KoriTaivasAla.rgb, (half3)_KoriTaivasYla.rgb, puoli) * ao;
                float3 h = normalize(l + katse);
                half kiilto = (half)exp2(10.0 * (1.0 - karheus) + 1.0);
                half heijastus = (half)pow(saturate(dot(n, h)), kiilto) * (1.0h - karheus) * 0.35h * (half)saturate(dot(n, l));
                half3 c = albedo * (amb + (half3)_KoriAurinkoVari.rgb * kaari) + (half3)_KoriAurinkoVari.rgb * heijastus;
                return c * (half3)_KoriValotus.rgb;
            }
            half4 frag(V v) : SV_Target
            {
                float3 n = normalize(v.n);
                if (_Kuvio > 2.5)
                {
                    half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, v.uv).rgb * _Vari.rgb;
                    half ao = 1.0h, karheus = 0.85h;
                    if (_OnKartat > 0.5)
                    {
                        n = Kartta(n, v.pv, v.uv);
                        half3 orm = SAMPLE_TEXTURE2D(_OrmTex, sampler_OrmTex, v.uv).rgb;
                        ao = orm.r; karheus = orm.g;
                    }
                    return half4(Valaise(albedo, n, v.pv, ao, karheus), 1.0h);
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
                return half4(Valaise(_Vari.rgb * k, n, v.pv, 1.0h, 0.9h), 1.0h);
            }
            ENDHLSL
        }
    }
}
