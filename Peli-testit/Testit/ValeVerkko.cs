// Pieni käsin tehty verkko Matkan yksikkötesteille (osa A:n Reittiverkko
// pienellä syötteellä, jotta säännöt näkyvät yhdellä silmäyksellä).
//
//        lento
//   ala ~~~~~~~~~~~~~~~~~~~ cee
//    |  \                    |
//   maa  meri (2 askelta)   maa (1)
//  (2)    \                  |
//    |     saari            bee
//   bee ---------------------'
//
// ala–bee maa 2 askelta, bee–cee maa 1 askel, ala–saari meri 2 askelta
// (maksu 100), lento ala–cee. Lentokentät: ala ja cee.
using System.Collections.Generic;

namespace Matkakirja.Peli.Testit
{
    static class ValeVerkko
    {
        static Kaupunki K(string id, bool lentokentta = false, bool saari = false) =>
            new Kaupunki { Id = id, Nimi = id.ToUpperInvariant(), Lentokentta = lentokentta, Saari = saari };

        static Reitti R(string a, string b, ReitinLaji laji, int askeleet) => new Reitti
        {
            Id = a + "|" + b, A = a, B = b, Laji = laji, Askeleet = askeleet,
            Maksu = laji == ReitinLaji.Meri ? Vakiot.MeriHinta : 0,
        };

        public static Reittiverkko Pieni() => new Reittiverkko(
            new List<Kaupunki> { K("ala", lentokentta: true), K("bee"), K("cee", lentokentta: true), K("saari", saari: true) },
            new List<Reitti>
            {
                R("ala", "bee", ReitinLaji.Maa, 2),
                R("bee", "cee", ReitinLaji.Maa, 1),
                R("ala", "saari", ReitinLaji.Meri, 2),
                new Reitti { Id = "lento:ala|cee", A = "ala", B = "cee", Laji = ReitinLaji.Lento },
            });
    }
}
