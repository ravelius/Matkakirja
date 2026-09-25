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
    }
}
