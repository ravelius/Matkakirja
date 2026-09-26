// Äänisoittimen puhdas logiikka (Peli/Aani/Soitinlogiikka.cs) ja äänikoukut (Peli/Aani/Aanikoukut.cs),
// B7 erät 3–4. Ei ääntä eikä Unityä: rampit, silmukan vaihtohetki, levynimi, latausvirheen
// luokitus sekä pelin tilasta AaniTilan tapahtumiksi (§1.3, §1.4, §3).
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Testit
{
    static class AanisoitinTestit
    {
        static void Lahella(double odotettu, double saatu, string viesti = "")
        {
            if (Math.Abs(odotettu - saatu) > 1e-9) throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} {viesti}");
        }

        // =====================================================================
        // TASORAMPPI
        // =====================================================================

        [Testi] static void RamppiOnLineaarinen()
        {
            var r = new Tasoramppi(0);
            r.Aloita(1, 500);
            for (int i = 1; i <= 10; i++)
            {
                bool jatkuu = r.Askel(0.05);
                Lahella(i / 10.0, r.Arvo, "askel " + i);
                Oleta.Sama(i < 10, jatkuu, "jatkuu " + i);
            }
            Oleta.Tosi(!r.Kaynnissa, "valmis");
        }

        [Testi] static void RamppiAlkaaNykyisestaArvosta()
        {
            var r = new Tasoramppi(0);
            r.Aloita(1, 1000);
            r.Askel(0.05); r.Askel(0.05); r.Askel(0.05); r.Askel(0.05); r.Askel(0.05);  // 0,25
            r.Aloita(0, 500); // väistö kesken nousun: 0,25 → 0 lineaarisesti
            r.Askel(0.1);
            Lahella(0.2, r.Arvo, "0,25 − 0,25 × 0,2");
            r.Askel(0.1); r.Askel(0.1); r.Askel(0.1); r.Askel(0.1);
            Lahella(0, r.Arvo);
        }

        [Testi] static void RamppiEiHyppaaJumissa()
        {
            var r = new Tasoramppi(0);
            r.Aloita(1, 1000);
            r.Askel(2.0); // 2 s:n jumi (tai sovelluksen tauko) etenee vain maksimiaskeleen
            Lahella(Tasoramppi.MaksimiAskelS, r.Arvo, "rajattu askel");
            Oleta.Tosi(r.Kaynnissa, "jatkuu");
            r.Askel(0); r.Askel(-1); r.Askel(double.NaN);
            Lahella(Tasoramppi.MaksimiAskelS, r.Arvo, "nolla- ja kelvoton askel ei liikuta");
        }

        [Testi] static void NollakestoAsettaaHeti()
        {
            var r = new Tasoramppi(0.3);
            r.Aloita(0.0749, 0);
            Lahella(0.0749, r.Arvo);
            Oleta.Tosi(!r.Kaynnissa, "ei rampia");
            r.Aloita(double.NaN, 100);
            Lahella(0.0749, r.Arvo, "arvo ennallaan");
            Lahella(0, r.Kohde, "kelvoton kohde = 0");
            r.Aloita(-2, 0);
            Lahella(0, r.Arvo, "ei negatiivista");
        }

        // =====================================================================
        // SILMUKKA, LEVYNIMI JA LATAUSVIRHEET
        // =====================================================================

        [Testi] static void SilmukanVaihtohetki()
        {
            Oleta.Tosi(!Silmukka.Ajoissa(97.3, 100), "ennen");
            Oleta.Tosi(Silmukka.Ajoissa(97.4, 100), "duration − 2,6 s");
            Oleta.Tosi(Silmukka.Ajoissa(100, 100), "loppu");
            Oleta.Tosi(Silmukka.Liianlyhyt(5.2) && !Silmukka.Ajoissa(5, 5.2), "alle 2 × 2,6 s = loop");
            Oleta.Tosi(Silmukka.Liianlyhyt(double.NaN) && Silmukka.Liianlyhyt(0), "tuntematon kesto");
            Oleta.Tosi(!Silmukka.Liianlyhyt(5.3), "5,3 s ristiin");
        }

        [Testi] static void LevynimiKutenAanet()
        {
            // Sama kaava kuin Natiivi-UI:n Aanet.Levy ämpärin osoitteille (yhteinen levyvälimuisti).
            Oleta.Sama("audio/musa-pohja-lyria.mp3", Aanilataus.LevyNimi(AaniOsoite.Juuri + "audio/musa-pohja-lyria.mp3"));
            Oleta.Sama("aanet/freesound-731249.mp3", Aanilataus.LevyNimi(AaniOsoite.Juuri + "aanet/freesound-731249.mp3"));
            Oleta.Sama("audio/x.mp3_v_2.mp3", Aanilataus.LevyNimi(AaniOsoite.Juuri + "audio/x.mp3?v=2"));
            var ulkoinen = Aanilataus.LevyNimi("https://cdn.freesound.org/previews/713/713120_14632469-lq.mp3");
            Oleta.Tosi(ulkoinen.StartsWith("u/") && ulkoinen.EndsWith(".mp3") && ulkoinen.Length == 2 + 16 + 4, ulkoinen);
            Oleta.Sama(ulkoinen, Aanilataus.LevyNimi("https://cdn.freesound.org/previews/713/713120_14632469-lq.mp3"), "pysyvä");
            Oleta.Sama(null, Aanilataus.LevyNimi(null));
        }

        [Testi] static void StriimausRaja()
        {
            Oleta.Tosi(!Aanilataus.Striimataan(2_150_000), "pohja 2,05 Mt");
            Oleta.Tosi(!Aanilataus.Striimataan(3L * 1024 * 1024), "raja");
            Oleta.Tosi(Aanilataus.Striimataan(7_500_000), "aporee rs12 7,2 Mt");
        }

        [Testi] static void LatausvirheenLuokitus()
        {
            foreach (Kanava k in Enum.GetValues(typeof(Kanava)))
            {
                Oleta.Sama(Latausseuraus.Puuttuu, Aanilataus.Luokittele(k, 404, false, false, false), k + " 404");
                Oleta.Sama(Latausseuraus.Puuttuu, Aanilataus.Luokittele(k, 200, false, false, true), k + " purku");
                Oleta.Sama(Latausseuraus.Puuttuu, Aanilataus.Luokittele(k, 0, false, true, false), k + " aikakatkaisu");
                Oleta.Sama(k == Kanava.Maisema ? Latausseuraus.Puuttuu : Latausseuraus.YritaMyohemmin,
                    Aanilataus.Luokittele(k, 0, true, false, false), k + " ei verkkoa");
            }
        }

        // =====================================================================
        // ÄÄNIKOUKUT
        // =====================================================================

        static AaniTaulut Taulut()
        {
            var t = AaniTaulut.Oletus();
            t.Tyypit["pariisi"] = "kaupunki"; t.Maat["pariisi"] = "FRA";
            t.Tyypit["ateena"] = "satama"; t.Maat["ateena"] = "GRC";
            t.Tyypit["kairo"] = "basaari"; t.Maat["kairo"] = "EGY";
            return t;
        }

        sealed class Kirjuri
        {
            public readonly AaniTila Tila;
            public readonly Aanikoukut Koukut;
            public int Tapahtumia;
            public Kirjuri()
            {
                var t = Taulut();
                Tila = new AaniTila(t, new Satunnainen(7).Seuraava);
                Tila.Muuttui += _ => Tapahtumia++;
                Koukut = new Aanikoukut(Tila, t);
            }
            public string Url(Kanava k) => Tila.Toive(k).Url;
        }

        static Aanitilanne Kaupungissa(string kaupunki) => new Aanitilanne { Valmis = true, Kaupunki = kaupunki };

        [Testi] static void PaikkaKutenSyncAmbience()
        {
            string Ty(string k) => k == "pariisi" ? "kaupunki" : null;
            (string, string)? P(Aanitilanne s, bool jalka = false, bool lento = false) => Aanikoukut.Paikka(s, jalka, lento, Ty);
            Oleta.Sama(null, P(new Aanitilanne { Aloitus = true }), "lataus kesken");
            Oleta.Sama(("etusivu", "lentoasema"), P(new Aanitilanne { Valmis = true, Aloitus = true }).Value, "aloitus");
            Oleta.Sama(("lentomatka", "lentokone"), P(new Aanitilanne { Valmis = true, Matkalla = true, Aloituslento = true, Kaupunki = "pariisi" }, lento: true).Value, "avauslento");
            Oleta.Sama(("lentomatka", "lentokone"), P(new Aanitilanne { Valmis = true, Matkalla = true, Aloituslento = true, Kaupunki = "pariisi" }).Value, "avauslento ennen koneen lähtöä (napautuksesta)");
            Oleta.Sama(("pariisi", "kaupunki"), P(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = "pariisi" }, lento: true).Value, "pelin lento ja mannerlento: kohdekaupunki heti (ennakoiAmbienssi)");
            Oleta.Sama(("jalkamatka", "metsa"), P(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = "pariisi" }, true).Value, "jalkamatka");
            Oleta.Sama(null, P(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = "pariisi" }), "meri/bussi: lähtöpaikka soi");
            Oleta.Sama(((string)null, (string)null), P(new Aanitilanne { Valmis = true, Ohi = true, Kaupunki = "pariisi" }).Value, "peli ohi");
            Oleta.Sama(("pariisi", "kaupunki"), P(Kaupungissa("pariisi")).Value, "kaupunki");
            Oleta.Sama(("merimatka", "meri"), P(new Aanitilanne { Valmis = true, Merireitti = true }).Value, "meren reitti");
            Oleta.Sama(((string)null, (string)null), P(new Aanitilanne { Valmis = true }).Value, "maareitti");
        }

        [Testi] static void KulkutapaSiirtymalajiksi()
        {
            Oleta.Sama("jalan", Aanikoukut.Laji(Kulkutapa.Maa));
            Oleta.Sama("jalan", Aanikoukut.Laji(Kulkutapa.Bussi));
            Oleta.Sama("laiva", Aanikoukut.Laji(Kulkutapa.Meri));
            Oleta.Sama("lento", Aanikoukut.Laji(Kulkutapa.Lento));
            Oleta.Sama(null, Aanikoukut.Laji(Kulkutapa.Pysy));
        }

        [Testi] static void PaivitysLahettaaVainMuutokset()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(new Aanitilanne { Aloitus = true });
            Oleta.Sama(0, k.Tapahtumia, "lataus kesken: ei mitään");
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Aloitus = true });
            Oleta.Sama(1, k.Tapahtumia, "etusivu");
            Oleta.Tosi(k.Url(Kanava.Pohja).Contains("musa-johtoaihe"), k.Url(Kanava.Pohja));
            Oleta.Tosi(k.Url(Kanava.Maisema) != null, "lentoaseman maisema");
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Aloitus = true });
            Oleta.Sama(1, k.Tapahtumia, "sama tilanne: ei kutsua");
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            Oleta.Sama(3, k.Tapahtumia, "avauksen purku + paikka");
            Oleta.Sama("pariisi", k.Koukut.LahetettyPaikka);
            // Vaihe 3: Pariisilla on oma tunnuskaupungin kappale (web KAUPUNKIRAIDAT), joka voittaa alueraidan.
            Oleta.Tosi(k.Url(Kanava.Pohja).Contains("musa-kaupunki-pariisi"), k.Url(Kanava.Pohja));
        }

        [Testi] static void KysymysAvaaJaSulkeeVisan()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            var s = Kaupungissa("pariisi");
            s.KysymysAuki = true;
            k.Koukut.Paivita(s);
            Oleta.Tosi(k.Url(Kanava.Visa) != null && k.Tila.VisaAuki, "visa soi");
            k.Koukut.Paivita(s);
            Oleta.Tosi(!k.Tila.Toive(Kanava.Visa).Uusi || k.Tapahtumia == 2, "ei uutta visasoitinta");
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            Oleta.Sama(null, k.Url(Kanava.Visa), "visa pois");
            Oleta.Sama(AaniVakiot.HaivytysMs, k.Tila.Toive(Kanava.Visa).PoisMs ?? -1, "häivytys");
        }

        [Testi] static void JalanJatkaaReitinVarrellaJaLoppuuKaupungissa()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            var matkalla = new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = null };
            k.Koukut.LiikeAlkoi(Kulkutapa.Maa, 3);
            k.Koukut.Paivita(matkalla);
            Oleta.Sama("jalkamatka", k.Koukut.LahetettyPaikka, "jalkamatkan maisema");
            Oleta.Tosi(k.Url(Kanava.Siirtyma).Contains("siirtyma-jalan"), "jalan-raita");
            k.Koukut.MatkaPerilla(null);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true });
            Oleta.Sama(null, k.Koukut.LahetettyPaikka, "reitin varrella maitse: ei maisemaa");
            Oleta.Tosi(k.Url(Kanava.Siirtyma) != null, "jalan jatkaa seuraavan heiton yli");
            int ennen = k.Tapahtumia;
            k.Koukut.LiikeAlkoi(Kulkutapa.Maa, 1);
            Oleta.Sama(ennen, k.Tapahtumia, "sama laji: ei alusta");
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = "pariisi" });
            Oleta.Sama(null, k.Koukut.LahetettyPaikka, "yhden askeleen jalkamatka: paikka ennallaan");
            k.Koukut.MatkaPerilla("pariisi");
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            Oleta.Sama(null, k.Url(Kanava.Siirtyma), "kaupunkiin saapuminen lopettaa");
            Oleta.Sama("pariisi", k.Koukut.LahetettyPaikka);
        }

        [Testi] static void LaivaLoppuuReitinVarrellaJaMeriSoi()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("ateena"));
            var maisema = k.Url(Kanava.Maisema);
            k.Koukut.LiikeAlkoi(Kulkutapa.Meri, 4);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = null, Merireitti = true });
            Oleta.Sama("ateena", k.Koukut.LahetettyPaikka, "meren liike: lähtökaupunki soi");
            Oleta.Sama(maisema, k.Url(Kanava.Maisema));
            Oleta.Tosi(k.Url(Kanava.Siirtyma).Contains("siirtyma-laiva"), "laivan raita");
            k.Koukut.MatkaPerilla(null);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Merireitti = true });
            Oleta.Sama(null, k.Url(Kanava.Siirtyma), "laiva loppuu reitin varrella");
            Oleta.Sama("merimatka", k.Koukut.LahetettyPaikka);
        }

        [Testi] static void LentoSoittaaKohdekaupunkiaHetiEikaMatkustamoa()
        {
            // Web doFly maailmankartalla: ei kalvoa eikä flight-activea; animatePawnin ainoa askel on
            // viimeinen, joten ennakoiAmbienssi(kohde) vaihtaa maiseman ja pohjaraidan lennon alussa.
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            var pariisinPohja = k.Url(Kanava.Pohja);
            k.Koukut.LiikeAlkoi(Kulkutapa.Lento, 0);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = "ateena" });
            Oleta.Sama("ateena", k.Koukut.LahetettyPaikka, "kohdekaupunki heti, ei lentomatkaa");
            Oleta.Tosi(k.Url(Kanava.Pohja).Contains("musa-kaupunki-ateena") && k.Url(Kanava.Pohja) != pariisinPohja, k.Url(Kanava.Pohja));
            Oleta.Tosi(k.Url(Kanava.Siirtyma).Contains("siirtyma-lento"), "lennon raita");
            int ennen = k.Tapahtumia;
            k.Koukut.MatkaPerilla("ateena");
            k.Koukut.Paivita(Kaupungissa("ateena"));
            Oleta.Sama("ateena", k.Koukut.LahetettyPaikka);
            Oleta.Sama(ennen + 1, k.Tapahtumia, "perillä vain raidan loppu, paikka on jo sama");
            Oleta.Sama(null, k.Url(Kanava.Siirtyma));
        }

        [Testi] static void MannerlentoIlmanSiirtymaraitaa()
        {
            // Web actionMannerLento pallolla: startFlight + animatePawn ilman aloitaSiirronMusiikkia.
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            k.Koukut.LiikeAlkoi(Kulkutapa.Lento, 0, siirtymaraita: false);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true, Kaupunki = "kairo" });
            Oleta.Sama("kairo", k.Koukut.LahetettyPaikka, "kohdekaupunki heti");
            Oleta.Sama(null, k.Url(Kanava.Siirtyma), "ei lennon raitaa");
        }

        [Testi] static void AvauslentoSoittaaMatkustamoaNapautuksestaPerille()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Aloitus = true });
            k.Koukut.UusiMatka(pysayta: false);
            // Napautus: Tila = Matkalla ja AloituslentoKaynnissa ennen koneen lähtöä (web aloitaLennonAmbienssi).
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true, Aloituslento = true, Kaupunki = "ateena" });
            Oleta.Sama("lentomatka", k.Koukut.LahetettyPaikka, "matkustamo heti napautuksesta");
            k.Koukut.LiikeAlkoi(Kulkutapa.Lento, 0, siirtymaraita: false);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true, Aloituslento = true, Kaupunki = "ateena" });
            Oleta.Sama("lentomatka", k.Koukut.LahetettyPaikka, "koneen lähdön jälkeen yhä matkustamo");
            Oleta.Sama(null, k.Url(Kanava.Siirtyma), "avauslennolla ei siirtymäraitaa");
            k.Koukut.MatkaPerilla("ateena");
            k.Koukut.Paivita(Kaupungissa("ateena"));
            Oleta.Sama("ateena", k.Koukut.LahetettyPaikka, "laskeutuminen: kohdekaupunki");
        }

        [Testi] static void LinssinRaitaEiLoppuPerillaSaannolla()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            k.Koukut.Siirtyma("keksinnot");
            k.Koukut.MatkaPerilla("pariisi");
            Oleta.Tosi(k.Url(Kanava.Siirtyma).Contains("linssi-keksinnot"), "linssin raita jää");
            k.Koukut.LinssinRaitaLoppui();
            Oleta.Sama(null, k.Url(Kanava.Siirtyma));
            k.Koukut.LiikeAlkoi(Kulkutapa.Maa, 2);
            k.Koukut.LinssinRaitaLoppui();
            Oleta.Tosi(k.Url(Kanava.Siirtyma) != null, "siirtymäraitaan ei kosketa");
        }

        [Testi] static void UusiMatkaLahettaaPaikanUudelleen()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            k.Koukut.LiikeAlkoi(Kulkutapa.Maa, 2);
            k.Koukut.UusiMatka();
            Oleta.Sama(null, k.Url(Kanava.Pohja), "kaikki pois");
            Oleta.Sama(null, k.Url(Kanava.Siirtyma));
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            Oleta.Tosi(k.Url(Kanava.Pohja) != null && k.Url(Kanava.Maisema) != null, "sama kaupunki soi taas");
        }

        [Testi] static void LinssinPitoPidattaaPaikan()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            k.Koukut.LinssiPito(true);
            k.Koukut.Paivita(Kaupungissa("ateena"));
            Oleta.Sama(null, k.Url(Kanava.Maisema), "pidon aikana ei maisemaa");
            Oleta.Sama(null, k.Url(Kanava.Pohja), "eikä pohjaa");
            k.Koukut.LinssiPito(false);
            k.Koukut.Paivita(Kaupungissa("ateena"));
            Oleta.Sama("ateena", k.Koukut.LahetettyPaikka, "uusi paikka pidon jälkeen");
            Oleta.Tosi(k.Url(Kanava.Pohja).Contains("musa-kaupunki-ateena"), k.Url(Kanava.Pohja));
        }

        [Testi] static void PuheJaLehtiVainReunoilla()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(Kaupungissa("pariisi"));
            k.Koukut.Puhe(true); k.Koukut.Puhe(true);
            Lahella(AaniVakiot.VaistoPuhe, k.Tila.Pyydetty, "puhe");
            k.Koukut.Puhe(false);
            Lahella(1, k.Tila.Pyydetty, "yksi false riittää, vaikka true tuli kahdesti");
            k.Koukut.Lehti(true); k.Koukut.Lehti(true);
            Oleta.Sama(1, k.Tila.Hiljennykset.Count, "lehti kerran");
            Oleta.Tosi(k.Url(Kanava.Pohja).Contains("musa-lehti"), "lehden raita");
            k.Koukut.Lehti(false);
            Oleta.Sama(0, k.Tila.Hiljennykset.Count);
        }

        [Testi] static void AvausPuretaanIntronLopussaTaiKartalle()
        {
            var k = new Kirjuri();
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Aloitus = true });
            k.Tila.Avaus(true);
            k.Koukut.IntroLoppui();
            Oleta.Tosi(!k.Tila.AvausKaynnissa, "intron loppu");
            k.Tila.Avaus(true);
            k.Koukut.Paivita(new Aanitilanne { Valmis = true, Matkalla = true });
            Oleta.Tosi(!k.Tila.AvausKaynnissa, "aloitusnäkymästä kartalle");
            Oleta.Sama("etusivu", k.Koukut.LahetettyPaikka, "liike ilman aloituslentoa: etusivu soi yhä");
        }
    }
}
