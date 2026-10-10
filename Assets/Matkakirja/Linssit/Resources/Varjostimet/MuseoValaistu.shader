// TAIDEMUSEON PINNAT (Linssiseppä 10.10.2026; aineistoraportin liite C2.4, MuseoValo.cs). Koko valaistus tässä varjostimessa
// fysikaalisista arvoista (ei Unityn valoja eikä leivontaa väliaikaishallissa):
//  - kohdevalot (_MuseoSpot*, enintään 24 lähintä; MuseoSovitin järjestää): E = I · max(0, n·l) / d² · keila, keila =
//    smoothstep(cos ulko, cos sisä) (sali.json: puolikulma ja reunahäivä), väri Kelvineistä (MuseoValo.Kelvin);
//  - hajavalo _MuseoHaja (lx, rgb): osan seinäpesu + kattoikkunat puolipallona (ylöspäin katsovat pinnat saavat enemmän);
//  - L = ρ · E / π (Lambert) + kiilto (Blinn–Phong normitettuna, lakka tai kulta), kuva-arvo = L · _MuseoValotus (1 / Lmax,
//    lukittu EV100). Sävykartoitus (Neutral) näyttämön Volumessa. _Hehku = itsevalaisu cd/m² (kattoikkunat).
//  - LR:n sali-GLB (sali-v1): _AtlasLx > 0 → hajavalo ja kohdevalojen HAJAOSA tulevat leivotusta valoatlaksesta (TEXCOORD1;
//    atlas = E / 1200 lx lineaarisena sRGB-pakattuna, ks. taidemuseo-runko/lahde/leivo_sali.py), kohdevalot antavat vain kiillon.
// Molemmat puolet piirretään (geometriageneraattorin kiertosuunnalla ei väliä), normaali käännetään katsojaan päin.
// LATTIAHEIJASTUS (omistaja 10.10. 17.2x, PT:n kuittaama suunnitelma, juna 180): _Heijastus > 0 (parketti, marmori) ja ylöspäin
// katsova pinta → MuseoNayttamon peilikamera (lattian tason y = 0 yli, vino lähitaso) piirtää salin puoliresoluutioiseen kuvaan
// _MuseoHeijastusKuva; lattia lukee sitä ruudun kohdasta, karheuden mukaan sumeampana (mip) ja Fresnelin painolla (hillitty).
// _MuseoHeijastusMaara = 0 peilikameran omassa piirrossa ja kun heijastus on pois ("museo heijastus 0").
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
        _Atlas ("Valoatlas (E / AtlasLx)", 2D) = "black" {}
        _AtlasLx ("Atlaksen lx-kerroin (0 = ei atlasta)", Float) = 0
        _Heijastus ("Lattiaheijastus (0 = ei)", Range(0, 1)) = 0
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
            TEXTURE2D(_Atlas); SAMPLER(sampler_Atlas);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float4 _Pohja;
                float _Kiilto, _Karheus, _Metalli, _KarkiVari;
                float4 _Hehku;
                float _AtlasLx;
                float _Heijastus;
            CBUFFER_END
            TEXTURE2D(_MuseoHeijastusKuva); SAMPLER(sampler_MuseoHeijastusKuva);
            float _MuseoHeijastusMaara;     // 0 = ei heijastusta (peilikameran piirto, kytkin)
            float _MuseoHeijastusMipit;     // heijastuskuvan mip-tasojen määrä − 1

            int _MuseoSpotMaara;
            float4 _MuseoSpotP[SPOTTEJA];   // paikka.xyz, cos ulkoreuna
            float4 _MuseoSpotD[SPOTTEJA];   // suunta.xyz (keilan akseli), cos sisäreuna
            float4 _MuseoSpotV[SPOTTEJA];   // väri × voimakkuus (cd)
            float4 _MuseoHaja;              // hajavalo lx (rgb)
            float _MuseoValotus;            // 1 / Lmax

            struct Tulo { float4 paikka : POSITION; float3 normaali : NORMAL; float4 vari : COLOR; float2 uv : TEXCOORD0; float2 uv1 : TEXCOORD1; };
            struct Ulos
            {
                float4 paikka : SV_POSITION;
                float3 maailma : TEXCOORD0;
                float3 normaali : TEXCOORD1;
                float2 uv : TEXCOORD2;
                float2 uv1 : TEXCOORD3;
                float4 vari : COLOR;
            };

            Ulos vert(Tulo i)
            {
                Ulos o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.normaali = TransformObjectToWorldNormal(i.normaali);
                o.uv = TRANSFORM_TEX(i.uv, _MainTex);
                o.uv1 = i.uv1;
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
                float hajaSpot = 1;
                if (_AtlasLx > 0) { E = SAMPLE_TEXTURE2D(_Atlas, sampler_Atlas, i.uv1).rgb * _AtlasLx; hajaSpot = 0; }
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
                    L += e * (hajaSpot * diff / PI + f * spek);
                }
                L += _Hehku.rgb;
                float3 c = L * _MuseoValotus;
                if (_Heijastus > 0 && _MuseoHeijastusMaara > 0 && n.y > 0.9)
                {
                    float2 suv = GetNormalizedScreenSpaceUV(i.paikka);
                    // Sumeus karheus² · 2 mip-ketjusta (LS2:n A/B 10.10.: lineaarinen karheus sumensi parketin tunnistamattomaksi;
                    // nyt marmori 0,3 → 18 %, parketti 0,45 → 40 %).
                    float3 r = SAMPLE_TEXTURE2D_LOD(_MuseoHeijastusKuva, sampler_MuseoHeijastusKuva, suv, saturate(_Karheus * _Karheus * 2) * _MuseoHeijastusMipit).rgb;
                    // Fresnel pohjalla 0,25 (simu 10.10. 18.59: puhdas Schlick 4 % → heijastus näkymätön tavallisella katsekulmalla;
                    // vahattu lattia näyttää heijastuksen myös jyrkemmin).
                    float fr = lerp(0.25, 1, pow(1 - saturate(dot(n, v)), 5));
                    c = lerp(c, r, saturate(_Heijastus * fr * _MuseoHeijastusMaara));
                }
                return float4(c, 1);
            }
            ENDHLSL
        }
    }
}
