// ALOITUSINTRO (omistaja 11.10. 11.5x, juna 182; lisävaatimukset 12.1x): taulukko kolmelle kaupungille, ajoitus 6 × 3 s = 18 s,
// kuvien valinta, NUI:n rajapinta (TuleeAloitusintro, Paattyi kerran, PuluValmis → luenta kerran).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class AloitusintroTestit
    {
        [Testi] static void TaulukkoKolmelleKaupungille()
        {
            Oleta.Sama(3, KaupunkiIntro.Aloitukset.Count, "kaupunkeja");
            var odotettu = new (string k, double williamS)[] { ("ateena", 3.25), ("pariisi", 3.82), ("tukholma", 3.49) };
            foreach (var (k, s) in odotettu)
            {
                var a = KaupunkiIntro.AloitusintroData(k);
                Oleta.Tosi(a != null && a.Kaupunki == k, k);
                Oleta.Sama("https://media.matkakirja.app/aanet/kaupunki-intro-v1/william-" + k + ".mp3", a.WilliamUrl, k);
                Oleta.Sama("https://media.matkakirja.app/audio/musa-kaupunki-" + k + "-nopea-lyria-v2.mp3", a.MusiikkiUrl, k);
                Oleta.Sama(s, a.WilliamS, k + " William");
                Oleta.Tosi(a.WilliamS < KaupunkiIntro.AloitusNimiPoisS, k + ": nimi näkyy koko Williamin puheen ajan");
            }
            Oleta.Tosi(KaupunkiIntro.AloitusintroData("Ateena") != null, "kirjainkoko ei haittaa");
            foreach (var k in new[] { "lontoo", "rooma", null, "" }) Oleta.Sama(null, KaupunkiIntro.AloitusintroData(k), "ei introa: " + k);
        }

        [Testi] static void IntroJokaKertaPariisiVainAlkulennolla()
        {
            foreach (var k in new[] { "ateena", "tukholma" })
                Oleta.Tosi(KaupunkiIntro.AloitusintroSaa(k, true) && KaupunkiIntro.AloitusintroSaa(k, false), k + " joka saapumisella");
            Oleta.Tosi(KaupunkiIntro.AloitusintroSaa("pariisi", true), "Pariisi alkulennolla");
            Oleta.Tosi(!KaupunkiIntro.AloitusintroSaa("pariisi", false), "Pariisi muulloin: nykyinen C1–C5-esitys");
            Oleta.Tosi(!KaupunkiIntro.AloitusintroSaa("lontoo", true), "Lontoo ei");
            // Pariisin nykyintro (C1–C5) on yhä vain Pariisissa.
            Oleta.Tosi(KaupunkiIntro.OnIntro("pariisi") && !KaupunkiIntro.OnIntro("ateena"));
        }

        [Testi] static void AjoitusKuusiKertaaKolmeSekuntia()
        {
            Oleta.Sama(6, KaupunkiIntro.AloitusKuvia);
            Oleta.Sama(3.0, KaupunkiIntro.AloitusKuvaS);
            Oleta.Sama(18.0, KaupunkiIntro.AloitusKestoS);
            for (int n = 0; n < 6; n++)
            {
                Oleta.Sama(n * 3.0, KaupunkiIntro.AloitusKuvaAlkaa(n), "alku " + n);
                Oleta.Sama(n, KaupunkiIntro.AloitusKuva(n * 3.0), "kuva alussa " + n);
                Oleta.Sama(n, KaupunkiIntro.AloitusKuva(n * 3.0 + 2.99), "kuva lopussa " + n);
            }
            Oleta.Sama(-1, KaupunkiIntro.AloitusKuva(-0.1), "ennen");
            Oleta.Sama(-1, KaupunkiIntro.AloitusKuva(18.0), "18 s: ohi");
            Oleta.Sama(-1, KaupunkiIntro.AloitusKuva(double.NaN));
            // Musiikin katko intron lopussa, kaupungin kappale sekuntia myöhemmin; luenta ~1 s Paattyista.
            Oleta.Sama(18f, KaupunkiIntro.AloitusKatkoS);
            Oleta.Tosi(KaupunkiIntro.AloitusHidasS - KaupunkiIntro.AloitusKatkoS == 1f && KaupunkiIntro.AloitusLuentaViiveS == 1f);
        }

        [Testi] static void KuvatAvauskuvistaTaydennysJaKierto()
        {
            Func<string, string> id = x => x;
            // Ateena 7 avauskuvaa → kuusi ensimmäistä.
            var a = KaupunkiIntro.AloitusKuvat(new[] { "a1", "a2", "a3", "a4", "a5", "a6", "a7" }, new[] { "k1" }, id);
            Oleta.Sama("a1 a2 a3 a4 a5 a6", string.Join(" ", a));
            // Pariisi 4 avauskuvaa → täydennys kansikuvista, sama kuva vain kerran.
            var p = KaupunkiIntro.AloitusKuvat(new[] { "a1", "a2", "a3", "a4" }, new[] { "a2", "k1", "k2", "k3" }, id);
            Oleta.Sama("a1 a2 a3 a4 k1 k2", string.Join(" ", p));
            // Alle kuusi kaikkiaan → kiertää alusta (kuva vaihtuu silti 3 s välein).
            var v = KaupunkiIntro.AloitusKuvat(new[] { "a1", "a2", "a3", "a4" }, null, id);
            Oleta.Sama("a1 a2 a3 a4 a1 a2", string.Join(" ", v));
            Oleta.Sama(0, KaupunkiIntro.AloitusKuvat<string>(null, new string[0], id).Count, "ei kuvia");
            Oleta.Sama("a1 a1 a1 a1 a1 a1", string.Join(" ", KaupunkiIntro.AloitusKuvat(new[] { "a1", null, "" }, null, id)), "tyhjät ohi");
        }

        static List<(string, bool)> Kuuntele(out Action<string, bool> h)
        {
            var l = new List<(string, bool)>();
            h = (k, o) => l.Add((k, o));
            KaupunkiIntro.Paattyi += h;
            return l;
        }

        [Testi] static void TuleeAloitusintroSaapumisestaPaattyihin()
        {
            KaupunkiIntro.Nollaa();
            Oleta.Tosi(!KaupunkiIntro.TuleeAloitusintro("ateena"), "alussa ei");
            KaupunkiIntro.Saapuu("ateena", true);
            Oleta.Tosi(KaupunkiIntro.TuleeAloitusintro("ateena") && KaupunkiIntro.TuleeAloitusintro("Ateena"), "tulossa");
            Oleta.Tosi(!KaupunkiIntro.TuleeAloitusintro("tukholma") && !KaupunkiIntro.TuleeAloitusintro(null), "vain tämä kaupunki");
            Oleta.Tosi(KaupunkiIntro.AloitusSaapumisella("ateena"));
            var l = Kuuntele(out var h);
            try
            {
                Oleta.Tosi(KaupunkiIntro.Paata("ateena", false), "Paattyi laukesi");
                Oleta.Tosi(!KaupunkiIntro.TuleeAloitusintro("ateena"), "Paattyin jälkeen ei");
                Oleta.Tosi(KaupunkiIntro.AloitusSaapumisella("ateena"), "käynti alkoi introlla, kunnes saavutaan muualle");
                KaupunkiIntro.Saapuu("lontoo", false);
                Oleta.Tosi(!KaupunkiIntro.AloitusSaapumisella("ateena"), "muu saapuminen nollaa");
                // Saapuminen ilman introa ja uusi matka kesken intron.
                KaupunkiIntro.Saapuu("tukholma", true);
                KaupunkiIntro.Nollaa();
                Oleta.Tosi(!KaupunkiIntro.TuleeAloitusintro("tukholma") && !KaupunkiIntro.Paata("tukholma", true), "uusi matka: ei Paattyita");
                Oleta.Sama(1, l.Count, "Paattyi kerran");
            }
            finally { KaupunkiIntro.Paattyi -= h; KaupunkiIntro.Nollaa(); }
        }

        [Testi] static void PaattyiKerranLopussaJaOhitassa()
        {
            KaupunkiIntro.Nollaa();
            var l = Kuuntele(out var h);
            try
            {
                KaupunkiIntro.Saapuu("pariisi", true);
                Oleta.Tosi(KaupunkiIntro.Paata("pariisi", false));
                Oleta.Tosi(!KaupunkiIntro.Paata("pariisi", true), "toinen loppu (Ohita perään) ei laukaise uudelleen");
                KaupunkiIntro.Saapuu("tukholma", true);
                Oleta.Tosi(!KaupunkiIntro.Paata("ateena", true), "väärä kaupunki ei");
                Oleta.Tosi(KaupunkiIntro.Paata("tukholma", true), "Ohita");
                Oleta.Tosi(!KaupunkiIntro.Paata("tukholma", false), "ajastimen loppu Ohitan jälkeen ei");
                Oleta.Sama(2, l.Count);
                Oleta.Sama(("pariisi", false), l[0]);
                Oleta.Sama(("tukholma", true), l[1]);
            }
            finally { KaupunkiIntro.Paattyi -= h; KaupunkiIntro.Nollaa(); }
        }

        [Testi] static void PuluValmisAloittaaLuennanKerran()
        {
            KaupunkiIntro.Nollaa();
            var vanha = KaupunkiIntro.LykattyLuentaKoukku;
            var luennat = new List<string>();
            KaupunkiIntro.LykattyLuentaKoukku = k => luennat.Add(k);
            try
            {
                KaupunkiIntro.Saapuu("ateena", true);
                KaupunkiIntro.PuluValmis("ateena");
                Oleta.Sama(0, luennat.Count, "ennen Paattyita ei luentaa (ei intron päälle)");
                KaupunkiIntro.Paata("ateena", false);
                KaupunkiIntro.PuluValmis("tukholma");
                Oleta.Sama(0, luennat.Count, "väärä kaupunki");
                KaupunkiIntro.PuluValmis("ateena");
                KaupunkiIntro.PuluValmis("ateena");
                Oleta.Sama(1, luennat.Count, "luenta kerran");
                Oleta.Sama("ateena", luennat[0]);
                // Uusi saapuminen ennen Pulun loppua: vanhan intron PuluValmis ei aloita luentaa.
                KaupunkiIntro.Saapuu("tukholma", true);
                KaupunkiIntro.Paata("tukholma", false);
                KaupunkiIntro.Saapuu("lontoo", false);
                KaupunkiIntro.PuluValmis("tukholma");
                Oleta.Sama(1, luennat.Count, "lähtö peruu");
            }
            finally { KaupunkiIntro.LykattyLuentaKoukku = vanha; KaupunkiIntro.Nollaa(); }
        }

        [Testi] static void NuinRajapintaHeijastuksella()
        {
            // NUI tilaa heijastuksella: nimet ja tyypit pysyvät täsmälleen (sovittu 11.10.).
            var t = typeof(KaupunkiIntro);
            var e = t.GetEvent("Paattyi", BindingFlags.Public | BindingFlags.Static);
            Oleta.Tosi(e != null && e.EventHandlerType == typeof(Action<string, bool>), "event Action<string,bool> Paattyi");
            var pv = t.GetMethod("PuluValmis", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null);
            Oleta.Tosi(pv != null && pv.ReturnType == typeof(void), "void PuluValmis(string)");
            var ta = t.GetMethod("TuleeAloitusintro", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null);
            Oleta.Tosi(ta != null && ta.ReturnType == typeof(bool), "bool TuleeAloitusintro(string)");
            Oleta.Sama("Matkakirja.Linssit.Kierros.KaupunkiIntro", t.FullName);
        }
    }
}
