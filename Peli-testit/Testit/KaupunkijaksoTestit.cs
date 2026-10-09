// KAUPUNKIMUSIIKIN JAKSO (omistaja 9.10.2026: "nopea → tauko → hidas → vähäeleinen tausta"; Pariisin pilotti, Pelikoodari).
// AaniTila soittaa jakson pohjakanavalla: nopea nykyversio kerran, tauko (soitin ajastaa, JaksonTaukoOhi), kaupungin hidas
// kappale kerran ja vähäeleinen tausta silmukkana. Muut kaupungit kuten ennen. Polut tarkistetaan Contains-muodossa, jotta
// testit pätevät myös -lyria-v2-osoitteilla (AaniOsoite.Musiikkiversio, juna 172).
namespace Matkakirja.Peli.Testit
{
    static class KaupunkijaksoTestit
    {
        static AaniTila Uusi(bool kerranLapi = true)
        {
            var t = AaniTaulut.Oletus();
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
            Oleta.Tosi(Soi(s, "musa-pohja"), "4. tausta: " + Pohja(s));
            Oleta.Tosi(s.Toive(Kanava.Pohja).Silmukka, "tausta silmukkana");
            Oleta.Sama("pariisi:tausta", s.Jakso);
            s.JaksonTaukoOhi(1);
            Oleta.Tosi(Soi(s, "musa-pohja"), "myöhäinen tauon loppu ei palauta hidasta");
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

        [Testi] static void MuutKaupungitJaWebTilaEnnallaan()
        {
            var s = Uusi();
            s.Paikka("wien", "kaupunki");
            Oleta.Tosi(Soi(s, "musa-kaupunki-keski-eurooppa"), "alueraita: " + Pohja(s));
            Oleta.Sama(null, s.Jakso);
            var w = Uusi(kerranLapi: false);
            w.Paikka("pariisi", "kaupunki");
            Oleta.Tosi(Soi(w, "musa-kaupunki-pariisi") && !Soi(w, "musa-kaupunki-pariisi-nopea"), "web-tila (KerranLapi false): kaupunkiraita: " + Pohja(w));
            Oleta.Sama(null, w.Jakso);
        }
    }
}
