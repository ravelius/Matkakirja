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
            Oleta.Tosi(V("IlmakehaLaatat.shader").Contains("_IlmSaa.x"), "märät kadut");
        }
}
}
