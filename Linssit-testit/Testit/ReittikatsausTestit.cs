// REITTIKATSAUS (Päätoimittaja 9.10., kohta 7: "kaikkien reittien automaattinen läpikäynti (käännökset, ylitykset, korkeudet,
// äkkilähdöt) + lista ennen ja jälkeen"): 37 kaupungin pallokierros kerralla taulukoksi PalloKaupungitTestit-mittareilla. Kääntö = suurin
// kääntönopeus, taaksepäin = lennon suurin paluu osuuden suunnassa, seisahdus = pisin paikallaanolo pysähdyksellä, sauma = lähdön ja
// laskun nopeus- ja kiihtyvyyshyppy (äkkilähtö), nousu = lennon korkein kohta lähtö- ja tulokorkeuden yli. Rajat valvovat
// PalloKaupungitTestit ja PalloKierrosTestit; tämä tulostaa vertailulistan (docs/raportit).
using System;
using System.Linq;

namespace Matkakirja.Linssit.Testit
{
    public static class ReittikatsausTestit
    {
        [Testi] static void ReititKaikissaKaupungeissa()
        {
            Console.WriteLine("      | Kaupunki | kääntö °/s | taaksepäin m | seisahdus s | sauma Δv m/s | sauma Δa m/s² | nykäys m/s | nousu m | viat |");
            int viat = 0;
            foreach (var c in PalloKaupungitTestit.Lue())
            {
                var t = PalloKaupungitTestit.Mittaa(c); var (nousu, _) = PalloKaupungitTestit.LennonNousu(c);
                viat += t.Viat.Count;
                Console.WriteLine($"      | {t.Kaupunki} | {t.Kaanto:F1} | {t.Taaksepain:F1} | {t.Seisahdus:F1} | {t.SaumaDv:F2} | {t.SaumaDa:F2} | {t.Nykays:F1} | {nousu:F0} | {t.Viat.Count} |");
            }
            Console.WriteLine($"      viat yhteensä {viat}");
        }
    }
}
