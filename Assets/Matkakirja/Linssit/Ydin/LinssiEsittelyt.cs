// LINSSIEN ESITTELYT JA HAVAINNEKUVAT pillerivalikon Linssit-näkymään (omistaja 29.9.2026, loki 09.12: linssin 1. napautus
// näyttää vasemmalla havainnekuvan tai isomman kuvan ja esittelyn; Linssiseppä 29.9.2026, näkymä Natiivi-UI:n
// Linssivalitsin.Pilleri). Web: kunkin linssimoduulin LINSSI.esittely (Sisältökirjuri #3611, 1–2 lausetta, ≤ 160 merkkiä).
//
// LinssiTiedot.Esittely lukee ensin linssimoduulin JSON:n (radio, maat, keksinnöt ja vesistöt tulevat webin moduulista), sitten
// tämän taulun, joka kattaa myös koodissa määritellyt linssit (topografia, astronautin kamera, ihmisen matka, vertailu, pallo).
// Taulu vastaa webiä sanasta sanaan: Linssit-testit/Testit/LinssiEsittelytTestit.cs vertaa sitä kultaiseen
// linssi-esittelyt.json:iin (tee-linssi-esittelyt.mjs webin rekisteristä). Havainnekuvia ei vielä ole yhdelläkään linssillä
// (Pelikoodari kerää puuttuvat Päätoimittajalle); osoitteet lisätään tähän, kun ne tulevat.
using System.Collections.Generic;

namespace Matkakirja.Linssit
{
    public static class LinssiEsittelyt
    {
        static readonly Dictionary<string, string> Esittelyt = new Dictionary<string, string>
        {
            ["ihmisen-matka"] = "Ihmiskunnan leviäminen Afrikasta koko maailmaan aikajanalla: käynnistä kello ja katso, miten asutus etenee "
                + "mantereelta toiselle.",
            ["keksinnot"] = "Eurooppalaisten keksintöjen aikajana 1769–1928: käynnistä kello ja katso, missä ja milloin mikin keksintö syntyi.",
            ["pallo"] = "Isoisän juliste pallona: pyöritä maailmaa ja napauta kohtaa, johon haluat sukeltaa.",
            ["radio"] = "Kaupungit ovat play-nappeja: kuulet mitä siellä lähetetään juuri nyt.",
            ["satelliitti"] = "Suuntaa kaukoputki Maahan ja katso valokuva, jonka astronautti otti ikkunasta.",
            ["topografia"] = "Maailma maastona: väri kertoo korkeuden, varjo kertoo muodon.",
            ["vertailu"] = "Valitse kartalta enintään kolme maata Suomen rinnalle ja vertaa niitä samoilla asteikoilla.",
            ["maatiedot"] = "Napauta kartalta mitä tahansa maata ja lue sen oma lehti — ei tarvitse matkustaa perille.",
            ["vesistot"] = "Joet ja järvet maaston päällä: vesi näkyy siellä minne maa viettää.",
        };

        /// <summary>Havainnekuvien osoitteet tunnuksittain (tyhjä, kunnes kuvat tulevat).</summary>
        static readonly Dictionary<string, string> Havainnekuvat = new Dictionary<string, string>();

        /// <summary>Tunnukset, joilla on esittely (testit).</summary>
        public static IEnumerable<string> Tunnukset => Esittelyt.Keys;

        public static string Esittely(string tunnus) =>
            tunnus != null && Esittelyt.TryGetValue(tunnus, out var e) ? e : null;

        public static string Havainnekuva(string tunnus) =>
            tunnus != null && Havainnekuvat.TryGetValue(tunnus, out var k) ? k : null;
    }
}
