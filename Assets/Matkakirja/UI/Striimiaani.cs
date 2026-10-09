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
            ("ara", "Aino"), ("aurora", "Aamu"), ("carina", "Kerttu"), ("celeste", "Siiri"), ("eve", "Helmi"),   // kieli: ei (erisnimet (äänten pelinimet, suomalaisia etunimiä; ei käännetä))
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
        // KONELUKIJA xAI POIS (omistaja 5.10.2026 klo 13.2x, Päätoimittajan kortti): kaikki lukijat ElevenLabsilla, oletus William
        // (worker KERTOJA_ELEVEN_AANI, eleven_v4, Sokrateen asetukset). Moottorivalintaa ei enää ole: Moottori on aina Eleven ja
        // pyyntö kantaa moottorin ja äänen kaikilla laitteilla (worker hyväksyy listan äänet ilman koodia). Äänen avain uusittu
        // (-2), jotta aiemmat kokeiluvalinnat (esim. Viisas kertoja) eivät ohita uutta oletusta.
        public const string MoottoriAvain = "matkakirja-puhe-moottori", ElevenAaniAvain = "matkakirja-puhe-eleven-aani-2";
        public const string Eleven = "eleven";
        public static readonly IReadOnlyList<(string Tunnus, string Nimi)> Moottorit = new[] { (Eleven, "ElevenLabs v4") };   // kieli: ei (tuotenimi)

        /// <summary>
        /// ElevenLabsin lukijaäänet (workerin LUKIJA_ELEVEN_AANET-näyttökopio, oletus ensin): omistaja 30.9.2026 klo 23.1x "aina v4
        /// ääni eikä suomalaisia, mieluiten eniten käytettyjä ääniä" — jaetun kirjaston 23 eniten käytettyä, ei suomeksi merkattuja.
        /// Poikkeus (omistaja 23.5x): isoisän ääni Viisas kertoja ensimmäisenä ja oletuksena; worker ajaa sen v3:lla (LUKIJA_ELEVEN_MALLIT).
        /// </summary>
        public static IReadOnlyList<(string Tunnus, string Nimi)> ElevenAanet => new[]
        {
            ("oae6GCCzwoEbfc5FHdEu", Kieli.T("ui.lukija.aani-william-rauhallinen-kertoja")), ("Sz0tRTEpybtDJ9ru2kgD", Kieli.T("ui.lukija.aani-viisas-kertoja-isoisa")),
            ("MFZUKuGQUsGJPQjTS4wC", Kieli.T("ui.lukija.aani-lammin-mieskertoja")), ("G17SuINrv2H9FC6nvetn", Kieli.T("ui.lukija.aani-lempea-brittimies")), ("UgBBYS2sOqTuMpoF3BR0", Kieli.T("ui.lukija.aani-rento-keskustelija-mies")),
            ("6OzrBCQf8cjERkYgzSg8", Kieli.T("ui.lukija.aani-nuori-rento-mies")), ("ZthjuvLPty3kTMaNKVKb", Kieli.T("ui.lukija.aani-varma-mieskertoja")), ("EkK5I93UQWFDigLMpZcX", Kieli.T("ui.lukija.aani-kahea-syva-mies")),
            ("uju3wxzG5OhpWcoi3SMy", Kieli.T("ui.lukija.aani-ilmeikas-mieskertoja")), ("NNl6r8mD7vthiJatiJt1", Kieli.T("ui.lukija.aani-eloisa-brittikertoja")), ("NFG5qt843uXKj4pFvR7C", Kieli.T("ui.lukija.aani-syva-rauhallinen-mies")),
            ("j9jfwdrw7BRfcR43Qohk", Kieli.T("ui.lukija.aani-samettinen-brittimies")), ("XjLkpWUlnhS8i7gGz3lZ", Kieli.T("ui.lukija.aani-uutistenlukija-mies")), ("wBXNqKUATyqu0RtYt25i", Kieli.T("ui.lukija.aani-radiokuuluttaja-mies")),
            ("Se2Vw1WbHmGbBbyWTuu4", Kieli.T("ui.lukija.aani-samettinen-naiskertoja")), ("tnSpp4vdxKPjI9w0GnoV", Kieli.T("ui.lukija.aani-pirtea-kirkas-nainen")), ("jqcCZkN6Knx8BJ5TBdYR", Kieli.T("ui.lukija.aani-lammin-arkinen-nainen")),
            ("ZF6FPAbjXT4488VcRRnw", Kieli.T("ui.lukija.aani-innostunut-brittinainen")), ("g6xIsTj2HwM6VR4iXFCw", Kieli.T("ui.lukija.aani-juttuseura-nainen")), ("lxYfHSkYm1EzQzGhdbfc", Kieli.T("ui.lukija.aani-ammattilukija-nainen")),
            ("yj30vwTGJxSHezdAGsv9", Kieli.T("ui.lukija.aani-rento-naiskertoja")), ("19STyYD15bswVz51nqLf", Kieli.T("ui.lukija.aani-tyylikas-brittinainen")), ("Z3R5wn05IrDiVCyEkUrK", Kieli.T("ui.lukija.aani-salaperainen-naiskertoja")),
            ("DLsHlh26Ugcm6ELvS0qi", Kieli.T("ui.lukija.aani-rauhoittava-etelan-nainen")), ("wJqPPQ618aTW29mptyoc", Kieli.T("ui.lukija.aani-pehmea-brittinainen")),
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
            get => Eleven;   // xAI poistettu (omistaja 5.10.2026)
            set { }
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
        public static (string Moottori, string Aani)? MoottoriValinta() => (Eleven, ElevenAani);

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
