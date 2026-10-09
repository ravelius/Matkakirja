// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "a41ac10c88688301";
        public const string Versio = "v45z";   // v45y + historian restaurointivaihe 1961–1975 (9 telineryhmää, Museoviraston kuvat CC BY 4.0; LR 9.10.)
    }
}
