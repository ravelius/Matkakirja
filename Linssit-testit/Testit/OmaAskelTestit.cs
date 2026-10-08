// HISTORIAMOOTTORI (Siirtoseppä 8.10.2026): pelattavuusmalli 2.2 — pelaajan omat askeleet pinnan ja liiketavan mukaan.
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OmaAskelTestit
    {
        [Testi] static void PintaJaTapaVoimakkuuteen()
        {
            var olki = Askelaani.OmaAskel("olki", Liiketapa.Kavely); var kivi = Askelaani.OmaAskel("kivi", Liiketapa.Kavely);
            var vesi = Askelaani.OmaAskel("vesi", Liiketapa.Kavely);
            Oleta.Tosi(olki.Voimakkuus < kivi.Voimakkuus && kivi.Voimakkuus < vesi.Voimakkuus, "olki < kivi < vesi");
            var hiivi = Askelaani.OmaAskel("kivi", Liiketapa.Hiipiminen); var juoksu = Askelaani.OmaAskel("kivi", Liiketapa.Juoksu);
            Oleta.Tosi(hiivi.Voimakkuus > 0 && hiivi.Voimakkuus < kivi.Voimakkuus && kivi.Voimakkuus < juoksu.Voimakkuus && juoksu.Voimakkuus <= 1f,
                "hiivintä kuuluu itselle hiljaa < kävely < juoksu ≤ 1");
        }

        [Testi] static void TunnuksetJaVara()
        {
            Oleta.Tosi(Askelaani.OmaAskel("puu", Liiketapa.Kavely).Tunnukset[0] == "askel-puu" && Askelaani.OmaAskel("puu", Liiketapa.Kavely).Tunnukset[1] == "askel-kivi", "puu, vara kivi");
            Oleta.Tosi(Askelaani.OmaAskel("porras", Liiketapa.Kavely).Tunnukset[0] == "askel-porras-1", "porras");
            var tuntematon = Askelaani.OmaAskel("laava", Liiketapa.Kavely);
            Oleta.Tosi(tuntematon.Tunnukset.Length == 1 && tuntematon.Tunnukset[0] == "askel-kivi", "tuntematon pinta = kivi");
        }
    }
}
