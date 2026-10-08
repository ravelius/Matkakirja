// OMAN KERROKSEN KAMERAT (Natiivi-UI 9.10.2026, TF 167 -regressio: "Pariisin kohdalla ei näy palloa ollenkaan"): ajattelijoiden
// päät, kaupunkipallot (värillinen ja kipsi) ja muut kuvat piirretään omalla kameralla omaan kerrokseen, ja kerros riisutaan
// muilta kameroilta. Ennen jokainen uusi kamera riisui kerroksen KAIKILTA muilta, myös toisilta saman kerroksen kuvakameroilta:
// kipsipallon kamera (luotu samassa ruudussa) vei värillisen pallon kameralta kerroksen ennen sen ensimmäistä piirtoa → tyhjä
// kuva, eikä kehityskaupunkien palloa näkynyt kartalla. Rekisteri pitää omat kamerat erillään. Puhdas ydin (kamerat id:inä).
using System.Collections.Generic;

namespace Matkakirja.Linssit
{
    public sealed class KerrosKamerat
    {
        readonly HashSet<int> omat = new HashSet<int>();

        /// <summary>Kirjaa kameran kerroksen omaksi (sen maski saa kerroksen).</summary>
        public void Lisaa(int kameraId) => omat.Add(kameraId);

        public bool OnOma(int kameraId) => omat.Contains(kameraId);

        /// <summary>Kameran uusi maski: omat pitävät kerroksen, muilta se riisutaan.</summary>
        public int Maski(int kameraId, int maski, int kerros) =>
            omat.Contains(kameraId) ? maski | (1 << kerros) : maski & ~(1 << kerros);
    }
}
