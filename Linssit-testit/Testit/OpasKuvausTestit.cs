// Oppaan kuvakieli (Siirtoseppä 5.10.2026): luokittelu, kehys luokan mukaan, pysähdyksen kierto ja dolly, lennon kaari ja jatkuvuus.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasKuvausTestit
    {
        static OpasKohde K(double koko, double korkeus = 0) =>
            new OpasKohde { Id = "x", Nimi = "x", Lat = 55.68, Lon = 12.59, KokoM = koko, KorkeusM = korkeus, KestoS = 20 };

        static double Ero(double a, double b) => Math.Abs(KierrosLento.Kiedo(a - b));

        [Testi] static void LuokitteluKentastaJaKoosta()
        {
            Oleta.Sama(OpasKuvaus.Luokka.Katu, OpasKuvaus.Luokittele(K(400), "kanava"), "kanava kentästä voittaa koon");
            Oleta.Sama(OpasKuvaus.Luokka.Alue, OpasKuvaus.Luokittele(K(50), "Linnoitus"), "linnoitus, kirjainkoko");
            Oleta.Sama(OpasKuvaus.Luokka.Rakennus, OpasKuvaus.Luokittele(K(40), "torni"));
            Oleta.Sama(OpasKuvaus.Luokka.Alue, OpasKuvaus.Luokittele(K(600)), "iso → alue");
            Oleta.Sama(OpasKuvaus.Luokka.Rakennus, OpasKuvaus.Luokittele(K(60, 40)), "korkea → rakennus");
            Oleta.Sama(OpasKuvaus.Luokka.Katu, OpasKuvaus.Luokittele(K(80)), "pieni ja matala → katu");
            Oleta.Sama(OpasKuvaus.Luokka.Rakennus, OpasKuvaus.Luokittele(K(200)), "keskikokoinen → rakennus");
            var nyhavn = K(500); nyhavn.Luokka = "kanava";
            Oleta.Sama(OpasKuvaus.Luokka.Katu, OpasKuvaus.Luokittele(nyhavn), "OpasKohde.Luokka (worker) oletuksena");
        }

        [Testi] static void KatuMatalaJaLahelleAlueKorkeaJaKauas()
        {
            var katu = OpasKuvaus.Kehysta(K(80), 5, 90, "kanava");
            var alue = OpasKuvaus.Kehysta(K(500), 5, 90, "linnoitus");
            Oleta.Tosi(katu.Kallistus > alue.Kallistus, $"katu viistompi ({katu.Kallistus} vs {alue.Kallistus})");
            Oleta.Tosi(katu.EtaisyysM < alue.EtaisyysM, $"katu lähempänä ({katu.EtaisyysM} vs {alue.EtaisyysM})");
            Oleta.Tosi(OpasKuvaus.Kehysta(K(2000), 5, 0, "linnoitus").EtaisyysM <= 350 && OpasKuvaus.Kehysta(K(1200), 5, 0, "katu").EtaisyysM <= 350, "suuret kohteet enintään 350 m");
            Oleta.Tosi(katu.EtaisyysM >= OpasKuvaus.KatuEtMinM && alue.EtaisyysM <= OpasKuvaus.AlueEtMaxM);
            Oleta.Tosi(Ero(katu.Suuntima, 90 + OpasKuvaus.SivuKulma) < 1e-9, "katse sivukulman verran tulosuunnasta");
            var torni = OpasKuvaus.Kehysta(K(30, 120), 5, 0, "torni");
            Oleta.Tosi(torni.KatseKorkeusM > 5 + 25, $"tornin katse ylempänä ({torni.KatseKorkeusM})");
            // Tiukka kehys (omistaja 20.5x): Raatihuone 110 m / 105 m → ~150–220 m (aiemmin ~650 m); patsas ei mene liian lähelle.
            var raati = OpasKuvaus.Kehysta(K(110, 105), 5, 0, "rakennus");
            Oleta.Tosi(raati.EtaisyysM > 140 && raati.EtaisyysM < 230, $"Raatihuone {raati.EtaisyysM:F0} m");
            Oleta.Sama(OpasKuvaus.RakennusEtMinM, OpasKuvaus.Kehysta(K(8, 4), 5, 0, "patsas").EtaisyysM, "patsas vähimmäisetäisyydellä");
            var nyhavn = OpasKuvaus.Kehysta(K(250, 15), 5, 0, "kanava");
            Oleta.Tosi(nyhavn.EtaisyysM > 300 && nyhavn.EtaisyysM <= 350, $"Nyhavn {nyhavn.EtaisyysM:F0} m");
        }

        [Testi] static void PysahdysAlkaaKehyksestaJaKiertaaHitaasti()
        {
            var p = OpasKuvaus.Kehysta(K(80), 5, 0, "katu");
            var a0 = OpasKuvaus.Pysahdyksella(p, 0);
            Oleta.Tosi(Ero(a0.Suuntima, p.Suuntima) < 1e-9 && Math.Abs(a0.EtaisyysM - p.EtaisyysM) < 1e-9, "t = 0 on kehys");
            double k1 = KierrosLento.Kiedo(OpasKuvaus.Pysahdyksella(p, 1).Suuntima - p.Suuntima);
            Oleta.Tosi(k1 < OpasKuvaus.KiertoAsteS * 0.5, $"pehmeä alku ({k1:F3}°)");
            // Nopeampi orbit (omistaja 23.3x): 4 s → 9 s noin 0,9°/s.
            double nopeus = KierrosLento.Kiedo(OpasKuvaus.Pysahdyksella(p, 9).Suuntima - OpasKuvaus.Pysahdyksella(p, 4).Suuntima) / 5;
            Oleta.Tosi(Math.Abs(nopeus - OpasKuvaus.KiertoAsteS) < 0.01, $"orbit {nopeus:F2}°/s");
            Oleta.Tosi(OpasKuvaus.Pysahdyksella(p, 10).EtaisyysM < p.EtaisyysM, "dolly sisään");
        }

        [Testi] static void ToinenKehysKadullaToinenPuoliRakennuksellaLahemmas()
        {
            double loppu = OpasKuvaus.VaiheS + OpasKuvaus.SiirtoS;
            var katu = OpasKuvaus.Kehysta(K(80), 5, 0, "katu");
            double ennen = OpasKuvaus.Pysahdyksella(katu, OpasKuvaus.VaiheS).Suuntima, jalkeen = OpasKuvaus.Pysahdyksella(katu, loppu).Suuntima;
            double siirto = KierrosLento.Kiedo(jalkeen - ennen - OpasKuvaus.KiertoAsteS * OpasKuvaus.SiirtoS);
            Oleta.Tosi(Math.Abs(siirto - OpasKuvaus.SiirtoKulma) < 0.5, $"katu: toiselle puolelle ({siirto:F1}°)");
            var rak = OpasKuvaus.Kehysta(K(60, 40), 5, 0, "rakennus");
            double r0 = OpasKuvaus.Pysahdyksella(rak, OpasKuvaus.VaiheS).EtaisyysM, r1 = OpasKuvaus.Pysahdyksella(rak, loppu).EtaisyysM;
            Oleta.Tosi(r1 < r0 * 0.75, $"rakennus: lähemmäs ({r0:F0} → {r1:F0} m)");
            var pieni = OpasKuvaus.Kehysta(K(20, 10), 5, 0, "rakennus");   // jo vähimmäisetäisyydellä
            Oleta.Tosi(OpasKuvaus.Pysahdyksella(pieni, loppu).EtaisyysM >= OpasKuvaus.RakennusEtMinM - 1e-6, "lähennys ei alle vähimmäisetäisyyden");
            // Orbit jatkuu toisessa kehyksessä samalla nopeudella.
            double v2 = KierrosLento.Kiedo(OpasKuvaus.Pysahdyksella(katu, loppu + 6).Suuntima - OpasKuvaus.Pysahdyksella(katu, loppu + 1).Suuntima) / 5;
            Oleta.Tosi(Math.Abs(v2 - OpasKuvaus.KiertoAsteS) < 0.01, $"orbit jatkuu {v2:F2}°/s");
            // Jatkuvuus koko pysähdyksen ajan 60 fps:llä: ei hyppyjä (suunta < 1,6°/kehys, etäisyys < 3 m/kehys).
            foreach (var p in new[] { katu, rak })
            {
                var ed = OpasKuvaus.Pysahdyksella(p, 0); double maxS = 0, maxE = 0;
                for (int i = 1; i <= 60 * 30; i++)
                {
                    var n = OpasKuvaus.Pysahdyksella(p, i / 60.0);
                    maxS = Math.Max(maxS, Ero(n.Suuntima, ed.Suuntima)); maxE = Math.Max(maxE, Math.Abs(n.EtaisyysM - ed.EtaisyysM)); ed = n;
                }
                Oleta.Tosi(maxS < 1.6 && maxE < 3, $"jatkuva ({maxS:F2}°/kehys, {maxE:F2} m/kehys)");
            }
        }

        [Testi] static void LentoNouseeLiukuuJaLaskeeIlmanHyppyja()
        {
            var a = new Kuvakulma(55.6757, 12.5696, 300, 66, 40, 20);   // Raatihuone
            var b = new Kuvakulma(55.6797, 12.5908, 250, 74, 200, 8);   // Nyhavn ~1,4 km
            var alku = OpasKuvaus.Lennossa(a, b, 0); var loppu = OpasKuvaus.Lennossa(a, b, 1);
            Oleta.Tosi(Math.Abs(alku.EtaisyysM - a.EtaisyysM) < 1e-6 && Ero(alku.Suuntima, a.Suuntima) < 1e-6 && Math.Abs(alku.Kallistus - a.Kallistus) < 1e-6, "alku = a");
            Oleta.Tosi(Math.Abs(loppu.EtaisyysM - b.EtaisyysM) < 1e-6 && Ero(loppu.Suuntima, b.Suuntima) < 1e-6 && Math.Abs(loppu.Lat - b.Lat) < 1e-12, "loppu = b");
            var keski = OpasKuvaus.Lennossa(a, b, 0.5);
            Oleta.Tosi(keski.EtaisyysM > Math.Max(a.EtaisyysM, b.EtaisyysM) + 200, $"liu'ussa ylempänä ({keski.EtaisyysM:F0} m)");
            // Liuku: korkeus lähes tasainen välillä 0,35–0,65.
            Oleta.Tosi(Math.Abs(OpasKuvaus.Lennossa(a, b, 0.35).EtaisyysM - OpasKuvaus.Lennossa(a, b, 0.65).EtaisyysM) < 40, "tasanne");
            // Liu'ussa korkealla ja jyrkkänä (TF 144: ei matalaa viistoa liukua).
            Oleta.Tosi(Math.Abs(keski.Kallistus - OpasKuvaus.LentoKallistus) < 1e-6, $"liuku jyrkkä ({keski.Kallistus:F1}°)");
            Oleta.Tosi(keski.EtaisyysM >= OpasKuvaus.KorkeusKerroin * Math.Max(a.EtaisyysM, b.EtaisyysM) - 1e-6, $"liuku korkealla ({keski.EtaisyysM:F0} m)");
            // Lasku viimeisellä neljänneksellä: 80 %:ssa vielä selvästi kohdetta korkeammalla ja jyrkempi kuin kohde.
            var lasku = OpasKuvaus.Lennossa(a, b, 0.8);
            Oleta.Tosi(lasku.EtaisyysM > b.EtaisyysM * 1.2 && lasku.Kallistus < b.Kallistus, $"lasku alkaa myöhään ({lasku.EtaisyysM:F0} m, {lasku.Kallistus:F1}°)");
            // Katse lentosuuntaan keskellä.
            double lento = OpasSilmukka.Suunta(a.Lat, a.Lon, b.Lat, b.Lon);
            Oleta.Tosi(Ero(keski.Suuntima, lento) < 1, $"keskellä katse lentosuuntaan ({keski.Suuntima:F1} vs {lento:F1})");
            // Ei hyppyjä: 1 000 askeleella suuntima < 1,5°/askel ja etäisyys < 5 m/askel.
            var ed = alku; double maxS = 0, maxE = 0;
            for (int i = 1; i <= 1000; i++)
            {
                var n = OpasKuvaus.Lennossa(a, b, i / 1000.0);
                maxS = Math.Max(maxS, Ero(n.Suuntima, ed.Suuntima)); maxE = Math.Max(maxE, Math.Abs(n.EtaisyysM - ed.EtaisyysM)); ed = n;
            }
            Oleta.Tosi(maxS < 1.5 && maxE < 5, $"jatkuva (suunta {maxS:F2}°/askel, etäisyys {maxE:F2} m/askel)");
        }

        [Testi] static void KaukolentoKuinOpasSilmukassa()
        {
            var a = new Kuvakulma(55.68, 12.57, 400, 62, 0, 45);
            var b = new Kuvakulma(41.89, 12.49, 400, 62, 180, 50);
            var o = OpasKuvaus.Lennossa(a, b, 0.4); var s = OpasSilmukka.Lennossa(a, b, 0.4);
            Oleta.Tosi(Math.Abs(o.EtaisyysM - s.EtaisyysM) < 1e-6 && Math.Abs(o.Lat - s.Lat) < 1e-12, "yli 20 km: isoympyrälento ennallaan");
        }
    }
}
