// STRIIMIÄÄNI (Natiivi-UI, omistaja 27.9.2026 klo 01.2x: "Lisää kehittäjä valikkoon äänen valinta xai:n
// vaihtoehdoista striimille"). Web: js/puhe.js STRIIMIAANET_XAI, striimiaani, asetaStriimiaani; valitsin
// js/main.js #kehittaja-striimiaani. Striimiluenta kulkee workerissa xAI:n Grok TTS:llä (oletus ara, päätös
// 27.9. klo 00.25), joten natiivi saa sen ilman muutosta; tämä vain valitsee kokeiltavan äänen.
//
// Valinta tallentuu samaan laitekohtaiseen persoonatauluun kuin Lukijaäänen säädöt (matkakirja-puhe-persoonat,
// Lukijaaani.AsetusAvain) kaikille kolmelle persoonalle kerralla; persoonan oma ohje säilyy. Worker tottelee
// listan ääntä ilman kehittäjäkoodia (#3388). Lista on workerin XAI_AANET-taulun näyttökopio. Valinta on 27.9. klo
// 10.2x alkaen nostokortin säätörattaassa pelinimellä (KortinLukija), ei enää kehittäjävalikossa.
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Natiivi
{
    public static class Striimiaani
    {
        public const string Oletus = "ara";

        /// <summary>xAI:n äänet (worker XAI_AANET = /v1/tts/voices 27.9.2026).</summary>
        public static readonly IReadOnlyList<string> Aanet = new[]
        {
            "altair", "ara", "atlas", "aurora", "carina", "castor", "celeste", "cosmo", "eve", "helios", "helix", "iris",
            "kepler", "leo", "liora", "lumen", "luna", "lux", "naksh", "orion", "perseus", "rex", "rigel", "sal",
            "sirius", "ursa", "zagan", "zenith",
        };

        /// <summary>
        /// Äänten pelinimet (omistaja 27.9.2026 klo 10.2x, sitova; web js/puhe.js AANTEN_PELINIMET #3388): pelaajalle näkyy
        /// vain nimi, moottorin tunnus kulkee pyynnössä. Valikon järjestys; oletus (ara = Aino) ensin.
        /// </summary>
        public static readonly IReadOnlyList<(string Tunnus, string Nimi)> Pelinimet = new[]
        {
            ("ara", "Aino"), ("aurora", "Aamu"), ("carina", "Kerttu"), ("celeste", "Siiri"), ("eve", "Helmi"),
            ("iris", "Ilta"), ("liora", "Lyyli"), ("luna", "Vieno"), ("ursa", "Saima"), ("altair", "Aarne"),
            ("atlas", "Antero"), ("castor", "Kalle"), ("cosmo", "Kosti"), ("helios", "Heikki"), ("helix", "Herman"),
            ("kepler", "Kaarlo"), ("leo", "Lauri"), ("lumen", "Lassi"), ("lux", "Luukas"), ("naksh", "Niilo"),
            ("orion", "Onni"), ("perseus", "Pekka"), ("rex", "Reino"), ("rigel", "Risto"), ("sal", "Sulo"),
            ("sirius", "Simo"), ("zagan", "Sakari"), ("zenith", "Väinö"),
        };

        /// <summary>Tunnuksen pelinimi (tuntematon → tunnus sellaisenaan ei näy: palauttaa oletuksen nimen).</summary>
        public static string Nimi(string tunnus)
        {
            foreach (var (t, n) in Pelinimet) if (t == tunnus) return n;
            return Pelinimet[0].Nimi;
        }

        static readonly string[] Persoonat = { "kertoja", "merkinnat", "pollo" };

        /// <summary>Kehittäjän valitsema xAI-ääni, tai null = workerin oletus (web striimiaani: pöllön ääni).</summary>
        public static string Valittu
        {
            get
            {
                string aani = Puhe.Saadot.Saadot("pollo")?.Aani;
                return aani != null && Aanet.Contains(aani) ? aani : null;
            }
        }

        /// <summary>Asettaa äänen kaikille persoonille; null tai tuntematon palauttaa oletuksen. Palauttaa valinnan.</summary>
        public static string Aseta(string aani)
        {
            string valinta = aani != null && Aanet.Contains(aani) ? aani : null;
            var s = Puhe.Saadot;
            foreach (var persoona in Persoonat)
                s.AsetaAsetus(persoona, valinta, s.Asetus(persoona).Ohje);
            return valinta;
        }
    }
}
