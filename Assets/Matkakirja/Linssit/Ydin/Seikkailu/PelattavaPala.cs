// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "731d4ca7142127b8";
        public const string Versio = "v45y";   // v45x + #4 (sokkelit, kynnykset, Linnantuvan konsolit; kolme salia 8k), Kellotornin lepo-ote 12 ja kapeat otteet, lakaisu:apulainen-tupa, vuodet 12 leikkaukseen, vaihemallit (LR 9.10.)
    }
}
