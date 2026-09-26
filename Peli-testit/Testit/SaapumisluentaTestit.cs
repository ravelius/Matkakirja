// Löydös 162: saapumisluennan kerran-per-saapuminen-tilakone (Scripts/Peli/Saapumisluenta.cs). Kesken on tosi
// saapumisesta luennan loppuun ilman aukkoa (traileri, lykkäys, alkuviive), ja Paattyi nousee täsmälleen kerran
// jokaisella päättymistavalla. ./kaanna.sh Saapumisluenta
using System.Collections.Generic;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class SaapumisluentaTestit
    {
        static readonly Luento Ateena = new Luento { Id = "ateena", Kaupunki = "ateena", Url = "https://x/ateena.mp3" };
        static readonly Luento LentoAlku = new Luento { Id = "lento-alku", Url = "https://x/lento.mp3" };

        static (Saapumisluenta S, List<string> Loki) Uusi()
        {
            var s = new Saapumisluenta();
            var loki = new List<string>();
            s.Paattyi += (k, syy) => loki.Add(k + ":" + syy);
            return (s, loki);
        }

        [Testi] static void LuonnollinenLoppuIlmanAukkoa()
        {
            var (s, loki) = Uusi();
            Oleta.Tosi(!s.Kesken, "alussa ei kesken");
            s.Saapui("ateena");
            Oleta.Tosi(s.Kesken, "heti saapumisesta");
            // Traileri: esivaihe, vahti ei päätä.
            Oleta.Tosi(!s.Vahdi(true, null, "ei soinut"), "traileri");
            Oleta.Tosi(s.Kesken, "trailerin ajan");
            s.Jonossa("ateena", Ateena);
            // Alkuviive 0,6 s: Puhe lataa (SoivaUrl = luennan osoite), Soi ei vielä nouse.
            Oleta.Tosi(!s.Vahdi(false, Ateena.Url, "ei soinut"), "viiveen ajan");
            Oleta.Tosi(s.Kesken, "viiveen ajan kesken");
            // Toinen puhe (lento-alku) loppuu: ei koske.
            Oleta.Tosi(!s.Loppui(LentoAlku, "loppu"), "vieras luento");
            Oleta.Tosi(s.Loppui(Ateena, "loppu"), "oma luento loppui");
            Oleta.Tosi(!s.Kesken, "loppu");
            Oleta.Tosi(!s.Loppui(Ateena, "loppu") && !s.Paata(null, "ohita") && !s.Vahdi(false, null, "x"), "ei toista kertaa");
            Oleta.Sama("ateena:loppu", string.Join(",", loki));
            Oleta.Sama("ateena (loppu)", s.Viimeisin);
        }

        [Testi] static void OhitaJaAaniPoisJaEiLuentaa()
        {
            var (s, loki) = Uusi();
            s.Saapui("ateena");
            s.Jonossa("ateena", Ateena);
            Oleta.Tosi(s.Paata(null, "ohita"), "ohita");
            Oleta.Tosi(!s.Loppui(Ateena, "ohita"), "puheen pysäytys ohituksen jälkeen ei nosta uudelleen");
            s.Saapui("sofia");
            Oleta.Tosi(s.Paata("sofia", "ääni pois"), "kertoja pois: heti kun luenta olisi alkanut");
            s.Saapui("kairo");
            Oleta.Tosi(!s.Paata("sofia", "ei luentaa"), "väärä kaupunki ei päätä");
            Oleta.Tosi(s.Paata("kairo", "ei luentaa"), "ei luentaa");
            Oleta.Sama("ateena:ohita,sofia:ääni pois,kairo:ei luentaa", string.Join(",", loki));
        }

        [Testi] static void VahtiPaattaaJumiin()
        {
            var (s, loki) = Uusi();
            // Lataus petti: Puhe hiljaa (SoivaUrl null) ennen kuin luento alkoi.
            s.Saapui("ateena");
            s.Jonossa("ateena", Ateena);
            Oleta.Tosi(s.Vahdi(false, null, "ei soinut"), "lataus petti");
            // Toinen puhe korvasi.
            s.Saapui("wien");
            s.Jonossa("wien", Ateena);
            Oleta.Tosi(s.Vahdi(false, "https://x/muu.mp3", "keskeytetty"), "korvattu");
            // Esivaihe katosi ilman luentaa (esim. uusi matka trailerin aikana).
            s.Saapui("praha");
            Oleta.Tosi(!s.Vahdi(true, null, "x") && s.Kesken, "esivaihe jatkuu");
            Oleta.Tosi(s.Vahdi(false, null, "x"), "esivaihe loppui");
            Oleta.Sama("ateena:ei soinut,wien:keskeytetty,praha:keskeytetty", string.Join(",", loki));
        }

        [Testi] static void UusiSaapuminenJaValikortti()
        {
            var (s, loki) = Uusi();
            // Aloituslennon välikortti nostaa tilan ennen Perillaa: sama kaupunki jatkaa samaa saapumista.
            s.Saapui("ateena");
            s.Saapui("ateena");
            Oleta.Sama(0, loki.Count, "välikortti + Perilla = yksi saapuminen");
            s.Saapui(null);
            Oleta.Tosi(s.Kesken, "reitin varrella ei saapumista");
            s.Jonossa("ateena", Ateena);
            // Uusi saapuminen ennen edellisen loppua päättää edellisen kerran.
            s.Saapui("sofia");
            Oleta.Tosi(s.Kesken && s.Kaupunki == "sofia" && s.Odotettu == null, "uusi alkaa puhtaana");
            Oleta.Tosi(!s.Loppui(Ateena, "loppu"), "vanhan luennon loppu ei päätä uutta");
            s.Paata("sofia", "ei luentaa");
            Oleta.Sama("ateena:keskeytetty,sofia:ei luentaa", string.Join(",", loki));
            Oleta.Tosi(!s.Kesken);
            // Jonossa ilman saapumista ei nosta tilaa.
            s.Jonossa("ateena", Ateena);
            Oleta.Tosi(!s.Kesken && s.Odotettu == null, "kaiutinnappi ilman saapumista");
        }
    }
}
