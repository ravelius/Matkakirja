// Pallon säätila (omistaja 8.10.2026, ☾-napin lista): LIVE (aika ja sää kohteen todellisista) tai käsivalinnat päivä | yö ja
// sää pois | selkeä | … | ukkonen; LIVE muistaa ja palauttaa käsivalinnat; rajapinta LS1:lle ja Pelikoodarille.
using System;

namespace Matkakirja.Linssit.Testit
{
    public static class SaatilaTestit
    {
        [Testi] static void OletuksetLivePoisPaivaSaaPois()
        {
            Saatila.Nollaa();
            Oleta.Tosi(!Saatila.Live && Saatila.Aika == PalloAika.Paiva && Saatila.Saa == PalloSaa.Pois && !Saatila.SaaPaalla, "oletus");
        }

        [Testi] static void LiveKayttaaTodellisiaJaPalauttaaKasivalinnat()
        {
            Saatila.Nollaa();
            int n = 0; Action k = () => n++; Saatila.Muuttui += k;
            try
            {
                Saatila.AikaValinta = PalloAika.Yo; Saatila.SaaValinta = PalloSaa.Sumu;
                Saatila.LiveAika = PalloAika.Paiva; Saatila.LiveSaa = PalloSaa.Sade;
                int ennen = n;
                Saatila.Live = true;
                Oleta.Tosi(Saatila.Aika == PalloAika.Paiva && Saatila.Saa == PalloSaa.Sade, "LIVE: kohteen aika ja sää");
                Oleta.Sama(ennen + 1, n, "LIVE päälle ilmoittaa kerran");
                Saatila.LiveSaa = PalloSaa.Ukkonen;
                Oleta.Tosi(Saatila.Saa == PalloSaa.Ukkonen, "säähaun tulos näkyy heti");
                Saatila.Live = false;
                Oleta.Tosi(Saatila.Aika == PalloAika.Yo && Saatila.Saa == PalloSaa.Sumu, "LIVE pois: käsivalinnat palaavat");
                int m = n; Saatila.LiveSaa = PalloSaa.Lumi;
                Oleta.Sama(m, n, "LIVEn arvo ei ilmoita, kun LIVE on pois (ei näkyvää muutosta)");
            }
            finally { Saatila.Muuttui -= k; Saatila.Nollaa(); }
        }

        [Testi] static void KasivalintaLivenAikanaSammuttaaLiven()
        {
            Saatila.Nollaa();
            Saatila.AikaValinta = PalloAika.Paiva; Saatila.SaaValinta = PalloSaa.Pois;
            Saatila.LiveAika = PalloAika.Yo; Saatila.LiveSaa = PalloSaa.Pilvinen;
            Saatila.Live = true;
            Saatila.SaaValinta = PalloSaa.Selkea;
            Oleta.Tosi(!Saatila.Live, "LIVE sammui");
            Oleta.Tosi(Saatila.Saa == PalloSaa.Selkea && Saatila.Aika == PalloAika.Yo, "valinta voimaan, aika jäi LIVEn arvoon (ei hyppyä)");
            Saatila.Live = true; Saatila.AikaValinta = PalloAika.Paiva;
            Oleta.Tosi(!Saatila.Live && Saatila.Aika == PalloAika.Paiva && Saatila.Saa == PalloSaa.Pilvinen, "ajan valinta: sää jäi LIVEn arvoon");
            Saatila.Nollaa();
        }

        [Testi] static void TallenneMeneeJaPalaa()
        {
            Saatila.Nollaa();
            Saatila.AikaValinta = PalloAika.Yo; Saatila.SaaValinta = PalloSaa.Ukkonen; Saatila.Live = true;
            string t = Saatila.Tallenne;
            Oleta.Sama("1|Yo|Ukkonen", t, "tallenne");
            Saatila.Nollaa();
            Saatila.Lue(t);
            Oleta.Tosi(Saatila.Live && Saatila.AikaValinta == PalloAika.Yo && Saatila.SaaValinta == PalloSaa.Ukkonen, "palautus");
            Saatila.Lue("x|Ilta|Myrsky"); Oleta.Tosi(!Saatila.Live && Saatila.Aika == PalloAika.Paiva && Saatila.Saa == PalloSaa.Pois, "tuntematon → oletus");
            Saatila.Lue("0|7|99"); Oleta.Tosi(Saatila.AikaValinta == PalloAika.Paiva && Saatila.SaaValinta == PalloSaa.Pois, "numerot → oletus");
            Saatila.Lue(null); Oleta.Tosi(!Saatila.Live && Saatila.Aika == PalloAika.Paiva, "null → oletus");
            Saatila.Nollaa();
        }
    }
}
