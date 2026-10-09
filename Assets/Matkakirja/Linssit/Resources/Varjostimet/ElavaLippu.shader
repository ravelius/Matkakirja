// ELÄVÄ LIPPU (Linssiseppä 9.10.2026; Päätoimittaja juna 171, B8): lippukangas liehuu tuulessa. Verkko yksikkökokoinen ruudukko
// (x 0 tangossa → 1 vapaa reuna, y 0 yläreuna → −1 alareuna; TEXCOORD0 = (u, v, maa)); ElavaKaupunki skaalaa kankaan leveyteen ja
// korkeuteen ja kääntää vapaan reunan myötätuuleen (Ydin SavuJaLiput.LipunSuuntima). Aalto kärjessä globaalista _ElavaLippuAalto
// (Ydin SavuJaLiput.LipunAalto: amplitudi, kulmanopeus, aaltoluku, riippu): amplitudi kasvaa vapaata reunaa kohti, heikossa
// tuulessa kangas roikkuu. Väri proseduraalisesti: Ruotsi (sininen, keltainen risti), Ranska (sininen-valkoinen-punainen pystyraidat),
// muut neutraali valkoinen (ei lippukuvia). Valo kuten ElavaKohde; molemmat puolet; syvyyspassit samalla siirrolla.
Shader "Matkakirja/Linssit/ElavaLippu"
{
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        float4 _ElavaAurinko, _ElavaAurinkoVari, _ElavaTaivasYla, _ElavaTaivasAla, _ElavaLippuAalto;

        // Kankaan kärki aallon jälkeen (objektiavaruus) ja likimääräinen normaali.
        float3 Liehu(float3 p, float u, out float3 n)
        {
            float amp = _ElavaLippuAalto.x, w = _ElavaLippuAalto.y, k = _ElavaLippuAalto.z, riippu = _ElavaLippuAalto.w;
            float vaihe = dot(UNITY_MATRIX_M._m03_m23, float2(0.37, 0.71));
            float t = _Time.y;
            float s1 = sin(k * p.x - w * t + vaihe), s2 = sin(1.7 * k * p.x - 1.3 * w * t + p.y * 2.0 + vaihe);
            float z = amp * u * (s1 + 0.3 * s2);
            float dz = amp * (s1 + 0.3 * s2) + amp * u * (k * cos(k * p.x - w * t + vaihe) + 0.51 * k * cos(1.7 * k * p.x - 1.3 * w * t + p.y * 2.0 + vaihe));
            n = normalize(float3(-dz, 0, 1));
            // Riippu: vapaa reuna painuu alas tankoa vasten (kiinnitetty reuna paikallaan).
            float kulma = riippu * 1.35;
            return float3(p.x * cos(kulma), p.y - p.x * sin(kulma), z);
        }
        ENDHLSL
        Pass
        {
            Name "ElavaLippu"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_fog
            #pragma multi_compile_instancing
            struct A { float4 p : POSITION; float3 uv : TEXCOORD0; UNITY_VERTEX_INPUT_INSTANCE_ID };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; float3 uv : TEXCOORD1; float sumu : TEXCOORD2; };
            V vert(A a)
            {
                UNITY_SETUP_INSTANCE_ID(a);
                V v; float3 n; float3 q = Liehu(a.p.xyz, a.uv.x, n);
                v.p = TransformObjectToHClip(q); v.n = TransformObjectToWorldNormal(n); v.uv = a.uv;
                v.sumu = ComputeFogFactor(v.p.z); return v;
            }
            half3 Vari(float3 uv)
            {
                half3 c = half3(0.93h, 0.92h, 0.88h);
                if (uv.z > 0.5 && uv.z < 1.5)
                {
                    bool risti = (uv.x > 5.0 / 16.0 && uv.x < 7.0 / 16.0) || (uv.y > 0.4 && uv.y < 0.6);
                    c = risti ? half3(0.996h, 0.8h, 0.008h) : half3(0.0h, 0.416h, 0.655h);
                }
                else if (uv.z >= 1.5)
                    c = uv.x < 1.0 / 3.0 ? half3(0.0h, 0.333h, 0.643h) : uv.x < 2.0 / 3.0 ? half3(0.97h, 0.97h, 0.97h) : half3(0.937h, 0.255h, 0.208h);
                return pow(c, 2.2h);
            }
            half4 frag(V v) : SV_Target
            {
                float3 n = normalize(v.n), l = normalize(_ElavaAurinko.xyz);
                half kaari = (half)saturate((abs(dot(n, l)) + 0.25) / 1.25);   // kangas läpikuultaa: kumpikin puoli valossa
                half3 amb = lerp((half3)_ElavaTaivasAla.rgb, (half3)_ElavaTaivasYla.rgb, (half)(n.y * 0.5 + 0.5));
                half3 c = Vari(v.uv) * (amb + (half3)_ElavaAurinkoVari.rgb * kaari);
                return half4(MixFog(c, v.sumu), 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On
            ColorMask R
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            struct A { float4 p : POSITION; float3 uv : TEXCOORD0; UNITY_VERTEX_INPUT_INSTANCE_ID };
            float4 vert(A a) : SV_POSITION { UNITY_SETUP_INSTANCE_ID(a); float3 n; return TransformObjectToHClip(Liehu(a.p.xyz, a.uv.x, n)); }
            half frag() : SV_Target { return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthNormals"
            Tags { "LightMode" = "DepthNormals" }
            ZWrite On
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            struct A { float4 p : POSITION; float3 uv : TEXCOORD0; UNITY_VERTEX_INPUT_INSTANCE_ID };
            struct V { float4 p : SV_POSITION; float3 n : TEXCOORD0; };
            V vert(A a) { UNITY_SETUP_INSTANCE_ID(a); V v; float3 n; v.p = TransformObjectToHClip(Liehu(a.p.xyz, a.uv.x, n)); v.n = TransformObjectToWorldNormal(n); return v; }
            half4 frag(V v) : SV_Target { return half4(normalize(v.n), 0.0); }
            ENDHLSL
        }
    }
}
