// HOUKUTTIMET (Kartta/Houkuttimet.cs; omistaja 11.10.2026, juna 182): kartan sinisinä hehkuvat lautapelikaupungit ovat täsmälleen
// lautapelien kodit (Peliluettelo: yksi peli, yksi koti), joten uusi peli tai kodin vaihto näkyy tässä. ./kaanna.sh Houkutin
using System.Linq;
using Matkakirja.Peli.Pelit;

namespace Matkakirja.Peli.Testit
{
    public static class HoukutinPelitTestit
    {
        [Testi] static void LautapelikaupungitOvatPelienKodit()
        {
            var kodit = Peliluettelo.Kaikki.Select(p => p.Koti).OrderBy(x => x).ToArray();
            var houkuttimet = Matkakirja.Houkuttimet.Lista.Where(h => h.Laji == Matkakirja.Houkuttimet.Laji.Lautapeli)
                .Select(h => h.Id).OrderBy(x => x).ToArray();
            Oleta.Tosi(kodit.SequenceEqual(houkuttimet), $"kodit [{string.Join(", ", kodit)}] = houkuttimet [{string.Join(", ", houkuttimet)}]");
            foreach (var p in Peliluettelo.Kaikki)
                Oleta.Tosi(Matkakirja.Houkuttimet.Lista.Any(h => h.Id == p.Koti && h.Kohde == p.Nimi), $"{p.Nimi}: houkuttimen kohde");
        }
    }
}
