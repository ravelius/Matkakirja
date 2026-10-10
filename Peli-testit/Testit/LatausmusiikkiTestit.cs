// LATAUSMUSIIKKI (omistaja 10.10.2026: "pelien ja linssien (jotka vaativat latausruudun) latausruudulla voisi kuulua musiikkia
// (olavin linnassa voi soittaa sen lopetusmusiikin toistaiseksi)"; Päätoimittajan täsmennys): AaniTilan Lataus-kanava.
// Nousu latauksen alussa, ristihäivytys näkymän avautuessa, nopea häivytys ohitettaessa tai poistuttaessa, ja musiikkiväylä
// (liuku 0, Musiikki-kytkin) koskee sitä kuten muuta musiikkia. Linssin pito ja väistö eivät koske latausmusiikkia.
// Päätoimittaja 10.10. 20.2x: pallossa varalla kartan alueraita, sama taso kuin Olavinlinnassa, ja kierroksen alkaessa raita
// laskee tasorampilla kartan tasolle (~3 s) katkeamatta; muu raita kierroksella = ristihäivytys. Taso annetaan valmiina (kohdenäkymän
// mikserin musiikkitaso, Aanisoitin.MusiikkiTaso) eikä se seuraa liu'un käyrää: simu 10.10. 20.57 linnan konteksti vaihtui kesken
// nimiruudun ja taso hyppäsi 0,34 → 0,94.
using System;

namespace Matkakirja.Peli.Testit
{
    static class LatausmusiikkiTestit
    {
        const string Loppu = "https://media.matkakirja.app/seikkailu/olavinlinna/musiikki-v1/loppu.mp3";
        /// <summary>Mikserin musiikin perustaso (Voima.Musiikki oletus) = latausmusiikin taso ilman mikserin kertoimia.</summary>
        const double T = 0.35;

        static AaniTila Uusi()
        {
            var t = AaniTaulut.Oletus();
            t.Maat["pariisi"] = "FRA"; t.Maat["wien"] = "AUT"; t.Maat["ateena"] = "GRC"; t.Maat["belgrad"] = "SRB";
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
            tila.LatausKaupunki("pariisi", T);
            var w = L(tila);
            Oleta.Tosi(w.Url != null && w.Url.Contains("/musa-pallo-pariisi-"), "Pariisin oma latausraita: " + w.Url);
            Oleta.Tosi(w.Uusi && w.Silmukka && !w.Tauko, "uusi soitin silmukkana");
            Oleta.Sama(AaniVakiot.LatausNousuMs, w.KestoMs ?? -1, "pehmeä nousu");
            Lahella(T, w.Tavoite, "annettu taso");
            Oleta.Sama(null, tila.Toive(Kanava.Pohja).Url, "pohja pysyy linssipidossa");
            Oleta.Tosi(tila.LatausAuki, "latausruutu auki");
            // Sama kaupunki uudelleen (kierto, kuvan saapuminen): ei ala alusta eikä rampin kesto muutu.
            tila.LatausKaupunki("pariisi", T);
            Oleta.Tosi(!L(tila).Uusi && L(tila).KestoMs == null && L(tila).PoisMs == null, "sama raita jatkuu");
        }

        [Testi] static void RistihaivytysNakymanAvautuessa()
        {
            // Olavinlinna: lopetusmusiikki ristiin linnan omiin ääniin (ei jatku näkymässä).
            var tila = Uusi();
            tila.Lataus(Loppu, T);
            tila.LatausOhi(avautui: true);
            Oleta.Sama(null, L(tila).Url, "latausmusiikki pois");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(tila).PoisMs ?? -1, "ristihäivytys näkymän omaan ääneen");
            Oleta.Sama(3000, AaniVakiot.LatausRistiMs, "~3 s");
            Oleta.Tosi(L(tila).PoisDesibeli, "ristihäivytys desibeleissä (PT 21.5x)");
            // Häivytys 0,52 → 0 (linnan taso): 100 ms:n askel ≤ 1 dB lattiaan (−30 dB) asti, lopussa nolla.
            var r = new Tasoramppi(0.52);
            r.Aloita(0, AaniVakiot.LatausRistiMs, true);
            double edellinen = 0.52, suurin = 0;
            for (int i = 0; i < 29; i++)
            {
                for (int j = 0; j < 3; j++) r.Askel(1 / 30.0);
                suurin = Math.Max(suurin, 20 * Math.Log10(edellinen / r.Arvo)); edellinen = r.Arvo;
            }
            Oleta.Tosi(suurin <= 1.0 + 1e-9, $"100 ms:n askel ≤ 1 dB: {suurin:0.00} dB");
            Oleta.Tosi(20 * Math.Log10(0.52 / r.Arvo) <= Tasoramppi.HaivytysLattiaDb + 1e-9, "lattiassa ennen loppua");
            for (int j = 0; j < 6; j++) r.Askel(1 / 30.0);
            Oleta.Sama(0.0, r.Arvo, "lopussa nolla");
            Oleta.Tosi(!tila.LatausAuki, "latausruutu kiinni");
            tila.LatausOhi(avautui: true);
            Oleta.Sama(null, L(tila).PoisMs, "toinen sulku ei tee mitään");
        }

        [Testi] static void OhitusJaPoistuminenHaivyttaa()
        {
            var tila = Uusi();
            tila.Lataus(Loppu, T);
            tila.LatausOhi(avautui: false);
            Oleta.Sama(null, L(tila).Url, "pois");
            Oleta.Sama(AaniVakiot.LatausPoisMs, L(tila).PoisMs ?? -1, "nopea häivytys");
            Oleta.Tosi(!L(tila).PoisDesibeli, "ohitus lineaarinen");
            Oleta.Tosi(AaniVakiot.LatausPoisMs < AaniVakiot.LatausRistiMs, "ohitus nopeampi kuin ristihäivytys");
        }

        [Testi] static void MusiikkiliukuNollaEiSoi()
        {
            var tila = Uusi();
            tila.AsetaLiuku(0);
            tila.Lataus(Loppu, T);
            Oleta.Sama(null, L(tila).Url, "liuku 0: ei soi");
            Oleta.Tosi(tila.LatausAuki, "latausruutu silti auki");
            tila.AsetaLiuku(35);
            Oleta.Sama(Loppu, L(tila).Url, "liuku ylös latauksen aikana: soi");
            Oleta.Tosi(L(tila).Uusi, "alkaa");
            Lahella(T, L(tila).Tavoite, "annettu taso");
            tila.AsetaLatausTaso(0.5);
            Lahella(0.5, L(tila).Tavoite, "mikserin säädin latauksen aikana");
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

        [Testi] static void KontekstinLiukuEiHypi()
        {
            // Simu 10.10. 20.57: linnan mikseri (musiikki ×1,49) tuli voimaan kesken nimiruudun → liuku 35 → 52 ja taso 0,34 → 0,94.
            // Nyt taso on linnan loppumusiikin taso (0,35 × 1,49 ≈ 0,52) alusta asti, eikä liu'un vaihto muuta sitä.
            var tila = Uusi();
            tila.Lataus(Loppu, 0.52);
            Lahella(0.52, L(tila).Tavoite, "loppumusiikin taso");
            tila.AsetaLiuku(52);
            Lahella(0.52, L(tila).Tavoite, "kontekstin liuku ei muuta");
        }

        [Testi] static void PitoJaVaistoEivatKosketa()
        {
            var tila = Uusi();
            tila.Lataus(Loppu, T);
            var taso = L(tila).Tavoite;
            tila.Puhe(true);
            Lahella(taso, L(tila).Tavoite, "puheen väistö ei koske");
            tila.Puhe(false);
            tila.Hiljennys("lehti", true);
            Oleta.Sama(Loppu, L(tila).Url, "hiljennys ei katkaise");
            tila.LinssiPito(false);
            Oleta.Sama(Loppu, L(tila).Url, "linssin pito ei katkaise");
        }

        [Testi] static void KaupunkiIlmanOmaaKappalettaAlueraita()
        {
            // VARARAITA (Päätoimittaja 20.2x): kartan alueraita samalla valinnalla (Musiikkivalitsin.Alueraita).
            var tila = Uusi();
            tila.LatausKaupunki("wien", T);
            Oleta.Tosi(L(tila).Url != null && L(tila).Url.Contains("/musa-kaupunki-keski-eurooppa-"), "Wien: Keski-Euroopan alueraita: " + L(tila).Url);
            var v = new Musiikkivalitsin(AaniTaulut.Oletus());
            Oleta.Sama(AaniOsoite.Url(v.Alueraita("wien", "AUT")), L(tila).Url, "sama valinta kuin kartan ketjussa");
            Oleta.Tosi(tila.KaupunginKappale("ateena").Contains("/musa-kaupunki-ateena-"), "oma kappale voittaa alueraidan");
            var s = Uusi();
            s.LatausKaupunki("belgrad", T);
            Oleta.Sama(null, L(s).Url, "Belgrad (SRB): ei omaa eikä alueraitaa → hiljaa");
            Oleta.Tosi(s.LatausAuki, "latausruutu auki");
        }

        [Testi] static void PallonTasoSamaKuinLinnan()
        {
            var pallo = Uusi();
            pallo.LatausKaupunki("pariisi", T);
            var linna = Uusi();
            linna.Lataus(Loppu, T);
            Lahella(L(linna).Tavoite, L(pallo).Tavoite, "sama annettu taso → sama taso");
            pallo.AsetaLiuku(70); linna.AsetaLiuku(70);
            Lahella(T, L(pallo).Tavoite, "liuku ei skaalaa (mikserin taso annetaan)");
            Lahella(L(linna).Tavoite, L(pallo).Tavoite, "yhä sama");
        }

        [Testi] static void SiirtymaKierrokseenTasoramppi()
        {
            var tila = Uusi();
            tila.LatausKaupunki("pariisi", T);
            var url = L(tila).Url;
            double alku = L(tila).Tavoite;
            tila.LatausOhi(avautui: true);
            var w = L(tila);
            Oleta.Sama(url, w.Url, "sama raita jatkuu: ei katkea");
            Oleta.Tosi(!w.Uusi && w.PoisMs == null, "ei ristihäivytystä samaan raitaan");
            Oleta.Sama(AaniVakiot.LatausRistiMs, w.KestoMs ?? -1, "tasoramppi ~3 s");
            double kartta = AaniVakiot.MusiikinPerustaso * tila.MusiikinKerroin;
            Lahella(kartta, w.Tavoite, "kartan taso");
            Oleta.Tosi(!w.Silmukka && tila.LatausJatkuu, "kierroksella kerran läpi");
            // Ei hyppyä (PT 21.0x: ≤ 1 dB:n askel): desibeleissä tasainen ramppi, 100 ms:n välein ≤ 1 dB.
            Oleta.Tosi(w.Desibeli, "desibeliramppi");
            var r = new Tasoramppi(alku);
            r.Aloita(w.Tavoite, w.KestoMs.Value, w.Desibeli);
            double edellinen = alku, suurin = 0;
            for (int i = 0; i < 40; i++)
            {
                for (int j = 0; j < 3; j++) r.Askel(1 / 30.0);
                suurin = Math.Max(suurin, 20 * Math.Log10(edellinen / r.Arvo)); edellinen = r.Arvo;
            }
            Lahella(kartta, r.Arvo, "perillä");
            Oleta.Tosi(suurin <= 1.0, $"100 ms:n askel ≤ 1 dB: {suurin:0.00} dB");
            var lin = new Tasoramppi(alku); lin.Aloita(kartta, w.KestoMs.Value);
            for (int i = 0; i < 87; i++) lin.Askel(1 / 30.0);
            double ennen = lin.Arvo; for (int i = 0; i < 3; i++) lin.Askel(1 / 30.0);
            Oleta.Tosi(20 * Math.Log10(ennen / lin.Arvo) > 1.0, "lineaarinen ramppi rikkoisi ehdon (vertailu)");
            // Raita soi loppuun: kartta ei soita samaa heti uudelleen.
            tila.LatausLoppui();
            Oleta.Sama(null, L(tila).Url, "loppui");
            Oleta.Tosi(!tila.LatausJatkuu, "jatko ohi");
        }

        [Testi] static void KierroksellaMuuRaitaRistiin()
        {
            // Pariisin intro aloittaa nopean pohjalle jo latauksen aikana: kierroksen alussa latausraita ristiin pois ~3 s:ssa.
            var tila = Uusi();
            tila.LatausKaupunki("pariisi", T);
            tila.JaksonIntroAlusta("pariisi");
            Oleta.Tosi(tila.Toive(Kanava.Pohja).Url?.Contains("pariisi-nopea") == true, "intron nopea soi: " + tila.Toive(Kanava.Pohja).Url);
            tila.LatausOhi(avautui: true);
            Oleta.Sama(null, L(tila).Url, "latausraita pois");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(tila).PoisMs ?? -1, "ristihäivytys ~3 s");
            // Jatkuvan raidan aikana pohjan uusi muu raita ristiin.
            var s = Uusi();
            s.LatausKaupunki("pariisi", T);
            s.LatausOhi(true);
            s.JaksonIntroAlusta("pariisi");
            Oleta.Sama(null, L(s).Url, "intro kierroksella: latausraita pois");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(s).PoisMs ?? -1, "ristiin");
        }

        [Testi] static void KartalleSamaRaitaJatkuu()
        {
            var t = AaniTaulut.Oletus();
            t.Maat["ateena"] = "GRC";
            var tila = new AaniTila(t, new Satunnainen(1).Seuraava);
            tila.Paikka("ateena", "satama");
            tila.LinssiPito(true, 200);
            tila.LatausKaupunki("ateena", T);
            var url = L(tila).Url;
            tila.LatausOhi(true);
            tila.LinssiPito(false);
            Oleta.Sama(url, L(tila).Url, "kierroksen raita jatkuu kartalla");
            Oleta.Sama(null, tila.Toive(Kanava.Pohja).Url, "pohja ei aloita samaa alusta");
            tila.LatausLoppui();
            tila.Paikka("ateena", "satama");
            Oleta.Sama(null, tila.Toive(Kanava.Pohja).Url, "kerran läpi: ei heti uudelleen");
            // Linssi sulkeutuu toiseen kaupunkiin: kartan raita alkaa ja kierroksen raita ristiin pois.
            var s = new AaniTila(t, new Satunnainen(1).Seuraava);
            s.Paikka("ateena", "satama");
            s.LinssiPito(true, 200);
            s.LatausKaupunki("pariisi", T);
            s.LatausOhi(true);
            s.LinssiPito(false);
            Oleta.Tosi(s.Toive(Kanava.Pohja).Url?.Contains("ateena") == true, "Ateenan oma alkaa");
            Oleta.Sama(null, L(s).Url, "Pariisin raita pois");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(s).PoisMs ?? -1, "ristiin ~3 s");
        }

        [Testi] static void RaidanVaihtoRistiin()
        {
            var tila = Uusi();
            tila.LatausKaupunki("pariisi", T);
            tila.Lataus(Loppu, T);
            Oleta.Sama(Loppu, L(tila).Url, "uusi raita");
            Oleta.Tosi(L(tila).Uusi, "uusi soitin");
            Oleta.Sama(AaniVakiot.LatausRistiMs, L(tila).PoisMs ?? -1, "edellinen ristiin");
        }

        [Testi] static void PuuttuvaRaitaEiYritaUudelleen()
        {
            var tila = Uusi();
            tila.LatausKaupunki("ateena", T);
            tila.Puuttuu(Kanava.Lataus);
            Oleta.Sama(null, L(tila).Url, "404: hiljaa");
            tila.LatausKaupunki("ateena", T);
            Oleta.Sama(null, L(tila).Url, "sama raita ei yritä uudelleen");
            Oleta.Tosi(tila.LatausAuki, "latausruutu auki");
        }

        [Testi] static void PallonLatausraidatVoittavatKaupunginKappaleen()
        {
            // Omistaja 10.10. 22.1x: Pariisiin "Pallo, Pariisi 1: bassoriffi ja harjat", Tukholmaan "Pallo, Tukholma 2: kontrabasso
            // ja marimba"; muut kaupungit ennallaan. Kerroin = äänekkyyskorjaus −16 LUFS → pelin raitojen taso (+4,5 dB).
            var t = AaniTaulut.Oletus();
            Oleta.Sama(2, t.Latausraidat.Count, "kaksi latausraitaa");
            foreach (var r in t.Latausraidat.Values)
                Oleta.Tosi(r.Kerroin > 1.6 && r.Kerroin < 1.75, r.Tunnus + " kerroin +4,5 dB: " + r.Kerroin);
            var tila = Uusi();
            Oleta.Tosi(tila.KaupunginKappale("tukholma").Contains("/musa-pallo-tukholma-lyria-v2.mp3"), tila.KaupunginKappale("tukholma"));
            Oleta.Tosi(tila.KaupunginKappale("ateena").Contains("/musa-kaupunki-ateena-"), "muut ennallaan");
            tila.LatausKaupunki("pariisi", T);
            Lahella(T, L(tila).Tavoite, "taso pysyy mikserin tasona (kerroin soittimessa)");
            // Latausraita puuttuu (404): seuraava latausruutu soittaa kaupungin oman kappaleen.
            tila.Puuttuu(Kanava.Lataus);
            tila.LatausKaupunki("pariisi", T);
            Oleta.Tosi(L(tila).Url?.Contains("/musa-kaupunki-pariisi-") == true, "varalla kaupungin kappale: " + L(tila).Url);
        }

        [Testi] static void MuutKanavatEnnallaan()
        {
            // Lataus-kanava ei muuta muiden kanavien toiveita (kultainen jälki vartioi ne erikseen).
            var a = Uusi();
            var b = Uusi();
            b.LatausKaupunki("pariisi", T);
            b.LatausOhi(true);
            foreach (Kanava k in new[] { Kanava.Pohja, Kanava.Maisema, Kanava.Visa, Kanava.Siirtyma, Kanava.Aarre })
                Oleta.Sama((a.Toive(k).Url, a.Toive(k).Tavoite, a.Toive(k).Tauko), (b.Toive(k).Url, b.Toive(k).Tavoite, b.Toive(k).Tauko), k.ToString());
        }
    }
}
