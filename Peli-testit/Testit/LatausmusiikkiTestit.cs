// LATAUSMUSIIKKI (omistaja 10.10.2026: "pelien ja linssien (jotka vaativat latausruudun) latausruudulla voisi kuulua musiikkia
// (olavin linnassa voi soittaa sen lopetusmusiikin toistaiseksi)"; Päätoimittajan täsmennys): AaniTilan Lataus-kanava.
// Nousu latauksen alussa, ristihäivytys näkymän avautuessa, nopea häivytys ohitettaessa tai poistuttaessa, ja musiikkiväylä
// (liuku 0, Musiikki-kytkin) koskee sitä kuten muuta musiikkia. Linssin pito ja väistö eivät koske latausmusiikkia.
using System;

namespace Matkakirja.Peli.Testit
{
    static class LatausmusiikkiTestit
    {
        const string Loppu = "https://media.matkakirja.app/seikkailu/olavinlinna/musiikki-v1/loppu.mp3";

        static AaniTila Uusi()
        {
            var t = AaniTaulut.Oletus();
            t.Maat["pariisi"] = "FRA"; t.Maat["wien"] = "AUT";
            var tila = new AaniTila(t, new Satunnainen(1).Seuraava);
            tila.Paikka("pariisi", "kaupunki");
            tila.LinssiPito(true, 200); // latausruutu on linssin sisällä (pallo, linna): pohja ja maisema pidossa
            return tila;
        }

        static Toive L(AaniTila t) => t.Toive(Kanava.Lataus);

        static void Lahella(double odotettu, double saatu, string viesti, double tarkkuus = 1e-9)
        {
            if (Math.Abs(odotettu - saatu) > tarkkuus) throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} {viesti}");
        }

        [Testi] static void NouseePehmeastiLatauksenAlussa()
        {
            var tila = Uusi();
            Oleta.Sama(null, L(tila).Url, "ei latausta: hiljaa");
            tila.LatausKaupunki("pariisi");
            var w = L(tila);
            Oleta.Tosi(w.Url != null && w.Url.Contains("/musa-kaupunki-pariisi-"), "kaupungin oma kappale kuten kartalla: " + w.Url);
            Oleta.Tosi(w.Uusi && w.Silmukka && !w.Tauko, "uusi soitin silmukkana");
            Oleta.Sama(AaniVakiot.LatausNousuMs, w.KestoMs ?? -1, "pehmeä nousu");
            Lahella(AaniVakiot.MusiikinPerustaso * tila.MusiikinKerroin, w.Tavoite, "kartan pohjaraidan taso");
            Oleta.Sama(null, tila.Toive(Kanava.Pohja).Url, "pohja pysyy linssipidossa");
            Oleta.Tosi(tila.LatausAuki, "latausruutu auki");
            // Sama kaupunki uudelleen (kierto, kuvan saapuminen): ei ala alusta eikä rampin kesto muutu.
            tila.LatausKaupunki("pariisi");
            Oleta.Tosi(!L(tila).Uusi && L(tila).KestoMs == null && L(tila).PoisMs == null, "sama raita jatkuu");
        }

        [Testi] static void RistihaivytysNakymanAvautuessa()
        {
            var tila = Uusi();
            tila.LatausKaupunki("pariisi");
            tila.LatausOhi(avautui: true);
            Oleta.Sama(null, L(tila).Url, "latausmusiikki pois");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(tila).PoisMs ?? -1, "ristihäivytys näkymän omaan ääneen");
            Oleta.Tosi(!tila.LatausAuki, "latausruutu kiinni");
            tila.LatausOhi(avautui: true);
            Oleta.Sama(null, L(tila).PoisMs, "toinen sulku ei tee mitään");
        }

        [Testi] static void OhitusJaPoistuminenHaivyttaa()
        {
            var tila = Uusi();
            tila.Lataus(Loppu, AaniVakiot.LatausLinnaVoima);
            tila.LatausOhi(avautui: false);
            Oleta.Sama(null, L(tila).Url, "pois");
            Oleta.Sama(AaniVakiot.LatausPoisMs, L(tila).PoisMs ?? -1, "nopea häivytys");
            Oleta.Tosi(AaniVakiot.LatausPoisMs < AaniVakiot.LatausRistiMs, "ohitus nopeampi kuin ristihäivytys");
        }

        [Testi] static void MusiikkiliukuNollaEiSoi()
        {
            var tila = Uusi();
            tila.AsetaLiuku(0);
            tila.Lataus(Loppu, AaniVakiot.LatausLinnaVoima);
            Oleta.Sama(null, L(tila).Url, "liuku 0: ei soi");
            Oleta.Tosi(tila.LatausAuki, "latausruutu silti auki");
            tila.AsetaLiuku(35);
            Oleta.Sama(Loppu, L(tila).Url, "liuku ylös latauksen aikana: soi");
            Oleta.Tosi(L(tila).Uusi, "alkaa");
            tila.AsetaLiuku(60);
            Lahella(AaniVakiot.LatausLinnaVoima * Musiikkitaso.Kerroin(60), L(tila).Tavoite, "seuraa liukua");
            Oleta.Sama(AaniVakiot.SaadinMs, L(tila).KestoMs ?? -1, "säätimen ramppi");
            tila.AsetaLiuku(0);
            Oleta.Sama(null, L(tila).Url, "liuku 0 kesken latauksen: pois");
            Oleta.Sama(AaniVakiot.SaadinMs, L(tila).PoisMs ?? -1, "säätimen häivytys");
            tila.AsetaLiuku(35);
            tila.MusiikkiPaalle(false);
            Oleta.Sama(null, L(tila).Url, "Musiikki-kytkin pois: ei soi");
            tila.MusiikkiPaalle(true);
            Oleta.Sama(Loppu, L(tila).Url, "kytkin takaisin");
            tila.AanimaisemaPaalle(false);
            Oleta.Sama(null, L(tila).Url, "äänimaisema (koko pelin mykistys) pois: ei soi");
        }

        [Testi] static void LinnanLoppumusiikinTaso()
        {
            // Oletusliuku 35 → sama taso kuin loppumusiikki linnassa (mikserin musiikki 0,35).
            var tila = Uusi();
            tila.Lataus(Loppu, AaniVakiot.LatausLinnaVoima);
            Lahella(0.35, L(tila).Tavoite, "≈ 0,35", 0.005);
        }

        [Testi] static void PitoJaVaistoEivatKosketa()
        {
            var tila = Uusi();
            tila.Lataus(Loppu, AaniVakiot.LatausLinnaVoima);
            var taso = L(tila).Tavoite;
            tila.Puhe(true);
            Lahella(taso, L(tila).Tavoite, "puheen väistö ei koske");
            tila.Puhe(false);
            tila.Hiljennys("lehti", true);
            Oleta.Sama(Loppu, L(tila).Url, "hiljennys ei katkaise");
            tila.LinssiPito(false);
            Oleta.Sama(Loppu, L(tila).Url, "linssin pito ei katkaise");
        }

        [Testi] static void KaupunkiIlmanOmaaKappalettaHiljaa()
        {
            var tila = Uusi();
            tila.LatausKaupunki("wien");
            Oleta.Sama(null, L(tila).Url, "Wien: ei omaa kappaletta kuten kartalla (KarttaVainKaupunki)");
            Oleta.Tosi(tila.LatausAuki, "latausruutu auki");
        }

        [Testi] static void RaidanVaihtoRistiin()
        {
            var tila = Uusi();
            tila.LatausKaupunki("pariisi");
            tila.Lataus(Loppu, AaniVakiot.LatausLinnaVoima);
            Oleta.Sama(Loppu, L(tila).Url, "uusi raita");
            Oleta.Tosi(L(tila).Uusi, "uusi soitin");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(tila).PoisMs ?? -1, "edellinen ristiin");
        }

        [Testi] static void PuuttuvaRaitaEiYritaUudelleen()
        {
            var tila = Uusi();
            tila.LatausKaupunki("pariisi");
            tila.Puuttuu(Kanava.Lataus);
            Oleta.Sama(null, L(tila).Url, "404: hiljaa");
            tila.LatausKaupunki("pariisi");
            Oleta.Sama(null, L(tila).Url, "sama raita ei yritä uudelleen");
            Oleta.Tosi(tila.LatausAuki, "latausruutu auki");
        }

        [Testi] static void MuutKanavatEnnallaan()
        {
            // Lataus-kanava ei muuta muiden kanavien toiveita (kultainen jälki vartioi ne erikseen).
            var a = Uusi();
            var b = Uusi();
            b.LatausKaupunki("pariisi");
            b.LatausOhi(true);
            foreach (Kanava k in new[] { Kanava.Pohja, Kanava.Maisema, Kanava.Visa, Kanava.Siirtyma, Kanava.Aarre })
                Oleta.Sama((a.Toive(k).Url, a.Toive(k).Tavoite, a.Toive(k).Tauko), (b.Toive(k).Url, b.Toive(k).Tavoite, b.Toive(k).Tauko), k.ToString());
        }
    }
}
