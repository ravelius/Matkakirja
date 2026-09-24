// Radiomasto (radiouudistus build 12, Kartta/RadioMastot.cs): kolme proseduraalista verkkoa (MastoGeometria) GPU-
// instansseina, yksi piirtokutsu kokoa kohden. Instanssin matriisi asettaa juuren, pinnan normaalin suunnan ja
// korkeuden (H, H · nousu, H). Kanavaton maa: _Peitto 0,5.
//
// Kaksi kärkilajia (MastoGeometria):
//   viiva   uv.y = leveys pisteinä > 0, uv.x = puoli ±1, uv2/uv3 = päätepisteet: nelikulmio levitetään ruudulla
//           kohtisuoraan viivaa vastaan, joten ristikko, tolpat ja harukset ovat pisteinä kuten havainnekuvan
//           SVG:ssä (b12d-palaute: 3D-sauvat katosivat alle pikselin ohuina). Alle pikselin viiva piirretään yhden
//           pikselin levyisenä ja peittävyys laskee leveyden mukana. Väri sellaisenaan (lähes musta), ei valaistusta.
//   pinta   uv.y = 0: kylkien puoliläpinäkyvä täyttö, putki ja tasanne; kameran valo ja tasainen ympäristö.
// Hämärä (_radioHamara) tummentaa pinnat neutraalisti (b12d: kartan sininen hämäräkaava teki mastoista sinertäviä).
// ZWrite Off: kyljet ovat läpikuultavia, ja laattojen syvyys peittää pallon takana olevat.
Shader "Matkakirja/Radiomasto"
{
    Properties
    {
        _BaseColor("Väri", Color) = (1, 1, 1, 1)
        _Viiva("Pikseliä viivan pisteelle", Float) = 2
    }
    SubShader
    {
        // Renkaiden (Transparent-20) jälkeen ja valojen (Transparent+5) alle.
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-10" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile_instancing
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.core/ShaderLibrary/Color.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half4 _BaseColor;
                float _Viiva;
            CBUFFER_END
            float _radioHamara;

            UNITY_INSTANCING_BUFFER_START(Mastot)
                UNITY_DEFINE_INSTANCED_PROP(float, _Peitto)
            UNITY_INSTANCING_BUFFER_END(Mastot)

            struct Syote
            {
                float4 paikka : POSITION;
                float3 normaali : NORMAL;
                half4 vari : COLOR;
                float2 viiva : TEXCOORD0;
                float3 alku : TEXCOORD1;
                float3 loppu : TEXCOORD2;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };
            struct Vali
            {
                float4 paikka : SV_POSITION;
                float3 normaali : TEXCOORD0;
                float3 maailma : TEXCOORD1;
                // x = etäisyys viivan keskeltä (px), y = viivan puolileveys (px), z = 1 viivalla, 0 pinnalla
                float3 viiva : TEXCOORD2;
                half4 vari : COLOR;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            float2 Ruutu(float4 c) { return c.xy / c.w * _ScreenParams.xy * 0.5; }

            Vali vert(Syote i)
            {
                Vali o;
                UNITY_SETUP_INSTANCE_ID(i);
                UNITY_TRANSFER_INSTANCE_ID(i, o);
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                o.normaali = TransformObjectToWorldNormal(i.normaali);
                o.viiva = float3(0, 0, 0);
                if (i.viiva.y > 0.0)
                {
                    float2 a = Ruutu(TransformWorldToHClip(TransformObjectToWorld(i.alku)));
                    float2 b = Ruutu(TransformWorldToHClip(TransformObjectToWorld(i.loppu)));
                    float2 d = b - a;
                    float l = length(d);
                    float2 suunta = l > 1e-4 ? d / l : float2(0.0, 1.0);
                    float2 kohtisuora = float2(-suunta.y, suunta.x);
                    float puoli = 0.5 * i.viiva.y * _Viiva;
                    float levitys = max(puoli, 0.5) + 0.75;   // vähintään 1 px + reunanpehmennys
                    o.paikka.xy += kohtisuora * (i.viiva.x * levitys) * 2.0 / _ScreenParams.xy * o.paikka.w;
                    o.viiva = float3(i.viiva.x * levitys, puoli, 1.0);
                }
                half4 v = i.vari;
            #if !defined(UNITY_COLORSPACE_GAMMA)
                v.rgb = SRGBToLinear(v.rgb);
            #endif
                o.vari = v;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                UNITY_SETUP_INSTANCE_ID(i);
                half peitto = UNITY_ACCESS_INSTANCED_PROP(Mastot, _Peitto) * _BaseColor.a;
                if (i.viiva.z > 0.5)
                {
                    float puoli = i.viiva.y;
                    half kattavuus = saturate(max(puoli, 0.5) + 0.5 - abs(i.viiva.x)) * min(1.0, 2.0 * puoli);
                    if (kattavuus <= 0.002) discard;
                    return half4(i.vari.rgb * _BaseColor.rgb, i.vari.a * kattavuus * peitto);
                }
                float3 n = normalize(i.normaali);
                float3 kohti = normalize(_WorldSpaceCameraPos - i.maailma);
                if (dot(n, kohti) < 0.0) n = -n;
                // Kameran mukana kulkeva suunnattu valo (Rakennus.LuoPallo "Valo") ja tasainen ympäristö.
                half nl = saturate(dot(n, _MainLightPosition.xyz));
                half3 vari = i.vari.rgb * _BaseColor.rgb * (0.45 + 0.8 * nl * _MainLightColor.rgb);
                vari *= lerp(1.0, 0.55, (half)saturate(_radioHamara));
                return half4(vari, i.vari.a * peitto);
            }
            ENDHLSL
        }
    }
}
