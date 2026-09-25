using System;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    /// <summary>Ihmisen matka II (omistaja 25.9.2026): oma tunnus ja muisti, omistus I:n kautta, portti kuten I:ssä.</summary>
    public static class IhmisenMatka2Testit
    {
        sealed class Koe : ILinssi
        {
            public LinssiTiedot Tiedot { get; }
            public bool Auki { get; private set; }
            public Koe(LinssiTiedot t) { Tiedot = t; }
            public void Avaa(ILinssiYmparisto y) { Auki = true; }
            public void Paivita() { }
            public void Sulje() { Auki = false; }
        }

        [Testi] static void OmaTunnusJaVierekkainValitsimessa()
        {
            var i = IhmisenMatkaLinssi.IhmisenMatkaTiedot;
            var ii = IhmisenMatkaLinssi.IhmisenMatka2Tiedot;
            Oleta.Sama("ihmisen-matka-2", ii.Id);
            Oleta.Tosi(ii.Id != i.Id, "oma tunnus = oma muisti");
            Oleta.Sama(i.Jarjestys + 1, ii.Jarjestys);
            Oleta.Tosi(IhmisenMatkaLinssi.OnIhmisenMatka(i.Id) && IhmisenMatkaLinssi.OnIhmisenMatka(ii.Id), "molemmat ovat ihmisen matka");
            Oleta.Tosi(!IhmisenMatkaLinssi.OnIhmisenMatka("keksinnot") && !IhmisenMatkaLinssi.OnIhmisenMatka(null), "muut eivät");
        }

        [Testi] static void OmistusSeuraaAlkuperaista()
        {
            bool kehittaja = Linssirekisteri.Kehittajatila;
            try
            {
                Linssirekisteri.Kehittajatila = false;
                var r = new Linssirekisteri(new ValeYmparisto());
                r.Lisaa(new Koe(IhmisenMatkaLinssi.IhmisenMatkaTiedot));
                r.Lisaa(new Koe(IhmisenMatkaLinssi.IhmisenMatka2Tiedot));
                Oleta.Tosi(!r.Saatavilla("ihmisen-matka-2"), "ei omistusta: ei saatavilla");
                r.Omistaa = id => id == "ihmisen-matka";
                Oleta.Tosi(r.Saatavilla("ihmisen-matka-2"), "I omistettu → II saatavilla");
                Oleta.Sama(2, r.Valittavat.Count);
                r.Omistaa = id => id == "ihmisen-matka-2";
                Oleta.Tosi(!r.Saatavilla("ihmisen-matka-2"), "omistus kysytään alkuperäiseltä");
            }
            finally { Linssirekisteri.Kehittajatila = kehittaja; }
        }

        [Testi] static void PorttiKutenI()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            r.Lisaa(new Koe(IhmisenMatkaLinssi.IhmisenMatka2Tiedot));
            bool kehittaja = Linssirekisteri.Kehittajatila;
            try
            {
                Linssirekisteri.Kehittajatila = true;
                r.Valitse("ihmisen-matka-2");
                Oleta.Tosi(r.EstaaKartan, "II estää kartan kuten I (web linssikarttaEstaa)");
            }
            finally { Linssirekisteri.Kehittajatila = kehittaja; }
        }

        // ── Lähikuvan laskeutuminen (erä 5; Fable 25.9.: kallistettu lento maaston yllä, sama kaava iPhone/iPad) ──

        static readonly Nakyma Rajaus = new Nakyma(12, 22, 9_342_000);   // iPhonen webin lähikuva

        /// <summary>Esitys: Kuva(kohde) ja heti jakson ajo rajaukseen; kello ajon loppuun ja kamera perille.</summary>
        static (ValeYmparisto v, IhmisenMatka2Ymparisto k) Perilla(float kesto = 9f)
        {
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v);
            k.Lahikuva((10, 20));
            k.AjaKamera(Rajaus, kesto);
            v.Kello = kesto + IhmisenMatka2Ymparisto.LaskunViive + 0.01;
            v.Asento = Rajaus;
            return (v, k);
        }

        [Testi] static void LaskeutuuKohteenYlleKallistettunaAjonJalkeen()
        {
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v);
            k.Lahikuva((10, 20));
            k.AjaKamera(Rajaus, 9f);
            Oleta.Sama<double?>(null, v.AjonKallistus, "saapuminen webin rajaukseen sellaisenaan");
            v.Kello = 9.1;
            v.Asento = Rajaus;
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count, "ei ennen ajon loppua + viivettä");
            v.Kello = 9.4;
            k.Paivita();
            Oleta.Sama(2, v.Loki.FindAll(r => r == "ajo").Count, "laskeutuminen");
            Oleta.Sama(10.0, v.Ajo.Value.Lat);
            Oleta.Sama(20.0, v.Ajo.Value.Lon);
            Oleta.Sama(4_000_000.0, v.Ajo.Value.Korkeus, "iPhonen 9 342 km → katto 4 000 km (kallistusrajan alle)");
            Oleta.Sama<double?>(IhmisenMatka2Ymparisto.Kallistus, v.AjonKallistus);
            Oleta.Sama(IhmisenMatka2Ymparisto.LaskuS, v.AjonKesto);
            k.Paivita();
            Oleta.Sama(2, v.Loki.FindAll(r => r == "ajo").Count, "kerran per jakso");
        }

        [Testi] static void SeuraavaAjoSuoristaaVainOmanKallistuksen()
        {
            var (v, k) = Perilla();
            k.Paivita();
            k.AjaKamera(new Nakyma(30, 40, 11_000_000), 9f);
            Oleta.Sama<double?>(0.0, v.AjonKallistus, "nousu suoraan");
            k.AjaKamera(new Nakyma(35, 45, 11_000_000), 9f);
            Oleta.Sama<double?>(null, v.AjonKallistus, "pelaajan kallistus säilyy, kun kääre ei kallistanut");
        }

        [Testi] static void KorkeusKallistusrajanAllaSamallaKaavalla()
        {
            Oleta.Sama(4_000_000.0, IhmisenMatka2Ymparisto.LaskunKorkeus(20_000_000), "pitkä ylitys");
            Oleta.Sama(4_000_000.0, IhmisenMatka2Ymparisto.LaskunKorkeus(9_342_000), "iPhone");
            Oleta.Sama(2_700_000.0, IhmisenMatka2Ymparisto.LaskunKorkeus(6_000_000), "iPad (osuus 0,45)");
            Oleta.Sama(2_200_000.0, IhmisenMatka2Ymparisto.LaskunKorkeus(3_000_000), "alaraja");
            Oleta.Sama(1_500_000.0, IhmisenMatka2Ymparisto.LaskunKorkeus(1_500_000), "ei koskaan ylöspäin");
        }

        [Testi] static void AlueenJaksoEiLaskeudu()
        {
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v);
            k.Lahikuva(null);
            k.AjaKamera(Rajaus, 9f);
            v.Kello = 20;
            v.Asento = Rajaus;
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count);
        }

        [Testi] static void PelaajanSiirtamaaKameraaEiLasketa()
        {
            var (v, k) = Perilla();
            v.Asento = new Nakyma(40, -3, 2_000_000);
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count);
        }

        [Testi] static void VahennettyLiikeEiLaskeudu()
        {
            var v = new ValeYmparisto { Vahennetty = true };
            var k = new IhmisenMatka2Ymparisto(v);
            k.Lahikuva((10, 20));
            k.AjaKamera(Rajaus, 0f);
            v.Kello = 5;
            v.Asento = Rajaus;
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count);
        }

        [Testi] static void EnsimmainenKohdeLaskeutuuKeskeneraisenAjonJalkeen()
        {
            // Avauksen Marokko-ajo on jo matkalla ensimmäiseen kohteeseen, eikä Esitys aja jaksoon uudelleen (ajoPerilla).
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v);
            k.AjaKamera(Rajaus, 11.4f);
            v.Kello = 5;
            k.Lahikuva((31.9, -8.9));
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count, "odottaa Marokko-ajon loppuun");
            v.Kello = 11.8;
            v.Asento = Rajaus;
            k.Paivita();
            Oleta.Sama(2, v.Loki.FindAll(r => r == "ajo").Count);
            Oleta.Sama(31.9, v.Ajo.Value.Lat);
        }

        [Testi] static void SulkiessaPalauttaaAvaushetkenKallistuksen()
        {
            var (v, k) = Perilla();
            k.Paivita();
            k.Kallista = false;
            k.AjaKamera(new Nakyma(48.85, 2.35, 2_000_000, 35), 0.9f);
            Oleta.Sama<double?>(35.0, v.AjonKallistus, "paluu talteen otettuun kallistukseen");

            var v2 = new ValeYmparisto();
            var k2 = new IhmisenMatka2Ymparisto(v2);
            k2.AjaKamera(Rajaus, 9f);
            k2.Kallista = false;
            k2.AjaKamera(new Nakyma(48.85, 2.35, 2_000_000, 35), 0.9f);
            Oleta.Sama<double?>(null, v2.AjonKallistus, "kääre ei muuttanut kallistusta: paluu sellaisenaan");
        }

        // ── Kerroksellinen sumu (erä 3) ──

        [Testi] static void AvauksenKuoriNakyyVainLahestyessa()
        {
            const double H = 8_000_000;
            Oleta.Sama(0.0, IhmisenMatka2Sumukuva.AvauksenOsuus(300 * 6_371_000.0, H), "kaukaa ei paisunutta pilvipalloa");
            Oleta.Sama(0.0, IhmisenMatka2Sumukuva.AvauksenOsuus(2.5 * H, H));
            double nousu = IhmisenMatka2Sumukuva.AvauksenOsuus(2.0 * H, H);
            Oleta.Tosi(nousu > 0 && nousu < 1, "nousu 2,5 H → 1,6 H");
            Oleta.Sama(1.0, IhmisenMatka2Sumukuva.AvauksenOsuus(1.6 * H, H));
            Oleta.Sama(1.0, IhmisenMatka2Sumukuva.AvauksenOsuus(1.2 * H, H));
            Oleta.Tosi(System.Math.Abs(IhmisenMatka2Sumukuva.AvauksenOsuus(1.1 * H, H) - 0.5) < 1e-9, "häivytys 1,2 H → H");
            Oleta.Sama(0.0, IhmisenMatka2Sumukuva.AvauksenOsuus(H, H), "läpi");
            Oleta.Sama(0.0, IhmisenMatka2Sumukuva.AvauksenOsuus(0.5 * H, H), "kuoren alla ei näy");
        }

        [Testi] static void KameraSyoksyyKaikkienKolmenKuorenLapi()
        {
            // Esityksen reitti: Afrikan valot 18 165 km → Marokko 9 342 km → ensimmäinen laskeutuminen 4 000 km.
            double Osuus(double kameraKm, int i) =>
                IhmisenMatka2Sumukuva.AvauksenOsuus(kameraKm * 1000, IhmisenMatka2Sumukuva.Avaus[i].KorkeusKm * 1000);
            Oleta.Sama(1.0, Osuus(18_165, 0), "ylin täysi Afrikan valoissa");
            Oleta.Tosi(Osuus(18_165, 2) == 0, "alin ei vielä");
            Oleta.Tosi(Osuus(9_342, 0) == 0 && Osuus(9_342, 1) > 0 && Osuus(9_342, 2) > 0, "Marokossa ylin ohitettu, kaksi alempaa");
            for (int i = 0; i < 3; i++) Oleta.Sama(0.0, Osuus(4_000, i), "laskeutumisessa kaikki läpäisty");
            bool kaikkiNakyivat = true;
            for (int i = 0; i < 3; i++)
            {
                bool nakyi = false;
                for (double km = 18_165; km >= 4_000; km -= 100) nakyi |= Osuus(km, i) > 0.5;
                kaikkiNakyivat &= nakyi;
            }
            Oleta.Tosi(kaikkiNakyivat, "jokainen kuori näkyy matkalla");
        }

        [Testi] static void SeutusumutJaksoista()
        {
            var afrikka = IhmisenMatka2Sumukuva.Seutu("omo");
            Oleta.Tosi(afrikka.Peitto > 0 && afrikka.R > afrikka.B, "kuumuusutu lämmin");
            var kylma = IhmisenMatka2Sumukuva.Seutu("beringia");
            Oleta.Tosi(kylma.B > kylma.R && kylma.Peitto > afrikka.Peitto, "jää-usva sininen ja tiheämpi");
            Oleta.Tosi(IhmisenMatka2Sumukuva.Seutu("aikahyppy").Pyorre, "aikahypyn pyörre");
            Oleta.Sama(0f, IhmisenMatka2Sumukuva.Seutu("avaus").Peitto, "avauksessa ei seutusumua");
            Oleta.Sama(0f, IhmisenMatka2Sumukuva.Seutu("loppu").Peitto, "loppu: sumu hälvenee");
            Oleta.Sama(0f, IhmisenMatka2Sumukuva.Seutu(null).Peitto);
            Oleta.Tosi(IhmisenMatka2Sumukuva.AvausJaksossa("afrikka") && IhmisenMatka2Sumukuva.AvausJaksossa("jebel-irhoud"), "avaus");
            Oleta.Tosi(!IhmisenMatka2Sumukuva.AvausJaksossa("omo"), "avaus päättyy ensimmäisen kohteen jälkeen");
        }

        // ── Saattolento (erä 5, Amerikat): kamera rintaman edellä, sitten laskeutuminen kohteeseen ──

        static readonly (double Lat, double Lon) MonteVerde = (-41.5, -73.2);

        [Testi] static void SaattolentoSeuraaRintamaaJaLaskeutuuPerilla()
        {
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v);
            (double Lat, double Lon)? rintama = (33.0, -106.0);   // White Sands
            k.Rintama = () => rintama;
            k.Jakso(IhmisenMatka2Ymparisto.SaattoJakso);
            Oleta.Tosi(k.Saattaa, "saattolento päällä");
            k.Lahikuva(MonteVerde);
            k.AjaKamera(new Nakyma(-20, -65, 9_000_000), 9f);
            Oleta.Sama(0, v.Loki.FindAll(r => r == "ajo").Count, "Esityksen jakson ajo ei mene kameraan");
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count, "ensimmäinen osa-ajo");
            Oleta.Tosi(Math.Abs(v.Ajo.Value.Lat - (33.0 - IhmisenMatka2Ymparisto.SaattoEtaisyysKm / 111.2)) < 1e-9, "rintaman eteläpuolella");
            Oleta.Sama(-106.0, v.Ajo.Value.Lon);
            Oleta.Sama(IhmisenMatka2Ymparisto.SaattoKorkeusKm * 1000, v.Ajo.Value.Korkeus);
            Oleta.Sama<double?>(IhmisenMatka2Ymparisto.SaattoKallistus, v.AjonKallistus);
            Oleta.Sama(IhmisenMatka2Ymparisto.SaattoAlkuS, v.AjonKesto, "pehmeä alku");
            Oleta.Tosi(v.AjonPehmennys == null, "oletuspehmennys alussa");
            v.Kello = 0.5;
            k.Paivita();
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count, "alku ajetaan melkein loppuun ennen seuraavaa");
            rintama = (10.0, -84.0);
            v.Kello = 1.3;
            k.Paivita();
            Oleta.Sama(2, v.Loki.FindAll(r => r == "ajo").Count, "osa-ajo");
            Oleta.Tosi(v.AjonPehmennys != null && Math.Abs(v.AjonPehmennys(0.3) - 0.3) < 1e-12, "lineaarinen osa-ajo");
            Oleta.Sama(-84.0, v.Ajo.Value.Lon);
            rintama = (-38.0, -72.5);   // alle 500 km Monte Verdestä
            v.Kello = 1.9;
            v.Asento = new Nakyma(-50, -72, 2_200_000);
            k.Paivita();
            Oleta.Tosi(!k.Saattaa, "perillä: saattolento päättyy");
            Oleta.Sama(MonteVerde.Lat, v.Ajo.Value.Lat, "laskeutuminen kohteen ylle");
            Oleta.Sama<double?>(IhmisenMatka2Ymparisto.Kallistus, v.AjonKallistus);
            Oleta.Sama(IhmisenMatka2Ymparisto.LaskuS, v.AjonKesto);
            int ajoja = v.Loki.FindAll(r => r == "ajo").Count;
            v.Kello = 20;
            k.Paivita();
            Oleta.Sama(ajoja, v.Loki.FindAll(r => r == "ajo").Count, "ei toista laskeutumista");
        }

        [Testi] static void SaattolentoVainAmerikoissaEikaVahennetyllaLiikkeella()
        {
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v) { Rintama = () => (33.0, -106.0) };
            k.Jakso("beringia");
            Oleta.Tosi(!k.Saattaa, "muu jakso");
            k.AjaKamera(new Nakyma(60, -170, 5_000_000), 9f);
            Oleta.Sama(1, v.Loki.FindAll(r => r == "ajo").Count, "Esityksen ajo sellaisenaan");
            v.Vahennetty = true;
            k.Jakso(IhmisenMatka2Ymparisto.SaattoJakso);
            Oleta.Tosi(!k.Saattaa, "vähennetty liike: ei saattolentoa");
            v.Vahennetty = false;
            k.Jakso(IhmisenMatka2Ymparisto.SaattoJakso);
            Oleta.Tosi(k.Saattaa, "Amerikat");
            k.Jakso("aikahyppy");
            Oleta.Tosi(!k.Saattaa, "seuraava jakso lopettaa kesken");
            var ilman = new IhmisenMatka2Ymparisto(new ValeYmparisto());
            ilman.Jakso(IhmisenMatka2Ymparisto.SaattoJakso);
            Oleta.Tosi(!ilman.Saattaa, "ilman rintamaa ei saattolentoa");
        }
    }
}
