// Pallon eleiden puhtaat osat (Assets/Matkakirja/Kartta/KameraEleet.cs; omistajan build 9 -löydökset 28, 30, 31).
using System;

namespace Matkakirja.Peli.Testit
{
    static class KameraEleetTestit
    {
        const double R = 6_378_137.0;

        static bool Lahella(double a, double b, double tol = 1e-6) => Math.Abs(a - b) <= tol;

        [Testi] static void LukkoOdottaaKynnysta()
        {
            // Pieni liike kaikkiin suuntiin: ei vielä lukitusta.
            var l = KameraEleet.Paata((100, 100), (300, 100), (102, 104), (299, 105));
            Oleta.Sama(Elelukko.Ei, l);
        }

        [Testi] static void NipistysLukitseeNipistykseenEikaKallista()
        {
            // Nipistys, jossa keskipiste valuu 15 pt alas (löydös 28: tämä kallisti ennen).
            var l = KameraEleet.Paata((100, 200), (300, 200), (80, 185), (320, 185));
            Oleta.Sama(Elelukko.NipistysKierto, l, "väli 200 → 240");
            // Sama pystyvalunta ilman välin muutosta ja toisen sormen vastaliike: ei kallistusta (suunnat eri).
            l = KameraEleet.Paata((100, 200), (300, 200), (100, 185), (300, 205));
            Oleta.Tosi(l != Elelukko.Kallistus, "sormet eri suuntiin ei ole kallistus");
        }

        [Testi] static void YhdensuuntainenPystyvetoKallistaa()
        {
            var l = KameraEleet.Paata((100, 200), (300, 200), (101, 186), (299, 187));
            Oleta.Sama(Elelukko.Kallistus, l, "molemmat 13–14 pt alas, väli sama");
            l = KameraEleet.Paata((100, 200), (300, 200), (100, 220), (300, 215));
            Oleta.Sama(Elelukko.Kallistus, l, "molemmat ylös");
            // Vain toinen sormi ylittää kynnyksen: ei vielä.
            l = KameraEleet.Paata((100, 200), (300, 200), (100, 220), (300, 205));
            Oleta.Sama(Elelukko.Ei, l);
        }

        [Testi] static void KiertoLukitseeNipistysKiertoon()
        {
            // Sormipari kiertyy 10° keskipisteen ympäri, väli pysyy.
            double k = 10 * Math.PI / 180, c = Math.Cos(k), s = Math.Sin(k);
            var a = (200 - 100 * c, 200 - 100 * s);
            var b = (200 + 100 * c, 200 + 100 * s);
            Oleta.Sama(Elelukko.NipistysKierto, KameraEleet.Paata((100, 200), (300, 200), a, b));
            Oleta.Tosi(Lahella(10.0, KameraEleet.KulmaMuutos((100, 200), (300, 200), a, b), 1e-9), "vastapäivään +10°");
            // Kierron kiedonta: 350° → −10°.
            Oleta.Tosi(Lahella(-10.0, KameraEleet.KulmaMuutos((0, 0), (1, 0), (0, 0), (Math.Cos(-k), Math.Sin(-k))), 1e-9));
        }

        /// <summary>Omistaja 24.9. klo 22.4x: nipistyksen pieni kierto ei käännä karttaa; kynnyksen jälkeen ei hyppyä.</summary>
        [Testi] static void KiertoEstinKutenGoogleEarth()
        {
            Oleta.Sama(15.0, KameraEleet.KiertoEstinAst);
            var e = new KameraEleet.KiertoEstin();
            double yht = 0;
            for (int i = 0; i < 7; i++) yht += e.Suodata(2.0); // 14° kertynyt
            Oleta.Sama(0.0, yht, "alle kynnyksen pohjoinen pysyy");
            Oleta.Tosi(!e.Auki);
            Oleta.Sama(1.0, e.Suodata(2.0), "16°: kynnys vähennetään, kartta jatkaa 1° eikä hyppää 16°");
            Oleta.Tosi(e.Auki);
            Oleta.Sama(3.0, e.Suodata(3.0), "auki: seuraa sormia sellaisenaan");
            Oleta.Sama(-2.0, e.Suodata(-2.0), "myös takaisin");
            e.Nollaa();
            Oleta.Sama(0.0, e.Suodata(-10.0) + e.Suodata(9.0) + e.Suodata(-4.0), "edestakainen hapuilu: nettokertymä −5° ei ylitä kynnystä");
            Oleta.Sama(-10.0, e.Suodata(-20.0), "kertymä −25°: kynnys vähennetään etumerkillä (−25 + 15)");
        }

        /// <summary>Omistaja 24.9. klo 22.4x: veto ylös kallistaa viistoon, alas palauttaa; hitaampi (0,20 °/pt).</summary>
        [Testi] static void KallistusYlosVetaenJaHitaampi()
        {
            Oleta.Sama(0.20, KameraEleet.KallistusHerkkyys);
            Oleta.Tosi(KameraEleet.KallistusMuutos(100) > 0, "ylös = lisää kallistusta");
            Oleta.Tosi(KameraEleet.KallistusMuutos(-100) < 0, "alas = kohti ylhäältä katsottavaa");
            Oleta.Tosi(Math.Abs(KameraEleet.KallistusMuutos(100) - 20.0) < 1e-9, "100 pt = 20°");
        }

        [Testi] static void VaakasiirtoPanoroi()
        {
            var l = KameraEleet.Paata((100, 200), (300, 200), (125, 202), (325, 201));
            Oleta.Sama(Elelukko.NipistysKierto, l, "kahden sormen vaakaveto");
        }

        [Testi] static void KallistusrajaTaysiPelikorkeuksilla()
        {
            Oleta.Tosi(Lahella(85, KameraEleet.KallistusRaja(300_000, 85)), "300 km");
            Oleta.Tosi(Lahella(85, KameraEleet.KallistusRaja(1_500_000, 85)), "1500 km");
            Oleta.Tosi(Lahella(0, KameraEleet.KallistusRaja(7_000_000, 85)), "7000 km");
            Oleta.Tosi(Lahella(0, KameraEleet.KallistusRaja(20_000_000, 85)), "koko pallo");
            Oleta.Tosi(Lahella(42.5, KameraEleet.KallistusRaja(4_250_000, 85), 1e-9), "puolivälissä puolet");
            double edellinen = 90;
            for (double h = 0; h <= 8_000_000; h += 100_000)
            {
                double r = KameraEleet.KallistusRaja(h, 85);
                Oleta.Tosi(r <= edellinen + 1e-12, "laskeva " + h);
                edellinen = r;
            }
        }

        [Testi] static void Tuplanapautus()
        {
            Oleta.Tosi(!KameraEleet.OnTupla(-1, (0, 0), 1.0, (0, 0)), "ei edellistä");
            Oleta.Tosi(KameraEleet.OnTupla(1.0, (100, 100), 1.25, (110, 120)), "0,25 s ja 22 pt");
            Oleta.Tosi(!KameraEleet.OnTupla(1.0, (100, 100), 1.35, (100, 100)), "liian myöhään");
            Oleta.Tosi(!KameraEleet.OnTupla(1.0, (100, 100), 1.1, (140, 100)), "liian kaukana");
        }

        [Testi] static void RuutuMaahanSuuntimanMukaan()
        {
            var (i, p) = KameraEleet.RuutuMaahan(10, 0, 0);
            Oleta.Tosi(Lahella(10, i) && Lahella(0, p), "pohjoinen ylös: oikea = itä");
            (i, p) = KameraEleet.RuutuMaahan(0, 10, 90);
            Oleta.Tosi(Lahella(10, i) && Lahella(0, p), "itä ylös: ylös = itä");
            (i, p) = KameraEleet.RuutuMaahan(10, 0, 90);
            Oleta.Tosi(Lahella(0, i) && Lahella(-10, p), "itä ylös: oikea = etelä");
            (i, p) = KameraEleet.RuutuMaahan(0, 10, 180);
            Oleta.Tosi(Lahella(0, i) && Lahella(-10, p), "etelä ylös: ylös = etelä");
        }

        [Testi] static void MaastoRako()
        {
            Oleta.Sama(150.0, KameraEleet.VahimmaisRako(1000));
            Oleta.Sama(3000.0, KameraEleet.VahimmaisRako(300_000));
            // Pystysuoraan: silmä = a + d.
            Oleta.Tosi(Lahella(5000 + 20000, KameraEleet.SilmanKorkeus(5000, 20000, 0, R), 1e-3));
            // Riittävä rako: ei muutosta.
            var (k, d) = KameraEleet.Maastolle(0, 300_000, 85, 9000, R);
            Oleta.Tosi(Lahella(85, k) && Lahella(300_000, d), "300 km:n päästä 85° on yli 9 km");
            // 20 km:n päästä 85°: silmä ~1,8 km; vuori 3000 m + rako → kallistus pienenee, etäisyys pysyy.
            (k, d) = KameraEleet.Maastolle(0, 20_000, 85, 3200, R);
            Oleta.Tosi(k < 85 && k > 0 && Lahella(20_000, d), "kallistus " + k);
            Oleta.Tosi(Lahella(3200, KameraEleet.SilmanKorkeus(0, 20_000, k, R), 1e-3), "silmä tasan rajalla");
            // Kallistus 0 ei riitä: kamera nousee.
            (k, d) = KameraEleet.Maastolle(0, 1000, 40, 3200, R);
            Oleta.Tosi(Lahella(0, k) && Lahella(3200, d), "nousu " + d);
        }
    }
}
