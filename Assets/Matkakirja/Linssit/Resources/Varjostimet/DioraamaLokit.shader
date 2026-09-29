// Dioraaman LOKKIPARVI (Olavinlinna, tunnelma; Siirtoseppä 29.9.2026): lokit:NN-tyhjän ympärillä kaartelevat linnut
// GPU:lla. Mesh (DioraamaLokit.cs) = Maara lintua, kukin 4 kärkeä (etu, taka, vasen ja oikea siivenkärki), kaikki
// origossa; uv0.x = sivu (−1 vasen, 0 runko, 1 oikea), uv0.y = 0 etu / 1 taka, uv1 = (siemen, vaihe).
//   rata    kaari keskipisteen ympäri: kulma = t · ω + 2π · vaihe, ω = ±(0,18…0,33) rad/s (puolet vastapäivään),
//           säde = _Sade · (0,45…1), korkeus = _Korkeus + 1,5 m aaltoilu
//   siivet  kärjet heilahtavat ±0,35 × kärkiväli; välillä liito (amplitudi 0,15…1, ei tasaista toistoa)
//   väri    runko luonnonvalkoinen, kärjet tummanharmaat; _DioraamaLintuValo (hämärä himmentää) + sumu
Shader "Matkakirja/Linssit/DioraamaLokit"
{
    Properties
    {
        _Sade ("Parven säde (m)", Float) = 20
        _Korkeus ("Korkeus (m)", Float) = 15
        _Karkivali ("Siipien kärkiväli (m)", Float) = 1.2
        _Aika ("Aika (s)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu;
            half _DioraamaLintuValo;

            CBUFFER_START(UnityPerMaterial)
                float _Sade, _Korkeus, _Karkivali, _Aika;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 osa : TEXCOORD0; float2 siemen : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; half karki : TEXCOORD0; float3 paikkaW : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float s = i.siemen.x, s2 = frac(s * 17.31), s3 = frac(s * 41.7);
                float suunta = s2 < 0.5 ? -1.0 : 1.0;
                float w = suunta * (0.18 + 0.15 * s3);
                float a = _Aika * w + 6.2831 * i.siemen.y;
                float R = _Sade * (0.45 + 0.55 * s);
                float3 keski = TransformObjectToWorld(float3(0, 0, 0));
                float3 p = keski + float3(cos(a) * R, _Korkeus + 1.5 * sin(_Aika * 0.3 + s * 6.0), sin(a) * R);
                float3 eteen = normalize(float3(-sin(a), 0, cos(a)) * suunta);
                float3 oikea = normalize(cross(float3(0, 1, 0), eteen));
                float kallistus = 0.35 * suunta; // kaarre kallistaa siipiä sisäänpäin
                float liito = 0.15 + 0.85 * saturate(sin(_Aika * 0.5 + s * 9.0) * 1.5);
                float lyonti = sin(_Aika * (6.0 + 2.0 * s3) + s * 20.0) * liito;
                float sivu = i.osa.x;
                float k = _Karkivali * (0.85 + 0.3 * s2);
                float3 kohta = oikea * sivu * k * 0.5;
                kohta += float3(0, 1, 0) * (abs(sivu) * (lyonti * 0.35 * k) + sivu * kallistus * 0.2 * k);
                kohta += eteen * (abs(sivu) > 0.5 ? -0.08 * k : (i.osa.y < 0.5 ? 0.22 * k : -0.18 * k));
                float3 m = p + kohta;
                o.paikka = TransformWorldToHClip(m);
                o.paikkaW = m;
                o.karki = (half)abs(sivu);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 vari = lerp(half3(0.93h, 0.92h, 0.89h), half3(0.32h, 0.33h, 0.35h), smoothstep(0.75h, 1.0h, i.karki));
                vari *= max(_DioraamaLintuValo, 0.05h);
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
