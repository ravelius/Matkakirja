// OPPAAN YKSITYISKOHTAKUVA NOSTOKORTTI-KEHYKSESSÄ (omistaja 7.10. 10.1x, Natiivi-UI:n arvot): paperi (Tyylikirja.Paperi.Pinta),
// reunus 1 pt (Paperi.Reunus), pyöristetty kulma 12 pt, kuva sisennettynä 4 % kortin leveydestä, alla kuvatekstikaista (_AlaPt).
// Mitat pisteinä _Koko = (kortin leveys, korkeus); pyöristys ja reunus etäisyyskentästä (pehmeä reuna fwidthillä). _Alfa häivytys.
Shader "Matkakirja/Linssit/Nostokortti"
{
    Properties
    {
        _MainTex ("Kuva", 2D) = "white" {}
        _Paperi ("Paperi", Color) = (1, 1, 1, 1)
        _Reuna ("Reunus", Color) = (0, 0, 0, 0.3)
        _Koko ("Koko pt (l, k)", Vector) = (300, 220, 0, 0)
        _ReunaPt ("Reunus pt", Float) = 1
        _KulmaPt ("Kulma pt", Float) = 12
        _SisennysPt ("Sisennys pt", Float) = 12
        _AlaPt ("Kuvatekstikaista pt", Float) = 0
        _Alfa ("Alfa", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "Nostokortti"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha, One OneMinusSrcAlpha   // alfa "over": KaupunkiKooste-RT esikerrottu (Linssiseppä 8.10.)
            ZWrite Off
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            CBUFFER_START(UnityPerMaterial)
            half4 _Paperi; half4 _Reuna; float4 _Koko; float _ReunaPt; float _KulmaPt; float _SisennysPt; float _AlaPt; float _Alfa;
            float4 _MainTex_ST;
            CBUFFER_END
            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a) { V v; v.p = TransformObjectToHClip(a.p.xyz); v.uv = a.uv; return v; }

            // Pyöristetyn suorakulmion etäisyys (pt): negatiivinen sisällä.
            float Laatikko(float2 p, float2 puoli, float r)
            {
                float2 q = abs(p) - puoli + r;
                return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
            }

            half4 frag(V v) : SV_Target
            {
                float2 koko = _Koko.xy;
                float2 p = (v.uv - 0.5) * koko;
                float d = Laatikko(p, koko * 0.5, _KulmaPt);
                float w = max(fwidth(d), 1e-4);
                float peitto = saturate(0.5 - d / w);
                half4 c = _Paperi;
                // Kuva-alue: sisennys sivuilta ja ylhäältä, alhaalla lisäksi kuvatekstikaista.
                float2 ala = float2(_SisennysPt, _SisennysPt + _AlaPt), yla = float2(_SisennysPt, _SisennysPt);
                float2 pp = v.uv * koko;                       // vasemmasta alakulmasta (uv.y = 0 alhaalla)
                float2 kuvaKoko = koko - ala - yla;
                float2 kuvaUv = (pp - ala) / max(kuvaKoko, 1e-3);
                if (all(kuvaUv >= 0.0) && all(kuvaUv <= 1.0))
                    c.rgb = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, kuvaUv).rgb;
                // Reunus 1 pt reunan sisäpuolella.
                float reuna = saturate(1.0 - abs(d + _ReunaPt * 0.5) / max(_ReunaPt * 0.5 + w, 1e-4));
                c.rgb = lerp(c.rgb, _Reuna.rgb, reuna * _Reuna.a);
                c.a = peitto * _Alfa;
                return c;
            }
            ENDHLSL
        }
    }
}
