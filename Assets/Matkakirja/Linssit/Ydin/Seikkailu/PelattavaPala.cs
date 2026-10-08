// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "92f6029878e2011b";
        public const string Versio = "v44z";   // vuoden 1499 linna (etuvarustus ja silta, ranta-1499), harja ja muurikäytävän piilot; kuorileikkauksia 32
    }
}
