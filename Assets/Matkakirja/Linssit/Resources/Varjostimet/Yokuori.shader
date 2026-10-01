// Yökuori (ISS:n kyyti, Linssiseppä 28.9.2026; Natiiviseppä: väliaikainen linssin oma kerros, pallon terminaattoria ei ole):
// läpikuultava kuori pilvikuoren yllä, tumma yöpuolella auringon suunnan mukaan ja 6°:n hämäräkaista (aurinko −6° … +2°).
// Ulkopinta (Cull Back), ZWrite Off; piirtyy pilvien jälkeen, joten pilvetkin tummuvat yöllä.
//
// KAUPUNKIEN VALOT (omistaja 28.9. klo 12.3x Fablen kautta: "yöpuolella Euroopan kaupungit hehkuvat lämpimänä valoverkkona
// kuten astronauttien yökuvissa"): NASA Black Marble (Karttasepän sarja yovalot/2026-09-25), Eurooppa Z6:sta (lon −28,125…45,
// Web Mercator -rivit 13–25, 2048², noin 2,5 km/px 50°:ssa) ja muu maailma Z3:sta (2048², noin 20 km/px), yksikanavaisena
// (luminanssi). Kuoren fragmentin katsesäde leikataan maan pintaan (ellipsoidi pallotilassa kuten Ilmakaari), joten valot
// ovat oikeassa paikassa vinostakin katsottuna (kuori on 76 km pinnan yllä: ilman leikkausta siirtymä olisi 60–200 km).
// Esikerrottu alfa (Blend One OneMinusSrcAlpha): yö tummentaa maan peitolla a ja valot lisätään sen päälle, joten ne eivät
// tummu 0,82-peittoon. Valot syttyvät samassa hämäräkaistassa pinnan pisteen auringon korkeuden mukaan. Sävy: himmeät
// natriumin oranssit, kirkkaat ytimet kellanvalkoiset; HDR, joten suurkaupunkien ytimet hehkuvat bloomissa.
//
// AURINGON HEIJASTUS JA PINNAN VALAISTUS (ISS-realismi 1, omistajan kortti 28.9.): vesimaski reliefipyramidin vesiväristä
// (samat rajat ja koot kuin valoilla; kuvat R = valot, G = vesi). Kiilto vesillä Beckmann-jakaumalla (aallokon kaltevuus
// σ² = _Aalto, Cox–Munk-luokkaa) ja Schlickin Fresnelillä (F0 0,02), matalalla auringolla oranssimpi. Päiväpuolen
// varjostus auringon korkeuden mukaan: alle 30°:n korkeudella pinta tummuu pehmeästi (0° → 1 − _Varjo), ja yön kaista
// jatkaa siitä. Kaikki esikerrottuna samaan kuoreen, joten valot ja kiilto lisätään valon päälle, eivät tummu.
//
// FOTOREALISMI OSAT 3–4 (Linssiseppä 30.9.2026): PILVIEN VARJOT maahan: pinnan pisteestä auringon suuntaan pilvikerroksen
// korkeudelle (_PilviKorkeus / sin(auringon korkeus)) ja siitä pilvikuvan toinen näyte; varjo vain pilvettömälle maalle
// (pilven yläpinta ei tummu) ja päiväpuolella, matalalla auringolla varjo pitenee itsestään. KUUNVALO: yön peitto kevenee Kuun
// valaistun osuuden ja Kuun korkeuden mukaan (_Kuu.xyz suunta, w valaistu 0…1), ja kuunvalossa pilvet hohtavat (niiden
// yötummennus kevenee kaksinkertaisesti). A/B `astro kyyti pilvivarjo 0|1`, `astro kyyti kuunvalo 0|1`.
Shader "Matkakirja/Linssit/Yokuori"
{
    Properties
    {
        _Peitto("Yön peitto", Range(0, 1)) = 0.82
        _VesiTerava("Vesimaskin terävöinti kiillolle ja taivaan heijastukselle (kuvaputki, 0 = ennallaan)", Float) = 0
        _AamuVoima("Hämärän lämmin valo terminaattorissa (kuvaputken kiertoratanousu, 0 = pois)", Float) = 0
        _Vari("Yön väri", Color) = (0.012, 0.02, 0.05, 1)
        _Aurinko("Auringon suunta (maailma)", Vector) = (0, 0, 1, 0)
        _Keskus("Maan keskipiste (maailma)", Vector) = (0, 0, 0, 0)
        _Akseli("Napa-akseli (maailma, ECEF Z)", Vector) = (0, 1, 0, 0)
        _Nolla("Päiväntasaaja 0° (maailma, ECEF X)", Vector) = (1, 0, 0, 0)
        _Ita("Päiväntasaaja 90° itään (maailma, ECEF Y)", Vector) = (0, 0, 1, 0)
        _R("Päiväntasaajan säde (m)", Float) = 6378137
        _Litistys("a / b", Float) = 1.0033640898
        _ValotEu("Eurooppa (Web Mercator, R = valot, G = vesi)", 2D) = "black" {}
        _ValotMaa("Maailma (Web Mercator, R = valot, G = vesi)", 2D) = "black" {}
        _EuRaja("Eurooppa: lon0, lon1, Mercator-rivi 0, 1 (0…1 ylhäältä)", Vector) = (-28.125, 45, 0.203125, 0.40625)
        _Valot("Valojen voimakkuus (0 = pois)", Float) = 0.96
        _MaaVoima("Maailmakuvan lisävoima (Z3 on himmeämpi)", Float) = 2.2
        _Kiilto("Auringon heijastuksen voimakkuus (0 = pois)", Float) = 6
        _Aalto("Aallokon kaltevuus σ²", Float) = 0.02
        _Varjo("Päiväpuolen varjostus matalalla auringolla (0 = pois)", Range(0, 1)) = 0.55
        _YoVesi("Yön peitto vesillä", Range(0, 1)) = 0.96
        _Pilvet("Päivän pilvet (tasakulmainen, alfa = pilvi)", 2D) = "black" {}
        _PilvetOn("Pilvet käytössä (0/1)", Float) = 0
        _PilviPeitto("Pilvikuoren peitto (0…1)", Float) = 1
        _Karsinta("Pilvipeiton säädin (sama kynnys kuin Pilvet)", Range(0, 1)) = 0
        _PilviVarjo("Pilvien varjon tummuus (0 = pois)", Float) = 0.5
        _PilviKorkeus("Pilvikerroksen korkeus (m)", Float) = 8000
        _Kuu("Kuun suunta (xyz) ja valaistu osuus (w)", Vector) = (0, 0, 1, 0)
        _KuuVoima("Kuunvalon voimakkuus (0 = pois)", Float) = 0.35
        _TaivasHeijastus("Taivaan Fresnel-heijastus vesiltä (0 = pois)", Float) = 0.3
        _ValotT00("Tarkat valot länsi-ylä", 2D) = "black" {}
        _ValotT10("Tarkat valot itä-ylä", 2D) = "black" {}
        _ValotT01("Tarkat valot länsi-ala", 2D) = "black" {}
        _ValotT11("Tarkat valot itä-ala", 2D) = "black" {}
        _TarkatOn("Tarkat valot käytössä (0/1)", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "Queue" = "Transparent-40" "RenderPipeline" = "UniversalPipeline" "IgnoreProjector" = "True" }
        Pass
        {
            Name "Forward"
            Tags { "LightMode" = "UniversalForward" }
            Blend One OneMinusSrcAlpha
            ZWrite Off
            ZTest LEqual
            Cull Back

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            TEXTURE2D(_ValotEu); SAMPLER(sampler_ValotEu);
            TEXTURE2D(_ValotMaa); SAMPLER(sampler_ValotMaa);
            TEXTURE2D(_Pilvet); SAMPLER(sampler_Pilvet);
            TEXTURE2D(_ValotT00); TEXTURE2D(_ValotT10); TEXTURE2D(_ValotT01); TEXTURE2D(_ValotT11); SAMPLER(sampler_ValotT00);
            CBUFFER_START(UnityPerMaterial)
                half _Peitto;
                half4 _Vari;
                float4 _Aurinko;
                float4 _Keskus;
                float4 _Akseli, _Nolla, _Ita, _EuRaja;
                float _R, _Litistys, _Valot, _MaaVoima, _Kiilto, _Aalto;
                half _Varjo, _YoVesi;
                float _PilvetOn, _PilviPeitto, _Karsinta;
                float _PilviVarjo, _PilviKorkeus, _KuuVoima, _TaivasHeijastus, _TarkatOn;
                float4 _Kuu;
                float _AamuVoima, _VesiTerava;
            CBUFFER_END

            // Pallotilan piste → (pituus, leveys) radiaaneina (ellipsoidille ja geodeettiseksi kuten valojen haussa).
            float2 PituusLeveys(float3 p)
            {
                float3 z = normalize(_Akseli.xyz), x = normalize(_Nolla.xyz), y = normalize(_Ita.xyz);
                float3 pe = p + z * dot(p, z) * (1.0 / _Litistys - 1.0);
                float ex = dot(pe, x), ey = dot(pe, y), ez = dot(pe, z);
                float e2 = 1.0 - 1.0 / (_Litistys * _Litistys);
                return float2(atan2(ey, ex), atan(ez / max(1.0, (1.0 - e2) * sqrt(ex * ex + ey * ey))));
            }
            float PilviNaytteesta(float2 ll)
            {
                float a = SAMPLE_TEXTURE2D_LOD(_Pilvet, sampler_Pilvet, float2(ll.x / 6.2831853 + 0.5, ll.y / 3.1415927 + 0.5), 0).a;
                if (_Karsinta > 0.0)
                {
                    float k0 = max(0.0, _Karsinta - 0.12 * saturate((1.0 - _Karsinta) / 0.3)), r = saturate((a - k0) / max(1.0 - k0, 1e-3));
                    a = r * r * (3.0 - 2.0 * r);   // sama pehmeä kynnys kuin Pilvet.Karsi
                }
                return a;
            }

            struct Syote { float4 paikka : POSITION; };
            struct Vali { float4 paikka : SV_POSITION; float3 maailma : TEXCOORD0; };

            Vali vert(Syote i)
            {
                Vali o;
                o.maailma = TransformObjectToWorld(i.paikka.xyz);
                o.paikka = TransformWorldToHClip(o.maailma);
                return o;
            }

            // Hämärä: sin(auringon korkeus) = n · aurinko; −6° (−0,105) … +2° (0,035).
            half Yo(float3 n) { return 1.0h - (half)smoothstep(-0.105, 0.035, dot(n, normalize(_Aurinko.xyz))); }

            half4 frag(Vali i) : SV_Target
            {
                float3 n = normalize(i.maailma - _Keskus.xyz);
                float3 aur = normalize(_Aurinko.xyz);
                half yoKuori = Yo(n);
                // Kuunvalo: yön peitto kevenee Kuun valaistun osuuden ja korkeuden mukaan.
                half kuuValo = (half)(_KuuVoima * _Kuu.w * saturate(dot(n, normalize(_Kuu.xyz)) * 3.0));
                half a = _Peitto * yoKuori * (1.0h - kuuValo);
                half3 c = _Vari.rgb * a;
                // Päiväpuolen varjostus: sin(korkeus) 0,5 (30°) → 0; 0 → _Varjo; neutraali tumma, ei yön sinistä.
                half matala = (half)saturate(1.0 - dot(n, aur) / 0.5);
                half varjo = _Varjo * matala * matala * (1.0h - yoKuori);
                c += half3(0.02, 0.018, 0.016) * varjo * (1.0h - a);
                a = a + varjo * (1.0h - a);

                // Katsesäde maan pintaan pallotilassa (napa-akselin suuntainen komponentti × a/b).
                float3 z = normalize(_Akseli.xyz);
                float3 o = _WorldSpaceCameraPos - _Keskus.xyz, d = i.maailma - _WorldSpaceCameraPos;
                o += z * dot(o, z) * (_Litistys - 1.0);
                d = normalize(d + z * dot(d, z) * (_Litistys - 1.0));
                float b = dot(o, d), h = b * b - (dot(o, o) - _R * _R);
                float t = -b - sqrt(max(h, 0.0));
                float osuu = step(0.0, h) * step(0.0, t);
                float3 p = o + d * t;                                    // pallotilassa
                float3 pe = p + z * dot(p, z) * (1.0 / _Litistys - 1.0); // takaisin ellipsoidille
                // ECEF Y suoraan C#:sta: Unityn maailma on vasenkätinen (Cesium: itä +X, ylös +Y, pohjoinen +Z), joten
                // cross(z, x) antoi −Y ja peilasi pituuden (laite cl4 28.9.: valot ja vesimaski väärällä pallonpuoliskolla).
                float3 x = normalize(_Nolla.xyz), y = normalize(_Ita.xyz);
                float ex = dot(pe, x), ey = dot(pe, y), ez = dot(pe, z);
                float lon = atan2(ey, ex);
                float e2 = 1.0 - 1.0 / (_Litistys * _Litistys);
                float lat = atan(ez / max(1.0, (1.0 - e2) * sqrt(ex * ex + ey * ey)));
                lat = clamp(lat, -1.4844, 1.4844);                       // ±85,05° (Web Mercator)
                float m = 0.5 - log(tan(0.7853982 + lat * 0.5)) / 6.2831853;   // 0 ylhäällä … 1 alhaalla

                // Maailma koko ajan, Eurooppa sen päälle rajalla 3 %:n liu'ulla.
                float2 uvMaa = float2(lon / 6.2831853 + 0.5, 1.0 - m);
                float lonAst = degrees(lon);
                float2 eu = float2((lonAst - _EuRaja.x) / (_EuRaja.y - _EuRaja.x), (m - _EuRaja.z) / (_EuRaja.w - _EuRaja.z));
                half euPaino = (half)saturate(min(min(eu.x, 1.0 - eu.x), min(eu.y, 1.0 - eu.y)) / 0.03);
                half2 sMaa = SAMPLE_TEXTURE2D(_ValotMaa, sampler_ValotMaa, uvMaa).rg;
                half2 sEu = SAMPLE_TEXTURE2D(_ValotEu, sampler_ValotEu, float2(saturate(eu.x), 1.0 - saturate(eu.y))).rg;
                // Tarkat Euroopan valot (Black Marble 2016 500 m, 2 × 2 -tiilet): sama rajaus, tiili puolikkaista.
                if (_TarkatOn > 0.5 && euPaino > 0.0h)
                {
                    float2 e = saturate(eu);
                    float2 tt = e * 2.0;
                    float2 tuv = float2(frac(min(tt.x, 1.9999)), 1.0 - frac(min(tt.y, 1.9999)));
                    half2 rg;   // R = valot, G = vesi (GSHHG, tarkempi kuin 2048²:n vesimaski)
                    if (tt.x < 1.0) rg = tt.y < 1.0 ? SAMPLE_TEXTURE2D(_ValotT00, sampler_ValotT00, tuv).rg : SAMPLE_TEXTURE2D(_ValotT01, sampler_ValotT00, tuv).rg;
                    else            rg = tt.y < 1.0 ? SAMPLE_TEXTURE2D(_ValotT10, sampler_ValotT00, tuv).rg : SAMPLE_TEXTURE2D(_ValotT11, sampler_ValotT00, tuv).rg;
                    sEu = rg;
                }
                half l = lerp(sMaa.r * (half)_MaaVoima, sEu.r, euPaino);
                half vesi = lerp(sMaa.g, sEu.g, euPaino);
                // Kuvaputki (Ateena 4968e1fd, Päätoimittaja 22.1x: "rannikoiden ympärillä vaalea, sumea reunus"): 500 m:n vesimaskin
                // pehmeä raja levitti taivaan heijastuksen ja kiillon maalle; terävöinti kapeaksi rajaksi.
                if (_VesiTerava > 0.0) vesi = lerp(vesi, (half)smoothstep(0.4, 0.6, vesi), (half)_VesiTerava);
                l = l * l * (half)0.6 + l * (half)0.4;                   // kuvan sRGB-sävy lähemmäs lineaarista, himmeät vaimeammiksi
                // Sävy NASA-vertailusta (30.9., ISS037-E-18864): himmeät natriumin oranssit, ytimet kellanvalkoiset (ennen valkoisempi).
                half3 savy = lerp(half3(1.0, 0.46, 0.14), half3(1.0, 0.80, 0.52), saturate(l * 1.4h));
                // Päivän pilvet peittävät valot ja heijastuksen (tasakulmainen, v = 0 etelässä; LOD 0: ei saumaa ±180°:ssa).
                float pilviA = SAMPLE_TEXTURE2D_LOD(_Pilvet, sampler_Pilvet, float2(lon / 6.2831853 + 0.5, lat / 3.1415927 + 0.5), 0).a;
                // Pilvipeiton säädin kuten Pilvet.shader: karsitut pilvet eivät himmennä kaupunkien valoja.
                if (_Karsinta > 0.0)
                {
                    float k0 = max(0.0, _Karsinta - 0.12 * saturate((1.0 - _Karsinta) / 0.3)), r = saturate((pilviA - k0) / max(1.0 - k0, 1e-3));
                    pilviA = r * r * (3.0 - 2.0 * r);
                }
                half pilvi = (half)(_PilvetOn * _PilviPeitto * pilviA);
                half lapi = 1.0h - 0.85h * pilvi;
                // Pilvien varjot: auringon suuntaan pilvikerrokseen ja siitä pilvikuvasta (vain pilvetön maa, päiväpuoli).
                float nlv = dot(normalize(p), aur);
                if (_PilviVarjo > 0.0 && _PilvetOn > 0.5 && nlv > 0.0 && osuu > 0.5)
                {
                    float3 pv = p + aur * (_PilviKorkeus / max(nlv, 0.08));
                    half pvarjo = (half)(_PilviVarjo * _PilviPeitto * PilviNaytteesta(PituusLeveys(pv)) * saturate(nlv * 8.0))
                        * (1.0h - pilvi) * (1.0h - yoKuori);
                    a = a + pvarjo * (1.0h - a);
                }
                half valo = l * (half)_Valot * Yo(normalize(p)) * (half)osuu * lapi;
                c += savy * valo;

                // Auringon heijastus vesiltä: Beckmann D · Fresnel / (4 n·v), kun aurinko on pinnan yllä.
                float3 ng = normalize(p), v = normalize(o - p);
                float3 hv = normalize(v + aur);
                float nh = saturate(dot(ng, hv)), nl = dot(ng, aur), nv = saturate(dot(ng, v));
                float nh2 = max(nh * nh, 1e-4);
                float D = exp(-(1.0 - nh2) / (nh2 * _Aalto)) / (3.14159265 * _Aalto * nh2 * nh2);
                float F = 0.02 + 0.98 * pow(1.0 - saturate(dot(v, hv)), 5.0);
                half kiilto = (half)(vesi * osuu * saturate(nl * 12.0) * min(D * F / (4.0 * max(nv, 0.08)), 40.0) * _Kiilto) * lapi;
                half3 kiiltoVari = lerp(half3(1.0, 0.55, 0.25), half3(1.0, 0.96, 0.88), (half)saturate(nl * 4.0));
                c += kiiltoVari * kiilto * (1.0h - a);
                // Fotorealismi osa 2 (30.9.): taivaan Fresnel-heijastus vesiltä. Katsekulman Fresnel (Schlick, F0 0,02) kasvaa
                // horisonttia kohti, jolloin meri hopeoituu reunalla kuten ISS:n kuvissa; vain päiväpuolella, pilvien alla heikkenee.
                half fres = (half)(0.02 + 0.98 * pow(1.0 - nv, 5.0));
                half taivas = (half)(vesi * osuu * saturate(nl * 4.0) * _TaivasHeijastus) * fres * lapi;
                c += half3(0.42h, 0.58h, 0.82h) * taivas * (1.0h - a);
                // Yöllä vesi tummemmaksi kuin maa (laite cl4: reliefin vaalea vesi jäi 0,82-peiton läpi maata kirkkaammaksi):
                // vedellä peitto _YoVesi, joten rannat erottuvat kuin kuutamossa. Lisäys esikerrottuna (väri yön väristä).
                half lisa = (half)(vesi * osuu) * yoKuori * saturate(_YoVesi - a);
                c += _Vari.rgb * lisa;
                a += lisa;
                // Yöllä pilvet yhtä tummiksi kuin vesi (laite cl7 28.9.: valkoiset pilvet jäivät 0,82-peiton läpi maitomaisen
                // harmaiksi; ISS:n yökuvissa pilvet ovat tummia, ellei kuu valaise).
                half lisaPilvi = pilvi * (half)osuu * yoKuori * saturate(_YoVesi - a) * saturate(1.0h - 2.0h * kuuValo);
                c += _Vari.rgb * lisaPilvi;
                a += lisaPilvi;
                // Kiertoratanousu (Päätoimittaja 1.10. 21.5x): terminaattorin lähellä (auringon korkeus −5° … +1°, huippu −1,5°)
                // maa ja pilvien huiput saavat lämmintä hämärän valoa, joten terminaattori erottuu horisontin lähellä. 0 = pois.
                if (_AamuVoima > 0.0 && osuu > 0.5)
                {
                    float sk = dot(normalize(p), aur);
                    half kaista = (half)(smoothstep(-0.087, -0.026, sk) * (1.0 - smoothstep(-0.010, 0.017, sk)));
                    c += half3(1.0h, 0.42h, 0.13h) * kaista * (half)(_AamuVoima * 0.8) * (0.4h + 0.6h * (1.0h - 0.85h * pilvi) + 1.2h * pilvi);
                    a *= 1.0h - 0.35h * kaista * (half)saturate(_AamuVoima);
                }
                return half4(c, a);
            }
            ENDHLSL
        }
    }
}
