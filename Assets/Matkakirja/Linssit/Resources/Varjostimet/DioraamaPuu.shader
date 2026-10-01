// Dioraaman YMPÄRISTÖN PUUT (Olavinlinna, Siirtoseppä 1.10.2026; Linnanrakentajan puukortit + MML:n laserkeilauksen latvat).
// Kaksi ristikkäistä korttia per puu, kaikki lajit yhdessä atlaksessa ja yhdessä meshissä (1 draw call). Alfaleikkaus,
// ei läpinäkyvyyttä (ei lajittelua). Valo: kortin tasainen kirkkaus × korkeuden mukainen tummuus juurella (latvus
// varjostaa runkoa) × pieni lajikohtainen vaihtelu COLOR.r:stä. Tuuli: latva heiluu COLOR.g:n vaiheella (juuri paikallaan).
Shader "Matkakirja/Linssit/DioraamaPuu"
{
    Properties
    {
        _Kuva ("Puukorttien atlas", 2D) = "white" {}
        _Raja ("Alfaraja", Range(0, 1)) = 0.45
    }
    SubShader
    {
        Tags { "RenderType" = "TransparentCutout" "Queue" = "AlphaTest" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu;
            float4 _VesiParam; // x = aika (DioraamaVesi.cs)
            TEXTURE2D(_Kuva); SAMPLER(sampler_Kuva);

            CBUFFER_START(UnityPerMaterial)
                float4 _Kuva_ST;
                half _Raja;
            CBUFFER_END

            // uv0 = atlas, uv1.x = korkeus kortissa 0 (juuri) … 1 (latva), COLOR.r = kirkkausvaihtelu, COLOR.g = tuulen vaihe.
            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; float2 uv1 : TEXCOORD1; half4 vari : COLOR; };
            struct Vali { float4 paikkaH : SV_POSITION; float2 uv : TEXCOORD0; float3 paikkaW : TEXCOORD1; half2 valo : TEXCOORD2; };

            Vali vert(Syote v)
            {
                Vali o;
                float3 p = TransformObjectToWorld(v.paikka.xyz);
                float heilunta = sin(_VesiParam.x * 1.3 + v.vari.g * 6.2832) * 0.12 * v.uv1.x * v.uv1.x;
                p.xz += heilunta.xx * float2(0.8, 0.6);
                o.paikkaW = p;
                o.paikkaH = TransformWorldToHClip(p);
                o.uv = v.uv;
                o.valo = half2(lerp(0.55h, 1.0h, (half)saturate(v.uv1.x * 1.4)) * (0.85h + 0.3h * v.vari.r), 0);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half4 t = SAMPLE_TEXTURE2D(_Kuva, sampler_Kuva, i.uv);
                clip(t.a - _Raja);
                half3 vari = t.rgb * i.valo.x;
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
