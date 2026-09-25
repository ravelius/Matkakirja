// LÄMPÖ JA VIRRANKULUTUS NATIIVISSA (Raamattu, omistaja 25.9.2026, build 16): Natiivisepän osuuden puhtaat päätökset
// (Kartta/Lampopaatos.cs): pallon lepo (PallonLepo), herätyksen takaraja, kytkimien sanat ja päävalon varjot (LampoSaadot).
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LampopaatosTestit
    {
        const float V = Lampopaatos.ValmisAste;
        static Lampopaatos.Este Lepo(bool levossa = true, bool muuttui = false, float aste = 100f, bool vakaat = true,
            bool kiire = false, float aika = 10f, float hereilla = 0f, bool animaatio = false) =>
            Lampopaatos.Lepo(levossa, muuttui, aste, vakaat, kiire, aika, hereilla, animaatio);

        [Testi]
        static void LepaaKunMikaanEiMuutu()
        {
            Oleta.Sama(Lampopaatos.Este.Ei, Lepo());
            Oleta.Sama(Lampopaatos.Este.Ei, Lepo(aste: V), "raja-arvo 99,99 kelpaa");
            Oleta.Sama("", Lampopaatos.Syy(Lampopaatos.Este.Ei, 100f, null));
        }

        [Testi]
        static void EsteetJarjestyksessa()
        {
            // Kaikki esteet päällä: kamera ensin, sitten laatat, palvelin, asettuvat laatat, herätys ja animaatio.
            Oleta.Sama(Lampopaatos.Este.Kamera, Lepo(levossa: false, aste: 50f, kiire: true, hereilla: 99f, animaatio: true));
            Oleta.Sama(Lampopaatos.Este.Kamera, Lepo(muuttui: true), "näkymä muuttui tässä kehyksessä");
            Oleta.Sama(Lampopaatos.Este.Laatat, Lepo(aste: 97.5f, kiire: true, vakaat: false, hereilla: 99f, animaatio: true));
            Oleta.Sama(Lampopaatos.Este.Palvelin, Lepo(kiire: true, vakaat: false, hereilla: 99f, animaatio: true));
            Oleta.Sama(Lampopaatos.Este.Laatat, Lepo(vakaat: false, hereilla: 99f, animaatio: true), "asettuvat");
            Oleta.Sama(Lampopaatos.Este.Heratys, Lepo(hereilla: 10.5f, animaatio: true));
            Oleta.Sama(Lampopaatos.Este.Animaatio, Lepo(animaatio: true));
        }

        [Testi]
        static void KeskenerainenAsteEiLepaa()
        {
            Oleta.Sama(Lampopaatos.Este.Laatat, Lepo(aste: 99.98f));
            Oleta.Sama(Lampopaatos.Este.Laatat, Lepo(aste: float.NaN), "NaN = ei yhtään laattaa laskussa");
            Oleta.Sama("laatat 97 %", Lampopaatos.Syy(Lampopaatos.Este.Laatat, 97.9f, null));
            Oleta.Sama("laatat ? %", Lampopaatos.Syy(Lampopaatos.Este.Laatat, float.NaN, null));
            Oleta.Sama("laatat asettuvat", Lampopaatos.Syy(Lampopaatos.Este.Laatat, 100f, null));
        }

        [Testi]
        static void HerataanTasanRajaan()
        {
            Oleta.Sama(Lampopaatos.Este.Heratys, Lepo(aika: 9.99f, hereilla: 10f));
            Oleta.Sama(Lampopaatos.Este.Ei, Lepo(aika: 10f, hereilla: 10f), "takaraja itse = hereillä ohi");
        }

        [Testi]
        static void SyytLyhyina()
        {
            Oleta.Sama("kamera", Lampopaatos.Syy(Lampopaatos.Este.Kamera, 100f, null));
            Oleta.Sama("palvelin", Lampopaatos.Syy(Lampopaatos.Este.Palvelin, 100f, null));
            Oleta.Sama("herätys: kerros reitit", Lampopaatos.Syy(Lampopaatos.Este.Heratys, 100f, "kerros reitit"));
            Oleta.Sama("herätys: ?", Lampopaatos.Syy(Lampopaatos.Este.Heratys, 100f, null));
            Oleta.Sama("animaatio: siirtokohteet: halo", Lampopaatos.Syy(Lampopaatos.Este.Animaatio, 100f, "siirtokohteet: halo"));
        }

        [Testi]
        static void VakausKolmestaNaytteesta()
        {
            Oleta.Tosi(Lampopaatos.Vakaa(100f, 100f, 100f), "sama kolmesti");
            Oleta.Tosi(Lampopaatos.Vakaa(V, V, V), "raja-arvo kolmesti");
            Oleta.Tosi(!Lampopaatos.Vakaa(100f, 100f, 99.5f), "toissa kehys vielä kesken");
            Oleta.Tosi(!Lampopaatos.Vakaa(100f, 99.995f, 99.995f), "juuri valmistui (muutos)");
            Oleta.Tosi(!Lampopaatos.Vakaa(99.9f, 99.9f, 99.9f), "vakaa mutta ei valmis");
            Oleta.Tosi(!Lampopaatos.Vakaa(100f, float.NaN, float.NaN), "historia puuttuu (uusi tileset, kamera päälle)");
            Oleta.Tosi(!Lampopaatos.Vakaa(float.NaN, float.NaN, float.NaN), "NaN");
        }

        [Testi]
        static void PieninAsteNaNVoittaa()
        {
            Oleta.Sama(97f, Lampopaatos.Pienin(100f, 97f));
            Oleta.Sama(97f, Lampopaatos.Pienin(97f, 100f));
            Oleta.Tosi(float.IsNaN(Lampopaatos.Pienin(100f, float.NaN)), "NaN oikealla");
            Oleta.Tosi(float.IsNaN(Lampopaatos.Pienin(float.NaN, 50f)), "NaN vasemmalla");
        }

        static void Lahella(float odotettu, float saatu, string viesti = "") =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) < 1e-4f, $"odotettu {odotettu}, saatu {saatu} {viesti}");

        [Testi]
        static void LyhytHeratysEiLyhennaPitkaa()
        {
            Lahella(10.6f, Lampopaatos.Heratys(0f, 10f, 0.6f));
            Oleta.Sama(10.6f, Lampopaatos.Heratys(10.6f, 10.2f, 0.1f), "0,1 s kesken 0,6 s:n ei lyhennä");
            Lahella(11.2f, Lampopaatos.Heratys(10.6f, 10.2f, 1f), "pidempi jatkaa");
            Oleta.Sama(10f, Lampopaatos.Heratys(0f, 10f, -1f), "negatiivinen = 0");
            Oleta.Sama(10f, Lampopaatos.Heratys(0f, 10f, float.NaN), "NaN = 0");
        }

        [Testi]
        static void KytkimenSanat()
        {
            Oleta.Sama(true, Lampopaatos.PaalleTaiPois("paalle"));
            Oleta.Sama(true, Lampopaatos.PaalleTaiPois("päälle"));
            Oleta.Sama(false, Lampopaatos.PaalleTaiPois("pois"));
            Oleta.Tosi(Lampopaatos.PaalleTaiPois("tila") == null, "tila = kysely");
            Oleta.Tosi(Lampopaatos.PaalleTaiPois(null) == null, "null");
            Oleta.Sama(Lampopaatos.VarjoTila.Pois, Lampopaatos.VarjoTilaksi("pois").Value);
            Oleta.Sama(Lampopaatos.VarjoTila.Auto, Lampopaatos.VarjoTilaksi("auto").Value);
            Oleta.Sama(Lampopaatos.VarjoTila.Paalle, Lampopaatos.VarjoTilaksi("paalle").Value);
            Oleta.Sama(Lampopaatos.VarjoTila.Paalle, Lampopaatos.VarjoTilaksi("päälle").Value);
            Oleta.Tosi(Lampopaatos.VarjoTilaksi("tila") == null, "tila = kysely");
        }

        [Testi]
        static void VarjotTilanJaMaamerkinMukaan()
        {
            Oleta.Tosi(!Lampopaatos.VarjotPaalla(Lampopaatos.VarjoTila.Pois, true), "pois: ei koskaan");
            Oleta.Tosi(!Lampopaatos.VarjotPaalla(Lampopaatos.VarjoTila.Auto, false), "auto ilman maamerkkiä");
            Oleta.Tosi(Lampopaatos.VarjotPaalla(Lampopaatos.VarjoTila.Auto, true), "auto maamerkin kanssa");
            Oleta.Tosi(Lampopaatos.VarjotPaalla(Lampopaatos.VarjoTila.Paalle, false), "päälle: aina");
        }

        [Testi]
        static void VarjokartanEtaisyys()
        {
            // Big Ben liioiteltuna 97 m × 20 = 1 940 m, 60 km:n päässä: 60 000 + 2 × 1 940.
            Oleta.Sama(63880f, Lampopaatos.VarjoTarve(60000f, 1940f));
            Oleta.Sama(1000f, Lampopaatos.VarjoTarve(1000f, -5f), "negatiivinen korkeus = 0");
            Oleta.Sama(63880f, Lampopaatos.VarjoEtaisyys(63880f, 50f));
            Oleta.Sama(50f, Lampopaatos.VarjoEtaisyys(20f, 50f), "vähintään alkuperäinen");
            Oleta.Sama(50f, Lampopaatos.VarjoEtaisyys(float.NaN, 50f), "ei maamerkkiä ruudulla");
            Oleta.Sama(50f, Lampopaatos.VarjoEtaisyys(0f, 50f), "tarve 0");
        }

        // ---- Joutosyke (Fable 25.9.2026 klo 20.1x): kello, keskiasento ja jatko ----

        const float Kehys = 1f / 30f;

        /// <summary>n kehystä (30 fps) hetkestä alku alkaen ilman aktiivisuutta.</summary>
        static Lampopaatos.Syke Kehykset(Lampopaatos.Syke s, float alku, int n, bool jaatyy = true)
        {
            for (int i = 1; i <= n; i++) s = Lampopaatos.SykeAskel(s, alku + i * Kehys, Kehys, false, jaatyy);
            return s;
        }

        /// <summary>Aktiivisuus hetkellä 0, sitten lepo niin, että viimeinen askel on hetkellä nyt.</summary>
        static Lampopaatos.Syke Levossa(float nyt, bool jaatyy = true)
        {
            var s = Lampopaatos.SykeAskel(Lampopaatos.Syke.Alku, 0f, Kehys, true, jaatyy);
            return Lampopaatos.SykeAskel(s, nyt, Kehys, false, jaatyy);
        }

        [Testi]
        static void SykeElaaKolmeSekuntiaLevossa()
        {
            Oleta.Sama(1f, Levossa(2.99f).Voima, "2,99 s levossa: täysi syke");
            Oleta.Tosi(Levossa(3f).Voima < 1f, "3 s levossa: liuku keskiasentoon alkaa");
            var s = Lampopaatos.SykeAskel(Lampopaatos.Syke.Alku, 0f, Kehys, true, true);
            Oleta.Sama(0f, s.Aktiivinen, "aktiivisuus merkitty");
            s = Lampopaatos.SykeAskel(s, 2f, Kehys, false, true);
            Oleta.Sama(0f, s.Aktiivinen, "lepo (myös idle-animaatiot ja laatat) ei siirrä aktiivisuuden hetkeä");
        }

        [Testi]
        static void SykeLiukuuKeskiasentoonNoin03s()
        {
            // Lepo alkaa hetkellä 0; kolmen sekunnin kohdalla voima laskee tasaisesti nollaan 0,3 s:ssa (9–10 kehystä).
            var s = Lampopaatos.SykeAskel(Lampopaatos.Syke.Alku, 0f, Kehys, true, true);
            float edellinen = 1f;
            int kehyksia = 0;
            for (float nyt = 3f; s.Voima > 0f && kehyksia < 100; nyt += Kehys, kehyksia++)
            {
                s = Lampopaatos.SykeAskel(s, nyt, Kehys, false, true);
                Oleta.Tosi(s.Voima < edellinen, "voima laskee joka kehys");
                // Pehmennetty voima (näytölle) ei hyppää: muutos kehyksessä alle kolmanneksen.
                Oleta.Tosi(Math.Abs(Lampopaatos.SykePehmea(s.Voima) - Lampopaatos.SykePehmea(edellinen)) < 0.34f, "ei hyppyä");
                edellinen = s.Voima;
            }
            Oleta.Tosi(kehyksia >= 9 && kehyksia <= 10, $"liuku {kehyksia} kehystä (0,3 s = 9)");
            Oleta.Sama(0f, s.Voima, "jäätynyt");
        }

        [Testi]
        static void JaatynytAikaPysahtyyJaJatkuuHetiSamasta()
        {
            var s = Levossa(3.5f);
            s = Kehykset(s, 3.5f, 15);
            Oleta.Sama(0f, s.Voima, "jäätynyt 3,5 s levon jälkeen");
            float jaatynyt = s.Aika;
            s = Kehykset(s, 4f, 300);
            Oleta.Sama(jaatynyt, s.Aika, "jäätyneenä aika ei etene (10 s)");
            // Aktiivisuus (kosketus, kamera-ajo, Muuttui): voima nousee heti samassa kehyksessä, aika jatkaa samasta kohdasta.
            s = Lampopaatos.SykeAskel(s, 20f, Kehys, true, true);
            Oleta.Tosi(s.Voima > 0f && s.Voima < 0.2f, $"voima nousee heti ja pehmeästi ({s.Voima})");
            Lahella(jaatynyt + Kehys, s.Aika, "aika jatkaa jäätyneestä kohdasta");
            s = Kehykset(s, 20f, 9);
            Oleta.Sama(1f, s.Voima, "täysi syke 0,3 s:ssa");
        }

        [Testi]
        static void AktiivisuusNollaaKellon()
        {
            var s = Lampopaatos.SykeAskel(Lampopaatos.Syke.Alku, 0f, Kehys, true, true);
            s = Lampopaatos.SykeAskel(s, 2.9f, Kehys, true, true);   // esim. kosketus juuri ennen jäädytystä
            s = Lampopaatos.SykeAskel(s, 5.8f, Kehys, false, true);
            Oleta.Sama(1f, s.Voima, "kello alkoi alusta 2,9 s:ssa");
            s = Lampopaatos.SykeAskel(s, 5.9f, Kehys, false, true);
            Oleta.Tosi(s.Voima < 1f, "3 s viimeisestä aktiivisuudesta: liuku alkaa");
        }

        [Testi]
        static void KytkinPoisPitaaSykkeenJatkuvana()
        {
            var s = Levossa(1f, false);
            s = Kehykset(s, 1f, 1800, false);   // minuutti levossa
            Oleta.Sama(1f, s.Voima, "jatkuva syke (TODO: KEHYKSEN HINTA -erän jälkeen)");
            Oleta.Tosi(s.Aika > 60f, $"aika etenee ({s.Aika})");
        }

        [Testi]
        static void KeskiasentoJaPehmennys()
        {
            // Avoimen karttapisteen syke 1 … 1,2 (määrä 0,2, jakso 1,6 s): keskiasento 1,1 millä tahansa ajalla.
            foreach (var aika in new[] { 0f, 0.4f, 0.77f, 1.2f, 13.3f })
                Lahella(1.1f, Lampopaatos.PisteenSyke(aika, 1.6f, 0.2f, 0f), $"keskiasento ajalla {aika}");
            Lahella(1.2f, Lampopaatos.PisteenSyke(0.4f, 1.6f, 0.2f, 1f), "täysi syke: huippu neljänneksessä jaksoa");
            Lahella(1.0f, Lampopaatos.PisteenSyke(1.2f, 1.6f, 0.2f, 1f), "täysi syke: pohja kolmessa neljänneksessä");
            Lahella(1.15f, Lampopaatos.PisteenSyke(0.4f, 1.6f, 0.2f, 0.5f), "puolikas voima puolivälissä");
            // Halo ja rengas (varjostimet): e = 0,5 + voima × (e − 0,5); keskiasento e = 0,5 (säde ×1,28 / ×1,08).
            Oleta.Sama(0.5f, Lampopaatos.Keskelle(0.93f, 0.5f, 0f));
            Oleta.Sama(0.93f, Lampopaatos.Keskelle(0.93f, 0.5f, 1f));
            Oleta.Sama(0f, Lampopaatos.SykePehmea(0f));
            Oleta.Sama(1f, Lampopaatos.SykePehmea(1f));
            Oleta.Sama(0.5f, Lampopaatos.SykePehmea(0.5f));
            Oleta.Sama(1f, Lampopaatos.SykePehmea(2f), "rajattu");
            Oleta.Sama(0f, Lampopaatos.SykePehmea(-1f), "rajattu");
        }
    }
}
