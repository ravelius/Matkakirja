// KAUPUNKIMUSIIKIN JAKSO (omistaja 9.10.2026: "nopea → tauko → hidas → vähäeleinen tausta"; Pariisin pilotti, Pelikoodari).
// AaniTila soittaa jakson pohjakanavalla: nopea nykyversio kerran, tauko (soitin ajastaa, JaksonTaukoOhi), kaupungin hidas
// kappale kerran ja vähäeleinen tausta silmukkana. Muut kaupungit kuten ennen. Polut tarkistetaan Contains-muodossa, jotta
// testit pätevät myös -lyria-v2-osoitteilla (AaniOsoite.Musiikkiversio, juna 172).
namespace Matkakirja.Peli.Testit
{
    static class KaupunkijaksoTestit
    {
        static AaniTila Uusi(bool kerranLapi = true, bool vanhaKetju = false)
        {
            var t = AaniTaulut.Oletus();
            t.KarttaVainKaupunki = !vanhaKetju;
            t.Maat["pariisi"] = "FRA"; t.Maat["lontoo"] = "GBR"; t.Maat["wien"] = "AUT";
            return new AaniTila(t, new Satunnainen(1).Seuraava) { KerranLapi = kerranLapi };
        }
        static string Pohja(AaniTila s) => s.Toive(Kanava.Pohja).Url;
        static bool Soi(AaniTila s, string tunnus) => Pohja(s)?.Contains("/" + tunnus + "-lyria") == true;

        [Testi] static void TaulussaVainPariisinPilotti()
        {
            var t = AaniTaulut.Oletus();
            Oleta.Sama(1, t.Jaksot.Count, "jaksoja");
            var j = t.Jaksot["pariisi"];
            Oleta.Sama("assets/audio/musa-kaupunki-pariisi-nopea-lyria.mp3", t.MusaPolku(j.Nopea), "nopea");
            Oleta.Sama(3000, j.TaukoMs, "tauko");
            Oleta.Tosi(j.Hidas == null && j.Tausta == null, "hidas = kaupungin raita, tausta = pohjavire");
        }

        [Testi] static void NopeaTaukoHidasTausta()
        {
            var s = Uusi();
            s.Paikka("pariisi", "kaupunki");
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea"), "1. nopea: " + Pohja(s));
            Oleta.Tosi(!s.Toive(Kanava.Pohja).Silmukka, "nopea kerran");
            Oleta.Sama("pariisi:nopea", s.Jakso);
            s.PohjaLoppui();
            Oleta.Sama(null, Pohja(s), "2. tauko: hiljaa");
            Oleta.Sama("pariisi:tauko", s.Jakso);
            Oleta.Sama(1, s.JaksonTaukoNro, "tauko alkoi");
            Oleta.Sama(3000, s.JaksonTaukoMs, "tauon pituus");
            s.JaksonTaukoOhi(0);
            Oleta.Sama(null, Pohja(s), "vanha taukonumero ohitetaan");
            s.JaksonTaukoOhi(1);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi"), "3. hidas: " + Pohja(s));
            Oleta.Tosi(!s.Toive(Kanava.Pohja).Silmukka, "hidas kerran");
            Oleta.Sama("pariisi:hidas", s.Jakso);
            s.PohjaLoppui();
            // Kartalla vain kaupungin oma kappale (omistaja 10.10.2026): tausta ilman omaa raitaa = hiljaisuus, ei pohjavirettä.
            Oleta.Sama(null, Pohja(s), "4. tausta: hiljaa");
            Oleta.Sama("pariisi:tausta", s.Jakso);
            s.JaksonTaukoOhi(1);
            Oleta.Sama(null, Pohja(s), "myöhäinen tauon loppu ei palauta hidasta");
            // Vanha ketju: tausta = pohjavire silmukkana.
            var v = Uusi(vanhaKetju: true);
            v.Paikka("pariisi", "kaupunki");
            v.PohjaLoppui(); v.JaksonTaukoOhi(1); v.PohjaLoppui();
            Oleta.Tosi(Soi(v, "musa-pohja") && v.Toive(Kanava.Pohja).Silmukka, "vanha: tausta = pohjavire silmukkana: " + Pohja(v));
        }

        [Testi] static void PuuttuvaNopeaHyppaaHitaaseenIlmanTaukoa()
        {
            var s = Uusi();
            s.Paikka("pariisi", "kaupunki");
            s.Puuttuu(Kanava.Pohja);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi"), "hidas heti: " + Pohja(s));
            Oleta.Sama("pariisi:hidas", s.Jakso);
            Oleta.Sama(0, s.JaksonTaukoNro, "ei taukoa");
        }

        [Testi] static void TilaraitaKeskeyttaaJaPaluussaHidas()
        {
            var s = Uusi();
            s.Paikka("pariisi", "kaupunki");
            s.Hiljennys("lehti", true);
            Oleta.Tosi(Soi(s, "musa-lehti"), "lehden tilaraita voittaa: " + Pohja(s));
            s.Hiljennys("lehti", false);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi"), "paluussa hidas, ei uutta nopeaa: " + Pohja(s));
            Oleta.Sama("pariisi:hidas", s.Jakso);
        }

        [Testi] static void UusiSaapuminenAlkaaNopeasta()
        {
            var s = Uusi();
            s.Paikka("pariisi", "kaupunki");
            s.PohjaLoppui(); s.JaksonTaukoOhi(1);
            s.Paikka("lontoo", "kaupunki");
            Oleta.Sama(null, s.Jakso, "Lontoossa ei jaksoa");
            Oleta.Tosi(Soi(s, "musa-kaupunki-lontoo"), "Lontoo kuten ennen: " + Pohja(s));
            s.Paikka("pariisi", "kaupunki");
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea"), "takaisin Pariisiin: nopea alusta: " + Pohja(s));
        }

        [Testi] static void IntronKatkoJaHidasIlmanTaukoa()
        {
            var s = Uusi();
            Oleta.Tosi(s.JaksonNopea("pariisi")?.Contains("musa-kaupunki-pariisi-nopea-lyria") == true, "intro tunnistaa nopean");
            Oleta.Sama(null, s.JaksonNopea("lontoo"), "Lontoolla ei jaksoa");
            s.Paikka("pariisi", "kaupunki");
            s.JaksonIntroKatko(2000);
            Oleta.Sama(null, Pohja(s), "31,0 s: nopea häivytetään pois");
            Oleta.Sama("pariisi:tauko", s.Jakso);
            Oleta.Sama(0, s.JaksonTaukoNro, "ei jakson 3 s:n taukoajastinta");
            s.JaksonIntroHidas();
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi") && !Soi(s, "musa-kaupunki-pariisi-nopea"), "32,0 s: hidas: " + Pohja(s));
            Oleta.Sama("pariisi:hidas", s.Jakso);
            s.JaksonIntroKatko(2000);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi"), "katko hitaan aikana ei tee mitään");
        }

        [Testi] static void IntroLinssinPidonOhi()
        {
            var s = Uusi();
            s.Paikka("lontoo", "kaupunki");
            s.LinssiPito(true, 200);
            Oleta.Sama(null, Pohja(s), "linssi auki: pohja pidossa");
            s.JaksonIntroAlusta("lontoo");
            Oleta.Sama(null, Pohja(s), "Lontoolla ei jaksoa → pito pysyy");
            s.JaksonIntroAlusta("pariisi");
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea"), "intro: nopea alusta pidon ohi: " + Pohja(s));
            Oleta.Sama("pariisi:nopea", s.Jakso);
            s.Hiljennys("lehti", true); s.Hiljennys("lehti", false);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea"), "tilamuutos ei katkaise introa: " + Pohja(s));
            s.JaksonIntroKatko(2000);
            Oleta.Sama(null, Pohja(s), "31,0 s: katko");
            s.JaksonIntroHidas();
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi") && !Soi(s, "musa-kaupunki-pariisi-nopea"), "32,0 s: hidas pidon ohi: " + Pohja(s));
            s.PohjaLoppui();
            Oleta.Sama(null, Pohja(s), "hitaan jälkeen takaisin pitoon (ei taustaa)");
            Oleta.Tosi(s.Pidossa, "pito voimassa");
            s.LinssiPito(false);
            Oleta.Tosi(Soi(s, "musa-kaupunki-lontoo"), "linssi kiinni: paikan musiikki: " + Pohja(s));
        }

        [Testi] static void IntroIlmanPitoaEiTeeMitaan()
        {
            var s = Uusi();
            s.Paikka("lontoo", "kaupunki");
            s.JaksonIntroAlusta("pariisi");
            Oleta.Tosi(Soi(s, "musa-kaupunki-lontoo"), "ilman linssipitoa Paikka hoitaa jakson: " + Pohja(s));
            Oleta.Sama(null, s.Jakso);
        }

        static string Aja(KaupunkiIntroKello k, float nyt, float? kohta)
        {
            string tulos = "";
            k.Paivita(nyt, kohta, (c, t) => tulos += "alkoi " + c + " " + t.ToString("0.0", System.Globalization.CultureInfo.InvariantCulture) + ";", ms => tulos += $"katko {ms};", () => tulos += "hidas;");
            return tulos;
        }

        [Testi] static void IntroKelloNopeastaKatkoonJaHitaaseen()
        {
            var k = new KaupunkiIntroKello();
            k.Aloita("pariisi", 31f, 2f, 32f, false);
            Oleta.Sama("", Aja(k, 10f, null), "nopea ei vielä soi: odotetaan");
            Oleta.Sama("alkoi pariisi 0.5;", Aja(k, 11f, 0.5f), "kello alkaa kappaleen todellisesta alusta");
            Oleta.Sama("", Aja(k, 41f, 30.5f), "30,5 s: ei vielä");
            Oleta.Sama("katko 2000;", Aja(k, 41.5f, 31f), "31,0 s: katko");
            Oleta.Sama("hidas;", Aja(k, 42.5f, null), "32,0 s: hidas");
            Oleta.Tosi(!k.Kaynnissa, "intro ohi");
            Oleta.Sama("", Aja(k, 50f, null));
        }

        [Testi] static void IntroKelloHiljainenKunMusiikkiPois()
        {
            var s = Uusi();
            Oleta.Tosi(s.JaksoVoiSoida("pariisi"), "oletuksena soi");
            Oleta.Tosi(!s.JaksoVoiSoida("lontoo"), "Lontoolla ei jaksoa");
            s.MusiikkiPaalle(false);
            Oleta.Tosi(!s.JaksoVoiSoida("pariisi"), "musiikki pois → hiljainen kello");
            var k = new KaupunkiIntroKello();
            k.Aloita("pariisi", 31f, 2f, 32f, !s.JaksoVoiSoida("pariisi"));
            Oleta.Sama("alkoi pariisi 0.0;", Aja(k, 5f, null), "hiljainen kello: KaupunkiIntroAlkoi(k, 0) heti ilman nopeaa");
            Oleta.Sama("", Aja(k, 36f, null), "31 s: katko ei soita mitään");
            Oleta.Sama("", Aja(k, 37f, null), "32 s: hidas ei soita mitään");
            Oleta.Tosi(!k.Kaynnissa, "hiljainen intro päättyy ajallaan");
        }

        [Testi] static void IntroKelloOhitus()
        {
            var k = new KaupunkiIntroKello();
            Oleta.Tosi(!k.Ohita(), "ei käynnissä → false");
            k.Aloita("pariisi", 31f, 2f, 32f, false);
            Aja(k, 0f, 0f);
            Oleta.Tosi(k.Ohita());
            Oleta.Sama("katko 2000;", Aja(k, 15.5f, 15.5f), "ohitus ennen nousua: katko heti");
            Oleta.Sama("", Aja(k, 16f, null));
            Oleta.Sama("hidas;", Aja(k, 16.5f, null), "hidas 1 s myöhemmin");
            k.Aloita("pariisi", 31f, 2f, 32f, false);
            k.Ohita();
            Oleta.Sama("katko 2000;", Aja(k, 3f, null), "ohitus ennen kuin nopea soi: katko, ei alkoi-tapahtumaa");
            Oleta.Sama("hidas;", Aja(k, 4f, 0.2f));
            k.Aloita("pariisi", 31f, 2f, 32f, false);
            Aja(k, 0f, 0f); Aja(k, 31.2f, 31.2f);
            k.Ohita();
            Oleta.Sama("", Aja(k, 31.5f, null), "katkon jälkeen ohitus ei toista katkoa");
            Oleta.Sama("hidas;", Aja(k, 32f, null));
        }

        [Testi] static void MuutKaupungitJaWebTilaEnnallaan()
        {
            var s = Uusi();
            s.Paikka("wien", "kaupunki");
            Oleta.Sama(null, Pohja(s), "kaupunki ilman omaa kappaletta: ei musiikkia");
            Oleta.Sama(null, s.Jakso);
            var vanha = Uusi(vanhaKetju: true);
            vanha.Paikka("wien", "kaupunki");
            Oleta.Tosi(Soi(vanha, "musa-kaupunki-keski-eurooppa"), "vanha: alueraita: " + Pohja(vanha));
            var w = Uusi(kerranLapi: false);
            w.Paikka("pariisi", "kaupunki");
            Oleta.Tosi(Soi(w, "musa-kaupunki-pariisi") && !Soi(w, "musa-kaupunki-pariisi-nopea"), "web-tila (KerranLapi false): kaupunkiraita: " + Pohja(w));
            Oleta.Sama(null, w.Jakso);
        }

        // --- SAAPUMISESITYKSEN MUSIIKKI (omistaja KIIRE TF 180, juna 181): nopea alkaa isoisän saapumispuheen kanssa ---------------

        static AaniTila Esitys()
        {
            var s = Uusi();
            s.NopeaOdottaaPuhetta = k => k == "pariisi";
            return s;
        }

        [Testi] static void EsitysNopeaOdottaaPuhettaValmiiksiLadattuna()
        {
            var s = Esitys();
            s.Paikka("lontoo", "kaupunki");
            Oleta.Tosi(Soi(s, "musa-kaupunki-lontoo") && !s.Toive(Kanava.Pohja).Tauko, "Lontoo kuten ennen");
            s.Paikka("pariisi", "kaupunki"); // lento: kohdekaupunki jo nousussa
            var w = s.Toive(Kanava.Pohja);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea"), "nopea latautuu valmiiksi: " + Pohja(s));
            Oleta.Tosi(w.Uusi && w.Tauko, "tauolla: ei soi ennen puhetta");
            Oleta.Sama("pariisi", s.OdottaaPuhetta);
            Oleta.Sama(null, s.EsitysKaupunki);
            s.Puhe(true); // puheväistö (Puhe.Puhuu) tulee ennen trailerin kuuntelijaa
            w = s.Toive(Kanava.Pohja);
            Oleta.Tosi(w.Tauko && w.KestoMs == null, "puheväistö ei rampata odottavaa (Aanisoitin ottaisi sen nousuksi)");
            s.JaksonNopeaAlkaa("pariisi");
            w = s.Toive(Kanava.Pohja);
            Oleta.Tosi(!w.Tauko && !w.Uusi, "sama esiladattu soitin soimaan");
            Oleta.Sama(AaniVakiot.EsitysNousuMs, w.KestoMs, "nousu");
            Oleta.Tosi(AaniVakiot.EsitysNousuMs <= 150, "nousu ≤ 0,15 s");
            Oleta.Sama("pariisi", s.EsitysKaupunki);
            Oleta.Sama(null, s.OdottaaPuhetta);
            double alla = w.Tavoite;
            s.Puhe(false);
            double tays = s.Toive(Kanava.Pohja).Tavoite;
            Oleta.Tosi(System.Math.Abs(alla / tays - AaniVakiot.EsitysVaistoPuhe) < 1e-9, $"puheen alla {alla / tays:0.00} × täysi (ei 0,25)");
            s.JaksonNopeaAlkaa("pariisi");
            Oleta.Sama(null, s.Toive(Kanava.Pohja).KestoMs, "toinen kutsu ei tee mitään");
            // Katko (esittelyn kello 31 s) päättää esityksen tilan: hidas tavallisella väistöllä.
            s.JaksonIntroKatko(2000);
            Oleta.Sama(null, s.EsitysKaupunki);
        }

        [Testi] static void EsitysPuheEnnenPaikkaa()
        {
            // Maitse saavuttaessa paikka lähtee ruudun lopussa; jos puhe ehtisi ensin, nopea alkaa heti paikan vaihtuessa.
            var s = Esitys();
            s.Paikka("lontoo", "kaupunki");
            s.JaksonNopeaAlkaa("pariisi");
            s.Paikka("pariisi", "kaupunki");
            var w = s.Toive(Kanava.Pohja);
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea") && !w.Tauko, "soi heti: " + Pohja(s));
            Oleta.Sama(AaniVakiot.EsitysNousuMs, w.KestoMs);
            Oleta.Sama("pariisi", s.EsitysKaupunki);
            Oleta.Sama(null, s.OdottaaPuhetta);
        }

        [Testi] static void EsitysOdotusPoisTavallisenaAlkuna()
        {
            var s = Esitys();
            s.Paikka("pariisi", "kaupunki");
            s.JaksonOdotusPois("lontoo");
            Oleta.Tosi(s.Toive(Kanava.Pohja).Tauko, "toisen kaupungin vapautus ei koske");
            s.JaksonOdotusPois("pariisi"); // traileri ohitettiin ennen puhetta
            var w = s.Toive(Kanava.Pohja);
            Oleta.Tosi(!w.Tauko && !w.Uusi, "esiladattu soimaan");
            Oleta.Sama(AaniVakiot.PohjaNousuMs, w.KestoMs, "tavallinen nousu");
            Oleta.Sama(null, s.EsitysKaupunki, "ei esityksen väistöä");
        }

        [Testi] static void EsitysOdotusEiJaaPaalle()
        {
            var s = Esitys();
            s.Paikka("pariisi", "kaupunki");
            s.Paikka("lontoo", "kaupunki");
            Oleta.Sama(null, s.OdottaaPuhetta, "paikan vaihto purkaa odotuksen");
            Oleta.Tosi(Soi(s, "musa-kaupunki-lontoo") && !s.Toive(Kanava.Pohja).Tauko, "Lontoo soi: " + Pohja(s));
            s.Paikka("pariisi", "kaupunki");
            s.UusiMatka();
            Oleta.Sama(null, s.OdottaaPuhetta, "uusi matka purkaa odotuksen");
            // Ehto false (traileri jo nähty, jatko hiljaa): nopea kuten ennen.
            var e = Uusi();
            e.NopeaOdottaaPuhetta = k => false;
            e.Paikka("pariisi", "kaupunki");
            Oleta.Tosi(!e.Toive(Kanava.Pohja).Tauko && e.Toive(Kanava.Pohja).KestoMs == AaniVakiot.PohjaNousuMs, "ilman odotusta tavallinen alku");
            e.JaksonNopeaAlkaa("pariisi");
            Oleta.Sama(null, e.Toive(Kanava.Pohja).KestoMs, "jo soivaan ei kosketa");
            Oleta.Sama(null, e.EsitysKaupunki);
        }

        // --- SAAPUMISESITYKSEN ESILATAUS (simu fff0b61f0: nopea haettiin vasta trailerin ruudussa, musiikki 2,97 s myöhässä) -----

        [Testi] static void EsitysEsilatausOsoiteOnPohjasoittimenOsoite()
        {
            // Esilataus purkaa klipin tällä avaimella; pohjasoittimen pitää pyytää täsmälleen samaa, jotta Hae löytää sen valmiina.
            var s = Esitys();
            s.Paikka("lontoo", "kaupunki");
            var url = s.EsitysNopeaOsoite("pariisi");
            Oleta.Tosi(url != null && url.StartsWith(AaniOsoite.Juuri) && url.Contains("/musa-kaupunki-pariisi-nopea-lyria"), "osoite: " + url);
            s.Paikka("pariisi", "kaupunki"); // maailmahyppy / maitse: soitin syntyy saapumisruudussa
            Oleta.Sama(url, Pohja(s), "sama osoite kuin odottavalla pohjasoittimella");
            Oleta.Tosi(s.Toive(Kanava.Pohja).Tauko, "odottaa puhetta");
            Oleta.Sama(url, s.EsitysNopeaOsoite("pariisi"), "esilataus tunnistaa soivan");
        }

        [Testi] static void EsitysEsilatausVainKunJaksoSoisi()
        {
            var s = Esitys();
            Oleta.Sama(null, s.EsitysNopeaOsoite("lontoo"), "ei jaksoa");
            Oleta.Sama(null, s.EsitysNopeaOsoite(null));
            s.MusiikkiPaalle(false);
            Oleta.Sama(null, s.EsitysNopeaOsoite("pariisi"), "musiikki pois: ei latausta");
            s.MusiikkiPaalle(true);
            Oleta.Tosi(s.EsitysNopeaOsoite("pariisi") != null, "musiikki päällä");
            s.AanimaisemaPaalle(false);
            Oleta.Sama(null, s.EsitysNopeaOsoite("pariisi"), "äänimaisema pois");
            Oleta.Sama(null, Uusi(kerranLapi: false).EsitysNopeaOsoite("pariisi"), "web-tila: ei jaksoa");
            // Nopea puuttuu (latausvirhe): jakso hyppää hitaaseen, esilataus ei hae puuttuvaa.
            var p = Esitys();
            p.Paikka("pariisi", "kaupunki");
            p.Puuttuu(Kanava.Pohja);
            Oleta.Sama(null, p.EsitysNopeaOsoite("pariisi"), "puuttuva nopea");
        }

        [Testi] static void EsitysEsilatauksenViitteetEivatVuoda()
        {
            var e = new EsitysEsilataukset();
            var pois = new System.Collections.Generic.List<string>();
            Oleta.Tosi(e.Pyyda("a", 0, pois), "uusi pyyntö aloittaa latauksen");
            Oleta.Tosi(!e.Pyyda("a", 10, pois), "toistuva pyyntö (joutilas) ei lataa uudelleen");
            Oleta.Sama(1, e.Maara);
            Oleta.Tosi(!e.Pyyda(null, 0, pois) && !e.Pyyda("", 0, pois), "tyhjä ohi");
            // Soitin otti klipin: esilatauksen viite pois, toinen otto ei tee mitään.
            Oleta.Tosi(e.Otettu("a"), "otettu");
            Oleta.Tosi(!e.Otettu("a") && !e.Sisaltaa("a"), "vain kerran");
            Oleta.Sama(0, pois.Count);
            // Ylitys: vanhin pyyntö pois (toistuva pyyntö nuorentaa).
            e.Pyyda("a", 0, pois); e.Pyyda("b", 1, pois); e.Pyyda("a", 2, pois);
            e.Pyyda("c", 3, pois);
            Oleta.Sama(EsitysEsilataukset.Enintaan, e.Maara);
            Oleta.Sama("b", string.Join(",", pois), "vanhin (b) vapautetaan");
            Oleta.Tosi(e.Sisaltaa("a") && e.Sisaltaa("c") && !e.Sisaltaa("b"));
            // Vanheneminen: ilman uutta pyyntöä VanheneeS:ssä vapautuu.
            pois.Clear();
            e.Vanhentuneet(2 + EsitysEsilataukset.VanheneeS - 1, pois);
            Oleta.Sama(0, pois.Count, "ei vielä");
            e.Vanhentuneet(3 + EsitysEsilataukset.VanheneeS, pois);
            Oleta.Sama("c,a", string.Join(",", pois), "molemmat vanhenivat");
            Oleta.Sama(0, e.Maara);
        }

        // --- ESITYKSEN VÄISTÖ (PT 11.10., simu d81fbd209: musiikki ei kuulunut trailerin puheen alla) ----------------------------

        /// <summary>Pohjan tavoite suhteessa täyteen tasoon (perustaso × liukukerroin): 1 = täysi, EsitysVaistoPuhe, 0,25 = tavallinen.</summary>
        static double Kerroin(AaniTila s) => s.Toive(Kanava.Pohja).Tavoite / (AaniVakiot.MusiikinPerustaso * s.MusiikinKerroin);
        /// <summary>Odotettu kerroin: väistö × esityksen korotus (PT 11.10.), taso rajattuna 1,0:aan.</summary>
        static double Odotettu(AaniTila s, double vaisto, bool korotus = true)
        {
            double perus = AaniVakiot.MusiikinPerustaso * s.MusiikinKerroin;
            return System.Math.Min(1, perus * vaisto * (korotus ? AaniVakiot.EsitysMusiikinKerroin : 1)) / perus;
        }
        static void Lahella(AaniTila s, double odotettu, string missa) =>
            Oleta.Tosi(System.Math.Abs(Kerroin(s) - odotettu) < 1e-9, $"{missa}: kerroin {Kerroin(s):0.000}, odotettu {odotettu:0.000}");
        static void EsitysTasolla(AaniTila s, string missa)
        {
            var w = s.Toive(Kanava.Pohja);
            Oleta.Tosi(!w.Tauko && Soi(s, "musa-kaupunki-pariisi-nopea"), missa + ": nopea soi: " + Pohja(s));
            Lahella(s, Odotettu(s, AaniVakiot.EsitysVaistoPuhe), missa);
            Oleta.Sama(AaniVakiot.EsitysMusiikinKerroin, s.EsitysKorotus, missa + ": korotus");
        }

        [Testi] static void EsitysVaistoOnPuheenAllaVahintaanKahdeksanKymmenesta()
        {
            Oleta.Tosi(AaniVakiot.EsitysVaistoPuhe >= 0.8, "PT: puheen tauossa ≥ −40 dB (perustaso ~−37 dB) → ≥ 0,8");
            Oleta.Tosi(AaniVakiot.VaistoPuhe < AaniVakiot.EsitysVaistoPuhe, "kevyempi kuin tavallinen");
        }

        [Testi] static void EsitysVaistoPuheEnsinKutenSimulla()
        {
            // Simun järjestys: Puhe.Puhuu → ensin Aanikoukut.Puhe (Tila.Puhe(true)), sitten trailerin kuuntelija (JaksonNopeaAlkaa).
            var s = Esitys();
            s.Paikka("lontoo", "kaupunki");
            s.Paikka("pariisi", "kaupunki");
            s.Puhe(true);
            s.JaksonNopeaAlkaa("pariisi");
            EsitysTasolla(s, "alusta");
            Oleta.Sama(AaniVakiot.EsitysNousuMs, s.Toive(Kanava.Pohja).KestoMs, "nousu suoraan esitystasolle");
            // Toinen puhuja (Pulu, repliikki) ja sen loppu kesken puheen: ei koskaan 0,25:een.
            s.Puhe(true);
            EsitysTasolla(s, "toinen puhuja");
            s.Puhe(false);
            EsitysTasolla(s, "toinen puhuja loppui");
            s.AsetaLiuku(80);
            EsitysTasolla(s, "liuku muuttui");
            s.Puhe(false);
            Lahella(s, Odotettu(s, 1), "puhe loppui: täysi korotettuna");
            s.Puhe(true); // uusi puhe (esim. seuraava klippi) esityksen aikana
            EsitysTasolla(s, "uusi puhe");
        }

        [Testi] static void EsitysVaistoMusiikkiEnsin()
        {
            // Käänteinen järjestys (kuuntelija ennen koukkua tai puhe alkaa vasta musiikin jälkeen): täysi → esitystaso, ei 0,25:tä.
            var s = Esitys();
            s.Paikka("pariisi", "kaupunki");
            s.JaksonNopeaAlkaa("pariisi");
            Lahella(s, Odotettu(s, 1), "ilman puhetta täysi korotettuna");
            s.Puhe(true);
            EsitysTasolla(s, "puhe alkoi");
            Oleta.Sama(AaniVakiot.VaistoLiukuMs, s.Toive(Kanava.Pohja).KestoMs);
            // Maitse: puhe ennen paikkaa → nopea alkaa paikan vaihtuessa suoraan esitystasolle.
            var m = Esitys();
            m.Paikka("lontoo", "kaupunki");
            m.Puhe(true);
            m.JaksonNopeaAlkaa("pariisi");
            m.Paikka("pariisi", "kaupunki");
            EsitysTasolla(m, "maitse");
            Oleta.Sama(AaniVakiot.EsitysNousuMs, m.Toive(Kanava.Pohja).KestoMs);
        }

        [Testi] static void EsitysVaistoNayteEiPudotaTavalliseen()
        {
            var s = Esitys();
            s.Paikka("pariisi", "kaupunki");
            s.Puhe(true);
            s.JaksonNopeaAlkaa("pariisi");
            s.Nayte(true); // näytteen syvempi väistö (0,15) pätee kuten muualla, korotus pois
            Lahella(s, AaniVakiot.VaistoNayte, "näyte");
            Oleta.Sama(1.0, s.EsitysKorotus, "näytteen aikana ei korotusta");
            s.Nayte(false); // web: pyydetty = viimeisin kirjoitus (1) → täysi, ei koskaan alle esitystason
            Oleta.Tosi(Kerroin(s) >= Odotettu(s, AaniVakiot.EsitysVaistoPuhe) - 1e-9, "näyte loppui: " + Kerroin(s));
            s.Puhe(false); s.Puhe(true);
            EsitysTasolla(s, "puhe taas");
            // Hiljennys rajaa kuten ennen: min(esitys, 0,45), eikä korotusta.
            s.Hiljennys("testi", true); // ei tilaraitaa: vain hiljennys
            Lahella(s, System.Math.Min(AaniVakiot.EsitysVaistoPuhe, AaniVakiot.VaistoHiljennys), "hiljennys");
            Oleta.Sama(1.0, s.EsitysKorotus, "hiljennys: ei korotusta");
            s.Hiljennys("testi", false);
            EsitysTasolla(s, "hiljennys ohi");
        }

        // --- ESITYKSEN KOROTUS (PT 11.10., simu 8aaca5953: puheen tauossa −55…−61 dB; aanet.EsitysMusiikinKerroin 6,8) ---------

        [Testi] static void EsitysKorotusVainEsityksenNopealle()
        {
            Oleta.Tosi(System.Math.Abs(AaniVakiot.EsitysMusiikinKerroin - 6.8) < 1e-9, "oletus 6,8 (≈ +16 dB)");
            Oleta.Sama(3000, AaniVakiot.EsitysLaskuMs, "lasku 3 s");
            // Muut kappaleet ja tavallinen nopea (ei esitystä) ilman korotusta.
            var s = Esitys();
            s.Paikka("lontoo", "kaupunki");
            Oleta.Sama(1.0, s.EsitysKorotus, "Lontoo");
            Lahella(s, 1, "Lontoo tavallisella tasolla");
            var e = Uusi();
            e.NopeaOdottaaPuhetta = k => false;
            e.Paikka("pariisi", "kaupunki");
            Oleta.Sama(1.0, e.EsitysKorotus, "nopea ilman esitystä");
            Lahella(e, 1, "nopea ilman esitystä tavallisella tasolla");
            // Esitys: odottava ei vielä korota, puheen kanssa korotus ja väistö.
            s.Paikka("pariisi", "kaupunki");
            s.Puhe(true);
            s.JaksonNopeaAlkaa("pariisi");
            EsitysTasolla(s, "esitys");
            Oleta.Tosi(s.Toive(Kanava.Pohja).Tavoite <= 1, "taso ≤ 1");
            // Visa ja linssin pito: ei korotusta.
            s.Visa(true);
            Oleta.Sama(1.0, s.EsitysKorotus, "visa");
            Oleta.Tosi(s.Toive(Kanava.Pohja).Url == null || Kerroin(s) <= AaniVakiot.EsitysVaistoPuhe + 1e-9, "visa: ei korotettua pohjaa: " + Kerroin(s));
            s.Visa(false);
        }

        [Testi] static void EsitysKorotusRajataanYkkoseen()
        {
            var s = Esitys();
            s.AsetaLiuku(100);
            Asetus.Lue("{\"skeema\":1,\"aanet\":{\"EsitysMusiikinKerroin\":1000}}", "testi");
            try
            {
                s.Paikka("pariisi", "kaupunki");
                s.JaksonNopeaAlkaa("pariisi");
                Oleta.Sama(1.0, s.Toive(Kanava.Pohja).Tavoite, "taso rajattu 1,0:aan");
            }
            finally { Asetus.Tyhjenna(); }
            Oleta.Tosi(System.Math.Abs(AaniVakiot.EsitysMusiikinKerroin - 6.8) < 1e-9, "oletus palasi");
        }

        [Testi] static void EsitysKorotusPaattyyKolmenSekunninRampilla()
        {
            // Nykyintro loppui / Ohita / lähtö (Saapumisesitys.LopetaIntro → Aanisoitin.EsitysMusiikkiLoppui): soiva nopea laskee 3 s:ssä.
            var s = Esitys();
            s.Paikka("pariisi", "kaupunki");
            s.Puhe(true);
            s.JaksonNopeaAlkaa("pariisi");
            s.Puhe(false);
            Lahella(s, Odotettu(s, 1), "korotettu");
            s.EsitysLoppui(AaniVakiot.EsitysLaskuMs);
            Oleta.Sama(1.0, s.EsitysKorotus, "korotus pois");
            Lahella(s, 1, "tavallinen taso");
            Oleta.Sama(AaniVakiot.EsitysLaskuMs, s.Toive(Kanava.Pohja).KestoMs, "3 s:n ramppi");
            Oleta.Tosi(Soi(s, "musa-kaupunki-pariisi-nopea"), "nopea soi edelleen");
            s.EsitysLoppui(AaniVakiot.EsitysLaskuMs);
            Oleta.Sama(null, s.Toive(Kanava.Pohja).KestoMs, "toinen kutsu ei tee mitään");
            s.Puhe(true);
            Lahella(s, AaniVakiot.EsitysVaistoPuhe, "korotus ei palaa puheen myötä, väistö ennallaan");
            // Katko (intron 31 s / Ohita): nopea häipyy, hidas tavallisella tasolla.
            var k = Esitys();
            k.Paikka("pariisi", "kaupunki");
            k.JaksonNopeaAlkaa("pariisi");
            k.JaksonIntroKatko(2000);
            k.JaksonIntroHidas();
            Oleta.Tosi(Soi(k, "musa-kaupunki-pariisi") && !Soi(k, "musa-kaupunki-pariisi-nopea"), "hidas: " + Pohja(k));
            Oleta.Sama(1.0, k.EsitysKorotus, "hitaassa ei korotusta");
            Lahella(k, 1, "hidas tavallisella tasolla");
            // Paikan vaihto: uusi kaupunki ilman korotusta; uusi esitys korottaa taas.
            var p = Esitys();
            p.Paikka("pariisi", "kaupunki");
            p.JaksonNopeaAlkaa("pariisi");
            p.EsitysLoppui(AaniVakiot.EsitysLaskuMs);
            p.Paikka("lontoo", "kaupunki");
            Oleta.Sama(1.0, p.EsitysKorotus);
            p.Paikka("pariisi", "kaupunki");
            p.JaksonNopeaAlkaa("pariisi");
            Oleta.Sama(AaniVakiot.EsitysMusiikinKerroin, p.EsitysKorotus, "uusi esitys korottaa");
        }
    }
}
