// PALLON SÄÄTILA (omistaja 8.10.2026 klo 09.1x–09.2x: "kumpikin toiminto saman napin alle"; tarkennus 09.1x: "ylimmäinen vaihtoehto
// omassa korostetussa laatikossaan … nimike olisi live, ja se nappi laittaisi sekä vuorokauden ajan, että säätilan togle … joko
// kummankin automaattitilaan tai sitten palauttaisi edelliset valinnat kumpaankin tilaan"; Päätoimittaja: ☾-napin lista, juna 166).
// Yhteinen rajapinta: Natiivi-UI:n ☾-lista asettaa valinnat, Linssiseppä lukee Aika ja Saa ja tekee tehosteet sekä asettaa LiveAika
// (kohteen paikallinen kellonaika), Pelikoodarin säähaku asettaa LiveSaa (kohteen todellinen sää).
//   LIVE päälle: Aika = LiveAika, Saa = LiveSaa; käsivalinnat muistissa.  LIVE pois: käsivalinnat palaavat.
//   Käsivalinta LIVEn aikana: LIVE sammuu, toinen ulottuvuus jää LIVEn nykyarvoon (näkymä ei hyppää) ja valinta jää voimaan.
// Puhdas ydin (ei UnityEnginea); UI tallentaa Tallenne-merkkijonon PlayerPrefsiin ja palauttaa Lue-kutsulla.
using System;

namespace Matkakirja.Linssit
{
    /// <summary>Pallon vuorokaudenaika: päivä (oletus) tai yö.</summary>
    public enum PalloAika { Paiva, Yo }

    /// <summary>Pallon sää: pois (oletus) tai sää.</summary>
    public enum PalloSaa { Pois, Selkea, Pilvinen, Sade, Sumu, Lumi, Ukkonen }

    public static class Saatila
    {
        static bool live;
        static PalloAika aikaValinta = PalloAika.Paiva, liveAika = PalloAika.Paiva;
        static PalloSaa saaValinta = PalloSaa.Pois, liveSaa = PalloSaa.Pois;

        /// <summary>Mikä tahansa näkyvä muutos (LIVE, valinnat tai LIVEn arvot).</summary>
        public static event Action Muuttui;

        static void Ilmoita(PalloAika a0, PalloSaa s0, bool l0)
        {
            if (a0 != Aika || s0 != Saa || l0 != live) Muuttui?.Invoke();
        }

        /// <summary>LIVE: aika ja sää kohteen todellisista (LiveAika, LiveSaa); pois palauttaa käsivalinnat.</summary>
        public static bool Live { get => live; set { var (a0, s0, l0) = (Aika, Saa, live); live = value; Ilmoita(a0, s0, l0); } }

        /// <summary>Käsin valittu aika (☾-lista); asetus sammuttaa LIVEn, ja sää jää LIVEn nykyarvoon.</summary>
        public static PalloAika AikaValinta
        {
            get => aikaValinta;
            set { var (a0, s0, l0) = (Aika, Saa, live); if (live) { saaValinta = liveSaa; live = false; } aikaValinta = value; Ilmoita(a0, s0, l0); }
        }

        /// <summary>Käsin valittu sää (☾-lista); asetus sammuttaa LIVEn, ja aika jää LIVEn nykyarvoon.</summary>
        public static PalloSaa SaaValinta
        {
            get => saaValinta;
            set { var (a0, s0, l0) = (Aika, Saa, live); if (live) { aikaValinta = liveAika; live = false; } saaValinta = value; Ilmoita(a0, s0, l0); }
        }

        /// <summary>Kohteen paikallisen kellonajan mukainen aika (Linssiseppä asettaa kohteen vaihtuessa ja ajan kuluessa).</summary>
        public static PalloAika LiveAika { get => liveAika; set { var (a0, s0, l0) = (Aika, Saa, live); liveAika = value; Ilmoita(a0, s0, l0); } }

        /// <summary>Kohteen todellinen sää nyt (Pelikoodarin säähaku); Pois, jos haku ei onnistunut.</summary>
        public static PalloSaa LiveSaa { get => liveSaa; set { var (a0, s0, l0) = (Aika, Saa, live); liveSaa = value; Ilmoita(a0, s0, l0); } }

        /// <summary>Voimassa oleva aika (tehosteet).</summary>
        public static PalloAika Aika => live ? liveAika : aikaValinta;

        /// <summary>Voimassa oleva sää (tehosteet); Pois = ei säätehosteita.</summary>
        public static PalloSaa Saa => live ? liveSaa : saaValinta;

        public static bool SaaPaalla => Saa != PalloSaa.Pois;

        /// <summary>Tallennusmuoto "live|aika|sää" käsivalinnoista (esim. "1|Yo|Sade"); LIVEn arvoja ei tallenneta.</summary>
        public static string Tallenne => (live ? "1" : "0") + "|" + aikaValinta + "|" + saaValinta;

        /// <summary>Palauttaa tallenteen; virheellinen tai puuttuva osa → oletus (LIVE pois, päivä, sää pois).</summary>
        public static void Lue(string tallenne)
        {
            var (a0, s0, l0) = (Aika, Saa, live);
            var o = (tallenne ?? "").Split('|');
            live = o.Length > 0 && o[0] == "1";
            aikaValinta = o.Length > 1 && Enum.TryParse(o[1], out PalloAika pa) && Enum.IsDefined(typeof(PalloAika), pa) && !int.TryParse(o[1], out _) ? pa : PalloAika.Paiva;
            saaValinta = o.Length > 2 && Enum.TryParse(o[2], out PalloSaa ps) && Enum.IsDefined(typeof(PalloSaa), ps) && !int.TryParse(o[2], out _) ? ps : PalloSaa.Pois;
            Ilmoita(a0, s0, l0);
        }

        /// <summary>Testeille: oletukset ilman tapahtumaa.</summary>
        public static void Nollaa() { live = false; aikaValinta = liveAika = PalloAika.Paiva; saaValinta = liveSaa = PalloSaa.Pois; }
    }
}
