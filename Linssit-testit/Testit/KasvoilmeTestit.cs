// SOUTAJAN KASVOT (Natiiviseppä 11.10.2026): ilme, korostus kohdistuksesta ja katseen pikkuhypyt.
using System;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Linssit.Testit
{
    public static class KasvoilmeTestit
    {
        static Kohdistus K(string merkit, double vali = 0.1)
        {
            var k = new Kohdistus { Merkit = merkit, Alut = new double[merkit.Length], Loput = new double[merkit.Length] };
            for (int i = 0; i < merkit.Length; i++) { k.Alut[i] = i * vali; k.Loput[i] = (i + 1) * vali; }
            return k;
        }

        [Testi] static void IlmeetEroavat()
        {
            var n = new float[Kasvoilme.Nimet.Length]; var p = new float[n.Length];
            Kasvoilme.Ilme(null, n);
            Kasvoilme.Ilme("hymy", p);
            Oleta.Tosi(p[Kasvoilme.IHymyV] > 0.4f && p[Kasvoilme.IPoskiV] > 0.2f && n[Kasvoilme.IHymyV] < 0.1f, "hymy: suupielet ja posket ylös, neutraali lähes lepo");
            Kasvoilme.Ilme("huoli", p);
            Oleta.Tosi(p[Kasvoilme.ISisa] > 0.4f && p[Kasvoilme.ISuruV] > 0.1f, "huoli: kulmien sisäpäät ylös, suupielet alas");
            Kasvoilme.Ilme("vakava", p);
            Oleta.Tosi(p[Kasvoilme.IAlasV] > 0.2f && p[Kasvoilme.IHymyV] == 0f, "vakava: kulmat alas, ei hymyä");
            Kasvoilme.Ilme("kysyva", p);
            Oleta.Tosi(p[Kasvoilme.IUlkoV] > p[Kasvoilme.IUlkoO] + 0.2f, "kysyvä: kulmat epäsymmetrisesti");
            Kasvoilme.Ilme("tuntematon", p);
            Oleta.Tosi(p[Kasvoilme.IHymyV] == n[Kasvoilme.IHymyV] && p[Kasvoilme.ISisa] == 0f, "tuntematon = neutraali");
            foreach (var x in new[] { "hymy", "huoli", "vakava", "kysyva", null })
            { Kasvoilme.Ilme(x, p); Oleta.Tosi(Array.TrueForAll(p, v => v >= 0f && v <= 1f), $"{x}: painot 0–1"); }
        }

        [Testi] static void KorostusSananAlussa()
        {
            // "Ja portinvartija nukkuu." ja = lauseen alku (0,0 s), portinvartija = pitkä sana (0,3 s), nukkuu = lyhyt (1,7 s).
            var k = K("Ja portinvartija nukkuu.");
            var p = new float[Kasvoilme.Nimet.Length];
            Kasvoilme.Korostus(k, 0.02, p);
            Oleta.Tosi(p[Kasvoilme.ISisa] > 0.2f, $"lauseen ensimmäinen sana korostuu ({p[Kasvoilme.ISisa]:F2})");
            Kasvoilme.Korostus(k, 0.32, p);
            Oleta.Tosi(p[Kasvoilme.ISisa] > 0.2f, $"pitkä sana korostuu ({p[Kasvoilme.ISisa]:F2})");
            Kasvoilme.Korostus(k, 1.72, p);
            Oleta.Tosi(p[Kasvoilme.ISisa] < 0.05f, $"lyhyt sana keskellä lausetta ei korostu ({p[Kasvoilme.ISisa]:F2})");
            Kasvoilme.Korostus(k, 5.0, p);
            Oleta.Tosi(Array.TrueForAll(p, v => v == 0f), "puheen jälkeen ei korostusta");
            Kasvoilme.Korostus(null, 0.1, p);
            Oleta.Tosi(Array.TrueForAll(p, v => v == 0f), "ilman kohdistusta ei korostusta");
        }

        [Testi] static void KysymysNostaaKulmatLoppuun()
        {
            // "Näetkö sen?" sen 0,7–1,0 s, ? 1,0–1,1 s → kulmat ylhäällä sanan alusta kysymysmerkin loppuun, laskevat KysymysS:ssa.
            var k = K("Näetkö sen?");
            var p = new float[Kasvoilme.Nimet.Length];
            Kasvoilme.Korostus(k, 1.05, p);
            Oleta.Tosi(p[Kasvoilme.IUlkoV] > 0.4f, $"kysymyksen viimeinen sana: ulkokulmat ylhäällä ({p[Kasvoilme.IUlkoV]:F2})");
            Kasvoilme.Korostus(k, 1.1 + Kasvoilme.KysymysS / 2, p);
            Oleta.Tosi(p[Kasvoilme.IUlkoV] > 0.1f && p[Kasvoilme.IUlkoV] < 0.4f, $"lasku kysymyksen jälkeen pehmeä ({p[Kasvoilme.IUlkoV]:F2})");
            var v = K("Näetkö sen.");
            Kasvoilme.Korostus(v, 1.05, p);
            Oleta.Tosi(p[Kasvoilme.IUlkoV] < 0.1f, "väitelause ei nosta kulmia loppuun");
        }

        [Testi] static void LauseAlutKohdistuksesta()
        {
            var a = new double[4];
            int n = Kasvoilme.LauseAlut(K("Hei. Tule! Mitä?"), a);
            Oleta.Tosi(n == 3 && a[0] == 0.0 && Math.Abs(a[1] - 0.5) < 1e-9 && Math.Abs(a[2] - 1.1) < 1e-9, $"kolme lausetta ({n}: {a[0]}, {a[1]}, {a[2]})");
            Oleta.Tosi(Kasvoilme.LauseAlut(null, a) == 0, "ei kohdistusta → ei lauseita");
        }

        [Testi] static void KatseHyppiiRajoissa()
        {
            int hyppyja = 0; float ev = float.NaN, ep = float.NaN;
            for (double t = 0; t < 20; t += 0.01)
            {
                Kasvoilme.Katse(1234, t, double.NaN, out float v, out float p);
                Oleta.Tosi(Math.Abs(v) <= 2.5f + 1e-4f && Math.Abs(p) <= 1.5f + 1e-4f, $"lepokatse rajoissa t={t:F2} ({v:F2}, {p:F2})");
                if (!float.IsNaN(ev) && (Math.Abs(v - ev) > 0.5f || Math.Abs(p - ep) > 0.5f)) hyppyja++;
                ev = v; ep = p;
            }
            Oleta.Tosi(hyppyja >= 8 && hyppyja <= 60, $"pikkuhyppyjä 20 s:ssa {hyppyja} (odotus ~18; siirto 40 ms → 1–4 askelta per hyppy)");
            Kasvoilme.Katse(1234, 7.37, double.NaN, out float a1, out float b1);
            Kasvoilme.Katse(1234, 7.37, double.NaN, out float a2, out float b2);
            Oleta.Tosi(a1 == a2 && b1 == b2, "sama t → sama katse");
        }

        [Testi] static void AjatusKatseLauseenAlussa()
        {
            int sivuun = 0;
            for (int l = 0; l < 30; l++)
            {
                double alku = 3.0 + l * 2.3;
                Kasvoilme.Katse(77, alku + 0.3, alku, out float v, out float p);
                Kasvoilme.Katse(77, alku + 0.3, double.NaN, out float v0, out float p0);
                if (Math.Abs(v - v0) > 8f && p < p0) sivuun++;
                Kasvoilme.Katse(77, alku + Kasvoilme.AjatusS + 0.01, alku, out float v2, out _);
                Kasvoilme.Katse(77, alku + Kasvoilme.AjatusS + 0.01, double.NaN, out float v3, out _);
                Oleta.Tosi(v2 == v3, "ajatuskatse palaa AjatusS:n jälkeen");
            }
            Oleta.Tosi(sivuun >= 12 && sivuun <= 28, $"ajatuskatse noin 2/3 lauseista ({sivuun}/30)");
        }
    }
}
