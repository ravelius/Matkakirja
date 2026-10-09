// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "410c7bc5bb1c4e07";
        public const string Versio = "v46d";   // v46c + pako-kellobastionin leikkaukset y −7,5…8 vesipohjalla; v46b + ranta-1499:n vuosileikkausten vesipohja −7,02 ja tyhjä saari v2 (leivottu 2048²-kuva); v46a + kappelin alttarikaappi ja brokadi sekä keittiön noki (alfa); v45z + Codex-rekvisiitta 12 merkkiä (voudin sali, Linnantupa, keittiö, tyrmä; seinäesineet seina: true) ja tammiovien lehdet ovi-tammi-100x190/200.glb (pääovi, muurikäytävä, Kellotorni, tyrmä; LR 9.10.)
    }
}
