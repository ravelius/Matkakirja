// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "85dfe875bb235d64";
        public const string Versio = "v45o";   // v45n + 8K-atlakset (kappeli, keittio-g102, linnantupa, voudin-sali; Ultra), uudet tilaglb:t (uusi UV1), 34 esineen normaalikartat (LR 8.10.)
    }
}
