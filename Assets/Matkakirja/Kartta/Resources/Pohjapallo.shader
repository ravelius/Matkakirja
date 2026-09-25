// Pohjapallo (Kartta/Pohjapallo.cs, löydös 119): pergamentinvärinen umpinainen varapinta 3 km ellipsoidin alla, jotta
// laattojen raoista näkyy pergamenttia eikä avaruutta. Resources-kansiossa, koska olio luodaan ajossa (Resources.Load).
//
// TAKAPINNAT (Cull Front): ruutualue on pallon siluetti, mutta syvyys pallon kaukaisella puolella, joten jokainen
// kameran puoleinen maastokolmio on lähempänä — myös karkeiden laattojen jänteet, jotka painuvat tasolla z3 lähes 4 km
// ja z0:ssa 38 km ellipsoidin alle (perustelu Kartta/Pohjapallolaskenta.cs). Ei z-taistelua: lähin toinen pinta
// (takapuolen maasto) on vähintään 3 km kauempana, ja 32-bittinen käänteinen syvyys erottaa metrin 13 000 km:ssä.
//
// OPAAKKI LAATTOJEN JÄLKEEN (AlphaTest+10 = 2460; tileset-materiaali 2450): syvyystesti hylkää peitetyt fragmentit
// ennen varjostusta. Varjostin ei kirjoita syvyyttä eikä hylkää pikseleitä, joten Applen HSR toimii.
//
// VÄRI: valaisematon _BaseColor (Pohjapallolaskenta.Savy). Fragmentti laskee katseen säteen ensimmäisen osuman pallon
// etupintaan (keskipiste = olion origo = maan keskipiste, säde _Sade): siitä valokeilan suunta ja usvan syvyys, jotta
// reikä tummuu ja usvaantuu kuten ympäröivät laatat. Pallon sävy, valokeila ja radion hämärä samoilla globaaleilla ja
// kaavoilla kuin tileset-varjostimessa ja napakansissa (Shaders/Napakansi.shader); ilman emissiota ja valaistusta.
Shader "Matkakirja/Pohjapallo"
{
    Properties
    {
        _BaseColor("Väri", Color) = (0.851, 0.816, 0.733, 1)
        _Sade("Etupinnan säde (maailman yksiköissä)", Float) = 6375137
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "AlphaTest+10" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Cull Front
            ZWrite On
            ZTest LEqual

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            // Usvan avainsanat kuten URP:n Unlit-varjostimessa (multi_compile_fog tai dynaaminen haara asetuksen mukaan).
            #include_with_pragmas "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Fog.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _Sade;
            CBUFFER_END
            // Radion hämärä (Kartta/RadioMastot.cs) ja pallon tummennus (KarttaKerrokset.PallonSavy): kuten laatoissa.
            float _radioHamara;
            float _pallonTummuus;
            // Valokeila (Ihmisen matka II, KarttaKerrokset.Valokeila): samat globaalit kuin tileset-varjostimessa.
            float4 _keila0, _keila1, _keilaRajat, _keila0Vari, _keila1Vari;
            float _keilaHamaryys;

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                // Säteen ensimmäinen osuma etupintaan: lähimmän pisteen kautta (vakaampi floatina kuin b² − c).
                float3 kamera = GetCameraPositionWS();
                float3 keski = TransformObjectToWorld(float3(0.0, 0.0, 0.0));
                float3 suunta = normalize(i.maailma - kamera);
                float3 oc = kamera - keski;
                float b = dot(oc, suunta);
                float3 q = oc - b * suunta;
                float t = max(-b - sqrt(max(_Sade * _Sade - dot(q, q), 0.0)), 0.0);
                float3 osuma = kamera + suunta * t;

                half3 vari = _BaseColor.rgb * (half)(1.0 - saturate(_pallonTummuus));
                half3 hehku = half3(0, 0, 0);
                float kh = saturate(_keilaHamaryys);
                if (kh > 0.0 || _keilaRajat.y > 0.0 || _keilaRajat.w > 0.0)
                {
                    float3 kn = normalize(osuma - keski);
                    float k0 = (1.0 - smoothstep(_keila0.w, max(_keilaRajat.x, _keila0.w + 1e-6), length(kn - _keila0.xyz))) * saturate(_keilaRajat.y);
                    float k1 = (1.0 - smoothstep(_keila1.w, max(_keilaRajat.z, _keila1.w + 1e-6), length(kn - _keila1.xyz))) * saturate(_keilaRajat.w);
                    float3 ksavy = k0 >= k1 ? lerp(float3(1, 1, 1), _keila0Vari.rgb, k0) : lerp(float3(1, 1, 1), _keila1Vari.rgb, k1);
                    hehku = (half3)(vari * (_keila0Vari.rgb * (_keila0Vari.a * k0 * k0) + _keila1Vari.rgb * (_keila1Vari.a * k1 * k1)));
                    vari *= (half3)(lerp(1.0 - 0.95 * kh, 1.0, max(k0, k1)) * ksavy);
                }
                vari = lerp(vari, vari * half3(0.18, 0.17, 0.24) + half3(0.006, 0.006, 0.016), (half)saturate(_radioHamara));
                // Usva etupinnan osuman syvyydestä (kameran katseen suunnassa, lähitasosta alkaen kuten URP:n Unlit),
                // jotta reikä usvaantuu kuten ympäröivät laatat.
                float syvyys = max(t * dot(suunta, -UNITY_MATRIX_V[2].xyz) - _ProjectionParams.y, 0.0);
                half sumu = ComputeFogFactorZ0ToFar(syvyys);
                return half4(MixFog(vari + hehku, sumu), 1.0);
            }
            ENDHLSL
        }
    }
}
