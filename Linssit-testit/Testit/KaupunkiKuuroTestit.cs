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
