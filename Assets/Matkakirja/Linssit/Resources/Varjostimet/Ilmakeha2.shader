// FYSIKAALINEN ILMAKEHÄ ISS:n kyytiin (fotorealismi osa 1, Linssiseppä 30.9.2026; omistaja Päätoimittajan kautta: "Miten ISS:n
// maapallonäkymästä saisi vielä fotorealistisemman?"; suunnitelma docs/raportit/iss-fotorealismi-suunnitelma-20260930.md).
// Korvaa Ilmakaaren analyyttisen kaaren ja usvan (A/B `astro kyyti ilmakeha2 0|1`). Malli Hillaire 2020 ("A Scalable and
// Production Ready Sky and Atmosphere Rendering Technique", EGSR) avaruudesta katsottuna: kamera on aina ilmakehän yläpuolella
// (ISS 400 km, yläraja 100 km), joten kuoren etupinnat kattavat jokaisen säteen, joka kulkee ilman läpi, ja säde marssitaan
// pikselissä (Hillaire: avaruusnäkymä ilman sky-view-LUT:ia).
//   Passi 0 "Lapinakyvyys": transmittanssi-LUT 256 × 64 (korkeus √h/H, auringon kulma μ lineaarisesti), 40 askelta ylärajaan;
//     lasketaan kerran (Avaruus.RakennaKaari).
//   Passi 1 "Ilma": säde kuoren ja maan (tai toisen reunan) välillä 16 askelta (maahan osuva) tai 20 (reunan ohi), Rayleigh
//     (β = 5,802 / 13,558 / 33,1 · 10⁻⁶ m⁻¹, H 8 km), Mie (sironta 3,996 · 10⁻⁶, ekstinktio 4,44 · 10⁻⁶, H 1,2 km, g 0,8) ja
//     otsoni (absorptio 0,650 / 1,881 / 0,085 · 10⁻⁶, teltta 25 ± 15 km); auringon valo pisteeseen LUT:sta, sironta
//     energiansäilyttävästi ((S − S e^(−σΔ)) / σ, Hillaire), monisironta isotrooppisena lisänä (_Moni). Tulos: sironnut valo
//     (rgb, lisätään) ja keskimääräinen transmittanssi (alfa: maa ja tähdet himmenevät 1 − T). Värillinen ekstinktio olisi
//     kaksilähdesekoitusta; avaruudesta T on maan päällä lähes harmaa, joten keskiarvo riittää (punerrus tulee sironnasta).
//   Yöllä ohut vihreä ilmahehku 95 km:ssä kuten Ilmakaaressa (_Hehku). Jono Transparent-38: pilvien (−50) ja yökuoren (−40) päälle,
//   jolloin usva peittää myös pilvet, kiillon ja kaupunkien valot (Ilmakaari oli −55, pilvien alla); revontulet (−36) ovat
//   ilmakehän yläpuolella ja piirtyvät sen jälkeen.
Shader "Matkakirja/Linssit/Ilmakeha2"
{
    Properties
    {
        _Peitto("Peitto", Range(0, 1)) = 0
        _R("Päiväntasaajan säde (m)", Float) = 6378137
        _Litistys("a / b", Float) = 1.0033640898
        _Ylaraja("Ilmakehän yläraja (m)", Float) = 100000
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _Akseli("Napa-akseli (maailma)", Vector) = (0, 1, 0, 0)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Voima("Auringon valaistus (HDR)", Float) = 4.5
        _Moni("Monisironnan osuus", Float) = 0.25
        _MieG("Mie g", Float) = 0.8
        _Hehku("Ilmahehku", Float) = 0.12
        _KaariVoima("Horisontin kaaren kerroin (kuvaputki, 1 = ennallaan)", Float) = 1
        _HrKerroin("Rayleighin skaalakorkeuden kerroin näkymän säteelle (kuvaputki, 1 = ennallaan)", Float) = 1
        _SiniKerroin("Rayleigh-sironnan sinisyys (kuvaputki, 1 = ennallaan)", Float) = 1
        _UtuKerroin("Maan ilmaperspektiivi horisonttia kohti (kuvaputki, 1 = ennallaan)", Float) = 1
        _KaariYdin("Kaaren ytimen (0–5 km) ja maan reunan kerroin suhteessa kaarivoimaan (kuvaputki, kun _KaariSyva > 0)", Float) = 1
        _KaariSyva("Syvänsininen hehku ytimen yllä 5–45 km; > 0 ottaa kaaren muodon käyttöön (kuvaputki, 0 = pois)", Float) = 0
        _HehkuVari("Ilmahehkun sävy", Color) = (0.62, 0.9, 0.42, 1)
        _Lapinakyvyys("Transmittanssi-LUT", 2D) = "white" {}
        _Debug("Vianetsintä (0 = pois, 1 = T, 2 = matka/tulo, 3 = LUT)", Float) = 0
    }
    HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

        CBUFFER_START(UnityPerMaterial)
            float _Peitto, _R, _Litistys, _Ylaraja, _Voima, _Moni, _MieG, _Hehku, _Debug, _KaariVoima, _HrKerroin, _SiniKerroin, _UtuKerroin, _KaariYdin, _KaariSyva;
            float4 _Keskus, _Akseli, _Aurinko, _HehkuVari;
        CBUFFER_END
        TEXTURE2D(_Lapinakyvyys); SAMPLER(sampler_Lapinakyvyys);

        static const float3 BetaR = float3(5.802e-6, 13.558e-6, 33.1e-6);
        static const float BetaMs = 3.996e-6, BetaMe = 4.40e-6;
        static const float3 BetaO = float3(0.650e-6, 1.881e-6, 0.085e-6);
        static const float HR = 8000.0, HM = 1200.0;

        // Tiheydet korkeudella h (m): Rayleigh, Mie, otsoni (teltta 25 km ± 15 km).
        float3 Tiheys(float h)
        {
            return float3(exp(-h / HR), exp(-h / HM), max(0.0, 1.0 - abs(h - 25000.0) / 15000.0));
        }
        float3 Ekstinktio(float3 t) { return BetaR * t.x + BetaMe * t.y + BetaO * t.z; }

        // Säteen ja pallon (säde r, keskipiste origo) leikkaukset; false = ohi.
        bool Leikkaa(float3 o, float3 d, float r, out float t0, out float t1)
        {
            float b = dot(o, d), c = dot(o, o) - r * r, q = b * b - c;
            t0 = t1 = 0;
            if (q < 0) return false;
            q = sqrt(q);
            t0 = -b - q; t1 = -b + q;
            return true;
        }

        // LUT: uv.x = (μ + 1) / 2, uv.y = √(h / H).
        float2 LutUv(float h, float mu) { return float2(saturate(mu * 0.5 + 0.5), sqrt(saturate(h / _Ylaraja))); }
        float3 AurinkoPisteeseen(float h, float mu)
        {
            return SAMPLE_TEXTURE2D_LOD(_Lapinakyvyys, sampler_Lapinakyvyys, LutUv(h, mu), 0).rgb;
        }

        // Litistyksen korjaus: napa-akselin suuntainen komponentti venytetään, jolloin ellipsoidista tulee pallo (säde _R).
        float3 Pallolle(float3 v)
        {
            float3 a = normalize(_Akseli.xyz);
            return v + a * dot(v, a) * (_Litistys - 1.0);
        }
    ENDHLSL

    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-38" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }

        // Passi 0: transmittanssi-LUT (Graphics.Blit kerran).
        Pass
        {
            Name "Lapinakyvyys"
            // Oma LightMode, jota URP ei piirrä (laite 30.9.: ilman tagia passi oli SRPDefaultUnlit, ja URP piirsi sen kuoren
            // päälle joka ruutu ZTest Always -läpinäkymättömänä → maa katosi ja vain sironta näkyi). Graphics.Blit(…, 0) ajaa sen silti.
            Tags { "LightMode" = "IlmaLut" }
            ZTest Always ZWrite Off Cull Off Blend Off
            HLSLPROGRAM
            #pragma vertex vertLut
            #pragma fragment fragLut
            struct SyoteL { float4 paikka : POSITION; float2 uv : TEXCOORD0; };
            struct ValiL { float4 paikka : SV_POSITION; float2 uv : TEXCOORD0; };
            ValiL vertLut(SyoteL i) { ValiL o; o.paikka = TransformObjectToHClip(i.paikka.xyz); o.uv = i.uv; return o; }
            float4 fragLut(ValiL i) : SV_Target
            {
                float mu = i.uv.x * 2.0 - 1.0;
                float h = i.uv.y * i.uv.y * _Ylaraja;
                float r = _R + h;
                float3 o = float3(0, r, 0), d = float3(sqrt(saturate(1.0 - mu * mu)), mu, 0);
                float g0, g1, t0, t1;
                // Aurinko maan takana: ei suoraa valoa.
                if (Leikkaa(o, d, _R, g0, g1) && g0 > 0) return float4(0, 0, 0, 1);
                Leikkaa(o, d, _R + _Ylaraja, t0, t1);
                float pituus = max(0, t1);
                float3 syvyys = 0;
                const int N = 40;
                float ds = pituus / N;
                for (int k = 0; k < N; k++)
                {
                    float3 p = o + d * ((k + 0.5) * ds);
                    syvyys += Ekstinktio(Tiheys(length(p) - _R)) * ds;
                }
                return float4(exp(-syvyys), 1);
            }
            ENDHLSL
        }

        // Passi 1: sironta ja transmittanssi kuoren etupinnoilta (kamera ilmakehän yläpuolella).
        Pass
        {
            Name "Ilma"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            float4 frag(Vali i) : SV_Target
            {
                float3 o = Pallolle(_WorldSpaceCameraPos - _Keskus.xyz);
                float3 d = normalize(Pallolle(i.maailma - _WorldSpaceCameraPos));
                float3 s = normalize(_Aurinko.xyz);
                float t0, t1, g0, g1;
                // Verkko on 120 km:ssä (Avaruus.KaarenKorkeus): sironta 100 km:n kuoressa, ilmahehkun helma sen yläpuolella
                // (Linssiseppä 2:n iltakuvat 1.10.: hylkäys 100 km:ssä katkaisi helman terävästi harmaaksi kuoreksi).
                if (!Leikkaa(o, d, _R + 120000.0, t0, t1) || t1 <= 0) discard;
                float a0 = 0, a1 = 0;
                bool ilmassa = Leikkaa(o, d, _R + _Ylaraja, a0, a1) && a1 > 0;
                bool maa = Leikkaa(o, d, _R, g0, g1) && g0 > 0;
                float alku = max(0, a0), loppu = maa ? g0 : a1;
                int N = !ilmassa ? 0 : maa ? 16 : 20;
                float ds = (loppu - alku) / max(N, 1);

                float c = dot(d, s);
                float pr = 3.0 / (16.0 * PI) * (1.0 + c * c);
                float g = _MieG, g2 = g * g;
                float pm = 3.0 / (8.0 * PI) * (1.0 - g2) * (1.0 + c * c) / ((2.0 + g2) * pow(max(1e-4, 1.0 + g2 - 2.0 * g * c), 1.5));

                float3 T = 1, L = 0;
                [loop] for (int k = 0; k < N; k++)
                {
                    float3 p = o + d * (alku + (k + 0.5) * ds);
                    float r = length(p);
                    float h = r - _R;
                    float3 tih = Tiheys(h);
                    // KUVAPUTKEN KAARI (Linssiseppä 2 / omistaja 1.10. 19.5x: "yhtä sininen ja voimakas kaari kuin Cupola-mallikuvassa"):
                    // paksumpi Rayleigh-kerros näkymän säteelle (HR · k; auringon läpinäkyvyys-LUT ennallaan) ja syvempi sininen
                    // sironnassa (punainen / √k, sininen · k; ekstinktio ennallaan, jottei kaari tummu). 1 = ennallaan.
                    tih.x = exp(-h / (HR * _HrKerroin));
                    float3 sigmaT = Ekstinktio(tih);
                    float3 sR = BetaR * float3(rsqrt(max(_SiniKerroin, 0.05)), 1.0, _SiniKerroin) * tih.x, sM = BetaMs * tih.y;
                    float mus = dot(p / r, s);
                    float3 aurinko = AurinkoPisteeseen(h, mus);
                    // Monisironta (Hillaire ψ_ms karkeasti): isotrooppinen osuus auringon valosta, hämärässä himmenee.
                    float3 moni = (sR + sM) * _Moni * (aurinko * 0.7 + 0.3 * saturate(mus * 4.0 + 0.4)) / (4.0 * PI);
                    float3 S = (sR * pr + sM * pm) * aurinko + moni;
                    float3 askelT = exp(-sigmaT * ds);
                    L += T * (S - S * askelT) / max(sigmaT, 1e-12);
                    T *= askelT;
                }
                L *= _Voima;
                // Ilmaperspektiivi (kuvaputki): maahan osuvan säteen sironta voimistuu loivassa kulmassa, jolloin maa sinertyy
                // horisonttia kohti; kohtisuoraan alas ennallaan.
                // Päätoimittaja 1.10. 20.3x (omistajan Cupola-mallikuva): maa ja meri syvän kylläisen sinisiä, ei maitomaisia, ja
                // valkoiset pysyvät valkoisina → lisäsironta on lähes puhdasta sinistä (punainen 0,15, vihreä 0,5): tummat pinnat
                // ja varjot sinertyvät, mutta kirkkaat pilvet ovat jo lähellä valkoista eivätkä harmaannu.
                if (maa && _UtuKerroin != 1.0)
                {
                    float kulma = saturate(-dot(d, normalize(o + d * g0)));
                    float lisa = (_UtuKerroin - 1.0) * (1.0 - smoothstep(0.0, 0.6, kulma));
                    L += L * lisa * float3(0.15, 0.5, 1.0);
                }

                // Ilmahehku yöllä (95 km, σ 4,5 km) säteen lähimmällä korkeudella, kuten Ilmakaaressa.
                float tl = -dot(o, d);
                float3 lahin = tl > 0 ? o + d * tl : o;
                float hmin = length(lahin) - _R;
                float yo = 1.0 - smoothstep(-0.105, 0.0, dot(normalize(lahin), s));
                // Pehmeä vyö (Päätoimittaja 30.9.: terävä viiva): σ 9 km ja leveämpi heikko helma, kirkkaus vaihtelee hieman
                // sivuamispisteen suunnan mukaan (hitaat aallot, ± 25 %), kuten ISS:n yökuvissa.
                // Kuvaputken kaari (Linssiseppä 1.10., Päätoimittaja: julisteen wau-tekijä): vain maan ohi kulkevat säteet, liuku
                // 0–20 km:n sivuamiskorkeudella, jottei horisonttiin tule saumaa. 1 = ennallaan (livenäkymä).
                L *= lerp(1.0, _KaariVoima, smoothstep(0.0, 20000.0, hmin) * (maa ? 0.0 : 1.0));
                // Kaaren muoto (Päätoimittaja 1.10. 20.3x ja 21.1x, omistajan mallikuva: "ohut, erittäin kirkas sinivalkoinen viiva ja
                // sen yllä kapea syvänsininen hehku, joka häipyy mustaan; siirtymä maahan jatkuva ja kirkas"). Päällä, kun _KaariSyva > 0:
                //  - kerroin ei laske 1:een maan reunaa kohti (yllä oleva liuku 0–20 km jätti tumman violetin vyön ytimen ja maan väliin),
                //    ja maata hipovat säteet (kulma < 0,06) saavat saman kertoimen liukuen → kirkas jatkuva siirtymä maahan;
                //  - ydin 0–~5 km (_KaariYdin), sen punainen vaimenee (pitkän matkan punertuma näkyi violettina);
                //  - 5–45 km sininen voimistuu ja punainen/vihreä vaimenevat, jolloin valkoinen jää ohueksi viivaksi.
                if (_KaariSyva > 0.0)
                {
                    float kulmaM = maa ? saturate(-dot(d, normalize(o + d * g0))) : 0.0;
                    float hs = maa ? 0.0 : hmin;
                    float reuna = maa ? 1.0 - smoothstep(0.0, 0.06, kulmaM) : 0.0;
                    float kerroin = _KaariVoima * _KaariYdin * (maa ? 1.5 : 1.0);
                    float nyt = maa ? 1.0 : lerp(1.0, _KaariVoima, smoothstep(0.0, 20000.0, hmin));
                    float ydin = 1.0 - smoothstep(3000.0, 6000.0, hs);
                    // korvaa yllä tehdyn liukuvan kertoimen: ytimessä ja maata hipovissa kerroin, muualla ennallaan
                    float tavoite = maa ? lerp(1.0, kerroin, reuna) : lerp(_KaariVoima, kerroin, ydin);
                    L *= tavoite / max(nyt, 1e-3);
                    L *= lerp(float3(1.0, 1.0, 1.0), float3(0.7, 0.92, 1.0), max(ydin, reuna));
                    float vyo = smoothstep(3500.0, 7000.0, hs) * (1.0 - smoothstep(30000.0, 55000.0, hs));
                    L *= lerp(float3(1.0, 1.0, 1.0), float3(0.35, 0.8, 1.0) * (1.0 + _KaariSyva), vyo);
                }
                float dh = hmin - 95000.0;
                float3 nl = normalize(lahin);
                float aalto = 0.75 + 0.25 * sin(nl.x * 23.0 + nl.y * 17.0) * sin(nl.z * 29.0 - nl.x * 11.0);
                float hehku = (exp(-dh * dh / (14000.0 * 14000.0)) + 0.4 * exp(-dh * dh / (35000.0 * 35000.0))) * 0.5 * aalto
                    * _Hehku * yo * (maa ? 0.0 : 1.0) * (1.0 - smoothstep(105000.0, 118000.0, hmin));
                L += _HehkuVari.rgb * hehku;

                float alfa = 1.0 - dot(T, float3(1.0, 1.0, 1.0) / 3.0);
                // Vianetsintä (laite 30.9.: päivän vertailu tasaisen sininen): läpinäkymätön näkymä arvoista.
                if (_Debug > 0.5 && _Debug < 1.5) return float4(T, 1);
                if (_Debug > 1.5 && _Debug < 2.5) return float4((loppu - alku) / 3.0e6, (length(o + d * alku) - _R) / 2.0e5, maa ? 1 : 0, 1);
                if (_Debug > 2.5) return float4(AurinkoPisteeseen(0, dot(normalize(o + d * alku), s)), 1);
                return float4(L, alfa) * _Peitto;
            }
            ENDHLSL
        }
    }
}
