// OLAVINLINNAN LÄPIPELUUAJURI (Linssiseppä 8.10.2026, Päätoimittaja: koko peli 1–10 yhdellä testillä, juna 167; LS2:n huonesimulaatio
// ja M-osan ytimet, Siirtosepän Tyrma/Pako): yksi jatkuva maailma (Huonesimulaatio, v44z) alusta pakoon: huoneet 1–5 Thief-ajurilla
// (vartijat, harhautukset, tarjotin torkkujalle), kappelin valoarvoitus (KappelinArvoitus, sujuva järjestys), huone 6 (naamio
// naulakosta, kulho ja voudin kiista pöydällä pelaaja-57, avainrengas), huone 7 (muurikäytävän ovi avainrenkaalla, muurikäytävä),
// huone 8 (harja, köysikieppi, sakara, kiipeily otteilla), huone 9 (komero: tiilet ja kilvet, arkku), huone 10 (kello, köysilasku,
// kallio kävellen K4:lle, rannan vartijat esiin). Tulos yhdellä rivillä: läpi ja aika huoneittain, tai "JUMI huone N: …".
// Aika: Huonesimulaatio.T (kävely, odotukset, kiista, ovi, kallio) + paikattomat teot (kappeli, kiipeily, komero, köysilasku).
// Vertailu pelattavuusmalli-olavinlinna.md 9 (sujuva ja tutkiva min huoneittain); pelaaja-arvio = Σ max(simuloitu, sujuva).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaLapipeluuTestit
    {
        const double Dt = Huonesimulaatio.Dt;
        /// <summary>pelattavuusmalli 9: huoneet 1…10 (min).</summary>
        static readonly double[] SujuvaMin = { 1, 2, 2.5, 1.5, 3.5, 3.5, 2, 3, 2, 1.5 }, TutkivaMin = { 1.5, 3, 4, 2.5, 5, 5, 3, 4, 3, 2 };
        /// <summary>Kappelin teon kesto (s; liike ja käsittely, ei pohdintaa) ja raapaisun kesto.</summary>
        const double KappeliTekoS = 3, RaapaisuS = 2, KasitteleS = 2, KiistaMaxS = 60;

        static readonly KappeliTeko[] KappeliSujuva =
        {
            KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu, KappeliTeko.LiekkiKilville, KappeliTeko.AvaaLuukku,
            KappeliTeko.LiekkiVetoon, KappeliTeko.KoputaOntto, KappeliTeko.AsetaKynttila, KappeliTeko.Raapaise, KappeliTeko.OtaKynttila,
            KappeliTeko.Puhalla, KappeliTeko.KappalainenLahti, KappeliTeko.SytytaOma, KappeliTeko.AsetaKynttila,
            KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise,
            KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise,
            KappeliTeko.AvaaNyytti, KappeliTeko.KalkkiAlttarille, KappeliTeko.PateeniAlttarille, KappeliTeko.LiuskekiviLaukkuun,
        };

        /// <summary>Läpipeluun tila: jatkuva maailma, paikattomien tekojen lisäaika, huoneiden ajat ja jumi.</summary>
        sealed class Ajo
        {
            public Huonesimulaatio W; public double Lisa; public string Jumi;
            public readonly double[] Huone = new double[11]; double alku;
            public readonly List<string> Loki = new List<string>();
            public double T => W.T + Lisa;
            public void Aloita() => alku = T;
            public void Valmis(int huone) { Huone[huone] += T - alku; alku = T; }
            public bool Kulje(int huone, int seuraava, int loppu)
            {
                if (Jumi != null) return false;
                var t = ThiefAjuri.Aja(W, seuraava, loppu, budjetti: 600);
                if (t.Loppu == null) { Jumi = $"huone {huone}: Thief-ajuri jäi pisteeseen pelaaja-{t.Pisin + 1} (tavoite {loppu + 1})"; ThiefAjuri.Tulosta(t.PisinTila); return false; }
                W = t.Loppu; Loki.Add($"h{huone}: {string.Join(", ", t.Loki)}");
                return true;
            }
            public void OdotaS(double s, bool hiipii = false) { for (double t = 0; t < s - 1e-9; t += Dt) W.Odota(hiipii); }
        }

        static KavelyMerkki Merkki(string nimi) { foreach (var m in Huonesimulaatio.Data.Merkit) if (m.Nimi == nimi) return m; throw new Exception(nimi + " puuttuu"); }
        static (double X, double Y, double Z) P(string nimi) { var m = Merkki(nimi); return (m.X, m.Y, m.Z); }

        /// <summary>Kurinalainen kiipeily (OlavinlinnaMOsaTestit.Kiipea): pysähtyy varoituksiin, lyhty yllä puolivälissä kerran.</summary>
        static (double Aika, bool Putosi, bool Havaittu) Kiipea(int otteita, IEnumerable<int> puuskat)
        {
            var k = new Kiipeily(otteita, puuskat); bool lyhty = false, putosi = false, havaittu = false; double t = 0;
            for (; t < 120 && !k.Perilla; t += Dt)
            {
                int s = k.PuuskaVaroittaa || k.Puuska || k.LyhtyVaroittaa || k.LyhtyValaisee || k.Himmenee ? 0 : 1;
                k.Paivita(Dt, s);
                if (!lyhty && k.Ote >= otteita / 2 && k.Siirtyy == 0) { lyhty = true; k.LyhtyYlla(); }
                putosi |= k.Putosi; havaittu |= k.Havaittu;
            }
            return (k.Perilla ? t : -1, putosi, havaittu);
        }

        /// <summary>Koko peli varjoreittiä (kurinalainen pelaaja, ei kiinnijääntejä).</summary>
        static Ajo Pelaa()
        {
            var a = new Ajo { W = Huonesimulaatio.Uusi() }; a.Aloita();
            // Huoneet 1–5 (reitti:pelaaja-1…20): laituri ja vesiportti, porttikäytävä ja piha, keittiö (tarjotin torkkujalle), kirkkotorni.
            if (!a.Kulje(2, 1, 5)) return a; a.Valmis(2);
            if (!a.Kulje(3, 6, 8)) return a; a.Valmis(3);
            if (!a.Kulje(4, 9, 12)) return a; a.Valmis(4);
            if (!a.Kulje(5, 13, 19)) return a;
            if (!a.W.Annettu) { a.Jumi = "huone 4: tarjotin jäi antamatta torkkujalle"; return a; }
            // Huone 5: kappelin valoarvoitus (vaiheet 1–12), kynttilä puhalletaan arvoituksessa.
            var kap = new KappelinArvoitus();
            foreach (var t in KappeliSujuva)
            {
                if (!kap.Teko(t)) { a.Jumi = $"huone 5: kappeli ei hyväksy tekoa {t} (vaihe {kap.Vaihe})"; return a; }
                if (t == KappeliTeko.Raapaise && kap.KappalainenTulee) kap.KappalainenTulee = false;
                double s = t == KappeliTeko.Raapaise ? RaapaisuS : KappeliTekoS; kap.Paivita(s); a.Lisa += s;
            }
            if (kap.Vaihe != KappelinArvoitus.Valmis) { a.Jumi = $"huone 5: kappeli vaiheessa {kap.Vaihe}"; return a; }
            a.W.Kynttila = false; a.Valmis(5);
            // Huone 6: kaari-ovi → naamio naulakosta → Linnantupa → voudin pöytä (pelaaja-57): kulho, kiista, avainrengas → paluu.
            if (!a.Kulje(6, 20, 56)) return a;
            if (!a.W.Naamio) { a.Jumi = "huone 6: naamio jäi ottamatta naulakosta"; return a; }
            var kiista = new VoudinKiista(); var kulho = Merkki("esine:kulho-poydalle"); var vouti = Merkki("istuu:vouti");
            if (!kiista.KulhoLaskettu(Huonesimulaatio.Etaisyys2(a.W.PX, a.W.PZ, kulho.X, kulho.Z))) { a.Jumi = "huone 6: kulho ei ulotu pöydän merkistä"; return a; }
            double yaw = vouti.KiertoY.Value * 180 / Math.PI, kiistaS = 0; int k0 = a.W.Kiinni;
            for (; kiistaS < KiistaMaxS && !kiista.SaaOttaa(a.W.PX - vouti.X, a.W.PZ - vouti.Z, yaw); kiistaS += Dt) { a.W.Odota(false); kiista.Paivita(Dt); }
            if (kiistaS >= KiistaMaxS || a.W.Kiinni != k0) { a.Jumi = $"huone 6: avainrengas ei irronnut ({kiistaS:F0} s, kiinni {a.W.Kiinni - k0})"; return a; }
            a.OdotaS(1);   // otto
            a.Loki.Add($"h6: avainrengas {kiistaS:F1} s kulhosta");
            if (!a.Kulje(6, 57, 62)) return a; a.Valmis(6);
            // Huone 7: Tott-kammio → muuriportaat → ampumakäytävä → muurikäytävän ovi (avainrengas) → muurikäytävä.
            if (!a.Kulje(7, 63, 80)) return a;
            if (LukittuOvi.Avaa(true, "avainrengas", new[] { "avainrengas" }, false) == OviTulos.Lukossa) { a.Jumi = "huone 7: ovi ei aukea avainrenkaalla"; return a; }
            a.OdotaS(KasitteleS, true);
            if (!a.Kulje(7, 81, 85)) return a; a.Valmis(7);
            // Huone 8: tikkaat, harja, köysikieppi (pelaaja-89), sakara (-91), kiipeily kellotornin ympäri.
            if (!a.Kulje(8, 86, 91)) return a;
            a.OdotaS(2 * KasitteleS, true);   // köysikieppi + kiinnitys sakaraan
            var otteet = new List<(double X, double Y, double Z)>();
            for (int i = 1; ; i++) { KavelyMerkki m = Huonesimulaatio.Data.Merkit.FirstOrDefault(x => x.Nimi == "ote:kellotorni-" + i); if (m == null) break; otteet.Add((m.X, m.Y, m.Z)); }
            var puuskat = new List<int>();
            foreach (var m in Huonesimulaatio.Data.Lajia("tuuli")) for (int i = 0; i < otteet.Count; i++) if (Huonesimulaatio.Etaisyys3(m.X, m.Y, m.Z, otteet[i].X, otteet[i].Y, otteet[i].Z) < 0.5) puuskat.Add(i);
            var (kiipeily, putosi, havaittu) = Kiipea(otteet.Count, puuskat);
            if (kiipeily < 0 || putosi || havaittu) { a.Jumi = $"huone 8: kiipeily ({otteet.Count} otetta) ei mennyt läpi (putosi {putosi}, havaittu {havaittu})"; return a; }
            a.Lisa += kiipeily; a.Valmis(8);
            // Huone 9: komero (tiilet hitaasti, kilvet 3 × 15°), arkku auki.
            var komero = new Komero();
            for (int i = 0; i < komero.Tiilet.Maara; i++) { komero.Raavi(i); komero.Raavi(i, 0); komero.Tiilet.Paivita(3); a.Lisa += 3; }
            for (int i = 0; i < 3; i++) { komero.KaannaKilpea(1); komero.KaannaKilpea(2); a.Lisa += 2; }
            if (komero.Avaa() != KilpiTulos.Auki) { a.Jumi = "huone 9: arkku ei aukea (kilvet tai tiilet)"; return a; }
            (a.W.PX, a.W.PY, a.W.PZ) = Huonesimulaatio.Reitti[92]; a.Valmis(9);
            // Huone 10: kello, köysi kramppiin, köysilasku, kallio kävellen K4:lle (rannan vartijat esiin kellosta).
            var pako = new Pako(); pako.ArkkuAuki(); pako.Paivita(0.5, false); a.Lisa += 0.5;
            if (!pako.Kiinnita()) { a.Jumi = "huone 10: köysi ei kiinnity kramppiin"; return a; }
            var krampi = P("koysi:krampi-komero"); var p1 = P("reitti:pako-1");
            int laskuOtteita = (int)Math.Ceiling(Huonesimulaatio.Etaisyys3(krampi.X, krampi.Y, krampi.Z, p1.X, p1.Y + 1.55, p1.Z)) + 1;
            var (lasku, lPutosi, lHavaittu) = Kiipea(laskuOtteita, null);
            if (lasku < 0 || lPutosi || lHavaittu) { a.Jumi = $"huone 10: köysilasku ({laskuOtteita} otetta) ei mennyt läpi"; return a; }
            pako.Paivita(lasku, false); pako.LaskuValmis(); a.Lisa += lasku;
            (a.W.PX, a.W.PY, a.W.PZ) = p1; a.W.Naamio = false;
            var k4 = P("kamera:K4"); int kk = a.W.Kiinni;
            for (int n = 2; n <= 5 && pako.Vaihe == PakoVaihe.Kallio; n++)
            {
                var q = P("reitti:pako-" + n);
                for (int i = 0; i < 3000 && pako.Vaihe == PakoVaihe.Kallio; i++)
                {
                    bool perilla = a.W.Askel(q, false);
                    pako.Paivita(Dt, Huonesimulaatio.Etaisyys2(a.W.PX, a.W.PZ, k4.X, k4.Z) < 2.5);
                    if (pako.RantaEsiin) { pako.RantaEsiin = false; a.W.Aktivoi("ranta"); }
                    if (perilla) break;
                }
            }
            if (pako.Vaihe != PakoVaihe.K4 || pako.Myohastynyt || a.W.Kiinni != kk) { a.Jumi = $"huone 10: pako ei päättynyt K4:ään ({pako.Vaihe}, myöhästyi {pako.Myohastynyt}, kiinni {a.W.Kiinni - kk})"; return a; }
            a.Valmis(10);
            return a;
        }

        static string Mmss(double s) => $"{(int)(s / 60)}:{(int)(s % 60):00}";

        static string Rivi(Ajo a)
        {
            var huoneet = new List<string>(); double arvio = 0;
            for (int h = 2; h <= 10; h++)
            {
                double sujuva = (h == 2 ? SujuvaMin[0] + SujuvaMin[1] : SujuvaMin[h - 1]) * 60;
                huoneet.Add($"{(h == 2 ? "1–2" : h.ToString())} {Mmss(a.Huone[h])}");
                arvio += Math.Max(a.Huone[h], sujuva);
            }
            return $"läpi {Mmss(a.T)} simuloitua (pelaaja-arvio {Mmss(arvio)}, suunnitelma sujuva 22:30 / tutkiva 33:00), kiinni {a.W.Kiinni} | {string.Join(" · ", huoneet)}";
        }

        [Testi] static void KokoPeliVarjoreittiaLapi()
        {
            var a = Pelaa();
            if (a.Jumi != null) Console.WriteLine($"      LÄPIPELUU v44z: JUMI {a.Jumi}");
            else Console.WriteLine($"      LÄPIPELUU v44z: {Rivi(a)}");
            Oleta.Tosi(a.Jumi == null, $"JUMI {a.Jumi}");
            Oleta.Sama(0, a.W.Kiinni);
            for (int h = 3; h <= 10; h++) Oleta.Tosi(a.Huone[h] <= TutkivaMin[h - 1] * 60, $"huone {h}: simuloitu {Mmss(a.Huone[h])} ≤ tutkiva {TutkivaMin[h - 1]} min");
        }
    }
}
