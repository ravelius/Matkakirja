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
    }
}
