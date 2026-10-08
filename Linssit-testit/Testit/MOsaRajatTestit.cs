// M-OSAN RAJAT (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohdat 2.6 ja 8.2 huoneet 6–9): Kiipeily (0,6 s per ote,
// aloitettu siirtymä loppuun, puuska 1,5 + 2,5 s kerran per ote, lipsahdus pitää ja toinen pudottaa alkuun 0,4 s:n himmennyksellä,
// lyhty 2 + 4 s), satunnaiset syötteet ilman jumia, Kilpilukko (45° ±10°), Tiilet (6 × 2, ensimmäinen putoaa, kurkistus 10 s),
// LukittuOvi, naamio (kulkulupa, kokki tuntee, apulainen tunnistaa 2 m / 2 s, linnaväki ei ota kiinni) ja varoitus kaikilla M-profiileilla.
// Täydentää MOsaTestit.cs:n perustestejä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class MOsaRajatTestit
    {
        const double Dt = 1 / 60.0, Tol = 0.05;

        /// <summary>Ajaa kiipeilyä vakiosyötteellä, kunnes ehto täyttyy; palauttaa kuluneen ajan (−1 = ei täyttynyt).</summary>
        static double Aja(Kiipeily k, int suunta, double max, Func<Kiipeily, bool> ehto)
        {
            for (double t = 0; t < max; t += Dt) { k.Paivita(Dt, suunta); if (ehto(k)) return t + Dt; }
            return -1;
        }

        [Testi] static void KiipeilyOte06sJaSiirtymaLoppuun()
        {
            var k = new Kiipeily(10);
            double t = Aja(k, 1, 2, x => x.Ote == 1);
            Oleta.Tosi(Math.Abs(t - Kiipeily.OteS) <= Tol, $"ote 0,6 s ({t:F3})");
            k.Paivita(Dt, 1); double alku = Dt;
            double loppu = Aja(k, 0, 2, x => x.Ote == 2);
            Oleta.Tosi(Math.Abs(alku + loppu - Kiipeily.OteS) <= Tol, $"aloitettu siirtymä loppuun ilman syötettä ({alku + loppu:F3})");
            double perille = Aja(k, 1, 10, x => x.Perilla);
            Oleta.Tosi(Math.Abs(perille - 7 * Kiipeily.OteS) <= 0.1, $"loput 7 otetta + kynnys ({perille:F2} s)");
            var b = new Kiipeily(3); Oleta.Tosi(Aja(b, -1, 2, x => x.Siirtyy != 0) < 0 && b.Ote == 0, "ensimmäiseltä otteelta ei taaksepäin");
        }

        [Testi] static void PuuskaVaroitus15JaKesto25KerranPerOte()
        {
            var k = new Kiipeily(6, new[] { 2 });
            Aja(k, 1, 5, x => x.Ote == 2);
            Oleta.Tosi(k.PuuskaVaroittaa, "otteelle 2 tultaessa varoitus");
            double v = Aja(k, 0, 5, x => x.Puuska);
            double p = Aja(k, 0, 5, x => !x.Puuska);
            Oleta.Tosi(Math.Abs(v - Kiipeily.PuuskaVaroitusS) <= Tol && Math.Abs(p - Kiipeily.PuuskaS) <= Tol, $"varoitus {v:F2} s, puuska {p:F2} s");
            Oleta.Tosi(k.Lipsahdukset == 0 && !k.Lipsahti, "paikallaan ei lipsu");
            Aja(k, -1, 2, x => x.Ote == 1); Aja(k, 1, 2, x => x.Ote == 2);
            Oleta.Tosi(!k.PuuskaVaroittaa && !k.Puuska, "sama ote toiseen kertaan: ei uutta puuskaa");
        }

        [Testi] static void LipsahdusPitaaToinenPudottaaJaPuuskaPalaa()
        {
            var k = new Kiipeily(6, new[] { 1 });
            Aja(k, 1, 2, x => x.Ote == 1); Aja(k, 0, 3, x => x.Puuska);
            k.Paivita(Dt, 1);
            Oleta.Tosi(k.Lipsahti && k.Lipsahdukset == 1 && k.Ote == 1 && !k.Putosi, "ensimmäinen lipsahdus: ote pitää");
            k.Lipsahti = false;
            double toipuu = Aja(k, 1, 2, x => x.Lipsahti);
            Oleta.Tosi(k.Putosi && Math.Abs(toipuu - Kiipeily.ToipuminenS) <= Tol, $"toinen liike samassa puuskassa {toipuu:F2} s toipumisen jälkeen → putoaa");
            double him = Aja(k, 1, 2, x => !x.Himmenee);
            Oleta.Tosi(Math.Abs(him - Kiipeily.HimmennysS) <= Tol && k.Ote == 0 && k.Lipsahdukset == 0, $"himmennys {him:F2} s → alkuun");
            Aja(k, 1, 2, x => x.Ote == 1);
            Oleta.Tosi(k.PuuskaVaroittaa, "pudotuksen jälkeen puuska tulee uudelleen");
        }

        [Testi] static void LyhtyVaroitus2JaValo4KelloEteneeToipuessa()
        {
            var k = new Kiipeily(6); k.LyhtyYlla();
            double v = Aja(k, 0, 5, x => x.LyhtyValaisee);
            double l = Aja(k, 0, 6, x => !x.LyhtyValaisee);
            Oleta.Tosi(Math.Abs(v - Kiipeily.LyhtyVaroitusS) <= Tol && Math.Abs(l - Kiipeily.LyhtyS) <= Tol && !k.Havaittu, $"varoitus {v:F2} s, valo {l:F2} s, paikallaan ei havaita");
            var h = new Kiipeily(6); h.LyhtyYlla(); Aja(h, 0, 3, x => x.LyhtyValaisee); h.Paivita(Dt, 1);
            Oleta.Tosi(h.Havaittu, "liike lyhdyn valossa havaitaan");
            // Lyhty ja puuska yhtä aikaa: lipsahduksen toipuminen (0,5 s) ei saa pysäyttää lyhdyn kelloa.
            var y = new Kiipeily(6, new[] { 1 });
            Aja(y, 1, 2, x => x.Ote == 1); Aja(y, 0, 3, x => x.Puuska);
            y.LyhtyYlla(); y.Paivita(Dt, 1);   // lipsahdus → toipuminen
            double vy = Aja(y, 0, 5, x => x.LyhtyValaisee) + Dt;
            Oleta.Tosi(Math.Abs(vy - Kiipeily.LyhtyVaroitusS) <= Tol, $"lyhdyn varoitus 2 s myös toipuessa ({vy:F2} s)");
        }

        /// <summary>Kurinalainen kiipeilijä: paikallaan varoitusten, puuskan, lyhdyn ja himmennyksen ajan, muuten eteen.</summary>
        static int Kurinalainen(Kiipeily k) => k.PuuskaVaroittaa || k.Puuska || k.LyhtyVaroittaa || k.LyhtyValaisee || k.Himmenee ? 0 : 1;

        [Testi] static void SatunnaisetSyotteetEivatJumitaEikaPudotaIlmanKahtaLipsahdusta()
        {
            var r = new Random(17); int pudotuksia = 0;
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                int n = 4 + r.Next(9); var puuskat = new List<int>(); for (int i = 1; i < n; i++) if (r.Next(4) == 0) puuskat.Add(i);
                var k = new Kiipeily(n, puuskat); int lipsuja = 0;
                for (double t = 0; t < 20; t += Dt)
                {
                    if (r.Next(400) == 0) k.LyhtyYlla();
                    int s = r.Next(3) - 1;
                    k.Paivita(Dt, s);
                    if (k.Lipsahti) { k.Lipsahti = false; lipsuja++; Oleta.Tosi(k.Puuska || k.Himmenee, $"ajo {ajo}: lipsahdus vain puuskassa"); }
                    if (k.Putosi) { k.Putosi = false; pudotuksia++; Oleta.Tosi(lipsuja >= 2, $"ajo {ajo}: putosi {lipsuja} lipsahduksella"); }
                    if (!k.Puuska && !k.Himmenee) lipsuja = 0;
                    Oleta.Tosi(k.Ote >= 0 && k.Ote < n, $"ajo {ajo}: ote rajoissa ({k.Ote})");
                }
                k.Havaittu = false;
                // Mistä tahansa tilasta kurinalainen pääsee perille ilman pudotusta ja havaintoa.
                // Satunnaisen osan kesken jäänyt siirtymä viedään loppuun (≤ 0,6 s): sen aikana lyhdyn havainto on oikein (hälytys → tyrmä).
                for (double t = 0; t < 60 && !k.Perilla; t += Dt) { k.Paivita(Dt, Kurinalainen(k)); Oleta.Tosi(!k.Putosi && (!k.Havaittu || t < Kiipeily.OteS), $"ajo {ajo}: kurinalainen putosi {k.Putosi} tai havaittiin {t:F2} s:ssa (ote {k.Ote}, siirtyy {k.Siirtyy})"); }
                Oleta.Tosi(k.Perilla, $"ajo {ajo}: jumi (ote {k.Ote}/{n}, puuska {k.Puuska}, himmenee {k.Himmenee})");
            }
            Oleta.Tosi(pudotuksia > 50, $"satunnaiset putosivat joskus ({pudotuksia})");
        }

        [Testi] static void KilpilukkoRajat45Plus10()
        {
            foreach (var (a, b, auki) in new[] { (45.0, 45.0, true), (35.0, 55.0, true), (34.9, 45.0, false), (45.0, 55.1, false), (-45.0, 45.0, false), (0.0, 0.0, false) })
            {
                var l = new Kilpilukko(); l.Kaanna(1, a); l.Kaanna(2, b);
                Oleta.Sama(auki ? KilpiTulos.Auki : KilpiTulos.Kolahdus, l.Kokeile(), $"{a}° / {b}°");
            }
            var m = new Kilpilukko(); m.Kaanna(1, 200); Oleta.Sama(90.0, m.Kilpi1); m.Kaanna(1, -400); Oleta.Sama(-90.0, m.Kilpi1);
            var n = new Kilpilukko(); n.Kaanna(1, 45); n.Kaanna(2, 45); n.Kokeile(); n.Kaanna(1, 30);
            Oleta.Tosi(n.Auki && n.Kilpi1 == 45 && n.Kokeile() == KilpiTulos.Auki, "auki pysyy, kääntö ei enää vaikuta");
        }

        [Testi] static void TiiletKuusiKertaaKaksiJaKurkistus()
        {
            var t = new Tiilet();
            Oleta.Sama(6, t.Maara);
            Oleta.Sama(TiiliTulos.Raapaisu, t.Raavi(0));
            Oleta.Sama(TiiliTulos.Putosi, t.Raavi(0, vetoMs: 0));   // ensimmäinen putoaa aina, hidaskin
            Oleta.Sama(TiiliTulos.Ei, t.Raavi(0)); Oleta.Sama(TiiliTulos.Ei, t.Raavi(-1)); Oleta.Sama(TiiliTulos.Ei, t.Raavi(6));
            t.Raavi(1); Oleta.Sama(TiiliTulos.Komeroon, t.Raavi(1, vetoMs: Tiilet.NopeaVetoMs - 0.01));
            t.Paivita(Tiilet.KurkistusValiS - 0.5);
            t.Raavi(2); Oleta.Sama(TiiliTulos.Putosi, t.Raavi(2, vetoMs: Tiilet.NopeaVetoMs));
            Oleta.Tosi(t.Kurkistaa, "toinen putoava 9,5 s:ssa → kurkistus"); t.Kurkistaa = false;
            t.Paivita(Tiilet.KurkistusValiS + 0.1);
            t.Raavi(3); t.Raavi(3, vetoMs: 1);
            Oleta.Tosi(!t.Kurkistaa, "10,1 s edellisestä: ei kurkistusta");
            for (int i = 4; i < 6; i++) { t.Raavi(i); t.Raavi(i); }
            Oleta.Tosi(t.KaikkiIrti, "12 raapaisua → kaikki irti");
        }

        [Testi] static void LukittuOviAvaimella()
        {
            var avaimet = new List<string> { "avainrengas" };
            Oleta.Sama(OviTulos.Lukossa, LukittuOvi.Avaa(true, "avainrengas", new List<string>(), false));
            Oleta.Sama(OviTulos.Lukossa, LukittuOvi.Avaa(true, null, avaimet, false));
            Oleta.Sama(OviTulos.AukiHiljaa, LukittuOvi.Avaa(true, "avainrengas", avaimet, false));
            Oleta.Sama(OviTulos.AukiNarahtaa, LukittuOvi.Avaa(true, "avainrengas", avaimet, true));
            Oleta.Sama(OviTulos.AukiHiljaa, LukittuOvi.Avaa(false, null, null, false));
        }

        static VartijanSyote Naamioitu(double z, double vauhti = Kavely.KavelyMs, bool hiipii = false) =>
            new VartijanSyote { PelaajaX = 0, PelaajaZ = z, NakolinjaVapaa = true, Valoisuus = 1, Naamio = true, PelaajaVauhti = vauhti, Hiipii = hiipii };

        [Testi] static void NaamioKulkulupaKokkiTunteeVaarinKantaenNahdaan()
        {
            var reitti = new List<(double, double, double)> { (0, 0, 1e9) };
            foreach (var p in new[] { VartijaProfiili.Vartija, VartijaProfiili.Portinvartija, VartijaProfiili.Torkku, VartijaProfiili.Linnavaki, VartijaProfiili.Apulainen })
            {
                var v = new Vartija(reitti, yaw: 0) { Profiili = p };
                Oleta.Sama(0.0, v.NakoVoima(Naamioitu(3)), $"{p.Nimi}: kävelevä palvelija ei herätä epäilyä");
                Oleta.Tosi(v.NakoVoima(Naamioitu(3, hiipii: true)) > 0, $"{p.Nimi}: kyyristelevä palvelija epäilyttää");
                Oleta.Tosi(v.NakoVoima(Naamioitu(3, vauhti: Kavely.JuoksuMs)) > 0, $"{p.Nimi}: juokseva palvelija epäilyttää");
            }
            var kokki = new Vartija(reitti, yaw: 0) { Profiili = VartijaProfiili.Kokki };
            Oleta.Tosi(kokki.NakoVoima(Naamioitu(3)) > 0, "kokki tuntee väkensä");
        }

        [Testi] static void ApulainenTunnistaa2m2s()
        {
            var v = new Vartija(new List<(double, double, double)> { (0, 0, 1e9) }, yaw: 0) { Profiili = VartijaProfiili.Apulainen };
            double t = 0;
            for (; t < 1.9; t += Dt) v.Paivita(Dt, Naamioitu(1.5));
            v.Paivita(Dt, Naamioitu(2.5));   // astuu kauemmas ennen 2 s:ia: laskuri nollautuu
            Oleta.Tosi(!v.Tunnisti && v.Mittari == 0, "alle 2 s kerrallaan: ei tunnista");
            double tunnisti = -1;
            for (double s = 0; s < 4 && tunnisti < 0; s += Dt) { v.Paivita(Dt, Naamioitu(1.5)); if (v.Tunnisti) tunnisti = s + Dt; }
            Oleta.Tosi(Math.Abs(tunnisti - VartijaProfiili.Apulainen.TunnistaaS) <= Tol, $"tunnistaa 2 s:ssa ({tunnisti:F2})");
            Oleta.Tosi(v.NakoVoima(Naamioitu(4)) > 0, "tunnistettu: naamio ei suojaa kauempanakaan");
            v.Paivita(Dt, new VartijanSyote { PelaajaZ = 4, NakolinjaVapaa = true, Valoisuus = 1 });   // naamio pois
            Oleta.Tosi(!v.Tunnisti, "naamion riisuminen nollaa tunnistuksen");
            var w = new Vartija(new List<(double, double, double)> { (0, 0, 1e9) }, yaw: 0) { Profiili = VartijaProfiili.Apulainen };
            var piilossa = Naamioitu(1.5); piilossa.Piilossa = true;
            for (double s = 0; s < 4; s += Dt) w.Paivita(Dt, piilossa);
            Oleta.Tosi(!w.Tunnisti, "piilossa ei tunnista");
        }

        [Testi] static void LinnavakiHuutaaEikaOtaKiinniJaOteRanteesta()
        {
            var v = new Vartija(new List<(double, double, double)> { (0, 0, 1e9) }, yaw: 0) { Profiili = VartijaProfiili.Linnavaki };
            var s = new VartijanSyote { PelaajaZ = 1, NakolinjaVapaa = true, Valoisuus = 1, PelaajaVauhti = 0 };
            bool huusi = false;
            for (double t = 0; t < 30; t += Dt) { s.VartijaX = 0; s.VartijaZ = 0; v.Paivita(Dt, s); if (v.Huuto) { huusi = true; v.Huuto = false; } Oleta.Tosi(v.Tila != VartijanTila.Kiinni && v.Vauhti == 0, "linnaväki ei jahtaa eikä ota kiinni"); }
            Oleta.Tosi(huusi, "linnaväki huutaa");
            // Vouti tarttuu ranteeseen (OtaKiinni): irtipääsyn ikkuna 1,0 s alkaa heti.
            var vouti = new Vartija(new List<(double, double, double)> { (0, 0, 1e9) }, yaw: 0);
            vouti.OtaKiinni();
            Oleta.Tosi(vouti.Tila == VartijanTila.Kiinni && vouti.OteS == 0, "ote ranteesta");
            vouti.Paivita(Vartija.IrtiIkkunaS - 0.1, new VartijanSyote { PelaajaZ = 1 });
            Oleta.Tosi(vouti.Irrottaudu(), "irtipääsy ikkunassa");
        }

        [Testi] static void VaroitusEnnenKiinniottoaNaamionKanssa()
        {
            var profiilit = new[] { VartijaProfiili.Vartija, VartijaProfiili.Linnavaki, VartijaProfiili.Apulainen, VartijaProfiili.Torkku };
            var r = new Random(19); int kiinni = 0; var reitti = new List<(double, double, double)> { (0, 0, 2), (0, 8, 2) };
            for (int ajo = 0; ajo < 1000; ajo++)
            {
                var p = profiilit[ajo % profiilit.Length];
                var v = new Vartija(reitti, yaw: r.NextDouble() * 360 - 180) { Profiili = p };
                double x = 0, z = 0, px = r.NextDouble() * 6 - 3, pz = r.NextDouble() * 10 - 1; bool naamio = r.Next(2) == 0, hiipii = r.Next(3) == 0;
                double vaiheissa = 0, sydan = 0;
                for (double t = 0; t < 12 && v.Tila != VartijanTila.Kiinni; t += 1 / 30.0)
                {
                    px += (r.NextDouble() - 0.5) * 0.25; pz += (r.NextDouble() - 0.5) * 0.25;
                    if (r.Next(200) == 0) naamio = !naamio;
                    var s = new VartijanSyote { VartijaX = x, VartijaZ = z, PelaajaX = px, PelaajaZ = pz, NakolinjaVapaa = true, Valoisuus = r.NextDouble(), Naamio = naamio, Hiipii = hiipii, PelaajaVauhti = r.NextDouble() * 3 };
                    v.Paivita(1 / 30.0, s);
                    if (v.Tila == VartijanTila.Partio || v.Tila == VartijanTila.Paluu) vaiheissa = 0; else if (v.Tila != VartijanTila.Kiinni) vaiheissa += 1 / 30.0;
                    sydan = v.SydanS;
                    double dx = v.KohdeX - x, dz = v.KohdeZ - z, d = Math.Sqrt(dx * dx + dz * dz);
                    if (d > 1e-6 && v.Vauhti > 0) { double a = Math.Min(d, v.Vauhti / 30.0); x += dx / d * a; z += dz / d * a; v.Yaw = Math.Atan2(dx, dz) * 180 / Math.PI; }
                }
                if (v.Tila != VartijanTila.Kiinni) continue;
                kiinni++;
                Oleta.Tosi(p.Ottaa, $"ajo {ajo}: {p.Nimi} otti kiinni");
                Oleta.Tosi(vaiheissa >= Vartija.VaroitusS - 1 / 30.0 && sydan >= Vartija.SydanVahS - 1 / 30.0, $"ajo {ajo} ({p.Nimi}): ilman varoitusta ({vaiheissa:F2} s, sydän {sydan:F2} s)");
            }
            Oleta.Tosi(kiinni > 30, $"kiinniottoja syntyi ({kiinni})");
        }
    }
}
