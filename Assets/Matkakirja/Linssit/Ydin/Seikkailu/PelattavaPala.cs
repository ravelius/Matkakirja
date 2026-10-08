// PELATTAVAN PALAN KIINNITETTY PAKETTI (Siirtoseppä 8.10.2026): Olavinlinnan pala lukee tätä Linnanrakentajan pakettia (ei uusin.json:ia),
// joten jokainen appiversio pysyy omassa paketissaan ja yhteensopimaton datamuutos vaihtuu koodin mukana. Versio = LR:n vienti, jonka
// kultaisilla (Linssit-testit/kultaiset/olavinlinna-<Versio>-*.json) huonesimulaatio todentaa palan; testi vaatii, että ne täsmäävät.
namespace Matkakirja.Linssit.Seikkailu
{
    public static class PelattavaPala
    {
        public const string Hash = "77acdd6cb36380ee";
        public const string Versio = "v45f";   // v45d + veneen vesimaski (vene.glb solmu vesimaski) + märkyys (osa.markyys, pinta-merkkien markyys) + vene:alku 20 m ennen muuria (souto ~22 s; LR 8.10.)
    }
}
