// Dioraaman YMPÄRISTÖN MAASTO JA HORISONTTI (Olavinlinna, Siirtoseppä 1.10.2026; Linnanrakentajan aineisto MML CC BY 4.0).
// Valaisematon kuten fotogrammetrinen kuori: ortokuvassa on jo päivänvalo. Väri = kuva(uv0) · _Kirkkaus → sumu.
//
// KERROSVARJOSTIN (splat, Päätoimittajan hyväksymä 1.10.2026; Linnanrakentajan CC0-kerrokset ja maskit): lähialueella
// (_SplatAlue = minX, minZ, 1/leveys, 1/syvyys) ilmakuva antaa makrosävyn ja maski valitsee kerrokset:
//   väri = makro · Σ wᵢ · diffᵢ(xz / toistoᵢ) / keskiᵢ          (sama kaava kuin Linnanrakentajan Blender-välikuvassa)
// ja detalji häipyy puhtaaseen makroon _SplatParam.y (lahi_m) … 1,5 · lahi_m. Normaalit (huippu): kerrosnormaali
// kallistaa mesh-normaalia ja ero valon kulmassa muuttaa kirkkautta kuten kuoren detaljissa. _SplatParam.x = kerroksia
// (0 = pelkkä makro, 4 = normaali, 6 = huippu), .z = normaalit päällä (0/1), .w = normaalin voimakkuus.
Shader "Matkakirja/Linssit/DioraamaMaasto"
{
    Properties
    {
        _Kuva ("Ortokuva", 2D) = "grey" {}
        _Kirkkaus ("Kirkkaus", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "Queue" = "Geometry" "RenderPipeline" = "UniversalPipeline" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            ZWrite On
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu;
            float4 _DioraamaValo;
            TEXTURE2D(_Kuva); SAMPLER(sampler_Kuva);
            TEXTURE2D(_SplatMaski0); TEXTURE2D(_SplatMaski1); SAMPLER(sampler_SplatMaski0);
            TEXTURE2D(_SplatDiff0); TEXTURE2D(_SplatDiff1); TEXTURE2D(_SplatDiff2);
            TEXTURE2D(_SplatDiff3); TEXTURE2D(_SplatDiff4); TEXTURE2D(_SplatDiff5);
            TEXTURE2D(_SplatNor0); TEXTURE2D(_SplatNor1); TEXTURE2D(_SplatNor2);
            TEXTURE2D(_SplatNor3); TEXTURE2D(_SplatNor4); TEXTURE2D(_SplatNor5);
            SAMPLER(sampler_linear_repeat);

            CBUFFER_START(UnityPerMaterial)
                float4 _Kuva_ST;
                half _Kirkkaus;
                float4 _SplatAlue;       // minX, minZ, 1/leveys, 1/syvyys
                float4 _SplatParam;      // kerroksia, lahi_m, normaalit, normaalin voimakkuus
                float4 _SplatToisto0;    // 1/toisto kerroksille 0–3
                float4 _SplatToisto1;    // 1/toisto kerroksille 4–5
                float4 _SplatKeski0;     // 1/keskikirkkaus kerroksille 0–3
                float4 _SplatKeski1;     // 1/keskikirkkaus kerroksille 4–5
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikkaH : SV_POSITION; float2 uv : TEXCOORD0; float3 paikkaW : TEXCOORD1; float3 normaaliW : TEXCOORD2; };

            Vali vert(Syote v)
            {
                Vali o;
                o.paikkaW = TransformObjectToWorld(v.paikka.xyz);
                o.paikkaH = TransformWorldToHClip(o.paikkaW);
                o.normaaliW = TransformObjectToWorldNormal(v.normaali);
                o.uv = v.uv;
                return o;
            }

            // Yksi kerros: paino, diffuusi (keskikirkkaudella jaettuna) ja normaalin xz-poikkeama.
            void Kerros(inout half3 summa, inout float2 nd, half w, TEXTURE2D_PARAM(diff, s), TEXTURE2D(nor), float2 xz, float toisto, half keski, bool normaalit)
            {
                if (w < 0.02h) return;
                float2 uv = xz * toisto;
                summa += w * SAMPLE_TEXTURE2D(diff, s, uv).rgb * keski;
                if (normaalit) nd += w * (SAMPLE_TEXTURE2D(nor, s, uv).xy * 2 - 1);
            }

            half4 frag(Vali i) : SV_Target
            {
                half3 makro = SAMPLE_TEXTURE2D(_Kuva, sampler_Kuva, i.uv).rgb * _Kirkkaus;
                half3 vari = makro;
                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                int kerroksia = (int)_SplatParam.x;
                if (kerroksia > 0)
                {
                    float2 muv = (i.paikkaW.xz - _SplatAlue.xy) * _SplatAlue.zw;
                    half hivutus = (half)(1 - saturate((etaisyys - _SplatParam.y) / max(1.0, _SplatParam.y * 0.5)));
                    if (all(muv >= 0) && all(muv <= 1) && hivutus > 0.01h)
                    {
                        half4 m0 = SAMPLE_TEXTURE2D(_SplatMaski0, sampler_SplatMaski0, muv);
                        half4 m1 = kerroksia > 4 ? SAMPLE_TEXTURE2D(_SplatMaski1, sampler_SplatMaski0, muv) : half4(0, 0, 0, 0);
                        half paino = dot(m0, 1) + dot(m1.xy, 1);
                        bool normaalit = _SplatParam.z > 0.5;
                        half3 summa = 0; float2 nd = 0;
                        float2 xz = i.paikkaW.xz;
                        Kerros(summa, nd, m0.r, TEXTURE2D_ARGS(_SplatDiff0, sampler_linear_repeat), _SplatNor0, xz, _SplatToisto0.x, (half)_SplatKeski0.x, normaalit);
                        Kerros(summa, nd, m0.g, TEXTURE2D_ARGS(_SplatDiff1, sampler_linear_repeat), _SplatNor1, xz, _SplatToisto0.y, (half)_SplatKeski0.y, normaalit);
                        Kerros(summa, nd, m0.b, TEXTURE2D_ARGS(_SplatDiff2, sampler_linear_repeat), _SplatNor2, xz, _SplatToisto0.z, (half)_SplatKeski0.z, normaalit);
                        Kerros(summa, nd, m0.a, TEXTURE2D_ARGS(_SplatDiff3, sampler_linear_repeat), _SplatNor3, xz, _SplatToisto0.w, (half)_SplatKeski0.w, normaalit);
                        if (kerroksia > 4)
                        {
                            Kerros(summa, nd, m1.r, TEXTURE2D_ARGS(_SplatDiff4, sampler_linear_repeat), _SplatNor4, xz, _SplatToisto1.x, (half)_SplatKeski1.x, normaalit);
                            Kerros(summa, nd, m1.g, TEXTURE2D_ARGS(_SplatDiff5, sampler_linear_repeat), _SplatNor5, xz, _SplatToisto1.y, (half)_SplatKeski1.y, normaalit);
                        }
                        if (paino > 0.05h)
                        {
                            half3 detalji = makro * summa / paino;
                            if (normaalit)
                            {
                                float3 n = normalize(i.normaaliW);
                                float3 L = normalize(_DioraamaValo.xyz);
                                float3 n2 = normalize(n + float3(nd.x, 0, nd.y) / max(paino, 1e-3) * _SplatParam.w);
                                detalji *= (half)saturate(1 + (dot(n2, L) - dot(n, L)));
                            }
                            vari = lerp(makro, detalji, hivutus * saturate(paino));
                        }
                    }
                }
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                return half4(lerp(vari, _DioraamaSumuVari.rgb, sumu), 1);
            }
            ENDHLSL
        }
    }
}
