// Ilmakehän kaari ISS:n kyydissä (omistajan palaute 28.9.2026: "pitäisikö avaruuden musta näkyä paremmin maapallon
// horisontissa, kun siinä nyt näkyy niin paljon sinistä?"). Kaukonäkymän hehku (Ilmakeha, kuori 1,25 R) on webin tyyli
// kaukaa katsottuna; ISS:n korkeudelta kamera on sen sisällä ja koko taivas sinersi. Todellinen näkymä 400 km:stä:
// ohut kirkkaansininen kaari horisontin yllä (valtaosa alimmassa 20–30 km:ssä, häipyy ~80 km:ssä) ja musta avaruus.
//
// Kuori R + 120 km. Jokaiselle näkösäteelle lasketaan analyyttisesti lähin korkeus maan pinnasta (h_min; litistys
// korjattu skaalaamalla napa-akseli pallolle) ja sen mukaan kirkkaus exp(−h/22 km) ja sävy vaaleasta syvään siniseen.
//   Passi 1 (takapinnat): taivas horisontin yllä (säde ohittaa maan).
//   Passi 2 (etupinnat): usva maan päällä, kun säde osuu maahan: kuljettu ilmamatka → hento vaalea usva (horisontin
//   lähellä vahvin, keskellä maata heikko).
// Kaaren kirkkaus seuraa aurinkoa sivuamispisteessä (yöpuolella lähes musta, hämärässä himmeä).
Shader "Matkakirja/Linssit/Ilmakaari"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 0
        _R("Päiväntasaajan säde (m)", Float) = 6378137
        _Litistys("a / b", Float) = 1.0033640898
        _Korkeus("Kuoren korkeus (m)", Float) = 120000
        _Asteikko("Kirkkauden asteikkokorkeus (m)", Float) = 22000
        _Vaalea("Vaalea kaari", Color) = (0.72, 0.88, 1, 1)
        _Syva("Syvä sininen", Color) = (0.12, 0.30, 0.86, 1)
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _Akseli("Napa-akseli (maailma)", Vector) = (0, 1, 0, 0)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
    }
    HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

        CBUFFER_START(UnityPerMaterial)
            half _Peitto;
            float _R, _Litistys, _Korkeus, _Asteikko;
            half4 _Vaalea, _Syva;
            float4 _Keskus, _Akseli, _Aurinko;
        CBUFFER_END

        struct Syote { float4 paikka : POSITION; };
        struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

        Vali vert(Syote i)
        {
            Vali o;
            o.maailma = TransformObjectToWorld(i.paikka.xyz);
            o.paikka = TransformWorldToHClip(o.maailma);
            return o;
        }

        // Litistyksen korjaus: napa-akselin suuntainen komponentti venytetään, jolloin ellipsoidista tulee pallo (säde _R).
        float3 Pallolle(float3 v)
        {
            float3 a = normalize(_Akseli.xyz);
            return v + a * dot(v, a) * (_Litistys - 1.0);
        }

        // Säteen lähin korkeus (m), sivuamispisteen suunta ja etäisyys kamerasta sivuamispisteeseen (pallotilassa).
        void Sade(float3 maailma, out float h, out float3 n, out float t, out float3 o, out float3 d)
        {
            o = Pallolle(_WorldSpaceCameraPos - _Keskus.xyz);
            d = normalize(Pallolle(maailma - _WorldSpaceCameraPos));
            t = -dot(o, d);
            float3 p = t > 0 ? o + d * t : o;
            h = length(p) - _R;
            n = normalize(p);
        }

        half Aurinko(float3 n)
        {
            // Aurinko sivuamispisteessä: päivä 1, hämärä (aurinko −6° … +4°) liukuu, yö 0,06.
            float s = dot(n, normalize(_Aurinko.xyz));
            return (half)lerp(0.06, 1.0, smoothstep(-0.105, 0.07, s));
        }
    ENDHLSL

    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-55" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }

        // Passi 1: kaari horisontin yllä (takapinnat: säde kulkee kuoren läpi ohi maan).
        Pass
        {
            Name "Kaari"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Front

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            half4 frag(Vali i) : SV_Target
            {
                float h, t; float3 n, o, d;
                Sade(i.maailma, h, n, t, o, d);
                if (t <= 0 || h < 0) discard;   // säde poispäin maasta tai osuu maahan (maa piirtää sen)
                half a = (half)exp(-h / _Asteikko);
                half3 vari = lerp(_Syva.rgb, _Vaalea.rgb, (half)exp(-h / 6000.0));
                a *= Aurinko(n);
                return half4(vari, saturate(a * 1.15h) * _Peitto);
            }
            ENDHLSL
        }

        // Passi 2: usva maan päällä (etupinnat, säde osuu maahan): ilmamatka kuoren pinnasta maahan.
        Pass
        {
            Name "Usva"
            Tags { "LightMode" = "SRPDefaultUnlit" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            half4 frag(Vali i) : SV_Target
            {
                float h, t; float3 n, o, d;
                Sade(i.maailma, h, n, t, o, d);
                if (t <= 0 || h >= 0) discard;   // vain säteet, jotka osuvat maahan
                // Etäisyydet kuoren ja maan pintaan säteellä: t ± sqrt(r² − (etäisyys keskipisteestä)²).
                float r2 = dot(o, o) - t * t;
                float maahan = t - sqrt(max(0, _R * _R - r2));
                float kuoreen = t - sqrt(max(0, (_R + _Korkeus) * (_R + _Korkeus) - r2));
                float matka = max(0, maahan - max(0, kuoreen));
                // Pystysuoraan ~120 km → heikko; horisontin suuntaan satoja km → vahvempi (katto 0,42).
                half a = (half)(0.42 * (1.0 - exp(-matka / 900000.0)));
                float3 osuma = normalize(o + d * maahan);
                a *= Aurinko(osuma);
                return half4(_Vaalea.rgb, a * _Peitto);
            }
            ENDHLSL
        }
    }
}
