// Dioraaman maalattu pinta (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026; pohjakuva+virtaus erä 2,
// dioraama-rajapinnat-era2-20260929.md kohta 3): rakennuskoneen (A1) leipoma glb-geometria, yksi jaettu Material
// per pinta (kivi, rappaus, puu, …). Unlit, SRP Batcher -yhteensopiva (CBUFFER_START(UnityPerMaterial),
// TEXTURE2D/SAMPLER-makrot tekstuurille, ei float4x4-arvoja ilman Properties-riviä, ei MaterialPropertyBlockia).
//
// Väri = _Vari · pohjakuva(uv + _Virtaus·t).rgb · (0,72 + 0,28·saturate(N·_DioraamaValo)) · lerp(1, AO, 0,85)
//        + _Lampo · lämpö · _DioraamaLepatus · 0,35
//   pohjakuva  _PohjaKuva (Codexin maalattu JPG, erä 2). Oletus "white" {} eli kerroin (1,1,1): ilman kuvaa
//              (DioraamaRakennus.AsetaPinta ei ole vielä kutsuttu) tulos on siis sama kuin ennen pohjakuvaa,
//              koska _Vari pysyy pinnan omana värinä kunnes kuva asetetaan (silloin _Vari → valkoinen).
//   N          mesh-normaali maailmassa (litteä sävytys, kolmiokohtaiset normaalit rakennuskoneesta)
//   AO         COLOR.r (0…1, 1 = avoin; rakennuskoneen leipoma, ks. dioraama-rajapinnat-20260929.md kohta 3)
//   lämpö      COLOR.g (tulisijan ja muiden valojen leipoma lämpö 0…1) -- saa nostaa värin yli 1:n (hehku/Bloom)
// _DioraamaValo ja _DioraamaLepatus ovat globaaleja (DioraamaNayttamo asettaa): valo on kiinteä suunta
// (ylhäältä-vasemmalta-edestä), Lepatus hidas kohinainen 0,85…1,0 (tulisijan lepatus).
// Sumu (_DioraamaSumuVari + _DioraamaSumu.xy = alku/loppu metreinä, lineaarinen) erottaa kaukaisen massan
// lähikeittiöstä; sama globaali käyttää kaikki dioraaman pinnat (myös DioraamaHahmo.shader).
Shader "Matkakirja/Linssit/DioraamaMaalattu"
{
    Properties
    {
        _Vari("Pinnan väri (lineaarinen)", Color) = (0.72, 0.68, 0.61, 1)
        _Lampo("Lämmön väri", Color) = (1, 0.6902, 0.3765, 1)
        _PohjaKuva ("Pohjakuva", 2D) = "white" {}
        _Virtaus ("Virtaus", Vector) = (0,0,0,0)
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            // Globaalit (DioraamaNayttamo.cs, Shader.SetGlobal…): kaikki dioraaman materiaalit jakavat nämä.
            float3 _DioraamaValo;
            half _DioraamaLepatus;
            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu; // x = alku (m), y = loppu (m)

            TEXTURE2D(_PohjaKuva); SAMPLER(sampler_PohjaKuva);

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Lampo;
                float4 _PohjaKuva_ST;
                float4 _Virtaus; // xy = UV/s (vain vesi virtaa; muilla pinnoilla 0,0)
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; half4 vari : COLOR; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float3 normaaliW : TEXCOORD0; half4 vari : COLOR; float3 paikkaW : TEXCOORD1; float2 uv : TEXCOORD2; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.normaaliW = TransformObjectToWorldNormal(i.normaali);
                o.vari = i.vari; // R = AO, G = lämpö (ei värejä: ei sRGB-muunnosta)
                o.uv = TRANSFORM_TEX(i.uv, _PohjaKuva);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.normaaliW);
                half valo = (half)(0.72 + 0.28 * saturate(dot(n, normalize(_DioraamaValo))));
                half ao = lerp(1.0h, (half)i.vari.r, 0.85h);
                float2 virtausUv = i.uv + _Virtaus.xy * _Time.y;
                half3 pohja = _Vari.rgb * SAMPLE_TEXTURE2D(_PohjaKuva, sampler_PohjaKuva, virtausUv).rgb;
                half3 vari = pohja * valo * ao + _Lampo.rgb * (half)i.vari.g * _DioraamaLepatus * 0.35h;

                // Lineaarinen etäisyyssumu: massa ja keittiö erottuvat (dioraama-rajapinnat-20260929.md kohta 6).
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                vari = lerp(vari, _DioraamaSumuVari.rgb, sumu);
                return half4(vari, 1);
            }
            ENDHLSL
        }
    }
}
