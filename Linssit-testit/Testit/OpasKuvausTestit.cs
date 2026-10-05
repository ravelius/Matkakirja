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
            Oleta.Tosi(katu.Kallistus > alue.Kallistus + 15, $"katu viistompi ({katu.Kallistus} vs {alue.Kallistus})");
            Oleta.Tosi(katu.EtaisyysM < alue.EtaisyysM, $"katu lähempänä ({katu.EtaisyysM} vs {alue.EtaisyysM})");
            Oleta.Tosi(katu.EtaisyysM >= OpasKuvaus.KatuEtMinM && alue.EtaisyysM <= OpasKuvaus.AlueEtMaxM);
            Oleta.Tosi(Ero(katu.Suuntima, 90 + OpasKuvaus.SivuKulma) < 1e-9, "katse sivukulman verran tulosuunnasta");
            var torni = OpasKuvaus.Kehysta(K(30, 120), 5, 0, "torni");
            Oleta.Tosi(torni.KatseKorkeusM > 5 + 40, $"tornin katse ylempänä ({torni.KatseKorkeusM})");
        }

        [Testi] static void PysahdysAlkaaKehyksestaJaKiertaaHitaasti()
        {
            var p = OpasKuvaus.Kehysta(K(80), 5, 0);
            var a0 = OpasKuvaus.Pysahdyksella(p, 0);
            Oleta.Tosi(Ero(a0.Suuntima, p.Suuntima) < 1e-9 && Math.Abs(a0.EtaisyysM - p.EtaisyysM) < 1e-9, "t = 0 on kehys");
            double k40 = KierrosLento.Kiedo(OpasKuvaus.Pysahdyksella(p, 40).Suuntima - p.Suuntima);
            Oleta.Tosi(k40 > 10 && k40 < 20, $"40 s kappaleessa 10–20° ({k40:F1}°)");
            // Pehmeä alku: ensimmäisen sekunnin kierto selvästi pienempi kuin täydellä nopeudella.
            double k1 = KierrosLento.Kiedo(OpasKuvaus.Pysahdyksella(p, 1).Suuntima - p.Suuntima);
            Oleta.Tosi(k1 < OpasKuvaus.KiertoAsteS * 0.5, $"pehmeä alku ({k1:F3}°)");
            // Jatkuvuus kiihdytyksen rajalla ja dolly sisään.
            double ennen = OpasKuvaus.Pysahdyksella(p, OpasKuvaus.KiertoAlkuS - 1e-4).Suuntima, jalkeen = OpasKuvaus.Pysahdyksella(p, OpasKuvaus.KiertoAlkuS + 1e-4).Suuntima;
            Oleta.Tosi(Ero(ennen, jalkeen) < 1e-3, "kierto jatkuva");
            Oleta.Tosi(OpasKuvaus.Pysahdyksella(p, 60).EtaisyysM < p.EtaisyysM && OpasKuvaus.Pysahdyksella(p, 60).EtaisyysM > p.EtaisyysM * (1 - OpasKuvaus.DollyOsuus), "dolly");
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
