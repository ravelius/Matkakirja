// Maatila (vertailu- ja maatietolinssit): maiden täyttö ja raja pallon päällä.
// _Tunnus on tasakulmainen maatunnuskartta (R8, 0 = meri, 1–255 = maan indeksi),
// _Paletti 256×2 (rivi 0 täyttö, rivi 1 raja). Raja tunnistetaan naapuritekseleistä
// ruudun mittakaavassa (fwidth), joten viivan leveys pysyy pikseleinä vakiona: 1 laitepikseli
// kuten webin three-globe polygonStrokeColor (LineBasicMaterial). Peittävyys muunnetaan
// lineaarisessa väriavaruudessa webin sRGB-sekoitusta vastaavaksi (sama kuin Tummennus.shader).
// Kuori piirretään ilman syvyystestiä ennen reittejä ja merkkejä (MaaKartta.cs).
// Maakunnat (MaaKartta.maakohtainen, web js/pallomaakunnat.js): paletin täyttö on jo kompensoitu CPU:lla
// (Maakuntajako.Taytto), joten _TayttoEksponentti = 1, ja _Haive (0–1) kertoo täytön peiton webin 260 ms:n
// häiveessä. Oletukset (1,75 ja 1) pitävät maatilan ennallaan.
Shader "Matkakirja/MaaTaytto"
{
    Properties
    {
        _Tunnus("Tunnuskartta", 2D) = "black" {}
        _Maski("Maamaski (löydös 157)", 2D) = "white" {}
        _MaskiPaalla("Maski päällä", Float) = 0
        _Paletti("Paletti", 2D) = "black" {}
        _ReunaLeveys("Rajan leveys (px)", Float) = 0.5
        _Alue("Rajaus", Vector) = (-180, 90, 360, 180)
        _TayttoEksponentti("Täytön peittävyyden eksponentti lineaarisessa tilassa", Float) = 1.75
        _Haive("Täytön häive", Float) = 1
        _Saapuminen("Saapumisen piilotus (1 = näkyy)", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-10" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_Tunnus); SAMPLER(sampler_point_repeat);
            TEXTURE2D(_Paletti); SAMPLER(sampler_point_clamp);
            TEXTURE2D(_Maski); SAMPLER(sampler_linear_clamp);
            CBUFFER_START(UnityPerMaterial)
                float _ReunaLeveys;
                float4 _Tunnus_TexelSize;
                float4 _Alue; // länsi, pohjoinen, pituusväli, leveysväli (asteina)
                float _MaskiPaalla;
                float _TayttoEksponentti;
                float _Haive;
                // Elävän kartan saapuminen (MaaKartta.Saapuminen): täyttö JA reuna piiloon ja takaisin 0,3 s:ssa.
                float _Saapuminen;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            float Tunnus(float2 uv)
            {
                // Rajatun kartan ulkopuolella ei ole alueita.
                if (_Alue.z < 359.0 && (uv.x < 0 || uv.x > 1 || uv.y < 0 || uv.y > 1)) return 0;
                uv.y = saturate(uv.y);
                return round(SAMPLE_TEXTURE2D_LOD(_Tunnus, sampler_point_repeat, uv, 0).r * 255.0);
            }

            half4 Vari(float id, float rivi, float eksponentti)
            {
                half4 c = SAMPLE_TEXTURE2D_LOD(_Paletti, sampler_point_clamp, float2((id + 0.5) / 256.0, rivi), 0);
            #if !defined(UNITY_COLORSPACE_GAMMA)
                // Web sekoittaa rgba-täytön sRGB-arvoihin; lineaarisena sama 0,3 jäi iPadilla lähes
                // näkymättömäksi (Linssisepän kontakti 24.9.). Eksponentti kuten Tummennus.shaderissa.
                c.a = 1 - pow(max(1 - c.a, 0), eksponentti);
            #endif
                return c;
            }

            half4 frag(Vali i) : SV_Target
            {
                // Kuoren uv on koko maailma (u: -180…180°, v: 90…-90°); tunnuskartan uv rajauksesta.
                float lon = i.uv.x * 360.0 - 180.0, lat = 90.0 - i.uv.y * 180.0;
                float2 raaka = float2((lon - _Alue.x) / _Alue.z, (_Alue.y - lat) / _Alue.w);
                // Maakuntien rajaus voi ylittää päivämäärärajan (Venäjä 19…192°, Fidži 174…182°): pituus kierretään
                // välille [länsi, länsi + 360). Derivaatat kiertämättömästä, ettei saumaan tule leveää reunaa.
                float dl = lon - _Alue.x;
                dl -= 360.0 * floor(dl / 360.0);
                i.uv = float2(dl / _Alue.z, raaka.y);
                // Raja ±_ReunaLeveys pikseliä tekselirajasta (1 px kuten web) myös lähellä, missä teksel on
                // ruutua suurempi; pieni alaraja vain kaukaa, ettei alle pikselin tekseleistä jää aukkoja.
                float2 d = max(fwidth(raaka) * _ReunaLeveys, _Tunnus_TexelSize.xy * 0.05);
                float k = Tunnus(i.uv);
                float a = Tunnus(i.uv + float2(d.x, 0));
                float b = Tunnus(i.uv - float2(d.x, 0));
                float c = Tunnus(i.uv + float2(0, d.y));
                float e = Tunnus(i.uv - float2(0, d.y));
                float naapuri = max(max(a, b), max(c, e));
                bool raja = (a != k) || (b != k) || (c != k) || (e != k);
                if (raja)
                {
                    // Rajalla maan oma reunaväri; meren puolella viereisen maan.
                    half4 r = Vari(k > 0 ? k : naapuri, 0.75, 1.75);
                    r.a *= _Saapuminen;
                    if (r.a > 0) return r;
                }
                // Löydös 157: maamaski (tarkempi kuin tunnuskartta) leikkaa täytön rantaan; maalla oleva tunnuksen aukko
                // (porras sisäänpäin) saa naapurialueen.
                half m = 1;
                if (_MaskiPaalla > 0.5)
                {
                    m = SAMPLE_TEXTURE2D_LOD(_Maski, sampler_linear_clamp, saturate(i.uv), 0).r;
                    if (k <= 0 && m > 0.5 && naapuri > 0) k = naapuri;
                    m = smoothstep(0.2, 0.8, m);
                }
                if (k <= 0) discard;
                half4 t = Vari(k, 0.25, _TayttoEksponentti);
                t.a *= _Haive * _Saapuminen * m;
                if (t.a <= 0) discard;
                return t;
            }
            ENDHLSL
        }
    }
}
