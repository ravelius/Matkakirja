// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "28e7c5d85c964309";
        public const string Versio = "v46b";   // v46a + kappelin alttarikaappi ja brokadi sekä keittiön noki (alfa); v45z + Codex-rekvisiitta 12 merkkiä (voudin sali, Linnantupa, keittiö, tyrmä; seinäesineet seina: true) ja tammiovien lehdet ovi-tammi-100x190/200.glb (pääovi, muurikäytävä, Kellotorni, tyrmä; LR 9.10.)
    }
}
