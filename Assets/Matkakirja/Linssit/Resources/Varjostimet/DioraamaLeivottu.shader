// Dioraaman LEIVOTTU pinta (Olavinlinna uudella tavalla, Siirtoseppä 29.9.2026; työnjako Linnanrakentajan kanssa):
// Blenderin Cyclesillä leivottu valoatlas (albedo × valo, AO, kuluma yhdessä kuvassa) tilan glb:n UV1:llä.
// Valaisematon: valo on jo kuvassa, joten reaaliaikaisia valoja tai varjoja ei lasketa (iPhonella halpa).
//
// Väri = atlas(uv1).rgb · _Kirkkaus · (1 + Σ lepatus_i · lähellä_i · lämmin)  → sumu kuten DioraamaMaalattu
//   lähellä_i  (1 − d / säde)², liekkipiste i (_DioraamaLiekkiPisteet[i].xyz maailmassa, .w = säde metreinä)
//   lepatus_i  kaksi eritahtista siniaaltoa pisteen indeksistä (ei kahta samaan tahtiin lepattavaa tulisijaa)
//              kertaa globaali _DioraamaLepatus (DioraamaNayttamo: 0,85…1, vähennetty liike → 1 eikä aaltoa)
//   lämmin     (1, 0,62, 0,30): tulen sävy; huippu nostaa värin hieman yli 1:n, jolloin Bloom (kynnys 1,2) tarttuu
//              vain aivan liekin viereen.
// Liekkipisteet asettaa DioraamaLeivotutValot (Shader.SetGlobalVectorArray, aina 8 alkiota) tilan
// liekki:-tyhjistä. Ennen atlaksen latausta pinta on harmaa (_ValoAtlas "grey"), ei musta.
// SRP Batcher -yhteensopiva (CBUFFER UnityPerMaterial, TEXTURE2D/SAMPLER-makrot).
// LIPUT (tunnelma): _Heilunta > 0 (pinta "lippu", DioraamaRakennus antaa oman materiaalin) taivuttaa kärkiä normaalin
// suuntaan: siirto = sin(2,8 t + 5 u + x) · 0,12 m · u² · _Heilunta, u = UV0.x (0 tangolla, 1 kärjessä).
Shader "Matkakirja/Linssit/DioraamaLeivottu"
{
    Properties
    {
        _ValoAtlas ("Leivottu valoatlas (UV1)", 2D) = "grey" {}
        _Kirkkaus ("Kirkkaus", Float) = 1
        _Heilunta ("Lipun heilunta", Float) = 0
        _Leikattava ("Kuoren leikkaus koskee tätä", Float) = 0
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

            half _DioraamaLepatus;
            half4 _DioraamaSumuVari;
            float4 _DioraamaSumu; // x = alku (m), y = loppu (m)
            float4 _DioraamaLiekkiPisteet[8];
            float _DioraamaLiekkiMaara;
            // Historiamoottori E3 (Siirtoseppä 7.10.): pelaajan kantokynttilä leivotussa tilassa (xyz paikka, w säde; w = 0 → pois)
            // ja sen väri (rgb) · voimakkuus (a). Oletus nolla: ei vaikutusta esittelyyn.
            float4 _DioraamaKantoValo;
            float4 _DioraamaKantoVari;

            TEXTURE2D(_ValoAtlas); SAMPLER(sampler_ValoAtlas);

            CBUFFER_START(UnityPerMaterial)
                float4 _ValoAtlas_ST;
                half _Kirkkaus;
                float _Heilunta;
                float _Leikattava;
            CBUFFER_END

            // Sama leikkaustilavuus kuin DioraamaKuori.shaderissa (globaalit DioraamaUlkokuori.PaivitaLeikkaus): tilat, joita
            // ei kohdisteta (tunnelma: lyhtytolpat, soihtutelineet), hylätään leikkauskäytävästä kuten kuori (1.0.57 E8:
            // pihan lyhtytolppa jäi kellumaan keittiön eteen).
            float4 _DioraamaLeikkausMin, _DioraamaLeikkausMax, _DioraamaLeikkausKamera;
            bool Leikkauksessa(float3 p)
            {
                float3 lo = _DioraamaLeikkausMin.xyz, hi = _DioraamaLeikkausMax.xyz;
                if (p.y < lo.y) return false;
                if (p.y <= hi.y && all(p.xz >= lo.xz) && all(p.xz <= hi.xz)) return true;
                if (_DioraamaLeikkausMax.w < 0.5) return false;
                float2 keski = (lo.xz + hi.xz) * 0.5;
                float2 kohti = _DioraamaLeikkausKamera.xz - keski;
                float L = length(kohti);
                if (L < 1e-3) return false;
                float2 d = -kohti / L;
                float2 inv = 1.0 / ((step(0.0, d) * 2.0 - 1.0) * max(abs(d), 1e-5));
                float2 t0 = (lo.xz - p.xz) * inv, t1 = (hi.xz - p.xz) * inv;
                float2 tmin = min(t0, t1), tmax = max(t0, t1);
                float sisaan = max(tmin.x, tmin.y), ulos = min(tmax.x, tmax.y);
                // Katto nousee kameraa kohti (1.0.59 V10: pystykamera 19° / 28 m oli laatikon yläpuolella, ja kuori
                // laatikon yläreunan ja kameran välissä peitti tilan). Katto = yläreuna + (kamera.y − yläreuna) · s / Lreuna,
                // s = p:n matka laatikkoon, Lreuna = kameran matka laatikon reunaan (alakanttiin: L − puolilävistäjä).
                float Lreuna = max(L - 0.5 * length(hi.xz - lo.xz), 1.0);
                float katto = hi.y + max(0.0, _DioraamaLeikkausKamera.y - hi.y) * saturate(max(sisaan, 0.0) / Lreuna);
                return sisaan <= ulos && ulos >= 0 && sisaan <= L && p.y <= katto;
            }

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; float2 uv0 : TEXCOORD0; float2 uv1 : TEXCOORD1; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv1 : TEXCOORD0; float3 paikkaW : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                float3 maailma = TransformObjectToWorld(i.paikka.xyz);
                if (_Heilunta > 0)
                {
                    float u = saturate(i.uv0.x);
                    float3 n = normalize(TransformObjectToWorldNormal(i.normaali));
                    maailma += n * sin(_Time.y * 2.8 + u * 5.0 + maailma.x) * 0.12 * u * u * _Heilunta;
                }
                o.paikka = TransformWorldToHClip(maailma);
                o.paikkaW = maailma;
                o.uv1 = i.uv1;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                if (_Leikattava > 0.5 && _DioraamaLeikkausMin.w > 0.001 && Leikkauksessa(i.paikkaW)) discard;
                half3 vari = SAMPLE_TEXTURE2D(_ValoAtlas, sampler_ValoAtlas, i.uv1).rgb * _Kirkkaus;

                half lisa = 0;
                int maara = (int)min(_DioraamaLiekkiMaara, 8.0);
                float t = _Time.y;
                for (int k = 0; k < 8; k++)
                {
                    if (k >= maara) break;
                    float4 p = _DioraamaLiekkiPisteet[k];
                    float lahella = saturate(1.0 - distance(i.paikkaW, p.xyz) / max(p.w, 1e-3));
                    lahella *= lahella;
                    float aalto = 0.5 + 0.5 * sin(t * (7.3 + k * 1.7) + k * 2.1) * sin(t * (3.1 + k * 0.9) + k);
                    lisa += (half)(lahella * (0.08 + 0.22 * aalto));
                }
                // Vähennetty liike: _DioraamaLepatus = 1 tasaisena → lepatus jää pieneksi vakiolämmöksi.
                vari += vari * lisa * _DioraamaLepatus * half3(1.0h, 0.62h, 0.30h);
                if (_DioraamaKantoValo.w > 0.01)
                {
                    // Atlaksen perusväri (leivottu valo täysillä) skaalattuna kynttilän etäisyydellä: tumma huone valaistuu lähellä.
                    half3 pohja = SAMPLE_TEXTURE2D(_ValoAtlas, sampler_ValoAtlas, i.uv1).rgb;
                    float kv = saturate(1.0 - distance(i.paikkaW, _DioraamaKantoValo.xyz) / _DioraamaKantoValo.w);
                    kv *= kv;
                    vari += pohja * (half)(kv * _DioraamaKantoVari.a) * (half3)_DioraamaKantoVari.rgb;
                }

                float etaisyys = length(_WorldSpaceCameraPos - i.paikkaW);
                half sumu = (half)saturate((etaisyys - _DioraamaSumu.x) / max(1e-3, _DioraamaSumu.y - _DioraamaSumu.x));
                vari = lerp(vari, _DioraamaSumuVari.rgb, sumu);
                return half4(vari, 1);
            }
            ENDHLSL
        }
    }
}
