// SADEKUURO JA SAVU (Linssiseppä 2, 9.10.2026; omistaja TF 168, juna 170): Ydin KaupunkiKuuro (märkyys, peitto, tummuus) ja SavuLajit.
using System;
using Matkakirja.Linssit.Ilmakeha;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiKuuroTestit
    {
        [Testi] static void KastuuSateessaJaKuivuuHitaasti()
        {
            KaupunkiKuuro.Nollaa();
            KaupunkiKuuro.Voima = 1;
            for (int i = 0; i < 45; i++) KaupunkiKuuro.Paivita(1);
            Oleta.Tosi(Math.Abs(KaupunkiKuuro.Markyys - 0.5) < 1e-9, "puolessa ajassa puoliksi märkä: " + KaupunkiKuuro.Markyys);
            for (int i = 0; i < 100; i++) KaupunkiKuuro.Paivita(1);
            Oleta.Sama(1.0, KaupunkiKuuro.Markyys, "täysin märkä");
            KaupunkiKuuro.Voima = 0;
            for (int i = 0; i < 300; i++) KaupunkiKuuro.Paivita(1);
            Oleta.Tosi(Math.Abs(KaupunkiKuuro.Markyys - 0.5) < 1e-9, "kuivuu 10 min:ssa");
            KaupunkiKuuro.Nollaa();
        }

        [Testi] static void PilvetKuuronAikana()
        {
            KaupunkiKuuro.Nollaa();
            Oleta.Sama(0.45, KaupunkiKuuro.Peitto(0.45), "ei kuuroa: säästä");
            Oleta.Sama(0.0, KaupunkiKuuro.Tummuus);
            KaupunkiKuuro.Voima = 1;
            Oleta.Tosi(Math.Abs(KaupunkiKuuro.Peitto(0.45) - 0.95) < 1e-9 && Math.Abs(KaupunkiKuuro.Tummuus - 0.6) < 1e-9, "kuuro: peitto 0,95, tummuus 0,6");
            KaupunkiKuuro.Nollaa();
        }

        [Testi] static void SavuLajeittain()
        {
            Oleta.Tosi(SavuLajit.Laji("hoyrylaiva") is SavuAsetus h && h.Peitto > 0.4 && h.R < 0.5, "höyrylaiva: tumma savu");
            Oleta.Tosi(SavuLajit.Laji("saaristolaiva") is SavuAsetus s && s.R > 0.8, "saaristolaiva: vaalea höyry");
            Oleta.Tosi(SavuLajit.Laji("lautta") is SavuAsetus l && l.Peitto < 0.2, "lautta: hento");
            Oleta.Tosi(SavuLajit.Laji("vene") == null && SavuLajit.Laji("kanootti") == null, "pienet: ei savua");
            Oleta.Tosi(SavuLajit.Laji("hoyrylaiva")!.Value.Enintaan <= 40, "hiukkasia enintään 40 / laiva");
        }
    
        [Testi] static void AamusumuVainAamulla()
        {
            Oleta.Sama(1.0, AamuSumu.Voima(4, 90), "aamu, aurinko 4° idässä: täysi");
            Oleta.Sama(0.0, AamuSumu.Voima(4, 270), "ilta: ei sumua");
            Oleta.Sama(0.0, AamuSumu.Voima(20, 120), "aurinko korkealla: haihtunut");
            Oleta.Sama(0.0, AamuSumu.Voima(-10, 80), "yö: ei vielä");
            Oleta.Tosi(AamuSumu.Voima(10, 100) > 0 && AamuSumu.Voima(10, 100) < 1, "haihtuu vähitellen");
        }

        [Testi] static void VarjostimetUtuSumuVälke()
        {
            string V(string n) => System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", n));
            Oleta.Tosi(V("Ilmakeha.hlsl").Contains("etM *= max(1.0, _IlmMaailma.y);"), "kauko-utu ilmaperspektiivissä");
            string v = V("VesiPinta.shader");
            Oleta.Tosi(v.Contains("Name \"VesiSumu\"") && v.Contains("_IlmSaa.z"), "aamusumukerros");
            Oleta.Tosi(v.Contains("kipina"), "välke");
            Oleta.Tosi(v.Contains("_Kimallus (\"Kimallus\", Float) = 15") && v.Contains("aurinko = 1.2 * aurinko / (1.0 + aurinko);"), "auringon heijastus puolitettu ja pehmeä katto");
            Oleta.Tosi(V("IlmakehaLaatat.shader").Contains("_IlmSaa.x"), "märät kadut");
        }

        [Testi] static void SininenHetkiTaivaassaJaVedessa()
        {
            // PT 9.10.: junan 170 yökuvissa taivas musta → loppuillan sininen hetki taivaan ja veden heijastuksen gradienttina.
            string V(string n) => System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", n));
            Oleta.Tosi(V("Ilmakeha.hlsl").Contains("float3 IlmSininenHetki(float3 d)") && V("Ilmakeha.hlsl").Contains("float4 _IlmHamara;"), "funktio ja globaali");
            Oleta.Tosi(V("IlmakehaTaivas.shader").Contains("c += IlmSininenHetki(d)"), "taivas");
            Oleta.Tosi(V("VesiPinta.shader").Contains("+ IlmSininenHetki(r)"), "veden heijastus");
        }

        [Testi] static void MuistihataIlmanTilesetinUudelleenluontia()
        {
            // Omistaja TF 169 (PT 9.10. 10.0x): tauolla näkymä katosi ja peli kaatui. SSE- ja välimuistiasettimet kutsuvat RecreateTileset():iä.
            string c = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "CesiumKaupunki.cs"));
            int i = c.IndexOf("void Muistivahti()"), j = c.IndexOf("void PaivitaPysaytys()");
            Oleta.Tosi(i > 0 && j > i, "Muistivahti ja PaivitaPysaytys");
            string vahti = c.Substring(i, j - i);
            Oleta.Tosi(!vahti.Contains("maximumScreenSpaceError") && !vahti.Contains("maximumCachedBytes"), "hädässä ei SSE- eikä välimuistivaihtoa");
            Oleta.Tosi(vahti.Contains("Karkeaksi()") && c.Contains("bool halu = Tauko && !muistiPysaytys && Latausaste >= ValmisProsentti;"), "karkea valinta hädässä, suspendUpdate tauolla");
        }

        [Testi] static void AluskerrosKorkealla()
        {
            // PT 9.10.: korkealta (vapaan lennon katto 12 km) Googlen laattojen takana ei ollut maata → aluskerros yli 1200 m:ssä.
            string c = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "CesiumKaupunki.cs"));
            Oleta.Tosi(c.Contains("KaupunkiIlmakeha.KameraKorkeusM > AluskerrosKorkeusM") && c.Contains("AluskerrosKorkeusM = 1200f"), "aluskerros korkealla");
        }

        [Testi] static void OmienMallienValo()
        {
            // Omistaja 9.10.: omat mallit Googlen sävyyn ja illan valaistukseen (OmaMalli-varjostin Cesiumin opaqueMaterialina).
            string U(string n) => System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", n));
            string v = U("Resources/Varjostimet/OmaMalli.shader"), c = U("Unity/CesiumOmatMallit.cs");
            foreach (var o in new[] { "_baseColorTexture", "_baseColorFactor", "_emissiveTexture", "_emissiveFactor", "_baseColorTextureCoordinateIndex" })
                Oleta.Tosi(v.Contains(o + " ("), "Cesiumin ominaisuus " + o);
            Oleta.Tosi(v.Contains("SampleSH(n)") && v.Contains("IlmIlmaperspektiivi") && v.Contains("_IlmMaailma.z"), "ympäristövalo, ilma ja ilta");
            Oleta.Tosi(v.Contains("\"LightMode\" = \"DepthNormals\"") && v.Contains("\"LightMode\" = \"ShadowCaster\""), "syvyys ja varjot");
            Oleta.Tosi(c.Contains("t.opaqueMaterial = om"), "materiaali tilesetille");
        }

        [Testi] static void OmienMallienPbrKartat()
        {
            // Omistaja 9.10. (PT junaan 173): ND:n ja KL:n oikeat pinnat → OmaMalli lukee glTF:n normaali-, metalli/karheus- ja peittokartat
            // Cesiumin ominaisuusnimillä; tangentit derivaatoista, koska malleissa ei ole TANGENT-attribuuttia.
            string v = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "OmaMalli.shader"));
            foreach (var o in new[] { "_normalMapTexture", "_normalMapScale", "_normalMapTextureCoordinateIndex", "_metallicRoughnessTexture",
                                      "_metallicRoughnessFactor", "_metallicRoughnessTextureCoordinateIndex", "_occlusionTexture", "_occlusionStrength", "_occlusionTextureCoordinateIndex" })
                Oleta.Tosi(v.Contains(o + " ("), "Cesiumin ominaisuus " + o);
            Oleta.Tosi(v.Contains("_metallicRoughnessFactor.x * mr.b") && v.Contains("_metallicRoughnessFactor.y * mr.g"), "metalli B, karheus G (glTF)");
            Oleta.Tosi(v.Contains("Kartoitettu(n0, v.w, v.uvNM.xy") && v.Contains("ddx(w)"), "kotangenttikehys derivaatoista");
            Oleta.Tosi(v.Contains("\"white\" {}") && v.Contains("_metallicRoughnessFactor (\"Metalli, karheus\", Vector) = (0, 1, 0, 0)"), "oletus: ei metallia, karhea (vanhat mallit ennallaan)");
            // PT 9.10.: ND kauempaa harmaa → valo kaupungin auringosta (_IlmAurinko), ei kameraa seuraavasta kartan päävalosta.
            Oleta.Tosi(v.Contains("valo.direction = kaupunki ? normalize(_IlmAurinko.xyz) : valo.direction;"), "kaupungin aurinko");
            // Uusi data (PBR, alfa, COLOR_0) vain 173+: oma osoitin uusin-3.json (vanhat buildit lukevat uusin-2:ta).
            string c = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Unity", "CesiumOmatMallit.cs"));
            Oleta.Tosi(c.Contains("omat-mallit/uusin-3.json\";"), "osoitin uusin-3");
        }

        [Testi] static void SadepilvetJaSalama()
        {
            // PT junaan 171: sade = tummat matalat pilvet (kuuron tummuus laskee pohjan ja paksuntaa) + LS1:n salaman välähdys pilviin.
            string U(string n) => System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", n));
            string c = U("Unity/KaupunkiIlmakeha.cs"), h = U("Resources/Varjostimet/Ilmakeha.hlsl"), k = U("Unity/KaupunkiKuva.cs");
            Oleta.Tosi(c.Contains("Mathf.Lerp(PilviKorkeusM, SadePohjaM, tumma)") && c.Contains("korkeusM + 150f"), "pohja laskee, pysyy kameran yllä");
            Oleta.Tosi(c.Contains("public static void Salama(Vector3 suunta, float voima)") && h.Contains("_IlmSalama.w"), "salama-API ja varjostin");
            Oleta.Tosi(k.Contains("KaupunkiKuva.Saa.Sade)"), "sään sade kuuroon");
        }

        [Testi] static void LaattojenLeikkausKutenCesium()
        {
            // CesiumUnlitTilesetShader: Alpha = 1 − peitteen R (Lerp mustasta alfalla), raja 0,5, oletuskuva musta (A/B 9.10. 05.0x).
            string s = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "IlmakehaLaatat.shader"));
            Oleta.Tosi(s.Contains("clip(0.5 - m.r * m.a)"), "1 − r·a ≥ 0,5 säilyy");
            Oleta.Tosi(s.Contains("_overlayTexture_Clipping (\"Leikkaus\", 2D) = \"black\""), "ilman peitettä ei leikata");
        }

        [Testi] static void SateenkaariVainKuuronJalkeen()
        {
            KaupunkiKuuro.Nollaa();
            Oleta.Sama(0.0, KaupunkiKuuro.Sateenkaari(20), "kuiva: ei kaarta");
            KaupunkiKuuro.Voima = 1; KaupunkiKuuro.AsetaMarkyys(1);
            Oleta.Sama(0.0, KaupunkiKuuro.Sateenkaari(20), "sataa vielä: ei kaarta");
            KaupunkiKuuro.Voima = 0;
            Oleta.Sama(1.0, KaupunkiKuuro.Sateenkaari(20), "sade loppui, märkää, aurinko 20°");
            Oleta.Sama(0.0, KaupunkiKuuro.Sateenkaari(45), "aurinko liian korkealla: kaari horisontin alla");
            Oleta.Sama(0.0, KaupunkiKuuro.Sateenkaari(1), "aurinko laskee");
            KaupunkiKuuro.AsetaMarkyys(0.2);
            Oleta.Sama(0.0, KaupunkiKuuro.Sateenkaari(20), "kuivunut: ei kaarta");
            KaupunkiKuuro.Nollaa();
            string t = System.IO.File.ReadAllText(System.IO.Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "IlmakehaTaivas.shader"));
            Oleta.Tosi(t.Contains("IlmSateenkaari(d)"), "taivas piirtää kaaren");
        }
}
}
