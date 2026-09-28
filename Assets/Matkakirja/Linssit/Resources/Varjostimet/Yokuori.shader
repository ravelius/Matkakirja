// Yökuori (ISS:n kyyti, Linssiseppä 28.9.2026; Natiiviseppä: väliaikainen linssin oma kerros, pallon terminaattoria ei ole):
// läpikuultava kuori pilvikuoren yllä, tumma yöpuolella auringon suunnan mukaan ja 6°:n hämäräkaista (aurinko −6° … +2°).
// Ulkopinta (Cull Back), ZWrite Off; piirtyy pilvien jälkeen, joten pilvetkin tummuvat yöllä.
//
// KAUPUNKIEN VALOT (omistaja 28.9. klo 12.3x Fablen kautta: "yöpuolella Euroopan kaupungit hehkuvat lämpimänä valoverkkona
// kuten astronauttien yökuvissa"): NASA Black Marble (Karttasepän sarja yovalot/2026-09-25), Eurooppa Z6:sta (lon −28,125…45,
// Web Mercator -rivit 13–25, 2048², noin 2,5 km/px 50°:ssa) ja muu maailma Z3:sta (2048², noin 20 km/px), yksikanavaisena
// (luminanssi). Kuoren fragmentin katsesäde leikataan maan pintaan (ellipsoidi pallotilassa kuten Ilmakaari), joten valot
// ovat oikeassa paikassa vinostakin katsottuna (kuori on 76 km pinnan yllä: ilman leikkausta siirtymä olisi 60–200 km).
// Esikerrottu alfa (Blend One OneMinusSrcAlpha): yö tummentaa maan peitolla a ja valot lisätään sen päälle, joten ne eivät
// tummu 0,82-peittoon. Valot syttyvät samassa hämäräkaistassa pinnan pisteen auringon korkeuden mukaan. Sävy: himmeät
// natriumin oranssit, kirkkaat ytimet kellanvalkoiset; HDR, joten suurkaupunkien ytimet hehkuvat bloomissa.
Shader "Matkakirja/Linssit/Yokuori"
{
    Properties
    {
        _Peitto("Yön peitto", Range(0, 1)) = 0.82
        _Vari("Yön väri", Color) = (0.012, 0.02, 0.05, 1)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _Akseli("Napa-akseli (maailma, ECEF Z)", Vector) = (0, 1, 0, 0)
        _Nolla("Päiväntasaaja 0° (maailma, ECEF X)", Vector) = (1, 0, 0, 0)
        _R("Päiväntasaajan säde (m)", Float) = 6378137
        _Litistys("a / b", Float) = 1.0033640898
        _ValotEu("Valot, Eurooppa (Web Mercator, R)", 2D) = "black" {}
        _ValotMaa("Valot, maailma (Web Mercator, R)", 2D) = "black" {}
        _EuRaja("Eurooppa: lon0, lon1, Mercator-rivi 0, 1 (0…1 ylhäältä)", Vector) = (-28.125, 45, 0.203125, 0.40625)
        _Valot("Valojen voimakkuus (0 = pois)", Float) = 1.6
        _MaaVoima("Maailmakuvan lisävoima (Z3 on himmeämpi)", Float) = 2.2
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-40" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_ValotEu); SAMPLER(sampler_ValotEu);
            TEXTURE2D(_ValotMaa); SAMPLER(sampler_ValotMaa);
            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                half4 _Vari;
                float4 _Aurinko;
                float4 _Keskus;
                float4 _Akseli, _Nolla, _EuRaja;
                float _R, _Litistys, _Valot, _MaaVoima;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            // Hämärä: sin(auringon korkeus) = n · aurinko; −6° (−0,105) … +2° (0,035).
            half Yo(float3 n) { return 1.0h - (half)smoothstep(-0.105, 0.035, dot(n, normalize(_Aurinko.xyz))); }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.maailma - _Keskus.xyz);
                half a = _Peitto * Yo(n);
                half3 c = _Vari.rgb * a;

                // Katsesäde maan pintaan pallotilassa (napa-akselin suuntainen komponentti × a/b).
                float3 z = normalize(_Akseli.xyz);
                float3 o = _WorldSpaceCameraPos - _Keskus.xyz, d = i.maailma - _WorldSpaceCameraPos;
                o += z * dot(o, z) * (_Litistys - 1.0);
                d = normalize(d + z * dot(d, z) * (_Litistys - 1.0));
                float b = dot(o, d), h = b * b - (dot(o, o) - _R * _R);
                float t = -b - sqrt(max(h, 0.0));
                float osuu = step(0.0, h) * step(0.0, t);
                float3 p = o + d * t;                                    // pallotilassa
                float3 pe = p + z * dot(p, z) * (1.0 / _Litistys - 1.0); // takaisin ellipsoidille
                float3 x = normalize(_Nolla.xyz), y = cross(z, x);
                float ex = dot(pe, x), ey = dot(pe, y), ez = dot(pe, z);
                float lon = atan2(ey, ex);
                float e2 = 1.0 - 1.0 / (_Litistys * _Litistys);
                float lat = atan(ez / max(1.0, (1.0 - e2) * sqrt(ex * ex + ey * ey)));
                lat = clamp(lat, -1.4844, 1.4844);                       // ±85,05° (Web Mercator)
                float m = 0.5 - log(tan(0.7853982 + lat * 0.5)) / 6.2831853;   // 0 ylhäällä … 1 alhaalla

                // Maailma koko ajan, Eurooppa sen päälle rajalla 3 %:n liu'ulla.
                float2 uvMaa = float2(lon / 6.2831853 + 0.5, 1.0 - m);
                float lonAst = degrees(lon);
                float2 eu = float2((lonAst - _EuRaja.x) / (_EuRaja.y - _EuRaja.x), (m - _EuRaja.z) / (_EuRaja.w - _EuRaja.z));
                half euPaino = (half)saturate(min(min(eu.x, 1.0 - eu.x), min(eu.y, 1.0 - eu.y)) / 0.03);
                half lMaa = SAMPLE_TEXTURE2D(_ValotMaa, sampler_ValotMaa, uvMaa).r * (half)_MaaVoima;
                half lEu = SAMPLE_TEXTURE2D(_ValotEu, sampler_ValotEu, float2(saturate(eu.x), 1.0 - saturate(eu.y))).r;
                half l = lerp(lMaa, lEu, euPaino);
                l = l * l * (half)0.6 + l * (half)0.4;                   // kuvan sRGB-sävy lähemmäs lineaarista, himmeät vaimeammiksi
                half3 savy = lerp(half3(1.0, 0.52, 0.2), half3(1.0, 0.88, 0.7), saturate(l * 1.6h));
                half valo = l * (half)_Valot * Yo(normalize(p)) * (half)osuu;
                c += savy * valo;
                return half4(c, a);
            }
            ENDHLSL
        }
    }
}
