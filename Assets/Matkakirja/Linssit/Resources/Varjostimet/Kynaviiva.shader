// Kynäviiva (elävä kartta, Isoisän muste 26.9.2026): Natiivisepän reittiviivan (Matkakirja/Viiva) nauha, jonka kynä
// piirtää esiin. Kärjessä: paikka, seuraava paikka (TEXCOORD0.xyz), puoli ±1 ja kuljettu matka asteina (TEXCOORD1) sekä
// piirron alku, kesto ja viivan pituus (TEXCOORD2). _Aika = kohtauksen aika (s); piirretty osuus kulkee pehmeästi
// (smootherstep, sama kuin ElavaKayrat.Pehmea), ja märkä muste tummenee kynän kärjessä. Paksuus ruutupisteinä.
// ZTest Always: viiva on vain 1,5 km pinnan yllä, jotta kallistus ei siirrä sitä maastosta (ei syvyyskilpaa vuorilla);
// kohtauksen viivat ovat aina pallon näkyvällä puolella. Koko pallon viivat (ElavaMatka: kuljettu reitti) asettavat
// _Keskus = (maan keskipiste maailmassa, 1), jolloin horisontin taakse jäävä osa häipyy (w = 0: ei rajausta).
Shader "Matkakirja/Linssit/Kynaviiva"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.27, 0.2, 0.12, 0.9)
        _Paksuus("Paksuus (ruutupistettä)", Float) = 1.6
        _Kerroin("Pikseliä pisteelle", Float) = 3
        _Aika("Kohtauksen aika (s)", Float) = 0
        _Karki("Märän kärjen pituus (astetta)", Float) = 0.08
        _Peitto("Peitto", Range(0, 1)) = 1
        _Keskus("Maan keskipiste (maailma), w = 1: takapuoli pois", Vector) = (0, 0, 0, 0)
        _Katko("Katkoviiva: jakso (astetta), viivan osuus jaksosta; x = 0 yhtenäinen", Vector) = (0, 0.6, 0, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+12" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
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
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _Paksuus;
                float _Kerroin;
                float _Aika;
                float _Karki;
                half _Peitto;
                float4 _Keskus;
                float4 _Katko;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 seuraava : TEXCOORD0; float2 puoli : TEXCOORD1; float4 piirto : TEXCOORD2; };
            struct Vali { float4 paikka : SV_POSITION; float matka : TEXCOORD0; float reuna : TEXCOORD1; float3 piirto : TEXCOORD2; float horisontti : TEXCOORD3; float usvaY : TEXCOORD4; };

            Vali vert(Syote i)
            {
                Vali o;
                float4 a = TransformObjectToHClip(i.paikka.xyz);
                float4 b = TransformObjectToHClip(i.seuraava);
                float2 ruutu = _ScreenParams.xy;
                float2 sa = a.xy / a.w * ruutu;
                float2 sb = b.xy / b.w * ruutu;
                float2 suunta = sb - sa;
                float l = length(suunta);
                suunta = l > 1e-4 ? suunta / l : float2(1, 0);
                float2 normaali = float2(-suunta.y, suunta.x);
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                a.xy += normaali * i.puoli.x * px * 2.0 / ruutu * a.w;
                o.paikka = a;
                o.usvaY = UsvaYlhaalta(a);   // horisonttiusva (löydös 159)
                o.matka = i.puoli.y;
                o.reuna = i.puoli.x * px;
                o.piirto = i.piirto.xyz;
                // Horisontti: pinnan normaalin ja kameran suunnan kosini (Rajaviivan tapaan); > 0 = näkyvällä puolella.
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                o.horisontti = _Keskus.w > 0.5 ? dot(normalize(maailma - _Keskus.xyz), normalize(_WorldSpaceCameraPos - maailma)) : 1;
                return o;
            }

            float Kohina(float x)
            {
                float i = floor(x), f = frac(x);
                float a = frac(sin(i * 127.1) * 43758.5453), b = frac(sin((i + 1) * 127.1) * 43758.5453);
                return lerp(a, b, f * f * (3 - 2 * f));
            }

            half4 frag(Vali i) : SV_Target
            {
                float u = saturate((_Aika - i.piirto.x) / max(i.piirto.y, 1e-4));
                u = u * u * u * (u * (u * 6 - 15) + 10);
                float piirretty = u * i.piirto.z;
                float yli = i.matka - piirretty;
                // Pehmeä kynän kärki: pikselin levyinen liuku (fwidth), ei porrastusta.
                float leveys = max(fwidth(i.matka), 1e-6);
                half alfa = _BaseColor.a * _Peitto * saturate(0.5 - yli / leveys);
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                alfa *= saturate(px - abs(i.reuna));
                // Käsin vedetyn viivan pieni vaihtelu (musteen määrä) matkan mukaan.
                alfa *= 0.86 + 0.14 * Kohina(i.matka * 55.0);
                // Katkoviiva (kuljettu reitti, omistaja 26.9. klo 10.5x): jakso asteina CPU:lta (ruutupisteistä kahden
                // potenssiin pyöristettynä, jotta katkot eivät liu'u zoomatessa); reunat pikselin levyisellä liu'ulla.
                if (_Katko.x > 0)
                {
                    float v = i.matka / _Katko.x;
                    float f = frac(v);
                    float sisalla = min(f, _Katko.y - f);
                    alfa *= saturate(sisalla / max(fwidth(v), 1e-6) + 0.5);
                }
                alfa *= saturate((i.horisontti - 0.01) * 40.0);
                alfa *= UsvaNakyvyys(i.usvaY);
                // Märkä muste kärjessä: tummempi, kuivuu 0,08°:n matkalla (vain piirron aikana).
                half3 vari = _BaseColor.rgb;
                float mark = u < 1 ? exp(-max(0, -yli) / max(_Karki, 1e-4)) : 0;
                vari *= 1 - 0.45 * mark;
                return half4(vari, alfa);
            }
            ENDHLSL
        }
    }
}
