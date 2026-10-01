// SIJAINTIPALLO (Linssiseppä 1.10.2026; omistaja klo 00.1x Päätoimittajan kautta: "pystyisikö näytölle tekemään ilman pilviä ja
// muuta ylimääräistä pienen maapallon, joka näyttäisi pisteellä aina kyseisen kuvan maapallolla"): astronautin kameran
// kuvanäkymän pieni pallo. Pinta BMNG:n Z1-tiilistä (Web Mercator 512², kuukausi kuten kyydissä), ei pilviä eikä ilmakehää;
// pehmeä valo vasemmalta ylhäältä, meripihkan piste kohteen kohdalla (_Kohde, olion avaruus). Oma kerros 12 ja kamera
// (UI/Linssit/Sijaintipallo.cs), piirto RenderTextureen vain liikkeen aikana.
Shader "Matkakirja/Linssit/Sijaintipallo"
{
    Properties
    {
        _MainTex("BMNG Web Mercator", 2D) = "gray" {}
        _Kohde("Kohteen suunta (olio)", Vector) = (0, 0, -1, 0)
        _Piste("Pisteen säde (rad)", Float) = 0.055
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float4 _Kohde;
                float _Piste;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; };
            struct Vali { float4 paikka : SV_POSITION; float3 olio : TEXCOORD0; float3 maailma : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.olio = i.normaali;
                o.maailma = TransformObjectToWorldNormal(i.normaali);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.olio);
                // Maan kehys: piste (lat, lon) = (cos lat cos lon, sin lat, cos lat sin lon).
                float lat = asin(clamp(n.y, -1.0, 1.0)), lon = atan2(n.z, n.x);
                float latM = clamp(lat, -1.4844, 1.4844);
                float v = 0.5 + log(tan(0.7853982 + latM * 0.5)) / 6.2831853;
                float u = lon / 6.2831853 + 0.5;
                // LOD 0: ei mip-saumaa pituuden ±180°:ssa (pieni kuva, pieni tekstuuri).
                half3 c = SAMPLE_TEXTURE2D_LOD(_MainTex, sampler_MainTex, float2(u, v), 0).rgb;
                // BMNG:n meri on lähes musta (≈ 0,02 0,04 0,12): kierron aikana valtameri näytti tyhjältä, tummalta pallolta
                // (Laitetestaaja 1.10., build 86) → avomeri syvän siniseksi; maa (sininen ei hallitse) ja vaalea rannikko ennallaan.
                half l = dot(c, half3(0.3h, 0.59h, 0.11h));
                half meri = saturate((c.b - max(c.r, c.g)) * 12.0h) * (1.0h - smoothstep(0.06h, 0.16h, l));
                c = lerp(c, half3(0.07h, 0.16h, 0.34h), meri);
                if (abs(lat) > 1.4844) c = half3(0.84, 0.87, 0.9);   // navat Mercatorin ulkopuolella: jää
                float3 N = normalize(i.maailma);
                float3 L = normalize(float3(-0.45, 0.55, -0.7));
                half valo = (half)(0.42 + 0.68 * saturate(dot(N, L)));
                c *= valo;
                // Kohteen piste: kulmaetäisyys < _Piste meripihka, ohut tumma reuna.
                float kulma = acos(clamp(dot(n, normalize(_Kohde.xyz)), -1.0, 1.0));
                half piste = (half)(1.0 - smoothstep(_Piste - 0.008, _Piste, kulma));
                half reuna = (half)(1.0 - smoothstep(_Piste + 0.012, _Piste + 0.02, kulma)) - piste;
                c = lerp(c, half3(0.08, 0.05, 0.02), saturate(reuna) * 0.8h);
                c = lerp(c, half3(1.0, 0.64, 0.22), piste);
                return half4(c, 1);
            }
            ENDHLSL
        }
    }
}
