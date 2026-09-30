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

        // --- MOOTTORI: xAI / ElevenLabs v4 Turbo (omistaja 30.9.2026, Päätoimittajan erä; worker LUKIJA_ELEVEN_AANET) ------
        // Vertailu nostojen ja matkakirjan luentaan. Valinta näkyy ja vaikuttaa vain laitteilla, joilla on Pöllön koodi
        // (omistaja), ja kehitysversioissa; arvioijat ja pelaajat pysyvät xAI:ssa. Worker vaatii kehittäjäkoodin ja pitää
        // päiväkaton (20 000 mrk), jonka täyttyessä luetaan xAI:lla. Pulu pysyy omalla äänellään.
        public const string MoottoriAvain = "matkakirja-puhe-moottori", ElevenAaniAvain = "matkakirja-puhe-eleven-aani";
        public const string Eleven = "eleven";
        public static readonly IReadOnlyList<(string Tunnus, string Nimi)> Moottorit = new[] { ("xai", "xAI"), (Eleven, "ElevenLabs v4 Turbo") };

        /// <summary>
        /// ElevenLabsin lukijaäänet (workerin LUKIJA_ELEVEN_AANET-näyttökopio, oletus ensin): omistaja 30.9.2026 klo 23.1x "aina v4
        /// ääni eikä suomalaisia, mieluiten eniten käytettyjä ääniä" — jaetun kirjaston 23 eniten käytettyä, ei suomeksi merkattuja.
        /// Poikkeus (omistaja 23.5x): isoisän ääni Viisas kertoja ensimmäisenä ja oletuksena; worker ajaa sen v3:lla (LUKIJA_ELEVEN_MALLIT).
        /// </summary>
        public static readonly IReadOnlyList<(string Tunnus, string Nimi)> ElevenAanet = new[]
        {
            ("Sz0tRTEpybtDJ9ru2kgD", "Viisas kertoja (isoisä)"),
            ("MFZUKuGQUsGJPQjTS4wC", "Lämmin mieskertoja"), ("G17SuINrv2H9FC6nvetn", "Lempeä brittimies"), ("UgBBYS2sOqTuMpoF3BR0", "Rento keskustelija, mies"),
            ("6OzrBCQf8cjERkYgzSg8", "Nuori rento mies"), ("ZthjuvLPty3kTMaNKVKb", "Varma mieskertoja"), ("EkK5I93UQWFDigLMpZcX", "Käheä syvä mies"),
            ("uju3wxzG5OhpWcoi3SMy", "Ilmeikäs mieskertoja"), ("NNl6r8mD7vthiJatiJt1", "Eloisa brittikertoja"), ("NFG5qt843uXKj4pFvR7C", "Syvä rauhallinen mies"),
            ("j9jfwdrw7BRfcR43Qohk", "Samettinen brittimies"), ("XjLkpWUlnhS8i7gGz3lZ", "Uutistenlukija, mies"), ("wBXNqKUATyqu0RtYt25i", "Radiokuuluttaja, mies"),
            ("Se2Vw1WbHmGbBbyWTuu4", "Samettinen naiskertoja"), ("tnSpp4vdxKPjI9w0GnoV", "Pirteä kirkas nainen"), ("jqcCZkN6Knx8BJ5TBdYR", "Lämmin arkinen nainen"),
            ("ZF6FPAbjXT4488VcRRnw", "Innostunut brittinainen"), ("g6xIsTj2HwM6VR4iXFCw", "Juttuseura, nainen"), ("lxYfHSkYm1EzQzGhdbfc", "Ammattilukija, nainen"),
            ("yj30vwTGJxSHezdAGsv9", "Rento naiskertoja"), ("19STyYD15bswVz51nqLf", "Tyylikäs brittinainen"), ("Z3R5wn05IrDiVCyEkUrK", "Salaperäinen naiskertoja"),
            ("DLsHlh26Ugcm6ELvS0qi", "Rauhoittava etelän nainen"), ("wJqPPQ618aTW29mptyoc", "Pehmeä brittinainen"),
        };

        /// <summary>
        /// Saako laitteella valita moottorin: Pöllön koodi Keychainissa (omistajan kehittäjätila täydellä koodilla) tai
        /// kehitysversio. Worker hyväksyy ElevenLabsin vain koodilla (Päätoimittaja 30.9.2026), joten pelkällä
        /// matkakirja://omistaja-linkillä merkitty laite ei näe valintaa, joka ei toimisi.
        /// </summary>
        public static bool MoottoriSallittu => Asetukset.PolloKoodi != null || UnityEngine.Debug.isDebugBuild;

        /// <summary>Tallennettu moottori ("xai" tai "eleven"); ei huomioi oikeutta.</summary>
        public static string Moottori
        {
            get { try { return UnityEngine.PlayerPrefs.GetString(MoottoriAvain, "xai") == Eleven ? Eleven : "xai"; } catch { return "xai"; } }
            set { try { UnityEngine.PlayerPrefs.SetString(MoottoriAvain, value == Eleven ? Eleven : "xai"); UnityEngine.PlayerPrefs.Save(); } catch { } }
        }

        /// <summary>Valittu ElevenLabs-ääni (tuntematon → oletus).</summary>
        public static string ElevenAani
        {
            get
            {
                string a = null;
                try { a = UnityEngine.PlayerPrefs.GetString(ElevenAaniAvain, null); } catch { }
                return ElevenAanet.Any(x => x.Tunnus == a) ? a : ElevenAanet[0].Tunnus;
            }
            set { try { UnityEngine.PlayerPrefs.SetString(ElevenAaniAvain, value); UnityEngine.PlayerPrefs.Save(); } catch { } }
        }

        /// <summary>Lukijaaani.MoottoriLahde: (eleven, ääni) vain sallitulla laitteella, muuten null = xAI.</summary>
        public static (string Moottori, string Aani)? MoottoriValinta() =>
            MoottoriSallittu && Moottori == Eleven ? (Eleven, ElevenAani) : ((string, string)?)null;

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
