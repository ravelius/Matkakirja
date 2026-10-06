// Saapumisen varateksti pois (omistaja 6.10.2026: "Nuo varatekstit kannattaa poistaa koko pelistä."): Matkakirjamerkinnat.Havainto
// ei saa koota merkintää paikkatiedon ensimmäisestä virkkeestä. Ilman kaupungin omaa merkintää (fokus, saapumisteksti tai
// kokoelman havaintorivi) Saapumisesitys palaa ilman korttia. UI-koodia ei käännetä Peli-testeissä, joten tarkistus on
// lähteestä. Vika toistettiin ensin: Havainto käytti Paikkatiedot(kaupunki) + EkaLause -varaa.
using System.IO;

namespace Matkakirja.Peli.Testit
{
    static class SaapumisvaraTestit
    {
        static string Lahde(string polku) => File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "..", polku));

        [Testi] static void HavaintoEiKaytaPaikkatietoaVarana()
        {
            string s = Lahde("Assets/Matkakirja/UI/Pulu/Matkakirjamerkinnat.cs");
            int alku = s.IndexOf("public static Merkinta Havainto(string kaupunki)");
            Oleta.Tosi(alku > 0, "Havainto löytyy");
            int loppu = s.IndexOf("public static Merkinta Satunnainen(", alku);
            string havainto = s.Substring(alku, loppu - alku);
            Oleta.Tosi(!havainto.Contains("Paikkatiedot(kaupunki)"), "toisto: Havainto kokosi varatekstin paikkatiedosta");
            Oleta.Tosi(!havainto.Contains("EkaLause("), "toisto: varatekstin ensimmäinen virke luettiin");
        }
    }
}
