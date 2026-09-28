// NIMIEN LIIKELUKKO (NimiLadonta.Ruudulla, LukittuNakyvyys): web on malli (Pelikoodarin mittaus 28.9.2026) —
// näkyvyys päätetään vain levossa, liikkeessä ruudulla ollut nimi pitää tilansa, ruudulle tuleva saa ladonnan tuloksen.
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LiikelukkoTestit
    {
        [Testi]
        static void RuudullaVarallaSisalla()
        {
            // 1170 × 2532 px, kerroin 3 → vara 48 px.
            Oleta.Tosi(NimiLadonta.Ruudulla(600, 1200, 1170, 2532, 3f), "keskellä");
            Oleta.Tosi(!NimiLadonta.Ruudulla(40, 1200, 1170, 2532, 3f), "vasen reuna alle 16 pt");
            Oleta.Tosi(NimiLadonta.Ruudulla(48, 1200, 1170, 2532, 3f), "täsmälleen 16 pt");
            Oleta.Tosi(!NimiLadonta.Ruudulla(600, 2500, 1170, 2532, 3f), "yläreuna");
            Oleta.Tosi(!NimiLadonta.Ruudulla(-10, 1200, 1170, 2532, 3f), "ulkona");
        }

        [Testi]
        static void NakyvyysLukossaLiikkeessa()
        {
            // Levossa aina ladonnan tulos.
            Oleta.Tosi(!NimiLadonta.LukittuNakyvyys(true, true, true, false), "levossa: ladonta piilottaa");
            Oleta.Tosi(NimiLadonta.LukittuNakyvyys(true, true, false, true), "levossa: ladonta näyttää");
            // Liikkeessä ruudulla ollut pitää tilansa (ei välkkyä).
            Oleta.Tosi(NimiLadonta.LukittuNakyvyys(false, true, true, false), "liikkeessä näkyvä pysyy näkyvänä");
            Oleta.Tosi(!NimiLadonta.LukittuNakyvyys(false, true, false, true), "liikkeessä piilossa oleva pysyy piilossa");
            // Ruudulle vasta tuleva saa ladonnan tuloksen myös liikkeessä.
            Oleta.Tosi(NimiLadonta.LukittuNakyvyys(false, false, false, true), "tuleva nimi näkyy ladonnan mukaan");
            Oleta.Tosi(!NimiLadonta.LukittuNakyvyys(false, false, true, false), "tuleva nimi piiloon ladonnan mukaan");
        }
    }
}
