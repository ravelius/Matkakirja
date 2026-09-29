// Dioraaman SAVU (Olavinlinna, Siirtoseppä 29.9.2026): liekki:-tyhjän yllä nouseva savu GPU:lla, sama periaate kuin
// DioraamaLiekki3D:n kipinöillä — mesh rakennetaan kerran (DioraamaSavu.cs: N nelikulmiota, kaikki kärjet
// emitterin origossa), ja kärkivarjostin laskee jokaisen hiukkasen iän, paikan ja koon ajasta. Ei CPU-päivitystä.
//
// Hiukkanen k: ikä = frac(t / _Elinaika + vaihe_k) ∈ [0, 1)
//   paikka  = emitteri + ylös · ikä · _Korkeus + sivutuuli(siemen, ikä) · _Korkeus · 0,25
//   koko    = lerp(_Koko.x, _Koko.y, ikä)   (metreinä, kamerakohtainen billboard näkymäavaruudessa)
//   peitto  = smoothstep(0, 0,15, ikä) · (1 − ikä)² · _Peitto
// Kuvio: pehmeä kiekko, jonka reunaa aaltoilee siemenestä (ei tekstuuria). Väri harmaanruskea, alareunassa
// lämpimämpi (liekin heijastus). Läpinäkyvä, ZWrite Off; syvyystesti pitää savun seinien takana.
// Vähennetty liike: _DioraamaLepatus-globaali ei vaikuta; DioraamaSavu jäädyttää ajan (_SavuAika vakio).
Shader "Matkakirja/Linssit/DioraamaSavu"
{
    Properties
    {
        _Vari ("Savun väri", Color) = (0.36, 0.33, 0.30, 1)
        _Lammin ("Alaosan lämmin sävy", Color) = (0.55, 0.38, 0.22, 1)
        _Korkeus ("Nousukorkeus (m)", Float) = 1.2
        _Koko ("Koko alussa/lopussa (m)", Vector) = (0.12, 0.55, 0, 0)
        _Elinaika ("Elinaika (s)", Float) = 5
        _Peitto ("Peitto", Float) = 0.35
        _SavuAika ("Aika (s)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite Off
            ZTest LEqual
            Cull Off
            Blend SrcAlpha OneMinusSrcAlpha

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu;

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                half4 _Lammin;
                float _Korkeus;
                float4 _Koko;
                float _Elinaika;
                float _Peitto;
                float _SavuAika;
            CBUFFER_END

            // uv0 = kulma (−1…1), uv1 = (siemen 0…1, vaihe 0…1)
            struct Syote { float4 paikka : POSITION; float2 kulma : TEXCOORD0; float2 siemen : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; float2 kulma : TEXCOORD0; float3 tieto : TEXCOORD1; float3 paikkaW : TEXCOORD2; };

            Vali vert(Syote i)
            {
                Vali o;
                float s = i.siemen.x;
                float ika = frac(_SavuAika / max(_Elinaika, 0.1) + i.siemen.y);
                float3 emitteri = TransformObjectToWorld(float3(0, 0, 0));
                float3 ylos = normalize(TransformObjectToWorldDir(float3(0, 1, 0)));
                float kulmaT = s * 6.2831 + ika * (1.5 + s);
                float3 sivu = float3(cos(kulmaT), 0, sin(kulmaT)) * (0.08 + 0.25 * ika) * _Korkeus;
                float3 keski = emitteri + ylos * ika * _Korkeus + sivu * 0.25 + float3(0.12, 0, 0.05) * ika * ika * _Korkeus;
                float koko = lerp(_Koko.x, _Koko.y, ika) * (0.8 + 0.4 * frac(s * 7.13));

                float3 nakyma = TransformWorldToView(keski);
                float kierto = s * 6.2831 + ika * (s - 0.5) * 2.0;
                float2x2 r = float2x2(cos(kierto), -sin(kierto), sin(kierto), cos(kierto));
                nakyma.xy += mul(r, i.kulma) * koko * 0.5;
                o.paikka = TransformWViewToHClip(nakyma);
                o.kulma = i.kulma;
                float peitto = smoothstep(0.0, 0.15, ika) * (1.0 - ika) * (1.0 - ika) * _Peitto;
                o.tieto = float3(ika, peitto, s);
                o.paikkaW = keski;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 c = i.kulma;
                float kulma = atan2(c.y, c.x);
                float reuna = 1.0 + 0.18 * sin(kulma * 3.0 + i.tieto.z * 40.0) + 0.1 * sin(kulma * 5.0 - i.tieto.z * 17.0);
                float r = length(c) / reuna;
                half pehmea = (half)saturate(1.0 - r);
                pehmea = pehmea * pehmea * (3.0h - 2.0h * pehmea);
                half a = pehmea * (half)i.tieto.y;
                half3 vari = lerp(_Lammin.rgb, _Vari.rgb, (half)saturate(i.tieto.x * 3.0));

                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                vari = lerp(vari, _DioraamaSumuVari.rgb, sumu);
                return half4(vari, a);
            }
            ENDHLSL
        }
    }
}
