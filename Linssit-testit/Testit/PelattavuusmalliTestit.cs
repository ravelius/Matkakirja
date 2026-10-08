// PELATTAVUUSMALLIN RAJAT (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 11, Ydin-taso): valo edestä 5 m → epäily
// ≤ 0,6 s; pimeä 0,1 kyyryssä 4 m → ei epäilyä 30 s:ssa; 3 m selän takana → ei havaintoa; pinnat × tila (18 arvoa, kohta 2.2); kivellä
// kävely 2,4 m → tutkii, 2,6 m → ei, eri osa ei kuule (v44v-osat); vaiheiden kestot ±0,1 s (kohta 3.3) ja valppaus 60 s; varoitus
// ennen jokaista kiinniottoa kaikilla profiileilla (1 000 siemenajoa). Täydentää VartijaTestit- ja AskelaaniTestit-tiedostoja.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class PelattavuusmalliTestit
    {
        const double Dt = 1 / 30.0;
        static readonly List<(double, double, double)> Paikallaan = new List<(double, double, double)> { (0, 0, 1e9) };

        /// <summary>Ajaa vartijaa (liike kohteeseen Vauhdilla) syötteellä; palauttaa ajan, jolloin ehto täyttyi (−1 = ei koskaan).</summary>
        static double Aja(Vartija v, ref double x, ref double z, Func<double, VartijanSyote> syote, double sekuntia, Func<Vartija, bool> ehto = null)
        {
            for (double t = 0; t < sekuntia; t += Dt)
            {
                var s = syote(t); s.VartijaX = x; s.VartijaZ = z;
                v.Paivita(Dt, s);
                if (ehto != null && ehto(v)) return t + Dt;
                double dx = v.KohdeX - x, dz = v.KohdeZ - z, d = Math.Sqrt(dx * dx + dz * dz);
                if (d > 1e-6 && v.Vauhti > 0) { double a = Math.Min(d, v.Vauhti * Dt); x += dx / d * a; z += dz / d * a; v.Yaw = Math.Atan2(dx, dz) * 180 / Math.PI; }
            }
            return -1;
        }

        static VartijanSyote Pelaaja(double px, double pz, double valo, double vauhti, bool hiipii = false, bool nakyy = true) =>
            new VartijanSyote { PelaajaX = px, PelaajaZ = pz, Valoisuus = valo, PelaajaVauhti = vauhti, Hiipii = hiipii, NakolinjaVapaa = nakyy };

        [Testi] static void ValoEdesta5mEpailyAlle06s()
        {
            var v = new Vartija(Paikallaan, yaw: 0); double x = 0, z = 0;
            double t = Aja(v, ref x, ref z, _ => Pelaaja(0, 5, 1.0, Kavely.KavelyMs), 5, w => w.Tila == VartijanTila.Epaily);
            Oleta.Tosi(t > 0 && t <= 0.6, $"epäily ≤ 0,6 s ({t:F2} s)");
            // Pelaaja jää seisomaan valoon: kiinniotto vasta varoituksen jälkeen (vaiheissa ≥ 1,5 s, merkki, sydän ≥ 1 s).
            double kiinni = Aja(v, ref x, ref z, _ => Pelaaja(0, 5, 1.0, 0), 15, w => w.Tila == VartijanTila.Kiinni);
            Oleta.Tosi(kiinni > 0 && t + kiinni >= Vartija.VaroitusS && v.Varoitettu && v.SydanS >= Vartija.SydanVahS, $"kiinni varoituksen jälkeen ({t + kiinni:F2} s, sydän {v.SydanS:F2} s)");
        }

        [Testi] static void Pimea01Kyyryssa4mEiEpailya30s()
        {
            foreach (double vauhti in new[] { 0.0, Kavely.HiipiminenMs })
            {
                var v = new Vartija(Paikallaan, yaw: 0); double x = 0, z = 0;
                double t = Aja(v, ref x, ref z, _ => Pelaaja(0, 4, 0.1, vauhti, hiipii: true), 30, w => w.Mittari > 0 || w.Tila != VartijanTila.Partio);
                Oleta.Tosi(t < 0, $"kyyryssä 4 m, valoisuus 0,1, vauhti {vauhti}: ei havaintoa ({t:F2} s, mittari {v.Mittari:F2})");
            }
        }

        [Testi] static void Takana3mEiHavaintoa()
        {
            var v = new Vartija(Paikallaan, yaw: 0); double x = 0, z = 0;
            double t = Aja(v, ref x, ref z, _ => Pelaaja(0, -3, 1.0, Kavely.KavelyMs), 30, w => w.Mittari > 0 || w.Tila != VartijanTila.Partio);
            Oleta.Tosi(t < 0, $"3 m takana valossa kävellen: ei havaintoa ({t:F2} s)");
        }

        [Testi] static void PinnatTaulukonMukaan()
        {
            // Pelattavuusmalli 2.2: pinta → hiivintä, kävely, juoksu (m).
            var taulu = new Dictionary<string, (double, double, double)>
            {
                ["kivi"] = (0, 2.5, 6), ["porras"] = (0, 2.5, 6), ["puu"] = (1.0, 3.5, 8), ["olki"] = (0, 1.5, 4), ["sora"] = (0.5, 3.0, 7), ["vesi"] = (2.0, 5.0, 10),
            };
            Oleta.Sama(taulu.Count, Askelaani.Pinnat.Count);
            foreach (var kv in taulu)
            {
                Oleta.Sama(kv.Value.Item1, Askelaani.Sade(kv.Key, Liiketapa.Hiipiminen), kv.Key + " hiivintä");
                Oleta.Sama(kv.Value.Item2, Askelaani.Sade(kv.Key, Liiketapa.Kavely), kv.Key + " kävely");
                Oleta.Sama(kv.Value.Item3, Askelaani.Sade(kv.Key, Liiketapa.Juoksu), kv.Key + " juoksu");
            }
        }

        static VartijanTila Kuulee(double etaisyys, string lahdeOsa, string kuulijaOsa)
        {
            var d = Huonesimulaatio.Data; double r = Askelaani.Kuuluvuus(d, Askelaani.Sade("kivi", Liiketapa.Kavely), lahdeOsa, kuulijaOsa);
            var v = new Vartija(Paikallaan, yaw: 0);
            var s = new VartijanSyote { PelaajaX = 50, PelaajaZ = 50, Valoisuus = 1, Aanet = r > 0 ? new List<Aanilahde> { new Aanilahde(etaisyys, 0, r) } : new List<Aanilahde>() };
            v.Paivita(Dt, s);
            return v.Tila;
        }

        [Testi] static void KivellaKavely24TutkiiJa26Ei()
        {
            Oleta.Sama(VartijanTila.Etsinta, Kuulee(2.4, "pikkupiha", "pikkupiha"));
            Oleta.Sama(VartijanTila.Partio, Kuulee(2.6, "pikkupiha", "pikkupiha"));
            Oleta.Sama(VartijanTila.Etsinta, Kuulee(1.0, "pikkupiha", "keittio-G102"));   // naapuriosaan puolet: 1,25 m
            Oleta.Sama(VartijanTila.Partio, Kuulee(1.5, "pikkupiha", "keittio-G102"));
            Oleta.Sama(VartijanTila.Partio, Kuulee(1.0, "tyrma-E101", "pikkupiha"));      // eri osa, ei naapuri: ei kuulu
        }

        // Kohta 3.3: vaihe 1 → (ei näe 2 s) → 2 Tutkii (6 s paikalla) → 3 Etsii (15 s) → Paluu + valppaus 60 s; vaihe 4 Hälytys ≤ 20 s.
        [Testi] static void VaiheidenKestot()
        {
            const double Tol = 0.1;
            // Epäily: pelaaja näkyy 4 m edessä, kunnes mittari ≥ 0,6, sitten katoaa: epäily päättyy 2,0 s viimeisestä havainnosta.
            var v = new Vartija(Paikallaan, yaw: 0); double x = 0, z = 0; bool nakyy = true;
            v.Piilot.Add((5.5, 4)); v.Piilot.Add((-5.5, 4));   // etsittävät ≤ 6 m, kaukana toisistaan: kierros ei ehdi 15 s:ssa
            Aja(v, ref x, ref z, _ => Pelaaja(0, 4, 0.6, 0, nakyy: nakyy), 5, w => w.Mittari >= 0.62);
            Oleta.Sama(VartijanTila.Epaily, v.Tila);
            nakyy = false;
            double epaily = Aja(v, ref x, ref z, _ => Pelaaja(0, 4, 0.6, 0, nakyy: false), 10, w => w.Tila != VartijanTila.Epaily);
            Oleta.Tosi(Math.Abs(epaily - Vartija.EpailyUnohdusS) <= Tol && v.Tila == VartijanTila.Etsinta, $"epäily → tutkii {epaily:F2} s ({v.Tila})");
            // Tutkii: kävelee paikalle ja katselee 6 s.
            Aja(v, ref x, ref z, _ => Pelaaja(0, 4, 0.6, 0, nakyy: false), 10, w => w.Vauhti == 0);
            double tutkii = Aja(v, ref x, ref z, _ => Pelaaja(0, 4, 0.6, 0, nakyy: false), 15, w => w.Tila != VartijanTila.Etsinta);
            Oleta.Tosi(Math.Abs(tutkii - Vartija.EtsintaKatseluS) <= Tol + Dt && v.Tila == VartijanTila.Etsii, $"tutkii paikalla {tutkii:F2} s → {v.Tila}");
            // Etsii: 2 lähintä piiloa, enintään 15 s, sitten paluu ja valppaus 60 s.
            double etsii = Aja(v, ref x, ref z, _ => Pelaaja(0, 4, 0.6, 0, nakyy: false), 30, w => w.Tila != VartijanTila.Etsii);
            Oleta.Tosi(Math.Abs(etsii - Vartija.EtsiiS) <= Tol, $"etsii {etsii:F2} s");
            Oleta.Tosi(Math.Abs(v.Valppaus - Vartija.ValppausS) <= Tol, $"valppaus alkaa 60 s ({v.Valppaus:F2})");
            double valpas = Aja(v, ref x, ref z, _ => Pelaaja(50, 50, 0.6, 0, nakyy: false), 70, w => w.Valppaus <= 0);
            Oleta.Tosi(Math.Abs(valpas - Vartija.ValppausS) <= Tol + Dt, $"valppaus kestää {valpas:F2} s");
            // Hälytys: pelaaja juoksee karkuun näkyvissä (3,2 m/s > jahti 2,2 m/s): jahti päättyy viimeistään 20 s:ssa.
            var h = new Vartija(Paikallaan, yaw: 0); x = 0; z = 0; double pz = 3;
            Aja(h, ref x, ref z, _ => Pelaaja(0, pz, 1, 0), 10, w => w.Tila == VartijanTila.Halytys);
            Oleta.Sama(VartijanTila.Halytys, h.Tila);
            double jahti = Aja(h, ref x, ref z, _ => { pz += Kavely.JuoksuMs * Dt; return Pelaaja(0, pz, 1, Kavely.JuoksuMs); }, 30, w => w.Tila != VartijanTila.Halytys);
            Oleta.Tosi(jahti > 0 && jahti <= Vartija.HalytysS + Tol, $"hälytys ≤ 20 s ({jahti:F2} s → {h.Tila})");
        }

        // Kohta 3.3: valppaana epäily alkaa jo mittarista 0,2 ja näkö on 12 m.
        [Testi] static void ValppaanaRaja02JaNako12m()
        {
            var v = new Vartija(Paikallaan, yaw: 0); v.Nollaa(0, 0, valpas: true); double x = 0, z = 0;
            Oleta.Tosi(v.NakoVoima(new VartijanSyote { PelaajaZ = 11.5, NakolinjaVapaa = true, Valoisuus = 1, PelaajaVauhti = Kavely.KavelyMs }) > 0, "valpas näkee 11,5 m:stä");
            Oleta.Sama(0.0, new Vartija(Paikallaan, yaw: 0).NakoVoima(new VartijanSyote { PelaajaZ = 11.5, NakolinjaVapaa = true, Valoisuus = 1, PelaajaVauhti = Kavely.KavelyMs }));
            double mittari = -1;
            Aja(v, ref x, ref z, _ => Pelaaja(0, 6, 1, Kavely.KavelyMs), 5, w => { if (w.Tila == VartijanTila.Epaily) { mittari = w.Mittari; return true; } return false; });
            Oleta.Tosi(mittari >= Vartija.ValpasRaja && mittari < Vartija.EpailyRaja, $"valppaana epäily mittarista 0,2 ({mittari:F2})");
        }

        // Kohta 11: 1 000 satunnaista ajoa kaikilla profiileilla (myös torkkuja, syöjä, helpotettu, valpas, riita): ei kiinniottoa ilman
        // 1,5 s:n vaiheita, merkkiä ja sydäntä; kokki, apulainen ja renki eivät ota kiinni koskaan.
        [Testi] static void VaroitusKaikillaProfiileilla()
        {
            var profiilit = new[] { VartijaProfiili.Vartija, VartijaProfiili.Portinvartija, VartijaProfiili.Torkku, VartijaProfiili.Kokki, VartijaProfiili.Apulainen, VartijaProfiili.Renki };
            var r = new Random(11); int kiinni = 0; var reitti = new List<(double, double, double)> { (0, 0, 2), (0, 8, 2) };
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var p = profiilit[ajo % profiilit.Length];
                var v = new Vartija(reitti, yaw: r.NextDouble() * 360 - 180) { Profiili = p, Helpotettu = r.Next(4) == 0 };
                if (p == VartijaProfiili.Torkku) { v.Torkkuu = r.Next(2) == 0; v.Syo = v.Torkkuu && r.Next(2) == 0; }
                if (r.Next(3) == 0) v.Nollaa(0, 0, valpas: true);
                if (r.Next(4) == 0) v.AloitaRiita(5, 0, 2 + r.NextDouble() * 10);
                double x = 0, z = 0, px = r.NextDouble() * 8 - 4, pz = r.NextDouble() * 12 - 2, valo = r.NextDouble(); bool hiipii = r.Next(2) == 0;
                double vaiheissa = 0, sydan = 0; bool merkki = false;
                for (double t = 0; t < 12 && v.Tila != VartijanTila.Kiinni; t += Dt)
                {
                    px += (r.NextDouble() - 0.5) * 0.25; pz += (r.NextDouble() - 0.5) * 0.25;
                    var aanet = r.Next(60) == 0 ? new List<Aanilahde> { new Aanilahde(px, pz, 2.5) } : null;
                    var s = new VartijanSyote { VartijaX = x, VartijaZ = z, PelaajaX = px, PelaajaZ = pz, NakolinjaVapaa = r.NextDouble() > 0.05, Valoisuus = valo, Hiipii = hiipii,
                        PelaajaVauhti = r.NextDouble() * 3, Aanet = aanet, Piilossa = r.Next(40) == 0 };
                    v.Paivita(Dt, s);
                    if (v.Tila == VartijanTila.Partio || v.Tila == VartijanTila.Paluu) { vaiheissa = 0; merkki = false; } else if (v.Tila != VartijanTila.Kiinni) vaiheissa += Dt;
                    if (v.Tila == VartijanTila.Epaily || v.Tila == VartijanTila.Etsinta || v.Tila == VartijanTila.Halytys) merkki = true;
                    sydan = v.SydanS;
                    double dx = v.KohdeX - x, dz = v.KohdeZ - z, d = Math.Sqrt(dx * dx + dz * dz);
                    if (d > 1e-6 && v.Vauhti > 0) { double a = Math.Min(d, v.Vauhti * Dt); x += dx / d * a; z += dz / d * a; v.Yaw = Math.Atan2(dx, dz) * 180 / Math.PI; }
                }
                if (v.Tila != VartijanTila.Kiinni) continue;
                kiinni++;
                Oleta.Tosi(p.Ottaa, $"ajo {ajo}: {p.Nimi} otti kiinni");
                Oleta.Tosi(vaiheissa >= Vartija.VaroitusS - Dt && merkki && sydan >= Vartija.SydanVahS - Dt, $"ajo {ajo} ({p.Nimi}): kiinni ilman varoitusta (vaiheissa {vaiheissa:F2} s, sydän {sydan:F2} s)");
            }
            Oleta.Tosi(kiinni > 30, $"kiinniottoja syntyi ({kiinni})");
        }
    }
}
