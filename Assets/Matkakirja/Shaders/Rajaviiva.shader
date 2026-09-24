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
//
// SYVYYSTESTI JA SYVYYSNOSTO (löydös 46 E1, rannikko: Kartta/Rannikko.cs): oletus on ennallaan ZTest Always (aluerajat,
// ääriviiva). Rannikko asettaa _ZTest = LessEqual ja nostaa vain SYVYYDEN Napakansi.shaderin tapaan: kärki siirretään
// näkösädettä pitkin kameraa kohti niin, että se on _Nosto + _NostoOsuus × etäisyys metriä pinnan yläpuolella
// (ruutupaikka ei muutu). Nosto kattaa maaston karkean tason virheen korkeuskertoimella (virhe kasvaa etäisyyden
// mukana), joten viiva ei z-fightaa rannan kanssa, mutta sitä korkeampi vuori kallistetussa kuvassa peittää sen.
//
// VALTIOIDEN RAJAT (löydös 46 E2, Kartta/Rajat.cs): TEXCOORD2 = (matka viivaa pitkin metreinä, oma h, toisen pään h).
//  - Katkoviiva: _Katko metriä mustetta, _Vali metriä väliä (web RAJA_KATKO_YKS pallon yksikköinä → 700,8 / 1 401,6 m).
//    Reuna antialiasoidaan fwidth:llä, ja kun jakso on ruudulla alle ~2 px, kuvio liukuu keskiarvopeittoonsa (ei
//    välkettä kaukana). _Katko = 0 → yhtenäinen (rannikko, aluerajat, ääriviiva).
//  - Korkeus: viivan paikka on jo korkeudella h (Karttasepän rajapisteiden DEM-korkeus; puuttuessa 0), ja tämä lisää
//    tilesetin korkeuskertoimen osuuden n·max(h, 0)·(k − 1) samalla ellipsoidinormaalilla kuin MatkakirjaTileset
//    (globaalit _korkeusKerroin, _maaKeski, _maaAkseli; Kartta/KorkeusKerroin.cs). Ilman TEXCOORD2:ta (aluerajat,
//    ääriviiva) kaikki on 0 → ennallaan.
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
        [Enum(UnityEngine.Rendering.CompareFunction)] _ZTest("Syvyystesti", Float) = 8
        _Nosto("Syvyysnosto (m)", Float) = 0
        _NostoOsuus("Syvyysnosto etäisyyden osuutena", Float) = 0
        _Katko("Katkoviivan muste (m, 0 = yhtenäinen)", Float) = 0
        _Vali("Katkoviivan väli (m)", Float) = 0
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
            ZTest [_ZTest]
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
                float _Nosto;
                float _NostoOsuus;
                float _Katko;
                float _Vali;
            CBUFFER_END

            // Tilesetin korkeuskertoimen globaalit (KorkeusKerroin.cs); asettamaton kerroin 0 = 1.
            float _korkeusKerroin;
            float4 _maaKeski;
            float4 _maaAkseli;

            float3 Kohotus(float3 p, float h)
            {
                float k = _korkeusKerroin > 0.0 ? _korkeusKerroin : 1.0;
                if (k == 1.0 || h <= 0.0) return p;
                const float ekv = 6378137.0;
                const float nap = 6356752.314245;
                float3 d = p - _maaKeski.xyz;
                float3 ak = dot(_maaAkseli.xyz, _maaAkseli.xyz) > 0.5 ? normalize(_maaAkseli.xyz) : float3(0.0, 1.0, 0.0);
                float z = dot(d, ak);
                float3 n = normalize(d + ak * z * (ekv * ekv / (nap * nap) - 1.0));
                return p + n * (h * (k - 1.0));
            }

            struct Syote { float4 paikka : POSITION; float3 toinen : TEXCOORD0; float2 puoli : TEXCOORD1; float3 lisa : TEXCOORD2; };
            struct Vali { float4 paikka : SV_POSITION; float reuna : TEXCOORD0; float2 pitkin : TEXCOORD1; float matka : TEXCOORD2; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = Kohotus(TransformObjectToWorld(i.paikka.xyz), i.lisa.y);
                float3 toinenW = Kohotus(TransformObjectToWorld(i.toinen), i.lisa.z);
                float3 ylos = normalize(maailma - _Keskus.xyz);
                float3 kohtiV = _WorldSpaceCameraPos - maailma;
                float etaisyys = length(kohtiV);
                float3 kohti = kohtiV / max(etaisyys, 1e-3);
                // Syvyysnosto (rannikko ja rajat; muilla 0): pinnan normaalin suunnassa h, näkösädettä pitkin siis h / cos.
                float c = dot(ylos, kohti);
                float h = _Nosto + _NostoOsuus * etaisyys;
                float nosto = h > 0.0 && c > 0.0 ? min(h / max(c, 0.15), etaisyys * 0.5) : 0.0;
                float4 a = TransformWorldToHClip(maailma + kohti * nosto);
                float4 b = TransformWorldToHClip(toinenW);
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
                if (c < 0.02) a = float4(2, 2, 2, 1);
                // Liian pieni rengas (vain ääriviivalla, y ≠ 0) pois kuten takapuoli; tiheys 0 = ei mitattu → kaikki näkyvät (web).
                if (paa != 0 && _Tiheys > 0 && (abs(i.puoli.y) - 1.0) * _Tiheys < _PieninRengas) a = float4(2, 2, 2, 1);
                o.paikka = a;
                o.reuna = i.puoli.x * px;
                o.matka = i.lisa.x;
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
                if (_Katko > 0.0)
                {
                    float jakso = _Katko + _Vali;
                    float fw = max(fwidth(i.matka), 1e-3);
                    float f = frac(i.matka / jakso) * jakso;
                    float kuvio = saturate((_Katko - f) / fw + 0.5) * saturate(f / fw + 0.5);
                    kuvio = lerp(kuvio, _Katko / jakso, saturate(fw * 2.0 / jakso - 1.0));
                    alfa *= kuvio;
                }
                return half4(_BaseColor.rgb, alfa);
            }
            ENDHLSL
        }
    }
}
