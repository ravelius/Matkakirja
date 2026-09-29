// Dioraaman IKKUNAKEILA JA PÖLY (Olavinlinna, Siirtoseppä 29.9.2026): ikkuna:-tyhjästä huoneeseen laskeva
// valokeila ja siinä leijuva pöly. Additiivinen (One One), ZWrite Off, molemmat puolet: keila vain lisää valoa
// leivotun huoneen päälle, ei peitä mitään. Yksi mesh (DioraamaIkkunat.cs): keilan neljä sivua + Polya pölyhiukkasta.
//
// Paikallinen avaruus: ikkuna origossa, keila +Y-suuntaan (Blenderin tyhjän Z-akseli glTF-viennin jälkeen), ikkunan
// leveys X, korkeus Z. uv1.x = 0 keilan kärki, 1 pölyhiukkanen.
//   keila  uv0 = (poikki 0…1, pitkin 0…1); kärjen paikka lasketaan kärkivarjostimessa (leveneminen _Levenema).
//          peitto = _Voima · (1 − pitkin)^1,3 · sin(π · poikki)^1,5 · hidas väre
//   pöly   uv0 = kulma (−1…1), uv1.y = siemen; paikka keilan sisällä, nousee/laskee hitaasti (_Aika), koko 1–2 cm,
//          tuikkii; himmenee keilan päissä.
Shader "Matkakirja/Linssit/DioraamaKeila"
{
    Properties
    {
        _Vari ("Valon väri", Color) = (1, 0.94, 0.85, 1)
        _Voima ("Voima", Float) = 0.25
        _Pituus ("Pituus (m)", Float) = 4
        _Koko ("Ikkunan leveys ja korkeus (m)", Vector) = (0.6, 1.0, 0, 0)
        _Levenema ("Leveneminen", Float) = 0.3
        _Poly ("Pölyn voima", Float) = 1
        _Aika ("Aika (s)", Float) = 0
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
            Blend One One

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _Vari;
                float _Voima;
                float _Pituus;
                float4 _Koko;
                float _Levenema;
                float _Poly;
                float _Aika;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; float2 laji : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; float3 tieto : TEXCOORD1; };

            float2 Laajuus(float pitkin) { return _Koko.xy * 0.5 * (1.0 + _Levenema * pitkin); }

            Vali vert(Syote i)
            {
                Vali o;
                o.uv = i.uv;
                if (i.laji.x < 0.5)
                {
                    // Keilan sivu: paikka.xz = sivun kulmamerkit (±1), paikka.y = 0 kärki / 1 pää.
                    float pitkin = i.paikka.y;
                    float2 l = Laajuus(pitkin);
                    float3 p = float3(i.paikka.x * l.x, pitkin * _Pituus, i.paikka.z * l.y);
                    o.paikka = TransformObjectToHClip(p);
                    o.tieto = float3(0, 0, 0);
                    return o;
                }
                // Pölyhiukkanen
                float s = i.laji.y;
                float s2 = frac(s * 13.37), s3 = frac(s * 71.9);
                float pitkinP = frac(s + _Aika * (0.006 + 0.01 * s2));
                float2 l = Laajuus(pitkinP);
                float3 keski = float3((s2 - 0.5) * 1.6 * l.x + 0.03 * sin(_Aika * 0.7 + s * 30.0),
                                      pitkinP * _Pituus,
                                      (s3 - 0.5) * 1.6 * l.y + 0.03 * cos(_Aika * 0.5 + s * 17.0));
                float3 nakyma = TransformWorldToView(TransformObjectToWorld(keski));
                float koko = 0.01 + 0.012 * s3;
                nakyma.xy += i.uv * koko;
                o.paikka = TransformWViewToHClip(nakyma);
                float tuike = 0.55 + 0.45 * sin(_Aika * (1.3 + 2.0 * s2) + s * 50.0);
                float paat = smoothstep(0.0, 0.1, pitkinP) * (1.0 - smoothstep(0.7, 1.0, pitkinP));
                o.tieto = float3(1, tuike * paat, 0);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                if (i.tieto.x < 0.5)
                {
                    half poikki = (half)saturate(i.uv.x), pitkin = (half)saturate(i.uv.y);
                    half reuna = pow(sin(3.14159h * poikki), 1.5h);
                    half hiipuu = pow(1.0h - pitkin, 1.3h);
                    half vare = 0.9h + 0.1h * (half)sin(_Aika * 0.4 + pitkin * 3.0);
                    return half4(_Vari.rgb * (half)_Voima * reuna * hiipuu * vare, 1);
                }
                half r = (half)saturate(1.0 - length(i.uv));
                return half4(_Vari.rgb * r * r * (half)i.tieto.y * (half)_Poly * 0.6h, 1);
            }
            ENDHLSL
        }
    }
}
