// Aikajanan liekkivalo (web js/aikajana-valo.js piirraValo): yksi kameraan päin
// kääntyvä neliö lamppua kohti, ja fragmentti laskee webin kolme vetoa kerralla:
//   1. häntä: profiili säteellä S, alfa min(1, 0,72·k)
//   2. runko: profiili säteellä 0,9·S, alfa min(1, 0,6·k), vain liekkimaskin
//      sisällä (säde 0,85·S·reuna(kulma); reuna = harmoniat + kohina)
//   3. ydin:  profiili säteellä 0,26·S, alfa min(1, k)
// Webissä vedot lasketaan canvasissa yhteen ('lighter') ja canvas sekoittuu
// sivulle premultiplied source-over -tavalla; tässä summa lasketaan fragmentissa
// ja tulos sekoitetaan Blend One OneMinusSrcAlpha. Neliö on webin 128 px:n
// piirtoruutu, joten uloin häntä leikkautuu sen reunaan kuten webissä. Lineaarisessa
// väriavaruudessa tulos muunnetaan webin sRGB-sekoitusta vastaavaksi (ks. frag).
//
// OLETUKSET (editoria ei ajettu; Natiiviseppä kääntää):
//  - Mitat ovat ruutupisteitä (CSS px). _RuudunKorkeusPt = ruudun korkeus
//    pisteinä (Screen.height / (dpi/163)), joten koko ruudulla ei riipu
//    etäisyydestä eikä URP:n renderScalesta. Muunnos: näkymäyksikköä per piste =
//    2·syvyys / (|P[1][1]|·korkeusPt), P[1][1] = 1/tan(fov/2) perspektiivissä.
//  - Kulma lasketaan canvasin tavoin y alaspäin: webin monikulmio on
//    (cos a, sin a) canvasin koordinaateissa.
//  - Profiilin väri lasketaan jatkuvana intensiteetistä (webissä 29 pysäkin
//    liukuväri, lineaarinen pysäkkien välissä): ero on silmälle näkymätön.
//  - ZTest Always: webin CSS2D-lamput piirtyvät aina päälle; pallon takana
//    olevat piilottaa Valot.cs normaalitestillä (peitto 0). ZWrite Off.
//
// Kärkidata (Valot.cs kirjoittaa joka kehys):
//   POSITION  lampun keskipiste (objektin koordinaatit)
//   TEXCOORD0 xy kulma ±1, z laatikko (neliön puolikas, pt), w peitto 0…1
//   TEXCOORD1 x säde S (pt), y kirkkaus k, z kohinan alku 0…1, w kohinan 5. hila-arvo
//   TEXCOORD2 kohinan hila-arvot 0–3
//   TEXCOORD3 harmonisten voimat k = 2, 3, 4, 5
//   TEXCOORD4 harmonisten vaiheet (rad, ajan kanssa valmiiksi laskettu)
//   TEXCOORD5/6/7 xyz ydin-, keski- ja laitasävy 0…1
Shader "Matkakirja/Linssit/Valo"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
        _RuudunKorkeusPt("Ruudun korkeus pisteinä", Float) = 844
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+50" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest Always
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            CBUFFER_START(UnityPerMaterial)
                float _Peitto;
                float _RuudunKorkeusPt;
            CBUFFER_END

            struct Syote
            {
                float4 paikka : POSITION;
                float4 k0 : TEXCOORD0;
                float4 k1 : TEXCOORD1;
                float4 kohina : TEXCOORD2;
                float4 voimat : TEXCOORD3;
                float4 vaiheet : TEXCOORD4;
                float4 ydin : TEXCOORD5;
                float4 keski : TEXCOORD6;
                float4 laita : TEXCOORD7;
            };

            struct Vali
            {
                float4 paikka : SV_POSITION;
                float4 p : TEXCOORD0;      // xy piste keskeltä (pt, y ylös), z laatikko, w peitto
                float4 k1 : TEXCOORD1;
                float4 kohina : TEXCOORD2;
                float4 voimat : TEXCOORD3;
                float4 vaiheet : TEXCOORD4;
                float3 ydin : TEXCOORD5;
                float3 keski : TEXCOORD6;
                float3 laita : TEXCOORD7;
            };

            Vali vert(Syote i)
            {
                Vali o;
                float3 keskusVS = TransformWorldToView(TransformObjectToWorld(i.paikka.xyz));
                float syvyys = max(-keskusVS.z, 1e-3);
                float yksikkoa = 2.0 * syvyys / (abs(UNITY_MATRIX_P[1][1]) * max(_RuudunKorkeusPt, 1.0));
                float2 pt = i.k0.xy * i.k0.z;
                o.paikka = TransformWViewToHClip(keskusVS + float3(pt * yksikkoa, 0));
                o.p = float4(pt, i.k0.z, i.k0.w);
                o.k1 = i.k1;
                o.kohina = i.kohina;
                o.voimat = i.voimat;
                o.vaiheet = i.vaiheet;
                o.ydin = i.ydin.xyz;
                o.keski = i.keski.xyz;
                o.laita = i.laita.xyz;
                return o;
            }

            // web valonProfiili: 1 / (1 + (u/0,2)²) normalisoituna laidan arvolla 1/26.
            float Profiili(float u)
            {
                if (u >= 1.0) return 0.0;
                float laske = 1.0 / (1.0 + u * u / 0.04);
                const float laita = 1.0 / 26.0;
                return (laske - laita) / (1.0 - laita);
            }

            // Yksi drawImage-veto premultiplied-muodossa: väri·I·alfa, I·alfa.
            float4 Veto(float d, float sade, float alfa, Vali i)
            {
                if (sade <= 0.0 || alfa <= 0.0) return float4(0, 0, 0, 0);
                float I = Profiili(d / sade);
                float3 vari = I > 0.5 ? lerp(i.keski, i.ydin, (I - 0.5) * 2.0) : lerp(i.laita, i.keski, I * 2.0);
                float a = I * alfa;
                return float4(vari * a, a);
            }

            float Hila(int j, float4 k4, float k5)
            {
                return j == 0 ? k4.x : j == 1 ? k4.y : j == 2 ? k4.z : j == 3 ? k4.w : k5;
            }

            // web liekinSade: 1 + Σ voima·cos(k·a + vaihe) + 0,11·(kohina − 0,5), vähintään 0,5.
            float Reuna(float a, Vali i)
            {
                float s = 1.0;
                s += i.voimat.x * cos(2.0 * a + i.vaiheet.x);
                s += i.voimat.y * cos(3.0 * a + i.vaiheet.y);
                s += i.voimat.z * cos(4.0 * a + i.vaiheet.z);
                s += i.voimat.w * cos(5.0 * a + i.vaiheet.w);
                float x = a * 1.5 / PI + i.k1.z;
                int j = clamp((int)floor(x), 0, 3);
                float f = x - j;
                float u = f * f * (3.0 - 2.0 * f);
                float ka = Hila(j, i.kohina, i.k1.w);
                float kb = Hila(j + 1, i.kohina, i.k1.w);
                s += 0.11 * (ka + (kb - ka) * u - 0.5);
                return max(0.5, s);
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 p = i.p.xy;
                float laatikko = i.p.z;
                clip(laatikko - max(abs(p.x), abs(p.y)));
                float S = i.k1.x;
                float k = i.k1.y;
                float d = length(p);
                float4 c = Veto(d, S, min(1.0, k * 0.72), i);
                // Kulma canvasin koordinaateissa (y alas), 0…2π.
                float a = atan2(-p.y, p.x);
                if (a < 0.0) a += 2.0 * PI;
                if (d <= S * 0.85 * Reuna(a, i)) c += Veto(d, S * 0.9, min(1.0, k * 0.6), i);
                c += Veto(d, S * 0.26, min(1.0, k), i);
                c = min(c, 1.0);
                c *= i.p.w * _Peitto;
            #if !defined(UNITY_COLORSPACE_GAMMA)
                // Webin canvas sekoittuu sRGB-arvoihin; projekti on lineaarinen. Tummalla
                // pohjalla (keksintöjen tummennus) lin(c + (1-a)·pohja) ≈ lin(c) + (1-a)^2,2·lin(pohja):
                // ilman muunnosta hännän 0,05 näkyi 0,26:na ja hehku leveni neliön reunaan asti
                // (kontakti 24.9.). Sama muunnos kuin Tummennus.shaderissa.
                c.rgb = pow(max(c.rgb, 0.0), 2.2);
                c.a = 1.0 - pow(max(1.0 - c.a, 0.0), 2.2);
            #endif
                return half4(c);
            }
            ENDHLSL
        }
    }
}
