// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "2adaa1e6c374bb36";
        public const string Versio = "v45b";   // v45a (vuoden 1499 linna 1–10, tiilet ja veneen köysi) + tekstuurien kevennys (LR 8.10.: esineet 87,9 → 61,9 Mt, Fogg 16 → 4 Mt), merkit ja reitit samat
    }
}
