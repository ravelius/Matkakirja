// VÄISTÖ (B7 §2.3): verkkopelin js/ambience-stream.js voimassaVaisto ja js/siirtymamusiikki.js
// lajinVaisto puhtaina funktioina. Yksi totuus kaikille kanaville:
//
//   voimassa = hiljennykset ≠ ∅ ? min(pyydetty, 0,45) : pyydetty
//
// pyydetty = viimeisin kirjoitus (puhe 0,25, näyte/visa 0,15, paluu 1; EI minimi). Linssiryhmän
// raita ohittaa oman 'linssi'-syynsä: sille kelpaa pelkkä pyydetty.
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    public static class Vaisto
    {
        /// <summary>Webin voimassaVaisto.</summary>
        public static double Voimassa(double pyydetty, IReadOnlyCollection<string> syyt) =>
            syyt != null && syyt.Count > 0 ? System.Math.Min(pyydetty, AaniVakiot.VaistoHiljennys) : pyydetty;

        /// <summary>
        /// Webin lajinVaisto: linssiryhmän raidalle <paramref name="pohja"/> (= pyydetty), jos syissä on 'linssi';
        /// muuten <paramref name="kerroin"/> (= voimassa oleva väistö).
        /// </summary>
        public static double Laji(SiirtymaRaita raita, IEnumerable<string> syyt, double pohja, double kerroin)
        {
            if (raita?.Ryhma == "linssi" && syyt != null)
                foreach (var s in syyt) if (s == AaniVakiot.LinssinHiljennys) return pohja;
            return kerroin;
        }
    }
}
