// Malli (elävät elementit, omistaja 26.9.2026: niukka ja elävä, löydöksen 160 kaiverrustyyli): proseduraalinen
// low-poly-malli kärkiväreillä (ei tekstuuria). Valaistus on pehmeä: päävalo (Aurinko) kiedottuna (wrap 0,4) ja tasainen
// ympäristö, jotta malli erottuu kartasta kuin kaiverrus eikä kiiltävänä 3D-esineenä. Kärkivärit ovat sRGB:tä
// (paletti #c8b898 …), ja ne muunnetaan lineaarisiksi. Horisonttiusva (153/159) häivyttää alfan.
// ZWrite On ja ZTest LEqual: malli peittää itsensä oikein ja jää maaston taakse; Cull Off, koska siivet ovat tasoja.
Shader "Matkakirja/Linssit/Malli"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 1
        _Ymparisto("Ympäristövalo", Range(0, 1)) = 0.58
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent+11" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite On
            ZTest LEqual
            Cull Off

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"

            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                half _Ymparisto;
            CBUFFER_END

            struct Syote { float4 paikka : POSITION; float3 normaali : NORMAL; half4 vari : COLOR; };
            struct Vali { float4 paikka : SV_POSITION; float3 normaaliW : TEXCOORD0; half4 vari : COLOR; float usvaY : TEXCOORD1; };

            Vali vert(Syote i)
            {
                Vali o;
                o.paikka = TransformObjectToHClip(i.paikka.xyz);
                o.normaaliW = TransformObjectToWorldNormal(i.normaali);
                half4 v = i.vari;
            #if !defined(UNITY_COLORSPACE_GAMMA)
                v.rgb = SRGBToLinear(v.rgb);
            #endif
                o.vari = v;
                o.usvaY = UsvaYlhaalta(o.paikka);
                return o;
            }

            half4 frag(Vali i, bool edessa : SV_IsFrontFace) : SV_Target
            {
                float3 n = normalize(i.normaaliW) * (edessa ? 1 : -1);
                Light valo = GetMainLight();
                half kiedottu = saturate((dot(n, valo.direction) + 0.4h) / 1.4h);
                half3 vari = i.vari.rgb * (_Ymparisto + (1 - _Ymparisto) * kiedottu);
                return half4(vari, i.vari.a * _Peitto * UsvaNakyvyys(i.usvaY));
            }
            ENDHLSL
        }
    }
}
