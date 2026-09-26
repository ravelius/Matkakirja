// Maakuntien täyttö (elävä kartta, Isoisän muste 26.9.2026): PAIKKAMERKKI Natiivisepän Maakuntavari(id, t)
// -rajapinnalle. Webin viisi sävyä (Maakuntajako.Paletti, peitto 0,34, lineaarisen putken alfa Maakuntajako.Taytto)
// syttyvät maakunta kerrallaan etäisyysjärjestyksessä (kärjen syttymishetki), asettuvat paperiksi ja heräävä maakunta
// saa korostusvärinsä, joka valuu napautuksesta ulospäin (säteittäinen tulva kohinaisella reunalla).
// Kärki: väri (lineaarinen) ja peitto (COLOR), yksikkösuunta (TEXCOORD0), (maakunta, syttymishetki, korostuksen peitto)
// (TEXCOORD1) ja korostusväri (TEXCOORD2).
Shader "Matkakirja/Linssit/Maakuntapinta"
{
    Properties
    {
        _Aika("Kohtauksen aika (s)", Float) = 0
        _Kesto("Syttymisen kesto (s)", Float) = 0.4
        _Asettuminen("Asettuminen 0–1", Range(0, 1)) = 0
        _AsettunutOsuus("Asettunut osuus", Range(0, 1)) = 0.4
        _Heraava("Heräävä maakunta", Float) = -1
        _TulvaKeskus("Tulvan keskus (yksikkösuunta)", Vector) = (1, 0, 0, 0)
        _TulvaSade("Tulvan säde (rad)", Float) = 0
        _TulvaReuna("Tulvan reuna (rad)", Float) = 0.002
        _TulvaValmis("Tulva valmis", Range(0, 1)) = 0
        _Peitto("Peitto", Range(0, 1)) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+10" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Aika;
                float _Kesto;
                half _Asettuminen;
                half _AsettunutOsuus;
                float _Heraava;
                float4 _TulvaKeskus;
                float _TulvaSade;
                float _TulvaReuna;
                half _TulvaValmis;
                half _Peitto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; half4 vari : COLOR; float3 suunta : TEXCOORD0; float3 tieto : TEXCOORD1; float3 korostus : TEXCOORD2; };
            struct Vali { float4 paikka : SV_POSITION; half4 vari : COLOR; float3 suunta : TEXCOORD0; float3 tieto : TEXCOORD1; float3 korostus : TEXCOORD2; };

            float Hajautus(float3 p)
            {
                p = frac(p * 0.3183099 + 0.1);
                p *= 17.0;
                return frac(p.x * p.y * p.z * (p.x + p.y + p.z));
            }

            float Kohina(float3 x)
            {
                float3 i = floor(x), f = frac(x);
                f = f * f * (3 - 2 * f);
                return lerp(lerp(lerp(Hajautus(i), Hajautus(i + float3(1, 0, 0)), f.x),
                                 lerp(Hajautus(i + float3(0, 1, 0)), Hajautus(i + float3(1, 1, 0)), f.x), f.y),
                            lerp(lerp(Hajautus(i + float3(0, 0, 1)), Hajautus(i + float3(1, 0, 1)), f.x),
                                 lerp(Hajautus(i + float3(0, 1, 1)), Hajautus(i + float3(1, 1, 1)), f.x), f.y), f.z);
            }

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.vari = i.vari;
                o.suunta = i.suunta;
                o.tieto = i.tieto;
                o.korostus = i.korostus;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float u = saturate((_Aika - i.tieto.y) / max(_Kesto, 1e-4));
                float syty = 1 - (1 - u) * (1 - u);
                half3 vari = i.vari.rgb;
                half alfa = i.vari.a * syty * (1 - (1 - _AsettunutOsuus) * _Asettuminen);
                if (abs(i.tieto.x - _Heraava) < 0.5)
                {
                    float3 d = normalize(i.suunta);
                    float kulma = 2.0 * asin(saturate(length(d - _TulvaKeskus.xyz) * 0.5));
                    float r = _TulvaSade * (1 + 0.18 * (Kohina(d * 900.0) - 0.5) * 2.0);
                    float m = max(1 - smoothstep(r - _TulvaReuna, r, kulma), _TulvaValmis) * step(1e-6, _TulvaSade + _TulvaValmis);
                    // Märkä reuna tulvan etureunassa: hieman tummempi.
                    float etu = exp(-pow((kulma - r) / max(_TulvaReuna, 1e-6), 2)) * (1 - _TulvaValmis);
                    vari = lerp(vari, i.korostus * (1 - 0.25 * etu), m);
                    alfa = lerp(alfa, i.tieto.z, m);
                }
                return half4(vari, alfa * _Peitto);
            }
            ENDHLSL
        }
    }
}
