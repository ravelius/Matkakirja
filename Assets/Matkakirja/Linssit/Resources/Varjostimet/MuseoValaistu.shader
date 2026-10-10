// TAIDEMUSEON PINNAT (Linssiseppä 10.10.2026; aineistoraportin liite C2.4, MuseoValo.cs). Koko valaistus tässä varjostimessa
// fysikaalisista arvoista (ei Unityn valoja eikä leivontaa väliaikaishallissa):
//  - kohdevalot (_MuseoSpot*, enintään 24 lähintä; MuseoSovitin järjestää): E = I · max(0, n·l) / d² · keila, keila =
//    smoothstep(cos ulko, cos sisä) (sali.json: puolikulma ja reunahäivä), väri Kelvineistä (MuseoValo.Kelvin);
//  - hajavalo _MuseoHaja (lx, rgb): osan seinäpesu + kattoikkunat puolipallona (ylöspäin katsovat pinnat saavat enemmän);
//  - L = ρ · E / π (Lambert) + kiilto (Blinn–Phong normitettuna, lakka tai kulta), kuva-arvo = L · _MuseoValotus (1 / Lmax,
//    lukittu EV100). Sävykartoitus (Neutral) näyttämön Volumessa. _Hehku = itsevalaisu cd/m² (kattoikkunat).
// Molemmat puolet piirretään (geometriageneraattorin kiertosuunnalla ei väliä), normaali käännetään katsojaan päin.
Shader "Matkakirja/MuseoValaistu"
{
    Properties
    {
        _MainTex ("Kuva", 2D) = "white" {}
        _Pohja ("Heijastus (lineaarinen)", Color) = (1, 1, 1, 1)
        _Kiilto ("Kiilto", Range(0, 1)) = 0.04
        _Karheus ("Karheus", Range(0.05, 1)) = 0.7
        _Metalli ("Metalli", Range(0, 1)) = 0
        _KarkiVari ("Kärkiväri käytössä", Float) = 0
        _Hehku ("Itsevalaisu cd/m²", Color) = (0, 0, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        Pass
        {
            Tags { "LightMode" = "UniversalForward" }
            Cull Off
            ZWrite On
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 3.5
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            #define SPOTTEJA 24

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float4 _Pohja;
                float _Kiilto, _Karheus, _Metalli, _KarkiVari;
                float4 _Hehku;
            CBUFFER_END

            int _MuseoSpotMaara;
            float4 _MuseoSpotP[SPOTTEJA];   // paikka.xyz, cos ulkoreuna
            float4 _MuseoSpotD[SPOTTEJA];   // suunta.xyz (keilan akseli), cos sisäreuna
            float4 _MuseoSpotV[SPOTTEJA];   // väri × voimakkuus (cd)
            float4 _MuseoHaja;              // hajavalo lx (rgb)
            float _MuseoValotus;            // 1 / Lmax

            struct Tulo { float4 paikka : POSITION; float3 normaali : NORMAL; float4 vari : COLOR; float2 uv : TEXCOORD0; };
            struct Ulos
            {
                float4 paikka : SV_POSITION;
                float3 maailma : TEXCOORD0;
                float3 normaali : TEXCOORD1;
                float2 uv : TEXCOORD2;
                float4 vari : COLOR;
            };

            Ulos vert(Tulo i)
            {
                Ulos o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.normaali = TransformObjectToWorldNormal(i.normaali);
                o.uv = TRANSFORM_TEX(i.uv, _MainTex);
                o.vari = i.vari;
                return o;
            }

            float4 frag(Ulos i, bool edessa : SV_IsFrontFace) : SV_Target
            {
                float3 v = normalize(_WorldSpaceCameraPos - i.maailma);
                float3 n = normalize(i.normaali);
                if (dot(n, v) < 0) n = -n;
                float3 albedo = _Pohja.rgb * SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv).rgb;
                if (_KarkiVari > 0.5) albedo *= i.vari.rgb;
                float3 diff = albedo * (1 - _Metalli);
                float3 f0 = lerp(float3(_Kiilto, _Kiilto, _Kiilto), albedo, _Metalli);
                float eksp = max(2, 2 / max(1e-3, _Karheus * _Karheus * _Karheus * _Karheus) - 2);
                float normi = (eksp + 8) / (8 * PI);

                // Hajavalo: puolipallo (ylöspäin 1, alaspäin 0,55; seinät siltä väliltä).
                float3 E = _MuseoHaja.rgb * lerp(0.55, 1.0, saturate(n.y * 0.5 + 0.5));
                float3 L = diff * E / PI;
                [loop] for (int k = 0; k < _MuseoSpotMaara; k++)
                {
                    float3 d = _MuseoSpotP[k].xyz - i.maailma;
                    float d2 = max(dot(d, d), 0.04);
                    float3 l = d * rsqrt(d2);
                    float keila = smoothstep(_MuseoSpotP[k].w, _MuseoSpotD[k].w, dot(-l, _MuseoSpotD[k].xyz));
                    float nl = saturate(dot(n, l));
                    float3 e = _MuseoSpotV[k].rgb * (nl * keila / d2);
                    float3 h = normalize(l + v);
                    float spek = normi * pow(saturate(dot(n, h)), eksp);
                    float3 f = f0 + (1 - f0) * pow(1 - saturate(dot(h, v)), 5);
                    L += e * (diff / PI + f * spek);
                }
                L += _Hehku.rgb;
                return float4(L * _MuseoValotus, 1);
            }
            ENDHLSL
        }
    }
}
