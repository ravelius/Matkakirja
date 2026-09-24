// Radioaaltorenkaat (radiouudistus build 12, Kartta/RadioMastot.cs; suunnitelma luku 5): kaikki renkaat yhdellä
// piirtokutsulla. Verkko on napakoordinaattiruudukko (u = säteen osuus 0…1, v = kiertokulma 0…1), jonka kärkivaihe
// taivuttaa pallokalotiksi valitun maston ympärille 2 km pinnan yläpuolelle, joten 900 km:n rengas kaartuu pallon
// mukana. Fragmentti laskee kulmaetäisyyden keskuksesta maailmanpisteestä ja piirtää jokaisen renkaan:
//   viiva 2 pt #ff7a4a, hehku 6 pt peitolla 0,18, renkaan alfa Mastot.RenkaanAlfa (0,55) × (1 − osuus)
// Uniformit (MaterialPropertyBlock):
//   _Keskus   maan keskipiste (maailma);  _Pohja, _Ita, _Pohjoinen  keskuksen normaali ja tangentit (maailma)
//   _Mitat    x = kalotin kulmasäde (rad), y = kalotin säde maan keskipisteestä (m), z = pikseliä pisteelle,
//             w = kuuluvuussäteen kulma (rad)
//   _Renkaat0, _Renkaat1  enintään 8 renkaan osuudet 0…1 (< 0 = ei rengasta)
// Horisontin takana (pinnan normaali poispäin kamerasta) ei piirretä; ZTest Always, jottei liioiteltu maasto peitä.
Shader "Matkakirja/Radiorengas"
{
    Properties
    {
        _BaseColor("Väri (#ff7a4a)", Color) = (1, 0.478, 0.29, 1)
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-20" "RenderPipeline" = "UniversalPipeline" }
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
                half4 _BaseColor;
                float4 _Keskus, _Pohja, _Ita, _Pohjoinen, _Mitat, _Renkaat0, _Renkaat1;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                float th = i.uv.x * _Mitat.x, fi = i.uv.y * 6.28318530718;
                float3 suunta = cos(th) * _Pohja.xyz + sin(th) * (cos(fi) * _Ita.xyz + sin(fi) * _Pohjoinen.xyz);
                o.maailma = _Keskus.xyz + suunta * _Mitat.y;
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            half Rengas(float th, float fw, float osuus, float px)
            {
                if (osuus < 0.0) return 0.0;
                float d = abs(th - osuus * _Mitat.w) / fw;               // pikseleinä
                half viiva = saturate(1.0 * px + 0.5 - d);                // 2 pt: puolikas 1 pt
                half hehku = 0.18 * (1.0 - smoothstep(0.0, 3.0 * px, d)); // 6 pt: puolikas 3 pt
                return max(viiva, hehku) * 0.55 * (1.0 - osuus);
            }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.maailma - _Keskus.xyz);
                // Kulmaetäisyys keskuksesta (atan2 on tarkka myös pienillä kulmilla).
                float th = atan2(length(cross(n, _Pohja.xyz)), dot(n, _Pohja.xyz));
                float fw = max(fwidth(th), 1e-9);
                if (dot(n, normalize(_WorldSpaceCameraPos - i.maailma)) < 0.0) discard;
                float px = _Mitat.z;
                half p = 1.0;
                p *= 1.0 - Rengas(th, fw, _Renkaat0.x, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat0.y, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat0.z, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat0.w, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat1.x, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat1.y, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat1.z, px);
                p *= 1.0 - Rengas(th, fw, _Renkaat1.w, px);
                half a = 1.0 - p;
                if (a < 0.002) discard;
                return half4(_BaseColor.rgb * a, a);
            }
            ENDHLSL
        }
    }
}
