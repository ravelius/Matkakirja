using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Kamera;

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

        // ── Kuvan väistö samalla käyrällä kuin kamera-ajo (löydös 151) ──

        static void Lahella(double odotettu, double saatu, string mita, double tol = 1e-9)
        {
            if (Math.Abs(odotettu - saatu) > tol) throw new Exception($"{mita}: odotettu {odotettu:R}, saatu {saatu:R}");
        }

        [Testi] static void KaareKirjaaAjotNumeroinJaKayrin()
        {
            var v = new ValeYmparisto { Kello = 3 };
            var k = new IhmisenMatka2Ymparisto(v);
            var rivit = new List<string>();
            k.Kirjaa = rivit.Add;
            Oleta.Sama(null, k.Ajo, "ei ajoja ennen ensimmäistä");
            var kuminauha = Kamerakayrat.Funktio(Kayra.Kuminauha);
            k.AjaKamera(Rajaus, 9f, kuminauha);
            Oleta.Sama(1, k.Ajo.Numero);
            Oleta.Sama(3.0, k.Ajo.Alku, "alku kääreen kellossa");
            Oleta.Sama(9.0, k.Ajo.KestoS);
            Oleta.Tosi(ReferenceEquals(kuminauha, k.Ajo.Kayra) && ReferenceEquals(kuminauha, v.AjonPehmennys), "sama käyrä kirjaan ja kameralle");
            v.Kello = 7.5;
            Lahella(0.5, k.Ajo.T(k.Kello), "puolivälissä");
            Lahella(kuminauha(0.5), k.Ajo.Osuus(k.Kello), "käyrän arvo");
            Lahella(4.5, k.Ajo.Jaljella(k.Kello), "jäljellä");
            k.AjaKamera(Rajaus, 2f);
            Oleta.Sama(2, k.Ajo.Numero);
            Lahella(0.5, k.Ajo.Kayra(0.5), "oletuskäyrä smootherstep (LinssiOhjain)");
            Lahella(Kamerakayrat.Pehmea(0.3), k.Ajo.Kayra(0.3), "oletuskäyrä smootherstep");
            Oleta.Sama(2, rivit.Count(r => r.StartsWith("kääre: ajo #")), "ajot lokiin numeroineen: " + string.Join(" | ", rivit));

            // Laskeutuminen ja saattolennon osa-ajot ovat kääreen omia ajoja: nekin kirjataan.
            var (v2, k2) = Perilla();
            int ennen = k2.Ajo.Numero;
            k2.Paivita();
            Oleta.Sama(ennen + 1, k2.Ajo.Numero, "laskeutuminen kirjattiin");
            Oleta.Sama((double)IhmisenMatka2Ymparisto.LaskuS, k2.Ajo.KestoS);
            Oleta.Sama<double?>(IhmisenMatka2Ymparisto.Kallistus, k2.Ajo.Kallistukseen);
        }

        [Testi] static void KuvanVaistoKulkeeJaksonAjonKayralla()
        {
            // Esitys: Kuva(kohde) ja heti samassa kutsussa jakson ajo; väistö liittyy ajoon ja kulkee sen käyrällä.
            var v = new ValeYmparisto { Kello = 10 };
            var k = new IhmisenMatka2Ymparisto(v);
            k.AjaKamera(new Nakyma(0, 0, 9_000_000), 9f);   // edellinen jakso
            v.Kello = 20;
            var vaisto = new KuvanVaisto();
            Oleta.Tosi(vaisto.Pyyda((0, -0.25), false, k.Kello, k.Ajo), "uusi kohde");
            var kayra = Kamerakayrat.Funktio(Kayra.SyoksyKuminauha);
            k.AjaKamera(Rajaus, 8f, kayra);
            Oleta.Tosi(vaisto.Ratkaise(k.Kello, k.Ajo), "liittyy jakson ajoon samassa kehyksessä");
            Oleta.Tosi(vaisto.Liikkuu && !vaisto.Odottaa);
            Oleta.Tosi(vaisto.Kuvaus(k.Kello).Contains("ajon #2"), vaisto.Kuvaus(k.Kello));
            foreach (var t in new[] { 0.1, 0.3, 0.5, 0.7, 0.85, 0.95 })
            {
                var (x, y) = vaisto.Arvo(20 + 8 * t);
                Lahella(0, x, "x");
                Lahella(-0.25 * kayra(t), y, $"väistö = ajon käyrä hetkellä {t}", 1e-12);
            }
            Oleta.Tosi(Enumerable.Range(0, 101).Any(i => kayra(i / 100.0) > 1), "kuminauhan ylitys: väistö joustaa samoin kuin kamera");
            var loppu = vaisto.Arvo(28);
            Oleta.Tosi(loppu == (0, -0.25) && !vaisto.Liikkuu, "perillä ajon lopussa");
            Oleta.Tosi(!vaisto.Pyyda((0, -0.25), false, 30, k.Ajo), "sama kohde (kohde → kohde): ei uutta liikettä");
        }

        [Testi] static void LopunAjoEnnenPaluutaKelpaa()
        {
            // Esityksen loppu (Paata) ajaa kameran koko palloon ENNEN Kuva(null)-kutsua: paluu liittyy tähän ajoon.
            var v = new ValeYmparisto { Kello = 50 };
            var k = new IhmisenMatka2Ymparisto(v);
            var vaisto = new KuvanVaisto();
            vaisto.Heti((0.1, -0.2));
            k.AjaKamera(new Nakyma(0, 0, 25_000_000), 1.2f);
            Oleta.Tosi(vaisto.Pyyda((0, 0), true, k.Kello, k.Ajo));
            Oleta.Tosi(vaisto.Ratkaise(k.Kello, k.Ajo), "samassa vaihdossa juuri ennen alkanut ajo");
            var (x, y) = vaisto.Arvo(50.6);
            Lahella(0.1 * (1 - Kamerakayrat.Pehmea(0.5)), x, "paluu ajon (smootherstep) tahdissa", 1e-6);
            Lahella(-0.2 * (1 - Kamerakayrat.Pehmea(0.5)), y, "paluu y", 1e-6);
        }

        [Testi] static void IlmanAjoaVaistoOdottaaJaLiukuuPehmeasti()
        {
            var v = new ValeYmparisto { Kello = 100 };
            var k = new IhmisenMatka2Ymparisto(v);
            // 1. Marokon ajo jo matkalla (ei uutta jakson ajoa): pehmeä liuku sen loppuun.
            k.AjaKamera(Rajaus, 12f, t => Esitysmatikka.MarokonKaari(t));
            v.Kello = 108;
            var vaisto = new KuvanVaisto();
            vaisto.Pyyda((0, -0.2), false, k.Kello, k.Ajo);
            v.Kello = 108 + KuvanVaisto.OdotusS / 2;
            Oleta.Tosi(!vaisto.Ratkaise(k.Kello, k.Ajo) && vaisto.Odottaa, "odottaa vielä jakson ajoa");
            v.Kello = 108 + KuvanVaisto.OdotusS + 0.01;
            Oleta.Tosi(vaisto.Ratkaise(k.Kello, k.Ajo), "ajoa ei tullut");
            Oleta.Tosi(vaisto.Kuvaus(k.Kello).Contains("omalla käyrällä") && vaisto.Kuvaus(k.Kello).Contains("3.87 s"),
                "käynnissä olevan ajon loppuun: " + vaisto.Kuvaus(k.Kello));
            var (_, y) = vaisto.Arvo(k.Kello + 3.87 / 2);
            Lahella(-0.1, y, "smootherstep puolivälissä", 1e-3);
            Oleta.Tosi(vaisto.Arvo(112.1) == (0, -0.2) && !vaisto.Liikkuu, "perillä yhtä aikaa ajon kanssa");

            // 2. Ei ajoa lainkaan: oletuskestot (kuva esiin 1,6 s, paluu 1,8 s).
            var v2 = new ValeYmparisto { Kello = 5 };
            var k2 = new IhmisenMatka2Ymparisto(v2);
            var p = new KuvanVaisto();
            p.Pyyda((0.2, 0), false, k2.Kello, k2.Ajo);
            v2.Kello = 5.2;
            p.Ratkaise(k2.Kello, k2.Ajo);
            Oleta.Tosi(p.Kuvaus(k2.Kello).Contains("1.60 s"), p.Kuvaus(k2.Kello));
            p.Arvo(20);
            p.Pyyda((0, 0), true, 20, k2.Ajo);
            p.Ratkaise(20.2, k2.Ajo);
            Oleta.Tosi(p.Kuvaus(20.2).Contains("1.80 s"), "paluu 1,8 s (ei 0,9 s): " + p.Kuvaus(20.2));
        }

        [Testi] static void SaattolennonEnsimmainenOsaAjoSeuraavassaKehyksessa()
        {
            // Amerikat: Esityksen jakson ajo ei mene kameraan; väistö odottaa kääreen ensimmäistä osa-ajoa (seuraava kehys).
            var v = new ValeYmparisto { Kello = 1 };
            var k = new IhmisenMatka2Ymparisto(v) { Rintama = () => (33.0, -106.0) };
            k.Jakso(IhmisenMatka2Ymparisto.SaattoJakso);
            var vaisto = new KuvanVaisto();
            vaisto.Pyyda((0, -0.2), false, k.Kello, k.Ajo);
            k.Lahikuva(MonteVerde);
            k.AjaKamera(new Nakyma(-20, -65, 9_000_000), 9f);
            Oleta.Tosi(!vaisto.Ratkaise(k.Kello, k.Ajo), "Esityksen ajo ei ole kameran ajo");
            v.Kello = 1 + 1 / 60.0;
            k.Paivita();
            Oleta.Tosi(vaisto.Ratkaise(k.Kello, k.Ajo), "ensimmäinen osa-ajo");
            Oleta.Tosi(vaisto.Kuvaus(k.Kello).Contains("ajon #1") && vaisto.Kuvaus(k.Kello).Contains("1.60 s"), vaisto.Kuvaus(k.Kello));
        }

        sealed class KuvaNakyma : IEsityksenNakyma
        {
            public Func<int> AjoNyt;
            public readonly List<(string kohde, int ajo)> Kuvat = new List<(string, int)>();
            public void Musta(bool paalla, double feidiMs) { }
            public void Valot(double feidiMs) { }
            public void PidonPohja(double vuosiaSitten) { }
            public void Jakso(int i, KertomusJakso jakso) { }
            public void Kello(double vuosiaSitten) { }
            public void SytytaKohde(string kohde) { }
            public void Kuva(string kohde) => Kuvat.Add((kohde, AjoNyt()));
            public void Pulu(string teksti) { }
            public void Tunne(string tunne, double voimakkuus, string jakso) { }
            public void VirtojenPito(bool paalla) { }
            public void Loppu() { }
        }

        [Testi] static void EsitysKutsuuKuvanEnnenJaksonAjoa()
        {
            // Väistön oletus (IhmisenMatka2Tehosteet): kohdejakson Kuva tulee juuri ennen jakson ajoa samassa Paivita-kutsussa,
            // ja kääreen ajo on Esityksen rajaus (sama kesto ja käyrä), joten väistö ja ajo ovat yksi liike.
            var (kertomus, kohteet, leimat) = EsitysAjoTestitApu.Aineisto();
            var v = new ValeYmparisto();
            var k = new IhmisenMatka2Ymparisto(v);
            var n = new KuvaNakyma { AjoNyt = () => k.Ajo?.Numero ?? 0 };
            var e = new Esitys(kertomus, kohteet, leimat, null, k, n, new EsitysAjoTestit.ValeAani(v, leimat.Values.Max(l => l.Paattyy)));
            e.Aloita();
            var omo = leimat["omo"];
            while (v.Kello * 1000 < omo.Alku - leimat["avaus"].Alku + 50) { v.Kello += 1 / 60.0; k.Paivita(); e.Paivita(); }
            Oleta.Sama("omo", kertomus[e.I].Id);
            var kuva = n.Kuvat.Last(x => x.kohde == "omo-kibish");
            Oleta.Tosi(k.Ajo.Numero > kuva.ajo, $"jakson ajo Kuva-kutsun jälkeen (#{kuva.ajo} → #{k.Ajo.Numero})");
            Lahella(e.ViimeisinAjo.Value.kestoMs / 1000, k.Ajo.KestoS, "kääreen ajo = Esityksen jakson ajo", 1e-6);
            Oleta.Tosi(v.AjonPehmennys != null && ReferenceEquals(v.AjonPehmennys, k.Ajo.Kayra), "sama käyrä kameralle ja väistölle");
            var vaisto = new KuvanVaisto();
            vaisto.Pyyda((0, -0.2), false, k.Ajo.Alku, null);
            Oleta.Tosi(vaisto.Ratkaise(k.Ajo.Alku, k.Ajo), "väistö liittyy jakson ajoon");
        }

        // ── Avaus rauhassa (löydös 152): tähdet ja pallo feidautuvat mustasta, pallo lähestyy samaan aikaan ──

        [Testi] static void RauhallinenAvausFeidiJaZoomiYhtaAikaa()
        {
            var kultainen = System.Text.Json.JsonDocument.Parse(System.IO.File.ReadAllText(System.IO.Path.Combine(
                AppContext.BaseDirectory, "..", "kultaiset", "esitys.json"))).RootElement;
            foreach (var c in kultainen.GetProperty("avaus").EnumerateArray())
            {
                var lauseet = c.GetProperty("lauseet").EnumerateArray().Select(x => x.GetDouble()).ToList();
                double? sana = c.GetProperty("sana").ValueKind == System.Text.Json.JsonValueKind.Number ? c.GetProperty("sana").GetDouble() : (double?)null;
                double kesto = c.GetProperty("kesto").GetDouble();
                var i = Esitysmatikka.Avaus(lauseet, sana, kesto);
                var ii = Esitysmatikka.RauhallinenAvaus(lauseet, sana, kesto);
                Oleta.Sama(i.Musta, ii.Musta, "ensimmäinen virke mustalla kuten I:ssä");
                Oleta.Sama(i.ZoomLoppu, ii.ZoomLoppu, "zoomi perillä samaan aikaan kuin I:ssä (valot ja Marokko eivät siirry)");
                Oleta.Sama(i.Afrikka, ii.Afrikka);
                double katto = Esitysmatikka.AvaruudenMs + Esitysmatikka.ZoominJatkoMs;
                Oleta.Sama(Math.Max(ii.Musta, i.ZoomLoppu - katto), ii.ZoomAlku, "zoomi alkaa feidin kanssa (ellei katto rajaa)");
                Oleta.Tosi(ii.ZoomKesto <= katto && ii.ZoomKesto >= i.ZoomKesto, "zoomi pidempi, katon alla");
                Oleta.Tosi(ii.Feidi > 0 && ii.Feidi <= Esitysmatikka.RauhallinenFeidiMs, "feidi rauhassa: " + ii.Feidi);
                Oleta.Sama(ii.Musta + ii.Feidi, ii.Piste);
            }
            // Oikea kertomus: musta 4,7 s, feidi 2,75 s ja zoomi 4,7 → 13,44 s alkavat samalla hetkellä.
            var (kertomus, kohteet, leimat) = EsitysAjoTestitApu.Aineisto();
            var l = leimat["avaus"];
            var a = Esitysmatikka.RauhallinenAvaus(l.Lauseet, Esitys.SananHetki(kertomus[0], l, l.Kesto), l.Kesto);
            Oleta.Sama(a.Musta, a.ZoomAlku, "feidi ja zoomi yhtä aikaa");
            Oleta.Sama(Esitysmatikka.RauhallinenFeidiMs, a.Feidi);
            Oleta.Sama(Esitysmatikka.Avaus(l.Lauseet, Esitys.SananHetki(kertomus[0], l, l.Kesto), l.Kesto).ZoomLoppu, a.ZoomLoppu);
        }

        [Testi] static void IIAvausAjossaEikaPalloKutistu()
        {
            var (kertomus, kohteet, leimat) = EsitysAjoTestitApu.Aineisto();
            var y = new ValeYmparisto();
            var n = new EsitysAjoTestit.ValeNakyma(y);
            var e = new Esitys(kertomus, kohteet, leimat, null, y, n, new EsitysAjoTestit.ValeAani(y, leimat.Values.Max(x => x.Paattyy)))
                { RauhallinenAvaus = true };
            void Aja(double s) { double loppu = y.Kello + s; while (y.Kello < loppu) { y.Kello += 1 / 60.0; e.Paivita(); } }
            e.Aloita();
            var v = e.AvauksenAjat();
            Oleta.Tosi(y.Avaruus != null && y.Ajo == null, "kamera avaruudessa mustan alla ilman ajoa (Raamattu: alkuzoomi verhon takana)");
            Aja((v.Musta - 40) / 1000);
            Oleta.Tosi(e.MustaPaalla && y.Ajo == null, "ensimmäinen virke mustalla, ei ajoa");
            Oleta.Sama(0.0, e.TahtienEsiin, "tähdet mustan alla");
            Aja(0.05);
            Oleta.Tosi(!e.MustaPaalla, "feidi alkoi");
            Oleta.Sama(Esitysmatikka.RauhallinenFeidiMs, n.MustanFeidi, "feidi 2,75 s");
            Oleta.Tosi(y.Ajo != null && y.Loki.Count(r => r == "ajo") == 1, "zoomi alkoi samassa kehyksessä kuin feidi");
            Oleta.Tosi(y.Ajo.Value.Korkeus < Esitysmatikka.AvaruudenKorkeus * Kameramatikka.MaanSade / 10, "pallo lähestyy, ei kutistu");
            Oleta.Tosi(Math.Abs(y.AjonKesto - (v.ZoomLoppu - v.Musta) / 1000) < 0.05, "zoomi saapuu ZoomLoppussa: " + y.AjonKesto);
            Oleta.Tosi(Math.Abs(y.AjonPehmennys(0.5) - Kamerakayrat.Arvo(Kayra.SyoksyKuminauha, 0.5)) < 1e-12, "syöksy: hidas alku");
            Oleta.Tosi(y.AjonPehmennys(0.1) < 0.05, "alku rauhassa");
            Aja(v.Feidi / 2000);
            Oleta.Tosi(Math.Abs(e.TahtienEsiin - 0.5) < 0.03, "tähdet puolivälissä feidiä: " + e.TahtienEsiin);
            Aja(v.Feidi / 2000);
            Oleta.Sama(1.0, e.TahtienEsiin, "tähdet täysin feidin jälkeen");
            Aja((v.ZoomLoppu - v.Musta - v.Feidi) / 1000 + 0.5);
            Oleta.Tosi(n.Hetki("valot") >= v.ZoomLoppu - 20, "valot vasta zoomin jälkeen kuten I:ssä");
            Oleta.Sama(1, y.Loki.Count(r => r == "ajo"), "yksi yhtenäinen zoomi");

            // I sellaisenaan: webin avaus, IhmisenMatkaLinssi valitsee tunnuksesta.
            var aineisto = NostoKentatTestit.Aineisto();
            Oleta.Tosi(!new IhmisenMatkaLinssi(aineisto, null, n, null).RauhallinenAvaus, "I: webin avaus");
            var ii = new IhmisenMatkaLinssi(aineisto, null, n, null, IhmisenMatkaLinssi.IhmisenMatka2Tiedot);
            Oleta.Tosi(ii.RauhallinenAvaus, "II: rauhallinen avaus");
            ii.Avaa(new ValeYmparisto());
            Oleta.Tosi(ii.Esitys.RauhallinenAvaus, "II:n esitys saa parametrin");
            ii.Sulje();
        }
    }
}
