// KEHITYSKAUPUNGIT (omistaja 20.4x / 21.1x): Tukholma ja Pariisi tunnistetaan id:stä ja koordinaateista (keskusta, 20 km reunalla),
// muut eivät (Helsinki, Lontoo, Pariisin lähin muu: Versailles 17 km on vielä Pariisia, Orléans ei).
using Matkakirja.Linssit;

namespace Matkakirja.Linssit.Testit
{
    public static class KehityskaupungitTestit
    {
        [Testi] static void IdJaKoordinaatit()
        {
            Oleta.Tosi(Kehityskaupungit.On("tukholma") && Kehityskaupungit.On("pariisi") && !Kehityskaupungit.On("helsinki") && !Kehityskaupungit.On(null), "id:t");
            Oleta.Sama("tukholma", Kehityskaupungit.Lahella(59.3293, 18.0686), "Tukholman keskusta");
            Oleta.Sama("pariisi", Kehityskaupungit.Lahella(48.8584, 2.2945), "Eiffel-torni");
            Oleta.Sama("pariisi", Kehityskaupungit.Lahella(48.8049, 2.1204), "Versailles 17 km");
            Oleta.Sama(null, Kehityskaupungit.Lahella(60.1699, 24.9384), "Helsinki ei");
            Oleta.Sama(null, Kehityskaupungit.Lahella(47.9030, 1.9093), "Orléans ei");
            Oleta.Sama(null, Kehityskaupungit.Lahella(51.5074, -0.1278), "Lontoo ei");
        }
    }
}
