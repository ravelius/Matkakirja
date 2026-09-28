// Dioraaman maalattu pinta (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): rakennuskoneen (A1) leipoma
// glb-geometria, yksi jaettu Material per pinta (kivi, rappaus, puu, …). Unlit, SRP Batcher -yhteensopiva
// (CBUFFER_START(UnityPerMaterial), ei float4x4-arvoja ilman Properties-riviä, ei MaterialPropertyBlockia).
//
// Väri = _Vari · (0,72 + 0,28·saturate(N·_DioraamaValo)) · lerp(1, AO, 0,85) + _Lampo · lämpö · _DioraamaLepatus · 0,35
//   N       mesh-normaali maailmassa (litteä sävytys, kolmiokohtaiset normaalit rakennuskoneesta)
//   AO      COLOR.r (0…1, 1 = avoin; rakennuskoneen leipoma, ks. dioraama-rajapinnat-20260929.md kohta 3)
//   lämpö   COLOR.g (tulisijan ja muiden valojen leipoma lämpö 0…1)
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

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Lampo;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; half4 vari : COLOR; };
            struct Vali { float4 paikka : SV_POSITION; float3 normaaliW : TEXCOORD0; half4 vari : COLOR; float3 paikkaW : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.normaaliW = TransformObjectToWorldNormal(i.normaali);
                o.vari = i.vari; // R = AO, G = lämpö (ei värejä: ei sRGB-muunnosta)
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.normaaliW);
                half valo = (half)(0.72 + 0.28 * saturate(dot(n, normalize(_DioraamaValo))));
                half ao = lerp(1.0h, (half)i.vari.r, 0.85h);
                half3 vari = _Vari.rgb * valo * ao + _Lampo.rgb * (half)i.vari.g * _DioraamaLepatus * 0.35h;

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
