// Lippuaalto (Kartta/Liput.cs, löydös 144): lipun arvokas aaltoilu Graphics.Blitillä pieneen RT:hen, jonka UI Toolkit
// näyttää taustakuvana. Resources-kansiossa, koska materiaali luodaan ajossa (Resources.Load).
//
// BLIT-VARJOSTIN: Graphics.Blit piirtää nelikulmion (0–1) ja asettaa _MainTex = lähde; kärki muunnetaan
// TransformObjectToHClip-kutsulla (Blitin ortomatriisit, alustan y-käännös mukana), joten uv on kohteen uv eikä
// SV_VertexID-kolmiota tarvita. ZTest Always, Cull Off, ZWrite Off, Blend Off: jokainen RT:n pikseli kirjoitetaan
// (myös läpinäkyvä marginaali), joten tyhjennystä ei tarvita.
//
// KÄÄNTEINEN KUVAUS: pikselistä (x, y) lasketaan lipun koordinaatit ilman aaltoa (p = (uv − Reuna) / (1 − 2 · Reuna))
// ja siirretään pystysuunnassa aallon verran (q.y = p.y − siirtymä). Siirtymä riippuu vain u:sta (ja hieman p.y:stä
// aaltorintaman vinouden takia), joten käänteinen kuvaus on suora eikä vaadi iterointia. Vasen reuna (u = 0, tanko)
// ei liiku: siirtymän verho on u · (0,5 + 0,5 · u).
//
// ARVOKAS, EI LEPATUSTA: kaksi päällekkäistä siniaaltoa, jaksot 3,0 ja 3,7 s, 1,15 ja 0,62 aaltoa lipun leveydellä,
// painot 0,62 ja 0,38 (summa 1, joten |siirtymä| ≤ AMPLITUDI = 4 % lipun korkeudesta; marginaali 4 % riittää).
// Varjostus kankaan kaltevuudesta (aallon derivaatta u:n suhteen, normitettu −1…1) ±7 %.
//
// REUNA: peitto lasketaan etäisyydestä lipun reunaan pikseleinä (_Koko), puolen pikselin pehmennys, joten reuna on
// sileä ilman MSAA:ta. Näyte puristetaan puolen tekselin päähän reunasta (lähteen wrapMode voi olla Repeat), joten
// läpinäkyvien pikselien väri on lipun reunaväri: tavallinen alfa ilman tummaa reunusta bilineaarisessa suodatuksessa.
// Gradientit (SAMPLE_TEXTURE2D_GRAD) puristamattomasta q:sta, jotta mip-taso ei hyppää reunassa.
// Voima 0 = suora lippu täsmälleen alkuperäisin värein (Joutosyke asettunut).
Shader "Matkakirja/Lippuaalto"
{
    Properties
    {
        _MainTex("Lippu", 2D) = "white" {}
        _Aika("Aika (s)", Float) = 0
        _Voima("Voima 0–1", Float) = 1
        _Reuna("Marginaali (osuus joka reunalla)", Float) = 0.04
        _Koko("RT (px): leveys, korkeus, 1/leveys, 1/korkeus", Vector) = (64, 40, 0.015625, 0.025)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" "PreviewType" = "Plane" }
        Pass
        {
            Name "Lippuaalto"
            ZTest Always
            Cull Off
            ZWrite Off
            Blend Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);
            CBUFFER_START(UnityPerMaterial)
                float4 _MainTex_TexelSize;
                float _Aika;
                float _Voima;
                float _Reuna;
                float4 _Koko;
            CBUFFER_END

            // Aallot: paino A, aaltoja lipun leveydellä K, jakso T (s), alkuvaihe V (rad).
            static const float AALTO1_A = 0.62, AALTO1_K = 1.15, AALTO1_T = 3.0, AALTO1_V = 0.0;
            static const float AALTO2_A = 0.38, AALTO2_K = 0.62, AALTO2_T = 3.7, AALTO2_V = 1.7;
            // Aaltorintaman vinous (aaltoja lipun korkeudella): aallot kulkevat hieman viistoon kuten kankaassa.
            static const float VINOUS = 0.18;
            // Suurin siirtymä oikeassa reunassa lipun korkeuksina ja varjostuksen voimakkuus.
            static const float AMPLITUDI = 0.04;
            static const float VARJO = 0.07;
            static const float TAYSKULMA = 6.28318530718;

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.uv = i.uv;
                return o;
            }

            half4 frag(Vali i) : SV_Target
            {
                float leveys = 1.0 - 2.0 * _Reuna;
                float2 p = (i.uv - _Reuna) / leveys;          // lipun koordinaatit ilman aaltoa (0–1 lipun sisällä)
                float u = p.x;
                float uu = saturate(u);
                float voima = saturate(_Voima);

                float th1 = TAYSKULMA * (AALTO1_K * u - _Aika / AALTO1_T + VINOUS * p.y) + AALTO1_V;
                float th2 = TAYSKULMA * (AALTO2_K * u - _Aika / AALTO2_T - 0.5 * VINOUS * p.y) + AALTO2_V;
                float aalto = AALTO1_A * sin(th1) + AALTO2_A * sin(th2);                                 // −1…1
                float kaltevuus = (AALTO1_A * AALTO1_K * cos(th1) + AALTO2_A * AALTO2_K * cos(th2))
                                / (AALTO1_A * AALTO1_K + AALTO2_A * AALTO2_K);                 // −1…1

                // Siirtymä kasvaa tangosta: verho 0 vasemmassa reunassa, 1 oikeassa.
                float verho = uu * (0.5 + 0.5 * uu);
                float2 q = float2(u, p.y - AMPLITUDI * verho * aalto * voima);

                // Peitto: etäisyys lähimpään lipun reunaan pikseleinä, puolen pikselin pehmennys.
                float2 px = _Koko.xy * leveys;
                float2 etaisyys = min(q, 1.0 - q) * px;
                float peitto = saturate(etaisyys.x + 0.5) * saturate(etaisyys.y + 0.5);

                float2 puoli = 0.5 * _MainTex_TexelSize.xy;
                float2 nayte = clamp(q, puoli, 1.0 - puoli);
                half4 c = SAMPLE_TEXTURE2D_GRAD(_MainTex, sampler_MainTex, nayte, ddx(q), ddy(q));

                // Laskos: kaltevuus vaalentaa ja tummentaa ±VARJO, tangon vieressä vähemmän (kangas kiinni tangossa).
                float varjo = 1.0 - VARJO * voima * saturate(uu * 3.0) * kaltevuus;
                c.rgb = (half3)saturate(c.rgb * varjo);
                c.a *= (half)peitto;
                return c;
            }
            ENDHLSL
        }
    }
    Fallback Off
}
