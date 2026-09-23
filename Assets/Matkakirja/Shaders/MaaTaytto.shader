// Maatila (vertailu- ja maatietolinssit): maiden täyttö ja raja pallon päällä.
// _Tunnus on tasakulmainen maatunnuskartta (R8, 0 = meri, 1–255 = maan indeksi),
// _Paletti 256×2 (rivi 0 täyttö, rivi 1 raja). Raja tunnistetaan naapuritekseleistä
// ruudun mittakaavassa (fwidth), joten viivan leveys pysyy pikseleinä vakiona.
// Kuori piirretään ilman syvyystestiä ennen reittejä ja merkkejä (MaaKartta.cs).
Shader "Matkakirja/MaaTaytto"
{
    Properties
    {
        _Tunnus("Tunnuskartta", 2D) = "black" {}
        _Paletti("Paletti", 2D) = "black" {}
        _ReunaLeveys("Rajan leveys (px)", Float) = 1.5
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
            CBUFFER_START(UnityPerMaterial)
                float _ReunaLeveys;
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
                uv.y = saturate(uv.y);
                return round(SAMPLE_TEXTURE2D_LOD(_Tunnus, sampler_point_repeat, uv, 0).r * 255.0);
            }

            half4 Vari(float id, float rivi)
            {
                return SAMPLE_TEXTURE2D_LOD(_Paletti, sampler_point_clamp, float2((id + 0.5) / 256.0, rivi), 0);
            }

            half4 frag(Vali i) : SV_Target
            {
                float2 d = fwidth(i.uv) * _ReunaLeveys;
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
                    half4 r = Vari(k > 0 ? k : naapuri, 0.75);
                    if (r.a > 0) return r;
                }
                if (k <= 0) discard;
                half4 t = Vari(k, 0.25);
                if (t.a <= 0) discard;
                return t;
            }
            ENDHLSL
        }
    }
}
