// Lippu3D (Kartta/Lipputanko.cs, omistajan löydös 161, tarkennus 26.9. klo 12.0x): lipputangon lippu 3D-kankaana. Tasainen
// heiluva värikuva (144:n RT) vaihtui jaettuun verkkoon (Lipputanko: 24 × 12 ruutua), jota kärkivarjostin taivuttaa samoilla
// arvokkailla aalloilla kuin Lippuaalto (jaksot 3,0 ja 3,7 s, 1,15 ja 0,62 aaltoa lipun leveydellä), ja valo lasketaan
// taivutetun kankaan normaaleista: diffuusi pääsuuntavalosta (laskoksissa varjo), pieni kiilto (Blinn–Phong) ja reunahohde.
//
// PAIKALLINEN AVARUUS: tanko on x = 0, lippu liehuu −x:ään (Lipputanko kääntää +z:n kameraan), y ylös. uv.x = 0 tangossa,
// 1 lipun kärjessä. Siirtymä kankaan normaalin (z) suuntaan: A · verho(u) · (0,62 sin θ1 + 0,38 sin θ2), verho(u) =
// u · (0,5 + 0,5 u) (tanko ei liiku). Normaali derivaatasta: n = normalize((−∂z/∂x, −∂z/∂y, 1)). _Aika sekunteina
// (Lipputanko: unscaledTime tai Joutosyke), _Voima 0 = suora kangas.
// Kaksipuolinen (Cull Off): takapuolella normaali käännetään. Horisonttiusva tangon jalasta (sama kuin Lipputanko.shader).
Shader "Matkakirja/Lippu3D"
{
    Properties
    {
        _MainTex("Lippu", 2D) = "white" {}
        _Aika("Aika (s)", Float) = 0
        _Voima("Voima 0–1", Float) = 1
        _Leveys("Lipun leveys (paikallinen)", Float) = 0.54
        _Korkeus("Lipun korkeus (paikallinen)", Float) = 0.36
        _Amplitudi("Aallon amplitudi × korkeus", Float) = 0.2
        _Kiilto("Kiilto", Float) = 0.32
        _Hohde("Reunahohde", Float) = 0.12
    }
    SubShader
    {
        Tags { "Queue" = "Transparent+2" "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Lippu3D"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Off
            Blend SrcAlpha OneMinusSrcAlpha

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_ST;
                float _Aika, _Voima, _Leveys, _Korkeus, _Amplitudi, _Kiilto, _Hohde;
            CBUFFER_END

            static const float TAYSKULMA = 6.28318531;
            static const float A1 = 0.62, K1 = 1.15, T1 = 3.0, V1 = 0.0;
            static const float A2 = 0.38, K2 = 0.62, T2 = 3.7, V2 = 1.7;
            static const float VINOUS = 0.35;   // aaltorintama hieman vino (lippu ei heilu kuin levy)

            struct Tulo { float4 positionOS : POSITION; float2 uv : TEXCOORD0; };
            struct Valissa { float4 positionCS : SV_POSITION; float2 uv : TEXCOORD0; float3 nWS : TEXCOORD1; float3 pWS : TEXCOORD2; float usvaY : TEXCOORD3; float taite : TEXCOORD4; };

            // Siirtymä z ja sen derivaatat u:n ja v:n suhteen (u, v 0–1).
            float3 Aalto(float u, float v)
            {
                float verho = u * (0.5 + 0.5 * u), dverho = 0.5 + u;
                float th1 = TAYSKULMA * (K1 * u - _Aika / T1 + VINOUS * v) + V1;
                float th2 = TAYSKULMA * (K2 * u - _Aika / T2 - 0.5 * VINOUS * v) + V2;
                float s = A1 * sin(th1) + A2 * sin(th2);
                float dsdu = TAYSKULMA * (A1 * K1 * cos(th1) + A2 * K2 * cos(th2));
                float dsdv = TAYSKULMA * VINOUS * (A1 * cos(th1) - 0.5 * A2 * cos(th2));
                float A = _Amplitudi * _Korkeus * _Voima;
                return float3(A * verho * s, A * (dverho * s + verho * dsdu), A * verho * dsdv);
            }

            Valissa vert(Tulo i)
            {
                Valissa o;
                float3 w = Aalto(i.uv.x, i.uv.y);
                float3 p = i.positionOS.xyz;
                p.z += w.x;
                // Kankaan pituus säilyy likimain: aallon kohdalla kärki vetäytyy tankoa kohti.
                p.x += 0.12 * abs(w.x) * i.uv.x;
                // x = −u · leveys, y = v · korkeus → ∂z/∂x = −(∂z/∂u) / leveys, ∂z/∂y = (∂z/∂v) / korkeus.
                float3 nOS = normalize(float3(w.y / _Leveys, -w.z / _Korkeus, 1.0));
                o.positionCS = TransformObjectToHClip(p);
                o.pWS = TransformObjectToWorld(p);
                o.nWS = TransformObjectToWorldNormal(nOS);
                o.uv = i.uv;
                o.taite = nOS.x;   // kankaan kaltevuus: taitteen valo/varjo katselukulmasta riippumatta
                o.usvaY = UsvaYlhaalta(TransformObjectToHClip(float3(0, 0, 0)));
                return o;
            }

            half4 frag(Valissa i, bool edessa : SV_IsFrontFace) : SV_Target
            {
                half4 c = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                float3 n = normalize(i.nWS) * (edessa ? 1.0 : -1.0);
                Light valo = GetMainLight();
                float3 l = valo.direction;
                float3 v = normalize(GetWorldSpaceViewDir(i.pWS));
                float nl = dot(n, l);
                // Diffuusi: laskokset varjoon, mutta ei mustaksi (kangas läpikuultaa hieman: takavalo 0,35 ·).
                half diff = 0.5 + 0.5 * saturate(nl) + 0.12 * saturate(-nl);
                // Taitteet: aallon rinne toiselta puolelta vaaleampi, toiselta tummempi (±20 %), kuten valo kankaan poimuissa.
                diff *= 1.0 + 0.2 * clamp(i.taite * 3.0, -1.0, 1.0);
                float3 h = normalize(l + v);
                half kiilto = _Kiilto * pow(saturate(dot(n, h)), 20.0) * saturate(nl * 4.0);
                half hohde = _Hohde * pow(1.0 - saturate(abs(dot(n, v))), 3.0);
                c.rgb = c.rgb * diff + (kiilto + hohde) * valo.color;
                c.a *= UsvaNakyvyys(i.usvaY);
                clip(c.a - 0.004);
                return c;
            }
            ENDHLSL
        }
    }
}
