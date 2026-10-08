// OLAVINLINNAN ENSIMMÄINEN PALA (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 11, huonesimulaatio): koko reitti
// laituri → keittiö → Kirkkotorni → kappelin ovi (reitti:pelaaja-1…20) Thief-ajurilla ja valossa kävellen, harhautus 6 m:stä ja
// Pulun automaattinen vihje 180 s:n jumissa. Maailma: Huonesimulaatio.cs (v44z-data, sovittimen säännöt).
// Thief-ajuri: ennen jokaista reittipistettä se kokeilee kopiolla odotusta (0,5 s:n askelin) paikallaan tai lähimmässä piilossa,
// hiipien (tarjotin kädessä myös kävellen) ja tarvittaessa heittoa tai patapinon kaatoa; valitsee nopeimman turvallisen (kukaan ei
// epäile: mittari < 0,15, ei epäilyä eikä hälytystä) ja palaa taaksepäin, jos seuraava piste ei onnistu.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaPalaTestit
    {
        const int PalaPisteita = 20;   // reitti:pelaaja-1…20 (v44v+ jatkuu M-osaan)
        const double Dt = Huonesimulaatio.Dt, MaxOdotus = 42, OdotusAskel = 0.5, Jalkeen = 0.5, PiiloSade = 5;

        sealed class Suunnitelma { public KavelyMerkki Piilo, Esine; public (double X, double Y, double Z) Kohde; public double Odotus; public bool Hiipii; public Huonesimulaatio Tulos; public double Aika; }

        static bool Turvallinen(Huonesimulaatio w, int kiinni0)
        {
            if (w.Kiinni != kiinni0) return false;
            foreach (var h in w.Hahmot)
            {
                if (h.Aivot.Mittari >= 0.15 || h.Aivot.Tila == VartijanTila.Epaily || h.Aivot.Tila == VartijanTila.Halytys) return false;
                // Tutkii tai etsii pelaajan luota (askeleet, herännyt torkkuja); harhautuksen kolahdus muualla on sallittu.
                // Tarjotin kädessä kävelevää kulkuluvan hahmo ei näe, vaikka tulisi askelten luo (Vartija.NakoVoima), joten se sallitaan.
                bool lupa = w.Tarjotin && !w.Hiipii && h.Aivot.Profiili.TarjotinLupa && h.Aivot.Profiili != VartijaProfiili.Torkku;   // herännyt torkkuja ei ota eväitä
                if (!lupa && (h.Aivot.Tila == VartijanTila.Etsinta || h.Aivot.Tila == VartijanTila.Etsii) && Huonesimulaatio.Etaisyys2(h.Aivot.EpailyX, h.Aivot.EpailyZ, w.PX, w.PZ) < 3) return false;
            }
            return true;
        }

        /// <summary>Liikkuu kohteeseen; tarkka = keskeytä heti, jos joku epäilee.</summary>
        static bool Kulje(Huonesimulaatio w, (double X, double Y, double Z) q, bool hiipii, bool tarkka, int kiinni0)
        {
            for (int i = 0; i < 6000; i++) { if (w.Askel(q, hiipii)) return true; if (tarkka && !Turvallinen(w, kiinni0)) return false; }
            return false;
        }

        static bool OdotaS(Huonesimulaatio w, double s, bool hiipii, bool tarkka, int kiinni0)
        {
            for (double t = 0; t < s - 1e-9; t += Dt) { w.Odota(hiipii); if (tarkka && !Turvallinen(w, kiinni0)) return false; }
            return true;
        }

        /// <summary>Kaikki turvalliset tavat päästä reittipisteeseen k: ensimmäinen turvallinen odotus kullekin piilo × tapa × harhautus.</summary>
        static List<Suunnitelma> Ehdokkaat(Huonesimulaatio w, int k)
        {
            var q = Huonesimulaatio.Reitti[k]; var ulos = new List<Suunnitelma>(); int k0 = w.Kiinni;
            var piilot = new List<KavelyMerkki> { null };
            foreach (var m in Huonesimulaatio.Data.Lajia("piilo"))
                if (m.Y > Math.Min(w.PY, q.Y) - 1.5 && m.Y < Math.Max(w.PY, q.Y) + 1.5 && (Huonesimulaatio.Etaisyys2(m.X, m.Z, w.PX, w.PZ) < PiiloSade || Huonesimulaatio.Etaisyys2(m.X, m.Z, q.X, q.Z) < PiiloSade)) piilot.Add(m);
            var esineet = new List<(KavelyMerkki E, (double, double, double) Kohde)> { (null, default) };
            foreach (var e in w.Ulottuvilla())
            {
                if (e.Kaadettava) { esineet.Add((e, (e.X, e.Y, e.Z))); continue; }
                // Heitto 3–9 m: kohteiksi saman osan merkit (esineet, partiopisteet, piilot), kaukaisin pelaajan seuraavasta pisteestä ensin.
                string osa = Askelaani.Osa(Huonesimulaatio.Data, w.PX, w.PY, w.PZ); var kohteet = new List<KavelyMerkki>();
                foreach (var m in Huonesimulaatio.Data.Merkit)
                {
                    double d = Huonesimulaatio.Etaisyys2(m.X, m.Z, w.PX, w.PZ);
                    if ((m.Laji == "esine" || m.Laji == "partio" || m.Laji == "piilo") && d >= 3 && d <= 9 && Askelaani.Osa(Huonesimulaatio.Data, m.X, m.Y, m.Z) == osa) kohteet.Add(m);
                }
                kohteet.Sort((a, b) => Huonesimulaatio.Etaisyys2(b.X, b.Z, q.X, q.Z).CompareTo(Huonesimulaatio.Etaisyys2(a.X, a.Z, q.X, q.Z)));
                for (int i = 0; i < kohteet.Count && i < 2; i++) esineet.Add((e, (kohteet[i].X, kohteet[i].Y, kohteet[i].Z)));
            }
            var tavat = w.Tarjotin ? new[] { false, true } : new[] { true };
            // Tarjotin torkkuvalle: pisteessä, jonka vieressä torkkuja istuu, eväät on annettava (muuten tarjotin jää käteen).
            bool anna = false;
            foreach (var h in w.Hahmot) if (w.Tarjotin && h.Aivot.Profiili == VartijaProfiili.Torkku && Huonesimulaatio.Etaisyys3(h.X, h.Y, h.Z, q.X, q.Y, q.Z) < Huonesimulaatio.AnnaM + 0.5) anna = true;
            foreach (var (esine, kohde) in esineet)
            {
                foreach (var piilo in piilot)
                    foreach (bool hiipii in tavat)
                    {
                        var pohja = w.Kopioi();
                        if (esine != null) pohja.Kayta(esine, kohde);
                        if (piilo != null && !Kulje(pohja, (piilo.X, piilo.Y, piilo.Z), true, true, k0)) continue;
                        bool odottaaHiipien = hiipii || piilo != null;
                        double viime = double.NegativeInfinity; int loydetty = 0;
                        for (double odotus = 0; odotus <= MaxOdotus && loydetty < 10; odotus += OdotusAskel)
                        {
                            if (odotus - viime < 1.5) { if (!OdotaS(pohja, OdotusAskel, odottaaHiipien, true, k0)) break; continue; }
                            var koe = pohja.Kopioi(); koe.Seuraava = k;
                            if (Kulje(koe, q, hiipii, true, k0))
                            {
                                koe.Toiminnot();
                                if ((!anna || koe.Annettu) && OdotaS(koe, Jalkeen, hiipii, true, k0))
                                {
                                    koe.Seuraava = k + 1;
                                    ulos.Add(new Suunnitelma { Piilo = piilo, Esine = esine, Kohde = kohde, Odotus = odotus, Hiipii = hiipii, Tulos = koe, Aika = koe.T });
                                    viime = odotus; loydetty++;
                                }
                            }
                            if (!OdotaS(pohja, OdotusAskel, odottaaHiipien, true, k0)) break;
                        }
                    }
                if (ulos.Count > 0) break;   // harhautus vain, jos ilman sitä ei mene
            }
            ulos.Sort((a, b) => a.Aika.CompareTo(b.Aika));
            return ulos;
        }

        static string Kuvaus(Suunnitelma s, int k) =>
            $"→{k + 1}" + (s.Esine != null ? $" {(s.Esine.Kaadettava ? "kaada" : "heitä")} {s.Esine.Tunnus}" : "") + (s.Piilo != null ? $" piilo {s.Piilo.Tunnus}" : "")
            + (s.Odotus > 0 ? $" odota {s.Odotus:F1} s" : "") + (s.Hiipii ? "" : " kävellen");

        static readonly HashSet<(int, int)> kayty = new HashSet<(int, int)>();
        static Huonesimulaatio Ratkaise(Huonesimulaatio w, int k, List<string> loki, ref int budjetti, ref (int K, Huonesimulaatio W) pisin)
        {
            if (k >= PalaPisteita) return w;
            if (k > pisin.K) pisin = (k, w);
            if (!kayty.Add((k, (int)Math.Round(w.T * 2)))) return null;   // sama piste samaan aikaan (0,5 s) jo kokeiltu
            var ehdokkaat = Ehdokkaat(w, k);
            for (int i = 0; i < ehdokkaat.Count && i < 10 && budjetti > 0; i++)
            {
                budjetti--;
                var r = Ratkaise(ehdokkaat[i].Tulos, k + 1, loki, ref budjetti, ref pisin);
                if (r != null) { loki.Insert(0, Kuvaus(ehdokkaat[i], k)); return r; }
            }
            return null;
        }

        static double Sujuva(double nopeus)
        {
            var r = Huonesimulaatio.Reitti; double s = 0;
            for (int i = 1; i < PalaPisteita; i++) s += Huonesimulaatio.Etaisyys2(r[i].X, r[i].Z, r[i - 1].X, r[i - 1].Z);
            return s / nopeus;
        }

        static void Tulosta(Huonesimulaatio w)
        {
            Console.WriteLine($"      pelaaja ({w.PX:F1}, {w.PY:F1}, {w.PZ:F1}) seuraava {w.Seuraava + 1}, valoisuus {w.Valoisuus():F2}, t {w.T:F0} s");
            foreach (var h in w.Hahmot) Console.WriteLine($"        {h.Nimi} ({h.X:F1}, {h.Y:F1}, {h.Z:F1}) {h.Aivot.Tila} mittari {h.Aivot.Mittari:F2} yaw {h.Aivot.Yaw:F0}{(h.Aivot.Torkkuu ? " torkkuu" : "")}{(h.Aivot.Syo ? " syö" : "")}");
        }

        [Testi] static void VarjoreittiKokoPala()
        {
            var w = Huonesimulaatio.Uusi(); var loki = new List<string>(); int budjetti = 400; kayty.Clear(); (int K, Huonesimulaatio W) pisin = (0, w);
            Oleta.Tosi(Huonesimulaatio.Reitti.Count >= 20, $"reitti:pelaaja-1…20 ({Huonesimulaatio.Reitti.Count})");
            var loppu = Ratkaise(w, 1, loki, ref budjetti, ref pisin);
            double sujuva = Sujuva(Kavely.HiipiminenMs);
            if (loppu == null) { Console.WriteLine($"      jumissa pisteessä {pisin.K + 1}:"); Tulosta(pisin.W); }
            else Console.WriteLine($"      varjoreitti {loppu.T:F0} s (sujuva {sujuva:F0} s, 2 × {2 * sujuva:F0} s), kiinni {loppu.Kiinni}: {string.Join(", ", loki)}");
            Oleta.Tosi(loppu != null, $"ajuri pääsi pisteeseen {pisin.K + 1}/{PalaPisteita} ilman epäilyä");
            Oleta.Tosi(loppu.Kiinni == 0 && loppu.Annettu, $"0 kiinnijääntiä ({loppu.Kiinni}), tarjotin annettu ({loppu.Annettu})");
            Oleta.Tosi(loppu.T <= 2 * sujuva, $"aika {loppu.T:F0} s ≤ 2 × sujuva {sujuva:F0} s");
        }

        [Testi] static void ValoreittiKiinniVaroituksenJalkeen()
        {
            // Sama reitti kävellen pysähtymättä: ensimmäinen kiinniotto ≤ 10 s ensimmäisestä epäilystä, aina varoituksen jälkeen.
            var w = Huonesimulaatio.Uusi(); double kiinniT = -1;
            for (int k = 1; k < PalaPisteita && kiinniT < 0 && w.T < 300; k++)
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
