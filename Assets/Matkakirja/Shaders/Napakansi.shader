// Napakansi ja napakalotti (NapaKannet.cs): himmeä Lambert-valaistus (päävalo + ympäristö),
// kärkipisteen alfa (kannen häive) ja kalotin karttakuva.
//
// Kuva (_MainTex) on ESIKERROTTU ja sRGB-tavuina LINEAARISESSA tekstuurissa (NapaKannet
// purkaa sen niin, ks. Plugins/iOS/MatkakirjaKuvat.mm): suodatus ja mipit ovat silloin oikein
// myös läpinäkyväksi häivytetyllä reunalla. Varjostin jakaa alfan pois ja muuntaa sRGB:n
// lineaariseksi itse. Kannella kuva on valkoinen (oletus) ja väri tulee _BaseColorista; reliefikannella
// väri on kärkipisteissä (lineaarisena) ja _BaseColor on laattojen valaistuskerroin.
//
// Maasto ei saa puhkaista kalottia (Etelämantereen jää ja vuoret 4,9 km:iin), mutta kalotti
// piirretään pinnan korkeudelle, ettei se liu'u laattojen suhteen kallistetussa kuvassa.
// Siksi vain SYVYYS nostetaan: kärkipiste siirretään kameran näkösädettä pitkin kameraa
// kohti niin, että se on _Nosto metriä pinnan yläpuolella. Ruutupaikka ei muutu (piste pysyy
// samalla säteellä), mutta syvyystesti päästää kalotin maaston päälle ja jättää sen yhä
// korkeammalla lentävien kappaleiden alle. Jono on laattojen jälkeen mutta ennen pelin
// päällyskerroksia (maatäyttö, reitit, merkit, ilmakehä, pilvet): webin renderOrder −0,75.
Shader "Matkakirja/Napakansi"
{
    Properties
    {
        _BaseColor("Väri", Color) = (1, 1, 1, 1)
        _MainTex("Kalotin kuva (esikerrottu)", 2D) = "white" {}
        _Nosto("Syvyyden nosto (m)", Float) = 6000
        _Kerma("Väritason kerma (a = peitto)", Color) = (0.98, 0.957, 0.839, 0)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-80" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Packages/com.unity.render-pipelines.core/ShaderLibrary/Color.hlsl"

            TEXTURE2D(_MainTex); SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float4 _MainTex_ST;
                float _Nosto;
                half4 _Kerma;
            CBUFFER_END
            // Radion hämärä (Kartta/RadioMastot.cs, sama kaava kuin tileset-varjostimen RadioHamara): kansi tummuu laattojen mukana.
            float _radioHamara;
            // Pallon tummennus (löydös 98, KarttaKerrokset.PallonSavy): sama kerroin kuin tileset-varjostimessa.
            float _pallonTummuus;
            // Valokeila (Ihmisen matka II, KarttaKerrokset.Valokeila): samat globaalit ja kaava kuin tileset-varjostimen
            // RadioHamarassa (Shaders/Cesium/Lahde~/tee_tileset.py). Maan keskipiste _maaKeski (KorkeusKerroin).
            float4 _maaKeski;
            float4 _keila0, _keila1, _keilaRajat, _keila0Vari, _keila1Vari;
            float _keilaHamaryys;
            // Hunnun paljastus (elävä kartta, Varitaso.Paljastus): sama kaava kuin tileset-varjostimen paikassa 2.
            float4 _paljastus, _paljastusReuna;

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; half4 vari : COLOR; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float3 normaali : TEXCOORD0; float2 uv : TEXCOORD1; half4 vari : COLOR; float3 maailma : TEXCOORD2; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 paikka = TransformObjectToWorld(i.paikka.xyz);
                float3 n = normalize(TransformObjectToWorldNormal(i.normaali));
                float3 kohti = GetCameraPositionWS() - paikka;
                float etaisyys = length(kohti);
                float3 suunta = kohti / max(etaisyys, 1.0);
                // Nosto pinnan normaalin suunnassa = _Nosto; näkösädettä pitkin siis _Nosto / cos.
                // Takapuolta (horisontin takana) ei nosteta: maapallo peittää sen.
                float c = dot(n, suunta);
                float nosto = c > 0.0 ? min(_Nosto / max(c, 0.15), etaisyys * 0.5) : 0.0;
                o.paikka = TransformWorldToHClip(paikka + suunta * nosto);
                o.normaali = n;
                o.uv = i.uv;
                o.vari = i.vari;
                o.maailma = paikka;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 n = normalize(i.normaali);
                Light valo = GetMainLight();
                half3 valaistus = valo.color * saturate(dot(n, valo.direction)) + SampleSH(n);
                half4 kuva = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                half3 savy = kuva.a > 0.002 ? kuva.rgb / kuva.a : half3(0, 0, 0);
                // Webin kermasääntö (js/laattakerma-shader.js): vain maa (R − B sRGB-tavuina 36…52), meri jää.
                half maa = smoothstep(36.0 / 255.0, 52.0 / 255.0, savy.r - savy.b);
            #if !defined(UNITY_COLORSPACE_GAMMA)
                savy = SRGBToLinear(savy);
            #endif
                half a = kuva.a * _BaseColor.a * i.vari.a;
                // Väritason kerma kuten laatoissa (Cesiumin raster-kerros sekoittuu ennen valaistusta).
                // Kärkipisteen rgb: reliefikannen väri (NapaKannet ReliefinPohjoisreuna, lineaarisena); muilla valkoinen.
                half peitto = 1.0;
                if (_paljastusReuna.w > 0.5)
                {
                    float3 pn = normalize(i.maailma - _maaKeski.xyz);
                    float3 q = pn * _paljastusReuna.z;
                    float kohina = sin(q.x + 1.7 * sin(q.y * 1.3)) * sin(q.y * 1.1 + 1.3 * sin(q.z * 1.7))
                        + 0.5 * sin(q.z * 2.3 + 1.1 * sin(q.x * 2.9));
                    float w = max(_paljastusReuna.x, 1e-6);
                    peitto = (half)smoothstep(_paljastus.w - 0.5 * w, _paljastus.w + 0.5 * w,
                        length(pn - _paljastus.xyz) + kohina * _paljastusReuna.y);
                }
                half3 vari = lerp(savy * _BaseColor.rgb * i.vari.rgb, _Kerma.rgb, _Kerma.a * maa * peitto);
                vari *= (half)(1.0 - saturate(_pallonTummuus));
                // Valokeila ennen radion hämärää: keilan ulkopuolinen perusväri tummuu, keilassa lyhdyn sävy ja hehku
                // (emissiona, valaistuksen ohi kuten laattojen emissio). Jänne |n − k|, floatina tarkka pienilläkin keiloilla.
                half3 hehku = half3(0, 0, 0);
                float kh = saturate(_keilaHamaryys);
                if (kh > 0.0 || _keilaRajat.y > 0.0 || _keilaRajat.w > 0.0)
                {
                    float3 kn = normalize(i.maailma - _maaKeski.xyz);
                    float k0 = (1.0 - smoothstep(_keila0.w, max(_keilaRajat.x, _keila0.w + 1e-6), length(kn - _keila0.xyz))) * saturate(_keilaRajat.y);
                    float k1 = (1.0 - smoothstep(_keila1.w, max(_keilaRajat.z, _keila1.w + 1e-6), length(kn - _keila1.xyz))) * saturate(_keilaRajat.w);
                    float3 ksavy = k0 >= k1 ? lerp(float3(1, 1, 1), _keila0Vari.rgb, k0) : lerp(float3(1, 1, 1), _keila1Vari.rgb, k1);
                    hehku = (half3)(vari * (_keila0Vari.rgb * (_keila0Vari.a * k0 * k0) + _keila1Vari.rgb * (_keila1Vari.a * k1 * k1)));
                    vari *= (half3)(lerp(1.0 - 0.95 * kh, 1.0, max(k0, k1)) * ksavy);
                }
                vari = lerp(vari, vari * half3(0.18, 0.17, 0.24) + half3(0.006, 0.006, 0.016), (half)saturate(_radioHamara));
                return half4((vari * valaistus + hehku) * a, a);
            }
            ENDHLSL
        }
    }
}
