// Oppaan tappiohjaus (Siirtoseppä 5.10.2026): pehmeä vaste, rajat (jyrkkyys, etäisyys, kattoraja), automaattikierron pysäytys.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasOhjausTestit
    {
        static readonly Kuvakulma Perus = new Kuvakulma(55.68, 12.57, 300, 60, 40, 45);

        static OpasOhjaus Aja(double s, double kierto, double korkeus, double etaisyys, OpasOhjaus o = null, double dt = 1 / 60.0)
        {
            o ??= new OpasOhjaus();
            for (double t = 0; t < s; t += dt) { o.Paivita(dt, kierto, korkeus, etaisyys); o.Sovella(Perus, 5); }
            return o;
        }

        [Testi] static void KiertoPehmeastiJaKohteeseenKatsoen()
        {
            var o = Aja(1, 1, 0, 0);
            var a = o.Sovella(Perus, 5);
            double kierto = KierrosLento.Kiedo(a.Suuntima - Perus.Suuntima);
            Oleta.Tosi(kierto > 25 && kierto < OpasOhjaus.KiertoMaxAstS, $"1 s täydellä tapilla {kierto:F1}° (kiihtyy pehmeästi)");
            Oleta.Tosi(a.Lat == Perus.Lat && a.Lon == Perus.Lon && a.KatseKorkeusM == Perus.KatseKorkeusM, "katse pysyy kohteessa");
            Oleta.Tosi(o.Aktiivinen, "tappia käytetty → automaattikierto seis");
            // Irrotus: liike hiipuu eikä pysähdy nykäisten; PaluuS:n jälkeen automaattikierto saa jatkaa pelaajan kulmasta.
            double ennen = o.Kierto; o.Paivita(1 / 60.0, 0, 0, 0); double jalkeen = o.Kierto;
            Oleta.Tosi(jalkeen - ennen > 0.3, "hiipuu, ei nykäise");
            Aja(OpasOhjaus.PaluuS + 0.5, 0, 0, 0, o);
            Oleta.Tosi(!o.Aktiivinen && o.Siirretty, "irrotuksen jälkeen ei aktiivinen, kulma säilyy");
        }

        [Testi] static void JyrkkyysJaEtaisyysRajoissa()
        {
            var ylos = Aja(10, 0, 1, 0).Sovella(Perus, 5);
            Oleta.Tosi(Math.Abs(ylos.Kallistus - OpasOhjaus.KallistusMin) < 1e-9, $"ylin = min-kallistus ({ylos.Kallistus})");
            var alas = Aja(10, 0, -1, 0).Sovella(Perus, 5);
            Oleta.Tosi(alas.Kallistus <= OpasOhjaus.KallistusMax + 1e-9, $"alin enintään max ({alas.Kallistus})");
            var kauas = Aja(10, 0, 0, 1).Sovella(Perus, 5);
            Oleta.Tosi(Math.Abs(kauas.EtaisyysM - OpasOhjaus.EtMaxM) < 1e-6, $"etäisyys max ({kauas.EtaisyysM})");
            var lahelle = Aja(10, 0, 0, -1).Sovella(Perus, 5);
            Oleta.Tosi(lahelle.EtaisyysM >= OpasOhjaus.EtMinM - 1e-6, $"etäisyys min ({lahelle.EtaisyysM})");
            // Rajalla ei kerry liikettä: suunnan vaihto liikkuu heti.
            var o = Aja(10, 0, 0, 1); var ennen = o.Sovella(Perus, 5).EtaisyysM; Aja(0.3, 0, 0, -1, o);
            Oleta.Tosi(o.Sovella(Perus, 5).EtaisyysM < ennen - 5, "rajalta palaa heti");
        }

        [Testi] static void KattorajaJyrkentaaKulmaa()
        {
            // Matala ja lähellä: kamera ei saa mennä alle maa + KattoYlaM.
            var o = Aja(10, 0, -1, -1);
            var a = o.Sovella(Perus, 5);
            double kameraKorkeus = a.KatseKorkeusM + a.EtaisyysM * Math.Cos(a.Kallistus * Math.PI / 180);
            Oleta.Tosi(kameraKorkeus >= 5 + OpasOhjaus.KattoYlaM - 1e-6, $"kamera {kameraKorkeus:F1} m (≥ {5 + OpasOhjaus.KattoYlaM})");
        }

        [Testi] static void KuollutAlueJaNollaus()
        {
            var o = Aja(2, 0.1, -0.1, 0.05);
            Oleta.Tosi(!o.Siirretty && !o.Aktiivinen, "kuollut alue: ei liikettä");
            o = Aja(1, 1, 1, 1); Oleta.Tosi(o.Siirretty);
            o.Nollaa();
            var a = o.Sovella(Perus, 5);
            Oleta.Tosi(!o.Siirretty && Math.Abs(a.EtaisyysM - Perus.EtaisyysM) < 1e-9 && Math.Abs(a.Kallistus - Perus.Kallistus) < 1e-9, "nollaus → automaattikehys");
        }

        [Testi] static void KehysnopeudestaRiippumaton()
        {
            var a = Aja(1, 1, 0.5, 0.5, null, 1 / 30.0).Sovella(Perus, 5);
            var b = Aja(1, 1, 0.5, 0.5, null, 1 / 120.0).Sovella(Perus, 5);
            Oleta.Tosi(Math.Abs(KierrosLento.Kiedo(a.Suuntima - b.Suuntima)) < 2.5 && Math.Abs(a.EtaisyysM - b.EtaisyysM) < 15,
                $"30 vs 120 fps: {a.Suuntima:F1}/{b.Suuntima:F1}°, {a.EtaisyysM:F0}/{b.EtaisyysM:F0} m");
        }
    }
}
