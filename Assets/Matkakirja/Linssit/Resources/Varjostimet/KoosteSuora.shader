// KAUPUNKIKOOSTE SUORAKSI ALFAKSI (Linssiseppä 8.10.2026, KaupunkiKooste): koosteen RT on esikerrottu (läpikuultavat piirtyvät
// alfalla One OneMinusSrcAlpha), UI Toolkit piirtää suoralla alfalla → rgb / alfa (ei haloa reunoille).
Shader "Matkakirja/Linssit/KoosteSuora"
{
    Properties { _MainTex ("Kooste", 2D) = "black" {} }
    SubShader
    {
        Tags { "RenderType" = "Opaque" }
        Pass
        {
            ZTest Always ZWrite Off Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            sampler2D _MainTex;
            struct A { float4 p : POSITION; float2 uv : TEXCOORD0; };
            struct V { float4 p : SV_POSITION; float2 uv : TEXCOORD0; };
            V vert(A a) { V v; v.p = UnityObjectToClipPos(a.p); v.uv = a.uv; return v; }
            float4 frag(V v) : SV_Target
            {
                float4 c = tex2D(_MainTex, v.uv);
                c.rgb = c.a > 0.002 ? saturate(c.rgb / c.a) : 0;
                return c;
            }
            ENDHLSL
        }
    }
}
