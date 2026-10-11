// HOUKUTTIMET (Kartta/Houkuttimet.cs; omistaja 11.10.2026 klo 17.1x): lautapeleihin ei tule värikorostusta, joten yhdenkään
// lautapelin kodilla (Peliluettelo) ei ole houkutinta; uusi peli tai kodin vaihto näkyy tässä. ./kaanna.sh Houkutin
using System.Linq;
using Matkakirja.Peli.Pelit;

namespace Matkakirja.Peli.Testit
{
    public static class HoukutinPelitTestit
    {
        [Testi] static void LautapelikaupungeillaEiHoukutinta()
        {
            Oleta.Tosi(Peliluettelo.Kaikki.Any(), "Peliluettelo tyhjä");
            foreach (var p in Peliluettelo.Kaikki)
                Oleta.Tosi(Matkakirja.Houkuttimet.LajiTunnukselle(p.Koti) == null, $"{p.Nimi}: kodilla {p.Koti} houkutin");
        }
    }
}
