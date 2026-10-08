// OLAVINLINNAN ENSIMMÄINEN PALA (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 11, huonesimulaatio): koko reitti
// laituri → keittiö → Kirkkotorni → kappelin ovi (reitti:pelaaja-1…20) Thief-ajurilla (ThiefAjuri.cs) ja valossa kävellen, harhautus
// 6 m:stä ja Pulun automaattinen vihje 180 s:n jumissa. Maailma: Huonesimulaatio.cs (v44v-data, sovittimen säännöt).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaPalaTestit
    {
        const double Dt = Huonesimulaatio.Dt;
        public const int PalaLoppu = 19;   // reitti:pelaaja-20 (0-pohjainen)

        [Testi] static void VarjoreittiKokoPala()
        {
            var w = Huonesimulaatio.Uusi();
            Oleta.Tosi(Huonesimulaatio.Reitti.Count > PalaLoppu, $"reitti:pelaaja-1…20 ({Huonesimulaatio.Reitti.Count})");
            var tulos = ThiefAjuri.Aja(w, 1, PalaLoppu); var loppu = tulos.Loppu;
            double sujuva = ThiefAjuri.Sujuva(0, PalaLoppu, Kavely.HiipiminenMs);
            if (loppu == null) { Console.WriteLine($"      jumissa pisteessä {tulos.Pisin + 1}:"); ThiefAjuri.Tulosta(tulos.PisinTila); }
            else Console.WriteLine($"      varjoreitti {loppu.T:F0} s (sujuva {sujuva:F0} s, 2 × {2 * sujuva:F0} s), kiinni {loppu.Kiinni}: {string.Join(", ", tulos.Loki)}");
            Oleta.Tosi(loppu != null, $"ajuri pääsi pisteeseen {tulos.Pisin + 1}/{PalaLoppu + 1} ilman epäilyä");
            Oleta.Tosi(loppu.Kiinni == 0 && loppu.Annettu, $"0 kiinnijääntiä ({loppu.Kiinni}), tarjotin annettu ({loppu.Annettu})");
            Oleta.Tosi(loppu.T <= 2 * sujuva, $"aika {loppu.T:F0} s ≤ 2 × sujuva {sujuva:F0} s");
        }

        [Testi] static void ValoreittiKiinniVaroituksenJalkeen()
        {
            // Sama reitti kävellen pysähtymättä: ensimmäinen kiinniotto ≤ 10 s ensimmäisestä epäilystä, aina varoituksen jälkeen.
            var w = Huonesimulaatio.Uusi(); double kiinniT = -1;
            for (int k = 1; k <= PalaLoppu && kiinniT < 0 && w.T < 300; k++)
                for (int i = 0; i < 6000 && kiinniT < 0; i++) { if (w.Askel(Huonesimulaatio.Reitti[k], false)) break; if (w.Kiinni > 0) kiinniT = w.T; }
            Console.WriteLine($"      valoreitti: ensimmäinen epäily {w.EnsiHavainto:F1} s, kiinni {kiinniT:F1} s");
            Oleta.Tosi(kiinniT > 0 && w.EnsiHavainto >= 0, "valossa kävellen jää kiinni");
            Oleta.Tosi(kiinniT - w.EnsiHavainto <= 10, $"kiinni ≤ 10 s epäilystä ({kiinniT - w.EnsiHavainto:F1} s)");
            Oleta.Tosi(!w.VaroitusRikki, "varoitus ennen kiinniottoa");
        }

        /// <summary>Kolahdus 6 m:n päähän hahmosta (sivulta): kääntymisaika ja (liikkuvalla) perilläoloaika.</summary>
        static (double Kaantyy, double Perilla) Harhauta(string nimi, double kulma)
        {
            var w = Huonesimulaatio.Uusi(); var h = w.Hae(nimi);
            for (int i = 0; i < 600 && (h.Aivot.Vauhti > 0 || h.Aivot.Tila != VartijanTila.Partio); i++) w.Odota(true);   // odottaa pisteessä
            double a = (h.Aivot.Yaw + kulma) * Math.PI / 180, x = h.X + 6 * Math.Sin(a), z = h.Z + 6 * Math.Cos(a);
            w.Jono.Add(new Aanilahde(x, z, Huonesimulaatio.HeittoAaniM, Askelaani.Osa(Huonesimulaatio.Data, h.X, h.Y, h.Z)));
            double t0 = w.T, kaantyy = -1, perilla = -1;
            for (int i = 0; i < 300 && perilla < 0; i++)
            {
                w.Odota(true);
                double suunta = Math.Atan2(x - h.X, z - h.Z) * 180 / Math.PI, ero = Math.Abs(((suunta - h.Aivot.Yaw) % 360 + 540) % 360 - 180);
                if (kaantyy < 0 && ero <= 20) kaantyy = w.T - t0;
                if (Huonesimulaatio.Etaisyys2(h.X, h.Z, x, z) <= Vartija.PerillaM + 0.05) perilla = w.T - t0;
            }
            return (kaantyy, perilla);
        }

        [Testi] static void HarhautusKaantaaJaTuoPaikalle()
        {
            var (k, p) = Harhauta("piha", 90);
            Console.WriteLine($"      pihan vartija: kääntyy {k:F2} s, paikalla {p:F2} s");
            Oleta.Tosi(k >= 0 && k <= 1, $"pihan vartija kääntyy ≤ 1 s ({k:F2})");
            Oleta.Tosi(p >= 0 && p <= 5, $"pihan vartija paikalla ≤ 5 s ({p:F2})");
            var (kk, _) = Harhauta("keittio", 90);
            var (kt, _) = Harhauta("keittio", 180);
            Console.WriteLine($"      kokki: kääntyy sivulta {kk:F2} s, takaa {kt:F2} s (160°/s)");
            Oleta.Tosi(kk >= 0 && kk <= 1, $"kokki kääntyy sivulta ≤ 1 s ({kk:F2})");
        }

        [Testi] static void JumiPaikallaPuluTaso2Kerran()
        {
            // Pelaaja kyyryssä pöydän alla keittiössä (kokki kulkee 1 m:n päästä) 400 s: Pulu antaa tason 2 kerran 180 s:n jälkeen,
            // ei koskaan vaarassa (hahmo vaiheissa 1–5 alle 15 m:ssä tai sydän lyö), eikä kukaan huomaa piilossa olevaa.
            var w = Huonesimulaatio.Uusi(); KavelyMerkki poyta = null;
            foreach (var m in Huonesimulaatio.Data.Lajia("piilo")) if (m.Tunnus == "poydan-alla") poyta = m;
            (w.PX, w.PY, w.PZ) = (poyta.X, poyta.Y, poyta.Z);
            var v = new Vihjeet(); v.UusiHuone(); int annettu = 0; double ensin = -1;
            for (double t = 0; t < 400; t += Dt)
            {
                w.Odota(true);
                bool vaara = false;
                foreach (var h in w.Hahmot)
                    if (h.Aivot.SydanS > 0 || h.Aivot.Tila != VartijanTila.Partio && h.Aivot.Tila != VartijanTila.Paluu && Huonesimulaatio.Etaisyys3(h.X, h.Y, h.Z, w.PX, w.PY, w.PZ) < 15) vaara = true;
                if (v.Paivita(Dt, vaara, false) == 2) { annettu++; if (ensin < 0) ensin = t; Oleta.Tosi(!vaara, "ei vihjettä vaarassa"); }
            }
            Console.WriteLine($"      Pulu: taso 2 {annettu} kertaa, ensimmäinen {ensin:F0} s");
            Oleta.Sama(1, annettu);
            Oleta.Tosi(ensin >= Vihjeet.JumiS - 0.1, $"vasta 180 s:n jälkeen ({ensin:F0} s)");
            Oleta.Sama(0, w.Kiinni);
            foreach (var h in w.Hahmot) Oleta.Tosi(h.Aivot.Mittari < 0.05, $"{h.Nimi} ei huomannut piiloa ({h.Aivot.Mittari:F2})");
        }
    }
}
