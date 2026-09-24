// Napakansi ja napakalotti (NapaKannet.cs): himmeä Lambert-valaistus (päävalo + ympäristö),
// kärkipisteen alfa (kannen häive) ja kalotin karttakuva.
//
// Kuva (_MainTex) on ESIKERROTTU ja sRGB-tavuina LINEAARISESSA tekstuurissa (NapaKannet
// purkaa sen niin, ks. Plugins/iOS/MatkakirjaKuvat.mm): suodatus ja mipit ovat silloin oikein
// myös läpinäkyväksi häivytetyllä reunalla. Varjostin jakaa alfan pois ja muuntaa sRGB:n
// lineaariseksi itse. Kannella kuva on valkoinen (oletus) ja väri tulee _BaseColorista.
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

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; half4 vari : COLOR; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float3 normaali : TEXCOORD0; float2 uv : TEXCOORD1; half4 vari : COLOR; };

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
                half3 vari = lerp(savy * _BaseColor.rgb, _Kerma.rgb, _Kerma.a * maa);
                vari = lerp(vari, vari * half3(0.18, 0.17, 0.24) + half3(0.006, 0.006, 0.016), (half)saturate(_radioHamara));
                return half4(vari * valaistus * a, a);
            }
            ENDHLSL
        }
    }
}
