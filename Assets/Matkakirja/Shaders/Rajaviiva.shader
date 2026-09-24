// Aluerajat vektoriviivoina (maakunnat, B17): nauha, jonka paksuus on vakio ruutupisteinä
// tunnuskartan tarkkuudesta riippumatta. Kärjissä oma paikka ja janan toinen pää (TEXCOORD0),
// puoli ±1 (TEXCOORD1.x). Piirtyy maaston päälle (ZTest Always) kuten täyttökuori; pallon
// takapuolen janat piilotetaan maan keskipisteestä (_Keskus, maailma).
//
// Pelaajan maan ääriviiva (Kartta/Maaraja.cs) käyttää lisäksi TEXCOORD1.y:tä: etumerkki on janan
// pää (−1 a, +1 b) ja itseisarvo 1 + renkaan laatikon lävistäjä asteina. _Jatke venyttää janaa
// päistään puolen leveyden verran (paksu täysi viiva ei lovea kulmissa, web: päätypyörylät
// korostukselle), ja rengas, jonka lävistäjä ruudulla (× _Tiheys) jää alle _PieninRengas
// ruutupikselin, jätetään pois (web KOROSTUKSEN_PIENIN_RENGAS_PX). Aluerajoilla (MaaKartta)
// y = 0, joten kumpikaan ei vaikuta niihin.
//
// PÄÄTYPYÖRYLÄT (löydös 46 jatko, web pehmennaLineMaterial(korostus, { paatypyorylat: true })): jatke oli neliö, joka
// porrasmaisella rannikolla (lyhyet janat, 90° käänteet) täytti kulmat √2-kertaisiksi (omistajan kuva: 3 pt:n kehä
// ~8,6 laitepikseliä 6:n sijaan). Nyt jatkeen osuus leikataan ympyräksi: fragmentti tietää paikkansa janan suunnassa
// (pitkin, laitepikseleinä a:sta) ja janan pituuden, ja peitto lasketaan etäisyydestä janaan eikä vain sivusuunnasta.
// _Jatke = 0 (aluerajat) → ennallaan.
Shader "Matkakirja/Rajaviiva"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.23, 0.18, 0.13, 0.8)
        _Paksuus("Paksuus (ruutupistettä)", Float) = 1.2
        _Kerroin("Pikseliä pisteelle", Float) = 3
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _Jatke("Päiden jatke (0/1)", Float) = 0
        _Tiheys("Ruutupikseliä astetta kohti", Float) = 0
        _PieninRengas("Pienin rengas (ruutupikseliä)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-8" "RenderPipeline" = "UniversalPipeline" }
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
                half4 _BaseColor;
                float _Paksuus;
                float _Kerroin;
                float4 _Keskus;
                float _Jatke;
                float _Tiheys;
                float _PieninRengas;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 toinen : TEXCOORD0; float2 puoli : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; float reuna : TEXCOORD0; float2 pitkin : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                float4 a = TransformWorldToHClip(maailma);
                float4 b = TransformObjectToHClip(i.toinen);
                float2 ruutu = _ScreenParams.xy;
                float2 suunta = b.xy / b.w * ruutu - a.xy / a.w * ruutu;
                float l = length(suunta);
                suunta = l > 1e-4 ? suunta / l : float2(1, 0);
                float2 normaali = float2(-suunta.y, suunta.x);
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                float paa = sign(i.puoli.y);
                float jatke = _Jatke * paa * px;   // koko puolileveys + reunan häive: pyöreä pää mahtuu jatkeeseen
                a.xy += (normaali * i.puoli.x * px + suunta * jatke) * 2.0 / ruutu * a.w;
                // Pallon takapuoli pois (sama raja kuin Nappula-varjostimessa).
                float3 ylos = normalize(maailma - _Keskus.xyz);
                float3 kohti = normalize(_WorldSpaceCameraPos - maailma);
                if (dot(ylos, kohti) < 0.02) a = float4(2, 2, 2, 1);
                // Liian pieni rengas (vain ääriviivalla, y ≠ 0) pois kuten takapuoli; tiheys 0 = ei mitattu → kaikki näkyvät (web).
                if (paa != 0 && _Tiheys > 0 && (abs(i.puoli.y) - 1.0) * _Tiheys < _PieninRengas) a = float4(2, 2, 2, 1);
                o.paikka = a;
                o.reuna = i.puoli.x * px;
                // Paikka janan suunnassa a:sta (a-pään kärjet −jatke, b-pään kärjet pituus + jatke) ja janan pituus.
                // b-pään kärjen oma jana on b → b + (b − a), joten sen pituus on sama kuin a → b. suunta on NDC × ruutu
                // eli kaksinkertaisina pikseleinä (siirto yllä kertoo 2 / ruutu), joten pituus pikseleinä on l / 2.
                float jatkeIso = _Jatke * px;
                float lpx = 0.5 * l;
                o.pitkin = float2(paa > 0 ? lpx + jatkeIso : -jatkeIso, lpx);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float px = 0.5 * _Paksuus * _Kerroin + 0.75;
                float yli = max(max(-i.pitkin.x, i.pitkin.x - i.pitkin.y), 0.0);   // 0 janan kohdalla, > 0 jatkeessa
                float etaisyys = sqrt(i.reuna * i.reuna + yli * yli);
                half alfa = _BaseColor.a * saturate(px - etaisyys);
                return half4(_BaseColor.rgb, alfa);
            }
            ENDHLSL
        }
    }
}
